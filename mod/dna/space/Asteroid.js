const Body = require('dna/space/Body')

let id = 0

const MAX_TRAIL   = 20

class Asteroid extends Body {

    constructor(st) {

        super( extend({
            name: 'asteroid' + (++id),
            r:     10,

            trail:   [],
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

        if (env.debug) this.install([
            //new dna.space.pod.RadiusProbe(),
            //new dna.space.pod.CoordinatesProbe({
            //    x: -this.r,
            //    y: 1.5 * this.r,
            //}), 
            //new dna.space.pod.MomentumProbe(),
            new dna.space.pod.SelectionIndicator(),
        ])
    }

    hit(source) {
        if (source instanceof dna.space.Creature) {
            source.kill(this)
        }
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

        kill(this, source)
        const ix = source.x + nV[0] * source.r
        const iy = source.y + nV[1] * source.r

        lib.vfx.impact(lab.port, ix, iy, impactAngle, env.style.color.asteroid.impact, 200)
        lib.sfx('impact')

        lab.port.spawn( dna.space.MineralDeposit, {
            x:    ix,
            y:    iy,
            r:    this.r,
            mass: this.mass,
        })
    }

    evo(dt) {
        super.evo(dt)

        const hr = .5 * this.r
        const lastMark = this.trail[0]
        if (!lastMark || abs(lastMark[0] - this.x) > hr || abs(lastMark[1] - this.y) > hr) {
            this.trail.unshift([ this.x, this.y ])
            if (this.trail.length > MAX_TRAIL) this.trail.pop()
        }
    }

    draw() {
        const r  = this.r,
              hr = .5 * r
        save() 

        save()
        for (let i = this.trail.length - 1; i > 0; i--) {
            const mark = this.trail[i]
            const factor = 1 - i/MAX_TRAIL
            alpha(factor)
            fill( env.style.color.asteroid.base )
            circle( mark[0], mark[1], hr + hr * factor)
        }
        restore()

        translate( this.x, this.y )
        rotate(this.dir)

        fill( env.style.color.asteroid.base )
        circle( 0, 0, r )

        super.draw()

        restore()
    }

    warpSpace() {
        kill(this)
    }
}
