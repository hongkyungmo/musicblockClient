var test1 = 0;
var max1 = 10; 

///////////////////////////////////html 위에 있던 function들/////////////////////////////////////////////////

$(function(){
	if(localUser==null){
		//alert("로그인안되어 있구나? 로그인부터해주겠니? 여기 처리를 어떻게 할까 ㅎ?");
	}
});

$(function() {
	$("#menu").bind("click", function() {
		$(".music-menu.header.total-container").hide();
	});
	
	$("#exit").bind("click", function() {
		$(".music-menu.header.total-container").show();
	});
});

$(function() {
	$("#menu").bind("click", function() {
		$(".music-menu.header.total-container").hide();
	});
	
	$("#exit").bind("click", function() {
		$(".music-menu.header.total-container").show();
	});
});

$(function() {
	$("#menu").bind("click", function() {
		$(".music-menu.header.total-container").hide();
	});
	
	$("#exit").bind("click", function() {
		$(".music-menu.header.total-container").show();
	});
});

$(function(){
	var leftTab= $("label").eq(1);
	var rightTab=$("label").eq(2);

	if($(".tabs:eq(0)")){
		$(leftTab).addClass("clickLabel");
		leftTab.find(".fa").css("font-weight","700");
		leftTab.find(".fa").css("color","#0CE");
		rightTab.removeClass("clickLabel");
		$("#musicSection").hide();
		$("#blockSection").show();
	}else{
		$(rightTab).addClass("clickLabel");
		rightTab.find(".fa").css("font-weight","700");
		rightTab.find(".fa").css("color","#0CE");
		leftTab.removeClass("clickLabel");
		$("#blockSection").hide();
		$("#musicSection").show();
	}	
	
	leftTab.bind("click",function(){
		$(this).addClass("clickLabel");
		leftTab.find(".fa").css("font-weight","700");
		leftTab.find(".fa").css("color","#0CE");
		rightTab.removeClass("clickLabel");
		$("#blockSection").hide();
		$("#musicSection").show();
	});
	
	rightTab.bind("click",function(){
		$(this).addClass("clickLabel");
		rightTab.find(".fa").css("font-weight","700");
		rightTab.find(".fa").css("color","#0CE");
		leftTab.removeClass("clickLabel");
		$("#blockSection").hide();
		$("#musicSection").show();
	});
});

////////////////////////////////////////////////////////////////////////////////////

