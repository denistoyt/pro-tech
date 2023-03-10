<?
    session_start();
    require_once('connect.php');
    $between = "SELECT * FROM `items` WHERE `item_cost` BETWEEN ? AND ?";
    $between_d = $pdo->prepare($between);
    $between_d->execute(array("$_GET[startCost]", "$_GET[endCost]"));
    $between_exec = $between_d->fetchAll();
    foreach($between_exec as $arr) {
        $type = "";
        if($_SESSION['autorized'] == true) {
            if($arr['item_category'] == "laptop") {
                $type = "Ноутбук";
            }
            else if($arr['item_category'] == "phone") {
                $type = "Смартфон";
            };
            echo '
            <li class="main__item" data-type="'.$arr["item_category"].'" data-itemid ="'.$arr['id_item'].'" data-cost="'.$arr['item_cost'].'">
                <a href="#item_'.$arr['id_item'].'_info-modal" class="main__item-card-link" uk-toggle>
                    <img src="'.$arr["item_img"].'" alt="'.$arr["item_img_alt"].'">
                    '.$arr["item_name"].'
                </a>
                <div class="main__item__info">
                    <span class="item-cost">'.$arr["item_cost"].' ₽</span>
                    <button class="cart-btn" title="Добавить в корзину"><img src="icn/cart.png" alt="cart" data-addcart="add"></button>
                </div>
                <!-- modal -->
                <div id="item_'.$arr['id_item'].'_info-modal" class="uk-flex-top main__catalog-item__modal-container" uk-modal>
                    <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical catalog-item_modal_open">
                        <button class="uk-modal-close-default" type="button" uk-close></button>
                        <div class="catalog-item__modal-title-wrapper">
                            <p>'.$arr["item_name"].'</p>
                        </div>
                        <div class="catalog-item__modal-info-wrapper">
                            <div class="catalog-item__modal_info-image">
                                <img src="'.$arr["item_img"].'" alt="'.$arr["item_img_alt"].'">
                            </div>
                            <div>
                                <ul class="catalog-item__modal_info-content">
                                    <li><b>Описание:</b> '.$arr['item_descr'].'</li>
                                    <li><b>Цена</b>: '.$arr['item_cost'].' ₽</li>
                                    <li><b>Категория:</b> '.$type.'</li>
                                    <li><b>Артикул:</b> '.$arr['item_art_numb'].'</li>
                                </ul>
                            </div>
                        </div>
                </div>
            </li>';
        }
        else {
            if($arr['item_category'] == "laptop") {
                $type = "Ноутбук";
            }
            else if($arr['item_category'] == "phone") {
                $type = "Смартфон";
            };
            echo '
            <li class="main__item" data-type="'.$arr["item_category"].'" data-itemid ="'.$arr['id_item'].'" data-cost="'.$arr['item_cost'].'">
                <a href="#item_'.$arr['id_item'].'_info-modal" class="main__item-card-link" uk-toggle>
                    <img src="'.$arr["item_img"].'" alt="'.$arr["item_img_alt"].'">
                    '.$arr["item_name"].'
                </a>
                <div class="main__item__info">
                    <span class="item-cost">'.$arr["item_cost"].' ₽</span>
                    <button class="cart-btn" title="Добавить в корзину" disabled><img src="icn/cart_disabled.png" alt="cart" data-addcart="not_add"></button>
                </div>
                <!-- modal -->
                <div id="item_'.$arr['id_item'].'_info-modal" class="uk-flex-top main__catalog-item__modal-container" uk-modal>
                    <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical catalog-item_modal_open">
                        <button class="uk-modal-close-default" type="button" uk-close></button>
                        <div class="catalog-item__modal-title-wrapper">
                            <p>'.$arr["item_name"].'</p>
                        </div>
                        <div class="catalog-item__modal-info-wrapper">
                            <div class="catalog-item__modal_info-image">
                                <img src="'.$arr["item_img"].'" alt="'.$arr["item_img_alt"].'">
                            </div>
                            <div>
                                <ul class="catalog-item__modal_info-content">
                                    <li><b>Описание:</b> '.$arr['item_descr'].'</li>
                                    <li><b>Цена</b>: '.$arr['item_cost'].' ₽</li>
                                    <li><b>Категория:</b> '.$type.'</li>
                                    <li><b>Артикул:</b> '.$arr['item_art_numb'].'</li>
                                </ul>
                            </div>
                        </div>
                </div>
            </li>';
        }
    }
?>