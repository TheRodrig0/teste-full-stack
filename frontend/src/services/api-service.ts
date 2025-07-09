import type { Task, NewTask } from '../types/task'
import { apiFetch } from '../utils/api-fetch'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const TASKS_ENDPOINT = `${API_BASE_URL}task/`

export function getTasks(): Promise<Task[]> {
  return apiFetch<Task[]>(TASKS_ENDPOINT)
}

export function addTask(taskData: NewTask): Promise<Task> {
  return apiFetch<Task>(TASKS_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(taskData),
  })
}

export function updateTask(id: string, updates: Partial<NewTask & { completed: boolean }>): Promise<Task> {
  return apiFetch<Task>(`${TASKS_ENDPOINT}${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  })
}

export function deleteTask(id: string): Promise<void> {
  return apiFetch<void>(`${TASKS_ENDPOINT}${id}`, {
    method: 'DELETE',
  })
}