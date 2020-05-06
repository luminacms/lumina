# Lumina系统入门文档


## 列表参数

### 分页

| 属性   |      备注      |  默认 |
|----------|:-------------:|------:|
| limie |  分页 | 15 |

### 检索

- ?search=John:Doe
- ?search=name:Jory;email:jorycn@163.com
- ?filter=id;name
- searchJoin=and
- orderBy=id&sortedBy=desc
- orderBy=posts:custom_id|posts.title&sortedBy=desc


## Module开发指南


### 菜单开发

- 配置module模块下的menus字段，可直接注册导航
- route对应laravel路由命名，params填写路由参数，uri可直接配置链接地址，target配置可跳转至新的页面打开，跳出lumina框架
- auth配置对应单挑路由的显示权限
    1. {"ROLE": "SUPER|ADMIN"}标识符合角色SUPER或者ADMIN里任意一个
    2. {"ROLE": "SUPER,ADMIN"}标识符合角色SUPER和ADMIN
    
```json
// menus事例
"menus": [
    {"name": "system", "icon": "fa-cogs", "label": "全局配置", "route": "core.option.index"},
    {"name": "user", "icon": "fa-users", "label": "用户管理", "children": [
        {"name": "user_organizations", "icon": "", "label": "组织管理", "route": "core.organizations.index", "auth": {"ROLE": "SUPER|ADMIN"}},
        {"name": "user_organizations", "icon": "", "label": "组织管理", "route": "core.organizations.index", "auth": {"ROLE": "SUPER"}},
        {"name": "user_departments", "icon": "", "label": "部门管理", "route": "core.departments.index"},
        {"name": "user_layer", "icon": "", "label": "权限管理", "route": "core.permission.index", "auth": {"ROLE": "SUPER"}},
        {"name": "user_users", "icon": "", "label": "员工管理", "route": "core.users.index"},
        {"name": "user_users_social", "icon": "", "label": "粉丝管理", "route": "core.user-socialites.index", "auth": {"ROLE": "SUPER"}},
        {"name": "user_address", "icon": "", "label": "地址管理", "route": "core.user-addresses.index", "children":  [
            {"name": "user_departments", "icon": "", "label": "部门管理", "route": "core.departments.index", "children":  [
                {"name": "user_departments", "icon": "", "label": "部门管理", "route": "core.departments.index"}
            ]}
        ]}
    ]}
]

```


```js

table.render({
    elem: '#data_organization_table',
    url: '{!! URL::full() !!}?orderBy=created_at&sortedBy=desc',
    autoShow: '{{ route('core.users.show', '_id_') }}',
    export: {url: '{!! URL::full() !!}', can: true, all: true},  // 数据导出，can:导出权限, all：导出全部权限
    page: true,
    canSearch: true,
    toolbar: 'default',
    lineHeight: 65,
    action: [{'text': '推送到微信', 'event': 'pushWx'}], // 自定义方法
    height: 'full-100',
    filters: [
        {'name': 'status', "value":"{{ request('status') }}", "options": {"wait":"待领取","received":"已领取","used":"已使用","expired":"已过期"}}
    ],
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
