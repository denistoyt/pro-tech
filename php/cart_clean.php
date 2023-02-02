<?
    session_start();
    require_once("connect.php");
    $clear = "DELETE FROM `cart` WHERE `user_id` = ?";
    $clear_d = $pdo->prepare($clear);
    $clear_d->execute(array("$_GET[user_id]"));
?>