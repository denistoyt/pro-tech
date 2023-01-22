<header>
    <div class="header__left__container">
        <!-- If current page is profile -->
        <? if($_SERVER['REQUEST_URI'] == "/pages/profile.php") {?>
            <div class="header__company__container">
                <a href="../index.php"><img src="../img/logo.png" alt="logo">Интернет-магазин</a>
            </div>
        <!-- If current page is not profile -->
        <?} else if($_SERVER['REQUEST_URI'] == "/pages/autorization.php" || $_SERVER['REQUEST_URI'] == "/pages/registration.php"){?>
            <div class="header__company__container">
                <a href="../index.php"><img src="../img/logo.png" alt="logo">Интернет-магазин</a>
            </div>
        <?} else {?>
            <div class="header__company__container">
                <a href="#"><img src="../img/logo.png" alt="logo">Интернет-магазин</a>
            </div>
        <?} if($_SERVER['REQUEST_URI'] == "/index.php"){?>
            <div class="header__controls__container">
                <label for="searchField">Поиск по</label>
                <input type="text" class="header__controls_search" id="searchField">
                <button>модели ноутбука</button>
                <button>модели телефона</button>
            </div>
        <?} else {?>
            <div class="header__controls__container"></div>
        <?}?>
    </div>
    <!-- If current page is profile -->
    <? if($_SERVER['REQUEST_URI'] == "/pages/profile.php") {?>
        <div class="header__right__container">
            <? if($_SESSION['autorized'] == true) {?>
                <div class="header__right-logo">
                    
                </div>
            <?} else {?>
                <div class="header__right-logo">
                    <a href="#" uk-toggle="target: #cartModal" data-cart="not_autorized"><img src="../icn/cart.png" alt="cart" title="Корзина"></a>
                    <span class="cart__summ" hidden></span>
                    <!-- cart modal -->
                    <div id="cartModal" uk-offcanvas="flip: true; overlay: true;" class="cart__modal-container">
                        <div class="uk-offcanvas-bar cart__modal">
                            <button class="uk-offcanvas-close" type="button" uk-close></button>
                            <h3 class="cart__title">Корзина</h3>
                            <h2 class="cart__null-message">Корзина пуста! Для добавления товаров, нужно авторизоваться!</h2>
                            <div class="cart__items-container">
                                
                            </div>
                        </div>
                    </div>
                </div>
            <?}?>
            <div class="header__right-controls">
                <? if($_SESSION['autorized'] == true) {?>
                    <a href="../php/logout.php">Выход</a>
                <?} else {?>
                    <a href="pages/autorization.php">Авторизация</a>
                    <a href="pages/registration.php">Регистрация</a>
                <?}?>
            </div>
        </div>
    <?} else if($_SERVER['REQUEST_URI'] == "/pages/autorization.php" || $_SERVER['REQUEST_URI'] == "/pages/registration.php"){?>
    <!-- If current page is not profile -->
        <div class="header__right__container">
            <? if($_SESSION['autorized'] == true) {}else{}?>
        </div>
    <?} else {?>
        <div class="header__right__container">
            <? if($_SESSION['autorized'] == true) {?>
                <div class="header__right-logo">
                    <a href="#" uk-toggle="target: #cartModal" data-cart="autorized"><img src="../icn/cart.png" alt="cart" title="Корзина"></a>
                    <span class="cart__summ" hidden></span>
                    <!-- cart modal -->
                    <div id="cartModal" uk-offcanvas="flip: true; overlay: true;" class="cart__modal-container">
                        <div class="uk-offcanvas-bar cart__modal">
                            <button class="uk-offcanvas-close" type="button" uk-close></button>
                            <h3 class="cart__title">Корзина</h3>
                            <div class="cart__items-container">
                                <?include("php/cart_fill.php");//cartFill($_SESSION['userId']);?>
                            </div> 
                            <div class="cart__total__summ">
                                <div>
                                    Итого:<span class="cart__summ-field"></span>
                                </div>
                                <button class="cart__to_order-btn">Перейти к оформлению</button>
                            </div>  
                        </div>
                    </div>
                </div>
            <?} else {?>
                <div class="header__right-logo">
                    <a href="#" uk-toggle="target: #cartModal" data-cart="not_autorized"><img src="../icn/cart.png" alt="cart" title="Корзина"></a>
                    <span class="cart__summ" hidden></span>
                    <!-- cart modal -->
                    <div id="cartModal" uk-offcanvas="flip: true; overlay: true;" class="cart__modal-container">
                        <div class="uk-offcanvas-bar cart__modal">
                            <button class="uk-offcanvas-close" type="button" uk-close></button>
                            <h3 class="cart__title">Корзина</h3>
                            <h2 class="cart__null-message">Корзина пуста! Для добавления товаров, нужно авторизоваться!</h2>
                            <div class="cart__items-container">
                                
                            </div>
                        </div>
                    </div>
                </div>
            <?}?>
            <div class="header__right-controls">
                <? if($_SESSION['autorized'] == true) {?>
                    <a href="pages/profile.php" class="user_cart" data-userid="<?echo $_SESSION['userId'];?>">Профиль</a>
                    <a href="../php/logout.php">Выход</a>
                <?} else {?>
                    <a href="pages/autorization.php">Авторизация</a>
                    <a href="pages/registration.php">Регистрация</a>
                <?}?>
            </div>
        </div>
    <?}?>
</header>