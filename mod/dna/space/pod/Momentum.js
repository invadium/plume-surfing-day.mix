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

    boundToPlanet(bound) {
        if ((!this.bound || this.bound !== bound) && isFun(this.__.onBound)) {
            this.__.onBound(bound)
        }
        this.bound = bound
    }

    releaseFromPlanet() {
        if (this.bound && isFun(this.__onRelease)) {
            this.__.onRelease(this.bound)
        }
        this.bound = null
    }

    angularTarget(tau) {
        this.dirTargetAngle = tau
    }

    evo(dt) {
        const __    = this.__,
              bound = this.bound,
              sV    = this.speedV

        // handle rotation
        if (bound) {
            // apply angular tug
            const tau = this.dirTargetAngle
            if (__.dir < tau) {
                __.dir += bound.aG * dt
                if (__.dir > tau) __.dir = tau
            } else if (__.dir > tau) {
                __.dir -= bound.aG * dt
                if (__.dir < tau) __.dir = tau
            }
        } else {
            // apply angular momentum
            __.dir += this.rotSpeed * dt
        }

        // free space movement
        let nx = __.x + sV[0] * dt,
            ny = __.y + sV[1] * dt
        
        if (bound) {
            // test the surface contact
            let surfaceContact = false
            const d = dist(bound.x, bound.y, nx, __.y)
            if (d <= __.r + bound.r) {
                nx = __.x
                sV[0] = 0
                surfaceContact = true
            }
            const d2 = dist(bound.x, bound.y, __.x, ny)
            if (d2 <= __.r + bound.r) {
                ny = __.y
                sV[1] = 0
                surfaceContact = true
            }

            if (surfaceContact && this.gravityUnit) {
                if (!this.surface && isFun(this.__.onLanded)) {
                    this.__.onLanded(bound)
                }
                this.surface = bound
                const gU = this.gravityUnit
                const proj = math.dotProduct(sV[0], sV[1], gU[0], gU[1])
                sV[0] -= gU[0] * proj
                sV[1] -= gU[1] * proj
            }
        }
        __.x = nx
        __.y = ny
    }
}
