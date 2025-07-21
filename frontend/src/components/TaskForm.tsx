import React, { useState } from 'react';

interface TaskFormProps {
  onAdd: (title: string, deadline: string) => void;
}

function getToday() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

const TaskForm: React.FC<TaskFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState(getToday());
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim().length <= 10) {
      setError('Task must be longer than 10 characters.');
      return;
    }
    if (!deadline) {
      setError('Deadline is required.');
      return;
    }
    setError('');
    onAdd(title.trim(), deadline);
    setTitle('');
    setDeadline(getToday());
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <label htmlFor="task-title" style={{ fontWeight: 500 }}>Task Title</label>
        <input
          id="task-title"
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{ width: 320, padding: 8, border: '1px solid #ccc', borderRadius: 4 }}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <label htmlFor="task-deadline" style={{ fontWeight: 500 }}>Deadline <span style={{ color: 'red' }}>*</span></label>
        <input
          id="task-deadline"
          type="date"
          value={deadline}
          onChange={e => setDeadline(e.target.value)}
          style={{ width: 180, padding: 8, border: '1px solid #ccc', borderRadius: 4 }}
          required
        />
      </div>
      <button type="submit" style={{ padding: '8px 20px', borderRadius: 4, border: 'none', background: '#1976d2', color: 'white', fontWeight: 500, cursor: 'pointer' }}>
        Add Task
      </button>
      {error && <div style={{ color: 'red', marginTop: 4 }}>{error}</div>}
    </form>
  );
};

export default TaskForm; 