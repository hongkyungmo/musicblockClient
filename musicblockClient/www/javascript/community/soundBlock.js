// play버튼 눌러서 블럭 연주
$(document).on("click", ".player", function(){
	//element에 저장된 notes & sec 얻어오기
	var index = $(".player").index(this);
	var notes = $(".people:eq("+index+")").data("notes");
	var sec = $(".people:eq("+index+")").data("sec");
	
	//음을 array에 넣기
	var noteArr = new Array();
	noteArr = notes.split(",");
	
	//노트순회자
	var noteWalker = 0;
	
	//음 play
	if (true) {//재생중인 노래가 없는 경우의 일반적 play시나리오
		countForPlaying = noteArr.length;
		playNote(noteArr[noteWalker++]);
		timerIdForPlaying = setInterval(function () {
			if (noteArr[noteWalker] != undefined) {
				playNote(noteArr[noteWalker++]);
			}
			if (noteWalker == countForPlaying) {
				clearInterval(timerIdForPlaying);
			}
		}, sec * 1000 / noteArr.length);
	}
});
