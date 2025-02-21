function mouseDown(e) {

    const state = lab.control.state.leadNode()
    if (state && state.mouseDown) {
        state.mouseDown(e)
    }
}
