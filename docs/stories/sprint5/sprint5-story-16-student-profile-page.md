# Sprint5 - Story 16: Student Profile Page

**Story ID:** SPRINT5-STORY-16
**Created:** October 19, 2025 5:17 PM
**Status:** 📝 IN PLANNING
**Priority:** 🔴 HIGH
**Estimated Effort:** 8-11 hours (Development + Testing)
**Epic:** Coin Economy & User Management

**Last Updated:** 2025-10-19 17:17:03

---

## 📋 Story Overview

**As a** Student, Coach, or Admin
**I want** a comprehensive profile page that displays all my/student's information, activities, and statistics in one centralized location
**So that** I can easily view personal information, coin balance, shopping history, WTF activity, learning progress, and wellness data without navigating through multiple pages

---

## 🎯 Story Goals

1. Create unified **Student Profile Page** accessible to Students (own profile), Coaches (assigned students), and Admins (all students)
2. Display **7 key information sections**: Profile Header, Coin Wallet, WTF Activity, Shopping History, Learning Progress, Health & Wellness, Quick Actions
3. Implement **role-based permissions**: Students (view/edit own), Coaches (view/edit assigned students), Admins (view/edit all)
4. Aggregate data from **multiple sources**: User model, Coin Wallet, Shop Orders, WTF interactions, Learning modules, Mood tracking
5. Fix **"View Profile" button** in Zero Purchases Report (currently navigates to 404)
6. Add **profile navigation link** in student dashboard and admin navigation
7. Ensure **responsive design** (desktop, tablet, mobile)
8. Maintain **consistent UI/UX** with existing shop system design

---

## 🔍 Background & Context

### Current Issues Identified

**Navigation Gaps:**
- ❌ No student profile page exists
- ❌ "View Profile" button in Admin Reports → Zero Purchases Report navigates to `/admin/students/:userId` which returns 404
- ❌ Students have no way to view their consolidated information
- ❌ Admins cannot view student details in one place
- ❌ Coaches cannot access student profiles for assigned Balagruhas

**Data Fragmentation:**
- Student information scattered across multiple pages/modules
- No single source of truth for student status
- Coin balance visible in shop but no transaction history easily accessible
- WTF activity not visible to students
- Shopping history requires navigating to separate order page
- Guardian contact information buried in admin user management

**User Experience Issues:**
- Students must navigate to multiple pages to understand their status
- Admins need quick access to student information when reviewing reports
- No quick action panel for common student tasks
- Missing wellness/mood tracking visibility

### Business Value

1. **Enhanced Student Engagement**: Students can track their progress, earnings, and achievements
2. **Improved Admin Efficiency**: Quick access to student information for decision-making
3. **Better Coach Support**: Coaches can monitor assigned student progress
4. **Data Transparency**: Clear visibility of coin economy participation
5. **Reduced Support Queries**: Self-service access to personal information

---

## 👥 User Roles & Requirements

### **Student Role**

**Access:** Own profile only (`/profile` route)

**Can:**
- View all 7 profile sections
- Edit basic personal information (name, contact preferences)
- Change password
- Access quick action buttons
- Navigate to related pages (Shop, WTF Wall, Transactions)

**Cannot:**
- View other students' profiles
- Edit guardian information
- Access medical records (admin only)
- Modify coin balance

**Sees:**
- ✅ Profile Header (own details)
- ✅ Coin Wallet Dashboard (balance, stats, transaction history link)
- ✅ WTF Activity (content featured, submissions pending, engagement)
- ✅ Shopping Summary (order history, pending deliveries)
- ✅ Learning Progress (session time, active modules)
- ✅ Health & Wellness (mood tracking, guardian contacts)
- ✅ Quick Actions Panel (edit profile, change password, navigate to modules)

### **Coach Role**

**Access:** Assigned Balagruha students only (`/admin/students/:userId` route)

**Can:**
- View student profiles from assigned Balagruhas
- Edit student information (same as admin)
- Access guardian contact information
- View all student activities and statistics

**Cannot:**
- View students from non-assigned Balagruhas
- Edit own profile from admin view (must use `/profile`)
- Delete students

**Sees:**
- ✅ All 7 profile sections (view & edit mode)
- ✅ Guardian contact information (editable)
- ❌ Medical records access (admin only)
- ✅ Balagruha filter (shows only assigned Balagruhas)

