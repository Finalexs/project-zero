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
type EmployeeOutput = {
  id?: string;
  task_id?: string;
  employee: string;
  title: string;
  content: string;
  status: string;
  type?: string;
  createdAt?: string;
  created_at?: string;
};
type CommandHistoryItem = {
  id?: string;
  command: string;
  employee: string;
  time: string;
  created_at?: string;
};

type OutputFilter = "All" | "Draft" | "Approved" | "Needs changes";

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
  const [commandHistory, setCommandHistory] = useState<CommandHistoryItem[]>([
  {
    command: "Create a launch plan for Project Zero",
    employee: "Project Manager",
    time: "Starter command",
  },
]);
  const [selectedEmployee, setSelectedEmployee] = useState("Project Manager");
  const [dashboardMode, setDashboardMode] = useState<"founder" | "builder">(
  "founder",
);
  const [tasks, setTasks] = useState(initialTasks);
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  const [taskError, setTaskError] = useState("");
  const [employeeOutputs, setEmployeeOutputs] = useState<EmployeeOutput[]>([
  {
    employee: "Project Manager",
    title: "Company setup plan",
    status: "Draft",
    content:
      "Your AI company is ready. Start by defining your business goal, assigning tasks, and reviewing employee outputs.",
  },
]);
const [outputFilter, setOutputFilter] = useState<OutputFilter>("All");
const [isOutputsOpen, setIsOutputsOpen] = useState(true);
const [isTasksOpen, setIsTasksOpen] = useState(true);
const [isCommandHistoryOpen, setIsCommandHistoryOpen] = useState(true);
const [isActivityOpen, setIsActivityOpen] = useState(true);
const [isCompanyMemoryOpen, setIsCompanyMemoryOpen] = useState(true);
const [isBusinessProfileOpen, setIsBusinessProfileOpen] = useState(true);
const [isReviewQueueOpen, setIsReviewQueueOpen] = useState(true);
const [isQuickStartOpen, setIsQuickStartOpen] = useState(true);
const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(true);
const [isEmployeesOpen, setIsEmployeesOpen] = useState(true);
const [isEmployeeProfileOpen, setIsEmployeeProfileOpen] = useState(true);
const [isHealthScoreOpen, setIsHealthScoreOpen] = useState(true);
const [isBuilderControlsOpen, setIsBuilderControlsOpen] = useState(true);
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
const employeeProfiles = [
  {
    name: "Project Manager",
    role: "Coordinates the AI company and turns goals into organized tasks.",
    skills: ["Planning", "Delegation", "Prioritization", "Review"],
    focus: "Breaking business goals into clear work for the team.",
    bestFor: "Planning launches, organizing projects, assigning tasks.",
  },
  {
    name: "Researcher",
    role: "Finds useful information, market insights, competitors, and ideas.",
    skills: ["Research", "Competitor analysis", "Summaries", "Market insights"],
    focus: "Finding the information your company needs before acting.",
    bestFor: "Competitor research, customer research, market analysis.",
  },
  {
    name: "Writer",
    role: "Creates content, emails, landing page copy, and marketing drafts.",
    skills: ["Copywriting", "Emails", "Content", "Messaging"],
    focus: "Turning ideas into clear written output.",
    bestFor: "Emails, website copy, social posts, scripts, offers.",
  },
  {
    name: "QA",
    role: "Reviews work before it gets approved or used.",
    skills: ["Review", "Quality control", "Risk spotting", "Clarity"],
    focus: "Checking outputs before humans approve them.",
    bestFor: "Reviewing drafts, improving quality, finding mistakes.",
  },
  {
    name: "Sales Rep",
    role: "Finds leads, writes outreach, and helps convert customers.",
    skills: ["Lead ideas", "Outreach", "Sales messaging", "Follow-ups"],
    focus: "Helping the business get conversations with customers.",
    bestFor: "Cold emails, customer lists, follow-ups, offer angles.",
  },
  {
    name: "Designer",
    role: "Helps with visual direction, layouts, brand ideas, and UI feedback.",
    skills: ["UI ideas", "Branding", "Layout", "Visual review"],
    focus: "Making the product and content look more polished.",
    bestFor: "Landing pages, dashboards, brand concepts, design feedback.",
  },
  {
    name: "Developer",
    role: "Helps build software, tools, automations, and technical systems.",
    skills: ["Code", "Debugging", "Architecture", "Automation"],
    focus: "Turning product ideas into working software.",
    bestFor: "Features, bug fixes, APIs, integrations, technical planning.",
  },
  {
    name: "SEO Specialist",
    role: "Improves search visibility and helps create content people can find.",
    skills: ["Keywords", "SEO content", "Search intent", "Optimization"],
    focus: "Helping the business get discovered through search.",
    bestFor: "Blog ideas, keyword plans, SEO landing pages.",
  },
];

