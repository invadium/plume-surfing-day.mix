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
        //const wxy = this.__.polarToWorld(this.tau, this.r1)
        const intensity = 10
        //const w = this.__.polarToWorld(this.tau, this.r2)
        const lx = cos(this.tau) * this.r2
        const ly = sin(this.tau) * this.r2
        //lib.vfx.plume(this.__, lx, ly, '#ffffff80', intensity)
        //lib.vfx.ouch(lab.port, w[0], w[1], '#ee2000')
        lib.vfx.plume(this.__, lx, ly, this.tau, '#ffffff80', intensity)
    }

    evo(dt) {
    }

    draw() {
        save()
        rotate(this.tau)

        lineWidth(2)
        stroke( hsl(.1, .42, .56) )
        line(this.r1, 0, this.r2, 0)

        restore()
    }
}
