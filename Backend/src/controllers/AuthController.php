<?php

namespace Kshitiz\Backend\Controllers;

use Kshitiz\Backend\Models\UserModel;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class AuthController
{
    public function signup(Request $request, Response $response): Response
    {
        $data = $request->getParsedBody();

        error_log('Received data: ' . json_encode($data)); // Debug received data

        // Validate input
        if (!isset($data['name'], $data['email'], $data['password'], $data['role'])) {
            $response->getBody()->write(json_encode(['error' => 'All fields are required']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }

        // Check if user already exists
        $existingUser = UserModel::where('email', $data['email'])->first();
        if ($existingUser) {
            $response->getBody()->write(json_encode(['error' => 'User already exists']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }

        // Create a new user
        $user = UserModel::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => password_hash($data['password'], PASSWORD_BCRYPT),
            'role' => $data['role']
        ]);

        $response->getBody()->write(json_encode([
            'message' => 'User registered successfully',
            'user' => $user
        ]));

        return $response->withHeader('Content-Type', 'application/json')->withStatus(201);
    }

    public function login(Request $request, Response $response): Response
    {
        $data = $request->getParsedBody();

        // Validate input
        if (!isset($data['email'], $data['password'])) {
            $response->getBody()->write(json_encode(['error' => 'Email and password are required']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }

        // Fetch user by email
        $user = UserModel::where('email', $data['email'])->first();

        if (!$user || !password_verify($data['password'], $user->password)) {
            $response->getBody()->write(json_encode(['error' => 'Invalid credentials']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(401);
        }

        $response->getBody()->write(json_encode([
            'message' => 'Login successful',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ]
        ]));

        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }
}