const selectedEmployeeProfile =
  employeeProfiles.find((employee) => employee.name === selectedEmployee) ??
  employeeProfiles[0];
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
function getOutputType(employee: string) {
  if (employee === "Researcher") return "Research brief";
  if (employee === "Writer") return "Draft copy";
  if (employee === "Sales Rep") return "Sales plan";
  if (employee === "Designer") return "Design direction";
  if (employee === "Developer") return "Technical plan";
  if (employee === "QA") return "Quality review";
  if (employee === "SEO Specialist") return "SEO plan";

  return "Project plan";
}
function findTaskForOutput(output: EmployeeOutput, tasks: Task[]) {
  if (output.task_id) {
    return tasks.find((task) => task.id === output.task_id);
  }

  return tasks.find((task) => output.title.includes(task.title));
}
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
async function loadOutputs() {
  const { data, error } = await supabase
    .from("outputs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.warn("Could not load outputs:", error);
    return;
  }

  if (data && data.length > 0) {
    setEmployeeOutputs(
      data.map((output) => ({
        id: output.id,
        task_id: output.task_id,
        employee: output.employee,
        title: output.title,
        content: output.content,
        status: output.status,
        type: output.type,
        createdAt: "Saved",
        created_at: output.created_at,
      })),
    );
  }
}
async function loadCommandHistory() {
  const { data, error } = await supabase
    .from("command_history")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.warn("Could not load command history:", error);
    return;
  }

  if (data && data.length > 0) {
    setCommandHistory(
      data.map((item) => ({
        id: item.id,
        command: item.command,
        employee: item.employee,
        time: "Saved",
        created_at: item.created_at,
      })),
    );
  }
}
  loadTasks();
  loadOutputs();
  loadCommandHistory();
}, []);
const filteredEmployeeOutputs =
  outputFilter === "All"
    ? employeeOutputs
    : employeeOutputs.filter((output) => output.status === outputFilter);
    const draftOutputs = employeeOutputs.filter(
  (output) => output.status === "Draft",
).length;

const needsChangesOutputs = employeeOutputs.filter(
  (output) => output.status === "Needs changes",
).length;

const approvedOutputsCount = employeeOutputs.filter(
  (output) => output.status === "Approved",
).length;

const openTasks = tasks.filter(
  (task) => task.status !== "Completed" && task.status !== "Approved",
).length;
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
<section className="mt-10 rounded-3xl border border-blue-400/20 bg-blue-400/[0.03] p-6">
  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
    <div>
      <p className="text-sm text-blue-300/70">How it works</p>
      <h2 className="mt-1 text-2xl font-bold">
        Turn one instruction into reviewable work.
      </h2>
      {isHowItWorksOpen && (
  <p className="mt-2 max-w-2xl text-sm text-white/50">
    Project Zero helps you give work to digital AI employees, review what
    they produce, and stay in control before anything gets approved.
  </p>
)}
    </div>

    <div className="flex flex-wrap items-center justify-end gap-2">
      <span className="rounded-full border border-blue-400/20 bg-blue-400/[0.04] px-3 py-1 text-xs text-blue-300">
        Simple workflow
      </span>

      <button
        type="button"
        onClick={() => setIsHowItWorksOpen(!isHowItWorksOpen)}
        className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50 hover:bg-white/[0.04] hover:text-white"
      >
        {isHowItWorksOpen ? "Hide guide" : "Show guide"}
      </button>
    </div>
  </div>

  {isHowItWorksOpen && (
    <div className="mt-6 grid gap-4 md:grid-cols-4">
      <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-400 text-sm font-bold text-black">
          1
        </div>
        <h3 className="mt-4 font-semibold">Write a task</h3>
        <p className="mt-2 text-sm leading-6 text-white/50">
          Tell your AI company what you want done in plain language.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-400 text-sm font-bold text-black">
          2
        </div>
        <h3 className="mt-4 font-semibold">Choose an employee</h3>
        <p className="mt-2 text-sm leading-6 text-white/50">
          Pick Researcher, Writer, Sales Rep, Designer, Developer, QA, or another role.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-400 text-sm font-bold text-black">
          3
        </div>
        <h3 className="mt-4 font-semibold">Review the output</h3>
        <p className="mt-2 text-sm leading-6 text-white/50">
          Read the draft, plan, research, or task result before using it.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-400 text-sm font-bold text-black">
          4
        </div>
        <h3 className="mt-4 font-semibold">Approve or improve</h3>
        <p className="mt-2 text-sm leading-6 text-white/50">
          Approve it, request changes, regenerate it, or delete it.
        </p>
      </div>
    </div>
  )}

  {!isHowItWorksOpen && (
    <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-5 text-sm text-white/50">
      Guide hidden. Click “Show guide” to view the 4-step workflow.
    </div>
  )}
