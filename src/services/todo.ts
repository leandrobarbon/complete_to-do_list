import { Task } from '../models/task'

export const getTasks = (): Task[] => {
   const storageTasks = localStorage.getItem('@tasks');

   if (!storageTasks) {
      return []
   }

   const tasks = JSON.parse(storageTasks) as Task[];
   return tasks
}

export const getTask = (id: string): Task | null => {
   const storageTasks = localStorage.getItem('@tasks');

   if (!storageTasks) {
      return null;
   }

   const tasks = JSON.parse(storageTasks) as Task[];

   const task = tasks.find(task => task.id === id)

   if (!task) return null;

   return task;
}

export const createTask = (task: Task): string => {
   const storageTasks = localStorage.getItem('@tasks');

   const newTask: Task = {
      ...task,
      done: false
   }

   if (storageTasks) {
      const newTasks = [...JSON.parse(storageTasks), newTask];

      localStorage.setItem('@tasks', JSON.stringify(newTasks));

      return task.id;
   }

   const newTasks = [newTask];

   localStorage.setItem('@tasks', JSON.stringify(newTasks));

   return task.id;
}

export const updateTask = (id: string, data: Partial<Task>): Task | null => {
   const storageTasks = localStorage.getItem('@tasks');

   if (!storageTasks) {
      return null;
   }

   const tasks = JSON.parse(storageTasks) as Task[];

   let updatedTask: Task | null = null;

   const newTasks = tasks.map(task => {
      if (task.id === id) {
         updatedTask = task;

         return {
            ...task,
            ...data
         }
      }

      return task
   })

   localStorage.setItem('@tasks', JSON.stringify(newTasks));

   return updatedTask;
}

export const removeTask = (id: string): string | null => {
   const storageTasks = localStorage.getItem('@tasks');

   if (!storageTasks) {
      return null;
   }

   const tasks = JSON.parse(storageTasks) as Task[];

   const newTasks = tasks.filter(task => task.id !== id);

   localStorage.setItem('@tasks', JSON.stringify(newTasks));

   return id;
}

export const completeTask = (id: string) => {
   const storageTasks = localStorage.getItem('@tasks');

   if (!storageTasks) return

   const tasks = JSON.parse(storageTasks) as Task[];

   const newTasks = tasks.map(task => {
      if (task.id === id) {
         return {
            ...task,
            done: !task.done
         }
      }

      return task
   })

   localStorage.setItem('@tasks', JSON.stringify(newTasks));
}