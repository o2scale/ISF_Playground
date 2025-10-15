# Dev Agent (James) - Onboarding Guide

**Agent:** James (Full Stack Developer)
**Terminal:** Terminal 1
**Activation:** `claude --agent dev`
**Role:** Implement stories and write test scenarios

---

## ⚠️ CRITICAL: Read This First (30 seconds)

### Your Testing Workflow:
- ✅ **Write test SCENARIOS** (markdown files in `docs/qa/e2e/`)
- ✅ **Format:** TC 1.1, TC 1.2 (test cases with steps and expected results)
- ❌ **DON'T write `.spec.js` test code**
- ❌ **DON'T run `npx playwright test` commands**

### Why?
QA Agent will use **Playwright MCP tools** to execute your test scenarios:
- `browser_navigate("http://localhost:3000")`
- `browser_click(element="button", ref="e45")`
- `browser_snapshot()` → Get page structure
- `browser_console_messages()` → Check for errors
- `browser_take_screenshot()` → Capture evidence

**Full MCP Tools:** `.ai/playwright-mcp-tools-reference.md` (26 tools)

---

## 🚀 Quick Start (Your First Story)

### Step 1: Activate
```bash
claude --agent dev
# James will greet you and show *help
```

### Step 2: Your Workflow
```
1. Read story: docs/stories/sprint5-story-{n}.md
2. Implement feature (backend + frontend)
3. Write test scenarios: docs/qa/e2e/story-{n}-{feature}.md
4. Update Dev Agent Record section in story file
5. Set status: "✅ READY FOR QA"
6. HALT - Wait for QA Agent
```

---

## 📝 Test Scenario Template

**File:** `docs/qa/e2e/story-{n}-{feature}.md`

```markdown
# Story {n}: {Feature Name} - E2E Test Scenarios

## AC1: [Acceptance Criteria Description]

### TC 1.1: [Test Case Description]
**Priority:** P0
**Preconditions:**
- User logged in as student
- Backend running on http://localhost:5001
- Frontend running on http://localhost:3000

**Steps:**
1. Navigate to Shop page
2. Click "Add to Cart" button on first product
3. Verify cart icon shows "1"
4. Open cart drawer
5. Verify product appears in cart

**Expected Results:**
- Cart icon displays "1" badge
- Product name matches selected product
- Product price displayed correctly
- No console errors
- Mobile responsive (test at 375px width)

**Screenshots Required:**
- cart-icon-updated.png
- cart-drawer-open.png
- mobile-view-375px.png

---

### TC 1.2: [Next Test Case]
...
```

**Requirements:**
- ✅ Minimum 1 test case per AC (typically 2-4 per AC)
- ✅ Include: Preconditions, Steps, Expected Results, Screenshots
- ✅ Cover: Happy path, Error states, Responsive behavior

---

## 📋 Dev Agent Commands

```bash
*help              # Show all commands
*develop-story     # Start implementing story
*run-tests         # Run unit/integration tests
*explain           # Explain what you did
*exit              # Exit agent mode
```

---

## 🎯 Story File Updates (What You CAN Edit)

**✅ YOU CAN EDIT:**
- Tasks/Subtasks checkboxes → Mark [x] when complete
- Dev Agent Record section:
  - File List → Add all files you created/modified
  - Change Log → Document your changes
  - Completion Notes → Summary of implementation
- Status → Set to "✅ READY FOR QA" when done

**❌ DO NOT EDIT:**
- Story description
- Acceptance Criteria
- Dev Notes
- Testing section
- QA Results

---

## 📁 Project Structure (Key Files)

```
ISF_Playground/
├── docs/
│   ├── stories/
│   │   └── sprint5-story-{n}.md              # Your story requirements
│   └── qa/
│       └── e2e/
│           └── story-{n}-{feature}.md        # Test scenarios YOU write
│
├── backend/
│   ├── models/                               # Mongoose models
│   ├── controllers/                          # Route handlers
│   ├── services/                             # Business logic
│   └── routes/v2/                            # API routes (Sprint 5)
│
├── frontend/
│   └── src/
│       ├── components/shop/                  # React components
│       ├── pages/                            # Page components
│       └── store/                            # Zustand state (Sprint 5)
│
└── .bmad-core/
    └── agents/
        └── dev.md                            # Your instructions
```

---

## 🔧 Technology Stack

