const { githubHandler } = require("./handlers/github");
const { gitlabHandler } = require("./handlers/gitlab");

function handleWebhook(event, data, from) {
  if (from === "github") {
    const action = data.action;
    switch (event) {
      case "issues":
        return githubHandler.handleIssue(action, data);
      case "pull_request":
        return githubHandler.handlePullRequest(action, data);
      case "pull_request_review_comment":
        return githubHandler.handleReviewComment(action, data);
      case "pull_request_review":
        return githubHandler.handleReview(action, data);
      default:
        throw new Error(`[${event}] event not valid`);
    }
  } else if (from === "gitlab") {
    const action = data.object_attributes.action;

    console.log("event", event);
    console.log("action", action);
    switch (event) {
      case "Push Hook":
        return gitlabHandler.handleMergeRequest(action, data);
    }
  }
}

module.exports = { handleWebhook };
