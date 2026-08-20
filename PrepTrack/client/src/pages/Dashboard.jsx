import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Dumbbell,
  User,
  LogOut,
  Terminal,
  X,
  Menu,
  Bell,
  BookMarked,
  CheckCircle2,
  TrendingUp,
  Clock,
  Repeat2,
  Plus,
  PlayCircle,
  ListChecks,
  AlertCircle,
  Inbox,
} from "lucide-react";
import { getDashboardSummary } from "../api/dashboardApi";

/* -------------------------------------------------------------------------- */
/*  Config                                                                     */
/* -------------------------------------------------------------------------- */

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/topics", label: "Topics", icon: BookOpen },
  { to: "/practice", label: "Practice", icon: Dumbbell },
  { to: "/profile", label: "Profile", icon: User },
];

const statusConfig = {
  completed: { label: "Completed", dot: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50" },
  "in-progress": { label: "In Progress", dot: "bg-amber-500", text: "text-amber-700", bg: "bg-amber-50" },
  "not-started": { label: "Not Started", dot: "bg-slate-400", text: "text-slate-600", bg: "bg-slate-100" },
};

/* -------------------------------------------------------------------------- */
/*  Sidebar                                                                    */
/* -------------------------------------------------------------------------- */

function Sidebar({ isOpen, onClose, onLogout }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-slate-900 text-slate-300
        transition-transform duration-200 ease-in-out
        md:sticky md:top-0 md:h-screen md:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500">
              <Terminal className="h-5 w-5 text-white" strokeWidth={2.25} />
            </div>
            <span className="text-lg font-semibold tracking-tight text-white">PrepTrack</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-slate-400 hover:bg-slate-800 hover:text-white md:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-2 flex-1 space-y-1 px-3">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive ? "bg-indigo-500/15 text-indigo-300" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`h-[18px] w-[18px] ${isActive ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300"}`}
                    strokeWidth={2}
                  />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-800 px-3 py-4">
          <button
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-red-400"
          >
            <LogOut className="h-[18px] w-[18px]" strokeWidth={2} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Topbar                                                                     */
/* -------------------------------------------------------------------------- */

function Topbar({ user, onMenuClick }) {
  const initials = user.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-md p-2 text-slate-500 hover:bg-slate-100 md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <p className="text-sm text-slate-500">Welcome back,</p>
          <p className="-mt-0.5 text-base font-semibold text-slate-900">{user.name}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500" />
        </button>

        {user.avatarUrl ? (
          <img src={user.avatarUrl} alt={user.name} className="h-9 w-9 rounded-full border border-slate-200 object-cover" />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
            {initials}
          </div>
        )}
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*  Stat cards                                                                 */
/* -------------------------------------------------------------------------- */

function StatCard({ label, value, icon: Icon, accent, suffix = "" }) {
  const accentStyles = {
    indigo: "bg-indigo-50 text-indigo-600",
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${accentStyles[accent]}`}>
          <Icon className="h-[18px] w-[18px]" strokeWidth={2.25} />
        </div>
      </div>
      <p className="mt-3 font-mono text-2xl font-semibold tracking-tight text-slate-900">
        {value}
        {suffix}
      </p>
    </div>
  );
}

