const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPause');
const iconPlay = document.getElementById('iconPlay');
const iconPause = document.getElementById('iconPause');
const statusEl = document.getElementById('status');
const volumeSlider = document.getElementById('volume');

const streamURL = "https://uk2freenew.listen2myradio.com/live.mp3?typeportmount=s1_33304_stream_944158957";

let isPlaying = false;

// PRE-CARGA DEL STREAM AL INICIO
audio.src = streamURL;
audio.volume = 0.7;
audio.load();

playPauseBtn.addEventListener('click', () => {
    if(isPlaying){
        audio.pause();
        isPlaying = false;
        iconPlay.style.display = 'block';
        iconPause.style.display = 'none';
        statusEl.textContent = 'PAUSED';
    } else {
        audio.play().then(() => {
            isPlaying = true;
            iconPlay.style.display = 'none';
            iconPause.style.display = 'block';
            statusEl.textContent = 'LIVE';
        }).catch(() => {
            statusEl.textContent = 'OFFLINE';
            playPauseBtn.disabled = true;
        });
    }
});

audio.addEventListener('error', () => {
    statusEl.textContent = 'OFFLINE';
    playPauseBtn.disabled = true;
    iconPlay.style.display = 'block';
    iconPause.style.display = 'none';
    isPlaying = false;
});

volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});
