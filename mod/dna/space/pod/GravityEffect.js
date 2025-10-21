function creatureTug(planet, __, d, dt) {
    if (!planet || d > planet.gR) {
        __.momentum.releaseFromPlanet() // no planet in the range for gravitational tug
        return
    }
    const boundedPlanet = __.momentum.boundToPlanet(planet)

    const phi = bearing( __.x, __.y, boundedPlanet.x, boundedPlanet.y )
    __.momentum.gravityUnit = [ cos(phi), sin(phi) ]
    if (!__.surfaced) {
        // pull down to the surface
        __.momentum.push(__.momentum.gravityUnit, boundedPlanet.G, dt)
    }

    // setup angular tug - creatures should land on their feet
    const tau = math.normalizeAngle(phi - HALF_PI)
    __.momentum.angularTarget(tau)
}

function spaceBodyTug(planet, __, d, dt) {
    if (!planet || d > planet.gR) return

    const phi = bearing( __.x, __.y, planet.x, planet.y )
    __.momentum.gravityUnit = [ cos(phi), sin(phi) ]
    // pull down to the surface
    __.momentum.push(__.momentum.gravityUnit, planet.G, dt)
}

class GravityEffect {

    constructor(st) {
        extend(this, {
            type: 'physics',
            name: 'gravityEffect',
            boundable: false,
        }, st)
    }

    init() {
        if (!this.__.momentum) throw new Error('[${this.name}] a momentum pod is required for gravity to work!')
    }

    evo(dt) {
        const __ = this.__

        // find the closest planet
        let planet,
            closestDist = 999999
        lab.port._ls.forEach(e => {
            if (e instanceof dna.space.Planet) {
                const d = distance(__.x, __.y, e.x, e.y)
                if (d < closestDist) {
                    closestDist = d
                    planet = e
                }
            }
        })

        if (this.boundable) creatureTug(planet, __, closestDist, dt)
        else spaceBodyTug(planet, __, closestDist, dt)
    }

}
