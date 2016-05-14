//블럭 길이 조절
$(function(){
	$("#block-time-length-container").bind("click", function(){
//		var test = "3s";
//		var testResult = test.replace(/[^0-9]/g, '');
		if(blockAnimateTime == 10000){
			blockAnimateTime = 2000;
		}else{
			blockAnimateTime += 2000;
		}

		//버튼에 블럭 재생시간 표시
		var blockTimeLengthForDisplay=null;
		blockTimeLengthForDisplay = blockAnimateTime/1000 + "s";
		$("#block-time-display").text(blockTimeLengthForDisplay);
	});
});