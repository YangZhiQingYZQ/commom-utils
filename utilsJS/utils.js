/**
 * 寄生组合式继承函数
 * @param {Function} subClass 
 * @param {Function} superClass 
 * @param {Object||Array} obj 
 */
function inheritProtorype(subClass, superClass, obj) {
    function F() {};
    F.prototype = superClass.prototype;
    var p = new F(),
        toString = Object.prototype.toString;
    if (obj) {
        var type = toString.call(obj);
        if (type == "[object Array]") {
            var i = obj.length;
            for (; i >= 0; i--) {
                for (j in obj[i]) {
                    p[j] = obj[i][j]
                }
            }
        } else {
            for (j in obj) {
                p[j] = obj[j];
            }
        }
    }
    p.constructor = subClass;
    subClass.prototype = p;
}


var SMS = function (dom) {
    this.dom = $(dom);
    this.content = "发送短信";
    this.isClick = true;
}
SMS.prototype = {
    // 初始化数据
    init: function () {
        this.bindEvent();
    },
    //绑定事件
    bindEvent: function () {
        var that = this;
        this.dom.click(function () {
            if (that.isClick) {
                that.isClick = false;
                that.content = 10;
                that.countDown();
            } else {
                console.log("请不要重新请求")
            }
        })
    },
    //倒计时
    countDown: function () {
        var time;
        return function () {
            if (this.content > 0) {
                this.dom.html(this.content--);
                var that = this;
                time = setTimeout(function () {
                    that.countDown();
                }, 1000);
            } else {
                clearTimeout(time);
                this.content = "重新获取";
                this.dom.html(this.content);
                this.isClick = true;
            }
        }
    }(),
    ajax: function () {
        // 请求后台逻辑
    }
}

/**
 * 批量创建类函数
 * @param {Object} arg 
 */
var initStrategy = function initStrategy(arg) {
    var Strategy = arg;
    /**
     * 新增类
     * @param {String} key
     * @param {Function} val
     */
    var add = function (key, val) {
        if (key in Strategy) {
            throw new Error("key:" + key + "已存在,add函数执行失败")
        } else {
            Strategy[key] = val;
        }
        return this;
    }
    /**
     * 修改类
     * @param {String} key
     * @param {Function} val
     */
    var change = function (key, val) {
        if (key in Strategy) {
            Strategy[key] = val;
        } else {
            throw new Error("key:" + key + "不存在,change函数执行失败")
        }
        return this;
    }
    /**
     * 移除类
     * @param {String} key
     */
    var remove = function (key) {
        delete Strategy[key];
        return this;
    }
    /**
     * 实例化对象函数
     * @param {Object/Array} arg
     * @param {String} key 
     */
    var exe = function (arg, key) {
        var type = Object.prototype.toString.call(arg);
        switch (true) {
            case type == "[object Array]":
                var result = [];
                for (var i = 0; i < arg.length; i++) {
                    result.push(new Strategy[arg[i][key]](arg[i]))
                }
                return result;
            case type == "[object Object]":
                return new Strategy[arg[key]](arg);
            default:
                throw new Error("输入exe函数参数不合法");
        }
    }
    return {
        add: add,
        remove: remove,
        exe: exe,
        change: change
    }
}