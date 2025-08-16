import React, { useState, useEffect } from "react";
import { X, Eye, Heart, ThumbsUp } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "../../ui/dialog.jsx";
import { Badge } from "../../ui/badge.jsx";

const ImageViewer = ({
  isOpen,
  onClose,
  imageSrc,
  title,
  author,
  likes,
  hearts,
  views,
  isOfficial,
  onLike,
  onHeart,
}) => {
  const [imgError, setImgError] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);
  const [useFallback, setUseFallback] = useState(false);

  // Reset states when image source changes or modal opens
  useEffect(() => {
    if (isOpen && imageSrc) {
      console.log("ImageViewer - Modal opened with:", {
        isOpen,
        imageSrc,
        title,
        author,
        type: typeof imageSrc,
      });
      setImgError(false);
      setImgLoading(true);
      setUseFallback(false);
    }
  }, [isOpen, imageSrc, title, author]);

  // Check if CSS background image loaded successfully
  useEffect(() => {
    if (imageSrc && !imgLoading) {
      // Give CSS background a moment to load, then check if we need fallback
      const timer = setTimeout(() => {
        if (imgLoading) {
          setUseFallback(true);
        }
      }, 2000); // 2 second timeout

      return () => clearTimeout(timer);
    }
  }, [imageSrc, imgLoading]);

  const isLikelyImageUrl = (url) => {
    if (!url || typeof url !== "string") return false;

    // Debug logging
    console.log("ImageViewer - Checking URL:", url);

    // Check for common image file extensions anywhere in the URL
    const hasImageExtension = /\.(png|jpe?g|gif|webp|bmp|svg)(\?.*)?$/i.test(
      url
    );

    // Check for S3 bucket URLs that contain image paths
    const isS3ImageUrl =
      url.includes("s3.amazonaws.com") &&
      (url.includes("/image/") ||
        url.includes("/images/") ||
        hasImageExtension);

    // Check for other common image hosting patterns
    const isCommonImageHost =
      /(imgur|cloudinary|images\.unsplash|picsum|placeholdit|via\.placeholder)\.com/i.test(
        url
      );

    // Check for data URLs and blob URLs
    const isDataOrBlob = /^(data:image\/.+;base64,|blob:)/i.test(url);

    // Special case: Always allow S3 URLs to pass through
    const isS3Url = url.includes("s3.amazonaws.com");

    const result =
      hasImageExtension ||
      isS3ImageUrl ||
      isCommonImageHost ||
      isDataOrBlob ||
      isS3Url;

    console.log("ImageViewer - URL check results:", {
      url,
      hasImageExtension,
      isS3ImageUrl,
      isCommonImageHost,
      isDataOrBlob,
      isS3Url,
      result,
    });

    return result;
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
        <DialogTitle className="sr-only">Image Viewer - {title}</DialogTitle>
        <div className="relative min-h-[600px] p-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 bg-white hover:bg-gray-100 rounded-full p-3 transition-colors shadow-lg border-2 border-gray-300"
          >
            <X className="w-6 h-6 text-purple-600" />
          </button>

          {/* Main polaroid-style image */}
          <div
            className="absolute top-12 left-12 bg-white p-4 transform -rotate-2 shadow-lg"
            style={{
              width: "400px",
              ...getPostageStampStyle(),
            }}
          >
            {isOfficial && (
              <div className="absolute -top-3 -left-3">
                <Badge className="bg-purple-600 text-white">ISF Official</Badge>
              </div>
            )}
            <div className="w-full h-80 bg-gray-200 mb-4 overflow-hidden">
              {isLikelyImageUrl(imageSrc) && !imgError ? (
                <>
                  {imgLoading && (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
                        <p className="text-sm text-gray-600">
                          Loading image...
                        </p>
                        {imageSrc && imageSrc.includes("s3.amazonaws.com") && (
                          <p className="text-xs text-gray-500 mt-1">
                            Loading S3 image...
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Use CSS background-image instead of HTML img tag to avoid CORS issues */}
                  <div
                    className={`w-full h-full ${imgLoading ? "hidden" : ""}`}
                    style={{
                      backgroundImage: `url(${imageSrc})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  />

                  {/* Fallback img tag in case CSS background fails */}
                  <img
                    src={imageSrc}
                    alt={title}
                    className={`w-full h-full object-cover ${
                      imgLoading ? "hidden" : ""
                    }`}
                    style={{ display: useFallback ? "block" : "none" }} // Show fallback when needed
                    onLoad={() => {
                      console.log(
                        "ImageViewer - Image loaded successfully:",
                        imageSrc
                      );
                      setImgLoading(false);
                    }}
                    onError={(e) => {
                      console.error(
                        "ImageViewer - Image failed to load:",
                        imageSrc,
                        e
                      );
                      setImgError(true);
                      setImgLoading(false);
                    }}
                  />
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-white text-center p-4">
                  <div>
                    {imgError ? (
                      <>
                        <div className="text-sm text-gray-600 mb-2">
                          Failed to load image
                        </div>
                        <div className="text-xs text-gray-500 mb-3">
                          The image could not be displayed
                        </div>
                        {imageSrc && imageSrc.includes("s3.amazonaws.com") && (
                          <div className="text-xs text-gray-500 mb-2">
                            This appears to be an S3 image. S3 bucket CORS
                            settings might be preventing display.
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-sm text-gray-600 mb-2">
                        This URL does not look like a direct image file.
                      </div>
                    )}
                    {imageSrc && (
                      <a
                        href={imageSrc}
                        target="_blank"
                        rel="no-referrer"
                        className="text-blue-600 underline break-all text-xs"
                      >
                        Open link in a new tab
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="text-center">
              <h3 className="font-handwriting text-lg text-gray-800 mb-1">
                {title}
              </h3>
              {author && (
                <p className="text-sm text-gray-600">
                  by {typeof author === "object" ? author.name : author}
                </p>
              )}
            </div>
          </div>

          {/* Sticky note with title */}
          <div className="absolute top-16 right-16 w-64 h-64 bg-yellow-200 p-6 transform rotate-3 shadow-lg">
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-red-500 rounded-full shadow-md"></div>
            <div className="h-full flex flex-col justify-center items-center text-center">
              <h2
                className="text-purple-700 font-bold text-2xl mb-4"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                WTF
              </h2>
              <p className="text-purple-600 font-semibold text-sm mb-2">
                Wall for Thrust
              </p>
              <p className="text-purple-600 font-semibold text-sm mb-4">
                towards Fame
              </p>
              <p className="text-gray-700 text-sm">
                {new Date().toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <p className="text-purple-600 text-xs mt-2">
                #fame #success goals
              </p>
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
                <span className="font-bold text-lg">
                  {likes.toLocaleString()}
                </span>
              </button>
              <button
                type="button"
                onClick={() => onHeart && onHeart()}
                className="flex items-center justify-center gap-2 text-pink-600 hover:opacity-80 transition-opacity mx-auto"
                aria-label="Love"
              >
                <Heart className="w-5 h-5" />
                <span className="font-bold text-lg">{hearts}</span>
              </button>
            </div>
          </div>

          {/* Decorative tape strips */}
          <div className="absolute top-96 right-96 w-32 h-6 bg-yellow-300 bg-opacity-70 transform -rotate-6 shadow-sm"></div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageViewer;
