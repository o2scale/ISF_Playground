import React, { useState } from "react";
import "./DoctorVisitsSection.css";

const DoctorVisitsSection = ({ doctorVisit, onChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (field, value) => {
    onChange({
      ...doctorVisit,
      [field]: value,
    });
  };

  const handleFileUpload = (e, fileType) => {
    const files = Array.from(e.target.files);
    const field = fileType === "prescription" ? "prescriptionFiles" : "testResultFiles";

    // Validate files
    const validFiles = files.filter((file) => {
      const isValidType = file.type.startsWith("image/") || file.type === "application/pdf";
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit

      if (!isValidType) {
        alert(`File ${file.name} must be an image or PDF`);
        return false;
      }
      if (!isValidSize) {
        alert(`File ${file.name} exceeds 10MB limit`);
        return false;
      }
      return true;
    });

    onChange({
      ...doctorVisit,
      [field]: [...(doctorVisit[field] || []), ...validFiles],
    });
  };

  const handleRemoveFile = (index, fileType) => {
    const field = fileType === "prescription" ? "prescriptionFiles" : "testResultFiles";
    onChange({
      ...doctorVisit,
      [field]: (doctorVisit[field] || []).filter((_, i) => i !== index),
    });
  };

  return (
    <div className="doctor-visits-section">
      <div className="section-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h4>Doctor Visits (Optional)</h4>
        <span className="toggle-icon">{isExpanded ? "▼" : "▶"}</span>
      </div>

      {isExpanded && (
        <div className="section-content">
          <div className="form-group">
            <label>Doctor Name</label>
            <input
              type="text"
              value={doctorVisit.doctorName || ""}
              onChange={(e) => handleChange("doctorName", e.target.value)}
              placeholder="Enter doctor's name"
            />
          </div>

          <div className="form-group">
            <label>Hospital Name</label>
            <input
              type="text"
              value={doctorVisit.hospitalName || ""}
              onChange={(e) => handleChange("hospitalName", e.target.value)}
              placeholder="Enter hospital name"
            />
          </div>

          <div className="form-group">
            <label>Visit Date</label>
            <input
              type="date"
              value={doctorVisit.visitDate || ""}
              onChange={(e) => handleChange("visitDate", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Prescription Files (img/pdf)</label>
            <input
              type="file"
              accept="image/*,.pdf"
              multiple
              onChange={(e) => handleFileUpload(e, "prescription")}
            />
            {doctorVisit.prescriptionFiles && doctorVisit.prescriptionFiles.length > 0 && (
              <div className="file-list">
                {doctorVisit.prescriptionFiles.map((file, index) => (
                  <div key={index} className="file-item">
                    <span>{file.name || file.fileName}</span>
                    <button type="button" onClick={() => handleRemoveFile(index, "prescription")}>
                      ❌
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Test Details</label>
            <textarea
              value={doctorVisit.testDetails || ""}
              onChange={(e) => handleChange("testDetails", e.target.value)}
              placeholder="Enter test details/notes"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Test Result Files (img/pdf)</label>
            <input
              type="file"
              accept="image/*,.pdf"
              multiple
              onChange={(e) => handleFileUpload(e, "testResult")}
            />
            {doctorVisit.testResultFiles && doctorVisit.testResultFiles.length > 0 && (
              <div className="file-list">
                {doctorVisit.testResultFiles.map((file, index) => (
                  <div key={index} className="file-item">
                    <span>{file.name || file.fileName}</span>
                    <button type="button" onClick={() => handleRemoveFile(index, "testResult")}>
                      ❌
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Doctor's Conclusion</label>
            <textarea
              value={doctorVisit.conclusion || ""}
              onChange={(e) => handleChange("conclusion", e.target.value)}
              placeholder="Enter doctor's conclusion"
              rows="3"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorVisitsSection;
