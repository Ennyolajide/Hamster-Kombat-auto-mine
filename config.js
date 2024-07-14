require('dotenv').config();

const env = process.env;
const baseUrl = 'https://api.hamsterkombatgame.io';

const urls = {
    tap: `${baseUrl}/clicker/tap`,
    me: `${baseUrl}/auth/me-telegram`,
    taskList: `${baseUrl}/clicker/list-tasks`,
    checkTask: `${baseUrl}/clicker/check-task`,
    dailyReward: `${baseUrl}/clicker/check-task`,
    dailyCipher: `${baseUrl}/clicker/claim-daily-cipher`
}

function setToken() {
    return `Bearer ${env.TOKEN}`;
}

function getHeaders(data = {}) {
    return {
        'Authorization': setToken(),
        'Sec-Fetch-Site': 'same-site', 
        'Accept-Language': 'en-GB,en;q=0.9', 
        'Accept-Encoding': 'gzip, deflate, br', 
        'Sec-Fetch-Mode': 'cors', 
        'Accept': '*/*', 
        'Origin': 'https://hamsterkombatgame.io', 
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148', 
        'Referer': 'https://hamsterkombatgame.io/', 
        'Connection': 'keep-alive', 
        'Sec-Fetch-Dest': 'empty'
    };

}

module.exports = { urls, getHeaders }
