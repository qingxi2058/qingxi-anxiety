# Anxiety Outsourcer Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the anxiety page into a more useful "焦虑拆解局" that gives judgment, first step, and message templates instead of vague comfort.

**Architecture:** Keep the app static and zero-dependency. Put all anxiety analysis and response generation into a standalone module that can run in Node tests and in the browser.

**Tech Stack:** HTML, CSS, vanilla JavaScript, Node built-in test runner

---

### Task 1: Add failing tests for the anxiety engine

**Files:**
- Create: `package.json`
- Create: `test/logic.test.js`

**Step 1: Write the failing test**

Add tests that expect:
- keyword classification for work anxiety
- fallback classification for generic anxiety
- a full report object with multiple actionable sections

**Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL because `logic.js` does not exist yet

### Task 2: Implement the anxiety engine

**Files:**
- Create: `logic.js`

**Step 1: Write minimal implementation**

Add:
- category definitions
- `analyzeAnxiety()`
- `createAnxietyReport()`

**Step 2: Run test to verify it passes**

Run: `npm test`
Expected: PASS

### Task 3: Rebuild the page around the report

**Files:**
- Create: `styles.css`
- Create: `app.js`
- Modify: `index.html`

**Step 1: Build the new layout**

Add:
- stronger hero copy
- quick-select chips
- input form
- report cards for judgment, next step, and copyable message
- dynamic "今天大家都在外包什么" block

**Step 2: Wire browser behavior**

Use `createAnxietyReport()` in the browser to render results and copy/share text.

### Task 4: Verify end to end

**Files:**
- None

**Step 1: Run automated verification**

Run: `npm test`
Expected: PASS

**Step 2: Run local preview**

Run: `python3 -m http.server 8002`

**Step 3: Manually verify**

Check:
- quick chips populate the textarea
- report renders after submit
- copy buttons work
- the page stays readable on narrow screens
