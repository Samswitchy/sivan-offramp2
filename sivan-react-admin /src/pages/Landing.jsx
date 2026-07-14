import PublicNav from '../components/Nav';
import {Link} from 'react-router-dom';
import {
  ArrowRight,ShieldCheck,Clock,Zap,Globe,BarChart3,Lock,
  CreditCard,FileCode2,ChevronDown,Check,Star,
  ArrowUpRight,ArrowDownLeft,ExternalLink
} from 'lucide-react';
import {useState} from 'react';
import logo from '/sivan-logo.png';

const FEATURES=[
  {icon:Zap,title:'Fast payouts',body:'Most cash-outs land in your bank account in 1–2 business days via local payment rails. Track every step in real time.'},
  {icon:Lock,title:'Non-custodial by design',body:'Funds move directly through licensed payment partners. Sivan does not hold your crypto or fiat longer than required to settle.'},
  {icon:Globe,title:'Global, multi-currency',body:'Cash out to USD, GBP, EUR, and NGN at launch, with additional currencies and payment rails rolling out quarterly.'},
  {icon:BarChart3,title:'Transparent pricing',body:'One flat fee, shown before you send. The rate you see is locked for 90 seconds at quote time. No hidden spreads.'},
  {icon:ShieldCheck,title:'Built-in compliance',body:'Automated KYC, sanctions screening, anti-fraud and continuous transaction monitoring — handled in partnership with licensed providers.'},
  {icon:FileCode2,title:'Developer-ready API',body:'Launch on-ramps and off-ramps in your own app with a few lines of code. SDKs for Web, iOS and Android.'},
];

const FAQS=[
  {q:'Do I need to complete KYC to use Sivan?',a:'Yes. Sivan works with licensed payment providers, which requires all users to complete a one-time identity verification (government ID + selfie) before their first transaction. This typically takes 2–5 minutes and unlocks both buying and selling.'},
  {q:'Which countries and payment methods are supported?',a:'Sivan currently supports users in Nigeria, the US, UK, and the EU/EEA, with additional jurisdictions being added regularly. Available payout methods are displayed after sign-up based on your region, and include ACH, SEPA, FPS, and NIP bank transfers.'},
  {q:'How long does a transaction take?',a:'Crypto-to-bank payouts typically arrive in 1–2 business days after your crypto deposit is confirmed on-chain. Crypto purchases deliver within minutes of your payment clearing. Exact timing depends on the network used and your bank\'s processing times.'},
  {q:'What are the fees?',a:'Sivan charges a flat 1.5% transaction fee for both buy and sell orders. Network gas fees and payment-processor fees are displayed clearly before you confirm, with no hidden spreads or account fees.'},
  {q:'What happens if I send the wrong token or wrong network?',a:'Always send only the token and network displayed on your deposit screen. Sending an unsupported asset or using the wrong network can result in permanent loss of funds, as blockchain transactions are irreversible. If a wrong-deposit recovery is possible, our support team will attempt it, but recovery is not guaranteed.'},
  {q:'Does Sivan hold my funds?',a:'No. Sivan is non-custodial by design. Customer funds are held and processed by licensed payment providers. Sivan facilitates the transaction and tracks state — we do not custody customer fiat or crypto long-term.'},
  {q:'Is there an API for businesses?',a:'Yes. We provide a REST API, native SDKs, and a white-label widget for wallets, dApps, neobanks and fintechs. See the Business section or contact us for developer access.'},
];

