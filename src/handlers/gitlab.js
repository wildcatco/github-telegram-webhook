const { getNameFromGitlabId } = require("../data");
const { sendGroupMessage } = require("../bot");
const dedent = require("dedent");

function handleMergeRequest(action, data) {
  switch (action) {
    case "open" | "reopen": {
      console.log(data.user.username);
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
