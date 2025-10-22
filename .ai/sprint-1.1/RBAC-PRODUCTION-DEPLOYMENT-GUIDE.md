# RBAC Production Deployment Guide

**Created:** 2025-10-22 14:24:42
**Status:** Ready for Production
**Branch:** `feature/sprint-1.1-rbac-refactor`
**Database:** Tested on local copy of production data

---

## ✅ FIXES IMPLEMENTED (Tested on Local Database)

### Fix #1: Middleware Field Name Bug
**File:** `backend/middleware/checkPermission.js`
**Change:** Lines 34 & 39
```javascript
// BEFORE (BROKEN):
case 'own':
  return { userId: user._id };  // ❌ User model has no "userId" field

// AFTER (FIXED):
case 'own':
  return { _id: user._id };  // ✅ Correct field name
```

**Impact:** Fixes 500 errors when scope='own' is applied

---

### Fix #2: Incorrect Scope Values in Database
**Issue:** All roles had `scope='own'` (including Admin)
**Fix:** Run migration script to set correct values

**Correct Scope Mapping:**
- Admin, Purchase-manager, Amma → `scope='all'`
- Coach, Sports-coach, Music-coach, Medical-incharge, Balagruha-incharge → `scope='balagruh'`
- Student → `scope='own'`

**Migration Script:** `backend/migrations/fix-scope-values.js`

---

## 📊 VERIFICATION RESULTS (Local Database)

**Scope Values After Migration:**
```
✅ ADMIN: All permissions → scope='all'
✅ COACH: All permissions → scope='balagruh'
✅ STUDENT: All permissions → scope='own'
```

**Backend Tests:**
- ✅ Server starts without errors
- ✅ MongoDB connection successful
- ✅ No 500 errors on API calls
- ✅ RBAC page loads successfully

**Frontend Tests:**
- ✅ RBAC management UI functional
- ✅ Role permissions display correctly
- ✅ No console errors

---

## 🚀 PRODUCTION DEPLOYMENT STEPS

### Prerequisites
- [ ] Backup current production database
- [ ] Maintenance window scheduled (15-30 minutes recommended)
- [ ] Rollback plan reviewed

### Phase 1: Code Deployment (5 minutes)

**Step 1: Merge to Main Branch**
```bash
# From feature/sprint-1.1-rbac-refactor branch
git checkout main
git merge feature/sprint-1.1-rbac-refactor
git push origin main
```

**Step 2: Deploy Backend Code**
```bash
# On production server
cd /path/to/backend
git pull origin main
npm install  # If new dependencies were added
pm2 restart backend  # Or your process manager
```

**Changed Files:**
- `backend/middleware/checkPermission.js` (middleware fix)
- `backend/migrations/fix-scope-values.js` (NEW - migration script)
- `backend/migrations/verify-scope-values.js` (NEW - verification script)

---

### Phase 2: Database Migration (10 minutes)

**Step 1: Backup Production Database**
```bash
mongodump --uri="YOUR_PRODUCTION_MONGO_URI" --out=./backup-pre-rbac-fix-$(date +%Y%m%d-%H%M%S)
```

**Step 2: Run Scope Value Migration**
```bash
cd /path/to/backend
node migrations/fix-scope-values.js
```

**Expected Output:**
```
✅ Connected to MongoDB
📋 Found 9 roles to fix
✅ Fixed role: admin → scope='all'
✅ Fixed role: coach → scope='balagruh'
...
🎉 Scope correction complete!
   Fixed: 8 roles
```

**Step 3: Verify Scope Values**
```bash
node migrations/verify-scope-values.js
```

**Expected Output:** All roles should show correct scope values

---

### Phase 3: Verification (5 minutes)

**Step 1: Test Backend API**
```bash
# Check health endpoint
curl http://your-backend-url/api/health

# Test with admin user (should work without errors)
curl -H "Authorization: Bearer ADMIN_TOKEN" http://your-backend-url/api/users
```

**Step 2: Test Frontend**
1. Log in as Admin user
2. Navigate to RBAC management page
3. Click on Admin role
4. Verify permissions display correctly (no errors)
5. Check browser console for errors

**Step 3: Test Different Roles**
1. Log in as Coach
2. Verify Coach can only see assigned Balagruh data
3. Log in as Student
4. Verify Student can only see own data

---

## 🔄 ROLLBACK PLAN

**If Issues Occur:**

### Option A: Rollback Code Only
```bash
# On production server
git revert <commit-hash>
pm2 restart backend
```

### Option B: Rollback Database (if migration fails)
```bash
# Restore from backup
mongorestore --uri="YOUR_PRODUCTION_MONGO_URI" --drop /path/to/backup-pre-rbac-fix-YYYYMMDD-HHMMSS
```

**Note:** Scope field values are non-destructive. Rolling back won't break existing functionality.

---

## ⚠️ KNOWN ISSUES & LIMITATIONS

### Current State
- ✅ Middleware fixed
- ✅ Scope values corrected
- ⚠️ **Only 1/30 controllers updated** (userController.js)
- ⚠️ **Frontend components not using permission guards**

### Next Steps (Not Blocking Production)
1. Update remaining controllers to use `req.scopeFilter`
2. Add `PermissionGuard` to frontend components
3. Update `AuthContext` with full permissions

**These can be done incrementally without breaking existing functionality.**

---

## 🧪 POST-DEPLOYMENT MONITORING

### Check Logs For:
```bash
# Backend logs - look for errors
tail -f /path/to/backend/logs/*.log | grep ERROR

# Look for 500 errors
grep "500" /path/to/backend/logs/*.log

# Check scope filter usage
grep "scopeFilter" /path/to/backend/logs/*.log
```

### Metrics to Monitor:
- API response times (should not increase)
- Error rate (should not increase)
- User complaints about access denied errors

---

## 📞 SUPPORT

**If Issues Occur:**
1. Check backend logs for specific errors
2. Verify scope values with: `node migrations/verify-scope-values.js`
3. Check MongoDB connection
4. Review middleware changes in `backend/middleware/checkPermission.js`

**Emergency Contacts:**
- Dev Team: [Your contact info]
- Database Admin: [DBA contact info]

---

## ✅ DEPLOYMENT CHECKLIST

**Pre-Deployment:**
- [ ] Code reviewed and tested on local database copy
- [ ] Backup created
- [ ] Maintenance window communicated to users
- [ ] Rollback plan reviewed

**During Deployment:**
- [ ] Code deployed to production
- [ ] Backend restarted
- [ ] Migration script executed successfully
- [ ] Scope values verified

**Post-Deployment:**
- [ ] Admin login tested
- [ ] Coach login tested (verify Balagruh filtering)
- [ ] Student login tested (verify own-data filtering)
- [ ] No errors in logs
- [ ] Performance metrics normal

---

**Last Updated:** 2025-10-22 14:24:42
**Tested By:** Dev Agent (James)
**Environment:** Local database (production data copy)
**Status:** ✅ Ready for Production Deployment
