require("dotenv").config();
const express = require("express");
const { handleWebhook } = require("./webhook");
const { verifySignature } = require("./verification");

const SECRET = process.env.SECRET;

const app = express();
app.use(express.json());

app.post("/webhook/github", (req, res) => {
  const isValidRequest = verifySignature(
    SECRET,
    req.header("X-Hub-Signature-256"),
    req.body
  );
  if (!isValidRequest) {
    return res.status(400).send("Not valid request");
  }

  const event = req.headers["x-github-event"];
  const data = req.body;
  handleWebhook(event, data, "github")
    .then(() => res.status(202).send("Success!"))
    .catch(console.log);
});

app.post("/webhook/gitlab", (req, res) => {
  if (process.env.SECRET !== req.header("X-Gitlab-Token")) {
    return res.status(400).send("Not valid request");
  }

  const event = req.headers["X-Gitlab-Event"];
  const data = req.body;
  handleWebhook(event, data, "gitlab")
    .then(() => res.status(202).send("Success!"))
    .catch(console.log);
});

app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
