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

function dot(iv1, iv2) {
    return (iv1[0] * iv2[0] + iv1[1] * iv2[1])
}
