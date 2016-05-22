//14 revision이 전자음 정상 플레이 되는 버전
//블록 플레이를 위한 변수
var timerIdForPlaying = 0;
var countForPlaying = 0; //clickSequence의 복제품
var noteRunner = 0;

//음 길이
var length = 5;

//오디오 및 사운드 보조파트 생성
//var audio = new Audio();
var audio = [];
for(var i=0;i<10;i++){
	audio[i] = new Audio();
}

if(noteRunner == 0){
}


var context = new AudioContext();
var source = context.createMediaElementSource(audio[0]);
var source = context.createMediaElementSource(audio[1]);
var gain = context.createGain();
var gain1 = context.createGain();
var compressor = context.createDynamicsCompressor();

//노트워커, 블록워커
var blockWalker = 0;
var noteWalker = 0;

//음 코드(1~48)를 넣으면 음을 연주해주는 함수
var playNote = function (noteVal) {
	if(noteVal==0){
		return;
	}
	
	
	audio[noteRunner].src = 'notes/'+noteVal+'.mp3';
	audio[noteRunner].controls = true;
	audio[noteRunner++].autoplay = true;
	gain.gain.value = 2;
	
	
	source.connect(gain);
	
	gain.connect(compressor);
	gain1.connect(compressor);
	compressor.connect(context.destination);
	
	if(noteRunner == 10){
		for(var i=0;i<10;i++){
			audio[noteRunner] = null;
			audio[noteRunner] = new Audio();
		}
		noteRunner = 0;
	}
	
	console.log(noteVal);
}

//play버튼 눌러서 블럭 연주
$(function () {
	// 블럭연주 - 음
	$("#btn-play").click(function(){
		blockWalker = 0;
		playOneBlock();
	});
});

//블록 플레이를 위한 변수
var timerIdForPlaying = 0;
var countForPlaying = 0;

var playOneBlock = function () {
	//blockWalker:블럭순회자 //블럭의 갯수만큼 재귀적 반복 시행
	if (blockWalker != $("#work-layer > li").length) {
		var count = 0;
		var blockSec = 0;
		
		/*블럭 단위 반복 시작*/
		var arr = $("#work-layer > li:eq("+blockWalker+")").data("block").notes.split(",");
		blockSec =$("#work-layer > li:eq("+blockWalker+")").data("block").sec;
		playNote(arr[noteWalker]);
		
		countForPlaying = arr.length;
		timerIdForPlaying = setInterval(function(){
			noteWalker++;
			if(noteWalker == countForPlaying){
				clearInterval(timerIdForPlaying);
				noteWalker = 0;
				blockWalker++;
				playOneBlock();
			}else{
				playNote(arr[noteWalker]);
			}
		}, (blockSec*1000)/countForPlaying);
		/*블럭 단위 반복 종료*/
	}
}