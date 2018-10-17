$(function() {

	//透明轮播
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

	var html = ``;
	var html2 = ``;
	$.ajax({
		type: "get",
		url: "../api/selectgoodls.php",
		async: true,
		success: function(str) {
			var data = JSON.parse(str);
			//			console.log(data);
			for(var i = 0; i < data.length; i++) {
				html += `<li class="fl">
						<p style="display: inline-block;width: 188px;">
							<a href="cars.html?id=${data[i].good_id}"><img src="../img/loading.gif" data-src="${data[i].url}"/></a>
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
			var loadImages = lazyload();
			loadImages(); //初始化首页的页面图片
			window.addEventListener('scroll', loadImages, false);
			var len = data.length;
			var images = $('#goodsList img');

			function lazyload() {
				var n = 0; //存储图片加载到的位置，避免每次都从第一张图片开始遍历        
				return function() {
					var seeHeight = document.documentElement.clientHeight;
					var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
					for(var i = n; i < len; i++) {
						if(images[i].offsetTop < seeHeight + scrollTop) {
							if(images[i].getAttribute('src') === '../img/loading.gif') {
								images[i].src = images[i].getAttribute('data-src');
							}
							n = n + 1;
						}
					}
				}
			}
		}
	});

	
})