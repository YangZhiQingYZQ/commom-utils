var HandlerUrl = function () {
    var urlfn = {
        /**
         * 
         * @param {Boolean} type 是否进行整个URL的转码，默认不转 
         */
        getQuery: function (type) {
            console.log(type);
            var query = {},
                search = window.location.search,
                queryStr = type ? decodeURIComponent(search).substr(1) : search.substr(1);
            if (queryStr) {
                var queryArr = queryStr.split("&"),
                    _queryArr = [],
                    len = queryArr.length;
                do {
                    len--;
                    _queryArr = queryArr[len].split("=");
                    query[_queryArr[0]] = decodeURIComponent(_queryArr[1])
                } while (len > 0)
                return query;
            } else {
                return null;
            }
        },
        /**
         * 
         * @param {Objeck} data //参数对象
         * @param {String} data.url //跳转的链接
         * @param {Objeck} data.params //跳转需要携带的参数
         */
        joinUrl: function (data) {
            var params = data.params,
                key, query = "?";
            for (key in params) {
                query += key + "=" + params[key] + "&";
            }
            return data.url + query.substring(0, query.length - 1);
        }
    }
    return function (type, data) {
        return urlfn[type](data);
    }
}
console.log(HandlerUrl()("joinUrl", {
    url: "xxx.html",
    params: {
        aa: "a",
        bb: "bb"
    }
}));