import React, { useEffect, useState } from "react";
import "./CheckInModal.css";
import { getAnyUserBasedonRoleandBalagruha } from "../../api";
import SymptomsSelector from "./SymptomsSelector";
import DoctorVisitsSection from "./DoctorVisitsSection";
import FollowUpSection from "./FollowUpSection";

const CheckInModal = ({ isOpen, onClose, onSubmit, studentData, balagruhas, editMode }) => {
  const [formData, setFormData] = useState({
    studentId: "",
    studentName: "",
    temperature: "",
    date: new Date().toISOString().split("T")[0],
    time: new Date().toTimeString().slice(0, 5),
    healthStatus: "normal",
    notes: "",
    uploadedImages: [],
    uploadedPdfs: [],
    // NEW FIELDS
    symptoms: [],
    customSymptom: "",
    doctorVisit: {
      doctorName: "",
      hospitalName: "",
      visitDate: "",
      prescriptionFiles: [],
      testDetails: "",
      testResultFiles: [],
      conclusion: "",
    },
    followUp: {
      followUpDate: "",
      hospital: "",
      doctor: "",
      assignedCoaches: [],
      status: "",
    },
  });
  const [selectedBalagruha, setSelectedBalagruha] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [students, setStudents] = useState([]);
  const [removedAttachmentIds, setRemovedAttachmentIds] = useState([]);

  useEffect(() => {
    if(studentData) {
      console.log('CheckInModal - studentData.attachments:', studentData.attachments);
      const images = studentData.attachments?.filter(att => att.fileType.startsWith("image/")) || [];
      const pdfs = studentData.attachments?.filter(att => att.fileType === "application/pdf") || [];
      console.log('CheckInModal - filtered images:', images);
      console.log('CheckInModal - filtered pdfs:', pdfs);

      setSelectedBalagruha(studentData.balagruhaIds[0]);
      fetchStudents(studentData.balagruhaIds[0]);
      setSelectedStudent(studentData.studentId);

      // Convert date to local timezone for editing
      const dateObj = new Date(studentData.date);
      const localDate = new Date(dateObj.getTime() - (dateObj.getTimezoneOffset() * 60000));
      const dateString = localDate.toISOString().split("T")[0];
      const timeString = localDate.toISOString().split("T")[1].slice(0, 5);

      setFormData({
        studentId: studentData.studentId,
        studentName: studentData.userName,
        temperature: studentData.temperature,
        date: dateString,
        time: timeString,
        healthStatus: studentData.healthStatus,
        notes: studentData.notes,
        uploadedImages: images,
        uploadedPdfs: pdfs,
        // NEW FIELDS
        symptoms: studentData.symptoms || [],
        customSymptom: studentData.customSymptom || "",
        doctorVisit: studentData.doctorVisit || {
          doctorName: "",
          hospitalName: "",
          visitDate: "",
          prescriptionFiles: [],
          testDetails: "",
          testResultFiles: [],
          conclusion: "",
        },
        followUp: studentData.followUp || {
          followUpDate: "",
          hospital: "",
          doctor: "",
          assignedCoaches: [],
          status: "",
        },
      })
      // setSelectedStudent(studentData.balagruhaIds[0]);
      // setSelectedStudent(studentData.studentId)
    } else{
      setFormData({
        studentId: "",
        studentName: "",
        temperature: "",
        date: new Date().toISOString().split("T")[0],
        time: new Date().toTimeString().slice(0, 5),
        healthStatus: "normal",
        notes: "",
        uploadedImages: [],
        uploadedPdfs: [],
        symptoms: [],
        customSymptom: "",
        doctorVisit: {
          doctorName: "",
          hospitalName: "",
          visitDate: "",
          prescriptionFiles: [],
          testDetails: "",
          testResultFiles: [],
          conclusion: "",
        },
        followUp: {
          followUpDate: "",
          hospital: "",
          doctor: "",
          assignedCoaches: [],
          status: "",
        },
      })
      setSelectedBalagruha("");
      setSelectedStudent("");
      setStudents([]);
      setRemovedAttachmentIds([]);
    }

    console.log('CheckInModal - studentData:', studentData);
    console.log('CheckInModal - editMode:', editMode);
    console.log('CheckInModal - formData.uploadedImages:', formData.uploadedImages);
  }, [studentData]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the check-in ID if in edit mode
    const checkInId = studentData?._id || null;
    onSubmit(formData, checkInId, removedAttachmentIds);
    onClose();

    // Reset form
    setSelectedBalagruha();
    setSelectedStudent();
    setFormData({
      studentId: "",
      studentName: "",
      temperature: "",
      date: new Date().toISOString().split("T")[0],
      time: new Date().toTimeString().slice(0, 5),
      healthStatus: "normal",
      notes: "",
      uploadedImages: [],
      uploadedPdfs: [],
      symptoms: [],
      customSymptom: "",
      doctorVisit: {
        doctorName: "",
        hospitalName: "",
        visitDate: "",
        prescriptionFiles: [],
        testDetails: "",
        testResultFiles: [],
        conclusion: "",
      },
      followUp: {
        followUpDate: "",
        hospital: "",
        doctor: "",
        assignedCoaches: [],
        status: "",
      },
    });
    setRemovedAttachmentIds([]);
  };

  const handleStudentChange = (e) => {
    setSelectedStudent(e.target.value);
    const student = students.find((s) => s._id === e.target.value);
    setFormData({
      ...formData,
      studentId: e.target.value,
      studentName: student?.name || "",
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => {
      const isValid =
        file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024; // 5MB limit
      if (!isValid) {
        alert(`File ${file.name} is either not an image or exceeds 5MB limit`);
      }
      return isValid;
    });
    setFormData((prev) => ({
      ...prev,
      uploadedImages: [...prev.uploadedImages, ...validFiles],
    }));
  };

  const handlePdfUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => {
      const isValid =
        file.type === "application/pdf" && file.size <= 10 * 1024 * 1024; // 10MB limit
      if (!isValid) {
        alert(`File ${file.name} is either not a PDF or exceeds 10MB limit`);
      }
      return isValid;
    });
    setFormData((prev) => ({
      ...prev,
      uploadedPdfs: [...prev.uploadedPdfs, ...validFiles],
    }));
  };

  const handleRemoveImage = (index) => {
    const fileToRemove = formData.uploadedImages[index];
    // If it's a database attachment (has _id), track it for deletion
    if (fileToRemove && !( fileToRemove instanceof File) && fileToRemove._id) {
      setRemovedAttachmentIds((prev) => [...prev, fileToRemove._id]);
    }
    setFormData((prev) => ({
      ...prev,
      uploadedImages: prev.uploadedImages.filter((_, i) => i !== index),
    }));
  };

  const handleRemovePdf = (index) => {
    const fileToRemove = formData.uploadedPdfs[index];
    // If it's a database attachment (has _id), track it for deletion
    if (fileToRemove && !(fileToRemove instanceof File) && fileToRemove._id) {
      setRemovedAttachmentIds((prev) => [...prev, fileToRemove._id]);
    }
    setFormData((prev) => ({
      ...prev,
      uploadedPdfs: prev.uploadedPdfs.filter((_, i) => i !== index),
    }));
  };

  const fetchStudents = async (balId) => {
    console.log("fetchStudents called with balId:", balId);
    if (!balId) {
      console.log("No balId provided, clearing students");
      setStudents([]);
      return;
    }

    setSelectedBalagruha(balId);
    console.log("Calling API to fetch students for balagruha:", balId);
    const response = await getAnyUserBasedonRoleandBalagruha("student", balId);
    console.log("API response:", response);

    if (response.success) {
      // Backend already filters by balagruhaId, no need to filter again
      const students = response?.data?.users || [];
      console.log("Students from API:", students);
      setStudents(students);
    } else {
      console.log("API call failed or no success");
      setStudents([]);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>New Health Check-in</h3>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Balagruha</label>
            <select
              value={selectedBalagruha}
              onChange={(e) => fetchStudents(e.target.value)}
              required
            >
              <option value="">Select Balagruha</option>  
              {balagruhas.map((bal) => (
                <option key={bal.id} value={bal._id}>
                  {bal.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Student</label>
            <select
              value={selectedStudent}
              onChange={handleStudentChange}
              required
            >
              <option value="">Select Student</option>
              {students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Temperature (°C)</label>
            <input
              type="number"
              step="any"
              min="30"
              max="45"
              value={formData.temperature}
              onChange={(e) =>
                setFormData({ ...formData, temperature: e.target.value })
              }
              autoComplete="off"
              required
            />
          </div>

          {/* NEW: Symptoms Section */}
          <SymptomsSelector
            symptoms={formData.symptoms}
            customSymptom={formData.customSymptom}
            onChange={(updates) => setFormData({ ...formData, ...updates })}
          />

          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Time</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Health Status</label>
            <select
              value={formData.healthStatus}
              onChange={(e) =>
                setFormData({ ...formData, healthStatus: e.target.value })
              }
              required
            >
              <option value="normal">Normal</option>
              <option value="important">Important</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          {/* NEW: Doctor Visits Section */}
          <DoctorVisitsSection
            doctorVisit={formData.doctorVisit}
            onChange={(doctorVisit) => setFormData({ ...formData, doctorVisit })}
          />

          {/* NEW: Follow-up Section */}
          <FollowUpSection
            followUp={formData.followUp}
            balagruhaId={selectedBalagruha}
            onChange={(followUp) => setFormData({ ...formData, followUp })}
          />

          <div className="form-group">
            <label>Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              rows="3"
            ></textarea>
          </div>

          {/* File Upload Section */}
          <div className="form-group">
            {/* <label>Upload Images (Max 5MB each)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />
            <div className="uploaded-files">
              {formData.uploadedImages.map((file, index) => (
                <div key={index} className="uploaded-item">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Uploaded"
                    width="50"
                    height="50"
                  />
                  <button onClick={() => handleRemoveImage(index)}>❌</button>
                </div>
              ))}
            </div> */}

            <label className="upload-button">
              Upload Images (Max 5MB each)
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                hidden
              />
            </label>

            {/* <div className="uploaded-files">
              {formData.uploadedImages.map((file, index) => (
                <div key={index} className="uploaded-item">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Uploaded"
                    width="50"
                    height="50"
                  />
                  <button onClick={() => handleRemoveImage(index)}>❌</button>
                </div>
              ))}
            </div> */}

           <div className="uploaded-files">
             {formData.uploadedImages.map((file, index) => (
               <div key={index} className="uploaded-item">
                 {file instanceof File ? (
                   // New file upload - show file name
                   <span>{file.name}</span>
                 ) : (
                   // Existing database attachment - show image preview
                   <a href={file.fileUrl} target="_blank" rel="noopener noreferrer">
                     <img
                       src={file.fileUrl}
                       alt={file.fileName || "Uploaded image"}
                       width="50"
                       height="50"
                       style={{ cursor: "pointer" }}
                     />
                   </a>
                 )}
                 <button type="button" onClick={() => handleRemoveImage(index)}>❌</button>
               </div>
             ))}
           </div>

          </div>

          <div className="form-group">
            {/* <label>Upload PDFs (Max 10MB each)</label>
            <input
              type="file"
              accept="application/pdf"
              multiple
              onChange={handlePdfUpload}
            />
            <div className="uploaded-files">
              {formData.uploadedPdfs.map((file, index) => (
                <div key={index} className="uploaded-item">
                  <span>{file.name}</span>
                  <button onClick={() => handleRemovePdf(index)}>❌</button>
                </div>
              ))}
            </div> */}

            <label className="upload-button">
            Upload PDFs (Max 10MB each)
              <input
                type="file"
                accept="application/pdf"
                multiple
                onChange={handlePdfUpload}
                hidden
              />
            </label>

            <div className="uploaded-files">
              {formData.uploadedPdfs.map((file, index) => (
                <div key={index} className="uploaded-item">
                  {file instanceof File ? (
                    // New file upload - show file name
                    <span>{file.name}</span>
                  ) : (
                    // Existing database attachment - show link
                    <a
                      href={file.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {file.fileName || `PDF-${index + 1}`}
                    </a>
                  )}
                  <button type="button" onClick={() => handleRemovePdf(index)}>❌</button>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckInModal;
