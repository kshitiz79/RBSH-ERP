<?php
namespace Kshitiz\Backend\Models;

use Illuminate\Database\Eloquent\Model;

class AttendanceModel extends Model
{
    protected $table = 'attendance';
    protected $fillable = [
        'user_id', 'role', 'date', 'punch_in', 'punch_out', 'production_time', 'break_time', 'overtime'
    ];
}
