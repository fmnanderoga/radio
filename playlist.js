// ===========================
// PLAYLIST JS OPTIMIZADO
// ===========================

const songs = [
  { name: "The Dead Dance - Lady Gaga", 
    url: "audio/Lady Gaga - The Dead Dance.mp3", 
    image: "https://th.bing.com/th?id=OIF.15X2EV6XPyCbj%2bqadU6iAA&r=0&rs=1&pid=ImgDetMain&o=7&rm=3", 
    colors: ["#e01f1f","#131212","#ff4747","#1b1b1b"], 
    themeColor: "#ff4747" },

  { name: "BIRDS OF A FEATHER - Billie Eilish", 
    url: "audio/Billie Eilish - BIRDS OF A FEATHER.mp3", 
    image: "https://tse3.mm.bing.net/th/id/OIP.lxGo2fKjD-lzlrjU3qkQXAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3", 
    colors: ["#0f2027","#203a43","#000000", "#0a668dff"], 
    themeColor: "#0675ddff" },

  { name: "DAISIES - Justin Bieber", 
    url: "audio/Justin Bieber - DAISIES.mp3", 
    image: "https://tse1.mm.bing.net/th/id/OIP._W4hL_2sQ0cpq7lKicRJIgHaHT?r=0&rs=1&pid=ImgDetMain&o=7&rm=3", 
    colors: ["#ff7e5f","#feb47b","#ff6a88","#ffc3a0"], 
    themeColor: "#d33857ff" },

  { name: "Mystical Magical - Benson Boone", 
    url: "audio/Mystical Magical - Benson Boone.mp3", 
    image: "https://topmusicarts.com/cdn/shop/files/Benson-Boone---Mystical-Magical-_Ableton-Remake_1200x1200.png?v=1747170788", 
    colors: ["#af840dff","#262c05ff","#f0b40eff","#282829ff"], 
    themeColor: "#0a8049ff" },

  { name: "Abracadabra - Lady Gaga", 
    url: "audio/Abracadabra - Lady Gaga.mp3", 
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/40/c9/45/40c94523-abf6-724b-a7a3-24ca0f8c95b0/25UMGIM06790.rgb.jpg/1200x1200bf-60.jpg",
    colors: ["#080808ff","#575757ff","#020202ff","#4e4e4eff"], 
    themeColor: "#6d6d6dff" },

  { name: "COQUETA - Grupo Frontera, Fuerza Regida", 
    url: "audio/COQUETA - Grupo Frontera, Fuerza Regida.mp3", 
    image: "https://akamai.sscdn.co/uploadfile/letras/fotos/4/f/8/7/4f875b37b197f150f45a41e1201da2d0.jpg", 
    colors: ["#1d2671","#c33764","#1d2671","#f0c27b"], 
    themeColor: "#c33764" },

  { name: "BAILE INoLVIDABLE - Bad Bunny", url: "audio/BAILE INoLVIDABLE -Bad Bunny.mp3", 
    image: "https://tse1.explicit.bing.net/th/id/OIP.JtwAk3HIctpEpKR0Sj-xSwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3", 
    colors: ["#f12711","#f5af19","#ff4fd3ff","#f5af19"], 
    themeColor: "#f12711" },

  { name: "Ciudad Mágica - Tan Bionica", 
    url: "audio/Ciudad Mágica - Tan Bionica.mp3", 
    image: "https://i.scdn.co/image/ab67616d0000b2735551299a2da1d16b7a3b07c2", 
    colors: ["#8360c3","#2ebf91","#8360c3","#2ebf91"], 
    themeColor: "#2ebf91" },

  { name: "SOLEAO - Myke Towers & Quevedo", 
    url: "audio/SOLEAO - Myke Towers & Quevedo.mp3", 
    image: "https://images.genius.com/9c804de1d1b8e360f265aa25d11d8f61.1000x1000x1.png", 
    colors: ["#fa992aff","#ddc124ff","#dadadaff","#ffca37ff"], 
    themeColor: "#f1842bff" },

  { name: "Tu Misterioso Alguien - Miranda!", 
    url: "audio/Miranda! - Tu Misterioso Alguien.mp3", 
    image: "https://th.bing.com/th/id/R.07243b13640f92048be788195f808606?rik=nuuGHc9EFjp4Ng&pid=ImgRaw&r=0", 
    sharedBy: "Música compartida por: Lautaro", 
    colors: ["#00c6ff","#0072ff","#00c6ff","#0072ff"], 
    themeColor: "#195dc4ff" },

  { name: "Bones - Galantis", 
    url: "audio/Bones - Galantis.mp3", 
    image: "https://wololosound.com/wp-content/uploads/50949487_1773159046123312_8360443734776610816_n.jpg", 
    sharedBy: "Música compartida por: Euge", 
    colors: ["#00c6ff","#ff45e0ff","#f8c537ff","#9726e2ff"], 
    themeColor: "#be27b7ff" },

  { name: "Otro Atardecer - Bad Bunny", 
    url: "audio/Otro Atardecer - Bad Bunny.mp3", 
    image: "https://images.genius.com/222b691d0481ad34fac9328c757028fc.1000x1000x1.png", 
    sharedBy: "Música compartida por: Fran", 
    colors: ["#ff4800ff","#ffe345ff","#21e9f0ff","#5be226ff"], 
    themeColor: "#be8e27ff" },
];

