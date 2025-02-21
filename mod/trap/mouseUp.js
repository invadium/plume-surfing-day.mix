function mouseUp(e) {

    const state = lab.control.state.stateNode()
    if (state && state.mouseUp) {
        state.mouseUp(e)
    }
}
