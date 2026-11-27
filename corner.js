/* ZEST Students Corner – student profiles (data stays on this phone) */
(function () {
  if (window.ZestCorner) return;
  var PK = "zestProfiles";
  var EM = ["👦", "👧", "👨‍🎓", "👩‍🎓"];
  var BG = ["#cfe9ff", "#ffd6e3", "#d8f5e3", "#fff0c7"];
  function esc(t) { return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function del(k) { try { localStorage.removeItem(k); } catch (e) {} }
  function load() { try { var d = JSON.parse(get(PK) || "null"); if (d && d.list) return d; } catch (e) {} return { list: [], cur: null }; }
  function save(d) { set(PK, JSON.stringify(d)); }
  function hash(s) { var h = 2166136261; s = "zest:" + s; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0).toString(36); }
  function cur() { var d = load(); return d.list.filter(function (p) { return p.id === d.cur; })[0] || null; }
  /* storage key for the current student; other modules call this */
  window.ZestPK = function (base) { var p = cur(); return p ? base + "_" + p.id : base; };

  var css = document.createElement("style");
  css.textContent = '.zsc2{position:fixed;inset:0;z-index:2147483645;overflow:auto;font-family:Inter,"Noto Sans Malayalam",sans-serif;color:#1c2a32;background:#f2f7fb;transform:translateY(100%);transition:transform .3s ease}.zsc2.on{transform:none}.zsc2 *{box-sizing:border-box}.zsc2.who{background:linear-gradient(165deg,#0b3d5c,#1380b8 60%,#3fa7d6);color:#fff;text-align:center}.zsc2 .x0{position:absolute;top:14px;right:14px;width:36px;height:36px;border-radius:50%;border:0;background:rgba(255,255,255,.18);color:#fff;font:700 17px Inter;cursor:pointer}.zsc2 h2{margin:70px 16px 6px!important;font:900 24px Inter,sans-serif!important;color:#fff!important;letter-spacing:0!important}.zsc2 .sub0{margin:0 16px;font:600 13px Inter,sans-serif;color:#bfe3f5}.zsc2 .pfs{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));justify-items:center;gap:22px 16px;max-width:22rem;margin:0 auto;padding:36px 30px 30px}.zsc2 .pf{background:none;border:0;color:#fff;cursor:pointer;font:inherit;padding:0}.zsc2 .pf .av{width:96px;height:96px;margin:0 auto;border-radius:28px;display:grid;place-items:center;font-size:46px;box-shadow:0 8px 18px rgba(0,0,0,.25);position:relative}.zsc2 .pf b{display:block;margin-top:9px;font:800 15px Inter,sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.zsc2 .pf small{font:600 11px Inter,sans-serif;color:#bfe3f5}.zsc2 .pf .lk{position:absolute;right:-6px;bottom:-6px;width:28px;height:28px;border-radius:50%;background:#fff;display:grid;place-items:center;font-size:13px;box-shadow:0 2px 6px rgba(0,0,0,.25)}.zsc2 .pf.add .av{background:rgba(255,255,255,.14);border:2px dashed rgba(255,255,255,.55);box-shadow:none;font:300 44px Inter;color:#fff}.zsc2 .first{margin:24px auto 0;max-width:20rem;padding:0 20px;font:600 13px/1.5 Inter,sans-serif;color:#d8eefa}' +
    '.zsc2 .hd{position:sticky;top:0;z-index:2;display:flex;align-items:center;gap:8px;padding:12px 14px;background:#fff;box-shadow:0 2px 10px rgba(0,0,0,.05)}.zsc2 .hd b{font:800 17px Inter,sans-serif;color:#0b5d8f;flex:1;white-space:nowrap}.zsc2 .chip{display:inline-flex;align-items:center;gap:7px;max-width:44%;padding:5px 11px 5px 5px;border-radius:999px;background:#eef6fb;border:1.5px solid #cfe3ef;font:800 13px Inter,sans-serif;color:#0b3d5c;cursor:pointer}.zsc2 .chip span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.zsc2 .chip i{width:28px;height:28px;border-radius:9px;display:grid;place-items:center;font-style:normal;font-size:16px;flex:none}.zsc2 .hd .x1{width:34px;height:34px;border-radius:50%;border:0;background:#eef3f6;font:700 16px Inter;color:#3c4d57;cursor:pointer;flex:none}.zsc2 .wrap{max-width:30rem;margin:0 auto;padding-bottom:40px}.zsc2 .hi{margin:16px 16px 4px;font:900 21px Inter,sans-serif;color:#0b3d5c}.zsc2 .hi small{display:block;font:600 12px Inter,sans-serif;color:#6a8796;margin-top:3px}.zsc2 .zctl{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:12px 14px}.zsc2 .t{position:relative;text-align:left;padding:14px 12px;border-radius:18px;border:0;font:inherit;background:linear-gradient(155deg,#1380b8,#0b3d5c);color:#fff;box-shadow:0 8px 18px rgba(11,61,92,.22);cursor:pointer}.zsc2 .t span{font-size:24px}.zsc2 .t b{display:block;margin-top:6px;font:800 13.5px Inter,sans-serif}.zsc2 .t small{display:block;font:600 10.5px/1.35 Inter,sans-serif;color:#d8eefa;min-height:14px}.zsc2 .t .s{display:block;margin-top:9px;padding:6px 8px;border-radius:10px;background:rgba(255,255,255,.14);font:800 11px Inter,sans-serif;color:#ffc44d}.zsc2 .t.cs{background:#eef6fb;color:#52636d;box-shadow:none;border:1.5px solid #dbe9f2;opacity:.75;cursor:default}.zsc2 .t.cs small{color:#6a8796}.zsc2 .t.cs .s{background:#fff4dc;color:#8a5a00}' +
    '.zsc2-bg{position:fixed;inset:0;z-index:2147483646;background:rgba(5,25,40,.5)}.zsc2-sh{position:fixed;z-index:2147483647;left:50%;bottom:0;width:min(100%,26rem);max-height:92vh;overflow:auto;transform:translateX(-50%);background:#fff;border-radius:24px 24px 0 0;padding:10px 18px 22px;font-family:Inter,"Noto Sans Malayalam",sans-serif;color:#1c2a32;box-shadow:0 -10px 30px rgba(0,0,0,.2)}.zsc2-sh *{box-sizing:border-box}.zsc2-sh .gr{width:40px;height:5px;border-radius:3px;background:#cfdbe3;margin:0 auto 12px}.zsc2-sh h4{margin:0 0 12px;padding-right:36px;font:800 16px Inter,sans-serif;color:#0b3d5c}.zsc2-sh .xx{position:absolute;top:12px;right:14px;width:32px;height:32px;border-radius:50%;border:0;background:#eef3f6;font:700 16px Inter;color:#3c4d57;cursor:pointer}.zsc2-sh .row{display:flex;align-items:center;gap:12px;width:100%;padding:10px;border-radius:14px;margin-bottom:6px;border:1.5px solid transparent;background:none;font:inherit;text-align:left;cursor:pointer}.zsc2-sh .row.on{background:#eef6fb;border-color:#1380b8}.zsc2-sh .row i{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;font-style:normal;font-size:20px;flex:none}.zsc2-sh .row b{display:block;font:800 14px Inter,sans-serif;color:#1c2a32}.zsc2-sh .row small{font:600 11px Inter,sans-serif;color:#6a8796}.zsc2-sh .row em{margin-left:auto;font-style:normal;font:800 12px Inter,sans-serif;color:#1380b8;white-space:nowrap}.zsc2-sh .add2{width:100%;padding:12px;border-radius:14px;border:2px dashed #9ec9e2;background:none;font:800 13px Inter,sans-serif;color:#1380b8;margin-top:6px;cursor:pointer}.zsc2-sh .mn{width:100%;margin-top:8px;padding:12px;border-radius:14px;border:0;background:#eef3f6;font:800 12.5px Inter,sans-serif;color:#3c4d57;cursor:pointer}.zsc2-sh label{display:block;font:800 10px Inter,sans-serif;letter-spacing:.06em;color:#6a8796;margin:12px 0 5px}.zsc2-sh input{width:100%;padding:11px 12px;border-radius:12px;border:1.5px solid #cfe3ef;font:700 14px Inter,sans-serif;color:#1c2a32;background:#fff}.zsc2-sh input:focus{outline:none;border-color:#1380b8}.zsc2-sh .ems{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.zsc2-sh .ems button{width:100%;height:56px;font-size:28px!important;border-radius:13px;border:2px solid transparent;font-size:22px;cursor:pointer}.zsc2-sh .ems .on{border-color:#1380b8;box-shadow:0 0 0 2px #fff inset}.zsc2-sh .sv{width:100%;margin-top:16px;padding:13px;border-radius:14px;border:0;background:linear-gradient(135deg,#0a70a8,#3fa7d6);color:#fff;font:800 14px Inter,sans-serif;cursor:pointer}.zsc2-sh .err{color:#c0392b;font:700 12px Inter,sans-serif;min-height:16px;margin-top:8px}.zsc2-sh .lnk{display:flex;gap:8px;margin-top:10px}.zsc2-sh .lnk button{flex:1;padding:11px;border-radius:12px;border:0;background:#eaf4fa;font:800 12px Inter,sans-serif;color:#0b5d8f;cursor:pointer}.zsc2-sh .lnk .rd{background:#fdecee;color:#c0392b}' +
    '.zsc2-pin{position:fixed;inset:0;z-index:2147483647;background:linear-gradient(165deg,#0b3d5c,#1380b8 60%,#3fa7d6);color:#fff;text-align:center;font-family:Inter,sans-serif}.zsc2-pin .av{width:84px;height:84px;margin:70px auto 0;border-radius:26px;display:grid;place-items:center;font-size:42px;box-shadow:0 8px 18px rgba(0,0,0,.25)}.zsc2-pin h3{margin:12px 0 4px;font:900 20px Inter,sans-serif}.zsc2-pin p{margin:0;font:600 12.5px Inter,sans-serif;color:#bfe3f5;min-height:17px}.zsc2-pin p.bad{color:#ffd0d6}.zsc2-pin .zpd{display:flex;justify-content:center;gap:16px;margin:22px 0 26px}.zsc2-pin .zpd i{width:16px;height:16px;border-radius:50%;border:2px solid #fff}.zsc2-pin .zpd i.f{background:#fff}.zsc2-pin .kp{display:grid;grid-template-columns:repeat(3,64px);gap:14px 26px;justify-content:center}.zsc2-pin .kp button{width:64px;height:64px;border-radius:50%;border:0;background:rgba(255,255,255,.14);color:#fff;font:600 24px Inter,sans-serif;cursor:pointer}.zsc2-pin .kp button.e{background:none}.zsc2-pin .x0{position:absolute;top:14px;right:14px;width:36px;height:36px;border-radius:50%;border:0;background:rgba(255,255,255,.18);color:#fff;font:700 17px Inter;cursor:pointer}@keyframes zsc2sh{20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}.zsc2-pin .zpd.sh{animation:zsc2sh .35s}';
  css.textContent += '.zsc2.who2{background:#f2f7fb;color:#1c2a32;text-align:left}.zsc2.who2 .w2-hd{position:relative;padding:34px 22px 24px;background:linear-gradient(160deg,#0b3d5c,#1380b8 65%,#3fa7d6);color:#fff;border-radius:0 0 28px 28px;text-align:center;overflow:hidden}.zsc2.who2 .w2-hd::after{content:"";position:absolute;right:-50px;top:-50px;width:170px;height:170px;border-radius:50%;background:rgba(255,255,255,.08)}.zsc2.who2 .w2-cap{display:grid;place-items:center;width:58px;height:58px;margin:0 auto;border-radius:18px;background:rgba(255,255,255,.16);font-size:30px}.zsc2.who2 h2{margin:12px 0 4px!important;font:800 22px Inter,"Noto Sans Malayalam",sans-serif!important;color:#fff!important}.zsc2.who2 .zhimg{position:relative;z-index:1;display:block;width:86%;max-width:360px;height:auto;aspect-ratio:780/320;margin:30px auto 0;border-radius:20px;box-shadow:0 10px 24px rgba(0,0,0,.25);border:3px solid rgba(255,255,255,.6);background:#e6f3fb}.zsc2.who2 .w2-hd p{margin:0;font:600 12.5px Inter,"Noto Sans Malayalam",sans-serif;color:#cfe6f5}.zsc2.who2 .x0{z-index:2}.zsc2.who2 .w2-bd{max-width:30rem;margin:0 auto;padding:6px 16px 40px}.zsc2.who2 .w2-sec{margin:20px 4px 10px;font:800 12px Inter,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#6a8796}.zsc2.who2 .w2-tl{display:grid;grid-template-columns:1fr 1fr;gap:10px}.zsc2.who2 .w2-t{display:flex;flex-direction:column;align-items:flex-start;gap:3px;min-height:0!important;height:auto!important;padding:14px 12px!important;border-radius:18px;border:0;background:linear-gradient(155deg,#1380b8,#0b3d5c);color:#fff;text-align:left;font:inherit;line-height:1.3!important;cursor:pointer;box-shadow:0 8px 18px rgba(11,61,92,.22)}.zsc2.who2 .w2-t .e{display:grid;place-items:center;width:40px;height:40px;border-radius:12px;background:rgba(255,255,255,.16);font-size:21px;margin-bottom:6px}.zsc2.who2 .w2-t b{display:block;font:700 14px/1.25 Inter,sans-serif!important;color:#fff}.zsc2.who2 .w2-t small{display:block;font:500 11px/1.35 Inter,sans-serif!important;color:#d8eefa}.zsc2.who2 .w2-soon{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin-top:12px}.zsc2.who2 .w2-soon .lb{font:800 10px Inter,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#8a5a00;background:#fff4dc;padding:5px 9px;border-radius:999px}.zsc2.who2 .w2-soon .ch{font:600 11px Inter,sans-serif;color:#6a8796;background:#fff;border:1px solid #e2ecf3;padding:5px 9px;border-radius:999px}.zsc2.who2 .w2-tip{margin:0 4px 12px;font:500 12.5px/1.5 Inter,sans-serif;color:#52636d}.zsc2.who2 .w2-pf{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;border-radius:18px}.zsc2.who2 .w2-pf.fl{animation:w2fl 1s}@keyframes w2fl{30%{box-shadow:0 0 0 4px rgba(19,128,184,.35)}}.zsc2.who2 .w2-p{line-height:1.25!important;min-height:0!important;display:flex;flex-direction:column;align-items:center;gap:4px;padding:14px 6px 12px;border-radius:18px;border:1.5px solid #e2ecf3;background:#fff;font:inherit;cursor:pointer;min-width:0}.zsc2.who2 .w2-p .av{position:relative;display:grid;place-items:center;width:56px;height:56px;border-radius:18px;font-size:30px}.zsc2.who2 .w2-p .av i{position:absolute;right:-5px;bottom:-5px;width:22px;height:22px;border-radius:50%;background:#fff;display:grid;place-items:center;font-size:11px;font-style:normal;box-shadow:0 2px 5px rgba(0,0,0,.2)}.zsc2.who2 .w2-p b{margin-top:4px;max-width:100%;font:700 13px Inter,sans-serif;color:#14232c;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.zsc2.who2 .w2-p small{font:500 10.5px Inter,sans-serif;color:#6a8796;white-space:nowrap}.zsc2.who2 .w2-p.add{border:2px dashed #9ec9e2;background:#f7fbfe}.zsc2.who2 .w2-p.add .av{background:#e3f0f8;color:#1380b8;font:300 32px Inter,sans-serif}.zsc2.who2 .w2-p.add b{color:#1380b8}.zsc2.who2 .w2-sg{margin-top:18px;border-radius:18px;background:#fff;border:1.5px solid #e2ecf3;padding:14px;box-shadow:0 4px 12px rgba(11,61,92,.06)}.zsc2.who2 .w2-sg .sh{display:flex;gap:10px;align-items:center;margin-bottom:10px}.zsc2.who2 .w2-sg .sh i{font-style:normal;flex:none;width:38px;height:38px;border-radius:12px;background:#fff4dc;display:grid;place-items:center;font-size:19px}.zsc2.who2 .w2-sg b{display:block;font:800 14px Inter,"Noto Sans Malayalam",sans-serif;color:#14232c}.zsc2.who2 .w2-sg small{display:block;font:500 11px/1.4 Inter,"Noto Sans Malayalam",sans-serif;color:#6a8796;margin-top:2px}.zsc2.who2 .sgt{display:block;width:100%;box-sizing:border-box;border:1.5px solid #d4e3ee;border-radius:12px;padding:10px 12px;font:500 13px/1.45 Inter,"Noto Sans Malayalam",sans-serif;color:#14232c;background:#fff;resize:vertical;outline:0}.zsc2.who2 .sgt:focus{border-color:#1380b8}.zsc2.who2 .sgt.err{border-color:#e05252;background:#fff5f5}.zsc2.who2 .sgb{display:block;width:100%;margin-top:10px;padding:12px;border:0;border-radius:12px;background:#25d366;color:#fff;font:800 14px Inter,"Noto Sans Malayalam",sans-serif;cursor:pointer;min-height:0!important;line-height:1.2!important}.zsc2.who2 .w2-p.add b,.zsc2.who2 .w2-p.add small{white-space:normal!important;overflow:visible!important;text-overflow:clip!important;text-align:center;max-width:100%;overflow-wrap:break-word}.zsc2.who2 .w2-p.add b{font-size:12px!important;line-height:1.3!important}.zsc2.who2 .w2-p.add small{font-size:10px!important;line-height:1.3}';
  css.textContent += '.zsc2 .zs-sec{display:flex;align-items:baseline;justify-content:space-between;margin:20px 2px 10px}.zsc2 .zs-sec b{font:800 15px Inter,"Noto Sans Malayalam",sans-serif;color:#0b3d5c}.zsc2 .zs-sec small{font:600 11.5px Inter,"Noto Sans Malayalam",sans-serif;color:#7a8b96}.zsc2 .zs-ad{display:flex!important;width:100%;align-items:center;gap:13px;padding:14px!important;border-radius:18px;background:linear-gradient(135deg,#e6f3fb,#d6ebf7)!important;border:2px dashed #8fc4e3!important;text-align:left;cursor:pointer;min-height:0!important;height:auto!important;flex-direction:row!important}.zsc2 .zs-ad i{flex:none;width:50px;height:50px;border-radius:50%;background:#1380b8;color:#fff;display:grid;place-items:center;font:300 30px Inter,sans-serif;font-style:normal;box-shadow:0 4px 12px rgba(19,128,184,.35)}.zsc2 .zs-ad span{flex:1;min-width:0}.zsc2 .zs-ad b{display:block;font:800 14.5px Inter,"Noto Sans Malayalam",sans-serif;color:#0b3d5c}.zsc2 .zs-ad small{display:block;margin-top:2px;font:600 11px/1.45 Inter,"Noto Sans Malayalam",sans-serif;color:#4f6b7c}.zsc2 .zs-ad em{flex:none;font-style:normal;padding:8px 11px;border-radius:999px;background:#1380b8;color:#fff;font:800 11.5px Inter,"Noto Sans Malayalam",sans-serif;white-space:nowrap}.zsc2 .zs-gb{display:grid;grid-template-columns:1fr 1fr;gap:12px}.zsc2 .zs-tc{display:flex!important;flex-direction:column!important;align-items:stretch!important;text-align:left;min-height:0!important;height:auto!important;border:0;background:#fff!important;color:#0b3d5c!important;border-radius:20px;padding:8px 8px 12px!important;box-shadow:0 6px 16px rgba(11,61,92,.1);cursor:pointer;gap:0!important}.zsc2 .zs-tc img{display:block;width:100%;height:auto;aspect-ratio:780/320;border-radius:14px}.zsc2 .zs-tc b{display:block;margin:10px 6px 0;font:800 14px Inter,"Noto Sans Malayalam",sans-serif;color:#0b3d5c}.zsc2 .zs-tc small{display:block;flex:1;margin:3px 6px 0;font:600 11px/1.45 Inter,"Noto Sans Malayalam",sans-serif;color:#6a7d89}.zsc2 .zs-tc em{display:block;margin:10px 6px 0;text-align:center;font-style:normal;padding:9px;border-radius:12px;background:#1380b8;color:#fff;font:800 11.5px Inter,"Noto Sans Malayalam",sans-serif}.zsc2 .zs-tc em.o{background:#f2a33a}.zsc2 .zs-sg{margin-top:12px;padding:16px;border-radius:20px;background:linear-gradient(135deg,#fff8e1,#fff1d6);border:1.5px solid #f1dc9c}.zsc2 .zs-sg .sh{display:flex;align-items:center;gap:12px}.zsc2 .zs-sg .sh i{font-size:30px;line-height:1;font-style:normal}.zsc2 .zs-sg .sh span{flex:1}.zsc2 .zs-sg .sh b{display:block;font:800 15px/1.3 Inter,"Noto Sans Malayalam",sans-serif;color:#7a5a00}.zsc2 .zs-sg .sh small{display:block;margin-top:4px;font:700 12px/1.3 Inter,"Noto Sans Malayalam",sans-serif;color:#9a7410}.zsc2 .zs-sg .sgo{display:none!important;flex:none;border:0;padding:8px 12px;border-radius:999px;background:#25d366;color:#fff;font:800 11.5px Inter,"Noto Sans Malayalam",sans-serif;cursor:pointer}.zsc2 .zs-sg .sgx{display:block;margin-top:12px}.zsc2 .zs-sg.op .sgx{display:block}.zsc2 .zs-sg.op .sgo{display:none}.zsc2 .zs-sg .sgt{display:block;width:100%;box-sizing:border-box;border:2px solid #1380b8;border-radius:14px;padding:10px 12px;font:500 14px/1.5 Inter,"Noto Sans Malayalam",sans-serif;resize:vertical;background:#fff;color:#0b2a3d;outline:0}.zsc2 .zs-sg .sgt.err{border-color:#e2574c}.zsc2 .zs-sg .sgb{display:block;width:100%;margin-top:10px;border:0;padding:12px;border-radius:14px;background:#25d366;color:#fff;font:800 14px Inter,"Noto Sans Malayalam",sans-serif;cursor:pointer}.zsc2.dash{background:#f2f7fb}.zsc2.dash .w2-bd{max-width:30rem;margin:0 auto;padding:0 16px 40px}.zsc2 .zdh{position:relative;padding:66px 18px 74px;background:linear-gradient(160deg,#0b3d5c,#1380b8 65%,#3fa7d6);color:#fff;border-radius:0 0 28px 28px;overflow:hidden}.zsc2 .zdh::after{content:"";position:absolute;right:-50px;top:-50px;width:170px;height:170px;border-radius:50%;background:rgba(255,255,255,.08)}.zsc2 .zdh .x1{position:absolute;right:14px;top:14px;z-index:2;width:38px;height:38px;border-radius:50%;border:0;background:rgba(255,255,255,.16);color:#fff;font:700 17px Inter,sans-serif;cursor:pointer}.zsc2 .zdh .me{position:relative;z-index:2;display:flex;align-items:center;gap:12px;max-width:30rem;margin:0 auto}.zsc2 .zdh .me>i{flex:none;display:grid;place-items:center;width:58px;height:58px;border-radius:50%;font-size:29px;font-style:normal;border:3px solid rgba(255,255,255,.7)}.zsc2 .zdh .me>span{flex:1;min-width:0}.zsc2 .zdh .me b{display:block;font:800 20px Inter,"Noto Sans Malayalam",sans-serif;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.zsc2 .zdh .me small{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font:600 12px Inter,"Noto Sans Malayalam",sans-serif;color:#cfe6f5}.zsc2 .zdh .chip{flex:none;max-width:none;border:0;padding:7px 11px;border-radius:999px;background:rgba(255,255,255,.18);color:#fff;font:700 11.5px Inter,"Noto Sans Malayalam",sans-serif;cursor:pointer}.zsc2 .zs-sum{position:relative;z-index:3;display:grid;grid-template-columns:1fr 1fr;gap:10px;max-width:30rem;margin:-56px auto 0;padding:0 16px}.zsc2 .zs-sum .c{background:#fff;border-radius:18px;padding:13px;box-shadow:0 8px 20px rgba(11,61,92,.12);min-width:0}.zsc2 .zs-sum small{display:block;font:700 10.5px Inter,"Noto Sans Malayalam",sans-serif;color:#7a8b96}.zsc2 .zs-sum small.f{margin-top:7px;line-height:1.4}.zsc2 .zs-sum b{display:block;margin-top:3px;font:800 22px Inter,sans-serif;color:#0b3d5c}.zsc2 .zs-sum b.sm{font:800 15px Inter,"Noto Sans Malayalam",sans-serif;padding:4px 0}.zsc2 .zs-sum b u{text-decoration:none;font:700 12px Inter,"Noto Sans Malayalam",sans-serif;color:#6a7d89}.zsc2 .zs-sum .br{display:block;height:6px;border-radius:9px;background:#e6eef3;margin-top:8px;overflow:hidden}.zsc2 .zs-sum .br i{display:block;height:100%;border-radius:9px}';
  document.head.appendChild(css);

  var el;
  function screen(cls) {
    if (!el) { el = document.createElement("div"); el.setAttribute("role", "dialog"); document.body.appendChild(el); }
    el.className = "zsc2 " + (cls || "");
    requestAnimationFrame(function () { el.classList.add("on"); });
    document.documentElement.style.overflow = "hidden";
    return el;
  }
  function close() { if (!el) return; el.classList.remove("on"); document.documentElement.style.overflow = ""; }
  function sheet(html) {
    var bg = document.createElement("div"); bg.className = "zsc2-bg";
    var s = document.createElement("div"); s.className = "zsc2-sh"; s.innerHTML = '<button class="xx" aria-label="Close">×</button><div class="gr"></div>' + html;
    document.body.appendChild(bg); document.body.appendChild(s);
    function c() { bg.remove(); s.remove(); }
    bg.onclick = c; s.querySelector(".xx").onclick = c; s.close = c; return s;
  }

  /* move data saved before profiles existed into the first student */
  function migrate(id) {
    ["zestRevPlan", "zestMoney"].forEach(function (k) { var v = get(k); if (v && !get(k + "_" + id)) { set(k + "_" + id, v); del(k); } });
  }

  /* ---------- screens ---------- */
  function who() {
    var d = load(), s = screen("who2"), has = d.list.length > 0;
    var TL = [["revision", "Revision Planner", "Plan what to study each day till the exam", ""], ["money", "Pocket Money", "Track spending, save for your goals", " o"]];
    s.innerHTML = '<div class="w2-hd"><button class="x0" aria-label="Close">✕</button><img class="zhimg" src="/img/hero/students.svg" alt=""><h2>Students Corner</h2><p>Free study tools in the ZEST APP</p></div>' +
      '<div class="w2-bd"><div class="zs-sec" id="w2-who"><b>👋 <span>Who\'s studying?</span></b></div>' +
      (has ? '<div class="w2-pf">' + d.list.map(function (p) { return '<button class="w2-p" data-id="' + p.id + '"><span class="av" style="background:' + p.bg + '">' + p.e + (p.pin ? '<i>🔒</i>' : '') + '</span><b>' + esc(p.n) + '</b><small>' + esc(p.c || '') + '</small></button>'; }).join("") +
        '<button class="w2-p add"><span class="av">＋</span><b>Add student</b><small>Brother / sister</small></button></div>'
        : '<button class="zs-ad"><i>+</i><span><b>Add my name</b><small>Your own study space · add brothers &amp; sisters too</small></span><em>Start ›</em></button>') +
      '<div class="zs-sec"><b>🧰 <span>Study tools</span></b><small>All free</small></div><div class="zs-gb">' +
      TL.map(function (t, i) { return '<button class="zs-tc" data-i="' + i + '"><img src="/img/hero/' + t[0] + '.svg" alt=""><b>' + t[1] + '</b><small>' + t[2] + '</small><em class="' + t[3] + '">Open ›</em></button>'; }).join("") + '</div>' +
      '<p class="zpvn" style="margin:16px 0 0;padding:10px 12px;border-radius:14px;background:#e8f3fa;color:#3b5868;font:600 11.5px/1.5 Inter,\'Noto Sans Malayalam\',sans-serif;text-align:center">🔒 Your details are saved only on this phone. ZEST does not store them anywhere.</p>' +
      '<div class="zs-sg"><div class="sh"><i>💡</i><span><b>What else should we add?</b><small>Suggest a new feature</small></span><button class="sgo">💬 Send</button></div>' +
      '<div class="sgx"><textarea class="sgt" rows="3" placeholder="Type your idea…"></textarea><button class="sgb" data-noi18n>' + ((window.ZestLang && ZestLang.get() === "ml") ? "സബ്മിറ്റ്" : "Submit") + '</button></div></div></div>';
    s.querySelector(".x0").onclick = close;
    s.querySelector(".sgb").onclick = function () {
      var ta = s.querySelector(".sgt"), v = ta.value.trim();
      if (!v) { ta.focus(); ta.classList.add("err"); setTimeout(function () { ta.classList.remove("err"); }, 900); return; }
      var ml = window.ZestLang && ZestLang.get() === "ml", dd = load(), me = dd.list.filter(function (x) { return x.id === dd.cur; })[0] || dd.list[0];
      var who = me ? "\n\n– " + me.n + (me.c ? " (" + me.c + ")" : "") : "";
      var msg = (ml ? "💡 സ്റ്റുഡന്റ്സ് കോർണർ – നിർദ്ദേശം" : "💡 Students Corner – Suggestion") + "\n\n" + v + who;
      if (window.zWho) return zWho(ml ? "💡 സ്റ്റുഡന്റ്സ് കോർണർ – നിർദ്ദേശം" : "💡 Students Corner – Suggestion", v);
      window.open("https://wa.me/918921369102?text=" + encodeURIComponent(msg), "_blank");
    };
    s.querySelectorAll(".w2-p[data-id]").forEach(function (b) { b.onclick = function () { pick(b.dataset.id); }; });
    s.querySelector(".w2-p.add,.zs-ad").onclick = function () { edit(null); };
    s.querySelector(".sgo").onclick = function () { var x = s.querySelector(".zs-sg"); x.classList.add("op"); setTimeout(function () { s.querySelector(".sgt").focus(); }, 50); };
    s.querySelectorAll(".zs-tc[data-i]").forEach(function (b) { b.onclick = function () {
      if (!has) { edit(null); return; }
      var w = s.querySelector("#w2-who"); w.scrollIntoView({ behavior: "smooth", block: "center" });
      var pf = s.querySelector(".w2-pf"); if (pf) { pf.classList.remove("fl"); void pf.offsetWidth; pf.classList.add("fl"); }
    }; });
  }
  function pick(id) {
    var p = load().list.filter(function (x) { return x.id === id; })[0]; if (!p) return;
    function go() { var d = load(); d.cur = id; save(d); corner(); }
    if (p.pin) pin(p, "Enter your 4-digit PIN", function (v, ok) { if (hash(v) === p.pin) { ok(true); go(); } else ok(false); }); else go();
  }

  function inr(n) { return "₹" + Math.round(Math.abs(n)).toLocaleString("en-IN"); }
  function summary(p) {
    var out = { ex: null, mo: null };
    try {
      var r = JSON.parse(get("zestRevPlan_" + p.id) || "null");
      if (r && r.date) {
        var a = r.date.split("-"), ex = new Date(+a[0], a[1] - 1, +a[2]), t = new Date(); t.setHours(0, 0, 0, 0);
        var n = Math.round((ex - t) / 864e5), c = r.created ? new Date(r.created) : null, pc = 0;
        if (c) { c.setHours(0, 0, 0, 0); var tot = (ex - c) / 864e5; pc = tot > 0 ? Math.min(100, Math.max(4, Math.round((t - c) / 864e5 / tot * 100))) : 100; }
        out.ex = { n: n, name: r.exam || "", pc: pc };
      }
    } catch (e) {}
    try {
      var m = JSON.parse(get("zestMoney_" + p.id) || "null");
      if (m && m.tx && m.tx.length) {
        var now = new Date(), mk = now.getFullYear() * 12 + now.getMonth(), g = 0, sp = 0;
        m.tx.forEach(function (x) { var d = new Date(x.ts); if (d.getFullYear() * 12 + d.getMonth() !== mk) return; if (x.k === "in") g += x.a; else sp += x.a; });
        out.mo = { l: g - sp, g: g, sp: sp, pc: g > 0 ? Math.min(100, Math.round(sp / g * 100)) : (sp > 0 ? 100 : 0) };
      }
    } catch (e) {}
    return out;
  }
  function corner() {
    var p = cur(); if (!p) { who(); return; }
    var s = screen("dash"), sm = summary(p), E = sm.ex, M = sm.mo;
    var exB = E ? (E.n < 0 ? '<b class="sm">Exam over 🎉</b>' : '<b>' + E.n + ' <u>' + (E.n === 1 ? 'day' : 'days') + '</u></b><i class="br"><i style="width:' + E.pc + '%;background:#1380b8"></i></i>') : '<b class="sm">—</b>';
    var exS = E ? (E.name ? esc(E.name) : 'Next exam') : 'Make your study plan';
    var moB = M ? '<b>' + (M.l < 0 ? '-' : '') + inr(M.l) + '</b><i class="br"><i style="width:' + M.pc + '%;background:#f2a33a"></i></i>' : '<b class="sm">—</b>';
    var moS = M ? 'Got ' + inr(M.g) + ' · Spent ' + inr(M.sp) : 'Track spending & savings';
    var revL = E ? (E.n < 0 ? 'Exam over 🎉' : E.n + (E.n === 1 ? ' day' : ' days') + ' to exam') : 'Make your study plan';
    var monL = M ? (M.l < 0 ? inr(M.l) + ' over' : inr(M.l) + ' left') : 'Track spending & savings';
    s.innerHTML = '<div class="w2-hd zdh"><button class="x1" aria-label="Close">✕</button>' +
      '<div class="me"><i style="background:' + p.bg + '">' + p.e + '</i><span><b>Hi ' + esc(p.n) + ' 👋</b><small>' + (p.c ? esc(p.c) + ' · your own study space' : 'your own study space') + '</small></span><button class="chip" aria-label="Switch student">Switch ▾</button></div></div>' +
      '<div class="zs-sum"><div class="c"><small>📅 <span>Next exam</span></small>' + exB + '<small class="f">' + exS + '</small></div>' +
      '<div class="c"><small>💰 <span>Left this month</span></small>' + moB + '<small class="f">' + moS + '</small></div></div>' +
      '<div class="w2-bd"><div class="zs-sec"><b>🧰 <span>My tools</span></b></div><div class="zs-gb">' +
      '<button class="zs-tc" data-go="rev"><img src="/img/hero/revision.svg" alt=""><b>Revision Planner</b><small>' + revL + '</small><em>Open ›</em></button>' +
      '<button class="zs-tc" data-go="mon"><img src="/img/hero/money.svg" alt=""><b>Pocket Money</b><small>' + monL + '</small><em class="o">Open ›</em></button></div>' +
      '<p class="zpvn" style="margin:16px 0 0;padding:10px 12px;border-radius:14px;background:#e8f3fa;color:#3b5868;font:600 11.5px/1.5 Inter,\'Noto Sans Malayalam\',sans-serif;text-align:center">🔒 Your details are saved only on this phone. ZEST does not store them anywhere.</p></div>';
    s.querySelector(".x1").onclick = close;
    s.querySelector(".chip").onclick = switcher;
    s.querySelector('[data-go=rev]').onclick = function () { tool("/students.js?v=7", "ZestRev"); };
    s.querySelector('[data-go=mon]').onclick = function () { tool("/money.js?v=5", "ZestMoney"); };
    if (window.__zgo) { var g = s.querySelector('[data-go=' + window.__zgo + ']'); window.__zgo = null; if (g) setTimeout(function () { g.click(); }, 60); }
  }
  function tool(src, g) {
    if (window[g]) return window[g].open();
    var sc = document.createElement("script"); sc.src = src; sc.onload = function () { window[g] && window[g].open(); }; document.head.appendChild(sc);
  }
  window.ZestCornerRefresh = function () { if (el && el.classList.contains("on") && !el.classList.contains("who")) { corner(); return true; } return !!(el && el.classList.contains("on")); };

  function switcher() {
    var d = load(), sh = sheet('<h4>Switch student</h4>' + d.list.map(function (p) { return '<button class="row' + (p.id === d.cur ? ' on' : '') + '" data-id="' + p.id + '"><i style="background:' + p.bg + '">' + p.e + '</i><span><b>' + esc(p.n) + (p.pin ? ' 🔒' : '') + '</b><small>' + esc(p.c || '') + (p.pin ? (p.c ? ' · ' : '') + 'PIN protected' : '') + '</small></span>' + (p.id === d.cur ? '<em>✓ Now</em>' : '') + '</button>'; }).join("") +
      '<button class="add2">＋ Add student</button><button class="mn">⚙️ Edit my profile · Set PIN</button>');
    sh.querySelectorAll(".row").forEach(function (r) { r.onclick = function () { sh.close(); if (r.dataset.id !== d.cur) pick(r.dataset.id); }; });
    sh.querySelector(".add2").onclick = function () { sh.close(); edit(null); };
    sh.querySelector(".mn").onclick = function () { sh.close(); edit(cur()); };
  }

  function edit(p) {
    var isNew = !p, d = load(), em = p ? p.e : EM[d.list.length % EM.length];
    var sh = sheet('<h4>' + (isNew ? '＋ Add student' : '⚙️ Edit profile') + '</h4><label>NAME</label><input id="zp-n" maxlength="20" placeholder="Name" value="' + esc(p ? p.n : '') + '"><label>CLASS (optional)</label><input id="zp-c" maxlength="20" placeholder="e.g. Plus Two / Class 9" value="' + esc(p ? p.c || '' : '') + '"><label>PICTURE</label><div class="ems">' + EM.map(function (e, i) { return '<button data-e="' + e + '" style="background:' + BG[i] + '"' + (e === em ? ' class="on"' : '') + '>' + e + '</button>'; }).join("") + '</div>' +
      '<div class="err" id="zp-e"></div><button class="sv">' + (isNew ? 'Add student' : 'Save') + '</button>' +
      (isNew ? '' : '<div class="lnk"><button id="zp-pin">' + (p.pin ? '🔓 Remove PIN' : '🔒 Set PIN') + '</button><button class="rd" id="zp-del">🗑 Delete</button></div>'));
    sh.querySelectorAll(".ems button").forEach(function (b) { b.onclick = function () { sh.querySelectorAll(".ems button").forEach(function (x) { x.classList.remove("on"); }); b.classList.add("on"); em = b.dataset.e; }; });
    setTimeout(function () { if (isNew) sh.querySelector("#zp-n").focus(); }, 60);
    sh.querySelector(".sv").onclick = function () {
      var n = sh.querySelector("#zp-n").value.trim(), c = sh.querySelector("#zp-c").value.trim();
      if (!n) { sh.querySelector("#zp-e").textContent = "Please enter the name"; return; }
      var dd = load(), bg = BG[EM.indexOf(em)] || BG[0];
      if (isNew) {
        var id = Date.now().toString(36); dd.list.push({ id: id, n: n, c: c, e: em, bg: bg, pin: null });
        if (dd.list.length === 1) migrate(id);
        dd.cur = id; save(dd); sh.close(); corner();
      } else {
        dd.list.forEach(function (x) { if (x.id === p.id) { x.n = n; x.c = c; x.e = em; x.bg = bg; } }); save(dd); sh.close(); corner();
      }
    };
    if (!isNew) {
      sh.querySelector("#zp-pin").onclick = function () {
        sh.close();
        if (p.pin) { pin(p, "Enter current PIN to remove it", function (v, ok) { if (hash(v) === p.pin) { ok(true); setPin(p.id, null); corner(); } else ok(false); }); return; }
        pin(p, "Choose a 4-digit PIN", function (v1, ok1) { ok1(true); pin(p, "Enter the same PIN again", function (v2, ok2) { if (v2 === v1) { ok2(true); setPin(p.id, hash(v1)); corner(); } else ok2(false, "PINs did not match – try again"); }); });
      };
      sh.querySelector("#zp-del").onclick = function () {
        if (!confirm("Delete " + p.n + "'s profile? Their revision plan and pocket money on this phone will also be deleted.")) return;
        var dd = load(); dd.list = dd.list.filter(function (x) { return x.id !== p.id; }); dd.cur = null; save(dd);
        del("zestRevPlan_" + p.id); del("zestMoney_" + p.id); sh.close(); who();
      };
    }
  }
  function setPin(id, h) { var d = load(); d.list.forEach(function (x) { if (x.id === id) x.pin = h; }); save(d); }

  function pin(p, msg, done) {
    var v = "", w = document.createElement("div"); w.className = "zsc2-pin"; w.setAttribute("role", "dialog");
    w.innerHTML = '<button class="x0" aria-label="Cancel">✕</button><div class="av" style="background:' + p.bg + '">' + p.e + '</div><h3>' + esc(p.n) + '</h3><p>' + esc(msg) + '</p><div class="zpd"><i></i><i></i><i></i><i></i></div><div class="kp">' + [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "⌫"].map(function (k) { return '<button' + (k === "" ? ' class="e" disabled' : k === "⌫" ? ' class="e" data-k="b"' : ' data-k="' + k + '"') + '>' + k + '</button>'; }).join("") + '</div>';
    document.body.appendChild(w);
    var dots = w.querySelectorAll(".zpd i"), P = w.querySelector("p");
    function draw() { dots.forEach(function (d, i) { d.classList.toggle("f", i < v.length); }); }
    w.querySelector(".x0").onclick = function () { w.remove(); };
    w.querySelectorAll("[data-k]").forEach(function (b) {
      b.onclick = function () {
        if (b.dataset.k === "b") { v = v.slice(0, -1); draw(); return; }
        if (v.length >= 4) return; v += b.dataset.k; draw();
        if (v.length === 4) setTimeout(function () {
          done(v, function (ok, m) {
            if (ok) { w.remove(); return; }
            var dd = w.querySelector(".zpd"); dd.classList.remove("sh"); void dd.offsetWidth; dd.classList.add("sh");
            P.textContent = m || "Wrong PIN – try again"; P.className = "bad"; v = ""; draw();
          });
        }, 120);
      };
    });
  }

  window.ZestCorner = {
    open: function () {
      var d = load();
      if (d.list.length === 1 && !d.list[0].pin) { d.cur = d.list[0].id; save(d); corner(); }
      else who();
    },
    close: close
  };
})();
