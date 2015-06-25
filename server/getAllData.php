<?php
header('Content-Type: text/html; charset=utf-8');
include('params/params.php');
include('connect/connect-db.php');

if(!mysqli_set_charset($con, 'utf8')) {
    echo 'the connection is not in utf8';
    exit();
}

$table = $_GET['table'];
$qry_em = "select * from quickData";
$qry_res = mysqli_query($con,$qry_em);

$rowNumber = 0;
$data = new stdClass;

 while ($row = mysqli_fetch_array($qry_res,MYSQLI_ASSOC)) {
        $data->data[$rowNumber] = new stdClass();
        $data->data[$rowNumber]->totalProfitDesktopAPNX = $row['totalProfitDesktopAPNX'];
        $data->data[$rowNumber]->totalProfitOneHourDesktopAPNX = $row['totalProfitOneHourDesktopAPNX'];
        $data->data[$rowNumber]->totalProfitDesktopMM = $row['totalProfitDesktopMM'];
        $data->data[$rowNumber]->totalProfitOneHourDesktopMM = $row['totalProfitOneHourDesktopMM'];
        $data->data[$rowNumber]->totalProfitMobileAPNX = $row['totalProfitMobileAPNX'];
        $data->data[$rowNumber]->totalProfitOneHourMobileAPNX = $row['totalProfitOneHourMobileAPNX'];
        $data->data[$rowNumber]->totalProfitMobileMM = $row['totalProfitMobileMM'];
        $data->data[$rowNumber]->totalProfitOneHourMobileMM = $row['totalProfitOneHourMobileMM'];

    $rowNumber++;
} 
 
$jsn = json_encode($data);
print_r($jsn);
?>
