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
    var top = p.kind === "death" ? "പ്രിയപ്പെട്ടവർക്ക് പ്രാർത്ഥനകൾ🍂" : "വിവാഹ മംഗളാശംസകൾ💐";
    return top + "\n\nDownload the ZEST APP 👇\nhttps://zestforpeace.com/app";
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
      '<div class="ft"><button class="c">' + (ml() ? "അടയ്ക്കൂ" : "Close") + '</button><button class="s" style="background:#25d366;display:flex;align-items:center;justify-content:center;gap:8px;white-space:nowrap"><svg viewBox="0 0 32 32" width="18" height="18" fill="#fff" aria-hidden="true"><path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.5.7 4.8 2 6.8L3.2 29l6.8-2.1c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6C28.8 8.6 23 3 16 3zm0 23.1c-1.9 0-3.8-.5-5.4-1.5l-.4-.2-4 1.2 1.3-3.9-.3-.4a10.4 10.4 0 0 1-1.6-5.6C5.6 10 10.3 5.3 16 5.3S26.5 10 26.5 15.6 21.8 26.1 16 26.1zm5.8-7.8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.6-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.8 5 2.9 1.1 3.4.9 4 .8.6-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5-.1-.2-.3-.2-.6-.4z"/></svg>' + (ml() ? "ഷെയർ" : "Share") + '</button></div></div>';
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
      "created_at=gte." + since + (want ? "&id=eq." + encodeURIComponent(want) : "");
    fetch(u, { headers: { apikey: KEY, Authorization: "Bearer " + KEY } }).then(function (r) { return r.ok ? r.json() : []; }).then(function (all) {
      var s = seen();
      show((all || []).filter(function (p) { return want ? true : s.indexOf(p.id) < 0; }));
    }).catch(function () {});
  }
  if (document.readyState === "complete") setTimeout(run, 1200); else addEventListener("load", function () { setTimeout(run, 1200); });
})();
