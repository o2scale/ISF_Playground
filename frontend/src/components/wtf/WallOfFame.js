import React, { useState } from "react";
import {
  Eye,
  Heart,
  ThumbsUp,
  Play,
  Volume2,
  FileText,
  Camera,
  Settings,
  Plus,
} from "lucide-react";
import { useUserRole } from "../../hooks/useUserRole";
import CategoryButtons from "./CategoryButtons";
import LevelIndicators from "./LevelIndicators";
import CoursesSection from "./CoursesSection";
import CreateNewPinModal from "./CreateNewPinModal";
import ImageViewer from "./modals/ImageViewer";
import VideoPlayer from "./modals/VideoPlayer";
import AudioPlayer from "./modals/AudioPlayer";
import TextReader from "./modals/TextReader";

const sampleContent = [
  {
    id: 1,
    type: "photo",
    title: "My Art Creation",
    author: "Sarah Johnson",
    content:
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500",
    thumbnail:
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=200",
    likes: 15,
    hearts: 8,
    views: 45,
  },
  {
    id: 2,
    type: "video",
    title: "English Speaking Practice",
    author: "Alex Chen",
    content:
      "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200",
    likes: 23,
    hearts: 12,
    views: 67,
  },
  {
    id: 3,
    type: "audio",
    title: "This Week's Mann ki Baat",
    author: "ISF Admin",
    content: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    likes: 31,
    hearts: 18,
    views: 89,
  },
  {
    id: 4,
    type: "text",
    title: "Weekly Announcement",
    author: "ISF Admin",
    content: `Dear Students,

We are excited to announce our upcoming Science Fair! This is a wonderful opportunity to showcase your creativity and scientific knowledge.

Key Details:
• Date: Next Friday, 2 PM
• Location: Main Auditorium
• Prizes for top 3 projects
• All students welcome to participate

Please prepare your projects and get ready for an amazing day of learning and discovery!

Best regards,
ISF Administration Team`,
    likes: 19,
    hearts: 7,
    views: 52,
  },
  {
    id: 5,
    type: "photo",
    title: "Nature Photography",
    author: "Maya Patel",
    content:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500",
    thumbnail:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200",
    likes: 14,
    hearts: 27,
    views: 73,
  },
  {
    id: 6,
    type: "video",
    title: "Science Experiment",
    author: "Rohan Kumar",
    content:
      "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=200",
    likes: 21,
    hearts: 42,
    views: 156,
  },
  {
    id: 7,
    type: "photo",
    title: "Mountain Adventure",
    author: "Priya Singh",
    content:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
    thumbnail:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200",
    likes: 38,
    hearts: 19,
    views: 98,
  },
  {
    id: 8,
    type: "audio",
    title: "Morning Music",
    author: "Arjun Sharma",
    content: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    likes: 25,
    hearts: 12,
    views: 67,
  },
];

