import React, { useState } from 'react';
import { Container, Box, AppBar, Toolbar, Typography, IconButton, Fab, TextField, InputAdornment } from '@mui/material';
import { Add, Search } from '@mui/icons-material';
import useTodos from './hooks/useTodos';
import TodoList from './components/TodoList';
import AddTodoDialog from './components/AddTodoDialog';
import EditTodoDialog from './components/EditTodoDialog';
import { Todo } from './types';

const App: React.FC = () => {
  const { todos, addTodo, updateTodo, deleteTodo } = useTodos();
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Add a new todo
  const handleAddTodo = (todo: Omit<Todo, 'id' | 'completed'>) => {
    addTodo(todo);
  };

  // Update an existing todo
  const handleUpdateTodo = (todo: Todo) => {
    updateTodo(todo);
  };

  // Delete a todo
  const handleDeleteTodo = (id: string) => {
    deleteTodo(id);
  };

  // Mark a todo as completed or not completed
  const handleCompleteTodo = (id: string) => {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
      updateTodo({ ...todo, completed: !todo.completed });
    }
  };

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          backgroundColor: '#103030',
          color: '#ffffff',
          padding: '16px',
          borderRadius: '8px',
          marginTop: '16px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh', // Ensure full height
        }}
      >
        <AppBar position="static" color="transparent">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
            {/* Title */}
            <Typography variant="h6" component="div">
              Todo App
            </Typography>

            {/* Centered Add Button */}
            <Fab
              color="primary"
              aria-label="add"
              onClick={() => setAddDialogOpen(true)}
              sx={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)', // Center the button
                zIndex: 1, // Ensure the button is above other elements
              }}
            >
              <Add />
            </Fab>

            {/* Search Box and Icon */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                size="small"
                variant="outlined"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{
                  width: { xs: '100px', sm: '120px', md: '150px' }, // Responsive width
                  backgroundColor: 'white',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    '& fieldset': {
                      borderColor: 'transparent',
                    },
                    '&:hover fieldset': {
                      borderColor: 'transparent',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'transparent',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: '#000',
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end" color="inherit">
                        <Search sx={{ color: '#000' }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Box sx={{ flex: 1, overflowY: 'auto', paddingTop: '80px' }}>
          <TodoList
            todos={todos.filter(todo => todo.title.toLowerCase().includes(searchQuery.toLowerCase()))}
            onEdit={(todo) => {
              setSelectedTodo(todo);
              setEditDialogOpen(true);
            }}
            onDelete={handleDeleteTodo}
            onComplete={handleCompleteTodo}
          />
        </Box>

        {/* Dialogs */}
        <AddTodoDialog
          open={isAddDialogOpen}
          onClose={() => setAddDialogOpen(false)}
          onAdd={handleAddTodo}
        />
        <EditTodoDialog
          open={isEditDialogOpen}
          todo={selectedTodo}
          onClose={() => setEditDialogOpen(false)}
          onUpdate={handleUpdateTodo}
        />
      </Box>
    </Container>
  );
};

export default App;
