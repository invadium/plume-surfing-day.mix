function mouseDown(e) {

    const state = lab.control.state.stateNode()
    if (state && state.mouseDown) {
        state.mouseDown(e)
    }
}
