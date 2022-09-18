import { useState, useEffect, FormEvent, useImperativeHandle, forwardRef, ChangeEvent } from "react";
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import { RiCloseFill } from "react-icons/ri";

import { Task } from '../models/task'
import { createTask, updateTask as editTaskService } from '../services/todo';
import { addTodo, updateTask } from '../store/actions/todoActions'

export interface ModalHandles {
   openModal: (task?: Task) => void
}

interface ModalProps {

}


export const CreateEditModal = forwardRef((props: ModalProps, ref) => {
   const dispatch = useDispatch()

   const [visible, setVisible] = useState(false)
   const [formData, setFormData] = useState<Task>({
      id: '',
      name: '',
      description: '',
      done: false
   })
   const [isEditing, setIsEditing] = useState(false)

   const openModal = (task?: Task) => {
      if (task) {
         setIsEditing(true);
         setFormData({ ...formData, ...task })
      }

      setVisible(true)
   }

   const closeModal = () => {
      setVisible(false);
      setIsEditing(false);
   }

   const registerTask = () => {
      const data: Task = {
         id: uuidv4(),
         name: formData.name,
         description: formData.description,
      }

      createTask(data);

      dispatch(addTodo(data))

      closeModal()
   }

   const editTask = (data: Task) => {
      editTaskService(formData.id, { ...data })
      dispatch(updateTask(formData.id, { ...data }))
      closeModal()
   }

   const handleSubmit = async (event: FormEvent) => {
      event.preventDefault();

      if (isEditing) {
         return editTask(formData);
      }

      registerTask()
   }


   const handleChangeInput = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target
      setFormData({ ...formData, [name]: value })
   }

   useImperativeHandle(ref, () => ({
      openModal
   }))


   if (!visible) {
      return null
   }


   return (
      <div
         className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
         <div className="relative w-[500px] my-6 mx-3xl max-w-3xl">

            <form onSubmit={handleSubmit} className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

               <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-lg font-semibold">
                     {isEditing ? 'Editar' : 'Cadastrar'} Tarefa
                  </h3>
                  <RiCloseFill
                     onClick={closeModal}
                     size={24}
                     className='cursor-pointer '
                  />
               </div>

               <div className="relative p-6 flex flex-col gap-4">
                  <label className="flex flex-col text-xs">
                     Nome Tarefa
                     <input
                        className="w-full bg-gray-200 text-sm px-3 py-2 rounded-md outline-none"
                        type="text"
                        name="name"
                        placeholder="Nome Tarefa"
                        value={formData.name}
                        onChange={handleChangeInput}
                     />
                  </label>
                  <label className="flex flex-col text-xs">
                     Descrição
                     <textarea
                        className="w-full bg-gray-200 text-sm px-3 py-2 rounded-md outline-none"
                        placeholder="Descreva a tarefa..."
                        name="description"
                        value={formData.description}
                        onChange={handleChangeInput}
                     />
                  </label>
               </div>


               <div className="flex items-center justify-center p-6  border-slate-200 rounded-b">
                  <button
                     className="bg-[#066163] text-white hover:bg-[#066163CC] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  >
                     {isEditing ? 'Editar' : 'Cadastrar'} Tarefa
                  </button>
               </div>
            </form>
         </div>
      </div>
   )
})