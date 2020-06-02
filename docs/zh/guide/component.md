# 内置组件

目前组件主要封装了表单相关的字段，感兴趣的同学可自行封装更多组件，欢迎push~

## 表单

```php
// create
<x-form :action="route('shop.category.store')" method="post">
// update
<x-form :action="route('core.organizations.update', $organization->id)" method="patch">
```

## 表单元素

基本使用不做过多解释，大家可以查看laravel官方文档。

### 表单单元

```php
<x-formItem label="label" required inline></x-formItem>
```
### 基本inout
```php
<x-input name="username"  />
```

### 时间选择器
```php
// 日期
<x-input.date name="date" required />
// 日期+时间
<x-input.date name="datetime" type="datetime" required />
// 时间
<x-input.date name="time" type="time" required />

// 时间区间，name和名字用,号分割
<x-input.dateRange name="start_at,end_at" verify="required" min="0" value="2018-12-1,2019-11-5"/>
<x-input.dateRange name="start_at,end_at" type="datetime" verify="required" min="0" />
<x-input.dateRange name="start_at,end_at" type="time" verify="required" min="0" />
```

### 多选和单选
```php
<x-input.select name="rate" :options="['苹果','橘子']"  value="module"/>
<x-input.radio name="rate" :options="['苹果','橘子']"  value="module"/>
<x-input.checkbox name="rate" :options="['苹果','橘子']"  value="module"/>
```

### 图片和附件上传
```php
// limit标识限制上传个数，默认1
<x-input.imgs name="rate" required limit="4"/>

// 文件和多媒体上传
<x-input.file name="rate" required />
<x-input.media name="rate" required />
```

### 富文本编辑器
```php
// 编辑器
<x-input.editor name="rate" required />
// 轻量级编辑器
<x-input.meditor name="rate" required />
```

### 评分
```php
<x-input.rate name="rate" required />
```

## 参数与表单验证


### 参数

组件参数一栏表：

|  关键字 | 是否必填  | 解释 |
| ------------- |:-------------:| -----:|
|name |必填|  名称|
|type |非必填|  类型|
|value |非必填| 值
|options|多选，单选必填|选项
|limit|非必填|限制数量


### 表单验证
组件系统集成了前端表单验证：

```php

<input verify="required|phone" />

```


`verify="required"` 与 `required`一样的，所以，必填验证也可以写成：
`<input required />`。当然，你用verify也是ok的。 

其他内置可使用规则如下：

- required（必填项）
- phone（手机号）
- email（邮箱）
- url（网址）
- number（数字）
- date（日期）
- identity（身份证）
- 自定义值（自定义值需要）


自定义验证的写法：

```js
layui.use('form', function(){
    var form = layui.form;

    form.verify({
        username: function(value, item){ //value：表单的值、item：表单的DOM对象
            if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
            return '用户名不能有特殊字符';
            }
            if(/(^\_)|(\__)|(\_+$)/.test(value)){
            return '用户名首尾不能出现下划线\'_\'';
            }
            if(/^\d+\d+\d$/.test(value)){
            return '用户名不能全为数字';
            }
        }
        
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        ,pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ]
    });  
})



```
