//전역 변수
var mainVolume = 0;
var currentPlayingIndexForSound = -1.1;//재생 중인 음악이 없을 땐 인덱스를 의미 없는 숫자인 -1.1로 설정
//setInterval로 움직이는 타이머 초기화용 변수
var blockTimerClearer;
var noteTimerClearer;
//walker
var blockWalker;
var noteWalker;
//walker 끝내기용 변수
var blockWalkerLimit;
var noteWalkerLimit;
//블럭+블럭+블럭... 배열
var blockArr;
var musicNotesArr;


//오디오컨텍스트 설정 및 생성
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext();

//오실레이터, 게인 생성
//var oscillator = audioContext.createOscillator();
var gain = audioContext.createGain();

var oscArr = new Array();
for(var i=0;i<=48;i++){
	oscArr[i] = audioContext.createOscillator();
	oscArr[i].start(0);
}
oscArr[0].frequency.value = 0;

//오실레이터 설정
/*oscillator.type = 'sine'; //파형의 형태 sine, square, sawtooth, triangle, custom 등
oscillator.frequency.value = 300; //주파수
oscillator.connect(gain); //게인과 연결

//게인 설정
gain.gain.value = mainVolume; //볼륨
gain.connect(audioContext.destination); //데스티네이션(스피커)와 연결

//오실레이터 시작
oscillator.start();*/

//notecode(1~48)을 주파수로 변환해주는 함수
var noteCodeToFreq = function (noteVal) {
	console.log(130.8128 * Math.pow(1.0594630943592952645618252949463, noteVal - 1));
    return 130.8128 * Math.pow(1.0594630943592952645618252949463, noteVal - 1);
}

//노트코드를 넣으면 음을 재생해주는 함수
var playNote = function (noteVal) {
	if(noteVal!=0){
		oscArr[noteVal].frequency.value = noteCodeToFreq(noteVal);
	}
	
	gain.gain.value = mainVolume;
    oscArr[noteVal].connect(gain);
    gain.connect(audioContext.destination);
}

//노트코드를 넣으면 음을 재생해 주는 함수
var stopNote = function (noteVal) {
	oscArr[noteVal].disconnect(gain);
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

var playMusic = function(currentClickedIndex){
	var musicInfo = $(".swiper-slide:eq("+currentClickedIndex+")").data("musicInfo");
	console.log("playMusic func start : " + musicInfo);
	//샘플 : "1&1,2,3/1&11,12,13"
	blockArr = musicInfo.split('/');
	mainVolume = 2;
	
	blockWalker = 0;
	blockWalkerLimit = blockArr.length;
	playBlock();
}

var stopMusic = function(){
	clearInterval(blockTimerClearer);
	clearInterval(noteTimerClearer);
	mainVolume = 0;
	gain.gain.value = mainVolume;
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