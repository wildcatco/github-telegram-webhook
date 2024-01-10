const { getNameFromGitlabId } = require('./data');
const { sendGroupMessage } = require('./bot');
const dedent = require('dedent');

function handleIssue(data) {
  const action = data.object_attributes.action;
  switch (action) {
    case 'open': {
      const issueCreator = getNameFromGitlabId(data.user.username);
      const number = data.object_attributes.id;
      const title = data.object_attributes.title;
      const url = data.object_attributes.url;
      const assignees = data.assignees?.map((a) =>
        getNameFromGitlabId(a.username)
      );

      return sendGroupMessage(
        dedent`
        [🤦‍ISSUE OPENED] ${issueCreator}
        #${number} ${title}
        assignees: ${
          assignees && assignees.length > 0 ? assignees.join(', ') : '없음'
        }
        ${url}
        `
      );
    }
    case 'close': {
      const issueCreator = getNameFromGitlabId(data.user.username);
      const number = data.object_attributes.id;
      const title = data.object_attributes.title;
      const url = data.object_attributes.url;

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

  console.log(data);
  console.log(action);

  switch (action) {
    case 'open':
    case 'reopen': {
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

    case 'merge': {
      const mrCreatorName = getNameFromGitlabId(data.user.username);
      const mrNumber = data.object_attributes.iid;
      const mrTitle = data.object_attributes.title;
      const mrUrl = data.object_attributes.url;

      return sendGroupMessage(
        dedent`
        [🚀MERGED] ${mrCreatorName}
        #${mrNumber} ${mrTitle}
        ${mrUrl}
        `
      );
    }

    case 'approved': {
      const mrNumber = data.object_attributes.iid;
      const reviewer = getNameFromGitlabId(data.user.username);
      const mrTitle = data.object_attributes.title;
      const mrUrl = data.object_attributes.url;

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

function handleComment(data) {
  const commentWriterName = getNameFromGitlabId(data.user.username);
  const commentUrl = data.object_attributes.url;
  const content = data.object_attributes.note;
  const noteType = data.object_attributes.noteable_type;

  if (noteType === 'Issue') {
    const issueNumber = data.issue.iid;
    const issueTitle = data.issue.title;

    return sendGroupMessage(
      dedent`
      [💬COMMENT] ${commentWriterName}
      #${issueNumber} ${issueTitle}
      ${commentUrl}
      ${content}
      `
    );
  } else {
    const mrNumber = data.merge_request.iid;
    const mrTitle = data.merge_request.title;

    return sendGroupMessage(
      dedent`
      [💬COMMENT] ${commentWriterName}
      #${mrNumber} ${mrTitle}
      ${commentUrl}
      ${content}
      `
    );
  }
}

exports.handler = {
  handleIssue,
  handleMergeRequest,
  handleComment,
};
