const SlideCamera = require('dna/SlideCamera')

class SpaceCamera extends SlideCamera {

    constructor(st) {
        super( extend({
            zoomTarget: 1,
            maxZoom:    4,
            minZoom:    0.2,  // TODO bind to the belt size?
        }, st) )
    }

    zoomIn(d, x, y) {
        /*
        if (!this.customZoom) {
            this.zoomTarget = this.zoom
            this.customZoom = true
        }
        if (!this.target) {
            this.lookAt = {
                x: this.lx(x),
                y: this.ly(y),
            }
        }
        */
        this.zoomTarget *= 1 + env.tune.port.zoomFactor/10
        if (this.zoomTarget >= this.maxZoom) this.zoomTarget = this.maxZoom
    }

    zoomOut(d, x, y) {
        /*
        if (!this.customZoom) {
            this.zoomTarget = this.zoom
            this.customZoom = true
        }
        if (!this.target) {
            this.lookAt = {
                x: this.lx(x),
                y: this.ly(y),
            }
        }
        */
        this.zoomTarget *= 1 - env.tune.port.zoomFactor/10
        if (this.zoomTarget < this.minZoom) this.zoomTarget = this.minZoom
    }

    maxVisibleWidth() {
        return ctx.width / this.minZoom
    }

    maxVisibleHeight() {
        return ctx.height / this.minZoom
    }

    visibleWidth() {
        return ctx.width / this.scale
    }

    visibleHeight() {
        return ctx.height / this.scale
    }

    evo(dt) {
        super.evo(dt)

        if (this.zoomTarget && this.zoomTarget !== this.scale) {
            if (this.scale < this.zoomTarget) {
                this.scale += this.zoomSpeed * dt
                if (this.scale > this.zoomTarget) this.scale = this.zoomTarget
            } else if (this.scale > this.zoomTarget) {
                this.scale -= this.zoomSpeed * dt
                if (this.scale < this.zoomTarget) this.scale = this.zoomTarget
            }
        }
    }

}
