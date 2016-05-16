$(function() {
	$(".key").bind(keyDown, function() {
		if ($("#display-bar").length == 0) {
			var index_of_key = $(".key").index(this);

			var noteCodeForPlayNote = index_of_key + 12 * (octave-1) + 1;
			switch (index_of_key) {
			case 0:
				playNote(noteCodeForPlayNote);
				break;
			case 1:
				playNote(noteCodeForPlayNote);
				break;
			case 2:
				playNote(noteCodeForPlayNote);
				break;
			case 3:
				playNote(noteCodeForPlayNote);
				break;
			case 4:
				playNote(noteCodeForPlayNote);
				break;
			case 5:
				playNote(noteCodeForPlayNote);
				break;
			case 6:
				playNote(noteCodeForPlayNote);
				break;
			case 7:
				playNote(noteCodeForPlayNote);
				break;
			case 8:
				playNote(noteCodeForPlayNote);
				break;
			case 9:
				playNote(noteCodeForPlayNote);
				break;
			case 10:
				playNote(noteCodeForPlayNote);
				break;
			case 11:
				playNote(noteCodeForPlayNote);
				break;
			}
		}
	});
});

$(function() {
	$(".key").bind(keyUp, function() {
		if ($("#display-bar").length == 0) {
			var index_of_key = $(".key").index(this);

			var noteCodeForStopNote = index_of_key + 12 * (octave-1) + 1;
			switch (index_of_key) {
			case 0:
				stopNote(noteCodeForStopNote);
				break;
			case 1:
				stopNote(noteCodeForStopNote);
				break;
			case 2:
				stopNote(noteCodeForStopNote);
				break;
			case 3:
				stopNote(noteCodeForStopNote);
				break;
			case 4:
				stopNote(noteCodeForStopNote);
				break;
			case 5:
				stopNote(noteCodeForStopNote);
				break;
			case 6:
				stopNote(noteCodeForStopNote);
				break;
			case 7:
				stopNote(noteCodeForStopNote);
				break;
			case 8:
				stopNote(noteCodeForStopNote);
				break;
			case 9:
				stopNote(noteCodeForStopNote);
				break;
			case 10:
				stopNote(noteCodeForStopNote);
				break;
			case 11:
				stopNote(noteCodeForStopNote);
				break;
			}
		}
	});
});