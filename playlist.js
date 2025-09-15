// ===========================
// PLAYLIST JS
// ===========================

// Agregamos un campo de fondo animado a cada canción
const songs = [
  { 
    name: "The Dead Dance - Lady Gaga", 
    url: "audio/Lady Gaga - The Dead Dance.mp3", 
    image: "https://th.bing.com/th?id=OIF.15X2EV6XPyCbj%2bqadU6iAA&r=0&rs=1&pid=ImgDetMain&o=7&rm=3", 
    colors: ["#e01f1f","#131212","#ff4747","#1b1b1b"], 
    themeColor: "#ff4747" 
  },
  { 
    name: "BIRDS OF A FEATHER - Billie Eilish", 
    url: "audio/Billie Eilish - BIRDS OF A FEATHER.mp3", 
    image: "https://tse3.mm.bing.net/th/id/OIP.lxGo2fKjD-lzlrjU3qkQXAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3", 
    colors: ["#0f2027","#203a43","#000000", "#0a668dff"], 
    themeColor: "#0675ddff"
  },
  { 
    name: "DAISIES - Justin Bieber", 
    url: "audio/Justin Bieber - DAISIES.mp3", 
    image: "https://tse1.mm.bing.net/th/id/OIP._W4hL_2sQ0cpq7lKicRJIgHaHT?r=0&rs=1&pid=ImgDetMain&o=7&rm=3", 
    colors: ["#ff7e5f","#feb47b","#ff6a88","#ffc3a0"], 
    themeColor: "#d33857ff"
  },
  { 
    name: "Mystical Magical - Benson Boone", 
    url: "audio/Mystical Magical - Benson Boone.mp3", 
    image: "https://topmusicarts.com/cdn/shop/files/Benson-Boone---Mystical-Magical-_Ableton-Remake_1200x1200.png?v=1747170788", 
    colors: ["#af840dff","#262c05ff","#f0b40eff","#282829ff"], 
    themeColor: "#0a8049ff"
  },
  { 
    name: "Abracadabra - Lady Gaga", 
    url: "audio/Abracadabra - Lady Gaga.mp3", 
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/40/c9/45/40c94523-abf6-724b-a7a3-24ca0f8c95b0/25UMGIM06790.rgb.jpg/1200x1200bf-60.jpg", 
    colors: ["#080808ff","#575757ff","#020202ff","#4e4e4eff"], 
    themeColor: "#6d6d6dff"
  },
  { 
    name: "COQUETA - Grupo Frontera, Fuerza Regida", 
    url: "audio/COQUETA - Grupo Frontera, Fuerza Regida.mp3", 
    image: "https://akamai.sscdn.co/uploadfile/letras/fotos/4/f/8/7/4f875b37b197f150f45a41e1201da2d0.jpg", 
    colors: ["#1d2671","#c33764","#1d2671","#f0c27b"], 
    themeColor: "#c33764"
  },
  { 
    name: "BAILE INoLVIDABLE - Bad Bunny", 
    url: "audio/BAILE INoLVIDABLE -Bad Bunny.mp3", 
    image: "https://tse1.explicit.bing.net/th/id/OIP.JtwAk3HIctpEpKR0Sj-xSwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3", 
    colors: ["#f12711","#f5af19","#f12711","#f5af19"], 
    themeColor: "#f12711"
  },
  { 
    name: "Obsesionario - Tan Bionica", 
    url: "audio/Obsesionario - Tan Bionica.mp3", 
    image: "https://images.genius.com/037bf7c9edc96ea77da05986174d4083.640x640x1.jpg", 
    colors: ["#8360c3","#2ebf91","#8360c3","#2ebf91"], 
    themeColor: "#2ebf91"
  },
  { 
    name: "SOLEAO - Myke Towers & Quevedo", 
    url: "audio/SOLEAO - Myke Towers & Quevedo.mp3", 
    image: "https://images.genius.com/9c804de1d1b8e360f265aa25d11d8f61.1000x1000x1.png", 
    colors: ["#ff512f","#dd2476","#ff512f","#dd2476"], 
    themeColor: "#dd2476"
  },
  { 
    name: "Tu Misterioso Alguien - Miranda!", 
    url: "audio/Miranda! - Tu Misterioso Alguien.mp3", 
    image: "https://th.bing.com/th/id/R.07243b13640f92048be788195f808606?rik=nuuGHc9EFjp4Ng&pid=ImgRaw&r=0", 
    sharedBy: "Música compartida por: Lautaro", 
    colors: ["#00c6ff","#0072ff","#00c6ff","#0072ff"], 
    themeColor: "#195dc4ff"
  },
  { 
    name: "Bones - Galantis", 
    url: "audio/Bones - Galantis.mp3", 
    image: "https://wololosound.com/wp-content/uploads/50949487_1773159046123312_8360443734776610816_n.jpg", 
    sharedBy: "Música compartida por: Euge", 
     colors: ["#00c6ff","#ff45e0ff","#f8c537ff","#9726e2ff"], 
    themeColor: "#be27b7ff"
  },
];

