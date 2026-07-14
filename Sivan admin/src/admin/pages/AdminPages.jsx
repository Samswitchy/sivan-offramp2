import {useState,useMemo} from 'react';
import {
  Search,Filter,Download,MoreVertical,UserPlus,CheckCircle2,
  XCircle,Clock,AlertTriangle,Eye,Mail,ShieldCheck,Ban,Key,
  ArrowUpRight,ArrowDownLeft,Copy,ExternalLink,RefreshCw,ChevronDown,
  Plus,Trash2,Edit2,Database,Wallet as WalletIco,CreditCard,Globe,
  ToggleLeft,ToggleRight,TrendingUp,DollarSign,Percent,MessageSquareWarning,
  FileClock,User,Phone,Calendar,MapPin,Building2,Lock,
} from 'lucide-react';

// ============ Shared data ============
const STATUSES=['completed','processing','review','failed'];
const COUNTRIES=['Nigeria','Ghana','Kenya','South Africa','UK','Canada'];
const FIRST=['Adaeze','Chinedu','Ibrahim','Fatima','Tunde','Grace','Musa','Amaka','Samuel','Zainab','Obi','Rashidat','Kelechi','Ngozi','Yusuf','Blessing','Daniel','Aisha','Emeka','Hauwa'];
const LAST=['Okafor','Khan','Bello','Abubakar','Musa','Eze','Okoro','Adeyemi','Lawal','Nwosu','Balogun','Ogunleye','Chukwu','Garba','Mohammed','Afolabi','Ibrahim','Usman','Ogundele','John'];
const ASSETS=['USDT','USDC','BTC','ETH','USDP'];
const NETS=['Base','Ethereum','TRC20','Bitcoin','Avalanche','BNB Chain'];
const BANKS=['Access Bank','GTBank','UBA','First Bank','Zenith','Flutterwave','Paystack','Kuda','Opay','PalmPay'];

function rand(n){return Math.floor(Math.random()*n)}
function pick(a){return a[rand(a.length)]}
function money(n){return '₦'+n.toLocaleString(undefined,{maximumFractionDigits:0})}

const USERS=Array.from({length:140}).map((_,i)=>{
  const f=pick(FIRST),l=pick(LAST);
  const days=rand(180);
  return {
    id:`U-${10240+i}`,
    name:`${f} ${l}`,
    email:`${f.toLowerCase()}.${l.toLowerCase()}${rand(99)}@${pick(['gmail.com','yahoo.com','outlook.com','proton.me'])}`,
    country:pick(COUNTRIES),
    tier:pick([0,1,2,2,3]),
    kyc:pick(['verified','verified','verified','pending','rejected','none']),
    vol: 50000+rand(20000000),
    tx: 1+rand(140),
    status: pick(['active','active','active','active','suspended','frozen']),
    joined: Date.now()-days*86400000-rand(86400000),
    lastActive: Date.now()-rand(86400000*5),
    phone:'+234 '+('0'+rand(999)).slice(-3)+' '+('000'+rand(999)).slice(-3)+' '+('000'+rand(999)).slice(-4),
    ip:`102.89.${rand(255)}.${rand(255)}`,
  };
});

const TXNS=Array.from({length:200}).map((_,i)=>{
  const type=pick(['Sell','Sell','Sell','Buy','Buy']);
  const asset=pick(ASSETS);
  const amt= type==='BTC' ? +(0.001+Math.random()*0.4).toFixed(5)
    : type==='ETH' ? +(0.05+Math.random()*2).toFixed(3)
    : +(50+Math.random()*5000).toFixed(2);
  const rate= asset.startsWith('US')?1570+(Math.random()*30) : asset==='BTC'?98000000+(Math.random()*2e6) : 3900000+(Math.random()*150000);
  const ngn=Math.round(amt*rate);
  const status=pick(['completed','completed','completed','completed','processing','processing','review','failed']);
  return {
    id:`TX-${String(9000+i).padStart(5,'0')}`,
    user:pick(USERS),
    type,asset,amount:amt,fiat:ngn,network:pick(NETS),
    bank:pick(BANKS),
    status,
    fee: Math.round(ngn*0.015),
    rate: Math.round(rate),
    time: Date.now()-rand(86400000*14)-rand(3600000*6),
    hash:'0x'+Array.from({length:40},()=>pick('0123456789abcdef')).join(''),
    ref: pick(['DEP','WIT','PAY','TRF'])+rand(999999),
  };
});

const KYCS=Array.from({length:60}).map((_,i)=>({
  id:`KYC-${8000+i}`,
  user:pick(USERS),
  level:pick([1,1,2,2,3]),
  status:pick(['pending','pending','pending','in_review','approved','rejected','needs_resubmission']),
  submitted:Date.now()-rand(86400000*3)-rand(3600000*8),
  country:pick(COUNTRIES),
  docType:pick(['NIN Voter Card','International Passport','Driver License','BVN','CAC (Business)']),
  docScore: 60+rand(40),
  faceMatch: 55+rand(45),
  sanctionsHit: Math.random()<0.05,
})).sort((a,b)=>a.submitted>b.submitted?-1:1);

const PAIRS=[
  {asset:'USDT',network:'Base',fiat:'NGN',buy:true,sell:true,spread:0.008,minBuy:5000,maxBuy:10000000,minSell:10,maxSell:50000,status:'active',vol24:182_400_000},
  {asset:'USDT',network:'TRC20',fiat:'NGN',buy:true,sell:true,spread:0.009,minBuy:5000,maxSell:100000,maxBuy:10000000,status:'active',vol24:94_200_000},
  {asset:'USDT',network:'Ethereum',fiat:'NGN',buy:true,sell:true,spread:0.012,minBuy:10000,maxBuy:10000000,minSell:20,maxSell:50000,status:'active',vol24:48_800_000},
  {asset:'USDC',network:'Base',fiat:'NGN',buy:true,sell:true,spread:0.009,minBuy:5000,maxBuy:10000000,minSell:10,maxSell:50000,status:'active',vol24:62_300_000},
  {asset:'USDC',network:'Ethereum',fiat:'NGN',buy:true,sell:true,spread:0.012,minBuy:10000,maxBuy:5000000,minSell:20,maxSell:30000,status:'active',vol24:21_500_000},
  {asset:'BTC',network:'Bitcoin',fiat:'NGN',buy:true,sell:true,spread:0.015,minBuy:20000,maxBuy:20000000,minSell:0.0002,maxSell:0.3,status:'active',vol24:84_900_000},
  {asset:'ETH',network:'Ethereum',fiat:'NGN',buy:true,sell:true,spread:0.013,minBuy:15000,maxBuy:10000000,minSell:0.01,maxSell:5,status:'active',vol24:38_200_000},
  {asset:'USDP',network:'Ethereum',fiat:'NGN',buy:false,sell:true,spread:0.012,minSell:20,maxSell:20000,status:'paused',vol24:2_100_000},
];

