class PlanetOwnerMonitor {

    constructor(st) {
        extend(this, {
            type: 'monitor',
            name: 'planetOwnerMonitor',
            lastCheck: 0,
            preOwner: -1,
            preCaptureTime: 0,
        }, st)
    }

    assignOwner(tribe) {
        const prevTribe = this.__.tribe
        // TODO defer for a capture period
        if (tribe !== prevTribe) {
            if (this.preOwner !== tribe) {
                // setup capture timer
                this.preOwner = tribe
                this.preCaptureTime = env.time
            } else {
                if (this.preCaptureTime + env.tune.planet.captureTime < env.time) {
                    this.__.tribe = tribe
                    this.__.onCapture(tribe, prevTribe)
                }
            }
        }
    }

    checkOwnership() {
        const __ = this.__
        const tribes = []
        lab.port._ls.forEach(e => {
            if (e instanceof dna.space.Creature
                    && e.surfaced
                    && e.momentum.surface === __) {
                if (tribes[e.tribe]) tribes[e.tribe] ++
                else tribes[e.tribe] = 1
            }
        })

        let tribesCount = 0
        let lastTribe = -1
        for (let i = 1; i < env.tune.tribe.max + 1; i++) {
            const n = tribes[i]
            if (n > 0) {
                tribesCount ++
                lastTribe = i
            }
        }

        let owner = -1
        if (tribesCount === 0) {
            owner = 0
        } else if (tribesCount === 1) {
            owner = lastTribe
        }
        if (owner >= 0 && __.tribe !== owner) {
            this.assignOwner(owner)
        }
    }

    evo(dt) {
        const timer = env.time - this.lastCheck
        if (timer > 1) {
            this.checkOwnership()
            this.lastCheck = env.time
        }
    }
}
