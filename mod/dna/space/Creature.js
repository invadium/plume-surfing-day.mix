const Body = require('dna/space/Body')

class Creature extends Body {

    constructor(st) {
        super( extend({
            type: 'creature',
            team: 0,
            r:    30,
            dir:  0,    // points to where the creature is looking at
        }, st) )

        this.install([
            new dna.space.pod.Momentum({
                mass: 100,
            }),
            new dna.space.pod.GravityEffect(),
            new dna.space.pod.SolidCircle({
                r: 20,
            }),
        ])

        if (env.debug) {
            this.install([
                new dna.space.pod.RadiusProbe(),
                new dna.space.pod.CoordinatesProbe({
                    x: -this.r,
                    y: 1.5 * this.r,
                }), 
                new dna.space.pod.MomentumProbe(),
                new dna.space.pod.SelectionIndicator(),
            ])
        }
    }

    evo(dt) {
        super.evo(dt)
    }

    draw() {
        const r = .5 * this.r, // calculate the visual base radius
              R = 2 * r,
              rh = .5 * r,
              hb = -.75 * r,

              hh = .7 * r,
              hw = 1.5 * r,
              eh = 0.34 * r,
              ew = 0.4 * r

        save()
        translate(this.x, this.y)
        rotate(this.dir)

        lineWidth(1)
        const c1 = hsl(.47, .27, .25),
              c2 = hsl(.35, .42, .56)
        fill(c1, c2)
        rect( -rh, -r, r, R )
        rect( 0, hb-hh, hw, hh)

        fill('#ffffff')
        rect(
            0.3 * r, hb-hh-.25*hh,
            eh, ew
        )
        rect(
            hw - 0.3 * r, hb-hh-.25*hh,
            eh, ew
        )

        lineWidth(2)
        line(-.3*r, r, -.4*r, r + .6*r)
        line( .3*r, r,  .2*r, r + .6*r)

        super.draw()
        restore()
    }

    onBound(planet) {
        log(`[${this.name}] bounded to the planet [${planet.name}]`)
    }

    onLanded(planet) {
        log(`[${this.name}] just landed on the planet [${planet.name}]`)
    }

    onLaunched(planet) {
        log(`[${this.name}] crossed the Karmal line of [${planet.name}]`)
    }

    onRelease(planet) {
        log(`[${this.name}] released from the planet [${planet.name}]`)
    }

}
