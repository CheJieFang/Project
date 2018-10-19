//轮播图1
var s1 = new Slide(div1, 529, 267, [{
		"title": "标题1",
		"img": "img/lb1.jpg",
		"url": ""
	},
	{
		"title": "标题2",
		"img": "img/lb2.jpg",
		"url": ""
	},
	{
		"title": "标题3",
		"img": "img/lb3.jpg",
		"url": ""
	},
	{
		"title": "标题4",
		"img": "img/lb4.jpg",
		"url": ""
	}
], 10, 0, 3000, 1);

var s2 = new Slide(div2, 529, 200, [{
		"title": "标题1",
		"img": "img/lb2_1",
		"url": ""
	},
	{
		"title": "标题2",
		"img": "img/lb2.jpg",
		"url": ""
	},
	{
		"title": "标题3",
		"img": "img/lb3.jpg",
		"url": ""
	},
	{
		"title": "标题4",
		"img": "img/lb4.jpg",
		"url": ""
	}
], 10, 0, 3000, 1);
//banner 右侧的小选项卡效果
$('.reg_riginf .hd li').mousemove(function() {
	//排他，清除所有
	$('.reg_riginf .hd li').attr('class', '');
	//当前的高亮显示
	$(this).attr('class', 'active1');
	//div跟着切换
	$('.reg_riginf .bd ul').css('display', 'none');
	$('.reg_riginf .bd ul').eq($(this).index()).css('display', 'block');
});

//二级导航选项卡功能(未能实现)
//$('.nav_tab').on('mousemove','.next_nav',function(){
//	console.log($(this));
//	console.log($(this).index());
//})
$('.nav_tab li').mousemove(function(){
//	$('.next_nav').attr('class','');
	console.log($(this));
	console.log($(this).index());
//	$(this).attr('class','actives');
	$('.nav_tab .two_tab').css('display','none');
	$('.nav_tab .two_tab').eq($(this).index()).css('display', 'block');
})
//ajax加载数据渲染F1
$(function(){
	var html=``;
	var htmlb=``;
	$.ajax({
		type:"get",
		url:"api/getData.php",
		async:true,
		success: function(str) {//成功的回调
//				console.log(str);
				var data = JSON.parse(str);
//				console.log(data);
				for(var i=0;i<data.length-11;i++){
					html+=`<li class="fl">
							<p style="display: inline-block;width: 188px;"><a href=""><img src="${data[i].url}"/></a></p>
							
							<label>
								<a href="">${data[i].good_infom}</a>
								<span class="mark_price">分销价</span>
								<span class="mark_prices">￥${data[i].good_price}</span>
							</label>
						</li>`;
				}
				
				$('#F1lists').html($('#F1lists').html()+html);
				
			}
	});
	
	
	$.ajax({
		type:"get",
		url:"api/getbaglist.php",
		async:true,
		success: function(str) {//成功的回调
//				console.log(str);
				var data = JSON.parse(str);
//				console.log(data);
				for(var i=0;i<data.length;i++){
					htmlb+=`<li class="fl">
							<p style="display: inline-block;width: 188px;"><a href=""><img src="${data[i].url}"/></a></p>
							
							<label>
								<a href="">${data[i].good_infom}</a>
								<span class="mark_price">分销价</span>
								<span class="mark_prices">￥${data[i].good_price}</span>
							</label>
						</li>`;
				}
				
				$('#F2lists').html($('#F2lists').html()+htmlb);
				
				
			}
	});
	
	
	
})
