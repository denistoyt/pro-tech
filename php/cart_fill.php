<?
    // Fill Cart Items
    require_once("connect.php");
    $cart_data = "SELECT items.item_name, items.item_img, items.item_img_alt, items.item_cost, cart.id_cart_item FROM `cart` INNER JOIN `items` ON cart.item_id = items.id_item WHERE cart.user_id = ?";
    $cart_data_d = $pdo->prepare($cart_data);
    $cart_data_d->execute(array("$_GET[user]"));
    $cart_data_ex = $cart_data_d->fetchAll();
    foreach($cart_data_ex as $cart) {
        echo '
            <div class="cart__item" data-cartitemid="'.$cart['id_cart_item'].'">
                <div class="cart__item__info">
                    <img src="'.$cart['item_img'].'" alt="'.$cart['item_img_alt'].'" class="cart__item-img">
                    <div class="cart__item-chars">
                        <p class="uk-margin-remove cart__item-name">'.$cart['item_name'].'</p>
                        <div class="cart__item-options">
                            <button class="cart__item__delete-btn" data-action="delete">Удалить</button>
                            <div class="cart__item__options">
                                <button class="cart__item__count-minus cart__item__count-btn">
                                    <img src="icn/minus.png" alt="minus-item" data-apperand="-">
                                </button>
                                <input type="text" value="1" class="cart__item__count">
                                <button class="cart__item__count-plus cart__item__count-btn">
                                    <img src="icn/plus.png" alt="plus-item" data-apperand="+">
                                </button>
                            </div>
                        </div>
                        <span class="cart__item-cost">'.$cart['item_cost'].' ₽</span>
                    </div>
                </div>
            </div>
        ';
    }
?>