function StatsGrid({ totalTopics, completedTopics, totalPracticeSessions, completionPercentage }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard label="Total Topics" value={totalTopics} icon={BookMarked} accent="indigo" />
      <StatCard label="Completed Topics" value={completedTopics} icon={CheckCircle2} accent="emerald" />
      <StatCard label="Practice Sessions" value={totalPracticeSessions} icon={Dumbbell} accent="blue" />
      <StatCard label="Completion" value={completionPercentage} suffix="%" icon={TrendingUp} accent="amber" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Progress overview                                                          */
/* -------------------------------------------------------------------------- */

function ProgressOverview({ completedTopics, totalTopics, completionPercentage }) {
  const pct = Math.max(0, Math.min(100, completionPercentage));
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;
  const remaining = Math.max(totalTopics - completedTopics, 0);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-900">Overall Preparation</h2>
        <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-600">
          {pct}% complete
        </span>
      </div>

      <div className="mt-5 flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-around">
        <div className="relative flex h-36 w-36 shrink-0 items-center justify-center">
          <svg viewBox="0 0 128 128" className="h-36 w-36 -rotate-90">
            <circle cx="64" cy="64" r={radius} fill="none" stroke="#E2E8F0" strokeWidth="10" />
            <circle
              cx="64"
              cy="64"
              r={radius}
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="transition-[stroke-dashoffset] duration-700 ease-out"
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="font-mono text-2xl font-semibold text-slate-900">{pct}%</span>
            <span className="text-xs text-slate-500">done</span>
          </div>
        </div>

        <div className="w-full max-w-xs space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-slate-600">
              <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
              Completed
            </span>
            <span className="font-mono font-medium text-slate-900">{completedTopics}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-slate-600">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
              Remaining
            </span>
            <span className="font-mono font-medium text-slate-900">{remaining}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-700 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="pt-1 text-xs text-slate-500">
            {completedTopics} of {totalTopics} topics covered
          </p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Recent topics                                                              */
/* -------------------------------------------------------------------------- */

function StatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig["not-started"];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${config.bg} ${config.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}

function RecentTopics({ topics }) {
  if (!topics.length) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="mb-4 text-base font-semibold text-slate-900">Recent Topics</h2>
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-12 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
            <Inbox className="h-5 w-5 text-slate-400" />
          </div>
          <p className="mt-3 text-sm font-medium text-slate-700">No topics practiced yet</p>
          <p className="mt-1 max-w-xs text-sm text-slate-500">
            Topics you study will show up here with your latest activity.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="mb-4 text-base font-semibold text-slate-900">Recent Topics</h2>

      {/* Table on md+ */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
              <th className="pb-3 font-medium">Topic</th>
              <th className="pb-3 font-medium">Category</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Last Practiced</th>
              <th className="pb-3 font-medium text-right">Sessions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {topics.map((topic) => (
              <tr key={topic.id} className="text-slate-700">
                <td className="py-3.5 font-medium text-slate-900">{topic.name}</td>
                <td className="py-3.5">
                  <span className="rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-600">
                    {topic.category}
                  </span>
                </td>
                <td className="py-3.5">
                  <StatusBadge status={topic.status} />
                </td>
                <td className="py-3.5 text-slate-500">{topic.lastPracticed}</td>
                <td className="py-3.5 text-right font-mono text-slate-700">{topic.practiceCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards on mobile */}
      <div className="space-y-3 md:hidden">
        {topics.map((topic) => (
          <div key={topic.id} className="rounded-xl border border-slate-100 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium text-slate-900">{topic.name}</p>
                <span className="mt-1 inline-block rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-600">
                  {topic.category}
                </span>
              </div>
              <StatusBadge status={topic.status} />
            </div>
            <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {topic.lastPracticed}
              </span>
              <span className="flex items-center gap-1">
                <Repeat2 className="h-3.5 w-3.5" />
                {topic.practiceCount} sessions
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Quick actions                                                              */
/* -------------------------------------------------------------------------- */

function QuickActions({ onAddTopic, onPracticeTopic, onViewAllTopics }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="mb-4 text-base font-semibold text-slate-900">Quick Actions</h2>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={onAddTopic}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" />
          Add Topic
        </button>
        <button
          onClick={onPracticeTopic}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-2.5 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-100"
        >
          <PlayCircle className="h-4 w-4" />
          Practice Topic
        </button>
        <button
          onClick={onViewAllTopics}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
        >
          <ListChecks className="h-4 w-4" />
          View All Topics
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Dashboard (default export)                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Dashboard
 * Single-file dashboard page: sidebar + topbar shell, stats, progress,
 * recent topics and quick actions all live in this one component tree.
 *
 * Only the Axios call lives outside this file (src/api/dashboardApi.js),
 * since that's the part you'll genuinely reuse elsewhere (Topics, Practice, etc).
 *
 * Usage in your router:
 *   <Route path="/dashboard" element={<Dashboard user={currentUser} onLogout={handleLogout} />} />
 */
export default function Dashboard({ user = { name: "Student" }, onLogout = () => {} }) {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchSummary() {
      try {
        setIsLoading(true);
        const summary = await getDashboardSummary();
        if (isMounted) setData(summary);
      } catch (err) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchSummary();
    return () => {
      isMounted = false;
    };
  }, []);

  const {
    totalTopics = 0,
    totalPracticeSessions = 0,
    completedTopics = 0,
    completionPercentage = 0,
    recentTopics = [],
  } = data || {};

  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} onLogout={onLogout} />

      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar user={user} onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-[104px] animate-pulse rounded-2xl border border-slate-200 bg-slate-100" />
                ))}
              </div>
              <div className="h-56 animate-pulse rounded-2xl border border-slate-200 bg-slate-100" />
              <div className="h-64 animate-pulse rounded-2xl border border-slate-200 bg-slate-100" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50 p-8 text-center">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <p className="mt-3 text-sm font-medium text-red-700">Couldn't load your dashboard.</p>
              <p className="mt-1 text-sm text-red-500">Check your connection and try again.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <StatsGrid
                totalTopics={totalTopics}
                completedTopics={completedTopics}
                totalPracticeSessions={totalPracticeSessions}
                completionPercentage={completionPercentage}
              />

              <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                <div className="xl:col-span-2">
                  <RecentTopics topics={recentTopics} />
                </div>
                <div className="space-y-6">
                  <ProgressOverview
                    completedTopics={completedTopics}
                    totalTopics={totalTopics}
                    completionPercentage={completionPercentage}
                  />
                  <QuickActions
                    onAddTopic={() => navigate("/topics?action=add")}
                    onPracticeTopic={() => navigate("/practice")}
                    onViewAllTopics={() => navigate("/topics")}
                  />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}