import React, { useState } from "react";
import WallOfFame from "./WallOfFame";
import WTFManagement from "./WTFManagement";
import { useUserRole } from "../../hooks/useUserRole";
import "./WtfDashboard.css";

const WtfDashboard = () => {
  const { isAdmin } = useUserRole();
  const [showManagement, setShowManagement] = useState(false);

  // Check URL params to see if we should show management view
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("view") === "management" && isAdmin) {
      setShowManagement(true);
    }
  }, [isAdmin]);

  if (showManagement && isAdmin) {
    return <WTFManagement />;
  }

  return (
    <div className="wtf-dashboard h-screen bg-gray-100">
      <WallOfFame />
    </div>
  );
};

export default WtfDashboard;
