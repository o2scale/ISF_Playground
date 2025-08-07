import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./WtfDashboard.css";

const WtfDashboard = () => {
  const { user } = useAuth();

  return <div>{/* Empty dashboard - content removed as requested */}</div>;
};

export default WtfDashboard;
