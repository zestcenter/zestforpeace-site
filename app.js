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
  var ZFZ = { s: 0.9, m: 1, l: 1.12, x: 1.25 }; function zfzGet() { try { return localStorage.getItem("zestFont") || "m"; } catch (e) { return "m"; } }
  html.style.setProperty("--zfz", ZFZ[zfzGet()] || 1);
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
    'html.zapp .wa{bottom:calc(96px + env(safe-area-inset-bottom))!important}html.zapp .ig{bottom:calc(96px + 3.1rem + env(safe-area-inset-bottom))!important}html.zapp .wa,html.zapp .ig{width:2.55rem!important;height:2.55rem!important}html.zapp .wa svg,html.zapp .ig svg{width:1.3rem!important;height:1.3rem!important}' +
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
    '#zabout img{display:block;width:100%;aspect-ratio:16/11;object-fit:cover}#zabout b,#zabout em{position:absolute;left:0;right:0;z-index:1;margin-left:auto!important;margin-right:auto!important}#zabout b{bottom:34px}#zabout em{bottom:12px;width:max-content}#zabout b{display:block;white-space:nowrap;font:700 clamp(16px,5.2vw,21px)/1.3 Manjari,' + F + ';color:#fff;letter-spacing:.01em;text-shadow:0 2px 12px rgba(0,0,0,.45)}#zabout small{display:block;font:600 12px ' + F + ';color:#cfe6f5}#zabout em{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:999px;background:linear-gradient(135deg,#e6f5fd,#bfe3f6);border:1px solid rgba(255,255,255,.9);color:#0b5d8f;box-shadow:0 4px 12px -4px rgba(0,0,0,.35);font:800 10.5px ' + F + ';font-style:normal;overflow:hidden;animation:zabP 2.6s ease-in-out infinite}#zabout em:before{content:"";position:absolute;top:0;bottom:0;left:-40%;width:35%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.9),transparent);animation:zabS 3s ease-in-out infinite}#zabout .zar{display:inline-block;animation:zabA 1.4s ease-in-out infinite}@keyframes zabA{0%,100%{transform:translateX(0)}50%{transform:translateX(3px)}}@keyframes zabS{0%,60%{left:-40%}100%{left:120%}}@keyframes zabP{0%,100%{box-shadow:0 0 0 0 rgba(191,227,246,.6)}50%{box-shadow:0 0 0 6px rgba(191,227,246,0)}}' +
    'html.zapp #centre-info .zu-photo{display:none!important}html.zapp #centre-info .zu-head{min-height:0!important}' +
    '.zpg.zpc{gap:10px}.zpg.zpc button{display:flex;align-items:center;gap:10px;padding:8px 32px 8px 8px;border-radius:18px;min-height:64px}.zpg.zpc img{flex:none;width:48px;height:48px;aspect-ratio:auto;border-radius:14px;object-fit:cover;object-position:50% 45%}' +
    '.zpg.zpc b{padding:0!important;font-size:12px;line-height:1.3}.zpg.zpc button i.go{right:8px;bottom:auto;top:50%;transform:translateY(-50%);width:18px;height:18px}.zpg.zpc button i.go .zsi{width:11px;height:11px}' +
    '#zprime2 .zpg button{overflow:hidden}#zprime2 .zpg img{transform-origin:50% 60%;animation:zpgK 7s ease-in-out infinite;will-change:transform}' +
    '#zprime2 .zpg button:nth-child(2) img{animation-delay:-1.75s}#zprime2 .zpg button:nth-child(3) img{animation-delay:-3.5s}#zprime2 .zpg button:nth-child(4) img{animation-delay:-5.25s}' +
    '@keyframes zpgK{0%,100%{transform:scale(1) translate(0,0)}25%{transform:scale(1.06) translate(-1.5%,-1%)}50%{transform:scale(1.1) translate(1%,-2%)}75%{transform:scale(1.05) translate(1.5%,0)}}' +
    '@media (prefers-reduced-motion:reduce){#zprime2 .zpg img{animation:none}}' +
    'html.zapp .zsc{background:none!important;box-shadow:none!important;color:#0b3d5c!important;margin:10px 16px 0!important;padding:0!important}html.zapp .zsc-h{display:none!important}html.zapp .zsc .z3cs{padding:4px 0 2px!important}' +
    'html.zapp .z3c{background:#fff!important;border:1.5px solid #dbe9f2!important;color:#0b3d5c!important;box-shadow:0 4px 12px rgba(11,61,92,.08)!important}html.zapp .z3i{background:#eef6fb!important}' +
    'html.zapp .z3c.on{background:linear-gradient(135deg,#1e90cf,#0b5d8f)!important;border-color:transparent!important;color:#fff!important;box-shadow:0 8px 18px rgba(19,128,184,.35)!important}html.zapp .z3c.on .z3i{background:#fff!important}html.zapp .z3c.on .z3a{stroke:#fff!important}' +
    'html.zapp .z3c.hv,html.zapp .z3c:not(.on):hover{background:#f2f8fc!important;border-color:#bfe3f6!important}html.zapp .zsc .z3h{color:#5d707c!important}html.zapp #centre-info .z3h{color:#7a8b96!important;font-weight:500!important;font-size:11px!important;opacity:1!important}' +
    'html.zapp .zjw{padding:.42rem .9rem!important;font-size:.72rem!important;min-height:0!important;width:auto!important;gap:.35rem!important}html.zapp .zjw svg{width:.8rem!important;height:.8rem!important}' +
    'html.zapp #centre-info .zu-panel{background:#f3f8fc!important;background-image:radial-gradient(circle at 90% 0%,#d6ecfa 0,transparent 45%),radial-gradient(circle at 0% 100%,#fff4dc 0,transparent 40%)!important;box-shadow:0 8px 24px rgba(11,61,92,.08)!important;border:1px solid #dfeaf2!important}html.zapp #centre-info .z3c:not(.on){background:#fff!important}html.zapp #centre-info .zu-panel:before,html.zapp #centre-info .zu-panel:after{display:none!important}' +
    'html.zapp #centre-info .zu-h{background:none!important;-webkit-text-fill-color:#0b3d5c!important;color:#0b3d5c!important}html.zapp #centre-info .zu-sub{color:#5d8aa8!important}' +
    'html.zapp #centre-info .z3c{border-color:#dbe9f2!important}html.zapp #centre-info .z3e{color:#5d8aa8!important;border-color:#cfe0ea!important}' +
    '.zsg{margin:18px 0 6px;padding:16px;border-radius:20px;background:linear-gradient(135deg,#fff8e1,#fff1d6);border:1.5px solid #f1dc9c}.zsg-h{display:flex;align-items:center;gap:12px;margin-bottom:12px}.zsg-h i{font-style:normal;font-size:30px;line-height:1}' +
    '.zsg-h b{display:block;font:800 15px/1.3 ' + F + ';color:#7a5a00}.zsg-h small{display:block;margin-top:4px;font:700 12px/1.3 ' + F + ';color:#9a7410}' +
    '.zsg textarea{display:block;width:100%;box-sizing:border-box;padding:10px 12px;border-radius:14px;border:2px solid #1380b8;background:#fff;font:500 14px/1.5 ' + F + ';color:#0b2a3d;resize:vertical;outline:0}.zsg textarea.err{border-color:#e0345c;animation:zsgS .3s}@keyframes zsgS{25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}' +
    '.zsg button{display:block;width:100%;margin-top:10px;padding:12px;border:0;border-radius:14px;background:#25d366;color:#fff;font:800 14px ' + F + ';cursor:pointer}.zsg button:active{transform:scale(.98)}' +
    '.zpg button{display:flex!important;flex-direction:column!important;justify-content:flex-start!important;align-items:stretch!important}.zpg img{flex:none}' +
    'html.zapp #centre-info .zu-head{display:flex!important;flex-direction:column!important;gap:0!important}html.zapp #centre-info .zu-sub{order:2;margin:0 0 .4rem!important;font:600 clamp(.95rem,4.9vw,1.4rem)/1.3 Inter,"Noto Sans Malayalam",sans-serif!important;color:#0b2a3d!important;letter-spacing:-.01em;white-space:nowrap;animation:none!important}' +
    'html.zapp #centre-info .zu-h{order:1;margin:0 0 .3rem!important;font:400 .95rem/1.25 Inter,"Noto Sans Malayalam",sans-serif!important;letter-spacing:.03em!important;-webkit-text-fill-color:#111!important;color:#111!important}' +
    'html.zapp .z3st{flex-wrap:wrap!important;row-gap:8px!important}html.zapp .z3cd{flex-shrink:0}' +
    'html.zapp .z3md,html.zapp .z3rm,html.zapp .zu-more a,html.zapp .zu-more button,html.zapp .zjw{display:inline-flex!important;align-items:center!important;gap:4px!important;width:auto!important;min-height:0!important;padding:4px 10px!important;border-radius:999px!important;background:linear-gradient(135deg,#e6f5fd,#bfe3f6)!important;border:1px solid #bfe3f6!important;color:#0b5d8f!important;font:800 9.5px/1.2 Inter,"Noto Sans Malayalam",sans-serif!important;letter-spacing:0!important;text-transform:none!important;box-shadow:0 4px 12px -4px rgba(11,61,92,.3)!important}' +
    'html.zapp .z3md svg,html.zapp .zu-more a svg,html.zapp .zu-more button svg,html.zapp .zjw svg{width:10px!important;height:10px!important;stroke:currentColor!important}html.zapp .zu-more a:after,html.zapp .zu-more a:before,html.zapp .zjw:before,html.zapp .zjw:after{display:none!important}' +
    '.zpg button i.go{width:16px!important;height:16px!important}.zpg button i.go .zsi{width:9px!important;height:9px!important}' +
    'html.zapp .zth h2,html.zapp .mh h2,html.zapp .zhx h2,html.zapp .who2 h2,html.zapp .zsc2 h2,html.zapp .w2-hd h2{font-family:Manjari,Inter,"Noto Sans Malayalam",sans-serif!important;font-weight:700!important;font-size:25px!important;letter-spacing:.01em!important;line-height:1.3!important}' +
    'html.zapp .wa,html.zapp .ig{display:none!important}html.zapp[data-zt=zest] #zproj{order:6}' +
    'html.zapp #centre-info .z3k{filter:drop-shadow(0 3px 6px rgba(11,61,92,.12))!important;box-shadow:none!important}html.zapp #centre-info .z3s{padding-bottom:24px!important}html.zapp #centre-info .z3d{display:none!important}' +
    '#zproj{display:none}html.zapp[data-zt=zest] #zproj{display:block}html.zapp #zproj{order:6;background:#eef3f7}html.zapp[data-zt=zest] #programs{display:none!important}' +
    '.zpj{display:grid;gap:20px}.zpk{background:#fff;border-radius:26px;box-shadow:0 10px 26px -12px rgba(11,61,92,.35);overflow:hidden}.zpk-im{padding:12px 12px 0}.zpk-im img{display:block;width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:18px;background:#e6f0f6}' +
    '.zpk-b{padding:14px 18px 2px}.zpk-c{font:700 12.5px ' + F + '}.zpk h3{margin:6px 0 6px!important;font:800 18px/1.3 ' + F + '!important;color:#0b2a3d;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
    '.zpk p{margin:0;font:400 13px/1.7 ' + F + ';color:#4a5d69;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden;min-height:calc(14.5px*1.7*4)}.zpk.op p{-webkit-line-clamp:unset;display:block}' +
    '.zpk ul{display:none;margin:12px 0 2px;padding:4px 14px;list-style:none;border-radius:16px;background:#f4f9fc;border:1px solid #e3edf3}.zpk.op ul{display:block}.zpk li{display:flex;gap:8px;padding:7px 0;font:500 12.5px/1.5 ' + F + ';color:#0b2a3d}.zpk li+li{border-top:1px solid #e9f0f4}.zpk li i{font-style:normal;font-weight:900}' +
    '.zpk-cut{position:relative;height:24px;margin:6px 0 2px}.zpk-cut:before{content:"";position:absolute;left:20px;right:20px;top:11px;border-top:2px dashed #d5e1e9}.zpk{position:relative}.zpk-cut:after{content:"";position:absolute;left:0;right:0;top:0;height:24px;background:radial-gradient(circle at 0 50%,#eef3f7 11px,transparent 12px),radial-gradient(circle at 100% 50%,#eef3f7 11px,transparent 12px)}' +
    '.zpk-f{display:flex;align-items:center;gap:8px;padding:2px 16px 16px}.zpk-more{display:inline-flex!important;align-items:center;gap:3px;padding:4px 10px!important;border-radius:999px;background:linear-gradient(135deg,#e6f5fd,#bfe3f6)!important;border:1px solid #bfe3f6!important;color:#0b5d8f!important;font:800 10.5px/1.2 ' + F + '!important;box-shadow:0 4px 12px -4px rgba(11,61,92,.3);cursor:pointer}.zpk-more b{display:grid;place-items:center;width:12px;height:12px;transition:transform .2s}.zpk-more b svg{width:12px;height:12px;fill:none;stroke:currentColor;stroke-width:2.8;stroke-linecap:round;stroke-linejoin:round;animation:zpkB 1.4s ease-in-out infinite}.zpk.op .zpk-more b svg{animation:none}@keyframes zpkB{0%,100%{transform:translateY(-1px)}50%{transform:translateY(2px)}}.zpk.op .zpk-more b{transform:rotate(180deg)}' +
    '.zpk-sh,.zpk-wa{flex:none;display:grid;place-items:center;width:32px;height:32px;border-radius:50%;padding:0;cursor:pointer}.zpk-sh{margin-left:auto;background:#fff;border:1.5px solid #cfe0ea}.zpk-wa{background:#25d366;border:0}.zpk-sh svg{width:15px;height:15px}.zpk-wa svg{width:17px;height:17px}' +
    '.zpk-im{position:relative}.zpk-im:after{content:"";position:absolute;left:12px;right:12px;top:12px;bottom:0;border-radius:18px;background:linear-gradient(180deg,transparent 45%,rgba(8,30,45,.85));pointer-events:none}' +
    '.zpk-im h3{position:absolute;z-index:1;left:28px;right:28px;bottom:18px;margin:0!important;color:#fff!important;font:600 16px/1.4 ' + F + '!important;text-shadow:0 2px 8px rgba(0,0,0,.4);white-space:normal!important}.zpk-im h3:after{content:"";display:block;width:44px;height:4px;margin-top:9px;border-radius:3px;background:linear-gradient(90deg,#ffc44d,#3fa7d6)}.zpk-b{padding-top:14px!important}' +
    'html.zapp #programs .zb-t h3{right:24px!important}html.zapp #programs .zb-t.b h3{right:40px!important}html.zapp #programs .zb-t .zgo{position:absolute;bottom:9px;right:8px;width:14px;height:14px;border-radius:50%;background:#1380b8;display:grid;place-items:center;box-shadow:0 2px 6px rgba(0,0,0,.25);z-index:2}html.zapp #programs .zb-t.b .zgo{width:17px;height:17px;bottom:15px;right:12px}html.zapp #programs .zb-t .zgo:after{content:;position:absolute;inset:0;border-radius:50%;border:2px solid #3fa7d6;animation:zgP 1.8s ease-out infinite}html.zapp #programs .zb-t .zgo svg{animation:zgA 1.8s ease-in-out infinite}@keyframes zgA{0%,100%{transform:translate(-1px,1px)}50%{transform:translate(1.5px,-1.5px)}}@keyframes zgP{0%{transform:scale(1);opacity:.8}70%,100%{transform:scale(1.9);opacity:0}}html.zapp #programs .zb-t .zgo svg{width:8px;height:8px}html.zapp #programs .zb-t.b .zgo svg{width:10px;height:10px}html.zapp #programs .zb-t{cursor:pointer}html.zapp #programs .zb-t:active{transform:scale(.97);transition:transform .15s}' +
    'html.zapp #programs .zb-t h3{font-size:.72rem!important}html.zapp #programs .zb-t.b h3{font-size:.95rem!important}' +
    '.znav .zdv{display:block!important;opacity:1!important;visibility:visible!important;transform:none!important;width:27px;height:27px;background:url(/icons/dove-gray.png) center/contain no-repeat}.znav a.on .zdv{background-image:url(/icons/dove-blue.png)}html.zapp #programs .zb-t h3 .zl{white-space:nowrap}' +
    'html.zapp div.zth{padding:0!important;background:#0b3d5c!important;border-radius:0 0 28px 28px!important}html.zapp div.zth:after{display:none}html.zapp div.zth img{width:100%!important;max-width:none!important;aspect-ratio:780/430!important;border:0!important;border-radius:0!important;box-shadow:none!important;margin:0!important}html.zapp div.zth:before{content:"";position:absolute;inset:0;z-index:2;background:linear-gradient(180deg,rgba(6,34,54,0) 35%,rgba(6,34,54,.25) 55%,rgba(6,34,54,.7) 78%,rgba(6,34,54,.92) 100%)}html.zapp div.zth h2,html.zapp div.zth p{position:absolute!important;z-index:3;margin:0!important;text-shadow:0 1px 6px rgba(0,0,0,.35)}html.zapp div.zth h2{left:20px;right:20px;bottom:33px;font-size:21px!important;text-align:left}html.zapp div.zth h2:before{content:"";display:block;width:36px;height:4px;border-radius:4px;margin-bottom:8px;background:linear-gradient(90deg,#ffc44d,#3fa7d6)}html.zapp div.zth p{left:20px;right:20px;bottom:16px;font-size:12px!important;text-align:left;color:#e3f1fa!important}' +
    'html.zapp .tl-ext{display:none!important}html.zapp .tl::before{top:var(--zst,0)!important;bottom:auto!important;height:calc(var(--zend,100%) - var(--zst,0px))}html.zapp .tl-fill{top:var(--zst,0)!important;max-height:calc(var(--zend,100%) - var(--zst,0px))}#zext{position:absolute;width:4px;margin-left:-2px;background:#d3e7f3;z-index:5;pointer-events:none;display:none}#zext i{display:block;width:100%;height:0;background:linear-gradient(180deg,#1380b8,#3fa7d6)}html.zapp #about .zabh .tag{margin:0!important;font:400 .95rem/1.25 Inter,"Noto Sans Malayalam",sans-serif!important;letter-spacing:.03em!important;gap:.6rem!important}html.zapp #about .zabh .tag::before{width:1.25rem!important;height:1.25rem!important}html.zapp[data-zt=zest] #about{padding-bottom:4px!important}html.zapp[data-zt=zest] #numbers{padding-top:4px!important}html.zapp #about .zrm{background:linear-gradient(135deg,#e6f5fd,#bfe3f6)!important;border:1px solid #bfe3f6!important;color:#0b5d8f!important;padding:4px 10px!important;min-height:0!important;border-radius:999px!important;font:800 12px/1.2 Inter,"Noto Sans Malayalam",sans-serif!important;letter-spacing:0!important;text-transform:none!important;box-shadow:0 4px 12px -4px rgba(11,61,92,.3)!important}html.zapp #about .zrm svg{stroke:#0b5d8f!important}' +
    'html.zapp #about .q1{display:none!important}html.zapp .zig-btn{display:inline-flex!important;align-items:center;gap:5px;margin:14px 0 0!important;padding:6px 12px!important;border-radius:999px!important;background:linear-gradient(135deg,#e6f5fd,#bfe3f6)!important;border:1px solid #bfe3f6!important;color:#0b5d8f!important;font:800 12px/1.2 Inter,"Noto Sans Malayalam",sans-serif!important;letter-spacing:0!important;box-shadow:0 4px 12px -4px rgba(11,61,92,.3)!important}html.zapp .zig-btn svg{stroke:#0b5d8f!important;width:14px!important;height:14px!important}' +
    'html.zapp .z3rm.on{background:linear-gradient(135deg,#ffe08a,#f5b623)!important;border-color:#e9a514!important;color:#5a3a00!important;box-shadow:0 4px 12px -4px rgba(201,138,0,.45)!important}' +
    'html.zapp .z3cd{display:none!important}html.zapp .z3c{padding:6px 3px 5px!important;gap:3px!important;border-radius:12px!important}html.zapp .z3i{width:23px!important;height:23px!important;border-radius:8px!important}html.zapp .z3i svg{width:13px!important;height:13px!important}html.zapp .z3cs{gap:6px!important}html.zapp .z3row{display:flex!important;flex-wrap:nowrap!important;align-items:center!important;gap:5px!important;min-height:22px;margin-top:8px!important}html.zapp .z3row .z3md,html.zapp .z3row .z3rm{flex:none;margin:0!important;padding:3px 8px!important;font-size:10px!important;line-height:1.3!important;white-space:nowrap!important;min-height:0!important}html.zapp .z3row .z3md svg{width:8px!important;height:8px!important}html.zapp .z3ti{display:-webkit-box!important;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:2.7em}html.zapp .z3k{display:flex!important;flex-direction:column!important}html.zapp .z3k .z3t{flex:1 1 auto}html.zapp .z3cal span{font-size:8px!important;line-height:1.2!important;letter-spacing:0!important}html.zapp .z3cal b{font-size:13px!important;line-height:1.1!important}html.zapp .z3dl{font-size:8.5px!important;line-height:1.2!important}html.zapp .z3ab{margin-left:auto!important}html.zapp .fsec h2.h{display:flex!important;align-items:center;gap:10px;border:0!important;padding:0!important;font:600 20.5px/1.3 Inter,"Noto Sans Malayalam",sans-serif!important;color:#111!important;text-transform:none!important}html.zapp .fsec h2.h:before{content:"";flex:none;width:20px;height:20px;border:1.5px solid #5f6f5f;border-radius:50%;background:radial-gradient(circle,#5f6f5f 0 4.5px,transparent 5px);box-sizing:border-box}' +
    'html.zapp #centre-info .z3bot .z3s{padding-bottom:12px!important}html.zapp #centre-info .zu-more{margin-top:0!important}' +
    'html.zapp #documentary a.yt{display:inline-flex!important;align-items:center;gap:5px;width:auto!important;min-height:0!important;padding:4px 10px!important;border-radius:999px!important;background:linear-gradient(135deg,#e6f5fd,#bfe3f6)!important;border:1px solid #bfe3f6!important;color:#0b5d8f!important;font:800 12px/1.2 Inter,"Noto Sans Malayalam",sans-serif!important;letter-spacing:0!important;text-transform:none!important;box-shadow:0 4px 12px -4px rgba(11,61,92,.3)!important}html.zapp #documentary a.yt svg{width:14px!important;height:14px!important}' +
    'html.zapp #stories .tag{transform:none!important;opacity:1!important;transition:none!important}' +
    'html.zapp .z3l small{display:block!important}' +
    'html.zapp .z3cs .z3l{font-size:10px!important;line-height:1.35!important}html.zapp .z3cs .z3l small{font-size:9px!important;line-height:1.2!important}' +
    'html.zapp body{zoom:var(--zfz,1)}.zfzr{border-bottom:0!important;cursor:default}.zfz{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;padding:0 0 12px}.zfz button{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:3px;min-height:58px;padding:8px 2px;border:1.5px solid #dbe9f2;border-radius:12px;background:#fff;color:#0b3d5c;font-family:inherit;cursor:pointer}.zfz button b{font-family:Inter,sans-serif;font-weight:800;line-height:1}.zfz button small{font-size:10.5px;font-weight:700;line-height:1.2;text-align:center}.zfz button.on{background:linear-gradient(135deg,#1e90cf,#0b5d8f);border-color:transparent;color:#fff;box-shadow:0 6px 14px rgba(19,128,184,.3)}' +
    'html.zapp .zlg{position:relative!important;height:28px!important;width:64px!important;border:0!important;background:#e3f2fb!important;border-radius:999px!important;padding:0!important;overflow:visible!important;box-shadow:inset 0 1px 3px rgba(11,61,92,.15)!important}html.zapp .zlg span{position:relative;z-index:1;flex:1;justify-content:center;padding:0!important;background:none!important;color:#6a8fa6!important;font:800 11px/1 Inter,"Noto Sans Malayalam",sans-serif!important;transition:color .25s}html.zapp .zlg span.on{color:#fff!important}html.zapp .zlg:after{content:"";position:absolute;top:3px;bottom:3px;width:29px;border-radius:999px;background:linear-gradient(135deg,#1e90cf,#0b5d8f);box-shadow:0 2px 6px rgba(11,93,143,.4);left:3px;transition:left .25s}html[data-lang=ml].zapp .zlg:after{left:32px}' +
    '.zspk{flex:none;display:grid!important;place-items:center;width:32px;height:32px;border-radius:50%;background:#e6f5fd;border:1.5px solid #bfe3f6;margin-right:6px;padding:0;cursor:pointer;-webkit-tap-highlight-color:transparent}.zspk svg{width:16px;height:16px}.zspk.on{background:#1380b8;border-color:#1380b8}.zspk.on svg path{stroke:#fff;fill:#fff}.zpk-f .zspk{margin:0 0 0 auto}.zpk-f .zspk+.zpk-sh{margin-left:0!important}.zpl{position:fixed;left:10px;right:10px;bottom:calc(74px + env(safe-area-inset-bottom));z-index:9998;background:#0b3d5c;border-radius:20px;padding:10px 14px;color:#fff;box-shadow:0 12px 26px -8px rgba(11,61,92,.6);display:flex;align-items:center;gap:10px;font-family:Inter,"Noto Sans Malayalam",sans-serif;transform:translateY(150%);transition:transform .3s}.zpl.on{transform:none}.zpl .pp{width:40px;height:40px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;flex:none;border:0;padding:0;cursor:pointer}.zpl .pp i{display:inline-block;width:4px;height:14px;background:#0b3d5c;margin:0 2px;border-radius:2px}.zpl .pp.ps i{display:none}.zpl .pp.ps:after{content:"";border-left:13px solid #0b3d5c;border-top:8px solid transparent;border-bottom:8px solid transparent;margin-left:4px}.zpl .tt{flex:1;min-width:0}.zpl .tt b{display:block;font-size:12.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.zpl .bar{height:4px;border-radius:2px;background:rgba(255,255,255,.25);margin-top:6px;overflow:hidden}.zpl .bar span{display:block;width:0;height:100%;background:#7fc6ea;transition:width .4s}.zpl small{display:block;font-size:10px;opacity:.8;white-space:nowrap;margin-top:4px}.zpl .sp{font:800 11px Inter,sans-serif;background:rgba(255,255,255,.15);padding:5px 9px;border-radius:99px;border:0;color:#fff;cursor:pointer}.zpl .x{font-size:18px;opacity:.85;background:none;border:0;color:#fff;padding:0 2px;cursor:pointer}' +
    '.zpg button{position:relative}.zpg .zsn{position:absolute;z-index:2;right:8px;top:8px;background:#e3f2fb;color:#0b5d8f;font:700 8.5px/1.2 Inter,"Noto Sans Malayalam",sans-serif;font-style:normal;padding:2px 7px;border-radius:999px;box-shadow:0 1px 4px rgba(11,61,92,.12)}.zpg.zpc .zsn{right:4px;top:4px;font-size:7.5px;padding:1px 5px}' +
    '.zsoonh{display:flex;align-items:center;gap:10px;margin:26px 2px 14px;font:600 19px/1.3 Inter,"Noto Sans Malayalam",sans-serif;color:#111}.zsoonh:before{content:"";flex:none;width:20px;height:20px;border:1.5px solid #5f6f5f;border-radius:50%;background:radial-gradient(circle,#5f6f5f 0 4.5px,transparent 5px);box-sizing:border-box}' +
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
    'html.zapp body>header{order:0}html.zapp #zv-prime,html.zapp #zv-zest,html.zapp #zv-me{order:1}html.zapp #centre-info{order:3}html.zapp #zprime2{order:4}html.zapp #about{order:4}html.zapp #numbers{order:5}html.zapp #programs{order:6}html.zapp #clubs{order:7}html.zapp #documentary{order:8}html.zapp #news{order:9}html.zapp #stories{order:10}html.zapp #zv-me2{order:11}html.zapp #join{order:12}html.zapp #contact{order:13}html.zapp body>*{order:20}html.zapp body>header,html.zapp body>section,html.zapp body>footer,html.zapp .zview{flex:none}' +
    'html.zapp[data-zt=me] #zv-me2{display:block}' +
    /* centre info page */
    'html.zapp #sec-projects,html.zapp footer.addr{display:none!important}';
  document.head.appendChild(css);
  /* ===== ZEST APP design system: one font, one type scale, brand colours only ===== */
  var fl = document.createElement("link"); fl.rel = "stylesheet"; fl.href = "https://fonts.googleapis.com/css2?family=Inter:wght@700;800&family=Noto+Sans+Malayalam:wght@500;700&display=swap"; document.head.appendChild(fl);
  var UF = 'Inter,"Noto Sans Malayalam",system-ui,sans-serif';
  var RING = 'content:"";flex:none;box-sizing:border-box;width:18px;height:18px;border:1.5px solid #1380b8;border-radius:50%;background:radial-gradient(circle,#1380b8 0 3.5px,transparent 4px)';
  var BTN = 'background:linear-gradient(135deg,#0d5a8c,#1380b8)!important;color:#fff!important;border:0!important;box-shadow:0 6px 16px rgba(19,128,184,.28)!important';
  var zu = document.createElement("style"); zu.id = "zuni"; zu.textContent =
    /* font everywhere */
    'html.zapp body,html.zapp body :is(h1,h2,h3,h4,h5,h6,p,span,a,b,strong,em,i,small,button,input,select,textarea,label,li,div,td,th):not(.zsc2 *):not(.zrv *):not(.zmy *){font-family:' + UF + '!important}' +
    /* L1: section label (ring) + section heading */
    'html.zapp .tag,html.zapp .zu-h,html.zapp .zt1{display:flex!important;align-items:center!important;gap:10px!important;margin:0 0 6px!important;font:600 12.5px/1.3 ' + UF + '!important;letter-spacing:.06em!important;text-transform:uppercase!important;color:#4a5d69!important;-webkit-text-fill-color:#4a5d69!important}' +
    'html.zapp .tag::before,html.zapp .zt1::before{' + RING + '!important;width:18px!important;height:18px!important}' +
    'html.zapp .zu-h .zu-live{flex:none!important;width:18px!important;height:18px!important;box-sizing:border-box!important;border:1.5px solid #1380b8!important;border-radius:50%!important;background:radial-gradient(circle,#1380b8 0 3.5px,transparent 4px)!important;box-shadow:none!important;margin:0!important;animation:none!important}html.zapp .zu-h .zu-live::before,html.zapp .zu-h .zu-live::after{display:none!important}' +
    'html.zapp h2.zh2,html.zapp .zu-sub,html.zapp .zt2{margin:0 0 14px!important;font:700 21px/1.35 ' + UF + '!important;letter-spacing:0!important;text-transform:none!important;color:#0b2540!important;-webkit-text-fill-color:#0b2540!important}' +
    /* L2: sub-section title – ring + one line, same everywhere */
    'html.zapp .fsec h2.h,html.zapp .zsoonh,html.zapp .zsh,html.zapp #zmed .mhr h3{display:flex!important;align-items:center!important;gap:10px!important;font:700 16px/1.35 ' + UF + '!important;color:#0b2540!important;text-transform:none!important;letter-spacing:0!important}' +
    'html.zapp .fsec h2.h::before,html.zapp .zsoonh::before,html.zapp .zsh::before,html.zapp #zmed .mhr h3::before{' + RING + '!important}' +
    'html.zapp .zsoonh{margin:26px 2px 14px!important}html.zapp .zsh{margin:22px 2px 12px!important}' +
    'html.zapp #zmed .mhr{border-left:0!important;padding:0!important;margin:18px 14px 12px!important}html.zapp #zmed .mhr p{margin:6px 0 0 28px!important;font:500 12.5px/1.55 ' + UF + '!important;color:#5f6f7a!important}' +
    '' +
    /* page heroes: every page the same (full image, navy fade, bar + title bottom-left) */
    'html.zapp div.zth h2,html.zapp #zpv .hh h2{font:800 22px/1.25 ' + UF + '!important}' +
    'html.zapp #zlib .mh,html.zapp #zmed .mh{position:relative!important;padding:0!important;text-align:left!important;background:#0b3d5c!important;border-radius:0 0 28px 28px!important;overflow:hidden!important}' +
    'html.zapp #zlib .mh::after,html.zapp #zmed .mh::after{display:none!important}' +
    'html.zapp #zlib .mh::before,html.zapp #zmed .mh::before{content:""!important;position:absolute!important;inset:0!important;z-index:2!important;background:linear-gradient(180deg,rgba(6,34,54,0) 35%,rgba(6,34,54,.25) 55%,rgba(6,34,54,.7) 78%,rgba(6,34,54,.92) 100%)!important;pointer-events:none}' +
    'html.zapp #zlib .mh .zhimg,html.zapp #zmed .mh .zhimg{display:block!important;width:100%!important;max-width:none!important;height:auto!important;aspect-ratio:780/430!important;object-fit:cover!important;margin:0!important;border:0!important;border-radius:0!important;box-shadow:none!important}' +
    'html.zapp #zlib .mh h2,html.zapp #zmed .mh h2{position:absolute!important;z-index:3!important;left:20px!important;right:20px!important;bottom:33px!important;margin:0!important;font:800 22px/1.25 ' + UF + '!important;color:#fff!important;text-align:left!important;text-shadow:0 1px 6px rgba(0,0,0,.35)}' +
    'html.zapp #zlib .mh h2::before,html.zapp #zmed .mh h2::before{content:"";display:block;width:36px;height:4px;border-radius:4px;margin-bottom:8px;background:linear-gradient(90deg,#ffc44d,#3fa7d6)}' +
    'html.zapp #zlib .mh p,html.zapp #zmed .mh p{position:absolute!important;z-index:3!important;left:20px!important;right:20px!important;bottom:14px!important;margin:0!important;font:500 12.5px/1.3 ' + UF + '!important;color:#e3f1fa!important;text-align:left!important}' +
    'html.zapp #zlib .mh .bk,html.zapp #zmed .mh .bk,html.zapp #zlib .mh .lsw,html.zapp #zmed .mh .lsw{z-index:4!important}' +
    'html.zapp #zlib .mh .bk,html.zapp #zmed .mh .bk{background:rgba(11,61,92,.55)!important}' +
    /* students corner: hero only (rest of the page keeps its own look) */
    'html.zapp .zsc2 .w2-hd:not(.zdh){position:relative!important;padding:0!important;text-align:left!important;background:#0b3d5c!important;border-radius:0 0 28px 28px!important;overflow:hidden!important}html.zapp .zsc2 .w2-hd:not(.zdh)::after{display:none!important}' +
    'html.zapp .zsc2 .w2-hd:not(.zdh)::before{content:""!important;position:absolute!important;inset:0!important;z-index:2!important;background:linear-gradient(180deg,rgba(6,34,54,0) 35%,rgba(6,34,54,.25) 55%,rgba(6,34,54,.7) 78%,rgba(6,34,54,.92) 100%)!important;pointer-events:none}' +
    'html.zapp .zsc2 .w2-hd:not(.zdh) .zhimg{display:block!important;width:100%!important;max-width:none!important;height:auto!important;aspect-ratio:780/430!important;object-fit:cover!important;margin:0!important;border:0!important;border-radius:0!important;box-shadow:none!important}' +
    'html.zapp .zsc2 .w2-hd:not(.zdh) h2{position:absolute!important;z-index:3!important;left:20px!important;right:20px!important;bottom:33px!important;margin:0!important;font:800 22px/1.25 ' + UF + '!important;color:#fff!important;text-align:left!important;text-shadow:0 1px 6px rgba(0,0,0,.35)}' +
    'html.zapp .zsc2 .w2-hd:not(.zdh) h2::before{content:"";display:block;width:36px;height:4px;border-radius:4px;margin-bottom:8px;background:linear-gradient(90deg,#ffc44d,#3fa7d6)}' +
    'html.zapp .zsc2 .w2-hd:not(.zdh) p{position:absolute!important;z-index:3!important;left:20px!important;right:20px!important;bottom:14px!important;margin:0!important;font:500 12.5px/1.3 ' + UF + '!important;color:#e3f1fa!important;text-align:left!important}' +
    'html.zapp .zsc2 .x0,html.zapp .zsc2 .w2-hd:not(.zdh) .lsw{z-index:4!important}html.zapp .zsc2 .x0{background:rgba(11,61,92,.55)!important}' +
    /* students corner: idea box like the others (light blue, brand button) */
    'html.zapp .zsc2 .zs-sg{background:linear-gradient(135deg,#eef7fd,#e1f0fa)!important;border:1.5px solid #c6e2f4!important}html.zapp .zsc2 .zs-sg .sh b{color:#0b2540!important}html.zapp .zsc2 .zs-sg .sh small{color:#6b7c8d!important}' +
    'html.zapp .zsc2 .zs-sg .sgt{border:1.5px solid #d6e0ea!important;border-radius:12px!important;background:#fff!important}' +
    'html.zapp .zsc2 .zs-sg .sgb{' + BTN + ';border-radius:999px!important;font:700 14px ' + UF + '!important}' +
    'html.zapp #zabout b{bottom:40px!important}html.zapp #zabout em{bottom:13px!important;padding:2px 8px!important;font-size:9.5px!important;gap:3px!important}' +
    'html.zapp .card.tk{scroll-margin-top:110px}' +
    /* students corner – student space: same hero as every page, only "My tools" below */
    'html.zapp .zsc2 .zs-sum{display:none!important}' +
    'html.zapp .zsc2 .zdh{position:relative!important;padding:0!important;aspect-ratio:780/430!important;background:#0b3d5c url(/img/hero/students.svg) center/cover no-repeat!important;border-radius:0 0 28px 28px!important;overflow:hidden!important}' +
    'html.zapp .zsc2 .zdh::after{display:none!important}html.zapp .zsc2 .zdh::before{content:""!important;position:absolute!important;inset:0!important;z-index:1!important;background:linear-gradient(180deg,rgba(6,34,54,0) 35%,rgba(6,34,54,.25) 55%,rgba(6,34,54,.7) 78%,rgba(6,34,54,.92) 100%)!important}' +
    'html.zapp .zsc2 .zdh .me{position:absolute!important;z-index:3!important;left:20px!important;right:20px!important;bottom:14px!important;max-width:none!important;margin:0!important;display:block!important}html.zapp .zsc2 .zdh .me>i{display:none!important}' +
    'html.zapp .zsc2 .zdh .me b{font:800 22px/1.25 ' + UF + '!important;color:#fff!important;text-shadow:0 1px 6px rgba(0,0,0,.35);margin-bottom:5px!important}html.zapp .zsc2 .zdh .me b::before{content:"";display:block;width:36px;height:4px;border-radius:4px;margin-bottom:8px;background:linear-gradient(90deg,#ffc44d,#3fa7d6)}' +
    'html.zapp .zsc2 .zdh .me small{font:500 12.5px/1.3 ' + UF + '!important;color:#e3f1fa!important}' +
    'html.zapp .zsc2 .zdh .chip{position:absolute!important;right:0!important;bottom:2px!important;background:rgba(255,255,255,.2)!important}html.zapp .zsc2 .zdh .me>span{display:block!important;padding-right:84px!important}' +
    'html.zapp .zsc2 .zdh .x1{z-index:4!important;background:rgba(11,61,92,.55)!important}html.zapp .zsc2.dash .w2-bd{padding-top:8px!important}' +
    /* cards */
    'html.zapp .zpg button b{font:700 14.5px/1.35 ' + UF + '!important;color:#0b2540!important}html.zapp .zpg button small{font:500 12px/1.45 ' + UF + '!important;color:#6b7c8d!important}' +
    'html.zapp .zmc button[data-c="donor"]{background:linear-gradient(140deg,#0b3d5c,#1380b8)!important}html.zapp .zmc button[data-c="stu"]{background:linear-gradient(140deg,#1380b8,#3fa7d6)!important}' +
    'html.zapp .zmc b{font:700 14.5px/1.3 ' + UF + '!important}' +
    /* info banners: one soft brand style */
    'html.zapp #zlib .soon,html.zapp #zmed .soon{background:#e6f3fb!important;color:#0b5d8f!important;border:0!important}' +
    /* suggestion boxes: white card, brand blue */
    'html.zapp .zsg,html.zapp #zpv .sg{background:linear-gradient(135deg,#eef7fd,#e1f0fa)!important;border:1.5px solid #c6e2f4!important;box-shadow:none!important}html.zapp .zsg-h i,html.zapp #zpv .sg .h i{background:#fff!important}html.zapp .zsg textarea,html.zapp #zpv textarea{background:#fff!important}' +
    'html.zapp .zsg-h b{color:#0b2540!important;font:700 15px/1.35 ' + UF + '!important}html.zapp .zsg-h small{color:#6b7c8d!important;font:500 12px/1.4 ' + UF + '!important}' +
    'html.zapp .zsg textarea,html.zapp #zpv textarea{border:1.5px solid #d6e0ea!important;border-radius:12px!important}' +
    /* buttons: one primary style (brand blue pill) */
    'html.zapp .zsg button,html.zapp #zpv .sb,html.zapp .zwsh .go,html.zapp #zmed .go,html.zapp #zmed .go.eqg,html.zapp #zmed .go.gr,html.zapp #zmed .yn .y,html.zapp .zsg .ap .a.zwa{' + BTN + ';border-radius:999px!important;font:700 14px ' + UF + '!important}' +
    'html.zapp #zmed .go{opacity:1!important}' +
    '' +
    'html.zapp #zlib .rq{background:#e6f3fb!important;color:#0b5d8f!important;box-shadow:none!important}html.zapp #zlib .rq svg{fill:#0b5d8f!important}html.zapp #zlib .rq svg path{fill:#0b5d8f!important}' +
    /* selected states: brand blue, not green */
    'html.zapp #zmed .zbyn .on{background:linear-gradient(135deg,#0d5a8c,#1380b8)!important;border-color:#1380b8!important;box-shadow:0 4px 10px rgba(19,128,184,.25)!important}' +
    'html.zapp #zmed .zbt{display:flex!important;align-items:center!important;gap:10px!important;margin:20px 14px 10px!important;font:700 16px/1.35 ' + UF + '!important;color:#0b2540!important}html.zapp #zmed .zbt::before{' + RING + '!important}' +
    'html.zapp #zmed .tb .on{color:#0b3d5c!important}html.zapp #zmed .t.sel{border-color:#1380b8!important;box-shadow:0 0 0 3px rgba(19,128,184,.15)!important}html.zapp #zmed .t.sel::after{background:#1380b8!important}';
  document.head.appendChild(zu);
  /* blood bank section titles: ring instead of emoji */
  var zbq = 0; new MutationObserver(function () { if (zbq) return; zbq = 1; requestAnimationFrame(function () { zbq = 0;
    document.querySelectorAll("#zmed .zbt").forEach(function (b) { var n = b.firstChild; if (n && n.nodeType === 3 && /^[^\u0D00-\u0D7FA-Za-z0-9]+\s/.test(n.textContent)) n.textContent = n.textContent.replace(/^[^\u0D00-\u0D7FA-Za-z0-9]+\s/, ""); });
  }); }).observe(document.documentElement, { childList: true, subtree: true });


  /* ---------- bottom navigation ---------- */
  var NAV = [["home", "home", T("ഹോം", "Home")], ["info", "bell", T("അറിയിപ്പ്", "Updates")], ["prime", "star", "PRIME"], ["zest", "dove", "ZEST"], ["me", "user", T("ഞാൻ", "Me")]];
  var nav = document.createElement("div"); nav.className = "znav"; nav.setAttribute("data-noi18n", "");
  nav.innerHTML = NAV.map(function (n) { return '<a href="' + (n[0] === "info" ? "/centreinfo/" : n[0] === "home" ? "/" : "/#tab-" + n[0]) + '" data-t="' + n[0] + '"' + (n[0] === "prime" ? ' class="c"' : '') + '><b>' + (n[1] === "dove" ? '<i class="zdv"></i>' : ic(n[1])) + '</b>' + n[2] + '</a>'; }).join("");
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
  ready(function () {
    /* bulletin cards (home + bulletin page): tidy footer, labels, WhatsApp for every card */
    (function () {
      var WAS = '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-3.3-.8-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.3 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.7 1.2 1.6 2 1.1 1 2 1.3 2.3 1.4.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.2.1.7-.1 1.2Z"/></svg>';
      function clr(el) { if (!el) return; el.setAttribute("data-zfs", ""); [el].concat([].slice.call(el.querySelectorAll("*"))).forEach(function (x) { x.style && x.style.removeProperty("font-size"); }); }
      function fix() {
        document.querySelectorAll(".z3cs").forEach(clr);
        document.querySelectorAll(".z3k,.card.tk").forEach(function (c) {
          var row = c.querySelector(".z3row"), inn = c.querySelector(".z3in");
          if (!row && inn) { row = document.createElement("span"); row.className = "z3row"; var ti = inn.querySelector(".z3ti"); (ti || inn.lastChild).after(row); }
          clr(row); clr(c.querySelector(".z3dt"));
          var md = c.querySelector(".z3md"); if (md && !md.__z) { md.__z = 1; md.setAttribute("data-noi18n", ""); var tn = [].filter.call(md.childNodes, function (x) { return x.nodeType === 3 && x.textContent.trim(); })[0]; if (tn) tn.textContent = T("വിശദാംശങ്ങൾ", "Details") + " "; else if (!md.querySelector("svg")) md.textContent = T("വിശദാംശങ്ങൾ", "Details"); }
          if (row && !c.querySelector("[data-rem]")) { var sb = c.querySelector("[data-sh],[data-share]"), cid = sb && (sb.getAttribute("data-sh") || sb.getAttribute("data-share")), dtl = c.querySelector(".z3dl"), closed = /closed|completed/i.test(c.textContent) && dtl && !/post/i.test(dtl.textContent);
            if (cid && dtl && /post|പോസ്റ്റ്/i.test(dtl.textContent)) { var td = new Date(), tt = (c.querySelector(".z3ti") || {}).textContent || ""; var iso = td.getFullYear() + "-" + ("0" + (td.getMonth() + 1)).slice(-2) + "-" + ("0" + td.getDate()).slice(-2);
              var rb = document.createElement("span"); rb.className = "z3rm rmc"; rb.setAttribute("role", "button"); rb.tabIndex = 0; rb.setAttribute("data-rem", cid); rb.setAttribute("data-k", "later"); rb.setAttribute("data-d", iso); rb.setAttribute("data-t", tt.trim()); rb.textContent = "🔔 Remind me"; row.appendChild(rb); } }
          var dl = c.querySelector(".z3dl"); if (dl && !dl.__z) { dl.__z = 1; dl.setAttribute("data-noi18n", ""); if (/post|പോസ്റ്റ്/i.test(dl.textContent)) dl.innerHTML = "POST<br>DATE"; else if (/program|പരിപാടി|പ്രോഗ്രാം/i.test(dl.textContent)) dl.innerHTML = "PROGRAM<br>DATE"; else dl.innerHTML = "LAST<br>DATE"; }
          var ab = c.querySelector(".z3ab");
          if (ab && !ab.querySelector(".zw,.zenq")) {
            var sh = ab.querySelector("[data-sh],[data-share]"); if (!sh) return;
            if (sh.hasAttribute("data-sh")) ab.insertAdjacentHTML("afterbegin", '<span class="zw" role="button" tabindex="0" aria-label="WhatsApp" data-wa="' + sh.getAttribute("data-sh") + '">' + WAS + '</span>');
            else {
              var t = sh.getAttribute("data-t") || "", no = sh.getAttribute("data-no"), PR = { info: "info", program: "prgm", job: "job" }, kd = sh.getAttribute("data-kind");
              var link = no ? "https://zestforpeace.com/app/" + (PR[kd] || "info") + no : "https://zestforpeace.com/centreinfo/";
              var msg = T("ഹലോ ZEST സെന്റർ 👋", "Hello ZEST Centre 👋") + "\n\n📌 " + t + "\n\n" + T("ഈ ജോലിക്ക് അപേക്ഷിക്കാൻ സഹായിക്കാമോ?", "Can you help me apply for this job?") + "\n\n🔗 " + link;
              ab.insertAdjacentHTML("afterbegin", '<a class="zenq" aria-label="WhatsApp" href="https://wa.me/918848313837?text=' + encodeURIComponent(msg) + '" target="_blank" rel="noopener">' + WAS.replace("<svg ", '<svg fill="#fff" ') + '</a>');
            }
          }
        });
        if (CI) {
          var H = { "sec-week": T("ഈ ആഴ്ച", "This week"), "sec-programs": T("പരിപാടികൾ", "Programs"), "sec-info": T("അറിയിപ്പുകൾ", "Announcements"), "sec-jobs": T("ജോലി ഒഴിവുകൾ", "Job vacancies") };
          Object.keys(H).forEach(function (id) { var h = document.querySelector("#" + id + " > h2.h"); if (h && h.textContent !== H[id]) { h.setAttribute("data-noi18n", ""); h.textContent = H[id]; } });
        }
      }
      if (ML) { var CL = { week: ["ഈ", "ആഴ്ച"], program: ["ZEST", "പ്രോഗ്രാം"], info: ["പ്രധാന", "അറിയിപ്പ്"], job: ["ജോലി", "ഒഴിവ്"] };
        setTimeout(function () { document.querySelectorAll(".z3c[data-k]").forEach(function (c) { var l = c.querySelector(".z3l"), v = CL[c.getAttribute("data-k")]; if (l && v) { l.setAttribute("data-noi18n", ""); l.innerHTML = v[0] + "<small>" + v[1] + "</small>"; } }); }, 50); }
      var ft; new MutationObserver(function () { clearTimeout(ft); ft = setTimeout(fix, 60); }).observe(document.body, { childList: true, subtree: true });
      fix();
    })();
  });

  function loadMed(cb) { if (window.ZestMed) return cb(); var s = document.createElement("script"); s.src = "/medical.js?v=17"; s.onload = cb; document.head.appendChild(s); }
  function loadLib(cb) { if (window.ZestLib) return cb(); var s = document.createElement("script"); s.src = "/library.js?v=8"; s.onload = cb; document.head.appendChild(s); }
  function clickHash(h) { var a = document.createElement("a"); a.href = h; a.style.display = "none"; document.body.appendChild(a); a.click(); a.remove(); }
  /* ask name / house / mobile before sending a suggestion (nothing is saved on the phone) */
  function zWho(head, text) {
    var F = 'Inter,"Noto Sans Malayalam",sans-serif';
    if (!document.getElementById("zwho-css")) { var c = document.createElement("style"); c.id = "zwho-css"; c.textContent =
      '.zwbg{position:fixed;inset:0;z-index:2147483640;background:rgba(10,30,45,.45);opacity:0;transition:opacity .25s}.zwbg.on{opacity:1}' +
      '.zwsh{position:fixed;left:0;right:0;bottom:0;z-index:2147483641;background:#fff;border-radius:24px 24px 0 0;padding:10px 18px calc(18px + env(safe-area-inset-bottom));font-family:' + F + ';transform:translateY(100%);transition:transform .3s cubic-bezier(.2,.8,.2,1);max-width:34rem;margin:0 auto}.zwsh.on{transform:none}' +
      '.zwsh .gr{width:40px;height:4px;border-radius:4px;background:#dbe4ec;margin:0 auto 14px}.zwsh h4{margin:0 0 4px;font:800 17px ' + F + ';color:#0b2540}.zwsh p{margin:0 0 14px;font:500 12.5px/1.5 ' + F + ';color:#6b7c8d}' +
      '.zwsh label{display:block;font:700 12.5px ' + F + ';color:#34495e;margin:10px 2px 6px}.zwsh label em{font-style:normal;color:#e2574c}.zwsh label small{font-weight:500;color:#9aa8b5}' +
      '.zwsh input{width:100%;box-sizing:border-box;border:1.5px solid #d6e0ea;border-radius:12px;padding:11px 12px;font:500 15px ' + F + ';color:#0b2540;background:#fbfcfd;outline:none}.zwsh input:focus{border-color:#1380b8;box-shadow:0 0 0 4px rgba(19,128,184,.12)}.zwsh input.inv{border-color:#e2574c;background:#fff6f5}' +
      '.zwsh .go{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;margin-top:16px;border:0;background:#25d366;color:#fff;padding:14px;border-radius:14px;font:800 15px ' + F + ';cursor:pointer}';
      document.head.appendChild(c); }
    var bg = document.createElement("div"); bg.className = "zwbg";
    var sh = document.createElement("div"); sh.className = "zwsh"; sh.setAttribute("data-noi18n", "");
    sh.innerHTML = '<div class="gr"></div><h4>' + T("നിങ്ങളുടെ വിവരങ്ങൾ", "Your details") + '</h4><p>' + T("ആരാണ് അയക്കുന്നത് എന്ന് അറിയാൻ മാത്രം.", "Just so we know who sent it.") + '</p>' +
      '<label>' + T("പേര്", "Name") + ' <em>*</em></label><input class="w1" autocomplete="name">' +
      '<label>' + T("വീട്ടുപേര്", "House name") + ' <small>(' + T("നിർബന്ധമില്ല", "optional") + ')</small></label><input class="w2">' +
      '<label>' + T("മൊബൈൽ നമ്പർ", "Mobile number") + ' <em>*</em></label><input class="w3" type="tel" inputmode="tel" autocomplete="tel">' +
      '<button type="button" class="go"><svg viewBox="0 0 24 24" fill="#fff" width="20" height="20" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-3.3-.8-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.3 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.7 1.2 1.6 2 1.1 1 2 1.3 2.3 1.4.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.2.1.7-.1 1.2Z"/></svg>' + T("സബ്മിറ്റ്", "Submit") + '</button>';
    document.body.appendChild(bg); document.body.appendChild(sh);
    requestAnimationFrame(function () { bg.classList.add("on"); sh.classList.add("on"); });
    function shut() { bg.classList.remove("on"); sh.classList.remove("on"); setTimeout(function () { bg.remove(); sh.remove(); }, 300); }
    bg.onclick = shut;
    sh.querySelectorAll("input").forEach(function (x) { x.oninput = function () { x.classList.remove("inv"); }; });
    sh.querySelector(".go").onclick = function () {
      var a = sh.querySelector(".w1"), h = sh.querySelector(".w2"), m = sh.querySelector(".w3"), nm = a.value.trim(), hs = h.value.trim(), mb = m.value.trim(), bad = null;
      if (!nm) { a.classList.add("inv"); bad = a; }
      if (mb.replace(/\D/g, "").length < 10) { m.classList.add("inv"); bad = bad || m; }
      if (bad) { bad.focus(); return; }
      var msg = head + "\n\n" + text + "\n\n🙋 " + nm + (hs ? ", " + hs : "") + "\n📱 " + mb;
      if (window.zSheet) { var fk = /ലൈബ്രറി|Library/i.test(head) ? "library" : /പ്രവാസി|Pravasi/i.test(head) ? "pravasi" : /ചലഞ്ച്|Challenge/i.test(head) ? "challenge" : "suggestion"; zSheet(fk, { Name: nm, House: hs, Mobile: mb, Section: head.replace(/^[^\wഀ-ൿ]+/, ""), Message: text }); }
      window.open("https://wa.me/918921369102?text=" + encodeURIComponent(msg), "_blank"); shut();
    };
    setTimeout(function () { sh.querySelector(".w1").focus(); }, 320);
  }
  window.zWho = zWho;
  var SOONP = {
    pv: { img: "pravasi.svg?v=1", t: T("പ്രവാസി കണക്ട്", "Pravasi Connect"), s: T("ഗൾഫിലും നമ്മൾ നാട്ടുകാർ ഒരുമിച്ച്", "Our village, together in the Gulf too"), nt: T("ഗൾഫിലുള്ള നമ്മുടെ നാട്ടുകാരെ ഒരുമിപ്പിക്കാനുള്ള പുതിയ സംവിധാനം ഉടൻ വരുന്നു.", "A new way to bring our people in the Gulf together is coming soon."), q: T("പ്രവാസി കണക്ടിൽ എന്തൊക്കെ സേവനങ്ങൾ വേണം?", "What services should Pravasi Connect have?"), hd: T("✈️ പ്രവാസി കണക്ട് – ആശയം", "✈️ Pravasi Connect – Idea") },
    ch: { img: "challenge.svg?v=1", t: T("ചലഞ്ച് & വിൻ", "Challenge & Win"), s: T("പങ്കെടുക്കാം, ജയിക്കാം", "Take part, win"), nt: T("നാട്ടുകാർക്കായി രസകരമായ ചലഞ്ചുകളും സമ്മാനങ്ങളും ഉടൻ വരുന്നു.", "Fun challenges and prizes for our village are coming soon."), q: T("ചലഞ്ച് & വിൻ-ൽ എന്തൊക്കെ വേണം?", "What should Challenge & Win have?"), hd: T("🏆 ചലഞ്ച് & വിൻ – ആശയം", "🏆 Challenge & Win – Idea") }
  };
  function openPV(k) {
    var C = SOONP[k] || SOONP.pv;
    var F = 'Inter,"Noto Sans Malayalam",sans-serif';
    if (!document.getElementById("zpv-css")) { var c = document.createElement("style"); c.id = "zpv-css"; c.textContent =
      '#zpv{position:fixed;inset:0;z-index:2147483600;background:#f3f6f9;overflow:auto;font-family:' + F + ';-webkit-overflow-scrolling:touch;animation:zpvIn .25s ease}@keyframes zpvIn{from{transform:translateX(30px);opacity:0}to{transform:none;opacity:1}}' +
      '#zpv .hh{position:relative;background:#0b3d5c;border-radius:0 0 28px 28px;overflow:hidden}#zpv .hh img{display:block;width:100%;aspect-ratio:780/430;object-fit:cover}' +
      '#zpv .hh:before{content:"";position:absolute;inset:0;z-index:2;background:linear-gradient(180deg,rgba(6,34,54,0) 35%,rgba(6,34,54,.25) 55%,rgba(6,34,54,.7) 78%,rgba(6,34,54,.92) 100%)}' +
      '#zpv .hh h2{position:absolute;z-index:3;left:20px;right:20px;bottom:33px;margin:0;font:800 21px ' + F + ';color:#fff;text-shadow:0 1px 6px rgba(0,0,0,.35)}#zpv .hh h2:before{content:"";display:block;width:36px;height:4px;border-radius:4px;margin-bottom:8px;background:linear-gradient(90deg,#ffc44d,#3fa7d6)}' +
      '#zpv .hh p{position:absolute;z-index:3;left:20px;right:20px;bottom:14px;margin:0;font:600 12px ' + F + ';color:#e3f1fa}' +
      '#zpv .bk{position:absolute;z-index:4;left:14px;top:14px;width:38px;height:38px;border-radius:50%;border:0;background:rgba(11,61,92,.55);color:#fff;font:700 20px Inter,sans-serif;cursor:pointer}' +
      '#zpv .sn{position:absolute;z-index:4;right:14px;top:18px;display:inline-flex;align-items:center;gap:6px;background:#e3f2fb;color:#0b5d8f;font:700 11px ' + F + ';padding:4px 11px;border-radius:20px}#zpv .sn:before{content:"";width:6px;height:6px;border-radius:50%;background:#1380b8;animation:zpvP 1.2s infinite}@keyframes zpvP{50%{opacity:.25}}' +
      '#zpv .in{max-width:34rem;margin:0 auto;padding:18px 16px 40px}#zpv .nt{font:500 13px/1.65 ' + F + ';color:#4a5d6e;margin:2px 4px 16px}' +
      '#zpv .sg{background:#fff;border-radius:20px;padding:16px;border:1.5px solid #cfe4f3}#zpv .sg .h{display:flex;gap:10px;align-items:center;margin-bottom:14px}#zpv .sg .h i{font-style:normal;flex:none;width:40px;height:40px;border-radius:12px;background:#fff4dc;display:grid;place-items:center;font-size:20px}' +
      '#zpv .sg b{display:block;font:800 14.5px/1.45 ' + F + ';color:#0b2540}#zpv .sg small{font:500 11.5px ' + F + ';color:#7a8a99}' +
      '#zpv textarea{width:100%;box-sizing:border-box;border:1.5px solid #d6e0ea;border-radius:12px;padding:10px 12px;font:500 14px ' + F + ';color:#0b2540;background:#fbfcfd;outline:none;resize:vertical}#zpv textarea:focus{border-color:#1380b8;box-shadow:0 0 0 4px rgba(19,128,184,.12)}#zpv textarea.err{border-color:#e2574c}' +
      '#zpv .sb{display:block;width:100%;margin-top:12px;border:0;background:linear-gradient(135deg,#0d5a8c,#1380b8);color:#fff;padding:13px;border-radius:14px;font:800 14px ' + F + ';cursor:pointer}';
      document.head.appendChild(c); }
    var o = document.getElementById("zpv"); if (o) o.remove();
    var w = document.createElement("div"); w.id = "zpv"; w.setAttribute("data-noi18n", "");
    w.innerHTML = '<div class="hh"><img src="/img/hero/' + C.img + '" alt=""><button type="button" class="bk" aria-label="Back">‹</button><span class="sn">' + T("ഉടൻ വരുന്നു", "Coming soon") + '</span><h2>' + C.t + '</h2><p>' + C.s + '</p></div>' +
      '<div class="in"><div class="nt">' + C.nt + '</div>' +
      '<div class="sg"><div class="h"><i>💡</i><div><b>' + C.q + '</b><small>' + T("നിങ്ങളുടെ ആശയം പറയൂ", "Share your idea") + '</small></div></div>' +
      '<textarea rows="4" placeholder="' + T("നിങ്ങളുടെ ആശയം ഇവിടെ എഴുതൂ…", "Type your idea…") + '"></textarea><button type="button" class="sb">' + T("സബ്മിറ്റ്", "Submit") + '</button></div></div>';
    document.body.appendChild(w);
    function onPop() { var x = document.getElementById("zpv"); if (x) x.remove(); removeEventListener("popstate", onPop); }
    try { history.pushState({ zpv: 1 }, ""); } catch (e) {}
    addEventListener("popstate", onPop);
    w.querySelector(".bk").onclick = function () { if (history.state && history.state.zpv) history.back(); else onPop(); };
    w.querySelector(".sb").onclick = function () {
      var ta = w.querySelector("textarea"), v = ta.value.trim();
      if (!v) { ta.focus(); ta.classList.add("err"); setTimeout(function () { ta.classList.remove("err"); }, 900); return; }
      zWho(C.hd, v);
    };
  }
  window.zOpenPV = openPV;
  function openPrime(k) {
    if (k === "pv" || k === "ch") return openPV(k);
    if (k === "stu") return clickHash("#students");
    if (k === "lib") return loadLib(function () { ZestLib.open(); });
    loadMed(function () { ZestMed.open(k === "blood" ? "blood" : "eq"); });
  }
  var PR = [["stu", "students", T("സ്റ്റുഡന്റ്സ് കോർണർ", "Students Corner"), T("റിവിഷൻ പ്ലാനർ, പോക്കറ്റ് മണി", "Revision planner, pocket money")],
    ["lib", "library", T("ZEST ലൈബ്രറി", "ZEST Library"), T("പുസ്തകങ്ങൾ തിരയാം, ചോദിക്കാം", "Find and request books")],
    ["blood", "blood", T("ബ്ലഡ് ബാങ്ക്", "Blood Bank"), T("രക്തം നൽകാം / വേണം", "Give or request blood")],
    ["eq", "equipment", T("മെഡിക്കൽ സപ്പോർട്ട്", "Medical Support"), T("ഉപകരണങ്ങൾ, ആശുപത്രി യാത്ര", "Equipment, hospital trips")],
    ["pv", "pravasi", T("പ്രവാസി കണക്ട്", "Pravasi Connect"), T("ഗൾഫിലെ നാട്ടുകാരുടെ കൂട്ടായ്മ", "Our people in the Gulf"), 1],
    ["ch", "challenge", T("ചലഞ്ച് & വിൻ", "Challenge & Win"), T("പങ്കെടുക്കാം, ജയിക്കാം", "Take part, win"), 1]];
  function primeGrid(desc) {
    function tile(p) { return '<button type="button" data-k="' + p[0] + '">' + (p[4] && !desc ? '<em class="zsn" data-zfs="">' + T("ഉടൻ വരുന്നു", "Coming soon") + '</em>' : '') + '<img src="/img/hero/' + p[1] + '.svg" alt=""><b>' + p[2] + '</b>' + (desc && !p[4] ? '<small>' + p[3] + '</small>' : '') + '<i class="go">' + ic("arr") + '</i></button>'; }
    if (!desc) return '<div class="zpg">' + PR.map(tile).join("") + '</div>';
    var live = PR.filter(function (p) { return !p[4]; }), soon = PR.filter(function (p) { return p[4]; });
    return '<div class="zpg">' + live.map(tile).join("") + '</div>' + (soon.length ? '<h3 class="zsoonh">' + T("ഉടൻ വരുന്നു", "Coming soon") + '</h3><div class="zpg">' + soon.map(tile).join("") + '</div>' : '');
  }
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
      za.innerHTML = '<button type="button"><img src="/img/zest-centre.webp?v=2" alt="ZEST Centre"><b>നാട് വളരാൻ നാടിനൊപ്പം</b><em data-zfs="">' + T("ZEST-നെ കുറിച്ച് അറിയാം", "Know about ZEST") + ' <span class="zar">→</span></em></button>';
      pg.after(za); za.querySelector("button").onclick = function () { go("zest"); };
    }
    /* clubs CTA text */
    var jw = document.querySelector(".zjw span"); if (jw) { jw.setAttribute("data-noi18n", ""); jw.textContent = T("ക്ലബ്ബുകളിൽ അംഗമാവാം", "Join our clubs"); }
    /* centre card label -> ZEST Bulletin */
    var zh = document.querySelector("#centre-info .zu-h"); if (zh) { zh.setAttribute("data-noi18n", ""); var tn = zh.lastChild; if (tn && tn.nodeType === 3) tn.textContent = T("ZEST ബുള്ളറ്റിൻ", "ZEST Bulletin"); else zh.appendChild(document.createTextNode(T("ZEST ബുള്ളറ്റിൻ", "ZEST Bulletin"))); }
    /* ZEST tab: main projects (cards) */
    if (!document.getElementById("zproj")) {
      var PJ = [
        ["p-ideal-b6b16172c2", "🎓", "വിദ്യാഭ്യാസം", "Education", "#6a4ee0", "ഐഡിയൽ സ്റ്റുഡന്റ്സ് ബാച്ച്", "ZEST-ന്റെ സ്വപ്ന പദ്ധതിയാണ് ഐഡിയൽ സ്റ്റുഡന്റ്സ് ബാച്ച്. സ്കൂൾ പഠനത്തോടൊപ്പം കുട്ടികളിലെ വ്യത്യസ്ത അഭിരുചികൾ കണ്ടെത്തി വളർത്തി, SSLC വിജയത്തിലേക്കും മികച്ച ഭാവിയിലേക്കും അവരെ എത്തിക്കുകയാണ് ലക്ഷ്യം.", ["ഓരോ ബാച്ചിലും പ്രദേശത്തെ ആറാം ക്ലാസിൽ പഠിക്കുന്ന 40-ൽ പരം വിദ്യാർത്ഥികൾ", "നിലവിൽ 4 ബാച്ചുകൾ", "നിശ്ചിത ദിവസങ്ങളിലും സമയങ്ങളിലും, പത്താം ക്ലാസ് വരെ തുടർച്ചയായി 5 വർഷം", "പാഠ്യ – പാഠ്യേതര രംഗങ്ങളിൽ മികച്ച പരിശീലനം", "പഠന യാത്രകൾ, സ്ഥാപന സന്ദർശനങ്ങൾ, സഹവാസ ക്യാമ്പുകൾ", "പ്രമുഖരുമൊത്തുള്ള സഹവാസങ്ങൾ", "നീന്തൽ, സൈക്ലിംഗ്, വ്യായാമ മുറകൾ, കായിക പരിശീലനം", "സർഗ്ഗസിദ്ധി വളർത്താനുള്ള പരിശീലനങ്ങൾ"]],
        ["p-service-595606df0e", "🛎️", "സേവനം", "Service", "#1380b8", "സർവീസ് സെന്റർ", "നാട്ടുകാരിൽ ആർക്കും അവരുടെ വ്യത്യസ്ത ആവശ്യങ്ങൾക്ക് ഉപാധികളില്ലാതെ ബന്ധപ്പെടാവുന്ന, വ്യക്തവും സുതാര്യവുമായ കേന്ദ്രമാണ് ZEST സർവീസ് സെന്റർ. ZEST പരിധിയിലെ ആർക്കും ഈ സേവനങ്ങൾ ലഭ്യമാണ്.", ["എല്ലാവിധ ഓൺലൈൻ സേവനങ്ങളും", "വിദ്യാഭ്യാസ കോഴ്സുകൾ, അപേക്ഷാ രീതികൾ, മാനദണ്ഡങ്ങൾ", "സ്കോളർഷിപ്പുകളെക്കുറിച്ചുള്ള വിവരങ്ങളും സഹായവും", "തൊഴിൽ അറിയിപ്പുകളും അവസരങ്ങളും", "ആരോഗ്യ മേഖലയിലെ അറിയിപ്പുകൾ", "സർക്കാർ പദ്ധതികളെക്കുറിച്ചുള്ള വിവരങ്ങളും ഗൈഡൻസും"]],
        ["p-women-739db3b198", "💪", "സ്ത്രീ ശാക്തീകരണം", "Women", "#d6337a", "വുമൺ എംപവർമെന്റ് പ്രോഗ്രാം", "സമൂഹത്തിന്റെ പാതി വരുന്ന സ്ത്രീകളുടെ ശാക്തീകരണമില്ലാതെ നാടിന്റെ വളർച്ചയില്ല. സ്ത്രീകളുടെ മാനസികവും ആരോഗ്യപരവും തൊഴിൽപരവുമായ ഉന്നതിക്കായുള്ള പദ്ധതികളാണ് ZEST വുമൺസ് എംപവർമെന്റ് ഹൗസിൽ നടക്കുന്നത്.", ["തൊഴിൽ പരിശീലന പരിപാടികൾ (ടൈലറിംഗ്)", "കമ്പ്യൂട്ടർ പഠന പരിശീലനം", "പാരന്റിംഗ്, മൊബൈൽ പാരന്റിംഗ് ക്ലാസുകൾ", "വനിതകൾക്കായുള്ള മത്സര പരിപാടികൾ", "സ്ത്രീ സൗഹൃദ ഇടങ്ങളുടെ സംഘാടനം", "ECORA വഴി തൊഴിലവസരങ്ങൾ"]],
        ["p-library-a8fed667a8", "📚", "വായന", "Reading", "#d9822b", "ലൈബ്രറി & റീഡിങ് റൂം", "വിജ്ഞാന വിസ്ഫോടനത്തിന്റെ പുതിയ കാലത്ത് വായനയുടെ പ്രാധാന്യം ഏറെയാണ്. “ശരീരത്തിന് വ്യായാമം എന്ന പോലെയാണ് മനസ്സിന് വായന” എന്ന ആശയത്തിൽ ZEST ഒരുക്കിയ ലൈബ്രറിയാണിത്.", ["വ്യത്യസ്ത അഭിരുചികൾക്കിണങ്ങുന്ന വിപുലമായ പുസ്തക ശേഖരം", "റഫറൻസ് പുസ്തകങ്ങൾ", "സൗകര്യപ്രദമായ റീഡിങ് റൂം", "ഓൺലൈൻ വായനയ്ക്കും റഫറൻസിനുമുള്ള സൗകര്യം"]],
        ["p-senior-3b9569a963", "🤝", "മുതിർന്നവർ", "Seniors", "#12a08a", "സീനിയർ സിറ്റിസൺ കോർണർ", "മുൻപേ നടന്നവരാണ് നാടിന്റെ വഴികാട്ടികൾ. അവർക്ക് ഒരു തരത്തിലുള്ള അവഗണനയും ഉണ്ടാകരുത് എന്ന ആശയത്തിൽ, നാട്ടുകാരണവന്മാർക്കായി ZEST ഒരുക്കിയ ഇടമാണിത്.", ["എല്ലാ മാസവും മുതിർന്ന പൗരന്മാർക്കായി പ്രത്യേക പരിപാടി", "വിശ്രമകാലത്തെ വിനോദങ്ങൾ", "സൗഹൃദം പുതുക്കാനുള്ള അവസരം", "പുതുതലമുറയ്ക്ക് നാട്ടറിവുകൾ പകർന്നു നൽകാനുള്ള വേദി", "ഒറ്റപ്പെടലിന്റെ മൗനം വെടിഞ്ഞ് പങ്കുചേരാനുള്ള ഇടം"]],
        ["p-turf-275cc6af2b", "⚽", "കായികം", "Sports", "#2e9d4f", "ഫുട്ബോൾ ടർഫ്", "വിദ്യാർത്ഥികളുടെയും യുവജനങ്ങളുടെയും കായികാഭിരുചികൾക്ക് ദിശാബോധം നൽകാനും, തെറ്റായ പ്രവണതകളിൽ നിന്ന് അകറ്റി പോസിറ്റീവ് എനർജി നൽകാനുമായി ZEST ഒരുക്കിയ സുസജ്ജമായ ടർഫാണിത്.", ["ഫുട്ബോൾ & ക്രിക്കറ്റ് ടർഫ്", "നൂറുകണക്കിന് വിദ്യാർത്ഥികളും യുവജനങ്ങളും ഉൾപ്പെടുന്ന ZEST സ്പോർട്സ് ക്ലബ്", "ക്ലബ്ബിൽ രജിസ്റ്റർ ചെയ്തവർക്ക് ഉപയോഗിക്കാം", "ടൂർണമെന്റുകളും മത്സരങ്ങളും"]],
        ["p-kalimuttam-8c19200544", "🎨", "കുട്ടികൾ", "Kids", "#e0791f", "കളിമുറ്റം – കിഡ്സ് ഡെവലപ്പ്മെന്റ്", "കുരുന്നുകൾക്ക് കളിയിലൂടെയും ആസ്വാദനത്തിലൂടെയും ആടാനും പാടാനും ആർത്തുല്ലസിക്കാനും, ഒപ്പം അവരിലെ കഴിവുകൾ വളർത്താനുമായി ZEST ആവിഷ്കരിച്ച വർണാഭമായ പദ്ധതിയാണ് കളിമുറ്റം.", ["എല്ലാ മാസവും അവസാന ഞായറാഴ്ച", "ആധുനിക സാങ്കേതിക വിദ്യയുടെ സഹായത്തോടെയുള്ള പഠനം", "ചെറു നന്മകളും നല്ല ശീലങ്ങളും പരിശീലിപ്പിക്കുന്നു", "പ്രഗത്ഭരായ വ്യക്തികൾ ക്ലാസുകൾ നയിക്കുന്നു", "സ്ഥിരം മെന്റർമാരുടെയും ട്രെയ്നർമാരുടെയും സഹായം"]],
        ["p-kidspark-440c8380b4", "🛝", "കുട്ടികൾ", "Kids", "#1380b8", "കിഡ്സ് പാർക്ക്", "മൊബൈലിന്റെ മുന്നിൽ തളച്ചിടപ്പെടുന്ന ഈ കാലത്ത്, കുരുന്നുകൾക്ക് ഓടിച്ചാടി കളിക്കാനും ആർത്തുല്ലസിക്കാനുമായി ZEST ഒരുക്കിയ വിശാലമായ പാർക്കാണിത്.", ["എല്ലാ ദിവസവും വൈകുന്നേരം 3 മുതൽ 6 വരെ", "അവധി ദിവസങ്ങളിലും തുറന്നിരിക്കും", "കുട്ടികൾക്കൊപ്പം രക്ഷിതാക്കൾക്കും ആസ്വദിക്കാം"]],
        ["p-playground-55d1f4f958", "🏸", "സ്ത്രീകൾ", "Women", "#7d5ce0", "സ്ത്രീകളുടെ കളിസ്ഥലം", "ഉത്തമ സമൂഹത്തിന്റെ അടിത്തറ മാനസികവും ശാരീരികവുമായ ആരോഗ്യമാണ്. സ്ത്രീകൾക്ക് സ്വതന്ത്രമായി കളിക്കാനും വ്യായാമം ചെയ്യാനുമായി ZEST ഒരുക്കിയ, ഗാലറിയോടു കൂടിയ പ്രത്യേക കളിസ്ഥലമാണിത്.", ["ഷട്ടിൽ (ബാഡ്മിന്റൺ) കോർട്ട്", "ചെറിയ കുട്ടികൾക്കായുള്ള ടർഫ്", "രാവിലെ വ്യായാമത്തിനുള്ള സൗകര്യം", "യോഗ പരിശീലനം", "വനിതാ ടൂർണമെന്റുകളും മത്സരങ്ങളും"]]
      ];
      var PE = [["Ideal Students Batch", "Ideal Students Batch is ZEST's dream project. Alongside school studies, it discovers and nurtures each child's talents and guides them to SSLC success and a bright future.", ["Each batch has 40+ students studying in Class 6 from the locality", "Currently 4 batches", "On fixed days and times, continuously for 5 years up to Class 10", "Quality training in academic and co-curricular areas", "Study tours, institution visits and residential camps", "Interactions with eminent personalities", "Swimming, cycling, exercises and sports training", "Training to develop creative talents"]], ["Service Center", "ZEST Service Center is a clear and transparent centre where anyone in the locality can come, without conditions, for their different needs. These services are open to everyone in the ZEST area.", ["All kinds of online services", "Educational courses, application procedures and eligibility", "Information and help on scholarships", "Job notifications and opportunities", "Health sector notifications", "Information and guidance on government schemes"]], ["Women Empowerment Program", "There is no growth for a community without empowering women, who make up half of it. ZEST Women's Empowerment House runs programmes for women's mental, health and career advancement.", ["Job training programmes (tailoring)", "Computer training", "Parenting and mobile parenting classes", "Competitions for women", "Organising women-friendly spaces", "Job opportunities through ECORA"]], ["Library & Reading Room", "In this age of information explosion, reading matters more than ever. Built on the idea that “reading is to the mind what exercise is to the body”, this is the library set up by ZEST.", ["A wide collection of books for every taste", "Reference books", "A comfortable reading room", "Facilities for online reading and reference"]], ["Senior Citizen Corner", "Those who walked before us are the guides of our community. With the idea that they should never feel neglected, ZEST created this space for the elders of our locality.", ["A special programme for senior citizens every month", "Leisure-time recreation", "A chance to renew friendships", "A platform to pass local wisdom to the new generation", "A place to step out of loneliness and take part"]], ["Football Turf", "A well-equipped turf set up by ZEST to give direction to the sporting talents of students and youth, keep them away from wrong habits and fill them with positive energy.", ["Football & cricket turf", "ZEST Sports Club with hundreds of students and youth", "Open to members registered with the club", "Tournaments and matches"]], ["Kalimuttam – Kids Development", "Kalimuttam is a colourful ZEST programme where little ones play, sing, dance and have fun – while their talents grow through play and enjoyment.", ["Last Sunday of every month", "Learning with the help of modern technology", "Teaches small good deeds and good habits", "Classes led by experienced people", "Support from regular mentors and trainers"]], ["Kids Park", "In these times when children are glued to mobile screens, ZEST built this spacious park for little ones to run, jump, play and have fun.", ["Every day from 3 PM to 6 PM", "Open on holidays too", "Parents can enjoy it along with their children"]], ["Women's Playground", "Mental and physical health is the foundation of a good society. This is a special playground with a gallery, set up by ZEST for women to play and exercise freely.", ["Shuttle (badminton) court", "Turf for small children", "Facilities for morning exercise", "Yoga training", "Women's tournaments and competitions"]]];
      if (!ML) PJ.forEach(function (p, i) { p[5] = PE[i][0]; p[6] = PE[i][1]; p[7] = PE[i][2]; });
      var WAI = '<svg viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.6 14.1c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5.1-4.5-.1-.2-1.2-1.6-1.2-3s.8-2.2 1-2.5c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.4.6-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.3.1.1.1.7-.1 1.3z"/></svg>';
      var SHI = '<svg viewBox="0 0 24 24" fill="none" stroke="#1380b8" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>';
      var zp = document.createElement("section"); zp.id = "zproj"; zp.setAttribute("data-noi18n", "");
      var hh = '<div class="wrap"><p class="tag">Our Projects</p><h2 class="ml zh2 in">' + T("ZESTന്റെ മുഖ്യ പദ്ധതികൾ", "Main projects of ZEST") + '</h2><div class="zpj">';
      PJ.forEach(function (p, i) {
        hh += '<article class="zpk" id="pj-' + p[0].split('-')[1] + '" data-i="' + i + '"><div class="zpk-im"><img src="/media/' + p[0] + '.webp" alt="" loading="lazy"><h3>' + p[5] + '</h3></div><div class="zpk-b"><p>' + p[6] + '</p><ul>' +
          p[7].map(function (x) { return '<li><i style="color:#1380b8">✓</i>' + x + '</li>'; }).join("") + '</ul></div>' +
          '<div class="zpk-cut"></div><div class="zpk-f"><button type="button" class="zpk-more" data-zfs=""><span>' + T("മുഴുവൻ വിവരങ്ങൾ", "Full details") + '</span><b><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></b></button><button type="button" class="zpk-sh" aria-label="Share">' + SHI + '</button><button type="button" class="zpk-wa" aria-label="WhatsApp">' + WAI + '</button></div></article>';
      });
      zp.innerHTML = hh + '</div></div>';
      var pgm = document.getElementById("programs"); (pgm || document.body.lastElementChild).after(zp);
      zp.addEventListener("click", function (e) {
        var k = e.target.closest(".zpk"); if (!k) return; var p = PJ[+k.getAttribute("data-i")];
        if (e.target.closest(".zpk-more")) { var op = k.classList.toggle("op"); k.querySelector(".zpk-more span").textContent = op ? T("വിവരങ്ങൾ ചുരുക്കുക", "Show less") : T("മുഴുവൻ വിവരങ്ങൾ", "Full details"); }
        else if (e.target.closest(".zpk-wa")) { window.open("https://wa.me/918848313837?text=" + encodeURIComponent(T("ZEST – " + p[5] + " എന്ന പദ്ധതിയെ കുറിച്ച് കൂടുതൽ അറിയണം.", "I would like to know more about ZEST " + p[5] + ".")), "_blank"); }
        else if (e.target.closest(".zpk-sh")) { var tx = "https://zestforpeace.com/?pj=" + p[0].split('-')[1]; if (navigator.share) navigator.share({ url: tx }).catch(function () {}); else window.open("https://wa.me/?text=" + encodeURIComponent(tx), "_blank"); }
      });
    }
    /* fit project titles on one line */
    function zpkFit(){document.querySelectorAll('.zpk-im h3').forEach(function(h){var f=19;h.style.setProperty('font-size',f+'px','important');while(h.scrollWidth>h.clientWidth&&f>12){f-=.5;h.style.setProperty('font-size',f+'px','important');}});}
    
    /* open a shared project link: ?pj=<slug> */
    window.zpjOpen = function (k) { go("zest"); setTimeout(function () { var c = document.getElementById("pj-" + k); if (c) scrollTo(0, c.getBoundingClientRect().top + scrollY - 90); }, 350); };
    (function () { var k = new URLSearchParams(location.search).get("pj"); if (k) setTimeout(function () { zpjOpen(k); }, 400); })();
    /* home project tiles: arrow + open in ZEST tab */
    document.querySelectorAll("#programs .zb-t").forEach(function (t) {
      var m = (t.getAttribute("style") || "").match(/--i-p-([a-z]+)/); if (!m) return;
      t.insertAdjacentHTML("beforeend", '<span class="zgo"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M9 7h8v8"/></svg></span>');
      var L2 = { senior: ["സീനിയർ സിറ്റിസൺ", "കോർണർ"], women: ["വുമൺ എംപവർമെന്റ്", "പ്രോഗ്രാം"] }, hd = t.querySelector("h3");
      if (L2[m[1]] && hd && /[\u0D00-\u0D7F]/.test(hd.textContent)) hd.innerHTML = '<span class="zl">' + L2[m[1]][0] + '</span><br><span class="zl">' + L2[m[1]][1] + '</span>';
      t.setAttribute("role", "link"); t.addEventListener("click", function () { zpjOpen(m[1]); });
    });
    /* readable text: standard minimum sizes (min 12px, body 14.5px) */
    (function () {
      var busy = 0;
      function fix(root) {
        busy = 1;
        var w = document.createTreeWalker(root && root.nodeType === 1 ? root : document.body, NodeFilter.SHOW_TEXT), n, seen = new Set();
        while ((n = w.nextNode())) {
          var e = n.parentElement; if (!e || seen.has(e) || !n.textContent.trim()) continue; seen.add(e);
          if (e.closest("body>header,.zlg,svg,script,style,[data-zfs]")) continue;
          var o = e.getAttribute("data-zf0"); var f = o ? +o : parseFloat(getComputedStyle(e).fontSize);
          var t = f < 12 ? 12 : (f >= 12.9 && f < 14) ? 14.5 : 0;
          if (!o) e.setAttribute("data-zf0", f);
          if (t && e.style.getPropertyValue("font-size") !== t + "px") e.style.setProperty("font-size", t + "px", "important");
        }
        setTimeout(function () { busy = 0; }, 0);
      }
      var tm, pend = []; function later(ms) { if (busy) return; ms.forEach(function (m) { m.addedNodes.forEach(function (n) { pend.push(n.nodeType === 1 ? n : n.parentElement); }); if (m.type === "characterData" && m.target.parentElement) pend.push(m.target.parentElement); }); clearTimeout(tm); tm = setTimeout(function () { var r = pend; pend = []; r.forEach(function (n) { if (n && n.isConnected) fix(n); }); }, 150); }
      fix(); setTimeout(fix, 800); setTimeout(fix, 2500);
      new MutationObserver(later).observe(document.body, { childList: true, subtree: true, characterData: true });
    })();
    /* Our Journey: line runs from the first dot (2016) to the last, then on to the gallery dot */
    (function () {
      var tl = document.getElementById("tl"); if (!tl) return;
      var x = document.createElement("div"); x.id = "zext"; x.innerHTML = "<i></i>"; document.body.appendChild(x);
      var f = x.firstChild, top = 0, h = 0;
      function pos() {
        var ti = tl.querySelectorAll(".ti"), a = ti[0], l = ti[ti.length - 1];
        if (!a || !a.offsetHeight) { x.style.display = "none"; return; }
        tl.style.setProperty("--zst", (a.offsetTop + 24) + "px"); tl.style.setProperty("--zend", (l.offsetTop + 24) + "px");
        var tg = document.querySelector("#stories .tag"); if (!tg || !tg.offsetHeight) { x.style.display = "none"; return; }
        function off(e) { var t = 0, l2 = 0; while (e) { t += e.offsetTop; l2 += e.offsetLeft; e = e.offsetParent; } return { t: t, l: l2 }; }
        var X = off(tl).l + parseFloat(getComputedStyle(document.documentElement).fontSize) * 1.1;
        tg.style.removeProperty("margin-left"); var dot = parseFloat(getComputedStyle(tg, "::before").width) || 20, ob = off(tg);
        var dx = X - (ob.l + dot / 2); if (Math.abs(dx) < 40) { tg.style.setProperty("margin-left", dx + "px", "important"); }
        ob = off(tg); top = off(l).t + 24; h = Math.max(0, ob.t + tg.offsetHeight / 2 - dot / 2 + 1 - top);
        x.style.display = "block"; x.style.left = X + "px"; x.style.top = top + "px"; x.style.height = h + "px"; fill();
      }
      function fill() { if (!h) return; var p = (innerHeight * .6 - (top - scrollY)) / h; f.style.height = (Math.max(0, Math.min(1, p)) * 100) + "%"; }
      var rq = 0; addEventListener("scroll", function () { if (!rq) { rq = 1; requestAnimationFrame(function () { rq = 0; pos(); }); } }, { passive: true });
      addEventListener("resize", pos); addEventListener("load", pos); document.addEventListener("click", function (e) { if (e.target.closest(".znav")) setTimeout(pos, 120); });
      if (window.ResizeObserver) new ResizeObserver(pos).observe(document.body); setTimeout(pos, 500); pos();
    })();
    /* ZEST tab gallery: heading + follow button below the Instagram feed */
    (function () {
      var st = document.getElementById("stories"); if (!st || st.querySelector(".zgh")) return;
      var tg = st.querySelector(".tag"), ig = st.querySelector(".igw"), bt = st.querySelector(".zig-btn");
      if (tg) tg.insertAdjacentHTML("afterend", '<h2 class="ml zh2 in zgh" data-noi18n="">' + T("ZEST-ലെ ദൈനംദിന കാഴ്ചകൾ", "Daily moments at ZEST") + '</h2>');
      if (ig && bt) ig.after(bt);
    })();
    /* ZEST tab About: first heading = “What is Zest for Peace?” */
    (function () {
      var a = document.getElementById("about"); if (!a) return;
      var h = a.querySelector("h2.ml"), q = a.querySelector(".q1");
      if (h && q && !h.__zq) { h.__zq = 1; h.textContent = q.textContent; }
    })();
    /* PRIME SPOT on home */
    var pv = document.createElement("section"); pv.id = "zprime2";
    pv.innerHTML = '<div class="wrap"><p class="tag" data-noi18n>App Exclusive</p><h2 class="ml zh2 in" data-noi18n>' + T("ZEST പ്രൈം സേവനങ്ങൾ", "ZEST PRIME SPOT") + '</h2>' + primeGrid(false).replace('class="zpg"', 'class="zpg" data-noi18n') + '</div>';
    if (ci) ci.after(pv); else document.body.appendChild(pv); wirePrime(pv);
    /* PRIME page */
    var vp = document.createElement("div"); vp.className = "zview"; vp.id = "zv-prime";
    vp.innerHTML = hero("/img/hero/prime.svg?v=2", "ZEST PRIME", T("APP EXCLUSIVE സേവനങ്ങൾ", "APP EXCLUSIVE services")) + '<div class="in" data-noi18n>' + primeGrid(true) +
      '<div class="zsg"><div class="zsg-h"><i>💡</i><span><b>' + T("ഇനി എന്തൊക്കെ വേണം?", "What else should we add?") + '</b><small>' + T("പുതിയ ഫീച്ചർ നിർദ്ദേശിക്കാം", "Suggest a new feature") + '</small></span></div>' +
      '<textarea rows="3" placeholder="' + T("നിങ്ങളുടെ ആശയം ഇവിടെ എഴുതൂ…", "Type your idea…") + '"></textarea><button type="button">' + T("സബ്മിറ്റ്", "Submit") + '</button></div></div>';
    after(vp); wirePrime(vp);
    vp.querySelector(".zsg button").onclick = function () {
      var ta = vp.querySelector(".zsg textarea"), v = ta.value.trim();
      if (!v) { ta.focus(); ta.classList.add("err"); setTimeout(function () { ta.classList.remove("err"); }, 900); return; }
      zWho(T("💡 ZEST PRIME – നിർദ്ദേശം", "💡 ZEST PRIME – Suggestion"), v);
    };
    /* ZEST page */
    var vz = document.createElement("div"); vz.className = "zview"; vz.id = "zv-zest";
    vz.innerHTML = hero("/img/hero/zest.svg?v=1", "ZEST for Peace", T("നാട് വളരാൻ നാടിനൊപ്പം", "Growing together with our village"));
    after(vz);
    /* ME page */
    var vm = document.createElement("div"); vm.className = "zview"; vm.id = "zv-me";
    vm.innerHTML = hero("/img/hero/me.svg?v=2", T("എന്റെ ZEST", "My ZEST"), T("എന്റെയും കുടുംബത്തിന്റെയും വിവരങ്ങൾ", "Me and my family"));
    after(vm);
    var vm2 = document.createElement("div"); vm2.className = "zview"; vm2.id = "zv-me2"; vm2.setAttribute("data-noi18n", "");
    document.body.appendChild(vm2); renderMe(vm2);
    /* "join" buttons anywhere → Me tab */
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href="#join"],a[href$="/#join"]');
      if (!a || nav.contains(a)) return; e.preventDefault(); e.stopPropagation(); ["zmhb", "bg"].forEach(function (id) { var b = document.getElementById(id); if (b && b.getAttribute("aria-expanded") === "true") b.click(); }); var zx = document.querySelector(".zdw.on .zdw-x, .zdw.open .zdw-x"); if (zx) zx.click(); go("me"); setTimeout(function () { var j = document.getElementById("join"); if (j) j.scrollIntoView({ behavior: "smooth" }); }, 80);
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
      '<a class="zrow" href="#textsize" style="--c:#e8f3fb;--k:#1380b8"><i><b style="font:800 14px/1 Inter,sans-serif">Aa</b></i><span><b>' + T("അക്ഷര വലിപ്പം", "Text size") + '</b><small>' + ({ s: T("ചെറുത്", "Small"), m: T("സാധാരണ", "Normal"), l: T("വലുത്", "Large"), x: T("ഏറ്റവും വലുത്", "Extra large") })[zfzGet()] + '</small></span><em>' + ic("arr") + '</em></a>' +
      '<a class="zrow" href="#voice" style="--c:#e8f3fb;--k:#1380b8"><i><b style="font:700 15px/1 Inter,sans-serif">🔊</b></i><span><b>' + T("ശബ്ദം", "Voice") + '</b><small>' + (function () { var a = "", b = ""; try { a = localStorage.getItem("zestVoiceML") || ""; b = localStorage.getItem("zestVoiceEN") || ""; } catch (e) {} return a || b ? T("തിരഞ്ഞെടുത്തത്", "Selected") : T("ഫോണിന്റെ സാധാരണ ശബ്ദം", "Phone default"); })() + '</small></span><em>' + ic("arr") + '</em></a>' +
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
  /* read aloud (🔊): phone's own text-to-speech */
  ready(function () {
    if (!("speechSynthesis" in window)) return;
    var SPK = '<svg viewBox="0 0 24 24" fill="none" stroke="#0b5d8f" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 10v4h4l5 4V6L8 10H4Z" fill="#0b5d8f"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11"/></svg>';
    var pl = document.createElement("div"); pl.className = "zpl"; pl.setAttribute("data-noi18n", ""); pl.setAttribute("data-zfs", "");
    pl.innerHTML = '<button type="button" class="pp" aria-label="Pause"><i></i><i></i></button><div class="tt"><b></b><div class="bar"><span></span></div><small>' + T("🔊 വായിക്കുന്നു…", "🔊 Reading…") + '</small></div><button type="button" class="sp">1x</button><button type="button" class="x" aria-label="Close">✕</button>';
    document.body.appendChild(pl);
    var Q = [], qi = 0, rate = 1, cur = null, btn = null, paused = false, mlv = null, env = null;
    function voices() { var v = speechSynthesis.getVoices() || [], sm = "", se = ""; try { sm = localStorage.getItem("zestVoiceML") || ""; se = localStorage.getItem("zestVoiceEN") || ""; } catch (e) {}
      var pick = function (u) { return u ? v.filter(function (x) { return x.voiceURI === u; })[0] || null : null; };
      mlv = pick(sm) || v.filter(function (x) { return /^ml/i.test(x.lang); })[0] || null; env = pick(se) || v.filter(function (x) { return /^en[-_]IN/i.test(x.lang); })[0] || v.filter(function (x) { return /^en/i.test(x.lang); })[0] || null; }
    window.zVoiceReload = voices;
    voices(); if (speechSynthesis.onvoiceschanged !== undefined) speechSynthesis.onvoiceschanged = voices;
    function chunks(t) { var out = [], parts = String(t).replace(/\s+/g, " ").split(/(?<=[.!?।\n:])\s+/); parts.forEach(function (p) { while (p.length > 180) { var c = p.lastIndexOf(" ", 180); if (c < 60) c = 180; out.push(p.slice(0, c)); p = p.slice(c); } if (p.trim()) out.push(p.trim()); }); return out; }
    function prog() { pl.querySelector(".bar span").style.width = (Q.length ? Math.round(qi / Q.length * 100) : 0) + "%"; }
    function stop() { speechSynthesis.cancel(); Q = []; qi = 0; pl.classList.remove("on"); if (btn) btn.classList.remove("on"); btn = null; paused = false; pl.querySelector(".pp").classList.remove("ps"); }
    function next() {
      if (qi >= Q.length) { prog(); setTimeout(stop, 600); return; }
      var t = Q[qi], u = new SpeechSynthesisUtterance(t), ml = /[ഀ-ൿ]/.test(t);
      u.lang = ml ? "ml-IN" : "en-IN"; var v = ml ? mlv : env; if (v) u.voice = v; u.rate = rate;
      u.onend = function () { if (cur !== u) return; qi++; prog(); next(); };
      u.onerror = function (e) { if (cur !== u || e.error === "interrupted" || e.error === "canceled") return; stop(); alert(T("ഈ ഫോണിൽ മലയാളം ശബ്ദം ലഭ്യമല്ല. Settings → Text-to-speech → Google-ൽ മലയാളം ഡൗൺലോഡ് ചെയ്യൂ.", "Voice not available on this phone. Install a voice in Settings → Text-to-speech.")); };
      cur = u; speechSynthesis.speak(u);
    }
    function play(text, title, b) {
      stop(); Q = chunks(text); if (!Q.length) return; btn = b; if (b) b.classList.add("on");
      pl.querySelector(".tt b").textContent = "🔊 " + title; pl.classList.add("on"); prog(); next();
    }
    pl.querySelector(".pp").onclick = function () { var b = this; if (!paused) { speechSynthesis.pause(); paused = true; b.classList.add("ps"); } else { speechSynthesis.resume(); paused = false; b.classList.remove("ps"); if (!speechSynthesis.speaking) next(); } };
    pl.querySelector(".sp").onclick = function () { rate = rate === 1 ? 0.75 : 1; this.textContent = rate === 1 ? "1x" : "0.75x"; var keep = qi; speechSynthesis.cancel(); cur = null; qi = keep; paused = false; pl.querySelector(".pp").classList.remove("ps"); setTimeout(next, 80); };
    pl.querySelector(".x").onclick = stop;
    function txt(el) { return el ? el.textContent.replace(/\s+/g, " ").trim() : ""; }
    function add() {
      document.querySelectorAll(".z3k .z3ab,.card.tk .z3ab").forEach(function (ab) { var b = ab.querySelector(".zspk"); if (!b) { b = document.createElement("button"); b.type = "button"; b.className = "zspk"; b.setAttribute("aria-label", T("കേൾക്കാം", "Listen")); b.innerHTML = SPK; } if (ab.firstChild !== b) ab.insertBefore(b, ab.firstChild); });
      document.querySelectorAll(".zpk-f").forEach(function (f) { if (f.querySelector(".zspk")) return; var sh = f.querySelector(".zpk-sh"); if (!sh) return; var b = document.createElement("button"); b.type = "button"; b.className = "zspk"; b.setAttribute("aria-label", T("കേൾക്കാം", "Listen")); b.innerHTML = SPK; f.insertBefore(b, sh); });
    }
    document.addEventListener("click", function (e) {
      var b = e.target.closest(".zspk"); if (!b) return; e.preventDefault(); e.stopPropagation();
      if (b === btn && pl.classList.contains("on")) { stop(); return; }
      var c = b.closest(".z3k,.card.tk,.zpk"); if (!c) return;
      var title = txt(c.querySelector(".z3ti,.zpk-im h3")), body = "";
      if (c.classList.contains("zpk")) { body = txt(c.querySelector(".zpk-b p")) + ". " + [].map.call(c.querySelectorAll(".zpk-b li"), function (li) { return txt(li).replace(/^✓\s*/, ""); }).join(". "); }
      else { var d = c.querySelector(".zdet"); body = d ? txt(d) : ""; var cal = c.querySelector(".z3cal"), dl = c.querySelector(".z3dl"); if (!body && cal) body = (dl && /last/i.test(dl.textContent) ? T("അവസാന തീയതി ", "Last date ") : dl && /program/i.test(dl.textContent) ? T("തീയതി ", "Date ") : T("പോസ്റ്റ് ചെയ്തത് ", "Posted on ")) + txt(cal); }
      play(title + ". " + body, title, b);
    }, true);
    var at; new MutationObserver(function () { clearTimeout(at); at = setTimeout(add, 80); }).observe(document.body, { childList: true, subtree: true });
    add(); addEventListener("pagehide", function () { speechSynthesis.cancel(); });
  });
  /* reveal after the app layout is built (no website flash) */
  ready(function () { setTimeout(function () { requestAnimationFrame(function () { html.classList.remove("zboot"); }); }, 30); });
})();
