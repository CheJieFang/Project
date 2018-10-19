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
//	console.log(id);
	//将前一个页面传过来的id通过ajax传给接口，接口通过id在数据库找到对应的数据
	$.ajax({
		type:"get",
		url:"../api/selectgdbid.php",
		async:true,
		data:{
			'id':id
		},
		success:function(str){
			var data=JSON.parse(str);
			console.log(data);
			for(var i=0;i<data.length;i++){
			var html1=``;
			var html=``;
			html1=`<h1>${data[i].good_inf}</h1>`;
			html=`
				
					<div class="inftitle">
						<div class="type fl">包邮</div>
						<div class="price fl">
							<p>≥1件</p>
							<p class="num">
								￥${data[i].good_prices}
							<b style="font-size: 12px;">分销价</b>
							</p>
						</div>
					</div>
					<div class="goodtials">
						<p>
							爆款指数：
							<img src="../img/file.jpg"/>
							<span>${data[i].good_nums}件成交</span>
						</p>
						<div class="promise">建议零售价：<b style="color: #ff7300;">￥${parseInt(data[i].good_prices*1.5)}</b></div>
						<div class="goodsNum">
							<span>货号</span>
							<span style="color: #000000;margin-right: 10px;">ED27671267</span>
							<span><input type="button" name="" id="" value="复制" /></span>
						</div>
						<div class="huod">已上活动场次：<span>17次</span></div>
						<div class="tell">
							<ul>
								<li class="fl">
									<a class="a1" href="">上架到淘宝店</a>
								</li>
								<li class="fl"><a class="a2" href="">加入上架篮</a></li>
								<li class="fl"><a class="a3" href="">数据包下载</a></li>
								<li class="fl"><a class="a4" href="">上架到蘑菇街</a></li>
								<a class="a5" href="">使用教程</a>
							</ul>
						</div>
						<div class="find_Style">
							<ul>
								<li class="fl">黄白</li>
								<li class="fl">黑白</li>
								<li class="fl">杏粉</li>
							</ul>
							<div class="find_Size">
								<span class="cm">尺码</span>
								<div class="fl shul">
									<span>均码</span>
									<span  class="keshou">${data[i].good_nums}件可售</span>
									<span class="price">${data[i].good_prices}元</span>
								</div>
								<div class="jiajian">
									<a class="jian">-</a>
									<input type="text" name="slsrk" id="slsrk" value="0" />
									<a class="jia">+</a>
								</div>
							</div>
						</div>
						<div class="find_fg">
							<div class="zongj">共<span class="total">0</span>件，总共￥<span class="totalmony">0.00</span>元<a>批量下单</a></div>
							<p>
								<a class="ljxd" href="">立即下单</a>
								<a class="jhd"><i></i>加入进货单</a>
							</p>
						</div>
					</div>
				
			`;
			$('#good_title').html(html1);
			$('.goodInf').html(html);
			}
		}
	});
	
	//绑定点击增加事件
	$('.goodInf').delegate('.jia','click',function(){
		var num=$(this).prev().val();
		num++;
		$(this).prev().val(num);
		var shu=$('.goodInf .keshou').text();
		var numbers=parseInt(shu);
		if(num>numbers){
			num=numbers;
			$(this).prev().val(num);
			alert('当前库存numbers件');
			
		}
		//小计
		price($(this));
	})
	
	//点击减少
	$('.goodInf').delegate('.jian ','click',function(){
		var num=$(this).next().val();
		num--;
		$(this).next().val(num);
		if(num<1){
			num=0;
			$(this).next().val(num);
		}
		//小计
		price($(this));
	})

	//小计封装
	function price(now){
		//拿到添加的数量
		var good_Number=now.parent().find('input').val();
		//拿到单价
		var good_price=now.parent().parent().find('.price').text();
		good_price=parseFloat(good_price);
//		console.log(good_price);
		var total=good_Number*good_price;
		total=total.toFixed(2);
//		console.log(total.toFixed(2));
		$('.goodInf .zongj').find('.total').text(good_Number);
		$('.goodInf .zongj').find('.totalmony').text(total);
			
	}
	
	//手动输入数量
	$('.goodInf').delegate('#slsrk','blur',function(){
		var num=$(this).val()*1;
		var shu=$('.goodInf .keshou').text();
		var numbers=parseInt(shu);
		if(typeof(num) === 'number' && (num % 1) === 0) {
		if(num > numbers) {
			num=numbers;
			$(this).val(numbers);
			price($(this));
			alert('一次最多只能购买'+numbers+'件');
		}
		price($(this));
		
	} else {
		alert('请输入有效数字');
	}
	})
	
	
	
	//点击加入进货单
	$('.goodInf').delegate('.jhd','click',function(){
		var number=$(this).parent().prev().find('.total').text();
		console.log(number);
		if(number!=0){
			alert('添加成功');
			$.ajax({
		type:"get",
		url:"../api/selectgdbid.php",
		async:true,
		data:{
			'id':id
		},
		success:function(str){
			var data=JSON.parse(str)
			console.log(data);
			for(var i=0;i<data.length;i++){
				console.log(data[i].good_company);
				//将该条内容信息插入到新表
				$.ajax({
				type:"get",
				url:"../api/insertngd.php",
				async:true,
				data:{
					'id':data[i].good_id,
					'good_inf':data[i].good_inf,
					'url':data[i].url,
					'good_nums':data[i].good_nums,
					'good_prices':data[i].good_prices,
					'good_company':data[i].good_company
				},
				success:function(str){
					console.log(str);
				}
			});
			}
			
			
		}
		
	});
			}
		
		else{
			alert('请选择相应商品');
		}
	})
	
	
	
	
	
	
	
})
