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

  const githubEvent = req.headers["x-github-event"];
  const data = req.body;
  handleWebhook(githubEvent, data)
    .then(() => res.status(202).send("Success!"))
    .catch(console.log);
});

app.post("/webhook/gitlab", (req, res) => {
  if (process.env.SECRET !== req.header("X-Gitlab-Token")) {
    console.log("fail");
    return res.status(400).send("Not valid request");
  }

  console.log("success");
  // const githubEvent = req.headers["x-github-event"];
  // const data = req.body;
  // handleWebhook(githubEvent, data)
  //   .then(() => res.status(202).send("Success!"))
  //   .catch(console.log);
});

app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
