module.exports = function(st) {
    const nextSector = $.sector.locate(st.sector)
    if (!nextSector) throw new Error(`Sector [${st.sector}] is not found!`)

    log('=====  NEW GAME  =====')
    log(`Sector #${nextSector.id}:[${nextSector.title}]`)
    lab.control.game.loadSector(nextSector)
    lab.control.state.transitTo('space', st)
}
