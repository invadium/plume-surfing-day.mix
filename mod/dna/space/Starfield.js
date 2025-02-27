const FQ = 1
const MAX_STARS = 256
const GALAXY_ROT_SPEED = 0.05
const PARALLAX_FACTOR  = 10

class Starfield {

    constructor(st) {
        extend(this, {
            seed:   1001,
            name:  'starfield',
            stars:  [],
        }, st)
        this.source = math.createRandomGenerator()
        this.source.setSeed( this.seed )
        this.populate()
    }

    findDeadStar() {
        const stars = this.stars
        for (let i = 0; i < stars.length; i++) {
            const star = stars[i]
            if (star.dead) return star
        }
    }

    spawnStar(st) {
        let star = this.findDeadStar()
        if (!star) {
            star = {}
            this.stars.push(star)
            star.id = this.stars.length
        }
        extend(star, {
            x:    1,
            y:    this.source.rndf(),
            z:    this.source.rndf(),
            r:    1 + 6 * this.source.rndf(), // TODO factor in z-value to make stars in the distance smaller
            c:    this.source.rnde(env.style.color.star),
            dead: false,
        }, st)
        //log(`created a new star [${star.x}:${star.y}:${star.z}/${star.r} - ${star.c}`)
    }

    killStar(star) {
        star.dead = true
        //log(`star #${star.id} is dead!`)
    }

    populate() {
        for (let i = 0; i < MAX_STARS; i++) {
            this.spawnStar({
                x:   this.source.rndf(),
            })
        }
    }

    evo(dt) {
        let alive = 0
        const stars = this.stars
        for (let i = stars.length - 1; i >= 0; i--) {
            const star = stars[i]
            if (!star.dead) {
                star.x -= (GALAXY_ROT_SPEED * dt) / ((1 + star.z) * PARALLAX_FACTOR)
                if (star.x < 0) this.killStar(star)
                else alive ++
            }
        }
        if (alive < MAX_STARS) this.spawnStar()
    }

    draw() {
        const stars = this.stars
        for (let i = stars.length - 1; i >= 0; i--) {
            const star = stars[i]
            if (!star.dead) {
                const sx = rx(star.x),
                      sy = ry(star.y)
                fill(star.c)
                circle(sx, sy, star.r)
            }
        }
    }
}
