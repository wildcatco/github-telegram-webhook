const express = require("express");
const { verifySignature } = require("./utils");
require("dotenv").config();

const app = express();
const secret = process.env.SECRET;

app.use(express.json());

app.post("/webhook", (req, res) => {
  const isValidRequest = verifySignature(
    secret,
    req.header("X-Hub-Signature-256"),
    req.body
  );
  if (!isValidRequest) {
    return res.status(400).send("Not valid request");
  }

  // const githubEvent = req.headers["x-github-event"];
  //
  // if (githubEvent === "issues") {
  //   const data = req.body;
  //   const action = data.action;
  //   if (action === "opened") {
  //     console.log(`An issue was opened with this title: ${data.issue.title}`);
  //   } else if (action === "closed") {
  //     console.log(`An issue was closed by ${data.issue.user.login}`);
  //   } else {
  //     console.log(`Unhandled action for the issue event: ${action}`);
  //   }
  // } else if (githubEvent === "ping") {
  //   console.log("GitHub sent the ping event");
  // } else {
  //   console.log(`Unhandled event: ${githubEvent}`);
  // }

  res.status(202).send("Accepted!");
});

app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
