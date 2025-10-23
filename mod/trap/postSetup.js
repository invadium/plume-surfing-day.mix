function postSetup() {
    if (env.config.warp) {
        // fast-jump into a level
        if (typeof env.config.warp === 'boolean') {
            trap('game/new', {
                sector: 1,
                fadein: 0,
            })
        } else {
            trap('game/new', {
                sector: env.config.warp,
                fadein: 0,
            })
        }
    } else {
        lab.control.state.transitTo('title', {
            fadein: 0,
        })
    }
}

