function inProgress() {
    return !!env.sector
}

function inSpace() {
    return (env.state === 'space')
}

function enterNewSector() {
    this.tribes = []
    for (let i = 0; i < env.tune.tribe.max; i++) {
        this.tribes[i] = false
    }
}

function loadSector(sector) {
    log(`Loading up sector [${sector.title}]...`)

    lab.control.scene.clearAll()
    this.enterNewSector()

    if (isFun(sector.setup)) sector.setup()

    env.sector = sector
}

function activateTribe(i) {
    if (i >= 0 && i <= env.tune.tribe.max) {
        this.tribes[i] = true
        this.tribes.active = this.tribes.filter(e => e).reduce((acc, e) => {
            if (e) return acc + 1
        }, 0)
    } else {
        throw new Error(`can't activate tribe #${i}`)
    }
}

function isTribeActive(i) {
    if (!this.tribes) return false
    return this.tribes[i]
}
