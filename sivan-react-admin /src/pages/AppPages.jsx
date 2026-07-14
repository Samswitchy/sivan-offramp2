import {Link} from 'react-router-dom';
import {useState} from 'react';
import {
  ArrowUpRight,ArrowDownLeft,ArrowRight,Plus,CreditCard,Trash2,Eye,EyeOff,
  ShieldCheck,CheckCircle2,Clock,AlertCircle,Copy,Download,Search,Filter,
  User,Mail,Bell,Lock,Key,Globe,FileText,MessageSquare,Phone,LifeBuoy,ExternalLink,
  Building2,ChevronRight,Check,X
} from 'lucide-react';
import {useAuth} from '../context/AuthContext';

/* ========== TRANSACTIONS ========== */
export function Transactions(){
  const [filter,setFilter]=useState('all');
  const txs=[
    {dir:'sell',asset:'1,000 USDC',fiat:'$985.00 USD',method:'ACH • Chase ••4242',status:'completed',ref:'SVN-8F2A7C',time:'2 days ago',id:1},
    {dir:'buy',asset:'500 USDC',fiat:'$508.20 USD',method:'Debit card ••1142',status:'processing',ref:'SVN-3D91B2',time:'4 days ago',id:2},
    {dir:'sell',asset:'250 USDT',fiat:'£197.40 GBP',method:'FPS • Barclays ••8812',status:'completed',ref:'SVN-A01C44',time:'1 week ago',id:3},
    {dir:'sell',asset:'2,000 USDC',fiat:'$1,970.00 USD',method:'ACH • Chase ••4242',status:'failed',ref:'SVN-77DE12',time:'2 weeks ago',id:4},
    {dir:'buy',asset:'100 USDC',fiat:'€102.10 EUR',method:'SEPA • Revolut ••9921',status:'completed',ref:'SVN-22BA09',time:'3 weeks ago',id:5},
  ];
  const filtered=filter==='all'?txs:txs.filter(t=>t.dir===filter || t.status===filter);
  const statusMap={completed:{label:'Completed',cls:'badge-green'},processing:{label:'Processing',cls:'badge-gold'},failed:{label:'Failed',cls:'badge-red'},pending:{label:'Pending',cls:'badge-blue'}};
  return (
    <div className="page">
      <PageHeader title="Transactions" subtitle="All your buy and sell orders in one place." cta={<button className="btn btn-primary btn-sm"><Download size={14}/>Export CSV</button>}/>
      <div className="card">
        <div className="card-toolbar">
          <div className="toolbar-search"><Search size={14}/><input placeholder="Search by reference or amount..." /></div>
          <div className="toolbar-filters">
            <button className={`chip-btn ${filter==='all'?'active':''}`} onClick={()=>setFilter('all')}>All</button>
            <button className={`chip-btn ${filter==='sell'?'active':''}`} onClick={()=>setFilter('sell')}>Sells</button>
            <button className={`chip-btn ${filter==='buy'?'active':''}`} onClick={()=>setFilter('buy')}>Buys</button>
            <button className={`chip-btn ${filter==='processing'?'active':''}`} onClick={()=>setFilter('processing')}>Processing</button>
          </div>
        </div>
        <div className="tx-table">
          <div className="tx-head">
            <div>Type</div><div>Asset</div><div>Amount</div><div>Destination</div><div>Status</div><div>Reference</div><div>Date</div><div></div>
          </div>
          {filtered.map(t=>{
            const s=statusMap[t.status];
            const isSell=t.dir==='sell';
            return (
              <div key={t.id} className="tx-row">
                <div className="tx-type"><span className={`tx-ico ${isSell?'sell':'buy'}`}>{isSell?<ArrowUpRight size={13}/>:<ArrowDownLeft size={13}/>}</span><span>{isSell?'Sell':'Buy'}</span></div>
                <div className="mono" style={{fontWeight:600}}>{t.asset}</div>
                <div className="mono">{t.fiat}</div>
                <div style={{fontSize:12.5,color:'var(--text-muted)'}}>{t.method}</div>
                <div><span className={`badge ${s.cls}`}>{s.label}</span></div>
                <div className="mono" style={{fontSize:12.5,color:'var(--text-muted)'}}>{t.ref}<button className="icon-btn-sm" title="Copy"><Copy size={11}/></button></div>
                <div style={{fontSize:12.5,color:'var(--text-faint)'}}>{t.time}</div>
                <div><button className="icon-btn-sm">Details <ChevronRight size={12}/></button></div>
              </div>
            );
          })}
        </div>
      </div>
      <style>{`
        .page{display:flex;flex-direction:column;gap:20px}
        .page-head{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;flex-wrap:wrap;margin-bottom:4px}
        .page-head h1{font-size:24px;letter-spacing:-.025em}
        .page-head p{font-size:13px;color:var(--text-muted);margin-top:4px}
        .card-toolbar{display:flex;justify-content:space-between;gap:12px;margin-bottom:14px;flex-wrap:wrap}
        .toolbar-search{display:flex;align-items:center;gap:8px;background:var(--bg-2);border:1px solid var(--border);border-radius:10px;padding:8px 12px;color:var(--text-muted);width:280px;max-width:100%}
        .toolbar-search input{background:transparent;border:0;outline:none;color:var(--text);width:100%;font-size:13px}
        .toolbar-filters{display:flex;gap:6px;flex-wrap:wrap}
        .chip-btn{padding:7px 12px;border-radius:8px;background:var(--bg-2);border:1px solid var(--border);color:var(--text-muted);font-size:12.5px;font-weight:600;transition:.1s}
        .chip-btn.active{background:var(--brand-300);color:#051210;border-color:transparent}
        .chip-btn:hover{color:var(--text);border-color:var(--border-strong)}
        .tx-table{border:1px solid var(--border);border-radius:12px;overflow:hidden}
        .tx-head,.tx-row{display:grid;grid-template-columns:90px 110px 130px 1fr 110px 130px 110px 80px;gap:12px;padding:12px 14px;align-items:center;font-size:13px}
        .tx-head{background:var(--bg-2);color:var(--text-muted);font-weight:600;font-size:11.5px;text-transform:uppercase;letter-spacing:.08em}
        .tx-row{border-top:1px solid var(--border);transition:.1s}
        .tx-row:hover{background:var(--surface)}
        .tx-type{display:flex;align-items:center;gap:8px;font-weight:600}
        .tx-ico{width:24px;height:24px;border-radius:7px;display:grid;place-items:center}
        .tx-ico.sell{background:#3d181830;color:#f3a79f;border:1px solid #5d252555}
        .tx-ico.buy{background:#14362640;color:#6fdca0;border:1px solid #1f4f3655}
        .icon-btn-sm{background:transparent;border:0;color:var(--text-muted);display:inline-flex;align-items:center;gap:4px;font-size:12px;padding:3px 6px;border-radius:6px}
        .icon-btn-sm:hover{color:var(--brand-300);background:#23bfb215}
        @media (max-width:900px){
          .tx-head{display:none}
          .tx-row{grid-template-columns:auto 1fr auto;gap:8px;padding:14px}
          .tx-row>div:nth-child(n+3):not(:last-child){grid-column:1 / -1;display:flex;justify-content:space-between;font-size:12.5px}
        }
      `}</style>
    </div>
  );
}

