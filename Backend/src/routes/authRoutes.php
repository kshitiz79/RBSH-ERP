<?php

use Kshitiz\Backend\Controllers\AuthController;

$app->post('/signup', [AuthController::class, 'signup']);
$app->post('/login', [AuthController::class, 'login']);
