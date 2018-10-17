$(function(){
	// 接收url中的参数
	function query(_name) {
		var str = location.search; // str="?a=1&b=2"
		console.log(str);
		if(str != "") {
			var arr = str.substring(1).split("&"); //"a=1&b=2".split("&") -> ["a=1","b=2"]
			for(var i = 0, len = arr.length; i < len; i++) {
				var a = arr[i].split("="); // "a=1".split("=") -> ["a","1"]
				if(a[0] == _name) {
					return a[1];
				}
			}
		}
	}
	var id = query("id");
	//把id传给接口,再去数据库中查询相关商品的信息
	console.log(id);
	
	
	
})
