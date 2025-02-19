class Momentum {

    constructor(st) {
        extend(this, {
            type:     'physics',
            name:     'momentum',
            mass:      100,
            speedV:    [10, 0],
            rotSpeed:  0,
            bound:  null,
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

    evo(dt) {
        // apply angular momentum
        this.__.dir += this.rotSpeed * dt

        // movement
        const nx = this.__.x + this.speedV[0] * dt,
              ny = this.__.y + this.speedV[1] * dt
        
        // TODO planet collision resolution for x?
        // ...
        // everything is fine, proceed with the actual movement
        this.__.x = nx

        // TODO collision resolution in y-axis
        // ...
        this.__.y = ny
    }
}
