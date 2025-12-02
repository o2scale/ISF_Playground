# Coin Wallet System Architecture

## Overview
The Coin Wallet System is a comprehensive virtual currency implementation that tracks student achievements, WTF contributions, and provides a foundation for the Sprint 5 ISF Shop spending mechanism.

## Database Schema

### Coin Model (`backend/models/coin.js`)

```javascript
{
  userId: ObjectId (ref: User) - Required
  balance: Number (default: 0, min: 0)
  transactions: Array [
    {
      type: Enum ["earned", "spent", "bonus", "penalty", "wtf_pin_creation",
                  "wtf_submission_approval", "wtf_interaction"]
      amount: Number - Required
      description: String - Required
      source: Enum ["wtf", "attendance", "task", "medical", "sports", "music", "general"]
      wtfPinId: ObjectId (optional)
      wtfSubmissionId: ObjectId (optional)
      wtfInteractionId: ObjectId (optional)
      metadata: {
        ipAddress: String
        userAgent: String
        sessionId: String
      }
      createdAt: Date (auto)
    }
  ]
  weeklyStats: {
    coinsEarned: Number (default: 0)
    coinsSpent: Number (default: 0)
    lastResetDate: Date
  }
  monthlyStats: {
    coinsEarned: Number (default: 0)
    coinsSpent: Number (default: 0)
    lastResetDate: Date
  }
  wtfStats: {
    pinsCreated: Number (default: 0)
    submissionsApproved: Number (default: 0)
    interactionsMade: Number (default: 0)
    totalWtfCoinsEarned: Number (default: 0)
  }
  timestamps: true
}
```

### Indexes
- `userId: 1` - For user coin queries
- `transactions.createdAt: -1` - For transaction history
- `transactions.type: 1` - For transaction type queries
- `transactions.source: 1` - For source-based queries

## Current Earning Mechanisms (Sprint 1)

### 1. WTF Module Earnings
**Location:** Integrated throughout WTF module

#### Pin Creation Reward
- Trigger: When admin approves and pins student content to Wall of Fame
- Implementation: WTF service automatically awards coins
- Tracking: `wtfStats.pinsCreated` increments

#### Submission Approval
- Trigger: When student submission is approved
- Tracking: `wtfStats.submissionsApproved` increments

#### Interaction Rewards
- Trigger: Likes, comments, views on WTF pins
- Tracking: `wtfStats.interactionsMade` increments

### 2. Transaction Types
```javascript
"earned"                     // General earning
"spent"                      // General spending (NOT YET IMPLEMENTED)
"bonus"                      // Special bonuses
"penalty"                    // Deductions
"wtf_pin_creation"          // WTF specific: pin created
"wtf_submission_approval"   // WTF specific: submission approved
"wtf_interaction"           // WTF specific: interactions (likes, views)
```

### 3. Transaction Sources
```javascript
"wtf"        // Wall of Fame activities
"attendance" // Attendance rewards (PLANNED)
"task"       // Task completion (PLANNED)
"medical"    // Medical check-ins (PLANNED)
"sports"     // Sports activities (PLANNED)
"music"      // Music activities (PLANNED)
"general"    // General/admin awards
```

## Instance Methods

### Adding Coins
```javascript
// Method: coinRecord.addCoins(amount, type, description, source, metadata)
coinRecord.addCoins(
  10,                      // amount
  "wtf_pin_creation",      // type
  "First pin created",     // description
  "wtf",                   // source
  { pinId: "123..." }      // metadata
);
```

**Behavior:**
1. Validates amount > 0
2. Increments balance
3. Adds transaction record
4. Updates weeklyStats and monthlyStats
5. Updates wtfStats if source is "wtf"
6. Saves document

### Spending Coins (FOR SPRINT 5)
```javascript
// Method: coinRecord.spendCoins(amount, type, description, source, metadata)
coinRecord.spendCoins(
  50,                      // amount
  "spent",                 // type
  "Purchased T-Shirt",     // description
  "shop",                  // source (NEW for Sprint 5)
  { orderId: "789..." }    // metadata
);
```

