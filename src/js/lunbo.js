/*
 
 	轮播图制作步骤：
 	
 		* 将所有图片放到右侧，第一张在可视区
 		* 动态创建焦点
 		* 开定时器让图片动起来
 		* 左右按钮切换图片
 		* 焦点跟随和焦点点击切换
*/

var aLis=$('#slider_img li');//所有的li
var iW=aLis.eq(0).width();//一个li的宽度

//将所有图片放到右侧，第一张在可视区

$('#slider_img li').css('left',iW);
$('#slider_img li').eq(0).css('left',0);


//动态创建焦点

var html='';
for(var i=0;i<aLis.length;i++){
	html+='<span>'+i+'</span>';
}
$('#light').html(html);

$('#light span:first').addClass('active');


//开定时器让图片动起来

var now=0;//当前图片下标
var timer=null;

clearInterval(timer);
timer=setInterval(next,2000);//设置每隔两秒钟切换一个图片

function next(){
	//旧的
	$('#slider_img li').eq(now).animate({'left':-iW},1000);
	
	now=++now > $('#slider_img li').length-1 ? 0 :now;//now++如果到了最后一张，就归零
	
	//新的
	
	$('#slider_img li').eq(now).css('left',iW);//新的一张快速放在右侧
	$('#slider_img li').eq(now).animate({'left':0},1000);
	light();
}

//焦点跟随

function light(){
	//焦点高亮跟随
	//siblings()在此处的作用是找到当前的span的所有兄弟节点
	$('#light span').eq(now).addClass('active').siblings().removeClass('active');
}


//点击左右按钮切换图片

$('#slider').hover(function(){
	//鼠标经过执行这里的代码
	clearInterval(timer);
},function(){
	//鼠标离开执行这里的代码
	clearInterval(timer);
	timer=setInterval(next,2000);//设置每隔两秒钟切换一个图片
});


$('#prev').click(function(){
	//点击
	prev();
});

function prev(){
	//旧的
	$('#slider_img li').eq(now).animate({'left':iW},1000);//旧的挪到右侧
	
	now=--now < 0 ? $('#slider_img li').length-1 : now;//范围约束
	//新的
	$('#slider_img li').eq(now).css('left',-iW);//快速放在左侧
	$('#slider_img li').eq(now).animate({'left':0},1000);//缓慢进入可视区
}

var oldtime=new Date();
$('#next').click(function(){
	//点击切换下一张
	if(new Date()-oldtime >= 500){
		//当两次点击间隔时间大于800毫秒，就是有效点击
		next();
	}
	oldtime=new Date();
});


//焦点跟随和焦点点击切换

$('#light span').click(function(){
	var _this=$(this).index();
	if(now<_this){
		//从右侧进来
		//旧的挪到左侧
		$('#slider_img li').eq(now).animate({'left':-iW},1000);
		//新的放在右侧，挪到可视区
		$('#slider_img li').eq(_this).css('left',iW);
		$('#slider_img li').eq(_this).animate({'left':0},1000);
		//更新now的值
		now=_this;
		
	}
	
	if(now>_this){
		//从左侧进来
		//旧的挪到右侧
		$('#slider_img li').eq(now).animate({'left':iW},1000);
		
		//新的放在左侧，挪到可视区
		$('#slider_img li').eq(_this).css('left',-iW);
		$('#slider_img li').eq(_this).animate({'left':0},1000);
		//更新now的值
		now=_this;

	}
	light();
	
});