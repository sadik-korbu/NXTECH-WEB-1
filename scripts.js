document.addEventListener('DOMContentLoaded', function () {
    const songname = ["sample-3s", "sample-9s", "sample-12s"];
    let audio = document.getElementById('audio');
    const playButton = document.getElementById('play-button');
    const seekBar = document.getElementById('seek-bar');
    const currentTimeLabel = document.getElementById('current-time');
    const totalTimeLabel = document.getElementById('total-time');
    let count = 1;
    let i = 0;
  
    audio.addEventListener('loadedmetadata', function () {
      const totalTime = formatTime(audio.duration);
      totalTimeLabel.textContent = totalTime;
      seekBar.max = audio.duration;
      const titleOfSong = audio.src;
      const fileNameWithExtension = titleOfSong.substring(titleOfSong.lastIndexOf('/') + 1);
      const fileName = fileNameWithExtension.substring(0, fileNameWithExtension.lastIndexOf('.'));
      document.getElementById('song-name').innerHTML = fileName;
    });
  
    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
  
    audio.addEventListener('timeupdate', function () {
      const currentTime = audio.currentTime;
      seekBar.value = currentTime;
      currentTimeLabel.textContent = formatTime(currentTime);
      if (currentTime === audio.duration) {
        nextMusic();
        count = 1;
        playMusic();
      }
    });
  
    seekBar.addEventListener('input', function () {
      audio.currentTime = parseFloat(seekBar.value);
    });
  
    function playMusic() {
      if (count % 2 === 0) {
        playButton.src = "/controls/playbutton.png";
        audio.pause();
      } else {
        playButton.src = "/controls/pausebutton.png";
        audio.play();
      }
      count++;
    }
  
    function nextMusic() {
      playButton.src = "/controls/playbutton.png";
      count = 1;
      audio.src = "./music/" + songname[i] + ".mp3";
      i++;
      if (i >= songname.length) {
        i = 0;
      }
    }
  
    function backMusic() {
      playButton.src = "/controls/playbutton.png";
      count = 1;
      i--;
      if (i < 0) {
        i = songname.length - 1;
      }
      audio.src = "./music/" + songname[i] + ".mp3";
    }
  
    // Initialize the music player
    audio.src = "./music/" + songname[i] + ".mp3";
  
    // Add event listeners to control buttons
    playButton.addEventListener('click', playMusic);
    document.getElementById('next-button').addEventListener('click', nextMusic);
    document.getElementById('back-button').addEventListener('click', backMusic);
  });
  