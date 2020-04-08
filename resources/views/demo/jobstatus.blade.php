@include('core::layouts._head')

<style>
    #circle {width: 80px;height: 80px;margin-top: 30px;}
    #circle strong{top: 30px;width: 80px;text-align: center;}
</style>

<a href="javascript:;" id="j_start" class="border px-4 py-2 bg-info text-white">开始</a>
<div id="circle" class="relative">
    <strong class="absolute"></strong>
</div>

<script>
    layui.use(['admin', 'circleProgress'], function(){

        var admin = layui.admin;


        $("#j_start").click(function(){
            $.get('/demo/api/job', function(res) {
                startListen(res.data.id)
            })
        })

        function startListen($jobid) {
            var $process = $('#circle'),
                times = 0;
            $process.circleProgress({
                value: 0,
                size: 80,
                fill: {gradient: ['#0681c4','#4ac5f8']}
            }).on('circle-animation-progress', function(event, progress, stepValue) {
                $(this).find('strong').text((stepValue*100).toFixed(0)+'%');
            });

            callJobQueue($jobid)
            function callJobQueue(jobid)
            {
                setTimeout(function(){
                    admin.request.get('{{ url('/interface/core/job/status') }}', {'id': jobid}, function(reso) {
                        $process.show().circleProgress('value', reso.data.percent)
                        if(reso.data.status != 'finished' && times<20) {
                            callJobQueue(jobid)
                        }
                        if(reso.errcode == -1) {
                            times += 1;
                        }
                    })
                }, 1000)
            }
        }






    })
</script>