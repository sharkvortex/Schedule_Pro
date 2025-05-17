import {
  FileText,
  CalendarDays,
  Link as LinkIcon,
  Image as ImageIcon,
  ClipboardSignature,
  BookOpenText,
  X,
  Trash2,
} from "lucide-react";

import { WorkDataType } from "../../../hooks/admin/Work/useGetWork";
import { useState } from "react";
import DeleteImage from "./DeleteImage";
import { useDeleteImage } from "../../../hooks/admin/Work/useDeleteImage";
export interface EditWorkProps {
  setIsEditWork: React.Dispatch<React.SetStateAction<boolean>>;
  isEditWork: boolean;
  data: WorkDataType | undefined;
}
function EditWork({ isEditWork, data, setIsEditWork }: EditWorkProps) {
  if (!data) return null;

  const {
    subject,
    subject_id,
    title,
    description,
    assignedDate,
    dueDate,
    link,
    linkCode,
  } = data;

  const [images, setImages] = useState(data?.images || []);
  const [dataEditWork, setDataEditWork] = useState({
    title: title || "",
    description: description || "",
    assignedDate: assignedDate?.slice(0, 10) || "",
    dueDate: dueDate?.slice(0, 10) || "",
    link: link || "",
    linkCode: linkCode || "",
    files: [] as File[],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDataEditWork((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { deleteImage , imagedeleting } = useDeleteImage();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const files: File[] = [...dataEditWork.files];

    const combinedData = {
      title: dataEditWork.title,
      description: dataEditWork.description,
      assignedDate: dataEditWork.assignedDate,
      dueDate: dataEditWork.dueDate,
      link: dataEditWork.link,
      linkCode: dataEditWork.linkCode,
      files: files,
    };

    console.log("Combined Data:", combinedData);
  };

  const [onDeleteImage, setOnDeleteImage] = useState<boolean>(false);
  const [fileId, setfileId] = useState("");
  const handleDeleteImage = (fileId: string) => {
    if (fileId) {
      setOnDeleteImage(true);
      setfileId(fileId);
    }
  };

  return (
    <>
      {onDeleteImage && (
        <DeleteImage
          fileId={fileId}
          onConfirm={async (fileId) => {
            try {
              await deleteImage(fileId);
              setImages((prev) => prev.filter((img) => img.fileId !== fileId)); // ลบออกจาก state ก็ต่อเมื่อสำเร็จ
              setOnDeleteImage(false);
            } catch (error) {
              console.log(error)
            }
          }}
          onCancel={() => setOnDeleteImage(false)}
          loading={imagedeleting}
        />
      )}

      {isEditWork && (
        <div className="w-full normal-bg z-20   h-max transition-all duration-300">
          <form onSubmit={handleSubmit} className="w-full normal-bg space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold ">📝 Edit Work</h2>
              </div>
              <div
                onClick={() => setIsEditWork(false)}
                className="hover:text-red-500 hover:cursor-pointer "
              >
                <X />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="flex items-center gap-2 font-semibold">
                <BookOpenText size={18} /> Subject
              </label>
              <div className="mt-1 w-full p-2 bg-gray-400 rounded-md text-gray-800 dark:text-white select-none">
                {`${subject_id} - ${subject.subject_name}`}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="flex items-center gap-2  font-semibold">
                <ClipboardSignature size={18} /> Title
              </label>
              <input
                type="text"
                name="title"
                value={dataEditWork.title}
                onChange={handleChange}
                className="mt-1 w-full p-2  rounded-md  bg-gray-600 outline-none  text-white"
              />
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-2  font-semibold">
                <FileText size={18} /> Description
              </label>
              <textarea
                rows={4}
                name="description"
                value={dataEditWork.description}
                onChange={handleChange}
                className="mt-1 w-full p-2  rounded-md  bg-gray-600 outline-none  text-white"
              ></textarea>
            </div>

            {/* Assigned Date */}
            <div>
              <label className="flex items-center gap-2  font-semibold">
                <CalendarDays size={18} /> Assigned Date
              </label>
              <input
                type="date"
                name="assignedDate"
                value={dataEditWork.assignedDate.slice(0, 10)}
                onChange={handleChange}
                className="mt-1 w-full p-2  rounded-md  bg-gray-600 outline-none  text-white"
              />
            </div>

            {/* Due Date */}
            <div>
              <label className="flex items-center gap-2  font-semibold">
                <CalendarDays size={18} /> Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                value={dataEditWork.dueDate.slice(0, 10)}
                onChange={handleChange}
                className="mt-1 w-full p-2  rounded-md  bg-gray-600 outline-none  text-white"
              />
            </div>

            {/* Link */}
            <div>
              <label className="flex items-center gap-2  font-semibold">
                <LinkIcon size={18} /> Link
              </label>
              <input
                type="text"
                name="link"
                value={dataEditWork.link ?? ""}
                onChange={handleChange}
                className="mt-1 w-full p-2  rounded-md  bg-gray-600 outline-none  text-white"
              />
            </div>

            {/* Link Code */}
            <div>
              <label className="flex items-center gap-2  font-semibold">
                <LinkIcon size={18} /> Link Code
              </label>
              <input
                type="text"
                name="linkCode"
                value={dataEditWork.linkCode ?? ""}
                onChange={handleChange}
                className="mt-1 w-full p-2  rounded-md  bg-gray-600 outline-none  text-white"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 font-semibold">
                <ImageIcon size={18} /> Uploaded Images
              </label>

              <ul className="text-sm">
                {images?.map((img, index) => (
                  <li
                    key={index}
                    className="relative group cursor-pointer py-2"
                  >
                    <div className="flex justify-between items-center">
                      <span
                        onClick={() => window.open(img.url, "_blank")}
                        className="text-sm hover:bg-blue-500 px-1 rounded"
                      >
                        fileId: {img.fileId || `Image ${index + 1}`}
                      </span>

                      <div className="flex items-center gap-5">
                        <button
                          type="button"
                          className="text-blue-600  text-sm hover:underline hover:cursor-pointer"
                          onClick={() => window.open(img.url, "_blank")}
                        >
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteImage(img.fileId)}
                          className="text-red-500 hover:text-red-700 transition-colors hover:cursor-pointer"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Preview on hover */}
                    <div
                      className="absolute z-10 left-0 bottom-full mb-2 w-64 h-64 rounded-lg overflow-hidden
             opacity-0 pointer-events-none transition-opacity duration-200
             group-hover:opacity-100 group-hover:pointer-events-auto"
                    >
                      <img
                        src={img.url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </li>
                ))}
              </ul>

              <input
                type="file"
                name="file"
                multiple
                onChange={(e) =>
                  setDataEditWork((prev) => ({
                    ...prev,
                    files: e.target.files ? Array.from(e.target.files) : [],
                  }))
                }
                className="mt-2 w-full p-2 rounded-md text-sm text-gray-300 file:mr-4 file:py-2 file:px-4
    file:rounded-md file:border-0 file:text-sm file:font-semibold
    file:bg-blue-500 file:text-white hover:file:bg-blue-600
    transition-all duration-200"
              />
            </div>

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => setIsEditWork(false)}
                className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-2 px-5 rounded-lg shadow-sm transition-all duration-200 hover:cursor-pointer"
              >
                <X size={18} />
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-[.98] text-white py-2 px-5 rounded-lg shadow-md transition-all duration-200 hover:cursor-pointer"
              >
                <ClipboardSignature size={18} />
                Save Work
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default EditWork;