**Behavior:**
1. Validates amount > 0
2. Checks sufficient balance
3. Decrements balance
4. Adds transaction record with type="spent"
5. Updates weeklyStats and monthlyStats for spent coins
6. Saves document

**Error:** Throws "Insufficient coin balance" if balance < amount

## Static Methods

### Find or Create for User
```javascript
// Automatically creates coin record if doesn't exist
const coinRecord = await Coin.findOrCreateForUser(userId);
```

### Get User Balance
```javascript
const balance = await Coin.getUserBalance(userId);
// Returns: number (0 if no record found)
```

### Award WTF Coins
```javascript
await Coin.awardWtfCoins(
  userId,
  amount,
  type,
  description,
  metadata
);
```

### Get Top Earners
```javascript
const topEarners = await Coin.getTopEarners(
  10,        // limit
  "weekly"   // period: "weekly" | "monthly"
);
```

## API Endpoints (`backend/routes/v1/coin.js`)

### Student/User Endpoints (Authenticated)
- `GET /api/v1/coin/balance` - Get current balance
- `GET /api/v1/coin/stats` - Get coin statistics (weekly, monthly, wtf)
- `GET /api/v1/coin/transactions` - Get transaction history (paginated)
  - Query: `page`, `limit`
- `GET /api/v1/coin/wtf-transactions` - Get WTF-specific transactions
  - Query: `limit`

### Admin Endpoints (Authenticated + Admin Role)
- `GET /api/v1/coin/top-earners` - Get leaderboard
  - Query: `limit`, `period` (weekly/monthly)
- `GET /api/v1/coin/all-transactions` - Get all transactions with filters
  - Query: `page`, `limit`, `userId`, `type`, `source`, `dateFrom`, `dateTo`, `pinType`

### Bonus Eligibility (Future Use)
- `GET /api/v1/coin/first-pin-bonus-eligibility`
- `GET /api/v1/coin/weekly-active-bonus-eligibility`

## Sprint 5 Integration Points

### 1. Shop Purchase Flow (TO IMPLEMENT)

#### Backend Extension
```javascript
// NEW: Add shop transaction type
// In backend/models/coin.js, extend enums:
source: [..., "shop"]  // Add to enum array

// NEW: Shop service integration
// backend/services/shop.js (to be created)
async function processPurchase(userId, items) {
  const totalCost = calculateTotalCost(items);
  const coinRecord = await Coin.findOrCreateForUser(userId);

  // Use existing spendCoins method
  await coinRecord.spendCoins(
    totalCost,
    "spent",
    `Purchased ${items.length} items`,
    "shop",
    {
      items: items.map(i => i._id),
      orderId: generateOrderId(),
      purchaseDate: new Date()
    }
  );

  return { success: true, newBalance: coinRecord.balance };
}
```

#### Frontend Integration
```javascript
// Check balance before purchase
const { balance } = await fetch('/api/v1/coin/balance');

if (balance < totalCost) {
  showError("Insufficient coins");
  return;
}

// Process purchase (calls shop API which internally calls spendCoins)
const result = await fetch('/api/v1/shop/purchase', {
  method: 'POST',
  body: JSON.stringify({ items })
});
```

### 2. Real-time Balance Updates
- WebSocket notifications for balance changes
- Shop component subscribes to coin updates
- Display current balance in shop header

### 3. Transaction History in Shop
- Show shop-specific transactions
- Filter by `source: "shop"`
- Display purchase details from metadata

### 4. Balance Validation Middleware
```javascript
// backend/middleware/coinValidation.js (to be created)
async function validateSufficientCoins(req, res, next) {
  const userId = req.user.id;
  const requiredAmount = req.body.totalCost;

  const balance = await Coin.getUserBalance(userId);

  if (balance < requiredAmount) {
    return res.status(400).json({
      success: false,
      message: "Insufficient coin balance",
      currentBalance: balance,
      required: requiredAmount
    });
  }

  next();
}
```

