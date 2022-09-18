import { useAppSelector } from '../store'

interface TabsProps {
   typeList: number,
   onChangeTypeList: (typelist: number) => void
}

const ALL = 0;
const NOT_DONE = 1;
const DONE = 2;

export const Tabs = ({ typeList, onChangeTypeList }: TabsProps) => {
   const tasks = useAppSelector(stores => stores.tasks);


   const notDoneTasksValue = tasks.filter(task => !task.done).length;
   const doneTasksValue = tasks.filter(task => task.done).length


   return (
      <nav className='flex gap-6 flex-col lg:flex-row'>
         <button
            onClick={() => onChangeTypeList(ALL)}
            className={`${typeList === ALL ? 'bg-[#1E2A4E33]' : 'bg-[#1E2A4E1A]'} hover:bg-[#1E2A4E1A flex justify-center items-center rounded-t-lg py-3 text-[#333333] w-full lg:w-60`}>
            <p className='mr-2 h-10 rounded-md flex justify-center items-center bg-white text-lg text-[#066163] w-10'>
               {tasks.length}
            </p>
            <span>Lista tarefas</span>
         </button>
         <button
            onClick={() => onChangeTypeList(NOT_DONE)}
            className={`${typeList === NOT_DONE ? 'bg-[#1E2A4E33]' : 'bg-[#1E2A4E1A]'} hover:bg-[#1E2A4E1A] flex justify-center items-center rounded-t-lg py-3 text-[#333333] w-full lg:w-60`}>
            <p className='mr-2 w-10 h-10 rounded-md flex justify-center items-center bg-white text-lg text-[#066163] '>
               {notDoneTasksValue}
            </p>
            <span>Tarefas não concluídas</span>
         </button>
         <button
            onClick={() => onChangeTypeList(DONE)}
            className={`${typeList === DONE ? 'bg-[#1E2A4E33]' : 'bg-[#1E2A4E1A]'} hover:bg-[#1E2A4E1A] flex justify-center items-center rounded-t-lg py-3 text-[#333333] w-full lg:w-60`}>
            <p className='mr-2 w-10 h-10 rounded-md flex justify-center items-center bg-white text-lg text-[#066163] '>
               {doneTasksValue}
            </p>
            <span>Tarefas concluídas</span>
         </button>
      </nav >
   )
}