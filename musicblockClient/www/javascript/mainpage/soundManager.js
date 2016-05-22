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


var context = new AudioContext();
var analyser = context.createAnalyser();
var source = context.createMediaElementSource(audio[0]);
var gain = context.createGain();
var compressor = context.createDynamicsCompressor();


//음 코드(1~48)를 넣으면 음을 연주해주는 함수
var playNote = function (noteVal) {
	if(noteVal==0){
		return;
	}
	
	//음 연주
	audio[noteRunner].src = 'notes/'+noteVal+'.mp3';
	audio[noteRunner].controls = true;
	audio[noteRunner++].autoplay = true;
	gain.gain.value = 2;
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