export const projectFlow = [
  { title: "Discover",         text: "We map your goals, users and constraints before writing a line of code." },
  { title: "Plan",             text: "Senior engineers set the architecture, scope and milestones." },
  { title: "Build",            text: "Developers build in pairs, with seniors reviewing every step." },
  { title: "Review & test",    text: "Every change is code-reviewed and tested before it reaches you." },
  { title: "Launch & support", text: "We ship, monitor and support you for up to a year." },
];

export const mentorship = [
  { icon: "GraduationCap", title: "Learning sessions",   text: "Regular sessions where the team shares tools, techniques and lessons from live projects." },
  { icon: "Wrench",        title: "Hands-on experience", text: "Everyone works on real client projects from the start, with a senior close by." },
  { icon: "FlaskConical",  title: "Trial projects",      text: "New skills are tested on internal builds first, so client work only gets proven approaches." },
  { icon: "Users",         title: "Team collaboration",  text: "Design, engineering and AI work side by side, so problems are solved together, not handed off." },
];

// TODO(content): add education for remaining team members
export const team = [
  { slug: "janarthan-j",   name: "Janarthan J",   role: "Founder & Lead Engineer", disciplines: ["Web", "AI/ML", "Architecture"], education: "B.Sc. (Hons) in IT", photo: "/images/team/janarthan.jpg", photoPosition: "center top" },
  { slug: "b-ranjith",     name: "B. Ranjith",    role: "ML Engineer",             disciplines: ["Vision AI", "Edge Devices"], photo: "/images/team/b-ranjith.jpeg" },
  { slug: "thamilini-ramakrishna", name: "Thamilini Ramakrishna", role: "Senior Software Engineer", disciplines: ["ReactJS", "Frontend"], photo: "/images/team/thamilini.jpeg", photoPosition: "center 25%" },
  { slug: "santhirakumar-sathurjan", name: "Santhirakumar Sathurjan", role: "Junior Software Engineer", disciplines: ["Web", "Full Stack"], photo: "/images/team/santhirakumar-sathurjan.jpeg" },
];

export const values = [
  { title: "Ship real things",      text: "We build for production, not demos.",                              proof: "CAD Studio: live quotes and bookings",                                slug: "cad-studio-photography" },
  { title: "Get the details right", text: "The small things decide whether software can be trusted.",         proof: "CAD Studio: tax rules by province and bookings that can't double up", slug: "cad-studio-photography" },
  { title: "Stay for the long run", text: "Launch is the start of the relationship, not the end.",            proof: "Limax Medica: maintained for 2+ years",                               slug: "limax-medica" },
  { title: "Test before trust",     text: "Nothing reaches you without being reviewed and tested.",           proof: "CAD Studio: 120 test files",                                          slug: "cad-studio-photography" },
];

export const reach = [
  { value: "1–2h", label: "First reply" },
  { value: "1–2h", label: "Critical issue response" },
  { value: "1",    label: "Named point of contact" },
  { value: "5h",   label: "Daily overlap, minimum" },
];

export const reachChannels = ["Email", "WhatsApp", "Phone"];

export const visitSteps = [
  { title: "Discovery workshop",    text: "We come to you to map workflows with the people who will actually use the product." },
  { title: "Site survey & install", text: "For hardware and vision projects we survey, install and calibrate on location." },
  { title: "On-site training",      text: "Hands-on sessions so your team is confident from day one." },
  { title: "Go-live support",       text: "We're on the ground — or on call — through launch week." },
];

export const visitNote = "On-site visits available anywhere in Sri Lanka.";

export const productionChecklist = [
  { icon: "GitBranch",   title: "CI/CD from day one",  text: "Automated builds and deploys — no manual release rituals." },
  { icon: "ShieldCheck", title: "Reviewed & tested",   text: "Every change is code-reviewed and QA'd before it ships." },
  { icon: "Activity",    title: "Monitored",           text: "Logging, error tracking and uptime alerts configured at launch." },
  { icon: "Lock",        title: "Secure by default",   text: "Auth, secrets handling and dependency hygiene baked in." },
  { icon: "BookOpen",    title: "Documented handover", text: "Runbooks, credentials and source code handed over — you own it all." },
  { icon: "LifeBuoy",    title: "Post-launch support", text: "Up to a year of support after launch, on request, to fix anything the real world uncovers." },
];
