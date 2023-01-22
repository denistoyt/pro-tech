<?
    session_start();
    require_once("connect.php");

    $insert_req = "INSERT INTO `cart` SET `user_id` = ?, `item_id` = ?";
    $insert_data = $pdo->prepare($insert_req);
    $insert_data->execute(array("$_POST[user]", "$_POST[item]"));
?>