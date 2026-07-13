import {Link} from 'react-router-dom';
import {
  ArrowUpRight,ArrowDownLeft,ArrowRight,ShieldCheck,CreditCard,Clock,
  TrendingUp,TrendingDown,ExternalLink,Copy,PlusCircle,CheckCircle2,AlertCircle
} from 'lucide-react';
import {useAuth} from '../context/AuthContext';

export default function Dashboard(){
  const {user}=useAuth();
  const kycDone=user?.kycStatus==='verified';
  const firstName=user?.name?.split(' ')[0]||'there';

  return (
    <div className="dash">
      {/* Welcome/status strip */}
      <div className={`welcome ${kycDone?'ok':'warn'}`}>
        <div>
          {kycDone ? (
            <>
              <div className="welcome-title">Welcome back, {firstName}.</div>
              <div className="welcome-sub">Your account is verified. You can buy and sell crypto.</div>
            </>
          ) : (
            <>
              <div className="welcome-title">Finish setting up your account.</div>
              <div className="welcome-sub">Complete identity verification and add a payout method to make your first transaction.</div>
            </>
          )}
        </div>
        {kycDone
          ? <Link to="/app/sell" className="btn btn-primary">Sell crypto<ArrowUpRight size={14}/></Link>
          : <Link to="/app/verification" className="btn btn-primary">Complete setup<ArrowRight size={14}/></Link>}
      </div>

      {/* Quick action cards */}
      <div className="quick-actions">
        <Link to="/app/sell" className="qa-card sell">
          <div className="qa-ico"><ArrowUpRight size={20}/></div>
          <div>
            <div className="qa-title">Sell crypto</div>
            <div className="qa-sub">Convert crypto to cash in your bank</div>
          </div>
          <ArrowRight size={18} className="qa-arrow"/>
        </Link>
        <Link to="/app/buy" className="qa-card buy">
          <div className="qa-ico buy"><ArrowDownLeft size={20}/></div>
          <div>
            <div className="qa-title">Buy crypto</div>
            <div className="qa-sub">Buy stablecoins with fiat via transfer or card</div>
          </div>
          <ArrowRight size={18} className="qa-arrow"/>
        </Link>
      </div>

      {/* Stats / KPIs */}
      <div className="kpi-grid">
        <Kpi label="Total volume" value="$12,450.00" sub="Last 30 days" trend="+18%" trendUp/>
        <Kpi label="Transactions" value="7" sub="Lifetime" trend="+3" trendUp/>
        <Kpi label="Avg. payout time" value="1.2 days" sub="Last 10 transactions" trend="On time" trendNeutral/>
        <Kpi label="Verification" value={kycDone?'Verified':'Incomplete'} sub={kycDone?'Level 1':'Action required'} trendBad={!kycDone}/>
      </div>

      {/* Content grid */}
      <div className="content-grid">
        {/* Recent transactions */}
        <div className="card">
          <div className="card-header">
            <h3>Recent transactions</h3>
            <Link to="/app/transactions" className="link-sm">View all<ExternalLink size={12}/></Link>
          </div>
          <div className="tx-list">
            <TxItem
              icon={<ArrowUpRight size={14}/>}
              dir="Sell"
              asset="1,000 USDC"
              fiat="$985.00 USD"
              status="completed"
              time="2 days ago"
            />
            <TxItem
              icon={<ArrowDownLeft size={14}/>}
              dir="Buy"
              asset="500 USDC"
              fiat="$508.20 USD"
              status="processing"
              time="4 days ago"
            />
            <TxItem
              icon={<ArrowUpRight size={14}/>}
              dir="Sell"
              asset="250 USDT"
              fiat="£197.40 GBP"
              status="completed"
              time="1 week ago"
            />
            <div className="empty-tx">
              <Link to="/app/sell" className="btn btn-secondary btn-sm"><PlusCircle size={14}/>Start your first transaction</Link>
            </div>
          </div>
        </div>

        {/* Account completion & right column */}
        <div style={{display:'flex',flexDirection:'column',gap:18}}>
          <div className="card">
            <div className="card-header"><h3>Account setup</h3></div>
            <SetupRow label="Email confirmed" done={!!user?.email} sub={user?.email||'—'}/>
            <SetupRow label="Phone verified" done={false} sub="Required for payouts"/>
            <SetupRow label="Identity verification" done={kycDone} sub={kycDone?'Verified':'~3 minutes'}/>
            <SetupRow label="Add bank account" done={user?.hasBank} sub={user?.hasBank?'Bank added':'ACH, SEPA, FPS, NIP'}/>
            <div className="progress">
              <div className="bar"><div className="fill" style={{width:`${kycDone?100:user?.hasBank?60:user?.verified?35:15}%`}}/></div>
              <span className="pct">{kycDone?100:user?.hasBank?60:user?.verified?35:15}%</span>
            </div>
            {!kycDone && <Link to="/app/verification" className="btn btn-primary btn-sm btn-block" style={{marginTop:16}}>Continue setup<ArrowRight size={14}/></Link>}
          </div>

          <div className="card" style={{background:'linear-gradient(160deg,#0f1d1c,#0c151a)'}}>
            <div style={{display:'flex',alignItems:'flex-start',gap:12}}>
              <div className="qa-ico" style={{width:36,height:36,borderRadius:10,background:'#23bfb215',border:'1px solid #23bfb235',color:'var(--brand-300)',display:'grid',placeItems:'center'}}>
                <ShieldCheck size={18}/>
              </div>
              <div>
                <h4 style={{fontSize:14,marginBottom:4}}>Security reminder</h4>
                <p style={{fontSize:12.5,color:'var(--text-muted)',lineHeight:1.5}}>Enable two-factor authentication and never share your seed phrase. Sivan will never ask for wallet private keys or 2FA codes outside the dashboard.</p>
                <Link to="/app/settings" className="link-sm" style={{marginTop:10}}>Security settings<ArrowRight size={12}/></Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .dash{display:flex;flex-direction:column;gap:22px}
        .welcome{
          display:flex;justify-content:space-between;align-items:center;gap:20px;
          padding:22px 26px;border-radius:var(--radius-lg);
        }
        .welcome.ok{background:linear-gradient(135deg,#14362660,#0f1d2260);border:1px solid #1f4f36}
        .welcome.warn{background:linear-gradient(135deg,#3a2d1350,#0f1d2260);border:1px solid #5a431d}
        .welcome-title{font-size:20px;font-weight:700;letter-spacing:-.02em;margin-bottom:4px}
        .welcome-sub{font-size:13.5px;color:var(--text-muted)}
        .quick-actions{display:grid;grid-template-columns:1fr 1fr;gap:16px}
        .qa-card{
          display:flex;align-items:center;gap:16px;padding:20px;border-radius:var(--radius-lg);
          background:var(--panel);border:1px solid var(--border);transition:.2s;
        }
        .qa-card:hover{border-color:var(--border-strong);transform:translateY(-2px)}
        .qa-ico{
          width:42px;height:42px;border-radius:11px;
          background:linear-gradient(135deg,#23bfb225,#4b8bf425);
          border:1px solid #23bfb240;color:var(--brand-300);display:grid;place-items:center;flex-shrink:0;
        }
        .qa-card.buy .qa-ico{background:linear-gradient(135deg,#8b7cff25,#4b8bf425);border-color:#8b7cff40;color:var(--purple)}
        .qa-title{font-size:15px;font-weight:600;margin-bottom:3px}
        .qa-sub{font-size:12.5px;color:var(--text-muted)}
        .qa-arrow{margin-left:auto;color:var(--text-faint);transition:.2s;flex-shrink:0}
        .qa-card:hover .qa-arrow{color:var(--brand-300);transform:translateX(3px)}
        .kpi-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
        .kpi{background:var(--panel);border:1px solid var(--border);border-radius:var(--radius-md);padding:18px}
        .kpi-label{font-size:12px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.08em;font-weight:600}
        .kpi-val{font-size:22px;font-weight:700;margin:8px 0 4px;letter-spacing:-.02em}
        .kpi-sub{font-size:12px;color:var(--text-muted)}
        .kpi-trend{display:inline-flex;align-items:center;gap:4px;font-size:12px;margin-top:6px;font-weight:600}
        .kpi-trend.up{color:var(--green-ok)}
        .kpi-trend.down{color:var(--red)}
        .kpi-trend.neutral{color:var(--text-muted)}
        .kpi-trend.bad{color:var(--gold)}
        .content-grid{display:grid;grid-template-columns:1.6fr 1fr;gap:18px}
        .link-sm{display:inline-flex;align-items:center;gap:4px;color:var(--brand-300);font-size:12.5px;font-weight:600}
        .tx-list{display:flex;flex-direction:column;gap:8px}
        .tx{
          display:grid;grid-template-columns:auto 1fr auto auto;gap:12px;align-items:center;
          padding:12px 14px;border:1px solid var(--border);border-radius:10px;
          transition:.15s;
        }
        .tx:hover{border-color:var(--border-strong);background:var(--surface)}
        .tx-ico{width:32px;height:32px;border-radius:8px;display:grid;place-items:center;font-size:13px;font-weight:700;flex-shrink:0}
        .tx-ico.sell{background:#3d181830;color:#f3a79f;border:1px solid #5d252555}
        .tx-ico.buy{background:#14362640;color:#6fdca0;border:1px solid #1f4f3655}
        .tx-dir{font-size:13px;font-weight:600}
        .tx-asset{font-size:12px;color:var(--text-muted)}
        .tx-fiat{font-size:14px;font-weight:600;text-align:right}
        .tx-time{font-size:11.5px;color:var(--text-faint);text-align:right}
        .empty-tx{padding:16px;text-align:center;font-size:13px;color:var(--text-muted)}
        .setup-row{display:grid;grid-template-columns:auto 1fr auto;gap:12px;align-items:center;padding:10px 0;border-bottom:1px solid var(--border)}
        .setup-row:last-of-type{border-bottom:0}
        .check{width:22px;height:22px;border-radius:50%;display:grid;place-items:center;font-size:12px}
        .check.done{background:#23bfb220;color:var(--brand-300);border:1px solid #23bfb240}
        .check.todo{background:var(--surface-2);color:var(--text-faint);border:1px solid var(--border)}
        .setup-label{font-size:13.5px;font-weight:600}
        .setup-sub{font-size:12px;color:var(--text-muted)}
        .progress{display:flex;align-items:center;gap:12px;margin-top:16px}
        .progress .bar{flex:1;height:6px;background:var(--surface-2);border-radius:99px;overflow:hidden}
        .progress .fill{height:100%;background:linear-gradient(90deg,var(--brand-300),var(--blue-500));border-radius:99px;transition:width .5s}
        .pct{font-size:12px;color:var(--text-muted);font-weight:600;font-variant-numeric:tabular-nums}
        @media (max-width:900px){
          .quick-actions,.kpi-grid{grid-template-columns:1fr}
          .content-grid{grid-template-columns:1fr}
        }
      `}</style>
    </div>
  );
}

function Kpi({label,value,sub,trend,trendUp,trendDown,trendNeutral,trendBad}){
  return (
    <div className="kpi">
      <div className="kpi-label">{label}</div>
      <div className="kpi-val">{value}</div>
      <div className="kpi-sub">{sub}</div>
      {trend && (
        <div className={`kpi-trend ${trendUp?'up':trendDown?'down':trendBad?'bad':'neutral'}`}>
          {trendUp?<TrendingUp size={12}/>:trendDown?<TrendingDown size={12}/>:trendBad?<AlertCircle size={12}/>:<Clock size={12}/>}
          {trend}
        </div>
      )}
    </div>
  );
}

function TxItem({icon,dir,asset,fiat,status,time}){
  const isSell=dir==='Sell';
  const statusMap={
    completed:{label:'Completed',cls:'badge-green'},
    processing:{label:'Processing',cls:'badge-gold'},
    pending:{label:'Pending',cls:'badge-blue'},
    failed:{label:'Failed',cls:'badge-red'},
  };
  return (
    <div className="tx">
      <div className={`tx-ico ${isSell?'sell':'buy'}`}>{icon}</div>
      <div>
        <div className="tx-dir">{dir} · {asset}</div>
        <div className="tx-asset">{isSell?'To bank':'From bank'}</div>
      </div>
      <div>
        <div className="tx-fiat">{fiat}</div>
        <div style={{textAlign:'right'}}><span className={`badge ${statusMap[status]?.cls||'badge-muted'}`}>{statusMap[status]?.label||status}</span></div>
      </div>
      <div className="tx-time">{time}</div>
    </div>
  );
}

function SetupRow({label,done,sub}){
  return (
    <div className="setup-row">
      <div className={`check ${done?'done':'todo'}`}>{done?<CheckCircle2 size={13}/>:<Clock size={12}/>}</div>
      <div>
        <div className="setup-label">{label}</div>
        <div className="setup-sub">{sub}</div>
      </div>
    </div>
  );
}
