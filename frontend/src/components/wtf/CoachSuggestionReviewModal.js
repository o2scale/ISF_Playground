import React from "react";
import {
  X,
  Star,
  Archive,
  User,
  Calendar,
  FileText,
  Play,
  Image as ImageIcon,
} from "lucide-react";
import { Dialog, DialogContent } from "../ui/dialog.jsx";
import { Button } from "../ui/button.jsx";
import { Badge } from "../ui/badge.jsx";

const CoachSuggestionReviewModal = ({
  isOpen,
  onClose,
  suggestion,
  onPinToWTF,
  onArchive,
}) => {
  if (!suggestion) return null;

  const renderContentPreview = () => {
    if (suggestion.thumbnail) {
      return (
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <img
            src={suggestion.thumbnail}
            alt={suggestion.title}
            className="max-w-full h-64 object-cover rounded mx-auto"
          />
          <p className="text-sm text-gray-600 mt-2">{suggestion.content}</p>
        </div>
      );
    }

    if (suggestion.workType.toLowerCase().includes("video")) {
      return (
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <Play className="w-12 h-12 mx-auto mb-4 text-blue-500" />
          <p className="text-gray-600 mb-4">Video Player</p>
          <div className="bg-white rounded p-4 text-sm text-gray-500">
            Video player would be embedded here to play: {suggestion.content}
          </div>
        </div>
      );
    }

    if (suggestion.workType.toLowerCase().includes("audio")) {
      return (
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <Play className="w-12 h-12 mx-auto mb-4 text-blue-500" />
          <p className="text-gray-600 mb-4">Audio Player</p>
          <div className="bg-white rounded p-4 text-sm text-gray-500">
            Audio player would be embedded here to play: {suggestion.content}
          </div>
        </div>
      );
    }

    // Default text content
    return (
      <div className="prose max-w-none bg-white rounded-lg p-6 border">
        <div className="text-gray-800 leading-relaxed whitespace-pre-line">
          {suggestion.content}
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">{suggestion.title}</h2>
              <p className="text-gray-600 flex items-center gap-2 mt-1">
                <User className="w-4 h-4" />
                {suggestion.studentName} • {suggestion.balagruha}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Suggested by {suggestion.coachName} on{" "}
                {new Date(suggestion.suggestedDate).toLocaleDateString()}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge className="text-sm">{suggestion.workType}</Badge>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                {new Date(suggestion.suggestedDate).toLocaleDateString()}
              </div>
            </div>
          </div>

          <div className="border-t pt-6">{renderContentPreview()}</div>

          <div className="flex gap-3 pt-6 border-t">
            <Button
              onClick={() => onPinToWTF(suggestion)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Star className="w-4 h-4 mr-2" />
              Pin to WTF
            </Button>
            <Button variant="outline" onClick={() => onArchive(suggestion.id)}>
              <Archive className="w-4 h-4 mr-2" />
              Archive
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CoachSuggestionReviewModal;
