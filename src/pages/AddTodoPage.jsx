import React from 'react';
import { useNavigate } from 'react-router-dom';
import { databases } from '../appwriteClient';
import TodoForm from '../components/TodoForm';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';

const AddTodoPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await databases.createDocument('todo_db', 'todos_table', 'unique()', {
        title: data.title,
        tag: data.tag,
        completed: false
      });
      navigate('/');
    } catch (error) {
      console.error('创建任务失败:', error);
    }
  };

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
          <CardTitle>添加任务</CardTitle>
        </CardHeader>
        <CardContent>
          <TodoForm 
            onSubmit={handleSubmit} 
            onCancel={() => navigate('/')} 
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddTodoPage;
