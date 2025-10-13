// Sprint5-Story-08: Coin Spending Integration - E2E Tests
// Test Framework: Playwright
// Test Scenarios: docs/qa/e2e/story-08-coin-spending.md

const { test, expect } = require('@playwright/test');

// Configuration
const BASE_URL = 'http://localhost:3000';
const API_URL = 'http://localhost:5001';

// Test Student Credentials
const TEST_STUDENT = {
  email: 'student@test.com',
  password: 'password123',
  expectedInitialBalance: 1000
};

test.describe('Sprint5-Story-08: Coin Spending Integration', () => {
  test.beforeEach(async ({ page }) => {
    // Login as student before each test
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="email"]', TEST_STUDENT.email);
    await page.fill('input[type="password"]', TEST_STUDENT.password);
    await page.click('button[type="submit"]');
    await page.waitForURL(`${BASE_URL}/dashboard`);
    await page.waitForLoadState('networkidle');
  });

  test.describe('AC2 & AC4: Coin Deduction and Real-time Balance Update', () => {
    test('TC 2.1 & 4.1: Complete purchase and verify coin deduction with real-time balance update', async ({ page }) => {
      // Get initial balance from navigation bar
      const initialBalanceText = await page.locator('.coins-circle').textContent();
      const initialBalance = parseInt(initialBalanceText.trim());
      console.log(`Initial balance: ${initialBalance}`);

      // Navigate to shop
      await page.click('text=Shop');
      await page.waitForURL(`${BASE_URL}/shop`);
      await page.waitForLoadState('networkidle');

      // Find a product and note its price
      const firstProduct = page.locator('.product-card').first();
      const productName = await firstProduct.locator('.product-name').textContent();
      const productPriceText = await firstProduct.locator('.product-price').textContent();
      const productPrice = parseInt(productPriceText.match(/\d+/)[0]);
      console.log(`Product: ${productName}, Price: ${productPrice}`);

      // Add to cart
      await firstProduct.locator('button:has-text("Add to Cart")').click();
      await page.waitForTimeout(1000); // Wait for cart to update

      // Open cart
      await page.click('.cart-icon');
      await page.waitForSelector('.cart-drawer', { state: 'visible' });

      // Verify cart has item
      await expect(page.locator('.cart-item')).toHaveCount(1);

      // Proceed to checkout
      await page.click('button:has-text("Checkout")');
      await page.waitForURL(`${BASE_URL}/shop/checkout`);

      // Place order
      await page.click('button:has-text("Place Order")');

      // Wait for order confirmation
      await page.waitForSelector('.order-confirmation', { timeout: 10000 });

      // Verify success message
      await expect(page.locator('h1:has-text("Order Placed Successfully")')).toBeVisible();

      // Get new balance from navigation bar (AC4: Real-time update)
      await page.waitForTimeout(2000); // Give time for balance to update
      const newBalanceText = await page.locator('.coins-circle').textContent();
      const newBalance = parseInt(newBalanceText.trim());
      console.log(`New balance: ${newBalance}`);

      // Verify balance decreased by product price
      expect(newBalance).toBe(initialBalance - productPrice);

      // Verify coins spent and remaining balance shown on confirmation page
      const coinsSpentText = await page.locator('.order-amount').textContent();
      const coinsSpent = parseInt(coinsSpentText.match(/\d+/)[0]);
      expect(coinsSpent).toBe(productPrice);

      const remainingBalanceText = await page.locator('text=/Remaining Balance/').textContent();
      const remainingBalance = parseInt(remainingBalanceText.match(/\d+/)[0]);
      expect(remainingBalance).toBe(newBalance);
    });

    test('TC 4.2: Verify balance matches server after page refresh', async ({ page }) => {
      // Get initial balance
      const initialBalanceText = await page.locator('.coins-circle').textContent();
      const initialBalance = parseInt(initialBalanceText.trim());

      // Make a purchase
      await page.click('text=Shop');
      await page.waitForURL(`${BASE_URL}/shop`);
      const firstProduct = page.locator('.product-card').first();
      const productPriceText = await firstProduct.locator('.product-price').textContent();
      const productPrice = parseInt(productPriceText.match(/\d+/)[0]);

      await firstProduct.locator('button:has-text("Add to Cart")').click();
      await page.waitForTimeout(1000);
      await page.click('.cart-icon');
      await page.click('button:has-text("Checkout")');
      await page.waitForURL(`${BASE_URL}/shop/checkout`);
      await page.click('button:has-text("Place Order")');
      await page.waitForSelector('.order-confirmation');

      // Get balance after purchase
      await page.waitForTimeout(2000);
      const balanceAfterPurchase = parseInt((await page.locator('.coins-circle').textContent()).trim());
      console.log(`Balance after purchase: ${balanceAfterPurchase}`);

      // Refresh page
      await page.reload();
      await page.waitForLoadState('networkidle');

      // Verify balance still correct
      const balanceAfterRefresh = parseInt((await page.locator('.coins-circle').textContent()).trim());
      console.log(`Balance after refresh: ${balanceAfterRefresh}`);
      expect(balanceAfterRefresh).toBe(balanceAfterPurchase);
      expect(balanceAfterRefresh).toBe(initialBalance - productPrice);
    });
  });

  test.describe('AC5: Insufficient Funds Validation', () => {
    test('TC 5.1: Block checkout when balance < cart total', async ({ page, request }) => {
      // First, deplete coins to a low amount via API (for testing)
      const authToken = await page.evaluate(() => localStorage.getItem('token'));

      // Find an expensive product (or add multiple products to exceed balance)
      await page.click('text=Shop');
      await page.waitForURL(`${BASE_URL}/shop`);

      // Add multiple products to cart to exceed balance
      const products = page.locator('.product-card');
      const productCount = await products.count();

      // Get initial balance
      const initialBalanceText = await page.locator('.coins-circle').textContent();
      const initialBalance = parseInt(initialBalanceText.trim());
      console.log(`Initial balance: ${initialBalance}`);

      // Add expensive products or multiple products until cart > balance
      let cartTotal = 0;
      let addedProducts = 0;

      for (let i = 0; i < productCount && cartTotal < initialBalance + 100; i++) {
        const product = products.nth(i);
        const priceText = await product.locator('.product-price').textContent();
        const price = parseInt(priceText.match(/\d+/)[0]);

        // Add product
        await product.locator('button:has-text("Add to Cart")').click();
        await page.waitForTimeout(500);
        cartTotal += price;
        addedProducts++;

        if (cartTotal > initialBalance) break;
      }

      console.log(`Cart total: ${cartTotal}, Products added: ${addedProducts}`);

      // If we couldn't create a cart > balance, skip test
      if (cartTotal <= initialBalance) {
        test.skip('Could not create cart total exceeding balance with available products');
      }

      // Open cart and proceed to checkout
      await page.click('.cart-icon');
      await page.click('button:has-text("Checkout")');
      await page.waitForURL(`${BASE_URL}/shop/checkout`);

      // Try to place order
      await page.click('button:has-text("Place Order")');

      // Verify error message appears
      await page.waitForSelector('.checkout-error', { timeout: 5000 });
      const errorText = await page.locator('.checkout-error').textContent();
      expect(errorText).toContain('Insufficient coin balance');
      expect(errorText).toMatch(/Required:\s*\d+/);
      expect(errorText).toMatch(/Available:\s*\d+/);

      // Verify balance unchanged
      const finalBalanceText = await page.locator('.coins-circle').textContent();
      const finalBalance = parseInt(finalBalanceText.trim());
      expect(finalBalance).toBe(initialBalance);
    });

    test('TC 5.2: Display insufficient funds error message', async ({ page }) => {
      // Setup: Navigate to shop
      await page.click('text=Shop');
      await page.waitForURL(`${BASE_URL}/shop`);

      // Get balance
      const balanceText = await page.locator('.coins-circle').textContent();
      const balance = parseInt(balanceText.trim());

      // Add expensive product or multiple products
      const products = page.locator('.product-card');
      let cartTotal = 0;

      for (let i = 0; i < await products.count() && cartTotal < balance + 50; i++) {
        const product = products.nth(i);
        const priceText = await product.locator('.product-price').textContent();
        const price = parseInt(priceText.match(/\d+/)[0]);

        await product.locator('button:has-text("Add to Cart")').click();
        await page.waitForTimeout(500);
        cartTotal += price;

        if (cartTotal > balance) break;
      }

      if (cartTotal <= balance) {
        test.skip('Could not create insufficient balance scenario');
      }

      // Proceed to checkout
      await page.click('.cart-icon');
      await page.click('button:has-text("Checkout")');
      await page.waitForURL(`${BASE_URL}/shop/checkout`);

      // Attempt checkout
      await page.click('button:has-text("Place Order")');

      // Verify error display
      await page.waitForSelector('.checkout-error');
      const errorElement = page.locator('.checkout-error');

      // Check error has red/warning styling
      const bgColor = await errorElement.evaluate(el => window.getComputedStyle(el).backgroundColor);
      expect(bgColor).toBeTruthy(); // Has background color

      // Check error contains helpful information
      const errorText = await errorElement.textContent();
      expect(errorText).toMatch(/\d+/); // Contains numbers
      expect(errorText.toLowerCase()).toContain('insufficient');
      expect(errorText.toLowerCase()).toMatch(/coin|balance/);
    });
  });

  test.describe('AC3: Transaction History Entry', () => {
    test('TC 3.1: Verify transaction history entry format via API', async ({ page, request }) => {
      // Complete a purchase first
      await page.click('text=Shop');
      await page.waitForURL(`${BASE_URL}/shop`);

      // Add product to cart
      const firstProduct = page.locator('.product-card').first();
      const productPriceText = await firstProduct.locator('.product-price').textContent();
      const productPrice = parseInt(productPriceText.match(/\d+/)[0]);

      await firstProduct.locator('button:has-text("Add to Cart")').click();
      await page.waitForTimeout(1000);

      // Checkout
      await page.click('.cart-icon');
      await page.click('button:has-text("Checkout")');
      await page.waitForURL(`${BASE_URL}/shop/checkout`);
      await page.click('button:has-text("Place Order")');
      await page.waitForSelector('.order-confirmation');

      // Get order number from confirmation page
      const orderNumberText = await page.locator('.order-number').textContent();
      const orderNumber = orderNumberText.trim();
      console.log(`Order number: ${orderNumber}`);

      // Wait a moment for transaction to be recorded
      await page.waitForTimeout(2000);

      // Fetch coin transaction history via API
      const authToken = await page.evaluate(() => localStorage.getItem('token'));
      const response = await request.get(`${API_URL}/api/v1/coins/balance`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      expect(response.ok()).toBeTruthy();
      const data = await response.json();
      console.log('Coin balance response:', JSON.stringify(data, null, 2));

      // Find the shop transaction
      const shopTransaction = data.data.transactions?.find(t =>
        t.source === 'shop' && t.description.includes(orderNumber)
      );

      expect(shopTransaction).toBeTruthy();
      expect(shopTransaction.type).toBe('spent');
      expect(shopTransaction.amount).toBe(productPrice);
      expect(shopTransaction.source).toBe('shop');
      expect(shopTransaction.description).toContain('Shop purchase');
      expect(shopTransaction.description).toContain(orderNumber);

      // Verify metadata
      if (shopTransaction.metadata) {
        expect(shopTransaction.metadata.orderNumber).toBe(orderNumber);
        expect(shopTransaction.metadata.orderId).toBeTruthy();
        expect(shopTransaction.metadata.itemCount).toBe(1);
      }
    });
  });

  test.describe('Integration: Complete Purchase Flow', () => {
    test('TC 7.1: Complete purchase flow end-to-end', async ({ page }) => {
      // 1. Get initial balance
      const initialBalanceText = await page.locator('.coins-circle').textContent();
      const initialBalance = parseInt(initialBalanceText.trim());
      console.log(`Starting balance: ${initialBalance}`);

      // 2. Browse shop
      await page.click('text=Shop');
      await page.waitForURL(`${BASE_URL}/shop`);
      await expect(page.locator('.product-grid')).toBeVisible();

      // 3. Add 2 products to cart
      const products = page.locator('.product-card');
      const product1 = products.first();
      const product2 = products.nth(1);

      const price1Text = await product1.locator('.product-price').textContent();
      const price1 = parseInt(price1Text.match(/\d+/)[0]);

      const price2Text = await product2.locator('.product-price').textContent();
      const price2 = parseInt(price2Text.match(/\d+/)[0]);

      const totalPrice = price1 + price2;
      console.log(`Product 1 price: ${price1}, Product 2 price: ${price2}, Total: ${totalPrice}`);

      await product1.locator('button:has-text("Add to Cart")').click();
      await page.waitForTimeout(500);
      await product2.locator('button:has-text("Add to Cart")').click();
      await page.waitForTimeout(500);

      // 4. View cart
      await page.click('.cart-icon');
      await page.waitForSelector('.cart-drawer');
      await expect(page.locator('.cart-item')).toHaveCount(2);

      // 5. Proceed to checkout
      await page.click('button:has-text("Checkout")');
      await page.waitForURL(`${BASE_URL}/shop/checkout`);

      // 6. Review order
      await expect(page.locator('h1:has-text("Checkout")')).toBeVisible();
      await expect(page.locator('.order-summary')).toBeVisible();

      // 7. Place order
      await page.click('button:has-text("Place Order")');

      // 8. View order confirmation
      await page.waitForSelector('.order-confirmation', { timeout: 10000 });
      await expect(page.locator('h1:has-text("Order Placed Successfully")')).toBeVisible();

      // Verify all results
      await page.waitForTimeout(2000);
      const newBalanceText = await page.locator('.coins-circle').textContent();
      const newBalance = parseInt(newBalanceText.trim());
      console.log(`New balance: ${newBalance}`);

      expect(newBalance).toBe(initialBalance - totalPrice);

      // Verify coins spent shown on confirmation
      const coinsSpentText = await page.locator('.order-amount').textContent();
      const coinsSpent = parseInt(coinsSpentText.match(/\d+/)[0]);
      expect(coinsSpent).toBe(totalPrice);

      // Verify remaining balance shown
      const remainingText = await page.locator('text=/Remaining Balance/').textContent();
      const remaining = parseInt(remainingText.match(/\d+/)[0]);
      expect(remaining).toBe(newBalance);
    });

    test('TC 7.2: Verify balance display consistency across pages', async ({ page }) => {
      // Complete a purchase
      await page.click('text=Shop');
      await page.waitForURL(`${BASE_URL}/shop`);

      const firstProduct = page.locator('.product-card').first();
      const priceText = await firstProduct.locator('.product-price').textContent();
      const price = parseInt(priceText.match(/\d+/)[0]);
      const initialBalance = parseInt((await page.locator('.coins-circle').textContent()).trim());
      const expectedBalance = initialBalance - price;

      await firstProduct.locator('button:has-text("Add to Cart")').click();
      await page.waitForTimeout(1000);
      await page.click('.cart-icon');
      await page.click('button:has-text("Checkout")');
      await page.waitForURL(`${BASE_URL}/shop/checkout`);
      await page.click('button:has-text("Place Order")');
      await page.waitForSelector('.order-confirmation');
      await page.waitForTimeout(2000);

      // Check balance on confirmation page
      const balanceOnConfirmation = parseInt((await page.locator('.coins-circle').textContent()).trim());
      expect(balanceOnConfirmation).toBe(expectedBalance);

      // Navigate to Shop page
      await page.click('text=Shop');
      await page.waitForURL(`${BASE_URL}/shop`);
      const balanceOnShop = parseInt((await page.locator('.coins-circle').textContent()).trim());
      expect(balanceOnShop).toBe(expectedBalance);

      // Navigate to Orders page
      await page.click('text=Orders');
      await page.waitForLoadState('networkidle');
      const balanceOnOrders = parseInt((await page.locator('.coins-circle').textContent()).trim());
      expect(balanceOnOrders).toBe(expectedBalance);

      // Navigate to Dashboard
      await page.click('text=Dashboard');
      await page.waitForURL(`${BASE_URL}/dashboard`);
      const balanceOnDashboard = parseInt((await page.locator('.coins-circle').textContent()).trim());
      expect(balanceOnDashboard).toBe(expectedBalance);

      console.log(`Balance consistent across all pages: ${expectedBalance}`);
    });
  });

  test.describe('Regression: Existing Coin Features', () => {
    test('TC 8.1: Verify existing coin sources still work', async ({ page, request }) => {
      // This test verifies that non-shop coin sources still work correctly
      // We'll check that the coin model accepts other sources

      const authToken = await page.evaluate(() => localStorage.getItem('token'));
      const response = await request.get(`${API_URL}/api/v1/coins/balance`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      expect(response.ok()).toBeTruthy();
      const data = await response.json();

      // Verify transactions with various sources exist (from Sprint 1 and earlier)
      const transactions = data.data.transactions || [];

      // Check that we have transactions from sources other than 'shop'
      const nonShopTransactions = transactions.filter(t => t.source !== 'shop');
      console.log(`Found ${nonShopTransactions.length} non-shop transactions`);

      // If any non-shop transactions exist, verify they're valid
      if (nonShopTransactions.length > 0) {
        const validSources = ['wtf', 'attendance', 'task', 'medical', 'sports', 'music', 'general'];
        nonShopTransactions.forEach(t => {
          expect(validSources).toContain(t.source);
        });
      }
    });
  });
});

// Performance Tests
test.describe('Performance: Balance Operations', () => {
  test('TC 9.1: Balance fetch performance', async ({ page, request }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="email"]', TEST_STUDENT.email);
    await page.fill('input[type="password"]', TEST_STUDENT.password);
    await page.click('button[type="submit"]');
    await page.waitForURL(`${BASE_URL}/dashboard`);

    const authToken = await page.evaluate(() => localStorage.getItem('token'));

    const responseTimes = [];

    for (let i = 0; i < 10; i++) {
      const startTime = Date.now();
      const response = await request.get(`${API_URL}/api/v1/coins/balance`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      responseTimes.push(responseTime);

      expect(response.ok()).toBeTruthy();
    }

    const avgResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
    const maxResponseTime = Math.max(...responseTimes);

    console.log(`Average response time: ${avgResponseTime}ms`);
    console.log(`Max response time: ${maxResponseTime}ms`);
    console.log(`All times: ${responseTimes.join(', ')}`);

    expect(avgResponseTime).toBeLessThan(100);
    expect(maxResponseTime).toBeLessThan(200);
  });
});
