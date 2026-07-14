import {Link,useNavigate,useLocation} from 'react-router-dom';
import {useState} from 'react';
import {Eye,EyeOff,Mail,Lock,User,ArrowRight,ShieldCheck,Check,Loader2,AlertCircle} from 'lucide-react';
import {useAuth} from '../context/AuthContext';
import logo from '/sivan-logo.png';

function AuthShell({children,side,eyebrow,title,sub}){
  return (
    <div className="auth-page">
      <div className="auth-grid">
        <div className="auth-left">
          <Link to="/" className="auth-brand">
            <img src={logo} alt="Sivan" className="brand-mark"/>
            <span>Sivan</span>
          </Link>
          <div className="auth-left-inner">
            <span className="eyebrow">{eyebrow}</span>
            <h1>{title}</h1>
            <p>{sub}</p>
            {side}
          </div>
          <div className="auth-foot">
            <p>Licensed partners. Non-custodial. Regulated-grade compliance.</p>
          </div>
        </div>
        <div className="auth-right">
          <div className="auth-card">
            {children}
          </div>
        </div>
      </div>
      <style>{`
        .auth-page{min-height:100vh;background:radial-gradient(600px 400px at 20% 0,#23bfb210,transparent),radial-gradient(600px 400px at 80% 100%,#4b8bf415,transparent),var(--bg);display:flex}
        .auth-grid{display:grid;grid-template-columns:1fr 1fr;flex:1;max-width:1200px;margin:0 auto;width:100%}
        .auth-left{padding:40px 48px;display:flex;flex-direction:column;position:relative;min-height:100vh}
        .auth-brand{display:inline-flex;align-items:center;gap:10px;font-weight:700;font-size:18px;letter-spacing:-.02em}
        .brand-mark{height:32px;width:auto;border-radius:7px}
        .auth-left-inner{margin:auto 0;max-width:440px;padding:40px 0}
        .auth-left-inner h1{font-size:40px;letter-spacing:-.03em;line-height:1.05;margin:12px 0 16px}
        .auth-left-inner p{color:var(--text-dim);font-size:15px;line-height:1.6}
        .auth-foot{color:var(--text-faint);font-size:12px}
        .auth-right{display:flex;align-items:center;justify-content:center;padding:40px;border-left:1px solid var(--border);background:#070b11}
        .auth-card{width:100%;max-width:420px;animation:fadeUp .4s ease}
        .card-title{font-size:22px;font-weight:700;margin-bottom:6px;letter-spacing:-.02em}
        .card-sub{font-size:13.5px;color:var(--text-muted);margin-bottom:24px}
        .card-sub a{color:var(--brand-300);font-weight:600;margin-left:4px}
        .alt-row{display:flex;gap:10px;margin:18px 0}
        .alt-btn{flex:1;padding:10px;border:1px solid var(--border);background:var(--surface);border-radius:10px;color:var(--text-dim);font-weight:600;font-size:13px;display:inline-flex;align-items:center;justify-content:center;gap:8px;transition:.15s}
        .alt-btn:hover{background:var(--surface-2);color:var(--text)}
        .divider{display:flex;align-items:center;gap:12px;color:var(--text-faint);font-size:11px;text-transform:uppercase;letter-spacing:.15em;font-weight:600;margin:8px 0 18px}
        .divider::before,.divider::after{content:"";flex:1;height:1px;background:var(--border)}
        .input-icon{position:relative}
        .input-icon svg{position:absolute;left:13px;top:50%;transform:translateY(-50%);color:var(--text-muted);width:16px;height:16px}
        .input-icon .input{padding-left:40px;padding-right:40px}
        .pw-toggle{position:absolute;right:10px;top:50%;transform:translateY(-50%);background:transparent;border:0;color:var(--text-muted);padding:6px;border-radius:6px}
        .pw-toggle:hover{color:var(--text)}
        .form-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
        .form-extras{display:flex;justify-content:space-between;align-items:center;margin:6px 0 20px;font-size:12.5px}
        .forgot{color:var(--brand-300);font-weight:600}
        .check-agree{font-size:12.5px;color:var(--text-dim);margin:18px 0 22px;line-height:1.5}
        .check-agree a{color:var(--brand-300);text-decoration:underline}
        @media (max-width:900px){
          .auth-grid{grid-template-columns:1fr}
          .auth-left{min-height:auto;padding:30px 24px}
          .auth-left-inner{padding:28px 0}
          .auth-left-inner h1{font-size:30px}
          .auth-foot{margin-top:24px}
          .auth-right{border-left:0;border-top:1px solid var(--border);padding:30px 24px}
        }
      `}</style>
    </div>
  );
}