const audio = document.getElementById("audio"),
      playPauseBtn = document.getElementById("playPause"),
      prevBtn = document.getElementById("prevBtn"),
      nextBtn = document.getElementById("nextBtn"),
      nowPlaying = document.getElementById("nowPlaying"),
      songImage = document.getElementById("songImage"),
      songList = document.getElementById("songList"),
      progress = document.getElementById("progress"),
      progressBar = document.getElementById("progressBar"),
      currentTimeEl = document.getElementById("currentTime"),
      durationEl = document.getElementById("duration"),
      sharedByEl = document.getElementById("sharedBy"),
      muteBtn = document.getElementById("muteBtn"),
      shareBtn = document.getElementById("shareBtn");

let currentIndex = 0, isPlaying = false, volumeState = 0;

// ===========================
// CONSTRUCCIÓN DE LISTA (USANDO FRAGMENTO)
// ===========================
const fragment = document.createDocumentFragment();
songs.forEach((s, i) => {
  const div = document.createElement("div");
  div.className = "song-item";
  div.dataset.index = i;
  div.innerHTML = `<div style="display:flex;align-items:center;gap:10px">
      <img src="${s.image}" alt="${s.name}" style="width:50px;height:50px;object-fit:cover;border-radius:6px;flex-shrink:0">
      <span>${s.name}</span>
    </div>`;
  fragment.appendChild(div);
});
songList.appendChild(fragment);

// ===========================
// EVENTO DELEGADO PARA LISTA
// ===========================
songList.addEventListener("click", e => {
  const item = e.target.closest(".song-item");
  if (!item) return;
  loadSong(parseInt(item.dataset.index));
  playSong();
});

// ===========================
// FUNCIONES PRINCIPALES
// ===========================
function loadSong(i){
  currentIndex = i;
  const s = songs[i];
  audio.src = s.url;
  nowPlaying.textContent = s.name;
  songImage.src = s.image;
  sharedByEl.textContent = s.sharedBy || "";
  document.querySelectorAll(".song-item").forEach((el, idx) => el.classList.toggle("active", idx === i));
  if(s.colors?.length===4) setAnimatedBackground(s.colors, s.themeColor);
  updateStatusBarColor(s.themeColor);
  updateMediaSession();
}

function playSong(){
  audio.play();
  isPlaying=true;
  playPauseBtn.innerHTML='<i class="bi bi-pause-fill"></i>';
  songImage.style.animation="spin 4s linear infinite";
}
function pauseSong(){
  audio.pause();
  isPlaying=false;
  playPauseBtn.innerHTML='<i class="bi bi-play-fill"></i>';
  songImage.style.animation="none";
}

// ===========================
// BOTONES
// ===========================
playPauseBtn.addEventListener("click", ()=>isPlaying?pauseSong():playSong());
prevBtn.addEventListener("click", ()=>{ loadSong((currentIndex-1+songs.length)%songs.length); playSong(); });
nextBtn.addEventListener("click", ()=>{ loadSong((currentIndex+1)%songs.length); playSong(); });

// ===========================
// VOLUMEN / MUTE 3 NIVELES
// ===========================
muteBtn.addEventListener("click", ()=>{
  if(volumeState===0){ audio.muted=false; audio.volume=0.5; muteBtn.innerHTML='<i class="bi bi-volume-down-fill"></i>'; volumeState=1; }
  else if(volumeState===1){ audio.muted=true; muteBtn.innerHTML='<i class="bi bi-volume-mute-fill"></i>'; volumeState=2; }
  else { audio.muted=false; audio.volume=1; muteBtn.innerHTML='<i class="bi bi-volume-up-fill"></i>'; volumeState=0; }
});

