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

// ===================== NOTIFICACIÓN NORMAL =====================
const cerrarNotificacionBtn = document.getElementById('cerrarNotificacion');
const programaBar = document.getElementById('notificacion-programa-bar');
const programaTexto = document.getElementById('notificacion-programa-texto');
const cerrarProgramaBtn = document.getElementById('cerrarNotificacionPrograma');

let programaIntervalId = null;
let notificacionIntervalId = null;
let programaTextoBase = "";

// Normal notification
firebase.database().ref('notificacionActual').on('value', snapshot => {
    const data = snapshot.val();
    if (data && data.texto && data.texto.trim() !== "") {
        notificacionCerrada = false;
        mostrarNotificacion(data.texto, data.expiraEn || null);
    } else {
        ocultarNotificacion();
    }
});

function mostrarNotificacion(texto, expiraEn){
    if (notificacionCerrada || !texto || texto.trim() === "") return;

    notificacionTexto.textContent = texto;
    notificacionBar.style.display = 'flex';
    notificacionBar.style.animation = 'slideDown 0.5s forwards';

    if(expiraEn){
        if(notificacionIntervalId) clearInterval(notificacionIntervalId);
        notificacionIntervalId = setInterval(()=>{
            const restante = Math.floor((expiraEn - Date.now())/1000);
            if(restante <= 0){
                clearInterval(notificacionIntervalId);
                ocultarNotificacion();
                return;
            }
        },1000);
    }
}

function ocultarNotificacion(){
    notificacionBar.style.animation = 'fadeOut 0.5s forwards';
    setTimeout(()=>{ notificacionBar.style.display = 'none'; },500);
}

cerrarNotificacionBtn.addEventListener('click', ()=>{
    notificacionCerrada = true;
    ocultarNotificacion();
});

// ===================== NOTIFICACIÓN DE PROGRAMA SOLO EN MÓVIL =====================
function isMobile() {
    return window.innerWidth <= 768;
}

if(isMobile()){
    firebase.database().ref('notificacionPrograma').on('value', snapshot => {
        const data = snapshot.val();
        if(!data || !data.texto) {
            programaBar.style.display = 'none';
            if(programaIntervalId) clearInterval(programaIntervalId);
            return;
        }

        programaTextoBase = data.texto;
        const expiraEn = data.expiraEn || Date.now() + 10*60*1000;

        programaBar.style.display = 'flex';

        if(programaIntervalId) clearInterval(programaIntervalId);

        programaIntervalId = setInterval(() => {
            const restante = Math.floor((expiraEn - Date.now())/1000);
            if(restante <= 0){
                clearInterval(programaIntervalId);
                programaBar.style.display = 'none';
                return;
            }
            const m = Math.floor(restante/60);
            const s = ('0' + (restante % 60)).slice(-2);
            programaTexto.textContent = `${programaTextoBase} ${m}:${s}`;
        },1000);
    });

    cerrarProgramaBtn.addEventListener('click', ()=>{
        programaBar.style.display = 'none';
        if(programaIntervalId) clearInterval(programaIntervalId);
    });
}else{
    // En PC siempre oculto
    programaBar.style.display = 'none';
}
