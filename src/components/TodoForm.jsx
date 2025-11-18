import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const TodoForm = ({ onSubmit, initialData, onCancel }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [tag, setTag] = useState(initialData?.tag || '');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('请输入任务标题');
      return;
    }
    onSubmit({ title, tag: tag || '无标签' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">任务标题 *</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error && e.target.value.trim()) {
              setError('');
            }
          }}
          placeholder="输入任务标题"
          className={error ? 'border-red-500' : ''}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="tag">标签</Label>
        <Select value={tag} onValueChange={setTag}>
          <SelectTrigger>
            <SelectValue placeholder="选择标签" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="工作">工作</SelectItem>
            <SelectItem value="学习">学习</SelectItem>
            <SelectItem value="生活">生活</SelectItem>
            <SelectItem value="购物">购物</SelectItem>
            <SelectItem value="健康">健康</SelectItem>
            <SelectItem value="无标签">无标签</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          取消
        </Button>
        <Button type="submit">{initialData ? '更新任务' : '添加任务'}</Button>
      </div>
    </form>
  );
};

export default TodoForm;