## Safe Extension Points for Sprint 5

### 1. DO NOT MODIFY
- Existing transaction types and sources (keep backward compatibility)
- `addCoins()` method logic
- Existing API endpoints
- WTF integration code

### 2. CAN SAFELY ADD
- New transaction source: "shop"
- New API endpoints under `/api/v2/coin/` or `/api/v1/shop/`
- New metadata fields in transactions
- Shop-specific validation middleware
- Shop-related coin services

### 3. CAN SAFELY EXTEND
- User model: Add optional `shopPreferences` field
- Coin model: Add optional `shopStats` subdocument
  ```javascript
  shopStats: {
    totalSpent: Number (default: 0),
    purchaseCount: Number (default: 0),
    favoriteCategories: [String]
  }
  ```

## Current Limitations & Technical Debt

### Issues
1. **No Input Validation:** Controller doesn't validate amounts, types
2. **No Transaction Rollback:** If coin deduction succeeds but order fails, no rollback mechanism
3. **No Concurrency Control:** Race conditions possible on simultaneous purchases
4. **No Audit Trail:** No separate audit log for financial transactions

### Recommendations for Sprint 5
1. **Add Transaction Locks:** Use MongoDB transactions for atomic operations
2. **Implement Saga Pattern:** For multi-step purchase flow
3. **Add Validation Middleware:** Validate all coin operations
4. **Create Audit Log:** Separate collection for immutable audit trail
5. **Rate Limiting:** Prevent rapid purchase attempts

## Testing Considerations

### Test Scenarios for Sprint 5
1. Purchase with sufficient balance
2. Purchase with insufficient balance
3. Concurrent purchases by same user
4. Purchase with exactly balance amount
5. Purchase cancellation/refund flow
6. Balance updates reflected in real-time

## Example: Complete Purchase Flow

```javascript
// Sprint 5 Implementation Example
// backend/services/shop.js

const mongoose = require('mongoose');
const Coin = require('../models/coin');
const Order = require('../models/order'); // To be created
const Notification = require('../models/notification');

async function completePurchase(userId, cartItems) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1. Calculate total
    const totalCost = cartItems.reduce((sum, item) => sum + item.price, 0);

    // 2. Get coin record
    const coinRecord = await Coin.findOrCreateForUser(userId);

    // 3. Validate balance
    if (coinRecord.balance < totalCost) {
      throw new Error('Insufficient balance');
    }

    // 4. Deduct coins
    await coinRecord.spendCoins(
      totalCost,
      "spent",
      `Shop purchase: ${cartItems.length} items`,
      "shop",
      {
        items: cartItems.map(i => i._id),
        timestamp: new Date()
      }
    );

    // 5. Create order (new collection)
    const order = await Order.create({
      userId,
      items: cartItems,
      totalCost,
      status: 'confirmed',
      paidWithCoins: totalCost,
      coinTransactionId: coinRecord.transactions[coinRecord.transactions.length - 1]._id
    });

    // 6. Send notification
    await Notification.createPersonal(
      userId,
      "Purchase Successful",
      `You've purchased ${cartItems.length} items for ${totalCost} coins`,
      "ISF_SHOP_UPDATE",
      { orderId: order._id, coinBalance: coinRecord.balance }
    );

    // 7. Commit transaction
    await session.commitTransaction();

    return {
      success: true,
      order,
      newBalance: coinRecord.balance
    };

  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}

module.exports = { completePurchase };
```

## Summary

The Coin Wallet System is **ready for Sprint 5 integration** with:
- ✅ Solid earning mechanism (WTF module)
- ✅ Robust transaction tracking
- ✅ `spendCoins()` method already implemented
- ✅ Balance validation built-in
- ⚠️ Needs transaction safety improvements
- ⚠️ Needs shop-specific extensions
- ⚠️ Needs concurrency handling

**Key Integration Strategy:** Extend, don't modify. Use existing methods, add shop-specific logic in new service layer.
