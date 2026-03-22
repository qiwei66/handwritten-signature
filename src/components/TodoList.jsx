import React, { useState, useEffect } from 'react';
import { databases, Query } from '../appwriteClient';
import TodoItem from './TodoItem';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Plus } from 'lucide-react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterTag, setFilterTag] = useState('all');
  const [showCompleted, setShowCompleted] = useState(true);

  // 获取所有待办事项
  const fetchTodos = async () => {
    try {
      const response = await databases.listDocuments('todo_db', 'todos_table', [
        Query.orderDesc('$createdAt')
      ]);
      setTodos(response.documents);
    } catch (error) {
      console.error('获取待办事项失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 切换任务完成状态
  const toggleTodo = async (id) => {
    try {
      const todo = todos.find(t => t.$id === id);
      await databases.updateDocument('todo_db', 'todos_table', id, {
        completed: !todo.completed
      });
      fetchTodos();
    } catch (error) {
      console.error('更新任务状态失败:', error);
    }
  };

  // 删除任务
  const deleteTodo = async (id) => {
    try {
      await databases.deleteDocument('todo_db', 'todos_table', id);
      fetchTodos();
    } catch (error) {
      console.error('删除任务失败:', error);
    }
  };

  // 根据筛选条件过滤任务
  useEffect(() => {
    let result = todos;
    
    // 标签筛选
    if (filterTag !== 'all') {
      result = result.filter(todo => todo.tag === filterTag);
    }
    
    // 完成状态筛选
    if (!showCompleted) {
      result = result.filter(todo => !todo.completed);
    }
    
    setFilteredTodos(result);
  }, [todos, filterTag, showCompleted]);

  // 组件挂载时获取数据
  useEffect(() => {
    fetchTodos();
  }, []);

  // 获取所有标签
  const getAllTags = () => {
    const tags = [...new Set(todos.map(todo => todo.tag))];
    return tags.filter(tag => tag !== '无标签');
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">加载中...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold">我的待办</h2>
        <Button onClick={() => window.location.hash = '#/add'}>
          <Plus className="mr-2 h-4 w-4" />
          添加任务
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>任务筛选</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-1 block">按标签筛选</label>
              <Select value={filterTag} onValueChange={setFilterTag}>
                <SelectTrigger>
                  <SelectValue placeholder="选择标签" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部标签</SelectItem>
                  {getAllTags().map(tag => (
                    <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                  ))}
                  <SelectItem value="无标签">无标签</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                variant={showCompleted ? "default" : "outline"}
                onClick={() => setShowCompleted(!showCompleted)}
                className="w-full sm:w-auto"
              >
                {showCompleted ? '隐藏已完成' : '显示已完成'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {filteredTodos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {todos.length === 0 
                ? '暂无任务，点击"添加任务"开始规划吧！' 
                : '没有匹配的筛选结果'}
            </p>
          </div>
        ) : (
          filteredTodos.map(todo => (
            <TodoItem
              key={todo.$id}
              todo={todo}
              onToggle={toggleTodo}
              onEdit={(todo) => window.location.hash = `#/edit/${todo.$id}`}
              onDelete={deleteTodo}
            />
          ))
        )}
      </div>

      <div className="text-sm text-gray-500 py-4 border-t">
        总共 {todos.length} 项任务，已完成 {todos.filter(t => t.completed).length} 项
      </div>
    </div>
  );
};

export default TodoList;
