# 点播模块接口文档【oid】

__全局接口调用验证oid__

## 专栏

### 专栏列表
GET:/api/vod/courses



## 课节

### 专栏课节列表
GET:/api/vod/courses/{course_id}/lessons
### 课节详情
GET:/api/vod/lessons/{id}
### 课节推荐
GET:/api/vod/lessons/{id}/recommend

## 个人信息操作【jwt,oid】

### 订单列表
GET:/api/vod/order
_搜索字段_
| 属性   |      备注      |  可选 
|----------|:-------------:|------:|
| status |  订单状态 | nopay/success/fail/refund/closed/revoked/payerror |

### 下单
POST:/api/vod/makeorder

| 属性   |      备注      |  可选 
|----------|:-------------:|------:|
| model_type |  类型 | course|lesson |
| model_id | 专栏或者课程id | 

### 收藏、取消收藏
POST:/api/vod/like

| 属性   |      备注      |  可选 
|----------|:-------------:|------:|
| model_type |  类型 | course|lesson |
| model_id | 专栏或者课程id | 

返回值
| 属性   |      值      |  备注 
|----------|:-------------:|------:|
| result |  in、out | 收藏、取消收藏 |

### 收藏列表
GET:/api/vod/like
_搜索字段_
| 属性   |      备注      |  可选 
|----------|:-------------:|------:|
| model_type |  订单状态 | lesson/course |


