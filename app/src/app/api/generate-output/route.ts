import { NextResponse } from "next/server";

type GenerateOutputBody = {
  task?: string;
  employee?: string;
  businessName?: string;
  industry?: string;
  targetCustomer?: string;
  mainGoal?: string;
};

function createBusinessContext(body: GenerateOutputBody) {
  return {
    task: body.task?.trim() || "Untitled task",
    employee: body.employee?.trim() || "Project Manager",
    businessName: body.businessName?.trim() || "Project Zero",
    industry: body.industry?.trim() || "AI software",
    targetCustomer:
      body.targetCustomer?.trim() || "founders and small business owners",
    mainGoal: body.mainGoal?.trim() || "help businesses automate work",
  };
}

function createOutput(body: GenerateOutputBody) {
  const { task, employee, businessName, industry, targetCustomer, mainGoal } =
    createBusinessContext(body);

  const lowerTask = task.toLowerCase();

  if (lowerTask.includes("marketing campaign")) {
    return `Project Manager mission output for ${businessName}

Mission: ${task}

Business context:
- Industry: ${industry}
- Target customer: ${targetCustomer}
- Main goal: ${mainGoal}

Campaign objective:
Create a clear campaign that turns attention into action. The campaign should make ${targetCustomer} understand the problem, trust the offer, and take the next step.

Core campaign angle:
Most ${targetCustomer} do not need more random tools. They need a simple system that turns business goals into organized work, drafts, research, and review-ready outputs.

7-day campaign plan:
Day 1 — Positioning
- Define the main pain point.
- Write the campaign promise.
- Choose one clear call to action.

Day 2 — Offer clarity
- Explain what ${businessName} does in one sentence.
- Write 3 benefit angles.
- Write 3 objection-handling points.

Day 3 — Content engine
- Create 5 short posts.
- Create 3 longer educational posts.
- Create 2 proof-style posts showing how the system works.

Day 4 — Landing page improvement
- Rewrite headline.
- Improve CTA.
- Add trust section and simple workflow explanation.

Day 5 — Outreach
- Create cold message.
- Create follow-up message.
- Create short DM version.

Day 6 — Review and polish
- Check if the message is simple.
- Remove vague AI buzzwords.
- Make the offer feel practical and useful.

Day 7 — Launch
- Publish content.
- Send outreach.
- Track replies, clicks, and objections.

Review checklist:
- Does the campaign explain the problem?
- Does it show why ${businessName} is useful?
- Does it make the next step obvious?
- Does it sound like a real business, not a generic AI tool?

Next actions:
1. Approve this campaign direction.
2. Ask Writer to create the posts.
3. Ask Sales Rep to create outreach.
4. Ask QA to review the final campaign before launch.`;
  }

  if (lowerTask.includes("competitor intelligence")) {
    return `Researcher mission output for ${businessName}

Mission: ${task}

Business context:
- Industry: ${industry}
- Target customer: ${targetCustomer}
- Main goal: ${mainGoal}

Research objective:
Understand the competitive landscape and find a sharp positioning angle for ${businessName}.

Competitor categories to analyze:
1. AI chat tools
2. Automation platforms
3. Workflow builders
4. AI writing tools
5. Business productivity dashboards

What to compare:
- Positioning
- Pricing
- Ease of use
- Setup complexity
- Integrations
- AI quality
- Target customer
- Weaknesses
- Opportunity for ${businessName}

Likely market gap:
Many tools are powerful but too technical. Normal users do not want to connect APIs, build workflows, manage prompts, or understand automation logic. They want outcomes.

Positioning opportunity:
${businessName} can position itself as an AI company dashboard where users assign business missions to AI employees and review the work in one place.

Competitive angle:
Instead of saying “build automations,” say:
“Turn business goals into organized work with AI employees.”

Key differentiator:
- ChatGPT gives answers.
- Automation tools require setup.
- ${businessName} gives a structured work dashboard with employees, tasks, outputs, memory, approval, and regeneration.

Research questions to answer next:
1. Which competitor has the clearest onboarding?
2. Which competitor has the best pricing model?
3. Which competitor is too technical for normal users?
4. Which features users repeatedly complain about?
5. What would make ${targetCustomer} switch?

Recommended next actions:
1. Create a competitor table with 5 real competitors.
2. Score each competitor from 1–10.
3. Identify the strongest landing page promise.
4. Create a Project Zero comparison section for the landing page.`;
  }

  if (lowerTask.includes("outbound sales")) {
    return `Sales Rep mission output for ${businessName}

Mission: ${task}

Business context:
- Industry: ${industry}
- Target customer: ${targetCustomer}
- Main goal: ${mainGoal}

Sales objective:
Start conversations with ${targetCustomer} who need more output but do not want complicated automation setup.

Customer pain angle:
Most small teams want more marketing, sales, content, research, and planning done, but hiring is expensive and automation tools can feel too technical.

Main offer angle:
${businessName} gives them AI employees that turn business goals into organized tasks, drafts, and review-ready outputs.

Cold email 1 — Simple pain angle:
Subject: quick idea for your workflow

Hey,

I’m building ${businessName}, an AI company dashboard for ${targetCustomer}.

The idea is simple: instead of just chatting with AI, you assign tasks to AI employees like a writer, researcher, sales rep, designer, or project manager — then review the outputs in one dashboard.

Could this be useful for your team?

Cold email 2 — Output angle:
Subject: more business output without hiring?

Hey,

Quick question — are you trying to create more content, research, emails, or campaign work without hiring more people?

I’m building ${businessName}, where AI employees help turn business goals into organized drafts and tasks.

Would you be open to giving quick feedback?

Cold email 3 — Automation pain angle:
Subject: automation without the setup headache

Hey,

A lot of automation tools are powerful, but they still require setup, workflows, and technical thinking.

${businessName} is different: you give a business goal, choose an AI employee, and review the output.

Would this be useful for your business?

Follow-up 1:
Just wanted to follow up — I’m not trying to sell a finished product yet. I’m looking for honest feedback from ${targetCustomer}.

Would you use something like this if it saved time on business tasks?

Follow-up 2:
No worries if not. If you had an AI employee dashboard, what would you want it to do first: content, sales emails, research, planning, or something else?

Objection handling:
- “I can use ChatGPT” → Yes, but ${businessName} organizes work into employees, tasks, memory, outputs, and approvals.
- “Automation is complicated” → The goal is to hide the technical setup.
- “I don’t trust AI output” → That’s why every output is reviewable before use.

Next actions:
1. Pick one target niche.
2. Send 20 test messages.
3. Track replies and objections.
4. Improve the landing page based on feedback.`;
  }

  if (lowerTask.includes("website conversion")) {
    return `Writer + QA mission output for ${businessName}

Mission: ${task}

Business context:
- Industry: ${industry}
- Target customer: ${targetCustomer}
- Main goal: ${mainGoal}

Conversion objective:
Make the website instantly explain why ${businessName} matters and why it is different from just using ChatGPT.

Current conversion risk:
If the page only says “AI tasks” or “AI employees,” users may think it is just another wrapper around ChatGPT.

Stronger homepage structure:
1. Hero headline
2. Clear problem
3. Product explanation
4. Workflow demo
5. Use cases
6. Trust/controls
7. CTA

Recommended hero:
AI shouldn’t just answer.
It should get work done.

Supporting text:
Use AI employees to turn business goals into tasks, drafts, research, and review-ready outputs — all inside one dashboard.

Key value points:
- Assign work to AI employees
- Keep business context saved
- Review outputs before using them
- Regenerate or request changes
- Track tasks and progress
- Avoid complicated workflow setup

Objections to answer:
1. “Why not just use ChatGPT?”
Answer: ChatGPT is a conversation. ${businessName} is a work system with tasks, memory, outputs, approvals, and roles.

2. “Is this too technical?”
Answer: Founder Mode keeps it simple. Builder Mode gives advanced controls later.

3. “Can I trust the output?”
Answer: Every output is reviewable, editable, and can be regenerated.

CTA ideas:
- Start your AI company
- Create your first AI employee
- Turn a goal into work
- Launch your first AI mission

Landing page improvement checklist:
- Clear headline in 5 seconds
- One obvious CTA
- Demo screenshot above the fold
- Show Founder Mode vs Builder Mode
- Show real output cards
- Add mission templates
- Remove vague buzzwords

Next actions:
1. Update hero section.
2. Add mission examples.
3. Add “Why not just ChatGPT?” section.
4. Add screenshot of dashboard output flow.`;
  }

  if (lowerTask.includes("brand direction")) {
    return `Designer mission output for ${businessName}

Mission: ${task}

Business context:
- Industry: ${industry}
- Target customer: ${targetCustomer}
- Main goal: ${mainGoal}

Brand goal:
Make ${businessName} feel like a premium AI operating system, not a cheap AI wrapper.

Brand personality:
- Sharp
- Dark
- Futuristic
- Controlled
- Founder-focused
- Serious but simple

Visual direction:
Use a dark interface with glowing accent colors, rounded cards, clear hierarchy, and dashboard-style sections. The product should feel like a command center.

Suggested color direction:
- Base: black / near-black
- Primary accent: electric blue
- Secondary accent: purple
- Success accent: green
- Warning accent: amber
- Error accent: red

UI style:
- Large confident headings
- Soft borders
- Low-opacity cards
- Clean badges
- Clear action buttons
- Minimal clutter
- Dashboard-first layout

Brand language:
Avoid:
- “AI chatbot”
- “simple AI tool”
- “automate everything instantly”
- “magic”

Use:
- “AI company dashboard”
- “AI employees”
- “review-ready work”
- “business missions”
- “Founder Mode”
- “Builder Mode”
- “turn goals into work”

Brand promise:
${businessName} turns business goals into organized work using AI employees.

Homepage vibe:
The user should feel like they are entering a control room for their business.

Next actions:
1. Update quick start templates into AI missions.
2. Add stronger dashboard visuals.
3. Create a “Why this is not just ChatGPT” section.
4. Add premium badges for Founder Mode and Builder Mode.`;
  }

  if (lowerTask.includes("business growth plan")) {
    return `Project Manager mission output for ${businessName}

Mission: ${task}

Business context:
- Industry: ${industry}
- Target customer: ${targetCustomer}
- Main goal: ${mainGoal}

Growth objective:
Turn the current business goal into a practical execution plan with clear priorities.

Main growth direction:
Focus on proving that ${targetCustomer} actually want an AI employee dashboard that saves time and creates useful outputs.

Phase 1 — Validate the pain
Goal: Confirm the problem is real.
Tasks:
- Talk to 10 potential users.
- Ask what business tasks they hate doing.
- Ask what they already use AI for.
- Ask why existing tools are not enough.

Phase 2 — Improve the product promise
Goal: Make the value obvious.
Tasks:
- Explain why this is better than plain ChatGPT.
- Show 3 strong use cases.
- Add mission templates.
- Add business memory.
- Add approval/regeneration flow.

Phase 3 — Build useful workflows
Goal: Create actual repeatable outcomes.
Tasks:
- Marketing campaign workflow
- Sales outreach workflow
- Competitor research workflow
- Landing page review workflow
- Content engine workflow

Phase 4 — Test private beta
Goal: Get real feedback.
Tasks:
- Invite 5–20 testers.
- Watch where they get confused.
- Track what missions they use.
- Improve the highest-value workflow.

Phase 5 — Monetize carefully
Goal: Charge without burning API cost.
Tasks:
- Add credits.
- Add plan limits.
- Add usage tracking.
- Add paid plan only after value is clear.

Priority list:
1. Finish user-owned data.
2. Improve AI mission outputs.
3. Add real AI model router.
4. Add usage credits.
5. Add private beta onboarding.

Next action:
Ask Project Manager to turn this plan into weekly tasks.`;
  }

  return `${employee} mission output for ${businessName}

Mission: ${task}

Business context:
- Industry: ${industry}
- Target customer: ${targetCustomer}
- Main goal: ${mainGoal}

Executive summary:
This mission should turn the user’s business goal into a clear, reviewable deliverable. The output should be practical, organized, and ready for approval.

Work plan:
1. Understand the business context.
2. Identify the real goal behind the task.
3. Create a useful first draft.
4. Add clear next actions.
5. Prepare the result for review.

Recommended output:
- Clear summary
- Practical steps
- Specific recommendations
- Review checklist
- Next actions

Quality checklist:
- Is it useful without extra explanation?
- Is it specific to ${businessName}?
- Does it help ${targetCustomer}?
- Does it support the goal: ${mainGoal}?

Next actions:
1. Review this output.
2. Approve it, request changes, or regenerate.
3. Turn approved output into the next task.`;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as GenerateOutputBody;

    const task = body.task?.trim() || "Untitled task";
    const employee = body.employee?.trim() || "Project Manager";

    const content = createOutput({
      ...body,
      task,
      employee,
    });

    return NextResponse.json({
      employee,
      title: `${employee} output for: ${task}`,
      status: "Draft",
      content,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Could not generate output." },
      { status: 500 }
    );
  }
}