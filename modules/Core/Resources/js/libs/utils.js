/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = (url) => {
    url = url || window.location.href
    const keyValueArr = url.split('?')[1] && url.split('?')[1].split('&') || []
    let paramObj = {}
    keyValueArr.forEach(item => {
        const keyValue = item.split('=')
        paramObj[keyValue[0]] = keyValue[1]
    })
    return paramObj
}