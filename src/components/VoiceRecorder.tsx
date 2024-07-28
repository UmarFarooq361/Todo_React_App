import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';

interface VoiceRecorderProps {
  onRecord: (blob: Blob) => void; // Callback function to handle recorded audio
  existingRecording?: Blob; // Optional existing recording to preload
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onRecord, existingRecording }) => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  // Load existing recording into recordedChunks state if available
  useEffect(() => {
    if (existingRecording) {
      setRecordedChunks([existingRecording]);
    }
  }, [existingRecording]);

  // Start recording audio
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setRecordedChunks((prev) => [...prev, event.data]);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: 'audio/wav' });
      onRecord(blob); // Call onRecord callback with the recorded audio
    };

    recorder.start();
    setMediaRecorder(recorder);
    setIsRecording(true);
  };

  // Stop recording audio
  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach((track) => track.stop()); // Stop all tracks
      setIsRecording(false);
    }
  };

  // Play the recorded audio
  const playRecording = () => {
    if (recordedChunks.length > 0) {
      const blob = new Blob(recordedChunks, { type: 'audio/wav' });
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.play();
    }
  };

  return (
    <div>
      {/* Button to start or stop recording based on current state */}
      {isRecording ? (
        <Button onClick={stopRecording}>Stop Recording</Button>
      ) : (
        <Button onClick={startRecording}>Start Recording</Button>
      )}
      {/* Button to play the recorded audio, disabled if no recording exists */}
      <Button onClick={playRecording} disabled={recordedChunks.length === 0}>Play Recording</Button>
    </div>
  );
};

export default VoiceRecorder;
