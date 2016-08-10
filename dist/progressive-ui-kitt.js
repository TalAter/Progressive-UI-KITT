/*
<!--
Progressive UI KITT
version : 0.0.1
author  : Tal Ater @TalAter
license : MIT
https://github.com/TalAter/Progressive-UI-KITT
-->
*/

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ProgressiveKITT = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},_stylesheet,_stylesheetNode,_guiNodes,_debugState=!1,_messages=[],_listenersRegistered=!1,_callbacks={"show-message":[],"show-alert":[],"show-confirm":[],"hide-message":[]},_logMessage=function(e){var t=arguments.length<=1||void 0===arguments[1]?"font-weight: bold; color: #00f;":arguments[1];_debugState&&(-1!==e.indexOf("%c")||t?console.log(e,t):console.log(e))},_guiCreated=function(){return void 0!==_guiNodes},_updateStylesheet=function(){_stylesheet&&_guiCreated()&&(_stylesheetNode?_stylesheetNode.href=_stylesheet:(_stylesheetNode=document.createElement("link"),_stylesheetNode.rel="stylesheet",_stylesheetNode.href=_stylesheet,_stylesheetNode.id="progressivekitt-style-sheet",document.body.appendChild(_stylesheetNode)))},_createGUI=function(){_guiNodes=document.createElement("div"),_guiNodes.id="progressivekitt-ui",_guiNodes.innerHTML="",_guiNodes.style.display="none",document.body.appendChild(_guiNodes),_updateStylesheet()},_addMessage=function(e,t){if(_guiCreated()&&"string"==typeof e){t=t||{},"object"!==("undefined"==typeof t?"undefined":_typeof(t))&&_logMessage("Invalid options object");for(var s=_messages.length+Date.now(),o=arguments.length,n=Array(o>2?o-2:0),i=2;o>i;i++)n[i-2]=arguments[i];n.forEach(function(t,o){t&&(e+='<span class="progressivekitt-button" id="progressivekitt-button-'+o+"-"+s+'">'+t.label+"</span>")});var a=document.createElement("div");a.id="progressivekitt-message-"+s,a.innerHTML=e,a.classList.add("progressivekitt-message");var d={id:s,contents:e};return _messages.push(d),_guiNodes.appendChild(a),n.forEach(function(e,t){if(e){var o=function(){e.cb&&e.cb.apply(e.context),ProgressiveKITT.deleteMessage(s)};document.getElementById("progressivekitt-button-"+t+"-"+s).addEventListener("click",o,!1)}}),setTimeout(function(){a.classList.add("progressivekitt-message--shown")},20),isFinite(t.hideAfter)&&t.hideAfter>0&&setTimeout(function(){ProgressiveKITT.deleteMessage(s)},t.hideAfter),s}},_messageListener=function(e){var t=e.data;if("object"===("undefined"==typeof t?"undefined":_typeof(t))){var s=t.payload;switch(t.action){case"pkitt-message":ProgressiveKITT.addMessage(s.contents,s.options);break;case"pkitt-alert":ProgressiveKITT.addAlert(s.contents,s.buttonLabel,s.buttonCallback,s.options,s.context);break;case"pkitt-confirm":ProgressiveKITT.addConfirm(s.contents,s.button1Label,s.button1Callback,s.button2Label,s.button2Callback,s.options,s.context1,s.context2)}}},_registerListeners=function(){_listenersRegistered||"serviceWorker"in navigator&&(navigator.serviceWorker.addEventListener("message",_messageListener),_listenersRegistered=!0)},_deleteMessageFromDOM=function(e){var t=document.getElementById("progressivekitt-message-"+e);t.classList.remove("progressivekitt-message--shown"),setTimeout(function(){t&&t.parentNode&&t.parentNode.removeChild(t)},1e3)},_invokeCallbacks=function(e){for(var t=arguments.length,s=Array(t>1?t-1:0),o=1;t>o;o++)s[o-1]=arguments[o];_callbacks[e].forEach(function(e){e.callback.apply(e.context,s)})},vroom=function(){this.render()},render=function(){_registerListeners(),_guiCreated()||_createGUI()},setStylesheet=function(e){_stylesheet=e,_updateStylesheet()},deleteMessages=function(){for(var e;void 0!==(e=_messages.shift());)_deleteMessageFromDOM(e.id)},deleteMessage=function(e){var t=_messages.length;return _messages=_messages.filter(function(t){return t.id!==e}),t===_messages.length?void _logMessage("deleteMessage() did not find the message with the id",e):(_invokeCallbacks("hide-message"),void _deleteMessageFromDOM(e))},addMessage=function(e,t){return _invokeCallbacks("show-message"),_addMessage(e,t)},addAlert=function(e){var t=arguments.length<=1||void 0===arguments[1]?"OK":arguments[1],s=arguments.length<=2||void 0===arguments[2]?void 0:arguments[2],o=arguments.length<=3||void 0===arguments[3]?void 0:arguments[3],n=arguments.length<=4||void 0===arguments[4]?this:arguments[4];return _invokeCallbacks("show-alert"),_addMessage(e,o,{label:t,cb:s,context:n})},addConfirm=function(e){var t=arguments.length<=1||void 0===arguments[1]?"OK":arguments[1],s=arguments.length<=2||void 0===arguments[2]?void 0:arguments[2],o=arguments.length<=3||void 0===arguments[3]?"Cancel":arguments[3],n=arguments.length<=4||void 0===arguments[4]?void 0:arguments[4],i=arguments.length<=5||void 0===arguments[5]?void 0:arguments[5],a=arguments.length<=6||void 0===arguments[6]?this:arguments[6],d=arguments.length<=7||void 0===arguments[7]?this:arguments[7];return _invokeCallbacks("show-confirm"),_addMessage(e,i,{label:t,cb:s,context:a},{label:o,cb:n,context:d})},hide=function(){_guiCreated()||_logMessage("cannot hide interface. Must be rendered first"),_guiNodes.classList.add("progressivekitt-ui--hidden")},show=function(){_guiCreated()||_logMessage("cannot show interface. Must be rendered first"),_guiNodes.classList.remove("progressivekitt-ui--hidden")},debug=function(){var e=arguments.length<=0||void 0===arguments[0]?!0:arguments[0];_debugState=!!e},addCallback=function(e,t,s){void 0!==_callbacks[e]&&"function"==typeof t&&_callbacks[e].push({callback:t,context:s||this})},removeCallback=function(e,t){var s=function(e){return e.callback!==t};Object.keys(_callbacks).forEach(function(o){void 0!==e&&e!==o||(void 0===t?_callbacks[o]=[]:_callbacks[o]=_callbacks[o].filter(s))})};module.exports={setStylesheet:setStylesheet,vroom:vroom,render:render,addMessage:addMessage,addAlert:addAlert,addConfirm:addConfirm,deleteMessages:deleteMessages,deleteMessage:deleteMessage,show:show,hide:hide,debug:debug,addCallback:addCallback,removeCallback:removeCallback};
},{}]},{},[1])(1)
});


//# sourceMappingURL=progressive-ui-kitt.js.map