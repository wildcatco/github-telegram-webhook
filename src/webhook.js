const { handler } = require('./handler');

function handleWebhook(event, data) {
  switch (event) {
    case 'Merge Request Hook':
      return handler.handleMergeRequest(data);
    case 'Issue Hook':
      return handler.handleIssue(data);
  }
}

module.exports = { handleWebhook };
