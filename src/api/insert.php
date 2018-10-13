<?php
	
//	header("Content-Type:text/html;charset=utf-8");
//连接数据库
	
	include 'connect.php';
	
	//写插入语句
	$sql="insert into goodsList(good_id,good_name,good_price,good_num) values('20','衣服','999','10')";
	$conn->query('SET NAMES utf8');
	//执行查询语句
	$res=$conn->query($sql);
	
	
	if($res){
		echo '插入成功';
	}
	
	//关闭连接数据库
	
    $conn->close();//关闭数据库的链接
?>