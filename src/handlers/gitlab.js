const { getNameFromGitlabId } = require("../data");
const { sendGroupMessage } = require("../bot");
const dedent = require("dedent");

function handleMergeRequest(data) {
  const action = data.object_attributes.action;
  console.log(data);
  switch (action) {
    case "open":
    case "reopen": {
      const mrCreatorName = getNameFromGitlabId(data.user.username);
      const mrNumber = data.object_attributes.iid;
      const mrTitle = data.object_attributes.title;
      const mrUrl = data.object_attributes.url;

      return sendGroupMessage(
        dedent`
        [✍️PR] ${mrCreatorName}
        #${mrNumber} ${mrTitle}
        ${mrUrl}
        `
      );
    }
    case "update": {
      // reviewer
    }
    case "merge": {
    }
    case "approval": {
    }
    case "unapproval": {
    }
  }
}

exports.gitlabHandler = {
  handleMergeRequest,
};
