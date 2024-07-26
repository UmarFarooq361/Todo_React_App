import { useState } from 'react';
import { Todo } from '../types';
import { v4 as uuidv4 } from 'uuid';

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (todo: Omit<Todo, 'id' | 'completed'>) => {
    const newTodo: Todo = { ...todo, id: uuidv4(), completed: false };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const updateTodo = (updatedTodo: Todo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return { todos, addTodo, updateTodo, deleteTodo };
};

export default useTodos;
