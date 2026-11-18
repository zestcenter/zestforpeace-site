/* ZEST APP – Medical Help pages (Blood Bank, Medical Equipment). Preview only: submit is disabled. */
(function () {
  var ML = true; /* inner pages: Malayalam first, "English" switch in header */
  function T(m, e) { return ML ? m : e; }
  var WA = '<svg viewBox="0 0 24 24" fill="#fff"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-3.3-.8-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.3 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.7 1.2 1.6 2 1.1 1 2 1.3 2.3 1.4.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.2.1.7-.1 1.2Z"/></svg>';
  function places() { return [T("കോട്ടെമ്പ്രം", "Kottembram"), T("കോടഞ്ചേരി", "Kodencheri"), T("വെള്ളൂർ", "Velloor"), T("മറ്റുള്ളവ", "Other")]; }
  var CSS = '#zmed{position:fixed;inset:0;z-index:2147483600;background:#f3f8fb;overflow:auto;font-family:Inter,"Noto Sans Malayalam",sans-serif;color:#14232c;-webkit-overflow-scrolling:touch;animation:zmIn .25s ease}' +
    '@keyframes zmIn{from{transform:translateX(30px);opacity:0}to{transform:none;opacity:1}}' +
    '#zmed .hd{position:sticky;top:0;z-index:2;background:#fff;padding:12px 14px;display:flex;align-items:center;gap:12px;border-bottom:1px solid #e2ecf3}' +
    '#zmed .bk{width:36px;height:36px;border-radius:11px;border:0;background:#eef6fb;color:#0b5d8f;font:700 18px Inter,sans-serif;cursor:pointer}#zmed .hd b{font-size:16px}' +
    '#zmed .hd b{flex:1;min-width:0;line-height:1.35}#zmed .lsw{display:inline-flex;align-items:center;gap:7px;flex:none;padding:4px 0;border:0;background:none;cursor:pointer;font:700 11.5px/1 Inter,sans-serif;color:#6a8796}#zmed .lsw .sw{position:relative;width:36px;height:21px;border-radius:999px;background:#c9d6de;transition:background .2s}#zmed .lsw .sw i{position:absolute;top:2.5px;left:2.5px;width:16px;height:16px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.25);transition:left .2s}#zmed .lsw.en{color:#1380b8}#zmed .lsw.en .sw{background:#1380b8}#zmed .lsw.en .sw i{left:17.5px}' +
'#zmed .mh{position:relative;padding:34px 22px 24px;background:linear-gradient(160deg,#0b3d5c,#1380b8 65%,#3fa7d6);color:#fff;border-radius:0 0 28px 28px;text-align:center;overflow:hidden}#zmed .mh::after{content:"";position:absolute;right:-50px;top:-50px;width:170px;height:170px;border-radius:50%;background:rgba(255,255,255,.08)}#zmed .mh .cap{display:grid;place-items:center;width:58px;height:58px;margin:0 auto;border-radius:18px;background:rgba(255,255,255,.16);font-size:30px}#zmed .mh h2{margin:12px 0 4px;font:800 22px Inter,"Noto Sans Malayalam",sans-serif;color:#fff}#zmed .mh p{margin:0;font:600 12.5px Inter,"Noto Sans Malayalam",sans-serif;color:#cfe6f5}#zmed .mh .bk{position:absolute;right:14px;top:14px;z-index:2;width:38px;height:38px;border-radius:50%;border:0;background:rgba(255,255,255,.16);color:#fff;font:700 17px Inter,sans-serif;cursor:pointer}#zmed .mh .lsw{position:absolute;left:16px;top:18px;z-index:2;padding:6px 10px;border-radius:999px;background:rgba(255,255,255,.16);color:#fff}#zmed .mh .lsw .sw{background:rgba(255,255,255,.35)}#zmed .mh .lsw.en{color:#fff}#zmed .mh .lsw.en .sw{background:#3fa7d6}' +
    '#zmed .soon{margin:12px 14px 0;background:#fff4d6;color:#7a5a00;border-radius:12px;padding:9px 12px;font-size:12px;text-align:center;font-weight:600}' +
    '#zmed .mhr{margin:16px 18px 12px;padding:0 0 0 12px;border-left:4px solid #3fa7d6}#zmed .mhr h3{font-size:16px;margin:0;color:#0b3d5c}#zmed .mhr p{font-size:12.5px;color:#5d707c;margin:3px 0 0;line-height:1.55}' +
    '#zmed .tb{display:flex;gap:6px;margin:0 14px 10px;background:#e6eef3;border-radius:14px;padding:4px}#zmed .tb button{flex:1;border:0;background:none;padding:9px 4px;border-radius:11px;font:600 13px Inter,"Noto Sans Malayalam",sans-serif;color:#5d707c;cursor:pointer}#zmed .tb .on{background:#fff;color:#0f7d58;font-weight:800;box-shadow:0 2px 6px rgba(0,0,0,.08)}' +
    '#zmed .lb{font-size:12.5px;color:#0b5d8f;font-weight:700;margin:12px 14px 7px}' +
    '#zmed .g{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:0 14px}' +
    '#zmed .t{position:relative;background:#fff;border-radius:14px;padding:10px 4px 9px;text-align:center;font:500 11px/1.3 Inter,"Noto Sans Malayalam",sans-serif;box-shadow:0 2px 0 #e3eaef;border:2px solid transparent;cursor:pointer;color:#14232c}' +
    '#zmed .t i{display:grid;place-items:center;width:40px;height:40px;margin:0 auto 5px;border-radius:50%;font-style:normal;font-size:20px}' +
    '#zmed .t.sel{border-color:#0f7d58;background:#f0fbf5}#zmed .t.sel:after{content:"\\2713";position:absolute;top:5px;right:6px;width:16px;height:16px;border-radius:50%;background:#0f7d58;color:#fff;font:800 10px/16px Inter,sans-serif}' +
    '#zmed .f{margin:0 14px}#zmed input{width:100%;box-sizing:border-box;background:#fff;border:1.5px solid #dde6ee;border-radius:12px;padding:11px 12px;font:500 14px Inter,"Noto Sans Malayalam",sans-serif;color:#14232c;margin-bottom:8px;outline:none}#zmed input:focus{border-color:#1380b8}' +
    '#zmed .row{display:flex;gap:8px}#zmed .row input{flex:1;min-width:0}' +
    '#zmed .ch{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px}#zmed .ch button{background:#fff;border:1.5px solid #dde6ee;border-radius:999px;padding:7px 12px;font:500 12px Inter,"Noto Sans Malayalam",sans-serif;color:#14232c;cursor:pointer}#zmed .ch .on{background:#0b5d8f;color:#fff;border-color:#0b5d8f}' +
    '#zmed .bg{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin-bottom:8px}#zmed .bg button{border:1.5px solid #dde6ee;background:#fff;border-radius:11px;padding:10px 0;font:800 15px Inter,sans-serif;color:#33434d;cursor:pointer}#zmed .bg .on{background:#0b5d8f;border-color:#0b5d8f;color:#fff}#zmed .bg .u{grid-column:span 4;font:600 13px Inter,"Noto Sans Malayalam",sans-serif}' +
    '#zmed .go{margin:14px 14px 0;width:calc(100% - 28px);display:flex;align-items:center;justify-content:center;gap:9px;border:0;background:#25d366;color:#fff;border-radius:14px;padding:13px;font:800 14px Inter,"Noto Sans Malayalam",sans-serif;cursor:pointer;opacity:.55}#zmed .go svg{width:20px;height:20px}' +
    '#zmed .go.gr{background:#1f9d55}#zmed .nt{text-align:center;font-size:11.5px;color:#7a8b96;margin:8px 14px 30px;line-height:1.5}' +
    '#zmed .q{margin:4px 14px 0;background:#fff;border-radius:18px;padding:16px;text-align:center;box-shadow:0 2px 0 #e3eaef}#zmed .q h4{margin:6px 0 4px;font-size:16px;line-height:1.5;color:#0b3d5c}#zmed .q p{margin:0;font-size:12.5px;color:#5d707c}#zmed .q .dr{font-size:30px}' +
    '#zmed .yn{display:flex;gap:8px;margin-top:12px}#zmed .yn button{flex:1;border:0;border-radius:12px;padding:11px;font:800 14px Inter,"Noto Sans Malayalam",sans-serif;cursor:pointer;background:#eef3f7;color:#3b4c57}#zmed .yn .y{background:#1f9d55;color:#fff}' +
    '#zmed .pv{font-size:11.5px;color:#7a8b96;text-align:center;margin:10px 14px 0}' +
    '.zmt{position:fixed;left:50%;bottom:90px;transform:translateX(-50%);z-index:2147483647;background:#0b3d5c;color:#fff;padding:10px 18px;border-radius:999px;font:700 13px Inter,"Noto Sans Malayalam",sans-serif;box-shadow:0 8px 20px rgba(0,0,0,.25);text-align:center;max-width:86vw}';

  function toast(m) { var t = document.createElement("div"); t.className = "zmt"; t.textContent = m; document.body.appendChild(t); setTimeout(function () { t.remove(); }, 2200); }
  function chips(list, cls) { return '<div class="ch ' + (cls || "") + '">' + list.map(function (p, i) { return '<button type="button"' + (i === 0 ? ' class="on"' : '') + '>' + p + '</button>'; }).join("") + '</div>'; }
  function single(root) { root.querySelectorAll(".ch,.bg").forEach(function (g) { if (g.classList.contains("multi")) return; g.addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; g.querySelectorAll("button").forEach(function (x) { x.classList.toggle("on", x === b); }); }); }); }
  function soon() { return T("ഈ സേവനം ഉടൻ തുടങ്ങും 🙂 ഇപ്പോൾ കാണാൻ മാത്രം", "This service starts soon 🙂 Preview only"); }

  function items() { return [["🦽", T("വീൽചെയർ", "Wheelchair"), "#e3f1fa"], ["🛏️", T("ആശുപത്രി കട്ടിൽ", "Hospital bed"), "#efe9fd"], ["🚶", T("വാക്കർ", "Walker"), "#fff1e2"], ["🩼", T("ക്രച്ചസ്", "Crutches"), "#ffe9ef"], ["🫁", T("ഓക്സിജൻ മെഷീൻ", "Oxygen machine"), "#e6f3fb"], ["🪑", T("കമ്മോഡ് ചെയർ", "Commode chair"), "#e8f7ef"], ["🌡️", T("BP / ഷുഗർ മെഷീൻ", "BP / Sugar meter"), "#fff1e2"], ["💨", T("നെബുലൈസർ", "Nebuliser"), "#efe9fd"], ["➕", T("മറ്റുള്ളവ", "Other"), "#eef2f5"]]; }

  function eqPage(tab) {
    var need = tab !== "give";
    return '<div class="mhr"><h3>' + T("നാട്ടുകാർ നാട്ടുകാർക്ക്", "Neighbours helping neighbours") + '</h3><p>' + T("വീട്ടിൽ ഉപയോഗിക്കാത്ത ചികിത്സാ ഉപകരണങ്ങൾ ആവശ്യക്കാർക്ക് എത്തിക്കാം", "Pass unused medical equipment to those who need it") + '</p></div>' +
      '<div class="tb"><button type="button" data-tab="need"' + (need ? ' class="on"' : '') + '>🙏 ' + T("എനിക്ക് വേണം", "I need") + '</button><button type="button" data-tab="give"' + (!need ? ' class="on"' : '') + '>🤝 ' + T("എനിക്ക് കൊടുക്കാം", "I can give") + '</button></div>' +
      '<div class="lb">' + (need ? T("ഏത് ഉപകരണമാണ് വേണ്ടത്?", "Which equipment do you need?") : T("നിങ്ങളുടെ കയ്യിൽ ഉള്ളത് (ഒന്നിൽ കൂടുതൽ തിരഞ്ഞെടുക്കാം)", "What do you have? (pick one or more)")) + '</div>' +
      '<div class="g' + (need ? '' : ' multi') + '">' + items().map(function (x) { return '<button type="button" class="t"><i style="background:' + x[2] + '">' + x[0] + '</i>' + x[1] + '</button>'; }).join("") + '</div>' +
      '<div class="lb">' + T("വിവരങ്ങൾ", "Details") + '</div><div class="f">' +
      (need ? '<div class="row"><input placeholder="📅 ' + T("ഏത് തീയതി മുതൽ", "From date") + '"><input placeholder="⏳ ' + T("എത്ര ദിവസം", "How long") + '"></div>'
            : chips([T("സൗജന്യമായി കൊടുക്കാം", "Give for free"), T("കുറച്ച് ദിവസത്തേക്ക് മാത്രം", "Lend for a few days")])) +
      chips(places()) + '<input type="tel" inputmode="tel" placeholder="📱 ' + T("മൊബൈൽ നമ്പർ", "Mobile number") + '"></div>' +
      '<button type="button" class="go">' + WA + (need ? T("WhatsApp വഴി ആവശ്യപ്പെടൂ", "Request on WhatsApp") : T("WhatsApp വഴി അറിയിക്കൂ", "Tell us on WhatsApp")) + '</button>' +
      '<p class="nt">' + soon() + '</p>';
  }

  function bloodPage() {
    var G = ["A+", "A−", "B+", "B−", "O+", "O−", "AB+", "AB−"];
    return '<div class="mhr"><h3>' + T("നാട്ടുകാരുടെ രക്തദാന കൂട്ടായ്മ", "Our village blood donors") + '</h3><p>' + T("നാട്ടിൽ അടിയന്തരമായി രക്തം വേണ്ടി വരുമ്പോൾ സഹായിക്കാൻ തയ്യാറുള്ളവരുടെ കൂട്ടായ്മ", "Neighbours ready to donate blood in local emergencies") + '</p></div>' +
      '<div class="q"><div class="dr">🩸</div><h4>' + T("നമ്മുടെ നാട്ടിലെ ഒരാൾക്ക് പെട്ടെന്ന് രക്തം ആവശ്യമായി വന്നാൽ, കൊടുക്കാൻ നിങ്ങൾ തയ്യാറാണോ?", "If someone in our village urgently needs blood, are you ready to donate?") + '</h4><p>' + T("നിങ്ങളുടെ ഒരു തീരുമാനം ഒരു ജീവൻ രക്ഷിച്ചേക്കാം", "Your decision could save a life") + '</p>' +
      '<div class="yn"><button type="button" class="y">✅ ' + T("അതെ, തയ്യാറാണ്", "Yes, I'm ready") + '</button><button type="button">' + T("ഇല്ല", "No") + '</button></div></div>' +
      '<div class="lb">' + T("നിങ്ങളുടെ വിവരങ്ങൾ", "Your details") + '</div><div class="f">' +
      '<input placeholder="' + T("പേര്", "Name") + '"><input placeholder="' + T("വീട്ടുപേര്", "House name") + '"><input type="tel" inputmode="tel" placeholder="📱 ' + T("ഫോൺ നമ്പർ", "Phone number") + '">' +
      '</div><div class="lb">' + T("സ്ഥലം", "Place") + '</div><div class="f">' + chips(places()) + '</div>' +
      '<div class="lb">' + T("അവസാനമായി രക്തം കൊടുത്തത്", "Last donated") + '</div><div class="f">' + chips([T("3 മാസത്തിനുള്ളിൽ", "Within 3 months"), T("3 മാസത്തിന് മുൻപ്", "Over 3 months ago"), T("ഇതുവരെ കൊടുത്തിട്ടില്ല", "Never")]) + '</div>' +
      '<div class="lb">' + T("ബ്ലഡ് ഗ്രൂപ്പ്", "Blood group") + '</div><div class="f"><div class="bg">' + G.map(function (g) { return '<button type="button">' + g + '</button>'; }).join("") + '<button type="button" class="u">' + T("അറിയില്ല", "Don't know") + '</button></div></div>' +
      '<button type="button" class="go gr">✅ ' + T("സമർപ്പിക്കൂ", "Submit") + '</button>' +
      '<p class="pv">🔒 ' + T("(ഈ വിവരങ്ങൾ അഡ്മിന് മാത്രമേ കാണാൻ സാധിക്കൂ)", "(Only ZEST admins can see these details)") + '</p><p class="nt">' + soon() + '</p>';
  }

  function open(which) {
    if (!document.getElementById("zmed-css")) { var s = document.createElement("style"); s.id = "zmed-css"; s.textContent = CSS; document.head.appendChild(s); }
    var old = document.getElementById("zmed"); if (old) old.remove();
    var w = document.createElement("div"); w.id = "zmed"; w.setAttribute("data-noi18n", "");
    ML = true; var cur = "need";
    function render(tab) {
      cur = tab;
      var title = which === "blood" ? "🩸 " + T("ബ്ലഡ് ബാങ്ക്", "Blood Bank") : "🦽 " + T("മെഡിക്കൽ ഉപകരണങ്ങൾ", "Medical Equipment");
      var cap = which === "blood" ? "🩸" : "🦽", sub = which === "blood" ? T("അടിയന്തര ഘട്ടത്തിൽ ഒരു ജീവൻ രക്ഷിക്കാം", "Save a life in an emergency") : T("ആവശ്യക്കാർക്ക് ചികിത്സാ ഉപകരണങ്ങൾ", "Medical equipment for those in need");
      w.innerHTML = '<div class="mh"><button type="button" class="bk" aria-label="Back">✕</button><button type="button" class="lsw' + (ML ? '' : ' en') + '" role="switch" aria-checked="' + (!ML) + '">English <span class="sw"><i></i></span></button><span class="cap">' + cap + '</span><h2>' + title.replace(/^\S+\s/, "") + '</h2><p>' + sub + '</p></div><div class="soon">👀 ' + T("ഇത് ഇപ്പോൾ കാണാൻ മാത്രം – ഉടൻ തുടങ്ങും", "Preview – this service starts soon") + '</div>' + (which === "blood" ? bloodPage() : eqPage(tab));
      w.querySelector(".bk").onclick = close;
      w.querySelector(".lsw").onclick = function () { var y = w.scrollTop; ML = !ML; render(cur); w.scrollTop = y; };
      single(w);
      var g = w.querySelector(".g"); if (g) g.addEventListener("click", function (e) { var b = e.target.closest(".t"); if (!b) return; if (g.classList.contains("multi")) b.classList.toggle("sel"); else g.querySelectorAll(".t").forEach(function (x) { x.classList.toggle("sel", x === b); }); });
      w.querySelectorAll(".tb button").forEach(function (b) { b.onclick = function () { render(b.dataset.tab); w.scrollTop = 0; }; });
      w.querySelectorAll(".go,.yn button").forEach(function (b) { b.onclick = function () { toast(soon()); }; });
    }
    render("need");
    document.body.appendChild(w);
    try { history.pushState({ zmed: 1 }, ""); } catch (e) {}
    window.addEventListener("popstate", onPop);
  }
  function onPop() { var w = document.getElementById("zmed"); if (w) w.remove(); window.removeEventListener("popstate", onPop); }
  function close() { if (history.state && history.state.zmed) history.back(); else onPop(); }
  window.ZestMed = { open: open };
})();
