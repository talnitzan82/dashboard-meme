<html style="direction:rtl;background:cadetblue">

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<style type="text/css">
.auto-style2 {
	text-align: right;
	direction: rtl;
}
.auto-style3 {
	text-align: center;
	direction: rtl;
}
.auto-style4 {
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
</style>
</head>

<body>


<?php
include('../params/params.php');
include('../connect/connect-db.php');

// Create table
$sql = "CREATE TABLE units
(
PID INT NOT NULL AUTO_INCREMENT,
PRIMARY KEY(PID),
name TEXT
)";

// Execute query
if (mysqli_query($con,$sql)) {
  echo "Table persons created successfully";
} else {
  echo "Error creating table: " . mysqli_error($con);
}
?>


<?php


mysqli_close($con);

?>
</body>
</html>