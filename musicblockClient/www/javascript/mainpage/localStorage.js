
var numOfGotMusics = 0;
var numOfMusics = 0;

$(function(){
	getAllBlocks();
});

function getAllBlocks(){
	//저장된 음악의 총 갯수
	numOfMusics = localStorage.getItem("musicSeq");
	
	//음악이 없으면 커뮤니티로 가는 함수
	//displayButton();
	
	//음악이 있으면 정상 동작
	for(var i=0;i<localStorage.length;i++){
		console.log(localStorage.getItem("msc"+i));
		if(localStorage.getItem("msc"+i) != null/* && localStorage.getItem("msc"+i) != undefined*/){
			//alert("뮤직 : " + localStorage.getItem("msc"+i));
			displayOneMusic(JSON.parse(localStorage.getItem("msc"+i)));
			numOfGotMusics++;
		}
	}
	
	//swiper 설정(이 설정은 아이템들이 DOM으로 구성되어 화면에 떠 있어야만 정상 적용됨)
	//즉, 적용하는 시점이 중요하다는 것
	if(numOfGotMusics==numOfMusics){
		var swiper = new Swiper('.swiper-container', {
			slidesPerView : 4,
			spaceBetween : 0,
			freeMode : true
		});
		musicAnimation();
	}
}

function displayOneMusic(value){
	console.log(value);
	var item = "<div class='swiper-slide'>"
		+"<div class='ui blue button music'>"
			+"<div class='noteVisualContainer'>"
				+"<i class='fa fa-music fa-3x' id='playing' style='color:#cc4488;'></i>"
			+"</div>"
			+"<div class='music-name'>"+value.title+"</div>"
		+"</div>"
	+"</div>";
	
	$(".swiper-wrapper").append(item);
	$(".swiper-slide").last().data("notes", value.notes);
}

function displayButton(){
	var item= "<div  class='ui blue button' onclick='createBlock();'> createBlock </div>"+
			"<center>" +
			"<div class='ui blue button' onclick='moveCommunity();'> " +
			"내가 만든 음악이 없네요! <br> 여기 누르면 다른 사람들의 음악 보러 ㄱㄱㅅ~" +
			"</center></div>";
	$(".swiper-wrapper").append(item);
}

function moveCommunity(){
	console.log('moveCommunity');
	 $(location).attr('href', "community.html");
}

function createBlock(){
	console.log('createBlock');
	 $(location).attr('href', "blockMaking.html");
}