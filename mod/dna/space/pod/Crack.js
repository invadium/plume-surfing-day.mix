let id = 0

class Crack {

    constructor(st) {
        extend(this, {
            name: 'crack' + (++id),
            type: 'probe',
            tau:   0,
            r1:    50,
            r2:    100,
            w:     10,
            dir:   0,
        }, st)
    }

    plume(force) {
        const planet = this.__
        const intensity = 10
        const lx = cos(this.tau) * this.r2
        const ly = sin(this.tau) * this.r2


        log(`[${planet.name}] force: ${force}`)
        const lower  = math.normalizeAngle(this.tau - env.tune.plume.effectArea)
        const higher = math.normalizeAngle(this.tau + env.tune.plume.effectArea)
        lab.port._ls.forEach(e => {
            if (!e.dead && e instanceof dna.space.Creature && e.momentum.surface === planet) {
                const tau = math.normalizeAngle(e.polar[0])
                if (lib.util.angleInRange(tau, lower, higher)) {
                    // TODO calculate the jump acceleration based on the erruption force
                    e.momentum.surfaceJump(force)
                }
            }
        })

        lib.vfx.plume(this.__, lx, ly, this.tau, env.style.color.plume, force)
    }

    drawShape(sh) {
        moveTo(this.r1,  0)
        lineTo(this.r2, -sh)
        lineTo(this.r2,  sh)
        closePath()
        shape()
    }

    draw() {
        const sh = 10
        const charge = this.__.getCharge()
        const r1  = this.r1
        const r15 = this.r1 + (this.r2 - this.r1) * charge
        const s15 = ((r15 - r1) / (this.r2 - r1)) * sh

        save()
        rotate(this.tau)

        fill(env.style.color.crack.base)
        this.drawShape(sh)

        //fill(env.style.color.crack.high)
        fill('#ff0000')
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
}
