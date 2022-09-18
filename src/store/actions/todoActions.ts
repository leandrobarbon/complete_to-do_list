import { Task } from '../../models/task';

export type ActionTypes = "ADD_TASK" | "SET_TASKS" | "UPDATE_TASK" | "DELETE_TASK" | "TOGGLE"

export const setTasks = (tasks: Task[]) => {
   return {
      type: 'SET_TASKS',
      payload: { tasks }
   }
}

export const addTodo = (task: Task) => {
   return {
      type: 'ADD_TASK',
      payload: { task }
   }
}

export const deleteTask = (id: string) => {
   return {
      type: 'DELETE_TASK',
      payload: { id }
   }
}

export const updateTask = (id: string, data: Partial<Task>) => {
   return {
      type: 'UPDATE_TASK',
      payload: { id, updateData: data }
   }
}

export const toggleTask = (id: string) => {
   return {
      type: 'TOGGLE',
      payload: { id }
   }
}
