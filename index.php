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
    <main class="main" uk-filter="target: .js-filter; animation: delayed-fade">
        <div class="main__left__container">
            <ul uk-accordion="multiple: true" class="uk-width-100">
                <li class="uk-open accordion-item">
                    <a href="#" class="uk-accordion-title accordion-item-title">Устройства</a>
                    <div class="uk-accordion-content">
                        <ul class="main__left__type-filter uk-padding-remove">
                            <li class="uk-active" uk-filter-control><a href="#" class="type-filter-all">Все</a></li>
                            <li uk-filter-control="[data-type='laptop']"><a href="#" class="type-filter-laptop">Ноутбуки</a></li>
                            <li uk-filter-control="[data-type='phone']"><a href="#" class="type-filter-phone">Смартфоны</a></li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
        <ul class="main__right__container">
            <!-- top filter -->
            <li class="main__right__filter">
                <ul class="uk-breadcrumb">
                    <li><a href="#">Главная</a></li>
                    <li><a href="#" class="breadcrumb-current-section"></a></li>
                </ul>
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