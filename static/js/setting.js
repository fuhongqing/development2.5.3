// var floorUrl='http://xmkfapi.ehaofang.net/';//'http://192.168.1.223/';//'http://xmkfapi.ehaofang.com/'
// var cityUrl='http://xiangmuglapi.ehaofang.net/';
// var weihuUrl='http://hr.ehaofang.net/';
// var statesUrl='http://hr.ehaofang.net/';//是否管理员
//正式
var floorUrl = 'http://xmkfapi.ehaofang.com/';//'http://192.168.1.223';'http://xmkfapi.ehaofang.com/'
var cityUrl = 'http://xiangmuglapi.ehaofang.com/';
var weihuUrl = 'http://hr.ehaofang.com/';
var statesUrl = 'http://hr.ehaofang.com/';
function _getCookie(key) {
    var str = document.cookie;
    var arr = str.split("; ");
    for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split("=");
        if (key == arr2[0]) {
            return arr2[1];
        }
    }
    return "";
}
var userName = JSON.parse(decodeURIComponent(_getCookie("user").replace(/[\\]/g, ''))).name;
var createUserid = JSON.parse(decodeURIComponent(_getCookie("user").replace(/[\\]/g, ''))).id;
var thisstate = 1;
var maintainerId;
$('.sui-dropdown-menu').on('click', 'li', function() {
    if ($(this).children('a').html() != '请选择') {
        $(this).parent().prev().children('span').css('color', '#333');
    }
});
var staiccount = 0;
$.ajaxSetup({
    contentType: "application/x-www-form-urlencoded;charset=utf-8",
    complete: function(XMLHttpRequest, textStatus) {
        var sessionstatus = XMLHttpRequest.getResponseHeader("sessionstatus");
        if (staiccount >= 1) {
            return;
        }
        if (sessionstatus == "timeout") {
            alert("长时间未操作,账户信息过期,请重新登录!");
            window.location.replace("http://sso.ehaofangwang.com/ehaofang-ssoweb/pages/login.jsp");
            staiccount++;
        }
    }
});
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) {
            return i;
        }
    }
    return -1;
};
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
$.ajax({
    type: 'get',
    url: statesUrl + 'api/outside/identity',
    data: {userId: createUserid},
    async: false,
    success: function(data) {
        if (data.status == 'success') {
            if (data.data == '2') {
                thisstate = 2;
                maintainerId = '';
            } else {
                thisstate = 1;
                maintainerId = createUserid;
            }
        } else {
            alert('获取用户身份错误');
        }
    },
    error: function() {
        console.log('查询用户身份网络错误');
    }
});
