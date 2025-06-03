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
import { Link } from "react-router-dom";
import { WorkDataType } from "../../../hooks/admin/Work/useGetWork";
import { useEffect, useState } from "react";
import DeleteImage from "./DeleteImage";
import { useDeleteImage } from "../../../hooks/admin/Work/useDeleteImage";
import { useEditWork } from "../../../hooks/admin/Work/useEditWork";
export interface EditWorkProps {
  setIsEditWork: React.Dispatch<React.SetStateAction<boolean>>;
  isEditWork: boolean;
  data: WorkDataType | undefined;
  refetch: () => void;
}

export interface EditWorkFormData {
  id: number;
  title: string;
  description: string;
  assignedDate: string;
  dueDate: string;
  link: string;
  linkCode: string;
  files: File[];
}
function EditWork({ isEditWork, data, setIsEditWork, refetch }: EditWorkProps) {
  if (!data) return null;
  const {
    id,
    subject,
    subject_id,
    title,
    description,
    assignedDate,
    dueDate,
    link,
    linkCode,
  } = data;
  useEffect(() => {
    if (data.images) {
      setImages(data.images);
    }
  }, [data.images]);
  const [images, setImages] = useState(data.images || []);
  const [dataEditWork, setDataEditWork] = useState<EditWorkFormData>({
    id: id,
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

  const { deleteImage, imagedeleting } = useDeleteImage();
  const { EditWork } = useEditWork();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const files: File[] = [...dataEditWork.files];

    const combinedData = {
      id: dataEditWork.id,
      title: dataEditWork.title,
      description: dataEditWork.description,
      assignedDate: dataEditWork.assignedDate,
      dueDate: dataEditWork.dueDate,
      link: dataEditWork.link,
      linkCode: dataEditWork.linkCode,
      files: files,
    };

    try {
      await EditWork(combinedData);
      refetch();
      setIsEditWork(false);
    } catch (error) {
      console.log(error);
    }
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
              refetch();
              setImages((prev) => prev.filter((img) => img.fileId !== fileId)); // ลบออกจาก state ก็ต่อเมื่อสำเร็จ
              setOnDeleteImage(false);
            } catch (error) {
              console.log(error);
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
                <h2 className="text-2xl font-bold ">📝 แก้ไขงาน</h2>
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
                <BookOpenText size={18} /> วิชา
              </label>
              <div className="mt-1 w-full p-2 bg-gray-400 rounded-md text-gray-800 dark:text-white select-none">
                {`${subject_id} - ${subject.subject_name}`}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="flex items-center gap-2  font-semibold">
                <ClipboardSignature size={18} /> หัวข้อ
              </label>
              <input
                type="text"
                name="title"
                value={dataEditWork.title}
                onChange={handleChange}
                className="mt-1 w-full p-2  rounded-md  bg-gray-800 border-gray-700 outline-none  text-white"
              />
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-2  font-semibold">
                <FileText size={18} /> คำอธิบาย
              </label>
              <textarea
                rows={4}
                name="description"
                value={dataEditWork.description}
                onChange={handleChange}
                className="mt-1 w-full p-2  rounded-md  bg-gray-800 border-gray outline-none  text-white"
              ></textarea>
            </div>

            {/* Assigned Date */}
            <div>
              <label className="flex items-center gap-2  font-semibold">
                <CalendarDays size={18} /> วันที่สั่ง
              </label>
              <input
                type="date"
                name="assignedDate"
                value={dataEditWork.assignedDate.slice(0, 10)}
                onChange={handleChange}
                className="mt-1 w-full p-2  rounded-md  bg-gray-800 border-gray outline-none  text-white"
              />
            </div>

            {/* Due Date */}
            <div>
              <label className="flex items-center gap-2  font-semibold">
                <CalendarDays size={18} /> ครบกำหนด
              </label>
              <input
                type="date"
                name="dueDate"
                value={dataEditWork.dueDate.slice(0, 10)}
                onChange={handleChange}
                className="mt-1 w-full p-2  rounded-md  bg-gray-800 border-gray outline-none  text-white"
              />
            </div>

            {/* Link */}
            <div>
              <label className="flex items-center gap-2  font-semibold">
                <LinkIcon size={18} /> ลิงก์งาน
              </label>
              <input
                type="text"
                name="link"
                value={dataEditWork.link ?? ""}
                onChange={handleChange}
                className="mt-1 w-full p-2  rounded-md  bg-gray-800 border-gray outline-none  text-white"
              />
            </div>

            {/* Link Code */}
            <div>
              <label className="flex items-center gap-2  font-semibold">
                <LinkIcon size={18} /> ลิงก์โค้ด{" "}
                <Link
                  to={"https://gist.github.com/"}
                  target="__black"
                  className="text-xs text-center flex items-center underline text-blue-500 hover:text-blue-600"
                >
                  สร้างลิงก์โค้ด
                </Link>
              </label>
              <input
                type="text"
                name="linkCode"
                value={dataEditWork.linkCode ?? ""}
                onChange={handleChange}
                className="mt-1 w-full p-2  rounded-md  bg-gray-800 border-gray outline-none  text-white"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 font-semibold">
                <ImageIcon size={18} /> อัพโหลดรูปภาพ
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
                        className="text-sm hover:bg-blue-500/80 px-1 rounded"
                      >
                        fileId: {img.fileId || `Image ${index + 1}`}
                      </span>

                      <div className="flex items-center gap-5">
                        <button
                          type="button"
                          className="text-blue-600  text-sm hover:underline hover:cursor-pointer"
                          onClick={() => window.open(img.url, "_blank")}
                        >
                          ดูรูป
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

              <div className="mt-4">
                <input
                  type="file"
                  name="file"
                  multiple
                  className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 transition duration-300 cursor-pointer"
                  onChange={(e) =>
                    setDataEditWork((prev) => ({
                      ...prev,
                      files: e.target.files ? Array.from(e.target.files) : [],
                    }))
                  }
                />
              </div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <button
                type="button"
                onClick={() => setIsEditWork(false)}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium text-gray-800 dark:text-white bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 shadow-sm active:scale-[0.98] focus:outline-none hover:cursor-pointer"
              >
                <X size={18} />
                ยกเลิก
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-md active:scale-[0.98] focus:outline-none hover:cursor-pointer"
              >
                <ClipboardSignature size={18} />
                บันทึกงาน
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default EditWork;