**Existing Filters Apply:**
- Coach can only see students where `student.balagruhaIds` intersects with `coach.balagruhaIds`
- This logic already exists in user management and should be reused

### **Admin Role**

**Access:** All students (`/admin/students/:userId` route)

**Can:**
- View any student profile
- Edit any student information
- Access medical records
- View all statistics and activities
- Use "View Profile" from reports (Zero Purchases Report)

**Cannot:**
- Edit own profile from admin view (must use `/profile`)

**Sees:**
- ✅ All 7 profile sections (view & edit mode)
- ✅ Full guardian contact information (editable)
- ✅ Medical records access button
- ✅ Administrative actions (send reminder, reset password, etc.)
- ✅ No Balagruha filtering (sees all students)

---

## ✅ Acceptance Criteria

### AC1: Profile Page Route & Access Control

**Given** I am logged in as a Student
**When** I navigate to `/profile`
**Then** I should see my own profile with all 7 sections
**And** I should have edit access to personal information
**And** I should see "Edit Profile" and "Change Password" buttons

**Given** I am logged in as a Student
**When** I try to access `/admin/students/{anotherStudentId}`
**Then** I should be redirected to `/profile` or shown "Access Denied"

**Given** I am logged in as a Coach
**When** I navigate to `/admin/students/{studentId}` where student is in my assigned Balagruha
**Then** I should see the student's full profile with edit access
**And** I should see guardian contact information

**Given** I am logged in as a Coach
**When** I try to access a student profile from a non-assigned Balagruha
**Then** I should see "Access Denied" or be redirected to dashboard

**Given** I am logged in as an Admin
**When** I navigate to `/admin/students/{anyStudentId}`
**Then** I should see the full student profile with edit access
**And** I should see medical records access button

### AC2: Profile Header Section

**When** viewing a profile
**Then** I should see:
- Student name
- Student ID (if exists)
- Age and Gender
- Profile photo placeholder (or uploaded photo if available)
- Balagruha name(s) with badges
- Account status (Active/Inactive)
- Last login timestamp

### AC3: Coin Wallet Dashboard

**When** viewing the Coin Wallet section
**Then** I should see:
- **Large display** of current coin balance
- Coins earned this week
- Coins earned this month
- Total coins earned (all-time)
- Coins spent this month
- Available balance
- "View Transaction History" button navigating to transaction page
- "Browse Shop" button navigating to shop

**And** the data should match the Coin model in database

### AC4: WTF Activity Section

**When** viewing the WTF Activity section
**Then** I should see:
- Total content featured (pins created count)
- Submissions awaiting approval
- Community engagement metrics:
  - Posts liked
  - Posts viewed
  - Content shared (if available)
- Total WTF earnings (coins from WTF)
- "View WTF Wall" button navigating to WTF page

**And** the data should match wtfStudentInteraction and wtfPin models

### AC5: Shopping Summary Section

**When** viewing the Shopping Summary section
**Then** I should see:
- Total orders placed
- Total amount spent (in coins)
- Pending deliveries count
- Recent orders list (last 3-5):
  - Order number
  - Order date
  - Total amount
  - Delivery status
- "View Full Order History" button navigating to order history page

**And** orders should be sorted by date (newest first)

### AC6: Learning Progress Section

**When** viewing the Learning Progress section
**Then** I should see:
- Session time today
- Session time this week
- Active learning modules list
- Assigned machine/computer ID (if applicable)

**Note:** If performance reports become available, add:
- Attendance rate
- Performance summary

### AC7: Health & Wellness Section

**When** viewing the Health & Wellness section
**Then** I should see:
- Today's mood status (with emoji)
- Mood trend for the week (simple graph or list)
- Guardian contact information:
  - Guardian 1 name and phone
  - Guardian 2 name and phone (if exists)

**When** viewing as Admin
**Then** I should also see:
- "View Medical Records" button (navigates to medical records page)

### AC8: Quick Actions Panel (Students Only)

**Given** I am viewing my own profile as a Student
**When** I scroll to the Quick Actions section
**Then** I should see buttons for:
- Edit Profile
- View Notifications (if notification system exists)
- Access Learning Modules
- Open WTF Wall
- Visit Shop
- View Transaction History
- Change Password

**And** each button should navigate to the respective page

### AC9: "View Profile" Button Fix

