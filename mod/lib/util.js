function angleInRange(angle, lower, upper) {
    if (lower > upper) {
        return angle >= lower || angle <= upper
    } else {
        return angle >= lower && angle <= upper
    }
}

function balancedAngle(theta) {
    return theta - TAU * Math.floor((theta + PI) / TAU)
}
