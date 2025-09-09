const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPause');
const iconPlay = document.getElementById('iconPlay');
const iconPause = document.getElementById('iconPause');
const progress = document.getElementById('progress');
const statusEl = document.getElementById('status');
const volumeSlider = document.getElementById('volume');

const streamURL = "https://uk2freenew.listen2myradio.com/live.mp3?typeportmount=s1_33304_stream_944158957";
let isPlaying = false;

function startLive() {
    audio.pause();
    audio.src = streamURL;
    audio.load();
    audio.play().then(() => {
        isPlaying = true;
        iconPlay.style.display = 'none';
        iconPause.style.display = 'block';
        statusEl.textContent = 'LIVE';
        playPauseBtn.disabled = false;
    }).catch(() => {
        statusEl.textContent = 'OFFLINE';
        playPauseBtn.disabled = true;
    });
}

playPauseBtn.addEventListener('click', () => {
    if(isPlaying){
        audio.pause();
        isPlaying = false;
        iconPlay.style.display = 'block';
        iconPause.style.display = 'none';
    } else {
        startLive();
    }
});

audio.addEventListener('timeupdate', () => {
    progress.style.width = '100%';
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

audio.volume = 0.7;
