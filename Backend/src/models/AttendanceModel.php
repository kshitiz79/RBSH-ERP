<?php
namespace Kshitiz\Backend\Models;

use Illuminate\Database\Eloquent\Model;

class AttendanceModel extends Model
{
    protected $table = 'attendance';
    
    protected $fillable = [
        'user_id', 
        'role', 
        'date', 
        'punch_in', 
        'punch_out', 
        'production_time', 
        'break_time', 
        'overtime',

    ];
    
    // Mutator to set default values when creating a new record
    protected $attributes = [
        'punch_in' => null,
        'punch_out' => null,
        'production_time' => 0,
        'break_time' => 0,
        'overtime' => 0,
    ];
    
    // Accessors for formatted date
    public function getFormattedDateAttribute()
    {
        return date('d M Y', strtotime($this->attributes['date']));
    }
    
    // Relationship with User Model
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
