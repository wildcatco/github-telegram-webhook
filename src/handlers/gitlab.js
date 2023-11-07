const { getNameFromGitlabId } = require("../data");
const { sendGroupMessage } = require("../bot");
const dedent = require("dedent");

function handleIssue(data) {
  const action = data.object_attributes.action;
  switch (action) {
    case "open": {
      const issueCreator = getNameFromGitlabId(data.user.username);
      const number = data.object_attributes.id;
      const title = data.object_attributes.title;
      const url = addPortToUrl(data.object_attributes.url);
      const assignees = data.assignees?.map((a) =>
        getNameFromGitlabId(a.username)
      );

      return sendGroupMessage(
        dedent`
        [🤦‍ISSUE OPENED] ${issueCreator}
        #${number} ${title}
        assignees: ${
          assignees && assignees.length > 0 ? assignees.join(", ") : "없음"
        }
        ${url}
        `
      );
    }
    case "close": {
      const issueCreator = getNameFromGitlabId(data.user.username);
      const number = data.object_attributes.id;
      const title = data.object_attributes.title;
      const url = addPortToUrl(data.object_attributes.url);

      return sendGroupMessage(
        dedent`
        [💪ISSUE CLOSED] ${issueCreator}
        #${number} ${title}
        ${url}
        `
      );
    }
  }
}

function handleMergeRequest(data) {
  const action = data.object_attributes.action;
  switch (action) {
    case "open":
    case "reopen": {
      const mrCreatorName = getNameFromGitlabId(data.user.username);
      const mrNumber = data.object_attributes.iid;
      const mrTitle = data.object_attributes.title;
      const mrUrl = addPortToUrl(data.object_attributes.url);

      return sendGroupMessage(
        dedent`
        [✍️PR] ${mrCreatorName}
        #${mrNumber} ${mrTitle}
        ${mrUrl}
        `
      );
    }

    case "merge": {
      const mrCreatorName = getNameFromGitlabId(data.user.username);
      const mrNumber = data.object_attributes.iid;
      const mrTitle = data.object_attributes.title;
      const mrUrl = addPortToUrl(data.object_attributes.url);

      return sendGroupMessage(
        dedent`
        [🚀MERGED] ${mrCreatorName}
        #${mrNumber} ${mrTitle}
        ${mrUrl}
        `
      );
    }

    case "approval": {
      const mrNumber = data.object_attributes.iid;
      const reviewer = getNameFromGitlabId(data.user.username);
      const mrTitle = data.object_attributes.title;
      const mrUrl = addPortToUrl(data.object_attributes.url);

      return sendGroupMessage(
        dedent`
        [🙆‍리뷰승인] ${reviewer}
        #${mrNumber} ${mrTitle}
        ${mrUrl}
        `
      );
    }
  }
}

exports.gitlabHandler = {
  handleIssue,
  handleMergeRequest,
};

function addPortToUrl(url) {
  return url.replace("/mv1/", ":32080/mv1/");
}
