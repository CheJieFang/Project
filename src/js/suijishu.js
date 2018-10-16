var code//在全局 定义验证码
			function createCode() { //创建验证码函数
				code = "";
				var codeLength = 4; //验证码的长度
				var selectChar = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
					'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'); //所有候选组成验证码的字符，当然也可以用中文的
				for(var i = 0; i < codeLength; i++) {
					var charIndex = Math.floor(Math.random() * 36);
					code += selectChar[charIndex];
				}
				// 设置验证码的显示样式，并显示
				document.getElementsByClassName("reg_yzm")[0].style.fontFamily = "Fixedsys"; //设置字体
				document.getElementsByClassName("reg_yzm")[0].style.letterSpacing = "5px"; //字体间距
				document.getElementsByClassName("reg_yzm")[0].style.color = "#0ab000"; //字体颜色
				document.getElementsByClassName("reg_yzm")[0].innerHTML = code; // 显示
			}
			var reg_texnum=document.getElementById('reg_texnum'); 
			var refresh=document.getElementsByClassName("refresh")[0];
			function but() { 
				//验证验证码输入是否正确
				var val1 = document.getElementById("reg_texnum").value;
				var val2 = code;
				console.log(val1);
				console.log(val2);
				if(val1 === val2) {
					document.getElementsByClassName("yzmr")[0].style.display="inline-block";
					
//					document.getElementById('reg_texnum').value = "";
				}
				else{
					document.getElementsByClassName("yzmw")[0].style.display="inline-block";
				}
			}
			
			createCode();
			refresh.onclick=function(){
				createCode();
//				but();
			}

			reg_texnum.onblur=function(){
				but();
			}
			