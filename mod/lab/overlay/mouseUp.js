function mouseUp(e) {

    if (e.button === 0) {
        // left click is over
        if (env.shakenPlanet) {
            env.shakenPlanet.shockwave()
        }
    }
}
