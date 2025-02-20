function mouseDown(e) {

    if (e.button === 1) {
        // middle click
        const ls = []
        const last = lab.port.pick( mouse.x, mouse.y, ls )

        if (last && last instanceof dna.space.Planet) {
            lab.port.speed = env.tune.port.slideSpeed * lab.port.scale
            lab.port.follow(last, true)
        }

    } else if (e.button === 2) {
        // right click

        // log world coordinates
        const {x, y} = e
        const w = lab.port.lxy(x, y)
        log('coords: ' + w.x + ':' + w.y)

        const ls = []
        const last = lab.port.pick( mouse.x, mouse.y, ls )
        if (last) {
            if (env.selected) {
                env.selected.selected = false
            }
            env.selected = last
            last.selected = true
            console.dir(last)
            lib.vfx.ouch(lab.port, w.x, w.y, '#aabb00')

        } else {
            if (env.selected) {
                env.selected.selected = false
                env.selected = null
            }
            lib.vfx.ouch(lab.port, w.x, w.y, '#ee4000')
        }
    }
}
