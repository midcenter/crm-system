import { useState, useEffect, useRef } from "react";
import logo from "./logo.png";

// в”Ђв”Ђв”Ђ SVG ICONS в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
const Icon = ({ name, size = 20, color = "currentColor" }) => {
  const icons = {
    dashboard: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    crm: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    complaint: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>,
    satisfaction: <><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></>,
    care: <><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></>,
    rss: <><path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/></>,
    social: <><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></>,
    logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
    add: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></>,
    back: <><polyline points="15 18 9 12 15 6"/></>,
    delete: <><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></>,
    search: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    lock: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
    check: <><polyline points="20 6 9 17 4 12"/></>,
    clock: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    tickets: <><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></>,
    chart: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  );
};

// в”Ђв”Ђв”Ђ MOCK AXIOS в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
const mockAxios = {
  post: async (url, data) => {
    await new Promise(r => setTimeout(r, 800));
    if (data.username === "chinka" && data.password === "12345") {
      return { data: { token: "mock-jwt-token-xyz" } };
    }
    throw new Error("Invalid credentials");
  }
};

// в”Ђв”Ђв”Ђ MAIN APP в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [page, setPage] = useState("dashboard");
  const [activeMod, setActiveMod] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [tickets, setTickets] = useState([
    { id: 1, date: "25.04.2026", time: "09:15", regNumber: 1, fullName: "ЖЏli HЙ™sЙ™nov", phone: "+994501234567", vehicleNumber: "10-AA-001", type: "SorДџu", status: "AГ§Д±q" },
    { id: 2, date: "25.04.2026", time: "10:30", regNumber: 2, fullName: "Nigar ЖЏliyeva", phone: "+994551234567", vehicleNumber: "77-BB-222", type: "ЕћikayЙ™t", status: "Д°crada" },
    { id: 3, date: "25.04.2026", time: "11:45", regNumber: 3, fullName: "RЙ™Еџad Quliyev", phone: "+994701234567", vehicleNumber: "90-CC-333", type: "MЙ™lumat", status: "TamamlandД±" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("HamД±sД±");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const modules = [
    { id: "crm",         title: "MÜŞTƏRİ SORĞULARININ İDARƏEDİLMƏSİ",      subtitle: "Qeydiyyat və izləmə", icon: "crm",         color: "#0ea5e9", page: "crm" },
    { id: "complaint",   title: "MÜŞTƏRİ MƏMNUNİYYƏTİ",    subtitle: "Sorğu nəticələrinin qeydiyyatı",       icon: "complaint",   color: "#f59e0b" },
    { id: "satisfaction",title: "MÜŞTƏRİ ŞİKAYƏTLƏRİNİ İDARƏEDİLMƏSİ",   subtitle: "Statistika",               icon: "satisfaction",color: "#10b981" },
    { id: "care",        title: "TEXNİKİ SORĞULARIN İDARƏEDİLMƏSİ",           subtitle: "Dəstək xidməti",           icon: "care",        color: "#8b5cf6" },
    { id: "rss",         title: "_________",                subtitle: "__________________",           icon: "rss",         color: "#ef4444" },
    { id: "social",      title: "________",            subtitle: "____________________",          icon: "social",      color: "#06b6d4" },
  ];

  const stats = [
    { label: "ÜMUMİ SOĞRU SAYI", value: tickets.length, icon: "tickets",  color: "#0ea5e9" },
    { label: "AÇIQ",        value: tickets.filter(t=>t.status==="Açıq").length, icon: "clock", color: "#f59e0b" },
    { label: "İCRADA",      value: tickets.filter(t=>t.status==="İcrada").length, icon: "chart", color: "#8b5cf6" },
    { label: "TAMAMLANDI",  value: tickets.filter(t=>t.status==="Tamamlandı").length, icon: "check", color: "#10b981" },
  ];

  const login = async () => {
    setLoginLoading(true);
    setLoginError("");
    try {
      const res = await mockAxios.post("http://localhost:5000/login", { username, password });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
    } catch {
      setLoginError("İstifadəçi adı və ya şifrə yalnışdır");
    } finally {
      setLoginLoading(false);
    }
  };

  const logout = () => { localStorage.removeItem("token"); setToken(null); };

  const addTicket = () => {
    const now = new Date();
    setTickets(prev => [...prev, {
      id: Date.now(),
      date: now.toLocaleDateString("az-AZ"),
      time: now.toLocaleTimeString("az-AZ", { hour: "2-digit", minute: "2-digit" }),
      regNumber: prev.length + 1,
      fullName: "", phone: "", vehicleNumber: "",
      type: "SorДџu", status: "AГ§Д±q"
    }]);
  };

  const updateField = (id, field, value) =>
    setTickets(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));

  const deleteTicket = (id) => setTickets(prev => prev.filter(t => t.id !== id));

  const filteredTickets = tickets.filter(t => {
    const matchSearch = t.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.phone.includes(searchTerm) || t.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === "HamД±sД±" || t.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --brand: #0d8a9e;
      --brand-dark: #0a6e7f;
      --brand-light: #e0f4f7;
      --accent: #00d4aa;
      --bg: #f0f4f8;
      --sidebar-bg: #0b1e2d;
      --sidebar-hover: #162d3f;
      --card-bg: #ffffff;
      --text: #1a2b3c;
      --muted: #6b7c8d;
      --border: #e2eaf0;
      --danger: #ef4444;
      --warning: #f59e0b;
      --success: #10b981;
      --purple: #8b5cf6;
    }
    body { font-family: 'Outfit', Times new roman; background: var(--bg); color: var(--text); }
    input, select { font-family: 'Outfit', Times new roman; outline: none; }
    button { font-family: 'Outfit', Times new roman; cursor: pointer; }
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #c1d0dc; border-radius: 3px; }

    .login-bg {
      min-height: 100vh; display: flex; align-items: stretch;
      background: linear-gradient(135deg, #0b1e2d 0%, #0d3d4f 50%, #0a6e7f 100%);
      position: relative; overflow: hidden;
    }
    .login-bg::before {
      content: ''; position: absolute; inset: 0;
      background: radial-gradient(circle at 20% 50%, rgba(0,212,170,0.12) 0%, transparent 60%),
                  radial-gradient(circle at 80% 20%, rgba(14,165,233,0.1) 0%, transparent 50%);
    }
    .login-grid {
      position: absolute; inset: 0; opacity: 0.04;
      background-image: linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px);
      background-size: 40px 40px;
    }
    .login-left {
      flex: 1.2; display: flex; flex-direction: column; justify-content: center;
      padding: 60px 80px; position: relative; z-index: 2;
      animation: slideInLeft 0.7s ease;
    }
    .login-brand {
      font-size: 13px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase;
      color: var(--accent); margin-bottom: 40px;
    }
    .login-title {
      font-size: 42px; font-weight: 800; color: #fff; line-height: 1.15; margin-bottom: 20px;
    }
    .login-title span { color: var(--accent); }
    .login-desc { font-size: 15px; color: rgba(255,255,255,0.6); max-width: 480px; line-height: 1.7; margin-bottom: 40px; }
    .login-badge {
      display: inline-flex; align-items: center; gap: 8px;
      background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15);
      border-radius: 100px; padding: 8px 20px; color: rgba(255,255,255,0.8); font-size: 13px;
      backdrop-filter: blur(10px); width: fit-content;
    }
    .login-badge-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); animation: pulse 2s infinite; }
    .login-right {
      flex: 0.8; display: flex; align-items: center; justify-content: center;
      padding: 60px 40px; position: relative; z-index: 2;
    }
    .login-card {
      width: 380px; background: rgba(255,255,255,0.05); backdrop-filter: blur(20px);
      border: 1px solid rgba(255,255,255,0.12); border-radius: 24px; padding: 40px;
      animation: slideInRight 0.7s ease;
    }
    .login-card-title { font-size: 22px; font-weight: 700; color: #fff; margin-bottom: 6px; }
    .login-card-sub { font-size: 13px; color: rgba(255,255,255,0.5); margin-bottom: 32px; }
    .inp-wrap { margin-bottom: 16px; }
    .inp-label { font-size: 12px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 8px; display: block; }
    .inp-field {
      width: 100%; padding: 13px 16px 13px 44px; border-radius: 12px;
      border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.08);
      color: #fff; font-size: 14px; transition: all 0.2s;
    }
    .inp-field::placeholder { color: rgba(255,255,255,0.3); }
    .inp-field:focus { border-color: var(--accent); background: rgba(255,255,255,0.12); box-shadow: 0 0 0 3px rgba(0,212,170,0.15); }
    .inp-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); opacity: 0.5; }
    .login-btn {
      width: 100%; padding: 14px; border-radius: 12px; border: none;
      background: linear-gradient(135deg, var(--accent), var(--brand));
      color: #fff; font-size: 15px; font-weight: 700; letter-spacing: 0.5px;
      transition: all 0.3s; margin-top: 8px;
    }
    .login-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,212,170,0.35); }
    .login-btn:disabled { opacity: 0.7; transform: none; }
    .login-error { background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.3); border-radius: 10px; padding: 10px 14px; color: #fca5a5; font-size: 13px; margin-top: 12px; text-align: center; }
    .carousel-bar {
      position: absolute; bottom: 0; left: 0; right: 0;
      background: rgba(255,255,255,0.04); border-top: 1px solid rgba(255,255,255,0.08);
      padding: 16px 0; overflow: hidden; z-index: 2;
    }
    .carousel-track { display: flex; gap: 50px; animation: marquee 20s linear infinite; width: max-content; }
    .carousel-logo {
      height: 36px; width: 120px; border-radius: 8px;
      background: rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center;
      font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.4); letter-spacing: 1px;
    }

    .app-layout {display: flex; width: 100%;min-height: 100vh;}
  .main-content {flex: 1;
  width: 100%;
  min-width: 0; /* 🔥 ƏN VACİB SƏTR */
}
      display: flex; flex-direction: column; p.sidebar {position: relative; left: 0; top: 0; bottom: 0;
      z-index: 100; transition: width 0.3s ease; overflow: hidden;
    }
    .sidebar.collapsed { width: 72px; }
    .sidebar-logo { padding: 24px 20px; border-bottom: 1px solid rgba(255,255,255,0.06); display: flex; align-items: center; gap: 12px; }
    .sidebar-logo-icon {
      min-width: 36px; height: 36px; border-radius: 10px;
      background: linear-gradient(135deg, var(--accent), var(--brand));
      display: flex; align-items: center; justify-content: center;
      font-weight: 800; color: #fff; font-size: 14px;
    }
    .sidebar-logo-text { white-space: nowrap; overflow: hidden; }
    .sidebar-logo-name { font-size: 14px; font-weight: 700; color: #fff; letter-spacing: 0.3px; }
    .sidebar-logo-sub { font-size: 10px; color: rgba(255,255,255,0.4); letter-spacing: 1px; text-transform: uppercase; }
    .sidebar-section { padding: 20px 12px 8px; font-size: 10px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.25); white-space: nowrap; overflow: hidden; }
    .sidebar-item {
      display: flex; align-items: center; gap: 12px; padding: 11px 16px; margin: 2px 8px;
      border-radius: 10px; cursor: pointer; transition: all 0.2s; position: relative;
      text-decoration: none; color: rgba(255,255,255,0.55); white-space: nowrap;
    }
    .sidebar-item:hover { background: var(--sidebar-hover); color: rgba(255,255,255,0.9); }
    .sidebar-item.active { background: rgba(0,212,170,0.12); color: var(--accent); }
    .sidebar-item.active::before {
      content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%);
      width: 3px; height: 20px; border-radius: 0 3px 3px 0; background: var(--accent);
    }
    .sidebar-item-icon { min-width: 20px; display: flex; }
    .sidebar-item-text { font-size: 13px; font-weight: 500; overflow: hidden; text-overflow: ellipsis; }
    .sidebar-bottom { margin-top: auto; padding: 12px; border-top: 1px solid rgba(255,255,255,0.06); }
    .sidebar-user { display: flex; align-items: center; gap: 12px; padding: 10px; border-radius: 10px; }
    .sidebar-avatar {
      min-width: 36px; height: 36px; border-radius: 50%;
      background: linear-gradient(135deg, var(--brand), var(--accent));
      display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: #fff;
    }
    .sidebar-user-info { overflow: hidden; }
    .sidebar-user-name { font-size: 13px; font-weight: 600; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .sidebar-user-role { font-size: 11px; color: rgba(255,255,255,0.4); }

    .sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 260px;
  height: 100vh;
}
    .main-content.sidebar-collapsed { margin-left: 72px; }
    .topbar {
      height: 64px; background: var(--card-bg); border-bottom: 1px solid var(--border);
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 28px; position: sticky; top: 0; z-index: 50;
    }
    .topbar-title { font-size: 18px; font-weight: 700; color: var(--text); }
    .topbar-sub { font-size: 12px; color: var(--muted); margin-top: 2px; }
    .topbar-right { display: flex; align-items: center; gap: 12px; }
    .topbar-date { font-size: 12px; color: var(--muted); font-family: 'JetBrains Mono', monospace; }
    .logout-btn {
      display: flex; align-items: center; gap: 8px; padding: 8px 16px;
      border-radius: 10px; border: 1px solid var(--border); background: transparent;
      color: var(--muted); font-size: 13px; font-weight: 500; transition: all 0.2s;
    }
    .logout-btn:hover { border-color: var(--danger); color: var(--danger); background: rgba(239,68,68,0.05); }

    .page-body {width: 100%;}
    .stat-grid {grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
    .stat-card {
      background: var(--card-bg); border: 1px solid var(--border); border-radius: 16px;
      padding: 20px 22px; display: flex; align-items: center; gap: 16px;
      transition: all 0.25s; cursor: default;
    }
    .stat-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.07); }
    .stat-icon {
      width: 48px; height: 48px; border-radius: 12px;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .stat-value { font-size: 28px; font-weight: 800; line-height: 1; font-family: 'JetBrains Mono', monospace; }
    .stat-label { font-size: 12px; color: var(--muted); margin-top: 4px; font-weight: 500; }

    .mod-grid {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}
    .mod-card {
      background: var(--card-bg); border: 1px solid var(--border); border-radius: 16px;
      padding: 24px; cursor: pointer; transition: all 0.25s; position: relative; overflow: hidden;
    }
    .mod-card::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
      background: var(--card-accent, #0ea5e9); transform: scaleX(0); transform-origin: left;
      transition: transform 0.3s;
    }
    .mod-card:hover::before { transform: scaleX(1); }
    .mod-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.09); border-color: transparent; }
    .mod-card.active { border-color: var(--card-accent, #0ea5e9); box-shadow: 0 0 0 3px rgba(14,165,233,0.1); }
    .mod-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
    .mod-title { font-size: 14px; font-weight: 700; color: var(--text); margin-bottom: 6px; line-height: 1.35; }
    .mod-sub { font-size: 12px; color: var(--muted); }
    .mod-arrow { position: absolute; right: 16px; bottom: 16px; opacity: 0; transition: all 0.2s; transform: translateX(-6px); }
    .mod-card:hover .mod-arrow { opacity: 1; transform: translateX(0); }

    .crm-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; gap: 12px; flex-wrap: wrap; }
    .crm-actions { display: flex; align-items: center; gap: 10px; }
    .search-box {
      display: flex; align-items: center; gap: 8px; padding: 9px 14px;
      border-radius: 10px; border: 1px solid var(--border); background: var(--card-bg);
      font-size: 13px; transition: all 0.2s;
    }
    .search-box input { border: none; background: transparent; width: 200px; font-size: 13px; color: var(--text); }
    .search-box:focus-within { border-color: var(--brand); box-shadow: 0 0 0 3px rgba(13,138,158,0.1); }
    .filter-select {
      padding: 9px 32px 9px 12px; border-radius: 10px; border: 1px solid var(--border);
      background: var(--card-bg); font-size: 13px; color: var(--text); appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7c8d' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
      background-repeat: no-repeat; background-position: right 10px center;
    }
    .add-btn {
      display: flex; align-items: center; gap: 8px; padding: 9px 18px;
      border-radius: 10px; border: none; background: var(--brand);
      color: #fff; font-size: 13px; font-weight: 600; transition: all 0.2s;
    }
    .add-btn:hover { background: var(--brand-dark); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(13,138,158,0.35); }
    .back-btn {
      display: flex; align-items: center; gap: 6px; padding: 8px 14px;
      border-radius: 10px; border: 1px solid var(--border); background: var(--card-bg);
      color: var(--muted); font-size: 13px; font-weight: 500; transition: all 0.2s;
    }
    .back-btn:hover { border-color: var(--brand); color: var(--brand); }

    .table-wrap { background: var(--card-bg); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; }
    .data-table { width: 100%; border-collapse: collapse; font-size: 13px; }
    .data-table thead tr { background: #f8fafc; border-bottom: 2px solid var(--border); }
    .data-table th {
      padding: 13px 14px; text-align: left; font-size: 11px; font-weight: 700;
      letter-spacing: 0.8px; text-transform: uppercase; color: var(--muted); white-space: nowrap;
    }
    .data-table tbody tr { border-bottom: 1px solid var(--border); transition: background 0.15s; }
    .data-table tbody tr:last-child { border-bottom: none; }
    .data-table tbody tr:hover { background: #f8fafc; }
    .data-table td { padding: 11px 14px; vertical-align: middle; }
    .reg-badge {
      font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 600;
      background: var(--brand-light); color: var(--brand-dark); padding: 3px 8px; border-radius: 6px;
    }
    .tbl-input {
      width: 100%; padding: 7px 10px; border-radius: 8px; border: 1px solid transparent;
      background: transparent; font-size: 13px; color: var(--text); transition: all 0.2s; min-width: 110px;
    }
    .tbl-input:hover { border-color: var(--border); background: var(--bg); }
    .tbl-input:focus { border-color: var(--brand); background: #fff; box-shadow: 0 0 0 3px rgba(13,138,158,0.1); }
    .tbl-select {
      padding: 7px 28px 7px 10px; border-radius: 8px; border: 1px solid transparent;
      background: transparent; font-size: 13px; color: var(--text); transition: all 0.2s;
      appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%236b7c8d' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
      background-repeat: no-repeat; background-position: right 8px center; cursor: pointer;
    }
    .tbl-select:hover { border-color: var(--border); background-color: var(--bg); }
    .tbl-select:focus { border-color: var(--brand); background-color: #fff; box-shadow: 0 0 0 3px rgba(13,138,158,0.1); outline: none; }
    .status-badge {
      display: inline-flex; align-items: center; gap: 5px;
      padding: 4px 10px; border-radius: 100px; font-size: 11px; font-weight: 600; white-space: nowrap;
    }
    .status-badge::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
    .status-aciq { background: rgba(245,158,11,0.12); color: #d97706; }
    .status-icrada { background: rgba(139,92,246,0.12); color: #7c3aed; }
    .status-tamam { background: rgba(16,185,129,0.12); color: #059669; }
    .del-btn {
      width: 32px; height: 32px; border-radius: 8px; border: 1px solid var(--border);
      background: transparent; color: var(--muted); display: flex; align-items: center; justify-content: center;
      transition: all 0.2s; margin: auto;
    }
    .del-btn:hover { border-color: var(--danger); color: var(--danger); background: rgba(239,68,68,0.06); }
    .empty-state { padding: 60px; text-align: center; color: var(--muted); }
    .empty-state-icon { margin: 0 auto 16px; opacity: 0.3; }
    .empty-state-text { font-size: 14px; }
    .table-footer { padding: 12px 20px; border-top: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
    .table-count { font-size: 12px; color: var(--muted); }

    @keyframes slideInLeft { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
    @keyframes slideInRight { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
    @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
    @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    .fade-up { animation: fadeUp 0.5s ease both; }
    .fade-up-1 { animation-delay: 0.05s; }
    .fade-up-2 { animation-delay: 0.10s; }
    .fade-up-3 { animation-delay: 0.15s; }
    .fade-up-4 { animation-delay: 0.20s; }
    .fade-up-5 { animation-delay: 0.25s; }
    .fade-up-6 { animation-delay: 0.30s; }

    @media (max-width: 1024px) { .stat-grid { grid-template-columns: repeat(2, 1fr); } .mod-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 640px) { .stat-grid { grid-template-columns: 1fr; } .mod-grid { grid-template-columns: 1fr; } }
  `;

  const now = new Date();
  const dateStr = now.toLocaleDateString("az-AZ", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  const getStatusClass = (s) => s === "Açıq" ? "status-açıq" : s === "İcrada" ? "status-icrada" : "status-tamam";

if (!token) {

  const logos = [
    "/clients/logo 1.png",
    "/clients/logo 2.png",
    "/clients/logo 3.png",
    "/clients/logo1.png",
    "/clients/logo2.png"
  ];

  return (
    <>
      <style>{css}</style>

      <div className="login-bg">

        {/* 🔥 YUXARI SOL LOGO */}
        <div style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 3
        }}>
          <img src={logo} alt="logo" style={{ width: 280 }} />
        </div>

        {/* 🔥 AŞAĞI KARUSEL (SADƏ) */}
        <div style={{
          position: "absolute",
          bottom: 20,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 30
        }}>

        </div>

        <div className="login-grid" />

        <div className="login-left">
          <div className="login-brand">7 il Sizinlə!!!</div>

          <h1 className="login-title">
            MÜŞTƏRİ XİDMƏTLƏRİNİN İDARƏEDİLMƏSİ SİSTEMİ<br />
            <span>---------</span>
          </h1>

          <p className="login-desc">
            Bu sistem vasitəsi ilə təşkilat müştərilərindən daxil olan sorğuları qeydiyyata alır.
             Bu sistem vasitəsi ilə təşkilat müştərilərindən daxil olan sorğuları qeydiyyata alır.
              Bu sistem vasitəsi ilə təşkilat müştərilərindən daxil olan sorğuları qeydiyyata alır.
               Bu sistem vasitəsi ilə təşkilat müştərilərindən daxil olan sorğuları qeydiyyata alır.
                Bu sistem vasitəsi ilə təşkilat müştərilərindən daxil olan sorğuları qeydiyyata alır.
          </p>

          <div className="login-badge">
            <div className="login-badge-dot" />
            www.midcenter.az
          </div>
        </div>

        <div className="login-right">
          <div className="login-card">

            <div className="login-card-title">HESABINIZA GİRİŞ EDİN</div>

            <div className="inp-wrap">
              <label className="inp-label">İstifadəçi adı</label>
               <div style={{ position: "relative" }}>
                  <span className="inp-icon"><Icon name="user" size={16} color="rgba(255,255,255,0.5)" /></span>
              <input
                className="inp-field"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
 </div>
            <div className="inp-wrap">
              <label className="inp-label">Şifrə</label>
              <div style={{ position: "relative" }}>
                  <span className="inp-icon"><Icon name="lock" size={16} color="rgba(255,255,255,0.5)" /></span>
              <input
                type="password"
                className="inp-field"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
</div>
            <button className="login-btn" onClick={login}>
              Daxil ol
            </button>

          </div>
        </div>

        {/* 🔥 AŞAĞI ANİMASİYALI BAR */}
        <div className="carousel-bar" style={{ paddingBottom: 60 }}>
          <div className="carousel-track">
            {[...logos, ...logos].map((l, i) => (
              <div key={i} className="carousel-logo">
                <img src={l} alt="logo" style={{ height: 60 }} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
  // в”Ђв”Ђ APP SHELL в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
  const isDashboard = page === "dashboard";
  const isCRM = page === "crm";

  return (
    <>
      <style>{css}</style>
      <div className="app-layout">

        {/* SIDEBAR */}
        <aside className={`sidebar ${sidebarOpen ? "" : "collapsed"}`}>
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">MC</div>
            {sidebarOpen && (
              <div className="sidebar-logo-text">
                <div className="sidebar-logo-name">MID CENTER</div>
                <div className="sidebar-logo-sub">CRM System</div>
              </div>
            )}
          </div>

          <div className="sidebar-section">{sidebarOpen ? "ANA MENU" : ""}</div>

          <div style={{ padding: "0 4px" }}>
            <div className={`sidebar-item ${isDashboard ? "active" : ""}`}
              onClick={() => setPage("dashboard")}>
              <span className="sidebar-item-icon"><Icon name="dashboard" size={18} /></span>
              {sidebarOpen && <span className="sidebar-item-text">Dashboard</span>}
            </div>

            {modules.map(m => (
              <div key={m.id}
                className={`sidebar-item ${page === m.id ? "active" : ""}`}
                onClick={() => { setActiveMod(m.id); if (m.page) setPage(m.page); }}>
                <span className="sidebar-item-icon"><Icon name={m.icon} size={18} /></span>
                {sidebarOpen && <span className="sidebar-item-text">{m.title}</span>}
              </div>
            ))}
          </div>

          <div className="sidebar-bottom">
            <div className="sidebar-user">
              <div className="sidebar-avatar">CHİNKA</div>
              {sidebarOpen && (
                <div className="sidebar-user-info">
                  <div className="sidebar-user-name">Admin</div>
                  <div className="sidebar-user-role">Çinarə Məmmədova</div>
                </div>
              )}
            </div>
            <div className="sidebar-item" style={{ marginTop: 4 }} onClick={logout}>
              <span className="sidebar-item-icon"><Icon name="logout" size={18} /></span>
              {sidebarOpen && <span className="sidebar-item-text">Cixis</span>}
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className={`main-content ${sidebarOpen ? "" : "sidebar-collapsed"}`}>
          <div className="topbar">
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <button onClick={() => setSidebarOpen(p => !p)}
                style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid var(--border)", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--muted)", flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              </button>
              <div>
                <div className="topbar-title">{isCRM ? "Müştəri sorğularının idarəedilməsi" : "Dashboard"}</div>
                <div className="topbar-sub">{isCRM ? "Sorğuların qeydiyyatı və izlənilməsi" : "Xos geldiniz, Çinarə Məmmədova"}</div>
              </div>
            </div>
            <div className="topbar-right">
              <div className="topbar-date">{dateStr}</div>
              <button className="logout-btn" onClick={logout}>
                <Icon name="logout" size={15} />
                Çıxış
              </button>
            </div>
          </div>

          {/* в”Ђв”Ђ DASHBOARD в”Ђв”Ђ */}
          {isDashboard && (
            <div className="page-body">
              <div className="stat-grid">
                {stats.map((s, i) => (
                  <div key={i} className={`stat-card fade-up fade-up-${i+1}`}>
                    <div className="stat-icon" style={{ background: s.color + "18" }}>
                      <Icon name={s.icon} size={22} color={s.color} />
                    </div>
                    <div>
                      <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
                      <div className="stat-label">{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 18, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text)" }}>Modullar</div>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>_____________</div>
                </div>
              </div>

              <div className="mod-grid">
                {modules.map((m, i) => (
                  <div key={m.id}
                    className={`mod-card fade-up fade-up-${i+1} ${activeMod === m.id ? "active" : ""}`}
                    style={{ "--card-accent": m.color }}
                    onClick={() => { setActiveMod(m.id); if (m.page) setPage(m.page); }}>
                    <div className="mod-icon" style={{ background: m.color + "18" }}>
                      <Icon name={m.icon} size={22} color={m.color} />
                    </div>
                    <div className="mod-title">{m.title}</div>
                    <div className="mod-sub">{m.subtitle}</div>
                    <div className="mod-arrow">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={m.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* в”Ђв”Ђ CRM PAGE в”Ђв”Ђ */}
          {isCRM && (
            <div className="page-body">
              <div className="crm-header">
                <button className="back-btn" onClick={() => setPage("dashboard")}>
                  <Icon name="back" size={15} />
                  Geri
                </button>

                <div className="crm-actions">
                  <div className="search-box">
                    <Icon name="search" size={15} color="var(--muted)" />
                    <input placeholder="Axtar..."
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)} />
                  </div>
                  <select className="filter-select" value={filterStatus}
                    onChange={e => setFilterStatus(e.target.value)}>
                    <option>Hamısı</option>
                    <option>Açıq</option>
                    <option>Icrada</option>
                    <option>Tamamlandı</option>
                  </select>
                  <button className="add-btn" onClick={addTicket}>
                    <Icon name="add" size={16} color="#fff" />
                    YENİ SORĞU
                  </button>
                </div>
              </div>

              <div className="table-wrap fade-up">
                <div style={{ overflowX: "auto" }}>
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Tarix</th>
                        <th>No</th>
                        <th>Saat</th>
                        <th>Ad Soyad</th>
                        <th>Telefon №</th>
                        <th>NV-nin nömrə nişanı</th>
                        <th>Sorğunun növü</th>
                        <th>Sorğunun qısa təsviri</th>
                        <th>Cavabdeh</th>
                        <th>Status</th>
                        <th>İcra tətbirlərinin qısa təsviri</th>
                        <th style={{ textAlign: "center" }}>Sil</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTickets.map((t) => (
                        <tr key={t.id}>
                          <td>
                            <span style={{ fontSize: 12, color: "var(--muted)", fontFamily: "JetBrains Mono, monospace" }}>{t.date}</span>
                          </td>
                          <td><span className="reg-badge">{String(t.regNumber).padStart(4, "0")}</span></td>
                          <td>
                            <span style={{ fontSize: 12, color: "var(--muted)", fontFamily: "JetBrains Mono, monospace" }}>{t.time}</span>
                          </td>
                          <td><input className="tbl-input" value={t.fullName} placeholder="Ad Soyad" onChange={e => updateField(t.id, "fullName", e.target.value)} /></td>
                          <td><input className="tbl-input" value={t.phone} placeholder="+994..." onChange={e => updateField(t.id, "phone", e.target.value)} /></td>
                          <td><input className="tbl-input" value={t.vehicleNumber} placeholder="00-XX-000" onChange={e => updateField(t.id, "vehicleNumber", e.target.value)} /></td>
                          <td>
                            <select className="tbl-select" value={t.type} onChange={e => updateField(t.id, "type", e.target.value)}>
                              <option>Sorğu</option>
                              <option>Şikayət</option>
                              <option>Məlumat</option>
                              <option>Texniki</option>
                            </select>
                          </td>
                          <td><input className="tbl-input"              /></td>
                          <td><input className="tbl-input"             /></td>
                             <td><select className="tbl-select"
                              style={{
                                color: t.status === "Aciq" ? "#d97706" : t.status === "Icrada" ? "#7c3aed" : "#059669",
                                fontWeight: 600
                              }}
                              value={t.status} onChange={e => updateField(t.id, "status", e.target.value)}>
                              <option>Açıq</option>
                              <option>İcrada</option>
                              <option>Tamamlandı</option>
                            </select></td>
                            <td><input           /></td>
                          <td>
                            <button className="del-btn" onClick={() => deleteTicket(t.id)}>
                              <Icon name="delete" size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {filteredTickets.length === 0 && (
                    <div className="empty-state">
                      <div className="empty-state-icon"><Icon name="tickets" size={48} color="var(--muted)" /></div>
                      <div className="empty-state-text">Heç bir sorğu tapılmadı</div>
                    </div>
                  )}
                </div>
                <div className="table-footer">
                  <div className="table-count">Cəmi {filteredTickets.length} sorğu gösterilir</div>
                  <div style={{ display: "flex", gap: 12 }}>
                    <span style={{ fontSize: 12 }}><span style={{ color: "#d97706", fontWeight: 700 }}>{tickets.filter(t=>t.status==="Aciq").length}</span> Aciq</span>
                    <span style={{ fontSize: 12 }}><span style={{ color: "#7c3aed", fontWeight: 700 }}>{tickets.filter(t=>t.status==="Icrada").length}</span> Icrada</span>
                    <span style={{ fontSize: 12 }}><span style={{ color: "#059669", fontWeight: 700 }}>{tickets.filter(t=>t.status==="Tamamlandi").length}</span> Tamamlandi</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}


