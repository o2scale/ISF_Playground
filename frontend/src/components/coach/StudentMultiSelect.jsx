import React, { useState, useMemo } from 'react';

export default function StudentMultiSelect({ students, selectedStudents, onSelectionChange }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter students based on search query
  const filteredStudents = useMemo(() => {
    if (!searchQuery) return students;

    const query = searchQuery.toLowerCase();
    return students.filter(
      (student) =>
        student.firstName?.toLowerCase().includes(query) ||
        student.lastName?.toLowerCase().includes(query) ||
        student.studentId?.toLowerCase().includes(query) ||
        student.class?.toLowerCase().includes(query)
    );
  }, [students, searchQuery]);

  // Check if a student is selected
  const isStudentSelected = (studentId) => {
    return selectedStudents.some((s) => s._id === studentId);
  };

  // Toggle student selection
  const toggleStudent = (student) => {
    if (isStudentSelected(student._id)) {
      // Remove student
      onSelectionChange(selectedStudents.filter((s) => s._id !== student._id));
    } else {
      // Add student
      onSelectionChange([...selectedStudents, student]);
    }
  };

  // Select all filtered students
  const selectAll = () => {
    const allStudentIds = new Set(selectedStudents.map((s) => s._id));
    const newSelections = filteredStudents.filter(
      (student) => !allStudentIds.has(student._id)
    );
    onSelectionChange([...selectedStudents, ...newSelections]);
  };

  // Deselect all filtered students
  const deselectAll = () => {
    const filteredIds = new Set(filteredStudents.map((s) => s._id));
    onSelectionChange(
      selectedStudents.filter((s) => !filteredIds.has(s._id))
    );
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4">
      {/* Header with selection count and bulk actions */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-gray-900">
          Select Students ({selectedStudents.length} of {students.length} selected)
        </h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={selectAll}
            className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 hover:underline"
          >
            Select All
          </button>
          <button
            type="button"
            onClick={deselectAll}
            className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 hover:underline"
          >
            Deselect All
          </button>
        </div>
      </div>

      {/* Search Filter */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="🔍 Search students by name, ID, or class..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Student List */}
      <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
        {filteredStudents.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            {searchQuery ? 'No students match your search' : 'No students available'}
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredStudents.map((student) => {
              const isSelected = isStudentSelected(student._id);
              return (
                <label
                  key={student._id}
                  className={`flex items-center p-3 cursor-pointer hover:bg-gray-50 transition ${
                    isSelected ? 'bg-blue-50' : ''
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleStudent(student)}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">
                      {student.firstName} {student.lastName}
                    </div>
                    <div className="text-sm text-gray-600">
                      {student.class && (
                        <span>
                          Class: {student.class}
                          {student.studentId && ' • '}
                        </span>
                      )}
                      {student.studentId && <span>ID: {student.studentId}</span>}
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Selection Summary (shown at bottom when students are selected) */}
      {selectedStudents.length > 0 && (
        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="text-sm text-blue-900">
            <strong>{selectedStudents.length}</strong> student
            {selectedStudents.length !== 1 ? 's' : ''} selected
          </div>
        </div>
      )}
    </div>
  );
}
