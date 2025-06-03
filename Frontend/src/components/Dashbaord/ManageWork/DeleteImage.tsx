import { Trash2 } from "lucide-react";
import Loading from "../../UI/Loading";

type DeleteImageProps = {
  fileId: string;
  onConfirm: (fileId: string) => void;
  onCancel: () => void;
  loading: boolean;
};

function DeleteImage({
  fileId,
  onConfirm,
  onCancel,
  loading,
}: DeleteImageProps) {
  return (
    <div className="w-full min-h-screen fixed top-0 left-0 z-50 bg-black/40 bg-opacity-40 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 shadow-lg w-80 text-center space-y-4">
        <div className="flex justify-center">
          <Trash2 size={40} className="text-red-500" />
        </div>
        <h5 className="text-lg font-semibold text-gray-800">
          ยืนยันการลบรูปภาพนี้ใช่ไหม?
        </h5>
        <p className="text-sm text-gray-600">fileId: {fileId}</p>
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => onCancel()}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 hover:cursor-pointer"
          >
            ยกเลิก
          </button>
          <button
            disabled={loading}
            onClick={() => onConfirm(fileId)}
            className={`px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white font-medium ${
              loading ? "hover:cursor-not-allowed" : "hover:cursor-pointer"
            } `}
          >
            {loading ? (
              <div className="flex items-center justify-center px-4">
                <Loading size={10} />
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

export default DeleteImage;
