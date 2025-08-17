import React, { useRef, useState, useEffect } from "react";
import { X, Play, Pause, Volume2, Eye, Heart, ThumbsUp } from "lucide-react";
import { Dialog, DialogContent } from "../../ui/dialog.jsx";
import { Badge } from "../../ui/badge.jsx";

const AudioPlayer = ({
  isOpen,
  onClose,
  audioSrc,
  title,
  author,
  caption,
  likes,
  hearts,
  views,
  isOfficial,
  officialCategory,
  onLike,
  onHeart,
  isStudent = false,
}) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  // Reset state when audioSrc changes
  useEffect(() => {
    setCurrentTime(0);
    setIsPlaying(false);
  }, [audioSrc]);

  // Ensure handle moves to 100% when audio finishes
  useEffect(() => {
    if (
      !isPlaying &&
      currentTime > 0 &&
      Math.abs(currentTime - duration) < 0.1
    ) {
      console.log("Audio finished, ensuring handle is at 100%");
      setCurrentTime(duration);
    }
  }, [isPlaying, currentTime, duration]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handlePlaybackRateChange = (rate) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  const formatTime = (time) => {
    if (!Number.isFinite(time) || Number.isNaN(time) || time < 0) {
      return "0:00";
    }

    // For durations less than 1 minute, show seconds with 's' suffix
    if (time < 60) {
      const seconds = Math.round(time * 10) / 10;
      return `${seconds}s`;
    }

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const getPostageStampStyle = () => ({
    backgroundImage: `
      radial-gradient(circle at 0% 50%, transparent 4px, white 4px),
      radial-gradient(circle at 100% 50%, transparent 4px, white 4px),
      radial-gradient(circle at 50% 0%, transparent 4px, white 4px),
      radial-gradient(circle at 50% 100%, transparent 4px, white 4px)
    `,
    backgroundSize: "12px 100%, 12px 100%, 100% 12px, 100% 12px",
    backgroundPosition: "left center, right center, center top, center bottom",
    backgroundRepeat: "repeat-y, repeat-y, repeat-x, repeat-x",
    border: "3px solid #d1d5db",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] p-0 overflow-hidden bg-gray-100">
        <div className="relative min-h-[600px] p-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 bg-white hover:bg-gray-100 rounded-full p-3 transition-colors shadow-lg border-2 border-gray-300"
          >
            <X className="w-6 h-6 text-purple-600" />
          </button>

          {/* Main audio player card */}
          <div
            className="absolute top-16 left-16 bg-white p-8 transform -rotate-1 shadow-lg"
            style={{
              width: "400px",
              ...getPostageStampStyle(),
            }}
          >
            {isOfficial && officialCategory && (
              <div className="absolute -top-3 -left-3">
                <Badge
                  className={`text-white text-xs px-2 py-1 ${
                    officialCategory === "mann-ki-baat"
                      ? "bg-purple-700"
                      : officialCategory === "op-ed"
                      ? "bg-indigo-600"
                      : officialCategory === "isf-updates"
                      ? "bg-teal-600"
                      : "bg-purple-600"
                  }`}
                >
                  {officialCategory === "mann-ki-baat"
                    ? "🎙️ Mann Ki Baat"
                    : officialCategory === "op-ed"
                    ? "📝 Op Ed"
                    : officialCategory === "isf-updates"
                    ? "📢 ISF Updates"
                    : "ISF Official"}
                </Badge>
              </div>
            )}
            <div className="text-center mb-6">
              <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Volume2 className="w-16 h-16 text-green-600" />
              </div>
              <h3 className="font-handwriting text-xl text-gray-800 mb-2">
                {title}
              </h3>
              {caption && (
                <p className="text-sm text-gray-600 mb-2 italic">{caption}</p>
              )}
              {author && (
                <p className="text-sm text-gray-600">
                  Speaker: {typeof author === "object" ? author.name : author}
                </p>
              )}
            </div>

            <audio
              ref={audioRef}
              src={audioSrc}
              preload="metadata"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onError={() => {
                setDuration(0);
                setCurrentTime(0);
              }}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => {
                console.log(
                  "Audio ended, setting currentTime to duration:",
                  duration
                );
                setIsPlaying(false);
                setCurrentTime(duration);
              }}
            />

            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <button
                  onClick={togglePlay}
                  className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                </button>
              </div>

              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full cursor-pointer"
                  step="0.01"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                {/* Debug info */}
                <div className="text-xs text-gray-400 text-center">
                  Progress:{" "}
                  {duration > 0
                    ? Math.round((currentTime / duration) * 100)
                    : 0}
                  % ({currentTime.toFixed(3)} / {duration.toFixed(3)})
                </div>
              </div>

              <div className="flex items-center justify-center gap-2">
                <span className="text-sm text-gray-600">Speed:</span>
                {[0.75, 1, 1.25, 1.5].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => handlePlaybackRateChange(rate)}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      playbackRate === rate
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Audio sticky note */}
          <div className="absolute top-16 right-16 w-64 h-64 bg-green-200 p-6 transform rotate-3 shadow-lg">
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-red-500 rounded-full shadow-md"></div>
            <div className="h-full flex flex-col justify-center items-center text-center">
              <div className="text-4xl mb-4">🎵</div>
              <h2
                className="text-green-700 font-bold text-xl mb-2"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                AUDIO
              </h2>
              <p className="text-green-600 font-semibold text-sm mb-4">
                Listen & Learn
              </p>
              <p className="text-gray-700 text-sm">
                {new Date().toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <p className="text-green-600 text-xs mt-2">#audio #podcast</p>
            </div>
          </div>

          {/* Stats card */}
          <div className="absolute bottom-16 right-12 bg-white p-6 transform rotate-1 shadow-lg border-2 border-gray-200 rounded-lg">
            <div className="space-y-4 text-center min-w-[120px]">
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <Eye className="w-5 h-5" />
                <span className="font-bold text-lg">
                  {views.toLocaleString()}
                </span>
              </div>
              <button
                type="button"
                onClick={() => onLike && onLike()}
                className="flex items-center justify-center gap-2 text-pink-500 hover:opacity-80 transition-opacity mx-auto"
                aria-label="Like"
              >
                <ThumbsUp className="w-5 h-5" />
                {!isStudent && (
                  <span className="text-sm font-bold">
                    {likes.toLocaleString()}
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={() => onHeart && onHeart()}
                className="flex items-center justify-center gap-2 text-pink-600 hover:opacity-80 transition-opacity mx-auto"
                aria-label="Love"
              >
                <Heart className="w-5 h-5" />
                {!isStudent && (
                  <span className="text-sm font-bold">{hearts}</span>
                )}
              </button>
            </div>
          </div>

          {/* Decorative tape strips */}
          <div className="absolute bottom-32 right-96 w-32 h-6 bg-yellow-300 bg-opacity-70 transform -rotate-6 shadow-sm"></div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AudioPlayer;
