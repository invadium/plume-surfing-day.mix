function tug(planet, __, d, dt) {
    if (!planet || d > planet.gR) {
        __.momentum.releaseFromPlanet()
        return
    }
    __.momentum.boundToPlanet(planet)

    const phi = bearing( __.x, __.y, planet.x, planet.y )
    __.momentum.gravityUnit = [ cos(phi), sin(phi) ]
    if (!__.surfaced) {
        // pull down to the surface
        __.momentum.push(__.momentum.gravityUnit, planet.G, dt)
    }

    // setup angular tug - creatures should land on their feet
    const tau = math.normalizeAngle(phi - HALF_PI)
    __.momentum.angularTarget(tau)
}

class GravityEffect {

    constructor(st) {

        extend(this, {
            type: 'physics',
            name: 'gravityEffect',
        }, st)
    }

    evo(dt) {
        const __ = this.__

        // find the closest planet
        let planet,
            closestDist = 999999
        lab.port._ls.forEach(e => {
            if (e instanceof dna.space.Planet) {
                const d = dist(__.x, __.y, e.x, e.y)
                if (d < closestDist) {
                    closestDist = d
                    planet = e
                }
            }
        })

        tug(planet, __, closestDist, dt)
    }

}
