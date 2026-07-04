export default function FinalCtaSection() {
  return (
    <div className="mt-24 w-full rounded-3xl border border-blue-400/20 bg-blue-400/[0.04] p-8 text-center">
      <p className="text-sm text-blue-300/70">Start building</p>

      <h2 className="mx-auto mt-3 max-w-3xl text-4xl font-bold tracking-tight">
        Build your first AI company before hiring your first team.
      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-white/55">
        Create employees, assign tasks, review outputs, and turn your business
        goals into organized work from one command center.
      </p>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href="/dashboard"
          className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90"
        >
          Open dashboard
        </a>

        <a
          href="#waitlist"
          className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white/70 hover:bg-white/[0.04] hover:text-white"
        >
          Join waitlist
        </a>
      </div>
    </div>
  );
}