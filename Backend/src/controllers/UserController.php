<?php

namespace Kshitiz\Backend\Controllers;

use Kshitiz\Backend\Models\UserModel;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class UserController
{
    public function getAllUsers(Request $request, Response $response): Response
    {
        $users = UserModel::all();
        $response->getBody()->write(json_encode($users));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    public function createUser(Request $request, Response $response): Response
    {
        $data = $request->getParsedBody();

        $user = UserModel::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => password_hash($data['password'], PASSWORD_BCRYPT),
            'role' => $data['role']
        ]);

        $response->getBody()->write(json_encode($user));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(201);
    }
}
