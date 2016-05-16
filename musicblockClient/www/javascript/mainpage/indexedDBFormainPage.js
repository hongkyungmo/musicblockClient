
var numOfGotMusics = 0;
var numOfMusics = 0;

$(function(){
	request.onsuccess = function(event){
		console.log("onsuccess : DB loaded successfully");
		db = event.target.result;
		
		getAllBlocks();
	}
});

function getAllBlocks(){
	var transaction = db.transaction(["musicTable"], "readonly");
	var objectStore = transaction.objectStore("musicTable");
	var request = objectStore.openCursor();
	
	numOfMusics = localStorage.getItem("numOfMusics");
	
	request.onsuccess = function(event){
		var cursor = event.target.result;
		if(cursor==null){
			displayButton();
		}else if(cursor){
			console.log(cursor);
			console.log("key : " + cursor.key);
			console.log("sec : " + cursor.value.musicInfo);
			
			displayOneMusic(cursor.value);
			numOfGotMusics++;
			//swiper 설정(이 설정은 아이템들이 DOM으로 구성되어 화면에 떠 있어야만 정상 적용됨)
			//즉, 적용하는 시점이 중요하다는 것
			
			cursor.continue();
			
		}
		
		if(numOfGotMusics==numOfMusics){
			var swiper = new Swiper('.swiper-container', {
				
				slidesPerView : 4,
				paginationClickable : true,
				spaceBetween : 0,
				freeMode : true
			});
			musicAnimation();
		}
	}
}

function displayOneMusic(value){
	console.log(value);
	var item = "<div class='swiper-slide'>"
		+"<div class='ui blue button music'>"
			+"<div class='noteVisualContainer'>"
				+"<i class='fa fa-music fa-3x' id='playing' style='color:#cc4488;'></i>"
			+"</div>"
			+"<div class='music-name'>"+value.musicTitle+"</div>"
		+"</div>"
	+"</div>";
	
	$(".swiper-wrapper").append(item);
	$(".swiper-slide").last().data("musicInfo", value.musicInfo);
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