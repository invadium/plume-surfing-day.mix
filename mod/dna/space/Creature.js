const Body = require('dna/space/Body')

let id = 0

class Creature extends Body {

    constructor(st) {
        super( extend({
            type: 'creature',
            name: 'creature' + (++id),
            tribe: 0,
            hp:    env.tune.creature.baseHP,
            r:     30,
            dir:   0,    // points to where the creature is looking at

            maxSurfaceSpeed:         env.tune.creature.baseSurfaceSpeed,
            surfacePushForce:        env.tune.creature.baseSurfaceForce,
            surfaceJumpAcceleration: env.tune.creature.baseSurfaceJump,
            hitForce:                env.tune.creature.baseHitForce,

            hitLog: [],
        }, st) )

        this.install([
            new dna.space.pod.Momentum({
                mass: 100,
            }),
            new dna.space.pod.GravityEffect(),
            new dna.space.pod.SolidCircle({
                r: 20,
            }),
            new dna.space.pod.RandomWalkerBot(),
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
                new dna.space.pod.BotProbe({
                    x: -this.r * .8,
                    y:  this.r * .8,
                }),
            ])
        }
        this.color = env.style.color.tribe[this.tribe]
    }

    wakeUp() {
        // TODO change the goal/state (e.g. idle -> mining or mining -> warming)
        log(`[${this.getTitle()}] is waking up!`)

        if (this.surfaced) {
            this.momentum.surfaceJump(env.tune.debug.mouse.jumpAcceleration)
        }
    }

    registerHit(source) {
        if (this.hitLog.length > 0 && this.hitLog[0].timestamp + 2*env.tune.creature.hitDelay < env.time) {
            this.hitLog.shift()
        }

        let lastHit  = null
        this.hitLog.forEach(e => {
            if (e.source === source) lastHit = e
        })

        if (lastHit && lastHit.timestamp + env.tune.creature.hitDelay > env.time) return false
        this.hitLog.push({
            timestamp: env.time,
            source:    source,
        })
        source.hitLog.push({
            timestamp: env.time,
            source:    this,
        })
        return true
    }

    damage(hits, source) {
        this.hp -= hits
        // TODO particle effect
        if (this.momentum.surface) {
            const surface = this.momentum.surface,
                  lx = cos(this.polar[0]) * surface.r,
                  ly = sin(this.polar[0]) * surface.r
            lib.vfx.touchdown(surface, lx, ly, this.polar[0], this.color.high, 15)
        }
        if (this.hp <= 0) kill(this, source)
    }

    hit(source) {
        if (!(source instanceof dna.space.Creature) || this.tribe === source.tribe) return

        if (this.registerHit(source)) {
            //log(`${this.getTitle()} battles with ${source.getTitle()}`)
            // TODO determine the amount of damage based on speed/hight etc
            this.damage(source.hitForce, source)
            source.damage(this.hitForce, this)
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
        log(`${this.getTitle()} bounded to the planet [${planet.name}]`)
    }

    onLanded(planet) {
        log(`${this.getTitle()} just landed on the planet [${planet.name}]`)
    }

    onLaunched(planet) {
        log(`${this.getTitle()} crossed the Karmal line of [${planet.name}]`)
    }

    onRelease(planet) {
        log(`${this.getTitle()} released from the planet [${planet.name}]`)
    }

    kill(source) {
        if (!source) throw new Error('why am I here?')
        this.__.detach(this)
        log(`${this.getTitle()} is killed by ${source.getTitle()}`)
    }

    getTitle() {
        return `[@${this.tribe}::${this.name}]`
    }

}
