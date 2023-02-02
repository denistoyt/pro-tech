<? session_start();?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="img/logo.png" type="image/x-icon">
    <!-- ui kit -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.15.21/dist/css/uikit.min.css" />
    <script src="https://cdn.jsdelivr.net/npm/uikit@3.15.21/dist/js/uikit.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/uikit@3.15.21/dist/js/uikit-icons.min.js"></script>
    <!-- fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
    <!-- Jquery -->
    <script src="https://code.jquery.com/jquery-3.6.3.min.js" integrity="sha256-pvPw+upLPUjgMXY0G+8O0xUf+/Im1MZjXxxgOcBQBXU=" crossorigin="anonymous"></script>
    <!-- css -->
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/media.css">
    <title>Интернет магазин</title>
</head>
<body>
    <!-- HEADER -->
    <? include("pages/header.php"); ?>
    <!-- HEADER -->
    <!-- spinner -->
    <div class="cart_order_confirm-fade" hidden>
        <div class="confirm-fade-spinner"></div>
        <div class="confirm-fade-bg"></div>
    </div>
    <!-- spinner -->
    <main class="main" uk-filter="target: .js-filter; animation: delayed-fade">
        <div class="main__left__container">
            <ul uk-accordion="multiple: true" class="uk-width-100">
                <!-- sort by Item Type -->
                <li class="uk-close accordion-item">
                    <a href="#" class="uk-accordion-title accordion-item-title">Устройства</a>
                    <div class="uk-accordion-content">
                        <ul class="main__left__type-filter uk-padding-remove">
                            <li class="uk-active" uk-filter-control><a href="#" class="type-filter-all">Все</a></li>
                            <li uk-filter-control="[data-type='laptop']"><a href="#" class="type-filter-laptop">Ноутбуки</a></li>
                            <li uk-filter-control="[data-type='phone']"><a href="#" class="type-filter-phone">Смартфоны</a></li>
                        </ul>
                    </div>
                </li>
                <!-- Sort by Item between cost -->
                <li class="uk-close accordion-item main__left__cost-between-sort">
                    <a href="#" class="uk-accordion-title accordion-item-title">Сортировка по цене</a>
                    <div class="uk-accordion-content">
                        <ul class="main__left__type-filter cost-between-filter uk-padding-remove">
                            <li>
                                <label for="costStart">От</label>
                                <input type="number" id="costStart" class="cost-between-search-start cost-between-search-inp" placeholder="1 500">
                            </li>
                            <li>
                                <label for="costEnd">До</label>
                                <input type="number" id="costEnd" class="cost-between-search-end cost-between-search-inp" placeholder="15 000">
                            </li>
                            <li>
                                <button class="cost-between-search-btn">Поиск</button>
                            </li>
                        </ul>
                    </div>
                </li>
                <!-- search devices from selected vendor -->
                <li class="uk-close accordion-item main__left__device_vendor-filter-container">
                    <a href="#" class="uk-accordion-title accordion-item-title">Поиск по производителю</a>
                    <div class="uk-accordion-content">
                        <ul class="device_vendor-filter__items uk-padding-remove uk-margin-remove">     
                            <li class="device_vendor-filter__item" data-vendor="">
                                <input type="radio" name="radio" id="radio-All">
                                <label for="radio-All" class="vendor-select">Все</label>
                                <?require_once("php/get_vendors.php");?>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
        <ul class="main__right__container" uk-filter="target: .js-filter">
            <!-- top filter -->
            <li class="main__right__filter">
                <ul class="uk-breadcrumb">
                    <li><a href="#">Главная</a></li>
                    <li><a href="#" class="breadcrumb-current-section"></a></li>
                </ul>
            </li>
            <li class="main__right__sorting-container">
                <label for="costSortingBtn">Сортировка по:</label>
                <button id='costSortingBtn'class="sorting__type-change-btn" data-sorttype='asc'>
                    Цена
                    <img src="icn/up.png" alt="sort-type" class="sorting-btn__icon">
                </button>
            </li>
            <!-- content -->
            <li class="main__right__content">
                <ul class="js-filter main__right__container catalog-container">
                    <? include("php/requests.php");?>
                </ul>
            </li>
        </ul>
    </main>
    <!-- FOOTER -->
    <? include("pages/footer.php"); ?>
    <!-- js -->
    <script src="js/script.js"></script>
</body>
</html>