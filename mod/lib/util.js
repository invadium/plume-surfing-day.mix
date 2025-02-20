function angleInRange(angle, lower, upper) {
    if (lower > upper) {
        return angle >= lower || angle <= upper
    } else {
        return angle >= lower && angle <= upper
    }
}
