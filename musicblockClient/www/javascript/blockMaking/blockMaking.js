/**
 * 블록 생성
 */

//block이 플레이되는 시간
var blockAnimateTime = 2000;
//피아노건반을 누른 음이 저장되는 배열
var noteArr = new Array();

//PC인지 모바일인지 구분해서 이벤트 따로 주기
var keyDown;
var keyUp;
var filter = "win16|win32|win64|mac";
if( navigator.platform  ){
    if( filter.indexOf(navigator.platform.toLowerCase())<0 ){
    	//mobile
    	keyDown = "touchstart";
    	keyUp = "touchend";
    }else{
    	//desktop
    	keyDown = "mousedown";
    	keyUp = "mouseup";
    }
}

$(function () {
    $("body").append("<div id='menu-container'><span class = 'glyphicon glyphicon-chevron-left fa-2x' aria - hidden = 'true' id='back'></span><span class='glyphicon glyphicon-menu-hamburger' aria-hidden='true' id='menu'></span></div>");
});

//variables
var clickSequence = 0; //입력한 음의 갯수
var octave = 2; //1,2,3,4(low to high)
//음과 박자를 저장하는 2차원 배열 구조체(?)
var arr = new Array(64);
for (var i = 0; i < 64; i++) {
    arr[i] = new Array(2); //{음정, 박자}
}
//menu
$(function () {
    $("#menu").bind(keyDown, function () {
        if ($(".menu-on").length > 0) {
            $(".menu-on").addClass("menu-off");
            $(".menu-on").removeClass("menu-on");
        } else {
            $(".menu-off").addClass("menu-on");
            $(".menu-off").removeClass("menu-off");
            /*$("body").append('<div style="height:92%;width:80%;background-color:gray;position:absolute;left:0%;top:8%;z-index:1000;opacity:0.7">zzzz</div>');*/
        }
    });
});
//bind functions(control bar)
$(function () {
    //play
    $("#play").bind(keyDown, function () {
        if ($("#display-bar").length > 0) {
            $("#display-bar").stop();
            $("#play").css("background-color", '#e1f6fa');
            $("#display-bar").remove();
            $(".glyphicon-stop").addClass("glyphicon glyphicon-play");
            $(".glyphicon-stop").removeClass("glyphicon-stop");
        } else if ($("#display-bar").length < 1) {
            $("#play").css("background-color", '#ee4c8d');
            $(".glyphicon-play").addClass("glyphicon glyphicon-stop");
            $(".glyphicon-play").removeClass("glyphicon-play");
            $("#syllable-container").append("<div id='display-bar' style='background-color:red;width:1%;height:100%;position:absolute;float:left;left:0%;z-index:1;top:0%;opacity:0.3;overflow-x:hidden;'></div>");
            $("#display-bar").animate({
                width: "100%"
            }, blockAnimateTime, 'linear', function () {
                while ($("#display-bar").length > 0) {
                    $("#display-bar").remove();
                    $(".glyphicon-stop").addClass("glyphicon glyphicon-play");
                    $(".glyphicon-stop").removeClass("glyphicon-stop");
                }
                $("#play").css("background-color", '#e1f6fa');
                //animation 완료 후 음 정지
                //o.stop();
            });
        }
    });
    //cancel
    $("#cancel").bind(keyDown, function () {
        if ($("#display-bar").length == 0) {
            $("#cancel").css("background-color", '#33ffbd');
            if (clickSequence > 0) {
                $(".syllable").last().remove();
                $(".divider").last().remove();
                for (var j = 0; j < clickSequence; j++) {
                    var k = (102 - (clickSequence)) / (clickSequence - 1);
                    $(".syllable:eq(" + j + ")").width(k + '%');
                }
                displayObj = '<div class="divider"></div><div class="syllable" style="width:' + k + '%"></div>';
                clickSequence--;
				noteArr.pop();
            }
        }
    });
    $("#cancel").bind(keyUp, function () {
        $("#cancel").css("background-color", '#e1f6fa');
    });
    //clear
    $("#clear").bind(keyDown, function () {
        if ($("#display-bar").length == 0) {
            $("#clear").css("background-color", '#33ffbd');
            $("#syllable-container").empty();
            clickSequence = 0;
			delete noteArr;
			noteArr = new Array();
        }
    });
    $("#clear").bind(keyUp, function () {
        $("#clear").css("background-color", '#e1f6fa');
    });
    
});
//공백건반 클릭
$(function () {
    var spaceKey = $("#space-key");
    spaceKey.bind(keyDown, function () {
        if ($("#display-bar").length == 0) {
            $(this).css("background-color", '#e1f6fa');
            //디스플레이 창에 엘리먼트 추가
            var displayObj;
            if (clickSequence == 0) {
                displayObj = '<div class="syllable" style="width:100%"></div>';
            } else {
                for (var j = 0; j < clickSequence; j++) {
                    var k = (100 - (clickSequence)) / (clickSequence + 1);
                    $(".syllable:eq(" + j + ")").width(k + '%');
                }
                displayObj = '<div class="divider"></div><div class="syllable" style="width:' + k + '%"></div>';
            }
            //음정 조절
            $("#syllable-container").append(displayObj);
            //친 음 갯수 추가
            clickSequence++;
        }
    });
    spaceKey.bind(keyUp, function () {
        $(this).css("background-color", '#c8DDFF');//#e1f6fa
    });
});

