<?
    require_once("connect.php");
    $delete = "DELETE FROM `cart` WHERE `id_cart_item` = ?";
    $delete_d = $pdo->prepare($delete);
    $delete_d->execute(array("$_POST[itemId]"));
?>