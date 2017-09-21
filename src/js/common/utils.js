(function () {
    utils = {
        //绑定事件
        on: function (elem, ev, fn) {
            if (elem.addEventListener) {
                elem.addEventListener(ev, fn, false);
            } else if (elem.attachEvent) {
                elem.attachEvent('on' + ev, fn);
            } else {
                elem['on' + ev] = fn;
            }
        },
        //事件解除绑定
        off: function (elem, ev, fn) {
            if (elem.removeEventListener) {
                elem.removeEventListener(ev, fn, false);
            } else if (elem.detachEvent) {
                elem.detachEvent('on' + ev, fn);
            } else {
                elem['on' + ev] = null;
            }
        },
        //阻止事件冒泡
        stop: function (e) {
            var ev = e || window.event;
            if (ev.stopPropagation) ev.stopPropagation();
            else ev.cancelemBubble = true;
        },
        //阻止浏览器的默认行为
        prevent: function (e) {
            if (e && e.preventDefault) e.preventDefault();
            else window.event.returnValue = false;
            return false;
        },
        //获得触发事件的元素
        target: function (e) {
            return e.target || window.event.srcelemement;
        },
        //元素是否存在class名称
        hasClass: function (elem, name) {
            name = name || '';
            if (name.replace(/\s/g, '').length == 0) return false;
            return new RegExp(' ' + name + ' ').test(' ' + elem.className + ' ');
        },
        //元素添加class名称
        addClass: function (elem, name) {
            if (!this.hasClass(elem, name)) {
                var _cls = elem.className;
                elem.className = _cls == '' ? name : _cls + ' ' + name;
            }
        },
        //元素移除class名称
        removeClass: function (elem, name) {
            if (this.hasClass(elem, name)) {
                var _cls = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
                while (_cls.indexOf(' ' + name + ' ') > -1) {
                    _cls = _cls.replace(' ' + name + ' ', ' ');
                }
                elem.className = _cls.replace(/^\s+|\s+$/g, '');
            }
        },
        //获取参数值
        param: function (name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = location.search.substr(1).match(reg);
            var context = '';
            if (r != null)
                context = r[2];
            reg = null;
            r = null;
            return context == null || context == '' || context == 'undefined' ? '' : decodeURI(context);
        },
        //写cookie
        setCookie: function (name, value) {
            var _days = 30;
            var _exp = new Date();
            _exp.setTime(_exp.getTime() + _days * 24 * 60 * 60 * 1000);
            document.cookie = name + '=' + escape(value) + ';expires=' + _exp.toGMTString();
        },
        //读取cookie
        getCookie: function (name) {
            var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
            if (arr = document.cookie.match(reg)) {
                return (arr[2]);
            } else {
                return null;
            }
        },
        ua: navigator.userAgent.toLowerCase(),
        pc: function () {
            return !(this.android() || this.iphone() || this.ipad() || /midp/.test(this.ua)
                || /symbianos/.test(this.ua) || /windows ce/.test(this.ua)
                || /windows mobile/.test(this.ua) || /windows phone/.test(this.ua))
        },
        android: function () { return /android/.test(this.ua) },
        iphone: function () { return /iphone/.test(this.ua) || /ipod/.test(this.ua) },
        ipad: function () { return /ipad/.test(this.ua) },
        weixin: function () { return /micromessenger/.test(this.ua) },
    }
})()
