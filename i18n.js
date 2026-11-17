/* ZEST APP – language (English default / Malayalam). */
(function () {
  var K = "zestLang";
  function get() { try { return localStorage.getItem(K); } catch (e) { return null; } }
  function put(v) { try { localStorage.setItem(K, v); } catch (e) {} }
  var lang = get() === "ml" ? "ml" : "en";
  var app = matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
  window.ZestLang = { get: function () { return lang; }, set: function (l) { put(l === "ml" ? "ml" : "en"); location.reload(); } };
  document.documentElement.setAttribute("data-lang", lang);

  var css = document.createElement("style");
  css.textContent =
    '.zlg{display:inline-flex;align-items:center;margin-left:auto;margin-right:10px;border:1.5px solid #1380b8;border-radius:999px;overflow:hidden;font:800 11px/1 Inter,"Noto Sans Malayalam",sans-serif;background:#fff;cursor:pointer;flex:none;padding:0!important;height:28px}' +
    '.zlg span{padding:0 9px;height:100%;display:flex;align-items:center;color:#0b5d8f}.zlg span.on{background:#1380b8;color:#fff}' +
    '@media (min-width:64rem){.zlg{margin:0 0 0 12px!important;align-self:center}html[data-lang=ml] #mn a,html[data-lang=ml] .zmh-nav a{font-size:.76rem!important;letter-spacing:0!important;padding-left:.5rem!important;padding-right:.5rem!important}}' +
    'html[data-lang=ml] .z3l{font-size:.82em!important;line-height:1.3!important;letter-spacing:0!important}html[data-lang=ml] .z3l small{font-size:.9em!important;letter-spacing:0!important}' +
    '#zlp{position:fixed;inset:0;z-index:2147483647;background:#fff;overflow-y:auto;font-family:Inter,"Noto Sans Malayalam",system-ui,sans-serif}' +
    '#zlp .tp{position:absolute;inset:0 0 auto;height:300px;background:linear-gradient(160deg,#0b5d8f,#1380b8 65%,#3fa7d6);border-radius:0 0 36px 36px;overflow:hidden}' +
    '#zlp .tp:before,#zlp .tp:after{content:"";position:absolute;border-radius:50%;background:rgba(255,255,255,.07)}#zlp .tp:before{width:220px;height:220px;right:-70px;top:-60px}#zlp .tp:after{width:150px;height:150px;left:-50px;bottom:-40px}' +
    '#zlp .in{position:relative;max-width:24rem;margin:0 auto;padding:calc(48px + env(safe-area-inset-top)) 16px 30px}' +
    '#zlp .hr{text-align:center;color:#fff}#zlp .hr img{height:62px}#zlp h3{margin:18px 0 4px;font-size:20px;font-weight:800}#zlp .hr p{margin:0;font-size:12.5px;opacity:.85}' +
    '#zlp .cd{margin-top:34px;background:#fff;border-radius:24px;padding:18px 16px 16px;box-shadow:0 14px 34px rgba(11,61,92,.16)}' +
    '#zlp .q{font-weight:800;font-size:14px;color:#0b3d5c}#zlp .qs{font-size:11.5px;color:#6a8796;margin:3px 0 14px;font-weight:500}' +
    '#zlp .ls{display:grid;grid-template-columns:1fr 1fr;gap:10px}' +
    '#zlp .o{position:relative;border:1.8px solid #dbe8f1;border-radius:18px;padding:16px 10px 13px;text-align:center;background:#f7fafc;cursor:pointer;font:inherit}' +
    '#zlp .gl{width:52px;height:52px;margin:0 auto 9px;border-radius:16px;display:grid;place-items:center;font-size:24px;font-weight:800;background:#e8f1f7;color:#5a7584}' +
    '#zlp .o b{display:block;font-size:15px;color:#14232c}#zlp .o small{font-size:11px;color:#7d93a0;font-weight:600}' +
    '#zlp .o.on{border-color:#1380b8;background:#eef7fd;box-shadow:0 0 0 4px rgba(19,128,184,.12)}#zlp .o.on .gl{background:linear-gradient(135deg,#0a70a8,#3fa7d6);color:#fff}' +
    '#zlp .tk{position:absolute;top:9px;right:9px;width:20px;height:20px;border-radius:50%;border:1.8px solid #cdddea;background:#fff;box-sizing:border-box}' +
    '#zlp .o.on .tk{border:0;background:#1380b8;color:#fff;font-size:12px;font-weight:800;display:grid;place-items:center}' +
    '#zlp .bt{display:block;width:100%;margin-top:16px;padding:14px;border:0;border-radius:15px;background:linear-gradient(135deg,#0a70a8,#3fa7d6);color:#fff;font:800 15px Inter,"Noto Sans Malayalam",sans-serif;box-shadow:0 8px 18px rgba(19,128,184,.3);cursor:pointer}' +
    '#zlp .nt{margin-top:12px;font-size:11px;color:#7d93a0;font-weight:600;text-align:center}#zlp .ft{margin-top:40px;text-align:center;font-size:10.5px;color:#9aaeb9;font-weight:600}#zlp .ft b{color:#0b5d8f}';
  document.head.appendChild(css);

  /* first open of the app: choose language (English selected) */
  if (app && !get()) {
    var T = {
      en: ["Welcome to ZEST APP", "Programs · Info · Jobs · Students", "🌐 Choose your language", "ഭാഷ തിരഞ്ഞെടുക്കുക", "Continue →", "⚙️ You can change this anytime in Settings"],
      ml: ["സ്വാഗതം 👋", "പരിപാടികൾ · അറിയിപ്പുകൾ · ജോലി · പഠനം", "🌐 ഭാഷ തിരഞ്ഞെടുക്കുക", "Choose your language", "തുടരുക →", "⚙️ പിന്നീട് Settings-ൽ മാറ്റാം"]
    };
    var pick = "en";
    var showP = function () {
      if (document.getElementById("zlp")) return;
      var p = document.createElement("div"); p.id = "zlp"; p.setAttribute("role", "dialog");
      p.innerHTML = '<div class="tp"></div><div class="in"><div class="hr"><img src="/media/logowhite-90f1572681.png" alt="ZEST for Peace"><h3></h3><p></p></div>' +
        '<div class="cd"><div class="q"></div><div class="qs"></div><div class="ls">' +
        '<button type="button" class="o" data-l="en"><span class="tk"></span><span class="gl">Aa</span><b>English</b><small>Default</small></button>' +
        '<button type="button" class="o" data-l="ml"><span class="tk"></span><span class="gl">അ</span><b>മലയാളം</b><small>Malayalam</small></button></div>' +
        '<button type="button" class="bt"></button><div class="nt"></div></div><div class="ft">by <b>ZEST for Peace</b>, Kodencheri</div></div>';
      var draw = function () {
        var t = T[pick];
        p.querySelector("h3").textContent = t[0]; p.querySelector(".hr p").textContent = t[1];
        p.querySelector(".q").textContent = t[2]; p.querySelector(".qs").textContent = t[3];
        p.querySelector(".bt").textContent = t[4]; p.querySelector(".nt").textContent = t[5];
        p.querySelectorAll(".o").forEach(function (o) { var on = o.dataset.l === pick; o.classList.toggle("on", on); o.querySelector(".tk").textContent = on ? "✓" : ""; });
      };
      p.querySelectorAll(".o").forEach(function (o) { o.onclick = function () { pick = o.dataset.l; draw(); }; });
      p.querySelector(".bt").onclick = function () { put(pick); if (pick === "ml") location.reload(); else p.remove(); };
      draw(); document.body.appendChild(p);
    };
    if (document.body) showP(); else document.addEventListener("DOMContentLoaded", showP);
  }

  /* header switch  മ | EN */
  function addSwitch() {
    if (document.querySelector(".zlg")) return;
    var bg = document.getElementById("bg") || document.getElementById("zmhb");
    if (!bg) return;
    var s = document.createElement("button"); s.type = "button"; s.className = "zlg"; s.setAttribute("aria-label", "Language");
    s.innerHTML = '<span class="' + (lang === "ml" ? "on" : "") + '">മ</span><span class="' + (lang === "en" ? "on" : "") + '">EN</span>';
    s.onclick = function () { window.ZestLang.set(lang === "ml" ? "en" : "ml"); };
    var nav = document.getElementById("mn") || document.getElementById("zmhn");
    var place = function () { if (matchMedia("(min-width:64rem)").matches && nav) { if (s.parentNode !== nav) nav.appendChild(s); } else if (s.nextSibling !== bg) bg.parentNode.insertBefore(s, bg); };
    place(); addEventListener("resize", place);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", addSwitch); else addSwitch();

  if (lang !== "ml") return;

  /* Malayalam: translate interface text */
  var D = {"no spending added yet.":"ഇതുവരെ ചെലവുകളൊന്നും ചേർത്തിട്ടില്ല.","tap":"പണം ചെലവാക്കുമ്പോൾ","when you spend money.":"അമർത്തൂ.","left":"ബാക്കി","day-by-day study plan till your exam": "പരീക്ഷ വരെ ദിവസവും എന്ത് പഠിക്കണമെന്ന പ്ലാൻ", "track spending & save for goals": "ചെലവ് നോക്കാം, ലക്ഷ്യത്തിനായി സൂക്ഷിക്കാം", "my timetable": "എന്റെ ടൈംടേബിൾ", "read more about zest": "ZEST-നെ കുറിച്ച് കൂടുതൽ", "view more details": "കൂടുതൽ വിവരങ്ങൾ കാണൂ", "follow us on instagram": "ഇൻസ്റ്റഗ്രാമിൽ ഫോളോ ചെയ്യൂ", "zest projects": "ZEST പദ്ധതികൾ","program date:":"പ്രോഗ്രാം തീയതി:","last date:":"അവസാന തീയതി:","install zest app": "ZEST APP ഇൻസ്റ്റാൾ ചെയ്യൂ", "install": "ഇൻസ്റ്റാൾ ചെയ്യൂ", "download": "ഡൗൺലോഡ് ചെയ്യൂ", "get the zest app": "ZEST APP നേടൂ", "open zest app": "ZEST APP തുറക്കൂ", "more details": "കൂടുതൽ വിവരങ്ങൾ", "🔔 remind me": "🔔 ഓർമ്മിപ്പിക്കൂ", "remind me": "ഓർമ്മിപ്പിക്കൂ", "apply now": "ഇപ്പോൾ അപേക്ഷിക്കൂ", "⤢ full poster": "⤢ പോസ്റ്റർ മുഴുവൻ കാണാം", "full poster": "പോസ്റ്റർ മുഴുവൻ കാണാം", "call": "വിളിക്കൂ", "whatsapp": "വാട്സ്ആപ്പ്", "share": "ഷെയർ ചെയ്യൂ", "follow on instagram →": "ഇൻസ്റ്റഗ്രാമിൽ ഫോളോ ചെയ്യൂ →", "register": "രജിസ്റ്റർ ചെയ്യൂ", "login": "ലോഗിൻ", "login now": "ഇപ്പോൾ ലോഗിൻ ചെയ്യൂ", "submit": "സമർപ്പിക്കൂ", "turn on": "ഓൺ ചെയ്യൂ", "not now": "പിന്നീട്", "save": "സേവ് ചെയ്യൂ", "close": "അടയ്ക്കൂ", "delete": "ഡിലീറ്റ് ചെയ്യൂ", "start ›": "തുടങ്ങാം ›", "continue →": "തുടരുക →", "open the website instead →": "പകരം വെബ്സൈറ്റ് തുറക്കൂ →", "← back": "← തിരികെ", "back": "തിരികെ", "home": "ഹോം", "about zest": "ZEST-നെ കുറിച്ച്", "about us": "ഞങ്ങളെ കുറിച്ച്", "our projects": "ഞങ്ങളുടെ പദ്ധതികൾ", "zest clubs": "ZEST ക്ലബ്ബുകൾ", "documentary": "ഡോക്യുമെന്ററി", "events": "പരിപാടികൾ", "zest service centre": "ZEST സേവന കേന്ദ്രം", "zest programs": "ZEST പ്രോഗ്രാമുകൾ", "info centre": "അറിയിപ്പുകൾ", "job updates": "ജോലി ഒഴിവുകൾ", "students corner": "വിദ്യാർത്ഥി കോർണർ", "join with zest": "ZEST-നൊപ്പം ചേരാം", "settings": "ക്രമീകരണങ്ങൾ", "main menu": "പ്രധാന മെനു", "this week": "ഈ ആഴ്ച", "tap a button to filter": "തിരഞ്ഞെടുക്കാൻ ഒരു ബട്ടൺ അമർത്തൂ", "zest upcoming programs": "വരാനിരിക്കുന്ന ZEST പ്രോഗ്രാമുകൾ", "job connect": "ജോലി ഒഴിവുകൾ", "important details": "പ്രധാന വിവരങ്ങൾ", "new": "പുതിയത്", "job update": "ജോലി ഒഴിവ്", "today": "ഇന്ന്", "tomorrow": "നാളെ", "days left": "ദിവസം ബാക്കി", "last date": "അവസാന തീയതി", "completed": "കഴിഞ്ഞു", "closed": "അവസാനിച്ചു", "posted": "പോസ്റ്റ് ചെയ്തത്", "days ago": "ദിവസം മുമ്പ്", "run by": "നടത്തുന്നത്", "copy this link:": "ഈ ലിങ്ക് കോപ്പി ചെയ്യൂ:", "⚙️ settings": "⚙️ ക്രമീകരണങ്ങൾ", "zest app settings": "ZEST APP ക്രമീകരണങ്ങൾ", "language": "ഭാഷ", "choose app language": "ആപ്പിന്റെ ഭാഷ തിരഞ്ഞെടുക്കുക", "notifications": "അറിയിപ്പുകൾ", "🔔 notification settings": "🔔 അറിയിപ്പ് ക്രമീകരണങ്ങൾ", "notification settings": "അറിയിപ്പ് ക്രമീകരണങ്ങൾ", "choose which updates you want to receive": "ഏതൊക്കെ അറിയിപ്പുകൾ വേണമെന്ന് തിരഞ്ഞെടുക്കൂ", "all on by default · tap to turn off": "എല്ലാം ഓൺ ആണ് · ഓഫ് ആക്കാൻ ടാപ്പ് ചെയ്യൂ", "turn on notifications?": "അറിയിപ്പുകൾ ഓൺ ചെയ്യട്ടെ?", "get new programs, info & job updates": "പുതിയ പ്രോഗ്രാമുകൾ, അറിയിപ്പുകൾ, ജോലി ഒഴിവുകൾ അറിയാം", "you will receive zest updates": "ZEST അറിയിപ്പുകൾ നിങ്ങൾക്ക് ലഭിക്കും", "✓ on": "✓ ഓൺ", "on": "ഓൺ", "blocked": "തടഞ്ഞിരിക്കുന്നു", "allow notifications for zest app in phone settings": "ഫോൺ സെറ്റിംഗ്സിൽ ZEST APP-ന് അറിയിപ്പുകൾ അനുവദിക്കൂ", "this phone does not support notifications": "ഈ ഫോണിൽ അറിയിപ്പുകൾ ലഭ്യമല്ല", "reminders": "ഓർമ്മപ്പെടുത്തലുകൾ", "✓ saved": "✓ സേവ് ചെയ്തു", "saved": "സേവ് ചെയ്തു", "could not save – check internet": "സേവ് ചെയ്യാനായില്ല – ഇന്റർനെറ്റ് പരിശോധിക്കൂ", "saving…": "സേവ് ചെയ്യുന്നു…", "notifications work in the zest app": "അറിയിപ്പുകൾ ZEST APP-ൽ മാത്രം", "🔔 when should we remind you?": "🔔 എപ്പോൾ ഓർമ്മിപ്പിക്കണം?", "when should we remind you?": "എപ്പോൾ ഓർമ്മിപ്പിക്കണം?", "the day before": "തലേദിവസം", "on the day morning": "അന്ന് രാവിലെ", "3 days before last date": "അവസാന തീയതിക്ക് 3 ദിവസം മുമ്പ്", "1 day before last date": "അവസാന തീയതിക്ക് 1 ദിവസം മുമ്പ്", "on the last date": "അവസാന തീയതിയിൽ", "passed": "കഴിഞ്ഞു", "save reminder": "ഓർമ്മപ്പെടുത്തൽ സേവ് ചെയ്യൂ", "remove reminder": "ഓർമ്മപ്പെടുത്തൽ ഒഴിവാക്കൂ", "✓ reminder set": "✓ ഓർമ്മപ്പെടുത്തൽ സെറ്റ് ചെയ്തു", "reminder set": "ഓർമ്മപ്പെടുത്തൽ സെറ്റ് ചെയ്തു", "reminder removed": "ഓർമ്മപ്പെടുത്തൽ ഒഴിവാക്കി", "reminders work in the zest app": "ഓർമ്മപ്പെടുത്തൽ ZEST APP-ൽ മാത്രം", "install the app to get a reminder on your phone": "ഫോണിൽ ഓർമ്മപ്പെടുത്തൽ കിട്ടാൻ ആപ്പ് ഇൻസ്റ്റാൾ ചെയ്യൂ", "🎓 students corner": "🎓 വിദ്യാർത്ഥി കോർണർ", "free study tools in the zest app": "ZEST APP-ലെ സൗജന്യ പഠന ടൂളുകൾ", "study tools for students – only in the zest app": "വിദ്യാർത്ഥികൾക്കുള്ള പഠന ടൂളുകൾ – ZEST APP-ൽ മാത്രം", "install it free to use students corner": "വിദ്യാർത്ഥി കോർണർ ഉപയോഗിക്കാൻ സൗജന്യമായി ഇൻസ്റ്റാൾ ചെയ്യൂ", "what's inside": "ഇതിൽ എന്തൊക്കെ", "coming soon": "ഉടൻ വരുന്നു", "timetable": "ടൈംടേബിൾ", "homework": "ഹോംവർക്ക്", "focus timer": "ഫോക്കസ് ടൈമർ", "who's studying?": "ആരാണ് പഠിക്കുന്നത്?", "start here": "ഇവിടെ തുടങ്ങാം", "add your name to get your own study space. brothers and sisters can each add their own name too.": "സ്വന്തം പഠന ഇടം കിട്ടാൻ പേര് ചേർക്കൂ. സഹോദരങ്ങൾക്കും അവരുടെ പേര് ചേർക്കാം.", "add student": "വിദ്യാർത്ഥിയെ ചേർക്കൂ", "brother / sister": "സഹോദരൻ / സഹോദരി", "tap to begin": "തുടങ്ങാൻ ടാപ്പ് ചെയ്യൂ", "hi": "ഹായ്", "your own study space": "നിങ്ങളുടെ സ്വന്തം പഠന ഇടം", "switch student": "വിദ്യാർത്ഥിയെ മാറ്റൂ", "✓ now": "✓ ഇപ്പോൾ", "now": "ഇപ്പോൾ", "⚙️ edit my profile · set pin": "⚙️ പ്രൊഫൈൽ മാറ്റൂ · PIN സെറ്റ് ചെയ്യൂ", "edit my profile · set pin": "പ്രൊഫൈൽ മാറ്റൂ · PIN സെറ്റ് ചെയ്യൂ", "⚙️ edit profile": "⚙️ പ്രൊഫൈൽ മാറ്റൂ", "edit profile": "പ്രൊഫൈൽ മാറ്റൂ", "name": "പേര്", "e.g. plus two / class 9": "ഉദാ: പ്ലസ് ടു / 9-ാം ക്ലാസ്", "class (optional)": "ക്ലാസ് (നിർബന്ധമില്ല)", "picture": "ചിത്രം", "pin protected": "PIN ഉണ്ട്", "🔒 set pin": "🔒 PIN സെറ്റ് ചെയ്യൂ", "set pin": "PIN സെറ്റ് ചെയ്യൂ", "🔓 remove pin": "🔓 PIN ഒഴിവാക്കൂ", "remove pin": "PIN ഒഴിവാക്കൂ", "enter your 4-digit pin": "4 അക്ക PIN നൽകൂ", "choose a 4-digit pin": "4 അക്ക PIN തിരഞ്ഞെടുക്കൂ", "enter the same pin again": "അതേ PIN വീണ്ടും നൽകൂ", "pins did not match – try again": "PIN ഒത്തുവന്നില്ല – വീണ്ടും ശ്രമിക്കൂ", "wrong pin – try again": "PIN തെറ്റാണ് – വീണ്ടും ശ്രമിക്കൂ", "enter current pin to remove it": "ഒഴിവാക്കാൻ ഇപ്പോഴത്തെ PIN നൽകൂ", "please enter the name": "പേര് നൽകൂ", "delete this profile? their revision plan and pocket money on this phone will also be deleted.": "ഈ പ്രൊഫൈൽ ഡിലീറ്റ് ചെയ്യട്ടെ? ഈ ഫോണിലെ റിവിഷൻ പ്ലാനും പോക്കറ്റ് മണിയും ഡിലീറ്റ് ആകും.", "📖 revision planner": "📖 റിവിഷൻ പ്ലാനർ", "revision planner": "റിവിഷൻ പ്ലാനർ", "daily chapters till exam": "പരീക്ഷ വരെ ദിവസവും പഠിക്കേണ്ട അധ്യായങ്ങൾ", "make your study plan": "പഠന പ്ലാൻ ഉണ്ടാക്കൂ", "📖 new revision plan": "📖 പുതിയ റിവിഷൻ പ്ലാൻ", "new revision plan": "പുതിയ റിവിഷൻ പ്ലാൻ", "1 · exam": "1 · പരീക്ഷ", "exam name": "പരീക്ഷയുടെ പേര്", "exam date": "പരീക്ഷാ തീയതി", "2 · subjects & chapters": "2 · വിഷയങ്ങളും അധ്യായങ്ങളും", "e.g. plus two model exam": "ഉദാ: പ്ലസ് ടു മോഡൽ പരീക്ഷ", "subject": "വിഷയം", "e.g. physics": "ഉദാ: ഫിസിക്സ്", "e.g. 3, 7, 11": "ഉദാ: 3, 7, 11", "chapters": "അധ്യായങ്ങൾ", "⭐ hard chapters (optional)": "⭐ പ്രയാസമുള്ള അധ്യായങ്ങൾ (നിർബന്ധമില്ല)", "hard chapters (optional)": "പ്രയാസമുള്ള അധ്യായങ്ങൾ (നിർബന്ധമില്ല)", "＋ add subject": "＋ വിഷയം ചേർക്കൂ", "add subject": "വിഷയം ചേർക്കൂ", "3 · study time per day": "3 · ദിവസവും പഠിക്കുന്ന സമയം", "hr": "മണിക്കൂർ", "hrs": "മണിക്കൂർ", "day off (optional)": "അവധി ദിവസം (നിർബന്ധമില്ല)", "none": "ഇല്ല", "other": "മറ്റുള്ളവ", "✨ make my plan": "✨ എന്റെ പ്ലാൻ ഉണ്ടാക്കൂ", "make my plan": "എന്റെ പ്ലാൻ ഉണ്ടാക്കൂ", "chapters done": "പൂർത്തിയായ അധ്യായങ്ങൾ", "chapters / day": "അധ്യായം / ദിവസം", "revision days": "റിവിഷൻ ദിവസങ്ങൾ", "today: full revision 🔁": "ഇന്ന്: മുഴുവൻ റിവിഷൻ 🔁", "revise all chapters": "എല്ലാ അധ്യായങ്ങളും റിവൈസ് ചെയ്യൂ", "😌 today is your day off. rest well!": "😌 ഇന്ന് അവധിയാണ്. നന്നായി വിശ്രമിക്കൂ!", "today is your day off. rest well!": "ഇന്ന് അവധിയാണ്. നന്നായി വിശ്രമിക്കൂ!", "ch.": "അധ്യായം", "⭐ hard": "⭐ പ്രയാസം", "hard": "പ്രയാസം", "🎉 all chapters are done. use the time for revision!": "🎉 എല്ലാ അധ്യായങ്ങളും കഴിഞ്ഞു. ബാക്കി സമയം റിവിഷന്!", "all chapters are done. use the time for revision!": "എല്ലാ അധ്യായങ്ങളും കഴിഞ്ഞു. ബാക്കി സമയം റിവിഷന്!", "coming up": "അടുത്തത്", "✏️ edit plan": "✏️ പ്ലാൻ മാറ്റൂ", "edit plan": "പ്ലാൻ മാറ്റൂ", "🗑 delete plan": "🗑 പ്ലാൻ ഡിലീറ്റ് ചെയ്യൂ", "delete plan": "പ്ലാൻ ഡിലീറ്റ് ചെയ്യൂ", "plan updated ✓": "പ്ലാൻ പുതുക്കി ✓", "exam is over 🎉": "പരീക്ഷ കഴിഞ്ഞു 🎉", "please enter the exam name": "പരീക്ഷയുടെ പേര് നൽകൂ", "please choose an exam date in the future": "വരാനിരിക്കുന്ന ഒരു പരീക്ഷാ തീയതി തിരഞ്ഞെടുക്കൂ", "add at least one subject with number of chapters": "അധ്യായങ്ങളുടെ എണ്ണത്തോടെ ഒരു വിഷയമെങ്കിലും ചേർക്കൂ", "delete this revision plan?": "ഈ റിവിഷൻ പ്ലാൻ ഡിലീറ്റ് ചെയ്യട്ടെ?", "💰 pocket money": "💰 പോക്കറ്റ് മണി", "pocket money": "പോക്കറ്റ് മണി", "track spending & savings": "ചെലവും സമ്പാദ്യവും നോക്കാം", "＋ got money": "＋ പണം കിട്ടി", "got money": "പണം കിട്ടി", "＋ money spent": "＋ പണം ചെലവാക്കി", "money spent": "പണം ചെലവാക്കി", "＋ spent": "＋ ചെലവാക്കി", "spent": "ചെലവാക്കി", "got": "കിട്ടിയത്", "left for this month": "ഈ മാസം ബാക്കി", "amount": "തുക", "from (optional)": "ആരിൽ നിന്ന് (നിർബന്ധമില്ല)", "note (optional)": "കുറിപ്പ് (നിർബന്ധമില്ല)", "⚠️ you have spent all your money this month": "⚠️ ഈ മാസത്തെ പണം മുഴുവൻ ചെലവായി", "you have spent all your money this month": "ഈ മാസത്തെ പണം മുഴുവൻ ചെലവായി", "where it went": "പണം പോയ വഴി", "tap ＋ spent when you spend money.": "പണം ചെലവാക്കുമ്പോൾ ＋ ചെലവാക്കി അമർത്തൂ.", "savings goals": "സമ്പാദ്യ ലക്ഷ്യങ്ങൾ", "🎯 new savings goal": "🎯 പുതിയ സമ്പാദ്യ ലക്ഷ്യം", "new savings goal": "പുതിയ സമ്പാദ്യ ലക്ഷ്യം", "what are you saving for?": "എന്തിനാണ് പണം സൂക്ഷിക്കുന്നത്?", "target amount": "ലക്ഷ്യ തുക", "create goal": "ലക്ഷ്യം ഉണ്ടാക്കൂ", "＋ new goal": "＋ പുതിയ ലക്ഷ്യം", "new goal": "പുതിയ ലക്ഷ്യം", "＋ add": "＋ ചേർക്കൂ", "add": "ചേർക്കൂ", "add to savings": "സമ്പാദ്യത്തിൽ ചേർക്കൂ", "target": "ലക്ഷ്യം", "to go": "ഇനി വേണം", "🎉 goal reached!": "🎉 ലക്ഷ്യം നേടി!", "goal reached!": "ലക്ഷ്യം നേടി!", "saving for something? make a goal and watch it grow 🎯": "എന്തിനെങ്കിലും പണം സൂക്ഷിക്കുന്നുണ്ടോ? ഒരു ലക്ഷ്യം വെക്കൂ 🎯", "history": "പഴയ കണക്കുകൾ", "nothing here yet.": "ഇവിടെ ഇതുവരെ ഒന്നുമില്ല.", "last 4 months": "കഴിഞ്ഞ 4 മാസം", "this month": "ഈ മാസം", "next month": "അടുത്ത മാസം", "today,": "ഇന്ന്,", "yesterday": "ഇന്നലെ", "please enter the amount": "തുക നൽകൂ", "please enter what you are saving for": "എന്തിനാണ് സൂക്ഷിക്കുന്നതെന്ന് നൽകൂ", "please enter the target amount": "ലക്ഷ്യ തുക നൽകൂ", "delete this goal? money added stays in history.": "ഈ ലക്ഷ്യം ഡിലീറ്റ് ചെയ്യട്ടെ? ചേർത്ത പണം കണക്കിൽ ഉണ്ടാകും.", "delete this entry?": "ഇത് ഡിലീറ്റ് ചെയ്യട്ടെ?", "bus": "ബസ്", "snacks": "പലഹാരം", "books": "പുസ്തകം", "recharge": "റീചാർജ്", "gifts": "സമ്മാനം", "savings": "സമ്പാദ്യം", "e.g. headphones": "ഉദാ: ഹെഡ്ഫോൺ", "note (optional) – e.g. juice": "കുറിപ്പ് (നിർബന്ധമില്ല) – ഉദാ: ജ്യൂസ്", "get zest app": "ZEST APP നേടൂ", "download the app for a better experience": "കൂടുതൽ സൗകര്യത്തിന് ആപ്പ് ഡൗൺലോഡ് ചെയ്യൂ", "zest app sign in": "ZEST APP ലോഗിൻ", "forgot login?": "ലോഗിൻ മറന്നോ?", "show my login": "എന്റെ ലോഗിൻ കാണിക്കൂ", "← back to login": "← ലോഗിനിലേക്ക് തിരികെ", "back to login": "ലോഗിനിലേക്ക് തിരികെ", "username": "യൂസർനെയിം", "password": "പാസ്‌വേഡ്", "class / course (if student)": "ക്ലാസ് / കോഴ്സ് (വിദ്യാർത്ഥിയാണെങ്കിൽ)", "choose": "തിരഞ്ഞെടുക്കൂ", "your details are kept by zest for peace for membership and are not shown publicly.": "നിങ്ങളുടെ വിവരങ്ങൾ അംഗത്വത്തിനായി ZEST for Peace സൂക്ഷിക്കും, പൊതുവായി കാണിക്കില്ല.", "registration complete ✓": "രജിസ്ട്രേഷൻ പൂർത്തിയായി ✓", "you stay logged in on this phone.": "ഈ ഫോണിൽ ലോഗിൻ ആയിത്തന്നെ ഇരിക്കും.", "save login details to my whatsapp (optional)": "ലോഗിൻ വിവരങ്ങൾ എന്റെ വാട്സ്ആപ്പിൽ സേവ് ചെയ്യൂ (നിർബന്ധമില്ല)", "download zest app": "ZEST APP ഡൗൺലോഡ് ചെയ്യൂ", "the official app of zest for peace, kodencheri. free for android and iphone.": "ZEST for Peace, കോടഞ്ചേരിയുടെ ഔദ്യോഗിക ആപ്പ്. ആൻഡ്രോയിഡിലും ഐഫോണിലും സൗജന്യം.", "zest app is installed. open it from your home screen.": "ZEST APP ഇൻസ്റ്റാൾ ആയി. ഹോം സ്ക്രീനിൽ നിന്ന് തുറക്കൂ.", "tap share → add to home screen": "Share അമർത്തി → Add to Home Screen തിരഞ്ഞെടുക്കൂ", "tap chrome's menu ⋮ → install app": "Chrome-ലെ ⋮ മെനു → Install app അമർത്തൂ", "sunday": "ഞായർ", "sun": "ഞായർ", "monday": "തിങ്കൾ", "mon": "തിങ്കൾ", "tuesday": "ചൊവ്വ", "tue": "ചൊവ്വ", "wednesday": "ബുധൻ", "wed": "ബുധൻ", "thursday": "വ്യാഴം", "thu": "വ്യാഴം", "friday": "വെള്ളി", "fri": "വെള്ളി", "saturday": "ശനി", "sat": "ശനി", "january": "ജനുവരി", "jan": "ജനുവരി", "february": "ഫെബ്രുവരി", "feb": "ഫെബ്രുവരി", "march": "മാർച്ച്", "mar": "മാർച്ച്", "april": "ഏപ്രിൽ", "apr": "ഏപ്രിൽ", "may": "മേയ്", "june": "ജൂൺ", "jun": "ജൂൺ", "july": "ജൂലൈ", "jul": "ജൂലൈ", "august": "ഓഗസ്റ്റ്", "aug": "ഓഗസ്റ്റ്", "september": "സെപ്റ്റംബർ", "sep": "സെപ്റ്റംബർ", "october": "ഒക്ടോബർ", "oct": "ഒക്ടോബർ", "november": "നവംബർ", "nov": "നവംബർ", "december": "ഡിസംബർ", "dec": "ഡിസംബർ", "am": "രാവിലെ / വൈകിട്ട്", "pm": "രാവിലെ / വൈകിട്ട്", "get notifications & reminders": "അറിയിപ്പുകളും ഓർമ്മപ്പെടുത്തലുകളും നേടൂ", "on · choose topics": "ഓൺ · വിഷയങ്ങൾ തിരഞ്ഞെടുക്കൂ", "topics can be chosen inside the zest app": "വിഷയങ്ങൾ ZEST APP-ൽ തിരഞ്ഞെടുക്കാം", "notifications are blocked – allow them in phone settings": "അറിയിപ്പുകൾ തടഞ്ഞിരിക്കുന്നു – ഫോൺ സെറ്റിംഗ്സിൽ അനുവദിക്കൂ", "please allow notifications": "അറിയിപ്പുകൾ അനുവദിക്കൂ", "day before": "തലേദിവസം", "morning": "രാവിലെ", "3 days before": "3 ദിവസം മുമ്പ്", "last day": "അവസാന ദിവസം", "not supported": "ലഭ്യമല്ല", "add to": "ചേർക്കൂ:", "show more": "കൂടുതൽ കാണൂ", "show less": "കുറച്ച് കാണൂ", "checking…": "പരിശോധിക്കുന്നു…", "zest centre info": "ZEST സേവന കേന്ദ്രം", "projects": "പദ്ധതികൾ", "clubs": "ക്ലബ്ബുകൾ"};
  var MON = { jan: "ജനു", feb: "ഫെബ്രു", mar: "മാർ", apr: "ഏപ്രി", may: "മേയ്", jun: "ജൂൺ", jul: "ജൂലൈ", aug: "ഓഗ", sep: "സെപ്", oct: "ഒക്ടോ", nov: "നവം", dec: "ഡിസം" };
  var LBL = { week: "ഈ<small>ആഴ്ച</small>", program: "ZEST<small>പ്രോഗ്രാം</small>", info: "അറിയിപ്പ്<small>കേന്ദ്രം</small>", job: "ജോലി<small>ഒഴിവുകൾ</small>" };
  var RX = [
    [/^(\d+) days? left$/i, "$1 ദിവസം ബാക്കി"], [/^(\d+) days? ago$/i, "$1 ദിവസം മുമ്പ്"],
    [/^Hi (.+?)( 👋)?$/, "ഹായ് $1 👋"], [/^Add to (.+)$/, "$1-ലേക്ക് ചേർക്കൂ"],
    [/^(\d+) hrs?$/, "$1 മണിക്കൂർ"],
    [/^(.+) · your own study space$/, "$1 · നിങ്ങളുടെ സ്വന്തം പഠന ഇടം"],
    [/^(JANUARY|FEBRUARY|MARCH|APRIL|MAY|JUNE|JULY|AUGUST|SEPTEMBER|OCTOBER|NOVEMBER|DECEMBER|JAN|FEB|MAR|APR|JUN|JUL|AUG|SEP|OCT|NOV|DEC)( \d{4})$/i, function (m, a, y) { return (D[a.toLowerCase()] || MON[a.slice(0, 3).toLowerCase()]) + y; }], [/^Today · (.+)$/, "ഇന്ന് · $1"], [/^Target (.+)$/, "ലക്ഷ്യം $1"],
    [/^(.+) saved$/, "$1 സൂക്ഷിച്ചു"], [/^(.+) to go$/, "ഇനി $1 വേണം"], [/^Today, (.+)$/, "ഇന്ന്, $1"],
    [/^(.+) · Ch\. (\d+)$/, "$1 · അധ്യായം $2"], [/^✓ Reminder set · (.+)$/, "✓ ഓർമ്മപ്പെടുത്തൽ സെറ്റ് ചെയ്തു · $1"],
    [/^(\d{1,2}) (JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\b(.*)$/i, function (m, a, b, c) { return a + " " + MON[b.toLowerCase()] + c; }]
  ];
  function tr(s) {
    var k = s.replace(/\s+/g, " ").trim(); if (!k || /[ഀ-ൿ]/.test(k)) return null;
    var v = one(k); if (v != null) return v;
    var m = k.match(/^([^A-Za-z0-9]+)(.*?)([^A-Za-z0-9.?!)%]*)$/);
    if (m && m[2]) { v = one(m[2]); if (v != null) return m[1] + v + m[3]; }
    return null;
  }
  function one(k) {
    var v = D[k.toLowerCase()]; if (v) return v;
    for (var i = 0; i < RX.length; i++) if (RX[i][0].test(k)) return k.replace(RX[i][0], RX[i][1]);
    return null;
  }
  var SKIP = /^(SCRIPT|STYLE|TEXTAREA|INPUT|CODE|svg)$/i;
  var NOT = ".zbody,.pbody,.ptext,.ptx,.z3k .tx,[data-noi18n],#zgate";
  function walk(root) {
    if (!root || root.nodeType !== 1 && root.nodeType !== 3) return;
    if (root.nodeType === 3) return node(root);
    if (SKIP.test(root.nodeName) || root.closest && root.closest(NOT)) return;
    if (root.classList && root.classList.contains("z3l")) { var b = root.closest(".z3c"); if (b && LBL[b.dataset.k] && !root.dataset.ml) { root.dataset.ml = 1; root.innerHTML = LBL[b.dataset.k]; } return; }
    if (root.placeholder) { var p = tr(root.placeholder); if (p) root.placeholder = p; }
    var c = root.childNodes; for (var i = 0; i < c.length; i++) walk(c[i]);
  }
  function node(t) {
    var par = t.parentNode; if (!par || SKIP.test(par.nodeName) || par.closest && par.closest(NOT)) return;
    var v = tr(t.nodeValue); if (v != null) { var m = t.nodeValue.match(/^(\s*)[\s\S]*?(\s*)$/); t.nodeValue = m[1] + v + m[2]; }
  }
  function ph(root) { if (root.querySelectorAll) root.querySelectorAll("input[placeholder],textarea[placeholder]").forEach(function (e) { var p = tr(e.placeholder); if (p) e.placeholder = p; }); }
  function run(r) { walk(r); ph(r); }
  function start() {
    document.documentElement.lang = "ml";
    run(document.body);
    new MutationObserver(function (ms) {
      ms.forEach(function (m) {
        if (m.type === "characterData") node(m.target);
        else m.addedNodes.forEach(function (n) { run(n); });
      });
    }).observe(document.body, { childList: true, subtree: true, characterData: true });
  }
  if (document.body) start(); else document.addEventListener("DOMContentLoaded", start);
})();
