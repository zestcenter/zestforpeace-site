/* ZEST PRIME SPOT – app-exclusive tiles on the home page */
(function () {
  var host = document.getElementById("centre-info"); if (!host) return;
  var ml = window.ZestLang && ZestLang.get() === "ml";
  var inApp = function () { return (window.matchMedia && matchMedia("(display-mode: standalone)").matches) || navigator.standalone === true; };
  /* add new items here – the row scrolls and shows "+N »" automatically when they don't fit */
  var IT = [
    { k: "stu", i: "🎓", ml: "സ്റ്റുഡന്റ്സ്<br>കോർണർ", en: "Students<br>Corner", bg: "#efe9fd" },
    { k: "lib", i: "📚", ml: "ZEST<br>ലൈബ്രറി", en: "ZEST<br>Library", bg: "#e8f7ef" },
    { k: "blood", i: "🩸", ml: "ബ്ലഡ്<br>ബാങ്ക്", en: "Blood<br>Bank", bg: "#ffe9ef" },
    { k: "eq", i: "🦽", ml: "മെഡിക്കൽ<br>ഉപകരണം", en: "Medical<br>Equipment", bg: "#e6f3fb" }
  ];
  var st = document.createElement("style");
  st.textContent = '#zprime{padding:1.4rem 0 .6rem;margin:1.2rem 0;background:linear-gradient(160deg,#f2f9fd,#e3f1fa);border-top:1.5px solid #bfe0f2;border-bottom:1.5px solid #bfe0f2;font-family:Inter,"Noto Sans Malayalam",sans-serif;color:#14232c}' +
    '#zprime .zp-hd{display:flex;flex-direction:column;align-items:flex-start;gap:6px;margin-bottom:14px}#zprime .zp-hd .zp-bd{margin-left:1.2rem;box-shadow:0 3px 8px rgba(240,165,0,.3);animation:zpBd 4s linear infinite,zpFl 2.4s ease-in-out infinite}@keyframes zpFl{0%,100%{transform:translateY(0);box-shadow:0 3px 8px rgba(240,165,0,.3)}50%{transform:translateY(-3px);box-shadow:0 7px 14px rgba(240,165,0,.35)}}#zprime h2.zp-h{display:flex;align-items:center;gap:.6rem;margin:0;font:800 clamp(1.25rem,5.6vw,1.9rem)/1.15 Inter,system-ui,sans-serif;letter-spacing:.03em;white-space:nowrap;text-transform:none}#zprime h2.zp-h:after{display:none}#zprime .zp-lv{flex:none;width:.6rem;height:.6rem;border-radius:50%;background:#ffc44d;animation:zpLv 1.6s ease-out infinite}@keyframes zpLv{0%{box-shadow:0 0 0 0 rgba(240,165,0,.75)}100%{box-shadow:0 0 0 10px rgba(240,165,0,0)}}' +
    '#zprime .zp-g{background:linear-gradient(100deg,#0b3d5c 0%,#1380b8 30%,#3fa7d6 42%,#9fd6f0 48%,#3fa7d6 54%,#1380b8 66%,#0b3d5c 100%);background-size:220% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;animation:zpGold 3.6s ease-in-out infinite}@keyframes zpGold{0%{background-position:100% 0}60%,100%{background-position:-20% 0}}#zprime .zp-bd{position:relative;overflow:hidden;font:800 9px Inter,sans-serif;letter-spacing:.06em;background:linear-gradient(90deg,#ffc44d,#f0a500,#ffc44d);background-size:200% 100%;color:#3a2a00;padding:4px 8px;border-radius:6px;white-space:nowrap;animation:zpBd 4s linear infinite}#zprime .zp-bd:after{content:"";position:absolute;inset:0;background:linear-gradient(110deg,transparent 35%,rgba(255,255,255,.45) 50%,transparent 65%);transform:translateX(-120%);animation:zpSh 3.6s ease-in-out infinite}@keyframes zpBd{to{background-position:200% 0}}@keyframes zpSh{55%,100%{transform:translateX(120%)}}' +
    '#zprime .zp-r{display:flex;gap:8px;overflow-x:auto;padding-bottom:12px;scrollbar-width:none;-webkit-overflow-scrolling:touch}#zprime .zp-r::-webkit-scrollbar{display:none}' +
    '#zprime .zp-t{position:relative;flex:0 0 calc((100% - 24px)/4);max-width:150px;border:0;border-radius:16px;padding:10px 2px 16px;text-align:center;font:700 10.5px/1.3 "Noto Sans Malayalam",Inter,sans-serif;color:#33434d;cursor:pointer;box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.95),0 3px 8px rgba(11,61,92,.07);-webkit-tap-highlight-color:transparent}' +
    '#zprime .zp-t:active{transform:scale(.96)}#zprime .zp-t i{display:grid;place-items:center;width:40px;height:40px;margin:0 auto 6px;border-radius:50%;background:#fff;font-style:normal;font-size:19px;box-shadow:0 2px 5px rgba(0,0,0,.06)}' +
    '#zprime .zp-t:after{content:"›";position:absolute;left:50%;bottom:-8px;transform:translateX(-50%);width:18px;height:18px;border-radius:50%;background:#fff;color:#1380b8;font:800 12px/17px Inter,sans-serif;box-shadow:0 2px 5px rgba(11,61,92,.15)}' +
    '#zprime .zp-r.ov .zp-t{flex-basis:calc((100% - 24px)/4.4)}' +
    '#zprime .zp-bar{display:none;align-items:center;gap:10px;margin-top:2px}#zprime.ov .zp-bar{display:flex}' +
    '#zprime .zp-tr{flex:1;height:4px;border-radius:2px;background:#e3eaef;position:relative}#zprime .zp-tr i{position:absolute;left:0;top:0;bottom:0;border-radius:2px;background:#1380b8;transition:left .35s,width .35s}' +
    '#zprime .zp-nx{display:flex;align-items:center;gap:2px;border:0;background:#e6f3fb;color:#1380b8;border-radius:14px;padding:4px 10px 4px 9px;font:800 12px Inter,sans-serif;cursor:pointer}' +
    '#zprime .zp-nx em{font:900 18px/1 Inter,sans-serif;font-style:normal;letter-spacing:-4px;padding-right:4px;display:inline-block;animation:zpn 1.1s ease-in-out infinite}#zprime .zp-nx.bk em{animation-name:zpb}' +
    '@keyframes zpn{50%{transform:translateX(5px);opacity:.55}}@keyframes zpb{50%{transform:translateX(-5px);opacity:.55}}' +
    '@media (prefers-reduced-motion:reduce){#zprime .zp-nx em,#zprime .zp-g,#zprime .zp-lv,#zprime .zp-bd,#zprime .zp-bd:after{animation:none}}';
  document.head.appendChild(st);
  var s = document.createElement("section"); s.id = "zprime"; s.setAttribute("data-noi18n", "");
  s.innerHTML = '<div class="wrap"><div class="zp-hd"><h2 class="zp-h"><span class="zp-lv" aria-hidden="true"></span><span class="zp-g">ZEST PRIME SPOT</span></h2><span class="zp-bd">APP EXCLUSIVE</span></div><div class="zp-r">' +
    IT.map(function (x) { return '<button type="button" class="zp-t" data-k="' + x.k + '" style="background:' + x.bg + '"><i>' + x.i + '</i>' + (ml ? x.ml : x.en) + '</button>'; }).join("") +
    '</div><div class="zp-bar"><div class="zp-tr"><i></i></div><button type="button" class="zp-nx" aria-label="More"><b></b><em>»</em></button></div></div>';
  host.parentNode.insertBefore(s, host.nextSibling);
  var r = s.querySelector(".zp-r"), nx = s.querySelector(".zp-nx"), th = s.querySelector(".zp-tr i");
  function up() {
    var W = r.scrollWidth, V = r.clientWidth, L = r.scrollLeft, ov = W > V + 4, end = L + V >= W - 4;
    s.classList.toggle("ov", ov); r.classList.toggle("ov", ov); if (!ov) return;
    th.style.width = (V / W * 100) + "%"; th.style.left = (L / W * 100) + "%";
    var hid = [].filter.call(r.children, function (t) { return t.offsetLeft - r.offsetLeft + t.offsetWidth / 2 > L + V; }).length;
    nx.classList.toggle("bk", end); nx.querySelector("b").textContent = end || !hid ? "" : "+" + hid; nx.querySelector("em").textContent = end ? "«" : "»";
  }
  r.addEventListener("scroll", up, { passive: true }); addEventListener("resize", up); up(); setTimeout(up, 600);
  nx.onclick = function () { r.scrollBy({ left: nx.classList.contains("bk") ? -r.scrollWidth : r.clientWidth * .9, behavior: "smooth" }); };
  function toast(m) { var t = document.createElement("div"); t.textContent = m;
    t.style.cssText = "position:fixed;left:50%;bottom:90px;transform:translateX(-50%);z-index:2147483647;background:#0b3d5c;color:#fff;padding:10px 18px;border-radius:999px;font:700 13px Inter,'Noto Sans Malayalam',sans-serif;box-shadow:0 8px 20px rgba(0,0,0,.25)";
    document.body.appendChild(t); setTimeout(function () { t.remove(); }, 1800); }
  r.addEventListener("click", function (e) {
    var b = e.target.closest(".zp-t"); if (!b) return; var k = b.dataset.k;
    if (!inApp()) { if (window.ZestDrawer && ZestDrawer.appOnly) ZestDrawer.appOnly(ml); return; }
    if (k === "stu") { var a = document.createElement("a"); a.href = "#students"; a.style.display = "none"; document.body.appendChild(a); a.click(); a.remove(); return; }
    if (k === "lib") { if (window.ZestLib) ZestLib.open(); else { var sl = document.createElement("script"); sl.src = "/library.js?v=5"; sl.onload = function () { ZestLib.open(); }; document.head.appendChild(sl); } return; }
    var w = k === "blood" ? "blood" : "eq";
    if (window.ZestMed) ZestMed.open(w); else { var sc = document.createElement("script"); sc.src = "/medical.js?v=8"; sc.onload = function () { ZestMed.open(w); }; document.head.appendChild(sc); }
  });
})();
