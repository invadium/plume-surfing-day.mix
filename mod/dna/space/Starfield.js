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

        const { baseR, varR } = env.tune.starfield
        const z = sqrt(this.source.rndf())

        extend(star, {
            x:    1,
            y:    this.source.rndf(),
            z:    z,
            //r:    1 + 6 * this.source.rndf(), // TODO factor in z-value to make stars in the distance smaller
            r:    baseR + varR * (1 - z),
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
        for (let i = 0; i < env.tune.starfield.maxStars; i++) {
            this.spawnStar({
                x:   this.source.rndf(),
            })
        }
    }

    evo(dt) {
        const { baseDrift, varDrift } = env.tune.starfield

        let alive = 0
        const stars = this.stars
        for (let i = stars.length - 1; i >= 0; i--) {
            const star = stars[i]
            if (!star.dead) {
                star.x -= (baseDrift + varDrift * (1 - star.z)) * dt
                if (star.x < 0) this.killStar(star)
                else alive ++
            }
        }
        if (alive < env.tune.starfield.maxStars) this.spawnStar()
    }

    draw() {
        const port = lab.port,
                 W = port.maxVisibleWidth(),
                 H = port.maxVisibleHeight(),
                 s = port.scale

        const stars = this.stars
        for (let i = stars.length - 1; i >= 0; i--) {
            const star = stars[i]
            if (!star.dead) {
                const wx  = 2 * (star.x * W - .5 * W),
                      wy  = 2 * (star.y * H - .5 * H),
                      wpx = (wx - port.x),
                      wpy = (wy - port.y),
                      psx = (wx / W) * ctx.width,
                      psy = (wy / H) * ctx.height,
                      plx = wpx * s,
                      ply = wpy * s,
                      px  = psx + (plx - psx) * (1 - star.z),
                      py  = psy + (ply - psy) * (1 - star.z), 
                      sx  = px + .5 * ctx.width,
                      sy  = py + .5 * ctx.height

                if (sx >= -star.r
                        && sx <= ctx.width + star.r
                        && sy >= -star.r
                        && sy <= ctx.height + star.r) {
                    fill(star.c)
                    circle(sx, sy, star.r)
                }
            }
        }
    }
}