const RAILS=[
  {name:'Access Bank',type:'Bank',country:'NG',currency:'NGN',status:'active',vol24:482_000_000,tx24:1242,success:98.2,fee:0.01,min:1000,max:10_000_000,account:'0123456789',holder:'Sivan Technologies Ltd'},
  {name:'GTBank',type:'Bank',country:'NG',currency:'NGN',status:'active',vol24:398_000_000,tx24:986,success:99.1,fee:0.01,min:1000,max:10_000_000,account:'0987654321',holder:'Sivan Technologies Ltd'},
  {name:'UBA',type:'Bank',country:'NG',currency:'NGN',status:'active',vol24:276_000_000,tx24:742,success:97.4,fee:0.01,min:1000,max:5_000_000,account:'0564738291',holder:'Sivan Technologies Ltd'},
  {name:'Flutterwave',type:'Processor',country:'NG',currency:'NGN',status:'active',vol24:521_000_000,tx24:1422,success:99.6,fee:0.014,min:500,max:20_000_000,account:'-',holder:'Flutterwave sub-account'},
  {name:'Paystack',type:'Processor',country:'NG',currency:'NGN',status:'active',vol24:204_000_000,tx24:581,success:98.9,fee:0.015,min:100,max:10_000_000,account:'-',holder:'Paystack sub-account'},
  {name:'Kuda',type:'Bank',country:'NG',currency:'NGN',status:'degraded',vol24:64_000_000,tx24:284,success:91.3,fee:0.005,min:100,max:4_000_000,account:'1234000999',holder:'Sivan Technologies Ltd'},
  {name:'Opay',type:'Mobile Money',country:'NG',currency:'NGN',status:'active',vol24:118_000_000,tx24:412,success:99.8,fee:0.008,min:100,max:5_000_000,account:'9012445673',holder:'Sivan Technologies Ltd'},
  {name:'PalmPay',type:'Mobile Money',country:'NG',currency:'NGN',status:'disabled',vol24:0,tx24:0,success:0,fee:0.008,min:100,max:5_000_000,account:'8077123456',holder:'Sivan Technologies Ltd'},
];

const DISPUTES=Array.from({length:28}).map((_,i)=>({
  id:`DIS-${3000+i}`,
  tx: TXNS[rand(TXNS.length)],
  category:pick(['Missing deposit','Wrong amount','Wrong recipient','Account frozen','Chargeback','Unauthorised']),
  priority:pick(['low','low','medium','medium','high','critical']),
  status:pick(['open','in_progress','resolved','escalated']),
  opened:Date.now()-rand(86400000*7)-rand(3600000*6),
  lastUpdate:Date.now()-rand(3600000*24),
  messages:1+rand(8),
  assigned:pick(['Unassigned','Samuel A.','Chidinma O.','Ridwan K.']),
})).sort((a,b)=>b.opened-a.opened);

const AUDIT=Array.from({length:100}).map((_,i)=>({
  id:`LOG-${20000+i}`,
  time:Date.now()-rand(86400000*14),
  actor:pick(['admin@sivantech.online','ops@sivantech.online','compliance@sivantech.online','system']),
  action:pick(['user.suspend','user.verify','tx.refund','tx.approve','kyc.approve','kyc.reject','rail.pause','rail.resume','pair.update','fee.update','login','setting.update','user.ban','user.unfreeze','dispute.resolve']),
  target:'id:'+pick([...Array(40)].map((_,j)=>j+10240)),
  ip:`102.88.${rand(255)}.${rand(255)}`,
  result:pick(['success','success','success','success','success','failure']),
})).sort((a,b)=>b.time-a.time);

// ============ Shared UI helpers ============
const statusBadge=(s)=>{
  const map={
    completed:{c:'ok',Icon:CheckCircle2},
    verified:{c:'ok',Icon:CheckCircle2},
    approved:{c:'ok',Icon:CheckCircle2},
    active:{c:'ok',Icon:CheckCircle2},
    resolved:{c:'ok',Icon:CheckCircle2},
    success:{c:'ok',Icon:CheckCircle2},
    processing:{c:'blue',Icon:Clock},
    pending:{c:'blue',Icon:Clock},
    in_review:{c:'blue',Icon:Clock},
    in_progress:{c:'blue',Icon:Clock},
    open:{c:'blue',Icon:MessageSquareWarning},
    review:{c:'gold',Icon:AlertTriangle},
    frozen:{c:'gold',Icon:Lock},
    needs_resubmission:{c:'gold',Icon:AlertTriangle},
    degraded:{c:'gold',Icon:AlertTriangle},
    paused:{c:'gold',Icon:Clock},
    escalated:{c:'purple',Icon:AlertTriangle},
    rejected:{c:'red',Icon:XCircle},
    failed:{c:'red',Icon:XCircle},
    suspended:{c:'red',Icon:Ban},
    disabled:{c:'red',Icon:XCircle},
    failure:{c:'red',Icon:XCircle},
    none:{c:'muted',Icon:Clock},
  };
  const o=map[s]||{c:'muted',Icon:Clock};
  return <span className={`badge badge-${o.c}`}><o.Icon size={12}/>{s.replace(/_/g,' ')}</span>;
};

const TierBadge=({t})=>(
  <span className={`tier t${t}`}>T{t} {t===0?'Unverified':t===1?'Starter':t===2?'Verified':'Pro'}</span>
);

const fmtTime=ts=>{
  const d=Date.now()-ts;
  if(d<60000) return 'just now';
  if(d<3600000) return Math.floor(d/60000)+'m ago';
  if(d<86400000) return Math.floor(d/3600000)+'h ago';
  return new Date(ts).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});
};

const SearchBar=({ph,onChange})=>(
  <div className="adm-search inline">
    <Search size={14}/>
    <input placeholder={ph||'Search…'} onChange={e=>onChange&&onChange(e.target.value)}/>
  </div>
);

