import {
  AreaChart,Area,XAxis,YAxis,Tooltip,ResponsiveContainer,
  BarChart,Bar,CartesianGrid,PieChart,Pie,Cell,LineChart,Line,Legend,
} from 'recharts';
import {
  ArrowUpRight,ArrowDownLeft,DollarSign,Users as UsersIco,Activity,
  TrendingUp,ShieldCheck,AlertTriangle,Clock,CheckCircle2,Copy,ExternalLink,
  ArrowUpRightFromCircle,Sparkles,Wallet,CreditCard,RefreshCw,
  ArrowLeftRight,
} from 'lucide-react';

// -------- demo data --------
const volumeSeries=Array.from({length:30}).map((_,i)=>{
  const base=120+i*3.5+Math.sin(i/2.2)*28+Math.cos(i/4)*18;
  return {
    day:`${i+1}`,
    on: +(base*(0.55+Math.random()*0.1)).toFixed(1),
    off: +(base*(0.85+Math.random()*0.15)).toFixed(1),
  };
});

const hourlyData=Array.from({length:24}).map((_,i)=>({
  h:`${i}:00`,
  tps: Math.round(40+Math.sin(i/3)*25+Math.random()*20),
}));

const pairPie=[
  {name:'USDT→NGN',value:42,color:'#4cd8c8'},
  {name:'USDC→NGN',value:23,color:'#4b8bf4'},
  {name:'BTC→NGN',value:14,color:'#8b7cff'},
  {name:'ETH→NGN',value:12,color:'#e9b660'},
  {name:'Other',value:9,color:'#5b6a7d'},
];

const railBars=[
  {rail:'Access Bank',vol:482,ok:98.2},
  {rail:'GTBank',vol:398,ok:99.1},
  {rail:'UBA',vol:276,ok:97.4},
  {rail:'Flutterwave',vol:521,ok:99.6},
  {rail:'Paystack',vol:204,ok:98.9},
];

const recentTx=[
  {id:'TX-09241',user:'Adaeze O.',email:'ada****@gmail.com',type:'Sell',asset:'USDT',amount:1200,fiat:'₦1,884,000',status:'completed',time:'2m ago',network:'Base'},
  {id:'TX-09240',user:'Chinedu K.',email:'chi****@yahoo.com',type:'Sell',asset:'USDC',amount:450,fiat:'₦706,500',status:'processing',time:'4m ago',network:'Ethereum'},
  {id:'TX-09239',user:'Ibrahim B.',email:'ibra****@outlook.com',type:'Buy',asset:'BTC',amount:0.0034,fiat:'₦320,000',status:'completed',time:'11m ago',network:'Bitcoin'},
  {id:'TX-09238',user:'Fatima A.',email:'fat****@proton.me',type:'Sell',asset:'USDT',amount:3200,fiat:'₦5,024,000',status:'review',time:'18m ago',network:'TRC20'},
  {id:'TX-09237',user:'Tunde M.',email:'tun****@gmail.com',type:'Buy',asset:'USDT',amount:800,fiat:'₦1,256,000',status:'failed',time:'24m ago',network:'Base'},
  {id:'TX-09236',user:'Grace E.',email:'gra****@gmail.com',type:'Sell',asset:'ETH',amount:0.5,fiat:'₦1,980,000',status:'completed',time:'38m ago',network:'Ethereum'},
];

const statusBadge=(s)=>{
  const map={
    completed:{c:'ok',Icon:CheckCircle2},
    processing:{c:'blue',Icon:Clock},
    review:{c:'gold',Icon:AlertTriangle},
    failed:{c:'red',Icon:AlertTriangle},
  };
  const {c,Icon}=map[s]||{c:'muted',Icon:Clock};
  return <span className={`badge badge-${c}`}><Icon size={12}/>{s}</span>;
};

