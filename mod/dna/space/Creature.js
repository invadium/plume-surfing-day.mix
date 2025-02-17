const Body = require('dna/space/Body')

class Creature extends Body {

    constructor(st) {
        super( extend({
            team: 0,
            r:    20,
            dir:  0,    // points to where the creature is looking at
        }, st) )

        this.install([
            /*
            new dna.space.pod.CoordinatesProbe({
                x: -this.r,
                y: 1.5 * this.r,
            })
            */
        ])
    }

    evo(dt) {
        this.dir -= HALF_PI * dt
    }

    draw() {
        const r = this.r,
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

}
