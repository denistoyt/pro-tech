<?php
    require_once("connect.php");
    $getItems = "SELECT * FROM `cart` WHERE `user_id` = ?";
    $getItems_d = $pdo->prepare($getItems);
    $getItems_d->execute(array("$_GET[user_id]"));
    $getItems_res = $getItems_d->fetchAll();
    $count = count($getItems_res);
    echo $count;
?>