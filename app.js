import { createAnxietyReport } from "./logic.js";

const quickIdeas = [
  "老板临时让我今晚前交方案",
  "投了很多简历，但一直没有回复",
  "这个月开销太多，心里一直悬着",
  "我怕一句话没说好，把关系搞僵",
];

const quickChips = [...document.querySelectorAll("[data-chip]")];
const textarea = document.querySelector("#anxiety-input");
const resultPanel = document.querySelector("#result-panel");
const copiedHint = document.querySelector("#copied-hint");
const trendList = document.querySelector("#trend-list");

const resultFields = {
  category: document.querySelector("#result-category"),
  judgement: document.querySelector("#result-judgement"),
  reframe: document.querySelector("#result-reframe"),
  nextStep: document.querySelector("#result-next-step"),
  message: document.querySelector("#result-message"),
};

function renderTrends() {
  trendList.innerHTML = quickIdeas.map((item) => `<li>${item}</li>`).join("");
}

function showCopied(message) {
  copiedHint.textContent = message;
  copiedHint.hidden = false;
  clearTimeout(showCopied.timer);
  showCopied.timer = window.setTimeout(() => {
    copiedHint.hidden = true;
  }, 1800);
}

async function copyText(text, message = "已复制") {
  await navigator.clipboard.writeText(text);
  showCopied(message);
}

function renderReport(report, rawText) {
  resultFields.category.textContent = report.label;
  resultFields.judgement.textContent = report.judgement;
  resultFields.reframe.textContent = report.reframe;
  resultFields.nextStep.textContent = report.nextStep;
  resultFields.message.textContent = report.message;
  resultPanel.hidden = false;
  resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });

  document.querySelector("#copy-message").onclick = () =>
    copyText(report.message, "可直接发的话已复制");

  document.querySelector("#copy-report").onclick = () =>
    copyText(
      [
        `我现在的事：${rawText}`,
        `先别慌：${report.judgement}`,
        `换个想法：${report.reframe}`,
        `第一步：${report.nextStep}`,
        `可直接发：${report.message}`,
      ].join("\n"),
      "整份拆解结果已复制",
    );

  document.querySelector("#share-report").onclick = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "焦虑拆解局",
        text: report.shareText,
        url: window.location.href,
      });
      return;
    }
    await copyText(`${report.shareText} ${window.location.href}`, "分享文案已复制");
  };
}

document.querySelector("#analyze-button").addEventListener("click", () => {
  const rawText = textarea.value.trim();
  if (!rawText) {
    textarea.focus();
    showCopied("先把那件最烦的事写出来");
    return;
  }

  const report = createAnxietyReport(rawText);
  renderReport(report, rawText);
});

document.querySelector("#shuffle-trend").addEventListener("click", () => {
  const items = [...quickIdeas];
  quickIdeas.push(items.shift());
  quickIdeas.splice(0, items.length, ...items);
  renderTrends();
});

quickChips.forEach((button) => {
  button.addEventListener("click", () => {
    textarea.value = button.dataset.chip;
    textarea.focus();
  });
});

textarea.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
    event.preventDefault();
    document.querySelector("#analyze-button").click();
  }
});

renderTrends();
