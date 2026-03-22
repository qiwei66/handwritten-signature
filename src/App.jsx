import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import TodoList from './components/TodoList';
import AddTodoPage from './pages/AddTodoPage';
import EditTodoPage from './pages/EditTodoPage';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <HashRouter>
          <Routes>
            <Route path="/" element={<TodoList />} />
            <Route path="/add" element={<AddTodoPage />} />
            <Route path="/edit/:id" element={<EditTodoPage />} />
          </Routes>
        </HashRouter>
      </div>
    </div>
  );
};

export default App;
