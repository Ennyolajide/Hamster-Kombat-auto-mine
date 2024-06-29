require('dotenv').config();

const env = process.env;
const baseUrl = 'https://api.hamsterkombat.io';

const urls = {
    tap: `${baseUrl}/clicker/tap`,
    me: `${baseUrl}/auth/me-telegram`,
    dailyReward: `${baseUrl}/clicker/check-task`
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
        'Origin': 'https://hamsterkombat.io', 
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148', 
        'Referer': 'https://hamsterkombat.io/', 
        'Connection': 'keep-alive', 
        'Sec-Fetch-Dest': 'empty'
    };

}

module.exports = { urls, getHeaders }
