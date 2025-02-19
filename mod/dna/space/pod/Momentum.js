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

    push(dirV2, mass) {
        const mFactor = mass / this.mass
        this.speedV[0] += dirV2[0] * mFactor
        this.speedV[1] += dirV2[1] * mFactor
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

    boundPlanet(bound) {
        this.bound = bound
    }

    releasePlanet() {
        this.bound = null
    }

    evo(dt) {
        const __ = this.__
        const bound = this.bound
        // apply angular momentum
        __.dir += this.rotSpeed * dt

        // movement
        let nx = __.x + this.speedV[0] * dt,
            ny = __.y + this.speedV[1] * dt
        
        if (bound) {
            const d = dist(bound.x, bound.y, nx, __.y)
            if (d <= __.r + bound.r) nx = __.x
        }

        if (bound) {
            const d = dist(bound.x, bound.y, __.x, ny)
            if (d <= __.r + bound.r) ny = __.y
        }
        __.x = nx
        __.y = ny
    }
}