</section>
<section className="relative mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
    <div className="pr-44">
      <p className="text-sm text-green-300/70">Review queue</p>
      <h2 className="mt-1 text-2xl font-bold">
        See what needs your attention.
      </h2>
      {isReviewQueueOpen && (
  <p className="mt-2 max-w-2xl text-sm text-white/50">
    Track drafts, requested changes, approved work, and open tasks from one
    place before moving work forward.
  </p>
)}
    </div>

    <div className="absolute right-6 top-6 flex flex-wrap items-center justify-end gap-2">
  <span className="rounded-full border border-green-400/20 bg-green-400/[0.04] px-3 py-1 text-xs text-green-300">
    {draftOutputs + needsChangesOutputs} need review
  </span>

  <button
    type="button"
    onClick={() => setIsReviewQueueOpen(!isReviewQueueOpen)}
    className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50 hover:bg-white/[0.04] hover:text-white"
  >
    {isReviewQueueOpen ? "Hide queue" : "Show queue"}
  </button>
</div>
  </div>
{isReviewQueueOpen && (
  <div className="mt-6 grid gap-4 md:grid-cols-4">
    <div className="rounded-2xl border border-blue-400/20 bg-blue-400/[0.03] p-5">
      <p className="text-sm text-blue-300/70">Drafts</p>
      <p className="mt-3 text-3xl font-bold">{draftOutputs}</p>
      <p className="mt-2 text-sm text-white/45">
        Outputs waiting for your review.
      </p>
    </div>

    <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/[0.03] p-5">
      <p className="text-sm text-yellow-300/70">Needs changes</p>
      <p className="mt-3 text-3xl font-bold">{needsChangesOutputs}</p>
      <p className="mt-2 text-sm text-white/45">
        Work that should be improved or regenerated.
      </p>
    </div>

    <div className="rounded-2xl border border-green-400/20 bg-green-400/[0.03] p-5">
      <p className="text-sm text-green-300/70">Approved</p>
      <p className="mt-3 text-3xl font-bold">{approvedOutputsCount}</p>
      <p className="mt-2 text-sm text-white/45">
        Outputs that passed review.
      </p>
    </div>

    <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
      <p className="text-sm text-white/40">Open tasks</p>
      <p className="mt-3 text-3xl font-bold">{openTasks}</p>
      <p className="mt-2 text-sm text-white/45">
        Tasks that are still moving through the workflow.
      </p>
    </div>
  </div>
  )}
  {!isReviewQueueOpen && (
  <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-5 text-sm text-white/50">
    Queue hidden. Click “Show queue” to view drafts, changes, approvals, and
    open tasks.
  </div>
)}
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
  status: "Waiting for approval",
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
const commandToSave = {
  command: data.title,
  employee: selectedEmployee,
};

const { data: savedCommand, error: commandSaveError } = await supabase
  .from("command_history")
  .insert(commandToSave)
  .select()
  .single();

if (commandSaveError) {
  alert(commandSaveError.message);
  console.error(commandSaveError);
  return;
}

setCommandHistory([
  {
    id: savedCommand.id,
    command: savedCommand.command,
    employee: savedCommand.employee,
    time: "Just now",
    created_at: savedCommand.created_at,
  },
  ...commandHistory,
]);
const outputResponse = await fetch("/api/generate-output", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    task: data.title,
    employee: selectedEmployee,
    businessName: businessProfile.name,
    industry: businessProfile.industry,
    targetCustomer: businessProfile.customer,
    mainGoal: businessProfile.goal,
  }),
});

const generatedOutput = await outputResponse.json();

