$(function() {
			//1.注册验证
			$('#reg_name').blur(function() {
				//		console.log($('#reg_name').val());
				var reg_value = $('#reg_name').val();
				console.log(reg_value);
				var key = reg_value.match(/(^1[35789]\d{9}$)|(^\w+@\w+(\.\w+)+$)/);
				if(key) {
					console.log(true);
					$('.reginfom_right').css('display', 'inline-block');
				} else {
					console.log(false);
					$('.error').css('display', 'inline-block');
				}

			})
		})	