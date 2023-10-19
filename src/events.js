const { sendMessage } = require("./bot");
const { ID_NAME_MAP } = require("./data");
const dedent = require("dedent");

function handleIssue(action, data) {
  switch (action) {
    case "opened": {
      const sender = ID_NAME_MAP[data.sender.login];
      const number = data.issue.number;
      const title = data.issue.title;
      const url = data.issue.html_url;
      const assignees = data.issue.assignees
        ?.map((user) => user.login)
        .map((id) => ID_NAME_MAP[id]);

      return sendMessage(
        dedent`
        [🤦‍ISSUE OPENED] ${sender}
        #${number} ${title}
        assignees: ${assignees ? assignees.join(", ") : "없음"}
        ${url}
        `
      );
    }

    case "closed": {
      const sender = ID_NAME_MAP[data.sender.login];
      const number = data.issue.number;
      const title = data.issue.title;
      const url = data.issue.html_url;

      return sendMessage(
        dedent`
        [💪ISSUE CLOSED] ${sender}
        #${number} ${title}
        ${url}
        `
      );
    }
    default:
      throw new Error("action not valid");
  }
}

function handlePullRequest(action, data) {
  switch (action) {
    case "opened": {
      const sender = ID_NAME_MAP[data.sender.login];
      const prNumber = data.number;
      const prTitle = data.pull_request.title;
      const prUrl = data.pull_request.html_url;

      return sendMessage(
        dedent`
        [✍️PR] ${sender}
        #${prNumber} ${prTitle}
        ${prUrl}
        `
      );
    }

    case "closed": {
      const sender = ID_NAME_MAP[data.sender.login];
      const prNumber = data.number;
      const prTitle = data.pull_request.title;
      const prUrl = data.pull_request.html_url;
      const merged = data.pull_request.merged;

      if (merged) {
        return sendMessage(
          dedent`
        [🚀MERGED] ${sender}
        #${prNumber} ${prTitle}
        ${prUrl}
        `
        );
      } else {
        return;
      }
    }

    case "review_requested": {
      const prNumber = data.number;
      const prTitle = data.pull_request.title;
      const prUrl = data.pull_request.html_url;
      const sender = ID_NAME_MAP[data.sender.login];
      const reviewer = ID_NAME_MAP[data.requested_reviewer.login];

      return sendMessage(
        dedent`
        [🙏리뷰요청] ${sender} → ${reviewer}
        #${prNumber} ${prTitle}
        ${prUrl}
        `
      );
    }

    default:
      throw new Error(`[${action}] action not valid`);
  }
}

function handleReviewComment(action, data) {
  switch (action) {
    case "created": {
      const sender = ID_NAME_MAP[data.sender.login];
      const prNumber = data.pull_request.number;
      const prTitle = data.pull_request.title;
      const comment = data.comment.body;
      const commentUrl = data.comment.html_url;

      return sendMessage(
        dedent`
        [🙋리뷰코멘트] ${sender}
        #${prNumber} ${prTitle}
        ${comment}
        ${commentUrl}
        `
      );
    }

    default:
      throw new Error(`[${action}] action not valid`);
  }
}

function handleReview(action, data) {
  switch (action) {
    case "edited":
    case "submitted": {
      const sender = ID_NAME_MAP[data.sender.login];
      const prNumber = data.pull_request.number;
      const prTitle = data.pull_request.title;
      const url = data.review.html_url;
      const state = data.review.state === "approved" ? "승인" : "거절";
      const emoji = data.review.state === "approved" ? "🙆‍" : "🙅‍";

      return sendMessage(
        dedent`
        [${emoji}리뷰${state}] ${sender}
        #${prNumber} ${prTitle}
        ${url}
        `
      );
    }

    default:
      throw new Error(`[${action}] action not valid`);
  }
}

module.exports = {
  handleIssue,
  handlePullRequest,
  handleReviewComment,
  handleReview,
};
