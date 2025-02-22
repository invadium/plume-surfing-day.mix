const tune = {

    G:          2400,
    friction:   20,
    surfaceTug: 20,

    maxEffectiveShakeTime: 2,
    waveSpeed:             250,

    port: {
        slideSpeed: 1000,
        zoomFactor: 2,
    },

    planet: {
        captureTime:           10,
        seismicCapacityFactor: 4, // multiplied with a planet radius to get the capacity
        baseSeismicChargeRate: 6,
        varSeismicChargeRate:  4,
    },

    plume: {
        effectArea: 0.2,
        ventProbability: 1/60,
    },

    creature: {
        baseSurfaceSpeed: 50,
        baseSurfaceForce: 4000,
        baseSurfaceJump:  40,
        baseHP:           100,
        baseHitForce:     20,
        hitDelay:         1,
        wakeUpJump:       25,
        wakeAcceleration: 15,
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

    warpProbePeriod: 5,

    debug: {
        mouse: {
            pushForce:    4000, 
            restDeltaV:  -50,
            moveForce:    2000,
            jetForce:     5000,
            jumpAcceleration: 70,
        }
    }
}
