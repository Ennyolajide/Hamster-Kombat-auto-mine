function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getFloatRandom(min, max) {
    return (Math.random() * (max - min + 1)) + min;
}

function taps(env){
    const boost = parseInt(env.BOOST);
    const min = parseInt(env.MIN_CLICK);
    const max = parseInt(env.MAX_CLICK);
    const boostMultiplier = parseInt(env.BOOST_MULTIPLIER);
    
    return getRandom(min, max) * ((boost == true) ? boostMultiplier : 1);
}

function interval(env){
    const boost = parseInt(env.BOOST);
    const min = parseInt(env.MIN_INTERVAL);
    const max = parseInt(env.MAX_INTERVAL);
    return (boost == true ? getRandom((min-1), (max-2)) : getRandom(min, max)) * 1000;
}

module.exports = { taps, interval, getRandom }