/* 10 Kasım anma duyurusu - Word Castle
   Kullanım: oyunun HTML dosyasında </body> satırından hemen önce şunu ekle:
   <script src="anma.js"></script>
   İsteğe bağlı: aynı klasöre 10kasim.jpg koyarsan görsel olarak açılır.
   Kullanım hakkı sende olan bir fotoğraf kullan (ör. kendi okulunuzun anma görseli). */
(function(){
  var IMG="10kasim.jpg"; // görsel dosya adı

  var css=document.createElement("style");
  css.textContent=
  "#anma{position:fixed;inset:0;z-index:200;display:flex;align-items:center;justify-content:center;padding:max(16px,env(safe-area-inset-top)) 16px max(16px,env(safe-area-inset-bottom));background:rgba(0,0,0,.88);animation:anmaIn .6s ease both}"+
  "#anma.out{opacity:0;transition:opacity .35s;pointer-events:none}"+
  "@keyframes anmaIn{from{opacity:0}}"+
  "#anma .card{position:relative;width:min(94vw,820px);max-height:94vh;overflow:auto;background:#0a0a0a;border:1px solid #ffffff2a;border-radius:22px;box-shadow:0 30px 90px #000;text-align:center;color:#fff;font-family:Georgia,'Times New Roman',serif}"+
  "#anma .x{position:absolute;right:10px;top:10px;width:44px;height:44px;border:0;border-radius:50%;background:#ffffff1f;color:#fff;cursor:pointer;z-index:2;display:flex;align-items:center;justify-content:center}"+
  "#anma .x:active{background:#e30a17}"+
  "#anma .x svg{width:22px;height:22px}"+
  "#anma img{display:block;width:100%;height:auto;border-radius:22px 22px 0 0}"+
  "#anma .tx{padding:22px 18px 26px}"+
  "#anma .fl{width:64px;height:64px;margin:0 auto 8px;display:block}"+
  "#anma h2{margin:0;font-size:clamp(30px,7vw,60px);letter-spacing:.08em;font-weight:400}"+
  "#anma .yr{margin:2px 0 10px;font-size:clamp(16px,3.4vw,26px);color:#bdbdbd;letter-spacing:.2em}"+
  "#anma p{margin:0;font-size:clamp(17px,3.4vw,28px);line-height:1.4;color:#eee}"+
  "#anma .ok{margin-top:18px;border:1px solid #ffffff44;background:transparent;color:#fff;border-radius:999px;padding:.6em 1.6em;font:inherit;font-size:clamp(15px,2.6vw,20px);cursor:pointer}"+
  "#anma .ok:active{background:#e30a17;border-color:#e30a17}";
  document.head.appendChild(css);

  var flag='<svg class="fl" viewBox="0 0 100 100"><path fill="#fff" d="M60 14A36 36 0 1 0 60 86 29 29 0 1 1 60 14Z"/><path fill="#fff" d="M80 50l-12 4 7 10-12-3-1 12-6-10-9 8 2-12-12-3 11-6-6-11 12 4 2-12 7 10z" transform="translate(0 -2) scale(.9) translate(8 6)"/></svg>';
  var xIcon='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M5 5l14 14M19 5L5 19"/></svg>';

  var el=document.createElement("div");
  el.id="anma";
  el.setAttribute("role","dialog");
  el.setAttribute("aria-label","10 Kasım anma duyurusu");
  el.innerHTML=
    '<div class="card">'+
      '<button class="x" aria-label="Kapat">'+xIcon+'</button>'+
      '<img alt="" src="'+IMG+'" onerror="this.remove()">'+
      '<div class="tx">'+flag+
        '<h2>10 KASIM</h2>'+
        '<div class="yr">1938</div>'+
        '<p>Gazi Mustafa Kemal Atatürk’ü saygı, özlem ve minnetle anıyoruz.</p>'+
        '<button class="ok">Oyuna Devam Et</button>'+
      '</div>'+
    '</div>';
  document.body.appendChild(el);

  function close(){
    el.classList.add("out");
    setTimeout(function(){el.remove();css.remove()},400);
    document.removeEventListener("keydown",key);
  }
  function key(e){if(e.key==="Escape")close()}
  el.querySelector(".x").onclick=close;
  el.querySelector(".ok").onclick=close;
  el.addEventListener("click",function(e){if(e.target===el)close()});
  document.addEventListener("keydown",key);
})();
