/* ZEST APP – ZEST Library (books from the ZEST library Google Sheet; sample list only until it loads; borrowing not yet) */
(function () {
  var ML = true; /* inner pages: Malayalam first, "English" switch in header */
  var V = "v1";  /* page design */
  function T(m, e) { return ML ? m : e; }
  /* st: 1 = available, 2 = being read, 3 = not available */
  var BOOKS = [
    { k: "nov", t: ["ബാല്യകാലസഖി", "Balyakalasakhi"], a: ["വൈക്കം മുഹമ്മദ് ബഷീർ", "Vaikom Muhammad Basheer"], c1: "#c0392b", c2: "#8e2b1f", m: "🌳", st: 1 },
    { k: "nov", t: ["ഖസാക്കിന്റെ ഇതിഹാസം", "Khasakkinte Ithihasam"], a: ["ഒ.വി. വിജയൻ", "O.V. Vijayan"], c1: "#1f8f6a", c2: "#0f5d47", m: "🌄", st: 2 },
    { k: "sto", t: ["പ്രകാശം പരത്തുന്ന ഒരു പെൺകുട്ടി", "Prakasham Parathunna Oru Penkutty"], a: ["ടി. പത്മനാഭൻ", "T. Padmanabhan"], c1: "#4c5fd5", c2: "#2d3a8c", m: "🕯️", st: 1 },
    { k: "poe", t: ["രമണൻ", "Ramanan"], a: ["ചങ്ങമ്പുഴ കൃഷ്ണപിള്ള", "Changampuzha Krishna Pillai"], c1: "#1380b8", c2: "#0b3d5c", m: "🪈", st: 1 },
    { k: "bio", t: ["എന്റെ കഥ", "Ente Katha"], a: ["മാധവിക്കുട്ടി", "Madhavikutty"], c1: "#b5651d", c2: "#7a3f0c", m: "✍️", st: 2 }
  ];
  /* real book list: ZEST library Google Sheet (columns Title, Author, Category, Available = Yes / No) */
  var SHEET = "https://docs.google.com/spreadsheets/d/1DzLtb58HqebJOrGGo51hX2bVIJj50EOsF0zBYZGEdsA/gviz/tq?tqx=out:csv";
  var LIVE = false, LOADING = false, REDRAW = null;
  var PAL = [["#c0392b", "#8e2b1f"], ["#1f8f6a", "#0f5d47"], ["#4c5fd5", "#2d3a8c"], ["#1380b8", "#0b3d5c"], ["#b5651d", "#7a3f0c"], ["#8e3b6f", "#5c1f47"], ["#5b6b2e", "#3a4519"]];
  var CATM = { nov: /novel|നോവൽ/i, bio: /auto|ആത്മകഥ/i, lif: /biog|ജീവചരിത്ര/i, his: /hist|ചരിത്ര/i, kid: /kid|child|ബാല/i, sto: /\bstor|കഥ/i, poe: /poe|കവിത/i, sci: /sci|ശാസ്ത്ര/i, trv: /trav|യാത്ര/i, dra: /drama|നാടക/i, ess: /essay|ലേഖന/i, psc: /psc|exam|study|പരീക്ഷ/i };
  function csv(t) {
    var rows = [], r = [], f = "", q = false;
    for (var i = 0; i < t.length; i++) {
      var c = t[i];
      if (q) { if (c === '"') { if (t[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c; }
      else if (c === '"') q = true; else if (c === ",") { r.push(f); f = ""; } else if (c === "\n" || c === "\r") { if (c === "\r" && t[i + 1] === "\n") i++; r.push(f); rows.push(r); r = []; f = ""; } else f += c;
    }
    if (f || r.length) { r.push(f); rows.push(r); }
    return rows;
  }
  function toBooks(t) {
    var rows = csv(t).filter(function (r) { return r.some(function (x) { return x.trim(); }); });
    if (rows.length < 2) return [];
    var h = rows[0].map(function (x) { return x.trim().toLowerCase(); });
    var NUM = /(^|\b)(sl|s\.?\s*no|no\.?|num|number|#|id|code|ക്രമ)(\b|$)|number|നമ്പർ/;
    function col(re, skipNum) { for (var i = 0; i < h.length; i++) if (re.test(h[i]) && !(skipNum && NUM.test(h[i]))) return i; return -1; }
    var ti = col(/title|book|name|പുസ്തക|പേര്/, true);
    if (ti < 0) for (var i = 0; i < h.length; i++) if (!NUM.test(h[i]) && !/author|writer|categ|type|avail|status/.test(h[i])) { ti = i; break; }
    var au = col(/author|writer|എഴുത്ത/), ca = col(/categ|type|genre|വിഭാഗ/), av = col(/avail|status|ലഭ്യ/);
    if (ti < 0) ti = 0;
    return rows.slice(1).map(function (r, n) {
      var title = cap((r[ti] || "").trim(), 1); if (!title) return null;
      var cat = ca >= 0 ? (r[ca] || "").trim() : "", k = "";
      Object.keys(CATM).some(function (x) { if (CATM[x].test(cat)) { k = x; return true; } });
      var a = au >= 0 ? (r[au] || "").trim() : "", v = av >= 0 ? (r[av] || "").trim() : "yes";
      var hs = 0; for (var i = 0; i < title.length; i++) hs = (hs * 31 + title.charCodeAt(i)) % 997; var pl = PAL[hs % PAL.length];
      a = cap(a); return { k: k, c: cat, t: [title, title], a: [a, a], c1: pl[0], c2: pl[1], m: "", st: /^(no|n|ഇല്ല|0|false)/i.test(v) ? 2 : 1 };
    }).filter(Boolean);
  }
  (function cached() { try { var c = JSON.parse(localStorage.getItem("zestLibBooks3") || "null"); if (c && c.length) { BOOKS = c; LIVE = true; } } catch (e) {} })();
  function refresh() {
    if (LOADING) return; LOADING = true;
    fetch(SHEET + "&_=" + Date.now()).then(function (r) { if (!r.ok) throw 0; return r.text(); }).then(function (t) {
      var b = toBooks(t); LOADING = false;
      if (b.length) { BOOKS = b; LIVE = true; try { localStorage.setItem("zestLibBooks3", JSON.stringify(b)); } catch (e) {} if (REDRAW) REDRAW(); }
    }).catch(function () { LOADING = false; });
  }
  function cats() { return [["nov", "📖", T("നോവൽ", "Novel")], ["sto", "📝", T("കഥകൾ", "Stories")], ["poe", "🪶", T("കവിത", "Poetry")], ["bio", "✍️", T("ആത്മകഥ", "Autobiography")], ["lif", "📜", T("ജീവചരിത്രം", "Biography")], ["kid", "🧒", T("ബാലസാഹിത്യം", "Children")], ["his", "🏛️", T("ചരിത്രം", "History")], ["sci", "🔬", T("ശാസ്ത്രം", "Science")], ["trv", "✈️", T("യാത്രാവിവരണം", "Travel")], ["dra", "🎭", T("നാടകം", "Drama")], ["ess", "📰", T("ലേഖനങ്ങൾ", "Essays")], ["psc", "🎯", T("PSC / മത്സരപ്പരീക്ഷ", "PSC / Exams")]]; }
  function sts() { return [[1, "🟢", T("ലഭ്യം", "Available")], [2, "📖", T("വായനയിൽ", "Being read")]]; }
  var SMALL = /^(a|an|the|of|and|or|in|on|at|to|for|by|with|from)$/;
  function cap(x, ttl) { return String(x || "").replace(/(^|[\s.\-(])([a-z])([a-z']*)/g, function (m, p, f, r, i) { return (ttl && i > 0 && p === " " && SMALL.test(f + r)) ? m : p + f.toUpperCase() + r; }); }
  var CC = { nov: ["#1f8f6a", "#0f5d47"], sto: ["#1380b8", "#0b3d5c"], poe: ["#c0392b", "#8e2b1f"], bio: ["#b5651d", "#7a3f0c"], lif: ["#8e3b6f", "#5c1f47"], kid: ["#e08a1e", "#b0600a"], his: ["#6d4c41", "#43302a"], sci: ["#4c5fd5", "#2d3a8c"], trv: ["#16a2a2", "#0b6b6b"], dra: ["#a8327a", "#6e1d4f"], ess: ["#5b6b2e", "#3a4519"], psc: ["#455a64", "#263238"] };
  var XC = [["#1f8f6a", "#0f5d47"], ["#1380b8", "#0b3d5c"], ["#c0392b", "#8e2b1f"], ["#b5651d", "#7a3f0c"], ["#8e3b6f", "#5c1f47"], ["#e08a1e", "#b0600a"], ["#4c5fd5", "#2d3a8c"], ["#16a2a2", "#0b6b6b"], ["#a8327a", "#6e1d4f"], ["#5b6b2e", "#3a4519"], ["#455a64", "#263238"], ["#6d4c41", "#43302a"]];
  /* category name exactly as written in the Sheet (sample books use the built-in names) */
  /* same category in both languages: Sheet text is shown as written, but switched to the page language when it is a known name */
  var CDICT = [["Novel", "നോവൽ"], ["Novels", "നോവൽ"], ["Story", "കഥ"], ["Stories", "കഥകൾ"], ["Short Story", "ചെറുകഥ"], ["Short Stories", "ചെറുകഥകൾ"], ["Poem", "കവിത"], ["Poems", "കവിതകൾ"], ["Poetry", "കവിത"],
    ["Autobiography", "ആത്മകഥ"], ["Biography", "ജീവചരിത്രം"], ["Memoir", "ഓർമ്മക്കുറിപ്പ്"], ["Memoirs", "ഓർമ്മക്കുറിപ്പുകൾ"], ["Children", "ബാലസാഹിത്യം"], ["Kids", "ബാലസാഹിത്യം"], ["Children's Literature", "ബാലസാഹിത്യം"],
    ["History", "ചരിത്രം"], ["Science", "ശാസ്ത്രം"], ["Travel", "യാത്രാവിവരണം"], ["Travelogue", "യാത്രാവിവരണം"], ["Drama", "നാടകം"], ["Play", "നാടകം"], ["Essay", "ലേഖനം"], ["Essays", "ലേഖനങ്ങൾ"], ["Article", "ലേഖനം"], ["Articles", "ലേഖനങ്ങൾ"],
    ["Religion", "മതം"], ["Religious", "മതം"], ["Spiritual", "ആത്മീയം"], ["Spirituality", "ആത്മീയം"], ["Agriculture", "കൃഷി"], ["Farming", "കൃഷി"], ["Self Help", "സ്വയം സഹായം"], ["Self-Help", "സ്വയം സഹായം"], ["Motivation", "പ്രചോദനം"], ["Motivational", "പ്രചോദനം"],
    ["Health", "ആരോഗ്യം"], ["Medicine", "വൈദ്യം"], ["Cookery", "പാചകം"], ["Cooking", "പാചകം"], ["Philosophy", "തത്ത്വചിന്ത"], ["Psychology", "മനശ്ശാസ്ത്രം"], ["Politics", "രാഷ്ട്രീയം"], ["Literature", "സാഹിത്യം"], ["Literary Criticism", "സാഹിത്യ വിമർശനം"],
    ["Criticism", "നിരൂപണം"], ["Humour", "ഹാസ്യം"], ["Humor", "ഹാസ്യം"], ["Translation", "വിവർത്തനം"], ["Fiction", "ഫിക്ഷൻ"], ["Non Fiction", "നോൺ ഫിക്ഷൻ"], ["Non-Fiction", "നോൺ ഫിക്ഷൻ"], ["Reference", "റഫറൻസ്"], ["Dictionary", "നിഘണ്ടു"],
    ["General Knowledge", "പൊതുവിജ്ഞാനം"], ["GK", "പൊതുവിജ്ഞാനം"], ["Education", "വിദ്യാഭ്യാസം"], ["Study", "പഠനം"], ["Mathematics", "ഗണിതം"], ["Maths", "ഗണിതം"], ["Environment", "പരിസ്ഥിതി"], ["Nature", "പ്രകൃതി"], ["Law", "നിയമം"], ["Economics", "സാമ്പത്തികം"],
    ["Sports", "കായികം"], ["Art", "കല"], ["Arts", "കല"], ["Music", "സംഗീതം"], ["Cinema", "സിനിമ"], ["Film", "സിനിമ"], ["Crime", "ക്രൈം"], ["Detective", "കുറ്റാന്വേഷണം"], ["Thriller", "ത്രില്ലർ"], ["Love", "പ്രണയം"], ["Romance", "പ്രണയം"], ["Comics", "കോമിക്സ്"], ["Others", "മറ്റുള്ളവ"], ["Other", "മറ്റുള്ളവ"], ["General", "പൊതു"]];
  CDICT = CDICT.concat([["Knowledge", "വിജ്ഞാനം"], ["Upanishad", "ഉപനിഷത്ത്"], ["Upanishads", "ഉപനിഷത്തുകൾ"], ["Memories", "ഓർമ്മകൾ"], ["Memory", "ഓർമ്മ"], ["Vedas", "വേദങ്ങൾ"], ["Veda", "വേദം"], ["Puranas", "പുരാണങ്ങൾ"], ["Mythology", "പുരാണം"], ["Epic", "ഇതിഹാസം"], ["Epics", "ഇതിഹാസങ്ങൾ"],
    ["Ramayana", "രാമായണം"], ["Mahabharata", "മഹാഭാരതം"], ["Gita", "ഗീത"], ["Bhagavad Gita", "ഭഗവദ് ഗീത"], ["Quran", "ഖുർആൻ"], ["Hadith", "ഹദീസ്"], ["Islamic", "ഇസ്ലാമിക"], ["Islam", "ഇസ്ലാം"], ["Bible", "ബൈബിൾ"], ["Christian", "ക്രിസ്ത്യൻ"], ["Hindu", "ഹിന്ദു"],
    ["Technology", "സാങ്കേതികവിദ്യ"], ["Computer", "കമ്പ്യൂട്ടർ"], ["English", "ഇംഗ്ലീഷ്"], ["Malayalam", "മലയാളം"], ["Language", "ഭാഷ"], ["Grammar", "വ്യാകരണം"], ["Career", "കരിയർ"], ["Business", "ബിസിനസ്"], ["Management", "മാനേജ്മെന്റ്"],
    ["Parenting", "രക്ഷാകർതൃത്വം"], ["Family", "കുടുംബം"], ["Women", "സ്ത്രീകൾ"], ["Social", "സാമൂഹികം"], ["Society", "സമൂഹം"], ["Culture", "സംസ്കാരം"], ["Kerala", "കേരളം"], ["India", "ഇന്ത്യ"], ["World", "ലോകം"], ["Geography", "ഭൂമിശാസ്ത്രം"],
    ["Astronomy", "ജ്യോതിശാസ്ത്രം"], ["Physics", "ഭൗതികശാസ്ത്രം"], ["Chemistry", "രസതന്ത്രം"], ["Biology", "ജീവശാസ്ത്രം"], ["Ayurveda", "ആയുർവേദം"], ["Yoga", "യോഗ"], ["Quiz", "ക്വിസ്"], ["PSC", "പി.എസ്.സി"], ["Competitive Exams", "മത്സരപ്പരീക്ഷ"], ["Exam", "പരീക്ഷ"], ["Exams", "പരീക്ഷകൾ"],
    ["Folk", "നാടോടി"], ["Folklore", "നാടോടിക്കഥ"], ["Fairy Tales", "യക്ഷിക്കഥകൾ"], ["Moral Stories", "സാരോപദേശ കഥകൾ"], ["Proverbs", "പഴഞ്ചൊല്ലുകൾ"], ["Quotes", "ഉദ്ധരണികൾ"], ["Leadership", "നേതൃത്വം"], ["Personality Development", "വ്യക്തിത്വ വികസനം"],
    ["Collection", "സമാഹാരം"], ["Anthology", "സമാഹാരം"], ["Satire", "ആക്ഷേപഹാസ്യം"], ["Horror", "ഹൊറർ"], ["Adventure", "സാഹസികം"], ["Fantasy", "ഫാന്റസി"], ["Science Fiction", "ശാസ്ത്ര കഥ"], ["Letters", "കത്തുകൾ"], ["Interview", "അഭിമുഖം"], ["Interviews", "അഭിമുഖങ്ങൾ"],
    ["Speech", "പ്രസംഗം"], ["Speeches", "പ്രസംഗങ്ങൾ"], ["Study", "പഠനം"], ["Studies", "പഠനങ്ങൾ"], ["Novelette", "നോവലെറ്റ്"], ["Novella", "നോവലെറ്റ്"], ["Life", "ജീവിതം"], ["Ethics", "സദാചാരം"], ["Moral", "സദാചാരം"], ["Gandhi", "ഗാന്ധി"], ["Freedom Struggle", "സ്വാതന്ത്ര്യ സമരം"], ["Sport", "കായികം"], ["Games", "കളികൾ"], ["Medical", "വൈദ്യം"], ["Food", "ഭക്ഷണം"]]);
  function lev(a, b) { var m = a.length, n = b.length, d = []; for (var i = 0; i <= m; i++) { d[i] = [i]; for (var j = 1; j <= n; j++) d[i][j] = i ? Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)) : j; } return d[m][n]; }
  function tc(x) { return x.toLowerCase().replace(/(^|[\s\-])([a-z])/g, function (m, p, f) { return p + f.toUpperCase(); }); }
  /* one name: exact, then close spelling (typos like KNOWLDGE), then word by word */
  function cone(x) { var ml = /[\u0D00-\u0D7F]/.test(x), l = x.toLowerCase().replace(/\s+/g, " ").trim(), i, e, best = null, bd = 9;
    for (i = 0; i < CDICT.length; i++) { e = CDICT[i]; if (ml ? e[1] === x.trim() : e[0].toLowerCase() === l) return ML ? e[1] : e[0]; }
    if (ml) return x.trim();
    for (i = 0; i < CDICT.length; i++) { e = CDICT[i]; var k = e[0].toLowerCase(); if (Math.abs(k.length - l.length) > 2 || l.length < 5) continue; var dd = lev(k, l); if (dd < bd && dd <= (l.length > 8 ? 2 : 1)) { bd = dd; best = e; } }
    if (best) return ML ? best[1] : best[0];
    var w = l.split(" "); if (w.length > 1 && ML) { var hit = 0, out = w.map(function (y) { var r = cone(y); if (r !== tc(y)) hit++; return r; }); if (hit === w.length) return out.join(" "); }
    return tc(x.trim()); }
  function cdic(x) { var parts = x.split(/\s*(?:&|\/|,|\+|\band\b)\s*/); if (parts.length < 2) return cone(x); return parts.filter(function (y) { return y.trim(); }).map(cone).join(" & "); }
  function cn(b) { return b.c !== undefined ? (b.c ? cdic(b.c) : T("മറ്റുള്ളവ", "Other")) : catName(b.k); }
  function catCol(b) { if (CC[b.k]) return CC[b.k]; var n = cn(b), h = 0; for (var i = 0; i < n.length; i++) h = (h * 31 + n.charCodeAt(i)) % 9973; return XC[h % XC.length]; }
  function catList() { var seen = {}, out = []; BOOKS.forEach(function (b) { var n = cn(b); if (!seen[n]) { seen[n] = 1; out.push([n, catIcon(b.k), esc(n)]); } }); return out; }
  /* spread categories so the same kind doesn't sit together: always take the kind with most books left, never the same as the one just shown */
  function mix(list) { var g = {}, ord = []; list.forEach(function (b) { var gk = cn(b); if (!g[gk]) { g[gk] = []; ord.push(gk); } g[gk].push(b); }); if (ord.length < 2) return list;
    var out = [], last = null, first = ord.slice().sort(function (a, b) { return g[b].length - g[a].length; }).slice(0, 10);
    first.forEach(function (k) { out.push(g[k].shift()); last = k; }); /* first: one book from each kind (up to 10), no repeats */
    while (out.length < list.length) { var pick = null; ord.forEach(function (k) { if (g[k].length && k !== last && (!pick || g[k].length > g[pick].length)) pick = k; }); if (!pick) pick = last; out.push(g[pick].shift()); last = pick; } return out; }
  function catIcon(k) { var c = k && cats().filter(function (x) { return x[0] === k; })[0]; return c ? c[1] : "📖"; }
  function catName(k) { var c = cats().filter(function (x) { return x[0] === k; })[0]; return c ? c[2] : ""; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  var F = "Inter,\"Noto Sans Malayalam\",sans-serif";

  var CSS = '#zlib{position:fixed;inset:0;z-index:2147483600;background:#f3f8fb;overflow:auto;font-family:' + F + ';color:#14232c;-webkit-overflow-scrolling:touch;animation:zlIn .25s ease}' +
    '@keyframes zlIn{from{transform:translateX(30px);opacity:0}to{transform:none;opacity:1}}' +
    '#zlib .mh{position:relative;padding:34px 22px 24px;background:linear-gradient(160deg,#0b3d5c,#1380b8 65%,#3fa7d6);color:#fff;border-radius:0 0 28px 28px;text-align:center;overflow:hidden}#zlib .mh::after{content:"";position:absolute;right:-50px;top:-50px;width:170px;height:170px;border-radius:50%;background:rgba(255,255,255,.08)}' +
    '#zlib .mh .cap{display:grid;place-items:center;width:58px;height:58px;margin:0 auto;border-radius:18px;background:rgba(255,255,255,.16);font-size:30px}#zlib .mh .zhimg{position:relative;z-index:1;display:block;width:86%;max-width:360px;height:auto;aspect-ratio:780/320;margin:30px auto 0;border-radius:20px;box-shadow:0 10px 24px rgba(0,0,0,.25);border:3px solid rgba(255,255,255,.6);background:#e6f3fb}#zlib .mh h2{margin:12px 0 4px;font:800 22px ' + F + ';color:#fff}#zlib .mh p{margin:0;font:600 12.5px ' + F + ';color:#cfe6f5}' +
    '#zlib .mh .bk{position:absolute;right:14px;top:14px;z-index:2;width:38px;height:38px;border-radius:50%;border:0;background:rgba(255,255,255,.16);color:#fff;font:700 17px Inter,sans-serif;cursor:pointer}' +
    '#zlib .lsw{position:absolute;left:16px;top:18px;z-index:2;display:inline-flex;align-items:center;gap:6px;padding:5px 7px 5px 9px;border-radius:10px;border:0;background:#e3f2fb;color:#0b5d8f;cursor:pointer;font:800 11.5px/1 Inter,sans-serif;box-shadow:0 2px 6px rgba(0,0,0,.12)}#zlib .lsw .sw{position:relative;width:32px;height:19px;border-radius:999px;background:#b9dcef;transition:background .2s}#zlib .lsw .sw i{position:absolute;top:2px;left:2px;width:15px;height:15px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.25);transition:left .2s}#zlib .lsw.en .sw{background:#1380b8}#zlib .lsw.en .sw i{left:15px}' +
    '#zlib .soon{margin:12px 14px 0;background:#fff4d6;color:#7a5a00;border-radius:12px;padding:9px 12px;font-size:12px;text-align:center;font-weight:600;line-height:1.5}' +
    '#zlib .sr{position:relative;margin:14px 14px 10px}#zlib .sr input{width:100%;box-sizing:border-box;background:#fff;border:1.5px solid #dde6ee;border-radius:14px;padding:12px 12px 12px 40px;font:500 14px ' + F + ';color:#14232c;outline:none;transition:border-color .2s,box-shadow .2s}#zlib .sr input:focus{border-color:#1380b8;box-shadow:0 0 0 4px rgba(19,128,184,.12)}#zlib .sr span{position:absolute;left:13px;top:50%;transform:translateY(-50%);font-size:15px}' +
    /* filter bar – shared */
    '#zlib .fb{display:flex;gap:8px;padding:0 14px}#zlib .fb button{position:relative;display:flex;align-items:center;justify-content:center;gap:6px;cursor:pointer;-webkit-tap-highlight-color:transparent;transition:transform .15s,background .25s,color .25s,box-shadow .25s,border-color .25s}#zlib .fb button:active{transform:scale(.94)}' +
    '#zlib .fb .n{display:inline-grid;place-items:center;min-width:18px;height:18px;padding:0 4px;box-sizing:border-box;border-radius:999px;background:#ffc44d;color:#3a2a00;font:800 10.5px Inter,sans-serif;animation:zlPop .35s cubic-bezier(.3,1.6,.5,1)}@keyframes zlPop{from{transform:scale(0)}to{transform:scale(1)}}' +
    '#zlib .fb .sp{display:inline-grid;place-items:center;width:14px;height:14px;border-radius:50%;background:linear-gradient(135deg,#3fa7d6,#1380b8);color:#fff;font:900 11px/1 Inter,sans-serif;font-style:normal;box-shadow:0 2px 4px rgba(19,128,184,.35)}#zlib .fb .si{font-style:normal;font-size:13px;line-height:1}#zlib .fb .cv2{display:inline-block;font-size:10px;transition:transform .25s}' +
    '#zlib .af{display:flex;gap:6px;flex-wrap:wrap;padding:10px 14px 0}#zlib .af:empty{display:none}#zlib .af span{display:inline-flex;align-items:center;gap:5px;background:#e6f3fb;color:#0b5d8f;border-radius:999px;padding:5px 6px 5px 10px;font:700 11.5px ' + F + ';animation:zlPop .3s ease}#zlib .af b{display:grid;place-items:center;width:17px;height:17px;border-radius:50%;background:#fff;color:#0b5d8f;font:800 10px Inter,sans-serif;cursor:pointer}' +
    '#zlib .cnt{margin:12px 16px 8px;font-size:12px;color:#7a8b96;font-weight:700}' +
    /* V1 – segmented pill bar */
    '#zlib.v1 .fb{padding:0 14px;gap:8px}#zlib.v1 .fb button{flex:1;border:0;background:#fff;border-radius:14px;padding:10px 4px;font:700 13px ' + F + ';color:#4a5d69;box-shadow:0 3px 10px rgba(11,61,92,.08),inset 0 0 0 1.5px #e3ecf2}' +
    '#zlib.v1 .fb button.on{background:linear-gradient(135deg,#1380b8,#0b5d8f);color:#fff;box-shadow:0 6px 14px rgba(19,128,184,.35)}' +
    /* V2 – icon chips with gradient ring */
    '#zlib.v2 .fb button{flex:1;flex-direction:column;gap:3px;border:0;border-radius:18px;padding:10px 4px 9px;background:#fff;font:700 12px ' + F + ';color:#3c4d57;box-shadow:0 3px 0 #e3eaef}#zlib.v2 .fb button i{font-style:normal;font-size:20px;transition:transform .3s}#zlib.v2 .fb button span{display:flex;align-items:center;gap:4px}' +
    '#zlib.v2 .fb button.on{background:linear-gradient(#fff,#fff) padding-box,linear-gradient(135deg,#1380b8,#ffc44d) border-box;border:2px solid transparent;padding:8px 2px 7px;color:#0b5d8f;box-shadow:0 8px 18px rgba(19,128,184,.18)}#zlib.v2 .fb button.on i{transform:scale(1.15) rotate(-6deg)}#zlib.v2 .fb .n{position:absolute;top:-6px;right:-4px}' +
    /* V3 – sticky glass bar */
    '#zlib.v3 .stk{position:sticky;top:0;z-index:5;padding:10px 0 8px;background:rgba(243,248,251,.82);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px)}#zlib.v3 .sr{margin:4px 14px 10px}' +
    '#zlib.v3 .fb button{border:1.5px solid #d6e3ec;background:#fff;border-radius:999px;padding:8px 14px;font:700 12.5px ' + F + ';color:#3c4d57}#zlib.v3 .fb button.dd{flex:1}#zlib.v3 .fb button.on{background:#0b3d5c;border-color:#0b3d5c;color:#fff}#zlib.v3 .fb button.on.dd{background:#e6f3fb;border-color:#1380b8;color:#0b5d8f}' +
    /* book cards */
    '#zlib .bl{display:grid;gap:10px;padding:0 14px}#zlib .b{display:flex;gap:12px;background:#fff;border-radius:18px;padding:10px;box-shadow:0 2px 0 #e3eaef;animation:zlUp .35s ease both}@keyframes zlUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}' +
    '#zlib .cv{position:relative;flex:none;width:84px;height:118px;border-radius:14px;color:#fff;overflow:hidden;box-shadow:0 8px 16px -8px rgba(0,0,0,.4)}#zlib .cv .wm{position:absolute;right:-6px;bottom:26px;font-size:42px;opacity:.3;transform:rotate(-12deg)}#zlib .cv b{position:absolute;left:6px;right:6px;top:10px;text-align:center;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden;overflow-wrap:break-word;font:800 9.5px/1.25 "Noto Sans Malayalam",Inter,sans-serif;text-shadow:0 1px 2px rgba(0,0,0,.2)}#zlib .cv svg{position:absolute;left:0;right:0;bottom:0;width:100%;height:42px}#zlib .cv small{position:absolute;left:5px;right:5px;bottom:6px;text-align:center;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;font:700 7.5px/1.2 "Noto Sans Malayalam",Inter,sans-serif;color:#14232c}' +
    '' +
    '' +
    '#zlib .in{flex:1;min-width:0;display:flex;flex-direction:column}#zlib .in h4{margin:2px 0 3px;font:800 14.5px/1.35 "Noto Sans Malayalam",Inter,sans-serif;color:#0b3d5c}#zlib .in .au{font-size:12px;color:#5d707c}' +
    '#zlib .tg{display:flex;gap:6px;flex-wrap:wrap;margin-top:7px}#zlib .tg span{font:700 10.5px ' + F + ';padding:3px 8px;border-radius:999px;background:#eef6fb;color:#0b5d8f}#zlib .tg .s1{background:#e8f7ef;color:#0f7d58}#zlib .tg .s2{background:#fff1e2;color:#b5651d}#zlib .tg .s3{background:#fdecef;color:#c0392b}' +
    '#zlib .rq{margin-top:auto;align-self:flex-start;display:inline-flex;align-items:center;gap:5px;border:0;background:#25d366;color:#fff;border-radius:999px;padding:5px 11px 5px 8px;font:700 11px ' + F + ';cursor:pointer;opacity:.75;box-shadow:0 3px 8px rgba(37,211,102,.25)}#zlib .rq svg{width:14px;height:14px}' +
    /* V2 – cover-first 2-column cards */
    '#zlib.v2 .bl{grid-template-columns:1fr 1fr}#zlib.v2 .b{flex-direction:column;gap:8px;padding:12px}#zlib.v2 .cv{width:100%;height:150px;padding:12px 10px 10px 14px}#zlib.v2 .cv b{font-size:12.5px}#zlib.v2 .cv i{font-size:30px}#zlib.v2 .cv small{font-size:9.5px}#zlib.v2 .in h4{font-size:13.5px}#zlib.v2 .in .au{font-size:11px}#zlib.v2 .rq{width:100%;margin-top:8px}' +
    /* V3 – compact rows with status dot */
    '#zlib.v3 .b{align-items:center}#zlib.v3 .cv{width:58px;height:82px;padding:6px 4px 4px 8px}#zlib.v3 .cv b{font-size:7.5px}#zlib.v3 .cv i{font-size:16px}#zlib.v3 .cv small{display:none}#zlib.v3 .rq{display:none}#zlib.v3 .b:after{content:"›";flex:none;width:28px;height:28px;border-radius:50%;background:#eef6fb;color:#1380b8;font:800 16px/27px Inter,sans-serif;text-align:center}' +
    '#zlib .no{text-align:center;color:#7a8b96;font-size:13px;padding:30px 14px}#zlib .no i{display:block;font-style:normal;font-size:34px;margin-bottom:6px}#zlib .no button{margin-top:10px;border:0;background:#e6f3fb;color:#0b5d8f;border-radius:999px;padding:8px 14px;font:700 12px ' + F + '}' +
    '#zlib .nt{text-align:center;font-size:11.5px;color:#7a8b96;margin:16px 18px 30px;line-height:1.5}' +
    /* bottom sheet with ticks */
    '.zls-bg{position:fixed;inset:0;z-index:2147483640;background:rgba(10,30,45,.45);opacity:0;transition:opacity .25s}.zls-bg.on{opacity:1}' +
    '.zls{position:fixed;left:0;right:0;bottom:0;z-index:2147483641;max-height:78vh;display:flex;flex-direction:column;background:#fff;border-radius:24px 24px 0 0;font-family:' + F + ';transform:translateY(100%);transition:transform .3s cubic-bezier(.2,.9,.3,1)}.zls.on{transform:none}' +
    '.zls .gr{width:40px;height:4px;border-radius:2px;background:#d4e0e8;margin:10px auto 6px}.zls .sh2{display:flex;align-items:center;justify-content:space-between;padding:0 14px 0 18px}.zls h4{margin:4px 0;font-size:16px;color:#0b3d5c}.zls .x{width:32px;height:32px;border-radius:50%;border:0;background:#eef3f7;color:#3b4c57;font:700 14px Inter,sans-serif;cursor:pointer}.zls .hs{margin:0 18px 8px;font-size:12px;color:#7a8b96}.zls .cs{position:relative;margin:0 14px 8px}.zls .cs span{position:absolute;left:13px;top:50%;transform:translateY(-50%);font-size:14px;pointer-events:none}.zls .cs input{width:100%;box-sizing:border-box;background:#f5f8fa;border:1.5px solid #dde6ee;border-radius:12px;padding:10px 12px 10px 38px;font:500 14px ' + F + ';color:#14232c;outline:none;-webkit-appearance:none}.zls .cs input:focus{border-color:#1380b8;background:#fff}.zls .r.hid{display:none}.zls .nr{padding:18px;text-align:center;color:#7a8b96;font-size:13px;display:none}' +
    '.zls .ls{overflow:auto;padding:0 12px}.zls .r{display:flex;align-items:center;gap:12px;padding:11px 8px;border-radius:14px;cursor:pointer;font:600 14px ' + F + ';color:#14232c;transition:background .2s}.zls .r:active{background:#f1f6f9}.zls .r.on{background:#eef7fd;color:#0b5d8f}' +
    '.zls .r i{font-style:normal;font-size:18px;width:26px;text-align:center}.zls .r span{flex:1}.zls .r small{font:700 11px Inter,sans-serif;color:#7a8b96}' +
    '.zls .r span.ck{position:relative;flex:none;width:22px;height:22px;border-radius:7px;border:2px solid #c9d6de;transition:background .2s,border-color .2s}.zls .r.on .ck{background:#1380b8;border-color:#1380b8}.zls .ck:after{content:"";position:absolute;left:6px;top:2px;width:5px;height:10px;border:solid #fff;border-width:0 2.5px 2.5px 0;transform:rotate(45deg) scale(0);transition:transform .25s cubic-bezier(.3,1.6,.5,1)}.zls .r.on .ck:after{transform:rotate(45deg) scale(1)}' +
    '.zls .ap{display:flex;justify-content:center;padding:12px 16px 18px;border-top:1px solid #eef3f6}.zls .ap button{border:0;border-radius:14px;padding:13px;font:800 14px ' + F + ';cursor:pointer}.zls .ap .c{flex:none;padding:13px 18px;background:#eef3f7;color:#3b4c57}.zls .ap .a{padding:10px 26px;font-size:13px;border-radius:999px;background:linear-gradient(135deg,#1380b8,#0b5d8f);color:#fff;box-shadow:0 6px 14px rgba(19,128,184,.3)}' +
    '#zlib.v1 .fb button{white-space:nowrap;font-size:12.5px;padding:10px 2px;gap:4px}#zlib.v1 .fb button.sg{flex:1.15;font-size:11.5px}' +
    '.zls .r.ra{border-bottom:1px solid #eef3f6;border-radius:14px 14px 0 0;margin-bottom:4px}' +
    '.zsg .sgf{padding:4px 18px 6px;overflow:auto}.zsg .r2{display:grid;grid-template-columns:1fr 1fr;gap:10px}.zsg label{display:block;margin-bottom:10px}.zsg label>span{display:block;font:700 12px "Noto Sans Malayalam",Inter,sans-serif;color:#3c5566;margin:0 0 5px 2px}.zsg em{font-style:normal;color:#e0345c}.zsg input{width:100%;box-sizing:border-box;border:1.5px solid #dde6ee;border-radius:12px;padding:11px 12px;font:500 14px Inter,"Noto Sans Malayalam",sans-serif;outline:none}.zsg input:focus{border-color:#1380b8}.zsg input.inv{border-color:#e0345c;background:#fff6f8}' +
    '.zsg .ap .a.zwa{flex:none;white-space:nowrap;display:flex;align-items:center;gap:8px;background:#25d366;box-shadow:0 6px 14px rgba(37,211,102,.3)}.zsg .zwa svg{width:18px;height:18px}' +
    '.zlt{position:fixed;left:50%;bottom:90px;transform:translateX(-50%);z-index:2147483647;background:#0b3d5c;color:#fff;padding:10px 18px;border-radius:999px;font:700 13px ' + F + ';box-shadow:0 8px 20px rgba(0,0,0,.25);text-align:center;max-width:86vw}';

  function toast(m) { var t = document.createElement("div"); t.className = "zlt"; t.textContent = m; document.body.appendChild(t); setTimeout(function () { t.remove(); }, 2200); }
  function i(a) { return ML ? a[0] : a[1]; }
  function stTag(s) { var x = sts().filter(function (y) { return y[0] === s; })[0]; return '<span class="s' + s + '">' + (s === 1 ? "✓ " : "📖 ") + x[2] + '</span>'; }
  function card(b, n) {
    return '<div class="b" style="animation-delay:' + (n * 0.05) + 's"><div class="cv" style="background:linear-gradient(155deg,' + catCol(b)[0] + ',' + catCol(b)[1] + ')"><span class="wm">' + catIcon(b.k) + '</span><b data-zfs="">' + esc(b.t[0]) + '</b><svg viewBox="0 0 92 46" preserveAspectRatio="none" aria-hidden="true"><path d="M0 14 C 20 0, 40 26, 60 12 S 85 4, 92 10 L92 46 L0 46Z" fill="#fff"/></svg><small data-zfs="">' + esc(b.a[0]) + '</small></div>' +
      '<div class="in"><h4>' + esc(i(b.t)) + '</h4><div class="au">' + esc(i(b.a)) + '</div><div class="tg"><span>' + esc(cn(b)) + '</span>' + stTag(b.st) + '</div>' +
      '<button type="button" class="rq"><svg viewBox="0 0 24 24" fill="#fff"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-3.3-.8-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.3 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.7 1.2 1.6 2 1.1 1 2 1.3 2.3 1.4.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.2.1.7-.1 1.2Z"/></svg>' + T("പുസ്തകം ചോദിക്കാം", "Request book") + '</button></div></div>';
  }

  function open(opt) {
    if (opt && opt.v) V = opt.v;
    if (!document.getElementById("zlib-css")) { var s = document.createElement("style"); s.id = "zlib-css"; s.textContent = CSS; document.head.appendChild(s); }
    var old = document.getElementById("zlib"); if (old) old.remove();
    var w = document.createElement("div"); w.id = "zlib"; w.className = V; w.setAttribute("data-noi18n", "");
    ML = true; var q = "", selC = [], selS = [];
    function match(b, C, S) { var qq = q.trim().toLowerCase(); return (!C.length || C.indexOf(cn(b)) > -1) && (!S.length || S.indexOf(b.st) > -1) && (!qq || (b.t.join(" ") + " " + b.a.join(" ")).toLowerCase().indexOf(qq) > -1); }
    function bar() {
      var all = !selC.length && !selS.length;
      function n(a) { return a.length ? '<em class="n">' + a.length + '</em>' : ''; }
      var ic = V === "v2", si = function (e) { return ic ? '' : '<i class="si">' + e + '</i>'; };
      w.querySelector(".fb").innerHTML =
        '<button type="button" data-f="cat" class="dd' + (selC.length ? ' on' : '') + '">' + si("🗂️") + (ic ? '<i>🗂️</i><span>' : '') + T("വിഭാഗം", "Category") + ' <span class="cv2">▾</span>' + (ic ? '</span>' : '') + n(selC) + '</button>' +
        '<button type="button" data-f="st" class="dd' + (selS.length ? ' on' : '') + '">' + si("✅") + (ic ? '<i>✅</i><span>' : '') + T("ലഭ്യത", "Availability") + ' <span class="cv2">▾</span>' + (ic ? '</span>' : '') + n(selS) + '</button>' +
        '<button type="button" data-f="sug" class="sg">' + (ic ? '<i>➕</i><span>' : '<i class="sp">+</i>') + T("ആവശ്യപ്പെടാം", "Request") + (ic ? '</span>' : '') + '</button>';
      w.querySelector('[data-f=sug]').onclick = suggest;
      w.querySelector('[data-f=cat]').onclick = function () { pick("cat"); };
      w.querySelector('[data-f=st]').onclick = function () { pick("st"); };
      var af = selC.map(function (k) { return '<span>' + esc(k) + ' <b data-c="' + esc(k) + '">✕</b></span>'; }).concat(selS.map(function (k) { return '<span>' + sts()[k - 1][2] + ' <b data-s="' + k + '">✕</b></span>'; }));
      w.querySelector(".af").innerHTML = af.join("");
      w.querySelectorAll(".af b").forEach(function (x) { x.onclick = function () { if (x.dataset.c) selC = selC.filter(function (k) { return k !== x.dataset.c; }); else selS = selS.filter(function (k) { return k !== +x.dataset.s; }); bar(); list(); }; });
    }
    function list() {
      var r = BOOKS.filter(function (b) { return match(b, selC, selS); });
      if (selC.length !== 1) r = mix(r);
      w.querySelector(".cnt").textContent = ML ? r.length + " പുസ്തകങ്ങൾ" : r.length + (r.length === 1 ? " book" : " books");
      w.querySelector(".bl").innerHTML = r.length ? r.map(card).join("") : '<div class="no"><i>📭</i>' + T("ഈ ഫിൽട്ടറിൽ പുസ്തകം ഇല്ല", "No books match this filter") + '<br><button type="button">' + T("എല്ലാം കാണിക്കൂ", "Show all") + '</button></div>';
      var nb = w.querySelector(".no button"); if (nb) nb.onclick = function () { selC = []; selS = []; q = ""; w.querySelector(".sr input").value = ""; bar(); list(); };
      w.querySelectorAll(".rq").forEach(function (b) { b.onclick = function () { toast(T("പുസ്തകം ചോദിക്കൽ ഉടൻ തുടങ്ങും 🙂", "Book requests start soon 🙂")); }; });
    }
    function pick(type) {
      var isC = type === "cat", tmp = (isC ? selC : selS).slice();
      var rows = isC ? catList() : sts();
      var bg = document.createElement("div"); bg.className = "zls-bg";
      var sh = document.createElement("div"); sh.className = "zls"; sh.setAttribute("data-noi18n", "");
      function cnt(key) { return BOOKS.filter(function (b) { return isC ? cn(b) === key && match(b, [], selS) : b.st === key && match(b, selC, []); }).length; }
      sh.innerHTML = '<div class="gr"></div><div class="sh2"><h4>' + (isC ? "🗂️ " + T("വിഭാഗം", "Category") : "✅ " + T("ലഭ്യത", "Availability")) + '</h4><button type="button" class="x" aria-label="Close">✕</button></div><div class="hs">' + T("ഒന്നിൽ കൂടുതൽ തിരഞ്ഞെടുക്കാം", "You can pick more than one") + '</div>' + (isC ? '<div class="cs"><span>🔍</span><input type="search" placeholder="' + T("വിഭാഗം തിരയൂ", "Search category") + '"></div>' : '') + '<div class="ls">' +
        '<div class="r ra' + (tmp.length ? '' : ' on') + '" data-k="__all"><span class="ck"></span><i>' + (isC ? '📚' : '✅') + '</i><span>' + T("എല്ലാം", "All") + '</span><small>' + BOOKS.filter(function (b) { return isC ? match(b, [], selS) : match(b, selC, []); }).length + '</small></div>' +
        rows.map(function (x) { return '<div class="r' + (tmp.indexOf(x[0]) > -1 ? ' on' : '') + '" data-k="' + (isC ? esc(x[0]) : x[0]) + '"><span class="ck"></span><i>' + x[1] + '</i><span>' + x[2] + '</span><small>' + cnt(x[0]) + '</small></div>'; }).join("") +
        '</div><div class="ap"><button type="button" class="a">' + T("പുസ്തകങ്ങൾ കാണിക്കൂ", "Show books") + '</button></div>';
      function upd() {}
      var cs = sh.querySelector(".cs input"); if (cs) { var nr = document.createElement("div"); nr.className = "nr"; nr.textContent = T("ഈ പേരിൽ വിഭാഗം ഇല്ല", "No matching category"); sh.querySelector(".ls").appendChild(nr);
        var lsH = 0; cs.oninput = function () { var ls = sh.querySelector(".ls"); if (!lsH) { lsH = ls.offsetHeight; ls.style.minHeight = lsH + "px"; } var v = cs.value.trim().toLowerCase(), n = 0; sh.querySelectorAll(".r").forEach(function (r) { if (r.dataset.k === "__all") { r.classList.toggle("hid", !!v); return; } var hit = !v || r.textContent.toLowerCase().indexOf(v) > -1; r.classList.toggle("hid", !hit); if (hit) n++; }); nr.style.display = n ? "none" : "block"; }; }
      sh.querySelectorAll(".r").forEach(function (r) { r.onclick = function () {
        if (r.dataset.k === "__all") tmp = []; else { var k = isC ? r.dataset.k : +r.dataset.k, p = tmp.indexOf(k); if (p > -1) tmp.splice(p, 1); else tmp.push(k); }
        sh.querySelectorAll(".r").forEach(function (x) { var kk = x.dataset.k; x.classList.toggle("on", kk === "__all" ? !tmp.length : tmp.indexOf(isC ? kk : +kk) > -1); }); upd(); }; });
      function shut() { bg.classList.remove("on"); sh.classList.remove("on"); setTimeout(function () { bg.remove(); sh.remove(); }, 300); }
      bg.onclick = shut;
      sh.querySelector(".x").onclick = shut;
      sh.querySelector(".a").onclick = function () { if (isC) selC = tmp; else selS = tmp; bar(); list(); shut(); };
      upd(); document.body.appendChild(bg); document.body.appendChild(sh);
      requestAnimationFrame(function () { requestAnimationFrame(function () { bg.classList.add("on"); sh.classList.add("on"); }); });
    }
    function suggest() {
      var bg = document.createElement("div"); bg.className = "zls-bg";
      var sh = document.createElement("div"); sh.className = "zls zsg"; sh.setAttribute("data-noi18n", "");
      sh.innerHTML = '<div class="gr"></div><div class="sh2"><h4>📚 ' + T("പുസ്തകം ആവശ്യപ്പെടാം", "Request a book") + '</h4><button type="button" class="x" aria-label="Close">✕</button></div>' +
        '<div class="hs">' + T("ലൈബ്രറിയിൽ ഇല്ലാത്ത പുസ്തകം വേണോ? പറഞ്ഞാൽ ZEST വാങ്ങാൻ ശ്രമിക്കും 📚", "Want a book the library doesn\'t have? Tell us and ZEST will try to get it 📚") + '</div>' +
        '<div class="sgf"><label><span>' + T("പുസ്തകത്തിന്റെ പേര്", "Book name") + ' <em>*</em></span><input class="b1" placeholder="' + T("ഉദാ: ആടുജീവിതം", "e.g. Aadujeevitham") + '"></label>' +
        '<label><span>' + T("എഴുത്തുകാരൻ (അറിയുമെങ്കിൽ)", "Author (if you know)") + '</span><input class="b2" placeholder="' + T("എഴുത്തുകാരന്റെ പേര്", "Author name") + '"></label>' +
        '</div>' +
        '<div class="ap"><button type="button" class="a zwa" style="background:linear-gradient(135deg,#0d5a8c,#1380b8);justify-content:center;text-align:center">' + T("സബ്മിറ്റ്", "Submit") + '</button></div>';
      function shut() { bg.classList.remove("on"); sh.classList.remove("on"); setTimeout(function () { bg.remove(); sh.remove(); }, 300); }
      bg.onclick = shut; sh.querySelector(".x").onclick = shut;
      sh.querySelector(".zwa").onclick = function () {
        var b1 = sh.querySelector(".b1"), nm = b1.value.trim(), au = sh.querySelector(".b2").value.trim();
        if (!nm) { b1.classList.add("inv"); b1.focus(); return; }
        var head = T("📚 ലൈബ്രറി – പുസ്തകം ആവശ്യപ്പെടൽ", "📚 Library – Book request");
        var body = T("📖 പുസ്തകം: ", "📖 Book: ") + nm + (au ? T("\n✍️ എഴുത്തുകാരൻ: ", "\n✍️ Author: ") + au : "");
        shut();
        if (window.zWho) setTimeout(function () { zWho(head, body); }, 320);
        else window.open("https://wa.me/918921369102?text=" + encodeURIComponent(head + "\n\n" + body), "_blank");
      };
      sh.querySelectorAll("input").forEach(function (x) { x.oninput = function () { x.classList.remove("inv"); }; });
      document.body.appendChild(bg); document.body.appendChild(sh);
      requestAnimationFrame(function () { requestAnimationFrame(function () { bg.classList.add("on"); sh.classList.add("on"); }); });
    }
    function render() {
      var filt = '<div class="sr"><span>🔍</span><input type="search" placeholder="' + T("പുസ്തകം / എഴുത്തുകാരൻ തിരയൂ", "Search book / author") + '" value="' + esc(q) + '"></div><div class="fb"></div><div class="af"></div>';
      w.innerHTML = '<div class="mh"><button type="button" class="bk" aria-label="Back">✕</button><button type="button" class="lsw' + (ML ? '' : ' en') + '" role="switch" aria-checked="' + (!ML) + '">EN <span class="sw"><i></i></span></button>' +
        '<img class="zhimg" src="/img/hero/library.svg" alt=""><h2>' + T("ZEST ലൈബ്രറി", "ZEST Library") + '</h2><p>' + T("വായിക്കാം, വളരാം", "Read and grow") + '</p></div>' +
        (LIVE ? '' : '<div class="soon">👀 ' + T("ഇത് ഒരു മാതൃക മാത്രം – ലൈബ്രറിയിലെ മുഴുവൻ പുസ്തകങ്ങളും ഉടൻ ചേർക്കും", "Sample preview – all library books will be added soon") + '</div>') +
        (V === "v3" ? '<div class="stk">' + filt + '</div>' : filt) +
        '<div class="cnt"></div><div class="bl"></div>' +
        '<div class="nt">' + T("പുതിയ പുസ്തകങ്ങൾ ലൈബ്രറിയിൽ എത്തുമ്പോൾ ഇവിടെ തനിയെ വരും", "New books appear here automatically when they reach the library") + '</div>';
      w.querySelector(".bk").onclick = close;
      w.querySelector(".lsw").onclick = function () { var y = w.scrollTop; ML = !ML; selC = []; render(); w.scrollTop = y; };
      w.querySelector(".sr input").oninput = function (e) { q = e.target.value; list(); };
      bar(); list();
    }
    render();
    REDRAW = function () { if (!document.body.contains(w)) return; var y = w.scrollTop; render(); w.scrollTop = y; };
    refresh();
    document.body.appendChild(w);
    try { history.pushState({ zlib: 1 }, ""); } catch (e) {}
    window.addEventListener("popstate", onPop);
  }
  function onPop() { var w = document.getElementById("zlib"); if (w) w.remove(); window.removeEventListener("popstate", onPop); }
  function close() { if (history.state && history.state.zlib) history.back(); else onPop(); }
  window.ZestLib = { open: open };
})();
