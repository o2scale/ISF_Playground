import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Plus, RefreshCw, Search, Monitor, Pencil, PowerOff, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { api } from '../api';
import { getBalagruha } from '../api';
import { createMachine, updateMachine, deactivateMachine } from '../api/machines';
import { useAuth } from '../contexts/AuthContext';
import { useRBAC } from '../contexts/RBACContext';
import { UserTypes, normalizeUserRole } from '../constants/userTypes';
import MachineRegistrationModal from '../components/admin/MachineRegistrationModal';
import MachineEditModal from '../components/admin/MachineEditModal';
import DeactivateConfirmModal from '../components/admin/DeactivateConfirmModal';
import MachineLogsModal from '../components/admin/MachineLogsModal';

const STATUS_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'maintenance', label: 'Maintenance' },
];

export default function MachineManagement() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { hasPermission, isLoading: rbacLoading, permissions } = useRBAC();

  const normalizedRole = normalizeUserRole(user?.role);
  const isAdmin = normalizedRole === UserTypes.ADMIN;

  const permissionsLoaded = Object.keys(permissions || {}).length > 0;
  const canReadMachines =
    !rbacLoading && permissionsLoaded && hasPermission('Machine Management', 'Read');

  // Data state
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [balagruhaFilter, setBalagruhaFilter] = useState('all');

  // Balagruha options for dropdown
  const [balagruhaOptions, setBalagruhaOptions] = useState([]);

  // Registration modal state
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // Edit modal state
  const [editingMachine, setEditingMachine] = useState(null);

  // Deactivate confirmation modal state
  const [deactivatingMachine, setDeactivatingMachine] = useState(null);

  // Logs modal state
  const [viewingLogsMachine, setViewingLogsMachine] = useState(null);

  // SECURITY CHECK: Requires Machine Management Read permission
  useEffect(() => {
    if (rbacLoading) return;
    if (!permissionsLoaded) return;

    if (!canReadMachines) {
      navigate('/access-denied', { replace: true });
    }
  }, [canReadMachines, navigate, permissionsLoaded, rbacLoading]);

  // Fetch balagruha list for filter dropdown
  useEffect(() => {
    const fetchBalagruhaList = async () => {
      try {
        const result = await getBalagruha();
        if (result && result.success && result.data) {
          setBalagruhaOptions(result.data.balagruhas || []);
        }
      } catch (err) {
        console.error('Error fetching balagruha list:', err);
      }
    };

    if (canReadMachines) {
      fetchBalagruhaList();
    }
  }, [canReadMachines]);

  // Fetch machines from API
  const fetchMachines = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {};
      if (statusFilter !== 'all') {
        params.status = statusFilter;
      }
      if (balagruhaFilter !== 'all') {
        params.assignedBalagruha = balagruhaFilter;
      }
      if (searchTerm.trim()) {
        params.search = searchTerm.trim();
      }

      const response = await api.get('/api/v1/machines', { params });

      if (!response.data?.success) {
        throw new Error(response.data?.message || 'Failed to load machines');
      }

      setMachines(response.data.data?.machines || []);
    } catch (err) {
      console.error('Error fetching machines:', err);
      const message =
        err.response?.data?.message ||
        err.message ||
        'Failed to load machines';
      setError(message);
      toast.error(message);
      setMachines([]);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, balagruhaFilter, searchTerm]);

  // Debounced fetch on filter changes
  useEffect(() => {
    if (!canReadMachines) return;

    const debounceTimer = setTimeout(
      () => {
        fetchMachines();
      },
      searchTerm ? 300 : 0
    );

    return () => clearTimeout(debounceTimer);
  }, [canReadMachines, fetchMachines, searchTerm]);

  // Registration form handlers
  const openRegister = useCallback(() => {
    setIsRegisterOpen(true);
  }, []);

  const closeRegister = useCallback(() => {
    setIsRegisterOpen(false);
  }, []);

  const handleRegisterSubmit = useCallback(async (payload) => {
    try {
      const result = await createMachine(payload);
      if (result && result.success) {
        toast.success('Machine registered successfully');
        closeRegister();
        fetchMachines();
      } else {
        toast.error(result?.message || 'Failed to register machine');
      }
    } catch (err) {
      console.error('Error registering machine:', err);
      const message =
        err.response?.data?.message ||
        err.message ||
        'Failed to register machine';
      toast.error(message);
      throw err; // Re-throw so the modal knows submission failed
    }
  }, [closeRegister, fetchMachines]);

  // Edit (reassign) handler
  const handleEditSubmit = useCallback(async (machineId, newBalagruha) => {
    try {
      const result = await updateMachine(machineId, newBalagruha);
      if (result && result.success) {
        toast.success('Machine reassigned successfully');
        setEditingMachine(null);
        fetchMachines();
      } else {
        toast.error(result?.message || 'Failed to reassign machine');
      }
    } catch (err) {
      console.error('Error reassigning machine:', err);
      const message =
        err.response?.data?.message ||
        err.message ||
        'Failed to reassign machine';
      toast.error(message);
      throw err;
    }
  }, [fetchMachines]);

  // Deactivate handler
  const handleDeactivateConfirm = useCallback(async (machineId) => {
    try {
      const result = await deactivateMachine(machineId);
      if (result && result.success) {
        toast.success('Machine deactivated successfully');
        setDeactivatingMachine(null);
        fetchMachines();
      } else {
        toast.error(result?.message || 'Failed to deactivate machine');
      }
    } catch (err) {
      console.error('Error deactivating machine:', err);
      const message =
        err.response?.data?.message ||
        err.message ||
        'Failed to deactivate machine';
      toast.error(message);
      throw err;
    }
  }, [fetchMachines]);

  // Client-side filtered rows (API handles server-side, this is a safety net)
  const filteredMachines = useMemo(() => machines, [machines]);

  // Status badge color mapping
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-slate-200 text-slate-700';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-slate-200 text-slate-700';
    }
  };

  // Get Balagruha display name
  const getBalagruhaName = (machine) => {
    if (!machine.assignedBalagruha) return 'Unassigned';
    if (typeof machine.assignedBalagruha === 'object') {
      return machine.assignedBalagruha.name || 'Unknown';
    }
    // If it's just an ID string, try to find it in options
    const found = balagruhaOptions.find(
      (b) => b._id === machine.assignedBalagruha
    );
    return found ? found.name : String(machine.assignedBalagruha);
  };

  if (rbacLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading permissions...</p>
        </div>
      </div>
    );
  }

  if (!canReadMachines) {
    return null;
  }

  return (
    <div className="w-full min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="w-full px-4 py-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <Monitor className="w-7 h-7 text-purple-600" aria-hidden="true" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Machine Management
                </h1>
                <p className="text-slate-600 mt-1">
                  View and manage all registered machines across Balagruhas
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={fetchMachines}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
                aria-label="Refresh machine list"
              >
                <RefreshCw
                  className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`}
                  aria-hidden="true"
                />
                Refresh
              </button>
              <button
                onClick={openRegister}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                aria-label="Register a new machine"
              >
                <Plus className="w-5 h-5" aria-hidden="true" />
                Register Machine
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="w-full px-4 py-6">
        <div
          className="bg-white rounded-lg border border-slate-200 p-4 mb-4"
          role="search"
          aria-label="Machine filters"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search input */}
            <div>
              <label
                htmlFor="machine-search"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Search
              </label>
              <div className="relative">
                <Search
                  className="w-4 h-4 text-slate-400 absolute left-3 top-3"
                  aria-hidden="true"
                />
                <input
                  id="machine-search"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by MAC address, serial number, or machine ID"
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  aria-label="Search machines by MAC address, serial number, or machine ID"
                />
              </div>
            </div>

            {/* Balagruha dropdown */}
            <div>
              <label
                htmlFor="balagruha-filter"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Balagruha
              </label>
              <select
                id="balagruha-filter"
                value={balagruhaFilter}
                onChange={(e) => setBalagruhaFilter(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                aria-label="Filter machines by Balagruha"
              >
                <option value="all">All Balagruhas</option>
                {balagruhaOptions.map((bg) => (
                  <option key={bg._id} value={bg._id}>
                    {bg.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status dropdown */}
            <div>
              <label
                htmlFor="status-filter"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Status
              </label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                aria-label="Filter machines by status"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results summary */}
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-slate-600">
            {loading
              ? 'Loading...'
              : `${filteredMachines.length} machine${filteredMachines.length !== 1 ? 's' : ''} found`}
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="inline-block w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-slate-600">Loading machines...</p>
              </div>
            </div>
          ) : error ? (
            <div className="p-6">
              <p className="text-red-600" role="alert">
                {error}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table
                className="w-full"
                role="table"
                aria-label="Registered machines"
              >
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                    >
                      Machine ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                    >
                      MAC Address
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                    >
                      Serial Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                    >
                      Balagruha
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                    >
                      Last Login
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredMachines.map((machine) => {
                    const isInactive = machine.status === 'inactive';
                    return (
                      <tr
                        key={machine._id}
                        className={`hover:bg-slate-50 transition-colors ${
                          isInactive ? 'opacity-60 bg-slate-50' : ''
                        }`}
                        tabIndex={0}
                        aria-label={`Machine ${machine.machineId}, status ${machine.status}`}
                      >
                        <td className="px-6 py-4">
                          <div className={`font-medium ${isInactive ? 'text-slate-500' : 'text-slate-900'}`}>
                            {machine.machineId}
                          </div>
                        </td>
                        <td className={`px-6 py-4 font-mono text-sm ${isInactive ? 'text-slate-400' : 'text-slate-700'}`}>
                          {machine.macAddress}
                        </td>
                        <td className={`px-6 py-4 ${isInactive ? 'text-slate-400' : 'text-slate-700'}`}>
                          {machine.serialNumber}
                        </td>
                        <td className={`px-6 py-4 ${isInactive ? 'text-slate-400' : 'text-slate-700'}`}>
                          {getBalagruhaName(machine)}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(
                              machine.status
                            )}`}
                          >
                            {machine.status
                              ? machine.status.charAt(0).toUpperCase() +
                                machine.status.slice(1)
                              : 'Unknown'}
                          </span>
                        </td>
                        <td className={`px-6 py-4 text-sm ${isInactive ? 'text-slate-400' : 'text-slate-700'}`}>
                          {machine.lastLogin
                            ? new Date(machine.lastLogin).toLocaleString()
                            : 'Never'}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setViewingLogsMachine(machine)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              aria-label={`View usage logs for machine ${machine.machineId}`}
                            >
                              <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                              View Logs
                            </button>
                            <button
                              onClick={() => setEditingMachine(machine)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors focus:ring-2 focus:ring-purple-500 focus:outline-none"
                              aria-label={`Edit machine ${machine.machineId}`}
                            >
                              <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                              Edit
                            </button>
                            {machine.status === 'active' && (
                              <button
                                onClick={() => setDeactivatingMachine(machine)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors focus:ring-2 focus:ring-red-500 focus:outline-none"
                                aria-label={`Deactivate machine ${machine.machineId}`}
                              >
                                <PowerOff className="w-3.5 h-3.5" aria-hidden="true" />
                                Deactivate
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                  {filteredMachines.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-6 py-12 text-center text-slate-600"
                      >
                        No machines found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Registration Modal */}
      {isRegisterOpen && (
        <MachineRegistrationModal
          balagruhaOptions={balagruhaOptions}
          onClose={closeRegister}
          onSubmit={handleRegisterSubmit}
        />
      )}

      {/* Edit (Reassign) Modal */}
      {editingMachine && (
        <MachineEditModal
          machine={editingMachine}
          balagruhaOptions={balagruhaOptions}
          onClose={() => setEditingMachine(null)}
          onSubmit={handleEditSubmit}
        />
      )}

      {/* Deactivate Confirmation Modal */}
      {deactivatingMachine && (
        <DeactivateConfirmModal
          machine={deactivatingMachine}
          onClose={() => setDeactivatingMachine(null)}
          onConfirm={handleDeactivateConfirm}
        />
      )}

      {/* Usage Logs Modal */}
      {viewingLogsMachine && (
        <MachineLogsModal
          machine={viewingLogsMachine}
          onClose={() => setViewingLogsMachine(null)}
        />
      )}
    </div>
  );
}
