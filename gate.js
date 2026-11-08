/* ZEST APP – sign-up / login gate. Runs only inside the installed app (standalone mode). */
(function () {
  var SB = "https://lauftdyrlnhbimqokgye.supabase.co/rest/v1/rpc/";
  var KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhdWZ0ZHlybG5oYmltcW9rZ3llIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM5ODQ4MTEsImV4cCI6MjEwOTU2MDgxMX0.ysNN5nbJrBevp6SNiyVMB0RUhsdJrUli0dn5FRKD8qk";
  var GFORM = "https://docs.google.com/forms/d/e/1FAIpQLSce8eDmKZwhRSEmUfslZPudFT6VcYH2KHYF39ttL_CMp0tCqA/formResponse";
  var CLUBS = ["ZEST LIBRARY CLUB", "ZEST KIDS CLUB", "GOLDEN BOYS CLUB", "GOLDEN GIRLS CLUB", "SENIOR CITIZEN CLUB", "ZEST LADIES CLUB", "ZEST FITNESS CLUB", "IDEAL STUDENTS BATCH", "OTHER"];

  var standalone = matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
  var forced = /[?&]zestgate=1/.test(location.search);
  if (!standalone && !forced) return;
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  
  var VAPID = "BNzyT2ZmUpxcjIi-yGdN2VZ_0uEhxPOFA-N5Cgz3Bh11KaiOUrYCbxgsw0rHi0wSdxudqLF284040ZzyNxDn5QY";
  function b64u(s) { var p = "=".repeat((4 - s.length % 4) % 4), b = atob((s + p).replace(/-/g, "+").replace(/_/g, "/")), a = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) a[i] = b.charCodeAt(i); return a; }
  function subscribe() {
    return navigator.serviceWorker.ready.then(function (reg) {
      return reg.pushManager.getSubscription().then(function (s) { return s || reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64u(VAPID) }); });
    }).then(function (sub) {
      var j = sub.toJSON();
      return fetch(SB + "zest_push_subscribe", { method: "POST", headers: { apikey: KEY, Authorization: "Bearer " + KEY, "Content-Type": "application/json" }, body: JSON.stringify({ p_endpoint: j.endpoint, p_p256dh: j.keys.p256dh, p_auth: j.keys.auth, p_name: get("zestAuth") || "" }) });
    });
  }
  function notif() {
    if (!("Notification" in window) || !("serviceWorker" in navigator) || !("PushManager" in window)) return;
    if (Notification.permission === "granted") { subscribe().catch(function () {}); return; }
    if (Notification.permission === "denied" || get("zestNotifNo")) return;
    var css2 = ".zn-box{position:fixed;left:.75rem;right:.75rem;bottom:.75rem;z-index:9998;max-width:26rem;margin:0 auto;display:flex;flex-direction:column;gap:.7rem;padding:1rem;border-radius:1.1rem;background:#fff;border:1px solid #d3e7f3;box-shadow:0 .8rem 2rem rgba(0,30,50,.28);font-family:Inter,'Noto Sans Malayalam',system-ui,sans-serif}" +
      ".zn-top{display:flex;gap:.75rem;align-items:center}.zn-top img{width:2.75rem;height:2.75rem;border-radius:.7rem;border:1px solid #d3e7f3;flex:none}" +
      ".zn-top b{display:block;font-size:.95rem;color:#1c2a32}.zn-top span{display:block;font-size:.8rem;line-height:1.4;color:#52636d}" +
      ".zn-row{display:flex;gap:.5rem}.zn-row button{flex:1;min-height:2.75rem;border:0;border-radius:999px;font:700 .82rem/1 Inter,sans-serif;letter-spacing:.05em;cursor:pointer}" +
      ".zn-on{background:#1380b8;color:#fff}.zn-no{background:#eef6fb;color:#52636d}";
    var st2 = document.createElement("style"); st2.textContent = css2; document.head.appendChild(st2);
    var box = document.createElement("div"); box.className = "zn-box"; box.setAttribute("role", "dialog"); box.setAttribute("aria-label", "Turn on notifications");
    box.innerHTML = '<div class="zn-top"><img src="/icons/icon-192.png" alt=""><div><b>Turn on notifications?</b><span>പുതിയ പരിപാടികൾ, അറിയിപ്പുകൾ, ജോലി ഒഴിവുകൾ – ഉടൻ അറിയാം.</span></div></div>' +
      '<div class="zn-row"><button type="button" class="zn-no">NOT NOW</button><button type="button" class="zn-on">TURN ON</button></div>';
    var show = function () { if (!document.getElementById("zgate")) document.body.appendChild(box); };
    setTimeout(show, 1500);
    box.querySelector(".zn-no").addEventListener("click", function () { set("zestNotifNo", "1"); box.remove(); });
    box.querySelector(".zn-on").addEventListener("click", function () {
      box.remove();
      Notification.requestPermission().then(function (p) { if (p === "granted") subscribe().catch(function () {}); else set("zestNotifNo", "1"); });
    });
  }
  if (get("zestAuth")) { document.documentElement.classList.remove("zg-lock"); if (document.body) notif(); else document.addEventListener("DOMContentLoaded", notif); return; }
  document.documentElement.classList.add("zg-lock");

  function esc(t) { return String(t).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function digits(n) { return String(n || "").replace(/\D/g, ""); }
  function waNum(n) { var d = digits(n); if (d.length === 10) d = "91" + d; if (d.length === 11 && d[0] === "0") d = "91" + d.slice(1); return d; }
  function rpc(fn, body) {
    return fetch(SB + fn, { method: "POST", headers: { apikey: KEY, Authorization: "Bearer " + KEY, "Content-Type": "application/json" }, body: JSON.stringify(body) })
      .then(function (r) { if (!r.ok) throw new Error("server"); return r.json(); });
  }

  var css = "html.zg-lock body>*:not(#zgate){display:none!important}" +
    "#zgate{position:fixed;inset:0;z-index:9999;overflow-y:auto;background:linear-gradient(160deg,#1380b8 0%,#0b3d5c 100%);font-family:Inter,'Noto Sans Malayalam',system-ui,sans-serif;color:#1c2a32;padding:calc(1.5rem + env(safe-area-inset-top)) 1.1rem calc(1.5rem + env(safe-area-inset-bottom))}" +
    ".zg-w{max-width:26rem;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:1rem}" +
    ".zg-logo{width:5rem;height:5rem;border-radius:1.3rem;background:#fff;box-shadow:0 .8rem 1.8rem rgba(0,20,40,.35);overflow:hidden}.zg-logo img{width:100%;height:100%;display:block}" +
    ".zg-h{margin:0;color:#fff;font:800 1.6rem/1.2 Inter,sans-serif;letter-spacing:.03em;text-align:center}" +
    ".zg-s{margin:-.6rem 0 0;color:#dff0fa;font-size:.9rem;text-align:center}" +
    ".zg-c{width:100%;background:#fff;border-radius:1.3rem;padding:1.2rem 1.1rem 1.3rem;box-shadow:0 1rem 2.2rem rgba(0,20,40,.25)}" +
    ".zg-tabs{display:grid;grid-template-columns:1fr 1fr;gap:.3rem;padding:.3rem;margin:0 0 1rem;border-radius:999px;background:#eef6fb}" +
    ".zg-tab{min-height:2.6rem;border:0;border-radius:999px;background:none;color:#52636d;font:700 .85rem/1 Inter,sans-serif;letter-spacing:.04em;cursor:pointer}" +
    ".zg-tab[aria-selected=true]{background:#1380b8;color:#fff}" +
    ".zg-f{display:flex;flex-direction:column;gap:.8rem}.zg-f[hidden]{display:none}" +
    ".zg-f label{display:flex;flex-direction:column;gap:.35rem;font-size:.88rem;font-weight:600;color:#1c2a32}" +
    ".zg-f input,.zg-f select,.zg-f textarea{width:100%;min-height:2.9rem;padding:.65rem .85rem;border:1px solid #bcd8e8;border-radius:.8rem;background:#fff;color:#1c2a32;font:400 1rem/1.4 Inter,'Noto Sans Malayalam',sans-serif}" +
    ".zg-f textarea{min-height:5rem;resize:vertical}" +
    ".zg-f input:focus,.zg-f select:focus,.zg-f textarea:focus{outline:2px solid #3fa7d6;outline-offset:1px;border-color:#3fa7d6}" +
    ".zg-b{min-height:3.1rem;border:0;border-radius:999px;background:#ffc44d;color:#1c2a32;font:800 .95rem/1 Inter,sans-serif;letter-spacing:.06em;cursor:pointer;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:.5rem;width:100%}" +
    ".zg-b.blue{background:#1380b8;color:#fff}.zg-b.zg-wa{background:#25D366;color:#073b1d}.zg-b[disabled]{opacity:.6}" +
    ".zg-e{margin:0;padding:.6rem .8rem;border-radius:.7rem;background:#fdeee2;color:#8a3a10;font-size:.85rem}.zg-e[hidden]{display:none}" +
    ".zg-n{margin:0;font-size:.75rem;line-height:1.5;color:#52636d}" +
    ".zg-cr{display:flex;flex-direction:column;gap:.5rem;padding:.9rem 1rem;border-radius:1rem;background:#eef6fb}" +
    ".zg-cr div{display:flex;justify-content:space-between;gap:.75rem;font-size:.9rem}.zg-cr span{color:#52636d}.zg-cr b{color:#0b3d5c;word-break:break-word;text-align:right}" +
    ".zg-l{display:block;width:100%;min-height:2.75rem;border:0;background:none;color:#1380b8;font:600 .88rem/1.3 Inter,sans-serif;text-align:center;text-decoration:underline;text-underline-offset:3px;cursor:pointer;padding:.4rem}" +
    ".zg-ok{margin:0 0 .3rem;font:700 1.1rem/1.4 Inter,sans-serif;color:#1c2a32;text-align:center}";

  function build() {
    if (document.getElementById("zgate")) return;
    var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
    var g = document.createElement("div"); g.id = "zgate"; g.setAttribute("role", "dialog"); g.setAttribute("aria-label", "ZEST APP sign in");
    var opts = CLUBS.map(function (c) { return '<option value="' + c + '">' + c + "</option>"; }).join("");
    g.innerHTML =
      '<div class="zg-w"><div class="zg-logo"><img src="/icons/icon-192.png" alt="ZEST APP"></div>' +
      '<h1 class="zg-h">ZEST APP</h1><p class="zg-s">നാട് വളരാൻ നാടിനൊപ്പം</p>' +
      '<div class="zg-c" id="zgCard">' +
      '<div class="zg-tabs" role="tablist"><button type="button" class="zg-tab" role="tab" aria-selected="true" id="zgT1">REGISTER</button><button type="button" class="zg-tab" role="tab" aria-selected="false" id="zgT2">LOGIN</button></div>' +
      '<form class="zg-f" id="zgReg" novalidate>' +
      '<label><span>Name / പേര് <span style="color:#e0352b;font-weight:800">*</span></span><input name="name" type="text" autocomplete="name" required maxlength="80"></label>' +
      '<label><span>House Name / വീട്ടുപേര് <span style="color:#e0352b;font-weight:800">*</span></span><input name="house" type="text" required maxlength="120"></label>' +
      '<label><span>Age / വയസ്സ് <span style="color:#e0352b;font-weight:800">*</span></span><input name="age" type="text" inputmode="numeric" required maxlength="3"></label>' +
      '<label><span>Class / Course (if student)</span><input name="cls" type="text" maxlength="120"></label>' +
      '<label><span>WhatsApp Number / വാട്സ്ആപ്പ് നമ്പർ <span style="color:#e0352b;font-weight:800">*</span></span><input name="wa" type="tel" inputmode="tel" autocomplete="tel" required placeholder="e.g. 9876543210"></label>' +
      '<label><span>Zest Clubൽ അംഗമാവാൻ താല്പര്യമുണ്ടോ? ഏതിലാണ്?</span><select name="club"><option value="" selected>Choose</option>' + opts + "</select></label>" +
      '<label><span>Comments &amp; Suggestions / നിങ്ങളുടെ അഭിപ്രായങ്ങളും നിർദ്ദേശങ്ങളും</span><textarea name="fb" rows="3" maxlength="2000"></textarea></label>' +
      '<p class="zg-e" id="zgRegE" hidden></p>' +
      '<p class="zg-n">Your details are kept by ZEST for Peace for membership and are not shown publicly.</p>' +
      '<button class="zg-b" type="submit" id="zgRegB">SUBMIT</button></form>' +
      '<form class="zg-f" id="zgLog" hidden novalidate>' +
      '<label><span>Username / യൂസർനെയിം <span style="color:#e0352b;font-weight:800">*</span></span><input name="u" type="text" autocomplete="username" required></label>' +
      '<label><span>Password / പാസ്‌വേഡ് <span style="color:#e0352b;font-weight:800">*</span></span><input name="p" type="password" autocomplete="current-password" required ></label>' +
      '<p class="zg-e" id="zgLogE" hidden></p>' +
      '<button class="zg-b blue" type="submit" id="zgLogB">LOGIN</button>' +
      '<button type="button" class="zg-l" id="zgFg">Forgot login?</button></form>' +
      '<form class="zg-f" id="zgRec" hidden novalidate>' +
      '<p class="zg-ok" style="text-align:left;font-size:1rem">Forgot login?</p>' +
      '<label><span>Registered WhatsApp Number / രജിസ്റ്റർ ചെയ്ത വാട്സ്ആപ്പ് നമ്പർ <span style="color:#e0352b;font-weight:800">*</span></span><input name="w" type="tel" inputmode="tel" autocomplete="tel" required placeholder="e.g. 9876543210"></label>' +
      '<p class="zg-e" id="zgRecE" hidden></p>' +
      '<div class="zg-cr" id="zgRecR" hidden></div>' +
      '<button class="zg-b blue" type="submit" id="zgRecB">SHOW MY LOGIN</button>' +
      '<button type="button" class="zg-l" id="zgBack">← Back to login</button></form>' +
      "</div></div>";
    document.body.appendChild(g);

    var t1 = g.querySelector("#zgT1"), t2 = g.querySelector("#zgT2"), reg = g.querySelector("#zgReg"), log = g.querySelector("#zgLog");
    var rec = g.querySelector("#zgRec");
    function tab(i) { t1.setAttribute("aria-selected", i === 1); t2.setAttribute("aria-selected", i !== 1); reg.hidden = i !== 1; log.hidden = i !== 2; rec.hidden = i !== 3; }
    t1.addEventListener("click", function () { tab(1); });
    t2.addEventListener("click", function () { tab(2); });
    if (get("zestUser")) tab(2);
    g.querySelector("#zgFg").addEventListener("click", function () { tab(3); });
    g.querySelector("#zgBack").addEventListener("click", function () { tab(2); });
    rec.addEventListener("submit", function (e) {
      e.preventDefault();
      var E = g.querySelector("#zgRecE"), R = g.querySelector("#zgRecR"), B = g.querySelector("#zgRecB"), d = digits(rec.elements.w.value);
      R.hidden = true;
      if (d.length < 10) { err(E, "ശരിയായ WhatsApp നമ്പർ നൽകുക. (Enter a valid WhatsApp number.)"); return; }
      if (!navigator.onLine) { err(E, "Internet connection ആവശ്യമാണ്. (Please connect to the internet.)"); return; }
      err(E, ""); B.disabled = true; B.textContent = "CHECKING…";
      rpc("zest_recover", { p_whatsapp: rec.elements.w.value })
        .then(function (name) {
          B.disabled = false; B.textContent = "SHOW MY LOGIN";
          if (!name) { err(E, "ഈ നമ്പറിൽ registration കണ്ടെത്തിയില്ല. REGISTER ചെയ്യുക. (No registration found for this number.)"); return; }
          var pass = "Zest@" + d.slice(-4);
          R.innerHTML = '<div><span>Username</span><b>' + esc(name) + '</b></div><div><span>Password</span><b>' + esc(pass) + '</b></div>';
          R.hidden = false;
          log.elements.u.value = name; log.elements.p.value = pass;
          B.textContent = "LOGIN NOW"; B.type = "button";
          B.onclick = function () { unlock(name); };
        })
        .catch(function () { B.disabled = false; B.textContent = "SHOW MY LOGIN"; err(E, "വീണ്ടും ശ്രമിക്കുക. (Please try again.)"); });
    });

    function err(el, msg) { el.textContent = msg; el.hidden = !msg; }
    function unlock(name) { set("zestAuth", name); g.remove(); document.documentElement.classList.remove("zg-lock"); notif(); }

    reg.addEventListener("submit", function (e) {
      e.preventDefault();
      var f = reg.elements, E = g.querySelector("#zgRegE"), B = g.querySelector("#zgRegB");
      var name = f.name.value.trim().replace(/\s+/g, " "), d = digits(f.wa.value);
      if (!name || !f.house.value.trim() || !f.age.value.trim()) { err(E, "ദയവായി എല്ലാ ആവശ്യമായ കോളങ്ങളും പൂരിപ്പിക്കുക. (Please fill all required fields.)"); return; }
      if (d.length < 10 || d.length > 15) { err(E, "ശരിയായ WhatsApp നമ്പർ നൽകുക. (Enter a valid WhatsApp number.)"); return; }
      if (!navigator.onLine) { err(E, "Internet connection ആവശ്യമാണ്. (Please connect to the internet.)"); return; }
      err(E, ""); B.disabled = true; B.textContent = "SENDING…";
      rpc("zest_register", { p_name: name, p_house: f.house.value, p_age: f.age.value, p_class: f.cls.value, p_whatsapp: f.wa.value, p_club: f.club.value, p_feedback: f.fb.value })
        .then(function () {
          try {
            var fd = new FormData();
            fd.append("entry.1632416990", name); fd.append("entry.1816773413", f.house.value.trim()); fd.append("entry.678258537", f.age.value.trim());
            fd.append("entry.2001662289", f.cls.value.trim() || "-"); fd.append("entry.143003087", f.wa.value.trim()); if (f.club.value) fd.append("entry.1402189304", f.club.value); fd.append("entry.402692972", f.fb.value.trim() || "-");
            fetch(GFORM, { method: "POST", mode: "no-cors", body: fd }).catch(function () {});
          } catch (x) {}
          set("zestUser", name);
          done(name, "Zest@" + d.slice(-4), waNum(f.wa.value));
        })
        .catch(function () { B.disabled = false; B.textContent = "SUBMIT"; err(E, "Submit ചെയ്യാനായില്ല, വീണ്ടും ശ്രമിക്കുക. (Could not submit – please try again.)"); });
    });

    function done(name, pass, num) {
      var msg = "ZEST APP login\n\nUsername: " + name + "\nPassword: " + pass + "\n\nOpen the app: https://zestforpeace.org/app/";
      var card = g.querySelector("#zgCard");
      card.innerHTML = '<div class="zg-f"><p class="zg-ok">നന്ദി! Registration complete ✓</p>' +
        '<div class="zg-cr"><div><span>Username</span><b>' + esc(name) + "</b></div><div><span>Password</span><b>" + esc(pass) + "</b></div></div>" +
        '<button type="button" class="zg-b" id="zgGo">OPEN ZEST APP</button>' +
        '<p class="zg-n" style="text-align:center">You stay logged in on this phone.</p>' +
        '<a class="zg-l" id="zgWa" href="https://wa.me/' + num + "?text=" + encodeURIComponent(msg) + '" target="_blank" rel="noopener">Save login details to my WhatsApp (optional)</a></div>';
      card.querySelector("#zgGo").addEventListener("click", function () { unlock(name); });
    }

    log.addEventListener("submit", function (e) {
      e.preventDefault();
      var f = log.elements, E = g.querySelector("#zgLogE"), B = g.querySelector("#zgLogB");
      var u = f.u.value.trim(), p = f.p.value.trim();
      if (!u || !p) { err(E, "Username, Password നൽകുക. (Enter username and password.)"); return; }
      if (!navigator.onLine) { err(E, "Internet connection ആവശ്യമാണ്. (Please connect to the internet.)"); return; }
      err(E, ""); B.disabled = true; B.textContent = "CHECKING…";
      rpc("zest_login", { p_name: u, p_pass: p })
        .then(function (ok) { if (ok === true) { unlock(u); } else { B.disabled = false; B.textContent = "LOGIN"; err(E, "Username അല്ലെങ്കിൽ Password തെറ്റാണ്. (Wrong username or password.)"); } })
        .catch(function () { B.disabled = false; B.textContent = "LOGIN"; err(E, "Login ചെയ്യാനായില്ല, വീണ്ടും ശ്രമിക്കുക. (Could not log in – please try again.)"); });
    });
  }
  if (document.body) build(); else document.addEventListener("DOMContentLoaded", build);
})();
