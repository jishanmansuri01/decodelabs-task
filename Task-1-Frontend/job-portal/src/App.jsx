import { useState } from "react";

const COLORS = {
  primary: "#4F46E5",
  primaryLight: "#EEF2FF",
  primaryDark: "#3730A3",
  accent: "#06B6D4",
  bg: "#F8FAFC",
  white: "#FFFFFF",
  text: "#0F172A",
  textMuted: "#64748B",
  textLight: "#94A3B8",
  border: "#E2E8F0",
  success: "#10B981",
  successLight: "#ECFDF5",
  warning: "#F59E0B",
  warningLight: "#FFFBEB",
  danger: "#EF4444",
  dangerLight: "#FEF2F2",
};

const MOCK_JOBS = [
  { id: 1, title: "Frontend Developer", company: "TechNova Pvt Ltd", location: "Bangalore, India", type: "Full-time", salary: "₹8-12 LPA", tags: ["React", "TypeScript", "Tailwind"], description: "We are looking for a skilled frontend developer to join our growing product team. You will work on building beautiful, responsive web applications used by thousands of users.", requirements: ["3+ years React experience", "Strong CSS/HTML fundamentals", "Experience with REST APIs", "Good communication skills"], postedAt: "2 days ago", logo: "TN", logoColor: "#4F46E5" },
  { id: 2, title: "Full Stack Engineer", company: "CloudBridge Solutions", location: "Remote", type: "Full-time", salary: "₹12-18 LPA", tags: ["Node.js", "React", "MongoDB"], description: "Join our fast-growing startup as a full stack engineer. You'll own features end-to-end and work directly with founders.", requirements: ["Node.js & Express", "React.js", "MongoDB / PostgreSQL", "Docker basics"], postedAt: "1 day ago", logo: "CB", logoColor: "#06B6D4" },
  { id: 3, title: "UI/UX Designer", company: "PixelCraft Studio", location: "Mumbai, India", type: "Contract", salary: "₹6-9 LPA", tags: ["Figma", "UX Research", "Prototyping"], description: "We're looking for a creative UI/UX designer who can transform complex problems into elegant user experiences.", requirements: ["Figma proficiency", "Portfolio required", "User research experience", "Mobile-first thinking"], postedAt: "3 days ago", logo: "PC", logoColor: "#F59E0B" },
  { id: 4, title: "Backend Developer", company: "DataStream Inc", location: "Pune, India", type: "Full-time", salary: "₹10-15 LPA", tags: ["Python", "Django", "PostgreSQL"], description: "Build and maintain scalable backend services for our data analytics platform serving enterprise clients.", requirements: ["Python & Django", "PostgreSQL", "REST API design", "Redis / Celery"], postedAt: "5 days ago", logo: "DS", logoColor: "#10B981" },
  { id: 5, title: "DevOps Engineer", company: "Infracore Systems", location: "Hyderabad, India", type: "Full-time", salary: "₹14-20 LPA", tags: ["AWS", "Docker", "Kubernetes"], description: "Own the infrastructure, CI/CD pipelines and cloud deployments for a suite of B2B SaaS products.", requirements: ["AWS certified preferred", "Docker & Kubernetes", "CI/CD pipelines", "Linux systems"], postedAt: "1 week ago", logo: "IC", logoColor: "#8B5CF6" },
  { id: 6, title: "React Native Developer", company: "MobileFirst Labs", location: "Remote", type: "Part-time", salary: "₹7-11 LPA", tags: ["React Native", "iOS", "Android"], description: "Build cross-platform mobile apps for our fintech client base. Flexible hours, fully remote.", requirements: ["React Native", "Expo or bare workflow", "REST API integration", "App Store deployment"], postedAt: "4 days ago", logo: "ML", logoColor: "#EF4444" },
];

const EMPLOYER_JOBS = [
  { id: 1, title: "Frontend Developer", applicants: 14, status: "Active", postedAt: "2 days ago" },
  { id: 2, title: "Full Stack Engineer", applicants: 7, status: "Active", postedAt: "1 day ago" },
  { id: 3, title: "Product Manager", applicants: 22, status: "Closed", postedAt: "2 weeks ago" },
];

