import React, { useState } from "react";
import DoctorNameDropdown from "./DoctorNameDropdown";
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

    // Validate files with separate limits for images and PDFs
    const validFiles = files.filter((file) => {
      const isImage = file.type.startsWith("image/");
      const isPdf = file.type === "application/pdf";

      if (!isImage && !isPdf) {
        alert(`File ${file.name} must be an image or PDF`);
        return false;
      }

      // Images: 5MB limit, PDFs: 10MB limit
      const maxSize = isImage ? 5 * 1024 * 1024 : 10 * 1024 * 1024;
      if (file.size > maxSize) {
        alert(`File ${file.name} exceeds ${isImage ? '5MB' : '10MB'} limit`);
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
            <DoctorNameDropdown
              value={doctorVisit.doctorName || ""}
              onChange={(value) => handleChange("doctorName", value)}
              placeholder="Search or add doctor name"
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
            <label className="upload-button">
              📎 Upload Prescription Files (Images: 5MB, PDFs: 10MB)
              <input
                type="file"
                accept="image/*,.pdf"
                multiple
                onChange={(e) => handleFileUpload(e, "prescription")}
                hidden
              />
            </label>
            {doctorVisit.prescriptionFiles && doctorVisit.prescriptionFiles.length > 0 && (
              <div className="file-list">
                {doctorVisit.prescriptionFiles.map((file, index) => (
                  <div key={index} className="file-item-preview">
                    {file instanceof File ? (
                      // New file upload
                      file.type.startsWith("image/") ? (
                        <div className="file-preview-container">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="file-thumbnail"
                          />
                          <span className="file-name">{file.name}</span>
                        </div>
                      ) : (
                        <div className="file-preview-container">
                          <div className="pdf-icon">📄</div>
                          <span className="file-name">{file.name}</span>
                        </div>
                      )
                    ) : (
                      // Existing database attachment
                      <div className="file-preview-container">
                        {file.fileType?.startsWith("image/") ? (
                          <>
                            <a href={file.fileUrl} target="_blank" rel="noopener noreferrer">
                              <img
                                src={file.fileUrl}
                                alt={file.fileName || "Prescription"}
                                className="file-thumbnail"
                              />
                            </a>
                            <span className="file-name">
                              <a href={file.fileUrl} target="_blank" rel="noopener noreferrer">
                                {file.fileName}
                              </a>
                            </span>
                          </>
                        ) : (
                          <>
                            <div className="pdf-icon">📄</div>
                            <span className="file-name">
                              <a href={file.fileUrl} target="_blank" rel="noopener noreferrer">
                                {file.fileName}
                              </a>
                            </span>
                          </>
                        )}
                      </div>
                    )}
                    <button
                      type="button"
                      className="remove-file-btn"
                      onClick={() => handleRemoveFile(index, "prescription")}
                    >
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
            <label className="upload-button">
              📎 Upload Test Result Files (Images: 5MB, PDFs: 10MB)
              <input
                type="file"
                accept="image/*,.pdf"
                multiple
                onChange={(e) => handleFileUpload(e, "testResult")}
                hidden
              />
            </label>
            {doctorVisit.testResultFiles && doctorVisit.testResultFiles.length > 0 && (
              <div className="file-list">
                {doctorVisit.testResultFiles.map((file, index) => (
                  <div key={index} className="file-item-preview">
                    {file instanceof File ? (
                      // New file upload
                      file.type.startsWith("image/") ? (
                        <div className="file-preview-container">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="file-thumbnail"
                          />
                          <span className="file-name">{file.name}</span>
                        </div>
                      ) : (
                        <div className="file-preview-container">
                          <div className="pdf-icon">📄</div>
                          <span className="file-name">{file.name}</span>
                        </div>
                      )
                    ) : (
                      // Existing database attachment
                      <div className="file-preview-container">
                        {file.fileType?.startsWith("image/") ? (
                          <>
                            <a href={file.fileUrl} target="_blank" rel="noopener noreferrer">
                              <img
                                src={file.fileUrl}
                                alt={file.fileName || "Test Result"}
                                className="file-thumbnail"
                              />
                            </a>
                            <span className="file-name">
                              <a href={file.fileUrl} target="_blank" rel="noopener noreferrer">
                                {file.fileName}
                              </a>
                            </span>
                          </>
                        ) : (
                          <>
                            <div className="pdf-icon">📄</div>
                            <span className="file-name">
                              <a href={file.fileUrl} target="_blank" rel="noopener noreferrer">
                                {file.fileName}
                              </a>
                            </span>
                          </>
                        )}
                      </div>
                    )}
                    <button
                      type="button"
                      className="remove-file-btn"
                      onClick={() => handleRemoveFile(index, "testResult")}
                    >
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
