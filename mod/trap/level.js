function level(st) {

    let nextLevel
    if (isNum(st)) {
        nextLevel = $.lvl._ls[st - 1]
    } else if (isStr(st)) {
        // locate by name
        nextLevel = $.lvl.find(l => l.level.title === st)
    }

    if (!nextLevel) throw new Error(`Level [${st}] is not found!`)
    lab.control.level.load(nextLevel)
}
