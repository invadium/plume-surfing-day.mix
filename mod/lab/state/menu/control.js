function setupSectorsList() {
    const sectorsOption = this.__.items.filter(e => e.id === 'sectors')[0]
    sectorsOption.options = $.sector.menuList
}

function toggleResumeGameVisibility() {
    const resumeItem = this.__.items.filter(e => e.id === 'resume')[0]

    resumeItem.hidden = !lab.control.game.inProgress()
}

function onActivate() {
    this.setupSectorsList()
    this.toggleResumeGameVisibility()
}

function onDeactivate() {
}
