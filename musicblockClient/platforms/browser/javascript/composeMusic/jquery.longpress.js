/**
 * Longpress is a jQuery plugin that makes it easy to support long press
 * events on mobile devices and desktop borwsers.
 *
 * @name longpress
 * @version 0.1.2
 * @requires jQuery v1.2.3+
 * @author Vaidik Kapoor
 * @license MIT License - http://www.opensource.org/licenses/mit-license.php
 *
 * For usage and examples, check out the README at:
 * http://github.com/vaidik/jquery-longpress/
 *
 * Copyright (c) 2008-2013, Vaidik Kapoor (kapoor [*dot*] vaidik -[at]- gmail [*dot*] com)
 */

(function($) {
    $.fn.longpress = function(longCallback, shortCallback, duration) {
        if (typeof duration === "undefined") {
            duration = 500;
        }

        return this.each(function() {
            var $this = $(this);

            // to keep track of how long something was pressed
            var mouse_down_time;
            var timeout;

            // mousedown or touchstart callback
            function mousedown_callback(e) {
                mouse_down_time = new Date().getTime();
                var context = $(this);
                var offset = {top:context.context.offsetTop, left:context.context.offsetLeft};
                var gap = {top:0, left:0};
                // set a timeout to call the longpress callback when time elapses
                timeout = setTimeout(function() {
                	gap.top = Math.abs(context.context.offsetTop-offset.top);
                	gap.left = Math.abs(context.context.offsetLeft-offset.left);

                	
                	alert(( 30<=gap.top && gap.top<=60 ));
                	// 움직임의 변함이 적을 때 롱 클릭 이벤트 발생
                    if (typeof longCallback === "function"
                    
                    		// 최초 누른 위치와 움직여진 위치의 차이가 30에서 60사이 이면 움직이지 않는 걸로 간주
//                    		 && ( 30<=gap.top && gap.top<=60 )
                    		) {
                    		longCallback.call(context, e);
                    } 
                // 움직임의 변함이 클 때 롱 클릭 이벤트 비발생
                    else {
                        $.error('Callback required for long press. You provided: ' + typeof longCallback);
                    }
                }, duration);
            }

            // mouseup or touchend callback
            function mouseup_callback(e) {
                var press_time = new Date().getTime() - mouse_down_time;
                if (press_time < duration) {
                    // cancel the timeout
                    clearTimeout(timeout);

                    // call the shortCallback if provided
                    if (typeof shortCallback === "function") {
                        shortCallback.call($(this), e);
                    } else if (typeof shortCallback === "undefined") {
                        ;
                    } else {
                        $.error('Optional callback for short press should be a function.');
                    }
                }
            }

            // cancel long press event if the finger or mouse was moved
            function move_callback(e) {
                clearTimeout(timeout);
            }


            // Mobile Support
            $this.on('mousedown touchstart', mousedown_callback);
            $this.on('touchend', mouseup_callback);
            $this.on('touchmove', move_callback);
        });
    };
}(jQuery));