**Given** I am an Admin viewing the Zero Purchases Report
**When** I click "View Profile" for any student
**Then** I should be navigated to `/admin/students/{studentId}`
**And** the student profile page should load successfully (not 404)

**Given** the profile page loaded successfully
**Then** all 7 sections should display with accurate data

### AC10: Responsive Design

**Given** I am viewing the profile page
**When** I resize the browser window

**Then** on Desktop (>1024px):
- Sections should display in 3-column grid where appropriate
- Full width layout
- All data visible without scrolling horizontally

**Then** on Tablet (768px - 1024px):
- Sections should display in 2-column grid
- Responsive layout without horizontal scroll

**Then** on Mobile (<768px):
- Sections should display in single column (stacked)
- Touch-friendly button sizes
- No horizontal scroll

### AC11: Data Accuracy & Performance

**When** the profile page loads
**Then** all data should be fetched within 2 seconds
**And** data should be accurate and match database records
**And** loading states should display while data is fetching
**And** errors should be handled gracefully with user-friendly messages

---

## 🏗️ Technical Implementation

### Backend Implementation

#### **1. New Controller: Profile Controller**

**File:** `backend/controllers/profileController.js`

```javascript
/**
 * GET /api/v1/users/:userId/profile
 * Aggregated profile data endpoint
 */
exports.getStudentProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const requestingUser = req.user;

    // Authorization check
    const authorized = await checkProfileAccess(requestingUser, userId);
    if (!authorized) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Fetch data in parallel
    const [user, coinData, shopData, wtfData, learningData, wellnessData] =
      await Promise.all([
        fetchUserData(userId),
        fetchCoinData(userId),
        fetchShopData(userId),
        fetchWTFData(userId),
        fetchLearningData(userId),
        fetchWellnessData(userId)
      ]);

    res.status(200).json({
      user,
      coins: coinData,
      shop: shopData,
      wtf: wtfData,
      learning: learningData,
      wellness: wellnessData
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Failed to load profile' });
  }
};
```

**Authorization Logic:**
```javascript
const checkProfileAccess = async (requestingUser, targetUserId) => {
  // Students can only view own profile
  if (requestingUser.role === 'student') {
    return requestingUser._id.toString() === targetUserId;
  }

  // Admins can view any profile
  if (requestingUser.role === 'admin') {
    return true;
  }

  // Coaches can view students from assigned Balagruhas
  if (requestingUser.role === 'coach') {
    const targetUser = await User.findById(targetUserId);
    if (!targetUser) return false;

    // Check if coach's Balagruhas intersect with student's Balagruhas
    const coachBalagruhas = requestingUser.balagruhaIds.map(id => id.toString());
    const studentBalagruhas = targetUser.balagruhaIds.map(id => id.toString());

    return coachBalagruhas.some(id => studentBalagruhas.includes(id));
  }

  return false;
};
```

#### **2. New Route**

**File:** `backend/routes/v1/profile.js`

```javascript
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { authenticate } = require('../middleware/auth');

// GET /api/v1/users/:userId/profile
router.get('/:userId/profile',
  authenticate,
  profileController.getStudentProfile
);

module.exports = router;
```

**Register in app.js:**
```javascript
app.use('/api/v1/users', require('./routes/v1/profile'));
```

#### **3. Data Fetching Helpers**

