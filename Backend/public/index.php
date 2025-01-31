<?php

use Slim\Factory\AppFactory;

header("Access-Control-Allow-Origin: *"); // Allow all origins
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Allowed methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allowed headers

require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/../config.php';

$app = AppFactory::create();

// Handle preflight (OPTIONS) requests
$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

// Middleware
$app->addBodyParsingMiddleware(); // Required for JSON parsing
$app->addRoutingMiddleware();
$app->addErrorMiddleware(true, true, true);

// Routes
require __DIR__ . '/../src/routes/web.php';
require __DIR__ . '/../src/routes/authRoutes.php';
require __DIR__ . '/../src/routes/userRoutes.php';
require __DIR__ . '/../src/routes/attendanceRoutes.php';

// Run the app
$app->run();
