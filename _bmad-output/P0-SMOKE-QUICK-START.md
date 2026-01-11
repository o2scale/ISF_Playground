# P0 Smoke Test - Quick Start Guide

## ⚡ 5-Minute Setup

### 1. Start Servers
```bash
# Terminal 1: Backend
cd /path/to/backend
npm start

# Terminal 2: Frontend  
cd /path/to/frontend
npm start
```

### 2. Verify Environment
- [ ] Frontend: http://localhost:3000 loads
- [ ] Backend: http://localhost:5001/api/health responds
- [ ] Can login as PM: `purchase@gmail.com` / `password123`

### 3. Create Test Data (if needed)
- [ ] 1+ PENDING request
- [ ] 1+ ORDERED request with category "Repairs"
- [ ] 2+ PENDING requests for same product (for bunched view)

### 4. Open Execution Tracker
Open: `_bmad-output/P0-SMOKE-TEST-EXECUTION.md`

---

## 🎯 Execution Order (45-50 min)

| # | Test | Time | Quick Check |
|---|------|------|-------------|
| 1 | TC-2.6.1 | 4m | Repairs prompt appears ✓ |
| 2 | TC-2.6.3 | 5m | Technician name saved ✓ |
| 3 | TC-2.6.8 | 5m | API rejects invalid ✓ |
| 4 | TC-3.5.6 | 7m | Order All works ✓ |
| 5 | TC-3.9.3 | 4m | Badge updates ✓ |
| 6 | TC-INT-2 | 10m | PM→Coach delivery ✓ |
| 7 | TC-REG-1 | 6m | Filters still work ✓ |
| 8 | TC-REG-2 | 5m | Roles unaffected ✓ |

---

## 🚨 Stop Conditions

**STOP immediately if:**
- ❌ TC-2.6.8 fails (backend validation missing - security risk)
- ❌ TC-3.5.6 fails (Order All broken - core workflow)
- ❌ TC-REG-1 fails (filters broken - regression)
- ❌ TC-REG-2 fails (role access broken - security)

**These are SHIP BLOCKERS - fix before continuing**

---

## ✅ Success Criteria

**PASS (Ship Ready):**
- 8/8 tests pass
- All P0 critical functionality working
- No regressions detected

**CONDITIONAL (Fix & Re-test):**
- 6-7/8 tests pass
- Only low-risk failures (TC-2.6.1)
- Fix and re-run failed tests only

**FAIL (Do Not Ship):**
- 5 or fewer tests pass
- Any high-risk test fails (TC-2.6.8, TC-3.5.6, TC-REG-*)
- Fix all issues, run full P0 suite again

---

## 📞 Need Help?

**Environment issues?**
- Check servers running: `curl http://localhost:5001/api/health`
- Clear browser cache: Ctrl+Shift+R
- Check console for errors: F12 → Console tab

**Test data issues?**
- Create requests via UI: + New Purchase Request
- Or seed via API/database script

**Defects found?**
- Use template in main execution doc
- Mark severity as "Critical" for P0 tests
- Screenshot error state

---

**Ready to Start?**  
✅ Open: `_bmad-output/P0-SMOKE-TEST-EXECUTION.md`  
✅ Follow test-by-test execution  
✅ Record results as you go  
✅ Make ship/no-ship decision at end