```javascript
// Fetch user basic info with Balagruha population
const fetchUserData = async (userId) => {
  return await User.findById(userId)
    .populate('balagruhaIds', 'name')
    .select('name email userId age gender role status lastLogin guardianName1 guardianName2 guardianContact1 guardianContact2')
    .lean();
};

// Fetch coin wallet data
const fetchCoinData = async (userId) => {
  const coin = await Coin.findOne({ userId }).lean();
  if (!coin) return getDefaultCoinData();

  return {
    balance: coin.balance,
    weeklyStats: coin.weeklyStats,
    monthlyStats: coin.monthlyStats,
    wtfStats: coin.wtfStats,
    totalEarned: coin.transactions
      .filter(t => t.type.includes('earned'))
      .reduce((sum, t) => sum + t.amount, 0),
    totalSpent: coin.transactions
      .filter(t => t.type === 'spent')
      .reduce((sum, t) => sum + t.amount, 0)
  };
};

// Fetch shop order data
const fetchShopData = async (userId) => {
  const orders = await Order.find({ userId })
    .sort({ placedAt: -1 })
    .limit(5)
    .select('orderNumber totalAmount status deliveryStatus placedAt')
    .lean();

  const totalOrders = await Order.countDocuments({ userId });
  const totalSpent = await Order.aggregate([
    { $match: { userId: mongoose.Types.ObjectId(userId), status: 'completed' } },
    { $group: { _id: null, total: { $sum: '$totalAmount' } } }
  ]);

  const pendingDeliveries = await Order.countDocuments({
    userId,
    deliveryStatus: { $in: ['pending_confirmation', 'pending_delivery'] }
  });

  return {
    totalOrders,
    totalSpent: totalSpent[0]?.total || 0,
    pendingDeliveries,
    recentOrders: orders
  };
};

// Fetch WTF activity data
const fetchWTFData = async (userId) => {
  const [featuredPins, pendingSubmissions, interactions] = await Promise.all([
    WTFPin.countDocuments({ createdBy: userId, isPinned: true }),
    WTFSubmission.countDocuments({ studentId: userId, status: 'pending' }),
    WTFStudentInteraction.find({ studentId: userId }).lean()
  ]);

  const totalInteractions = interactions.filter(i => i.likeType !== null).length;

  // Get WTF earnings from coin transactions
  const coin = await Coin.findOne({ userId });
  const wtfEarnings = coin?.wtfStats?.totalWtfCoinsEarned || 0;

  return {
    featuredContent: featuredPins,
    pendingSubmissions,
    totalInteractions,
    totalWtfEarnings: wtfEarnings
  };
};

// Fetch learning/session data (if available)
const fetchLearningData = async (userId) => {
  // TODO: Implement when session tracking is available
  return {
    sessionTimeToday: 0,
    sessionTimeWeek: 0,
    activeModules: [],
    assignedMachine: null
  };
};

// Fetch wellness/mood data
const fetchWellnessData = async (userId) => {
  // TODO: Fetch from mood tracking system
  return {
    todayMood: null,
    weekMoodHistory: []
  };
};
```

### Frontend Implementation

#### **1. Main Component: StudentProfile.jsx**

**File:** `frontend/src/pages/StudentProfile.jsx`

```javascript
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api';
import { useAuthStore } from '../stores/authStore';
import toast from 'react-hot-toast';

// Sub-components
import ProfileHeader from '../components/profile/ProfileHeader';
import CoinWalletCard from '../components/profile/CoinWalletCard';
import WTFActivityCard from '../components/profile/WTFActivityCard';
import ShoppingCard from '../components/profile/ShoppingCard';
import LearningCard from '../components/profile/LearningCard';
import WellnessCard from '../components/profile/WellnessCard';
import QuickActionsPanel from '../components/profile/QuickActionsPanel';

const StudentProfile = () => {
  const { userId } = useParams(); // From URL (admin/coach view)
  const currentUser = useAuthStore(state => state.user);

  // Determine profile context
  const profileUserId = userId || currentUser._id;
  const isOwnProfile = !userId || userId === currentUser._id;
  const isAdmin = currentUser.role === 'admin';
  const isCoach = currentUser.role === 'coach';

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfileData();
  }, [profileUserId]);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get(`/api/v1/users/${profileUserId}/profile`);
      setProfileData(response.data);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(err.response?.data?.message || 'Failed to load profile');
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchProfileData}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <ProfileHeader
        user={profileData.user}
        isOwnProfile={isOwnProfile}
        isAdmin={isAdmin}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coin Wallet - Full Width */}
        <div className="lg:col-span-3">
          <CoinWalletCard data={profileData.coins} />
        </div>

        {/* WTF Activity */}
        <div className="lg:col-span-1">
          <WTFActivityCard data={profileData.wtf} />
        </div>

        {/* Shopping Summary */}
        <div className="lg:col-span-2">
          <ShoppingCard data={profileData.shop} />
        </div>

        {/* Learning Progress */}
        <div className="lg:col-span-1">
          <LearningCard data={profileData.learning} />
        </div>

        {/* Health & Wellness */}
        <div className="lg:col-span-2">
          <WellnessCard
            data={profileData.wellness}
            guardianInfo={{
              guardianName1: profileData.user.guardianName1,
              guardianName2: profileData.user.guardianName2,
              guardianContact1: profileData.user.guardianContact1,
              guardianContact2: profileData.user.guardianContact2
            }}
            isAdmin={isAdmin}
          />
        </div>
      </div>

      {/* Quick Actions - Only for own profile */}
      {isOwnProfile && (
        <QuickActionsPanel />
      )}
    </div>
  );
};

export default StudentProfile;
```

