<?
    session_start();
    require_once("connect.php");

    //if(isset($_GET['enter'])) {
        if($_GET['login'] != "" and $_GET['password'] != "") {
            $login = $_GET['login'];
            $password = md5($_GET['password']);
            $request = "SELECT * FROM `users` WHERE `user_login` = ? and `user_pass` = ?";
            $request_execute = $pdo->prepare($request);
            $request_execute->execute(array("$login", "$password"));
            $request_result = $request_execute->fetchAll();
            foreach($request_result as $user) {
                $userFName = $user['user_fname'];
                $userSName = $user['user_sname'];
                $userLogin = $user['user_login'];
                $userId = $user['id_user'];
                $userEmail = $user['email'];
                $userNumber = $user['t_number'];
                $userCity = $user['city'];
                $userImg = $user['prof_img'];
            }
            $count = count($request_result);
            if($count > 0) {
                $_SESSION['autorized'] = true;
                $_SESSION['userFName'] = $userFName;
                $_SESSION['userSName'] = $userSName;
                $_SESSION['userLogin'] = $userLogin;
                $_SESSION['userId'] = $userId;
                $_SESSION['userEmail'] = $userEmail;
                $_SESSION['userNumber'] = $userNumber;
                $_SESSION['userCity'] = $userCity;
                $_SESSION['userImg'] = $userImg;
                echo '<script type="text/javascript">location.href="../index.php"</script>';
            }
            else {
                //echo '<script src="../js/wrong_message.js">checkEnterApply('.$access.');</script>';
            }
        }
?>