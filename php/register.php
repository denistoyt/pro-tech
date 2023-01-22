<?
    session_start();
    require_once("connect.php");
    if(isset($_GET["register"])) {
        if($_GET["userLogin"] != "" and $_GET["userEmail"] != "" and $_GET["userTel"] != "" and $_GET["userPassw"] != "") {
            $login = $_GET["userLogin"];
            $email = $_GET["userEmail"];
            $tel = $_GET["userTel"];
            $pass = md5($_GET["userPassw"]);
            $img = "../img/default-user-photo.jpg";
            
            $create_user = "INSERT INTO `users` SET `prof_img` = ?, `user_login` = ?, `user_pass` = ?, `email` = ?, `t_number` = ?";
            $create_user_execute = $pdo->prepare($create_user);
            $create_user_execute->execute(array("$img", "$login", "$pass", "$email", "$tel"));
            echo '<script type="text/javascript">location.href="../index.php"</script>';
        }
    }
?>