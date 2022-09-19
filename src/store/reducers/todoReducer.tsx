import { Task } from '../../models/task';
import { ActionTypes } from '../actions/todoActions'

interface InitialState {
   tasks: Task[];
}

interface Action {
   type: ActionTypes,
   payload: any
}

const INITIAL_STATE: InitialState = {
   tasks: [],
}

export const todoReducer = (state = INITIAL_STATE, action: Action) => {
   switch (action.type) {
      case 'SET_TASKS':
         return {
            ...state,
            tasks: action.payload.tasks
         }

      case 'ADD_TASK':
         return {
            ...state,
            tasks: [...state.tasks, action.payload.task as Task],
         };

      case 'UPDATE_TASK':
         const updatedTasks = state.tasks.map(task => {
            if (task.id === action.payload.id) {
               return {
                  ...task,
                  ...action.payload.updateData
               }
            }

            return task
         });


         return {
            ...state,
            tasks: updatedTasks,
         };

      case 'DELETE_TASK':
         const newTasks = state.tasks.filter(task => task.id !== action.payload.id);

         return {
            ...state,
            tasks: newTasks,
         };


      case 'TOGGLE':
         const toggledTasks = state.tasks.map(task => {
            if (task.id === action.payload.id) {
               return {
                  ...task,
                  done: !task.done
               }
            }

            return task
         });

         return {
            ...state,
            tasks: toggledTasks,
         };

      default:
         return state
   }
}