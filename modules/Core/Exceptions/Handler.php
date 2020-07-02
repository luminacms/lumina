<?php

namespace Modules\Core\Exceptions;

use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Support\Arr;
use Throwable;
use Illuminate\Validation\ValidationException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Throwable $exception)
    {
        // request 字段验证异常
        if($exception instanceof ValidationException) {
            $first_err = data_get($exception->errors(), '*.*');
            if($request->expectsJson()) {
                return response()->json(['errcode'=>422, 'msg'=>$first_err[0], 'errors'=>$exception->errors()]);
            }else{
                // flash接管错误验证信息
                flash(Arr::collapse($exception->errors())[0], 'error');
                return redirect()->back()->withInput();
            }
        }else if($exception instanceof AuthorizationException) {
            if($request->expectsJson()) {
                return response()->json(['errcode' => 403, 'msg' => '操作不被允许', 'errors'=> $exception->getMessage()]);
            }
        }else if($exception instanceof TokenExpiredException) {
            return response()->json(['errcode' => 40002, 'msg' => 'token_expired']);
        }else if($exception instanceof JWTException) {
            return response()->json(['errcode' => 40001, 'msg' => 'token_invalid']);
        }

        if($request->expectsJson()) {
            return response()->json(['errcode' => -1, 'msg' => $exception->getMessage()]);
        }

        return parent::render($request, $exception);
    }

    /**
     * @param $request
     * @param AuthenticationException $exception
     * @return mixed
     */
    protected function unauthenticated($request, AuthenticationException $exception)
    {
        if ($request->expectsJson()) {
            return response()->json(['errcode' => 401, 'msg' => 'Unauthenticated'], 200);
        }
        return redirect()->guest(route('login'));
    }
}
