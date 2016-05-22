/**
 * 공통모듈 : 페이지 로딩시 자동으로 불러내는 메뉴바 추가
 */

var element = 
	"<div><div class='modal fade' id='loginModal' tabindex='-1' role='dialog' aria-labelledby='loginLabel' aria-hidden='true'>"
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


/* modal 띄우기 위한 function */
$(function(){
	$("#login").bind("click",function(){
		console.log("login");
	});
})

function showModal(){
	$('#loginModal').on('show.bs.modal', function (event) {
		console.log('showModal()');
		var button = $(event.relatedTarget) 
		var recipient = button.data('whatever') 
		var modal = $(this)
	})
}

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
		url : serverPath+'user/userLogin',
		type : 'POST', //Request하는 방식.
		data : JSON.stringify({ //JSON.stringify를 해줘야 제대로 된 형태의 JSON이 날아감
			user : transUser,
			pass : transPass,
			remember : transRemember
		}),
		dataType : "json", //Response로 오는 방식. Request 타입을 지정하는 것으로 착각하기 쉬우므로 주의.
		contentType : 'application/json;charset=UTF-8', //POST방식일 때 사용. 인코딩 안해주면 한글 깨져서 전송됨
		success : function(data, status) {
			console.log('sucess'+status);
			try{
			console.log("JSONData1 : " + JSON.stringify(data));
			}catch(e){
				console.log(e);
			}
			
			if (data['user'] !=null) {
				console.log(data['user'].nick+'님 환영합니다!');
				$('#loginModal').modal('hide');
				$("#login").remove();
				$("#btnContainer").append(logout);
				
				if(transRemember){
					localStorage.setItem('remember','T');
				}

				addUser(data['user']);
			} else {
				alert('회원 정보가 없습니다. 다시 확인해 주세요.');
			}
		},
		error : function(x,e) {
			
			if(x.status==0){
				alert("인터넷이 꺼져있음");
			}else if(x.status==404){
				alert("404 에러");
			}else if(x.status==500){
				alert("서버 에러");
			}else if(e=='parsererror'){
				alert("에러 파싱 불가");
			}else if(e=='timeout'){
				alert("시간초과 에러");
			}else{
				alert("알 수 없는 에러");
			}
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
	/*window.location.reload(true);*/
}

/* logout 수정 */
$(function() {
	$("#logout").bind("click", function() {
		console.log("logout 누름ㅋㅋ");
		localStorage.clear('user');
		localStorage.clear('remember');
		try{
		$("#logout").remove();
		$("#btnContainer").insertAdjacentHTML("afterbegin",login);
		}catch(e){
			alert(e);
		}
		window.location.reload(true);
	});
});
