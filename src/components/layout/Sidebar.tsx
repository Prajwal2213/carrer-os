'use client';

import Link from "next/link";
import { Plus, User, Briefcase, File, Calendar, Settings, Building, Users } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen shrink-0 bg-white border-r border-gray-200 flex flex-col p-6 overflow-y-auto">
      <img src="/logo2_bg.svg" alt="Career OS" width={130} height={130} className="mb-6" />

      <Link
        href="/applications/new"
        className="p-3 rounded-xl bg-[#0F172A] text-white font-medium hover:bg-[#1E293B] transition-colors flex items-center gap-2"
      >
        <Plus size={18} />
        <span>New Application</span>
      </Link>

      <p className="text-xs font-medium text-gray-400 mt-6 mb-2">Menu</p>
      <nav className="flex flex-col gap-1">
        <Link href="/dashboard" className="p-3 rounded-xl bg-[#4338CA]/10 text-[#4338CA] font-medium flex items-center gap-2">
          <User size={18} />
          <span>Dashboard</span>
        </Link>
        <Link href="/applications" className="p-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-2">
          <Briefcase size={18} />
          <span>Applications</span>
        </Link>
        <Link href="/resumes" className="p-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-2">
          <File size={18} />
          <span>Resumes</span>
        </Link>
        <Link href="/calendar" className="p-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-2">
          <Calendar size={18} />
          <span>Calendar</span>
        </Link>
      </nav>

      <p className="text-xs font-medium text-gray-400 mt-6 mb-2">Discovery</p>
      <nav className="flex flex-col gap-1">
        <Link href="/companies" className="p-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-2">
          <Building size={18} />
          <span>Companies</span>
        </Link>
        <Link href="/roles" className="p-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-2">
          <Users size={18} />
          <span>Roles</span>
        </Link>
      </nav>

      <Link
        href="/settings"
        className="p-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-2 mt-auto"
      >
        <Settings size={18} />
        <span>Settings</span>
      </Link>
    </aside>
  );
}