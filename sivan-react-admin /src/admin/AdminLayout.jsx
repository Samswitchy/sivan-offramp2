import {useState} from 'react';
import {NavLink,Outlet,useNavigate} from 'react-router-dom';
import {
  LayoutDashboard, Users, ArrowLeftRight, ShieldCheck, Wallet,
  CreditCard, MessageSquareWarning, FileClock, Percent, Settings as SettingsIcon,
  Search, Bell, Menu, X, LogOut, ChevronDown, Sparkles, Activity,
} from 'lucide-react';
import {useAdminAuth} from './AdminAuthContext';

const NAV=[
  {to:'/admin',icon:LayoutDashboard,label:'Overview',ends:true},
  {to:'/admin/users',icon:Users,label:'Users'},
  {to:'/admin/transactions',icon:ArrowLeftRight,label:'Transactions'},
  {to:'/admin/kyc',icon:ShieldCheck,label:'KYC & Verification',badge:'24'},
  {to:'/admin/assets',icon:Wallet,label:'Assets & Pairs'},
  {to:'/admin/rails',icon:CreditCard,label:'Rails & Banks'},
  {to:'/admin/disputes',icon:MessageSquareWarning,label:'Disputes',badge:'7'},
  {to:'/admin/audit',icon:FileClock,label:'Audit Logs'},
  {to:'/admin/fees',icon:Percent,label:'Fees & Rates'},
  {to:'/admin/settings',icon:SettingsIcon,label:'Settings'},
];

export default function AdminLayout(){
  const {admin,signout}=useAdminAuth();
  const nav=useNavigate();
  const [sidebarOpen,setSidebarOpen]=useState(false);
  const [profileOpen,setProfileOpen]=useState(false);

  const onSignout=()=>{signout();nav('/admin/login',{replace:true});};

  return (
    <div className="admin-shell">
      {/* Sidebar */}
      <aside className={`adm-sidebar ${sidebarOpen?'open':''}`}>
        <div className="adm-side-head">
          <NavLink to="/admin" className="adm-logo" onClick={()=>setSidebarOpen(false)}>
            <span className="admin-logo-mark sm">
              <span className="admin-logo-gradient"/>
              <span className="admin-logo-s">S</span>
            </span>
            <span>
              <span className="admin-logo-word">Sivan</span>
              <span className="admin-logo-sub">Admin Console</span>
            </span>
          </NavLink>
          <button className="adm-side-close lg-hide" onClick={()=>setSidebarOpen(false)}><X size={18}/></button>
        </div>

        <div className="adm-side-env">
          <span className="env-dot live"/>
          <span>Production</span>
          <span className="env-pill">v2.4.1</span>
        </div>

        <nav className="adm-nav">
          <div className="adm-nav-label">Operations</div>
          {NAV.map(item=>{
            const Icon=item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.ends}
                onClick={()=>setSidebarOpen(false)}
                className={({isActive})=>`adm-nav-item ${isActive?'active':''}`}
              >
                <Icon size={17}/>
                <span>{item.label}</span>
                {item.badge && <span className="adm-nav-badge">{item.badge}</span>}
              </NavLink>
            );
          })}
        </nav>

        <div className="adm-side-foot">
          <div className="adm-upgrade">
            <div className="adm-upg-head"><Sparkles size={14}/> Sivan Pro</div>
            <p>Enable advanced routing, multi-sig custody and priority support.</p>
            <button className="btn-ghost-sm">Upgrade</button>
          </div>
          <div className="adm-sys">
            <span className="sys-dot ok"/>
            <span>All systems operational</span>
            <Activity size={12} className="sys-ico"/>
          </div>
        </div>
      </aside>

      {sidebarOpen && <div className="adm-backdrop" onClick={()=>setSidebarOpen(false)}/>}

      {/* Main */}
      <div className="adm-main">
        {/* Topbar */}
        <header className="adm-topbar">
          <div className="adm-top-left">
            <button className="adm-menu-btn lg-hide" onClick={()=>setSidebarOpen(true)}><Menu size={20}/></button>
            <div className="adm-search">
              <Search size={16}/>
              <input placeholder="Search users, transactions, addresses…"/>
              <kbd>⌘K</kbd>
            </div>
          </div>
          <div className="adm-top-right">
            <button className="adm-icon-btn" title="Command palette"><Search size={16}/></button>
            <button className="adm-icon-btn notif" title="Notifications">
              <Bell size={16}/>
              <span className="notif-dot"/>
            </button>
            <div className="adm-profile-wrap">
              <button className="adm-profile" onClick={()=>setProfileOpen(!profileOpen)}>
                <span className="adm-avatar grad-bg">{admin?.avatar}</span>
                <div className="adm-prof-meta">
                  <span className="adm-prof-name">{admin?.name}</span>
                  <span className="adm-prof-role">{admin?.role}</span>
                </div>
                <ChevronDown size={14}/>
              </button>
              {profileOpen && (
                <div className="adm-profile-dd" onMouseLeave={()=>setProfileOpen(false)}>
                  <div className="adm-dd-head">
                    <div className="adm-avatar lg grad-bg">{admin?.avatar}</div>
                    <div>
                      <div className="adm-dd-name">{admin?.name}</div>
                      <div className="adm-dd-mail">{admin?.email}</div>
                      <span className="adm-dd-role">{admin?.role}</span>
                    </div>
                  </div>
                  <NavLink to="/admin/settings" onClick={()=>setProfileOpen(false)} className="adm-dd-item"><SettingsIcon size={14}/> Settings</NavLink>
                  <button onClick={onSignout} className="adm-dd-item danger"><LogOut size={14}/> Sign out</button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="adm-content">
          <Outlet/>
        </main>
      </div>
    </div>
  );
}