// ===========================
// COMPARTIR
// ===========================
shareBtn.addEventListener("click", ()=>{
  const s = songs[currentIndex];
  const url = window.location.origin + window.location.pathname + `#song-${currentIndex}`;
  if(navigator.share) navigator.share({ title: s.name, text:`Escucha esta canción: ${s.name}`, url }).catch(()=>{});
  else { navigator.clipboard.writeText(`Escucha esta canción: ${s.name} ${url}`); alert("Enlace copiado!"); }
});

// ===========================
// BARRA DE TIEMPO
// ===========================
audio.addEventListener("timeupdate", ()=>{
  const p = audio.currentTime/audio.duration*100 || 0;
  progress.style.width = p+"%";
  currentTimeEl.textContent=formatTime(audio.currentTime);
  durationEl.textContent=formatTime(audio.duration);
});

function setProgress(e){
  const rect=progressBar.getBoundingClientRect();
  const x=(e.clientX||e.touches[0].clientX)-rect.left;
  audio.currentTime=(x/rect.width)*audio.duration;
}
["click","touchstart","touchmove"].forEach(ev=>progressBar.addEventListener(ev,setProgress));

// ===========================
// FORMAT TIME
// ===========================
function formatTime(t){ if(isNaN(t)) return "0:00"; const m=Math.floor(t/60), s=Math.floor(t%60); return `${m}:${s<10?"0"+s:s}`; }

// ===========================
// MEDIA SESSION
// ===========================
function updateMediaSession(){
  if(!('mediaSession' in navigator)) return;
  let [title, artist]=songs[currentIndex].name.split(" - ");
  navigator.mediaSession.metadata=new MediaMetadata({ title:title?.trim(), artist:(artist?.trim()||"FM Ñanderoga"), album:"Top 10 - FM Ñanderoga", artwork:[{src:songs[currentIndex].image,sizes:'96x96',type:'image/jpeg'}] });
  ["play","pause"].forEach(a=>navigator.mediaSession.setActionHandler(a,a==="play"?playSong:pauseSong));
  navigator.mediaSession.setActionHandler('previoustrack', ()=>{ loadSong((currentIndex-1+songs.length)%songs.length); playSong(); });
  navigator.mediaSession.setActionHandler('nexttrack', ()=>{ loadSong((currentIndex+1)%songs.length); playSong(); });
}

// ===========================
// CARGAR PRIMERA CANCIÓN / HASH
// ===========================
window.addEventListener("load", ()=>{
  audio.preload="auto";
  const h=window.location.hash;
  if(h.startsWith("#song-")){ const idx=parseInt(h.replace("#song-","")); if(!isNaN(idx) && idx>=0 && idx<songs.length){ loadSong(idx); return; } }
  loadSong(0);
});

// ===========================
// AUTO NEXT
// ===========================
audio.addEventListener("ended", ()=>{ loadSong((currentIndex+1)%songs.length); playSong(); });

// ===========================
// ANIMACIÓN SPIN
// ===========================
const style=document.createElement('style'); style.innerHTML="@keyframes spin{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}"; document.head.appendChild(style);

// ===========================
// FONDO DINÁMICO
// ===========================
function setAnimatedBackground(colors, uiColor){
  let s=document.getElementById("dynamicGradient");
  if(!s){ s=document.createElement("style"); s.id="dynamicGradient"; document.head.appendChild(s); }
  s.innerHTML=`body{background:linear-gradient(270deg,${colors.join(",")});background-size:300% 300%;animation:smoothGradient 15s ease-in-out infinite;}
@keyframes smoothGradient{0%{background-position:0% 50%;}25%{background-position:50% 75%;}50%{background-position:100% 50%;}75%{background-position:50% 25%;}100%{background-position:0% 50%;}}
.song-item.active{background:${uiColor};color:#fff;}
#progress{background-color:${uiColor};}
.control-row .btn:hover{background-color:${uiColor};border-color:${uiColor};color:#fff;}
.control-row .btn:active{opacity:0.6;}`;
}

// ===========================
// META COLOR STATUS
// ===========================
function updateStatusBarColor(c){
  let m=document.querySelector('meta[name="theme-color"]'); if(!m){ m=document.createElement('meta'); m.name="theme-color"; document.head.appendChild(m); }
  m.content=c;
  let i=document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]'); if(!i){ i=document.createElement('meta'); i.name="apple-mobile-web-app-status-bar-style"; document.head.appendChild(i); }
  i.content="black-translucent";
}
