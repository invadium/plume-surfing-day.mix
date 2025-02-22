const Body = require('dna/space/Body')

let id = 0

class Meteor extends Body {

    constructor(st) {
        super( extend({
            name: 'meteor' + (++id),
               r: 10,
        }, st) )

        this.install([
            new dna.space.pod.SolidCircle({
                r: this.r,
            }),
            new dna.space.pod.SpaceMomentum({
                mass: 100,
            }),
            new dna.space.pod.GravityEffect({
                boundable: false,
            }),
        ])

        if (env.debug) {
            this.install([
                // new dna.space.pod.RadiusProbe(),
                //new dna.space.pod.CoordinatesProbe({
                //    x: -this.r,
                //    y: 1.5 * this.r,
                //}), 
                //new dna.space.pod.MomentumProbe(),
                new dna.space.pod.SelectionIndicator(),
            ])
        }
    }

    hit(source) {
        if (!(source instanceof dna.space.Planet)) return

        const sV = this.momentum.speedV
        const normal = bearing( source.x, source.y, this.x, this.y )
        const nV = [ cos(normal), sin(normal) ]
        const dot2 = 2 * lib.util.dot(sV, nV)

        const rV = [
            sV[0] - dot2 * nV[0],
            sV[1] - dot2 * nV[1],
        ]
        const impactAngle = atan2(rV[1], rV[0])
        // just follow the reflection vector to bounce off the planet! :)
        //sV[0] = rV[0]
        //sV[1] = rV[1]

        kill(this)
        const ix = source.x + nV[0] * source.r
        const iy = source.y + nV[1] * source.r
        lib.vfx.impact(lab.port, ix, iy, impactAngle, env.style.color.meteor.impact, 200)
    }

    draw() {
        save() 
        translate( this.x, this.y )
        rotate(this.dir)

        fill( env.style.color.meteor.base )
        circle( 0, 0, this.r )

        super.draw()

        restore()
    }

    warpSpace() {
        kill(this)
    }
}
