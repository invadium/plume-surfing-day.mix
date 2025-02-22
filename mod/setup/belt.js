function belt() {
    env.beltRadius = 2000
    lab.port.spawn( dna.space.BeltProbe )

    lab.port.spawn( dna.space.Planet, {
        name: 'Odin',
        x:     -150,
        y:     0,
        r:     100,
        kR:    400,
        gR:    500,
    })
    lab.port.spawn( dna.space.Planet, {
        name: 'Marduk',
        x:     550,
        y:     -300,
        r:     80,
        kR:    350,
        gR:    400,
    })
    lab.port.spawn( dna.space.Planet, {
        name: 'Lugaluru',
        x:     350,
        y:     350,
        r:     120,
        kR:    400,
        gR:    600,
    })


    let tribe = 4
    pin.inky = lab.port.spawn( dna.space.Creature, {
        tribe,
        alias: 'inky',
        x:    -150,
        y:    -240,
    })
    pin.blinky = lab.port.spawn( dna.space.Creature, {
        tribe,
        alias: 'blinky',
        x:    -80,
        y:    -200,
    })
    pin.pinky = lab.port.spawn( dna.space.Creature, {
        tribe,
        alias: 'pinky',
        x:     20,
        y:    -180,
    })

    tribe = 1
    pin.inky = lab.port.spawn( dna.space.Creature, {
        tribe,
        alias: 'clyde',
        x:    0,
        y:    240,
    })
    pin.blinky = lab.port.spawn( dna.space.Creature, {
        tribe,
        alias: 'jeff',
        x:    -120,
        y:    120,
    })
}
belt.Z = 21
