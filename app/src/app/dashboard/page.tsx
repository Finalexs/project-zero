import Link from "next/link";
const employees = [
  {
    name: "Project Manager",
    status: "Online",
    task: "Organizing company tasks",
  },
  {
    name: "Researcher",
    status: "Working",
    task: "Finding competitor insights",
  },
  {
    name: "Writer",
    status: "Drafting",
    task: "Creating landing page copy",
  },
  {
    name: "QA",
    status: "Waiting",
    task: "Ready to review outputs",
  },
];

const tasks = [
  {
    title: "Research 5 competitors",
    employee: "Researcher",
    status: "In progress",
  },
  {
    title: "Write homepage headline options",
    employee: "Writer",
    status: "Drafting",
  },
  {
    title: "Review final landing page copy",
    employee: "QA",
    status: "Waiting",
  },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-8 text-white">
      <div className="mx-auto max-w-6xl">
        <nav className="flex items-center justify-between rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm">
          <Link href="/" className="font-semibold">
  Project Zero
</Link>

          <div className="text-white/50">AI Company Dashboard</div>
        </nav>

        <section className="mt-12">
          <p className="text-sm text-blue-300/70">Dashboard</p>
          <h1 className="mt-2 text-5xl font-bold">
            Your AI company is running.
          </h1>
          <p className="mt-4 max-w-2xl text-white/60">
            Manage employees, assign tasks, track progress and review results
            from one command center.
          </p>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-white/40">Active employees</p>
            <p className="mt-3 text-4xl font-bold">4</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-white/40">Tasks running</p>
            <p className="mt-3 text-4xl font-bold">3</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-white/40">Company status</p>
            <p className="mt-3 text-4xl font-bold text-green-400">Online</p>
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-2xl font-bold">Employees</h2>

            <div className="mt-6 space-y-4">
              {employees.map((employee) => (
                <div
                  key={employee.name}
                  className="rounded-2xl border border-white/10 bg-black/40 p-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{employee.name}</h3>
                    <span className="text-xs text-blue-300">
                      {employee.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-white/50">{employee.task}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-2xl font-bold">Tasks</h2>

            <div className="mt-6 space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.title}
                  className="rounded-2xl border border-white/10 bg-black/40 p-5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">{task.title}</h3>
                      <p className="mt-2 text-sm text-white/50">
                        Assigned to {task.employee}
                      </p>
                    </div>

                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60">
                      {task.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}