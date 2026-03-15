import { api } from './client';

/**
 * Create (register) a new machine via POST /api/v1/machines
 * @param {Object} data - { machineId, macAddress, serialNumber, assignedBalagruha }
 * @returns {Promise<Object>} API response data
 */
export const createMachine = async (data) => {
  const response = await api.post('/api/v1/machines', data);
  return response.data;
};
