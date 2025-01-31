<?php

use Kshitiz\Backend\Controllers\UserController;

$app->get('/users', [UserController::class, 'getAllUsers']);
$app->post('/users', [UserController::class, 'createUser']);
