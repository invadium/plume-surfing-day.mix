class MomentumProbe {

    constructor(st) {
        extend(this, {
            probe: true,
            type: 'probe',
            name: 'momentumProbe',
        }, st)
    }

    onInstall() {
        if (!this.__.momentum) throw new Error('[momentumProbe] a momentum pod is expected to be installed')
    }

    draw() {
        // assume we are at the body's origin
        save()
        rotate(-this.__.dir)

        const sV = this.__.momentum.speedV
        stroke('#ff8000')
        lineWidth(2)
        line(0, 0, sV[0], sV[1])

        restore()
    }
}
