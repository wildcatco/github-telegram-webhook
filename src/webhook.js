const {
  handleIssue,
  handlePullRequest,
  handleReviewComment,
  handleReview,
} = require("./events");

function handleWebhook(githubEvent, data) {
  const action = data.action;
  console.log(githubEvent);
  console.log(action);

  switch (githubEvent) {
    case "issues":
      return handleIssue(action, data);
    case "pull_request":
      return handlePullRequest(action, data);
    case "pull_request_review_comment":
      return handleReviewComment(action, data);
    case "pull_request_review":
      return handleReview(action, data);
    default:
      throw new Error(`[${githubEvent}] event not valid`);
  }
}

module.exports = { handleWebhook };
