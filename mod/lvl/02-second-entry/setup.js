function setup() {
    env.beltRadius = 1500
    env.meteorFq   = env.tune.meteor.baseFq
    lab.port.spawn( dna.space.BeltProbe )

    // central planet
    lab.port.spawn( dna.space.Planet, {
        name: 'Gram',
        tribe: 1,
        pop:   5,
        x:     0,
        y:     0,
        r:     80,
        kR:    350,
        gR:    450,
    })


    // left-bottom green sector
    lab.port.spawn( dna.space.Planet, {
        name: 'Odin',
        tribe: 0,
        pop:   2,
        x:     -680,
        y:     345,
        r:     100,
        kR:    400,
        gR:    500,
    })

    lab.port.spawn( dna.space.Planet, {
        name: 'Marduk',
        tribe: 2,
        pop:   2,
        x:     550,
        y:     -300,
        r:     80,
        kR:    350,
        gR:    400,
    })

    lab.port.spawn( dna.space.Planet, {
        name: 'Lugaluru',
        tribe: 4,
        pop:   2,
        x:     380,
        y:     300,
        r:     120,
        kR:    400,
        gR:    600,
    })

    // left-upper blue corner
    lab.port.spawn( dna.space.Planet, {
        name: 'Seshet',
        tribe: 3,
        pop:   2,
        x:    -507,
        y:    -381,
        r:     110,
        kR:    500,
        gR:    600,
    })

}