// ===========================
// FUNCION PARA CAMBIAR FONDO ANIMADO Y UI
// ===========================
function setAnimatedBackground(colors, uiColor) {
  let styleEl = document.getElementById("dynamicGradient");
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = "dynamicGradient";
    document.head.appendChild(styleEl);
  }

  styleEl.innerHTML = `
    body {
      background: linear-gradient(270deg, ${colors[0]}, ${colors[1]}, ${colors[2]}, ${colors[3]});
      background-size: 300% 300%;
      animation: smoothGradient 15s ease-in-out infinite;
    }

    @keyframes smoothGradient {
      0% { background-position: 0% 50%; }
      25% { background-position: 50% 75%; }
      50% { background-position: 100% 50%; }
      75% { background-position: 50% 25%; }
      100% { background-position: 0% 50%; }
    }

    .song-item.active {
      background: ${uiColor};
      color: #fff;
    }

    #progress {
      background-color: ${uiColor};
    }

    .control-row .btn:hover {
      background-color: ${uiColor};
      border-color: ${uiColor};
      color: #fff;
    }

    .control-row .btn:active {
      opacity: 0.6;
    }
  `;
}

// ===========================
// FUNCION PARA ACTUALIZAR BARRA DE ESTADO
// ===========================
function updateStatusBarColor(uiColor) {
  let themeMeta = document.querySelector('meta[name="theme-color"]');
  if (!themeMeta) {
    themeMeta = document.createElement('meta');
    themeMeta.setAttribute('name', 'theme-color');
    document.head.appendChild(themeMeta);
  }
  themeMeta.setAttribute('content', uiColor);

  let iosMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
  if (!iosMeta) {
    iosMeta = document.createElement('meta');
    iosMeta.setAttribute('name', 'apple-mobile-web-app-status-bar-style');
    document.head.appendChild(iosMeta);
  }
  iosMeta.setAttribute('content', 'black-translucent');
}

// ===========================
// ELEMENTOS DEL DOM
// ===========================
const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("playPause");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const nowPlaying = document.getElementById("nowPlaying");
const songImage = document.getElementById("songImage");
const songList = document.getElementById("songList");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progressBar");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const sharedByEl = document.getElementById("sharedBy");
const muteBtn = document.getElementById("muteBtn");
const shareBtn = document.getElementById("shareBtn");

let currentIndex = 0;
let isPlaying = false;
let lastVolume = 1; // para restaurar volumen

// ===========================
// CREAR LISTA EN HTML CON MINIATURA
// ===========================
songs.forEach((song, index) => {
  const div = document.createElement("div");
  div.classList.add("song-item");

  // Contenedor interno para imagen + texto
  const innerDiv = document.createElement("div");
  innerDiv.style.display = "flex";
  innerDiv.style.alignItems = "center";
  innerDiv.style.gap = "10px";

  // Imagen
  const img = document.createElement("img");
  img.src = song.image || "img/default.png";
  img.alt = song.name;
  img.style.width = "50px";
  img.style.height = "50px";
  img.style.objectFit = "cover";
  img.style.borderRadius = "6px";
  img.style.flexShrink = "0";

  // Texto
  const span = document.createElement("span");
  span.textContent = song.name;

  innerDiv.appendChild(img);
  innerDiv.appendChild(span);
  div.appendChild(innerDiv);

  div.addEventListener("click", () => {
    loadSong(index);
    playSong();
  });

  songList.appendChild(div);
});

// ===========================
// FUNCION CARGAR CANCIÓN
// ===========================
function loadSong(index) {
  currentIndex = index;
  const song = songs[index];
  audio.src = song.url;
  nowPlaying.textContent = song.name;
  songImage.src = song.image;
  sharedByEl.textContent = song.sharedBy || "";

  document.querySelectorAll(".song-item").forEach((el, i) => {
    el.classList.toggle("active", i === index);
  });

  if (song.colors && song.colors.length === 4) {
    setAnimatedBackground(song.colors, song.themeColor);
  }

  updateStatusBarColor(song.themeColor);
  updateMediaSession();
}

// ===========================
// REPRODUCIR / PAUSAR
// ===========================
function playSong() {
  audio.play();
  isPlaying = true;
  playPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
  songImage.style.animation = "spin 4s linear infinite";
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playPauseBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
  songImage.style.animation = "none";
}

