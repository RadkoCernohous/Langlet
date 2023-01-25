<?php
$serverIP="127.0.0.1";
$username="root";
$dtbsPassword="";
$dtbsName="bettertest";
session_start();


$data = $_POST["schovanyKontejner6"];


mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$conn = mysqli_connect($serverIP, $username, $dtbsPassword, $dtbsName);
$conn->set_charset("utf8mb4");

if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

$sql = 'UPDATE users SET userdata = ? WHERE email= ?';   
$email =$_SESSION["email2"];
    
    
$statement = $conn->prepare($sql);
$statement->bind_param("ss",$data,$email);
if($statement->execute()){
  //echo "data succesfully saved";
}
mysqli_close($conn);
$pswHashed=password_hash($_SESSION["heslo2"],PASSWORD_DEFAULT);
$url = "http://127.0.0.1/cernohous/langlet/index1.php?reg=1&email=".$_SESSION["email2"]."&psw=".$pswHashed;
session_destroy();
header("Location: ".$url);
   
?>