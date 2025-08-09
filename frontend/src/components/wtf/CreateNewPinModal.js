import React, { useState, useEffect } from "react";
import {
  X,
  Upload,
  FileText,
  Image as ImageIcon,
  Video,
  Volume2,
  ExternalLink,
  User,
  Lightbulb,
  Mic,
  Square,
  Play,
} from "lucide-react";
import { Dialog, DialogContent } from "../ui/dialog.jsx";
import { Input } from "../ui/input.jsx";
import { Button } from "../ui/button.jsx";
import { fetchUsers, getBalagruha } from "../../api";

const CreateNewPinModal = ({
  isOpen,
  onClose,
  onCreatePin,
  isCoachMode = false,
  isStudentMode = false,
  userRole = "admin",
}) => {
  const [formData, setFormData] = useState({
    title: "",
    contentType: "",
    content: "",
    caption: "",
    isOfficial: false,
    file: null,
    // Coach-specific fields
    studentName: "",
    studentId: "",
    balagruha: "",
    reason: "",
  });

  // Coach mode state
  const [students, setStudents] = useState([]);
  const [balagruhas, setBalagruhas] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Audio recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState("");

  // Fetch data for coach mode
  useEffect(() => {
    const fetchData = async () => {
      if (isOpen && isCoachMode) {
        setIsLoading(true);
        try {
          const [usersResponse, balagruhaResponse] = await Promise.all([
            fetchUsers(),
            getBalagruha(),
          ]);

          // Filter only students
          const users = Array.isArray(usersResponse) ? usersResponse : [];
          const studentUsers = users.filter(
            (user) => user.role === "student" || user.userType === "student"
          );
          setStudents(studentUsers);
          setFilteredStudents(studentUsers);

          // Handle balagruha response
          const balagruhas = Array.isArray(balagruhaResponse)
            ? balagruhaResponse
            : balagruhaResponse?.data?.balagruhas ||
              balagruhaResponse?.data ||
              [];
          setBalagruhas(balagruhas);
        } catch (error) {
          console.error("Error fetching data:", error);
          setStudents([]);
          setFilteredStudents([]);
          setBalagruhas([]);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [isOpen, isCoachMode]);

  // Filter students by balagruha
  useEffect(() => {
    if (formData.balagruha) {
      const filtered = students.filter(
        (student) => student.balagruha === formData.balagruha
      );
      setFilteredStudents(filtered);
      if (
        formData.studentId &&
        !filtered.find((s) => s._id === formData.studentId)
      ) {
        setFormData((prev) => ({
          ...prev,
          studentId: "",
          studentName: "",
        }));
      }
    } else {
      setFilteredStudents(students);
    }
  }, [formData.balagruha, formData.studentId, students]);

  const contentTypes = isStudentMode
    ? [
        {
          value: "audio",
          label: "Voice Note",
          icon: <Mic className="w-5 h-5" />,
          description: "Record a 1-minute voice note to share your thoughts",
        },
        {
          value: "text",
          label: "Article/Story",
          icon: <FileText className="w-5 h-5" />,
          description: "Write an article, story, or share your ideas",
        },
        {
          value: "image",
          label: "Artwork/Photo",
          icon: <ImageIcon className="w-5 h-5" />,
          description: "Share your artwork, drawings, or photos",
        },
        {
          value: "video",
          label: "Video",
          icon: <Video className="w-5 h-5" />,
          description: "Upload a video of your performance or project",
        },
        {
          value: "link",
          label: "Project Link",
          icon: <ExternalLink className="w-5 h-5" />,
          description: "Share a link to your online project or work",
        },
      ]
    : isCoachMode
    ? [
        {
          value: "image",
          label: "Student Artwork/Drawing",
          icon: <ImageIcon className="w-5 h-5" />,
          description: "Amazing artwork, drawings, or visual creations",
        },
        {
          value: "video",
          label: "Video Performance",
          icon: <Video className="w-5 h-5" />,
          description: "Spoken English, presentations, or performances",
        },
        {
          value: "audio",
          label: "Voice Note/Recording",
          icon: <Volume2 className="w-5 h-5" />,
          description: "Voice notes, singing, or audio recordings",
        },
        {
          value: "text",
          label: "Written Work",
          icon: <FileText className="w-5 h-5" />,
          description: "Essays, stories, poems, or written assignments",
        },
        {
          value: "link",
          label: "Project Link",
          icon: <ExternalLink className="w-5 h-5" />,
          description: "Links to student projects or online work",
        },
      ]
    : [
        {
          value: "text",
          label: "Text Announcement",
          icon: <FileText className="w-5 h-5" />,
        },
        {
          value: "image",
          label: "Image",
          icon: <ImageIcon className="w-5 h-5" />,
        },
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

  const handleStudentSelect = (student) => {
    setFormData((prev) => ({
      ...prev,
      studentId: student._id,
      studentName: student.name || `${student.firstName} ${student.lastName}`,
      balagruha: student.balagruha,
    }));
  };

  // Audio recording functions
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const audioChunks = [];

      recorder.addEventListener("dataavailable", (event) => {
        audioChunks.push(event.data);
      });

      recorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        const audioFile = new File([audioBlob], "voice-note.wav", {
          type: "audio/wav",
        });
        const url = URL.createObjectURL(audioBlob);

        // Create audio element to get actual duration
        const audio = new Audio(url);
        audio.addEventListener("loadedmetadata", () => {
          setAudioDuration(Math.round(audio.duration));
        });

        setRecordedAudio(audioFile);
        setAudioUrl(url);
        setFormData((prev) => ({
          ...prev,
          file: audioFile,
        }));
      });

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      const timer = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= 59) {
            // Stop recording after 60 seconds
            recorder.stop();
            stream.getTracks().forEach((track) => track.stop());
            setIsRecording(false);
            clearInterval(timer);
            return 60;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (error) {
      console.error("Error starting recording:", error);
      alert("Could not access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  const playRecording = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  const deleteRecording = () => {
    setRecordedAudio(null);
    setAudioUrl("");
    setRecordingTime(0);
    setAudioDuration(0);
    setFormData((prev) => ({
      ...prev,
      file: null,
    }));
  };

  const handleSubmit = (e, isDraft = false) => {
    e.preventDefault();
    if (!formData.title || !formData.contentType) return;

    // Additional validation for coach mode
    if (
      isCoachMode &&
      (!formData.studentName || !formData.studentId || !formData.reason)
    ) {
      alert(
        "Please fill in all required fields: student, and reason for suggestion"
      );
      return;
    }

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
      studentName: "",
      studentId: "",
      balagruha: "",
      reason: "",
    });

    // Clear audio recording state
    setRecordedAudio(null);
    setAudioUrl("");
    setRecordingTime(0);
    setAudioDuration(0);
    setIsRecording(false);
  };

  const renderContentInput = () => {
    console.log("Current content type:", formData.contentType);
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

      case "audio":
        return isStudentMode ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Record Voice Note (1 minute max)
              </label>
              <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center bg-blue-50">
                {!recordedAudio ? (
                  <div className="space-y-4">
                    <div className="text-blue-600">
                      <Mic className="w-12 h-12 mx-auto mb-2" />
                      <p className="text-sm">
                        {isRecording ? (
                          <>
                            Recording... {Math.floor(recordingTime / 60)}:
                            {(recordingTime % 60).toString().padStart(2, "0")}
                          </>
                        ) : (
                          "Click to start recording your voice note"
                        )}
                      </p>
                    </div>
                    {!isRecording ? (
                      <button
                        type="button"
                        onClick={startRecording}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                      >
                        <Mic className="w-4 h-4 inline mr-2" />
                        Start Recording
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={stopRecording}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                      >
                        <Square className="w-4 h-4 inline mr-2" />
                        Stop Recording
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-green-600">
                      <Volume2 className="w-12 h-12 mx-auto mb-2" />
                      <p className="text-sm">
                        {audioDuration > 0
                          ? `Voice note recorded (${audioDuration} seconds)`
                          : "Processing audio..."}
                      </p>
                    </div>
                    <div className="flex gap-2 justify-center">
                      <button
                        type="button"
                        onClick={playRecording}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
                      >
                        <Play className="w-4 h-4 inline mr-1" />
                        Play
                      </button>
                      <button
                        type="button"
                        onClick={deleteRecording}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm"
                      >
                        Re-record
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Upload File
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept="audio/*"
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">
                    Click to upload or drag and drop
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    MP3, WAV, M4A up to 50MB
                  </span>
                </label>
              </div>
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

      case "image":
      case "video":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Upload File
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
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
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">
                    Click to upload or drag and drop
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    {formData.contentType === "image"
                      ? "PNG, JPG, GIF up to 10MB"
                      : formData.contentType === "video"
                      ? "MP4, MOV, AVI up to 100MB"
                      : "MP3, WAV, M4A up to 50MB"}
                  </span>
                </label>
              </div>
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

  // Show loading state for coach mode
  if (isLoading && isCoachMode) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <div className="p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">
              Loading students and balagruhas...
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

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

          {isCoachMode ? (
            <div className="text-center mb-6">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Lightbulb className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Suggest Student Work
              </h2>
              <p className="text-gray-600 mt-2">
                Recommend outstanding student work for the Wall of Fame
              </p>
            </div>
          ) : isStudentMode ? (
            <div className="text-center mb-6">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Share Your Work
              </h2>
              <p className="text-gray-600 mt-2">
                Create content to be featured on the Wall of Fame
              </p>
            </div>
          ) : (
            <h2 className="text-2xl font-bold mb-6 text-center">
              Create New WTF Pin
            </h2>
          )}

          <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
            {isCoachMode && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Student Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Balagruha (Optional)
                    </label>
                    <select
                      value={formData.balagruha}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          balagruha: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">All Balagruhas</option>
                      {Array.isArray(balagruhas) &&
                        balagruhas.map((bg) => (
                          <option key={bg._id || bg.id} value={bg.name}>
                            {bg.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Student *
                    </label>
                    <select
                      value={formData.studentId}
                      onChange={(e) => {
                        const student = filteredStudents.find(
                          (s) => s._id === e.target.value
                        );
                        if (student) handleStudentSelect(student);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select a student</option>
                      {Array.isArray(filteredStudents) &&
                        filteredStudents.map((student) => (
                          <option
                            key={student._id || student.id}
                            value={student._id || student.id}
                          >
                            {student.name ||
                              `${student.firstName || ""} ${
                                student.lastName || ""
                              }`.trim()}{" "}
                            {student.balagruha && `(${student.balagruha})`}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">
                {isCoachMode ? "Suggestion Title *" : "Pin Title/Headline *"}
              </label>
              <Input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder={
                  isCoachMode
                    ? "e.g., Amazing artwork by [Student Name]"
                    : "Enter pin title"
                }
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
                    onClick={() => {
                      console.log("Setting content type to:", type.value);
                      setFormData((prev) => ({
                        ...prev,
                        contentType: type.value,
                      }));
                    }}
                    className={`p-4 border-2 rounded-lg text-left transition-colors ${
                      formData.contentType === type.value
                        ? isCoachMode
                          ? "border-purple-500 bg-purple-50"
                          : "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {isCoachMode ? (
                      <div className="flex items-start gap-3">
                        <div className="text-purple-600 mt-1">{type.icon}</div>
                        <div>
                          <span className="font-medium block">
                            {type.label}
                          </span>
                          <span className="text-sm text-gray-600">
                            {type.description}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <div className="text-blue-600">{type.icon}</div>
                        <span className="font-medium">{type.label}</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {formData.contentType && <div>{renderContentInput()}</div>}

            {isCoachMode ? (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Why should this be featured? *
                </label>
                <textarea
                  value={formData.reason}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, reason: e.target.value }))
                  }
                  placeholder="Explain why this work deserves to be on the Wall of Fame (creativity, effort, improvement, etc.)"
                  className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  required
                />
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Pin Caption (Optional)
                  </label>
                  <Input
                    type="text"
                    value={formData.caption}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        caption: e.target.value,
                      }))
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
              </>
            )}

            <div className="flex gap-3 pt-4">
              {isCoachMode ? (
                <>
                  <Button
                    type="submit"
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Submit Suggestion
                  </Button>
                  <Button type="button" onClick={onClose} variant="outline">
                    Cancel
                  </Button>
                </>
              ) : isStudentMode ? (
                <>
                  <Button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Submit for Review
                  </Button>
                  <Button type="button" onClick={onClose} variant="outline">
                    Cancel
                  </Button>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewPinModal;
