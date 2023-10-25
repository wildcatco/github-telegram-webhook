const { sendGroupMessage, sendPrivateMessage } = require("./bot");
const { USER_INFO } = require("./data");
const dedent = require("dedent");

function handleIssue(action, data) {
  switch (action) {
    case "opened": {
      const sender = USER_INFO[data.sender.login].name;
      const number = data.issue.number;
      const title = data.issue.title;
      const url = data.issue.html_url;
      const assignees = data.issue.assignees
        ?.map((user) => user.login)
        .map((id) => USER_INFO[id].name);

      return sendGroupMessage(
        dedent`
        [🤦‍ISSUE OPENED] ${sender}
        #${number} ${title}
        assignees: ${assignees ? assignees.join(", ") : "없음"}
        ${url}
        `
      );
    }

    case "closed": {
      const sender = USER_INFO[data.sender.login].name;
      const number = data.issue.number;
      const title = data.issue.title;
      const url = data.issue.html_url;

      return sendGroupMessage(
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
      const sender = USER_INFO[data.sender.login].name;
      const prNumber = data.number;
      const prTitle = data.pull_request.title;
      const prUrl = data.pull_request.html_url;

      return sendGroupMessage(
        dedent`
        [✍️PR] ${sender}
        #${prNumber} ${prTitle}
        ${prUrl}
        `
      );
    }

    case "closed": {
      const sender = USER_INFO[data.sender.login].name;
      const prNumber = data.number;
      const prTitle = data.pull_request.title;
      const prUrl = data.pull_request.html_url;
      const merged = data.pull_request.merged;

      if (merged) {
        return sendGroupMessage(
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
      const senderId = data.sender.login;
      const senderName = USER_INFO[senderId].name;
      const reviewerId = data.requested_reviewer.login;
      const reviewerName = USER_INFO[reviewerId].name;
      const message = dedent`
        [🙏리뷰요청] ${senderName} → ${reviewerName}
        #${prNumber} ${prTitle}
        ${prUrl}
        `;

      return Promise.all([
        sendGroupMessage(message),
        sendPrivateMessage({ id: reviewerId, message }),
      ]);
    }

    default:
      throw new Error(`[${action}] action not valid`);
  }
}

function handleReviewComment(action, data) {
  switch (action) {
    case "created": {
      const senderId = data.sender.login;
      const senderName = USER_INFO[senderId].name;
      const prNumber = data.pull_request.number;
      const prTitle = data.pull_request.title;
      const comment = data.comment.body;
      const commentUrl = data.comment.html_url;
      const prCreatorId = data.pull_request.user.login;
      const prReviewerIds = data.pull_request.requested_reviewers.map(
        (user) => user.login
      );
      const message = dedent`
        [🙋리뷰코멘트] ${senderName}
        #${prNumber} ${prTitle}
        ${comment}
        ${commentUrl}
        `;

      const idsToSend = [prCreatorId, ...prReviewerIds].filter(
        (id) => id !== senderId
      );

      return Promise.all([
        sendGroupMessage(message),
        ...idsToSend.map((id) => sendPrivateMessage({ id, message })),
      ]);
    }

    default:
      throw new Error(`[${action}] action not valid`);
  }
}

function handleReview(action, data) {
  switch (action) {
    case "edited":
    case "submitted": {
      const sender = USER_INFO[data.sender.login].name;
      const prNumber = data.pull_request.number;
      const prTitle = data.pull_request.title;
      const url = data.review.html_url;
      const isApproved = data.review.state === "approved";
      const prCreatorId = data.pull_request.user.login;

      if (isApproved) {
        const message = dedent`
        [🙆‍리뷰승인] ${sender}
        #${prNumber} ${prTitle}
        ${url}
        `;
        return Promise.all([
          sendGroupMessage(message),
          sendPrivateMessage({ id: prCreatorId, message }),
        ]);
      } else {
        return;
      }
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
