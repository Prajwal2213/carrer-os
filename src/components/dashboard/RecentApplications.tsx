"use client";

import {
  CalendarDays,
  FileText,
  MapPin,
  Briefcase,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

type Application = {
  id: string;
  company_name: string;
  company_logo_url?: string | null;
  role: string;
  salary?: string | null;
  location?: string | null;
  resume_url?: string | null;
  applied_date?: string | null;

  status:
    | "Saved"
    | "Applied"
    | "Assessment"
    | "Interview"
    | "Offer"
    | "Rejected"
    | "Withdrawn"
    | string;
};

const statusStyles: Record<string, string> = {
  Saved: "bg-gray-100 text-gray-600 border-gray-200",
  Applied: "bg-blue-50 text-blue-700 border-blue-100",
  Assessment: "bg-purple-50 text-purple-700 border-purple-100",
  Interview: "bg-amber-50 text-amber-700 border-amber-100",
  Offer: "bg-green-50 text-green-700 border-green-100",
  Rejected: "bg-red-50 text-red-700 border-red-100",
  Withdrawn: "bg-gray-100 text-gray-500 border-gray-200",
};

function formatDate(date?: string | null) {
  if (!date) return null;

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function RecentApplications({
  applications,
}: {
  applications: Application[];
}) {
  if (applications.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50/50 py-14 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-gray-200">
          <Briefcase size={21} className="text-gray-400" />
        </div>

        <h3 className="text-sm font-semibold text-gray-800">
          No applications yet
        </h3>

        <p className="mt-1 text-sm text-gray-400">
          Track your first application to see it here.
        </p>

        <Link
          href="/applications/new"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0F172A] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#1E293B]"
        >
          Add application
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="divide-y divide-gray-100">
        {applications.map((app) => {
          const date = formatDate(app.applied_date);

          return (
            <div
              key={app.id}
              className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-gray-50/70"
            >
              {/* Company Logo */}
              <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                {app.company_logo_url ? (
                  <img
                    src={app.company_logo_url}
                    alt={`${app.company_name} logo`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-bold text-gray-500">
                    {app.company_name?.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              {/* Company + Role */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate text-sm font-semibold text-gray-900">
                    {app.company_name}
                  </h3>

                  <ArrowUpRight
                    size={14}
                    className="shrink-0 text-gray-300 opacity-0 transition group-hover:opacity-100"
                  />
                </div>

                <p className="mt-0.5 truncate text-sm text-gray-500">
                  {app.role}
                </p>

                {/* Metadata */}
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400">
                  {app.location && (
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {app.location}
                    </span>
                  )}

                  {app.salary && (
                    <span className="flex items-center gap-1">
                      <Briefcase size={12} />
                      {app.salary}
                    </span>
                  )}

                  {date && (
                    <span className="flex items-center gap-1">
                      <CalendarDays size={12} />
                      {date}
                    </span>
                  )}
                </div>
              </div>

              {/* Resume */}
              {app.resume_url && (
                <a
                  href={app.resume_url}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden shrink-0 items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-500 transition hover:border-gray-300 hover:bg-white hover:text-gray-800 sm:flex"
                >
                  <FileText size={14} />
                  Resume
                </a>
              )}

              {/* Status */}
              <span
                className={`shrink-0 rounded-lg border px-3 py-1.5 text-xs font-semibold ${
                  statusStyles[app.status] ??
                  "border-gray-200 bg-gray-100 text-gray-600"
                }`}
              >
                {app.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}