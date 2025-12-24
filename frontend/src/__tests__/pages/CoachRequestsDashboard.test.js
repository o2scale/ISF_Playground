import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';

import CoachRequestsDashboard from '../../pages/CoachRequestsDashboard';
import { getCoachDeliveries, getMyPurchaseRequests } from '../../api';

jest.mock('../../components/shop/ShopNavigation', () => () => <div data-testid="shop-nav" />);
jest.mock('../../components/shop/Breadcrumbs', () => () => <div data-testid="breadcrumbs" />);

jest.mock('../../api', () => ({
  getCoachDeliveries: jest.fn(),
  getMyPurchaseRequests: jest.fn()
}));

describe('CoachRequestsDashboard (Story 3.2)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders both sections and calls both APIs', async () => {
    getMyPurchaseRequests.mockResolvedValue({
      success: true,
      data: {
        requests: [
          {
            _id: 'r1',
            requestId: 'PR-1',
            status: 'pending',
            balagruhaId: 'STOCK',
            items: [{ productName: 'Item', requestedQuantity: 1 }],
            createdAt: '2025-12-24T10:00:00.000Z'
          }
        ]
      }
    });

    getCoachDeliveries.mockResolvedValue({
      success: true,
      orders: [
        {
          _id: 'o1',
          orderNumber: 'ORD-1',
          deliveryStatus: 'pending_delivery',
          placedAt: '2025-12-24T10:00:00.000Z',
          userId: { name: 'Student 1' },
          balagruhaNames: 'BG-1'
        }
      ]
    });

    render(<CoachRequestsDashboard />);

    expect(screen.getByText('My Purchase Requests')).toBeInTheDocument();
    expect(screen.getByText('Digital Orders')).toBeInTheDocument();

    await waitFor(() => expect(getMyPurchaseRequests).toHaveBeenCalled());
    await waitFor(() =>
      expect(getCoachDeliveries).toHaveBeenCalledWith({ status: 'pending_delivery', limit: 50 })
    );

    expect(await screen.findByText('PR-1')).toBeInTheDocument();
    expect(await screen.findByText('ORD-1')).toBeInTheDocument();
  });

  it('filters Digital Orders by “Pending Delivery” via API status param', async () => {
    getMyPurchaseRequests.mockResolvedValue({ success: true, data: { requests: [] } });

    const pendingOrders = [
      {
        _id: 'o1',
        orderNumber: 'ORD-PENDING',
        deliveryStatus: 'pending_delivery',
        placedAt: '2025-12-24T10:00:00.000Z',
        userId: { name: 'Student 1' },
        balagruhaNames: 'BG-1'
      }
    ];
    const deliveredOrders = [
      {
        _id: 'o2',
        orderNumber: 'ORD-DELIVERED',
        deliveryStatus: 'delivered',
        placedAt: '2025-12-24T10:00:00.000Z',
        userId: { name: 'Student 2' },
        balagruhaNames: 'BG-1'
      }
    ];

    getCoachDeliveries.mockImplementation(({ status }) => {
      if (status === 'pending_delivery') {
        return Promise.resolve({ success: true, orders: pendingOrders });
      }
      if (status === 'delivered_today') {
        return Promise.resolve({ success: true, orders: deliveredOrders });
      }
      return Promise.resolve({ success: true, orders: [] });
    });

    render(<CoachRequestsDashboard />);

    await waitFor(() =>
      expect(getCoachDeliveries).toHaveBeenCalledWith({ status: 'pending_delivery', limit: 50 })
    );
    expect(await screen.findByText('ORD-PENDING')).toBeInTheDocument();

    const digitalOrdersSection = screen.getByText('Digital Orders').closest('section');
    const statusSelect = within(digitalOrdersSection).getByRole('combobox');

    fireEvent.change(statusSelect, { target: { value: 'delivered_today' } });

    await waitFor(() =>
      expect(getCoachDeliveries).toHaveBeenCalledWith({ status: 'delivered_today', limit: 50 })
    );

    expect(await screen.findByText('ORD-DELIVERED')).toBeInTheDocument();
    expect(screen.queryByText('ORD-PENDING')).not.toBeInTheDocument();

    fireEvent.change(statusSelect, { target: { value: 'pending_delivery' } });

    await waitFor(() =>
      expect(getCoachDeliveries).toHaveBeenCalledWith({ status: 'pending_delivery', limit: 50 })
    );
    expect(await screen.findByText('ORD-PENDING')).toBeInTheDocument();
  });
});