const css = `
@import url('https://fonts.googleapis.com/css?family=Inter:wght@400;500;600;700&display=swap');
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 100%; min-height: 100vh; }
#root { width: 100%; min-height: 100vh; }
body { font-family: 'Inter', -apple-system, sans-serif; background: #F8FAFC; color: #0F172A; }
.app-root { width: 100%; min-height: 100vh; display: flex; flex-direction: column; }
.nav { background: #fff; border-bottom: 1px solid #E2E8F0; padding: 0 2.5rem; display: flex; align-items: center; justify-content: space-between; height: 64px; position: sticky; top: 0; z-index: 100; width: 100%; }
.nav-logo { font-size: 1.25rem; font-weight: 700; color: #4F46E5; letter-spacing: -0.5px; cursor: pointer; }
.nav-logo span { color: #06B6D4; }
.nav-links { display: flex; gap: 0.25rem; align-items: center; }
.nav-link { padding: 0.5rem 1rem; border-radius: 8px; font-size: 0.875rem; font-weight: 500; color: #64748B; cursor: pointer; border: none; background: none; transition: all 0.15s; }
.nav-link:hover { background: #EEF2FF; color: #4F46E5; }
.nav-link.active { color: #4F46E5; background: #EEF2FF; }
.nav-actions { display: flex; gap: 0.75rem; align-items: center; }
.btn { padding: 0.5rem 1.25rem; border-radius: 8px; font-size: 0.875rem; font-weight: 500; cursor: pointer; border: none; transition: all 0.15s; }
.btn-outline { background: transparent; border: 1.5px solid #E2E8F0; color: #0F172A; }
.btn-outline:hover { border-color: #4F46E5; color: #4F46E5; background: #EEF2FF; }
.btn-primary { background: #4F46E5; color: white; }
.btn-primary:hover { background: #3730A3; }
.btn-sm { padding: 0.35rem 0.9rem; font-size: 0.8rem; }
.btn-danger { background: #FEF2F2; color: #EF4444; border: none; }
.hero { background: linear-gradient(135deg, #EEF2FF 0%, #F0FDFE 100%); padding: 5rem 2.5rem; text-align: center; border-bottom: 1px solid #E2E8F0; width: 100%; }
.hero-inner { max-width: 700px; margin: 0 auto; }
.hero h1 { font-size: 3rem; font-weight: 700; color: #0F172A; line-height: 1.15; letter-spacing: -1px; margin-bottom: 1rem; }
.hero h1 span { color: #4F46E5; }
.hero p { font-size: 1.1rem; color: #64748B; margin-bottom: 2rem; max-width: 520px; margin-left: auto; margin-right: auto; }
.search-bar { display: flex; background: #ffffff; border: 1.5px solid #E2E8F0; border-radius: 12px; overflow: hidden; max-width: 600px; margin: 0 auto 1.5rem; box-shadow: 0 4px 24px rgba(79,70,229,0.08); }
.search-bar input { flex: 1; padding: 0.85rem 1.25rem; border: none; outline: none; font-size: 0.95rem; background: #ffffff; color: #0F172A; font-family: inherit; }
.search-bar input::placeholder { color: #94A3B8; }
.search-bar button { padding: 0.85rem 1.75rem; background: #4F46E5; color: white; border: none; cursor: pointer; font-weight: 600; font-size: 0.9rem; font-family: inherit; transition: background 0.15s; }
.search-bar button:hover { background: #3730A3; }
.hero-stats { display: flex; justify-content: center; gap: 3rem; margin-top: 3rem; }
.hero-stat .num { font-size: 1.75rem; font-weight: 700; color: #4F46E5; }
.hero-stat .lbl { font-size: 0.8rem; color: #64748B; margin-top: 2px; }
.section { padding: 3rem 2.5rem; width: 100%; max-width: 1200px; margin: 0 auto; }
.section-full { width: 100%; }
.section-title { font-size: 1.4rem; font-weight: 700; margin-bottom: 0.35rem; }
.section-sub { font-size: 0.9rem; color: #64748B; margin-bottom: 1.75rem; }
.jobs-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1rem; }
.job-card { background: #fff; border: 1.5px solid #E2E8F0; border-radius: 14px; padding: 1.25rem; cursor: pointer; transition: all 0.15s; }
.job-card:hover { border-color: #4F46E5; box-shadow: 0 4px 20px rgba(79,70,229,0.1); transform: translateY(-2px); }
.job-card-header { display: flex; align-items: flex-start; gap: 0.85rem; margin-bottom: 0.85rem; }
.job-logo { border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 700; color: white; flex-shrink: 0; }
.job-title { font-size: 1rem; font-weight: 600; margin-bottom: 2px; }
.job-company { font-size: 0.825rem; color: #64748B; }
.job-meta { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.85rem; }
.meta-chip { font-size: 0.775rem; color: #64748B; background: #F8FAFC; padding: 3px 8px; border-radius: 6px; border: 1px solid #E2E8F0; }
.job-tags { display: flex; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 0.85rem; }
.tag { font-size: 0.75rem; padding: 3px 10px; border-radius: 20px; background: #EEF2FF; color: #4F46E5; font-weight: 500; }
.job-footer { display: flex; align-items: center; justify-content: space-between; }
.job-salary { font-size: 0.875rem; font-weight: 600; color: #10B981; }
.type-badge { font-size: 0.7rem; padding: 2px 8px; border-radius: 20px; font-weight: 500; }
.type-full { background: #ECFDF5; color: #10B981; }
.type-part { background: #FFFBEB; color: #F59E0B; }
.type-contract { background: #FEF3C7; color: #92400E; }

/* ==================== UPDATED UI FIXES ==================== */
.filters-bar { 
  display: flex; 
  gap: 0.75rem; 
  align-items: center; 
  margin-bottom: 1.5rem; 
  flex-wrap: wrap; 
  width: 100%; 
}

/* Fix: Ensures typing input values are fully visible (Dark Slate text) */
.filters-bar input,
.form-group input,
.form-group textarea,
.form-group select {
  color: #0F172A !important; 
  background-color: #FFFFFF !important;
}

/* Fix autofill colors blocking text rendering visibility */
.filters-bar input:-webkit-autofill,
.filters-bar input:-webkit-autofill:hover, 
.filters-bar input:-webkit-autofill:focus,
.form-group input:-webkit-autofill,
.form-group input:-webkit-autofill:hover, 
.form-group input:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0 30px white inset !important;
  box-shadow: 0 0 0 30px white inset !important;
  -webkit-text-fill-color: #0F172A !important;
}

/* Fix: Prevents squished filters by introducing uniform container parameters */
.filters-bar input {
  padding: 0.45rem 0.9rem; 
  border: 1.5px solid #E2E8F0; 
  border-radius: 8px;
  font-size: 0.85rem; 
  outline: none; 
  flex: 1;
  min-width: 260px; 
  font-family: inherit;
}

.filter-select { 
  padding: 0.6rem 2.2rem 0.6rem 1rem;
  border: 1.5px solid #E2E8F0;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  background: #ffffff url("data:image/svg+xml;charset=UTF-8,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%2364748B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") no-repeat right 0.85rem center;
  color: #0F172A;
  cursor: pointer;
  outline: none;
  font-family: inherit;
  min-width: 160px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  transition: border 0.15s; 
}
/* ========================================================== */

.filter-select:focus { border-color: #4F46E5; }
.detail-wrap { max-width: 860px; margin: 2rem auto; padding: 0 1.5rem; }
.detail-card { background: white; border: 1.5px solid #E2E8F0; border-radius: 16px; padding: 2rem; }
.detail-header { display: flex; gap: 1.25rem; align-items: flex-start; margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid #E2E8F0; }
.detail-title { font-size: 1.5rem; font-weight: 700; margin-bottom: 4px; }
.detail-company { font-size: 1rem; color: #64748B; margin-bottom: 0.75rem; }
.detail-section { margin-bottom: 1.5rem; }
.detail-section h3 { font-size: 1rem; font-weight: 600; margin-bottom: 0.6rem; }
.detail-section p { font-size: 0.9rem; color: #64748B; line-height: 1.7; }
.req-list { list-style: none; display: flex; flex-direction: column; gap: 0.4rem; }
.req-list li { font-size: 0.9rem; color: #64748B; display: flex; align-items: center; gap: 8px; }
.req-list li::before { content: '•'; color: #10B981; font-weight: 700; }
.back-btn { display: flex; align-items: center; gap: 6px; font-size: 0.875rem; color: #64748B; cursor: pointer; margin-bottom: 1.25rem; background: none; border: none; padding: 0; }
.back-btn:hover { color: #4F46E5; }
.form-card { background: white; border: 1.5px solid #E2E8F0; border-radius: 16px; padding: 2rem; max-width: 580px; margin: 2rem auto; }
.form-title { font-size: 1.25rem; font-weight: 700; margin-bottom: 0.3rem; }
.form-sub { font-size: 0.875rem; color: #64748B; margin-bottom: 1.5rem; }
.form-group { margin-bottom: 1.1rem; }
.form-group label { display: block; font-size: 0.825rem; font-weight: 500; margin-bottom: 0.35rem; }
.form-group input, .form-group textarea, .form-group select { width: 100%; padding: 0.6rem 0.9rem; border: 1.5px solid #E2E8F0; border-radius: 8px; font-size: 0.875rem; outline: none; font-family: inherit; background: white; transition: border 0.15s; }
.form-group input:focus, .form-group textarea:focus, .form-group select:focus { border-color: #4F46E5; }
.form-group textarea { resize: vertical; min-height: 100px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.form-actions { display: flex; gap: 0.75rem; margin-top: 1.5rem; }
.auth-wrap { min-height: calc(100vh - 64px); display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #EEF2FF 0%, #F0FDFE 100%); padding: 2rem; width: 100%; }
.auth-card { background: white; border: 1.5px solid #E2E8F0; border-radius: 16px; padding: 2.25rem; width: 100%; max-width: 420px; }
.auth-logo { font-size: 1.5rem; font-weight: 700; color: #4F46E5; text-align: center; margin-bottom: 0.25rem; }
.auth-logo span { color: #06B6D4; }
.auth-tagline { font-size: 0.85rem; color: #64748B; text-align: center; margin-bottom: 1.75rem; }
.auth-tabs { display: flex; background: #F8FAFC; border-radius: 10px; padding: 4px; margin-bottom: 1.5rem; }
.auth-tab { flex: 1; padding: 0.5rem; text-align: center; font-size: 0.85rem; font-weight: 500; border-radius: 8px; cursor: pointer; color: #64748B; border: none; background: none; transition: all 0.15s; }
.auth-tab.active { background: white; color: #4F46E5; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
.divider-text { display: flex; align-items: center; gap: 0.75rem; margin: 1rem 0; }
.divider-text span { font-size: 0.75rem; color: #94A3B8; }
.divider-text::before, .divider-text::after { content: ""; flex: 1; height: 1px; background: #E2E8F0; }
.role-select { display: flex; gap: 0.75rem; margin-bottom: 1.1rem; }
.role-select .role-opt { flex: 1; border: 1.5px solid #E2E8F0; border-radius: 10px; padding: 0.75rem; text-align: center; cursor: pointer; transition: all 0.15s; }
.role-select .role-opt.active { border-color: #4F46E5; background: #EEF2FF; }
.role-label { font-size: 0.8rem; font-weight: 500; }
.dash-wrap { max-width: 1200px; width: 100%; margin: 0 auto; padding: 2rem 2.5rem; }
.dash-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.75rem; }
.dash-title { font-size: 1.4rem; font-weight: 700; }
.dash-sub { font-size: 0.875rem; color: #64748B; }
.stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2rem; }
.stat-card { background: white; border: 1.5px solid #E2E8F0; border-radius: 14px; padding: 1.25rem; }
.stat-label { font-size: 0.8rem; color: #64748B; margin-bottom: 0.5rem; }
.stat-num { font-size: 2rem; font-weight: 700; }
.stat-change { font-size: 0.75rem; color: #10B981; margin-top: 4px; }
.dash-table { background: white; border: 1.5px solid #E2E8F0; border-radius: 14px; overflow: hidden; }
.table-head { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; padding: 0.85rem 1.25rem; background: #F8FAFC; border-bottom: 1px solid #E2E8F0; font-size: 0.775rem; font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 0.05em; }
.table-row { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; padding: 1rem 1.25rem; border-bottom: 1px solid #E2E8F0; align-items: center; font-size: 0.875rem; }
.table-row:last-child { border-bottom: none; }
.table-row:hover { background: #F8FAFC; }
.status-badge { font-size: 0.75rem; padding: 3px 10px; border-radius: 20px; font-weight: 500; display: inline-block; }
.status-active { background: #ECFDF5; color: #10B981; }
.status-closed { background: #FEF2F2; color: #EF4444; }
.toast { position: fixed; bottom: 1.5rem; right: 1.5rem; background: #0F172A; color: white; padding: 0.75rem 1.25rem; border-radius: 10px; font-size: 0.875rem; z-index: 999; }
`;

