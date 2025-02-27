
function evo(dt) {
    if (!(lib.source.comet.rndf() < env.comet* dt)) return

    // determine the target point
    const targetTau = lib.source.comet.rnda(),
          targetR = .5 * env.beltRadius * lib.source.comet.rndf(),
          tx = cos(targetTau) * targetR,
          ty = sin(targetTau) * targetR

    // determine the source point
    const sourceTau = lib.source.comet.rnda(),
          sourceR = 2 * env.beltRadius,
          sx = cos(sourceTau) * sourceR,
          sy = sin(sourceTau) * sourceR

    const phi = bearing(sx, sy, tx, ty)

    const mass = env.tune.comet.baseMass + env.tune.comet.varMass * lib.source.comet.rndf()
    const comet = lab.port.spawn( dna.space.Comet, {
        x:     sx,
        y:     sy,
        r:     mass,
        mass:  mass,
        warpR: 1.2 * sourceR,
    })
    comet.momentum.speedV = [
        cos(phi) * 100,
        sin(phi) * 100,
    ]
}
