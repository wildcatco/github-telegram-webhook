const USER_INFO = [
  {
    name: '덕호',
    gitlabId: 'duckho',
  },
  {
    name: '지후',
    gitlabId: '2023767',
    token: process.env.JIHOO_TOKEN,
    chatId: process.env.JIHOO_CHAT_ID,
  },
  {
    name: '동환',
    gitlabId: 'donghwan_park',
    token: process.env.DONGHWAN_TOKEN,
    chatId: process.env.DONGHWAN_CHAT_ID,
  },
  {
    name: '정환',
    gitlabId: 'kimjeonghwan',
    token: process.env.JEONGHWAN_TOKEN,
    chatId: process.env.JEONGHWAN_CHAT_ID,
  },
  {
    name: '정우',
    gitlabId: '2020329',
    token: process.env.JEONGWOO_TOKEN,
    chatId: process.env.JEONGWOO_CHAT_ID,
  },
  {
    name: '중선',
    gitlabId: '2023266',
    token: process.env.JUNGSEON_TOKEN,
    chatId: process.env.JUNGSEON_CHAT_ID,
  },
  {
    name: '준만',
    gitlabId: 'JunmanChoi',
    token: process.env.JUNMAN_TOKEN,
    chatId: process.env.JUNMAN_CHAT_ID,
  },
  {
    name: '현규',
    gitlabId: 'hyounkyu_oh',
    token: process.env.HYEONGYU_TOKEN,
    chatId: process.env.HYEONGYU_CHAT_ID,
  },
  {
    name: '병호',
    gitlabId: 'byongho_lee',
    token: process.env.BYONGHO_TOKEN,
    chatId: process.env.BYONGHO_CHAT_ID,
  },
];

function getNameFromGitlabId(id) {
  return USER_INFO.find((user) => user.gitlabId === id).name;
}

module.exports = { USER_INFO, getNameFromGitlabId };
