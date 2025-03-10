function onActivate() {
    this.startedAt = env.time
}

function onDeactivate() {}

function next() {
    trap('state/menu')
}

function evo(dt) {
    if (this.startedAt && env.time > this.startedAt + env.tune.title.hold) {
        this.startedAt = 0
        this.next()
    }
}
