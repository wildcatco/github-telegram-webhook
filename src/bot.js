const TelegramBot = require("node-telegram-bot-api");

const chatId = process.env.CHAT_ID;
const token = process.env.TOKEN;

const bot = new TelegramBot(token);

function sendMessage(message) {
  return bot.sendMessage(chatId, message, { disable_web_page_preview: true });
}

module.exports = { sendMessage };
