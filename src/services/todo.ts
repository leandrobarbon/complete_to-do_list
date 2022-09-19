import { Task } from '../models/task'

// Busca no localstorage e retorna as tarefas
export const getTasks = (): Task[] => {
   const storageTasks = localStorage.getItem('@tasks');

   if (!storageTasks) {
      return []
   }

   const tasks = JSON.parse(storageTasks) as Task[];
   return tasks
}

// Cria no localstorage um array com a tarefa adicionada, se tarefa já existe, 
// ele pega tudo e adiciona o novo no final.
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

// Em caso de clique no edite, ele é ativo para fazer o ajuste, apos clicar
// "editar tarefa", ele salva novamente no localstorage
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

// Chama localstorage, aonde é filtrado e mostrando somente o que é diferente
// do clicado, assim salvado os que foram diferente do clique no localstorage
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


// Busca no localstorage todos e verifica pelo id aonde foi clicado, se id
// for igual que tem no localstorage, ele troca estado do done de false para
// true, assim se dando como tarefa concluída.
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