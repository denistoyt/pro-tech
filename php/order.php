<?
    session_start();
    require_once("connect.php");
    // check if orders have null number
    // check if table is clear
    $userId = $_POST['user_id'];
    $itemId = $_POST['item_id'];
    $itemCount = $_POST['item_count'];
    $itemsCount = $_POST['items_count'];
    $maxId = $_POST['max_id'];
    //$maxId = "1";
    $add_order = "INSERT INTO `orders` SET `order_number` = ?, `user_id` = ?, `item_id` = ?, `item_count` = ?";
    $add_order_d = $pdo->prepare($add_order);
    $add_order_d->execute(array("$maxId", "$userId", "$itemId", "$itemCount"));
?>