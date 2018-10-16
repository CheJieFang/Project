$(function(){
	var div=$('.lbtrtc');
	var lis=$('.lbtrtc ul li');
	var btns=$('ol span');
	var len=btns.length;
	var now=0;
	
	tab();
	
	for( let i=0; i<len; i++ ){
		btns[i].onclick = function(){
			now=i;
			tab();
		}
	}
	
	function tab(){
		for(let j=0; j<len; j++){
			btns[j].className = "";
			lis[j].style.display = "block";
			startMove(lis[j], {"opacity":0}, function(){
				lis[j].style.display = "none";//如果没有这个回调函数的话，当点击任意一张轮播图的时候，
//				都会跳到最后一张图片对应的链接，原因是虽然图片的透明度为0，但是事实上图片依然存在，只是肉眼看不见。
//              因为定位的缘故，所以第四张图片在最顶层，所以点击的时候实际上点击的是第四张图片的链接，此处的回调函数就能解决这个问题
			});
		}
		btns[now].className = "selected";
		startMove(lis[now], {"opacity":100});
	}
	
	function next(){
		now++;
		if( now==len ){
			now=0;
		}
		tab()
	}
	
	var timer = setInterval(next, 2000);
	div.onmouseover = function(){
		clearInterval(timer);
	}
	div.onmouseout = function(){
		timer = setInterval(next, 2000);
	}
	
})