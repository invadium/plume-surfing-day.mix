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

    surfaceDeltaV(deltaSpeed) {
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

    surfaceRun(dt) {
        if (this.getSurfaceSpeed() < this.__.maxSurfaceSpeed) {
            this.surfacePush(this.__.surfacePushForce, dt)
        }
    }

    surfaceJumpAction(acceleration) {
        if (!this.isTouchingSurface()) return
        this.speedV[1] += acceleration
    }

    surfacePropelAction(acceleration) {
        if (!this.isTouchingSurface()) return
        this.speedV[0] += acceleration
    }

    boundToPlanet(bound) {
        if (this.surface) return this.surface // surfaced, so binded to the previous one

        if ((!this.bound || this.bound !== bound) && isFun(this.__.onBound)) {
            this.__.onBound(bound)
        }
        this.bound = bound
        this.__.bounded = true
        return this.bound
    }

    releaseFromPlanet() {
        if (this.surface) return // wait until detached from the surface
        if (this.bound && isFun(this.__.onRelease)) {
            this.__.onRelease(this.bound)
        }
        this.bound = null
        this.__.bounded = false
    }

    angularTarget(tau) {
        this.dirTargetAngle = tau
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
                if (!__.touchingSurface) {
                    // jump touchdown!
                    const lx = cos(phi) * surface.r
                    const ly = sin(phi) * surface.r
                    lib.vfx.touchdown(surface, lx, ly, phi, '#c0c0c0a0', 5 + abs(verticalSpeed/10))
                    lib.sfx('touchdown', .7)
                    // log(`landing speed: ${5 + abs(verticalSpeed/10)}`)
                    __.touchingSurface = true
                }
                polar[1] = surface.r + __.r
                sV[1] = 0 // reset vertical movement

                // apply friction
                if (sV[0] > 0) {
                    sV[0] -= env.tune.friction * dt
                    if (sV[0] < 0) sV[0] = 0 // full stop
                } else if (sV[0] < 0) {
                    sV[0] += env.tune.friction * dt
                    if (sV[0] > 0) sV[0] = 0 // full stop
                }

            } else if (polar[1] > surface.kR + __.r) {
                // detach from the surface!
                // restore freespace speed vector
                const phi = bearing( __.x, __.y, surface.x, surface.y ) + PI
                const tau = phi + HALF_PI
                sV[0] = cos(phi) * verticalSpeed + cos(tau) * horizontalSpeed
                sV[1] = sin(phi) * verticalSpeed + sin(tau) * horizontalSpeed

                __.surfaced = false
                __.touchingSurface = false
                this.surface = null
                if (isFun(__.onLaunch)) __.onLaunch(surface)

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
                const d = distance(bound.x, bound.y, nx, __.y)
                if (d <= __.r + bound.r) {
                    nx = __.x
                    //sV[0] = 0
                    surfaceContact = true
                }
                const d2 = distance(bound.x, bound.y, __.x, ny)
                if (d2 <= __.r + bound.r) {
                    ny = __.y
                    //sV[1] = 0
                    surfaceContact = true
                }

                if (surfaceContact && this.gravityUnit) {
                    const prevSurface = this.surface
                    __.surfaced = true
                    this.surface = bound
                    const gU = this.gravityUnit
                    const proj = math.dotProduct(sV[0], sV[1], gU[0], gU[1])
                    sV[0] -= gU[0] * proj
                    sV[1] -= gU[1] * proj
                    const landingSpeed = sV[1]

                    const speed = math.length(sV[0], sV[1])
                    sV[0] = speed
                    sV[1] = 0
                    __.polar = bound.worldToPolar(__.x, __.y)

                    const lx = cos(__.polar[0]) * bound.r
                    const ly = sin(__.polar[0]) * bound.r
                    lib.vfx.touchdown(bound, lx, ly, __.polar[0], '#c0c0c0a0', 10 + abs(landingSpeed/5))
                    //log(`landing speed: ${10 + abs(landingSpeed)/5}`)

                    if (this.surface !== prevSurface && isFun(__.onTouchdown)) {
                        __.onTouchdown(bound)
                    }
                }
            }
            __.x = nx
            __.y = ny
        }
    }

    onRelease() {
        this.rotSpeed = .2 * lib.source.events.rnda()
        // make sure we got a minimum rotation
        if (this.rotSpeed < 0) this.rotSpeed -= .3
        else this.rotSpeed += .3
    }

    isTouchingSurface() {
        if (!this.surface) return false
        return (this.__.polar[1] === this.surface.r + this.__.r)
    }

    getSurfaceSpeed() {
        if (!this.surface) return -1
        return abs(this.speedV[0])
    }

}
