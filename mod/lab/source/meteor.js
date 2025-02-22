
function evo(dt) {
    if (lib.source.meteor.rndf() > env.tune.meteorFq * dt) return

    // determine the target point
    const targetTau = lib.source.meteor.rnda(),
          targetR = .5 * env.beltRadius * lib.source.meteor.rndf(),
          tx = cos(targetTau) * targetR,
          ty = sin(targetTau) * targetR

    // determine the source point
    const sourceTau = lib.source.meteor.rnda(),
          sourceR = 2 * env.beltRadius,
          sx = cos(sourceTau) * sourceR,
          sy = sin(sourceTau) * sourceR

    const phi = bearing(sx, sy, tx, ty)

    const meteor = lab.port.spawn( dna.space.Meteor, {
        x:     sx,
        y:     sy,
        r:     10,
        warpR: 1.2 * sourceR,
    })
    meteor.momentum.speedV = [
        cos(phi) * 100,
        sin(phi) * 100,
    ]
}
