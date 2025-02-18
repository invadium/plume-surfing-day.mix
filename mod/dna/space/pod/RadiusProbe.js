class RadiusProbe {

    constructor(st) {
        extend(this, {
            debug:  true,
            type:  'probe',
            name:  'radiusProbe',
        }, st)
    }

    draw() {
        lineWidth(1)
        stroke('#b0ff20')
        circle(0, 0, this.__.r)
    }

}
