!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=function(e,t){var n=e[1]||"",o=e[3];if(!o)return n;if(t&&"function"==typeof btoa){var r=(a=o,c=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),l="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(c),"/*# ".concat(l," */")),i=o.sources.map((function(e){return"/*# sourceURL=".concat(o.sourceRoot||"").concat(e," */")}));return[n].concat(i).concat([r]).join("\n")}var a,c,l;return[n].join("\n")}(t,e);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,o){"string"==typeof e&&(e=[[null,e,""]]);var r={};if(o)for(var i=0;i<this.length;i++){var a=this[i][0];null!=a&&(r[a]=!0)}for(var c=0;c<e.length;c++){var l=[].concat(e[c]);o&&r[l[0]]||(n&&(l[2]?l[2]="".concat(n," and ").concat(l[2]):l[2]=n),t.push(l))}},t}},function(e,t,n){"use strict";n.r(t);n(2);const o=document.querySelector(".username"),r=document.querySelector(".folder-id"),i=(document.querySelector(".logout"),document.querySelector(".logged-in-username")),a=document.querySelector(".logged-in-options"),c=document.querySelector(".logged-out-options"),l=document.querySelector(".login-download-container"),d=document.querySelector(".login"),s=document.querySelector(".download-images"),u=document.querySelector(".user-msg"),p=document.querySelector("#image-size"),m=document.querySelector(".image-container");let f=[],g=[],h="",b="",x={tiny:{min:75,max:150},small:{min:125,max:250},medium:{min:250,max:500},large:{min:400,max:800},huge:{min:700,max:1400}};async function v(){b||(b=0);const e=await fetch(`https://api.discogs.com/users/${h}/collection/folders/${b}/releases?token=ofXwtIhxmQZTDufjImxFCCHkeucHvlUoXRirlyvQ`),t=await e.json();if(console.log(t),console.log(e),404===e.status)u.textContent="username not found";else{c.classList.add("hidden"),a.classList.remove("hidden"),i.textContent=""+h,u.textContent="",l.classList.add("thin"),console.log(t.releases.length);for(let e=0;e<t.releases.length;e++)f.push(t.releases[e].basic_information.cover_image),g.push(t.releases[e].basic_information);y(),console.log(g),s.addEventListener("click",w)}}function y(){m.style["grid-template-columns"]=`repeat(auto-fill, minmax(${x[p.value].min}px, 1fr))`,document.querySelectorAll(".cover-img").forEach(e=>{e.style["max-width"]=x[p.value].min+"px"}),function(e){let t=0;e.forEach(e=>{const n=document.createElement("div");n.classList.add("album-container");const o=document.createElement("div");o.classList.add("cover-img"),o.style.background=`url("${e}") no-repeat center center/cover`,n.appendChild(o);const r=document.createElement("div");r.classList.add("album-caption");const i=document.createElement("p");i.textContent=`"${g[t].title}"`,r.appendChild(i);const a=document.createElement("p");a.textContent=""+g[t].artists[0].name,r.appendChild(a),n.appendChild(r),m.appendChild(n),t++})}(f)}function w(){let e=0;const t=setInterval(()=>{axios({url:f[e],method:"GET",responseType:"blob"}).then(e=>{const t=window.URL.createObjectURL(new Blob([e.data])),n=document.createElement("a");n.href=t,n.setAttribute("download","test.jpg"),document.body.appendChild(n),n.click()}),e++,e>f.length&&clearInterval(t)},100)}o.addEventListener("change",()=>{h=o.value.trim(),d.addEventListener("click",v),document.addEventListener("keyup",e=>{"Enter"!==e.code&&"NumpadEnter"!==e.code||v()})}),r.addEventListener("change",()=>{b=r.value.trim()}),p.addEventListener("change",()=>{m.innerHTML="",y()})},function(e,t,n){var o=n(3),r=n(4);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[e.i,r,""]]);var i={insert:"head",singleton:!1};o(r,i);e.exports=r.locals||{}},function(e,t,n){"use strict";var o,r=function(){return void 0===o&&(o=Boolean(window&&document&&document.all&&!window.atob)),o},i=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}(),a=[];function c(e){for(var t=-1,n=0;n<a.length;n++)if(a[n].identifier===e){t=n;break}return t}function l(e,t){for(var n={},o=[],r=0;r<e.length;r++){var i=e[r],l=t.base?i[0]+t.base:i[0],d=n[l]||0,s="".concat(l," ").concat(d);n[l]=d+1;var u=c(s),p={css:i[1],media:i[2],sourceMap:i[3]};-1!==u?(a[u].references++,a[u].updater(p)):a.push({identifier:s,updater:h(p,t),references:1}),o.push(s)}return o}function d(e){var t=document.createElement("style"),o=e.attributes||{};if(void 0===o.nonce){var r=n.nc;r&&(o.nonce=r)}if(Object.keys(o).forEach((function(e){t.setAttribute(e,o[e])})),"function"==typeof e.insert)e.insert(t);else{var a=i(e.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(t)}return t}var s,u=(s=[],function(e,t){return s[e]=t,s.filter(Boolean).join("\n")});function p(e,t,n,o){var r=n?"":o.media?"@media ".concat(o.media," {").concat(o.css,"}"):o.css;if(e.styleSheet)e.styleSheet.cssText=u(t,r);else{var i=document.createTextNode(r),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(i,a[t]):e.appendChild(i)}}function m(e,t,n){var o=n.css,r=n.media,i=n.sourceMap;if(r?e.setAttribute("media",r):e.removeAttribute("media"),i&&btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleSheet)e.styleSheet.cssText=o;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(o))}}var f=null,g=0;function h(e,t){var n,o,r;if(t.singleton){var i=g++;n=f||(f=d(t)),o=p.bind(null,n,i,!1),r=p.bind(null,n,i,!0)}else n=d(t),o=m.bind(null,n,t),r=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return o(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;o(e=t)}else r()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=r());var n=l(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var o=0;o<n.length;o++){var r=c(n[o]);a[r].references--}for(var i=l(e,t),d=0;d<n.length;d++){var s=c(n[d]);0===a[s].references&&(a[s].updater(),a.splice(s,1))}n=i}}}},function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o)()(!1);r.push([e.i,'*{box-sizing:border-box;margin:0;padding:0}body{font-family:"Gill Sans","Gill Sans MT",Calibri,"Trebuchet MS",sans-serif;background:#fde5d0;max-width:1700px;margin:0 auto;padding:0 2%}.hidden{display:none !important}.thin{height:60px !important;width:100% !important;flex-direction:row !important;justify-content:space-around !important}button{background:#eee;padding:5px 10px;width:130px;border-radius:20px;border:1px solid #888;cursor:pointer;font-family:"Gill Sans","Gill Sans MT",Calibri,"Trebuchet MS",sans-serif;font-size:1.1rem}button:hover{background:#ddd}button:focus{outline:none}h1{margin:20px 0 0;color:black;text-align:center}p{text-align:center}select{width:120px;height:30px;padding:5px;border-radius:5px;border:1px solid #888}select:focus{outline-color:#3a5252}.login-download-container{margin:0 auto;width:300px;height:300px;background:#aad4f8;border-radius:15px;border:4px solid #eee}.login-download-container .logged-out-options{display:flex;flex-direction:column;justify-content:center;align-items:center;height:300px;margin:auto 0}.login-download-container .logged-out-options label{margin-bottom:15px;font-size:1.25rem}.login-download-container .logged-out-options input[type="text"]{height:30px;padding:5px;margin-bottom:30px;border-radius:5px;border:1px solid #888}.login-download-container .logged-out-options input[type="text"]:focus{outline:none;border:2px #3a5252 solid}.login-download-container .logged-in-options{display:flex;justify-content:space-evenly;align-items:center;height:60px;margin:auto 0}.download-images{width:220px}.image-container{padding:0 4px 30px;margin:0 auto;width:100%;display:grid}.image-container .album-container{display:flex;flex-direction:column;max-width:1700px;border:#ccc 1px solid;border-radius:5px}.image-container .album-container .cover-img{font-size:1.3rem;padding-top:99.5%;border-top-right-radius:5px;border-top-left-radius:5px}.image-container .album-container .album-caption{height:80px;display:flex;flex-flow:column wrap;align-items:center;justify-content:center;background:#666;color:#fff;border-bottom-right-radius:5px;border-bottom-left-radius:5px}.image-container .album-container .album-caption :first-child{margin-bottom:7px}.logged-in-username{margin:auto 0}.user-msg{color:#5a005a;font-size:1.25rem;font-style:italic}footer{display:flex;align-items:center;justify-content:center;margin-bottom:10px}footer p{padding:0 5px}footer a:active{color:#000}\n',""]),t.default=r}]);