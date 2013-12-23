<?php
return array(
	'basePath'=>dirname(__FILE__).DIRECTORY_SEPARATOR.'..',
	'name'=>'Gaming App',

	// preloading 'log' component
	'preload'=>array('log'),

	// autoloading model and component classes
	'import'=>array(
		'application.models.*',
		'application.components.*',
	),







	// application components
	'components'=>array(
		'user'=>array(
			// enable cookie-based authentication
			'allowAutoLogin'=>true,
		),

	
	'urlManager'=>array(
    'urlFormat'=>'path',
    'rules'=>array(
        array('<model>/delete', 'pattern'=>'<model:\w+>/<id:\d+>', 'verb'=>'DELETE'),
        array('<model>/update', 'pattern'=>'<model:\w+>/<id:\d+>', 'verb'=>'PUT'),
        array('<model>/list', 'pattern'=>'<model:\w+>', 'verb'=>'GET'),
        array('<model>/get', 'pattern'=>'<model:\w+>/<id:\d+>', 'verb'=>'GET'),
        array('<model>/create', 'pattern'=>'<model:\w+>', 'verb'=>'POST'),
    ),
),


		
		'db'=>array(
			'connectionString' => 'mysql:host=localhost;dbname=resstapi',
			'emulatePrepare' => true,
			'username' => 'root',
			'password' => '',
			'charset' => 'utf8',
			'tablePrefix' => 'xx_'
		),
		
		'errorHandler'=>array(
			// use 'site/error' action to display errors
			'errorAction'=>'site/error',
		),
		'log'=>array(
			'class'=>'CLogRouter',
			'routes'=>array(
				array(
					'class'=>'CFileLogRoute',
					'levels'=>'error, warning',
				),
				// uncomment the following to show log messages on web pages
				/*
				array(
					'class'=>'CWebLogRoute',
				),
				*/
			),
		),
	),

	// application-level parameters that can be accessed
	// using Yii::app()->params['paramName']
	'params'=>array(
		// this is used in contact page
		'adminEmail'=>'webmaster@gameing.com',
	),
);