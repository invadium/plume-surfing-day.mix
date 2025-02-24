function volcanoid(args, line, con) {
    lab.port.apply(planet => {
        planet.apply(crack => {
            crack.fullCharge()
        }, e => e instanceof dna.space.pod.Crack)
    }, e => e instanceof dna.space.Planet)
}
volcanoid.info = 'recharge all crack to the max seismic capacity'

