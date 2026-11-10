/* 10 Kasım anma duyurusu (nokta nokta çizim) - Word Castle
   Kullanım: HTML'de </body> satırından hemen önce: <script src="anma.js"></script>
   İsteğe bağlı: aynı klasöre 10kasim.jpg koyarsan noktalar o fotoğrafı çizer.
   Yoksa ay-yıldız ve "10 KASIM 1938" yazısını çizer. */
(function(){
  var IMG="10kasim.jpg";

  var css=document.createElement("style");
  css.textContent=
  "#anma{position:fixed;inset:0;z-index:200;display:flex;align-items:center;justify-content:center;padding:max(14px,env(safe-area-inset-top)) 14px max(14px,env(safe-area-inset-bottom));background:rgba(0,0,0,.92);animation:anmaIn .6s ease both}"+
  "#anma.out{opacity:0;transition:opacity .35s;pointer-events:none}"+
  "@keyframes anmaIn{from{opacity:0}}"+
  "#anma .card{position:relative;width:min(94vw,780px);max-height:96vh;overflow:auto;background:#050505;border:1px solid #ffffff22;border-radius:22px;box-shadow:0 30px 90px #000;text-align:center;color:#fff;font-family:Georgia,'Times New Roman',serif}"+
  "#anma .x{position:absolute;right:10px;top:10px;width:44px;height:44px;border:0;border-radius:50%;background:#ffffff1f;color:#fff;cursor:pointer;z-index:2;display:flex;align-items:center;justify-content:center}"+
  "#anma .x:active{background:#e30a17}"+
  "#anma .x svg{width:22px;height:22px}"+
  "#anma canvas{display:block;width:100%}"+
  "#anma .tx{padding:6px 18px 22px;opacity:0;transition:opacity 1.5s}"+
  "#anma .tx.on{opacity:1}"+
  "#anma p{margin:0;font-size:clamp(16px,3.2vw,26px);line-height:1.4;color:#eee}"+
  "#anma .ok{margin-top:16px;border:1px solid #ffffff44;background:transparent;color:#fff;border-radius:999px;padding:.6em 1.6em;font:inherit;font-size:clamp(15px,2.6vw,20px);cursor:pointer}"+
  "#anma .ok:active{background:#e30a17;border-color:#e30a17}";
  document.head.appendChild(css);

  var xIcon='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M5 5l14 14M19 5L5 19"/></svg>';
  var el=document.createElement("div");
  el.id="anma";el.setAttribute("role","dialog");el.setAttribute("aria-label","10 Kasım anma duyurusu");
  el.innerHTML='<div class="card"><button class="x" aria-label="Kapat">'+xIcon+'</button><canvas></canvas><div class="tx"><p>Gazi Mustafa Kemal Atatürk’ü saygı, özlem ve minnetle anıyoruz.</p><button class="ok">Oyuna Devam Et</button></div></div>';
  document.body.appendChild(el);

  var card=el.querySelector(".card"),cv=el.querySelector("canvas"),ctx=cv.getContext("2d"),tx=el.querySelector(".tx");
  var raf=0,closed=false,parts=[];

  function close(){
    closed=true;cancelAnimationFrame(raf);
    el.classList.add("out");
    setTimeout(function(){el.remove();css.remove()},400);
    document.removeEventListener("keydown",key);
  }
  function key(e){if(e.key==="Escape")close()}
  el.querySelector(".x").onclick=close;
  el.querySelector(".ok").onclick=close;
  el.addEventListener("click",function(e){if(e.target===el)close()});
  document.addEventListener("keydown",key);

  var dpr=Math.min(window.devicePixelRatio||1,2);
  var W=Math.round(Math.min(window.innerWidth*0.94,780)*dp
