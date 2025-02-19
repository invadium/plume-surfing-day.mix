class RadiusProbe {

    constructor(st) {
        extend(this, {
            probe:  true,
            type:  'probe',
            name:  'radiusProbe',
        }, st)
    }

    draw() {
        const __ = this.__

        lineWidth(1)
        stroke('#b0ff20')
        circle(0, 0, __.r)
        
        if (__.gR) {
            stroke('#ee4010')
            circle(0, 0, __.gR)
        }

        if (__.kR) {
            // show Karmal line
            stroke('#2060ee')
            circle(0, 0, __.kR)
        }
    }

}
