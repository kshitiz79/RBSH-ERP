<?php

namespace Kshitiz\Backend\Models;

use Illuminate\Database\Eloquent\Model;

class UserModel extends Model
{
    protected $table = 'users';
    protected $fillable = ['name', 'email', 'password', 'role'];
}
