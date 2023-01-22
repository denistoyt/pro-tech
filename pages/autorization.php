<?
    session_start();
    require_once("../php/login.php");
?>
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
    <title>Авторизация</title>
</head>
<body class="autorization__body" style="overflow-x: hidden;">
    <!-- HEADER -->
    <?include("header.php");?>
    <main class="autorization__main">
        <section class="autorization__container">
            <h1 class="autorization__title">Вход</h1>
            <form action="" method="get" name="loginForm" class="autorize-form">
                <div class="autorization__inputs-wrapper">
                    <div class="autorization__inputs-login autorization__inputs">
                        <label for="loginInp">Логин</label>
                        <input type="text" id="loginInp" class="autorization__login-inp autorization-inp" name="login">
                    </div>
                    <div class="autorization__inputs-passw autorization__inputs">
                        <label for="passwInp">Пароль</label>
                        <input type="password" id="passwInp" class="autorization__passw-inp autorization-inp" name="password">
                    </div>
                </div>
                <input type="submit" class="autorization__enter-btn" name="enter" value="Войти">
            </form>
        </section>
        <div class="registration__redirect">
            <span>Еще нет аккаунта? <a href="registration.php">Зарегистрируйтесь</a></span>
        </div>
    </main>

    <!-- js -->
    <!-- <script src="../js/wrong_message.js"></script> -->
</body>
</html>