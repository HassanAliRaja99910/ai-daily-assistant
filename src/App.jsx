import { useState, useEffect, useRef } from "react";

const FREE_LIMIT = 10;
const TABS = [
  { id: "planner", icon: "📅", label: "Planner" },
  { id: "study", icon: "📚", label: "Study" },
  { id: "expense", icon: "💸", label: "Budget" },
  { id: "content", icon: "🎥", label: "Creator" },
  { id: "wellness", icon: "🌱", label: "Wellness" },
];
const WELLNESS_QUOTES = [
  "You are capable of more than you know. Choose a goal that seems right for you and strive to be the best.",
  "The secret of getting ahead is getting started. Start now, not tomorrow.",
  "Your only limit is your mind. Push beyond it every single day.",
  "Small daily improvements lead to stunning results over time.",
  "Don't count the days — make the days count.",
  "Energy flows where attention goes. Focus on what matters.",
];
const FOCUS_DURATIONS = [5, 10, 15, 25, 30, 45, 60];

// ─── Ad Modal ─────────────────────────────────────────────────────────────────
function AdModal({ onClose, onUpgrade }) {
  const [countdown, setCountdown] = useState(5);
  const [adDone, setAdDone] = useState(false);
  useEffect(() => {
    if (countdown <= 0) { setAdDone(true); return; }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const ADS = [
    { emoji: "🛒", brand: "ShopNow", headline: "Mega Sale — Up to 70% OFF!", sub: "Limited time deals on top brands", bg: "linear-gradient(135deg,#1a0a2e,#2d1b5e)", accent: "#a78bfa" },
    { emoji: "📱", brand: "TechZone", headline: "New Smartphones — Best Prices", sub: "Free delivery on orders above ₹999", bg: "linear-gradient(135deg,#0a1f3c,#0d3a6e)", accent: "#60a5fa" },
    { emoji: "🍕", brand: "FoodExpress", headline: "Order Food in 20 Minutes!", sub: "First order FREE with code FIRST50", bg: "linear-gradient(135deg,#1f0a0a,#5e1b1b)", accent: "#f87171" },
  ];
  const [ad] = useState(() => ADS[Math.floor(Math.random() * ADS.length)]);

  return (
    <div style={{ position:"fixed", inset:0, zIndex:1000, background:"rgba(0,0,0,0.88)", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <div style={{ width:"100%", maxWidth:400, borderRadius:20, background:"#060d1a", border:"1px solid #1e3a5f", overflow:"hidden" }}>
        <div style={{ background:"#0f172a", padding:"8px 16px", display:"flex", justifyContent:"space-between" }}>
          <span style={{ fontSize:11, color:"#475569", fontFamily:"'Space Mono',monospace" }}>ADVERTISEMENT</span>
          <span style={{ fontSize:11, color:"#475569" }}>Sponsored</span>
        </div>
        <div style={{ background:ad.bg, padding:"36px 24px", display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center" }}>
          <div style={{ fontSize:58, marginBottom:12 }}>{ad.emoji}</div>
          <div style={{ fontSize:12, color:ad.accent, fontFamily:"'Space Mono',monospace", marginBottom:6 }}>{ad.brand}</div>
          <div style={{ fontSize:20, fontWeight:700, color:"#f1f5f9", marginBottom:8 }}>{ad.headline}</div>
          <div style={{ fontSize:14, color:"#94a3b8", marginBottom:20 }}>{ad.sub}</div>
          <button style={{ background:ad.accent, border:"none", borderRadius:10, padding:"10px 28px", color:"#0f172a", fontWeight:700, fontSize:14, cursor:"pointer" }}>Shop Now →</button>
        </div>
        <div style={{ padding:"18px 20px" }}>
          {!adDone ? (
            <div style={{ textAlign:"center" }}>
              <div style={{ fontSize:13, color:"#64748b", marginBottom:10 }}>
                Please wait — <span style={{ color:"#f97316", fontWeight:700 }}>{countdown}s</span> to continue free
              </div>
              <div style={{ width:"100%", height:5, background:"#1e293b", borderRadius:3, overflow:"hidden" }}>
                <div style={{ height:"100%", borderRadius:3, background:"#f97316", width:`${((5-countdown)/5)*100}%`, transition:"width 1s linear" }} />
              </div>
            </div>
          ) : (
            <button onClick={onClose} style={{ width:"100%", background:"linear-gradient(135deg,#22c55e,#16a34a)", border:"none", borderRadius:10, padding:13, color:"#fff", fontWeight:700, fontSize:14, cursor:"pointer" }}>
              ✓ Continue — {FREE_LIMIT} more prompts reset!
            </button>
          )}
          <div style={{ textAlign:"center", marginTop:12 }}>
            <button onClick={onUpgrade} style={{ background:"none", border:"none", color:"#f59e0b", fontSize:13, cursor:"pointer", textDecoration:"underline" }}>
              ⚡ Remove ads forever — Go Premium
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Premium Modal ────────────────────────────────────────────────────────────
function PremiumModal({ onClose, onActivate }) {
  const [selected, setSelected] = useState("yearly");
  const PLANS = [
    { id: "monthly", label: "Monthly", price: "$4.99", per: "/month", saving: null },
    { id: "yearly", label: "Yearly", price: "$29", per: "/year", saving: "BEST VALUE" },
  ];
  const PERKS = [
    { icon: "♾️", text: "Unlimited AI prompts daily" },
    { icon: "🚫", text: "Zero ads — ever" },
    { icon: "📊", text: "Smart spending reports" },
    { icon: "🎯", text: "Advanced content templates" },
    { icon: "⚡", text: "Priority AI responses" },
    { icon: "🔒", text: "Data backup & sync" },
  ];
  return (
    <div style={{ position:"fixed", inset:0, zIndex:1000, background:"rgba(0,0,0,0.92)", backdropFilter:"blur(10px)", display:"flex", alignItems:"center", justifyContent:"center", padding:20, overflowY:"auto" }}>
      <div style={{ width:"100%", maxWidth:400, borderRadius:20, background:"#060d1a", border:"1px solid #f59e0b55", overflow:"hidden" }}>
        <div style={{ background:"linear-gradient(135deg,#1c1100,#2d1f00)", padding:"28px 24px 20px", textAlign:"center", position:"relative" }}>
          <button onClick={onClose} style={{ position:"absolute", top:14, right:16, background:"none", border:"none", color:"#64748b", fontSize:22, cursor:"pointer" }}>×</button>
          <div style={{ fontSize:44, marginBottom:8 }}>⚡</div>
          <div style={{ fontSize:24, fontWeight:700, color:"#fbbf24" }}>Go Premium</div>
          <div style={{ fontSize:14, color:"#92400e", marginTop:4 }}>Unlock your full AI potential</div>
        </div>
        <div style={{ padding:"20px 24px 0" }}>
          <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:20 }}>
            {PERKS.map((p,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:12 }}>
                <span style={{ width:32, height:32, borderRadius:8, flexShrink:0, background:"#1a1000", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>{p.icon}</span>
                <span style={{ fontSize:14, color:"#e2e8f0" }}>{p.text}</span>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:10, marginBottom:16 }}>
            {PLANS.map(plan => (
              <button key={plan.id} onClick={() => setSelected(plan.id)} style={{ flex:1, padding:"14px 10px", borderRadius:12, cursor:"pointer", border:`2px solid ${selected===plan.id?"#f59e0b":"#1e3a5f"}`, background:selected===plan.id?"#1c1100":"#0f172a", textAlign:"center", position:"relative" }}>
                {plan.saving && <div style={{ position:"absolute", top:-10, left:"50%", transform:"translateX(-50%)", background:"#22c55e", color:"#fff", fontSize:9, fontWeight:700, padding:"2px 8px", borderRadius:20 }}>{plan.saving}</div>}
                <div style={{ fontSize:12, color:"#94a3b8", marginBottom:4 }}>{plan.label}</div>
                <div style={{ fontSize:22, fontWeight:700, color:"#fbbf24" }}>{plan.price}</div>
                <div style={{ fontSize:11, color:"#64748b" }}>{plan.per}</div>
              </button>
            ))}
          </div>
          <button onClick={() => { onActivate(); onClose(); }} style={{ width:"100%", background:"linear-gradient(135deg,#f59e0b,#d97706)", border:"none", borderRadius:12, padding:15, color:"#000", fontWeight:700, fontSize:15, cursor:"pointer", marginBottom:12 }}>
            ⚡ Start Premium — {selected==="monthly"?"$4.99/mo":"$29/yr"}
          </button>
          <div style={{ textAlign:"center", fontSize:11, color:"#475569", paddingBottom:20 }}>
            Cancel anytime • No hidden fees • Instant access
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Prompt Guard Hook ────────────────────────────────────────────────────────
function usePromptGuard() {
  const [promptsUsed, setPromptsUsed] = useState(0);
  const [isPremium, setIsPremium] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const [showPremium, setShowPremium] = useState(false);
  const pendingRef = useRef(null);

  async function guardedCall(fn) {
    if (isPremium) return fn();
    if (promptsUsed < FREE_LIMIT) { setPromptsUsed(p => p + 1); return fn(); }
    pendingRef.current = fn;
    setShowAd(true);
  }
  function onAdClose() {
    setShowAd(false);
    setPromptsUsed(1);
    if (pendingRef.current) { pendingRef.current(); pendingRef.current = null; }
  }
  function activatePremium() {
    setIsPremium(true);
    setShowPremium(false);
    if (pendingRef.current) { pendingRef.current(); pendingRef.current = null; }
  }
  return { promptsUsed, isPremium, showAd, showPremium, setShowPremium, guardedCall, onAdClose, activatePremium, remaining: Math.max(0, FREE_LIMIT - promptsUsed) };
}

// ─── Prompt Bar ───────────────────────────────────────────────────────────────
function PromptBar({ remaining, isPremium, onUpgrade }) {
  if (isPremium) return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, background:"#0d1f0a", border:"1px solid #22c55e44", borderRadius:10, padding:"8px 14px", marginBottom:14, fontSize:12, color:"#4ade80" }}>
      ⚡ Premium Active — Unlimited prompts · No Ads
    </div>
  );
  const pct = (remaining / FREE_LIMIT) * 100;
  const color = remaining > 5 ? "#22c55e" : remaining > 2 ? "#f59e0b" : "#ef4444";
  return (
    <div style={{ background:"#0f172a", border:"1px solid #1e3a5f", borderRadius:10, padding:"10px 14px", marginBottom:14 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
        <span style={{ fontSize:12, color:"#94a3b8" }}>
          Free prompts today: <span style={{ color, fontWeight:700 }}>{remaining}/{FREE_LIMIT}</span>
          {remaining === 0 && <span style={{ color:"#ef4444", marginLeft:6 }}>· Watch ad to continue</span>}
        </span>
        <button onClick={onUpgrade} style={{ background:"linear-gradient(135deg,#f59e0b,#d97706)", border:"none", borderRadius:6, padding:"3px 10px", color:"#000", fontSize:11, fontWeight:700, cursor:"pointer" }}>⚡ Upgrade</button>
      </div>
      <div style={{ height:4, background:"#1e293b", borderRadius:2, overflow:"hidden" }}>
        <div style={{ height:"100%", borderRadius:2, background:color, width:`${pct}%`, transition:"width 0.4s ease" }} />
      </div>
    </div>
  );
}

// ─── Claude API ───────────────────────────────────────────────────────────────
async function askClaude(systemPrompt, userMessage) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method:"POST", headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, system:systemPrompt, messages:[{role:"user",content:userMessage}] }),
  });
  const data = await res.json();
  return data.content?.[0]?.text || "No response.";
}

// ─── Planner Tab ──────────────────────────────────────────────────────────────
function PlannerTab({ guardedCall }) {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([
    { id:1, text:"Morning gym session", time:"7:00 PM", done:false, tag:"health" },
    { id:2, text:"Pay electricity bill", time:"Friday", done:false, tag:"finance" },
    { id:3, text:"Study Physics", time:"8:00 PM", done:false, tag:"study" },
  ]);
  const [loading, setLoading] = useState(false);
  const TAG_COLORS = { health:"#4ade80", finance:"#fbbf24", study:"#60a5fa", work:"#f472b6", personal:"#a78bfa", general:"#94a3b8" };

  async function handleAdd() {
    if (!input.trim()) return;
    const captured = input;
    await guardedCall(async () => {
      setLoading(true);
      try {
        const raw = await askClaude(`Parse the task and return ONLY JSON: "text" (task), "time" (when or empty), "tag" (health/finance/study/work/personal/general). No markdown.`, captured);
        let p; try { p = JSON.parse(raw.replace(/```json|```/g,"").trim()); } catch { p = {text:captured,time:"",tag:"general"}; }
        setTasks(prev => [...prev, {id:Date.now(),...p,done:false}]); setInput("");
      } catch { setTasks(prev => [...prev, {id:Date.now(),text:captured,time:"",tag:"general",done:false}]); setInput(""); }
      setLoading(false);
    });
  }

  return (
    <div>
      <div style={{ fontSize:12, color:"#94a3b8", marginBottom:8, fontFamily:"'Space Mono',monospace" }}>TYPE NATURALLY — AI ORGANIZES IT</div>
      <div style={{ display:"flex", gap:8, marginBottom:16 }}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleAdd()} placeholder='"remind me gym at 7pm" or "study maths friday"'
          style={{ flex:1, background:"#0f172a", border:"1px solid #1e3a5f", borderRadius:10, padding:"12px 16px", color:"#e2e8f0", fontSize:14, outline:"none", fontFamily:"inherit" }} />
        <button onClick={handleAdd} disabled={loading} style={{ background:loading?"#1e3a5f":"linear-gradient(135deg,#3b82f6,#6366f1)", border:"none", borderRadius:10, padding:"12px 20px", color:"#fff", cursor:"pointer", fontSize:18 }}>
          {loading?"⏳":"+"}
        </button>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {tasks.map(task => (
          <div key={task.id} style={{ background:task.done?"#0c1a2e":"#0f172a", border:`1px solid ${task.done?"#1e293b":"#1e3a5f"}`, borderRadius:12, padding:"14px 16px", display:"flex", alignItems:"center", gap:12, opacity:task.done?0.5:1 }}>
            <button onClick={()=>setTasks(p=>p.map(t=>t.id===task.id?{...t,done:!t.done}:t))} style={{ width:22, height:22, borderRadius:"50%", flexShrink:0, border:`2px solid ${task.done?"#4ade80":"#334155"}`, background:task.done?"#4ade80":"transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, color:"#0f172a" }}>{task.done?"✓":""}</button>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:15, color:"#e2e8f0", textDecoration:task.done?"line-through":"none" }}>{task.text}</div>
              {task.time&&<div style={{ fontSize:12, color:"#64748b", marginTop:2 }}>🕐 {task.time}</div>}
            </div>
            <span style={{ fontSize:11, padding:"3px 8px", borderRadius:20, background:`${TAG_COLORS[task.tag]||"#94a3b8"}22`, color:TAG_COLORS[task.tag]||"#94a3b8", border:`1px solid ${TAG_COLORS[task.tag]||"#94a3b8"}44` }}>{task.tag}</span>
            <button onClick={()=>setTasks(p=>p.filter(t=>t.id!==task.id))} style={{ background:"none", border:"none", color:"#334155", cursor:"pointer", fontSize:16 }}>×</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Study Tab ────────────────────────────────────────────────────────────────
function StudyTab({ guardedCall }) {
  const [mode, setMode] = useState("chat");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{role:"assistant",text:"Hi! I'm your AI study helper 📚 Ask me anything — homework, topics to explain, or generate MCQs!"}]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  useEffect(()=>{bottomRef.current?.scrollIntoView({behavior:"smooth"});},[messages]);
  const MODES = [{id:"chat",label:"💬 Ask"},{id:"mcq",label:"🧠 MCQ"},{id:"summarize",label:"📝 Summarize"}];
  const PROMPTS = { chat:"You are a friendly expert tutor. Explain clearly with examples.", mcq:"Generate 3 MCQs with options A-D and mark the correct answer.", summarize:"Create a concise bullet-point summary with key points." };

  async function handleSend() {
    if (!input.trim()||loading) return;
    const userMsg = input.trim(); setInput("");
    setMessages(prev=>[...prev,{role:"user",text:userMsg}]);
    await guardedCall(async () => {
      setLoading(true);
      try {
        const reply = await askClaude(PROMPTS[mode], mode==="mcq"?`MCQ quiz on: ${userMsg}`:mode==="summarize"?`Summarize: ${userMsg}`:userMsg);
        setMessages(prev=>[...prev,{role:"assistant",text:reply}]);
      } catch { setMessages(prev=>[...prev,{role:"assistant",text:"Error. Please try again."}]); }
      setLoading(false);
    });
  }

  return (
    <div style={{ display:"flex", flexDirection:"column" }}>
      <div style={{ display:"flex", gap:6, marginBottom:14 }}>
        {MODES.map(m=>(
          <button key={m.id} onClick={()=>setMode(m.id)} style={{ flex:1, padding:"8px 4px", borderRadius:8, fontSize:12, border:`1px solid ${mode===m.id?"#3b82f6":"#1e3a5f"}`, background:mode===m.id?"#1e3a5f":"#0a1628", color:mode===m.id?"#60a5fa":"#64748b", cursor:"pointer" }}>{m.label}</button>
        ))}
      </div>
      <div style={{ overflowY:"auto", display:"flex", flexDirection:"column", gap:12, marginBottom:14, maxHeight:300, paddingRight:4 }}>
        {messages.map((m,i)=>(
          <div key={i} style={{ alignSelf:m.role==="user"?"flex-end":"flex-start", maxWidth:"85%" }}>
            <div style={{ background:m.role==="user"?"linear-gradient(135deg,#3b82f6,#6366f1)":"#0f172a", border:m.role==="assistant"?"1px solid #1e3a5f":"none", borderRadius:m.role==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px", padding:"10px 14px", color:"#e2e8f0", fontSize:14, lineHeight:1.6, whiteSpace:"pre-wrap" }}>{m.text}</div>
          </div>
        ))}
        {loading&&<div style={{alignSelf:"flex-start"}}><div style={{background:"#0f172a",border:"1px solid #1e3a5f",borderRadius:"18px 18px 18px 4px",padding:"10px 16px",color:"#64748b",fontSize:14}}>Thinking... ✨</div></div>}
        <div ref={bottomRef}/>
      </div>
      <div style={{ display:"flex", gap:8 }}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleSend()} placeholder={mode==="mcq"?"Topic for quiz...":mode==="summarize"?"Paste notes...":"Ask any question..."}
          style={{ flex:1, background:"#0f172a", border:"1px solid #1e3a5f", borderRadius:10, padding:"12px 16px", color:"#e2e8f0", fontSize:14, outline:"none", fontFamily:"inherit" }} />
        <button onClick={handleSend} disabled={loading} style={{ background:"linear-gradient(135deg,#3b82f6,#6366f1)", border:"none", borderRadius:10, padding:"12px 18px", color:"#fff", cursor:"pointer", fontSize:16 }}>→</button>
      </div>
    </div>
  );
}

// ─── Expense Tab ──────────────────────────────────────────────────────────────
function ExpenseTab({ guardedCall }) {
  const [input, setInput] = useState("");
  const [expenses, setExpenses] = useState([
    {id:1,label:"Food",amount:2000,category:"food"},
    {id:2,label:"Petrol",amount:3000,category:"transport"},
    {id:3,label:"Bills",amount:5000,category:"utilities"},
  ]);
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [advLoading, setAdvLoading] = useState(false);
  const CAT = { food:{color:"#f97316",icon:"🍔"}, transport:{color:"#3b82f6",icon:"🚗"}, utilities:{color:"#8b5cf6",icon:"⚡"}, entertainment:{color:"#ec4899",icon:"🎮"}, shopping:{color:"#eab308",icon:"🛍️"}, health:{color:"#22c55e",icon:"💊"}, other:{color:"#64748b",icon:"📦"} };
  const total = expenses.reduce((s,e)=>s+e.amount,0);

  async function handleAdd() {
    if (!input.trim()) return;
    const cap = input;
    await guardedCall(async()=>{
      setLoading(true);
      try {
        const raw = await askClaude(`Parse expense. Return ONLY JSON: "label","amount"(number),"category"(food/transport/utilities/entertainment/shopping/health/other). No markdown.`,cap);
        let p; try{p=JSON.parse(raw.replace(/```json|```/g,"").trim());}catch{p={label:cap,amount:0,category:"other"};}
        setExpenses(prev=>[...prev,{id:Date.now(),...p}]); setInput("");
      }catch{setInput("");}
      setLoading(false);
    });
  }

  async function getAdvice() {
    await guardedCall(async()=>{
      setAdvLoading(true);
      try {
        const reply = await askClaude("You are a finance advisor. Give 3 specific actionable money-saving tips. Be concise.",`Expenses: ${expenses.map(e=>`${e.label}:${e.amount}`).join(", ")}. Total:${total}.`);
        setAdvice(reply);
      }catch{setAdvice("Could not get advice.");}
      setAdvLoading(false);
    });
  }

  return (
    <div>
      <div style={{ display:"flex", gap:8, marginBottom:14 }}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleAdd()} placeholder='"food 2000" or "netflix 500"'
          style={{ flex:1, background:"#0f172a", border:"1px solid #1e3a5f", borderRadius:10, padding:"12px 16px", color:"#e2e8f0", fontSize:14, outline:"none", fontFamily:"inherit" }} />
        <button onClick={handleAdd} disabled={loading} style={{ background:"linear-gradient(135deg,#f97316,#ef4444)", border:"none", borderRadius:10, padding:"12px 18px", color:"#fff", cursor:"pointer", fontSize:16 }}>{loading?"⏳":"+"}</button>
      </div>
      <div style={{ background:"linear-gradient(135deg,#0f172a,#0a1628)", border:"1px solid #1e3a5f", borderRadius:14, padding:"16px 20px", marginBottom:14, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <div style={{ fontSize:12, color:"#64748b", fontFamily:"'Space Mono',monospace" }}>TOTAL SPENDING</div>
          <div style={{ fontSize:28, fontWeight:700, color:"#f97316", marginTop:4 }}>₹{total.toLocaleString()}</div>
        </div>
        <div style={{ fontSize:11, color:"#475569" }}>{expenses.length} items</div>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:14 }}>
        {expenses.map(exp=>(
          <div key={exp.id} style={{ display:"flex", alignItems:"center", gap:12, background:"#0f172a", border:"1px solid #1e3a5f", borderRadius:10, padding:"10px 14px" }}>
            <span style={{ width:36, height:36, borderRadius:10, flexShrink:0, background:`${CAT[exp.category]?.color||"#64748b"}22`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>{CAT[exp.category]?.icon||"📦"}</span>
            <div style={{ flex:1 }}><div style={{ fontSize:14, color:"#e2e8f0" }}>{exp.label}</div><div style={{ fontSize:11, color:"#475569", textTransform:"capitalize" }}>{exp.category}</div></div>
            <div style={{ fontSize:15, color:"#f97316", fontWeight:600 }}>₹{exp.amount.toLocaleString()}</div>
            <button onClick={()=>setExpenses(p=>p.filter(e=>e.id!==exp.id))} style={{ background:"none", border:"none", color:"#334155", cursor:"pointer", fontSize:16 }}>×</button>
          </div>
        ))}
      </div>
      <button onClick={getAdvice} disabled={advLoading} style={{ width:"100%", background:"linear-gradient(135deg,#f97316,#ef4444)", border:"none", borderRadius:10, padding:12, color:"#fff", cursor:"pointer", fontSize:14, fontWeight:600, marginBottom:advice?12:0 }}>
        {advLoading?"Analyzing... 🔍":"💡 Get AI Savings Advice"}
      </button>
      {advice&&<div style={{ background:"#0f172a", border:"1px solid #f9731644", borderRadius:12, padding:16, color:"#fde68a", fontSize:13, lineHeight:1.7, whiteSpace:"pre-wrap" }}><div style={{ fontSize:11, color:"#f97316", marginBottom:8, fontFamily:"'Space Mono',monospace" }}>AI ADVICE</div>{advice}</div>}
    </div>
  );
}

// ─── Content Tab ──────────────────────────────────────────────────────────────
function ContentTab({ guardedCall }) {
  const [platform, setPlatform] = useState("tiktok");
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const PLATFORMS = [{id:"tiktok",label:"TikTok",icon:"🎵"},{id:"youtube",label:"YouTube",icon:"▶️"},{id:"instagram",label:"Instagram",icon:"📸"},{id:"product",label:"Product",icon:"🛒"},{id:"adcopy",label:"Ad Copy",icon:"📢"}];
  const PROMPTS = { tiktok:"Generate 5 viral TikTok captions with emojis and hashtags.", youtube:"Generate 5 compelling YouTube titles with power words.", instagram:"Write Instagram caption with emojis plus 20 hashtags.", product:"Write a persuasive 50-word product description.", adcopy:"Write 3 ad copy variations under 30 words each. Hook, benefit, CTA." };

  async function generate() {
    if (!topic.trim()||loading) return;
    const cap = topic;
    await guardedCall(async()=>{
      setLoading(true); setResult("");
      try { const reply = await askClaude(PROMPTS[platform],cap); setResult(reply); }
      catch { setResult("Generation failed. Try again."); }
      setLoading(false);
    });
  }

  return (
    <div>
      <div style={{ display:"flex", gap:6, marginBottom:14, flexWrap:"wrap" }}>
        {PLATFORMS.map(p=>(
          <button key={p.id} onClick={()=>setPlatform(p.id)} style={{ flex:"1 1 auto", minWidth:55, padding:"8px 4px", borderRadius:8, fontSize:11, border:`1px solid ${platform===p.id?"#ec4899":"#1e3a5f"}`, background:platform===p.id?"#1a0d18":"#0a1628", color:platform===p.id?"#f472b6":"#64748b", cursor:"pointer" }}>
            {p.icon} {p.label}
          </button>
        ))}
      </div>
      <input value={topic} onChange={e=>setTopic(e.target.value)} onKeyDown={e=>e.key==="Enter"&&generate()} placeholder="Enter your topic or niche..."
        style={{ width:"100%", background:"#0f172a", border:"1px solid #1e3a5f", borderRadius:10, padding:"12px 16px", color:"#e2e8f0", fontSize:14, outline:"none", fontFamily:"inherit", boxSizing:"border-box", marginBottom:12 }} />
      <button onClick={generate} disabled={loading} style={{ width:"100%", background:"linear-gradient(135deg,#ec4899,#8b5cf6)", border:"none", borderRadius:10, padding:13, color:"#fff", cursor:"pointer", fontSize:14, fontWeight:600, marginBottom:result?12:0 }}>
        {loading?"✨ Generating...":`🚀 Generate ${PLATFORMS.find(p=>p.id===platform)?.label} Content`}
      </button>
      {result&&(
        <div style={{ background:"#0f172a", border:"1px solid #ec489944", borderRadius:12, padding:16 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
            <div style={{ fontSize:11, color:"#ec4899", fontFamily:"'Space Mono',monospace" }}>GENERATED</div>
            <button onClick={()=>{navigator.clipboard.writeText(result);setCopied(true);setTimeout(()=>setCopied(false),2000);}} style={{ background:copied?"#22c55e22":"#ec489922", border:`1px solid ${copied?"#22c55e":"#ec4899"}`, borderRadius:6, padding:"4px 10px", color:copied?"#22c55e":"#ec4899", cursor:"pointer", fontSize:12 }}>{copied?"✓ Copied!":"Copy"}</button>
          </div>
          <div style={{ color:"#e2e8f0", fontSize:13, lineHeight:1.8, whiteSpace:"pre-wrap" }}>{result}</div>
        </div>
      )}
    </div>
  );
}

// ─── Wellness Tab ─────────────────────────────────────────────────────────────
function WellnessTab() {
  const [quote] = useState(()=>WELLNESS_QUOTES[Math.floor(Math.random()*WELLNESS_QUOTES.length)]);
  const [focusDur, setFocusDur] = useState(25);
  const [timeLeft, setTimeLeft] = useState(null);
  const [running, setRunning] = useState(false);
  const [habits, setHabits] = useState([
    {id:1,label:"Morning walk",streak:5,done:false},
    {id:2,label:"Read 20 mins",streak:3,done:false},
    {id:3,label:"Drink 8 glasses of water",streak:7,done:true},
    {id:4,label:"No social media before 10am",streak:2,done:false},
  ]);
  const [newHabit, setNewHabit] = useState("");
  const timerRef = useRef(null);
  function startTimer() { if(running){clearInterval(timerRef.current);setRunning(false);setTimeLeft(null);return;} setTimeLeft(focusDur*60);setRunning(true); }
  useEffect(()=>{ if(running&&timeLeft!==null){ timerRef.current=setInterval(()=>setTimeLeft(p=>{if(p<=1){clearInterval(timerRef.current);setRunning(false);return 0;}return p-1;}),1000); } return()=>clearInterval(timerRef.current); },[running]);
  const mins=timeLeft!==null?Math.floor(timeLeft/60):focusDur;
  const secs=timeLeft!==null?timeLeft%60:0;
  const progress=timeLeft!==null?((focusDur*60-timeLeft)/(focusDur*60))*100:0;

  return (
    <div>
      <div style={{ background:"linear-gradient(135deg,#0d1f3c,#0a1628)", border:"1px solid #1e3a5f", borderRadius:14, padding:20, marginBottom:20, textAlign:"center" }}>
        <div style={{ fontSize:11, color:"#60a5fa", fontFamily:"'Space Mono',monospace", marginBottom:10 }}>💫 DAILY MOTIVATION</div>
        <div style={{ fontSize:14, color:"#e2e8f0", lineHeight:1.7, fontStyle:"italic" }}>"{quote}"</div>
      </div>
      <div style={{ marginBottom:20 }}>
        <div style={{ fontSize:12, color:"#94a3b8", fontFamily:"'Space Mono',monospace", marginBottom:10 }}>⏱ FOCUS TIMER</div>
        <div style={{ display:"flex", gap:5, marginBottom:14, flexWrap:"wrap" }}>
          {FOCUS_DURATIONS.map(d=>(
            <button key={d} onClick={()=>{setFocusDur(d);setTimeLeft(null);setRunning(false);clearInterval(timerRef.current);}} style={{ flex:"1 1 auto", padding:"7px 4px", borderRadius:8, fontSize:12, border:`1px solid ${focusDur===d?"#22c55e":"#1e3a5f"}`, background:focusDur===d?"#0d2818":"#0a1628", color:focusDur===d?"#4ade80":"#64748b", cursor:"pointer" }}>{d}m</button>
          ))}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
          <div style={{ position:"relative", width:80, height:80, flexShrink:0 }}>
            <svg viewBox="0 0 80 80" width="80" height="80" style={{ transform:"rotate(-90deg)" }}>
              <circle cx="40" cy="40" r="34" fill="none" stroke="#1e293b" strokeWidth="6"/>
              <circle cx="40" cy="40" r="34" fill="none" stroke={running?"#22c55e":"#3b82f6"} strokeWidth="6" strokeDasharray={`${2*Math.PI*34}`} strokeDashoffset={`${2*Math.PI*34*(1-progress/100)}`} strokeLinecap="round" style={{transition:"stroke-dashoffset 1s linear"}}/>
            </svg>
            <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <div style={{ fontSize:14, fontWeight:700, color:"#e2e8f0", fontFamily:"'Space Mono',monospace" }}>{String(mins).padStart(2,"0")}:{String(secs).padStart(2,"0")}</div>
            </div>
          </div>
          <button onClick={startTimer} style={{ flex:1, background:running?"linear-gradient(135deg,#ef4444,#dc2626)":"linear-gradient(135deg,#22c55e,#16a34a)", border:"none", borderRadius:10, padding:13, color:"#fff", cursor:"pointer", fontSize:14, fontWeight:600 }}>{running?"⏹ Stop":"▶ Start Focus"}</button>
        </div>
      </div>
      <div>
        <div style={{ fontSize:12, color:"#94a3b8", fontFamily:"'Space Mono',monospace", marginBottom:10 }}>🔥 HABIT STREAKS</div>
        <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:10 }}>
          {habits.map(h=>(
            <div key={h.id} style={{ display:"flex", alignItems:"center", gap:12, background:"#0f172a", border:`1px solid ${h.done?"#22c55e44":"#1e3a5f"}`, borderRadius:10, padding:"10px 14px" }}>
              <button onClick={()=>setHabits(p=>p.map(x=>x.id===h.id?{...x,done:!x.done,streak:!x.done?x.streak+1:x.streak}:x))} style={{ width:22, height:22, borderRadius:"50%", flexShrink:0, border:`2px solid ${h.done?"#4ade80":"#334155"}`, background:h.done?"#4ade80":"transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, color:"#0f172a" }}>{h.done?"✓":""}</button>
              <div style={{ flex:1, fontSize:14, color:h.done?"#4ade80":"#e2e8f0" }}>{h.label}</div>
              <div style={{ fontSize:12, color:"#f97316" }}>🔥 {h.streak}</div>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <input value={newHabit} onChange={e=>setNewHabit(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&newHabit.trim()){setHabits(p=>[...p,{id:Date.now(),label:newHabit.trim(),streak:0,done:false}]);setNewHabit("");}}} placeholder="Add new habit..."
            style={{ flex:1, background:"#0f172a", border:"1px solid #1e3a5f", borderRadius:10, padding:"10px 14px", color:"#e2e8f0", fontSize:13, outline:"none", fontFamily:"inherit" }} />
          <button onClick={()=>{if(newHabit.trim()){setHabits(p=>[...p,{id:Date.now(),label:newHabit.trim(),streak:0,done:false}]);setNewHabit("");}}} style={{ background:"linear-gradient(135deg,#22c55e,#16a34a)", border:"none", borderRadius:10, padding:"10px 16px", color:"#fff", cursor:"pointer", fontSize:16 }}>+</button>
        </div>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState("planner");
  const [greeting, setGreeting] = useState("");
  const { promptsUsed, isPremium, showAd, showPremium, setShowPremium, guardedCall, onAdClose, activatePremium, remaining } = usePromptGuard();

  useEffect(()=>{ const h=new Date().getHours(); setGreeting(h<12?"Good morning":h<17?"Good afternoon":"Good evening"); },[]);

  const tp = { guardedCall };
  const TABS_CONTENT = { planner:<PlannerTab {...tp}/>, study:<StudyTab {...tp}/>, expense:<ExpenseTab {...tp}/>, content:<ContentTab {...tp}/>, wellness:<WellnessTab/> };

  return (
    <div style={{ minHeight:"100vh", background:"radial-gradient(ellipse at 20% 0%,#0d2137 0%,#060d1a 60%)", fontFamily:"'DM Sans','Segoe UI',sans-serif", color:"#e2e8f0", display:"flex", flexDirection:"column", alignItems:"center", padding:"0 0 80px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
        *{box-sizing:border-box;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-thumb{background:#1e3a5f;border-radius:2px;}
        input,textarea{font-family:'DM Sans',sans-serif!important;}
      `}</style>

      {showAd && <AdModal onClose={onAdClose} onUpgrade={()=>{setShowPremium(true);}} />}
      {showPremium && <PremiumModal onClose={()=>setShowPremium(false)} onActivate={activatePremium} />}

      {/* Header */}
      <div style={{ width:"100%", maxWidth:480, background:"linear-gradient(180deg,#060d1a 0%,transparent 100%)", padding:"24px 20px 12px", position:"sticky", top:0, zIndex:10, backdropFilter:"blur(20px)" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
          <div>
            <div style={{ fontSize:13, color:"#475569", fontFamily:"'Space Mono',monospace" }}>{greeting} 👋</div>
            <div style={{ fontSize:22, fontWeight:700, marginTop:2 }}>AI Daily Assistant</div>
          </div>
          {isPremium
            ? <div style={{ background:"linear-gradient(135deg,#f59e0b,#d97706)", borderRadius:12, padding:"6px 12px", fontSize:11, fontWeight:700, color:"#000" }}>⚡ PREMIUM</div>
            : <button onClick={()=>setShowPremium(true)} style={{ background:"linear-gradient(135deg,#1c1100,#2d1f00)", border:"1px solid #f59e0b55", borderRadius:12, padding:"6px 12px", fontSize:11, fontWeight:600, color:"#f59e0b", cursor:"pointer" }}>⚡ Upgrade</button>
          }
        </div>
        <PromptBar remaining={remaining} isPremium={isPremium} onUpgrade={()=>setShowPremium(true)} />
      </div>

      {/* Content */}
      <div style={{ width:"100%", maxWidth:480, padding:"0 20px", flex:1 }}>
        {TABS_CONTENT[activeTab]}
      </div>

      {/* Bottom Nav */}
      <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:480, background:"rgba(6,13,26,0.96)", backdropFilter:"blur(20px)", borderTop:"1px solid #0f2040", padding:"10px 8px 14px", display:"flex", justifyContent:"space-around", zIndex:100 }}>
        {TABS.map(tab=>(
          <button key={tab.id} onClick={()=>setActiveTab(tab.id)} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:4, padding:"6px 10px", borderRadius:10, opacity:activeTab===tab.id?1:0.45 }}>
            <div style={{ fontSize:22, filter:activeTab===tab.id?"drop-shadow(0 0 8px rgba(96,165,250,0.8))":"none", transform:activeTab===tab.id?"scale(1.15)":"scale(1)", transition:"all 0.2s" }}>{tab.icon}</div>
            <div style={{ fontSize:10, fontWeight:600, color:activeTab===tab.id?"#60a5fa":"#475569", fontFamily:"'Space Mono',monospace" }}>{tab.label.toUpperCase()}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
