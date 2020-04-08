<?php $flashs = session('flash_notification', collect())->toArray(); ?>
@if(count($flashs) > 0)
<div id="g-alert">
@foreach ($flashs as $message)
    @if ($message['overlay'])
        @include('flash::modal', [
            'modalClass' => 'flash-modal',
            'title'      => $message['title'],
            'body'       => $message['message']
        ])
    @else
        <div class="alert-bd" style="animation-delay: {{ $loop->index*0.5 }}s;">
            <div class="bd shadow border rounded-lg {{ $message['important'] ? 'important' : '' }}">
                @if ($message['important'])
                    <button type="button"
                            class="close"
                            data-dismiss="alert"
                            aria-hidden="true"
                    >&times;</button>
                @endif
                <i class="fa {{ $message['level']=='success'?'fa-check-circle':'fa-exclamation-circle' }} mr-1 font-bold text-{{ $message['level'] }}"></i>
                    @if(!is_array($message['message']))
                        <span>{!! $message['message'] !!}</span>
                    @else
                            {!! json_encode($message['message']) !!}
                    @endif
            </div>
        </div>
    @endif
@endforeach
</div>
@endif

{{ session()->forget('flash_notification') }}


@push('script')
<script>
    $(function(){
        $(".alert-bd").on("webkitAnimationEnd", function(){
            var $self = $(this)
            setTimeout(function(){
                $self.animate({top: '-30px'}, 'slow', '', function(){
                    $self.remove()
                })
            }, 2000)
        })
    })
</script>
@endpush

