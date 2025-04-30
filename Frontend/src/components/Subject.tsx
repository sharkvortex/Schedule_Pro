import { useParams } from 'react-router-dom';
import { Book, Clock, User } from 'lucide-react';

function Subject() {
  const { subjectId } = useParams<{ subjectId: string }>();
  return (
    <div className='w-full min-h-screen min-w-[340px]'>
      <div className='w-full min-w-[340px] mx-auto p-6 rounded-lg shadow-md '>
        <div className='text-xl font-semibold mb-4 text-center'>รายละเอียดวิชา</div>
        
        <div className='mb-6 flex  items-center space-x-4'>
          <Book className='h-6 w-6 text-blue-500' />
          <div>
            <h3 className='text-sm sm:text-lg font-bold'>รหัสวิชา</h3>
            <span className='text-xs sm:text-sm'>{subjectId}</span>
          </div>
        </div>
        
        <div className='mb-6 flex  items-center space-x-4'>
          <Book className='h-6 w-6 text-blue-500'/>
          <div>
            <h3 className='text-sm sm:text-lg font-bold'>ชื่อวิชา</h3>
            <span className='text-xs sm:text-sm'>วิชา 1</span> 
          </div>
        </div>

        <div className='mb-6 flex  items-center space-x-4'>
          <Clock className='h-6 w-6 text-yellow-500' />
          <div>
            <h3 className='text-sm sm:text-lg font-bold'>เวลาเรียน</h3>
            <span className='text-xs sm:text-sm'>จันทร์-พฤหัสบดี 9:00 - 12:00</span> 
          </div>
        </div>

        <div className='mb-6 flex  items-center space-x-4'>
          <User className='h-6 w-6 text-green-500' />
          <div>
            <h3 className='text-sm sm:text-lg font-bold'>อาจารย์</h3>
            <span className='text-xs sm:text-sm'>อาจารย์สมชาย</span> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subject;
