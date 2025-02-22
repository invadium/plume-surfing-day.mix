const IDLE = 0
const RUNNING = 1
const JUMPING = 2
const SURFING = 3

class SmartBot {

    constructor(st) {
        extend(this, {
            type:  'AI',
            name:  'smartBot',
            alias: 'bot',

            state: IDLE,
            actionTime:   0,
            lastDecision: 0,
        }, st)
    }

    setupNextAction(nextAction) {
        //log(`[${this.__.getTitle()}] next action: ${this.actionName(nextAction)}`)
        this.state = nextAction
        this.lastDecision = env.time
        switch(nextAction) {
            case IDLE:
                this.actionTime = 3 + lib.source.bot.rnd(7)
                break
            case RUNNING:
                this.actionTIme = 5 + lib.source.bot.rnd(10)
                break
            case JUMPING:
                this.actionTime = 5
                this.__.momentum.surfaceJump(this.__.surfaceJumpAcceleration)
                break
            case SURFING:
                this.actionTime = 60
                break
        }
    }

    selectNextAction() {
        const nextAction = lib.source.bot.rndi(SURFING + 1)
        this.setupNextAction(nextAction)
    }

    selectNextWanderingAction() {
        const nextAction = lib.source.bot.rndi(JUMPING + 1)
        this.setupNextAction(nextAction)
    }

    selectNextSurfingAction() {
        const nextAction = SURFING
        this.setupNextAction(nextAction)
    }

    evo(dt) {
        const __ = this.__
        if (!__.surfaced) return // bot works only while the creature is on the surface of a planet
        const timer = env.time - this.lastDecision

        switch(this.state) {
            case IDLE:
                if (timer > this.actionTime) this.selectNextAction()
                break
            case RUNNING:
                __.momentum.surfaceRun(dt)
                if (timer > this.actionTime) this.selectNextAction()
                break
            case JUMPING:
                if (timer > this.actionTime && __.surfaced) this.selectNextAction()
                break
            case SURFING:
                const surface         = __.momentum.surface,
                      sV              = __.momentum.speedV,
                      timeToStop      = sV[0] / env.tune.friction,
                      horizontalSpeed = sV[0],
                      radLength       = (2 * PI * surface.r) / TAU,
                      radialSpeed     = horizontalSpeed / radLength,
                      angleToStop = .5 * radialSpeed * timeToStop

                //this.status = angleToStop

                if (__.surfaced && surface.isWithinCrack(__.polar[0] + angleToStop)) {
                    // break, idle and recharge
                    //this.status += ' breaking!'
                } else {
                    __.momentum.surfaceRun(dt)
                }
                if (timer > this.actionTime) this.selectNextAction()
                break
        }
    }

    actionName(action) {
        switch(action) {
            case IDLE:    return 'idle';
            case RUNNING: return 'running';
            case JUMPING: return 'jumping';
            case SURFING: return 'surfing';
            default:      return 'unknown';
        }
    }

    getState() {
        return (this.actionName(this.state)
            + (this.status? '/' + this.status : ''))
    }
}
