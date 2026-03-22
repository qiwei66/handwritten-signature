import React from 'react';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { Pencil, X } from 'lucide-react';

const TodoItem = ({ todo, onToggle, onEdit, onDelete }) => {
  const getTagColor = (tag) => {
    const colors = {
      工作: 'bg-blue-100 text-blue-800',
      学习: 'bg-green-100 text-green-800',
      生活: 'bg-yellow-100 text-yellow-800',
      购物: 'bg-purple-100 text-purple-800',
      健康: 'bg-red-100 text-red-800',
      无标签: 'bg-gray-100 text-gray-800'
    };
    return colors[tag] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className={`flex items-center justify-between p-4 border rounded-lg transition-all duration-200 ${todo.completed ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="flex items-center space-x-3">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={() => onToggle(todo.$id)}
          className="h-5 w-5"
        />
        <div>
          <p className={`font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
            {todo.title}
          </p>
          <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${getTagColor(todo.tag)}`}>
            {todo.tag}
          </span>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(todo)}
          className="text-gray-500 hover:text-gray-700"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(todo.$id)}
          className="text-gray-500 hover:text-red-500"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;
