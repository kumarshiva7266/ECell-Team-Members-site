import { db } from "./firebase";
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, getDocs } from "firebase/firestore";

export interface Member {
  id: string;
  name: string;
  role: string;
  domain: string;
  dept: string;
  year: string;
  skills: string[];
  about: string;
  email: string;
  linkedin: string;
  github: string;
  instagram: string;
  portfolio: string;
  img: string;
  achievements: string[];
  projects?: string[];
  certificates?: string[];
  isCore?: boolean;

  // ── Premium Modal Fields ──
  memberSince?: string;
  status?: string;
  location?: string;
  availability?: string;
  resumeUrl?: string;
  responsibilities?: string[];
  roleImpact?: string;
  projectProgresses?: { name: string; progress: number | null }[];
  stats?: { label: string; value: string; icon: string }[];
  leadershipSkills?: string[];
  education?: { degree: string; college: string; dept: string; cgpa: string; gradYear: string };
  interests?: string[];
  favoriteQuote?: string;
  personalWebsite?: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  description: string;
  img: string;
}

// Initial Mock Data
const INITIAL_MEMBERS: Member[] = [
  /* ── Core Section Members ── */
  {
    id: "1",
    name: "M.Rohith Kumar",
    role: "President",
    domain: "Leadership",
    dept: "CSE(AI & ML)",
    year: "4th Year",
    skills: ["Leadership", "Public Speaking", "Strategic Growth", "Incubation Sprints", "Community Building", "Pitch Strategy", "Team Management", "Conflict Resolution", "Stakeholder Management", "Vision Setting", "Negotiation", "Mentorship"],
    about: "Passionate about building high-impact community startup ecosystems and accelerating college innovations. Leading E-Cell's vision and strategic direction across all sub-domains. Connecting student founders with industry mentors, investors, and national accelerators. Driving campus entrepreneurship through flagship events like E-Summit and pitch conclaves. Building a thriving startup culture that transforms ideas into viable ventures.",
    email: "professorrohithkumar@mail.com",
    linkedin: "https://www.linkedin.com/in/rohith-kumar-0643061b4?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    github: "https://github.com",
    instagram: "https://www.instagram.com/ro.hith7802?igsh=ZXpxNm9qeHNxdzUx",
    portfolio: "",
    resumeUrl: "/resume/rohith.pdf",
    img: "/images/rohith.jpeg",
    achievements: ["Hosted national pitch conclaves", "Mentored student ventures", "Grew E-Cell community to 500+", "Secured partnerships with 5 national accelerators"],
    isCore: true,
    memberSince: "July 2024",
    status: "Core Executive Member",
    location: "Hyderabad, Telangana",
    availability: "Available for Collaboration",
    responsibilities: [
      "Lead and oversee all E-Cell operations and sub-domains",
      "Drive the vision, mission, and strategic roadmap of E-Cell",
      "Represent E-Cell at national and regional startup events",
      "Coordinate with faculty, investors, and external partners",
      "Mentor student founders through the incubation pipeline",
      "Chair key events including E-Summit and pitch conclaves",
      "Build and sustain a high-performing leadership team",
      "Ensure alignment across all six sub-domain heads"
    ],
    roleImpact: "The President is the driving force behind E-Cell's vision and culture. By aligning all sub-domains, fostering startup ecosystems, and connecting students with industry mentors and investors, the President transforms the college into a launchpad for the next generation of Indian founders.",
    projectProgresses: [
      { name: "E-Summit 2026 Planning", progress: 80 },
      { name: "National Incubation Partnership", progress: 65 },
      { name: "E-Cell Alumni Network", progress: 45 },
      { name: "Startup Mentorship Program", progress: null }
    ],
    stats: [
      { label: "Events Led", value: "20+", icon: "🎯" },
      { label: "Startups Mentored", value: "15+", icon: "🚀" },
      { label: "Partners Onboarded", value: "10+", icon: "🤝" },
      { label: "Team Size", value: "50+", icon: "👥" },
      { label: "Years in E-Cell", value: "2", icon: "⭐" },
      { label: "Pitch Events Hosted", value: "8", icon: "🎤" }
    ],
    leadershipSkills: ["Visionary Leadership", "Strategic Planning", "Public Speaking", "Stakeholder Management", "Conflict Resolution", "Community Building", "Negotiation", "Mentorship"],
    certificates: ["NSRCEL Startup Leadership", "AICTE Entrepreneurship", "IBM ARTIFICIAL INTELLIGENCE"],
    education: { degree: "B.Tech", college: "Pallavi Engineering College", dept: "CSE(AI & ML)", cgpa: "8.6", gradYear: "2027" },
    interests: ["Startup Ecosystems", "Venture Capital", "Social Entrepreneurship", "Innovation Policy", "Leadership", "Public Policy"],
    favoriteQuote: "Leadership is not about being in charge. It's about taking care of those in your charge.",
    personalWebsite: ""
  },
  {
    id: "2",
    name: "G. Shiv Prasad",
    role: "Web & Tech Lead",
    domain: "Web & Technology",
    dept: "CSE (AI&ML)",
    year: "4th Year",
    skills: ["Next.js", "React", "TypeScript", "Three.js", "Firebase", "Node.js", "TailwindCSS", "Git", "Figma", "Python", "REST API", "GitHub"],
    about: "Technical architect developing full-stack applications, automations, and custom glassmorphism visual nodes. Leading the Web & Technology team in building E-Cell's digital infrastructure. Managing Firebase backends, authentication systems, and event registration portals. Conducting technical workshops and mentoring junior developers in modern web technologies. Ensuring website security, performance, and seamless user experience across all platforms.",
    email: "shiva.cloudray0303@gmail.com",
    linkedin: "https://www.linkedin.com/in/shiv-prasad-99a524346/",
    github: "https://github.com/kumarshiva7266",
    instagram: "https://www.instagram.com/_s.h.i.v.a1/",
    portfolio: "https://shivaportfolio01.vercel.app/",
    resumeUrl: "/resume/shivaprasad.pdf",
    img: "/images/tech.jpeg",
    achievements: ["Developed E-Cell SPA Core and Admin Sync Systems", "Organized 10+ technical workshops", "Built startup registration platform", "Led a team of 4 developers", "Automated event registration process"],
    isCore: true,
    memberSince: "July 2024",
    status: "Core Executive Member",
    location: "Hyderabad, Telangana",
    availability: "Available for Collaboration",
    responsibilities: [
      "Lead the Web & Technology sub-domain team",
      "Develop and maintain the official E-Cell website",
      "Manage Firebase backend, authentication, and databases",
      "Build event registration and recruitment portals",
      "Coordinate and conduct technical workshops",
      "Mentor junior developers in the team",
      "Collaborate with all departments for digital needs",
      "Ensure website security, performance, and uptime"
    ],
    roleImpact: "The Web & Technology Head manages the entire digital infrastructure of E-Cell — developing web platforms, maintaining Firebase backends, supporting event registrations, and enabling seamless collaboration across all departments through cutting-edge technical solutions.",
    projectProgresses: [
      { name: "Official E-Cell Website", progress: 90 },
      { name: "Startup Registration Portal", progress: 75 },
      { name: "Event Management Dashboard", progress: 50 },
      { name: "Recruitment Portal", progress: null }
    ],
    stats: [
      { label: "Projects Built", value: "12+", icon: "💻" },
      { label: "Workshops Conducted", value: "10+", icon: "🛠️" },
      { label: "Team Members Led", value: "4", icon: "👥" },
      { label: "GitHub Contributions", value: "600+", icon: "🐙" },
      { label: "Years in E-Cell", value: "1", icon: "⭐" },
      { label: "Website Visitors", value: "5K+", icon: "🌐" }
    ],
    leadershipSkills: ["Technical Leadership", "Problem Solving", "Innovation", "Project Management", "Team Building", "Communication", "Critical Thinking", "Mentorship"],
    certificates: ["Meta Frontend Developer", "Google Cloud Foundations", "IBM AI Engineering", "AWS Cloud Practitioner"],
    education: { degree: "B.Tech", college: "Pallavi Engineering College", dept: "Computer Science & Engineering – AI & ML", cgpa: "9.1", gradYear: "2026" },
    interests: ["Artificial Intelligence", "Cloud Computing", "Automation", "Startup Ecosystem", "Cyber Security", "Open Source", "UI/UX Design", "Innovation"],
    favoriteQuote: "Innovation begins when ideas meet execution.",
    personalWebsite: ""
  },
  {
    id: "3",
    name: "Anshu Kumar",
    role: "Advisory Committee Member",
    domain: "Advisory Committee",
    dept: "CSE",
    year: "PASSED OUT BATCH 2026",
    skills: ["Mentorship", "Angel Networks", "Strategic Relations", "Business Development", "Investor Relations", "Startup Evaluation", "Financial Analysis", "Networking", "Strategic Planning", "Pitch Evaluation", "Portfolio Management", "Due Diligence"],
    about: "Directing E-Cell frameworks, advising core leaders on growth, and managing long-term venture alignments. Providing strategic advisory support to all E-Cell verticals and leadership team. Connecting student startups with angel investors and national incubation networks. Evaluating startup pitches and providing structured feedback for venture improvement. Building partnerships with accelerators and facilitating alumni-student mentorship connections.",
    email: "ak1305.anshukumar@gmail.com",
    linkedin: "https://www.linkedin.com/in/anshu-kumar-ak13052005/",
    github: "https://www.linkedin.com/in/anshu-kumar-ak13052005/",
    instagram: "https://www.instagram.com/i_anshu_kumar/",
    portfolio: "",
    resumeUrl: "/resume/anshu.pdf",
    img: "/images/anshu.png",
    achievements: ["Incubated multiple student-led tech products", "Connected 8 startups with angel investors", "Mentored 20+ student founders", "Organized inter-college startup bootcamp"],
    isCore: true,
    memberSince: "August 2022",
    status: "Advisory Core Member",
    location: "Hyderabad, Telangana",
    availability: "Open to Mentorship Sessions",
    responsibilities: [
      "Provide strategic advisory support to all E-Cell verticals",
      "Connect student startups with angel investors and networks",
      "Evaluate startup pitches and provide structured feedback",
      "Guide the President and leadership on organizational growth",
      "Build long-term partnerships with incubators and accelerators",
      "Facilitate mentorship connections between alumni and students",
      "Oversee E-Cell's annual incubation cohort pipeline",
      "Represent E-Cell at national startup advisory forums"
    ],
    roleImpact: "The Advisory Committee provides the strategic backbone of E-Cell, guiding leadership decisions, connecting student ventures with real-world investors, and ensuring the cell's growth remains aligned with the broader entrepreneurship ecosystem.",
    projectProgresses: [
      { name: "Angel Investor Network Portal", progress: 70 },
      { name: "Startup Cohort 2026", progress: 60 },
      { name: "Alumni Mentorship Program", progress: 40 },
      { name: "E-Cell Partnership Framework", progress: 85 }
    ],
    stats: [
      { label: "Startups Advised", value: "25+", icon: "🚀" },
      { label: "Investors Connected", value: "12+", icon: "💼" },
      { label: "Mentorship Sessions", value: "50+", icon: "🤝" },
      { label: "Events Supported", value: "15+", icon: "🎯" },
      { label: "Years in E-Cell", value: "3", icon: "⭐" },
      { label: "Alumni Network", value: "100+", icon: "🌐" }
    ],
    leadershipSkills: ["Strategic Advisory", "Mentorship", "Investor Relations", "Networking", "Business Strategy", "Conflict Resolution", "Negotiation", "Vision Setting"],
    certificates: ["IIM Bangalore Entrepreneurship", "NASSCOM Startup Leadership", "CII Young Leadership Program"],
    education: { degree: "B.Tech", college: "Pallavi Engineering College", dept: "CSE – Entrepreneurship", cgpa: "8.8", gradYear: "2026" },
    interests: ["Venture Capital", "Angel Investing", "Social Impact", "Policy & Governance", "Startup Ecosystems", "Leadership", "Mentorship", "Global Innovation"],
    favoriteQuote: "The best mentors don't give you fish — they teach you to build the ocean.",
    personalWebsite: ""
  },
  {
    id: "4",
    name: "Maheswar Rao",
    role: "Advisory Committee Member",
    domain: "Advisory Committee",
    dept: "CSE",
    year: "4th Year",
    skills: ["Financial Systems", "Incubation Models", "Risk Analysis", "Budgeting", "Fiscal Planning", "Startup Valuation", "Financial Modeling", "Cashflow Management", "Investment Analysis", "Cost Optimization", "Audit Management", "Forecasting"],
    about: "Providing fiscal guidance, scaling frameworks, and evaluating pitch desk viability for student cohorts. Overseeing E-Cell's annual budget management and strategic financial planning. Evaluating startup financial models and providing investment readiness assessments. Conducting financial literacy workshops for student entrepreneurs and founders. Developing fiscal frameworks for incubation programs and event sponsorships.",
    email: "kollaramasheswarrao@gmail.com",
    linkedin: "https://www.linkedin.com/in/kollara-maheshwar-rao",
    github: "https://github.com/Kollaramaheshwarrao",
    instagram: "https://www.instagram.com/mahi_mr_k/",
    portfolio: "",
    resumeUrl: "/resume/maheswar.pdf",
    img: "/images/maheswar.jpeg",
    achievements: ["Mentored startups in strategic fiscal operations", "Built E-Cell budgeting framework", "Conducted 5 financial literacy bootcamps", "Evaluated 30+ startup business plans"],
    isCore: true,
    memberSince: "September 2022",
    status: "Advisory Core Member",
    location: "Hyderabad, Telangana",
    availability: "Available for Fiscal Advisory",
    responsibilities: [
      "Oversee and manage E-Cell's annual budget and expenditures",
      "Evaluate startup financial models and pitch viability",
      "Provide fiscal guidance to all sub-domain heads",
      "Conduct financial literacy workshops for student entrepreneurs",
      "Develop E-Cell's incubation financial frameworks",
      "Review and approve sponsorship and vendor proposals",
      "Advise on strategic fiscal allocation for events",
      "Mentor students on startup valuation and fundraising"
    ],
    roleImpact: "The financial advisory arm of E-Cell ensures that every startup initiative, event, and operational decision is backed by sound fiscal reasoning — enabling the cell to maximize its impact, attract sponsorships, and build long-term financial sustainability.",
    projectProgresses: [
      { name: "Annual Budget Optimization", progress: 95 },
      { name: "Sponsorship Framework 2026", progress: 80 },
      { name: "Startup Valuation Toolkit", progress: 55 },
      { name: "Financial Literacy Series", progress: null }
    ],
    stats: [
      { label: "Budgets Managed", value: "₹10L+", icon: "💰" },
      { label: "Startups Evaluated", value: "30+", icon: "📊" },
      { label: "Workshops Conducted", value: "5", icon: "🛠️" },
      { label: "Sponsors Secured", value: "8+", icon: "🤝" },
      { label: "Years in E-Cell", value: "3", icon: "⭐" },
      { label: "Events Financed", value: "12+", icon: "🎯" }
    ],
    leadershipSkills: ["Financial Leadership", "Risk Management", "Strategic Planning", "Negotiation", "Analytical Thinking", "Decision Making", "Stakeholder Management", "Communication"],
    certificates: ["CFA Level 1", "NSE Financial Modeling", "ICAI Entrepreneurial Finance", "Google Data Analytics"],
    education: { degree: "B.Tech", college: "Pallavi Engineering College", dept: "CSE – Startup Management", cgpa: "8.7", gradYear: "2026" },
    interests: ["Startup Finance", "VC & PE Ecosystems", "Economic Policy", "Behavioral Economics", "Risk Analytics", "ESG Investing", "Fintech", "Quantitative Research"],
    favoriteQuote: "Numbers tell stories — the best founders know how to read them.",
    personalWebsite: ""
  },
  {
    id: "5",
    name: "Trisha Mewade",
    role: "Secretary & Treasurer",
    domain: "Secretary & Treasurer",
    dept: "Data Science",
    year: "3rd year",
    skills: ["Data Science", "Artificial Intelligence", "Machine Learning", "Budgeting", "Financial Reporting", "Documentation", "Sponsorship Management", "Vendor Negotiation", "Cost Control", "Fiscal Compliance", "Resource Allocation", "Strategic Planning"],
    about: "Third-year B.Tech Data Science student passionate about technology and innovation. As the Secretary & Treasurer of E-Cell, I manage documentation, maintain official records, and support financial record-keeping to ensure smooth team operations.",
    email: "trishapmm@gmail.com",
    linkedin: "https://www.linkedin.com/in/trisha-mewade-220572361?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    github: "https://github.com/Trisha-mewade",
    instagram: "https://www.instagram.com/__tri__sha__1111?igsh=MWdkamdnYW8zbjllMQ==",
    portfolio: "",
    resumeUrl: "/resume/trisha.pdf",
    img: "/images/trisha.jpeg",
    achievements: ["Secured Elite certification in NPTEL course", "Completed SAP Code Unnati Foundation Course", "Served as Student Coordinator for SpeakSphere", "Secured 1st Place in College Debate Competition"],
    isCore: true,
    memberSince: "may 2026",
    status: "Core Executive Member",
    location: "Hyderabad, Telangana",
    availability: "Available for Collaboration",
    responsibilities: [
      "Manage E-Cell's annual budget and financial planning",
      "Oversee cashflow management and audit preparations",
      "Secure sponsorships and manage vendor relationships",
      "Prepare financial reports for leadership review",
      "Ensure fiscal compliance with institutional guidelines",
      "Support leadership in resource allocation decisions",
      "Coordinate sponsorship communication and negotiations",
      "Maintain transparent financial records and documentation"
    ],
    roleImpact: "The Secretary & Treasurer ensures E-Cell's financial health — managing budgets, securing sponsorships, maintaining compliance, and enabling the cell to execute ambitious events and programs sustainably.",
    projectProgresses: [
      { name: "Lekha Yatra – AI Document Management System", progress: 85 },
      { name: "Explainable AI for Women Safety Research", progress: 75 },
      { name: "Budget Management System 2026", progress: 70 },
      { name: "Financial Compliance Framework", progress: 60 }
    ],
    stats: [
      { label: "Budget Managed", value: "₹8L+", icon: "💰" },
      { label: "Sponsors Secured", value: "10+", icon: "🤝" },
      { label: "Financial Reports", value: "20+", icon: "📊" },
      { label: "Audit Compliance", value: "100%", icon: "✅" },
      { label: "Years in E-Cell", value: "1", icon: "⭐" },
      { label: "CGPA", value: "9.6", icon: "📊" }
    ],
    leadershipSkills: ["Data Science", "Financial Management", "Budget Planning", "Documentation", "Sponsorship Management", "Strategic Planning", "Compliance", "Communication"],
    certificates: ["NPTEL Elite Certification in Data Structures and Algorithm Design", "SAP Code Unnati Foundation Course Completion", "Data Analytics Certification", "Google Cloud APAC Certification"],
    education: { degree: "B.Tech", college: "Pallavi Engineering College", dept: "CSE(Data Science)", cgpa: "9.6", gradYear: "2028" },
    interests: ["Data Science", "Artificial Intelligence", "Machine Learning", "Financial Management", "Research", "Documentation", "Strategic Planning", "Technology Innovation"],
    favoriteQuote: "A budget is telling your money where to go instead of wondering where it went.",
    personalWebsite: ""
  },

  /* ── Remaining Leadership ── */
  {
    id: "6",
    name: "B. Lavanya",
    role: "Vice-President (Operations)",
    domain: "Leadership",
    dept: "CSE",
    year: "4th Year",
    skills: ["Operations", "Team Management", "Scrum Methodologies", "Project Planning", "Resource Allocation", "Process Optimization", "Cross-functional Coordination", "Agile Leadership", "Workflow Automation", "Performance Tracking", "Risk Mitigation", "Strategic Execution"],
    about: "Optimizing internal workflow loops, scheduling resources, and managing cross-domain deliveries. Streamlining project reporting timelines across all six E-Cell sub-domains. Coordinating between different teams to ensure seamless operational efficiency. Implementing Scrum methodologies for better project management and delivery. Ensuring resource allocation aligns with organizational priorities and deadlines.",
    email: "lavanyabatchu12@gmail.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    instagram: "https://www.instagram.com/lavanyeahh___/",
    portfolio: "",
    resumeUrl: "/resume/lavanya.pdf",
    img: "/images/lavanya.jpeg",
    achievements: ["Streamlined project reporting timelines across all 6 sub-domains"],
    isCore: true,
    memberSince: "October 2024",
    status: "Core Executive Member",
    location: "Hyderabad, Telangana",
    availability: "Available for Collaboration",
    responsibilities: [
      "Oversee and optimize internal operations across all sub-domains",
      "Manage resource allocation and scheduling for events and projects",
      "Streamline project reporting timelines and delivery workflows",
      "Coordinate cross-functional team communications",
      "Implement Scrum methodologies for better project management",
      "Ensure operational efficiency and process optimization",
      "Support leadership in strategic execution planning",
      "Track performance metrics and identify improvement areas"
    ],
    roleImpact: "The VP Operations ensures E-Cell runs like a well-oiled machine — optimizing workflows, managing resources, and coordinating across all teams to deliver events and initiatives on time with maximum efficiency.",
    projectProgresses: [
      { name: "Operations Framework 2026", progress: 85 },
      { name: "Resource Allocation System", progress: 70 },
      { name: "Cross-Domain Coordination Protocol", progress: 55 },
      { name: "Performance Tracking Dashboard", progress: null }
    ],
    stats: [
      { label: "Projects Managed", value: "25+", icon: "📋" },
      { label: "Teams Coordinated", value: "6", icon: "👥" },
      { label: "Process Optimizations", value: "15+", icon: "⚡" },
      { label: "Timelines Met", value: "95%", icon: "✅" },
      { label: "Years in E-Cell", value: "1", icon: "⭐" },
      { label: "Resources Allocated", value: "50+", icon: "📦" }
    ],
    leadershipSkills: ["Operations Management", "Strategic Planning", "Team Coordination", "Process Optimization", "Scrum Methodologies", "Risk Mitigation", "Communication", "Problem Solving"],
    certificates: ["Scrum Master Certification", "Project Management Professional", "Lean Six Sigma Green Belt", "Google Project Management"],
    education: { degree: "B.Tech", college: "Pallavi Engineering College", dept: "Computer Science & Engineering", cgpa: "8.9", gradYear: "2026" },
    interests: ["Operations Research", "Process Engineering", "Team Building", "Strategic Planning", "Agile Methodologies", "Workflow Automation", "Performance Analytics", "Organizational Behavior"],
    favoriteQuote: "Efficiency is doing things right; effectiveness is doing the right things.",
    personalWebsite: ""
  },
  {
    id: "7",
    name: "Paisa Goutham Krishna Reddy",
    role: "Vice President",
    domain: "Leadership",
    dept: "Cyber Security",
    year: "3rd Year",
    skills: ["Outreach", "PR connect", "Investor Relations", "Partnership Development", "Corporate Relations", "Network Building", "Event Coordination", "Brand Advocacy", "Stakeholder Engagement", "Strategic Alliances", "Fundraising", "Public Speaking", "Leadership", "Entrepreneurship"],
    about: "As the Vice President of the E-Cell, I work closely with the leadership team to promote entrepreneurship, innovation, and student-led initiatives across the campus. I contribute to planning and executing impactful events, building strategic collaborations, and creating opportunities that inspire students to transform their ideas into successful ventures.",
    email: "gouthamkrishnareddypaisa@gmail.com",
    linkedin: "https://www.linkedin.com/in/goutham-krishna-reddy-paisa-7845b437b?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    github: "https://github.com",
    instagram: "https://www.instagram.com/_paisareddy?igsh=MXM0azU4aGtsdjV5eQ%3D%3D&utm_source=qr",
    portfolio: "",
    resumeUrl: "/resume/gautam.pdf",
    img: "/images/gautam.jpeg",
    achievements: ["President of the CSI Student Chapter at Pallavi Engineering College", "Successfully organized numerous national-level technical events, workshops, hackathons, and entrepreneurship programs", "Contributed to E-Cell leadership team in achieving Top 20 national ranking in Eureka! Startup Competition by IIT Bombay", "Founder of Tri Spark Enterprise, a registered startup focused on innovation and technology"],
    isCore: true,
    memberSince: "october 2025",
    status: "Core Executive Member",
    location: "Hyderabad",
    availability: "Available for Collaboration",
    responsibilities: [
      "Lead outreach initiatives and partnership development",
      "Build and maintain relationships with corporate sponsors",
      "Represent E-Cell at regional and national startup events",
      "Manage investor relations and funding opportunities",
      "Drive campus awareness and engagement campaigns",
      "Coordinate with external startup clubs and incubation centers",
      "Facilitate speaker and mentor invitations for events",
      "Expand E-Cell's network across colleges and industries"
    ],
    roleImpact: "The Vice President is E-Cell's bridge to the external world — building partnerships, securing sponsorships, connecting with investors, and expanding the cell's influence across the startup ecosystem.",
    projectProgresses: [
      { name: "Tri Spark Enterprise - Registered Startup", progress: 90 },
      { name: "CSI Student Chapter Leadership", progress: 85 },
      { name: "National Technical Events Organization", progress: 80 },
      { name: "Eureka! Competition Top 20 Achievement", progress: 100 }
    ],
    stats: [
      { label: "Events Organized", value: "20+", icon: "🎯" },
      { label: "Startup Founded", value: "1", icon: "🚀" },
      { label: "National Ranking", value: "Top 20", icon: "�" },
      { label: "Leadership Roles", value: "2", icon: "�" },
      { label: "Years in E-Cell", value: "1", icon: "⭐" },
      { label: "CGPA", value: "7.95", icon: "📊" }
    ],
    leadershipSkills: ["Partnership Development", "Public Speaking", "Network Building", "Strategic Alliances", "Corporate Relations", "Fundraising", "Stakeholder Management", "Brand Advocacy"],
    certificates: ["Business Development Certification", "Corporate Partnership Management", "Strategic Marketing", "Public Speaking Excellence"],
    education: { degree: "B.Tech", college: "Pallavi Engineering College", dept: "CSE(Cyber Security)", cgpa: "8.0", gradYear: "2028" },
    interests: ["Startup Ecosystems", "Corporate Strategy", "Networking", "Public Relations", "Event Management", "Business Development", "Leadership", "Community Building"],
    favoriteQuote: "Your network is your net worth.",
    personalWebsite: ""
  },

  /* ── Marketing & PR ── */
  {
    id: "8",
    name: "Ruchika Marshetty",
    role: "Marketing & PR Head",
    domain: "Marketing & PR",
    dept: "CSE-CS",
    year: "4th Year [2023-2027]",
    skills: ["Brand Strategy", "PR Campaigns", "Content Planning", "Digital Marketing", "Social Media Marketing", "Market Research", "Analytics", "Copywriting", "SEO", "Media Relations", "Campaign Management", "Brand Identity"],
    about: "Hello, myself Ruchika Marshetty the Marketing & PR Head. As the Marketing & PR Head, I manage promotions, create awareness about events and initiatives, and handle public relations. I work on communicating with audiences, building a positive image, and increasing engagement through effective marketing and outreach.",
    email: "ruchikamarshetty3@gmail.com",
    linkedin: "https://www.linkedin.com/in/ruchika-marshetty?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    github: "https://github.com",
    instagram: "https://www.instagram.com/_roochika_?igsh=MzRvcm56dTV2anp3",
    portfolio: "",
    resumeUrl: "/resume/ruchika.pdf",
    img: "/images/ruchika.jpeg",
    achievements: ["Won Eureka college level 2023", "Won state level skating competition", "Won intra school classical dance competition", "Was a house captain back in school"],
    isCore: true,
    memberSince: "October 2025",
    status: "Core Executive Member",
    location: "Hyderabad - Old city",
    availability: "Available for Collaboration",
    responsibilities: [
      "Lead marketing operations and brand strategy for E-Cell",
      "Plan and execute PR campaigns and media relations",
      "Manage content calendar and publications across channels",
      "Build and maintain relationships with media outlets",
      "Track and analyze marketing KPIs and campaign performance",
      "Collaborate with design team for visual content creation",
      "Drive outreach campaigns across colleges and universities",
      "Manage sponsorship communication and brand partnerships"
    ],
    roleImpact: "The Marketing & PR Head amplifies E-Cell's voice across campuses and digital platforms — crafting compelling brand narratives, managing media relations, and driving awareness to attract students, sponsors, and industry partners.",
    projectProgresses: [
      { name: "Plastic Reuse Project", progress: 90 },
      { name: "Student Management System", progress: 85 },
      { name: "Phishing Email Identification Project", progress: 80 },
      { name: "Brand Campaign 2026", progress: 70 }
    ],
    stats: [
      { label: "Projects Completed", value: "3", icon: "�" },
      { label: "Achievements", value: "4", icon: "🏆" },
      { label: "CGPA", value: "7.68", icon: "�" },
      { label: "Years in E-Cell", value: "1", icon: "⭐" },
      { label: "Campaigns Led", value: "10+", icon: "📢" },
      { label: "Social Reach", value: "5K+", icon: "👥" }
    ],
    leadershipSkills: ["Brand Strategy", "PR Management", "Content Planning", "Team Leadership", "Analytics", "Strategic Communication", "Campaign Management", "Stakeholder Relations"],
    certificates: ["Google Digital Marketing", "HubSpot Social Media Marketing", "Facebook Blueprint", "Hootsuite Social Media"],
    education: { degree: "B.Tech", college: "Pallavi Engineering College", dept: "CSE-CS", cgpa: "7.68", gradYear: "2027" },
    interests: ["Brand Building", "Digital Marketing", "Content Strategy", "Public Relations", "Social Media Trends", "Consumer Behavior", "Marketing Analytics", "Creative Strategy"],
    favoriteQuote: "Marketing is no longer about the stuff that you make, but about the stories you tell.",
    personalWebsite: ""
  },
  {
    id: "9",
    name: "Mahalakshmi Gundlapally",
    role: "Marketing & PR Coordinator",
    domain: "Marketing & PR",
    dept: "CSE",
    year: "2nd Year [2024-2028]",
    skills: ["Public Relations", "Promotional Campaigns", "Event Outreach", "Communication", "Teamwork", "Marketing Strategy", "Brand Visibility", "Content Creation", "Social Media Management", "Digital Marketing", "Analytics", "Collaboration"],
    about: "I am Mahalakshmi Gundlapally, a Marketing PR member at E-Cell, responsible for supporting promotional campaigns, public relations, and event outreach. I contribute to enhancing the organization's visibility through effective communication and collaborative teamwork.",
    email: "gundlapallymahalakshmi@gmail.com",
    linkedin: "www.linkedin.com/in/mahalakshmi-gundlapally-8735b1352",
    github: "https://github.com/gundlapallymahalakshmi",
    instagram: "https://www.instagram.com/gundlapally_mahalakshmi?igsh=NDlwaXA3Z3V5ZXpr",
    portfolio: "",
    resumeUrl: "/resume/maha.pdf",
    img: "/images/maha.jpeg",
    achievements: ["Secured 1st place in Genesis Ideathon conducted at Pallavi Engineering College", "Participated in NirvanaX Hackathon, showcasing teamwork, problem-solving, and innovation", "Participated in Idea Pitching War, presenting and defending an innovative project idea"],
    isCore: true,
    memberSince: "July 2026",
    status: "Core Executive Member",
    location: "Hyderabad",
    availability: "Available for Collaboration",
    responsibilities: [
      "Support promotional campaigns and public relations initiatives",
      "Assist in event outreach and marketing coordination",
      "Enhance organization visibility through effective communication",
      "Collaborate with team members on marketing strategies",
      "Contribute to content creation and social media management",
      "Support brand visibility and promotional activities",
      "Work with cross-functional teams on marketing projects",
      "Track and report on campaign performance"
    ],
    roleImpact: "The Marketing Coordinator supports E-Cell's promotional efforts — assisting with campaigns, public relations, and event outreach to enhance the organization's visibility through effective communication and collaborative teamwork.",
    projectProgresses: [
      { name: "Maanav Tools - Web Application", progress: 85 },
      { name: "Marketing Campaign 2026", progress: 70 },
      { name: "Event Outreach Initiative", progress: 60 },
      { name: "Brand Visibility Project", progress: null }
    ],
    stats: [
      { label: "Achievements", value: "3", icon: "🏆" },
      { label: "Hackathons Participated", value: "2", icon: "�" },
      { label: "CGPA", value: "8.44", icon: "📊" },
      { label: "Years in E-Cell", value: "1", icon: "⭐" },
      { label: "Projects Worked On", value: "1", icon: "💻" },
      { label: "Certifications", value: "2", icon: "�" }
    ],
    leadershipSkills: ["Public Relations", "Communication", "Teamwork", "Marketing Strategy", "Event Outreach", "Collaboration", "Content Creation", "Brand Visibility"],
    certificates: ["Deloitte Cyber Job Simulation", "IBM SkillsBuild - AI Fundamentals"],
    education: { degree: "B.Tech", college: "Pallavi Engineering College", dept: "CSE", cgpa: "8.44", gradYear: "2028" },
    interests: ["Marketing", "Public Relations", "Event Management", "Digital Marketing", "Content Creation", "Team Collaboration", "Brand Strategy", "Communication"],
    favoriteQuote: "Effective communication is the key to successful marketing.",
    personalWebsite: ""
  },
  {
    id: "10",
    name: "Mohammed Omer",
    role: "Marketing & PR Member",
    domain: "Marketing & PR",
    dept: "Computer Science & Engineering (AI & ML)",
    year: "1st Year (B.Tech)",
    skills: ["Artificial Intelligence", "Event Management", "Social Media Marketing", "Leadership", "Python Development", "Public Speaking", "Community Operations", "Student Engagement", "Communication", "Outreach Strategy", "Team Collaboration", "Program Execution"],
    about: "I am a passionate B.Tech CSE AI & ML student dedicated to building innovative technology solutions and solving real-world problems. As a member of the E-Cell Marketing and PR team, I bring discipline, creativity, and a strong work ethic to drive impactful campaigns and community engagement.",
    email: "mohammedomer0602@gmail.com",
    linkedin: "https://www.linkedin.com/in/mohammed-omer-548221380?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    github: "https://github.com",
    instagram: "https://www.instagram.com/Its.Atif_khan06",
    portfolio: "",
    resumeUrl: "/resume/omer.pdf",
    img: "/images/omer.jpeg",
    achievements: ["Achieved 8.2 CGPA in first semester of B.Tech", "Selected as core Marketing and PR member for E-Cell", "Developed and deployed AI chatbots and functional web pages", "Established and led community for first-year B.Tech students"],
    isCore: true,
    memberSince: "May 2026",
    status: "Core Executive Member",
    location: "Hyderabad, Telangana, India",
    availability: "Available for Collaboration",
    responsibilities: [
      "Manage outreach logistics and public relationships",
      "Coordinate with student organizations for collaborative events",
      "Build and maintain relationships with campus communities",
      "Support the outreach team in executing engagement initiatives",
      "Ensure smooth communication and alignment across outreach activities",
      "Facilitate partnerships with external clubs and organizations",
      "Coordinate speaker and mentor invitations for events",
      "Track outreach metrics and report on engagement activities"
    ],
    roleImpact: "The Marketing & PR Member strengthens E-Cell's campus presence — managing logistics, building community relationships, and ensuring seamless execution of outreach initiatives and collaborative events.",
    projectProgresses: [
      { name: "AI-Powered Smart Helmet", progress: 75 },
      { name: "College Student Grievance Cell Website", progress: 65 },
      { name: "Campus Outreach Program", progress: 50 },
      { name: "Community Engagement Initiative", progress: null }
    ],
    stats: [
      { label: "Events Coordinated", value: "10+", icon: "🎯" },
      { label: "Partnerships Built", value: "15", icon: "🤝" },
      { label: "Students Engaged", value: "5K+", icon: "👥" },
      { label: "Campus Reach", value: "8", icon: "🎓" },
      { label: "Years in E-Cell", value: "1", icon: "⭐" },
      { label: "Projects Built", value: "3", icon: "�" }
    ],
    leadershipSkills: ["Artificial Intelligence", "Event Management", "Social Media Marketing", "Leadership", "Python Development", "Public Speaking", "Community Building", "Communication"],
    certificates: ["Certificate of Excellence (2026) - Event Management (Google Gemini Event)", "Artificial Intelligence Fundamentals"],
    education: { degree: "B.Tech", college: "Pallavi Engineering College", dept: "Computer Science & Engineering (AI & ML)", cgpa: "8.2", gradYear: "2029" },
    interests: ["Artificial Intelligence", "Event Management", "Social Media Marketing", "Community Development", "Public Relations", "Student Engagement", "Networking", "Leadership"],
    favoriteQuote: "Alone we can do so little; together we can do so much.",
    personalWebsite: ""
  },

  /* ── Creative & Design ── */
  {
    id: "11",
    name: "Kushi Kumari",
    role: "E-Cell Member",
    domain: "Creative & Design",
    dept: "B.Tech CSE (AI & ML)",
    year: "2nd Year",
    skills: ["UI/UX", "Figma", "Branding", "Adobe Illustrator", "Photoshop", "Canva", "Typography", "Color Theory", "Wireframing", "Prototyping", "Visual Design", "Motion Graphics", "Artificial Intelligence", "Machine Learning", "Edge AI"],
    about: "I'm Kushi — a first-year AIML student with a strong passion for building intelligent solutions. I actively participate in hackathons, earn AI certifications, and contribute to the visual identity of the college's E-Cell while transforming machine learning concepts into practical applications.",
    email: "kushi@ecell.ac.in",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    instagram: "https://instagram.com",
    portfolio: "",
    resumeUrl: "/resume/Kushi.pdf",
    img: "/images/logo.jpeg",
    achievements: ["Kalam Space Convention 2K25", "Genesis Hackathon", "Eureka Engines 3.0", "Multiple AI Certifications with Claude"],
    isCore: false,
    memberSince: "June 2026",
    status: "E-Cell Member",
    location: "Hyderabad, Telangana",
    availability: "Available for Collaboration",
    responsibilities: [
      "Contribute to visual identity of E-Cell",
      "Participate in hackathons and AI competitions",
      "Transform machine learning concepts into practical applications",
      "Design creative assets for events and campaigns",
      "Apply AI knowledge to design solutions",
      "Collaborate with team on innovative projects"
    ],
    roleImpact: "As an E-Cell Member, I contribute my design skills and AI knowledge to create innovative solutions while building intelligent applications that bridge the gap between creativity and technology.",
    projectProgresses: [
      { name: "Advanced TV Remote Control", progress: 75 },
      { name: "Edge AI Implementation", progress: 60 },
      { name: "Advanced Navigation Suite", progress: 50 },
      { name: "Intelligent Home", progress: 40 }
    ],
    stats: [
      { label: "Hackathons", value: "3+", icon: "�" },
      { label: "AI Certifications", value: "5+", icon: "🎓" },
      { label: "Projects Built", value: "4", icon: "�" },
      { label: "CGPA", value: "8.5", icon: "📊" },
      { label: "Years in E-Cell", value: "0", icon: "⭐" },
      { label: "Events Attended", value: "5+", icon: "🎯" }
    ],
    leadershipSkills: ["UI/UX Design", "Brand Strategy", "Visual Communication", "AI/ML", "Problem Solving", "Creative Direction", "Prototyping", "Team Collaboration"],
    certificates: ["Multiple AI Certifications with Claude", "Google UX Design", "Adobe Creative Suite", "Figma Advanced"],
    education: { degree: "B.Tech", college: "Pallavi Engineering College", dept: "CSE (AI & ML)", cgpa: "8.5", gradYear: "2029" },
    interests: ["Visual Design", "Brand Identity", "UI/UX", "Artificial Intelligence", "Machine Learning", "Edge AI", "Typography", "Creative Direction"],
    favoriteQuote: "Design is not just what it looks like and feels like. Design is how it works.",
    personalWebsite: ""
  },
  {
    id: "12",
    name: "Saksham",
    role: "Creative & Design Team Member",
    domain: "Creative & Design",
    dept: "CSE(Cyber Security)",
    year: "2nd Year",
    skills: ["Artificial Intelligence", "Python Development", "Web Development", "Creative Design", "Price Action Trading", "Photoshop", "Illustrator", "Graphic Design", "Vector Art", "UI/UX", "Typography", "Visual Storytelling"],
    about: "I am a first-year B.Tech Cyber Security student passionate about building innovative technology solutions using Python, Artificial Intelligence, and Web Development. I enjoy transforming ideas into practical projects that solve real-world problems while continuously improving my technical and creative skills. As a member of the E-Cell Creative & Design Team, I contribute creativity, problem-solving, and a growth mindset to every project I work on.",
    email: "shivamdwivadi12345@gmail.com",
    linkedin: "https://www.linkedin.com/in/saksham-divedi-98a931361?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    github: "https://github.com",
    instagram: "https://instagram.com",
    portfolio: "https://youtube.com/@sakshammmm-p2p?si=KgCB_l-tBeECiuPf",
    resumeUrl: "/resume/saksham.pdf",
    img: "/images/saksham.jpeg",
    achievements: ["Achieved 8.4 CGPA in First Semester of B.Tech", "Selected as Creative & Design Team Member of E-Cell", "Successfully designed and developed multiple AI, Python, and Web Development projects independently", "Continuously expanding expertise in AI, Cyber Security, Data Structures, and Software Development"],
    isCore: true,
    memberSince: "May 2026",
    status: "Core Executive Member",
    location: "Hyderabad, Telangana, India",
    availability: "Available for Collaboration",
    responsibilities: [
      "Develop vectors and design collateral for print and digital",
      "Create stunning graphics for event promotions and campaigns",
      "Design social media templates and maintain visual consistency",
      "Support the creative team in producing high-quality content",
      "Apply design principles to enhance brand recognition",
      "Create visual layouts for marketing materials",
      "Design event backdrops and stage visuals",
      "Collaborate with marketing for campaign alignment"
    ],
    roleImpact: "The Creative & Design Team Member brings E-Cell's vision to life through stunning visuals — developing graphics, designing templates, and ensuring every visual element reinforces the brand and engages the audience.",
    projectProgresses: [
      { name: "Personal Portfolio Website", progress: 90 },
      { name: "Project Jarvis – AI Personal Assistant", progress: 80 },
      { name: "AI Photo Finder", progress: 70 },
      { name: "Hand Tracking System", progress: 60 }
    ],
    stats: [
      { label: "Projects Built", value: "4+", icon: "💻" },
      { label: "AI Models Developed", value: "3", icon: "🤖" },
      { label: "Websites Created", value: "2", icon: "🌐" },
      { label: "Design Assets", value: "50+", icon: "🎨" },
      { label: "Years in E-Cell", value: "1", icon: "⭐" },
      { label: "CGPA", value: "8.4", icon: "�" }
    ],
    leadershipSkills: ["Artificial Intelligence", "Python Development", "Web Development", "Creative Design", "Problem Solving", "Graphic Design", "UI/UX", "Visual Storytelling"],
    certificates: ["Python Programming Essentials", "Introduction to Cyber Security", "Artificial Intelligence Fundamentals", "Git & GitHub for Developers"],
    education: { degree: "B.Tech", college: "Pallavi Engineering College", dept: "Cyber Security", cgpa: "8.4", gradYear: "2028" },
    interests: ["Artificial Intelligence", "Cyber Security", "Web Development", "Creative Design", "Python Programming", "Data Structures", "Software Development", "Price Action Trading"],
    favoriteQuote: "Creativity is intelligence having fun.",
    personalWebsite: ""
  },

  /* ── Event Management ── */
  {
    id: "13",
    name: "Khwaish Modi",
    role: "Event Management Head",
    domain: "Event Management",
    dept: "CSE(DS)",
    year: "3rd Year",
    skills: ["Project Management", "Operations", "Logistics", "Vendor Management", "Venue Coordination", "Budget Management", "Team Leadership", "Risk Assessment", "Timeline Planning", "Resource Allocation", "Quality Control", "Stakeholder Communication"],
    about: "Managing planning loops, vendor alignments, and overall logistics for campus startup conclaves. Leading event planning and coordination for hackathons, conclaves, and workshops. Managing vendor relationships, venue bookings, and equipment procurement. Coordinating volunteer teams and ensuring smooth execution during live events. Conducting post-event analysis to improve future event planning and delivery.",
    email: "khwaish@ecell.ac.in",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    instagram: "https://instagram.com",
    portfolio: "",
    resumeUrl: "/resume/khwaish.pdf",
    img: "/images/khwaish.jpeg",
    achievements: ["Coordinated HackStart 48hr logistics cleanly"],
    isCore: true,
    memberSince: "May 2026",
    status: "Core Executive Member",
    location: "Hyderabad, Telangana",
    availability: "Available for Collaboration",
    responsibilities: [
      "Lead event planning and coordination for all E-Cell initiatives",
      "Manage vendor relationships, venue bookings, and equipment procurement",
      "Coordinate volunteer teams and ensure smooth execution during events",
      "Conduct post-event analysis to improve future planning",
      "Manage event budgets and resource allocation",
      "Oversee logistics for hackathons, conclaves, and workshops",
      "Coordinate with all departments for event requirements",
      "Ensure safety and compliance at all events"
    ],
    roleImpact: "The Event Management Head ensures every E-Cell event runs flawlessly — from planning to execution, managing logistics, coordinating teams, and creating memorable experiences for participants.",
    projectProgresses: [
      { name: "E-Summit 2026 Planning", progress: 85 },
      { name: "HackStart Logistics Framework", progress: 75 },
      { name: "Vendor Management System", progress: 60 },
      { name: "Event Analytics Dashboard", progress: null }
    ],
    stats: [
      { label: "Events Managed", value: "15+", icon: "🎯" },
      { label: "Volunteers Coordinated", value: "100+", icon: "👥" },
      { label: "Vendors Managed", value: "20", icon: "🤝" },
      { label: "Event Satisfaction", value: "95%", icon: "⭐" },
      { label: "Years in E-Cell", value: "1", icon: "⭐" },
      { label: "Budget Managed", value: "₹5L+", icon: "💰" }
    ],
    leadershipSkills: ["Project Management", "Operations", "Logistics", "Team Leadership", "Vendor Management", "Risk Assessment", "Timeline Planning", "Stakeholder Communication"],
    certificates: ["Event Management Professional", "Project Management", "Risk Management", "Venue Operations"],
    education: { degree: "B.Tech", college: "Pallavi Engineering College", dept: "CSE(DS)", cgpa: "8.8", gradYear: "2026" },
    interests: ["Event Planning", "Operations Management", "Team Building", "Logistics", "Vendor Relations", "Risk Management", "Experience Design", "Budget Planning"],
    favoriteQuote: "The details are not the details. They make the design.",
    personalWebsite: ""
  },
  {
    id: "14",
    name: "Gayathri Ravula",
    role: "Event Management Coordinator",
    domain: "Event Management",
    dept: "CSE(AI&ML)",
    year: "3rd Year",
    skills: ["Logistics", "Operations", "Planning", "Registration Management", "Database Management", "Attendee Coordination", "Vendor Liaison", "On-site Management", "Problem Solving", "Communication", "Process Improvement", "Team Support"],
    about: "Supporting event operations, managing registrations, and arranging mentor logistics. Handling attendee registrations and managing event databases and check-ins. Coordinating with mentors and speakers for their participation in events. Supporting the event team in logistics planning and on-ground coordination. Ensuring seamless participant experience from registration to event completion.",
    email: "gayathri@ecell.ac.in",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    instagram: "https://instagram.com",
    portfolio: "",
    resumeUrl: "/resume/gayatri.pdf",
    img: "/images/gayatri.jpeg",
    achievements: ["Managed registrations for startup expo board"],
    isCore: true,
    memberSince: "May 2026",
    status: "Core Executive Member",
    location: "Hyderabad, Telangana",
    availability: "Available for Collaboration",
    responsibilities: [
      "Support event operations and logistics planning",
      "Manage attendee registrations and event databases",
      "Coordinate with mentors and speakers for event participation",
      "Handle on-ground coordination during events",
      "Support volunteer team management and assignments",
      "Ensure seamless participant experience from registration to completion",
      "Manage check-in processes and attendee communications",
      "Track event metrics and prepare post-event reports"
    ],
    roleImpact: "The Event Management Coordinator ensures smooth event execution — managing registrations, coordinating participants, supporting logistics, and delivering excellent attendee experiences.",
    projectProgresses: [
      { name: "Registration System Optimization", progress: 75 },
      { name: "Attendee Experience Initiative", progress: 65 },
      { name: "Mentor Coordination Framework", progress: 55 },
      { name: "Event Analytics Dashboard", progress: null }
    ],
    stats: [
      { label: "Registrations Managed", value: "500+", icon: "📋" },
      { label: "Events Supported", value: "12", icon: "🎯" },
      { label: "Attendees Coordinated", value: "2K+", icon: "👥" },
      { label: "Registration Success", value: "98%", icon: "✅" },
      { label: "Years in E-Cell", value: "1", icon: "⭐" },
      { label: "Mentors Coordinated", value: "25", icon: "🤝" }
    ],
    leadershipSkills: ["Operations", "Planning", "Database Management", "Communication", "Problem Solving", "Team Support", "Process Improvement", "Attendee Relations"],
    certificates: ["Event Operations", "Database Management", "Customer Service Excellence", "Project Coordination"],
    education: { degree: "B.Tech", college: "Pallavi Engineering College", dept: "CSE(AI&ML)", cgpa: "8.9", gradYear: "2028" },
    interests: ["Event Operations", "Database Management", "Process Optimization", "Team Coordination", "Customer Experience", "Logistics", "Problem Solving", "Communication"],
    favoriteQuote: "Success is where preparation and opportunity meet.",
    personalWebsite: ""
  },
  {
    id: "15",
    name: "MALGE BHAVANI",
    role: "Event Manager",
    domain: "Event Management",
    dept: "Computer Science – Artificial Intelligence and Machine Learning",
    year: "1st Year (2025–2029)",
    skills: ["Leadership", "Team Management", "Event Execution", "Startup Ideation", "Collaboration", "Communication", "Strategic Planning", "Project Management", "Agentic AI", "Generative AI", "Google Cloud", "Agri-tech"],
    about: "CSE-AIML first-year student and aspiring woman tech leader with strong leadership and team management skills. As E-Cell Event Manager, I drive end-to-end execution of flagship events and foster collaboration across teams. Punctual and proactive, I thrive on turning startup ideas into impactful campus initiatives. Founder working on own startup ideas including Krishi Co-Pilot (Agri-tech) and sensor-related startup projects.",
    email: "bhavanamalge6@gmail.com",
    linkedin: "https://www.linkedin.com/in/bhavani-malge-779152403",
    github: "",
    instagram: "",
    portfolio: "",
    resumeUrl: "/resume/bhavani.pdf",
    img: "/images/bhavani.jpeg",
    achievements: ["Completed Agentic AI course through LinkedIn Learning", "Earned Google Cloud certification via Skill Up India", "Secured 9.25 CGPA in 1st semester of B.Tech", "Built Krishi Co-Pilot – Agri-tech project using Generative AI"],
    isCore: true,
    memberSince: "July 2026",
    status: "Core Executive Member",
    location: "Hyderabad, Telangana",
    availability: "Available for Collaboration",
    responsibilities: [
      "Drive end-to-end execution of flagship E-Cell events",
      "Foster collaboration across teams for seamless event delivery",
      "Lead volunteer coordination and team management",
      "Turn startup ideas into impactful campus initiatives",
      "Manage event timelines and ensure punctual execution",
      "Coordinate with domain heads for cross-functional events",
      "Support on-ground event operations and troubleshooting",
      "Mentor junior team members in event management"
    ],
    roleImpact: "The Event Manager drives the successful execution of E-Cell's flagship events — leading end-to-end planning, fostering team collaboration, and transforming startup ideas into impactful campus initiatives.",
    projectProgresses: [
      { name: "Krishi Co-Pilot – Agri-tech Project", progress: 85 },
      { name: "Sensor-related Startup Project", progress: 70 },
      { name: "Own Startup Ideas Development", progress: 60 },
      { name: "Event Execution Framework", progress: 90 }
    ],
    stats: [
      { label: "Events Led", value: "10+", icon: "🎯" },
      { label: "Projects Built", value: "3", icon: "🚀" },
      { label: "CGPA", value: "9.25", icon: "�" },
      { label: "Certifications", value: "3", icon: "🏆" },
      { label: "Years in E-Cell", value: "0", icon: "⭐" },
      { label: "Team Members Coordinated", value: "30+", icon: "�" }
    ],
    leadershipSkills: ["Leadership", "Team Management", "Event Execution", "Strategic Planning", "Communication", "Collaboration", "Project Management", "Startup Ideation"],
    certificates: ["Agentic AI – LinkedIn Learning", "Google Cloud – Skill Up India", "Generative AI Learning Path – Google Cloud Skills Boost"],
    education: { degree: "B.Tech", college: "Pallavi Engineering College", dept: "CSM-A (CSE-AIML)", cgpa: "9.25", gradYear: "2029" },
    interests: ["Event Operations", "Team Management", "Venue Design", "Crisis Management", "Resource Planning", "Quality Assurance", "Communication", "Leadership"],
    favoriteQuote: "Teamwork makes the dream work.",
    personalWebsite: ""
  },

  /* ── Social Media & Influencer ── */
  {
    id: "16",
    name: "Boddupelli Bala Murali",
    role: "Social Media & Influencer",
    domain: "AI & Machine Learning",
    dept: "CSM(AI & ML)",
    year: "2nd year",
    skills: ["Video Editing", "Content Creation", "Social Media Strategy", "Leadership", "Team Management", "Event Coordination", "Communication", "Student Engagement", "Visual Storytelling", "Platform Management", "Community Building", "Analytics"],
    about: "I am Boddupelli Bala Murali, a CSE (AI & ML) student at Pallavi Engineering College. I actively contribute to student communities through event coordination and social media engagement. As an E-Cell Social Media & Influencer team member, I aim to promote innovation, entrepreneurship, and teamwork while using my leadership and communication skills effectively.",
    email: "balu09122005@gmail.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    instagram: "https://instagram.com",
    portfolio: "",
    resumeUrl: "/resume/balu.pdf",
    img: "/images/balu.jpeg",
    achievements: ["Served as coordinator for Spectra college event", "Contributed as coordinator in CSI-Pallavi Engineering College activities", "Skilled in leadership, team management, and event coordination", "Active participant in student engagement and social media promotion"],
    isCore: true,
    memberSince: "May 2026",
    status: "Core Executive Member",
    location: "Saraswati Colony, Uppal, Hyderabad",
    availability: "Available for Collaboration",
    responsibilities: [
      "Create visual stories and video content for social media",
      "Write reels scripts and manage online student engagement",
      "Produce engaging video content for promotional campaigns",
      "Manage Instagram and other social media channels",
      "Analyze engagement metrics and optimize content strategy",
      "Collaborate with marketing team for campaign alignment",
      "Track social media trends and adapt content accordingly",
      "Grow E-Cell's online presence across platforms"
    ],
    roleImpact: "The Social Media & Influencer team member drives E-Cell's digital engagement — creating compelling video content, managing social channels, analyzing metrics, and growing the cell's online presence to reach and engage the student community.",
    projectProgresses: [
      { name: "Currently exploring new project opportunities", progress: null },
      { name: "Social Media Growth Campaign", progress: 50 },
      { name: "Video Content Library", progress: 40 },
      { name: "Engagement Analytics Dashboard", progress: 30 }
    ],
    stats: [
      { label: "Events Coordinated", value: "2", icon: "�" },
      { label: "Social Engagement", value: "1K+", icon: "�" },
      { label: "Content Created", value: "20+", icon: "�" },
      { label: "Team Leadership", value: "5", icon: "👥" },
      { label: "Years in E-Cell", value: "1", icon: "⭐" },
      { label: "Campaigns Supported", value: "5", icon: "📢" }
    ],
    leadershipSkills: ["Leadership", "Team Management", "Event Coordination", "Communication", "Social Media Strategy", "Student Engagement", "Content Creation", "Community Building"],
    certificates: ["Not available yet"],
    education: { degree: "B.Tech", college: "Pallavi Engineering College", dept: "CSM(AI & ML)", cgpa: "8.5", gradYear: "2029" },
    interests: ["Social Media", "Event Coordination", "Leadership", "Team Management", "Student Engagement", "Content Creation", "Communication", "Community Building"],
    favoriteQuote: "Content is king, but engagement is queen.",
    personalWebsite: ""
  },
  {
    id: "17",
    name: "Hansini Gaddam",
    role: "Social Media & Influencer",
    domain: "Social Media",
    dept: "Computer Science & Engineering",
    year: "3rd Year",
    skills: ["Content Creation", "Digital Branding", "Social Media Strategy", "UGC Content", "AI & Streamlit", "Entrepreneurship", "Creative Branding", "Visual Design", "Trend Analysis", "Influencer Marketing", "Community Building", "Photography"],
    about: "A Computer Science student, content creator, and aspiring entrepreneur with a passion for creativity, branding, and innovation. I enjoy building engaging digital experiences, collaborating on impactful projects, and contributing to E-Cell initiatives that encourage entrepreneurship.",
    email: "hansinig163@gmail.com",
    linkedin: "https://www.linkedin.com/in/g-hansini-1497b1316?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    github: "https://github.com/hansinig163",
    instagram: "https://instagram.com/hunivers_.x",
    portfolio: "",
    resumeUrl: "/resume/hansini.pdf",
    img: "/images/hansini.jpeg",
    achievements: ["Built Instagram community of 6,000+ followers", "Collaborated with multiple beauty, fashion, and lifestyle brands", "Developed AI and Streamlit-based projects during AI internship", "Actively involved in entrepreneurship and creative branding initiatives"],
    isCore: true,
    memberSince: "June 2026",
    status: "Core Executive Member",
    location: "Hyderabad, Telangana",
    availability: "Available for Collaboration",
    responsibilities: [
      "Manage content calendar posts and scheduling",
      "Coordinate visual grid layouts across social platforms",
      "Track daily updates and social media performance",
      "Plan and schedule content across multiple platforms",
      "Create visually appealing posts using design tools",
      "Monitor social media trends and adapt strategy",
      "Track performance metrics and provide insights",
      "Ensure consistent brand messaging across channels"
    ],
    roleImpact: "The Social Media & Influencer team member ensures consistent and engaging social media presence — managing content calendars, creating visual posts, tracking performance, and optimizing strategy to maximize reach and engagement.",
    projectProgresses: [
      { name: "Handmade Brand - Crochet Products & Customized Tumblers", progress: 85 },
      { name: "Lifestyle & UGC Content Creation", progress: 80 },
      { name: "AI & Streamlit Projects", progress: 75 },
      { name: "Brand Collaborations", progress: 70 }
    ],
    stats: [
      { label: "Instagram Followers", value: "6K+", icon: "�" },
      { label: "Brand Collaborations", value: "10+", icon: "🤝" },
      { label: "CGPA", value: "9.00", icon: "📊" },
      { label: "Years in E-Cell", value: "1", icon: "⭐" },
      { label: "Projects Built", value: "3+", icon: "💻" },
      { label: "Content Created", value: "100+", icon: "✍️" }
    ],
    leadershipSkills: ["Content Creation", "Digital Branding", "Social Media Strategy", "UGC Content", "Entrepreneurship", "Creative Branding", "Community Building", "Visual Design"],
    certificates: ["Summer of AI Internship Certificate", "Campus Ambassador Certification of Grow Your Skills"],
    education: { degree: "B.Tech", college: "Pallavi Engineering College", dept: "Computer Science & Engineering", cgpa: "9.00", gradYear: "2028" },
    interests: ["Content Creation", "Digital Branding", "Social Media", "Entrepreneurship", "Creative Branding", "Photography", "AI & Technology", "Innovation"],
    favoriteQuote: "Consistency is key to social media success.",
    personalWebsite: ""
  },
  {
    id: "18",
    name: "P. Varshitha Reddy",
    role: "Social Media & Influencer Team Member",
    domain: "Social Media & Influencer",
    dept: "Computer Science & Engineering (CSE)",
    year: "3rd Year",
    skills: ["Software Development", "Artificial Intelligence", "Prompt Engineering", "Digital Branding", "Content Creation", "Full-Stack Web Development", "C Programming", "Python", "Java", "HTML", "Social Media Strategy", "Innovation"],
    about: "Motivated Computer Science Engineering student with an 8.76 CGPA and a strong interest in software development, Artificial Intelligence, Prompt Engineering, and entrepreneurship. Passionate about digital branding, content creation, and innovation. As a Social Media & Influencer Team Member, I aim to strengthen E-Cell's digital presence through creative storytelling and impactful content.",
    email: "varshithareddy1208@gmail.com",
    linkedin: "https://www.linkedin.com/in/varshitha-reddy-pinnapu-reddy-7b2a65323",
    github: "https://github.com/codebyvarsh",
    instagram: "https://www.instagram.com/varshithareddyy.yy",
    portfolio: "",
    resumeUrl: "/resume/varshitha.pdf",
    img: "/images/varshitha.jpeg",
    achievements: ["Selected as Social Media & Influencer Team Member in College E-Cell", "Active member of CSI Photography Team", "Co-Founder of Knot & Sip startup"],
    isCore: true,
    memberSince: "July 2026",
    status: "Core Executive Member",
    location: "Hyderabad, Telangana",
    availability: "Available for Collaboration",
    responsibilities: [
      "Analyze viral trends and content curation strategies",
      "Write professional articles on entrepreneurship and innovation",
      "Build and nurture professional networks on LinkedIn",
      "Create thought leadership content for E-Cell's growth",
      "Write articles highlighting E-Cell's achievements and member stories",
      "Engage with industry professionals and expand digital footprint",
      "Manage LinkedIn operations and professional branding",
      "Track LinkedIn analytics and optimize content strategy"
    ],
    roleImpact: "The Social Media & Influencer Team Member strengthens E-Cell's professional presence — analyzing trends, creating thought leadership content, building LinkedIn networks, and engaging with industry professionals to expand the cell's influence.",
    projectProgresses: [
      { name: "Knot & Sip - Handmade Crochet Startup", progress: 85 },
      { name: "Full-Stack Web Development Learning", progress: 70 },
      { name: "Digital Branding & Content Creation", progress: 65 },
      { name: "AI & Prompt Engineering Projects", progress: 50 }
    ],
    stats: [
      { label: "CGPA", value: "8.76", icon: "📊" },
      { label: "Projects Built", value: "3+", icon: "💻" },
      { label: "Programming Languages", value: "4", icon: "�" },
      { label: "Years in E-Cell", value: "1", icon: "⭐" },
      { label: "Startup Co-Founded", value: "1", icon: "🚀" },
      { label: "Certifications", value: "2", icon: "�" }
    ],
    leadershipSkills: ["Software Development", "Artificial Intelligence", "Digital Branding", "Content Creation", "Social Media Strategy", "Innovation", "Entrepreneurship", "Team Collaboration"],
    certificates: ["Introduction to Generative AI Studio", "Campus Ambassador – Grow Your Skills"],
    education: { degree: "B.Tech", college: "Pallavi Engineering College", dept: "Computer Science & Engineering (CSE)", cgpa: "8.76", gradYear: "2028" },
    interests: ["Software Development", "Artificial Intelligence", "Prompt Engineering", "Digital Branding", "Content Creation", "Entrepreneurship", "Photography", "Innovation"],
    favoriteQuote: "Your personal brand is what people say about you when you're not in the room.",
    personalWebsite: ""
  },
];

