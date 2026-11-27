/* ZEST Students Corner – Revision Planner v2 (data stays on this phone) */
(function () {
  if (window.ZestRev) return;
  function KEYF() { return window.ZestPK ? ZestPK("zestRevPlan") : "zestRevPlan"; }
  var DAY = 864e5;
  function load() { try { return mig(JSON.parse(localStorage.getItem(KEYF()) || "null")); } catch (e) { return null; } }
  function save(p) { try { localStorage.setItem(KEYF(), JSON.stringify(p)); } catch (e) {} }
  function d0(d) { var x = new Date(d); x.setHours(0, 0, 0, 0); return x; }
  function iso(d) { d = new Date(d); return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }
  function parse(s) { var a = String(s).split("-"); return new Date(+a[0], a[1] - 1, +a[2]); }
  function add(k, n) { return iso(new Date(parse(k).getTime() + n * DAY + 3 * 36e5)); }
  function esc(t) { return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  var MS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var WD = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  var DN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var COL = ["#f2a516", "#25b46a", "#1380b8", "#8e6be8", "#e8344e", "#0b5d8f", "#c2185b", "#00897b"];
  function fmt(d) { d = new Date(d); return d.getDate() + " " + MS[d.getMonth()]; }
  function fmtW(k) { var d = parse(k); return DN[d.getDay()].slice(0, 3) + ", " + fmt(d); }
  function todayK() { return iso(new Date()); }
  function dd(a, b) { return Math.round((parse(b) - parse(a)) / DAY); }

  /* old plans (one exam date, hard list) → v2 (date per subject, important + tough) */
  function mig(p) {
    if (!p) return p;
    if (p.v !== 2) {
      p.v = 2;
      p.subjects = (p.subjects || []).map(function (s) { return { name: s.name, n: s.n, date: s.date || p.date, imp: s.imp || [], hard: s.hard || [] }; });
    }
    p.done = p.done || {}; p.part = p.part || {}; p.skip = p.skip || {}; p.pull = p.pull || {}; p.notes = p.notes || [];
    return p;
  }
  function stuName() { try { var d = JSON.parse(localStorage.getItem("zestProfiles") || "null"); if (d && d.list) { var c = d.list.filter(function (x) { return x.id === d.cur; })[0]; if (c && c.n) return c.n; } } catch (e) {} return ""; }

  /* ---------- planning ---------- */
  function allItems(p) {
    var out = [];
    p.subjects.forEach(function (s, si) { for (var c = 1; c <= s.n; c++) out.push({ id: si + "-" + c, s: si, c: c, u: s.hard.indexOf(c) >= 0 ? 2 : 1, imp: s.imp.indexOf(c) >= 0, hard: s.hard.indexOf(c) >= 0 }); });
    return out;
  }
  function revDay(s) { return add(s.date, -1); }
  /* day-by-day plan from today: each subject must finish before the day before its own exam (that day = revision) */
  function schedule(p) {
    var tk = todayK(), items = allItems(p), map = {}, over = false;
    var pend = {};
    items.forEach(function (it) {
      if (p.done[it.id]) return;
      if (p.subjects[it.s].date <= tk) return;
      var u = p.part[it.id] ? 1 : it.u;
      (pend[it.s] = pend[it.s] || []).push({ it: it, u: u, rest: !!p.part[it.id] });
    });
    var last = p.subjects.reduce(function (m, s) { return s.date > m ? s.date : m; }, tk);
    function studyDaysLeft(si, from) { var s = p.subjects[si], n = 0; for (var k = from; k < revDay(s); k = add(k, 1)) if (p.off !== parse(k).getDay() && !isRev(k)) n++; return n; }
    function isRev(k) { return p.subjects.some(function (s) { return revDay(s) === k && s.date > tk; }); }
    function isExam(k) { return p.subjects.filter(function (s) { return s.date === k; }); }
    for (var k = tk; k < last; k = add(k, 1)) {
      var day = map[k] = { items: [], rev: [], exam: isExam(k), off: false };
      p.subjects.forEach(function (s, si) { if (revDay(s) === k && s.date > tk) day.rev.push(si); });
      if (day.rev.length) continue;
      if (p.off === parse(k).getDay()) { day.off = true; continue; }
      var cap = p.hours;
      if (k === tk) {
        items.forEach(function (it) { if (p.done[it.id] === tk) cap -= p.part[it.id] ? 1 : it.u; else if (p.part[it.id] && p.part[it.id].d === tk) cap -= 0.5; });
        (p.pull[tk] || []).forEach(function (id) {
          Object.keys(pend).forEach(function (si) { pend[si] = pend[si].filter(function (x) { if (x.it.id === id) { day.items.push(x); cap -= x.u; return false; } return true; }); });
        });
      }
      var guard = 0;
      while (cap > 0 && guard++ < 50) {
        var best = -1, bu = -1;
        Object.keys(pend).forEach(function (si) {
          if (!pend[si].length || revDay(p.subjects[si]) <= k) return;
          var q = pend[si].filter(function (x) { return !(k === tk && (p.skip[x.it.id] === tk || (p.part[x.it.id] && p.part[x.it.id].d === tk))); });
          if (!q.length) return;
          var units = pend[si].reduce(function (a, x) { return a + x.u; }, 0), dl = Math.max(1, studyDaysLeft(+si, k));
          var urg = units / dl;
          if (urg > bu) { bu = urg; best = si; }
        });
        if (best < 0) break;
        var idx = pend[best].findIndex(function (x) { return !(k === tk && (p.skip[x.it.id] === tk || (p.part[x.it.id] && p.part[x.it.id].d === tk))); });
        var x = pend[best].splice(idx, 1)[0];
        day.items.push(x); cap -= x.u;
      }
    }
    /* anything that did not fit: squeeze into the last study day before that subject's revision */
    Object.keys(pend).forEach(function (si) {
      pend[si].forEach(function (x) {
        over = true;
        var k = add(revDay(p.subjects[si]), -1); if (k < tk) k = tk;
        (map[k] = map[k] || { items: [], rev: [], exam: [], off: false }).items.push(x);
      });
    });
    return { map: map, over: over };
  }
  function streak(p) {
    var days = {}; Object.keys(p.done).forEach(function (id) { days[p.done[id]] = 1; }); Object.keys(p.part).forEach(function (id) { days[p.part[id].d] = 1; });
    var k = todayK(), n = 0; if (!days[k]) k = add(k, -1);
    while (days[k] || (p.off === parse(k).getDay() && n)) { if (days[k]) n++; k = add(k, -1); if (n > 400) break; }
    return n;
  }

  /* ---------- UI ---------- */
  var css = document.createElement("style");
  css.textContent = '.zrv{position:fixed;inset:0;z-index:2147483646;background:#f2f7fb;overflow:auto;font-family:Inter,"Noto Sans Malayalam",sans-serif;color:#1c2a32;transform:translateY(100%);transition:transform .3s ease}.zrv.on{transform:none}.zrv *{box-sizing:border-box}.zrv .hd.zhx{position:relative;display:block;padding:34px 22px 24px;background:linear-gradient(160deg,#0b3d5c,#1380b8 65%,#3fa7d6);color:#fff;border-radius:0 0 28px 28px;text-align:center;overflow:hidden;box-shadow:none}.zrv .hd.zhx::after{content:"";position:absolute;right:-50px;top:-50px;width:170px;height:170px;border-radius:50%;background:rgba(255,255,255,.08)}.zrv .hd.zhx .zhimg{position:relative;z-index:1;display:block;width:86%;max-width:360px;height:auto;aspect-ratio:780/320;margin:30px auto 0;border-radius:20px;box-shadow:0 10px 24px rgba(0,0,0,.25);border:3px solid rgba(255,255,255,.6);background:#e6f3fb}.zrv .hd.zhx h2{margin:12px 0 4px;font:800 22px Inter,"Noto Sans Malayalam",sans-serif;color:#fff}.zrv .hd.zhx p{margin:0;font:600 12.5px Inter,"Noto Sans Malayalam",sans-serif;color:#cfe6f5}.zrv .hd.zhx .zx{position:absolute;right:14px;top:14px;z-index:2;width:38px;height:38px;border-radius:50%;border:0;background:rgba(255,255,255,.16);color:#fff;font:700 17px Inter,sans-serif;cursor:pointer}.zrv .hd.zhx .zsecx{position:absolute;left:16px;top:18px;z-index:3;margin:0;width:auto;height:auto;border-radius:10px;background:#e3f2fb;color:#0b5d8f;font:800 11.5px/1 Inter,sans-serif;box-shadow:0 2px 6px rgba(0,0,0,.12)}.zrv .hd{position:sticky;top:0;z-index:2;display:flex;align-items:center;justify-content:space-between;padding:14px 16px;background:#fff;box-shadow:0 2px 10px rgba(0,0,0,.05)}.zrv .hd b{font:800 18px Inter,sans-serif;color:#0b5d8f}.zrv .hd button{width:36px;height:36px;border-radius:50%;border:0;background:#eef3f6;font:700 17px Inter;color:#3c4d57;cursor:pointer}.zrv .wrap{max-width:30rem;margin:0 auto;padding:6px 0 40px}.zrv .bx{margin:14px;padding:14px;border-radius:18px;background:#fff;border:1px solid #d7e8f2}.zrv h5{margin:0 0 10px;font:800 13px Inter,sans-serif;color:#0b3d5c}.zrv label{display:block;font:800 10px Inter,sans-serif;letter-spacing:.06em;color:#6a8796;margin:8px 0 5px}.zrv input{width:100%;padding:11px 12px;border-radius:12px;border:1.5px solid #cfe3ef;font:700 14px Inter,sans-serif;color:#1c2a32;background:#fff}.zrv input:focus{outline:none;border-color:#1380b8}.zrv .row{display:flex;gap:8px}.zrv .row>*{flex:1}.zrv .sub{padding:10px;border-radius:14px;background:#f6fafd;border:1px solid #e1edf4;margin-bottom:8px;position:relative}.zrv .sub .x{position:absolute;top:6px;right:8px;border:0;background:none;font:800 16px Inter;color:#9db8c8;cursor:pointer}.zrv .add{width:100%;padding:11px;border-radius:12px;border:2px dashed #9ec9e2;background:none;font:800 13px Inter,sans-serif;color:#1380b8;cursor:pointer}.zrv .ch{display:grid;grid-template-columns:repeat(4,1fr);gap:7px}.zrv .ch button{min-width:0;padding:11px 2px;border-radius:12px;border:1.5px solid #cfe3ef;background:#fff;font:800 12px Inter,sans-serif;color:#3c4d57;cursor:pointer}.zrv .ch button.on{border-color:#1380b8;background:#eef6fb;color:#0b5d8f}.zrv .own{display:flex;align-items:center;gap:2px;min-width:0;padding:0;border-radius:12px;border:1.5px solid #cfe3ef;background:#fff}.zrv .own.on{border-color:#1380b8;background:#eef6fb}.zrv .own input,.zrv .own select{flex:1;min-width:0;width:100%;border:0;background:transparent;padding:10px 0 10px 9px;font:800 12px Inter,sans-serif;text-align:center;color:#1c2a32;-webkit-appearance:none;appearance:none}.zrv .own input:focus,.zrv .own select:focus{outline:none}.zrv .own span{padding-right:8px;font:800 10.5px Inter,sans-serif;color:#6a8796;white-space:nowrap}.zrv .go{display:block;width:calc(100% - 28px);margin:14px;padding:14px;border:0;border-radius:14px;background:linear-gradient(135deg,#0a70a8,#3fa7d6);color:#fff;font:800 15px Inter,sans-serif;cursor:pointer}.zrv .err{margin:0 14px;color:#c0392b;font:700 12px Inter,sans-serif}.zrv .big{margin:14px;padding:16px;border-radius:20px;background:linear-gradient(155deg,#1380b8,#0b3d5c);color:#fff}.zrv .big .k{font:800 10.5px Inter,sans-serif;letter-spacing:.06em;color:#bfe3f5}.zrv .big .v{font:900 30px/1.1 Inter,sans-serif;margin-top:6px}.zrv .big .v small{font:700 13px Inter,sans-serif;color:#d8eefa}.zrv .big .g{display:flex;gap:8px;margin-top:12px}.zrv .big .g div{flex:1;padding:9px 4px;border-radius:12px;background:rgba(255,255,255,.14);text-align:center}.zrv .big .g b{display:block;font:900 17px Inter,sans-serif}.zrv .big .g span{font:700 9.5px Inter,sans-serif;color:#d8eefa}.zrv .sec{margin:16px 16px 4px;font:800 14px Inter,sans-serif;color:#0b3d5c}.zrv .task{display:flex;align-items:center;gap:11px;margin:8px 14px;padding:12px;border-radius:14px;background:#fff;border:1px solid #d7e8f2;cursor:pointer}.zrv .task .ck{width:26px;height:26px;border-radius:8px;border:2px solid #9db8c8;flex:none;display:grid;place-items:center;font:900 14px Inter;color:#fff}.zrv .task.done .ck{background:#25b46a;border-color:#25b46a}.zrv .task.done b{text-decoration:line-through;color:#8a9ba5}.zrv .task b{display:block;font:800 14px Inter,sans-serif}.zrv .task small{font:600 11px Inter,sans-serif;color:#6a8796}.zrv .task .tg{margin-left:auto;padding:4px 8px;border-radius:999px;background:#fff4dc;color:#8a5a00;font:800 9.5px Inter,sans-serif;white-space:nowrap}.zrv .dot{width:8px;align-self:stretch;border-radius:4px;flex:none}.zrv .note{margin:12px 14px;padding:11px 12px;border-radius:14px;font:700 12px/1.45 Inter,sans-serif}.zrv .note.w{background:#fff8e8;border:1px solid #f6dca0;color:#7a5200}.zrv .note.g{background:#e6f7ee;border:1px solid #9fdcb8;color:#16653a}.zrv .wk{margin:6px 14px;display:grid;grid-template-columns:repeat(7,1fr);gap:5px}.zrv .wk div{padding:7px 0;border-radius:10px;background:#fff;border:1px solid #d7e8f2;text-align:center;font:800 9.5px Inter,sans-serif;color:#52636d}.zrv .wk div b{display:block;font:900 13px Inter,sans-serif;color:#1c2a32}.zrv .wk .ok{background:#e6f7ee;border-color:#9fdcb8}.zrv .wk .mis{background:#fdecee;border-color:#f3b5be}.zrv .wk .td{background:#1380b8;border-color:#1380b8;color:#fff}.zrv .wk .td b{color:#fff}.zrv .wk .off{opacity:.45}.zrv .pg{margin:10px 14px;padding:12px 14px;border-radius:16px;background:#fff;border:1px solid #d7e8f2}.zrv .pg .r{display:flex;align-items:center;gap:10px;margin:7px 0;font:700 12px Inter,sans-serif}.zrv .pg .r span{width:90px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.zrv .pg .bb{flex:1;height:8px;border-radius:4px;background:#e6eef3;overflow:hidden}.zrv .pg .bb i{display:block;height:100%;border-radius:4px}.zrv .pg em{font-style:normal;width:38px;text-align:right;color:#0b5d8f;font-weight:800}.zrv .lnk{display:flex;gap:8px;margin:16px 14px}.zrv .lnk button{flex:1;padding:11px;border-radius:12px;border:0;background:#eaf4fa;font:800 12px Inter,sans-serif;color:#0b5d8f;cursor:pointer}.zrv .lnk button.rd{background:#fdecee;color:#c0392b}.zrv .up{margin:4px 14px;padding:10px 12px;border-radius:12px;background:#fff;border:1px solid #e1edf4;display:flex;justify-content:space-between;font:700 12px Inter,sans-serif;color:#3c4d57}.zrv .up b{color:#0b5d8f}' +
    '.zrv .rvh{position:relative;min-height:250px;border-radius:0 0 30px 30px;overflow:hidden;background:#dfeefa url(/img/hero/revision.svg) center/cover}.zrv .rvh:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(11,61,92,0) 0,rgba(11,61,92,.45) 35%,rgba(8,40,62,.95) 75%)}' +
    '.zrv .rvh .zx{position:absolute;top:14px;right:14px;z-index:2;width:38px;height:38px;border-radius:50%;border:0;background:rgba(11,61,92,.55);color:#fff;font:700 17px Inter,sans-serif;cursor:pointer}' +
    '.zrv .rvh .pf{position:absolute;top:14px;left:14px;z-index:2;display:flex;align-items:center;gap:8px;border:0;background:rgba(255,255,255,.92);border-radius:999px;padding:4px 12px 4px 4px;font:800 13px Inter,sans-serif;color:#0b3d5c;cursor:pointer}.zrv .rvh .pf i{font-style:normal;width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#1e90cf,#0b5d8f);color:#fff;display:grid;place-items:center;font-size:13px}' +
    '.zrv .rvh .in{position:relative;z-index:2;padding:118px 18px 16px;color:#fff}.zrv .rvh .hi{font:800 23px/1.25 Inter,"Noto Sans Malayalam",sans-serif}.zrv .rvh .ex{font:600 12.5px Inter,sans-serif;opacity:.92;margin-top:3px}' +
    '.zrv .rvh .ps{display:flex;gap:7px;margin-top:10px;flex-wrap:wrap}.zrv .rvh .ps span{background:rgba(255,255,255,.16);border-radius:12px;padding:6px 10px;font:700 11.5px Inter,sans-serif}.zrv .rvh .ps b{font-size:15px;margin-right:3px}' +
    '.zrv .rvh .pb{margin-top:10px;height:6px;border-radius:3px;background:rgba(255,255,255,.25)}.zrv .rvh .pb i{display:block;height:100%;border-radius:3px;background:linear-gradient(90deg,#f5b301,#3fa7d6)}' +
    '.zrv .s2{margin:18px 16px 8px;font:800 12px Inter,sans-serif;letter-spacing:.06em;color:#5d707c;display:flex;justify-content:space-between}.zrv .s2 em{font-style:normal;color:#1380b8}' +
    '.zrv .tt{display:flex;gap:8px;margin:0 16px;overflow-x:auto;padding-bottom:2px}.zrv .tt div{flex:1 0 96px;background:#fff;border-radius:14px;padding:10px;border:1px solid #e3edf3}.zrv .tt .nx{border:2px solid #f0a500}.zrv .tt .ov{opacity:.5}.zrv .tt small{display:block;font:800 10px Inter,sans-serif;color:#7a8b96}.zrv .tt .nx small{color:#b26a00}.zrv .tt b{display:block;font:800 14px Inter,sans-serif;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.zrv .tt span{font:700 11px Inter,sans-serif;color:#7a8b96}' +
    '.zrv .rvcd{display:block;overflow:visible;margin:14px 16px 0;background:#fff;border-radius:22px;padding:16px;border:1px solid #e3edf3;box-shadow:0 10px 24px -16px rgba(11,61,92,.35)}' +
    '.zrv .rvfc{display:flex;flex-direction:row;gap:14px;align-items:center}.zrv .rg{flex:none;width:112px;height:112px;border-radius:50%;display:grid;place-items:center;border:0;cursor:pointer;padding:0}.zrv .rg div{width:92px;height:92px;border-radius:50%;background:#fff;display:grid;place-items:center;text-align:center;font:800 22px Inter,sans-serif;color:#0b3d5c}.zrv .rg small{display:block;font:700 9.5px Inter,sans-serif;color:#7a8b96;margin-top:2px}' +
    '.zrv .rvfc .i{flex:1;min-width:0}.zrv .lb{font:800 10.5px Inter,sans-serif;letter-spacing:.07em;color:#1380b8}.zrv .rvfc h3{margin:4px 0 2px;font:800 18px Inter,sans-serif;color:#0b2a3d}.zrv .sm{font:600 11.5px Inter,sans-serif;color:#7a8b96}' +
    '.zrv .fb{display:flex;gap:6px;margin-top:10px}.zrv .fb button{flex:1;padding:9px 0;border-radius:12px;border:0;font:800 12px Inter,sans-serif;cursor:pointer}.zrv .fb .d{background:#e6f6ee;color:#1f8f5f}.zrv .fb .p{background:#fff4e0;color:#b26a00}.zrv .fb .n{background:#eef3f6;color:#5d707c}' +
    '.zrv .th{display:flex;justify-content:space-between;font:800 15px Inter,sans-serif}.zrv .th span{color:#1380b8;font-size:13px}' +
    '.zrv .bar{display:flex;height:42px;border-radius:14px;overflow:hidden;margin-top:12px;background:#eef3f6}.zrv .bar div{display:flex;align-items:center;justify-content:center;font:800 11px Inter,sans-serif;color:#fff;white-space:nowrap;overflow:hidden;min-width:0}.zrv .bar .r{background:repeating-linear-gradient(45deg,#fff4e0 0 6px,#fdebc8 6px 12px);color:#b26a00}' +
    '.zrv .bl{display:flex;justify-content:space-between;font:700 10.5px Inter,sans-serif;color:#7a8b96;margin-top:6px}' +
    '.zrv .it{display:flex;align-items:center;gap:10px;margin-top:10px;padding:11px;border-radius:14px;background:#f8fbfd;border:1px solid #e3edf3;cursor:pointer}.zrv .it .dt{width:10px;height:10px;border-radius:50%;flex:none}.zrv .it b{flex:1;min-width:0;font:800 13.5px Inter,sans-serif}.zrv .it small{display:block;font:600 11.5px Inter,sans-serif;color:#7a8b96;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
    '.zrv .tg2{display:flex;background:#eef3f6;border-radius:999px;padding:3px;flex:none}.zrv .tg2 span{padding:6px 9px;border-radius:999px;font:800 11px Inter,sans-serif;color:#7a8b96}.zrv .tg2 .o1{background:#1f8f5f;color:#fff}.zrv .tg2 .o2{background:#f0a500;color:#fff}' +
    '.zrv .sug{margin-top:12px;border-radius:16px;padding:12px;background:linear-gradient(135deg,#e6f5fd,#d3ebf9);border:1px dashed #1380b8;display:flex;align-items:center;gap:10px;cursor:pointer;width:100%;text-align:left;font-family:inherit}.zrv .sug b{flex:1;font:800 13px Inter,sans-serif;color:#0b3d5c}.zrv .sug small{display:block;font:600 11.5px Inter,sans-serif;color:#4a5f6c}.zrv .sug em{font-style:normal;font:800 22px Inter,sans-serif;color:#1380b8;width:40px;height:40px;border-radius:50%;background:#fff;display:grid;place-items:center;flex:none}' +
    '.zrv .nb{margin:14px 16px 0;display:flex;align-items:center;gap:12px;background:#fff;border-radius:18px;padding:12px 14px;border:1px solid #e3edf3;cursor:pointer;width:calc(100% - 32px);text-align:left;font-family:inherit}.zrv .nb .ic{width:40px;height:40px;border-radius:12px;background:#fff4e0;display:grid;place-items:center;font-size:20px;flex:none}.zrv .nb b{flex:1;font:800 14px Inter,sans-serif;color:#0b2a3d}.zrv .nb small{display:block;font:600 11.5px Inter,sans-serif;color:#7a8b96}.zrv .nb em{font-style:normal;font:800 12px Inter,sans-serif;color:#1380b8}' +
    '.zrv .flt{display:flex;gap:7px;margin:0 16px 4px;overflow-x:auto;padding-bottom:4px}.zrv .flt button{flex:none;padding:7px 12px;border-radius:999px;background:#fff;border:1px solid #e3edf3;font:800 12px Inter,sans-serif;color:#5d707c;cursor:pointer}.zrv .flt .on{background:#0b3d5c;color:#fff;border-color:#0b3d5c}' +
    '.zrv .rvcl{margin:0 16px}.zrv .rvcl .it{margin-top:7px;background:#fff}' +
    '.zrv .bg{font:800 10px Inter,sans-serif;padding:3px 7px;border-radius:999px;flex:none}.zrv .bg.ok{background:#e6f6ee;color:#1f8f5f}.zrv .bg.pt{background:#fff4e0;color:#b26a00}.zrv .bg.nd{background:#eef3f6;color:#7a8b96}' +
    '.zrv .days{display:flex;gap:8px;overflow-x:auto;margin:0 16px;padding-bottom:4px}.zrv .dc{flex:none;width:118px;background:#fff;border-radius:16px;padding:10px;border:1px solid #e3edf3}.zrv .dc.of{opacity:.55}.zrv .dc .w{font:800 11px Inter,sans-serif;color:#7a8b96}.zrv .dc .w b{font-size:18px;color:#0b2a3d;margin-left:4px}.zrv .dc .m{margin-top:8px;display:flex;flex-direction:column;gap:5px}.zrv .dc .m span{font:700 11.5px Inter,sans-serif;padding:5px 7px;border-radius:8px;background:#eef6fb;color:#0b5d8f}.zrv .dc .m .rs{background:#fff4e0;color:#8a5a00}.zrv .dc .m .rv{background:#efe9ff;color:#5b3fc4}.zrv .dc .m .xm{background:#fde8ec;color:#c8102e}.zrv .dc .m .of{background:#eef3f6;color:#5d707c}' +
    '.zrv .ovl{position:fixed;inset:0;z-index:5;background:rgba(11,42,61,.5);display:flex;align-items:flex-end}.zrv .sh{width:100%;max-height:92vh;overflow:auto;background:#fff;border-radius:26px 26px 0 0;padding:16px 18px 26px}.zrv .sh .gr{width:40px;height:5px;border-radius:3px;background:#d3e3ee;margin:0 auto 14px}.zrv .sh h3{margin:0;font:800 17px Inter,sans-serif}.zrv .sh p.q{margin:3px 0 14px;color:#7a8b96;font:600 12.5px Inter,sans-serif}' +
    '.zrv .op{display:flex;gap:12px;align-items:center;width:100%;padding:13px;border-radius:16px;border:1.5px solid #e3edf3;margin-bottom:10px;background:#fff;text-align:left;font:700 14px Inter,sans-serif;color:#0b2a3d;cursor:pointer}.zrv .op i{font-style:normal;width:34px;height:34px;border-radius:50%;display:grid;place-items:center;font-size:16px;flex:none}.zrv .op small{display:block;font:600 11.5px Inter,sans-serif;color:#7a8b96}.zrv .op.on{border-color:#f0a500;background:#fffaf0}.zrv .op.on1{border-color:#1f8f5f;background:#f0faf4}' +
    '.zrv .sh textarea{width:100%;min-height:64px;padding:11px;border-radius:12px;border:1.5px solid #f0dcb0;font:600 13.5px Inter,"Noto Sans Malayalam",sans-serif;color:#0b2a3d;resize:vertical}.zrv .qc{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0 12px}.zrv .qc button{padding:6px 10px;border-radius:999px;border:0;background:#fff4e0;color:#8a5a00;font:700 11.5px Inter,sans-serif;cursor:pointer}' +
    '.zrv .inb{margin:2px 0 12px;border:1.5px dashed #f0a500;border-radius:14px;padding:11px;background:#fffaf0}.zrv .inb div{font:800 12.5px Inter,sans-serif;color:#8a5a00;margin-bottom:6px}.zrv .inb textarea{border-color:#f0dcb0;min-height:52px}' +
    '.zrv .sv{display:block;width:100%;padding:13px;border-radius:999px;background:linear-gradient(135deg,#e6f5fd,#bfe3f6);color:#0b5d8f;font:800 15px Inter,sans-serif;border:1px solid #bfe3f6;cursor:pointer}' +
    '.zrv .ntb{display:flex;gap:8px;margin:14px 16px 0;overflow-x:auto}.zrv .ntb button{flex:none;padding:8px 14px;border-radius:999px;background:#fff;border:1px solid #e3edf3;font:800 12.5px Inter,sans-serif;color:#5d707c;cursor:pointer}.zrv .ntb .on{background:#0b3d5c;color:#fff;border-color:#0b3d5c}' +
    '.zrv .nch{margin:14px 16px 0}.zrv .nch h4{margin:0 0 8px;font:800 13px Inter,sans-serif;color:#5d707c;display:flex;align-items:center;gap:8px}.zrv .nt{position:relative;background:#fff;border-radius:16px;padding:12px 38px 12px 14px;margin-bottom:8px;border-left:4px solid #f0a500;font:600 13.5px/1.5 Inter,"Noto Sans Malayalam",sans-serif;box-shadow:0 4px 12px -8px rgba(11,61,92,.3);white-space:pre-wrap}.zrv .nt small{display:block;color:#9aa9b3;font-size:11px;font-weight:600;margin-top:4px}.zrv .nt button{position:absolute;right:8px;top:8px;border:0;background:none;color:#b8c7d1;font-size:15px;cursor:pointer}' +
    '.zrv .fab{position:fixed;right:18px;bottom:22px;z-index:3;padding:14px 18px;border:0;border-radius:999px;background:linear-gradient(135deg,#1e90cf,#0b5d8f);color:#fff;font:800 14px Inter,sans-serif;box-shadow:0 12px 24px -10px rgba(11,61,92,.6);cursor:pointer}' +
    '.zrv .nhd{background:linear-gradient(135deg,#0b3d5c,#1380b8);color:#fff;padding:18px 18px 16px;border-radius:0 0 26px 26px;display:flex;align-items:center;gap:10px}.zrv .nhd b{flex:1;font:800 17px Inter,sans-serif}.zrv .nhd small{display:block;font:600 12px Inter,sans-serif;opacity:.85}.zrv .nhd button{width:36px;height:36px;border-radius:50%;border:0;background:rgba(255,255,255,.16);color:#fff;font:700 16px Inter;cursor:pointer}' +
    '.zrv .chl{display:flex;flex-direction:column;gap:6px;margin-top:10px}.zrv .chr{display:flex;align-items:center;gap:6px;padding:7px 8px;border-radius:12px;background:#fff;border:1px solid #e3edf3}.zrv .chr .n{width:26px;height:26px;border-radius:8px;background:#e6f3fb;color:#0b5d8f;display:grid;place-items:center;font:800 12px Inter,sans-serif;flex:none}.zrv .chr b{flex:1;font:600 13px Inter,sans-serif;color:#33434d}' +
    '.zrv .tb2{padding:5px 9px;border-radius:999px;font:800 10.5px Inter,sans-serif;border:1.5px solid #e3edf3;color:#9aa9b3;background:#fff;cursor:pointer}.zrv .tb2.i.on{border-color:#1380b8;color:#0b5d8f;background:#e6f3fb}.zrv .tb2.h.on{border-color:#e0567a;color:#c8102e;background:#fde8ec}.zrv .lg2{margin-top:8px;font:600 11.5px Inter,sans-serif;color:#7a8b96}' +
    '.zrv .done-all{margin:14px 16px 0;padding:16px;border-radius:20px;background:#e6f7ee;border:1px solid #9fdcb8;color:#16653a;font:700 13.5px/1.5 Inter,sans-serif;text-align:center}';
  document.head.appendChild(css);

  var el, tick;
  function shell(title, sub) {
    if (!el) { el = document.createElement("div"); el.className = "zrv"; el.setAttribute("role", "dialog"); document.body.appendChild(el); }
    clearInterval(tick);
    el.innerHTML = '<div class="hd zhx"><button class="zx" aria-label="Close">✕</button><img class="zhimg" src="/img/hero/revision.svg" alt=""><h2>' + title + '</h2><p>' + (sub || "Plan what to study each day till the exam") + '</p></div><div class="wrap"></div>';
    el.querySelector(".hd .zx").onclick = close;
    open1();
    return el.querySelector(".wrap");
  }
  function open1() { requestAnimationFrame(function () { el.classList.add("on"); }); document.documentElement.style.overflow = "hidden"; }
  function close() { if (!el) return; clearInterval(tick); el.classList.remove("on"); document.documentElement.style.overflow = (window.ZestCornerRefresh && ZestCornerRefresh()) ? "hidden" : ""; }

  /* ---------- setup ---------- */
  function setup(old) {
    var w = shell("New revision plan", "Add each subject with its own exam date");
    var p = old ? JSON.parse(JSON.stringify(old)) : { exam: "", subjects: [{ name: "", n: "", date: "", imp: [], hard: [] }], hours: 2, off: -1 };
    var subs = p.subjects.map(function (s) { return { name: s.name, n: s.n, date: s.date || "", imp: (s.imp || []).slice(), hard: (s.hard || []).slice() }; });
    if (!subs.length) subs.push({ name: "", n: "", date: "", imp: [], hard: [] });
    var minD = iso(new Date(Date.now() + 2 * DAY));
    function chips(s, i) {
      var n = Math.min(60, Math.max(0, Math.round(+s.n || 0))); if (!n) return '';
      var h = '<div class="chl">';
      for (var c = 1; c <= n; c++) h += '<div class="chr"><span class="n">' + c + '</span><b>Ch. ' + c + '</b><button type="button" class="tb2 i' + (s.imp.indexOf(c) >= 0 ? ' on' : '') + '" data-s="' + i + '" data-c="' + c + '" data-k="imp">⭐ Important</button><button type="button" class="tb2 h' + (s.hard.indexOf(c) >= 0 ? ' on' : '') + '" data-s="' + i + '" data-c="' + c + '" data-k="hard">🔥 Tough</button></div>';
      return h + '</div><div class="lg2">🔥 Tough chapters get more time · ⭐ Important ones come again in revision</div>';
    }
    function draw() {
      w.innerHTML =
        '<div class="bx"><h5>1 · Exam</h5><label>EXAM NAME</label><input id="rv-ex" placeholder="e.g. SSLC Model Exam" value="' + esc(p.exam) + '"></div>' +
        '<div class="bx"><h5>2 · Subjects, exam dates & chapters</h5>' + subs.map(function (s, i) {
          return '<div class="sub" data-i="' + i + '">' + (subs.length > 1 ? '<button class="x" aria-label="Remove">✕</button>' : '') +
            '<div class="row"><div style="flex:2"><label>SUBJECT</label><input class="s-n" placeholder="e.g. Maths" value="' + esc(s.name) + '"></div><div><label>CHAPTERS</label><input class="s-c" type="number" inputmode="numeric" min="1" max="60" placeholder="6" value="' + esc(s.n) + '"></div></div>' +
            '<label>📅 EXAM DATE FOR THIS SUBJECT</label><input class="s-d" type="date" min="' + minD + '" value="' + esc(s.date) + '">' + chips(s, i) + '</div>';
        }).join("") + '<button class="add" id="rv-add">＋ Add subject</button></div>' +
        '<div class="bx"><h5>3 · Study time per day</h5><div class="ch" id="rv-h">' + [1, 2, 3].map(function (h) { return '<button data-h="' + h + '"' + (p.hours === h ? ' class="on"' : '') + '>' + h + (h > 1 ? ' hrs' : ' hr') + '</button>'; }).join("") + '<div class="own' + ([1, 2, 3].indexOf(p.hours) < 0 ? ' on' : '') + '"><input id="rv-hc" type="number" inputmode="numeric" min="1" max="12" placeholder="Other" value="' + ([1, 2, 3].indexOf(p.hours) < 0 ? p.hours : '') + '"><span>hrs</span></div></div>' +
        '<label style="margin-top:14px">DAY OFF (optional)</label><div class="ch" id="rv-o">' + [-1, 0, 6].map(function (o) { return '<button data-o="' + o + '"' + (p.off === o ? ' class="on"' : '') + '>' + (o < 0 ? 'None' : DN[o].slice(0, 3)) + '</button>'; }).join("") + '<div class="own' + ([1, 2, 3, 4, 5].indexOf(p.off) >= 0 ? ' on' : '') + '"><select id="rv-oc"><option value="">Other</option>' + [1, 2, 3, 4, 5].map(function (o) { return '<option value="' + o + '"' + (p.off === o ? ' selected' : '') + '>' + DN[o].slice(0, 3) + '</option>'; }).join("") + '</select><span>▾</span></div></div></div>' +
        '<div class="err" id="rv-err"></div><button class="go" id="rv-go">✨ Make my plan</button>';
      function grab() {
        p.exam = w.querySelector("#rv-ex").value.trim();
        w.querySelectorAll(".sub").forEach(function (b, i) { subs[i].name = b.querySelector(".s-n").value.trim(); subs[i].n = b.querySelector(".s-c").value; subs[i].date = b.querySelector(".s-d").value; });
      }
      w.querySelectorAll(".s-c").forEach(function (inp) { inp.onchange = function () { grab(); draw(); }; });
      w.querySelectorAll(".tb2").forEach(function (b) { b.onclick = function () { grab(); var s = subs[+b.dataset.s], a = s[b.dataset.k], c = +b.dataset.c, x = a.indexOf(c); if (x >= 0) a.splice(x, 1); else a.push(c); b.classList.toggle("on"); }; });
      w.querySelector("#rv-add").onclick = function () { grab(); subs.push({ name: "", n: "", date: "", imp: [], hard: [] }); draw(); };
      w.querySelectorAll(".sub .x").forEach(function (b) { b.onclick = function () { grab(); subs.splice(+b.parentNode.dataset.i, 1); draw(); }; });
      w.querySelectorAll("#rv-h button").forEach(function (b) { b.onclick = function () { grab(); p.hours = +b.dataset.h; draw(); }; });
      w.querySelectorAll("#rv-o button").forEach(function (b) { b.onclick = function () { grab(); p.off = +b.dataset.o; draw(); }; });
      var hc = w.querySelector("#rv-hc"); hc.oninput = function () { var v = Math.round(+hc.value); if (v >= 1 && v <= 12) { p.hours = v; w.querySelectorAll("#rv-h button").forEach(function (b) { b.classList.remove("on"); }); hc.parentNode.classList.add("on"); } };
      w.querySelector("#rv-oc").onchange = function () { grab(); var v = this.value; if (v !== "") p.off = +v; draw(); };
      w.querySelector("#rv-go").onclick = function () {
        grab();
        var err = w.querySelector("#rv-err"), tk = todayK();
        var ok = subs.filter(function (s) { return s.name && +s.n > 0; });
        if (!p.exam) { err.textContent = "Please enter the exam name"; return; }
        if (!ok.length) { err.textContent = "Add at least one subject with number of chapters"; return; }
        var bad = ok.filter(function (s) { return !s.date || s.date <= tk; })[0];
        if (bad) { err.textContent = "Please choose a future exam date for " + bad.name; return; }
        var plan = {
          v: 2, exam: p.exam, hours: p.hours, off: p.off, created: (old && old.created) || tk,
          done: (old && old.done) || {}, part: (old && old.part) || {}, skip: (old && old.skip) || {}, pull: (old && old.pull) || {}, notes: (old && old.notes) || [],
          subjects: ok.map(function (s) { var n = Math.min(60, Math.max(1, Math.round(+s.n))); function f(a) { return a.filter(function (x) { return x >= 1 && x <= n; }); } return { name: s.name, n: n, date: s.date, imp: f(s.imp), hard: f(s.hard) }; })
        };
        plan.date = plan.subjects.reduce(function (m, s) { return s.date > m ? s.date : m; }, "");
        save(plan); view(true);
      };
    }
    draw();
  }

  /* ---------- popup: done / partly / couldn't ---------- */
  function sheet(p, it, after) {
    var s = p.subjects[it.s], st = p.done[it.id] ? "d" : p.part[it.id] ? "p" : "", tk = todayK();
    var ov = document.createElement("div"); ov.className = "ovl";
    ov.innerHTML = '<div class="sh"><div class="gr"></div><h3>' + esc(s.name) + ' · Ch. ' + it.c + '</h3><p class="q">How much did you study?</p>' +
      '<button class="op' + (st === "d" ? ' on1' : '') + '" data-v="d"><i style="background:#e6f6ee">✓</i><div>Fully done<small>Chapter complete</small></div></button>' +
      '<button class="op' + (st === "p" ? ' on' : '') + '" data-v="p"><i style="background:#fff4e0">½</i><div>Partly done<small>The rest moves to the next day</small></div></button>' +
      '<div class="pw" style="display:' + (st === "p" ? 'block' : 'none') + '"><textarea class="pn" placeholder="What did you finish? e.g. Exercise 5.1 and 5.2">' + esc(p.part[it.id] ? p.part[it.id].note : "") + '</textarea><div class="qc"><button>About half</button><button>Theory only</button><button>Problems only</button></div></div>' +
      '<button class="op" data-v="n"><i style="background:#eef3f6">✗</i><div>Couldn\'t study today<small>Move this chapter to another day</small></div></button>' +
      '<div class="inb"><div>📒 Important note (optional)</div><textarea class="in2" placeholder="A formula, a point to remember…"></textarea></div>' +
      (st ? '<button class="op" data-v="u" style="justify-content:center;color:#7a8b96">↺ Mark as not studied</button>' : '') +
      '<button class="sv">Save</button></div>';
    var v = st;
    function pick(x) { v = x; ov.querySelectorAll(".op").forEach(function (b) { b.classList.remove("on", "on1"); if (b.dataset.v === x) b.classList.add(x === "d" ? "on1" : "on"); }); ov.querySelector(".pw").style.display = x === "p" ? "block" : "none"; }
    ov.querySelectorAll(".op").forEach(function (b) { b.onclick = function () { pick(b.dataset.v); }; });
    ov.querySelectorAll(".qc button").forEach(function (b) { b.onclick = function () { var t = ov.querySelector(".pn"); t.value = (t.value ? t.value + ", " : "") + b.textContent; }; });
    ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
    ov.querySelector(".sv").onclick = function () {
      if (v === "d") { p.done[it.id] = tk; }
      else if (v === "p") { delete p.done[it.id]; p.part[it.id] = { d: tk, note: ov.querySelector(".pn").value.trim() }; }
      else if (v === "n") { delete p.done[it.id]; p.skip[it.id] = tk; }
      else if (v === "u") { delete p.done[it.id]; delete p.part[it.id]; delete p.skip[it.id]; }
      var nt = ov.querySelector(".in2").value.trim(); if (nt) p.notes.push({ s: it.s, c: it.c, t: nt, d: tk });
      if (p.timer && p.timer.id === it.id && v && v !== "u") p.timer = null;
      save(p); ov.remove(); after();
    };
    el.appendChild(ov);
  }

  /* ---------- notes ---------- */
  function notes(p, tab) {
    clearInterval(tick);
    el.innerHTML = '<div class="nhd"><b>📒 Important notes<small>Read these before the exam – all in one place</small></b><button aria-label="Back">✕</button></div><div class="wrap"></div>';
    el.querySelector(".nhd button").onclick = function () { view(false); };
    var w = el.querySelector(".wrap");
    if (tab == null) tab = p.notes.length ? p.notes[p.notes.length - 1].s : "all";
    var cnt = p.subjects.map(function (s, si) { return p.notes.filter(function (n) { return n.s === si; }).length; });
    var h = '<div class="ntb">' + p.subjects.map(function (s, si) { return '<button data-t="' + si + '"' + (tab === si ? ' class="on"' : '') + '>' + esc(s.name) + ' · ' + cnt[si] + '</button>'; }).join("") + '<button data-t="all"' + (tab === "all" ? ' class="on"' : '') + '>All · ' + p.notes.length + '</button></div>';
    var list = p.notes.map(function (n, i) { n._i = i; return n; }).filter(function (n) { return tab === "all" || n.s === tab; });
    if (!list.length) h += '<div class="note g" style="margin:16px">No notes yet. While studying, write important points here – formulas, dates, things to remember.</div>';
    var groups = {}; list.forEach(function (n) { var k = n.s + "-" + n.c; (groups[k] = groups[k] || []).push(n); });
    Object.keys(groups).sort(function (a, b) { var x = a.split("-"), y = b.split("-"); return x[0] - y[0] || y[1] - x[1]; }).forEach(function (k) {
      var g = groups[k], s = p.subjects[g[0].s];
      h += '<div class="nch"><h4><span class="dt" style="width:9px;height:9px;border-radius:50%;background:' + COL[g[0].s % COL.length] + '"></span>' + esc(s ? s.name : "") + ' · Ch. ' + g[0].c + '</h4>' + g.map(function (n) { return '<div class="nt">' + esc(n.t) + '<small>' + fmt(parse(n.d)) + '</small><button data-i="' + n._i + '" aria-label="Delete">🗑</button></div>'; }).join("") + '</div>';
    });
    w.innerHTML = h + '<div style="height:90px"></div>';
    el.insertAdjacentHTML("beforeend", '<button class="fab">＋ Add note</button>');
    w.querySelectorAll(".ntb button").forEach(function (b) { b.onclick = function () { notes(p, b.dataset.t === "all" ? "all" : +b.dataset.t); }; });
    w.querySelectorAll(".nt button").forEach(function (b) { b.onclick = function () { if (confirm("Delete this note?")) { p.notes.splice(+b.dataset.i, 1); save(p); notes(p, tab); } }; });
    el.querySelector(".fab").onclick = function () {
      var si0 = tab === "all" ? 0 : tab, ov = document.createElement("div"); ov.className = "ovl";
      ov.innerHTML = '<div class="sh"><div class="gr"></div><h3>＋ Add a note</h3><p class="q">Choose the subject and chapter</p><div class="row"><div style="flex:2"><label>SUBJECT</label><select class="ns" style="width:100%;padding:11px;border-radius:12px;border:1.5px solid #cfe3ef;font:700 14px Inter,sans-serif;background:#fff">' + p.subjects.map(function (s, si) { return '<option value="' + si + '"' + (si === si0 ? ' selected' : '') + '>' + esc(s.name) + '</option>'; }).join("") + '</select></div><div><label>CHAPTER</label><input class="nc" type="number" inputmode="numeric" min="1" value="1"></div></div><label>NOTE</label><textarea class="nx" style="border-color:#cfe3ef" placeholder="Write the important point…"></textarea><div style="height:12px"></div><button class="sv">Save note</button></div>';
      ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
      ov.querySelector(".sv").onclick = function () {
        var t = ov.querySelector(".nx").value.trim(); if (!t) { ov.querySelector(".nx").focus(); return; }
        var si = +ov.querySelector(".ns").value, c = Math.max(1, Math.min(p.subjects[si].n, Math.round(+ov.querySelector(".nc").value || 1)));
        p.notes.push({ s: si, c: c, t: t, d: todayK() }); save(p); ov.remove(); notes(p, si);
      };
      el.appendChild(ov);
    };
    el.scrollTop = 0;
  }

  /* ---------- main view ---------- */
  var FLT = "nd", MORE = false;
  function view(fresh) {
    var p = load(); if (!p) { setup(); return; }
    if (!el) { el = document.createElement("div"); el.className = "zrv"; el.setAttribute("role", "dialog"); document.body.appendChild(el); }
    clearInterval(tick);
    var tk = todayK(), all = allItems(p), name = stuName();
    var subsBy = p.subjects.map(function (s, si) { return { s: s, si: si }; }).sort(function (a, b) { return a.s.date < b.s.date ? -1 : 1; });
    var nextS = subsBy.filter(function (x) { return x.s.date >= tk; })[0];
    var doneN = all.filter(function (it) { return p.done[it.id]; }).length, pct = all.length ? Math.round(doneN * 100 / all.length) : 0;
    var stk = streak(p), sc = schedule(p), today = sc.map[tk] || { items: [], rev: [], exam: [], off: false };
    var h = '<div class="rvh"><button class="pf"><i>' + esc((name || "S").charAt(0).toUpperCase()) + '</i>' + esc(name || "Student") + ' ▾</button><button class="zx" aria-label="Close">✕</button><div class="in">' +
      '<div class="hi">Hi ' + esc(name || "there") + ' 👋</div><div class="ex">📖 ' + esc(p.exam) + (nextS ? ' · next: <b>' + esc(nextS.s.name) + ' on ' + fmtW(nextS.s.date) + '</b>' : '') + '</div>' +
      '<div class="ps">' + (nextS ? '<span><b>' + dd(tk, nextS.s.date) + '</b>' + (dd(tk, nextS.s.date) === 1 ? 'day' : 'days') + ' to ' + esc(nextS.s.name) + '</span>' : '') + '<span><b>' + doneN + '/' + all.length + '</b>chapters</span>' + (stk ? '<span>🔥 <b>' + stk + '</b>day streak</span>' : '') + '</div>' +
      '<div class="pb"><i style="width:' + pct + '%"></i></div></div></div>';
    if (!nextS) {
      h += '<div class="done-all">🎉 All your exams are over!<br>You finished ' + doneN + ' of ' + all.length + ' chapters. Make a new plan for your next exam.</div>';
    } else {
      /* exam timetable */
      h += '<div class="s2">EXAM TIMETABLE</div><div class="tt">' + subsBy.map(function (x) {
        var n = dd(tk, x.s.date), cls = x.s.date < tk ? 'ov' : x === nextS ? 'nx' : '';
        return '<div class="' + cls + '"><small>' + (x.s.date < tk ? '✓ OVER' : n === 0 ? 'TODAY' : (x === nextS ? 'NEXT · ' : '') + n + (n === 1 ? ' DAY' : ' DAYS')) + '</small><b>' + esc(x.s.name) + '</b><span>' + fmtW(x.s.date) + '</span></div>';
      }).join("") + '</div>';
      if (fresh) h += '<div class="note g">✓ Your plan is ready. Each subject finishes before its own exam, the day before each exam is for revision, and tough chapters get more time.</div>';
      if (sc.over) h += '<div class="note w">⚠️ Some chapters do not fit in your study time. Try to study a little extra each day.</div>';
      if (today.exam.length) h += '<div class="note w">📝 Today is your <b>' + today.exam.map(function (s) { return esc(s.name); }).join(", ") + '</b> exam. All the best! 💚</div>';
      /* today items */
      var tItems = [];
      all.forEach(function (it) { if (p.done[it.id] === tk || (p.part[it.id] && p.part[it.id].d === tk) || p.skip[it.id] === tk && false) tItems.push({ it: it, u: it.u }); });
      today.items.forEach(function (x) { if (!tItems.some(function (y) { return y.it.id === x.it.id; })) tItems.push(x); });
      var cur = tItems.filter(function (x) { return !p.done[x.it.id] && !(p.part[x.it.id] && p.part[x.it.id].d === tk); })[0];
      if (today.rev.length) {
        h += '<div class="rvcd"><div class="lb">TODAY · FULL REVISION 🔁</div>' + today.rev.map(function (si) { var s = p.subjects[si]; return '<div class="it" style="cursor:default"><span class="dt" style="background:' + COL[si % COL.length] + '"></span><b>' + esc(s.name) + ' – revise all chapters<small>Exam tomorrow' + (s.imp.length ? ' · focus on ⭐ Ch. ' + s.imp.join(", ") : '') + (s.hard.length ? ' · 🔥 Ch. ' + s.hard.join(", ") : '') + '</small></b></div>'; }).join("") + '</div>';
      } else if (today.off && !tItems.length) {
        h += '<div class="note g">😌 Today is your day off. Rest well!</div>';
      } else {
        if (cur) {
          var tm = p.timer && p.timer.id === cur.it.id ? p.timer : { id: cur.it.id, left: cur.u * 3600, run: false };
          var cs = p.subjects[cur.it.s];
          h += '<div class="rvcd rvfc"><button class="rg" id="rv-tm"><div><span><span id="rv-tt">' + mm(tLeft(tm)) + '</span><small id="rv-ts">' + (tm.run ? '⏸ PAUSE' : '▶ START') + '</small></span></div></button><div class="i"><div class="lb">NOW STUDYING</div><h3>' + esc(cs.name) + ' · Ch. ' + cur.it.c + (cur.rest ? ' (rest)' : '') + '</h3><div class="sm">' + (cur.it.hard ? '🔥 Tough · ' : '') + (cur.it.imp ? '⭐ Important · ' : '') + 'about ' + (cur.u > 1 ? '2 hrs' : '1 hr') + '</div><div class="fb"><button class="d" data-a="d">✓ Done</button><button class="p" data-a="p">½ Partly</button><button class="n" data-a="n">⏭ Skip</button></div></div></div>';
        }
        /* today's hours bar */
        var used = 0, segs = '', H = p.hours, SG = [];
        tItems.forEach(function (x) {
          var s = p.subjects[x.it.s];
          if (p.done[x.it.id] === tk) { var u = p.part[x.it.id] ? 1 : x.it.u; used += u; SG.push([u, 'style="background:#1f8f5f"', esc(s.name) + ' ' + x.it.c + ' ✓']); }
          else if (p.part[x.it.id] && p.part[x.it.id].d === tk) { used += 0.5; SG.push([0.5, 'style="background:#f0a500"', '½']); SG.push([0.5, 'class="r"', '↪']); }
        });
        var tot = Math.max(H, SG.reduce(function (a, g) { return a + g[0]; }, 0));
        SG.forEach(function (g) { segs += '<div ' + g[1].replace('style="', 'style="width:' + (g[0] / tot * 100) + '%;').replace('class="r"', 'class="r" style="width:' + (g[0] / tot * 100) + '%"') + '>' + g[2] + '</div>'; });
        var freeMin = Math.max(0, Math.round((H - used) * 60));
        h += '<div class="rvcd"><div class="th">Today\'s ' + H + (H > 1 ? ' hours' : ' hour') + '<span>' + (used ? hm(used * 60) + ' studied' : 'Not started') + '</span></div><div class="bar">' + segs + '</div><div class="bl"><span>0</span><span>' + (H / 2) + ' hr</span><span>' + H + (H > 1 ? ' hrs' : ' hr') + '</span></div>';
        h += tItems.map(function (x) {
          var s = p.subjects[x.it.s], d = p.done[x.it.id] === tk, pt = p.part[x.it.id], ptT = pt && pt.d === tk;
          var sub = d ? 'Finished' : ptT ? '📝 ' + (pt.note || 'Partly done') + ' · rest moves on' : x.rest ? '↪ The rest' + (pt && pt.note ? ' · done before: ' + pt.note : '') : 'About ' + (x.u > 1 ? '2 hrs' : '1 hr') + (x.it.hard ? ' · 🔥' : '') + (x.it.imp ? ' · ⭐' : '');
          return '<div class="it" data-id="' + x.it.id + '"><span class="dt" style="background:' + COL[x.it.s % COL.length] + '"></span><b>' + esc(s.name) + ' · Ch. ' + x.it.c + (x.rest ? ' (rest)' : '') + '<small>' + esc(sub) + '</small></b><div class="tg2"><span class="' + (d ? 'o1' : '') + '">✓</span><span class="' + (ptT ? 'o2' : '') + '">½</span></div></div>';
        }).join("");
        if (!tItems.length) h += '<div class="note g" style="margin:12px 0 0">Nothing planned for today 🎉</div>';
        /* pull tomorrow's chapter */
        if (!cur) {
          var nk = Object.keys(sc.map).filter(function (k) { return k > tk && sc.map[k].items.length; }).sort()[0];
          var nx = nk && sc.map[nk].items[0];
          if (nx) h += '<button class="sug" data-pull="' + nx.it.id + '"><b>' + (freeMin ? 'You still have ' + hm(freeMin) + ' free' : 'Today\'s plan is done! 🎉') + '<small>Start ' + (dd(tk, nk) === 1 ? 'tomorrow' : fmtW(nk)) + '\'s ' + esc(p.subjects[nx.it.s].name) + ' · Ch. ' + nx.it.c + ' now?</small></b><em>+</em></button>';
        }
        h += '</div>';
      }
      /* notes */
      var nc = p.notes.length, bySub = p.subjects.map(function (s, si) { var n = p.notes.filter(function (x) { return x.s === si; }).length; return n ? esc(s.name) + ' ' + n : ''; }).filter(Boolean).join(" · ");
      h += '<button class="nb" id="rv-nb"><span class="ic">📒</span><b>Important notes<small>' + (nc ? nc + (nc > 1 ? ' notes' : ' note') + ' · ' + bySub : 'Write key points while you study') + '</small></b><em>Open ›</em></button>';
      /* all chapters with filter */
      var F = { all: function () { return true; }, imp: function (it) { return it.imp; }, hard: function (it) { return it.hard; }, part: function (it) { return !p.done[it.id] && p.part[it.id]; }, nd: function (it) { return !p.done[it.id]; } };
      var FL = [["nd", "⏳ Not done"], ["imp", "⭐ Important"], ["hard", "🔥 Tough"], ["part", "½ Partly"], ["all", "All"]];
      h += '<div class="s2">ALL CHAPTERS<em>' + doneN + ' done</em></div><div class="flt">' + FL.map(function (f) { return '<button data-f="' + f[0] + '"' + (FLT === f[0] ? ' class="on"' : '') + '>' + f[1] + ' ' + all.filter(F[f[0]]).length + '</button>'; }).join("") + '</div><div class="rvcl">' +
        all.filter(F[FLT]).sort(function (a, b) { return p.subjects[a.s].date < p.subjects[b.s].date ? -1 : p.subjects[a.s].date > p.subjects[b.s].date ? 1 : a.c - b.c; }).map(function (it) {
          var s = p.subjects[it.s], st = p.done[it.id] ? '<span class="bg ok">✓ Done</span>' : p.part[it.id] ? '<span class="bg pt">½ Partly</span>' : '<span class="bg nd">Not done</span>';
          return '<div class="it" data-id="' + it.id + '"><span class="dt" style="background:' + COL[it.s % COL.length] + '"></span><b>' + esc(s.name) + ' · Ch. ' + it.c + '<small>' + (it.imp ? '⭐ Important ' : '') + (it.hard ? '🔥 Tough ' : '') + (p.part[it.id] && p.part[it.id].note ? '· 📝 ' + esc(p.part[it.id].note) : '') + '</small></b>' + st + '</div>';
        }).slice(0, MORE ? 999 : 6).join("") + (all.filter(F[FLT]).length > 6 && !MORE ? '<button class="add" id="rv-more" style="margin-top:8px">Show all ' + all.filter(F[FLT]).length + ' ›</button>' : '') + (all.filter(F[FLT]).length ? '' : '<div class="note g" style="margin:8px 0">Nothing here 👍</div>') + '</div>';
      /* next days */
      var keys = Object.keys(sc.map).filter(function (k) { return k > tk; }).sort().slice(0, 10);
      if (keys.length) h += '<div class="s2">NEXT DAYS<em>scroll ›</em></div><div class="days">' + keys.map(function (k) {
        var d = sc.map[k], dt = parse(k), m = '';
        d.exam.forEach(function (s) { m += '<span class="xm">📝 ' + esc(s.name) + ' exam</span>'; });
        d.rev.forEach(function (si) { m += '<span class="rv">🔁 ' + esc(p.subjects[si].name) + ' revision</span>'; });
        if (d.off && !d.rev.length) m += '<span class="of">😌 Day off</span>';
        d.items.forEach(function (x) { m += '<span class="' + (x.rest ? 'rs' : '') + '" style="' + (x.rest ? '' : 'border-left:3px solid ' + COL[x.it.s % COL.length]) + '">' + esc(p.subjects[x.it.s].name) + ' ' + x.it.c + (x.rest ? ' rest ↪' : '') + '</span>'; });
        return '<div class="dc' + (d.off && !d.items.length && !d.rev.length && !d.exam.length ? ' of' : '') + '"><div class="w">' + WD[dt.getDay()] + '<b>' + dt.getDate() + '</b></div><div class="m">' + (m || '<span class="of">Free</span>') + '</div></div>';
      }).join("") + '</div>';
    }
    h += '<div class="lnk"><button id="rv-ed">✏️ Edit plan</button><button class="rd" id="rv-del">🗑 Delete plan</button></div>' +
      '<p class="zpvn" style="margin:12px 16px 24px;padding:10px 12px;border-radius:12px;background:#eef6fb;color:#3c5566;font:600 11.5px/1.5 Inter,\'Noto Sans Malayalam\',sans-serif;text-align:center">🔒 Your plan and notes are saved only on this phone. ZEST does not store them anywhere.</p>';
    el.innerHTML = h;
    open1();
    function re() { var y = el.scrollTop; view(false); el.scrollTop = y; }
    el.querySelector(".rvh .zx").onclick = close;
    el.querySelector(".rvh .pf").onclick = function () { close(); if (window.ZestCorner) setTimeout(function () { ZestCorner.open(); }, 320); };
    var byId = {}; all.forEach(function (it) { byId[it.id] = it; });
    el.querySelectorAll(".it[data-id]").forEach(function (t) { t.onclick = function () { sheet(p, byId[t.dataset.id], re); }; });
    var fc = el.querySelector(".rvfc");
    if (fc) {
      var cid = cur.it.id;
      fc.querySelectorAll(".fb button").forEach(function (b) {
        b.onclick = function () {
          if (b.dataset.a === "d") { p.done[cid] = tk; p.timer = null; save(p); re(); }
          else if (b.dataset.a === "n") { p.skip[cid] = tk; p.timer = null; save(p); re(); }
          else sheet(p, byId[cid], re);
        };
      });
      var tmB = el.querySelector("#rv-tm");
      tmB.onclick = function () {
        var t = p.timer && p.timer.id === cid ? p.timer : { id: cid, left: cur.u * 3600, run: false };
        if (t.run) { t.left = tLeft(t); t.run = false; } else { t.at = Date.now(); t.run = true; }
        p.timer = t; save(p); paint();
      };
      var paint = function () {
        var t = p.timer && p.timer.id === cid ? p.timer : { left: cur.u * 3600, run: false }, l = tLeft(t), tot = cur.u * 3600;
        tmB.style.background = 'conic-gradient(#1380b8 0 ' + Math.round((1 - l / tot) * 100) + '%,#e3edf3 0)';
        el.querySelector("#rv-tt").textContent = mm(l); el.querySelector("#rv-ts").textContent = t.run ? '⏸ PAUSE' : (l < tot ? '▶ RESUME' : '▶ START');
        if (t.run && l <= 0) { t.run = false; t.left = 0; save(p); try { navigator.vibrate && navigator.vibrate(400); } catch (e) {} }
      };
      paint(); tick = setInterval(function () { if (!document.body.contains(tmB)) return clearInterval(tick); paint(); }, 1000);
    }
    var sg = el.querySelector(".sug"); if (sg) sg.onclick = function () { (p.pull[tk] = p.pull[tk] || []).push(sg.dataset.pull); Object.keys(p.pull).forEach(function (k) { if (k < tk) delete p.pull[k]; }); save(p); re(); };
    var nb = el.querySelector("#rv-nb"); if (nb) nb.onclick = function () { notes(p); };
    el.querySelectorAll(".flt button").forEach(function (b) { b.onclick = function () { FLT = b.dataset.f; MORE = false; re(); }; });
    var mo = el.querySelector("#rv-more"); if (mo) mo.onclick = function () { MORE = true; re(); };
    el.querySelector("#rv-ed").onclick = function () { clearInterval(tick); setup(p); };
    el.querySelector("#rv-del").onclick = function () { if (confirm("Delete this revision plan and its notes?")) { try { localStorage.removeItem(KEYF()); } catch (e) {} setup(); } };
  }
  function tLeft(t) { return Math.max(0, Math.round(t.run ? t.left - (Date.now() - t.at) / 1000 : t.left)); }
  function mm(s) { var h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), x = s % 60; return (h ? h + ":" + ("0" + m).slice(-2) : m) + ":" + ("0" + x).slice(-2); }
  function hm(min) { var h = Math.floor(min / 60), m = Math.round(min % 60); return ((h ? h + " hr " : "") + (m ? m + " min" : "")).trim(); }

  window.ZestRev = { open: function () { load() ? view(false) : setup(); }, close: close };
})();
