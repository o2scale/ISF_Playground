import React from 'react';
import { render, screen, within, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import ShopInventoryView, {
  getCompletedTasksCount
} from '../../../components/purchaseManagement/views/ShopInventoryView';
import {
  getAllPurchaseRequests,
  getMyPurchaseRequests,
  getUserBalagruhas,
  updatePurchaseRequestStatus
} from '../../../api';

jest.mock('jspdf', () => {
  return jest.fn().mockImplementation(() => ({
    setFontSize: jest.fn(),
    setFont: jest.fn(),
    text: jest.fn(),
    save: jest.fn()
  }));
});
jest.mock('jspdf-autotable', () => jest.fn());

jest.mock('../../../api', () => ({
  getAllPurchaseRequests: jest.fn(),
  getMyPurchaseRequests: jest.fn(),
  cancelPurchaseRequest: jest.fn(),
  updatePurchaseRequestStatus: jest.fn(),
  getUserBalagruhas: jest.fn()
}));

jest.mock('../../../utils/toast', () => jest.fn());

describe('ShopInventoryView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getUserBalagruhas.mockResolvedValue({ success: true, data: [] });
  });

  it('sorts High Priority requests above Normal and shows a visual marker', async () => {
    getAllPurchaseRequests.mockResolvedValue({
      success: true,
      data: {
        requests: [
          {
            _id: 'normal1',
            requestId: 'PR-NORMAL',
            status: 'pending',
            reason: 'Normal request',
            justification: 'Requested via Shop Catalog. Priority: Normal',
            items: [],
            totalEstimatedCost: 0,
            createdAt: '2025-12-24T10:00:00.000Z'
          },
          {
            _id: 'high1',
            requestId: 'PR-HIGH',
            status: 'pending',
            reason: '[HIGH PRIORITY] Needs restock now',
            justification: 'Requested via Shop Catalog. Priority: High',
            items: [],
            totalEstimatedCost: 0,
            createdAt: '2025-12-24T09:00:00.000Z'
          }
        ]
      }
    });

    render(
      <ShopInventoryView
        userRole="purchase-manager"
        userId="pm-1"
        userBalagruhas={[]}
      />
    );

    // Wait for data to render
    await screen.findByText('PR-HIGH');
    await screen.findByText('PR-NORMAL');

    const table = screen.getByRole('table');
    const rows = within(table).getAllByRole('row');

    // First row is the header; first data row should be the High Priority request
    expect(within(rows[1]).getByText('PR-HIGH')).toBeInTheDocument();

    const highRow = screen.getByText('PR-HIGH').closest('tr');
    expect(highRow).toHaveClass('priority-high');
    expect(within(highRow).getByLabelText('High Priority')).toBeInTheDocument();
  });

  it('defaults Purchase Manager status filter to Active (Pending + Ordered) but still allows full lifecycle filtering', async () => {
    getAllPurchaseRequests.mockResolvedValue({
      success: true,
      data: {
        requests: [
          {
            _id: 'pending1',
            requestId: 'PR-PENDING',
            status: 'pending',
            reason: 'Pending',
            items: [],
            totalEstimatedCost: 0,
            createdAt: '2025-12-24T10:00:00.000Z'
          },
          {
            _id: 'ordered1',
            requestId: 'PR-ORDERED',
            status: 'ordered',
            reason: 'Ordered',
            items: [],
            totalEstimatedCost: 0,
            createdAt: '2025-12-24T09:00:00.000Z'
          },
          {
            _id: 'delivered1',
            requestId: 'PR-DELIVERED',
            status: 'delivered_store',
            reason: 'Delivered',
            items: [],
            totalEstimatedCost: 0,
            createdAt: '2025-12-24T08:00:00.000Z'
          }
        ]
      }
    });

    render(
      <ShopInventoryView
        userRole="purchase-manager"
        userId="pm-1"
        userBalagruhas={[]}
      />
    );

    await screen.findByText('PR-PENDING');
    await screen.findByText('PR-ORDERED');

    // Default should be Active (pending + ordered)
    expect(screen.getByDisplayValue('Active (Pending + Ordered)')).toBeInTheDocument();
    expect(screen.queryByText('PR-DELIVERED')).not.toBeInTheDocument();

    // Still allow selecting full-lifecycle statuses
    fireEvent.change(screen.getByDisplayValue('Active (Pending + Ordered)'), {
      target: { value: 'delivered_store' }
    });

    await screen.findByText('PR-DELIVERED');
  });

  it('allows Purchase Manager to mark pending -> ordered from list actions', async () => {
    const requestId = 'pending1';

    getAllPurchaseRequests
      .mockResolvedValueOnce({
        success: true,
        data: {
          requests: [
            {
              _id: requestId,
              requestId: 'PR-PENDING',
              status: 'pending',
              reason: 'Pending',
              items: [],
              totalEstimatedCost: 0,
              createdAt: '2025-12-24T10:00:00.000Z'
            }
          ]
        }
      })
      .mockResolvedValueOnce({
        success: true,
        data: {
          requests: [
            {
              _id: requestId,
              requestId: 'PR-PENDING',
              status: 'ordered',
              reason: 'Pending',
              items: [],
              totalEstimatedCost: 0,
              createdAt: '2025-12-24T10:00:00.000Z'
            }
          ]
        }
      });

    let resolveUpdate;
    updatePurchaseRequestStatus.mockImplementation(
      () => new Promise((resolve) => {
        resolveUpdate = resolve;
      })
    );

    render(
      <ShopInventoryView
        userRole="purchase-manager"
        userId="pm-1"
        userBalagruhas={[]}
      />
    );

    await screen.findByText('PR-PENDING');

    const markOrderedButton = screen.getByRole('button', { name: /mark ordered/i });
    fireEvent.click(markOrderedButton);

    expect(updatePurchaseRequestStatus).toHaveBeenCalledWith(requestId, {
      status: 'ordered',
      notes: 'Marked Ordered via Purchase Management'
    });
    expect(markOrderedButton).toBeDisabled();

    resolveUpdate({ success: true });
    await screen.findByRole('button', { name: /mark received at store/i });
  });

  it('allows Purchase Manager to mark ordered -> delivered_store from list actions', async () => {
    const requestId = 'ordered1';

    getAllPurchaseRequests
      .mockResolvedValueOnce({
        success: true,
        data: {
          requests: [
            {
              _id: requestId,
              requestId: 'PR-ORDERED',
              status: 'ordered',
              reason: 'Ordered',
              items: [],
              totalEstimatedCost: 0,
              createdAt: '2025-12-24T10:00:00.000Z'
            }
          ]
        }
      })
      .mockResolvedValueOnce({
        success: true,
        data: {
          requests: [
            {
              _id: requestId,
              requestId: 'PR-ORDERED',
              status: 'delivered_store',
              reason: 'Ordered',
              items: [],
              totalEstimatedCost: 0,
              createdAt: '2025-12-24T10:00:00.000Z'
            }
          ]
        }
      });

    let resolveUpdate;
    updatePurchaseRequestStatus.mockImplementation(
      () => new Promise((resolve) => {
        resolveUpdate = resolve;
      })
    );

    render(
      <ShopInventoryView
        userRole="purchase-manager"
        userId="pm-1"
        userBalagruhas={[]}
      />
    );

    await screen.findByText('PR-ORDERED');

    const markReceivedButton = screen.getByRole('button', { name: /mark received at store/i });
    fireEvent.click(markReceivedButton);

    expect(updatePurchaseRequestStatus).toHaveBeenCalledWith(requestId, {
      status: 'delivered_store',
      notes: 'Marked Received at Store via Purchase Management'
    });
    expect(markReceivedButton).toBeDisabled();

    resolveUpdate({ success: true });

    // Default PM filter hides delivered_store; switch filter to verify post-transition state
    fireEvent.change(screen.getByDisplayValue('Active (Pending + Ordered)'), {
      target: { value: 'delivered_store' }
    });

    await screen.findByText('PR-ORDERED');

    await waitFor(() => {
      const row = screen.getByText('PR-ORDERED').closest('tr');
      expect(row).toHaveClass('status-delivered_store');
    });

    const row = screen.getByText('PR-ORDERED').closest('tr');
    expect(within(row).queryByRole('button', { name: /mark received at store/i })).not.toBeInTheDocument();
  });

  it('computes completed tasks count for a PM from statusHistory (delivered_store changedBy userId)', () => {
    const requests = [
      {
        _id: 'r1',
        statusHistory: [
          { status: 'pending', changedBy: 'other' },
          { status: 'delivered_store', changedBy: 'pm-1' }
        ]
      },
      {
        _id: 'r2',
        statusHistory: [
          { status: 'delivered_store', changedBy: { _id: 'pm-2' } }
        ]
      },
      {
        _id: 'r3',
        statusHistory: [
          { status: 'delivered_balagruha', changedBy: 'pm-1' }
        ]
      },
      {
        _id: 'r4'
      }
    ];

    expect(getCompletedTasksCount(requests, 'pm-1')).toBe(1);
  });
});
