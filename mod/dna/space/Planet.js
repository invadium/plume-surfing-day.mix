const Body = require('dna/space/Body')

let id = 0

class Planet extends Body {

    constructor(st) {
        super( extend({
            name: 'planet' + (++id)
        }, st) )
    }

    draw() {
        save() 
        translate( this.x, this.y )

        fill( hsl(.47, .27, .25) )
        circle( 0, 0, this.r )

        lineWidth(3)
        stroke( hsl(.35, .42, .56) )
        circle( 0, 0, this.r )

        restore()
    }
}
