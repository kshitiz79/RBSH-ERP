<?php

use Illuminate\Database\Capsule\Manager as Capsule;

function getDBConnection() {
    return Capsule::connection();
}
