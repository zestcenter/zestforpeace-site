/* ZEST APP – ZEST Library (sample preview: 5 books, search + category filter work; borrowing not yet) */
(function () {
  var ML = true; /* inner pages: Malayalam first, "English" switch in header */
  function T(m, e) { return ML ? m : e; }
  /* k: category key · c1/c2: cover colours · m: cover motif · st: 1 = available, 0 = being read */
  var BOOKS = [
    { k: "nov", t: ["ബാല്യകാലസഖി", "Balyakalasakhi"], a: ["വൈക്കം മുഹമ്മദ് ബഷീർ", "Vaikom Muhammad Basheer"], c1: "#c0392b", c2: "#f39c6b", m: "🌳", st: 1 },
    { k: "nov", t: ["ഖസാക്കിന്റെ ഇതിഹാസം", "Khasakkinte Ithihasam"], a: ["ഒ.വി. വിജയൻ", "O.V. Vijayan"], c1: "#1e5f74", c2: "#7fc8a9", m: "🌄", st: 0 },
    { k: "sto", t: ["പ്രകാശം പരത്തുന്ന ഒരു പെൺകുട്ടി", "Prakasham Parathunna Oru Penkutty"], a: ["ടി. പത്മനാഭൻ", "T. Padmanabhan"], c1: "#6a4bd1", c2: "#c9b8ff", m: "🕯️", st: 1 },
    { k: "poe", t: ["രമണൻ", "Ramanan"], a: ["ചങ്ങമ്പുഴ കൃഷ്ണപിള്ള", "Changampuzha Krishna Pillai"], c1: "#0f7d58", c2: "#a8e6c9", m: "🪈", st: 1 },
    { k: "bio", t: ["എന്റെ കഥ", "Ente Katha"], a: ["മാധവിക്കുട്ടി", "Madhavikutty"], c1: "#b5651d", c2: "#ffd59a", m: "✍️", st: 0 }
  ];
  function cats() { return [["all", T("എല്ലാം", "All")], ["nov", T("നോവൽ", "Novel")], ["sto", T("കഥകൾ", "Stories")], ["poe", T("കവിത", "Poetry")], ["bio", T("ആത്മകഥ", "Autobiography")]]; }
  function catName(k) { var c = cats().filter(function (x) { return x[0] === k; })[0]; return c ? c[1] : ""; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  var CSS = '#zlib{position:fixed;inset:0;z-index:2147483600;background:#f3f8fb;overflow:auto;font-family:Inter,"Noto Sans Malayalam",sans-serif;color:#14232c;-webkit-overflow-scrolling:touch;animation:zlIn .25s ease}' +
    '@keyframes zlIn{from{transform:translateX(30px);opacity:0}to{transform:none;opacity:1}}' +
    '#zlib .mh{position:relative;padding:34px 22px 24px;background:linear-gradient(160deg,#0b3d5c,#1380b8 65%,#3fa7d6);color:#fff;border-radius:0 0 28px 28px;text-align:center;overflow:hidden}#zlib .mh::after{content:"";position:absolute;right:-50px;top:-50px;width:170px;height:170px;border-radius:50%;background:rgba(255,255,255,.08)}' +
    '#zlib .mh .cap{display:grid;place-items:center;width:58px;height:58px;margin:0 auto;border-radius:18px;background:rgba(255,255,255,.16);font-size:30px}#zlib .mh h2{margin:12px 0 4px;font:800 22px Inter,"Noto Sans Malayalam",sans-serif;color:#fff}#zlib .mh p{margin:0;font:600 12.5px Inter,"Noto Sans Malayalam",sans-serif;color:#cfe6f5}' +
    '#zlib .mh .bk{position:absolute;right:14px;top:14px;z-index:2;width:38px;height:38px;border-radius:50%;border:0;background:rgba(255,255,255,.16);color:#fff;font:700 17px Inter,sans-serif;cursor:pointer}' +
    '#zlib .lsw{position:absolute;left:16px;top:18px;z-index:2;display:inline-flex;align-items:center;gap:7px;padding:6px 10px;border-radius:999px;border:0;background:rgba(255,255,255,.16);color:#fff;cursor:pointer;font:700 11.5px/1 Inter,sans-serif}#zlib .lsw .sw{position:relative;width:36px;height:21px;border-radius:999px;background:rgba(255,255,255,.35);transition:background .2s}#zlib .lsw .sw i{position:absolute;top:2.5px;left:2.5px;width:16px;height:16px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.25);transition:left .2s}#zlib .lsw.en .sw{background:#3fa7d6}#zlib .lsw.en .sw i{left:17.5px}' +
    '#zlib .soon{margin:12px 14px 0;background:#fff4d6;color:#7a5a00;border-radius:12px;padding:9px 12px;font-size:12px;text-align:center;font-weight:600;line-height:1.5}' +
    '#zlib .mhr{margin:16px 18px 10px;padding:0 0 0 12px;border-left:4px solid #3fa7d6}#zlib .mhr h3{font-size:16px;margin:0;color:#0b3d5c}#zlib .mhr p{font-size:12.5px;color:#5d707c;margin:3px 0 0;line-height:1.55}' +
    '#zlib .sr{position:relative;margin:0 14px 10px}#zlib .sr input{width:100%;box-sizing:border-box;background:#fff;border:1.5px solid #dde6ee;border-radius:12px;padding:11px 12px 11px 38px;font:500 14px Inter,"Noto Sans Malayalam",sans-serif;color:#14232c;outline:none}#zlib .sr input:focus{border-color:#1380b8}#zlib .sr span{position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:15px}' +
    '#zlib .ch{display:flex;gap:6px;overflow-x:auto;padding:0 14px 4px;scrollbar-width:none}#zlib .ch::-webkit-scrollbar{display:none}#zlib .ch button{flex:none;background:#fff;border:1.5px solid #dde6ee;border-radius:999px;padding:7px 13px;font:600 12px Inter,"Noto Sans Malayalam",sans-serif;color:#14232c;cursor:pointer}#zlib .ch .on{background:#0b5d8f;color:#fff;border-color:#0b5d8f}' +
    '#zlib .cnt{margin:10px 16px 8px;font-size:12px;color:#7a8b96;font-weight:600}' +
    '#zlib .bl{display:grid;gap:10px;padding:0 14px}#zlib .b{display:flex;gap:12px;background:#fff;border-radius:16px;padding:10px;box-shadow:0 2px 0 #e3eaef}' +
    '#zlib .cv{position:relative;flex:none;width:80px;height:112px;border-radius:6px 10px 10px 6px;padding:8px 6px 6px 10px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;color:#fff;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,.18)}' +
    '#zlib .cv:before{content:"";position:absolute;left:0;top:0;bottom:0;width:5px;background:rgba(0,0,0,.18)}#zlib .cv:after{content:"";position:absolute;inset:0;background:linear-gradient(105deg,rgba(255,255,255,.22),rgba(255,255,255,0) 45%)}' +
    '#zlib .cv b{position:relative;z-index:1;overflow-wrap:break-word;font:800 9px/1.25 "Noto Sans Malayalam",Inter,sans-serif;text-shadow:0 1px 2px rgba(0,0,0,.3)}#zlib .cv i{position:relative;z-index:1;font-style:normal;font-size:20px;text-align:center}#zlib .cv small{position:relative;z-index:1;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;font:600 7.5px/1.2 "Noto Sans Malayalam",Inter,sans-serif;opacity:.95}' +
    '#zlib .in{flex:1;min-width:0;display:flex;flex-direction:column}#zlib .in h4{margin:2px 0 3px;font:800 14.5px/1.35 "Noto Sans Malayalam",Inter,sans-serif;color:#0b3d5c}#zlib .in .au{font-size:12px;color:#5d707c}' +
    '#zlib .tg{display:flex;gap:6px;flex-wrap:wrap;margin-top:7px}#zlib .tg span{font:700 10.5px Inter,"Noto Sans Malayalam",sans-serif;padding:3px 8px;border-radius:999px;background:#eef6fb;color:#0b5d8f}#zlib .tg .ok{background:#e8f7ef;color:#0f7d58}#zlib .tg .rd{background:#fff1e2;color:#b5651d}' +
    '#zlib .rq{margin-top:auto;align-self:flex-start;border:0;background:#1380b8;color:#fff;border-radius:10px;padding:7px 12px;font:700 12px Inter,"Noto Sans Malayalam",sans-serif;cursor:pointer;opacity:.6}' +
    '#zlib .no{text-align:center;color:#7a8b96;font-size:13px;padding:26px 14px}' +
    '#zlib .nt{text-align:center;font-size:11.5px;color:#7a8b96;margin:16px 18px 30px;line-height:1.5}' +
    '.zlt{position:fixed;left:50%;bottom:90px;transform:translateX(-50%);z-index:2147483647;background:#0b3d5c;color:#fff;padding:10px 18px;border-radius:999px;font:700 13px Inter,"Noto Sans Malayalam",sans-serif;box-shadow:0 8px 20px rgba(0,0,0,.25);text-align:center;max-width:86vw}';

  function toast(m) { var t = document.createElement("div"); t.className = "zlt"; t.textContent = m; document.body.appendChild(t); setTimeout(function () { t.remove(); }, 2200); }
  function i(a) { return ML ? a[0] : a[1]; }
  function card(b) {
    return '<div class="b"><div class="cv" style="background:linear-gradient(160deg,' + b.c1 + ',' + b.c2 + ')"><b>' + esc(b.t[0]) + '</b><i>' + b.m + '</i><small>' + esc(b.a[0]) + '</small></div>' +
      '<div class="in"><h4>' + esc(i(b.t)) + '</h4><div class="au">' + esc(i(b.a)) + '</div><div class="tg"><span>' + catName(b.k) + '</span>' +
      (b.st ? '<span class="ok">✓ ' + T("ലഭ്യം", "Available") + '</span>' : '<span class="rd">📖 ' + T("വായനയിൽ", "Being read") + '</span>') + '</div>' +
      '<button type="button" class="rq">📚 ' + T("പുസ്തകം ചോദിക്കാം", "Request book") + '</button></div></div>';
  }

  function open() {
    if (!document.getElementById("zlib-css")) { var s = document.createElement("style"); s.id = "zlib-css"; s.textContent = CSS; document.head.appendChild(s); }
    var old = document.getElementById("zlib"); if (old) old.remove();
    var w = document.createElement("div"); w.id = "zlib"; w.setAttribute("data-noi18n", "");
    ML = true; var cat = "all", q = "";
    function list() {
      var qq = q.trim().toLowerCase();
      var r = BOOKS.filter(function (b) { return (cat === "all" || b.k === cat) && (!qq || (b.t.join(" ") + " " + b.a.join(" ")).toLowerCase().indexOf(qq) > -1); });
      w.querySelector(".cnt").textContent = ML ? r.length + " പുസ്തകങ്ങൾ" : r.length + (r.length === 1 ? " book" : " books");
      w.querySelector(".bl").innerHTML = r.length ? r.map(card).join("") : '<div class="no">🔍 ' + T("ഈ പേരിൽ പുസ്തകം ഇല്ല", "No book found") + '</div>';
      w.querySelectorAll(".rq").forEach(function (b) { b.onclick = function () { toast(T("പുസ്തകം ചോദിക്കൽ ഉടൻ തുടങ്ങും 🙂", "Book requests start soon 🙂")); }; });
    }
    function render() {
      w.innerHTML = '<div class="mh"><button type="button" class="bk" aria-label="Back">✕</button><button type="button" class="lsw' + (ML ? '' : ' en') + '" role="switch" aria-checked="' + (!ML) + '">English <span class="sw"><i></i></span></button>' +
        '<span class="cap">📚</span><h2>' + T("ZEST ലൈബ്രറി", "ZEST Library") + '</h2><p>' + T("വായിക്കാം, വളരാം", "Read and grow") + '</p></div>' +
        '<div class="soon">👀 ' + T("ഇത് ഒരു മാതൃക മാത്രം – ലൈബ്രറിയിലെ മുഴുവൻ പുസ്തകങ്ങളും ഉടൻ ചേർക്കും", "Sample preview – all library books will be added soon") + '</div>' +
        '<div class="mhr"><h3>' + T("ZEST ലൈബ്രറിയിലെ പുസ്തകങ്ങൾ", "Books at ZEST Library") + '</h3><p>' + T("പുസ്തകം തിരയാം, ഇഷ്ടമുള്ള വിഭാഗം തിരഞ്ഞെടുക്കാം", "Search a book or pick a category") + '</p></div>' +
        '<div class="sr"><span>🔍</span><input type="search" placeholder="' + T("പുസ്തകം / എഴുത്തുകാരൻ തിരയൂ", "Search book / author") + '" value="' + esc(q) + '"></div>' +
        '<div class="ch">' + cats().map(function (c) { return '<button type="button" data-c="' + c[0] + '"' + (c[0] === cat ? ' class="on"' : '') + '>' + c[1] + '</button>'; }).join("") + '</div>' +
        '<div class="cnt"></div><div class="bl"></div>' +
        '<div class="nt">' + T("പുതിയ പുസ്തകങ്ങൾ ലൈബ്രറിയിൽ എത്തുമ്പോൾ ഇവിടെ തനിയെ വരും", "New books appear here automatically when they reach the library") + '</div>';
      w.querySelector(".bk").onclick = close;
      w.querySelector(".lsw").onclick = function () { var y = w.scrollTop; ML = !ML; render(); w.scrollTop = y; };
      w.querySelector(".sr input").oninput = function (e) { q = e.target.value; list(); };
      w.querySelectorAll(".ch button").forEach(function (b) { b.onclick = function () { cat = b.dataset.c; w.querySelectorAll(".ch button").forEach(function (x) { x.classList.toggle("on", x === b); }); list(); }; });
      list();
    }
    render();
    document.body.appendChild(w);
    try { history.pushState({ zlib: 1 }, ""); } catch (e) {}
    window.addEventListener("popstate", onPop);
  }
  function onPop() { var w = document.getElementById("zlib"); if (w) w.remove(); window.removeEventListener("popstate", onPop); }
  function close() { if (history.state && history.state.zlib) history.back(); else onPop(); }
  window.ZestLib = { open: open };
})();