function AuthPromo(){
  return (
    <ul className="promo-list">
      <li><span className="promo-ico"><Check size={14}/></span>Buy and sell USDC, USDT and more</li>
      <li><span className="promo-ico"><Check size={14}/></span>Direct bank payouts in USD, GBP, EUR, NGN</li>
      <li><span className="promo-ico"><Check size={14}/></span>One verification for all transactions</li>
      <li><span className="promo-ico"><Check size={14}/></span>Transparent fees, locked-in rates</li>
      <style>{`
        .promo-list{list-style:none;display:grid;gap:12px;margin-top:32px}
        .promo-list li{display:flex;gap:12px;align-items:center;font-size:14px;color:var(--text-dim)}
        .promo-ico{width:24px;height:24px;border-radius:50%;background:#23bfb218;border:1px solid #23bfb240;color:var(--brand-300);display:grid;place-items:center;flex-shrink:0}
      `}</style>
    </ul>
  );
}

export function Login(){
  const {signin}=useAuth();
  const nav=useNavigate();
  const loc=useLocation();
  const [showPw,setShowPw]=useState(false);
  const [email,setEmail]=useState('');
  const [pw,setPw]=useState('');
  const [err,setErr]=useState('');
  const [loading,setLoading]=useState(false);

  const submit=(e)=>{
    e.preventDefault();setErr('');
    if(!email||!pw){setErr('Please enter your email and password.');return}
    setLoading(true);
    setTimeout(()=>{
      signin(email);
      setLoading(false);
      const redirect=loc.state?.from||'/app';
      nav(redirect,{replace:true});
    },700);
  };

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Sign in to Sivan."
      sub="Access your dashboard to buy, sell and track your transactions."
      side={<AuthPromo/>}
    >
      <h2 className="card-title">Sign in</h2>
      <p className="card-sub">New to Sivan?<Link to="/signup">Create an account</Link></p>

      <div className="alt-row">
        <button className="alt-btn">G  Google</button>
        <button className="alt-btn">  Apple</button>
      </div>
      <div className="divider">or</div>

      <form onSubmit={submit}>
        {err && <div className="alert alert-error"><AlertCircle size={15}/>{err}</div>}
        <label className="field">
          <span>Email</span>
          <div className="input-icon">
            <Mail size={16}/>
            <input className="input" type="email" placeholder="name@example.com" value={email} onChange={e=>setEmail(e.target.value)}/>
          </div>
        </label>
        <label className="field">
          <span>Password</span>
          <div className="input-icon">
            <Lock size={16}/>
            <input className="input" type={showPw?'text':'password'} placeholder="Enter your password" value={pw} onChange={e=>setPw(e.target.value)}/>
            <button type="button" className="pw-toggle" onClick={()=>setShowPw(!showPw)} aria-label="Toggle password">
              {showPw?<EyeOff size={16}/>:<Eye size={16}/>}
            </button>
          </div>
        </label>
        <div className="form-extras">
          <label className="checkbox">
            <input type="checkbox"/><span className="box"/>Remember me
          </label>
          <a className="forgot" href="#">Forgot password?</a>
        </div>
        <button className="btn btn-primary btn-block btn-lg" disabled={loading}>
          {loading?<><Loader2 size={16} className="spin"/>Signing in...</>:<>Sign in<ArrowRight size={15}/></>}
        </button>
      </form>
      <style>{`
        .spin{animation:spin 1s linear infinite}
        @keyframes spin{to{transform:rotate(360deg)}}
        .alert{padding:10px 12px;border-radius:10px;font-size:13px;display:flex;align-items:center;gap:8px;margin-bottom:14px}
        .alert-error{background:#3d1818;color:#f3b3ad;border:1px solid #5d2525}
      `}</style>
    </AuthShell>
  );
}

