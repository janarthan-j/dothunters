// Placeholder content — replace entries marked TODO(content) with real data before launch.

export const remotePrinciples = [
  { icon: "Globe",    title: "Async-first",         text: "Work keeps moving across time zones without waiting on meetings." },
  { icon: "FileText", title: "Written by default",  text: "Decisions, specs and updates are documented, so nothing lives only in someone's head." },
  { icon: "Clock",    title: "Real overlap hours",  text: "Guaranteed daily overlap with your working hours for live calls and quick decisions." }, // TODO(content)
  { icon: "Target",   title: "Outcomes over hours", text: "We measure shipped, working software — not time spent online." },
];

export const tools = ["Slack", "WhatsApp", "GitHub", "Figma", "Notion", "Google Meet"]; // TODO(content)

// TODO(content): add remaining team members
export const team = [
  { slug: "janarthan-j",   name: "Janarthan J",   role: "Founder & Lead Engineer", disciplines: ["Web", "AI/ML", "Architecture"], photo: "/images/team/janarthan.jpg", photoPosition: "center top" },
  { slug: "b-ranjith",     name: "B. Ranjith",    role: "ML Engineer",             disciplines: ["Vision AI", "Edge Devices"], photo: "/images/team/b-ranjith.jpeg" },
  { slug: "santhirakumar-sathurjan", name: "Santhirakumar Sathurjan", role: "Junior Software Engineer", disciplines: ["Web", "Full Stack"], photo: "/images/team/santhirakumar-sathurjan.jpeg" }, // TODO(content): confirm disciplines
];

export const squadExample = {
  project: "EdgeCam",
  slug: "edgecam",
  mix: ["Vision AI", "Mobile App", "Hardware Integration", "UI/UX"],
};

// TODO(content): confirm commitments
export const reach = [
  { value: "24h", label: "First reply, guaranteed" },
  { value: "4h",  label: "Critical issue response" },
  { value: "1",   label: "Named point of contact" },
  { value: "5h",  label: "Daily overlap, minimum" },
];

export const reachChannels = ["Email", "WhatsApp", "Phone", "Shared Slack channel"];

export const visitSteps = [
  { title: "Discovery workshop",    text: "We come to you to map workflows with the people who will actually use the product." },
  { title: "Site survey & install", text: "For hardware and vision projects we survey, install and calibrate on location." },
  { title: "On-site training",      text: "Hands-on sessions so your team is confident from day one." },
  { title: "Go-live support",       text: "We're on the ground — or on call — through launch week." },
];

export const visitNote = "On-site visits available across the region; further afield on request."; // TODO(content)

export const productionChecklist = [
  { icon: "GitBranch",   title: "CI/CD from day one",  text: "Automated builds and deploys — no manual release rituals." },
  { icon: "ShieldCheck", title: "Reviewed & tested",   text: "Every change is code-reviewed and QA'd before it ships." },
  { icon: "Activity",    title: "Monitored",           text: "Logging, error tracking and uptime alerts configured at launch." },
  { icon: "Lock",        title: "Secure by default",   text: "Auth, secrets handling and dependency hygiene baked in." },
  { icon: "BookOpen",    title: "Documented handover", text: "Runbooks, credentials and source code handed over — you own it all." },
  { icon: "LifeBuoy",    title: "Post-launch support", text: "A 60-day support window to squash anything the real world uncovers." }, // TODO(content)
];
