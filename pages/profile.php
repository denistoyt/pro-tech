<?session_start();?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="../img/logo.png" type="image/x-icon">
    <!-- ui kit -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.15.21/dist/css/uikit.min.css" />
    <script src="https://cdn.jsdelivr.net/npm/uikit@3.15.21/dist/js/uikit.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/uikit@3.15.21/dist/js/uikit-icons.min.js"></script>
    <!-- fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
    <!-- css -->
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/media.css">
    <title>Профиль</title>
</head>
<body>
    <!-- header -->
    <?include("header.php");?>
    <main class="main__profile__container">
        <ul class="profile__left__side-controls" uk-switcher>
            <li><a href="#">Мой профиль</a></li>
            <li><a href="orders.html">Заказы<span class="uk-badge user__orders__count"><?require_once("../php/user_orders.php"); getUserOrdersCount($_SESSION['userId']);?></span></a></li>
        </ul>
        <!--  -->
        <ul class="uk-switcher profile__right__side">
            <li uk-swither-item="0">
                <div class="profile__right__side">
                    <h1 class="profile__section-title">Профиль</h1>
                    <div class="profile__info-wrapper">
                        <div class="profile__info__edit">
                            <button class="profile__edit-btn">Редактировать</button>
                        </div>
                        <div class="profile__info__content">
                            <div class="profile__info__main__data">
                                <div class="profile__user__photo-container">
                                    <input type="file" id="userPhoto" class="profile__user-photo-download" data-imageLoad="false" disabled>
                                    <label for="userPhoto">
                                        <span>
                                            <? if($_SESSION['userImg'] != "") {?>
                                                <img src="<?echo $_SESSION['userImg'];?>" alt="user_<?echo $_SESSION['userId'];?>_photo" class="profile__user-photo">
                                            <?} else {?>
                                                <img src="../img/default-user-photo.jpg" alt="user_<?echo $_SESSION['userId'];?>_photo" class="profile__user-photo">
                                            <?}?>
                                        </span>
                                        <span>
                                            Выбрать файл
                                        </span>
                                        <span class="user__photo__hover-fade"></span>
                                    </label>
                                </div>
                                <p class="profile__user-name"><?echo $_SESSION['userFName']." ".$_SESSION['userSName'];?></p>
                            </div>
                            <div class="profile__info__auth__data">
                                <p class="user__nickname">Никнейм: <span><b><?echo $_SESSION['userLogin'];?></b></span></p>
                                <p class="user__email">Email: <span><b><?echo $_SESSION['userEmail'];?></b></span></p>
                                <p class="user__number">Телефон: <span><b><?echo $_SESSION['userNumber'];?></b></span></p>
                                <p class="user__city">Город: <span><b><?echo $_SESSION['userCity'];?></b></span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            <li uk-switcher-item="1">
                <div class="profile__right__side">
                    <h1 class="profile__section-title">Заказы</h1>
                    <?require_once("../php/user_orders.php"); getUserOrders($_SESSION['userId']);?>
                </div>
            </li>
        </ul>
        
        
    </main>
</body>
</html>