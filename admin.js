/* ZEST ADMIN – loaded only by /zest-admin-r01pm/ (never by the public app) */
(function () {
  var API = "https://lauftdyrlnhbimqokgye.supabase.co/functions/v1/zest-admin", K = "zestAdminTok";
  var F = 'Inter,"Noto Sans Malayalam",sans-serif';
  function tok() { try { return localStorage.getItem(K) || ""; } catch (e) { return ""; } }
  var TESTOPEN = true; /* testing: admin page open without PIN; server data still needs PIN */
  function okTok() { var e = +String(tok()).split(".")[0]; return e && e > Date.now(); }
  function logout() { try { localStorage.removeItem(K); } catch (e) {} var a = document.querySelector(".zdw-adm"); if (a) a.remove(); pop(); toast("ലോഗ് ഔട്ട് ചെയ്തു"); }
  function call(o) {
    o.token = tok();
    return fetch(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(o) })
      .then(function (r) { if (r.status === 401) { try { localStorage.removeItem(K); } catch (e) {} if (!TESTOPEN) { var a = document.querySelector(".zdw-adm"); if (a) a.remove(); pop(); } login(); throw new Error("auth"); } return r.json(); });
  }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function toast(m) { var t = document.createElement("div"); t.className = "zat"; t.textContent = m; document.body.appendChild(t); setTimeout(function () { t.remove(); }, 2400); }

  var CSS = '#zadm{position:fixed;inset:0;z-index:2147483600;background:#f3f8fb;overflow:auto;font-family:' + F + ';color:#14232c;animation:zaIn .25s ease}@keyframes zaIn{from{transform:translateX(30px);opacity:0}to{transform:none;opacity:1}}' +
    '#zadm .mh{position:relative;padding:34px 22px 24px;background:linear-gradient(160deg,#3a2a00,#8a6508 45%,#f0a500);color:#fff;border-radius:0 0 28px 28px;text-align:center}#zadm .mh .cap{display:grid;place-items:center;width:58px;height:58px;margin:0 auto;border-radius:18px;background:rgba(255,255,255,.18);font-size:28px}#zadm .mh h2{margin:12px 0 4px;font:800 21px ' + F + ';color:#fff}#zadm .mh p{margin:0;font:600 12px ' + F + ';color:#fff3cf}' +
    '#zadm .bk{position:absolute;right:14px;top:14px;width:38px;height:38px;border-radius:50%;border:0;background:rgba(255,255,255,.2);color:#fff;font:700 17px Inter,sans-serif;cursor:pointer}#zadm .lo{position:absolute;left:14px;top:18px;border:0;border-radius:10px;padding:6px 10px;background:rgba(255,255,255,.2);color:#fff;font:700 11.5px ' + F + ';cursor:pointer}' +
    '#zadm .tl{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:16px 14px}#zadm .tl button{position:relative;border:0;background:#fff;border-radius:18px;padding:16px 10px;text-align:center;box-shadow:0 2px 0 #e3eaef;font:800 13px/1.35 ' + F + ';color:#0b3d5c;cursor:pointer}#zadm .tl button i{display:block;font-style:normal;font-size:26px;margin-bottom:6px}#zadm .tl button small{display:block;margin-top:3px;font:600 11px ' + F + ';color:#7a8b96}#zadm .tl button.off{opacity:.55}' +
    '#zadm .tl b.n{position:absolute;top:8px;right:10px;min-width:20px;height:20px;padding:0 6px;box-sizing:border-box;border-radius:999px;background:#e0345c;color:#fff;font:800 11px/20px Inter,sans-serif}' +
    '#zadm .tb{display:flex;margin:14px 14px 0;background:#e6edf2;border-radius:14px;padding:4px}#zadm .tb button{flex:1;border:0;background:none;padding:10px;border-radius:11px;font:800 13px ' + F + ';color:#5d707c;cursor:pointer}#zadm .tb button.on{background:#fff;color:#0b3d5c;box-shadow:0 2px 8px rgba(11,61,92,.1)}' +
    '#zadm .ad{display:block;margin:12px auto 0;border:0;border-radius:999px;padding:10px 18px;background:#e6f3fb;color:#0b5d8f;font:800 13px ' + F + ';cursor:pointer}' +
    '#zadm .cd{margin:12px 14px 0;background:#fff;border-radius:18px;padding:14px;box-shadow:0 2px 0 #e3eaef}#zadm .cd label{display:block;margin-bottom:9px}#zadm .cd label span{display:block;margin:0 0 4px 2px;font:700 11.5px ' + F + ';color:#5d707c}' +
    '#zadm .cd input,#zadm .cd textarea{width:100%;box-sizing:border-box;border:1.5px solid #e1e9ef;border-radius:12px;padding:10px 12px;font:500 14px/1.5 ' + F + ';color:#14232c;outline:none;background:#fafcfd}#zadm .cd textarea{min-height:110px;resize:vertical}#zadm .cd input:focus,#zadm .cd textarea:focus{border-color:#1380b8;background:#fff}' +
    '#zadm .cd .r2{display:grid;grid-template-columns:1.6fr 1fr;gap:8px}#zadm .cd .src{font:600 11px ' + F + ';color:#93a3ad;margin:-2px 2px 10px}' +
    '#zadm .ac{display:flex;gap:8px;margin-top:4px}#zadm .ac button{flex:1;border:0;border-radius:12px;padding:11px;font:800 13px ' + F + ';cursor:pointer}#zadm .ac .y{background:linear-gradient(135deg,#22b573,#159a5c);color:#fff}#zadm .ac .n{flex:none;padding:11px 16px;background:#fdecef;color:#c0254a}#zadm .ac .c{background:#eef3f7;color:#3b4c57}' +
    '#zadm .done{display:flex;align-items:center;gap:8px;font:700 13px/1.45 ' + F + ';color:#0b3d5c}#zadm .done small{display:block;font:600 11px ' + F + ';color:#7a8b96}' +
    '#zadm .em{text-align:center;padding:30px 20px;color:#7a8b96;font:600 13px/1.6 ' + F + '}#zadm .em i{display:block;font-style:normal;font-size:34px;margin-bottom:6px}#zadm .ft{height:30px}' +
    '.zdw-adm{display:flex;align-items:center;gap:10px;margin:2px 0 10px;padding:11px 14px;border-radius:14px;background:linear-gradient(135deg,#fff7df,#ffe7a8);box-shadow:inset 0 0 0 1.5px #f0c75a;color:#6b4c00;font:800 13.5px ' + F + ';text-decoration:none;cursor:pointer}.zdw-adm i{font-style:normal;font-size:17px}.zdw-adm span{flex:1}' +
    '.zat{position:fixed;left:50%;bottom:90px;transform:translateX(-50%);z-index:2147483647;background:#0b3d5c;color:#fff;padding:10px 18px;border-radius:999px;font:700 13px ' + F + ';box-shadow:0 8px 20px rgba(0,0,0,.25);text-align:center;max-width:86vw}';
  var st = document.createElement("style"); st.textContent = CSS; document.head.appendChild(st);

  CSS += '.zap-bg{position:fixed;inset:0;z-index:2147483640;background:rgba(10,30,45,.55)}.zap{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:2147483641;width:min(340px,90vw);box-sizing:border-box;border-radius:24px;padding:22px 18px;text-align:center;background:linear-gradient(160deg,#3a2a00,#8a6508 45%,#f0a500);color:#fff;font-family:' + F + ';box-shadow:0 20px 40px rgba(0,0,0,.35)}' +
    '.zap h4{margin:6px 0 4px;font:800 18px ' + F + '}.zap p{margin:0 0 14px;font:600 12px ' + F + ';color:#fff3cf}.zap .pin{display:flex;gap:6px;justify-content:center;margin-bottom:12px}.zap .pin input{width:38px;height:46px;border-radius:10px;border:0;text-align:center;font:800 20px Inter,sans-serif;color:#3a2a00;outline:none}.zap .pin input:focus{box-shadow:0 0 0 3px #fff}' +
    '.zap .go{border:0;border-radius:999px;padding:11px 26px;background:#fff;color:#8a6508;font:800 14px ' + F + ';cursor:pointer}.zap .er{min-height:18px;margin-top:10px;font:700 12px ' + F + ';color:#ffe1e6}.zap .x{position:absolute;right:10px;top:10px;width:30px;height:30px;border-radius:50%;border:0;background:rgba(255,255,255,.2);color:#fff;font:700 13px Inter,sans-serif;cursor:pointer}';
  st.textContent = CSS;
  function login() {
    if (document.querySelector(".zap")) return;
    var bg = document.createElement("div"); bg.className = "zap-bg"; var m = document.createElement("div"); m.className = "zap"; m.setAttribute("data-noi18n", "");
    m.innerHTML = '<button type="button" class="x" aria-label="Close">✕</button><div style="font-size:30px">🔒</div><h4>അഡ്മിൻ ലോഗിൻ</h4><p>6 അക്ക അഡ്മിൻ PIN നൽകൂ</p><div class="pin">' + [0, 1, 2, 3, 4, 5].map(function () { return '<input inputmode="numeric" maxlength="1" type="password" autocomplete="off">'; }).join("") + '</div><button type="button" class="go">പ്രവേശിക്കുക</button><div class="er"></div>';
    document.body.appendChild(bg); document.body.appendChild(m);
    function shut() { bg.remove(); m.remove(); }
    bg.onclick = shut; m.querySelector(".x").onclick = shut;
    var ins = [].slice.call(m.querySelectorAll("input")), btn = m.querySelector(".go"), er = m.querySelector(".er");
    ins.forEach(function (i, n) { i.addEventListener("input", function () { i.value = i.value.replace(/\D/g, "").slice(-1); if (i.value && ins[n + 1]) ins[n + 1].focus(); if (ins.every(function (x) { return x.value; })) send(); });
      i.addEventListener("keydown", function (e) { if (e.key === "Backspace" && !i.value && ins[n - 1]) ins[n - 1].focus(); }); });
    ins[0].focus(); btn.onclick = send;
    function send() {
      var pin = ins.map(function (x) { return x.value; }).join(""); if (pin.length < 6) { er.textContent = "6 അക്കങ്ങളും നൽകൂ"; return; }
      btn.disabled = true; er.textContent = "";
      fetch(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "login", pin: pin }) })
        .then(function (r) { return r.json().then(function (j) { return [r.status, j]; }); })
        .then(function (x) { btn.disabled = false;
          if (x[1].token) { try { localStorage.setItem(K, x[1].token); } catch (e) {} shut(); addMenu(); open(); return; }
          er.textContent = x[0] === 429 ? "പല തവണ തെറ്റി. 15 മിനിറ്റ് കഴിഞ്ഞ് ശ്രമിക്കൂ" : "PIN തെറ്റാണ്"; ins.forEach(function (i) { i.value = ""; }); ins[0].focus(); })
        .catch(function () { btn.disabled = false; er.textContent = "ഇന്റർനെറ്റ് കണക്ഷൻ പരിശോധിക്കൂ"; });
    }
  }
  /* gold admin item at the top of the side menu (only on logged-in admin phones) */
  function addMenu() {
    var ls = document.querySelector(".zdw .zdw-ls"); if (!ls || ls.querySelector(".zdw-adm") || !(okTok() || TESTOPEN)) return !!ls;
    var a = document.createElement("a"); a.className = "zdw-adm"; a.href = "#"; a.innerHTML = '<i>🔒</i><span>അഡ്മിൻ പേജ്</span><b>›</b>';
    a.onclick = function (e) { e.preventDefault(); e.stopPropagation(); if (window.ZestDrawer) ZestDrawer.close(); if (okTok() || TESTOPEN) open(); else login(); };
    ls.insertBefore(a, ls.firstChild); return true;
  }
  if (!addMenu()) { var mo = new MutationObserver(function () { if (addMenu()) mo.disconnect(); }); mo.observe(document.documentElement, { childList: true, subtree: true }); }


  CSS += '#zadm .dm{margin:10px 14px 0;padding:8px 12px;border-radius:12px;background:#fff6dc;color:#7a5a00;font:700 11.5px/1.5 ' + F + ';text-align:center}' +
    '#zadm .tb button{font-size:12.5px;padding:10px 6px}' +
    '#zadm .it{margin:10px 14px 0;background:#fff;border-radius:18px;padding:13px 14px;box-shadow:0 2px 0 #e3eaef}#zadm .it.dn{opacity:.6}' +
    '#zadm .ih{display:flex;align-items:center;gap:10px}#zadm .ih>div{flex:1;min-width:0}#zadm .ih b{display:block;font:800 14px/1.35 ' + F + ';color:#0b3d5c}#zadm .ih small{display:block;font:600 11.5px/1.45 ' + F + ';color:#7a8b96}' +
    '#zadm .bg{position:relative;flex:none;display:block;width:34px;height:49px}#zadm .bg svg{display:block;width:34px;height:49px;filter:drop-shadow(0 3px 5px rgba(216,27,60,.25))}#zadm .bg i{position:absolute;left:0;right:0;top:22px;text-align:center;font:900 10.5px Inter,sans-serif;font-style:normal;color:#fff}' +
    '#zadm .eg{flex:none;display:grid;place-items:center;width:42px;height:42px;border-radius:13px;background:#e6f3fb;font-size:20px}' +
    '#zadm .ih em{flex:none;font:800 10.5px ' + F + ';font-style:normal;padding:4px 9px;border-radius:999px}#zadm em.ok{background:#e3f7ec;color:#138a52}#zadm em.wt{background:#eef3f7;color:#5d707c}#zadm em.ur{background:#fdecef;color:#c0254a}' +
    '#zadm .kv{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}#zadm .kv span{padding:5px 9px;border-radius:9px;background:#f3f7fa;font:600 11.5px ' + F + ';color:#3b4c57}' +
    '#zadm .ia{display:flex;gap:6px;margin-top:10px}#zadm .ia button{flex:1;white-space:nowrap;border:0;border-radius:11px;padding:9px 4px;font:800 11.5px ' + F + ';cursor:pointer}#zadm .ia .ca{background:#e6f3fb;color:#0b5d8f}#zadm .ia .wh{background:#e3f7ec;color:#138a52}#zadm .ia .ok{background:linear-gradient(135deg,#22b573,#159a5c);color:#fff}' +
    '#zadm .mt{display:block;width:100%;margin-top:10px;border:0;border-radius:11px;padding:9px 12px;background:#fff1f3;color:#b0213f;font:700 12.5px ' + F + ';text-align:left;cursor:pointer}' +
    '#zadm .gc{display:flex;gap:6px;overflow-x:auto;padding:12px 14px 2px;scrollbar-width:none}#zadm .gc button{flex:none;border:1.5px solid #e1e9ef;background:#fff;border-radius:999px;padding:7px 12px;font:800 12.5px Inter,' + F + ';color:#3b4c57;cursor:pointer}#zadm .gc button small{color:#93a3ad;font-weight:700}#zadm .gc button.on{background:#d81b3c;border-color:#d81b3c;color:#fff}#zadm .gc button.on small{color:#ffd5dc}' +
    '#zadm .sx{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:14px 14px 0}#zadm .sx div{background:#fff;border-radius:14px;padding:10px 4px;text-align:center;font:700 11px ' + F + ';color:#7a8b96;box-shadow:0 2px 0 #e3eaef}#zadm .sx b{display:block;font:800 19px Inter,sans-serif;color:#0b3d5c}#zadm .sx .rd b{color:#d81b3c}';
  st.textContent = CSS;

  CSS += '#zadm .fb{display:flex;gap:6px;padding:12px 14px 0}#zadm .fb button{flex:1;border:1.5px solid #e1e9ef;background:#fff;border-radius:12px;padding:9px 4px;font:800 12.5px ' + F + ';color:#3b4c57;cursor:pointer}#zadm .fb button.on{border-color:#d81b3c;color:#d81b3c;background:#fff4f6}' +
    '#zadm .fc{display:flex;flex-wrap:wrap;gap:6px;padding:8px 14px 0}#zadm .fc button{border:0;border-radius:999px;padding:5px 10px;background:#d81b3c;color:#fff;font:700 11.5px ' + F + ';cursor:pointer}#zadm .rc{margin:10px 16px 0;font:700 11.5px ' + F + ';color:#7a8b96}' +
    '#zadm .zas-bg{position:fixed;inset:0;z-index:5;background:rgba(10,30,45,.45)}#zadm .zas{position:fixed;left:0;right:0;bottom:0;z-index:6;max-height:75vh;overflow:auto;background:#fff;border-radius:22px 22px 0 0;padding:14px 16px 18px;animation:zaUp .2s ease}@keyframes zaUp{from{transform:translateY(40px);opacity:0}}' +
    '#zadm .zas .hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px}#zadm .zas .hd b{font:800 15px ' + F + ';color:#0b3d5c}#zadm .zas .x{width:32px;height:32px;border-radius:50%;border:0;background:#eef3f7;color:#3b4c57;font:700 13px Inter,sans-serif;cursor:pointer}' +
    '#zadm .zas .r{display:flex;width:100%;align-items:center;justify-content:space-between;border:0;border-bottom:1px solid #eef3f7;background:none;padding:12px 4px;font:700 14px ' + F + ';color:#14232c;cursor:pointer}#zadm .zas .r small{color:#93a3ad;font-weight:700}' +
    '#zadm .zas .ck{flex:none;width:22px;height:22px;border-radius:7px;border:2px solid #cfdbe3;box-sizing:border-box}#zadm .zas .ck.on{background:#d81b3c;border-color:#d81b3c;position:relative}#zadm .zas .ck.on:after{content:"✓";position:absolute;inset:0;display:grid;place-items:center;color:#fff;font:800 13px/18px Inter,sans-serif;text-align:center}' +
    '#zadm .zas .go{display:block;margin:14px auto 0;border:0;border-radius:999px;padding:11px 24px;background:linear-gradient(135deg,#ff5a6e,#d81b3c);color:#fff;font:800 13.5px ' + F + ';cursor:pointer}';
  st.textContent = CSS;

  var w;
  function shell(title, sub, icon, back) {
    w.innerHTML = '<div class="mh">' + (back ? '<button type="button" class="bk" aria-label="Back">←</button>' : '<button type="button" class="bk" aria-label="Close">✕</button><button type="button" class="lo">ലോഗ് ഔട്ട്</button>') +
      '<span class="cap">' + icon + '</span><h2>' + title + '</h2><p>' + sub + '</p></div><div class="bd"></div><div class="ft"></div>';
    w.querySelector(".bk").onclick = back ? home : close;
    var lo = w.querySelector(".lo"); if (lo) lo.onclick = logout;
    w.scrollTop = 0; return w.querySelector(".bd");
  }
  function home() {
    var bd = shell("അഡ്മിൻ പേജ്", "ZEST അഡ്മിൻമാർക്ക് മാത്രം", "🔒", false);
    var nb = D.blood.req.filter(function (r) { return !r.done; }).length, ne = D.eq.need.filter(function (r) { return !r.done; }).length, nl = D.lib.req.filter(function (r) { return !r.done; }).length, nd = D.drv.req.filter(function (r) { return !r.done; }).length;
    bd.innerHTML = '<div class="tl"><button type="button" data-g="gov"><i>🏛️</i>സർക്കാർ പദ്ധതികൾ<small>അംഗീകാരം കാത്തിരിക്കുന്നവ</small></button>' +
      '<button type="button" data-g="blood"><i>🩸</i>ബ്ലഡ് ബാങ്ക്<small>' + D.blood.don.length + ' ദാതാക്കൾ</small>' + (nb ? '<b class="n">' + nb + '</b>' : '') + '</button>' +
      '<button type="button" data-g="eq"><i>🦽</i>മെഡിക്കൽ സപ്പോർട്ട്<small>ഉപകരണങ്ങൾ · ഡ്രൈവർ</small>' + ((ne + nd) ? '<b class="n">' + (ne + nd) + '</b>' : '') + '</button>' +
      '<button type="button" data-g="lib"><i>📚</i>ലൈബ്രറി<small>' + D.lib.books.length + ' പുസ്തകങ്ങൾ</small>' + (nl ? '<b class="n">' + nl + '</b>' : '') + '</button></div>' +
      '<p class="dm">🧪 ബ്ലഡ് ബാങ്ക്, ഉപകരണങ്ങൾ, ലൈബ്രറി എന്നിവയിൽ ഇപ്പോൾ ഡമ്മി ഡാറ്റയാണ്</p>';
    bd.querySelectorAll("[data-g]").forEach(function (b) { b.onclick = function () { var g = b.dataset.g; if (g === "gov") gov("pending"); else if (g === "blood") blood("req"); else if (g === "eq") eq("need"); else lib("books"); }; });
    call({ action: "list", status: "pending" }).then(function (j) { var n = (j.items || []).length; var b = bd.querySelector('[data-g="gov"]'); if (n && b) b.insertAdjacentHTML("beforeend", '<b class="n">' + n + '</b>'); }).catch(function () {});
  }

  /* ---------- DUMMY DATA (preview) ---------- */
  function dIn(n) { var d = new Date(); d.setDate(d.getDate() + n); return d; }
  function fd(d) { d = new Date(d); return ("0" + d.getDate()).slice(-2) + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear(); }
  var D = {
    blood: {
      don: [
        { n: "സാമ്പിൾ ദാതാവ് 1", h: "പുത്തൻവീട്", p: "വെള്ളൂർ", g: "O+", ph: "98XXXXXX01", nx: -5 },
        { n: "സാമ്പിൾ ദാതാവ് 2", h: "കുന്നുമ്മൽ", p: "കോടഞ്ചേരി", g: "B+", ph: "98XXXXXX02", nx: 41 },
        { n: "സാമ്പിൾ ദാതാവ് 3", h: "പാറക്കൽ", p: "വെള്ളൂർ", g: "A+", ph: "98XXXXXX03", nx: -60 },
        { n: "സാമ്പിൾ ദാതാവ് 4", h: "തോട്ടത്തിൽ", p: "കോട്ടെമ്പ്രം", g: "O-", ph: "98XXXXXX04", nx: -1 },
        { n: "സാമ്പിൾ ദാതാവ് 5", h: "കിഴക്കേവീട്", p: "തിരുവമ്പാടി", g: "AB+", ph: "98XXXXXX05", nx: 12 },
        { n: "സാമ്പിൾ ദാതാവ് 6", h: "മഠത്തിൽ", p: "കോട്ടെമ്പ്രം", g: "B-", ph: "98XXXXXX06", nx: -30 },
        { n: "സാമ്പിൾ ദാതാവ് 7", h: "പുത്തൻവീട്", p: "വെള്ളൂർ", g: "O+", ph: "98XXXXXX01", nx: -90 }
      ],
      req: [
        { n: "രോഗി A", h: "ചാലിൽ", p: "കോടഞ്ചേരി", g: "O+", u: 2, hs: "മെഡിക്കൽ കോളേജ്, കോഴിക്കോട്", d: 1, ph: "97XXXXXX11" },
        { n: "രോഗി B", h: "മേലേടത്ത്", p: "താമരശ്ശേരി", g: "B-", u: 1, hs: "താലൂക്ക് ആശുപത്രി, താമരശ്ശേരി", d: 3, ph: "97XXXXXX12" },
        { n: "രോഗി C", h: "പുളിക്കൽ", p: "വെള്ളൂർ", g: "A+", u: 3, hs: "ബേബി മെമ്മോറിയൽ, കോഴിക്കോട്", d: -2, ph: "97XXXXXX13", done: 1 }
      ]
    },
    eq: {
      need: [
        { it: "വീൽചെയർ", n: "സാമ്പിൾ 1", h: "കുന്നത്ത്", p: "വെള്ളൂർ", ph: "96XXXXXX21", d: 0, days: 30 },
        { it: "വാട്ടർ ബെഡ്", n: "സാമ്പിൾ 2", h: "പാലക്കൽ", p: "കോടഞ്ചേരി", ph: "96XXXXXX22", d: 2, days: 60 },
        { it: "ഓക്സിജൻ കോൺസൻട്രേറ്റർ", n: "സാമ്പിൾ 3", h: "മുണ്ടക്കൽ", p: "നെല്ലിപ്പൊയിൽ", ph: "96XXXXXX23", d: -4, days: 15, done: 1 }
      ],
      give: [
        { it: "വാക്കർ", n: "സാമ്പിൾ 4", h: "ചെറുവത്ത്", p: "വെള്ളൂർ", ph: "96XXXXXX24", how: "ZEST CENTRE-ൽ എത്തിക്കാം" },
        { it: "ആശുപത്രി കട്ടിൽ", n: "സാമ്പിൾ 5", h: "ഇല്ലിക്കൽ", p: "കോടഞ്ചേരി", ph: "96XXXXXX25", how: "വീട്ടിൽ വന്ന് എടുക്കണം" },
        { it: "വീൽചെയർ", n: "സാമ്പിൾ 6", h: "കല്ലുങ്കൽ", p: "തിരുവമ്പാടി", ph: "96XXXXXX26", how: "ആവശ്യക്കാരന് നേരിട്ട് കൊടുക്കാം" }
      ]
    },
    drv: {
      req: [
        { n: "സാമ്പിൾ 7", h: "കുന്നുമ്മൽ", p: "വെള്ളൂർ", ph: "93XXXXXX41", hs: "MIMS, കോഴിക്കോട്", d: 1, tm: "9:00 AM", pk: "വെള്ളൂർ, കോട്ടെമ്പ്രം റോഡ്" },
        { n: "സാമ്പിൾ 8", h: "പാറക്കൽ", p: "കോടഞ്ചേരി", ph: "93XXXXXX42", hs: "താലൂക്ക് ആശുപത്രി, താമരശ്ശേരി", d: 3, tm: "10:30 AM", pk: "കോടഞ്ചേരി ടൗൺ", dr: "സാമ്പിൾ ഡ്രൈവർ 1" },
        { n: "സാമ്പിൾ 9", h: "മഠത്തിൽ", p: "വെള്ളൂർ", ph: "93XXXXXX43", hs: "മെഡിക്കൽ കോളേജ്, കോഴിക്കോട്", d: -2, tm: "8:00 AM", pk: "വെള്ളൂർ", dr: "സാമ്പിൾ ഡ്രൈവർ 2", done: 1 }
      ],
      vol: [
        { n: "സാമ്പിൾ ഡ്രൈവർ 1", h: "പുത്തൻപുര", p: "വെള്ളൂർ", ph: "92XXXXXX51", veh: "🚗 കാർ", days: "ചൊവ്വ, വെള്ളി, ശനി", tm: "രാവിലെ" },
        { n: "സാമ്പിൾ ഡ്രൈവർ 2", h: "ചെറുവത്ത്", p: "കോടഞ്ചേരി", ph: "92XXXXXX52", veh: "🛺 ഓട്ടോ", days: "എല്ലാ ദിവസവും, അടിയന്തരം", tm: "രാവിലെ, വൈകുന്നേരം" },
        { n: "സാമ്പിൾ ഡ്രൈവർ 3", h: "കല്ലുങ്കൽ", p: "കോട്ടെമ്പ്രം", ph: "92XXXXXX53", veh: "🚗 കാർ", days: "ഞായർ", tm: "ഉച്ചയ്ക്ക്" }
      ]
    },
    lib: {
      books: [
        { t: "രണ്ടാമൂഴം", a: "എം.ടി. വാസുദേവൻ നായർ", c: "നോവൽ", st: 1 },
        { t: "ആടുജീവിതം", a: "ബെന്യാമിൻ", c: "നോവൽ", st: 2, by: "സാമ്പിൾ വായനക്കാരൻ 1", ph: "95XXXXXX31", due: 4 },
        { t: "അഗ്നിച്ചിറകുകൾ", a: "എ.പി.ജെ. അബ്ദുൽ കലാം", c: "ആത്മകഥ", st: 2, by: "സാമ്പിൾ വായനക്കാരൻ 2", ph: "95XXXXXX32", due: -3 },
        { t: "ബാല്യകാലസഖി", a: "വൈക്കം മുഹമ്മദ് ബഷീർ", c: "നോവൽ", st: 1 },
        { t: "ഒരു ദേശത്തിന്റെ കഥ", a: "എസ്.കെ. പൊറ്റെക്കാട്ട്", c: "നോവൽ", st: 1 }
      ],
      req: [
        { t: "ഖസാക്കിന്റെ ഇതിഹാസം", a: "ഒ.വി. വിജയൻ", n: "സാമ്പിൾ വായനക്കാരൻ 3", ph: "95XXXXXX33" },
        { t: "ബാല്യകാലസഖി", a: "", n: "സാമ്പിൾ വായനക്കാരൻ 4", ph: "95XXXXXX34", ask: 1 }
      ]
    }
  };
  function dm(t) { return '<p class="dm">🧪 ഡമ്മി ഡാറ്റ – ' + (t || "കാണിക്കാൻ മാത്രം") + '</p>'; }
  function tabs(arr, cur, fn) { return '<div class="tb">' + arr.map(function (a) { return '<button type="button" data-t="' + a[0] + '"' + (a[0] === cur ? ' class="on"' : '') + '>' + a[1] + '</button>'; }).join("") + '</div>'; }
  function wireTabs(bd, fn) { bd.querySelectorAll(".tb button").forEach(function (b) { b.onclick = function () { fn(b.dataset.t); }; }); }
  function acts(ph, extra) { return '<div class="ia"><button type="button" class="ca" data-dm>📞 വിളിക്കാം</button><button type="button" class="wh" data-dm>💬 WhatsApp</button>' + (extra || "") + '</div>'; }
  function dmWire(bd) { bd.querySelectorAll("[data-dm]").forEach(function (b) { b.onclick = function () { toast("ഡമ്മി ഡാറ്റ – ലൈവ് ആകുമ്പോൾ പ്രവർത്തിക്കും"); }; }); }

  var BAGS = '<svg viewBox="0 0 58 84" aria-hidden="true"><rect x="22" y="2" width="14" height="10" rx="3" fill="#9fb3c1"/><rect x="4" y="10" width="50" height="62" rx="14" fill="#fff" stroke="#c8102e" stroke-width="2.5"/><rect x="9" y="24" width="40" height="43" rx="10" fill="#e0234a"/><rect x="14" y="16" width="20" height="3" rx="1.5" fill="#e6edf2"/><path d="M29 72 V82" stroke="#c8102e" stroke-width="3" stroke-linecap="round"/></svg>';
  var G = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"], AV = { y: "ഇപ്പോൾ ലഭ്യം", s: "30 ദിവസത്തിനുള്ളിൽ", l: "പിന്നീട്" };
  var BF = { g: [], a: [], p: [] };
  function avk(x) { return x.nx <= 0 ? "y" : x.nx <= 30 ? "s" : "l"; }
  function fsheet(k) {
    var opts = k === "g" ? G.map(function (g) { return [g, g, D.blood.don.filter(function (x) { return x.g === g; }).length]; })
      : k === "a" ? ["y", "s", "l"].map(function (v) { return [v, AV[v], D.blood.don.filter(function (x) { return avk(x) === v; }).length]; })
      : ["വെള്ളൂർ", "കോടഞ്ചേരി", "കോട്ടെമ്പ്രം"].map(function (v) { return [v, v, D.blood.don.filter(function (x) { return x.p === v; }).length]; });
    var sel = BF[k].slice(), ttl = { g: "🩸 ബ്ലഡ് ഗ്രൂപ്പ്", a: "✅ ലഭ്യത", p: "📍 സ്ഥലം" }[k];
    var bg = document.createElement("div"); bg.className = "zas-bg"; var sh = document.createElement("div"); sh.className = "zas";
    function draw() {
      sh.innerHTML = '<div class="hd"><b>' + ttl + '</b><button type="button" class="x">✕</button></div>' +
        '<button type="button" class="r" data-v=""><span>എല്ലാം</span><span class="ck' + (!sel.length ? ' on' : '') + '"></span></button>' +
        opts.map(function (o) { return '<button type="button" class="r" data-v="' + o[0] + '"><span>' + o[1] + ' <small>' + o[2] + '</small></span><span class="ck' + (sel.indexOf(o[0]) > -1 ? ' on' : '') + '"></span></button>'; }).join("") +
        '<button type="button" class="go">ദാതാക്കളെ കാണിക്കൂ</button>';
      sh.querySelector(".x").onclick = shut; bg.onclick = shut;
      sh.querySelectorAll(".r").forEach(function (r) { r.onclick = function () { var v = r.dataset.v; if (!v) sel = []; else if (sel.indexOf(v) > -1) sel = sel.filter(function (z) { return z !== v; }); else sel.push(v); draw(); }; });
      sh.querySelector(".go").onclick = function () { BF[k] = sel; shut(); blood("don"); };
    }
    function shut() { bg.remove(); sh.remove(); }
    draw(); w.appendChild(bg); w.appendChild(sh);
  }
  function blood(t) {
    var bd = shell("ബ്ലഡ് ബാങ്ക്", "രക്തം വേണ്ടവരും ദാതാക്കളും", "🩸", true);
    var open = D.blood.req.filter(function (r) { return !r.done; }).length;
    var h = tabs([["req", "📩 ആവശ്യങ്ങൾ" + (open ? " (" + open + ")" : "")], ["don", "🩸 ദാതാക്കൾ (" + D.blood.don.length + ")"]], t) + dm();
    if (t === "req") {
      h += D.blood.req.map(function (r, i) {
        var av = D.blood.don.filter(function (x) { return x.g === r.g && x.nx <= 0; }).length;
        return '<div class="it' + (r.done ? ' dn' : '') + '"><div class="ih"><span class="bg">' + BAGS + '<i>' + r.g + '</i></span><div><b>' + r.n + '</b><small>' + r.h + ', ' + r.p + '</small></div>' + (r.done ? '<em class="ok">✅ കിട്ടി</em>' : (r.d <= 1 ? '<em class="ur">അടിയന്തരം</em>' : '')) + '</div>' +
          '<div class="kv"><span>🏥 ' + r.hs + '</span><span>🩸 ' + r.u + ' യൂണിറ്റ്</span><span>📅 ' + fd(dIn(r.d)) + '</span><span>📱 ' + r.ph + '</span></div>' +
          (r.done ? '' : '<button type="button" class="mt" data-g="' + r.g + '">🔎 ' + r.g + ' ലഭ്യമായ ദാതാക്കൾ: <b>' + av + '</b> ›</button>' + acts(r.ph, '<button type="button" class="ok" data-i="' + i + '">✅ കിട്ടി</button>')) + '</div>';
      }).join("");
    } else {
      var L = D.blood.don.filter(function (x) { return (!BF.g.length || BF.g.indexOf(x.g) > -1) && (!BF.a.length || BF.a.indexOf(avk(x)) > -1) && (!BF.p.length || BF.p.indexOf(x.p) > -1); })
        .sort(function (p, q) { return Math.max(p.nx, 0) - Math.max(q.nx, 0) || G.indexOf(p.g) - G.indexOf(q.g); });
      h += '<div class="fb"><button type="button" data-k="g"' + (BF.g.length ? ' class="on"' : '') + '>🩸 ഗ്രൂപ്പ് ▾</button><button type="button" data-k="a"' + (BF.a.length ? ' class="on"' : '') + '>✅ ലഭ്യത ▾</button><button type="button" data-k="p"' + (BF.p.length ? ' class="on"' : '') + '>📍 സ്ഥലം ▾</button></div>';
      var ch = []; ["g", "a", "p"].forEach(function (k) { BF[k].forEach(function (v) { ch.push('<button type="button" data-ck="' + k + '" data-cv="' + v + '">' + (k === "a" ? AV[v] : v) + ' ✕</button>'); }); });
      if (ch.length) h += '<div class="fc">' + ch.join("") + '</div>';
      h += '<p class="rc">' + L.length + ' ദാതാക്കൾ · ലഭ്യമായവർ ആദ്യം</p>';
      h += L.length ? L.map(function (x) {
        var ok = x.nx <= 0;
        return '<div class="it"><div class="ih"><span class="bg">' + BAGS + '<i>' + x.g + '</i></span><div><b>' + x.n + '</b><small>' + x.h + ', ' + x.p + ' · 📱 ' + x.ph + '</small></div>' + (ok ? '<em class="ok">ലഭ്യം</em>' : '<em class="wt">' + fd(dIn(x.nx)) + ' മുതൽ</em>') + '</div>' + acts(x.ph) + '</div>';
      }).join("") : '<div class="em"><i>🩸</i>ഈ ഫിൽട്ടറിൽ ദാതാക്കൾ ഇല്ല</div>';
    }
    var sy = w.scrollTop; bd.innerHTML = h; if (t === "don") w.scrollTop = sy; wireTabs(bd, function (x) { blood(x); }); dmWire(bd);
    bd.querySelectorAll(".mt").forEach(function (b) { b.onclick = function () { BF = { g: [b.dataset.g], a: ["y"], p: [] }; blood("don"); }; });
    bd.querySelectorAll(".fb button").forEach(function (b) { b.onclick = function () { fsheet(b.dataset.k); }; });
    bd.querySelectorAll(".fc button").forEach(function (b) { b.onclick = function () { var k = b.dataset.ck; BF[k] = BF[k].filter(function (v) { return v !== b.dataset.cv; }); blood("don"); }; });
    bd.querySelectorAll(".ia .ok").forEach(function (b) { b.onclick = function () { D.blood.req[b.dataset.i].done = 1; toast("പൂർത്തിയായി ✅"); blood("req"); }; });
  }

  var MSV = "eq";
  function msv() { var ne = D.eq.need.filter(function (r) { return !r.done; }).length, nd = D.drv.req.filter(function (r) { return !r.done; }).length;
    return '<div class="tb msv" style="margin-bottom:10px;background:#dfeaf3"><button type="button" data-s="eq"' + (MSV === "eq" ? ' class="on"' : '') + '>🦽 ഉപകരണങ്ങൾ' + (ne ? " (" + ne + ")" : "") + '</button><button type="button" data-s="drv"' + (MSV === "drv" ? ' class="on"' : '') + '>🚗 ഡ്രൈവർ' + (nd ? " (" + nd + ")" : "") + '</button></div>'; }
  function msvWire(bd) { bd.querySelectorAll(".msv button").forEach(function (b) { b.onclick = function (e) { e.stopPropagation(); MSV = b.dataset.s; MSV === "drv" ? drv("req") : eq("need"); }; }); }
  function drv(t) {
    MSV = "drv";
    var bd = shell("മെഡിക്കൽ സപ്പോർട്ട്", "ആശുപത്രി യാത്രയ്ക്ക് വളണ്ടിയർ ഡ്രൈവർ", "🚗", true);
    var open = D.drv.req.filter(function (r) { return !r.done; }).length;
    var h = msv() + '<div class="dtb">' + tabs([["req", "📩 യാത്ര ആവശ്യങ്ങൾ" + (open ? " (" + open + ")" : "")], ["vol", "🚗 ഡ്രൈവർമാർ (" + D.drv.vol.length + ")"]], t) + '</div>' + dm();
    if (t === "req") {
      h += D.drv.req.map(function (r, i) {
        return '<div class="it' + (r.done ? ' dn' : '') + '"><div class="ih"><span class="eg">🏥</span><div><b>' + r.hs + '</b><small>' + r.n + ' · ' + r.h + ', ' + r.p + '</small></div>' + (r.done ? '<em class="ok">✅ പൂർത്തിയായി</em>' : (r.dr ? '<em class="ok">ഡ്രൈവർ ഉണ്ട്</em>' : '<em class="wt">ഡ്രൈവർ വേണം</em>')) + '</div>' +
          '<div class="kv"><span>📅 ' + fd(dIn(r.d)) + ' · ' + r.tm + '</span><span>📍 ' + r.pk + '</span><span>📱 ' + r.ph + '</span>' + (r.dr ? '<span>🚗 ' + r.dr + '</span>' : '') + '</div>' +
          (r.done ? '' : acts(r.ph, '<button type="button" class="ok" data-i="' + i + '">✅ പൂർത്തിയായി</button>')) + '</div>';
      }).join("");
    } else {
      h += D.drv.vol.map(function (r) {
        return '<div class="it"><div class="ih"><span class="eg">🚗</span><div><b>' + r.n + '</b><small>' + r.h + ', ' + r.p + '</small></div><em class="ok">' + r.veh + '</em></div>' +
          '<div class="kv"><span>📅 ' + r.days + '</span><span>⏰ ' + r.tm + '</span><span>📱 ' + r.ph + '</span></div>' + acts(r.ph, '') + '</div>';
      }).join("");
    }
    bd.innerHTML = h; msvWire(bd); bd.querySelectorAll(".dtb .tb button").forEach(function (b) { b.onclick = function () { drv(b.dataset.t); }; }); dmWire(bd);
    bd.querySelectorAll(".ia .ok").forEach(function (b) { b.onclick = function () { D.drv.req[b.dataset.i].done = 1; toast("പൂർത്തിയായി ✅"); drv("req"); }; });
  }
  function eq(t) {
    MSV = "eq";
    var bd = shell("മെഡിക്കൽ സപ്പോർട്ട്", "ഉപകരണങ്ങൾ · ആശുപത്രി യാത്ര", "🦽", true);
    var open = D.eq.need.filter(function (r) { return !r.done; }).length;
    var h = msv() + '<div class="etb">' + tabs([["need", "📩 ആവശ്യങ്ങൾ" + (open ? " (" + open + ")" : "")], ["give", "🤝 ലഭ്യമായവ (" + D.eq.give.length + ")"]], t) + '</div>' + dm();
    if (t === "need") {
      h += D.eq.need.map(function (r, i) {
        var m = D.eq.give.filter(function (g) { return g.it === r.it; }).length;
        return '<div class="it' + (r.done ? ' dn' : '') + '"><div class="ih"><span class="eg">🦽</span><div><b>' + r.it + '</b><small>' + r.n + ' · ' + r.h + ', ' + r.p + '</small></div>' + (r.done ? '<em class="ok">✅ കൊടുത്തു</em>' : (m ? '<em class="ok">' + m + ' ലഭ്യം</em>' : '<em class="wt">ലഭ്യമല്ല</em>')) + '</div>' +
          '<div class="kv"><span>📅 ' + fd(dIn(r.d)) + ' മുതൽ</span><span>⏳ ' + r.days + ' ദിവസം</span><span>📱 ' + r.ph + '</span></div>' +
          (r.done ? '' : acts(r.ph, '<button type="button" class="ok" data-i="' + i + '">✅ കൊടുത്തു</button>')) + '</div>';
      }).join("");
    } else {
      h += D.eq.give.map(function (r, i) {
        return '<div class="it' + (r.done ? ' dn' : '') + '"><div class="ih"><span class="eg">🤝</span><div><b>' + r.it + '</b><small>' + r.n + ' · ' + r.h + ', ' + r.p + '</small></div>' + (r.done ? '<em class="wt">കൈമാറി</em>' : '<em class="ok">ലഭ്യം</em>') + '</div>' +
          '<div class="kv"><span>🚚 ' + r.how + '</span><span>📱 ' + r.ph + '</span></div>' + (r.done ? '' : acts(r.ph, '<button type="button" class="ok" data-i="' + i + '">✅ കൈമാറി</button>')) + '</div>';
      }).join("");
    }
    bd.innerHTML = h; msvWire(bd); bd.querySelectorAll(".etb .tb button").forEach(function (b) { b.onclick = function () { eq(b.dataset.t); }; }); dmWire(bd);
    bd.querySelectorAll(".ia .ok").forEach(function (b) { b.onclick = function () { (t === "need" ? D.eq.need : D.eq.give)[b.dataset.i].done = 1; toast("അപ്ഡേറ്റ് ചെയ്തു ✅"); eq(t); }; });
  }

  function lib(t) {
    var bd = shell("ലൈബ്രറി", "പുസ്തകങ്ങളും വായനക്കാരുടെ ആവശ്യങ്ങളും", "📚", true);
    var B = D.lib.books, out = B.filter(function (b) { return b.st === 2; }).length, late = B.filter(function (b) { return b.st === 2 && b.due < 0; }).length, rq = D.lib.req.filter(function (r) { return !r.done; }).length;
    var h = '<div class="sx"><div><b>' + B.length + '</b>ആകെ</div><div><b>' + (B.length - out) + '</b>ലഭ്യം</div><div><b>' + out + '</b>വായനയിൽ</div><div class="rd"><b>' + late + '</b>വൈകിയവ</div></div>' +
      tabs([["books", "📚 പുസ്തകങ്ങൾ"], ["req", "🙋 അഭ്യർത്ഥനകൾ" + (rq ? " (" + rq + ")" : "")]], t) + dm();
    if (t === "books") {
      h += '<button type="button" class="ad" data-dm>➕ പുതിയ പുസ്തകം ചേർക്കുക</button>';
      h += B.map(function (b, i) {
        return '<div class="it"><div class="ih"><span class="eg">📖</span><div><b>' + b.t + '</b><small>' + b.a + ' · ' + b.c + '</small></div>' + (b.st === 1 ? '<em class="ok">ലഭ്യം</em>' : '<em class="' + (b.due < 0 ? 'ur' : 'wt') + '">' + (b.due < 0 ? 'വൈകി' : 'വായനയിൽ') + '</em>') + '</div>' +
          (b.st === 2 ? '<div class="kv"><span>👤 ' + b.by + '</span><span>📱 ' + b.ph + '</span><span>' + (b.due < 0 ? '⚠️ ' + (-b.due) + ' ദിവസം വൈകി' : '📅 തിരികെ: ' + fd(dIn(b.due))) + '</span></div>' + acts(b.ph, '<button type="button" class="ok" data-r="' + i + '">↩️ തിരികെ കിട്ടി</button>')
            : '<div class="ia"><button type="button" class="ok" data-o="' + i + '">📤 വായിക്കാൻ കൊടുത്തു</button></div>') + '</div>';
      }).join("");
    } else {
      h += D.lib.req.map(function (r, i) {
        return '<div class="it' + (r.done ? ' dn' : '') + '"><div class="ih"><span class="eg">' + (r.ask ? '📖' : '🆕') + '</span><div><b>' + r.t + '</b><small>' + (r.ask ? 'ലൈബ്രറിയിലെ പുസ്തകം ചോദിച്ചു' : 'പുതിയ പുസ്തകം ആവശ്യപ്പെട്ടു' + (r.a ? ' · ' + r.a : '')) + '</small></div>' + (r.done ? '<em class="ok">✅</em>' : '') + '</div>' +
          '<div class="kv"><span>👤 ' + r.n + '</span><span>📱 ' + r.ph + '</span></div>' + (r.done ? '' : acts(r.ph, '<button type="button" class="ok" data-q="' + i + '">✅ ശരിയാക്കി</button>')) + '</div>';
      }).join("");
    }
    bd.innerHTML = h; wireTabs(bd, lib); dmWire(bd);
    bd.querySelectorAll("[data-r]").forEach(function (b) { b.onclick = function () { var k = B[b.dataset.r]; k.st = 1; delete k.by; toast("തിരികെ കിട്ടി ✅"); lib("books"); }; });
    bd.querySelectorAll("[data-o]").forEach(function (b) { b.onclick = function () { var k = B[b.dataset.o]; k.st = 2; k.by = "സാമ്പിൾ വായനക്കാരൻ"; k.ph = "95XXXXXX39"; k.due = 14; toast("14 ദിവസത്തേക്ക് കൊടുത്തു 📤"); lib("books"); }; });
    bd.querySelectorAll("[data-q]").forEach(function (b) { b.onclick = function () { D.lib.req[b.dataset.q].done = 1; toast("ശരിയാക്കി ✅"); lib("req"); }; });
  }

  function card(s, pending) {
    if (!pending) return '<div class="cd"><div class="done">✅<span>' + esc(s.title) + '<small>' + (s.status === "approved" ? "Info-യിൽ പോസ്റ്റ് ചെയ്തു" : "ഒഴിവാക്കി") + '</small></span></div></div>';
    return '<div class="cd" data-id="' + s.id + '"><label><span>തലക്കെട്ട്</span><input class="t" value="' + esc(s.title) + '"></label>' +
      '<label><span>വിവരണം</span><textarea class="b">' + esc(s.body) + '</textarea></label>' +
      '<div class="r2"><label><span>വെബ്സൈറ്റ് ലിങ്ക്</span><input class="l" value="' + esc(s.link || "") + '" placeholder="https://"></label><label><span>അവസാന തീയതി</span><input class="d" type="date" value="' + esc(s.last_date || "") + '"></label></div>' +
      (s.source ? '<div class="src">ഉറവിടം: ' + esc(s.source) + '</div>' : '') +
      '<div class="ac"><button type="button" class="y">✅ അംഗീകരിച്ച് പോസ്റ്റ് ചെയ്യുക</button><button type="button" class="n">❌</button></div></div>';
  }
  function gov(status) {
    var bd = shell("സർക്കാർ പദ്ധതികൾ", "അംഗീകരിച്ചാൽ Info-യിൽ പോസ്റ്റ് ആകും, എല്ലാവർക്കും നോട്ടിഫിക്കേഷൻ പോകും", "🏛️", true);
    bd.innerHTML = '<div class="tb"><button type="button" data-s="pending"' + (status === "pending" ? ' class="on"' : '') + '>⏳ കാത്തിരിക്കുന്നവ</button><button type="button" data-s="approved"' + (status === "approved" ? ' class="on"' : '') + '>✅ പോസ്റ്റ് ചെയ്തവ</button></div>' +
      (status === "pending" ? '<button type="button" class="ad">➕ പുതിയ പദ്ധതി ചേർക്കുക</button>' : '') + '<div class="ls"><div class="em">ലോഡ് ചെയ്യുന്നു…</div></div>';
    bd.querySelectorAll(".tb button").forEach(function (b) { b.onclick = function () { gov(b.dataset.s); }; });
    var ad = bd.querySelector(".ad"); if (ad) ad.onclick = function () { addForm(bd); };
    var ls = bd.querySelector(".ls");
    call({ action: "list", status: status }).then(function (j) {
      var it = j.items || [];
      ls.innerHTML = it.length ? it.map(function (s) { return card(s, status === "pending"); }).join("") : '<div class="em"><i>' + (status === "pending" ? "🎉" : "📭") + '</i>' + (status === "pending" ? "അംഗീകാരം കാത്തിരിക്കുന്ന പദ്ധതികൾ ഇല്ല" : "ഇതുവരെ ഒന്നും പോസ്റ്റ് ചെയ്തിട്ടില്ല") + '</div>';
      ls.querySelectorAll(".cd[data-id]").forEach(wire);
    }).catch(function (e) { if (e.message !== "auth") ls.innerHTML = '<div class="em"><i>📶</i>ഇന്റർനെറ്റ് കണക്ഷൻ പരിശോധിക്കൂ</div>'; });
  }
  function vals(cd) { return { title: cd.querySelector(".t").value.trim(), body: cd.querySelector(".b").value.trim(), link: cd.querySelector(".l").value.trim(), last_date: cd.querySelector(".d").value || null }; }
  function wire(cd) {
    var y = cd.querySelector(".y"), n = cd.querySelector(".n"), ac = cd.querySelector(".ac");
    function confirmRow(text, yes, run) {
      var old = ac.innerHTML; ac.innerHTML = '<button type="button" class="c">റദ്ദാക്കുക</button><button type="button" class="' + yes + '">' + text + '</button>';
      ac.querySelector(".c").onclick = function () { ac.innerHTML = old; wire(cd); };
      ac.querySelector("." + yes).onclick = function () { this.disabled = true; this.textContent = "…"; run(); };
    }
    y.onclick = function () {
      var v = vals(cd); if (!v.title) { cd.querySelector(".t").focus(); toast("തലക്കെട്ട് വേണം"); return; }
      confirmRow("✅ ഉറപ്പാണ്, പോസ്റ്റ് ചെയ്യുക", "y", function () {
        v.action = "approve"; v.id = cd.dataset.id;
        call(v).then(function (j) { if (j.ok) { cd.outerHTML = '<div class="cd"><div class="done">✅<span>' + esc(v.title) + '<small>Info-യിൽ പോസ്റ്റ് ചെയ്തു · ' + (j.sent || 0) + ' പേർക്ക് നോട്ടിഫിക്കേഷൻ പോയി</small></span></div></div>'; toast("പോസ്റ്റ് ചെയ്തു ✅"); } else { toast("പോസ്റ്റ് ചെയ്യാൻ കഴിഞ്ഞില്ല"); gov("pending"); } }).catch(function () { toast("ഇന്റർനെറ്റ് കണക്ഷൻ പരിശോധിക്കൂ"); });
      });
    };
    n.onclick = function () {
      confirmRow("❌ ഒഴിവാക്കുക", "n", function () {
        call({ action: "reject", id: cd.dataset.id }).then(function () { cd.remove(); toast("ഒഴിവാക്കി"); }).catch(function () { toast("ഇന്റർനെറ്റ് കണക്ഷൻ പരിശോധിക്കൂ"); });
      });
    };
  }
  function addForm(bd) {
    if (bd.querySelector(".cd.new")) return;
    var d = document.createElement("div"); d.className = "cd new";
    d.innerHTML = '<label><span>തലക്കെട്ട് *</span><input class="t"></label><label><span>വിവരണം</span><textarea class="b"></textarea></label>' +
      '<div class="r2"><label><span>വെബ്സൈറ്റ് ലിങ്ക്</span><input class="l" placeholder="https://"></label><label><span>അവസാന തീയതി</span><input class="d" type="date"></label></div>' +
      '<div class="ac"><button type="button" class="c">റദ്ദാക്കുക</button><button type="button" class="y">💾 ലിസ്റ്റിൽ ചേർക്കുക</button></div>';
    bd.querySelector(".ad").after(d); d.querySelector(".t").focus();
    d.querySelector(".c").onclick = function () { d.remove(); };
    d.querySelector(".y").onclick = function () {
      var v = vals(d); if (!v.title) { d.querySelector(".t").focus(); toast("തലക്കെട്ട് വേണം"); return; }
      v.action = "add"; call(v).then(function (j) { if (j.id) { toast("ചേർത്തു – ഇനി അംഗീകരിക്കാം"); gov("pending"); } else toast("ചേർക്കാൻ കഴിഞ്ഞില്ല"); }).catch(function () { toast("ഇന്റർനെറ്റ് കണക്ഷൻ പരിശോധിക്കൂ"); });
    };
  }
  function open() {
    var o = document.getElementById("zadm"); if (o) o.remove();
    w = document.createElement("div"); w.id = "zadm"; w.setAttribute("data-noi18n", ""); document.body.appendChild(w); home();
    try { history.pushState({ zadm: 1 }, ""); } catch (e) {}
    addEventListener("popstate", pop);
  }
  function pop() { var o = document.getElementById("zadm"); if (o) o.remove(); removeEventListener("popstate", pop); }
  function close() { if (history.state && history.state.zadm) history.back(); else pop(); }
  window.ZestAdmin = { open: function () { (okTok() || TESTOPEN) ? open() : login(); }, login: login };
})();
