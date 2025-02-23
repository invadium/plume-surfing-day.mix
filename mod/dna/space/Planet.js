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
             cracks:  1 + lib.source.cosmology.rndi(4),
            shakeAt:  0,
              waveR:  0,
        }, st) )

        this.install([
            new dna.space.pod.SolidCircle({
                r: this.r,
            }),
            new dna.space.pod.Rotation({
                rspeed: 0.025 * PI,
            }),
            new dna.space.pod.PlanetOwnerMonitor(),
        ])
        for (let i = 0; i < this.cracks; i++) this.spawnCrack()

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
    }

    spawnCrack() {
        const tau = lib.source.cosmology.rnda()
        if (this.isCrackedArea(tau)) return

        this.install( new dna.space.pod.Crack({
            tau: tau,
            depth: ceil(this.r - .4 * this.r - .3 * this.r * lib.source.cosmology.rndf()),
        }) )
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
        this.shakeAt = env.time
        lib.sfx('shake')
    }

    shockwave() {
        this.waveCharge = this.getShakeCharge() // same shake charge in the wave
        this.waveR = this.getChargeRadius(this.waveCharge)
        log(`mag: ${ceil(this.waveCharge * 10)} time: ${round((env.time - this.shakeAt) * 10)/10} wR:${round(this.waveR)}`)
        this.shakeAt = 0
    }

    quake() {
        this.apply(crack => crack.shake(this.waveCharge), e => e instanceof dna.space.pod.Crack)
        this.waveR = 0
        this.waveCharge = 0
    }

    evo(dt) {
        super.evo(dt)

        if (this.waveCharge) {
            this.waveR += env.tune.waveSpeed * dt
            if (this.waveR >= this.r) {
                this.quake()
            }
        }
    }

    draw() {
        save() 
        translate( this.x, this.y )
        rotate(this.dir)

        /*
        // polar axis
        lineWidth(3)
        stroke( this.color.high )
        line(0, -this.r * 1.1, 0, this.r * 1.1)
        */

        fill( this.color.base )
        circle( 0, 0, this.r )

        // surface
        lineWidth(4)
        const c = env.style.color.tribe[this.tribe].high
        stroke( c )
        circle( 0, 0, this.r )

        super.draw()

        // seismic charge
        const charge = this.getShakeCharge()
        if (charge) {
            const chargeR = this.getChargeRadius(charge)
            lineWidth(4)
            stroke( env.style.color.shakeCharge )
            circle( 0, 0, chargeR )
        }

        // seismic wave
        if (this.waveCharge) {
            lineWidth(4)
            stroke( env.style.color.seismicWave)
            circle( 0, 0, this.waveR )
        }

        restore()
    }

    onCapture(tribe, prevTribe) {
        log(`${this.name} is captured by @${tribe}`)
        lib.sfx('capture')
    }

    getShakeCharge() {
        if (!this.shakeAt) return 0
        return min((env.time - this.shakeAt) / env.tune.maxEffectiveShakeTime, 1)
    }

    getChargeRadius(charge) {
        return this.r - .8 * this.r * charge
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

    isCrackedArea(tau) {
        tau = lib.util.balancedAngle(tau)
        let within = false
        this._ls.forEach(e => {
            if (e instanceof dna.space.pod.Crack
                    && abs(e.tau - tau) <= env.tune.plume.effectArea * 4) {
                within = true
            }
        })
        return within
    }

}
