// ===========================
// PLAYLIST JS
// ===========================
const songs = [
  { name: "Lady Gaga - The Dead Dance", url: "audio/Lady Gaga - The Dead Dance.mp3", image: "https://th.bing.com/th?id=OIF.15X2EV6XPyCbj%2bqadU6iAA&r=0&rs=1&pid=ImgDetMain&o=7&rm=3" },
  { name: "Billie Eilish - BIRDS OF A FEATHER", url: "audio/Billie Eilish - BIRDS OF A FEATHER.mp3", image: "https://tse3.mm.bing.net/th/id/OIP.lxGo2fKjD-lzlrjU3qkQXAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" },
  { name: "Justin Bieber - DAISIES", url: "audio/Justin Bieber - DAISIES.mp3", image: "https://tse1.mm.bing.net/th/id/OIP._W4hL_2sQ0cpq7lKicRJIgHaHT?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" },
  { name: "Show Me Love - WizTheMc, bees & honey", url: "audio/Show Me Love - WizTheMc, bees & honey.mp3", image: "https://tse3.mm.bing.net/th/id/OIP.ukIxUtG0flpPt7ucr5xlNwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" },
  { name: "Mystical Magical - Benson Boone", url: "audio/Mystical Magical - Benson Boone.mp3", image: "https://th.bing.com/th/id/R.9fb50e97de14a750c06aaf26ad3a4f3e?rik=lUemyxgIeJONNA&riu=http%3a%2f%2ftopmusicarts.com%2fcdn%2fshop%2ffiles%2fBenson-Boone---Mystical-Magical-_Ableton-Remake_1200x1200.png%3fv%3d1747170788&ehk=Pvfy48gw8lROk6Itzdgjd4lRLQhZReBhBFQw5E1sT%2bc%3d&risl=&pid=ImgRaw&r=0" },
  { name: "COQUETA - Grupo Frontera, Fuerza Regida", url: "audio/COQUETA - Grupo Frontera, Fuerza Regida.mp3", image: "https://akamai.sscdn.co/uploadfile/letras/fotos/4/f/8/7/4f875b37b197f150f45a41e1201da2d0.jpg" },
  { name: "BAILE INoLVIDABLE -Bad Bunny", url: "audio/BAILE INoLVIDABLE -Bad Bunny.mp3", image: "https://tse1.explicit.bing.net/th/id/OIP.JtwAk3HIctpEpKR0Sj-xSwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" },
  { name: "Obsesionario - Tan Bionica", url: "audio/Obsesionario - Tan Bionica.mp3", image: "https://images.genius.com/037bf7c9edc96ea77da05986174d4083.640x640x1.jpg" },
  { name: "SOLEAO - Myke Towers & Quevedo", url: "audio/SOLEAO - Myke Towers & Quevedo.mp3", image: "https://images.genius.com/9c804de1d1b8e360f265aa25d11d8f61.1000x1000x1.png"},
  { name: "Miranda! - Tu Misterioso Alguien", url: "audio/Miranda! - Tu Misterioso Alguien.mp3", image: "https://th.bing.com/th/id/R.07243b13640f92048be788195f808606?rik=nuuGHc9EFjp4Ng&pid=ImgRaw&r=0" }
];

// ELEMENTOS
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

let currentIndex = 0;
let isPlaying = false;

// ===========================
// CREAR LISTA EN HTML
// ===========================
songs.forEach((song, index) => {
  const div = document.createElement("div");
  div.classList.add("song-item");
  div.textContent = song.name;
  div.addEventListener("click", () => {
    loadSong(index);
    playSong();
  });
  songList.appendChild(div);
});

// ===========================
// CARGAR CANCIÓN (SIN REPRODUCIR)
// ===========================
function loadSong(index) {
  currentIndex = index;
  audio.src = songs[index].url;
  nowPlaying.textContent = songs[index].name;
  songImage.src = songs[index].image;

  // marcar activa
  document.querySelectorAll(".song-item").forEach((el, i) => {
    el.classList.toggle("active", i === index);
  });

  updateMediaSession(); // Actualizar notificación en celulares
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

playPauseBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
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
// CARGAR PRIMERA CANCIÓN AL INICIO
// ===========================
window.addEventListener("load", () => {
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
// BARRA DE TIEMPO (click + touch)
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

// Formatear tiempo en mm:ss
function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

// ===========================
// AUTOPLAY SIGUIENTE CANCIÓN
// ===========================
audio.addEventListener("ended", () => {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
  playSong();
});

// ===========================
// MEDIA SESSION API
// ===========================
function updateMediaSession() {
  if ('mediaSession' in navigator) {
    // Separar artista y título
    let [artist, title] = songs[currentIndex].name.includes(" - ")
      ? songs[currentIndex].name.split(" - ")
      : ["", songs[currentIndex].name];

    // Agregar nombre de la radio al artista
    artist = artist.trim() + " - FM Ñanderoga";

    navigator.mediaSession.metadata = new MediaMetadata({
      title: title.trim(),
      artist: artist,
      album: 'Top 10 - FM Ñanderoga',
      artwork: [
        {
          src: songs[currentIndex].image,
          sizes: '150x150',
          type: songs[currentIndex].image.endsWith('.png') ? 'image/png' : 'image/jpeg'
        }
      ]
    });

    // Acciones de control
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
