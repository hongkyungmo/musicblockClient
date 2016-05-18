var currentPlayingIndexForSound = -1.1;//재생 중인 음악이 없을 땐 인덱스를 의미 없는 숫자인 -1.1로 설정
//setInterval로 움직이는 타이머 초기화용 변수
var blockTimerClearer;
var noteTimerClearer;

var playMusic = function(currentClickedIndex){
	var musicInfo = $(".swiper-slide:eq("+currentClickedIndex+")").data("notes");
	console.log("playMusic func start : " + musicInfo);
	//샘플 : "1&1,2,3/1&11,12,13"
	blockArr = musicInfo.split('/');
	
	blockWalker = 0;
	blockWalkerLimit = blockArr.length;
	playBlock();
}

var stopMusic = function(){
	clearInterval(blockTimerClearer);
	clearInterval(noteTimerClearer);
}

//노트코드를 넣으면 음을 정지해 주는 함수
var stopNote = function (noteVal) {
	//oscArr[noteVal].disconnect(gain);
}

var playBlock = function(){
	console.log("playBlock func start");
	//볼륨 높임
	mainVolume = 2;
	gain.gain.value = mainVolume;
	
	
	//초와 음 집합으로 쪼개기
	var secAndNotesArr = blockArr[blockWalker++].split('&');
	var musicSec = secAndNotesArr[0];
	musicNotesArr = secAndNotesArr[1].split(',');
	
	noteWalker = 0;
	noteWalkerLimit = musicNotesArr.length;
	playNote(musicNotesArr[noteWalker++]);//첫 음 재생
	noteTimerClearer = setInterval(function(){
		if(noteWalker < noteWalkerLimit){
			stopNote(musicNotesArr[noteWalker-1]);
			playNote(musicNotesArr[noteWalker++]);
		}else{
			stopNote(musicNotesArr[noteWalker-1]);
			mainVolume = 0;
			gain.gain.value = mainVolume;
			clearInterval(noteTimerClearer);
			if(blockWalker != blockWalkerLimit){
				playBlock();
			}else{
				stopAnimationByMusicEnding();
				currentPlayingIndexForSound = -1.1;
			}
		}
	}, musicSec/musicNotesArr.length*1000);
}

//재생 시나리오
$(function(){
	$(document).on("click", ".noteVisualContainer", function() {
		var currentClickedIndex = $(".noteVisualContainer").index(this);
		
		if(currentPlayingIndexForSound == -1.1){//현재 재생 중인 음악 없음
			console.log("Play시나리오 : 재생 시작");
			currentPlayingIndexForSound = currentClickedIndex;
			playMusic(currentClickedIndex);
		}else{//현재 재생 중인 음악 있음
			if(currentClickedIndex == currentPlayingIndexForSound){// Stop 시나리오
				console.log("Stop시나리오");
				stopNote(musicNotesArr[noteWalker-1]);
				currentPlayingIndexForSound = -1.1;
			}else{//Play 시나리오
				console.log("Play시나리오 : 기존 재생되던 것 중지하고, 현재 음악 재생 시작");
				stopNote(musicNotesArr[noteWalker-1]);
				currentPlayingIndexForSound = currentClickedIndex;
				stopMusic();
				playMusic(currentClickedIndex);
			}
		}
	});
});

//정지 시나리오
$(function(){
	$(document).on("click", ".stopContainer", function() {
		clearInterval(blockTimerClearer);
		clearInterval(noteTimerClearer);
		mainVolume = 0;
		gain.gain.value = mainVolume;
	});
});