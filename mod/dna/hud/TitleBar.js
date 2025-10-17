class TitleBar {

    constructor(st) {
        augment(this, {
            name: 'titleBar',
        }, st)
    }

    draw() {
        if (!lab.control.game.inSpace()) return

        const stat = lab.control.stat.tribes()

        const f = env.style.font.titleBar
        const Y = .5 * f.size

        font(f.head)
        baseTop()
        alignCenter()
        fill( hsl(.6, .8, .7) )

        let rxBase = .15
        const rxStep = (1 - 2*rxBase) / (stat.length - 1)

        for (let i = 0; i < stat.length; i++) {
            const ts = stat[i]

            fill( env.style.color.tribe[ts.tribe].high )
            text(`Tribe-${ts.tribe}: ${ts.planets}/${ts.population}`, rx(rxBase), Y)

            rxBase += rxStep
        }

        /*
        // TODO inject the actual wave value
        text(`Wave:    1`, rx(.15), Y)
        text(`Power:   101`, rx(.35), Y)
        text(`Score:   101`, rx(.65), Y)
        text(`Bounty:  $101k`, rx(.85), Y)
        */

        if (lab.port.paused) {
            let by = ry(.25)
            font(env.style.font.title.head)
            text('Game Paused', rx(.5), by)

            if ((env.realTime - env.pauseTimestamp) % 1 < .5) {
                by += 80
                font(env.style.font.titleBar.head)
                text('Press any Key to Continue', rx(.5), by)
            }
        }
    }
}
