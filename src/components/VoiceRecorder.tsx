import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';

interface VoiceRecorderProps {
  onRecord: (blob: Blob) => void;
  existingRecording?: Blob;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onRecord, existingRecording }) => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    if (existingRecording) {
      setRecordedChunks([existingRecording]);
    }
  }, [existingRecording]);

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
      onRecord(blob);
    };

    recorder.start();
    setMediaRecorder(recorder);
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

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
      {isRecording ? (
        <Button onClick={stopRecording}>Stop Recording</Button>
      ) : (
        <Button onClick={startRecording}>Start Recording</Button>
      )}
      <Button onClick={playRecording} disabled={recordedChunks.length === 0}>Play Recording</Button>
    </div>
  );
};

export default VoiceRecorder;
