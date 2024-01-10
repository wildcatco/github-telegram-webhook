require('dotenv').config();
const express = require('express');
const { handleWebhook } = require('./webhook');

const app = express();
app.use(express.json());

app.post('/webhook/gitlab', (req, res) => {
  if (process.env.SECRET !== req.header('X-Gitlab-Token')) {
    return res.status(400).send('Not valid request');
  }

  const event = req.header('X-Gitlab-Event');
  const data = req.body;
  handleWebhook(event, data)
    .then(() => res.status(202).send('Success!'))
    .catch(console.log);
});

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});
