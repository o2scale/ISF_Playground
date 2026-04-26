import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api, apiWithoutContentType } from '../../api';
import toast from 'react-hot-toast';
// import StudentLayout from '../../components/student/StudentLayout';
import AudioInstructions from '../../components/student/spoken-english/AudioInstructions';
import WebcamPreview from '../../components/student/spoken-english/WebcamPreview';
import RecordingControls from '../../components/student/spoken-english/RecordingControls';
import RedoModal from '../../components/student/spoken-english/RedoModal';

/**
 * Spoken English Page - Epic 01 Story 04
 * Main page for video recording of poetry recitation and speeches
 */
export default function SpokenEnglishPage() {
  const { taskId = 'task1' } = useParams();
  const navigate = useNavigate();

  // State Management
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Recording State
  const [recordingState, setRecordingState] = useState('initial'); // initial, recording, recorded, playing, uploading
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [showRedoModal, setShowRedoModal] = useState(false);

  // WebRTC References
  const mediaStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const recordingTimerRef = useRef(null);

  // Load task data on mount
  useEffect(() => {
    fetchTaskData();
    requestWebcamAccess();

    // Cleanup on unmount
    return () => {
      stopWebcam();
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    };
  }, [taskId]);

  /**
   * Fetch task data from API
   */
  const fetchTaskData = async () => {
    try {
      setLoading(true);
      const studentId = localStorage.getItem('userId') || 'student1';
      const response = await api.get(`/api/v2/lms/student/${studentId}/courses/spoken-english/${taskId}`);

      if (response.data.success) {
        setTask(response.data.task);
      } else {
        setError('Failed to load task data');
        toast.error('Failed to load task');
      }
    } catch (err) {
      console.error('Error fetching task:', err);
      setError('Failed to load task data');
      toast.error('Failed to load task data');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Request webcam access using WebRTC
   */
  const requestWebcamAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: true
      });

      mediaStreamRef.current = stream;
      toast.success('Webcam connected successfully!');
    } catch (err) {
      console.error('Webcam access error:', err);

      if (err.name === 'NotAllowedError') {
        toast.error('Camera access denied. Please allow camera permissions.');
      } else if (err.name === 'NotFoundError') {
        toast.error('Webcam not detected. Please connect a webcam.');
      } else {
        toast.error('Failed to access webcam');
      }

      setError('Webcam access failed');
    }
  };

  /**
   * Stop webcam stream
   */
  const stopWebcam = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
  };

  /**
   * Start recording video
   */
  const startRecording = () => {
    if (!mediaStreamRef.current) {
      toast.error('Webcam not available. Please refresh the page.');
      return;
    }

    try {
      // Reset previous recording
      recordedChunksRef.current = [];
      setRecordingDuration(0);

      // Create MediaRecorder
      const options = { mimeType: 'video/webm;codecs=vp9' };

      // Fallback if vp9 not supported
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        options.mimeType = 'video/webm';
      }

      const mediaRecorder = new MediaRecorder(mediaStreamRef.current, options);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        setRecordedBlob(blob);
        setRecordingState('recorded');
        toast.success('Recording complete! Preview or submit your video.');
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setRecordingState('recording');

      // Start timer
      recordingTimerRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);

      toast.success('Recording started!');
    } catch (err) {
      console.error('Recording error:', err);
      toast.error('Failed to start recording');
    }
  };

  /**
   * Stop recording video
   */
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();

      // Stop timer
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }
    }
  };

  /**
   * Handle re-record confirmation
   */
  const handleRedoConfirm = () => {
    setRecordedBlob(null);
    setRecordingDuration(0);
    setRecordingState('initial');
    recordedChunksRef.current = [];
    setShowRedoModal(false);
    toast.success('Ready to record again');
  };

  /**
   * Submit video recording
   */
  const handleSubmit = async () => {
    if (!recordedBlob) {
      toast.error('No recording to submit');
      return;
    }

    try {
      setRecordingState('uploading');

      // Create form data
      const formData = new FormData();
      formData.append('file', recordedBlob, `spoken-english-${taskId}-${Date.now()}.webm`);
      formData.append('taskId', taskId);
      formData.append('duration', recordingDuration);
      formData.append('fileSize', recordedBlob.size);

      const studentId = localStorage.getItem('userId') || 'student1';

      const response = await apiWithoutContentType.post(
        `/api/v2/lms/student/${studentId}/courses/spoken-english/submissions`,
        formData
      );

      if (response.data.success) {
        toast.success('Video submitted successfully! Coach will grade it soon.');

        // Redirect after 3 seconds
        setTimeout(() => {
          navigate('/student/dashboard');
        }, 3000);
      } else {
        toast.error('Failed to submit video');
        setRecordingState('recorded');
      }
    } catch (err) {
      console.error('Submission error:', err);
      toast.error('Failed to submit video');
      setRecordingState('recorded');
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">Loading task...</p>
      </div>
    );
  }

  // Error State
  if (error || !task) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-xl text-red-600 mb-4">{error || 'Task not found'}</p>
          <button
            onClick={() => navigate('/student/dashboard')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            SPOKEN ENGLISH COURSE
          </h1>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Task: {task.title}
          </h2>
          <p className="text-gray-600">{task.description}</p>
        </div>

        {/* Audio Instructions */}
        {task.instructionsAudioUrl && (
          <AudioInstructions
            audioUrl={task.instructionsAudioUrl}
            instructionsText={task.instructionsText}
          />
        )}

        {/* Instructions Text (if no audio) */}
        {!task.instructionsAudioUrl && task.instructionsText && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">📋 Instructions</h3>
            <p className="text-gray-700 whitespace-pre-line">{task.instructionsText}</p>
          </div>
        )}

        {/* Poem Text */}
        {task.poemText && (
          <div className="mb-6 p-6 bg-gray-50 border-2 border-gray-300 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">📖 Poem to Recite:</h3>
            <div className="text-gray-800 whitespace-pre-line italic text-lg leading-relaxed">
              {task.poemText}
            </div>
          </div>
        )}

        {/* Webcam Preview / Recorded Video */}
        <WebcamPreview
          mediaStream={mediaStreamRef.current}
          recordedBlob={recordedBlob}
          recordingState={recordingState}
          recordingDuration={recordingDuration}
        />

        {/* Recording Controls */}
        <RecordingControls
          recordingState={recordingState}
          onRecord={startRecording}
          onStop={stopRecording}
          onPlay={() => setRecordingState('playing')}
          onRedo={() => setShowRedoModal(true)}
          onSubmit={handleSubmit}
          isWebcamReady={!!mediaStreamRef.current}
          hasRecording={!!recordedBlob}
        />

        {/* Status Message */}
        <div className="mt-4 text-center">
          <p className={`text-base font-medium ${recordingState === 'recording' ? 'text-red-600' :
            recordingState === 'playing' ? 'text-blue-600' :
              recordingState === 'uploading' ? 'text-orange-600' :
                recordingState === 'recorded' ? 'text-green-600' :
                  'text-gray-600'
            }`}>
            {recordingState === 'initial' && 'Ready to record. Click the red button when you\'re ready.'}
            {recordingState === 'recording' && `Recording... ${Math.floor(recordingDuration / 60)}:${(recordingDuration % 60).toString().padStart(2, '0')}`}
            {recordingState === 'recorded' && 'Recording complete. Preview or submit your video.'}
            {recordingState === 'playing' && 'Playing...'}
            {recordingState === 'uploading' && 'Uploading video... Please wait.'}
          </p>
        </div>

        {/* Requirements */}
        {task.requirements && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">✓ Requirements:</h3>
            <ul className="space-y-1">
              {task.requirements.map((req, idx) => (
                <li key={idx} className="text-gray-700 flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  {req}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Redo Modal */}
        {showRedoModal && (
          <RedoModal
            onConfirm={handleRedoConfirm}
            onCancel={() => setShowRedoModal(false)}
          />
        )}
      </div>
    </>
  );
}
