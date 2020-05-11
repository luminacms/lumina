/***********获取本地存储的数据**********/
function getLoaclData(key){
    try{
        var value = localStorage[key];
        if(value){
            return value;
        }
    }catch(e){
        console.warn(e);
        return "";
    }
}
/*********存储数据至本地***********/
function saveLoaclData(key,value){
    try{
        localStorage[key] = value;
        return true;
    }catch(e){
        console.warn(e);
        return false;
    }
}
/*********上移*********/
function upModule(moduleId) {
    var modules = getAllmodules(moduleId);
    for(var i=0; i<modules.length;i++){
        if(modules[i].moduleId == moduleId){
            if(i > 0) {
                var module = modules[i];
                module.version = module.version + 1;
                modules.splice(i,1);
                modules.splice(i-1, 0, module);
            }
            break;
        }
    }
    saveAllModules(modules);
    refreshSyncIco(0);
    return true;
}
/*********下移*********/
function downModule(moduleId) {
    var modules = getAllmodules(moduleId);
    for(var i=0; i<modules.length;i++){
        if(modules[i].moduleId == moduleId){
            if(i < modules.length-1) {
                var module = modules[i];
                module.version = module.version + 1;
                modules.splice(i,1);
                modules.splice(i+1, 0, module);
            }
            break;
        }
    }
    saveAllModules(modules);
    refreshSyncIco(0);
    return true;
}
function getAllmodules(){
    var modules;
    try {
        modules = $.parseJSON(localStorage['crap-debug-modules'])
    } catch (e) {
        modules = $.parseJSON("[]");
        console.warn(e);
    }
    return modules;
}
function saveAllModules(modules){
    localStorage['crap-debug-modules'] = JSON.stringify(modules);
}
/*********上移接口*********/
function upinterfacce(moduleId, id) {
    var interfacces = getinterfaccesByModuleId(moduleId);
    for(var i=0; i<interfacces.length;i++){
        if(interfacces[i].id == id){
            if(i > 0) {
                var interfacce = interfacces[i];
                interfacce.version = interfacce.version + 1;
                interfacces.splice(i,1);
                interfacces.splice(i-1, 0, interfacce);
            }
            break;
        }
    }
    saveAllinterfacces(moduleId, interfacces);
    refreshSyncIco(0);
    return true;
}
/*********下移接口*********/
function downinterfacce(moduleId, id) {
    var interfacces = getinterfaccesByModuleId(moduleId);
    for(var i=0; i<interfacces.length;i++){
        if(interfacces[i].id == id){
            if(i < interfacces.length-1) {
                var interfacce = interfacces[i];
                interfacce.version = interfacce.version + 1;
                interfacces.splice(i,1);
                interfacces.splice(i+1, 0, interfacce);
            }
            break;
        }
    }
    saveAllinterfacces(moduleId, interfacces);
    refreshSyncIco(0);
    return true;
}
function getinterfaccesByModuleId(moduleId){
    var interfacces;
    try{
        interfacces = $.parseJSON( localStorage['crap-debug-interfacce-' + moduleId] );
    }catch(e){
        interfacces = $.parseJSON( "[]" );
        console.warn(e);
    }
    return interfacces;
}
function saveAllinterfacces(moduleId, interfacces){
    localStorage['crap-debug-interfacce-' + moduleId] = JSON.stringify(interfacces);
}

function format(txt, tiperror){
    try {
        var txtObj = JSON.parse(txt);
        return JSON.stringify(txtObj, null, 5);
    }catch (e){
        if (tiperror){
            alert("格式化异常，请检查json格式是否有误" + e);
        }
        return txt;
    }
}

