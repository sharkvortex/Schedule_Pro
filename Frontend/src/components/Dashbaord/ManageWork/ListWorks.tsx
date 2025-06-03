import TableWorks from "./TableWorks";
import EditWork from "./EditWork";
import { useState } from "react";
import { WorkDataType } from "../../../hooks/admin/Work/useGetWork";
import DeleteWork from "./DeleteWork";
interface EditAndCreateProps {
  isEditWork: boolean;
  setIsEditWork: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
  isCreate: boolean;
  workData?: WorkDataType | WorkDataType[];
  refetch: () => void;
}

function ListWorks({ isEditWork, setIsEditWork , workData ,refetch }: EditAndCreateProps) {
  const [dataEdit, setDataEdit] = useState<WorkDataType>();
  const [deleteWork , setDeleteWork] = useState<boolean>(false)
  const [idDelete , setIdDelete] = useState<number>()
  return (
    <>
    {deleteWork && <DeleteWork onCancel={()=> setDeleteWork(false)} id={idDelete} refetch={() => {
      refetch()
      setDeleteWork(false)
      }}/>}
      <div className="w-full relative">
        <TableWorks
          works={
            workData ? (Array.isArray(workData) ? workData : [workData]) : []
          }
          onEdit={(work) => {
            setIsEditWork(true);
            setDataEdit(work);
          }}
          onDelete={(id?:number) => {
            setDeleteWork(true)
            setIdDelete(id)
          }}
          isEditWork={isEditWork}
        />
        <EditWork
          isEditWork={isEditWork}
          setIsEditWork={setIsEditWork}
          data={dataEdit}
          refetch={()=> refetch()}
        />
      </div>
    </>
  );
}

export default ListWorks;