### Backend
- Node.js + Express.js
- MongoDB (Mongoose)
- JWT authentication
- API namespace: `/api/v2/shop/*` (Sprint 5)

### Frontend
- React 19
- Tailwind CSS
- Zustand (state management for Sprint 5)
- Axios for API calls
- React Router

---

## ⚠️ Critical Rules

### 1. Brownfield Approach
- ❌ **DO NOT modify Sprint 1 code**
- ✅ **Exception:** Only add `'shop'` to Coin model enum if needed

### 2. Test Scenarios (NOT Code)
- ✅ Write markdown scenarios in `docs/qa/e2e/`
- ❌ Don't write `.spec.js` files
- ❌ Don't run `npx playwright test`

### 3. One Story at a Time
- ✅ Complete current story fully
- ✅ HALT after "Ready for QA"
- ❌ Don't start next story until current is DONE

### 4. File Updates
- ✅ Update Dev Agent Record section only
- ❌ Don't modify Story, ACs, or QA Results

---

## ✅ Definition of Done (Before "Ready for QA")

```
- [ ] All Acceptance Criteria implemented
- [ ] Backend + Frontend code complete
- [ ] Test scenarios written: docs/qa/e2e/story-{n}-{feature}.md
- [ ] Minimum 1 test case per AC
- [ ] Test scenarios include:
      - Preconditions
      - Numbered steps
      - Expected results
      - Screenshot requirements
      - Error states
      - Responsive behavior
- [ ] Dev Agent Record updated:
      - File List complete (including test scenario file)
      - Change Log documented
- [ ] Status set to "✅ READY FOR QA"
- [ ] HALT (don't start next story)
```

---

## 🎓 Example Test Scenario

**Story 01: Product Catalog**
**File:** `docs/qa/e2e/story-01-product-catalog.md`

```markdown
## AC1: Display products in 4-column grid on desktop

### TC 1.1: Product Grid Loads with Correct Layout
**Priority:** P0
**Preconditions:**
- Backend running with seeded products
- User logged in as student
- Desktop viewport (1920x1080)

**Steps:**
1. Navigate to http://localhost:3000
2. Click "Shop" in navigation
3. Wait for products to load
4. Verify grid layout

**Expected Results:**
- Product grid displays 4 columns
- Each product card shows: image, name, price, "Add to Cart" button
- Products sorted by creation date (newest first)
- No console errors

**Screenshots Required:**
- shop-desktop-4-column.png

### TC 1.2: Product Grid Responsive on Mobile
**Priority:** P1
**Preconditions:** Same as TC 1.1

**Steps:**
1. Navigate to Shop page
2. Resize browser to 375x667 (mobile)
3. Verify grid layout

**Expected Results:**
- Product grid displays 1 column
- Cards stack vertically
- Touch-friendly spacing
- No horizontal scroll

**Screenshots Required:**
- shop-mobile-1-column.png
```

---

## 🚨 Common Mistakes to Avoid

| ❌ Wrong | ✅ Right |
|---------|---------|
| Write `.spec.js` test code | Write markdown test scenarios |
| Run `npx playwright test` | QA uses MCP tools to test |
| Modify Sprint 1 code | Create new Sprint 5 files only |
| Start next story immediately | HALT after "Ready for QA" |
| Edit Story/ACs in story file | Only edit Dev Agent Record |
| Skip test scenarios | Write 1+ test case per AC |

---

## 📖 Additional Resources

**If you need more detail:**
- MCP Tools Reference: `.ai/playwright-mcp-tools-reference.md` (26 tools)
- Workflow Details: `.ai/bmad-playwright-workflow.md`
- Quick Reference: `.ai/workflow-quick-reference.md`
- BMAD Core Config: `.bmad-core/core-config.yaml`

---

## 🎯 Summary: What You Do

1. **Implement story** (backend + frontend)
2. **Write test scenarios** (markdown in `docs/qa/e2e/`)
3. **Update Dev Agent Record** (File List, Change Log)
4. **Set status** to "✅ READY FOR QA"
5. **HALT** (wait for QA)

**That's it!** QA Agent will use Playwright MCP tools to execute your test scenarios programmatically.

---

**Ready to start?** Run `claude --agent dev` and say `*help`!

**Version:** 3.0 (Concise)
**Last Updated:** October 13, 2025
**For:** Dev Agent Quick Onboarding
