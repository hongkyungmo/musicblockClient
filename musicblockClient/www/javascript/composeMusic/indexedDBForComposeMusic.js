/*indexedDB for Compose Music*/
var repo = $("#my-blocks");
var blockNum = 0;

// functions related to IndexedDB
$(function () {
    request.onsuccess = function (event) {
//    	console.log("indexedDB onsuccess : DB loaded successfully");
        db = event.target.result;
        getAllBlocks();
    }
});



function getAllBlocks() {
    var transaction = db.transaction(["blockTable"], "readwrite");
    var objectStore = transaction.objectStore("blockTable");
    var request = objectStore.openCursor();

    request.onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
        	var block = cursor.value;
        	
            var dynamicLoadedBlock = "<li class='no_drop swiper-slide highlight' data-name='Item " + blockNum + "' data-id='" + blockNum + "'>" +block.title+ "</li>";
            blockNum++;
            repo.append(dynamicLoadedBlock);
            $("#my-blocks > li:last").data("block", block);
            cursor.continue();

            var blockFromDB = $('.highlight:last-of-type');
            var placeholder = $('.dragged');

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


function deleteBlockById(id) {
    var transaction = db.transaction(["blockTable"], "readwrite");
    var objectStore = transaction.objectStore("blockTable");
    var request = objectStore.delete(id);
    request.onsuccess = function (event) {
        console.log("id가 " + id + "인 블럭을 IndexedDB로부터 삭제했습니다.");
    }
}