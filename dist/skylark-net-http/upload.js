/**
 * skylark-net-http - The skylark http  library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx-types","skylark-langx-objects","skylark-langx-arrays","skylark-langx-async/Deferred","skylark-langx-emitter/Evented","./Xhr","./http"],function(e,t,n,i,s,a,o){var l=Blob.prototype.slice||Blob.prototype.webkitSlice||Blob.prototype.mozSlice,r=s.inherit({klassName:"Upload",_construct:function(e){this._options=t.mixin({debug:!1,url:"/upload",maxConnections:999,maxChunkSize:void 0,onProgress:function(e,t,n,i){},onComplete:function(e,t){},onCancel:function(e,t){},onFailure:function(e,t,n){}},e),this._queue=[],this._params=[],this._files=[],this._xhrs=[],this._loaded=[]},add:function(e){return this._files.push(e)-1},send:function(e,n){if(this._files[e]&&!(this._queue.indexOf(e)>-1)){var i=this._queue.push(e),s=t.clone(n);this._params[e]=s,i<=this._options.maxConnections&&this._send(e,this._params[e])}},sendAll:function(e){for(var t=0;t<this._files.length;t++)this.send(t,e)},cancel:function(e){this._cancel(e),this._dequeue(e)},cancelAll:function(){for(var e=0;e<this._queue.length;e++)this._cancel(this._queue[e]);this._queue=[]},getName:function(e){var t=this._files[e];return null!=t.fileName?t.fileName:t.name},getSize:function(e){var t=this._files[e];return null!=t.fileSize?t.fileSize:t.size},getLoaded:function(e){return this._loaded[e]||0},_send:function(e,t){var n,i=this._options,s=this.getName(e),o=this.getSize(e),r=i.maxChunkSize||0,u=0,h=this._files[e],d={headers:{}};this._loaded[e]=this._loaded[e]||0;var _=this._xhrs[e]=new a({url:i.url});if(r)d.data=l.call(h,this._loaded[e],this._loaded[e]+r,h.type),n=d.data.size,d.headers["content-range"]="bytes "+this._loaded[e]+"-"+(this._loaded[e]+n-1)+"/"+o,d.headers["Content-Type"]="application/octet-stream";else{n=o;var c=t.formParamName,f=t.formData;c?(f||(f=new FormData),f.append(c,h),d.data=f):(d.headers["Content-Type"]=h.type||"application/octet-stream",d.data=h)}var p=this;_.post(d).progress(function(t){t.lengthComputable&&(u+=t.loaded,p._loaded[e]=p._loaded[e]+t.loaded,p._options.onProgress(e,s,p._loaded[e],o))}).then(function(){p._files[e]&&(u<n&&(p._loaded[e]=p._loaded[e]+n-u,p._options.onProgress(e,s,p._loaded[e],o)),p._loaded[e]<o?p._send(e,t):(p._options.onComplete(e,s),p._files[e]=null,p._xhrs[e]=null,p._dequeue(e)))}).catch(function(t){p._options.onFailure(e,s,t),p._files[e]=null,p._xhrs[e]=null,p._dequeue(e)})},_cancel:function(e){this._options.onCancel(e,this.getName(e)),this._files[e]=null,this._xhrs[e]&&(this._xhrs[e].abort(),this._xhrs[e]=null)},getQueue:function(){return this._queue},_dequeue:function(e){var t=n.inArray(e,this._queue);this._queue.splice(t,1);var i=this._options.maxConnections;if(this._queue.length>=i&&t<i){var s=this._queue[i-1];this._send(s,this._params[s])}}});return r.send=function(e,t){var n=new r(t);return n.add(e),n.send()},r.sendAll=function(e,t){for(var n=new r(t),i=0,s=e.length;i<s;i++)this.add(file[i]);return n.send()},o.Upload=r});
//# sourceMappingURL=sourcemaps/Upload.js.map
