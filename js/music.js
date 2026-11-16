document.addEventListener('DOMContentLoaded', function() {
    if (window.__musicPlayerInited__) return;
    window.__musicPlayerInited__ = true;
    
    if (typeof musicConfig === 'undefined' || !musicConfig.playlist || musicConfig.playlist.length === 0) {
        return;
    }

    const playlist = musicConfig.playlist;
    let currentSongIndex = 0;
    let isPlaying = false;

    const audio = document.getElementById('audioPlayer');
    const playBtn = document.getElementById('playBtn');
    const playIcon = document.getElementById('playIcon');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressBar = document.getElementById('progressBar');
    const progressContainer = document.getElementById('progressContainer');
    const songTitle = document.getElementById('songTitle');
    const albumArt = document.getElementById('albumArt');
    const widget = document.querySelector('.music-widget');

    function loadSong(song) {
        songTitle.innerText = `${song.title} - ${song.artist}`;
        audio.src = song.url;
        albumArt.style.backgroundImage = `url("${song.cover}")`;
        
        progressBar.style.width = '0%';
    }

    function playSong() {
        widget.classList.add('playing');
        playIcon.classList.remove('ri-play-large-fill');
        playIcon.classList.add('ri-pause-large-fill');
        audio.play().catch(e => console.log("Auto-play prevented:", e));
        isPlaying = true;
    }

    function pauseSong() {
        widget.classList.remove('playing');
        playIcon.classList.remove('ri-pause-large-fill');
        playIcon.classList.add('ri-play-large-fill');
        audio.pause();
        isPlaying = false;
    }

    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    });

    prevBtn.addEventListener('click', () => {
        currentSongIndex--;
        if (currentSongIndex < 0) {
            currentSongIndex = playlist.length - 1;
        }
        loadSong(playlist[currentSongIndex]);
        playSong();
    });

    nextBtn.addEventListener('click', () => {
        currentSongIndex++;
        if (currentSongIndex > playlist.length - 1) {
            currentSongIndex = 0;
        }
        loadSong(playlist[currentSongIndex]);
        playSong();
    });

    audio.addEventListener('timeupdate', (e) => {
        const { duration, currentTime } = e.srcElement;
        if(isNaN(duration)) return;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
    });

    audio.addEventListener('ended', () => {
        nextBtn.click();
    });

    loadSong(playlist[currentSongIndex]);
    
    if (musicConfig.autoplay) {
        playSong();
    }
});