<?php
$app->get('/', function ($request, $response, $args) {
    $response->getBody()->write("Welcome to the Management System!");
    return $response;
});
