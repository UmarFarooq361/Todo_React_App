import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions } from '@mui/material';
import { Todo } from '../types';
import VoiceRecorder from './VoiceRecorder';

interface EditTodoDialogProps {
  open: boolean;
  todo: Todo | null;
  onClose: () => void;
  onUpdate: (todo: Todo) => void;
}

const EditTodoDialog: React.FC<EditTodoDialogProps> = ({ open, todo, onClose, onUpdate }) => {
  // State variables for title, description, and voice note
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [voiceNote, setVoiceNote] = useState<Blob | undefined>(undefined);

  // Update state when todo prop changes
  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setVoiceNote(todo.voiceNote);
    }
  }, [todo]);

  // Handler to update the todo item
  const handleUpdate = () => {
    if (todo) {
      onUpdate({ ...todo, title, description, voiceNote });
      onClose();
    }
  };

  const titleLimit = 60;
  const descriptionLimit = 300;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Todo</DialogTitle>
      <DialogContent>
        {/* Title input field with character limit */}
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          required
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          inputProps={{ maxLength: titleLimit }}
          helperText={`${title.length}/${titleLimit} characters`}
        />
        {/* Description input field with character limit */}
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          inputProps={{ maxLength: descriptionLimit }}
          helperText={`${description.length}/${descriptionLimit} characters`}
        />
        {/* Voice recorder component with existing recording */}
        <VoiceRecorder onRecord={(blob) => setVoiceNote(blob)} existingRecording={voiceNote} />
      </DialogContent>
      <DialogActions>
        {/* Cancel button */}
        <Button onClick={onClose}>Cancel</Button>
        {/* Update button, disabled if title is empty */}
        <Button onClick={handleUpdate} disabled={!title.trim()}>Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTodoDialog;
