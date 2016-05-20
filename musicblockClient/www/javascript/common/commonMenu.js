/**
 * 공통모듈 : 페이지 로딩시 자동으로 불러내는 메뉴바 추가
 */


//해당 URI를 가져와서 공통 Module에 넣을 Element를 동적으로 추가
var path = $(location).attr('pathname');
var localUser=localStorage.getItem('user');

var login=	"<button type='button' id='login' class='menuButton btn btn-primary' data-toggle='modal' " +
"data-target='#loginModal'>Login</button>";
var logout= "<button type='button' id='logout' class='menuButton btn btn-primary' >Logout</button>";

var element = 
	"<div class='row COMMON-MENUBAR-ROW' id='COMMON-MENUBAR'><div class='col-xs-1 COMMON-MENUBAR-GRID-1'>";

if(path != "/index.html"){
	element += "<button type='btn' class='btn COMMON-MENUBAR-BTN fa fa-chevron-left fa-2x' id='back'></button>";
}

element += "</div><div class='col-xs-10 COMMON-MENUBAR-GRID-10'>";

/*var addCommunity=
		"<div class='row COMMON-MENUBAR-ROW' id='COMMON-MENUBAR'>" +
    		"<div class='col-xs-1 COMMON-MENUBAR-GRID-1' style='float:right'>" + 
    		 "<button class='btn COMPOSE-MENUBAR-BTN fa fa-search fa-2x' id='btn-search'>" + 
                "<button class='btn COMPOSE-MENUBAR-BTN fa fa-search fa-2x' id='btn-search'>" + 
                "<span></span>" + 
                "</button>" + 
            "</div>" + 
           "</div>";
 */
//composeMusic.html에만 적용되는 MenuBar 버튼 추가

if(path.indexOf("/community.html") != -1) {
	//element += addCommunity;
}

element += "</div><div class='col-xs-1 COMMON-MENUBAR-GRID-1'><button type='button' class='btn COMMON-MENUBAR-BTN fa fa-navicon fa-2x' id='menu'></button></div></div>"


	+"<div id='menuPage'><div class='row COMMON-MENUBAR-ROW' id='MENU-MENUBAR'>"
	+"	<div class='col-xs-1 COMMON-MENUBAR-GRID-1'></div>"
	+"	<div class='col-xs-10 COMMON-MENUBAR-GRID-10'></div>"
	+"	<div class='col-xs-1 COMMON-MENUBAR-GRID-1'>"
	+"	<button type='button' class='btn COMMON-MENUBAR-BTN fa fa-remove fa-2x' id='exit'></button>	</div></div>"
	+"<div id='btnContainer'>";

if(localUser==null){
	element+=login;
}else{
	element+=logout;
}

element+= 

	"<br><button type='button' class='menuButton btn btn-primary'>BlockList</button>"
	+"<button type='button' class='menuButton btn btn-primary'>MusicList</button>"
	+"<button type='button' class='menuButton btn btn-primary'>Community</button>"
	+"<br><button type='button' class='menuButton btn btn-primary'>사용설명서</button>"
	+"<button type='button' class='menuButton btn btn-primary'>설정</button>"
	+"<button type='button' class='menuButton btn btn-primary'>기타</button>"

	;








$("body").append(element);


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////
////////////여기서 부터 function                                   ////////////////////
////////////////////////////////



/* 공통 메뉴바 동작 확인을 위한 log 출력 function */

function onLoad() {
	alert("1");
    document.addEventListener("deviceready", onDeviceReady, false);

}

function onDeviceReady() {
	alert("2");
    document.addEventListener("backbutton", onBackKeyDown, false);
}

function onBackKeyDown() {
	alert("3");
    navigator.notification.confirm('종료하시겠습니까?', onBackKeyDownMsg, '종료', '취소, 종료');
}

function onBackKeyDownMsg() {
	alert("4");
    if(button == 2) {
        navigator.app.exitApp();
    }
}

$(function() {
	$("#back").bind("click", function() {
		history.back();
		console.log("뒤로가기 누름ㅋㅋ");
		/*navigator.app.exitApp();*/
	});
});

$(function() {

	$(".menuButton").bind("click", function() {
		var buttonIndex=$(".menuButton").index(this);
		console.log(buttonIndex);
		switch(buttonIndex){
		case 1:
			$(location).attr('href', "listBlock.html");
			break;
		case 2:
			$(location).attr('href', "listMusic.html");
			break;
		case 3:
			$(location).attr('href', "community.html");
			break;
		case 6:
			$(location).attr('href', "index.html");
			break;
		}
	});

});


/* menuPage 띄우기 위한 function */

function wrapWindowBymenuPage() {
	var menuPageHeight = $(window).height();
	var menuPageWidth = $(window).width();

	$('#menuPage').css({
		'width' : menuPageWidth,
		'height' : menuPageHeight
	});
	$('#menuPage').fadeTo("fast", 1);
}

$(function() {
	$("#menu").bind("click", function() {
		console.log("메뉴버튼 누름ㅋㅋ");
		console.log("user>>"+localUser);
		wrapWindowBymenuPage();
	});

	$("#exit").bind("click", function() {
		console.log("뒤로버튼 누름ㅋㅋ")
		$('#menuPage').hide();
	});

});
