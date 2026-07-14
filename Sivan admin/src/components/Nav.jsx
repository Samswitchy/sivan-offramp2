import {Link,NavLink,useLocation} from 'react-router-dom';
import {Menu,X} from 'lucide-react';
import {useState} from 'react';
import logo from '/sivan-logo.png';

export default function PublicNav(){
  const [open,setOpen]=useState(false);
  const loc=useLocation();
  const links=[
    {to:'#features',label:'Features'},
    {to:'#how',label:'How it works'},
    {to:'#fees',label:'Fees'},
    {to:'#faq',label:'FAQ'},
    {to:'#business',label:'Business'},
  ];
  return (
    <>
      <div className="risk-bar">
        <div className="container">
          <strong>Capital at risk.</strong> Cryptoassets are highly volatile and not protected by financial compensation schemes. Geographical restrictions apply.
          <a href="#faq">Learn more</a>
        </div>
      </div>
      <header className="public-nav">
        <div className="container nav-inner">
          <Link to="/" className="brand">
            <img src={logo} alt="Sivan" className="brand-mark" />
            <span className="brand-name">Sivan</span>
          </Link>
          <nav className="nav-links">
            {links.map(l=>(
              <a key={l.to} href={l.to}>{l.label}</a>
            ))}
          </nav>
          <div className="nav-cta">
            <Link to="/login" className="btn btn-ghost">Sign in</Link>
            <Link to="/signup" className="btn btn-primary btn-sm">Get started</Link>
            <button className="hamburger-btn" onClick={()=>setOpen(!open)} aria-label="Menu">
              {open?<X size={20}/>:<Menu size={20}/>}
            </button>
          </div>
        </div>
        {open && (
          <div className="mobile-menu">
            {links.map(l=><a key={l.to} href={l.to} onClick={()=>setOpen(false)}>{l.label}</a>)}
            <Link to="/login" onClick={()=>setOpen(false)} className="btn btn-ghost">Sign in</Link>
            <Link to="/signup" onClick={()=>setOpen(false)} className="btn btn-primary btn-block">Get started</Link>
          </div>
        )}
      </header>
      <style>{`
        .risk-bar{background:#e9b6600f;border-bottom:1px solid #e9b66033;color:#c6d0da;font-size:12px;padding:8px 0}
        .risk-bar strong{color:#e9c87a;margin-right:6px}
        .risk-bar a{color:#e9c87a;text-decoration:underline;margin-left:8px}
        .public-nav{position:sticky;top:0;z-index:40;background:#05080ce8;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid var(--border)}
        .nav-inner{display:flex;align-items:center;justify-content:space-between;height:68px;gap:24px}
        .brand{display:flex;align-items:center;gap:10px;font-weight:700;font-size:18px;letter-spacing:-.02em}
        .brand-mark{height:32px;width:auto;border-radius:7px}
        .nav-links{display:flex;gap:6px;align-items:center}
        .nav-links a{padding:9px 14px;border-radius:8px;color:var(--text-muted);font-size:13.5px;font-weight:500;transition:.15s}
        .nav-links a:hover{color:var(--text);background:#ffffff08}
        .nav-cta{display:flex;gap:10px;align-items:center}
        .hamburger-btn{display:none;color:var(--text);padding:8px;border-radius:8px;background:transparent;border:0}
        .mobile-menu{display:none}
        @media (max-width:900px){
          .nav-links{display:none}
          .hamburger-btn{display:inline-flex}
          .mobile-menu{display:flex;flex-direction:column;gap:4px;padding:16px 24px 24px;background:var(--bg);border-top:1px solid var(--border)}
          .mobile-menu a{padding:12px 10px;color:var(--text-dim);font-weight:600;border-radius:8px}
          .mobile-menu a:hover{background:#ffffff08;color:var(--text)}
          .mobile-menu .btn{margin-top:10px;justify-content:center}
        }
      `}</style>
    </>
  );
}
