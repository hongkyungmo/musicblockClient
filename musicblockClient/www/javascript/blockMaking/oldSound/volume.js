//블럭 볼륨 조절(컨테이너)
var volumeController = "<div id='vol-container'></div>";
$(".COMMON-MENUBAR-ROW").append(volumeController);
//블럭 볼륨 조절(삼각바)
var triangleBar = "<div id='triangleBar'></div>";
$("#vol-container").append(triangleBar);

//블럭 볼륨 조절(드래그바)
var dragBar = "<div id='vol-draggable'></div>";
$("#vol-container").append(dragBar);
$("#vol-draggable").draggable({
	containment: "parent"
		, axis: "x"
});

//블럭 볼륨 조절 - 클릭 이벤트
$(function () {
	$("#vol-container").bind("click", function (event) {
		var clickedX = event.pageX; //클릭한 곳의 x좌표
		var containerX = $("#vol-container").offset().left; //현재 클릭한 엘리먼트(볼륨조절 컨테이너)가 시작하는 곳의 x좌표
		console.log("clickedX : " + clickedX);
		console.log("containerX : " + containerX);

		var volumeOffSet = clickedX - containerX;
		if (volumeOffSet < 10 || volumeOffSet > 170) {
			return;
		}

		volumeSaver = volumeOffSet / 160 * 6;
		//alert(volumeSaver);

		//volume dragbar 이동
		$("#vol-draggable").css("left", (volumeOffSet - 10) + "px");

		console.log("volume : " + volumeSaver);
	});
});
$("#vol-draggable").css("left", volumeSaver * 30 + "px");

$(function () {
	$("#vol-draggable").bind("dragstop", function (event) {
		var clickedX = event.pageX; //클릭한 곳의 x좌표
		var containerX = $("#vol-container").offset().left; //현재 클릭한 엘리먼트(볼륨조절 컨테이너)가 시작하는 곳의 x좌표

		var volumeOffSet = clickedX - containerX;
		console.log(volumeOffSet);
		if (volumeOffSet <= 10) {
			volumeSaver = 0;
		}else if(volumeOffSet >= 170){
			volumeSaver = 170 / 160 * 6;
		}else{
			volumeSaver = volumeOffSet / 160 * 6;
		}
	});
});