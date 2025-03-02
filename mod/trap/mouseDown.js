function mouseDown(e) {
    const state = lab.control.state.leadNode()
    if (state && isFun(state.mouseDown)) {
        state.mouseDown(e)
    }
}
