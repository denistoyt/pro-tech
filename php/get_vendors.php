<?
    session_start();
    require_once("connect.php");
    $all_data = "SELECT `item_vendor` FROM `items` GROUP BY `item_vendor`";
    $add_data_d = $pdo->query($all_data);
    $all_data_l = $add_data_d->fetchAll();
    foreach($all_data_l as $vendor) {
        echo '
            <input type="radio" name="radio" id="radio-'.$vendor['item_vendor'].'">
            <label for="radio-'.$vendor['item_vendor'].'" class="vendor-select">'.$vendor['item_vendor'].'</label>
        ';
    }
?>