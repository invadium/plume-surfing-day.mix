class Rotation {

    constructor(st) {
        extend(this, {
            type:   'mover',
            name:   'rotation',
            rspeed:  PI,
        }, st)
    }

    evo(dt) {
        this.__.dir += this.rspeed * dt
    }
}
