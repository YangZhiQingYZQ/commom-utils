//jQuery技巧

//禁用页面的右键菜单
$(function(){
	$(document).bind("contextmenu",function(e){
		return false;
	})
})

//新窗口打开页面
$(function(){
	//例子一: herf= "http://"的超链接将会在新窗口打开链接
	// $('a[href^="http://"]').attr("target","_black");
	//例子二：rel = "external" 的超链接将会在新窗口打开链接
	$("a[rel$='external']").click(function(){
		this.target = "_blank"
	})
})
//use:<a href = "http://www.cssrain.cn" rel = "external">open link</a>

