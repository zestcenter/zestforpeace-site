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
    '@media (min-width:64rem){.zdw,.zdw-bg{display:none}}';
  document.head.appendChild(css);

  var bg = document.createElement("div"); bg.className = "zdw-bg";
  var dw = document.createElement("aside"); dw.className = "zdw"; dw.setAttribute("aria-label", "Main menu"); dw.setAttribute("aria-hidden", "true");
  var here = location.pathname.replace(/index\.html$/, "");
  var items = [].map.call(nav.querySelectorAll("a"), function (a) {
    var h = a.getAttribute("href") || "#", t = a.textContent.trim(), cls = "";
    if (a.classList.contains("nsc")) cls = "zdw-hl"; else if (a.classList.contains("nset")) cls = "zdw-bl";
    else if (here.indexOf("/centreinfo") === 0 && /centreinfo/.test(h)) cls = "cur";
    return '<a href="' + h + '" class="' + cls + '"><svg viewBox="0 0 24 24" aria-hidden="true">' + icon(h) + '</svg><span>' + t + '</span></a>';
  }).join("");
  dw.innerHTML = '<div class="zdw-sc"><div class="zdw-hd"><button class="zdw-x" aria-label="Close menu">✕</button><img src="' + LOGO + '" alt="ZEST for Peace"></div><div class="zdw-ls" role="navigation">' + items + '</div></div><div class="zdw-ft">ZEST FOR PEACE<b>zestforpeace.com</b></div>';
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
  dw.querySelectorAll(".zdw-ls a").forEach(function (a) { a.addEventListener("click", function () { hide(); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") hide(); });
  /* swipe left to close */
  var sx = null;
  dw.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
  dw.addEventListener("touchend", function (e) { if (sx !== null && e.changedTouches[0].clientX - sx > 60) hide(); sx = null; }, { passive: true });
  window.ZestDrawer = { open: show, close: hide };
})();
