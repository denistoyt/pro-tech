<?
    function getUserOrdersCount($userId) {
        require_once("connect.php");
        // get user order counts
        $ordCount = "SELECT * FROM `orders` WHERE `user_id` = ?";
        $ordCount_d = $pdo->prepare($ordCount);
        $ordCount_d->execute(array("$userId"));
        $ordCount_res = $ordCount_d->fetchAll();
        $order_count = count($ordCount_res);
        echo $order_count;
    }
    function getUserOrders($userId) {
        $host = 'localhost';
        $db = 'shop';
        $user = 'root';
        $pass = '';
        $charset = 'utf8';
        $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
        $opt = array(
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,);
        $pdo = new PDO($dsn, $user, $pass, $opt);
        // 
        $orders_2 = "SELECT items.id_item, items.item_name, items.item_img, items.item_img_alt, items.item_cost, orders.item_id, orders.item_count, orders.user_id, orders.order_number FROM `orders` INNER JOIN `items` ON orders.item_id = items.id_item WHERE orders.order_number = ?";
        $orders = "SELECT `order_number` FROM `orders` WHERE `user_id` = ? GROUP BY `order_number`";
        $orders_d = $pdo->prepare($orders);
        $orders_d->execute(array("$userId"));
        $orders_res = $orders_d->fetchAll();
        foreach($orders_res as $s) {
            $orderN = $s['order_number'];
        }
        // 
        $orders_d2 = $pdo->prepare($orders_2);
        $orders_d2->execute(array("$orderN"));
        $orders_res2 = $orders_d2->fetchAll();
        // 
        foreach($orders_res as $orders) {
            echo '
            <div class="profile__orders__section-container">
                <ul uk-accordion="multiple: true">
                    <li class="uk-close accordion-item">
                        <a href="#" class="uk-accordion-title profile__orders-number">Заказ № '.$orders['order_number'].'</a>
                        <div class="uk-accordion-content profile__orders__content">';
                        foreach($orders_res2 as $orders2) {
                            echo '
                                <div class="profile__orders__content-item">
                                    <div class="profile__orders__item-img">
                                        <img src="../'.$orders2['item_img'].'" alt="'.$orders2['item_img_alt'].'">
                                    </div>
                                    <div class="profile__orders__item-info">
                                        <span class="profile__orders__item-name"><b>'.$orders2['item_name'].'</b></span>
                                        <span class="profile__orders__item-cost">Цена: <b>'.$orders2['item_cost'].'</b></span>
                                        <span class="profile__orders__item-count">Количество: <b>'.$orders2['item_count'].'</b></span>
                                    </div>
                                </div>
                            ';
                    } 
                    echo'</div></li>
                    </ul></div>
            ';
        }
    }
?>