const FilterBar=({children})=>(
  <div className="filter-bar">
    {children}
    <div className="filter-spacer"/>
    <button className="btn-ghost-sm"><Filter size={12}/> Filters</button>
    <button className="btn-ghost-sm"><Download size={12}/> Export CSV</button>
  </div>
);

const PageHead=({title,sub,actions,eyebrow})=>(
  <div className="adm-page-head">
    <div>
      {eyebrow && <div className="page-eyebrow">{eyebrow}</div>}
      <h1>{title}</h1>
      {sub && <p>{sub}</p>}
    </div>
    <div className="page-head-actions">{actions}</div>
  </div>
);

// ============ USERS ============
export function Users(){
  const [q,setQ]=useState('');
  const [filter,setFilter]=useState('all');
  const [selected,setSelected]=useState(null);

  const filtered=useMemo(()=>USERS.filter(u=>{
    if(filter!=='all' && u.status!==filter && !(filter==='kyc_pending'&&u.kyc==='pending')) return false;
    if(q && !(u.name.toLowerCase().includes(q.toLowerCase())||u.email.toLowerCase().includes(q.toLowerCase())||u.id.toLowerCase().includes(q.toLowerCase()))) return false;
    return true;
  }),[q,filter]);

  return (
    <div className="adm-page">
      <PageHead
        title="Users"
        sub="Manage, verify and monitor every customer account."
        actions={<><button className="btn-ghost"><Download size={14}/> Export</button><button className="btn-primary"><UserPlus size={14}/> New user</button></>}
      />

      <div className="stat-strip">
        <div className="ss-item"><strong>{USERS.length.toLocaleString()}</strong><span>Total users</span></div>
        <div className="ss-item ok"><strong>{USERS.filter(u=>u.kyc==='verified').length.toLocaleString()}</strong><span>Verified</span></div>
        <div className="ss-item blue"><strong>{USERS.filter(u=>u.kyc==='pending').length}</strong><span>KYC pending</span></div>
        <div className="ss-item red"><strong>{USERS.filter(u=>u.status==='suspended').length}</strong><span>Suspended</span></div>
        <div className="ss-item gold"><strong>{USERS.filter(u=>u.status==='frozen').length}</strong><span>Frozen</span></div>
      </div>

      <div className="adm-card">
        <FilterBar>
          <SearchBar ph="Search by name, email or ID…" onChange={setQ}/>
          <div className="chips">
            {[['all','All'],['active','Active'],['kyc_pending','KYC pending'],['suspended','Suspended'],['frozen','Frozen']].map(([v,l])=>(
              <button key={v} className={`chip ${filter===v?'active':''}`} onClick={()=>setFilter(v)}>{l}</button>
            ))}
          </div>
        </FilterBar>
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr><th>User</th><th>ID</th><th>Country</th><th>Tier</th><th>KYC</th><th>Volume</th><th>Tx</th><th>Status</th><th>Joined</th><th/></tr>
            </thead>
            <tbody>
              {filtered.slice(0,40).map(u=>(
                <tr key={u.id} onClick={()=>setSelected(u)} className="clickable">
                  <td>
                    <div className="us-cell">
                      <span className="us-av grad-bg">{u.name.split(' ').map(p=>p[0]).join('')}</span>
                      <div>
                        <div className="us-name">{u.name}</div>
                        <div className="us-mail text-faint">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="mono text-dim">{u.id}</td>
                  <td><span className="country-tag"><MapPin size={11}/>{u.country}</span></td>
                  <td><TierBadge t={u.tier}/></td>
                  <td>{statusBadge(u.kyc)}</td>
                  <td className="mono">{money(u.vol)}</td>
                  <td className="mono">{u.tx}</td>
                  <td>{statusBadge(u.status)}</td>
                  <td className="text-faint">{fmtTime(u.joined)}</td>
                  <td className="row-actions"><button className="icon-btn"><MoreVertical size={14}/></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && <UserDrawer user={selected} onClose={()=>setSelected(null)}/>}
    </div>
  );
}

function UserDrawer({user,onClose}){
  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer" onClick={e=>e.stopPropagation()}>
        <div className="drawer-head">
          <div className="us-cell big">
            <span className="us-av lg grad-bg">{user.name.split(' ').map(p=>p[0]).join('')}</span>
            <div>
              <div className="us-name lg">{user.name}</div>
              <div className="us-mail">{user.email}</div>
              <div className="drawer-tags"><TierBadge t={user.tier}/>{statusBadge(user.kyc)}{statusBadge(user.status)}</div>
            </div>
          </div>
          <button className="icon-btn" onClick={onClose}><XCircle size={18}/></button>
        </div>

        <div className="drawer-body">
          <div className="kpi-grid small">
            <div className="kpi-card sm"><div className="kpi-label">Total volume</div><div className="kpi-value sm">{money(user.vol)}</div></div>
            <div className="kpi-card sm"><div className="kpi-label">Transactions</div><div className="kpi-value sm">{user.tx}</div></div>
            <div className="kpi-card sm"><div className="kpi-label">Success rate</div><div className="kpi-value sm">{(92+rand(8)).toFixed(1)}%</div></div>
            <div className="kpi-card sm"><div className="kpi-label">Avg ticket</div><div className="kpi-value sm">{money(Math.round(user.vol/Math.max(user.tx,1)))}</div></div>
          </div>

          <div className="drawer-section">
            <h4>Account details</h4>
            <div className="detail-grid">
              <div><span className="text-faint"><User size={12}/> User ID</span><span className="mono">{user.id}</span></div>
              <div><span className="text-faint"><Phone size={12}/> Phone</span><span>{user.phone}</span></div>
              <div><span className="text-faint"><MapPin size={12}/> Country</span><span>{user.country}</span></div>
              <div><span className="text-faint"><Calendar size={12}/> Joined</span><span>{new Date(user.joined).toLocaleDateString()}</span></div>
              <div><span className="text-faint"><Clock size={12}/> Last active</span><span>{fmtTime(user.lastActive)}</span></div>
              <div><span className="text-faint"><Globe size={12}/> Last IP</span><span className="mono">{user.ip}</span></div>
            </div>
          </div>

          <div className="drawer-section">
            <h4>Recent transactions</h4>
            <div className="mini-tx">
              {TXNS.filter(t=>t.user.id===user.id).slice(0,5).map(t=>(
                <div key={t.id} className="mini-tx-row">
                  <span className={`mini-pill ${t.type==='Sell'?'teal':'purple'}`}>{t.type==='Sell'?<ArrowUpRight size={11}/>:<ArrowDownLeft size={11}/>}{t.type}</span>
                  <span className="mono">{t.id}</span>
                  <span className="mono">{t.amount.toLocaleString()} {t.asset}</span>
                  <span className="text-faint">{fmtTime(t.time)}</span>
                  {statusBadge(t.status)}
                </div>
              ))}
              {TXNS.filter(t=>t.user.id===user.id).length===0 && <div className="empty-sm">No transactions yet.</div>}
            </div>
          </div>

          <div className="drawer-actions">
            <button className="btn-ghost"><Eye size={14}/> View full profile</button>
            <button className="btn-ghost"><Mail size={14}/> Send email</button>
            <button className="btn-ghost"><ShieldCheck size={14}/> Manually verify</button>
            <button className="btn-ghost gold"><Key size={14}/> Reset 2FA</button>
            <button className="btn-ghost red"><Ban size={14}/>{user.status==='suspended'?'Unsuspend':'Suspend'}</button>
            <button className="btn-ghost red"><Lock size={14}/>{user.status==='frozen'?'Unfreeze':'Freeze funds'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ TRANSACTIONS ============
export function Transactions(){
  const [q,setQ]=useState('');
  const [filter,setFilter]=useState('all');
  const [type,setType]=useState('all');
  const [sel,setSel]=useState(null);

  const list=useMemo(()=>TXNS.filter(t=>{
    if(filter!=='all' && t.status!==filter) return false;
    if(type!=='all' && t.type.toLowerCase()!==type) return false;
    if(q){const l=q.toLowerCase();if(!(t.id.toLowerCase().includes(l)||t.user.name.toLowerCase().includes(l)||t.user.email.toLowerCase().includes(l)||t.hash.toLowerCase().includes(l)))return false;}
    return true;
  }),[q,filter,type]);

  return (
    <div className="adm-page">
      <PageHead
        title="Transactions"
        sub="Every swap, deposit, payout and refund across all rails."
        actions={<><button className="btn-ghost"><RefreshCw size={14}/> Refresh</button><button className="btn-primary"><Download size={14}/> Export report</button></>}
      />
      <div className="stat-strip">
        <div className="ss-item"><strong>₦482.4M</strong><span>24h volume</span></div>
        <div className="ss-item"><strong>{TXNS.length.toLocaleString()}</strong><span>14d txns</span></div>
        <div className="ss-item ok"><strong>99.2%</strong><span>Success rate</span></div>
        <div className="ss-item blue"><strong>{TXNS.filter(t=>t.status==='processing').length}</strong><span>Processing</span></div>
        <div className="ss-item gold"><strong>{TXNS.filter(t=>t.status==='review').length}</strong><span>Needs review</span></div>
        <div className="ss-item red"><strong>{TXNS.filter(t=>t.status==='failed').length}</strong><span>Failed</span></div>
      </div>

      <div className="adm-card">
        <FilterBar>
          <SearchBar ph="Search tx id, user, hash…" onChange={setQ}/>
          <div className="chips">
            {[['all','All'],['completed','Completed'],['processing','Processing'],['review','Review'],['failed','Failed']].map(([v,l])=>(
              <button key={v} className={`chip ${filter===v?'active':''}`} onClick={()=>setFilter(v)}>{l}</button>
            ))}
          </div>
          <div className="chips">
            {[['all','All types'],['sell','Sell'],['buy','Buy']].map(([v,l])=>(
              <button key={v} className={`chip outline ${type===v?'active':''}`} onClick={()=>setType(v)}>{l}</button>
            ))}
          </div>
        </FilterBar>
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead><tr><th>Txn</th><th>User</th><th>Type</th><th>Amount</th><th>Rate</th><th>Fee</th><th>Network / Rail</th><th>Status</th><th>Time</th><th/></tr></thead>
            <tbody>
              {list.slice(0,50).map(t=>(
                <tr key={t.id} onClick={()=>setSel(t)} className="clickable">
                  <td className="mono"><Copy size={12} className="copy-ico"/>{t.id}<div className="text-faint mono sm">{t.ref}</div></td>
                  <td>
                    <div className="us-cell">
                      <span className="us-av grad-bg">{t.user.name.split(' ').map(p=>p[0]).join('')}</span>
                      <div>
                        <div className="us-name">{t.user.name}</div>
                        <div className="us-mail text-faint">{t.user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className={`mini-pill ${t.type==='Sell'?'teal':'purple'}`}>{t.type==='Sell'?<ArrowUpRight size={11}/>:<ArrowDownLeft size={11}/>}{t.type} {t.asset}</span></td>
                  <td>
                    <div className="tx-amt">
                      <strong>{t.type==='Sell'?(t.asset.startsWith('US')?t.amount.toLocaleString(undefined,{maximumFractionDigits:2})+' '+t.asset:t.amount+' '+t.asset):money(t.fiat)}</strong>
                      <span className="text-faint">{t.type==='Sell'?money(t.fiat):t.amount.toLocaleString(undefined,{maximumFractionDigits:5})+' '+t.asset}</span>
                    </div>
                  </td>
                  <td className="mono text-dim">{money(t.rate)}/$</td>
                  <td className="mono text-dim">{money(t.fee)}</td>
                  <td><div className="meta-col"><span>{t.network}</span><span className="text-faint">{t.bank}</span></div></td>
                  <td>{statusBadge(t.status)}</td>
                  <td className="text-faint">{fmtTime(t.time)}</td>
                  <td className="row-actions"><button className="icon-btn"><MoreVertical size={14}/></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {sel && <TxDrawer tx={sel} onClose={()=>setSel(null)}/>}
    </div>
  );
}

function TxDrawer({tx,onClose}){
  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer wide" onClick={e=>e.stopPropagation()}>
        <div className="drawer-head">
          <div>
            <div className="us-mail mono">{tx.id} • {tx.ref}</div>
            <div className="us-name lg">{tx.type} {tx.asset} <span className="grad-text">→ NGN</span></div>
            <div className="drawer-tags">{statusBadge(tx.status)}<span className="meta-col"><Clock size={11}/> {new Date(tx.time).toLocaleString()}</span></div>
          </div>
          <button className="icon-btn" onClick={onClose}><XCircle size={18}/></button>
        </div>
        <div className="drawer-body">
          <div className="kpi-grid small">
            <div className="kpi-card sm"><div className="kpi-label">{tx.type==='Sell'?'You receive':'You pay'}</div><div className="kpi-value sm">{money(tx.fiat)}</div></div>
            <div className="kpi-card sm"><div className="kpi-label">{tx.type==='Sell'?'Sent':'Received'}</div><div className="kpi-value sm">{tx.amount.toLocaleString(undefined,{maximumFractionDigits:5})} {tx.asset}</div></div>
            <div className="kpi-card sm"><div className="kpi-label">Rate</div><div className="kpi-value sm">{money(tx.rate)}/$</div></div>
            <div className="kpi-card sm"><div className="kpi-label">Fee</div><div className="kpi-value sm">{money(tx.fee)}</div></div>
          </div>

          <div className="drawer-section">
            <h4>Ledger trail</h4>
            <div className="timeline">
              <div className="tl-item ok"><div className="tl-dot"/><div><strong>Quote created</strong><span>{fmtTime(tx.time+120000)}</span></div></div>
              <div className="tl-item ok"><div className="tl-dot"/><div><strong>{tx.type==='Sell'?'Deposit detected':'Bank transfer confirmed'}</strong><span>{fmtTime(tx.time+240000)}</span></div></div>
              <div className={`tl-item ${tx.status==='failed'?'fail':tx.status==='review'?'warn':'ok'}`}><div className="tl-dot"/><div><strong>AML / screening</strong><span>{tx.status==='failed'?'Flagged':'Passed'}</span></div></div>
              <div className={`tl-item ${tx.status==='processing'||tx.status==='review'||tx.status==='failed'?'active':'ok'}`}><div className="tl-dot"/><div><strong>{tx.type==='Sell'?'Payout to bank':'Crypto released'}</strong><span>{tx.status==='completed'?'Settled':tx.status==='processing'?'Awaiting confirmation':'—'}</span></div></div>
            </div>
          </div>

          <div className="drawer-section">
            <h4>Parties & rails</h4>
            <div className="detail-grid">
              <div><span className="text-faint"><User size={12}/> Customer</span><span>{tx.user.name} ({tx.user.id})</span></div>
              <div><span className="text-faint"><WalletIco size={12}/> Network</span><span>{tx.network}</span></div>
              <div><span className="text-faint"><Building2 size={12}/> Fiat rail</span><span>{tx.bank}</span></div>
              <div><span className="text-faint"><Globe size={12}/> IP</span><span className="mono">{tx.user.ip}</span></div>
              <div className="full"><span className="text-faint"><Database size={12}/> TX hash</span><span className="mono truncate hash">{tx.hash}<Copy size={12} className="copy-ico"/></span></div>
            </div>
          </div>

          <div className="drawer-actions">
            <button className="btn-primary"><ExternalLink size={14}/> View on explorer</button>
            <button className="btn-ghost"><Copy size={14}/> Copy reference</button>
            <button className="btn-ghost gold">Mark as reviewed</button>
            <button className="btn-ghost red">Refund customer</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ KYC ============
export function KYC(){
  const [q,setQ]=useState('');
  const [filter,setFilter]=useState('pending');
  const [sel,setSel]=useState(null);

  const list=useMemo(()=>KYCS.filter(k=>{
    if(filter!=='all' && k.status!==filter) return false;
    if(q){const l=q.toLowerCase();if(!(k.user.name.toLowerCase().includes(l)||k.id.toLowerCase().includes(l))) return false;}
    return true;
  }),[q,filter]);

  return (
    <div className="adm-page">
      <PageHead
        title="KYC & Verification"
        sub="Review identity documents, sanction hits and tier upgrades."
        eyebrow={<><ShieldCheck size={12}/> Compliance</>}
        actions={<><button className="btn-ghost">Bulk approve</button><button className="btn-primary">Open queue</button></>}
      />
      <div className="stat-strip">
        <div className="ss-item blue"><strong>{KYCS.filter(k=>k.status==='pending').length}</strong><span>Pending</span></div>
        <div className="ss-item blue"><strong>{KYCS.filter(k=>k.status==='in_review').length}</strong><span>In review</span></div>
        <div className="ss-item gold"><strong>{KYCS.filter(k=>k.status==='needs_resubmission').length}</strong><span>Resubmit</span></div>
        <div className="ss-item ok"><strong>{KYCS.filter(k=>k.status==='approved').length}</strong><span>Approved (7d)</span></div>
        <div className="ss-item red"><strong>{KYCS.filter(k=>k.sanctionsHit).length}</strong><span>Sanction hits</span></div>
      </div>

      <div className="adm-card">
        <FilterBar>
          <SearchBar ph="Search name or KYC id…" onChange={setQ}/>
          <div className="chips">
            {[['pending','Pending'],['in_review','In review'],['approved','Approved'],['rejected','Rejected'],['needs_resubmission','Resubmit'],['all','All']].map(([v,l])=>(
              <button key={v} className={`chip ${filter===v?'active':''}`} onClick={()=>setFilter(v)}>{l}</button>
            ))}
          </div>
        </FilterBar>
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead><tr><th>KYC ID</th><th>Customer</th><th>Level</th><th>Document</th><th>Score</th><th>Face match</th><th>Sanctions</th><th>Submitted</th><th>Status</th><th/></tr></thead>
            <tbody>
              {list.slice(0,40).map(k=>(
                <tr key={k.id} onClick={()=>setSel(k)} className="clickable">
                  <td className="mono">{k.id}</td>
                  <td>
                    <div className="us-cell">
                      <span className="us-av grad-bg">{k.user.name.split(' ').map(p=>p[0]).join('')}</span>
                      <div><div className="us-name">{k.user.name}</div><div className="us-mail text-faint">{k.country} • {k.user.id}</div></div>
                    </div>
                  </td>
                  <td><TierBadge t={k.level}/></td>
                  <td>{k.docType}</td>
                  <td>
                    <div className="score-bar"><span style={{width:k.docScore+'%'}} className={k.docScore>=80?'ok':k.docScore>=60?'warn':'fail'}/></div>
                    <span className="text-faint sm">{k.docScore}%</span>
                  </td>
                  <td>
                    <span className={k.faceMatch>=80?'text-green':k.faceMatch>=60?'text-gold':'text-red'}>{k.faceMatch}%</span>
                  </td>
                  <td>{k.sanctionsHit?<span className="badge badge-red"><AlertTriangle size={12}/>Hit</span>:<span className="text-green"><CheckCircle2 size={12}/>Clear</span>}</td>
                  <td className="text-faint">{fmtTime(k.submitted)}</td>
                  <td>{statusBadge(k.status)}</td>
                  <td><button className="btn-ghost-sm">Review</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {sel && <KycDrawer kyc={sel} onClose={()=>setSel(null)}/>}
    </div>
  );
}

function KycDrawer({kyc,onClose}){
  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer wide" onClick={e=>e.stopPropagation()}>
        <div className="drawer-head">
          <div>
            <div className="us-mail mono">{kyc.id} • T{kyc.level}</div>
            <div className="us-name lg">{kyc.user.name}</div>
            <div className="drawer-tags">{statusBadge(kyc.status)}<span className="country-tag"><MapPin size={11}/>{kyc.country}</span></div>
          </div>
          <button className="icon-btn" onClick={onClose}><XCircle size={18}/></button>
        </div>
        <div className="drawer-body">
          <div className="doc-grid">
            <div className="doc-ph"><div className="doc-ph-placeholder">ID Front</div></div>
            <div className="doc-ph"><div className="doc-ph-placeholder">ID Back</div></div>
            <div className="doc-ph"><div className="doc-ph-placeholder">Selfie + liveness</div></div>
            <div className="doc-ph"><div className="doc-ph-placeholder">Proof of address</div></div>
          </div>
          <div className="drawer-section">
            <h4>Auto-checks</h4>
            <div className="check-list">
              <div className={`check-row ${kyc.docScore>=80?'ok':'warn'}`}><CheckCircle2 size={14}/><span>Document authenticity</span><strong>{kyc.docScore}%</strong></div>
              <div className={`check-row ${kyc.faceMatch>=80?'ok':'warn'}`}><CheckCircle2 size={14}/><span>Face match</span><strong>{kyc.faceMatch}%</strong></div>
              <div className={`check-row ${kyc.sanctionsHit?'fail':'ok'}`}>{kyc.sanctionsHit?<AlertTriangle size={14}/>:<CheckCircle2 size={14}/>}<span>Sanctions / PEP screening</span><strong>{kyc.sanctionsHit?'Hit':'Clear'}</strong></div>
              <div className="check-row ok"><CheckCircle2 size={14}/><span>IP geolocation consistency</span><strong>Match</strong></div>
              <div className="check-row ok"><CheckCircle2 size={14}/><span>Device fingerprint</span><strong>Known</strong></div>
            </div>
          </div>
          <div className="drawer-section">
            <h4>Decision note</h4>
            <textarea className="adm-textarea" placeholder="Write a note for the audit log…"/>
          </div>
          <div className="drawer-actions">
            <button className="btn-primary"><CheckCircle2 size={14}/> Approve</button>
            <button className="btn-ghost gold"><AlertTriangle size={14}/> Request resubmission</button>
            <button className="btn-ghost red"><XCircle size={14}/> Reject</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ ASSETS & PAIRS ============
export function Assets(){
  const [list,setList]=useState(PAIRS);
  const toggle=(i,k)=>{const n=[...list];n[i]={...n[i],[k]:!n[i][k]};setList(n);};
  const setStatus=(i,v)=>{const n=[...list];n[i]={...n[i],status:v};setList(n);};
  return (
    <div className="adm-page">
      <PageHead
        title="Assets & Pairs"
        sub="Control which crypto/fiat pairs are live, their spreads and limits."
        actions={<button className="btn-primary"><Plus size={14}/> New pair</button>}
      />
      <div className="adm-card">
        <FilterBar>
          <SearchBar ph="Search asset, network or fiat…"/>
        </FilterBar>
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead><tr><th>Pair</th><th>Network</th><th>Buy</th><th>Sell</th><th>Spread</th><th>Buy limits</th><th>Sell limits</th><th>24h volume</th><th>Status</th><th/></tr></thead>
            <tbody>
              {list.map((p,i)=>(
                <tr key={p.asset+p.network}>
                  <td>
                    <div className="us-cell">
                      <span className={`as-ico ${p.asset}`}>{p.asset[0]}</span>
                      <div><div className="us-name">{p.asset} → {p.fiat}</div><div className="us-mail text-faint">Rate synced</div></div>
                    </div>
                  </td>
                  <td className="mono text-dim">{p.network}</td>
                  <td><Toggle on={p.buy} onClick={()=>toggle(i,'buy')}/></td>
                  <td><Toggle on={p.sell} onClick={()=>toggle(i,'sell')}/></td>
                  <td><span className="mono">{(p.spread*100).toFixed(2)}%</span></td>
                  <td className="mono text-dim">{money(p.minBuy)} – {money(p.maxBuy)}</td>
                  <td className="mono text-dim">{p.minSell} – {p.maxSell.toLocaleString()} {p.asset}</td>
                  <td className="mono">{money(p.vol24)}</td>
                  <td>
                    <select className="adm-select" value={p.status} onChange={e=>setStatus(i,e.target.value)}>
                      <option value="active">Active</option>
                      <option value="paused">Paused</option>
                      <option value="disabled">Disabled</option>
                    </select>
                  </td>
                  <td className="row-actions"><button className="icon-btn"><Edit2 size={14}/></button><button className="icon-btn"><MoreVertical size={14}/></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const Toggle=({on,onClick})=>(
  <button className={`toggle ${on?'on':''}`} onClick={onClick}>{on?<ToggleRight size={26}/>:<ToggleLeft size={26}/>}</button>
);

// ============ RAILS ============
export function Rails(){
  return (
    <div className="adm-page">
      <PageHead
        title="Rails & Bank accounts"
        sub="Manage fiat settlement accounts and payment processors."
        actions={<button className="btn-primary"><Plus size={14}/> Add rail</button>}
      />

      <div className="adm-grid-3">
        {RAILS.map(r=>(
          <div key={r.name} className="rail-card">
            <div className="rail-card-top">
              <div className="rail-ico"><CreditCard size={18}/></div>
              <div className={`rail-pill ${r.status}`}>{r.status}</div>
            </div>
            <h3>{r.name}</h3>
            <div className="text-faint">{r.type} • {r.country} • {r.currency}</div>
            <div className="rail-metrics">
              <div><strong>{money(r.vol24)}</strong><span>24h vol</span></div>
              <div><strong>{r.tx24}</strong><span>24h tx</span></div>
              <div className={r.success>=98?'ok':r.success>=95?'warn':'fail'}><strong>{r.success.toFixed(1)}%</strong><span>Success</span></div>
            </div>
            <div className="rail-fees">
              <div><span className="text-faint">Fee</span><strong>{(r.fee*100).toFixed(2)}%</strong></div>
              <div><span className="text-faint">Min / Max</span><strong>{money(r.min)} – {money(r.max)}</strong></div>
              <div className="full"><span className="text-faint">Account</span><span className="mono">{r.account}</span></div>
              <div className="full"><span className="text-faint">Holder</span><span>{r.holder}</span></div>
            </div>
            <div className="rail-actions">
              <button className="btn-ghost-sm"><Edit2 size={12}/> Edit</button>
              <button className="btn-ghost-sm"><TrendingUp size={12}/> Metrics</button>
              <button className={`btn-ghost-sm ${r.status==='active'?'red':''}`}>{r.status==='active'?'Pause':'Enable'}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ DISPUTES ============
export function Disputes(){
  const [q,setQ]=useState('');
  const [filter,setFilter]=useState('open');
  const list=DISPUTES.filter(d=>{
    if(filter!=='all' && d.status!==filter) return false;
    if(q){const l=q.toLowerCase();if(!(d.id.toLowerCase().includes(l)||d.category.toLowerCase().includes(l)||d.tx.user.name.toLowerCase().includes(l)))return false;}
    return true;
  });
  const prColor={low:'muted',medium:'blue',high:'gold',critical:'red'};
  return (
    <div className="adm-page">
      <PageHead title="Disputes & Support" sub="Resolve customer claims, chargebacks and missing deposits." actions={<button className="btn-primary"><Download size={14}/> Export</button>}/>
      <div className="stat-strip">
        <div className="ss-item blue"><strong>{DISPUTES.filter(d=>d.status==='open').length}</strong><span>Open</span></div>
        <div className="ss-item gold"><strong>{DISPUTES.filter(d=>d.priority==='high'||d.priority==='critical').length}</strong><span>High priority</span></div>
        <div className="ss-item ok"><strong>{DISPUTES.filter(d=>d.status==='resolved').length}</strong><span>Resolved (7d)</span></div>
        <div className="ss-item purple"><strong>{DISPUTES.filter(d=>d.status==='escalated').length}</strong><span>Escalated</span></div>
      </div>
      <div className="adm-card">
        <FilterBar>
          <SearchBar ph="Search disputes…" onChange={setQ}/>
          <div className="chips">
            {[['open','Open'],['in_progress','In progress'],['resolved','Resolved'],['escalated','Escalated'],['all','All']].map(([v,l])=>(
              <button key={v} className={`chip ${filter===v?'active':''}`} onClick={()=>setFilter(v)}>{l}</button>
            ))}
          </div>
        </FilterBar>
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead><tr><th>ID</th><th>Customer</th><th>Txn</th><th>Category</th><th>Priority</th><th>Assigned</th><th>Messages</th><th>Opened</th><th>Status</th><th/></tr></thead>
            <tbody>
              {list.slice(0,40).map(d=>(
                <tr key={d.id} className="clickable">
                  <td className="mono">{d.id}</td>
                  <td>
                    <div className="us-cell">
                      <span className="us-av grad-bg">{d.tx.user.name.split(' ').map(p=>p[0]).join('')}</span>
                      <div><div className="us-name">{d.tx.user.name}</div><div className="us-mail text-faint">{d.tx.user.email}</div></div>
                    </div>
                  </td>
                  <td className="mono text-dim">{d.tx.id}</td>
                  <td>{d.category}</td>
                  <td><span className={`badge badge-${prColor[d.priority]}`}>{d.priority}</span></td>
                  <td>{d.assigned==='Unassigned'?<span className="text-faint">Unassigned</span>:d.assigned}</td>
                  <td>{d.messages}</td>
                  <td className="text-faint">{fmtTime(d.opened)}</td>
                  <td>{statusBadge(d.status)}</td>
                  <td><button className="btn-ghost-sm">Open</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============ AUDIT ============
export function Audit(){
  return (
    <div className="adm-page">
      <PageHead title="Audit logs" sub="Immutable record of every admin action in the console." eyebrow={<><FileClock size={12}/> Security</>}/>
      <div className="adm-card">
        <FilterBar>
          <SearchBar ph="Search actor, action or target…"/>
          <div className="chips">
            {['All','Login','User','KYC','Transactions','Rails','Settings'].map(l=>(
              <button key={l} className={`chip ${l==='All'?'active':''}`}>{l}</button>
            ))}
          </div>
        </FilterBar>
        <div className="adm-table-wrap">
          <table className="adm-table mono-table">
            <thead><tr><th>Timestamp</th><th>Actor</th><th>Action</th><th>Target</th><th>IP</th><th>Result</th></tr></thead>
            <tbody>
              {AUDIT.slice(0,80).map(l=>(
                <tr key={l.id}>
                  <td className="text-dim">{new Date(l.time).toLocaleString()}</td>
                  <td>{l.actor}</td>
                  <td><code className="ev-code">{l.action}</code></td>
                  <td className="text-dim">{l.target}</td>
                  <td className="text-faint">{l.ip}</td>
                  <td>{statusBadge(l.result)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============ FEES ============
export function Fees(){
  const tiers=[
    {name:'Starter (T1)',fee:1.5,spread:0.8,minFee:500,desc:'New users, KYC L1'},
    {name:'Verified (T2)',fee:1.2,spread:0.6,minFee:300,desc:'KYC L2 verified'},
    {name:'Pro (T3)',fee:0.9,spread:0.4,minFee:200,desc:'High-volume, manually approved'},
    {name:'VIP / OTC',fee:0.6,spread:0.2,minFee:0,desc:'By invitation only'},
  ];
  return (
    <div className="adm-page">
      <PageHead title="Fees & Rates" sub="Configure margin, spread and rate sources across customer tiers." actions={<button className="btn-primary"><Edit2 size={14}/> Save changes</button>}/>
      <div className="adm-row two">
        <div className="adm-card span-2">
          <div className="adm-card-head"><div><h3>Fee tiers</h3><p className="text-muted">Applied based on user KYC tier.</p></div></div>
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead><tr><th>Tier</th><th>Trading fee</th><th>Spread</th><th>Minimum fee</th><th>Description</th><th/></tr></thead>
              <tbody>
                {tiers.map(t=>(
                  <tr key={t.name}>
                    <td><strong>{t.name}</strong></td>
                    <td><div className="num-edit"><Percent size={12}/><input defaultValue={t.fee}/>%</div></td>
                    <td><div className="num-edit"><Percent size={12}/><input defaultValue={t.spread}/>%</div></td>
                    <td><div className="num-edit"><DollarSign size={12}/><input defaultValue={t.minFee}/></div></td>
                    <td className="text-muted">{t.desc}</td>
                    <td><button className="icon-btn"><MoreVertical size={14}/></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="adm-card">
          <div className="adm-card-head"><div><h3>Rate sources</h3><p className="text-muted">Weighted median of providers.</p></div><span className="badge badge-ok">Live</span></div>
          <div className="rate-source">
            {[['Binance',40],['CoinGecko',25],['Kraken',20],['Chainlink',15]].map(([n,w])=>(
              <div key={n} className="rs-row">
                <span>{n}</span>
                <div className="rs-bar"><span style={{width:w+'%'}}/></div>
                <span className="mono">{w}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="adm-row two">
        <div className="adm-card"><div className="adm-card-head"><div><h3>Network fees</h3><p className="text-muted">Passed through to the customer.</p></div></div>
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead><tr><th>Network</th><th>Estimated fee</th><th>Last updated</th><th/></tr></thead>
              <tbody>
                {[['Base','$0.02','2 min'],['Ethereum','$1.42','3 min'],['TRC20','$1.00','5 min'],['Bitcoin','$2.80','8 min'],['Avalanche','$0.03','2 min'],['BNB Chain','$0.08','4 min']].map(([n,f,u])=>(
                  <tr key={n}><td>{n}</td><td className="mono">{f}</td><td className="text-faint">{u}</td><td><button className="btn-ghost-sm">Bump</button></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="adm-card"><div className="adm-card-head"><div><h3>Promotions</h3><p className="text-muted">First-trade and volume campaigns.</p></div><button className="btn-ghost-sm"><Plus size={12}/> New</button></div>
          <div className="promo-list">
            <div className="promo"><div><strong>New user zero-fee</strong><p className="text-muted">First sell up to $500 — fee 0%</p></div><span className="badge badge-ok">Active</span></div>
            <div className="promo"><div><strong>Ramadan volume boost</strong><p className="text-muted">0.8% off trades over ₦5M</p></div><span className="badge badge-gold">Scheduled</span></div>
            <div className="promo"><div><strong>Referral bonus</strong><p className="text-muted">₦1,000 per verified referral</p></div><span className="badge badge-ok">Active</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ SETTINGS ============
export function AdminSettings(){
  return (
    <div className="adm-page">
      <PageHead title="Settings" sub="Platform configuration, team access and security."/>
      <div className="adm-row two">
        <div className="adm-card span-2">
          <h3>Platform</h3>
          <div className="setting-list">
            {[
              ['Maintenance mode','Temporarily block new trades while showing a banner to users.',false],
              ['New user signups','Allow new customer registration.',true],
              ['Instant payouts','Release fiat before crypto confirmations on trusted rails.',true],
              ['Sanctions screening','Run Onfido/Chainalysis on every transaction above ₦500k.',true],
              ['Device binding','Email verification on new device login.',true],
              ['Global geo-block','Block traffic from sanctioned jurisdictions.',true],
            ].map(([t,d,on])=>(
              <SettingRow key={t} title={t} desc={d} def={on}/>
            ))}
          </div>
        </div>
        <div className="adm-card">
          <h3>Team members</h3>
          <div className="team-list">
            {[
              ['SA','Sivan Admin','admin@sivantech.online','Super Admin'],
              ['OP','Operations','ops@sivantech.online','Operator'],
              ['CO','Compliance','compliance@sivantech.online','Compliance'],
            ].map(([a,n,e,r])=>(
              <div key={e} className="team-row">
                <span className="us-av grad-bg">{a}</span>
                <div><strong>{n}</strong><span className="text-faint">{e}</span></div>
                <span className="role-pill">{r}</span>
              </div>
            ))}
            <button className="btn-ghost-sm full"><UserPlus size={12}/> Invite teammate</button>
          </div>
        </div>
      </div>

      <div className="adm-row two">
        <div className="adm-card"><h3>API keys</h3><p className="text-muted" style={{marginBottom:16}}>Keys for webhooks, rate providers and third-party integrations.</p>
          {[['Mainnet node','sk_live_••••••••••••8f2a','2 days ago'],['Onfido KYC','pk_prod_••••••••••••19bc','1 month ago'],['Flutterwave','FLWSECK-••••••••••X','3 weeks ago'],['Slack alerts','xoxb-••••••••••••','2 months ago']].map(([n,k,u])=>(
            <div key={n} className="api-row"><div><strong>{n}</strong><span className="mono text-faint">{k}</span></div><span className="text-faint">{u}</span><button className="btn-ghost-sm">Rotate</button></div>
          ))}
        </div>
        <div className="adm-card"><h3>Danger zone</h3>
          <div className="danger-list">
            <div><div><strong>Export all data</strong><p className="text-muted">Download a full export of users, txns and logs.</p></div><button className="btn-ghost-sm">Start export</button></div>
            <div><div><strong>Disable on-ramp</strong><p className="text-muted">Stop all buy crypto flows instantly.</p></div><button className="btn-ghost-sm red">Disable</button></div>
            <div><div><strong>Disable off-ramp</strong><p className="text-muted">Stop all sell crypto flows instantly.</p></div><button className="btn-ghost-sm red">Disable</button></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingRow({title,desc,def}){
  const [on,setOn]=useState(def);
  return (
    <div className="setting-row">
      <div><strong>{title}</strong><p className="text-muted">{desc}</p></div>
      <Toggle on={on} onClick={()=>setOn(!on)}/>
    </div>
  );
}