export default function Landing(){
  const [openFaq,setOpenFaq]=useState(null);
  return (
    <div className="landing">
      <PublicNav/>

      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy fade-up">
            <span className="eyebrow">Crypto to fiat. Fiat to crypto.</span>
            <h1>Buy and sell crypto<br/><span className="grad">the simple way.</span></h1>
            <p className="lead">Convert USDC, USDT and other digital assets directly to your bank account — or buy crypto with a transfer. One verification, transparent fees, and payout in as little as one business day.</p>
            <div className="cta-row">
              <Link to="/signup" className="btn btn-primary btn-lg">Get started <ArrowRight size={16}/></Link>
              <a href="#how" className="btn btn-secondary btn-lg">See how it works</a>
            </div>
            <div className="hero-trust">
              <div className="rating">
                <div className="stars">{[...Array(5)].map((_,i)=><Star key={i} size={13} fill="#e9c87a" stroke="#e9c87a"/>)}</div>
                <span><strong>4.8</strong> · Trusted by users globally</span>
              </div>
              <div className="trust-chips">
                <span><Check size={14}/>Licensed partners</span>
                <span><Check size={14}/>Non-custodial</span>
                <span><Check size={14}/>1–2 day payouts</span>
              </div>
            </div>
          </div>
          <div className="hero-widget-wrap">
            <HeroWidget/>
          </div>
        </div>
      </section>

      {/* PARTNER/LOGOS STRIP */}
      <div className="trust-strip">
        <div className="container strip-grid">
          <span className="strip-label">Supported</span>
          <div className="chips">
            <span className="chip">Visa</span>
            <span className="chip">Mastercard</span>
            <span className="chip">Apple Pay</span>
            <span className="chip">ACH</span>
            <span className="chip">SEPA</span>
            <span className="chip">FPS</span>
            <span className="chip">NIP</span>
            <span className="chip">USDC</span>
            <span className="chip">USDT</span>
            <span className="chip">Base</span>
            <span className="chip">Ethereum</span>
            <span className="chip">Avalanche</span>
          </div>
        </div>
      </div>

      {/* STATS */}
      <section className="section">
        <div className="container">
          <div className="stats-grid">
            <StatCard value="150+" label="Countries supported"/>
            <StatCard value="$2B+" label="Processed volume"/>
            <StatCard value="40+" label="Currency & crypto pairs"/>
            <StatCard value="99.9%" label="Uptime track record"/>
          </div>
        </div>
      </section>

      {/* DIRECTIONS */}
      <section className="section" id="features">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow center">Two directions</span>
            <h2>Move value in either direction.</h2>
            <p>One platform. One verification. Sell crypto to your bank or buy crypto with fiat — the same simple experience.</p>
          </div>
          <div className="direction-grid">
            <div className="direction sell">
              <div className="dir-head">
                <span className="chip chip-brand"><ArrowUpRight size={14}/>Sell</span>
              </div>
              <h3>Crypto to your bank account.</h3>
              <p className="dir-desc">Send stablecoins from any wallet. We convert and pay out in local currency.</p>
              <ul className="dir-list">
                <li><Check size={14}/>Works with USDC, USDT and more</li>
                <li><Check size={14}/>Payouts in USD, GBP, EUR, NGN</li>
                <li><Check size={14}/>Unique deposit address per order</li>
                <li><Check size={14}/>Track confirmations on-chain</li>
              </ul>
              <div className="dir-foot">
                <div className="dir-meta">From <strong>1.5%</strong> · 1–2 business days</div>
                <Link to="/signup" className="btn btn-primary">Start selling <ArrowRight size={14}/></Link>
              </div>
            </div>
            <div className="direction buy">
              <div className="dir-head">
                <span className="chip chip-purple"><ArrowDownLeft size={14}/>Buy</span>
                <span className="badge badge-gold" style={{marginLeft:'auto'}}>Live now</span>
              </div>
              <h3>Buy crypto directly with fiat.</h3>
              <p className="dir-desc">Pay by bank transfer, card or Apple Pay. Receive crypto in any wallet you control.</p>
              <ul className="dir-list">
                <li><Check size={14}/>Bank transfer, card, Apple Pay</li>
                <li><Check size={14}/>Delivered after payment clears</li>
                <li><Check size={14}/>Self-custody — we never hold it</li>
                <li><Check size={14}/>Same KYC covers both directions</li>
              </ul>
              <div className="dir-foot">
                <div className="dir-meta">From <strong>1.5%</strong> · Minutes after clear</div>
                <Link to="/signup" className="btn btn-outline">Start buying <ArrowRight size={14}/></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" id="how">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow center">How it works</span>
            <h2>Three steps from crypto to cash.</h2>
            <p>Whether you're buying or selling, the flow is guided end to end — no order books, no trading interface, no jargon.</p>
          </div>
          <div className="steps-grid">
            <Step n="01" icon={ShieldCheck} title="Create and verify your account" body="Sign up with your email, confirm your phone and complete a short identity check. Your verification unlocks both buy and sell."/>
            <Step n="02" icon={CreditCard} title="Get a quote and send funds" body="Pick your direction and amount. We show you the rate, fee and arrival time up front — then lock your rate for 90 seconds while you send."/>
            <Step n="03" icon={Clock} title="Receive your payout" body="Cash arrives in your bank account or crypto lands in your wallet. Track every confirmation in real time with on-chain references."/>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="section">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow center">Why Sivan</span>
            <h2>Built for people who just want it to work.</h2>
            <p>We've stripped out the complexity and built a regulated-grade ramp with everyday users in mind.</p>
          </div>
          <div className="feat-grid">
            {FEATURES.map((f,i)=>(
              <div key={i} className="feat-card">
                <div className="feat-ico"><f.icon size={20}/></div>
                <h4>{f.title}</h4>
                <p>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUSINESS */}
      <section className="section" id="business">
        <div className="container">
          <div className="biz-grid">
            <div>
              <span className="eyebrow">For builders &amp; businesses</span>
              <h2>Onboard your users with a single integration.</h2>
              <p>Launch on-ramps and off-ramps inside your own wallet, dApp, exchange or fintech in days — not quarters. One API, global coverage, brand-customizable widget.</p>
              <ul className="biz-list">
                <li><Check size={14}/>REST API + Web, iOS and Android SDKs</li>
                <li><Check size={14}/>White-label widget with theme customization</li>
                <li><Check size={14}/>KYC / AML handled by licensed partners</li>
                <li><Check size={14}/>Webhooks for every transaction state change</li>
              </ul>
              <div className="cta-row" style={{marginTop:24}}>
                <a href="#" className="btn btn-primary">Read the docs <ExternalLink size={14}/></a>
                <a href="#" className="btn btn-secondary">Talk to sales</a>
              </div>
            </div>
            <div className="code-card">
              <div className="code-dots"><span/><span/><span/></div>
<pre className="mono"><span className="com">// Create an off-ramp session</span>
<span className="kw">const</span> session = <span className="kw">await</span> sivan.sessions.<span className="fn">create</span>({'{'}
  flow: <span className="str">"offramp"</span>,
  sourceCurrency: <span className="str">"USDC"</span>,
  sourceChain: <span className="str">"base"</span>,
  destinationCurrency: <span className="str">"USD"</span>,
  destinationMethod: <span className="str">"ach"</span>,
  amount: <span className="num">1000</span>
{'}'});
<span className="com">// → session.depositAddress, session.quote, session.id</span></pre>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq">
        <div className="container-md">
          <div className="section-head center">
            <span className="eyebrow center">Frequently asked</span>
            <h2>Questions, answered.</h2>
          </div>
          <div className="faq">
            {FAQS.map((f,i)=>(
              <div key={i} className={`faq-item ${openFaq===i?'open':''}`}>
                <button onClick={()=>setOpenFaq(openFaq===i?null:i)} className="faq-q">
                  <span>{f.q}</span>
                  <ChevronDown size={18} className="chev"/>
                </button>
                <div className="faq-a"><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section" id="fees">
        <div className="container">
          <div className="final-cta">
            <span className="eyebrow center">Get started</span>
            <h2>Your first transaction in about five minutes.</h2>
            <p>Move between crypto and your bank with a few taps. No exchange account, no order books, no hassle.</p>
            <div className="cta-row" style={{justifyContent:'center'}}>
              <Link to="/signup" className="btn btn-primary btn-lg">Create free account <ArrowRight size={16}/></Link>
            </div>
            <p className="login-note">Already have an account? <Link to="/login">Sign in</Link></p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="foot-brand-col">
              <div className="flex gap-12" style={{alignItems:'center'}}>
                <img src={logo} alt="Sivan" style={{height:30,width:'auto',borderRadius:7}}/>
                <strong style={{fontSize:18,letterSpacing:'-.02em'}}>Sivan</strong>
              </div>
              <p style={{color:'var(--text-muted)',fontSize:13,marginTop:14,maxWidth:300,lineHeight:1.6}}>A regulated-grade on-ramp and off-ramp for cryptoassets. Built to make moving value between crypto and fiat simple, transparent and secure.</p>
            </div>
            <FooterCol title="Product" links={[
              {l:'Sell crypto',h:'#features'},{l:'Buy crypto',h:'#features'},
              {l:'Fees & limits',h:'#fees'},{l:'Supported countries',h:'#'},
              {l:'System status',h:'#'},
            ]}/>
            <FooterCol title="Business" links={[
              {l:'On-ramp API',h:'#business'},{l:'Off-ramp API',h:'#business'},
              {l:'SDKs & widget',h:'#business'},{l:'Pricing',h:'#'},{l:'Talk to sales',h:'#'},
            ]}/>
            <FooterCol title="Resources" links={[
              {l:'How it works',h:'#how'},{l:'FAQ',h:'#faq'},
              {l:'Help center',h:'#'},{l:'Developer docs',h:'#business'},{l:'Contact support',h:'#'},
            ]}/>
            <FooterCol title="Company" links={[
              {l:'About',h:'#'},{l:'Careers',h:'#'},{l:'Terms of Service',h:'#'},
              {l:'Privacy Policy',h:'#'},{l:'AML / KYC Policy',h:'#'},{l:'Risk disclosure',h:'#'},
            ]}/>
          </div>
          <div className="foot-bottom">
            <p>© 2026 Sivan Technologies Ltd. All rights reserved. Cryptoassets are volatile and not protected by financial compensation schemes. Services are provided in conjunction with licensed payment partners and may be restricted in certain jurisdictions. Capital at risk.</p>
          </div>
        </div>
      </footer>

      <style>{`
        .landing{min-height:100vh}
        .hero{padding:80px 0 70px;position:relative;overflow:hidden}
        .hero::before{content:"";position:absolute;inset:0;background:radial-gradient(700px 400px at 85% 0%,#23bfb218,transparent 60%),radial-gradient(600px 400px at 0% 40%,#4b8bf415,transparent 60%);pointer-events:none}
        .hero-grid{display:grid;grid-template-columns:1.05fr 1fr;gap:60px;align-items:center;position:relative}
        .hero h1{font-size:clamp(36px,5vw,56px);line-height:1.05;margin:14px 0 20px;font-weight:700}
        .grad{background:linear-gradient(135deg,var(--brand-300),var(--blue-500));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .lead{font-size:17px;line-height:1.65;color:var(--text-dim);max-width:540px}
        .cta-row{display:flex;gap:12px;flex-wrap:wrap;margin:28px 0 22px}
        .hero-trust{display:flex;gap:24px;flex-wrap:wrap;align-items:center}
        .rating{display:inline-flex;gap:10px;align-items:center;padding:8px 14px;border:1px solid var(--border);border-radius:999px;background:#ffffff05;font-size:13px}
        .rating .stars{display:flex;gap:2px}
        .rating strong{color:var(--brand-300)}
        .trust-chips{display:flex;gap:14px;flex-wrap:wrap}
        .trust-chips span{font-size:12.5px;color:var(--text-muted);display:inline-flex;align-items:center;gap:6px}
        .trust-chips span svg{color:var(--brand-300)}
        .hero-widget-wrap{display:flex;justify-content:center;position:relative}
        .trust-strip{border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:26px 0;background:#080d1480}
        .strip-grid{display:grid;grid-template-columns:auto 1fr;gap:28px;align-items:center}
        .strip-label{font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.16em;font-weight:600;white-space:nowrap}
        .chips{display:flex;gap:10px;flex-wrap:wrap}
        .chip{padding:7px 14px;border:1px solid var(--border);border-radius:999px;font-size:12.5px;font-weight:600;color:var(--text-dim);background:#ffffff06}
        .section{padding:100px 0}
        .section-head{margin-bottom:56px}
        .section-head.center{text-align:center}
        .section-head p{color:var(--text-muted);font-size:16px;max-width:600px;margin:12px auto 0;line-height:1.6}
        .stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
        .stat{border:1px solid var(--border);background:var(--panel);border-radius:var(--radius-lg);padding:28px;text-align:center}
        .stat .v{font-size:clamp(28px,3vw,38px);font-weight:700;letter-spacing:-.02em;background:linear-gradient(135deg,var(--brand-300),var(--blue-500));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
        .stat .l{color:var(--text-muted);font-size:13px;margin-top:6px}
        .direction-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
        .direction{border:1px solid var(--border);border-radius:var(--radius-xl);padding:40px;position:relative;overflow:hidden;display:flex;flex-direction:column;min-height:380px}
        .direction.sell{background:linear-gradient(160deg,#0f1d1c,#0a141a)}
        .direction.sell::after{content:"";position:absolute;inset:-100px -100px auto auto;width:320px;height:320px;background:radial-gradient(circle,#23bfb230,transparent 65%);pointer-events:none}
        .direction.buy{background:linear-gradient(160deg,#15132b,#0c0e1f);border-color:#8b7cff35}
        .direction.buy::after{content:"";position:absolute;inset:-100px -100px auto auto;width:320px;height:320px;background:radial-gradient(circle,#8b7cff25,transparent 65%);pointer-events:none}
        .dir-head{display:flex;align-items:center;margin-bottom:20px}
        .chip-brand{background:#23bfb218;color:var(--brand-300);border:1px solid #23bfb245;font-size:11.5px;font-weight:600;padding:6px 12px;border-radius:999px;display:inline-flex;align-items:center;gap:6px}
        .chip-purple{background:#8b7cff20;color:var(--purple);border:1px solid #8b7cff40}
        .direction h3{font-size:28px;letter-spacing:-.02em;margin-bottom:10px;position:relative;line-height:1.2}
        .dir-desc{color:var(--text-muted);font-size:15px;margin-bottom:22px;position:relative}
        .dir-list{list-style:none;display:grid;gap:9px;margin-bottom:24px;position:relative}
        .dir-list li{display:flex;gap:10px;align-items:center;font-size:13.5px;color:var(--text-dim)}
        .dir-list li svg{color:var(--brand-300);flex-shrink:0}
        .direction.buy .dir-list li svg{color:var(--purple)}
        .dir-foot{margin-top:auto;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;position:relative}
        .dir-meta{color:var(--text-muted);font-size:13px}
        .dir-meta strong{color:var(--text);font-size:15px}
        .steps-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
        .step{border:1px solid var(--border);background:var(--panel);border-radius:var(--radius-lg);padding:32px;position:relative;transition:.2s}
        .step:hover{border-color:var(--border-strong);transform:translateY(-3px)}
        .step .num{position:absolute;top:20px;right:20px;font-size:44px;font-weight:700;opacity:.2;background:linear-gradient(135deg,var(--brand-300),var(--blue-500));-webkit-background-clip:text;-webkit-text-fill-color:transparent;line-height:1}
        .step-ico{width:54px;height:54px;border-radius:14px;background:linear-gradient(135deg,#23bfb220,#4b8bf420);border:1px solid #23bfb240;color:var(--brand-300);display:grid;place-items:center;margin-bottom:20px}
        .step h4{font-size:18px;margin-bottom:10px}
        .step p{color:var(--text-muted);font-size:14px;line-height:1.6}
        .feat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
        .feat-card{border:1px solid var(--border);border-radius:var(--radius-lg);padding:28px;transition:.2s;background:var(--panel)}
        .feat-card:hover{border-color:var(--border-strong);transform:translateY(-2px)}
        .feat-ico{width:44px;height:44px;border-radius:12px;background:#23bfb215;border:1px solid #23bfb235;color:var(--brand-300);display:grid;place-items:center;margin-bottom:16px}
        .feat-card h4{font-size:16px;margin-bottom:8px}
        .feat-card p{color:var(--text-muted);font-size:13.5px;line-height:1.6}
        .biz-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center}
        .biz-list{list-style:none;display:grid;gap:10px;margin-top:22px}
        .biz-list li{display:flex;gap:10px;align-items:center;font-size:14px;color:var(--text-dim)}
        .biz-list li svg{color:var(--brand-300);flex-shrink:0}
        .code-card{background:#070b11;border:1px solid var(--border-strong);border-radius:var(--radius-lg);padding:24px;font-family:var(--mono);font-size:13px;line-height:1.75;box-shadow:var(--shadow-lg);position:relative;overflow-x:auto}
        .code-dots{display:flex;gap:6px;margin-bottom:16px}
        .code-dots span{width:10px;height:10px;border-radius:50%}
        .code-dots span:nth-child(1){background:#ff5f57}
        .code-dots span:nth-child(2){background:#febc2e}
        .code-dots span:nth-child(3){background:#28c840}
        .code-card .com{color:#536377}
        .code-card .kw{color:#8b7cff}
        .code-card .str{color:var(--brand-300)}
        .code-card .fn{color:var(--blue-500)}
        .code-card .num{color:var(--gold)}
        .faq{max-width:820px;margin:0 auto}
        .faq-item{border:1px solid var(--border);border-radius:12px;margin-bottom:10px;background:var(--panel);overflow:hidden}
        .faq-item.open{border-color:var(--border-strong)}
        .faq-q{width:100%;padding:18px 22px;display:flex;justify-content:space-between;align-items:center;gap:20px;text-align:left;background:transparent;color:var(--text);font-size:14.5px;font-weight:600}
        .faq-q .chev{color:var(--text-muted);transition:transform .2s}
        .faq-item.open .chev{transform:rotate(180deg);color:var(--brand-300)}
        .faq-a{max-height:0;overflow:hidden;transition:max-height .3s ease}
        .faq-item.open .faq-a{max-height:400px}
        .faq-a p{padding:0 22px 20px;color:var(--text-muted);font-size:14px;line-height:1.65}
        .final-cta{border:1px solid var(--border-strong);border-radius:var(--radius-xl);padding:72px 40px;text-align:center;background:radial-gradient(500px 280px at 20% 0,#23bfb225,transparent),radial-gradient(500px 280px at 80% 100%,#4b8bf425,transparent),linear-gradient(160deg,#101b20,#0a0f16);box-shadow:var(--shadow-lg)}
        .final-cta h2{font-size:clamp(28px,3.6vw,40px);margin:12px 0 14px}
        .final-cta p{color:var(--text-muted);max-width:520px;margin:0 auto 28px;font-size:16px;line-height:1.6}
        .final-cta .cta-row{margin-top:0}
        .login-note{color:var(--text-muted);font-size:13px;margin-top:14px}
        .login-note a{color:var(--brand-300);font-weight:600}
        .footer{border-top:1px solid var(--border);padding:60px 0 30px;margin-top:40px;background:#05080e}
        .footer-grid{display:grid;grid-template-columns:1.6fr repeat(4,1fr);gap:40px;margin-bottom:40px}
        .foot-col h5{font-size:12px;text-transform:uppercase;letter-spacing:.13em;color:var(--text-dim);margin-bottom:16px;font-weight:600}
        .foot-col ul{list-style:none;display:grid;gap:10px}
        .foot-col a{color:var(--text-muted);font-size:13.5px;transition:.15s}
        .foot-col a:hover{color:var(--brand-300)}
        .foot-bottom{border-top:1px solid var(--border);padding-top:24px}
        .foot-bottom p{color:var(--text-faint);font-size:11.5px;line-height:1.7}
        @media (max-width:1080px){
          .hero-grid,.biz-grid{grid-template-columns:1fr;gap:40px}
          .hero{padding:48px 0 40px;text-align:center}
          .lead{margin:0 auto}
          .cta-row{justify-content:center}
          .hero-trust{justify-content:center}
          .stats-grid{grid-template-columns:repeat(2,1fr)}
          .direction-grid,.steps-grid,.feat-grid{grid-template-columns:1fr}
          .footer-grid{grid-template-columns:1fr 1fr;gap:30px}
          .strip-grid{grid-template-columns:1fr;text-align:center}
          .chips{justify-content:center}
        }
        @media (max-width:640px){
          .container{padding:0 20px}
          .section{padding:64px 0}
          .final-cta{padding:50px 22px}
          .direction{padding:28px}
          .footer-grid{grid-template-columns:1fr}
        }
      `}</style>
    </div>
  );
}

function StatCard({value,label}){
  return <div className="stat"><div className="v">{value}</div><div className="l">{label}</div></div>;
}

function Step({n,icon:Icon,title,body}){
  return (
    <div className="step">
      <div className="num">{n}</div>
      <div className="step-ico"><Icon size={22}/></div>
      <h4>{title}</h4>
      <p>{body}</p>
    </div>
  );
}

function FooterCol({title,links}){
  return (
    <div className="foot-col">
      <h5>{title}</h5>
      <ul>{links.map((l,i)=><li key={i}><a href={l.h}>{l.l}</a></li>)}</ul>
    </div>
  );
}

/* Hero widget: interactive-looking buy/sell card (visual only) */
function HeroWidget(){
  const [mode,setMode]=useState('sell');
  return (
    <div className="widget-wrap">
      <div className="w-card">
        <div className="w-tabs">
          <button className={mode==='sell'?'active':''} onClick={()=>setMode('sell')}>Sell</button>
          <button className={mode==='buy'?'active':''} onClick={()=>setMode('buy')}>Buy</button>
        </div>
        <div className="w-field">
          <div className="w-lbl"><span>{mode==='sell'?'You send':'You pay'}</span><span className="w-rate">1 USDC = $1.0012</span></div>
          <div className="w-row">
            <input readOnly value={mode==='sell'?'1,000':'1,000.00'}/>
            <div className="w-asset">
              <span className="asset-dot usdc">₮</span>
              <span>{mode==='sell'?'USDC':'USD'}</span>
            </div>
          </div>
        </div>
        <div className="w-swap">⇅</div>
        <div className="w-field">
          <div className="w-lbl"><span>{mode==='sell'?'You receive':'You get'}</span></div>
          <div className="w-row">
            <input readOnly value={mode==='sell'?'985.00':'985'}/>
            <div className="w-asset">
              <span className="asset-dot usd">$</span>
              <span>{mode==='sell'?'USD · ACH':'USDC'}</span>
            </div>
          </div>
        </div>
        <div className="w-quote">
          <div className="wq"><span>Rate</span><span className="mono">1 USDC = $1.0012</span></div>
          <div className="wq"><span>Fee (1.5%)</span><span className="mono" style={{color:'var(--red)'}}>−$15.00</span></div>
          <div className="wq"><span>Arrival</span><span>1–2 business days</span></div>
        </div>
        <Link to="/signup" className="btn btn-primary btn-block btn-lg" style={{marginTop:6}}>
          {mode==='sell'?'Get deposit address':'Buy crypto'}
        </Link>
        <div className="w-footnote">Rate locked for 90 seconds after confirmation. No hidden fees.</div>
      </div>
      <style>{`
        .widget-wrap{position:relative;max-width:420px;width:100%;perspective:1200px}
        .w-card{
          position:relative;background:linear-gradient(160deg,#101b20,#0a0f16);border:1px solid var(--border-strong);
          border-radius:20px;padding:22px;box-shadow:var(--shadow-lg);transform:rotateY(-4deg) rotateX(2deg);
        }
        .w-card::before{content:"";position:absolute;inset:-1px;border-radius:22px;padding:1px;background:linear-gradient(135deg,#4cd8c850,#4b8bf450);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:.4;pointer-events:none}
        .w-tabs{display:grid;grid-template-columns:1fr 1fr;background:#080d14;border:1px solid var(--border);border-radius:10px;padding:4px;margin-bottom:16px}
        .w-tabs button{background:transparent;color:var(--text-muted);font-weight:600;font-size:13px;padding:10px;border-radius:7px;transition:.15s}
        .w-tabs button.active{background:linear-gradient(135deg,var(--brand-300),var(--brand-500));color:#051210;font-weight:700}
        .w-field{background:#080d14;border:1px solid var(--border);border-radius:13px;padding:12px 14px;margin-bottom:10px}
        .w-lbl{display:flex;justify-content:space-between;align-items:center;font-size:10.5px;color:var(--text-muted);font-weight:600;letter-spacing:.08em;text-transform:uppercase;margin-bottom:4px}
        .w-rate{color:var(--brand-300);text-transform:none;letter-spacing:0;font-weight:600}
        .w-row{display:flex;align-items:center;justify-content:space-between;gap:8px}
        .w-row input{background:transparent;border:0;color:var(--text);font-size:24px;font-weight:700;outline:none;width:100%;font-family:inherit;letter-spacing:-.02em}
        .w-asset{display:inline-flex;align-items:center;gap:7px;background:#121c28;border:1px solid var(--border);padding:7px 10px;border-radius:9px;font-size:13px;font-weight:600;white-space:nowrap;flex-shrink:0}
        .asset-dot{width:20px;height:20px;border-radius:50%;display:grid;place-items:center;font-size:10px;font-weight:800;color:#051210}
        .asset-dot.usdc{background:linear-gradient(135deg,#4cd8c8,#23bfb2)}
        .asset-dot.usd{background:linear-gradient(135deg,#a0d4ff,#4b8bf4)}
        .w-swap{width:36px;height:36px;margin:-6px auto;border-radius:50%;background:#080d14;border:1px solid var(--border-strong);color:var(--brand-300);display:grid;place-items:center;font-weight:700;position:relative;z-index:1;cursor:pointer;transition:.2s}
        .w-swap:hover{transform:rotate(180deg)}
        .w-quote{background:linear-gradient(135deg,#23bfb215,#4b8bf415);border:1px solid #23bfb235;border-radius:11px;padding:12px 14px;margin:14px 0 4px;font-size:12px;color:var(--text-dim)}
        .wq{display:flex;justify-content:space-between;padding:3px 0}
        .wq span:last-child{color:var(--text);font-weight:600}
        .w-footnote{font-size:10.5px;color:var(--text-faint);text-align:center;margin-top:8px}
        @media (max-width:1080px){.w-card{transform:none;margin:0 auto}}
      `}</style>
    </div>
  );
}
