/*
* 对于三个web项目，在构建阶段，web项目不再需要启动本地服务，一般来说，
* 构建完成后会将所有静态资源文件部署在同一个（nginx）服务下，因此，
* web项目的默认访问路径就是域名加项目名，如 xxxx.com/admin,
* xxxx.com/editor，如无更名要求，无需再配置
*
* 对于 api 服务，服务启动以后，本地/内部访问地址为 http://127.0.0.1:7051/api,
* 如果最终能通过 nginx 反代等操作使之与 web 服务同域名同端口号，
* 则可以保持以下配置（无需配置）即可，否则，请将 API_PATH 配置为 api 服务外部实际访
* 问路径，如 http://abc.125:7051/api
*/

module.exports = {
    API_PATH: '/interface/game', // 启动demo模式，使用官方 api 服务
    VIEW_PATH: '/g'
}