function LogoCircle({ initials, color, size = 44 }) {
  return <div className="job-logo" style={{ backgroundColor: color, width: size, height: size, borderRadius: size * 0.23, fontSize: size * 0.3 }}>{initials}</div>;
}

function TypeBadge({ type }) {
  const cls = type === "Full-time" ? "type-full" : type === "Part-time" ? "type-part" : "type-contract";
  return <span className={`type-badge ${cls}`}>{type}</span>;
}

function JobCard({ job, onClick }) {
  return (
    <div className="job-card" onClick={() => onClick(job)}>
      <div className="job-card-header">
        <LogoCircle initials={job.logo} color={job.logoColor} />
        <div style={{ flex: 1 }}>
          <div className="job-title">{job.title}</div>
          <div className="job-company">{job.company}</div>
        </div>
        <TypeBadge type={job.type} />
      </div>
      <div className="job-meta">
        <span className="meta-chip">{job.location}</span>
        <span className="meta-chip">{job.postedAt}</span>
      </div>
      <div className="job-tags">{job.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
      <div className="job-footer">
        <span className="job-salary">{job.salary}</span>
        <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>View details →</span>
      </div>
    </div>
  );
}

function Navbar({ page, setPage, user, setUser }) {
  return (
    <nav className="nav">
      <div className="nav-logo" onClick={() => setPage("home")}>Job<span>Spark</span></div>
      <div className="nav-links">
        <button className={`nav-link ${page === "home" ? "active" : ""}`} onClick={() => setPage("home")}>Home</button>
        <button className={`nav-link ${page === "jobs" ? "active" : ""}`} onClick={() => setPage("jobs")}>Browse Jobs</button>
        {user?.role === "employer" && <button className={`nav-link ${page === "dashboard" ? "active" : ""}`} onClick={() => setPage("dashboard")}>Dashboard</button>}
        {user?.role === "employer" && <button className={`nav-link ${page === "post" ? "active" : ""}`} onClick={() => setPage("post")}>Post a Job</button>}
      </div>
      <div className="nav-actions">
        {user ? (
          <>
            <span style={{ fontSize: "0.85rem", color: "#64748B" }}>{user.name}</span>
            <button className="btn btn-outline" onClick={() => setUser(null)}>Logout</button>
          </>
        ) : (
          <>
            <button className="btn btn-outline" onClick={() => setPage("login")}>Log in</button>
            <button className="btn btn-primary" onClick={() => setPage("register")}>Sign up</button>
          </>
        )}
      </div>
    </nav>
  );
}

function HomePage({ setPage, setSelectedJob }) {
  const [query, setQuery] = useState("");
  return (
    <div>
      <div className="hero">
        <h1>Find your next <span>great opportunity</span></h1>
        <p>Thousands of jobs from top companies applied in minutes, not hours.</p>
        <form className="search-bar" onSubmit={e => { e.preventDefault(); setPage("jobs"); }}>
          <input placeholder="Search job title, company or skill..." value={query} onChange={e => setQuery(e.target.value)} />
          <button type="submit">Search Jobs</button>
        </form>
        <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          {["React", "Node.js", "Python", "UI/UX", "DevOps"].map(tag => (
            <span key={tag} onClick={() => setPage("jobs")} style={{ cursor: "pointer", fontSize: "0.8rem", padding: "4px 14px", borderRadius: "20px", background: "white", border: "1.5px solid #E2E8F0", color: "#64748B" }}>{tag}</span>
          ))}
        </div>
        <div className="hero-stats">
          <div className="hero-stat"><div className="num">1,200+</div><div className="lbl">Jobs listed</div></div>
          <div className="hero-stat"><div className="num">340+</div><div className="lbl">Companies hiring</div></div>
          <div className="hero-stat"><div className="num">8,500+</div><div className="lbl">Job seekers</div></div>
        </div>
      </div>
      <div className="section">
        <div className="section-title">Featured Jobs</div>
        <div className="section-sub">Handpicked opportunities updated daily</div>
        <div className="jobs-grid">
          {MOCK_JOBS.slice(0, 3).map(job => <JobCard key={job.id} job={job} onClick={j => { setSelectedJob(j); setPage("detail"); }} />)}
        </div>
        <div style={{ textAlign: "center", marginTop: "1.75rem" }}>
          <button className="btn btn-outline" onClick={() => setPage("jobs")}>View all jobs →</button>
        </div>
      </div>
      <div style={{ background: "#fff", borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #E2E8F0", width: "100%" }}>
        <div className="section" style={{ textAlign: "center", padding: "3rem 2.5rem" }}>
          <div className="section-title">Are you hiring?</div>
          <div className="section-sub">Post jobs for free and reach thousands of qualified candidates</div>
          <button className="btn btn-primary" onClick={() => setPage("register")}>Start hiring today →</button>
        </div>
      </div>
    </div>
  );
}

function JobsPage({ setPage, setSelectedJob, jobsList }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");

  // FIX: Read from 'jobsList' prop instead of the static hardcoded 'MOCK_JOBS'
  const filtered = jobsList.filter(j => {
    const ms = j.title.toLowerCase().includes(search.toLowerCase()) ||
               j.company.toLowerCase().includes(search.toLowerCase()) || 
               j.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const mt = typeFilter === "All" || j.type === typeFilter;
    const ml = locationFilter === "All" || j.location.toLowerCase().includes(locationFilter.toLowerCase());
    return ms && mt && ml;
  });

  return (
    <div className="section">
      <div className="section-title">Browse Jobs</div>
      <div className="section-sub">Find the perfect role for your skills</div>
      
      <div className="filters-bar">
        <input 
          placeholder="Search title, company, skill..." 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
        />
        
        <select className="filter-select" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
          <option>All</option>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Contract</option>
        </select>
        
        <select className="filter-select" value={locationFilter} onChange={e => setLocationFilter(e.target.value)}>
          <option>All</option>
          <option>Remote</option>
          <option>Bangalore</option>
          <option>Mumbai</option>
          <option>Pune</option>
          <option>Hyderabad</option>
        </select>
        
        <span style={{ fontSize: "0.85rem", color: "#64748B", marginLeft: "auto" }}>
          {filtered.length} job{filtered.length !== 1 ? "s" : ""} found
        </span>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "#64748B" }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🕵️‍♂️</div>
          <div style={{ fontWeight: 500 }}>No jobs match your search</div>
        </div>
      ) : (
        <div className="jobs-grid">
          {filtered.map(job => (
            <JobCard key={job.id} job={job} onClick={j => { setSelectedJob(j); setPage("detail"); }} />
          ))}
        </div>
      )}
    </div>
  );
}

