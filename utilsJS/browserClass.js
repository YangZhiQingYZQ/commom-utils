var HandlerBrowser = (function () {
    //判断网页运行环境
    var u = navigator.userAgent,
        BrowseType = {
            ie: 'Trident', //IE内核
            webKit: 'AppleWebKit', //苹果、谷歌内核
            presto: 'Presto', //opera内核
            mobile: 'Mobile', //是否为移动终端
            iPhone: 'iPhone', //是否为iPhone或者QQHD浏览器
            iPad: 'iPad', //是否iPad
            webApp: 'Safari', //是否web应该程序，没有头部与底部
            weixin: 'MicroMessenger', //是否微信
            qq: 'QQBrowser', //是否QQ浏览器
            mobile_qq: 'MQQBrowser', //是否是手机QQ浏览器
            uc: 'UCBrowser', //是否是uc浏览器
            baidu: 'Baidu', //是否是百度浏览器
            firefox: 'Firefox', //是否是火狐浏览器
            lieBao: 'lieBao', //是否是猎豹浏览器
            sogou: 'sogou', //是否是搜狗手机浏览器
        }
    return function () {
        this.result = {}; //缓存的结果变量  
        this.isBrowse = function (key) { //判断网页所处环境,并缓存结果
            if (!this.result.hasOwnProperty(key) && BrowseType[key]) {
                this.result[key] = u.indexOf(BrowseType[key]) > -1;
            } else {
                throw new Error("没有" + key + "这个判断属性");
            }
            return this;
        }
        this.addBrowseType = function (key, val) { //新增网页判断环境
            BrowseType[key] = val;
            return this;
        };
        this.addResult = function (callBack) { //新增网页判断结果，非常规判断
            callBack.call(this, u);
            return this;
        }
    }
})();