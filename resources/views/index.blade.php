<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Lumina</title>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@1.1.4/dist/tailwind.min.css">
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js"></script>

    <!-- Styles -->
    <style>
        html, body{background-color: #fff;color: #636b6f;font-family: 'Nunito', sans-serif;font-weight: 200;height: 100vh;margin: 0;}
        .full-height{height: 100vh;}
        .flex-center{align-items: center;display: flex;justify-content: center;}
        .position-ref{position: relative;}
        .top-right{position: absolute;right: 10px;top: 18px;}
        .content{text-align: center;}
        .title{font-size: 84px;}
        .links > a{color: #636b6f;padding: 0 25px;font-size: 13px;font-weight: 600;letter-spacing: .1rem;text-decoration: none;text-transform: uppercase;}
        .mt-2{margin-top: 30px;}
    </style>
</head>
<body>

<div class="flex-center position-ref full-height">
    @if (Route::has('login'))
        <div class="top-right links">
            @auth
                <a href="{{ route('dashboard', auth()->oid()) }}">Dashboard</a>
                <a class="dropdown-item" href="javascript:;" onclick="event.preventDefault();document.getElementById('logout-form').submit();">
                    Logout
                </a>
                <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                    @csrf
                </form>
            @else
                <a href="{{ route('login') }}">Login</a>

                @if (Route::has('register'))
                    <a href="{{ route('register') }}">Register</a>
                @endif
            @endauth
        </div>
    @endif

    <div class="content">

        <div class="title">
            Lumina
        </div>
        <div>
            The Last PHP Framework!
        </div>

        <ul class="border-gray-400 mx-auto">
            {{-- @foreach(Module::getOrdered() as $_module)
            <li class="flex px-4 py-2 mx-4 border border-gray-300">
                <div class="w-12"><i class="fa fa-trash"></i></div>
                <div class="flex-1 text-left">
                    <h3>{{ //$_module->getName() }}</h3>
                    <div class="text-xs text-green-800">{{ //$_module->getDescription() }}</div>
                </div>
            </li>
            @endforeach --}}
        </ul>
    </div>

</div>
</body>
</html>
