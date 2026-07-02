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
    status: "Working",
  },
  {
    name: "Writer",
    role: "Creates content, emails and documentation",
    status: "Drafting",
  },
  {
    name: "QA",
    role: "Tests everything before release",
    status: "Waiting",
  },
  {
    name: "Designer",
    role: "Creates visuals, layouts and brand assets",
    status: "Ready",
  },
  {
    name: "Developer",
    role: "Builds software, tools and automations",
    status: "Ready",
  },
  {
    name: "SEO Specialist",
    role: "Finds keywords and improves search traffic",
    status: "Ready",
  },
  {
    name: "Sales Rep",
    role: "Finds leads and drafts outreach messages",
    status: "Ready",
  },
];
  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <section className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center px-6 pb-24 pt-36 text-center">
    <div className="pointer-events-none absolute left-1/2 top-24 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />
  <nav className="absolute top-6 flex w-full items-center justify-between rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm backdrop-blur-md">
  <div className="font-semibold">Project Zero</div>

  <div className="hidden gap-6 text-white/60 md:flex">
    <a href="#employees" className="hover:text-white">
      Employees
    </a>
    <a href="#dashboard" className="hover:text-white">
      Dashboard
    </a>
    <a href="#pricing" className="hover:text-white">
      Pricing
    </a>
  </div>

  <button className="rounded-full bg-white px-4 py-2 font-semibold text-black">
    Join waitlist
  </button>
</nav>      
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

        <div className="mt-16 grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
        <div id="employees" className="mt-24 w-full">
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
 <div id="dashboard" className="mt-24 w-full rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-left shadow-2xl">
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
</div><div className="mt-24 w-full">
  <p className="text-sm text-white/40">How it works</p>
  <h2 className="mt-2 text-4xl font-bold">From idea to finished work.</h2>

  <div className="mt-10 grid gap-4 md:grid-cols-4">
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left">
      <div className="mb-4 text-3xl font-bold text-white/30">01</div>
      <h3 className="font-semibold">Hire employees</h3>
      <p className="mt-2 text-sm text-white/50">
        Start with a ready-made AI team for your business.
      </p>
    </div>

    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left">
      <div className="mb-4 text-3xl font-bold text-white/30">02</div>
      <h3 className="font-semibold">Give a goal</h3>
      <p className="mt-2 text-sm text-white/50">
        Tell your company what you want done in normal language.
      </p>
    </div>

    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left">
      <div className="mb-4 text-3xl font-bold text-white/30">03</div>
      <h3 className="font-semibold">Employees collaborate</h3>
      <p className="mt-2 text-sm text-white/50">
        Researcher, Writer, QA and CEO hand work between each other.
      </p>
    </div>

    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left">
      <div className="mb-4 text-3xl font-bold text-white/30">04</div>
      <h3 className="font-semibold">Review the result</h3>
      <p className="mt-2 text-sm text-white/50">
        You stay in control before anything is delivered or published.
      </p>
    </div>
  </div>
</div>
<div id="pricing" className="mt-24 w-full rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center">
  <p className="text-sm text-white/40">Pricing</p>
  <h2 className="mt-2 text-4xl font-bold">Start with your first AI team.</h2>
  <p className="mx-auto mt-4 max-w-2xl text-white/60">
    Project Zero will begin with a simple subscription that gives small businesses access to a ready-made AI company.
  </p>

  <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-white/10 bg-black/40 p-6">
    <h3 className="text-2xl font-bold">Starter Company</h3>
    <p className="mt-2 text-white/50">Project Manager, Researcher, Writer, and QA included.</p>
    <div className="mt-6 text-4xl font-bold">€29</div>
    <p className="mt-1 text-sm text-white/40">per month</p>
  </div>
</div>
<div className="mt-24 w-full rounded-3xl border border-blue-400/20 bg-blue-400/[0.04] p-8 text-center">
  <p className="text-sm text-blue-300/70">Private beta</p>

  <h2 className="mt-2 text-4xl font-bold">
    Be first to build your AI company.
  </h2>

  <p className="mx-auto mt-4 max-w-2xl text-white/60">
    Join the waitlist and get early access when Project Zero is ready for its first testers.
  </p>

  <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
    <input
      type="email"
      placeholder="Enter your email"
      className="flex-1 rounded-full border border-white/10 bg-black/40 px-5 py-3 text-white outline-none placeholder:text-white/30"
    />

    <button className="rounded-full bg-white px-6 py-3 font-semibold text-black">
      Join waitlist
    </button>
  </div>

  <p className="mt-4 text-xs text-white/30">
    No spam. Just progress updates and beta access.
  </p>
</div>
<footer className="mt-24 w-full border-t border-white/10 py-10 text-center text-sm text-white/40">
  <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
    <p>© 2026 Project Zero. Built to help people run AI companies.</p>

    <div className="flex gap-6">
      <a href="#employees" className="hover:text-white">
        Employees
      </a>
      <a href="#dashboard" className="hover:text-white">
        Dashboard
      </a>
      <a href="#pricing" className="hover:text-white">
        Pricing
      </a>
    </div>
  </div>
</footer>
      </section>
    </main>
  );
}