//notecode(1~48)을 주파수로 변환해주는 함수
var noteCodeToFreq = function (noteVal) {
    return 130.8128 * Math.pow(1.0594630943592952645618252949463, noteVal - 1);
}






window.AudioContext = window.AudioContext || window.webkitAudioContext;
//오디오컨텍스트 생성
var audioContext = new AudioContext();

//오실레이터, 게인 생성
var oscillator = audioContext.createOscillator();
var gain = audioContext.createGain();

//오실레이터 설정
oscillator.type = 'sine'; //파형의 형태 sine, square, sawtooth, triangle, custom 등
oscillator.frequency.value = 500; //주파수
oscillator.connect(gain); //게인과 연결

//게인 설정
gain.value = mainVolume; //볼륨
gain.connect(audioContext.destination); //데스티네이션(스피커)와 연결

//오실레이터 시작
oscillator.start();
gain.disconnect(audioContext.destination);








// play버튼 눌러서 블럭 연주
$(function () {
    $("#play").bind("mousedown", function () {

    });

    // 블럭연주 - 음
    $("#play").bind("mousedown", function () {
        var count = 0;
        if (clickSequence != 0) {
            playNote(noteCodeToFreq(13));
            sleep(500);
            playNote(noteCodeToFreq(15));
            sleep(500);
            playNote(noteCodeToFreq(17));
            sleep(500);
            playNote(noteCodeToFreq(18));
            sleep(500);
            playNote(noteCodeToFreq(20));
            sleep(500);
            playNote(noteCodeToFreq(22));
            sleep(500);
            playNote(noteCodeToFreq(24));
            sleep(500);
            playNote(noteCodeToFreq(25));
            sleep(500);
        }
    });

    $("#play").bind("mouseup", function () {

    });
});

var playNote = function (noteVal) {
    oscillator.frequency.value = noteVal;
    gain.connect(audioContext.destination);
    setTimeout(function () {
        gain.disconnect(audioContext.destination);
    }, 1000);
    //테스트코드
    console.log(noteVal);
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}