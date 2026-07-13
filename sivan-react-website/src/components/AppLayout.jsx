import {NavLink,useNavigate,Outlet,useLocation} from 'react-router-dom';
import {
  LayoutDashboard,ArrowUpRight,ArrowDownLeft,History,CreditCard,
  ShieldCheck,Settings,HelpCircle,LogOut,ChevronRight,Bell,Search,Menu,X
} from 'lucide-react';
import {useState} from 'react';
import {useAuth} from '../context/AuthContext';
import logo from '/sivan-logo.png';

export default function AppLayout(){
  const {user,signout}=useAuth();
  const nav=useNavigate();
  const loc=useLocation();
  const [openMobile,setOpenMobile]=useState(false);
  const [userMenuOpen,setUserMenuOpen]=useState(false);

  const navItems=[
    {to:'/app',icon:LayoutDashboard,label:'Dashboard',end:true},
    {to:'/app/buy',icon:ArrowDownLeft,label:'Buy crypto'},
    {to:'/app/sell',icon:ArrowUpRight,label:'Sell crypto'},
    {to:'/app/transactions',icon:History,label:'Transactions'},
    {to:'/app/payment-methods',icon:CreditCard,label:'Payment methods'},
    {to:'/app/verification',icon:ShieldCheck,label:'Verification'},
    {to:'/app/settings',icon:Settings,label:'Settings'},
    {to:'/app/support',icon:HelpCircle,label:'Support'},
  ];

  const kycPct = user?.kycStatus==='verified' ? 100 : user?.kycStatus==='pending' ? 60 : user?.hasBank ? 40 : user?.verified ? 30 : 10;

  const handleLogout=()=>{signout();nav('/');};
  const initials = user?.name?.split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase() || 'SV';

  return (
    <div className="app-shell">
      {/* Sidebar */}
      <aside className={`sidebar ${openMobile?'open':''}`}>
        <div className="side-head">
          <NavLink to="/app" className="brand">
            <img src={logo} alt="Sivan" className="brand-mark" />
            <span className="brand-name">Sivan</span>
          </NavLink>
          <button className="close-mobile" onClick={()=>setOpenMobile(false)}><X size={18}/></button>
        </div>

        <nav className="side-nav">
          {navItems.map(item=>{
            const Icon=item.icon;
            return (
              <NavLink key={item.to} to={item.to} end={item.end} className={({isActive})=>`side-item ${isActive?'active':''}`} onClick={()=>setOpenMobile(false)}>
                <Icon size={18}/>{item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* KYC progress card */}
        {user && user.kycStatus!=='verified' && (
          <div className="kyc-card">
            <div className="eyebrow center">Account setup</div>
            <div className="kyc-pct">{kycPct}%</div>
            <div className="bar"><div className="fill" style={{width:`${kycPct}%`}}/></div>
            <p className="kyc-txt">
              {kycPct<30?'Verify your email to start.':
               kycPct<60?'Add a bank account to continue.':
               kycPct<100?'Identity verification in review.':''}
            </p>
            <NavLink to="/app/verification" className="btn btn-primary btn-sm btn-block">
              {kycPct<60?'Continue setup':'View status'}<ChevronRight size={14}/>
            </NavLink>
          </div>
        )}

        <div className="side-foot">
          <div className="status-line"><span className="dot ok"/>All systems operational</div>
        </div>
      </aside>
      {openMobile && <div className="mobile-backdrop" onClick={()=>setOpenMobile(false)}/>}

      {/* Main */}
      <main className="main">
        <div className="topbar">
          <div className="topbar-left">
            <button className="menu-btn" onClick={()=>setOpenMobile(true)}><Menu size={18}/></button>
            <div>
              <h1 className="page-title">
                {navItems.find(i=>i.to===loc.pathname || (i.end && loc.pathname.startsWith(i.to)))?.label || 'Dashboard'}
              </h1>
            </div>
          </div>
          <div className="topbar-right">
            <div className="search-wrap"><Search size={15}/><input placeholder="Search transactions, accounts..." /></div>
            <button className="icon-btn" aria-label="Notifications"><Bell size={16}/><span className="notif-dot"/></button>
            <div className="usermenu">
              <button className="user-btn" onClick={()=>setUserMenuOpen(!userMenuOpen)}>
                <div className="avatar">{initials}</div>
                <div className="user-info">
                  <div className="uname">{user?.name||'Account'}</div>
                  <div className="umail">{user?.email||''}</div>
                </div>
              </button>
              {userMenuOpen && (
                <>
                  <div className="dropdown-backdrop" onClick={()=>setUserMenuOpen(false)}/>
                  <div className="user-dropdown">
                    <div className="drop-section">
                      <div className="drop-user">
                        <div className="avatar big">{initials}</div>
                        <div>
                          <div className="uname">{user?.name}</div>
                          <div className="umail">{user?.email}</div>
                          {user?.kycStatus==='verified'
                            ? <span className="badge badge-green">Verified</span>
                            : <span className="badge badge-gold">Unverified</span>}
                        </div>
                      </div>
                    </div>
                    <NavLink to="/app/settings" className="drop-item" onClick={()=>setUserMenuOpen(false)}><Settings size={16}/>Account settings</NavLink>
                    <NavLink to="/app/support" className="drop-item" onClick={()=>setUserMenuOpen(false)}><HelpCircle size={16}/>Support</NavLink>
                    <div className="drop-divider"/>
                    <button className="drop-item danger" onClick={handleLogout}><LogOut size={16}/>Sign out</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="outlet"><Outlet/></div>
      </main>

      <style>{`
        .app-shell{display:grid;grid-template-columns:var(--sidebar-w) 1fr;min-height:100vh;background:var(--bg)}
        .sidebar{
          border-right:1px solid var(--border);display:flex;flex-direction:column;
          padding:20px 16px;background:#060a10;position:sticky;top:0;height:100vh;
        }
        .side-head{display:flex;align-items:center;justify-content:space-between;padding:6px 10px 20px}
        .close-mobile{display:none;background:transparent;color:var(--text-muted);padding:6px;border-radius:8px}
        .brand{display:flex;align-items:center;gap:10px;font-weight:700;font-size:17px;letter-spacing:-.02em}
        .brand-mark{height:30px;width:auto;border-radius:7px}
        .side-nav{display:flex;flex-direction:column;gap:2px}
        .side-item{
          display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:10px;
          color:var(--text-muted);font-size:13.5px;font-weight:500;transition:.15s;
        }
        .side-item:hover{color:var(--text);background:#ffffff08}
        .side-item.active{color:var(--text);background:var(--surface-2);border:1px solid var(--border)}
        .side-item.active svg{color:var(--brand-300)}
        .kyc-card{
          margin-top:auto;margin-top:auto;
          border:1px solid var(--border);background:var(--panel);border-radius:var(--radius-lg);
          padding:18px;text-align:center;margin-top:20px;
        }
        .kyc-card .eyebrow{margin:0 0 6px;justify-content:center;font-size:10.5px}
        .kyc-pct{font-size:30px;font-weight:700;letter-spacing:-.03em;background:linear-gradient(135deg,var(--brand-300),var(--blue-500));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .bar{height:4px;background:var(--surface-2);border-radius:99px;margin:8px 0 10px;overflow:hidden}
        .fill{height:100%;background:linear-gradient(90deg,var(--brand-300),var(--blue-500));border-radius:99px;transition:width .5s}
        .kyc-txt{font-size:12px;color:var(--text-muted);margin-bottom:14px;line-height:1.4}
        .side-foot{padding-top:14px}
        .status-line{display:inline-flex;align-items:center;gap:8px;font-size:12px;color:var(--text-muted);padding:8px 12px}
        .status-line .dot{width:7px;height:7px;border-radius:50%;background:var(--green-ok);box-shadow:0 0 8px #2ecc71aa}
        .status-line .dot.warn{background:var(--gold);box-shadow:0 0 8px #e9b66099}
        .main{display:flex;flex-direction:column;min-width:0}
        .topbar{
          display:flex;justify-content:space-between;align-items:center;
          padding:0 28px;height:var(--topbar-h);border-bottom:1px solid var(--border);
          background:#05080daa;backdrop-filter:blur(12px);position:sticky;top:0;z-index:20;gap:20px;
        }
        .topbar-left{display:flex;align-items:center;gap:16px;min-width:0}
        .menu-btn{display:none;padding:8px;border-radius:8px;color:var(--text-muted);background:transparent;border:0}
        .page-title{font-size:18px;font-weight:700;letter-spacing:-.02em}
        .topbar-right{display:flex;align-items:center;gap:10px}
        .search-wrap{
          display:flex;align-items:center;gap:8px;background:var(--surface);border:1px solid var(--border);
          border-radius:10px;padding:8px 12px;width:280px;color:var(--text-muted);
        }
        .search-wrap input{background:transparent;border:0;outline:none;color:var(--text);width:100%;font-size:13px}
        .search-wrap input::placeholder{color:var(--text-faint)}
        .icon-btn{
          width:36px;height:36px;border-radius:10px;display:grid;place-items:center;
          color:var(--text-muted);background:var(--surface);border:1px solid var(--border);position:relative;
        }
        .icon-btn:hover{color:var(--text);background:var(--surface-2)}
        .notif-dot{position:absolute;top:8px;right:8px;width:7px;height:7px;border-radius:50%;background:var(--brand-300);border:2px solid var(--surface)}
        .usermenu{position:relative}
        .user-btn{display:flex;align-items:center;gap:10px;padding:6px 10px 6px 6px;background:var(--surface);border:1px solid var(--border);border-radius:10px;transition:.15s}
        .user-btn:hover{background:var(--surface-2)}
        .avatar{width:30px;height:30px;border-radius:8px;background:linear-gradient(135deg,var(--brand-300),var(--blue-500));display:grid;place-items:center;color:#051210;font-weight:700;font-size:12px;flex-shrink:0}
        .avatar.big{width:40px;height:40px;font-size:14px}
        .user-info{text-align:left;line-height:1.2}
        .uname{font-size:13px;font-weight:600}
        .umail{font-size:11.5px;color:var(--text-muted)}
        .user-dropdown{
          position:absolute;top:calc(100% + 8px);right:0;width:260px;
          background:var(--panel-strong);border:1px solid var(--border-strong);border-radius:var(--radius-md);
          box-shadow:var(--shadow-lg);padding:6px;z-index:50;animation:fadeIn .15s;
        }
        .dropdown-backdrop{position:fixed;inset:0;z-index:-1}
        .drop-section{padding:10px}
        .drop-user{display:flex;gap:12px;align-items:center}
        .drop-user .badge{margin-top:6px}
        .drop-item{
          display:flex;gap:10px;align-items:center;padding:10px;color:var(--text-dim);font-size:13.5px;
          border-radius:8px;transition:.1s;
        }
        .drop-item:hover{background:#ffffff08;color:var(--text)}
        .drop-item.danger{color:var(--red)}
        .drop-item.danger:hover{background:#3d181840;color:#f3b3ad}
        .drop-divider{height:1px;background:var(--border);margin:6px 0}
        .outlet{padding:28px}
        .mobile-backdrop{display:none}
        @media (max-width:1020px){
          .search-wrap{display:none}
        }
        @media (max-width:900px){
          .app-shell{grid-template-columns:1fr}
          .sidebar{
            position:fixed;inset:0 auto 0 0;z-index:60;width:280px;transform:translateX(-100%);
            transition:transform .25s ease;
          }
          .sidebar.open{transform:translateX(0)}
          .close-mobile{display:inline-flex}
          .mobile-backdrop{position:fixed;inset:0;background:#000a;z-index:55;display:block}
          .menu-btn{display:inline-flex}
          .outlet{padding:20px}
          .topbar{padding:0 20px}
        }
        @media (max-width:560px){
          .user-info{display:none}
          .user-btn{padding:6px}
        }
      `}</style>
    </div>
  );
}
