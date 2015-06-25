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
$rowNumber = 0;
$data = new stdClass;
while ($row = mysqli_fetch_array($qry_res,MYSQLI_ASSOC)) {
    $data->data[$rowNumber] = new stdClass();
    $data->data[$rowNumber]->totalProfitOneHour = $row['totalProfitOneHour'];
    $data->data[$rowNumber]->costOneHour = $row['costOneHour'];
    $rowNumber++;
}

$jsn = json_encode($data);
print_r($jsn);

?>
