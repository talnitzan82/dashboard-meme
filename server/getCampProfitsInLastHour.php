<?php
header('Content-Type: text/html; charset=utf-8');
include('params/params.php');
include('connect/connect-db.php');

if(!mysqli_set_charset($con, 'utf8')) {
    echo 'the connection is not in utf8';
    exit();
}

$table = $_GET['table'];
$tag = $_GET['tag'];
$qry_em = "select * from ProfitPerCampaign where tag='tal'";
$qry_em = "SELECT sCampaignID, COUNT(id) AS Requests,SUM(adtagviewed) AS AdImp,(SUM(adtagviewed) / COUNT(id)) * 100 AS fill,sum(sCost)/1000 as cost, SUM(adtagviewed)*0.0035 as revenue, SUM(adtagviewed)*0.0035 - sum(sCost)/1000 as profit, ((SUM(adtagviewed)*0.0035 - sum(sCost)/1000)/(SUM(adtagviewed)*0.0035))*100 as prmargin FROM " . $table . " where tag = '" . $tag . "' and timestampdiff(HOUR, ts, now() ) < 1 GROUP BY sCampaignID ;";
//echo $qry_em;
//$qry_em = 'select * from ' . $ORDER_ITEMS_TABLE . '';
$qry_res = mysqli_query($con,$qry_em);

$rowNumber = 0;
$data = new stdClass;
//var_dump($data

 while ($row = mysqli_fetch_array($qry_res,MYSQLI_ASSOC)) {
     if ($row['Requests']>100) {
         $data->data[$rowNumber] = new stdClass();
        //var_dump($row);
        $data->data[$rowNumber]->sCampaignID = $row['sCampaignID'];
        $data->data[$rowNumber]->Requests = $row['Requests'];
        $data->data[$rowNumber]->AdImp = $row['AdImp'];
        $data->data[$rowNumber]->fill = $row['fill'];
        $data->data[$rowNumber]->cost = $row['cost'];
        $data->data[$rowNumber]->revenue = $row['revenue'];
        $data->data[$rowNumber]->profit = $row['profit'];
        $data->data[$rowNumber]->prmargin = $row['prmargin'];
    }

    $rowNumber++;
} 
 
$jsn = json_encode($data);
print_r($jsn);
?>
