/* ZEST APP – app-only layout: bottom navigation + tab pages (Home / Updates / PRIME / ZEST / Me).
   Runs only in the installed app (standalone). The website is untouched. */
(function () {
  var inApp = (window.matchMedia && matchMedia("(display-mode: standalone)").matches) || navigator.standalone === true;
  if (!inApp || window.__zapp) return; window.__zapp = 1;
  var ML = window.ZestLang && ZestLang.get() === "ml";
  function T(m, e) { return ML ? m : e; }
  var CI = /^\/centreinfo/.test(location.pathname);
  var HOURS = ""; /* e.g. "9:00 AM – 5:00 PM" – shown on the centre card once set */
  var html = document.documentElement; html.classList.add("zapp");
  var F = 'Inter,"Noto Sans Malayalam",sans-serif';
  var IC = {
    home: '<path d="M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/>',
    star: '<path d="M12 2.5 15 9l7 .8-5.2 4.8 1.4 7-6.2-3.6-6.2 3.6 1.4-7L2 9.8 9 9z"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
    msg: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    drop: '<path d="M12 2.7S5 10 5 15a7 7 0 0 0 14 0c0-5-7-12.3-7-12.3z"/>',
    cap: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    arr: '<path d="M9 18l6-6-6-6"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15"/>'
  };
  function ic(n) { return '<svg class="zsi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + IC[n] + '</svg>'; }
  function esc(t) { return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  var css = document.createElement("style");
  css.textContent =
    'html.zapp body{display:flex!important;flex-direction:column!important}html.zapp body{padding-bottom:calc(84px + env(safe-area-inset-bottom))!important}' +
    'html.zapp .wa{bottom:calc(96px + env(safe-area-inset-bottom))!important}html.zapp .ig{bottom:calc(96px + 3.75rem + env(safe-area-inset-bottom))!important;display:flex!important}' +
    '.znav{position:fixed!important;left:0!important;right:0!important;bottom:0!important;top:auto!important;transform:none!important;margin:0!important;z-index:2147483000;height:calc(72px + env(safe-area-inset-bottom));padding-bottom:env(safe-area-inset-bottom);background:#fff;border-top:1px solid #e9eff3;box-shadow:0 -6px 18px rgba(11,61,92,.06);display:grid;grid-template-columns:repeat(5,1fr);align-items:center}' +
    '.znav a{display:flex;flex-direction:column;align-items:center;gap:4px;text-decoration:none;font:700 11px ' + F + ';color:#8796a1;white-space:nowrap;-webkit-tap-highlight-color:transparent}' +
    '.znav a b{display:grid;place-items:center;width:52px;height:30px;border-radius:15px;transition:background .2s}.znav .zsi{width:22px;height:22px}' +
    '.znav a.on{color:#0b3d5c}.znav a.on b{background:#dcefff;color:#1380b8}' +
    '.znav a.c b{width:48px;height:48px;border-radius:16px;margin-top:-22px;background:linear-gradient(135deg,#1e90cf,#0b5d8f);color:#fff;box-shadow:0 8px 16px -4px rgba(11,93,143,.55)}.znav a.c{color:#0b3d5c}.znav a.c.on b{background:linear-gradient(135deg,#f2b33a,#d98a12)}' +
    '.zbellh{position:relative;display:grid;place-items:center;width:40px;height:40px;margin-right:8px;border-radius:12px;background:#eef6fb;color:#0b3d5c;text-decoration:none;flex:none}.zbellh .zsi{width:21px;height:21px}' +
    'html.zapp header.main .logo,html.zapp .zmh-logo{width:6.4rem!important;margin-right:auto!important;flex:none}' +
    'html.zapp .zbellh{display:none!important}' +
    'html.zapp .zlg{height:24px!important;font-size:10px!important;margin:0 4px 0 auto!important}html.zapp .zlg span{padding:0 7px!important}' +
    'html.zapp header.main .burger,html.zapp .zmh-bg{width:34px!important;height:34px!important;border-radius:10px!important;gap:.25rem!important}html.zapp header.main .burger span,html.zapp .zmh-bg span{width:1.15rem!important}' +
    'html.zapp header.main .wrap,html.zapp .zmh-w{gap:.25rem!important}' +
    'html.zapp header.main,html.zapp header.zmh{margin:8px 10px 0!important;top:8px!important;border-radius:28px!important;border:1px solid rgba(255,255,255,.75)!important;box-shadow:0 .4rem 1.4rem rgba(10,60,120,.16)!important}' +
    'html.zapp header.main .wrap,html.zapp .zmh-w{padding-left:.9rem!important;padding-right:.45rem!important}' +
    'html.zapp header.main .burger,html.zapp .zmh-bg{border-radius:50%!important;background:#1380b8!important}html.zapp header.main .burger span,html.zapp .zmh-bg span{background:#fff!important}' +
    'html.zapp header.main .wrap,html.zapp .zmh-w{padding-top:.3rem!important;padding-bottom:.4rem!important}' +
    'html.zapp[data-zt=home] #centre-info{padding-top:1rem!important}' +
    'html.zapp body>section:not(#centre-info){padding-top:2.2rem!important;padding-bottom:1.4rem!important}' +
    'html.zapp body>section:not(#centre-info) .wrap>.tag{margin:0 0 .3rem!important;font:400 .95rem/1.25 Inter,"Noto Sans Malayalam",sans-serif!important;letter-spacing:.03em!important;gap:.6rem!important}html.zapp body>section:not(#centre-info) .wrap>.tag::before{width:1.25rem!important;height:1.25rem!important}' +
    'html.zapp body>section:not(#centre-info) .wrap>h2{position:relative!important;font:600 clamp(1.05rem,5.7vw,1.6rem)/1.3 Inter,"Noto Sans Malayalam",sans-serif!important;letter-spacing:-.01em!important;margin:0 0 1.3rem!important;white-space:nowrap!important;overflow:hidden;text-overflow:ellipsis}' +
    '#zabout{display:none;padding:22px 16px 6px;font-family:' + F + '}html.zapp[data-zt=home] #zabout{display:block}html.zapp #zabout{order:2}' +
    '#zabout button{position:relative;display:block;width:100%;max-width:34rem;margin:0 auto;border:0;padding:0;border-radius:24px;overflow:hidden;background:#0b3d5c;box-shadow:0 10px 24px -8px rgba(11,61,92,.5);text-align:center;cursor:pointer;-webkit-tap-highlight-color:transparent}#zabout button:after{content:"";position:absolute;left:0;right:0;bottom:0;height:62%;background:linear-gradient(180deg,rgba(11,61,92,0),rgba(11,61,92,.55) 40%,rgba(8,40,62,.92));pointer-events:none}#zabout button:active{transform:scale(.98)}' +
    '#zabout img{display:block;width:100%;aspect-ratio:16/11;object-fit:cover}#zabout b,#zabout em{position:absolute;left:0;right:0;z-index:1;margin-left:auto!important;margin-right:auto!important}#zabout b{bottom:38px}#zabout em{bottom:12px;width:max-content}#zabout b{display:block;white-space:nowrap;font:700 clamp(19px,6.4vw,27px)/1.3 Manjari,' + F + ';color:#fff;letter-spacing:.01em;text-shadow:0 2px 12px rgba(0,0,0,.45)}#zabout small{display:block;font:600 12px ' + F + ';color:#cfe6f5}#zabout em{display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:999px;background:linear-gradient(135deg,#e6f5fd,#bfe3f6);border:1px solid rgba(255,255,255,.9);color:#0b5d8f;box-shadow:0 4px 12px -4px rgba(0,0,0,.35);font:800 9.5px ' + F + ';font-style:normal;overflow:hidden;animation:zabP 2.6s ease-in-out infinite}#zabout em:before{content:"";position:absolute;top:0;bottom:0;left:-40%;width:35%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.9),transparent);animation:zabS 3s ease-in-out infinite}#zabout .zar{display:inline-block;animation:zabA 1.4s ease-in-out infinite}@keyframes zabA{0%,100%{transform:translateX(0)}50%{transform:translateX(3px)}}@keyframes zabS{0%,60%{left:-40%}100%{left:120%}}@keyframes zabP{0%,100%{box-shadow:0 0 0 0 rgba(191,227,246,.6)}50%{box-shadow:0 0 0 6px rgba(191,227,246,0)}}' +
    'html.zapp #centre-info .zu-photo{display:none!important}html.zapp #centre-info .zu-head{min-height:0!important}' +
    '.zpg.zpc{gap:10px}.zpg.zpc button{display:flex;align-items:center;gap:10px;padding:8px 32px 8px 8px;border-radius:18px;min-height:64px}.zpg.zpc img{flex:none;width:48px;height:48px;aspect-ratio:auto;border-radius:14px;object-fit:cover;object-position:50% 45%}' +
    '.zpg.zpc b{padding:0!important;font-size:12px;line-height:1.3}.zpg.zpc button i.go{right:8px;bottom:auto;top:50%;transform:translateY(-50%);width:18px;height:18px}.zpg.zpc button i.go .zsi{width:11px;height:11px}' +
    '#zprime2 .zpg button{overflow:hidden}#zprime2 .zpg img{transform-origin:50% 60%;animation:zpgK 7s ease-in-out infinite;will-change:transform}' +
    '#zprime2 .zpg button:nth-child(2) img{animation-delay:-1.75s}#zprime2 .zpg button:nth-child(3) img{animation-delay:-3.5s}#zprime2 .zpg button:nth-child(4) img{animation-delay:-5.25s}' +
    '@keyframes zpgK{0%,100%{transform:scale(1) translate(0,0)}25%{transform:scale(1.06) translate(-1.5%,-1%)}50%{transform:scale(1.1) translate(1%,-2%)}75%{transform:scale(1.05) translate(1.5%,0)}}' +
    '@media (prefers-reduced-motion:reduce){#zprime2 .zpg img{animation:none}}' +
    /* hero */
    '.zth{position:relative;margin:0;padding:26px 22px 24px;background:linear-gradient(160deg,#0b3d5c,#1380b8 65%,#3fa7d6);color:#fff;border-radius:0 0 28px 28px;text-align:center;overflow:hidden;font-family:' + F + '}' +
    '.zth:after{content:"";position:absolute;right:-50px;top:-50px;width:170px;height:170px;border-radius:50%;background:rgba(255,255,255,.08)}' +
    '.zth h2:first-child{margin-top:18px}.zth img{position:relative;z-index:1;display:block;width:86%;max-width:360px;aspect-ratio:780/320;object-fit:cover;margin:0 auto;border-radius:20px;box-shadow:0 10px 24px rgba(0,0,0,.25);border:3px solid rgba(255,255,255,.6);background:#e6f3fb}' +
    '.zth h2{position:relative;z-index:1;margin:12px 0 4px;font:800 22px ' + F + ';color:#fff}.zth p{position:relative;z-index:1;margin:0;font:600 12.5px ' + F + ';color:#cfe6f5}' +
    /* centre card actions */
    '.zca{margin:14px 0 2px;font-family:' + F + '}.zca .hr{display:flex;justify-content:center;gap:12px;margin-bottom:10px;font:700 12.5px ' + F + ';color:#fff}.zca .hr .op{color:#7ff0b5}' +
    '.zca .bt{display:flex;gap:6px}.zca .bt a{flex:1;display:flex;align-items:center;justify-content:center;gap:6px;padding:10px 0;border-radius:12px;background:rgba(255,255,255,.15);color:#fff;text-decoration:none;font:800 12px ' + F + ';white-space:nowrap}.zca .bt a.g{background:#22b573}.zca .zsi{width:16px;height:16px}' +
    /* prime grid */
    '.zpg{display:grid;grid-template-columns:1fr 1fr;gap:12px}.zpg button{border:0;padding:0 0 12px;border-radius:22px;overflow:hidden;background:#fff;text-align:left;box-shadow:0 4px 14px rgba(11,61,92,.08);cursor:pointer;font-family:' + F + ';-webkit-tap-highlight-color:transparent}.zpg button:active{transform:scale(.97)}' +
    '.zpg button{position:relative}.zpg button i.go{position:absolute;right:10px;bottom:12px;display:grid;place-items:center;width:20px;height:20px;border-radius:50%;background:#1380b8;color:#fff;box-shadow:0 4px 10px -2px rgba(19,128,184,.5)}.zpg button i.go .zsi{width:12px;height:12px;animation:zpgo 1.6s ease-in-out infinite}.zpg b{padding-right:32px!important}@keyframes zpgo{0%,100%{transform:translateX(0)}50%{transform:translateX(3px)}}' +
    '.zpg img{display:block;width:100%;aspect-ratio:780/320;object-fit:cover}.zpg b{display:block;padding:10px 12px 0;font:800 14px ' + F + ';color:#0b2a3d}.zpg small{display:block;padding:3px 12px 0;font:600 11px/1.4 ' + F + ';color:#7a8b96}' +
    '#zprime2 .tag{margin-top:0}' +
    /* views */
    '.zview{display:none;font-family:' + F + '}.zview .in{max-width:34rem;margin:0 auto;padding:18px 16px 10px}' +
    '.zsh{display:flex;align-items:center;gap:10px;margin:18px 2px 10px;font:800 16px ' + F + ';color:#0b2a3d}.zsh:before{content:"";width:5px;height:22px;border-radius:3px;background:#1380b8}' +
    '.zcd{background:#fff;border-radius:22px;padding:16px;box-shadow:0 4px 14px rgba(11,61,92,.07)}' +
    '.zrow{display:flex;align-items:center;gap:12px;padding:12px 4px;text-decoration:none;color:#0b2a3d;border:0;background:none;width:100%;text-align:left;font:inherit;cursor:pointer}.zrow+.zrow{border-top:1px solid #eef3f6}.zrow i{display:grid;place-items:center;flex:none;width:40px;height:40px;border-radius:12px;background:var(--c,#eef6fb);color:var(--k,#1380b8)}.zrow i .zsi{width:19px;height:19px}.zrow span{flex:1}.zrow b{display:block;font:800 14px ' + F + '}.zrow small{display:block;font:600 11.5px ' + F + ';color:#7a8b96}.zrow em{font-style:normal;color:#9cb3c1}.zrow em .zsi{width:18px;height:18px}' +
    '.zmc{display:grid;grid-template-columns:1fr 1fr;gap:10px}.zmc button{border:0;padding:14px;border-radius:20px;color:#fff;min-height:108px;display:flex;flex-direction:column;align-items:flex-start;text-align:left;cursor:pointer;font-family:' + F + '}.zmc .zsi{width:24px;height:24px}.zmc b{margin-top:auto;font:800 14px ' + F + '}.zmc small{font:600 11px ' + F + ';opacity:.9}' +
    '.zfm{display:flex;align-items:center;gap:10px;padding:10px;border-radius:14px;background:#f5f8fa;margin-bottom:8px}.zfm .av{flex:none;width:40px;height:40px;border-radius:50%;display:grid;place-items:center;background:#fff;color:#1380b8;font:800 15px ' + F + '}.zfm div{flex:1;min-width:0}.zfm b{display:block;font:800 13.5px ' + F + ';color:#0b2a3d}.zfm small{font:600 11.5px ' + F + ';color:#7a8b96}.zfm button{border:0;background:none;color:#c0254a;padding:6px;cursor:pointer}.zfm button .zsi{width:18px;height:18px}' +
    '.zadd{display:flex;align-items:center;justify-content:center;gap:6px;width:100%;padding:12px;border-radius:14px;border:2px dashed #9cc9e4;background:none;color:#1380b8;font:800 13px ' + F + ';cursor:pointer}.zadd .zsi{width:18px;height:18px}' +
    '.zff{display:none;margin-top:10px}.zff.on{display:block}.zff label{display:block;margin:8px 0 4px;font:700 11.5px ' + F + ';color:#5d707c}.zff input,.zff select{width:100%;box-sizing:border-box;padding:11px 12px;border-radius:12px;border:1.5px solid #e1e9ef;background:#fbfdfe;font:600 14px ' + F + ';color:#14232c}.zff .r2{display:flex;gap:8px}.zff .r2>div{flex:1}' +
    '.zff .go{display:block;margin:14px auto 0;border:0;padding:12px 24px;border-radius:999px;background:linear-gradient(135deg,#2fd07f,#1f9a64);color:#fff;font:800 13px ' + F + ';cursor:pointer}.zff input.inv{border-color:#e0345c}' +
    '.zpv{margin:12px 0 0;padding:10px 12px;border-radius:12px;background:#eef6fb;color:#3c5566;font:600 11.5px/1.5 ' + F + ';text-align:center}' +
    /* tab visibility (home page) */
    'html.zapp #zprime,html.zapp .hero,html.zapp .mq{display:none!important}' +
    'html.zapp[data-zt=home] #numbers,html.zapp[data-zt=home] #about,html.zapp[data-zt=home] #documentary,html.zapp[data-zt=home] #news,html.zapp[data-zt=home] #stories,html.zapp[data-zt=home] #join,html.zapp[data-zt=home] #contact{display:none!important}' +
    'html.zapp[data-zt=prime] body>section,html.zapp[data-zt=prime] #contact,html.zapp[data-zt=me] body>section:not(#join),html.zapp[data-zt=me] #contact,html.zapp[data-zt=zest] #centre-info,html.zapp[data-zt=zest] #zprime2,html.zapp[data-zt=zest] #join{display:none!important}' +
    'html.zapp[data-zt=prime] #zv-prime,html.zapp[data-zt=zest] #zv-zest,html.zapp[data-zt=me] #zv-me{display:block}' +
    'html.zapp body>header{order:0}html.zapp #zv-prime,html.zapp #zv-zest,html.zapp #zv-me{order:1}html.zapp #centre-info{order:4}html.zapp #zprime2{order:3}html.zapp #about{order:4}html.zapp #numbers{order:5}html.zapp #programs{order:6}html.zapp #clubs{order:7}html.zapp #documentary{order:8}html.zapp #news{order:9}html.zapp #stories{order:10}html.zapp #zv-me2{order:11}html.zapp #join{order:12}html.zapp #contact{order:13}html.zapp body>*{order:20}html.zapp body>header,html.zapp body>section,html.zapp body>footer,html.zapp .zview{flex:none}' +
    'html.zapp[data-zt=me] #zv-me2{display:block}' +
    /* centre info page */
    'html.zapp #sec-projects,html.zapp footer.addr{display:none!important}';
  document.head.appendChild(css);
  var fl = document.createElement("link"); fl.rel = "stylesheet"; fl.href = "https://fonts.googleapis.com/css2?family=Manjari:wght@700&display=swap"; document.head.appendChild(fl);

  /* ---------- bottom navigation ---------- */
  var NAV = [["home", "home", T("ഹോം", "Home")], ["info", "bell", T("അറിയിപ്പ്", "Updates")], ["prime", "star", "PRIME"], ["zest", "users", "ZEST"], ["me", "user", T("ഞാൻ", "Me")]];
  var nav = document.createElement("div"); nav.className = "znav"; nav.setAttribute("data-noi18n", "");
  nav.innerHTML = NAV.map(function (n) { return '<a href="' + (n[0] === "info" ? "/centreinfo/" : n[0] === "home" ? "/" : "/#tab-" + n[0]) + '" data-t="' + n[0] + '"' + (n[0] === "prime" ? ' class="c"' : '') + '><b>' + ic(n[1]) + '</b>' + n[2] + '</a>'; }).join("");
  function mark(t) { nav.querySelectorAll("a").forEach(function (a) { a.classList.toggle("on", a.dataset.t === t); }); }

  function hero(img, t, s, id) { return '<div class="zth"' + (id ? ' id="' + id + '"' : '') + ' data-noi18n>' + (img ? '<img src="' + img + '" alt="">' : '') + '<h2>' + t + '</h2><p>' + s + '</p></div>'; }
  function bell(hd) {
    if (!hd || hd.querySelector(".zbellh")) return;
    var a = document.createElement("a"); a.className = "zbellh"; a.href = "/centreinfo/"; a.setAttribute("aria-label", T("അറിയിപ്പുകൾ", "Updates")); a.innerHTML = ic("bell");
    var b = hd.querySelector(".burger,#bg,button:last-of-type"); if (b && b.parentNode) b.parentNode.insertBefore(a, b); else hd.appendChild(a);
  }

  function ready(fn) { if (document.readyState !== "loading") setTimeout(fn, 0); else document.addEventListener("DOMContentLoaded", fn); }
  ready(function () {
    document.body.appendChild(nav);
    if (CI) {
      var hd = document.querySelector("header.zmh"); if (hd) { hd.insertAdjacentHTML("afterend", hero("/img/hero/info.svg?v=2", T("ZEST ബുള്ളറ്റിൻ", "ZEST Bulletin"), T("പരിപാടികൾ, അറിയിപ്പുകൾ, ജോലി ഒഴിവുകൾ", "Programs, announcements and job updates"))); bell(hd.querySelector(".wrap") || hd); }
      mark("info"); return;
    }
    home();
  });

  function loadMed(cb) { if (window.ZestMed) return cb(); var s = document.createElement("script"); s.src = "/medical.js?v=12"; s.onload = cb; document.head.appendChild(s); }
  function loadLib(cb) { if (window.ZestLib) return cb(); var s = document.createElement("script"); s.src = "/library.js?v=7"; s.onload = cb; document.head.appendChild(s); }
  function clickHash(h) { var a = document.createElement("a"); a.href = h; a.style.display = "none"; document.body.appendChild(a); a.click(); a.remove(); }
  function openPrime(k) {
    if (k === "stu") return clickHash("#students");
    if (k === "lib") return loadLib(function () { ZestLib.open(); });
    loadMed(function () { ZestMed.open(k === "blood" ? "blood" : "eq"); });
  }
  var PR = [["stu", "students", T("സ്റ്റുഡന്റ്സ് കോർണർ", "Students Corner"), T("റിവിഷൻ പ്ലാനർ, പോക്കറ്റ് മണി", "Revision planner, pocket money")],
    ["lib", "library", T("ZEST ലൈബ്രറി", "ZEST Library"), T("പുസ്തകങ്ങൾ തിരയാം, ചോദിക്കാം", "Find and request books")],
    ["blood", "blood", T("ബ്ലഡ് ബാങ്ക്", "Blood Bank"), T("രക്തം നൽകാം / വേണം", "Give or request blood")],
    ["eq", "equipment", T("മെഡിക്കൽ ഉപകരണം", "Medical Equipment"), T("വീൽചെയർ, ബെഡ്, വാക്കർ", "Wheelchair, bed, walker")]];
  function primeGrid(desc) { return '<div class="zpg">' + PR.map(function (p) { return '<button type="button" data-k="' + p[0] + '"><img src="/img/hero/' + p[1] + '.svg" alt=""><b>' + p[2] + '</b>' + (desc ? '<small>' + p[3] + '</small>' : '') + '<i class="go">' + ic("arr") + '</i></button>'; }).join("") + '</div>'; }
  function wirePrime(el) { el.querySelectorAll(".zpg button").forEach(function (b) { b.onclick = function () { openPrime(b.dataset.k); }; }); }

  function after(el) { var h = document.querySelector("body>header"); if (h) h.after(el); else document.body.prepend(el); }
  function home() {
    var hd = document.querySelector("header.main"); bell(hd && (hd.querySelector(".wrap") || hd));
    /* centre card: hours + quick actions after the photo */
    var ci = document.getElementById("centre-info");
    if (ci && HOURS && !ci.querySelector(".zca")) {
      var ph = null; ci.querySelectorAll("*").forEach(function (e) { if (ph) return; var bi = getComputedStyle(e).backgroundImage; if ((e.tagName === "IMG" && /about1/.test(e.src)) || /about1/.test(bi)) ph = e; });
      var host = ph; if (host) while (host.parentElement && host.parentElement !== ci && host.parentElement.offsetWidth < ci.offsetWidth * 0.85) host = host.parentElement;
      var ca = document.createElement("div"); ca.className = "zca"; ca.setAttribute("data-noi18n", "");
      ca.innerHTML = '<div class="hr"><span class="op">● ' + T("ഇപ്പോൾ തുറന്നിരിക്കുന്നു", "Open now") + '</span><span>' + HOURS + '</span></div>';
      if (host && host !== ci) host.after(ca);
    }
    /* clubs heading */
    var cw = document.querySelector("#clubs .wrap");
    if (cw && !cw.querySelector("h2")) { var ch = document.createElement("h2"); ch.className = "ml zh2 in"; ch.setAttribute("data-noi18n", ""); ch.textContent = T("ZESTന്റെ പ്രധാന ക്ലബ്ബുകൾ", "Main clubs of ZEST"); cw.appendChild(ch); }
    /* about ZEST banner after projects */
    var pg = document.getElementById("programs");
    if (pg && !document.getElementById("zabout")) {
      var za = document.createElement("div"); za.id = "zabout"; za.setAttribute("data-noi18n", "");
      za.innerHTML = '<button type="button"><img src="/img/zest-centre.webp?v=2" alt="ZEST Centre"><b>നാട് വളരാൻ നാടിനൊപ്പം</b><em>' + T("ZEST-നെ കുറിച്ച് അറിയാം", "Know about ZEST") + ' <span class="zar">→</span></em></button>';
      pg.after(za); za.querySelector("button").onclick = function () { go("zest"); };
    }
    /* PRIME SPOT on home */
    var pv = document.createElement("section"); pv.id = "zprime2";
    pv.innerHTML = '<div class="wrap"><p class="tag" data-noi18n>App Exclusive</p><h2 class="ml zh2 in" data-noi18n>' + T("ZEST പ്രൈം സേവനങ്ങൾ", "ZEST PRIME SPOT") + '</h2>' + primeGrid(false).replace('class="zpg"', 'class="zpg" data-noi18n') + '</div>';
    if (ci) ci.after(pv); else document.body.appendChild(pv); wirePrime(pv);
    /* PRIME page */
    var vp = document.createElement("div"); vp.className = "zview"; vp.id = "zv-prime";
    vp.innerHTML = hero("/img/hero/prime.svg?v=2", "ZEST PRIME", T("ആപ്പിൽ മാത്രം ലഭിക്കുന്ന സേവനങ്ങൾ", "Services only in the ZEST APP")) + '<div class="in" data-noi18n>' + primeGrid(true) + '</div>';
    after(vp); wirePrime(vp);
    /* ZEST page */
    var vz = document.createElement("div"); vz.className = "zview"; vz.id = "zv-zest";
    vz.innerHTML = hero("/img/hero/zest.svg?v=1", "ZEST for Peace", T("നാട് വളരാൻ നാടിനൊപ്പം", "Growing together with our village"));
    after(vz);
    /* ME page */
    var vm = document.createElement("div"); vm.className = "zview"; vm.id = "zv-me";
    vm.innerHTML = hero("/img/hero/me.svg?v=2", T("എന്റെ ZEST", "My ZEST"), T("നിങ്ങളുടെയും കുടുംബത്തിന്റെയും വിവരങ്ങൾ", "You and your family"));
    after(vm);
    var vm2 = document.createElement("div"); vm2.className = "zview"; vm2.id = "zv-me2"; vm2.setAttribute("data-noi18n", "");
    document.body.appendChild(vm2); renderMe(vm2);
    /* "join" buttons anywhere → Me tab */
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href="#join"],a[href$="/#join"]');
      if (!a || nav.contains(a)) return; e.preventDefault(); e.stopPropagation(); go("me"); setTimeout(function () { var j = document.getElementById("join"); if (j) j.scrollIntoView({ behavior: "smooth" }); }, 80);
    }, true);
    nav.addEventListener("click", function (e) {
      var a = e.target.closest("a"); if (!a) return; var t = a.dataset.t; if (t === "info") return;
      e.preventDefault(); go(t);
    });
    addEventListener("hashchange", route);
    route();
  }
  function go(t) { if (t === "home") history.replaceState(null, "", location.pathname + location.search); else history.replaceState(null, "", "#tab-" + t); route(); scrollTo(0, 0); }
  function route() {
    var m = location.hash.match(/^#tab-(prime|zest|me)$/); var t = m ? m[1] : "home";
    html.setAttribute("data-zt", t); mark(t);
  }

  /* ---------- Me: family + cards + settings ---------- */
  var FK = "zestFamily";
  function fam() { try { return JSON.parse(localStorage.getItem(FK) || "[]") || []; } catch (e) { return []; } }
  function setFam(l) { try { localStorage.setItem(FK, JSON.stringify(l)); } catch (e) {} }
  var REL = ML ? ["ഭർത്താവ്", "ഭാര്യ", "മകൻ", "മകൾ", "അച്ഛൻ", "അമ്മ", "സഹോദരൻ", "സഹോദരി", "മറ്റുള്ളവ"] : ["Husband", "Wife", "Son", "Daughter", "Father", "Mother", "Brother", "Sister", "Other"];
  function renderMe(el) {
    var L = fam();
    el.innerHTML = '<div class="in">' +
      '<div class="zsh">' + T("എന്റെ കുടുംബം", "My family") + '</div><div class="zcd">' +
      (L.length ? L.map(function (p, i) { return '<div class="zfm"><span class="av">' + esc((p.n || "?").trim().charAt(0).toUpperCase()) + '</span><div><b>' + esc(p.n) + '</b><small>' + esc(p.r) + (p.a ? ' · ' + esc(p.a) : '') + '</small></div><button type="button" data-d="' + i + '" aria-label="' + T("നീക്കം ചെയ്യുക", "Remove") + '">' + ic("trash") + '</button></div>'; }).join("") : '<p style="margin:0 0 10px;font:600 12.5px ' + F + ';color:#7a8b96;text-align:center">' + T("കുടുംബാംഗങ്ങളെ ചേർത്തിട്ടില്ല", "No family members added yet") + '</p>') +
      '<button type="button" class="zadd">' + ic("plus") + T("കുടുംബാംഗത്തെ ചേർക്കാം", "Add family member") + '</button>' +
      '<div class="zff"><div class="r2"><div><label>' + T("പേര്", "Name") + ' *</label><input id="zf-n" maxlength="40"></div><div><label>' + T("ബന്ധം", "Relation") + ' *</label><select id="zf-r">' + REL.map(function (r) { return '<option>' + r + '</option>'; }).join("") + '</select></div></div>' +
      '<label>' + T("വയസ്സ് / ക്ലാസ്", "Age / class") + '</label><input id="zf-a" maxlength="20" placeholder="' + T("ഉദാ: 42 വയസ്സ് / Class 9", "e.g. 42 years / Class 9") + '"><button type="button" class="go">' + T("ചേർക്കാം", "Add") + '</button></div>' +
      '</div>' +
      '<div class="zsh">' + T("എന്റെ കാർഡുകൾ", "My cards") + '</div><div class="zmc"><button type="button" data-c="donor" style="background:linear-gradient(140deg,#ff6a7e,#c8102e)">' + ic("drop") + '<b>' + T("എന്റെ ഡോണർ കാർഡ്", "My donor card") + '</b><small>' + T("ബ്ലഡ് ബാങ്ക്", "Blood Bank") + '</small></button><button type="button" data-c="stu" style="background:linear-gradient(140deg,#9b7bff,#6a4ee0)">' + ic("cap") + '<b>' + T("എന്റെ പഠന ഇടം", "My study space") + '</b><small>Students Corner</small></button></div>' +
      '<div class="zsh">' + T("സെറ്റിംഗ്സ്", "Settings") + '</div><div class="zcd" style="padding:4px 12px">' +
      '<a class="zrow" href="#notify" style="--c:#fff3dc;--k:#c77700"><i>' + ic("bell") + '</i><span><b>' + T("നോട്ടിഫിക്കേഷൻ", "Notifications") + '</b><small>' + T("പുതിയ അറിയിപ്പുകൾ", "New updates") + '</small></span><em>' + ic("arr") + '</em></a>' +
      '<a class="zrow" href="#settings"><i>' + ic("globe") + '</i><span><b>' + T("ഭാഷ", "Language") + '</b><small>മലയാളം / English</small></span><em>' + ic("arr") + '</em></a>' +
      '</div>' +
      '<div class="zsh">' + T("ZEST-ൽ ചേരാം", "Join ZEST") + '</div></div>';
    var ff = el.querySelector(".zff");
    el.querySelector(".zadd").onclick = function () { ff.classList.toggle("on"); if (ff.classList.contains("on")) el.querySelector("#zf-n").focus(); };
    el.querySelector(".zff .go").onclick = function () {
      var n = el.querySelector("#zf-n"), v = n.value.trim(); if (!v) { n.classList.add("inv"); n.focus(); return; }
      var l = fam(); l.push({ n: v, r: el.querySelector("#zf-r").value, a: el.querySelector("#zf-a").value.trim() }); setFam(l); renderMe(el);
    };
    el.querySelectorAll(".zfm button").forEach(function (b) { b.onclick = function () { var l = fam(); l.splice(+b.dataset.d, 1); setFam(l); renderMe(el); }; });
    el.querySelector('[data-c=donor]').onclick = function () { loadMed(function () { ZestMed.open("blood"); }); };
    el.querySelector('[data-c=stu]').onclick = function () { clickHash("#students"); };
  }
  /* reveal after the app layout is built (no website flash) */
  ready(function () { setTimeout(function () { requestAnimationFrame(function () { html.classList.remove("zboot"); }); }, 30); });
})();
