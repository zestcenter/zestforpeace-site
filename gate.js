/* ZEST APP – sign-up / login gate. Runs only inside the installed app (standalone mode). */
(function () {
  var SB = "https://lauftdyrlnhbimqokgye.supabase.co/rest/v1/rpc/";
  var KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhdWZ0ZHlybG5oYmltcW9rZ3llIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM5ODQ4MTEsImV4cCI6MjEwOTU2MDgxMX0.ysNN5nbJrBevp6SNiyVMB0RUhsdJrUli0dn5FRKD8qk";
  var GFORM = "https://docs.google.com/forms/d/e/1FAIpQLSfdYugcqISkylbvGGBLAn_7zS9dXT53f35QFFnwdqgQ_dPhtQ/formResponse";
  var CLUBS = ["ZEST LIBRARY CLUB", "ZEST KIDS CLUB", "GOLDEN BOYS CLUB", "GOLDEN GIRLS CLUB", "SENIOR CITIZEN CLUB", "ZEST LADIES CLUB", "ZEST FITNESS CLUB", "IDEAL STUDENTS BATCH", "OTHER"];

  var standalone = matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
  var forced = /[?&]zestgate=1/.test(location.search);
  if (!standalone && !forced) return;
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  if (get("zestAuth")) { document.documentElement.classList.remove("zg-lock"); return; }
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
      '<label>പേര്<input name="name" type="text" autocomplete="name" required maxlength="80"></label>' +
      '<label>വീട്ടുപേര്<input name="house" type="text" required maxlength="120"></label>' +
      '<label>വയസ്സ്<input name="age" type="text" inputmode="numeric" required maxlength="3"></label>' +
      '<label>ക്ലാസ്സ്‌ / കോഴ്സ് (വിദ്യാർത്ഥി ആണെങ്കിൽ)<input name="cls" type="text" maxlength="120"></label>' +
      '<label>Whatsapp Number<input name="wa" type="tel" inputmode="tel" autocomplete="tel" required placeholder="e.g. 9876543210"></label>' +
      '<label>Zest Clubൽ അംഗമാവാൻ താല്പര്യമുണ്ടോ? ഏതിലാണ്?<select name="club" required><option value="" disabled selected>Choose</option>' + opts + "</select></label>" +
      '<label>നിങ്ങളുടെ അഭിപ്രായങ്ങളും നിർദ്ദേശങ്ങളും<textarea name="fb" rows="3" maxlength="2000"></textarea></label>' +
      '<p class="zg-e" id="zgRegE" hidden></p>' +
      '<p class="zg-n">Your details are kept by ZEST for Peace for membership and are not shown publicly.</p>' +
      '<button class="zg-b" type="submit" id="zgRegB">SUBMIT</button></form>' +
      '<form class="zg-f" id="zgLog" hidden novalidate>' +
      '<label>Username (പേര്)<input name="u" type="text" autocomplete="username" required></label>' +
      '<label>Password<input name="p" type="password" autocomplete="current-password" required placeholder="Zest@____"></label>' +
      '<p class="zg-e" id="zgLogE" hidden></p>' +
      '<button class="zg-b blue" type="submit" id="zgLogB">LOGIN</button>' +
      '<p class="zg-n">Password = Zest@ + last 4 digits of your WhatsApp number.</p></form>' +
      "</div></div>";
    document.body.appendChild(g);

    var t1 = g.querySelector("#zgT1"), t2 = g.querySelector("#zgT2"), reg = g.querySelector("#zgReg"), log = g.querySelector("#zgLog");
    function tab(i) { t1.setAttribute("aria-selected", i === 1); t2.setAttribute("aria-selected", i === 2); reg.hidden = i !== 1; log.hidden = i !== 2; }
    t1.addEventListener("click", function () { tab(1); });
    t2.addEventListener("click", function () { tab(2); });
    if (get("zestUser")) tab(2);

    function err(el, msg) { el.textContent = msg; el.hidden = !msg; }
    function unlock(name) { set("zestAuth", name); g.remove(); document.documentElement.classList.remove("zg-lock"); }

    reg.addEventListener("submit", function (e) {
      e.preventDefault();
      var f = reg.elements, E = g.querySelector("#zgRegE"), B = g.querySelector("#zgRegB");
      var name = f.name.value.trim().replace(/\s+/g, " "), d = digits(f.wa.value);
      if (!name || !f.house.value.trim() || !f.age.value.trim() || !f.club.value) { err(E, "ദയവായി എല്ലാ ആവശ്യമായ കോളങ്ങളും പൂരിപ്പിക്കുക. (Please fill all required fields.)"); return; }
      if (d.length < 10 || d.length > 15) { err(E, "ശരിയായ WhatsApp നമ്പർ നൽകുക. (Enter a valid WhatsApp number.)"); return; }
      if (!navigator.onLine) { err(E, "Internet connection ആവശ്യമാണ്. (Please connect to the internet.)"); return; }
      err(E, ""); B.disabled = true; B.textContent = "SENDING…";
      rpc("zest_register", { p_name: name, p_house: f.house.value, p_age: f.age.value, p_class: f.cls.value, p_whatsapp: f.wa.value, p_club: f.club.value, p_feedback: f.fb.value })
        .then(function () {
          try {
            var fd = new FormData();
            fd.append("entry.1632416990", name); fd.append("entry.1816773413", f.house.value.trim()); fd.append("entry.678258537", f.age.value.trim());
            fd.append("entry.2001662289", f.cls.value.trim() || "-"); fd.append("entry.143003087", f.wa.value.trim()); fd.append("entry.1402189304", f.club.value); fd.append("entry.402692972", f.fb.value.trim() || "-");
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
        '<a class="zg-b zg-wa" id="zgWa" href="https://wa.me/' + num + "?text=" + encodeURIComponent(msg) + '" target="_blank" rel="noopener">SEND TO MY WHATSAPP</a>' +
        '<p class="zg-n">Tap the green button, then tap Send in WhatsApp to save your login details.</p>' +
        '<button type="button" class="zg-b blue" id="zgGo">OPEN ZEST APP</button></div>';
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
