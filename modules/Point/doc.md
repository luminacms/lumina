# 积分系统

** 积分系统一般情况使用需要绑定model，通过Pointable对积分进行增减，回滚等操作。为了更大自由，放出了两个通用接口，如下：**

**全局参数**

|参数名|是否必须|类型|说明|
|:----    |:---|:----- |-----   |
|oid |是  |string |组织码   |
|type |是  |string |积分类型，接口模式此字段为必填，当前活动的标志   |
|page |否  |string |分页   |



## 积分汇总

GET:/interface/point


## 积分提交

GET:/interface/point/submit

|参数名|是否必须|类型|说明|
|:----    |:---|:----- |-----   |
|count |是  |number | 具体多少积分  |


## 积分变更历史

GET:/interface/point/log

|参数名|是否必须|类型|说明|
|:----    |:---|:----- |-----   |
|log_type |否  |string | increase|decrease  |
|unique |否  |bool | 是否用户唯一过滤  |
