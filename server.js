const express = require('express');
const { PORT } = require('./util/globals');
const pool = [];

const app = express();

app.listen(PORT, () => {
  console.log('Ready to recieve webhooks from the Discord API!');
});

app.get('/', (req, res) => {
  res.send(
    '<h3 style="text-align:center">Authentication complete. You can now close this tab.</h3>',
    200
  );
  if (pool.some((e) => e.state == req.query.state)) {
    pool.find((e) => e.state == req.query.state).callback(req.query.code);
  }
});

module.exports.awaitAuth = async (state) => {
  return new Promise((res, rej) => {
    const timeoutTimer = setTimeout(() => {
      rej('Timed out');
    }, 30 * 60 * 1000);
    pool.push({
      state,
      callback: (code) => {
        res(code);
        clearTimeout(timeoutTimer);
      }
    });
  });
};
