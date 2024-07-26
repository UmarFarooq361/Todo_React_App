import React from 'react';
import { ListItem, ListItemText, IconButton, Box } from '@mui/material';
import { Edit, Delete, CheckCircle } from '@mui/icons-material';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onEdit: () => void;
  onDelete: () => void;
  onComplete: () => void;
  onPlayVoiceNote: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onEdit, onDelete, onComplete, onPlayVoiceNote }) => {
  return (
    <ListItem
      sx={{
        backgroundColor: todo.completed ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
        marginBottom: '8px',
        borderRadius: '4px'
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <ListItemText primary={todo.title} secondary={todo.description} />
        {todo.voiceNote && (
          <IconButton onClick={onPlayVoiceNote}>
            <span role="img" aria-label="play">🔊</span>
          </IconButton>
        )}
      </Box>
      <IconButton onClick={onComplete}><CheckCircle /></IconButton>
      <IconButton onClick={onEdit}><Edit /></IconButton>
      <IconButton onClick={onDelete}><Delete /></IconButton>
    </ListItem>
  );
};

export default TodoItem;
