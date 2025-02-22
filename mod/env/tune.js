const tune = {

    G:          2400,
    friction:   20,
    surfaceTug: 20,

    port: {
        slideSpeed: 1000,
        zoomFactor: 2,
    },

    planet: {
        captureTime: 10,
        seismicCapacityFactor: 2, // multiplied with a planet radius to get the capacity
        baseSeismicCharge:     4,
    },

    plume: {
        effectArea: 0.2,
    },

    creature: {
        baseSurfaceSpeed: 50,
        baseSurfaceForce: 4000,
        baseSurfaceJump:  40,
        baseHP:           100,
        baseHitForce:     20,
        hitDelay:         1,
    },

    tribe: {
        max: 4,
    },

    source: {
        cosmology:  101,
        events:     202,
        bot:        303,
        background: 404,
    },

    debug: {
        mouse: {
            pushForce:    2400,
            restDeltaV:  -50,
            moveForce:    2000,
            jetForce:     5000,
            jumpAcceleration: 70,
        }
    }
}
