function randomSources() {
    lib.touch('source')
    const cosmology = lib.source.attach( math.createRandomGenerator(), 'cosmology')
    cosmology.setSeed( env.tune.source.cosmology )
    const asteroid = lib.source.attach( math.createRandomGenerator(), 'asteroid')
    asteroid.setSeed( env.tune.source.asteroid )
    const events = lib.source.attach( math.createRandomGenerator(), 'events')
    events.setSeed( env.tune.source.events )
    const bot = lib.source.attach( math.createRandomGenerator(), 'bot')
    bot.setSeed( env.tune.source.bot )
    const background = lib.source.attach( math.createRandomGenerator(), 'background')
    background.setSeed( env.tune.source.background )

}
randomSources.Z = 2
