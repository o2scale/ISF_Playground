# Notification System Architecture

## Overview
The ISF Playground notification system provides real-time and persistent notifications for students, coaches, and administrators. It supports both personal (user-specific) and common (system-wide) notifications with WebSocket-based real-time delivery.

## Database Schema

### Notification Model (`backend/models/notification.js`)

```javascript
{
  userId: ObjectId (ref: User)  // Required for PERSONAL, optional for COMMON
  title: String (required, trimmed)
  message: String (required, trimmed)

  type: Enum {
    values: ["PERSONAL", "COMMON", "ACHIEVEMENT", "COACH_MESSAGE", "SYSTEM_UPDATE"]
    default: "PERSONAL"
  }

  category: Enum {
    values: [
      "WTF_PIN_ADDED",           // When student's work pinned to WTF
      "COINS_AWARDED",           // When coins assigned
      "ACHIEVEMENT_UNLOCKED",    // Achievement notifications
      "COACH_MESSAGE",           // Message from coach
      "ISF_SHOP_UPDATE",         // ⭐ SPRINT 5: Shop updates
      "SYSTEM_ANNOUNCEMENT",     // System announcements
      "TASK_ASSIGNED",           // New task assigned
      "ATTENDANCE_REMINDER",     // Attendance reminders
      "WORKSHOP_ANNOUNCEMENT",   // Workshop announcements
      "COMMUNITY_UPDATE",        // Community updates
      "NEW_CONTENT",             // New content available
      "GENERAL"                  // General notifications
    ]
    default: "GENERAL"
  }

  isRead: Boolean (default: false)
  isPersonal: Boolean (default: true)

  priority: Enum {
    values: ["LOW", "MEDIUM", "HIGH", "URGENT"]
    default: "MEDIUM"
  }

  metadata: {
    // For WTF pins
    pinId: ObjectId (ref: wtf_pin)
    contentType: String
    pinnedBy: ObjectId (ref: User)

    // For coins
    coinAmount: Number
    coinSource: String

    // For achievements
    achievementId: String
    achievementName: String

    // For tasks
    taskId: ObjectId (ref: task)

    // For coach messages
    coachId: ObjectId (ref: User)

    // General
    relatedEntityId: ObjectId
    relatedEntityType: String
    actionUrl: String  // URL to navigate when clicked
  }

  expiresAt: Date (default: null)  // null = never expires
  targetAudience: [String]  // Array of roles or user IDs
  isSystemWide: Boolean (default: false)
  isGlobal: Boolean (default: false)
  lastViewedAt: Date (default: null)

  timestamps: true
}
```

### Indexes
```javascript
{ userId: 1, isRead: 1, createdAt: -1 }     // User notifications query
{ type: 1, category: 1, createdAt: -1 }     // Category-based queries
{ isGlobal: 1, createdAt: -1 }              // Global notifications
{ expiresAt: 1 }, { expireAfterSeconds: 0 } // TTL index for auto-deletion
```

### User Notification View Model (`backend/models/userNotificationView.js`)
Tracks when user last viewed notifications for smart unread counts.

```javascript
{
  userId: ObjectId (ref: User, unique, required)
  lastViewedAt: Date (default: Date.now)
  createdAt: Date
  updatedAt: Date
}
```

## Notification Types

### 1. Personal Notifications
User-specific notifications delivered to individual users.

#### Creation
```javascript
await Notification.createPersonal(
  userId,
  "Coins Awarded",
  "You earned 10 coins for WTF pin creation!",
  "COINS_AWARDED",
  {
    coinAmount: 10,
    coinSource: "wtf",
    pinId: "507f1f77bcf86cd799439011"
  }
);
```

#### Use Cases
- WTF pin added to Wall of Fame
- Coins awarded for activities
- Personal achievements unlocked
- Direct messages from coaches
- Task assignments

### 2. Common Notifications
System-wide announcements visible to all or specific user groups.

#### Creation
```javascript
await Notification.createCommon(
  "New Shop Items Available",
  "Check out the new ISF merchandise in the shop!",
  "ISF_SHOP_UPDATE",
  ["student", "coach"],  // Target audience (optional)
  {
    actionUrl: "/shop",
    newItemCount: 5
  }
);
```

#### Use Cases
- Shop updates (Sprint 5)
- System announcements
- Workshop announcements
- Community updates

### 3. System-Wide Notifications
Special type of common notification for critical system messages.

