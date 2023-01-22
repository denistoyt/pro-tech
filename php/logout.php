<?
    session_start();
    session_unset();
    session_destroy();
    $_SESSION['autorizied'] = false;
    echo '<script type="text/javascript">location.href="../index.php"</script>';
?>