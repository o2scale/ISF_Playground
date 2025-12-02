# Epic: Coin Economy Integration

**Epic ID:** Sprint5-Epic-03
**Sprint:** Sprint 5 - ISF Shop
**Date Created:** October 7, 2025
**Status:** Ready for Development
**Priority:** High

---

## Epic Overview

### Description
Integrate the ISF Shop with the existing coin earning system from Sprint 1, enabling students to spend earned coins. This epic completes the coin economy loop (earn → spend) by extending the Coin model, implementing atomic coin spending transactions, and providing coin refund mechanisms for order cancellations.

### Business Value
- Completes the gamification loop, motivating students to earn more
- Ensures data integrity with atomic coin transactions
- Provides fair refund mechanism for cancelled orders
- Enables comprehensive transaction history tracking
- Maintains accurate coin balances across all operations

### Success Criteria
- Coin spending transactions are atomic (never partial)
- All purchases deduct correct coin amount
- Refunds restore coins accurately
- Transaction history captures all shop activity
- Zero coin balance discrepancies
- Coin balance displayed real-time in UI

---

## User Stories

### Story 8: Coin Spending Integration
**Story ID:** Sprint5-Story-08
**File:** `docs/stories/sprint5-story-08-coin-spending.md`
**Priority:** P0
**Estimate:** 2 days
**Dependencies:** Sprint5-Story-03 (Checkout)

**User Story:**
As a student, I want my coin balance to decrease when I purchase items so that my available coins reflect my spending.

**Key Features:**
- Extend Coin model `source` enum with "shop"
- Use existing `spendCoins()` method with "shop" source
- Atomic coin deduction during checkout
- Balance validation before spending
- Transaction history entry with order reference
- Real-time balance update in UI
- Insufficient funds error handling

---

### Story 9: Transaction Management
**Story ID:** Sprint5-Story-09
**File:** `docs/stories/sprint5-story-09-transaction-management.md`
**Priority:** P1
**Estimate:** 2 days
**Dependencies:** Sprint5-Story-08

**User Story:**
As a student, I want to view my complete coin transaction history including shop purchases so that I can track my earnings and spending.

**Key Features:**
- Transaction history display (earned + spent)
- Filter by type (earned, spent)
- Filter by source (shop, tasks, wtf, bonus)
- Transaction details (description, amount, date)
- Balance after each transaction
- Date range filtering
- Export transaction history (CSV)

---

### Story 10: Order Cancellation & Refunds
**Story ID:** Sprint5-Story-10
**File:** `docs/stories/sprint5-story-10-order-cancellation.md`
**Priority:** P1
**Estimate:** 2 days
**Dependencies:** Sprint5-Story-08, Sprint5-Story-04

**User Story:**
As a student, I want to cancel orders within 5 minutes and receive automatic coin refunds so that I can fix purchasing mistakes.

**Key Features:**
- Order cancellation button (5-minute window)
- Cancellation reason (optional)
- Automatic coin refund using `earnCoins()`
- Stock restoration
- Cancellation notification
- Transaction history entry for refund
- Cancellation not allowed after 5 minutes

---

## Technical Overview

### Architecture Components

**Backend:**
- `models/coin.js` - EXTEND `source` enum (add "shop")
- `services/shopService.js` - Use `spendCoins()` method
- `services/orderService.js` - Refund logic with `earnCoins()`

**Frontend:**
- `hooks/useCoinBalance.js` - Real-time balance hook
- `components/shop/CoinBalance.jsx` - Balance display component
- `components/shop/TransactionHistory.jsx` - Transaction list

### Database Schema

**Coin Model Extension:**
```javascript
const CoinSchema = new mongoose.Schema({
  userId: ObjectId,
  balance: Number,
  totalEarned: Number,
  totalSpent: Number,

  // EXTEND this enum
  source: {
    type: String,
    enum: [
      "earned",
      "spent",
      "bonus",
      "penalty",
      "wtf_submission",
      "wtf_accepted",
      "wtf_expired",
      "shop"  // ◄── ADD THIS
    ]
  },

  transactionHistory: [{
    transactionType: String,
    amount: Number,
    balanceAfter: Number,
    description: String,
    source: String,
    metadata: Object,
    timestamp: Date
  }],

  lastTransaction: Date
});
```

