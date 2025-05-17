import TableWorks from "./TableWorks";
import { useGetWork } from "../../../hooks/admin/Work/useGetWork";
import EditWork from "./EditWork";
import { useState } from "react";
import { WorkDataType } from "../../../hooks/admin/Work/useGetWork";

interface EditAndCreateProps {
  isEditWork: boolean;
  setIsEditWork: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
  isCreate: boolean;
}

function ListWorks({ isEditWork, setIsEditWork }: EditAndCreateProps) {
  const [dataEdit, setDataEdit] = useState<WorkDataType>();
  const { workData } = useGetWork();

  return (
    <>
      <div className="w-full relative">
        <TableWorks
          works={
            workData ? (Array.isArray(workData) ? workData : [workData]) : []
          }
          onEdit={(work) => {
            setIsEditWork(true);
            setDataEdit(work);
          }}
          onDelete={() => console.log("delete")}
          isEditWork={isEditWork}
        />
        <EditWork
          isEditWork={isEditWork}
          setIsEditWork={setIsEditWork}
          data={dataEdit}
        />
      </div>
    </>
  );
}

export default ListWorks;
