import test from "node:test";
import assert from "node:assert/strict";

import {
  analyzeAnxiety,
  createAnxietyReport,
  ANXIETY_CATEGORIES,
} from "../logic.js";

test("classifies work-heavy anxiety with a direct first-step mindset", () => {
  const analysis = analyzeAnxiety("老板催我汇报，项目截止时间也快到了");

  assert.equal(analysis.category, "work");
  assert.equal(analysis.label, ANXIETY_CATEGORIES.work.label);
});

test("falls back to uncertainty when no keyword bucket is matched", () => {
  const analysis = analyzeAnxiety("最近整个人都悬着，不知道为什么");

  assert.equal(analysis.category, "uncertainty");
});

test("returns a full report with actionable outputs", () => {
  const report = createAnxietyReport(
    "我怕面试又黄了，今天一直不敢投简历",
    () => 0,
  );

  assert.ok(report.judgement.length > 0);
  assert.ok(report.reframe.length > 0);
  assert.ok(report.nextStep.length > 0);
  assert.ok(report.message.length > 0);
  assert.ok(report.shareText.includes("面试"));
});