export function Signup(){
  const {signup}=useAuth();
  const nav=useNavigate();
  const [showPw,setShowPw]=useState(false);
  const [form,setForm]=useState({first:'',last:'',email:'',password:'',country:'US',agree:false});
  const [err,setErr]=useState('');
  const [loading,setLoading]=useState(false);

  const setF=(k,v)=>setForm(s=>({...s,[k]:v}));

  const submit=(e)=>{
    e.preventDefault();setErr('');
    if(!form.email||!form.password||!form.first||!form.last){setErr('Please complete all required fields.');return}
    if(!form.agree){setErr('You must agree to the Terms of Service and Privacy Policy.');return}
    setLoading(true);
    setTimeout(()=>{
      signup(form.email,form.password,`${form.first} ${form.last}`);
      setLoading(false);
      nav('/app',{replace:true});
    },800);
  };

  return (
    <AuthShell
      eyebrow="Create account"
      title="Start buying and selling crypto in minutes."
      sub="Create your Sivan account. One verification unlocks both buy and sell."
      side={
        <div>
          <div className="verif-note">
            <ShieldCheck size={16}/> We use bank-grade encryption and licensed payment partners. Your data is encrypted at rest and in transit.
          </div>
          <style>{`
            .verif-note{display:inline-flex;gap:10px;align-items:flex-start;font-size:13px;color:var(--text-dim);background:var(--surface);border:1px solid var(--border);padding:14px 16px;border-radius:12px;margin-top:28px;line-height:1.55}
            .verif-note svg{color:var(--brand-300);flex-shrink:0;margin-top:1px}
          `}</style>
        </div>
      }
    >
      <h2 className="card-title">Create your account</h2>
      <p className="card-sub">Already have an account?<Link to="/login">Sign in</Link></p>

      <div className="alt-row">
        <button className="alt-btn">G  Google</button>
        <button className="alt-btn">  Apple</button>
      </div>
      <div className="divider">or</div>

      <form onSubmit={submit}>
        {err && <div className="alert alert-error" style={{padding:'10px 12px',borderRadius:10,fontSize:13,display:'flex',alignItems:'center',gap:8,marginBottom:14,background:'#3d1818',color:'#f3b3ad',border:'1px solid #5d2525'}}><AlertCircle size={15}/>{err}</div>}
        <div className="form-row">
          <label className="field">
            <span>First name</span>
            <div className="input-icon">
              <User size={16}/>
              <input className="input" placeholder="Jane" value={form.first} onChange={e=>setF('first',e.target.value)}/>
            </div>
          </label>
          <label className="field">
            <span>Last name</span>
            <input className="input" placeholder="Doe" value={form.last} onChange={e=>setF('last',e.target.value)}/>
          </label>
        </div>
        <label className="field">
          <span>Email address</span>
          <div className="input-icon">
            <Mail size={16}/>
            <input className="input" type="email" placeholder="name@example.com" value={form.email} onChange={e=>setF('email',e.target.value)}/>
          </div>
        </label>
        <label className="field">
          <span>Password</span>
          <div className="input-icon">
            <Lock size={16}/>
            <input className="input" type={showPw?'text':'password'} placeholder="At least 8 characters" value={form.password} onChange={e=>setF('password',e.target.value)}/>
            <button type="button" className="pw-toggle" onClick={()=>setShowPw(!showPw)}>
              {showPw?<EyeOff size={16}/>:<Eye size={16}/>}
            </button>
          </div>
        </label>
        <label className="field">
          <span>Country of residence</span>
          <select className="select" value={form.country} onChange={e=>setF('country',e.target.value)}>
            <option value="US">United States</option>
            <option value="GB">United Kingdom</option>
            <option value="NG">Nigeria</option>
            <option value="DE">Germany</option>
            <option value="FR">France</option>
            <option value="ES">Spain</option>
            <option value="NL">Netherlands</option>
            <option value="CA">Canada</option>
          </select>
        </label>
        <label className="checkbox check-agree">
          <input type="checkbox" checked={form.agree} onChange={e=>setF('agree',e.target.checked)}/><span className="box"/>
          <span>I agree to the <a href="#">Terms of Service</a>, <a href="#">Privacy Policy</a> and <a href="#">AML/KYC Policy</a>, and confirm I am at least 18 years old.</span>
        </label>
        <button className="btn btn-primary btn-block btn-lg" disabled={loading}>
          {loading?<><Loader2 size={16} className="spin"/>Creating account...</>:<>Create account<ArrowRight size={15}/></>}
        </button>
      </form>
      <style>{`
        .spin{animation:spin 1s linear infinite}
        @keyframes spin{to{transform:rotate(360deg)}}
      `}</style>
    </AuthShell>
  );
}
