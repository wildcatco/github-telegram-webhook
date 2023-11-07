const USER_INFO = [
  {
    name: "지후",
    githubId: "wildcatco",
    gitlabId: "2023767",
    token: process.env.JIHOO_TOKEN,
    chatId: process.env.JIHOO_CHAT_ID,
  },
  {
    name: "동환",
    githubId: "parkdh9018",
    gitlabId: "donghwan_park",
    token: process.env.DONGHWAN_TOKEN,
    chatId: process.env.DONGHWAN_CHAT_ID,
  },
  {
    name: "정환",
    githubId: "kjh9589",
    gitlabId: "kimjeonghwan",
    token: process.env.JEONGHWAN_TOKEN,
    chatId: process.env.JEONGHWAN_CHAT_ID,
  },
  {
    name: "정우",
    githubId: "jeongwoolee3",
    gitlabId: "2020329",
    token: process.env.JEONGWOO_TOKEN,
    chatId: process.env.JEONGWOO_CHAT_ID,
  },
  {
    name: "중선",
    githubId: "Joong-Sunny",
    gitlabId: "2023266",
    token: process.env.JUNGSEON_TOKEN,
    chatId: process.env.JUNGSEON_CHAT_ID,
  },
  {
    name: "준만",
    githubId: "junman95",
    gitlabId: "JunmanChoi",
    token: process.env.JUNMAN_TOKEN,
    chatId: process.env.JUNMAN_CHAT_ID,
  },
  {
    name: "현규",
    githubId: "okorion",
    gitlabId: "hyounkyu_oh",
    token: process.env.HYEONGYU_TOKEN,
    chatId: process.env.HYEONGYU_CHAT_ID,
  },
];

function getNameFromGithubId(id) {
  return USER_INFO.find((user) => user.githubId === id).name;
}

function getNameFromGitlabId(id) {
  return USER_INFO.find((user) => user.gitlabId === id).name;
}

module.exports = { USER_INFO, getNameFromGithubId, getNameFromGitlabId };
