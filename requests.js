const chalk = require('chalk');
const axios = require('axios');
const { urls, getHeaders } = require('./config');

function buildTapData(taps, availableTaps){
    return { "count": taps, "availableTaps": availableTaps, "timestamp": Date.now() }
}

function tap(taps, availableTaps) {
    const data = buildTapData(taps, availableTaps);
    return axios.post(urls.tap, data, { headers: getHeaders(data) }).then((res) => {
        const { clickerUser } = res.data;
        clickerUser ? logTap(taps, clickerUser) : exitProcess();
        (clickerUser && clickerUser.availableTaps <= 0) ? exitProcess() : false;
    }).catch((error) => {
        logError(error);
    });
}

function logInfo(obj) {
    console.log('Username:', chalk.blue(obj.username));
}

function logTap(taps, obj) {
    console.log(
        'Taping ...', 
        chalk.blue('->'),
        chalk.magenta(taps),
        chalk.green('\u2714'),
        '| Coins:', chalk.yellow(obj.balanceCoins),
        '| Available Taps:', chalk.bgGreenBright(obj.availableTaps),
        '| Referrals:', chalk.cyan(obj.referralsCount),
    );
}


function logError(error) {
    console.log(error.response ? error.response.data : error.request ? error.request : 'Error', error.message);
    process.exit();
}

function exitProcess() {
    console.log(
        chalk.red('Error collecting coin or coin mining completed. Exiting...')
    );
    process.exit(); //end the process
}

module.exports = { logInfo, tap, logError, exitProcess }
