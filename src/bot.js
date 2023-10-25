const TelegramBot = require("node-telegram-bot-api");
const { USER_INFO } = require("./data");

const chatId = process.env.GROUP_CHAT_ID;
const token = process.env.GROUP_TOKEN;

const bot = new TelegramBot(token);

const privateBots = {};
Object.keys(USER_INFO).forEach((id) => {
  privateBots[id] = new TelegramBot(USER_INFO[id].token);
});

function sendGroupMessage(message) {
  return bot.sendMessage(chatId, message, { disable_web_page_preview: true });
}

function sendPrivateMessage({ id, message }) {
  const privateBot = privateBots[id];
  const chatId = USER_INFO[id].chatId;
  return privateBot.sendMessage(chatId, message, {
    disable_web_page_preview: true,
  });
}

module.exports = { sendGroupMessage, sendPrivateMessage };
