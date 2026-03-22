import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { databases } from '../appwriteClient';
import TodoForm from '../components/TodoForm';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';

const EditTodoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const todo = await databases.getDocument('todo_db', 'todos_table', id);
        setInitialData({
          title: todo.title,
          tag: todo.tag
        });
      } catch (error) {
        console.error('获取任务失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  const handleSubmit = async (data) => {
    try {
      await databases.updateDocument('todo_db', 'todos_table', id, {
        title: data.title,
        tag: data.tag
      });
      navigate('/');
    } catch (error) {
      console.error('更新任务失败:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">加载中...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto w-full">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/')}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        返回
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle>编辑任务</CardTitle>
        </CardHeader>
        <CardContent>
          <TodoForm 
            initialData={initialData} 
            onSubmit={handleSubmit} 
            onCancel={() => navigate('/')} 
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default EditTodoPage;
