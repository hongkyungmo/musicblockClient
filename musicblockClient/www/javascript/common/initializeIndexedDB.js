/* indexedDB for emotion */
//variables for IndexedDB
// In the following line, you should include the prefixes of implementations you want to test.
	console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
console.log(window.indexedDB)
console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;;
// DON'T use "var indexedDB = ..." if you're not in a function.
// Moreover, you may need references to some window.IDB* objects:
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
// (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)

if (!window.indexedDB) {
	window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.")
}



var request = window.indexedDB.open("musicBlockDB", 3);
var db;

//functions related to IndexedDB
$(function(){

	console.log("들어간다")
	request.onupgradeneeded = function(event){
		db = event.currentTarget.result;
		//오브젝트 스토어가 테이블 개념, keyPath가 시퀀스 개념
		/*var blockObjectStore = */db.createObjectStore("blockTable", {keyPath:"id", autoIncrement: true});
		/*var musicObjectStore = */db.createObjectStore("musicTable", {keyPath:"id", autoIncrement: true});
	}



	request.onerror = function(event){
		alert("onerror : " + event.target.error);
	}

	request.onready = function(event){
		console.log("onready");
	}
});