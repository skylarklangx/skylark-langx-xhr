/**
 * skylark-net-http - The skylark http  library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx-ns/ns","skylark-langx-types","skylark-langx-objects","skylark-langx-arrays","skylark-langx-funcs","skylark-langx-async/Deferred","skylark-langx-emitter/Evented","./http"],function(skylark,types,objects,arrays,funcs,Deferred,Evented,http){var each=objects.each,mixin=objects.mixin,noop=funcs.noop,isArray=types.isArray,isFunction=types.isFunction,isPlainObject=types.isPlainObject,type=types.type,getAbsoluteUrl=function(e){return a||(a=document.createElement("a")),a.href=e,a.href},a,Xhr=function(){var jsonpID=0,key,name,rscript=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,scriptTypeRE=/^(?:text|application)\/javascript/i,xmlTypeRE=/^(?:text|application)\/xml/i,jsonType="application/json",htmlType="text/html",blankRE=/^\s*$/,XhrDefaultOptions={async:!0,type:"GET",beforeSend:noop,success:noop,error:noop,complete:noop,context:null,global:!0,accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:"application/json",xml:"application/xml, text/xml",html:"text/html",text:"text/plain"},crossDomain:!1,timeout:0,processData:!1,cache:!0,traditional:!1,xhrFields:{withCredentials:!1}};function mimeToDataType(e){if(e&&(e=e.split(";",2)[0]),e){if(e==htmlType)return"html";if(e==jsonType)return"json";if(scriptTypeRE.test(e))return"script";if(xmlTypeRE.test(e))return"xml"}return"text"}function appendQuery(e,t){return""==t?e:(e+"&"+t).replace(/[&?]{1,2}/,"?")}function serializeData(e){e.data=e.data||e.query,e.processData&&e.data&&"string"!=type(e.data)&&(e.data=param(e.data,e.traditional)),!e.data||e.type&&"GET"!=e.type.toUpperCase()||(e.url=appendQuery(e.url,e.data),e.data=void 0)}function serialize(e,t,r,n){var a,s=isArray(t),o=isPlainObject(t);each(t,function(t,i){a=type(i),n&&(t=r?n:n+"["+(o||"object"==a||"array"==a?t:"")+"]"),!n&&s?e.add(i.name,i.value):"array"==a||!r&&"object"==a?serialize(e,i,r,t):e.add(t,i)})}var param=function(e,t){var r=[];return r.add=function(e,t){isFunction(t)&&(t=t()),null==t&&(t=""),this.push(encodeURIComponent(e)+"="+encodeURIComponent(t))},serialize(r,e,t),r.join("&").replace(/%20/g,"+")},Xhr=Evented.inherit({klassName:"Xhr",_request:function(args){var _=this._,self=this,options=mixin({},XhrDefaultOptions,_.options,args),xhr=_.xhr=new XMLHttpRequest;serializeData(options),options.beforeSend&&options.beforeSend.call(this,xhr,options);var dataType=options.dataType||options.handleAs,mime=options.mimeType||options.accepts[dataType],headers=options.headers,xhrFields=options.xhrFields,isFormData=options.data&&options.data instanceof FormData,basicAuthorizationToken=options.basicAuthorizationToken,type=options.type,url=options.url,async=options.async,user=options.user,password=options.password,deferred=new Deferred,contentType=!isFormData&&"application/x-www-form-urlencoded";if(xhrFields)for(name in xhrFields)xhr[name]=xhrFields[name];mime&&mime.indexOf(",")>-1&&(mime=mime.split(",",2)[0]),mime&&xhr.overrideMimeType&&xhr.overrideMimeType(mime);var finish=function(){xhr.onloadend=noop,xhr.onabort=noop,xhr.onprogress=noop,xhr.ontimeout=noop,xhr=null},onloadend=function(){var result,error=!1;if(xhr.status>=200&&xhr.status<300||304==xhr.status||0==xhr.status&&getAbsoluteUrl(url).startsWith("file:")){dataType=dataType||mimeToDataType(options.mimeType||xhr.getResponseHeader("content-type")),result=xhr.responseText;try{"script"==dataType?eval(result):"xml"==dataType?result=xhr.responseXML:"json"==dataType?result=blankRE.test(result)?null:JSON.parse(result):"blob"==dataType?result=Blob([xhrObj.response]):"arraybuffer"==dataType&&(result=xhr.reponse)}catch(e){error=e}error?deferred.reject(error,xhr.status,xhr):deferred.resolve(result,xhr.status,xhr)}else deferred.reject(new Error(xhr.statusText),xhr.status,xhr);finish()},onabort=function(){deferred&&deferred.reject(new Error("abort"),xhr.status,xhr),finish()},ontimeout=function(){deferred&&deferred.reject(new Error("timeout"),xhr.status,xhr),finish()},onprogress=function(e){deferred&&deferred.notify(e,xhr.status,xhr)};if(xhr.onloadend=onloadend,xhr.onabort=onabort,xhr.ontimeout=ontimeout,xhr.onprogress=onprogress,xhr.open(type,url,async,user,password),headers)for(var key in headers){var value=headers[key];"content-type"===key.toLowerCase()?contentType=value:xhr.setRequestHeader(key,value)}return contentType&&!1!==contentType&&xhr.setRequestHeader("Content-Type",contentType),headers&&"X-Requested-With"in headers||xhr.setRequestHeader("X-Requested-With","XMLHttpRequest"),basicAuthorizationToken&&xhr.setRequestHeader("Authorization",basicAuthorizationToken),xhr.send(options.data?options.data:null),deferred.promise},abort:function(){var e=this._.xhr;e&&e.abort()},request:function(e){return this._request(e)},get:function(e){return(e=e||{}).type="GET",this._request(e)},post:function(e){return(e=e||{}).type="POST",this._request(e)},patch:function(e){return(e=e||{}).type="PATCH",this._request(e)},put:function(e){return(e=e||{}).type="PUT",this._request(e)},del:function(e){return(e=e||{}).type="DELETE",this._request(e)},init:function(e){this._={options:e||{}}}});return["request","get","post","put","del","patch"].forEach(function(e){Xhr[e]=function(t,r){return new Xhr({url:t})[e](r)}}),Xhr.defaultOptions=XhrDefaultOptions,Xhr.param=param,Xhr}();return http.Xhr=Xhr});
//# sourceMappingURL=sourcemaps/Xhr.js.map
