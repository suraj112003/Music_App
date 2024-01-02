
const wrapper = document.querySelector(".wrapper");
const musicImg = wrapper.querySelector(".img-area img");
const musicName = wrapper.querySelector(".song-details .name");
const musicArtist = wrapper.querySelector(".song-details .artist");
const mainAudio = wrapper.querySelector("#main-audio");
const playPauseBtn = document.querySelector(".play-pause"); 
const prevBtn = document.querySelector("#prev"); 
const nextBtn = document.querySelector("#next"); 
const progressArea = wrapper.querySelector(".progress-area"); 
const progressBar = wrapper.querySelector(".progress-bar"); 
//  class "current-time" to display the current time
const currentTime = document.querySelector(".current-time");
// "total-duration" to display the total duration
const duration= document.querySelector(".total-duration");
const musicList= wrapper.querySelector(".music-list");
 const showMoreBtn= wrapper.querySelector("#more-music");
 const hideMusicBtn= musicList.querySelector("#close");
//letload random music on page refresh
let musicIndex = Math.floor((Math.random()*allMusic.length)+1);

window.addEventListener("load", () => {
    console.log("Page loaded");
    loadMusic(musicIndex);
});
//loading function
function loadMusic(indexNumb) {
    console.log("Loading music:", indexNumb);
    console.log("Music data:", allMusic[indexNumb - 1]);
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `images/${allMusic[indexNumb - 1].img}.jpg`;
    mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`;

    console.log("Image source:", musicImg.src);
    console.log("main audio:", mainAudio.src);
}

//play function 
function playMusic() {
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText="pause"
    mainAudio.play();
}
//pause function 
function pauseMusic() {
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText="play_arrow"
    mainAudio.pause();
}
//next function

function nextMusic(){
    musicIndex++;
    //if musicindex becomes greater than musiclength then the musicindex becomes one and 1st song will be played
    musicIndex>allMusic.length ? musicIndex=1: musicIndex= musicIndex;
    loadMusic(musicIndex) ;
    playMusic();
}
//previous song functiom
function prevMusic(){
    musicIndex--;
    musicIndex< 1 ? musicIndex=allMusic.length: musicIndex= musicIndex;
    loadMusic(musicIndex) ;
    playMusic();
}
//play button
document.addEventListener("DOMContentLoaded", function () {
    playPauseBtn.addEventListener("click", () => {
        const isMusicPause = wrapper.classList.contains("paused");
        isMusicPause ? pauseMusic() : playMusic();
        console.log("playPause",playPauseBtn);
});})

nextBtn.addEventListener("click",()=>{
nextMusic(); //calling it
})
prevBtn.addEventListener("click",()=>{
    prevMusic(); //calling it
    })



//progress bar
mainAudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime; //getting current time
    const duration = e.target.duration; //total time of song
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = wrapper.querySelector(".current");
    let musicDuration = wrapper.querySelector(".duration");

    // Move this part inside the loadeddata event listener
    mainAudio.addEventListener("loadeddata", () => {
        // updating song time
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if (totalSec < 10) {
            // adding zero if sec is less than 10
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;
    });

    // Move this part inside the timeupdate event listener
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
        // adding zero if sec is less than 10
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

// update song on the basis of the progress bar width
progressArea.addEventListener("click", (e) => {
    let progressWidthVal = progressArea.clientWidth;
    let clickedOffsetX = e.offsetX; 
    let songDuration = mainAudio.duration;
    mainAudio.currentTime = (clickedOffsetX / progressWidthVal) * songDuration;
    playMusic();
});
//let's make repeat and suffle feature
const repeatBtn=wrapper.querySelector("#repeat_plist");
//first we get the innertext of the icon then we'll change accordingly
repeatBtn.addEventListener("click",()=>{
    let getText=repeatBtn.innerText;
    switch(getText){
        case "repeat":
            repeatBtn.innerText='repeat_one';
            repeatBtn.setAttribute("title","Song looped")
            break;
            case "repeat_one": //if icon is repeat_one change it to shuffle
            repeatBtn.innerText="shuffle";
            repeatBtn.setAttribute("title","Playback shuffle")
            break;
            case "shuffle": //if icon is shuffle change it to repeat
            repeatBtn.innerText="repeat";
            repeatBtn.setAttribute("title","Playlist looped")
            break;
    
    }
})
//lets work on the function of the icon we created above
//after the song ended
mainAudio.addEventListener("ended",()=>{
    //we'll do acc. to the icon 
    let getText=repeatBtn.innerText;
    switch(getText){
        case "repeat": //id this is repeat then simply we call the nextmusic func. so the next song will play
           nextMusic();
           break;
            case "repeat_one": //if icon is repeat_one then we'll change playing song current time to 0 so it will again play the same song
          mainAudio.currentTime=0;
          loadMusic(musicIndex);
          playMusic();
            break;
            case "shuffle": //if icon is shuffle change it to repeat
           let randIndex= Math.floor((Math.random()*allMusic.length)+1)
           do{
             randIndex= Math.floor((Math.random()*allMusic.length)+1)
           } while(musicIndex==randIndex); // this loop works until the next random numb won't be the same of current music index
           musicIndex=randIndex;//passing randomindex to musicindex so the ransom song will play
           loadMusic(musicIndex);//calling loadmusic func
           playMusic(); //calling playmusic func
            break;
    
    }
})


showMoreBtn.addEventListener("click",()=>{
    musicList.classList.toggle("show");
 })
 hideMusicBtn.addEventListener("click",()=>{
    showMoreBtn.click();
 })
 
const ulTag = wrapper.querySelector("ul");
// Function to format time
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

for (let i = 0; i < allMusic.length; i++) {
    let liTag = `<li li-index="${i} ]>
        <div class="row">
            <span>${allMusic[i].name}</span>
            <p>${allMusic[i].artist}</p>
        </div> 
        <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
        <span id="${allMusic[i].src}" class="duration">00:00</span>
    </li>`;
    ulTag.insertAdjacentHTML("beforeend", liTag);

    // Add an event listener to each audio tag for updating the duration
    let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);
    liAudioTag.addEventListener("loadeddata", () => {
        let audioDuration = liAudioTag.duration;
        let formattedDuration = formatTime(audioDuration);
        ulTag.querySelector(`#${allMusic[i].src}`).innerText = formattedDuration;
        

    });
}
//lets create a function of play an partcular song when we click on it
// Function to handle song list item click
function playSongFromList(index) {
    // Stop the currently playing song, if any
    mainAudio.pause();
    mainAudio.currentTime = 0;

    // Load and play the selected song
    musicIndex = index;
    loadMusic(musicIndex);
    playMusic();

    // Change the color of the clicked list item to violet
    const allListItems = ulTag.querySelectorAll("li");
    allListItems.forEach((item, i) => {
        if (i === index - 1) {
            item.style.backgroundColor = "#e5b6e9"
        } else {
            item.style.backgroundColor = ""; // Reset other items to default color
        }
        
    });
}

// Add click event listeners to each song list item
const allListItems = ulTag.querySelectorAll("li");
allListItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        playSongFromList(index + 1); // Add 1 because index starts from 0
    });
});

