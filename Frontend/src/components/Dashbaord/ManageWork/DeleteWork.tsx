import { useDeleteWork } from "../../../hooks/admin/Work/useDeleteWork";
import Loading from "../../UI/Loading";
export interface DeleteWorkProps {
  onCancel: () => void;
  refetch: () => void;
  id: number | undefined;
}

function DeleteWork({ onCancel, id, refetch }: DeleteWorkProps) {
  const { deleteWork, workDeleting } = useDeleteWork();
  const onConfirm = async (id: number | undefined) => {
    try {
      await deleteWork(id);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full min-h-screen fixed top-0 left-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-sm">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          คุณแน่ใจหรือไม่?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          หากลบงานนี้แล้วจะไม่สามารถกู้คืนได้
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition hover:cursor-pointer"
          >
            ยกเลิก
          </button>
          <button
            disabled={workDeleting}
            onClick={() => onConfirm(id)}
            className={`px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition  ${
              workDeleting ? "hover:cursor-not-allowed" : "hover:cursor-pointer"
            }`}
          >
            {workDeleting ? (
              <div className="flex items-center justify-center px-1">
                <Loading size={12} />
              </div>
            ) : (
              "ลบ"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteWork;
