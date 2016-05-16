var parent = null;
var placeHoler = null;
var wrapper = null;
var i = null;
var j = null;
var comparedNoDrop = "simple_with_no_drop";
var comparedWrapper = "swiper-wrapper";
var sortedData = null;
var draggedBlockDataId = null;
var draggedBlock = null;
var draggedBlockSelector = null;
var duration = 500;
var downTime;
var timeout;
var dropFlag;
var layeredBlocks={width:0, sec:0};
var blockElment;

//'.layer-selector' 보류
var swiperMelodyLayer = new Swiper('.layer-melody-block', {
    scrollbar: '.swiper-scrollbar'
    , scrollbarHide: false
    , scrollbarSnapOnRelease : true
    , slidesPerView: 'auto'
    , spaceBetween: 0
    , grabCursor: false
    , freeMode: true
});

function upEvent(timeoutParam, durationTimeParam, downTimeParam){
	// duration 변수는 composeMusic.js에 정의되어 있음
   var pressTime = new Date().getTime() - downTimeParam;
   if (pressTime < durationTimeParam) {
       // cancel the timeout
       clearTimeout(timeoutParam);
   }
}

var group = $("ol.simple_with_drop").sortable({
    group: 'no-drop'
    , delay:100
    , onMousedown: function ($item, _super, event) {
    	downTime = new Date().getTime();
    	timeout = setTimeout(function() {
    		blockElment=$item;
    		var block = $($item).data('block')
    		$('#block-dialog').data('block',block);
    		$('#title').text(block.title);
    		$('#block-dialog').modal('show');
    		}, duration);
    	return true;    		
    }
    , onDragStart: function ($item, container, _super, event) {
    	clearTimeout(timeout);
    	dropFlag = true;
    	containerParam = container;
    	swiperMelodyLayer.params.allowSwipeToNext = false;
    	swiperMelodyLayer.params.allowSwipeToPrev = false;    	
    	
        // Duplicate items of the no drop area
        parent = $item.parent();
        parent = parent[0].className;
        parent = parent.split(" ");
        if (!container.options.drop)
            $item.clone().insertAfter($item);
        _super($item, container);


        if (parent[0] == comparedNoDrop) {
            draggedBlockDataId = $item[0].attributes[2].nodeValue;
            draggedBlock = null;
            for (j = 0; j < container.el[0].children.length; j++) {
                if (container.el[0].children[j].attributes[2].nodeValue == draggedBlockDataId) {
                    break;
                }
            }
            
            j++;
            draggedBlock = container.el[0].children[j].className;
            draggedBlockSelector = draggedBlock.split(" ");
            draggedBlockSelector = "." + draggedBlockSelector[draggedBlockSelector.length - 1];
            
            // #my-blocks에 새로 생성된 블럭의 데이터를 대입
            $(container.el[0].children[j]).data("block", $($item).data("block"));
            
            // 버튼을 뗄때
            $(container.el[0].children[j]).css("left", "0").css("top", "0").draggable().bind('mouseup touchend', function(){
        		// duration 변수는 composeMusic.js에 정의되어 있음
     		   var pressTime = new Date().getTime() - downTime;
     		   if (pressTime < duration) {
     		       // cancel the timeout
     		       clearTimeout(timeout);
     		   }
            });
        }
    }
    ,onDrag: function ($item, position, _super, event) {
    	$item.css(position);  
    	if($('#block-dialog')[0].className.indexOf('in') != -1){
    		dropFlag=false;
    	}
    }
    , onDrop: function ($item, container, _super, event) {

    	swiperMelodyLayer.params.allowSwipeToNext = true;
    	swiperMelodyLayer.params.allowSwipeToPrev = true;    	

        $item.removeClass(container.group.options.draggedClass).removeAttr("style");
        
        $("body").removeClass(container.group.options.bodyClass);
        if(!dropFlag && parent[0] == comparedNoDrop){
        	$($item).remove();
        }
        
        // Index 파악
	    wrapper = swiperMelodyLayer.wrapper[0].children;
	    for (i = 0; i < wrapper.length; i++) {
	    	var classNames = wrapper[i].className.split(" ");
	        placeHoler = wrapper[i - 1];
	        if (classNames[0] == "no_drop") {
	        	break;
	        }
	    }
	    $item.removeClass("no_drop");
	    
	    // 드래그가 시작된 블럭의 출발점이 repository인지 layer인지 구분한다. 
	    // repository일 경우
	    if (parent[0] == comparedNoDrop) {	    	
	    	// 블럭의 시간만큼 width를 늘린다.
	    	var width = $item.data("block").sec*3.75;
	    	$item.css("width",width+"%");
	    	
	    	// layer에 있는 블럭의 길이와 시간을 계산한다.
	    	layeredBlocks.width += width+1.5;
	        layeredBlocks.sec += parseInt( $item.data("block").sec);
	        
	    	// 해당 Index에 추가
	        if (i <= 0) {
	        	$(placeHoler).before($item[0]);
	        } else {
	        	$(placeHoler.className).after($item[0]);
	        }
	        swiperMelodyLayer.params.loop && swiperMelodyLayer.createLoop()
	        , swiperMelodyLayer.params.observer && swiperMelodyLayer.support.observer || swiperMelodyLayer.update(!0)
	    }
	        
	    // 레이어에 있는 블록의 정보를 순서대로 표현하기 위한 부분       
	    // JSON과 Touch-Punch가 충돌 되므로 직접 구현
	    var data = group.sortable("serialize").get();
	    var JSONBlock;
	    sortedData = ""; 
	    for (var k = 0; k < data[0].length; k++) {
	    	var protoBlock = data[0][k].block;
	    	sortedData += JSONtoString(protoBlock);
	        k != data[0].length-1 ? sortedData += "&" : sortedData += "";	
	    }
	    console.log(sortedData);
    }
});

