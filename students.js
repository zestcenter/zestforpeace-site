/* ZEST Students Corner – Revision Planner (data stays on this phone) */
(function () {
  if (window.ZestRev) return;
  var KEY = "zestRevPlan";
  var DAY = 864e5;
  function load() { try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) { return null; } }
  function save(p) { try { localStorage.setItem(KEY, JSON.stringify(p)); } catch (e) {} }
  function d0(d) { var x = new Date(d); x.setHours(0, 0, 0, 0); return x; }
  function iso(d) { d = new Date(d); return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }
  function parse(s) { var a = String(s).split("-"); return new Date(+a[0], a[1] - 1, +a[2]); }
  function esc(t) { return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  var MS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var WD = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  var COL = ["#f2a516", "#25b46a", "#3fa7d6", "#8e6be8", "#e8344e", "#0b5d8f", "#c2185b", "#00897b"];
  function fmt(d) { d = new Date(d); return d.getDate() + " " + MS[d.getMonth()]; }

  /* ---------- planning ---------- */
  // ordered list of chapters, subjects mixed, hard chapters = 2 units
  function items(p) {
    var lists = p.subjects.map(function (s, si) {
      var out = [];
      for (var c = 1; c <= s.n; c++) out.push({ id: si + "-" + c, s: si, c: c, u: s.hard.indexOf(c) >= 0 ? 2 : 1 });
      return out;
    });
    var all = [], k = 0, left = true;
    while (left) { left = false; lists.forEach(function (l) { if (l[k]) { all.push(l[k]); left = true; } }); k++; }
    return all;
  }
  function revDays(total) { return total > 21 ? 7 : total > 10 ? 3 : total > 4 ? 1 : 0; }
  // study days from `from` (inclusive) to the start of revision days
  function studyDays(p, from) {
    var exam = parse(p.date), total = Math.round((exam - d0(new Date())) / DAY), rv = revDays(total);
    var end = new Date(exam.getTime() - rv * DAY), out = [];
    for (var d = d0(from); d < end; d = new Date(d.getTime() + DAY)) if (p.off !== d.getDay()) out.push(new Date(d));
    return { days: out, rv: rv, revStart: end };
  }
  // assign remaining (not done) chapters to days starting today
  function schedule(p) {
    var today = d0(new Date());
    var todo = items(p).filter(function (it) { return !p.done[it.id] || p.done[it.id] === iso(today); });
    var sd = studyDays(p, today), cap = p.hours, units = todo.reduce(function (a, b) { return a + b.u; }, 0);
    var need = sd.days.length ? Math.ceil(units / sd.days.length) : units;
    var perDay = Math.max(cap, need);
    var map = {}, di = 0, used = 0;
    todo.forEach(function (it) {
      if (used + it.u > perDay && used > 0) { di++; used = 0; }
      var day = sd.days[Math.min(di, sd.days.length - 1)];
      var key = day ? iso(day) : iso(today);
      (map[key] = map[key] || []).push(it);
      used += it.u;
    });
    return { map: map, perDay: perDay, over: perDay > cap, sd: sd };
  }
  // original plan (made on creation) – used to show "behind"
  function baseline(p) {
    var sd = studyDays(p, parse(p.created)), all = items(p), out = {}, di = 0, used = 0;
    all.forEach(function (it) {
      if (used + it.u > p.hours && used > 0) { di++; used = 0; }
      var day = sd.days[Math.min(di, sd.days.length - 1)];
      out[it.id] = day ? iso(day) : p.created; used += it.u;
    });
    return out;
  }

  /* ---------- UI ---------- */
  var css = document.createElement("style");
  css.textContent = '.zrv{position:fixed;inset:0;z-index:2147483646;background:#f2f7fb;overflow:auto;font-family:Inter,"Noto Sans Malayalam",sans-serif;color:#1c2a32;transform:translateY(100%);transition:transform .3s ease}.zrv.on{transform:none}.zrv *{box-sizing:border-box}.zrv .hd{position:sticky;top:0;z-index:2;display:flex;align-items:center;justify-content:space-between;padding:14px 16px;background:#fff;box-shadow:0 2px 10px rgba(0,0,0,.05)}.zrv .hd b{font:800 18px Inter,sans-serif;color:#0b5d8f}.zrv .hd button{width:36px;height:36px;border-radius:50%;border:0;background:#eef3f6;font:700 17px Inter;color:#3c4d57;cursor:pointer}.zrv .wrap{max-width:30rem;margin:0 auto;padding:6px 0 40px}.zrv .bx{margin:14px;padding:14px;border-radius:18px;background:#fff;border:1px solid #d7e8f2}.zrv h5{margin:0 0 10px;font:800 13px Inter,sans-serif;color:#0b3d5c}.zrv label{display:block;font:800 10px Inter,sans-serif;letter-spacing:.06em;color:#6a8796;margin:8px 0 5px}.zrv input{width:100%;padding:11px 12px;border-radius:12px;border:1.5px solid #cfe3ef;font:700 14px Inter,sans-serif;color:#1c2a32;background:#fff}.zrv input:focus{outline:none;border-color:#1380b8}.zrv .row{display:flex;gap:8px}.zrv .row>*{flex:1}.zrv .sub{padding:10px;border-radius:14px;background:#f6fafd;border:1px solid #e1edf4;margin-bottom:8px;position:relative}.zrv .sub .x{position:absolute;top:6px;right:8px;border:0;background:none;font:800 16px Inter;color:#9db8c8;cursor:pointer}.zrv .add{width:100%;padding:11px;border-radius:12px;border:2px dashed #9ec9e2;background:none;font:800 13px Inter,sans-serif;color:#1380b8;cursor:pointer}.zrv .ch{display:flex;gap:8px;flex-wrap:wrap}.zrv .ch button{flex:1;min-width:58px;padding:10px 6px;border-radius:12px;border:1.5px solid #cfe3ef;background:#fff;font:800 12px Inter,sans-serif;color:#3c4d57;cursor:pointer}.zrv .ch button.on{border-color:#1380b8;background:#eef6fb;color:#0b5d8f}.zrv .go{display:block;width:calc(100% - 28px);margin:14px;padding:14px;border:0;border-radius:14px;background:linear-gradient(135deg,#0a70a8,#3fa7d6);color:#fff;font:800 15px Inter,sans-serif;cursor:pointer}.zrv .err{margin:0 14px;color:#c0392b;font:700 12px Inter,sans-serif}.zrv .big{margin:14px;padding:16px;border-radius:20px;background:linear-gradient(155deg,#1380b8,#0b3d5c);color:#fff}.zrv .big .k{font:800 10.5px Inter,sans-serif;letter-spacing:.06em;color:#bfe3f5}.zrv .big .v{font:900 30px/1.1 Inter,sans-serif;margin-top:6px}.zrv .big .v small{font:700 13px Inter,sans-serif;color:#d8eefa}.zrv .big .g{display:flex;gap:8px;margin-top:12px}.zrv .big .g div{flex:1;padding:9px 4px;border-radius:12px;background:rgba(255,255,255,.14);text-align:center}.zrv .big .g b{display:block;font:900 17px Inter,sans-serif}.zrv .big .g span{font:700 9.5px Inter,sans-serif;color:#d8eefa}.zrv .sec{margin:16px 16px 4px;font:800 14px Inter,sans-serif;color:#0b3d5c}.zrv .task{display:flex;align-items:center;gap:11px;margin:8px 14px;padding:12px;border-radius:14px;background:#fff;border:1px solid #d7e8f2;cursor:pointer}.zrv .task .ck{width:26px;height:26px;border-radius:8px;border:2px solid #9db8c8;flex:none;display:grid;place-items:center;font:900 14px Inter;color:#fff}.zrv .task.done .ck{background:#25b46a;border-color:#25b46a}.zrv .task.done b{text-decoration:line-through;color:#8a9ba5}.zrv .task b{display:block;font:800 14px Inter,sans-serif}.zrv .task small{font:600 11px Inter,sans-serif;color:#6a8796}.zrv .task .tg{margin-left:auto;padding:4px 8px;border-radius:999px;background:#fff4dc;color:#8a5a00;font:800 9.5px Inter,sans-serif;white-space:nowrap}.zrv .dot{width:8px;align-self:stretch;border-radius:4px;flex:none}.zrv .note{margin:12px 14px;padding:11px 12px;border-radius:14px;font:700 12px/1.45 Inter,sans-serif}.zrv .note.w{background:#fff8e8;border:1px solid #f6dca0;color:#7a5200}.zrv .note.g{background:#e6f7ee;border:1px solid #9fdcb8;color:#16653a}.zrv .wk{margin:6px 14px;display:grid;grid-template-columns:repeat(7,1fr);gap:5px}.zrv .wk div{padding:7px 0;border-radius:10px;background:#fff;border:1px solid #d7e8f2;text-align:center;font:800 9.5px Inter,sans-serif;color:#52636d}.zrv .wk div b{display:block;font:900 13px Inter,sans-serif;color:#1c2a32}.zrv .wk .ok{background:#e6f7ee;border-color:#9fdcb8}.zrv .wk .mis{background:#fdecee;border-color:#f3b5be}.zrv .wk .td{background:#1380b8;border-color:#1380b8;color:#fff}.zrv .wk .td b{color:#fff}.zrv .wk .off{opacity:.45}.zrv .pg{margin:10px 14px;padding:12px 14px;border-radius:16px;background:#fff;border:1px solid #d7e8f2}.zrv .pg .r{display:flex;align-items:center;gap:10px;margin:7px 0;font:700 12px Inter,sans-serif}.zrv .pg .r span{width:90px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.zrv .pg .bb{flex:1;height:8px;border-radius:4px;background:#e6eef3;overflow:hidden}.zrv .pg .bb i{display:block;height:100%;border-radius:4px}.zrv .pg em{font-style:normal;width:38px;text-align:right;color:#0b5d8f;font-weight:800}.zrv .lnk{display:flex;gap:8px;margin:16px 14px}.zrv .lnk button{flex:1;padding:11px;border-radius:12px;border:0;background:#eaf4fa;font:800 12px Inter,sans-serif;color:#0b5d8f;cursor:pointer}.zrv .lnk button.rd{background:#fdecee;color:#c0392b}.zrv .up{margin:4px 14px;padding:10px 12px;border-radius:12px;background:#fff;border:1px solid #e1edf4;display:flex;justify-content:space-between;font:700 12px Inter,sans-serif;color:#3c4d57}.zrv .up b{color:#0b5d8f}';
  document.head.appendChild(css);

  var el;
  function shell(title) {
    if (!el) {
      el = document.createElement("div"); el.className = "zrv"; el.setAttribute("role", "dialog");
      document.body.appendChild(el);
    }
    el.innerHTML = '<div class="hd"><b>' + title + '</b><button aria-label="Close">✕</button></div><div class="wrap"></div>';
    el.querySelector(".hd button").onclick = close;
    requestAnimationFrame(function () { el.classList.add("on"); });
    document.documentElement.style.overflow = "hidden";
    return el.querySelector(".wrap");
  }
  function close() { if (!el) return; el.classList.remove("on"); document.documentElement.style.overflow = ""; }

  /* setup form */
  function setup(old) {
    var w = shell("📖 New revision plan");
    var p = old || { exam: "", date: "", subjects: [{ name: "", n: "", hardTxt: "" }], hours: 2, off: -1 };
    var subs = (p.subjects || []).map(function (s) { return { name: s.name, n: s.n, hardTxt: s.hardTxt != null ? s.hardTxt : (s.hard || []).join(", ") }; });
    if (!subs.length) subs.push({ name: "", n: "", hardTxt: "" });
    var minD = iso(new Date(Date.now() + 2 * DAY));
    function draw() {
      w.innerHTML =
        '<div class="bx"><h5>1 · Exam</h5><label>EXAM NAME</label><input id="rv-ex" placeholder="e.g. Plus Two Model Exam" value="' + esc(p.exam) + '"><label>EXAM DATE</label><input id="rv-dt" type="date" min="' + minD + '" value="' + esc(p.date) + '"></div>' +
        '<div class="bx"><h5>2 · Subjects & chapters</h5>' + subs.map(function (s, i) {
          return '<div class="sub" data-i="' + i + '">' + (subs.length > 1 ? '<button class="x" aria-label="Remove">✕</button>' : '') +
            '<div class="row"><div style="flex:2"><label>SUBJECT</label><input class="s-n" placeholder="e.g. Physics" value="' + esc(s.name) + '"></div><div><label>CHAPTERS</label><input class="s-c" type="number" inputmode="numeric" min="1" max="60" placeholder="14" value="' + esc(s.n) + '"></div></div>' +
            '<label>⭐ HARD CHAPTERS (optional)</label><input class="s-h" inputmode="numeric" placeholder="e.g. 3, 7, 11" value="' + esc(s.hardTxt) + '"></div>';
        }).join("") + '<button class="add" id="rv-add">＋ Add subject</button></div>' +
        '<div class="bx"><h5>3 · Study time per day</h5><div class="ch" id="rv-h">' + [1, 2, 3, 4].map(function (h) { return '<button data-h="' + h + '"' + (p.hours === h ? ' class="on"' : '') + '>' + h + (h > 1 ? ' hrs' : ' hr') + '</button>'; }).join("") + '</div><label style="margin-top:12px">DAY OFF (optional)</label><div class="ch" id="rv-o">' + [-1, 0, 5, 6].map(function (o) { return '<button data-o="' + o + '"' + (p.off === o ? ' class="on"' : '') + '>' + (o < 0 ? 'None' : ['Sunday', '', '', '', '', 'Friday', 'Saturday'][o]) + '</button>'; }).join("") + '</div></div>' +
        '<div class="err" id="rv-err"></div><button class="go" id="rv-go">✨ Make my plan</button>';
      function grab() {
        p.exam = w.querySelector("#rv-ex").value.trim(); p.date = w.querySelector("#rv-dt").value;
        w.querySelectorAll(".sub").forEach(function (b, i) { subs[i] = { name: b.querySelector(".s-n").value.trim(), n: b.querySelector(".s-c").value, hardTxt: b.querySelector(".s-h").value }; });
      }
      w.querySelector("#rv-add").onclick = function () { grab(); subs.push({ name: "", n: "", hardTxt: "" }); draw(); };
      w.querySelectorAll(".sub .x").forEach(function (b) { b.onclick = function () { grab(); subs.splice(+b.parentNode.dataset.i, 1); draw(); }; });
      w.querySelectorAll("#rv-h button").forEach(function (b) { b.onclick = function () { grab(); p.hours = +b.dataset.h; draw(); }; });
      w.querySelectorAll("#rv-o button").forEach(function (b) { b.onclick = function () { grab(); p.off = +b.dataset.o; draw(); }; });
      w.querySelector("#rv-go").onclick = function () {
        grab();
        var err = w.querySelector("#rv-err"), ok = subs.filter(function (s) { return s.name && +s.n > 0; });
        if (!p.exam) { err.textContent = "Please enter the exam name"; return; }
        if (!p.date || parse(p.date) <= d0(new Date())) { err.textContent = "Please choose an exam date in the future"; return; }
        if (!ok.length) { err.textContent = "Add at least one subject with number of chapters"; return; }
        var plan = {
          exam: p.exam, date: p.date, hours: p.hours, off: p.off, created: iso(new Date()), done: (old && old.done) || {},
          subjects: ok.map(function (s) { var n = Math.min(60, Math.max(1, Math.round(+s.n))); return { name: s.name, n: n, hard: String(s.hardTxt || "").split(/[^0-9]+/).map(Number).filter(function (x) { return x >= 1 && x <= n; }) }; })
        };
        save(plan); view(true);
      };
    }
    draw();
  }

  /* plan view */
  function view(fresh) {
    var p = load(); if (!p) { setup(); return; }
    var w = shell("📖 Revision Planner");
    var today = d0(new Date()), exam = parse(p.date), left = Math.round((exam - today) / DAY);
    var all = items(p), doneN = all.filter(function (it) { return p.done[it.id]; }).length;
    var sc = schedule(p), base = baseline(p), tk = iso(today);
    var todays = sc.map[tk] || [];
    var inRev = today >= sc.sd.revStart && left > 0;
    var behind = all.filter(function (it) { return !p.done[it.id] && base[it.id] < tk; }).length;
    var h = '';
    if (left < 0) {
      h += '<div class="big"><div class="k">' + esc(p.exam).toUpperCase() + '</div><div class="v">Exam is over 🎉</div></div><div class="note g">You finished ' + doneN + ' of ' + all.length + ' chapters. Make a new plan for your next exam.</div>';
    } else {
      h += '<div class="big"><div class="k">' + esc(p.exam).toUpperCase() + ' · ' + fmt(exam).toUpperCase() + '</div><div class="v">' + (left === 0 ? 'Exam today' : left + (left === 1 ? ' day' : ' days') + ' <small>left</small>') + '</div><div class="g"><div><b>' + doneN + '/' + all.length + '</b><span>CHAPTERS DONE</span></div><div><b>' + sc.perDay + '</b><span>' + (sc.perDay > 1 ? 'CHAPTERS' : 'CHAPTER') + ' / DAY</span></div><div><b>' + sc.sd.rv + '</b><span>REVISION DAYS</span></div></div></div>';
      if (fresh) h += '<div class="note g">✓ Your plan is ready. Hard chapters get more time, subjects are mixed each day' + (sc.sd.rv ? ', and the last ' + sc.sd.rv + ' days are for full revision' : '') + '.</div>';
      if (behind > 0 && !fresh) h += '<div class="note w">⚠️ You are ' + behind + ' chapter' + (behind > 1 ? 's' : '') + ' behind. <b>Plan updated ✓</b> – the rest is spread over the coming days.</div>';
      if (sc.over) h += '<div class="note w">To finish on time you need about <b>' + sc.perDay + ' chapters a day</b>. Try to study a little extra.</div>';
      if (inRev || left === 0) {
        h += '<div class="sec">Today: full revision 🔁</div>' + p.subjects.map(function (s, si) { return '<div class="task"><span class="dot" style="background:' + COL[si % COL.length] + '"></span><span><b>' + esc(s.name) + '</b><small>Revise all chapters' + (s.hard.length ? ' · focus on ⭐ ' + s.hard.join(", ") : '') + '</small></span></div>'; }).join("");
      } else if (p.off === today.getDay()) {
        h += '<div class="note g">😌 Today is your day off. Rest well!</div>';
      } else {
        h += '<div class="sec">Today · ' + fmt(today) + '</div>';
        h += todays.length ? todays.map(function (it) {
          var s = p.subjects[it.s], d = !!p.done[it.id];
          return '<div class="task' + (d ? ' done' : '') + '" data-id="' + it.id + '"><span class="ck">' + (d ? '✓' : '') + '</span><span class="dot" style="background:' + COL[it.s % COL.length] + '"></span><span><b>' + esc(s.name) + ' · Ch. ' + it.c + '</b><small>About ' + (it.u > 1 ? '2 hrs' : '1 hr') + '</small></span>' + (it.u > 1 ? '<span class="tg">⭐ HARD</span>' : '') + '</div>';
        }).join("") : '<div class="note g">🎉 All chapters are done. Use the time for revision!</div>';
      }
      /* week strip */
      h += '<div class="sec">This week</div><div class="wk">';
      for (var k = -6; k <= 0; k++) {
        var d = new Date(today.getTime() + k * DAY), key = iso(d), cls = '';
        var didAny = Object.keys(p.done).some(function (id) { return p.done[id] === key; });
        var planned = Object.keys(base).some(function (id) { return base[id] === key; });
        if (k === 0) cls = 'td'; else if (p.off === d.getDay()) cls = 'off'; else if (didAny) cls = 'ok'; else if (planned && key >= p.created) cls = 'mis';
        h += '<div class="' + cls + '">' + (k === 0 ? 'TODAY' : WD[d.getDay()]) + '<b>' + d.getDate() + '</b></div>';
      }
      h += '</div>';
      /* progress */
      h += '<div class="pg">' + p.subjects.map(function (s, si) {
        var dn = all.filter(function (it) { return it.s === si && p.done[it.id]; }).length, pc = Math.round(dn * 100 / s.n);
        return '<div class="r"><span>' + esc(s.name) + '</span><div class="bb"><i style="width:' + pc + '%;background:' + COL[si % COL.length] + '"></i></div><em>' + pc + '%</em></div>';
      }).join("") + '</div>';
      /* coming up */
      var next = Object.keys(sc.map).filter(function (k) { return k > tk; }).sort().slice(0, 3);
      if (next.length) h += '<div class="sec">Coming up</div>' + next.map(function (k) { return '<div class="up"><span>' + WD[parse(k).getDay()] + ', ' + fmt(parse(k)) + '</span><b>' + sc.map[k].map(function (it) { return esc(p.subjects[it.s].name) + ' ' + it.c; }).join(" · ") + '</b></div>'; }).join("");
    }
    h += '<div class="lnk"><button id="rv-ed">✏️ Edit plan</button><button class="rd" id="rv-del">🗑 Delete plan</button></div>';
    w.innerHTML = h;
    w.querySelectorAll(".task[data-id]").forEach(function (t) {
      t.onclick = function () { var id = t.dataset.id; if (p.done[id]) delete p.done[id]; else p.done[id] = tk; save(p); var y = el.scrollTop; view(false); el.scrollTop = y; };
    });
    w.querySelector("#rv-ed").onclick = function () { setup(p); };
    w.querySelector("#rv-del").onclick = function () { if (confirm("Delete this revision plan?")) { try { localStorage.removeItem(KEY); } catch (e) {} setup(); } };
  }

  window.ZestRev = { open: function () { load() ? view(false) : setup(); }, close: close };
})();
