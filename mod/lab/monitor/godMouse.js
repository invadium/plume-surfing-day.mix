function evo(dt) {
    if (!env.debug || !env.selected || !(env.selected instanceof dna.space.Creature)) return

    const target = env.selected

    if (mouse.buttons & 1) {
        if (target.surfaced) {
            // accelerate
            target.momentum.surfacePush(env.tune.debug.mouse.moveForce, dt)

        } else {
            const force = env.tune.debug.mouse.pushForce
            const w = lab.port.lxy(mouse.x, mouse.y)
            const a = bearing( target.x, target.y, w.x, w.y )
            target.momentum.push([ cos(a), sin(a) ], force, dt)
        }
    }

    if (mouse.buttons & 4) {
        if (target.surfaced) {
            // jump
            target.momentum.surfaceJump(env.tune.debug.mouse.jumpAcceleration)
        } else {
            target.momentum.deltaV(env.tune.debug.mouse.restDeltaV * dt)
        }
    }

    if (mouse.buttons & 8) {
        if (target.surfaced) {
            target.momentum.surfacePush(-env.tune.debug.mouse.moveForce, dt)
        }
    }

    if (mouse.buttons & 16) {
        if (target.surfaced) {
            // jump
            target.momentum.surfaceJet(env.tune.debug.mouse.jetForce, dt)
        }
    }
}
