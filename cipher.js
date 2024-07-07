require('dotenv').config();
const axios = require('axios');
const { urls, getHeaders } = require('./config');
const { logInfo, claimDailyCipher, logError, exitProcess } = require('./requests');

const env = process.env;
const maxTap = env.MAX_CLICK

//cipher 
const cipher = 'HALVE';

axios.post(urls.me, {}, { headers: getHeaders() })
    .then((res) => {
        const { status, telegramUser } = res.data;
        status ? logInfo(telegramUser) : exitProcess;

        status ? claimDailyCipher(cipher) : exitProcess;
    })
    .catch(error => {
        logError(error);
    });
