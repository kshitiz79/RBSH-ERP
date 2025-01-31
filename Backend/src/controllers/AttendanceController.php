<?php



namespace Kshitiz\Backend\Controllers;

use Illuminate\Database\Capsule\Manager as DB;
use Kshitiz\Backend\Models\AttendanceModel;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class AttendanceController
{
    public function punchIn(Request $request, Response $response): Response
    {
        $data = $request->getParsedBody();
        $userId = $data['user_id'];
        $role = $data['role'];

        $attendance = AttendanceModel::create([
            'user_id' => $userId,
            'role' => $role,
            'date' => date('Y-m-d'),
            'punch_in' => date('Y-m-d H:i:s'),
        ]);

        $response->getBody()->write(json_encode([
            'message' => 'Punch-in recorded successfully',
            'punch_in' => $attendance->punch_in,
        ]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(201);
    }

    public function punchOut(Request $request, Response $response): Response
    {
        $data = $request->getParsedBody();
        $userId = $data['user_id'];

        $attendance = AttendanceModel::where('user_id', $userId)
            ->where('date', date('Y-m-d'))
            ->first();

        if (!$attendance) {
            return $response->withHeader('Content-Type', 'application/json')->withStatus(404)
                ->write(json_encode(['error' => 'No punch-in record found']));
        }

        $attendance->punch_out = date('Y-m-d H:i:s');
        $attendance->production_time = (strtotime($attendance->punch_out) - strtotime($attendance->punch_in)) / 3600;
        $attendance->overtime = max(0, $attendance->production_time - 8);
        $attendance->save();

        $response->getBody()->write(json_encode([
            'message' => 'Punch-out recorded successfully',
            'production_time' => $attendance->production_time,
            'overtime' => $attendance->overtime,
        ]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    public function getLogs(Request $request, Response $response): Response
    {
        $query = AttendanceModel::query();

        if ($role = $request->getQueryParams()['role']) {
            $query->where('role', $role);
        }

        $logs = $query->get();

        $response->getBody()->write(json_encode($logs));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }
}
