function space() {
    lab.background = env.style.color.space

    // create a new starfield
    lab.spawn( dna.space.Starfield, {
        Z:    1,
        seed: 1004, // TODO set the starfield seed based on the level info or maybe randomize it?
    })
}
space.Z = 5
