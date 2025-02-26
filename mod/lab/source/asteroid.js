
function evo(dt) {
    if (!(lib.source.asteroid.rndf() < env.asteroidFq * dt)) return

    // determine the target point
    const targetTau = lib.source.asteroid.rnda(),
          targetR = .5 * env.beltRadius * lib.source.asteroid.rndf(),
          tx = cos(targetTau) * targetR,
          ty = sin(targetTau) * targetR

    // determine the source point
    const sourceTau = lib.source.asteroid.rnda(),
          sourceR = 2 * env.beltRadius,
          sx = cos(sourceTau) * sourceR,
          sy = sin(sourceTau) * sourceR

    const phi = bearing(sx, sy, tx, ty)

    const mass = env.tune.asteroid.baseMass + env.tune.asteroid.varMass * lib.source.asteroid.rndf()
    const asteroid = lab.port.spawn( dna.space.Asteroid, {
        x:     sx,
        y:     sy,
        r:     mass,
        mass:  mass,
        warpR: 1.2 * sourceR,
    })
    asteroid.momentum.speedV = [
        cos(phi) * 100,
        sin(phi) * 100,
    ]
}
