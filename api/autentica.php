<?php
# carrega as configuraçoes iniciais
require_once "config.php";

# carrega classe de usuario
require_once "class/usuario.php";

# instancia o objeto usuario
$_usuario = new usuario();

$_REQUEST = array_utf8_decode( $_REQUEST );

# define o retorno
$_RESPONSE = $_usuario->autenticar(@ $_REQUEST['login'], @ $_REQUEST['password']);

$_RESPONSE = array_utf8_encode( $_RESPONSE );

# retorno no formato json
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
print json_encode( $_RESPONSE );
?>