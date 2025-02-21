let id = 0

function plume(target, x, y, tau, color, intensity) {
    const s = ry(.001)
    target.spawn(dna.Emitter, {
        x: x,
        y: y,
        //dx: -70*s,
        color: color,
        lifespan: 0.5,
        force: 750 * intensity,
        radius: 5,
        size: 1*s, vsize: 2*s,
        speed: 40*s, vspeed: 200*s,
        angle: tau - .2, spread: .4,
        minLifespan: 1, vLifespan: 1,
        drawParticle: function() {
            fill(this.color)
            rect(floor(this.x), floor(this.y), this.r, this.r)
        }
    })
}

function ouch(target, x, y, color) {
    const s = ry(.001)
    target.spawn(dna.Emitter, {
        x: x,
        y: y,
        //dx: -70*s,
        color: color,
        lifespan: 0.05,
        force: 2000,
        radius: 0,
        size: 2*s, vsize: 2*s,
        speed: 100*s, vspeed: 20*s,
        angle: 0, spread: PI2,
        minLifespan: .2, vLifespan: 0.8,
        drawParticle: function() {
            fill(this.color)
            rect(floor(this.x), floor(this.y), this.r, this.r)
        }
    })
}

function touchdown(target, x, y, tau, color, intensity) {
    const s = ry(.001)
    target.spawn(dna.Emitter, {
        x: x,
        y: y,
        color: color,
        lifespan: 0.05,
        force: 500 * intensity,
        radius: 0,
        size: s, vsize: 3,
        speed: 50*s, vspeed: 80*s,
        angle: tau - .4 * PI, spread: .8 * PI,
        minLifespan: .4, vLifespan: 0.5,
        drawParticle: function() {
            fill(this.color)
            rect(floor(this.x), floor(this.y), this.r, this.r)
        }
    })
}


function death(target, x, y, color) {
    const s = ry(.001)
    target.spawn(dna.Emitter, {
        x: x,
        y: y,
        dx: -50 * s,
        color: color,
        lifespan: .3,
        force: 2000,
        radius: 0,
        size: 2*s, vsize: 4*s,
        speed: 150*s, vspeed: 100*s,
        angle: PI, spread: PI,
        minLifespan: 0.5, vLifespan: 0.2,
        drawParticle: function() {
            fill(this.color)
            rect(floor(this.x), floor(this.y), this.r, this.r)
        }
    })
}


function teleport(target, x, y, color) {
    const s = ry(.001)
    target.spawn(dna.Emitter, {
        x: x,
        y: y,
        dx: -50 * s,
        color: color,
        lifespan: 1,
        force: 2000,
        radius: 0,
        size: 3*s, vsize: 0,
        speed: 100*s, vspeed: 50*s,
        angle: PI, spread: PI,
        minLifespan: 0.3, vLifespan: 0.2,
        drawParticle: function() {
            fill(this.color)
            rect(floor(this.x), floor(this.y), this.r, this.r)
        }
    })
}

function blowup(target, x, y, color) {
    const s = ry(.001)
    const emitter = target.spawn(dna.Emitter, {
        x: x,
        y: y,
        color: color,
        lifespan: 0.05,
        force: 1000,
        radius: 0,
        size: 2*s, vsize: 1*s,
        speed: 80*s, vspeed: 40*s,
        angle: 1.5*PI, spread: PI,
        minLifespan: 0.3, vLifespan: 0.3,
        drawParticle: function() {
            fill(this.color)
            rect(floor(this.x), floor(this.y), this.r, this.r)
        }
    })
    return emitter
}

function implosion(target, x, y, color) {
    const s = ry(.001)
    const emitter = target.spawn(dna.Emitter, {
        x: x,
        y: y,
        color: color,
        lifespan: 0.03,
        force: 2500,
        radius: 0,
        //edge: 100*s,
        size: 3*s, vsize: 0,
        speed: 60*s, vspeed: 0,
        angle: 1.5*PI, spread: PI,
        minLifespan: 0.2, vLifespan: 0.3,
        drawParticle: function() {
            fill(this.color)
            rect(floor(this.x), floor(this.y), this.r, this.r)
        }
    })
    return emitter
}
