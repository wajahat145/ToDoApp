import React from 'react';

export interface Task {
  id: number;
  title: string;
  deadline?: string;
  isDone: boolean;
}

interface TaskTableProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onToggleDone: (id: number) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, onDelete, onToggleDone }) => {
  const isOverdue = (deadline?: string) => {
    if (!deadline) return false;
    return new Date(deadline) < new Date() && !isNaN(Date.parse(deadline));
  };

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '2rem', background: '#fafbfc' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid #ddd', padding: '10px', background: '#f0f0f0', fontWeight: 600 }}>Title</th>
          <th style={{ border: '1px solid #ddd', padding: '10px', background: '#f0f0f0', fontWeight: 600 }}>Deadline</th>
          <th style={{ border: '1px solid #ddd', padding: '10px', background: '#f0f0f0', fontWeight: 600 }}>Status</th>
          <th style={{ border: '1px solid #ddd', padding: '10px', background: '#f0f0f0', fontWeight: 600 }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(task => {
          let status: React.ReactNode = 'Pending';
          let statusStyle: React.CSSProperties = {};
          if (task.isDone) {
            status = 'Done';
            statusStyle = { color: '#388e3c', fontWeight: 600 };
          } else if (isOverdue(task.deadline)) {
            status = 'Overdue';
            statusStyle = { color: '#d32f2f', fontWeight: 600 };
          }
          return (
            <tr key={task.id} style={{ color: isOverdue(task.deadline) && !task.isDone ? 'red' : undefined }}>
              <td style={{ border: '1px solid #ddd', padding: '10px' }}>{task.title}</td>
              <td style={{ border: '1px solid #ddd', padding: '10px' }}>{task.deadline ? new Date(task.deadline).toLocaleDateString() : '-'}</td>
              <td style={{ border: '1px solid #ddd', padding: '10px', ...statusStyle }}>{status}</td>
              <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                <button onClick={() => onToggleDone(task.id)} disabled={task.isDone} style={{ marginRight: 8, padding: '6px 14px', borderRadius: 4, border: 'none', background: task.isDone ? '#aaa' : '#43a047', color: 'white', cursor: task.isDone ? 'not-allowed' : 'pointer' }}>
                  Mark as Done
                </button>
                <button onClick={() => onDelete(task.id)} style={{ padding: '6px 14px', borderRadius: 4, border: 'none', background: '#d32f2f', color: 'white', cursor: 'pointer' }}>
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TaskTable; 