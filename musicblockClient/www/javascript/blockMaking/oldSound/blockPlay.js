// play버튼 눌러서 블럭 연주
$(function () {
	// 블럭연주 - 음
	$("#play").bind(keyDown, function () {
		if ($("#display-bar").length == 1) {
			var count = 0;
			if (clickSequence != 0) {
				countForPlaying = clickSequence;
				console.log(noteArr[clickSequence - countForPlaying]);
				playNote(noteArr[clickSequence - countForPlaying]);
				timerIdForPlaying = setInterval(function () {
					countForPlaying--;
					console.log(countForPlaying);
					if (noteArr[clickSequence - countForPlaying] != undefined) {
						stopNote(noteArr[clickSequence - countForPlaying-1]);
						playNote(noteArr[clickSequence - countForPlaying]);
					}
					if (countForPlaying == 0) {
						//alert("end!!");
						stopNote(noteArr[clickSequence - countForPlaying-1]);
						clearInterval(timerIdForPlaying);
						mainVolume = 0;
						gain.gain.value = mainVolume;
					}
				}, blockAnimateTime / clickSequence);
			}
		}else{
			
		}
	});
});


$(function () {
	$("#play").bind(keyDown, function () {
		if ($("#display-bar").length == 0) {
			stopNote(noteArr[clickSequence - countForPlaying]);
			clearInterval(timerIdForPlaying);
			mainVolume = 0;
			gain.gain.value = mainVolume;
		}
	});
});