const now=()=>new Date('2026-07-13T10:24:00+01:00').toLocaleString('en-GB',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'});

const KPICard=({icon:Icon,label,value,delta,deltaTone,sub,accent})=>(
  <div className="kpi-card">
    <div className="kpi-top">
      <div className={`kpi-ico ${accent||''}`}><Icon size={18}/></div>
      {delta && (
        <span className={`kpi-delta ${deltaTone||'up'}`}>
          {deltaTone==='down'?<ArrowDownLeft size={12}/>:<ArrowUpRight size={12}/>}
          {delta}
        </span>
      )}
    </div>
    <div className="kpi-label">{label}</div>
    <div className="kpi-value">{value}</div>
    {sub && <div className="kpi-sub">{sub}</div>}
  </div>
);

export default function Overview(){
  return (
    <div className="adm-page">
      {/* Page head */}
      <div className="adm-page-head">
        <div>
          <div className="page-eyebrow"><span className="pulse-dot"/>Live • {now()}</div>
          <h1>Overview</h1>
          <p>Real-time performance across Sivan's on-ramp and off-ramp rails.</p>
        </div>
        <div className="page-head-actions">
          <button className="btn-ghost"><RefreshCw size={14}/> Refresh</button>
          <button className="btn-primary"><ArrowUpRightFromCircle size={14}/> Export report</button>
        </div>
      </div>

      {/* KPI grid */}
      <div className="kpi-grid">
        <KPICard icon={DollarSign} label="24h Volume (NGN)" value="₦482.4M" delta="+12.4%" accent="teal" sub="vs ₦429.1M yesterday"/>
        <KPICard icon={ArrowLeftRight} label="24h Transactions" value="3,842" delta="+8.1%" accent="blue" sub="3,554 yesterday"/>
        <KPICard icon={UsersIco} label="Active Users" value="12,486" delta="+3.2%" accent="purple" sub="+392 new signups"/>
        <KPICard icon={CheckCircle2} label="Success Rate" value="99.2%" delta="+0.3pp" accent="green" sub="Avg payout 1.4 min"/>
        <KPICard icon={Wallet} label="Liquidity Pool" value="$18.4M" delta="+2.1%" accent="gold" sub="USDT 62% • USDC 28%"/>
        <KPICard icon={ShieldCheck} label="KYC Pending" value="142" delta="18" deltaTone="down" accent="red" sub="Awaiting review"/>
      </div>

      {/* Charts row */}
      <div className="adm-row two">
        <div className="adm-card span-2">
          <div className="adm-card-head">
            <div>
              <h3>Volume — last 30 days</h3>
              <p className="text-muted">On-ramp vs off-ramp flow in millions of NGN.</p>
            </div>
            <div className="seg-ctrl">
              <button className="active">30D</button>
              <button>7D</button>
              <button>24H</button>
              <button>YTD</button>
            </div>
          </div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={volumeSeries} margin={{top:10,right:10,bottom:0,left:0}}>
                <defs>
                  <linearGradient id="gOff" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4cd8c8" stopOpacity={0.45}/>
                    <stop offset="100%" stopColor="#4cd8c8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="gOn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4b8bf4" stopOpacity={0.35}/>
                    <stop offset="100%" stopColor="#4b8bf4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1d2a3a" strokeDasharray="3 3" vertical={false}/>
                <XAxis dataKey="day" stroke="#5b6a7d" fontSize={11} tickLine={false} axisLine={false}/>
                <YAxis stroke="#5b6a7d" fontSize={11} tickLine={false} axisLine={false} tickFormatter={v=>`₦${v}M`}/>
                <Tooltip contentStyle={{background:'#0e1621',border:'1px solid #27384d',borderRadius:10,fontSize:12}} labelStyle={{color:'#8a99ab'}}/>
                <Legend iconType="circle" wrapperStyle={{fontSize:12,color:'#c7d2de'}}/>
                <Area type="monotone" dataKey="off" name="Off-ramp" stroke="#4cd8c8" strokeWidth={2} fill="url(#gOff)"/>
                <Area type="monotone" dataKey="on" name="On-ramp" stroke="#4b8bf4" strokeWidth={2} fill="url(#gOn)"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="adm-card">
          <div className="adm-card-head">
            <div>
              <h3>Pair distribution</h3>
              <p className="text-muted">Share of 24h volume.</p>
            </div>
          </div>
          <div className="chart-wrap pie-wrap">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pairPie} dataKey="value" innerRadius={55} outerRadius={85} paddingAngle={2} stroke="none">
                  {pairPie.map((e,i)=><Cell key={i} fill={e.color}/>)}
                </Pie>
                <Tooltip contentStyle={{background:'#0e1621',border:'1px solid #27384d',borderRadius:10,fontSize:12}}/>
              </PieChart>
            </ResponsiveContainer>
            <div className="legend-list">
              {pairPie.map(p=>(
                <div key={p.name} className="legend-row">
                  <span className="leg-dot" style={{background:p.color}}/>
                  <span className="leg-name">{p.name}</span>
                  <span className="leg-val">{p.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Rails + TPS */}
      <div className="adm-row two">
        <div className="adm-card">
          <div className="adm-card-head">
            <div>
              <h3>Rail performance</h3>
              <p className="text-muted">24h payout volume by fiat rail.</p>
            </div>
            <span className="badge badge-ok"><Activity size={12}/> Healthy</span>
          </div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={railBars} margin={{top:10,right:10,bottom:0,left:-20}} layout="vertical">
                <CartesianGrid stroke="#1d2a3a" strokeDasharray="3 3" horizontal={false}/>
                <XAxis type="number" stroke="#5b6a7d" fontSize={11} tickLine={false} axisLine={false} tickFormatter={v=>`₦${v}M`}/>
                <YAxis type="category" dataKey="rail" stroke="#c7d2de" fontSize={12} tickLine={false} axisLine={false} width={90}/>
                <Tooltip contentStyle={{background:'#0e1621',border:'1px solid #27384d',borderRadius:10,fontSize:12}} cursor={{fill:'#121c29'}}/>
                <Bar dataKey="vol" name="Volume (₦M)" fill="#4cd8c8" radius={[0,6,6,0]} barSize={16}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="rail-table">
            {railBars.map(r=>(
              <div key={r.rail} className="rail-row">
                <span>{r.rail}</span>
                <span className="text-muted">₦{r.vol}M</span>
                <span className={r.ok>=99?'text-green':'text-gold'}>{r.ok}% success</span>
              </div>
            ))}
          </div>
        </div>

        <div className="adm-card">
          <div className="adm-card-head">
            <div>
              <h3>TPS — last 24h</h3>
              <p className="text-muted">Transactions per second, hourly.</p>
            </div>
          </div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={hourlyData} margin={{top:10,right:10,bottom:0,left:-20}}>
                <CartesianGrid stroke="#1d2a3a" strokeDasharray="3 3" vertical={false}/>
                <XAxis dataKey="h" stroke="#5b6a7d" fontSize={11} tickLine={false} axisLine={false} interval={3}/>
                <YAxis stroke="#5b6a7d" fontSize={11} tickLine={false} axisLine={false}/>
                <Tooltip contentStyle={{background:'#0e1621',border:'1px solid #27384d',borderRadius:10,fontSize:12}}/>
                <Line type="monotone" dataKey="tps" name="TPS" stroke="#8b7cff" strokeWidth={2} dot={false} activeDot={{r:4,fill:'#8b7cff'}}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="tps-foot">
            <div><span className="text-muted">Peak</span><strong>94 tps</strong></div>
            <div><span className="text-muted">Avg</span><strong>52 tps</strong></div>
            <div><span className="text-muted">P95 latency</span><strong>420ms</strong></div>
          </div>
        </div>
      </div>

      {/* Live transactions + alerts */}
      <div className="adm-row three-2">
        <div className="adm-card span-2">
          <div className="adm-card-head">
            <div>
              <h3>Live transactions</h3>
              <p className="text-muted">Most recent activity across all rails.</p>
            </div>
            <button className="btn-ghost-sm">View all <ExternalLink size={12}/></button>
          </div>
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Txn ID</th>
                  <th>User</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Network</th>
                  <th>Status</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {recentTx.map(tx=>(
                  <tr key={tx.id}>
                    <td className="mono"><Copy size={12} className="copy-ico"/>{tx.id}</td>
                    <td>
                      <div className="us-cell">
                        <span className="us-av grad-bg">{tx.user.split(' ').map(p=>p[0]).join('')}</span>
                        <div>
                          <div className="us-name">{tx.user}</div>
                          <div className="us-mail text-faint">{tx.email}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className={`mini-pill ${tx.type==='Sell'?'teal':'purple'}`}>{tx.type==='Sell'?<ArrowUpRight size={11}/>:<ArrowDownLeft size={11}/>}{tx.type} {tx.asset}</span></td>
                    <td>
                      <div className="tx-amt">
                        <strong>{tx.type==='Sell'?tx.amount.toLocaleString()+' '+tx.asset:tx.fiat}</strong>
                        <span className="text-faint">{tx.type==='Sell'?tx.fiat:tx.amount.toLocaleString()+' '+tx.asset}</span>
                      </div>
                    </td>
                    <td className="mono text-dim">{tx.network}</td>
                    <td>{statusBadge(tx.status)}</td>
                    <td className="text-faint">{tx.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="adm-card">
          <div className="adm-card-head">
            <div>
              <h3>Alerts & queue</h3>
              <p className="text-muted">Needs your attention.</p>
            </div>
          </div>
          <div className="alert-list">
            <div className="alert-item red">
              <AlertTriangle size={16}/>
              <div>
                <strong>Failed payout spike</strong>
                <p>Access Bank rail error rate hit 4.2% in the last 15 min.</p>
                <span>10 min ago</span>
              </div>
            </div>
            <div className="alert-item gold">
              <Clock size={16}/>
              <div>
                <strong>142 KYC reviews pending</strong>
                <p>24 are past 2h SLA. Auto-escalation enabled.</p>
                <span>22 min ago</span>
              </div>
            </div>
            <div className="alert-item purple">
              <ShieldCheck size={16}/>
              <div>
                <strong>7 open disputes</strong>
                <p>3 chargebacks, 4 missing-deposit claims.</p>
                <span>1h ago</span>
              </div>
            </div>
            <div className="alert-item blue">
              <Sparkles size={16}/>
              <div>
                <strong>Liquidity rebalance</strong>
                <p>USDT pool above 85% threshold; recommended sweep at 23:00 UTC.</p>
                <span>2h ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

