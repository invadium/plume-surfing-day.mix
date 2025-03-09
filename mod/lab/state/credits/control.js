function onActivate() {
    this.startedAt = env.time
}

function onDeactivate() {
    log("=== SHOWING TITLE ===")
}

function next() {
    trap('state/menu')
}

function evo(dt) {
    if (this.startedAt && env.time > this.startedAt + env.tune.title.hold) {
        this.startedAt = 0
        this.next()
    }
}
