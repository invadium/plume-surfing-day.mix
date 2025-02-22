const Body = require('dna/space/Body')

let id = 0

class MineralDeposit extends Body {

    constructor(st) {
        super( extend({
            type: '',
            name: 'deposit' + (++id),
            value: 1,
            r:     10,

            warpR: env.beltRadius,
        }, st) )

        this.install([
            new dna.space.pod.Momentum({
                mass: 100,
            }),
            new dna.space.pod.GravityEffect({
                boundable: true,
            }),
            new dna.space.pod.SolidCircle({
                r: this.r,
            }),
        ])

        if (env.debug) this.install([
            /*
            new dna.space.pod.RadiusProbe(),
            new dna.space.pod.CoordinatesProbe({
                x: -this.r,
                y: 1.5 * this.r,
            }), 
            new dna.space.pod.MomentumProbe(),
            */
            new dna.space.pod.SelectionIndicator(),
        ])
    }

    hit(source) {
        if (!(source instanceof dna.space.Creature)) return
        source.pickUp(this)
    }

    draw() {
        save() 
        translate( this.x, this.y )
        rotate(this.dir)

        const r = this.r
        fill( env.style.color.mineralDeposit.base )
        moveTo(0, -r)
        lineTo(-r, 0)
        lineTo(0,  r)
        lineTo( r, 0)
        closePath()
        shape()

        super.draw()

        restore()
    }

    warpSpace() {
        kill(this)
    }
}
