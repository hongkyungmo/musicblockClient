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
		alert($("#loginModal").css("width"));
		alert($("#loginModal").css("height"));
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
		
		/*$('#loginModal').modal('hide');
		 *모달 닫기 		 * */

	});
});

