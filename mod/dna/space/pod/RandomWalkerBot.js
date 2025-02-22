const IDLE = 0,
      WALKING = 1,
      JUMPING = 2

class RandomWalkerBot {

    constructor(st) {
        extend(this, {
            type:  'AI',
            name:  'randomWalkerBot',
            alias: 'bot',

            action: IDLE,
            actionTime:   0,
            lastDecision: 0,
        }, st)
    }

    setupNextAction(nextAction, time) {
        this.action = nextAction
        this.lastDecision = env.time
        switch(nextAction) {
            case IDLE:
                this.actionTime = time || (3 + lib.source.bot.rnd(7))
                break
            case WALKING:
                this.actionTIme = time || (5 + lib.source.bot.rnd(10))
                break
            case JUMPING:
                this.actionTime = time || 5
                this.__.momentum.surfaceJump(this.__.surfaceJumpAcceleration)
                break
        }
    }

    selectIdle() {
        this.setupNextAction(IDLE)
    }

    selectNextAction() {
        const nextAction = lib.source.bot.rndi(JUMPING + 1)
        //log(`[${this.__.getTitle()}] next action: ${this.actionName(nextAction)}`)
        this.setupNextAction(nextAction)
    }

    evo(dt) {
        if (!this.__.surfaced) return // bot works only while the creature is on the surface of a planet
        const timer = env.time - this.lastDecision

        switch(this.action) {
            case IDLE:
                if (timer > this.actionTime) this.selectNextAction()
                break
            case WALKING:
                this.__.momentum.surfaceRun(dt)
                if (timer > this.actionTime) this.selectNextAction()
                break
            case JUMPING:
                if (timer > this.actionTime && this.__.surfaced) this.selectNextAction()
                break
        }
    }

    onTouchdown() {
        this.selectIdle()
    }

    actionName(action) {
        switch(action) {
            case IDLE:    return 'idle';
            case WALKING: return 'walking';
            case JUMPING: return 'jumping';
            default:      return 'unknown';
        }
    }

    getAction() {
        return this.actionName(this.action)
    }

    getState() {
        return getAction()
    }

}