const WallOfFame = ({ onToggleView }) => {
  const [selectedContent, setSelectedContent] = useState(null);
  const [content] = useState(sampleContent);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [modalType, setModalType] = useState(null);

  // Background customization state
  const [backgroundSettings] = useState({
    color: "from-green-400 via-green-500 to-green-600",
    image: null,
    opacity: 100,
  });

  // Monthly theme state
  const [monthlyTheme] = useState({
    id: "classroom",
    name: "Classic Classroom",
    emoji: "🎓",
    title: "January Learning Goals",
    subtitle: "New Year, New Knowledge!",
  });

  const { isAdmin, isCoach } = useUserRole();

  const handlePinClick = (item) => {
    console.log("Pin clicked:", item.title, item.type);
    setSelectedContent(item);
    setModalType(item.type);
  };

  const closeModal = () => {
    setSelectedContent(null);
    setModalType(null);
  };

  const handleCreatePin = (newPin) => {
    console.log("Creating new pin:", newPin);
    // Add the new pin to the content array
    const updatedContent = [newPin, ...content];
    // Note: In a real app, you'd update the state properly
    // For now, we'll just log the action
    setShowCreateModal(false);
  };

  const renderTypeIcon = (type) => {
    const iconClass = "w-4 h-4";
    switch (type) {
      case "photo":
        return <Camera className={`${iconClass} text-blue-600`} />;
      case "video":
        return <Play className={`${iconClass} text-blue-600`} />;
      case "audio":
        return <Volume2 className={`${iconClass} text-blue-600`} />;
      case "text":
        return <FileText className={`${iconClass} text-blue-600`} />;
      default:
        return null;
    }
  };

  const getCardBackground = (type, thumbnail) => {
    switch (type) {
      case "photo":
        return thumbnail
          ? {
              backgroundImage: `url(${thumbnail})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : { backgroundColor: "#f3f4f6" };
      case "video":
        return { backgroundColor: "#dbeafe" };
      case "audio":
        return { backgroundColor: "#fce7f3" };
      case "text":
        return { backgroundColor: "#f0fdf4" };
      default:
        return { backgroundColor: "#f3f4f6" };
    }
  };

  const getPostageStampStyle = () => ({
    backgroundImage: `
      radial-gradient(circle at 0% 50%, transparent 3px, #fefce8 3px),
      radial-gradient(circle at 100% 50%, transparent 3px, #fefce8 3px),
      radial-gradient(circle at 50% 0%, transparent 3px, #fefce8 3px),
      radial-gradient(circle at 50% 100%, transparent 3px, #fefce8 3px)
    `,
    backgroundSize: "8px 100%, 8px 100%, 100% 8px, 100% 8px",
    backgroundPosition: "left center, right center, center top, center bottom",
    backgroundRepeat: "repeat-y, repeat-y, repeat-x, repeat-x",
    border: "2px solid #d1d5db",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  });

  const renderCard = (item) => (
    <div
      key={item.id}
      className="bg-yellow-50 p-4 cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-xl relative"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handlePinClick(item);
      }}
      style={{
        transform: `rotate(${Math.random() * 6 - 3}deg)`,
        ...getPostageStampStyle(),
      }}
    >
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full border-2 border-red-600 shadow-lg z-10"></div>

      <div
        className="w-full h-32 mb-3 rounded border-2 border-gray-300 overflow-hidden flex items-center justify-center"
        style={getCardBackground(item.type, item.thumbnail)}
      >
        {item.type === "photo" && item.thumbnail ? null : (
          <div className="text-center">
            <div className="mb-2 flex justify-center opacity-60">
              {renderTypeIcon(item.type)}
            </div>
            <p className="text-xs text-gray-600 font-medium">{item.title}</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-3 mb-2 text-xs">
        <div className="flex items-center gap-1">
          <Eye className="w-3 h-3 text-gray-600" />
          <span className="text-gray-700 font-medium">{item.views}</span>
        </div>
        <div className="flex items-center gap-1">
          <Heart className="w-3 h-3 text-red-500" />
          <span className="text-gray-700 font-medium">{item.hearts}</span>
        </div>
        <div className="flex items-center gap-1">
          <ThumbsUp className="w-3 h-3 text-pink-500" />
          <span className="text-gray-700 font-medium">{item.likes}</span>
        </div>
      </div>

      {item.type === "photo" && (
        <h3 className="text-center text-sm font-bold text-gray-800 line-clamp-2 leading-tight">
          {item.title}
        </h3>
      )}
    </div>
  );

  // Dynamic background style based on settings
  const backgroundStyle = backgroundSettings.image
    ? {
        backgroundImage: `linear-gradient(to bottom right, rgba(34, 197, 94, ${
          backgroundSettings.opacity / 100
        }), rgba(34, 197, 94, ${backgroundSettings.opacity / 100})), url(${
          backgroundSettings.image
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {
        background: `linear-gradient(to bottom right, ${backgroundSettings.color
          .replace("from-", "")
          .replace("via-", "")
          .replace("to-", "")
          .split(" ")
          .join(", ")})`,
      };

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r flex-shrink-0">
        <CoursesSection />
      </div>

      {/* Main content area */}
      <div className="flex-1 relative">
        {/* Admin Controls - Only show for admins */}
        {isAdmin && (
          <div className="fixed top-24 right-6 z-40 bg-white rounded-lg shadow-xl border-2 border-purple-200 p-6 w-80">
            <div className="text-lg font-semibold text-purple-800 mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Admin Controls
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setShowCreateModal(true)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white text-base px-4 py-3 rounded-md flex items-center gap-2 font-medium"
              >
                <Plus className="w-5 h-5" />
                Create New Pin
              </button>

              {onToggleView && (
                <button
                  onClick={onToggleView}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white text-base px-4 py-3 rounded-md flex items-center gap-2 font-medium"
                >
                  <Settings className="w-5 h-5" />
                  Full Management
                </button>
              )}

              <div className="pt-3 border-t border-gray-200">
                <div className="text-sm text-gray-600 space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Pending Suggestions:</span>
                    <span className="bg-orange-100 text-orange-700 text-sm px-3 py-1 rounded font-medium">
                      3
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>New Submissions:</span>
                    <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded font-medium">
                      2
                    </span>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="bg-red-50 text-red-700 text-sm px-3 py-2 rounded flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Review Queue (5)
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col h-screen w-full">
          {/* Fixed Header */}
          <div className="p-6 space-y-6 bg-white flex-shrink-0">
            <div className="flex items-center gap-6">
              <div className="flex-1 overflow-hidden">
                <CategoryButtons />
              </div>
            </div>
            <div className="overflow-hidden">
              <LevelIndicators />
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div
            className="flex-1 p-6 relative overflow-y-auto"
            style={backgroundStyle}
          >
            {/* Decorative icons scattered around */}
            <div className="absolute top-8 left-8 opacity-30">
              <div className="w-8 h-8 border-4 border-green-700 rounded-full"></div>
            </div>
            <div className="absolute top-12 right-12 opacity-30">
              <div className="w-6 h-6 border-3 border-green-700 rounded"></div>
            </div>
            <div className="absolute bottom-8 left-12 opacity-30">
              <Camera className="w-8 h-8 text-green-700" />
            </div>
            <div className="absolute bottom-12 right-8 opacity-30">
              <FileText className="w-6 h-6 text-green-700" />
            </div>

            <div className="text-center mb-8">
              <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-yellow-200 bg-opacity-70 rotate-3 rounded-sm shadow-md"></div>

              {/* Monthly Theme Display */}
              <div className="mb-4">
                <div className="text-6xl mb-2">{monthlyTheme.emoji}</div>
                <h3 className="text-green-100 text-lg font-medium">
                  {monthlyTheme.title}
                </h3>
                <p className="text-green-200 text-sm">
                  {monthlyTheme.subtitle}
                </p>
              </div>

              <h2 className="text-green-800 text-4xl font-bold mb-2 relative z-10">
                {isAdmin ? "Admin " : isCoach ? "Coach " : ""}Wall of{" "}
                <span
                  className="text-pink-600 bg-pink-200 px-2 py-1 rounded transform -rotate-1 inline-block border-4 border-purple-600 shadow-lg"
                  style={{ fontFamily: "Comic Sans MS, cursive" }}
                >
                  FAME
                </span>
              </h2>
              <p className="text-green-100 text-lg">
                {isAdmin
                  ? "Manage and curate amazing content from our community"
                  : isCoach
                  ? "Discover and suggest amazing content from our community"
                  : "Discover amazing content from our community"}
              </p>
            </div>

            <div className="w-full mx-auto px-4 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center pb-8">
                {content.map((item, index) => (
                  <div
                    key={item.id}
                    className="w-[180px]"
                    style={{
                      marginTop: `${(index % 4) * 10}px`,
                    }}
                  >
                    {renderCard(item)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sophisticated Modals */}
      {selectedContent && modalType === "photo" && (
        <ImageViewer
          isOpen={true}
          onClose={closeModal}
          imageSrc={selectedContent.content}
          title={selectedContent.title}
          author={selectedContent.author}
          likes={selectedContent.likes}
          hearts={selectedContent.hearts}
          views={selectedContent.views}
        />
      )}

      {selectedContent && modalType === "video" && (
        <VideoPlayer
          isOpen={true}
          onClose={closeModal}
          videoSrc={selectedContent.content}
          title={selectedContent.title}
          author={selectedContent.author}
          likes={selectedContent.likes}
          hearts={selectedContent.hearts}
          views={selectedContent.views}
        />
      )}

      {selectedContent && modalType === "audio" && (
        <AudioPlayer
          isOpen={true}
          onClose={closeModal}
          audioSrc={selectedContent.content}
          title={selectedContent.title}
          author={selectedContent.author}
          likes={selectedContent.likes}
          hearts={selectedContent.hearts}
          views={selectedContent.views}
        />
      )}

      {selectedContent && modalType === "text" && (
        <TextReader
          isOpen={true}
          onClose={closeModal}
          title={selectedContent.title}
          content={selectedContent.content}
          author={selectedContent.author}
          likes={selectedContent.likes}
          hearts={selectedContent.hearts}
          views={selectedContent.views}
        />
      )}

      {/* Create New Pin Modal */}
      <CreateNewPinModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreatePin={handleCreatePin}
      />
    </div>
  );
};

export default WallOfFame;
