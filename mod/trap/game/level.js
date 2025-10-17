function level(st) {
    let nextLevel
    if (isNum(st.level)) {
        nextLevel = $.lvl._ls[st.level - 1]
    } else if (isStr(st.level)) {
        // locate by name
        nextLevel = $.lvl.selectOne(l => l.level.title === st.level)
    }

    if (!nextLevel) throw new Error(`Level [${st.level}] is not found!`)
    log(`=== Level [${nextLevel}] ===`)
    lab.control.level.load(nextLevel)
    lab.control.state.transitTo('space', st)
}
