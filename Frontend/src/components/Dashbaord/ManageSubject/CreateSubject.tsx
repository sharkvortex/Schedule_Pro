import { useEffect, useState } from "react";
import {
  FaSave,
  FaTimes,
  FaBook,
  FaUserTie,
  FaClock,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { useCreateSubject } from "../../../hooks/admin/Subject/useCreateSubject";
import toast from "react-hot-toast";
import React from "react";
interface CreateSubjectFormProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
}

export interface SubjectDataType {
  subject_id: string;
  subject_name: string;
  teacher_name: string;
  study_day: string;
  period: string;
  time_start: string;
  time_end: string;
  room: string;
}

function CreateSubjectForm({ setIsOpen , refetch }: CreateSubjectFormProps) {
  const { createSubject } = useCreateSubject();
  const [formData, setFormData] = useState<SubjectDataType>({
    subject_id: "",
    subject_name: "",
    teacher_name: "",
    study_day: "MON",
    period: "MORNING",
    time_start: "",
    time_end: "",
    room: "",
  });

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

  const validateForm = (formData: SubjectDataType): string | null => {
    const validations = [
      { field: formData.subject_id.trim(), message: "กรุณากรอกรหัสวิชา" },
      { field: formData.subject_name.trim(), message: "กรุณากรอกชื่อวิชา" },
      { field: formData.teacher_name, message: "กรุณาเลือกอาจารย์ผู้สอน" },
      { field: formData.study_day, message: "กรุณาเลือกวันเรียน" },
      { field: formData.period, message: "กรุณาเลือกคาบเรียน" },
      {
        field: formData.time_start && formData.time_end,
        message: "กรุณาเลือกเวลาเรียน",
      },
      { field: formData.room.trim(), message: "กรุณากรอกห้องเรียน" },
    ];

    for (const { field, message } of validations) {
      if (!field) return message;
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errorMessage = validateForm(formData);
    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }

    try {
      const response = await createSubject(formData);
      toast.success(response.message);
      await refetch();
      setIsOpen(false);
    } catch (error: any) {
      const message = error?.response?.data?.message || "เกิดข้อผิดพลาด";
      toast.error(message);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div
        className={`w-full max-w-2xl rounded-3xl shadow-2xl transition-all duration-300 transform ${
          show ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-6">
          <p className="text-2xl max-sm:text-sm text-white font-bold flex items-center gap-2">
            <FaBook className="text-green-500" />
            เพิ่มวิชาใหม่
          </p>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 transition hover:cursor-pointer"
            title="Close"
          >
            <FaTimes className="text-2xl" />
          </button>
        </div>

        <form
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
              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-6 py-2 rounded-full shadow-lg transition-all hover:scale-105 hover:cursor-pointer"
            >
              <FaSave />
              สร้างวิชา
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
    <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
      {label}
    </label>
    <div className="flex items-center border rounded-xl px-3 py-2 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
      <span className="text-gray-400 dark:text-gray-500">{icon}</span>
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
    <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
      {label}
    </label>
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

export default CreateSubjectForm;
