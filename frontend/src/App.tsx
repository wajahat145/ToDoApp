import React, { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskTable from './components/TaskTable';
import { Task } from './types/Task';
import { fetchTasks, addTask, deleteTask, markTaskDone } from './api';

const PAGE_SIZE = 5;

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const loadTasks = async (pageNum = page) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTasks(pageNum, PAGE_SIZE);
      setTasks(data.items);
      setTotal(data.total);
    } catch (err: any) {
      setError(err.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks(page);
    // eslint-disable-next-line
  }, [page]);

  const handleAddTask = async (title: string, deadline: string) => {
    setActionLoading(true);
    setError(null);
    try {
      await addTask(title, deadline);
      setPage(1); // Go to first page after adding
      await loadTasks(1);
    } catch (err: any) {
      setError(err.message || 'Failed to add task');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteTask = async (id: number) => {
    setActionLoading(true);
    setError(null);
    try {
      await deleteTask(id);
      // If last item on page deleted, go to previous page if not first
      const newTotal = total - 1;
      const lastPage = Math.max(1, Math.ceil(newTotal / PAGE_SIZE));
      if (page > lastPage) setPage(lastPage);
      else await loadTasks(page);
      setTotal(newTotal);
    } catch (err: any) {
      setError(err.message || 'Failed to delete task');
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleDone = async (id: number) => {
    setActionLoading(true);
    setError(null);
    try {
      await markTaskDone(id);
      await loadTasks(page);
    } catch (err: any) {
      setError(err.message || 'Failed to mark task as done');
    } finally {
      setActionLoading(false);
    }
  };

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center' }}>ToDo App</h1>
      <TaskForm onAdd={handleAddTask} />
      {loading ? (
        <div style={{ marginTop: 32 }}>Loading tasks...</div>
      ) : error ? (
        <div style={{ color: 'red', marginTop: 32 }}>{error}</div>
      ) : (
        <>
          <TaskTable tasks={tasks} onDelete={handleDeleteTask} onToggleDone={handleToggleDone} />
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 24, gap: 16 }}>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ padding: '6px 16px', borderRadius: 4, border: '1px solid #ccc', background: page === 1 ? '#eee' : '#fff', cursor: page === 1 ? 'not-allowed' : 'pointer' }}>Prev</button>
            <span>Page {page} of {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{ padding: '6px 16px', borderRadius: 4, border: '1px solid #ccc', background: page === totalPages ? '#eee' : '#fff', cursor: page === totalPages ? 'not-allowed' : 'pointer' }}>Next</button>
          </div>
        </>
      )}
      {actionLoading && <div style={{ marginTop: 16 }}>Processing...</div>}
    </div>
  );
};

export default App;
