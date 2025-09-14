// ===================== ELEMENTOS DEL DOM =====================
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPause');
const iconPlay = document.getElementById('iconPlay');
const iconPause = document.getElementById('iconPause');
const statusEl = document.getElementById('status');
const volumeSlider = document.getElementById('volume');

// ===================== CONFIGURACIÓN =====================https://uk2freenew.listen2myradio.com/live.mp3?typeportmount=s1_33304_stream_944158957
const streamURL = "https://lunix.txrx.stream/radioune/";

let isPlaying = false;
let reconnectTimeout = null;
let reconnectAttempts = 0;
const maxReconnectAttempts = 10;

// ===================== INICIALIZACIÓN =====================
audio.preload = "auto";
audio.src = streamURL;
audio.volume = localStorage.getItem('volume') || 0.7;
volumeSlider.value = audio.volume;

// ===================== FUNCIONES =====================
function updatePlayPauseUI() {
    if(isPlaying) {
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

// Agregar clase loading al botón
function showLoading() {
    playPauseBtn.classList.add('loading');
}

// ===================== FUNCION PRINCIPAL DE REPRODUCCIÓN =====================
function playLive() {
    if(isPlaying) return; // evita doble ejecución
    playPauseBtn.disabled = true;
    setStatus("CONECTANDO...", "#ffa500");
    showLoading();

    // Reiniciar fuente para reproducir siempre desde el stream en vivo
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
    if(isPlaying) {
        // Pausar audio
        audio.pause();
        isPlaying = false;
        updatePlayPauseUI();
        setStatus("PAUSADO", "#ffa500");
        if(reconnectTimeout) clearTimeout(reconnectTimeout);
    } else {
        // Reproducir audio desde el stream en vivo
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

// Guardar volumen
volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
    localStorage.setItem('volume', e.target.value);
});

const notificacionBar = document.getElementById('notificacion-bar');
const notificacionTexto = document.getElementById('notificacion-texto');
const cerrarNotificacion = document.getElementById('cerrarNotificacion');

let notificacionCerrada = false; // bandera para saber si el usuario la cerró
let ultimaNotificacion = ""; // para detectar cambios

function cargarNotificacion() {
    const texto = localStorage.getItem('notificacionActual') || "";

    // Si cambió el texto, reseteamos la bandera de cerrado
    if(texto !== ultimaNotificacion){
        notificacionCerrada = false;
        ultimaNotificacion = texto;
    }

    if(texto.trim() !== "" && !notificacionCerrada){
        notificacionTexto.textContent = texto;
        notificacionBar.style.display = 'flex';
        notificacionBar.style.animation = 'slideDown 0.5s forwards';
    } else {
        notificacionBar.style.display = 'none';
    }
}

// Inicializar al cargar
cargarNotificacion();

// Actualizar cada 2 segundos
setInterval(cargarNotificacion, 2000);

// Cerrar al hacer clic en la X
cerrarNotificacion.addEventListener('click', () => {
    notificacionBar.style.animation = 'fadeOut 0.5s forwards';
    notificacionCerrada = true; // marcamos que el usuario la cerró
    setTimeout(() => { notificacionBar.style.display = 'none'; }, 500);
});




