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
"use strict";var _stylesheet,_stylesheetNode,_guiNodes,_debugState=!1,_debugStyle="font-weight: bold; color: #00f;",_messages=[],_listenersRegistered=!1,_logMessage=function(e,t){_debugState&&(-1!==e.indexOf("%c")||t?(t=t||_debugStyle,console.log(e,t)):console.log(e))},_guiCreated=function(){return void 0!==_guiNodes},_updateStylesheet=function(){_stylesheet&&_guiCreated()&&(_stylesheetNode?_stylesheetNode.href=_stylesheet:(_stylesheetNode=document.createElement("link"),_stylesheetNode.rel="stylesheet",_stylesheetNode.href=_stylesheet,_stylesheetNode.id="progressivekitt-style-sheet",document.body.appendChild(_stylesheetNode)))},_createGUI=function(){_guiNodes=document.createElement("div"),_guiNodes.id="progressivekitt-ui",_guiNodes.innerHTML="",_guiNodes.style.display="none",document.body.appendChild(_guiNodes),_updateStylesheet()},_addMessage=function(e,t){if(_guiCreated()&&"string"==typeof e){t=t||{},"object"!=typeof t&&_logMessage("Invalid options object");var s=_messages.length+Date.now(),i=document.createElement("div");i.id="progressivekitt-message-"+s,i.innerHTML=e,i.classList.add("progressivekitt-message");var d={id:s,contents:e};return _messages.push(d),_guiNodes.appendChild(i),setTimeout(function(){i.classList.add("progressivekitt-message--shown")},1),isFinite(t.hideAfter)&&t.hideAfter>0&&setTimeout(function(){i.classList.remove("progressivekitt-message--shown"),setTimeout(function(){i&&i.parentNode&&i.parentNode.removeChild(i)},1e3)},t.hideAfter),s}},_messageListener=function(e){"object"==typeof e.data&&"pkitt-message"===e.data.action&&_addMessage(e.data.msg)},_registerListeners=function(){_listenersRegistered||"serviceWorker"in navigator&&(navigator.serviceWorker.addEventListener("message",_messageListener),_listenersRegistered=!0)},vroom=function(){this.render()},render=function(){_registerListeners(),_guiCreated()||_createGUI()},setStylesheet=function(e){_stylesheet=e,_updateStylesheet()},deleteMessages=function(){for(var e;void 0!==(e=_messages.shift());){var t=document.getElementById("progressivekitt-message-"+e.id);t&&t.parentNode&&t.parentNode.removeChild(t)}},addMessage=function(e,t){return _addMessage(e,t)},hide=function(){_guiCreated()||_logMessage("cannot hide interface. Must be rendered first"),_guiNodes.classList.add("progressivekitt-ui--hidden")},show=function(){_guiCreated()||_logMessage("cannot show interface. Must be rendered first"),_guiNodes.classList.remove("progressivekitt-ui--hidden")},debug=function(e){_debugState=arguments.length>0?!!e:!0};module.exports={setStylesheet:setStylesheet,vroom:vroom,render:render,addMessage:addMessage,deleteMessages:deleteMessages,show:show,hide:hide,debug:debug};
},{}]},{},[1])(1)
});


//# sourceMappingURL=progressive-ui-kitt.js.map