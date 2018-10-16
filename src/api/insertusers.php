<?php
	
	header("Content-Type:text/html;charset=utf-8");
//连接数据库
	
	include 'connect.php';
//	$user_id = isset($_GET['user_id'])?$_GET['user_id']:'';
	$reg_name = isset($_GET['reg_name'])?$_GET['reg_name']:'';
	$reg_psw = isset($_GET['reg_psw'])?$_GET['reg_psw']:'';
//	//写插入语句
	$sql="insert into userslist(users,uspsw) values('$reg_name','$reg_psw')";
//	$sql="insert into userslist(users,uspsw) values('12345678921','12312dfrgkl')";
	$conn->query('SET NAMES utf8');
	//执行查询语句`
	$res=$conn->query($sql);
	
//	echo $reg_name;
	if($res){
		echo '插入成功';
	}
	else{
		echo '插入失败';
	}
	
	//关闭连接数据库
	
    $conn->close();//关闭数据库的链接
?>