import { createAnxietyReport } from "./logic.js";

const quickIdeas = [
  "老板催方案",
  "面试没回复",
  "这个月又超支了",
  "怕把关系聊崩",
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
  trendList.innerHTML = quickIdeas
    .map((item) => `<span class="chip" aria-hidden="true">${item}</span>`)
    .join("");
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

  document.querySelector("#copy-message").onclick = () =>
    copyText(report.message, "这条已复制");

  document.querySelector("#copy-report").onclick = () =>
    copyText(
      [
        `我现在最烦的是：${rawText}`,
        `先别慌：${report.judgement}`,
        `换个想法：${report.reframe}`,
        `今天先做：${report.nextStep}`,
        `可直接发：${report.message}`,
      ].join("\n"),
      "结果已复制",
    );

  document.querySelector("#share-report").onclick = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "焦虑外包AI",
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
    showCopied("先说说你在焦虑什么");
    return;
  }

  const report = createAnxietyReport(rawText);
  renderReport(report, rawText);
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
