function keyUp(e) {
    if (e.ctrlKey || e.altKey || e.metaKey) return

    switch(e.code) {
        case 'Escape':
            if (env.state === 'space' && !env.transition) {
                trap('state/menu')
            }
            break
    }
}
