class CoordinatesProbe {

    constructor(st) {
        extend(this, {
            probe: true,
            type: 'probe',
            name: 'coordinatesProbe',
            x:     0,
            y:     0,
            r:     20,
        }, st)
    }

    draw() {
        const r  = this.r,
              hr = 0.5 * r

        // assume we are at the body's origin
        save()
        rotate(-this.__.dir)

        stroke('#ff0000')
        lineWidth(1)
        line(0,  -hr, 0,   hr)
        line(-hr, 0,  hr,  0 )

        translate(this.x, this.y)

        stroke('#ff0000')
        lineWidth(1)
        line(0, 0, 0, -r)
        line(0, 0, r,  0)

        stroke('#80ff00')
        line(0, 0, cos(this.__.dir) * r, sin(this.__.dir) * r)

        fill('#ffff00')
        baseTop()
        alignRight()
        font(env.style.font.debug.head)
        text(`${round(this.__.x)}:${round(this.__.y)}`, 0, 0)

        restore()
    }

}
