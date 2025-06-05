import React, { useState } from "react";

import {
  User,
  Mail,
  Hash,
  Shield,
  GraduationCap,
  BadgeCheck,
  BadgeX,
} from "lucide-react";
import { useProfile } from "../hooks/useProfile";
import EditProfile from "./EditProfile";
import { useAuth } from "../context/AuthContext";
import Loading from "./UI/Loading";
interface ProfileItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | React.ReactNode | undefined | null;
}

function Profile() {
  const auth = useAuth();
  const [editing, setEditing] = useState<boolean>(false);
  const { profile, refetch, loading } = useProfile();

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <Loading />
      </div>
    );
  }
  if (!profile) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>ไม่พบข้อมูลผู้ใช้</p>
    </div>
  );
}
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {editing ? (
        <EditProfile
          user={profile}
          onCancel={() => setEditing(false)}
          refetch={() => {
            refetch(); setEditing(false); auth?.getAuthentication?.();
          }}
        />
      ) : (
        <>
          <div className="text-center mb-10">
            <div className="relative inline-block mb-5">
              <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-full flex items-center justify-center shadow-xl border-4 border-white dark:border-slate-600">
                <User className="w-10 h-10 text-slate-600 dark:text-slate-300" />
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-1 tracking-tight">
              โปรไฟล์ผู้ใช้
            </h1>
            <p className="text-sm opacity-60">ข้อมูลส่วนตัวของคุณ</p>
          </div>
          <div className="flex justify-end my-10 pt-6 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setEditing(true)}
              className="inline-flex items-center border border-gray-50/10 gap-2 px-6 py-2 text-sm font-medium rounded-xl shadow hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700 hover:scale-105 hover:cursor-pointer"
            >
              <User className="w-4 h-4" />
              แก้ไขโปรไฟล์
            </button>
          </div>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <ProfileItem
                icon={<User className="w-5 h-5" />}
                label="ชื่อ"
                value={profile.firstName}
              />
              <ProfileItem
                icon={<User className="w-5 h-5" />}
                label="นามสกุล"
                value={profile.lastName}
              />
            </div>

            <ProfileItem
              icon={<GraduationCap className="w-5 h-5" />}
              label="รหัสนักศึกษา"
              value={profile.studentId}
            />
            <ProfileItem
              icon={<Hash className="w-5 h-5" />}
              label="Username"
              value={profile.username}
            />
            <ProfileItem
              icon={<Mail className="w-5 h-5" />}
              label="Email"
              value={profile.email}
            />
            <ProfileItem
              icon={<Shield className="w-5 h-5" />}
              label="สิทธิ์การเข้าถึง"
              value={getRoleDescription(profile.role)}
            />
          </div>
        </>
      )}
    </div>
  );
}

function getRoleDescription(role?: string) {
  if (role === "admin") {
    return (
      <span className="flex items-center gap-1 text-green-600">
        ผู้ดูแลระบบ <BadgeCheck size={16} />
      </span>
    );
  }
  if (role === "member") {
    return <span className="text-blue-600">มีสิทธิ์เข้าถึง</span>;
  }
  return (
    <span className="flex items-center gap-1 text-red-600">
      ไม่มีสิทธิ์เข้าถึง <BadgeX size={16} />
      <span className="ml-1">(ติดต่อผู้ดูแลระบบ)</span>
    </span>
  );
}

function ProfileItem({ icon, label, value }: ProfileItemProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-50/5 hover:border-slate-300 dark:hover:border-slate-600">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 p-2 rounded-lg shadow group-hover:scale-105 transition-all duration-200">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium mb-1 uppercase tracking-wider">
            {label}
          </div>
          <div className="text-sm">{value || "-"}</div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
    </div>
  );
}

export default Profile;
