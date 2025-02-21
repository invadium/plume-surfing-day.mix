class BotProbe {

    constructor(st) {
        extend(this, {
            probe: true,
            type: 'probe',
            name: 'botProbe',
            x:     0,
            y:     0,
        }, st)
    }

    onInstall() {
        if (!this.__.bot) throw new Error('[${this.name}] a bot pod MUST be installed first!')
    }

    draw() {
        const state = this.__.bot.getState()

        save()
        rotate(-this.__.dir)

        fill('#ffff00')
        baseTop()
        alignRight()
        font(env.style.font.debug.head)
        text(`${state}`, this.x, this.y)

        restore()
    }
}
