var block = {key:'', title:'', sec:0, notes:'', emotion:[], hash:'', ucode:''}

$(function(){
	// 쿼리스트링의 담겨있는 블럭의 시간과 멜로디에 정보를 먼저 담아둔다.
	var queryString=(location.href.substr(location.href.lastIndexOf('=') + 1)).split("?");
	console.log("===============================")
	console.log(queryString);
	block.sec = queryString[0];
	block.notes = queryString[1];
	console.log(block.notes);
	console.log("===============================")
	
	var checkedIcon;
	// 감정 아이콘 클릭 이벤트
	$('.icon').clickToggle(
			function(){
				// 아이콘 문양 변경
				checkedIcon = $(this).attr('src');
				checkedIcon = checkedIcon.substr(0,checkedIcon.lastIndexOf('.'));
				checkedIcon += '_clicked.png';
				$(this).attr('src', checkedIcon);
				
				// 감정 배열에 감성저장
				// icon_n에서 n추출
				block.emotion.push($(this).attr('id').substr($(this).attr('id').lastIndexOf('_')+1,$(this).attr('id').length));
			}
			, function(){
				// 아이콘 문양 변경
				checkedIcon = $(this).attr('src');
				checkedIcon = checkedIcon.substr(0,checkedIcon.lastIndexOf('_'));
				checkedIcon += '.png';
				$(this).attr('src', checkedIcon);
				
				// 감정 배열에 있는 감성삭제
				block.emotion.splice(block.emotion.indexOf($(this).attr('id')),1);
			}
	);
	
	$('#save').on('click', function(){
		if(block.emotion.length==0){
			alert('감정을 선택해주세요')
			// 감정을 선택하라는 modal 띄우기
			return;
		}else{
			// 타이틀의 입력이 없다면
			if($('#title').val().length==0){
				// 차후에 랜덤타이틀 제작하시오.
				block.title = '랜덤타이틀';
			}else{
				// 사용자가 입력한 타이틀 대입			
				block.title = $('#title').val();				
			}
			// 현재는 입력된 값 그대로 받지만 차후에 태그별로 분리되어 저장하도록 구현하세요.
			block.hash = $('#hash').val();
			
			if($('input[id="check"]').is(":checked")){
				// 현재 유저는 더미데이터로 저장되지만 차후에 로그인된 정보를 담아주세요.
				if(localUser!=null){
					sendServer();
				}else{
					alert("로그인이 안되어있네요ㅎ 로그인부터하실래예?");
				}
				// 차후 작업예정
			}

			console.log("-------------------------------------------------------------------")
			console.log(block.title);
			console.log(block.sec);
			console.log(block.notes);
			console.log(block.emotion);
			console.log(block.hash);
			console.log(block.ucode);

			// localStorage에 저장.
			addBlock(block);
		}
	});
});

// 클릭토글 함수
$.fn.clickToggle = function(func1, func2) {
    var funcs = [func1, func2];
    this.data('toggleclicked', 0);
    this.click(function() {
        var data = $(this).data();
        var tc = data.toggleclicked;
        $.proxy(funcs[tc], this)();
        data.toggleclicked = (tc + 1) % 2;
    });
    return this;
};

//현재 페이지 방문 목적판별
//true : 블럭 수정
//false : 새 블럭
var isNewBlock = function(){
	var URIparserArr = (location.href).split("?");
	//블럭 수정
	if(URIparserArr.length >= 3){
		return false;
	}
	//else : 새 블럭
	return true;
}

//초기화 함수
$(function(){
	if(isNewBlock() == true){
		//새 블럭일 때의 로직
	}else{
		//타이틀에 자동으로 텍스트 넣기
		//해시태그에 자동으로 태그 넣기
		//이모티콘 클릭
	}
});

// 블럭 추가 함수
function addBlock(block){
	// 블럭의 음이 없으면 잘못된 경로에 온 것이므로 오류 처리하도록 한다.
	if(block.notes.length==0){
		// 잘못된 접근이라고 modal로 표시하세요 
		console.log('잘못된 접근입니다.'); 
	}else{
		console.log(block);
		//{title:block.title, notes:block.notes, sec:block.sec, emotion:block.emotion, hash:block.hash};
		
		//block sequence 증가
		if(localStorage.getItem("blockSeq") == null){
			localStorage.setItem("blockSeq", "0");
		}
		var blockSeq = localStorage.getItem("blockSeq");
		block.key = "blk" + blockSeq;
		//block 저장
		localStorage.setItem("blk" + blockSeq, JSON.stringify(block));
		
		blockSeq++;
		localStorage.setItem("blockSeq", blockSeq);
		var testSeq = blockSeq-1;
	}
}

// 블럭 조회 함수
function getAllBlocks(){
	var transaction = db.transaction(["blockTable"], "readonly");
	var objectStore = transaction.objectStore("blockTable");
	var request = objectStore.openCursor();
	request.onsuccess = function(event){
		var cursor = event.currentTarget.result;
		if(cursor){
			console.log(cursor);
			console.log("title : " + cursor.title);
			console.log("notes : " + cursor.notes);
			console.log("sec : " + cursor.sec);
			console.log("emotion : " + cursor.emotion);
			console.log("hash : " + cursor.hash);
			cursor.continue();
		}
	}
}

//Save to Server&Local
function sendServer(){
	var URL = 'http://192.168.0.58:8080/block/blockSave';
	$.ajax({ //$.post(), $.get(), $.getJSON 등도 있음
		url : URL,
		type : 'POST', //Request하는 방식.
		data : JSON.stringify({ //JSON.stringify를 해줘야 제대로 된 형태의 JSON이 날아감
			emotion : block.emotion,
			notes : block.notes,
			sec : block.sec,
			tag : block.hash,
			title : block.title,
			ucode : block.ucode
		}),
		dataType : "json", //Response로 오는 방식. Request 타입을 지정하는 것으로 착각하기 쉬우므로 주의.
		contentType : 'application/json;charset=UTF-8', //POST방식일 때 사용. 인코딩 안해주면 한글 깨져서 전송됨
		success : function(data, status) {
			// 서버에서 온 블럭의 정보
			console.log(data);
			console.log("===============================")
			console.log(status);
//			console.log("JSONData : "
//					+ JSON.stringify(data));
//			/*$("body").append("<div id='save-popup'><div id='popup-btn1'>1</div><div id='popup-btn2'>2</div><div style='top:40%;position:relative;'><font size='1px' color='red'>"+JSON.stringify(data)+"</font></div></div>");*/
//			$("body")
//					.append(
//							"<div id='save-popup'><center><br>성공적으로 전송되었습니다</center><div id='popup-btn1'><center>블럭 추가</center></div><div id='popup-btn2'><center>작곡 화면<br>(3초 후 자동 이동)</center></div></div>");
//			$("#popup-btn1").click(function() {
//				$("#save-popup").remove();
//				location.href = "blockMaking.html";
//			});
//			$("#popup-btn2").click(function() {
//				$("#save-popup").remove();
//				location.href = "composeMusic.html";
//			});
//			$("#save-popup")
//					.delay(3000)
//					.fadeOut(
//							500,
//							function() {
//								$("#save-popup")
//										.remove();
//								location.href = "composeMusic.html";
//							});
		},
		error : function(request,status,error){
	        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
	});
}




// auto complete function
/* $(function() {
	var availableTags = [ "happy"

	, "happiness"

	, "hello" ];
	$("#tag").autocomplete({
		source : availableTags
	});
}); */
//auto complete 수정

