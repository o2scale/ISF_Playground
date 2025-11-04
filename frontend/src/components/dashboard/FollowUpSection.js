import React, { useState, useEffect } from "react";
import { getAnyUserBasedonRoleandBalagruha } from "../../api";
import "./FollowUpSection.css";

const FollowUpSection = ({ followUp, balagruhaId, onChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [coaches, setCoaches] = useState([]);

  useEffect(() => {
    if (balagruhaId) {
      fetchCoaches(balagruhaId);
    }
  }, [balagruhaId]);

  const fetchCoaches = async (balId) => {
    try {
      const response = await getAnyUserBasedonRoleandBalagruha("coach", balId);
      if (response.success) {
        setCoaches(response.data.users || []);
      }
    } catch (error) {
      console.error("Error fetching coaches:", error);
      setCoaches([]);
    }
  };

  const handleChange = (field, value) => {
    onChange({
      ...followUp,
      [field]: value,
    });
  };

  const handleCoachToggle = (coachId) => {
    const assignedCoaches = followUp.assignedCoaches || [];
    const newAssignedCoaches = assignedCoaches.includes(coachId)
      ? assignedCoaches.filter((id) => id !== coachId)
      : [...assignedCoaches, coachId];

    onChange({
      ...followUp,
      assignedCoaches: newAssignedCoaches,
    });
  };

  return (
    <div className="follow-up-section">
      <div className="section-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h4>Next Follow-up (Optional)</h4>
        <span className="toggle-icon">{isExpanded ? "▼" : "▶"}</span>
      </div>

      {isExpanded && (
        <div className="section-content">
          <div className="form-group">
            <label>Follow-up Date</label>
            <input
              type="date"
              value={followUp.followUpDate || ""}
              onChange={(e) => handleChange("followUpDate", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Hospital/Location</label>
            <input
              type="text"
              value={followUp.hospital || ""}
              onChange={(e) => handleChange("hospital", e.target.value)}
              placeholder="Enter hospital or location"
            />
          </div>

          <div className="form-group">
            <label>Doctor Name</label>
            <input
              type="text"
              value={followUp.doctor || ""}
              onChange={(e) => handleChange("doctor", e.target.value)}
              placeholder="Enter doctor's name"
            />
          </div>

          <div className="form-group">
            <label>Assign to Coaches</label>
            {coaches.length > 0 ? (
              <div className="coaches-list">
                {coaches.map((coach) => (
                  <label key={coach._id} className="coach-checkbox">
                    <input
                      type="checkbox"
                      checked={followUp.assignedCoaches?.includes(coach._id) || false}
                      onChange={() => handleCoachToggle(coach._id)}
                    />
                    <span>{coach.name}</span>
                  </label>
                ))}
              </div>
            ) : (
              <p className="no-coaches">No coaches available for this Balagruha</p>
            )}
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              value={followUp.status || ""}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default FollowUpSection;
