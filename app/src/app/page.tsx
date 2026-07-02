export default function Home() {
  const employees = [
  {
    name: "Project Manager",
    role: "Coordinates the entire company",
    status: "Ready",
  },
  {
    name: "Researcher",
    role: "Finds information and market insights",
    status: "Ready",
  },
  {
    name: "Writer",
    role: "Creates content, emails and documentation",
    status: "Ready",
  },
  {
    name: "QA",
    role: "Tests everything before release",
    status: "Ready",
  },
];
  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
          Project Zero · AI Company OS
        </div>

        <h1 className="max-w-4xl text-5xl font-bold tracking-tight sm:text-7xl">
          Build an AI Company.
Not another workflow.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-white/60 sm:text-xl">
          Build an AI company made of digital employees that research, write,
          review, and execute work for your business.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <button className="rounded-full bg-white px-8 py-3 font-semibold text-black">
            Start building
          </button>
          <button className="rounded-full border border-white/15 px-8 py-3 font-semibold text-white">
            View employees
          </button>
        </div>

        <div className="mt-16 grid w-full gap-4 sm:grid-cols-4">
         {employees.map((employee) => (
            <div
              key={employee.name}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left"
            >
              <div className="mb-3 h-3 w-3 rounded-full bg-green-400" />
              <h3 className="font-semibold">{employee.name}</h3>
              <p className="mt-2 text-sm text-white/50">
                {employee.role}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-24 w-full">
  <h2 className="mb-10 text-center text-4xl font-bold">
    Your AI Company
  </h2>

  <div className="grid gap-6 md:grid-cols-3">
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-xl font-semibold">AI Employees</h3>
      <p className="mt-3 text-white/60">
        Hire specialists like Writers, Developers, Designers and Researchers.
      </p>
    </div>

    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-xl font-semibold">Shared Memory</h3>
      <p className="mt-3 text-white/60">
        Every employee remembers your company, projects and previous work.
      </p>
    </div>

    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-xl font-semibold">Works Together</h3>
      <p className="mt-3 text-white/60">
        Employees collaborate automatically instead of working alone.
      </p>
    </div>
  </div>
 <div className="mt-24 w-full rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-left shadow-2xl">
  <div className="mb-8 flex items-center justify-between">
    <div>
      <p className="text-sm text-white/40">Live Company Dashboard</p>
      <h2 className="mt-2 text-3xl font-bold">Your company is working.</h2>
    </div>

    <div className="rounded-full border border-green-400/20 bg-green-400/10 px-4 py-2 text-sm text-green-300">
      Online
    </div>
  </div>

  <div className="grid gap-4 md:grid-cols-2">
    <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Researcher</h3>
        <span className="text-sm text-green-300">Working</span>
      </div>
      <p className="mt-3 text-sm text-white/50">
        Finding competitor information and market opportunities.
      </p>
    </div>

    <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Writer</h3>
        <span className="text-sm text-yellow-300">Drafting</span>
      </div>
      <p className="mt-3 text-sm text-white/50">
        Turning research into clear content for your business.
      </p>
    </div>

    <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">QA</h3>
        <span className="text-sm text-white/40">Waiting</span>
      </div>
      <p className="mt-3 text-sm text-white/50">
        Ready to review quality before anything is delivered.
      </p>
    </div>

    <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">CEO</h3>
        <span className="text-sm text-blue-300">Reviewing</span>
      </div>
      <p className="mt-3 text-sm text-white/50">
        You stay in control while the AI company does the work.
      </p>
    </div>
  </div>
</div> 
</div>
      </section>
    </main>
  );
}