/* ========== PAYMENT METHODS ========== */
export function PaymentMethods(){
  const {user,updateUser}=useAuth();
  const [addOpen,setAddOpen]=useState(false);
  const [accounts]=useState([
    {type:'bank',brand:'Chase',last4:'4242',currency:'USD',method:'ACH',primary:true,status:'verified'},
    {type:'card',brand:'Visa',last4:'1142',currency:'USD',method:'Debit card',status:'verified'},
  ]);
  return (
    <div className="page">
      <PageHeader
        title="Payment methods"
        subtitle="Manage the bank accounts and cards you use to buy and sell."
        cta={<button className="btn btn-primary btn-sm" onClick={()=>setAddOpen(true)}><Plus size={14}/>Add method</button>}
      />
      <div className="pm-grid">
        {accounts.map((a,i)=>(
          <div key={i} className="pm-card">
            <div className="pm-ico"><Building2 size={18}/></div>
            <div className="pm-body">
              <div className="pm-top">
                <strong>{a.brand} ••{a.last4}</strong>
                {a.primary && <span className="badge badge-brand">Primary</span>}
                <span className="badge badge-green">Verified</span>
              </div>
              <div className="pm-meta">{a.method} · {a.currency}</div>
            </div>
            <div className="pm-actions">
              {!a.primary && <button className="btn btn-ghost btn-sm">Make primary</button>}
              <button className="icon-btn-sm" style={{color:'var(--red)'}}><Trash2 size={14}/></button>
            </div>
          </div>
        ))}
        <button className="pm-card add" onClick={()=>setAddOpen(true)}>
          <div className="add-plus"><Plus size={22}/></div>
          <strong>Add payment method</strong>
          <span className="muted" style={{fontSize:12}}>Bank account, debit card, or other</span>
        </button>
      </div>
      {addOpen && (
        <div className="modal-backdrop" onClick={()=>setAddOpen(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="flex-between mb-20">
              <h3 style={{fontSize:18}}>Add payment method</h3>
              <button className="icon-btn-sm" onClick={()=>setAddOpen(false)}><X size={16}/></button>
            </div>
            <label className="field">
              <span>Method type</span>
              <select className="select"><option>Bank account (ACH / SEPA / FPS / NIP)</option><option>Debit card</option></select>
            </label>
            <div className="grid-2">
              <label className="field"><span>Routing / Sort code</span><input className="input" placeholder="000000000"/></label>
              <label className="field"><span>Account number</span><input className="input" placeholder="0000000000"/></label>
            </div>
            <label className="field"><span>Account holder name</span><input className="input" placeholder="Jane Doe"/></label>
            <div className="notice"><ShieldCheck size={14}/>Your credentials are encrypted. We never store your banking password.</div>
            <div className="flex gap-10 mt-20">
              <button className="btn btn-secondary" onClick={()=>setAddOpen(false)}>Cancel</button>
              <button className="btn btn-primary" style={{flex:1}} onClick={()=>{updateUser({hasBank:true});setAddOpen(false)}}>Add method<ArrowRight size={14}/></button>
            </div>
          </div>
        </div>
      )}
      <style>{`
        .pm-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
        .pm-card{background:var(--panel);border:1px solid var(--border);border-radius:var(--radius-md);padding:18px;display:flex;gap:14px;align-items:center;transition:.2s}
        .pm-card:hover{border-color:var(--border-strong)}
        .pm-ico{width:40px;height:40px;border-radius:10px;background:var(--bg-2);border:1px solid var(--border);display:grid;place-items:center;color:var(--brand-300);flex-shrink:0}
        .pm-body{flex:1;min-width:0}
        .pm-top{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
        .pm-meta{font-size:12px;color:var(--text-muted);margin-top:3px}
        .pm-actions{display:flex;align-items:center;gap:6px}
        .pm-card.add{flex-direction:column;justify-content:center;text-align:center;min-height:140px;border-style:dashed;cursor:pointer;gap:6px;transition:.2s}
        .pm-card.add:hover{border-color:var(--brand-400);background:#23bfb20a}
        .add-plus{width:40px;height:40px;border-radius:50%;background:#23bfb218;color:var(--brand-300);display:grid;place-items:center}
        .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
        .mb-20{margin-bottom:20px}
        .mt-20{margin-top:20px}
        .gap-10{gap:10px}
        .modal-backdrop{position:fixed;inset:0;background:#000a;z-index:100;display:grid;place-items:center;padding:20px;animation:fadeIn .2s}
        .modal{background:var(--panel-strong);border:1px solid var(--border-strong);border-radius:var(--radius-lg);padding:24px;max-width:460px;width:100%;box-shadow:var(--shadow-lg)}
        @media (max-width:700px){.pm-grid{grid-template-columns:1fr}}
      `}</style>
    </div>
  );
}

/* ========== VERIFICATION ========== */
export function Verification(){
  const steps=[
    {key:'email',title:'Email confirmed',desc:'Your email is verified',done:true},
    {key:'phone',title:'Phone number',desc:'Required for transaction notifications',done:false},
    {key:'identity',title:'Identity verification',desc:'Government-issued ID + selfie. Takes ~3 minutes.',done:false},
    {key:'address',title:'Proof of address',desc:'Utility or bank statement from last 3 months.',done:false},
    {key:'bank',title:'Add a bank account',desc:'Required before first payout.',done:false},
  ];
  const pct=steps.filter(s=>s.done).length/steps.length*100;
  return (
    <div className="page">
      <PageHeader title="Verification" subtitle="Complete verification to unlock buy, sell and higher limits."/>
      <div className="verif-grid">
        <div className="card">
          <div className="verif-progress">
            <div className="vp-top">
              <div>
                <div className="eyebrow" style={{margin:0}}>Progress</div>
                <h2 style={{fontSize:28,marginTop:4}}>{Math.round(pct)}% complete</h2>
              </div>
              <div className="vp-level"><ShieldCheck size={18}/>Level 0 — Starter</div>
            </div>
            <div className="bar big"><div className="fill" style={{width:`${pct}%`}}/></div>
            <div className="level-tiers">
              <div className="tier active"><strong>Level 0</strong><span>Email only</span></div>
              <div className="tier"><strong>Level 1</strong><span>Up to $500/transaction</span></div>
              <div className="tier"><strong>Level 2</strong><span>Up to $10,000/day</span></div>
            </div>
          </div>

          <div className="verif-steps">
            {steps.map((s,i)=>(
              <div key={s.key} className={`vstep ${s.done?'done':''}`}>
                <div className="vstep-dot">{s.done?<CheckCircle2 size={14}/>:i+1}</div>
                <div className="vstep-body">
                  <div className="vstep-title">{s.title}</div>
                  <div className="vstep-desc">{s.desc}</div>
                </div>
                <button className={`btn ${s.done?'btn-ghost':'btn-primary'} btn-sm`} disabled={s.done}>{s.done?'Completed':'Continue'}</button>
              </div>
            ))}
          </div>
        </div>

        <div className="side-stack">
          <div className="card">
            <h3 style={{fontSize:15,marginBottom:10}}>Why we verify</h3>
            <p style={{fontSize:13,color:'var(--text-muted)',lineHeight:1.6,marginBottom:14}}>Sivan works with regulated payment partners, which requires us to verify users before processing transactions. This keeps the platform safe and prevents fraud.</p>
            <ul className="plain-list">
              <li><CheckCircle2 size={13}/>Data is encrypted in transit and at rest</li>
              <li><CheckCircle2 size={13}/>Documents are used only for compliance</li>
              <li><CheckCircle2 size={13}/>Typically reviewed within 5 minutes</li>
            </ul>
          </div>
          <div className="card" style={{background:'linear-gradient(160deg,#0f1d1c,#0c151a)'}}>
            <h3 style={{fontSize:15,marginBottom:8}}>Need help verifying?</h3>
            <p style={{fontSize:12.5,color:'var(--text-muted)',lineHeight:1.55,marginBottom:12}}>If your ID is rejected or you're having trouble with the flow, our support team can help resolve it.</p>
            <Link to="/app/support" className="btn btn-secondary btn-sm btn-block">Contact support<ArrowRight size={12}/></Link>
          </div>
        </div>
      </div>
      <style>{`
        .verif-grid{display:grid;grid-template-columns:1.4fr 1fr;gap:18px}
        .verif-progress{margin-bottom:28px}
        .vp-top{display:flex;justify-content:space-between;align-items:flex-end;gap:12px;margin-bottom:16px;flex-wrap:wrap}
        .vp-level{display:inline-flex;align-items:center;gap:8px;padding:7px 12px;background:#23bfb215;border:1px solid #23bfb240;border-radius:99px;font-size:12px;font-weight:600;color:var(--brand-300)}
        .bar.big{height:8px;background:var(--surface-2);border-radius:99px;overflow:hidden;margin:8px 0 20px}
        .bar.big .fill{height:100%;background:linear-gradient(90deg,var(--brand-300),var(--blue-500));border-radius:99px}
        .level-tiers{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
        .tier{padding:10px 12px;border-radius:10px;background:var(--bg-2);border:1px solid var(--border);font-size:11px}
        .tier strong{display:block;font-size:13px;color:var(--text);margin-bottom:2px}
        .tier span{color:var(--text-muted)}
        .tier.active{border-color:var(--border-brand);background:#23bfb210}
        .verif-steps{display:flex;flex-direction:column;gap:6px}
        .vstep{display:grid;grid-template-columns:34px 1fr auto;gap:14px;align-items:center;padding:14px;border:1px solid var(--border);border-radius:12px;margin-bottom:8px}
        .vstep-dot{width:30px;height:30px;border-radius:50%;background:var(--bg-2);border:1px solid var(--border);display:grid;place-items:center;font-size:12px;color:var(--text-muted);font-weight:700}
        .vstep.done .vstep-dot{background:#143626;color:#6fdca0;border-color:#1f4f36}
        .vstep-title{font-weight:600;font-size:14px}
        .vstep-desc{font-size:12.5px;color:var(--text-muted);margin-top:2px}
        .side-stack{display:flex;flex-direction:column;gap:14px}
        .plain-list{list-style:none;display:grid;gap:8px}
        .plain-list li{display:flex;align-items:center;gap:8px;font-size:12.5px;color:var(--text-dim)}
        .plain-list li svg{color:var(--brand-300);flex-shrink:0}
        @media (max-width:900px){.verif-grid{grid-template-columns:1fr}.level-tiers{grid-template-columns:1fr}}
      `}</style>
    </div>
  );
}

/* ========== SETTINGS ========== */
export function Settings(){
  const [tab,setTab]=useState('profile');
  const tabs=[
    {k:'profile',label:'Profile',icon:User},
    {k:'security',label:'Security',icon:Lock},
    {k:'notifs',label:'Notifications',icon:Bell},
    {k:'preferences',label:'Preferences',icon:Globe},
  ];
  return (
    <div className="page">
      <PageHeader title="Settings" subtitle="Manage your account, security and preferences."/>
      <div className="settings-grid">
        <div className="card tabs-card">
          {tabs.map(t=>(
            <button key={t.k} className={`tab-btn ${tab===t.k?'active':''}`} onClick={()=>setTab(t.k)}>
              <t.icon size={15}/>{t.label}
            </button>
          ))}
        </div>
        <div className="card settings-card">
          {tab==='profile' && (
            <>
              <h3 style={{fontSize:18,marginBottom:6}}>Profile</h3>
              <p className="muted" style={{fontSize:13,marginBottom:22}}>Your personal information.</p>
              <div className="profile-top">
                <div className="avatar-lg">JD</div>
                <div>
                  <strong>Jane Doe</strong>
                  <div className="muted" style={{fontSize:12}}>jane@example.com · Verified user</div>
                  <button className="btn btn-ghost btn-sm" style={{paddingLeft:0,marginTop:4}}>Upload new photo</button>
                </div>
              </div>
              <div className="grid-2 mt-20">
                <label className="field"><span>First name</span><input className="input" defaultValue="Jane"/></label>
                <label className="field"><span>Last name</span><input className="input" defaultValue="Doe"/></label>
              </div>
              <label className="field"><span>Email</span><input className="input" defaultValue="jane@example.com"/></label>
              <div className="grid-2">
                <label className="field"><span>Country</span><select className="select"><option>United States</option><option>United Kingdom</option><option>Nigeria</option></select></label>
                <label className="field"><span>Phone</span><input className="input" placeholder="+1 ..."/></label>
              </div>
              <button className="btn btn-primary">Save changes</button>
            </>
          )}
          {tab==='security' && (
            <>
              <h3 style={{fontSize:18,marginBottom:6}}>Security</h3>
              <p className="muted" style={{fontSize:13,marginBottom:22}}>Keep your account safe.</p>
              <SecRow icon={Lock} title="Password" sub="Last changed 3 months ago" action="Change"/>
              <SecRow icon={Key} title="Two-factor authentication" sub="Add an extra layer of security with an authenticator app." action="Enable" accent/>
              <SecRow icon={Mail} title="Email confirmations" sub="Require email confirmation for transactions over $1,000." toggle/>
              <SecRow icon={Clock} title="Active sessions" sub="2 devices signed in." action="Manage"/>
            </>
          )}
          {tab==='notifs' && (
            <>
              <h3 style={{fontSize:18,marginBottom:6}}>Notifications</h3>
              <p className="muted" style={{fontSize:13,marginBottom:22}}>Choose how you'd like to be notified.</p>
              <SecRow icon={Bell} title="Transaction updates" sub="Email me when deposits confirm and payouts send." toggle enabled/>
              <SecRow icon={Mail} title="Marketing emails" sub="Product news and offers." toggle/>
              <SecRow icon={ShieldCheck} title="Security alerts" sub="Suspicious logins, password changes." toggle enabled/>
            </>
          )}
          {tab==='preferences' && (
            <>
              <h3 style={{fontSize:18,marginBottom:6}}>Preferences</h3>
              <p className="muted" style={{fontSize:13,marginBottom:22}}>Customize your experience.</p>
              <label className="field"><span>Default fiat currency</span>
                <select className="select"><option>USD — US Dollar</option><option>GBP — British Pound</option><option>EUR — Euro</option><option>NGN — Nigerian Naira</option></select>
              </label>
              <label className="field"><span>Language</span>
                <select className="select"><option>English (US)</option><option>English (UK)</option></select>
              </label>
              <label className="field"><span>Appearance</span>
                <select className="select"><option>Dark</option><option>Light</option><option>System</option></select>
              </label>
              <button className="btn btn-primary">Save preferences</button>
              <div className="divider"/>
              <button className="btn btn-danger" style={{width:'100%',justifyContent:'center'}}>Delete account</button>
            </>
          )}
        </div>
      </div>
      <style>{`
        .settings-grid{display:grid;grid-template-columns:240px 1fr;gap:18px}
        .tabs-card{padding:8px;height:fit-content}
        .tab-btn{width:100%;display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:9px;color:var(--text-muted);font-size:13.5px;font-weight:600;text-align:left;background:transparent;border:0;transition:.1s}
        .tab-btn:hover{color:var(--text);background:#ffffff08}
        .tab-btn.active{background:var(--surface-2);color:var(--text);border:1px solid var(--border)}
        .settings-card{min-height:460px}
        .profile-top{display:flex;gap:16px;align-items:center;padding-bottom:20px;border-bottom:1px solid var(--border)}
        .avatar-lg{width:56px;height:56px;border-radius:14px;background:linear-gradient(135deg,var(--brand-300),var(--blue-500));color:#051210;display:grid;place-items:center;font-weight:800;font-size:18px;flex-shrink:0}
        .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
        .sec-row{display:flex;align-items:center;gap:14px;padding:14px 0;border-bottom:1px solid var(--border)}
        .sec-row:last-of-type{border-bottom:0}
        .sec-icon{width:36px;height:36px;border-radius:10px;background:var(--bg-2);border:1px solid var(--border);display:grid;place-items:center;color:var(--brand-300);flex-shrink:0}
        .sec-body{flex:1}
        .sec-title{font-weight:600;font-size:14px}
        .sec-sub{font-size:12px;color:var(--text-muted);margin-top:2px}
        .toggle{width:36px;height:20px;border-radius:99px;background:var(--surface-3);border:1px solid var(--border);position:relative;cursor:pointer;transition:.15s}
        .toggle::after{content:"";position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;background:var(--text-muted);transition:.2s}
        .toggle.on{background:var(--brand-300);border-color:transparent}
        .toggle.on::after{left:18px;background:#051210}
        .divider{height:1px;background:var(--border);margin:24px 0}
        @media (max-width:800px){.settings-grid{grid-template-columns:1fr}.tabs-card{display:flex;overflow-x:auto}}
      `}</style>
    </div>
  );
}
function SecRow({icon:Icon,title,sub,action,toggle,enabled,accent}){
  const [on,setOn]=useState(!!enabled);
  return (
    <div className="sec-row">
      <div className="sec-icon"><Icon size={16}/></div>
      <div className="sec-body"><div className="sec-title">{title}</div><div className="sec-sub">{sub}</div></div>
      {toggle
        ? <div className={`toggle ${on?'on':''}`} onClick={()=>setOn(!on)}/>
        : <button className={`btn ${accent?'btn-primary':'btn-ghost'} btn-sm`}>{action}</button>}
    </div>
  );
}

/* ========== SUPPORT ========== */
export function Support(){
  const cats=[
    {icon:MessageSquare,title:'Live chat',desc:'Chat with our team · Response within hours',cta:'Start chat',primary:true},
    {icon:Mail,title:'Email support',desc:'support@sivantech.online',cta:'Send email'},
    {icon:FileText,title:'Help center',desc:'Guides, FAQs, and troubleshooting',cta:'Browse docs'},
    {icon:Phone,title:'Report an issue',desc:'Problem with a transaction? Open a ticket.',cta:'Open ticket'},
  ];
  return (
    <div className="page">
      <PageHeader title="Support" subtitle="We're here to help with anything from verification to delayed payouts."/>
      <div className="cat-grid">
        {cats.map((c,i)=>(
          <div key={i} className="cat-card">
            <div className="cat-ico"><c.icon size={20}/></div>
            <h3 style={{fontSize:16,marginBottom:6}}>{c.title}</h3>
            <p style={{fontSize:13,color:'var(--text-muted)',marginBottom:18,lineHeight:1.55}}>{c.desc}</p>
            <button className={`btn ${c.primary?'btn-primary':'btn-secondary'} btn-sm`}>{c.cta}<ArrowRight size={12}/></button>
          </div>
        ))}
      </div>
      <div className="card">
        <h3 style={{fontSize:18,marginBottom:14}}>Frequently asked</h3>
        <div className="faq-mini">
          {[
            ['How long does a sell take?','Most crypto-to-bank payouts arrive within 1–2 business days after your crypto is confirmed on-chain.'],
            ['What fees does Sivan charge?','A flat 1.5% transaction fee, plus network gas fees (shown clearly before you confirm). No account fees.'],
            ['My payout is delayed. What should I do?','Wait 48 hours after confirmation. If it still hasn\'t arrived, open a ticket with your reference number and we\'ll investigate.'],
            ['What happens if I send the wrong network?','Always send exactly the token and network displayed. Some wrong-network deposits can be rescued — open a ticket. Recovery is not guaranteed.'],
          ].map(([q,a],i)=>(
            <details key={i} className="faq-item-mini">
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
      <style>{`
        .cat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
        .cat-card{background:var(--panel);border:1px solid var(--border);border-radius:var(--radius-md);padding:22px;transition:.2s}
        .cat-card:hover{border-color:var(--border-strong);transform:translateY(-2px)}
        .cat-ico{width:44px;height:44px;border-radius:12px;background:var(--grad-primary-soft);border:1px solid var(--border-brand);color:var(--brand-300);display:grid;place-items:center;margin-bottom:16px}
        .faq-mini{display:flex;flex-direction:column;gap:4px}
        .faq-item-mini{border:1px solid var(--border);border-radius:10px;padding:0;overflow:hidden;transition:.1s}
        .faq-item-mini[open]{border-color:var(--border-strong)}
        .faq-item-mini summary{padding:13px 16px;font-size:13.5px;font-weight:600;cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center}
        .faq-item-mini summary::after{content:"+";color:var(--text-muted);font-size:18px;font-weight:400}
        .faq-item-mini[open] summary::after{content:"−"}
        .faq-item-mini p{padding:0 16px 14px;font-size:13px;color:var(--text-muted);line-height:1.6}
        @media (max-width:900px){.cat-grid{grid-template-columns:1fr 1fr}}
        @media (max-width:600px){.cat-grid{grid-template-columns:1fr}}
      `}</style>
    </div>
  );
}

function PageHeader({title,subtitle,cta}){
  return (
    <div className="page-head">
      <div><h1>{title}</h1><p>{subtitle}</p></div>
      {cta}
    </div>
  );
}
