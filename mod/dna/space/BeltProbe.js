// shows belt radius
class BeltProbe {

    constructor(st) {
        extend(this, {
            'transient':  true,
            name:        'beltProbe',
        }, st)
    }

    draw() {
        lineWidth(4)
        stroke('#808080')
        circle(0, 0, env.beltRadius)
    }
}
