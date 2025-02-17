function belt() {
    lab.port.spawn( dna.space.Planet, {
        name: 'Hoth',
        x:     0,
        y:     0,
        r:     100,
    })

    pin.one = lab.port.spawn( dna.space.Creature, {
        name: 'one',
        x:    0,
        y:    -140,
    })

}
belt.Z = 21
