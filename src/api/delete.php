<?php
	
	//删除数据
	
	//连接数据库
	
	include 'connect.php';
	
	//接收参数
	$id=$_GET['id'];
	
	//写删除语句
	$sql="delete from goodsList where good_id=$id";
//	$conn->query("SET NAMES utf8");
	//执行查询语句
	$res=$conn->query($sql);
	
	if($res){
		echo '删除成功';
	}
	
	//关闭连接数据库
	
    $conn->close();//关闭数据库的链接
?>