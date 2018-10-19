<?php
	
//header("content-type:text/html;charset=utf-8"); 
	//查询数据接口
	
	//连接数据库
	include 'connect.php';
	
	$page=isset($_GET['page']) ? $_GET['page'] : '' ;
	$qty=isset($_GET['qty']) ? $_GET['qty'] : '';
	//写查询语句
	$sql='select * from goodslist';
	
	//执行查询语句
	$conn->query("SET NAMES utf8");
	$res=$conn->query($sql);
	//获取里面的结果集 (数组类型)
	$row=$res->fetch_all(MYSQLI_ASSOC);
//	var_dump($row);
	//转成字符串
	
	
	//把字符串转成数组
//	$data = json_decode($row,true);
//	var_dump($data);
	$datalist=array(
		'total' => count($row),
		'list'  => array_slice($row,($page-1)*$qty,$qty),
		'page'  => $page,
//		'qty'   => $qty
	);
	
	//把字符串形式的json数据传给前端  echo
	echo json_encode($datalist,JSON_UNESCAPED_UNICODE);


	//关闭连接数据库
	$res->close();//关闭结果集
    $conn->close();//关闭数据库的链接
?>