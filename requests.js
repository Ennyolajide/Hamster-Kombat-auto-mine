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

function getDailyReward(){
    const data = { taskId: 'streak_days' };
    return axios.post(urls.dailyReward, data, { headers: getHeaders(data) }).then((res) => {
        const { task } = res.data;
        logDailyBonusClaim(task);
    }).catch((error) => {
        console.log(error);
    })
}

function claimDailyCipher(cipher){
    const data = { "cipher": cipher };
    return axios.post(urls.dailyCipher, data, { headers: getHeaders(data) }).then((res) => {
        const { dailyCipher } = res.data;
        dailyCipher ? logDailyCipherClaim(dailyCipher) : false
    }).catch((error) => {
        console.log(error?.response?.data?.error_message);
        process.exit();
    })
}

function completeTask(data){
    const _data = { taskId: data.id };
    return axios.post(urls.checkTask, _data, { headers: getHeaders() }).then((res) => {
        const { task } = res.data;
        task ? logTaskCompletion(task) : false;
    }).catch((error) => {
        console.log(error);
    })
}

function getAndCompleteTasks(){
    axios.post(urls.taskList, {}, { headers: getHeaders() }).then((res) => {
        const { tasks } = res.data;
        tasks.filter(task => !task.isCompleted).forEach(_ => completeTask(_));
    }).catch((error) => {
        console.log(error);
    })
}

function logInfo(obj) {
   console.log("User's Name:", chalk.blue(obj.lastName.concat(obj.firstName)));
}

function logTap(taps, obj) {
    console.log(
        'Taping ...', 
        chalk.blue('->'),
        chalk.magenta(taps),
        chalk.green('\u2714'),
        '| Coins:', chalk.yellow(obj.balanceCoins.toFixed(0)),
        '| Available Taps:', chalk.bgGreenBright(obj.availableTaps),
        '| Referrals:', chalk.cyan(obj.referralsCount),
    );
}

function logDailyBonusClaim(task) {
    console.log(
        'Claiming Daily Bonus ...', 
        chalk.blue('->'),
        task?.isCompleted ? chalk.green('\u2714') : chalk.red('\u2716')
    );
}

function logTaskCompletion(task) {
    console.log(
        'Claiming Task  ...', 
        chalk.blue('->'),
        '| Task:', chalk.magenta(task?.id),
        '| reward:', chalk.yellow(task?.rewardCoins.toFixed(0)),
        task?.isCompleted ? chalk.green('\u2714') : chalk.red('\u2716')
    );
}

function logDailyCipherClaim(data) {
    console.log(
        'Claiming Daily Bonus ...', chalk.blue('->'),
        '| Bonus:', chalk.yellow(data?.bonusCoins.toFixed(0)),
        data?.bonusCoins ? chalk.green('\u2714') : chalk.red('\u2716')
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

module.exports = { logInfo, tap, getDailyReward, claimDailyCipher, getAndCompleteTasks, logError, exitProcess }
