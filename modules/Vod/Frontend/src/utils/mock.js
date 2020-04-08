const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random
// mock一组数据
const indexData = function () {
    let hzzList = [];
    for (let i = 0; i < 4; i++) {
        let newGoodsObject = {
            id: i,
            price: "￥" + Random.float(600, 1000, 2, 2),
            promotion: Random.boolean(1, 0, true), //促销
            name: Random.csentence(20, 35),
            title: Random.csentence(5, 10), //  Random.csentence( min, max )
            thumbnail_pic_s: Random.dataImage('309x206', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
            goods_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
            date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
        }

        hzzList.push(newGoodsObject)
    }

  
    let bannerList = [];
    for (let i = 0; i < 5; i++) {
        let newBannerImg;
        newBannerImg = Random.dataImage('375x200', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
        
        bannerList.push(newBannerImg)
    }
    

    return {
        bannerList: bannerList,
        hzzList:hzzList
    }
}

const goodInfoData = function () {
    let goodInfo;
    
        goodInfo = {
           
            price: "￥" + Random.float(600, 1000, 2, 2),
            promotion: Random.boolean(1, 0, true), //促销
            name: Random.csentence(10, 20),
            details:Random.csentence(10, 20),
            intro:Random.csentence(50, 150),
            title: Random.csentence(5, 10), //  Random.csentence( min, max )
            thumbnail_pic_s: Random.dataImage('309x206', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
            goods_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
            date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
            
 
    }

    let bannerList = [];
    for (let i = 0; i < 5; i++) {
        let newBannerImg;
        newBannerImg = Random.dataImage('375x152', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
        
        bannerList.push(newBannerImg)
    }
   
        
    let recommend ;
        recommend = {
            
          
            name: Random.csentence(20, 35),
            details:Random.csentence(10, 20),
            intro:Random.csentence(50, 150),
            avatar:Random.dataImage('164x164', 'mock的图片'),
            title: Random.csentence(5, 10), //  Random.csentence( min, max )
            thumbnail_pic_s: Random.dataImage('309x206', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
            goods_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
            date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    
    }

  
   
    

    return {
        goodInfo,
        recommend,
        bannerList,
    }
}


const orderdata = function () {
    let orderList = [];
    for (let i = 0; i < 10; i++) {
        let orderdataObj = {
            id: i,
            price: "￥" + Random.float(600, 1000, 2, 2),
            promotion: Random.boolean(1, 0, true), //促销
            name: Random.csentence(20, 35),
            title: Random.csentence(5, 10), //  Random.csentence( min, max )
            thumbnail_pic_s: Random.dataImage('309x206', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
            goods_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
            date: Random.date() + ' ' + Random.time(), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
            active:Random.boolean(4, 5, true)
        }

        orderList.push(orderdataObj)
    }
  
   
    

    return {
        orderList,
       
    }
}


const classList = function () {
    let listdata = [];
    for (let i = 0; i < 10; i++) {
        let orderdataObj = {
            id: i,
            price: "￥" + Random.float(600, 1000, 2, 2),
            promotion: Random.boolean(1, 0, true), //促销
            name: Random.csentence(20, 35),
            title: Random.csentence(20, 35), //  Random.csentence( min, max )
            thumbnail_pic_s: Random.dataImage('309x206', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
            goods_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
            timer: Random.date() + ' ' + Random.time(), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
            active:Random.boolean(4, 5, true),           
            like: Random.float(600, 1000,0,0),
            isBuy:Random.boolean(5, 5, true),
        }

        listdata.push(orderdataObj)
    }
  
   
    

    return {
        listdata,
       
    }
}
// Mock.mock( url, post/get , h返回的数据)；
Mock.mock('/api/index', 'get', indexData)

// Mock.mock('/api/good?id=' +  ".*", 'get', goodInfoData)
Mock.mock('/api/good', 'get', goodInfoData)

Mock.mock('/api/order', 'get', orderdata)

Mock.mock('/api/list', 'get', classList)

Mock.mock('/api/list1', 'get', classList)