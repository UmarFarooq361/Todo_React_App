import React, { useState } from 'react';
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
  const [title, setTitle] = useState(todo?.title || '');
  const [description, setDescription] = useState(todo?.description || '');
  const [voiceNote, setVoiceNote] = useState<Blob | undefined>(todo?.voiceNote);

  const handleUpdate = () => {
    if (todo) {
      onUpdate({ ...todo, title, description, voiceNote });
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Todo</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <VoiceRecorder onRecord={(blob) => setVoiceNote(blob)} existingRecording={voiceNote} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpdate}>Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTodoDialog;