#### **2. Sub-Components**

**Files to Create:**
- `frontend/src/components/profile/ProfileHeader.jsx` - Name, age, balagruha, status, last login
- `frontend/src/components/profile/CoinWalletCard.jsx` - Coin balance, stats, action buttons
- `frontend/src/components/profile/WTFActivityCard.jsx` - WTF metrics, engagement stats
- `frontend/src/components/profile/ShoppingCard.jsx` - Order history, pending deliveries
- `frontend/src/components/profile/LearningCard.jsx` - Session time, active modules
- `frontend/src/components/profile/WellnessCard.jsx` - Mood tracking, guardian contacts
- `frontend/src/components/profile/QuickActionsPanel.jsx` - Action buttons for students

**Design Pattern:**
- Each card component follows same structure: Purple/white card with icon header, stats grid, action button
- Consistent with existing shop system design
- Use Lucide icons throughout
- Responsive grid layout

#### **3. Routing Configuration**

**File:** `frontend/src/AppRoutes.js`

```javascript
// Add these routes
import StudentProfile from './pages/StudentProfile';

// In route definitions:

// Student route - view own profile
<Route path="/profile" element={<StudentProfile />} />

// Admin/Coach route - view student profile
<Route path="/admin/students/:userId" element={<StudentProfile />} />
```

#### **4. Navigation Updates**

**Update Student Dashboard:**
Add "My Profile" link to student navigation

**Update Admin Navigation:**
Existing "View Profile" in Zero Purchases Report already navigates to `/admin/students/:userId`

**Update Coach Navigation:**
Add profile access for assigned students in user management

---

## 🧪 Test Cases

### TC1: Student Viewing Own Profile

**Setup:** Login as Student (studentId: STU-001)

**Steps:**
1. Navigate to `/profile`
2. Verify all 7 sections load
3. Verify personal data accuracy (name, age, balagruha)
4. Verify coin balance matches wallet
5. Verify WTF stats display
6. Verify shopping history shows recent orders
7. Verify Quick Actions panel visible
8. Click "Edit Profile" - should navigate to edit page
9. Click "Browse Shop" - should navigate to shop

**Expected:** All data displays correctly, navigation works

### TC2: Admin Viewing Student Profile

**Setup:** Login as Admin

**Steps:**
1. Navigate to Admin Reports → Zero Purchases Report
2. Find student "Aaradhya Ram Katale"
3. Click "View Profile" button
4. Verify URL is `/admin/students/{userId}`
5. Verify profile loads (not 404)
6. Verify all 7 sections display
7. Verify guardian contact information visible
8. Verify "View Medical Records" button present
9. Verify NO "Edit Profile" button (admin viewing student)
10. Verify NO Quick Actions panel

**Expected:** Profile loads successfully with all admin-specific features

### TC3: Coach Viewing Assigned Student

**Setup:** Login as Coach assigned to "Matruchaya" Balagruha

**Steps:**
1. Navigate to Users page
2. Filter by "Matruchaya" Balagruha
3. Select student from Matruchaya
4. Click "View Profile"
5. Verify profile loads
6. Verify all sections visible
7. Verify guardian information visible
8. Verify edit capabilities available

**Expected:** Coach can view and edit assigned student profile

### TC4: Coach Viewing Non-Assigned Student

**Setup:** Login as Coach assigned to "Matruchaya" only

**Steps:**
1. Attempt to navigate to `/admin/students/{studentFromSnehchaya}`
2. Verify access denied or redirect

**Expected:** Coach cannot access non-assigned student profile

### TC5: Student Viewing Another Student Profile

**Setup:** Login as Student (STU-001)

**Steps:**
1. Attempt to navigate to `/admin/students/STU-002`
2. Verify redirect to own profile or access denied

**Expected:** Student cannot view other students' profiles

### TC6: Data Accuracy Tests

**Setup:** Login as Student with known test data

**Preconditions:**
- Student has 1,250 coins balance
- Student has 11 completed orders totaling 2,010 coins
- Student has 8 WTF pins created
- Student has 2 pending deliveries

**Steps:**
1. Navigate to `/profile`
2. Verify Coin Wallet shows: Balance = 1,250
3. Verify Shopping shows: Total Orders = 11, Total Spent = 2,010
4. Verify WTF shows: Featured Content = 8
5. Verify Shopping shows: Pending Deliveries = 2