$("ol.simple_with_no_drop").sortable({
    group: 'no-drop'
    , drop: false
});

// JSON객체를 문자열로 변환하는 함수 
function JSONtoString(object) {
    var results = [];
    for (var property in object) {
        var value = object[property];
        if (value &&(property.toString()=='sec' || property.toString()=='notes'))
            results.push('"' + property.toString() + '":"' + value + '"');
        }
        return '{' + results.join(', ') + '}';
}


$(function () {		
	
	$(".col-xs-10:eq(0)").append(addedMenuBar);
	
    // Move to blockMaking.html for edit
    $("#dialog-edit").bind("click", function () {
        // need to keep sorted blocks layer
        $(location).attr('href', "blockMaking.html");
    });

    // Move to blockMaking.html for edit
    $("#dialog-delete").bind("click", function () {
        // need to keep sorted blocks layer
    	var data = $('#block-dialog').data('block');
    	$(blockElment).remove();
    	deleteBlockById(data.id);
        $('#block-dialog').modal('hide');
    });

    // Move to blockMaking.html
    $("#btn-create").bind("click", function () {
        // need to keep sorted blocks layer
        $(location).attr('href', "blockMaking.html");
    });

    // Move to template.html
    $("#btn-community").bind("click", function () {
        // need to keep sorted blocks layer
        $(location).attr('href', "community.html");
    });

    // Move to mainpage.html
    $("#btn-load").bind("click", function () {
        // need to keep sorted blocks layer
        $(location).attr('href', "mainpage.html");
    });

    // Move to emotion.html
    $("#btn-save").bind("click", function () {
        // passing information about music to that page.
    	if(sortedData==null){
    		// modal을 띄워서 경고창을 만드세요
    	}else{
    		$(location).attr('href', "emotionMusic.html?"+sortedData);    		
    	}
        //        $("#work-layer").stop()
    });

    // 처음으로 돌아가기 아이콘
    $("#btn-prev").bind("mouseup", function () {
    	// 프로그레스바의 크기를 없애고 아이콘도 변경
    	$('#progress-bar').stop().css('width','0%');
    	$('#progress-bar').stop();
    	$('#btn-play').switchClass('fa-pause','fa-play');
    });

    
    $('#btn-play').bind('mouseup', function(){
    	console.log("zzz");
    	var className = $('#btn-play')[0].className;
    	// 현재 아이콘이 플레이 버튼이면
    	if(className.indexOf('fa-play') != -1){
    		// 레이어에 채워진 블럭이 없을 때는 동작그만 
    		if(layeredBlocks.width<=0){
    			// modal로 블럭 채우라고 띄울까?   			
				return;
			}else{
				//	프로그레스가 채워진 블록 모두 진행되면 처음으로 되돌린다.			
				if($('#progress-bar')[0].style.width==layeredBlocks.width+'%'){
					$('#progress-bar')[0].style.width=0+'%';
				}
				
				// 아이콘을 일시정지로 변경하고 프로그레스바의 애니메이션을 진행한다.			
				$('#btn-play').switchClass('fa-play','fa-pause');
				
				$('#progress-bar').stop().animate({
		    		'width':layeredBlocks.width+'%'
		    	},{
		    		step : function(now, fx){
		    			var helper = 90;
		    			if(now>90 && now < layeredBlocks.width -10){
		    				console.log();
		    				$("#work-layer").css({
		    	                "transform": "translate3d(" + (-1*now+90) + "%,  0px, 0px)"
		    	            });
		    			}
		    		}
		    		, easing : 'linear'
		    		, duration: layeredBlocks.sec*1000
		    		, complete:function(){
		    			$('#btn-play').switchClass('fa-pause','fa-play');
		    		}
		    	});
				
			}
    	}
    	// 현재 아이콘이 일시정지면
    	else if(className.indexOf('fa-pause') != -1){
    		// 아이콘을 플레이로 변경하고 현재 진행중인 애니메이션 중지   		
    		$('#btn-play').switchClass('fa-pause','fa-play');
			$('#progress-bar').stop();
    	}
    	
    });
   
    $(".progress-bar-wrapper").bind("click", function (e) {
        console.log("래퍼 클릭");
        $(".progress-bar-pointer").css("left", e.pageX - 20);
    });

});



