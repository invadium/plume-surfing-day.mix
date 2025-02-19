function tug(planet, __, d, dt) {
    if (!planet || d > planet.gR) {
        __.momentum.releasePlanet()
        return
    }
    __.momentum.boundPlanet(planet)

    const phi = bearing( __.x, __.y, planet.x, planet.y )
    __.momentum.push([ cos(phi), sin(phi) ], planet.G)

    // TODO angular momentum MUST be involved
    const tau = math.normalizeAngle(phi - HALF_PI)
    if (__.dir < tau) {
        __.dir += planet.aG * dt
        if (__.dir > tau) __.dir = tau
    } else if (__.dir > tau) {
        __.dir -= planet.aG * dt
        if (__.dir < tau) __.dir = tau
    }
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
