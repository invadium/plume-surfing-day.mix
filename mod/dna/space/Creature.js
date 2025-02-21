const Body = require('dna/space/Body')

let id = 0

class Creature extends Body {

    constructor(st) {
        super( extend({
            type: 'creature',
            name: 'creature' + (++id),
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
                //new dna.space.pod.RadiusProbe(),
                //new dna.space.pod.CoordinatesProbe({
                //    x: -this.r,
                //    y: 1.5 * this.r,
                //}), 
                new dna.space.pod.MomentumProbe(),
                new dna.space.pod.SelectionIndicator(),
            ])
        }
        this.color = env.style.color.team[this.team]
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

        // lineWidth(1)
        fill(this.color.base)

        // body
        rect( -rh, -r, r, R )
        // head
        const hx = 0
        rect( hx, hb-hh, hw, hh)

        fill(env.style.color.eyes)
        rect(
            hx + 0.3 * r, hb-hh-.25*hh,
            eh, ew
        )
        rect(
            hx + hw - 0.3 * r, hb-hh-.25*hh,
            eh, ew
        )

        lineWidth(2)
        stroke(this.color.high)

        // hair
        line(hx + 0.6 * hw, hb-hh,
             hx + 0.6 * hw, hb-hh-.5*hh)

        // legs
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
