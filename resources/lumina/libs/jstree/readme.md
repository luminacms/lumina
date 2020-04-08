```text
    // 可选参数
    id - 这个ID会在对应的‘LI’ 节点上设置html标签的ID属性. 请确保ID的唯一性，每个节点的ID都应该不一样，否则会有出现一些莫名其妙的问题.
    icon - 节点图标，可以设置表示路径、一个或者多个CSS类名、字体图标的字符串.
    data - 任何数据，设置这个属性没有任何UI上的效果，任何时候都可以读写这个数据.
    state - 对象类型，一个节点的状态有一下几种: 
        selected - 节点处于被选中状态
        opened - 节点处于打开状态
        disabled - 节点不可选
        checked - 用于checkbox插件 - 勾选该checkbox(只有当 tie_selection 处于 false时有效)
        undetermined - 用于checkbox插件 - 状态待定 (只有启用懒加载并且节点没有被加载时生效).
    type - 用于types插件 - 用来定义节点类型，默认为 "default" 类型.
    li_attr -包含DOM属性的对象， 会追加到该节点对应的LI标签.
    a_attr - -包含DOM属性的对象， 会追加到该节点对应的A标签.
```
