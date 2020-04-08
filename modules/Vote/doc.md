# Lumina-Vote

Vote模块包含三大类：报名（default）,投票(vote),问卷（quiz）

## 报名（DEFAULT）

### 提交报名
POST:/vote/{vote_id}

|参数名|是否必须|类型|说明|
|:----    |:---|:----- |-----   |
|name |是  |string |用户名   |
|nickname |否  |string | 昵称    |
|mobile |是  |string | 手机号码    |
|address |否  |string | 地址    |
|company |否  |string | 公司名称    |
|visit_no |否  |int | 来访人数    |
|invited_by |否  |string | 邀请人    |
|score |否  |int | 分数    |
|fields |否  |text | 附加字段    |


> 要求提交headers中包含x-xsrf-token，具体添加方式可参考以下：

```js
headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}
```

### 获取已报名数据

GET:/vote/{vote_id}/result | Auth


### 报名数据获取


## 投票（VOTE）

### 获取报名列表

GET:/vote/{vote_id}

|参数名|是否必须|类型|说明|
|:----    |:---|:----- |-----   |
|subject_id |是  |string |--   |
|limit |否  |string | 分页默认：15    |

```json

// 返回示例
{
	"data": {
		"vote_id": 3,
		"title": "测试投票",
		"type": "vote",
		"subjects": [{
			"subject_id": 1,
			"title": "投票大会",
			"options": [{
				"option_id": 2,
				"title": "米米犬",
				"thumb": "\/storage\/uploads\/2019\/6\/12\/dvUcTLTIGq5qKogOpDvUOiEBu4wG52CAnPk7DlYV.gif",
				"count": 0
			}, {
				"option_id": 3,
				"title": "西瓜猪",
				"thumb": "\/storage\/uploads\/2019\/6\/12\/4jBU3t4x3BXUQ6de7TsF4IKq9ANk5P8S2mmwoJrv.jpeg",
				"count": 0
			}]
		}, {
			"subject_id": 2,
			"title": "投票大会",
			"options": []
		}],
		"created_at": "2019-06-12 10:18:44"
	},
	"errcode": 0
}


```

### 提交投票

POST:/vote/{vote_id}/submit

|参数名|是否必须|类型|说明|
|:----    |:---|:----- |-----   |
|subject_id |是  |string |   |
|option_id |是  |string |     |


### 申请参加投票

POST:/vote/{vote_id}/apply

|参数名|是否必须|类型|说明|
|:----    |:---|:----- |-----   |
|subject_id |是  |string |--   |
|title |是  |string | 标题    |
|thumb |是  |string | 封面图    |
|mobile |是  |string | 手机号码    |
|description | 否 | string | 宣言 |

### 排行榜

GET:/vote/{vote_id}/rank

|参数名|是否必须|类型|说明|
|:----    |:---|:----- |-----   |
|subject_id |是  |string |--   |
|limit |否  |string | 分页默认：15    |
