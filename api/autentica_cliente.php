<?php
# carrega as configuraçoes iniciais
require_once "config.php";

# carrega classe de cliente
require_once "class/cliente.php";

# instancia o objeto cliente
$_cliente = new cliente();

$_REQUEST = array_utf8_decode( $_REQUEST );

# define o retorno
$_RESPONSE = $_cliente->autenticar(@ $_REQUEST['login'], @ $_REQUEST['password']);

$_RESPONSE = array_utf8_encode( $_RESPONSE );

# retorno no formato json
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
print json_encode( $_RESPONSE );
?>