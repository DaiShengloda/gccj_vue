// import { log } from 'util';
const browser = {
    versions: function () {
        var u = navigator.userAgent;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Firefox') > -1, //火狐内核Gecko
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android
            iPhone: u.indexOf('iPhone') > -1, //iPhone
            iPad: u.indexOf('iPad') > -1, //iPad
            webApp: u.indexOf('Safari') > -1, //Safari
            user: u,
        };
    }()
}
// 工具
function tools() {
    return {
        android: browser.versions.android,//安卓
        trident: browser.versions.trident, //IE内核
        presto: browser.versions.presto, //opera内核
        webKit: browser.versions.webKit, //苹果、谷歌内核
        gecko: browser.versions.gecko, //火狐内核Gecko
        mobile: browser.versions.mobile, //是否为移动终端
        ios: browser.versions.ios, //ios
        iPhone: browser.versions.iPhone, //iPhone
        iPad: browser.versions.iPad, //iPad
        webApp: browser.versions.webApp, //Safari
        user: browser.versions.user, //Safari
        //微信
        isWeiXin: function () {
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                return true;
            } else {
                return false;
            }
        },
        //获取安卓版本号
        getAnbanben: function () {
            var user = this.user;
            var index = user.indexOf("Android");
            if (index > 0) {
                return parseFloat(user.slice(index + 8));
            } else {
                return null;
            }
        },
        // 获取html名称
        pageName: function () {
            var a = location.href;
            var b = a.split("/");
            var c = b.slice(b.length - 1, b.length).toString(String).split(".");
            return c.slice(0, 1);
        },
        //判断是数组
        isArray(o){
            return Object.prototype.toString.call(o)=='[object Array]';
        },
        //判断null
        isNull: function (exp) {
            if (!exp && typeof exp != "undefined" && exp != 0) {
                return true;
            } else if (exp == "null") {
                return true;
            }
            return false;
        },
        //删除地址栏参数
        delQueStr: function (url, ref) {
            var str = "";
            if (url.indexOf('?') != -1) {
                str = url.substr(url.indexOf('?') + 1);
            }
            else {
                return url;
            }
            var arr = "";
            var returnurl = "";
            var setparam = "";
            if (str.indexOf('&') != -1) {
                arr = str.split('&');
                for (i in arr) {
                    if (arr[i].split('=')[0] != ref) {
                        returnurl = returnurl + arr[i].split('=')[0] + "=" + arr[i].split('=')[1] + "&";
                    }
                }
                return url.substr(0, url.indexOf('?')) + "?" + returnurl.substr(0, returnurl.length - 1);
            }
            else {
                arr = str.split('=');
                if (arr[0] == ref) {
                    return url.substr(0, url.indexOf('?'));
                }
                else {
                    return url;
                }
            }
        },
        //获取cookie
        getcookie: function (name) {
            var strcookie = document.cookie;
            var arrcookie = strcookie.split("; ");
            for (var i = 0; i < arrcookie.length; i++) {
                var arr = arrcookie[i].split("=");
                if (arr[0] == name)return decodeURIComponent(arr[1]);
            }
            return "";
        },
        //设置本地储存
        setLocal: function (name, value) {
            var curTime = new Date().getTime();
            localStorage.setItem(name, JSON.stringify({data: value, time: curTime}));
        },
        //获取本地储存
        getLocal: function (name, exp) {
            var data = localStorage.getItem(name);
            var dataObj = JSON.parse(data);
            if (exp && new Date().getTime() - dataObj.time > exp) {
                console.log('信息已过期');
                return null;
            } else {
                //console.log("data="+dataObj.data);
                //console.log(JSON.parse(dataObj.data));
                var dataObjDatatoJson = JSON.parse(dataObj.data)
                return dataObjDatatoJson;
            }
        },

        /*
        * 深复制
        * params
        * -destination  被赋值的新对象
        * -source  取值的对象
        * -miss  忽略的对象
        * */
        deepCopy: function (destination, source,miss) {
            for (var p in source) {
                if($.inArray(p, miss)>-1){
                    return;
                }
                if (getType(source[p]) == "array" || getType(source[p]) == "object") {
                    destination[p] = getType(source[p]) == "array" ? [] : {};
                    arguments.callee(destination[p], source[p]);
                }
                else {
                    destination[p] = source[p];
                }
            }
            function getType(o) {
                var _t;
                return ((_t = typeof(o)) == "object" ? o == null && "null" || Object.prototype.toString.call(o).slice(8, -1) : _t).toLowerCase();
            }
        },
        isDD: function () {
          //判断是不是钉钉
          var ua = navigator.userAgent.toLowerCase();　　
          return ua.indexOf("dingtalk") >= 0;
        },
    }
}

//正则类
function regular() {
    return {
        //电话号码
        isPhone: function (phone) {
          var pattern = /^1[3,4,5,6,7,8,9]\d{9}$/;
          return pattern.test(phone);
        },
        //固定电话
        isTelPhone:function(telPhone){
          return /^(0\\d{2}-\\d{8}(-\\d{1,4})?)|(0\\d{3}-\\d{7,8}(-\\d{1,4})?)$/.test(telPhone);
        },
        //邮件
        isEmail: function (email) {
          var pattern = /^((([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})[; ,])*(([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})))$/;
          return pattern.test(email);
        },
        //姓名
        isName: function (val) {
          var pattern = /^[\u4e00-\u9fa5a-zA-Z]{2,10}$/;
          return pattern.test(val);
        },
        //邮编
        isZip: function (val) {
          var pattern = /^[0-9]\d{5}$/;
          return pattern.test(val);
        },
        //身份证
        issfz: function (val) {
          var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
          return pattern.test(val);
        },
        //数字
        isNum: function (val) {
          // var pattern = /([1-9]\d*\.?\d*)|(0\.\d*[1-9])/;
          var pattern = /^[0-9]+$/;
          return pattern.test(val);
        },
        //匹配中英文
        isChAndEn: function (val) {
          var pattern = /[a-zA-Z\u4e00-\u9fa5]+/g;
          return !pattern.test(val);
        } 
    }
}

export default {
    tools,
    regular
}