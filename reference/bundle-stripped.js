(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();const B={aboutBio:["I am a Software Engineer and AI Solutions Developer, PRC Registered Electronics Engineer (Lic. #83920) and Electronics Technician (Lic. #31662), DataCamp Certified AI Engineer Associate and Data Analyst Associate, with formal PMP exam preparation (35 contact hours) and DOLE Safety Officer 2 credentials.","My core focus is full-stack software development (TypeScript, Python, Next.js 16 App Router, React 19, Cloudflare Workers/D1, Prisma ORM 6.x), autonomous agentic workflows (Claude Code, Google Antigravity, n8n), multi-model LLM orchestration (Google Gemini, Claude, DeepSeek), and real-time edge vision pipelines (Avigilon Unity AI, RTSP/ONVIF streams, embedded Linux).","At REYBIN INC, I served as Lead Site Engineer for the airside apron surveillance installation at NAIA Terminal 3 (Bay 101 to 131) for the Manila International Airport Authority (MIAA), leading the technical deployment of 28 AI-enabled CCTV nodes, 128TB RAID-6 storage, and 3.5 km fiber backbones, while architecting OmniSight PM (Next.js 16, React 19, Prisma SQLite) and automated diagnostic telemetry with a flawless zero-accident record."]},E={now:[{role:"Software & AI Solutions Developer / Lead Systems Engineer",org:"REYBIN INC",when:"2026 — Present (Full-Time)",note:"Delivered the NAIA Terminal 3 airside CCTV installation across 28 AI camera nodes and 3.5 km fiber with zero safety incidents. Architected OmniSight PM ERP (Next.js 16, React 19, Prisma SQLite) and automated diagnostic telemetry daemons, cutting manual troubleshooting by >40%."},{role:"Full-Stack Software & AI Developer",org:"Independent · EmmanAlcazarJr.com",when:"2025 — Present",note:"Engineered production RAG pipelines with 99.4% cited faithfulness across 15 benchmark suites, autonomous Telegram agents (RushDailyBot) with sub-400ms turnaround, and cross-platform board exam prep applications (Sure Win) serving 127 syllabus topics."}],past:[{role:"Engineering Intern · Power & Development Department",org:"JG Summit Olefins Corporation",when:"2024",note:"Safeguarded petrochemical continuous plant operations by executing Megger insulation resistance diagnostics, dielectric stability analysis, and preventive maintenance on high/medium-voltage substation units under strict electrical LOTO safety standards."},{role:"BS Electronics Engineering (BSECE)",org:"University of Santo Tomas – Legazpi",when:"2021 — 2025",note:"Graduated 2025; passed PRC national board exams for both Electronics Engineer (ECE Rating: 79.80%) and Electronics Technician (ECT Rating: 72.00%) in December 2025."}]},N=[{n:"99.4%",label:"RAG benchmark accuracy"},{n:"Sub-320ms",label:"Edge vision AI extraction"},{n:"28",label:"Avigilon cameras commissioned"},{n:"3.5k m",label:"12-core fiber backbone"},{n:"2",label:"PRC Board Licenses (ECE & ECT)"},{n:"0",label:"Accidents (DOLE SO2 certified)"}],G={eyebrow:"Learning in public",topic:"n8n",title:"Workflow automation practice log",line:"Chapter 1 of DataCamp's Intermediate Workflow Automation with n8n: webhooks, validation, workflow-to-workflow calls and schedules. 7 of 7 practice exercises passed, 25% of the course.",pill:"Practice exercises · Oct 2026",video:"/vids/n8n-progress.mp4",poster:"/vids/posters/n8n-progress.webp",captions:"/vids/n8n-progress.en.vtt",videoLabel:"Narrated screen recording, about one minute: seven n8n practice exercises from webhooks to scheduled workflows. English captions available."},F=[{id:"specula",name:"Specula",category:"Multimodal Vision",meta:"Multimodal Vision · 2026",cardMetric:"Shutterless camera scan · live Excel sheet",impactSummary:"Turns receipt data entry into holding a receipt up to a camera. Specula captures on its own when the frame is steady and sharp, reads it with Gemini, and adds a row to a live spreadsheet that downloads as Excel, so paper never has to be typed in again.",desc:"A receipt scanner that skips the shutter button. Live camera mode works on a phone or a laptop webcam: an on-device gate captures only steady, in-focus, new frames, so every model call counts. Gemini reads the merchant, line items, tax and total into schema-validated JSON in about 3 seconds, and each receipt lands in a live, editable sheet with .xlsx export. Scan a pairing QR with your phone and its scans appear on the laptop's sheet within seconds, on any network.",metric:"Shutterless live capture · ~3s receipt read · Live sheet → .xlsx · QR phone-to-laptop pairing",metricsList:[{val:"0 taps",label:"Shutterless auto-capture"},{val:"~3s",label:"Receipt read time"},{val:".xlsx",label:"Live sheet, Excel export"},{val:"QR",label:"Phone-to-laptop pairing"}],tags:["Gemini Multimodal","Cloudflare Workers","D1","TypeScript","React","WebRTC Camera","JSON Schema","Remotion"],image:"/img/specula-inspector.jpg",video:"/vids/specula-demo.mp4",poster:"/vids/posters/specula-demo.jpg",scene:"/img/scenes/specula.webp",sceneAlt:"Field engineer in a hi-vis vest pointing a phone at a motor nameplate; the screen lists the extracted fields",live:"https://specula.emmanalcazarjr.com"},{id:"rag",name:"RAG Knowledge Assistant",category:"Applied GenAI",meta:"Applied GenAI · 2026",cardMetric:"99.4% cited accuracy · 15 evals",impactSummary:"Eliminated hallucination in engineering doc search, achieving 99.4% faithfulness across 15 benchmark suites with verifiable source page citations, lowering support query resolution time.",desc:"Retrieval pipeline that answers from engineering documentation instead of guessing: semantic chunking, FAISS dense search, cross-encoder reranking, and answers that cite the page they came from. Evaluated across 15 benchmarks for recall@k, faithfulness, and latency.",metric:"99.4% citation faithfulness · Semantic chunking → FAISS → cross-encoder rerank",metricsList:[{val:"99.4%",label:"Citation faithfulness"},{val:"15",label:"Benchmark evaluation suites"},{val:"FAISS",label:"Dense semantic indexing"},{val:"0",label:"Unverified hallucinations"}],tags:["FAISS","Python","Gemini AI","LangChain","Cross-Encoder","Remotion"],image:"/img/rag-knowledge-assistant.jpg",video:"/vids/rag-demo.mp4",poster:"/vids/posters/rag-demo.jpg",scene:"/img/scenes/rag.webp",sceneAlt:"Engineer's bench with a laptop answering from the manual, the open manual full of sticky tabs, and a torque wrench"},{id:"rushdailybot",name:"RushDailyBot",category:"Autonomous AI Agent",meta:"Autonomous Agent · 2026",cardMetric:"Sub-400ms voice · 24/7 briefing",impactSummary:"Automated morning priority digests and voice memo triage, cutting daily executive context-switching time with sub-400ms Telegram voice responses and continuous n8n webhook sync.",desc:"A 24/7 personal executive assistant on Telegram. Handles morning briefings, parses voice memos and links with Gemini, tracks daily priorities into Obsidian, and digests market setups.",metric:"Sub-400ms response · 24/7 cron dispatch · n8n webhook sync · Supabase memory",metricsList:[{val:"Sub-400ms",label:"Voice memo response"},{val:"24/7",label:"Automated cron dispatch"},{val:"n8n + Webhook",label:"Obsidian digest sync"},{val:"Supabase",label:"Persistent state memory"}],tags:["Telegram API","Gemini AI","n8n","Python","Supabase","Remotion"],image:"/img/rushdailybot-qr.jpg",video:"/vids/rushdaily-demo.mp4",poster:"/vids/posters/rushdaily-demo.jpg",scene:"/img/scenes/rushdailybot.webp",sceneAlt:"Phone showing the morning brief on a kitchen counter beside a steaming cup of coffee at sunrise",live:"https://t.me/RushDailyBot",repo:"https://github.com/emmanalcazarjr-ops/personal-assistant-bot"},{id:"reybineye",name:"ReybinEye PM",category:"CCTV Infrastructure",meta:"CCTV Infrastructure · 2026",cardMetric:"40%+ inspection time cut · 28 nodes",impactSummary:"Reduced site inspection and diagnostic overhead by over 40% across 28 live surveillance camera nodes with automated checklist verification, BOM inventory tracking, and simulated device RTSP telemetry.",desc:"Systems integration and project management platform for mission-critical CCTV deployments: milestone tracking, automated site inspection checklists, BOM inventory allocation, and simulated device telemetry (FPS, bitrate, RTSP health). Demo sanitized for confidentiality.",metric:"40%+ inspection time cut · 28 nodes tracked · 100% synthetic demo · NDA compliant",metricsList:[{val:"40%+",label:"Inspection time cut"},{val:"28",label:"Live CCTV nodes online"},{val:"30 FPS",label:"RTSP real-time stream"},{val:"100%",label:"Confidential synthetic demo"}],tags:["React","TypeScript","Systems Integration","RTSP / ONVIF","Remotion"],image:"/img/reybineye-telemetry.jpg",video:"/vids/reybineye-demo.mp4",poster:"/vids/posters/reybineye-demo.jpg",scene:"/img/scenes/reybineye.webp",sceneAlt:"Technician in a reflective vest checking an inspection list on a tablet in front of an apron CCTV wall at night",live:"https://emmanalcazarjr.com/reybineye"},{id:"rush-voice",name:"Rush Voice Butler",category:"On-Device Voice AI",meta:"On-Device Voice AI · 2025",cardMetric:"100% speech privacy · <280ms latency",impactSummary:"Delivered 100% private, zero-cloud speech processing directly on edge Raspberry Pi 4 hardware, operating reliably without external API dependencies or data leakage risks.",desc:"Always-listening voice butler running fully on-device: Vosk STT + Piper neural TTS, Spotify Connect, and a Telegram & n8n bridge. 100% on-device speech privacy.",metric:"100% speech privacy · 99.9% local uptime · <280ms local speech pipeline",metricsList:[{val:"100%",label:"On-device speech privacy"},{val:"<280ms",label:"Local pipeline latency"},{val:"99.9%",label:"Local hardware uptime"},{val:"0 packets",label:"Zero audio sent to cloud"}],tags:["Raspberry Pi","Vosk STT","Piper TTS","n8n","MQTT","Remotion"],image:"/img/rush-voice-console.jpg",video:"/vids/rushvoice-demo.mp4",poster:"/vids/posters/rushvoice-demo.jpg",scene:"/img/scenes/rush-voice.webp",sceneAlt:"Raspberry Pi in a clear case with a microphone and speaker on a bookshelf under a dimmed desk lamp"},{id:"emmanpi",name:"emman.pi",category:"Edge-Native 3D",meta:"3D WebGL & Edge · 2026",cardMetric:"100% WebGL 3D · Cloudflare KV",impactSummary:"Built a fully procedural 3D digital-twin PCB portfolio rendering at 60 FPS in WebGL, integrated with edge-cached state and prompt-injection guarded Gemini butler.",desc:"An interactive 3D Raspberry Pi 5 portfolio built from scratch with React Three Fiber, backed by Cloudflare Pages Functions for a Gemini AI butler with prompt-injection guards, KV persistence, and bearer-authenticated webhooks from Telegram and n8n.",metric:"100% procedural 3D · 60 FPS WebGL · Edge Functions + KV · Prompt injection guards",metricsList:[{val:"60 FPS",label:"Hardware WebGL render"},{val:"<0.4ms",label:"Cloudflare KV edge cache"},{val:"R3F",label:"Procedural PCB geometry"},{val:"Multi-tier",label:"Prompt injection shield"}],tags:["React 19","Three.js / R3F","Cloudflare","Gemini AI","TypeScript","Remotion"],image:"/img/avigilon-h5a-ptz.jpg",video:"/vids/emmanpi-demo.mp4",poster:"/vids/posters/emmanpi-demo.jpg",scene:"/img/scenes/emmanpi.webp",sceneAlt:"Laptop rendering a 3D Raspberry Pi 5 with the real board on the desk in front of it",live:"https://pi.emmanalcazarjr.com",repo:"https://github.com/emmanalcazarjr-ops/portfolio"},{id:"bridgely",name:"Bridgely",category:"Polyglot Systems",meta:"Polyglot Systems · 2026",cardMetric:"10-stage fanout · 4 microservices",impactSummary:"Engineered polyglot orchestrator connecting NestJS, DeepSeek AI, Cloudflare D1, MongoDB, and PHP 8.2 compliance export, achieving seamless cross-stack interoperability.",desc:"Recruiter intake that fans one submission across four services: a Nest.js orchestrator writes identity to Cloudflare D1, DeepSeek builds a structured skills matrix, MongoDB files the evaluation, and a PHP 8.2 service round-trips it as compliance XML.",metric:"10-step orchestration across 4 services · D1 + MongoDB + legacy XML compliance",metricsList:[{val:"10-Step",label:"Cross-service fanout"},{val:"4",label:"Microservices orchestrated"},{val:"100%",label:"XML schema compliance"},{val:"Zero loss",label:"D1 & MongoDB dual storage"}],tags:["Next.js 14","Nest.js 10","Cloudflare D1","MongoDB 7","DeepSeek","PHP 8.2","Remotion"],image:"/img/bridgely-intake.jpg",video:"/vids/bridgely-demo.mp4",poster:"/vids/posters/bridgely-demo.jpg",scene:"/img/scenes/bridgely.webp",sceneAlt:"Recruiter in a Manila office reviewing a candidate pipeline and skills matrix on a large monitor",live:"https://bridgely.emmanalcazarjr.com"},{id:"evalgate",name:"EvalGate",category:"LLM Evaluation CI",meta:"LLM Evaluation CI · 2026",cardMetric:"0.90 min gate · 10-case suite",impactSummary:"Prevented silent prompt regressions from reaching production by gating every system prompt edit against a deterministic 10-case evaluation suite (regex, exact label, and keyword contracts) with sub-2ms local verification.",desc:"Prompt regression harness that gates every system prompt change against a fixed case set before deployment. Runs side-by-side Baseline vs. Candidate prompt diffs, enforces a strict minimum pass threshold (min = 0.90), and blocks CI builds when previously passing assertions regress.",metric:"0.90 min pass threshold · Prompt A/B regression diff · Zero-dependency TypeScript & Web Workbench",metricsList:[{val:"0.90",label:"Minimum CI gate threshold"},{val:"10",label:"Deterministic contract cases"},{val:"A vs. B",label:"Side-by-side prompt diffing"},{val:"0 deps",label:"Native Node 24 TypeScript"}],tags:["TypeScript","Node.js 24","Gemini API","LLM Evals","CI/CD Gate","Remotion"],image:"/img/evalgate-bench.jpg",video:"/vids/evalgate-demo.mp4",poster:"/vids/posters/evalgate-demo.jpg",scene:"/img/scenes/evalgate.webp",sceneAlt:"Software engineer at an industrial desk reviewing a dark-mode prompt evaluation matrix with green PASS badges and an orange 0.90 threshold line",live:"https://emmanalcazarjr.com/evalgate/",repo:"https://github.com/emmanalcazarjr-ops/obsidian-vault/tree/main/03-projects/eval-gate-lab"}],P=[{name:"Automated Report Generator",impact:"Automated generation and compilation of engineering & telemetry inspection reports.",url:"https://github.com/emmanalcazarjr-ops/automated-report-generator"},{name:"Water Order Automation SaaS",impact:"SMS & PIN ordering for condo refilling stations with Claude API entity parsing.",url:"https://water.emmanalcazarjr.com"},{name:"Sure Win Board Reviewer",impact:"Responsive web & Android study app covering 127 official PRC board syllabus topics with KaTeX.",url:"https://emmanalcazarjr.com/boardkid"},{name:"AI Chatbot API",impact:"Stateful support agent with Supabase-backed conversation memory.",url:"https://github.com/emmanalcazarjr-ops/chatbot-api"}],W=[{title:"Registered Electronics Engineer (ECE #83920)",by:"PRC Board Licensure (Rating: 79.80%)",when:"Dec 2025"},{title:"Registered Electronics Technician (ECT #31662)",by:"PRC Board Licensure (Rating: 72.00%)",when:"Dec 2025"},{title:"AI Engineer for Developers Associate",by:"DataCamp (ID: AIEDA0015580025435)",when:"Jul 2026"},{title:"Data Analyst Associate",by:"DataCamp (Verified Associate)",when:"2026"},{title:"Project Management Professional (PMP)® Prep (35h)",by:"MSTCONNECT / PMI ATP (`C018199`)",when:"May 2026"},{title:"Safety Officer 2 (COSH + TOT 42 Hours)",by:"DOLE-OSHC (`DOLE-OSH No. 1030-032326-0154`)",when:"Mar 2026"},{title:"Building ICT Internetworking Infrastructure (20h)",by:"DICT Region V",when:"Dec 2023"}],f={email:"emmanalcazarjr@gmail.com",cv:"/Emmanuel_Alcazar_Resume.pdf"},z={github:'<path d="…" fill-rule="evenodd"></path>',"raspberry-pi":'<path d="…" fill-rule="evenodd"></path>',typescript:'<path d="…" fill-rule="evenodd"></path>',python:'<path d="…" fill-rule="evenodd"></path>',docker:'<path d="…" fill-rule="evenodd"></path>',cloudflare:'<path d="…" fill-rule="evenodd"></path>',google:'<path d="…" fill-rule="evenodd"></path>',unity:'<path d="…" fill-rule="evenodd"></path>',telegram:'<path d="…" fill-rule="evenodd"></path>',js:'<path d="…" fill-rule="evenodd"></path>',diploma:`<path d="…" fill="currentColor" transform="translate(55,0)"></path>\r
  <path d="…" fill="currentColor" transform="translate(145.306884765625,127.368896484375)"></path>\r
  <path d="…" fill="currentColor" transform="translate(148.25,195.3359375)"></path>\r
  <path d="…" fill="currentColor" transform="translate(230,196)"></path>\r
  <path d="…" fill="currentColor" transform="translate(271.638671875,195.368896484375)"></path>\r
  <path d="…" fill="currentColor" transform="translate(375,196)"></path>\r
  <path d="…" fill="currentColor" transform="translate(353.29296875,244.140625)"></path>\r
  <path d="…" fill="currentColor" transform="translate(146,265)"></path>\r
  <path d="…" fill="currentColor" transform="translate(187.357421875,263.7412109375)"></path>\r
  <path d="…" fill="currentColor" transform="translate(176,342)"></path>\r
  <path d="…" fill="currentColor" transform="translate(187,373)"></path>`,"download-tray":`<path d="…" fill="currentColor" transform="translate(256,-0.625)"></path>\r
  <path d="…" fill="currentColor" transform="translate(65,138)"></path>`,briefcase:'<path d="…" fill="currentColor" transform="translate(189.88052368164063,37.85282897949219)"></path>',"camcorder-handheld":'<path d="…" fill="currentColor" transform="translate(16.809249877929688,73.37181091308594)"></path>',eye:`<path d="…" fill="currentColor" transform="translate(494.760498046875,231.323486328125)"></path>\r
  <path d="…" fill="currentColor" transform="translate(263.3125,196.1875)"></path>`,speedometer:`<path d="…" fill="currentColor" transform="translate(301,3)"></path>\r
  <path d="…" fill="currentColor" transform="translate(260,34)"></path>\r
  <path d="…" fill="currentColor" transform="translate(148.8671875,62.44140625)"></path>\r
  <path d="…" fill="currentColor" transform="translate(368,63)"></path>\r
  <path d="…" fill="currentColor" transform="translate(446,139)"></path>\r
  <path d="…" fill="currentColor" transform="translate(72,143)"></path>\r
  <path d="…" fill="currentColor" transform="translate(357,144)"></path>\r
  <path d="…" fill="currentColor" transform="translate(46.375,246.6875)"></path>\r
  <path d="…" fill="currentColor" transform="translate(465.3125,246.625)"></path>\r
  <path d="…" fill="currentColor" transform="translate(84,348)"></path>\r
  <path d="…" fill="currentColor" transform="translate(434,352)"></path>`,database:'<path d="…" fill="currentColor" transform="translate(330,3)"></path>',"server-network":`<path d="…" fill="currentColor" transform="translate(42.60764503479004,7.868572235107422)"></path>\r
  <path d="…" fill="currentColor" transform="translate(115.875,68.6875)"></path>\r
  <path d="…" fill="currentColor" transform="translate(329,77)"></path>\r
  <path d="…" fill="currentColor" transform="translate(363,77)"></path>\r
  <path d="…" fill="currentColor" transform="translate(397,77)"></path>\r
  <path d="…" fill="currentColor" transform="translate(431,77)"></path>\r
  <path d="…" fill="currentColor" transform="translate(296,78)"></path>\r
  <path d="…" fill="currentColor" transform="translate(311,102)"></path>\r
  <path d="…" fill="currentColor" transform="translate(345,102)"></path>\r
  <path d="…" fill="currentColor" transform="translate(379,102)"></path>\r
  <path d="…" fill="currentColor" transform="translate(413,102)"></path>\r
  <path d="…" fill="currentColor" transform="translate(447,102)"></path>\r
  <path d="…" fill="currentColor" transform="translate(115.875,230.6875)"></path>\r
  <path d="…" fill="currentColor" transform="translate(297,241)"></path>\r
  <path d="…" fill="currentColor" transform="translate(330,240)"></path>\r
  <path d="…" fill="currentColor" transform="translate(365.65625,241.30078125)"></path>\r
  <path d="…" fill="currentColor" transform="translate(399.8125,241.3125)"></path>\r
  <path d="…" fill="currentColor" transform="translate(433.8125,241.25)"></path>\r
  <path d="…" fill="currentColor" transform="translate(312,265)"></path>\r
  <path d="…" fill="currentColor" transform="translate(346,265)"></path>\r
  <path d="…" fill="currentColor" transform="translate(380,265)"></path>\r
  <path d="…" fill="currentColor" transform="translate(414,265)"></path>\r
  <path d="…" fill="currentColor" transform="translate(449,265)"></path>`,microphone:`<path d="…" fill="currentColor" transform="translate(315.921875,19.3359375)"></path>\r
  <path d="…" fill="currentColor" transform="translate(128,247)"></path>`,"layers-triple":'<path d="…" fill="currentColor" transform="translate(257.369873046875,7.79736328125)"></path>',command:'<path d="…" fill="currentColor" transform="translate(0,0)"></path>',"settings-sliders":`<path d="…" fill="currentColor" transform="translate(86,0)"></path>\r
  <path d="…" fill="currentColor" transform="translate(262,0)"></path>\r
  <path d="…" fill="currentColor" transform="translate(437,0)"></path>`,film:`<path d="…" fill="currentColor" transform="translate(251.6875,-0.3125)"></path>\r
  <path d="…" fill="currentColor" transform="translate(383,78)"></path>\r
  <path d="…" fill="currentColor" transform="translate(292,101)"></path>\r
  <path d="…" fill="currentColor" transform="translate(191.6875,208.0625)"></path>\r
  <path d="…" fill="currentColor" transform="translate(400.6875,209.125)"></path>\r
  <path d="…" fill="currentColor" transform="translate(285.6953125,304.2734375)"></path>`,envelope:`<path d="…" fill="currentColor" transform="translate(69.775634765625,60.619049072265625)"></path>\r
  <path d="…" fill="currentColor" transform="translate(80.34375,116.09375)"></path>`,"paper-plane-angled":'<path d="…" fill="currentColor" transform="translate(509.9375,86.9375)"></path>',cross:'<path d="…" fill="currentColor" transform="translate(23.893587350845337,0.15936511754989624)"></path>',close:`<path d="…" fill="currentColor" transform="translate(0,4)"></path>\r
  <path d="…" fill="currentColor" transform="translate(219,211)"></path>`,globe:'<path d="…" fill="currentColor" transform="translate(243.44140625,-0.203125)"></path>',play:'<path d="…" fill="currentColor" transform="translate(84,0)"></path>',compass:`<path d="…" fill="currentColor" transform="translate(271.828125,2.74609375)"></path>\r
  <path d="…" fill="currentColor" transform="translate(371,176)"></path>`},q=new Set(["linkedin","github","twitter-alt","raspberry-pi","typescript","python","docker","cloudflare","google","unity","telegram","figma","js","html5","css3","node-js"]);function n(C,e="",t=""){const r=z[C];if(!r)return console.warn(`Icon not found: ${C}`),"";const s=t?`<title>${t}</title>`:"",o=t?`role="img" aria-label="${t}"`:'aria-hidden="true"',l=q.has(C)?"0 0 320 320":"0 0 512 512";return`<svg class="bn-icon ${e}" viewBox="${l}" fill="currentColor" ${o}>${s}${r}</svg>`}let I=F;const d=(C,e=document)=>e.querySelector(C),T=(C,e=document)=>[...e.querySelectorAll(C)],a=C=>String(C).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),m=d("#main-grid"),Q=d("#aboutView"),_=d("#aboutContent"),R=d("#openAboutBtn"),V=d("#closeAboutBtn"),c=d("#projectModal"),x=d("#modalInner"),$=d("#cursorPill");function y(C){switch(C.id){case"specula":return"eye";case"rag":return"layers-triple";case"rushdailybot":return"telegram";case"reybineye":return"camcorder-handheld";case"rush-voice":return"microphone";case"emmanpi":return"raspberry-pi";case"bridgely":return"server-network";default:return"command"}}const b=C=>C.poster||C.image,k=C=>{var e,t;return((t=(e=C.meta)==null?void 0:e.split("·")[1])==null?void 0:t.trim())||""},M=window.matchMedia("(prefers-reduced-motion: reduce)"),X='<svg class="bn-icon icon-sm" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 11 L11 5 M6 5 H11 V10"/></svg>';function J(){const C=(i,p)=>`
    <div class="card project-video-card" data-project-id="${a(i.id)}" aria-hidden="true" style="--o:${p}; --i:${p}">
      <div class="project-video-frame">
        <video src="${a(i.video)}" muted loop playsinline preload="metadata"${b(i)?` poster="${a(b(i))}"`:""}></video>
        <div class="video-fallback">
          ${n(y(i),"icon-xl")}
          <span>Demo video unavailable</span>
        </div>
        <div class="project-video-badge">
          ${n("play","icon-xs")}
          <span>Demo</span>
        </div>
      </div>
    </div>
  `,e=(i,p)=>`
    <div class="card project-photo-card is-interactive" data-project-id="${a(i.id)}" style="--o:${p}; --i:${p}">
      <img class="project-photo" src="${a(i.scene||i.image)}" alt="${a(i.sceneAlt||`${i.name} in use`)}" width="1024" height="1024" loading="lazy" decoding="async" />
      <div class="photo-scrim" aria-hidden="true"></div>
      <div class="photo-caption">
        <span class="photo-kicker">${a(i.category)}</span>
        <h3 class="photo-name">${a(i.name)}</h3>
      </div>
      <div class="photo-actions">
        ${i.live?`<a class="action-pill primary" href="${a(i.live)}" target="_blank" rel="noopener" aria-label="${a(i.name)} live demo (opens in new tab)">${X}<span>Live demo</span></a>`:""}
        ${i.repo?`<a class="action-pill" href="${a(i.repo)}" target="_blank" rel="noopener" aria-label="${a(i.name)} source on GitHub (opens in new tab)">${n("github","icon-sm")}<span>GitHub</span></a>`:""}
        <button class="action-pill" type="button" aria-haspopup="dialog" aria-label="Open ${a(i.name)} case study">${n("layers-triple","icon-sm")}<span>Case study</span></button>
      </div>
    </div>
  `,t=`
    <section class="card bento-widget" aria-label="Software and Systems Metrics">
      <div class="bento-widget-header">
        <span class="widget-kicker">
          ${n("speedometer","icon-xs kicker-icon")}
          PROVEN BENCHMARKS
        </span>
        <h3>Software &amp; Systems Impact</h3>
        <span class="meta">Production Deployments &amp; Licensure</span>
      </div>
      <div class="bento-metrics-grid">
        <div class="bento-metric-box">
          <b>99.4%</b>
          <span>RAG cited accuracy</span>
        </div>
        <div class="bento-metric-box">
          <b>Sub-320ms</b>
          <span>Edge vision extraction</span>
        </div>
        <div class="bento-metric-box">
          <b>28</b>
          <span>Avigilon cameras online</span>
        </div>
        <div class="bento-metric-box">
          <b>2</b>
          <span>PRC Licenses (ECE &amp; ECT)</span>
        </div>
      </div>
      <div class="bento-widget-footer">
        <span>TypeScript · Python · Next.js · Cloudflare · Edge AI</span>
      </div>
    </section>
  `,r=`
    <section class="card bento-widget" aria-label="Full-Stack and AI Tech Stack">
      <div class="bento-widget-header">
        <span class="widget-kicker">
          ${n("layers-triple","icon-xs kicker-icon")}
          CORE TECH STACK
        </span>
        <h3>Software &amp; Signal Chain</h3>
        <span class="meta">Client → Edge → Model → Agent</span>
      </div>
      <div class="bento-stack-chips">
        <span class="chip-orange">${n("typescript","icon-xs chip-icon")} TypeScript</span>
        <span class="chip-cream">${n("python","icon-xs chip-icon")} Python</span>
        <span class="chip-slate">${n("js","icon-xs chip-icon")} Next.js 16 / React 19</span>
        <span>${n("google","icon-xs chip-icon")} Google Gemini 2.5/3.7</span>
        <span>${n("command","icon-xs chip-icon")} Claude Code</span>
        <span>${n("cloudflare","icon-xs chip-icon")} Cloudflare Workers/D1</span>
        <span>${n("database","icon-xs chip-icon")} Prisma ORM</span>
        <span>${n("layers-triple","icon-xs chip-icon")} FAISS</span>
        <span>${n("docker","icon-xs chip-icon")} Docker</span>
        <span>${n("microphone","icon-xs chip-icon")} Vosk STT / Piper TTS</span>
        <span>${n("settings-sliders","icon-xs chip-icon")} n8n</span>
        <span>${n("unity","icon-xs chip-icon")} Avigilon Unity AI</span>
        <span>${n("film","icon-xs chip-icon")} Remotion</span>
      </div>
      <div class="bento-widget-footer">
        <span>Zero-cloud audio to distributed edge</span>
      </div>
    </section>
  `,s=`
    <section class="card bento-widget" aria-label="Micro-Tools and GitHub Builds">
      <div class="bento-widget-header">
        <span class="widget-kicker">
          ${n("github","icon-xs kicker-icon")}
          OPEN REPOSITORIES
        </span>
        <h3>Also on GitHub</h3>
        <span class="meta">Workflows &amp; Integrations</span>
      </div>
      <ul class="bento-tools-list">
        ${P.map(i=>`
          <li>
            <a href="${a(i.url)}" target="_blank" rel="noopener">
              <span class="t-name">${a(i.name)} ↗</span>
              <span class="t-desc">${a(i.impact)}</span>
            </a>
          </li>
        `).join("")}
      </ul>
      <div class="bento-widget-footer">
        <span>Public verified builds</span>
      </div>
    </section>
  `,o=`
    <article class="card curl bento-wide manifesto-banner" aria-label="Engineer manifesto and contact">
      <div class="manifesto-content">
        <span class="manifesto-kicker">
          ${n("compass","icon-xs kicker-icon")}
          ENGINEERING MANIFESTO
        </span>
        <h3 class="manifesto-text">
          “I build software systems that see, listen, and act. From full-stack web platforms and edge-AI vision to autonomous agents that eliminate manual overhead.”
        </h3>
        <div class="manifesto-footer">
          <span class="manifesto-by">
            Emmanuel Alcazar Jr. · Software Engineer &amp; AI Developer (ECE/ECT, DOLE SO2)
          </span>
          <a class="manifesto-cta" href="mailto:${a(f.email)}">
            ${n("paper-plane-angled","icon-sm")}
            <span>Get in touch ↗</span>
          </a>
        </div>
      </div>
    </article>
  `,l=G,h=[`
    <section class="card highlight-card" aria-labelledby="highlightTitle" style="--o:-1; --i:0">
      <div class="highlight-media">
        <video class="highlight-video" data-src="${a(l.video)}" poster="${a(l.poster)}" muted loop playsinline preload="metadata" width="1920" height="1080" aria-label="${a(l.videoLabel)}">
          <track kind="captions" src="${a(l.captions)}" srclang="en" label="English" default />
        </video>
        <p class="highlight-captions" aria-hidden="true" hidden></p>
        <div class="video-fallback">
          ${n("settings-sliders","icon-xl")}
          <span>Video unavailable</span>
        </div>
        <button class="highlight-sound" type="button" aria-label="Play the video from the start with sound">
          ${n("play","icon-xs")}
          <span>Play with sound</span>
        </button>
      </div>
      <div class="highlight-body">
        <div class="highlight-head">
          <span class="widget-kicker">${a(l.eyebrow)} · <span class="kicker-keep-case">${a(l.topic)}</span></span>
          <h2 class="highlight-title" id="highlightTitle">${a(l.title)}</h2>
        </div>
        <div class="highlight-copy">
          <p>${a(l.line)}</p>
          <span class="highlight-pill">${a(l.pill)}</span>
        </div>
      </div>
    </section>
  `,'<h2 class="sr-only">Selected projects</h2>'];I.forEach((i,p)=>{const L=C(i,p*2),S=e(i,p*2+1);h.push(...p%2===0?[L,S]:[S,L])}),h.push(t,r,s,o),m.innerHTML=h.join(""),e1(),C1()}function K(){_.innerHTML=`
    <img class="about-hero" src="/img/profile.jpg" alt="Emmanuel Alcazar Jr. portrait" width="732" height="466" loading="eager" />

    <div class="about-intro">
      <div class="about-headline-badge">
        <span>SOFTWARE ENGINEER &amp; AI SOLUTIONS DEVELOPER · LICENSED ECE &amp; ECT</span>
      </div>
      ${B.aboutBio.map(C=>`<p>${a(C)}</p>`).join("")}
      <div class="about-actions-row">
        <a class="about-primary-btn" href="mailto:${a(f.email)}">
          ${n("envelope","icon-sm")}
          <span>Contact via Email ↗</span>
        </a>
        <a class="about-secondary-btn" href="${a(f.cv)}" target="_blank" rel="noopener">
          ${n("download-tray","icon-sm")}
          <span>Download Official Resume PDF ↗</span>
        </a>
      </div>
    </div>

    <section class="about-section" aria-labelledby="about-experience-heading">
      <h2 id="about-experience-heading" class="about-section-heading">
        ${n("briefcase","icon-md heading-icon")}
        <span>Experience</span>
      </h2>
      <div class="subhead">Present</div>
      ${E.now.map(C=>`
        <article class="xp-item">
          <h3>${a(C.role)} — <span class="xp-org">${a(C.org)}</span></h3>
          <div class="xp-meta">${a(C.when)}</div>
          <p>${a(C.note)}</p>
        </article>
      `).join("")}

      <div class="subhead">Past</div>
      ${E.past.map(C=>`
        <article class="xp-item">
          <h3>${a(C.role)} — <span class="xp-org">${a(C.org)}</span></h3>
          <div class="xp-meta">${a(C.when)}</div>
          <p>${a(C.note)}</p>
        </article>
      `).join("")}
    </section>

    <section class="about-section" aria-labelledby="about-numbers-heading">
      <h2 id="about-numbers-heading" class="about-section-heading">
        ${n("speedometer","icon-md heading-icon")}
        <span>Perspective in Numbers</span>
      </h2>
      <div class="numbers-grid">
        ${N.map(C=>`
          <div class="number-card">
            <b>${a(C.n)}</b>
            <span>${a(C.label)}</span>
          </div>
        `).join("")}
      </div>
    </section>

    <section class="about-section" aria-labelledby="about-creds-heading">
      <h2 id="about-creds-heading" class="about-section-heading">
        ${n("diploma","icon-md heading-icon")}
        <span>Licensure &amp; Certifications</span>
      </h2>
      <ul class="creds-list">
        ${W.map(C=>`
          <li>
            <b>${a(C.title)}</b>
            <span>${a(C.by)} · ${a(C.when)}</span>
          </li>
        `).join("")}
      </ul>
    </section>

    <section class="about-section" aria-labelledby="about-builds-heading">
      <h2 id="about-builds-heading" class="about-section-heading">
        ${n("github","icon-md heading-icon")}
        <span>Open Micro-Builds</span>
      </h2>
      <ul class="builds-list">
        ${P.map(C=>`
          <li>
            <a href="${a(C.url)}" target="_blank" rel="noopener" class="build-link-item">
              <b>${a(C.name)} ↗</b>
              <span>${a(C.impact)}</span>
            </a>
          </li>
        `).join("")}
      </ul>
    </section>
  `}function U(C){var t;const e=I.find(r=>r.id===C);e&&(x.innerHTML=`
    <div class="dialog-media">
      <button class="dialog-close-btn" type="button" aria-label="Close case study" data-close-modal>
        ${n("cross","icon-sm")}
      </button>
      <video src="${a(e.video)}"${M.matches?"":" autoplay"} muted loop playsinline controls${b(e)?` poster="${a(b(e))}"`:""}></video>
      <div class="video-fallback">
        ${n(y(e),"icon-xl")}
        <span>Demo video unavailable</span>
      </div>
    </div>
    <div class="dialog-content">
      <div class="dialog-header-row">
        <span class="dialog-category-badge">
          ${n(y(e),"icon-xs")}
          ${a(e.category)}
        </span>
        ${k(e)?`<span class="dialog-meta">${a(k(e))}</span>`:""}
      </div>
      <h2 class="dialog-title" id="dlgTitle">${a(e.name)}</h2>

      <!-- High-visibility Impact Box for Hiring Managers -->
      <div class="dialog-impact-box">
        <div class="impact-badge-tag">
          ${n("speedometer","icon-xs bolt")}
          <span>MEASURABLE SOFTWARE IMPACT</span>
        </div>
        <p class="impact-summary-text">${a(e.impactSummary)}</p>
        <div class="impact-metric-pill">${a(e.metric)}</div>
      </div>

      ${(t=e.metricsList)!=null&&t.length?`
      <ul class="dialog-metrics" aria-label="Key metrics">
        ${e.metricsList.map(r=>`<li><b>${a(r.val)}</b><span>${a(r.label)}</span></li>`).join("")}
      </ul>`:""}

      <div class="dialog-desc-section">
        <h3 class="dialog-subhead">
          ${n("layers-triple","icon-xs subhead-icon")}
          <span>System Architecture &amp; Execution</span>
        </h3>
        <p class="dialog-desc">${a(e.desc)}</p>
      </div>

      <ul class="dialog-tags" aria-label="Technologies">
        ${(e.tags||[]).map(r=>`<li>${a(r)}</li>`).join("")}
      </ul>
      <div class="dialog-actions">
        ${e.live?`<a class="dialog-btn primary" href="${a(e.live)}" target="_blank" rel="noopener">${n("globe","icon-sm")} <span>Live Demo ↗</span></a>`:""}
        ${e.repo?`<a class="dialog-btn secondary" href="${a(e.repo)}" target="_blank" rel="noopener">${n("github","icon-sm")} <span>Code Repository ↗</span></a>`:""}
        ${!e.live&&!e.repo?`<a class="dialog-btn primary" href="mailto:${a(f.email)}?subject=Inquiry%20regarding%20${encodeURIComponent(e.name)}">${n("envelope","icon-sm")} <span>Request Technical Walkthrough ↗</span></a>`:""}
      </div>
    </div>
  `,c.showModal(),w(!0))}c.addEventListener("close",()=>{var C;(C=x.querySelector("video"))==null||C.pause(),w(!Q.hidden)});"closedBy"in HTMLDialogElement.prototype||c.addEventListener("click",C=>{if(C.target!==c)return;const e=c.getBoundingClientRect();e.top<=C.clientY&&C.clientY<=e.top+e.height&&e.left<=C.clientX&&C.clientX<=e.left+e.width||c.close()});c.addEventListener("click",C=>{C.target.closest("[data-close-modal]")&&c.close()});m.addEventListener("click",C=>{if(C.target.closest("a"))return;const e=C.target.closest("[data-project-id]");e&&U(e.dataset.projectId)});let H=!1;const u=new Set,A=new IntersectionObserver(C=>{for(const{target:e,isIntersecting:t}of C)t?u.add(e):u.delete(e);g()},{rootMargin:"120px 0px"}),j=C=>{C.dataset.src&&!C.getAttribute("src")&&(C.src=C.dataset.src)};function g(){const C=!H&&!document.hidden,e=C&&!M.matches;for(const t of T("video",m)){if(t.dataset.engaged){(!C||!u.has(t))&&t.pause();continue}if(e&&u.has(t)){if(t.dataset.src&&document.readyState!=="complete")continue;j(t),t.play().catch(()=>{})}else t.pause()}}window.addEventListener("load",g,{once:!0});function Y(C,e){var t;C.dataset.engaged="1",C.controls=!0,(t=C.closest(".highlight-media"))==null||t.classList.add("is-engaged"),j(C),e&&(C.muted=!1,C.loop=!1,C.currentTime=0,C.play().catch(()=>{}))}function C1(){const C=d(".highlight-video",m),e=d(".highlight-captions",m),t=C==null?void 0:C.textTracks[0];if(!t||!e)return;let r=!0;const s=()=>{var l;const o=r?(l=t.activeCues)==null?void 0:l[0]:null;e.textContent=o?o.text:"",e.hidden=!o};t.mode="hidden",t.addEventListener("cuechange",s),C.textTracks.addEventListener("change",()=>{t.mode==="showing"?(r=!0,t.mode="hidden"):t.mode==="disabled"&&(r=!1),s()})}m.addEventListener("click",C=>{const e=C.target.closest(".highlight-media"),t=e==null?void 0:e.querySelector("video");if(!t||t.dataset.engaged)return;const r=C.target.closest(".highlight-sound");Y(t,!!r),r&&t.focus()});function w(C){H=C,g()}function e1(){A.disconnect(),u.clear(),T("video",m).forEach(C=>A.observe(C))}M.addEventListener("change",g);document.addEventListener("visibilitychange",g);document.addEventListener("error",C=>{var e;C.target instanceof HTMLVideoElement&&((e=C.target.closest(".project-video-frame, .dialog-media, .highlight-media"))==null||e.classList.add("is-missing"))},!0);const a1=[d(".sidebar"),m];function Z(C){Q.hidden=!C,a1.forEach(e=>{e.inert=C}),document.documentElement.classList.toggle("is-locked",C),w(C||c.open)}function D(){Z(!0),Q.scrollTop=0,window.location.hash!=="#about"&&window.history.pushState({view:"about"},"","#about"),V.focus()}function O(){Z(!1),window.location.hash==="#about"&&window.history.pushState(null,"",window.location.pathname+window.location.search),R.focus()}R.addEventListener("click",D);V.addEventListener("click",O);window.addEventListener("popstate",()=>{Z(window.location.hash==="#about")});window.addEventListener("keydown",C=>{C.key==="Escape"&&!Q.hidden&&!c.open&&O()});if(window.matchMedia("(hover: hover) and (pointer: fine)").matches){let C=-100,e=-100,t=-100,r=-100,s=0;const o=()=>{t+=(C-t)*.2,r+=(e-r)*.2,$.style.transform=`translate3d(${t}px, ${r}px, 0) translate(-50%, -50%)`,s=Math.abs(C-t)+Math.abs(e-r)>.5?requestAnimationFrame(o):0};window.addEventListener("pointermove",l=>{var h,i;C=l.clientX,e=l.clientY;const v=!!((i=(h=l.target).closest)!=null&&i.call(h,".project-video-card"))&&!c.open&&Q.hidden;$.classList.toggle("visible",v),v&&!s&&(s=requestAnimationFrame(o))},{passive:!0})}J();K();window.location.hash==="#about"&&D();
