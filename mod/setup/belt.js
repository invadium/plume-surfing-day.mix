function belt() {
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


    pin.inky = lab.port.spawn( dna.space.Creature, {
        alias: 'inky',
        x:    -150,
        y:    -240,
    })

    pin.blinky = lab.port.spawn( dna.space.Creature, {
        alias: 'blinky',
        x:    -80,
        y:    -200,
    })

    pin.pinky = lab.port.spawn( dna.space.Creature, {
        alias: 'pinky',
        x:     20,
        y:    -180,
    })
}
belt.Z = 21
