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
    '#zmed .hd b{flex:1;min-width:0;line-height:1.35}#zmed .lsw{position:absolute;left:16px;top:18px;z-index:2;display:inline-flex;align-items:center;gap:6px;padding:5px 7px 5px 9px;border-radius:10px;border:0;background:#e3f2fb;color:#0b5d8f;cursor:pointer;font:800 11.5px/1 Inter,sans-serif;box-shadow:0 2px 6px rgba(0,0,0,.12)}#zmed .lsw .sw{position:relative;width:32px;height:19px;border-radius:999px;background:#b9dcef;transition:background .2s}#zmed .lsw .sw i{position:absolute;top:2px;left:2px;width:15px;height:15px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.25);transition:left .2s}#zmed .lsw.en{color:#0b5d8f}#zmed .lsw.en .sw{background:#1380b8}#zmed .lsw.en .sw i{left:15px}' +
'#zmed .mh{position:relative;padding:34px 22px 24px;background:linear-gradient(160deg,#0b3d5c,#1380b8 65%,#3fa7d6);color:#fff;border-radius:0 0 28px 28px;text-align:center;overflow:hidden}#zmed .mh::after{content:"";position:absolute;right:-50px;top:-50px;width:170px;height:170px;border-radius:50%;background:rgba(255,255,255,.08)}#zmed .mh .cap{display:grid;place-items:center;width:58px;height:58px;margin:0 auto;border-radius:18px;background:rgba(255,255,255,.16);font-size:30px}#zmed .mh .zhimg{position:relative;z-index:1;display:block;width:86%;max-width:360px;height:auto;aspect-ratio:780/320;margin:30px auto 0;border-radius:20px;box-shadow:0 10px 24px rgba(0,0,0,.25);border:3px solid rgba(255,255,255,.6);background:#e6f3fb}#zmed .mh h2{margin:12px 0 4px;font:800 22px Inter,"Noto Sans Malayalam",sans-serif;color:#fff}#zmed .mh p{margin:0;font:600 12.5px Inter,"Noto Sans Malayalam",sans-serif;color:#cfe6f5}#zmed .mh .bk{position:absolute;right:14px;top:14px;z-index:2;width:38px;height:38px;border-radius:50%;border:0;background:rgba(255,255,255,.16);color:#fff;font:700 17px Inter,sans-serif;cursor:pointer}' +
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
    '#zmed .fl{display:block;margin-bottom:10px}#zmed .fl>span:first-child{display:block;font:700 12px ' + '"Noto Sans Malayalam",Inter,sans-serif;color:#3c5566;margin:0 0 5px 2px}#zmed .fl em,#zmed .rqm{font-style:normal;color:#e0345c}#zmed .fl input{margin-bottom:0}' +
    '#zmed select{width:100%;box-sizing:border-box;-webkit-appearance:none;appearance:none;background:#fff url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27%3E%3Cpath d=%27M6 9l6 6 6-6%27 fill=%27none%27 stroke=%27%231380b8%27 stroke-width=%272.5%27/%3E%3C/svg%3E") no-repeat right 12px center/16px;border:1.5px solid #dde6ee;border-radius:12px;padding:11px 36px 11px 12px;font:500 14px Inter,"Noto Sans Malayalam",sans-serif;color:#14232c;outline:none}#zmed select:focus{border-color:#1380b8}' +
    '#zmed .r2{display:grid;grid-template-columns:1fr 1fr;gap:10px}#zmed .r2 .fl{min-width:0}#zmed .zpo{position:relative;display:block}#zmed .zpo input{padding-right:38px}#zmed .zpb{position:absolute;right:6px;top:50%;transform:translateY(-50%);width:28px;height:28px;border:0;border-radius:8px;background:#eef6fb;color:#1380b8;font:800 12px Inter,sans-serif;cursor:pointer}#zmed input[type=date]{min-height:44px}' +
    '#zmed .inv{border-color:#e0345c!important;background-color:#fff6f8!important}#zmed .g.inv{outline:2px dashed #e0345c;outline-offset:4px;border-radius:14px;background:none!important}#zmed [hidden]{display:none!important}' +
    '#zmed .tb button{white-space:nowrap;font-size:12.5px}' +
    '#zmed .ntb{margin:6px 14px 0;background:#eef7f1;border-radius:14px;padding:10px 12px}#zmed .ntb p{margin:3px 0;font:600 12px/1.55 "Noto Sans Malayalam",Inter,sans-serif;color:#2d5a43}' +
    '#zmed .go.eqg{width:-webkit-fit-content;width:fit-content;margin:16px auto 0;padding:11px 22px;font-size:13.5px;border-radius:999px;opacity:1;background:#25d366;box-shadow:0 6px 14px rgba(37,211,102,.3)}#zmed .go.eqg svg{width:18px;height:18px}' +
    '#zmed .zbq{margin:14px 14px 0;display:flex;align-items:center;gap:12px;background:#fff;border-radius:20px;padding:14px;box-shadow:0 2px 0 #e3eaef}#zmed .zbq .ic{flex:none;display:grid;place-items:center;width:52px;height:52px;border-radius:16px;background:linear-gradient(160deg,#ff5a7a,#d81b47);font-size:26px;box-shadow:0 6px 14px rgba(216,27,71,.3)}#zmed .zbq b{display:block;font:800 14px/1.45 "Noto Sans Malayalam",Inter,sans-serif;color:#0b3d5c}#zmed .zbq small{font:600 11.5px "Noto Sans Malayalam",Inter,sans-serif;color:#7a8b96}' +
    '#zmed .zbyn{display:flex;justify-content:center;gap:8px;margin:12px 14px 0}#zmed .zbyn button{border:1.5px solid #dde6ee;background:#fff;padding:7px 14px;border-radius:999px;font:700 12px "Noto Sans Malayalam",Inter,sans-serif;color:#4a5d69;cursor:pointer}#zmed .zbyn .on{background:linear-gradient(135deg,#22b573,#159a5c);border-color:#159a5c;color:#fff;box-shadow:0 4px 10px rgba(21,154,92,.25)}' +
    '#zmed .zbt{margin:18px 18px 8px;font:800 14px "Noto Sans Malayalam",Inter,sans-serif;color:#0b3d5c}#zmed .zbt em{font-style:normal;color:#e0345c}' +
    '#zmed .zbg{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;padding:2px 14px 4px}#zmed .zbg button{height:60px;border-radius:50% 50% 50% 50%/58% 58% 42% 42%;background:#fff;border:1.5px solid #f6c9d3;color:#c0254a;font:900 16px Inter,sans-serif;cursor:pointer;transition:transform .15s}#zmed .zbg button.on{background:linear-gradient(160deg,#ff5a7a,#d81b47);color:#fff;border-color:#d81b47;box-shadow:0 8px 16px rgba(216,27,71,.35);transform:scale(1.05)}#zmed .zbg.inv{outline:2px dashed #e0345c;outline-offset:2px;border-radius:14px}' +
    '#zmed .zbu{display:block;width:calc(100% - 28px);margin:8px 14px 0;text-align:center;border:1.5px dashed #e1c3cb;border-radius:12px;padding:9px;font:700 12.5px "Noto Sans Malayalam",Inter,sans-serif;color:#8a5562;background:#fff;cursor:pointer}#zmed .zbu.on{border-style:solid;border-color:#d81b47;background:#fff5f7;color:#c0254a}' +
    '#zmed .zbfs{padding:0 14px}#zmed .zbf{position:relative;display:flex;align-items:center;gap:8px;background:#fff;border-radius:14px;padding:0 12px;margin-bottom:8px;box-shadow:0 2px 0 #e3eaef}#zmed .zbf>i{font-style:normal;font-size:17px;flex:none}#zmed .zbf>em{font-style:normal;color:#e0345c;font-weight:800;flex:none}#zmed .zbf input,#zmed .zbf select{flex:1;min-width:0;margin:0;border:0!important;box-shadow:none;background-color:transparent!important;padding:12px 4px;font:500 14px Inter,"Noto Sans Malayalam",sans-serif}#zmed .zbf .zpc{flex:1;min-width:0}#zmed .zbf select{padding-right:26px!important;background-position:right 4px center!important;text-overflow:ellipsis}#zmed .zbf .zpo input{padding-right:34px}#zmed .zbf .zpb{right:0}#zmed .zbf:has(.inv){box-shadow:0 0 0 2px #e0345c;background:#fff6f8}#zmed .zbfs .r2{gap:8px}' +
    '#zmed .zbok{margin:16px 14px 0;background:#fff;border-radius:20px;padding:20px 16px;text-align:center;box-shadow:0 2px 0 #e3eaef;animation:zbIn .35s ease}@keyframes zbIn{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:none}}#zmed .zbk{display:grid;place-items:center;width:56px;height:56px;margin:0 auto;border-radius:50%;background:#e8f7ef;font-size:28px}#zmed .zbok h4{margin:12px 0 4px;font:800 15px/1.5 "Noto Sans Malayalam",Inter,sans-serif;color:#0b3d5c}#zmed .zbok p{margin:0 0 14px;font:600 11.5px/1.5 "Noto Sans Malayalam",Inter,sans-serif;color:#7a8b96}#zmed .zbmore{border:0;border-radius:999px;padding:11px 18px;background:#e6f3fb;color:#0b5d8f;font:800 13px "Noto Sans Malayalam",Inter,sans-serif;cursor:pointer}' +
    '#zmed .zbdl{margin:2px 4px 6px;font:700 12px "Noto Sans Malayalam",Inter,sans-serif;color:#3c5566}#zmed .zbnx{margin:-2px 4px 8px;font:700 12px "Noto Sans Malayalam",Inter,sans-serif;color:#0f7d58}#zmed .zbnx:empty{display:none}#zmed .zbd{animation:zbIn .3s ease}' +
    '#zmed .zbmc{position:relative;margin:14px 14px 0;border-radius:22px;padding:16px 18px 14px;color:#fff;background:linear-gradient(135deg,#e0345c,#a3123a 70%);box-shadow:0 12px 26px rgba(176,24,64,.32);overflow:hidden;animation:zbIn .35s ease}#zmed .zbmc:before{content:"";position:absolute;right:-30px;top:-40px;width:160px;height:160px;border-radius:50%;background:rgba(255,255,255,.1)}#zmed .zbmc.ok{background:linear-gradient(135deg,#22b573,#0f7d58 75%);box-shadow:0 12px 26px rgba(15,125,88,.3)}' +
    '#zmed .zbmc .t1{display:flex;justify-content:space-between;font:800 10.5px Inter,sans-serif;letter-spacing:.08em;opacity:.9}#zmed .zbmc .gg{position:absolute;right:18px;top:38px;font:900 44px/1 Inter,sans-serif;text-shadow:0 3px 10px rgba(0,0,0,.2)}#zmed .zbmc .nn{position:relative;margin-top:16px;font:800 18px "Noto Sans Malayalam",Inter,sans-serif;max-width:62%;overflow-wrap:anywhere}#zmed .zbmc .ll{margin-top:4px;font:600 12px "Noto Sans Malayalam",Inter,sans-serif;opacity:.92}#zmed .zbmc .pb{margin-top:14px;height:7px;border-radius:4px;background:rgba(255,255,255,.25);overflow:hidden}#zmed .zbmc .pb i{display:block;height:100%;border-radius:4px;background:#fff}#zmed .zbmc .nx{margin-top:7px;font:700 11.5px/1.5 "Noto Sans Malayalam",Inter,sans-serif;opacity:.95}#zmed .zbg{gap:6px 8px}#zmed .zbg button{position:relative;height:auto;padding:2px 0;border:0;border-radius:0;background:none;box-shadow:none;transform:none;color:#c0254a}#zmed .zbg button.on{background:none;border:0;box-shadow:none;transform:scale(1.06);color:#fff}#zmed .zbsv{display:block;width:52px;height:76px;margin:0 auto;overflow:visible}#zmed .zbsv .pt{fill:#dbe5ec}#zmed .zbsv .bd{fill:#fff;stroke:#f4b6c2;stroke-width:2.5}#zmed .zbsv .lqs{fill:#fde3e8}#zmed .zbsv .lqf{fill:#e0234a;opacity:0;transition:opacity .2s}#zmed .zbsv .hl{fill:#e6edf2}#zmed .zbsv .tb{stroke:#f4b6c2;stroke-width:3;stroke-linecap:round;fill:none}#zmed .zbg button svg{filter:drop-shadow(0 3px 5px rgba(11,61,92,.1))}#zmed .zbg button.on .zbsv .bd{stroke:#c8102e}#zmed .zbg button.on .zbsv .lqf{opacity:1}#zmed .zbg button.on .zbsv .pt{fill:#9fb3c1}#zmed .zbg button.on .zbsv .tb{stroke:#c8102e}#zmed .zbg button.on svg{filter:drop-shadow(0 7px 10px rgba(216,27,60,.4))}#zmed .zbg button b{position:absolute;left:0;right:0;top:41px;text-align:center;font:900 15px Inter,sans-serif;color:inherit;pointer-events:none}#zmed .zbag>div,#zmed .zbag>div.z{padding:2px 0 0!important;border:0!important;background:none!important}#zmed .zbag>div:not(.z):after{display:none}#zmed .zbag .bgi{position:relative;display:block;font-style:normal}#zmed .zbag .bgi .zbsv{width:46px;height:67px}#zmed .zbag .bgi b{position:absolute;left:0;right:0;top:36px;margin:0;font:900 13.5px Inter,sans-serif;color:#fff}#zmed .zbag div:not(.z) .zbsv .lqf{opacity:1}#zmed .zbag div:not(.z) .zbsv .bd{stroke:#e0234a}#zmed .zbag div:not(.z) .zbsv .tb{stroke:#e0234a}#zmed .zbag div.z .zbsv .bd{stroke:#d7e0e6}#zmed .zbag div.z .zbsv .lqs{fill:#eef2f5}#zmed .zbag div.z .zbsv .tb{stroke:#d7e0e6}#zmed .zbag div.z .bgi b{color:#a3b1ba}#zmed .zbag span{margin-top:2px}#zmed .zbmc .gg{top:30px;right:18px;width:44px;text-shadow:none}#zmed .zbmc .gg .zbsv{width:44px;height:64px}#zmed .zbmc .gg .zbsv .bd{fill:rgba(255,255,255,.18);stroke:#fff}#zmed .zbmc .gg .zbsv .lqs{fill:rgba(255,255,255,.28)}#zmed .zbmc .gg .zbsv .lqf{opacity:0}#zmed .zbmc .gg .zbsv .pt{fill:rgba(255,255,255,.8)}#zmed .zbmc .gg .zbsv .hl{fill:rgba(255,255,255,.5)}#zmed .zbmc .gg .zbsv .tb{stroke:#fff}#zmed .zbmc .gg b{position:absolute;left:0;right:0;top:31px;text-align:center;font:900 14px Inter,sans-serif;color:#fff}' +
    '#zmed .zbdn{display:flex;justify-content:center;margin:16px 0 0}#zmed .zbagain{border:0;padding:11px 20px;border-radius:999px;background:#fff;color:#c0183f;font:800 13px "Noto Sans Malayalam",Inter,sans-serif;box-shadow:0 0 0 1.5px #f6c9d3,0 6px 14px rgba(216,27,71,.12);cursor:pointer}#zmed .zblk{display:flex;justify-content:center;gap:14px;margin:12px 0 0}#zmed .zblk button,#zmed .zbcard{border:0;background:none;font:700 12px "Noto Sans Malayalam",Inter,sans-serif;color:#1380b8;cursor:pointer}#zmed .zbcard{margin-top:10px}' +
    '#zmed .zbold{display:flex;justify-content:center;margin:12px 0 0}#zmed .zbold button{border:0;background:#e6f3fb;color:#0b5d8f;border-radius:999px;padding:8px 14px;font:700 12px "Noto Sans Malayalam",Inter,sans-serif;cursor:pointer}' +
    '.zbs-bg{position:fixed;inset:0;z-index:2147483640;background:rgba(10,30,45,.45)}.zbs{position:fixed;left:0;right:0;bottom:0;z-index:2147483641;background:#fff;border-radius:24px 24px 0 0;padding:10px 18px 22px;font-family:"Noto Sans Malayalam",Inter,sans-serif;animation:zbUp .3s cubic-bezier(.2,.9,.3,1)}@keyframes zbUp{from{transform:translateY(100%)}to{transform:none}}' +
    '.zbs .gr{width:40px;height:4px;border-radius:2px;background:#d4e0e8;margin:0 auto 10px}.zbs .hh{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}.zbs h4{margin:0;font:800 16px "Noto Sans Malayalam",Inter,sans-serif;color:#0b3d5c}.zbs .x{width:32px;height:32px;border-radius:50%;border:0;background:#eef3f7;color:#3b4c57;font:700 14px Inter,sans-serif;cursor:pointer}.zbs p{margin:0 0 12px;font:600 12px/1.5 "Noto Sans Malayalam",Inter,sans-serif;color:#7a8b96}' +
    '.zbs .zbf{display:flex;align-items:center;gap:8px;border:1.5px solid #e1e9ef;border-radius:14px;padding:0 12px;margin-bottom:10px}.zbs .zbf i{font-style:normal;font-size:17px}.zbs .zbf em{font-style:normal;color:#e0345c;font-weight:800}.zbs .zbf input{flex:1;min-width:0;border:0;outline:none;background:transparent;padding:12px 4px;font:500 14px Inter,"Noto Sans Malayalam",sans-serif}.zbs .zbf:has(.inv){border-color:#e0345c;background:#fff6f8}.zbs .gn{margin:0 0 12px;font:700 12px "Noto Sans Malayalam",Inter,sans-serif;color:#0f7d58}.zbs .gn:empty{display:none}.zbs .bt{display:flex;justify-content:center}.zbs .sv{border:0;padding:12px 26px;border-radius:999px;background:linear-gradient(135deg,#22b573,#159a5c);color:#fff;font:800 14px "Noto Sans Malayalam",Inter,sans-serif;box-shadow:0 6px 14px rgba(21,154,92,.3);cursor:pointer}' +
    '#zmed .zbno{margin:14px;background:#eef6fb;border-radius:14px;padding:14px;text-align:center;font:700 13px/1.6 "Noto Sans Malayalam",Inter,sans-serif;color:#3c5566}' +
    '#zmed .go.zbgo{width:-webkit-fit-content;width:fit-content;margin:16px auto 0;padding:12px 24px;border-radius:999px;font-size:14px;background:linear-gradient(135deg,#22b573,#159a5c);opacity:1;box-shadow:0 6px 14px rgba(21,154,92,.3)}' +
    '#zmed .zbav{margin:14px 14px 0;background:#fff;border-radius:20px;padding:14px;box-shadow:0 2px 0 #e3eaef}#zmed .zbav h4{margin:0 0 4px;font:800 14.5px "Noto Sans Malayalam",Inter,sans-serif;color:#0b3d5c}#zmed .zbav p{margin:0 0 12px;font:600 11.5px "Noto Sans Malayalam",Inter,sans-serif;color:#7a8b96}' +
    '#zmed .zbag{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}#zmed .zbag div{position:relative;text-align:center;padding:12px 4px 10px;border-radius:16px;background:#fff5f7;border:1.5px solid #f6c9d3}#zmed .zbag b{display:block;font:900 16px Inter,sans-serif;color:#c0254a}#zmed .zbag span{display:block;margin-top:4px;font:800 12px "Noto Sans Malayalam",Inter,sans-serif;color:#0f7d58}#zmed .zbag div.z{background:#f6f8fa;border-color:#e3eaef}#zmed .zbag div.z b,#zmed .zbag div.z span{color:#a3b1ba}#zmed .zbag div:not(.z):after{content:"";position:absolute;top:7px;right:7px;width:7px;height:7px;border-radius:50%;background:#22b573;box-shadow:0 0 0 3px rgba(34,181,115,.2)}' +
    '#zmed .zbtot{display:flex;align-items:center;gap:10px;margin:12px 14px 0;background:linear-gradient(135deg,#effaf4,#e2f5ea);border-radius:16px;padding:12px 14px;font:700 12.5px/1.5 "Noto Sans Malayalam",Inter,sans-serif;color:#2d5a43}#zmed .zbtot b{font:900 22px Inter,sans-serif;color:#0f7d58}#zmed .zbtot small{font-weight:600;color:#5d7a69}' +
    '#zmed .zbhw{margin:12px 14px 0;background:#fff;border-radius:18px;padding:12px 14px;box-shadow:0 2px 0 #e3eaef}#zmed .zbhw h5{margin:0 0 8px;font:800 13px "Noto Sans Malayalam",Inter,sans-serif;color:#0b3d5c}#zmed .zbhw ol{margin:0;padding-left:18px;font:600 12.5px/1.7 "Noto Sans Malayalam",Inter,sans-serif;color:#3c5566}' +
    '.zmt{position:fixed;left:50%;bottom:90px;transform:translateX(-50%);z-index:2147483647;background:#0b3d5c;color:#fff;padding:10px 18px;border-radius:999px;font:700 13px Inter,"Noto Sans Malayalam",sans-serif;box-shadow:0 8px 20px rgba(0,0,0,.25);text-align:center;max-width:86vw}';

  function toast(m) { var t = document.createElement("div"); t.className = "zmt"; t.textContent = m; document.body.appendChild(t); setTimeout(function () { t.remove(); }, 2200); }
  function chips(list, cls) { return '<div class="ch ' + (cls || "") + '">' + list.map(function (p, i) { return '<button type="button"' + (i === 0 ? ' class="on"' : '') + '>' + p + '</button>'; }).join("") + '</div>'; }
  function single(root) { root.querySelectorAll(".ch,.bg").forEach(function (g) { if (g.classList.contains("multi")) return; g.addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; g.querySelectorAll("button").forEach(function (x) { x.classList.toggle("on", x === b); }); }); }); }
  function soon() { return T("ഈ സേവനം ഉടൻ തുടങ്ങും 🙂 ഇപ്പോൾ കാണാൻ മാത്രം", "This service starts soon 🙂 Preview only"); }

  function items() { return [["🦽", T("വീൽചെയർ", "Wheelchair"), "#e3f1fa"], ["🛏️", T("ആശുപത്രി കട്ടിൽ", "Hospital bed"), "#efe9fd"], ["🚶", T("വാക്കർ", "Walker"), "#fff1e2"], ["🩼", T("ക്രച്ചസ്", "Crutches"), "#ffe9ef"], ["🫁", T("ഓക്സിജൻ മെഷീൻ", "Oxygen machine"), "#e6f3fb"], ["🪑", T("കമ്മോഡ് ചെയർ", "Commode chair"), "#e8f7ef"], ["🌡️", T("BP / ഷുഗർ മെഷീൻ", "BP / Sugar meter"), "#fff1e2"], ["💨", T("നെബുലൈസർ", "Nebuliser"), "#efe9fd"], ["➕", T("മറ്റുള്ളവ", "Other"), "#eef2f5"]]; }

  var VAL = {}, SEL = { need: [], give: [] }, EXTRA = [];
  try { EXTRA = JSON.parse(localStorage.getItem("zestEqExtra") || "[]"); } catch (e) {}
  function fld(name, label, html) { return '<label class="fl"><span>' + label + ' <em>*</em></span>' + html + '</label>'; }
  function inp(name, type, ph, extra) { return '<input name="' + name + '" type="' + type + '" placeholder="' + ph + '" value="' + (VAL[name] || "").replace(/"/g, "&quot;") + '"' + (extra || "") + '>'; }
  function sel(name, opts) { return '<select name="' + name + '"><option value="">' + T("തിരഞ്ഞെടുക്കൂ", "Choose") + '</option>' + opts.map(function (o) { return '<option value="' + o[0] + '"' + (VAL[name] === o[0] ? " selected" : "") + '>' + o[1] + '</option>'; }).join("") + '</select>'; }
  function eqItems(need) { var it = items(), oth = it.pop(); if (!need) EXTRA.forEach(function (x) { it.push(["📦", x, "#f1f4f7"]); }); it.push(oth); return it; }
  function placeCell(pl) { return VAL.p === "other" ? '<span class="zpo">' + inp("po", "text", T("സ്ഥലം എഴുതൂ", "Type place")) + '<button type="button" class="zpb" aria-label="Back to list">▾</button></span>' : sel("p", pl); }
  function eqPage(tab) {
    var need = tab !== "give", it = eqItems(need), sl = SEL[need ? "need" : "give"], othOn = sl.indexOf(it.length - 1) > -1;
    var pl = places().map(function (p, i) { return [i === 3 ? "other" : p, p]; });
    var today = new Date(), iso = today.getFullYear() + "-" + ("0" + (today.getMonth() + 1)).slice(-2) + "-" + ("0" + today.getDate()).slice(-2);
    return '<div class="mhr"><h3>' + T("നാട്ടുകാർ നാട്ടുകാർക്ക്", "Neighbours helping neighbours") + '</h3><p>' + T("വീട്ടിൽ ഉപയോഗിക്കാത്ത ചികിത്സാ ഉപകരണങ്ങൾ ആവശ്യക്കാർക്ക് എത്തിക്കാം", "Pass unused medical equipment to those who need it") + '</p></div>' +
      '<div class="tb"><button type="button" data-tab="need"' + (need ? ' class="on"' : '') + '>🙏 ' + T("എനിക്ക് വേണം", "I need") + '</button><button type="button" data-tab="give"' + (!need ? ' class="on"' : '') + '>🤝 ' + T("ഞാൻ കൊടുക്കാം", "I can give") + '</button></div>' +
      '<div class="lb">' + (need ? T("ഏത് ഉപകരണമാണ് വേണ്ടത്?", "Which equipment do you need?") : T("നിങ്ങളുടെ കയ്യിൽ ഉള്ളത് (ഒന്നിൽ കൂടുതൽ തിരഞ്ഞെടുക്കാം)", "What do you have? (pick one or more)")) + ' <em class="rqm">*</em></div>' +
      '<div class="g' + (need ? '' : ' multi') + '">' + it.map(function (x, i) { return '<button type="button" class="t' + (sl.indexOf(i) > -1 ? ' sel' : '') + '" data-i="' + i + '"><i style="background:' + x[2] + '">' + x[0] + '</i>' + x[1] + '</button>'; }).join("") + '</div>' +
      '<div class="f oth"' + (othOn ? '' : ' hidden') + '>' + fld("oth", T("ഏത് ഉപകരണം?", "Which equipment?"), inp(need ? "othN" : "othG", "text", T("ഉപകരണത്തിന്റെ പേര് എഴുതൂ", "Type the equipment name"))) + '</div>' +
      '<div class="lb">' + T("നിങ്ങളുടെ വിവരങ്ങൾ", "Your details") + '</div><div class="f">' +
      fld("n", T("പേര്", "Name"), inp("n", "text", T("നിങ്ങളുടെ പേര്", "Your name"))) +
      fld("h", T("വീട്ടുപേര്", "House name"), inp("h", "text", T("വീട്ടുപേര്", "House name"))) +
      '<div class="r2">' + fld("p", T("സ്ഥലം", "Place"), '<span class="zpc">' + placeCell(pl) + '</span>') +
      fld("m", T("മൊബൈൽ നമ്പർ", "Mobile number"), inp("m", "tel", T("10 അക്ക നമ്പർ", "10-digit number"), ' inputmode="tel" maxlength="13"')) + '</div>' +
      (need ? '<div class="r2">' + fld("d", T("ആവശ്യമുള്ള തീയതി", "Date needed"), inp("d", "date", "", ' min="' + iso + '"')) + fld("dd", T("എത്ര ദിവസത്തേക്ക്", "For how many days"), inp("dd", "number", T("ഉദാ: 10", "e.g. 10"), ' inputmode="numeric" min="1"')) + '</div>'
            : fld("how", T("എങ്ങനെ കൊടുക്കാം", "How will you give"), sel("how", [["full", T("പൂർണമായും കൊടുക്കാം", "Give it away")], ["lend", T("കുറച്ച് ദിവസത്തേക്ക് കൊടുക്കാം", "Lend for a few days")]]))) +
      '</div><div class="ntb">' + (need ? '<p>🔍 ' + T("ലഭിക്കുന്ന ഉപകരണങ്ങൾ പൂർണമായും പരിശോധിച്ചതിന് ശേഷം മാത്രം കൈപ്പറ്റുക.", "Check the equipment fully before you accept it.") + '</p>' : '') +
      '<p>💚 ' + T("ZEST App-ലൂടെയുള്ള ഈ കൈമാറ്റം തീർത്തും സൗജന്യമായിരിക്കും.", "This exchange through the ZEST App is completely free.") + '</p></div>' +
      '<button type="button" class="go eqg">' + WA + (need ? T("ZEST CENTRE-ൽ അന്വേഷിക്കാം", "Ask ZEST Centre") : T("ZEST CENTRE-ൽ അറിയിക്കാം", "Tell ZEST Centre")) + '</button>' +
      '<p class="nt">' + soon() + '</p>';
  }
  function eqWire(w, tab, rerender) {
    var need = tab !== "give", key = need ? "need" : "give", g = w.querySelector(".g"), last = g.querySelectorAll(".t").length - 1;
    var pl = places().map(function (p, i) { return [i === 3 ? "other" : p, p]; });
    function bind(root) { root.querySelectorAll("input,select").forEach(function (el) { el.addEventListener("input", function () { VAL[el.name] = el.value; el.classList.remove("inv"); }); el.addEventListener("change", function () { VAL[el.name] = el.value; el.classList.remove("inv"); if (el.name === "p" && el.value === "other") swapPlace(true); }); });
      var pb = root.querySelector(".zpb"); if (pb) pb.onclick = function () { VAL.p = ""; VAL.po = ""; swapPlace(false); }; }
    function swapPlace(focus) { var pc = w.querySelector(".zpc"); pc.innerHTML = placeCell(pl); bind(pc); if (focus) { var i = pc.querySelector("input"); if (i) i.focus(); } }
    bind(w.querySelector(".f.oth")); w.querySelectorAll(".f").forEach(function (f) { if (!f.classList.contains("oth")) bind(f); });
    g.addEventListener("click", function (e) { var b = e.target.closest(".t"); if (!b) return; var i = +b.dataset.i, sl = SEL[key];
      if (need) { SEL[key] = sl[0] === i ? [] : [i]; } else { var p = sl.indexOf(i); if (p > -1) sl.splice(p, 1); else sl.push(i); }
      g.querySelectorAll(".t").forEach(function (x) { x.classList.toggle("sel", SEL[key].indexOf(+x.dataset.i) > -1); });
      g.classList.remove("inv"); w.querySelector(".oth").hidden = SEL[key].indexOf(last) < 0; });
    w.querySelector(".eqg").onclick = function () {
      var bad = null;
      if (!SEL[key].length) { g.classList.add("inv"); bad = bad || g; }
      w.querySelectorAll(".f input,.f select").forEach(function (el) { if (el.closest("[hidden]")) return; var v = (el.value || "").trim(), ok = !!v;
        if (ok && el.name === "m") ok = v.replace(/\D/g, "").length >= 10; if (ok && el.name === "dd") ok = +v > 0;
        if (!ok) { el.classList.add("inv"); bad = bad || el; } });
      if (bad) { bad.scrollIntoView({ behavior: "smooth", block: "center" }); toast(T("എല്ലാ വിവരങ്ങളും പൂരിപ്പിക്കൂ", "Please fill in all the details")); return; }
      if (need && SEL[key].indexOf(last) > -1 && VAL.othN && EXTRA.indexOf(VAL.othN.trim()) < 0) { EXTRA.push(VAL.othN.trim()); try { localStorage.setItem("zestEqExtra", JSON.stringify(EXTRA)); } catch (e) {} }
      toast(soon());
    };
  }
  var BLOOD_LIVE = false; /* set true when the blood service starts – "Need blood" then opens WhatsApp to the main ZEST number */
  var BST = { ready: 1, grp: "", done: 0 };
  function bagSvg() { return '<svg class="zbsv" viewBox="0 0 58 84" aria-hidden="true"><rect class="pt" x="22" y="2" width="14" height="10" rx="3"/><rect class="bd" x="4" y="10" width="50" height="62" rx="14"/><rect class="lqs" x="9" y="44" width="40" height="23" rx="10"/><rect class="lqf" x="9" y="24" width="40" height="43" rx="10"/><rect class="hl" x="14" y="16" width="20" height="3" rx="1.5"/><path class="tb" d="M29 72 V82"/></svg>'; }
  var BCOUNT = { "A+": 3, "A−": 0, "B+": 2, "B−": 1, "O+": 2, "O−": 0, "AB+": 1, "AB−": 0 }; /* sample numbers – will come from the Google Sheet */
  function ifl(icon, html, dd) { return '<label class="zbf' + (dd ? ' dd' : '') + '"><i>' + icon + '</i>' + html + '<em>*</em></label>'; }
  function bPlace() { var pl = places().map(function (p, i) { return [i === 3 ? "other" : p, p]; });
    return VAL.bp === "other" ? '<span class="zpo">' + inp("bpo", "text", T("സ്ഥലം എഴുതൂ", "Type place")) + '<button type="button" class="zpb" aria-label="Back to list">▾</button></span>' : sel("bp", pl).replace(T("തിരഞ്ഞെടുക്കൂ", "Choose"), T("സ്ഥലം", "Place")); }
  function isoD(d) { return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }
  function nextTxt() { if (!VAL.bd) return ""; var d = new Date(VAL.bd); if (isNaN(d)) return ""; d.setMonth(d.getMonth() + 3);
    var f = ("0" + d.getDate()).slice(-2) + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear();
    return "💚 " + T(f + " മുതൽ നിങ്ങൾ തനിയെ 'ലഭ്യം' ആകും", "You will automatically show as available from " + f); }
  function getDonor() { try { return JSON.parse(localStorage.getItem("zestDonor") || "null"); } catch (e) { return null; } }
  function setDonor(d) { try { localStorage.setItem("zestDonor", JSON.stringify(d)); } catch (e) {} }
  function fmtD(d) { return ("0" + d.getDate()).slice(-2) + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear(); }
  function donorCard(d) {
    var last = d.bd ? new Date(d.bd) : null, nx = last ? new Date(last) : null; if (nx) nx.setMonth(nx.getMonth() + 3);
    var now = new Date(), ok = !nx || nx <= now, left = nx ? Math.ceil((nx - now) / 864e5) : 0, pct = last && !ok ? Math.max(4, Math.min(100, Math.round((now - last) / (nx - last) * 100))) : 100;
    return '<div class="zbmc' + (ok ? ' ok' : '') + '"><div class="t1"><span>🩸 ' + T("എന്റെ ഡോണർ കാർഡ്", "My donor card") + '</span><span>ZEST</span></div><div class="gg">' + bagSvg() + '<b>' + (d.g === "?" ? "?" : d.g) + '</b></div>' +
      '<div class="nn">' + String(d.n || "").replace(/</g, "&lt;") + '</div><div class="ll">' + T("അവസാനം കൊടുത്തത്: ", "Last donated: ") + (last ? fmtD(last) : T("—", "—")) + '</div>' +
      '<div class="pb"><i style="width:' + pct + '%"></i></div><div class="nx">' + (ok ? "💚 " + T("ഇന്ന് മുതൽ നിങ്ങൾക്ക് വീണ്ടും രക്തം നൽകാം", "You can donate blood again from today") : "⏳ " + (ML ? fmtD(nx) + " മുതൽ വീണ്ടും നൽകാം · " + left + " ദിവസം കൂടി" : "You can donate again from " + fmtD(nx) + " · " + left + " days left")) + '</div></div>' +
      '<div class="zbdn"><button type="button" class="zbagain">🩸 ' + T("ഞാൻ വീണ്ടും രക്തം കൊടുത്തു", "I donated again") + '</button></div>' +
      '<div class="zblk"><button type="button" class="zbadd">➕ ' + T("മറ്റൊരാളെ ചേർക്കാം", "Add someone else") + '</button><button type="button" class="zbedit">✏️ ' + T("വിവരങ്ങൾ മാറ്റാം", "Edit details") + '</button></div>' +
      '<p class="pv">🔒 ' + T("ഈ കാർഡ് നിങ്ങളുടെ ഫോണിൽ മാത്രം", "This card is saved only on your phone") + '</p>';
  }
  function rPlace() { var pl = places().map(function (p, i) { return [i === 3 ? "other" : p, p]; });
    return VAL.rp === "other" ? '<span class="zpo">' + inp("rpo", "text", T("സ്ഥലം എഴുതൂ", "Type place")) + '<button type="button" class="zpb" aria-label="Back to list">▾</button></span>' : sel("rp", pl).replace(T("തിരഞ്ഞെടുക്കൂ", "Choose"), T("സ്ഥലം", "Place")); }
  function bloodPage(tab) {
    var give = tab !== "need", G = ["A+", "A−", "B+", "B−", "O+", "O−", "AB+", "AB−"];
    var h = '<div class="tb"><button type="button" data-tab="give"' + (give ? ' class="on"' : '') + '>🩸 ' + T("രക്തം നൽകാം", "Give blood") + '</button><button type="button" data-tab="need"' + (!give ? ' class="on"' : '') + '>🙏 ' + T("രക്തം വേണം", "Need blood") + '</button></div>';
    if (!give) {
      var tot = 0; G.forEach(function (g) { tot += BCOUNT[g]; });
      return h + '<div class="zbav"><h4>🩸 ' + T("ഇപ്പോൾ ലഭ്യമായ രക്തദാതാക്കൾ", "Donors available now") + '</h4><p>' + T("ZEST-ൽ ചേർന്ന, ഇപ്പോൾ രക്തം നൽകാൻ കഴിയുന്നവരുടെ എണ്ണം", "Registered donors who can donate right now") + '</p><div class="zbag">' +
        G.map(function (g) { var n = BCOUNT[g]; return '<div' + (n ? '' : ' class="z"') + '><i class="bgi">' + bagSvg() + '<b>' + g + '</b></i><span>' + (n ? (ML ? n + " പേർ" : n + (n > 1 ? " donors" : " donor")) : T("ഇല്ല", "None")) + '</span></div>'; }).join("") + '</div></div>' +
        '<div class="zbtot"><b>' + tot + '</b><span>' + T("രക്തദാതാക്കൾ നാട്ടിൽ തയ്യാറാണ് 💚", "donors are ready in our village 💚") + '<br><small>' + T("പേരും നമ്പറും സുരക്ഷയ്ക്കായി കാണിക്കില്ല", "Names and numbers are kept private") + '</small></span></div>' +
        '<div class="zbt">🙏 ' + T("രക്തം ആവശ്യമുള്ള ആളുടെ വിവരങ്ങൾ", "Patient details") + '</div><div class="f zbfs zbneedf">' +
        ifl("🙂", inp("rn", "text", T("ആവശ്യമുള്ള ആളുടെ പേര്", "Patient name"))) + ifl("🏠", inp("rh", "text", T("വീട്ടുപേര്", "House name"))) +
        '<div class="r2">' + ifl("📍", '<span class="zpc">' + rPlace() + '</span>') + ifl("📱", inp("rm", "tel", T("മൊബൈൽ", "Mobile"), ' inputmode="tel" maxlength="13"')) + '</div>' +
        '<div class="r2">' + ifl("🩸", sel("rg", G.map(function (g) { return [g, g]; })).replace(T("തിരഞ്ഞെടുക്കൂ", "Choose"), T("ഗ്രൂപ്പ്", "Group"))) + ifl("🧪", inp("ru", "number", T("യൂണിറ്റ്", "Units"), ' inputmode="numeric" min="1" max="20"')) + '</div>' +
        '<div class="zbdl">' + T("ആവശ്യമുള്ള ദിവസം", "Date needed") + '</div>' + ifl("📅", inp("rd", "date", "", ' min="' + isoD(new Date()) + '"')) +
        ifl("🏥", inp("rhs", "text", T("രക്തം നൽകേണ്ട ഹോസ്പിറ്റൽ", "Hospital where blood is needed"))) + '</div>' +
        '<div class="zbhw"><h5>' + T("രക്തം വേണമെങ്കിൽ എന്ത് ചെയ്യണം?", "Need blood? Here's how") + '</h5><ol><li>' + T("താഴെയുള്ള ബട്ടൺ അമർത്തി ZEST CENTRE-നെ അറിയിക്കുക", "Tap the button below to tell ZEST Centre") + '</li><li>' + T("ZEST ലഭ്യമായ ദാതാക്കളെ ബന്ധപ്പെടും", "ZEST contacts available donors") + '</li><li>' + T("ദാതാവ് നിങ്ങളെ നേരിട്ട് വിളിക്കും", "A donor calls you directly") + '</li></ol></div>' +
        '<button type="button" class="go eqg zbneed">' + WA + T("ZEST CENTRE-നെ അറിയിക്കാം", "Tell ZEST Centre") + '</button><p class="nt">' + soon() + ' ' + T("(ഇപ്പോഴുള്ളത് മാതൃകാ എണ്ണം)", "(sample numbers)") + '</p>';
    }
    var dn = getDonor();
    if (dn && !BST.form) return h + donorCard(dn) + '<p class="nt">' + soon() + '</p>';
    return h + '<div class="zbq"><span class="ic">🩸</span><span><b>' + T("നാട്ടിലെ ഒരു ജീവന് നിങ്ങളുടെ രക്തം വേണ്ടി വന്നാൽ?", "If a life in our village needs your blood?") + '</b><small>' + T("ദാതാവായി ചേരാൻ 1 മിനിറ്റ് മതി", "Joining takes just 1 minute") + '</small></span></div>' +
      '<div class="zbyn"><button type="button" data-r="1"' + (BST.ready ? ' class="on"' : '') + '>✅ ' + T("ഞാൻ തയ്യാറാണ്", "I'm ready") + '</button><button type="button" data-r="0"' + (BST.ready ? '' : ' class="on"') + '>' + T("ഇപ്പോൾ ഇല്ല", "Not now") + '</button></div>' +
      (BST.ready && BST.done ? '<div class="zbok"><div class="zbk">✅</div><h4>' + T("നന്ദി! ഒരു ജീവൻ രക്ഷിക്കാൻ നിങ്ങളും തയ്യാർ 💚", "Thank you! You are ready to save a life 💚") + '</h4><p>' + T("(ഇത് മാതൃക മാത്രം – സേവനം തുടങ്ങുമ്പോഴാണ് വിവരങ്ങൾ ZEST-ലേക്ക് പോവുക)", "(Preview only – details are sent to ZEST once the service starts)") + '</p>' +
        '<button type="button" class="zbmore">➕ ' + T("വീട്ടിലെ മറ്റൊരാളെ കൂടി ചേർക്കാം", "Add another family member") + '</button><br><button type="button" class="zbcard">🩸 ' + T("എന്റെ ഡോണർ കാർഡ് കാണാം", "See my donor card") + '</button></div>' :
      BST.ready ?
      '<div class="zbt">🩸 ' + T("ബ്ലഡ് ഗ്രൂപ്പ്", "Blood group") + ' <em>*</em></div><div class="zbg">' + G.map(function (g) { return '<button type="button" data-g="' + g + '"' + (BST.grp === g ? ' class="on"' : '') + ' aria-label="' + g + '">' + bagSvg() + '<b>' + g + '</b></button>'; }).join("") + '</div>' +
      '<button type="button" class="zbu' + (BST.grp === "?" ? ' on' : '') + '" data-g="?">🤔 ' + T("അറിയില്ല", "Don't know") + '</button>' +
      '<div class="zbt">👤 ' + T("നിങ്ങളുടെ വിവരങ്ങൾ", "Your details") + '</div><div class="f zbfs">' +
      ifl("🙂", inp("n", "text", T("പേര്", "Name"))) + ifl("🏠", inp("h", "text", T("വീട്ടുപേര്", "House name"))) +
      '<div class="r2">' + ifl("📍", '<span class="zpc">' + bPlace() + '</span>') + ifl("📱", inp("m", "tel", T("മൊബൈൽ", "Mobile"), ' inputmode="tel" maxlength="13"')) + '</div>' +
      ifl("🗓️", sel("bl", [["lt3", T("3 മാസത്തിനുള്ളിൽ", "Within 3 months")], ["gt3", T("3 മാസത്തിന് മുമ്പ്", "Over 3 months ago")], ["never", T("ഇതുവരെ കൊടുത്തിട്ടില്ല", "Never")]]).replace(T("തിരഞ്ഞെടുക്കൂ", "Choose"), T("അവസാനമായി രക്തം കൊടുത്തത്", "Last donated"))) +
      '<div class="zbd"' + (VAL.bl === "lt3" ? '' : ' hidden') + '><div class="zbdl">' + T("ഏത് തീയതിയിലാണ് രക്തം കൊടുത്തത്?", "Which date did you donate?") + '</div>' + ifl("📅", inp("bd", "date", "", ' max="' + isoD(new Date()) + '" min="' + isoD(new Date(Date.now() - 92 * 864e5)) + '"')) + '<div class="zbnx">' + nextTxt() + '</div></div>' +
      '</div><button type="button" class="go zbgo">🩸 ' + T("രക്തദാതാവായി ചേരാം", "Join as a donor") + '</button>' +
      '<p class="pv">🔒 ' + T("ഈ വിവരങ്ങൾ ZEST അഡ്മിന് മാത്രമേ കാണാൻ കഴിയൂ", "Only ZEST admins can see these details") + '</p>'
      : '<div class="zbno">🙏 ' + T("ശരി, ഒരു പ്രശ്നവുമില്ല. എപ്പോഴെങ്കിലും തയ്യാറാകുമ്പോൾ ഇവിടെ വന്ന് ചേരാം.", "No problem. You can join here whenever you are ready.") + '</div>') +
      '<p class="nt">' + soon() + '</p>';
  }
  function bsheet(html) { var bg = document.createElement("div"); bg.className = "zbs-bg"; var sh = document.createElement("div"); sh.className = "zbs"; sh.setAttribute("data-noi18n", "");
    sh.innerHTML = '<div class="gr"></div>' + html; function shut() { bg.remove(); sh.remove(); } bg.onclick = shut; document.body.appendChild(bg); document.body.appendChild(sh); sh.querySelector(".x").onclick = shut; return { sh: sh, shut: shut }; }
  function dateSheet(cb) {
    var o = bsheet('<div class="hh"><h4>🩸 ' + T("എപ്പോഴാണ് രക്തം കൊടുത്തത്?", "When did you donate?") + '</h4><button type="button" class="x">✕</button></div>' +
      '<label class="zbf"><i>📅</i><input type="date" class="dd1" max="' + isoD(new Date()) + '" min="' + isoD(new Date(Date.now() - 365 * 864e5)) + '"><em>*</em></label><div class="gn"></div>' +
      '<div class="bt"><button type="button" class="sv">✅ ' + T("സേവ് ചെയ്യാം", "Save") + '</button></div>');
    var i = o.sh.querySelector(".dd1"), gn = o.sh.querySelector(".gn");
    i.onchange = function () { i.classList.remove("inv"); if (!i.value) { gn.textContent = ""; return; } var d = new Date(i.value); d.setMonth(d.getMonth() + 3); gn.textContent = "💚 " + (ML ? fmtD(d) + " മുതൽ വീണ്ടും തനിയെ 'ലഭ്യം' ആകും" : "You will be available again from " + fmtD(d)); };
    o.sh.querySelector(".sv").onclick = function () { if (!i.value) { i.classList.add("inv"); return; } cb(i.value); o.shut(); };
  }
  function bloodWire(w, tab, rerender) {
    if (tab === "need") {
      var nf = w.querySelector(".zbneedf");
      function nbind(root) { root.querySelectorAll("input,select").forEach(function (el) { el.addEventListener("input", function () { VAL[el.name] = el.value; el.classList.remove("inv"); }); el.addEventListener("change", function () { VAL[el.name] = el.value; el.classList.remove("inv"); if (el.name === "rp" && el.value === "other") nswap(true); }); });
        var pb = root.querySelector(".zpb"); if (pb) pb.onclick = function () { VAL.rp = ""; VAL.rpo = ""; nswap(false); }; }
      function nswap(f) { var pc = nf.querySelector(".zpc"); pc.innerHTML = rPlace(); nbind(pc); if (f) { var i = pc.querySelector("input"); if (i) i.focus(); } }
      nbind(nf);
      w.querySelector(".zbneed").onclick = function () {
      var bad = null;
      nf.querySelectorAll("input,select").forEach(function (el) { var v = (el.value || "").trim(), ok = !!v; if (ok && el.name === "rm") ok = v.replace(/\D/g, "").length >= 10; if (ok && el.name === "ru") ok = +v > 0; if (!ok) { el.classList.add("inv"); bad = bad || el; } });
      if (bad) { bad.scrollIntoView({ behavior: "smooth", block: "center" }); toast(T("എല്ലാ വിവരങ്ങളും പൂരിപ്പിക്കൂ", "Please fill in all the details")); return; }
      if (!BLOOD_LIVE) { toast(soon()); return; }
      var pl = VAL.rp === "other" ? VAL.rpo : VAL.rp, dt = fmtD(new Date(VAL.rd));
      var msg = ML ? "ഹലോ ZEST സെന്റർ 👋\n\n🩸 രക്തം ആവശ്യമുണ്ട്\n\n🙂 പേര്: " + VAL.rn + "\n🏠 വീട്ടുപേര്: " + VAL.rh + "\n📍 സ്ഥലം: " + pl + "\n📱 മൊബൈൽ: " + VAL.rm + "\n🩸 ബ്ലഡ് ഗ്രൂപ്പ്: " + VAL.rg + "\n🧪 യൂണിറ്റ്: " + VAL.ru + "\n📅 ആവശ്യമുള്ള ദിവസം: " + dt + "\n🏥 ഹോസ്പിറ്റൽ: " + VAL.rhs
                   : "Hello ZEST Centre 👋\n\n🩸 Blood needed\n\n🙂 Name: " + VAL.rn + "\n🏠 House: " + VAL.rh + "\n📍 Place: " + pl + "\n📱 Mobile: " + VAL.rm + "\n🩸 Blood group: " + VAL.rg + "\n🧪 Units: " + VAL.ru + "\n📅 Date needed: " + dt + "\n🏥 Hospital: " + VAL.rhs;
      window.open("https://wa.me/918848313837?text=" + encodeURIComponent(msg), "_blank"); }; return; }
    var dn = getDonor();
    if (dn && !BST.form) {
      w.querySelector(".zbagain").onclick = function () { dateSheet(function (v) { dn.bd = v; setDonor(dn); rerender(); toast(T("തീയതി സേവ് ചെയ്തു ✅", "Date saved ✅")); }); };
      w.querySelector(".zbadd").onclick = function () { BST.adding = 1; BST.form = 1; BST.done = 0; BST.grp = ""; VAL.n = ""; VAL.m = ""; VAL.bl = ""; VAL.bd = ""; rerender(); };
      w.querySelector(".zbedit").onclick = function () { BST.adding = 0; BST.form = 1; BST.done = 0; BST.grp = dn.g; VAL.n = dn.n; VAL.h = dn.h; VAL.m = dn.m; VAL.bp = dn.bp; VAL.bpo = dn.bpo; VAL.bl = dn.bd ? "lt3" : (dn.bl || ""); VAL.bd = dn.bd || ""; rerender(); };
      return; }
    w.querySelectorAll(".zbyn button").forEach(function (b) { b.onclick = function () { BST.ready = +b.dataset.r; var y = w.scrollTop; rerender(); w.scrollTop = y; }; });
    if (!BST.ready) return;
    if (BST.done) { w.querySelector(".zbcard").onclick = function () { BST.done = 0; BST.form = 0; BST.adding = 0; rerender(); };
      w.querySelector(".zbmore").onclick = function () { BST.done = 0; BST.adding = 1; BST.form = 1; BST.grp = ""; VAL.n = ""; VAL.m = ""; VAL.bl = ""; VAL.bd = ""; rerender(); var t = w.querySelector(".zbt"); if (t) t.scrollIntoView({ behavior: "smooth", block: "start" }); }; return; }
    w.querySelectorAll("[data-g]").forEach(function (b) { b.onclick = function () { BST.grp = b.dataset.g; w.querySelectorAll("[data-g]").forEach(function (x) { x.classList.toggle("on", x === b); }); w.querySelector(".zbg").classList.remove("inv"); }; });
    function bind(root) { root.querySelectorAll("input,select").forEach(function (el) { el.addEventListener("input", function () { VAL[el.name] = el.value; el.classList.remove("inv"); }); el.addEventListener("change", function () { VAL[el.name] = el.value; el.classList.remove("inv"); if (el.name === "bp" && el.value === "other") swap(true);
        if (el.name === "bl") { var dz = w.querySelector(".zbd"); dz.hidden = el.value !== "lt3"; if (!dz.hidden) { var di = dz.querySelector("input"); if (di) di.focus(); } }
        if (el.name === "bd") w.querySelector(".zbnx").textContent = nextTxt(); }); });
      var pb = root.querySelector(".zpb"); if (pb) pb.onclick = function () { VAL.bp = ""; VAL.bpo = ""; swap(false); }; }
    function swap(f) { var pc = w.querySelector(".zpc"); pc.innerHTML = bPlace(); bind(pc); if (f) { var i = pc.querySelector("input"); if (i) i.focus(); } }
    bind(w.querySelector(".zbfs"));
    w.querySelector(".zbgo").onclick = function () {
      var bad = null, g = w.querySelector(".zbg");
      if (!BST.grp) { g.classList.add("inv"); bad = g; }
      w.querySelectorAll(".zbfs input,.zbfs select").forEach(function (el) { if (el.closest("[hidden]")) return; var v = (el.value || "").trim(), ok = !!v; if (ok && el.name === "m") ok = v.replace(/\D/g, "").length >= 10; if (!ok) { el.classList.add("inv"); bad = bad || el; } });
      if (bad) { bad.scrollIntoView({ behavior: "smooth", block: "center" }); toast(T("എല്ലാ വിവരങ്ങളും പൂരിപ്പിക്കൂ", "Please fill in all the details")); return; }
      var keep = getDonor(), me = { n: VAL.n, h: VAL.h, m: VAL.m, g: BST.grp, bp: VAL.bp, bpo: VAL.bpo, bl: VAL.bl, bd: VAL.bl === "lt3" ? VAL.bd : "" };
      if (!(keep && BST.adding)) setDonor(me);
      BST.done = 1; BST.form = 1; rerender(); var ok = w.querySelector(".zbok"); if (ok) ok.scrollIntoView({ behavior: "smooth", block: "center" });
    };
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
      w.innerHTML = '<div class="mh"><button type="button" class="bk" aria-label="Back">✕</button><button type="button" class="lsw' + (ML ? '' : ' en') + '" role="switch" aria-checked="' + (!ML) + '">EN <span class="sw"><i></i></span></button><img class="zhimg" src="/img/hero/' + (which === "blood" ? "blood" : "equipment") + '.svg" alt=""><h2>' + title.replace(/^\S+\s/, "") + '</h2><p>' + sub + '</p></div><div class="soon">👀 ' + T("ഇത് ഇപ്പോൾ കാണാൻ മാത്രം – ഉടൻ തുടങ്ങും", "Preview – this service starts soon") + '</div>' + (which === "blood" ? bloodPage(tab) : eqPage(tab));
      w.querySelector(".bk").onclick = close;
      w.querySelector(".lsw").onclick = function () { var y = w.scrollTop; ML = !ML; render(cur); w.scrollTop = y; };
      single(w);
      if (which !== "blood") eqWire(w, tab); else bloodWire(w, tab, function () { render(cur); }); var g = which === "blood" ? w.querySelector(".g") : null; if (g) g.addEventListener("click", function (e) { var b = e.target.closest(".t"); if (!b) return; if (g.classList.contains("multi")) b.classList.toggle("sel"); else g.querySelectorAll(".t").forEach(function (x) { x.classList.toggle("sel", x === b); }); });
      w.querySelectorAll(".tb button").forEach(function (b) { b.onclick = function () { render(b.dataset.tab); w.scrollTop = 0; }; });
      w.querySelectorAll(".go:not(.eqg):not(.zbgo),.yn button").forEach(function (b) { b.onclick = function () { toast(soon()); }; });
    }
    render(which === "blood" ? "give" : "need");
    document.body.appendChild(w);
    try { history.pushState({ zmed: 1 }, ""); } catch (e) {}
    window.addEventListener("popstate", onPop);
  }
  function onPop() { var w = document.getElementById("zmed"); if (w) w.remove(); window.removeEventListener("popstate", onPop); }
  function close() { if (history.state && history.state.zmed) history.back(); else onPop(); }
  window.ZestMed = { open: open };
})();
