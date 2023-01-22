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
    <title>Регистрация</title>
</head>
<body>
    <!-- HEADER -->
    <?include("header.php");?>
    <main class="autorization__main">
        <section class="autorization__container">
            <h1 class="autorization__title">Регистрация</h1>
            <form action="../php/register.php" method="get">
                <div class="autorization__inputs-wrapper">
                    <div class="registr__inputs-name autorization__inputs">
                        <label for="RnameInp">Ваше Никнейм *</label>
                        <input type="text" name="userLogin" id="RnameInp" class="registr__name-inp autorization-inp" required>
                    </div>
                    <div class="registr__inputs-email autorization__inputs">
                        <label for="RemailInp">Email *</label>
                        <input type="email" name="userEmail" id="RemailInp" class="registr__email-inp autorization-inp" required>
                    </div>
                    <div class="registr__inputs-tel autorization__inputs">
                        <label for="telInp">Телефон *</label>
                        <input type="tel" name="userTel" id="telInp" class="registr__tel-inp autorization-inp" required>
                    </div>
                    <div class="registr__inputs-pass autorization__inputs">
                        <label for="passInp">Придумайте пароль</label>
                        <input type="password" name="userPassw" id="passInp" class="registr__pass-inp autorization-inp" required>
                    </div>
                </div>
                <input type="submit" name="register" class="autorization__enter-btn" value="Зарегистрироваться">
            </form>
        </section>
    </main>

    <!-- js -->
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js" type="text/javascript"></script>
    <script src="https://cdn.jsdelivr.net/npm/jquery.maskedinput@1.4.1/src/jquery.maskedinput.min.js" type="text/javascript"></script>
    <script>
        $("#telInp").mask("+7 (999) 999 – 99 – 99");
    </script>
</body>
</html>