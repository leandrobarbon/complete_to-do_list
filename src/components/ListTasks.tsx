import { useEffect, useMemo, useRef } from 'react';

import { TbEdit } from "react-icons/tb";
import { RiDeleteBin2Line, RiCheckboxCircleLine, RiCloseFill } from "react-icons/ri";

import { ALL, DONE, NOT_DONE } from '../types/todo'
import { CreateEditModal, ModalHandles } from './CreateEditModal';


import { useAppSelector, useAppDispatch } from '../store/'
import { setTasks, deleteTask, toggleTask } from '../store/actions/todoActions'
import { getTasks, removeTask, completeTask } from '../services/todo';



interface ListTasks {
   typeList: number;

}

export function ListTasks({ typeList }: ListTasks) {
   const modalRef = useRef<ModalHandles>(null);
   const tasks = useAppSelector(stores => stores.tasks);
   const dispatch = useAppDispatch()

   const handleRemoveTask = (id: string) => {
      removeTask(id);
      dispatch(deleteTask(id));
   }

   const handleCompletedTask = (id: string) => {
      completeTask(id);
      dispatch(toggleTask(id));
   }

   const handleModalEdit = (id: string) => {
      const task = tasks.find(task => task.id === id);
      modalRef.current?.openModal(task)
   }

   const filteredTasks = useMemo(() => {
      if (typeList === NOT_DONE) {
         return tasks.filter(task => !task.done)
      }

      if (typeList === DONE) {
         return tasks.filter(task => task.done)
      }


      return []
   }, [typeList, tasks])


   useEffect(() => {
      const tasks = getTasks();
      dispatch(setTasks(tasks));
   }, [])

   return (
      <div className='bg-[#FFFFFF] h-auto rounded-b-lg mt-4 w-full overflow-auto lg:w-[768px]'>
         <table className='w-full table-auto min-w-[400px]'>
            <thead>
               <tr className='w-full'>
                  <th className='w-10'></th>
                  <th className='text-left text-[#333333] py-2 px-4'>Tarefa</th>
                  <th className='text-left text-[#333333] py-2 px-4'>Descrição</th>
                  <th></th>
               </tr>
            </thead>
            <tbody>
               {(filteredTasks?.length > 0 ? filteredTasks : tasks)?.map(task => {
                  return (
                     <tr className={`w-full border-t-2 text-[#333333]  border-[#EBEBEB] ${task.done ? 'line-through' : ''}`} key={task.id}>
                        <td className='p-4'> 
                           {task.done ? (
                           <RiCloseFill
                              className='cursor-pointer'
                              size={24}
                              onClick={() => handleCompletedTask(task.id)}
                           />
                        ) : (
                           <RiCheckboxCircleLine
                              className='cursor-pointer'
                              size={24}
                              onClick={() => handleCompletedTask(task.id)}
                           />
                        )}
                        </td>
                        <td className='p-4'>{task.name}</td>
                        <td className='p-4'>{task.description}</td>
                        <td className='p-4 flex gap-2 justify-end'>
                           <TbEdit
                              className='cursor-pointer'
                              size={24}
                              onClick={() => handleModalEdit(task.id)}
                           />

                           <RiDeleteBin2Line
                              className='cursor-pointer '
                              size={24}
                              color="#FF2626"
                              onClick={() => handleRemoveTask(task.id)}
                           />
                        </td>
                     </tr>
                  )
               })}
            </tbody>
         </table>

         <CreateEditModal ref={modalRef} />
      </div>
   )
}