**Existing Methods to Use:**
```javascript
// Sprint 1 method - REUSE
CoinSchema.methods.spendCoins = async function(
  amount,
  transactionType,
  description,
  source,
  metadata = {}
) {
  if (this.balance < amount) {
    throw new Error('Insufficient coin balance');
  }

  this.balance -= amount;
  this.totalSpent += amount;
  this.lastTransaction = new Date();

  this.transactionHistory.push({
    transactionType,
    amount: -amount,
    balanceAfter: this.balance,
    description,
    source,
    metadata,
    timestamp: new Date()
  });

  await this.save();
  return this;
};

// Sprint 1 method - REUSE for refunds
CoinSchema.methods.earnCoins = async function(
  amount,
  transactionType,
  description,
  source,
  metadata = {}
) {
  this.balance += amount;
  this.totalEarned += amount;
  this.lastTransaction = new Date();

  this.transactionHistory.push({
    transactionType,
    amount,
    balanceAfter: this.balance,
    description,
    source,
    metadata,
    timestamp: new Date()
  });

  await this.save();
  return this;
};
```

### API Endpoints

**Coin-Related Routes (reuse Sprint 1):**
- `GET /api/v1/coins/balance/:userId` - Get current balance
- `GET /api/v1/coins/transactions/:userId` - Transaction history

**Shop Routes (use coins):**
- `POST /api/v2/shop/orders` - Calls `spendCoins()`
- `DELETE /api/v2/shop/orders/:orderId` - Calls `earnCoins()` for refund

---

## Dependencies

### Internal Dependencies
- **Sprint 1 Coin Model (CRITICAL):** Must extend `source` enum
- **Sprint 1 `spendCoins()` Method:** Reuse for purchases
- **Sprint 1 `earnCoins()` Method:** Reuse for refunds
- **Sprint 5 Checkout:** Must be operational to test coin spending

### Story Dependencies
- **Sprint5-Story-08 blocks Story-09:** Must have coin spending before transaction history
- **Sprint5-Story-08 blocks Story-10:** Must have coin spending before refunds

---

## Risks & Mitigations

**Risk 1: Coin Balance Desync (balance incorrect after purchase)**
**Mitigation:** MongoDB transactions ensure atomicity. If order creation fails, coin deduction rolls back.

**Risk 2: Double-Refund (student cancels order twice)**
**Mitigation:** Order status check. Can only cancel orders with status "completed". Status changes to "cancelled" on first cancellation.

**Risk 3: Transaction History Performance (large datasets)**
**Mitigation:** Index on `userId` and `timestamp`. Paginate transaction history. Default to last 30 days.

**Risk 4: Negative Balance (bug allows overspending)**
**Mitigation:** Server-side validation in `spendCoins()` method. Never trust client balance checks.

---

## Testing Requirements

**Unit Tests:**
- `spendCoins()` with "shop" source
- `earnCoins()` for refunds
- Balance validation (insufficient funds)
- Transaction history entry creation

**Integration Tests:**
- Complete purchase → balance decremented → transaction logged
- Order cancellation → coins refunded → stock restored
- Concurrent purchases (two students, one coin pool)
- Transaction history filtering

**E2E Tests:**
- Student earns coins (Sprint 1) → Spends in shop → Balance updates
- Purchase → Cancel within 5 min → Refund received
- Insufficient balance → Checkout blocked → Earn more prompt

**Performance Tests:**
- Transaction history query < 200ms
- Balance update propagation < 100ms (UI)

---

## Definition of Done

- [ ] All 3 stories in epic completed
- [ ] Coin model `source` enum extended
- [ ] All purchases use `spendCoins()` correctly
- [ ] All refunds use `earnCoins()` correctly
- [ ] Transaction history displays shop purchases
- [ ] Order cancellation with refund works
- [ ] Tests passing (>80% coverage)
- [ ] Zero coin balance discrepancies in testing
- [ ] Code reviewed (no critical issues)
- [ ] QA gate passed
- [ ] No regressions in Sprint 1 coin earning

---

**Created:** October 7, 2025 - 6:20 PM
**Last Updated:** October 7, 2025 - 6:20 PM
