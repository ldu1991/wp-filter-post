<?php

function filter_function(){
	$nonce = $_POST['nonce'];

	// проверяем nonce код, если проверка не пройдена прерываем обработку
	if( ! wp_verify_nonce( $nonce, 'wpcfajax-noncecode' ) )
		die( 'Stop!');
    parse_str($_POST['query'], $params);
    //print_r($params);
    print_r($_POST['query']);

   if(empty($params)) echo 'ytn';

	die();
}


add_action('wp_ajax_myfilter', 'filter_function');
add_action('wp_ajax_nopriv_myfilter', 'filter_function');

?>