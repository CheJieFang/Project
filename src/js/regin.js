$(function() {

	//在全局 定义验证码
	function createCode() { //创建验证码函数
		code = "";
		var codeLength = 4; //验证码的长度
		var selectChar = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
			'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'); //所有候选组成验证码的字符，当然也可以用中文的
		for(var i = 0; i < codeLength; i++) {
			var charIndex = Math.floor(Math.random() * 48);
			code += selectChar[charIndex];
		}
		// 设置验证码的显示样式，并显示
		$('.reg_yzm').css('fontFamily', 'Fixedsys').css('letterSpacing', '5px').css('color', '#0ab000');
		$('.reg_yzm').html(code);
	}
	//执行生产随机验证码函数
	createCode();
	//刷新按钮时，生成随机验证码
	$('.refresh').click(function() {
		createCode();
	})

	//注册验证
	var arr = [false, false, false];
	var brr = [];
	//1.用户验证
	$('#reg_name').blur(function() {
		var reg_value = $('#reg_name').val();
		console.log(reg_value);
		if(reg_value == '') {
			$('.reg_namer').css('display', 'none');
			$('.reg_namew').css('display', 'inline-block');
			$('.reg_namez').css('display', 'none');
		}
		var key = reg_value.match(/(^1[35789]\d{9}$)|(^\w+@\w+(\.\w+)+$)/);
		console.log(key);
		$.ajax({
			type: "get",
			url: "../api/selectusers.php",
			async: true,
			success: function(str) {
				var data = JSON.parse(str);
								console.log(data);
				for(var i = 0; i < data.length; i++) {
					//应该判断reg_value跟数据库中存在的所有用户名都不相等
					brr.push(data[i].users);
					console.log(brr.indexOf(reg_value));
				}
					if(brr.indexOf(reg_value)!=-1){
					//用户名已存在
						$('.reg_namer').css('display', 'none');
						$('.reg_namew').css('display', 'none');
						$('.reg_namez').css('display', 'inline-block');
					}else if(brr.indexOf(reg_value)==-1 &&reg_value!='' &&key!=null){
						//验证通过
						$('.reg_namer').css('display', 'inline-block');
						$('.reg_namew').css('display', 'none');
						$('.reg_namez').css('display', 'none');
						arr[0] = true;
					}else if(key==null){
						//非法用户名
						$('.reg_namer').css('display', 'none');
						$('.reg_namew').css('display', 'inline-block');
						$('.reg_namez').css('display', 'none');
					}
			}
		});
		//		
	})

	//2.密码验证
	$('#reg_psw').blur(function() {
		var reg_psw = $('#reg_psw').val();
		if(reg_psw==''){
			$('.psw_null').css('display', 'inline-block');
			$('.psw_true').css('display', 'none');
			$('.psw_wrong').css('display', 'none');
			
		}
		var key = reg_psw.match(/^\w{8,20}$/);
		if(key) {
			//					console.log(true);
			$('.psw_null').css('display', 'none');
			$('.psw_true').css('display', 'inline-block');
			$('.psw_wrong').css('display', 'none');
			
			arr[1] = true;
		} else {
			//					console.log(false);
			$('.psw_null').css('display', 'none');
			$('.psw_true').css('display', 'none');
			$('.psw_wrong').css('display', 'inline-block');
		}

	})

	//3.验证码验证
	$('#reg_texnum').blur(function() {
		var reg_texnum = $('#reg_texnum').val();
		//		console.log(reg_texnum);
		var reg_yzm = $('.reg_yzm').html();
		//		console.log(reg_yzm);
		if(reg_texnum == reg_yzm) {
			//			console.log(true);
			$('.yzmr').css('display', 'inline-block');
			$('.yzmw').css('display', 'none');
			arr[2] = true;
		} else {
			//			console.log(false);
			$('.yzmr').css('display', 'none');
			$('.yzmw').css('display', 'inline-block');
		}

	})

	//4.点击注册
	$('.next_btn').click(function() {
		var reg_name = $('#reg_name').val();
		console.log(reg_name);
		var reg_psw = $('#reg_psw').val();
		console.log(reg_psw);
		if(arr[0] == arr[1] == arr[2] == true) {
			$.ajax({
				type: "get",
				url: "../api/insertusers.php",
				async: true,
				data: {
					'reg_name': reg_name,
					'reg_psw': reg_psw
				},
				success: function(str) {
					console.log(str);
				}
			});
			alert("注册成功，3秒后跳转到登录页面");
			setTimeout(function() {
				//跳转到登录页面
				location.href = "login.html";
			}, 3000);
		} else {
			alert('注册失败');
		}
	})
})