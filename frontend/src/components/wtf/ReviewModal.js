import React from "react";
import { X, Star, Archive, Play, User } from "lucide-react";
import { Dialog, DialogContent } from "../ui/dialog.jsx";
import { Button } from "../ui/button.jsx";
import { Badge } from "../ui/badge.jsx";

const ReviewModal = ({
  isOpen,
  onClose,
  submission,
  onPinToWTF,
  onArchive,
}) => {
  if (!submission) return null;

  const type = (submission.type || "").toLowerCase();
  const contentUrl =
    typeof submission.content === "string" ? submission.content : "";
  const mediaUrl =
    submission.mediaUrl ||
    submission.imageUrl ||
    submission.videoUrl ||
    contentUrl;
  const isImage =
    type.includes("image") ||
    /\.(png|jpe?g|gif|webp|bmp|svg)(\?.*)?$/i.test(mediaUrl);
  const isVideo =
    type.includes("video") || /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(mediaUrl);
  const isHttpLike = /^(https?:\/\/|blob:|data:)/i.test(mediaUrl);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">{submission.title}</h2>
              <p className="text-gray-600 flex items-center gap-2 mt-1">
                <User className="w-4 h-4" />
                {submission.studentName} • {submission.balagruha}
              </p>
            </div>
            <Badge className="text-sm">
              {submission.type === "voice" ? "Voice Note" : "Article"}
            </Badge>
          </div>

          <div className="border-t pt-6">
            {type === "voice" ? (
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <Play className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                <p className="text-gray-600 mb-4">Audio Player</p>
                <div className="bg-white rounded p-4">
                  {submission.audioUrl || submission.content ? (
                    <audio
                      className="w-full"
                      controls
                      src={submission.audioUrl || submission.content}
                    >
                      Your browser does not support the audio element.
                    </audio>
                  ) : (
                    <div className="text-sm text-gray-500">
                      No audio file available for this submission.
                    </div>
                  )}
                  {submission.audioDuration ? (
                    <div className="mt-2 text-xs text-gray-500 text-right">
                      Duration: {submission.audioDuration}s
                    </div>
                  ) : null}
                </div>
              </div>
            ) : isImage && isHttpLike ? (
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <img
                  src={mediaUrl}
                  alt={submission.title}
                  className="max-w-full max-h-[480px] object-contain rounded mx-auto bg-white"
                />
              </div>
            ) : isVideo && isHttpLike ? (
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <video
                  src={mediaUrl}
                  controls
                  className="w-full max-h-[480px] rounded bg-black"
                />
              </div>
            ) : isHttpLike ? (
              <div className="prose max-w-none bg-white rounded-lg p-6 border">
                <a
                  href={mediaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="break-all text-blue-600"
                >
                  {mediaUrl}
                </a>
              </div>
            ) : (
              <div className="prose max-w-none bg-white rounded-lg p-6 border">
                <div className="text-gray-800 leading-relaxed whitespace-pre-line">
                  {submission.content}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-6 border-t">
            <Button
              onClick={() => onPinToWTF(submission)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Star className="w-4 h-4 mr-2" />
              Pin to WTF
            </Button>
            <Button
              variant="outline"
              onClick={() => onArchive(submission._id || submission.id)}
            >
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

export default ReviewModal;
