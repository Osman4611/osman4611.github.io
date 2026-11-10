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
  var W=Math.round(Math.min(window.innerWidth*0.94,780)*dpr);
  var H=Math.round(Math.min(window.innerHeight*0.62*dpr,W*1.05));
  cv.width=W;cv.height=H;cv.style.height=(H/dpr)+"px";

  /* kaynak çizimi: fotoğraf varsa o, yoksa ay-yıldız + yazı */
  function fallback(o){
    o.fillStyle="#000";o.fillRect(0,0,W,H);
    var cx=W/2,cy=H*0.3,R=Math.min(W*0.2,H*0.2);
    o.fillStyle="#e30a17";
    o.beginPath();o.arc(cx-R*0.15,cy,R,0,Math.PI*2);o.fill();
    o.fillStyle="#000";
    o.beginPath();o.arc(cx+R*0.12,cy,R*0.8,0,Math.PI*2);o.fill();
    o.fillStyle="#e30a17";
    var sx=cx+R*0.85,sr=R*0.42;
    o.beginPath();
    for(var i=0;i<10;i++){var a=-Math.PI/2+i*Math.PI/5,r=i%2?sr*0.4:sr;o.lineTo(sx+Math.cos(a)*r,cy+Math.sin(a)*r)}
    o.closePath();o.fill();
    o.fillStyle="#fff";o.textAlign="center";o.textBaseline="middle";
    o.font="bold "+Math.round(W*0.14)+"px Georgia,serif";o.fillText("10 KASIM",W/2,H*0.64);
    o.font=Math.round(W*0.1)+"px Georgia,serif";o.fillText("1938",W/2,H*0.84);
  }
  function source(cb){
    var off=document.createElement("canvas");off.width=W;off.height=H;
    var o=off.getContext("2d",{willReadFrequently:true});
    var im=new Image();
    im.onload=function(){
      o.fillStyle="#000";o.fillRect(0,0,W,H);
      var s=Math.min(W/im.width,H/im.height)*0.97,w=im.width*s,h=im.height*s;
      o.drawImage(im,(W-w)/2,(H-h)/2,w,h);
      var c=[o.getImageData(2,2,1,1).data,o.getImageData(W-3,2,1,1).data];
      var bright=(c[0][0]+c[0][1]+c[0][2]+c[1][0]+c[1][1]+c[1][2])/6>140;
      cb(o,bright);
    };
    im.onerror=function(){fallback(o);cb(o,false)};
    im.src=IMG;
  }

  function build(o,inv){
    var d=o.getImageData(0,0,W,H).data;
    var step=Math.max(3,Math.round(Math.sqrt(W*H/15000)));
    parts=[];
    for(var y=0;y<H;y+=step){
      for(var x=0;x<W;x+=step){
        var i=(y*W+x)*4,r=d[i],g=d[i+1],b=d[i+2];
        var lum=r*0.3+g*0.59+b*0.11;
        if(inv)lum=255-lum;
        if(lum<35)continue;
        var red=!inv&&r>g*1.6&&r>b*1.6;
        var col=red?"rgb("+r+","+g+","+b+")":"rgb("+(lum|0)+","+(lum|0)+","+(lum|0)+")";
        parts.push({tx:x,ty:y,sx:Math.random()*W,sy:Math.random()*H,
          dl:(y/H)*1500+Math.random()*1000,sz:Math.max(1,step*(0.35+lum/255*0.65)*0.8),c:col});
      }
    }
  }

  var t0=0,DUR=3200,shown=false;
  function frame(now){
    if(closed)return;
    var t=now-t0,done=true;
    ctx.fillStyle="#050505";ctx.fillRect(0,0,W,H);
    for(var i=0;i<parts.length;i++){
      var p=parts[i],k=(t-p.dl)/DUR;
      if(k<1)done=false;
      if(k<0)k=0;else if(k>1)k=1;
      var e=1-Math.pow(1-k,3);
      ctx.globalAlpha=0.25+0.75*e;ctx.fillStyle=p.c;
      ctx.fillRect(p.sx+(p.tx-p.sx)*e,p.sy+(p.ty-p.sy)*e,p.sz,p.sz);
    }
    ctx.globalAlpha=1;
    if(t>3200&&!shown){shown=true;tx.classList.add("on")}
    if(!done)raf=requestAnimationFrame(frame);
  }

  source(function(o,inv){
    if(closed)return;
    build(o,inv);
    t0=performance.now();
    raf=requestAnimationFrame(frame);
  });
  setTimeout(function(){if(!shown){shown=true;tx.classList.add("on")}},6500);
})();
