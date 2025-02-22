// actions
const IDLE    = 0,
      RUNNING = 1,
      JUMPING = 2,
      SURFING = 3

// attitudes
const FREE      = 0,
      WANDERING = 1,
      MIGRATING = 2

class SmartBot {

    constructor(st) {
        extend(this, {
            type:  'AI',
            name:  'smartBot',
            alias: 'bot',

            action:       IDLE,
            attitude:     FREE,
            actionTime:   0,
            lastDecision: 0,
        }, st)
    }

    setupNextAction(nextAction, time) {
        //log(`[${this.__.getTitle()}] next action: ${this.actionName(nextAction)}`)
        this.action = nextAction
        this.lastDecision = env.time
        switch(nextAction) {
            case IDLE:
                this.actionTime = time || (3 + lib.source.bot.rnd(7))
                break
            case RUNNING:
                this.actionTime = time || (5 + lib.source.bot.rnd(10))
                break
            case JUMPING:
                this.actionTime = time || 5
                this.__.momentum.surfaceJump(this.__.surfaceJumpAcceleration)
                break
            case SURFING:
                this.actionTime = time || 60
                break
        }
    }

    selectIdle() {
        this.setupNextAction(IDLE)
    }

    selectNextFreeAction() {
        const nextAction = lib.source.bot.rndi(SURFING + 1)
        this.setupNextAction(nextAction)
    }

    selectNextWanderingAction() {
        const nextAction = lib.source.bot.rndi(JUMPING + 1)
        this.setupNextAction(nextAction)
    }

    selectNextMigratingAction() {
        const nextAction = SURFING
        this.setupNextAction(nextAction)
    }

    // select next action considering the attitude
    selectNextAction() {
        switch(this.attitude) {
            case FREE:
                this.selectNextFreeAction()
                break
            case WANDERING:
                this.selectNextWanderingAction()
                break
            case MIGRATING:
                this.selectNextMigratingAction()
                break
        }
    }

    setAttitude(attitude) {
        this.attitude = attitude
        this.selectNextAction()
    }

    evo(dt) {
        const __ = this.__
        if (!__.surfaced) return // bot works only while the creature is on the surface of a planet
        const timer = env.time - this.lastDecision

        switch(this.action) {
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

    onLaunch() {
        this.setAttitude(FREE)
        this.selectIdle()
    }

    onTouchdown() {
        this.setAttitude(FREE)
        this.selectIdle()
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

    attitudeName(attitude) {
        switch(attitude) {
            case FREE:      return 'free';
            case WANDERING: return 'wandering';
            case MIGRATING: return 'migrating';
        }
    }

    getAction() {
        return (this.actionName(this.action)
            + (this.status? '/' + this.status : ''))
    }

    getAttitude() {
        return this.attitudeName(this.attitude)
    }

    getState() {
        return this.getAttitude() + '/' + this.getAction()
    }
}
