@extends('vote::vote.default.layout')

@section('content')

    <div class="m-rankC container  mt-5 px-5">
        <ul class="list">
            <?php $icon = [1 => 'https://cdn.sxmgcm.cn/2019/01/car/first.png', 2 => 'https://cdn.sxmgcm.cn/2019/01/car/second.png', 3=>'https://cdn.sxmgcm.cn/2019/01/car/third.png'] ?>
            @foreach($rank as $_rank)
                <li class="  w-full mb-3">
                    @if(!isset($icon[$loop->iteration]))
                        <span class="pos align-middle">{{ $loop->iteration }}</span>
                    @else
                        <img src="{{ $icon[$loop->iteration] }}" alt="" class="inline-block align-middle px-1">
                    @endif
                    <img src="{{ $_rank['thumb'] }}" alt="" class="w-10 h-10 rounded inline-block mr-2 align-middle  ">
                    <p class=" truncate inline-block align-middle w-7/12">{{ $_rank['title'] ?? '' }} / {{ $_rank['count'] }}</p>
                </li>
            @endforeach
        </ul>
    </div>


@endsection

