function load(level) {
    log(`Loading level ${level.info.title}...`)

    lab.control.scene.clearAll()
    lab.control.game.newLevel()

    if (isFun(level.setup)) level.setup()

    env.level = level
}
