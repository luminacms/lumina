@include('core::layouts._head')

<style>
    #circle {width: 80px;height: 80px;margin: 0 auto;margin-top: 30px;}
    #circle strong{top: 30px;width: 80px;text-align: center;}
</style>

<div id="circle" class="relative">
    <strong class="absolute"></strong>
</div>

<script>
    layui.use(['admin', 'circleProgress'], function(){

        var admin = layui.admin;

        $process = $('#circle');
        $process.circleProgress({
            value: 0,
            size: 80,
            fill: {gradient: ['#0681c4','#4ac5f8']}
        }).on('circle-animation-progress', function(event, progress, stepValue) {
            $(this).find('strong').text((stepValue*100).toFixed(0)+'%');
        });

        callJobQueue({{ request('id') }})

        function callJobQueue(jobid)
        {
            setTimeout(function(){
                admin.request.get('{{ url('/interface/core/job/status') }}', {'id': jobid}, function(reso) {
                    $process.show().circleProgress('value', reso.data.percent)
                    if(reso.data.status != 'finished') {
                        callJobQueue(jobid)
                    }
                })
            }, 1000)
        }


    })
</script>