**Expected:** All displayed data matches database records

### TC7: Responsive Design Test

**Steps:**
1. Load profile page on desktop (1920x1080)
   - Verify 3-column grid for cards
2. Resize to tablet (768x1024)
   - Verify 2-column grid
3. Resize to mobile (375x667)
   - Verify single column stacked layout
4. Verify no horizontal scroll at any breakpoint

**Expected:** Responsive design works across all devices

### TC8: Loading & Error States

**Test 8A: Loading State**
- Mock slow API response (3 seconds)
- Verify loading spinner displays
- Verify loading text "Loading profile..." shows

**Test 8B: Error State**
- Mock API error (500 Internal Server Error)
- Verify error message displays
- Verify "Try Again" button present
- Click "Try Again" - should retry fetch

**Expected:** Loading and error states handled gracefully

### TC9: Performance Test

**Steps:**
1. Clear cache
2. Navigate to profile page
3. Measure time to full page load

**Expected:**
- Initial load < 2 seconds
- All data fetched in parallel
- No sequential waterfall requests

### TC10: Navigation Integration

**Test 10A: From Student Dashboard**
- Login as student
- Dashboard should have "My Profile" link
- Click link → navigate to `/profile`

**Test 10B: From Admin Reports**
- Login as admin
- Go to Zero Purchases Report
- Click "View Profile" for any student
- Should navigate to `/admin/students/{userId}` and load successfully

**Test 10C: Quick Actions**
- Login as student, view own profile
- Click "Browse Shop" → navigate to `/shop`
- Click "View Transactions" → navigate to transaction history
- Click "Open WTF Wall" → navigate to WTF page

**Expected:** All navigation links work correctly

---

## 📦 Dependencies

### Backend Dependencies
- ✅ User model (`models/user.js`)
- ✅ Coin model (`models/coin.js`)
- ✅ Order model (`models/order.js`)
- ✅ WTFPin model (`models/wtfPin.js`)
- ✅ WTFSubmission model (`models/wtfSubmission.js`)
- ✅ WTFStudentInteraction model (`models/wtfStudentInteraction.js`)
- ✅ Balagruha model (`models/balagruha.js`)
- ✅ Authentication middleware
- ✅ Authorization middleware

### Frontend Dependencies
- ✅ React Router DOM (routing)
- ✅ Zustand (state management - useAuthStore)
- ✅ Axios (API calls via api.js)
- ✅ React Hot Toast (notifications)
- ✅ Lucide React (icons)
- ✅ Tailwind CSS (styling)

### External Dependencies
- ❌ Session tracking system (not yet implemented - show placeholder)
- ❌ Mood tracking API (not yet implemented - show placeholder)
- ❌ Performance reports API (not yet implemented - show placeholder)
- ❌ Medical records page (referenced but link only)

---

## ⚠️ Risks & Mitigation

### Risk 1: Performance with Large Data Sets
**Risk:** Profile page may slow down for students with 1000+ orders or transactions
**Mitigation:**
- Paginate order history (show only recent 5)
- Lazy load additional data
- Cache profile data for 5 minutes
- Add database indexes on userId fields

### Risk 2: Authorization Logic Complexity
**Risk:** Coach Balagruha filtering may have edge cases
**Mitigation:**
- Reuse existing Balagruha filter logic from user management
- Add comprehensive authorization tests
- Log access attempts for audit

### Risk 3: Incomplete Data
**Risk:** Some students may have missing data (no coins, no orders)
**Mitigation:**
- Show zero states with helpful messaging
- Display "Get Started" prompts for empty sections
- Never show errors for missing optional data

### Risk 4: Route Conflicts
**Risk:** `/profile` may conflict with existing routes
**Mitigation:**
- Check AppRoutes.js for conflicts before adding
- Test routing thoroughly
- Add route guards for role-based access

---

## 📝 Implementation Checklist

### Backend Tasks
- [ ] Create `profileController.js` with getStudentProfile handler
- [ ] Create authorization helper `checkProfileAccess()`
- [ ] Create data fetching helpers (fetchUserData, fetchCoinData, etc.)
- [ ] Create route file `routes/v1/profile.js`
- [ ] Register route in `app.js`
- [ ] Add error handling and logging
- [ ] Test endpoint with Thunder Client/Postman
- [ ] Add API documentation

