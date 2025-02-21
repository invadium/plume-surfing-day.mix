const tune = {

    G:          2400,
    friction:   10,
    surfaceTug: 20,

    port: {
        slideSpeed: 1000,
        zoomFactor: 2,
    },

    plume: {
        effectArea: 0.2,
    },

    creature: {
        baseSurfaceSpeed: 50,
        baseSurfaceForce: 2400,
        baseSurfaceJump:  40,
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
