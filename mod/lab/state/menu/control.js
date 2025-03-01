function onActivate() {
    const levelsOption = this.__.items[2]

    const options = []
    levelsOption.options = options

    $.lvl._ls.forEach((level, i)=> {
        options.push(`${i + 1} - ${level.info.title}`)
    })
}

function onDeactivate() {
}
