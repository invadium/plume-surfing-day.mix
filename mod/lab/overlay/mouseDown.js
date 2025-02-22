function mouseDown(e) {
    const ls = []
    const last = lab.port.pick( mouse.x, mouse.y, ls )

    if (e.button === 0) {
        // left click
        
        // check for a planet
        const planets = ls.filter(e => e instanceof dna.space.Planet)
        if (planets.length > 0) {
            // TODO start the tectonic charge instead
            const planet = planets[0]
            env.shakenPlanet = planet
            planet.shake()
        }

        const creatures = ls.filter(e => e instanceof dna.space.Creature)
        creatures.forEach( creature => creature.wakeUp() )


    } else if (e.button === 1) {
        // middle click
        if (!last) return
        if ((last instanceof dna.space.Planet) || (env.debug && (last instanceof dna.space.Creature))) {
            lab.port.speed = env.tune.port.slideSpeed * lab.port.scale
            lab.port.follow(last, true)
        }

    } else if (e.button === 2) {
        // right click

        // log world coordinates
        const {x, y} = e
        const w = lab.port.lxy(x, y)
        log('coords: ' + w.x + ':' + w.y)

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
            //lib.vfx.touchdown(lab.port, w.x, w.y, '#ffff00')
        }
    }
}
