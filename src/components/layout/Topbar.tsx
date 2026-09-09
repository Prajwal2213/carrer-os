'use client';

import { logout } from "@/src/actions/auth";
import { LogOut } from "lucide-react";

export default function Topbar({ name, avatarUrl }: { name?: string | null; avatarUrl?: string | null }) {
  return (
    <header className="h-16 shrink-0 flex items-center justify-end px-8 gap-3">
      <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
        {avatarUrl ? (
          <img src={avatarUrl} alt={name ?? "Profile"} className="w-full h-full object-cover" />
        ) : (
          <span className="text-sm font-medium text-gray-600">{name?.[0]?.toUpperCase() ?? "U"}</span>
        )}
      </div>
      <span className="text-sm font-medium text-gray-700">{name ?? ""}</span>
      <button
        onClick={logout}
        className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
        aria-label="Log out"
      >
        <LogOut size={18} />
      </button>
    </header>
  );
}