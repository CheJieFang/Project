$(function() {

	var html = ``;
	$.ajax({
		type: "get",
		url: "../api/selectnglist.php",
		async: true,
		success: function(str) {
			var data = JSON.parse(str);
			console.log(data);
			for(var i = 0; i < data.length; i++) {
				html += `
				<div class="listBox">
				<div class="container gyshang">供应商：<span>${data[i].good_company}</span></div>
		<div class="container storBox">
			<div class="d1_w">
				<input type="checkbox" name="" id="" value="" class="cheb"/>
				<img src="${data[i].url}"/>
				<div class="infomation fl">
					<p class="goodtitle fl">${data[i].good_inf}</p>
				<p class="itemNum fl">货号：ED26777157</p>
				</div>
				<div class="goodsize">
					<div class="good_l fl">
						<span class="styles">黑色</span>
					</div>
					<div class="good_r fr">
						<span>35</span>
						<a class="cut">-</a>
						<input type="" name="" id="" value="1" />
						<a class="add">+</a>
					</div>
				</div>
			
			</div>
				<div class="box_right">
					<div class="fl box1" style="width: 100px;">
						<span>￥${data[i].good_prices}</span><br />
						<span style="text-decoration: line-through;">原价￥${data[i].good_prices}</span>
					</div>
					<div class="fl box2">1</div>
					<div class="fl box3">￥<span>${data[i].good_prices}</span></div>
					<div class="fl box4"><img id="btn" src="../img/dsImg_56.jpg"/></div>
				</div>
		</div>
		<div class="container" style="height: 70px;">
			<div class="calculate fr">
				<span>已进货商品<span class="zonum">1</span> 件</span>
				<span style="color:#ff0c17">合计（不含运费）：￥<span class="total">${data[i].good_prices}</span></span>
				<a href="">结算</a>
			</div>
		</div>
		</div>
	`;
			}

			$('#carslist').html($('#carslist').html() + html);

			//点击删除
			$('#carslist').delegate('.box4', 'click', function() {
				alert("您确定删除该宝贝吗？");
				$(this).parent().parent().parent().remove();
			})
			//			isCheked();
			//判断复选框是否被选中
			function isCheked() {
				var arr = [];
				var len = $('.d1_w>input').size();
				//				console.log(len);
				for(var i = 0; i < len; i++) {
					//判断所有的input中，是否有存在checked，若存在，则将其下标追加存到数组中
					if($('.d1_w>input').eq(i).prop('checked')) {
						arr.push(i);
					}
					//			console.log(arr);
				}
				//记录下来的下标以数组的形式返回
				return arr;
				//				console.log(arr);
			}

			var keys = true;
			//全选和取消全选
			$("#allchecked").on('click', function() {
				if(keys) {
					$("#allchecked").prop("checked", "checked");
					$('.d1_w>input').prop('checked', "checked");

				} else {
					$("#allchecked").removeAttr('checked');
					$('.d1_w>input').removeAttr('checked');

				}
				keys = !keys;
				//判断复选框是否被选中
				//				isCheked();

			})

			//单行选中

			$('#carslist').on('click', '.cheb', function() {
				var arr = isCheked();
				console.log($('.cheb').size());
				if(arr.length == $('.cheb').size()) {
					//都被选中了
					$('#allchecked').prop('checked', 'checked');
					//三个都被选中了，下次点击全选按钮是为了全不选
					keys = false;
				} else {
					$('#allchecked').removeAttr('checked');
					//证明没有选中全部
					keys = true;

				}
				var arr = isCheked(); //判断哪行被选中，存到该数组中

			});

			//删除多行

			$('#delbtn').on('click', function() {
				var arr = isCheked(); //被选中的行
//				console.log(arr);
				var res = confirm('您确定要删除多行吗？');
				if(res) {
					//删除arr下标对应的行
					for(var i = arr.length - 1; i >= 0; i--) {
						//从后面开始删除
						$('.cheb').eq(arr[i]).parent().parent().parent().remove();
					}
				}

				
			});

		}

	});

	//点击增加
	$('#carslist').delegate('.add', 'click', function() {
		var num = $(this).prev().val();
		num++;
		$(this).prev().val(num);
		//小计
		price($(this));
	})

	//点击减少
	$('#carslist').delegate('.cut', 'click', function() {
		var num = $(this).next().val();
		if(num <= 1) {
			alert('输入有误');
		} else {
			num--;
			$(this).next().val(num);
			//小计
			price($(this));
		}

	})

	//小计封装
	function price(now) {
		//拿到添加的数量
		var good_Number = now.parent().find('input').val();
		console.log(good_Number);
		//拿到单价
		var good_price = now.parent().parent().parent().next().find('.box3 span').text();
		//		good_price=parseFloat(good_price);
		console.log(good_price);
		var total = good_Number * good_price;
		total = total.toFixed(2);
		now.parent().parent().parent().next().find('.box2').html(good_Number);
		now.parent().parent().parent().parent().next().find('.calculate .zonum').text(good_Number);
		now.parent().parent().parent().parent().next().find('.calculate .total').text(total);

	}

})