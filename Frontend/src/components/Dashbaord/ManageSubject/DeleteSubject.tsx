import React from 'react';
import { useDeleteSubject } from '../../../hooks/admin/Subject/useDeleteSubject';
import Loading from '../../UI/Loading';
interface DeleteSubjectProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id:number) => void;
  subjectId:number
}

const DeleteSubject: React.FC<DeleteSubjectProps> = ({ isOpen, onClose, onConfirm ,subjectId  }) => {
  if (!isOpen) return null;
  const {deleting} = useDeleteSubject();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-[90%] max-w-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">คุณแน่ใจหรือไม่?</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">คุณต้องการลบรายวิชานี้จริง ๆ ใช่หรือไม่? การลบจะไม่สามารถย้อนกลับได้</p>
        
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition hover:cursor-pointer"
          >
            ยกเลิก
          </button>
          <button
            onClick={()=>onConfirm(subjectId)}
            className={`px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-lg transition ${deleting ? "cursor-not-allowed" : "hover:cursor-pointer"}`}
          >
           {deleting ? <div className='px-4'><Loading size={12}/></div>  : "ยืนยันการลบ"} 
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteSubject;
