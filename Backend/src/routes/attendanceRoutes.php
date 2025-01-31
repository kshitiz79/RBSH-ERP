<?php

use Kshitiz\Backend\Controllers\AttendanceController;

$app->post('/attendance/punch-in', [AttendanceController::class, 'punchIn']);
$app->post('/attendance/punch-out', [AttendanceController::class, 'punchOut']);
$app->get('/attendance/logs', [AttendanceController::class, 'getLogs']);
