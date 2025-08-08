import React, { useState, useEffect } from "react";
import {
  Star,
  Plus,
  Eye,
  Edit,
  Trash2,
  Clock,
  User,
  Heart,
  ThumbsUp,
  Filter,
  Search,
  Bell,
  Archive,
  Play,
  FileText,
  Image as ImageIcon,
  Video,
  Volume2,
  ExternalLink,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { Button } from "../ui/button.jsx";
import { Badge } from "../ui/badge.jsx";
import CreateNewPinModal from "./CreateNewPinModal";
import PinEditModal from "./PinEditModal";
import ReviewModal from "./ReviewModal";
import CoachSuggestionReviewModal from "./CoachSuggestionReviewModal";
import {
  createWtfPin,
  getActiveWtfPins,
  updateWtfPin,
  deleteWtfPin,
  changeWtfPinStatus,
  getSubmissionsForReview,
  reviewSubmission,
  getWtfAnalytics,
  getWtfTransactionHistory,
  getWtfDashboardMetrics,
  getActivePinsCount,
  getWtfTotalEngagement,
  getCoachSuggestionsCount,
  getCoachSuggestions,
} from "../../api";

const WTFManagement = ({ onToggleView }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [submissionTab, setSubmissionTab] = useState("voice");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPin, setSelectedPin] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedCoachSuggestion, setSelectedCoachSuggestion] = useState(null);
  const [showCoachSuggestionModal, setShowCoachSuggestionModal] =
    useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Real data from API
  const [activePins, setActivePins] = useState([]);
  const [pendingSuggestions, setPendingSuggestions] = useState([]);
  const [studentSubmissions, setStudentSubmissions] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [dashboardMetrics, setDashboardMetrics] = useState({
    activePins: 0,
    coachSuggestions: 0,
    studentSubmissions: 0,
    totalEngagement: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    fetchWtfData();
  }, []);

  const fetchWtfData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch active pins
      const pinsResponse = await getActiveWtfPins({
        page: 1,
        limit: 20,
        type: filterType === "all" ? null : filterType,
      });
      if (pinsResponse.success) {
        setActivePins(pinsResponse.data || []);
      }

      // Fetch submissions for review
      const submissionsResponse = await getSubmissionsForReview({
        page: 1,
        limit: 20,
        type: submissionTab,
      });
      if (submissionsResponse.success) {
        setStudentSubmissions(submissionsResponse.data || []);
      }

      // Fetch coach suggestions
      const coachSuggestionsResponse = await getCoachSuggestions({
        page: 1,
        limit: 20,
      });
      if (coachSuggestionsResponse.success) {
        setCoachSuggestions(coachSuggestionsResponse.data || []);
      }

      // Fetch analytics
      const analyticsResponse = await getWtfAnalytics();
      if (analyticsResponse.success) {
        setAnalytics(analyticsResponse.data || {});
      }

      // Fetch dashboard metrics
      try {
        const [
          activePinsCount,
          coachSuggestionsCount,
          totalEngagementResponse,
        ] = await Promise.all([
          getActivePinsCount(),
          getCoachSuggestionsCount(),
          getWtfTotalEngagement(),
        ]);

        setDashboardMetrics({
          activePins: activePinsCount,
          coachSuggestions: coachSuggestionsCount,
          studentSubmissions: studentSubmissions.filter(
            (s) => s.status === "NEW"
          ).length,
          totalEngagement:
            totalEngagementResponse?.data?.totalViews ||
            totalEngagementResponse?.data?.totalSeen ||
            0,
        });
      } catch (metricsError) {
        console.error("Error fetching dashboard metrics:", metricsError);
        // Fallback to local calculations
        setDashboardMetrics({
          activePins: activePins.filter((p) => p.status === "ACTIVE").length,
          coachSuggestions: pendingSuggestions.length,
          studentSubmissions: studentSubmissions.filter(
            (s) => s.status === "NEW"
          ).length,
          totalEngagement: activePins.reduce(
            (acc, pin) => acc + (pin.views || 0),
            0
          ),
        });
      }
    } catch (error) {
      console.error("Error fetching WTF data:", error);
      setError("Failed to load WTF data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getContentTypeIcon = (type) => {
    switch (type) {
      case "image":
        return <ImageIcon className="w-4 h-4" />;
      case "video":
        return <Video className="w-4 h-4" />;
      case "audio":
        return <Volume2 className="w-4 h-4" />;
      case "text":
        return <FileText className="w-4 h-4" />;
      case "link":
        return <ExternalLink className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const handleUnpin = async (pinId) => {
    if (window.confirm("Are you sure you want to unpin this content?")) {
      try {
        const response = await changeWtfPinStatus(pinId, "UNPINNED");
        if (response.success) {
          setActivePins((prev) =>
            prev.map((pin) =>
              pin._id === pinId ? { ...pin, status: "UNPINNED" } : pin
            )
          );
        }
      } catch (error) {
        console.error("Error unpinning pin:", error);
        setError("Failed to unpin content. Please try again.");
      }
    }
  };

  const handleDelete = async (pinId) => {
    if (
      window.confirm(
        "Are you sure you want to permanently delete this pin? This action cannot be undone."
      )
    ) {
      try {
        const response = await deleteWtfPin(pinId);
        if (response.success) {
          setActivePins((prev) => prev.filter((pin) => pin._id !== pinId));
        }
      } catch (error) {
        console.error("Error deleting pin:", error);
        setError("Failed to delete pin. Please try again.");
      }
    }
  };

  const handleEdit = (pin) => {
    setSelectedPin(pin);
    setShowEditModal(true);
  };

  const handleCreatePin = async (newPin) => {
    try {
      const response = await createWtfPin(newPin);
      if (response.success) {
        setActivePins((prev) => [response.data, ...prev]);
        setShowCreateModal(false);
      }
    } catch (error) {
      console.error("Error creating pin:", error);
      setError("Failed to create pin. Please try again.");
    }
  };

  const handleUpdatePin = async (updatedPin) => {
    try {
      const response = await updateWtfPin(updatedPin._id, updatedPin);
      if (response.success) {
        setActivePins((prev) =>
          prev.map((p) => (p._id === updatedPin._id ? response.data : p))
        );
        setShowEditModal(false);
        setSelectedPin(null);
      }
    } catch (error) {
      console.error("Error updating pin:", error);
      setError("Failed to update pin. Please try again.");
    }
  };

  const handleReviewSubmission = (submission) => {
    setSelectedSubmission(submission);
    setShowReviewModal(true);
  };

  const handlePinToWTF = async (submission) => {
    try {
      // First approve the submission
      const reviewResponse = await reviewSubmission(submission._id, {
        action: "approve",
        notes: "Approved and pinned to WTF",
      });

      if (reviewResponse.success) {
        // Create a new pin from the approved submission
        const newPin = {
          title: submission.title,
          caption: `Student submission by ${submission.studentName}`,
          contentType: submission.type === "voice" ? "audio" : "text",
          content: submission.content,
          originalAuthor: submission.studentName,
          isOfficial: false,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
        };

        const pinResponse = await createWtfPin(newPin);
        if (pinResponse.success) {
          setActivePins((prev) => [pinResponse.data, ...prev]);
          setStudentSubmissions((prev) =>
            prev.filter((s) => s._id !== submission._id)
          );
          setShowReviewModal(false);
          setSelectedSubmission(null);
        }
      }
    } catch (error) {
      console.error("Error pinning submission to WTF:", error);
      setError("Failed to pin submission to WTF. Please try again.");
    }
  };

  const handleArchiveSubmission = async (submissionId) => {
    try {
      const response = await reviewSubmission(submissionId, {
        action: "reject",
        notes: "Archived by admin",
      });

      if (response.success) {
        setStudentSubmissions((prev) =>
          prev.filter((s) => s._id !== submissionId)
        );
        setShowReviewModal(false);
        setSelectedSubmission(null);
      }
    } catch (error) {
      console.error("Error archiving submission:", error);
      setError("Failed to archive submission. Please try again.");
    }
  };

  // Coach Suggestions Data
  const [coachSuggestions, setCoachSuggestions] = useState([]);

  const handleReviewCoachSuggestion = (suggestion) => {
    setSelectedCoachSuggestion(suggestion);
    setShowCoachSuggestionModal(true);
  };

  const handlePinCoachSuggestion = (suggestion) => {
    console.log("Pin coach suggestion:", suggestion);
    // Update suggestion status
    setCoachSuggestions((prev) =>
      prev.map((s) => (s.id === suggestion.id ? { ...s, status: "PINNED" } : s))
    );

    // Create a new pin from the suggestion
    const newPin = {
      id: Date.now(),
      title: suggestion.title,
      caption: `Student work by ${suggestion.studentName} - suggested by ${suggestion.coachName}`,
      contentType: suggestion.workType.toLowerCase().includes("video")
        ? "video"
        : suggestion.workType.toLowerCase().includes("audio")
        ? "audio"
        : suggestion.workType.toLowerCase().includes("artwork")
        ? "image"
        : "text",
      content: suggestion.content,
      pinnedDate: new Date().toISOString().split("T")[0],
      pinnedBy: "Admin User",
      originalAuthor: suggestion.studentName,
      isOfficial: false,
      status: "ACTIVE",
      likes: 0,
      hearts: 0,
      views: 0,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    };
    setActivePins((prev) => [newPin, ...prev]);
    setShowCoachSuggestionModal(false);
    setSelectedCoachSuggestion(null);
  };

  const handleArchiveCoachSuggestion = (suggestionId) => {
    console.log("Archive coach suggestion:", suggestionId);
    setCoachSuggestions((prev) =>
      prev.map((s) =>
        s.id === suggestionId ? { ...s, status: "REVIEWED" } : s
      )
    );
    setShowCoachSuggestionModal(false);
    setSelectedCoachSuggestion(null);
  };

  const filteredPins = activePins.filter((pin) => {
    const matchesSearch =
      pin.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pin.caption?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterType === "all" || pin.contentType === filterType;
    return matchesSearch && matchesFilter && pin.status === "ACTIVE";
  });

  const newSubmissionsCount = studentSubmissions.filter(
    (s) => s.status === "NEW"
  ).length;
  const pendingCoachSuggestionsCount = coachSuggestions.filter(
    (s) => s.status === "PENDING"
  ).length; // Real data from API

  return (
    <div className="min-h-screen bg-gray-50 p-6 w-full">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Star className="w-8 h-8 text-yellow-500" />
              WTF Management Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Curate and manage Wall of Fame content
            </p>
          </div>

          <div className="flex items-center gap-3">
            {onToggleView && (
              <Button
                onClick={onToggleView}
                variant="outline"
                className="text-gray-600 hover:text-gray-900"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Wall of Fame
              </Button>
            )}
            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Pin
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Pins</p>
                <div className="text-2xl font-bold text-green-600">
                  {dashboardMetrics.activePins}
                </div>
                <p className="text-xs text-gray-500 mt-1">of 20 maximum</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Coach Suggestions
                </p>
                <div className="text-2xl font-bold text-orange-600 flex items-center gap-2">
                  {dashboardMetrics.coachSuggestions}
                  {dashboardMetrics.coachSuggestions > 0 && (
                    <Bell className="w-4 h-4" />
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">from coaches</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Bell className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Student Submissions
                </p>
                <div className="text-2xl font-bold text-blue-600 flex items-center gap-2">
                  {dashboardMetrics.studentSubmissions}
                  {dashboardMetrics.studentSubmissions > 0 && (
                    <Bell className="w-4 h-4" />
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">awaiting review</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <User className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Engagement
                </p>
                <div className="text-2xl font-bold text-purple-600">
                  {dashboardMetrics.totalEngagement}
                </div>
                <p className="text-xs text-gray-500 mt-1">total views</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <ThumbsUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow border">
          <div className="border-b">
            <div className="flex space-x-8 p-6">
              {[
                { id: "dashboard", label: "Pin Management", count: null },
                {
                  id: "coach-suggestions",
                  label: "Coach Suggestions",
                  count:
                    pendingCoachSuggestionsCount > 0
                      ? pendingCoachSuggestionsCount
                      : null,
                },
                {
                  id: "submissions",
                  label: "Student Submissions",
                  count: newSubmissionsCount > 0 ? newSubmissionsCount : null,
                },
                { id: "analytics", label: "Analytics", count: null },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    activeTab === tab.id
                      ? "border-purple-500 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                  {tab.count && tab.count > 0 && (
                    <Badge
                      className={`text-xs ${
                        tab.id === "coach-suggestions"
                          ? "bg-orange-500 text-white"
                          : "bg-blue-500 text-white"
                      }`}
                    >
                      {tab.count}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "dashboard" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Active WTF Pins</h3>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search pins..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-14 pr-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        style={{
                          width: "300px",
                          minWidth: "300px",
                          textIndent: "28px",
                        }}
                      />
                    </div>
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent min-w-32"
                    >
                      <option value="all">All Types</option>
                      <option value="text">Text</option>
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                      <option value="audio">Audio</option>
                      <option value="link">Link</option>
                    </select>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                          Content
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                          Type
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                          Author
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                          Pinned Date
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                          Expires
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                          Engagement
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPins.map((pin) => (
                        <tr
                          key={pin.id}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              {pin.thumbnail && (
                                <img
                                  src={pin.thumbnail}
                                  alt=""
                                  className="w-10 h-10 rounded object-cover"
                                />
                              )}
                              <div>
                                <div className="font-medium text-gray-900">
                                  {pin.title}
                                </div>
                                {pin.caption && (
                                  <div className="text-sm text-gray-500">
                                    {pin.caption}
                                  </div>
                                )}
                                {pin.isOfficial && (
                                  <Badge className="mt-1 bg-purple-100 text-purple-800">
                                    ISF Official
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              {getContentTypeIcon(pin.contentType)}
                              <span className="capitalize text-gray-700">
                                {pin.contentType}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div>
                              <div className="font-medium text-gray-900">
                                {pin.originalAuthor || "Admin"}
                              </div>
                              <div className="text-sm text-gray-500">
                                by {pin.pinnedBy}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-gray-700">
                            {new Date(pin.pinnedDate).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-1 text-orange-600">
                              <Clock className="w-4 h-4" />
                              <span className="text-sm">
                                {new Date(pin.expiresAt).toLocaleDateString()}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-700">
                                  {pin.views}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Heart className="w-4 h-4 text-red-500" />
                                <span className="text-gray-700">
                                  {pin.hearts}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <ThumbsUp className="w-4 h-4 text-blue-500" />
                                <span className="text-gray-700">
                                  {pin.likes}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(pin)}
                                className="text-gray-600 hover:text-gray-900"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUnpin(pin.id)}
                                className="text-gray-600 hover:text-gray-900"
                              >
                                <Archive className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDelete(pin.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* No Data State */}
                  {filteredPins.length === 0 && (
                    <div className="text-center py-12">
                      <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
                        <div className="text-6xl mb-4">📌</div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                          No Active Pins Yet
                        </h3>
                        <p className="text-gray-600 mb-6">
                          The Wall of Fame is waiting for amazing content!
                          Create the first pin to get started, or review pending
                          submissions to add them to the Wall of Fame.
                        </p>
                        <div className="flex gap-3 justify-center">
                          <Button
                            onClick={() => setShowCreateModal(true)}
                            className="bg-purple-600 hover:bg-purple-700 text-white"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Create First Pin
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setActiveTab("coach-suggestions")}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Review Submissions
                          </Button>
                        </div>
                        <div className="text-sm text-gray-500 mt-4">
                          💡 Tip: You can also review student submissions and
                          coach suggestions to add content to the Wall of Fame
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "coach-suggestions" && (
              <div className="space-y-6">
                {/* Coach Suggestions Queue */}
                <div className="bg-white">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <h3 className="text-lg font-semibold">
                      Coach Suggestions for WTF (
                      {
                        coachSuggestions.filter((s) => s.status === "PENDING")
                          .length
                      }{" "}
                      Pending)
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Review student work suggested by coaches for the Wall of
                    Fame
                  </p>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-medium text-gray-900">
                            Student Work
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">
                            Work Type
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">
                            Student & Balagruha
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">
                            Suggested By
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">
                            Date
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {coachSuggestions
                          .filter((s) => s.status === "PENDING")
                          .map((suggestion) => (
                            <tr
                              key={suggestion.id}
                              className="border-b border-gray-100 hover:bg-gray-50"
                            >
                              <td className="py-4 px-4">
                                <div className="flex items-start gap-3">
                                  {suggestion.thumbnail && (
                                    <img
                                      src={suggestion.thumbnail}
                                      alt=""
                                      className="w-12 h-12 rounded object-cover"
                                    />
                                  )}
                                  <div>
                                    <div className="font-medium">
                                      {suggestion.title}
                                    </div>
                                    <div className="text-sm text-gray-500 line-clamp-2">
                                      {suggestion.content.length > 100
                                        ? `${suggestion.content.substring(
                                            0,
                                            100
                                          )}...`
                                        : suggestion.content}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <Badge className="bg-blue-100 text-blue-800 flex items-center gap-1 w-fit">
                                  <FileText className="w-3 h-3" />
                                  {suggestion.workType}
                                </Badge>
                              </td>
                              <td className="py-4 px-4">
                                <div className="text-sm">
                                  <div className="font-medium flex items-center gap-1">
                                    <User className="w-3 h-3" />
                                    {suggestion.studentName}
                                  </div>
                                  <div className="text-gray-500">
                                    {suggestion.balagruha}
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="text-sm">
                                  <div className="font-medium">
                                    {suggestion.coachName}
                                  </div>
                                  <div className="text-gray-500">Coach</div>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                  <Calendar className="w-3 h-3" />
                                  {new Date(
                                    suggestion.suggestedDate
                                  ).toLocaleDateString()}
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center gap-2">
                                  <Button
                                    size="sm"
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                    onClick={() =>
                                      handleReviewCoachSuggestion(suggestion)
                                    }
                                  >
                                    <Eye className="w-4 h-4 mr-1" />
                                    Review & Pin
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() =>
                                      handleArchiveCoachSuggestion(
                                        suggestion.id
                                      )
                                    }
                                  >
                                    <Archive className="w-4 h-4 mr-1" />
                                    Archive
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>

                    {/* No Coach Suggestions State */}
                    {coachSuggestions.filter((s) => s.status === "PENDING")
                      .length === 0 && (
                      <div className="text-center py-12">
                        <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
                          <div className="text-6xl mb-4">🎯</div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            No Coach Suggestions Yet
                          </h3>
                          <p className="text-gray-600 mb-6">
                            Coaches haven't suggested any student work for the
                            Wall of Fame yet. When they do, you'll see them here
                            for review.
                          </p>
                          <div className="flex gap-3 justify-center">
                            <Button
                              onClick={() => setShowCreateModal(true)}
                              className="bg-purple-600 hover:bg-purple-700 text-white"
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Create Pin Manually
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() =>
                                setActiveTab("student-submissions")
                              }
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Check Student Submissions
                            </Button>
                          </div>
                          <div className="text-sm text-gray-500 mt-4">
                            💡 Tip: Coaches can suggest exceptional student work
                            to be featured on the Wall of Fame
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Recent Activity */}
                {coachSuggestions.filter((s) => s.status !== "PENDING").length >
                  0 && (
                  <div className="bg-white rounded-lg border p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <h3 className="text-lg font-semibold">
                        Recent Coach Suggestion Activity
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {coachSuggestions
                        .filter((s) => s.status !== "PENDING")
                        .slice(0, 5)
                        .map((suggestion) => (
                          <div
                            key={suggestion.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  suggestion.status === "PINNED"
                                    ? "bg-green-500"
                                    : "bg-gray-400"
                                }`}
                              />
                              <div>
                                <span className="font-medium">
                                  {suggestion.title}
                                </span>
                                <span className="text-gray-500 text-sm ml-2">
                                  by {suggestion.studentName} • suggested by{" "}
                                  {suggestion.coachName}
                                </span>
                              </div>
                            </div>
                            <Badge
                              className={
                                suggestion.status === "PINNED"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-800"
                              }
                            >
                              {suggestion.status === "PINNED"
                                ? "Pinned"
                                : "Archived"}
                            </Badge>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* How it works */}
                <div className="bg-white rounded-lg border p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <h3 className="text-lg font-semibold">
                      How Coach Suggestions Work
                    </h3>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>
                      • Coaches can suggest student work by clicking the
                      "Suggest for WTF" button while reviewing assignments
                    </div>
                    <div>
                      • Suggested content appears here for admin review and
                      approval
                    </div>
                    <div>
                      • Clicking "Review & Pin" will feature the content on the
                      Wall of Fame
                    </div>
                    <div>
                      • Both the student and suggesting coach receive
                      notifications when content is pinned
                    </div>
                    <div>
                      • Students earn ISF coins when their work is featured
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "submissions" && (
              <div className="space-y-6">
                {/* Student Submissions Queue */}
                <div className="bg-white">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-blue-500" />
                    <h3 className="text-lg font-semibold">
                      Student Submissions Queue
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Review student-submitted voice notes and articles for
                    potential WTF featuring
                  </p>

                  {/* Sub-tabs */}
                  <div className="flex space-x-1 mb-6">
                    <button
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        submissionTab === "voice"
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      onClick={() => setSubmissionTab("voice")}
                    >
                      ▷ Voice Notes
                      <Badge className="ml-2 bg-red-500 text-white text-xs">
                        1
                      </Badge>
                    </button>
                    <button
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        submissionTab === "articles"
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      onClick={() => setSubmissionTab("articles")}
                    >
                      Articles
                      <Badge className="ml-2 bg-red-500 text-white text-xs">
                        1
                      </Badge>
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    {submissionTab === "voice" ? (
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 font-medium text-gray-900">
                              Voice Note
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">
                              Balagruha
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">
                              Submitted
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">
                              Status
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {studentSubmissions
                            .filter(
                              (s) => s.status === "NEW" && s.type === "voice"
                            )
                            .map((submission) => (
                              <tr
                                key={submission.id}
                                className="border-b border-gray-100 hover:bg-gray-50"
                              >
                                <td className="py-4 px-4">
                                  <div>
                                    <div className="font-medium">
                                      {submission.title}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {submission.studentName}
                                    </div>
                                  </div>
                                </td>
                                <td className="py-4 px-4">
                                  <div className="text-sm">
                                    {submission.balagruha}
                                  </div>
                                </td>
                                <td className="py-4 px-4">
                                  <div className="flex items-center gap-1 text-sm text-gray-600">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(
                                      submission.createdAt
                                    ).toLocaleDateString()}
                                  </div>
                                </td>
                                <td className="py-4 px-4">
                                  <Badge className="bg-green-100 text-green-800">
                                    {submission.status}
                                  </Badge>
                                </td>
                                <td className="py-4 px-4">
                                  <div className="flex items-center gap-2">
                                    <Button
                                      size="sm"
                                      className="bg-blue-600 hover:bg-blue-700 text-white"
                                      onClick={() =>
                                        handleReviewSubmission(submission)
                                      }
                                    >
                                      <Eye className="w-4 h-4 mr-1" />
                                      Review
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        handleArchiveSubmission(submission.id)
                                      }
                                    >
                                      <Archive className="w-4 h-4 mr-1" />
                                      Archive
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    ) : (
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 font-medium text-gray-900">
                              Article
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">
                              Balagruha
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">
                              Submitted
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">
                              Status
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {studentSubmissions
                            .filter(
                              (s) => s.status === "NEW" && s.type === "article"
                            )
                            .map((submission) => (
                              <tr
                                key={submission.id}
                                className="border-b border-gray-100 hover:bg-gray-50"
                              >
                                <td className="py-4 px-4">
                                  <div>
                                    <div className="font-medium">
                                      {submission.title}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {submission.studentName}
                                    </div>
                                  </div>
                                </td>
                                <td className="py-4 px-4">
                                  <div className="text-sm">
                                    {submission.balagruha}
                                  </div>
                                </td>
                                <td className="py-4 px-4">
                                  <div className="flex items-center gap-1 text-sm text-gray-600">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(
                                      submission.createdAt
                                    ).toLocaleDateString()}
                                  </div>
                                </td>
                                <td className="py-4 px-4">
                                  <Badge className="bg-green-100 text-green-800">
                                    {submission.status}
                                  </Badge>
                                </td>
                                <td className="py-4 px-4">
                                  <div className="flex items-center gap-2">
                                    <Button
                                      size="sm"
                                      className="bg-blue-600 hover:bg-blue-700 text-white"
                                      onClick={() =>
                                        handleReviewSubmission(submission)
                                      }
                                    >
                                      <Eye className="w-4 h-4 mr-1" />
                                      Review
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        handleArchiveSubmission(submission.id)
                                      }
                                    >
                                      <Archive className="w-4 h-4 mr-1" />
                                      Archive
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    )}

                    {/* No Student Submissions State */}
                    {studentSubmissions.filter((s) => s.status === "NEW")
                      .length === 0 && (
                      <div className="text-center py-12">
                        <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
                          <div className="text-6xl mb-4">📝</div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            No Student Submissions Yet
                          </h3>
                          <p className="text-gray-600 mb-6">
                            Students haven't submitted any voice notes or
                            articles for review yet. When they do, you'll see
                            them here to potentially feature on the Wall of
                            Fame.
                          </p>
                          <div className="flex gap-3 justify-center">
                            <Button
                              onClick={() => setShowCreateModal(true)}
                              className="bg-purple-600 hover:bg-purple-700 text-white"
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Create Pin Manually
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setActiveTab("coach-suggestions")}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Check Coach Suggestions
                            </Button>
                          </div>
                          <div className="text-sm text-gray-500 mt-4">
                            💡 Tip: Students can submit voice notes and articles
                            through their learning interfaces
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Review Process */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-green-600" />
                    <h3 className="text-lg font-semibold text-green-800">
                      Student Submission Review Process
                    </h3>
                  </div>
                  <div className="space-y-2 text-sm text-green-700">
                    <div>
                      • Students can submit voice notes and articles through
                      their learning interfaces
                    </div>
                    <div>
                      • All submissions appear here for admin review and
                      approval
                    </div>
                    <div>
                      • Use the embedded players/readers to experience the
                      content as students intended
                    </div>
                    <div>
                      • Pin exceptional content to the WTF or archive
                      submissions that don't meet criteria
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "analytics" && (
              <div className="bg-white rounded-lg border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <h3 className="text-lg font-semibold">
                    WTF Analytics & Insights
                  </h3>
                </div>
                <div className="text-center py-12">
                  <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Analytics dashboard coming soon...
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    Track engagement, popular content types, and user
                    interactions
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create New Pin Modal */}
      <CreateNewPinModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreatePin={handleCreatePin}
      />

      {/* Edit Pin Modal */}
      <PinEditModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedPin(null);
        }}
        pin={selectedPin}
        onUpdatePin={handleUpdatePin}
      />

      {/* Review Submission Modal */}
      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => {
          setShowReviewModal(false);
          setSelectedSubmission(null);
        }}
        submission={selectedSubmission}
        onPinToWTF={handlePinToWTF}
        onArchive={handleArchiveSubmission}
      />

      {/* Coach Suggestion Review Modal */}
      <CoachSuggestionReviewModal
        isOpen={showCoachSuggestionModal}
        onClose={() => {
          setShowCoachSuggestionModal(false);
          setSelectedCoachSuggestion(null);
        }}
        suggestion={selectedCoachSuggestion}
        onPinToWTF={handlePinCoachSuggestion}
        onArchive={handleArchiveCoachSuggestion}
      />
    </div>
  );
};

export default WTFManagement;
