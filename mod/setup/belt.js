
function belt() {
    env.beltRadius = 2500
    env.meteorFq   = env.tune.meteor.baseFq
    lab.port.spawn( dna.space.BeltProbe )

    // central planet
    lab.port.spawn( dna.space.Planet, {
        name: 'Gram',
        tribe: 1,
        pop:   3,
        x:     0,
        y:     0,
        r:     80,
        kR:    350,
        gR:    450,
    })


    // left-bottom green sector
    lab.port.spawn( dna.space.Planet, {
        name: 'Odin',
        tribe: 1,
        pop:   3,
        x:     -680,
        y:     345,
        r:     100,
        kR:    400,
        gR:    500,
    })

    lab.port.spawn( dna.space.Planet, {
        name: 'Odin II',
        tribe: 1,
        pop:   4,
        x:    -690,
        y:     867,
        r:     130,
        kR:    400,
        gR:    500,
    })
    lab.port.spawn( dna.space.Planet, {
        name: 'Obidikat',
        x: -1550, 
        y: 689, 
        r:     130,
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
        y:     280,
        r:     120,
        kR:    400,
        gR:    600,
    })


    // left-upper blue corner
    lab.port.spawn( dna.space.Planet, {
        name: 'Seshet',
        tribe: 3,
        pop:   5,
        x:    -507,
        y:    -381,
        r:     110,
        kR:    500,
        gR:    600,
    })

    lab.port.spawn( dna.space.Planet, {
        name: 'Seshet II',
        tribe: 3,
        pop:   3,
        x:    -1107,
        y:    -432,
        r:     110,
        kR:    500,
        gR:    600,
    })

    lab.port.spawn( dna.space.Planet, {
        name: 'Ishar III',
        tribe: 3,
        pop:   2,
        x:    -464,
        y:    -1141,
        r:     110,
        kR:    500,
        gR:    600,
    })

    lab.port.spawn( dna.space.Planet, {
        name: 'Ishar',
        tribe: 0,
        x: -1385,
        y: -1255,
        r:     110,
        kR:    500,
        gR:    600,
    })


    // upper-right red corner of universe
    lab.port.spawn( dna.space.Planet, {
        name: 'Starblade',
        tribe: 2,
        pop:   5,
        x: 305,
        y: -726,
        r:     140,
        kR:    600,
        gR:    700,
    })

    lab.port.spawn( dna.space.Planet, {
        name: 'Startopia',
        tribe: 2,
        pop:   3,
        x: 839,
        y: -954,
        r:     90,
        kR:    400,
        gR:    500,
    })



    // lower-right corner
    lab.port.spawn( dna.space.Planet, {
        name: 'Vulkan',
        tribe: 4,
        pop:   7,
        x: 1294,
        y: 173,
        r:     160,
        kR:    700,
        gR:    800,
    })

    lab.port.spawn( dna.space.Planet, {
        name: 'Vulkan II',
        tribe: 4,
        pop:   3,
        x: 1083, 
        y: 1078, 
        r:     70,
        kR:    300,
        gR:    400,
    })

    // some oranges unexpectedly here
    lab.port.spawn( dna.space.Planet, {
        name: 'Vulkan III',
        tribe: 2,
        pop:   2,
        x: 172,
        y: 1638,
        r:     70,
        kR:    300,
        gR:    400,
    })

    /*
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
    lab.port.spawn( dna.space.Creature, {
        tribe,
        alias: 'inky2',
        x:     200,
        y:    -240,
    })
    lab.port.spawn( dna.space.Creature, {
        tribe,
        alias: 'blinky2',
        x:     250,
        y:    -200,
    })
    lab.port.spawn( dna.space.Creature, {
        tribe,
        alias: 'pinky2',
        x:     300,
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
    */

    /*
    lab.port.spawn( dna.space.Meteor, {
        x: 100,
        y: 0,
        r: 10,
        mass: 10,
    })
    lab.port.spawn( dna.space.MineralDeposit, {
        x: 100,
        y: 50,
        r: 10,
        mass: 10,
    })
    */
}
belt.Z = 21
