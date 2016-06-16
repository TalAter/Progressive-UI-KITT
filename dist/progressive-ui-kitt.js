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
"use strict";var _stylesheet,_stylesheetNode,_guiNodes,_messages=[],_guiCreated=function(){return void 0!==_guiNodes},_updateStylesheet=function(){_stylesheet&&_guiCreated()&&(_stylesheetNode?_stylesheetNode.href=_stylesheet:(_stylesheetNode=document.createElement("link"),_stylesheetNode.rel="stylesheet",_stylesheetNode.href=_stylesheet,_stylesheetNode.id="progressivekitt-style-sheet",document.body.appendChild(_stylesheetNode)))},_createGUI=function(){_guiNodes=document.createElement("div"),_guiNodes.id="progressivekitt-ui",_guiNodes.innerHTML="",_guiNodes.style.display="none",document.body.appendChild(_guiNodes),_updateStylesheet()},_addMessage=function(e){if("string"==typeof e&&_guiCreated()){var s=_messages.length+Date.now(),t=document.createElement("div");t.id="progressivekitt-message-"+s,t.innerHTML=e,t.classList.add("progressivekitt-message");var d={id:s,contents:e};return _messages.push(d),_guiNodes.appendChild(t),window.requestAnimationFrame(function(){t.classList.add("progressivekitt-message--shown")}),s}},vroom=function(){this.render()},render=function(){_guiCreated()||_createGUI()},setStylesheet=function(e){_stylesheet=e,_updateStylesheet()},deleteMessages=function(){for(var e;void 0!==(e=_messages.shift());){var s=document.getElementById("progressivekitt-message-"+e.id);s.parentNode&&s.parentNode.removeChild(s)}},addMessage=function(e){return _addMessage(e)},hide=function(){if(!_guiCreated())throw new TypeError("cannot hide interface. Must be rendered first");_guiNodes.classList.add("progressivekitt-ui--hidden")},show=function(){if(!_guiCreated())throw new TypeError("cannot show interface. Must be rendered first");_guiNodes.classList.remove("progressivekitt-ui--hidden")};module.exports={setStylesheet:setStylesheet,vroom:vroom,render:render,addMessage:addMessage,deleteMessages:deleteMessages,show:show,hide:hide};
},{}]},{},[1])(1)
});


//# sourceMappingURL=progressive-ui-kitt.js.map