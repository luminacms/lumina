# 人员管理

## 基础概况
![人员](https://cdn.nlark.com/yuque/0/2019/png/96043/1570506430218-fba74b2b-ac0b-4768-bfcc-ee0b86c01b3e.png)
lumina是一套基于组织的sass系统，角色配置里面分用户和组织类型，可将具体的权限分配到具体的人或者是组织。
社交化登录管理
![权限](https://cdn.nlark.com/yuque/0/2020/png/96043/1582869961447-c5bbc8bd-01cb-4558-ae38-4c0e72e77474.png)

接口代码事例：
/oauth/{driver}/{oid}
/callback/oauth/{driver}/{oid}

目前支持头条(toutiao)，微信(wechat)，github(github)，例如微信：
/oauth/wechat/4306d5d5044f49cf95a666782020fecc
/callback/oauth/wechat/4306d5d5044f49cf95a666782020fecc
在lumina中社交化登录已经集成到option中，你可以直接在option中去配置使用即可
![粉丝](https://cdn.nlark.com/yuque/0/2019/png/96043/1570522867694-e1b9bf1c-a141-400a-9ed0-d23f17b60893.png?x-oss-process=image/resize,w_746)
