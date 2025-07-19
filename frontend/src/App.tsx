import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskTable, { Task } from './components/TaskTable';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [nextId, setNextId] = useState(1);

  const handleAddTask = (title: string, deadline: string) => {
    setTasks(prev => [
      ...prev,
      { id: nextId, title, deadline, isDone: false }
    ]);
    setNextId(id => id + 1);
  };

  const handleDeleteTask = (id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const handleToggleDone = (id: number) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, isDone: true } : task
    ));
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center' }}>ToDo App</h1>
      <TaskForm onAdd={handleAddTask} />
      <TaskTable tasks={tasks} onDelete={handleDeleteTask} onToggleDone={handleToggleDone} />
    </div>
  );
};

export default App;
