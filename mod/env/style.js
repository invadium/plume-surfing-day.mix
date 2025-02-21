const style = {

    // colors are based on the LowSpec CARNIVAL 32 palette by b236
    // https://lospec.com/palette-list/carnival-32
    //
    // #4d2235 #71282a #975638 #d0763e #ebac4d #f2d08d #ddac88 #c68d80
    // #af6d77 #c74446 #9f3847 #6e406d #a7a758 #718141 #496541 #37433b
    // #2a1c31 #423157 #4d528a #556a97 #5c81a3 #7dadc8 #b0d6d9 #ece6df
    // #cfccca #a6a6a6 #787878 #626262 #4a4a4a #363636 #618c70 #8b7463
    //
    color: {
        title: hsl(.62, .7, .7),

        space: '#2a1c31',

        tribe: [
            // neutral
            {
                base: '#787878',
                high: '#cfccca',
                low:  '#4a4a4a',
            },
            // green
            {
                base: '#718141',
                high: '#a7a758',
                low:  '#496541',
            },
            // orange
            {
                base: '#d0763e',
                high: '#ebac4d',
                low:  '#71282a',
            },
            // blue
            {
                base: '#5c81a3',
                high: '#b0d6d9',
                low:  '#556a97',
            },
            // red
            {
                base: '#af6d77',
                high: '#c74446',
                low:  '#9f3847',
            },
        ],

        eyes: '#ece6df',

        planet: [
            {
                base: '#496541',
                high: '#a7a758',
            }
        ],

        crack: {
            base: '#c74446',
            low:  '#71282a',
        },

        plume: '#cfccca',
    },

    font: {
        main: {
            family: 'moon',
            size:   24,
        },
        title: {
            family: 'moon',
            size:   64,
        },
        menu: {
            family: 'moon',
            size:   32,
        },

        debug: {
            family: 'moon',
            size: 24,
        },
    },
}

function classifyFonts() {
    for (let id in style.font) {
        const font = style.font[id]
        font.id = id
        font.head = font.size + 'px ' + font.family
    }
}

(function setupStyles() {
    classifyFonts()
})()

