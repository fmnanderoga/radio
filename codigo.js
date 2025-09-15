// ===================== ELEMENTOS DEL DOM =====================
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPause');
const iconPlay = document.getElementById('iconPlay');
const iconPause = document.getElementById('iconPause');
const statusEl = document.getElementById('status');
const volumeSlider = document.getElementById('volume');

const notificacionBar = document.getElementById('notificacion-bar');
const notificacionTexto = document.getElementById('notificacion-texto');
const cerrarNotificacionBtn = document.getElementById('cerrarNotificacion');

const programaBar = document.getElementById('notificacion-programa-bar');
const programaTexto = document.getElementById('notificacion-programa-texto');
const cerrarProgramaBtn = document.getElementById('cerrarNotificacionPrograma');

let isPlaying = false;
let reconnectTimeout = null;
let reconnectAttempts = 0;
const maxReconnectAttempts = 10;
let notificacionCerrada = false;
let programaIntervalId = null;
let programaTextoBase = ""; // solo texto fijo

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

// ===================== NOTIFICACIÓN NORMAL =====================
firebase.database().ref('notificacionActual').on('value', snapshot => {
    const data = snapshot.val();
    if (data && data.texto && data.texto.trim() !== "") {
        notificacionCerrada = false;
        mostrarNotificacion(data.texto);
    } else {
        ocultarNotificacion();
    }
});

function mostrarNotificacion(texto){
    if (notificacionCerrada || !texto || texto.trim() === "") return;

    notificacionTexto.textContent = texto;
    notificacionBar.style.display = 'flex';
    notificacionBar.style.animation = 'slideDown 0.5s forwards';
}

function ocultarNotificacion(){
    notificacionBar.style.animation = 'fadeOut 0.5s forwards';
    setTimeout(() => { notificacionBar.style.display = 'none'; }, 500);
}

cerrarNotificacionBtn.addEventListener('click', () => {
    notificacionCerrada = true;
    ocultarNotificacion();
});

// ===================== NOTIFICACIÓN DE PROGRAMA =====================
firebase.database().ref('notificacionPrograma').on('value', snapshot => {
    const data = snapshot.val();
    if (data && data.texto && data.expiraEn) {
        // Guardamos solo el texto fijo
        programaTextoBase = data.texto;
        mostrarPrograma(data.expiraEn);
    } else {
        ocultarPrograma();
    }
});

function mostrarPrograma(expiraEn) {
    if (programaIntervalId) clearInterval(programaIntervalId);

    programaBar.style.display = 'flex';
    programaBar.style.animation = 'slideDown 0.5s forwards';

    programaIntervalId = setInterval(() => {
        const ahora = Date.now();
        const restante = Math.floor((expiraEn - ahora)/1000);
        if (restante <= 0) {
            clearInterval(programaIntervalId);
            ocultarPrograma();
            return;
        }
        const m = Math.floor(restante / 60);
        const s = ('0' + (restante % 60)).slice(-2);
        programaTexto.textContent = `${programaTextoBase} ${m}:${s}`;
    }, 1000);
}

function ocultarPrograma(){
    if (programaIntervalId) clearInterval(programaIntervalId);
    programaBar.style.animation = 'fadeOut 0.5s forwards';
    setTimeout(() => { programaBar.style.display = 'none'; }, 500);
}

cerrarProgramaBtn.addEventListener('click', () => {
    ocultarPrograma();
});
