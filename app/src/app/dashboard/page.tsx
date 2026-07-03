"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
type Task = {
  id: string;
  title: string;
  employee: string;
  status: string;
  created_at?: string;
};
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

const initialTasks: Task[] = [
  {
    id: "starter-1",
    title: "Research 5 competitors",
    employee: "Researcher",
    status: "In progress",
  },
  {
    id: "starter-2",
    title: "Write homepage headline options",
    employee: "Writer",
    status: "Drafting",
  },
  {
    id: "starter-3",
    title: "Review final landing page copy",
    employee: "QA",
    status: "Waiting",
  },
];

export default function DashboardPage() {
  const [taskInput, setTaskInput] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("Project Manager");
  const [dashboardMode, setDashboardMode] = useState<"founder" | "builder">(
  "founder",
);
  const [tasks, setTasks] = useState(initialTasks);
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  const [taskError, setTaskError] = useState("");
  const [employeeOutputs, setEmployeeOutputs] = useState([
  {
    employee: "Project Manager",
    title: "Company setup plan",
    status: "Draft",
    content:
      "Your AI company is ready. Start by defining your business goal, assigning tasks, and reviewing employee outputs.",
  },
]);
  const [activity, setActivity] = useState([
  {
    message: "Project Manager created a new task queue.",
    time: "Just now",
  },
  {
    message: "Researcher started analyzing competitor positioning.",
    time: "2 minutes ago",
  },
  {
    message: "Writer prepared first draft ideas for review.",
    time: "5 minutes ago",
  },
]);
const [businessProfile, setBusinessProfile] = useState({
  name: "Project Zero",
  industry: "AI software",
  customer: "New founders and small business owners",
  goal: "Help businesses automate work with AI employees",
});
const employeeOptions = [
  "Project Manager",
  "Researcher",
  "Writer",
  "QA",
  "Sales Rep",
  "Designer",
  "Developer",
  "SEO Specialist",
];
const taskTemplates = [
  {
    title: "Create a 7-day marketing plan",
    employee: "Project Manager",
    description:
      "Plan one week of marketing tasks for a small business based on the current business profile.",
  },
  {
    title: "Research 5 competitors",
    employee: "Researcher",
    description:
      "Find competitors, compare positioning, and identify opportunities.",
  },
  {
    title: "Write 5 cold emails",
    employee: "Sales Rep",
    description:
      "Draft outreach emails for potential customers using the business goal.",
  },
  {
    title: "Create social media post ideas",
    employee: "Writer",
    description:
      "Generate content ideas for short posts that match the target customer.",
  },
  {
    title: "Improve landing page copy",
    employee: "Writer",
    description:
      "Rewrite website copy so the offer is clearer and more convincing.",
  },
  {
    title: "Create brand visual direction",
    employee: "Designer",
    description:
      "Suggest colors, visual style, and content direction for the business.",
  },
];
 useEffect(() => {
  async function loadTasks() {
    setIsLoadingTasks(true);

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    setIsLoadingTasks(false);

    if (error) {
  setTaskError("Could not load tasks. Try refreshing the page.");
  console.error(error);
  return;
}

setTaskError("");

    if (data) {
      setTasks(data);
    }
  }

  loadTasks();
}, []);
const latestTask = tasks[0];

const memoryItems = [
  {
    label: "Business",
    value: businessProfile.name,
  },
  {
    label: "Industry",
    value: businessProfile.industry,
  },
  {
    label: "Target customer",
    value: businessProfile.customer,
  },
  {
    label: "Main goal",
    value: businessProfile.goal,
  },
  {
    label: "Latest task",
    value: latestTask ? latestTask.title : "No tasks assigned yet",
  },
];  
const completedTasks = tasks.filter(
  (task) => task.status === "Completed",
).length;
const approvedOutputs = employeeOutputs.filter(
  (output) => output.status === "Approved",
).length;

const profileFieldsFilled = Object.values(businessProfile).filter(Boolean).length;

const companyScore = Math.min(
  100,
  profileFieldsFilled * 15 + tasks.length * 5 + completedTasks * 10 + approvedOutputs * 10,
);

  return (
    <main className="min-h-screen bg-black px-6 py-8 text-white">
      <div className="mx-auto max-w-6xl">
        <nav className="flex items-center justify-between rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm">
          <Link href="/" className="font-semibold text-white hover:text-blue-300">
  ← Back to Project Zero
</Link>

          <div className="text-white/50">AI Company Dashboard</div>
        </nav>

        <section className="mt-12">
  <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
    <div>
      <p className="text-sm text-blue-300/70">Dashboard</p>
      <h1 className="mt-2 text-5xl font-bold">
        Your AI company is running.
      </h1>
      <p className="mt-4 max-w-2xl text-white/60">
        Manage employees, assign tasks, track progress and review results from
        one command center.
      </p>
    </div>

    <div className="rounded-full border border-white/10 bg-white/[0.03] p-1">
      <button
        type="button"
        onClick={() => setDashboardMode("founder")}
        className={`rounded-full px-4 py-2 text-sm font-semibold ${
          dashboardMode === "founder"
            ? "bg-white text-black"
            : "text-white/50 hover:text-white"
        }`}
      >
        Founder Mode
      </button>

      <button
        type="button"
        onClick={() => setDashboardMode("builder")}
        className={`rounded-full px-4 py-2 text-sm font-semibold ${
          dashboardMode === "builder"
            ? "bg-white text-black"
            : "text-white/50 hover:text-white"
        }`}
      >
        Builder Mode
      </button>
    </div>
  </div>
</section>
<section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
  <p className="text-sm text-white/40">Command your AI company</p>

  <div className="mt-4 flex flex-col gap-3 md:flex-row">
    <input
  type="text"
  value={taskInput}
  onChange={(event) => setTaskInput(event.target.value)}
  placeholder="Example: Example: Create a 7-day marketing plan for my business..."
  className="flex-1 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none placeholder:text-white/30"
/>
<select
  value={selectedEmployee}
  onChange={(event) => setSelectedEmployee(event.target.value)}
  className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none"
>
  {employeeOptions.map((employee) => (
    <option key={employee} value={employee} className="bg-black text-white">
      {employee}
    </option>
  ))}
</select>

    <button
  type="button"
  onClick={async () => {
  if (!taskInput) return;

  const newTask = {
    title: taskInput,
    employee: selectedEmployee,
    status: "New",
  };

  const { data, error } = await supabase
    .from("tasks")
    .insert(newTask)
    .select()
    .single();

  if (error) {
  alert(error.message);
  console.error(error);
  return;
}

  setTasks([data, ...tasks]);
setActivity([
  {
    message: `${selectedEmployee} received a new task: "${data.title}" for ${businessProfile.name}.`,
    time: "Just now",
  },
  ...activity,
]);
setEmployeeOutputs([
  {
    employee: selectedEmployee,
    title: data.title,
    status: "Draft",
    content: `${selectedEmployee} is preparing work for ${businessProfile.name}. This task is connected to your goal: "${businessProfile.goal}".`,
  },
  ...employeeOutputs,
]);
setTaskInput("");
}}
  className="rounded-2xl bg-white px-6 py-3 font-semibold text-black"
>
  Assign task
</button>
  </div>
</section>
<section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    <div>
      <p className="text-sm text-white/40">Quick start templates</p>
      <h2 className="mt-1 text-2xl font-bold">
        Start with proven business tasks.
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-white/50">
        Choose a template and Project Zero will assign it to the right AI
        employee. You can still edit the task before assigning it.
      </p>
    </div>

    <span className="rounded-full border border-blue-400/20 px-3 py-1 text-xs text-blue-300">
      Founder mode
    </span>
  </div>

  <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    {taskTemplates.map((template) => (
      <button
        key={template.title}
        type="button"
        onClick={() => {
          setTaskInput(template.title);
          setSelectedEmployee(template.employee);

          setActivity([
            {
              message: `Template selected: "${template.title}" for ${template.employee}.`,
              time: "Just now",
            },
            ...activity,
          ]);
        }}
        className="rounded-2xl border border-white/10 bg-black/40 p-5 text-left transition hover:border-blue-400/30 hover:bg-blue-400/[0.04]"
      >
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-semibold">{template.title}</h3>
          <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50">
            {template.employee}
          </span>
        </div>

        <p className="mt-3 text-sm leading-6 text-white/50">
          {template.description}
        </p>
      </button>
    ))}
  </div>
</section>
{dashboardMode === "builder" && (
  <section className="mt-6 rounded-3xl border border-purple-400/20 bg-purple-400/[0.04] p-6">
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm text-purple-300/70">Builder Mode</p>
        <h2 className="mt-1 text-2xl font-bold">
          Advanced company controls.
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-white/50">
          Builder Mode is for advanced users who want more control over AI
          employees, tools, automations, and memory.
        </p>
      </div>

      <span className="rounded-full border border-purple-400/20 px-3 py-1 text-xs text-purple-300">
        Power user
      </span>
    </div>

    <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
        <p className="text-sm font-semibold">Employee tools</p>
        <p className="mt-2 text-sm text-white/50">
          Choose what tools each AI employee can use.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
        <p className="text-sm font-semibold">Automation triggers</p>
        <p className="mt-2 text-sm text-white/50">
          Start work from forms, emails, webhooks, or schedules.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
        <p className="text-sm font-semibold">Company memory</p>
        <p className="mt-2 text-sm text-white/50">
          Control what the AI company remembers.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
        <p className="text-sm font-semibold">Approval rules</p>
        <p className="mt-2 text-sm text-white/50">
          Decide what actions need human approval.
        </p>
      </div>
    </div>
  </section>
)}
<section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
    <div>
      <p className="text-sm text-blue-300/70">Business profile</p>
      <h2 className="mt-2 text-3xl font-bold">
        Teach your AI company what you are building.
      </h2>
      <p className="mt-3 max-w-2xl text-sm text-white/50">
        Project Zero uses your business context to assign better tasks to the
        right AI employees.
      </p>
    </div>

    <div className="rounded-2xl border border-green-400/20 bg-green-400/[0.04] px-4 py-2 text-sm text-green-300">
      Context active
    </div>
  </div>

  <div className="mt-6 grid gap-4 md:grid-cols-2">
    <label className="block">
      <span className="text-sm text-white/40">Business name</span>
      <input
        type="text"
        value={businessProfile.name}
        onChange={(event) =>
          setBusinessProfile({
            ...businessProfile,
            name: event.target.value,
          })
        }
        className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none"
      />
    </label>

    <label className="block">
      <span className="text-sm text-white/40">Industry</span>
      <input
        type="text"
        value={businessProfile.industry}
        onChange={(event) =>
          setBusinessProfile({
            ...businessProfile,
            industry: event.target.value,
          })
        }
        className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none"
      />
    </label>

    <label className="block">
      <span className="text-sm text-white/40">Target customer</span>
      <input
        type="text"
        value={businessProfile.customer}
        onChange={(event) =>
          setBusinessProfile({
            ...businessProfile,
            customer: event.target.value,
          })
        }
        className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none"
      />
    </label>

    <label className="block">
      <span className="text-sm text-white/40">Main goal</span>
      <input
        type="text"
        value={businessProfile.goal}
        onChange={(event) =>
          setBusinessProfile({
            ...businessProfile,
            goal: event.target.value,
          })
        }
        className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none"
      />
    </label>
  </div>
</section>
        <section className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-white/40">Active employees</p>
            <p className="mt-3 text-4xl font-bold">4</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-white/40">Tasks running</p>
            <p className="mt-3 text-4xl font-bold">{tasks.length}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
  <p className="text-sm text-white/40">Completed tasks</p>
  <p className="mt-3 text-4xl font-bold text-green-400">
    {completedTasks}
  </p>
</div>
        </section>
<section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    <div>
      <p className="text-sm text-white/40">Company memory</p>
      <h2 className="mt-1 text-2xl font-bold">
        What your AI company knows.
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-white/50">
        Project Zero uses this context to help employees understand your
        business before doing work.
      </p>
    </div>

    <span className="rounded-full border border-purple-400/20 px-3 py-1 text-xs text-purple-300">
      Shared context
    </span>
  </div>

  <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    {memoryItems.map((item) => (
      <div
        key={item.label}
        className="rounded-2xl border border-white/10 bg-black/40 p-5"
      >
        <p className="text-xs uppercase tracking-wide text-white/30">
          {item.label}
        </p>
        <p className="mt-2 text-sm leading-6 text-white/70">{item.value}</p>
      </div>
    ))}
  </div>
</section>
<section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    <div>
      <p className="text-sm text-white/40">Company health</p>
      <h2 className="mt-1 text-2xl font-bold">
        Your AI company progress score.
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-white/50">
        This score increases when your business profile is complete, tasks are
        created, tasks are completed, and employee outputs are approved.
      </p>
    </div>

    <div className="rounded-2xl border border-green-400/20 bg-green-400/[0.04] px-5 py-3 text-right">
      <p className="text-xs text-green-300/70">Health score</p>
      <p className="text-3xl font-bold text-green-300">{companyScore}%</p>
    </div>
  </div>

  <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/10">
    <div
      className="h-full rounded-full bg-green-400"
      style={{ width: `${companyScore}%` }}
    />
  </div>

  <div className="mt-6 grid gap-4 md:grid-cols-4">
    <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
      <p className="text-xs text-white/30">Profile fields</p>
      <p className="mt-2 text-2xl font-bold">{profileFieldsFilled}/4</p>
    </div>

    <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
      <p className="text-xs text-white/30">Tasks created</p>
      <p className="mt-2 text-2xl font-bold">{tasks.length}</p>
    </div>

    <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
      <p className="text-xs text-white/30">Tasks completed</p>
      <p className="mt-2 text-2xl font-bold">{completedTasks}</p>
    </div>

    <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
      <p className="text-xs text-white/30">Outputs approved</p>
      <p className="mt-2 text-2xl font-bold">{approvedOutputs}</p>
    </div>
  </div>
</section>
<section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm text-white/40">Activity</p>
      <h2 className="mt-1 text-2xl font-bold">Company timeline</h2>
    </div>

    <span className="rounded-full border border-green-400/20 px-3 py-1 text-xs text-green-300">
      Live
    </span>
  </div>

  <div className="mt-6 space-y-4">
  {taskError && (
    <div className="rounded-2xl border border-red-400/20 bg-red-400/[0.04] p-5 text-sm text-red-300">
      {taskError}
    </div>
  )}

  {activity.map((item, index) => (
    <div
      key={`${item.message}-${index}`}
      className="rounded-2xl border border-white/10 bg-black/40 p-4"
    >
      <p className="text-sm text-white/70">{item.message}</p>
      <p className="mt-1 text-xs text-white/30">{item.time}</p>
    </div>
  ))}
</div>
</section>
<section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    <div>
      <p className="text-sm text-white/40">Employee outputs</p>
      <h2 className="mt-1 text-2xl font-bold">Work produced by your AI company</h2>
    </div>

    <span className="rounded-full border border-blue-400/20 px-3 py-1 text-xs text-blue-300">
      Drafts
    </span>
  </div>

  <div className="mt-6 grid gap-4 md:grid-cols-2">
    {employeeOutputs.map((output, index) => (
      <div
        key={`${output.employee}-${output.title}-${index}`}
        className="rounded-2xl border border-white/10 bg-black/40 p-5"
      >
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-semibold">{output.title}</h3>
          <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50">
            {output.employee}
          </span>
        </div>

        <p className="mt-4 text-sm leading-6 text-white/60">{output.content}</p>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50">
    {output.status}
  </span>

  <div className="flex gap-2">
    <button
      type="button"
      onClick={() => {
  setEmployeeOutputs(
    employeeOutputs.map((currentOutput, outputIndex) =>
      outputIndex === index
        ? { ...currentOutput, status: "Approved" }
        : currentOutput,
    ),
  );

  setActivity([
    {
      message: `${output.employee} output approved: "${output.title}"`,
      time: "Just now",
    },
    ...activity,
  ]);
}}
      className="rounded-full border border-green-400/20 px-3 py-1 text-xs text-green-300 hover:text-green-200"
    >
      Approve
    </button>

    <button
      type="button"
     onClick={() => {
  setEmployeeOutputs(
    employeeOutputs.map((currentOutput, outputIndex) =>
      outputIndex === index
        ? { ...currentOutput, status: "Needs changes" }
        : currentOutput,
    ),
  );

  setActivity([
    {
      message: `${output.employee} output needs changes: "${output.title}"`,
      time: "Just now",
    },
    ...activity,
  ]);
}}
      className="rounded-full border border-yellow-400/20 px-3 py-1 text-xs text-yellow-300 hover:text-yellow-200"
    >
      Needs changes
    </button>
  </div>
</div>
      </div>
    ))}
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
  {isLoadingTasks && (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-5 text-sm text-white/50">
      Loading tasks...
    </div>
  )}

  {!isLoadingTasks && tasks.length === 0 && (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-5 text-sm text-white/50">
      No tasks yet. Assign your first task above.
    </div>
  )}

  {tasks.map((task, index) => (
                <div
                  key={task.id}
                  className="rounded-2xl border border-white/10 bg-black/40 p-5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">{task.title}</h3>
                      <p className="mt-2 text-sm text-white/50">
                        Assigned to {task.employee}
                      </p>
                    </div>

                    
                    <div className="flex items-center gap-2">
  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60">
    {task.status}
  </span>

  <button
    type="button"
    onClick={async () => {
  const taskToUpdate = tasks[index];

  const { error } = await supabase
    .from("tasks")
    .update({ status: "Completed" })
    .eq("id", taskToUpdate.id);

  if (error) {
    alert(error.message);
    console.error(error);
    return;
  }

  setTasks(
    tasks.map((currentTask, taskIndex) =>
      taskIndex === index
        ? { ...currentTask, status: "Completed" }
        : currentTask,
    ),
  );
}}
    className="rounded-full border border-green-400/20 px-3 py-1 text-xs text-green-300 hover:text-green-200"
  >
    Complete
  </button>

  <button
    type="button"
    onClick={async () => {
  const taskToDelete = tasks[index];

  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", taskToDelete.id);

  if (error) {
    alert(error.message);
    console.error(error);
    return;
  }

  setTasks(tasks.filter((_, taskIndex) => taskIndex !== index));
}}
    className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/40 hover:text-white"
  >
    Remove
  </button>
</div>
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