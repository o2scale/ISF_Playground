import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NewItemForm from '../../../../components/admin/inventory/NewItemForm';
import { api } from '../../../../api';
import userEvent from '@testing-library/user-event';

jest.setTimeout(15000);

// Mock API and Components
jest.mock('../../../../api');
jest.mock('../../../../hooks/use-toast', () => ({
  toast: jest.fn(),
}));

// Mock ResizeObserver which is used by some Radix components
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserver;

// Mock Pointer Events for Radix UI in JSDOM
window.HTMLElement.prototype.hasPointerCapture = jest.fn();
window.HTMLElement.prototype.setPointerCapture = jest.fn();
window.HTMLElement.prototype.releasePointerCapture = jest.fn();
window.HTMLElement.prototype.scrollIntoView = jest.fn();

const renderComponent = () =>
  render(
    <BrowserRouter>
      <NewItemForm />
    </BrowserRouter>
  );

describe('NewItemForm - Story 1.3', () => {
  // const user = userEvent.setup(); // Removed for v13 compatibility

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock Vendors API response
    api.get.mockResolvedValue({
      data: {
        success: true,
        vendors: [
          { _id: 'v1', name: 'Vendor One' },
          { _id: 'v2', name: 'Vendor Two' },
          { _id: 'v3', name: 'Vendor Three' },
        ],
      },
    });

    api.post.mockImplementation((url) => {
      if (url === '/api/v2/upload/image') {
        return Promise.resolve({ data: { success: true, url: 'http://img.url/test.png' } });
      }
      if (url === '/api/v2/shop/admin/products') {
        return Promise.resolve({ data: { success: true } });
      }
      return Promise.reject(new Error('Not Found'));
    });
  });

  test('AC1: Renders all required fields matching design', async () => {
    renderComponent();

    expect(screen.getByLabelText(/Item Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Max Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Selling Price/i)).toBeInTheDocument();
    
    // Check Vendor Slots
    expect(screen.getByText(/Rank 1 Vendor/i)).toBeInTheDocument();
    expect(screen.getByText(/Rank 2 Vendor/i)).toBeInTheDocument();
    expect(screen.getByText(/Rank 3 Vendor/i)).toBeInTheDocument();

    await waitFor(() => expect(api.get).toHaveBeenCalledWith(expect.stringContaining('/api/v2/vendors')));
  });

  test('AC2: Submit button disabled until vendor and maxPrice set', async () => {
    renderComponent();
    
    const submitBtn = screen.getByRole('button', { name: /Create Master Item/i });
    expect(submitBtn).toBeDisabled();

    // Fill Basic Info
    userEvent.type(screen.getByLabelText(/Item Name/i), 'Test Item');
    userEvent.type(screen.getByLabelText(/Max Price/i), '100');
    
    // Still disabled because no vendor selected
    expect(submitBtn).toBeDisabled();
  });

  test('AC3: Calls API with correct payload on valid submission', async () => {
    renderComponent();
    await waitFor(() => expect(api.get).toHaveBeenCalled());

    // Fill Form
    userEvent.type(screen.getByLabelText(/Item Name/i), 'Test Product');
    userEvent.type(screen.getByLabelText(/Description/i), 'A great test product');
    userEvent.type(screen.getByLabelText(/Max Price/i), '500');
    userEvent.type(screen.getByLabelText(/Selling Price/i), '50');
    userEvent.type(screen.getByLabelText(/Initial Stock/i), '10');

    // Select Category
    const triggers = screen.getAllByRole('combobox');
    const categoryTrigger = triggers[0];
    userEvent.click(categoryTrigger);
    
    // Use getAllByText because Radix might render hidden select options too
    const stationeryOptions = await screen.findAllByText('Stationery');
    // Click the last one which is usually the one in the portal/popover
    userEvent.click(stationeryOptions[stationeryOptions.length - 1]);

    // Select Vendor 1
    const vendor1Trigger = triggers[2]; // 3rd combobox
    userEvent.click(vendor1Trigger);
    
    const vendorOneOptions = await screen.findAllByText('Vendor One');
    userEvent.click(vendorOneOptions[vendorOneOptions.length - 1]);

    // Now submit should be enabled
    const submitBtn = screen.getByRole('button', { name: /Create Master Item/i });
    await waitFor(() => expect(submitBtn).not.toBeDisabled());

    userEvent.click(submitBtn);

    await waitFor(() => expect(api.post).toHaveBeenCalledWith(
      '/api/v2/shop/admin/products',
      expect.objectContaining({
        name: 'Test Product',
        description: 'A great test product',
        maxPrice: 500,
        price: 50,
        sellingPrice: 50,
        stock: 10,
        category: 'stationery',
        approvedVendors: [
          { vendorId: 'v1', rank: 1 }
        ]
      })
    ));
  });

  test('Prevents duplicate vendor selection', async () => {
    renderComponent();
    await waitFor(() => expect(api.get).toHaveBeenCalled());

    const triggers = screen.getAllByRole('combobox');
    const vendor1Trigger = triggers[2];
    const vendor2Trigger = triggers[3];

    // Select Vendor One in Slot 1
    userEvent.click(vendor1Trigger);
    const vendorOneOptions = await screen.findAllByText('Vendor One');
    userEvent.click(vendorOneOptions[vendorOneOptions.length - 1]);

    // Try Select Vendor One in Slot 2
    userEvent.click(vendor2Trigger);
    // When opening second dropdown, "Vendor One" text exists in the DOM from the first selection (the button text)
    // AND in the new dropdown list options.
    const vendorOneOptionsAgain = await screen.findAllByText('Vendor One');
    userEvent.click(vendorOneOptionsAgain[vendorOneOptionsAgain.length - 1]);

    // Expect toast warning (mocked)
    const { toast } = require('../../../../hooks/use-toast');
    expect(toast).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Duplicate Vendor',
      variant: 'destructive'
    }));
  });
});