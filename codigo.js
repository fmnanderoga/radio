// ===================== ELEMENTOS DEL DOM =====================
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPause');
const iconPlay = document.getElementById('iconPlay');
const iconPause = document.getElementById('iconPause');
const statusEl = document.getElementById('status');
const volumeSlider = document.getElementById('volume');

// ===================== CONFIGURACIÓN =====================
const streamURL = "https://uk2freenew.listen2myradio.com/live.mp3?typeportmount=s1_33304_stream_944158957";
let isPlaying = false;
let reconnectTimeout = null;
let reconnectAttempts = 0;
const maxReconnectAttempts = 10;

// ===================== CREAR CONTENEDOR DE FALLBACK =====================
let iframeContainer = document.getElementById('iframeContainer');
if(!iframeContainer) {
    iframeContainer = document.createElement('div');
    iframeContainer.id = "iframeContainer";
    iframeContainer.style.display = "none";
    iframeContainer.style.marginTop = "10px";

    const iframe = document.createElement('iframe');
    iframe.id = "radioIframe";
    iframe.src = "https://www.listen2myradio.com/live.php?radio=fmnanderoga";
    iframe.style.width = "100%";
    iframe.style.height = "60px";
    iframe.style.border = "none";

    iframeContainer.appendChild(iframe);
    const container = document.getElementById('radioPlayer') || document.body; // Si no existe id 'radioPlayer', lo agrega al body
    container.appendChild(iframeContainer);
}

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

        // Ocultar iframe si estaba visible
        iframeContainer.style.display = "none";

    }).catch((err) => {
        console.warn("Error al reproducir:", err);
        isPlaying = false;
        updatePlayPauseUI();
        setStatus("OFFLINE - usando fallback", "#ffa500");
        playPauseBtn.disabled = false;

        // Mostrar iframe como fallback
        iframeContainer.style.display = "block";

        if(reconnectAttempts < maxReconnectAttempts) {
            reconnectAttempts++;
            reconnectTimeout = setTimeout(playLive, 3000);
        } else {
            setStatus("NO SE PUEDE CONECTAR", "#ff0000");
        }
    });
}

// ===================== EVENTOS =====================

// Botón Play/Pause
playPauseBtn.addEventListener('click', () => {
    if(isPlaying) {
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
    setStatus("OFFLINE - usando fallback", "#ffa500");
    playPauseBtn.disabled = false;

    // Mostrar iframe como fallback
    iframeContainer.style.display = "block";

    if(reconnectAttempts < maxReconnectAttempts) {
        reconnectAttempts++;
        reconnectTimeout = setTimeout(playLive, 3000);
    } else {
        setStatus("NO SE PUEDE CONECTAR", "#ff0000");
    }
});

// Guardar volumen
volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
    localStorage.setItem('volume', e.target.value);
});
