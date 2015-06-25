<?php
/* 
 CONNECT-DB.PHP
 Allows PHP to connect to your database
*/

 // Database Variables (edit with your own server information)
 //$con=mysqli_connect("localhost","root","","soroka");
 $con=mysqli_connect("23.253.135.47","eran","meme1234","data");
//$con=mysqli_connect("localhost",$USERNAME,$PASSWORD,$DATABASE);
//$con=mysqli_connect("localhost","talnitza_tal2","Talnitz1","talnitza_lasso_paycall");
 //mysqli_set_charset('utf8' , $con );
 /* change character set to utf8 */

if (mysqli_connect_errno())
{
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

?>