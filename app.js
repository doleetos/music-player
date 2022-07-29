const musicContainer = document.querySelector('#music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');
const playlistBtn = document.querySelector('#playlist-button');
const playlist = document.querySelector('.playlist');
const playlistItems = document.querySelector('.playlist-items');


// song titles
const songs = [
    'IVE - Love Dive',
    'aespa - Savage',
    'Jennie - Solo',
    'Le Sserafim - Fearless',
    '(G)I-DLE - TOMBOY',
    'Mamamoo - HIP',
    'TWICE - Alcohol Free',
    '오마이걸 - Dun Dun Dance',
    '청하 - Roller Coaster',
    'IU - Lilac'
];


// keep track of songs
let songIndex = 1;


// initially load song info to DOM
loadSong(songs[songIndex]);


//update song details
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}

function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress(event) {
    const { duration, currentTime } = event.srcElement;
    const progressPercent = (currentTime / duration * 100);
    progress.style.width = `${progressPercent}%`;
}

function setProgress(event) {
    const width = this.clientWidth;
    const clickX = event.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

let counter = 1;
function displayTracks() {
    for ( i = 0; i < songs.length; i++) {
        let div = document.createElement('div');
        div.classList.add('playlistItems');
        div.innerHTML = `<p><span>${counter++}: </span>${songs[i]}</p>`;
        playlistItems.appendChild(div);
    }
}


// event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

playlistBtn.addEventListener('click', () => {
    if (playlist.style.opacity == "0") {
        playlist.style.opacity = "1";
    } else {
        playlist.style.opacity = "0";
    }
});

// change song events
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);

displayTracks();