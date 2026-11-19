/* ZEST ADMIN – loaded only by /zest-admin-r01pm/ (never by the public app) */
(function () {
  var API = "https://lauftdyrlnhbimqokgye.supabase.co/functions/v1/zest-admin", K = "zestAdminTok";
  var F = 'Inter,"Noto Sans Malayalam",sans-serif';
  function tok() { try { return localStorage.getItem(K) || ""; } catch (e) { return ""; } }
  function okTok() { var e = +String(tok()).split(".")[0]; return e && e > Date.now(); }
  function logout() { try { localStorage.removeItem(K); } catch (e) {} var a = document.querySelector(".zdw-adm"); if (a) a.remove(); pop(); toast("ലോഗ് ഔട്ട് ചെയ്തു"); }
  function call(o) {
    o.token = tok();
    return fetch(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(o) })
      .then(function (r) { if (r.status === 401) { try { localStorage.removeItem(K); } catch (e) {} var a = document.querySelector(".zdw-adm"); if (a) a.remove(); pop(); login(); throw new Error("auth"); } return r.json(); });
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
    var ls = document.querySelector(".zdw .zdw-ls"); if (!ls || ls.querySelector(".zdw-adm") || !okTok()) return !!ls;
    var a = document.createElement("a"); a.className = "zdw-adm"; a.href = "#"; a.innerHTML = '<i>🔒</i><span>അഡ്മിൻ പേജ്</span><b>›</b>';
    a.onclick = function (e) { e.preventDefault(); e.stopPropagation(); if (window.ZestDrawer) ZestDrawer.close(); if (okTok()) open(); else login(); };
    ls.insertBefore(a, ls.firstChild); return true;
  }
  if (!addMenu()) { var mo = new MutationObserver(function () { if (addMenu()) mo.disconnect(); }); mo.observe(document.documentElement, { childList: true, subtree: true }); }

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
    bd.innerHTML = '<div class="tl"><button type="button" data-g="gov"><i>🏛️</i>സർക്കാർ പദ്ധതികൾ<small>അംഗീകാരം കാത്തിരിക്കുന്നവ</small></button>' +
      '<button type="button" class="off" data-g="soon"><i>🩸</i>ബ്ലഡ് ബാങ്ക്<small>ഉടൻ</small></button>' +
      '<button type="button" class="off" data-g="soon"><i>🦽</i>മെഡിക്കൽ ഉപകരണങ്ങൾ<small>ഉടൻ</small></button>' +
      '<button type="button" class="off" data-g="soon"><i>📚</i>ലൈബ്രറി<small>ഉടൻ</small></button></div>';
    bd.querySelectorAll("[data-g]").forEach(function (b) { b.onclick = function () { if (b.dataset.g === "gov") gov("pending"); else toast("ഉടൻ വരുന്നു 🙂"); }; });
    call({ action: "list", status: "pending" }).then(function (j) { var n = (j.items || []).length; var b = bd.querySelector('[data-g="gov"]'); if (n && b) b.insertAdjacentHTML("beforeend", '<b class="n">' + n + '</b>'); }).catch(function () {});
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
  window.ZestAdmin = { open: function () { okTok() ? open() : login(); }, login: login };
})();