function jsonFormat_delete(txt, tiperror, compress/*是否为压缩模式*/) {/* 格式化JSON源码(对象转换为JSON文本) */
	var indentChar = '    ';
	if (/^\s*$/.test(txt)) {
		if (tiperror)
			alert('数据为空,无法格式化! ');
		return;
	}
	// 替换\r\n 换行
	txt=txt.replace(/\\r/g,"CRAPAPI_R");
    txt=txt.replace(/\\n/g,"CRAPAPI_N");
    txt=txt.replace(/\\t/g,"CRAPAPI_T");
	var data;
	try {
		data=$.parseJSON(txt);
	} catch (e) {
		if (tiperror)
			alert('数据源语法错误,格式化失败! 错误信息: ' + e.description, 'err');
		return;
	}
	;
	var draw = [], last = false, This = this, line = compress ? '' : '\n', nodeCount = 0, maxDepth = 0;

	var notify = function(name, value, isLast, indent/*缩进*/, formObj) {
		nodeCount++;/*节点计数*/
		for (var i = 0, tab = ''; i < indent; i++)
			tab += indentChar;/* 缩进HTML */
		tab = compress ? '' : tab;/*压缩模式忽略缩进*/
		maxDepth = ++indent;/*缩进递增并记录*/
		if (value && value.constructor == Array) {/*处理数组*/
			draw.push(tab + (formObj ? ('"' + name + '":') : '') + '[' + line);/*缩进'[' 然后换行*/
			for (var i = 0; i < value.length; i++)
				notify(i, value[i], i == value.length - 1, indent, false);
			draw.push(tab + ']' + (isLast ? line : (',' + line)));/*缩进']'换行,若非尾元素则添加逗号*/
		} else if (value && typeof value == 'object') {/*处理对象*/
			draw.push(tab + (formObj ? ('"' + name + '":') : '') + '{' + line);/*缩进'{' 然后换行*/
			var len = 0, i = 0;
			for ( var key in value)
				len++;
			for ( var key in value)
				notify(key, value[key], ++i == len, indent, true);
			draw.push(tab + '}' + (isLast ? line : (',' + line)));/*缩进'}'换行,若非尾元素则添加逗号*/
		} else {
			if (typeof value == 'string') {
				value = value.replace(/\"/gm, '\\"');
				// 替换\r\n 换行
				value=value.replace(/CRAPAPI_R/g,"\\r");
  				value=value.replace(/CRAPAPI_N/g,"\\n");
  				value=value.replace(/CRAPAPI_T/g,"\\t");

				value = '"' + value + '"';
			}
			draw.push(tab + (formObj ? ('"' + name + '":') : '') + value
					+ (isLast ? '' : ',') + line);
		}
		;
	};
	var isLast = true, indent = 0;
	notify('', data, isLast, indent, false);
	return draw.join('');
}

function jsonToDiv(txt) {/* 格式化JSON源码(对象转换为JSON文本) */
	var indentChar = '-';
	if (/^\s*$/.test(txt)) {
		alert('数据为空,无法格式化! ');
		return "";
	}
	try {
		var data = eval('(' + txt + ')');
	} catch (e) {
		alert('数据源语法错误,格式化失败! 错误信息: ' + e.description, 'err');
		return "";
	}
	;
	var draw = [], line = ',', nodeCount = 0;

	var notify = function(name, value, indent) {
		nodeCount++;/*节点计数*/

		for (var i = 0, tab = ''; i < indent; i++)
			tab += indentChar;/* 缩进HTML */
		indent ++;
		if (value && value.constructor == Array) {/*处理数组*/
			if( value.length > 0 ){
				// 判断数组类型
				var type = "";
				if( value[0] && typeof value[0] == 'object'){
					type = 'object';
				}else if (typeof value == 'string') {
					type= 'string';
				}else if (typeof value == 'number') {
					type = 'number';
				}else if (typeof value == 'boolean') {
					type = 'boolean';
				}
				if( name != ''){
					draw.push('{"deep":"'+tab.length+'","name":"'+name+'","remark":"","type":"array['+type+']","necessary":"true"}' + line);
				}else{
					indent = indent -1;
				}

				// 数组只需要记录第一个就行
				notify("", value[0], indent);
			}

		} else if (value && typeof value == 'object') {/*处理对象*/

			// 数组中的元素，没有名称
			if( name != ''){
				// 将对象名放入队列
				draw.push('{"deep":"'+tab.length+'","name":"'+name+'","remark":"","type":"object","necessary":"true"}' + line);
			}else{
				indent = indent -1;// 名称为空，无需缩进
			}

			for ( var key in value)
				notify(key, value[key], indent);

		} else {
			var type;
			if (typeof value == 'string') {
				value = value.replace(/\"/gm, '\\"');
				value = '"' + value + '"';
				type = 'string';
			}else if (typeof value == 'number') {
				type = 'number';
			}else if (typeof value == 'boolean') {
				type = 'boolean';
			}

			if(name != ""){// 数组中的字符等没有名称
				draw.push('{"deep":"'+tab.length+'","name":"'+name+'","remark":"","type":"'+type+'","necessary":"true"}' + line);
			}
		}
		;
	};

	var indent = 0;
	notify('', data, indent);
	var result = draw.join('');
	if(result.length > 0){
		result = result.substring(0,result.length-1);
	}
	return "["+result+"]";
}


var WEB_SITE_URL = "crap-web-site-url";
var WEB_HTTP_TIMEOUT = "crap-http-timeout";

/***************** 系统设置 *****************/
function getHttpTimeout(){
    try {
        var httpTimeout = localStorage[WEB_HTTP_TIMEOUT];
        httpTimeout = parseFloat(httpTimeout);
        if (httpTimeout && httpTimeout != null && httpTimeout.toString() != "NaN" && httpTimeout > 1000) {
            return httpTimeout;
        } else {
            return 10000;
        }
    }catch(e){
        return 10000;
    }
}
function setHttpTimeout(httpTimeout){
    httpTimeout = parseFloat(httpTimeout);
    if (httpTimeout.toString() == "NaN" || httpTimeout < 1000) {
        $("#http-timeout-button").text("Error! Timeout must be number, and must big than 1000!");
        return;
    }
    localStorage[WEB_HTTP_TIMEOUT] = httpTimeout;
    $("#http-timeout-button").text("Change http timeout success!");
}

function getWebSiteUrl(){
    var webSiteUrl = localStorage[WEB_SITE_URL];
    if (webSiteUrl && webSiteUrl != null && webSiteUrl != ''){
        return webSiteUrl;
    }else{
        return "http://api.crap.cn";
    }
}
function setWebSiteUrl(url){
    localStorage[WEB_SITE_URL] = url;
    $("#set-website-button").text("Change website url success!");
}

function clearLocalStorage() {
    var webSiteUrl = getWebSiteUrl();
    var httpTimeout = getHttpTimeout();
    localStorage.clear();
    setWebSiteUrl(webSiteUrl)
    setHttpTimeout(httpTimeout)
}


/********* html基本操作方法**********/
function setHtml(id, html) {
    $("#" + id).html(html);
}
function showDiv(id) {
    $("#" + id).removeClass("ndis");
}
function hiddenDiv(id) {
    $("#" + id).addClass("ndis");
}
function fadeIn(id, time) {
    $("#" + id).fadeIn(time);
}
function fadeOut(id, time) {
    $("#" + id).fadeOut(time);
}
function getAttr(id, name) {
    return $("#" + id).attr(name);
}
function setAttr(id, name, value) {
    $("#" + id).attr(name, value);
}
function getValue(id) {
    if ($("#" + id)){
        return $("#" + id).val();
    }
    return null;
}
function setValue(id, val) {
    $("#" + id).val(val);
}

function prop(id) {
    $("#" + id).prop("checked",true);
}

/********* http *******/
function httpPost(url, myData, myAsync, callBack, callBackParams){
    if (url.indexOf("https://") != 0 && url.indexOf("http://") != 0){
        url = getWebSiteUrl() + url;
    }
    var result;
    $.ajax({
        type: "POST",
        url: url,
        async: myAsync,
        data: myData,
        timeout: 2000,
        beforeSend: function (request) {
            // 通过body传递参数时后需要设置
            //request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        },
        complete: function (responseData, textStatus) {
            if (textStatus == "success") {
                var responseJson = $.parseJSON(responseData.responseText);
                result = responseJson;
                if (callBack) {
                    callBack(responseJson, callBackParams);
                }
            } else if (textStatus == "timeout") {
                result = $.parseJSON("{\"success\":0,\"data\":null,\"error\":{\"code\":\"net error\",\"message\":\"timeout\"}}")
            }

            else {
                result = $.parseJSON("{\"success\":0,\"data\":null,\"error\":{\"code\":\"unknown error\",\"message\":\"unknown error\"}}")
            }
        }
    });
    return result;
}

var paramsTr = "<tr class='last'>";
paramsTr += "<td><input type='text' class='form-control' data-stage='key'></td>";
paramsTr += "<td><input type='text' class='form-control' data-stage='value'></td>";
paramsTr += "<td class='w20'><i class='fa fa-trash'>&#xe63f;</i></td>";
paramsTr += "</tr>";

var moduleDiv = "<div class='panel panel-info no-radius b0 mt0 left-menu-border-top'>";
moduleDiv += "      <div class='panel-heading no-radius rel' data-parent='#modules'>";
moduleDiv += "          <div class='cursor' data-toggle='collapse' data-parent='#modules' href='#panel_ca_moduleId' crap-data='ca_moduleId'>";
moduleDiv += "              <i class='fa fa-folder-o color-main f16'></i>&nbsp;&nbsp;  ca_moduleName";
moduleDiv += "		        <span class='more'>";
moduleDiv += "			        <i class='fa fa-ellipsis-h fr h lh40'></i>";
moduleDiv += "			        <span class='t0 h'><i class='fa fa-edit interface-menu rename-module mt0 lh40 fr'crap-data='ca_moduleId'></i></span>";
moduleDiv += "	                <span class='t0 h'><i class='fa fa-trash interface-menu delete-module mt0 lh40 fr' crap-data='ca_moduleId'></i></span>";
moduleDiv += "			        <span class='t0 h'><i class='fa fa-angle-down interface-menu down-module  mt0 lh40 fr' crap-data='ca_moduleId'></i></span>";
moduleDiv += "			        <span class='t0 h'><i class='fa fa-angle-up interface-menu up-module  mt0 lh40 fr' crap-data='ca_moduleId'></i></span>";
moduleDiv += "		        </span>";
moduleDiv += "          </div>";
moduleDiv += "      </div>";
moduleDiv += "      <div id='panel_ca_moduleId' class='panel-collapse BGEEE collapse'>";
moduleDiv += "          <div class='panel-body b0 p0'>";
moduleDiv += "              ca_interfaces";
moduleDiv += "           </div>";
moduleDiv += "       </div>";
moduleDiv += "   </div>";

var interfaceDiv = "<div crap-data='ca_interfaceInfo' class='j_interface pl30 pr20 rel' title='ca_name'>";
interfaceDiv += "		<i class='ca_methodIcon fa ca_method'></i>&nbsp;&nbsp;ca_name";
interfaceDiv += "		<span class='more'>";
interfaceDiv += "			<i class='fa fr'></i>";
interfaceDiv += "			<span class='t0 h'><i class='fa fa-trash interface-menu delete-interface' crap-data='ca_moduleId|ca_id'></i></span>";
interfaceDiv += "			<span class='t0 h'><i class='fa fa-angle-down interface-menu down-interface' crap-data='ca_moduleId|ca_id'></i></span>";
interfaceDiv += "			<span class='t0 h'><i class='fa fa-angle-up interface-menu up-interface' crap-data='ca_moduleId|ca_id'></i></span>";
interfaceDiv += "		</span>";
interfaceDiv += "	</div>";

// Custom param types
var customerTypes = ["text/plain", "application/json", "application/xml"];
var saveInterfaceDiv = "";

var cookieHeader = ""
var nl2br = false;
var needCollapse = false;
var leftEnlarge = true;
function formatJson(){
    var rowData = originalResponseText;
    if( rowData == ""){
        rowData = $("#response-row").val();
    }
    if(rowData == ""){
        alert("Please click [Send] button to get a response");
        return false;
    }
    try {
        $.parseJSON( rowData );
    } catch (e) {
        console.warn(e);
        alert("Response data is not json");
        return;
    }
    if( $("#response-row").hasClass("hidden") == false){
        $("#response-row").addClass("hidden");
    }
    $("#response-pretty").removeClass("none");
    $("#response-pretty").JSONView(rowData);
    return true;
}

function changeBg(removeClass, addClass, selectClass,click_button){
    $("."+selectClass).removeClass(addClass);
    $("."+selectClass).addClass(removeClass);
    $(click_button).removeClass(removeClass);
    $(click_button).addClass(addClass);
}

function responseShow(showDiv){
    if( showDiv == "response-row"){
        if( $("#response-row").hasClass("hidden")){
            $("#response-row").removeClass("hidden");
        }
        if( $("#response-pretty").hasClass("none") == false){
            $("#response-pretty").addClass("none");
        }
    }else if( showDiv == "response-pretty"){
        if( $("#response-row").hasClass("hidden") == false){
            $("#response-row").addClass("hidden");
        }
        $("#response-pretty").removeClass("none");
    }

}

function getHeadersStr(){
    var headers = "";
    var texts = $("#headers-div input[type='text']");
    // 获取所有文本框
    var key = "";
    $.each(texts, function(i, val) {
        try {
            if(val.getAttribute("data-stage") == "value"){
                if(key.trim() != "" || val.value.trim() != ""){
                    headers += "&"+key + "=" + val.value
                }
            }else if(val.getAttribute("data-stage") == "key"){
                key = val.value;
            }
        } catch (ex) {
            console.warn(ex);
        }
    });
    return headers;
}

function getHeaders(){
    var texts = $("#headers-div tbody>tr");
    // 获取所有文本框
    var data = [];
    // post值注入
    if( $("#method").val() == "POST")
        data.push({'key': "Content-Type", "value": $('input:radio[name="param-type"]:checked').val()});

    $.each(texts, function(i, val) {
        var _key = $(val).find("input[data-stage=key]").val()
        var _val = $(val).find("input[data-stage=value]").val()

        if(_key.length>0 && _val.length>0) {
            data.push({'key': _key, 'value': _val})
        }
    });
    // 默认accect值注入
    if(!data['Accept']) {
        data.push({'key': 'Accept', 'value': 'application/json'})
    }
    return data;
}

function getParams(){
    var texts = $("#params-div input[type='text']");
    var data = "";
    // 获取所有文本框
    var key = "";

    $.each(texts, function(i, val) {
        try {
            if(val.getAttribute("data-stage")  == "value"){
                if( key != "") {
                    data += "&" + key + "=" + val.value;
                }
            }else if(val.getAttribute("data-stage")  == "key"){
                key = val.value;
            }
        } catch (ex) {
            console.warn(e);
            alert(ex);
        }
    });
    return data;
}

var originalResponseText = "";
function callAjax() {
    if ($("#url").val().trim() == ''){
        $("#response-row").val("Url can't be null!");
        $("#format-row").click();
        return;
    }
    originalResponseText = "";
    var url = $("#url").val().trim().split("?")[0] + "?";
    var method = $("#method").val();
    var urlParamsStr = "";
    var params =  getParams();

    // 表单参数优先url参数
    if( $("#url").val().indexOf("?") > 0){
        urlParamsStr = $("#url").val().split("?")[1];
        var urlParams = urlParamsStr.split("&");
        for(var i=0; i<urlParams.length; i++ ){
            if( urlParams[i] != "" && urlParams[i].indexOf("=") > 0){
                if(params.indexOf("&" + urlParams[i].split("=")[0]) < 0){
                    url += "&" + urlParams[i];
                }
            }
        }
    }
    if(  $.inArray($('input:radio[name="param-type"]:checked').val(), customerTypes) == -1) {
        params = (params.length > 0 ? params.substr(1) : params);
    }else{
        params = $("#customer-value").val();
    }

    url = url.replace("?&", '?');
    if( url.endWith("?")){
        url = url.substr(0 - url.length-1);
    }
    var httpTimeout = getHttpTimeout();
    $("#float").fadeIn(300);

    $.ajax({
        type : method,
        url : url,
        async : true,
        data : params,
        timeout: httpTimeout,
        beforeSend: function(request) {
            $.each(getHeaders(), function(i, n) {
                request.setRequestHeader(n.key, n.value)
            })
            $("#response-row").val("");
            $(".response-header .headers").html("");
            $(".response-header .general").html("");
            $("#response-pretty").html("");
            $(".response-cookie .table").append("");
            $("#format-row").click();
        },
        complete: function(responseData, textStatus){
            if(textStatus == "success" || (textStatus == "error" && responseData.responseText !== undefined)){
                try{
                    originalResponseText = responseData.responseText;
                    var data = responseData.responseText;
                    $("#response-row").val(data);
                    var head = responseData.getAllResponseHeaders().toString().huanhang();
                    $(".response-header .headers").html(head);
                    var general ="Request URL: " + url +"<br>Request Method: " + method +"<br>Status Code: " + responseData.status;
                    $(".response-header .general").html(general);
                    $("#response-pretty").html("");

                    var rootDomainStr =getRootDomain(url);
                    chrome.cookies.getAll({domain: rootDomainStr}, function(cookies){
                        $(".response-cookie .table tr").empty();
                        $(".response-cookie .table").append("<tr class='fb'><td>Name</td> <td>Value</td> <td>Path</td><td>Domain</td><td>ExpirationDate</td></tr>");
                        var a =  document.createElement('a');
                        a.href = url;
                        for(i=0; i<cookies.length;i++) {
                            if( ("."+a.host).endWith(cookies[i].domain) ){
                                var cookieStr = "<tr>";
                                cookieStr += "<td class='w-p-10 break-word'>" + cookies[i].name + "</td>";
                                cookieStr += "<td class='w-p-30 break-word'>"  + cookies[i].value + "</td>";
                                cookieStr += "<td class='w-p-20 break-word'>"  + cookies[i].path + "</td>";
                                cookieStr += "<td class='w-p-20 break-word'>" + cookies[i].domain +"</td>";
                                cookieStr += "<td class='w-p-20 break-word'>" + cookies[i].expirationDate +"</td>";
                                cookieStr += "</tr>";
                                $(".response-cookie .table").append(cookieStr)
                            }
                        }
                    });
                }catch(e){
                    $("#format-row").click();
                }

                try {
                    $.parseJSON( data );
                    $("#json-expand").click();
                } catch (e) {
                    $("#format-row").click();
                }
            }else{
                $("#response-row").val("textStatus: " + responseData.statusText);
                $("#format-row").click();
            }
            $("#float").fadeOut(300);
        }
    });
    if(url.indexOf("?") < 0){
        url += "?";
    }
    if( method == "GET"){
        if(params.trim() == ""){
            if(url.endWith("?") || url.endWith("&") ){
                url = url.substr(0, url.length-1);
            }
        }else{
            url = (url +"&"+ params).replace("&&", '&').replace("?&", '?');
        }
        $("#url").val(url);
    }

    // 记录历史
    try{
        var historys;
        try{
            historys = $.parseJSON( localStorage['crap-debug-history'] );
        }catch(e){
            historys = $.parseJSON( "[]" );
        }
        if(  $.inArray($('input:radio[name="param-type"]:checked').val(), customerTypes) == -1) {
            params = params.replace(/=/g, ":").replace(/&/g,"\n");
        }

        if( url.endWith("?")){
            url = url.substr(0, url.length-1);
        }

        var h  ={"paramType": $("input[name='param-type']:checked").val(), "name": $("#interface-name").val(),"method":method, "url" : url,
            "params" : params, "headers": getHeadersStr().replace(/=/g, ":").replace(/&/g,"\n")};

        // 如果已经存在则删除
        for(var i=0; i<historys.length;i++){
            if(JSON.stringify(historys[i]) == JSON.stringify(h)){
                historys.splice(i,1);
            }
        }

        historys.unshift(h);
        // 如果历史记录>20，则删除最后一个
        if(historys.length > 20){
            historys.pop();
        }
        localStorage['crap-debug-history'] = JSON.stringify(historys);
    }catch(e){
        console.warn(e);
    }
    getHistorys();
}

function getRootDomain(url) {
    var a =  document.createElement('a');
    a.href = url;
    var hosts =a.host.split('.');
    return hosts.length ==2 ? a.host : hosts[hosts.length-2]+"."+hosts[hosts.length-1];
}

// 数据存储
function getHistorys(){
    var historys;
    try{
        historys = $.parseJSON( localStorage['crap-debug-history'] );
    }catch(e){
        historys = $.parseJSON( "[]" );
        console.warn(e);
    }
    var historysText = "";
    for(var i=0 ; i<historys.length; i++){
        var title =  historys[i].name;
        if( handerStr(title) == ""){
            title = handerStr(historys[i].url);
        }
        historysText += "<div class='history-div' crap-data='"+JSON.stringify(historys[i])+"'>" + title +"</div>";
    }
    $("#historys").html(historysText);
}
// 数据存储
function getLocalModules(){
    // 模块对应的项目ID为 用户ID + "-debug"该项目模块下只有接口调试记录，可以共享，一个用户有且仅有一个调试目录
    var $modules = $("#modules");

    $modules.html('<i class="fa fa-spinner fa-spin p12"></i>')

    $.get('/apitest/data', function(res) {
        var moduleText = "";
        $.each(res.data, function(i, n) {

            moduleText += moduleDiv.replace(/ca_moduleId/g, i).replace(/ca_moduleName/g, i.replace(i[0],i[0].toUpperCase()));

            var interfaceText = "";
            $.each(n, function(j ,k) {
                // if(!k.name) {
                //     return true;
                // }
                interfaceText += interfaceDiv.replace(/ca_interfaceInfo/g, JSON.stringify(k))
								.replace(/ca_name/g, k.name)
								.replace(/ca_id/g, k.name)
                                .replace(/ca_moduleId/g, k.moduleid);

                if(k.methods.indexOf('GET')>-1){
                    interfaceText = interfaceText.replace("ca_methodIcon","fa-dot-circle-o");
                    interfaceText = interfaceText.replace("ca_method","GET");
                }else{
                    interfaceText = interfaceText.replace("ca_methodIcon","fa-dot-circle-o");
                    interfaceText = interfaceText.replace("ca_method","POST");
                }
            })
            moduleText = moduleText.replace("ca_interfaces", interfaceText);
        })

        $("#modules").html( moduleText );
    })
}
/**********删除接口*********/
function deleteInterface(moduleId, id) {
    var interfaces;
    try{
        interfaces = $.parseJSON( localStorage['crap-debug-interface-' + moduleId] )
    }catch(e){
        interfaces = $.parseJSON( "[]" );
        console.warn(e);
    }

    // 如果已经存在则删除
    for(var i=0; i<interfaces.length;i++){
        if(interfaces[i].id == id){
            interfaces[i].status = -1;
            break;
        }
    }
    localStorage['crap-debug-interface-' + moduleId] = JSON.stringify(interfaces);
    refreshSyncIco(0);
    return true;
}

function deleteModule(moduleId) {
    var modules;
    try{
        modules = $.parseJSON( localStorage['crap-debug-modules'] )
    }catch(e){
        modules = $.parseJSON( "[]" );
        console.warn(e);
    }

    // 如果已经存在则删除
    for(var i=0; i<modules.length;i++){
        if(modules[i].moduleId == moduleId){
            modules[i].status = -1;
            break;
        }
    }
    localStorage['crap-debug-modules'] = JSON.stringify(modules);
    refreshSyncIco(0);
    return true;
}


function renameModule(moduleId,moduleName) {
    var modules;
    try{
        modules = $.parseJSON( localStorage['crap-debug-modules'] )
    }catch(e){
        modules = $.parseJSON( "[]" );
        console.warn(e);
    }

    // 如果已经存在则删除
    for(var i=0; i<modules.length;i++){
        if(modules[i].moduleId == moduleId){
            modules[i].moduleName = moduleName;
            modules[i].version = modules[i].version + 1;
            break;
        }
    }
    localStorage['crap-debug-modules'] = JSON.stringify(modules);
    refreshSyncIco(0);
    return true;
}
function saveModule(moduleName, moduleId,version,status) {
    var modules;
    try {
        modules = $.parseJSON(localStorage['crap-debug-modules'])
    } catch (e) {
        modules = $.parseJSON("[]");
        console.warn(e);
    }
    // 如果已经存在则删除
    for(var i=0; i<modules.length;i++){
        if(modules[i].moduleId == moduleId) {
            if (version == 0) {
                version = modules[i].version + 1;
            }
            modules.splice(i, 1);
        }
    }
    var m = {"moduleName": moduleName, "moduleId": moduleId,"version": version,"status":status};
    modules.unshift(m);
    localStorage['crap-debug-modules'] = JSON.stringify(modules);
    refreshSyncIco(0);
    return modules;
}
function saveInterfaceDetail(moduleId, paramType, id, name, method, url, params, headers,version,status) {
    var interfaces;
    try {
        interfaces = $.parseJSON(localStorage['crap-debug-interface-' + moduleId])
    } catch (e) {
        interfaces = $.parseJSON("[]");
        console.warn(e);
    }
    var h = {
        "version": version,
        "paramType": paramType,
        "moduleId": moduleId,
        "id": id,
        "name": name,
        "method": method,
        "url": url,
        "params": params,
        "headers": headers,
        "version":version,
        "status":status
    };

    // 如果已经存在则删除
    for (var i = 0; i < interfaces.length; i++) {
        if (interfaces[i].id == h.id) {
            h.interfaceId = interfaces[i].interfaceId;
            h.status = interfaces[i].status;
            h.moduleId = interfaces[i].moduleId;
            if(version == 0) {
                h.version = interfaces[i].version + 1;
            }
            interfaces.splice(i, 1);
            break;
        }
    }
    interfaces.unshift(h);
    localStorage['crap-debug-interface-' + moduleId] = JSON.stringify(interfaces);
    refreshSyncIco(0);
}
// save interface and module
function saveInterface(moduleId, saveAs) {
    if( handerStr($("#url").val()) == ""){
        alert("Url can not be null");
        return false;
    }
    if( handerStr($("#save-interface-name").val()) == ""){
        alert("Interface name can not be null");
        return false;
    }
    // if moduleId is null,then create a new moduleId, but moduleNmae must be input
    if( handerStr($("#save-module-id").val()) == "" && handerStr(moduleId) == ""){
        moduleId = "ffff-"+new Date().getTime() + "-" + random(10);
        var moduleName = $("#save-module-name").val();
        if( handerStr(moduleName) == ""){
            alert("Module name can not be null");
            return;
        }
        // save module
        saveModule( moduleName, moduleId, 0, 1);
    }else{
        if( handerStr(moduleId) == "" ){
            moduleId = $("#save-module-id").val();
        }
    }

    // if interfaceId is null, meaning it's a new interface,should create a id
    // if id is not null, but saveAs is true,meaning should create a new interface base on the current interface,so id should be created
    var id = $("#interface-id").val();
    if( handerStr(id) == "" || saveAs){
        id = "ffff-"+new Date().getTime() + "-" + random(10);
    }

    var method = $("#method").val();
    var params =  getParams();

    // if params submit by form, then should format params, else mean param is custom and nothing need to do
    // as:
    // a:666
    // b:777
    var paramType = $('input:radio[name="param-type"]:checked').val();
    if(  $.inArray(paramType, customerTypes) == -1) {
        params = params.replace(/=/g, ":").replace(/&/g,"\n");
    }else{
        params = $("#customer-value").val();
    }

    var headers = getHeadersStr().replace(/=/g, ":").replace(/&/g,"\n");
    var paramType = "";
    if(method != "GET"){
        paramType = $("input[name='param-type']:checked").val()
    }

    var name = $("#save-interface-name").val();
    var url = $("#url").val();
    saveInterfaceDetail(moduleId, paramType, id, name, method, url, params, headers, 0, 1);
    closeMyDialog("dialog");
    getLocalModules();
    return true;
}

function intitSaveInterfaceDialog(){
    $("#save-interface-name").val($("#interface-name").val());
    // 循环获取所有module
    var modules;
    try{
        modules = $.parseJSON( localStorage['crap-debug-modules'] )
    }catch(e){
        modules = $.parseJSON( "[]" );
        console.warn(e);
    }
    $("#save-module-id").find("option").remove();
    $("#save-module-id").append("<option value='-1'>--Click to select module/folder--</option>");
    for(var i=0 ; i<modules.length; i++) {
        if(modules[i].status != -1) {
            $("#save-module-id").append("<option value='" + modules[i].moduleId + "'>" + modules[i].moduleName + "</option>");
        }
    }
    openDialog("Save interface:" + $("#interface-name").val(),500);
}

/****状态码转提示*************/
function getErrorTip(status){
	if(status == 404){
		return "-ERR_FILE_NOT_FOUND: file not found!";
	}
	if(status == 500){
		return "";
	}
}
/**********打开Dialog******************/
function openDialog(title,iwidth){
    if(!iwidth){
        iwidth = 400;
    }
    //对话框最高为浏览器的百分之80
    lookUp('dialog', '', '', iwidth ,7,'');
    $("#dialog-content").css("max-height",($(document).height()*0.8)+'px');
    showMessage('dialog','false',false,-1);
    showMessage('fade','false',false,-1);
    title = title? title:"edit";
    $("#dialog-title").html(title);
}
function closeMyDialog(tagDiv){
    iClose(tagDiv);
    iClose('fade');
}
/************************覆盖弹框**************************************/
function alert(tipMessage, tipTime, isSuccess, width){
    if( !width){
        width = 200;
    }
	tipTime = tipTime?tipTime:2;
	if(tipMessage!=""){
		if(tipMessage!="false"&&tipMessage!=false) {
            $("#tip-div").html(tipMessage);
            if (tipMessage.length > 35){
                width = 300;
            }
            if (tipMessage.length > 75){
                width = 500;
            }
            if (tipMessage.length > 150){
                width = 800;
            }
        }
	}
	$("#tip-div").css("left",  ($(window).width()/2 - width/2) +"px").css("width", width+"px");
    $("#tip-div").removeClass("text-success");
    $("#tip-div").removeClass("text-error");
    $("#tip-div").addClass("text-" + isSuccess);

	showMessage("tip-div",tipMessage,false,tipTime);
}
function myConfirm(message){
    var begin = Date.now();

    var result = window.confirm(message);
    var end = Date.now();
    if (end - begin < 10) {
        alert("Please do not disable popups,it's dangerous!", 5, "error", 500);
        return true;
    }
    return result;
}
/** *********************页面提示信息显示方法************************* */
/**
 * 显示的div，提示信息，是否晃动，自动隐藏时间：-1为不隐藏，其它为隐藏时间（单位秒) message
 * 为false时表示不需要提示信息，仅需要显示div即可
 */
function showMessage(id,message,ishake,time){
    if(message!=""){
        if(message!="false"&&message!=false)
            $("#"+id).html(message);
        $("#"+id).fadeIn(300);
        if(ishake){
            shake(id);
        }
        if(time!=-1){
            if(isNaN(time))
                time=2000;
            else if(time>0)
                time = time * 1000;
            setTimeout(function(){
                if(time!=0){
                    $("#"+id).fadeOut(500);
                }
                else{
                    $("#"+id).fadeOut(300);
                }
                $("#"+id).hide("fast");
            },time);
        }
    }
}
// 晃动div
function shake(o){
    var $panel = $("#"+o);
    var box_left =0;
    $panel.css({'left': box_left});
    for(var i=1; 4>=i; i++){
        $panel.animate({left:box_left-(8-2*i)},50);
        $panel.animate({left:box_left+2*(8-2*i)},50);
    }
}
/*******************************************************************************
 * 根据点击位置设置div左边
 *
 * @param id
 * @param e
 *            为空时，局浏览器中部
 * @param lHeight
 * @param lWidth
 * @param onMouse
 *            div是否覆盖点击的点:(0).不覆盖，div居浏览器中部 (1).X轴居中 (2).Y轴居中 (3).X、Y轴均居中
 *            (4).右下方,(5).id左下方 6:居中，不需要考虑浏览器滚动 7：居中，高度不定，最大不超过浏览器80%
 */
function lookUp(id, e, lHeight, lWidth ,onMouse, positionId) {
    var lObj = self.document.getElementById(id);
    var lTop;
    var lLeft;
    //居中，高度不定，最大不超过浏览器80%
    if(onMouse==7){
        lLeft=$(window).width()/2 - (lWidth/2);
        lObj.style.top = '200px';
        lObj.style.width = lWidth + 'px';
        lObj.style.height = "auto";
        lObj.style.left = lLeft + 'px';
        return;
    }

    //如果传入了event
    if(e.clientY&&onMouse&&onMouse!=0){
        lTop = e.clientY;
        lLeft = e.clientX;
        if(onMouse==1){
            lLeft = lLeft - (lWidth/2);
        }else if(onMouse==2){
            lTop = lTop - (lHeight/2);
        }
        else if(onMouse==3){
            lTop = lTop - (lHeight/2);
            lLeft = lLeft - (lWidth/2);
        }else if(onMouse==4){
            lTop = e.clientY;
            lLeft = e.clientX;
        }
    }else{
        lTop=$(window).height()/2 - (lHeight/2);
        lLeft=$(window).width()/2 - (lWidth/2);
    }
    if(onMouse==5){
        lTop = $("#"+positionId).offset().top+$("#"+positionId).outerHeight()-1;
        lLeft = $("#"+positionId).offset().left-1;
    }
    if (lLeft < 0) lLeft = 5;
    if ((lLeft + lWidth*1) > $(window).width()) lLeft = $(window).width() - lWidth - 20;
    if ((lTop + lHeight*1) > $(window).height()) lTop =  $(window).height() - lHeight - 70;

    lObj.style.width = lWidth + 'px';
    lObj.style.left = (lLeft + document.documentElement.scrollLeft) + 'px';

    lObj.style.height = lHeight + 'px';
    lObj.style.top =  lTop + 'px';
}

/**************************** 隐藏div *******************************/
function iClose(id){
    $("#"+id).fadeOut(300);
}
function iShow(id){
    $("#"+id).fadeIn(300);
}

String.prototype.endWith=function(endStr){
    var str = this;
    if(endStr.length == 0 || this.length == 0){
        return false;
    }
    if(str.length < endStr.length){
        return false;
    }
    str = str.substr(str.length - endStr.length);
    return (str == endStr)
}
String.prototype.trim = function () {
    return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}
String.prototype.huanhang = function () {
    return this.replace(/\n/g, "<br>");
}
function handerStr(str){
    if( !str || str.trim() == "" || str == "NaN" || str == "undefined" || str == "-1"){
        return "";
    }
    return str.trim();
}
function random(n) {
    var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    var res = "";
        for(var i = 0; i < n ; i ++) {
            var id = Math.ceil(Math.random()*35);
            res += chars[id];
        }
        return res;
}
//chrome.windows.create({url :"debug.html" },function(){});//函数后面都有一个functon(){},这个应该标识执行函数的意思吧。
/**
 * 刷新是否同步颜色标识
 * -1：初始化，从数据库读取
 * 1：同步
 * 0：有未同步数据
 * @param isSync
 */
function refreshSyncIco(isSync){
    var key = "crap-debug-isSync";
    var value = "";
    if(isSync == -1){
        value = getLoaclData(key);
    }else if(isSync == 1){
        value = "true";
        saveLoaclData(key, value);
    }else if(isSync == 0){
        value = "false";
        saveLoaclData(key, value);
    }
    $("#synch-ico").removeClass("GET");
    $("#synch-ico").removeClass("POST");
    if(value == "true"){
        $("#synch-ico").addClass("GET");
    }else if(value == "false"){
        $("#synch-ico").addClass("POST");
    }
}

$(function(){
    getLocalModules();
    //getHistorys();
    //openMyDialog("title",500);
    var pageName = getValue("id-page-name")
    if (pageName == "debug"){
        refreshSyncIco(-1);
    } else if (pageName == "setting"){
        $("#website-url").val(getWebSiteUrl());
        $("#http-timeout").val(getHttpTimeout());
    }

    $("#synch").click(function(){
        $("#float").fadeIn(300);
        var modules;
        try{
            modules = $.parseJSON( localStorage['crap-debug-modules'] )
        }catch(e){
            modules = $.parseJSON( "[]" );
            console.warn(e);
        }
        var moduleText = "[";
        var separator = "";
        for(var i=0 ; i<modules.length; i++){
            moduleText += separator + "{\"status\":" + modules[i].status +",\"version\":" + modules[i].version +",\"moduleId\":\"" + modules[i].moduleId +"\",\"moduleName\":\"" + modules[i].moduleName + "\"";
            var debugs;
            try{
                debugs = $.parseJSON( localStorage['crap-debug-interface-' + modules[i].moduleId] );
            }catch(e){
                debugs = $.parseJSON( "[]" );
                console.warn(e);
            }
            moduleText += ",\"debugs\":" + JSON.stringify(debugs) +"}";
            separator = ",";
        }
        moduleText = moduleText +"]";
        $.ajax({
            type : "POST",
            url : getWebSiteUrl() + "/user/crapDebug/synch.do",
            async : true,
            data : moduleText,
            beforeSend: function(request) {
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            },
            complete: function(responseData, textStatus){
                if(textStatus == "error"){
                    alert("Status:" + responseData.status + "\nStatusText:" + responseData.statusText +"\nTextStatus: " + textStatus);
                }
                else if(textStatus == "success"){
                    clearLocalStorage();
                    var responseJson = $.parseJSON(responseData.responseText);
                    if( responseJson.success == 1){
                        responseJson = responseJson.data;
                        // 存储服务器同步的数据
                        for(var i=responseJson.length-1;i>=0; i--){
                            if(responseJson[i].status == -1){
                                continue;
                            }
                            saveModule(responseJson[i].moduleName, responseJson[i].moduleId, responseJson[i].version, responseJson[i].status);
                            var debugs = responseJson[i].debugs;
                            for(var j=debugs.length-1;j>=0;j--){
                                saveInterfaceDetail(debugs[j].moduleId, debugs[j].paramType, debugs[j].id, debugs[j].name, debugs[j].method,
                                    debugs[j].url, debugs[j].params, debugs[j].headers, debugs[j].version, debugs[j].status);
                            }
                        }

                        getLocalModules();
                        alert("success!",3,"success");
                        refreshSyncIco(1);
                    }else{
                        alert(responseJson.error.message,5,"error");
                    }
                }else{
                    alert("Status:" + responseData.status + "\nStatusText:" + responseData.statusText +"\nTextStatus: " + textStatus);
                }
                $("#float").fadeOut(300);
            }
        });
    });
    $("#historys-title").click(function(){
        $("#historys").removeClass("none");
        $("#modules").addClass("none");
        $("#modules-title").removeClass("bb3");
        $(this).addClass("bb3");
        getHistorys();
    });
    $("#modules-title").click(function(){
        $("#historys").addClass("none");
        $("#modules").removeClass("none");
        $("#historys-title").removeClass("bb3");
        $(this).addClass("bb3");
        // getLocalModules();
    });

    var saveAs = true;
    // 保存
    $("#save-interface").click(function(){
        if( handerStr($("#interface-id").val()) == "" || handerStr($("#module-id").val())== ""){
            saveAs = false;
            intitSaveInterfaceDialog();
        }else{
            // 直接保存
            $("#save-interface-name").val($("#interface-name").val());
            var moduleId = $("#module-id").val();
            if( saveInterface(moduleId) ){
                alert("Success !");
            }
        }
    });

    // 另存为
    $("#save-as-interface").click(function(){
        saveAs = true;
        intitSaveInterfaceDialog();
    });

    $("#save-interface-submit").click(function(){
        saveInterface("", saveAs);
    });

    $(".close-dialog").click(function(){
        var id = $(this).attr("crap-data");
        closeMyDialog(id);
    });
    $("#clear-local-data").click(function(){
        if(!myConfirm("Are you sure you want to delete local data? ")){
            return false;
        }
        clearLocalStorage();
        getLocalModules();
        $.ajax({
            type : "POST",
            url : getWebSiteUrl()+"/back/loginOut.do",
            async : true,
            data : "",
            complete: function(responseData, textStatus){
                if(textStatus == "error"){
                    alert("Clear local data success, But LogOut fail!", 5, "error", 500);
                }
                else if(textStatus == "success"){
                    alert("Clear local data success, LogOut success!", 5, "success", 500);
                }else{
                    alert("Clear local data success, But LogOut fail!", 5, "error", 500);
                }
                $("#float").fadeOut(300);
            }
        });
    });


    $("#modules").on("click",".j_interface", function() {
        var urlInfo = $.parseJSON( $(this).attr("crap-data") );

        console.log(urlInfo);

        $("#url").val(urlInfo.path);
        $("#interface-id").val(urlInfo.id);
        $("#module-id").val(urlInfo.moduleId);
        $("#interface-name").val(handerStr(urlInfo.name));
        $("#headers-bulk").val(urlInfo.headers);
        $("#method").val(urlInfo.methods);
        $("#method").change();

        if($.inArray(urlInfo.paramType, customerTypes) == -1){
            urlInfo.paramType = "x-www-form-urlencoded;charset=UTF-8";
            $("#param-type-value").prop("checked",true);
            $("#params-bulk").val(urlInfo.params);
            $(".key-value-edit").click();
        }else{
            $("#customer-type-value").prop("checked",true);
            // 下拉选择 customer-type
            $("#customer-type").val(urlInfo.paramType);
            $("#customer-type").change();
            $("#customer-value").val(urlInfo.params);
        }
        $("input[name='param-type']").change();

        $(".j_interface").removeClass("bg-main");
        $(this).addClass("bg-main");

    });

    $("#historys").on("click","div", function() {
        var urlInfo = $.parseJSON( $(this).attr("crap-data") );
        $("#url").val(urlInfo.url);
        $("#interface-id").val("-1");
        $("#module-id").val("-1");
        $("#interface-name").val(handerStr(urlInfo.name));
        $("#headers-bulk").val(urlInfo.headers);
        $("#method").val(urlInfo.method);
        $("#method").change();

        if($.inArray(urlInfo.paramType, customerTypes) == -1){
            urlInfo.paramType = "x-www-form-urlencoded;charset=UTF-8";
            $("#param-type-value").prop("checked",true);
            $("#params-bulk").val(urlInfo.params);
            $(".key-value-edit").click();
        }else{
            $("#customer-type-value").prop("checked",true);
            // 下拉选择 customer-type
            $("#customer-type").val(urlInfo.paramType);
            $("#customer-type").change();
            $("#customer-value").val(urlInfo.params);
        }
        $("input[name='param-type']").change();


        $(".history-div").removeClass("bg-main");
        $(this).addClass("bg-main");
    });

    $("#new-interface").click(function() {
        $("#interface-name").val("");
        $("#headers-bulk").val("");
        $("#params-bulk").val("");
        $("#url").val("");
        $("#interface-id").val("-1");
        $("#module-id").val("-1");
        $("#method").val("GET");
        $("#method").change();

        $("#param-type-value").prop("checked",true);
        $("#params-bulk").val("");
        $(".key-value-edit").click();
        $("input[name='param-type']").change();

        $(".interface").removeClass("bg-main");
        $(".history-div").removeClass("bg-main");
    });
    $("#save-module-submit").click(function() {
       if($("#rename-module-name").val() == ""){
           alert("Module name can not be empty!", 5, "error", 300);
           return false;
       }
        renameModule( $("#rename-module-id").val(), $("#rename-module-name").val());
        getLocalModules();
        closeMyDialog("dialog2");
    });

    /******删除接口*********/
	$("#modules").on("click",".delete-interface", function() {
        if(!myConfirm("Are you sure you want to delete? "))
        {
            return false;
        }
        var ids = $(this).attr("crap-data").split("|");
		deleteInterface(ids[0],ids[1]);
		getLocalModules();
		return false;// 不在传递至父容器
    });
    /*******上移接口**********/
    $("#modules").on("click",".up-interface", function() {
        var ids = $(this).attr("crap-data").split("|");
        upInterface(ids[0],ids[1]);
        getLocalModules();
        return false;// 不在传递至父容器
    });
    /*******下移接口**********/
    $("#modules").on("click",".down-interface", function() {
        var ids = $(this).attr("crap-data").split("|");
        downInterface(ids[0],ids[1]);
        getLocalModules();
        return false;// 不在传递至父容器
    });

    $("#modules").on("click",".delete-module", function() {
        if(!myConfirm("Are you sure you want to delete? "))
        {
            return false;
        }
        var moduleId = $(this).attr("crap-data");
        deleteModule(moduleId);
        getLocalModules();
        return false;// 不在传递至父容器
    });
    /*******上移**********/
    $("#modules").on("click",".up-module", function() {
        var moduleId = $(this).attr("crap-data");
        upModule(moduleId);
        getLocalModules();
        return false;// 不在传递至父容器
    });
    /*******下移**********/
    $("#modules").on("click",".down-module", function() {
        var moduleId = $(this).attr("crap-data");
        downModule(moduleId);
        getLocalModules();
        return false;// 不在传递至父容器
    });

    $("#modules").on("click",".rename-module", function() {
        var moduleId = $(this).attr("crap-data");
        $("#rename-module-id").val(moduleId);
        lookUp('dialog2', '', '', 400 ,7,'');
        $("#dialog-content").css("max-height",($(document).height()*0.8)+'px');
        showMessage('dialog2','false',false,-1);
        showMessage('fade','false',false,-1);
        return false;// 不在传递至父容器
    });


    $("#left-enlarge").click(function(){
        if( !leftEnlarge){
            leftEnlarge = true;
            $("#left").css("width","18%");
            $("#right").css("width","82%");
            $("#left-enlarge div").html("<i class='fa'>&#xe605;</i>");
        }else{
            leftEnlarge = false;
            $("#left").css("width","0%");
            $("#right").css("width","100%");
            $("#left-enlarge div").html("<i class='fa'>&#xe641;</i>");
        }

    });
	$("#open-debug").click(function(){
			window.open("debug.html")
	});
    $("#open-json").click(function(){
        window.open("json.html")
    });
    $("#set-web-site").click(function(){
        window.open("setting.html")
    });
    $("#set-website-button").click(function(){
        setWebSiteUrl($("#website-url").val());
    });
    $("#http-timeout-button").click(function(){
        setHttpTimeout($("#http-timeout").val());
    });
    $("#login-button").click(function(){
        window.open(getWebSiteUrl() + "/loginOrRegister.do#/login");
    });


	$(".params-headers-table").on("keyup","input", function() {
      if($(this).val() != ''){
          var tr = $(this).parent().parent();
          if( tr.hasClass("last") ){
              var table = tr.parent();
              table.append(paramsTr);
              tr.removeClass("last");
          }
      }
    });

	// 当前是否显示批量编辑
	var showBulkParams = false;
	var showBulkHeaders = false;

	// 批量编辑
	$(".bulk-edit").click(function(){
       var preId = $(this).attr("crap-data-value");
	   if( preId == "headers"){
		   showBulkHeaders = true;
	   }
	   if( preId == "params"){
			showBulkParams = true;
	   }
	   $("#"+preId+"-table").addClass("none");
	   $("#"+preId+"-bulk-edit-div").removeClass("none");
	    var bulkParams = "";
	    var texts = $("#"+preId+"-div input[type='text']");
		// 获取所有文本框
		var key = "";
		$.each(texts, function(i, val) {
			   try {
				   if(val.getAttribute("data-stage") == "value"){
					   var p = key+":" + val.value;
					   if( p != ":"){
						   bulkParams += p + "\n";
					   }
				   }else if(val.getAttribute("data-stage") == "key"){
						key = val.value;
				   }
			   } catch (ex) { }
		});
		$("#"+preId+"-bulk").val(bulkParams);
    });

	// key-value编辑
	$(".key-value-edit").click(function(){
       var preId = $(this).attr("crap-data-value");
	   if( preId == "headers"){
		   showBulkHeaders = false;
	   }
	   if( preId == "params"){
			showBulkParams = false;
	   }
	   $("#"+preId+"-table").removeClass("none");
	   $("#"+preId+"-bulk-edit-div").addClass("none");
	    var bulkParams = $("#"+preId+"-bulk").val();
		var params = bulkParams.split("\n");
		$("#"+preId+"-table tbody").empty();
	    for(var i=0 ; i< params.length; i++){
			if( params[i].trim() != ""){
				var p = params[i].split(":");
				if(p.length>2){
                    for(var j=2 ; j< p.length; j++){
                        p[1] = p[1] +":" + p[j];
                    }
                }
				var key = p[0];
				var value = "";
				if(p.length >1 ){
					value = p[1];
				}
				var tdText = paramsTr.replace("'key'","'key' value='"+key+"'").replace("'value'","'value' value='"+value+"'");
				tdText = tdText.replace("last","");
				$("#"+preId+"-table tbody").append(tdText);
			}
		}
		$("#"+preId+"-table tbody").append(paramsTr);
    });

	$("#format-row").click(function(){
	    var rowData = originalResponseText;
	    if( rowData == ""){
            originalResponseText = $("#response-row").val();
            rowData = originalResponseText;
        }
        changeBg("btn-default", "btn-main", "response-menu",this);
        $("#response-row").val(rowData);
        responseShow("response-row");
        $('#response-row').removeAttr("readonly");
        originalResponseText = "";
    });

    $("#format-pretty").click(function(){
        var rowData = originalResponseText;
        if( rowData == ""){
            originalResponseText = $("#response-row").val();
            rowData = originalResponseText;
        }
        try{
            var jsonFormatResult = format(rowData);
            if (jsonFormatResult != null && jsonFormatResult != '') {
                $("#response-row").val(jsonFormatResult);
            }
        }catch(e){
            console.warn(e)
            $("#response-row").val(rowData);
        }
        changeBg("btn-default", "btn-main", "response-menu",this);
        $('#response-row').attr("readonly","readonly");
        responseShow("response-row");
    });

    $('.response-json').on('click', function() {
       if( !formatJson() ){
            return;
       }
       changeBg("btn-default", "btn-main", "response-menu",this);
	   var value = $(this).attr("crap-data-value");
	   var key = $(this).attr("crap-data-name");
       $('#response-pretty').JSONView(key, value);
       responseShow("response-pretty");
    });

    $(".params-headers-table").on("click","i",function() {
        var tr = $(this).parent().parent();
        // 最后一行不允许删除
        if( tr.hasClass("last")){
            return;
        }
        tr.remove();
    });

    // 请求头、参数切换
  $(".params-title").click(function(){
        $(".params-title").removeClass("bb3");
        $(this).addClass("bb3");
        var contentDiv = $(this).attr("data-stage");
        $("#headers-div").addClass("none");
        $("#params-div").addClass("none");
        $("#"+contentDiv).removeClass("none");
  });

    $(".response-title").click(function(){
        $(".response-title").removeClass("bb3");

        $(this).addClass("bb3");
        var contentDiv = $(this).attr("data-stage");
        $(".response-header").addClass("none");
        $(".response-body").addClass("none");
        $(".response-cookie").addClass("none");
        $("."+contentDiv).removeClass("none");
    });



    $("#method").change(function() {
        if( $("#method").val() == "POST" || $("#method").val() == "PUT"){
            if($("#content-type").hasClass("none")){
                $("#content-type").removeClass("none");
            }
        }else{
            if(!$("#content-type").hasClass("none")){
                $("#content-type").addClass("none");
            }
        }
    });

    // param-type=customer
    $("#customer-type").change(function() {
        $("#customer-type-value").val( $("#customer-type").val() );
    });
    // 单选param-type监控
    $("input[name='param-type']").change(function(){
        var crapData = $("input[name='param-type']:checked").attr("crap-data");
        if( crapData && crapData=="customer") {
            $("#customer-type").removeClass("none")
            $("#params-table").addClass("none");
            $("#customer-div").removeClass("none");
        }else{
            $("#customer-type").addClass("none");
            $("#customer-div").addClass("none");
            $("#params-table").removeClass("none");
        }
    });

  // 插件调试send
  $("#send").click(function(){
	  if( showBulkHeaders ){
		 $("#headers-bulk-edit-div .key-value-edit").click();
	  }
	  if( showBulkParams ){
		 $("#params-bulk-edit-div .key-value-edit").click();
	  }
      callAjax();
  });

  // div 拖动
    $("#left").resizable(
        {
            autoHide: true,
            handles: 'e',
            maxWidth: 800,
            minWidth: 260,
            resize: function(e, ui)
            {
                var parentWidth = $(window).width();
                var remainingSpace = parentWidth - ui.element.width();

                divTwo = $("#right"),
                    divTwoWidth = remainingSpace/parentWidth*100+"%";
                divTwo.width(divTwoWidth);
            },
            stop: function(e, ui)
            {
                var parentWidth = $(window).width();
                var remainingSpace = parentWidth - ui.element.width();
                divTwo = $("#right");
                divTwoWidth = remainingSpace/parentWidth*100+"%";
                divTwo.width(divTwoWidth);
                ui.element.css(
                    {
                        width: ui.element.width()/parentWidth*100+"%",
                    });
            }
        });
})
