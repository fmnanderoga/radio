// ===================== ELEMENTOS DEL DOM =====================
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPause');
const iconPlay = document.getElementById('iconPlay');
const iconPause = document.getElementById('iconPause');
const statusEl = document.getElementById('status');
const volumeSlider = document.getElementById('volume');

const notificacionBar = document.getElementById('notificacion-bar');
const notificacionTexto = document.getElementById('notificacion-texto');
const cerrarNotificacion = document.getElementById('cerrarNotificacion');

let isPlaying = false;
let reconnectTimeout = null;
let reconnectAttempts = 0;
const maxReconnectAttempts = 10;
let notificacionCerrada = false;

// ===================== CONFIGURACIÓN =====================
const streamURL = "https://lunix.txrx.stream/radioune/";

// ===================== INICIALIZACIÓN =====================
audio.preload = "auto";
audio.src = streamURL;
audio.volume = parseFloat(localStorage.getItem('volume')) || 0.7;
volumeSlider.value = audio.volume;

// ===================== FUNCIONES =====================
function updatePlayPauseUI() {
    if(isPlaying){
        iconPlay.style.display = 'none';
        iconPause.style.display = 'block';
        playPauseBtn.classList.remove('loading');
    } else {
        iconPlay.style.display = 'block';
        iconPause.style.display = 'none';
        playPauseBtn.classList.remove('loading');
    }
}

function setStatus(text, color="#ff3636") {
    statusEl.textContent = text;
    statusEl.style.color = color;
}

function showLoading() {
    playPauseBtn.classList.add('loading');
}

// ===================== REPRODUCCIÓN =====================
function playLive() {
    if(isPlaying) return;
    playPauseBtn.disabled = true;
    setStatus("CONECTANDO...", "#ffa500");
    showLoading();

    audio.src = streamURL;
    audio.load();
    audio.volume = volumeSlider.value;

    audio.play().then(() => {
        isPlaying = true;
        updatePlayPauseUI();
        setStatus("LIVE", "#0f0");
        playPauseBtn.disabled = false;
        reconnectAttempts = 0;
        if(reconnectTimeout) clearTimeout(reconnectTimeout);
    }).catch((err) => {
        console.warn("Error al reproducir:", err);
        isPlaying = false;
        updatePlayPauseUI();
        setStatus("OFFLINE");
        playPauseBtn.disabled = false;
        if(reconnectAttempts < maxReconnectAttempts) {
            reconnectAttempts++;
            reconnectTimeout = setTimeout(playLive, 3000);
        } else {
            setStatus("NO SE PUEDE CONECTAR");
        }
    });
}

// ===================== EVENTOS =====================

// Botón Play/Pause
playPauseBtn.addEventListener('click', () => {
    if(isPlaying){
        audio.pause();
        isPlaying = false;
        updatePlayPauseUI();
        setStatus("PAUSADO", "#ffa500");
        if(reconnectTimeout) clearTimeout(reconnectTimeout);
    } else {
        playLive();
    }
});

// Manejo de errores de audio
audio.addEventListener('error', () => {
    isPlaying = false;
    updatePlayPauseUI();
    setStatus("OFFLINE");
    playPauseBtn.disabled = false;
    if(reconnectAttempts < maxReconnectAttempts) {
        reconnectAttempts++;
        reconnectTimeout = setTimeout(playLive, 3000);
    } else {
        setStatus("NO SE PUEDE CONECTAR");
    }
});

// Control de volumen
volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
    localStorage.setItem('volume', e.target.value);
});

// ===================== NOTIFICACIONES EN TIEMPO REAL =====================
firebase.database().ref('notificacionActual').on('value', (snapshot) => {
    const texto = snapshot.val() || "";
    if(texto.trim() !== "" && !notificacionCerrada){
        notificacionTexto.textContent = texto;
        notificacionBar.style.display = 'flex';
        notificacionBar.style.animation = 'slideDown 0.5s forwards';
    } else {
        notificacionBar.style.animation = 'fadeOut 0.5s forwards';
        setTimeout(() => { notificacionBar.style.display = 'none'; }, 500);
    }
});

// Cerrar notificación
cerrarNotificacion.addEventListener('click', () => {
    notificacionBar.style.animation = 'fadeOut 0.5s forwards';
    notificacionCerrada = true;
    setTimeout(() => { notificacionBar.style.display = 'none'; }, 500);
});
