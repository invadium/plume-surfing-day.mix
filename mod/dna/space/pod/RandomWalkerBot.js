const IDLE = 0
const WALKING = 1
const JUMPING = 2

class RandomWalkerBot {

    constructor(st) {
        extend(this, {
            type:  'AI',
            name:  'randomWalkerBot',
            alias: 'bot',

            state: IDLE,
            actionTime:   0,
            lastDecision: 0,
        }, st)
    }

    selectNextAction() {
        const nextAction = lib.source.bot.rndi(JUMPING + 1)
        log(`[${this.__.name}] next action: ${this.actionName(nextAction)}`)

        this.state = nextAction
        this.lastDecision = env.time
        switch(nextAction) {
            case IDLE:
                this.actionTime = 3 + lib.source.bot.rnd(7)
                break
            case WALKING:
                this.actionTIme = 5 + lib.source.bot.rnd(10)
                break
            case JUMPING:
                this.actionTime = 5
                this.__.momentum.surfaceJump(this.__.surfaceJumpAcceleration)
                break
        }
    }

    evo(dt) {
        if (!this.__.surfaced) return // bot works only while the creature is on the surface of a planet
        const timer = env.time - this.lastDecision

        switch(this.state) {
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

    actionName(action) {
        switch(action) {
            case IDLE:    return 'idle';
            case WALKING: return 'walking';
            case JUMPING: return 'jumping';
            default:      return 'unknown';
        }
    }

    getState() {
        return this.actionName(this.state)
    }

}
