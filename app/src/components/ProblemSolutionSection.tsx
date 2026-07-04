export default function ProblemSolutionSection() {
  return (
    <div className="mt-24 w-full rounded-3xl border border-purple-400/20 bg-purple-400/[0.03] p-8 text-left">
      <div className="text-center">
        <p className="text-sm text-purple-300/70">The problem</p>
        <h2 className="mt-3 text-4xl font-bold tracking-tight">
          Automation is powerful, but most people never get past the setup.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/55">
          Project Zero is built for people who want outcomes, not a confusing
          wall of triggers, nodes, APIs, and broken workflow chains.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-red-400/20 bg-red-400/[0.03] p-6">
          <p className="text-sm text-red-300/70">Old way</p>
          <h3 className="mt-3 text-2xl font-semibold">
            Build workflows before work happens.
          </h3>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
              <p className="font-semibold">Too technical</p>
              <p className="mt-2 text-sm text-white/50">
                Users need to understand triggers, actions, conditions, APIs,
                and data mapping.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
              <p className="font-semibold">Hard to explain</p>
              <p className="mt-2 text-sm text-white/50">
                Workflow chains become difficult to understand, especially when
                something breaks.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
              <p className="font-semibold">Not business-first</p>
              <p className="mt-2 text-sm text-white/50">
                The user has to think like a system builder before getting a
                useful business result.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-green-400/20 bg-green-400/[0.03] p-6">
          <p className="text-sm text-green-300/70">Project Zero way</p>
          <h3 className="mt-3 text-2xl font-semibold">
            Give goals to an AI company.
          </h3>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
              <p className="font-semibold">Business goal first</p>
              <p className="mt-2 text-sm text-white/50">
                Start with what you want done: marketing, sales, research,
                support, planning, or operations.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
              <p className="font-semibold">AI employees do the work</p>
              <p className="mt-2 text-sm text-white/50">
                Project Manager, Researcher, Writer, Designer, QA, and Sales Rep
                each handle their own part.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
              <p className="font-semibold">Humans stay in control</p>
              <p className="mt-2 text-sm text-white/50">
                Review outputs, approve actions, request changes, and track
                progress before anything important happens.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}