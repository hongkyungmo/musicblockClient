/*indexedDB for Compose Music*/
var repo = $("#my-blocks");
var blockNum = 0;

// functions related to IndexedDB
$(function () {
    getAllBlocks();
});

function getAllBlocks() {
    for(var i = 0 ; i < localStorage.length ; i++){
        var key = localStorage.key(i);

        // blk란 key를 가진 데이터를 확인한다.
        if(key.indexOf('blk') != -1){
            // 제이슨 형태로 변환
            var block = JSON.parse(localStorage[key]);
            var random = Math.floor(Math.random() * 4);
            // blue - rosy - green - red - 
            var colorTop = ['#0095cc','#cf5d6a','#6b9d28',  '#c9151b'];
            var colorBottom = ['#00678e','#a53845','#436b0c',  '#a11115'];

            // HTML 요소
            var dynamicLoadedBlock = "<li class='no_drop swiper-slide highlight' "+ 
            "data-name='Item " + blockNum + "' data-id='" + blockNum + "'>" +block.title+ "</li>";
            
            // 요소의 고유번호
            blockNum++;

            // 요소 추가
            repo.append(dynamicLoadedBlock);

            // 해당 요소에 JSON데이터 부여
            $("#my-blocks > li:last").data("block", block);
            $("#my-blocks > li:last").css("background", '-webkit-gradient(linear, left top, left bottom, from('+colorTop[random]+'), to('+colorBottom[random]+'))');

            // 드래그 기능 추가
            var blockFromDB = $('.highlight:last-of-type');
           var placeholder = $('.dragged');

           // 롱클릭과 숏클릭 이벤트
           blockFromDB.draggable().on('mouseup touchend', function(){
           // duration 변수는 composeMusic.js에 정의되어 있음
              var press_time = new Date().getTime() - downTime;
            if (press_time < duration) {
                // cancel the timeout
                clearTimeout(timeout);
            }
     });
        }
    }    
}


function deleteBlockById(blockKey) {
	delete localStorage[blockKey];
}