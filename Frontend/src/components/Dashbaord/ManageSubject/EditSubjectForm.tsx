import React from "react";
import { useEffect, useState } from "react";
import {
  FaSave,
  FaTimes,
  FaBook,
  FaUserTie,
  FaClock,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { useEditSubject } from "../../../hooks/admin/Subject/useEditSubject";
import toast from "react-hot-toast";
import Loading from "../../UI/Loading";
export interface EditSubjectFormProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
  data: SubjectFormValues;
}
export interface SubjectFormValues {
  subject_id: string;
  subject_name: string;
  teacher_name: string;
  study_day: string;
  period: string;
  time_start: string;
  time_end: string;
  room: string;
}

function EditSubjectForm({ setIsOpen, data, refetch }: EditSubjectFormProps) {
  const { editSubject, loading } = useEditSubject();
  const [formData, setFormData] = useState<SubjectFormValues>({ ...data });
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 10);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await toast.promise(editSubject(formData), {
        loading: "กำลังแก้ไขข้อมูล...",
        success: (res) => res?.data?.message || "แก้ไขรายวิชาสำเร็จ",
        error: (err) => {
          const msg = err?.response?.data?.message;
          return msg || "ไม่สามารถแก้ไขรายวิชาได้";
        },
      });

      if (response?.status === 200) {
        await refetch();
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Edit error", error);
    }
  };

  const days = [
    { label: "จันทร์", value: "MON" },
    { label: "อังคาร", value: "TUE" },
    { label: "พุธ", value: "WED" },
    { label: "พฤหัสบดี", value: "THU" },
    { label: "ศุกร์", value: "FRI" },
    { label: "เสาร์", value: "SAT" },
    { label: "อาทิตย์", value: "SUN" },
  ];

  const periods = [
    { label: "เช้า", value: "MORNING" },
    { label: "บ่าย", value: "AFTERNOON" },
    { label: "เย็น", value: "EVENING" },
  ];

  return (
    <div className="w-full relative">
      <div
        className={`w-full absolute z-20 min-h-screen transition-all duration-300 transform normal-bg  ${
          show ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="flex items-center justify-between  p-6">
          <p className="text-2xl max-sm:text-sm text-blue-500 font-bold flex items-center gap-2">
            <FaBook className="text-blue-500" />
            แก้ไขวิชา
          </p>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-red-500  transition hover:cursor-pointer"
            title="Close"
          >
            <FaTimes className="text-2xl" />
          </button>
        </div>

        <form
          lang="th"
          onSubmit={handleSubmit}
          className="p-6 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm"
        >
          <InputField
            label="รหัสวิชา"
            name="subject_id"
            value={formData.subject_id}
            onChange={handleChange}
            icon={<FaBook />}
          />
          <InputField
            label="ชื่อวิชา"
            name="subject_name"
            value={formData.subject_name}
            onChange={handleChange}
            icon={<FaBook />}
          />
          <InputField
            label="อาจารย์ผู้สอน"
            name="teacher_name"
            value={formData.teacher_name}
            onChange={handleChange}
            icon={<FaUserTie />}
          />
          <InputField
            label="ห้องเรียน"
            name="room"
            value={formData.room}
            onChange={handleChange}
            icon={<FaChalkboardTeacher />}
          />

          <SelectField
            label="วันเรียน"
            name="study_day"
            value={formData.study_day}
            onChange={handleChange}
            options={days}
          />
          <SelectField
            label="ช่วงเวลา"
            name="period"
            value={formData.period}
            onChange={handleChange}
            options={periods}
          />

          <InputField
            label="เวลาเริ่ม"
            name="time_start"
            value={formData.time_start}
            onChange={handleChange}
            icon={<FaClock />}
            type="time"
          />
          
          <InputField
            label="เวลาสิ้นสุด"
            name="time_end"
            value={formData.time_end}
            onChange={handleChange}
            icon={<FaClock />}
            type="time"
          />

          <div className="md:col-span-2 flex justify-end gap-4 pt-6">
            <button
              type="submit"
              className={`flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-2 rounded-full shadow-lg transition-all hover:scale-105 
                ${loading ? "cursor-not-allowed" : "hover:cursor-pointer"}
                `}
              disabled={loading}
            >
              {loading ? (
                <div className="px-5">
                  <Loading size={10} />
                </div>
              ) : (
                <>
                  <FaSave />
                  บันทึก
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-full shadow-sm transition-all dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white hover:cursor-pointer"
            >
              <FaTimes />
              ยกเลิก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const InputField = ({
  label,
  name,
  value,
  onChange,
  icon,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactNode;
  type?: string;
}) => (
  <div>
    <label className="block mb-2 font-medium">{label}</label>
    <div className="flex items-center border rounded-xl px-3 py-2 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
      <span className="text-white">{icon}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="ml-3 w-full bg-transparent focus:outline-none text-gray-800 dark:text-white"
      />
    </div>
  </div>
);

const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
}) => (
  <div>
    <label className="block mb-2 font-medium ">{label}</label>
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full appearance-none border rounded-xl px-4 py-2 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500">
        ▼
      </div>
    </div>
  </div>
);

export default EditSubjectForm;
