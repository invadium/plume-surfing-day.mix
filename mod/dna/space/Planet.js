const Body = require('dna/space/Body')

let id = 0

class Planet extends Body {

    constructor(st) {
        super( extend({
            name:  'planet' + (++id),
               G:   1 * env.tune.G,
               r:   100,
              kR:   400,
              gR:   500,
              aG:   0.25 * PI,
        }, st) )

        this.install([
            new dna.space.pod.SolidCircle({
                r: this.r,
            }),
            new dna.space.pod.Rotation({
                rspeed: 0.025 * PI,
            }),
            new dna.space.pod.Crack({
                tau: math.rnda(),
                r1: this.r * .5,
                r2: this.r,
            }),
        ])

        if (env.debug) {
            this.install([
                new dna.space.pod.RadiusProbe(),
                new dna.space.pod.CoordinatesProbe({
                    x: -this.r,
                    y: 1.5 * this.r,
                }), 
                new dna.space.pod.SelectionIndicator(),
            ])
        }
    }

    worldToPolar(wx, wy) {
        const lxy = this.lxy(wx, wy)
        return [
            atan2(lxy[1], lxy[0]),
            math.length(lxy[0], lxy[1]),
        ]
    }

    polarToWorld(tau, r) {
        return this.pxy(
            cos(tau) * r,
            sin(tau) * r
        )
    }

    shake() {
        const cracks = this._ls.filter(e => e instanceof dna.space.pod.Crack)
        // TODO calculate tectonic energy and split over all active plumes
        cracks.forEach(crack => crack.plume(100))
    }

    // TODO vent out excessive tectonic energy
    vent() {
    }

    draw() {
        save() 
        translate( this.x, this.y )
        rotate(this.dir)

        // polar axis
        lineWidth(3)
        stroke( hsl(.35, .42, .56) )
        line(0, -this.r * 1.1, 0, this.r * 1.1)

        fill( hsl(.47, .27, .25) )
        circle( 0, 0, this.r )

        lineWidth(3)
        stroke( hsl(.35, .42, .56) )
        circle( 0, 0, this.r )

        super.draw()

        restore()
    }
}
