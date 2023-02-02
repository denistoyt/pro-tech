<?
function qwq() {
    session_start();
    require_once("connect.php");
    $id_chk = $pdo->query('SELECT `order_number` FROM `orders`');
    $id_chk_res = $id_chk->fetchAll();
    $maxOrderNumber;
    foreach($id_chk_res as $arr) {
        $maxOrderNumber = array_shift($arr);
    }
    $returnArray = [count($id_chk_res), " ", $maxOrderNumber];
    for($i = 0; $i < count($returnArray); $i++) {
        echo $returnArray[$i];
    }
}
echo qwq();
?>