const songs = ["siddhat.mp3", "ghoomar.mp3", "jhol.mp3"]; // Replace with actual song files
let currentIndex = songs.indexOf(new URLSearchParams(window.location.search).get("song"));

const songList = document.getElementById("song-list");
if (songList) {
    songs.forEach(song => {
        let li = document.createElement("li");
        li.classList.add("list-group-item");
        li.innerHTML = `<a href="player.html?song=${encodeURIComponent(song)}">${song}</a>`;
        songList.appendChild(li);
    });
}

const urlParams = new URLSearchParams(window.location.search);
const song = urlParams.get("song");

if (song) {
    document.getElementById("song-title").innerText = song.replace(".mp3", ""); // Remove .mp3 from title
    const audio = document.getElementById("audio");
    const seekBar = document.getElementById("seek-bar");

    audio.src = `songs/${decodeURIComponent(song)}`;

    document.getElementById("play").addEventListener("click", () => audio.play());
    document.getElementById("pause").addEventListener("click", () => audio.pause());
    document.getElementById("stop").addEventListener("click", () => {
        audio.pause();
        audio.currentTime = 0;
    });

    document.getElementById("loop").addEventListener("click", function() {
        audio.loop = true;
        this.disabled = true; // Disable button after clicking
    });

    document.getElementById("shuffle").addEventListener("click", function() {
        shuffleSongs();
        this.disabled = true; // Disable button after clicking
    });

    document.getElementById("prev").addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + songs.length) % songs.length;
        window.location.href = `player.html?song=${encodeURIComponent(songs[currentIndex])}`;
    });

    document.getElementById("next").addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % songs.length;
        window.location.href = `player.html?song=${encodeURIComponent(songs[currentIndex])}`;
    });

    // 🎵 Seek Bar Functionality
    audio.addEventListener("timeupdate", () => {
        seekBar.max = audio.duration;
        seekBar.value = audio.currentTime;
        document.getElementById("current-time").innerText = formatTime(audio.currentTime);
        document.getElementById("total-duration").innerText = formatTime(audio.duration);
    });
    

    seekBar.addEventListener("input", () => {
        audio.currentTime = seekBar.value;
    });

    // Seek Song
seekBar.addEventListener("input", () => {
    audio.currentTime = seekBar.value;
});

// Function to Format Time (MM:SS)
function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}
}


function shuffleSongs() {
    for (let i = songs.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [songs[i], songs[j]] = [songs[j], songs[i]];
    }
    currentIndex = 0;
    window.location.href = `player.html?song=${encodeURIComponent(songs[currentIndex])}`;
}
