<template>
    <div class="calendar-wrap" id="j_calendar_wrap">
        <FullCalendar
        ref="fullCalendar"
        defaultView="dayGridMonth"
        locale="zh-cn"
        height='auto'
        :customButtons="{
            addevent: {
                text: '新增',
                click: addEvent
            }
        }"
        :header="{
            left: 'prev,next today addevent',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        }"
        :buttonText="buttonText"
        :plugins="calendarPlugins"
        :weekends="calendarWeekends"
        :events="getCalendarEvents"
        :eventLimit="true"
        :firstDay='1'
        eventLimitText="更多"
        :dateClick="dateClickHandle"
        @dateClick="handleDateClick"
        @eventClick="handleEventClick" />

        <el-dialog
            title="提示"
            :visible.sync="eventShow"
            width="30%">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="eventShow = false">取 消</el-button>
                <el-button type="primary" @click="eventShow = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import lunar from '../libs/lunar'
    import http from '../libs/api.request'
    import { Loading } from 'element-ui';

    import FullCalendar from '@fullcalendar/vue'
    import dayGridPlugin from './dayGrid'
    import timeGridPlugin from '@fullcalendar/timegrid'
    import interactionPlugin from '@fullcalendar/interaction'
    import listPlugin from '@fullcalendar/list';

    const dateFormat = function(date, fmt)   {
        var o = {
            "M+" : date.getMonth()+1,                 //月份
            "d+" : date.getDate(),                    //日
            "h+" : date.getHours(),                   //小时
            "m+" : date.getMinutes(),                 //分
            "s+" : date.getSeconds(),                 //秒
            "q+" : Math.floor((date.getMonth()+3)/3), //季度
            "S"  : date.getMilliseconds()             //毫秒
        };
        if(/(y+)/.test(fmt))
            fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
        for(var k in o)
            if(new RegExp("("+ k +")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        return fmt;
    }

    export default {
        name: 'fullcalendar',
        components: {
            FullCalendar
        },
        data() {
            return {
                eventShow: false,
                buttonText: {
                    today: '今天',
                    month: '月',
                    week: '周',
                    day: '天',
                    list: '列表'
                },
                calendarPlugins: [ // plugins must be defined in the JS
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin, // needed for dateClick
                    listPlugin
                ],
                calendarApi: null,
                calendarWeekends: true,
                calendarEvents: []
            }
        },
        methods: {
            getCalendarEvents(info, successCallback, failureCallback) {
                var date = dateFormat(info.start, "yyyy-MM-dd");
                const events = [
                    ...this.calendarEvents
                ]

                // console.log(date)
                successCallback(events)
            },
            toggleWeekends() {
                this.calendarWeekends = !this.calendarWeekends // update a property
            },
            gotoPast() {
                this.calendarApi.gotoDate('2019-08-01') // call a method on the Calendar object
            },
            handleDateClick(arg) {
                if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
                    this.calendarEvents.push({ // add new event data
                        title: 'New Event',
                        start: arg.date,
                        allDay: arg.allDay
                    })
                }
                this.calendarApi.refetchEvents()
            },
            handleEventClick(info) {
                this.eventShow = true
                console.log(info)
            },
            addEvent() {
                alert('add')
            },
            dateClickHandle(e) {
                console.log(e)
            }
        },
        mounted() {
            let self = this
            self.calendarApi = this.$refs.fullCalendar.getApi()

            let $loading = Loading.service({target: '#j_calendar_wrap'});
            http.request({
                method: 'get',
                url: '/interface/core/calendars'
            }).then(res => {

                self.calendarEvents = Object.assign(self.calendarEvents, res)
                self.calendarApi.refetchEvents()

                $loading.close()
            })
            // window.addEventListener('resize', function(e){
            //     self.calendarApi.updateSize()
            //     console.log(222)
            // })
        }
    }
</script>

<style lang='scss'>
    // you must include each plugins' css
    // paths prefixed with ~ signify node_modules
    @import '~@fullcalendar/core/main.css';
    @import '~@fullcalendar/daygrid/main.css';
    @import '~@fullcalendar/timegrid/main.css';
    @import '~element-ui/lib/theme-chalk/dialog.css';
    @import '~element-ui/lib/theme-chalk/button.css';
    @import '~element-ui/lib/theme-chalk/loading.css';

    .calendar-wrap {
        width: 100%;
        min-height: 500px;
        margin: 0 auto;
    }
    tr:first-child>td>.fc-day-grid-event {
        cursor: pointer;
    }
    .fc-addevent-button{
        background-color: #409eff;
        border-color: #409eff;
        &:hover,&:visited,&:active,&:hover{
            background-color: #a7cef7;
            border-color: #a7cef7;
        }
    }
    .fc-ltr .fc-dayGrid-view .fc-day-top .fc-day-number {
        float: left;
    }
    .fc-ltr .fc-dayGrid-view .fc-day-top .fc-lunar {
        margin-left: 2px;
        font-size: 12px;
        margin-top: 5px;
        position: absolute;
        top: 0;
        color: #b3b3b3;
    }
</style>
