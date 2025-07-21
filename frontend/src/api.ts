import { Task } from './types/Task';

const API_URL = 'http://localhost:5000/api/tasks';

export async function fetchTasks(page = 1, pageSize = 10): Promise<{ items: Task[]; total: number }> {
  const res = await fetch(`${API_URL}?page=${page}&pageSize=${pageSize}`);
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
}

export async function addTask(title: string, deadline: string): Promise<Task> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, deadline })
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Failed to add task');
  return res.json();
}

export async function deleteTask(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete task');
}

export async function markTaskDone(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/${id}/done`, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to mark task as done');
} 