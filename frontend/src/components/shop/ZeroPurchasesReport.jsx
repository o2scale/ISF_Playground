// Sprint5-Story-12: Zero Purchases Report Component
// Displays students who have never made a purchase

import React from 'react';
import { AlertTriangle, UserX, DollarSign, Calendar, Download } from 'lucide-react';

const ZeroPurchasesReport = ({ students, onExport }) => {
  // Highlight students with high balances
  const isHighBalance = (balance) => balance > 100;

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Warning Banner */}
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-t-lg">
        <div className="flex items-start">
          <AlertTriangle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-red-800">
              {students.length} students have never made a purchase
            </h3>
            <p className="text-sm text-red-700 mt-1">
              Engage these students to increase shop participation and coin economy health
            </p>
          </div>
          <button
            onClick={onExport}
            className="ml-4 flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-700 bg-red-100 hover:bg-red-200 rounded-md transition-colors"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="px-6 pb-4">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <UserX className="w-6 h-6 text-red-500" />
          Zero Purchases Report
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Students who have earned coins but haven't made any shop purchases yet
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-y border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Balance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Activity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Balagruha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Coach
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                  <UserX className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                  <p className="text-lg font-medium">All students have made purchases!</p>
                  <p className="text-sm">This is great news for shop engagement</p>
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr
                  key={student.userId}
                  className={`hover:bg-gray-50 transition-colors ${
                    isHighBalance(student.balance) ? 'bg-yellow-50 border-l-4 border-yellow-400' : ''
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                        {student.name}
                        {isHighBalance(student.balance) && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <DollarSign className="w-3 h-3" />
                            High Balance
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">{student.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-semibold ${
                      isHighBalance(student.balance) ? 'text-yellow-600' : 'text-purple-600'
                    }`}>
                      {student.balance} coins
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {formatDate(student.lastActivity)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.balagruha || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.coach || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => {/* TODO: Implement send reminder */}}
                      className="text-purple-600 hover:text-purple-800 font-medium mr-3"
                    >
                      Send Reminder
                    </button>
                    <button
                      onClick={() => {/* TODO: Implement view profile */}}
                      className="text-gray-600 hover:text-gray-800 font-medium"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Summary Footer */}
      {students.length > 0 && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <UserX className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Never Purchased</p>
                <p className="text-lg font-bold text-gray-900">{students.length} students</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Total Balance (Unused)</p>
                <p className="text-lg font-bold text-purple-600">
                  {students.reduce((sum, s) => sum + s.balance, 0)} coins
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600">High Balance (>100)</p>
                <p className="text-lg font-bold text-yellow-600">
                  {students.filter(s => isHighBalance(s.balance)).length} students
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZeroPurchasesReport;