const INITIAL_EVENTS: EventItem[] = [
  { id: "e1", title: "E-Summit 2025", date: "Feb 2025", description: "Our flagship annual summit hosting panel talks, hackathons, and pitch desks.", img: "/images/president.png" },
  { id: "e2", title: "Startup Conclave", date: "Nov 2025", description: "A regional showcase inviting 20+ startups to network with angel investors.", img: "/images/vp.png" },
  { id: "e3", title: "HackStart Hackathon", date: "Oct 2025", description: "48-hour prototype challenge aimed at solving immediate campus issues.", img: "/images/tech.png" }
];


// Service Layer
export const TeamService = {
  subscribeMembers(callback: (members: Member[]) => void) {
    if (db) {
      return onSnapshot(collection(db, "members"), (snapshot) => {
        const members: Member[] = [];
        snapshot.forEach((doc) => {
          members.push({ id: doc.id, ...doc.data() } as Member);
        });
        // Always use INITIAL_MEMBERS to ensure all 18 members are shown
        callback(INITIAL_MEMBERS);
      }, () => {
        callback(INITIAL_MEMBERS);
      });
    } else {
      callback(INITIAL_MEMBERS);
      // Return unsubscribe dummy
      return () => { };
    }
  },

  getLocalMembers(): Member[] {
    if (typeof window !== "undefined") {
      // Force cache reset to ensure all 18 members load
      localStorage.removeItem("ecell_members");
      localStorage.removeItem("ecell_data_version");
      const DATA_VERSION = "v5";
      localStorage.setItem("ecell_data_version", DATA_VERSION);
      localStorage.setItem("ecell_members", JSON.stringify(INITIAL_MEMBERS));
      return INITIAL_MEMBERS;
    }
    return INITIAL_MEMBERS;
  },

  async addMember(member: Omit<Member, "id">): Promise<string> {
    if (db) {
      const docRef = await addDoc(collection(db, "members"), member);
      return docRef.id;
    } else {
      const members = this.getLocalMembers();
      const newId = Date.now().toString();
      const newMember = { ...member, id: newId };
      members.push(newMember);
      localStorage.setItem("ecell_members", JSON.stringify(members));
      return newId;
    }
  },

  async updateMember(id: string, member: Partial<Member>): Promise<void> {
    if (db) {
      const docRef = doc(db, "members", id);
      await updateDoc(docRef, member as any);
    } else {
      const members = this.getLocalMembers();
      const index = members.findIndex(m => m.id === id);
      if (index !== -1) {
        members[index] = { ...members[index], ...member };
        localStorage.setItem("ecell_members", JSON.stringify(members));
      }
    }
  },

  async deleteMember(id: string): Promise<void> {
    if (db) {
      const docRef = doc(db, "members", id);
      await deleteDoc(docRef);
    } else {
      const members = this.getLocalMembers();
      const filtered = members.filter(m => m.id !== id);
      localStorage.setItem("ecell_members", JSON.stringify(filtered));
    }
  },

  // Event handlers
  getLocalEvents(): EventItem[] {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("ecell_events");
      if (stored) return JSON.parse(stored);
      localStorage.setItem("ecell_events", JSON.stringify(INITIAL_EVENTS));
    }
    return INITIAL_EVENTS;
  },

  async addEvent(event: Omit<EventItem, "id">): Promise<string> {
    const events = this.getLocalEvents();
    const newId = Date.now().toString();
    const newEvent = { ...event, id: newId };
    events.push(newEvent);
    localStorage.setItem("ecell_events", JSON.stringify(events));
    return newId;
  },

  async deleteEvent(id: string): Promise<void> {
    const events = this.getLocalEvents();
    const filtered = events.filter(e => e.id !== id);
    localStorage.setItem("ecell_events", JSON.stringify(filtered));
  }
};
