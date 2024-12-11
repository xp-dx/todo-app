import React, { useState } from 'react';
import TodoList from '../components/TodoList';
import { Link } from 'react-router-dom';


function TodoPage() {
    const [todos, setTodos] = useState([
        { id: 1, title: 'Buy groceries', completed: false },
        { id: 2, title: 'Read a book', completed: false },
      ]);
      const [newTodo, setNewTodo] = useState('');
      const [filter, setFilter] = useState('all');
    
      const toggleTodo = (id) => {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
      };
    
      const addTodo = (e) => {
        e.preventDefault();
        if (!newTodo) return;
    
        const newTodoItem = {
          id: Date.now(),
          title: newTodo,
          completed: false,
        };
        setTodos([...todos, newTodoItem]);
        setNewTodo('');
      };
      
      const deleteTodo = (id) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        setDeletedTodos((prevDeletedTodos) => [...prevDeletedTodos, id]);
      };
    
      const filteredTodos = todos.filter((todo) => {
        if (filter === 'all') {
          return true;
        } else if (filter === 'completed') {
          return todo.completed;
        } else if (filter === 'uncompleted') {
          return !todo.completed;
        }
      });
    
      return (
        <div className='App'>
          <h1>My To-Do List</h1>
          <form onSubmit={addTodo}>
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add new task..."
            />
            <button type="submit">Add</button>
            <button onClick={() => setFilter('all')}>All</button>
            <button onClick={() => setFilter('completed')}>Completed</button>
            <button onClick={() => setFilter('uncompleted')}>Uncompleted</button>
          </form>
          <Link className='link' to="/dnd">Перейти к DnD странице</Link>
          <TodoList todos={filteredTodos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
        </div>
      );
}
export default TodoPage;