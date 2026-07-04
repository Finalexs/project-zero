export default function LaunchPlanSection() {
  return (
    <div className="mt-24 w-full rounded-3xl border border-blue-400/20 bg-blue-400/[0.03] p-8 text-left">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm text-blue-300/70">Launch plan</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight">
            From MVP to full AI Company OS.
          </h2>
          <p className="mt-4 max-w-2xl text-white/55">
            Project Zero is being built step by step: first the command center,
            then real AI employee work, then integrations, automation, and a
            marketplace of specialized employees.
          </p>
        </div>

        <div className="rounded-full border border-blue-400/20 bg-blue-400/[0.04] px-5 py-3 text-sm font-semibold text-blue-300">
          Building in public
        </div>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
          <p className="text-sm text-blue-300/70">Now</p>
          <h3 className="mt-3 text-xl font-semibold">MVP command center</h3>
          <p className="mt-3 text-sm leading-6 text-white/50">
            Homepage, waitlist, dashboard, business profile, tasks, outputs,
            memory, and company health score.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
          <p className="text-sm text-blue-300/70">Next</p>
          <h3 className="mt-3 text-xl font-semibold">
            Real AI employee outputs
          </h3>
          <p className="mt-3 text-sm leading-6 text-white/50">
            Employees will generate plans, drafts, research, reviews, and task
            results from user commands.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
          <p className="text-sm text-blue-300/70">After</p>
          <h3 className="mt-3 text-xl font-semibold">Tools and integrations</h3>
          <p className="mt-3 text-sm leading-6 text-white/50">
            Connect email, calendars, files, forms, CRMs, webhooks, and business
            tools with human approval.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
          <p className="text-sm text-blue-300/70">Future</p>
          <h3 className="mt-3 text-xl font-semibold">
            AI company marketplace
          </h3>
          <p className="mt-3 text-sm leading-6 text-white/50">
            Hire specialized AI employees like Sales Rep, SEO Specialist,
            Support Agent, Designer, and Developer.
          </p>
        </div>
      </div>
    </div>
  );
}