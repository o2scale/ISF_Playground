import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import WallOfFame from "./WallOfFame";
import WTFManagement from "./WTFManagement";
import { useUserRole } from "../../hooks/useUserRole";
import "./WtfDashboard.css";

const WtfDashboard = () => {
  const { isAdmin } = useUserRole();
  const location = useLocation();
  const navigate = useNavigate();
  const [showManagement, setShowManagement] = useState(false);

  // Check URL params to see if we should show management view
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const viewParam = urlParams.get("view");

    if (viewParam === "management" && isAdmin) {
      setShowManagement(true);
    } else {
      setShowManagement(false);
    }
  }, [location.search, isAdmin]);

  const toggleView = () => {
    if (isAdmin) {
      if (showManagement) {
        // Switch to Wall of Fame view
        navigate("/wtf");
      } else {
        // Switch to Management view
        navigate("/wtf?view=management");
      }
    }
  };

  if (showManagement && isAdmin) {
    return (
      <div className="wtf-management">
        <WTFManagement onToggleView={toggleView} />
      </div>
    );
  }

  return (
    <div className="wtf-dashboard h-full w-full">
      <WallOfFame onToggleView={isAdmin ? toggleView : null} />
    </div>
  );
};

export default WtfDashboard;
