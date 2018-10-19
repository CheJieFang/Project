<?php
	
//	header("Content-Type:text/html;charset=utf-8");
//连接数据库
	
	include 'connect.php';
	$id = isset($_GET['id'])?$_GET['id']:'';
	$good_inf = isset($_GET['good_inf'])?$_GET['good_inf']:'';
	$url = isset($_GET['url'])?$_GET['url']:'';
	$good_nums = isset($_GET['good_nums'])?$_GET['good_nums']:'';
	$good_prices = isset($_GET['good_prices'])?$_GET['good_prices']:'';
	$good_company = isset($_GET['good_company'])?$_GET['good_company']:'';
	
//	echo $good_inf;
	//写插入语句
	$sql="insert into newgoodlists(good_id,good_inf,url,good_nums,good_prices,good_company) values('$id','$good_inf','$url','$good_nums','$good_prices','$good_company')";
//$sql="insert into newgoodlists(good_id,good_inf,url,good_nums,good_prices,good_company) values('12','就睡觉','/img/','123','110','女人志')";
	$conn->query('SET NAMES utf8');
	//执行查询语句
	$res=$conn->query($sql);
//	echo $sql;
	
	if($res){
		echo '插入成功';
	}
	else{
		echo '插入失败';
	}
	
	//关闭连接数据库
	
    $conn->close();//关闭数据库的链接
?>