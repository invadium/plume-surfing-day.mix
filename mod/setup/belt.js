function belt() {
    lab.port.spawn( dna.space.Planet, {
        name: 'Odin',
        x:     0,
        y:     0,
        r:     100,
    })

    pin.one = lab.port.spawn( dna.space.Creature, {
        name: 'one',
        x:    -150,
        y:    -240,
    })
}
belt.Z = 21
