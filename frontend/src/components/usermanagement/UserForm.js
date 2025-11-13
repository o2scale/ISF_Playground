import React, { useEffect, useRef, useState } from "react";
import {
  addUsers,
  getBalagruha,
  getMachines,
  updateUsers,
  getBalagruhaListbyUserID,
  getMedicalCheckInsByStudentId,
  createMedicalCheckin,
  updateMedicalCheckin,
} from "../../api";
import "./UserForm.css";
import { Modal } from "./modal";
import FaceCapture from "./FaceCapture";
import CheckInForm from "../dashboard/CheckInForm";

const UserForm = ({ mode = "add", user = null, onSuccess, onCancel }) => {
  console.log("usdsds", user);
  const [machines, setMachines] = useState([]);
  const role = localStorage.getItem("role");
  const [machineDropdownOpen, setMachineDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const faceCaptureRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    userId: "",
    role: "student",
    status: "active",
    age: "",
    gender: "",
    balagruhaIds: [],
    parentalStatus: "",
    guardianName1: "",
    guardianContact1: "",
    guardianName2: "",
    guardianContact2: "",
    assignedMachines: [],
    nextActionDate: "",
    // medicalHistory removed - Sprint6-Story-02: Replaced with Check-in Form
  });

  const [errors, setErrors] = useState({});
  const [balagruhaOptions, setBalagruhaOptions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [prevBalagruhaIds, setPrevBalagruhaIds] = useState([]);
  const [files, setFiles] = useState({
    facialData: null,
    // medicalHistoryFiles removed - Sprint6-Story-02
  });
  const [previews, setPreviews] = useState({
    facialData: null,
    // medicalHistoryFiles removed - Sprint6-Story-02
  });

  // Sprint6-Story-02-Phase4: Medical Check-ins state (inline form)
  const [checkIns, setCheckIns] = useState([]);
  const [showCheckInForm, setShowCheckInForm] = useState(false);
  const [editingCheckIn, setEditingCheckIn] = useState(null);
  const [formMode, setFormMode] = useState('create'); // 'create' or 'edit'
  const [isLoadingCheckIns, setIsLoadingCheckIns] = useState(false);

  const fileInputRefs = {
    facialData: useRef(null),
  };

  const getMachinesData = async () => {
    const response = await getMachines();
    console.log("response", response.data?.machines);
    setMachines(response.data.machines);
  };

  const generateRandomPassword = () => {
    const chars = "123456789";
    let password = "";
    for (let i = 0; i < 7; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return password;
  };

  useEffect(() => {
    if (mode === "edit" && user) {
      console.log("🔍 Edit mode - User object:", user);
      console.log("🔍 Edit mode - userId field:", user.userId);
      // Set basic user data
      setFormData({
        name: user.name || "",
        email: user.email || "",
        userId: user?.userId || "",
        role: user.role || "student",
        status: user.status || "active",
        age: user.age || "",
        gender: user.gender || "",
        balagruhaIds: user.balagruhaIds || [],
        parentalStatus: user.parentalStatus || "",
        nextActionDate: user.nextActionDate || "",
        guardianName1: user.guardianName1 || "",
        guardianContact1: user.guardianContact1 || "",
        assignedMachines: user.assignedMachines || [],
        guardianName2: user.guardianName2 || "",
        guardianContact2: user.guardianContact2 || "",
        // medicalHistory removed - Sprint6-Story-02: Replaced with Check-in Form
      });

      // Set facial data preview if available
      if (user.facialDataUrl) {
        setPreviews((prev) => ({
          ...prev,
          facialData: user.facialDataUrl,
        }));
      }

      // Set medical history file previews if available
      if (user.medicalHistory && user.medicalHistory.length > 0) {
        const medicalHistoryPreviews = {};

        user.medicalHistory.forEach((history, index) => {
          if (
            history.prescriptionUrls?.length ||
            history.otherAttachmentUrls?.length
          ) {
            medicalHistoryPreviews[index] = {
              prescriptions: history.prescriptionUrls || [],
              otherAttachments: history.otherAttachmentUrls || [],
            };
          }
        });

        if (Object.keys(medicalHistoryPreviews).length > 0) {
          setPreviews((prev) => ({
            ...prev,
            medicalHistoryFiles: medicalHistoryPreviews,
          }));
        }
      }
    }
    fetchBalagruhaOptions();
    getMachinesData();
  }, [mode, user]);

  // Sprint6-Story-02: Fetch check-ins when editing a student
  useEffect(() => {
    const fetchCheckIns = async () => {
      if (mode === "edit" && user && user.role === "student" && user._id) {
        setIsLoadingCheckIns(true);
        try {
          const response = await getMedicalCheckInsByStudentId(user._id);
          console.log('UserForm - check-ins response:', response); // Debug log
          if (response.success) {
            // Sprint6-Story-02-Phase4-BUG: response.data contains medicalCheckIns array
            const checkInsData = response.data.medicalCheckIns || response.data;
            console.log('UserForm - check-ins data:', checkInsData); // Debug log
            // Sort by date, newest first
            const sortedCheckIns = checkInsData.sort((a, b) =>
              new Date(b.date) - new Date(a.date)
            );
            setCheckIns(sortedCheckIns);
          }
        } catch (error) {
          console.error("Error fetching check-ins:", error);
        } finally {
          setIsLoadingCheckIns(false);
        }
      }
    };
    fetchCheckIns();
  }, [mode, user]);

  useEffect(() => {
    // Only clear machines if balagruhaIds actually changed (not on initial load)
    if (
      prevBalagruhaIds.length > 0 &&
      JSON.stringify(prevBalagruhaIds) !== JSON.stringify(formData.balagruhaIds)
    ) {
      setFormData((prev) => ({
        ...prev,
        assignedMachines: [],
      }));
    }
    setPrevBalagruhaIds(formData.balagruhaIds);
  }, [formData.balagruhaIds]);

  const fetchBalagruhaOptions = async () => {
    try {
      const role = (localStorage.getItem("role") || "").toLowerCase();
      const isCoachLike = [
        "coach",
        "sports-coach",
        "music-coach",
        "medical-incharge",
      ].includes(role);

      if (isCoachLike) {
        const userId = localStorage.getItem("userId");
        const response = await getBalagruhaListbyUserID(userId);
        const balagruhas = response?.data?.balagruhas || [];
        setBalagruhaOptions(balagruhas);
      } else {
        const response = await getBalagruha();
        setBalagruhaOptions(response?.data?.balagruhas || []);
      }
    } catch (error) {
      console.error("Error fetching balagruha options:", error);
    }
  };

  // Medical history handlers removed - Sprint6-Story-02: Replaced with Check-in Form
  // handleAddMedicalHistory, handleRemoveMedicalHistory, handleMedicalHistoryChange,
  // handleMedicalHistoryNestedChange, handleMedicalHistoryFileChange all removed
  useEffect(() => {
    const handleClickOutside = (event) => {
      // For machine dropdown
      const machineSelector = document.querySelector(".form-machine-selector");
      // For balagruha dropdown
      const balagruhaSelector = document.querySelector(
        ".form-balagruha-selector"
      );

      // Check if click is outside machine dropdown
      if (machineSelector && !machineSelector.contains(event.target)) {
        setMachineDropdownOpen(false);
      }

      // Check if click is outside balagruha dropdown
      if (balagruhaSelector && !balagruhaSelector.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup function
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Empty dependency array since we don't need to track any dependencies
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (formData.role !== "admin") {
      if (!formData.balagruhaIds || formData.balagruhaIds.length === 0) {
        newErrors.balagruhaIds = "Please select at least one Balagruha";
      }
    }

    if (formData.role === "student") {
      if (!formData.age) {
        newErrors.age = "Age is required";
      } else if (formData.age < 1 || formData.age > 100) {
        newErrors.age = "Please enter a valid age";
      }

      if (!formData.gender) {
        newErrors.gender = "Gender is required";
      }

      // if (!formData.balagruhaIds.length) {
      //     newErrors.balagruhaIds = 'Please select at least one Balagruha';
      // }

      // if (!formData.parentalStatus) {
      //     newErrors.parentalStatus = 'Parental status is required';
      // }

      // if (!formData.guardianContact) {
      //     newErrors.guardianContact = 'Guardian contact is required';
      // } else if (!/^\d{10}$/.test(formData.guardianContact)) {
      //     newErrors.guardianContact = 'Please enter a valid 10-digit contact number';
      // }

      // if (mode === 'add' && !files.facialData && !previews.facialData) {
      //     newErrors.facialData = 'Facial photo is required';
      // }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      let updatedData = { ...prev, [name]: value };

      // Reset dependent fields when parentalStatus changes
      if (name === "parentalStatus") {
        updatedData = {
          ...updatedData,
          guardianName1: "",
          guardianContact1: "",
          guardianName2: "",
          guardianContact2: "",
        };
      }

      return updatedData;
    });
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        [type]: "File size should not exceed 5MB",
      }));
      return;
    }

    if (type === "facialData" && !file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        [type]: "Please upload an image file",
      }));
      return;
    }

    setFiles((prev) => ({
      ...prev,
      [type]: file,
    }));

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => ({
          ...prev,
          [type]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }

    if (errors[type]) {
      setErrors((prev) => ({
        ...prev,
        [type]: null,
      }));
    }
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().split("T")[0];
  };

  const handleBalagruhaChange = (balagruhaId) => {
    setFormData((prev) => ({
      ...prev,
      balagruhaIds: prev.balagruhaIds.includes(balagruhaId)
        ? prev.balagruhaIds.filter((id) => id !== balagruhaId)
        : [...prev.balagruhaIds, balagruhaId],
    }));

    if (errors.balagruhaIds) {
      setErrors((prev) => ({
        ...prev,
        balagruhaIds: null,
      }));
    }
  };

  // handleRemoveMedicalHistoryFile removed - Sprint6-Story-02

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();

      //   Add basic fields
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("role", formData.role);
      formDataToSend.append("status", formData.status);

      if (formData.password && localStorage.getItem("role") === "admin") {
        formDataToSend.append("password", formData.password);
      }

      if (formData.role !== "admin") {
        if (formData.balagruhaIds && formData.balagruhaIds.length > 0) {
          const balagruhaIdsList = formData.balagruhaIds
            .map((bg) => bg._id)
            .join(",");
          formDataToSend.append("balagruhaIds", balagruhaIdsList);
        }
      }
      // Add student-specific fields if role is student
      if (formData.role === "student") {
        formDataToSend.append("age", formData.age);
        formDataToSend.append("userId", formData.userId);
        formDataToSend.append("gender", formData.gender);
        formDataToSend.append("parentalStatus", formData.parentalStatus);
        formDataToSend.append("nextActionDate", formData.nextActionDate);
        if (
          formData.parentalStatus === "has one" ||
          formData.parentalStatus === "has guardian"
        ) {
          formDataToSend.append("guardianName1", formData.guardianName1);
          formDataToSend.append("guardianContact1", formData.guardianContact1);
        } else if (formData.parentalStatus === "has both") {
          formDataToSend.append("guardianName1", formData.guardianName1);
          formDataToSend.append("guardianContact1", formData.guardianContact1);
          formDataToSend.append("guardianName2", formData.guardianName2);
          formDataToSend.append("guardianContact2", formData.guardianContact2);
        } else {
          formDataToSend.append("guardianName1", "");
          formDataToSend.append("guardianContact1", "");
          formDataToSend.append("guardianName2", "");
          formDataToSend.append("guardianContact2", "");
        }

        // Add balagruhaIds

        // Add assignedMachines - extract IDs and join them
        if (formData.assignedMachines && formData.assignedMachines.length > 0) {
          const machineIdsList = formData.assignedMachines
            .map((machine) => machine._id)
            .join(",");
          formDataToSend.append("assignedMachines", machineIdsList);
        }
        // Add facial data file if available
        if (files.facialData) {
          formDataToSend.append("facialData", files.facialData);
        }

        // Medical history processing removed - Sprint6-Story-02: Replaced with Check-in Form
      }

      // Log the FormData entries for debugging
      for (let pair of formDataToSend.entries()) {
        console.log(
          pair[0] + ": " + (pair[1] instanceof File ? pair[1].name : pair[1])
        );
      }

      // Use the API functions with FormData
      console.log(files.facialData);
      const response =
        mode === "add"
          ? await addUsers(formDataToSend)
          : await updateUsers(user._id, formDataToSend);

      onSuccess?.(response);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors((prev) => ({
        ...prev,
        submit:
          error.response.data.message ||
          "An error occurred while saving the user",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    if (faceCaptureRef.current) {
      faceCaptureRef.current.stopCamera(); // Ensures camera is stopped
    }
    setIsOpen(false);
  };

  // Sprint6-Story-02: Check-in modal handlers
  // Sprint6-Story-02-Phase4: Inline form handlers
  const handleCreateCheckIn = () => {
    setFormMode('create');
    setEditingCheckIn(null);
    setShowCheckInForm(true);
  };

  const handleEditCheckIn = (checkIn) => {
    setFormMode('edit');
    setEditingCheckIn(checkIn);
    setShowCheckInForm(true);
  };

  const handleCheckInSave = async (checkInData) => {
    try {
      let response;
      if (formMode === 'create') {
        response = await createMedicalCheckin(checkInData);
      } else {
        response = await updateMedicalCheckin(editingCheckIn._id, checkInData);
      }

      if (response.success) {
        // Refresh check-ins list
        const updatedCheckIns = await getMedicalCheckInsByStudentId(user._id);
        if (updatedCheckIns.success) {
          // Sprint6-Story-02-Phase4-BUG: response.data contains medicalCheckIns array
          const checkInsData = updatedCheckIns.data.medicalCheckIns || updatedCheckIns.data;
          const sortedCheckIns = checkInsData.sort((a, b) =>
            new Date(b.date) - new Date(a.date)
          );
          setCheckIns(sortedCheckIns);
        }
        setShowCheckInForm(false);
        setEditingCheckIn(null);
      }
    } catch (error) {
      console.error(`Error ${formMode === 'create' ? 'creating' : 'updating'} check-in:`, error);
    }
  };

  const handleCheckInCancel = () => {
    setShowCheckInForm(false);
    setEditingCheckIn(null);
  };

  const formatCheckInDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="user-form-container">
      <Modal
        isOpen={isOpen}
        title={"Capture Photo"}
        onClose={handleCloseModal}
        children={
          <FaceCapture
            ref={faceCaptureRef}
            onCapture={(file, previewUrl) => {
              setFiles((prev) => ({ ...prev, facialData: file }));
              setPreviews((prev) => ({ ...prev, facialData: previewUrl }));
              handleCloseModal();
            }}
          />
        }
      />
      <div className="form-header">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span
            style={{ cursor: "pointer", fontSize: "20px" }}
            onClick={onCancel}
          >
            ⬅️
          </span>
          <h2>{mode === "add" ? "Add New User" : "Edit User"}</h2>
        </div>
        {mode === "edit" && (
          <div className="user-info">
            <span>User ID: {user?._id}</span>
            <span>
              Last Updated: {new Date(user?.updatedAt).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="user-form"
        encType="multipart/form-data"
      >
        {/* Basic Information */}
        <div className="form-section">
          <h3>Basic Information</h3>

          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? "error" : ""}
              placeholder="Enter full name"
              disabled={localStorage.getItem("role") === "medical-incharge"}
            />
            {errors.name && (
              <span className="error-message">{errors.name}</span>
            )}
          </div>

          {localStorage.getItem("role") !== "medical-incharge" && (
            <>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                />
              </div>

              {localStorage.getItem("role") === "admin" && (
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="password-input-group">
                    <input
                      type="text"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={errors.password ? "error" : ""}
                      placeholder={
                        mode === "add"
                          ? "Enter New Password"
                          : "Retype to reset passoword"
                      }
                    />
                    <button
                      type="button"
                      className="generate-password-btn"
                      onClick={() => {
                        const password = generateRandomPassword();
                        handleInputChange({
                          target: { name: "password", value: password },
                        });
                      }}
                    >
                      Generate
                    </button>
                  </div>
                  {errors.password && (
                    <span className="error-message">{errors.password}</span>
                  )}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="role">Role *</label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className={errors.role ? "error" : ""}
                  selected={
                    localStorage?.getItem("role") === "coach" ? "student" : ""
                  }
                  disabled={
                    localStorage?.getItem("role") === "coach" ? true : false
                  }
                >
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                  <option value="coach">Coach</option>
                  <option value="balagruha-incharge">
                    Balagruha In-charge
                  </option>
                  <option value="purchase-manager">Purchase Manager</option>
                  <option value="medical-incharge">Medical Incharge</option>
                  <option value="sports-coach">Sports Coach</option>
                  <option value="music-coach">Music Coach</option>
                  <option value="amma">Amma</option>
                </select>
                {errors.role && (
                  <span className="error-message">{errors.role}</span>
                )}
              </div>

              <div className="form-group">
                <label>Status</label>
                <div className="status-toggle">
                  <label
                    className={formData.status === "active" ? "active" : ""}
                  >
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      checked={formData.status === "active"}
                      onChange={handleInputChange}
                    />
                    Active
                  </label>
                  <label
                    className={formData.status === "inactive" ? "inactive" : ""}
                  >
                    <input
                      type="radio"
                      name="status"
                      value="inactive"
                      checked={formData.status === "inactive"}
                      onChange={handleInputChange}
                    />
                    Inactive
                  </label>
                </div>
              </div>

              {formData.role !== "admin" && (
                <div className="form-group">
                  <label>Balagruha *</label>
                  <div className="form-balagruha-selector">
                    <div
                      className={`form-dropdown-header ${
                        errors.balagruhaIds ? "form-error redbtndiv" : ""
                      }`}
                      onClick={() => setDropdownOpen((prev) => !prev)}
                    >
                      <span>
                        {formData.balagruhaIds.length
                          ? `${formData.balagruhaIds
                              .map((bg) => bg.name)
                              .join(", ")}`
                          : "Select Balagruha"}
                      </span>
                      <span className="form-dropdown-arrow">
                        {dropdownOpen ? "▲" : "▼"}
                      </span>
                    </div>
                    {dropdownOpen && (
                      <div className="form-dropdown-options">
                        {balagruhaOptions.map((option) => (
                          <label
                            key={option._id}
                            className="form-checkbox-option"
                          >
                            <input
                              type={
                                formData.role === "student"
                                  ? "radio"
                                  : "checkbox"
                              }
                              checked={
                                formData.role === "student"
                                  ? formData.balagruhaIds.some(
                                      (bg) => bg._id === option._id
                                    )
                                  : formData.balagruhaIds.some(
                                      (bg) => bg._id === option._id
                                    )
                              }
                              onChange={(e) => {
                                if (formData.role === "student") {
                                  // Single select for students
                                  setFormData((prev) => ({
                                    ...prev,
                                    balagruhaIds: [option],
                                  }));
                                } else {
                                  // Multi select for other roles
                                  const isSelected = formData.balagruhaIds.some(
                                    (bg) => bg._id === option._id
                                  );
                                  const selectedBalagruhas = isSelected
                                    ? formData.balagruhaIds.filter(
                                        (bg) => bg._id !== option._id
                                      )
                                    : [...formData.balagruhaIds, option];
                                  setFormData((prev) => ({
                                    ...prev,
                                    balagruhaIds: selectedBalagruhas,
                                  }));
                                }
                                // Close dropdown if it's a student (single select)
                                if (formData.role === "student") {
                                  setDropdownOpen(false);
                                }
                              }}
                            />
                            {option.name}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.balagruhaIds && (
                    <span className="form-error-message redbtn">
                      {errors.balagruhaIds}
                    </span>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Student Specific Fields */}
        {formData.role === "student" && (
          <div className="form-section">
            <h3>Student Information</h3>

            <div className="form-group">
              <label htmlFor="userId">User ID *</label>
              <input
                type="text"
                id="userId"
                name="userId"
                value={formData.userId}
                onChange={handleInputChange}
                placeholder="Enter User ID"
                disabled={localStorage.getItem("role") === "medical-incharge"}
              />
            </div>

            {localStorage.getItem("role") !== "medical-incharge" && (
              <>
                <div className="form-group">
                  <label>Assigned Machines</label>
                  <div className="form-machine-selector">
                    <div
                      className={`form-dropdown-header ${
                        errors.assignedMachines ? "form-error" : ""
                      }`}
                      onClick={() =>
                        setMachineDropdownOpen(!machineDropdownOpen)
                      }
                    >
                      <span>
                        {formData.assignedMachines.length
                          ? `${formData.assignedMachines
                              .map((machine) => machine.machineId)
                              .join(", ")}`
                          : "Select Machines"}
                      </span>
                      <span className="form-dropdown-arrow">
                        {machineDropdownOpen ? "▲" : "▼"}
                      </span>
                    </div>
                    {machineDropdownOpen && (
                      <div className="form-dropdown-options">
                        {formData.balagruhaIds.length > 0 ? (
                          formData.balagruhaIds.map((balagruha) => {
                            const selectedBalagruha = balagruhaOptions.find(
                              (bg) => bg._id === balagruha._id
                            );

                            const availableMachines =
                              selectedBalagruha?.assignedMachines?.filter(
                                (machine) => {
                                  return true;
                                }
                              );

                            return availableMachines?.map((machine) => {
                              const isChecked = formData.assignedMachines.some(
                                (m) => m._id === machine._id
                              );

                              return (
                                <label
                                  key={machine._id}
                                  className={`form-checkbox-option`}
                                >
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => {
                                      setFormData((prev) => ({
                                        ...prev,
                                        assignedMachines: isChecked
                                          ? prev.assignedMachines.filter(
                                              (m) => m._id !== machine._id
                                            )
                                          : [...prev.assignedMachines, machine],
                                      }));
                                    }}
                                  />
                                  <span>
                                    {machine.machineId} - {machine.serialNumber}
                                    <small className="balagruha-name">
                                      ({selectedBalagruha.name})
                                    </small>
                                  </span>
                                </label>
                              );
                            });
                          })
                        ) : (
                          <div className="no-balagruha-message">
                            Please select a Balagruha first to view available
                            machines
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {errors.assignedMachines && (
                    <span className="form-error-message">
                      {errors.assignedMachines}
                    </span>
                  )}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="age">Age *</label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className={errors.age ? "error" : ""}
                      min="1"
                      max="100"
                    />
                    {errors.age && (
                      <span className="error-message">{errors.age}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="gender">Gender *</label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className={errors.gender ? "error" : ""}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && (
                      <span className="error-message">{errors.gender}</span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="parentalStatus">Parental Status *</label>
                  <select
                    id="parentalStatus"
                    name="parentalStatus"
                    value={formData.parentalStatus}
                    onChange={handleInputChange}
                    className={errors.parentalStatus ? "error" : ""}
                  >
                    <option value="">Select Status</option>
                    <option value="has both">Has Both Parents</option>
                    <option value="has one">Has One Parent</option>
                    <option value="has guardian">Has Guardian</option>
                    <option value="has none">Has None</option>
                  </select>
                  {errors.parentalStatus && (
                    <span className="error-message">
                      {errors.parentalStatus}
                    </span>
                  )}
                </div>

                {((formData.parentalStatus && formData.parentalStatus) ===
                  "has one" ||
                  (formData.parentalStatus && formData.parentalStatus) ===
                    "has guardian") && (
                  <>
                    <div className="form-group">
                      <label htmlFor="guardianContact">
                        {formData.parentalStatus === "has one"
                          ? "Parent Name"
                          : "Guardian Name"}{" "}
                        *
                      </label>
                      <input
                        type="text"
                        id="guardianName1"
                        name="guardianName1"
                        value={formData.guardianName1}
                        onChange={handleInputChange}
                        className={errors.guardianName1 ? "error" : ""}
                        placeholder={
                          formData.parentalStatus === "has one"
                            ? "Parent Name"
                            : "Guardian Name"
                        }
                      />
                      {errors.guardianName1 && (
                        <span className="error-message">
                          {errors.guardianName1}
                        </span>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="guardianContact">
                        {formData.parentalStatus === "has one"
                          ? "Parent Contact"
                          : "Guardian Contact"}{" "}
                        *
                      </label>
                      <input
                        type="tel"
                        id="guardianContact1"
                        name="guardianContact1"
                        value={formData.guardianContact1}
                        onChange={handleInputChange}
                        className={errors.guardianContact1 ? "error" : ""}
                        placeholder="10-digit mobile number"
                        pattern="[0-9]{10}"
                      />
                      {errors.guardianContact1 && (
                        <span className="error-message">
                          {errors.guardianContact1}
                        </span>
                      )}
                    </div>
                  </>
                )}

                {(formData.parentalStatus && formData.parentalStatus) ===
                  "has both" && (
                  <>
                    <div className="form-group">
                      <label htmlFor="guardianName1">Fathers Name*</label>
                      <input
                        type="text"
                        id="guardianName1"
                        name="guardianName1"
                        value={formData.guardianName1}
                        onChange={handleInputChange}
                        className={errors.guardianName1 ? "error" : ""}
                        placeholder="Father's Name"
                      />
                      {errors.guardianName1 && (
                        <span className="error-message">
                          {errors.guardianName1}
                        </span>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="guardianContact">
                        Father's Contact *
                      </label>
                      <input
                        type="tel"
                        id="guardianContact1"
                        name="guardianContact1"
                        value={formData.guardianContact1}
                        onChange={handleInputChange}
                        className={errors.guardianContact1 ? "error" : ""}
                        placeholder="Contact No"
                        pattern="[0-9]{10}"
                      />
                      {errors.guardianContact1 && (
                        <span className="error-message">
                          {errors.guardianContact1}
                        </span>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="guardianName2">Mother's Name *</label>
                      <input
                        type="text"
                        id="guardianName2"
                        name="guardianName2"
                        value={formData.guardianName2}
                        onChange={handleInputChange}
                        className={errors.guardianName2 ? "error" : ""}
                        placeholder="Mothers Name"
                      />
                      {errors.guardianName2 && (
                        <span className="error-message">
                          {errors.guardianName2}
                        </span>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="guardianContact2">
                        Mother's Contact *
                      </label>
                      <input
                        type="tel"
                        id="guardianContact2"
                        name="guardianContact2"
                        value={formData.guardianContact2}
                        onChange={handleInputChange}
                        className={errors.guardianContact2 ? "error" : ""}
                        placeholder="10-digit mobile number"
                        pattern="[0-9]{10}"
                      />
                      {errors.guardianContact2 && (
                        <span className="error-message">
                          {errors.guardianContact2}
                        </span>
                      )}
                    </div>
                  </>
                )}

                {/* <div className="form-group">
                            <label htmlFor="nextActionDate">Next Action Date</label>
                            <input
                                type="date"
                                id="nextActionDate"
                                name="nextActionDate"
                                value={formatDateForInput(formData.nextActionDate)}
                                onChange={handleInputChange}
                                className={errors.nextActionDate ? 'error' : ''}
                                placeholder="Next Action Date"

                            />
                            {errors.guardianName1 && <span className="error-message">{errors.guardianName1}</span>}
                        </div> */}

                <div className="form-group">
                  <label>Facial Photo {mode === "add" && "*"}</label>
                  <div className="file-upload-container">
                    <input
                      type="file"
                      ref={fileInputRefs.facialData}
                      onChange={(e) => handleFileChange(e, "facialData")}
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                    <button
                      type="button"
                      className="file-upload-btn"
                      onClick={() => fileInputRefs.facialData.current.click()}
                    >
                      {/* {files.facialData || previews.facialData ? 'Change Photo' : 'Upload Photo'} */}
                      Upload Photo
                    </button>
                    <button
                      type="button"
                      className="file-upload-btn"
                      onClick={() => setIsOpen(true)}
                    >
                      Capture Photo
                    </button>
                    {(files.facialData || previews.facialData) && (
                      <div className="file-preview">
                        <img
                          src={previews.facialData}
                          alt="Facial photo preview"
                          className="preview-image"
                        />
                      </div>
                    )}
                  </div>
                  {errors.facialData && (
                    <span className="error-message">{errors.facialData}</span>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* Medical History Section - REMOVED per Sprint6-Story-02 */}
        {/* Medical history functionality has been replaced with Check-in Form */}

        {/* Sprint6-Story-02-Phase4: Medical Check-ins Section (Inline Form) */}
        {mode === "edit" && formData.role === "student" && (
          <div className="form-section medical-checkins-section">
            <div className="section-header">
              <h3>Medical Check-ins</h3>
              {!showCheckInForm && (
                <button
                  type="button"
                  className="add-medical-btn"
                  onClick={handleCreateCheckIn}
                >
                  + Create New Check-in
                </button>
              )}
            </div>

            {/* Inline Check-in Form */}
            {showCheckInForm && (
              <CheckInForm
                studentData={{
                  studentId: user._id,
                  userName: user.name,
                  balagruhaIds: user.balagruhaIds || [],
                }}
                checkInData={editingCheckIn}
                mode={formMode}
                onSave={handleCheckInSave}
                onCancel={handleCheckInCancel}
                balagruhas={balagruhaOptions}
              />
            )}

            {/* Check-ins List */}
            {!showCheckInForm && (
              <>
                {isLoadingCheckIns ? (
                  <div style={{ padding: "20px", textAlign: "center" }}>
                    Loading check-ins...
                  </div>
                ) : checkIns.length === 0 ? (
                  <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
                    No medical check-ins found for this student.
                  </div>
                ) : (
                  <div className="checkins-list">
                    {checkIns.map((checkIn, index) => (
                      <div key={checkIn._id || index} className="checkin-item">
                        <div className="checkin-header">
                          <span className="checkin-date">
                            {formatCheckInDate(checkIn.date)}
                          </span>
                          <div className="checkin-header-actions">
                            <span className={`health-status ${checkIn.healthStatus}`}>
                              {checkIn.healthStatus}
                            </span>
                            <button
                              type="button"
                              className="edit-checkin-btn"
                              onClick={() => handleEditCheckIn(checkIn)}
                              title="Edit check-in"
                            >
                              ✏️ Edit
                            </button>
                          </div>
                        </div>
                        <div className="checkin-details">
                          {checkIn.temperature && (
                            <p><strong>Temperature:</strong> {checkIn.temperature}°F</p>
                          )}
                          {checkIn.symptoms && checkIn.symptoms.length > 0 && (
                            <p><strong>Symptoms:</strong> {checkIn.symptoms.join(', ')}</p>
                          )}
                          {checkIn.notes && (
                            <p><strong>Notes:</strong> {checkIn.notes}</p>
                          )}
                          {/* Sprint6-Story-02-Phase4-DEBUG: Log check-in data */}
                          {console.log('CheckIn details:', {
                            id: checkIn._id,
                            hasDoctorVisits: !!checkIn.doctorVisits,
                            doctorVisitsLength: checkIn.doctorVisits?.length,
                            doctorVisitsData: checkIn.doctorVisits,
                            hasFollowUps: !!checkIn.followUps,
                            followUpsLength: checkIn.followUps?.length,
                            followUpsData: checkIn.followUps,
                          })}
                          {checkIn.doctorVisits && checkIn.doctorVisits.length > 0 && (
                            <p><strong>Doctor Visits:</strong> {checkIn.doctorVisits.length}</p>
                          )}
                          {checkIn.followUps && checkIn.followUps.length > 0 && (
                            <p><strong>Follow-ups:</strong> {checkIn.followUps.length}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Form Actions */}
        <div className="form-actions">
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : mode === "add"
              ? "Create User"
              : "Save Changes"}
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>

        {errors.submit && <div className="submit-error">{errors.submit}</div>}
      </form>

      {/* Sprint6-Story-02-Phase4: Inline form (no modal needed) */}
    </div>
  );
};

export default UserForm;
