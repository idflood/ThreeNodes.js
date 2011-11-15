// Knockout External jQuery Template Engine
// Author: Jim Cowart (primarily tweaking Steve Sanderson's original [and already awesome] template engine)
// License: MIT (http://www.opensource.org/licenses/mit-license)
// Version 1.0
(function(window,undefined){ 
if(typeof ko=="undefined")throw"You must reference Knockout.js in order for the ko.ExternaljQueryTemplateEngine to work.";else ko.ExternaljQueryTemplateEngine=function(){ko.jqueryTmplTemplateEngine.call(this,arguments);this.templateUrl="";this.templateSuffix=".html";this.templatePrefix="";this.useDefaultErrorTemplate=!0;this.defaultErrorTemplateHtml="<div style='font-style: italic;'>The template could not be loaded.  HTTP Status code: {STATUSCODE}.</div>";this.ajaxOptions={};this.getTemplateNode=
function(b){var a=document.getElementById(b);if(a==null){var c=null,a={url:this.getTemplatePath(b,this.templatePrefix,this.templateSuffix,this.templateUrl),dataType:"html",type:"GET",timeout:0,success:function(a){c=a},error:function(a){this.useDefaultErrorTemplate&&(c=this.defaultErrorTemplateHtml.replace("{STATUSCODE}",a.status))}.bind(this)};$.extend(!0,a,this.ajaxOptions);a.async=!1;$.ajax(a);if(c===null)throw Error("Cannot find template with ID="+b);a=document.createElement("script");a.type="text/html";
a.id=b;a.text=c;document.body.appendChild(a)}return a};this.getTemplatePath=function(b,a,c,d){b=a+b+c;return d===void 0||d===""?b:d+"/"+b};this.setOptions=function(b){$.extend(this,b)}},ko.ExternaljQueryTemplateEngine.prototype=new ko.templateEngine,ko.externaljQueryTemplateEngine=new ko.ExternaljQueryTemplateEngine,ko.setTemplateEngine(ko.externaljQueryTemplateEngine);
})(window);                  
