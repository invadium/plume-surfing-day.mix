let id = 0

class Crack {

    constructor(st) {
        extend(this, {
            name:  'crack' + (++id),
            type:  'probe',
            tau:    0,
            depth:  50,
            w:      10,
            dir:    0,
            energy: 0,
        }, st)
    }

    onInstall() {
        this.r2 = this.__.r
        this.r1 = this.r2 - this.depth
        this.seismicCapacity = round(env.tune.planet.seismicCapacityFactor * this.depth)
        this.seismicChargeRate = env.tune.planet.baseSeismicChargeRate
            + env.tune.planet.varSeismicChargeRate * lib.source.cosmology.rndf()

        this.lid = this.__._ls.filter(e => e instanceof dna.space.pod.Crack).length
        this.alias = 'crack' + this.lid
    }

    plume(releasedEnergy) {
        const planet = this.__
        const intensity = 10
        const lx = cos(this.tau) * this.r2
        const ly = sin(this.tau) * this.r2

        if (releasedEnergy > this.energy) releasedEnergy = this.energy
        this.energy -= releasedEnergy

        log(`[${planet.name}/${this.alias}] released energy: ${round(releasedEnergy)}`)
        //log(`seismic capacity: ${this.seismicCapacity}, depth: ${this.depth}`)
        const lower  = math.normalizeAngle(this.tau - env.tune.plume.effectArea)
        const higher = math.normalizeAngle(this.tau + env.tune.plume.effectArea)
        lab.port._ls.forEach(e => {
            if (!e.dead
                    && (e instanceof dna.space.Creature || e instanceof dna.space.MineralDeposit)
                    && e.momentum.surface === planet) {
                const tau = math.normalizeAngle(e.polar[0])
                if (lib.util.angleInRange(tau, lower, higher)) {
                    e.momentum.surfaceJumpAction(releasedEnergy)
                }
            }
        })

        lib.vfx.plume(this.__, lx, ly, this.tau, env.style.color.plume, releasedEnergy)
        lib.sfx('plume')
    }

    vent() {
        const ventRate = lib.source.events.rndf()
        const releasedEnergy = this.energy * ventRate
        this.plume(releasedEnergy)
        //this.energy = this.energy - releasedEnergy
        //const cracks = this._ls.filter(e => e instanceof dna.space.pod.Crack)
        //const crackEnergy = releasedEnergy / cracks.length
        //cracks.forEach(crack => crack.plume(crackEnergy))
    }

    shake(charge) {
        this.plume(this.energy * charge)
    }

    fullCharge() {
        this.energy = this.seismicCapacity
    }

    drawShape(sh) {
        moveTo(this.r1,  0)
        lineTo(this.r2, -sh)
        lineTo(this.r2,  sh)
        closePath()
        shape()
    }

    evo(dt) {
        this.energy += this.seismicChargeRate * dt
        if (this.energy > this.seismicCapacity) {
            this.energy = this.seismicCapacity
            if (lib.source.events.rndf() < env.tune.plume.ventProbability * dt) {
                this.vent()
            }
        }
    }

    draw() {
        const sh = 10
        const charge = this.getSeismicCharge()
        const r1  = this.r1
        const r15 = this.r1 + (this.r2 - this.r1) * charge
        const s15 = ((r15 - r1) / (this.r2 - r1)) * sh

        save()
        rotate(this.tau)

        fill(env.style.color.crack.base)
        this.drawShape(sh)

        //fill(env.style.color.crack.high)
        fill('#ff4020')
        moveTo(this.r1,   0)
        lineTo(r15,     -s15)
        lineTo(r15,      s15)
        closePath()
        shape()

        lineWidth(2)
        stroke(env.style.color.crack.low)
        this.drawShape(sh)

        restore()
    }

    getSeismicCharge() {
        return this.energy / this.seismicCapacity
    }
}
