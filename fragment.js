/*
 @author QingTing
 @date 2014-12-25
 @email yys159258@126.com
 @doc 
 */

(function () {

    if (typeof exports == 'undefined') {
        exports = {};
    }

    /*
    run times - 1 times then stop
     */
    var before = function (times, func) {
        var rt;
        return function () {
            if (--times > 0) {
                rt = func.apply(this, arguments);
            }
            else {
                func = null;
                console.log('null');
            }
            return rt;
        }
    }

    exports.before = before;


    /*
    run once
     */
    var once = function (func) {
        return before(2, func);
    }

    exports.once = once;


    /*
    event delegate
     */
    function eventDelegate(delegateNode, targetNodeName, happen) {
        delegateNode.onmouseover = delegateNode.onmouseout = function (event) {
            var event = event || window.event;
            var target = event.target || event.srcElement;
            while (target != delegateNode) {
                if (target.nodeName.toLowerCase() == targetNodeName.toLowerCase()) {
                    happen(targetNodeName, event);
                    break;
                }
                target = target.parentNode;
            }
        }
    }

    exports.eventDelegate = eventDelegate;


    if (typeof window != 'undefined') {
        for (index in exports) {
            window[index] = exports[index];
        }
    }

}).call(this);