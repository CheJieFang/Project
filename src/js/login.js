$(function() {

	//验证密码是否为空
	$('#login_psw').blur(function() {
			var login_psw = $('#login_psw').val();
			if(login_psw==''){$('.pwsnoval').css('display','inline-block');}
		})
	//验证用户名是否为空
	$('#login_input').blur(function() {
		var login_name = $('#login_input').val();
		var arr=[];
		if(login_name==''){$('.noval').css('display','inline-block');}
		else{
			//ajax调数据
		$.ajax({
			type: "post",
			url: "../api/selectusers.php",
			async: true,
			success: function(str) {
				var data = JSON.parse(str);
				for(var i = 0; i < data.length; i++) {
					if(login_name != data[i].users) {
						arr.push(false);
					}
					else{arr.push(true);}
				}
				console.log(arr);
				if(arr.indexOf(true)==-1){
					$('.nofind').css('display','inline-block');
				}
			}

		});
		}
	})

	$('.login_btn').click(function() {
		var login_name = $('#login_input').val();
		var login_psw = $('#login_psw').val();
		$.ajax({
			type: "post",
			url: "../api/selectusers.php",
			async: true,
			success: function(str) {
				var data = JSON.parse(str);
				for(var i = 0; i < data.length; i++) {
					if(login_name == data[i].users) {
						if(login_psw == data[i].uspsw) {
							alert('登陆成功');
							location.href = "../index.html";
							
						} else {
							$('.pwserror').css('display','inline-block');
						}
					}

				}
			}
		});
	})

})