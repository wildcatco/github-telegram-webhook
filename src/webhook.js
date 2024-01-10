const { handler } = require('./handler');

function handleWebhook(event, data) {
  switch (event) {
    case 'Merge Request Hook':
      return handler.handleMergeRequest(data);
    case 'Issue Hook':
      return handler.handleIssue(data);
    case 'Note Hook':
      return handler.handleComment(data);
  }
}

module.exports = { handleWebhook };
