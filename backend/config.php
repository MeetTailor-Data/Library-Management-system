<?php

return [

    'driver'   => 'mysql',

    'mysql'    => [
        'host'     => getenv('DB_HOST') ?: '127.0.0.1',
        'port'     => getenv('DB_PORT') ?: '3306',
        'database' => getenv('DB_NAME') ?: 'library_db',
        'username' => getenv('DB_USER') ?: 'root',
        'password' => getenv('DB_PASS') !== false ? getenv('DB_PASS') : '',
        'charset'  => 'utf8mb4',
    ],

    'sqlite'   => [
        'path' => __DIR__ . '/library.sqlite',
    ]
];
