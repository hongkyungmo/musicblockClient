/*indexedDB for community Music
 * 
 * 
 * 1.커뮤니티 페이지 접속시 서버로부터 받은 데이타를 indexed db에 다 insert를 하자.
 * 2.
 * 
 * 
 * */

//indexedDB와 ajax의 호출 순서를 알려주는 플래그
var sequenceFlag = false;

var blockNum = 0;

var repo = $(".people");
/*<a href="javascript:fncValidate();" id="save">Save</a>*/
//var db = null;
//$(function(){
	// indexedDB의 연결을 확인한다.
	request.onsuccess = function(event){
		alert("test1");
		console.log("onsuccess : DB loaded successfully");
		db = event.target.result;
		sequenceFlag = true;
	}
//});

// functions related to IndexedDB
/*function fnc() {
	alert("fnc함수불러옴");
    request.onsuccess = function (event) {
    	alert();
    	console.log("indexedDB onsuccess : DB loaded successfully");
        db = event.target.result;	//DB로드 성공하면 키를 반환
       // getAllBlocks();
        addBlock();
    }
};*/

function addBlock(bcode,title,note,time){
	alert("addblock()");
	// indexedDB의 연결을 확인한다.
	console.log("blockData: "+bcode+","+title+","+note+","+time);
	var transaction = db.transaction(["blockTable"], "readwrite");
	var objectStore = transaction.objectStore("blockTable");
	request = objectStore.add({bcode:bcode,btitle:title,note:note,time:time});
		//console.log("blockData: "+data['block'].bcode+","+data['block'].btitle+","+data['block'].notes+","+data['block'].sec);
		/*var transaction = db.transaction(["blockTable"], "readwrite");
		var objectStore = transaction.objectStore("blockTable");
		console.log(objectStore);
		var tranCode = bcode;
		var tranTitle = btitle;
		var transSec = sec;
		var transNote = notes;
		request = objectStore.add({bcode:tranCode,btitle:tranTitle,sec:transSec,notes:transNote});
		getAllBlocks();*/
}


function getAllBlocks(){
	var transaction = db.transaction(["blockTable"], "readonly");
	var objectStore = transaction.objectStore("blockTable");
	var request = objectStore.openCursor();	//인덱스를 통해 데이터를 검색하기위해 openCursor()사용.  데이터를 순서대로 검색하고, 해당하는 데이터에 대해 참조, 갱신, 제거 등의 처리를 수행
	request.onsuccess = function(event){	//데이터 검색이 성공하면 success이벤트가 트리거
		var cursor = event.target.result;
		if(cursor){
			console.log(cursor);
			console.log("key : " + cursor.key);
			console.log("btitle : " + cursor.value.btitle);
			console.log("bcode" + cursor.value.bcode);
			console.log("sec : " + cursor.value.sec);
			console.log("notes : " + cursor.value.notes);
			cursor.continue();			//다음 데이터를 검색하고, 데이터 검색이 성공할 때 또 success이벤트가 트리거.
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