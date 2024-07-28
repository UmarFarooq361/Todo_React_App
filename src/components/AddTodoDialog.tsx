import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import VoiceRecorder from './VoiceRecorder';
import { Todo } from '../types';

interface AddTodoDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (todo: Omit<Todo, 'id' | 'completed'>) => void;
}

const AddTodoDialog: React.FC<AddTodoDialogProps> = ({ open, onClose, onAdd }) => {
  // State variables for title, description, and voice note
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [voiceNote, setVoiceNote] = useState<Blob | undefined>(undefined);

  // Handler to add the todo item
  const handleAdd = () => {
    onAdd({ title, description, voiceNote });
    setTitle('');
    setDescription('');
    setVoiceNote(undefined);
    onClose();
  };

  const titleLimit = 60;
  const descriptionLimit = 300;
  
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Todo</DialogTitle>
      <DialogContent>
        {/* Title input field with character limit */}
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          required
          type="text"
          fullWidth
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          inputProps={{ maxLength: titleLimit }}
          helperText={`${title.length}/${titleLimit} characters`}
        />
        {/* Description input field with character limit */}
        <TextField
          margin="dense"
          label="Description"
          type="text"
          fullWidth
          variant="standard"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          inputProps={{ maxLength: descriptionLimit }}
          helperText={`${description.length}/${descriptionLimit} characters`}
        />
        {/* Voice recorder component */}
        <VoiceRecorder onRecord={(blob) => setVoiceNote(blob)} />
      </DialogContent>
      <DialogActions>
        {/* Cancel button */}
        <Button onClick={onClose}>Cancel</Button>
        {/* Add button, disabled if title is empty */}
        <Button onClick={handleAdd} disabled={!title.trim()}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTodoDialog;
