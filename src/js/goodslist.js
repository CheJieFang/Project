$(function() {

	//透明轮播图
	var div = $('.lbtrtc');
	var lis = $('.lbtrtc ul li');
	var btns = $('ol span');
	var len = btns.length;
	var now = 0;

	tab();

	for(let i = 0; i < len; i++) {
		btns[i].onclick = function() {
			now = i;
			tab();
		}
	}

	function tab() {
		for(let j = 0; j < len; j++) {
			btns[j].className = "";
			lis[j].style.display = "block";
			startMove(lis[j], {
				"opacity": 0
			}, function() {
				lis[j].style.display = "none";
			});
		}
		btns[now].className = "selected";
		startMove(lis[now], {
			"opacity": 100
		});
	}

	function next() {
		now++;
		if(now == len) {
			now = 0;
		}
		tab()
	}

	var timer = setInterval(next, 2000);
	div.onmouseover = function() {
		clearInterval(timer);
	}
	div.onmouseout = function() {
		timer = setInterval(next, 2000);
	}
	
	//懒加载部分
	var html = ``;
	$(window).scroll(function() { //开始监听滚动条
		//获取当前滚动条高度
		var topp = $(document).scrollTop();
		//懒加载函数封装
		function addPage(Htopp,pages){
		if(topp ==Htopp &&pages<5) {
				$.ajax({
				type: "get",
				url: "../api/pages.php",
				async: true,
				data: {
					'page': pages,
					'qty': 10
				},
				success: function(str) {
					var data = JSON.parse(str);
					var data = data.list;
					console.log(data);
					for(var i = 0; i < data.length; i++) {
						html += `<li class="fl">
						<p style="display: inline-block;width: 188px;">
							<a href="goodInfo?id=${data[i].good_id}"><img src="${data[i].url}" data-src="${data[i].url}"/></a>
						</p>

						<div class="title"><a href="">${data[i].good_inf}</a></div>
						<div class="wrap">
							<a class="company" href="">${data[i].good_company}</a>
							<p class="fr" style="height: 16px;">已售<label>${data[i].good_nums}件</label></p>
						</div>
						<div class="wrap">
							<a href="" style="color: #d71e00;text-align: left;">￥${data[i].good_prices}</a>
							<a class="fr" href="" style="width: 68px;height:24px;background: #d71e00;color: white;margin-right: 10px;margin-right: 22px;line-height: 24px;text-align: center;">立即上架</a>
						</div>
					</li>
					`;
					}
					$('#goodsList').html(html);
				}
			});	
		}
	}
		//当滚动条达到相应位置的时候,加载相应的页数
		addPage(100,1);
		addPage(800,2);
		addPage(1500,3);
		addPage(2200,4);
	})
})