import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const task = body.task ?? "Untitled task";
    const employee = body.employee ?? "Project Manager";
    const businessName = body.businessName ?? "Project Zero";
    const industry = body.industry ?? "AI software";
    const targetCustomer = body.targetCustomer ?? "founders and small businesses";
    const mainGoal = body.mainGoal ?? "help businesses automate work";

    let content = "";

    if (employee === "Researcher") {
      content = `Researcher output for ${businessName}:

Task: ${task}

Research plan:
1. Find 5 competitors in ${industry}.
2. Study what problems ${targetCustomer} are trying to solve.
3. Compare pricing, positioning, and main features.
4. Look for customer complaints and missing features.
5. Turn the findings into clear next steps.

Main goal:
${mainGoal}`;
    } else if (employee === "Writer") {
      content = `Writer output for ${businessName}:

Task: ${task}

Draft idea:
${businessName} helps ${targetCustomer} turn business goals into organized tasks, drafts, research, and outputs without complicated workflow setup.

CTA ideas:
- Start building
- Open your AI company
- Join the waitlist

Main goal:
${mainGoal}`;
    } else if (employee === "Sales Rep") {
      content = `Sales Rep output for ${businessName}:

Task: ${task}

Sales angle:
Most small teams want more output, but hiring is expensive and automation tools feel too technical.

Cold message draft:
Hey, I’m building ${businessName}, an AI company dashboard for ${targetCustomer}. It helps turn business goals into tasks, drafts, research, and reviewable outputs. Would you be open to giving quick feedback?`;
    } else {
      content = `${employee} output for ${businessName}:

Task: ${task}

Plan:
1. Understand the business goal.
2. Create a useful first draft.
3. Review the result.
4. Improve it if needed.
5. Prepare it for approval.

Business context:
- Industry: ${industry}
- Target customer: ${targetCustomer}
- Main goal: ${mainGoal}`;
    }

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
      { status: 500 },
    );
  }
}