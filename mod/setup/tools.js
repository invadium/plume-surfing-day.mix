function tools() {
    if (env.config.message) {
        lib.tool.holder.reset()

        if (env.config.timer) {
            env.holdTimer = parseInt(env.config.timer) * 60
        }
    }
}
tools.Z = 9