### Frontend Tasks
- [ ] Create `StudentProfile.jsx` main component
- [ ] Create `ProfileHeader.jsx` sub-component
- [ ] Create `CoinWalletCard.jsx` sub-component
- [ ] Create `WTFActivityCard.jsx` sub-component
- [ ] Create `ShoppingCard.jsx` sub-component
- [ ] Create `LearningCard.jsx` sub-component
- [ ] Create `WellnessCard.jsx` sub-component
- [ ] Create `QuickActionsPanel.jsx` sub-component
- [ ] Add routes to `AppRoutes.js`
- [ ] Update `ZeroPurchasesReport.jsx` View Profile navigation
- [ ] Add "My Profile" link to student dashboard
- [ ] Add loading and error states
- [ ] Test responsive design (desktop, tablet, mobile)

### Testing Tasks
- [ ] Execute TC1: Student viewing own profile
- [ ] Execute TC2: Admin viewing student profile
- [ ] Execute TC3: Coach viewing assigned student
- [ ] Execute TC4: Coach viewing non-assigned student (negative test)
- [ ] Execute TC5: Student viewing another student (negative test)
- [ ] Execute TC6: Data accuracy verification
- [ ] Execute TC7: Responsive design test
- [ ] Execute TC8: Loading and error states
- [ ] Execute TC9: Performance test
- [ ] Execute TC10: Navigation integration
- [ ] Create Playwright E2E test suite
- [ ] Create QA Report document

### Documentation Tasks
- [ ] Update API documentation with new endpoint
- [ ] Create dev agent record
- [ ] Create QA test report
- [ ] Update user manual (if exists)
- [ ] Add screenshots to story document

---

## 🎨 UI/UX Design Notes

### Visual Style
- **Color Scheme:** Purple theme (consistent with shop system)
- **Card Style:** White background, subtle shadow, rounded corners
- **Icons:** Lucide icons (consistent with existing components)
- **Typography:** Same fonts as shop system
- **Spacing:** 24px gap between sections

### Card Design Pattern
```
┌─────────────────────────────────────────────┐
│ 🎨 [Icon] SECTION TITLE                     │
│ ─────────────────────────────────────────── │
│                                              │
│ [Content grid with stats/data]              │
│                                              │
│ [Action Button →]                           │
└─────────────────────────────────────────────┘
```

### Responsive Breakpoints
- **Desktop:** > 1024px (3 columns)
- **Tablet:** 768px - 1024px (2 columns)
- **Mobile:** < 768px (1 column)

### Accessibility
- Semantic HTML structure
- ARIA labels for screen readers
- Keyboard navigation support
- High contrast text
- Focus indicators

---

## 📊 Success Metrics

### User Engagement
- **Target:** 80% of students visit their profile within 1 week of launch
- **Metric:** Track `/profile` page views

### Admin Efficiency
- **Target:** 50% reduction in time to access student information
- **Metric:** Compare time before/after feature (manual tracking)

### Feature Adoption
- **Target:** "View Profile" button clicked 100+ times in first week
- **Metric:** Track Zero Purchases Report → View Profile clicks

### Performance
- **Target:** 95% of profile loads complete in < 2 seconds
- **Metric:** Monitor API response times

---

## 🔄 Future Enhancements

### Phase 2 Features
1. **Profile Photo Upload** - Allow students to upload avatar
2. **Achievement Badges** - Display earned badges/achievements
3. **Coin Earning Graphs** - Interactive charts showing earning trends
4. **Learning Progress Graphs** - Visual progress tracking
5. **Customizable Themes** - Let students choose profile color themes
6. **Export Profile Data** - Download profile as PDF
7. **Social Sharing** - Share achievements (with privacy controls)

### Phase 3 Features
1. **Notification Preferences** - Configure what notifications to receive
2. **Privacy Settings** - Control what data is visible to coaches/admins
3. **Activity Feed** - Recent activities timeline
4. **Goals & Targets** - Set and track personal goals
5. **Comparison Stats** - Compare with Balagruha average (anonymized)

---

## 📚 Related Stories

- **SPRINT5-STORY-12:** Transaction Reports (Zero Purchases Report - requires View Profile fix)
- **SPRINT5-STORY-08:** Coin Spending (Shop integration)
- **WTF System:** Wall for Thrust towards Fame (WTF activity integration)
- **User Management:** Existing user CRUD operations

