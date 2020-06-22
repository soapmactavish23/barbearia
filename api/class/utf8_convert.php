<?php

/**
 * Codifica e descodifica caracteres especiais dentro de um array.
 *
 * @param  array	$array
 *
 * @return string	$new_array
 */

# decodifica string utf_8 dentro de array
function array_utf8_decode ( $array ) {
	if ( ! is_array($array) ) return $array;

	$new_array = [];
	foreach ( $array as $k=>$v ) {
		if ( is_array($v) ) $new_array[$k] = array_utf8_decode($v);
		else $new_array[$k] = utf8_decode($v);
	}
	return $new_array;
}

# codifica string utf_8 dentro de array
function array_utf8_encode ( $array ) {
	if ( ! is_array($array) ) return $array;

	$new_array = [];
	foreach ( $array as $k=>$v ) {
		if ( is_array($v) ) $new_array[$k] = array_utf8_encode($v);
		else $new_array[$k] = utf8_encode($v);
	}
	return $new_array;
}

?>