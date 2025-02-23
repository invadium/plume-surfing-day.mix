class HealthPod {

    constructor(st) {
        extend(this, {
            type: 'pod',
            name: 'healthPod',
        }, st)
    }

    evo(dt) {
        const __ = this.__
        if (__.hp === __.maxHP || !__.surfaced || abs(__.momentum.speedV[0]) > 0) return
        // damaged, surfaced and motionless
        if (__.momentum.surface.isWithinCrack(__.polar[0])) {
            // recupperate health
            __.hp += env.tune.creature.hpRestoreRate * dt
            if (__.hp > __.maxHP) __.hp = __.maxHP
        }
    }
}