playPauseBtn.addEventListener("click", () => isPlaying ? pauseSong() : playSong());

// ===========================
// VOLUMEN / MUTE
// ===========================
muteBtn.addEventListener("click", () => {
  if(audio.muted){
    audio.muted = false;
    audio.volume = lastVolume;
    muteBtn.innerHTML = '<i class="bi bi-volume-up-fill"></i>';
  } else {
    audio.muted = true;
    muteBtn.innerHTML = '<i class="bi bi-volume-mute-fill"></i>';
  }
});

// ===========================
// COMPARTIR CANCIÓN ACTUAL (ENLACE A LA PÁGINA CON HASH)
// ===========================
shareBtn.addEventListener("click", () => {
  const song = songs[currentIndex];
  const songHash = `#song-${currentIndex}`;
  const pageUrl = window.location.origin + window.location.pathname + songHash;

  const shareData = {
    title: song.name,
    text: `Escucha esta canción: ${song.name}`,
    url: pageUrl
  };

  if (navigator.share) {
    navigator.share(shareData).catch(err => console.log(err));
  } else {
    navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
    alert("Enlace de la canción copiado al portapapeles!");
  }
});

// ===========================
// SIGUIENTE / ANTERIOR
// ===========================
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
  playSong();
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(currentIndex);
  playSong();
});

// ===========================
// CARGAR PRIMERA CANCIÓN (O DESDE HASH)
// ===========================
window.addEventListener("load", () => {
  audio.preload = "auto";

  const hash = window.location.hash;
  if (hash.startsWith("#song-")) {
    const index = parseInt(hash.replace("#song-", ""));
    if (!isNaN(index) && index >= 0 && index < songs.length) {
      loadSong(index);
      return;
    }
  }

  loadSong(0);
});

// ===========================
// ANIMACIÓN ROTACIÓN
// ===========================
const style = document.createElement('style');
style.innerHTML = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;
document.head.appendChild(style);

// ===========================
// BARRA DE TIEMPO
// ===========================
audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = percent + "%";
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});

function setProgress(e, bar) {
  const rect = bar.getBoundingClientRect();
  let clientX = e.clientX || (e.touches && e.touches[0].clientX);
  const clickX = clientX - rect.left;
  const width = rect.width;
  audio.currentTime = (clickX / width) * audio.duration;
}

progressBar.addEventListener("click", (e) => setProgress(e, progressBar));
progressBar.addEventListener("touchstart", (e) => setProgress(e, progressBar));
progressBar.addEventListener("touchmove", (e) => {
  e.preventDefault();
  setProgress(e, progressBar);
});

function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0'+seconds : seconds}`;
}

// ===========================
// MEDIA SESSION API
// ===========================
function updateMediaSession() {
  if ('mediaSession' in navigator) {
    let [songTitle, artistName] = songs[currentIndex].name.includes(" - ")
      ? songs[currentIndex].name.split(" - ")
      : [songs[currentIndex].name, ""];
    songTitle = songTitle.trim();
    artistName = artistName.trim();

    navigator.mediaSession.metadata = new MediaMetadata({
      title: songTitle,
      artist: artistName ? `${artistName} - FM Ñanderoga` : 'FM Ñanderoga',
      album: 'Top 10 - FM Ñanderoga',
      artwork: songs[currentIndex].image ? [
        { src: songs[currentIndex].image, sizes: '96x96', type: 'image/jpeg' },
        { src: songs[currentIndex].image, sizes: '128x128', type: 'image/jpeg' },
        { src: songs[currentIndex].image, sizes: '192x192', type: 'image/jpeg' },
        { src: songs[currentIndex].image, sizes: '256x256', type: 'image/jpeg' },
        { src: songs[currentIndex].image, sizes: '384x384', type: 'image/jpeg' },
        { src: songs[currentIndex].image, sizes: '512x512', type: 'image/jpeg' },
      ] : []
    });

    navigator.mediaSession.setActionHandler('play', playSong);
    navigator.mediaSession.setActionHandler('pause', pauseSong);
    navigator.mediaSession.setActionHandler('previoustrack', () => {
      currentIndex = (currentIndex - 1 + songs.length) % songs.length;
      loadSong(currentIndex);
      playSong();
    });
    navigator.mediaSession.setActionHandler('nexttrack', () => {
      currentIndex = (currentIndex + 1) % songs.length;
      loadSong(currentIndex);
      playSong();
    });
  }
}

// ===========================
// REPRODUCIR SIGUIENTE AUTOMÁTICAMENTE
// ===========================
audio.addEventListener("ended", () => {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
  playSong();
});