#### Creation
```javascript
await Notification.createSystemWide(
  "Scheduled Maintenance",
  "System will be down for maintenance on Dec 25",
  "SYSTEM_ANNOUNCEMENT",
  {
    maintenanceDate: "2024-12-25",
    duration: "2 hours"
  }
);
```

## Instance Methods

### Mark as Read/Unread
```javascript
const notification = await Notification.findById(notificationId);

await notification.markAsRead();
await notification.markAsUnread();
```

## Static Methods

### Get User Notifications
```javascript
// Basic version
const notifications = await Notification.getUserNotifications(
  userId,
  limit = 50,
  skip = 0
);

// Smart version (filters based on last viewed time)
const notifications = await Notification.getUserNotificationsSmart(
  userId,
  limit = 50,
  skip = 0
);
```

**Behavior:**
- Returns personal notifications (isRead: false)
- Returns common notifications (last 30 days)
- Sorts by createdAt (descending)
- Combines and deduplicates

### Get Unread Count
```javascript
// Basic count
const count = await Notification.getUnreadCount(userId);

// Smart count (based on last viewed time)
const count = await Notification.getSmartUnreadCount(userId);
```

### Mark All as Read
```javascript
await Notification.markAllAsRead(userId);
```

**Behavior:**
1. Marks all personal notifications as read
2. Updates UserNotificationView.lastViewedAt to current time + 2 seconds
3. Ensures future common notifications show as new

### Cleanup Expired
```javascript
const deletedCount = await Notification.cleanupExpired();
```

Automatically deletes notifications past their `expiresAt` date.

## API Endpoints

### Route: `/api/notifications` (`backend/routes/notificationRoutes.js`)

#### Get User Notifications
```
GET /api/notifications/user
Headers: Authorization: Bearer <token>
Query: ?page=1&limit=50

Response:
{
  success: true,
  data: {
    notifications: [...],
    unreadCount: 5,
    totalCount: 25
  }
}
```

#### Get Unread Count
```
GET /api/notifications/unread-count
Headers: Authorization: Bearer <token>

Response:
{
  success: true,
  data: {
    unreadCount: 5
  }
}
```

#### Mark as Read
```
PUT /api/notifications/:id/read
Headers: Authorization: Bearer <token>

Response:
{
  success: true,
  message: "Notification marked as read"
}
```

#### Mark All as Read
```
PUT /api/notifications/mark-all-read
Headers: Authorization: Bearer <token>

Response:
{
  success: true,
  message: "All notifications marked as read"
}
```

#### Create Notification (Admin only)
```
POST /api/notifications
Headers: Authorization: Bearer <token>
Body: {
  userId: "507f...",  // Optional for common
  title: "Title",
  message: "Message",
  type: "PERSONAL",
  category: "GENERAL",
  metadata: {}
}

Response:
{
  success: true,
  data: {
    notification: {...}
  }
}
```

## WebSocket Integration

### Architecture
**Location:** `backend/services/wtfWebSocket.js` (shared for all notifications)

### Message Types
```javascript
// Personal notification
{
  type: "notification",
  data: {
    notification: {...},
    timestamp: "2024-12-07T10:00:00Z"
  }
}

// Unread count update
{
  type: "unread_count_update",
  data: {
    unreadCount: 5
  }
}
```

### Client Subscription
```javascript
// Frontend: Connect to WebSocket
const ws = new WebSocket(`ws://localhost:5001?token=${authToken}`);

// Subscribe to notifications
ws.send(JSON.stringify({
  type: "subscribe",
  data: { room: "notifications" }
}));

// Listen for notifications
ws.onmessage = (event) => {
  const message = JSON.parse(event.data);

  if (message.type === "notification") {
    showNotification(message.data.notification);
    updateUnreadCount();
  }
};
```

### Server Broadcasting
```javascript
// backend/services/notification.js
const wtfWebSocketService = require('./wtfWebSocket');

