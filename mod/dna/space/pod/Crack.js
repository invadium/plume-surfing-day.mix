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


        const lower  = math.normalizeAngle(this.tau - env.tune.plume.effectArea)
        const higher = math.normalizeAngle(this.tau + env.tune.plume.effectArea)
        lab.port._ls.forEach(e => {
            if (!e.dead && e instanceof dna.space.Creature && e.momentum.surface === planet) {
                const tau = math.normalizeAngle(e.polar[0])
                if (lib.util.angleInRange(tau, lower, higher)) {
                    // TODO calculate the jump acceleration based on the erruption force
                    e.momentum.surfaceJump(150)
                }
            }
        })

        lib.vfx.plume(this.__, lx, ly, this.tau, env.style.color.plume, intensity)
    }

    draw() {
        save()
        rotate(this.tau)

        lineWidth(2)
        //stroke( hsl(.1, .42, .56) )
        //fill( hsl(.05, .4, .5) )
        //fill( hsl(.05, .4, .5), hsl(.45, 42, .4) )
        fill( env.style.color.crack.base, env.style.color.crack.low )

        moveTo(this.r1,  0)
        lineTo(this.r2, -10)
        lineTo(this.r2,  10)
        closePath()
        shape()

        restore()
    }
}