function JobDetailPage({ job, setPage, user }) {
  if (!job) return null;
  return (
    <div style={{ minHeight: "calc(100vh - 64px)" }}>
      <div className="detail-wrap">
        <button className="back-btn" onClick={() => setPage("jobs")}>← Back to jobs</button>
        <div className="detail-card">
          <div className="detail-header">
            <LogoCircle initials={job.logo} color={job.logoColor} size={60} />
            <div style={{ flex: 1 }}>
              <div className="detail-title">{job.title}</div>
              <div className="detail-company">{job.company} · {job.location}</div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "4px" }}>
                <TypeBadge type={job.type} />
                {job.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#10B981" }}>{job.salary}</div>
              <div style={{ fontSize: "0.75rem", color: "#94A3B8", marginTop: 4 }}>Posted {job.postedAt}</div>
            </div>
          </div>
          <div className="detail-section"><h3>About this role</h3><p>{job.description}</p></div>
          <div className="detail-section">
            <h3>Requirements</h3>
            <ul className="req-list">{job.requirements.map(r => <li key={r}>{r}</li>)}</ul>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", paddingTop: "1rem", borderTop: "1px solid #E2E8F0" }}>
            {user ? <button className="btn btn-primary" onClick={() => setPage("apply")}>Apply Now</button> : <button className="btn btn-primary" onClick={() => setPage("login")}>Log in to Apply</button>}
            <button className="btn btn-outline">Save Job</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ApplyPage({ job, setPage }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", coverLetter: "", resume: "" });
  if (submitted) return (
    <div style={{ minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="form-card" style={{ textAlign: "center", padding: "3rem" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🚀</div>
        <div style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>Application submitted!</div>
        <div style={{ fontSize: "0.9rem", color: "#64748B", marginBottom: "1.5rem" }}>Your application for <strong>{job?.title}</strong> at <strong>{job?.company}</strong> has been sent!</div>
        <button className="btn btn-primary" onClick={() => setPage("jobs")}>Browse more jobs</button>
      </div>
    </div>
  );
  return (
    <div style={{ minHeight: "calc(100vh - 64px)" }}>
      <div className="form-card">
        <button className="back-btn" onClick={() => setPage("detail")} style={{ marginBottom: "1rem" }}>← Back to job</button>
        <div className="form-title">Apply for {job?.title}</div>
        <div className="form-sub">{job?.company} · {job?.location}</div>
        <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
          <div className="form-row">
            <div className="form-group"><label>Full Name *</label><input required placeholder="Jishan Mansuri" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
            <div className="form-group"><label>Phone Number *</label><input required placeholder="+91 9876543210" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
          </div>
          <div className="form-group"><label>Email Address *</label><input required type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
          <div className="form-group"><label>Resume / Portfolio URL</label><input placeholder="https://drive.google.com/your-resume" value={form.resume} onChange={e => setForm({...form, resume: e.target.value})} /></div>
          <div className="form-group"><label>Cover Letter</label><textarea placeholder="Tell the employer why you're a great fit..." value={form.coverLetter} onChange={e => setForm({...form, coverLetter: e.target.value})} /></div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Submit Application</button>
            <button type="button" className="btn btn-outline" onClick={() => setPage("detail")}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function PostJobPage({ setPage, setToast, onPostJob }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ title: "", company: "", location: "", type: "Full-time", salary: "", tags: "", description: "", requirements: "" });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onPostJob(form);
    setSubmitted(true);
    setToast("Job posted successfully!");
    setTimeout(() => setToast(""), 3000);
  };

  if (submitted) return (
    <div style={{ minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="form-card" style={{ textAlign: "center", padding: "3rem" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
        <div style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>Job posted!</div>
        <div style={{ fontSize: "0.9rem", color: "#64748B", marginBottom: "1.5rem" }}>Your listing is live and candidates can now apply.</div>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
          <button className="btn btn-primary" onClick={() => setPage("dashboard")}>View Dashboard</button>
          <button className="btn btn-outline" onClick={() => setSubmitted(false)}>Post another</button>
        </div>
      </div>
    </div>
  );
  return (
    <div style={{ minHeight: "calc(100vh - 64px)" }}>
      <div className="form-card" style={{ maxWidth: 640 }}>
        <div className="form-title">Post a Job</div>
        <div className="form-sub">Fill in the details to attract the right candidates</div>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group"><label>Job Title *</label><input required placeholder="e.g. Frontend Developer" value={form.title} onChange={e => setForm({...form, title: e.target.value})} /></div>
            <div className="form-group"><label>Company Name *</label><input required placeholder="e.g. TechNova Pvt Ltd" value={form.company} onChange={e => setForm({...form, company: e.target.value})} /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Location *</label><input required placeholder="e.g. Bangalore or Remote" value={form.location} onChange={e => setForm({...form, location: e.target.value})} /></div>
            <div className="form-group"><label>Job Type *</label><select required value={form.type} onChange={e => setForm({...form, type: e.target.value})}><option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option></select></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Salary Range</label><input placeholder="e.g. ₹8–12 LPA" value={form.salary} onChange={e => setForm({...form, salary: e.target.value})} /></div>
            <div className="form-group"><label>Skills / Tags</label><input placeholder="React, Node.js, MongoDB" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} /></div>
          </div>
          <div className="form-group"><label>Job Description *</label><textarea required placeholder="Describe the role, responsibilities..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} style={{ minHeight: 120 }} /></div>
          <div className="form-group"><label>Requirements</label><textarea placeholder="List requirements, one per line..." value={form.requirements} onChange={e => setForm({...form, requirements: e.target.value})} /></div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Post Job</button>
            <button type="button" className="btn btn-outline" onClick={() => setPage("home")}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AuthPage({ setPage, setUser, mode }) {
  const [tab, setTab] = useState(mode === "register" ? "register" : "login");
  const [role, setRole] = useState("seeker");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  function handleSubmit(e) {
    e.preventDefault();
    setUser({ name: form.name || "Jishan Mansuri", email: form.email, role });
    setPage(role === "employer" ? "dashboard" : "jobs");
  }
  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-logo">Job<span>Spark</span></div>
        <div className="auth-tagline">Your career, your spark</div>
        <div className="auth-tabs">
          <button className={`auth-tab ${tab === "login" ? "active" : ""}`} onClick={() => setTab("login")}>Log in</button>
          <button className={`auth-tab ${tab === "register" ? "active" : ""}`} onClick={() => setTab("register")}>Register</button>
        </div>
        {tab === "register" && (
          <div>
            <div style={{ fontSize: "0.825rem", fontWeight: 500, marginBottom: "0.5rem" }}>I am a...</div>
            <div className="role-select">
              <div className={`role-opt ${role === "seeker" ? "active" : ""}`} onClick={() => setRole("seeker")}><div className="role-label">Job Seeker</div></div>
              <div className={`role-opt ${role === "employer" ? "active" : ""}`} onClick={() => setRole("employer")}><div className="role-label">Employer</div></div>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {tab === "register" && <div className="form-group"><label>Full Name *</label><input required placeholder="Jishan Mansuri" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>}
          <div className="form-group"><label>Email Address *</label><input required type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
          <div className="form-group"><label>Password *</label><input required type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({...form, password: e.target.value})} /></div>
          <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "0.7rem" }}>{tab === "login" ? "Log in →" : "Create account →"}</button>
        </form>
        <div className="divider-text"><span>or</span></div>
        <button className="btn btn-outline" style={{ width: "100%", padding: "0.7rem" }}>Continue with Google</button>
        <div style={{ textAlign: "center", marginTop: "1.25rem", fontSize: "0.825rem", color: "#64748B" }}>
          {tab === "login" ? "Don't have an account? " : "Already have an account? "}
          <span style={{ color: "#4F46E5", cursor: "pointer", fontWeight: 500 }} onClick={() => setTab(tab === "login" ? "register" : "login")}>{tab === "login" ? "Sign up" : "Log in"}</span>
        </div>
      </div>
    </div>
  );
}

function DashboardPage({ setPage, currentEmployerJobs }) {
  return (
    <div style={{ minHeight: "calc(100vh - 64px)", background: "#F8FAFC" }}>
      <div className="dash-wrap">
        <div className="dash-header">
          <div><div className="dash-title">Employer Dashboard</div><div className="dash-sub">Manage your job postings and track applications</div></div>
          <button className="btn btn-primary" onClick={() => setPage("post")}>+ Post a Job</button>
        </div>
        <div className="stats-row">
          <div className="stat-card"><div className="stat-label">Active Listings</div><div className="stat-num">{currentEmployerJobs.filter(j => j.status === "Active").length}</div><div className="stat-change">↑ Live data tracking</div></div>
          <div className="stat-card"><div className="stat-label">Total Applications</div><div className="stat-num">{currentEmployerJobs.reduce((acc, curr) => acc + curr.applicants, 0)}</div><div className="stat-change">↑ Active candidates</div></div>
          <div className="stat-card"><div className="stat-label">Profile Views</div><div className="stat-num">318</div><div className="stat-change">↑ 5% this month</div></div>
        </div>
        <div style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.75rem" }}>Your Job Listings</div>
        <div className="dash-table">
          <div className="table-head"><div>Job Title</div><div>Applications</div><div>Status</div><div>Posted</div><div>Actions</div></div>
          {currentEmployerJobs.map(job => (
            <div key={job.id} className="table-row">
              <div style={{ fontWeight: 500 }}>{job.title}</div>
              <div style={{ color: "#64748B" }}>{job.applicants} applicants</div>
              <div><span className={`status-badge ${job.status === "Active" ? "status-active" : "status-closed"}`}>{job.status}</span></div>
              <div style={{ color: "#64748B", fontSize: "0.8rem" }}>{job.postedAt}</div>
              <div style={{ display: "flex", gap: "0.4rem" }}>
                <button className="btn btn-sm btn-outline">Edit</button>
                <button className="btn btn-sm btn-danger">Close</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedJob, setSelectedJob] = useState(null);
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState("");

  const [allJobs, setAllJobs] = useState(MOCK_JOBS);
  const [employerJobs, setEmployerJobs] = useState(EMPLOYER_JOBS);

  const handlePostJob = (newJobData) => {
    const newId = allJobs.length + 1;
    
    const configuredJob = {
      id: newId,
      title: newJobData.title,
      company: newJobData.company,
      location: newJobData.location,
      type: newJobData.type,
      salary: newJobData.salary || "Not Specified",
      tags: newJobData.tags ? newJobData.tags.split(",").map(t => t.trim()) : ["General"],
      description: newJobData.description,
      requirements: newJobData.requirements ? newJobData.requirements.split("\n") : [],
      postedAt: "Just now",
      logo: newJobData.company.substring(0, 2).toUpperCase(),
      logoColor: "#4F46E5"
    };

    const dashboardJob = {
      id: newId,
      title: newJobData.title,
      applicants: 0,
      status: "Active",
      postedAt: "Just now"
    };

    setAllJobs([configuredJob, ...allJobs]);
    setEmployerJobs([dashboardJob, ...employerJobs]);
  };

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage setPage={setPage} setSelectedJob={setSelectedJob} />;
      case "jobs": return <JobsPage setPage={setPage} setSelectedJob={setSelectedJob} jobsList={allJobs} />;
      case "detail": return <JobDetailPage job={selectedJob} setPage={setPage} user={user} />;
      case "apply": return <ApplyPage job={selectedJob} setPage={setPage} />;
      case "post": return <PostJobPage setPage={setPage} setToast={setToast} onPostJob={handlePostJob} />;
      case "login": return <AuthPage setPage={setPage} setUser={setUser} mode="login" />;
      case "register": return <AuthPage setPage={setPage} setUser={setUser} mode="register" />;
      case "dashboard": return <DashboardPage setPage={setPage} currentEmployerJobs={employerJobs} />;
      default: return <HomePage setPage={setPage} setSelectedJob={setSelectedJob} />;
    }
  };

  return (
    <div className="app-root">
      <style>{css}</style>
      <Navbar page={page} setPage={setPage} user={user} setUser={setUser} />
      {renderPage()}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}