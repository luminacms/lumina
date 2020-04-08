```js

table.render({
    elem: '#data_organization_table',
    url: '{{ URL::full() }}?orderBy=created_at&sortedBy=desc',
    autoShow: '{{ route('core.users.show', '_id_') }}',
    export: {url: '{{ URL::full() }}', can: true, all: true},  // 数据导出，can:导出权限, all：导出全部权限
    page: true,
    canSearch: true,
    toolbar: 'default',
    lineHeight: 65,
    action: [{'text': '推送到微信', 'event': 'pushWx'}], // 自定义方法
    height: 'full-100',
    cols: []
});

// 更新
table.reload("user_depart_table", {
    url: currentUrl,
    where: {'depart_id': _depart_id},
    page: {curr: 1}
})

// cols
{
    downoff: true // 关闭更多
}

```
