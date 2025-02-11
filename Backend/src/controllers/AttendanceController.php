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
        $role = $data['role'] ?? 'employee'; // ✅ Default role if missing
    
        // Debugging: Log received data
        error_log("Punch-In Request: User ID - $userId, Role - $role");
    
        try {
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
    
        } catch (\Exception $e) {
            error_log("Punch-In Error: " . $e->getMessage());
            $response->getBody()->write(json_encode(['error' => 'Database error', 'details' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(500);
        }
    }
    




    public function punchOut(Request $request, Response $response): Response
    {
        $data = $request->getParsedBody();
        $userId = $data['user_id'];
    
        // Find the most recent punch-in record that hasn't been punched out
        $attendance = AttendanceModel::where('user_id', $userId)
            ->whereNull('punch_out')
            ->orderBy('punch_in', 'desc')
            ->first();
    
        if (!$attendance) {
            $response->getBody()->write(json_encode(['error' => 'No punch-in record found']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(404);
        }
    
        $punchOutTime = date('Y-m-d H:i:s');
        $attendance->punch_out = $punchOutTime;
    
        // Calculate production time
        $productionSeconds = strtotime($punchOutTime) - strtotime($attendance->punch_in);
        $productionHours = round($productionSeconds / 3600, 2);
    
        $attendance->production_time = $productionHours;
        $attendance->overtime = max(0, $productionHours - 8);
    
        $attendance->save();
    
        $response->getBody()->write(json_encode([
            'message' => 'Punch-out recorded successfully',
            'punch_out' => $attendance->punch_out,
            'production_time' => $attendance->production_time,
            'overtime' => $attendance->overtime,
        ]));
    
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }
    
    
    
    


    public function startBreak(Request $request, Response $response): Response
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
    
        $attendance->break_start = date('Y-m-d H:i:s');
        $attendance->save();
    
        $response->getBody()->write(json_encode([
            'message' => 'Break started successfully',
            'break_start' => $attendance->break_start,
        ]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }
    public function endBreak(Request $request, Response $response): Response
    {
        $data = $request->getParsedBody();
        $userId = $data['user_id'];
    
        $attendance = AttendanceModel::where('user_id', $userId)
            ->where('date', date('Y-m-d'))
            ->first();
    
        if (!$attendance || !$attendance->break_start) {
            return $response->withHeader('Content-Type', 'application/json')->withStatus(404)
                ->write(json_encode(['error' => 'No break record found']));
        }
    
        $breakEnd = date('Y-m-d H:i:s');
        $breakDuration = round((strtotime($breakEnd) - strtotime($attendance->break_start)) / 3600, 2);
        
        $attendance->break_end = $breakEnd;
        $attendance->break_duration += $breakDuration;
        $attendance->break_start = null;
        $attendance->save();
    
        $response->getBody()->write(json_encode([
            'message' => 'Break ended successfully',
            'break_end' => $attendance->break_end,
            'total_break_time' => $attendance->break_duration,
        ]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }
        




    public function getLogs(Request $request, Response $response): Response
    {
        $query = AttendanceModel::query();
        $params = $request->getQueryParams();
    
        if (!empty($params['role'])) {
            $query->where('role', $params['role']);
        }
    
        $logs = $query->get();
    
        // Ensure response is properly formatted
        $formattedLogs = $logs->map(function ($log) {
            return [
                'user_id' => $log->user_id,
                'role' => $log->role,
                'punch_in' => $log->punch_in,
                'punch_out' => $log->punch_out,
                'production_time' => $log->production_time,
                'overtime' => $log->overtime,
            ];
        });
    
        $response->getBody()->write(json_encode($formattedLogs));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }
    
    
    



    public function getStatistics(Request $request, Response $response): Response
    {
        $params = $request->getQueryParams();
        $userId = $params['user_id'] ?? null;
        $role = $params['role'] ?? 'employee';
    
        // Today's Production Time
        $todayTotal = AttendanceModel::where('user_id', $userId)
            ->where('date', date('Y-m-d'))
            ->sum('production_time');
    
        // Week-to-Date Production Time
        $startOfWeek = date('Y-m-d', strtotime('monday this week'));
        $endOfWeek = date('Y-m-d', strtotime('sunday this week'));
        $weekTotal = AttendanceModel::where('user_id', $userId)
            ->whereBetween('date', [$startOfWeek, $endOfWeek])
            ->sum('production_time');
    
        // Month-to-Date Production Time
        $monthTotal = AttendanceModel::where('user_id', $userId)
            ->whereMonth('date', date('m'))
            ->whereYear('date', date('Y'))
            ->sum('production_time');
    
        // Remaining Hours (Assuming 160hrs/month target)
        $remaining = max(160 - $monthTotal, 0);
    
        // Total Overtime
        $overtimeTotal = AttendanceModel::where('user_id', $userId)
            ->sum('overtime');
    
        // Structured Response
        $stats = [
            ['label' => 'Today', 'value' => $todayTotal, 'total' => 8, 'color' => '#4CAF50'],
            ['label' => 'This Week', 'value' => $weekTotal, 'total' => 40, 'color' => '#F44336'],
            ['label' => 'This Month', 'value' => $monthTotal, 'total' => 160, 'color' => '#FFC107'],
            ['label' => 'Remaining', 'value' => $remaining, 'total' => 160, 'color' => '#2196F3'],
            ['label' => 'Overtime', 'value' => $overtimeTotal, 'total' => 100, 'color' => '#FFEB3B']
        ];
    
        $response->getBody()->write(json_encode($stats));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }












    
    
}



