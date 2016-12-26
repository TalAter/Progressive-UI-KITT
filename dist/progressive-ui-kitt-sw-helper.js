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
"use strict";var _postMessageToAllClients=function(t,e){self.clients.matchAll({includeUncontrolled:!0}).then(function(n){n.forEach(function(n){n.postMessage({action:"pkitt-"+e,payload:t})})})},_parseButtonObject=function(t){return"string"==typeof t?{label:t}:t},addMessage=function(t,e){_postMessageToAllClients({contents:t,options:e},"message")},addAlert=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"OK",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};e=_parseButtonObject(e),_postMessageToAllClients({contents:t,button:{label:e.label},options:n},"alert")},addConfirm=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"OK",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Cancel",o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};e=_parseButtonObject(e),n=_parseButtonObject(n),_postMessageToAllClients({contents:t,button1:{label:e.label},button2:{label:n.label,callback:n.callback,context:n.context},options:o},"confirm")};module.exports={addMessage:addMessage,addAlert:addAlert,addConfirm:addConfirm};
},{}]},{},[1])(1)
});


//# sourceMappingURL=progressive-ui-kitt-sw-helper.js.map