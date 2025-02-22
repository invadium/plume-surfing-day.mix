class SpaceMomentum {

    constructor(st) {
        extend(this, {
            type:     'physics', 
            name:     'spaceMomentum',
            alias:    'momentum',
            mass:      100,
            speedV:    [10, 0],
            rotSpeed:  0,
        }, st)
    }

    push(dirV2, force, dt) {
        const acceleration = force / this.mass
        this.speedV[0] += dirV2[0] * acceleration * dt
        this.speedV[1] += dirV2[1] * acceleration * dt
    }

    evo(dt) {
        const __      = this.__,
              sV      = this.speedV

        // apply angular momentum
        __.dir += this.rotSpeed * dt

        // free space movement
        let nx = __.x + sV[0] * dt,
            ny = __.y + sV[1] * dt

        __.x = nx
        __.y = ny
    }

}
