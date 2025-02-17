function click(e) {
    const {x, y} = e
    const w = lab.port.lxy(x, y)
    //log('coords: ' + w.x + ':' + w.y)
    lib.vfx.ouch(lab.port, w.x, w.y, '#aabb00')
}
