import { useState } from 'react';
import { Todo } from '../types';
import { v4 as uuidv4 } from 'uuid';

const useTodos = () => {
  // State to store the list of todos
  const [todos, setTodos] = useState<Todo[]>([]);

  // Function to add a new todo
  const addTodo = (todo: Omit<Todo, 'id' | 'completed'>) => {
    // Create a new todo with a unique id and default completed status as false
    const newTodo: Todo = { ...todo, id: uuidv4(), completed: false };
    // Update the todos state with the new todo
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  // Function to update an existing todo
  const updateTodo = (updatedTodo: Todo) => {
    // Map through the todos and replace the todo with the matching id
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  // Function to delete a todo by id
  const deleteTodo = (id: string) => {
    // Filter out the todo with the specified id
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // Return the todos and functions for adding, updating, and deleting todos
  return { todos, addTodo, updateTodo, deleteTodo };
};

export default useTodos;
