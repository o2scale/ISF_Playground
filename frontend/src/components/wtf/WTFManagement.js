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
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const WTFManagement = () => {
  const [activeTab, setActiveTab] = useState("pins");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Sample data matching the screenshot
  const activePins = [
    {
      id: 1,
      title: "Amazing Art Creation",
      author: "Sarah Johnson",
      contentType: "image",
      content:
        "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500",
      thumbnail:
        "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=200",
      pinnedDate: "1/1/2025",
      likes: 25,
      hearts: 18,
      views: 156,
      expiresAt: "8/1/2025",
    },
    {
      id: 2,
      title: "Weekly Announcement",
      author: "Admin User",
      contentType: "text",
      content: "Important updates for all students",
      pinnedDate: "2/1/2025",
      likes: 12,
      hearts: 8,
      views: 89,
      expiresAt: "9/1/2025",
    },
  ];

  const getTypeIcon = (type) => {
    const iconClass = "w-4 h-4";
    switch (type) {
      case "image":
        return <ImageIcon className={`${iconClass} text-blue-600`} />;
      case "video":
        return <Video className={`${iconClass} text-blue-600`} />;
      case "audio":
        return <Volume2 className={`${iconClass} text-blue-600`} />;
      case "text":
        return <FileText className={`${iconClass} text-blue-600`} />;
      default:
        return null;
    }
  };

  return (
    <div className="wtf-management h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 w-full">
        <div className="flex items-center justify-between w-full">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500" />
              WTF Management Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Curate and manage Wall of Fame content
            </p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Create New Pin
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 py-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6 w-full">
          <div className="bg-white rounded-lg p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Pins</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
                <p className="text-xs text-gray-500">of 20 maximum</p>
              </div>
              <div className="bg-green-100 p-2 rounded-lg">
                <Eye className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Coach Suggestions</p>
                <p className="text-2xl font-bold text-orange-600">3</p>
                <p className="text-xs text-gray-500">from coaches</p>
              </div>
              <div className="bg-orange-100 p-2 rounded-lg">
                <Bell className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Student Submissions</p>
                <p className="text-2xl font-bold text-blue-600">2</p>
                <p className="text-xs text-gray-500">awaiting review</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-lg">
                <User className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Engagement</p>
                <p className="text-2xl font-bold text-purple-600">245</p>
                <p className="text-xs text-gray-500">total views</p>
              </div>
              <div className="bg-purple-100 p-2 rounded-lg">
                <ThumbsUp className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg border w-full">
          <div className="border-b">
            <div className="flex space-x-1 p-1">
              {[
                { id: "pins", label: "Pin Management", count: null },
                { id: "suggestions", label: "Coach Suggestions", count: 3 },
                { id: "submissions", label: "Student Submissions", count: 2 },
                { id: "analytics", label: "Analytics", count: null },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 text-sm font-medium rounded-md flex items-center gap-2 ${
                    activeTab === tab.id
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                  {tab.count && (
                    <Badge
                      className={`text-xs ${
                        tab.id === "suggestions"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-blue-100 text-blue-700"
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
            {activeTab === "pins" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Active WTF Pins</h3>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search pins..."
                        className="pl-10 pr-4 py-2 border rounded-md w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <select
                      className="border rounded-md px-3 py-2"
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                    >
                      <option value="all">All Types</option>
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                      <option value="audio">Audio</option>
                      <option value="text">Text</option>
                    </select>
                  </div>
                </div>

                {/* Pins Table */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-700">
                          Content
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">
                          Type
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">
                          Author
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">
                          Pinned Date
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">
                          Expires
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">
                          Engagement
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {activePins.map((pin) => (
                        <tr key={pin.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              {pin.contentType === "image" && pin.thumbnail && (
                                <img
                                  src={pin.thumbnail}
                                  alt={pin.title}
                                  className="w-10 h-10 rounded object-cover"
                                />
                              )}
                              <div>
                                <p className="font-medium text-gray-900">
                                  {pin.title}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Beautiful artwork by our talented student
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              {getTypeIcon(pin.contentType)}
                              <span className="capitalize">
                                {pin.contentType}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium text-gray-900">
                                {pin.author}
                              </p>
                              <p className="text-sm text-gray-500">
                                by Admin User
                              </p>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-700">
                            {pin.pinnedDate}
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-red-600 text-sm">
                              {pin.expiresAt}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-4 text-sm">
                              <span className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {pin.views}
                              </span>
                              <span className="flex items-center gap-1">
                                <Heart className="w-3 h-3 text-red-500" />
                                {pin.hearts}
                              </span>
                              <span className="flex items-center gap-1">
                                <ThumbsUp className="w-3 h-3 text-blue-500" />
                                {pin.likes}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <button className="text-blue-600 hover:text-blue-800">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="text-green-600 hover:text-green-800">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-800">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "suggestions" && (
              <div className="text-center py-8">
                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Coach Suggestions
                </h3>
                <p className="text-gray-500">
                  Coach suggestions will appear here for review
                </p>
              </div>
            )}

            {activeTab === "submissions" && (
              <div className="text-center py-8">
                <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Student Submissions
                </h3>
                <p className="text-gray-500">
                  Student submissions will appear here for review
                </p>
              </div>
            )}

            {activeTab === "analytics" && (
              <div className="text-center py-8">
                <ThumbsUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Analytics
                </h3>
                <p className="text-gray-500">
                  Detailed analytics will be shown here
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WTFManagement;
