const TelegramBot = require("node-telegram-bot-api");
const { USER_INFO } = require("./data");

const groupChatId = process.env.GROUP_CHAT_ID;
const groupToken = process.env.GROUP_TOKEN;

const groupBot = new TelegramBot(groupToken);

const privateBots = {};
USER_INFO.forEach((user) => {
  privateBots[user.name] = new TelegramBot(user.token);
});

function sendGroupMessage(message) {
  sendToMentionedUser(message);

  return groupBot.sendMessage(groupChatId, message, {
    disable_web_page_preview: true,
  });
}

function sendPrivateMessage({ name, message }) {
  const privateBot = privateBots[name];
  const chatId = USER_INFO.find((user) => user.name === name).chatId;
  return privateBot.sendMessage(chatId, message, {
    disable_web_page_preview: true,
  });
}

function sendToMentionedUser(message) {
  const pattern = /@\w+/g;
  const matches = message.match(pattern);
  if (matches?.length > 0) {
    const gitlabIds = USER_INFO.map((user) => user.gitlabId);
    matches.forEach((match) => {
      const gitlabId = match.replace("@", "");
      if (gitlabIds.includes(gitlabId)) {
        sendPrivateMessage({
          name: USER_INFO.find((user) => user.gitlabId === gitlabId).name,
          message,
        });
      }
    });
  }
}

module.exports = { sendGroupMessage, sendPrivateMessage };
