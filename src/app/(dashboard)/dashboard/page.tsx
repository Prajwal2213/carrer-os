import { createClient } from "@/src/lib/supabase/server";
import Cards from "@/src/components/dashboard/Cards";
import RecentApplications from "@/src/components/dashboard/RecentApplications";

const applications = [
  {
    id: "1",
    company_name: "Google",
    company_logo_url: null,
    role: "Associate AI Engineer",
    salary: "₹12L - ₹18L",
    location: "Bengaluru",
    resume_url: "/resumes/google-ai-engineer.pdf",
    status: "interviewed",
  },
  {
    id: "2",
    company_name: "Amazon",
    company_logo_url: null,
    role: "SDE Intern",
    salary: "₹80k/mo",
    location: "Bengaluru",
    resume_url: "/resumes/amazon-sde-intern.pdf",
    status: "shortlisted",
  },
  {
    id: "3",
    company_name: "PHINIA",
    company_logo_url: null,
    role: "IT Intern",
    salary: "Stipend",
    location: "Bengaluru",
    resume_url: "/resumes/phinia-it-intern.pdf",
    status: "applied",
  },
  {
    id: "4",
    company_name: "NVIDIA",
    company_logo_url: null,
    role: "Hardware & Software Developer",
    salary: "₹15L - ₹22L",
    location: "Bengaluru",
    resume_url: null,
    status: "applied",
  },
  {
    id: "5",
    company_name: "StoneX / Mergerware",
    company_logo_url: null,
    role: "Software Engineer",
    salary: "₹10L - ₹14L",
    location: "Bengaluru",
    resume_url: "/resumes/stonex-mergerware.pdf",
    status: "rejected",
  },
];

export default async function DashboardPage() {
  const cards = [
    { title: "Applications", number: "15" },
    { title: "Shortlisted", number: "9" },
    { title: "Interviewed", number: "6" },
    { title: "Offered", number: "2" },
  ];

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user?.id)
    .single();

  return (
    <div className="pt-8 flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Good morning, {profile?.full_name ?? "there"}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Here's where your job search stands today.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Cards key={card.title} title={card.title} num={card.number} />
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-gray-900">Recently applied</h2>
        <RecentApplications applications={applications} />
      </div>
    </div>
  );
}