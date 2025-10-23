const items = [
    {
        title: 'New Game',
        select: function(menu) {
            const sectorSelector = menu.items.filter(e => e.id === 'sectors')[0]
            const selected = sectorSelector.options[sectorSelector.current || 0]
            trap('game/new', {
                sector: selected.id,
            })
        },
    },
    {
        title: 'Sector',
        section: true,
    },
    {
        id:      'sectors',
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

