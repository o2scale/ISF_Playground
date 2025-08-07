import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./WtfDashboard.css";

const WtfDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("pins");
  const [pins, setPins] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize dashboard based on user role
    initializeDashboard();
  }, [user]);

  const initializeDashboard = async () => {
    try {
      setLoading(true);
      // TODO: Fetch initial data based on user role
      // For now, we'll show a placeholder
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error initializing WTF dashboard:", error);
      setLoading(false);
    }
  };

  const renderAdminDashboard = () => (
    <div className="wtf-admin-dashboard">
      <div className="wtf-header">
        <h1>🎉 WTF (Wall of Fame) Management</h1>
        <p>Manage pins, review submissions, and track engagement</p>
      </div>

      <div className="wtf-tabs">
        <button
          className={`tab ${activeTab === "pins" ? "active" : ""}`}
          onClick={() => setActiveTab("pins")}
        >
          📌 Pins Management
        </button>
        <button
          className={`tab ${activeTab === "submissions" ? "active" : ""}`}
          onClick={() => setActiveTab("submissions")}
        >
          📝 Submissions Review
        </button>
        <button
          className={`tab ${activeTab === "analytics" ? "active" : ""}`}
          onClick={() => setActiveTab("analytics")}
        >
          📊 Analytics
        </button>
        <button
          className={`tab ${activeTab === "settings" ? "active" : ""}`}
          onClick={() => setActiveTab("settings")}
        >
          ⚙️ Settings
        </button>
      </div>

      <div className="wtf-content">
        {activeTab === "pins" && (
          <div className="pins-section">
            <div className="section-header">
              <h2>Pin Management</h2>
              <button className="create-pin-btn">➕ Create New Pin</button>
            </div>
            <div className="pins-grid">
              <div className="pin-card placeholder">
                <div className="pin-content">
                  <h3>Create Your First Pin</h3>
                  <p>
                    Start building the Wall of Fame by creating engaging content
                  </p>
                  <button className="create-pin-btn">Create Pin</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "submissions" && (
          <div className="submissions-section">
            <div className="section-header">
              <h2>Submissions Review</h2>
              <div className="submission-filters">
                <select className="filter-select">
                  <option value="all">All Submissions</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
            <div className="submissions-list">
              <div className="submission-card placeholder">
                <h3>No Submissions Yet</h3>
                <p>Student submissions will appear here for review</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="analytics-section">
            <div className="section-header">
              <h2>WTF Analytics</h2>
            </div>
            <div className="analytics-grid">
              <div className="analytics-card">
                <h3>Total Pins</h3>
                <div className="analytics-value">0</div>
              </div>
              <div className="analytics-card">
                <h3>Total Interactions</h3>
                <div className="analytics-value">0</div>
              </div>
              <div className="analytics-card">
                <h3>Pending Submissions</h3>
                <div className="analytics-value">0</div>
              </div>
              <div className="analytics-card">
                <h3>Active Users</h3>
                <div className="analytics-value">0</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="settings-section">
            <div className="section-header">
              <h2>WTF Settings</h2>
            </div>
            <div className="settings-content">
              <div className="setting-group">
                <h3>Pin Lifecycle</h3>
                <div className="setting-item">
                  <label>Pin Expiration (days):</label>
                  <input type="number" defaultValue="7" min="1" max="30" />
                </div>
                <div className="setting-item">
                  <label>Max Pins Displayed:</label>
                  <input type="number" defaultValue="20" min="10" max="50" />
                </div>
              </div>
              <div className="setting-group">
                <h3>Coin Rewards</h3>
                <div className="setting-item">
                  <label>Pin Creation Reward:</label>
                  <input type="number" defaultValue="10" min="1" max="50" />
                </div>
                <div className="setting-item">
                  <label>Like Reward:</label>
                  <input type="number" defaultValue="1" min="1" max="10" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderStudentDashboard = () => (
    <div className="wtf-student-dashboard">
      <div className="wtf-header">
        <h1>🎉 WTF (Wall of Fame)</h1>
        <p>Share your achievements and see what others are creating!</p>
      </div>

      <div className="wtf-tabs">
        <button
          className={`tab ${activeTab === "pins" ? "active" : ""}`}
          onClick={() => setActiveTab("pins")}
        >
          📌 View Pins
        </button>
        <button
          className={`tab ${activeTab === "submit" ? "active" : ""}`}
          onClick={() => setActiveTab("submit")}
        >
          ✍️ Submit Content
        </button>
        <button
          className={`tab ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          👤 My Profile
        </button>
      </div>

      <div className="wtf-content">
        {activeTab === "pins" && (
          <div className="pins-section">
            <div className="section-header">
              <h2>Featured Pins</h2>
              <div className="pin-filters">
                <select className="filter-select">
                  <option value="all">All Types</option>
                  <option value="text">Text</option>
                  <option value="image">Images</option>
                  <option value="video">Videos</option>
                  <option value="audio">Audio</option>
                </select>
              </div>
            </div>
            <div className="pins-grid">
              <div className="pin-card placeholder">
                <div className="pin-content">
                  <h3>Welcome to WTF!</h3>
                  <p>
                    Be the first to create amazing content and get featured here
                  </p>
                  <button className="create-pin-btn">
                    Create Your First Pin
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "submit" && (
          <div className="submit-section">
            <div className="section-header">
              <h2>Submit Your Content</h2>
            </div>
            <div className="submit-options">
              <div className="submit-card">
                <h3>📝 Write an Article</h3>
                <p>Share your thoughts, stories, or experiences</p>
                <button className="submit-btn">Write Article</button>
              </div>
              <div className="submit-card">
                <h3>🎤 Record Voice Note</h3>
                <p>Share your voice and ideas</p>
                <button className="submit-btn">Record Voice</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="profile-section">
            <div className="section-header">
              <h2>My WTF Profile</h2>
            </div>
            <div className="profile-content">
              <div className="profile-stats">
                <div className="stat-card">
                  <h3>My Submissions</h3>
                  <div className="stat-value">0</div>
                </div>
                <div className="stat-card">
                  <h3>Total Likes</h3>
                  <div className="stat-value">0</div>
                </div>
                <div className="stat-card">
                  <h3>Coins Earned</h3>
                  <div className="stat-value">0</div>
                </div>
              </div>
              <div className="my-submissions">
                <h3>My Submissions</h3>
                <div className="submissions-list">
                  <div className="submission-card placeholder">
                    <h3>No Submissions Yet</h3>
                    <p>Start creating content to see your submissions here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="wtf-loading">
        <div className="loading-spinner"></div>
        <p>Loading WTF Dashboard...</p>
      </div>
    );
  }

  // Render different dashboard based on user role
  const isAdmin =
    user?.role === "admin" ||
    user?.role === "coach" ||
    user?.role === "balagruha-incharge";

  return (
    <div className="wtf-dashboard">
      {isAdmin ? renderAdminDashboard() : renderStudentDashboard()}
    </div>
  );
};

export default WtfDashboard;
