<?php

if (!function_exists('array_column')) {
    require_once(plugin_dir_path(__FILE__).'/vendor/array_column.php');
}

spl_autoload_register(function ($name) {
	
    $class_name = $name.'.class.php';
	$path = plugin_dir_path( __FILE__ ).$class_name;
	
    if(file_exists($path)){
		require_once($class_name);
	}
});