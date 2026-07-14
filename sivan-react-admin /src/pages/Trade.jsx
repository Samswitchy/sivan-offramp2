import {useState,useEffect} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import {ArrowRight,ChevronDown,ArrowUpRight,ArrowDownLeft,CheckCircle2,Copy,Clock,AlertCircle,Info,ShieldCheck,ExternalLink} from 'lucide-react';
import {useAuth} from '../context/AuthContext';

const ASSETS=[
  {sym:'USDC',name:'USD Coin',net:'Base',rate:1.0012,fee:.015},
  {sym:'USDT',name:'Tether',net:'Ethereum',rate:1.0008,fee:.015},
  {sym:'ETH',name:'Ether',net:'Base',rate:3250.42,fee:.018},
];
const FIATS=[
  {sym:'USD',name:'US Dollar',method:'ACH'},
  {sym:'GBP',name:'British Pound',method:'FPS'},
  {sym:'EUR',name:'Euro',method:'SEPA'},
  {sym:'NGN',name:'Nigerian Naira',method:'NIP'},
];
const NETWORKS=['Base','Ethereum','Avalanche'];

export default function Trade({mode:initialMode='sell'}){
  const {user,updateUser}=useAuth();
  const nav=useNavigate();
  const [mode,setMode]=useState(initialMode); // 'sell' | 'buy'
  const [step,setStep]=useState(1); // 1=quote, 2=review, 3=details (deposit addr or transfer info), 4=tracking
  const [amount,setAmount]=useState('1000');
  const [asset,setAsset]=useState(ASSETS[0]);
  const [fiat,setFiat]=useState(FIATS[0]);
  const [network,setNetwork]=useState(NETWORKS[0]);
  const [openAsset,setOpenAsset]=useState(false);
  const [openFiat,setOpenFiat]=useState(false);
  const [refundAddr,setRefundAddr]=useState('');
  const [agree,setAgree]=useState(false);

  useEffect(()=>{setMode(initialMode);setStep(1)},[initialMode]);

  const isSell=mode==='sell';
  const a=parseFloat(amount||0);
  const fee=a*asset.fee;
  const receive = isSell
    ? ((a*asset.rate)-fee).toFixed(2)
    : ((a/asset.rate)*(1-asset.fee)).toFixed(4);
  const depositAddr='0x8F2c...4dEa19';
  const arrivalText=isSell?'1–2 business days after crypto confirmed':'Minutes after payment clears';

  const canProceed= a>0 && agree && (!isSell || refundAddr.length>10);

  return (
    <div className="trade">
      <div className="trade-head">
        <div>
          <h1 style={{fontSize:24,letterSpacing:'-.025em',marginBottom:4}}>{isSell?'Sell crypto':'Buy crypto'}</h1>
          <p className="muted">{isSell?'Send crypto, receive cash in your bank account.':'Send fiat, receive crypto in your wallet.'}</p>
        </div>
        <div className="stepper">
          {['Quote','Review',isSell?'Deposit':'Payment','Tracking'].map((s,i)=>(
            <div key={i} className={`step-node ${step===i+1?'active':''} ${step>i+1?'done':''}`}>
              <div className="step-dot">{step>i+1?<CheckCircle2 size={12}/>:i+1}</div>
              <span>{s}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="trade-grid">
        <div className="card trade-card">
          {/* Step 1: quote */}
          {step===1 && (
            <>
              <div className="seg">
                <button className={mode==='sell'?'active':''} onClick={()=>setMode('sell')}><ArrowUpRight size={14}/>Sell</button>
                <button className={mode==='buy'?'active':''} onClick={()=>setMode('buy')}><ArrowDownLeft size={14}/>Buy</button>
              </div>

              <div className="trade-field">
                <label>{isSell?'You send':'You pay'}</label>
                <div className="trade-row">
                  <input type="text" className="trade-input" value={amount} onChange={e=>setAmount(e.target.value.replace(/[^0-9.]/g,''))} placeholder="0.00"/>
                  <button className="dd" onClick={()=>setOpenAsset(v=>!v)}>
                    <span className="coin">{asset.sym[0]}</span>{isSell?asset.sym:fiat.sym}<ChevronDown size={14}/>
                    {openAsset && (
                      <div className="dd-menu">
                        {(isSell?ASSETS:FIATS).map(o=>(
                          <button key={o.sym} className="dd-item" onClick={()=>{isSell?setAsset(o):setFiat(o);setOpenAsset(false)}}>
                            <span className="coin">{o.sym[0]}</span>
                            <div>
                              <div style={{fontWeight:600}}>{o.sym} {!isSell&&<span className="badge badge-muted" style={{marginLeft:6,fontSize:10}}>{o.method}</span>}</div>
                              <div className="dd-sub">{isSell?`${o.name} · ${o.net}`:o.name}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </button>
                </div>
                <div className="field-mini">
                  <span>Min 20 · Max 50,000</span>
                  <span className="rate">1 {isSell?asset.sym:fiat.sym} = {isSell?`$${asset.rate.toFixed(4)} USD`:`${(1/asset.rate).toFixed(4)} ${asset.sym}`}</span>
                </div>
              </div>

              <div className="swap-btn" aria-hidden>↓</div>

              <div className="trade-field muted-field">
                <label>{isSell?'You receive':'You get'}</label>
                <div className="trade-row">
                  <input type="text" className="trade-input" value={isSell?receive:receive} readOnly/>
                  <button className="dd" onClick={()=>setOpenFiat(v=>!v)}>
                    <span className="coin" style={{background:'linear-gradient(135deg,#a0d4ff,#4b8bf4)',color:'#0a1020'}}>{isSell?fiat.sym[0]:asset.sym[0]}</span>{isSell?fiat.sym:asset.sym}<ChevronDown size={14}/>
                    {openFiat && (
                      <div className="dd-menu">
                        {(isSell?FIATS:ASSETS).map(o=>(
                          <button key={o.sym} className="dd-item" onClick={()=>{isSell?setFiat(o):setAsset(o);setOpenFiat(false)}}>
                            <span className="coin" style={{background:'linear-gradient(135deg,#a0d4ff,#4b8bf4)',color:'#0a1020'}}>{o.sym[0]}</span>
                            <div>
                              <div style={{fontWeight:600}}>{o.sym}{isSell&&<span className="badge badge-muted" style={{marginLeft:6,fontSize:10}}>{o.method}</span>}</div>
                              <div className="dd-sub">{o.name}{!isSell?` · ${o.net}`:''}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </button>
                </div>
              </div>

              {isSell && (
                <div className="field">
                  <label>Network</label>
                  <div className="net-chips">
                    {NETWORKS.map(n=>(
                      <button key={n} className={`net-chip ${network===n?'active':''}`} onClick={()=>setNetwork(n)}>{n}</button>
                    ))}
                  </div>
                  <div className="field-hint">Always confirm the network matches your wallet. Sending on the wrong network can result in permanent loss.</div>
                </div>
              )}

              <div className="quote-card">
                <div className="q-row"><span>Rate</span><span className="mono">1 {asset.sym} = ${asset.rate.toFixed(4)}</span></div>
                <div className="q-row"><span>Fee ({(asset.fee*100).toFixed(1)}%)</span><span className="mono">−${fee.toFixed(2)}</span></div>
                <div className="q-row"><span>Arrival</span><span>{arrivalText}</span></div>
                <div className="q-row"><span>Payment method</span><span>{isSell?fiat.method:'Bank transfer'}</span></div>
                <div className="q-total"><span>You'll {isSell?'receive':'get'}</span><span className="mono">{isSell?`${receive} ${fiat.sym}`:`${receive} ${asset.sym}`}</span></div>
              </div>

              <div className="notice">
                <Info size={14}/>
                Your rate will be locked for 90 seconds after you confirm on the next screen.
              </div>

              <div className="actions">
                <button className="btn btn-primary btn-lg btn-block" onClick={()=>setStep(2)} disabled={!a||a<=0}>Continue<ArrowRight size={15}/></button>
              </div>
            </>
          )}

          {/* Step 2: review */}
          {step===2 && (
            <>
              <div className="eyebrow center" style={{marginBottom:8}}>Review your order</div>
              <h2 style={{fontSize:20,textAlign:'center',marginBottom:4}}>Confirm transaction details</h2>
              <p className="muted" style={{textAlign:'center',fontSize:13,marginBottom:24}}>Double-check everything — crypto transactions are irreversible.</p>

              <div className="review-card">
                <ReviewRow label="Action" value={isSell?`Sell ${asset.sym} → ${fiat.sym}`:`Buy ${asset.sym} with ${fiat.sym}`}/>
                {isSell && <ReviewRow label="Network" value={network}/>}
                <ReviewRow label={isSell?'You send':'You pay'} value={`${amount} ${isSell?asset.sym:fiat.sym}`} bold/>
                <ReviewRow label={isSell?'You receive':'You get'} value={`${isSell?receive+' '+fiat.sym:receive+' '+asset.sym}`} bold highlight/>
                <ReviewRow label="Rate" value={`1 ${asset.sym} = $${asset.rate.toFixed(4)}`} mono/>
                <ReviewRow label="Fee" value={`${(asset.fee*100).toFixed(1)}% ($${fee.toFixed(2)})`} mono/>
                <ReviewRow label="Arrival" value={arrivalText}/>
                <ReviewRow label={isSell?'Destination':'Receiving wallet'} value={isSell?'Chase ••4242 · ACH':'0x8F2c...4dEa19 (Base)'}/>
              </div>

              {isSell && (
                <label className="field">
                  <span>Refund wallet address</span>
                  <input className="input" placeholder={`0x... (${network})`} value={refundAddr} onChange={e=>setRefundAddr(e.target.value)}/>
                  <span className="field-hint">Used if your deposit needs to be returned. Must be a wallet on {network}.</span>
                </label>
              )}

              <label className="checkbox" style={{fontSize:12.5,margin:'12px 0 18px'}}>
                <input type="checkbox" checked={agree} onChange={e=>setAgree(e.target.checked)}/><span className="box"/>
                I understand I must send exactly {amount} {isSell?asset.sym:fiat.sym} {isSell?`on ${network}`:''}{isSell?' to the unique address provided.':''} Sending {isSell?'any other token or wrong network':'less or more than the quoted amount'} may result in permanent loss of funds.
              </label>

              <div className="actions" style={{display:'flex',gap:10}}>
                <button className="btn btn-secondary btn-lg" onClick={()=>setStep(1)}>Back</button>
                <button className="btn btn-primary btn-lg" style={{flex:1}} disabled={!canProceed} onClick={()=>setStep(3)}>
                  Confirm & {isSell?'get deposit address':'proceed to payment'}<ArrowRight size={15}/>
                </button>
              </div>
            </>
          )}

          {/* Step 3: deposit / payment */}
          {step===3 && (
            <>
              {isSell ? (
                <>
                  <div className="eyebrow center" style={{marginBottom:8}}>Deposit address</div>
                  <h2 style={{fontSize:20,textAlign:'center',marginBottom:4}}>Send {asset.sym} on {network}</h2>
                  <p className="muted" style={{textAlign:'center',fontSize:13,marginBottom:22}}>Send exactly <strong style={{color:'var(--text)'}}>{amount} {asset.sym}</strong> to the address below.</p>

                  <div className="deposit-card">
                    <div className="qr" aria-hidden>
                      <div style={{width:130,height:130,background:'repeating-conic-gradient(#0a0f16 0 25%,#0f1d22 0 50%)',backgroundSize:'10px 10px',borderRadius:8,border:'6px solid #fff',display:'grid',placeItems:'center'}}><div style={{width:24,height:24,background:'#fff',borderRadius:3}}/></div>
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <div className="daddr mono">{depositAddr}<button className="copy-btn" title="Copy"><Copy size={13}/></button></div>
                      <div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:10}}>
                        <span className="chip chip-brand">{asset.sym}</span>
                        <span className="chip">{network}</span>
                        <span className="chip">{amount} {asset.sym} required</span>
                      </div>
                      <p style={{fontSize:12,color:'var(--text-muted)',marginTop:10,lineHeight:1.55}}>Address expires in <strong style={{color:'var(--gold)'}}>23h 59m</strong>. One address per order. Do not reuse.</p>
                    </div>
                  </div>

                  <div className="warn-card">
                    <AlertCircle size={16}/>
                    <div>
                      <strong>Check twice.</strong>
                      Sending a different token, wrong network, or wrong amount can result in permanent loss. Only send from a wallet you control.
                    </div>
                  </div>

                  <button className="btn btn-primary btn-lg btn-block" onClick={()=>setStep(4)} style={{marginTop:18}}>I've sent the crypto</button>
                </>
              ) : (
                <>
                  <div className="eyebrow center" style={{marginBottom:8}}>Send bank transfer</div>
                  <h2 style={{fontSize:20,textAlign:'center',marginBottom:4}}>Send {amount} {fiat.sym} to complete your purchase</h2>
                  <p className="muted" style={{textAlign:'center',fontSize:13,marginBottom:22}}>Use the exact reference. Your order will update automatically when payment is received.</p>

                  <div className="review-card">
                    <ReviewRow label="Recipient" value="Sivan Payments Ltd" mono/>
                    <ReviewRow label="IBAN / Account" value="GB33 BUKB 2020 1555 5555 55" mono copy/>
                    <ReviewRow label="Sort / Routing" value="20-20-15" mono copy/>
                    <ReviewRow label="Reference" value="SVN-BUY-9F2A7C" mono copy/>
                    <ReviewRow label="Amount" value={`${amount} ${fiat.sym}`} bold/>
                  </div>

                  <div className="notice"><Info size={14}/>Crypto is sent to your wallet address after payment clears (usually within minutes).</div>

                  <button className="btn btn-primary btn-lg btn-block" onClick={()=>setStep(4)} style={{marginTop:18}}>I've sent the payment</button>
                </>
              )}
            </>
          )}

          {/* Step 4: tracking */}
          {step===4 && (
            <>
              <div className="eyebrow center" style={{marginBottom:8}}>Transaction tracking</div>
              <h2 style={{fontSize:20,textAlign:'center',marginBottom:4}}>Transaction in progress</h2>
              <p className="muted" style={{textAlign:'center',fontSize:13,marginBottom:22}}>Reference <strong className="mono">SVN-{(Math.random().toString(36).slice(2,8).toUpperCase())}</strong></p>

              <div className="timeline">
                <TLItem done title={isSell?'Deposit address created':'Order created'} sub="Just now"/>
                <TLItem active title={isSell?'Awaiting your deposit':'Awaiting bank payment'} sub="Waiting for funds"/>
                <TLItem title={isSell?'Confirming on-chain':'Payment clearing'} sub="Auto-detects in ~1 min"/>
                <TLItem title={isSell?'Converting':'Sending crypto'}/>
                <TLItem title={isSell?'Payout to bank':'Crypto delivered'}/>
              </div>

              <div className="notice" style={{marginTop:18}}><Clock size={14}/> Typical {isSell?'payout time is 1–2 business days after on-chain confirmation.':'delivery is within minutes after payment clears.'} We'll email you at <strong>{user?.email}</strong> at every step.</div>

              <div className="actions" style={{display:'flex',gap:10,marginTop:18}}>
                <Link to="/app/transactions" className="btn btn-secondary btn-lg">View transactions</Link>
                <Link to="/app" className="btn btn-ghost btn-lg">Back to dashboard</Link>
              </div>
            </>
          )}
        </div>

        {/* Right side help/info */}
        <div className="side-info">
          <div className="card">
            <h3 style={{fontSize:15,marginBottom:10}}>How this works</h3>
            <ol className="steps-list">
              <li>We generate a unique {isSell?'deposit address':'payment reference'} for your order.</li>
              <li>Send the exact {isSell?asset.sym:fiat.sym} {isSell?`on ${network}`:'to our licensed partner'}.</li>
              <li>We detect the payment automatically and {isSell?'convert to fiat and send to your bank':'send crypto to your wallet'}.</li>
            </ol>
          </div>
          <div className="card" style={{background:'linear-gradient(160deg,#0f1d1c,#0c151a)'}}>
            <div style={{display:'flex',gap:10,alignItems:'flex-start'}}>
              <ShieldCheck size={18} style={{color:'var(--brand-300)',flexShrink:0,marginTop:2}}/>
              <div>
                <h4 style={{fontSize:13.5,marginBottom:6}}>Secure & non-custodial</h4>
                <p style={{fontSize:12.5,color:'var(--text-muted)',lineHeight:1.55}}>Payments are processed by licensed partners. Funds are only held briefly during settlement.</p>
              </div>
            </div>
          </div>
          <div className="card">
            <h3 style={{fontSize:15,marginBottom:10}}>Need help?</h3>
            <p style={{fontSize:13,color:'var(--text-muted)',lineHeight:1.55,marginBottom:12}}>Issues with a transfer, wrong network, or delayed payout? Our support team is on hand.</p>
            <Link to="/app/support" className="btn btn-secondary btn-sm btn-block">Contact support<ExternalLink size={12}/></Link>
          </div>
        </div>
      </div>

      <style>{`
        .trade{display:flex;flex-direction:column;gap:22px}
        .trade-head{display:flex;justify-content:space-between;align-items:flex-end;gap:20px;flex-wrap:wrap}
        .muted{color:var(--text-muted)}
        .stepper{display:flex;gap:8px;align-items:center}
        .step-node{display:flex;align-items:center;gap:8px;font-size:12px;color:var(--text-faint);font-weight:600}
        .step-dot{width:22px;height:22px;border-radius:50%;background:var(--surface-2);border:1px solid var(--border);display:grid;place-items:center;font-size:11px;color:var(--text-faint)}
        .step-node.active .step-dot{background:linear-gradient(135deg,var(--brand-300),var(--brand-500));color:#051210;border-color:transparent;font-weight:700}
        .step-node.active{color:var(--text)}
        .step-node.done .step-dot{background:#143626;color:#6fdca1;border-color:#1f4f36}
        .step-node:not(:last-child)::after{content:"";width:24px;height:1px;background:var(--border);margin-left:8px}
        .trade-grid{display:grid;grid-template-columns:1fr 340px;gap:20px}
        .trade-card{max-width:100%}
        .seg{display:grid;grid-template-columns:1fr 1fr;background:var(--bg-2);border:1px solid var(--border);border-radius:11px;padding:4px;margin-bottom:20px}
        .seg button{background:transparent;color:var(--text-muted);padding:10px;border-radius:8px;font-weight:600;font-size:13px;display:inline-flex;align-items:center;justify-content:center;gap:6px;transition:.15s}
        .seg button.active{background:linear-gradient(135deg,var(--brand-300),var(--brand-500));color:#051210;font-weight:700}
        .trade-field{background:var(--bg-2);border:1px solid var(--border);border-radius:14px;padding:14px;margin-bottom:8px;transition:.15s}
        .trade-field:focus-within{border-color:var(--brand-400);box-shadow:0 0 0 4px #23bfb218}
        .muted-field{background:var(--surface);opacity:.95}
        .trade-field label{font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.1em;font-weight:600;display:block;margin-bottom:6px}
        .trade-row{display:flex;align-items:center;gap:10px}
        .trade-input{background:transparent;border:0;color:var(--text);font-size:26px;font-weight:700;width:100%;outline:none;letter-spacing:-.02em;font-family:inherit}
        .trade-input::placeholder{color:var(--text-faint)}
        .dd{position:relative;display:inline-flex;align-items:center;gap:7px;background:var(--surface-2);border:1px solid var(--border);padding:7px 10px;border-radius:9px;font-size:13px;font-weight:600;flex-shrink:0;min-width:110px;justify-content:space-between}
        .coin{width:20px;height:20px;border-radius:50%;background:linear-gradient(135deg,#4cd8c8,#23bfb2);color:#051210;display:grid;place-items:center;font-weight:800;font-size:11px;flex-shrink:0}
        .dd-menu{position:absolute;top:calc(100% + 6px);right:0;left:auto;min-width:260px;background:var(--panel-strong);border:1px solid var(--border-strong);border-radius:12px;padding:6px;box-shadow:var(--shadow-lg);z-index:10}
        .dd-item{width:100%;display:flex;align-items:center;gap:10px;padding:9px 10px;background:transparent;border-radius:8px;color:var(--text);text-align:left;transition:.1s}
        .dd-item:hover{background:#ffffff08}
        .dd-sub{font-size:11px;color:var(--text-muted);font-weight:400}
        .field-mini{display:flex;justify-content:space-between;font-size:11.5px;color:var(--text-muted);margin-top:8px}
        .field-mini .rate{color:var(--brand-300);font-weight:600}
        .swap-btn{width:36px;height:36px;margin:-2px auto;position:relative;z-index:1;background:var(--bg-2);border:1px solid var(--border-strong);border-radius:50%;display:grid;place-items:center;color:var(--brand-300);font-weight:700}
        .net-chips{display:flex;gap:8px;flex-wrap:wrap;margin-top:4px}
        .net-chip{padding:7px 12px;border:1px solid var(--border);background:var(--surface-2);border-radius:9px;font-size:12.5px;font-weight:600;color:var(--text-dim);transition:.15s}
        .net-chip.active{border-color:var(--brand-400);background:#23bfb215;color:var(--brand-300)}
        .field-hint{font-size:11.5px;color:var(--text-faint);margin-top:6px}
        .quote-card{background:var(--bg-2);border:1px solid var(--border);border-radius:12px;padding:14px;margin-top:14px}
        .q-row{display:flex;justify-content:space-between;font-size:13px;color:var(--text-muted);padding:5px 0}
        .q-row .mono{color:var(--text);font-weight:600}
        .q-total{margin-top:10px;padding-top:10px;border-top:1px solid var(--border);display:flex;justify-content:space-between;font-weight:700;color:var(--text);font-size:14px}
        .q-total .mono{color:var(--brand-300);font-size:16px}
        .notice{display:inline-flex;gap:10px;align-items:center;padding:10px 12px;background:#23bfb210;border:1px solid #23bfb230;border-radius:10px;font-size:12px;color:var(--text-dim);margin-top:14px}
        .warn-card{margin-top:18px;padding:14px;background:#3d181830;border:1px solid #5d252550;border-radius:12px;font-size:12.5px;color:#f3b3ad;display:flex;gap:10px;align-items:flex-start;line-height:1.55}
        .warn-card strong{display:block;color:#f3a79f;margin-bottom:3px}
        .actions{margin-top:22px}
        .review-card{background:var(--bg-2);border:1px solid var(--border);border-radius:14px;padding:16px}
        .review-row{display:flex;justify-content:space-between;padding:9px 0;border-bottom:1px solid var(--border);font-size:13.5px}
        .review-row:last-of-type{border-bottom:0}
        .review-row span:first-child{color:var(--text-muted)}
        .review-row span:last-child{color:var(--text-dim)}
        .review-row.bold span:last-child{font-weight:700;color:var(--text)}
        .review-row.highlight span:last-child{color:var(--brand-300);font-size:15px}
        .copy-btn{margin-left:8px;background:transparent;border:0;color:var(--text-muted);padding:3px;border-radius:6px;vertical-align:middle}
        .copy-btn:hover{color:var(--brand-300);background:#23bfb215}
        .deposit-card{background:var(--bg-2);border:1px solid var(--border);border-radius:14px;padding:18px;display:flex;gap:18px;align-items:center}
        .daddr{font-size:18px;font-weight:700;color:var(--brand-300);word-break:break-all;display:flex;align-items:center}
        .side-info{display:flex;flex-direction:column;gap:16px}
        .steps-list{list-style:none;counter-reset:s;display:grid;gap:12px;padding-left:0}
        .steps-list li{counter-increment:s;display:flex;gap:10px;font-size:13px;color:var(--text-dim);line-height:1.55}
        .steps-list li::before{content:counter(s);width:22px;height:22px;border-radius:50%;flex-shrink:0;background:var(--bg-2);border:1px solid var(--border);display:grid;place-items:center;font-size:11px;color:var(--brand-300);font-weight:700}
        .timeline{display:flex;flex-direction:column}
        .tl{display:grid;grid-template-columns:24px 1fr;gap:14px;padding-bottom:22px;position:relative}
        .tl:not(:last-child)::before{content:"";position:absolute;left:11px;top:24px;bottom:0;width:2px;background:var(--border)}
        .tl-dot{width:22px;height:22px;border-radius:50%;background:var(--surface-2);border:2px solid var(--border);position:relative;z-index:1;display:grid;place-items:center;font-size:10px;color:var(--text-muted)}
        .tl.done .tl-dot{background:#143626;border-color:#2a5f43;color:#6fdca1}
        .tl.active .tl-dot{background:var(--brand-300);border-color:transparent;color:#051210;box-shadow:0 0 0 6px #23bfb215}
        .tl.active .tl-dot::after{content:"";position:absolute;inset:-6px;border-radius:50%;border:2px solid var(--brand-300);animation:pulse 1.5s infinite}
        @keyframes pulse{0%{transform:scale(1);opacity:1}100%{transform:scale(1.6);opacity:0}}
        .tl-title{font-size:13.5px;font-weight:600;color:var(--text-dim)}
        .tl.done .tl-title{color:var(--text)}
        .tl.active .tl-title{color:var(--text)}
        .tl-sub{font-size:12px;color:var(--text-muted);margin-top:2px}
        @media (max-width:1020px){.trade-grid{grid-template-columns:1fr}.stepper{display:none}.trade-input{font-size:22px}}
      `}</style>
    </div>
  );
}

function ReviewRow({label,value,bold,highlight,mono,copy}){
  return (
    <div className={`review-row ${bold?'bold':''} ${highlight?'highlight':''}`}>
      <span>{label}</span>
      <span className={mono?'mono':''} style={{display:'inline-flex',alignItems:'center'}}>
        {value}{copy && <button className="copy-btn" title="Copy"><Copy size={12}/></button>}
      </span>
    </div>
  );
}

function TLItem({done,active,title,sub}){
  return (
    <div className={`tl ${done?'done':''} ${active?'active':''}`}>
      <div className="tl-dot">{done?<CheckCircle2 size={11}/>:active?'':''}</div>
      <div>
        <div className="tl-title">{title}</div>
        {sub && <div className="tl-sub">{sub}</div>}
      </div>
    </div>
  );
}
