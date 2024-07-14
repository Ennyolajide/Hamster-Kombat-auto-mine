const cron = require('node-cron');
const { exec } = require('child_process');

setInterval(() => {
  console.log('Automatically tapping every 20mins...');
  exec('node index.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }

    console.log(`stdout: ${stdout}`);
  });
}, 1200000);


cron.schedule('0 0 * * *', () => {
  console.log('Daily cipher claimed....');
  exec('node cipher.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }

    console.log(`stdout: ${stdout}`);
  });
  
});
