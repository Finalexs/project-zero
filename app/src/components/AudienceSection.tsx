export default function AudienceSection() {
  return (
    <div className="mt-24 w-full rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-left">
      <div className="text-center">
        <p className="text-sm text-blue-300/70">Who it is for</p>
        <h2 className="mt-3 text-4xl font-bold tracking-tight">
          Built for people who need a team before they can hire one.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/55">
          Project Zero is for founders, small businesses, builders, and agencies
          that want useful automation without complicated workflow chains.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
          <p className="text-2xl">🚀</p>
          <h3 className="mt-4 font-semibold">New founders</h3>
          <p className="mt-2 text-sm text-white/50">
            Turn ideas into research, tasks, plans, copy, and next steps.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
          <p className="text-2xl">🏪</p>
          <h3 className="mt-4 font-semibold">Small businesses</h3>
          <p className="mt-2 text-sm text-white/50">
            Get help with marketing, sales, customer replies, and operations.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
          <p className="text-2xl">🧠</p>
          <h3 className="mt-4 font-semibold">Builders</h3>
          <p className="mt-2 text-sm text-white/50">
            Use Builder Mode for tools, memory, triggers, and advanced control.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
          <p className="text-2xl">📈</p>
          <h3 className="mt-4 font-semibold">Agencies</h3>
          <p className="mt-2 text-sm text-white/50">
            Create repeatable AI work systems for client projects.
          </p>
        </div>
      </div>
    </div>
  );
}