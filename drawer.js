/* ZEST: slide-in side menu for mobile (built from the existing nav links) */
(function () {
  if (window.ZestDrawer) return;
  var btn = document.getElementById("bg") || document.getElementById("zmhb");
  var nav = document.getElementById("mn") || document.getElementById("zmhn");
  if (!btn || !nav) return;
  var LOGO = "/media/logowhite-90f1572681.png";
  var I = {
    home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
    info: '<path d="M4 10v4a1 1 0 0 0 1 1h2l5 4V5L7 9H5a1 1 0 0 0-1 1Z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11"/>',
    about: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
    proj: '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
    clubs: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.6"/><path d="M15.5 14.2A5 5 0 0 1 21 19"/>',
    doc: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 9.5v5l4.5-2.5Z"/>',
    join: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/>',
    stu: '<path d="M2 9l10-5 10 5-10 5Z"/><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/>',
    set: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/>',
    ev: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/><path d="M12 13.5l1 2 2.2.3-1.6 1.5.4 2.2-2-1.1-2 1.1.4-2.2-1.6-1.5 2.2-.3Z"/>',
    cal: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4M8 14h3M8 17h6"/>',
    job: '<rect x="3" y="7" width="18" height="13" rx="3"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',
    dot: '<circle cx="12" cy="12" r="3"/>'
  };
  function icon(h) {
    if (/#top$/.test(h)) return I.home; if (/centre-?info/.test(h)) return I.info; if (/#about$/.test(h)) return I.about;
    if (/#programs$/.test(h)) return I.proj; if (/#clubs$/.test(h)) return I.clubs; if (/#documentary$/.test(h)) return I.doc;
    if (/#join$/.test(h)) return I.join; if (/#students$/.test(h)) return I.stu; if (/#settings$/.test(h)) return I.set; return I.dot;
  }
  var css = document.createElement("style");
  css.textContent = '.zdw-bg{position:fixed;inset:0;z-index:2147483600;background:rgba(10,25,40,.45);opacity:0;visibility:hidden;transition:opacity .28s,visibility .28s}.zdw-bg.on{opacity:1;visibility:visible}' +
    '.zdw{position:fixed;z-index:2147483601;top:0;right:0;bottom:0;width:min(78vw,19rem);background:#fff;border-radius:26px 0 0 26px;box-shadow:-12px 0 40px rgba(10,40,70,.25);transform:translateX(105%);transition:transform .32s cubic-bezier(.2,.8,.25,1);display:flex;flex-direction:column;overflow:hidden;font-family:Inter,"Plus Jakarta Sans",sans-serif}.zdw.on{transform:none}.zdw *{box-sizing:border-box}' +
    '.zdw-sc{flex:1;overflow:auto;padding:14px 12px 14px;-webkit-overflow-scrolling:touch}' +
    '.zdw-hd{position:relative;padding:16px 14px;border-radius:20px;background:linear-gradient(140deg,#1a8ac4 0%,#0b5d8f 55%,#0b3d5c 100%);box-shadow:0 12px 26px rgba(11,61,92,.3);text-align:center;overflow:hidden}.zdw-hd::after{content:"";position:absolute;right:-40px;top:-40px;width:150px;height:150px;border-radius:50%;background:rgba(255,255,255,.08)}' +
    '.zdw-hd img{position:relative;z-index:1;display:block;height:50px;width:auto;margin:0 auto}.zdw-hd .tg{position:relative;z-index:1;display:block;margin-top:10px;font:700 13px/1.3 "Noto Sans Malayalam",Inter,sans-serif;color:#d8eefa}' +
    '.zdw-x{position:absolute;z-index:2;top:8px;right:8px;width:28px;height:28px;font-size:13px!important;border-radius:50%;border:0;background:rgba(255,255,255,.18);color:#fff;font:700 16px/1 Inter,sans-serif;cursor:pointer}' +
    '.zdw .zdw-ls{position:static!important;transform:none!important;opacity:1!important;visibility:visible!important;max-height:none!important;height:auto!important;width:auto!important;background:none!important;box-shadow:none!important;padding:0!important;display:flex!important;flex-direction:column;gap:8px;margin-top:12px}' +
    '.zdw-ls a{margin:0!important;width:auto!important;display:flex!important;align-items:center;gap:12px;min-height:46px;padding:9px 14px;border-radius:15px;border:1.5px solid #e2ecf3;background:#fff;color:#14232c!important;text-decoration:none;font:600 13px/1.2 Inter,sans-serif;letter-spacing:.03em;box-shadow:0 2px 6px rgba(11,61,92,.04);transition:background .2s,border-color .2s,transform .15s;-webkit-tap-highlight-color:transparent}' +
    '.zdw-ls a:active{transform:scale(.98);background:#f2f8fc}' +
    '.zdw-ls a svg{width:20px;height:20px;flex:none;fill:none;stroke:#1380b8;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}' +
    '.zdw-ls a.cur{background:#eef6fb;border-color:#9ec9e2}' +
    '.zdw-ls a.zdw-hl{background:linear-gradient(135deg,#0a70a8,#3fa7d6);border-color:transparent;color:#fff!important;box-shadow:0 8px 18px rgba(10,112,168,.3)}.zdw-ls a.zdw-hl svg{stroke:#ffc44d}' +
    '.zdw-ls a.zdw-bl{color:#1380b8!important;font-weight:700}' +
    '.zdw-ft{padding:10px 14px 14px;text-align:center;font:700 10px Inter,sans-serif;color:#8aa0ad;letter-spacing:.04em}.zdw-ft b{display:block;margin-top:3px;font:800 11.5px Inter,sans-serif;color:#0b5d8f;letter-spacing:.02em}' +
    '.zdw-gp{border-radius:15px;border:1.5px solid #e2ecf3;background:#fff;box-shadow:0 2px 6px rgba(11,61,92,.04);overflow:hidden}.zdw-gh{display:flex;align-items:center;gap:12px;width:100%;min-height:46px;padding:9px 14px;border:0;background:none;color:#14232c;font:600 13px/1.2 Inter,sans-serif;letter-spacing:.03em;text-align:left;cursor:pointer;-webkit-tap-highlight-color:transparent}.zdw-gh svg{width:20px;height:20px;flex:none;fill:none;stroke:#1380b8;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}.zdw-gh .zdw-cv{margin-left:auto;width:18px;height:18px;transition:transform .25s}.zdw-gp.op .zdw-cv{transform:rotate(180deg)}.zdw-sub{display:grid;grid-template-rows:0fr;transition:grid-template-rows .28s ease}.zdw-gp.op .zdw-sub{grid-template-rows:1fr}.zdw-sub>*{min-height:0}.zdw-sub{padding:0 8px}.zdw-gp.op .zdw-sub{padding:0 8px 8px}.zdw .zdw-sub a{min-height:40px!important;border:0!important;box-shadow:none!important;background:#f4f9fc!important;border-radius:12px!important;padding:8px 12px!important;font-size:12px!important;margin-top:6px!important}.zdw .zdw-sub a svg{width:17px;height:17px}.zdw-sub-in{overflow:hidden}@media (min-width:64rem){.zdw,.zdw-bg{display:none}}';
  document.head.appendChild(css);

  var bg = document.createElement("div"); bg.className = "zdw-bg";
  var dw = document.createElement("aside"); dw.className = "zdw"; dw.setAttribute("aria-label", "Main menu"); dw.setAttribute("aria-hidden", "true");
  var onHome = location.pathname === "/" || location.pathname.indexOf("/zest-admin") === 0 || /\/index\.html$/.test(location.pathname) && location.pathname.indexOf("/centreinfo") !== 0;
  var H = function (id) { return onHome ? "#" + id : "/#" + id; };
  function it(h, ic, t) { return '<a href="' + h + '"><svg viewBox="0 0 24 24" aria-hidden="true">' + ic + '</svg><span>' + t + '</span></a>'; }
  var CHEV = '<svg class="zdw-cv" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
  function grp(ic, t, inner) { return '<div class="zdw-gp"><button type="button" class="zdw-gh" aria-expanded="false"><svg viewBox="0 0 24 24" aria-hidden="true">' + ic + '</svg><span>' + t + '</span>' + CHEV + '</button><div class="zdw-sub"><div class="zdw-sub-in">' + inner + '</div></div></div>'; }
  var SV = '<rect x="3" y="3" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="2"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2"/>';
  var BK = '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2Z"/><path d="M4 21h15"/>';
  var DROP = '<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11Z"/>';
  var REV = '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2Z"/><path d="M8 7h7M8 11h5"/>';
  var MON = '<rect x="3" y="6" width="18" height="13" rx="3"/><path d="M16 12.5h2M3 10h18"/>';
  var BK = '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2Z"/><path d="M4 21h15"/>';
  var DROP = '<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11Z"/>';
  function tl(h, em, t, go) { return '<a class="zdw-tl" data-zfs="" href="' + h + '"' + (go ? ' data-go="' + go + '"' : '') + '><i>' + em + '</i><span>' + t + '</span></a>'; }
  function gp(c, ic, t, inner) { return '<div class="zdw-gp" style="--c:' + c + '"><button type="button" class="zdw-gh" aria-expanded="false"><svg viewBox="0 0 24 24" aria-hidden="true">' + ic + '</svg><span>' + t + '</span><b class="zdw-ch">' + CHEV + '</b></button><div class="zdw-sub"><div class="zdw-sub-in zdw-tg">' + inner + '</div></div></div>'; }
  function ln(c, h, ic, t) { return '<a class="zdw-mn" style="--c:' + c + '" href="' + h + '"><svg viewBox="0 0 24 24" aria-hidden="true">' + ic + '</svg><span>' + t + '</span><b class="zdw-ch">' + CHEV + '</b></a>'; }
  var ZML = window.ZestLang && ZestLang.get() === "ml"; var ZAPP = (window.matchMedia && matchMedia("(display-mode: standalone)").matches) || navigator.standalone === true;
  var items =
    (ZAPP ? gp("#1380b8", I.home, "MAIN PAGE", tl("#zgo-home-centre-info", "📢", ZML ? "ZEST<br>ബുള്ളറ്റിൻ" : "ZEST BULLETIN") + tl("#zgo-home-zprime2", "⭐", ZML ? "പ്രൈം<br>സേവനങ്ങൾ" : "PRIME SERVICES") + tl(H("ci-info"), "📌", ZML ? "പ്രധാന<br>അറിയിപ്പുകൾ" : "KEY NOTICES") + tl("#zgo-home-programs", "🧩", ZML ? "പ്രധാന<br>പദ്ധതികൾ" : "OUR PROJECTS") + tl("#zgo-home-clubs", "👥", ZML ? "ZEST<br>ക്ലബ്ബുകൾ" : "ZEST CLUBS")) +
      gp("#0b3d5c", '<path d="M3 13c3 0 5-2 7-5 1.5 3 4 5 8 5-2 4-6 6-10 6-2.5 0-4-1-5-2"/><path d="M14 6l3-3"/>', "ZEST", tl("#zgo-zest-about", "ℹ️", ZML ? "എന്താണ്<br>ZEST?" : "ABOUT ZEST") + tl("#zgo-zest-zproj", "🏗️", ZML ? "ZEST<br>പ്രോജക്ടുകൾ" : "ZEST PROJECTS") + tl("#zgo-zest-documentary", "▶️", ZML ? "ZEST<br><b style=\"font:inherit;font-size:9.5px;letter-spacing:-.2px;white-space:nowrap\">ഡോക്യുമെന്ററി</b>" : "ZEST DOCUMENTARY") + tl("#zgo-zest-news", "🛤️", ZML ? "പിന്നിട്ട<br>വഴികൾ" : "OUR JOURNEY") + tl("#zgo-zest-stories", "📸", ZML ? "ദൈനംദിന<br>കാഴ്ചകൾ" : "DAILY MOMENTS"))
    : gp("#1380b8", I.home, "MAIN PAGE", tl(H("about"), "ℹ️", ZML ? "ZEST-നെ<br>കുറിച്ച്" : "ABOUT US") + tl(H("programs"), "🧩", ZML ? "പ്രധാന പദ്ധതികൾ" : "OUR PROJECTS") + tl(H("clubs"), "👥", "ZEST CLUBS") + tl(H("documentary"), "▶️", "DOCUMENTARY") + tl(H("news"), "🛤️", ZML ? "പിന്നിട്ട വഴികൾ" : "OUR JOURNEY"))) +
    gp("#f08a00", I.info, ZML ? "അറിയിപ്പുകൾ" : "SERVICE CENTRE INFO", tl(H("ci-program"), "📅", "ZEST PROGRAMS") + tl(H("ci-info"), "📢", ZML ? "പ്രധാന അറിയിപ്പ്" : "INFO CENTRE") + tl(H("ci-job"), "💼", "JOB UPDATES")) +
    gp("#6a4bd1", I.stu, "STUDENTS CORNER", tl("#students", "📖", "REVISION PLANNER", "rev") + tl("#students", "💰", "POCKET MONEY", "mon")) +
    ln("#16996a", "#zlib", BK, "ZEST LIBRARY") + gp("#e0345c", DROP, "MEDICAL HELP", tl("#med-blood", "🩸", "BLOOD BANK") + tl("#med-eq", "🦽", ZML ? "മെഡിക്കൽ ഉപകരണങ്ങൾ" : "MEDICAL EQUIPMENT") + tl("#med-drv", "🚗", ZML ? "ആശുപത്രി യാത്ര" : "HOSPITAL RIDES")) +
    ln("#0b7fc0", "#zpv", '<path d="M10.5 13.5 3 11l1.5-1.5 7 1L16 6a2.1 2.1 0 0 1 3 3l-4.5 4.5 1 7L14 22l-2.5-7.5Z"/>', ZML ? "പ്രവാസി കണക്ട്" : "PRAVASI CONNECT");
  var BOT = '<div class="zdw-bt"><a class="zdw-sg" href="#settings"><i><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/></svg></i><span data-noi18n class="zsgl">Settings</span></a>' +
    '<a class="zdw-jn" href="' + H("join") + '"><b>💛 JOIN WITH ZEST</b><small data-noi18n>' + '</small><em><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></em></a></div>';
  dw.innerHTML = '<div class="zdw-sc"><div class="zdw-hd2"><img src="/icons/icon-192.png" alt=""><div><b data-noi18n>ZEST for Peace</b><small data-noi18n>നാട് വളരാൻ നാടിനൊപ്പം</small></div><button class="zdw-x" aria-label="Close menu">✕</button></div><div class="zdw-ls" role="navigation">' + items + '</div></div>' + BOT + '<div class="zdw-ft"><b>zestforpeace.com</b></div>';
  (function () { var ml = window.ZestLang && ZestLang.get() === "ml", sm = dw.querySelector(".zdw-jn small"); if (sm) sm.textContent = ml ? "നാടിന്റെ നന്മയ്ക്ക് ഒപ്പം" : "Stand with our village"; var jn = dw.querySelector(".zdw-jn"); if (jn) jn.setAttribute("data-zfs", ""); var sg = dw.querySelector(".zsgl"); if (sg) sg.textContent = ml ? "ക്രമീകരണം" : "Settings"; })();

  var css2 = document.createElement("style");
  css2.textContent =
    '.zdw{background:#f5f8fa!important}' +
    '.zdw-jn b,.zdw-jn small{white-space:nowrap!important;overflow:hidden;text-overflow:ellipsis}.zdw-jn b{font-size:12.5px!important}.zdw-jn small{font-size:10.5px!important}' +
    '.zdw-hd2{display:flex;align-items:center;gap:10px;padding:6px 2px 4px}.zdw-hd2 img{width:34px;height:34px;border-radius:11px;flex:none;box-shadow:0 3px 8px rgba(11,61,92,.2)}.zdw-hd2 b{display:block;font:800 14px/1.2 Inter,sans-serif;color:#0b3d5c}.zdw-hd2 small{display:block;font:500 10.5px/1.3 "Noto Sans Malayalam",sans-serif;color:#8aa0ad}' +
    '.zdw-hd2 .zdw-x{position:static!important;margin-left:auto;width:30px;height:30px;background:#e9eff3!important;color:#5d707c!important;flex:none}' +
    '.zdw .zdw-gp,.zdw a.zdw-mn{position:relative;border:0!important;border-radius:14px!important;background:#fff!important;box-shadow:0 2px 0 #e3eaef,0 4px 10px rgba(11,61,92,.05)!important;overflow:hidden}' +
    '.zdw .zdw-gp::before,.zdw a.zdw-mn::before{content:"";position:absolute;left:0;top:12px;bottom:12px;width:4px;border-radius:0 4px 4px 0;background:var(--c)}' +
    '.zdw .zdw-gh svg,.zdw a.zdw-mn>svg{stroke:var(--c)!important}' +
    '.zdw .zdw-gh,.zdw a.zdw-mn{min-height:44px!important;padding:8px 10px 8px 16px!important;font-size:13px!important}' +
    '.zdw-ch{margin-left:auto;width:24px;height:24px;border-radius:50%;background:#f0f4f7;display:grid;place-items:center;flex:none}.zdw .zdw-ch svg{width:13px!important;height:13px!important;stroke:#7d93a0!important;stroke-width:2.4!important;fill:none;margin:0!important}' +
    '.zdw .zdw-gp.op{background:transparent!important;box-shadow:none!important;overflow:visible}.zdw .zdw-gp.op>.zdw-gh{background:#fff;border-radius:14px;box-shadow:0 2px 0 #e3eaef,0 4px 10px rgba(11,61,92,.05)}.zdw .zdw-gp.op::before{top:12px;bottom:auto;height:20px}' +
    '.zdw .zdw-tg{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px;padding:0 0 0 8px!important;min-height:0;overflow:hidden}.zdw .zdw-gp.op .zdw-tg{padding:9px 0 2px 8px!important}.zdw .zdw-gp:not(.op) .zdw-tg{visibility:hidden}' +
    '.zdw .zdw-tg a.zdw-tl{display:flex!important;flex-direction:column;align-items:center;justify-content:flex-start;gap:6px;min-height:0!important;min-width:0!important;padding:10px 4px!important;border:0!important;border-radius:12px!important;background:#fff!important;box-shadow:0 2px 0 #e3eaef!important;text-align:center;font:600 10.5px/1.3 Inter,"Noto Sans Malayalam",sans-serif!important;letter-spacing:0!important;color:#33434d!important}' +
    '.zdw .zdw-tl i{font-style:normal;font-size:18px;line-height:1}.zdw .zdw-tl span{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;width:100%;margin:0 auto;font-size:11px;line-height:1.3;overflow-wrap:anywhere}' +
'.zdw .zdw-tg a.zdw-tl{position:relative;padding:10px 4px 18px!important;box-shadow:0 3px 0 rgba(11,61,92,.08)!important}.zdw .zdw-tg a.zdw-tl:nth-child(5n+1){background:#e6f3fb!important}.zdw .zdw-tg a.zdw-tl:nth-child(5n+2){background:#e8f7ef!important}.zdw .zdw-tg a.zdw-tl:nth-child(5n+3){background:#efe9fd!important}.zdw .zdw-tg a.zdw-tl:nth-child(5n+4){background:#fff1e2!important}.zdw .zdw-tg a.zdw-tl:nth-child(5n+5){background:#ffe9ef!important}.zdw .zdw-tg a.zdw-tl i{width:34px;height:34px;border-radius:50%;background:#fff;display:grid;place-items:center;font-size:16px;box-shadow:0 2px 5px rgba(0,0,0,.06)}.zdw .zdw-tg a.zdw-tl::after{content:"\\203A";position:absolute;left:50%;bottom:-8px;transform:translateX(-50%);width:20px;height:20px;border-radius:50%;background:#fff;color:#1380b8;font:800 13px/19px Inter,sans-serif;text-align:center;box-shadow:0 2px 5px rgba(11,61,92,.15)}.zdw .zdw-tg{row-gap:16px!important}.zdw .zdw-gp.op .zdw-tg{padding:9px 0 14px 8px!important}' +
    '.zdw-bt{display:flex;align-items:center;gap:9px;padding:10px 12px 4px}' +
    '.zdw-sg{display:flex;flex-direction:column;align-items:center;gap:4px;flex:none;text-decoration:none;font:700 9.5px/1.2 Inter,"Noto Sans Malayalam",sans-serif;color:#0b5d8f;-webkit-tap-highlight-color:transparent}' +
    '.zdw-sg i{position:relative;width:38px;height:38px;border-radius:12px;background:conic-gradient(from 210deg,#3fa7d6,#0b5d8f,#6fc3ea,#3fa7d6);display:grid;place-items:center;box-shadow:0 4px 10px rgba(19,128,184,.35),inset 0 1px 0 rgba(255,255,255,.35)}.zdw-sg i:after{content:"";position:absolute;inset:2px;border-radius:10px;background:linear-gradient(160deg,rgba(255,255,255,.28),rgba(255,255,255,0) 55%)}.zdw-sg svg{position:relative;z-index:1;width:19px;height:19px;fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}' +
    '.zdw-jn{flex:1;position:relative;display:block;border-radius:12px;padding:7px 36px 7px 11px;background:linear-gradient(135deg,#e3f3fc,#bfe3f6);border:1px solid #cfe6f3;box-shadow:0 2px 0 #cfe6f3;text-decoration:none;color:#0b5d8f;-webkit-tap-highlight-color:transparent}.zdw-jn b{display:block;font:800 11.5px/1.3 Inter,"Noto Sans Malayalam",sans-serif}.zdw-jn small{display:block;font:500 9px/1.3 "Noto Sans Malayalam",Inter,sans-serif;color:#3f7fa6}' +
    '.zdw-jn em{position:absolute;right:9px;top:50%;transform:translateY(-50%);width:20px;height:20px;border-radius:50%;background:#fff;display:grid;place-items:center}.zdw-jn em svg{width:11px;height:11px;fill:none;stroke:#1380b8;stroke-width:2.6}' +
    '.zdw-ft{padding:6px 14px 12px!important}.zdw-ft b{color:#a7b6bf!important;font-size:10.5px!important}';
  document.head.appendChild(css2);
  document.body.appendChild(bg); document.body.appendChild(dw);

  var open = false, lastFocus = null;
  function show() {
    open = true; lastFocus = document.activeElement;
    bg.classList.add("on"); dw.classList.add("on"); dw.setAttribute("aria-hidden", "false"); btn.setAttribute("aria-expanded", "true");
    document.documentElement.style.overflow = "hidden";
    setTimeout(function () { var f = dw.querySelector(".zdw-x"); f && f.focus({ preventScroll: true }); }, 50);
  }
  function hide() {
    if (!open) return; open = false;
    bg.classList.remove("on"); dw.classList.remove("on"); dw.setAttribute("aria-hidden", "true"); btn.setAttribute("aria-expanded", "false");
    document.documentElement.style.overflow = "";
    if (lastFocus && lastFocus.focus) try { lastFocus.focus({ preventScroll: true }); } catch (e) {}
  }
  function mobile() { return !matchMedia("(min-width:64rem)").matches; }
  /* take over the 3-line button on phones */
  btn.addEventListener("click", function (e) {
    if (!mobile()) return;
    e.preventDefault(); e.stopImmediatePropagation();
    nav.classList.remove("open", "on", "show"); open ? hide() : show();
  }, true);
  bg.addEventListener("click", hide);
  dw.querySelector(".zdw-x").addEventListener("click", hide);
  function appOnly(ml) {
    var o = document.getElementById("zao"); if (o) o.remove();
    o = document.createElement("div"); o.id = "zao"; o.setAttribute("data-noi18n", "");
    o.innerHTML = '<div class="zao-bg"></div><div class="zao-c"><img src="/icons/icon-192.png" alt=""><b>' + (ml ? "ഇത് ZEST APP-ൽ മാത്രം" : "Available only in the ZEST APP") + '</b><p>' + (ml ? "ഈ സേവനം ഉപയോഗിക്കാൻ ZEST APP ഇൻസ്റ്റാൾ ചെയ്യൂ. സൗജന്യമാണ്." : "Install the free ZEST APP to use this service.") + '</p><a class="zao-i" href="/app/">' + (ml ? "📲 ആപ്പ് ഇൻസ്റ്റാൾ ചെയ്യൂ" : "📲 Install the App") + '</a><button type="button" class="zao-x">' + (ml ? "പിന്നീട്" : "Later") + '</button></div>';
    var st = document.getElementById("zao-css"); if (!st) { st = document.createElement("style"); st.id = "zao-css";
      st.textContent = '#zao{position:fixed;inset:0;z-index:2147483646;display:grid;place-items:center;padding:24px}#zao .zao-bg{position:absolute;inset:0;background:rgba(8,25,40,.55)}#zao .zao-c{position:relative;width:100%;max-width:340px;background:#fff;border-radius:22px;padding:22px 20px 16px;text-align:center;box-shadow:0 20px 50px rgba(0,0,0,.3);font-family:Inter,"Noto Sans Malayalam",sans-serif}#zao img{width:64px;height:64px;border-radius:18px;box-shadow:0 6px 14px rgba(11,61,92,.2)}#zao b{display:block;margin-top:12px;font-size:17px;color:#0b3d5c}#zao p{margin:6px 0 16px;font-size:13px;color:#5d707c;line-height:1.6}#zao .zao-i{display:block;padding:13px;border-radius:14px;background:linear-gradient(135deg,#3fa7d6,#0b5d8f);color:#fff;font-weight:800;text-decoration:none;font-size:14.5px}#zao .zao-x{margin-top:8px;border:0;background:none;color:#7a8b96;font:600 13px Inter,"Noto Sans Malayalam",sans-serif;padding:8px;cursor:pointer}';
      document.head.appendChild(st); }
    document.body.appendChild(o);
    o.querySelector(".zao-bg").onclick = o.querySelector(".zao-x").onclick = function () { o.remove(); };
  }
  dw.querySelectorAll(".zdw-ls a,.zdw-bt a").forEach(function (a) { a.addEventListener("click", function (e) {
    var mh = a.getAttribute("href") || "";
    if (mh.indexOf("#med-") === 0) { e.preventDefault(); e.stopImmediatePropagation(); hide();
      var inApp2 = (window.matchMedia && matchMedia("(display-mode: standalone)").matches) || navigator.standalone === true;
      if (!inApp2) { appOnly(window.ZestLang && ZestLang.get() === "ml"); return; }
      var which = mh === "#med-blood" ? "blood" : mh === "#med-drv" ? "drv" : "eq";
      if (window.ZestMed) ZestMed.open(which); else { var sc = document.createElement("script"); sc.src = "/medical.js?v=17"; sc.onload = function () { ZestMed.open(which); }; document.head.appendChild(sc); }
      return; }
    var zg = /^#zgo-(home|zest)-(.+)$/.exec(a.getAttribute("href") || "");
    if (zg) { e.preventDefault(); e.stopImmediatePropagation(); hide();
      if (zg[1] === "home") history.replaceState(null, "", location.pathname + location.search); else history.replaceState(null, "", "#tab-zest");
      dispatchEvent(new HashChangeEvent("hashchange"));
      setTimeout(function () { var el = document.getElementById(zg[2]); if (el) { var y = el.getBoundingClientRect().top + scrollY - 90; scrollTo({ top: y, behavior: "smooth" }); } }, 160);
      return; }
    if (a.getAttribute("href") === "#zpv") { e.preventDefault(); e.stopImmediatePropagation(); hide();
      var inApp4 = (window.matchMedia && matchMedia("(display-mode: standalone)").matches) || navigator.standalone === true;
      if (!inApp4) { appOnly(window.ZestLang && ZestLang.get() === "ml"); return; }
      if (window.zOpenPV) zOpenPV();
      return; }
    if (a.getAttribute("href") === "#zlib") { e.preventDefault(); e.stopImmediatePropagation(); hide();
      var inApp3 = (window.matchMedia && matchMedia("(display-mode: standalone)").matches) || navigator.standalone === true;
      if (!inApp3) { appOnly(window.ZestLang && ZestLang.get() === "ml"); return; }
      if (window.ZestLib) ZestLib.open(); else { var sl = document.createElement("script"); sl.src = "/library.js?v=8"; sl.onload = function () { ZestLib.open(); }; document.head.appendChild(sl); }
      return; }
    if (a.getAttribute("href") === "#soon") { e.preventDefault(); e.stopImmediatePropagation(); var ml = window.ZestLang && ZestLang.get() === "ml";
      var isApp = (window.matchMedia && matchMedia("(display-mode: standalone)").matches) || navigator.standalone === true;
      if (!isApp) { hide(); appOnly(ml); return; }
      var t = document.createElement("div");
      t.textContent = ml ? "ഉടൻ വരുന്നു 🙂" : "Coming soon 🙂"; t.style.cssText = "position:fixed;left:50%;bottom:90px;transform:translateX(-50%);z-index:2147483647;background:#0b3d5c;color:#fff;padding:10px 18px;border-radius:999px;font:700 13px Inter,'Noto Sans Malayalam',sans-serif;box-shadow:0 8px 20px rgba(0,0,0,.25)";
      document.body.appendChild(t); setTimeout(function () { t.remove(); }, 1800); return; }
    if (a.dataset.go) { var inApp = (window.matchMedia && matchMedia("(display-mode: standalone)").matches) || navigator.standalone === true;
      if (!inApp) { e.preventDefault(); e.stopImmediatePropagation(); hide(); appOnly(window.ZestLang && ZestLang.get() === "ml"); return; }
      window.__zgo = a.dataset.go; }
    hide(); }); });
  dw.querySelectorAll(".zdw-gh").forEach(function (gh) { gh.addEventListener("click", function () { var g = gh.parentNode, o = !g.classList.contains("op"); dw.querySelectorAll(".zdw-gp.op").forEach(function (x) { if (x !== g) { x.classList.remove("op"); x.querySelector(".zdw-gh").setAttribute("aria-expanded", "false"); } }); g.classList.toggle("op", o); gh.setAttribute("aria-expanded", o ? "true" : "false"); }); });
  /* Service Centre sub-items: go to the Centre Info section on the home page and pick that filter */
  function ci() {
    var m = /^#ci-(program|info|job)$/.exec(location.hash); if (!m) return;
    var sec = document.getElementById("centre-info"); if (!sec) return;
    var t = 0, iv = setInterval(function () {
      var c = document.querySelector('.z3c[data-k="' + m[1] + '"]');
      if (c || ++t > 40) { clearInterval(iv); if (c) c.click(); sec.scrollIntoView({ behavior: "smooth", block: "start" }); }
    }, 100);
  }
  window.addEventListener("hashchange", ci); ci();
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") hide(); });
  /* swipe left to close */
  var sx = null;
  dw.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
  dw.addEventListener("touchend", function (e) { if (sx !== null && e.changedTouches[0].clientX - sx > 60) hide(); sx = null; }, { passive: true });
  window.ZestDrawer = { open: show, close: hide, appOnly: appOnly };
  /* admin: hidden entry – tap the ZEST logo in the menu header 5 times; admin item shows only on logged-in admin phones */
  (function () {
    if (!((window.matchMedia && matchMedia("(display-mode: standalone)").matches) || navigator.standalone === true)) return; /* admin only inside the app */
    function loadAdm(cb) { if (window.ZestAdmin) return cb(); var s = document.createElement("script"); s.src = "/admin.js?v=8"; s.onload = cb; document.head.appendChild(s); }
    loadAdm(function () {}); /* testing: admin item visible in app menu */
    var taps = 0, tt; var lg = dw.querySelector(".zdw-hd2 img");
    if (lg) lg.addEventListener("click", function () { taps++; clearTimeout(tt); tt = setTimeout(function () { taps = 0; }, 1500); if (taps >= 5) { taps = 0; hide(); loadAdm(function () { ZestAdmin.open(); }); } });
  })();
})();
