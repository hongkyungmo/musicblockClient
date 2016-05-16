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

if(path != "/mainpage.html"){
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
	+"<button type='button' class='menuButton btn btn-primary'>기타</button><div>"

	+"<div class='modal fade' id='loginModal' tabindex='-1' role='dialog' aria-labelledby='loginLabel' aria-hidden='true'>"
	+"	<div class='modal-dialog'>	<div class='modal-content'> <div class='modal-header'>"
	+"				<button type='button' class='close' data-dismiss='modal' aria-label='Close'>"
	+"					<span aria-hidden='true'>&times;</span>	</button>"
	+"				<h4 class='modal-title' id='loginLabel'>Login</h4></div>"
	+"			<div class='modal-body'><form><div class='form-group'><input type='text' class='form-control' id='user_login'"
	+"							placeholder='Email or Nickname'></div>"
	+"					<div class='form-group'><input type='password' class='form-control' id='user_pass'"
	+"							placeholder='Password'>	</div>"
	+"					<div><input type='checkbox' class='checkbox' id='remember_me'>"
	+"						<label for='remember_me' style='display: block;'>Remember me</label>"
	+"					</div>	</form>	</div>	<div class='modal-footer'>"
	+"				<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>"
	+"				<button type='button' id='actions' class='btn btn-primary'>Send	message</button>"
	+"			</div></div></div></div></div> ";








$("body").append(element);


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////
////////////여기서 부터 function                                   ////////////////////
////////////////////////////////



/* 공통 메뉴바 동작 확인을 위한 log 출력 function */

$(function() {

	$("#back").bind("click", function() {
		history.back();
		console.log("뒤로가기 누름ㅋㅋ");
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
		}
	});

});


/* menuPage 띄우기 위한 function */

function wrapWindowBymenuPage() {
	var menuPageHeight = $(document).height();
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

/* modal 띄우기 위한 function */

/*function showModal(){
	$('#loginModal').on('show.bs.modal', function (event) {
		console.log('showModal()');
		var button = $(event.relatedTarget) 
		var recipient = button.data('whatever') 
		var modal = $(this)
	})
}*/
$(function() {
	
	$("#actions").bind("click", function() {
		console.log("login 확인ㅋㅋ");

		var transUser = (document.getElementById("user_login")).value;
		var transPass = (document.getElementById("user_pass")).value;
		var transRemember = (document.getElementById("remember_me")).checked;

		console.log('transUser >>_'+transUser+'_');
		console.log('transPass >>_'+transPass+'_');
		console.log('transRemember >>'+transRemember);

		if((transUser!=="")&(transPass!=="")){
			serverLogin(transUser,transPass,transRemember);
		}else{
			console.log('너너너너널널!');
		}
		
		/*$('#loginModal').modal('hide');
		 *모달 닫기 		 * */

	});
});

/* 로그인 server 통신 function */

function serverLogin(transUser,transPass,transRemember) {

	console.log('serverLogin() ');

	var dummyUser = 'email1@naver.com';
	var dummyPass = '1234';
	var dummyRmember = (document.getElementById("remember_me")).checked;

	$
	.ajax({ //$.post(), $.get(), $.getJSON 등도 있음
		url : 'user/userLogin',
		type : 'POST', //Request하는 방식.
		data : JSON.stringify({ //JSON.stringify를 해줘야 제대로 된 형태의 JSON이 날아감
			user : transUser,
			pass : transPass,
			remember : transRemember
		}),
		dataType : "json", //Response로 오는 방식. Request 타입을 지정하는 것으로 착각하기 쉬우므로 주의.
		contentType : 'application/json;charset=UTF-8', //POST방식일 때 사용. 인코딩 안해주면 한글 깨져서 전송됨
		success : function(data, status) {
			console.log(status);
			console.log("JSONData : " + JSON.stringify(data));
			if (data['user'] !=null) {
				addUser(data['user']);
				console.log(data['user'].nick+'님 환영합니다!');
				if(transRemember){
					localStorage.setItem('remember','T');
				}

			} else {
				console.log('회원 정보가 없습니다. 다시 확인해 주세요.');
			}
		},
		error : function(status) {
			console.log(status);
		}
	});
};

/*      자동로그인 관련 jQuery      */

function removeUser(){
	alert("removeUser!!");
	console.log('removeUser');
	if(localUser!=null){
		localStorage.clear('user');
	}
	if(localStorage.getItem('remember')!=null){
		localStorage.clear('remember');
	}
}

function addUser(vo){
	console.log('addUser()');
	console.log('vo.nick>>'+vo.nick);
	localStorage.setItem('user',vo);
	window.location.reload(true);
}

/* logout 수정 */
$(function() {
	$("#logout").bind("click", function() {
		console.log("logout 누름ㅋㅋ");
		localStorage.clear('user');
		localStorage.clear('remember');
		window.location.reload(true);
	});
});

function closeIt(){
	if(event.clientY<0){
		event.returnValue="창을 닫겠는가?";
	}
}
window.onbeforeunload.removeUser;
