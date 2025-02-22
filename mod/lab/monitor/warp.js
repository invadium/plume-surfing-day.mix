/*
 * Warp Monitor checks the boundaries of our belt system
 * and makes sure the creatures are not flying far away from it.
 *
 * Once they do, warps the space so they will return back
 * from the other side.
 */

// 
let lastProbe = 0

function warpSpace() {
    lab.port._ls.forEach(e => {
        if (e.warpSpace
                && !e.bounded
                && dist(0, 0, e.x, e.y) > e.warpR) {
            e.warpSpace()
        }
    })
}

function evo(dt) {
    if (lastProbe + env.tune.warpProbePeriod < env.time) {
        warpSpace()
        lastProbe = env.time
    }
}
