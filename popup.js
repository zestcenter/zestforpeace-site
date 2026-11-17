/* ZEST APP – obituary / wedding poster popup (app only).
   Shows each new poster once, for 3 days after it is posted. ?pop=<id> opens one directly. */
(function () {
  var app = matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
  var q = new URLSearchParams(location.search), want = q.get("pop");
  if (!app && !want) return;
  var URL_ = "https://lauftdyrlnhbimqokgye.supabase.co/rest/v1/posts";
  var KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhdWZ0ZHlybG5oYmltcW9rZ3llIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM5ODQ4MTEsImV4cCI6MjEwOTU2MDgxMX0.ysNN5nbJrBevp6SNiyVMB0RUhsdJrUli0dn5FRKD8qk";
  var SK = "zestSeenPop";
  var ml = function () { return window.ZestLang && ZestLang.get() === "ml"; };
  function seen() { try { return JSON.parse(localStorage.getItem(SK) || "[]"); } catch (e) { return []; } }
  function mark(id) { try { var s = seen(); if (s.indexOf(id) < 0) { s.push(id); localStorage.setItem(SK, JSON.stringify(s.slice(-60))); } } catch (e) {} }
  var T = {
    death: { ml: "🕊️ മരണവാർത്ത", en: "🕊️ മരണവാർത്ത", bg: "#2c3a44", btn: "#2c3a44" },
    wedding: { ml: "💍 വിവാഹ മംഗളാശംസകൾ", en: "💍 വിവാഹ മംഗളാശംസകൾ", bg: "linear-gradient(90deg,#b3265e,#e0567f)", btn: "#c23a6a" }
  };
  function lines(b) { return String(b || "").split(/\n/).map(function (x) { return x.replace(/[*_~]/g, "").trim(); }).filter(Boolean); }
  function esc(t) { return String(t).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  var css = document.createElement("style");
  css.textContent = "#zpop{position:fixed;inset:0;z-index:2147483600;background:rgba(8,20,30,.66);display:flex;align-items:center;justify-content:center;padding:18px;font-family:Inter,'Noto Sans Malayalam',sans-serif;animation:zpf .25s}" +
    "@keyframes zpf{from{opacity:0}}#zpop .bx{width:100%;max-width:24rem;max-height:92vh;display:flex;flex-direction:column;background:#fff;border-radius:22px;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,.4)}" +
    "#zpop .hd{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;color:#fff;font-weight:800;font-size:14px}" +
    "#zpop .x{width:30px;height:30px;border-radius:50%;border:0;background:rgba(255,255,255,.18);color:#fff;font-size:15px;cursor:pointer;padding:0;min-height:0}" +
    "#zpop .im{flex:1;min-height:0;overflow:auto;padding:12px 12px 0}#zpop .im img{display:block;width:100%;border-radius:12px}" +
    "#zpop .tx{padding:18px;text-align:center;font-size:16px;font-weight:700;color:#1c2a32;line-height:1.5}" +
    "#zpop .ft{display:flex;gap:8px;padding:12px}#zpop .ft button{flex:1;padding:12px;border-radius:12px;border:0;font:800 14px Inter,'Noto Sans Malayalam',sans-serif;cursor:pointer;min-height:0}" +
    "#zpop .c{background:#eef1f3;color:#2c3a44}#zpop .s{color:#fff}";
  document.head.appendChild(css);

  function shareText(p) {
    return "📲 Download ZEST APP for more details 👇\nhttps://zestforpeace.com/app";
  }
  function share(p, b) {
    var text = shareText(p);
    var done = function () { b.disabled = false; };
    b.disabled = true;
    var tryText = function () {
      if (navigator.share) return navigator.share({ text: text }).catch(function () {}).then(done);
      location.href = "https://wa.me/?text=" + encodeURIComponent(text); done();
    };
    if (!p.image_url || !navigator.canShare) return tryText();
    fetch(p.image_url).then(function (r) { return r.blob(); }).then(function (bl) {
      var f = new File([bl], "zest.jpg", { type: bl.type || "image/jpeg" });
      if (!navigator.canShare({ files: [f] })) return tryText();
      return navigator.share({ files: [f], text: text }).catch(function (e) { if (!e || e.name !== "AbortError") return tryText(); }).then(done);
    }).catch(tryText);
  }
  function show(list) {
    if (!list.length) return;
    var p = list.shift(), t = T[p.kind];
    if (!t) return show(list);
    mark(p.id);
    var L = lines(p.body);
    var d = document.createElement("div"); d.id = "zpop"; d.setAttribute("data-noi18n", "");
    d.innerHTML = '<div class="bx" role="dialog" aria-modal="true"><div class="hd" style="background:' + t.bg + '"><span>' + (ml() ? t.ml : t.en) + '</span><button class="x" aria-label="Close">✕</button></div>' +
      (p.image_url ? '<div class="im"><img src="' + esc(p.image_url) + '" alt=""></div>' : '<div class="tx">' + L.slice(0, 2).map(esc).join("<br>") + '</div>') +
      '<div class="ft"><button class="c">' + (ml() ? "അടയ്ക്കൂ" : "Close") + '</button><button class="s" style="background:' + t.btn + '">' + (ml() ? "ഷെയർ ചെയ്യൂ" : "Share") + '</button></div></div>';
    var close = function () { d.remove(); setTimeout(function () { show(list); }, 300); };
    d.querySelector(".x").onclick = close; d.querySelector(".c").onclick = close;
    d.onclick = function (e) { if (e.target === d) close(); };
    d.querySelector(".s").onclick = function () { share(p, this); };
    document.body.appendChild(d);
  }
  function run() {
    if (document.getElementById("zlp") || document.getElementById("zgate")) { setTimeout(run, 1500); return; }
    var since = new Date(Date.now() - 3 * 864e5).toISOString();
    var u = URL_ + "?select=id,kind,body,image_url,created_at&published=eq.true&kind=in.(death,wedding)&order=created_at.asc&" +
      (want ? "id=eq." + encodeURIComponent(want) : "created_at=gte." + since);
    fetch(u, { headers: { apikey: KEY, Authorization: "Bearer " + KEY } }).then(function (r) { return r.ok ? r.json() : []; }).then(function (all) {
      var s = seen();
      show((all || []).filter(function (p) { return want ? true : s.indexOf(p.id) < 0; }));
    }).catch(function () {});
  }
  if (document.readyState === "complete") setTimeout(run, 1200); else addEventListener("load", function () { setTimeout(run, 1200); });
})();
