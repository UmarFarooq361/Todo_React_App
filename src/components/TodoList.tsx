
import React from 'react';
import { List } from '@mui/material';
import { Todo } from '../types';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onEdit, onDelete, onComplete }) => {
  const handlePlayVoiceNote = (voiceNote: Blob) => {
    const audioUrl = URL.createObjectURL(voiceNote);
    const audio = new Audio(audioUrl);
    audio.play();
  };

  return (
    <List>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onEdit={() => onEdit(todo)}
          onDelete={() => onDelete(todo.id)}
          onComplete={() => onComplete(todo.id)}
          onPlayVoiceNote={() => todo.voiceNote && handlePlayVoiceNote(todo.voiceNote)}
        />
      ))}
    </List>
  );
};

export default TodoList;
