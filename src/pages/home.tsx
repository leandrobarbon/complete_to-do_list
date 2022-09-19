import { useState, useEffect, useRef, useCallback } from 'react';

import { ListTasks } from '../components/ListTasks';
import { Tabs } from '../components/Tabs';
import { ALL, DONE, NOT_DONE } from '../types/todo'
import { CreateEditModal, ModalHandles } from '../components/CreateEditModal';


export function Home() {
   const modalRef = useRef<ModalHandles>(null)
   const [typeList, setTypeList] = useState(ALL);

   // responsavel pela abertura da modal
   const handleOpenModal = () => {
      modalRef.current?.openModal();
   }

   // responsavel por gerenciar o clique nas tabs para mostrar as tarefas
   // todas, concluídas, e não concluídas
   const handleChangeList = useCallback(
      (typelist: number) => {
         setTypeList(typelist)
      },
      [],
   )


   return (
      <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>

         <div className="flex justify-between w-11/12 flex-col gap-6 flex-wrap-reverse lg:w-full lg:px-14 lg:flex-row ">
            <h1 className='text-[#222831] text-4xl'>To Do List</h1>
            <button
               className='bg-[#0089BF] hover:bg-[#0089BFCC] text-[#FFF] rounded-md px-4 w-fit min-h-[40px]'
               onClick={handleOpenModal}
            >
               Adicionar Tarefa
            </button>
         </div>

         <div className="w-11/12 mt-16 lg:flex flex-col items-center">
            <Tabs typeList={typeList} onChangeTypeList={handleChangeList} />

            <ListTasks typeList={typeList} />

            <CreateEditModal
               ref={modalRef}
            />
         </div>
      </div>
   )
}

