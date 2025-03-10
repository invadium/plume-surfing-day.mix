function onActivate() {
    this.startedAt = env.time

    // TODO clean up old credits roll
    // ...
    this.__.apply(e => kill(e), e => e.roll)
    
    this.__.spawn(dna.hud.RollingText, {
        roll:        true,
        name:       'textRoll',
        ry:         .8,
        text:        res.txt.credits,
        font:        env.style.font.credits.head, 
        textColor:   env.style.color.credits.front,
        shadowColor: env.style.color.credits.back,
        lineSpeed:  -ry(.05),
        lineTime:    1,
        keepLineFor: 10,
    })
}

function onDeactivate() {}

function next() {
    trap('state/menu')
}

function evo(dt) {
    if (this.startedAt && env.time > this.startedAt + env.style.credits.keep) {
        this.startedAt = 0
        this.next()
    }
}
