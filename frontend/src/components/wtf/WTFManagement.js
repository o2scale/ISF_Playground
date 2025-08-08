import React, { useState } from "react";
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

const WTFManagement = ({ onToggleView }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [submissionTab, setSubmissionTab] = useState("voice");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPin, setSelectedPin] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Sample data
  const [activePins, setActivePins] = useState([
    {
      id: 1,
      title: "Amazing Art Creation",
      caption: "Beautiful artwork by our talented student",
      contentType: "image",
      content:
        "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500",
      thumbnail:
        "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=200",
      pinnedDate: "2025-01-01",
      pinnedBy: "Admin User",
      originalAuthor: "Sarah Johnson",
      isOfficial: false,
      status: "ACTIVE",
      likes: 25,
      hearts: 18,
      views: 156,
      expiresAt: "2025-01-08",
    },
    {
      id: 2,
      title: "Weekly Announcement",
      caption: "Important updates for all students",
      contentType: "text",
      content: "Dear Students, we have exciting updates...",
      pinnedDate: "2025-01-02",
      pinnedBy: "Admin User",
      isOfficial: true,
      status: "ACTIVE",
      likes: 12,
      hearts: 8,
      views: 89,
      expiresAt: "2025-01-09",
    },
  ]);

  const [pendingSuggestions] = useState([
    {
      id: 1,
      studentName: "Arjun Sharma",
      coachName: "Ms. Priya",
      contentType: "Art",
      title: "Nature Painting",
      content: "Beautiful landscape painting",
      suggestedDate: "2025-01-03",
      status: "PENDING",
    },
  ]);

  const [studentSubmissions] = useState([
    {
      id: 1,
      studentName: "Kavya Patel",
      balagruha: "Wisdom House",
      type: "voice",
      title: "My Experience with Science",
      content: "voice-recording-url",
      submissionDate: "2025-01-04",
      status: "NEW",
    },
    {
      id: 2,
      studentName: "Rohit Kumar",
      balagruha: "Knowledge House",
      type: "article",
      title: "The Importance of Reading",
      content: "Reading is fundamental to learning...",
      submissionDate: "2025-01-03",
      status: "NEW",
    },
  ]);

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

  const handleUnpin = (pinId) => {
    if (window.confirm("Are you sure you want to unpin this content?")) {
      setActivePins((prev) =>
        prev.map((pin) =>
          pin.id === pinId ? { ...pin, status: "UNPINNED" } : pin
        )
      );
    }
  };

  const handleDelete = (pinId) => {
    if (
      window.confirm(
        "Are you sure you want to permanently delete this pin? This action cannot be undone."
      )
    ) {
      setActivePins((prev) => prev.filter((pin) => pin.id !== pinId));
    }
  };

  const handleEdit = (pin) => {
    setSelectedPin(pin);
    setShowEditModal(true);
  };

  const handleCreatePin = (newPin) => {
    setActivePins((prev) => [newPin, ...prev]);
    setShowCreateModal(false);
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
  const pendingCoachSuggestionsCount = 3; // Mock data

  return (
    <div className="p-6 w-full max-w-screen-xl mx-auto">
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
                {activePins.filter((p) => p.status === "ACTIVE").length}
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
                {pendingCoachSuggestionsCount}
                {pendingCoachSuggestionsCount > 0 && (
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
                {newSubmissionsCount}
                {newSubmissionsCount > 0 && <Bell className="w-4 h-4" />}
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
                {activePins.reduce((acc, pin) => acc + pin.views, 0)}
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
                count: pendingCoachSuggestionsCount,
              },
              {
                id: "submissions",
                label: "Student Submissions",
                count: newSubmissionsCount,
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
                              <span className="text-gray-700">{pin.views}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4 text-red-500" />
                              <span className="text-gray-700">
                                {pin.hearts}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="w-4 h-4 text-blue-500" />
                              <span className="text-gray-700">{pin.likes}</span>
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
              </div>
            </div>
          )}

          {activeTab === "coach-suggestions" && (
            <div className="space-y-6">
              {/* Coach Suggestions Queue */}
              <div className="bg-white rounded-lg border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <h3 className="text-lg font-semibold">
                    Coach Suggestions for WTF (2 Pending)
                  </h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Review student work suggested by coaches for the Wall of Fame
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
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=200"
                              alt=""
                              className="w-10 h-10 rounded object-cover"
                            />
                            <div>
                              <div className="font-medium">
                                Beautiful Nature Painting
                              </div>
                              <div className="text-sm text-gray-500">
                                https://example.com/painting
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-blue-600" />
                            <span>Artwork</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-medium">Arjun Sharma</div>
                            <div className="text-sm text-gray-500">
                              Wisdom House
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm">Ms. Priya Coach</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            5/1/2025
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Review & Pin
                            </Button>
                            <Button size="sm" variant="outline">
                              <Archive className="w-4 h-4 mr-1" />
                              Archive
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-medium">
                              My Favorite Book Review
                            </div>
                            <div className="text-sm text-gray-500">
                              video-content-url
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-blue-600" />
                            <span>Spoken English</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-medium">Kavya Patel</div>
                            <div className="text-sm text-gray-500">
                              Knowledge House
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm">Mr. Rohit Coach</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            4/1/2025
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Review & Pin
                            </Button>
                            <Button size="sm" variant="outline">
                              <Archive className="w-4 h-4 mr-1" />
                              Archive
                            </Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <h3 className="text-lg font-semibold">
                    Recent Coach Suggestion Activity
                  </h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">
                        • The Adventure of the Lost Coin by Rohit Kumar
                        suggested by Ms. Anjali
                      </span>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Pinned</Badge>
                  </div>
                </div>
              </div>

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
                    • Coaches can suggest student work by clicking the "Suggest
                    for WTF" button while reviewing assignments
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
              <div className="bg-white rounded-lg border p-6">
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
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div>
                              <div className="font-medium">
                                My Experience with Science
                              </div>
                              <div className="text-sm text-gray-500">
                                Kavya Patel
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-sm">Wisdom House</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Calendar className="w-4 h-4" />
                              4/1/2025
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <Badge className="bg-green-100 text-green-800">
                              NEW
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                Review
                              </Button>
                              <Button size="sm" variant="outline">
                                <Archive className="w-4 h-4 mr-1" />
                                Archive
                              </Button>
                            </div>
                          </td>
                        </tr>
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
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div>
                              <div className="font-medium">
                                The Importance of Reading
                              </div>
                              <div className="text-sm text-gray-500">
                                Rohit Kumar
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-sm">Knowledge House</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Calendar className="w-4 h-4" />
                              3/1/2025
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <Badge className="bg-green-100 text-green-800">
                              NEW
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                Review
                              </Button>
                              <Button size="sm" variant="outline">
                                <Archive className="w-4 h-4 mr-1" />
                                Archive
                              </Button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
                    • Students can submit voice notes and articles through their
                    learning interfaces
                  </div>
                  <div>
                    • All submissions appear here for admin review and approval
                  </div>
                  <div>
                    • Use the embedded players/readers to experience the content
                    as students intended
                  </div>
                  <div>
                    • Pin exceptional content to the WTF or archive submissions
                    that don't meet criteria
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
                  Track engagement, popular content types, and user interactions
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create New Pin Modal */}
      <CreateNewPinModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreatePin={handleCreatePin}
      />
    </div>
  );
};

export default WTFManagement;
