# 优惠券

**headers参数**

|参数名|是否必须|类型|说明|
|:----    |:---|:----- |-----   |
|oid |是  |string |组织码   |
|X-CSRF-TOKEN|是|string|csrf_token()<br/>$('meta[name="csrf-token"]').attr('content')|
|Accept|是|string|application/json|

## 我的优惠券

GET:/interface/coupon/receive

|参数名|是否必须|类型|说明|
|:----    |:---|:----- |-----   |
|code |是  |string |优惠券码   |

## 优惠券领取

POST:/interface/coupon/receive

|参数名|是否必须|类型|说明|
|:----    |:---|:----- |-----   |
|code |是  |string |优惠券码   |

## 优惠券核销

POST:/interface/coupon/use

|参数名|是否必须|类型|说明|
|:----    |:---|:----- |-----   |
|code |是  |string |优惠券码   |
