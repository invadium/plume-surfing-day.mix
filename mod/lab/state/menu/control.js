function compileLevelList() {
    const levelsOption = this.__.items.filter(e => e.id === 'levels')[0]

    const options = []
    levelsOption.options = options

    $.lvl._ls.forEach((level, i)=> {
        options.push(`${i + 1} - ${level.info.title}`)
    })
}

function toggleResumeGameVisibility() {
    const resumeItem = this.__.items.filter(e => e.id === 'resume')[0]

    resumeItem.hidden = !lab.control.game.inProgress()
}

function onActivate() {
    this.compileLevelList()
    this.toggleResumeGameVisibility()
}

function onDeactivate() {
}
