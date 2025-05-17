import { X, Save, Link, ImagePlus } from "lucide-react";
import React, {  useState } from "react";
import toast from "react-hot-toast";
import { useSubject } from "../../../hooks/admin/useSubject";
import { useCreateWork } from "../../../hooks/admin/Work/useCreateWork";
import Loading from "../../UI/Loading";
export interface CreateWorkProps {
  setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
  isCreate: boolean;
}

export interface CreateWorkDataType {
  subject_id: string;
  title: string;
  description: string;
  assignedDate: string;
  dueDate: string;
  link: string;
  image: File[] | null;
  linkCode: string;
}
function CreateWork({ setIsCreate, isCreate }: CreateWorkProps) {
  const { subjects } = useSubject();
  const { createWork, creating } = useCreateWork();
  const defaultFormData: CreateWorkDataType = {
    subject_id: "",
    title: "",
    description: "",
    assignedDate: "",
    dueDate: "",
    link: "",
    image: null,
    linkCode: "",
  };
  const [formData, setFormData] = useState<CreateWorkDataType>(defaultFormData);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, files, type } = e.target as HTMLInputElement;

    if (type === "file" && files) {
      setFormData((prev) => ({
        ...prev,
        [name]: Array.from(files),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.subject_id ||
      !formData.title ||
      !formData.assignedDate ||
      !formData.dueDate
    ) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    try {
      const response = await createWork(formData);
      if (response.status === 200) {
        setFormData(defaultFormData);
        setIsCreate(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {isCreate && (
        <div
          className={`w-full normal-bg z-20 relative min-h-screen transition-all duration-300`}
        >
          <div className={`w-full absolute top-0 min-h-screen`}>
            <div className="flex items-center justify-between  dark:border-gray-700 pb-3">
              <h2 className="text-xl font-medium">📝 สร้างงานใหม่</h2>
              <button
                onClick={() => setIsCreate(!isCreate)}
                className="text-gray-500 hover:text-red-500 hover:cursor-pointer transition"
              >
                <X className="w-7 h-7" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700  mb-1">
                  วิชา
                </label>
                <select
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white"
                  name="subject_id"
                  onChange={handleChange}
                  value={formData.subject_id}
                  disabled={!subjects || subjects.length === 0}
                >
                  <option value="">
                    {subjects && subjects.length > 0
                      ? "เลือกวิชา"
                      : "ไม่มีรายวิชา"}
                  </option>
                  {subjects &&
                    subjects.length > 0 &&
                    subjects.map((subject) => (
                      <option
                        key={subject.subject_id}
                        value={subject.subject_id}
                      >
                        {`${subject.subject_id} || ${subject.subject_name}`}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700  mb-1">
                  หัวข้อ
                </label>
                <input
                  type="text"
                  placeholder="เช่น งานโปรเจกต์ React"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                  name="title"
                  onChange={handleChange}
                  value={formData.title}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  รายละเอียด
                </label>
                <textarea
                  rows={3}
                  placeholder="รายละเอียดของงาน"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white"
                  name="description"
                  onChange={handleChange}
                  value={formData.description}
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    วันที่สั่ง
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                      name="assignedDate"
                      onChange={handleChange}
                      value={formData.assignedDate}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    กำหนดส่ง
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white"
                      name="dueDate"
                      onChange={handleChange}
                      value={formData.dueDate}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ลิ้งก์ (ถ้ามี)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="วางลิ้งก์งาน"
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white"
                    name="link"
                    onChange={handleChange}
                    value={formData.link}
                  />
                  <Link className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  รูปภาพ
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                    name="image"
                    onChange={handleChange}
                    multiple
                  />
                  <ImagePlus className="h-4 w-4 text-gray-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ลิ้งก์โค้ด (ถ้ามี)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="วางลิ้งก์โค้ด เช่น GitHub, CodePen"
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white"
                    name="linkCode"
                    onChange={handleChange}
                  />
                  <Link className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  disabled={creating}
                  type="submit"
                  className={`px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition flex items-center gap-2 
                    ${
                      creating
                        ? "hover:cursor-not-allowed"
                        : "hover:cursor-pointer"
                    }
                    `}
                >
                  {creating ? (
                    <div className="flex items-center justify-center px-6">
                      <Loading size={15} />
                    </div>
                  ) : (
                    <div className="flex items-center gap-x-2">
                      <Save className="w-4 h-4" /> บันทึก
                    </div>
                  )}
                </button>
                <button
                  onClick={() => setIsCreate(!isCreate)}
                  type="button"
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg transition flex items-center gap-2 hover:cursor-pointer"
                >
                  <X className="w-4 h-4" />
                  ยกเลิก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateWork;
