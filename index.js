require('dotenv').config();
const axios = require('axios');
const { taps, interval } = require('./utils.js');
const { urls, getHeaders } = require('./config');
const { logInfo, tap, logError, exitProcess } = require('./requests');


const env = process.env;
const maxTap = env.MAX_CLICK;


axios.post(urls.me, {}, { headers: getHeaders() })
    .then((res) => {
        const { status, telegramUser } = res.data;
        status ? logInfo(telegramUser) : exitProcess;

        function handleTap() {
            status? tap(taps(env), 100000) : exitProcess;
            status ? setTimeout(handleTap, interval(env)) : exitProcess;
        }

        handleTap(); // Initial call
    })
    .catch(error => {
        logError(error)
    });