if (!outputResponse.ok) {
  alert(generatedOutput.error ?? "Could not generate employee output.");
  return;
}

const outputToSave = {
  task_id: data.id,
  employee: generatedOutput.employee,
  title: generatedOutput.title,
  content: generatedOutput.content,
  status: generatedOutput.status,
  type: getOutputType(selectedEmployee),
};

const { data: savedOutput, error: outputSaveError } = await supabase
  .from("outputs")
  .insert(outputToSave)
  .select()
  .single();

if (outputSaveError) {
  alert(outputSaveError.message);
  console.error(outputSaveError);
  return;
}

setEmployeeOutputs([
  {
    id: savedOutput.id,
    task_id: savedOutput.task_id,
    employee: savedOutput.employee,
    title: savedOutput.title,
    content: savedOutput.content,
    status: savedOutput.status,
    type: savedOutput.type,
    createdAt: "Just now",
    created_at: savedOutput.created_at,
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
<section className="relative mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
    <div className="pr-44">
      <p className="text-sm text-white/40">Quick start templates</p>
      <h2 className="mt-1 text-2xl font-bold">
        Start with proven business tasks.
      </h2>
      {isQuickStartOpen && (
  <p className="mt-2 text-sm text-white/50">
    Choose a template and Project Zero will assign it to the right AI
    employee. You can still edit the task before assigning it.
  </p>
)}
    </div>

    <div className="absolute right-6 top-6 flex flex-wrap items-center justify-end gap-2">
      <span className="rounded-full border border-blue-400/20 px-3 py-1 text-xs text-blue-300">
        Founder mode
      </span>

      <button
        type="button"
        onClick={() => setIsQuickStartOpen(!isQuickStartOpen)}
        className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50 hover:bg-white/[0.04] hover:text-white"
      >
        {isQuickStartOpen ? "Hide templates" : "Show templates"}
      </button>
    </div>
  </div>

  {isQuickStartOpen && (
    <div className="mt-6 grid gap-4 md:grid-cols-3">
      {taskTemplates.map((template) => (
        <button
          key={template.title}
          type="button"
          onClick={() => {
            setTaskInput(template.title);
            setSelectedEmployee(template.employee);

            setActivity([
              {
                message: `Template selected: "${template.title}" assigned to ${template.employee}.`,
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
  )}

  {!isQuickStartOpen && (
  <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-5 text-sm text-white/50">
    Templates hidden. Click “Show templates” to pick a proven business task.
  </div>
)}
</section>
{dashboardMode === "builder" && (
  <section className="relative mt-6 rounded-3xl border border-purple-400/20 bg-purple-400/[0.04] p-6">
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div>
        <p className="text-sm text-purple-300/70">Builder Mode</p>
        <h2 className="mt-1 text-2xl font-bold">
          Advanced company controls.
        </h2>

        {isBuilderControlsOpen && (
          <p className="mt-2 max-w-2xl text-sm text-white/50">
            Builder Mode is for advanced users who want more control over AI
            employees, tools, automations, and memory.
          </p>
        )}
      </div>

      <div className="absolute right-6 top-6 flex flex-wrap items-center justify-end gap-2">
        <span className="rounded-full border border-purple-400/20 px-3 py-1 text-xs text-purple-300">
          Power user
        </span>

        <button
          type="button"
          onClick={() => setIsBuilderControlsOpen(!isBuilderControlsOpen)}
          className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50 hover:bg-white/[0.04] hover:text-white"
        >
          {isBuilderControlsOpen ? "Hide controls" : "Show controls"}
        </button>
      </div>
    </div>

    {isBuilderControlsOpen && (
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
          <p className="font-semibold">Tool access</p>
          <p className="mt-2 text-sm text-white/50">
            Choose what tools each AI employee can use.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
          <p className="font-semibold">Automation rules</p>
          <p className="mt-2 text-sm text-white/50">
            Control what happens after tasks, outputs, and approvals.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
          <p className="font-semibold">Memory rules</p>
          <p className="mt-2 text-sm text-white/50">
            Decide what the AI company remembers and uses later.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
          <p className="font-semibold">Webhooks and APIs</p>
          <p className="mt-2 text-sm text-white/50">
            Connect Project Zero to external apps and workflows.
          </p>
        </div>
      </div>
    )}

    {!isBuilderControlsOpen && (
      <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/50">
        Builder controls hidden.
      </div>
    )}
  </section>
)}
<section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
    <div>
      <p className="text-sm text-blue-300/70">Business profile</p>
      <h2 className="mt-2 text-3xl font-bold">
        Teach your AI company what you are building.
      </h2>
      {isBusinessProfileOpen && (
  <p className="mt-2 text-sm text-white/50">
    Project Zero uses your business context to assign better tasks to the right
    AI employees.
  </p>
)}
    </div>

    <div className="flex flex-wrap items-center justify-end gap-2">
  <span className="rounded-full border border-green-400/20 bg-green-400/[0.04] px-3 py-1 text-xs text-green-300">
    Context active
  </span>

  <button
    type="button"
    onClick={() => setIsBusinessProfileOpen(!isBusinessProfileOpen)}
    className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50 hover:bg-white/[0.04] hover:text-white"
  >
    {isBusinessProfileOpen ? "Hide profile" : "Show profile"}
  </button>
</div>
  </div>
{isBusinessProfileOpen && (
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
  )}
  {!isBusinessProfileOpen && (
  <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-5 text-sm text-white/50">
    Profile hidden. Click “Show profile” to edit company context.
  </div>
)}
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
{dashboardMode === "builder" && (
<section className="relative mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
  <div>

    <p className="text-sm text-white/40">Company memory</p>
    <h2 className="mt-1 text-2xl font-bold">
      What your AI company remembers.
    </h2>

    {isCompanyMemoryOpen && (
  <p className="mt-2 text-sm text-white/50">
    Business context helps your AI employees understand the company before
    creating work.
  </p>
)}
  </div>


 
</div>

   <div className="absolute right-6 top-6 flex flex-wrap items-center justify-end gap-2">
  <span className="rounded-full border border-purple-400/20 px-3 py-1 text-xs text-purple-300">
    Shared context
  </span>

  <button
    type="button"
    onClick={() => setIsCompanyMemoryOpen(!isCompanyMemoryOpen)}
    className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50 hover:bg-white/[0.04] hover:text-white"
  >
    {isCompanyMemoryOpen ? "Hide memory" : "Show memory"}
  </button>
</div>
  </div>

  <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    {isCompanyMemoryOpen && (
  <div className="mt-6 grid gap-4 md:grid-cols-2">
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
)}
{!isCompanyMemoryOpen && (
  <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-5 text-sm text-white/50">
    Memory hidden. Click “Show memory” to view company context.
  </div>
)}
  </div>
</section>
)}
<section className="relative mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
    <div className="pr-56">
      <p className="text-sm text-white/40">Company health</p>
      <h2 className="mt-1 text-2xl font-bold">
        Your AI company progress score.
      </h2>

      {isHealthScoreOpen && (
        <p className="mt-2 max-w-2xl text-sm text-white/50">
          This score increases when your business profile is complete, tasks are
          created, tasks are completed, and employee outputs are approved.
        </p>
      )}
    </div>

    <div className="absolute right-6 top-4 flex flex-wrap items-start justify-end gap-2">
      <div className="rounded-2xl border border-green-400/20 bg-green-400/[0.04] px-5 py-3 text-right">
        <p className="text-xs text-green-300/70">Health score</p>
        <p className="text-3xl font-bold text-green-300">{companyScore}%</p>
      </div>

      <button
        type="button"
        onClick={() => setIsHealthScoreOpen(!isHealthScoreOpen)}
        className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50 hover:bg-white/[0.04] hover:text-white"
      >
        {isHealthScoreOpen ? "Hide score" : "Show score"}
      </button>
    </div>
  </div>

  {isHealthScoreOpen && (
    <>
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
    </>
  )}

  {!isHealthScoreOpen && (
    <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/50">
      Score details hidden.
    </div>
  )}
</section>
<section className="relative mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
  <div className="flex items-center justify-between">
   <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
  <div className="pr-40">
    <p className="text-sm text-white/40">Activity</p>
    <h2 className="mt-1 text-2xl font-bold">Company timeline</h2>
    {isActivityOpen && (
  <p className="mt-2 text-sm text-white/50">
    See what your AI company has done recently.
  </p>
)}
  </div>

  <div className="absolute right-6 top-6 flex flex-wrap items-center justify-end gap-2">
    <span className="rounded-full border border-green-400/20 px-3 py-1 text-xs text-green-300">
      Live
    </span>

    <button
      type="button"
      onClick={() => setIsActivityOpen(!isActivityOpen)}
      className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50 hover:bg-white/[0.04] hover:text-white"
    >
      {isActivityOpen ? "Hide activity" : "Show activity"}
    </button>
  </div>
</div>

    
  </div>

  <div className="mt-6 space-y-4">
  {taskError && (
    <div className="rounded-2xl border border-red-400/20 bg-red-400/[0.04] p-5 text-sm text-red-300">
      {taskError}
    </div>
  )}
{isActivityOpen && (
  <div className="mt-6 space-y-4">
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
)}
{!isActivityOpen && (
  <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-5 text-sm text-white/50">
    Activity hidden. Click “Show activity” to view recent events.
  </div>
)}
</div>
</section>
<section className="relative mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
  <div className="pr-44">
    <p className="text-sm text-blue-300/70">Command history</p>
    <h2 className="mt-1 text-2xl font-bold">
      Recent instructions given to your AI company.
    </h2>
    {isCommandHistoryOpen && (
  <p className="mt-2 text-sm text-white/50">
    Every command becomes part of the company context, so the system can
    understand what work has been requested.
  </p>
)}
  </div>

  <div className="absolute right-6 top-6 flex flex-wrap items-center justify-end gap-2">
    <span className="rounded-full border border-blue-400/20 bg-blue-400/[0.04] px-3 py-1 text-xs text-blue-300">
      {commandHistory.length} commands
    </span>

    <button
      type="button"
      onClick={() => setIsCommandHistoryOpen(!isCommandHistoryOpen)}
      className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50 hover:bg-white/[0.04] hover:text-white"
    >
      {isCommandHistoryOpen ? "Hide history" : "Show history"}
    </button>
  </div>
</div>

  {isCommandHistoryOpen && (
  <div className="mt-6 space-y-3">
    {commandHistory.map((item, index) => (
      <div
        key={`${item.command}-${index}`}
        className="rounded-2xl border border-white/10 bg-black/40 p-4"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-semibold">{item.command}</p>
            <p className="mt-1 text-xs text-white/40">
              Assigned to {item.employee}
            </p>
          </div>

          <span className="text-xs text-white/30">{item.time}</span>
        </div>
      </div>
    ))}
  </div>
  )}

{!isCommandHistoryOpen && (
  <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-5 text-sm text-white/50">
    History hidden. Click “Show history” to view previous instructions.
  </div>
)}
</section>
<section className="relative mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
    <div className="pr-44">
      <p className="text-sm text-white/40">Employee outputs</p>
      <h2 className="mt-1 text-2xl font-bold">Work produced by your AI company</h2>
    </div>

    <div className="absolute right-6 top-6 flex flex-wrap items-center justify-end gap-2">
  {(["All", "Draft", "Approved", "Needs changes"] as OutputFilter[]).map(
    (filter) => (
      <button
        key={filter}
        type="button"
        onClick={() => setOutputFilter(filter)}
        className={`rounded-full border px-3 py-1 text-xs ${
          outputFilter === filter
            ? "border-blue-400/40 bg-blue-400/[0.08] text-blue-300"
            : "border-white/10 text-white/40 hover:bg-white/[0.04] hover:text-white"
        }`}
      >
        {filter}
      </button>
    ),
  )}

  <button
    type="button"
    onClick={() => setIsOutputsOpen(!isOutputsOpen)}
    className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50 hover:bg-white/[0.04] hover:text-white"
  >
    {isOutputsOpen ? "Hide outputs" : "Show outputs"}
  </button>
</div>
  </div>

  <div className="mt-6 grid gap-4 md:grid-cols-2">
    {isOutputsOpen && (
  <div className="mt-6 space-y-4">
    {filteredEmployeeOutputs.length === 0 && (
  <div className="rounded-2xl border border-white/10 bg-black/40 p-5 text-sm text-white/50">
    No outputs found for this filter.
  </div>
)}
  
    {filteredEmployeeOutputs.map((output, index) => (
      <div
        key={`${output.employee}-${output.title}-${index}`}
        className="rounded-2xl border border-white/10 bg-black/40 p-5"
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
  <div>
    <p className="text-sm text-white/40">{output.employee}</p>
    <h3 className="mt-2 font-semibold">{output.title}</h3>
  </div>

  <div className="flex flex-wrap gap-2">
   {"type" in output && typeof output.type === "string" && (
  <span className="rounded-full border border-blue-400/20 bg-blue-400/[0.04] px-3 py-1 text-xs text-blue-300">
    {output.type}
  </span>
)}

{"createdAt" in output && typeof output.createdAt === "string" && (
  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/40">
    {output.createdAt}
  </span>
)}
  </div>
</div>

<p className="mt-4 whitespace-pre-line rounded-2xl border border-white/10 bg-black/30 p-4 text-sm leading-6 text-white/60">
  {output.content}
</p>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50">
    {output.status}
  </span>

  <div className="flex gap-2">
<button
  type="button"
  onClick={async () => {
const { error: outputStatusError } = await supabase
  .from("outputs")
  .update({ status: "Approved" })
  .eq("id", output.id);

if (outputStatusError) {
  alert(outputStatusError.message);
  console.error(outputStatusError);
  return;
}  
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

    const matchingTask = findTaskForOutput(output, tasks);

    if (matchingTask) {
      await supabase
        .from("tasks")
        .update({ status: "Approved" })
        .eq("id", matchingTask.id);

      setTasks(
        tasks.map((task) =>
          task.id === matchingTask.id
            ? { ...task, status: "Approved" }
            : task,
        ),
      );
    }
  }}
  className="rounded-full border border-green-400/20 px-3 py-1 text-xs text-green-300 hover:bg-green-400/[0.06]"
>
  Approve
</button>

<button
  type="button"
  onClick={async () => {
const { error: outputStatusError } = await supabase
  .from("outputs")
  .update({ status: "Needs changes" })
  .eq("id", output.id);

if (outputStatusError) {
  alert(outputStatusError.message);
  console.error(outputStatusError);
  return;
}   
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

    const matchingTask = findTaskForOutput(output, tasks);

    if (matchingTask) {
      await supabase
        .from("tasks")
        .update({ status: "Needs changes" })
        .eq("id", matchingTask.id);

      setTasks(
        tasks.map((task) =>
          task.id === matchingTask.id
            ? { ...task, status: "Needs changes" }
            : task,
        ),
      );
    }
  }}
  className="rounded-full border border-yellow-400/20 px-3 py-1 text-xs text-yellow-300 hover:bg-yellow-400/[0.06]"
>
  Needs changes
</button>
<button
  type="button"
  onClick={async () => {
    const matchingTask = findTaskForOutput(output, tasks);

    if (!matchingTask) {
      alert("Could not find the linked task for this output.");
      return;
    }

    const outputResponse = await fetch("/api/generate-output", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: matchingTask.title,
        employee: output.employee,
        businessName: businessProfile.name,
        industry: businessProfile.industry,
        targetCustomer: businessProfile.customer,
        mainGoal: businessProfile.goal,
      }),
    });

    const generatedOutput = await outputResponse.json();

    if (!outputResponse.ok) {
      alert(generatedOutput.error ?? "Could not regenerate employee output.");
      return;
    }

    if (output.id) {
      const { data: updatedOutput, error: updateError } = await supabase
        .from("outputs")
        .update({
          title: generatedOutput.title,
          content: `${generatedOutput.content}

Revision note:
This output was regenerated after the previous draft was marked as needing changes.`,
          status: "Draft",
          type: getOutputType(output.employee),
        })
        .eq("id", output.id)
        .select()
        .single();

      if (updateError) {
        alert(updateError.message);
        console.error(updateError);
        return;
      }

      setEmployeeOutputs(
        employeeOutputs.map((currentOutput, outputIndex) =>
          outputIndex === index
            ? {
                ...currentOutput,
                title: updatedOutput.title,
                content: updatedOutput.content,
                status: updatedOutput.status,
                type: updatedOutput.type,
                createdAt: "Regenerated",
              }
            : currentOutput,
        ),
      );
    }

    await supabase
      .from("tasks")
      .update({ status: "Waiting for approval" })
      .eq("id", matchingTask.id);

    setTasks(
      tasks.map((task) =>
        task.id === matchingTask.id
          ? { ...task, status: "Waiting for approval" }
          : task,
      ),
    );

    setActivity([
      {
        message: `${output.employee} regenerated output: "${output.title}"`,
        time: "Just now",
      },
      ...activity,
    ]);
  }}
  className="rounded-full border border-blue-400/20 px-3 py-1 text-xs text-blue-300 hover:bg-blue-400/[0.06]"
>
  Regenerate
</button>
<button
  type="button"
  onClick={async () => {
 if (output.id) {
  const { error } = await supabase.from("outputs").delete().eq("id", output.id);

  if (error) {
    alert(error.message);
    console.error(error);
    return;
  }
}   
    setEmployeeOutputs(
      employeeOutputs.filter((_, outputIndex) => outputIndex !== index),
    );

    setActivity([
      {
        message: `${output.employee} output deleted: "${output.title}"`,
        time: "Just now",
      },
      ...activity,
    ]);
  }}
  className="rounded-full border border-red-400/20 px-3 py-1 text-xs text-red-300 hover:bg-red-400/[0.06]"
>
  Delete
</button>
  </div>
</div>
      </div>
    ))}
  </div>
  )}

{!isOutputsOpen && (
  <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-5 text-sm text-white/50">
    Employee outputs are hidden. Click “Show outputs” to review drafts,
    approvals, and requested changes.
  </div>
)}
</div>
</section>
        <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <div className="self-start rounded-3xl border border-white/10 bg-white/[0.03] p-6">
  <div className="flex items-center justify-between gap-4">
    <h2 className="text-2xl font-bold">Employees</h2>

    <button
      type="button"
      onClick={() => setIsEmployeesOpen(!isEmployeesOpen)}
      className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50 hover:bg-white/[0.04] hover:text-white"
    >
      {isEmployeesOpen ? "Hide employees" : "Show employees"}
    </button>
  </div>

  {isEmployeesOpen && (
    <div className="mt-6 space-y-4">
      {employees.map((employee) => (
        <div
          key={employee.name}
          className="rounded-2xl border border-white/10 bg-black/40 p-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{employee.name}</h3>
            <span className="text-xs text-blue-300">{employee.status}</span>
          </div>

          <p className="mt-2 text-sm text-white/50">{employee.task}</p>
        </div>
      ))}
    </div>
  )}

  {!isEmployeesOpen && (
    <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-5 text-sm text-white/50">
      Employees hidden. Click “Show employees” to view available AI roles.
    </div>
  )}
</div>

          <div className="self-start rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex items-center justify-between gap-4">
  <h2 className="text-2xl font-bold">Tasks</h2>

  <button
    type="button"
    onClick={() => setIsTasksOpen(!isTasksOpen)}
    className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50 hover:bg-white/[0.04] hover:text-white"
  >
    {isTasksOpen ? "Hide tasks" : "Show tasks"}
  </button>
</div>

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
{isTasksOpen && (
  <div className="mt-6 space-y-4">
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
)}
{!isTasksOpen && (
  <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-5 text-sm text-white/50">
    Tasks are hidden. Click “Show tasks” to view assigned work and update progress.
  </div>
)}
            </div>
          </div>
        </section>
        <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
    <div>
      <p className="text-sm text-purple-300/70">Selected employee</p>
      <h2 className="mt-1 text-2xl font-bold">{selectedEmployeeProfile.name}</h2>
      {isEmployeeProfileOpen && (
  <p className="mt-2 text-sm text-white/50">
    {selectedEmployeeProfile.role}
  </p>
)}
    </div>

    <div className="flex flex-wrap items-center justify-end gap-2">
  <span className="rounded-full border border-purple-400/20 px-3 py-1 text-xs text-purple-300">
    Active profile
  </span>

  <button
    type="button"
    onClick={() => setIsEmployeeProfileOpen(!isEmployeeProfileOpen)}
    className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50 hover:bg-white/[0.04] hover:text-white"
  >
    {isEmployeeProfileOpen ? "Hide profile" : "Show profile"}
  </button>
</div>
  </div>
  
{isEmployeeProfileOpen && (
  <div className="mt-6 grid gap-4 md:grid-cols-3">
    <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
      <p className="text-sm text-white/40">Current focus</p>
      <p className="mt-2 text-sm leading-6 text-white/70">
        {selectedEmployeeProfile.focus}
      </p>
    </div>

    <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
      <p className="text-sm text-white/40">Best for</p>
      <p className="mt-2 text-sm leading-6 text-white/70">
        {selectedEmployeeProfile.bestFor}
      </p>
    </div>

    <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
      <p className="text-sm text-white/40">Skills</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {selectedEmployeeProfile.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/60"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  </div>
)}

{!isEmployeeProfileOpen && (
  <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-5 text-sm text-white/50">
    Profile hidden. Click “Show profile” to view role details.
  </div>
)}
</section>
      </div>
    </main>
  );
}