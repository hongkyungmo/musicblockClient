var currentPlayingIndex = -1.1; //현재 재생되고 있는 음악의 인덱스(초기값은 -1임. -1인 경우 재생 중인 음악이 없는 것)
var tempElement = null;
//음악 재생 애니메이션
//$(function() {
var musicAnimation = function(){
	//재생 시각적 효과
	$(".noteVisualContainer").on("click", function() {
		//애니메이션 속도
		var barCycleLength = 200;
		//현재 클릭한 엘리먼트의 인덱스
		var currentClickedIndex = $(".noteVisualContainer").index(this);

		//현재 플레이 중인 엘리먼트를 재클릭 : stop명령으로 간주
		if(currentClickedIndex == currentPlayingIndex){
			
		}else{
			//클릭한 엘리먼트의 이미지 숨기기
			$(".noteVisualContainer:eq("+currentClickedIndex+") > i").css("visibility", "hidden");

			//<기존 플레이 되던 엘리먼트 stop>
			/*$(".noteVisualContainer:eq(" + currentPlayingIndex + ")").empty().append(tempElement);*/
			$(".noteVisualContainer:eq("+currentPlayingIndex+") > i").css("visibility", "visible");
			$(".noteVisualContainer:eq("+currentPlayingIndex+") > .noteVisualBar").remove();
			$(".stopContainer").remove();

			//<현재 클릭한 엘리먼트 play>
			//play animating div 생성
			currentPlayingIndex = $(".noteVisualContainer").index(this);
			$(".noteVisualContainer:eq("+ currentPlayingIndex + ")").append('<div class="noteVisualBar noteVisualOne"></div><div class="noteVisualBar noteVisualTwo"></div><div class="noteVisualBar noteVisualThree"></div><div class="noteVisualBar noteVisualFour"></div><div class="noteVisualBar noteVisualFive"></div><div class="noteVisualBar noteVisualSix"></div><div class="noteVisualBar noteVisualSeven"></div><div class="noteVisualBar noteVisualEight"></div><div class="noteVisualBar noteVisualNine"></div><div class="noteVisualBar noteVisualTen"></div>');

			setInterval(function() {
				var i = 0;

				for (var i = 1; i < 11; i++) {
					var rand = Math.floor((Math.random() * 100) + 1);
					$(".noteVisualContainer:eq("+ currentPlayingIndex+ ")").children(":eq(" + i + ")").animate({
						//실질적인 애니메이션이 들어가는 곳
						//여기서 하고 싶은 것을 하면 됨
						height : rand + "%"
					}, barCycleLength, function() {
						//매 주기가 끝나는 시점에 하고 싶은 것이 있으면 이곳에 기술하면 됨
					});
				}
			}, barCycleLength);
			
			$(".noteVisualContainer:eq("+ currentPlayingIndex + ")").append("<div class='stopContainer'></div>");
		}
	});
}


$(function(){
	$(document).on('click', ".stopContainer", function(){
		var currentClickedIndex = $(".noteVisualContainer").index(this);
		
		$(".noteVisualContainer > i").css("visibility", "visible");
		$(".noteVisualContainer > .noteVisualBar").remove();
		$(".stopContainer").remove();
		currentPlayingIndex = -1.1;
	});
});

var stopAnimationByMusicEnding = function(){
	$(".noteVisualContainer > i").css("visibility", "visible");
	$(".noteVisualContainer > .noteVisualBar").remove();
	$(".stopContainer").remove();
	currentPlayingIndex = -1.1;
}

$(function() {
	var newMusicBtn = $("#new-music");
	newMusicBtn.click(function() {
		location.href = "composeMusic.html";
	});
});