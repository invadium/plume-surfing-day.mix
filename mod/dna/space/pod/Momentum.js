class Momentum {

    constructor(st) {
        extend(this, {
            type:     'physics',
            name:     'momentum',
            mass:      100,
            speedV:    [10, 0],
            rotSpeed:  0,
            bound:     null,
        }, st)
    }

    push(dirV2, force, dt) {
        const acceleration = force / this.mass
        this.speedV[0] += dirV2[0] * acceleration * dt
        this.speedV[1] += dirV2[1] * acceleration * dt
    }

    deltaV(deltaSpeed) {
        const sV     = this.speedV,
              speed  = len(sV[0], sV[1]),
              phi    = atan2(sV[1], sV[0])

        let newSpeed = speed + deltaSpeed
        if (speed > 0 && newSpeed < 0) newSpeed = 0
        else if (speed < 0 && newSpeed > 0) newSpeed = 0

        this.speedV[0] = cos(phi) * newSpeed
        this.speedV[1] = sin(phi) * newSpeed
    }

    surfacePush(force, dt) {
        const acceleration = force / this.mass
        this.speedV[0] += acceleration * dt
    }

    surfaceJet(force, dt) {
        const acceleration = force / this.mass
        this.speedV[1] += acceleration * dt
    }

    surfaceJump(acceleration) {
        if (!this.isTouchingSurface()) return
        this.speedV[1] += acceleration
    }

    boundToPlanet(bound) {
        if (this.surface) return this.bound

        if ((!this.bound || this.bound !== bound) && isFun(this.__.onBound)) {
            this.__.onBound(bound)
        }
        this.bound = bound
        return this.bound
    }

    releaseFromPlanet() {
        if (this.bound && isFun(this.__.onRelease)) {
            this.__.onRelease(this.bound)
        }
        this.bound = null
    }

    angularTarget(tau) {
        this.dirTargetAngle = tau
    }

    isTouchingSurface() {
        return (this.__.polar[1] === this.surface.r + this.__.r)
    }

    evo(dt) {
        const __      = this.__,
              bound   = this.bound,
              surface = this.surface,
              sV      = this.speedV

        // handle rotation
        if (surface) {
            const tau = this.dirTargetAngle
            this.__.dir = this.dirTargetAngle

        } else if (bound) {
            // apply angular tug
            const tau = this.dirTargetAngle
            let left = true
            if (__.dir < tau) {
                if (tau - __.dir < PI) left = false

            } else if (__.dir > tau) {
                if (__.dir - tau > PI) left = false

            }

            if (left) {
                __.dir -= bound.aG * dt
                if (__.dir < tau) __.dir = tau
            } else {
                __.dir += bound.aG * dt
                if (__.dir > tau) __.dir = tau
            }

        } else {
            // apply angular momentum
            __.dir += this.rotSpeed * dt
        }

        if (__.surfaced) {
            const polar   = __.polar,
                  phi     = polar[0],
                  r       = polar[1],
                  horizontalSpeed = sV[0],
                  verticalSpeed   = sV[1],
                  radLength       = (2 * PI * r) / TAU,
                  radialSpeed     = horizontalSpeed / radLength
                  
            polar[0] += radialSpeed * dt
            polar[1] += verticalSpeed * dt

            // TODO test against each single solid bottom
            if (polar[1] <= surface.r + __.r) { 
                // on the surface
                __.touchingSurface = true
                polar[1] = surface.r + __.r
                sV[1] = 0 // reset vertical movement

                // apply friction
                if (sV[0] > 0) {
                    sV[0] -= env.tune.friction * dt
                    if (sV[0] < 0) sV[0] = 0 // full stop
                } else if (sV[1] < 0) {
                    sV[0] += env.tune.friction * dt
                    if (sV[0] > 0) sV[0] = 0 // full stop
                }

            } else if (polar[1] > surface.kR + __.r) {
                // detach from the surface!
                // restore freespace speed vector
                const phi = bearing( __.x, __.y, surface.x, surface.y ) + PI
                sV[0] = cos(phi) * verticalSpeed
                sV[1] = sin(phi) * verticalSpeed

                __.surfaced = false
                __.touchingSurface = false
                this.surface = null
                if (isFun(__.onLaunched)) __.onLaunched(surface)

            } else {
                // apply gravity
                const acceleration = surface.G / this.mass
                sV[1] -= acceleration * dt
                __.touchingSurface = false
            }

            // convert and apply world coordinates
            const wxy = surface.polarToWorld(polar[0], polar[1])
            __.x = wxy[0]
            __.y = wxy[1]

        } else {
            // free space movement
            let nx = __.x + sV[0] * dt,
                ny = __.y + sV[1] * dt
            
            if (bound) {
                // test the surface contact
                let surfaceContact = false
                const d = dist(bound.x, bound.y, nx, __.y)
                if (d <= __.r + bound.r) {
                    nx = __.x
                    //sV[0] = 0
                    surfaceContact = true
                }
                const d2 = dist(bound.x, bound.y, __.x, ny)
                if (d2 <= __.r + bound.r) {
                    ny = __.y
                    //sV[1] = 0
                    surfaceContact = true
                }

                if (surfaceContact && this.gravityUnit) {
                    if (!this.surface && isFun(__.onLanded)) {
                        __.onLanded(bound)
                    }
                    __.surfaced = true
                    this.surface = bound
                    const gU = this.gravityUnit
                    const proj = math.dotProduct(sV[0], sV[1], gU[0], gU[1])
                    sV[0] -= gU[0] * proj
                    sV[1] -= gU[1] * proj

                    const speed = math.length(sV[0], sV[1])
                    sV[0] = speed
                    sV[1] = 0
                    __.polar = bound.worldToPolar(__.x, __.y)
                }
            }
            __.x = nx
            __.y = ny
        }
    }
}
