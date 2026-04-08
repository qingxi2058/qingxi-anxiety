export const ANXIETY_CATEGORIES = {
  work: {
    label: "工作压顶型",
    trigger: ["老板", "汇报", "开会", "ddl", "截止", "客户", "项目", "日报", "需求"],
    judgement: [
      "这件事现在最吓人的部分，不是它本身，是你脑子里把它滚到了今天的全部。",
      "先别把整件事一起扛。它最可怕的不是难，是你现在把十步并成了一步。",
    ],
    nextStep: [
      "先只做一件事：写出今天必须推进的第一步，不要试图一口气把整件事收掉。",
      "先定一个最小交付：一页提纲、一个回复、一个时间点。别先定完美版本。",
    ],
    message: [
      ({ text }) => `我先把“${text}”拆成最小动作，今天先推进第一步，晚些给你明确反馈。`,
      ({ text }) => `关于“${text}”，我先不硬扛整件事，先把关键节点梳出来，稍后给你可执行回复。`,
    ],
    reframe: "你不是扛不住工作，你只是不能再用“整件事一起压下来”的方式想它。",
  },
  job: {
    label: "求职悬着型",
    trigger: ["面试", "简历", "找工作", "离职", "offer", "海投", "跳槽", "求职"],
    judgement: [
      "求职最折磨人的不是结果慢，而是你会把每一次沉默都当成否定。",
      "这类焦虑最容易把人卡住，因为你会在还没行动前，先替别人把拒绝想完。",
    ],
    nextStep: [
      "今天别想结果，先只完成一个动作：改一版简历、投三个岗位、或者补一条作品证明。",
      "先让行动重新流动起来。今天最值钱的不是想清楚，而是重新投出去。",
    ],
    message: [
      ({ text }) => `我先不脑补“${text}”的坏结果，今天先补一轮更能打的投递动作。`,
      ({ text }) => `关于“${text}”，我今天先只做可控的事：更新材料、继续投、继续跟。`,
    ],
    reframe: "求职阶段最怕的不是被拒，而是你因为预设失败，提前停手。",
  },
  money: {
    label: "钱不够用型",
    trigger: ["钱", "房租", "工资", "还款", "账单", "存款", "收入"],
    judgement: [
      "钱相关的焦虑很真实，所以更不能让它只停留在心里翻滚。",
      "你现在最需要的不是再吓自己一次，而是把未知金额变成具体数字。",
    ],
    nextStep: [
      "把最糟的数字写出来，再写能补哪一块。焦虑最怕被落到纸面上。",
      "今天先做一张最小账单表，只看最近 7 天，不看整个人生。",
    ],
    message: [
      ({ text }) => `“${text}”这件事我先不靠想象吓自己，先把最近 7 天的数字算清楚。`,
      ({ text }) => `关于“${text}”，我先把最糟金额落下来，再决定下一步，不继续空转。`,
    ],
    reframe: "当钱的压力没有数字时，它会像雾；一旦写出来，它才会变成能处理的东西。",
  },
  relationship: {
    label: "关系拉扯型",
    trigger: ["同事", "朋友", "对象", "家人", "关系", "冷淡", "沟通", "误会"],
    judgement: [
      "很多关系焦虑，不是事情已经坏了，而是你在脑补别人心里那一半。",
      "你现在累，不一定是关系本身出问题，而是你在替两个人一起想、一起怕。",
    ],
    nextStep: [
      "先停掉脑补，把你真正想确认的一句话写出来，再决定要不要发。",
      "今天不要处理全部情绪，只确认一个事实：你到底想知道什么。",
    ],
    message: [
      ({ text }) => `关于“${text}”，我先不脑补对方怎么想，先确认我真正想问的一句是什么。`,
      ({ text }) => `“${text}”让我有点悬着，我先把自己真正想确认的点写清楚，再决定要不要说。`,
    ],
    reframe: "关系里最耗人的，常常不是对方，而是你不停补完那些还没发生的剧情。",
  },
  uncertainty: {
    label: "悬着说不清型",
    trigger: [],
    judgement: [
      "这种焦虑最难受，因为它看起来没有形状，但会悄悄吃掉你一整天。",
      "说不清的焦虑，不代表它不存在，只是它还没被你拆成能处理的句子。",
    ],
    nextStep: [
      "先写一句最直白的话：我现在到底怕什么。哪怕不完整，也先落地。",
      "别急着解决，先给它命名。能说出来，才轮得到处理。",
    ],
    message: [
      ({ text }) => `我先不让“${text || "这阵子一直悬着"}”继续在脑子里打转，先把最怕的点写出来。`,
      ({ text }) => `这件事我先不硬压下去，先把“${text || "它到底让我怕什么"}”写清楚。`,
    ],
    reframe: "有些焦虑不是要马上消失，而是要先被你看见、命名、拆开。",
  },
};

function matchCategory(text) {
  const content = String(text || "").trim();
  if (!content) return "uncertainty";

  for (const [key, config] of Object.entries(ANXIETY_CATEGORIES)) {
    if (config.trigger.some((keyword) => content.includes(keyword))) {
      return key;
    }
  }

  return "uncertainty";
}

function pick(items, random) {
  const index = Math.min(items.length - 1, Math.floor(random() * items.length));
  return items[index];
}

export function analyzeAnxiety(text) {
  const category = matchCategory(text);
  return {
    category,
    label: ANXIETY_CATEGORIES[category].label,
  };
}

export function createAnxietyReport(text, random = Math.random) {
  const sourceText = String(text || "").trim();
  const category = matchCategory(sourceText);
  const config = ANXIETY_CATEGORIES[category];
  const safeText = sourceText || "这阵子悬着的那件事";

  return {
    category,
    label: config.label,
    judgement: pick(config.judgement, random),
    reframe: config.reframe,
    nextStep: pick(config.nextStep, random),
    message: pick(config.message, random)({ text: safeText }),
    shareText: `我把“${safeText}”丢进焦虑拆解局，AI给我的第一句是：${pick(
      config.judgement,
      random,
    )}`,
  };
}