var addedMenuBar = 
    "<div class='row COMPOSE-MENUBAR-ROW'>" + 
        "<div class='col-xs-4 COMMON-MENUBAR-GRID-4' style='padding-left:0px;'>" + 
            "<div class='row COMMON-MENUBAR-ROW'>" + 
                "<div class='col-xs-4 COMMON-MENUBAR-GRID-4'>" + 
                    "<button class='btn COMPOSE-MENUBAR-BTN fa fa-music fa-2x' id='btn-create' aria-hidden='true'>" + 
                    "<i class='fa fa-plus-circle' aria-hidden='true'></i>" + 
                    "</button>" + 
                "</div>" + 
                "<div class='col-xs-4 COMMON-MENUBAR-GRID-4'>" + 
                    "<button class='btn COMPOSE-MENUBAR-BTN fa fa-group fa-2x' id='btn-community'>" +
                    "</button>" + 
                "</div>" + 
            "</div>" + 
        "</div>" + 
        "<div class='col-xs-4 COMMON-MENUBAR-GRID-4'>" + 
            "<div class='row COMMON-MENUBAR-ROW'>" + 
                "<div class='col-xs-4 COMMON-MENUBAR-GRID-4'>" + 
                    "<button class='btn COMPOSE-MENUBAR-BTN fa fa-step-backward fa-2x' data-action='prev' id='btn-prev'>" + 
                    "</button>" + 
                "</div>" + 
                "<div class='col-xs-4 COMMON-MENUBAR-GRID-4'>" + 
                    "<button class='btn COMPOSE-MENUBAR-BTN fa fa-play fa-2x' data-action='play' id='btn-play'>" + 
                    "</button>" + 
                "</div>" + 
            "</div>" + 
        "</div>" + 
        "<div class='col-xs-4 COMMON-MENUBAR-GRID-4' style='padding-right:0px;'>" +
            "<div class='row COMMON-MENUBAR-ROW'>" +  
                "<div class='col-xs-4 COMMON-MENUBAR-GRID-4' style='float:right'>" + 
                    "<button class='btn COMPOSE-MENUBAR-BTN fa fa-save fa-2x' id='btn-save'>" + 
                    "<span></span>" + 
                    "</button>" + 
                "</div>" + 
                "<div class='col-xs-4 COMMON-MENUBAR-GRID-4' style='float:right'>" + 
                    "<button class='btn COMPOSE-MENUBAR-BTN fa fa-folder-open-o fa-2x' id='btn-load'>" + 
                    "<span></span>" + 
                    "</button>" + 
                "</div>" + 
            "</div>" +  
        "</div>" + 
    "</div>";