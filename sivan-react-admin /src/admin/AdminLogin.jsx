import {useState} from 'react';
import {Link,useNavigate,useLocation} from 'react-router-dom';
import {Eye,EyeOff,ShieldCheck,Loader2,ArrowRight,Lock,Mail,AlertCircle} from 'lucide-react';
import {useAdminAuth} from '../admin/AdminAuthContext';


export default function AdminLogin(){
  const {signin}=useAdminAuth();
  const nav=useNavigate();
  const loc=useLocation();
  const [email,setEmail]=useState('admin@sivantech.online');
  const [password,setPassword]=useState('admin123');
  const [showPw,setShowPw]=useState(false);
  const [loading,setLoading]=useState(false);
  const [err,setErr]=useState('');

  const onSubmit=(e)=>{
    e.preventDefault();
    setErr('');
    setLoading(true);
    setTimeout(()=>{
      try{
        signin(email,password);
        const to=loc.state?.from || '/admin';
        nav(to,{replace:true});
      }catch(e){
        setErr(e.message);
      }finally{
        setLoading(false);
      }
    },500);
  };

  return (
    <div className="admin-login-wrap">
      {/* Ambient background */}
      <div className="admin-login-bg">
        <div className="al-glow al-glow-1"/>
        <div className="al-glow al-glow-2"/>
        <div className="al-grid"/>
      </div>

      {/* Left side — brand + security messaging */}
      <aside className="admin-login-side">
        <Link to="/" className="admin-login-logo">
          <span className="admin-logo-mark">
            <span className="admin-logo-gradient"/>
            <span className="admin-logo-s">S</span>
          </span>
          <span>
            <span className="admin-logo-word">Sivan</span>
            <span className="admin-logo-sub">Admin Console</span>
          </span>
        </Link>

        <div className="admin-login-hero">
          <div className="al-badge"><ShieldCheck size={14}/> Secure Operations Portal</div>
          <h1>Run your rails.<br/><span className="grad-text">Monitor every move.</span></h1>
          <p>The control center for Sivan's on-ramp and off-ramp infrastructure — transactions, KYC, liquidity, disputes, and compliance, all in one place.</p>

          <ul className="al-feats">
            <li><div className="al-feat-dot grad-bg"/><div><strong>Real-time ledger</strong><span>Monitor volume, success rate, rails and gas in milliseconds.</span></div></li>
            <li><div className="al-feat-dot grad-bg"/><div><strong>Compliance orchestrated</strong><span>KYC queues, sanction screening, tier upgrades — with full audit.</span></div></li>
            <li><div className="al-feat-dot grad-bg"/><div><strong>Role-based access</strong><span>Super Admin, Operator, Compliance — least-privilege by default.</span></div></li>
          </ul>
        </div>

        <div className="al-foot">
          <span>© 2026 Sivan Technologies</span>
          <span className="al-foot-sep">•</span>
          <span>Internal use only</span>
        </div>
      </aside>

      {/* Right side — form */}
      <main className="admin-login-form-wrap">
        <div className="al-form-card">
          <div className="al-form-head">
            <div className="al-form-eyebrow">Admin sign in</div>
            <h2>Welcome back</h2>
            <p>Enter your credentials to access the operations console.</p>
          </div>

          {err && (
            <div className="al-error"><AlertCircle size={16}/>{err}</div>
          )}

          <form onSubmit={onSubmit} className="al-form">
            <label className="al-field">
              <span className="al-label"><Mail size={14}/> Work email</span>
              <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@company.com" autoComplete="email"/>
            </label>

            <label className="al-field">
              <span className="al-label"><Lock size={14}/> Password</span>
              <div className="al-pw-wrap">
                <input type={showPw?'text':'password'} required value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password"/>
                <button type="button" className="al-pw-toggle" onClick={()=>setShowPw(!showPw)} tabIndex="-1">
                  {showPw?<EyeOff size={16}/>:<Eye size={16}/>}
                </button>
              </div>
            </label>

            <div className="al-form-row">
              <label className="al-check">
                <input type="checkbox" defaultChecked/>
                <span className="al-check-box"/>
                <span>Keep me signed in</span>
              </label>
              <button type="button" className="al-link">Forgot password?</button>
            </div>

            <button type="submit" className="btn-primary al-submit" disabled={loading}>
              {loading?<><Loader2 size={16} className="spin"/>Signing in…</>:<>Sign in to console<ArrowRight size={16}/></>}
            </button>
          </form>

          <div className="al-demo-hint">
            <strong>Demo credentials</strong>
            <div className="al-demo-row"><span>Super Admin</span><code>admin@sivantech.online / admin123</code></div>
            <div className="al-demo-row"><span>Compliance</span><code>compliance@sivantech.online / comp123</code></div>
            <div className="al-demo-row"><span>Operator</span><code>ops@sivantech.online / ops123</code></div>
          </div>

          <div className="al-back">
            <Link to="/">← Back to sivan.app</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