async function sendNotificationToUser(userId, notification) {
  // 1. Create notification in DB
  const savedNotification = await Notification.createPersonal(...);

  // 2. Send via WebSocket if user online
  wtfWebSocketService.sendToUser(userId, {
    type: "notification",
    data: {
      notification: savedNotification,
      timestamp: new Date().toISOString()
    }
  });

  return savedNotification;
}
```

## Sprint 5 Integration: Shop Notifications

### 1. Shop-Specific Categories
Already defined in category enum:
- `ISF_SHOP_UPDATE` - Shop updates, new items
- `COINS_AWARDED` - Can be used for purchase confirmations

### 2. Purchase Confirmation Notification
```javascript
// backend/services/shop.js
async function sendPurchaseConfirmation(userId, order) {
  await Notification.createPersonal(
    userId,
    "Purchase Successful!",
    `Your order #${order.orderNumber} has been confirmed. ${order.items.length} items purchased.`,
    "ISF_SHOP_UPDATE",
    {
      coinAmount: -order.totalCost,  // Negative for spending
      coinSource: "shop",
      relatedEntityId: order._id,
      relatedEntityType: "Order",
      actionUrl: `/shop/orders/${order._id}`
    }
  );
}
```

### 3. Low Balance Warning
```javascript
async function checkAndNotifyLowBalance(userId, currentBalance) {
  if (currentBalance < 50) {  // Threshold
    await Notification.createPersonal(
      userId,
      "Low Coin Balance",
      `Your coin balance is ${currentBalance}. Earn more coins by contributing to WTF!`,
      "COINS_AWARDED",
      {
        coinAmount: currentBalance,
        actionUrl: "/wtf",
        priority: "MEDIUM"
      }
    );
  }
}
```

### 4. New Shop Item Announcements
```javascript
async function announceNewShopItems(newItems) {
  await Notification.createCommon(
    "New Items in Shop!",
    `${newItems.length} new items added: ${newItems.map(i => i.name).join(', ')}`,
    "ISF_SHOP_UPDATE",
    ["student"],  // Target students only
    {
      actionUrl: "/shop",
      newItemCount: newItems.length,
      priority: "LOW"
    }
  );
}
```

### 5. Order Status Updates
```javascript
async function notifyOrderStatusChange(userId, orderId, oldStatus, newStatus) {
  const statusMessages = {
    confirmed: "Your order has been confirmed",
    processing: "Your order is being processed",
    ready: "Your order is ready for pickup!",
    completed: "Your order has been completed",
    cancelled: "Your order has been cancelled"
  };

  await Notification.createPersonal(
    userId,
    `Order ${newStatus}`,
    statusMessages[newStatus],
    "ISF_SHOP_UPDATE",
    {
      relatedEntityId: orderId,
      relatedEntityType: "Order",
      actionUrl: `/shop/orders/${orderId}`,
      priority: newStatus === "ready" ? "HIGH" : "MEDIUM"
    }
  );
}
```

### 6. Flash Sale Notifications
```javascript
async function announceFlashSale(saleDetails) {
  await Notification.createCommon(
    "Flash Sale! 🔥",
    `Limited time offer: ${saleDetails.discount}% off on ${saleDetails.category}`,
    "ISF_SHOP_UPDATE",
    ["student", "coach"],
    {
      actionUrl: "/shop/sales",
      discount: saleDetails.discount,
      category: saleDetails.category,
      expiresAt: saleDetails.endTime,
      priority: "URGENT"
    }
  );
}
```

## Frontend Integration Pattern

### Notification Bell Component (To Implement)
```javascript
// frontend/src/components/NotificationBell.js
import { useState, useEffect } from 'react';

