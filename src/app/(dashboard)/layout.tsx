'use client';

import React from "react";
import { logout } from "@/src/actions/auth";
import { Plus, User, Briefcase, File, Calendar, Settings, Building, Users, LogOut } from "lucide-react";
import  Link  from "next/link";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen w-screen bg-gray-50 text-gray-800 p-4 gap-4">
      {/* Top Header / Navbar */}
      <header className="flex items-center justify-between w-full h-16 px-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
        {/* Logo Section (Left) */}
        <div>
           <img
              src="/logo2_bg.svg"
              alt="Career OS Logo"
              width={150}
              height={150}
            />
        </div>

        {/* Profile & Logout Section (Right) */}
        <div className="flex items-center gap-4">
          {/* Profile Circle */}
          <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-gray-300 flex items-center justify-center overflow-hidden cursor-pointer hover:border-blue-500 transition-colors">
            <svg
              className="w-6 h-6 text-gray-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="px-2 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl border border-red-200 transition-colors cursor-pointer"
          >
            <LogOut size = {18} color="red"/>
          
          </button>
        </div>
      </header>

      {/* Main Content Area (Sidebar + Children) */}
      <div className="flex flex-1 gap-4 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col p-4 shrink-0">
          <nav className="flex flex-col gap-2">

            {/* New Application */}
            <Link
              href="/applications/new"
              className="p-3 rounded-xl bg-[#0F172A] text-white font-medium hover:bg-blue-100 transition-colors flex items-center gap-2"
            >
              <Plus size={18} />
              <span>New Application</span>
            </Link>

            {/* Dashboard */}
            <Link
              href="/dashboard"
              className="p-3 rounded-xl bg-[#4338CA] text-white font-medium hover:bg-blue-100 transition-colors flex items-center gap-2"
            >
              <User size={18} />
              <span>Dashboard</span>
            </Link>

            {/* Profile */}
            {/* <a
              href="/profile"
              className="p-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <User size={18} />
              <span>Profile</span>
            </a> */}

            {/* Applications */}
            <Link
              href="/applications"
              className="p-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <Briefcase size={18} />
              <span>Applications</span>
            </Link>

            {/* Resumes */}
            <Link
              href="/resumes"
              className="p-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <File size={18} />
              <span>Resumes</span>
            </Link>

            {/* Calendar */}
            <Link
              href="/calendar"
              className="p-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <Calendar size={18} />
              <span>Calendar</span>
            </Link>

            {/* Companies */}
            <Link
              href="/companies"
              className="p-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <Building size={18} />
              <span>Companies</span>
            </Link>

            {/* Roles */}
            <Link
              href="/roles"
              className="p-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <Users size={18} />
              <span>Roles</span>
            </Link>

            {/* Settings */}
            <Link
              href="/settings"
              className="p-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <Settings size={18} />
              <span>Settings</span>
            </Link>

          </nav>
        </aside>

        {/* Main Content Canvas */}
        <main className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}