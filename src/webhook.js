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
    switch (event) {
      case "Merge Request Hook":
        return gitlabHandler.handleMergeRequest(data);
      case "Issue Hook":
        return gitlabHandler.handleIssue(data);
    }
  }
}

module.exports = { handleWebhook };
