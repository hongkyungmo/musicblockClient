//볼륨조절 전역변수
var mainVolume = 0;
/*var volumeSaver = 2;*/
//블록 플레이를 위한 변수
var timerIdForPlaying = 0;
var countForPlaying = 0;
var blockWalker = 0;
var noteWalker = 0;
var arr = Array();


window.AudioContext = window.AudioContext || window.webkitAudioContext;

//오디오컨텍스트 생성
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

//notecode(1~48)을 주파수로 변환해주는 함수
var noteCodeToFreq = function (noteVal) {
    return 130.8128 * Math.pow(1.0594630943592952645618252949463, noteVal - 1);
}

//음 코드(1~48)를 넣으면 음을 연주해주는 함수
var playNote = function (noteVal) {
	if(noteVal!=0){
		oscArr[noteVal].frequency.value = noteCodeToFreq(noteVal);
	}
    
    gain.gain.value = mainVolume;
    oscArr[noteVal].connect(gain);
    gain.connect(audioContext.destination);
    console.log(noteVal);
}

var stopNote = function (noteVal) {
	oscArr[noteVal].disconnect(gain);
}

//play버튼 눌러서 블럭 연주
$(function () {
	// 블럭연주 - 음
	$("#btn-play").click(playAllBlocks);
	$("#btn-play").bind("click", function () {

	});
});

var playAllBlocks = function() {
	blockWalker = 0;
	playOneBlock();
}

var playOneBlock = function () {
	//blockWalker:블럭순회자 //블럭의 갯수만큼 재귀적 반복 시행
	if (blockWalker != $("#work-layer > li").length) {
		var count = 0;
		var blockSec = 0;
		//my-blocks -> work-layer로 변경해야 함(현재는 data가 my-blocks에 들어있는 상태)
		//notes 저장
		
		/*블럭 단위 반복 시작*/
		arr = $("#work-layer > li:eq("+blockWalker+")").data("block").notes.split(",");
		blockSec =$("#work-layer > li:eq("+blockWalker+")").data("block").sec;
		mainVolume = 2;
		playNote(arr[noteWalker]);
		
		countForPlaying = arr.length;
		timerIdForPlaying = setInterval(function(){
			noteWalker++;
			if(noteWalker == countForPlaying){
				stopNote(arr[noteWalker-1]);
				clearInterval(timerIdForPlaying);
				mainVolume = 0;
				gain.gain.value = mainVolume;
				noteWalker = 0;
				blockWalker++;
				playOneBlock();
			}else{
				stopNote(arr[noteWalker-1]);
				playNote(arr[noteWalker]);
			}
		}, (blockSec*1000)/countForPlaying);
		/*블럭 단위 반복 종료*/
	}
}