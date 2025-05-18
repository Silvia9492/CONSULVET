<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;


class CorsMiddleware{

    public function handle(Request $request, Closure $next){
        \Log::info('Middleware CORS ejecutado');
        return $next($request)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization');
    }
}