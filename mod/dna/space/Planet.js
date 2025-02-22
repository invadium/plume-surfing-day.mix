const Body = require('dna/space/Body')

let id = 0

class Planet extends Body {

    constructor(st) {
        super( extend({
             name: 'planet' + (++id),
             type:  0,
            tribe:  0,
                G:  1 * env.tune.G,
                r:  100,
               kR:  400,
               gR:  500,
               aG:  0.25 * PI,
           energy:  0,
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
            new dna.space.pod.PlanetOwnerMonitor(),
        ])

        if (env.debug) {
            this.install([
                // new dna.space.pod.RadiusProbe(),
                //new dna.space.pod.CoordinatesProbe({
                //    x: -this.r,
                //    y: 1.5 * this.r,
                //}), 
                new dna.space.pod.SelectionIndicator(),
            ])
        }

        this.color = env.style.color.planet[this.type]
        this.seismicCapacity = env.tune.planet.seismicCapacityFactor * this.r
        this.seismicCharge   = env.tune.planet.baseSeismicCharge
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
        this.energy = 0
    }

    // TODO vent out excessive tectonic energy
    vent() {
        const ventRate = lib.source.events.rndf()
        const releasedEnergy = this.energy * ventRate
        this.energy = this.energy - releasedEnergy

        const cracks = this._ls.filter(e => e instanceof dna.space.pod.Crack)
        const crackEnergy = releasedEnergy / cracks.length
        cracks.forEach(crack => crack.plume(crackEnergy))
    }

    evo(dt) {
        super.evo(dt)

        this.energy += this.seismicCharge * dt
        if (this.energy > this.seismicCapacity) {
            this.energy = this.seismicCapacity
            this.vent()
        }
    }

    draw() {
        save() 
        translate( this.x, this.y )
        rotate(this.dir)

        // polar axis
        lineWidth(3)
        stroke( this.color.high )
        line(0, -this.r * 1.1, 0, this.r * 1.1)

        fill( this.color.base )
        circle( 0, 0, this.r )

        // surface
        lineWidth(4)
        const c = env.style.color.tribe[this.tribe].high
        stroke( c )
        circle( 0, 0, this.r )

        super.draw()

        restore()
    }

    onCapture(tribe, prevTribe) {
        log(`${this.name} is captured by @${tribe}`)
    }

    isWithinCrack(tau) {
        tau = lib.util.balancedAngle(tau)
        let within = false
        this._ls.forEach(e => {
            if (e instanceof dna.space.pod.Crack
                    && abs(e.tau - tau) <= env.tune.plume.effectArea) {
                within = true
            }
        })
        return within
    }

    getCharge() {
        return this.energy / this.seismicCapacity
    }
}
