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
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [voiceNote, setVoiceNote] = useState<Blob | undefined>(undefined);

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
        <VoiceRecorder onRecord={(blob) => setVoiceNote(blob)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAdd} disabled={!title.trim()}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTodoDialog;
