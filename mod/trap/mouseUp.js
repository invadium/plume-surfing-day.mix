function mouseUp(e) {

    const state = lab.control.state.leadNode()
    if (state && state.mouseUp) {
        state.mouseUp(e)
    }
}
