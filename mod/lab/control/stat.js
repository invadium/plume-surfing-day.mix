function tribes() {
    const stat = []

    function regTribe(tribe) {
        if (!stat[tribe]) stat[tribe] = {
            tribe:      tribe,
            planets:    0,
            population: 0,
            active:     lab.control.game.isTribeActive(tribe),
        }
    }

    function regPlanet(tribe) {
        regTribe(tribe)
        stat[tribe].planets ++
    }

    function regCreature(tribe) {
        regTribe(tribe)
        stat[tribe].population ++
    }

    const ls = lab.port._ls
    for (let i = ls.length - 1; i >= 0; i--) {
        const e = ls[i]
        if (e instanceof dna.space.Planet) {
            regPlanet(e.tribe || 0)
        } else if (e instanceof dna.space.Creature) {
            regCreature(e.tribe || 0)
        }
    }

    return stat.filter(e => e.active)
}
