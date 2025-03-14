const items = [
    {
        title: 'New Game',
        select: function(menu) {
            //trap('game/new')
            const levelOptions = menu.items[2]
            const idx = levelOptions.current || 0
            trap('game/level', {
                level: idx + 1,
            })
        },
    },
    {
        title: 'Level',
        section: true,
    },
    {
        id:      'levels',
        options:  [],
    },
    {
        title: 'Options',
        submenu: 'options',
    },
    {
        title: 'Credits',
        select: function() {
            lab.control.state.transitTo('credits')
        }
    },
    {
        id:     'resume',
        hidden:  true,
        title:  'Resume Game',
        select: function() {
            lab.control.state.transitTo('space')
        },
    },
]
items.preservePos = true

