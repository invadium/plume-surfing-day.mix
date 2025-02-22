let lastProbe = 0

function warpSpace() {
    lab.port._ls.forEach(e => {
        if (e instanceof dna.space.Creature
                && !e.bounded
                && dist(0, 0, e.x, e.y) > env.beltRadius) {
            log(`warping ${e.getTitle()}!`)
            e.x = -e.x
            e.y = -e.y
        }
    })
}

function evo(dt) {
    if (lastProbe + 5 < env.time) {
        warpSpace()
        lastProbe = env.time
    }
}
