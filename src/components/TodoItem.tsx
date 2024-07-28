import React from 'react';
import { ListItem, ListItemText, IconButton, Box } from '@mui/material';
import { Edit, Delete, CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';
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
        backgroundColor: todo.completed ? 'rgba(0, 255, 10, 0.5)' : 'rgba(255, 255, 255, 0.22)',
        marginBottom: '8px',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: '8px'
      }}
    >
      <Box sx={{ flexGrow: 1, maxWidth: '70%' }}>
        <ListItemText 
          primary={todo.title} 
          secondary={todo.description}
          sx={{ whiteSpace: 'pre-wrap', textAlign: 'justify' }}
        />
        {todo.voiceNote && (
          <IconButton onClick={onPlayVoiceNote}>
            <span role="img" aria-label="play">🔊</span>
          </IconButton>
        )}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={onComplete}>
          {todo.completed ? <CheckCircle /> : <RadioButtonUnchecked />}
        </IconButton>
        <IconButton onClick={onEdit}><Edit /></IconButton>
        <IconButton onClick={onDelete}><Delete /></IconButton>
      </Box>
    </ListItem>
  );
}
  export default TodoItem;
  