<?php
header('Content-Type: text/html; charset=utf-8');
include('params/params.php');
include('connect/connect-db.php');

if(!mysqli_set_charset($con, 'utf8')) {
    echo 'the connection is not in utf8';
    exit();
}

$qry_em = "SELECT * FROM data.quickData where PID=1";
$qry_res = mysqli_query($con,$qry_em);
$row = mysqli_fetch_array($qry_res,MYSQLI_ASSOC);
echo $row['totalProfit'];
?>
