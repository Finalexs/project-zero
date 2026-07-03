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
  const [tasks, setTasks] = useState(initialTasks);
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  const [taskError, setTaskError] = useState("");
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
  const completedTasks = tasks.filter(
  (task) => task.status === "Completed",
).length;

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
          <p className="text-sm text-blue-300/70">Dashboard</p>
          <h1 className="mt-2 text-5xl font-bold">
            Your AI company is running.
          </h1>
          <p className="mt-4 max-w-2xl text-white/60">
            Manage employees, assign tasks, track progress and review results
            from one command center.
          </p>
        </section>
<section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
  <p className="text-sm text-white/40">Give your company a task</p>

  <div className="mt-4 flex flex-col gap-3 md:flex-row">
    <input
  type="text"
  value={taskInput}
  onChange={(event) => setTaskInput(event.target.value)}
  placeholder="Example: Research competitors and write 5 cold emails..."
  className="flex-1 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none placeholder:text-white/30"
/>

    <button
  type="button"
  onClick={async () => {
  if (!taskInput) return;

  const newTask = {
    title: taskInput,
    employee: "Project Manager",
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
  setTaskInput("");
}}
  className="rounded-2xl bg-white px-6 py-3 font-semibold text-black"
>
  Assign task
</button>
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
    <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
      <p className="text-sm text-white/70">
        Project Manager created a new task queue.
      </p>
      <p className="mt-1 text-xs text-white/30">Just now</p>
    </div>

    <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
      <p className="text-sm text-white/70">
        Researcher started analyzing competitor positioning.
      </p>
      <p className="mt-1 text-xs text-white/30">2 minutes ago</p>
    </div>

    <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
      <p className="text-sm text-white/70">
        Writer prepared first draft ideas for review.
      </p>
      <p className="mt-1 text-xs text-white/30">5 minutes ago</p>
    </div>
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