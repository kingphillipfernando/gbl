(function(){
// o: [text, score(2 best,1 acceptable,0 wrong), feedback]
var Ms=[
{n:"Phishing Hunter",d:"Beginner",icon:"🎣",obj:"Identify phishing emails, suspicious links, and social engineering.",
brief:"Review incoming messages for Acme Corp staff. Tap the evidence, then classify each message.",
steps:[
{t:"Phishing emails",q:"Classify this email.",ev:[["From: it-helpdesk@acme-corp-support.net\nSubject: Password expires TODAY\nLink: http://acme-login.top/reset","Sender domain is not acmecorp.com, the link goes to .top, and the subject adds urgency."]],h:"Compare the sender domain to acmecorp.com.",
o:[["Legitimate",0,"The sender domain does not belong to the company, and the link points elsewhere."],["Suspicious",2,"Correct. Mismatched domain, urgency, and an unrelated link are classic phishing signs."]]},
{t:"Phishing emails",q:"Classify this email.",ev:[["From: hr@acmecorp.com\nSubject: Benefits enrollment opens Monday\nBody: Log in through the intranet as usual. No links included.","Sender domain matches, no links, no pressure, and it points you to the normal intranet."]],h:"Not every email is a trap. Look for evidence both ways.",
o:[["Legitimate",2,"Correct. The domain matches and there is no link, pressure, or request for credentials."],["Suspicious",0,"Be careful of false alarms. Here there is no evidence of deception, so it is likely legitimate."]]},
{t:"Social engineering",q:"Classify this email.",ev:[["From: ceo.office@gmail.com\nSubject: Quick favor\nBody: I'm in a meeting. Buy 5 gift cards and send me the codes. Keep this between us.","A CEO using a free email address, secrecy, and gift cards are signs of impersonation fraud."]],h:"Would a real executive use a personal address and ask for secrecy?",
o:[["Legitimate",0,"Executives rarely ask for gift cards by email. Verify through a known channel."],["Suspicious",2,"Correct. Impersonation plus secrecy and unusual payment is social engineering."]]},
{t:"Suspicious links",q:"The hovered link shows https://secure.acmebank.com.login-verify.ru/ . What is the real domain?",ev:[["Hover text: https://secure.acmebank.com.login-verify.ru/","Read the domain from right to left, up to the first slash."]],h:"The real domain is the part just before the first single slash.",
o:[["acmebank.com",0,"That is only a subdomain label here."],["login-verify.ru",2,"Correct. Everything before it is a subdomain the attacker controls."],["secure.acmebank.com",1,"Close, but the owner of the domain is the part at the end."]]}
]},
{n:"Password Fortress",d:"Beginner",icon:"🔐",obj:"Recognize weak passwords and apply password and authentication principles.",time:120,
brief:"An account is under attack. Secure it before the timer ends. You have 3 hints. Running out of time costs the time bonus.",
steps:[
{t:"Passwords",q:"Which password is strongest?",h:"Length beats cleverness.",o:[["Acme2024!",0,"Company name + year + symbol is guessable."],["P@ssw0rd",0,"Common substitutions are in every cracking list."],["correct-horse-battery-staple-42",2,"Correct. A long, random passphrase is hard to guess and easy to remember."],["Summer#1",0,"Short and follows a common pattern."]]},
{t:"Passwords",q:"Why is reusing one password on many sites dangerous?",h:"Think about what happens after one site is breached.",o:[["A breach at one site lets attackers try it everywhere",2,"Correct. This is credential stuffing. Use unique passwords and a password manager."],["It makes the password expire sooner",0,"Reuse does not change expiry."],["Websites block reused passwords",0,"Most sites cannot tell."]]},
{t:"Multi-factor authentication",q:"Choose the best way to secure this admin account.",h:"Combine something you know with something you have.",o:[["Complex 8-character password only",0,"A single factor is not enough for an admin account."],["Long passphrase only",1,"Good, but a stolen passphrase still gives full access. Add MFA."],["Long passphrase + multi-factor authentication",2,"Correct. MFA means a stolen password alone is not enough."]]},
{t:"Multi-factor authentication",q:"Which is the strongest second factor?",h:"Security questions can be researched.",o:[["Security question: mother's maiden name",0,"Answers can be found online or guessed."],["SMS code",1,"Better than nothing, but SIM-swap attacks exist."],["Authenticator app or hardware security key",2,"Correct. Harder to intercept or phish."]]}
]},
{n:"Defend the Network",d:"Intermediate",icon:"🛡️",obj:"Explain firewalls, antivirus, and MFA, and respond to an incident logically.",risk:1,
brief:"A Sales laptop shows a ransom note and renamed files. Make decisions to lower the network risk level.",
steps:[
{t:"Incident response",q:"First action on the infected laptop?",h:"Stop the spread before anything else.",o:[["Disconnect it from the network (cable/Wi-Fi), keep it powered on",2,"Correct. Containment first. Keep it on so evidence stays in memory."],["Run an antivirus scan while connected",1,"Reasonable, but staying connected may let it spread. Isolate first, then scan."],["Reboot to see if the message goes away",0,"Rebooting can destroy evidence and does not remove malware."],["Keep working and tell IT later",0,"Delays let malware spread."]]},
{t:"Firewalls & antivirus",q:"What does a firewall do?",h:"Think of a gatekeeper for traffic.",o:[["Filters incoming and outgoing network traffic using rules",2,"Correct. It allows or blocks traffic between networks."],["Removes viruses from files",0,"That is antivirus."],["Encrypts every password",0,"Firewalls do not manage passwords."]]},
{t:"Firewalls & antivirus",q:"What is antivirus software mainly for?",h:"It works on files and behavior on a device.",o:[["Blocking traffic by port",0,"That is mostly a firewall job."],["Detecting and removing malware on devices",2,"Correct. It scans files and behavior, and needs regular updates."],["Making passwords stronger",0,"Not related."]]},
{t:"Multi-factor authentication",q:"Logs show the attacker entered through the VPN with a stolen password. Best prevention?",h:"What stops a stolen password from being enough?",o:[["Enable MFA on the VPN and all accounts",2,"Correct. MFA blocks most stolen-password attacks."],["Force everyone to change passwords monthly",1,"Helps a little, but does not stop a stolen password working today."],["Block all internet access",0,"Not practical and does not fix the weakness."]]}
]},
{n:"Security Investigator",d:"Advanced",icon:"🕵️",obj:"Collect clues and reason to find the cause, affected system, and next step.",
brief:"Read the incident report. Inspect every clue before answering. Each clue earns bonus XP.",
steps:[
{t:"Incident analysis",q:"What is the most likely cause?",ev:[["09:10 Helpdesk call: a caller says he is 'Mark from IT' and urgently asks to reset the finance manager's password.","Clue: urgent pressure and an unverified identity (pretexting)."],["09:25 FINANCE-FS login from an overseas IP using the finance manager's account.","Clue: the reset was used right away from an unusual location."],["Finance manager account: MFA disabled.","Clue: no second factor to stop the login."],["09:40 Outbound transfer of 2 GB to an unknown server.","Clue: data exfiltration."],["Antivirus: no malware found. Firewall: outbound traffic allowed.","Clue: no malware involved, so this is not ransomware or a virus."]],h:"There is no malware. Who gave the access?",
o:[["Ransomware",0,"No malware or encryption was found."],["Social engineering (phone pretexting)",2,"Correct. The attacker tricked the helpdesk into resetting the password."],["Hardware failure",0,"Nothing suggests hardware issues."]]},
{t:"Incident analysis",q:"Which system or account was affected?",h:"Follow the login and the transfer.",o:[["The finance manager's account and FINANCE-FS file server",2,"Correct. The account was taken over and used to move data from the server."],["The public website",0,"No web server events appear."],["A shared printer",0,"Not in the evidence."]]},
{t:"Incident response",q:"Final challenge: what is the best next step?",h:"Contain, preserve, fix, report.",o:[["Disable the account, block the IP, reset credentials with MFA, preserve logs, and report",2,"Correct. Contain, preserve evidence, remove the weakness, and escalate. Also add identity verification to helpdesk resets."],["Delete the logs to clean up",0,"Never destroy evidence."],["Wait and monitor for more activity",1,"Monitoring matters, but waiting while data leaves the network lets the damage grow."]]}
]}];
var B=[["pe","Phishing Expert","🎣","2+ stars in Phishing Hunter",0],["pg","Password Guardian","🔐","2+ stars in Password Fortress",1],["nd","Network Defender","🛡️","2+ stars in Defend the Network",2],["mi","Master Investigator","🕵️","Complete Security Investigator",3],["pd","Perfect Defender","🏆","Earn 3 stars in every mission",-1]];
var TIP={"Phishing emails":"Check the sender domain, urgency, and links before trusting an email.","Social engineering":"Verify unusual requests through a separate, trusted channel.","Suspicious links":"Read domains right to left up to the first slash.","Passwords":"Use long unique passphrases and a password manager.","Multi-factor authentication":"Enable MFA, preferably an authenticator app or security key.","Incident response":"Contain, preserve evidence, fix the cause, then report.","Firewalls & antivirus":"Firewalls filter traffic; antivirus finds and removes malware.","Incident analysis":"Collect all clues before concluding on the cause."};
var S={xp:0,m:{},b:{},t:{}},P,tm,app=document.getElementById("app"),hud=document.getElementById("hud");
try{var d=localStorage.getItem("cd2");if(d)S=JSON.parse(d)}catch(e){}
function save(){try{localStorage.setItem("cd2",JSON.stringify(S))}catch(e){}}
function esc(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}
function go(f){clearInterval(tm);head();f()}
function head(x){hud.innerHTML="<span>XP "+S.xp+"</span><span>BADGES "+Object.keys(S.b).length+"/"+B.length+"</span>"+(x||"")}
function stars(n){return "<span class='stars'>"+"★".repeat(n)+"☆".repeat(3-n)+"</span>"}
function open(i){return i==0||(S.m[i-1]&&S.m[i-1].s>0)}
function sel(f){app.innerHTML=f}
document.getElementById("home").onclick=function(){go(menu)};

function menu(){var any=Object.keys(S.m).length;
sel("<div class='card'><div class='tag'>BRIEFING</div><h2>Welcome, Junior Analyst</h2><p>Protect <b>Acme Corp</b> (a fictional company) across four missions. Wrong answers never cost XP: you get an explanation and can try again.</p><button class='btn' id='a1'>Start game</button><button class='btn s' id='a2'>Continue mission</button><button class='btn s' id='a3'>Achievements</button><button class='btn s' id='a4'>Learning progress</button></div><div class='card'><div class='tag'>LEARNING OBJECTIVES</div><ul><li>Identify phishing, suspicious links, and social engineering</li><li>Recognize weak passwords and apply password security</li><li>Tell safe from unsafe online behavior</li><li>Explain firewalls, antivirus, and MFA</li><li>Troubleshoot incidents logically</li><li>Evaluate your learning with scores and reports</li></ul></div>");
a1.onclick=function(){go(missions)};a3.onclick=function(){go(ach)};a4.onclick=function(){go(prog)};
a2.onclick=function(){var k=-1;for(var i=0;i<Ms.length;i++)if(open(i)&&!(S.m[i]&&S.m[i].s>0)){k=i;break}if(k<0)go(missions);else go(function(){play(k)})}}

function missions(){var h="<h2>Mission select</h2>";
Ms.forEach(function(m,i){var o=open(i),r=S.m[i];
h+="<div class='card"+(o?"":" lock")+"'><div class='tag'>MISSION "+(i+1)+" · "+m.d.toUpperCase()+"</div><h3>"+m.icon+" "+m.n+"</h3><p class='sm'>"+m.obj+"</p><p>"+(o?(r?stars(r.s)+" &nbsp;Best accuracy "+r.a+"%":"Not started"):"🔒 Complete the previous mission to unlock")+"</p>"+(o?"<button class='btn' data-i='"+i+"'>"+(r?"Replay":"Play")+"</button>":"")+"</div>"});
sel(h);app.querySelectorAll("button[data-i]").forEach(function(b){b.onclick=function(){go(function(){play(+b.dataset.i)})}})}

function play(i){var m=Ms[i];P={i:i,s:0,tries:0,ft:0,xp:0,hints:3,risk:60,late:false,seen:0,ptr:0};
if(m.time){P.left=m.time;tm=setInterval(tick,1000)}step()}
function tick(){P.left--;if(P.left<=0){P.left=0;P.late=true;clearInterval(tm)}var e=document.getElementById("tm");if(e)e.textContent=P.late?"TIME UP":P.left+"s";}
function step(){var m=Ms[P.i],st=m.steps[P.s];P.tries=0;P.seen=0;P.done=false;
var x=(m.time?"<span>⏱ <b id='tm'>"+(P.late?"TIME UP":P.left+"s")+"</b></span><span>HINTS "+P.hints+"</span>":"")+(m.risk?"<span>RISK <span class='meter'><i style='width:"+P.risk+"%'></i></span></span>":"");head(x);
var e=(st.ev||[]).map(function(v,k){return "<button class='ev' data-k='"+k+"'>"+esc(v[0])+"</button>"}).join("");
sel("<div class='card'><div class='tag'>"+m.n.toUpperCase()+" · STEP "+(P.s+1)+"/"+m.steps.length+"</div>"+(P.s==0?"<p>"+m.brief+"</p>":"")+(e?"<div class='sm' id='cnt'></div>"+e:"")+"<h3 style='margin-top:12px'>"+st.q+"</h3><div id='ch'>"+st.o.map(function(o,k){return "<button class='ch' data-k='"+k+"'>"+o[0]+"</button>"}).join("")+"</div><div id='fb'></div>"+(m.time?"<button class='btn s' id='hint'>Use a hint</button>":"")+"</div>");
cnt(st);
app.querySelectorAll(".ev").forEach(function(b){b.onclick=function(){if(b.classList.contains("seen"))return;b.classList.add("seen");P.seen++;b.insertAdjacentHTML("beforeend","<span class='note'>"+st.ev[+b.dataset.k][1]+"</span>");cnt(st)}});
app.querySelectorAll(".ch").forEach(function(b){b.onclick=function(){ans(+b.dataset.k)}});
var hb=document.getElementById("hint");if(hb)hb.onclick=function(){if(P.hints<=0){fb("<b>No hints left.</b>");return}P.hints--;head(x.replace(/HINTS \d/,"HINTS "+P.hints));fb("💡 "+st.h);hb.disabled=P.hints<=0}}
function cnt(st){var c=document.getElementById("cnt");if(c)c.textContent="Evidence inspected: "+P.seen+"/"+st.ev.length}
function fb(h){var f=document.getElementById("fb");f.innerHTML="<div class='fb'>"+h+"</div>"}
function ans(k){if(P.done)return;var m=Ms[P.i],st=m.steps[P.s],o=st.o[k],b=app.querySelectorAll(".ch")[k],T=S.t[st.t]||(S.t[st.t]={ok:0,miss:0});
if(P.tries==0){if(o[1]==2){T.ok++}else T.miss++}
if(o[1]==0){P.tries++;b.classList.add("no");b.disabled=true;if(m.risk){P.risk=Math.min(100,P.risk+10);head(document.getElementById("tm")?"":"<span>RISK <span class='meter'><i style='width:"+P.risk+"%'></i></span></span>")}
fb("<b style='color:var(--bad)'>Not quite. No points lost, try again.</b><br>"+o[2]);return}
P.done=true;var g=o[1]==2?(P.tries==0?100:P.tries==1?50:25):50;g+=P.seen*5;P.xp+=g;S.xp+=g;if(o[1]==2&&P.tries==0)P.ft++;
if(m.risk)P.risk=Math.max(0,P.risk-(o[1]==2?15:8));
b.classList.add(o[1]==2?"ok":"part");app.querySelectorAll(".ch").forEach(function(c,j){c.disabled=true;if(st.o[j][1]==2)c.classList.add("ok")});
var last=P.s==m.steps.length-1;
fb("<b style='color:var(--"+(o[1]==2?"good":"warn")+")'>"+(o[1]==2?"Correct!":"Acceptable, but not the best option.")+" +"+g+" XP</b><br>"+o[2]+(o[1]==1?"<br>The best choice is shown in green.":"")+"<p><button class='btn' id='nx'>"+(last?"Finish mission":"Next")+"</button></p>");
if(m.risk)head("<span>RISK <span class='meter'><i style='width:"+P.risk+"%'></i></span></span>");
document.getElementById("nx").onclick=function(){if(last)finish();else{P.s++;step()}}}

function finish(){clearInterval(tm);var m=Ms[P.i],n=m.steps.length,a=Math.round(P.ft/n*100),s=a>=90?3:a>=60?2:1;if(P.late)s=Math.min(s,2);
var old=S.m[P.i]||{s:0,a:0};if(s>=old.s)S.m[P.i]={s:s,a:a,c:P.ft,n:n};
var nw=[];B.forEach(function(b){var ok=false;if(b[4]>=0){var r=S.m[b[4]];ok=r&&(b[4]==3?r.s>0:r.s>=2)}else ok=Ms.every(function(_,i){return S.m[i]&&S.m[i].s==3});if(ok&&!S.b[b[0]]){S.b[b[0]]=1;nw.push(b)}});
save();head();var nx=P.i+1<Ms.length;
sel("<div class='card'><div class='tag'>MISSION COMPLETE</div><h2>"+m.icon+" "+m.n+"</h2><div class='big'>"+stars(s)+"</div><p>First-try accuracy <b>"+a+"%</b> ("+P.ft+"/"+n+") · XP earned <b>"+P.xp+"</b>"+(P.late?" · Time ran out, so the maximum is 2 stars.":"")+(m.risk?" · Final risk level <b>"+P.risk+"%</b>":"")+"</p>"+(nw.length?"<p>🏅 New badge: <b>"+nw.map(function(b){return b[2]+" "+b[1]}).join(", ")+"</b></p>":"")+"<button class='btn' id='r1'>"+(nx?"Next mission":"View progress")+"</button><button class='btn s' id='r2'>Replay</button><button class='btn s' id='r3'>Missions</button></div>");
r1.onclick=function(){go(nx?function(){play(P.i+1)}:prog)};r2.onclick=function(){go(function(){play(P.i)})};r3.onclick=function(){go(missions)}}

function ach(){var h="<h2>Achievements</h2><div class='grid'>";
B.forEach(function(b){var u=S.b[b[0]];h+="<div class='st"+(u?"":" lock")+"'><div style='font-size:30px'>"+(u?b[2]:"🔒")+"</div><b style='font-size:15px'>"+b[1]+"</b><span class='sm'>"+b[3]+"</span></div>"});sel(h+"</div>")}

function prog(){var c=0,n=0,done=0;Object.keys(S.m).forEach(function(k){c+=S.m[k].c;n+=S.m[k].n;if(S.m[k].s>0)done++});
var str=[],rev=[];Object.keys(S.t).forEach(function(k){var t=S.t[k];if(t.miss>0)rev.push(k);else if(t.ok>0)str.push(k)});
var h="<h2>Learning progress</h2><div class='card'><div class='grid'><div class='st'><b>"+S.xp+"</b>XP</div><div class='st'><b>"+(n?Math.round(c/n*100):0)+"%</b>First-try accuracy</div><div class='st'><b>"+c+"/"+n+"</b>Correct first try</div><div class='st'><b>"+done+"/"+Ms.length+"</b>Missions done</div><div class='st'><b>"+Object.keys(S.b).length+"</b>Badges</div></div></div>";
h+="<div class='card'><h3>Mission results</h3>"+Ms.map(function(m,i){var r=S.m[i];return "<p>"+m.icon+" <b>"+m.n+"</b>: "+(r?stars(r.s)+" "+r.a+"%":"not completed")+"</p>"}).join("")+"</div>";
h+="<div class='card'><h3>Strengths</h3>"+(str.length?"<ul>"+str.map(function(k){return "<li>"+k+"</li>"}).join("")+"</ul>":"<p class='sm'>Complete missions to see your strengths.</p>")+"<h3>Recommended review</h3>"+(rev.length?"<ul>"+rev.map(function(k){return "<li><b>"+k+"</b>: "+TIP[k]+"</li>"}).join("")+"</ul>":"<p class='sm'>Nothing to review yet.</p>")+"</div><button class='btn s' id='rs'>Reset progress</button>";
sel(h);var c1=0;rs.onclick=function(){if(!c1){c1=1;rs.textContent="Tap again to confirm reset";return}S={xp:0,m:{},b:{},t:{}};save();go(menu)}}

head();menu();
})();
