<?php
header('Content-Type: text/html; charset=utf-8');
include('params/params.php');
include('connect/connect-db.php');

if(!mysqli_set_charset($con, 'utf8')) {
    echo 'the connection is not in utf8';
    exit();
}

$table = $_GET['table'];

$qry_em = "SELECT tag,SUM(adtagviewed)*0.0035 - sum(sCost)/1000 as profit FROM " . $table . " group by tag;";
//echo $qry_em;
//$qry_em = 'select * from ' . $ORDER_ITEMS_TABLE . '';
$qry_res = mysqli_query($con,$qry_em);

$rowNumber = 0;
$data = new stdClass;
//var_dump($data

 while ($row = mysqli_fetch_array($qry_res,MYSQLI_ASSOC)) {
     $data->data[$rowNumber] = new stdClass();
    //var_dump($row);
    $data->data[$rowNumber]->cm = $row['tag'];
    $data->data[$rowNumber]->profit = $row['profit'];
    $rowNumber++;
} 
 
$jsn = json_encode($data);
print_r($jsn);
?>