$(function() {
	var intervalClearer = setInterval(function(){
		if(sequenceFlag == true){
			RecvFromServer();
			console.log("intervalClearer:"+intervalClearer);
			clearInterval(intervalClearer);
		}
	}, 10);
	
	function RecvFromServer() {
		//$(window).scroll(function() {
							var scrollHeight = parseInt($(window).scrollTop()+ $(window).height()); //윈도우는 딱 보이는 화면의 크기
							var documentHeight = parseInt($(document).height()); //도큐먼트는 보이지 않는 곳도 포함한 크기(도큐먼트가 윈도우보다 더 사이즈가 큼) 
						//if (scrollHeight >= documentHeight) { 
								for (test1 = 9; test1 < 15; test1++) {
										$.ajax({
												type : 'GET',
												url : 'http://localhost:8080/' + 'block/getJsonBlock/'
													+test1,
												dataType : "json",
												data : "",
												async : false,
												success : function(data) {
													console.log("JSONData : "+ JSON.stringify(data)); //stringify은 string type으로 바꿔줌
													//데이터 블럭값이있을경우에만
													if (data['block'] != null) {
														$('.people').data("title", data['block'].title);
														$('.people:eq('+test1+')').data("title", data['block'].title);
														//$('.people').eq(1).data("note", data['block'].note);
														  $('.people:eq('+test1+')').eq(0).data("title", data['block'].title);
														 $('.people:eq('+test1+')').data("title", data['block'].title);
														/*   $('.people:eq('+test1+')').eq(0).data("title", data['block'].title);
														 $('.people:eq('+test1+')').eq(1).data("notes", data['block'].note);
														 $('.people:eq('+test1+')').eq(2).data("sec", data['block'].time); */
														 
														 
		                                            	 //{title:block.title, notes:block.notes, sec:block.sec, emotion:block.emotion, hash:block.hash}
														var dynamicEl = "<div class='people'><li><a href=#><img src='images/3.png' /></a><h2>"
																+ data['block'].title
																+ "</h2> <span class='info'><nm>이산돌</nm> <em>"
																+ data['block'].regDate
																+ "</em><hr><div class='comments'>#주말이다 #신난다 #일주일남앗네 #슬프다#코멘트divcss가 뭔가 이상하다!!!</div></span><ul class='toolbar'><ui><p class='likes'><span class='glyphicon glyphicon-heart'></span><span class='nLikes'></span></p></ui><ui><p class='download'><span class='glyphicon glyphicon-download-alt'></span><span class='nDown'></span></p></ui><ui><p class='player'><span class='glyphicon glyphicon-play'></span><span class='glyphicon glyphicon-pause'></span><span class='nPlayers'></span></p></ui><ui><p class='stop'><span class='glyphicon glyphicon-stop'></span></p></ui></ul></li></div>";
																
																$(".download").click(function() {
						                                             var Pindex = $(".download").index(this);
						                                             alert("누른 다운로드 번호::"+Pindex);
						                                             //$('.people:eq('+Pindex+')').eq(0).data("title");
						                                            
						                                             console.log("ㅅㅂ:"+$('.people').eq(Pindex).data("title"));
						                                            // console.log("ㅅㅄㅂ:  "+$('.people:eq(0)').eq(0).data("title"));
						                                            // console.log("데이터가져왔니:"+$('.people:eq('  + Pindex +  ')').eq(0).data("title"));
						                                  	   });

														var leftHeight = parseInt($("#block-left").css("height"));
														var rightHeight = parseInt($("#block-right").css("height"));
														if (leftHeight <= rightHeight) {
															$("#block-left").append(dynamicEl);
														} else {
															$("#block-right").append(dynamicEl);
														}//end fo else문
													}//end of datablock문
												},//end of success문
												error : function(status) {
													alert("status>>"+status);
													console.log(status);
												}//end of error문
											})//end of ajax문
								}//end of for문 test
								
								$(".people").click(function() {
									var Aindex = $(".people").index(this);
									//alert(Pindex);
									console.log(Aindex);
									//console.log($('.people:eq('+Aindex+')').data("title"));
									//$('h2:eq(1)').append("바보");
								}); 
								//addBlock(data['block'].bCode,data['block'].title,data['block'].note,data['block'].time);
								

	}//end of recvFun문
	//좋아요 클릭시 카운트 증가
	function increaseLikes() {
		var myString = $(this).children('.nLikes').first().html();
		var myInteger = parseInt(myString);
		var myNewInteger = myInteger + 1;
		var nlikesUp = myNewInteger.toString();

		$(this).children('.nLikes').first().html(nlikesUp);
	}
	$('.likes').click(increaseLikes);		

});

function increaseDownLoad() {
	var DownLoadString = $(this).children('.nDown').first().html();
	var DownLoadInteger = parseInt(DownLoadString);
	var DownLoadNewInteger = DownLoadInteger + 1;
	var nDownloads = DownLoadNewInteger.toString();

	$(this).children('.nDown').first().html(nDownloads);
}

$('.download').click(increaseDownLoad);
//<a href="javascript:fncValidate();" id="save">Save</a>

$('.glyphicon-pause').hide();

function increasePlayers(index) {
	var playersString = $('.nPlayers:eq(' + index + ')').html();
	var playersInteger = parseInt(playersString);
	var playersNewInteger = playersInteger + 1;
	var nPlayersUp = playersNewInteger.toString();
	$('.nPlayers:eq(' + index + ')').html(nPlayersUp);
}

$('.glyphicon-play').click(function() {
	var index = $('.glyphicon-play').index(this);
	increasePlayers(index);
	$('.glyphicon-play:eq(' + index + ')').hide();
	$('.glyphicon-pause:eq(' + index + ')').show();

});

$('.glyphicon-pause').click(function() {

	var index = $('.glyphicon-pause').index(this);
	$('.glyphicon-pause:eq(' + index + ')').hide();
	$('.glyphicon-play:eq(' + index + ')').show();
});