function NotificationBell() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    // Fetch initial notifications
    fetchNotifications();

    // Connect WebSocket
    const token = localStorage.getItem('token');
    const websocket = new WebSocket(`ws://localhost:5001?token=${token}`);

    websocket.onopen = () => {
      websocket.send(JSON.stringify({
        type: "subscribe",
        data: { room: "notifications" }
      }));
    };

    websocket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === "notification") {
        setNotifications(prev => [message.data.notification, ...prev]);
        setUnreadCount(prev => prev + 1);

        // Show toast
        showToast(message.data.notification);
      }
    };

    setWs(websocket);

    return () => websocket.close();
  }, []);

  const fetchNotifications = async () => {
    const response = await fetch('/api/notifications/user', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    const { data } = await response.json();
    setNotifications(data.notifications);
    setUnreadCount(data.unreadCount);
  };

  const markAllAsRead = async () => {
    await fetch('/api/notifications/mark-all-read', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    setUnreadCount(0);
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  return (
    <div className="notification-bell">
      <button onClick={() => setShowDropdown(!showDropdown)}>
        🔔
        {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
      </button>

      {showDropdown && (
        <div className="notification-dropdown">
          <div className="header">
            <h3>Notifications</h3>
            <button onClick={markAllAsRead}>Mark all read</button>
          </div>

          <div className="notification-list">
            {notifications.map(notification => (
              <NotificationItem
                key={notification._id}
                notification={notification}
                onClick={() => handleNotificationClick(notification)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

### Shop-Specific Integration
```javascript
// In Shop component
useEffect(() => {
  // Subscribe to shop-specific notifications
  const handleShopNotification = (notification) => {
    if (notification.category === "ISF_SHOP_UPDATE") {
      // Update shop UI
      if (notification.metadata.newItemCount) {
        fetchNewItems();
      }

      // Show in-app notification
      showNotification(notification);
    }
  };

  notificationService.subscribe(handleShopNotification);

  return () => notificationService.unsubscribe(handleShopNotification);
}, []);
```

## Notification Service Helper (To Create)

### Centralized Notification Logic
```javascript
// backend/services/notification.js
const Notification = require('../models/notification');
const wtfWebSocketService = require('./wtfWebSocket');

class NotificationService {
  // Send personal notification with WebSocket
  async sendPersonal(userId, title, message, category, metadata = {}) {
    const notification = await Notification.createPersonal(
      userId, title, message, category, metadata
    );

    // Send via WebSocket
    wtfWebSocketService.sendToUser(userId, {
      type: "notification",
      data: { notification }
    });

    return notification;
  }

  // Broadcast common notification
  async sendCommon(title, message, category, targetAudience = null, metadata = {}) {
    const notification = await Notification.createCommon(
      title, message, category, targetAudience, metadata
    );

    // Broadcast to all
    wtfWebSocketService.broadcastToRoom("notifications", {
      type: "notification",
      data: { notification }
    });

    return notification;
  }

  // Shop-specific helpers
  async notifyPurchaseSuccess(userId, order) {
    return this.sendPersonal(
      userId,
      "Purchase Successful!",
      `Order #${order.orderNumber} confirmed`,
      "ISF_SHOP_UPDATE",
      {
        relatedEntityId: order._id,
        relatedEntityType: "Order",
        actionUrl: `/shop/orders/${order._id}`
      }
    );
  }

  async notifyLowBalance(userId, balance) {
    if (balance < 50) {
      return this.sendPersonal(
        userId,
        "Low Coin Balance",
        `Your balance is ${balance} coins`,
        "COINS_AWARDED",
        { coinAmount: balance, actionUrl: "/wtf" }
      );
    }
  }

  async announceNewShopItems(itemCount) {
    return this.sendCommon(
      "New Shop Items!",
      `${itemCount} new items available`,
      "ISF_SHOP_UPDATE",
      ["student"],
      { actionUrl: "/shop", priority: "LOW" }
    );
  }
}

module.exports = new NotificationService();
```

## Current Limitations & Technical Debt

### Issues
1. **No Notification Preferences:** Users cannot customize notification types
2. **No Digest Emails:** Only real-time notifications
3. **Limited Prioritization:** Priority field not used in UI
4. **No Read Receipts:** Can't track if notification was actually seen
5. **No Grouping:** Multiple similar notifications not grouped

### Recommendations for Sprint 5
1. **Add Notification Preferences Model:** Let users mute categories
2. **Implement Notification Grouping:** Group similar notifications
3. **Add Click Tracking:** Track which notifications lead to actions
4. **Implement Push Notifications:** For important shop updates
5. **Add Notification Templates:** Standardize notification formats

## Testing Scenarios

### Sprint 5 Notification Tests
1. Purchase confirmation arrives immediately
2. Low balance warning at threshold
3. New shop item announcement to all students
4. Order status change notification
5. Flash sale notification with expiration
6. Notification click navigates to correct page
7. Unread count updates in real-time
8. Mark all as read clears unread count

## Summary

Notification system is **ready for Sprint 5 shop integration** with:
- ✅ Personal and common notification types
- ✅ WebSocket real-time delivery
- ✅ ISF_SHOP_UPDATE category already defined
- ✅ Metadata support for rich notifications
- ✅ Smart unread counting
- ⚠️ No user preferences
- ⚠️ No notification grouping
- ⚠️ Frontend notification UI needs implementation

**Sprint 5 Strategy:** Use existing notification infrastructure, create shop-specific notification helper methods, implement frontend notification bell component.
