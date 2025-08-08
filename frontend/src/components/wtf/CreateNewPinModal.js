import React, { useState } from "react";
import {
  X,
  Upload,
  FileText,
  Image as ImageIcon,
  Video,
  Volume2,
  ExternalLink,
} from "lucide-react";
import { Dialog, DialogContent } from "../ui/dialog.jsx";
import { Input } from "../ui/input.jsx";
import { Button } from "../ui/button.jsx";

const CreateNewPinModal = ({ isOpen, onClose, onCreatePin }) => {
  const [formData, setFormData] = useState({
    title: "",
    contentType: "",
    content: "",
    caption: "",
    isOfficial: false,
    file: null,
  });

  const contentTypes = [
    {
      value: "text",
      label: "Text Announcement",
      icon: <FileText className="w-5 h-5" />,
    },
    { value: "image", label: "Image", icon: <ImageIcon className="w-5 h-5" /> },
    {
      value: "video",
      label: "Video (URL/Upload)",
      icon: <Video className="w-5 h-5" />,
    },
    {
      value: "audio",
      label: "Audio/Podcast (URL/Upload)",
      icon: <Volume2 className="w-5 h-5" />,
    },
    {
      value: "link",
      label: "External Link",
      icon: <ExternalLink className="w-5 h-5" />,
    },
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        file,
        content: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = (e, isDraft = false) => {
    e.preventDefault();
    if (!formData.title || !formData.contentType) return;

    const newPin = {
      id: Date.now(),
      title: formData.title,
      caption: formData.caption,
      contentType: formData.contentType,
      content: formData.content,
      thumbnail:
        formData.contentType === "image" ? formData.content : undefined,
      pinnedDate: new Date().toISOString().split("T")[0],
      pinnedBy: "Admin User",
      isOfficial: formData.isOfficial,
      status: isDraft ? "DRAFT" : "ACTIVE",
      likes: 0,
      hearts: 0,
      views: 0,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    };

    onCreatePin(newPin);
    setFormData({
      title: "",
      contentType: "",
      content: "",
      caption: "",
      isOfficial: false,
      file: null,
    });
  };

  const renderContentInput = () => {
    switch (formData.contentType) {
      case "text":
        return (
          <div>
            <label className="block text-sm font-medium mb-2">Content</label>
            <textarea
              value={formData.content}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, content: e.target.value }))
              }
              placeholder="Enter your announcement text here..."
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              required
            />
          </div>
        );

      case "link":
        return (
          <div>
            <label className="block text-sm font-medium mb-2">URL</label>
            <Input
              type="url"
              value={formData.content}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, content: e.target.value }))
              }
              placeholder="https://example.com"
              required
            />
          </div>
        );

      case "image":
      case "video":
      case "audio":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Upload File
              </label>
              <input
                type="file"
                onChange={handleFileUpload}
                accept={
                  formData.contentType === "image"
                    ? "image/*"
                    : formData.contentType === "video"
                    ? "video/*"
                    : formData.contentType === "audio"
                    ? "audio/*"
                    : ""
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="text-center text-gray-500">or</div>
            <div>
              <label className="block text-sm font-medium mb-2">URL</label>
              <Input
                type="url"
                value={formData.content}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, content: e.target.value }))
                }
                placeholder="https://example.com/media-url"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 hover:bg-gray-100 rounded-full p-2"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-2xl font-bold mb-6 text-center">
            Create New WTF Pin
          </h2>

          <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Pin Title/Headline *
              </label>
              <Input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Enter pin title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">
                Content Type *
              </label>
              <div className="grid grid-cols-1 gap-3">
                {contentTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        contentType: type.value,
                      }))
                    }
                    className={`p-4 border-2 rounded-lg text-left transition-colors flex items-center gap-3 ${
                      formData.contentType === type.value
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <div className="text-blue-600">{type.icon}</div>
                    <span className="font-medium">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {formData.contentType && renderContentInput()}

            <div>
              <label className="block text-sm font-medium mb-2">
                Pin Caption (Optional)
              </label>
              <Input
                type="text"
                value={formData.caption}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, caption: e.target.value }))
                }
                placeholder="Short description or caption"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isOfficial"
                checked={formData.isOfficial}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isOfficial: e.target.checked,
                  }))
                }
                className="rounded"
              />
              <label htmlFor="isOfficial" className="text-sm font-medium">
                Mark as "ISF Official Post"
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                Publish Pin
              </Button>
              <Button
                type="button"
                onClick={(e) => handleSubmit(e, true)}
                variant="outline"
                className="flex-1"
              >
                Save as Draft
              </Button>
              <Button type="button" onClick={onClose} variant="outline">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewPinModal;
