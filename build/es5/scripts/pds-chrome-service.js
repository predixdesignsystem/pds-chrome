/**
 * @license
 * Copyright (c) 2018, General Electric
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function(a,b){'use strict';'function'===typeof define&&define.amd?define([],b):'object'===('undefined'===typeof module?'undefined':babelHelpers.typeof(module))&&module.exports?module.exports=b():a.PDSChromeService=b()})(this,function(){function a(a,b){return!0===b?!0===b&&a&&'string'===typeof a?void g.util.getJSON('/config/nav/'+a,function(a){}):void(!0===b&&g.util.getJSON('/config/',function(a){})):void window.dispatchEvent(new CustomEvent('app-hub-navigation-items-changed',{detail:{mainItems:window.nav.main.items}}))}function b(a){for(var b=Object.keys(a),c={},d=0;d<b.length;d++)c[a[b[d]]]=b[d];return c}function c(a){for(var b=Object.keys(a),c=[],d=0;d<b.length;d++)c.push([b[d],a[b[d]]]);return c}function d(a,b){return 0===b.indexOf(a)?b:a+b}function e(a,b){return b.slice(-1*a.length)===a?b:b+a}function f(a){for(var b=f.options,c=b.parser[b.strictMode?'strict':'loose'].exec(a),d={},e=14;e--;)d[b.key[e]]=c[e]||'';return d[b.q.name]={},d[b.key[12]].replace(b.q.parser,function(a,c,e){c&&(d[b.q.name][c]=e)}),d}var g=function(a){var d=a||{};return this._appName=d.appName,this._appPathById=d.appPaths,this._appIdByPath=b(d.appPaths),this._appPathPairs=c(d.appPaths),this._appContextPath=d.appContextPath,this._appLocaleData=d.appLocaleData,this._mainItems=d.mainItems,this._profileItems=d.profileItems,this._settingsItems=d.settingsItems,this._globalSource=d.globalSource||null,this._window=d.window||window,this};return g.fromGlobal=function(a){var b='string'===typeof a.appName?a.appName:'',c='object'===babelHelpers.typeof(a.paths)?a.paths:{},d='string'===typeof a.contextPath?a.contextPath:'',e='object'===babelHelpers.typeof(a.localeData)?a.localeData:{},f='object'===babelHelpers.typeof(a.user)?a.user:{},h='object'===babelHelpers.typeof(a.main)&&Array.isArray(a.main.items)?a.main.items:[],i='object'===babelHelpers.typeof(a.profile)&&Array.isArray(a.profile.items)?a.profile.items:[],j='object'===babelHelpers.typeof(a.settings)&&Array.isArray(a.settings.items)?a.settings.items:[];return new g({appName:b,appPaths:c,appContextPath:d,appLocaleData:e,userInfo:f,mainItems:h,profileItems:i,settingsItems:j,globalSource:a})},g.prototype.getMicroAppPath=function(a,b){var c='string'===typeof a&&0<a.length?a:this.getCurrentMicroAppId(),d=this._appPathById[c];return d?!0===b?d:g.util.addChromelessQuery(d):null},g.prototype.getPath=g.prototype.getMicroAppPath,g.prototype.getMicroAppId=function(a){var b=a,c=this.getContextPath();if(0===b.indexOf(c)&&(b=b.slice(c.length)),0===a.length)return null;for(var d=0;d<this._appPathPairs.length;d++)if(b.slice(0,this._appPathPairs[d][1].length)===this._appPathPairs[d][1])return this._appPathPairs[d][0];return null},g.prototype.getCurrentMicroAppId=function(){var a=this._window.location.pathname.toLowerCase();return this.getMicroAppId(a)||null},g.prototype.getCurrentApp=g.prototype.getCurrentMicroAppId,g.prototype.getContextPath=function(){return this._appContextPath||''},g.prototype.getContext=g.prototype.getContextPath,g.prototype.loadPath=function(a){var b=g.util.addChromelessQuery(a);this._window.dispatchEvent(new CustomEvent('app-hub-location-changed',{detail:{path:b}}))},g.prototype.loadMicroApp=function(a,b,c,f){var h=this.getMicroAppPath(a,!0);if(!h)return void console.log('[PDSChromeService#loadMicroApp] No microapp found with id %s',a);var i='string'===typeof b&&0<b.length?d('/',b):'',j='string'===typeof c&&0<c.length?d('#',c):'',k='string'===typeof f&&0<f.length?d('#',f):'',l=e('/',h+i)+k+j,m=g.util.addChromelessQuery(l);this._window.dispatchEvent(new CustomEvent('app-hub-location-changed',{detail:{path:m}}))},g.compatability={},g.compatability.wrapNavGlobal=function(b){return b.refresh=b.repaint=a.bind(null),b},g.util={},g.util.getPath=function(a){return a.pathname+a.search+a.hash},g.util.getPathWithoutQuery=function(a){return a.pathname+a.hash},g.util.addChromelessQuery=function(a){var b=f(a);return b.queryKey.hasOwnProperty('chromeless')&&'true'===b.queryKey.chromeless?a:b.path+'?chromeless=true'+(0<b.query.length?'&'+b.query:'')+(0<b.anchor.length?'#'+b.anchor:'')},g.util.stripChromelessQuery=function(a){var b=f(a);if(b.queryKey.hasOwnProperty('chromeless')&&'true'===b.queryKey.chromeless){var c=Object.keys(b.queryKey),d=1<c.length?chromelessQueryToString(c,b.queryKey):'';return b.path+d+(0<b.anchor.length?'#'+b.anchor:'')}return a},g.util.chromelessQueryToString=function(a,b){return'?'+a.reduce(function(a,c){return'chromeless'===c?a:(a.push(c+'='+b[c]),a)},[]).join('&')},g.util.findNavItemByPath=function(a,b){if(!a||''===a||!b||!Array.isArray(b))return null;for(var c,d=b.slice(0);0!==d.length;){if(c=d.shift(),c.path===a)return c;Array.isArray(c.items)&&0<c.items.length&&(d=d.concat(c.items))}return null},g.util.getJSON=function(a,b){var c=new XMLHttpRequest;c.onreadystatechange=function(){if(c.readyState==='4'){if(c.status==='200'){var d;try{d=JSON.parse(c.responseText)}catch(c){return b({message:'Response from server at "'+a+'" is not valid JSON'})}return b(null,d)}return b({message:'The server at "'+a+'" responded with error code "'+c.status+'"'})}},c.open('GET',a,!0),c.send()},(f.options={strictMode:!1,key:['source','protocol','authority','userInfo','user','password','host','port','relative','path','directory','file','query','anchor'],q:{name:'queryKey',parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}},function(){function a(a,b){b=b||{bubbles:!1,cancelable:!1,detail:void 0};var c=document.createEvent('CustomEvent');return c.initCustomEvent(a,b.bubbles,b.cancelable,b.detail),c}return'function'!==typeof window.CustomEvent&&void(a.prototype=window.Event.prototype,window.CustomEvent=a)}(),g)});