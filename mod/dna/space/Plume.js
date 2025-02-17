let id = 0

const Body = require('dna/space/Body')

class Plume extends Body {

    constructor(st) {
        super( extend({
            name: 'plume' + (++id),
            x:    0,
            y:    0,
            dir:  0,
        }, st) )
    }

}
