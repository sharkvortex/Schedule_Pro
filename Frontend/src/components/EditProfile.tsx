import React, { useState } from "react";
import { User, UserCheck, Save, X, Edit3 } from "lucide-react";
import { useEditProfile } from "../hooks/useEditProfile";
export interface EditProfileProps {
  user: {
    id?: number;
    firstName?: string;
    lastName?: string;
    studentId?: string;
    username?: string;
    email?: string;
    role?: string;
    avatar?: string;
  };
  onCancel?: () => void;
  refetch?: () => void;
}

export default function EditProfile({ user, onCancel , refetch }: EditProfileProps) {
    const { editProfile , loading} = useEditProfile();
  
    const [formData, setFormData] = useState({
    id : user.id,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
       await editProfile({ user: formData });
       refetch?.();
    }catch (error) {
      console.error("Error submitting profile:", error);
    }
  };

  const fieldConfigs = [
    { id: "firstName", label: "ชื่อ", Icon: User, color: "emerald" },
    { id: "lastName", label: "นามสกุล", Icon: UserCheck, color: "blue" },
   
  ];

  const renderField = (config: any) => (
    <div key={config.id} className="group space-y-2">
      <label
        htmlFor={config.id}
        className="block text-sm font-semibold  transition-colors"
      >
        {config.label}
      </label>
      <div className="relative">
        <div
          className={`absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-lg  text-${config.color}-600 dark:text-${config.color}-400 transition-all duration-300 group-hover:scale-110`}
        >
          <config.Icon className="w-5 h-5" />
        </div>
        <input
          id={config.id}
          name={config.id}
          type={config.type || "text"}
          value={(formData as any)[config.id]}
          onChange={handleChange}
          className="pl-14 pr-4 py-4 w-full rounded-xl border border-gray-50/10 shadow outline-none transition-all duration-300"
          placeholder={`กรอก${config.label}`}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen  p-4 flex items-center justify-center">
      <div className="w-full">
        <div className="mb-6">
          <div className=" text-center relative">
            <div className="absolute"></div>
            <div className="relative">
              <div className="flex items-center justify-center gap-2 ">
                <Edit3 className="w-5 h-5" />
                <h1 className="text-2xl font-bold">แก้ไขโปรไฟล์</h1>
              </div>
              <p className=" mt-2">อัปเดตข้อมูลส่วนตัวของคุณ</p>
            </div>
          </div>
        </div>

        <div>
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6 duration-300">
            <div className="grid gap-6">{fieldConfigs.map(renderField)}</div>

            <div className="flex justify-end gap-4 ">
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={loading}
                className=" text-sm  py-2 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-bold rounded-xl  transform hover:-translate-y-0.5 disabled:hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 hover:cursor-pointer disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 rounded-full animate-spin"></div>
                    กำลังบันทึก...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    บันทึกข้อมูล
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => onCancel?.()}
                disabled={loading}
                className="px-4 py-2 bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 disabled:from-slate-300 disabled:to-slate-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 hover:cursor-pointer disabled:cursor-not-allowed"
              >
                <X className="w-5 h-5" />
                ยกเลิก
              </button>
            </div>
            </form>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
            <p className="text-center text-sm text-slate-500 dark:text-slate-400">
              💡 การเปลี่ยนแปลงจะมีผลทันทีหลังจากบันทึก
            </p>
          </div>
        </div>
         
      </div>
    </div>
  );
}