//건반 클릭
$(function () {
    $(".key").bind(keyDown, function () {
		if ($("#display-bar").length == 0) {
			var barLevel = 94 - (((octave - 1) * 12 + $(".key").index(this)) * 2);

			//음정 표시
			if (clickSequence == 0) {
				displayObj = '<div class="syllable" style="width:100%"><div class="syllable-bar" style="top:' + barLevel + '%;"></div></div>';
			} else {
				for (var j = 0; j < clickSequence; j++) {
					//박자 결정
					var beat = (100 - (clickSequence)) / (clickSequence + 1);
					$(".syllable:eq(" + j + ")").width(beat + '%');
				}
				displayObj = '<div class="divider"></div><div class="syllable" style="width:' + beat + '%"><div class="syllable-bar" style="top:' + barLevel + '%;"></div></div>';
			}
			//음 디스플레이에 표시
			$("#syllable-container").append(displayObj);
			//음정 조절
			$(".syllable-bar").last().draggable({
				containment: "parent"
				, axis: "y"
			});
			clickSequence++;
		}
    });
});

$(function () {
    //옥타브 변환
    for (var i = 0; i < 4; i++) {
        var octaveDisplay = $(".octave-display:eq(" + i + ")");
        octaveDisplay.bind(keyDown, function () {
            $("#octave-display-on").empty();
            $("#octave-display-on").addClass("octave-display");
            $("#octave-display-on").attr("id", '');
            $(this).removeClass("octave-display");
            $(this).attr("id", "octave-display-on");
            $(this).append('<span class="glyphicon glyphicon-music"></span>');
            //옥타브 등록
            octave = 4 - $(this).index();
        });
        octaveDisplay.bind(keyUp, function () {
            
        });
    }
});
$(function () {
    $("#draggable").draggable();
});

//공통메뉴 부분에 저장 버튼 추가
$(function () {
	var btnSave = "<div class='btn COMPOSE-MENUBAR-BTN fa fa-save fa-2x' id='next'></div>";
	$(".col-xs-10:eq(0)").append(btnSave);
});

//next
$(function () {
	$("#next").bind("click", function () {
		var noteStr = "";
		noteStr += $("#block-time-display").text().replace(/[^0-9]/g, '') + "?";
		//음 배열 -> 음 String으로 저장(쉼표 추가)
		for (var i = 0; i < noteArr.length; i++) {
			noteStr = noteStr + noteArr[i] + ",";
		}
		console.log(noteStr.slice(0, -1));
		location.href = "emotionBlock.html?var=" + noteStr.slice(0, -1);
	});
	$("#next").bind(keyUp, function () {
	});
});