<?php
	
//header("Content-Type:text/html;charset=utf-8");
	
//1.链接数据库

include 'connect.php';

//2.查询表

$sql='select * from newgoodlists';

//3.执行查询语句
$conn->query("SET NAMES utf8");
$res=$conn->query($sql);

//4.获取查询的结果集

$row=$res->fetch_all(MYSQLI_ASSOC);

//5.将结果集转成json数据传回给前段
echo json_encode($row,JSON_UNESCAPED_UNICODE);

//6.关闭结果集

$res->close();

//7.关闭数据库
$conn->close();
?>