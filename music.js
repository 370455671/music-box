


var currentIndex = 0
var audioObject = new Audio()
audioObject.autoplay = true
var musicList = []

function $(selector){
    return document.querySelector(selector)
}

function getMusicList(callback){
    var xhr = new XMLHttpRequest()
    xhr.open('GET','music.json','true')
    xhr.onload = function(){
        if((xhr.status >= 200 && xhr.status <= 300)||xhr.status === 304){
            callback(JSON.parse(this.responseText))
        }else{
            console.log('get json failed')
        }
    xhr.onerror = function(){
        console.log('net work error')
    }
    }
    xhr.send()
}

getMusicList(function(list){
    // console.log(list)
    // var song = list[0]
    // var audioObject = new  Audio(song.src)
    // audioObject.play()
    musicList = list
    loadMusic(list[currentIndex])
    generateList(list)
})
function generateList(e){
    
}

function loadMusic(musicObj){
    // console.log(musicObj)
    $(".songName").innerText = musicObj.title
    $(".singer").innerText = musicObj.auther
    $(".cover").style.backgroundImage = "url(" + musicObj.img +")"
    audioObject.src = musicObj.src
    
}
audioObject.ontimeupdate = function(){
    var min = Math.floor(this.currentTime/60)
    var sec = Math.floor(this.currentTime)%60 + ''
    sec = sec.length===2?sec:'0' +sec
    $(".currentTime").innerText =min +":"+sec
    $(".barCurrent").style.width = (this.currentTime/this.duration)*100+'%'
    // $(".barCurrent").setAttribute("width","(this.currentTime/this.duration)*350px")
}

    $(".pause").onclick = function(){
        if(audioObject.paused === false){
        audioObject.pause()
        $("#pause").setAttribute("xlink:href","#icon-play")
        }else{
            audioObject.play()
            $("#pause").setAttribute("xlink:href","#icon-pause")

        }
    }
    $(".next").onclick = function(){
        currentIndex = (++currentIndex)%(musicList.length)
        loadMusic(musicList[currentIndex])
    }
    $(".back").onclick = function(){
        currentIndex = (musicList.length + --currentIndex)%(musicList.length)
        loadMusic(musicList[currentIndex])
    }
    $(".bar").onclick = function(e){
        var percent = e.offsetX / parseInt(getComputedStyle(this).width)
        audioObject.currentTime = audioObject.duration * percent

    }
    audioObject.onended= function(){
        currentIndex = (++currentIndex)%(musicList.length)
        loadMusic(musicList[currentIndex])
    }