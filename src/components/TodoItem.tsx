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
        backgroundColor: todo.completed ? 'rgba(0, 255, 10, 0.5)' : 'rgba(255, 255, 255, 0.22)', // Background color based on completion status
        marginBottom: '8px',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: '8px'
      }}
    >
      <Box sx={{ flexGrow: 1, maxWidth: '70%' }}>
        {/* Display title and description */}
        <ListItemText 
          primary={todo.title} 
          secondary={todo.description}
          sx={{ whiteSpace: 'pre-wrap', textAlign: 'justify' }} // Ensures text wraps and is justified
        />
        {/* Display play button if voice note exists */}
        {todo.voiceNote && (
          <IconButton onClick={onPlayVoiceNote}>
            <span role="img" aria-label="play">🔊</span>
          </IconButton>
        )}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {/* Complete/Incomplete button */}
        <IconButton onClick={onComplete}>
          {todo.completed ? <CheckCircle /> : <RadioButtonUnchecked />}
        </IconButton>
        {/* Edit button */}
        <IconButton onClick={onEdit}><Edit /></IconButton>
        {/* Delete button */}
        <IconButton onClick={onDelete}><Delete /></IconButton>
      </Box>
    </ListItem>
  );
}

export default TodoItem;
