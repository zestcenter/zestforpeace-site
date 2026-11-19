/* ZEST Students Corner – Pocket Money tracker (data stays on this phone) */
(function () {
  if (window.ZestMoney) return;
  function KEYF() { return window.ZestPK ? ZestPK("zestMoney") : "zestMoney"; }
  function load() { try { var d = JSON.parse(localStorage.getItem(KEYF()) || "null"); if (d && d.tx) return d; } catch (e) {} return { tx: [], goals: [] }; }
  function save(d) { try { localStorage.setItem(KEYF(), JSON.stringify(d)); } catch (e) {} }
  function esc(t) { return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function rs(n) { return "₹" + Math.round(n).toLocaleString("en-IN"); }
  var MS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var ML = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
  var CAT = [["bus", "🚌", "Bus", "#3fa7d6"], ["snacks", "🍫", "Snacks", "#f2a516"], ["books", "📚", "Books", "#25b46a"], ["recharge", "📱", "Recharge", "#8e6be8"], ["gifts", "🎁", "Gifts", "#e8344e"], ["other", "🧾", "Other", "#7a8a94"], ["savings", "🏦", "Savings", "#0b5d8f"]];
  var CM = {}; CAT.forEach(function (c) { CM[c[0]] = c; });
  function mk(d) { d = new Date(d); return d.getFullYear() * 12 + d.getMonth(); }
  function when(ts) {
    var d = new Date(ts), t = new Date(); t.setHours(0, 0, 0, 0);
    var day = new Date(d); day.setHours(0, 0, 0, 0);
    var diff = Math.round((t - day) / 864e5), hm = d.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });
    return diff === 0 ? "Today, " + hm : diff === 1 ? "Yesterday" : d.getDate() + " " + MS[d.getMonth()];
  }

  var css = document.createElement("style");
  css.textContent = '.zmy{position:fixed;inset:0;z-index:2147483646;background:#f2f7fb;overflow:auto;font-family:Inter,"Noto Sans Malayalam",sans-serif;color:#1c2a32;transform:translateY(100%);transition:transform .3s ease}.zmy.on{transform:none}.zmy *{box-sizing:border-box}.zmy .hd.zhx{position:relative;display:block;padding:34px 22px 24px;background:linear-gradient(160deg,#0b3d5c,#1380b8 65%,#3fa7d6);color:#fff;border-radius:0 0 28px 28px;text-align:center;overflow:hidden;box-shadow:none}.zmy .hd.zhx::after{content:"";position:absolute;right:-50px;top:-50px;width:170px;height:170px;border-radius:50%;background:rgba(255,255,255,.08)}.zmy .hd.zhx .zhimg{position:relative;z-index:1;display:block;width:86%;max-width:360px;height:auto;aspect-ratio:780/320;margin:30px auto 0;border-radius:20px;box-shadow:0 10px 24px rgba(0,0,0,.25);border:3px solid rgba(255,255,255,.6);background:#e6f3fb}.zmy .hd.zhx h2{margin:12px 0 4px;font:800 22px Inter,"Noto Sans Malayalam",sans-serif;color:#fff}.zmy .hd.zhx p{margin:0;font:600 12.5px Inter,"Noto Sans Malayalam",sans-serif;color:#cfe6f5}.zmy .hd.zhx .zx{position:absolute;right:14px;top:14px;z-index:2;width:38px;height:38px;border-radius:50%;border:0;background:rgba(255,255,255,.16);color:#fff;font:700 17px Inter,sans-serif;cursor:pointer}.zmy .hd.zhx .zsecx{position:absolute;left:16px;top:18px;z-index:3;margin:0;width:auto;height:auto;border-radius:10px;background:#e3f2fb;color:#0b5d8f;font:800 11.5px/1 Inter,sans-serif;box-shadow:0 2px 6px rgba(0,0,0,.12)}.zmy .hd{position:sticky;top:0;z-index:2;display:flex;align-items:center;justify-content:space-between;padding:14px 16px;background:#fff;box-shadow:0 2px 10px rgba(0,0,0,.05)}.zmy .hd b{font:800 18px Inter,sans-serif;color:#0b5d8f}.zmy .hd button{width:36px;height:36px;border-radius:50%;border:0;background:#eef3f6;font:700 17px Inter;color:#3c4d57;cursor:pointer}.zmy .wrap{max-width:30rem;margin:0 auto;padding:4px 0 40px}.zmy .bal{margin:14px;padding:16px;border-radius:22px;background:linear-gradient(155deg,#1380b8,#0b3d5c);color:#fff;box-shadow:0 10px 22px rgba(11,61,92,.25)}.zmy .bal .k{font:800 10.5px Inter,sans-serif;letter-spacing:.06em;color:#bfe3f5}.zmy .bal .v{font:900 34px/1.1 Inter,sans-serif;margin-top:6px}.zmy .bal .v small{font:700 13px Inter,sans-serif;color:#d8eefa}.zmy .bal .v.neg{color:#ffb4bf}.zmy .bal .row{display:flex;justify-content:space-between;margin-top:10px;font:700 12px Inter,sans-serif;color:#d8eefa}.zmy .bal .row b{color:#fff}.zmy .bar{height:8px;border-radius:4px;background:rgba(255,255,255,.2);margin-top:8px;overflow:hidden}.zmy .bar i{display:block;height:100%;background:#ffc44d;border-radius:4px}.zmy .btns{display:flex;gap:8px;margin:0 14px}.zmy .btns button{flex:1;padding:12px;border-radius:14px;border:0;font:800 13px Inter,sans-serif;cursor:pointer}.zmy .btns .s{background:linear-gradient(135deg,#0a70a8,#3fa7d6);color:#fff}.zmy .btns .g{background:#e6f7ee;color:#16653a;border:1px solid #9fdcb8}.zmy .btns .b{background:#eaf4fa;color:#0b5d8f}.zmy .sec{margin:18px 16px 6px;font:800 14px Inter,sans-serif;color:#0b3d5c;display:flex;justify-content:space-between;align-items:baseline}.zmy .sec small{font:700 11px Inter,sans-serif;color:#6a8796}.zmy .ch{margin:0 14px;padding:14px;border-radius:18px;background:#fff;border:1px solid #d7e8f2;display:flex;align-items:center;gap:14px}.zmy .donut{width:104px;height:104px;border-radius:50%;position:relative;flex:none}.zmy .donut::after{content:"";position:absolute;inset:22px;border-radius:50%;background:#fff}.zmy .donut b{position:absolute;inset:0;display:grid;place-items:center;z-index:1;font:900 14px Inter,sans-serif;color:#0b3d5c}.zmy .lg{flex:1;min-width:0}.zmy .lg div{display:flex;align-items:center;gap:7px;font:700 11.5px Inter,sans-serif;margin:5px 0}.zmy .lg i{width:10px;height:10px;border-radius:3px;flex:none}.zmy .lg em{font-style:normal;margin-left:auto;color:#6a8796;padding-left:8px}.zmy .tip{margin:10px 14px;padding:10px 12px;border-radius:14px;font:700 12px/1.45 Inter,sans-serif}.zmy .tip.g{background:#e6f7ee;border:1px solid #9fdcb8;color:#16653a}.zmy .tip.w{background:#fff8e8;border:1px solid #f6dca0;color:#7a5200}.zmy .empty{margin:10px 14px;padding:22px 14px;border-radius:16px;border:1.5px dashed #bcd6e6;text-align:center;font:700 12.5px/1.5 Inter,sans-serif;color:#6a8796}.zmy .zmi{min-height:0!important;height:auto!important;display:flex;align-items:center;gap:11px;margin:6px 14px;padding:10px 12px;border-radius:14px;background:#fff;border:1px solid #e1edf4}.zmy .zmi .zmic{width:38px;height:38px;border-radius:12px;display:grid;place-items:center;font-size:18px;flex:none;background:#eef6fb}.zmy .zmi .zmtx{min-width:0;flex:1}.zmy .zmi b{display:block;font:800 13px Inter,sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.zmy .zmi small{font:600 11px Inter,sans-serif;color:#6a8796}.zmy .zmi .zma{font:900 14px Inter,sans-serif;color:#c0392b;white-space:nowrap}.zmy .zmi .zma.p{color:#16653a}.zmy .zmi .del{margin-left:4px;border:0;background:none;color:#b8c7d0;font:800 15px Inter;cursor:pointer;padding:4px}.zmy .mo{margin:0 14px;display:flex;align-items:flex-end;gap:10px;height:130px;padding:12px;border-radius:18px;background:#fff;border:1px solid #d7e8f2}.zmy .mo div{flex:1;text-align:center;font:700 10px Inter,sans-serif;color:#6a8796}.zmy .mo i{display:block;margin:0 auto 4px;width:24px;border-radius:6px 6px 2px 2px;background:#9ec9e2;min-height:3px}.zmy .mo .c i{background:#1380b8}.zmy .mo span{display:block;font:800 9.5px Inter,sans-serif;color:#0b5d8f;margin-bottom:3px}.zmy .goal{margin:8px 14px;padding:14px;border-radius:18px;background:#fff;border:1px solid #d7e8f2}.zmy .goal .h{display:flex;align-items:center;gap:10px}.zmy .goal .h .e{font-size:28px}.zmy .goal .h b{display:block;font:800 14px Inter,sans-serif}.zmy .goal .h small{font:600 11px Inter,sans-serif;color:#6a8796}.zmy .goal .h .acts{margin-left:auto;display:flex;gap:6px}.zmy .goal .h .acts button{padding:7px 10px;border-radius:10px;border:0;background:#e6f7ee;color:#16653a;font:800 11px Inter,sans-serif;cursor:pointer}.zmy .goal .h .acts .x{background:#fdecee;color:#c0392b}.zmy .goal .gb{height:12px;border-radius:6px;background:#e6eef3;margin-top:12px;overflow:hidden}.zmy .goal .gb i{display:block;height:100%;border-radius:6px;background:linear-gradient(90deg,#25b46a,#7bd8a3)}.zmy .goal .r{display:flex;justify-content:space-between;margin-top:6px;font:800 12px Inter,sans-serif;color:#16653a}.zmy .goal .r span{color:#6a8796}.zmy .mnav{display:flex;align-items:center;justify-content:center;gap:12px;margin:10px 0 0}.zmy .mnav button{width:32px;height:32px;border-radius:50%;border:0;background:#eaf4fa;color:#0b5d8f;font:900 15px Inter;cursor:pointer}.zmy .mnav button:disabled{opacity:.35}.zmy .mnav span{font:800 12px Inter,sans-serif;color:#3c4d57;min-width:110px;text-align:center}' +
    '.zmy-bg{position:fixed;inset:0;z-index:2147483646;background:rgba(5,25,40,.5)}.zmy-sh{position:fixed;z-index:2147483647;left:50%;bottom:0;width:min(100%,26rem);transform:translateX(-50%);background:#fff;border-radius:24px 24px 0 0;padding:10px 18px 22px;font-family:Inter,"Noto Sans Malayalam",sans-serif;color:#1c2a32;box-shadow:0 -10px 30px rgba(0,0,0,.2)}.zmy-sh *{box-sizing:border-box}.zmy-sh .gr{width:40px;height:5px;border-radius:3px;background:#cfdbe3;margin:0 auto 12px}.zmy-sh h4{margin:0 0 10px;font:800 16px Inter,sans-serif;color:#0b3d5c}.zmy-sh .amt{display:flex;align-items:center;gap:6px;padding:8px 14px;border-radius:16px;border:2px solid #1380b8;background:#eef6fb}.zmy-sh .amt span{font:800 22px Inter;color:#6a8796}.zmy-sh .amt input{flex:1;min-width:0;border:0;background:transparent;font:900 28px Inter,sans-serif;color:#0b3d5c;padding:4px 0}.zmy-sh .amt input:focus,.zmy-sh .nt:focus{outline:none}.zmy-sh .cats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:12px 0}.zmy-sh .cats button{padding:9px 4px;border-radius:14px;border:1.5px solid #dbe9f2;background:#fff;text-align:center;font:700 11px Inter,sans-serif;color:#1c2a32;cursor:pointer}.zmy-sh .cats button i{display:block;font-style:normal;font-size:20px;margin-bottom:3px}.zmy-sh .cats .on{border-color:#1380b8;background:#eef6fb;color:#0b5d8f}.zmy-sh .nt{width:100%;padding:11px 12px;border-radius:12px;border:1.5px solid #cfe3ef;font:600 14px Inter,sans-serif;color:#1c2a32;margin:10px 0 12px}.zmy-sh .sv{width:100%;padding:13px;border-radius:14px;border:0;background:linear-gradient(135deg,#0a70a8,#3fa7d6);color:#fff;font:800 14px Inter,sans-serif;cursor:pointer}.zmy-sh .sv.g{background:linear-gradient(135deg,#1e9e5a,#3cc47c)}.zmy-sh .err{color:#c0392b;font:700 12px Inter,sans-serif;min-height:16px;margin-bottom:6px}.zmy-sh .ems{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0 2px}.zmy-sh .ems button{width:40px;height:40px;border-radius:12px;border:1.5px solid #dbe9f2;background:#fff;font-size:20px;cursor:pointer}.zmy-sh .ems .on{border-color:#1380b8;background:#eef6fb}.zmy-sh label{display:block;font:800 10px Inter,sans-serif;letter-spacing:.06em;color:#6a8796;margin:10px 0 5px}.zmy-sh .x{position:absolute;top:12px;right:14px;width:32px;height:32px;border-radius:50%;border:0;background:#eef3f6;font:700 16px Inter;color:#3c4d57;cursor:pointer}';
  document.head.appendChild(css);

  var el, view = { m: mk(new Date()) };
  function shell() {
    if (!el) { el = document.createElement("div"); el.className = "zmy"; el.setAttribute("role", "dialog"); document.body.appendChild(el); }
    el.innerHTML = '<div class="hd zhx"><button class="zx" aria-label="Close">✕</button><img class="zhimg" src="/img/hero/money.svg" alt=""><h2>Pocket Money</h2><p>Track spending, save for your goals</p></div><div class="wrap"></div>';
    el.querySelector(".hd button").onclick = close;
    requestAnimationFrame(function () { el.classList.add("on"); });
    document.documentElement.style.overflow = "hidden";
    return el.querySelector(".wrap");
  }
  function close() { if (!el) return; el.classList.remove("on"); document.documentElement.style.overflow = (window.ZestCornerRefresh && ZestCornerRefresh()) ? "hidden" : ""; }

  function sheet(html) {
    var bg = document.createElement("div"); bg.className = "zmy-bg";
    var s = document.createElement("div"); s.className = "zmy-sh"; s.innerHTML = '<button class="x" aria-label="Close">×</button><div class="gr"></div>' + html;
    document.body.appendChild(bg); document.body.appendChild(s);
    function c() { bg.remove(); s.remove(); }
    bg.onclick = c; s.querySelector(".x").onclick = c; s.close = c;
    return s;
  }

  function addTx(kind) {
    var out = kind === "out", sel = out ? "snacks" : null;
    var s = sheet('<h4>' + (out ? '＋ Money spent' : '＋ Got money') + '</h4><div class="amt"><span>₹</span><input id="zm-a" type="number" inputmode="decimal" min="1" placeholder="0"></div>' +
      (out ? '<div class="cats">' + CAT.filter(function (c) { return c[0] !== "savings"; }).map(function (c) { return '<button data-c="' + c[0] + '"' + (c[0] === sel ? ' class="on"' : '') + '><i>' + c[1] + '</i>' + c[2] + '</button>'; }).join("") + '</div>' : '') +
      '<input class="nt" id="zm-n" maxlength="40" placeholder="' + (out ? 'Note (optional) – e.g. juice' : 'From (optional)') + '"><div class="err" id="zm-e"></div><button class="sv' + (out ? '' : ' g') + '">Save</button>');
    s.querySelectorAll(".cats button").forEach(function (b) { b.onclick = function () { s.querySelectorAll(".cats button").forEach(function (x) { x.classList.remove("on"); }); b.classList.add("on"); sel = b.dataset.c; }; });
    setTimeout(function () { s.querySelector("#zm-a").focus(); }, 50);
    s.querySelector(".sv").onclick = function () {
      var a = Math.round(+s.querySelector("#zm-a").value * 100) / 100;
      if (!(a > 0) || a > 1000000) { s.querySelector("#zm-e").textContent = "Please enter the amount"; return; }
      var d = load(); d.tx.push({ id: Date.now().toString(36), k: out ? "out" : "in", a: a, c: out ? sel : "in", n: s.querySelector("#zm-n").value.trim(), ts: Date.now() });
      save(d); s.close(); view.m = mk(new Date()); render();
    };
  }

  function addGoal() {
    var EM = ["🎧", "📱", "🚲", "⚽", "📚", "👟", "🎮", "🎁", "⌚", "🎯"], em = EM[0];
    var s = sheet('<h4>🎯 New savings goal</h4><label>WHAT ARE YOU SAVING FOR?</label><input class="nt" id="zg-n" maxlength="30" placeholder="e.g. Headphones" style="margin:0"><div class="ems">' + EM.map(function (e, i) { return '<button data-e="' + e + '"' + (i ? '' : ' class="on"') + '>' + e + '</button>'; }).join("") + '</div><label>TARGET AMOUNT</label><div class="amt"><span>₹</span><input id="zg-a" type="number" inputmode="decimal" min="1" placeholder="1500"></div><div class="err" id="zg-e" style="margin-top:8px"></div><button class="sv g">Create goal</button>');
    s.querySelectorAll(".ems button").forEach(function (b) { b.onclick = function () { s.querySelectorAll(".ems button").forEach(function (x) { x.classList.remove("on"); }); b.classList.add("on"); em = b.dataset.e; }; });
    s.querySelector(".sv").onclick = function () {
      var n = s.querySelector("#zg-n").value.trim(), a = Math.round(+s.querySelector("#zg-a").value);
      if (!n) { s.querySelector("#zg-e").textContent = "Please enter what you are saving for"; return; }
      if (!(a > 0)) { s.querySelector("#zg-e").textContent = "Please enter the target amount"; return; }
      var d = load(); d.goals.push({ id: Date.now().toString(36), n: n, e: em, t: a }); save(d); s.close(); render();
    };
  }
  function goalSaved(d, g) { return d.tx.filter(function (t) { return t.g === g.id; }).reduce(function (x, t) { return x + t.a; }, 0); }
  function addSave(g) {
    var s = sheet('<h4>' + esc(g.e) + ' Add to ' + esc(g.n) + '</h4><div class="amt"><span>₹</span><input id="zs-a" type="number" inputmode="decimal" min="1" placeholder="0"></div><div class="err" id="zs-e" style="margin-top:8px"></div><button class="sv g">Add to savings</button>');
    setTimeout(function () { s.querySelector("#zs-a").focus(); }, 50);
    s.querySelector(".sv").onclick = function () {
      var a = Math.round(+s.querySelector("#zs-a").value * 100) / 100;
      if (!(a > 0)) { s.querySelector("#zs-e").textContent = "Please enter the amount"; return; }
      var d = load(); d.tx.push({ id: Date.now().toString(36), k: "out", a: a, c: "savings", n: g.n, g: g.id, ts: Date.now() }); save(d); s.close(); render();
    };
  }

  function render() {
    var w = shell(), d = load(), cur = mk(new Date()), m = view.m;
    var mt = d.tx.filter(function (t) { return mk(t.ts) === m; });
    var got = mt.filter(function (t) { return t.k === "in"; }).reduce(function (a, t) { return a + t.a; }, 0);
    var spent = mt.filter(function (t) { return t.k === "out"; }).reduce(function (a, t) { return a + t.a; }, 0);
    var left = got - spent, yr = Math.floor(m / 12), mo = m % 12;
    var first = d.tx.length ? Math.min.apply(null, d.tx.map(function (t) { return mk(t.ts); })) : cur;
    var h = '<div class="bal"><div class="k">' + ML[mo] + ' ' + yr + '</div><div class="v' + (left < 0 ? ' neg' : '') + '">' + (left < 0 ? '−' : '') + rs(Math.abs(left)) + ' <small>' + (left < 0 ? 'over' : 'left') + '</small></div><div class="bar"><i style="width:' + (got > 0 ? Math.min(100, Math.round(spent * 100 / got)) : (spent > 0 ? 100 : 0)) + '%"></i></div><div class="row"><span>Got <b>' + rs(got) + '</b></span><span>Spent <b>' + rs(spent) + '</b></span></div>' +
      '<div class="mnav"><button id="zm-pv" aria-label="Previous month"' + (m <= first ? ' disabled' : '') + ' style="background:rgba(255,255,255,.18);color:#fff">‹</button><span style="color:#d8eefa">' + (m === cur ? 'This month' : MS[mo] + ' ' + yr) + '</span><button id="zm-nx" aria-label="Next month"' + (m >= cur ? ' disabled' : '') + ' style="background:rgba(255,255,255,.18);color:#fff">›</button></div></div>';
    if (m === cur) h += '<div class="btns"><button class="s" id="zm-out">＋ Spent</button><button class="g" id="zm-in">＋ Got money</button></div>';
    /* tips */
    if (m === cur && got > 0) {
      var now = new Date(), dleft = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate() - now.getDate();
      if (left <= 0) h += '<div class="tip w">⚠️ You have spent all your money this month' + (left < 0 ? ' (' + rs(-left) + ' extra)' : '') + '.</div>';
      else if (spent >= got * 0.8) h += '<div class="tip w">⚠️ Only ' + rs(left) + ' left for ' + dleft + ' day' + (dleft === 1 ? '' : 's') + '. Spend carefully.</div>';
    }
    /* chart */
    var by = {}; mt.filter(function (t) { return t.k === "out"; }).forEach(function (t) { by[t.c] = (by[t.c] || 0) + t.a; });
    var keys = Object.keys(by).sort(function (a, b) { return by[b] - by[a]; });
    h += '<div class="sec">Where it went <small>' + (m === cur ? 'This month' : MS[mo] + ' ' + yr) + '</small></div>';
    if (keys.length) {
      var acc = 0, stops = keys.map(function (k) { var s = acc; acc += by[k] * 100 / spent; return (CM[k] || CM.other)[3] + ' ' + s.toFixed(2) + '% ' + acc.toFixed(2) + '%'; }).join(",");
      h += '<div class="ch"><div class="donut" style="background:conic-gradient(' + stops + ')"><b>' + rs(spent) + '</b></div><div class="lg">' + keys.map(function (k) { var c = CM[k] || CM.other; return '<div><i style="background:' + c[3] + '"></i>' + c[1] + ' ' + c[2] + '<em>' + rs(by[k]) + '</em></div>'; }).join("") + '</div></div>';
      if (m === cur) {
        var wk = function (o) { var e = Date.now() - o * 7 * 864e5, s = e - 7 * 864e5; return d.tx.filter(function (t) { return t.k === "out" && t.c !== "savings" && t.ts > s && t.ts <= e; }).reduce(function (a, t) { return a + t.a; }, 0); };
        var a = wk(0), b = wk(1);
        if (b > 0 && a < b) h += '<div class="tip g">👏 You spent ' + rs(b - a) + ' less than last week</div>';
        else if (keys[0] && keys[0] !== "savings" && spent > 0) h += '<div class="tip g">' + (CM[keys[0]] || CM.other)[1] + ' ' + (CM[keys[0]] || CM.other)[2] + ' was your top spend this month</div>';
      }
    } else h += '<div class="empty">No spending added' + (m === cur ? ' yet.<br>Tap <b>＋ Spent</b> when you spend money.' : ' this month.') + '</div>';
    /* goals */
    h += '<div class="sec">Savings goals <small></small></div>';
    h += d.goals.length ? d.goals.map(function (g) {
      var sv = goalSaved(d, g), pc = Math.min(100, Math.round(sv * 100 / g.t)), done = sv >= g.t;
      return '<div class="goal"><div class="h"><span class="e">' + esc(g.e) + '</span><span><b>' + esc(g.n) + '</b><small>Target ' + rs(g.t) + '</small></span><span class="acts">' + (done ? '' : '<button data-add="' + g.id + '">＋ Add</button>') + '<button class="x" data-rm="' + g.id + '" aria-label="Delete goal">✕</button></span></div><div class="gb"><i style="width:' + pc + '%"></i></div><div class="r">' + (done ? '🎉 Goal reached!' : rs(sv) + ' saved') + ' <span>' + (done ? rs(sv) : rs(g.t - sv) + ' to go') + '</span></div></div>';
    }).join("") : '<div class="empty">Saving for something? Make a goal and watch it grow 🎯</div>';
    h += '<div class="btns" style="margin-top:8px"><button class="b" id="zm-goal">＋ New goal</button></div>';
    /* history */
    var hist = mt.slice().sort(function (a, b) { return b.ts - a.ts; });
    h += '<div class="sec">History <small>' + MS[mo] + ' ' + yr + '</small></div>';
    h += hist.length ? hist.map(function (t) {
      var c = t.k === "in" ? ["in", "💵", "Got money"] : (CM[t.c] || CM.other);
      return '<div class="zmi"><span class="zmic">' + c[1] + '</span><span class="zmtx"><b>' + c[2] + (t.n ? ' · ' + esc(t.n) : '') + '</b><small>' + when(t.ts) + '</small></span><span class="zma' + (t.k === "in" ? ' p' : '') + '">' + (t.k === "in" ? '+ ' : '− ') + rs(t.a) + '</span><button class="del" data-del="' + t.id + '" aria-label="Delete">✕</button></div>';
    }).join("") : '<div class="empty">Nothing here yet.</div>';
    /* last 4 months */
    var months = [cur - 3, cur - 2, cur - 1, cur], vals = months.map(function (x) { return d.tx.filter(function (t) { return t.k === "out" && mk(t.ts) === x; }).reduce(function (a, t) { return a + t.a; }, 0); }), mx = Math.max.apply(null, vals) || 1;
    if (vals.some(function (v) { return v > 0; })) h += '<div class="sec">Last 4 months <small>Spent</small></div><div class="mo">' + months.map(function (x, i) { return '<div' + (x === cur ? ' class="c"' : '') + '><span>' + (vals[i] ? rs(vals[i]) : '') + '</span><i style="height:' + Math.round(vals[i] * 80 / mx) + 'px"></i>' + MS[x % 12] + '</div>'; }).join("") + '</div>';
    w.innerHTML = h;
    w.insertAdjacentHTML('beforeend', '<p class="zpvn" style="margin:18px 12px 8px;padding:10px 12px;border-radius:12px;background:#eef6fb;color:#3c5566;font:600 11.5px/1.5 Inter,\'Noto Sans Malayalam\',sans-serif;text-align:center">🔒 Your details are saved only on this phone. ZEST does not store them anywhere.</p>');
    var q = function (s) { return w.querySelector(s); };
    if (q("#zm-out")) q("#zm-out").onclick = function () { addTx("out"); };
    if (q("#zm-in")) q("#zm-in").onclick = function () { addTx("in"); };
    q("#zm-goal").onclick = addGoal;
    q("#zm-pv").onclick = function () { view.m--; render(); };
    q("#zm-nx").onclick = function () { view.m++; render(); };
    w.querySelectorAll("[data-add]").forEach(function (b) { b.onclick = function () { var g = load().goals.filter(function (x) { return x.id === b.dataset.add; })[0]; if (g) addSave(g); }; });
    w.querySelectorAll("[data-rm]").forEach(function (b) { b.onclick = function () { if (!confirm("Delete this goal? Money added stays in history.")) return; var dd = load(); dd.goals = dd.goals.filter(function (x) { return x.id !== b.dataset.rm; }); save(dd); render(); }; });
    w.querySelectorAll("[data-del]").forEach(function (b) { b.onclick = function () { if (!confirm("Delete this entry?")) return; var dd = load(); dd.tx = dd.tx.filter(function (x) { return x.id !== b.dataset.del; }); save(dd); var y = el.scrollTop; render(); el.scrollTop = y; }; });
  }

  window.ZestMoney = { open: function () { view.m = mk(new Date()); render(); }, close: close };
})();
