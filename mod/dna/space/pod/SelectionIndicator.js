class SelectionIndicator {

    constructor(st) {
        extend(this, {
            probe: true,
            type: 'probe',
            name: 'selectionIndicator',
        }, st)
    }

    draw() {
        if (!this.__.selected) return
        save()
        rotate(-this.__.dir)

        const r = this.__.r
        lineWidth(2)
        stroke('#ffff00')
        rect(-r, -r, 2*r, 2*r)

        restore()
    }
}