---

## 🏁 Definition of Done

- [ ] All backend endpoints implemented and tested
- [ ] All frontend components implemented and styled
- [ ] All 10 test cases pass
- [ ] Playwright E2E tests created and passing
- [ ] Code reviewed and approved
- [ ] Documentation complete (API docs, dev record, QA report)
- [ ] Responsive design verified on all devices
- [ ] Performance targets met (< 2 second load time)
- [ ] Accessibility requirements met
- [ ] "View Profile" button in Zero Purchases Report works
- [ ] Student dashboard has "My Profile" link
- [ ] Admin can view any student profile
- [ ] Coach can view only assigned student profiles
- [ ] All authorization rules enforced
- [ ] No console errors or warnings
- [ ] Deployed to development environment
- [ ] Stakeholder sign-off received

---

## 👨‍💻 Dev Agent Record

**Implementation Date:** 2025-10-19 17:34:45
**Implemented By:** Dev Agent (Claude Code)
**Status:** ✅ READY FOR QA

### Files Created

#### Backend:
- `backend/controllers/profileController.js` - Profile controller with aggregated data fetching
- Route added to `backend/routes/v1/user.js` - GET /:userId/profile

#### Frontend:
- `frontend/src/pages/StudentProfile.jsx` - Main profile page component
- `frontend/src/components/profile/ProfileHeader.jsx` - Profile header with user info
- `frontend/src/components/profile/CoinWalletCard.jsx` - Coin balance and statistics
- `frontend/src/components/profile/WTFActivityCard.jsx` - WTF engagement metrics
- `frontend/src/components/profile/ShoppingCard.jsx` - Order history and stats
- `frontend/src/components/profile/LearningCard.jsx` - Learning progress display
- `frontend/src/components/profile/WellnessCard.jsx` - Mood tracking and guardian contacts
- `frontend/src/components/profile/QuickActionsPanel.jsx` - Navigation shortcuts
- Route configuration in `frontend/src/App.js` - /profile and /admin/students/:userId

#### Documentation:
- `docs/qa/e2e/sprint5-story-16-student-profile-page.md` - Comprehensive E2E test cases (11 ACs, 30+ test cases)

### Implementation Summary

**Backend Implementation:**
- Single profile endpoint: `GET /api/v1/users/:userId/profile`
- Authorization logic: Students can view own profile, Coaches view assigned Balagruhas, Admins view all
- Data aggregation from: User, Coin, Order, WTF, Learning, Wellness systems
- Helper functions for fetching each data type
- Proper error handling and logging

**Frontend Implementation:**
- Main StudentProfile page with responsive grid layout (3-col desktop, 2-col tablet, 1-col mobile)
- 7 sub-components following shop system card pattern
- Loading, error, and empty states for all sections
- Navigation integration: /profile (students), /admin/students/:userId (admin/coach)
- Quick Actions Panel for students only
- Consistent styling with Tailwind CSS and existing design system

**Key Features:**
- ✅ Role-based access control (Students/Coaches/Admins)
- ✅ Balagruha filtering for coaches
- ✅ Aggregated data from all systems
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Empty states for missing data
- ✅ Error handling and retry logic
- ✅ Loading states with spinners
- ✅ Navigation shortcuts (Quick Actions)
- ✅ All 11 acceptance criteria addressed

### Testing Notes

**Status:** Implementation complete, ready for QA testing
**E2E Test Document:** docs/qa/e2e/sprint5-story-16-student-profile-page.md
**Test Coverage:** 11 Acceptance Criteria → 30+ Test Cases

**QA Instructions:**
1. Use Playwright MCP to execute test scenarios
2. Test all three user roles (Student, Coach, Admin)
3. Verify authorization rules (TC 8.1, 8.2, 8.3)
4. Test responsive design on mobile/tablet/desktop
5. Verify data aggregation accuracy (TC 11.1)
6. Test error handling (TC 10.1, 10.2)
7. Capture screenshots for each test case

### Known Issues/Limitations

- Learning session time tracking requires integration with learning system (currently returns 0)
- Machine assignment data displayed from user.assignedMachines
- WTF data depends on WTF models being available (graceful fallback if not)

---

**Story created by:** Dev Agent (Claude Code)
**Last updated:** 2025-10-19 17:34:45
**Status:** ✅ READY FOR QA
