function evo(dt) {
    if (!env.debug || !env.selected || !(env.selected instanceof dna.space.Creature)) return

    const target = env.selected
    if (mouse.buttons & 1) {
        const mass = env.tune.debug.mousePushMass
        const w = lab.port.lxy(mouse.x, mouse.y)
        const a = bearing( target.x, target.y, w.x, w.y )
        target.momentum.push([ cos(a), sin(a) ], mass)
    } else if (mouse.buttons & 4) {
        target.momentum.deltaV(env.tune.debug.mouseRestDeltaV * dt)
    }
}
