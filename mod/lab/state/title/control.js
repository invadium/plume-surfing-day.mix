function onActivate() {
    this.startedAt = env.time
}

function onDeactivate() {}

function next() {
    if (!this.startedAt) return

    this.startedAt = 0
    trap('state/menu')
}

function evo(dt) {
    if (this.startedAt && env.time > this.startedAt + env.tune.title.hold) {
        this.next()
    }
}
