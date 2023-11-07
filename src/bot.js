const TelegramBot = require("node-telegram-bot-api");
const { USER_INFO } = require("./data");

const chatId = process.env.GROUP_CHAT_ID;
const token = process.env.GROUP_TOKEN;

const bot = new TelegramBot(token);

const privateBots = {};
USER_INFO.forEach((user) => {
  privateBots[user.name] = new TelegramBot(user.token);
});

function sendGroupMessage(message) {
  return bot.sendMessage(chatId, message, { disable_web_page_preview: true });
}

function sendPrivateMessage({ name, message }) {
  const privateBot = privateBots[name];
  const chatId = USER_INFO.find((user) => user.name === name).chatId;
  return privateBot.sendMessage(chatId, message, {
    disable_web_page_preview: true,
  });
}

module.exports = { sendGroupMessage, sendPrivateMessage };
