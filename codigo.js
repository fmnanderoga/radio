const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPause');
const iconPlay = document.getElementById('iconPlay');
const iconPause = document.getElementById('iconPause');
const statusEl = document.getElementById('status');
const volumeSlider = document.getElementById('volume');

const streamURL = "https://uk2freenew.listen2myradio.com/live.mp3?typeportmount=s1_33304_stream_944158957";

let isPlaying = false;
let isLoading = false; // evita clicks rápidos

function startLive() {
    if (isLoading) return; // bloquea llamadas repetidas

    isLoading = true;
    audio.pause();
    audio.src = streamURL;
    audio.load();
    audio.play().then(() => {
        isPlaying = true;
        isLoading = false;
        iconPlay.style.display = 'none';
        iconPause.style.display = 'block';
        statusEl.textContent = 'LIVE';
        playPauseBtn.disabled = false;
    }).catch(() => {
        isPlaying = false;
        isLoading = false;
        statusEl.textContent = 'OFFLINE';
        playPauseBtn.disabled = false;
        iconPlay.style.display = 'block';
        iconPause.style.display = 'none';
    });
}

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
        iconPlay.style.display = 'block';
        iconPause.style.display = 'none';
    } else {
        startLive();
    }
});

volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

audio.volume = 0.7;
