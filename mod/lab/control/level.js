function load(level) {
    log(`Loading level ${level.info.title}...`)

    lab.control.scene.clearAll()

    if (isFun(level.setup)) level.setup()
}
