(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(n){if(n.ep)return;n.ep=!0;const o=e(n);fetch(n.href,o)}})();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Qo="160",sc=0,ma=1,oc=2,dl=1,fl=2,fi=3,Ci=0,Ne=1,je=2,mi=0,gn=1,xe=2,ga=3,Ma=4,ac=5,Oi=100,rc=101,lc=102,xa=103,_a=104,cc=200,hc=201,dc=202,fc=203,Wo=204,Xo=205,uc=206,pc=207,mc=208,gc=209,Mc=210,xc=211,_c=212,yc=213,vc=214,Sc=0,wc=1,Ec=2,Ls=3,bc=4,Tc=5,Ac=6,Cc=7,ul=0,Rc=1,Pc=2,Ti=0,pl=1,ml=2,gl=3,ta=4,Lc=5,Ml=6,xl=300,xn=301,_n=302,Is=303,qo=304,ks=306,Ve=1e3,ei=1001,Yo=1002,ge=1003,ya=1004,$s=1005,De=1006,Ic=1007,yn=1008,Ai=1009,Dc=1010,Uc=1011,ea=1012,_l=1013,wi=1014,Ei=1015,vn=1016,yl=1017,vl=1018,ki=1020,zc=1021,ii=1023,Nc=1024,Fc=1025,Vi=1026,Sn=1027,Bc=1028,Sl=1029,Oc=1030,wl=1031,El=1033,js=33776,Zs=33777,Ks=33778,Js=33779,va=35840,Sa=35841,wa=35842,Ea=35843,bl=36196,ba=37492,Ta=37496,Aa=37808,Ca=37809,Ra=37810,Pa=37811,La=37812,Ia=37813,Da=37814,Ua=37815,za=37816,Na=37817,Fa=37818,Ba=37819,Oa=37820,Ga=37821,Qs=36492,ka=36494,Va=36495,Gc=36283,Ha=36284,Wa=36285,Xa=36286,Tl=3e3,Hi=3001,kc=3200,Vc=3201,Al=0,Hc=1,Ze="",we="srgb",Mi="srgb-linear",ia="display-p3",Vs="display-p3-linear",Ds="linear",le="srgb",Us="rec709",zs="p3",qi=7680,qa=519,Wc=512,Xc=513,qc=514,Cl=515,Yc=516,$c=517,jc=518,Zc=519,$o=35044,Ya="300 es",jo=1035,pi=2e3,Ns=2001;class bn{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const n=this._listeners[t];if(n!==void 0){const o=n.indexOf(e);o!==-1&&n.splice(o,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const n=i.slice(0);for(let o=0,a=n.length;o<a;o++)n[o].call(this,t);t.target=null}}}const Ae=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let $a=1234567;const kn=Math.PI/180,wn=180/Math.PI;function gi(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ae[s&255]+Ae[s>>8&255]+Ae[s>>16&255]+Ae[s>>24&255]+"-"+Ae[t&255]+Ae[t>>8&255]+"-"+Ae[t>>16&15|64]+Ae[t>>24&255]+"-"+Ae[e&63|128]+Ae[e>>8&255]+"-"+Ae[e>>16&255]+Ae[e>>24&255]+Ae[i&255]+Ae[i>>8&255]+Ae[i>>16&255]+Ae[i>>24&255]).toLowerCase()}function be(s,t,e){return Math.max(t,Math.min(e,s))}function na(s,t){return(s%t+t)%t}function Kc(s,t,e,i,n){return i+(s-t)*(n-i)/(e-t)}function Jc(s,t,e){return s!==t?(e-s)/(t-s):0}function Vn(s,t,e){return(1-e)*s+e*t}function Qc(s,t,e,i){return Vn(s,t,1-Math.exp(-e*i))}function th(s,t=1){return t-Math.abs(na(s,t*2)-t)}function eh(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function ih(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function nh(s,t){return s+Math.floor(Math.random()*(t-s+1))}function sh(s,t){return s+Math.random()*(t-s)}function oh(s){return s*(.5-Math.random())}function ah(s){s!==void 0&&($a=s);let t=$a+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function rh(s){return s*kn}function lh(s){return s*wn}function Zo(s){return(s&s-1)===0&&s!==0}function ch(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Fs(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function hh(s,t,e,i,n){const o=Math.cos,a=Math.sin,r=o(e/2),l=a(e/2),c=o((t+i)/2),h=a((t+i)/2),d=o((t-i)/2),u=a((t-i)/2),f=o((i-t)/2),g=a((i-t)/2);switch(n){case"XYX":s.set(r*h,l*d,l*u,r*c);break;case"YZY":s.set(l*u,r*h,l*d,r*c);break;case"ZXZ":s.set(l*d,l*u,r*h,r*c);break;case"XZX":s.set(r*h,l*g,l*f,r*c);break;case"YXY":s.set(l*f,r*h,l*g,r*c);break;case"ZYZ":s.set(l*g,l*f,r*h,r*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+n)}}function si(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function ae(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const Bs={DEG2RAD:kn,RAD2DEG:wn,generateUUID:gi,clamp:be,euclideanModulo:na,mapLinear:Kc,inverseLerp:Jc,lerp:Vn,damp:Qc,pingpong:th,smoothstep:eh,smootherstep:ih,randInt:nh,randFloat:sh,randFloatSpread:oh,seededRandom:ah,degToRad:rh,radToDeg:lh,isPowerOfTwo:Zo,ceilPowerOfTwo:ch,floorPowerOfTwo:Fs,setQuaternionFromProperEuler:hh,normalize:ae,denormalize:si};class Xt{constructor(t=0,e=0){Xt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,n=t.elements;return this.x=n[0]*e+n[3]*i+n[6],this.y=n[1]*e+n[4]*i+n[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(be(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),n=Math.sin(e),o=this.x-t.x,a=this.y-t.y;return this.x=o*i-a*n+t.x,this.y=o*n+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Qt{constructor(t,e,i,n,o,a,r,l,c){Qt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,n,o,a,r,l,c)}set(t,e,i,n,o,a,r,l,c){const h=this.elements;return h[0]=t,h[1]=n,h[2]=r,h[3]=e,h[4]=o,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,n=e.elements,o=this.elements,a=i[0],r=i[3],l=i[6],c=i[1],h=i[4],d=i[7],u=i[2],f=i[5],g=i[8],M=n[0],m=n[3],p=n[6],A=n[1],x=n[4],b=n[7],I=n[2],T=n[5],_=n[8];return o[0]=a*M+r*A+l*I,o[3]=a*m+r*x+l*T,o[6]=a*p+r*b+l*_,o[1]=c*M+h*A+d*I,o[4]=c*m+h*x+d*T,o[7]=c*p+h*b+d*_,o[2]=u*M+f*A+g*I,o[5]=u*m+f*x+g*T,o[8]=u*p+f*b+g*_,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],n=t[2],o=t[3],a=t[4],r=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*r*c-i*o*h+i*r*l+n*o*c-n*a*l}invert(){const t=this.elements,e=t[0],i=t[1],n=t[2],o=t[3],a=t[4],r=t[5],l=t[6],c=t[7],h=t[8],d=h*a-r*c,u=r*l-h*o,f=c*o-a*l,g=e*d+i*u+n*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/g;return t[0]=d*M,t[1]=(n*c-h*i)*M,t[2]=(r*i-n*a)*M,t[3]=u*M,t[4]=(h*e-n*l)*M,t[5]=(n*o-r*e)*M,t[6]=f*M,t[7]=(i*l-c*e)*M,t[8]=(a*e-i*o)*M,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,n,o,a,r){const l=Math.cos(o),c=Math.sin(o);return this.set(i*l,i*c,-i*(l*a+c*r)+a+t,-n*c,n*l,-n*(-c*a+l*r)+r+e,0,0,1),this}scale(t,e){return this.premultiply(to.makeScale(t,e)),this}rotate(t){return this.premultiply(to.makeRotation(-t)),this}translate(t,e){return this.premultiply(to.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let n=0;n<9;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const to=new Qt;function Rl(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function Os(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function dh(){const s=Os("canvas");return s.style.display="block",s}const ja={};function Hn(s){s in ja||(ja[s]=!0,console.warn(s))}const Za=new Qt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Ka=new Qt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Qn={[Mi]:{transfer:Ds,primaries:Us,toReference:s=>s,fromReference:s=>s},[we]:{transfer:le,primaries:Us,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[Vs]:{transfer:Ds,primaries:zs,toReference:s=>s.applyMatrix3(Ka),fromReference:s=>s.applyMatrix3(Za)},[ia]:{transfer:le,primaries:zs,toReference:s=>s.convertSRGBToLinear().applyMatrix3(Ka),fromReference:s=>s.applyMatrix3(Za).convertLinearToSRGB()}},fh=new Set([Mi,Vs]),ne={enabled:!0,_workingColorSpace:Mi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!fh.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,t,e){if(this.enabled===!1||t===e||!t||!e)return s;const i=Qn[t].toReference,n=Qn[e].fromReference;return n(i(s))},fromWorkingColorSpace:function(s,t){return this.convert(s,this._workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this._workingColorSpace)},getPrimaries:function(s){return Qn[s].primaries},getTransfer:function(s){return s===Ze?Ds:Qn[s].transfer}};function Mn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function eo(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Yi;class Pl{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Yi===void 0&&(Yi=Os("canvas")),Yi.width=t.width,Yi.height=t.height;const i=Yi.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=Yi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Os("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const n=i.getImageData(0,0,t.width,t.height),o=n.data;for(let a=0;a<o.length;a++)o[a]=Mn(o[a]/255)*255;return i.putImageData(n,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Mn(e[i]/255)*255):e[i]=Mn(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let uh=0;class Ll{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:uh++}),this.uuid=gi(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let o;if(Array.isArray(n)){o=[];for(let a=0,r=n.length;a<r;a++)n[a].isDataTexture?o.push(io(n[a].image)):o.push(io(n[a]))}else o=io(n);i.url=o}return e||(t.images[this.uuid]=i),i}}function io(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Pl.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let ph=0;class Fe extends bn{constructor(t=Fe.DEFAULT_IMAGE,e=Fe.DEFAULT_MAPPING,i=ei,n=ei,o=De,a=yn,r=ii,l=Ai,c=Fe.DEFAULT_ANISOTROPY,h=Ze){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ph++}),this.uuid=gi(),this.name="",this.source=new Ll(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=o,this.minFilter=a,this.anisotropy=c,this.format=r,this.internalFormat=null,this.type=l,this.offset=new Xt(0,0),this.repeat=new Xt(1,1),this.center=new Xt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Hn("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Hi?we:Ze),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==xl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ve:t.x=t.x-Math.floor(t.x);break;case ei:t.x=t.x<0?0:1;break;case Yo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ve:t.y=t.y-Math.floor(t.y);break;case ei:t.y=t.y<0?0:1;break;case Yo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Hn("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===we?Hi:Tl}set encoding(t){Hn("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=t===Hi?we:Ze}}Fe.DEFAULT_IMAGE=null;Fe.DEFAULT_MAPPING=xl;Fe.DEFAULT_ANISOTROPY=1;class he{constructor(t=0,e=0,i=0,n=1){he.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=n}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,n){return this.x=t,this.y=e,this.z=i,this.w=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,n=this.z,o=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*n+a[12]*o,this.y=a[1]*e+a[5]*i+a[9]*n+a[13]*o,this.z=a[2]*e+a[6]*i+a[10]*n+a[14]*o,this.w=a[3]*e+a[7]*i+a[11]*n+a[15]*o,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,n,o;const l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],g=l[9],M=l[2],m=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-M)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+M)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const x=(c+1)/2,b=(f+1)/2,I=(p+1)/2,T=(h+u)/4,_=(d+M)/4,P=(g+m)/4;return x>b&&x>I?x<.01?(i=0,n=.707106781,o=.707106781):(i=Math.sqrt(x),n=T/i,o=_/i):b>I?b<.01?(i=.707106781,n=0,o=.707106781):(n=Math.sqrt(b),i=T/n,o=P/n):I<.01?(i=.707106781,n=.707106781,o=0):(o=Math.sqrt(I),i=_/o,n=P/o),this.set(i,n,o,e),this}let A=Math.sqrt((m-g)*(m-g)+(d-M)*(d-M)+(u-h)*(u-h));return Math.abs(A)<.001&&(A=1),this.x=(m-g)/A,this.y=(d-M)/A,this.z=(u-h)/A,this.w=Math.acos((c+f+p-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class mh extends bn{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new he(0,0,t,e),this.scissorTest=!1,this.viewport=new he(0,0,t,e);const n={width:t,height:e,depth:1};i.encoding!==void 0&&(Hn("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===Hi?we:Ze),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:De,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new Fe(n,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(t,e,i=1){(this.width!==t||this.height!==e||this.depth!==i)&&(this.width=t,this.height=e,this.depth=i,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Ll(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ri extends mh{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Il extends Fe{constructor(t=null,e=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=ge,this.minFilter=ge,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class gh extends Fe{constructor(t=null,e=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=ge,this.minFilter=ge,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ie{constructor(t=0,e=0,i=0,n=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=n}static slerpFlat(t,e,i,n,o,a,r){let l=i[n+0],c=i[n+1],h=i[n+2],d=i[n+3];const u=o[a+0],f=o[a+1],g=o[a+2],M=o[a+3];if(r===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d;return}if(r===1){t[e+0]=u,t[e+1]=f,t[e+2]=g,t[e+3]=M;return}if(d!==M||l!==u||c!==f||h!==g){let m=1-r;const p=l*u+c*f+h*g+d*M,A=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const I=Math.sqrt(x),T=Math.atan2(I,p*A);m=Math.sin(m*T)/I,r=Math.sin(r*T)/I}const b=r*A;if(l=l*m+u*b,c=c*m+f*b,h=h*m+g*b,d=d*m+M*b,m===1-r){const I=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=I,c*=I,h*=I,d*=I}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,i,n,o,a){const r=i[n],l=i[n+1],c=i[n+2],h=i[n+3],d=o[a],u=o[a+1],f=o[a+2],g=o[a+3];return t[e]=r*g+h*d+l*f-c*u,t[e+1]=l*g+h*u+c*d-r*f,t[e+2]=c*g+h*f+r*u-l*d,t[e+3]=h*g-r*d-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,n){return this._x=t,this._y=e,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,n=t._y,o=t._z,a=t._order,r=Math.cos,l=Math.sin,c=r(i/2),h=r(n/2),d=r(o/2),u=l(i/2),f=l(n/2),g=l(o/2);switch(a){case"XYZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"YZX":this._x=u*h*d+c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d-u*f*g;break;case"XZY":this._x=u*h*d-c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d+u*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,n=Math.sin(i);return this._x=t.x*n,this._y=t.y*n,this._z=t.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],n=e[4],o=e[8],a=e[1],r=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=i+r+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(o-c)*f,this._z=(a-n)*f}else if(i>r&&i>d){const f=2*Math.sqrt(1+i-r-d);this._w=(h-l)/f,this._x=.25*f,this._y=(n+a)/f,this._z=(o+c)/f}else if(r>d){const f=2*Math.sqrt(1+r-i-d);this._w=(o-c)/f,this._x=(n+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+d-i-r);this._w=(a-n)/f,this._x=(o+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(be(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const n=Math.min(1,e/i);return this.slerp(t,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,n=t._y,o=t._z,a=t._w,r=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+a*r+n*c-o*l,this._y=n*h+a*l+o*r-i*c,this._z=o*h+a*c+i*l-n*r,this._w=a*h-i*r-n*l-o*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,n=this._y,o=this._z,a=this._w;let r=a*t._w+i*t._x+n*t._y+o*t._z;if(r<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,r=-r):this.copy(t),r>=1)return this._w=a,this._x=i,this._y=n,this._z=o,this;const l=1-r*r;if(l<=Number.EPSILON){const f=1-e;return this._w=f*a+e*this._w,this._x=f*i+e*this._x,this._y=f*n+e*this._y,this._z=f*o+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,r),d=Math.sin((1-e)*h)/c,u=Math.sin(e*h)/c;return this._w=a*d+this._w*u,this._x=i*d+this._x*u,this._y=n*d+this._y*u,this._z=o*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=Math.random(),e=Math.sqrt(1-t),i=Math.sqrt(t),n=2*Math.PI*Math.random(),o=2*Math.PI*Math.random();return this.set(e*Math.cos(n),i*Math.sin(o),i*Math.cos(o),e*Math.sin(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class R{constructor(t=0,e=0,i=0){R.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ja.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ja.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,n=this.z,o=t.elements;return this.x=o[0]*e+o[3]*i+o[6]*n,this.y=o[1]*e+o[4]*i+o[7]*n,this.z=o[2]*e+o[5]*i+o[8]*n,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,n=this.z,o=t.elements,a=1/(o[3]*e+o[7]*i+o[11]*n+o[15]);return this.x=(o[0]*e+o[4]*i+o[8]*n+o[12])*a,this.y=(o[1]*e+o[5]*i+o[9]*n+o[13])*a,this.z=(o[2]*e+o[6]*i+o[10]*n+o[14])*a,this}applyQuaternion(t){const e=this.x,i=this.y,n=this.z,o=t.x,a=t.y,r=t.z,l=t.w,c=2*(a*n-r*i),h=2*(r*e-o*n),d=2*(o*i-a*e);return this.x=e+l*c+a*d-r*h,this.y=i+l*h+r*c-o*d,this.z=n+l*d+o*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,n=this.z,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*n,this.y=o[1]*e+o[5]*i+o[9]*n,this.z=o[2]*e+o[6]*i+o[10]*n,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,n=t.y,o=t.z,a=e.x,r=e.y,l=e.z;return this.x=n*l-o*r,this.y=o*a-i*l,this.z=i*r-n*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return no.copy(this).projectOnVector(t),this.sub(no)}reflect(t){return this.sub(no.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(be(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,n=this.z-t.z;return e*e+i*i+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const n=Math.sin(e)*t;return this.x=n*Math.sin(i),this.y=Math.cos(e)*t,this.z=n*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),n=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=n,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,i=Math.sqrt(1-t**2);return this.x=i*Math.cos(e),this.y=i*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const no=new R,Ja=new Ie;class Xn{constructor(t=new R(1/0,1/0,1/0),e=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Je.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Je.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=Je.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const o=i.getAttribute("position");if(e===!0&&o!==void 0&&t.isInstancedMesh!==!0)for(let a=0,r=o.count;a<r;a++)t.isMesh===!0?t.getVertexPosition(a,Je):Je.fromBufferAttribute(o,a),Je.applyMatrix4(t.matrixWorld),this.expandByPoint(Je);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ts.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ts.copy(i.boundingBox)),ts.applyMatrix4(t.matrixWorld),this.union(ts)}const n=t.children;for(let o=0,a=n.length;o<a;o++)this.expandByObject(n[o],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,Je),Je.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Pn),es.subVectors(this.max,Pn),$i.subVectors(t.a,Pn),ji.subVectors(t.b,Pn),Zi.subVectors(t.c,Pn),xi.subVectors(ji,$i),_i.subVectors(Zi,ji),Ii.subVectors($i,Zi);let e=[0,-xi.z,xi.y,0,-_i.z,_i.y,0,-Ii.z,Ii.y,xi.z,0,-xi.x,_i.z,0,-_i.x,Ii.z,0,-Ii.x,-xi.y,xi.x,0,-_i.y,_i.x,0,-Ii.y,Ii.x,0];return!so(e,$i,ji,Zi,es)||(e=[1,0,0,0,1,0,0,0,1],!so(e,$i,ji,Zi,es))?!1:(is.crossVectors(xi,_i),e=[is.x,is.y,is.z],so(e,$i,ji,Zi,es))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Je).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Je).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ri[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ri[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ri[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ri[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ri[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ri[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ri[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ri[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ri),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const ri=[new R,new R,new R,new R,new R,new R,new R,new R],Je=new R,ts=new Xn,$i=new R,ji=new R,Zi=new R,xi=new R,_i=new R,Ii=new R,Pn=new R,es=new R,is=new R,Di=new R;function so(s,t,e,i,n){for(let o=0,a=s.length-3;o<=a;o+=3){Di.fromArray(s,o);const r=n.x*Math.abs(Di.x)+n.y*Math.abs(Di.y)+n.z*Math.abs(Di.z),l=t.dot(Di),c=e.dot(Di),h=i.dot(Di);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>r)return!1}return!0}const Mh=new Xn,Ln=new R,oo=new R;class qn{constructor(t=new R,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):Mh.setFromPoints(t).getCenter(i);let n=0;for(let o=0,a=t.length;o<a;o++)n=Math.max(n,i.distanceToSquared(t[o]));return this.radius=Math.sqrt(n),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ln.subVectors(t,this.center);const e=Ln.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),n=(i-this.radius)*.5;this.center.addScaledVector(Ln,n/i),this.radius+=n}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(oo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ln.copy(t.center).add(oo)),this.expandByPoint(Ln.copy(t.center).sub(oo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const li=new R,ao=new R,ns=new R,yi=new R,ro=new R,ss=new R,lo=new R;class Dl{constructor(t=new R,e=new R(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,li)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=li.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(li.copy(this.origin).addScaledVector(this.direction,e),li.distanceToSquared(t))}distanceSqToSegment(t,e,i,n){ao.copy(t).add(e).multiplyScalar(.5),ns.copy(e).sub(t).normalize(),yi.copy(this.origin).sub(ao);const o=t.distanceTo(e)*.5,a=-this.direction.dot(ns),r=yi.dot(this.direction),l=-yi.dot(ns),c=yi.lengthSq(),h=Math.abs(1-a*a);let d,u,f,g;if(h>0)if(d=a*l-r,u=a*r-l,g=o*h,d>=0)if(u>=-g)if(u<=g){const M=1/h;d*=M,u*=M,f=d*(d+a*u+2*r)+u*(a*d+u+2*l)+c}else u=o,d=Math.max(0,-(a*u+r)),f=-d*d+u*(u+2*l)+c;else u=-o,d=Math.max(0,-(a*u+r)),f=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-a*o+r)),u=d>0?-o:Math.min(Math.max(-o,-l),o),f=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-o,-l),o),f=u*(u+2*l)+c):(d=Math.max(0,-(a*o+r)),u=d>0?o:Math.min(Math.max(-o,-l),o),f=-d*d+u*(u+2*l)+c);else u=a>0?-o:o,d=Math.max(0,-(a*u+r)),f=-d*d+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),n&&n.copy(ao).addScaledVector(ns,u),f}intersectSphere(t,e){li.subVectors(t.center,this.origin);const i=li.dot(this.direction),n=li.dot(li)-i*i,o=t.radius*t.radius;if(n>o)return null;const a=Math.sqrt(o-n),r=i-a,l=i+a;return l<0?null:r<0?this.at(l,e):this.at(r,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,n,o,a,r,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(i=(t.min.x-u.x)*c,n=(t.max.x-u.x)*c):(i=(t.max.x-u.x)*c,n=(t.min.x-u.x)*c),h>=0?(o=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(o=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),i>a||o>n||((o>i||isNaN(i))&&(i=o),(a<n||isNaN(n))&&(n=a),d>=0?(r=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(r=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),i>l||r>n)||((r>i||i!==i)&&(i=r),(l<n||n!==n)&&(n=l),n<0)?null:this.at(i>=0?i:n,e)}intersectsBox(t){return this.intersectBox(t,li)!==null}intersectTriangle(t,e,i,n,o){ro.subVectors(e,t),ss.subVectors(i,t),lo.crossVectors(ro,ss);let a=this.direction.dot(lo),r;if(a>0){if(n)return null;r=1}else if(a<0)r=-1,a=-a;else return null;yi.subVectors(this.origin,t);const l=r*this.direction.dot(ss.crossVectors(yi,ss));if(l<0)return null;const c=r*this.direction.dot(ro.cross(yi));if(c<0||l+c>a)return null;const h=-r*yi.dot(lo);return h<0?null:this.at(h/a,o)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class se{constructor(t,e,i,n,o,a,r,l,c,h,d,u,f,g,M,m){se.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,n,o,a,r,l,c,h,d,u,f,g,M,m)}set(t,e,i,n,o,a,r,l,c,h,d,u,f,g,M,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=n,p[1]=o,p[5]=a,p[9]=r,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=M,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new se().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,n=1/Ki.setFromMatrixColumn(t,0).length(),o=1/Ki.setFromMatrixColumn(t,1).length(),a=1/Ki.setFromMatrixColumn(t,2).length();return e[0]=i[0]*n,e[1]=i[1]*n,e[2]=i[2]*n,e[3]=0,e[4]=i[4]*o,e[5]=i[5]*o,e[6]=i[6]*o,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,n=t.y,o=t.z,a=Math.cos(i),r=Math.sin(i),l=Math.cos(n),c=Math.sin(n),h=Math.cos(o),d=Math.sin(o);if(t.order==="XYZ"){const u=a*h,f=a*d,g=r*h,M=r*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=f+g*c,e[5]=u-M*c,e[9]=-r*l,e[2]=M-u*c,e[6]=g+f*c,e[10]=a*l}else if(t.order==="YXZ"){const u=l*h,f=l*d,g=c*h,M=c*d;e[0]=u+M*r,e[4]=g*r-f,e[8]=a*c,e[1]=a*d,e[5]=a*h,e[9]=-r,e[2]=f*r-g,e[6]=M+u*r,e[10]=a*l}else if(t.order==="ZXY"){const u=l*h,f=l*d,g=c*h,M=c*d;e[0]=u-M*r,e[4]=-a*d,e[8]=g+f*r,e[1]=f+g*r,e[5]=a*h,e[9]=M-u*r,e[2]=-a*c,e[6]=r,e[10]=a*l}else if(t.order==="ZYX"){const u=a*h,f=a*d,g=r*h,M=r*d;e[0]=l*h,e[4]=g*c-f,e[8]=u*c+M,e[1]=l*d,e[5]=M*c+u,e[9]=f*c-g,e[2]=-c,e[6]=r*l,e[10]=a*l}else if(t.order==="YZX"){const u=a*l,f=a*c,g=r*l,M=r*c;e[0]=l*h,e[4]=M-u*d,e[8]=g*d+f,e[1]=d,e[5]=a*h,e[9]=-r*h,e[2]=-c*h,e[6]=f*d+g,e[10]=u-M*d}else if(t.order==="XZY"){const u=a*l,f=a*c,g=r*l,M=r*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+M,e[5]=a*h,e[9]=f*d-g,e[2]=g*d-f,e[6]=r*h,e[10]=M*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(xh,t,_h)}lookAt(t,e,i){const n=this.elements;return Ge.subVectors(t,e),Ge.lengthSq()===0&&(Ge.z=1),Ge.normalize(),vi.crossVectors(i,Ge),vi.lengthSq()===0&&(Math.abs(i.z)===1?Ge.x+=1e-4:Ge.z+=1e-4,Ge.normalize(),vi.crossVectors(i,Ge)),vi.normalize(),os.crossVectors(Ge,vi),n[0]=vi.x,n[4]=os.x,n[8]=Ge.x,n[1]=vi.y,n[5]=os.y,n[9]=Ge.y,n[2]=vi.z,n[6]=os.z,n[10]=Ge.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,n=e.elements,o=this.elements,a=i[0],r=i[4],l=i[8],c=i[12],h=i[1],d=i[5],u=i[9],f=i[13],g=i[2],M=i[6],m=i[10],p=i[14],A=i[3],x=i[7],b=i[11],I=i[15],T=n[0],_=n[4],P=n[8],v=n[12],E=n[1],L=n[5],z=n[9],Z=n[13],C=n[2],D=n[6],B=n[10],O=n[14],W=n[3],et=n[7],nt=n[11],rt=n[15];return o[0]=a*T+r*E+l*C+c*W,o[4]=a*_+r*L+l*D+c*et,o[8]=a*P+r*z+l*B+c*nt,o[12]=a*v+r*Z+l*O+c*rt,o[1]=h*T+d*E+u*C+f*W,o[5]=h*_+d*L+u*D+f*et,o[9]=h*P+d*z+u*B+f*nt,o[13]=h*v+d*Z+u*O+f*rt,o[2]=g*T+M*E+m*C+p*W,o[6]=g*_+M*L+m*D+p*et,o[10]=g*P+M*z+m*B+p*nt,o[14]=g*v+M*Z+m*O+p*rt,o[3]=A*T+x*E+b*C+I*W,o[7]=A*_+x*L+b*D+I*et,o[11]=A*P+x*z+b*B+I*nt,o[15]=A*v+x*Z+b*O+I*rt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],n=t[8],o=t[12],a=t[1],r=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],f=t[14],g=t[3],M=t[7],m=t[11],p=t[15];return g*(+o*l*d-n*c*d-o*r*u+i*c*u+n*r*f-i*l*f)+M*(+e*l*f-e*c*u+o*a*u-n*a*f+n*c*h-o*l*h)+m*(+e*c*d-e*r*f-o*a*d+i*a*f+o*r*h-i*c*h)+p*(-n*r*h-e*l*d+e*r*u+n*a*d-i*a*u+i*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const n=this.elements;return t.isVector3?(n[12]=t.x,n[13]=t.y,n[14]=t.z):(n[12]=t,n[13]=e,n[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],n=t[2],o=t[3],a=t[4],r=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],f=t[11],g=t[12],M=t[13],m=t[14],p=t[15],A=d*m*c-M*u*c+M*l*f-r*m*f-d*l*p+r*u*p,x=g*u*c-h*m*c-g*l*f+a*m*f+h*l*p-a*u*p,b=h*M*c-g*d*c+g*r*f-a*M*f-h*r*p+a*d*p,I=g*d*l-h*M*l-g*r*u+a*M*u+h*r*m-a*d*m,T=e*A+i*x+n*b+o*I;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const _=1/T;return t[0]=A*_,t[1]=(M*u*o-d*m*o-M*n*f+i*m*f+d*n*p-i*u*p)*_,t[2]=(r*m*o-M*l*o+M*n*c-i*m*c-r*n*p+i*l*p)*_,t[3]=(d*l*o-r*u*o-d*n*c+i*u*c+r*n*f-i*l*f)*_,t[4]=x*_,t[5]=(h*m*o-g*u*o+g*n*f-e*m*f-h*n*p+e*u*p)*_,t[6]=(g*l*o-a*m*o-g*n*c+e*m*c+a*n*p-e*l*p)*_,t[7]=(a*u*o-h*l*o+h*n*c-e*u*c-a*n*f+e*l*f)*_,t[8]=b*_,t[9]=(g*d*o-h*M*o-g*i*f+e*M*f+h*i*p-e*d*p)*_,t[10]=(a*M*o-g*r*o+g*i*c-e*M*c-a*i*p+e*r*p)*_,t[11]=(h*r*o-a*d*o-h*i*c+e*d*c+a*i*f-e*r*f)*_,t[12]=I*_,t[13]=(h*M*n-g*d*n+g*i*u-e*M*u-h*i*m+e*d*m)*_,t[14]=(g*r*n-a*M*n-g*i*l+e*M*l+a*i*m-e*r*m)*_,t[15]=(a*d*n-h*r*n+h*i*l-e*d*l-a*i*u+e*r*u)*_,this}scale(t){const e=this.elements,i=t.x,n=t.y,o=t.z;return e[0]*=i,e[4]*=n,e[8]*=o,e[1]*=i,e[5]*=n,e[9]*=o,e[2]*=i,e[6]*=n,e[10]*=o,e[3]*=i,e[7]*=n,e[11]*=o,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],n=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,n))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),n=Math.sin(e),o=1-i,a=t.x,r=t.y,l=t.z,c=o*a,h=o*r;return this.set(c*a+i,c*r-n*l,c*l+n*r,0,c*r+n*l,h*r+i,h*l-n*a,0,c*l-n*r,h*l+n*a,o*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,n,o,a){return this.set(1,i,o,0,t,1,a,0,e,n,1,0,0,0,0,1),this}compose(t,e,i){const n=this.elements,o=e._x,a=e._y,r=e._z,l=e._w,c=o+o,h=a+a,d=r+r,u=o*c,f=o*h,g=o*d,M=a*h,m=a*d,p=r*d,A=l*c,x=l*h,b=l*d,I=i.x,T=i.y,_=i.z;return n[0]=(1-(M+p))*I,n[1]=(f+b)*I,n[2]=(g-x)*I,n[3]=0,n[4]=(f-b)*T,n[5]=(1-(u+p))*T,n[6]=(m+A)*T,n[7]=0,n[8]=(g+x)*_,n[9]=(m-A)*_,n[10]=(1-(u+M))*_,n[11]=0,n[12]=t.x,n[13]=t.y,n[14]=t.z,n[15]=1,this}decompose(t,e,i){const n=this.elements;let o=Ki.set(n[0],n[1],n[2]).length();const a=Ki.set(n[4],n[5],n[6]).length(),r=Ki.set(n[8],n[9],n[10]).length();this.determinant()<0&&(o=-o),t.x=n[12],t.y=n[13],t.z=n[14],Qe.copy(this);const c=1/o,h=1/a,d=1/r;return Qe.elements[0]*=c,Qe.elements[1]*=c,Qe.elements[2]*=c,Qe.elements[4]*=h,Qe.elements[5]*=h,Qe.elements[6]*=h,Qe.elements[8]*=d,Qe.elements[9]*=d,Qe.elements[10]*=d,e.setFromRotationMatrix(Qe),i.x=o,i.y=a,i.z=r,this}makePerspective(t,e,i,n,o,a,r=pi){const l=this.elements,c=2*o/(e-t),h=2*o/(i-n),d=(e+t)/(e-t),u=(i+n)/(i-n);let f,g;if(r===pi)f=-(a+o)/(a-o),g=-2*a*o/(a-o);else if(r===Ns)f=-a/(a-o),g=-a*o/(a-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+r);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,n,o,a,r=pi){const l=this.elements,c=1/(e-t),h=1/(i-n),d=1/(a-o),u=(e+t)*c,f=(i+n)*h;let g,M;if(r===pi)g=(a+o)*d,M=-2*d;else if(r===Ns)g=o*d,M=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+r);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=M,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let n=0;n<16;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const Ki=new R,Qe=new se,xh=new R(0,0,0),_h=new R(1,1,1),vi=new R,os=new R,Ge=new R,Qa=new se,tr=new Ie;class Yn{constructor(t=0,e=0,i=0,n=Yn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=n}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,n=this._order){return this._x=t,this._y=e,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const n=t.elements,o=n[0],a=n[4],r=n[8],l=n[1],c=n[5],h=n[9],d=n[2],u=n[6],f=n[10];switch(e){case"XYZ":this._y=Math.asin(be(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,o)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-be(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(r,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,o),this._z=0);break;case"ZXY":this._x=Math.asin(be(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,o));break;case"ZYX":this._y=Math.asin(-be(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,o)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(be(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,o)):(this._x=0,this._y=Math.atan2(r,f));break;case"XZY":this._z=Math.asin(-be(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(r,o)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Qa.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Qa,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return tr.setFromEuler(this),this.setFromQuaternion(tr,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Yn.DEFAULT_ORDER="XYZ";class Ul{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let yh=0;const er=new R,Ji=new Ie,ci=new se,as=new R,In=new R,vh=new R,Sh=new Ie,ir=new R(1,0,0),nr=new R(0,1,0),sr=new R(0,0,1),wh={type:"added"},Eh={type:"removed"};class ce extends bn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:yh++}),this.uuid=gi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ce.DEFAULT_UP.clone();const t=new R,e=new Yn,i=new Ie,n=new R(1,1,1);function o(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(o),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new se},normalMatrix:{value:new Qt}}),this.matrix=new se,this.matrixWorld=new se,this.matrixAutoUpdate=ce.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ul,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ji.setFromAxisAngle(t,e),this.quaternion.multiply(Ji),this}rotateOnWorldAxis(t,e){return Ji.setFromAxisAngle(t,e),this.quaternion.premultiply(Ji),this}rotateX(t){return this.rotateOnAxis(ir,t)}rotateY(t){return this.rotateOnAxis(nr,t)}rotateZ(t){return this.rotateOnAxis(sr,t)}translateOnAxis(t,e){return er.copy(t).applyQuaternion(this.quaternion),this.position.add(er.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ir,t)}translateY(t){return this.translateOnAxis(nr,t)}translateZ(t){return this.translateOnAxis(sr,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ci.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?as.copy(t):as.set(t,e,i);const n=this.parent;this.updateWorldMatrix(!0,!1),In.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ci.lookAt(In,as,this.up):ci.lookAt(as,In,this.up),this.quaternion.setFromRotationMatrix(ci),n&&(ci.extractRotation(n.matrixWorld),Ji.setFromRotationMatrix(ci),this.quaternion.premultiply(Ji.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(wh)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Eh)),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ci.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ci.multiply(t.parent.matrixWorld)),t.applyMatrix4(ci),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,n=this.children.length;i<n;i++){const a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const n=this.children;for(let o=0,a=n.length;o<a;o++)n[o].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(In,t,vh),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(In,Sh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,n=e.length;i<n;i++){const o=e[i];(o.matrixWorldAutoUpdate===!0||t===!0)&&o.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const n=this.children;for(let o=0,a=n.length;o<a;o++){const r=n[o];r.matrixWorldAutoUpdate===!0&&r.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const n={};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.castShadow===!0&&(n.castShadow=!0),this.receiveShadow===!0&&(n.receiveShadow=!0),this.visible===!1&&(n.visible=!1),this.frustumCulled===!1&&(n.frustumCulled=!1),this.renderOrder!==0&&(n.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(n.matrixAutoUpdate=!1),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.visibility=this._visibility,n.active=this._active,n.bounds=this._bounds.map(r=>({boxInitialized:r.boxInitialized,boxMin:r.box.min.toArray(),boxMax:r.box.max.toArray(),sphereInitialized:r.sphereInitialized,sphereRadius:r.sphere.radius,sphereCenter:r.sphere.center.toArray()})),n.maxGeometryCount=this._maxGeometryCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.geometryCount=this._geometryCount,n.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(n.boundingSphere={center:n.boundingSphere.center.toArray(),radius:n.boundingSphere.radius}),this.boundingBox!==null&&(n.boundingBox={min:n.boundingBox.min.toArray(),max:n.boundingBox.max.toArray()}));function o(r,l){return r[l.uuid]===void 0&&(r[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=o(t.geometries,this.geometry);const r=this.geometry.parameters;if(r!==void 0&&r.shapes!==void 0){const l=r.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];o(t.shapes,d)}else o(t.shapes,l)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(t.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const r=[];for(let l=0,c=this.material.length;l<c;l++)r.push(o(t.materials,this.material[l]));n.material=r}else n.material=o(t.materials,this.material);if(this.children.length>0){n.children=[];for(let r=0;r<this.children.length;r++)n.children.push(this.children[r].toJSON(t).object)}if(this.animations.length>0){n.animations=[];for(let r=0;r<this.animations.length;r++){const l=this.animations[r];n.animations.push(o(t.animations,l))}}if(e){const r=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),d=a(t.shapes),u=a(t.skeletons),f=a(t.animations),g=a(t.nodes);r.length>0&&(i.geometries=r),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=n,i;function a(r){const l=[];for(const c in r){const h=r[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const n=t.children[i];this.add(n.clone())}return this}}ce.DEFAULT_UP=new R(0,1,0);ce.DEFAULT_MATRIX_AUTO_UPDATE=!0;ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ti=new R,hi=new R,co=new R,di=new R,Qi=new R,tn=new R,or=new R,ho=new R,fo=new R,uo=new R;let rs=!1;class Ye{constructor(t=new R,e=new R,i=new R){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,n){n.subVectors(i,e),ti.subVectors(t,e),n.cross(ti);const o=n.lengthSq();return o>0?n.multiplyScalar(1/Math.sqrt(o)):n.set(0,0,0)}static getBarycoord(t,e,i,n,o){ti.subVectors(n,e),hi.subVectors(i,e),co.subVectors(t,e);const a=ti.dot(ti),r=ti.dot(hi),l=ti.dot(co),c=hi.dot(hi),h=hi.dot(co),d=a*c-r*r;if(d===0)return o.set(0,0,0),null;const u=1/d,f=(c*l-r*h)*u,g=(a*h-r*l)*u;return o.set(1-f-g,g,f)}static containsPoint(t,e,i,n){return this.getBarycoord(t,e,i,n,di)===null?!1:di.x>=0&&di.y>=0&&di.x+di.y<=1}static getUV(t,e,i,n,o,a,r,l){return rs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),rs=!0),this.getInterpolation(t,e,i,n,o,a,r,l)}static getInterpolation(t,e,i,n,o,a,r,l){return this.getBarycoord(t,e,i,n,di)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(o,di.x),l.addScaledVector(a,di.y),l.addScaledVector(r,di.z),l)}static isFrontFacing(t,e,i,n){return ti.subVectors(i,e),hi.subVectors(t,e),ti.cross(hi).dot(n)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,n){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[n]),this}setFromAttributeAndIndices(t,e,i,n){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,n),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ti.subVectors(this.c,this.b),hi.subVectors(this.a,this.b),ti.cross(hi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Ye.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Ye.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,i,n,o){return rs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),rs=!0),Ye.getInterpolation(t,this.a,this.b,this.c,e,i,n,o)}getInterpolation(t,e,i,n,o){return Ye.getInterpolation(t,this.a,this.b,this.c,e,i,n,o)}containsPoint(t){return Ye.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Ye.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,n=this.b,o=this.c;let a,r;Qi.subVectors(n,i),tn.subVectors(o,i),ho.subVectors(t,i);const l=Qi.dot(ho),c=tn.dot(ho);if(l<=0&&c<=0)return e.copy(i);fo.subVectors(t,n);const h=Qi.dot(fo),d=tn.dot(fo);if(h>=0&&d<=h)return e.copy(n);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(i).addScaledVector(Qi,a);uo.subVectors(t,o);const f=Qi.dot(uo),g=tn.dot(uo);if(g>=0&&f<=g)return e.copy(o);const M=f*c-l*g;if(M<=0&&c>=0&&g<=0)return r=c/(c-g),e.copy(i).addScaledVector(tn,r);const m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return or.subVectors(o,n),r=(d-h)/(d-h+(f-g)),e.copy(n).addScaledVector(or,r);const p=1/(m+M+u);return a=M*p,r=u*p,e.copy(i).addScaledVector(Qi,a).addScaledVector(tn,r)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const zl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Si={h:0,s:0,l:0},ls={h:0,s:0,l:0};function po(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class te{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const n=t;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=we){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ne.toWorkingColorSpace(this,e),this}setRGB(t,e,i,n=ne.workingColorSpace){return this.r=t,this.g=e,this.b=i,ne.toWorkingColorSpace(this,n),this}setHSL(t,e,i,n=ne.workingColorSpace){if(t=na(t,1),e=be(e,0,1),i=be(i,0,1),e===0)this.r=this.g=this.b=i;else{const o=i<=.5?i*(1+e):i+e-i*e,a=2*i-o;this.r=po(a,o,t+1/3),this.g=po(a,o,t),this.b=po(a,o,t-1/3)}return ne.toWorkingColorSpace(this,n),this}setStyle(t,e=we){function i(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(t)){let o;const a=n[1],r=n[2];switch(a){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r))return i(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,e);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r))return i(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,e);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r))return i(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(t)){const o=n[1],a=o.length;if(a===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(o,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=we){const i=zl[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Mn(t.r),this.g=Mn(t.g),this.b=Mn(t.b),this}copyLinearToSRGB(t){return this.r=eo(t.r),this.g=eo(t.g),this.b=eo(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=we){return ne.fromWorkingColorSpace(Ce.copy(this),t),Math.round(be(Ce.r*255,0,255))*65536+Math.round(be(Ce.g*255,0,255))*256+Math.round(be(Ce.b*255,0,255))}getHexString(t=we){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ne.workingColorSpace){ne.fromWorkingColorSpace(Ce.copy(this),e);const i=Ce.r,n=Ce.g,o=Ce.b,a=Math.max(i,n,o),r=Math.min(i,n,o);let l,c;const h=(r+a)/2;if(r===a)l=0,c=0;else{const d=a-r;switch(c=h<=.5?d/(a+r):d/(2-a-r),a){case i:l=(n-o)/d+(n<o?6:0);break;case n:l=(o-i)/d+2;break;case o:l=(i-n)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ne.workingColorSpace){return ne.fromWorkingColorSpace(Ce.copy(this),e),t.r=Ce.r,t.g=Ce.g,t.b=Ce.b,t}getStyle(t=we){ne.fromWorkingColorSpace(Ce.copy(this),t);const e=Ce.r,i=Ce.g,n=Ce.b;return t!==we?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(t,e,i){return this.getHSL(Si),this.setHSL(Si.h+t,Si.s+e,Si.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Si),t.getHSL(ls);const i=Vn(Si.h,ls.h,e),n=Vn(Si.s,ls.s,e),o=Vn(Si.l,ls.l,e);return this.setHSL(i,n,o),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,n=this.b,o=t.elements;return this.r=o[0]*e+o[3]*i+o[6]*n,this.g=o[1]*e+o[4]*i+o[7]*n,this.b=o[2]*e+o[5]*i+o[8]*n,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ce=new te;te.NAMES=zl;let bh=0;class Xi extends bn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:bh++}),this.uuid=gi(),this.name="",this.type="Material",this.blending=gn,this.side=Ci,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Wo,this.blendDst=Xo,this.blendEquation=Oi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new te(0,0,0),this.blendAlpha=0,this.depthFunc=Ls,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=qa,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=qi,this.stencilZFail=qi,this.stencilZPass=qi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const n=this[e];if(n===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==gn&&(i.blending=this.blending),this.side!==Ci&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Wo&&(i.blendSrc=this.blendSrc),this.blendDst!==Xo&&(i.blendDst=this.blendDst),this.blendEquation!==Oi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ls&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==qa&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==qi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==qi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==qi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(o){const a=[];for(const r in o){const l=o[r];delete l.metadata,a.push(l)}return a}if(e){const o=n(t.textures),a=n(t.images);o.length>0&&(i.textures=o),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const n=e.length;i=new Array(n);for(let o=0;o!==n;++o)i[o]=e[o].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class fe extends Xi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new te(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=ul,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Me=new R,cs=new Xt;class Ke{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=$o,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Ei,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let n=0,o=this.itemSize;n<o;n++)this.array[t+n]=e.array[i+n];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)cs.fromBufferAttribute(this,e),cs.applyMatrix3(t),this.setXY(e,cs.x,cs.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix3(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix4(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Me.fromBufferAttribute(this,e),Me.applyNormalMatrix(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Me.fromBufferAttribute(this,e),Me.transformDirection(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=si(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=ae(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=si(e,this.array)),e}setX(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=si(e,this.array)),e}setY(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=si(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=si(e,this.array)),e}setW(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=ae(e,this.array),i=ae(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,n){return t*=this.itemSize,this.normalized&&(e=ae(e,this.array),i=ae(i,this.array),n=ae(n,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this}setXYZW(t,e,i,n,o){return t*=this.itemSize,this.normalized&&(e=ae(e,this.array),i=ae(i,this.array),n=ae(n,this.array),o=ae(o,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this.array[t+3]=o,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==$o&&(t.usage=this.usage),t}}class Nl extends Ke{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Fl extends Ke{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class He extends Ke{constructor(t,e,i){super(new Float32Array(t),e,i)}}let Th=0;const qe=new se,mo=new ce,en=new R,ke=new Xn,Dn=new Xn,Se=new R;class We extends bn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Th++}),this.uuid=gi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Rl(t)?Fl:Nl)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const o=new Qt().getNormalMatrix(t);i.applyNormalMatrix(o),i.needsUpdate=!0}const n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(t),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return qe.makeRotationFromQuaternion(t),this.applyMatrix4(qe),this}rotateX(t){return qe.makeRotationX(t),this.applyMatrix4(qe),this}rotateY(t){return qe.makeRotationY(t),this.applyMatrix4(qe),this}rotateZ(t){return qe.makeRotationZ(t),this.applyMatrix4(qe),this}translate(t,e,i){return qe.makeTranslation(t,e,i),this.applyMatrix4(qe),this}scale(t,e,i){return qe.makeScale(t,e,i),this.applyMatrix4(qe),this}lookAt(t){return mo.lookAt(t),mo.updateMatrix(),this.applyMatrix4(mo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(en).negate(),this.translate(en.x,en.y,en.z),this}setFromPoints(t){const e=[];for(let i=0,n=t.length;i<n;i++){const o=t[i];e.push(o.x,o.y,o.z||0)}return this.setAttribute("position",new He(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Xn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,n=e.length;i<n;i++){const o=e[i];ke.setFromBufferAttribute(o),this.morphTargetsRelative?(Se.addVectors(this.boundingBox.min,ke.min),this.boundingBox.expandByPoint(Se),Se.addVectors(this.boundingBox.max,ke.max),this.boundingBox.expandByPoint(Se)):(this.boundingBox.expandByPoint(ke.min),this.boundingBox.expandByPoint(ke.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new qn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new R,1/0);return}if(t){const i=this.boundingSphere.center;if(ke.setFromBufferAttribute(t),e)for(let o=0,a=e.length;o<a;o++){const r=e[o];Dn.setFromBufferAttribute(r),this.morphTargetsRelative?(Se.addVectors(ke.min,Dn.min),ke.expandByPoint(Se),Se.addVectors(ke.max,Dn.max),ke.expandByPoint(Se)):(ke.expandByPoint(Dn.min),ke.expandByPoint(Dn.max))}ke.getCenter(i);let n=0;for(let o=0,a=t.count;o<a;o++)Se.fromBufferAttribute(t,o),n=Math.max(n,i.distanceToSquared(Se));if(e)for(let o=0,a=e.length;o<a;o++){const r=e[o],l=this.morphTargetsRelative;for(let c=0,h=r.count;c<h;c++)Se.fromBufferAttribute(r,c),l&&(en.fromBufferAttribute(t,c),Se.add(en)),n=Math.max(n,i.distanceToSquared(Se))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.array,n=e.position.array,o=e.normal.array,a=e.uv.array,r=n.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ke(new Float32Array(4*r),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let E=0;E<r;E++)c[E]=new R,h[E]=new R;const d=new R,u=new R,f=new R,g=new Xt,M=new Xt,m=new Xt,p=new R,A=new R;function x(E,L,z){d.fromArray(n,E*3),u.fromArray(n,L*3),f.fromArray(n,z*3),g.fromArray(a,E*2),M.fromArray(a,L*2),m.fromArray(a,z*2),u.sub(d),f.sub(d),M.sub(g),m.sub(g);const Z=1/(M.x*m.y-m.x*M.y);isFinite(Z)&&(p.copy(u).multiplyScalar(m.y).addScaledVector(f,-M.y).multiplyScalar(Z),A.copy(f).multiplyScalar(M.x).addScaledVector(u,-m.x).multiplyScalar(Z),c[E].add(p),c[L].add(p),c[z].add(p),h[E].add(A),h[L].add(A),h[z].add(A))}let b=this.groups;b.length===0&&(b=[{start:0,count:i.length}]);for(let E=0,L=b.length;E<L;++E){const z=b[E],Z=z.start,C=z.count;for(let D=Z,B=Z+C;D<B;D+=3)x(i[D+0],i[D+1],i[D+2])}const I=new R,T=new R,_=new R,P=new R;function v(E){_.fromArray(o,E*3),P.copy(_);const L=c[E];I.copy(L),I.sub(_.multiplyScalar(_.dot(L))).normalize(),T.crossVectors(P,L);const Z=T.dot(h[E])<0?-1:1;l[E*4]=I.x,l[E*4+1]=I.y,l[E*4+2]=I.z,l[E*4+3]=Z}for(let E=0,L=b.length;E<L;++E){const z=b[E],Z=z.start,C=z.count;for(let D=Z,B=Z+C;D<B;D+=3)v(i[D+0]),v(i[D+1]),v(i[D+2])}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ke(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let u=0,f=i.count;u<f;u++)i.setXYZ(u,0,0,0);const n=new R,o=new R,a=new R,r=new R,l=new R,c=new R,h=new R,d=new R;if(t)for(let u=0,f=t.count;u<f;u+=3){const g=t.getX(u+0),M=t.getX(u+1),m=t.getX(u+2);n.fromBufferAttribute(e,g),o.fromBufferAttribute(e,M),a.fromBufferAttribute(e,m),h.subVectors(a,o),d.subVectors(n,o),h.cross(d),r.fromBufferAttribute(i,g),l.fromBufferAttribute(i,M),c.fromBufferAttribute(i,m),r.add(h),l.add(h),c.add(h),i.setXYZ(g,r.x,r.y,r.z),i.setXYZ(M,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)n.fromBufferAttribute(e,u+0),o.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,o),d.subVectors(n,o),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Se.fromBufferAttribute(t,e),Se.normalize(),t.setXYZ(e,Se.x,Se.y,Se.z)}toNonIndexed(){function t(r,l){const c=r.array,h=r.itemSize,d=r.normalized,u=new c.constructor(l.length*h);let f=0,g=0;for(let M=0,m=l.length;M<m;M++){r.isInterleavedBufferAttribute?f=l[M]*r.data.stride+r.offset:f=l[M]*h;for(let p=0;p<h;p++)u[g++]=c[f++]}return new Ke(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new We,i=this.index.array,n=this.attributes;for(const r in n){const l=n[r],c=t(l,i);e.setAttribute(r,c)}const o=this.morphAttributes;for(const r in o){const l=[],c=o[r];for(let h=0,d=c.length;h<d;h++){const u=c[h],f=t(u,i);l.push(f)}e.morphAttributes[r]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let r=0,l=a.length;r<l;r++){const c=a[r];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const n={};let o=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const f=c[d];h.push(f.toJSON(t.data))}h.length>0&&(n[l]=h,o=!0)}o&&(t.data.morphAttributes=n,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const r=this.boundingSphere;return r!==null&&(t.data.boundingSphere={center:r.center.toArray(),radius:r.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const n=t.attributes;for(const c in n){const h=n[c];this.setAttribute(c,h.clone(e))}const o=t.morphAttributes;for(const c in o){const h=[],d=o[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const r=t.boundingBox;r!==null&&(this.boundingBox=r.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ar=new se,Ui=new Dl,hs=new qn,rr=new R,nn=new R,sn=new R,on=new R,go=new R,ds=new R,fs=new Xt,us=new Xt,ps=new Xt,lr=new R,cr=new R,hr=new R,ms=new R,gs=new R;class tt extends ce{constructor(t=new We,e=new fe){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,a=n.length;o<a;o++){const r=n[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[r]=o}}}}getVertexPosition(t,e){const i=this.geometry,n=i.attributes.position,o=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(n,t);const r=this.morphTargetInfluences;if(o&&r){ds.set(0,0,0);for(let l=0,c=o.length;l<c;l++){const h=r[l],d=o[l];h!==0&&(go.fromBufferAttribute(d,t),a?ds.addScaledVector(go,h):ds.addScaledVector(go.sub(e),h))}e.add(ds)}return e}raycast(t,e){const i=this.geometry,n=this.material,o=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),hs.copy(i.boundingSphere),hs.applyMatrix4(o),Ui.copy(t.ray).recast(t.near),!(hs.containsPoint(Ui.origin)===!1&&(Ui.intersectSphere(hs,rr)===null||Ui.origin.distanceToSquared(rr)>(t.far-t.near)**2))&&(ar.copy(o).invert(),Ui.copy(t.ray).applyMatrix4(ar),!(i.boundingBox!==null&&Ui.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Ui)))}_computeIntersections(t,e,i){let n;const o=this.geometry,a=this.material,r=o.index,l=o.attributes.position,c=o.attributes.uv,h=o.attributes.uv1,d=o.attributes.normal,u=o.groups,f=o.drawRange;if(r!==null)if(Array.isArray(a))for(let g=0,M=u.length;g<M;g++){const m=u[g],p=a[m.materialIndex],A=Math.max(m.start,f.start),x=Math.min(r.count,Math.min(m.start+m.count,f.start+f.count));for(let b=A,I=x;b<I;b+=3){const T=r.getX(b),_=r.getX(b+1),P=r.getX(b+2);n=Ms(this,p,t,i,c,h,d,T,_,P),n&&(n.faceIndex=Math.floor(b/3),n.face.materialIndex=m.materialIndex,e.push(n))}}else{const g=Math.max(0,f.start),M=Math.min(r.count,f.start+f.count);for(let m=g,p=M;m<p;m+=3){const A=r.getX(m),x=r.getX(m+1),b=r.getX(m+2);n=Ms(this,a,t,i,c,h,d,A,x,b),n&&(n.faceIndex=Math.floor(m/3),e.push(n))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,M=u.length;g<M;g++){const m=u[g],p=a[m.materialIndex],A=Math.max(m.start,f.start),x=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let b=A,I=x;b<I;b+=3){const T=b,_=b+1,P=b+2;n=Ms(this,p,t,i,c,h,d,T,_,P),n&&(n.faceIndex=Math.floor(b/3),n.face.materialIndex=m.materialIndex,e.push(n))}}else{const g=Math.max(0,f.start),M=Math.min(l.count,f.start+f.count);for(let m=g,p=M;m<p;m+=3){const A=m,x=m+1,b=m+2;n=Ms(this,a,t,i,c,h,d,A,x,b),n&&(n.faceIndex=Math.floor(m/3),e.push(n))}}}}function Ah(s,t,e,i,n,o,a,r){let l;if(t.side===Ne?l=i.intersectTriangle(a,o,n,!0,r):l=i.intersectTriangle(n,o,a,t.side===Ci,r),l===null)return null;gs.copy(r),gs.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(gs);return c<e.near||c>e.far?null:{distance:c,point:gs.clone(),object:s}}function Ms(s,t,e,i,n,o,a,r,l,c){s.getVertexPosition(r,nn),s.getVertexPosition(l,sn),s.getVertexPosition(c,on);const h=Ah(s,t,e,i,nn,sn,on,ms);if(h){n&&(fs.fromBufferAttribute(n,r),us.fromBufferAttribute(n,l),ps.fromBufferAttribute(n,c),h.uv=Ye.getInterpolation(ms,nn,sn,on,fs,us,ps,new Xt)),o&&(fs.fromBufferAttribute(o,r),us.fromBufferAttribute(o,l),ps.fromBufferAttribute(o,c),h.uv1=Ye.getInterpolation(ms,nn,sn,on,fs,us,ps,new Xt),h.uv2=h.uv1),a&&(lr.fromBufferAttribute(a,r),cr.fromBufferAttribute(a,l),hr.fromBufferAttribute(a,c),h.normal=Ye.getInterpolation(ms,nn,sn,on,lr,cr,hr,new R),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const d={a:r,b:l,c,normal:new R,materialIndex:0};Ye.getNormal(nn,sn,on,d.normal),h.face=d}return h}class H extends We{constructor(t=1,e=1,i=1,n=1,o=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:n,heightSegments:o,depthSegments:a};const r=this;n=Math.floor(n),o=Math.floor(o),a=Math.floor(a);const l=[],c=[],h=[],d=[];let u=0,f=0;g("z","y","x",-1,-1,i,e,t,a,o,0),g("z","y","x",1,-1,i,e,-t,a,o,1),g("x","z","y",1,1,t,i,e,n,a,2),g("x","z","y",1,-1,t,i,-e,n,a,3),g("x","y","z",1,-1,t,e,i,n,o,4),g("x","y","z",-1,-1,t,e,-i,n,o,5),this.setIndex(l),this.setAttribute("position",new He(c,3)),this.setAttribute("normal",new He(h,3)),this.setAttribute("uv",new He(d,2));function g(M,m,p,A,x,b,I,T,_,P,v){const E=b/_,L=I/P,z=b/2,Z=I/2,C=T/2,D=_+1,B=P+1;let O=0,W=0;const et=new R;for(let nt=0;nt<B;nt++){const rt=nt*L-Z;for(let mt=0;mt<D;mt++){const J=mt*E-z;et[M]=J*A,et[m]=rt*x,et[p]=C,c.push(et.x,et.y,et.z),et[M]=0,et[m]=0,et[p]=T>0?1:-1,h.push(et.x,et.y,et.z),d.push(mt/_),d.push(1-nt/P),O+=1}}for(let nt=0;nt<P;nt++)for(let rt=0;rt<_;rt++){const mt=u+rt+D*nt,J=u+rt+D*(nt+1),ot=u+(rt+1)+D*(nt+1),gt=u+(rt+1)+D*nt;l.push(mt,J,gt),l.push(J,ot,gt),W+=6}r.addGroup(f,W,v),f+=W,u+=O}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new H(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function En(s){const t={};for(const e in s){t[e]={};for(const i in s[e]){const n=s[e][i];n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)?n.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=n.clone():Array.isArray(n)?t[e][i]=n.slice():t[e][i]=n}}return t}function Le(s){const t={};for(let e=0;e<s.length;e++){const i=En(s[e]);for(const n in i)t[n]=i[n]}return t}function Ch(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Bl(s){return s.getRenderTarget()===null?s.outputColorSpace:ne.workingColorSpace}const sa={clone:En,merge:Le};var Rh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ph=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class oi extends Xi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Rh,this.fragmentShader=Ph,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=En(t.uniforms),this.uniformsGroups=Ch(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const n in this.uniforms){const a=this.uniforms[n].value;a&&a.isTexture?e.uniforms[n]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[n]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[n]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[n]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[n]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[n]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[n]={type:"m4",value:a.toArray()}:e.uniforms[n]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Ol extends ce{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new se,this.projectionMatrix=new se,this.projectionMatrixInverse=new se,this.coordinateSystem=pi}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Ue extends Ol{constructor(t=50,e=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=wn*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(kn*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return wn*2*Math.atan(Math.tan(kn*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,i,n,o,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=o,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(kn*.5*this.fov)/this.zoom,i=2*e,n=this.aspect*i,o=-.5*n;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;o+=a.offsetX*n/l,e-=a.offsetY*i/c,n*=a.width/l,i*=a.height/c}const r=this.filmOffset;r!==0&&(o+=t*r/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+n,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const an=-90,rn=1;class Lh extends ce{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const n=new Ue(an,rn,t,e);n.layers=this.layers,this.add(n);const o=new Ue(an,rn,t,e);o.layers=this.layers,this.add(o);const a=new Ue(an,rn,t,e);a.layers=this.layers,this.add(a);const r=new Ue(an,rn,t,e);r.layers=this.layers,this.add(r);const l=new Ue(an,rn,t,e);l.layers=this.layers,this.add(l);const c=new Ue(an,rn,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,n,o,a,r,l]=e;for(const c of e)this.remove(c);if(t===pi)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),r.up.set(0,1,0),r.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ns)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),r.up.set(0,-1,0),r.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[o,a,r,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const M=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,n),t.render(e,o),t.setRenderTarget(i,1,n),t.render(e,a),t.setRenderTarget(i,2,n),t.render(e,r),t.setRenderTarget(i,3,n),t.render(e,l),t.setRenderTarget(i,4,n),t.render(e,c),i.texture.generateMipmaps=M,t.setRenderTarget(i,5,n),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Gl extends Fe{constructor(t,e,i,n,o,a,r,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:xn,super(t,e,i,n,o,a,r,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Ih extends Ri{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},n=[i,i,i,i,i,i];e.encoding!==void 0&&(Hn("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),e.colorSpace=e.encoding===Hi?we:Ze),this.texture=new Gl(n,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:De}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},n=new H(5,5,5),o=new oi({name:"CubemapFromEquirect",uniforms:En(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ne,blending:mi});o.uniforms.tEquirect.value=e;const a=new tt(n,o),r=e.minFilter;return e.minFilter===yn&&(e.minFilter=De),new Lh(1,10,this).update(t,a),e.minFilter=r,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,i,n){const o=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,n);t.setRenderTarget(o)}}const Mo=new R,Dh=new R,Uh=new Qt;class Fi{constructor(t=new R(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,n){return this.normal.set(t,e,i),this.constant=n,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const n=Mo.subVectors(i,e).cross(Dh.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(n,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(Mo),n=this.normal.dot(i);if(n===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/n;return o<0||o>1?null:e.copy(t.start).addScaledVector(i,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Uh.getNormalMatrix(t),n=this.coplanarPoint(Mo).applyMatrix4(t),o=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(o),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const zi=new qn,xs=new R;class Tn{constructor(t=new Fi,e=new Fi,i=new Fi,n=new Fi,o=new Fi,a=new Fi){this.planes=[t,e,i,n,o,a]}set(t,e,i,n,o,a){const r=this.planes;return r[0].copy(t),r[1].copy(e),r[2].copy(i),r[3].copy(n),r[4].copy(o),r[5].copy(a),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=pi){const i=this.planes,n=t.elements,o=n[0],a=n[1],r=n[2],l=n[3],c=n[4],h=n[5],d=n[6],u=n[7],f=n[8],g=n[9],M=n[10],m=n[11],p=n[12],A=n[13],x=n[14],b=n[15];if(i[0].setComponents(l-o,u-c,m-f,b-p).normalize(),i[1].setComponents(l+o,u+c,m+f,b+p).normalize(),i[2].setComponents(l+a,u+h,m+g,b+A).normalize(),i[3].setComponents(l-a,u-h,m-g,b-A).normalize(),i[4].setComponents(l-r,u-d,m-M,b-x).normalize(),e===pi)i[5].setComponents(l+r,u+d,m+M,b+x).normalize();else if(e===Ns)i[5].setComponents(r,d,M,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),zi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),zi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(zi)}intersectsSprite(t){return zi.center.set(0,0,0),zi.radius=.7071067811865476,zi.applyMatrix4(t.matrixWorld),this.intersectsSphere(zi)}intersectsSphere(t){const e=this.planes,i=t.center,n=-t.radius;for(let o=0;o<6;o++)if(e[o].distanceToPoint(i)<n)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const n=e[i];if(xs.x=n.normal.x>0?t.max.x:t.min.x,xs.y=n.normal.y>0?t.max.y:t.min.y,xs.z=n.normal.z>0?t.max.z:t.min.z,n.distanceToPoint(xs)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function kl(){let s=null,t=!1,e=null,i=null;function n(o,a){e(o,a),i=s.requestAnimationFrame(n)}return{start:function(){t!==!0&&e!==null&&(i=s.requestAnimationFrame(n),t=!0)},stop:function(){s.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(o){e=o},setContext:function(o){s=o}}}function zh(s,t){const e=t.isWebGL2,i=new WeakMap;function n(c,h){const d=c.array,u=c.usage,f=d.byteLength,g=s.createBuffer();s.bindBuffer(h,g),s.bufferData(h,d,u),c.onUploadCallback();let M;if(d instanceof Float32Array)M=s.FLOAT;else if(d instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(e)M=s.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else M=s.UNSIGNED_SHORT;else if(d instanceof Int16Array)M=s.SHORT;else if(d instanceof Uint32Array)M=s.UNSIGNED_INT;else if(d instanceof Int32Array)M=s.INT;else if(d instanceof Int8Array)M=s.BYTE;else if(d instanceof Uint8Array)M=s.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)M=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:g,type:M,bytesPerElement:d.BYTES_PER_ELEMENT,version:c.version,size:f}}function o(c,h,d){const u=h.array,f=h._updateRange,g=h.updateRanges;if(s.bindBuffer(d,c),f.count===-1&&g.length===0&&s.bufferSubData(d,0,u),g.length!==0){for(let M=0,m=g.length;M<m;M++){const p=g[M];e?s.bufferSubData(d,p.start*u.BYTES_PER_ELEMENT,u,p.start,p.count):s.bufferSubData(d,p.start*u.BYTES_PER_ELEMENT,u.subarray(p.start,p.start+p.count))}h.clearUpdateRanges()}f.count!==-1&&(e?s.bufferSubData(d,f.offset*u.BYTES_PER_ELEMENT,u,f.offset,f.count):s.bufferSubData(d,f.offset*u.BYTES_PER_ELEMENT,u.subarray(f.offset,f.offset+f.count)),f.count=-1),h.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function r(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=i.get(c);h&&(s.deleteBuffer(h.buffer),i.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const u=i.get(c);(!u||u.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const d=i.get(c);if(d===void 0)i.set(c,n(c,h));else if(d.version<c.version){if(d.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");o(d.buffer,c,h),d.version=c.version}}return{get:a,remove:r,update:l}}class bi extends We{constructor(t=1,e=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:n};const o=t/2,a=e/2,r=Math.floor(i),l=Math.floor(n),c=r+1,h=l+1,d=t/r,u=e/l,f=[],g=[],M=[],m=[];for(let p=0;p<h;p++){const A=p*u-a;for(let x=0;x<c;x++){const b=x*d-o;g.push(b,-A,0),M.push(0,0,1),m.push(x/r),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let A=0;A<r;A++){const x=A+c*p,b=A+c*(p+1),I=A+1+c*(p+1),T=A+1+c*p;f.push(x,b,T),f.push(b,I,T)}this.setIndex(f),this.setAttribute("position",new He(g,3)),this.setAttribute("normal",new He(M,3)),this.setAttribute("uv",new He(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new bi(t.width,t.height,t.widthSegments,t.heightSegments)}}var Nh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Fh=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Bh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Oh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Gh=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,kh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Vh=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Hh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Wh=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Xh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,qh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Yh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,$h=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,jh=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Zh=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Kh=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,Jh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Qh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,td=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ed=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,id=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,nd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,sd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,od=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,ad=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,rd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,ld=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,cd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,hd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,dd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,fd="gl_FragColor = linearToOutputTexel( gl_FragColor );",ud=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,pd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,md=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,gd=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Md=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,xd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,_d=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,yd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,vd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Sd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,wd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ed=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,bd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Td=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ad=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Cd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Rd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Pd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ld=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Id=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Dd=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ud=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,zd=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Nd=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Fd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Bd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Od=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Gd=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Vd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Hd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Wd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Xd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,qd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Yd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,$d=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,jd=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Zd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Kd=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Jd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Qd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,tf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,ef=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,nf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,of=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,af=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,rf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,lf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,cf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,hf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,df=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,ff=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,uf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,pf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,mf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,gf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Mf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,xf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,_f=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,yf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,vf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Sf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,wf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Ef=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,bf=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Tf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Af=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Cf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Rf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Pf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Lf=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,If=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Df=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Uf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,zf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Nf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ff=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Of=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Gf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Hf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Wf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Xf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,qf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Yf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$f=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,jf=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Zf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Kf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tu=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,eu=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,iu=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,nu=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,su=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ou=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,au=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,ru=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lu=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cu=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hu=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,du=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,fu=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,uu=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,pu=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,mu=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Zt={alphahash_fragment:Nh,alphahash_pars_fragment:Fh,alphamap_fragment:Bh,alphamap_pars_fragment:Oh,alphatest_fragment:Gh,alphatest_pars_fragment:kh,aomap_fragment:Vh,aomap_pars_fragment:Hh,batching_pars_vertex:Wh,batching_vertex:Xh,begin_vertex:qh,beginnormal_vertex:Yh,bsdfs:$h,iridescence_fragment:jh,bumpmap_pars_fragment:Zh,clipping_planes_fragment:Kh,clipping_planes_pars_fragment:Jh,clipping_planes_pars_vertex:Qh,clipping_planes_vertex:td,color_fragment:ed,color_pars_fragment:id,color_pars_vertex:nd,color_vertex:sd,common:od,cube_uv_reflection_fragment:ad,defaultnormal_vertex:rd,displacementmap_pars_vertex:ld,displacementmap_vertex:cd,emissivemap_fragment:hd,emissivemap_pars_fragment:dd,colorspace_fragment:fd,colorspace_pars_fragment:ud,envmap_fragment:pd,envmap_common_pars_fragment:md,envmap_pars_fragment:gd,envmap_pars_vertex:Md,envmap_physical_pars_fragment:Rd,envmap_vertex:xd,fog_vertex:_d,fog_pars_vertex:yd,fog_fragment:vd,fog_pars_fragment:Sd,gradientmap_pars_fragment:wd,lightmap_fragment:Ed,lightmap_pars_fragment:bd,lights_lambert_fragment:Td,lights_lambert_pars_fragment:Ad,lights_pars_begin:Cd,lights_toon_fragment:Pd,lights_toon_pars_fragment:Ld,lights_phong_fragment:Id,lights_phong_pars_fragment:Dd,lights_physical_fragment:Ud,lights_physical_pars_fragment:zd,lights_fragment_begin:Nd,lights_fragment_maps:Fd,lights_fragment_end:Bd,logdepthbuf_fragment:Od,logdepthbuf_pars_fragment:Gd,logdepthbuf_pars_vertex:kd,logdepthbuf_vertex:Vd,map_fragment:Hd,map_pars_fragment:Wd,map_particle_fragment:Xd,map_particle_pars_fragment:qd,metalnessmap_fragment:Yd,metalnessmap_pars_fragment:$d,morphcolor_vertex:jd,morphnormal_vertex:Zd,morphtarget_pars_vertex:Kd,morphtarget_vertex:Jd,normal_fragment_begin:Qd,normal_fragment_maps:tf,normal_pars_fragment:ef,normal_pars_vertex:nf,normal_vertex:sf,normalmap_pars_fragment:of,clearcoat_normal_fragment_begin:af,clearcoat_normal_fragment_maps:rf,clearcoat_pars_fragment:lf,iridescence_pars_fragment:cf,opaque_fragment:hf,packing:df,premultiplied_alpha_fragment:ff,project_vertex:uf,dithering_fragment:pf,dithering_pars_fragment:mf,roughnessmap_fragment:gf,roughnessmap_pars_fragment:Mf,shadowmap_pars_fragment:xf,shadowmap_pars_vertex:_f,shadowmap_vertex:yf,shadowmask_pars_fragment:vf,skinbase_vertex:Sf,skinning_pars_vertex:wf,skinning_vertex:Ef,skinnormal_vertex:bf,specularmap_fragment:Tf,specularmap_pars_fragment:Af,tonemapping_fragment:Cf,tonemapping_pars_fragment:Rf,transmission_fragment:Pf,transmission_pars_fragment:Lf,uv_pars_fragment:If,uv_pars_vertex:Df,uv_vertex:Uf,worldpos_vertex:zf,background_vert:Nf,background_frag:Ff,backgroundCube_vert:Bf,backgroundCube_frag:Of,cube_vert:Gf,cube_frag:kf,depth_vert:Vf,depth_frag:Hf,distanceRGBA_vert:Wf,distanceRGBA_frag:Xf,equirect_vert:qf,equirect_frag:Yf,linedashed_vert:$f,linedashed_frag:jf,meshbasic_vert:Zf,meshbasic_frag:Kf,meshlambert_vert:Jf,meshlambert_frag:Qf,meshmatcap_vert:tu,meshmatcap_frag:eu,meshnormal_vert:iu,meshnormal_frag:nu,meshphong_vert:su,meshphong_frag:ou,meshphysical_vert:au,meshphysical_frag:ru,meshtoon_vert:lu,meshtoon_frag:cu,points_vert:hu,points_frag:du,shadow_vert:fu,shadow_frag:uu,sprite_vert:pu,sprite_frag:mu},Dt={common:{diffuse:{value:new te(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qt},normalScale:{value:new Xt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new te(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new te(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0},uvTransform:{value:new Qt}},sprite:{diffuse:{value:new te(16777215)},opacity:{value:1},center:{value:new Xt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}}},ni={basic:{uniforms:Le([Dt.common,Dt.specularmap,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.fog]),vertexShader:Zt.meshbasic_vert,fragmentShader:Zt.meshbasic_frag},lambert:{uniforms:Le([Dt.common,Dt.specularmap,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.fog,Dt.lights,{emissive:{value:new te(0)}}]),vertexShader:Zt.meshlambert_vert,fragmentShader:Zt.meshlambert_frag},phong:{uniforms:Le([Dt.common,Dt.specularmap,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.fog,Dt.lights,{emissive:{value:new te(0)},specular:{value:new te(1118481)},shininess:{value:30}}]),vertexShader:Zt.meshphong_vert,fragmentShader:Zt.meshphong_frag},standard:{uniforms:Le([Dt.common,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.roughnessmap,Dt.metalnessmap,Dt.fog,Dt.lights,{emissive:{value:new te(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag},toon:{uniforms:Le([Dt.common,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.gradientmap,Dt.fog,Dt.lights,{emissive:{value:new te(0)}}]),vertexShader:Zt.meshtoon_vert,fragmentShader:Zt.meshtoon_frag},matcap:{uniforms:Le([Dt.common,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.fog,{matcap:{value:null}}]),vertexShader:Zt.meshmatcap_vert,fragmentShader:Zt.meshmatcap_frag},points:{uniforms:Le([Dt.points,Dt.fog]),vertexShader:Zt.points_vert,fragmentShader:Zt.points_frag},dashed:{uniforms:Le([Dt.common,Dt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Zt.linedashed_vert,fragmentShader:Zt.linedashed_frag},depth:{uniforms:Le([Dt.common,Dt.displacementmap]),vertexShader:Zt.depth_vert,fragmentShader:Zt.depth_frag},normal:{uniforms:Le([Dt.common,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,{opacity:{value:1}}]),vertexShader:Zt.meshnormal_vert,fragmentShader:Zt.meshnormal_frag},sprite:{uniforms:Le([Dt.sprite,Dt.fog]),vertexShader:Zt.sprite_vert,fragmentShader:Zt.sprite_frag},background:{uniforms:{uvTransform:{value:new Qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Zt.background_vert,fragmentShader:Zt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Zt.backgroundCube_vert,fragmentShader:Zt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Zt.cube_vert,fragmentShader:Zt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Zt.equirect_vert,fragmentShader:Zt.equirect_frag},distanceRGBA:{uniforms:Le([Dt.common,Dt.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Zt.distanceRGBA_vert,fragmentShader:Zt.distanceRGBA_frag},shadow:{uniforms:Le([Dt.lights,Dt.fog,{color:{value:new te(0)},opacity:{value:1}}]),vertexShader:Zt.shadow_vert,fragmentShader:Zt.shadow_frag}};ni.physical={uniforms:Le([ni.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qt},clearcoatNormalScale:{value:new Xt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qt},sheen:{value:0},sheenColor:{value:new te(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qt},transmissionSamplerSize:{value:new Xt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qt},attenuationDistance:{value:0},attenuationColor:{value:new te(0)},specularColor:{value:new te(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qt},anisotropyVector:{value:new Xt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qt}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag};const _s={r:0,b:0,g:0};function gu(s,t,e,i,n,o,a){const r=new te(0);let l=o===!0?0:1,c,h,d=null,u=0,f=null;function g(m,p){let A=!1,x=p.isScene===!0?p.background:null;x&&x.isTexture&&(x=(p.backgroundBlurriness>0?e:t).get(x)),x===null?M(r,l):x&&x.isColor&&(M(x,1),A=!0);const b=s.xr.getEnvironmentBlendMode();b==="additive"?i.buffers.color.setClear(0,0,0,1,a):b==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(s.autoClear||A)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),x&&(x.isCubeTexture||x.mapping===ks)?(h===void 0&&(h=new tt(new H(1,1,1),new oi({name:"BackgroundCubeMaterial",uniforms:En(ni.backgroundCube.uniforms),vertexShader:ni.backgroundCube.vertexShader,fragmentShader:ni.backgroundCube.fragmentShader,side:Ne,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(I,T,_){this.matrixWorld.copyPosition(_.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(h)),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,h.material.toneMapped=ne.getTransfer(x.colorSpace)!==le,(d!==x||u!==x.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,d=x,u=x.version,f=s.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new tt(new bi(2,2),new oi({name:"BackgroundMaterial",uniforms:En(ni.background.uniforms),vertexShader:ni.background.vertexShader,fragmentShader:ni.background.fragmentShader,side:Ci,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,c.material.toneMapped=ne.getTransfer(x.colorSpace)!==le,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(d!==x||u!==x.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,d=x,u=x.version,f=s.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function M(m,p){m.getRGB(_s,Bl(s)),i.buffers.color.setClear(_s.r,_s.g,_s.b,p,a)}return{getClearColor:function(){return r},setClearColor:function(m,p=1){r.set(m),l=p,M(r,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,M(r,l)},render:g}}function Mu(s,t,e,i){const n=s.getParameter(s.MAX_VERTEX_ATTRIBS),o=i.isWebGL2?null:t.get("OES_vertex_array_object"),a=i.isWebGL2||o!==null,r={},l=m(null);let c=l,h=!1;function d(C,D,B,O,W){let et=!1;if(a){const nt=M(O,B,D);c!==nt&&(c=nt,f(c.object)),et=p(C,O,B,W),et&&A(C,O,B,W)}else{const nt=D.wireframe===!0;(c.geometry!==O.id||c.program!==B.id||c.wireframe!==nt)&&(c.geometry=O.id,c.program=B.id,c.wireframe=nt,et=!0)}W!==null&&e.update(W,s.ELEMENT_ARRAY_BUFFER),(et||h)&&(h=!1,P(C,D,B,O),W!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(W).buffer))}function u(){return i.isWebGL2?s.createVertexArray():o.createVertexArrayOES()}function f(C){return i.isWebGL2?s.bindVertexArray(C):o.bindVertexArrayOES(C)}function g(C){return i.isWebGL2?s.deleteVertexArray(C):o.deleteVertexArrayOES(C)}function M(C,D,B){const O=B.wireframe===!0;let W=r[C.id];W===void 0&&(W={},r[C.id]=W);let et=W[D.id];et===void 0&&(et={},W[D.id]=et);let nt=et[O];return nt===void 0&&(nt=m(u()),et[O]=nt),nt}function m(C){const D=[],B=[],O=[];for(let W=0;W<n;W++)D[W]=0,B[W]=0,O[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:B,attributeDivisors:O,object:C,attributes:{},index:null}}function p(C,D,B,O){const W=c.attributes,et=D.attributes;let nt=0;const rt=B.getAttributes();for(const mt in rt)if(rt[mt].location>=0){const ot=W[mt];let gt=et[mt];if(gt===void 0&&(mt==="instanceMatrix"&&C.instanceMatrix&&(gt=C.instanceMatrix),mt==="instanceColor"&&C.instanceColor&&(gt=C.instanceColor)),ot===void 0||ot.attribute!==gt||gt&&ot.data!==gt.data)return!0;nt++}return c.attributesNum!==nt||c.index!==O}function A(C,D,B,O){const W={},et=D.attributes;let nt=0;const rt=B.getAttributes();for(const mt in rt)if(rt[mt].location>=0){let ot=et[mt];ot===void 0&&(mt==="instanceMatrix"&&C.instanceMatrix&&(ot=C.instanceMatrix),mt==="instanceColor"&&C.instanceColor&&(ot=C.instanceColor));const gt={};gt.attribute=ot,ot&&ot.data&&(gt.data=ot.data),W[mt]=gt,nt++}c.attributes=W,c.attributesNum=nt,c.index=O}function x(){const C=c.newAttributes;for(let D=0,B=C.length;D<B;D++)C[D]=0}function b(C){I(C,0)}function I(C,D){const B=c.newAttributes,O=c.enabledAttributes,W=c.attributeDivisors;B[C]=1,O[C]===0&&(s.enableVertexAttribArray(C),O[C]=1),W[C]!==D&&((i.isWebGL2?s:t.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](C,D),W[C]=D)}function T(){const C=c.newAttributes,D=c.enabledAttributes;for(let B=0,O=D.length;B<O;B++)D[B]!==C[B]&&(s.disableVertexAttribArray(B),D[B]=0)}function _(C,D,B,O,W,et,nt){nt===!0?s.vertexAttribIPointer(C,D,B,W,et):s.vertexAttribPointer(C,D,B,O,W,et)}function P(C,D,B,O){if(i.isWebGL2===!1&&(C.isInstancedMesh||O.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;x();const W=O.attributes,et=B.getAttributes(),nt=D.defaultAttributeValues;for(const rt in et){const mt=et[rt];if(mt.location>=0){let J=W[rt];if(J===void 0&&(rt==="instanceMatrix"&&C.instanceMatrix&&(J=C.instanceMatrix),rt==="instanceColor"&&C.instanceColor&&(J=C.instanceColor)),J!==void 0){const ot=J.normalized,gt=J.itemSize,Q=e.get(J);if(Q===void 0)continue;const at=Q.buffer,ct=Q.type,wt=Q.bytesPerElement,vt=i.isWebGL2===!0&&(ct===s.INT||ct===s.UNSIGNED_INT||J.gpuType===_l);if(J.isInterleavedBufferAttribute){const Rt=J.data,V=Rt.stride,_t=J.offset;if(Rt.isInstancedInterleavedBuffer){for(let ft=0;ft<mt.locationSize;ft++)I(mt.location+ft,Rt.meshPerAttribute);C.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=Rt.meshPerAttribute*Rt.count)}else for(let ft=0;ft<mt.locationSize;ft++)b(mt.location+ft);s.bindBuffer(s.ARRAY_BUFFER,at);for(let ft=0;ft<mt.locationSize;ft++)_(mt.location+ft,gt/mt.locationSize,ct,ot,V*wt,(_t+gt/mt.locationSize*ft)*wt,vt)}else{if(J.isInstancedBufferAttribute){for(let Rt=0;Rt<mt.locationSize;Rt++)I(mt.location+Rt,J.meshPerAttribute);C.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let Rt=0;Rt<mt.locationSize;Rt++)b(mt.location+Rt);s.bindBuffer(s.ARRAY_BUFFER,at);for(let Rt=0;Rt<mt.locationSize;Rt++)_(mt.location+Rt,gt/mt.locationSize,ct,ot,gt*wt,gt/mt.locationSize*Rt*wt,vt)}}else if(nt!==void 0){const ot=nt[rt];if(ot!==void 0)switch(ot.length){case 2:s.vertexAttrib2fv(mt.location,ot);break;case 3:s.vertexAttrib3fv(mt.location,ot);break;case 4:s.vertexAttrib4fv(mt.location,ot);break;default:s.vertexAttrib1fv(mt.location,ot)}}}}T()}function v(){z();for(const C in r){const D=r[C];for(const B in D){const O=D[B];for(const W in O)g(O[W].object),delete O[W];delete D[B]}delete r[C]}}function E(C){if(r[C.id]===void 0)return;const D=r[C.id];for(const B in D){const O=D[B];for(const W in O)g(O[W].object),delete O[W];delete D[B]}delete r[C.id]}function L(C){for(const D in r){const B=r[D];if(B[C.id]===void 0)continue;const O=B[C.id];for(const W in O)g(O[W].object),delete O[W];delete B[C.id]}}function z(){Z(),h=!0,c!==l&&(c=l,f(c.object))}function Z(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:z,resetDefaultState:Z,dispose:v,releaseStatesOfGeometry:E,releaseStatesOfProgram:L,initAttributes:x,enableAttribute:b,disableUnusedAttributes:T}}function xu(s,t,e,i){const n=i.isWebGL2;let o;function a(h){o=h}function r(h,d){s.drawArrays(o,h,d),e.update(d,o,1)}function l(h,d,u){if(u===0)return;let f,g;if(n)f=s,g="drawArraysInstanced";else if(f=t.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[g](o,h,d,u),e.update(d,o,u)}function c(h,d,u){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<u;g++)this.render(h[g],d[g]);else{f.multiDrawArraysWEBGL(o,h,0,d,0,u);let g=0;for(let M=0;M<u;M++)g+=d[M];e.update(g,o,1)}}this.setMode=a,this.render=r,this.renderInstances=l,this.renderMultiDraw=c}function _u(s,t,e){let i;function n(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const _=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(_.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(_){if(_==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";_="mediump"}return _==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&s.constructor.name==="WebGL2RenderingContext";let r=e.precision!==void 0?e.precision:"highp";const l=o(r);l!==r&&(console.warn("THREE.WebGLRenderer:",r,"not supported, using",l,"instead."),r=l);const c=a||t.has("WEBGL_draw_buffers"),h=e.logarithmicDepthBuffer===!0,d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),u=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),M=s.getParameter(s.MAX_VERTEX_ATTRIBS),m=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),p=s.getParameter(s.MAX_VARYING_VECTORS),A=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),x=u>0,b=a||t.has("OES_texture_float"),I=x&&b,T=a?s.getParameter(s.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:n,getMaxPrecision:o,precision:r,logarithmicDepthBuffer:h,maxTextures:d,maxVertexTextures:u,maxTextureSize:f,maxCubemapSize:g,maxAttributes:M,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:A,vertexTextures:x,floatFragmentTextures:b,floatVertexTextures:I,maxSamples:T}}function yu(s){const t=this;let e=null,i=0,n=!1,o=!1;const a=new Fi,r=new Qt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||i!==0||n;return n=u,i=d.length,f},this.beginShadows=function(){o=!0,h(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){const g=d.clippingPlanes,M=d.clipIntersection,m=d.clipShadows,p=s.get(d);if(!n||g===null||g.length===0||o&&!m)o?h(null):c();else{const A=o?0:i,x=A*4;let b=p.clippingState||null;l.value=b,b=h(g,u,x,f);for(let I=0;I!==x;++I)b[I]=e[I];p.clippingState=b,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=A}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(d,u,f,g){const M=d!==null?d.length:0;let m=null;if(M!==0){if(m=l.value,g!==!0||m===null){const p=f+M*4,A=u.matrixWorldInverse;r.getNormalMatrix(A),(m===null||m.length<p)&&(m=new Float32Array(p));for(let x=0,b=f;x!==M;++x,b+=4)a.copy(d[x]).applyMatrix4(A,r),a.normal.toArray(m,b),m[b+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=M,t.numIntersection=0,m}}function vu(s){let t=new WeakMap;function e(a,r){return r===Is?a.mapping=xn:r===qo&&(a.mapping=_n),a}function i(a){if(a&&a.isTexture){const r=a.mapping;if(r===Is||r===qo)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Ih(l.height/2);return c.fromEquirectangularTexture(s,a),t.set(a,c),a.addEventListener("dispose",n),e(c.texture,a.mapping)}else return null}}return a}function n(a){const r=a.target;r.removeEventListener("dispose",n);const l=t.get(r);l!==void 0&&(t.delete(r),l.dispose())}function o(){t=new WeakMap}return{get:i,dispose:o}}class oa extends Ol{constructor(t=-1,e=1,i=1,n=-1,o=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=n,this.near=o,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,n,o,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=o,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2;let o=i-t,a=i+t,r=n+e,l=n-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=c*this.view.offsetX,a=o+c*this.view.width,r-=h*this.view.offsetY,l=r-h*this.view.height}this.projectionMatrix.makeOrthographic(o,a,r,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const pn=4,dr=[.125,.215,.35,.446,.526,.582],Gi=20,xo=new oa,fr=new te;let _o=null,yo=0,vo=0;const Bi=(1+Math.sqrt(5))/2,ln=1/Bi,ur=[new R(1,1,1),new R(-1,1,1),new R(1,1,-1),new R(-1,1,-1),new R(0,Bi,ln),new R(0,Bi,-ln),new R(ln,0,Bi),new R(-ln,0,Bi),new R(Bi,ln,0),new R(-Bi,ln,0)];class pr{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,n=100){_o=this._renderer.getRenderTarget(),yo=this._renderer.getActiveCubeFace(),vo=this._renderer.getActiveMipmapLevel(),this._setSize(256);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(t,i,n,o),e>0&&this._blur(o,0,0,e),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Mr(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=gr(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(_o,yo,vo),t.scissorTest=!1,ys(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===xn||t.mapping===_n?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),_o=this._renderer.getRenderTarget(),yo=this._renderer.getActiveCubeFace(),vo=this._renderer.getActiveMipmapLevel();const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:De,minFilter:De,generateMipmaps:!1,type:vn,format:ii,colorSpace:Mi,depthBuffer:!1},n=mr(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=mr(t,e,i);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Su(o)),this._blurMaterial=wu(o,t,e)}return n}_compileMaterial(t){const e=new tt(this._lodPlanes[0],t);this._renderer.compile(e,xo)}_sceneToCubeUV(t,e,i,n){const r=new Ue(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(fr),h.toneMapping=Ti,h.autoClear=!1;const f=new fe({name:"PMREM.Background",side:Ne,depthWrite:!1,depthTest:!1}),g=new tt(new H,f);let M=!1;const m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,M=!0):(f.color.copy(fr),M=!0);for(let p=0;p<6;p++){const A=p%3;A===0?(r.up.set(0,l[p],0),r.lookAt(c[p],0,0)):A===1?(r.up.set(0,0,l[p]),r.lookAt(0,c[p],0)):(r.up.set(0,l[p],0),r.lookAt(0,0,c[p]));const x=this._cubeSize;ys(n,A*x,p>2?x:0,x,x),h.setRenderTarget(n),M&&h.render(g,r),h.render(t,r)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=u,h.autoClear=d,t.background=m}_textureToCubeUV(t,e){const i=this._renderer,n=t.mapping===xn||t.mapping===_n;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=Mr()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=gr());const o=n?this._cubemapMaterial:this._equirectMaterial,a=new tt(this._lodPlanes[0],o),r=o.uniforms;r.envMap.value=t;const l=this._cubeSize;ys(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(a,xo)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;for(let n=1;n<this._lodPlanes.length;n++){const o=Math.sqrt(this._sigmas[n]*this._sigmas[n]-this._sigmas[n-1]*this._sigmas[n-1]),a=ur[(n-1)%ur.length];this._blur(t,n-1,n,o,a)}e.autoClear=i}_blur(t,e,i,n,o){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,i,n,"latitudinal",o),this._halfBlur(a,t,i,i,n,"longitudinal",o)}_halfBlur(t,e,i,n,o,a,r){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new tt(this._lodPlanes[n],c),u=c.uniforms,f=this._sizeLods[i]-1,g=isFinite(o)?Math.PI/(2*f):2*Math.PI/(2*Gi-1),M=o/g,m=isFinite(o)?1+Math.floor(h*M):Gi;m>Gi&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Gi}`);const p=[];let A=0;for(let _=0;_<Gi;++_){const P=_/M,v=Math.exp(-P*P/2);p.push(v),_===0?A+=v:_<m&&(A+=2*v)}for(let _=0;_<p.length;_++)p[_]=p[_]/A;u.envMap.value=t.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=a==="latitudinal",r&&(u.poleAxis.value=r);const{_lodMax:x}=this;u.dTheta.value=g,u.mipInt.value=x-i;const b=this._sizeLods[n],I=3*b*(n>x-pn?n-x+pn:0),T=4*(this._cubeSize-b);ys(e,I,T,3*b,2*b),l.setRenderTarget(e),l.render(d,xo)}}function Su(s){const t=[],e=[],i=[];let n=s;const o=s-pn+1+dr.length;for(let a=0;a<o;a++){const r=Math.pow(2,n);e.push(r);let l=1/r;a>s-pn?l=dr[a-s+pn-1]:a===0&&(l=0),i.push(l);const c=1/(r-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,M=3,m=2,p=1,A=new Float32Array(M*g*f),x=new Float32Array(m*g*f),b=new Float32Array(p*g*f);for(let T=0;T<f;T++){const _=T%3*2/3-1,P=T>2?0:-1,v=[_,P,0,_+2/3,P,0,_+2/3,P+1,0,_,P,0,_+2/3,P+1,0,_,P+1,0];A.set(v,M*g*T),x.set(u,m*g*T);const E=[T,T,T,T,T,T];b.set(E,p*g*T)}const I=new We;I.setAttribute("position",new Ke(A,M)),I.setAttribute("uv",new Ke(x,m)),I.setAttribute("faceIndex",new Ke(b,p)),t.push(I),n>pn&&n--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function mr(s,t,e){const i=new Ri(s,t,e);return i.texture.mapping=ks,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ys(s,t,e,i,n){s.viewport.set(t,e,i,n),s.scissor.set(t,e,i,n)}function wu(s,t,e){const i=new Float32Array(Gi),n=new R(0,1,0);return new oi({name:"SphericalGaussianBlur",defines:{n:Gi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:n}},vertexShader:aa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:mi,depthTest:!1,depthWrite:!1})}function gr(){return new oi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:aa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:mi,depthTest:!1,depthWrite:!1})}function Mr(){return new oi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:aa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:mi,depthTest:!1,depthWrite:!1})}function aa(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Eu(s){let t=new WeakMap,e=null;function i(r){if(r&&r.isTexture){const l=r.mapping,c=l===Is||l===qo,h=l===xn||l===_n;if(c||h)if(r.isRenderTargetTexture&&r.needsPMREMUpdate===!0){r.needsPMREMUpdate=!1;let d=t.get(r);return e===null&&(e=new pr(s)),d=c?e.fromEquirectangular(r,d):e.fromCubemap(r,d),t.set(r,d),d.texture}else{if(t.has(r))return t.get(r).texture;{const d=r.image;if(c&&d&&d.height>0||h&&d&&n(d)){e===null&&(e=new pr(s));const u=c?e.fromEquirectangular(r):e.fromCubemap(r);return t.set(r,u),r.addEventListener("dispose",o),u.texture}else return null}}}return r}function n(r){let l=0;const c=6;for(let h=0;h<c;h++)r[h]!==void 0&&l++;return l===c}function o(r){const l=r.target;l.removeEventListener("dispose",o);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:a}}function bu(s){const t={};function e(i){if(t[i]!==void 0)return t[i];let n;switch(i){case"WEBGL_depth_texture":n=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":n=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":n=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":n=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:n=s.getExtension(i)}return t[i]=n,n}return{has:function(i){return e(i)!==null},init:function(i){i.isWebGL2?(e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance")):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(i){const n=e(i);return n===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),n}}}function Tu(s,t,e,i){const n={},o=new WeakMap;function a(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const g in u.attributes)t.remove(u.attributes[g]);for(const g in u.morphAttributes){const M=u.morphAttributes[g];for(let m=0,p=M.length;m<p;m++)t.remove(M[m])}u.removeEventListener("dispose",a),delete n[u.id];const f=o.get(u);f&&(t.remove(f),o.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function r(d,u){return n[u.id]===!0||(u.addEventListener("dispose",a),n[u.id]=!0,e.memory.geometries++),u}function l(d){const u=d.attributes;for(const g in u)t.update(u[g],s.ARRAY_BUFFER);const f=d.morphAttributes;for(const g in f){const M=f[g];for(let m=0,p=M.length;m<p;m++)t.update(M[m],s.ARRAY_BUFFER)}}function c(d){const u=[],f=d.index,g=d.attributes.position;let M=0;if(f!==null){const A=f.array;M=f.version;for(let x=0,b=A.length;x<b;x+=3){const I=A[x+0],T=A[x+1],_=A[x+2];u.push(I,T,T,_,_,I)}}else if(g!==void 0){const A=g.array;M=g.version;for(let x=0,b=A.length/3-1;x<b;x+=3){const I=x+0,T=x+1,_=x+2;u.push(I,T,T,_,_,I)}}else return;const m=new(Rl(u)?Fl:Nl)(u,1);m.version=M;const p=o.get(d);p&&t.remove(p),o.set(d,m)}function h(d){const u=o.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return o.get(d)}return{get:r,update:l,getWireframeAttribute:h}}function Au(s,t,e,i){const n=i.isWebGL2;let o;function a(f){o=f}let r,l;function c(f){r=f.type,l=f.bytesPerElement}function h(f,g){s.drawElements(o,g,r,f*l),e.update(g,o,1)}function d(f,g,M){if(M===0)return;let m,p;if(n)m=s,p="drawElementsInstanced";else if(m=t.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](o,g,r,f*l,M),e.update(g,o,M)}function u(f,g,M){if(M===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<M;p++)this.render(f[p]/l,g[p]);else{m.multiDrawElementsWEBGL(o,g,0,r,f,0,M);let p=0;for(let A=0;A<M;A++)p+=g[A];e.update(p,o,1)}}this.setMode=a,this.setIndex=c,this.render=h,this.renderInstances=d,this.renderMultiDraw=u}function Cu(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(o,a,r){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=r*(o/3);break;case s.LINES:e.lines+=r*(o/2);break;case s.LINE_STRIP:e.lines+=r*(o-1);break;case s.LINE_LOOP:e.lines+=r*o;break;case s.POINTS:e.points+=r*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function n(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:n,update:i}}function Ru(s,t){return s[0]-t[0]}function Pu(s,t){return Math.abs(t[1])-Math.abs(s[1])}function Lu(s,t,e){const i={},n=new Float32Array(8),o=new WeakMap,a=new he,r=[];for(let c=0;c<8;c++)r[c]=[c,0];function l(c,h,d){const u=c.morphTargetInfluences;if(t.isWebGL2===!0){const g=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,M=g!==void 0?g.length:0;let m=o.get(h);if(m===void 0||m.count!==M){let D=function(){Z.dispose(),o.delete(h),h.removeEventListener("dispose",D)};var f=D;m!==void 0&&m.texture.dispose();const x=h.morphAttributes.position!==void 0,b=h.morphAttributes.normal!==void 0,I=h.morphAttributes.color!==void 0,T=h.morphAttributes.position||[],_=h.morphAttributes.normal||[],P=h.morphAttributes.color||[];let v=0;x===!0&&(v=1),b===!0&&(v=2),I===!0&&(v=3);let E=h.attributes.position.count*v,L=1;E>t.maxTextureSize&&(L=Math.ceil(E/t.maxTextureSize),E=t.maxTextureSize);const z=new Float32Array(E*L*4*M),Z=new Il(z,E,L,M);Z.type=Ei,Z.needsUpdate=!0;const C=v*4;for(let B=0;B<M;B++){const O=T[B],W=_[B],et=P[B],nt=E*L*4*B;for(let rt=0;rt<O.count;rt++){const mt=rt*C;x===!0&&(a.fromBufferAttribute(O,rt),z[nt+mt+0]=a.x,z[nt+mt+1]=a.y,z[nt+mt+2]=a.z,z[nt+mt+3]=0),b===!0&&(a.fromBufferAttribute(W,rt),z[nt+mt+4]=a.x,z[nt+mt+5]=a.y,z[nt+mt+6]=a.z,z[nt+mt+7]=0),I===!0&&(a.fromBufferAttribute(et,rt),z[nt+mt+8]=a.x,z[nt+mt+9]=a.y,z[nt+mt+10]=a.z,z[nt+mt+11]=et.itemSize===4?a.w:1)}}m={count:M,texture:Z,size:new Xt(E,L)},o.set(h,m),h.addEventListener("dispose",D)}let p=0;for(let x=0;x<u.length;x++)p+=u[x];const A=h.morphTargetsRelative?1:1-p;d.getUniforms().setValue(s,"morphTargetBaseInfluence",A),d.getUniforms().setValue(s,"morphTargetInfluences",u),d.getUniforms().setValue(s,"morphTargetsTexture",m.texture,e),d.getUniforms().setValue(s,"morphTargetsTextureSize",m.size)}else{const g=u===void 0?0:u.length;let M=i[h.id];if(M===void 0||M.length!==g){M=[];for(let b=0;b<g;b++)M[b]=[b,0];i[h.id]=M}for(let b=0;b<g;b++){const I=M[b];I[0]=b,I[1]=u[b]}M.sort(Pu);for(let b=0;b<8;b++)b<g&&M[b][1]?(r[b][0]=M[b][0],r[b][1]=M[b][1]):(r[b][0]=Number.MAX_SAFE_INTEGER,r[b][1]=0);r.sort(Ru);const m=h.morphAttributes.position,p=h.morphAttributes.normal;let A=0;for(let b=0;b<8;b++){const I=r[b],T=I[0],_=I[1];T!==Number.MAX_SAFE_INTEGER&&_?(m&&h.getAttribute("morphTarget"+b)!==m[T]&&h.setAttribute("morphTarget"+b,m[T]),p&&h.getAttribute("morphNormal"+b)!==p[T]&&h.setAttribute("morphNormal"+b,p[T]),n[b]=_,A+=_):(m&&h.hasAttribute("morphTarget"+b)===!0&&h.deleteAttribute("morphTarget"+b),p&&h.hasAttribute("morphNormal"+b)===!0&&h.deleteAttribute("morphNormal"+b),n[b]=0)}const x=h.morphTargetsRelative?1:1-A;d.getUniforms().setValue(s,"morphTargetBaseInfluence",x),d.getUniforms().setValue(s,"morphTargetInfluences",n)}}return{update:l}}function Iu(s,t,e,i){let n=new WeakMap;function o(l){const c=i.render.frame,h=l.geometry,d=t.get(l,h);if(n.get(d)!==c&&(t.update(d),n.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",r)===!1&&l.addEventListener("dispose",r),n.get(l)!==c&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),n.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;n.get(u)!==c&&(u.update(),n.set(u,c))}return d}function a(){n=new WeakMap}function r(l){const c=l.target;c.removeEventListener("dispose",r),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:o,dispose:a}}class Vl extends Fe{constructor(t,e,i,n,o,a,r,l,c,h){if(h=h!==void 0?h:Vi,h!==Vi&&h!==Sn)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===Vi&&(i=wi),i===void 0&&h===Sn&&(i=ki),super(null,n,o,a,r,l,h,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=r!==void 0?r:ge,this.minFilter=l!==void 0?l:ge,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Hl=new Fe,Wl=new Vl(1,1);Wl.compareFunction=Cl;const Xl=new Il,ql=new gh,Yl=new Gl,xr=[],_r=[],yr=new Float32Array(16),vr=new Float32Array(9),Sr=new Float32Array(4);function An(s,t,e){const i=s[0];if(i<=0||i>0)return s;const n=t*e;let o=xr[n];if(o===void 0&&(o=new Float32Array(n),xr[n]=o),t!==0){i.toArray(o,0);for(let a=1,r=0;a!==t;++a)r+=e,s[a].toArray(o,r)}return o}function _e(s,t){if(s.length!==t.length)return!1;for(let e=0,i=s.length;e<i;e++)if(s[e]!==t[e])return!1;return!0}function ye(s,t){for(let e=0,i=t.length;e<i;e++)s[e]=t[e]}function Hs(s,t){let e=_r[t];e===void 0&&(e=new Int32Array(t),_r[t]=e);for(let i=0;i!==t;++i)e[i]=s.allocateTextureUnit();return e}function Du(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function Uu(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(_e(e,t))return;s.uniform2fv(this.addr,t),ye(e,t)}}function zu(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(_e(e,t))return;s.uniform3fv(this.addr,t),ye(e,t)}}function Nu(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(_e(e,t))return;s.uniform4fv(this.addr,t),ye(e,t)}}function Fu(s,t){const e=this.cache,i=t.elements;if(i===void 0){if(_e(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),ye(e,t)}else{if(_e(e,i))return;Sr.set(i),s.uniformMatrix2fv(this.addr,!1,Sr),ye(e,i)}}function Bu(s,t){const e=this.cache,i=t.elements;if(i===void 0){if(_e(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),ye(e,t)}else{if(_e(e,i))return;vr.set(i),s.uniformMatrix3fv(this.addr,!1,vr),ye(e,i)}}function Ou(s,t){const e=this.cache,i=t.elements;if(i===void 0){if(_e(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),ye(e,t)}else{if(_e(e,i))return;yr.set(i),s.uniformMatrix4fv(this.addr,!1,yr),ye(e,i)}}function Gu(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function ku(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(_e(e,t))return;s.uniform2iv(this.addr,t),ye(e,t)}}function Vu(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(_e(e,t))return;s.uniform3iv(this.addr,t),ye(e,t)}}function Hu(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(_e(e,t))return;s.uniform4iv(this.addr,t),ye(e,t)}}function Wu(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function Xu(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(_e(e,t))return;s.uniform2uiv(this.addr,t),ye(e,t)}}function qu(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(_e(e,t))return;s.uniform3uiv(this.addr,t),ye(e,t)}}function Yu(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(_e(e,t))return;s.uniform4uiv(this.addr,t),ye(e,t)}}function $u(s,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n);const o=this.type===s.SAMPLER_2D_SHADOW?Wl:Hl;e.setTexture2D(t||o,n)}function ju(s,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTexture3D(t||ql,n)}function Zu(s,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTextureCube(t||Yl,n)}function Ku(s,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTexture2DArray(t||Xl,n)}function Ju(s){switch(s){case 5126:return Du;case 35664:return Uu;case 35665:return zu;case 35666:return Nu;case 35674:return Fu;case 35675:return Bu;case 35676:return Ou;case 5124:case 35670:return Gu;case 35667:case 35671:return ku;case 35668:case 35672:return Vu;case 35669:case 35673:return Hu;case 5125:return Wu;case 36294:return Xu;case 36295:return qu;case 36296:return Yu;case 35678:case 36198:case 36298:case 36306:case 35682:return $u;case 35679:case 36299:case 36307:return ju;case 35680:case 36300:case 36308:case 36293:return Zu;case 36289:case 36303:case 36311:case 36292:return Ku}}function Qu(s,t){s.uniform1fv(this.addr,t)}function tp(s,t){const e=An(t,this.size,2);s.uniform2fv(this.addr,e)}function ep(s,t){const e=An(t,this.size,3);s.uniform3fv(this.addr,e)}function ip(s,t){const e=An(t,this.size,4);s.uniform4fv(this.addr,e)}function np(s,t){const e=An(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function sp(s,t){const e=An(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function op(s,t){const e=An(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function ap(s,t){s.uniform1iv(this.addr,t)}function rp(s,t){s.uniform2iv(this.addr,t)}function lp(s,t){s.uniform3iv(this.addr,t)}function cp(s,t){s.uniform4iv(this.addr,t)}function hp(s,t){s.uniform1uiv(this.addr,t)}function dp(s,t){s.uniform2uiv(this.addr,t)}function fp(s,t){s.uniform3uiv(this.addr,t)}function up(s,t){s.uniform4uiv(this.addr,t)}function pp(s,t,e){const i=this.cache,n=t.length,o=Hs(e,n);_e(i,o)||(s.uniform1iv(this.addr,o),ye(i,o));for(let a=0;a!==n;++a)e.setTexture2D(t[a]||Hl,o[a])}function mp(s,t,e){const i=this.cache,n=t.length,o=Hs(e,n);_e(i,o)||(s.uniform1iv(this.addr,o),ye(i,o));for(let a=0;a!==n;++a)e.setTexture3D(t[a]||ql,o[a])}function gp(s,t,e){const i=this.cache,n=t.length,o=Hs(e,n);_e(i,o)||(s.uniform1iv(this.addr,o),ye(i,o));for(let a=0;a!==n;++a)e.setTextureCube(t[a]||Yl,o[a])}function Mp(s,t,e){const i=this.cache,n=t.length,o=Hs(e,n);_e(i,o)||(s.uniform1iv(this.addr,o),ye(i,o));for(let a=0;a!==n;++a)e.setTexture2DArray(t[a]||Xl,o[a])}function xp(s){switch(s){case 5126:return Qu;case 35664:return tp;case 35665:return ep;case 35666:return ip;case 35674:return np;case 35675:return sp;case 35676:return op;case 5124:case 35670:return ap;case 35667:case 35671:return rp;case 35668:case 35672:return lp;case 35669:case 35673:return cp;case 5125:return hp;case 36294:return dp;case 36295:return fp;case 36296:return up;case 35678:case 36198:case 36298:case 36306:case 35682:return pp;case 35679:case 36299:case 36307:return mp;case 35680:case 36300:case 36308:case 36293:return gp;case 36289:case 36303:case 36311:case 36292:return Mp}}class _p{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=Ju(e.type)}}class yp{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=xp(e.type)}}class vp{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const n=this.seq;for(let o=0,a=n.length;o!==a;++o){const r=n[o];r.setValue(t,e[r.id],i)}}}const So=/(\w+)(\])?(\[|\.)?/g;function wr(s,t){s.seq.push(t),s.map[t.id]=t}function Sp(s,t,e){const i=s.name,n=i.length;for(So.lastIndex=0;;){const o=So.exec(i),a=So.lastIndex;let r=o[1];const l=o[2]==="]",c=o[3];if(l&&(r=r|0),c===void 0||c==="["&&a+2===n){wr(e,c===void 0?new _p(r,s,t):new yp(r,s,t));break}else{let d=e.map[r];d===void 0&&(d=new vp(r),wr(e,d)),e=d}}}class Rs{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let n=0;n<i;++n){const o=t.getActiveUniform(e,n),a=t.getUniformLocation(e,o.name);Sp(o,a,this)}}setValue(t,e,i,n){const o=this.map[e];o!==void 0&&o.setValue(t,i,n)}setOptional(t,e,i){const n=e[i];n!==void 0&&this.setValue(t,i,n)}static upload(t,e,i,n){for(let o=0,a=e.length;o!==a;++o){const r=e[o],l=i[r.id];l.needsUpdate!==!1&&r.setValue(t,l.value,n)}}static seqWithValue(t,e){const i=[];for(let n=0,o=t.length;n!==o;++n){const a=t[n];a.id in e&&i.push(a)}return i}}function Er(s,t,e){const i=s.createShader(t);return s.shaderSource(i,e),s.compileShader(i),i}const wp=37297;let Ep=0;function bp(s,t){const e=s.split(`
`),i=[],n=Math.max(t-6,0),o=Math.min(t+6,e.length);for(let a=n;a<o;a++){const r=a+1;i.push(`${r===t?">":" "} ${r}: ${e[a]}`)}return i.join(`
`)}function Tp(s){const t=ne.getPrimaries(ne.workingColorSpace),e=ne.getPrimaries(s);let i;switch(t===e?i="":t===zs&&e===Us?i="LinearDisplayP3ToLinearSRGB":t===Us&&e===zs&&(i="LinearSRGBToLinearDisplayP3"),s){case Mi:case Vs:return[i,"LinearTransferOETF"];case we:case ia:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[i,"LinearTransferOETF"]}}function br(s,t,e){const i=s.getShaderParameter(t,s.COMPILE_STATUS),n=s.getShaderInfoLog(t).trim();if(i&&n==="")return"";const o=/ERROR: 0:(\d+)/.exec(n);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+n+`

`+bp(s.getShaderSource(t),a)}else return n}function Ap(s,t){const e=Tp(t);return`vec4 ${s}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Cp(s,t){let e;switch(t){case pl:e="Linear";break;case ml:e="Reinhard";break;case gl:e="OptimizedCineon";break;case ta:e="ACESFilmic";break;case Ml:e="AgX";break;case Lc:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function Rp(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(mn).join(`
`)}function Pp(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(mn).join(`
`)}function Lp(s){const t=[];for(const e in s){const i=s[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Ip(s,t){const e={},i=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){const o=s.getActiveAttrib(t,n),a=o.name;let r=1;o.type===s.FLOAT_MAT2&&(r=2),o.type===s.FLOAT_MAT3&&(r=3),o.type===s.FLOAT_MAT4&&(r=4),e[a]={type:o.type,location:s.getAttribLocation(t,a),locationSize:r}}return e}function mn(s){return s!==""}function Tr(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ar(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Dp=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ko(s){return s.replace(Dp,zp)}const Up=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function zp(s,t){let e=Zt[t];if(e===void 0){const i=Up.get(t);if(i!==void 0)e=Zt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Ko(e)}const Np=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Cr(s){return s.replace(Np,Fp)}function Fp(s,t,e,i){let n="";for(let o=parseInt(t);o<parseInt(e);o++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return n}function Rr(s){let t="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Bp(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===dl?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===fl?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===fi&&(t="SHADOWMAP_TYPE_VSM"),t}function Op(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case xn:case _n:t="ENVMAP_TYPE_CUBE";break;case ks:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Gp(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case _n:t="ENVMAP_MODE_REFRACTION";break}return t}function kp(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case ul:t="ENVMAP_BLENDING_MULTIPLY";break;case Rc:t="ENVMAP_BLENDING_MIX";break;case Pc:t="ENVMAP_BLENDING_ADD";break}return t}function Vp(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function Hp(s,t,e,i){const n=s.getContext(),o=e.defines;let a=e.vertexShader,r=e.fragmentShader;const l=Bp(e),c=Op(e),h=Gp(e),d=kp(e),u=Vp(e),f=e.isWebGL2?"":Rp(e),g=Pp(e),M=Lp(o),m=n.createProgram();let p,A,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,M].filter(mn).join(`
`),p.length>0&&(p+=`
`),A=[f,"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,M].filter(mn).join(`
`),A.length>0&&(A+=`
`)):(p=[Rr(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,M,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(mn).join(`
`),A=[f,Rr(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,M,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ti?"#define TONE_MAPPING":"",e.toneMapping!==Ti?Zt.tonemapping_pars_fragment:"",e.toneMapping!==Ti?Cp("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Zt.colorspace_pars_fragment,Ap("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(mn).join(`
`)),a=Ko(a),a=Tr(a,e),a=Ar(a,e),r=Ko(r),r=Tr(r,e),r=Ar(r,e),a=Cr(a),r=Cr(r),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,A=["precision mediump sampler2DArray;","#define varying in",e.glslVersion===Ya?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ya?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+A);const b=x+p+a,I=x+A+r,T=Er(n,n.VERTEX_SHADER,b),_=Er(n,n.FRAGMENT_SHADER,I);n.attachShader(m,T),n.attachShader(m,_),e.index0AttributeName!==void 0?n.bindAttribLocation(m,0,e.index0AttributeName):e.morphTargets===!0&&n.bindAttribLocation(m,0,"position"),n.linkProgram(m);function P(z){if(s.debug.checkShaderErrors){const Z=n.getProgramInfoLog(m).trim(),C=n.getShaderInfoLog(T).trim(),D=n.getShaderInfoLog(_).trim();let B=!0,O=!0;if(n.getProgramParameter(m,n.LINK_STATUS)===!1)if(B=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(n,m,T,_);else{const W=br(n,T,"vertex"),et=br(n,_,"fragment");console.error("THREE.WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(m,n.VALIDATE_STATUS)+`

Program Info Log: `+Z+`
`+W+`
`+et)}else Z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Z):(C===""||D==="")&&(O=!1);O&&(z.diagnostics={runnable:B,programLog:Z,vertexShader:{log:C,prefix:p},fragmentShader:{log:D,prefix:A}})}n.deleteShader(T),n.deleteShader(_),v=new Rs(n,m),E=Ip(n,m)}let v;this.getUniforms=function(){return v===void 0&&P(this),v};let E;this.getAttributes=function(){return E===void 0&&P(this),E};let L=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=n.getProgramParameter(m,wp)),L},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(m),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Ep++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=T,this.fragmentShader=_,this}let Wp=0;class Xp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,n=this._getShaderStage(e),o=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(n)===!1&&(a.add(n),n.usedTimes++),a.has(o)===!1&&(a.add(o),o.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new qp(t),e.set(t,i)),i}}class qp{constructor(t){this.id=Wp++,this.code=t,this.usedTimes=0}}function Yp(s,t,e,i,n,o,a){const r=new Ul,l=new Xp,c=[],h=n.isWebGL2,d=n.logarithmicDepthBuffer,u=n.vertexTextures;let f=n.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function M(v){return v===0?"uv":`uv${v}`}function m(v,E,L,z,Z){const C=z.fog,D=Z.geometry,B=v.isMeshStandardMaterial?z.environment:null,O=(v.isMeshStandardMaterial?e:t).get(v.envMap||B),W=O&&O.mapping===ks?O.image.height:null,et=g[v.type];v.precision!==null&&(f=n.getMaxPrecision(v.precision),f!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",f,"instead."));const nt=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,rt=nt!==void 0?nt.length:0;let mt=0;D.morphAttributes.position!==void 0&&(mt=1),D.morphAttributes.normal!==void 0&&(mt=2),D.morphAttributes.color!==void 0&&(mt=3);let J,ot,gt,Q;if(et){const ie=ni[et];J=ie.vertexShader,ot=ie.fragmentShader}else J=v.vertexShader,ot=v.fragmentShader,l.update(v),gt=l.getVertexShaderID(v),Q=l.getFragmentShaderID(v);const at=s.getRenderTarget(),ct=Z.isInstancedMesh===!0,wt=Z.isBatchedMesh===!0,vt=!!v.map,Rt=!!v.matcap,V=!!O,_t=!!v.aoMap,ft=!!v.lightMap,S=!!v.bumpMap,N=!!v.normalMap,q=!!v.displacementMap,j=!!v.emissiveMap,w=!!v.metalnessMap,y=!!v.roughnessMap,F=v.anisotropy>0,k=v.clearcoat>0,X=v.iridescence>0,$=v.sheen>0,ut=v.transmission>0,K=F&&!!v.anisotropyMap,lt=k&&!!v.clearcoatMap,Mt=k&&!!v.clearcoatNormalMap,St=k&&!!v.clearcoatRoughnessMap,it=X&&!!v.iridescenceMap,Lt=X&&!!v.iridescenceThicknessMap,Ct=$&&!!v.sheenColorMap,Tt=$&&!!v.sheenRoughnessMap,Et=!!v.specularMap,Pt=!!v.specularColorMap,Y=!!v.specularIntensityMap,xt=ut&&!!v.transmissionMap,Nt=ut&&!!v.thicknessMap,Ut=!!v.gradientMap,yt=!!v.alphaMap,G=v.alphaTest>0,At=!!v.alphaHash,bt=!!v.extensions,It=!!D.attributes.uv1,Bt=!!D.attributes.uv2,qt=!!D.attributes.uv3;let zt=Ti;return v.toneMapped&&(at===null||at.isXRRenderTarget===!0)&&(zt=s.toneMapping),{isWebGL2:h,shaderID:et,shaderType:v.type,shaderName:v.name,vertexShader:J,fragmentShader:ot,defines:v.defines,customVertexShaderID:gt,customFragmentShaderID:Q,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:f,batching:wt,instancing:ct,instancingColor:ct&&Z.instanceColor!==null,supportsVertexTextures:u,outputColorSpace:at===null?s.outputColorSpace:at.isXRRenderTarget===!0?at.texture.colorSpace:Mi,map:vt,matcap:Rt,envMap:V,envMapMode:V&&O.mapping,envMapCubeUVHeight:W,aoMap:_t,lightMap:ft,bumpMap:S,normalMap:N,displacementMap:u&&q,emissiveMap:j,normalMapObjectSpace:N&&v.normalMapType===Hc,normalMapTangentSpace:N&&v.normalMapType===Al,metalnessMap:w,roughnessMap:y,anisotropy:F,anisotropyMap:K,clearcoat:k,clearcoatMap:lt,clearcoatNormalMap:Mt,clearcoatRoughnessMap:St,iridescence:X,iridescenceMap:it,iridescenceThicknessMap:Lt,sheen:$,sheenColorMap:Ct,sheenRoughnessMap:Tt,specularMap:Et,specularColorMap:Pt,specularIntensityMap:Y,transmission:ut,transmissionMap:xt,thicknessMap:Nt,gradientMap:Ut,opaque:v.transparent===!1&&v.blending===gn,alphaMap:yt,alphaTest:G,alphaHash:At,combine:v.combine,mapUv:vt&&M(v.map.channel),aoMapUv:_t&&M(v.aoMap.channel),lightMapUv:ft&&M(v.lightMap.channel),bumpMapUv:S&&M(v.bumpMap.channel),normalMapUv:N&&M(v.normalMap.channel),displacementMapUv:q&&M(v.displacementMap.channel),emissiveMapUv:j&&M(v.emissiveMap.channel),metalnessMapUv:w&&M(v.metalnessMap.channel),roughnessMapUv:y&&M(v.roughnessMap.channel),anisotropyMapUv:K&&M(v.anisotropyMap.channel),clearcoatMapUv:lt&&M(v.clearcoatMap.channel),clearcoatNormalMapUv:Mt&&M(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:St&&M(v.clearcoatRoughnessMap.channel),iridescenceMapUv:it&&M(v.iridescenceMap.channel),iridescenceThicknessMapUv:Lt&&M(v.iridescenceThicknessMap.channel),sheenColorMapUv:Ct&&M(v.sheenColorMap.channel),sheenRoughnessMapUv:Tt&&M(v.sheenRoughnessMap.channel),specularMapUv:Et&&M(v.specularMap.channel),specularColorMapUv:Pt&&M(v.specularColorMap.channel),specularIntensityMapUv:Y&&M(v.specularIntensityMap.channel),transmissionMapUv:xt&&M(v.transmissionMap.channel),thicknessMapUv:Nt&&M(v.thicknessMap.channel),alphaMapUv:yt&&M(v.alphaMap.channel),vertexTangents:!!D.attributes.tangent&&(N||F),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,vertexUv1s:It,vertexUv2s:Bt,vertexUv3s:qt,pointsUvs:Z.isPoints===!0&&!!D.attributes.uv&&(vt||yt),fog:!!C,useFog:v.fog===!0,fogExp2:C&&C.isFogExp2,flatShading:v.flatShading===!0,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:Z.isSkinnedMesh===!0,morphTargets:D.morphAttributes.position!==void 0,morphNormals:D.morphAttributes.normal!==void 0,morphColors:D.morphAttributes.color!==void 0,morphTargetsCount:rt,morphTextureStride:mt,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:v.dithering,shadowMapEnabled:s.shadowMap.enabled&&L.length>0,shadowMapType:s.shadowMap.type,toneMapping:zt,useLegacyLights:s._useLegacyLights,decodeVideoTexture:vt&&v.map.isVideoTexture===!0&&ne.getTransfer(v.map.colorSpace)===le,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===je,flipSided:v.side===Ne,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionDerivatives:bt&&v.extensions.derivatives===!0,extensionFragDepth:bt&&v.extensions.fragDepth===!0,extensionDrawBuffers:bt&&v.extensions.drawBuffers===!0,extensionShaderTextureLOD:bt&&v.extensions.shaderTextureLOD===!0,extensionClipCullDistance:bt&&v.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()}}function p(v){const E=[];if(v.shaderID?E.push(v.shaderID):(E.push(v.customVertexShaderID),E.push(v.customFragmentShaderID)),v.defines!==void 0)for(const L in v.defines)E.push(L),E.push(v.defines[L]);return v.isRawShaderMaterial===!1&&(A(E,v),x(E,v),E.push(s.outputColorSpace)),E.push(v.customProgramCacheKey),E.join()}function A(v,E){v.push(E.precision),v.push(E.outputColorSpace),v.push(E.envMapMode),v.push(E.envMapCubeUVHeight),v.push(E.mapUv),v.push(E.alphaMapUv),v.push(E.lightMapUv),v.push(E.aoMapUv),v.push(E.bumpMapUv),v.push(E.normalMapUv),v.push(E.displacementMapUv),v.push(E.emissiveMapUv),v.push(E.metalnessMapUv),v.push(E.roughnessMapUv),v.push(E.anisotropyMapUv),v.push(E.clearcoatMapUv),v.push(E.clearcoatNormalMapUv),v.push(E.clearcoatRoughnessMapUv),v.push(E.iridescenceMapUv),v.push(E.iridescenceThicknessMapUv),v.push(E.sheenColorMapUv),v.push(E.sheenRoughnessMapUv),v.push(E.specularMapUv),v.push(E.specularColorMapUv),v.push(E.specularIntensityMapUv),v.push(E.transmissionMapUv),v.push(E.thicknessMapUv),v.push(E.combine),v.push(E.fogExp2),v.push(E.sizeAttenuation),v.push(E.morphTargetsCount),v.push(E.morphAttributeCount),v.push(E.numDirLights),v.push(E.numPointLights),v.push(E.numSpotLights),v.push(E.numSpotLightMaps),v.push(E.numHemiLights),v.push(E.numRectAreaLights),v.push(E.numDirLightShadows),v.push(E.numPointLightShadows),v.push(E.numSpotLightShadows),v.push(E.numSpotLightShadowsWithMaps),v.push(E.numLightProbes),v.push(E.shadowMapType),v.push(E.toneMapping),v.push(E.numClippingPlanes),v.push(E.numClipIntersection),v.push(E.depthPacking)}function x(v,E){r.disableAll(),E.isWebGL2&&r.enable(0),E.supportsVertexTextures&&r.enable(1),E.instancing&&r.enable(2),E.instancingColor&&r.enable(3),E.matcap&&r.enable(4),E.envMap&&r.enable(5),E.normalMapObjectSpace&&r.enable(6),E.normalMapTangentSpace&&r.enable(7),E.clearcoat&&r.enable(8),E.iridescence&&r.enable(9),E.alphaTest&&r.enable(10),E.vertexColors&&r.enable(11),E.vertexAlphas&&r.enable(12),E.vertexUv1s&&r.enable(13),E.vertexUv2s&&r.enable(14),E.vertexUv3s&&r.enable(15),E.vertexTangents&&r.enable(16),E.anisotropy&&r.enable(17),E.alphaHash&&r.enable(18),E.batching&&r.enable(19),v.push(r.mask),r.disableAll(),E.fog&&r.enable(0),E.useFog&&r.enable(1),E.flatShading&&r.enable(2),E.logarithmicDepthBuffer&&r.enable(3),E.skinning&&r.enable(4),E.morphTargets&&r.enable(5),E.morphNormals&&r.enable(6),E.morphColors&&r.enable(7),E.premultipliedAlpha&&r.enable(8),E.shadowMapEnabled&&r.enable(9),E.useLegacyLights&&r.enable(10),E.doubleSided&&r.enable(11),E.flipSided&&r.enable(12),E.useDepthPacking&&r.enable(13),E.dithering&&r.enable(14),E.transmission&&r.enable(15),E.sheen&&r.enable(16),E.opaque&&r.enable(17),E.pointsUvs&&r.enable(18),E.decodeVideoTexture&&r.enable(19),v.push(r.mask)}function b(v){const E=g[v.type];let L;if(E){const z=ni[E];L=sa.clone(z.uniforms)}else L=v.uniforms;return L}function I(v,E){let L;for(let z=0,Z=c.length;z<Z;z++){const C=c[z];if(C.cacheKey===E){L=C,++L.usedTimes;break}}return L===void 0&&(L=new Hp(s,E,v,o),c.push(L)),L}function T(v){if(--v.usedTimes===0){const E=c.indexOf(v);c[E]=c[c.length-1],c.pop(),v.destroy()}}function _(v){l.remove(v)}function P(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:b,acquireProgram:I,releaseProgram:T,releaseShaderCache:_,programs:c,dispose:P}}function $p(){let s=new WeakMap;function t(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function e(o){s.delete(o)}function i(o,a,r){s.get(o)[a]=r}function n(){s=new WeakMap}return{get:t,remove:e,update:i,dispose:n}}function jp(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function Pr(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Lr(){const s=[];let t=0;const e=[],i=[],n=[];function o(){t=0,e.length=0,i.length=0,n.length=0}function a(d,u,f,g,M,m){let p=s[t];return p===void 0?(p={id:d.id,object:d,geometry:u,material:f,groupOrder:g,renderOrder:d.renderOrder,z:M,group:m},s[t]=p):(p.id=d.id,p.object=d,p.geometry=u,p.material=f,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=M,p.group=m),t++,p}function r(d,u,f,g,M,m){const p=a(d,u,f,g,M,m);f.transmission>0?i.push(p):f.transparent===!0?n.push(p):e.push(p)}function l(d,u,f,g,M,m){const p=a(d,u,f,g,M,m);f.transmission>0?i.unshift(p):f.transparent===!0?n.unshift(p):e.unshift(p)}function c(d,u){e.length>1&&e.sort(d||jp),i.length>1&&i.sort(u||Pr),n.length>1&&n.sort(u||Pr)}function h(){for(let d=t,u=s.length;d<u;d++){const f=s[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:i,transparent:n,init:o,push:r,unshift:l,finish:h,sort:c}}function Zp(){let s=new WeakMap;function t(i,n){const o=s.get(i);let a;return o===void 0?(a=new Lr,s.set(i,[a])):n>=o.length?(a=new Lr,o.push(a)):a=o[n],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function Kp(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new R,color:new te};break;case"SpotLight":e={position:new R,direction:new R,color:new te,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new R,color:new te,distance:0,decay:0};break;case"HemisphereLight":e={direction:new R,skyColor:new te,groundColor:new te};break;case"RectAreaLight":e={color:new te,position:new R,halfWidth:new R,halfHeight:new R};break}return s[t.id]=e,e}}}function Jp(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let Qp=0;function t0(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function e0(s,t){const e=new Kp,i=Jp(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)n.probe.push(new R);const o=new R,a=new se,r=new se;function l(h,d){let u=0,f=0,g=0;for(let z=0;z<9;z++)n.probe[z].set(0,0,0);let M=0,m=0,p=0,A=0,x=0,b=0,I=0,T=0,_=0,P=0,v=0;h.sort(t0);const E=d===!0?Math.PI:1;for(let z=0,Z=h.length;z<Z;z++){const C=h[z],D=C.color,B=C.intensity,O=C.distance,W=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)u+=D.r*B*E,f+=D.g*B*E,g+=D.b*B*E;else if(C.isLightProbe){for(let et=0;et<9;et++)n.probe[et].addScaledVector(C.sh.coefficients[et],B);v++}else if(C.isDirectionalLight){const et=e.get(C);if(et.color.copy(C.color).multiplyScalar(C.intensity*E),C.castShadow){const nt=C.shadow,rt=i.get(C);rt.shadowBias=nt.bias,rt.shadowNormalBias=nt.normalBias,rt.shadowRadius=nt.radius,rt.shadowMapSize=nt.mapSize,n.directionalShadow[M]=rt,n.directionalShadowMap[M]=W,n.directionalShadowMatrix[M]=C.shadow.matrix,b++}n.directional[M]=et,M++}else if(C.isSpotLight){const et=e.get(C);et.position.setFromMatrixPosition(C.matrixWorld),et.color.copy(D).multiplyScalar(B*E),et.distance=O,et.coneCos=Math.cos(C.angle),et.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),et.decay=C.decay,n.spot[p]=et;const nt=C.shadow;if(C.map&&(n.spotLightMap[_]=C.map,_++,nt.updateMatrices(C),C.castShadow&&P++),n.spotLightMatrix[p]=nt.matrix,C.castShadow){const rt=i.get(C);rt.shadowBias=nt.bias,rt.shadowNormalBias=nt.normalBias,rt.shadowRadius=nt.radius,rt.shadowMapSize=nt.mapSize,n.spotShadow[p]=rt,n.spotShadowMap[p]=W,T++}p++}else if(C.isRectAreaLight){const et=e.get(C);et.color.copy(D).multiplyScalar(B),et.halfWidth.set(C.width*.5,0,0),et.halfHeight.set(0,C.height*.5,0),n.rectArea[A]=et,A++}else if(C.isPointLight){const et=e.get(C);if(et.color.copy(C.color).multiplyScalar(C.intensity*E),et.distance=C.distance,et.decay=C.decay,C.castShadow){const nt=C.shadow,rt=i.get(C);rt.shadowBias=nt.bias,rt.shadowNormalBias=nt.normalBias,rt.shadowRadius=nt.radius,rt.shadowMapSize=nt.mapSize,rt.shadowCameraNear=nt.camera.near,rt.shadowCameraFar=nt.camera.far,n.pointShadow[m]=rt,n.pointShadowMap[m]=W,n.pointShadowMatrix[m]=C.shadow.matrix,I++}n.point[m]=et,m++}else if(C.isHemisphereLight){const et=e.get(C);et.skyColor.copy(C.color).multiplyScalar(B*E),et.groundColor.copy(C.groundColor).multiplyScalar(B*E),n.hemi[x]=et,x++}}A>0&&(t.isWebGL2?s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Dt.LTC_FLOAT_1,n.rectAreaLTC2=Dt.LTC_FLOAT_2):(n.rectAreaLTC1=Dt.LTC_HALF_1,n.rectAreaLTC2=Dt.LTC_HALF_2):s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Dt.LTC_FLOAT_1,n.rectAreaLTC2=Dt.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(n.rectAreaLTC1=Dt.LTC_HALF_1,n.rectAreaLTC2=Dt.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=g;const L=n.hash;(L.directionalLength!==M||L.pointLength!==m||L.spotLength!==p||L.rectAreaLength!==A||L.hemiLength!==x||L.numDirectionalShadows!==b||L.numPointShadows!==I||L.numSpotShadows!==T||L.numSpotMaps!==_||L.numLightProbes!==v)&&(n.directional.length=M,n.spot.length=p,n.rectArea.length=A,n.point.length=m,n.hemi.length=x,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=I,n.pointShadowMap.length=I,n.spotShadow.length=T,n.spotShadowMap.length=T,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=I,n.spotLightMatrix.length=T+_-P,n.spotLightMap.length=_,n.numSpotLightShadowsWithMaps=P,n.numLightProbes=v,L.directionalLength=M,L.pointLength=m,L.spotLength=p,L.rectAreaLength=A,L.hemiLength=x,L.numDirectionalShadows=b,L.numPointShadows=I,L.numSpotShadows=T,L.numSpotMaps=_,L.numLightProbes=v,n.version=Qp++)}function c(h,d){let u=0,f=0,g=0,M=0,m=0;const p=d.matrixWorldInverse;for(let A=0,x=h.length;A<x;A++){const b=h[A];if(b.isDirectionalLight){const I=n.directional[u];I.direction.setFromMatrixPosition(b.matrixWorld),o.setFromMatrixPosition(b.target.matrixWorld),I.direction.sub(o),I.direction.transformDirection(p),u++}else if(b.isSpotLight){const I=n.spot[g];I.position.setFromMatrixPosition(b.matrixWorld),I.position.applyMatrix4(p),I.direction.setFromMatrixPosition(b.matrixWorld),o.setFromMatrixPosition(b.target.matrixWorld),I.direction.sub(o),I.direction.transformDirection(p),g++}else if(b.isRectAreaLight){const I=n.rectArea[M];I.position.setFromMatrixPosition(b.matrixWorld),I.position.applyMatrix4(p),r.identity(),a.copy(b.matrixWorld),a.premultiply(p),r.extractRotation(a),I.halfWidth.set(b.width*.5,0,0),I.halfHeight.set(0,b.height*.5,0),I.halfWidth.applyMatrix4(r),I.halfHeight.applyMatrix4(r),M++}else if(b.isPointLight){const I=n.point[f];I.position.setFromMatrixPosition(b.matrixWorld),I.position.applyMatrix4(p),f++}else if(b.isHemisphereLight){const I=n.hemi[m];I.direction.setFromMatrixPosition(b.matrixWorld),I.direction.transformDirection(p),m++}}}return{setup:l,setupView:c,state:n}}function Ir(s,t){const e=new e0(s,t),i=[],n=[];function o(){i.length=0,n.length=0}function a(d){i.push(d)}function r(d){n.push(d)}function l(d){e.setup(i,d)}function c(d){e.setupView(i,d)}return{init:o,state:{lightsArray:i,shadowsArray:n,lights:e},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:r}}function i0(s,t){let e=new WeakMap;function i(o,a=0){const r=e.get(o);let l;return r===void 0?(l=new Ir(s,t),e.set(o,[l])):a>=r.length?(l=new Ir(s,t),r.push(l)):l=r[a],l}function n(){e=new WeakMap}return{get:i,dispose:n}}class n0 extends Xi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=kc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class s0 extends Xi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const o0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,a0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function r0(s,t,e){let i=new Tn;const n=new Xt,o=new Xt,a=new he,r=new n0({depthPacking:Vc}),l=new s0,c={},h=e.maxTextureSize,d={[Ci]:Ne,[Ne]:Ci,[je]:je},u=new oi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Xt},radius:{value:4}},vertexShader:o0,fragmentShader:a0}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const g=new We;g.setAttribute("position",new Ke(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new tt(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=dl;let p=this.type;this.render=function(T,_,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const v=s.getRenderTarget(),E=s.getActiveCubeFace(),L=s.getActiveMipmapLevel(),z=s.state;z.setBlending(mi),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const Z=p!==fi&&this.type===fi,C=p===fi&&this.type!==fi;for(let D=0,B=T.length;D<B;D++){const O=T[D],W=O.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",O,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;n.copy(W.mapSize);const et=W.getFrameExtents();if(n.multiply(et),o.copy(W.mapSize),(n.x>h||n.y>h)&&(n.x>h&&(o.x=Math.floor(h/et.x),n.x=o.x*et.x,W.mapSize.x=o.x),n.y>h&&(o.y=Math.floor(h/et.y),n.y=o.y*et.y,W.mapSize.y=o.y)),W.map===null||Z===!0||C===!0){const rt=this.type!==fi?{minFilter:ge,magFilter:ge}:{};W.map!==null&&W.map.dispose(),W.map=new Ri(n.x,n.y,rt),W.map.texture.name=O.name+".shadowMap",W.camera.updateProjectionMatrix()}s.setRenderTarget(W.map),s.clear();const nt=W.getViewportCount();for(let rt=0;rt<nt;rt++){const mt=W.getViewport(rt);a.set(o.x*mt.x,o.y*mt.y,o.x*mt.z,o.y*mt.w),z.viewport(a),W.updateMatrices(O,rt),i=W.getFrustum(),b(_,P,W.camera,O,this.type)}W.isPointLightShadow!==!0&&this.type===fi&&A(W,P),W.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(v,E,L)};function A(T,_){const P=t.update(M);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Ri(n.x,n.y)),u.uniforms.shadow_pass.value=T.map.texture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,s.setRenderTarget(T.mapPass),s.clear(),s.renderBufferDirect(_,null,P,u,M,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,s.setRenderTarget(T.map),s.clear(),s.renderBufferDirect(_,null,P,f,M,null)}function x(T,_,P,v){let E=null;const L=P.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(L!==void 0)E=L;else if(E=P.isPointLight===!0?l:r,s.localClippingEnabled&&_.clipShadows===!0&&Array.isArray(_.clippingPlanes)&&_.clippingPlanes.length!==0||_.displacementMap&&_.displacementScale!==0||_.alphaMap&&_.alphaTest>0||_.map&&_.alphaTest>0){const z=E.uuid,Z=_.uuid;let C=c[z];C===void 0&&(C={},c[z]=C);let D=C[Z];D===void 0&&(D=E.clone(),C[Z]=D,_.addEventListener("dispose",I)),E=D}if(E.visible=_.visible,E.wireframe=_.wireframe,v===fi?E.side=_.shadowSide!==null?_.shadowSide:_.side:E.side=_.shadowSide!==null?_.shadowSide:d[_.side],E.alphaMap=_.alphaMap,E.alphaTest=_.alphaTest,E.map=_.map,E.clipShadows=_.clipShadows,E.clippingPlanes=_.clippingPlanes,E.clipIntersection=_.clipIntersection,E.displacementMap=_.displacementMap,E.displacementScale=_.displacementScale,E.displacementBias=_.displacementBias,E.wireframeLinewidth=_.wireframeLinewidth,E.linewidth=_.linewidth,P.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const z=s.properties.get(E);z.light=P}return E}function b(T,_,P,v,E){if(T.visible===!1)return;if(T.layers.test(_.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&E===fi)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,T.matrixWorld);const Z=t.update(T),C=T.material;if(Array.isArray(C)){const D=Z.groups;for(let B=0,O=D.length;B<O;B++){const W=D[B],et=C[W.materialIndex];if(et&&et.visible){const nt=x(T,et,v,E);T.onBeforeShadow(s,T,_,P,Z,nt,W),s.renderBufferDirect(P,null,Z,nt,T,W),T.onAfterShadow(s,T,_,P,Z,nt,W)}}}else if(C.visible){const D=x(T,C,v,E);T.onBeforeShadow(s,T,_,P,Z,D,null),s.renderBufferDirect(P,null,Z,D,T,null),T.onAfterShadow(s,T,_,P,Z,D,null)}}const z=T.children;for(let Z=0,C=z.length;Z<C;Z++)b(z[Z],_,P,v,E)}function I(T){T.target.removeEventListener("dispose",I);for(const P in c){const v=c[P],E=T.target.uuid;E in v&&(v[E].dispose(),delete v[E])}}}function l0(s,t,e){const i=e.isWebGL2;function n(){let G=!1;const At=new he;let bt=null;const It=new he(0,0,0,0);return{setMask:function(Bt){bt!==Bt&&!G&&(s.colorMask(Bt,Bt,Bt,Bt),bt=Bt)},setLocked:function(Bt){G=Bt},setClear:function(Bt,qt,zt,$t,ie){ie===!0&&(Bt*=$t,qt*=$t,zt*=$t),At.set(Bt,qt,zt,$t),It.equals(At)===!1&&(s.clearColor(Bt,qt,zt,$t),It.copy(At))},reset:function(){G=!1,bt=null,It.set(-1,0,0,0)}}}function o(){let G=!1,At=null,bt=null,It=null;return{setTest:function(Bt){Bt?wt(s.DEPTH_TEST):vt(s.DEPTH_TEST)},setMask:function(Bt){At!==Bt&&!G&&(s.depthMask(Bt),At=Bt)},setFunc:function(Bt){if(bt!==Bt){switch(Bt){case Sc:s.depthFunc(s.NEVER);break;case wc:s.depthFunc(s.ALWAYS);break;case Ec:s.depthFunc(s.LESS);break;case Ls:s.depthFunc(s.LEQUAL);break;case bc:s.depthFunc(s.EQUAL);break;case Tc:s.depthFunc(s.GEQUAL);break;case Ac:s.depthFunc(s.GREATER);break;case Cc:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}bt=Bt}},setLocked:function(Bt){G=Bt},setClear:function(Bt){It!==Bt&&(s.clearDepth(Bt),It=Bt)},reset:function(){G=!1,At=null,bt=null,It=null}}}function a(){let G=!1,At=null,bt=null,It=null,Bt=null,qt=null,zt=null,$t=null,ie=null;return{setTest:function(kt){G||(kt?wt(s.STENCIL_TEST):vt(s.STENCIL_TEST))},setMask:function(kt){At!==kt&&!G&&(s.stencilMask(kt),At=kt)},setFunc:function(kt,re,Be){(bt!==kt||It!==re||Bt!==Be)&&(s.stencilFunc(kt,re,Be),bt=kt,It=re,Bt=Be)},setOp:function(kt,re,Be){(qt!==kt||zt!==re||$t!==Be)&&(s.stencilOp(kt,re,Be),qt=kt,zt=re,$t=Be)},setLocked:function(kt){G=kt},setClear:function(kt){ie!==kt&&(s.clearStencil(kt),ie=kt)},reset:function(){G=!1,At=null,bt=null,It=null,Bt=null,qt=null,zt=null,$t=null,ie=null}}}const r=new n,l=new o,c=new a,h=new WeakMap,d=new WeakMap;let u={},f={},g=new WeakMap,M=[],m=null,p=!1,A=null,x=null,b=null,I=null,T=null,_=null,P=null,v=new te(0,0,0),E=0,L=!1,z=null,Z=null,C=null,D=null,B=null;const O=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,et=0;const nt=s.getParameter(s.VERSION);nt.indexOf("WebGL")!==-1?(et=parseFloat(/^WebGL (\d)/.exec(nt)[1]),W=et>=1):nt.indexOf("OpenGL ES")!==-1&&(et=parseFloat(/^OpenGL ES (\d)/.exec(nt)[1]),W=et>=2);let rt=null,mt={};const J=s.getParameter(s.SCISSOR_BOX),ot=s.getParameter(s.VIEWPORT),gt=new he().fromArray(J),Q=new he().fromArray(ot);function at(G,At,bt,It){const Bt=new Uint8Array(4),qt=s.createTexture();s.bindTexture(G,qt),s.texParameteri(G,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(G,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let zt=0;zt<bt;zt++)i&&(G===s.TEXTURE_3D||G===s.TEXTURE_2D_ARRAY)?s.texImage3D(At,0,s.RGBA,1,1,It,0,s.RGBA,s.UNSIGNED_BYTE,Bt):s.texImage2D(At+zt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Bt);return qt}const ct={};ct[s.TEXTURE_2D]=at(s.TEXTURE_2D,s.TEXTURE_2D,1),ct[s.TEXTURE_CUBE_MAP]=at(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(ct[s.TEXTURE_2D_ARRAY]=at(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),ct[s.TEXTURE_3D]=at(s.TEXTURE_3D,s.TEXTURE_3D,1,1)),r.setClear(0,0,0,1),l.setClear(1),c.setClear(0),wt(s.DEPTH_TEST),l.setFunc(Ls),j(!1),w(ma),wt(s.CULL_FACE),N(mi);function wt(G){u[G]!==!0&&(s.enable(G),u[G]=!0)}function vt(G){u[G]!==!1&&(s.disable(G),u[G]=!1)}function Rt(G,At){return f[G]!==At?(s.bindFramebuffer(G,At),f[G]=At,i&&(G===s.DRAW_FRAMEBUFFER&&(f[s.FRAMEBUFFER]=At),G===s.FRAMEBUFFER&&(f[s.DRAW_FRAMEBUFFER]=At)),!0):!1}function V(G,At){let bt=M,It=!1;if(G)if(bt=g.get(At),bt===void 0&&(bt=[],g.set(At,bt)),G.isWebGLMultipleRenderTargets){const Bt=G.texture;if(bt.length!==Bt.length||bt[0]!==s.COLOR_ATTACHMENT0){for(let qt=0,zt=Bt.length;qt<zt;qt++)bt[qt]=s.COLOR_ATTACHMENT0+qt;bt.length=Bt.length,It=!0}}else bt[0]!==s.COLOR_ATTACHMENT0&&(bt[0]=s.COLOR_ATTACHMENT0,It=!0);else bt[0]!==s.BACK&&(bt[0]=s.BACK,It=!0);It&&(e.isWebGL2?s.drawBuffers(bt):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(bt))}function _t(G){return m!==G?(s.useProgram(G),m=G,!0):!1}const ft={[Oi]:s.FUNC_ADD,[rc]:s.FUNC_SUBTRACT,[lc]:s.FUNC_REVERSE_SUBTRACT};if(i)ft[xa]=s.MIN,ft[_a]=s.MAX;else{const G=t.get("EXT_blend_minmax");G!==null&&(ft[xa]=G.MIN_EXT,ft[_a]=G.MAX_EXT)}const S={[cc]:s.ZERO,[hc]:s.ONE,[dc]:s.SRC_COLOR,[Wo]:s.SRC_ALPHA,[Mc]:s.SRC_ALPHA_SATURATE,[mc]:s.DST_COLOR,[uc]:s.DST_ALPHA,[fc]:s.ONE_MINUS_SRC_COLOR,[Xo]:s.ONE_MINUS_SRC_ALPHA,[gc]:s.ONE_MINUS_DST_COLOR,[pc]:s.ONE_MINUS_DST_ALPHA,[xc]:s.CONSTANT_COLOR,[_c]:s.ONE_MINUS_CONSTANT_COLOR,[yc]:s.CONSTANT_ALPHA,[vc]:s.ONE_MINUS_CONSTANT_ALPHA};function N(G,At,bt,It,Bt,qt,zt,$t,ie,kt){if(G===mi){p===!0&&(vt(s.BLEND),p=!1);return}if(p===!1&&(wt(s.BLEND),p=!0),G!==ac){if(G!==A||kt!==L){if((x!==Oi||T!==Oi)&&(s.blendEquation(s.FUNC_ADD),x=Oi,T=Oi),kt)switch(G){case gn:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case xe:s.blendFunc(s.ONE,s.ONE);break;case ga:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Ma:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}else switch(G){case gn:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case xe:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case ga:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Ma:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}b=null,I=null,_=null,P=null,v.set(0,0,0),E=0,A=G,L=kt}return}Bt=Bt||At,qt=qt||bt,zt=zt||It,(At!==x||Bt!==T)&&(s.blendEquationSeparate(ft[At],ft[Bt]),x=At,T=Bt),(bt!==b||It!==I||qt!==_||zt!==P)&&(s.blendFuncSeparate(S[bt],S[It],S[qt],S[zt]),b=bt,I=It,_=qt,P=zt),($t.equals(v)===!1||ie!==E)&&(s.blendColor($t.r,$t.g,$t.b,ie),v.copy($t),E=ie),A=G,L=!1}function q(G,At){G.side===je?vt(s.CULL_FACE):wt(s.CULL_FACE);let bt=G.side===Ne;At&&(bt=!bt),j(bt),G.blending===gn&&G.transparent===!1?N(mi):N(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.blendColor,G.blendAlpha,G.premultipliedAlpha),l.setFunc(G.depthFunc),l.setTest(G.depthTest),l.setMask(G.depthWrite),r.setMask(G.colorWrite);const It=G.stencilWrite;c.setTest(It),It&&(c.setMask(G.stencilWriteMask),c.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),c.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),F(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?wt(s.SAMPLE_ALPHA_TO_COVERAGE):vt(s.SAMPLE_ALPHA_TO_COVERAGE)}function j(G){z!==G&&(G?s.frontFace(s.CW):s.frontFace(s.CCW),z=G)}function w(G){G!==sc?(wt(s.CULL_FACE),G!==Z&&(G===ma?s.cullFace(s.BACK):G===oc?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):vt(s.CULL_FACE),Z=G}function y(G){G!==C&&(W&&s.lineWidth(G),C=G)}function F(G,At,bt){G?(wt(s.POLYGON_OFFSET_FILL),(D!==At||B!==bt)&&(s.polygonOffset(At,bt),D=At,B=bt)):vt(s.POLYGON_OFFSET_FILL)}function k(G){G?wt(s.SCISSOR_TEST):vt(s.SCISSOR_TEST)}function X(G){G===void 0&&(G=s.TEXTURE0+O-1),rt!==G&&(s.activeTexture(G),rt=G)}function $(G,At,bt){bt===void 0&&(rt===null?bt=s.TEXTURE0+O-1:bt=rt);let It=mt[bt];It===void 0&&(It={type:void 0,texture:void 0},mt[bt]=It),(It.type!==G||It.texture!==At)&&(rt!==bt&&(s.activeTexture(bt),rt=bt),s.bindTexture(G,At||ct[G]),It.type=G,It.texture=At)}function ut(){const G=mt[rt];G!==void 0&&G.type!==void 0&&(s.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function K(){try{s.compressedTexImage2D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function lt(){try{s.compressedTexImage3D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Mt(){try{s.texSubImage2D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function St(){try{s.texSubImage3D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function it(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Lt(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Ct(){try{s.texStorage2D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Tt(){try{s.texStorage3D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Et(){try{s.texImage2D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Pt(){try{s.texImage3D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Y(G){gt.equals(G)===!1&&(s.scissor(G.x,G.y,G.z,G.w),gt.copy(G))}function xt(G){Q.equals(G)===!1&&(s.viewport(G.x,G.y,G.z,G.w),Q.copy(G))}function Nt(G,At){let bt=d.get(At);bt===void 0&&(bt=new WeakMap,d.set(At,bt));let It=bt.get(G);It===void 0&&(It=s.getUniformBlockIndex(At,G.name),bt.set(G,It))}function Ut(G,At){const It=d.get(At).get(G);h.get(At)!==It&&(s.uniformBlockBinding(At,It,G.__bindingPointIndex),h.set(At,It))}function yt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),i===!0&&(s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),u={},rt=null,mt={},f={},g=new WeakMap,M=[],m=null,p=!1,A=null,x=null,b=null,I=null,T=null,_=null,P=null,v=new te(0,0,0),E=0,L=!1,z=null,Z=null,C=null,D=null,B=null,gt.set(0,0,s.canvas.width,s.canvas.height),Q.set(0,0,s.canvas.width,s.canvas.height),r.reset(),l.reset(),c.reset()}return{buffers:{color:r,depth:l,stencil:c},enable:wt,disable:vt,bindFramebuffer:Rt,drawBuffers:V,useProgram:_t,setBlending:N,setMaterial:q,setFlipSided:j,setCullFace:w,setLineWidth:y,setPolygonOffset:F,setScissorTest:k,activeTexture:X,bindTexture:$,unbindTexture:ut,compressedTexImage2D:K,compressedTexImage3D:lt,texImage2D:Et,texImage3D:Pt,updateUBOMapping:Nt,uniformBlockBinding:Ut,texStorage2D:Ct,texStorage3D:Tt,texSubImage2D:Mt,texSubImage3D:St,compressedTexSubImage2D:it,compressedTexSubImage3D:Lt,scissor:Y,viewport:xt,reset:yt}}function c0(s,t,e,i,n,o,a){const r=n.isWebGL2,l=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let d;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,y){return f?new OffscreenCanvas(w,y):Os("canvas")}function M(w,y,F,k){let X=1;if((w.width>k||w.height>k)&&(X=k/Math.max(w.width,w.height)),X<1||y===!0)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap){const $=y?Fs:Math.floor,ut=$(X*w.width),K=$(X*w.height);d===void 0&&(d=g(ut,K));const lt=F?g(ut,K):d;return lt.width=ut,lt.height=K,lt.getContext("2d").drawImage(w,0,0,ut,K),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+w.width+"x"+w.height+") to ("+ut+"x"+K+")."),lt}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+w.width+"x"+w.height+")."),w;return w}function m(w){return Zo(w.width)&&Zo(w.height)}function p(w){return r?!1:w.wrapS!==ei||w.wrapT!==ei||w.minFilter!==ge&&w.minFilter!==De}function A(w,y){return w.generateMipmaps&&y&&w.minFilter!==ge&&w.minFilter!==De}function x(w){s.generateMipmap(w)}function b(w,y,F,k,X=!1){if(r===!1)return y;if(w!==null){if(s[w]!==void 0)return s[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let $=y;if(y===s.RED&&(F===s.FLOAT&&($=s.R32F),F===s.HALF_FLOAT&&($=s.R16F),F===s.UNSIGNED_BYTE&&($=s.R8)),y===s.RED_INTEGER&&(F===s.UNSIGNED_BYTE&&($=s.R8UI),F===s.UNSIGNED_SHORT&&($=s.R16UI),F===s.UNSIGNED_INT&&($=s.R32UI),F===s.BYTE&&($=s.R8I),F===s.SHORT&&($=s.R16I),F===s.INT&&($=s.R32I)),y===s.RG&&(F===s.FLOAT&&($=s.RG32F),F===s.HALF_FLOAT&&($=s.RG16F),F===s.UNSIGNED_BYTE&&($=s.RG8)),y===s.RGBA){const ut=X?Ds:ne.getTransfer(k);F===s.FLOAT&&($=s.RGBA32F),F===s.HALF_FLOAT&&($=s.RGBA16F),F===s.UNSIGNED_BYTE&&($=ut===le?s.SRGB8_ALPHA8:s.RGBA8),F===s.UNSIGNED_SHORT_4_4_4_4&&($=s.RGBA4),F===s.UNSIGNED_SHORT_5_5_5_1&&($=s.RGB5_A1)}return($===s.R16F||$===s.R32F||$===s.RG16F||$===s.RG32F||$===s.RGBA16F||$===s.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function I(w,y,F){return A(w,F)===!0||w.isFramebufferTexture&&w.minFilter!==ge&&w.minFilter!==De?Math.log2(Math.max(y.width,y.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?y.mipmaps.length:1}function T(w){return w===ge||w===ya||w===$s?s.NEAREST:s.LINEAR}function _(w){const y=w.target;y.removeEventListener("dispose",_),v(y),y.isVideoTexture&&h.delete(y)}function P(w){const y=w.target;y.removeEventListener("dispose",P),L(y)}function v(w){const y=i.get(w);if(y.__webglInit===void 0)return;const F=w.source,k=u.get(F);if(k){const X=k[y.__cacheKey];X.usedTimes--,X.usedTimes===0&&E(w),Object.keys(k).length===0&&u.delete(F)}i.remove(w)}function E(w){const y=i.get(w);s.deleteTexture(y.__webglTexture);const F=w.source,k=u.get(F);delete k[y.__cacheKey],a.memory.textures--}function L(w){const y=w.texture,F=i.get(w),k=i.get(y);if(k.__webglTexture!==void 0&&(s.deleteTexture(k.__webglTexture),a.memory.textures--),w.depthTexture&&w.depthTexture.dispose(),w.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(F.__webglFramebuffer[X]))for(let $=0;$<F.__webglFramebuffer[X].length;$++)s.deleteFramebuffer(F.__webglFramebuffer[X][$]);else s.deleteFramebuffer(F.__webglFramebuffer[X]);F.__webglDepthbuffer&&s.deleteRenderbuffer(F.__webglDepthbuffer[X])}else{if(Array.isArray(F.__webglFramebuffer))for(let X=0;X<F.__webglFramebuffer.length;X++)s.deleteFramebuffer(F.__webglFramebuffer[X]);else s.deleteFramebuffer(F.__webglFramebuffer);if(F.__webglDepthbuffer&&s.deleteRenderbuffer(F.__webglDepthbuffer),F.__webglMultisampledFramebuffer&&s.deleteFramebuffer(F.__webglMultisampledFramebuffer),F.__webglColorRenderbuffer)for(let X=0;X<F.__webglColorRenderbuffer.length;X++)F.__webglColorRenderbuffer[X]&&s.deleteRenderbuffer(F.__webglColorRenderbuffer[X]);F.__webglDepthRenderbuffer&&s.deleteRenderbuffer(F.__webglDepthRenderbuffer)}if(w.isWebGLMultipleRenderTargets)for(let X=0,$=y.length;X<$;X++){const ut=i.get(y[X]);ut.__webglTexture&&(s.deleteTexture(ut.__webglTexture),a.memory.textures--),i.remove(y[X])}i.remove(y),i.remove(w)}let z=0;function Z(){z=0}function C(){const w=z;return w>=n.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+n.maxTextures),z+=1,w}function D(w){const y=[];return y.push(w.wrapS),y.push(w.wrapT),y.push(w.wrapR||0),y.push(w.magFilter),y.push(w.minFilter),y.push(w.anisotropy),y.push(w.internalFormat),y.push(w.format),y.push(w.type),y.push(w.generateMipmaps),y.push(w.premultiplyAlpha),y.push(w.flipY),y.push(w.unpackAlignment),y.push(w.colorSpace),y.join()}function B(w,y){const F=i.get(w);if(w.isVideoTexture&&q(w),w.isRenderTargetTexture===!1&&w.version>0&&F.__version!==w.version){const k=w.image;if(k===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(k.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{gt(F,w,y);return}}e.bindTexture(s.TEXTURE_2D,F.__webglTexture,s.TEXTURE0+y)}function O(w,y){const F=i.get(w);if(w.version>0&&F.__version!==w.version){gt(F,w,y);return}e.bindTexture(s.TEXTURE_2D_ARRAY,F.__webglTexture,s.TEXTURE0+y)}function W(w,y){const F=i.get(w);if(w.version>0&&F.__version!==w.version){gt(F,w,y);return}e.bindTexture(s.TEXTURE_3D,F.__webglTexture,s.TEXTURE0+y)}function et(w,y){const F=i.get(w);if(w.version>0&&F.__version!==w.version){Q(F,w,y);return}e.bindTexture(s.TEXTURE_CUBE_MAP,F.__webglTexture,s.TEXTURE0+y)}const nt={[Ve]:s.REPEAT,[ei]:s.CLAMP_TO_EDGE,[Yo]:s.MIRRORED_REPEAT},rt={[ge]:s.NEAREST,[ya]:s.NEAREST_MIPMAP_NEAREST,[$s]:s.NEAREST_MIPMAP_LINEAR,[De]:s.LINEAR,[Ic]:s.LINEAR_MIPMAP_NEAREST,[yn]:s.LINEAR_MIPMAP_LINEAR},mt={[Wc]:s.NEVER,[Zc]:s.ALWAYS,[Xc]:s.LESS,[Cl]:s.LEQUAL,[qc]:s.EQUAL,[jc]:s.GEQUAL,[Yc]:s.GREATER,[$c]:s.NOTEQUAL};function J(w,y,F){if(F?(s.texParameteri(w,s.TEXTURE_WRAP_S,nt[y.wrapS]),s.texParameteri(w,s.TEXTURE_WRAP_T,nt[y.wrapT]),(w===s.TEXTURE_3D||w===s.TEXTURE_2D_ARRAY)&&s.texParameteri(w,s.TEXTURE_WRAP_R,nt[y.wrapR]),s.texParameteri(w,s.TEXTURE_MAG_FILTER,rt[y.magFilter]),s.texParameteri(w,s.TEXTURE_MIN_FILTER,rt[y.minFilter])):(s.texParameteri(w,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(w,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),(w===s.TEXTURE_3D||w===s.TEXTURE_2D_ARRAY)&&s.texParameteri(w,s.TEXTURE_WRAP_R,s.CLAMP_TO_EDGE),(y.wrapS!==ei||y.wrapT!==ei)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(w,s.TEXTURE_MAG_FILTER,T(y.magFilter)),s.texParameteri(w,s.TEXTURE_MIN_FILTER,T(y.minFilter)),y.minFilter!==ge&&y.minFilter!==De&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),y.compareFunction&&(s.texParameteri(w,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(w,s.TEXTURE_COMPARE_FUNC,mt[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){const k=t.get("EXT_texture_filter_anisotropic");if(y.magFilter===ge||y.minFilter!==$s&&y.minFilter!==yn||y.type===Ei&&t.has("OES_texture_float_linear")===!1||r===!1&&y.type===vn&&t.has("OES_texture_half_float_linear")===!1)return;(y.anisotropy>1||i.get(y).__currentAnisotropy)&&(s.texParameterf(w,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,n.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy)}}function ot(w,y){let F=!1;w.__webglInit===void 0&&(w.__webglInit=!0,y.addEventListener("dispose",_));const k=y.source;let X=u.get(k);X===void 0&&(X={},u.set(k,X));const $=D(y);if($!==w.__cacheKey){X[$]===void 0&&(X[$]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,F=!0),X[$].usedTimes++;const ut=X[w.__cacheKey];ut!==void 0&&(X[w.__cacheKey].usedTimes--,ut.usedTimes===0&&E(y)),w.__cacheKey=$,w.__webglTexture=X[$].texture}return F}function gt(w,y,F){let k=s.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(k=s.TEXTURE_2D_ARRAY),y.isData3DTexture&&(k=s.TEXTURE_3D);const X=ot(w,y),$=y.source;e.bindTexture(k,w.__webglTexture,s.TEXTURE0+F);const ut=i.get($);if($.version!==ut.__version||X===!0){e.activeTexture(s.TEXTURE0+F);const K=ne.getPrimaries(ne.workingColorSpace),lt=y.colorSpace===Ze?null:ne.getPrimaries(y.colorSpace),Mt=y.colorSpace===Ze||K===lt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,y.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,y.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Mt);const St=p(y)&&m(y.image)===!1;let it=M(y.image,St,!1,n.maxTextureSize);it=j(y,it);const Lt=m(it)||r,Ct=o.convert(y.format,y.colorSpace);let Tt=o.convert(y.type),Et=b(y.internalFormat,Ct,Tt,y.colorSpace,y.isVideoTexture);J(k,y,Lt);let Pt;const Y=y.mipmaps,xt=r&&y.isVideoTexture!==!0&&Et!==bl,Nt=ut.__version===void 0||X===!0,Ut=I(y,it,Lt);if(y.isDepthTexture)Et=s.DEPTH_COMPONENT,r?y.type===Ei?Et=s.DEPTH_COMPONENT32F:y.type===wi?Et=s.DEPTH_COMPONENT24:y.type===ki?Et=s.DEPTH24_STENCIL8:Et=s.DEPTH_COMPONENT16:y.type===Ei&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),y.format===Vi&&Et===s.DEPTH_COMPONENT&&y.type!==ea&&y.type!==wi&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),y.type=wi,Tt=o.convert(y.type)),y.format===Sn&&Et===s.DEPTH_COMPONENT&&(Et=s.DEPTH_STENCIL,y.type!==ki&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),y.type=ki,Tt=o.convert(y.type))),Nt&&(xt?e.texStorage2D(s.TEXTURE_2D,1,Et,it.width,it.height):e.texImage2D(s.TEXTURE_2D,0,Et,it.width,it.height,0,Ct,Tt,null));else if(y.isDataTexture)if(Y.length>0&&Lt){xt&&Nt&&e.texStorage2D(s.TEXTURE_2D,Ut,Et,Y[0].width,Y[0].height);for(let yt=0,G=Y.length;yt<G;yt++)Pt=Y[yt],xt?e.texSubImage2D(s.TEXTURE_2D,yt,0,0,Pt.width,Pt.height,Ct,Tt,Pt.data):e.texImage2D(s.TEXTURE_2D,yt,Et,Pt.width,Pt.height,0,Ct,Tt,Pt.data);y.generateMipmaps=!1}else xt?(Nt&&e.texStorage2D(s.TEXTURE_2D,Ut,Et,it.width,it.height),e.texSubImage2D(s.TEXTURE_2D,0,0,0,it.width,it.height,Ct,Tt,it.data)):e.texImage2D(s.TEXTURE_2D,0,Et,it.width,it.height,0,Ct,Tt,it.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){xt&&Nt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,Ut,Et,Y[0].width,Y[0].height,it.depth);for(let yt=0,G=Y.length;yt<G;yt++)Pt=Y[yt],y.format!==ii?Ct!==null?xt?e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,yt,0,0,0,Pt.width,Pt.height,it.depth,Ct,Pt.data,0,0):e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,yt,Et,Pt.width,Pt.height,it.depth,0,Pt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):xt?e.texSubImage3D(s.TEXTURE_2D_ARRAY,yt,0,0,0,Pt.width,Pt.height,it.depth,Ct,Tt,Pt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,yt,Et,Pt.width,Pt.height,it.depth,0,Ct,Tt,Pt.data)}else{xt&&Nt&&e.texStorage2D(s.TEXTURE_2D,Ut,Et,Y[0].width,Y[0].height);for(let yt=0,G=Y.length;yt<G;yt++)Pt=Y[yt],y.format!==ii?Ct!==null?xt?e.compressedTexSubImage2D(s.TEXTURE_2D,yt,0,0,Pt.width,Pt.height,Ct,Pt.data):e.compressedTexImage2D(s.TEXTURE_2D,yt,Et,Pt.width,Pt.height,0,Pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):xt?e.texSubImage2D(s.TEXTURE_2D,yt,0,0,Pt.width,Pt.height,Ct,Tt,Pt.data):e.texImage2D(s.TEXTURE_2D,yt,Et,Pt.width,Pt.height,0,Ct,Tt,Pt.data)}else if(y.isDataArrayTexture)xt?(Nt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,Ut,Et,it.width,it.height,it.depth),e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,it.width,it.height,it.depth,Ct,Tt,it.data)):e.texImage3D(s.TEXTURE_2D_ARRAY,0,Et,it.width,it.height,it.depth,0,Ct,Tt,it.data);else if(y.isData3DTexture)xt?(Nt&&e.texStorage3D(s.TEXTURE_3D,Ut,Et,it.width,it.height,it.depth),e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,it.width,it.height,it.depth,Ct,Tt,it.data)):e.texImage3D(s.TEXTURE_3D,0,Et,it.width,it.height,it.depth,0,Ct,Tt,it.data);else if(y.isFramebufferTexture){if(Nt)if(xt)e.texStorage2D(s.TEXTURE_2D,Ut,Et,it.width,it.height);else{let yt=it.width,G=it.height;for(let At=0;At<Ut;At++)e.texImage2D(s.TEXTURE_2D,At,Et,yt,G,0,Ct,Tt,null),yt>>=1,G>>=1}}else if(Y.length>0&&Lt){xt&&Nt&&e.texStorage2D(s.TEXTURE_2D,Ut,Et,Y[0].width,Y[0].height);for(let yt=0,G=Y.length;yt<G;yt++)Pt=Y[yt],xt?e.texSubImage2D(s.TEXTURE_2D,yt,0,0,Ct,Tt,Pt):e.texImage2D(s.TEXTURE_2D,yt,Et,Ct,Tt,Pt);y.generateMipmaps=!1}else xt?(Nt&&e.texStorage2D(s.TEXTURE_2D,Ut,Et,it.width,it.height),e.texSubImage2D(s.TEXTURE_2D,0,0,0,Ct,Tt,it)):e.texImage2D(s.TEXTURE_2D,0,Et,Ct,Tt,it);A(y,Lt)&&x(k),ut.__version=$.version,y.onUpdate&&y.onUpdate(y)}w.__version=y.version}function Q(w,y,F){if(y.image.length!==6)return;const k=ot(w,y),X=y.source;e.bindTexture(s.TEXTURE_CUBE_MAP,w.__webglTexture,s.TEXTURE0+F);const $=i.get(X);if(X.version!==$.__version||k===!0){e.activeTexture(s.TEXTURE0+F);const ut=ne.getPrimaries(ne.workingColorSpace),K=y.colorSpace===Ze?null:ne.getPrimaries(y.colorSpace),lt=y.colorSpace===Ze||ut===K?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,y.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,y.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,lt);const Mt=y.isCompressedTexture||y.image[0].isCompressedTexture,St=y.image[0]&&y.image[0].isDataTexture,it=[];for(let yt=0;yt<6;yt++)!Mt&&!St?it[yt]=M(y.image[yt],!1,!0,n.maxCubemapSize):it[yt]=St?y.image[yt].image:y.image[yt],it[yt]=j(y,it[yt]);const Lt=it[0],Ct=m(Lt)||r,Tt=o.convert(y.format,y.colorSpace),Et=o.convert(y.type),Pt=b(y.internalFormat,Tt,Et,y.colorSpace),Y=r&&y.isVideoTexture!==!0,xt=$.__version===void 0||k===!0;let Nt=I(y,Lt,Ct);J(s.TEXTURE_CUBE_MAP,y,Ct);let Ut;if(Mt){Y&&xt&&e.texStorage2D(s.TEXTURE_CUBE_MAP,Nt,Pt,Lt.width,Lt.height);for(let yt=0;yt<6;yt++){Ut=it[yt].mipmaps;for(let G=0;G<Ut.length;G++){const At=Ut[G];y.format!==ii?Tt!==null?Y?e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+yt,G,0,0,At.width,At.height,Tt,At.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+yt,G,Pt,At.width,At.height,0,At.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Y?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+yt,G,0,0,At.width,At.height,Tt,Et,At.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+yt,G,Pt,At.width,At.height,0,Tt,Et,At.data)}}}else{Ut=y.mipmaps,Y&&xt&&(Ut.length>0&&Nt++,e.texStorage2D(s.TEXTURE_CUBE_MAP,Nt,Pt,it[0].width,it[0].height));for(let yt=0;yt<6;yt++)if(St){Y?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0,0,0,it[yt].width,it[yt].height,Tt,Et,it[yt].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0,Pt,it[yt].width,it[yt].height,0,Tt,Et,it[yt].data);for(let G=0;G<Ut.length;G++){const bt=Ut[G].image[yt].image;Y?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+yt,G+1,0,0,bt.width,bt.height,Tt,Et,bt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+yt,G+1,Pt,bt.width,bt.height,0,Tt,Et,bt.data)}}else{Y?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0,0,0,Tt,Et,it[yt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0,Pt,Tt,Et,it[yt]);for(let G=0;G<Ut.length;G++){const At=Ut[G];Y?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+yt,G+1,0,0,Tt,Et,At.image[yt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+yt,G+1,Pt,Tt,Et,At.image[yt])}}}A(y,Ct)&&x(s.TEXTURE_CUBE_MAP),$.__version=X.version,y.onUpdate&&y.onUpdate(y)}w.__version=y.version}function at(w,y,F,k,X,$){const ut=o.convert(F.format,F.colorSpace),K=o.convert(F.type),lt=b(F.internalFormat,ut,K,F.colorSpace);if(!i.get(y).__hasExternalTextures){const St=Math.max(1,y.width>>$),it=Math.max(1,y.height>>$);X===s.TEXTURE_3D||X===s.TEXTURE_2D_ARRAY?e.texImage3D(X,$,lt,St,it,y.depth,0,ut,K,null):e.texImage2D(X,$,lt,St,it,0,ut,K,null)}e.bindFramebuffer(s.FRAMEBUFFER,w),N(y)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,k,X,i.get(F).__webglTexture,0,S(y)):(X===s.TEXTURE_2D||X>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&X<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,k,X,i.get(F).__webglTexture,$),e.bindFramebuffer(s.FRAMEBUFFER,null)}function ct(w,y,F){if(s.bindRenderbuffer(s.RENDERBUFFER,w),y.depthBuffer&&!y.stencilBuffer){let k=r===!0?s.DEPTH_COMPONENT24:s.DEPTH_COMPONENT16;if(F||N(y)){const X=y.depthTexture;X&&X.isDepthTexture&&(X.type===Ei?k=s.DEPTH_COMPONENT32F:X.type===wi&&(k=s.DEPTH_COMPONENT24));const $=S(y);N(y)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,$,k,y.width,y.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,$,k,y.width,y.height)}else s.renderbufferStorage(s.RENDERBUFFER,k,y.width,y.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,w)}else if(y.depthBuffer&&y.stencilBuffer){const k=S(y);F&&N(y)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,k,s.DEPTH24_STENCIL8,y.width,y.height):N(y)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,k,s.DEPTH24_STENCIL8,y.width,y.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,y.width,y.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,w)}else{const k=y.isWebGLMultipleRenderTargets===!0?y.texture:[y.texture];for(let X=0;X<k.length;X++){const $=k[X],ut=o.convert($.format,$.colorSpace),K=o.convert($.type),lt=b($.internalFormat,ut,K,$.colorSpace),Mt=S(y);F&&N(y)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Mt,lt,y.width,y.height):N(y)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Mt,lt,y.width,y.height):s.renderbufferStorage(s.RENDERBUFFER,lt,y.width,y.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function wt(w,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,w),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(y.depthTexture).__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),B(y.depthTexture,0);const k=i.get(y.depthTexture).__webglTexture,X=S(y);if(y.depthTexture.format===Vi)N(y)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,k,0,X):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,k,0);else if(y.depthTexture.format===Sn)N(y)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,k,0,X):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,k,0);else throw new Error("Unknown depthTexture format")}function vt(w){const y=i.get(w),F=w.isWebGLCubeRenderTarget===!0;if(w.depthTexture&&!y.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");wt(y.__webglFramebuffer,w)}else if(F){y.__webglDepthbuffer=[];for(let k=0;k<6;k++)e.bindFramebuffer(s.FRAMEBUFFER,y.__webglFramebuffer[k]),y.__webglDepthbuffer[k]=s.createRenderbuffer(),ct(y.__webglDepthbuffer[k],w,!1)}else e.bindFramebuffer(s.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer=s.createRenderbuffer(),ct(y.__webglDepthbuffer,w,!1);e.bindFramebuffer(s.FRAMEBUFFER,null)}function Rt(w,y,F){const k=i.get(w);y!==void 0&&at(k.__webglFramebuffer,w,w.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),F!==void 0&&vt(w)}function V(w){const y=w.texture,F=i.get(w),k=i.get(y);w.addEventListener("dispose",P),w.isWebGLMultipleRenderTargets!==!0&&(k.__webglTexture===void 0&&(k.__webglTexture=s.createTexture()),k.__version=y.version,a.memory.textures++);const X=w.isWebGLCubeRenderTarget===!0,$=w.isWebGLMultipleRenderTargets===!0,ut=m(w)||r;if(X){F.__webglFramebuffer=[];for(let K=0;K<6;K++)if(r&&y.mipmaps&&y.mipmaps.length>0){F.__webglFramebuffer[K]=[];for(let lt=0;lt<y.mipmaps.length;lt++)F.__webglFramebuffer[K][lt]=s.createFramebuffer()}else F.__webglFramebuffer[K]=s.createFramebuffer()}else{if(r&&y.mipmaps&&y.mipmaps.length>0){F.__webglFramebuffer=[];for(let K=0;K<y.mipmaps.length;K++)F.__webglFramebuffer[K]=s.createFramebuffer()}else F.__webglFramebuffer=s.createFramebuffer();if($)if(n.drawBuffers){const K=w.texture;for(let lt=0,Mt=K.length;lt<Mt;lt++){const St=i.get(K[lt]);St.__webglTexture===void 0&&(St.__webglTexture=s.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(r&&w.samples>0&&N(w)===!1){const K=$?y:[y];F.__webglMultisampledFramebuffer=s.createFramebuffer(),F.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let lt=0;lt<K.length;lt++){const Mt=K[lt];F.__webglColorRenderbuffer[lt]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,F.__webglColorRenderbuffer[lt]);const St=o.convert(Mt.format,Mt.colorSpace),it=o.convert(Mt.type),Lt=b(Mt.internalFormat,St,it,Mt.colorSpace,w.isXRRenderTarget===!0),Ct=S(w);s.renderbufferStorageMultisample(s.RENDERBUFFER,Ct,Lt,w.width,w.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+lt,s.RENDERBUFFER,F.__webglColorRenderbuffer[lt])}s.bindRenderbuffer(s.RENDERBUFFER,null),w.depthBuffer&&(F.__webglDepthRenderbuffer=s.createRenderbuffer(),ct(F.__webglDepthRenderbuffer,w,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(X){e.bindTexture(s.TEXTURE_CUBE_MAP,k.__webglTexture),J(s.TEXTURE_CUBE_MAP,y,ut);for(let K=0;K<6;K++)if(r&&y.mipmaps&&y.mipmaps.length>0)for(let lt=0;lt<y.mipmaps.length;lt++)at(F.__webglFramebuffer[K][lt],w,y,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+K,lt);else at(F.__webglFramebuffer[K],w,y,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+K,0);A(y,ut)&&x(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if($){const K=w.texture;for(let lt=0,Mt=K.length;lt<Mt;lt++){const St=K[lt],it=i.get(St);e.bindTexture(s.TEXTURE_2D,it.__webglTexture),J(s.TEXTURE_2D,St,ut),at(F.__webglFramebuffer,w,St,s.COLOR_ATTACHMENT0+lt,s.TEXTURE_2D,0),A(St,ut)&&x(s.TEXTURE_2D)}e.unbindTexture()}else{let K=s.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(r?K=w.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(K,k.__webglTexture),J(K,y,ut),r&&y.mipmaps&&y.mipmaps.length>0)for(let lt=0;lt<y.mipmaps.length;lt++)at(F.__webglFramebuffer[lt],w,y,s.COLOR_ATTACHMENT0,K,lt);else at(F.__webglFramebuffer,w,y,s.COLOR_ATTACHMENT0,K,0);A(y,ut)&&x(K),e.unbindTexture()}w.depthBuffer&&vt(w)}function _t(w){const y=m(w)||r,F=w.isWebGLMultipleRenderTargets===!0?w.texture:[w.texture];for(let k=0,X=F.length;k<X;k++){const $=F[k];if(A($,y)){const ut=w.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,K=i.get($).__webglTexture;e.bindTexture(ut,K),x(ut),e.unbindTexture()}}}function ft(w){if(r&&w.samples>0&&N(w)===!1){const y=w.isWebGLMultipleRenderTargets?w.texture:[w.texture],F=w.width,k=w.height;let X=s.COLOR_BUFFER_BIT;const $=[],ut=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,K=i.get(w),lt=w.isWebGLMultipleRenderTargets===!0;if(lt)for(let Mt=0;Mt<y.length;Mt++)e.bindFramebuffer(s.FRAMEBUFFER,K.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Mt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,K.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Mt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,K.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,K.__webglFramebuffer);for(let Mt=0;Mt<y.length;Mt++){$.push(s.COLOR_ATTACHMENT0+Mt),w.depthBuffer&&$.push(ut);const St=K.__ignoreDepthValues!==void 0?K.__ignoreDepthValues:!1;if(St===!1&&(w.depthBuffer&&(X|=s.DEPTH_BUFFER_BIT),w.stencilBuffer&&(X|=s.STENCIL_BUFFER_BIT)),lt&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,K.__webglColorRenderbuffer[Mt]),St===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[ut]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[ut])),lt){const it=i.get(y[Mt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,it,0)}s.blitFramebuffer(0,0,F,k,0,0,F,k,X,s.NEAREST),c&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,$)}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),lt)for(let Mt=0;Mt<y.length;Mt++){e.bindFramebuffer(s.FRAMEBUFFER,K.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Mt,s.RENDERBUFFER,K.__webglColorRenderbuffer[Mt]);const St=i.get(y[Mt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,K.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Mt,s.TEXTURE_2D,St,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,K.__webglMultisampledFramebuffer)}}function S(w){return Math.min(n.maxSamples,w.samples)}function N(w){const y=i.get(w);return r&&w.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function q(w){const y=a.render.frame;h.get(w)!==y&&(h.set(w,y),w.update())}function j(w,y){const F=w.colorSpace,k=w.format,X=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||w.format===jo||F!==Mi&&F!==Ze&&(ne.getTransfer(F)===le?r===!1?t.has("EXT_sRGB")===!0&&k===ii?(w.format=jo,w.minFilter=De,w.generateMipmaps=!1):y=Pl.sRGBToLinear(y):(k!==ii||X!==Ai)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),y}this.allocateTextureUnit=C,this.resetTextureUnits=Z,this.setTexture2D=B,this.setTexture2DArray=O,this.setTexture3D=W,this.setTextureCube=et,this.rebindTextures=Rt,this.setupRenderTarget=V,this.updateRenderTargetMipmap=_t,this.updateMultisampleRenderTarget=ft,this.setupDepthRenderbuffer=vt,this.setupFrameBufferTexture=at,this.useMultisampledRTT=N}function h0(s,t,e){const i=e.isWebGL2;function n(o,a=Ze){let r;const l=ne.getTransfer(a);if(o===Ai)return s.UNSIGNED_BYTE;if(o===yl)return s.UNSIGNED_SHORT_4_4_4_4;if(o===vl)return s.UNSIGNED_SHORT_5_5_5_1;if(o===Dc)return s.BYTE;if(o===Uc)return s.SHORT;if(o===ea)return s.UNSIGNED_SHORT;if(o===_l)return s.INT;if(o===wi)return s.UNSIGNED_INT;if(o===Ei)return s.FLOAT;if(o===vn)return i?s.HALF_FLOAT:(r=t.get("OES_texture_half_float"),r!==null?r.HALF_FLOAT_OES:null);if(o===zc)return s.ALPHA;if(o===ii)return s.RGBA;if(o===Nc)return s.LUMINANCE;if(o===Fc)return s.LUMINANCE_ALPHA;if(o===Vi)return s.DEPTH_COMPONENT;if(o===Sn)return s.DEPTH_STENCIL;if(o===jo)return r=t.get("EXT_sRGB"),r!==null?r.SRGB_ALPHA_EXT:null;if(o===Bc)return s.RED;if(o===Sl)return s.RED_INTEGER;if(o===Oc)return s.RG;if(o===wl)return s.RG_INTEGER;if(o===El)return s.RGBA_INTEGER;if(o===js||o===Zs||o===Ks||o===Js)if(l===le)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(o===js)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(o===Zs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(o===Ks)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(o===Js)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(o===js)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(o===Zs)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(o===Ks)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(o===Js)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(o===va||o===Sa||o===wa||o===Ea)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(o===va)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(o===Sa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(o===wa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(o===Ea)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(o===bl)return r=t.get("WEBGL_compressed_texture_etc1"),r!==null?r.COMPRESSED_RGB_ETC1_WEBGL:null;if(o===ba||o===Ta)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(o===ba)return l===le?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(o===Ta)return l===le?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(o===Aa||o===Ca||o===Ra||o===Pa||o===La||o===Ia||o===Da||o===Ua||o===za||o===Na||o===Fa||o===Ba||o===Oa||o===Ga)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(o===Aa)return l===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(o===Ca)return l===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(o===Ra)return l===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(o===Pa)return l===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(o===La)return l===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(o===Ia)return l===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(o===Da)return l===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(o===Ua)return l===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(o===za)return l===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(o===Na)return l===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(o===Fa)return l===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(o===Ba)return l===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(o===Oa)return l===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(o===Ga)return l===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(o===Qs||o===ka||o===Va)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(o===Qs)return l===le?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(o===ka)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(o===Va)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(o===Gc||o===Ha||o===Wa||o===Xa)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(o===Qs)return r.COMPRESSED_RED_RGTC1_EXT;if(o===Ha)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(o===Wa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(o===Xa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return o===ki?i?s.UNSIGNED_INT_24_8:(r=t.get("WEBGL_depth_texture"),r!==null?r.UNSIGNED_INT_24_8_WEBGL:null):s[o]!==void 0?s[o]:null}return{convert:n}}class d0 extends Ue{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Vt extends ce{constructor(){super(),this.isGroup=!0,this.type="Group"}}const f0={type:"move"};class wo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Vt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Vt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Vt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let n=null,o=null,a=null;const r=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const M of t.hand.values()){const m=e.getJointPose(M,i),p=this._getHandJoint(c,M);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(o=e.getPose(t.gripSpace,i),o!==null&&(l.matrix.fromArray(o.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,o.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(o.linearVelocity)):l.hasLinearVelocity=!1,o.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(o.angularVelocity)):l.hasAngularVelocity=!1));r!==null&&(n=e.getPose(t.targetRaySpace,i),n===null&&o!==null&&(n=o),n!==null&&(r.matrix.fromArray(n.transform.matrix),r.matrix.decompose(r.position,r.rotation,r.scale),r.matrixWorldNeedsUpdate=!0,n.linearVelocity?(r.hasLinearVelocity=!0,r.linearVelocity.copy(n.linearVelocity)):r.hasLinearVelocity=!1,n.angularVelocity?(r.hasAngularVelocity=!0,r.angularVelocity.copy(n.angularVelocity)):r.hasAngularVelocity=!1,this.dispatchEvent(f0)))}return r!==null&&(r.visible=n!==null),l!==null&&(l.visible=o!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Vt;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}class u0 extends bn{constructor(t,e){super();const i=this;let n=null,o=1,a=null,r="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,g=null;const M=e.getContextAttributes();let m=null,p=null;const A=[],x=[],b=new Xt;let I=null;const T=new Ue;T.layers.enable(1),T.viewport=new he;const _=new Ue;_.layers.enable(2),_.viewport=new he;const P=[T,_],v=new d0;v.layers.enable(1),v.layers.enable(2);let E=null,L=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let ot=A[J];return ot===void 0&&(ot=new wo,A[J]=ot),ot.getTargetRaySpace()},this.getControllerGrip=function(J){let ot=A[J];return ot===void 0&&(ot=new wo,A[J]=ot),ot.getGripSpace()},this.getHand=function(J){let ot=A[J];return ot===void 0&&(ot=new wo,A[J]=ot),ot.getHandSpace()};function z(J){const ot=x.indexOf(J.inputSource);if(ot===-1)return;const gt=A[ot];gt!==void 0&&(gt.update(J.inputSource,J.frame,c||a),gt.dispatchEvent({type:J.type,data:J.inputSource}))}function Z(){n.removeEventListener("select",z),n.removeEventListener("selectstart",z),n.removeEventListener("selectend",z),n.removeEventListener("squeeze",z),n.removeEventListener("squeezestart",z),n.removeEventListener("squeezeend",z),n.removeEventListener("end",Z),n.removeEventListener("inputsourceschange",C);for(let J=0;J<A.length;J++){const ot=x[J];ot!==null&&(x[J]=null,A[J].disconnect(ot))}E=null,L=null,t.setRenderTarget(m),f=null,u=null,d=null,n=null,p=null,mt.stop(),i.isPresenting=!1,t.setPixelRatio(I),t.setSize(b.width,b.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){o=J,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){r=J,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return n},this.setSession=async function(J){if(n=J,n!==null){if(m=t.getRenderTarget(),n.addEventListener("select",z),n.addEventListener("selectstart",z),n.addEventListener("selectend",z),n.addEventListener("squeeze",z),n.addEventListener("squeezestart",z),n.addEventListener("squeezeend",z),n.addEventListener("end",Z),n.addEventListener("inputsourceschange",C),M.xrCompatible!==!0&&await e.makeXRCompatible(),I=t.getPixelRatio(),t.getSize(b),n.renderState.layers===void 0||t.capabilities.isWebGL2===!1){const ot={antialias:n.renderState.layers===void 0?M.antialias:!0,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:o};f=new XRWebGLLayer(n,e,ot),n.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),p=new Ri(f.framebufferWidth,f.framebufferHeight,{format:ii,type:Ai,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil})}else{let ot=null,gt=null,Q=null;M.depth&&(Q=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ot=M.stencil?Sn:Vi,gt=M.stencil?ki:wi);const at={colorFormat:e.RGBA8,depthFormat:Q,scaleFactor:o};d=new XRWebGLBinding(n,e),u=d.createProjectionLayer(at),n.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),p=new Ri(u.textureWidth,u.textureHeight,{format:ii,type:Ai,depthTexture:new Vl(u.textureWidth,u.textureHeight,gt,void 0,void 0,void 0,void 0,void 0,void 0,ot),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0});const ct=t.properties.get(p);ct.__ignoreDepthValues=u.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await n.requestReferenceSpace(r),mt.setContext(n),mt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode};function C(J){for(let ot=0;ot<J.removed.length;ot++){const gt=J.removed[ot],Q=x.indexOf(gt);Q>=0&&(x[Q]=null,A[Q].disconnect(gt))}for(let ot=0;ot<J.added.length;ot++){const gt=J.added[ot];let Q=x.indexOf(gt);if(Q===-1){for(let ct=0;ct<A.length;ct++)if(ct>=x.length){x.push(gt),Q=ct;break}else if(x[ct]===null){x[ct]=gt,Q=ct;break}if(Q===-1)break}const at=A[Q];at&&at.connect(gt)}}const D=new R,B=new R;function O(J,ot,gt){D.setFromMatrixPosition(ot.matrixWorld),B.setFromMatrixPosition(gt.matrixWorld);const Q=D.distanceTo(B),at=ot.projectionMatrix.elements,ct=gt.projectionMatrix.elements,wt=at[14]/(at[10]-1),vt=at[14]/(at[10]+1),Rt=(at[9]+1)/at[5],V=(at[9]-1)/at[5],_t=(at[8]-1)/at[0],ft=(ct[8]+1)/ct[0],S=wt*_t,N=wt*ft,q=Q/(-_t+ft),j=q*-_t;ot.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(j),J.translateZ(q),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert();const w=wt+q,y=vt+q,F=S-j,k=N+(Q-j),X=Rt*vt/y*w,$=V*vt/y*w;J.projectionMatrix.makePerspective(F,k,X,$,w,y),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}function W(J,ot){ot===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(ot.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(n===null)return;v.near=_.near=T.near=J.near,v.far=_.far=T.far=J.far,(E!==v.near||L!==v.far)&&(n.updateRenderState({depthNear:v.near,depthFar:v.far}),E=v.near,L=v.far);const ot=J.parent,gt=v.cameras;W(v,ot);for(let Q=0;Q<gt.length;Q++)W(gt[Q],ot);gt.length===2?O(v,T,_):v.projectionMatrix.copy(T.projectionMatrix),et(J,v,ot)};function et(J,ot,gt){gt===null?J.matrix.copy(ot.matrixWorld):(J.matrix.copy(gt.matrixWorld),J.matrix.invert(),J.matrix.multiply(ot.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(ot.projectionMatrix),J.projectionMatrixInverse.copy(ot.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=wn*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(J){l=J,u!==null&&(u.fixedFoveation=J),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=J)};let nt=null;function rt(J,ot){if(h=ot.getViewerPose(c||a),g=ot,h!==null){const gt=h.views;f!==null&&(t.setRenderTargetFramebuffer(p,f.framebuffer),t.setRenderTarget(p));let Q=!1;gt.length!==v.cameras.length&&(v.cameras.length=0,Q=!0);for(let at=0;at<gt.length;at++){const ct=gt[at];let wt=null;if(f!==null)wt=f.getViewport(ct);else{const Rt=d.getViewSubImage(u,ct);wt=Rt.viewport,at===0&&(t.setRenderTargetTextures(p,Rt.colorTexture,u.ignoreDepthValues?void 0:Rt.depthStencilTexture),t.setRenderTarget(p))}let vt=P[at];vt===void 0&&(vt=new Ue,vt.layers.enable(at),vt.viewport=new he,P[at]=vt),vt.matrix.fromArray(ct.transform.matrix),vt.matrix.decompose(vt.position,vt.quaternion,vt.scale),vt.projectionMatrix.fromArray(ct.projectionMatrix),vt.projectionMatrixInverse.copy(vt.projectionMatrix).invert(),vt.viewport.set(wt.x,wt.y,wt.width,wt.height),at===0&&(v.matrix.copy(vt.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),Q===!0&&v.cameras.push(vt)}}for(let gt=0;gt<A.length;gt++){const Q=x[gt],at=A[gt];Q!==null&&at!==void 0&&at.update(Q,ot,c||a)}nt&&nt(J,ot),ot.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ot}),g=null}const mt=new kl;mt.setAnimationLoop(rt),this.setAnimationLoop=function(J){nt=J},this.dispose=function(){}}}function p0(s,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,Bl(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function n(m,p,A,x,b){p.isMeshBasicMaterial||p.isMeshLambertMaterial?o(m,p):p.isMeshToonMaterial?(o(m,p),d(m,p)):p.isMeshPhongMaterial?(o(m,p),h(m,p)):p.isMeshStandardMaterial?(o(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,b)):p.isMeshMatcapMaterial?(o(m,p),g(m,p)):p.isMeshDepthMaterial?o(m,p):p.isMeshDistanceMaterial?(o(m,p),M(m,p)):p.isMeshNormalMaterial?o(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&r(m,p)):p.isPointsMaterial?l(m,p,A,x):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function o(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ne&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ne&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const A=t.get(p).envMap;if(A&&(m.envMap.value=A,m.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;const x=s._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*x,e(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function r(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,A,x){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*A,m.scale.value=x*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),t.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,A){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ne&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=A.texture,m.transmissionSamplerSize.value.set(A.width,A.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function M(m,p){const A=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(A.matrixWorld),m.nearDistance.value=A.shadow.camera.near,m.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function m0(s,t,e,i){let n={},o={},a=[];const r=e.isWebGL2?s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(A,x){const b=x.program;i.uniformBlockBinding(A,b)}function c(A,x){let b=n[A.id];b===void 0&&(g(A),b=h(A),n[A.id]=b,A.addEventListener("dispose",m));const I=x.program;i.updateUBOMapping(A,I);const T=t.render.frame;o[A.id]!==T&&(u(A),o[A.id]=T)}function h(A){const x=d();A.__bindingPointIndex=x;const b=s.createBuffer(),I=A.__size,T=A.usage;return s.bindBuffer(s.UNIFORM_BUFFER,b),s.bufferData(s.UNIFORM_BUFFER,I,T),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,x,b),b}function d(){for(let A=0;A<r;A++)if(a.indexOf(A)===-1)return a.push(A),A;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(A){const x=n[A.id],b=A.uniforms,I=A.__cache;s.bindBuffer(s.UNIFORM_BUFFER,x);for(let T=0,_=b.length;T<_;T++){const P=Array.isArray(b[T])?b[T]:[b[T]];for(let v=0,E=P.length;v<E;v++){const L=P[v];if(f(L,T,v,I)===!0){const z=L.__offset,Z=Array.isArray(L.value)?L.value:[L.value];let C=0;for(let D=0;D<Z.length;D++){const B=Z[D],O=M(B);typeof B=="number"||typeof B=="boolean"?(L.__data[0]=B,s.bufferSubData(s.UNIFORM_BUFFER,z+C,L.__data)):B.isMatrix3?(L.__data[0]=B.elements[0],L.__data[1]=B.elements[1],L.__data[2]=B.elements[2],L.__data[3]=0,L.__data[4]=B.elements[3],L.__data[5]=B.elements[4],L.__data[6]=B.elements[5],L.__data[7]=0,L.__data[8]=B.elements[6],L.__data[9]=B.elements[7],L.__data[10]=B.elements[8],L.__data[11]=0):(B.toArray(L.__data,C),C+=O.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,z,L.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(A,x,b,I){const T=A.value,_=x+"_"+b;if(I[_]===void 0)return typeof T=="number"||typeof T=="boolean"?I[_]=T:I[_]=T.clone(),!0;{const P=I[_];if(typeof T=="number"||typeof T=="boolean"){if(P!==T)return I[_]=T,!0}else if(P.equals(T)===!1)return P.copy(T),!0}return!1}function g(A){const x=A.uniforms;let b=0;const I=16;for(let _=0,P=x.length;_<P;_++){const v=Array.isArray(x[_])?x[_]:[x[_]];for(let E=0,L=v.length;E<L;E++){const z=v[E],Z=Array.isArray(z.value)?z.value:[z.value];for(let C=0,D=Z.length;C<D;C++){const B=Z[C],O=M(B),W=b%I;W!==0&&I-W<O.boundary&&(b+=I-W),z.__data=new Float32Array(O.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=b,b+=O.storage}}}const T=b%I;return T>0&&(b+=I-T),A.__size=b,A.__cache={},this}function M(A){const x={boundary:0,storage:0};return typeof A=="number"||typeof A=="boolean"?(x.boundary=4,x.storage=4):A.isVector2?(x.boundary=8,x.storage=8):A.isVector3||A.isColor?(x.boundary=16,x.storage=12):A.isVector4?(x.boundary=16,x.storage=16):A.isMatrix3?(x.boundary=48,x.storage=48):A.isMatrix4?(x.boundary=64,x.storage=64):A.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",A),x}function m(A){const x=A.target;x.removeEventListener("dispose",m);const b=a.indexOf(x.__bindingPointIndex);a.splice(b,1),s.deleteBuffer(n[x.id]),delete n[x.id],delete o[x.id]}function p(){for(const A in n)s.deleteBuffer(n[A]);a=[],n={},o={}}return{bind:l,update:c,dispose:p}}class $l{constructor(t={}){const{canvas:e=dh(),context:i=null,depth:n=!0,stencil:o=!0,alpha:a=!1,antialias:r=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1}=t;this.isWebGLRenderer=!0;let u;i!==null?u=i.getContextAttributes().alpha:u=a;const f=new Uint32Array(4),g=new Int32Array(4);let M=null,m=null;const p=[],A=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=we,this._useLegacyLights=!1,this.toneMapping=Ti,this.toneMappingExposure=1;const x=this;let b=!1,I=0,T=0,_=null,P=-1,v=null;const E=new he,L=new he;let z=null;const Z=new te(0);let C=0,D=e.width,B=e.height,O=1,W=null,et=null;const nt=new he(0,0,D,B),rt=new he(0,0,D,B);let mt=!1;const J=new Tn;let ot=!1,gt=!1,Q=null;const at=new se,ct=new Xt,wt=new R,vt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Rt(){return _===null?O:1}let V=i;function _t(U,st){for(let dt=0;dt<U.length;dt++){const pt=U[dt],ht=e.getContext(pt,st);if(ht!==null)return ht}return null}try{const U={alpha:!0,depth:n,stencil:o,antialias:r,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Qo}`),e.addEventListener("webglcontextlost",yt,!1),e.addEventListener("webglcontextrestored",G,!1),e.addEventListener("webglcontextcreationerror",At,!1),V===null){const st=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&st.shift(),V=_t(st,U),V===null)throw _t(st)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&V instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),V.getShaderPrecisionFormat===void 0&&(V.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(U){throw console.error("THREE.WebGLRenderer: "+U.message),U}let ft,S,N,q,j,w,y,F,k,X,$,ut,K,lt,Mt,St,it,Lt,Ct,Tt,Et,Pt,Y,xt;function Nt(){ft=new bu(V),S=new _u(V,ft,t),ft.init(S),Pt=new h0(V,ft,S),N=new l0(V,ft,S),q=new Cu(V),j=new $p,w=new c0(V,ft,N,j,S,Pt,q),y=new vu(x),F=new Eu(x),k=new zh(V,S),Y=new Mu(V,ft,k,S),X=new Tu(V,k,q,Y),$=new Iu(V,X,k,q),Ct=new Lu(V,S,w),St=new yu(j),ut=new Yp(x,y,F,ft,S,Y,St),K=new p0(x,j),lt=new Zp,Mt=new i0(ft,S),Lt=new gu(x,y,F,N,$,u,l),it=new r0(x,$,S),xt=new m0(V,q,S,N),Tt=new xu(V,ft,q,S),Et=new Au(V,ft,q,S),q.programs=ut.programs,x.capabilities=S,x.extensions=ft,x.properties=j,x.renderLists=lt,x.shadowMap=it,x.state=N,x.info=q}Nt();const Ut=new u0(x,V);this.xr=Ut,this.getContext=function(){return V},this.getContextAttributes=function(){return V.getContextAttributes()},this.forceContextLoss=function(){const U=ft.get("WEBGL_lose_context");U&&U.loseContext()},this.forceContextRestore=function(){const U=ft.get("WEBGL_lose_context");U&&U.restoreContext()},this.getPixelRatio=function(){return O},this.setPixelRatio=function(U){U!==void 0&&(O=U,this.setSize(D,B,!1))},this.getSize=function(U){return U.set(D,B)},this.setSize=function(U,st,dt=!0){if(Ut.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}D=U,B=st,e.width=Math.floor(U*O),e.height=Math.floor(st*O),dt===!0&&(e.style.width=U+"px",e.style.height=st+"px"),this.setViewport(0,0,U,st)},this.getDrawingBufferSize=function(U){return U.set(D*O,B*O).floor()},this.setDrawingBufferSize=function(U,st,dt){D=U,B=st,O=dt,e.width=Math.floor(U*dt),e.height=Math.floor(st*dt),this.setViewport(0,0,U,st)},this.getCurrentViewport=function(U){return U.copy(E)},this.getViewport=function(U){return U.copy(nt)},this.setViewport=function(U,st,dt,pt){U.isVector4?nt.set(U.x,U.y,U.z,U.w):nt.set(U,st,dt,pt),N.viewport(E.copy(nt).multiplyScalar(O).floor())},this.getScissor=function(U){return U.copy(rt)},this.setScissor=function(U,st,dt,pt){U.isVector4?rt.set(U.x,U.y,U.z,U.w):rt.set(U,st,dt,pt),N.scissor(L.copy(rt).multiplyScalar(O).floor())},this.getScissorTest=function(){return mt},this.setScissorTest=function(U){N.setScissorTest(mt=U)},this.setOpaqueSort=function(U){W=U},this.setTransparentSort=function(U){et=U},this.getClearColor=function(U){return U.copy(Lt.getClearColor())},this.setClearColor=function(){Lt.setClearColor.apply(Lt,arguments)},this.getClearAlpha=function(){return Lt.getClearAlpha()},this.setClearAlpha=function(){Lt.setClearAlpha.apply(Lt,arguments)},this.clear=function(U=!0,st=!0,dt=!0){let pt=0;if(U){let ht=!1;if(_!==null){const Ot=_.texture.format;ht=Ot===El||Ot===wl||Ot===Sl}if(ht){const Ot=_.texture.type,Gt=Ot===Ai||Ot===wi||Ot===ea||Ot===ki||Ot===yl||Ot===vl,Ht=Lt.getClearColor(),Wt=Lt.getClearAlpha(),Kt=Ht.r,Yt=Ht.g,jt=Ht.b;Gt?(f[0]=Kt,f[1]=Yt,f[2]=jt,f[3]=Wt,V.clearBufferuiv(V.COLOR,0,f)):(g[0]=Kt,g[1]=Yt,g[2]=jt,g[3]=Wt,V.clearBufferiv(V.COLOR,0,g))}else pt|=V.COLOR_BUFFER_BIT}st&&(pt|=V.DEPTH_BUFFER_BIT),dt&&(pt|=V.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V.clear(pt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",yt,!1),e.removeEventListener("webglcontextrestored",G,!1),e.removeEventListener("webglcontextcreationerror",At,!1),lt.dispose(),Mt.dispose(),j.dispose(),y.dispose(),F.dispose(),$.dispose(),Y.dispose(),xt.dispose(),ut.dispose(),Ut.dispose(),Ut.removeEventListener("sessionstart",ie),Ut.removeEventListener("sessionend",kt),Q&&(Q.dispose(),Q=null),re.stop()};function yt(U){U.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function G(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const U=q.autoReset,st=it.enabled,dt=it.autoUpdate,pt=it.needsUpdate,ht=it.type;Nt(),q.autoReset=U,it.enabled=st,it.autoUpdate=dt,it.needsUpdate=pt,it.type=ht}function At(U){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",U.statusMessage)}function bt(U){const st=U.target;st.removeEventListener("dispose",bt),It(st)}function It(U){Bt(U),j.remove(U)}function Bt(U){const st=j.get(U).programs;st!==void 0&&(st.forEach(function(dt){ut.releaseProgram(dt)}),U.isShaderMaterial&&ut.releaseShaderCache(U))}this.renderBufferDirect=function(U,st,dt,pt,ht,Ot){st===null&&(st=vt);const Gt=ht.isMesh&&ht.matrixWorld.determinant()<0,Ht=tc(U,st,dt,pt,ht);N.setMaterial(pt,Gt);let Wt=dt.index,Kt=1;if(pt.wireframe===!0){if(Wt=X.getWireframeAttribute(dt),Wt===void 0)return;Kt=2}const Yt=dt.drawRange,jt=dt.attributes.position;let pe=Yt.start*Kt,Oe=(Yt.start+Yt.count)*Kt;Ot!==null&&(pe=Math.max(pe,Ot.start*Kt),Oe=Math.min(Oe,(Ot.start+Ot.count)*Kt)),Wt!==null?(pe=Math.max(pe,0),Oe=Math.min(Oe,Wt.count)):jt!=null&&(pe=Math.max(pe,0),Oe=Math.min(Oe,jt.count));const ve=Oe-pe;if(ve<0||ve===1/0)return;Y.setup(ht,pt,Ht,dt,Wt);let ai,de=Tt;if(Wt!==null&&(ai=k.get(Wt),de=Et,de.setIndex(ai)),ht.isMesh)pt.wireframe===!0?(N.setLineWidth(pt.wireframeLinewidth*Rt()),de.setMode(V.LINES)):de.setMode(V.TRIANGLES);else if(ht.isLine){let Jt=pt.linewidth;Jt===void 0&&(Jt=1),N.setLineWidth(Jt*Rt()),ht.isLineSegments?de.setMode(V.LINES):ht.isLineLoop?de.setMode(V.LINE_LOOP):de.setMode(V.LINE_STRIP)}else ht.isPoints?de.setMode(V.POINTS):ht.isSprite&&de.setMode(V.TRIANGLES);if(ht.isBatchedMesh)de.renderMultiDraw(ht._multiDrawStarts,ht._multiDrawCounts,ht._multiDrawCount);else if(ht.isInstancedMesh)de.renderInstances(pe,ve,ht.count);else if(dt.isInstancedBufferGeometry){const Jt=dt._maxInstanceCount!==void 0?dt._maxInstanceCount:1/0,Ws=Math.min(dt.instanceCount,Jt);de.renderInstances(pe,ve,Ws)}else de.render(pe,ve)};function qt(U,st,dt){U.transparent===!0&&U.side===je&&U.forceSinglePass===!1?(U.side=Ne,U.needsUpdate=!0,Jn(U,st,dt),U.side=Ci,U.needsUpdate=!0,Jn(U,st,dt),U.side=je):Jn(U,st,dt)}this.compile=function(U,st,dt=null){dt===null&&(dt=U),m=Mt.get(dt),m.init(),A.push(m),dt.traverseVisible(function(ht){ht.isLight&&ht.layers.test(st.layers)&&(m.pushLight(ht),ht.castShadow&&m.pushShadow(ht))}),U!==dt&&U.traverseVisible(function(ht){ht.isLight&&ht.layers.test(st.layers)&&(m.pushLight(ht),ht.castShadow&&m.pushShadow(ht))}),m.setupLights(x._useLegacyLights);const pt=new Set;return U.traverse(function(ht){const Ot=ht.material;if(Ot)if(Array.isArray(Ot))for(let Gt=0;Gt<Ot.length;Gt++){const Ht=Ot[Gt];qt(Ht,dt,ht),pt.add(Ht)}else qt(Ot,dt,ht),pt.add(Ot)}),A.pop(),m=null,pt},this.compileAsync=function(U,st,dt=null){const pt=this.compile(U,st,dt);return new Promise(ht=>{function Ot(){if(pt.forEach(function(Gt){j.get(Gt).currentProgram.isReady()&&pt.delete(Gt)}),pt.size===0){ht(U);return}setTimeout(Ot,10)}ft.get("KHR_parallel_shader_compile")!==null?Ot():setTimeout(Ot,10)})};let zt=null;function $t(U){zt&&zt(U)}function ie(){re.stop()}function kt(){re.start()}const re=new kl;re.setAnimationLoop($t),typeof self<"u"&&re.setContext(self),this.setAnimationLoop=function(U){zt=U,Ut.setAnimationLoop(U),U===null?re.stop():re.start()},Ut.addEventListener("sessionstart",ie),Ut.addEventListener("sessionend",kt),this.render=function(U,st){if(st!==void 0&&st.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),st.parent===null&&st.matrixWorldAutoUpdate===!0&&st.updateMatrixWorld(),Ut.enabled===!0&&Ut.isPresenting===!0&&(Ut.cameraAutoUpdate===!0&&Ut.updateCamera(st),st=Ut.getCamera()),U.isScene===!0&&U.onBeforeRender(x,U,st,_),m=Mt.get(U,A.length),m.init(),A.push(m),at.multiplyMatrices(st.projectionMatrix,st.matrixWorldInverse),J.setFromProjectionMatrix(at),gt=this.localClippingEnabled,ot=St.init(this.clippingPlanes,gt),M=lt.get(U,p.length),M.init(),p.push(M),Be(U,st,0,x.sortObjects),M.finish(),x.sortObjects===!0&&M.sort(W,et),this.info.render.frame++,ot===!0&&St.beginShadows();const dt=m.state.shadowsArray;if(it.render(dt,U,st),ot===!0&&St.endShadows(),this.info.autoReset===!0&&this.info.reset(),Lt.render(M,U),m.setupLights(x._useLegacyLights),st.isArrayCamera){const pt=st.cameras;for(let ht=0,Ot=pt.length;ht<Ot;ht++){const Gt=pt[ht];Cn(M,U,Gt,Gt.viewport)}}else Cn(M,U,st);_!==null&&(w.updateMultisampleRenderTarget(_),w.updateRenderTargetMipmap(_)),U.isScene===!0&&U.onAfterRender(x,U,st),Y.resetDefaultState(),P=-1,v=null,A.pop(),A.length>0?m=A[A.length-1]:m=null,p.pop(),p.length>0?M=p[p.length-1]:M=null};function Be(U,st,dt,pt){if(U.visible===!1)return;if(U.layers.test(st.layers)){if(U.isGroup)dt=U.renderOrder;else if(U.isLOD)U.autoUpdate===!0&&U.update(st);else if(U.isLight)m.pushLight(U),U.castShadow&&m.pushShadow(U);else if(U.isSprite){if(!U.frustumCulled||J.intersectsSprite(U)){pt&&wt.setFromMatrixPosition(U.matrixWorld).applyMatrix4(at);const Gt=$.update(U),Ht=U.material;Ht.visible&&M.push(U,Gt,Ht,dt,wt.z,null)}}else if((U.isMesh||U.isLine||U.isPoints)&&(!U.frustumCulled||J.intersectsObject(U))){const Gt=$.update(U),Ht=U.material;if(pt&&(U.boundingSphere!==void 0?(U.boundingSphere===null&&U.computeBoundingSphere(),wt.copy(U.boundingSphere.center)):(Gt.boundingSphere===null&&Gt.computeBoundingSphere(),wt.copy(Gt.boundingSphere.center)),wt.applyMatrix4(U.matrixWorld).applyMatrix4(at)),Array.isArray(Ht)){const Wt=Gt.groups;for(let Kt=0,Yt=Wt.length;Kt<Yt;Kt++){const jt=Wt[Kt],pe=Ht[jt.materialIndex];pe&&pe.visible&&M.push(U,Gt,pe,dt,wt.z,jt)}}else Ht.visible&&M.push(U,Gt,Ht,dt,wt.z,null)}}const Ot=U.children;for(let Gt=0,Ht=Ot.length;Gt<Ht;Gt++)Be(Ot[Gt],st,dt,pt)}function Cn(U,st,dt,pt){const ht=U.opaque,Ot=U.transmissive,Gt=U.transparent;m.setupLightsView(dt),ot===!0&&St.setGlobalState(x.clippingPlanes,dt),Ot.length>0&&Zn(ht,Ot,st,dt),pt&&N.viewport(E.copy(pt)),ht.length>0&&Kn(ht,st,dt),Ot.length>0&&Kn(Ot,st,dt),Gt.length>0&&Kn(Gt,st,dt),N.buffers.depth.setTest(!0),N.buffers.depth.setMask(!0),N.buffers.color.setMask(!0),N.setPolygonOffset(!1)}function Zn(U,st,dt,pt){if((dt.isScene===!0?dt.overrideMaterial:null)!==null)return;const Ot=S.isWebGL2;Q===null&&(Q=new Ri(1,1,{generateMipmaps:!0,type:ft.has("EXT_color_buffer_half_float")?vn:Ai,minFilter:yn,samples:Ot?4:0})),x.getDrawingBufferSize(ct),Ot?Q.setSize(ct.x,ct.y):Q.setSize(Fs(ct.x),Fs(ct.y));const Gt=x.getRenderTarget();x.setRenderTarget(Q),x.getClearColor(Z),C=x.getClearAlpha(),C<1&&x.setClearColor(16777215,.5),x.clear();const Ht=x.toneMapping;x.toneMapping=Ti,Kn(U,dt,pt),w.updateMultisampleRenderTarget(Q),w.updateRenderTargetMipmap(Q);let Wt=!1;for(let Kt=0,Yt=st.length;Kt<Yt;Kt++){const jt=st[Kt],pe=jt.object,Oe=jt.geometry,ve=jt.material,ai=jt.group;if(ve.side===je&&pe.layers.test(pt.layers)){const de=ve.side;ve.side=Ne,ve.needsUpdate=!0,ha(pe,dt,pt,Oe,ve,ai),ve.side=de,ve.needsUpdate=!0,Wt=!0}}Wt===!0&&(w.updateMultisampleRenderTarget(Q),w.updateRenderTargetMipmap(Q)),x.setRenderTarget(Gt),x.setClearColor(Z,C),x.toneMapping=Ht}function Kn(U,st,dt){const pt=st.isScene===!0?st.overrideMaterial:null;for(let ht=0,Ot=U.length;ht<Ot;ht++){const Gt=U[ht],Ht=Gt.object,Wt=Gt.geometry,Kt=pt===null?Gt.material:pt,Yt=Gt.group;Ht.layers.test(dt.layers)&&ha(Ht,st,dt,Wt,Kt,Yt)}}function ha(U,st,dt,pt,ht,Ot){U.onBeforeRender(x,st,dt,pt,ht,Ot),U.modelViewMatrix.multiplyMatrices(dt.matrixWorldInverse,U.matrixWorld),U.normalMatrix.getNormalMatrix(U.modelViewMatrix),ht.onBeforeRender(x,st,dt,pt,U,Ot),ht.transparent===!0&&ht.side===je&&ht.forceSinglePass===!1?(ht.side=Ne,ht.needsUpdate=!0,x.renderBufferDirect(dt,st,pt,ht,U,Ot),ht.side=Ci,ht.needsUpdate=!0,x.renderBufferDirect(dt,st,pt,ht,U,Ot),ht.side=je):x.renderBufferDirect(dt,st,pt,ht,U,Ot),U.onAfterRender(x,st,dt,pt,ht,Ot)}function Jn(U,st,dt){st.isScene!==!0&&(st=vt);const pt=j.get(U),ht=m.state.lights,Ot=m.state.shadowsArray,Gt=ht.state.version,Ht=ut.getParameters(U,ht.state,Ot,st,dt),Wt=ut.getProgramCacheKey(Ht);let Kt=pt.programs;pt.environment=U.isMeshStandardMaterial?st.environment:null,pt.fog=st.fog,pt.envMap=(U.isMeshStandardMaterial?F:y).get(U.envMap||pt.environment),Kt===void 0&&(U.addEventListener("dispose",bt),Kt=new Map,pt.programs=Kt);let Yt=Kt.get(Wt);if(Yt!==void 0){if(pt.currentProgram===Yt&&pt.lightsStateVersion===Gt)return fa(U,Ht),Yt}else Ht.uniforms=ut.getUniforms(U),U.onBuild(dt,Ht,x),U.onBeforeCompile(Ht,x),Yt=ut.acquireProgram(Ht,Wt),Kt.set(Wt,Yt),pt.uniforms=Ht.uniforms;const jt=pt.uniforms;return(!U.isShaderMaterial&&!U.isRawShaderMaterial||U.clipping===!0)&&(jt.clippingPlanes=St.uniform),fa(U,Ht),pt.needsLights=ic(U),pt.lightsStateVersion=Gt,pt.needsLights&&(jt.ambientLightColor.value=ht.state.ambient,jt.lightProbe.value=ht.state.probe,jt.directionalLights.value=ht.state.directional,jt.directionalLightShadows.value=ht.state.directionalShadow,jt.spotLights.value=ht.state.spot,jt.spotLightShadows.value=ht.state.spotShadow,jt.rectAreaLights.value=ht.state.rectArea,jt.ltc_1.value=ht.state.rectAreaLTC1,jt.ltc_2.value=ht.state.rectAreaLTC2,jt.pointLights.value=ht.state.point,jt.pointLightShadows.value=ht.state.pointShadow,jt.hemisphereLights.value=ht.state.hemi,jt.directionalShadowMap.value=ht.state.directionalShadowMap,jt.directionalShadowMatrix.value=ht.state.directionalShadowMatrix,jt.spotShadowMap.value=ht.state.spotShadowMap,jt.spotLightMatrix.value=ht.state.spotLightMatrix,jt.spotLightMap.value=ht.state.spotLightMap,jt.pointShadowMap.value=ht.state.pointShadowMap,jt.pointShadowMatrix.value=ht.state.pointShadowMatrix),pt.currentProgram=Yt,pt.uniformsList=null,Yt}function da(U){if(U.uniformsList===null){const st=U.currentProgram.getUniforms();U.uniformsList=Rs.seqWithValue(st.seq,U.uniforms)}return U.uniformsList}function fa(U,st){const dt=j.get(U);dt.outputColorSpace=st.outputColorSpace,dt.batching=st.batching,dt.instancing=st.instancing,dt.instancingColor=st.instancingColor,dt.skinning=st.skinning,dt.morphTargets=st.morphTargets,dt.morphNormals=st.morphNormals,dt.morphColors=st.morphColors,dt.morphTargetsCount=st.morphTargetsCount,dt.numClippingPlanes=st.numClippingPlanes,dt.numIntersection=st.numClipIntersection,dt.vertexAlphas=st.vertexAlphas,dt.vertexTangents=st.vertexTangents,dt.toneMapping=st.toneMapping}function tc(U,st,dt,pt,ht){st.isScene!==!0&&(st=vt),w.resetTextureUnits();const Ot=st.fog,Gt=pt.isMeshStandardMaterial?st.environment:null,Ht=_===null?x.outputColorSpace:_.isXRRenderTarget===!0?_.texture.colorSpace:Mi,Wt=(pt.isMeshStandardMaterial?F:y).get(pt.envMap||Gt),Kt=pt.vertexColors===!0&&!!dt.attributes.color&&dt.attributes.color.itemSize===4,Yt=!!dt.attributes.tangent&&(!!pt.normalMap||pt.anisotropy>0),jt=!!dt.morphAttributes.position,pe=!!dt.morphAttributes.normal,Oe=!!dt.morphAttributes.color;let ve=Ti;pt.toneMapped&&(_===null||_.isXRRenderTarget===!0)&&(ve=x.toneMapping);const ai=dt.morphAttributes.position||dt.morphAttributes.normal||dt.morphAttributes.color,de=ai!==void 0?ai.length:0,Jt=j.get(pt),Ws=m.state.lights;if(ot===!0&&(gt===!0||U!==v)){const Xe=U===v&&pt.id===P;St.setState(pt,U,Xe)}let ue=!1;pt.version===Jt.__version?(Jt.needsLights&&Jt.lightsStateVersion!==Ws.state.version||Jt.outputColorSpace!==Ht||ht.isBatchedMesh&&Jt.batching===!1||!ht.isBatchedMesh&&Jt.batching===!0||ht.isInstancedMesh&&Jt.instancing===!1||!ht.isInstancedMesh&&Jt.instancing===!0||ht.isSkinnedMesh&&Jt.skinning===!1||!ht.isSkinnedMesh&&Jt.skinning===!0||ht.isInstancedMesh&&Jt.instancingColor===!0&&ht.instanceColor===null||ht.isInstancedMesh&&Jt.instancingColor===!1&&ht.instanceColor!==null||Jt.envMap!==Wt||pt.fog===!0&&Jt.fog!==Ot||Jt.numClippingPlanes!==void 0&&(Jt.numClippingPlanes!==St.numPlanes||Jt.numIntersection!==St.numIntersection)||Jt.vertexAlphas!==Kt||Jt.vertexTangents!==Yt||Jt.morphTargets!==jt||Jt.morphNormals!==pe||Jt.morphColors!==Oe||Jt.toneMapping!==ve||S.isWebGL2===!0&&Jt.morphTargetsCount!==de)&&(ue=!0):(ue=!0,Jt.__version=pt.version);let Pi=Jt.currentProgram;ue===!0&&(Pi=Jn(pt,st,ht));let ua=!1,Rn=!1,Xs=!1;const Te=Pi.getUniforms(),Li=Jt.uniforms;if(N.useProgram(Pi.program)&&(ua=!0,Rn=!0,Xs=!0),pt.id!==P&&(P=pt.id,Rn=!0),ua||v!==U){Te.setValue(V,"projectionMatrix",U.projectionMatrix),Te.setValue(V,"viewMatrix",U.matrixWorldInverse);const Xe=Te.map.cameraPosition;Xe!==void 0&&Xe.setValue(V,wt.setFromMatrixPosition(U.matrixWorld)),S.logarithmicDepthBuffer&&Te.setValue(V,"logDepthBufFC",2/(Math.log(U.far+1)/Math.LN2)),(pt.isMeshPhongMaterial||pt.isMeshToonMaterial||pt.isMeshLambertMaterial||pt.isMeshBasicMaterial||pt.isMeshStandardMaterial||pt.isShaderMaterial)&&Te.setValue(V,"isOrthographic",U.isOrthographicCamera===!0),v!==U&&(v=U,Rn=!0,Xs=!0)}if(ht.isSkinnedMesh){Te.setOptional(V,ht,"bindMatrix"),Te.setOptional(V,ht,"bindMatrixInverse");const Xe=ht.skeleton;Xe&&(S.floatVertexTextures?(Xe.boneTexture===null&&Xe.computeBoneTexture(),Te.setValue(V,"boneTexture",Xe.boneTexture,w)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}ht.isBatchedMesh&&(Te.setOptional(V,ht,"batchingTexture"),Te.setValue(V,"batchingTexture",ht._matricesTexture,w));const qs=dt.morphAttributes;if((qs.position!==void 0||qs.normal!==void 0||qs.color!==void 0&&S.isWebGL2===!0)&&Ct.update(ht,dt,Pi),(Rn||Jt.receiveShadow!==ht.receiveShadow)&&(Jt.receiveShadow=ht.receiveShadow,Te.setValue(V,"receiveShadow",ht.receiveShadow)),pt.isMeshGouraudMaterial&&pt.envMap!==null&&(Li.envMap.value=Wt,Li.flipEnvMap.value=Wt.isCubeTexture&&Wt.isRenderTargetTexture===!1?-1:1),Rn&&(Te.setValue(V,"toneMappingExposure",x.toneMappingExposure),Jt.needsLights&&ec(Li,Xs),Ot&&pt.fog===!0&&K.refreshFogUniforms(Li,Ot),K.refreshMaterialUniforms(Li,pt,O,B,Q),Rs.upload(V,da(Jt),Li,w)),pt.isShaderMaterial&&pt.uniformsNeedUpdate===!0&&(Rs.upload(V,da(Jt),Li,w),pt.uniformsNeedUpdate=!1),pt.isSpriteMaterial&&Te.setValue(V,"center",ht.center),Te.setValue(V,"modelViewMatrix",ht.modelViewMatrix),Te.setValue(V,"normalMatrix",ht.normalMatrix),Te.setValue(V,"modelMatrix",ht.matrixWorld),pt.isShaderMaterial||pt.isRawShaderMaterial){const Xe=pt.uniformsGroups;for(let Ys=0,nc=Xe.length;Ys<nc;Ys++)if(S.isWebGL2){const pa=Xe[Ys];xt.update(pa,Pi),xt.bind(pa,Pi)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Pi}function ec(U,st){U.ambientLightColor.needsUpdate=st,U.lightProbe.needsUpdate=st,U.directionalLights.needsUpdate=st,U.directionalLightShadows.needsUpdate=st,U.pointLights.needsUpdate=st,U.pointLightShadows.needsUpdate=st,U.spotLights.needsUpdate=st,U.spotLightShadows.needsUpdate=st,U.rectAreaLights.needsUpdate=st,U.hemisphereLights.needsUpdate=st}function ic(U){return U.isMeshLambertMaterial||U.isMeshToonMaterial||U.isMeshPhongMaterial||U.isMeshStandardMaterial||U.isShadowMaterial||U.isShaderMaterial&&U.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return _},this.setRenderTargetTextures=function(U,st,dt){j.get(U.texture).__webglTexture=st,j.get(U.depthTexture).__webglTexture=dt;const pt=j.get(U);pt.__hasExternalTextures=!0,pt.__hasExternalTextures&&(pt.__autoAllocateDepthBuffer=dt===void 0,pt.__autoAllocateDepthBuffer||ft.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),pt.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(U,st){const dt=j.get(U);dt.__webglFramebuffer=st,dt.__useDefaultFramebuffer=st===void 0},this.setRenderTarget=function(U,st=0,dt=0){_=U,I=st,T=dt;let pt=!0,ht=null,Ot=!1,Gt=!1;if(U){const Wt=j.get(U);Wt.__useDefaultFramebuffer!==void 0?(N.bindFramebuffer(V.FRAMEBUFFER,null),pt=!1):Wt.__webglFramebuffer===void 0?w.setupRenderTarget(U):Wt.__hasExternalTextures&&w.rebindTextures(U,j.get(U.texture).__webglTexture,j.get(U.depthTexture).__webglTexture);const Kt=U.texture;(Kt.isData3DTexture||Kt.isDataArrayTexture||Kt.isCompressedArrayTexture)&&(Gt=!0);const Yt=j.get(U).__webglFramebuffer;U.isWebGLCubeRenderTarget?(Array.isArray(Yt[st])?ht=Yt[st][dt]:ht=Yt[st],Ot=!0):S.isWebGL2&&U.samples>0&&w.useMultisampledRTT(U)===!1?ht=j.get(U).__webglMultisampledFramebuffer:Array.isArray(Yt)?ht=Yt[dt]:ht=Yt,E.copy(U.viewport),L.copy(U.scissor),z=U.scissorTest}else E.copy(nt).multiplyScalar(O).floor(),L.copy(rt).multiplyScalar(O).floor(),z=mt;if(N.bindFramebuffer(V.FRAMEBUFFER,ht)&&S.drawBuffers&&pt&&N.drawBuffers(U,ht),N.viewport(E),N.scissor(L),N.setScissorTest(z),Ot){const Wt=j.get(U.texture);V.framebufferTexture2D(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_CUBE_MAP_POSITIVE_X+st,Wt.__webglTexture,dt)}else if(Gt){const Wt=j.get(U.texture),Kt=st||0;V.framebufferTextureLayer(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,Wt.__webglTexture,dt||0,Kt)}P=-1},this.readRenderTargetPixels=function(U,st,dt,pt,ht,Ot,Gt){if(!(U&&U.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ht=j.get(U).__webglFramebuffer;if(U.isWebGLCubeRenderTarget&&Gt!==void 0&&(Ht=Ht[Gt]),Ht){N.bindFramebuffer(V.FRAMEBUFFER,Ht);try{const Wt=U.texture,Kt=Wt.format,Yt=Wt.type;if(Kt!==ii&&Pt.convert(Kt)!==V.getParameter(V.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const jt=Yt===vn&&(ft.has("EXT_color_buffer_half_float")||S.isWebGL2&&ft.has("EXT_color_buffer_float"));if(Yt!==Ai&&Pt.convert(Yt)!==V.getParameter(V.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Yt===Ei&&(S.isWebGL2||ft.has("OES_texture_float")||ft.has("WEBGL_color_buffer_float")))&&!jt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}st>=0&&st<=U.width-pt&&dt>=0&&dt<=U.height-ht&&V.readPixels(st,dt,pt,ht,Pt.convert(Kt),Pt.convert(Yt),Ot)}finally{const Wt=_!==null?j.get(_).__webglFramebuffer:null;N.bindFramebuffer(V.FRAMEBUFFER,Wt)}}},this.copyFramebufferToTexture=function(U,st,dt=0){const pt=Math.pow(2,-dt),ht=Math.floor(st.image.width*pt),Ot=Math.floor(st.image.height*pt);w.setTexture2D(st,0),V.copyTexSubImage2D(V.TEXTURE_2D,dt,0,0,U.x,U.y,ht,Ot),N.unbindTexture()},this.copyTextureToTexture=function(U,st,dt,pt=0){const ht=st.image.width,Ot=st.image.height,Gt=Pt.convert(dt.format),Ht=Pt.convert(dt.type);w.setTexture2D(dt,0),V.pixelStorei(V.UNPACK_FLIP_Y_WEBGL,dt.flipY),V.pixelStorei(V.UNPACK_PREMULTIPLY_ALPHA_WEBGL,dt.premultiplyAlpha),V.pixelStorei(V.UNPACK_ALIGNMENT,dt.unpackAlignment),st.isDataTexture?V.texSubImage2D(V.TEXTURE_2D,pt,U.x,U.y,ht,Ot,Gt,Ht,st.image.data):st.isCompressedTexture?V.compressedTexSubImage2D(V.TEXTURE_2D,pt,U.x,U.y,st.mipmaps[0].width,st.mipmaps[0].height,Gt,st.mipmaps[0].data):V.texSubImage2D(V.TEXTURE_2D,pt,U.x,U.y,Gt,Ht,st.image),pt===0&&dt.generateMipmaps&&V.generateMipmap(V.TEXTURE_2D),N.unbindTexture()},this.copyTextureToTexture3D=function(U,st,dt,pt,ht=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Ot=U.max.x-U.min.x+1,Gt=U.max.y-U.min.y+1,Ht=U.max.z-U.min.z+1,Wt=Pt.convert(pt.format),Kt=Pt.convert(pt.type);let Yt;if(pt.isData3DTexture)w.setTexture3D(pt,0),Yt=V.TEXTURE_3D;else if(pt.isDataArrayTexture||pt.isCompressedArrayTexture)w.setTexture2DArray(pt,0),Yt=V.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}V.pixelStorei(V.UNPACK_FLIP_Y_WEBGL,pt.flipY),V.pixelStorei(V.UNPACK_PREMULTIPLY_ALPHA_WEBGL,pt.premultiplyAlpha),V.pixelStorei(V.UNPACK_ALIGNMENT,pt.unpackAlignment);const jt=V.getParameter(V.UNPACK_ROW_LENGTH),pe=V.getParameter(V.UNPACK_IMAGE_HEIGHT),Oe=V.getParameter(V.UNPACK_SKIP_PIXELS),ve=V.getParameter(V.UNPACK_SKIP_ROWS),ai=V.getParameter(V.UNPACK_SKIP_IMAGES),de=dt.isCompressedTexture?dt.mipmaps[ht]:dt.image;V.pixelStorei(V.UNPACK_ROW_LENGTH,de.width),V.pixelStorei(V.UNPACK_IMAGE_HEIGHT,de.height),V.pixelStorei(V.UNPACK_SKIP_PIXELS,U.min.x),V.pixelStorei(V.UNPACK_SKIP_ROWS,U.min.y),V.pixelStorei(V.UNPACK_SKIP_IMAGES,U.min.z),dt.isDataTexture||dt.isData3DTexture?V.texSubImage3D(Yt,ht,st.x,st.y,st.z,Ot,Gt,Ht,Wt,Kt,de.data):dt.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),V.compressedTexSubImage3D(Yt,ht,st.x,st.y,st.z,Ot,Gt,Ht,Wt,de.data)):V.texSubImage3D(Yt,ht,st.x,st.y,st.z,Ot,Gt,Ht,Wt,Kt,de),V.pixelStorei(V.UNPACK_ROW_LENGTH,jt),V.pixelStorei(V.UNPACK_IMAGE_HEIGHT,pe),V.pixelStorei(V.UNPACK_SKIP_PIXELS,Oe),V.pixelStorei(V.UNPACK_SKIP_ROWS,ve),V.pixelStorei(V.UNPACK_SKIP_IMAGES,ai),ht===0&&pt.generateMipmaps&&V.generateMipmap(Yt),N.unbindTexture()},this.initTexture=function(U){U.isCubeTexture?w.setTextureCube(U,0):U.isData3DTexture?w.setTexture3D(U,0):U.isDataArrayTexture||U.isCompressedArrayTexture?w.setTexture2DArray(U,0):w.setTexture2D(U,0),N.unbindTexture()},this.resetState=function(){I=0,T=0,_=null,N.reset(),Y.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return pi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===ia?"display-p3":"srgb",e.unpackColorSpace=ne.workingColorSpace===Vs?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===we?Hi:Tl}set outputEncoding(t){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=t===Hi?we:Mi}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}}class g0 extends $l{}g0.prototype.isWebGL1Renderer=!0;class ra{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new te(t),this.density=e}clone(){return new ra(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class M0 extends ce{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e}}class x0{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=$o,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=gi()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let n=0,o=this.stride;n<o;n++)this.array[t+n]=e.array[i+n];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=gi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=gi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Pe=new R;class Gs{constructor(t,e,i,n=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=n}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)Pe.fromBufferAttribute(this,e),Pe.applyMatrix4(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Pe.fromBufferAttribute(this,e),Pe.applyNormalMatrix(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Pe.fromBufferAttribute(this,e),Pe.transformDirection(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}setX(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=si(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=si(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=si(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=si(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=ae(e,this.array),i=ae(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ae(e,this.array),i=ae(i,this.array),n=ae(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=n,this}setXYZW(t,e,i,n,o){return t=t*this.data.stride+this.offset,this.normalized&&(e=ae(e,this.array),i=ae(i,this.array),n=ae(n,this.array),o=ae(o,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=n,this.data.array[t+3]=o,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)e.push(this.data.array[n+o])}return new Ke(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Gs(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)e.push(this.data.array[n+o])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class $e extends Xi{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new te(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let cn;const Un=new R,hn=new R,dn=new R,fn=new Xt,zn=new Xt,jl=new se,vs=new R,Nn=new R,Ss=new R,Dr=new Xt,Eo=new Xt,Ur=new Xt;class ze extends ce{constructor(t=new $e){if(super(),this.isSprite=!0,this.type="Sprite",cn===void 0){cn=new We;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new x0(e,5);cn.setIndex([0,1,2,0,2,3]),cn.setAttribute("position",new Gs(i,3,0,!1)),cn.setAttribute("uv",new Gs(i,2,3,!1))}this.geometry=cn,this.material=t,this.center=new Xt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),hn.setFromMatrixScale(this.matrixWorld),jl.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),dn.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&hn.multiplyScalar(-dn.z);const i=this.material.rotation;let n,o;i!==0&&(o=Math.cos(i),n=Math.sin(i));const a=this.center;ws(vs.set(-.5,-.5,0),dn,a,hn,n,o),ws(Nn.set(.5,-.5,0),dn,a,hn,n,o),ws(Ss.set(.5,.5,0),dn,a,hn,n,o),Dr.set(0,0),Eo.set(1,0),Ur.set(1,1);let r=t.ray.intersectTriangle(vs,Nn,Ss,!1,Un);if(r===null&&(ws(Nn.set(-.5,.5,0),dn,a,hn,n,o),Eo.set(0,1),r=t.ray.intersectTriangle(vs,Ss,Nn,!1,Un),r===null))return;const l=t.ray.origin.distanceTo(Un);l<t.near||l>t.far||e.push({distance:l,point:Un.clone(),uv:Ye.getInterpolation(Un,vs,Nn,Ss,Dr,Eo,Ur,new Xt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function ws(s,t,e,i,n,o){fn.subVectors(s,e).addScalar(.5).multiply(i),n!==void 0?(zn.x=o*fn.x-n*fn.y,zn.y=n*fn.x+o*fn.y):zn.copy(fn),s.copy(t),s.x+=zn.x,s.y+=zn.y,s.applyMatrix4(jl)}const Es=new R,zr=new R;class Nr extends ce{constructor(){super(),this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]},isLOD:{value:!0}}),this.autoUpdate=!0}copy(t){super.copy(t,!1);const e=t.levels;for(let i=0,n=e.length;i<n;i++){const o=e[i];this.addLevel(o.object.clone(),o.distance,o.hysteresis)}return this.autoUpdate=t.autoUpdate,this}addLevel(t,e=0,i=0){e=Math.abs(e);const n=this.levels;let o;for(o=0;o<n.length&&!(e<n[o].distance);o++);return n.splice(o,0,{distance:e,hysteresis:i,object:t}),this.add(t),this}getCurrentLevel(){return this._currentLevel}getObjectForDistance(t){const e=this.levels;if(e.length>0){let i,n;for(i=1,n=e.length;i<n;i++){let o=e[i].distance;if(e[i].object.visible&&(o-=o*e[i].hysteresis),t<o)break}return e[i-1].object}return null}raycast(t,e){if(this.levels.length>0){Es.setFromMatrixPosition(this.matrixWorld);const n=t.ray.origin.distanceTo(Es);this.getObjectForDistance(n).raycast(t,e)}}update(t){const e=this.levels;if(e.length>1){Es.setFromMatrixPosition(t.matrixWorld),zr.setFromMatrixPosition(this.matrixWorld);const i=Es.distanceTo(zr)/t.zoom;e[0].object.visible=!0;let n,o;for(n=1,o=e.length;n<o;n++){let a=e[n].distance;if(e[n].object.visible&&(a-=a*e[n].hysteresis),i>=a)e[n-1].object.visible=!1,e[n].object.visible=!0;else break}for(this._currentLevel=n-1;n<o;n++)e[n].object.visible=!1}}toJSON(t){const e=super.toJSON(t);this.autoUpdate===!1&&(e.object.autoUpdate=!1),e.object.levels=[];const i=this.levels;for(let n=0,o=i.length;n<o;n++){const a=i[n];e.object.levels.push({object:a.object.uuid,distance:a.distance,hysteresis:a.hysteresis})}return e}}class Zl extends Xi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new te(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Fr=new R,Br=new R,Or=new se,bo=new Dl,bs=new qn;class _0 extends ce{constructor(t=new We,e=new Zl){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let n=1,o=e.count;n<o;n++)Fr.fromBufferAttribute(e,n-1),Br.fromBufferAttribute(e,n),i[n]=i[n-1],i[n]+=Fr.distanceTo(Br);t.setAttribute("lineDistance",new He(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,n=this.matrixWorld,o=t.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),bs.copy(i.boundingSphere),bs.applyMatrix4(n),bs.radius+=o,t.ray.intersectsSphere(bs)===!1)return;Or.copy(n).invert(),bo.copy(t.ray).applyMatrix4(Or);const r=o/((this.scale.x+this.scale.y+this.scale.z)/3),l=r*r,c=new R,h=new R,d=new R,u=new R,f=this.isLineSegments?2:1,g=i.index,m=i.attributes.position;if(g!==null){const p=Math.max(0,a.start),A=Math.min(g.count,a.start+a.count);for(let x=p,b=A-1;x<b;x+=f){const I=g.getX(x),T=g.getX(x+1);if(c.fromBufferAttribute(m,I),h.fromBufferAttribute(m,T),bo.distanceSqToSegment(c,h,u,d)>l)continue;u.applyMatrix4(this.matrixWorld);const P=t.ray.origin.distanceTo(u);P<t.near||P>t.far||e.push({distance:P,point:d.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}else{const p=Math.max(0,a.start),A=Math.min(m.count,a.start+a.count);for(let x=p,b=A-1;x<b;x+=f){if(c.fromBufferAttribute(m,x),h.fromBufferAttribute(m,x+1),bo.distanceSqToSegment(c,h,u,d)>l)continue;u.applyMatrix4(this.matrixWorld);const T=t.ray.origin.distanceTo(u);T<t.near||T>t.far||e.push({distance:T,point:d.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,a=n.length;o<a;o++){const r=n[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[r]=o}}}}}class Re extends Fe{constructor(t,e,i,n,o,a,r,l,c){super(t,e,i,n,o,a,r,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class y0{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,n=this.getPoint(0),o=0;e.push(0);for(let a=1;a<=t;a++)i=this.getPoint(a/t),o+=i.distanceTo(n),e.push(o),n=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const i=this.getLengths();let n=0;const o=i.length;let a;e?a=e:a=t*i[o-1];let r=0,l=o-1,c;for(;r<=l;)if(n=Math.floor(r+(l-r)/2),c=i[n]-a,c<0)r=n+1;else if(c>0)l=n-1;else{l=n;break}if(n=l,i[n]===a)return n/(o-1);const h=i[n],u=i[n+1]-h,f=(a-h)/u;return(n+f)/(o-1)}getTangent(t,e){let n=t-1e-4,o=t+1e-4;n<0&&(n=0),o>1&&(o=1);const a=this.getPoint(n),r=this.getPoint(o),l=e||(a.isVector2?new Xt:new R);return l.copy(r).sub(a).normalize(),l}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e){const i=new R,n=[],o=[],a=[],r=new R,l=new se;for(let f=0;f<=t;f++){const g=f/t;n[f]=this.getTangentAt(g,new R)}o[0]=new R,a[0]=new R;let c=Number.MAX_VALUE;const h=Math.abs(n[0].x),d=Math.abs(n[0].y),u=Math.abs(n[0].z);h<=c&&(c=h,i.set(1,0,0)),d<=c&&(c=d,i.set(0,1,0)),u<=c&&i.set(0,0,1),r.crossVectors(n[0],i).normalize(),o[0].crossVectors(n[0],r),a[0].crossVectors(n[0],o[0]);for(let f=1;f<=t;f++){if(o[f]=o[f-1].clone(),a[f]=a[f-1].clone(),r.crossVectors(n[f-1],n[f]),r.length()>Number.EPSILON){r.normalize();const g=Math.acos(be(n[f-1].dot(n[f]),-1,1));o[f].applyMatrix4(l.makeRotationAxis(r,g))}a[f].crossVectors(n[f],o[f])}if(e===!0){let f=Math.acos(be(o[0].dot(o[t]),-1,1));f/=t,n[0].dot(r.crossVectors(o[0],o[t]))>0&&(f=-f);for(let g=1;g<=t;g++)o[g].applyMatrix4(l.makeRotationAxis(n[g],f*g)),a[g].crossVectors(n[g],o[g])}return{tangents:n,normals:o,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}function la(){let s=0,t=0,e=0,i=0;function n(o,a,r,l){s=o,t=r,e=-3*o+3*a-2*r-l,i=2*o-2*a+r+l}return{initCatmullRom:function(o,a,r,l,c){n(a,r,c*(r-o),c*(l-a))},initNonuniformCatmullRom:function(o,a,r,l,c,h,d){let u=(a-o)/c-(r-o)/(c+h)+(r-a)/h,f=(r-a)/h-(l-a)/(h+d)+(l-r)/d;u*=h,f*=h,n(a,r,u,f)},calc:function(o){const a=o*o,r=a*o;return s+t*o+e*a+i*r}}}const Ts=new R,To=new la,Ao=new la,Co=new la;class v0 extends y0{constructor(t=[],e=!1,i="centripetal",n=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=n}getPoint(t,e=new R){const i=e,n=this.points,o=n.length,a=(o-(this.closed?0:1))*t;let r=Math.floor(a),l=a-r;this.closed?r+=r>0?0:(Math.floor(Math.abs(r)/o)+1)*o:l===0&&r===o-1&&(r=o-2,l=1);let c,h;this.closed||r>0?c=n[(r-1)%o]:(Ts.subVectors(n[0],n[1]).add(n[0]),c=Ts);const d=n[r%o],u=n[(r+1)%o];if(this.closed||r+2<o?h=n[(r+2)%o]:(Ts.subVectors(n[o-1],n[o-2]).add(n[o-1]),h=Ts),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(d),f),M=Math.pow(d.distanceToSquared(u),f),m=Math.pow(u.distanceToSquared(h),f);M<1e-4&&(M=1),g<1e-4&&(g=M),m<1e-4&&(m=M),To.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,g,M,m),Ao.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,g,M,m),Co.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,g,M,m)}else this.curveType==="catmullrom"&&(To.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),Ao.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),Co.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return i.set(To.calc(l),Ao.calc(l),Co.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const n=t.points[e];this.points.push(n.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const n=this.points[e];t.points.push(n.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const n=t.points[e];this.points.push(new R().fromArray(n))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}class Wi extends We{constructor(t=1,e=1,i=1,n=32,o=1,a=!1,r=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:n,heightSegments:o,openEnded:a,thetaStart:r,thetaLength:l};const c=this;n=Math.floor(n),o=Math.floor(o);const h=[],d=[],u=[],f=[];let g=0;const M=[],m=i/2;let p=0;A(),a===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new He(d,3)),this.setAttribute("normal",new He(u,3)),this.setAttribute("uv",new He(f,2));function A(){const b=new R,I=new R;let T=0;const _=(e-t)/i;for(let P=0;P<=o;P++){const v=[],E=P/o,L=E*(e-t)+t;for(let z=0;z<=n;z++){const Z=z/n,C=Z*l+r,D=Math.sin(C),B=Math.cos(C);I.x=L*D,I.y=-E*i+m,I.z=L*B,d.push(I.x,I.y,I.z),b.set(D,_,B).normalize(),u.push(b.x,b.y,b.z),f.push(Z,1-E),v.push(g++)}M.push(v)}for(let P=0;P<n;P++)for(let v=0;v<o;v++){const E=M[v][P],L=M[v+1][P],z=M[v+1][P+1],Z=M[v][P+1];h.push(E,L,Z),h.push(L,z,Z),T+=6}c.addGroup(p,T,0),p+=T}function x(b){const I=g,T=new Xt,_=new R;let P=0;const v=b===!0?t:e,E=b===!0?1:-1;for(let z=1;z<=n;z++)d.push(0,m*E,0),u.push(0,E,0),f.push(.5,.5),g++;const L=g;for(let z=0;z<=n;z++){const C=z/n*l+r,D=Math.cos(C),B=Math.sin(C);_.x=v*B,_.y=m*E,_.z=v*D,d.push(_.x,_.y,_.z),u.push(0,E,0),T.x=D*.5+.5,T.y=B*.5*E+.5,f.push(T.x,T.y),g++}for(let z=0;z<n;z++){const Z=I+z,C=L+z;b===!0?h.push(C,C+1,Z):h.push(C+1,C,Z),P+=3}c.addGroup(p,P,b===!0?1:2),p+=P}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wi(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Wn extends Wi{constructor(t=1,e=1,i=32,n=1,o=!1,a=0,r=Math.PI*2){super(0,t,e,i,n,o,a,r),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:n,openEnded:o,thetaStart:a,thetaLength:r}}static fromJSON(t){return new Wn(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class S0 extends oi{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Ft extends Xi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new te(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new te(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Al,this.normalScale=new Xt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class $n extends ce{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new te(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}class w0 extends $n{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ce.DEFAULT_UP),this.updateMatrix(),this.groundColor=new te(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Ro=new se,Gr=new R,kr=new R;class ca{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Xt(512,512),this.map=null,this.mapPass=null,this.matrix=new se,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Tn,this._frameExtents=new Xt(1,1),this._viewportCount=1,this._viewports=[new he(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;Gr.setFromMatrixPosition(t.matrixWorld),e.position.copy(Gr),kr.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(kr),e.updateMatrixWorld(),Ro.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ro),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Ro)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class E0 extends ca{constructor(){super(new Ue(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){const e=this.camera,i=wn*2*t.angle*this.focus,n=this.mapSize.width/this.mapSize.height,o=t.distance||e.far;(i!==e.fov||n!==e.aspect||o!==e.far)&&(e.fov=i,e.aspect=n,e.far=o,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class Vr extends $n{constructor(t,e,i=0,n=Math.PI/3,o=0,a=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ce.DEFAULT_UP),this.updateMatrix(),this.target=new ce,this.distance=i,this.angle=n,this.penumbra=o,this.decay=a,this.map=null,this.shadow=new E0}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const Hr=new se,Fn=new R,Po=new R;class b0 extends ca{constructor(){super(new Ue(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Xt(4,2),this._viewportCount=6,this._viewports=[new he(2,1,1,1),new he(0,1,1,1),new he(3,1,1,1),new he(1,1,1,1),new he(3,0,1,1),new he(1,0,1,1)],this._cubeDirections=[new R(1,0,0),new R(-1,0,0),new R(0,0,1),new R(0,0,-1),new R(0,1,0),new R(0,-1,0)],this._cubeUps=[new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,0,1),new R(0,0,-1)]}updateMatrices(t,e=0){const i=this.camera,n=this.matrix,o=t.distance||i.far;o!==i.far&&(i.far=o,i.updateProjectionMatrix()),Fn.setFromMatrixPosition(t.matrixWorld),i.position.copy(Fn),Po.copy(i.position),Po.add(this._cubeDirections[e]),i.up.copy(this._cubeUps[e]),i.lookAt(Po),i.updateMatrixWorld(),n.makeTranslation(-Fn.x,-Fn.y,-Fn.z),Hr.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Hr)}}class Ps extends $n{constructor(t,e,i=0,n=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=n,this.shadow=new b0}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class T0 extends ca{constructor(){super(new oa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class A0 extends $n{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ce.DEFAULT_UP),this.updateMatrix(),this.target=new ce,this.shadow=new T0}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class C0 extends $n{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class Kl{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Wr(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Wr();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Wr(){return(typeof performance>"u"?Date:performance).now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Qo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Qo);function ee(s,t=!1){const e=s[0].index!==null,i=new Set(Object.keys(s[0].attributes)),n=new Set(Object.keys(s[0].morphAttributes)),o={},a={},r=s[0].morphTargetsRelative,l=new We;let c=0;for(let h=0;h<s.length;++h){const d=s[h];let u=0;if(e!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in d.attributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;o[f]===void 0&&(o[f]=[]),o[f].push(d.attributes[f]),u++}if(u!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(r!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in d.morphAttributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(d.morphAttributes[f])}if(t){let f;if(e)f=d.index.count;else if(d.attributes.position!==void 0)f=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(e){let h=0;const d=[];for(let u=0;u<s.length;++u){const f=s[u].index;for(let g=0;g<f.count;++g)d.push(f.getX(g)+h);h+=s[u].attributes.position.count}l.setIndex(d)}for(const h in o){const d=Xr(o[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,d)}for(const h in a){const d=a[h][0].length;if(d===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let u=0;u<d;++u){const f=[];for(let M=0;M<a[h].length;++M)f.push(a[h][M][u]);const g=Xr(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}return l}function Xr(s){let t,e,i,n=-1,o=0;for(let c=0;c<s.length;++c){const h=s[c];if(h.isInterleavedBufferAttribute)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. InterleavedBufferAttributes are not supported."),null;if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=h.normalized),i!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(n===-1&&(n=h.gpuType),n!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;o+=h.array.length}const a=new t(o);let r=0;for(let c=0;c<s.length;++c)a.set(s[c].array,r),r+=s[c].array.length;const l=new Ke(a,e,i);return n!==void 0&&(l.gpuType=n),l}const R0={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class jn{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const P0=new oa(-1,1,1,-1,0,1);class L0 extends We{constructor(){super(),this.setAttribute("position",new He([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new He([0,2,0,0,2,0],2))}}const I0=new L0;class Jl{constructor(t){this._mesh=new tt(I0,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,P0)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class D0 extends jn{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof oi?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=sa.clone(t.uniforms),this.material=new oi({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new Jl(this.material)}render(t,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class qr extends jn{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,i){const n=t.getContext(),o=t.state;o.buffers.color.setMask(!1),o.buffers.depth.setMask(!1),o.buffers.color.setLocked(!0),o.buffers.depth.setLocked(!0);let a,r;this.inverse?(a=0,r=1):(a=1,r=0),o.buffers.stencil.setTest(!0),o.buffers.stencil.setOp(n.REPLACE,n.REPLACE,n.REPLACE),o.buffers.stencil.setFunc(n.ALWAYS,a,4294967295),o.buffers.stencil.setClear(r),o.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),o.buffers.color.setLocked(!1),o.buffers.depth.setLocked(!1),o.buffers.color.setMask(!0),o.buffers.depth.setMask(!0),o.buffers.stencil.setLocked(!1),o.buffers.stencil.setFunc(n.EQUAL,1,4294967295),o.buffers.stencil.setOp(n.KEEP,n.KEEP,n.KEEP),o.buffers.stencil.setLocked(!0)}}class U0 extends jn{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class z0{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const i=t.getSize(new Xt);this._width=i.width,this._height=i.height,e=new Ri(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:vn}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new D0(R0),this.copyPass.material.blending=mi,this.clock=new Kl}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let i=!1;for(let n=0,o=this.passes.length;n<o;n++){const a=this.passes[n];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(n),a.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),a.needsSwap){if(i){const r=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(r.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(r.EQUAL,1,4294967295)}this.swapBuffers()}qr!==void 0&&(a instanceof qr?i=!0:a instanceof U0&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new Xt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const i=this._width*this._pixelRatio,n=this._height*this._pixelRatio;this.renderTarget1.setSize(i,n),this.renderTarget2.setSize(i,n);for(let o=0;o<this.passes.length;o++)this.passes[o].setSize(i,n)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class N0 extends jn{constructor(t,e,i=null,n=null,o=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=i,this.clearColor=n,this.clearAlpha=o,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new te}render(t,e,i){const n=t.autoClear;t.autoClear=!1;let o,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor)),this.clearAlpha!==null&&(o=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(o),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),t.autoClear=n}}const F0={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = OptimizedCineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class B0 extends jn{constructor(){super();const t=F0;this.uniforms=sa.clone(t.uniforms),this.material=new S0({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new Jl(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},ne.getTransfer(this._outputColorSpace)===le&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===pl?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===ml?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===gl?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===ta?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Ml&&(this.material.defines.AGX_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}function O0(){const s=document.createElement("canvas");s.width=64,s.height=64;const t=s.getContext("2d"),e=t.createRadialGradient(32,32,0,32,32,30);return e.addColorStop(0,"rgba(255, 250, 220, 1)"),e.addColorStop(.15,"rgba(255, 180, 50, 0.8)"),e.addColorStop(.4,"rgba(255, 100, 20, 0.2)"),e.addColorStop(1,"rgba(0, 0, 0, 0)"),t.fillStyle=e,t.fillRect(0,0,64,64),t.strokeStyle="rgba(255, 200, 150, 0.45)",t.lineWidth=2.5,t.beginPath(),t.moveTo(0,32),t.lineTo(64,32),t.stroke(),new Re(s)}function G0(){const s=document.createElement("canvas");s.width=64,s.height=64;const t=s.getContext("2d");t.clearRect(0,0,64,64);const e=t.createLinearGradient(0,0,64,0);e.addColorStop(0,"rgba(10, 10, 12, 0.0)"),e.addColorStop(.18,"rgba(10, 10, 12, 0.85)"),e.addColorStop(.35,"rgba(10, 10, 12, 0.50)"),e.addColorStop(.52,"rgba(10, 10, 12, 0.85)"),e.addColorStop(.82,"rgba(10, 10, 12, 0.0)"),t.fillStyle=e,t.fillRect(0,0,64,64);const i=t.getImageData(0,0,64,64);for(let o=0;o<i.data.length;o+=4)if(i.data[o+3]>0){const a=(Math.random()-.5)*55;i.data[o+3]=Math.max(0,Math.min(255,i.data[o+3]+a))}t.putImageData(i,0,0);const n=new Re(s);return n.wrapS=Ve,n.wrapT=Ve,n.minFilter=yn,n.magFilter=De,n.generateMipmaps=!0,n}function k0(){const s=document.createElement("canvas");s.width=64,s.height=64;const t=s.getContext("2d"),e=t.createRadialGradient(32,32,0,32,32,30);return e.addColorStop(0,"rgba(255, 255, 255, 1)"),e.addColorStop(.12,"rgba(0, 240, 255, 1)"),e.addColorStop(.4,"rgba(0, 80, 255, 0.45)"),e.addColorStop(1,"rgba(0, 0, 0, 0)"),t.fillStyle=e,t.fillRect(0,0,64,64),t.strokeStyle="rgba(150, 230, 255, 0.8)",t.lineWidth=2,t.beginPath(),t.moveTo(12,32),t.lineTo(52,32),t.moveTo(32,12),t.lineTo(32,52),t.stroke(),new Re(s)}const As={},Bn=new R,Yr=new se,On=new R,$r=new Ie;function V0(s){if(As[s])return As[s];const t=[];let e,i,n=2.11,o=-2.11,a=1.3,r=-1.3;if(s==="sports"){const C=new H(.14,.2,2.6);C.translate(-.84,.22,0),t.push(C);const D=new H(.14,.2,2.6);D.translate(.84,.22,0),t.push(D);const B=new H(1.6,.2,1.4);B.translate(0,.425,1.3),t.push(B);const O=new H(1.7,.3,.4);O.translate(0,.375,2),t.push(O);const W=new H(.12,.36,1);W.translate(-.84,.455,1.3),t.push(W);const et=new H(.12,.36,1);et.translate(.84,.455,1.3),t.push(et);const nt=new H(.12,.36,1);nt.translate(-.84,.455,-1.3),t.push(nt);const rt=new H(.12,.36,1);rt.translate(.84,.455,-1.3),t.push(rt);const mt=new H(1.58,.4,2.6);mt.translate(0,.325,0),t.push(mt);const J=new H(1.6,.28,1.1);J.translate(0,.465,-1.55),t.push(J);const ot=new H(1.72,.28,.3);ot.translate(0,.375,-2.15),t.push(ot);const gt=new H(1.48,.08,1.9);gt.translate(0,.945,-.2),t.push(gt);const Q=new H(.08,.42,.08);Q.translate(-.7,.735,.7),t.push(Q);const at=new H(.08,.42,.08);at.translate(.7,.735,.7),t.push(at);const ct=new H(.08,.42,.08);ct.translate(-.7,.735,-1.1),t.push(ct);const wt=new H(.08,.42,.08);wt.translate(.7,.735,-1.1),t.push(wt);const vt=new H(.22,.14,.14);vt.translate(-.89,.72,.58),t.push(vt);const Rt=new H(.22,.14,.14);Rt.translate(.89,.72,.58),t.push(Rt)}else if(s==="pickup"){n=2.21,o=-2.21,a=1.4,r=-1.4,e=new H(1.8,.5,4.4),e.translate(0,.4,0),t.push(e),i=new H(1.5,.55,1.6),i.translate(0,.925,.4),t.push(i);const C=new H(.12,.45,2);C.translate(.84,.875,-1.1),t.push(C);const D=new H(.12,.45,2);D.translate(-.84,.875,-1.1),t.push(D);const B=new H(1.56,.45,.12);B.translate(0,.875,-2.14),t.push(B)}else s==="van"?(n=2.21,o=-2.21,a=1.4,r=-1.4,e=new H(1.85,.5,4.4),e.translate(0,.4,0),t.push(e),i=new H(1.6,.9,3.4),i.translate(0,1.1,-.3),t.push(i)):s==="cop"?(n=2.21,o=-2.21,a=1.4,r=-1.4,e=new H(1.85,.48,4.4),e.translate(0,.39,0),t.push(e)):(n=2.21,o=-2.21,a=1.4,r=-1.4,e=new H(1.8,.45,4.2),e.translate(0,.35,0),t.push(e),s==="suv"?(i=new H(1.6,.7,2.6),i.translate(0,.925,-.4)):(i=new H(1.5,.5,2.2),i.translate(0,.8,-.3)),t.push(i));const l=ee(t),c=[];if(s==="sports"){const C=new H(1.4,.4,.05);C.rotateX(Math.PI/5),C.translate(0,.735,.7),c.push(C);const D=new H(1.4,.38,.05);D.rotateX(-Math.PI/6),D.translate(0,.735,-1.1),c.push(D);const B=new H(.02,.32,1.6);B.translate(.76,.735,-.2),c.push(B);const O=new H(.02,.32,1.6);O.translate(-.76,.735,-.2),c.push(O)}else if(s==="pickup"){const C=new H(1.4,.5,.05);C.rotateX(Math.PI/6),C.translate(0,.925,1.15),c.push(C);const D=new H(1.4,.45,.05);D.translate(0,.925,-.38),c.push(D);const B=new H(.02,.45,1.2);B.translate(.76,.925,.4),c.push(B);const O=new H(.02,.45,1.2);O.translate(-.76,.925,.4),c.push(O)}else if(s==="van"){const C=new H(1.5,.7,.05);C.rotateX(Math.PI/5),C.translate(0,1.1,1.35),c.push(C);const D=new H(1.5,.6,.05);D.translate(0,1.25,-1.95),c.push(D);const B=new H(.02,.5,1);B.translate(.81,1.15,.7),c.push(B);const O=new H(.02,.5,1);O.translate(-.81,1.15,.7),c.push(O);const W=new H(.02,.4,1.4);W.translate(.81,1.2,-.9),c.push(W);const et=new H(.02,.4,1.4);et.translate(-.81,1.2,-.9),c.push(et)}else{const C=s==="suv"||s==="cop",D=C?.925:.8,B=C?1.5:1.4,O=C?s==="cop"?2.3:2.2:1.8,W=C?-.4:-.3,et=new H(B,C?.6:.45,.05);et.rotateX(Math.PI/6),et.translate(0,D,W+(C?1.2:1.1)),c.push(et);const nt=new H(B,C?.55:.42,.05);nt.rotateX(-Math.PI/8),nt.translate(0,D,W-(C?1.2:1.1)),c.push(nt);const rt=new H(.02,C?.55:.38,O);rt.translate(C?.81:.76,D,W),c.push(rt);const mt=new H(.02,C?.55:.38,O);mt.translate(C?-.81:-.76,D,W),c.push(mt)}const h=ee(c),d=[];if(s==="sports"){const C=new H(.5,.1,.6);C.translate(0,.96,-.2),d.push(C);const D=new H(.08,.45,.15);D.translate(-.65,.725,-1.8),d.push(D);const B=new H(.08,.45,.15);B.translate(.65,.725,-1.8),d.push(B);const O=new H(1.85,.06,.5);O.translate(0,.95,-1.8),d.push(O)}else if(s==="pickup"){const C=new H(.08,.55,.08);C.translate(-.7,.95,-.3),d.push(C);const D=new H(.08,.55,.08);D.translate(.7,.95,-.3),d.push(D);const B=new H(1.48,.08,.08);B.translate(0,1.2,-.3),d.push(B)}else if(s==="van"){const C=new H(.05,.05,2.8);C.translate(-.6,1.58,-.3),d.push(C);const D=new H(.05,.05,2.8);D.translate(.6,1.58,-.3),d.push(D);for(let B=-1.2;B<=.8;B+=.8){const O=new H(1.25,.03,.05);O.translate(0,1.58,B),d.push(O)}}else if(s==="cop"){const C=new H(.01,.01,.01);C.translate(0,-10,0),d.push(C)}else{const C=new H(1.6,.05,.15);C.translate(0,.6,-1.95),d.push(C)}const u=ee(d),f=[],g=new H(.25,.12,.1);g.translate(-.65,s==="sports"?.35:s==="van"||s==="pickup"?.45:.4,n+.01),f.push(g);const M=new H(.25,.12,.1);M.translate(.65,s==="sports"?.35:s==="van"||s==="pickup"?.45:.4,n+.01),f.push(M);const m=ee(f),p=[],A=new H(.25,.12,.1);A.translate(-.65,s==="sports"?.36:s==="van"||s==="pickup"?.47:.42,o-.01),p.push(A);const x=new H(.25,.12,.1);x.translate(.65,s==="sports"?.36:s==="van"||s==="pickup"?.47:.42,o-.01),p.push(x);const b=ee(p);let I=null,T=null,_=null;if(s==="sports"||s==="cop")if(I=new H(1.2,.16,.05),I.translate(0,.28,n+.05),s==="sports"){const C=new Wi(.08,.08,.4,8);C.rotateX(Math.PI/2),C.translate(-.48,.18,o-.15);const D=new Wi(.08,.08,.4,8);D.rotateX(Math.PI/2),D.translate(.48,.18,o-.15),T=ee([C,D])}else s==="cop"&&(_=new H(1.2,.38,.12),_.translate(0,.34,n+.12));let P=null,v=null,E=null,L=null,z=null,Z=null;return s==="cop"&&(P=new H(1.6,.65,2.4),P.translate(0,.925,-.3),v=new H(.02,.5,1.8),v.translate(.93,.55,-.3),E=new H(.02,.5,1.8),E.translate(-.93,.55,-.3),L=new H(1.2,.12,.3),L.translate(0,1.25,-.3),z=new H(.4,.15,.28),z.translate(-.35,1.35,-.3),Z=new H(.4,.15,.28),Z.translate(.35,1.35,-.3)),As[s]={bodyGeo:l,glassGeo:h,carbonGeo:u,headlampsGeo:m,taillightsGeo:b,grilleGeo:I,exhaustGeo:T,bullBarGeo:_,copCabinGeo:P,copLeftDoorGeo:v,copRightDoorGeo:E,copSirenBarGeo:L,copSirenBlueGeo:z,copSirenRedGeo:Z,frontZ:n,backZ:o,wheelZFront:a,wheelZRear:r},As[s]}function H0(s,t="sports",e=null){const i=new Vt,n=new Ft({color:s,roughness:.15,metalness:.8}),o=new Ft({color:1973790,roughness:.6,metalness:.3}),a=new Ft({color:1381653,roughness:.85}),r=new Ft({color:13938487,roughness:.2,metalness:.9}),l=new Ft({color:1119778,roughness:.1,metalness:.9}),c=new fe({color:16776404}),h=new fe({color:13373713}),d=V0(t),u=new tt(d.bodyGeo.clone(),n);u.name="carBody",u.castShadow=!0,u.receiveShadow=!0,i.add(u);const f=new tt(d.glassGeo.clone(),l);f.name="glass",i.add(f);const g=new tt(d.carbonGeo.clone(),o);g.castShadow=!0,g.name="carbon",i.add(g);const M=new tt(d.headlampsGeo.clone(),c);if(M.name="headlamps",i.add(M),e){const _=new $e({map:e,color:16774102,transparent:!0,opacity:0,blending:xe,depthWrite:!1}),P=new ze(_);P.position.set(-.65,t==="sports"?.35:t==="van"||t==="pickup"?.45:.4,d.frontZ+.05),P.scale.set(3.4,.7,1),P.name="leftHeadlightSprite",i.add(P);const v=new $e({map:e,color:16774102,transparent:!0,opacity:0,blending:xe,depthWrite:!1}),E=new ze(v);E.position.set(.65,t==="sports"?.35:t==="van"||t==="pickup"?.45:.4,d.frontZ+.05),E.scale.set(3.4,.7,1),E.name="rightHeadlightSprite",i.add(E)}const m=new tt(d.taillightsGeo.clone(),h);if(m.name="taillights",i.add(m),d.grilleGeo){const _=new tt(d.grilleGeo.clone(),o);_.name="grille",i.add(_)}if(d.exhaustGeo){const _=new tt(d.exhaustGeo.clone(),r);_.castShadow=!0,_.name="exhaust",i.add(_)}if(d.bullBarGeo){const _=new tt(d.bullBarGeo.clone(),o);_.castShadow=!0,_.name="bullBar",i.add(_)}if(t==="cop"){const _=new Ft({color:15658734,roughness:.15,metalness:.7}),P=new tt(d.copCabinGeo.clone(),_);P.castShadow=!0,P.receiveShadow=!0,P.name="copCabin",i.add(P);const v=new tt(d.copLeftDoorGeo.clone(),_);v.castShadow=!0,v.name="copLeftDoor",i.add(v);const E=new tt(d.copRightDoorGeo.clone(),_);E.castShadow=!0,E.name="copRightDoor",i.add(E);const L=new tt(d.copSirenBarGeo.clone(),o);L.castShadow=!0,L.name="copSirenBar",i.add(L);const z=new Ft({color:8959,emissive:8959,emissiveIntensity:.1,roughness:.1}),Z=new tt(d.copSirenBlueGeo.clone(),z);Z.name="sirenBlue",i.add(Z);const C=new Ft({color:16711714,emissive:16711714,emissiveIntensity:.1,roughness:.1}),D=new tt(d.copSirenRedGeo.clone(),C);D.name="sirenRed",i.add(D)}const p=new Wi(.42,.42,.45,12);p.rotateZ(Math.PI/2);const A=new Wi(.26,.26,.48,8);A.rotateZ(Math.PI/2);const x=[];[[-.95,.25,d.wheelZFront],[.95,.25,d.wheelZFront],[-.95,.25,d.wheelZRear],[.95,.25,d.wheelZRear]].forEach(([_,P,v])=>{const E=new Vt;E.position.set(_,P,v);const L=new tt(p,a);L.castShadow=!0,E.add(L);const z=new tt(A,r);E.add(z),i.add(E),x.push(E)});const I=new fe({map:W0(),transparent:!0,opacity:.35,blending:xe,depthWrite:!1}),T=new tt(X0().clone(),I);return T.name="headlightPool",i.add(T),{carGroup:i,wheels:x}}let Lo=null,Gn=null;function W0(){if(!Lo){const s=document.createElement("canvas");s.width=128,s.height=256;const t=s.getContext("2d"),e=t.createImageData(128,256);for(let i=0;i<256;i++){const n=i/255,o=.15+n*.75;for(let a=0;a<128;a++){const r=a/127,l=Math.abs(r-.5),c=Math.max(0,1-l/o);let h=0;n<.1?h=n/.1:h=Math.max(0,1-(n-.1)/.9);const d=Math.pow(c,1.6)*Math.pow(h,1.3),u=(i*128+a)*4;e.data[u]=255,e.data[u+1]=250,e.data[u+2]=230,e.data[u+3]=Math.round(d*255)}}t.putImageData(e,0,0),Lo=new Re(s)}return Lo}function X0(){return Gn||(Gn=new bi(12,24,2,8),Gn.rotateX(-Math.PI/2),Gn.translate(0,.02,12)),Gn}function q0(s,t,e,i){const n=s.getObjectByName("carBody");if(n&&n.geometry){const o=n.geometry,a=o.attributes.position;if(!a)return;Bn.copy(t),Yr.copy(n.matrixWorld).invert(),Bn.applyMatrix4(Yr),On.copy(i).normalize(),$r.copy(n.quaternion).invert(),On.applyQuaternion($r);const r=Math.min(.48,e*.0125),l=1.5+Math.random()*.6,c=l*l;let h=!1;for(let d=0;d<a.count;d++){const u=a.getX(d),f=a.getY(d),g=a.getZ(d),M=u-Bn.x;if(Math.abs(M)>=l)continue;const m=f-Bn.y;if(Math.abs(m)>=l)continue;const p=g-Bn.z;if(Math.abs(p)>=l)continue;const A=M*M+m*m+p*p;if(A<c){const b=1-Math.sqrt(A)/l,I=b*b*r;a.setXYZ(d,u+On.x*I,f+On.y*I,g+On.z*I),h=!0}}h&&(a.needsUpdate=!0,o.computeVertexNormals())}}function Y0(){const s=document.createElement("canvas");s.width=128,s.height=128;const t=s.getContext("2d"),e=t.createRadialGradient(64,64,0,64,64,60);e.addColorStop(0,"rgba(255, 255, 255, 1.0)"),e.addColorStop(.08,"rgba(255, 255, 255, 0.85)"),e.addColorStop(.22,"rgba(255, 255, 255, 0.35)"),e.addColorStop(.55,"rgba(255, 255, 255, 0.08)"),e.addColorStop(1,"rgba(0, 0, 0, 0)"),t.fillStyle=e,t.fillRect(0,0,128,128);const i=t.createLinearGradient(0,64,128,64);return i.addColorStop(0,"rgba(255, 255, 255, 0)"),i.addColorStop(.5,"rgba(255, 255, 255, 0.35)"),i.addColorStop(1,"rgba(255, 255, 255, 0)"),t.fillStyle=i,t.fillRect(0,62,128,4),new Re(s)}function $0(){const s=document.createElement("canvas");s.width=256,s.height=256;const t=s.getContext("2d"),e=t.createRadialGradient(128,128,0,128,128,120);return e.addColorStop(0,"rgba(255, 255, 255, 0.7)"),e.addColorStop(.15,"rgba(255, 255, 255, 0.45)"),e.addColorStop(.4,"rgba(255, 255, 255, 0.15)"),e.addColorStop(.8,"rgba(255, 255, 255, 0.02)"),e.addColorStop(1,"rgba(0, 0, 0, 0)"),t.fillStyle=e,t.fillRect(0,0,256,256),new Re(s)}function j0(){const s=document.createElement("canvas");s.width=512,s.height=512;const t=s.getContext("2d"),e=document.createElement("canvas");e.width=512,e.height=512;const i=e.getContext("2d");t.fillStyle="#838087",t.fillRect(0,0,512,512),i.fillStyle="#b0b0b0",i.fillRect(0,0,512,512);const n=t.getImageData(0,0,512,512),o=n.data,a=i.getImageData(0,0,512,512),r=a.data;for(let h=0;h<512;h++)for(let d=0;d<512;d++){const u=(h*512+d)*4,f=(Math.random()-.5)*12;o[u]=Math.max(0,Math.min(255,o[u]+f)),o[u+1]=Math.max(0,Math.min(255,o[u+1]+f)),o[u+2]=Math.max(0,Math.min(255,o[u+2]+f));const g=128+(Math.random()-.5)*22;r[u]=Math.max(0,Math.min(255,g))}t.putImageData(n,0,0),i.putImageData(a,0,0);const l=new Re(s);l.wrapS=Ve,l.wrapT=Ve;const c=new Re(e);return c.wrapS=Ve,c.wrapT=Ve,{map:l,roughnessMap:c}}function Z0(s=!0){const t=document.createElement("canvas");t.width=1024,t.height=1024;const e=t.getContext("2d"),i=document.createElement("canvas");i.width=1024,i.height=1024;const n=i.getContext("2d");e.fillStyle="#222226",e.fillRect(0,0,1024,1024),n.fillStyle="#ebebeb",n.fillRect(0,0,1024,1024);const o=document.createElement("canvas");o.width=1024,o.height=1024;const a=o.getContext("2d"),r=[];if(s){const m=1+Math.floor(Math.random()*2);for(let p=0;p<m;p++){const A=200+Math.random()*624,x=200+Math.random()*624,b=6+Math.floor(Math.random()*8);let I=A,T=x,_=60+Math.random()*70;for(let v=0;v<b;v++){r.push({x:I,y:T,r:_});const E=a.createRadialGradient(I,T,0,I,T,_);E.addColorStop(0,"rgba(0, 0, 0, 1)"),E.addColorStop(1,"rgba(0, 0, 0, 0)"),a.fillStyle=E,a.beginPath(),a.arc(I,T,_,0,Math.PI*2),a.fill();const L=Math.random()*Math.PI*2,z=_*(.35+Math.random()*.45);I+=Math.cos(L)*z,T+=Math.sin(L)*z,I=Math.max(100,Math.min(924,I)),T=Math.max(100,Math.min(924,T)),_*=.75+Math.random()*.4,_=Math.max(35,Math.min(150,_))}const P=1+Math.floor(Math.random()*3);for(let v=0;v<P;v++){const E=A+(Math.random()-.5)*350,L=x+(Math.random()-.5)*350,z=15+Math.random()*25;if(E>50&&E<974&&L>50&&L<974){r.push({x:E,y:L,r:z});const Z=a.createRadialGradient(E,L,0,E,L,z);Z.addColorStop(0,"rgba(0, 0, 0, 1)"),Z.addColorStop(1,"rgba(0, 0, 0, 0)"),a.fillStyle=Z,a.beginPath(),a.arc(E,L,z,0,Math.PI*2),a.fill()}}}}const c=a.getImageData(0,0,1024,1024).data,h=e.getImageData(0,0,1024,1024),d=h.data,u=n.getImageData(0,0,1024,1024),f=u.data;for(let m=0;m<1024;m++)for(let p=0;p<1024;p++){const A=(m*1024+p)*4,x=p+Math.sin(m*.04)*25+Math.cos(p*.09)*10+Math.sin((p+m)*.015)*12,b=m+Math.cos(p*.04)*25+Math.sin(m*.09)*10+Math.cos((p-m)*.015)*12,I=Math.max(0,Math.min(1023,Math.round(x))),_=(Math.max(0,Math.min(1023,Math.round(b)))*1024+I)*4,P=c[_+3];if(s&&P>120){d[A]=16,d[A+1]=16,d[A+2]=18,f[A+1]=10,f[A+2]=45;const v=Math.sin(p*.3)*15+Math.cos(m*.35)*15+Math.sin((p+m)*.15)*12+Math.cos((p-m)*.5)*6;f[A]=Math.max(0,Math.min(255,Math.round(128+v)))}else{const v=(Math.random()-.5)*10;d[A]=Math.max(0,Math.min(255,d[A]+v)),d[A+1]=Math.max(0,Math.min(255,d[A+1]+v)),d[A+2]=Math.max(0,Math.min(255,d[A+2]+v)),f[A+1]=235,f[A+2]=0;const E=(Math.random()-.5)*60;f[A]=Math.max(0,Math.min(255,128+E))}}e.putImageData(h,0,0),n.putImageData(u,0,0);const g=new Re(t);g.wrapS=Ve,g.wrapT=Ve,g.repeat.set(1,1);const M=new Re(i);return M.wrapS=Ve,M.wrapT=Ve,M.repeat.set(1,1),{map:g,roughnessMap:M,localCircles:s?r:null}}function K0(){const s=document.createElement("canvas");s.width=512,s.height=512;const t=s.getContext("2d"),e=document.createElement("canvas");e.width=512,e.height=512;const i=e.getContext("2d"),n=64;for(let r=0;r<8;r++)for(let l=0;l<8;l++){const c=l*n,h=r*n;t.fillStyle="#181822",t.fillRect(c,h,n,n),i.fillStyle="#000000",i.fillRect(c,h,n,n);const d=6,u=c+d,f=h+d,g=n-d*2,M=n-d*2,m=Math.random();let p="#0b0c10",A="#000000",x=!1;if(m<.35)p="#0a0b0e",A="#000000";else if(m<.8){const I=34+Math.floor(Math.random()*8);p=`hsl(${I}, 85%, 55%)`,A=`hsl(${I}, 85%, 50%)`,x=!0}else{const I=195+Math.floor(Math.random()*10);p=`hsl(${I}, 40%, 65%)`,A=`hsl(${I}, 40%, 60%)`,x=!0}t.fillStyle=p,t.fillRect(u,f,g,M),x&&(i.fillStyle=A,i.fillRect(u,f,g,M));const b=6;t.fillStyle="#181822",i.fillStyle="#000000",t.fillRect(u,f+M/2-b/2,g,b),i.fillRect(u,f+M/2-b/2,g,b),t.fillRect(u+g/2-b/2,f,b,M),i.fillRect(u+g/2-b/2,f,b,M)}const o=new Re(s);o.minFilter=ge,o.magFilter=ge;const a=new Re(e);return a.minFilter=ge,a.magFilter=ge,{map:o,emissiveMap:a}}function J0(){const s=document.createElement("canvas");s.width=1024,s.height=512;const t=s.getContext("2d"),e=t.createLinearGradient(0,0,0,256);e.addColorStop(0,"#0a0a14"),e.addColorStop(.5,"#0f0f22"),e.addColorStop(1,"#1a1a2e"),t.fillStyle=e,t.fillRect(0,0,1024,256),t.fillStyle="#0d0d12",t.fillRect(0,256,1024,256);const i=30,n=1024/i;for(let a=0;a<i;a++){const r=60+Math.random()*140,l=a*n,c=n*(.75+Math.random()*.4),h=256-r;t.fillStyle="#14141e",t.fillRect(l,h,c,r),t.strokeStyle="#222230",t.lineWidth=1.5,t.strokeRect(l,h,c,r),Math.random()>.5&&(t.beginPath(),t.moveTo(l+c/2,h),t.lineTo(l+c/2,h-15-Math.random()*20),t.stroke(),t.fillStyle="#ff3333",t.beginPath(),t.arc(l+c/2,h-15,2.5,0,Math.PI*2),t.fill());const d=2+Math.floor(Math.random()*3),u=5+Math.floor(Math.random()*6),f=c/(d*2.5),g=r/(u*2.5),M=l+(c-(d*2-1)*f)/2,m=h+(r-(u*2-1)*g)/2,p=Math.random(),A=p<.5?"#ffb300":p<.95?"#00e5ff":"#ffffff";for(let x=0;x<u;x++)for(let b=0;b<d;b++)if(Math.random()>.4){t.fillStyle=A;const I=M+b*2*f,T=m+x*2*g;t.fillRect(I,T,f,g)}if(Math.random()>.7){const x=["#ff0077","#39ff14","#00e5ff","#ffb300"][Math.floor(Math.random()*4)],b=c*.65,I=r*.18,T=l+(c-b)/2,_=h+r*.15;t.shadowColor=x,t.shadowBlur=10,t.fillStyle=x,t.fillRect(T,_,b,I),t.shadowBlur=0,t.fillStyle="#ffffff",t.fillRect(T+3,_+3,b-6,I-6),t.fillStyle="#111116",t.fillRect(T+4,_+4,b-8,I-8)}}for(let a=0;a<60;a++){const r=Math.random()*1024,l=Math.random()*220,c=Math.random();t.fillStyle=c>.7?"#ffd4b2":c>.4?"#c8e3ff":"#ffffff",t.beginPath(),t.arc(r,l,.5+Math.random()*.8,0,Math.PI*2),t.fill()}const o=new Re(s);return o.mapping=Is,o.colorSpace=we,o}function Ql(s,t,e){const i=(e+(Math.abs(s)+Math.abs(t))*.05)%12;return i<5?{xLight:"green",zLight:"red"}:i<6?{xLight:"yellow",zLight:"red"}:i<11?{xLight:"red",zLight:"green"}:{xLight:"red",zLight:"yellow"}}function ui(s){const t=s.attributes.uv,e=s.attributes.position;for(let i=0;i<t.count;i++){const n=e.getX(i),o=e.getZ(i);t.setXY(i,n*.25,o*.25)}t.needsUpdate=!0}function Ni(s,t,e){const i=new H(s,t,e,Math.max(1,Math.round(s/2)),1,1),n=Math.floor(Math.random()*8),o=Math.floor(Math.random()*8),a=i.attributes.uv;for(let r=0;r<a.count;r++){const l=a.getX(r),c=a.getY(r),h=(n+l)/8,d=(o+c)/8;a.setXY(r,h,d)}return a.needsUpdate=!0,i}function Q0(){const s=new Vt,t=new Ft({color:13378082,roughness:.4,metalness:.6}),e=new Ft({color:14526976,roughness:.5,metalness:.7}),i=new tt(new H(.35,.7,.35),t);i.position.y=.35,i.castShadow=!0,s.add(i);const n=new tt(new H(.42,.1,.42),e);n.position.y=.75,s.add(n);const o=new tt(new H(.12,.15,.12),e);o.position.set(-.2,.45,0),s.add(o);const a=new tt(new H(.12,.15,.12),e);return a.position.set(.2,.45,0),s.add(a),s}function tm(){const s=new Vt,t=new Ft({color:2051705,roughness:.5}),e=new Ft({color:15661055,transparent:!0,opacity:.4,metalness:.9,roughness:.1}),i=new Ft({color:15658734,roughness:.9}),n=new tt(new H(.8,1.1,.8),t);n.position.y=.55,n.castShadow=!0,n.receiveShadow=!0,s.add(n);const o=new tt(new H(.6,.4,.05),e);o.position.set(0,.75,.41),s.add(o);const a=new tt(new H(.5,.3,.5),i);return a.position.set(0,.35,.1),s.add(a),s}function em(s,t,e,i){const n=Math.sin(s*12.9898+t*78.233)*43758.5453,o=n-Math.floor(n);let a;o<.5?o<.1?a=this.templates.treeAutumn:o<.25?a=this.templates.treeCherry:a=this.templates.treeGreen:o>.9?a=this.templates.treeRoundAutumn:o>.75?a=this.templates.treeRoundCherry:a=this.templates.treeRoundGreen;const r=a.clone(),l=.7+o*.65;r.scale.set(l,l,l);const c=this.getBaseHeight(s,t);r.position.set(s,.35+c,t),e.add(r),i.push({xMin:s-.4*l,xMax:s+.4*l,zMin:t-.4*l,zMax:t+.4*l,height:6*l})}function im(){const s=new Vt,t=new tt(new H(2,.1,.8),this.benchWoodMat);t.position.set(0,-.1,0),t.castShadow=!0,t.receiveShadow=!0,s.add(t);const e=new tt(new H(2,.6,.1),this.benchWoodMat);e.position.set(0,.25,-.35),e.castShadow=!0,s.add(e);const i=new tt(new H(.1,.5,.8),this.benchIronMat);i.position.set(-.9,-.35,0),i.castShadow=!0,s.add(i);const n=new tt(new H(.1,.5,.8),this.benchIronMat);return n.position.set(.9,-.35,0),n.castShadow=!0,s.add(n),s}function nm(){const s=new Vt,t=new tt(new H(1.2,.15,1.2),this.phoneBoothFrameMat);t.position.set(0,-1.325,0),t.castShadow=!0,t.receiveShadow=!0,s.add(t);const e=new tt(new H(1.2,.15,1.2),this.phoneBoothFrameMat);e.position.set(0,1.325,0),e.castShadow=!0,s.add(e);const i=new H(.1,2.5,.1),n=new tt(i,this.phoneBoothFrameMat);n.position.set(-.55,0,-.55),n.castShadow=!0,s.add(n);const o=new tt(i,this.phoneBoothFrameMat);o.position.set(.55,0,-.55),o.castShadow=!0,s.add(o);const a=new tt(i,this.phoneBoothFrameMat);a.position.set(-.55,0,.55),a.castShadow=!0,s.add(a);const r=new tt(i,this.phoneBoothFrameMat);r.position.set(.55,0,.55),r.castShadow=!0,s.add(r);const l=new tt(new H(.04,2.3,1),this.phoneBoothGlassMat);l.position.set(-.54,0,0),s.add(l);const c=new tt(new H(.04,2.3,1),this.phoneBoothGlassMat);c.position.set(.54,0,0),s.add(c);const h=new tt(new H(1,2.3,.04),this.phoneBoothGlassMat);h.position.set(0,0,-.54),s.add(h);const d=new tt(new H(.3,.5,.2),this.benchIronMat);d.position.set(0,.1,-.4),s.add(d);const u=new tt(new H(.12,.12,.02),this.phoneBoothScreenMat);return u.position.set(0,.2,-.29),s.add(u),s}function sm(){const s=new Vt,t=new tt(new H(.6,.9,.6),this.trashCanMat);t.position.set(0,-.05,0),t.castShadow=!0,t.receiveShadow=!0,s.add(t);const e=new tt(new H(.64,.1,.64),this.trashCanLidMat);return e.position.set(0,.45,0),e.castShadow=!0,s.add(e),s}function om(s,t,e,i,n,o,a){const{rwX:r,rwZ:l}=this.getRoadWidthForGrid(s,t),c=this.roadColumns.has(s)&&this.roadRows.has(t),h=this.roadRows.has(t)?l:r,d=(this.tileSize-h)/2,u=Math.abs(s*17+t*23)%this.asphaltMaterials.length,f=this.asphaltMaterials[u],g=C=>{const D=Math.abs((s*.317+t*.713)%1),B=Math.abs((s*.893+t*.149)%1);C.traverse(O=>{if(O.isMesh&&(O.material===this.asphaltMat||this.asphaltMaterials.includes(O.material))){O.material=f,O.geometry=O.geometry.clone();const W=O.geometry.attributes.uv;for(let et=0;et<W.count;et++)W.setXY(et,W.getX(et)+D,W.getY(et)+B);W.needsUpdate=!0}})},M=[],m=[],p=[],A=[],x=[],b=[],I=[],T=[],_=[],P=(C,D)=>{const B=this.getBaseHeight(C,D),O=new H(.8,4,.8);O.translate(C,2.35+B,D),p.push(O);const W=Math.sin(C*12.9898+D*78.233)*43758.5453,et=W-Math.floor(W),nt=et>.85?"cherry":et>.7?"autumn":"normal";let rt=[];const mt=et*10%1;mt>.66?rt=[{size:3.6,y:3.5},{size:2.8,y:4.3},{size:2,y:5.1},{size:1.2,y:5.9}]:mt>.33?rt=[{size:3.5,y:4},{size:3.5,y:4.4},{size:2.8,y:5}]:rt=[{size:3.5,y:3.8},{size:2.8,y:4.8},{size:1.8,y:5.6}],rt.forEach(J=>{const ot=new H(J.size,J.size*.85,J.size);ot.translate(C,J.y+.35+B,D),nt==="cherry"?x.push(ot):nt==="autumn"?b.push(ot):A.push(ot)}),o.push({xMin:C-.4,xMax:C+.4,zMin:D-.4,zMax:D+.4,height:6})},v=(C,D)=>{const B=this.getBaseHeight(C,D);if(Math.abs(B)>.1)return;const O=this.templates.fireHydrant.clone();O.position.set(C,.35+B,D),n.add(O),this.breakables.push({type:"hydrant",comHeight:.35,radius:.25,position:new R(C,.35+B,D),group:O,flares:[],lights:[],broken:!1,tileX:e,tileZ:i,velocity:new R,angularVelocity:new R})},E=(C,D,B)=>{const O=this.getBaseHeight(C,D),W=new H(.8,1.1,.8);W.translate(0,.55,0),W.rotateY(B),W.translate(C,.35+O,D),I.push(W);const et=new H(.6,.4,.05);et.translate(0,.75,.41),et.rotateY(B),et.translate(C,.35+O,D),T.push(et);const nt=new H(.5,.3,.5);nt.translate(0,.35,.1),nt.rotateY(B),nt.translate(C,.35+O,D),_.push(nt),o.push({xMin:C-.4,xMax:C+.4,zMin:D-.4,zMax:D+.4,height:1.2})},L=(C,D,B)=>{const O=this.getBaseHeight(C,D);if(Math.abs(O)>.1)return;const W=this.templates.bench.clone();W.position.set(C,.6+O,D),W.rotation.y=B,n.add(W),this.breakables.push({type:"bench",comHeight:.6,radius:.4,position:new R(C,.6+O,D),group:W,flares:[],lights:[],broken:!1,tileX:e,tileZ:i,velocity:new R,angularVelocity:new R})},z=(C,D,B)=>{const O=this.getBaseHeight(C,D);if(Math.abs(O)>.1)return;const W=this.templates.phoneBooth.clone();W.position.set(C,1.4+O,D),W.rotation.y=B,n.add(W),this.breakables.push({type:"phonebooth",comHeight:1.4,radius:.6,position:new R(C,1.4+O,D),group:W,flares:[],lights:[],broken:!1,tileX:e,tileZ:i,velocity:new R,angularVelocity:new R})},Z=(C,D)=>{const B=this.getBaseHeight(C,D);if(Math.abs(B)>.1)return;const O=this.templates.trashCan.clone();O.position.set(C,.5+B,D),O.rotation.y=Math.random()*Math.PI*2,n.add(O),this.breakables.push({type:"trashcan",comHeight:.5,radius:.3,position:new R(C,.5+B,D),group:O,flares:[],lights:[],broken:!1,tileX:e,tileZ:i,velocity:new R,angularVelocity:new R})};if(c){const C=new Vt,D=new H(this.tileSize,.2,this.tileSize,8,1,8);D.translate(0,.1,0),this.deformGeometryToHills(D,e,i);const B=new tt(D,this.asphaltMat);B.receiveShadow=!0,C.add(B);const O=.5,W=5,et=[];for(let ot=-r/2+2;ot<=r/2-2;ot+=3){const gt=new H(W,.21,O,4,1,1);gt.translate(ot,.11,-l/2-1),et.push(gt);const Q=new H(W,.21,O,4,1,1);Q.translate(ot,.11,l/2+1),et.push(Q)}for(let ot=-l/2+2;ot<=l/2-2;ot+=3){const gt=new H(O,.21,W,1,1,4);gt.translate(-r/2-1,.11,ot),et.push(gt);const Q=new H(O,.21,W,1,1,4);Q.translate(r/2+1,.11,ot),et.push(Q)}if(et.length>0){const ot=ee(et);this.deformGeometryToHills(ot,e,i),C.add(new tt(ot,this.whiteLineMat))}const nt=20-r/2,rt=20-l/2,mt=[];if(nt>0&&rt>0){const ot=new H(nt,.35,rt,4,1,4);ui(ot),ot.translate(-20+nt/2,.175,-20+rt/2),mt.push(ot);const gt=new H(nt,.35,rt,4,1,4);ui(gt),gt.translate(20-nt/2,.175,-20+rt/2),mt.push(gt);const Q=new H(nt,.35,rt,4,1,4);ui(Q),Q.translate(-20+nt/2,.175,20-rt/2),mt.push(Q);const at=new H(nt,.35,rt,4,1,4);ui(at),at.translate(20-nt/2,.175,20-rt/2),mt.push(at)}if(mt.length>0){const ot=ee(mt);this.deformGeometryToHills(ot,e,i);const gt=new tt(ot,this.concreteMat);gt.receiveShadow=!0,C.add(gt)}g(C),C.position.set(e,0,i),n.add(C),[[-r/2-1,-l/2-1],[r/2+1,-l/2-1],[-r/2-1,l/2+1],[r/2+1,l/2+1]].forEach(([ot,gt])=>{const Q=e+ot,at=i+gt,ct=new Vt,wt=this.getBaseHeight(Q,at);ct.position.set(Q,4.25+wt,at),n.add(ct);const vt=ot>0?-1:1,Rt=Math.sin(Q*5+at*3)>0,V=Rt?13821439:16766369,_t=Math.sin(Q*1.2+at*2.8)-Math.floor(Math.sin(Q*1.2+at*2.8))>.65,ft=[],S=[];let N=null;const q=[],j=new H(.3,8.5,.3);q.push(j);const w=new H(1.3,.15,.15);if(w.translate(vt*.65,4.15,0),q.push(w),_t){const kt=new H(1.3,.15,.15);kt.translate(-vt*.65,4.15,0),q.push(kt)}const y=ee(q),F=new tt(y,this.streetlightPoleMat);F.castShadow=!0,ct.add(F);const k=[],X=new H(.6,.2,.6);if(X.translate(vt*1.3,4.15,0),k.push(X),_t){const kt=new H(.6,.2,.6);kt.translate(-vt*1.3,4.15,0),k.push(kt)}const $=ee(k),ut=new tt($,this.streetlightBulbMat);ct.add(ut);const K=new tt(this.lightConeGeo,Rt?this.lightConeMatLED:this.lightConeMatSodium);K.position.set(vt*1.3,.25,0),K.name="lightCone",ct.add(K);const lt=new tt(this.lightPoolGeo,(Rt?this.ledGroundLightPoolMat:this.sodiumGroundLightPoolMat).clone());if(lt.position.set(vt*1.3,-3.89,0),ct.add(lt),_t){const kt=new tt(this.lightConeGeo,Rt?this.lightConeMatLED:this.lightConeMatSodium);kt.position.set(-vt*1.3,.25,0),kt.name="lightCone",ct.add(kt),N=new tt(this.lightPoolGeo,(Rt?this.ledGroundLightPoolMat:this.sodiumGroundLightPoolMat).clone()),N.position.set(-vt*1.3,-3.89,0),ct.add(N);const re=new ze(new $e({map:this.slFlareTex,color:V,transparent:!0,opacity:.7,blending:xe,depthWrite:!1}));re.position.set(-vt*1.3,4.15,0),re.scale.set(3.8,3.8,1),ct.add(re),ft.push(re)}const Mt=new $e({map:this.slFlareTex,color:V,transparent:!0,opacity:.7,blending:xe,depthWrite:!1}),St=new ze(Mt);St.position.set(vt*1.3,4.15,0),St.scale.set(3.8,3.8,1),ct.add(St),ft.push(St);const it={x:Q+vt*1.3,y:7.5+wt,z:at,intensity:12,color:V,poolMesh:lt,defaultOpacity:Rt?.16:.22};if(a.push(it),S.push(it),_t){const kt={x:Q-vt*1.3,y:7.5+wt,z:at,intensity:12,color:V,poolMesh:N,defaultOpacity:Rt?.16:.22};a.push(kt),S.push(kt)}const Lt=-Math.sign(gt)*3.5,Ct=new tt(new H(.15,.15,3.5),this.streetlightPoleMat);Ct.position.set(0,2.5,-Math.sign(gt)*1.75),Ct.castShadow=!0,ct.add(Ct);const Tt=new tt(new H(.4,1.2,.4),this.tlHousingMat);Tt.position.set(0,2.1,Lt),Tt.rotation.y=ot>0?-Math.PI/2:Math.PI/2,ct.add(Tt);const Et=new H(.24,.24,.1),Pt=new Vt;Pt.position.set(0,2.1,Lt),Pt.rotation.y=ot>0?-Math.PI/2:Math.PI/2;const Y=new tt(Et,this.tlRedOffMat);Y.position.set(0,.35,.21),Pt.add(Y),ct.add(Pt);const xt=new Vt;xt.position.set(0,2.1,Lt),xt.rotation.y=ot>0?-Math.PI/2:Math.PI/2;const Nt=new tt(Et,this.tlYellowOffMat);Nt.position.set(0,0,.21),xt.add(Nt),ct.add(xt);const Ut=new Vt;Ut.position.set(0,2.1,Lt),Ut.rotation.y=ot>0?-Math.PI/2:Math.PI/2;const yt=new tt(Et,this.tlGreenOffMat);yt.position.set(0,-.35,.21),Ut.add(yt),ct.add(Ut);const G=-Math.sign(ot)*3.5,At=new tt(new H(3.5,.15,.15),this.streetlightPoleMat);At.position.set(-Math.sign(ot)*1.75,2.5,0),At.castShadow=!0,ct.add(At);const bt=new tt(new H(.4,1.2,.4),this.tlHousingMat);bt.position.set(G,2.1,0),bt.rotation.y=gt>0?Math.PI:0,ct.add(bt);const It=new Vt;It.position.set(G,2.1,0),It.rotation.y=gt>0?Math.PI:0;const Bt=new tt(Et,this.tlRedOffMat);Bt.position.set(0,.35,.21),It.add(Bt),ct.add(It);const qt=new Vt;qt.position.set(G,2.1,0),qt.rotation.y=gt>0?Math.PI:0;const zt=new tt(Et,this.tlYellowOffMat);zt.position.set(0,0,.21),qt.add(zt),ct.add(qt);const $t=new Vt;$t.position.set(G,2.1,0),$t.rotation.y=gt>0?Math.PI:0;const ie=new tt(Et,this.tlGreenOffMat);ie.position.set(0,-.35,.21),$t.add(ie),ct.add($t),this.trafficLights.push({tileX:e,tileZ:i,intersectionX:e,intersectionZ:i,axis:"x",redMesh:Y,yellowMesh:Nt,greenMesh:yt}),this.trafficLights.push({tileX:e,tileZ:i,intersectionX:e,intersectionZ:i,axis:"z",redMesh:Bt,yellowMesh:zt,greenMesh:ie}),this.breakables.push({type:"trafficlight",position:new R(Q,wt,at),group:ct,flares:ft,lights:S,poolMeshes:_t?[lt,N]:[lt],broken:!1,tileX:e,tileZ:i,velocity:new R,angularVelocity:new R})})}else if(this.roadRows.has(t)){const D=new Vt,B=new H(this.tileSize,.2,h,8,1,4);B.translate(0,.1,0),this.deformGeometryToHills(B,e,i);const O=new tt(B,this.asphaltMat);O.receiveShadow=!0,D.add(O);const W=new H(this.tileSize,.35,d,8,1,2);ui(W),W.translate(0,.175,h/2+d/2);const et=new H(this.tileSize,.35,d,8,1,2);ui(et),et.translate(0,.175,-h/2-d/2);const nt=ee([W,et]);this.deformGeometryToHills(nt,e,i);const rt=new tt(nt,this.concreteMat);rt.receiveShadow=!0,D.add(rt);const mt=new H(this.tileSize,.22,.15,8,1,1);mt.translate(0,.11,-.2);const J=new H(this.tileSize,.22,.15,8,1,1);J.translate(0,.11,.2);const ot=ee([mt,J]);this.deformGeometryToHills(ot,e,i),D.add(new tt(ot,this.yellowLineMat)),g(D),D.position.set(e,0,i),n.add(D);const gt=Math.sin(s*12.9898)*43758.5453,Q=gt-Math.floor(gt),at=i+h/2+d/2,ct=i-h/2-d/2,wt=Q*10-Math.floor(Q*10);wt>.85?P(e-13,at):wt>.7?L(e-13,at,Math.PI):wt>.58?z(e-13,at,Math.PI):wt>.46?E(e-13,at,Math.PI):wt>.34?Z(e-13,at):wt>.24&&v(e-13,at);const vt=Q*100-Math.floor(Q*100);vt>.85?P(e+13,at):vt>.7?L(e+13,at,Math.PI):vt>.58?z(e+13,at,Math.PI):vt>.46?E(e+13,at,Math.PI):vt>.34?Z(e+13,at):vt>.24&&v(e+13,at);const Rt=Q*1e3-Math.floor(Q*1e3);Rt>.85?P(e-13,ct):Rt>.7?L(e-13,ct,0):Rt>.58?z(e-13,ct,0):Rt>.46?E(e-13,ct,0):Rt>.34?Z(e-13,ct):Rt>.24&&v(e-13,ct);const V=Q*1e4-Math.floor(Q*1e4);if(V>.85?P(e+13,ct):V>.7?L(e+13,ct,0):V>.58?z(e+13,ct,0):V>.46?E(e+13,ct,0):V>.34?Z(e+13,ct):V>.24&&v(e+13,ct),s%2===0&&!c){const _t=i+h/2+d/2,ft=Math.sin(e*5+_t*3)>0,S=ft?13821439:16766369,N=new Vt,q=this.getBaseHeight(e,_t);N.position.set(e,4.25+q,_t),n.add(N);const j=new tt(new H(.3,8.5,.3),this.streetlightPoleMat);j.position.y=0,j.castShadow=!0,N.add(j);const w=new tt(new H(.15,.15,1.3),this.streetlightPoleMat);w.position.set(0,4.15,-.65),w.castShadow=!0,N.add(w);const y=new tt(new H(.6,.2,.6),this.streetlightBulbMat);y.position.set(0,4.15,-1.3),N.add(y);const F=new tt(this.lightConeGeo,ft?this.lightConeMatLED:this.lightConeMatSodium);F.position.set(0,.25,-1.3),F.name="lightCone",N.add(F);const k=new tt(this.lightPoolGeo,(ft?this.ledGroundLightPoolMat:this.sodiumGroundLightPoolMat).clone());k.position.set(0,-3.89,-1.3),N.add(k);const X=new ze(new $e({map:this.slFlareTex,color:S,transparent:!0,opacity:.7,blending:xe,depthWrite:!1}));X.position.set(0,4.15,-1.3),X.scale.set(3.8,3.8,1),N.add(X);const $={x:e,y:7.5+q,z:_t-1.3,intensity:26,color:S,poolMesh:k,defaultOpacity:ft?.16:.22};if(a.push($),this.breakables.push({type:"streetlight",position:new R(e,q,_t),group:N,flares:[X],lights:[$],poolMeshes:[k],broken:!1,tileX:e,tileZ:i,velocity:new R,angularVelocity:new R}),Math.sin(e*1.2+_t*2.8)-Math.floor(Math.sin(e*1.2+_t*2.8))>.7){const K=i-h/2-d/2,lt=new Vt,Mt=this.getBaseHeight(e,K);lt.position.set(e,4.25+Mt,K),n.add(lt);const St=new tt(new H(.3,8.5,.3),this.streetlightPoleMat);St.position.y=0,St.castShadow=!0,lt.add(St);const it=new tt(new H(.15,.15,1.3),this.streetlightPoleMat);it.position.set(0,4.15,.65),it.castShadow=!0,lt.add(it);const Lt=new tt(new H(.6,.2,.6),this.streetlightBulbMat);Lt.position.set(0,4.15,1.3),lt.add(Lt);const Ct=new tt(this.lightConeGeo,ft?this.lightConeMatLED:this.lightConeMatSodium);Ct.position.set(0,.25,1.3),Ct.name="lightCone",lt.add(Ct);const Tt=new tt(this.lightPoolGeo,(ft?this.ledGroundLightPoolMat:this.sodiumGroundLightPoolMat).clone());Tt.position.set(0,-3.89,1.3),lt.add(Tt);const Et=new ze(new $e({map:this.slFlareTex,color:S,transparent:!0,opacity:.7,blending:xe,depthWrite:!1}));Et.position.set(0,4.15,1.3),Et.scale.set(3.8,3.8,1),lt.add(Et);const Pt={x:e,y:7.5+Mt,z:K+1.3,intensity:26,color:S,poolMesh:Tt,defaultOpacity:ft?.16:.22};a.push(Pt),this.breakables.push({type:"streetlight",position:new R(e,Mt,K),group:lt,flares:[Et],lights:[Pt],poolMeshes:[Tt],broken:!1,tileX:e,tileZ:i,velocity:new R,angularVelocity:new R})}}}else{const D=new Vt,B=new H(h,.2,this.tileSize,4,1,8);B.translate(0,.1,0),this.deformGeometryToHills(B,e,i);const O=new tt(B,this.asphaltMat);O.receiveShadow=!0,D.add(O);const W=new H(d,.35,this.tileSize,2,1,8);ui(W),W.translate(h/2+d/2,.175,0);const et=new H(d,.35,this.tileSize,2,1,8);ui(et),et.translate(-h/2-d/2,.175,0);const nt=ee([W,et]);this.deformGeometryToHills(nt,e,i);const rt=new tt(nt,this.concreteMat);rt.receiveShadow=!0,D.add(rt);const mt=new H(.15,.22,this.tileSize,1,1,8);mt.translate(-.2,.11,0);const J=new H(.15,.22,this.tileSize,1,1,8);J.translate(.2,.11,0);const ot=ee([mt,J]);this.deformGeometryToHills(ot,e,i),D.add(new tt(ot,this.yellowLineMat)),g(D),D.position.set(e,0,i),n.add(D);const gt=Math.sin(t*53.1198)*43758.5453,Q=gt-Math.floor(gt),at=e+h/2+d/2,ct=e-h/2-d/2,wt=Q*10-Math.floor(Q*10);wt>.85?P(ct,i-13):wt>.7?L(ct,i-13,-Math.PI/2):wt>.58?z(ct,i-13,-Math.PI/2):wt>.46?E(ct,i-13,-Math.PI/2):wt>.34?Z(ct,i-13):wt>.24&&v(ct,i-13);const vt=Q*100-Math.floor(Q*100);vt>.85?P(ct,i+13):vt>.7?L(ct,i+13,-Math.PI/2):vt>.58?z(ct,i+13,-Math.PI/2):vt>.46?E(ct,i+13,-Math.PI/2):vt>.34?Z(ct,i+13):vt>.24&&v(ct,i+13);const Rt=Q*1e3-Math.floor(Q*1e3);Rt>.85?P(at,i-13):Rt>.7?L(at,i-13,Math.PI/2):Rt>.58?z(at,i-13,Math.PI/2):Rt>.46?E(at,i-13,Math.PI/2):Rt>.34?Z(at,i-13):Rt>.24&&v(at,i-13);const V=Q*1e4-Math.floor(Q*1e4);if(V>.85)P(at,i+13);else if(V>.7)L(at,i+13,Math.PI/2);else if(V>.58)z(at,i+13,Math.PI/2);else if(V>.46)E(at,i+13,Math.PI/2);else if(V>.34)Z(at,i+13);else if(V>.24&&(v(at,i+13),t%2===0&&!c)){const _t=e+h/2+d/2,ft=Math.sin(_t*5+i*3)>0,S=ft?13821439:16766369,N=new Vt,q=this.getBaseHeight(_t,i);N.position.set(_t,4.25+q,i),n.add(N);const j=[],w=new H(.3,8.5,.3);j.push(w);const y=new H(1.3,.15,.15);y.translate(-.65,4.15,0),j.push(y);const F=ee(j),k=new tt(F,this.streetlightPoleMat);k.castShadow=!0,N.add(k);const X=new tt(new H(.6,.2,.6),this.streetlightBulbMat);X.position.set(-1.3,4.15,0),N.add(X);const $=new tt(this.lightConeGeo,ft?this.lightConeMatLED:this.lightConeMatSodium);$.position.set(-1.3,.25,0),$.name="lightCone",N.add($);const ut=new tt(this.lightPoolGeo,(ft?this.ledGroundLightPoolMat:this.sodiumGroundLightPoolMat).clone());ut.position.set(-1.3,-3.89,0),N.add(ut);const K=new ze(new $e({map:this.slFlareTex,color:S,transparent:!0,opacity:.7,blending:xe,depthWrite:!1}));K.position.set(-1.3,4.15,0),K.scale.set(3.8,3.8,1),N.add(K);const lt={x:_t-1.3,y:7.5+q,z:i,intensity:26,color:S,poolMesh:ut,defaultOpacity:ft?.16:.22};if(a.push(lt),this.breakables.push({type:"streetlight",position:new R(_t,q,i),group:N,flares:[K],lights:[lt],poolMeshes:[ut],broken:!1,tileX:e,tileZ:i,velocity:new R,angularVelocity:new R}),Math.sin(_t*1.2+i*2.8)-Math.floor(Math.sin(_t*1.2+i*2.8))>.7){const St=e-h/2-d/2,it=new Vt,Lt=this.getBaseHeight(St,i);it.position.set(St,4.25+Lt,i),n.add(it);const Ct=[],Tt=new H(.3,8.5,.3);Ct.push(Tt);const Et=new H(1.3,.15,.15);Et.translate(.65,4.15,0),Ct.push(Et);const Pt=ee(Ct),Y=new tt(Pt,this.streetlightPoleMat);Y.castShadow=!0,it.add(Y);const xt=new tt(new H(.6,.2,.6),this.streetlightBulbMat);xt.position.set(1.3,4.15,0),it.add(xt);const Nt=new tt(this.lightConeGeo,ft?this.lightConeMatLED:this.lightConeMatSodium);Nt.position.set(1.3,.25,0),Nt.name="lightCone",it.add(Nt);const Ut=new tt(this.lightPoolGeo,(ft?this.ledGroundLightPoolMat:this.sodiumGroundLightPoolMat).clone());Ut.position.set(1.3,-3.89,0),it.add(Ut);const yt=new ze(new $e({map:this.slFlareTex,color:S,transparent:!0,opacity:.7,blending:xe,depthWrite:!1}));yt.position.set(1.3,4.15,0),yt.scale.set(3.8,3.8,1),it.add(yt);const G={x:St+1.3,y:7.5+Lt,z:i,intensity:26,color:S,poolMesh:Ut,defaultOpacity:ft?.16:.22};a.push(G),this.breakables.push({type:"streetlight",position:new R(St,Lt,i),group:it,flares:[yt],lights:[G],poolMeshes:[Ut],broken:!1,tileX:e,tileZ:i,velocity:new R,angularVelocity:new R})}}}if(M.length>0){const C=ee(M),D=new tt(C,this.streetlightPoleMat);D.castShadow=!0,n.add(D)}if(m.length>0){const C=ee(m),D=new tt(C,this.streetlightBulbMat);n.add(D)}if(p.length>0){const C=ee(p),D=new tt(C,this.trunkMat);D.castShadow=!0,n.add(D)}if(A.length>0){const C=ee(A),D=new tt(C,this.leafMat);D.castShadow=!0,n.add(D)}if(x.length>0){const C=ee(x),D=new tt(C,this.leafCherryMat);D.castShadow=!0,n.add(D)}if(b.length>0){const C=ee(b),D=new tt(C,this.leafAutumnMat);D.castShadow=!0,n.add(D)}if(I.length>0){const C=ee(I),D=new tt(C,this.newspaperBodyMat);D.castShadow=!0,D.receiveShadow=!0,n.add(D)}if(T.length>0){const C=ee(T),D=new tt(C,this.newspaperGlassMat);n.add(D)}if(_.length>0){const C=ee(_),D=new tt(C,this.newspaperPaperMat);n.add(D)}}function am(s,t,e,i,n,o,a){const r=Math.abs(s*17+t*23)%this.asphaltMaterials.length,l=this.asphaltMaterials[r],c=new H(this.tileSize,.2,this.tileSize,8,1,8);c.translate(e,.1,i),this.deformGeometryToHills(c,0,0);const h=Math.abs((s*.317+t*.713)%1),d=Math.abs((s*.893+t*.149)%1),u=c.attributes.uv;for(let _=0;_<u.count;_++)u.setXY(_,u.getX(_)+h,u.getY(_)+d);u.needsUpdate=!0;const f=new tt(c,l);f.receiveShadow=!0,n.add(f);const g=this.shortcutColumns.has(s),M=this.shortcutRows.has(t),m=Math.sin(s*12.9898+t*78.233)*43758.5453,p=m-Math.floor(m),A=(_,P,v,E,L)=>{const z=this.getBaseHeight(e+_,i+P),Z=new H(v,E,L);Z.translate(e+_,.35+z+E/2,i+P);const C=new tt(Z,this.doorMat);C.castShadow=!0,C.receiveShadow=!0,n.add(C),o.push({xMin:e+_-v/2,xMax:e+_+v/2,zMin:i+P-L/2,zMax:i+P+L/2,height:E})},x=(_,P)=>{const v=this.getBaseHeight(e+_,i+P),E=new H(1.4,2.2,1.4);E.translate(e+_,.35+v+1.1,i+P);const L=new tt(E,this.accessoryMat);L.castShadow=!0,L.receiveShadow=!0,n.add(L),o.push({xMin:e+_-.7,xMax:e+_+.7,zMin:i+P-.7,zMax:i+P+.7,height:2.2})},b=(_,P)=>{const v=this.getBaseHeight(e+_,i+P);if(Math.abs(v)>.1)return;const E=new H(1.6,1.6,1.6),L=new tt(E,this.cardboardMat);if(L.position.set(e+_,.35+v+.8,i+P),L.rotation.y=p*2,L.castShadow=!0,L.receiveShadow=!0,n.add(L),p>.45){const z=new H(1.2,1.2,1.2),Z=new tt(z,this.cardboardMat);Z.position.set(e+_+(p-.5)*.4,.35+v+1.6+.6,i+P+(p-.5)*.4),Z.rotation.y=(p+1)*3.5,Z.castShadow=!0,n.add(Z)}o.push({xMin:e+_-.9,xMax:e+_+.9,zMin:i+P-.9,zMax:i+P+.9,height:2.8})},I=(_,P)=>{const v=this.getBaseHeight(e+_,i+P);if(Math.abs(v)>.1)return;const E=2+Math.floor(p*2);for(let L=0;L<E;L++){const z=.8+L*.15,Z=new H(z,z,z),C=new tt(Z,this.trashBagMat),D=(L===0?0:L===1?.6:-.6)+(p-.5)*.2,B=(L===0?0:L===1?-.4:.5)+(p-.5)*.2;C.position.set(e+_+D,.35+v+z/2,i+P+B),C.rotation.set(p*2,p*3,p*1.5),C.castShadow=!0,n.add(C)}o.push({xMin:e+_-1.2,xMax:e+_+1.2,zMin:i+P-1.2,zMax:i+P+1.2,height:1.2})},T=(_,P)=>{const v=this.getBaseHeight(e+_,i+P);if(Math.abs(v)>.1)return;const E=new Vt,L=new H(.6,9.5,.6),z=new tt(L,this.woodPoleMat);z.position.y=4.75,z.castShadow=!0,z.receiveShadow=!0,E.add(z);const Z=new H(2.4,.3,.4),C=new tt(Z,this.woodPoleMat);C.position.set(0,8.5,0),C.castShadow=!0,E.add(C);const D=new H(.8,.5,.8),B=new tt(D,this.accessoryMat);B.position.set(0,8.1,0),E.add(B);const O=new H(.4,.3,.4),W=new tt(O,this.streetlightBulbMat);W.position.set(0,7.8,0),E.add(W);const et=new tt(this.lightConeGeo,this.lightConeMatSodium);et.position.set(0,3.9,0),et.name="lightCone",E.add(et);const nt=new ze(new $e({map:this.slFlareTex,color:16755268,transparent:!0,opacity:.7,blending:xe,depthWrite:!1}));nt.position.set(0,7.8,0),nt.scale.set(3.8,3.8,1),E.add(nt),E.position.set(e+_,.35+v,i+P),n.add(E);const rt=new tt(this.alleyLightPoolGeo,this.sodiumGroundLightPoolMat.clone());rt.position.set(e+_,.36+v,i+P),n.add(rt),a.push({x:e+_,y:8+v,z:i+P,intensity:15,color:16755268,poolMesh:rt,defaultOpacity:.35}),o.push({xMin:e+_-.4,xMax:e+_+.4,zMin:i+P-.4,zMax:i+P+.4,height:9.5})};g&&!M?(p<.5?(T(-13,-8),A(13,5,2.5,2.5,2.5)):(T(13,8),A(-13,-8,2.5,2.5,2.5)),p>.6?x(-13*(p<.5?-1:1),2):I(-13*(p<.5?-1:1),2),p>.3&&p<.7&&b(13*(p<.5?-1:1),-4)):M&&!g?(p<.5?(T(-8,-13),A(5,13,2.5,2.5,2.5)):(T(8,13),A(-8,-13,2.5,2.5,2.5)),p>.6?x(2,-13*(p<.5?-1:1)):I(2,-13*(p<.5?-1:1)),p>.3&&p<.7&&b(-4,13*(p<.5?-1:1))):g&&M&&(p<.5?(T(-13,13),I(13,-13)):(T(13,-13),I(-13,13)))}function rm(s,t,e,i,n,o,a){const r=`${s},${t}`;if(this.buildingGeoCache&&this.buildingGeoCache.has(r)){const Y=this.buildingGeoCache.get(r),xt=new Nr;xt.position.set(e,.35,i);const Nt=new Vt,Ut=new tt(Y.groundGeo,this.concreteMat);Ut.receiveShadow=!0,Nt.add(Ut);const yt=new tt(Y.facadeGeo,Y.bMat);if(yt.castShadow=!0,yt.receiveShadow=!0,Nt.add(yt),Y.windowGeo&&Nt.add(new tt(Y.windowGeo,this.windowDetailedMat)),Y.doorGeo&&Nt.add(new tt(Y.doorGeo,this.doorMat)),Y.accessoryGeo&&Nt.add(new tt(Y.accessoryGeo,this.accessoryMat)),Y.billboardGeo){const zt=new Ft({color:1118481,emissive:Y.billboardColor,emissiveIntensity:4});Nt.add(new tt(Y.billboardGeo,zt))}if(Y.beaconGeo){const zt=new Ft({color:16711680,emissive:16711680,emissiveIntensity:6});Nt.add(new tt(Y.beaconGeo,zt))}xt.addLevel(Nt,0);const G=new Vt,At=new tt(Y.groundGeo,this.concreteMat);At.receiveShadow=!0,G.add(At);const bt=new tt(Y.facadeGeo,Y.bMat);if(bt.castShadow=!0,bt.receiveShadow=!0,G.add(bt),Y.windowGeo&&G.add(new tt(Y.windowGeo,this.windowDetailedMat)),Y.billboardGeo){const zt=new Ft({color:1118481,emissive:Y.billboardColor,emissiveIntensity:4});G.add(new tt(Y.billboardGeo,zt))}if(Y.beaconGeo){const zt=new Ft({color:16711680,emissive:16711680,emissiveIntensity:6});G.add(new tt(Y.beaconGeo,zt))}xt.addLevel(G,280);const It=new Vt,Bt=new tt(Y.groundGeo,this.concreteMat);Bt.receiveShadow=!0,It.add(Bt);const qt=new tt(Y.facadeGeo,Y.bMat);It.add(qt),Y.windowGeo&&It.add(new tt(Y.windowGeo,this.windowDetailedMat)),xt.addLevel(It,400),n.add(xt),Y.lights&&Y.lights.forEach(zt=>{const $t=zt.poolMesh.clone();n.add($t),a.push({x:zt.x,y:zt.y,z:zt.z,intensity:zt.intensity,color:zt.color,poolMesh:$t,defaultOpacity:zt.defaultOpacity})}),o.push(Y.obstacle);return}const l=(Y,xt)=>!this.roadColumns.has(Y)&&!this.roadRows.has(xt)&&!this.isAlley(Y,xt),c=Math.sin(s*12.9898+t*78.233)*43758.5453,h=c-Math.floor(c),d=h>.8?4:h>.45?3:2,u=this.materials[Math.floor(h*this.materials.length)];let f=-14,g=14,M=-14,m=14;if(l(s-1,t))f=-20;else if(this.isAlley(s-1,t)){const Y=Math.sin((s-1)*12.9898+t*78.233)*43758.5453,xt=Y-Math.floor(Y);xt<.4?f=-19:xt<.7?f=-16:f=-13}else if(this.roadColumns.has(s-1)||this.roadRows.has(t)){const{rwX:Y}=this.getRoadWidthForGrid(s-1,t);Y===14&&h<.5&&(f=-19)}if(l(s+1,t))g=20;else if(this.isAlley(s+1,t)){const Y=Math.sin((s+1)*12.9898+t*78.233)*43758.5453,xt=Y-Math.floor(Y);xt<.4?g=19:xt<.7?g=16:g=13}else if(this.roadColumns.has(s+1)||this.roadRows.has(t)){const{rwX:Y}=this.getRoadWidthForGrid(s+1,t);Y===14&&h>.5&&(g=19)}if(l(s,t-1))M=-20;else if(this.isAlley(s,t-1)){const Y=Math.sin(s*12.9898+(t-1)*78.233)*43758.5453,xt=Y-Math.floor(Y);xt<.4?M=-19:xt<.7?M=-16:M=-13}else if(this.roadColumns.has(s)||this.roadRows.has(t-1)){const{rwZ:Y}=this.getRoadWidthForGrid(s,t-1);Y===14&&h<.5&&(M=-19)}if(l(s,t+1))m=20;else if(this.isAlley(s,t+1)){const Y=Math.sin(s*12.9898+(t+1)*78.233)*43758.5453,xt=Y-Math.floor(Y);xt<.4?m=19:xt<.7?m=16:m=13}else if(this.roadColumns.has(s)||this.roadRows.has(t+1)){const{rwZ:Y}=this.getRoadWidthForGrid(s,t+1);Y===14&&h>.5&&(m=19)}const p=g-f,A=m-M,x=(f+g)/2,b=(M+m)/2,I=this.getBaseHeight(e+x,i+b),T=Math.abs(I)<.1;let _=0;const P=[],v=[],E=[],L=[],z=[],Z=[],C=.8,D=C/2,B=.8,O=8+h*4,W=new H(p,O+15,A,Math.max(1,Math.round(p/2)),1,Math.max(1,Math.round(A/2)));if(W.translate(x,(O-15)/2,b),P.push(W),f>-20&&M>-20){const Y=new H(C,O+15,C);Y.translate(f+D,(O-15)/2,M+D),P.push(Y)}if(g<20&&M>-20){const Y=new H(C,O+15,C);Y.translate(g-D,(O-15)/2,M+D),P.push(Y)}if(f>-20&&m<20){const Y=new H(C,O+15,C);Y.translate(f+D,(O-15)/2,m-D),P.push(Y)}if(g<20&&m<20){const Y=new H(C,O+15,C);Y.translate(g-D,(O-15)/2,m-D),P.push(Y)}const et=new H(p+.5,B,A+.5,Math.max(1,Math.round(p/2)),1,Math.max(1,Math.round(A/2)));if(et.translate(x,O-B/2,b),P.push(et),m<20){if(T){const re=new H(2.2,4.2,.2,2,1,1);re.translate(x,2.1,m+.05),E.push(re)}const Y=6,xt=4.5,Nt=Ni(Y,xt,.1);Nt.translate(x-p/4,2.5,m+.05),v.push(Nt);const Ut=Ni(Y,xt,.1);Ut.translate(x+p/4,2.5,m+.05),v.push(Ut);const yt=5.8,G=1,At=new H(yt,G,.2,Math.max(1,Math.round(yt/2)),1,1);At.translate(x-p/4,5.4,m+.1),z.push(At);const bt=new H(yt,G,.2,Math.max(1,Math.round(yt/2)),1,1);bt.translate(x+p/4,5.4,m+.1),z.push(bt);const It=new H(p-2,.35,2,Math.max(1,Math.round((p-2)/2)),1,1);if(It.translate(x,6,m+1),L.push(It),p>=28&&T){const re=new H(1,1.6,1);re.translate(x-p/2+2.5,.8,m+2),L.push(re);const Be=new H(3.5,.2,1,3,1,1);Be.translate(x+p/2-4,.8,m+2),L.push(Be);const Cn=new H(.25,.8,1);Cn.translate(x+p/2-5.5,.4,m+2),L.push(Cn);const Zn=new H(.25,.8,1);Zn.translate(x+p/2-2.5,.4,m+2),L.push(Zn)}const Bt=new tt(this.storefrontLightPoolGeo,this.storefrontGroundLightPoolMat.clone()),qt=this.getBaseHeight(e+x-p/4,i+m+3);Bt.position.set(e+x-p/4,.36+qt,i+m+3),n.add(Bt);const zt=new tt(this.storefrontLightPoolGeo,this.storefrontGroundLightPoolMat.clone()),$t=this.getBaseHeight(e+x+p/4,i+m+3);zt.position.set(e+x+p/4,.36+$t,i+m+3),n.add(zt);const ie={x:e+x-p/4,y:1.8+qt,z:i+m+1.2,intensity:15,color:16772292,poolMesh:Bt,defaultOpacity:.3};a.push(ie);const kt={x:e+x+p/4,y:1.8+$t,z:i+m+1.2,intensity:15,color:16772292,poolMesh:zt,defaultOpacity:.3};a.push(kt)}if(M>-20&&T){const Y=new H(2.2,4.2,.2,2,1,1);Y.translate(x,2.1,M-.05),E.push(Y)}_+=O;const nt=f===-20?-20:f+1,rt=g===20?20:g-1,mt=M===-20?-20:M+1,J=m===20?20:m-1,ot=rt-nt,gt=J-mt,Q=(nt+rt)/2,at=(mt+J)/2,ct=15+h*30,wt=new H(ot,ct,gt,Math.max(1,Math.round(ot/2)),1,Math.max(1,Math.round(gt/2)));if(wt.translate(Q,_+ct/2,at),P.push(wt),nt>-20&&mt>-20){const Y=new H(C,ct,C);Y.translate(nt+D,_+ct/2,mt+D),P.push(Y)}if(rt<20&&mt>-20){const Y=new H(C,ct,C);Y.translate(rt-D,_+ct/2,mt+D),P.push(Y)}if(nt>-20&&J<20){const Y=new H(C,ct,C);Y.translate(nt+D,_+ct/2,J-D),P.push(Y)}if(rt<20&&J<20){const Y=new H(C,ct,C);Y.translate(rt-D,_+ct/2,J-D),P.push(Y)}const vt=new H(ot+.5,B,gt+.5,Math.max(1,Math.round(ot/2)),1,Math.max(1,Math.round(gt/2)));vt.translate(Q,_+ct-B/2,at),P.push(vt);const Rt=1.5,V=2;for(let Y=_+3;Y<_+ct-3;Y+=4.5)for(let xt=nt+3;xt<rt-3;xt+=4){if(J<20){const Nt=Ni(Rt,V,.1);Nt.translate(xt,Y,J+.05),v.push(Nt);const Ut=new H(Rt+.6,.28,.4);Ut.translate(xt,Y-V/2-.14,J+.2),P.push(Ut)}if(mt>-20){const Nt=Ni(Rt,V,.1);Nt.translate(xt,Y,mt-.05),v.push(Nt);const Ut=new H(Rt+.6,.28,.4);Ut.translate(xt,Y-V/2-.14,mt-.2),P.push(Ut)}}if(_+=ct,d>=3){const Y=f===-20?-20:f+2.5,xt=g===20?20:g-2.5,Nt=M===-20?-20:M+2.5,Ut=m===20?20:m-2.5,yt=xt-Y,G=Ut-Nt,At=(Y+xt)/2,bt=(Nt+Ut)/2,It=8+h*10,Bt=new H(yt,It,G,Math.max(1,Math.round(yt/2)),1,Math.max(1,Math.round(G/2)));if(Bt.translate(At,_+It/2,bt),P.push(Bt),Y>-20&&Nt>-20){const zt=new H(C,It,C);zt.translate(Y+D,_+It/2,Nt+D),P.push(zt)}if(xt<20&&Nt>-20){const zt=new H(C,It,C);zt.translate(xt-D,_+It/2,Nt+D),P.push(zt)}if(Y>-20&&Ut<20){const zt=new H(C,It,C);zt.translate(Y+D,_+It/2,Ut-D),P.push(zt)}if(xt<20&&Ut<20){const zt=new H(C,It,C);zt.translate(xt-D,_+It/2,Ut-D),P.push(zt)}const qt=new H(yt+.5,B,G+.5,Math.max(1,Math.round(yt/2)),1,Math.max(1,Math.round(G/2)));qt.translate(At,_+It-B/2,bt),P.push(qt);for(let zt=_+2;zt<_+It-2;zt+=4)for(let $t=Y+3;$t<xt-3;$t+=4){if(Ut<20){const ie=Ni(Rt,V,.1);ie.translate($t,zt,Ut+.05),v.push(ie);const kt=new H(Rt+.6,.28,.4);kt.translate($t,zt-V/2-.14,Ut+.2),P.push(kt)}if(Nt>-20){const ie=Ni(Rt,V,.1);ie.translate($t,zt,Nt-.05),v.push(ie);const kt=new H(Rt+.6,.28,.4);kt.translate($t,zt-V/2-.14,Nt-.2),P.push(kt)}}_+=It}if(d===4){const Y=f===-20?-20:f+4,xt=g===20?20:g-4,Nt=M===-20?-20:M+4,Ut=m===20?20:m-4,yt=xt-Y,G=Ut-Nt,At=(Y+xt)/2,bt=(Nt+Ut)/2,It=7+h*8,Bt=new H(yt,It,G,Math.max(1,Math.round(yt/2)),1,Math.max(1,Math.round(G/2)));Bt.translate(At,_+It/2,bt),P.push(Bt);const qt=new H(yt+.5,B,G+.5,Math.max(1,Math.round(yt/2)),1,Math.max(1,Math.round(G/2)));qt.translate(At,_+It-B/2,bt),P.push(qt);for(let zt=_+2;zt<_+It-2;zt+=3.8)for(let $t=Y+3;$t<xt-3;$t+=4)if(Ut<20){const ie=Ni(Rt,V,.1);ie.translate($t,zt,Ut+.05),v.push(ie);const kt=new H(Rt+.6,.28,.4);kt.translate($t,zt-V/2-.14,Ut+.2),P.push(kt)}_+=It}const _t=new H(3,2,3);if(_t.translate(x,_+1,b),L.push(_t),h>.45){const Y=new H(3.2,.18,1.8);Y.rotateX(Math.PI/8),Y.translate(x-3.5,_+.5,b),L.push(Y)}if(h>.6){const Y=new H(.3,3,.3);Y.translate(x-1.2,_+1.5,b-1.2),L.push(Y);const xt=new H(.3,3,.3);xt.translate(x+1.2,_+1.5,b+1.2),L.push(xt);const Nt=new H(2.4,2.4,2.4);Nt.translate(x,_+3.8,b),L.push(Nt)}if(h>.3){const Y=new H(.2,8,.2);Y.translate(x,_+4,b),L.push(Y);const xt=new H(.6,.6,.6);xt.translate(x,_+8,b),Z.push(xt)}const ft=this.billboardColors[Math.floor(h*this.billboardColors.length)];if(h>.3&&_>25&&m<20){const Nt=new H(10,6,.5,Math.max(1,Math.round(5)),1,1);Nt.translate(x,_-10,m+.3),z.push(Nt)}const S=new Nr;S.position.set(e,.35,i);const N=new H(this.tileSize,.35,this.tileSize,8,1,8);ui(N),N.translate(0,-.175,0),this.deformGeometryToHills(N,e,i);const q=ee(P);q.translate(0,I,0);const j=new Vt,w=new tt(N,this.concreteMat);w.receiveShadow=!0,j.add(w);const y=new tt(q,u);y.castShadow=!0,y.receiveShadow=!0,j.add(y),N.isCached=!0,q.isCached=!0;let F=null,k=null;if(v.length>0){const Y=ee(v);Y.translate(0,I,0),F=Y,F.isCached=!0,k=new tt(Y,this.windowDetailedMat),j.add(k)}let X=null;if(E.length>0){const Y=ee(E);Y.translate(0,I,0),X=Y,X.isCached=!0,j.add(new tt(Y,this.doorMat))}let $=null;if(L.length>0){const Y=ee(L);Y.translate(0,I,0),$=Y,$.isCached=!0,j.add(new tt(Y,this.accessoryMat))}let ut=null,K=null;if(z.length>0){const Y=ee(z);Y.translate(0,I,0),K=Y,K.isCached=!0;const xt=new Ft({color:1118481,emissive:ft,emissiveIntensity:4});ut=new tt(Y,xt),j.add(ut)}let lt=null,Mt=null;if(Z.length>0){const Y=ee(Z);Y.translate(0,I,0),Mt=Y,Mt.isCached=!0;const xt=new Ft({color:16711680,emissive:16711680,emissiveIntensity:6});lt=new tt(Y,xt),j.add(lt)}S.addLevel(j,0);const St=new Vt,it=new tt(N,this.concreteMat);it.receiveShadow=!0,St.add(it);const Lt=new tt(q,u);Lt.castShadow=!0,Lt.receiveShadow=!0,St.add(Lt),k&&St.add(new tt(k.geometry,k.material)),ut&&St.add(new tt(ut.geometry,ut.material)),lt&&St.add(new tt(lt.geometry,lt.material)),S.addLevel(St,280);const Ct=new Vt,Tt=new tt(N,this.concreteMat);Tt.receiveShadow=!0,Ct.add(Tt);const Et=new tt(q,u);Ct.add(Et),k&&Ct.add(new tt(k.geometry,k.material)),S.addLevel(Ct,400),n.add(S);const Pt={xMin:e+f,xMax:e+g,zMin:i+M,zMax:i+m,height:_};if(o.push(Pt),this.buildingGeoCache&&(this.buildingGeoCache.set(r,{groundGeo:N,facadeGeo:q,windowGeo:F,doorGeo:X,accessoryGeo:$,billboardGeo:K,billboardColor:ft,beaconGeo:Mt,bMat:u,obstacle:Pt,lights:[]}),this.buildingGeoCache.size>500)){for(const[Y,xt]of this.buildingGeoCache.entries())if(!this.loadedTiles.has(Y)){this.buildingGeoCache.delete(Y),xt.groundGeo&&xt.groundGeo.dispose(),xt.facadeGeo&&xt.facadeGeo.dispose(),xt.windowGeo&&xt.windowGeo.dispose(),xt.doorGeo&&xt.doorGeo.dispose(),xt.accessoryGeo&&xt.accessoryGeo.dispose(),xt.billboardGeo&&xt.billboardGeo.dispose(),xt.beaconGeo&&xt.beaconGeo.dispose();break}}}class lm{constructor(t){this.scene=t,this.tileSize=40;const e=Math.random()*1e4;this.mainRoadColumns=new Set,this.mainRoadRows=new Set,this.mainRoadColumns.add(0),this.mainRoadRows.add(0);let i=0;for(;i<1e3;){const g=Math.sin((i+e)*1.5)*43758.5453,M=g-Math.floor(g);i+=3+Math.floor(M*5),this.mainRoadColumns.add(i)}for(i=0;i>-1e3;){const g=Math.sin((i-e)*1.5)*43758.5453,M=g-Math.floor(g);i-=3+Math.floor(M*5),this.mainRoadColumns.add(i)}for(i=0;i<1e3;){const g=Math.sin((i+e)*2.7)*43758.5453,M=g-Math.floor(g);i+=3+Math.floor(M*5),this.mainRoadRows.add(i)}for(i=0;i>-1e3;){const g=Math.sin((i-e)*2.7)*43758.5453,M=g-Math.floor(g);i-=3+Math.floor(M*5),this.mainRoadRows.add(i)}this.shortcutColumns=new Set,this.shortcutRows=new Set;const n=Array.from(this.mainRoadColumns).sort((g,M)=>g-M);for(let g=0;g<n.length-1;g++){const M=n[g],m=n[g+1],p=m-M;if(p>=3){const A=Math.sin(M*12.9898+m*78.233)*43758.5453;if(A-Math.floor(A)<.2){const b=M+Math.floor(p/2);this.shortcutColumns.add(b)}}}const o=Array.from(this.mainRoadRows).sort((g,M)=>g-M);for(let g=0;g<o.length-1;g++){const M=o[g],m=o[g+1],p=m-M;if(p>=3){const A=Math.sin(M*53.1374+m*21.9427)*43758.5453;if(A-Math.floor(A)<.2){const b=M+Math.floor(p/2);this.shortcutRows.add(b)}}}this.roadColumns=new Set([...this.mainRoadColumns,...this.shortcutColumns]),this.roadRows=new Set([...this.mainRoadRows,...this.shortcutRows]),this.sortedColumnsArray=Array.from(this.roadColumns).sort((g,M)=>g-M),this.sortedRowsArray=Array.from(this.roadRows).sort((g,M)=>g-M);const a=J0();this.scene.environment=a,this.loadedTiles=new Map,this.buildingGeoCache=new Map,this.obstacles=[],this.spatialCellSize=40,this.obstacleGrid=new Map,this.renderRadius=6,this.asphaltMaterials=[],this.asphaltLocalCircles=[],this.tilePuddles=new Map;for(let g=0;g<8;g++){const M=g<4,m=Z0(M);this.asphaltMaterials.push(new Ft({map:m.map,roughness:1,metalness:1,roughnessMap:m.roughnessMap,metalnessMap:m.roughnessMap,bumpMap:m.roughnessMap,bumpScale:.18,envMapIntensity:.55})),this.asphaltLocalCircles.push(m.localCircles||[])}this.asphaltMat=this.asphaltMaterials[0];const r=j0();this.concreteMat=new Ft({map:r.map,roughness:.75,metalness:.05,bumpMap:r.roughnessMap,bumpScale:.08,envMapIntensity:.15}),this.yellowLineMat=new Ft({color:15051067,roughness:.6}),this.whiteLineMat=new Ft({color:14540253,roughness:.6}),this.streetlightPoleMat=new Ft({color:2237740,metalness:.8,roughness:.5}),this.streetlightBulbMat=new Ft({color:16774877,emissive:16764040,emissiveIntensity:3.5}),this.lightPoolGeo=new bi(64,64),this.lightPoolGeo.rotateX(-Math.PI/2),this.groundLightPoolTex=$0(),this.ledGroundLightPoolMat=new fe({map:this.groundLightPoolTex,color:11195647,transparent:!0,opacity:.26,blending:xe,depthWrite:!1}),this.sodiumGroundLightPoolMat=new fe({map:this.groundLightPoolTex,color:16758876,transparent:!0,opacity:.35,blending:xe,depthWrite:!1}),this.storefrontLightPoolGeo=new bi(24,24),this.storefrontLightPoolGeo.rotateX(-Math.PI/2),this.storefrontGroundLightPoolMat=new fe({map:this.groundLightPoolTex,color:16772292,transparent:!0,opacity:.3,blending:xe,depthWrite:!1,side:je});const l=document.createElement("canvas");l.width=64,l.height=128;const c=l.getContext("2d"),h=c.createImageData(64,128);for(let g=0;g<128;g++){const M=g/127;for(let m=0;m<64;m++){const p=m/63,A=Math.abs(p-.5),x=.15+M*.75,b=Math.max(0,1-A/x),I=Math.max(0,1-M),T=Math.pow(b,1.5)*Math.pow(I,3.2),_=(g*64+m)*4;h.data[_]=255,h.data[_+1]=255,h.data[_+2]=255,h.data[_+3]=Math.round(T*255)}}c.putImageData(h,0,0),this.lightConeTex=new Re(l);const d=new bi(13.5,7.8,1,1),u=d.clone();u.rotateY(Math.PI/2),this.lightConeGeo=ee([d,u]),this.lightConeMatLED=new fe({map:this.lightConeTex,color:11195647,transparent:!0,opacity:.22,blending:xe,depthWrite:!1,side:je}),this.lightConeMatSodium=new fe({map:this.lightConeTex,color:16758876,transparent:!0,opacity:.26,blending:xe,depthWrite:!1,side:je}),this.alleyLightPoolGeo=new bi(32,32),this.alleyLightPoolGeo.rotateX(-Math.PI/2),this.brickMat=new Ft({color:5910312,roughness:.8}),this.buildingConcreteMat=new Ft({color:7369594,roughness:.65}),this.slateMat=new Ft({color:3224895,roughness:.7}),this.sandstoneMat=new Ft({color:11180162,roughness:.85}),this.glassySlateMat=new Ft({color:1909289,metalness:.75,roughness:.25}),this.darkConcreteMat=new Ft({color:4671823,roughness:.7}),this.brickDarkMat=new Ft({color:4008743,roughness:.85}),this.materials=[this.brickMat,this.buildingConcreteMat,this.slateMat,this.sandstoneMat,this.glassySlateMat,this.darkConcreteMat,this.brickDarkMat],this.windowYellowMat=new Ft({color:16775910,emissive:16763750,emissiveIntensity:4.2,roughness:.2}),this.windowBlueMat=new Ft({color:15136767,emissive:3851263,emissiveIntensity:3.8,roughness:.2}),this.windowDarkMat=new Ft({color:1119002,roughness:.1,metalness:.9});const f=K0();this.windowDetailedMat=new Ft({map:f.map,roughness:.15,metalness:.2,emissive:16777215,emissiveMap:f.emissiveMap,emissiveIntensity:5.5}),this.doorMat=new Ft({color:4007962,roughness:.6}),this.accessoryMat=new Ft({color:3355443,metalness:.5}),this.dumpsterMat=new Ft({color:2047085,roughness:.8,metalness:.2}),this.cardboardMat=new Ft({color:10189402,roughness:.9}),this.trashBagMat=new Ft({color:1710618,roughness:.8}),this.woodPoleMat=new Ft({color:5059353,roughness:.9}),this.trunkMat=new Ft({color:5913896,roughness:.9}),this.leafMat=new Ft({color:3038238,roughness:.8}),this.leafCherryMat=new Ft({color:14709399,roughness:.8}),this.leafAutumnMat=new Ft({color:13923621,roughness:.8}),this.billboardColors=[16711765,65382,61695,16755200],this.benchWoodMat=new Ft({color:9132587,roughness:.7}),this.benchIronMat=new Ft({color:1118481,metalness:.8,roughness:.4}),this.phoneBoothFrameMat=new Ft({color:13378082,metalness:.6,roughness:.3}),this.phoneBoothGlassMat=new Ft({color:10083839,transparent:!0,opacity:.4,metalness:.9,roughness:.1}),this.phoneBoothScreenMat=new Ft({color:3851263,emissive:3851263,emissiveIntensity:3}),this.trashCanMat=new Ft({color:5592405,metalness:.7,roughness:.4}),this.trashCanLidMat=new Ft({color:2236962,roughness:.6}),this.hydrantRedMat=new Ft({color:13378082,roughness:.4,metalness:.6}),this.hydrantCapMat=new Ft({color:14526976,roughness:.5,metalness:.7}),this.newspaperBodyMat=new Ft({color:2051705,roughness:.5}),this.newspaperGlassMat=new Ft({color:15661055,transparent:!0,opacity:.4,metalness:.9,roughness:.1}),this.newspaperPaperMat=new Ft({color:15658734,roughness:.9}),this.tlRedOnMat=new fe({color:16711680}),this.tlRedOffMat=new Ft({color:3801088,roughness:.8}),this.tlYellowOnMat=new fe({color:16755200}),this.tlYellowOffMat=new Ft({color:3810560,roughness:.8}),this.tlGreenOnMat=new fe({color:65280}),this.tlGreenOffMat=new Ft({color:14848,roughness:.8}),this.tlHousingMat=new Ft({color:1118481,roughness:.5}),this.trafficLights=[],this.breakables=[],this.lightSources=[],this.activeLights=[],this.maxLights=36,this.initLightPool(),this.slFlareTex=Y0(),this.templates={},this.generateTemplates()}initLightPool(){this.lightPool=[],this.maxLights=36;for(let t=0;t<this.maxLights;t++){const e=new Ps(16766369,0,110,1.15);e.castShadow=!1,this.scene.add(e),this.lightPool.push(e)}}generateTemplates(){const t=new Vt,e=new tt(new H(.8,4,.8),this.trunkMat);e.position.y=2,e.castShadow=!0,t.add(e);const i=[];[{size:3.5,y:3.8},{size:2.8,y:4.8},{size:1.8,y:5.6}].forEach(_=>{const P=new H(_.size,_.size*.8,_.size);P.translate(0,_.y,0),i.push(P)});const o=ee(i),a=new tt(o,this.leafMat);a.castShadow=!0,t.add(a),this.templates.tree=t;const r=new Vt,l=new tt(new H(.8,3.2,.8),this.trunkMat);l.position.y=1.6,l.castShadow=!0,r.add(l);const c=[];[{sx:3.8,sy:3.2,sz:3.8,y:3.6},{sx:2.8,sy:2.4,sz:2.8,y:5}].forEach(_=>{const P=new H(_.sx,_.sy,_.sz);P.translate(0,_.y,0),c.push(P)});const d=ee(c),u=new tt(d,this.leafMat);u.castShadow=!0,u.receiveShadow=!0,r.add(u),this.templates.treeRoundGreen=r;const f=new Vt;f.add(e.clone());const g=new tt(o,this.leafCherryMat);g.castShadow=!0,f.add(g),this.templates.treeCherry=f;const M=new Vt;M.add(e.clone());const m=new tt(o,this.leafAutumnMat);m.castShadow=!0,M.add(m),this.templates.treeAutumn=M;const p=new Vt;p.add(l.clone());const A=new tt(d,this.leafCherryMat);A.castShadow=!0,A.receiveShadow=!0,p.add(A),this.templates.treeRoundCherry=p;const x=new Vt;x.add(l.clone());const b=new tt(d,this.leafAutumnMat);b.castShadow=!0,b.receiveShadow=!0,x.add(b),this.templates.treeRoundAutumn=x,this.templates.fireHydrant=this.createFireHydrantMesh(),this.templates.newspaperBox=this.createNewspaperBoxMesh(),this.templates.bench=this.createBenchMesh(),this.templates.phoneBooth=this.createPhoneBoothMesh(),this.templates.trashCan=this.createTrashCanMesh();const I=new Vt,T=new tt(new H(.3,8.5,.3),this.streetlightPoleMat);T.position.y=4.25,T.castShadow=!0,I.add(T),this.templates.streetlight=I}createFireHydrantMesh(){return Q0.call(this)}createNewspaperBoxMesh(){return tm.call(this)}getFadedMaterial(t,e){if(this.materialOpacityPool||(this.materialOpacityPool=new Map),!this.materialOpacityPool.has(t)){const n=[];for(let o=0;o<=10;o++){const a=t.clone();a.transparent=!0,a.opacity=o/10,n.push(a)}this.materialOpacityPool.set(t,n)}const i=Math.max(0,Math.min(10,Math.round(e*10)));return this.materialOpacityPool.get(t)[i]}update(t,e,i=0,n=[],o=.016){const a=Math.round(t/this.tileSize),r=Math.round(e/this.tileSize);let l=null,c=null,h=1/0;for(let T=a-this.renderRadius;T<=a+this.renderRadius;T++)for(let _=r-this.renderRadius;_<=r+this.renderRadius;_++){const P=`${T},${_}`;if(!this.loadedTiles.has(P)){const v=T-a,E=_-r,L=v*v+E*E;L<h&&(h=L,l=T,c=_)}}l!==null&&c!==null&&this.generateTile(l,c);for(const[T,_]of this.loadedTiles.entries())(Math.abs(_.gridX-a)>this.renderRadius||Math.abs(_.gridZ-r)>this.renderRadius)&&this.unloadTile(T,_);const d=Math.sin(i),u=Math.cos(i);for(const T of this.loadedTiles.values()){const _=T.posX-t,P=T.posZ-e,v=_*_+P*P;if(v<65*65)T.visible||(this.scene.add(T.group),T.visible=!0);else{const E=_*d+P*u,L=E>0||E*E<.1764*v;L&&!T.visible?(this.scene.add(T.group),T.visible=!0):!L&&T.visible&&(this.scene.remove(T.group),T.visible=!1)}}this._lightWorkBuf||(this._lightWorkBuf=[]);const f=560*560;let g=0;for(let T=0;T<this.lightSources.length;T++){const _=this.lightSources[T],P=_.x-t,v=_.z-e,E=P*P+v*v;if(_.poolMesh)if(E>=12100)_.poolMesh.material.opacity=_.defaultOpacity;else if(E<=2025)_.poolMesh.material.opacity=0;else{const z=(Math.sqrt(E)-45)/65,Z=z*z*(3-2*z);_.poolMesh.material.opacity=_.defaultOpacity*Z}E<f&&(_._distSq=E,this._lightWorkBuf[g++]=_)}for(let T=0;T<n.length;T++){const _=n[T],P=_.x-t,v=_.z-e;_._distSq=P*P+v*v,this._lightWorkBuf[g++]=_}let M=0;for(let T=0;T<g;T++){const _=this._lightWorkBuf[T],P=_.x-t,v=_.z-e,E=_._distSq,L=P*d+v*u;(E<65*65||L>0||L*L<.1764*E)&&(this._lightWorkBuf[M++]=_)}const m=M,p=Math.min(this.maxLights,m);for(let T=0;T<p;T++){let _=T,P=this._lightWorkBuf[T]._distSq;for(let v=T+1;v<m;v++){const E=this._lightWorkBuf[v]._distSq;E<P&&(P=E,_=v)}if(_!==T){const v=this._lightWorkBuf[T];this._lightWorkBuf[T]=this._lightWorkBuf[_],this._lightWorkBuf[_]=v}}const A=560,x=380;for(let T=0;T<this.maxLights;T++){const _=this.lightPool[T];if(T<m){const P=this._lightWorkBuf[T];_.position.set(P.x,P.y,P.z);const v=P.x-t,E=P.z-e,L=Math.sqrt(v*v+E*E);let z=P.intensity||0;if(L>x&&(z*=Math.max(0,1-(L-x)/(A-x))),P.poolMesh){if(!(L<45))if(L>110)z=0;else{const Z=(L-45)/65,C=Z*Z*(3-2*Z);z*=1-C}}else if(!(L<80))if(L>120)z=0;else{const Z=(L-80)/40,C=Z*Z*(3-2*Z);z*=1-C}_.intensity=z,_.color.setHex(P.color||16755258)}else _.intensity=0}const b=window.gameTime||0;this.trafficLights.forEach(T=>{const _=Ql(T.intersectionX,T.intersectionZ,b),P=T.axis==="x"?_.xLight:_.zLight;T._lastColor!==P&&(T._lastColor=P,T.redMesh.material=P==="red"?this.tlRedOnMat:this.tlRedOffMat,T.yellowMesh.material=P==="yellow"?this.tlYellowOnMat:this.tlYellowOffMat,T.greenMesh.material=P==="green"?this.tlGreenOnMat:this.tlGreenOffMat)});const I=2;for(const T of this.loadedTiles.values())T.isFading&&(T.fadeProgress===void 0&&(T.fadeProgress=0),T.fadeProgress+=o*I,T.fadeProgress>=1?(T.fadeProgress=1,T.isFading=!1,T.group.traverse(_=>{_.isMesh&&_._origMaterial&&(_.material=_._origMaterial,_._origMaterial=void 0)})):T.group.traverse(_=>{if(_.isMesh&&_._origMaterial)if(Array.isArray(_.material))_.material=_.material.map((P,v)=>{const E=_._origMaterial[v].opacity!==void 0?_._origMaterial[v].opacity:1;return this.getFadedMaterial(_._origMaterial[v],E*T.fadeProgress)});else{const P=_._origMaterial.opacity!==void 0?_._origMaterial.opacity:1;_.material=this.getFadedMaterial(_._origMaterial,P*T.fadeProgress)}}))}getRoadWidthForGrid(t,e){let i=26,n=26;const o=Math.sin(e*78.233)*43758.5453;o-Math.floor(o)>.6&&(n=14);const r=Math.sin(t*12.9898)*43758.5453;return r-Math.floor(r)>.6&&(i=14),{rwX:i,rwZ:n}}getBlockInfo(t,e){let i=0,n=0;for(let r=t;r>=-1e3;r--)if(this.roadColumns.has(r)){i=r;break}for(let r=t+1;r<=1e3;r++)if(this.roadColumns.has(r)){n=r;break}let o=0,a=0;for(let r=e;r>=-1e3;r--)if(this.roadRows.has(r)){o=r;break}for(let r=e+1;r<=1e3;r++)if(this.roadRows.has(r)){a=r;break}return{colLeft:i,colRight:n,rowTop:o,rowBottom:a,blockWidth:n-i,blockHeight:a-o,dx:t-i,dz:e-o}}isAlley(t,e){return this.mainRoadColumns.has(t)||this.mainRoadRows.has(e)?!1:this.shortcutColumns.has(t)||this.shortcutRows.has(e)}snapToNearestIntersection(t,e){const i=Math.round(t/this.tileSize),n=Math.round(e/this.tileSize);let o=0,a=1/0;for(let c=i-8;c<=i+8;c++)if(this.roadColumns.has(c)){const h=Math.abs(c-i);h<a&&(a=h,o=c)}let r=0,l=1/0;for(let c=n-8;c<=n+8;c++)if(this.roadRows.has(c)){const h=Math.abs(c-n);h<l&&(l=h,r=c)}return{x:o*this.tileSize,z:r*this.tileSize}}generateTile(t,e){const i=`${t},${e}`,n=new Vt,o=[],a=[],r=t*this.tileSize,l=e*this.tileSize,c=this.isAlley(t,e),h=this.roadColumns.has(t)||this.roadRows.has(e);if(c)this.buildAlleyTile(t,e,r,l,n,o,a);else if(h){this.buildRoadTile(t,e,r,l,n,o,a);const d=[],u=Math.abs(t*17+e*23)%this.asphaltMaterials.length,f=this.asphaltLocalCircles[u];if(f&&f.length>0){const g=Math.abs((t*.317+e*.713)%1),M=Math.abs((t*.893+e*.149)%1);let m=this.tileSize,p=this.tileSize;if(!(this.roadColumns.has(t)&&this.roadRows.has(e))){const{rwX:x,rwZ:b}=this.getRoadWidthForGrid(t,e);this.roadRows.has(e)?p=b:m=x}f.forEach(x=>{const b=x.x/1024,I=x.y/1024,T=(b-g+2)%1,_=(I+M)%1,P=T*m-m/2,v=_*p-p/2;d.push({x:r+P,z:l+v,rx:x.r/1024*m,rz:x.r/1024*p})})}this.tilePuddles.set(i,d)}else this.buildBuildingTile(t,e,r,l,n,o,a);n.traverse(d=>{d.isMesh&&d.material&&(Array.isArray(d.material)?(d._origMaterial=d.material,d.material=d.material.map(u=>this.getFadedMaterial(u,0))):(d._origMaterial=d.material,d.material=this.getFadedMaterial(d.material,0)))}),this.scene.add(n),this.loadedTiles.set(i,{group:n,obstacles:o,lights:a,posX:r,posZ:l,gridX:t,gridZ:e,visible:!0,fadeProgress:0,isFading:!0}),this.obstacles.push(...o);for(const d of o){const u=Math.floor(d.xMin/this.spatialCellSize),f=Math.floor(d.xMax/this.spatialCellSize),g=Math.floor(d.zMin/this.spatialCellSize),M=Math.floor(d.zMax/this.spatialCellSize);for(let m=u;m<=f;m++)for(let p=g;p<=M;p++){const A=`${m},${p}`;this.obstacleGrid.has(A)||this.obstacleGrid.set(A,[]),this.obstacleGrid.get(A).push(d)}}this.lightSources.push(...a)}unloadTile(t,e){e.visible&&this.scene.remove(e.group),e.group.traverse(a=>{a.isMesh&&(a.geometry&&a.geometry!==this.lightPoolGeo&&a.geometry!==this.storefrontLightPoolGeo&&a.geometry!==this.alleyLightPoolGeo&&a.geometry!==this.lightConeGeo&&!a.geometry.isCached&&a.geometry.dispose(),a._origMaterial&&(a.material=a._origMaterial,a._origMaterial=void 0))});const i=new Set(e.obstacles);this.obstacles=this.obstacles.filter(a=>!i.has(a));for(const a of e.obstacles){const r=Math.floor(a.xMin/this.spatialCellSize),l=Math.floor(a.xMax/this.spatialCellSize),c=Math.floor(a.zMin/this.spatialCellSize),h=Math.floor(a.zMax/this.spatialCellSize);for(let d=r;d<=l;d++)for(let u=c;u<=h;u++){const f=`${d},${u}`,g=this.obstacleGrid.get(f);if(g){const M=g.indexOf(a);M!==-1&&g.splice(M,1),g.length===0&&this.obstacleGrid.delete(f)}}}this.lightSources=this.lightSources.filter(a=>!e.lights.includes(a));const n=e.posX,o=e.posZ;this.trafficLights=this.trafficLights.filter(a=>a.tileX!==n||a.tileZ!==o),this.breakables=this.breakables.filter(a=>a.tileX!==n||a.tileZ!==o),this.tilePuddles.delete(t),this.loadedTiles.delete(t)}buildRoadTile(t,e,i,n,o,a,r){return om.call(this,t,e,i,n,o,a,r)}buildAlleyTile(t,e,i,n,o,a,r){return am.call(this,t,e,i,n,o,a,r)}spawnTemplateTree(t,e,i,n){return em.call(this,t,e,i,n)}createBenchMesh(){return im.call(this)}createPhoneBoothMesh(){return nm.call(this)}createTrashCanMesh(){return sm.call(this)}buildBuildingTile(t,e,i,n,o,a,r){return rm.call(this,t,e,i,n,o,a,r)}checkCollision(t,e,i=2.2){const n=this.spatialCellSize,o=Math.floor((t-i)/n),a=Math.floor((t+i)/n),r=Math.floor((e-i)/n),l=Math.floor((e+i)/n);this.checkId=(this.checkId||0)+1;const c=this.checkId,h=i*i;for(let d=o;d<=a;d++)for(let u=r;u<=l;u++){const f=this.obstacleGrid.get(`${d},${u}`);if(f)for(let g=0;g<f.length;g++){const M=f[g];if(M._lastCheckId===c||(M._lastCheckId=c,M.isRamp))continue;const m=Math.max(M.xMin,Math.min(t,M.xMax)),p=Math.max(M.zMin,Math.min(e,M.zMax)),A=t-m,x=e-p,b=A*A+x*x;if(b<h){const I=Math.sqrt(b);return{collision:!0,normalX:I>.001?A/I:1,normalZ:I>.001?x/I:0,overlap:i-I}}}}return{collision:!1}}isWetAt(t,e){const i=(M,m)=>{const p=`${M},${m}`,A=this.tilePuddles.get(p);if(!A||A.length===0)return!1;for(let x=0;x<A.length;x++){const b=A[x],I=t-b.x,T=e-b.z,_=b.rx*1.4,P=b.rz*1.4;if(I/_*(I/_)+T/P*(T/P)<1)return!0}return!1},n=Math.floor(t/this.tileSize+.5),o=Math.floor(e/this.tileSize+.5);if(!(this.roadColumns.has(n)||this.roadRows.has(o)))return!1;const{rwX:r,rwZ:l}=this.getRoadWidthForGrid(n,o),c=t-n*this.tileSize,h=e-o*this.tileSize;if(!(this.roadColumns.has(n)&&this.roadRows.has(o))){if(this.roadRows.has(o)){if(Math.abs(h)>l/2)return!1}else if(Math.abs(c)>r/2)return!1}if(i(n,o))return!0;const u=3;n*this.tileSize,o*this.tileSize;const f=this.tileSize/2-Math.abs(c),g=this.tileSize/2-Math.abs(h);if(f<u){const M=n+(c>0?1:-1);if(i(M,o))return!0}if(g<u){const M=o+(h>0?1:-1);if(i(n,M))return!0}return!1}getBaseHeight(t,e){if(!this.sortedColumnsArray||!this.sortedRowsArray||this.sortedColumnsArray.length<2||this.sortedRowsArray.length<2)return 0;const i=this.tileSize||40,n=t/i,o=e/i,a=(z,Z)=>{let C=0,D=z.length-1;for(;C<=D;){const B=C+D>>1;z[B]<Z?C=B+1:D=B-1}return C-1},r=a(this.sortedColumnsArray,n),l=a(this.sortedRowsArray,o),c=this.sortedColumnsArray.length,h=this.sortedRowsArray.length,d=Math.max(0,Math.min(c-2,r)),u=d+1,f=this.sortedColumnsArray[d],g=this.sortedColumnsArray[u],M=Math.max(0,Math.min(h-2,l)),m=M+1,p=this.sortedRowsArray[M],A=this.sortedRowsArray[m],x=z=>{let Z=0;for(let C=0;C<z.length;C++)Z=Z*31+z.charCodeAt(C)|0;return Math.abs(Z)%1e4/1e4},b=(z,Z)=>{if((z+Z)%2!==0)return 0;const C=`I,${z},${Z}`;if(x(C)<.3){const B=(z+Z)%4===0?1:-1,W=x(C+"sharp")<.45?12+x(C+"h")*4:7+x(C+"h")*3;return B*W}return 0},I=b(d,M),T=b(u,M),_=b(d,m),P=b(u,m),v=(n-f)/(g-f),E=(o-p)/(A-p);return(1-v)*(1-E)*I+v*(1-E)*T+(1-v)*E*_+v*E*P}deformGeometryToHills(t,e,i){const n=t.attributes.position;if(n){for(let o=0;o<n.count;o++){const a=n.getX(o),r=n.getY(o),l=n.getZ(o),c=e+a,h=i+l,d=this.getBaseHeight(c,h);n.setY(o,r+d)}n.needsUpdate=!0,t.computeVertexNormals()}}getGroundHeight(t,e){const i=this.getBaseHeight(t,e);let n=.5+i;const o=this.spatialCellSize||40,a=Math.floor(t/o),r=Math.floor(e/o),l=this.obstacleGrid.get(`${a},${r}`);if(l){for(const c of l)if(c.isRamp&&t>=c.xMin-.3&&t<=c.xMax+.3&&e>=c.zMin-.3&&e<=c.zMax+.3){let d=0;c.slopeType==="Z"?c.slopeDir===1?d=(e-c.zMin)/(c.zMax-c.zMin):d=(c.zMax-e)/(c.zMax-c.zMin):c.slopeType==="X"&&(c.slopeDir===1?d=(t-c.xMin)/(c.xMax-c.xMin):d=(c.xMax-t)/(c.xMax-c.xMin));const u=.5+i+Math.max(0,Math.min(1,d))*(c.height-.5);u>n&&(n=u)}}return n}alignMeshToTerrain(t,e,i,n=null,o=.016){const a=this.getGroundHeight(e.x,e.z),r=Math.max(0,e.y-a);let l=1;if(r>.85&&(l=1-Math.min(1,(r-.85)/1.15),l=l*l*(3-2*l)),n===!0&&(l=0),Fo.setFromAxisAngle(cm,i),l<=.001){const L=Math.min(1,18*o);t.quaternion.slerp(Fo,L);return}const c=Math.cos(i),h=Math.sin(i),d=.95,u=1.3,f=e.x-d*c+u*h,g=e.z-d*-h+u*c,M=this.getGroundHeight(f,g),m=e.x+d*c+u*h,p=e.z+d*-h+u*c,A=this.getGroundHeight(m,p),x=e.x-d*c-u*h,b=e.z-d*-h-u*c,I=this.getGroundHeight(x,b),T=e.x+d*c-u*h,_=e.z+d*-h-u*c,P=this.getGroundHeight(T,_);Io.set(f,M,g),Do.set(m,A,p),Uo.set(x,I,b),zo.set(T,P,_),jr.addVectors(Io,Do).multiplyScalar(.5),Zr.addVectors(Uo,zo).multiplyScalar(.5),Cs.subVectors(jr,Zr).normalize(),Kr.addVectors(Io,Uo).multiplyScalar(.5),Jr.addVectors(Do,zo).multiplyScalar(.5),Qr.subVectors(Jr,Kr),No.crossVectors(Cs,Qr).normalize(),tl.crossVectors(No,Cs).normalize(),el.makeBasis(tl,No,Cs),il.setFromRotationMatrix(el);const v=Fo.clone().slerp(il,l),E=Math.min(1,18*o);t.quaternion.slerp(v,E)}}const Io=new R,Do=new R,Uo=new R,zo=new R,jr=new R,Zr=new R,Cs=new R,Kr=new R,Jr=new R,Qr=new R,No=new R,tl=new R,el=new se,Fo=new Ie,il=new Ie,cm=new R(0,1,0);class hm{constructor(){this.position=new R(0,.5,0),this.velocity=new R(0,0,0),this.heading=0,this.angularVelocity=0,this.externalSpin=0,this.mass=1350,this.maxSpeed=110,this.engineForce=75,this.brakingForce=115,this.drag=.052,this.rollingResistance=.025,this.steeringAngle=0,this.maxSteerAngle=.58,this.steeringSpeed=5.2,this.gripNormal=18.5,this.gripDrift=3.6,this.isDrifting=!1,this.driftTraction=1,this.wheelSpin=0,this.length=4.4,this.width=2,this.suspensionRestLength=.82,this.suspensionStiffness=32e3,this.suspensionDamping=1800,this.inertiaPitch=2400,this.inertiaRoll=1e3,this.cgHeight=.45,this.pitchVelocity=0,this.rollVelocity=0,this.bodyRoll=0,this.bodyPitch=0,this.inSlipstream=!1,this.justCrashed=!1,this.lastWallImpactSpeed=0,this.lastWallImpactNormal=new R,this.gear=1,this.prevGear=1,this.rpm=1e3,this.shiftTimer=0,this.gearRatios=[0,3.9,2.5,1.8,1.35,1,.8],this.gearMaxSpeeds=[0,18,33,52,72,94,115],this.justUpshifted=!1,this.isScraping=!1,this.scrapeNormal=new R,this.velocityY=0,this.isAirborne=!1,this.rolloverTimer=0,this.rolloverSpin=0,this.airTime=0,this.stuntPitchRotated=0,this.stuntRollRotated=0,this.stuntYawRotated=0,this.prevAirPitch=0,this.prevAirRoll=0,this.prevAirHeading=0,this.trickNotification="",this.nitroLevel=.5,this.maxNitro=1,this._fwdVec=new R,this._rightVec=new R,this.isBoosting=!1,this.driftDuration=0}update(t,e,i){if(t<=0)return;let n=0;(e.a||e.arrowleft)&&(n=this.maxSteerAngle),(e.d||e.arrowright)&&(n=-this.maxSteerAngle),this.steeringAngle+=(n-this.steeringAngle)*this.steeringSpeed*t;const o=this._fwdVec.set(Math.sin(this.heading),0,Math.cos(this.heading)),a=this._rightVec.set(Math.cos(this.heading),0,-Math.sin(this.heading)),r=this.velocity.dot(o),l=this.velocity.dot(a),c=Math.abs(r),h=e[" "]||e.spacebar,d=e.w||e.arrowup,u=e.s||e.arrowdown;if(d&&c<12&&this.gear===1){const Q=e.shift||this.isBoosting?1:.65;this.wheelSpin+=(Q-this.wheelSpin)*5*t}else this.wheelSpin+=(0-this.wheelSpin)*4*t;if(h&&c>7)this.isDrifting=!0,this.driftTraction=Math.max(.1,this.driftTraction-4.5*t);else if(this.isDrifting){const Q=Math.sign(this.steeringAngle),at=Math.sign(l);Q===at&&Q!==0?this.driftTraction=Math.min(1,this.driftTraction+1.6*t):this.driftTraction=Math.min(1,this.driftTraction+.5*t),(c<4||this.driftTraction>.85&&Math.abs(l)<2)&&(this.isDrifting=!1)}else this.driftTraction=Math.min(1,this.driftTraction+2.5*t);const f=this.isBoosting?this.nitroLevel>0:this.nitroLevel>=.1,g=(e.shift||e.n||e.f)&&f&&r>3&&this.gear!=="R";if(this.isBoosting=g,this.isBoosting&&(this.nitroLevel=Math.max(0,this.nitroLevel-.28*t)),this.isDrifting&&c>9&&Math.abs(l)>2.5){this.driftDuration+=t;const Q=Math.min(2,Math.abs(l)/8),at=.075*t*Q;this.nitroLevel=Math.min(this.maxNitro,this.nitroLevel+at)}else this.driftDuration=0;if(u?r<1.5&&this.gear!=="R"&&(this.prevGear=this.gear,this.gear="R",this.shiftTimer=.15,this.justUpshifted=!1):d&&this.gear==="R"&&(this.prevGear=this.gear,this.gear=1,this.shiftTimer=.15,this.justUpshifted=!0),this.shiftTimer>0&&(this.shiftTimer-=t),this.gear!=="R"&&this.gear!=="N"&&this.shiftTimer<=0){let Q=this.gear;Q<6&&c>this.gearMaxSpeeds[Q]*.92?(this.prevGear=Q,this.gear=Q+1,this.shiftTimer=.18,this.justUpshifted=!0):Q>1&&c<this.gearMaxSpeeds[Q-1]*.78&&(this.prevGear=Q,this.gear=Q-1,this.shiftTimer=.15,this.justUpshifted=!1)}if(this.shiftTimer>0)this.rpm+=(1500-this.rpm)*12*t;else if(this.gear==="R"){const Q=c/15,at=1e3+Math.min(1,Q)*6e3;this.rpm+=(at-this.rpm)*10*t}else{const Q=this.gear,at=Q>1?this.gearMaxSpeeds[Q-1]*.8:0,ct=this.gearMaxSpeeds[Q],wt=(c-at)/(ct-at);let vt=1200+Math.max(0,Math.min(1,wt))*6300;(c>=ct*.98||this.wheelSpin>.4)&&(this.rpm>=7700?vt=7100:vt=7950),this.rpm+=(vt-this.rpm)*14*t}this.rpm=Math.max(1e3,Math.min(8e3,this.rpm));let M=0;if(this.shiftTimer<=0&&d){let Q=1;this.gear==="R"?Q=1.4:Q=this.gearRatios[this.gear]||1;const at=1-this.wheelSpin*.35,ct=this.inSlipstream?1.16:1;M+=this.engineForce*Q*at*ct,this.isBoosting&&(M*=1.85),this.rpm>7800&&(M*=.05)}u&&(r>1?(M-=this.brakingForce,Math.abs(this.steeringAngle)>.25&&(this.isDrifting=!0,this.driftTraction=Math.max(.3,this.driftTraction-2*t))):this.gear==="R"&&(r>-8&&r<2?M-=this.engineForce*4:M-=this.engineForce*1.5));const p=-(this.inSlipstream?this.drag*.6:this.drag)*r*Math.abs(r),A=-this.rollingResistance*r,x=M+p+A;this.velocity.addScaledVector(o,x/this.mass*100*t);let b=0,I=0;if(i&&typeof i.getGroundHeight=="function"&&!this.isAirborne){const at=i.getGroundHeight(this.position.x+o.x*1,this.position.z+o.z*1),ct=i.getGroundHeight(this.position.x-o.x*1,this.position.z-o.z*1);b=(at-ct)/(1*2);const wt=i.getGroundHeight(this.position.x+a.x*1,this.position.z+a.z*1),vt=i.getGroundHeight(this.position.x-a.x*1,this.position.z-a.z*1);I=(wt-vt)/(1*2);const Rt=u&&this.gear!=="R"||h,V=this.velocity.dot(o);Rt&&Math.abs(V)<.5?this.velocity.addScaledVector(o,-V):this.velocity.addScaledVector(o,-18*b*t),Rt&&Math.abs(l)<.5?this.velocity.addScaledVector(a,-l):this.velocity.addScaledVector(a,-18*I*t)}const T=Bs.lerp(this.gripDrift,this.gripNormal,this.driftTraction),_=-l*T;this.velocity.addScaledVector(a,_*t);const P=this.isBoosting?this.maxSpeed*1.35:this.maxSpeed;if(this.velocity.length()>P&&this.velocity.setLength(P),this.isAirborne&&(this.velocity.x*=Math.exp(-.15*t),this.velocity.z*=Math.exp(-.15*t),this.velocityY<-38&&(this.velocityY=-38)),c>.5){const Q=this.isDrifting?1.95:1,at=Math.min(1,r/8),ct=this.steeringAngle*at*Q;h&&Math.abs(this.steeringAngle)>.1?this.angularVelocity+=this.steeringAngle*3.5*t:this.angularVelocity=ct}else this.angularVelocity=0;this.heading+=(this.angularVelocity+this.externalSpin)*t,this.externalSpin*=Math.exp(-4.5*t),this.position.addScaledVector(this.velocity,t);const E=[{x:-.95,z:1.3},{x:.95,z:1.3},{x:-.95,z:-1.3},{x:.95,z:-1.3}],L=[.5,.5,.5,.5],z=[0,0,0,0],Z=Math.cos(this.heading),C=Math.sin(this.heading);let D=0,B=0;for(let Q=0;Q<4;Q++){const at=E[Q],ct=this.position.x+at.x*Z+at.z*C,wt=this.position.z-at.x*C+at.z*Z,vt=i&&typeof i.getGroundHeight=="function"?i.getGroundHeight(ct,wt):.5;L[Q]=vt;const Rt=at.z*b+at.x*I,V=vt-Rt,_t=this.position.y-at.z*this.bodyPitch-at.x*this.bodyRoll,ft=Math.max(0,V+this.suspensionRestLength-_t);z[Q]=ft;const S=this.velocityY-at.z*this.pitchVelocity-at.x*this.rollVelocity;if(ft>0){let N=this.suspensionStiffness*ft-this.suspensionDamping*S;N=Math.max(0,N),D+=N*-at.z,B+=N*-at.x}}const O=x/this.mass,W=-this.mass*O*this.cgHeight*3.5,et=-_*this.cgHeight*3.5,nt=this.isAirborne,rt=this.airTime,mt=z[0]+z[1]+z[2]+z[3],J=(L[0]+L[1]+L[2]+L[3])/4,ot=this.position.y-J;if(mt<=.001&&ot>1.35?(this.isAirborne=!0,this.airTime+=t):(this.isAirborne=!1,this.airTime=0),this.isAirborne&&this.airTime>.2){rt<=.2&&(this.stuntPitchRotated=0,this.stuntRollRotated=0,this.stuntYawRotated=0,this.prevAirPitch=this.bodyPitch,this.prevAirRoll=this.bodyRoll,this.prevAirHeading=this.heading);let Q=this.heading-this.prevAirHeading;for(;Q<-Math.PI;)Q+=Math.PI*2;for(;Q>Math.PI;)Q-=Math.PI*2;this.stuntPitchRotated+=Math.abs(this.bodyPitch-this.prevAirPitch),this.stuntRollRotated+=Math.abs(this.bodyRoll-this.prevAirRoll),this.stuntYawRotated+=Math.abs(Q),this.prevAirPitch=this.bodyPitch,this.prevAirRoll=this.bodyRoll,this.prevAirHeading=this.heading}if(this.rolloverTimer<=0){const at=this.position.y;if(ot<1.35){const vt=J+.58,Rt=18+Math.min(12,this.velocity.length()*.1);this.position.y=Bs.lerp(this.position.y,vt,1-Math.exp(-Rt*t)),this.velocityY=(this.position.y-at)/t}else this.velocityY+=-22*t,this.position.y+=this.velocityY*t;let ct=0,wt=0;this.isAirborne||(ct=(D+W)/this.inertiaPitch,wt=(B+et)/this.inertiaRoll),this.pitchVelocity+=ct*t,this.bodyPitch+=this.pitchVelocity*t,this.pitchVelocity*=Math.exp(-3*t),this.rollVelocity+=wt*t,this.bodyRoll+=this.rollVelocity*t,this.rollVelocity*=Math.exp(-3*t)}else this.velocityY+=-22*t,this.position.y+=this.velocityY*t,this.pitchVelocity=0,this.rollVelocity=0;if(this.isAirborne&&this.airTime>.2&&this.rolloverTimer<=0){let Q=0,at=0,ct=0;const wt=e[" "]||e.spacebar;(e.w||e.arrowup)&&(Q=3.2),(e.s||e.arrowdown)&&(Q=-3.2),wt?((e.a||e.arrowleft)&&(ct=3.6),(e.d||e.arrowright)&&(ct=-3.6)):((e.a||e.arrowleft)&&(at=-3.2),(e.d||e.arrowright)&&(at=3.2)),this.pitchVelocity+=Q*t,this.rollVelocity+=at*t,this.heading+=ct*t,this.pitchVelocity*=Math.exp(-2.2*t),this.rollVelocity*=Math.exp(-2.2*t);const vt=e.w||e.s||e.arrowup||e.arrowdown,Rt=!wt&&(e.a||e.d||e.arrowleft||e.arrowright);let V=0,_t=0;if(i&&typeof i.getGroundHeight=="function"){const S=i.getGroundHeight(this.position.x+o.x*1,this.position.z+o.z*1),N=i.getGroundHeight(this.position.x-o.x*1,this.position.z-o.z*1),q=(S-N)/(1*2),j=i.getGroundHeight(this.position.x+a.x*1,this.position.z+a.z*1),w=i.getGroundHeight(this.position.x-a.x*1,this.position.z-a.z*1),y=(j-w)/(1*2);V=Math.max(-.5,Math.min(.5,-q)),_t=Math.max(-.5,Math.min(.5,-y))}vt||(this.pitchVelocity+=(V-this.bodyPitch)*2.5*t),Rt||(this.rollVelocity+=(_t-this.bodyRoll)*2.5*t)}if(this.rolloverTimer<=0&&!this.isAirborne&&(this.bodyPitch=Math.max(-.4,Math.min(.4,this.bodyPitch)),this.bodyRoll=Math.max(-.5,Math.min(.5,this.bodyRoll))),nt&&!this.isAirborne&&rt>.2){for(;this.bodyPitch<-Math.PI;)this.bodyPitch+=Math.PI*2;for(;this.bodyPitch>Math.PI;)this.bodyPitch-=Math.PI*2;for(;this.bodyRoll<-Math.PI;)this.bodyRoll+=Math.PI*2;for(;this.bodyRoll>Math.PI;)this.bodyRoll-=Math.PI*2;let Q="",at=0,ct=0;if(this.stuntPitchRotated>=5.5){const V=Math.round(this.stuntPitchRotated/6.28),ft=this.pitchVelocity>0?"BACKFLIP":"FRONTFLIP";V>1?(Q=`DOUBLE ${ft}!`,at=1500,ct=1):(Q=`${ft}!`,at=500,ct=.5)}this.stuntRollRotated>=5.5&&(Math.round(this.stuntRollRotated/6.28)>1?(Q="DOUBLE BARREL ROLL!",at=2e3,ct=1):(Q="BARREL ROLL!",at=750,ct=.5)),this.stuntYawRotated>=5.5&&(Math.round(this.stuntYawRotated/6.28)>1?(Q="720 MEGA SPIN!",at=2500,ct=1):(Q="360 SPIN!",at=1e3,ct=.6)),this.stuntPitchRotated>=5.5&&this.stuntYawRotated>=5.5&&(Q="RODEO FLIP!",at=3e3,ct=1);const wt=Math.abs(this.bodyRoll),vt=Math.abs(this.bodyPitch),Rt=wt<.22&&vt<.22;if(Q!=="")if(Rt){this.trickNotification=`CLEAN LANDING: ${Q} (+${at} PTS)`,this.nitroLevel=Math.min(this.maxNitro,this.nitroLevel+ct);const V=this.velocity.length();this.velocity.setLength(Math.max(V,45))}else this.trickNotification=`LANDED: ${Q} (+${at} PTS)`,this.nitroLevel=Math.min(this.maxNitro,this.nitroLevel+ct*.5);else if(Rt&&rt>.8){this.trickNotification="CLEAN LANDING!";const V=this.velocity.length();this.velocity.setLength(Math.max(V,38))}}this.position.y<J&&(this.position.y=J,this.velocityY<-2?this.velocityY=-this.velocityY*.15:this.velocityY=0),this.rolloverTimer>0&&(this.rolloverTimer-=t,this.bodyRoll+=this.rolloverSpin*t,this.bodyPitch+=this.rolloverSpin*.3*t,this.rolloverSpin*=Math.exp(-2.2*t),this.velocity.multiplyScalar(Math.exp(-2*t)));const gt=i.checkCollision(this.position.x,this.position.z,2);if(gt.collision){this.position.x+=gt.normalX*gt.overlap,this.position.z+=gt.normalZ*gt.overlap;const Q=new R(gt.normalX,0,gt.normalZ),at=this.velocity.dot(Q);if(this.velocity.length()>4?(this.isScraping=!0,this.scrapeNormal=Q.clone()):this.isScraping=!1,at<0){this.velocity.addScaledVector(Q,-1.4*at),this.angularVelocity*=-.5,this.isDrifting=!1;const wt=-at;wt>5&&(this.lastWallImpactSpeed=wt,this.justCrashed=!0,this.lastWallImpactNormal.copy(Q))}}else this.isScraping=!1}reset(){this.position.set(0,.5,0),this.velocity.set(0,0,0),this.heading=0,this.angularVelocity=0,this.isDrifting=!1,this.driftTraction=1,this.wheelSpin=0,this.gear=1,this.prevGear=1,this.rpm=1e3,this.shiftTimer=0,this.justUpshifted=!1,this.isScraping=!1,this.scrapeNormal.set(0,0,0),this.externalSpin=0,this.velocityY=0,this.isAirborne=!1,this.rolloverTimer=0,this.rolloverSpin=0,this.airTime=0,this.pitchVelocity=0,this.rollVelocity=0,this.bodyRoll=0,this.bodyPitch=0,this.inSlipstream=!1,this.justCrashed=!1}}class dm{constructor(t,e,i,n,o){this.id=t,this.name=e,this.colorHex=i,this.position=n.clone(),this.spawnPos=n.clone(),this.velocity=new R,this.heading=0,this.angularVelocity=0,this.speed=0,this.navVariance=t*.37+Math.random()*1.8,this.cornerCutBias=.4+Math.random()*.6,this.alleyHunger=.3+Math.random()*.7,this.aggression=.8+Math.random()*.5,this.maxSpeedBase=(55+Math.random()*22)*o,this.maxSpeed=this.maxSpeedBase,this.accel=(28+Math.random()*10)*o,this.braking=55+Math.random()*20,this.drag=.018+Math.random()*.008,this.lineOffset=(Math.random()-.5)*10,this._lineOffsetTimer=Math.random()*6,this.meshGroup=null,this.wheels=null,this.steeringAngle=0,this.maxSteerAngle=.65,this.isDrifting=!1,this.isBoosting=!1,this.recoveryBoostTimer=0,this.currentIndex=0,this.lapCurrent=1,this.unorderedCleared=new Set,this.completed=!1,this.timeFinished=0,this.triggerRadius=32,this._currentPath=null,this._pathWptIdx=0,this._pathForCheckpoint=-1,this._pathForLap=-1,this._alleyCheckTimer=0,this._injectedAlleyPt=null,this._stuckTimer=0,this._longStuck=0,this._escapeTimer=0,this._escapeTargetHdg=0,this._dodgeSide=0,this._dodgeTimer=0,this._dodgeApply=0,this._prevPos=new R(n.x,n.y,n.z),this._recentDist=10,this._stuckAnchorPos=new R(n.x,n.y,n.z),this._stuckCheckTimer=2,this._isTrapped=!1,this.nitroLevel=.5+Math.random()*.5,this.isNitroBoosting=!1,this._donutTimer=0,this._donutDir=1,this._corridorOffset=0}update(t,e,i,n,o,a){if(this.debugLookahead=null,this.completed||!i.active){this.speed=Math.max(0,this.speed-this.braking*.4*t);const V=new R(Math.sin(this.heading),0,Math.cos(this.heading));this.velocity.copy(V).multiplyScalar(this.speed),this.position.addScaledVector(this.velocity,t);const _t=e&&typeof e.getGroundHeight=="function"?e.getGroundHeight(this.position.x,this.position.z):.5;this.position.y+=(_t-this.position.y)*12*t;return}if(t=Math.min(t,.05),this.recoveryBoostTimer=Math.max(0,this.recoveryBoostTimer-t),this._lineOffsetTimer-=t,this._lineOffsetTimer<=0){this._lineOffsetTimer=4+Math.random()*8;const V=10*this.cornerCutBias;this.lineOffset=(Math.random()-.5)*V}const{target:r,targetPos:l}=this._resolveTarget(i);if(!l){this.completed=!0,this.timeFinished=i.timeElapsed;return}if(i.playerPos){const V=i.checkpoints.length||1,_t=i.lapCurrent*V+i.currentIndex,ft=this.lapCurrent*V+this.currentIndex,S=_t-ft,N=S>0?1+Math.min(.3,S*.08):Math.max(.78,1+S*.06);this.maxSpeed=this.maxSpeedBase*N}if((!this._currentPath||this._pathForCheckpoint!==this.currentIndex||this._pathForLap!==this.lapCurrent)&&o&&this._computePath(o,l),o&&!this._escapeTimer&&(this._alleyCheckTimer-=t,this._alleyCheckTimer<=0&&(this._alleyCheckTimer=.6+Math.random()*.3,this._tryInjectAlley(e,l))),this._escapeTimer>0){this._escapeTimer-=t,this._tickEscape(t,e),this._applyWallPushback(e),this._checkCheckpoints(r,i,e),this._updateMesh(e,t);return}if(this._donutTimer>0){this._donutTimer-=t,this._tickDonut(t,e),this._applyWallPushback(e),this._checkCheckpoints(r,i,e),this._updateMesh(e,t);return}const h=this._getLookaheadPoint(e);h||((h==null?void 0:h.copy(l))??l.clone());const d=new R(Math.sin(this.heading),0,Math.cos(this.heading)),u=new R(Math.cos(this.heading),0,-Math.sin(this.heading)),f=e.isAlley?e.isAlley(Math.round(this.position.x/e.tileSize),Math.round(this.position.z/e.tileSize)):!1,g=f?0:this.lineOffset,M=h?h.clone().addScaledVector(u,g*.3):null,m=M&&!e.checkCollision(M.x,M.z,1.5).collision?M:h||l.clone();if(this._dodgeTimer-=t,this._dodgeTimer<=0&&this.speed>4){this._dodgeTimer=this.isNitroBoosting?.05:.1;const V=this._scanBestCorridor(d,u,e,n,i,f,a),_t=this.isNitroBoosting?.55:.35;this._corridorOffset+=(V-this._corridorOffset)*_t}const p=m.x-this.position.x,A=m.z-this.position.z;let x=Math.atan2(p,A)-this.heading;for(;x>Math.PI;)x-=Math.PI*2;for(;x<-Math.PI;)x+=Math.PI*2;const b=Math.max(0,1-(Math.abs(x)-.25)*2.5),I=m.clone().addScaledVector(u,this._corridorOffset*b),T=this.position.clone().lerp(I,.5),_=e.checkCollision(I.x,I.z,2).collision||e.checkCollision(T.x,T.z,2).collision?m:I;this.debugLookahead=_;const P=_.x-this.position.x,v=_.z-this.position.z;let E=Math.atan2(P,v);if(f){const V=e.checkCollision(this.position.x-u.x*2,this.position.z-u.z*2,1.2),_t=e.checkCollision(this.position.x-u.x*5,this.position.z-u.z*5,1.2),ft=e.checkCollision(this.position.x-u.x*8,this.position.z-u.z*8,1.4),S=e.checkCollision(this.position.x+u.x*2,this.position.z+u.z*2,1.2),N=e.checkCollision(this.position.x+u.x*5,this.position.z+u.z*5,1.2),q=e.checkCollision(this.position.x+u.x*8,this.position.z+u.z*8,1.4),j=V.collision?2:_t.collision?5:ft.collision?8:14,w=S.collision?2:N.collision?5:q.collision?8:14;E+=(w-j)*.07}let L=E-this.heading;for(;L>Math.PI;)L-=Math.PI*2;for(;L<-Math.PI;)L+=Math.PI*2;this._donutTimer<=0&&!this._escapeTimer&&Math.abs(L)>2.4&&this.speed<28&&(this._donutDir=Math.sign(L),this._donutTimer=.9+Math.random()*.5,this._stuckTimer=0);const z=1.9,Z=Math.max(-z,Math.min(z,L*3.2));this.angularVelocity+=(Z-this.angularVelocity)*16*t,this.heading+=this.angularVelocity*t,this.steeringAngle=Math.max(-this.maxSteerAngle,Math.min(this.maxSteerAngle,Z*.38));let C=this.maxSpeed;f&&(C=Math.min(C,22));const D=Math.abs(L);D>.4&&(C*=Math.max(.35,1-(D-.4)*1.1));const B=f?7:Math.max(14,this.speed*.45),O=f?1.8:2.6,W=this.position.clone().addScaledVector(d,B);if(e.checkCollision(W.x,W.z,O).collision){const V=f?9:Math.min(16,Math.max(5,this.speed*.25));C=Math.min(C,V)}const nt=this.position.clone().addScaledVector(d,f?5.5:Math.max(8,this.speed*.22));e.checkCollision(nt.x,nt.z,f?1.7:2.4).collision&&(C=Math.min(C,f?5:8));const rt=this.position.clone().addScaledVector(d,f?4:6);e.checkCollision(rt.x,rt.z,f?1.6:2.2).collision&&(C=0);let mt=1/0;const J=[];i.playerPos&&J.push(i.playerPos),i.aiRacers.forEach(V=>{V.id!==this.id&&J.push(V.position)}),n&&n.vehicles&&n.vehicles.forEach(V=>J.push(V.position)),a&&(a.cops&&a.cops.forEach(V=>J.push(V.position)),a.parkedCops&&a.parkedCops.forEach(V=>J.push(V.position)));for(const V of J){const _t=V.clone().sub(this.position),ft=_t.length();ft<20&&_t.normalize().dot(d)>.82&&ft<mt&&(mt=ft)}if(mt<12){const V=mt<5?0:(mt-5)*3.5;C=Math.min(C,V)}const ot=e.checkCollision(rt.x,rt.z,f?1.6:2.2).collision;this.isNitroBoosting?(this.nitroLevel=Math.max(0,this.nitroLevel-.25*t),(this.nitroLevel<=0||D>.35||this.speed<5||mt<18||this._stuckTimer>0||this._donutTimer>0||ot)&&(this.isNitroBoosting=!1)):(this.nitroLevel=Math.min(1,this.nitroLevel+(this.isDrifting?.15:.04)*t),D<.12&&this.speed>15&&this.nitroLevel>.25&&!this._escapeTimer&&!this._donutTimer&&this._stuckTimer===0&&!ot&&Math.random()<.03&&(this.isNitroBoosting=!0));const gt=this.recoveryBoostTimer>0&&this.speed<35,at=gt||this.isNitroBoosting?gt?this.accel*2.8:this.accel*1.85:this.accel;this.isNitroBoosting&&(C*=1.25),this.speed<C?this.speed+=at*t:this.speed-=Math.min(this.braking*.5,this.speed-C)*t,this.speed-=this.drag*this.speed*Math.abs(this.speed)*t,this.speed=Math.max(-8,Math.min(this.maxSpeed,this.speed)),this.velocity.set(Math.sin(this.heading)*this.speed,0,Math.cos(this.heading)*this.speed);const ct=this.position.distanceTo(this._prevPos);this._prevPos.copy(this.position);const wt=t>0?ct/t:0;if(this._recentDist+=(wt-this._recentDist)*1.5*t,this._stuckCheckTimer-=t,this._stuckCheckTimer<=0){this._stuckCheckTimer=2;const V=this.position.distanceTo(this._stuckAnchorPos);this._stuckAnchorPos.copy(this.position),this._isTrapped=V<4.5}if(this._recentDist<1||this._isTrapped?(this._stuckTimer+=t,this._longStuck+=t):this._stuckTimer=0,this._stuckTimer>1){this._beginEscape(e,u,f,o,l);return}if(this._longStuck>5.5){this._longStuck=0,this._stuckTimer=0,this._respawn(i,e);return}this.position.addScaledVector(this.velocity,t);const Rt=e&&typeof e.getGroundHeight=="function"?e.getGroundHeight(this.position.x,this.position.z):.5;this.position.y+=(Rt-this.position.y)*12*t,this._applyWallPushback(e),this._checkCheckpoints(r,i,e),this.isBoosting=gt||this.isNitroBoosting,this.isDrifting=D>.45&&this.speed>12,this._updateMesh(e,t)}_computePath(t,e){this._currentPath=t.findPath(this.position.x,this.position.z,e.x,e.z,this.navVariance),this._postProcessPath(t.world),this._pathWptIdx=0,this._pathForCheckpoint=this.currentIndex,this._pathForLap=this.lapCurrent}_postProcessPath(t){if(!this._currentPath||this._currentPath.length<3)return;const e=this._currentPath;for(let i=1;i<e.length-1;i++){const n=e[i-1],o=e[i],a=e[i+1];let r=n.x-o.x,l=n.z-o.z,c=a.x-o.x,h=a.z-o.z;const d=Math.sqrt(r*r+l*l),u=Math.sqrt(c*c+h*h);if(d<.001||u<.001)continue;r/=d,l/=d,c/=u,h/=u;let f=r+c,g=l+h;const M=Math.sqrt(f*f+g*g);if(M<.01)continue;if(f/=M,g/=M,r*c+l*h>-.95){const p=4+this.cornerCutBias*8,A=o.x+f*p,x=o.z+g*p;t.checkCollision(A,x,4).collision||(o.x=A,o.z=x)}}}_tryInjectAlley(t,e){if(!this._currentPath||this._pathWptIdx>=this._currentPath.length)return;const i=this._currentPath[this._pathWptIdx],o=new R().subVectors(i,this.position).length();if(o<15||o>120)return;const a=6;for(let r=1;r<=a;r++){const l=r/a,c=this.position.clone().lerp(i,l),h=Math.round(c.x/t.tileSize),d=Math.round(c.z/t.tileSize);if(t.isAlley&&t.isAlley(h,d)){const u=new R(h*t.tileSize,.5,d*t.tileSize);if(!t.checkCollision(u.x,u.z,2.2).collision){this._currentPath.splice(this._pathWptIdx,0,u);break}}}}_getLookaheadPoint(t){const e=this._currentPath;if(!e||e.length===0)return null;const i=(u,f)=>{const g=u.x-f.x,M=u.z-f.z;return Math.sqrt(g*g+M*M)};let n=this._pathWptIdx,o=i(this.position,e[n]);const a=Math.min(e.length,this._pathWptIdx+4);for(let u=this._pathWptIdx+1;u<a;u++){const f=i(this.position,e[u]);f<o&&(o=f,n=u)}for(n>this._pathWptIdx&&(this._pathWptIdx=n);this._pathWptIdx<e.length-1;){const u=e[this._pathWptIdx],f=i(this.position,u);if(f<12){this._pathWptIdx++;continue}if(f<35){const M=u.x-this.position.x,m=u.z-this.position.z,p=Math.sin(this.heading),A=Math.cos(this.heading);if(M*p+m*A<0){this._pathWptIdx++;continue}}const g=e[this._pathWptIdx+1];if(i(this.position,g)<f){this._pathWptIdx++;continue}break}let l=Math.max(14,Math.min(40,this.speed*.55)),c=this.position.x,h=this.position.z;for(let u=this._pathWptIdx;u<e.length;u++){const f=e[u],g=f.x-c,M=f.z-h,m=Math.sqrt(g*g+M*M);if(!(m<.01)){if(m>=l){const p=l/m;return new R(c+g*p,.5,h+M*p)}l-=m,c=f.x,h=f.z}}const d=e[e.length-1];if(t.checkCollision(d.x,d.z,3.5).collision)for(let u=e.length-2;u>=this._pathWptIdx;u--){const f=e[u];if(!t.checkCollision(f.x,f.z,3.5).collision)return f.clone()}return d.clone()}_scanBestCorridor(t,e,i,n,o,a,r){const l=[];o.playerPos&&l.push(o.playerPos),o.aiRacers.forEach(m=>{m.id!==this.id&&l.push(m.position)}),n&&(n.vehicles&&n.vehicles.forEach(m=>l.push(m.position)),n.parkedVehicles&&n.parkedVehicles.forEach(m=>l.push(m.position))),r&&(r.cops&&r.cops.forEach(m=>l.push(m.position)),r.parkedCops&&r.parkedCops.forEach(m=>l.push(m.position)));const c=a?[-4,-2,0,2,4]:[-9,-6,-3,0,3,6,9],h=Math.max(20,this.speed*.7),d=8,u=a?1.6:this.isNitroBoosting?3:2.4,f=5.5;let g=0,M=1/0;for(let m=0;m<c.length;m++){const p=c[m];let A=Math.abs(p)*.3;for(let x=1;x<=d;x++){const b=x/d,I=b*h,T=p*Math.min(1,b*1.8),_=this.position.x+t.x*I+e.x*T,P=this.position.z+t.z*I+e.z*T;if(i.checkCollision(_,P,u).collision){A+=8e3*(2-b);break}for(let v=0;v<l.length;v++){const E=l[v],L=_-E.x,z=P-E.z;if(L*L+z*z<f*f){A+=350*(1.5-b*.5);break}}}A<M&&(M=A,g=p)}return g}_beginEscape(t,e,i,n,o){let a=null;for(const r of[2.4,3.5,5,7]){const l=t.checkCollision(this.position.x,this.position.z,r);if(l.collision){a=new R(l.normalX,0,l.normalZ);break}}if(a){const r=a.dot(e);this._escapeTargetHdg=this.heading+(r>=0?-Math.PI/2:Math.PI/2)}else this._escapeTargetHdg=this.heading+Math.PI/2;for(;this._escapeTargetHdg>Math.PI;)this._escapeTargetHdg-=Math.PI*2;for(;this._escapeTargetHdg<-Math.PI;)this._escapeTargetHdg+=Math.PI*2;this.speed=0,this.velocity.set(0,0,0),this.angularVelocity=0,this.steeringAngle=0,this._escapeTimer=i?.85:1.35,this._stuckTimer=0,this.recoveryBoostTimer=1.5,this._isTrapped=!1,this._stuckCheckTimer=2,this._stuckAnchorPos.copy(this.position),n&&o&&this._computePath(n,o),this._tickEscape(0,t),this._applyWallPushback(t),this._updateMesh(t,.016)}_tickEscape(t,e){let i=this._escapeTargetHdg-this.heading;for(;i>Math.PI;)i-=Math.PI*2;for(;i<-Math.PI;)i+=Math.PI*2;const n=2.8;this.heading+=Math.sign(i)*Math.min(Math.abs(i),n*t),this._escapeTimer>.25?this.speed=-16:this.speed=0,this.velocity.set(Math.sin(this.heading)*this.speed,0,Math.cos(this.heading)*this.speed),this.position.addScaledVector(this.velocity,t);const o=e&&typeof e.getGroundHeight=="function"?e.getGroundHeight(this.position.x,this.position.z):.5;this.position.y+=(o-this.position.y)*12*t}_tickDonut(t,e){for(this.heading+=this._donutDir*3.2*t;this.heading>Math.PI;)this.heading-=Math.PI*2;for(;this.heading<-Math.PI;)this.heading+=Math.PI*2;const n=16;this.speed+=(n-this.speed)*4*t,this.speed=Math.min(this.speed,this.maxSpeed),this.velocity.set(Math.sin(this.heading)*this.speed,0,Math.cos(this.heading)*this.speed),this.position.addScaledVector(this.velocity,t);const o=e&&typeof e.getGroundHeight=="function"?e.getGroundHeight(this.position.x,this.position.z):.5;this.position.y+=(o-this.position.y)*12*t,this.isDrifting=!0,this.isBoosting=!1,this.steeringAngle=this._donutDir*this.maxSteerAngle,this.angularVelocity=this._donutDir*3.2}_applyWallPushback(t){const e=new R(Math.sin(this.heading),0,Math.cos(this.heading)),i=new R(Math.cos(this.heading),0,-Math.sin(this.heading)),n=t.checkCollision(this.position.x,this.position.z,3.5);if(n.collision&&!t.checkCollision(this.position.x,this.position.z,2).collision){const c=new R(n.normalX,0,n.normalZ).dot(i),h=Math.min(.4,n.overlap*.5);this.position.x+=n.normalX*h,this.position.z+=n.normalZ*h,this.heading-=c*.08;return}const o=t.checkCollision(this.position.x,this.position.z,2);if(!o.collision)return;this.position.x+=o.normalX*(o.overlap+.1),this.position.z+=o.normalZ*(o.overlap+.1);const a=new R(o.normalX,0,o.normalZ),r=this.velocity.dot(a);r<0&&this.velocity.addScaledVector(a,-r),this.speed>0&&e.dot(a)<-.4&&(this.speed*=.25),this._stuckTimer+=.18,this._longStuck+=.18}_respawn(t,e){const i=t.checkpoints;let n,o;if(t.mode==="unordered"){const l=[];if(i.forEach((h,d)=>{this.unorderedCleared.has(d)||l.push({cp:h,i:d})}),!l.length)return;const c=l[Math.floor(Math.random()*l.length)];n=c.i,o=c.cp}else n=Math.max(0,this.currentIndex-1),o=i[n];if(!o)return;let a=o.x,r=o.z;if(e.checkCollision(a,r,2.5).collision)t:for(const l of[6,10,16,24])for(let c=0;c<8;c++){const h=c/8*Math.PI*2,d=o.x+Math.cos(h)*l,u=o.z+Math.sin(h)*l;if(!e.checkCollision(d,u,2.5).collision){a=d,r=u;break t}}if(this.position.set(a,.5,r),this.velocity.set(0,0,0),this.speed=0,this.angularVelocity=0,this._stuckTimer=0,this._escapeTimer=0,this._longStuck=0,this.recoveryBoostTimer=1.5,this._isTrapped=!1,this._stuckCheckTimer=2,this._stuckAnchorPos.copy(this.position),this._prevPos.copy(this.position),this._recentDist=10,this._currentPath=null,t.mode!=="unordered"){this.currentIndex=n;const l=(n+1)%i.length,c=i[l];c&&(this.heading=Math.atan2(c.x-a,c.z-r))}}_resolveTarget(t){const e=t.checkpoints;let i=null,n=null;if(t.mode==="unordered"){let o=1/0;e.forEach((a,r)=>{if(!this.unorderedCleared.has(r)){const l=(a.x-this.position.x)**2+(a.z-this.position.z)**2;l<o&&(o=l,i=a)}})}else this.currentIndex<e.length&&(i=e[this.currentIndex]);return i&&(n=new R(i.x,.5,i.z)),{target:i,targetPos:n}}_checkCheckpoints(t,e,i){if(!t)return;const n=this.position.x-t.x,o=this.position.z-t.z,a=Math.sqrt(n*n+o*o),r=Math.round(this.position.x/i.tileSize),l=Math.round(this.position.z/i.tileSize),c=i.isAlley&&i.isAlley(r,l)?65:this.triggerRadius;if(a>=c)return;const h=e.checkpoints;if(this._longStuck=0,e.mode==="unordered"){const d=h.findIndex(u=>u===t);d!==-1&&(this.unorderedCleared.add(d),this._currentPath=null,this.unorderedCleared.size===h.length&&(this.completed=!0,this.timeFinished=e.timeElapsed))}else this._currentPath=null,e.mode==="circuit"?this.currentIndex===h.length-1?this.lapCurrent<e.lapsTotal?(this.lapCurrent++,this.currentIndex=0):(this.completed=!0,this.timeFinished=e.timeElapsed):this.currentIndex++:this.currentIndex===h.length-1?(this.completed=!0,this.timeFinished=e.timeElapsed):this.currentIndex++}_updateMesh(t,e){this.meshGroup&&(this.meshGroup.position.copy(this.position),t&&typeof t.alignMeshToTerrain=="function"?t.alignMeshToTerrain(this.meshGroup,this.position,this.heading,!1,e||.016):this.meshGroup.rotation.y=this.heading)}}class fm{constructor(t){this.world=t,this.ts=t.tileSize,this._cols=Array.from(t.roadColumns).sort((e,i)=>e-i),this._rows=Array.from(t.roadRows).sort((e,i)=>e-i),this._colIdx=new Map(this._cols.map((e,i)=>[e,i])),this._rowIdx=new Map(this._rows.map((e,i)=>[e,i]))}snapToNode(t,e){const i=this._bsNearest(this._cols,t/this.ts),n=this._bsNearest(this._rows,e/this.ts);return{gx:i,gz:n}}findPath(t,e,i,n,o=0){const a=this.snapToNode(t,e),r=this.snapToNode(i,n);if(a.gx===r.gx&&a.gz===r.gz)return[new R(i,.5,n)];const l=(x,b)=>`${x},${b}`,c=r.gx,h=r.gz,d=this.ts,u=(x,b)=>{const I=(x-c)*d,T=(b-h)*d;return Math.sqrt(I*I+T*T)},f=new Map,g=new Set,M=new Map,m=l(a.gx,a.gz);f.set(m,{gx:a.gx,gz:a.gz,g:0,f:u(a.gx,a.gz),parent:null}),M.set(m,0);const p=4e3;let A=0;for(;f.size>0&&A++<p;){let x=null,b=1/0;for(const[_,P]of f)P.f<b&&(b=P.f,x=_);const I=f.get(x);if(f.delete(x),g.add(x),I.gx===r.gx&&I.gz===r.gz)return this._reconstruct(I,i,n);const T=M.get(x)??0;for(const _ of this._neighbors(I.gx,I.gz,o)){const P=l(_.gx,_.gz);if(g.has(P))continue;const v=T+_.cost;v<(M.get(P)??1/0)&&(M.set(P,v),f.set(P,{gx:_.gx,gz:_.gz,g:v,f:v+u(_.gx,_.gz),parent:I}))}}return console.warn("[NavGraph] A* found no path, falling back to direct target"),[new R(i,.5,n)]}_reconstruct(t,e,i){const n=[];let o=t;for(;o;)n.unshift(new R(o.gx*this.ts,.5,o.gz*this.ts)),o=o.parent;return n.push(new R(e,.5,i)),n}_neighbors(t,e,i=0){const n=[],o=this._colIdx.get(t),a=this._rowIdx.get(e);return o===void 0||a===void 0||(o>0&&n.push(this._edge(t,e,this._cols[o-1],e,i)),o<this._cols.length-1&&n.push(this._edge(t,e,this._cols[o+1],e,i)),a>0&&n.push(this._edge(t,e,t,this._rows[a-1],i)),a<this._rows.length-1&&n.push(this._edge(t,e,t,this._rows[a+1],i))),n}_edge(t,e,i,n,o=0){const a=(i-t)*this.ts,r=(n-e)*this.ts,l=Math.sqrt(a*a+r*r),c=Math.round((t+i)/2),h=Math.round((e+n)/2),d=this.world.isAlley&&this.world.isAlley(c,h),u=o>0?1+Math.sin(i*o*5.1+n*o*3.7)*.3:1;return{gx:i,gz:n,cost:l*(d?.55:1)*Math.max(.5,u)}}_bsNearest(t,e){if(t.length===0)return 0;let i=0,n=t.length-1;for(;i<n;){const o=i+n>>1;t[o]<e?i=o+1:n=o}return i>0&&Math.abs(t[i-1]-e)<=Math.abs(t[i]-e)&&i--,t[i]}}class um{constructor(){this.active=!1,this.mode=null,this.checkpoints=[],this.currentIndex=0,this.lapsTotal=3,this.lapCurrent=1,this.unorderedCleared=new Set,this.timeElapsed=0,this.completed=!1,this.radius=32,this.aiRacers=[],this.worldEvents=[],this.maps={sprint:[{x:0,z:160},{x:160,z:160},{x:160,z:0},{x:320,z:0},{x:320,z:-160},{x:160,z:-160},{x:0,z:-160},{x:-160,z:-160},{x:-160,z:0}],circuit:[{x:0,z:160},{x:160,z:160},{x:160,z:0},{x:0,z:0}],unordered:[{x:0,z:160},{x:160,z:-160},{x:-160,z:160},{x:-160,z:-160},{x:160,z:160}],autocross:[{x:0,z:20},{x:-15,z:40},{x:15,z:60},{x:-15,z:80},{x:0,z:100},{x:20,z:120},{x:0,z:140}]}}generateRandomSprint(t,e,i=null){const n=Math.sin(e),o=Math.cos(e),a=Math.round(t.x/160)*160,r=Math.round(t.z/160)*160,l=Math.abs(n)>=Math.abs(o)?Math.sign(n)*160:0,c=Math.abs(o)>Math.abs(n)?Math.sign(o)*160:0,h=a+l,d=r+c,u=[];let f={x:h,z:d};u.push(f);const g=new Set;g.add(`${a},${r}`),g.add(`${h},${d}`);const M=.18;let m={x:l,z:c};const p=i||5+Math.floor(Math.random()*8),A=()=>{const x=Math.random();return x<.5?2:x<.8?3:4};for(let x=0;x<p;x++){const b=[],I=A(),T=160*I,_=[{x:1,z:0,kind:"straight"},{x:-1,z:0,kind:"side"},{x:0,z:1,kind:"straight"},{x:0,z:-1,kind:"side"},{x:1,z:1,kind:"diagonal"},{x:-1,z:1,kind:"diagonal"},{x:1,z:-1,kind:"diagonal"},{x:-1,z:-1,kind:"diagonal"}];for(const O of _){const W={x:f.x+O.x*T,z:f.z+O.z*T};if(g.has(`${W.x},${W.z}`))continue;const et={x:W.x-f.x,z:W.z-f.z};if(et.x===-m.x&&et.z===-m.z)continue;const rt=et.x*m.x+et.z*m.z;if(rt<0)continue;const J=Math.hypot(W.x-a,W.z-r)*M,ot=I*18,gt=rt+J+ot;b.push({n:W,score:gt,kind:O.kind,stepCount:I})}if(b.length===0)break;const P=b.filter(O=>O.kind==="diagonal"),v=b.filter(O=>O.kind==="straight"),E=b.filter(O=>O.kind==="side"),L=Math.random();let z=E;L<.4?z=P.length>0?P:v:L<.8&&(z=v.length>0?v:P),z.length===0&&(z=b),z.sort((O,W)=>W.score-O.score);const Z=z.slice(0,Math.max(1,Math.ceil(z.length/2))),C=Math.random()<.7?Z:z,B=C[Math.floor(Math.random()*C.length)].n;u.push(B),g.add(`${B.x},${B.z}`),m={x:B.x-f.x,z:B.z-f.z},f=B}return u}generateRandomCircuit(t=null){const i=[{x:0,z:1},{x:1,z:0},{x:0,z:-1},{x:-1,z:0}],n=t||6+Math.floor(Math.random()*5),o=[],a=new Set(["0,0"]);let r={x:0,z:0},l=0;for(let c=0;c<n;c++){const h=[];for(const g of[0,1,-1]){const M=((l+g)%4+4)%4,m=i[M],p={x:r.x+m.x*160,z:r.z+m.z*160},A=`${p.x},${p.z}`;if(!a.has(A)){const x=g===0?3:1;h.push({n:p,newDirIdx:M,weight:x})}}if(h.length===0)break;const d=h.reduce((g,M)=>g+M.weight,0);let u=Math.random()*d,f=h[0];for(const g of h)if(u-=g.weight,u<=0){f=g;break}r=f.n,l=f.newDirIdx,a.add(`${r.x},${r.z}`),o.push({x:r.x,z:r.z})}return o}generateRandomUnordered(t=null){const e=[],i=new Set;i.add("0,0");const n=t||5;for(;e.length<n;){const o=(Math.floor(Math.random()*5)-2)*160,a=(Math.floor(Math.random()*5)-2)*160,r=`${o},${a}`;i.has(r)||(i.add(r),e.push({x:o,z:a}))}return e}generateRandomAutocross(){const t=[];for(let i=1;i<=7;i++){const n=i*20*1,o=(Math.random()>.5?1:-1)*(8+Math.random()*6);t.push({x:o,z:n})}return t}startRace(t,e,i,n,o){this.active=!0,this.mode=t;const a=o&&o.checkpoints?o.checkpoints:null,r=o&&o.racers?o.racers:3;if(this.lapsTotal=o&&o.laps?o.laps:t==="circuit"?3:1,t==="sprint"){const g=i||new R(0,0,0),M=n!==void 0?n:0;this.checkpoints=this.generateRandomSprint(g,M,a)}else t==="circuit"?this.checkpoints=this.generateRandomCircuit(a):t==="unordered"?this.checkpoints=this.generateRandomUnordered():t==="autocross"?this.checkpoints=this.generateRandomAutocross():this.checkpoints=JSON.parse(JSON.stringify(this.maps[t]||this.maps.circuit));t!=="autocross"&&e&&typeof e.snapToNearestIntersection=="function"&&(this.checkpoints=this.checkpoints.map(g=>{const M=e.snapToNearestIntersection(g.x,g.z);return{x:M.x,z:M.z}})),this.currentIndex=0,this.lapCurrent=1,this.timeElapsed=0,this.completed=!1,this.unorderedCleared.clear();const l=i?i.x:0,c=i?i.z:0;let h=0;if(this.checkpoints&&this.checkpoints.length>0){const g=this.checkpoints[0];h=Math.atan2(g.x-l,g.z-c)}const d=(g,M)=>e&&typeof e.getGroundHeight=="function"?e.getGroundHeight(g,M):.5,u=[];for(let g=0;g<r;g++){const M=Math.floor(g/2),m=g%2===0?-1:1,p=g===2&&r===3?0:m*6;u.push({x:l+p,z:c-8-M*8})}const f=[3800852,16711807,8323327,16753920,65535,16766720,16711680,16777215];this.aiRacers=[];for(let g=0;g<r;g++){const M=1+Math.random()*.25;this.aiRacers.push(new dm(g+1,`Racer ${g+1}`,f[g%f.length],new R(u[g].x,d(u[g].x,u[g].z),u[g].z),M))}this.aiRacers.forEach(g=>{g.heading=h}),this.navGraph=new fm(e),console.log(`Starting ${t} race with ${this.checkpoints.length} checkpoints.`)}update(t,e,i,n,o){if(!this.active||this.completed)return null;this.timeElapsed+=e,this.playerPos=t;const a=t.x,r=t.z;this.aiRacers.forEach(c=>{c.update(e,i,this,n,this.navGraph,o)});let l=!1;if(this.mode==="unordered"){if(this.checkpoints.forEach((c,h)=>{if(!this.unorderedCleared.has(h)){const d=c.x-a,u=c.z-r,f=d*d+u*u;let g=!1;if(i&&typeof i.isAlley=="function"){const m=Math.round(a/i.tileSize),p=Math.round(r/i.tileSize);i.isAlley(m,p)&&(g=!0)}const M=g?65:this.radius;f<M*M&&(this.unorderedCleared.add(h),l=!0,console.log(`Cleared unordered checkpoint ${h}`))}}),this.unorderedCleared.size===this.checkpoints.length)return this.completed=!0,this.active=!1,console.log(`Completed Unordered Race in ${this.timeElapsed.toFixed(2)}s`),{event:"finish",time:this.timeElapsed}}else{const c=this.checkpoints[this.currentIndex];if(!c)return console.warn(`Race error: Checkpoint at index ${this.currentIndex} is undefined. Ending race.`),this.completed=!0,this.active=!1,null;const h=c.x-a,d=c.z-r,u=h*h+d*d;let f=!1;if(i&&typeof i.isAlley=="function"){const M=Math.round(a/i.tileSize),m=Math.round(r/i.tileSize);i.isAlley(M,m)&&(f=!0)}const g=f?65:this.radius;if(u<g*g)if(l=!0,this.mode==="circuit"){if(this.currentIndex===this.checkpoints.length-1)return this.lapCurrent<this.lapsTotal?(this.lapCurrent++,this.currentIndex=0,console.log(`Lap ${this.lapCurrent}/${this.lapsTotal} started.`),{event:"lap",lap:this.lapCurrent}):(this.completed=!0,this.active=!1,console.log(`Completed Circuit Race in ${this.timeElapsed.toFixed(2)}s`),{event:"finish",time:this.timeElapsed});this.currentIndex++}else{if(this.currentIndex===this.checkpoints.length-1)return this.completed=!0,this.active=!1,console.log(`Completed Race in ${this.timeElapsed.toFixed(2)}s`),{event:"finish",time:this.timeElapsed};this.currentIndex++}}return l?{event:"checkpoint",nextIndex:this.currentIndex}:null}getActiveCheckpoint(){return!this.active||this.completed||this.mode==="unordered"?null:this.checkpoints[this.currentIndex]}calculateRankings(t){if(!this.active&&!this.completed)return[];const e=[];let i=this.currentIndex,n=this.lapCurrent,o=this.checkpoints[i],a=0;if(o){const l=o.x-t.x,c=o.z-t.z;a=Math.sqrt(l*l+c*c)}let r=0;if(this.mode==="unordered"){r=this.unorderedCleared.size;let l=9999;this.checkpoints.forEach((c,h)=>{if(!this.unorderedCleared.has(h)){const d=c.x-t.x,u=c.z-t.z,f=Math.sqrt(d*d+u*u);f<l&&(l=f)}}),a=l}return e.push({name:"Player",isPlayer:!0,completed:this.completed,score:this.completed?999999:this.mode==="unordered"?r*1e3-a:n*1e4+i*1e3-a,timeFinished:this.completed?this.timeElapsed:1/0}),this.aiRacers.forEach(l=>{let c=l.currentIndex,h=l.lapCurrent,d=this.checkpoints[c],u=0;if(d){const g=d.x-l.position.x,M=d.z-l.position.z;u=Math.sqrt(g*g+M*M)}let f=0;if(this.mode==="unordered"){f=l.unorderedCleared.size;let g=9999;this.checkpoints.forEach((M,m)=>{if(!l.unorderedCleared.has(m)){const p=M.x-l.position.x,A=M.z-l.position.z,x=Math.sqrt(p*p+A*A);x<g&&(g=x)}}),u=g}e.push({name:l.name,isPlayer:!1,completed:l.completed,score:l.completed?999999:this.mode==="unordered"?f*1e3-u:h*1e4+c*1e3-u,timeFinished:l.completed?l.timeFinished:1/0})}),e.sort((l,c)=>l.completed&&c.completed?l.timeFinished-c.timeFinished:l.completed?-1:c.completed?1:c.score-l.score),e}selectNewWorldEvent(t,e){const i=[],n=Array.from(t.roadColumns),o=Array.from(t.roadRows);n.forEach(r=>{o.forEach(l=>{if(t.roadColumns.has(r)&&t.roadRows.has(l)){const c=r*t.tileSize,h=l*t.tileSize,d=e?Math.hypot(c-e.x,h-e.z):250;d>80&&d<1800&&i.push({x:c,z:h})}})}),this.worldEvents=[];const a=["sprint","circuit"];if(i.length>0){const r=i.sort(()=>.5-Math.random()),l=Math.min(36,r.length);for(let c=0;c<l;c++){const h=a[Math.floor(Math.random()*a.length)];this.worldEvents.push({x:r[c].x,z:r[c].z,mode:h,laps:h==="circuit"?Math.floor(Math.random()*3)+2:1,checkpoints:Math.floor(Math.random()*8)+5,racers:Math.floor(Math.random()*5)+3})}}else{const r=Array.from(t.roadColumns),l=Array.from(t.roadRows);if(r.length>0&&l.length>0)for(let c=0;c<5;c++){const h=r[Math.floor(Math.random()*r.length)],d=a[c%a.length];this.worldEvents.push({x:h*t.tileSize,z:cz*t.tileSize,mode:d,laps:d==="circuit"?Math.floor(Math.random()*3)+2:1,checkpoints:Math.floor(Math.random()*8)+5,racers:Math.floor(Math.random()*5)+3})}}}}class pm{constructor(t){this.app=t,this.state="none",this.timer=0,this.duration=0,this._aiSpawnedMidRoute=!1,this.cameraStartPos=new R,this.cameraEndPos=new R,this.cameraStartLookAt=new R,this.cameraEndLookAt=new R,this.currentLookAt=new R,this.hudElement=document.createElement("div"),this.hudElement.id="cinematic-countdown",this.hudElement.style.position="absolute",this.hudElement.style.top="50%",this.hudElement.style.left="50%",this.hudElement.style.transform="translate(-50%, -50%)",this.hudElement.style.color="#ffffff",this.hudElement.style.fontFamily="'Outfit', 'Impact', sans-serif",this.hudElement.style.fontSize="120px",this.hudElement.style.fontWeight="900",this.hudElement.style.textShadow="0 0 20px rgba(255, 0, 0, 0.8), 0 0 40px rgba(0, 0, 0, 0.9)",this.hudElement.style.display="none",this.hudElement.style.pointerEvents="none",this.hudElement.style.zIndex="9999",document.body.appendChild(this.hudElement)}start(t){this.state==="none"&&(this.app.physics.speed=0,this.app.physics.velocity.set(0,0,0),this.app.physics.angularVelocity=0,this._aiSpawnedMidRoute=!1,this.transitionTo("cinematic"))}_snapY(t,e){const i=this.app.world;return i&&typeof i.getGroundHeight=="function"?i.getGroundHeight(t,e):.5}_getRaceStartPos(){return this.app._raceStartX!==void 0&&this.app._raceStartZ!==void 0?new R(this.app._raceStartX,0,this.app._raceStartZ):this.app.physics.position.clone()}_getStartHeading(t,e){const i=this.app.race.checkpoints;return i&&i.length>0?Math.atan2(i[0].x-t,i[0].z-e):0}_placeAndSnapAI(){const t=this._getRaceStartPos(),e=t.x,i=t.z,n=this._getStartHeading(e,i),o=Math.sin(n),a=Math.cos(n),r=Math.cos(n),l=-Math.sin(n),c=[{fwd:-8,right:-6},{fwd:-8,right:6},{fwd:-16,right:0}];this.app.race.aiRacers&&this.app.race.aiRacers.forEach((h,d)=>{const u=c[d]||{fwd:-8,right:0},f=e+o*u.fwd+r*u.right,g=i+a*u.fwd+l*u.right,M=this._snapY(f,g);h.position.set(f,M,g),h.spawnPos.set(f,M,g),h.heading=n,h.meshGroup&&(h.meshGroup.position.set(f,M,g),h.meshGroup.rotation.y=n)})}_getDestinationGameplayCamera(){const t=this._getRaceStartPos(),e=t.x,i=t.z,n=this._getStartHeading(e,i),o=this._snapY(e,i);let a=15,r=5.2,l=1.1;const c=this.app.cameraMode||"medium";c==="really_close"?(a=7,r=2.4,l=.95):c==="close"?(a=10.5,r=3.5,l=1):c==="medium"?(a=15,r=5.2,l=1.1):c==="far"?(a=22,r=7.5,l=1.3):c==="bonnet"&&(a=-2.2,r=1,l=1);const h=new R(-Math.sin(n)*a,r,-Math.cos(n)*a),d=new R(e,o,i).add(h),u=c==="bonnet"?15:4,f=new R(e,o,i).add(new R(Math.sin(n)*u,l,Math.cos(n)*u));return{pos:d,lookAt:f,fov:55}}transitionTo(t){this.state=t,this.timer=0;const e=this.app.physics.position,i=this.app.physics.heading;new R(Math.sin(i),0,Math.cos(i));const n=this._getRaceStartPos(),o=n.x,a=n.z,r=this._getStartHeading(o,a);if(this._snapY(o,a),t==="cinematic"){let l=[];this.app.race.navGraph&&(l=this.app.race.navGraph.findPath(e.x,e.z,n.x,n.z)),(!l||l.length<2)&&(l=[e.clone(),n.clone()]);const c=l.map(M=>new R(M.x,52,M.z)),h=this.app.camera.position.clone(),d=new R(0,0,-1).applyQuaternion(this.app.camera.quaternion);this.cameraStartLookAt=h.clone().addScaledVector(d,15),this.currentLookAt.copy(this.cameraStartLookAt);const u=this._getDestinationGameplayCamera(),f=[];f.push(h),c.forEach(M=>f.push(M)),f.push(u.pos),this.fullPathCurve=new v0(f);const g=Math.min(8,Math.max(3.5,c.length*.45));this.duration=1.3+g+1.6,this.cameraStartFov=this.app.camera.fov,this.cameraEndFov=u.fov,this.cameraStartLookAt=this.cameraStartLookAt.clone(),this.cameraEndLookAt=u.lookAt.clone(),this._aiSpawnedMidRoute=!1}else t==="countdown"?(this.duration=3,this.hudElement.style.display="block",this.updateCountdownText(),this.app.camHeading=r,this.app.cameraOverride=null):t==="none"&&(this.hudElement.style.display="none",this.app.clock.getDelta(),this.app.hudStatsEl&&(this.app.hudStatsEl.style.display="flex"),this.app.cancelBtnEl&&(this.app.cancelBtnEl.style.display="block"),this.app.showBanner("RACE STARTED","Follow the arrow!"),this.app.rebuildCheckpointBeacons(),this.app.physics&&(this.app.physics.nitroLevel=this.app.physics.maxNitro),this.app.race&&this.app.race.aiRacers&&this.app.race.aiRacers.forEach(l=>{l.nitroLevel=1}))}update(t){if(this.state==="none")return;this.timer+=t;const e=Math.min(1,this.timer/this.duration);this.app.physics.speed=0,this.app.physics.velocity.set(0,0,0),this.app.physics.angularVelocity=0;const i=new R(0,1,0),n=new Ie;if(this.app.race.aiRacers&&this.app.race.aiRacers.forEach(o=>{o.speed=0,o.velocity.set(0,0,0),o.position.copy(o.spawnPos),o.meshGroup&&(o.meshGroup.position.copy(o.spawnPos),n.setFromAxisAngle(i,o.heading),o.meshGroup.quaternion.copy(n))}),this.state==="cinematic"){const o=e*e*(3-2*e),a=this.fullPathCurve.getPointAt(o),r=this._getRaceStartPos();if(!this._aiSpawnedMidRoute&&e>=.5){this._aiSpawnedMidRoute=!0;const T=r.x,_=r.z,P=this._getStartHeading(T,_),v=this._snapY(T,_);this.app.physics.position.set(T,v,_),this.app.physics.heading=P,this.app.camHeading=P,this.app.buildAIMeshes(),this._placeAndSnapAI()}const l=Math.min(1,o+.08),h=this.fullPathCurve.getPointAt(l).clone();h.y=this._snapY(h.x,h.z)+1;let d;if(o<.25){const T=o/.25,_=T*T*(3-2*T);d=this.cameraStartLookAt.clone().lerp(h,_)}else if(o>.75){const T=(o-.75)/.25,_=T*T*(3-2*T);d=h.clone().lerp(this.cameraEndLookAt,_)}else d=h;let u=0;const f=Math.max(0,o-.015),g=Math.min(1,o+.015),M=this.fullPathCurve.getTangentAt(f),m=this.fullPathCurve.getTangentAt(g),p=Math.atan2(M.x,M.z);let x=Math.atan2(m.x,m.z)-p;x=Math.atan2(Math.sin(x),Math.cos(x)),u=Bs.clamp(-x*5.5,-.09,.09);const b=this.cameraStartFov+(this.cameraEndFov-this.cameraStartFov)*o,I=Date.now()*.0035;a.x+=Math.sin(I*1.6)*.12,a.y+=Math.cos(I*1.2)*.08,a.z+=Math.cos(I*1.8)*.12,d.x+=Math.sin(I*2.5)*.22,d.y+=Math.cos(I*2)*.16,d.z+=Math.cos(I*2.9)*.22,this.currentLookAt.lerp(d,1-Math.exp(-2.5*t)),this.app.cameraOverride={pos:a,lookAt:this.currentLookAt.clone(),fov:b,roll:u},e>=1&&this.transitionTo("countdown")}else this.state==="countdown"&&(this.updateCountdownText(),e>=1&&this.transitionTo("none"))}updateCountdownText(){const t=this.duration-this.timer;let e="",i="#ff3b30";t>2?(e="3",i="#ff3b30"):t>1?(e="2",i="#ff9500"):t>0?(e="1",i="#ffcc00"):(e="GO!",i="#4cd964"),this.hudElement.innerText=e,this.hudElement.style.color=i;const n=this.timer%1,o=1+Math.sin(n*Math.PI)*.15;this.hudElement.style.transform=`translate(-50%, -50%) scale(${o})`,this.hudElement.style.textShadow=`0 0 20px ${i}, 0 0 45px rgba(0, 0, 0, 0.95)`}}class Bo{constructor(t,e,i,n,o=null){this.id=t,this.type=e,this.colorHex=i,this.world=o,this.position=new R,this.heading=0,this.targetSpeed=14+Math.random()*8,this.speed=0,this.opacity=0,this.roadAxis="x",this.roadCoord=0,this.dirSign=1,this.lastIntersectionKey="",this.meshGroup=null,this.wheels=[],this.impactVelocity=new R,this.impactSpin=0,this.isRecovering=!1,this.isParked=!1,this.recycle(n,0,[],o)}getRoadWidth(){if(this.world&&typeof this.world.getRoadWidthForGrid=="function"){const i=Math.round(this.roadCoord/40),{rwX:n,rwZ:o}=this.world.getRoadWidthForGrid(i,i);return this.roadAxis==="x"?o:n}const t=Math.round(this.roadCoord/40),e=Math.floor(t/4);if(this.roadAxis==="x"){const i=Math.sin(e*78.233)*43758.5453;return i-Math.floor(i)>.6?14:26}else{const i=Math.sin(e*12.9898)*43758.5453;return i-Math.floor(i)>.6?14:26}}findParkingSpot(t,e,i=[],n=null){if(!e)return null;const o=Math.round(t.x/40),a=Math.round(t.z/40);for(let r=0;r<80;r++){const l=o+Math.floor(Math.random()*9)-4,c=a+Math.floor(Math.random()*9)-4,h=l*40,d=c*40,u=new R(h,.5,d),f=u.distanceTo(t);if(f<50||f>220||n&&f<140&&n.containsPoint(u))continue;const g=e.roadColumns&&e.roadColumns.has(l),M=e.roadRows&&e.roadRows.has(c),m=g&&M,p=typeof e.isAlley=="function"&&e.isAlley(l,c);if(m)continue;let A=h,x=d,b=0,I="x",T=0,_=1,P=!1;if(g&&!p){const{rwX:v}=e.getRoadWidthForGrid(l,c),E=v,L=Math.random()>.5?1:-1,z=Math.random()>.5?6:-6;A=h+L*(E/2-1.2),x=d+z,b=L>0?0:Math.PI,I="z",T=h,_=L,P=!0}else if(M&&!p){const{rwZ:v}=e.getRoadWidthForGrid(l,c),E=v,L=Math.random()>.5?1:-1,z=Math.random()>.5?6:-6;A=h+z,x=d+L*(E/2-1.2),b=L>0?Math.PI/2:-Math.PI/2,I="x",T=d,_=L,P=!0}else if(p){const v=e.shortcutColumns&&e.shortcutColumns.has(l),E=e.shortcutRows&&e.shortcutRows.has(c);if(v&&!E){const L=Math.random()>.5?1:-1,z=Math.random()>.5?6:-6;A=h+L*13,x=d+z,b=L>0?0:Math.PI,I="z",T=h,_=L,P=!0}else if(E&&!v){const L=Math.random()>.5?1:-1,z=Math.random()>.5?6:-6;A=h+z,x=d+L*13,b=L>0?Math.PI/2:-Math.PI/2,I="x",T=d,_=L,P=!0}}if(P){let v=!1;if(e.breakables)for(const L of e.breakables){if(L.broken)continue;const z=A-L.position.x,Z=x-L.position.z;if(z*z+Z*Z<25){v=!0;break}}if(v)continue;let E=!1;for(const L of i){if(!L)continue;const z=A-L.x,Z=x-L.z;if(z*z+Z*Z<49){E=!0;break}}if(E||e.checkCollision&&e.checkCollision(A,x,3.2).collision)continue;return{x:A,z:x,heading:b,roadAxis:I,roadCoord:T,dirSign:_}}}for(let r=0;r<80;r++){const l=o+Math.floor(Math.random()*13)-6,c=a+Math.floor(Math.random()*13)-6,h=l*40,d=c*40,u=new R(h,.5,d),f=u.distanceTo(t);if(f<40||f>300||n&&f<140&&n.containsPoint(u))continue;const g=e.roadColumns&&e.roadColumns.has(l),M=e.roadRows&&e.roadRows.has(c),m=g&&M,p=typeof e.isAlley=="function"&&e.isAlley(l,c);if(m)continue;let A=h,x=d,b=0,I="x",T=0,_=1,P=!1;if(g&&!p){const{rwX:v}=e.getRoadWidthForGrid(l,c),E=v,L=Math.random()>.5?1:-1,z=Math.random()>.5?6:-6;A=h+L*(E/2-1.2),x=d+z,b=L>0?0:Math.PI,I="z",T=h,_=L,P=!0}else if(M&&!p){const{rwZ:v}=e.getRoadWidthForGrid(l,c),E=v,L=Math.random()>.5?1:-1,z=Math.random()>.5?6:-6;A=h+z,x=d+L*(E/2-1.2),b=L>0?Math.PI/2:-Math.PI/2,I="x",T=d,_=L,P=!0}else if(p){const v=e.shortcutColumns&&e.shortcutColumns.has(l),E=e.shortcutRows&&e.shortcutRows.has(c);if(v&&!E){const L=Math.random()>.5?1:-1,z=Math.random()>.5?6:-6;A=h+L*13,x=d+z,b=L>0?0:Math.PI,I="z",T=h,_=L,P=!0}else if(E&&!v){const L=Math.random()>.5?1:-1,z=Math.random()>.5?6:-6;A=h+z,x=d+L*13,b=L>0?Math.PI/2:-Math.PI/2,I="x",T=d,_=L,P=!0}}if(P){let v=!1;if(e.breakables)for(const L of e.breakables){if(L.broken)continue;const z=A-L.position.x,Z=x-L.position.z;if(z*z+Z*Z<25){v=!0;break}}if(v)continue;let E=!1;for(const L of i){if(!L)continue;const z=A-L.x,Z=x-L.z;if(z*z+Z*Z<49){E=!0;break}}if(E||e.checkCollision&&e.checkCollision(A,x,3.2).collision)continue;return{x:A,z:x,heading:b,roadAxis:I,roadCoord:T,dirSign:_}}}return null}recycle(t,e=0,i=[],n=null,o=!1,a=[],r=null){n&&(this.world=n),this.impactVelocity&&this.impactVelocity.set(0,0,0),this.impactSpin=0,this.isParked=o;let l=!1,c=0,h=0,d="x",u=1,f=0,g=0;if(o&&n){const m=this.findParkingSpot(t,n,a,r);if(m)c=m.x,h=m.z,d=m.roadAxis,f=m.roadCoord,u=m.dirSign,g=m.heading,l=!0;else return}if(!l){const m=new R(Math.sin(e),0,Math.cos(e));for(let p=0;p<20;p++){const A=(Math.random()-.5)*(Math.PI*2/3),x=e+A,b=120+Math.random()*160,I=t.x+Math.sin(x)*b,T=t.z+Math.cos(x)*b,_=(rt,mt)=>{let J=0,ot=1/0;const gt=Math.round(rt/40),Q=Math.round(mt/40);for(let wt=gt-8;wt<=gt+8;wt++)if(n.roadColumns.has(wt)){const vt=Math.abs(wt-gt);vt<ot&&(ot=vt,J=wt)}let at=0,ct=1/0;for(let wt=Q-8;wt<=Q+8;wt++)if(n.roadRows.has(wt)){const vt=Math.abs(wt-Q);vt<ct&&(ct=vt,at=wt)}return{blockX:J*40,blockZ:at*40}};let P=Math.round(I/160)*160,v=Math.round(T/160)*160;if(n&&n.roadColumns&&n.roadRows){const rt=_(I,T);P=rt.blockX,v=rt.blockZ}d=Math.random()>.5?"x":"z",u=Math.random()>.5?1:-1;let E,L;if(d==="x"){f=v,E=P+(Math.random()-.5)*120;const rt=Math.round(f/40),mt=Math.floor(rt/4),J=Math.sin(mt*78.233)*43758.5453,Q=(J-Math.floor(J)>.6?14:26)===14?2.5:5;L=f+(u>0?-Q:Q)}else{f=P,L=v+(Math.random()-.5)*120;const rt=Math.round(f/40),mt=Math.floor(rt/4),J=Math.sin(mt*12.9898)*43758.5453,Q=(J-Math.floor(J)>.6?14:26)===14?2.5:5;E=f+(u>0?Q:-Q)}const z=Math.round(E/40),Z=Math.round(L/40);if(n&&typeof n.isAlley=="function"&&n.isAlley(z,Z))continue;const C=new R(E,.5,L),D=C.distanceTo(t);if(D<80||D>320)continue;const B=C.clone().sub(t).normalize(),O=m.dot(B);if(O<.15||O>.85&&D<140)continue;let W=Math.round(t.x/160)*160,et=Math.round(t.z/160)*160;if(n&&n.roadColumns&&n.roadRows){const rt=_(t.x,t.z);W=rt.blockX,et=rt.blockZ}if(P===W&&v===et&&D<100)continue;let nt=!1;for(const rt of i)if(C.distanceTo(rt.position)<60){nt=!0;break}if(!nt){c=E,h=L,l=!0;break}}if(!l){const p=200+Math.random()*80,A=t.x+Math.sin(e)*p,x=t.z+Math.cos(e)*p;if(d=Math.random()>.5?"x":"z",u=Math.random()>.5?1:-1,d==="x"){f=Math.round(x/160)*160,c=A;const b=Math.round(f/40),I=Math.floor(b/4),T=Math.sin(I*78.233)*43758.5453,v=(T-Math.floor(T)>.6?14:26)===14?2.5:5;h=f+(u>0?-v:v)}else{f=Math.round(A/160)*160,h=x;const b=Math.round(f/40),I=Math.floor(b/4),T=Math.sin(I*12.9898)*43758.5453,v=(T-Math.floor(T)>.6?14:26)===14?2.5:5;c=f+(u>0?v:-v)}}}const M=n&&typeof n.getGroundHeight=="function"?n.getGroundHeight(c,h):.5;this.position.set(c,M,h),this.roadAxis=d,this.dirSign=u,this.roadCoord=f,this.lastIntersectionKey="",l&&o?(this.heading=g,this.targetSpeed=0,this.speed=0):(this.heading=this.roadAxis==="z"?this.dirSign>0?0:Math.PI:this.dirSign>0?Math.PI/2:-Math.PI/2,this.targetSpeed=14+Math.random()*8,this.speed=this.targetSpeed*.5),this.opacity=0,this.isRecovering=!1,this.crashedAirborne=!1,this.velocityY=0,this.roll=0,this.pitch=0,this.rollVelocity=0,this.pitchVelocity=0}update(t,e,i=0,n=[],o=!1,a=null,r=[]){const l=this.position.distanceTo(e),c=Math.sin(i),h=Math.cos(i),d=this.position.x-e.x,u=this.position.z-e.z,f=Math.sqrt(d*d+u*u)||1,g=c*(d/f)+h*(u/f);let M=!0;a?(this._sphere||(this._sphere=new qn),this._sphere.set(this.position,6),M=a.intersectsSphere(this._sphere)):M=g>=.15;let m=1/0;r.forEach(_t=>{if(_t.active&&!_t.isParked){const ft=this.position.distanceTo(_t.position);ft<m&&(m=ft)}});const p=m<45,A=p?1-m/45:0;let x=1;if(o||r.length>0&&l>100&&!M)x=0;else if(!M&&l>50)x=0;else{const _t=g>=0?280:200,ft=g>=0?340:260;l>ft?x=0:l>_t&&(x=1-(l-_t)/(ft-_t))}if(this.opacity+=(x-this.opacity)*5*t,this.opacity=Math.max(0,Math.min(1,this.opacity)),!M&&l>50&&this.opacity<.05)return!0;if(g>=0){if(l>340&&this.opacity<.05)return!0}else if(l>260||l>200&&this.opacity<.05)return!0;if(this.isParked){const _t=Math.sin(this.heading),ft=Math.cos(this.heading),S=Math.cos(this.heading+Math.PI/2),N=Math.sin(this.heading+Math.PI/2),q=this.impactVelocity.x,j=this.impactVelocity.z,w=q*_t+j*ft,F=(q*S+j*N)*Math.exp(-7*t);this.position.x+=(_t*w+S*F)*t,this.position.z+=(ft*w+N*F)*t,this.crashedAirborne===void 0&&(this.crashedAirborne=!1),this.velocityY===void 0&&(this.velocityY=0),this.roll===void 0&&(this.roll=0),this.pitch===void 0&&(this.pitch=0),this.rollVelocity===void 0&&(this.rollVelocity=0),this.pitchVelocity===void 0&&(this.pitchVelocity=0);const k=this.world&&typeof this.world.getGroundHeight=="function"?this.world.getGroundHeight(this.position.x,this.position.z):.5;return this.crashedAirborne?this.position.y-k>.05||this.velocityY>.5?(this.isAirborne=!0,this.velocityY-=22*t,this.position.y+=this.velocityY*t,this.roll+=this.rollVelocity*t,this.pitch+=this.pitchVelocity*t,this.rollVelocity*=Math.exp(-3*t),this.pitchVelocity*=Math.exp(-3*t)):(this.position.y=k,this.velocityY<-2?this.velocityY=-this.velocityY*.18:(this.velocityY=0,this.isAirborne=!1,this.crashedAirborne=!1),this.roll+=(0-this.roll)*8*t,this.pitch+=(0-this.pitch)*8*t,this.rollVelocity=0,this.pitchVelocity=0):(this.position.y=k,this.isAirborne=!1,this.roll+=(0-this.roll)*8*t,this.pitch+=(0-this.pitch)*8*t,this.rollVelocity=0,this.pitchVelocity=0),this.impactVelocity.multiplyScalar(Math.exp(-2.2*t)),this.heading+=this.impactSpin*t,this.impactSpin*=Math.exp(-3.5*t),!1}let b=!1,I=!1,T=!1,_=Math.round(this.position.x/160)*160,P=Math.round(this.position.z/160)*160;if(this.world&&typeof this.world.snapToNearestIntersection=="function"){const _t=this.world.snapToNearestIntersection(this.position.x,this.position.z);_=_t.x,P=_t.z}const v=this.position.x-_,E=this.position.z-P,L=window.gameTime||0,z=Ql(_,P,L);if(this.roadAxis==="x"){const _t=-v*this.dirSign;if(_t>12&&_t<28){const ft=z.xLight;(ft==="red"||ft==="yellow")&&(b=!0)}}else{const _t=-E*this.dirSign;if(_t>12&&_t<28){const ft=z.zLight;(ft==="red"||ft==="yellow")&&(b=!0)}}const Z=Math.sin(this.heading),C=Math.cos(this.heading),D=Math.cos(this.heading),B=-Math.sin(this.heading),O=Math.max(12,this.speed*1.4);for(let _t=0;_t<n.length;_t++){const ft=n[_t],S=ft.position.x-this.position.x,N=ft.position.z-this.position.z,q=S*Z+N*C,j=S*D+N*B;if(q>.5&&q<O&&Math.abs(j)<4.5){I=!0;break}}if(!(Math.abs(v)<6&&Math.abs(E)<6)){let _t=0;if(this.roadAxis==="x"?_t=-v*this.dirSign:_t=-E*this.dirSign,_t>6&&_t<18)for(let ft=0;ft<n.length;ft++){const S=n[ft],N=Math.abs(S.position.x-_),q=Math.abs(S.position.z-P);if(N<8.5&&q<8.5){T=!0;break}}}let et=0,nt=0,rt=0,J=this.getRoadWidth()===14?2.5:5;p&&(J+=A*3.5),this.roadAxis==="x"?(et=this.dirSign>0?Math.PI/2:-Math.PI/2,nt=this.roadCoord+(this.dirSign>0?-J:J)-this.position.z,rt=Math.max(-.65,Math.min(.65,nt*.12))*-this.dirSign):(et=this.dirSign>0?0:Math.PI,nt=this.roadCoord+(this.dirSign>0?J:-J)-this.position.x,rt=Math.max(-.65,Math.min(.65,nt*.12))*this.dirSign);const gt=Math.abs(v)<12&&Math.abs(E)<12||this.isRecovering||Math.abs(et-this.heading)>.2;if(!this.isRecovering){let _t=b||I||T?0:this.targetSpeed;gt&&_t>0&&(_t=Math.min(_t,7.5)),p&&_t>0&&(_t*=1-A*.65);const ft=_t===0?12:4;this.speed+=(_t-this.speed)*ft*t,this.speed=Math.max(0,this.speed)}const Q=this.impactVelocity.lengthSq()>3;Q&&(this.isRecovering=!0);const at=Z*this.speed+this.impactVelocity.x,ct=C*this.speed+this.impactVelocity.z,wt=at*Z+ct*C,Rt=(at*D+ct*B)*Math.exp(-7*t);this.position.x+=(Z*wt+D*Rt)*t,this.position.z+=(C*wt+B*Rt)*t,this.crashedAirborne===void 0&&(this.crashedAirborne=!1),this.velocityY===void 0&&(this.velocityY=0),this.roll===void 0&&(this.roll=0),this.pitch===void 0&&(this.pitch=0),this.rollVelocity===void 0&&(this.rollVelocity=0),this.pitchVelocity===void 0&&(this.pitchVelocity=0);const V=this.world&&typeof this.world.getGroundHeight=="function"?this.world.getGroundHeight(this.position.x,this.position.z):.5;if(this.crashedAirborne?this.position.y-V>.05||this.velocityY>.5?(this.isAirborne=!0,this.velocityY-=22*t,this.position.y+=this.velocityY*t,this.roll+=this.rollVelocity*t,this.pitch+=this.pitchVelocity*t,this.rollVelocity*=Math.exp(-3*t),this.pitchVelocity*=Math.exp(-3*t)):(this.position.y=V,this.velocityY<-2?this.velocityY=-this.velocityY*.18:(this.velocityY=0,this.isAirborne=!1,this.crashedAirborne=!1),this.roll+=(0-this.roll)*8*t,this.pitch+=(0-this.pitch)*8*t,this.rollVelocity=0,this.pitchVelocity=0):(this.position.y=V,this.isAirborne=!1,this.roll+=(0-this.roll)*8*t,this.pitch+=(0-this.pitch)*8*t,this.rollVelocity=0,this.pitchVelocity=0),this.impactVelocity.multiplyScalar(Math.exp(-2.2*t)),this.heading+=this.impactSpin*t,this.impactSpin*=Math.exp(-3.5*t),this.isRecovering)if(this.impactVelocity.lengthSq()<1.5){let _t=et-this.heading;for(;_t<-Math.PI;)_t+=Math.PI*2;for(;_t>Math.PI;)_t-=Math.PI*2;let ft=Math.max(-.55,Math.min(.55,_t));Math.abs(nt)>4&&(ft=Math.max(-.55,Math.min(.55,nt*.08))*(this.roadAxis==="x"?-this.dirSign:this.dirSign));let S=!0;for(let q=0;q<n.length;q++){const j=n[q],w=j.position.x-this.position.x,y=j.position.z-this.position.z,F=w*Z+y*C,k=w*D+y*B;if(F>.5&&F<10&&Math.abs(k)<4.5){S=!1;break}}S?this.speed+=(5.5-this.speed)*2.5*t:this.speed+=(0-this.speed)*6*t,this.heading+=this.speed/4.4*ft*t;let N=et-this.heading;for(;N<-Math.PI;)N+=Math.PI*2;for(;N>Math.PI;)N-=Math.PI*2;Math.abs(N)<.18&&Math.abs(nt)<3.5&&(this.isRecovering=!1)}else this.speed+=(0-this.speed)*8*t;else if(!Q){let ft=et+rt-this.heading;for(;ft<-Math.PI;)ft+=Math.PI*2;for(;ft>Math.PI;)ft-=Math.PI*2;this.heading+=ft*4.5*t}if(Math.abs(v)<6&&Math.abs(E)<6){const _t=`${_},${P}`;if(this.lastIntersectionKey!==_t){this.lastIntersectionKey=_t;const ft=Math.round(_/40),S=Math.round(P/40),N=this.roadAxis==="x"?"z":"x",q=(K,lt)=>this.world&&typeof this.world.isAlley=="function"?this.world.isAlley(K,lt):!1;let j=!1,w=!1;N==="z"?(j=q(ft,S+1),w=q(ft,S-1)):(j=q(ft+1,S),w=q(ft-1,S));let y=!1;this.roadAxis==="x"?y=q(ft+this.dirSign,S):y=q(ft,S+this.dirSign);const F=[{axis:this.roadAxis,coord:this.roadCoord,dir:this.dirSign,weight:y?.05:.65},{axis:N,coord:N==="z"?_:P,dir:1,weight:j?.02:.3},{axis:N,coord:N==="z"?_:P,dir:-1,weight:w?.02:.3}],k=F.reduce((K,lt)=>K+lt.weight,0);let X=Math.random()*k,$=F[0];for(const K of F)if(X-=K.weight,X<=0){$=K;break}if($.axis!==this.roadAxis){this.roadAxis==="x"?this.position.x=_:this.position.z=P;let lt=($.axis==="z"?$.dir>0?0:Math.PI:$.dir>0?Math.PI/2:-Math.PI/2)-this.heading;for(;lt<-Math.PI;)lt+=Math.PI*2;for(;lt>Math.PI;)lt-=Math.PI*2;this.heading+=lt*.8}this.roadAxis=$.axis,this.roadCoord=$.coord,this.dirSign=$.dir}}return!1}}class mm{constructor(t,e=18){this.scene=t,this.maxVehicles=e,this.vehicles=[],this.parkedVehicles=[],this.maxParkedVehicles=12}init(t,e=null){const i=["cab","sedan","suv","sports","pickup","van"],n=[16573184,14737632,13378082,3033698,4868682,3800852,65535,15790325,14561635];for(let a=0;a<this.maxVehicles;a++){const r=i[Math.floor(Math.random()*i.length)],l=r==="cab"?16573184:n[Math.floor(Math.random()*n.length)],c=new Bo(a,r,l,t,e);this.vehicles.push(c)}const o=[];for(let a=0;a<this.maxParkedVehicles;a++){const r=i[Math.floor(Math.random()*i.length)],l=n[Math.floor(Math.random()*n.length)],c=new Bo(1e3+a,r,l,t,e);c.recycle(t,0,[],e,!0,o),this.parkedVehicles.push(c),o.push(c.position)}}update(t,e,i=0,n=[],o=null,a=null,r=[],l=0,c=[]){const h=Math.max(2,this.maxVehicles-l*3);if(this.vehicles.length<h){const f=["cab","sedan","suv","sports","pickup","van"],g=[16573184,14737632,13378082,3033698,4868682,3800852,65535,15790325,14561635],M=f[Math.floor(Math.random()*f.length)],m=M==="cab"?16573184:g[Math.floor(Math.random()*g.length)],p=new Bo(this.vehicles.length,M,m,e,a);p.recycle(e,i,n,a),this.vehicles.push(p)}o&&(this._frustum||(this._frustum=new Tn),this._projMatrix||(this._projMatrix=new se),this._projMatrix.multiplyMatrices(o.projectionMatrix,o.matrixWorldInverse),this._frustum.setFromProjectionMatrix(this._projMatrix));const d=o?this._frustum:null,u=[];e&&u.push({id:"player",position:e}),n.forEach(f=>{u.push({id:"ai_"+f.id,position:f.position})}),this.vehicles.forEach(f=>{u.push({id:"traffic_"+f.id,position:f.position})}),this.parkedVehicles.forEach(f=>{u.push({id:"parked_"+f.id,position:f.position})});for(let f=this.parkedVehicles.length-1;f>=0;f--){const g=this.parkedVehicles[f];if(g.update(t,e,i,[],!1,d,[])){const m=[];m.push(e),this.parkedVehicles.forEach(p=>{p!==g&&m.push(p.position)}),this.vehicles.forEach(p=>{m.push(p.position)}),c.forEach(p=>{p.active&&m.push(p.position)}),g.recycle(e,i,n,a,!0,m,d)}}for(let f=this.vehicles.length-1;f>=0;f--){const g=this.vehicles[f],M="traffic_"+g.id,m=u.filter(x=>x.id!==M);let p=!1;r.forEach(x=>{g.position.distanceTo(x.position)<65&&(p=!0)}),g.update(t,e,i,m,p,d,c)&&(this.vehicles.length>h?(g.meshGroup&&(g.meshGroup.traverse(x=>{x.geometry&&x.geometry.dispose()}),this.scene.remove(g.meshGroup)),this.vehicles.splice(f,1)):g.recycle(e,i,n,a))}this.vehicles.forEach((f,g)=>{f.id=g})}clear(){this.vehicles.concat(this.parkedVehicles).forEach(t=>{t.meshGroup&&(t.meshGroup.traverse(e=>{e.geometry&&e.geometry.dispose()}),this.scene.remove(t.meshGroup))}),this.vehicles=[],this.parkedVehicles=[]}}class nl{constructor(t,e,i=!1){this.id=t,this.position=e.clone(),this.velocity=new R,this.heading=0,this.angularVelocity=0,this.speed=0,this.active=!0,this.isParked=i,this.alerted=!i,this.opacity=0,this.maxSpeed=48,this.accel=24,this.braking=50,this.drag=.015,this.meshGroup=null,this.sirenTimer=0,this.sirenState=!1,this.sirenLight=null,this._currentPath=null,this._pathWptIdx=0,this._pathTimer=0,this._stuckTimer=0,this._escapeTimer=0,this._escapeTargetHdg=0}update(t,e,i,n,o,a,r,l=!0){if(!this.active)return;if(t=Math.min(t,.05),this.opacity=Math.min(1,this.opacity+t*1.5),this.baseAccel===void 0&&(this.baseAccel=this.accel),this.sirenTimer+=t*8,this.sirenState=Math.floor(this.sirenTimer)%2===0,this.isParked&&!this.alerted){this.speed=0,this.velocity.set(0,0,0),this.position.distanceTo(i)<45&&n>14&&(this.alerted=!0,this.isParked=!1),this._updateMesh();return}const c=this.position.distanceTo(i);let h=i,d=c,u=!1;const f=n<3||!l;if(f){const L=this.id%4*(Math.PI/2)+this.id%3*.2,z=7.2;this._circleTarget||(this._circleTarget=i.clone()),this._circleTarget.set(i.x+Math.sin(L)*z,i.y,i.z+Math.cos(L)*z),h=this._circleTarget,d=this.position.distanceTo(h),u=!0}if(f&&(d<2.2||c<6.5))if(this.speed>0){this.speed=Math.max(0,this.speed-this.braking*1.5*t),this.angularVelocity*=Math.exp(-6*t),this.velocity.set(Math.sin(this.heading)*this.speed,0,Math.cos(this.heading)*this.speed),this.position.addScaledVector(this.velocity,t),this._applyWallPushback(e),this._updateMesh();return}else{this.speed=0,this.velocity.set(0,0,0),this.angularVelocity=0,this._updateMesh();return}let g=u?h.clone():i.clone();if(this._escapeTimer>0){this._escapeTimer-=t,this._tickEscape(t,e),this._applyWallPushback(e),this._updateMesh();return}if(this.strategyTimer===void 0&&(this.strategyTimer=0),this.strategy===void 0&&(this.strategy="charge"),this.slamTimer===void 0&&(this.slamTimer=0),c<=35&&(this.strategyTimer-=t,this.strategyTimer<=0&&this.slamTimer<=0)){this.strategyTimer=5+Math.random()*4;const L=Math.random();this.strategy=L<.15?"leftPIT":L<.3?"rightPIT":"charge"}let M=!1;if(c>35){if(this._pathTimer-=t,(this._pathTimer<=0||!this._currentPath)&&(this._pathTimer=.8+Math.random()*.4,a&&(this._currentPath=a.findPath(this.position.x,this.position.z,i.x,i.z),this._pathWptIdx=0)),this._currentPath&&this._currentPath.length>0){for(;this._pathWptIdx<this._currentPath.length-1;){const L=this._currentPath[this._pathWptIdx],z=this.position.x-L.x,Z=this.position.z-L.z;if(z*z+Z*Z<144)this._pathWptIdx++;else break}g.copy(this._currentPath[this._pathWptIdx])}}else if(this.slamTimer>0)this.slamTimer-=t,M=!0,g.copy(i);else{const L=Math.sin(o),z=Math.cos(o);if(this.strategy==="leftPIT"||this.strategy==="rightPIT"){const Z=this.strategy==="leftPIT"?-1:1,C=Math.cos(o)*Z*4.5,D=-Math.sin(o)*Z*4.5,B=L*3,O=z*3;g.set(i.x+C+B,i.y,i.z+D+O);const W=this.position.x-i.x,et=this.position.z-i.z,nt=W*L+et*z,rt=Math.abs(W*Math.cos(o)+et*-Math.sin(o));nt>-6&&nt<6&&rt<8&&(this.slamTimer=.8,M=!0,this.strategyTimer=.5,g.copy(i))}else g.copy(i)}const m=g.x-this.position.x,p=g.z-this.position.z;let A=Math.atan2(m,p);if(M){const L=this.position.x<i.x?.35:-.35;A+=L}const x=Math.cos(this.heading),b=-Math.sin(this.heading);for(let L=0;L<r.length;L++){const z=r[L];if(z!==this&&z.position){const Z=this.position.distanceTo(z.position);if(Z<8){const C=z.position.x-this.position.x,D=z.position.z-this.position.z,B=C*x+D*b;A+=(B>0?-.35:.35)*(1-Z/8)}}}let I=A-this.heading;for(;I>Math.PI;)I-=Math.PI*2;for(;I<-Math.PI;)I+=Math.PI*2;const T=2.4,_=Math.max(-T,Math.min(T,I*3.8));this.angularVelocity+=(_-this.angularVelocity)*16*t,this.heading+=this.angularVelocity*t;let P=this.maxSpeed;M?(this.accel=this.baseAccel*1.15,P=Math.max(this.maxSpeed,n+3)):(this.accel=this.baseAccel,n<3?c<25?P=Math.max(1.5,(c-5)*1.8):P=this.maxSpeed*.6:c<20&&(P=Math.max(this.maxSpeed,n+5)));const v=Math.abs(I);if(v>.6&&(P*=Math.max(.4,1-(v-.6)*1.2)),this.speed<P)this.speed+=this.accel*t;else{const L=P<12?1.6:.8;this.speed-=this.braking*L*t}if(this.speed-=this.drag*this.speed*Math.abs(this.speed)*t,this.speed=Math.max(-10,Math.min(P,this.speed)),this.velocity.set(Math.sin(this.heading)*this.speed,0,Math.cos(this.heading)*this.speed),this.speed<1.5?this._stuckTimer+=t:this._stuckTimer=0,this._stuckTimer>1.2){this._beginEscape(e,x,b);return}this.position.addScaledVector(this.velocity,t);const E=e&&typeof e.getGroundHeight=="function"?e.getGroundHeight(this.position.x,this.position.z):.5;this.position.y+=(E-this.position.y)*12*t,this._applyWallPushback(e),this._updateMesh()}_beginEscape(t,e,i){const n=t.checkCollision(this.position.x,this.position.z,3);if(n.collision){const o=n.normalX*e+n.normalZ*i;this._escapeTargetHdg=this.heading+(o>=0?-Math.PI/2:Math.PI/2)}else this._escapeTargetHdg=this.heading+Math.PI;for(;this._escapeTargetHdg>Math.PI;)this._escapeTargetHdg-=Math.PI*2;for(;this._escapeTargetHdg<-Math.PI;)this._escapeTargetHdg+=Math.PI*2;this.speed=0,this.velocity.set(0,0,0),this.angularVelocity=0,this._stuckTimer=0,this._escapeTimer=1}_tickEscape(t,e){let i=this._escapeTargetHdg-this.heading;for(;i>Math.PI;)i-=Math.PI*2;for(;i<-Math.PI;)i+=Math.PI*2;this.heading+=Math.sign(i)*Math.min(Math.abs(i),3*t),this.speed=-12,this.velocity.set(Math.sin(this.heading)*this.speed,0,Math.cos(this.heading)*this.speed),this.position.addScaledVector(this.velocity,t);const n=e&&typeof e.getGroundHeight=="function"?e.getGroundHeight(this.position.x,this.position.z):.5;this.position.y+=(n-this.position.y)*12*t}_applyWallPushback(t){const e=t.checkCollision(this.position.x,this.position.z,2);if(!e.collision)return;this.position.x+=e.normalX*(e.overlap+.1),this.position.z+=e.normalZ*(e.overlap+.1);const i=this.velocity.x*e.normalX+this.velocity.z*e.normalZ;i<0&&(this.velocity.x-=i*e.normalX,this.velocity.z-=i*e.normalZ),this.speed>0&&this.velocity.x*e.normalX+this.velocity.z*e.normalZ<-.4&&(this.speed*=.2)}_updateMesh(){this.meshGroup&&(this.meshGroup.position.copy(this.position),this.app&&this.app.world&&typeof this.app.world.alignMeshToTerrain=="function"?this.app.world.alignMeshToTerrain(this.meshGroup,this.position,this.heading):this.meshGroup.rotation.y=this.heading)}}let Oo=null,Go=null,ko=null,Vo=null;function gm(){if(!Oo){const s=document.createElement("canvas");s.width=64,s.height=16;const t=s.getContext("2d");t.fillStyle="#ffffff",t.fillRect(0,0,64,16),t.fillStyle="#ff3333";for(let i=0;i<4;i++)t.beginPath(),t.moveTo(i*16,16),t.lineTo(i*16+8,16),t.lineTo(i*16+16,0),t.lineTo(i*16+8,0),t.closePath(),t.fill();const e=new Re(s);e.minFilter=ge,e.magFilter=ge,Oo=new Ft({map:e,roughness:.8})}return Oo}function sl(){return Go||(Go=new Ft({color:13421772,roughness:.5})),Go}function Mm(){return ko||(ko=new H(4.5,.5,.2)),ko}function ol(){return Vo||(Vo=new H(.3,1.2,.8)),Vo}class xm{constructor(t,e,i,n,o,a,r){this.id=t,this.tileX=e,this.tileZ=i,this.position=n.clone(),this.heading=o,this.isVertical=a,this.app=r,this.active=!0,this.meshGroup=new Vt,this.meshGroup.position.copy(this.position),this.meshGroup.rotation.y=this.heading,this.app.scene.add(this.meshGroup),this.fences=[],this.obstacles=[],this.buildRoadblock()}buildRoadblock(){const{carGroup:t}=this.app.createVoxelCarMesh(0,"cop");t.position.set(-5,.15,-4.5),t.rotation.y=.1,this.meshGroup.add(t);const{carGroup:e}=this.app.createVoxelCarMesh(0,"cop");e.position.set(5,.15,4.5),e.rotation.y=Math.PI-.1,this.meshGroup.add(e);const i=new Ft({color:5592405,roughness:.8}),n=new H(4,1.4,1.5),o=new tt(n,i);o.position.set(0,.7,0),o.castShadow=!0,o.receiveShadow=!0,this.meshGroup.add(o);const a=16,r=Math.cos(this.heading),l=Math.sin(this.heading),c=this.createFenceMesh(),h=-a,d=0,u=this.position.x+h*r+d*l,f=this.position.z-h*l+d*r,g=0+this.app.world.getBaseHeight(u,f);c.position.set(u,g,f),c.rotation.y=this.heading,this.app.scene.add(c);const M={position:new R(u,g+.6,f),group:c,broken:!1,radius:2.2,velocity:new R,angularVelocity:new R,fadeTimer:10,comHeight:.6,type:"fence",lights:[],flares:[],poolMeshes:[]};this.app.world.breakables.push(M),this.fences.push(M);const m=this.createFenceMesh(),p=a,A=0,x=this.position.x+p*r+A*l,b=this.position.z-p*l+A*r,I=0+this.app.world.getBaseHeight(x,b);m.position.set(x,I,b),m.rotation.y=this.heading,this.app.scene.add(m);const T={position:new R(x,I+.6,b),group:m,broken:!1,radius:2.2,velocity:new R,angularVelocity:new R,fadeTimer:10,comHeight:.6,type:"fence",lights:[],flares:[],poolMeshes:[]};this.app.world.breakables.push(T),this.fences.push(T),this.addWorldObstacle(0,0,24,13,2.5)}createFenceMesh(){const t=new Vt,e=new tt(Mm(),gm());e.position.y=1,e.castShadow=!0,t.add(e);const i=new tt(ol(),sl());i.position.set(-2,.6,0),i.castShadow=!0,t.add(i);const n=new tt(ol(),sl());return n.position.set(2,.6,0),n.castShadow=!0,t.add(n),t}addWorldObstacle(t,e,i,n,o){let a=this.position.x,r=this.position.z,l=i,c=n;this.isVertical?(a+=t,r+=e):(a+=e,r+=t,l=n,c=i);const h={xMin:a-l/2,xMax:a+l/2,zMin:r-c/2,zMax:r+c/2,height:o};this.obstacles.push(h),this.app.world.obstacles.push(h);const d=this.app.world.spatialCellSize,u=Math.floor(h.xMin/d),f=Math.floor(h.xMax/d),g=Math.floor(h.zMin/d),M=Math.floor(h.zMax/d);for(let m=u;m<=f;m++)for(let p=g;p<=M;p++){const A=`${m},${p}`;this.app.world.obstacleGrid.has(A)||this.app.world.obstacleGrid.set(A,[]),this.app.world.obstacleGrid.get(A).push(h)}}update(t,e){const i=Math.floor(Date.now()/250)%2===0;this.meshGroup.traverse(n=>{if(n.isMesh&&(n.name==="sirenBlue"?n.material.emissiveIntensity=i?.05:6:n.name==="sirenRed"&&(n.material.emissiveIntensity=i?6:.05)),n.name==="headlightPool"){const o=new R;n.getWorldPosition(o);const a=o.distanceTo(e);if(a<=80)n.material.opacity=0;else if(a>=120)n.material.opacity=.35;else{const r=(a-80)/40,l=r*r*(3-2*r);n.material.opacity=.35*l}}})}cleanup(){this.meshGroup&&(this.meshGroup.traverse(i=>{i.isMesh&&i.geometry&&i.geometry.dispose()}),this.app.scene.remove(this.meshGroup)),this.fences.forEach(i=>{i.broken||(this.app.scene.remove(i.group),i.shouldRemove=!0)});const t=new Set(this.obstacles);this.app.world.obstacles=this.app.world.obstacles.filter(i=>!t.has(i));const e=this.app.world.spatialCellSize;for(const i of this.obstacles){const n=Math.floor(i.xMin/e),o=Math.floor(i.xMax/e),a=Math.floor(i.zMin/e),r=Math.floor(i.zMax/e);for(let l=n;l<=o;l++)for(let c=a;c<=r;c++){const h=`${l},${c}`,d=this.app.world.obstacleGrid.get(h);if(d){const u=d.indexOf(i);u!==-1&&d.splice(u,1),d.length===0&&this.app.world.obstacleGrid.delete(h)}}}}}class _m{constructor(t){this.app=t,this.active=!1,this.heatLevel=0,this.cops=[],this.parkedCops=[],this.bustProgress=0,this.busted=!1,this.cooldownTimer=0,this.violationAlertTimer=0,this.canSeePlayer=!1,this.heatProgress=0,this.spawnTimer=0,this.maxSpawnCops=0,this.roadblocks=[],this.roadblockTimer=15}triggerPursuit(t=1){this.busted||(this.heatLevel,this.active||(this.active=!0,this.app.showBanner("POLICE PURSUIT","Lose the cops!"),this.heatLevel=t,this.pursuitDuration=0),this.cooldownTimer=0,this.maxSpawnCops=Math.min(5,Math.max(1,this.heatLevel)))}cancelPursuit(){this.active=!1,this.heatLevel=0,this.bustProgress=0,this.clearSpawnedCops(),this.app.showBanner("ESCUPED","Police search cancelled")}clearSpawnedCops(){this.cops.forEach(t=>{t.meshGroup&&(t.meshGroup.traverse(e=>{e.geometry&&e.geometry.dispose()}),this.app.scene.remove(t.meshGroup))}),this.cops=[],this.clearRoadblocks()}clearRoadblocks(){this.roadblocks.forEach(t=>t.cleanup()),this.roadblocks=[]}spawnCop(t,e,i=!1){const n=Array.from(t.roadColumns).sort((_,P)=>_-P),o=Array.from(t.roadRows).sort((_,P)=>_-P),a=Math.round(e.x/t.tileSize),r=Math.round(e.z/t.tileSize);let l=a,c=r;const h=(_,P)=>{let v=0,E=1/0;for(let L=0;L<_.length;L++){const z=Math.abs(_[L]-P);z<E&&(E=z,v=L)}return v};if(i){const _=(Math.random()>.5?1:-1)*(3+Math.floor(Math.random()*2)),P=(Math.random()>.5?1:-1)*(3+Math.floor(Math.random()*2)),v=h(n,a+_),E=h(o,r+P);l=n[v],c=o[E]}else{let _=0,P=0;if(Math.random()<.8){const L=this.app.physics.heading,z=Math.sin(L),Z=Math.cos(L);Math.abs(z)>Math.abs(Z)?(_=(Math.sign(z)!==0?Math.sign(z):Math.random()>.5?1:-1)*(8+Math.floor(Math.random()*5)),P=(Math.random()>.5?1:-1)*Math.floor(Math.random()*2)):(P=(Math.sign(Z)!==0?Math.sign(Z):Math.random()>.5?1:-1)*(8+Math.floor(Math.random()*5)),_=(Math.random()>.5?1:-1)*Math.floor(Math.random()*2))}else _=(Math.random()>.5?1:-1)*(6+Math.floor(Math.random()*4)),P=(Math.random()>.5?1:-1)*(6+Math.floor(Math.random()*4));const v=h(n,a+_),E=h(o,r+P);l=n[v],c=o[E]}let d=l*t.tileSize,u=c*t.tileSize;const f=t.roadColumns.has(l),g=t.roadRows.has(c);let M=5;if(f||g){const _=Math.floor(f?l/4:c/4),P=Math.sin(_*12.9898)*43758.5453;M=(P-Math.floor(P)>.6?14:26)===14?2.5:5}if(i){const _=Math.random()>.5?1:-1;f?d+=_*M:g&&(u+=_*M)}else{const _=this.app.physics.heading,P=Math.sin(_),v=Math.cos(_);if(c===r){const E=P>0?1:-1;u+=E*M}else if(l===a){const E=v>0?1:-1;d-=E*M}else{let E="z";g&&!f?E="x":f&&g&&(E=Math.random()>.5?"x":"z");const L=Math.random()>.5?1:-1;E==="x"?u+=L*M:d+=L*M}}let m=!1;for(const _ of this.roadblocks)if(Math.sqrt((d-_.position.x)**2+(u-_.position.z)**2)<60){m=!0;break}if(m||t.checkCollision(d,u,2.5).collision)return null;if(t.breakables)for(const _ of t.breakables){if(_.broken)continue;const P=d-_.position.x,v=u-_.position.z;if(P*P+v*v<25)return null}const p=[];this.app&&(this.app.traffic&&(this.app.traffic.vehicles&&p.push(...this.app.traffic.vehicles),this.app.traffic.parkedVehicles&&p.push(...this.app.traffic.parkedVehicles)),this.app.physics&&this.app.physics.position&&p.push({position:this.app.physics.position})),this.cops&&p.push(...this.cops),this.parkedCops&&p.push(...this.parkedCops);for(const _ of p)if(_.position){const P=d-_.position.x,v=u-_.position.z;if(P*P+v*v<49)return null}const A=new R(d,.5+t.getBaseHeight(d,u),u),x=Date.now()+Math.floor(Math.random()*1e3),b=new nl(x,A,i);b.app=this.app,b.maxSpeed=29+this.heatLevel*3,b.accel=8+this.heatLevel*1.2;const{carGroup:I,wheels:T}=this.app.createVoxelCarMesh(0,"cop");if(this.app.scene.add(I),b.meshGroup=I,b.wheels=T,i)this.parkedCops.push(b),b.heading=g?Math.PI/2:0,b._updateMesh();else{const _=e.x-d,P=e.z-u;Math.abs(_)>Math.abs(P)?b.heading=_>0?Math.PI/2:-Math.PI/2:b.heading=P>0?0:Math.PI,b.speed=b.maxSpeed*.35,b.velocity.set(Math.sin(b.heading)*b.speed,0,Math.cos(b.heading)*b.speed),b._updateMesh(),this.cops.push(b)}return b}spawnCopAtTile(t,e,i){const n=t.roadColumns.has(e),o=t.roadRows.has(i);if((t.isAlley?t.isAlley(e,i):!1)||n&&o||!n&&!o)return null;let l=e*t.tileSize,c=i*t.tileSize,h=0;const d=9.5,u=Math.random()>.5?d:-d,f=(Math.random()-.5)*15;if(n?(l+=u,c+=f,h=Math.random()>.5?0:Math.PI):(c+=u,l+=f,h=Math.random()>.5?Math.PI/2:-Math.PI/2),t.checkCollision(l,c,2.8).collision)return null;const g=new R(l,.5+t.getBaseHeight(l,c),c),M=Date.now()+Math.floor(Math.random()*1e3),m=new nl(M,g,!0);m.app=this.app,m.maxSpeed=29+this.heatLevel*3,m.accel=8+this.heatLevel*1.2,m.heading=h;const{carGroup:p,wheels:A}=this.app.createVoxelCarMesh(0,"cop");return this.app.scene.add(p),m.meshGroup=p,m.wheels=A,m._updateMesh(),this.parkedCops.push(m),m}update(t,e,i,n,o,a,r,l=!0){if(this.busted)return;this._activeChasingBuf||(this._activeChasingBuf=[]),this._activeParkedBuf||(this._activeParkedBuf=[]);let c=0,h=0;for(let x=0;x<this.cops.length;x++)this.cops[x].active&&(this._activeChasingBuf[c++]=this.cops[x]);this._activeChasingBuf.length=c;const d=this._activeChasingBuf;if(this.active&&(this.spawnTimer-=t,this.spawnTimer<=0&&d.length<this.maxSpawnCops)){const x=Math.max(3.5,9/this.heatLevel),b=Math.max(4,10/this.heatLevel);this.spawnTimer=x+Math.random()*b,this.spawnCop(n,e,!1)}for(let x=0;x<this.parkedCops.length;x++)this.parkedCops[x].active&&!this.parkedCops[x].alerted&&(this._activeParkedBuf[h++]=this.parkedCops[x]);if(this._activeParkedBuf.length=h,this._activeParkedBuf.length<4&&Math.random()<.1){const x=[];for(const[b,I]of n.loadedTiles.entries()){const T=I.gridX,_=I.gridZ,P=I.posX-e.x,v=I.posZ-e.z,E=Math.sqrt(P*P+v*v);if(E>=100&&E<=280){const L=n.roadColumns.has(T),z=n.roadRows.has(_);if(!(n.isAlley?n.isAlley(T,_):!1)&&!(L&&z)&&(L||z)){let D=!1;for(const B of this.cops){const O=B.position.x-I.posX,W=B.position.z-I.posZ;if(O*O+W*W<40*40){D=!0;break}}if(!D)for(const B of this.parkedCops){const O=B.position.x-I.posX,W=B.position.z-I.posZ;if(O*O+W*W<40*40){D=!0;break}}D||x.push({tx:T,tz:_})}}}if(x.length>0){const b=x[Math.floor(Math.random()*x.length)];this.spawnCopAtTile(n,b.tx,b.tz)}}this._allVehiclesBuf||(this._allVehiclesBuf=[]);let f=0;this._allVehiclesBuf[f++]={position:e};for(let x=0;x<r.length;x++)this._allVehiclesBuf[f++]=r[x];for(let x=0;x<o.vehicles.length;x++)this._allVehiclesBuf[f++]=o.vehicles[x];for(let x=0;x<d.length;x++)this._allVehiclesBuf[f++]=d[x];this._allVehiclesBuf.length=f;const g=this._allVehiclesBuf;d.forEach(x=>{let b=e,I=i,T=this.app.physics.heading,_=l,P=x.position.distanceTo(e);if(r.forEach(v=>{const E=x.position.distanceTo(v.position);E<P&&(P=E,b=v.position,I=v.speed,T=v.heading,_=!0)}),x.update(t,n,b,I,T,a,g,_),x.wheels&&!x._lastLOD){const v=x.speed/.42*t;x.wheels.forEach(E=>{E.children[0].rotation.x+=v,E.children[1].rotation.x+=v})}if(x.meshGroup&&!x._lastLOD){const v=x.meshGroup.getObjectByName("sirenBlue"),E=x.meshGroup.getObjectByName("sirenRed");v&&E&&(v.material.emissiveIntensity=x.sirenState?.05:6,E.material.emissiveIntensity=x.sirenState?6:.05)}}),this.parkedCops.forEach((x,b)=>{if(!x.isParked&&x.alerted)this.cops.push(x),this.parkedCops.splice(b,1),this.triggerPursuit(1);else{let I=e,T=i,_=this.app.physics.heading,P=l,v=x.position.distanceTo(e);r.forEach(E=>{const L=x.position.distanceTo(E.position);L<v&&(v=L,I=E.position,T=E.speed,_=E.heading,P=!0)}),x.update(t,n,I,T,_,a,g,P)}}),this.active&&(this.canSeePlayer=!1,d.forEach(x=>{if(x.position.distanceTo(e)<120){let T=!1;for(let _=1;_<=6;_++){const P=_/6,v=e.x+(x.position.x-e.x)*P,E=e.z+(x.position.z-e.z)*P;if(n.checkCollision(v,E,1).collision){T=!0;break}}T||(this.canSeePlayer=!0)}}),this.canSeePlayer?(this.cooldownTimer=0,this.heatProgress=Math.min(1,this.heatProgress+t*.045),this.heatProgress>=1&&(this.heatProgress=0,this.heatLevel<5&&(this.heatLevel,this.heatLevel++,this.maxSpawnCops=Math.min(5,Math.max(1,this.heatLevel)),this.app.showBanner("PURSUIT ESCALATED",`Heat Level: ${this.heatLevel}`)))):(this.heatProgress=Math.max(0,this.heatProgress-t*.025),this.cooldownTimer+=t,this.cooldownTimer>=6&&(this.cooldownTimer=0,this.heatLevel--,this.maxSpawnCops=Math.min(5,Math.max(1,this.heatLevel)),this.heatLevel<=0?this.cancelPursuit():this.app.showBanner("LOST COPS",`Heat Level: ${this.heatLevel}`))));let M=!1;d.forEach(x=>{x.position.distanceTo(e)<8.5&&(M=!0)});const m=i<2.8||!l;this.active&&M&&m?(this.bustProgress=Math.min(1,this.bustProgress+t*.35),this.bustProgress>=1&&this.triggerBusted()):this.bustProgress=Math.max(0,this.bustProgress-t*.4);const p=Math.sin(this.app.physics.heading),A=Math.cos(this.app.physics.heading);for(let x=this.cops.length-1;x>=0;x--){const b=this.cops[x],I=b.position.x-e.x,T=b.position.z-e.z,_=Math.sqrt(I*I+T*T),E=I/(_||1)*p+T/(_||1)*A<-.15?160:350;_>E&&(b.meshGroup&&(b.meshGroup.traverse(L=>{L.geometry&&L.geometry.dispose()}),this.app.scene.remove(b.meshGroup)),this.cops.splice(x,1))}for(let x=this.parkedCops.length-1;x>=0;x--){const b=this.parkedCops[x];b.position.distanceTo(e)>350&&(b.meshGroup&&(b.meshGroup.traverse(I=>{I.geometry&&I.geometry.dispose()}),this.app.scene.remove(b.meshGroup)),this.parkedCops.splice(x,1))}this.roadblocks.forEach(x=>{x.update(t,e)});for(let x=this.roadblocks.length-1;x>=0;x--){const b=this.roadblocks[x];b.position.distanceTo(e)>280&&(b.cleanup(),this.roadblocks.splice(x,1))}}spawnRoadblockAttempt(t,e,i){if(this.roadblocks.length>=4)return;const n=Math.sin(i),o=Math.cos(i),a=[];for(const[M,m]of t.loadedTiles.entries()){const p=m.gridX,A=m.gridZ,x=t.roadColumns.has(p),b=t.roadRows.has(A),I=t.isAlley?t.isAlley(p,A):!1;if(!(x&&b)||I)continue;const _=m.posX-e.x,P=m.posZ-e.z,v=Math.sqrt(_*_+P*P);v<100||v>190||_/v*n+P/v*o<.5||a.push({tx:p,tz:A,posX:m.posX,posZ:m.posZ})}if(a.length===0)return;a.sort((M,m)=>{const p=Math.sqrt((M.posX-e.x)**2+(M.posZ-e.z)**2),A=Math.sqrt((m.posX-e.x)**2+(m.posZ-e.z)**2);return p-A});const r=a[0],l=r.tx,c=r.tz,h=r.posX-e.x,d=r.posZ-e.z;let u="S";Math.abs(h)>Math.abs(d)?u=h>0?"W":"E":u=d>0?"S":"N";let f=[];u==="S"?f=[{dir:"N",tx:l,tz:c+1,isVertical:!0,heading:0},{dir:"E",tx:l+1,tz:c,isVertical:!1,heading:Math.PI/2},{dir:"W",tx:l-1,tz:c,isVertical:!1,heading:Math.PI/2}]:u==="N"?f=[{dir:"S",tx:l,tz:c-1,isVertical:!0,heading:0},{dir:"E",tx:l+1,tz:c,isVertical:!1,heading:Math.PI/2},{dir:"W",tx:l-1,tz:c,isVertical:!1,heading:Math.PI/2}]:u==="W"?f=[{dir:"E",tx:l+1,tz:c,isVertical:!1,heading:Math.PI/2},{dir:"N",tx:l,tz:c+1,isVertical:!0,heading:0},{dir:"S",tx:l,tz:c-1,isVertical:!0,heading:0}]:u==="E"&&(f=[{dir:"W",tx:l-1,tz:c,isVertical:!1,heading:Math.PI/2},{dir:"N",tx:l,tz:c+1,isVertical:!0,heading:0},{dir:"S",tx:l,tz:c-1,isVertical:!0,heading:0}]),f.sort(()=>Math.random()-.5),[f[0],f[1]].forEach((M,m)=>{const p=Date.now()+Math.floor(Math.random()*1e3)+m,A=M.tx*t.tileSize,x=M.tz*t.tileSize,b=new R(A,.35+t.getBaseHeight(A,x),x),I=new xm(p,M.tx,M.tz,b,M.heading,M.isVertical,this.app);this.roadblocks.push(I)}),this.app.showBanner("ROADBLOCK AHEAD","Police blockade set up at the next junction!")}triggerBusted(){this.busted=!0,this.active=!1,this.app.showBanner("BUSTED","Fined $500!"),this.app.keys={},this.app.physics.speed=0,this.app.physics.velocity.set(0,0,0),setTimeout(()=>{this.app.physics.position.set(0,.5,0),this.app.physics.heading=0,this.app.physics.velocity.set(0,0,0),this.app.physics.speed=0,this.busted=!1,this.heatLevel=0,this.bustProgress=0,this.clearSpawnedCops(),this.app.hudStatsEl.style.display="none",this.app.cancelBtnEl.style.display="none",this.app.navArrow.visible=!1,this.app.clearCheckpointBeacons(),this.app.clearAIMeshes()},3500)}}function ym(){const s={KeyW:"w",KeyA:"a",KeyS:"s",KeyD:"d",ArrowUp:"arrowup",ArrowDown:"arrowdown",ArrowLeft:"arrowleft",ArrowRight:"arrowright",Space:" ",ShiftLeft:"shift",ShiftRight:"shift",KeyN:"n",KeyF:"f",KeyC:"c",KeyV:"v",KeyM:"m",KeyB:"b",KeyP:"p"};window.addEventListener("keydown",t=>{t.key&&(this.keys[t.key.toLowerCase()]=!0);const e=s[t.code];if(e&&(this.keys[e]=!0),this.inMainMenu)return;const i=t.key?t.key.toLowerCase():"";if(i==="c"&&this.cycleCameraMode(),(i==="v"||i==="p")&&this.cycleCameraFocus(),i==="m"&&this.debugMenuEnabled&&this.racePanelEl){const n=this.racePanelEl.style.display==="none";this.racePanelEl.style.display=n?"flex":"none"}}),window.addEventListener("keyup",t=>{t.key&&(this.keys[t.key.toLowerCase()]=!1);const e=s[t.code];e&&(this.keys[e]=!1)}),window.addEventListener("blur",()=>{for(let t in this.keys)this.keys[t]=!1})}function vm(){this.debugFocusAI=null;const s=new Zl({color:61695,linewidth:3,depthWrite:!1,depthTest:!1}),t=new We;this.debugPathLine=new _0(t,s),this.debugPathLine.visible=!1,this.debugPathLine.frustumCulled=!1,this.scene.add(this.debugPathLine);const e=new H(.8,.8,.8),i=new fe({color:16776960,depthWrite:!1});this.debugLookaheadMarker=new tt(e,i),this.debugLookaheadMarker.visible=!1,this.debugLookaheadMarker.frustumCulled=!1,this.scene.add(this.debugLookaheadMarker)}function Sm(s=.016){if(this.cameraOverride){this.camera.position.copy(this.cameraOverride.pos),this.camera.lookAt(this.cameraOverride.lookAt),this.cameraOverride.roll!==void 0&&this.camera.rotateZ(this.cameraOverride.roll),this.cameraOverride.fov!==void 0&&(this.camera.fov=this.cameraOverride.fov,this.camera.updateProjectionMatrix()),this.dirLight.position.set(this.cameraOverride.pos.x+30,60,this.cameraOverride.pos.z+30),this.dirLightTargetOverride||(this.dirLightTargetOverride=new ce,this.scene.add(this.dirLightTargetOverride)),this.dirLightTargetOverride.position.copy(this.cameraOverride.lookAt),this.dirLight.target=this.dirLightTargetOverride;return}let t=this.physics,e=this.carVisualContainer;this.physics.isBoosting,this.physics.isAirborne,this.physics.airTime;let i=this.physics.isDrifting,n=this.physics.velocity.length(),o=this.renderPhysicsPosition||t.position,a=this.renderPhysicsHeading!==void 0?this.renderPhysicsHeading:t.heading;if(this.debugFocusAI&&this.race&&this.race.aiRacers){const O=this.race.aiRacers.find(W=>W.id===this.debugFocusAI);O&&(t=O,e=O.meshGroup||e,O.isBoosting,i=O.isDrifting||!1,n=O.velocity?O.velocity.length():O.speed,o=O.position,a=O.heading)}const r=a;this.gearShiftPunch>0&&(this.gearShiftPunch=Math.max(0,this.gearShiftPunch-4.5*s)),this.camRoll===void 0&&(this.camRoll=0),this.camPitchOffset===void 0&&(this.camPitchOffset=0),this.camBungeeOffset===void 0&&(this.camBungeeOffset=0),this.lastCamSpeed===void 0&&(this.lastCamSpeed=0);const l=s>0?(n-this.lastCamSpeed)/s:0;this.lastCamSpeed=n;const c=Math.max(-20,Math.min(20,l)),h=-c*.035;this.camPitchOffset+=(h-this.camPitchOffset)*(1-Math.exp(-6*s));const d=c*.18;this.camBungeeOffset+=(d-this.camBungeeOffset)*(1-Math.exp(-4*s));const u=Date.now()*.0015,f=Math.sin(u*1.7)*.04+Math.cos(u*3.1)*.02,g=Math.cos(u*2.1)*.04+Math.sin(u*4.3)*.02,M=new R(Math.cos(r),0,-Math.sin(r)),p=-this.physics.velocity.dot(M)*.005;this.camRoll+=(p-this.camRoll)*(1-Math.exp(-5*s));const A=this.physics.isBoosting?16:0,x=this.physics.isAirborne?Math.min(12,this.physics.airTime*15):0,b=55+Math.min(20,n*.35)+this.gearShiftPunch*3.5+A+x;this.camera.fov+=(b-this.camera.fov)*(1-Math.exp(-6*s)),this.camera.updateProjectionMatrix();let I=15,T=5.2,_=!0,P=1.1;const v=this.cameraMode||"medium";if(v==="really_close"?(I=7,T=2.4,P=.95):v==="close"?(I=10.5,T=3.5,P=1):v==="medium"?(I=15,T=5.2,P=1.1):v==="far"?(I=22,T=7.5,P=1.3):v==="bonnet"&&(I=-2.2,T=1,_=!1,P=1),_){let O=r-this.camHeading;O=Math.atan2(Math.sin(O),Math.cos(O));const W=i?2.5:5;this.camHeading+=O*(1-Math.exp(-W*s))}else this.camHeading=r;let E,L;_?(E=I+n*.1+this.camBungeeOffset+this.gearShiftPunch*1.8,L=T+Math.max(0,1.5-n*.01)+this.camPitchOffset):(E=I,L=T);const z=new R(-Math.sin(this.camHeading)*E,L,-Math.cos(this.camHeading)*E),Z=o.clone().add(z);_?this.camera.position.lerp(Z,1-Math.exp(-9*s)):this.camera.position.copy(Z),_&&(this.camera.position.x+=f,this.camera.position.y+=g);let C=0;if(n>25&&(C+=(n-25)*.005),i&&_&&(C+=.08),this.gearShiftPunch>0&&t===this.physics&&_&&(C+=this.gearShiftPunch*.12),this.crashShake>0&&t===this.physics&&(C+=this.crashShake),C>0&&(this.camera.position.x+=(Math.random()-.5)*C,this.camera.position.y+=(Math.random()-.5)*C,this.camera.position.z+=(Math.random()-.5)*C),_){const W=this.world?this.world.getGroundHeight(this.camera.position.x,this.camera.position.z):0;this.camera.position.y<W+2&&(this.camera.position.y=W+2)}const D=v==="bonnet"?15+n*.1:4+n*.08,B=o.clone().add(new R(Math.sin(r)*D,P,Math.cos(r)*D));this.camera.lookAt(B),_&&this.camera.rotateZ(this.camRoll),this.dirLight.position.set(o.x+30,60,o.z+30),this.dirLight.target=e}function wm(){if(!this.race||!this.race.aiRacers||this.race.aiRacers.length===0){this.debugFocusAI=null;return}if(this.debugFocusAI===null)this.debugFocusAI=this.race.aiRacers[0].id;else{const s=this.race.aiRacers.findIndex(t=>t.id===this.debugFocusAI);s===-1||s===this.race.aiRacers.length-1?this.debugFocusAI=null:this.debugFocusAI=this.race.aiRacers[s+1].id}if(this.debugFocusAI===null)this.showBanner("CAMERA: PLAYER","Focused on Player Car",1500);else{const s=this.race.aiRacers.find(t=>t.id===this.debugFocusAI);this.showBanner(`CAMERA: ${s.name}`,"Focusing on AI racer",1500)}}function Em(){const s=["really_close","close","medium","far","bonnet"],e=(s.indexOf(this.cameraMode||"medium")+1)%s.length;this.cameraMode=s[e],this.showBanner(`CAMERA: ${this.cameraMode.toUpperCase().replace("_"," ")}`,"Switched camera view",1200)}function bm(){const s=this.physics,t=this.physics.velocity.length(),e=this.renderPhysicsPosition||s.position,i=this.renderPhysicsHeading!==void 0?this.renderPhysicsHeading:s.heading;let n=15,o=5.2,a=1.1;const r=this.cameraMode||"medium";r==="really_close"?(n=7,o=2.4,a=.95):r==="close"?(n=10.5,o=3.5,a=1):r==="medium"?(n=15,o=5.2,a=1.1):r==="far"?(n=22,o=7.5,a=1.3):r==="bonnet"&&(n=-2.2,o=1,a=1);const l=n+t*.1,c=o+Math.max(0,1.5-t*.01),h=new R(-Math.sin(i)*l,c,-Math.cos(i)*l),d=e.clone().add(h),u=r==="bonnet"?15+t*.1:4+t*.08,f=e.clone().add(new R(Math.sin(i)*u,a,Math.cos(i)*u)),g=55+Math.min(20,t*.35);return{pos:d,lookAt:f,fov:g}}const Tm=new R,Am=new R,Jo=new R,al=new se,rl=new Tn,Ho=new R,Cm=120*120;function Rm(s,t){return!s||!s.camera?!0:(Ho.setFromMatrixPosition(t.matrixWorld),s.camera.position.distanceToSquared(Ho)>Cm?!1:(al.multiplyMatrices(s.camera.projectionMatrix,s.camera.matrixWorldInverse),rl.setFromProjectionMatrix(al),rl.containsPoint(Ho)))}function Pm(s,t){const e=Math.round(t*20)/20,i=`${s}_${e}`;return this.particleMaterialCache||(this.particleMaterialCache={}),this.particleMaterialCache[i]||(this.particleMaterialCache[i]=new Ft({color:s,roughness:.9,transparent:!0,opacity:e,depthWrite:!1})),this.particleMaterialCache[i]}function Lm(s,t){const e=Math.round(t*20)/20,i=`${s}_${e}`;return this.smokeMaterialCache||(this.smokeMaterialCache={}),this.smokeMaterialCache[i]||(this.smokeMaterialCache[i]=new fe({color:s,transparent:!0,opacity:e,depthWrite:!1})),this.smokeMaterialCache[i]}function Im(){this.particlePool=[],this.maxParticles=280;const s=new H(.25,.25,.25);for(let t=0;t<this.maxParticles;t++){const e=t>=140&&t<220,i=t>=220;let n;e?n=new Ft({color:11197951,transparent:!0,opacity:.4,roughness:.1,metalness:.8,depthWrite:!1}):i?n=new fe({color:16777215,transparent:!0,opacity:1,blending:xe,depthWrite:!1}):n=new fe({color:13421772,transparent:!0,opacity:.5,depthWrite:!1});const o=new tt(s,n);o.visible=!1,this.scene.add(o),this.particlePool.push({mesh:o,mat:n,life:0,maxLife:1,velocity:new R,isWater:e,isSpark:i,color:e?11197951:i?16777215:13421772})}}function Dm(){this.smokePool=[],this.maxSmoke=120;const s=new H(1.5,1.5,1.5);for(let t=0;t<this.maxSmoke;t++){const e=new fe({color:16755258,transparent:!0,opacity:.35,depthWrite:!1}),i=new tt(s,e);i.visible=!1,this.scene.add(i),this.smokePool.push({mesh:i,mat:e,life:0,maxLife:2,velocity:new R,color:16755258})}}function Um(){this.skidmarkPool=[],this.maxSkidmarks=300,this.skidIndex=0;const s=new H(.35,.01,1);this.skidMaterials=[];for(let t=0;t<10;t++){const e=.5+t*.5,i=G0();i.repeat.set(1,e*4);const n=new Ft({map:i,transparent:!0,opacity:.85,roughness:.9,metalness:.1,depthWrite:!1});this.skidMaterials.push(n)}for(let t=0;t<this.maxSkidmarks;t++){const e=new tt(s,this.skidMaterials[0]);e.visible=!1,this.scene.add(e),this.skidmarkPool.push({mesh:e})}this.prevLeftWheel=null,this.prevRightWheel=null}function zm(s,t){const e=this.skidmarkPool[this.skidIndex],i=e.mesh,n=Tm.addVectors(s,t).multiplyScalar(.5),o=40,a=Math.round(s.x/o),r=Math.round(s.z/o),l=this.world.roadColumns.has(a)||this.world.roadRows.has(r),c=this.world.roadColumns.has(a)&&this.world.roadRows.has(r);let h=.22;if(l&&!c){const m=s.x-a*o,p=s.z-r*o,{rwX:A,rwZ:x}=this.world.getRoadWidthForGrid(a,r);this.world.roadRows.has(r)?Math.abs(p)>x/2&&(h=.37):Math.abs(m)>A/2&&(h=.37)}else l||(h=.37);const d=this.world.getBaseHeight(n.x,n.z);n.y=h+d;const f=Am.subVectors(t,s).length();if(f<.05)return;const g=Math.max(0,Math.min(9,Math.round((f-.5)/.5)));i.material=this.skidMaterials[g],i.position.copy(n),i.scale.set(1,1,f),i.visible=!0;const M=Jo.copy(t);M.y=h+this.world.getBaseHeight(M.x,M.z),i.lookAt(M),e.age=0,this.skidIndex=(this.skidIndex+1)%this.maxSkidmarks}function Nm(s,t,e=8947848,i=1,n=!1,o=!1){let a=0;for(const r of this.particlePool)if(r.life<=0&&r.isWater===n&&r.isSpark===o&&(r.mesh.position.copy(s),r.mesh.visible=!0,r.color!==e&&(r.color=e,r.mat.color.setHex(e)),r.mat.opacity=n?.45:o?1:.4,r.life=n?.35+Math.random()*.35:o?.15+Math.random()*.15:.5+Math.random()*.5,r.maxLife=r.life,r.isWater=n,r.isSpark=o,n?(r.velocity.set((Math.random()-.5)*5.2+t.x*4.2,Math.random()*4.8+4,(Math.random()-.5)*5.2+t.z*4.2),r.mesh.scale.setScalar(.6+Math.random()*.6)):o?(r.velocity.set((Math.random()-.5)*4.5+t.x*(10+Math.random()*6),Math.random()*5+3+t.y*(6+Math.random()*4),(Math.random()-.5)*4.5+t.z*(10+Math.random()*6)),r.mesh.scale.set(.04,.04,.35),Jo.copy(s).add(r.velocity),r.mesh.lookAt(Jo)):(r.velocity.set((Math.random()-.5)*3+t.x*1.5,Math.random()*2+.5,(Math.random()-.5)*3+t.z*1.5),r.mesh.scale.setScalar(1)),a++,a>=i))break}function Fm(s,t=16755258,e=1,i=1){for(const n of this.smokePool)if(n.life<=0){const o=this.world&&typeof this.world.getGroundHeight=="function"?this.world.getGroundHeight(s.x,s.z):.5;n.mesh.position.set(s.x+(Math.random()-.5)*6,o-.3,s.z+(Math.random()-.5)*6),n.mesh.visible=!0,n.color!==t&&(n.color=t,n.mat.color.setHex(t)),n.mat.opacity=.28*e,n.life=(1.2+Math.random()*.8)*i,n.maxLife=n.life,n.opacityScale=e,n.sizeScale=i,n.velocity.set((Math.random()-.5)*1.2,(10+Math.random()*6)*i,(Math.random()-.5)*1.2);break}}function Bm(s){for(const t of this.particlePool)if(t.life>0){if(t.life-=s,!Rm(this,t.mesh)){t.life<=0&&(t.mesh.visible=!1);continue}if(t.mesh.position.addScaledVector(t.velocity,s),t.isWater){t.velocity.y-=14.5*s;const e=t.life/t.maxLife,i=t.maxLife*(.6+Math.sin(e*Math.PI)*1.1);t.mesh.scale.setScalar(i),t.mat.opacity=Math.sin(e*Math.PI)*.45;const o=.22+this.world.getBaseHeight(t.mesh.position.x,t.mesh.position.z);t.mesh.position.y<o&&(t.mesh.position.y=o,t.velocity.y=0,t.velocity.x*=.85,t.velocity.z*=.85)}else{t.velocity.y+=.2*s;const e=t.life/t.maxLife;t.mesh.scale.setScalar(1+(1-e)*2),t.mat.opacity=e*.4}t.life<=0&&(t.mesh.visible=!1)}}function Om(s){for(const t of this.smokePool)if(t.life>0){t.life-=s,t.mesh.position.addScaledVector(t.velocity,s),t.velocity.x+=Math.sin(t.mesh.position.y*.2)*.2,t.velocity.z+=Math.cos(t.mesh.position.y*.2)*.2;const e=t.life/t.maxLife,i=t.sizeScale||1,n=t.opacityScale||1;t.mesh.scale.setScalar((1+(1-e)*3.5)*i),t.mat.opacity=e*.28*n,t.life<=0&&(t.mesh.visible=!1)}}function Gm(){this.debrisPool=[],this.maxDebris=120;const s=new H(1,1,1);for(let t=0;t<this.maxDebris;t++){const e=new Ft({color:13421772,roughness:.5,metalness:.5,transparent:!0,opacity:1,depthWrite:!0}),i=new tt(s,e);i.visible=!1,this.scene.add(i),this.debrisPool.push({mesh:i,material:e,life:0,maxLife:1,scale:.2,velocity:new R,rotVelocity:new R})}}function km(s,t,e,i=5){let n=0;for(const o of this.debrisPool)if(o.life<=0&&(o.mesh.position.copy(s),o.mesh.position.x+=(Math.random()-.5)*.8,o.mesh.position.y+=(Math.random()-.5)*.4,o.mesh.position.z+=(Math.random()-.5)*.8,o.mesh.visible=!0,o.material.color.setHex(e),o.material.opacity=1,o.material.transparent=!1,o.life=1.2+Math.random()*1.2,o.maxLife=o.life,o.scale=.12+Math.random()*.26,o.mesh.scale.set(o.scale,o.scale,o.scale),o.velocity.set(t.x*(6+Math.random()*6)+(Math.random()-.5)*6,Math.random()*8+3.5,t.z*(6+Math.random()*6)+(Math.random()-.5)*6),o.rotVelocity.set((Math.random()-.5)*16,(Math.random()-.5)*16,(Math.random()-.5)*16),n++,n>=i))break}function Vm(s){s<=0||this.debrisPool.forEach(t=>{if(t.life>0){t.life-=s,t.velocity.y-=22*s,t.mesh.position.addScaledVector(t.velocity,s),t.mesh.rotation.x+=t.rotVelocity.x*s,t.mesh.rotation.y+=t.rotVelocity.y*s,t.mesh.rotation.z+=t.rotVelocity.z*s;const e=this.world.getBaseHeight(t.mesh.position.x,t.mesh.position.z),i=40,n=Math.round(t.mesh.position.x/i),o=Math.round(t.mesh.position.z/i),a=this.world.roadColumns.has(n)||this.world.roadRows.has(o),r=this.world.roadColumns.has(n)&&this.world.roadRows.has(o);let l=.22;if(a&&!r){const h=t.mesh.position.x-n*i,d=t.mesh.position.z-o*i,{rwX:u,rwZ:f}=this.world.getRoadWidthForGrid(n,o);this.world.roadRows.has(o)?Math.abs(d)>f/2&&(l=.37):Math.abs(h)>u/2&&(l=.37)}else a||(l=.37);const c=l+e;t.mesh.position.y<c+t.scale/2&&(t.mesh.position.y=c+t.scale/2,t.velocity.y<-1.5?(t.velocity.y=-t.velocity.y*.45,t.velocity.x*=.65,t.velocity.z*=.65,t.rotVelocity.multiplyScalar(.6)):(t.velocity.y=0,t.velocity.x*=.92*Math.exp(-s),t.velocity.z*=.92*Math.exp(-s),t.rotVelocity.multiplyScalar(.9*Math.exp(-s)))),t.life<.5&&(t.material.transparent=!0,t.material.opacity=Math.max(0,t.life/.5)),t.life<=0&&(t.mesh.visible=!1)}})}function Hm(s){const t=Math.floor(s/60),e=Math.floor(s%60),i=Math.floor(s%1*100);return`${t.toString().padStart(2,"0")}:${e.toString().padStart(2,"0")}.${i.toString().padStart(2,"0")}`}function Wm(s,t,e=2e3){const i=document.getElementById("race-banner"),n=document.getElementById("banner-title"),o=document.getElementById("banner-subtitle");n.textContent=s,o.textContent=t,i.classList.add("show"),this.bannerTimeout&&clearTimeout(this.bannerTimeout),this.bannerTimeout=setTimeout(()=>{i.classList.remove("show")},e)}function Xm(){this.notifStackEl=document.getElementById("notification-stack"),this.activeNotifs=new Map}function qm(s,t,e=2e3,i=!1){if(this.notifStackEl)if(this.activeNotifs.has(s)){const n=this.activeNotifs.get(s);i?(n.count=(n.count||1)+1,n.el.textContent=`${t} (${n.count}x)`,n.el.style.animation="none",n.el.offsetHeight,n.el.style.animation="notifSlideIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards"):n.el.textContent=t,n.timeout&&clearTimeout(n.timeout),e>0&&(n.timeout=setTimeout(()=>this.removeNotification(s),e))}else{const n=document.createElement("div");n.className="notification-item",n.textContent=t,t.includes("NEAR MISS")?n.style.color="#ffc600":t.includes("DRIFT")?n.style.color="#00e5ff":t.includes("DRAFT")&&(n.style.color="#39ff14"),this.notifStackEl.appendChild(n);const o={el:n,timeout:null,count:1};for(this.activeNotifs.set(s,o),e>0&&(o.timeout=setTimeout(()=>this.removeNotification(s),e));this.activeNotifs.size>5;){const a=this.activeNotifs.keys().next().value;this.removeNotification(a)}}}function Ym(s){if(!this.activeNotifs.has(s))return;const t=this.activeNotifs.get(s);t.timeout&&clearTimeout(t.timeout),t.el.classList.add("fade-out"),setTimeout(()=>{t.el.parentNode&&t.el.parentNode.removeChild(t.el)},300),this.activeNotifs.delete(s)}function $m(s,t){this.stuntNotifEl&&(this.stuntTitleEl.textContent=s,this.stuntScoreEl.textContent=t,this.stuntNotifEl.style.opacity="1",this.stuntNotifEl.style.transform="translate(-50%, -50%) scale(1.1)",this.stuntNotifTimeout&&clearTimeout(this.stuntNotifTimeout),this.stuntNotifTimeout=setTimeout(()=>{this.stuntNotifEl.style.opacity="0",this.stuntNotifEl.style.transform="translate(-50%, -50%) scale(0.8)"},2e3))}function jm(){const s=this.minimapCtx,t=this.minimapCanvas.width,e=this.minimapCanvas.height;s.clearRect(0,0,t,e),s.fillStyle="#0a0b0e",s.fillRect(0,0,t,e),s.strokeStyle="#1f222b",s.lineWidth=1.5,s.strokeRect(1,1,t-2,e-2),s.strokeStyle="#ffc600",s.lineWidth=2.5;const i=10;s.beginPath(),s.moveTo(1,i),s.lineTo(1,1),s.lineTo(i,1),s.stroke(),s.beginPath(),s.moveTo(t-1,i),s.lineTo(t-1,1),s.lineTo(t-1-i,1),s.stroke(),s.beginPath(),s.moveTo(1,e-1-i),s.lineTo(1,e-1),s.lineTo(i,e-1),s.stroke(),s.beginPath(),s.moveTo(t-1,e-1-i),s.lineTo(t-1,e-1),s.lineTo(t-1-i,e-1),s.stroke();const n=.35;let o=this.physics;if(this.debugFocusAI&&this.race&&this.race.aiRacers){const f=this.race.aiRacers.find(g=>g.id===this.debugFocusAI);f&&(o=f)}const a=o.position.x,r=o.position.z,l=o.heading;s.save(),s.translate(t/2,e/2),s.rotate(l+Math.PI),s.fillStyle="#222530";const c=this.world.tileSize,h=Math.round(a/c),d=Math.round(r/c),u=7;for(let f=h-u;f<=h+u;f++)for(let g=d-u;g<=d+u;g++)if(this.world.roadColumns.has(f)||this.world.roadRows.has(g)){const m=f*c-a,p=g*c-r;s.fillRect(m*n-c*n/2,p*n-c*n/2,c*n,c*n)}if(!this.race.active&&this.race.worldEvents&&this.race.worldEvents.forEach(f=>{const g=f.x-a,M=f.z-r,m=1+Math.sin(Date.now()/200)*.15,p=this.getModeColor?this.getModeColor(f.mode).css:"#ff1e1e";s.save(),s.fillStyle=p,s.beginPath(),s.arc(g*n,M*n,5*m,0,Math.PI*2),s.fill(),s.strokeStyle="#ffffff",s.lineWidth=1.5,s.beginPath(),s.arc(g*n,M*n,8*m,0,Math.PI*2),s.stroke(),s.restore()}),this.race.active&&this.race.checkpoints.forEach((f,g)=>{let M=!1,m=!1;if(this.race.mode==="unordered"?(M=!this.race.unorderedCleared.has(g),m=M):(m=g===this.race.currentIndex,M=m),M){const p=f.x-a,A=f.z-r,x=g===this.race.checkpoints.length-1;if(s.save(),m){const b=1+Math.sin(Date.now()/150)*.15;s.fillStyle="#ffb31a",s.beginPath(),s.arc(p*n,A*n,5.5*b,0,Math.PI*2),s.fill(),s.strokeStyle="#ffffff",s.lineWidth=1.5,s.beginPath(),s.arc(p*n,A*n,9*b,0,Math.PI*2),s.stroke()}else x?(s.fillStyle="#ff3b30",s.beginPath(),s.arc(p*n,A*n,6,0,Math.PI*2),s.fill(),s.strokeStyle="#ffffff",s.lineWidth=1,s.beginPath(),s.arc(p*n,A*n,9,0,Math.PI*2),s.stroke()):(s.fillStyle="#ff9900",s.beginPath(),s.arc(p*n,A*n,4,0,Math.PI*2),s.fill());s.restore()}}),this.race.active&&this.race.aiRacers.forEach(f=>{const g=f.position.x-a,M=f.position.z-r;s.fillStyle="#"+f.colorHex.toString(16).padStart(6,"0"),s.beginPath(),s.arc(g*n,M*n,5,0,Math.PI*2),s.fill(),s.strokeStyle="#ffffff",s.lineWidth=1,s.stroke()}),this.pursuit&&this.pursuit.active&&this.pursuit.cops&&this.pursuit.cops.forEach(f=>{const g=f.position.x-a,M=f.position.z-r,m=Math.floor(Date.now()/150)%2===0;s.fillStyle=m?"#ff3b30":"#0066ff",s.beginPath(),s.arc(g*n,M*n,5,0,Math.PI*2),s.fill(),s.strokeStyle="#ffffff",s.lineWidth=1.5,s.stroke()}),this.debugShowTrafficOnMinimap&&this.traffic&&this.traffic.vehicles&&(this.traffic.vehicles.forEach(f=>{const g=f.position.x-a,M=f.position.z-r;s.fillStyle="#6c7182",s.beginPath(),s.arc(g*n,M*n,3.2,0,Math.PI*2),s.fill()}),this.traffic.parkedVehicles&&this.traffic.parkedVehicles.forEach(f=>{const g=f.position.x-a,M=f.position.z-r;s.fillStyle="#444855",s.beginPath(),s.arc(g*n,M*n,2.4,0,Math.PI*2),s.fill()})),this.debugFocusAI&&this.race&&this.race.aiRacers){const f=this.race.aiRacers.find(g=>g.id===this.debugFocusAI);if(f&&f._currentPath&&f._currentPath.length>0){s.strokeStyle="#00f0ff",s.lineWidth=2.5,s.beginPath();const g=f.position.x-a,M=f.position.z-r;s.moveTo(g*n,M*n);for(let m=f._pathWptIdx;m<f._currentPath.length;m++){const p=f._currentPath[m],A=p.x-a,x=p.z-r;s.lineTo(A*n,x*n)}if(s.stroke(),f.debugLookahead){const m=f.debugLookahead.x-a,p=f.debugLookahead.z-r;s.fillStyle="#ffff00",s.beginPath(),s.arc(m*n,p*n,3.5,0,Math.PI*2),s.fill()}}}s.restore(),s.fillStyle=o===this.physics?"#ffc600":"#"+(o.colorHex?o.colorHex.toString(16).padStart(6,"0"):"00f0ff"),s.beginPath(),s.moveTo(t/2,e/2-9),s.lineTo(t/2-6,e/2+7),s.lineTo(t/2+6,e/2+7),s.closePath(),s.fill()}function Zm(){this.hudStatsEl=document.getElementById("stats-hud"),this.statsModeEl=document.getElementById("stats-mode"),this.statsProgressEl=document.getElementById("stats-progress"),this.statsProgressLabelEl=document.getElementById("stats-progress-label"),this.statsTimerEl=document.getElementById("stats-timer"),this.cancelBtnEl=document.getElementById("btn-cancel"),this.racePanelEl=document.querySelector(".race-panel"),!this.debugMenuEnabled&&this.racePanelEl&&(this.racePanelEl.style.display="none"),document.getElementById("btn-sprint").onclick=()=>this.startRace("sprint"),document.getElementById("btn-circuit").onclick=()=>this.startRace("circuit"),document.getElementById("btn-unordered").onclick=()=>this.startRace("unordered"),document.getElementById("btn-autocross").onclick=()=>this.startRace("autocross"),this.cancelBtnEl.onclick=()=>this.cancelRace(),this.checkpointVisualsGroup=new Vt,this.scene.add(this.checkpointVisualsGroup)}function Km(s){if(!this.world||!this.world.breakables)return;this._breakFrustum||(this._breakFrustum=new Tn,this._breakProjMat=new se),this._breakProjMat.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse),this._breakFrustum.setFromProjectionMatrix(this._breakProjMat);const t=this._breakFrustum,e=[{position:this.physics.position,velocity:this.physics.velocity,radius:2.2,isPlayer:!0}];this.race.active&&this.race.aiRacers.forEach(i=>{e.push({position:i.position,velocity:i.velocity||new R,radius:2,isPlayer:!1})}),this.pursuit&&this.pursuit.active&&this.pursuit.cops.forEach(i=>{if(i.active){const o=new R(Math.sin(i.heading),0,Math.cos(i.heading)).clone().multiplyScalar(i.speed);e.push({position:i.position,velocity:o,radius:2,isPlayer:!1})}}),this.traffic&&this.traffic.vehicles&&(this._trafficFwdScratch||(this._trafficFwdScratch=new R),this.traffic.vehicles.forEach(i=>{this._trafficFwdScratch.set(Math.sin(i.heading),0,Math.cos(i.heading)),e.push({position:i.position,velocity:this._trafficFwdScratch.clone().multiplyScalar(i.speed).add(i.impactVelocity),radius:2,isPlayer:!1})})),this.traffic&&this.traffic.parkedVehicles&&this.traffic.parkedVehicles.forEach(i=>{e.push({position:i.position,velocity:i.impactVelocity.clone(),radius:2,isPlayer:!1})}),this.world.breakables.forEach(i=>{if(i.broken){if(i.velocity.y+=-46*s,i.group.position.addScaledVector(i.velocity,s),i.group.rotation.x+=i.angularVelocity.x*s,i.group.rotation.y+=i.angularVelocity.y*s,i.group.rotation.z+=i.angularVelocity.z*s,i.type==="hydrant"&&(i.sprayTimer===void 0&&(i.sprayTimer=18),i.sprayTimer>0)){i.sprayTimer-=s;let d=!1;if((this.physics.position.x-i.position.x)**2+(this.physics.position.z-i.position.z)**2<5&&(d=!0),!d&&this.race&&this.race.active)for(let f=0;f<this.race.aiRacers.length;f++){const g=this.race.aiRacers[f];if((g.position.x-i.position.x)**2+(g.position.z-i.position.z)**2<5){d=!0;break}}if(!d&&this.pursuit&&this.pursuit.active)for(let f=0;f<this.pursuit.cops.length;f++){const g=this.pursuit.cops[f];if(g.active&&(g.position.x-i.position.x)**2+(g.position.z-i.position.z)**2<5){d=!0;break}}if(!d&&this.traffic&&this.traffic.vehicles)for(let f=0;f<this.traffic.vehicles.length;f++){const g=this.traffic.vehicles[f];if((g.position.x-i.position.x)**2+(g.position.z-i.position.z)**2<5){d=!0;break}}if(!d&&this.traffic&&this.traffic.parkedVehicles)for(let f=0;f<this.traffic.parkedVehicles.length;f++){const g=this.traffic.parkedVehicles[f];if((g.position.x-i.position.x)**2+(g.position.z-i.position.z)**2<5){d=!0;break}}if(!d){const f=i.position.clone();f.y=this.world.getGroundHeight(f.x,f.z)+.25;const g=new R((Math.random()-.5)*.12,1,(Math.random()-.5)*.12).normalize();this.spawnParticles(f,g,11197951,3,!0)}}const n=this.world.getGroundHeight(i.group.position.x,i.group.position.z),o=new R(0,1,0).applyQuaternion(i.group.quaternion),a=Math.abs(o.dot(new R(0,1,0))),r=i.comHeight!==void 0?i.comHeight:4.25,l=i.radius!==void 0?i.radius:.22,c=n+Bs.lerp(l,r,a);if(i.group.position.y<c){i.group.position.y=c;const d=a<.15;if(d)i.velocity.y<-1.5?i.velocity.y=-i.velocity.y*.22:i.velocity.y=0,i.velocity.x*=.48*Math.exp(-s*6.5),i.velocity.z*=.48*Math.exp(-s*6.5),i.angularVelocity.multiplyScalar(.35*Math.exp(-s*5));else{const m=16*Math.sqrt(1-a*a),p=o.z,A=-o.x;i.angularVelocity.x+=p*m*s,i.angularVelocity.z+=A*m*s,i.velocity.x*=.98,i.velocity.z*=.98}let u=Math.round(i.group.rotation.x/(Math.PI/2))*(Math.PI/2),f=Math.round(i.group.rotation.z/(Math.PI/2))*(Math.PI/2);Math.abs(u)<.1&&Math.abs(f)<.1&&(Math.abs(i.velocity.x)>Math.abs(i.velocity.z)?f=i.velocity.x>0?-Math.PI/2:Math.PI/2:u=i.velocity.z>0?Math.PI/2:-Math.PI/2);const g=d?7:2.5;i.group.rotation.x+=(u-i.group.rotation.x)*g*s,i.group.rotation.z+=(f-i.group.rotation.z)*g*s}const h=t.containsPoint(i.group.position);i.fadeTimer-=s,!h&&i.fadeTimer<=0&&(i.group.scale.multiplyScalar(Math.max(0,1-s*2.5)),i.group.scale.x<.05&&(i.group.visible=!1,this.scene.remove(i.group),i.shouldRemove=!0))}else for(let n of e){const o=n.position.distanceTo(i.position),a=n.radius+(i.radius!==void 0?i.radius:.6);if(o<a){const r=n.velocity.length();if(r<4){const h=n.position.clone().sub(i.position);h.y=0,h.normalize();const d=a-o;n.position.addScaledVector(h,d);const u=n.velocity.dot(h);u<0&&n.velocity.addScaledVector(h,-1.2*u);continue}if(i.broken=!0,i.fadeTimer=10,i.group&&i.group.parent){const h=new R,d=new Ie;i.group.getWorldPosition(h),i.group.getWorldQuaternion(d),i.group.parent.remove(i.group),i.group.position.copy(h),i.group.quaternion.copy(d),this.scene.add(i.group)}const l=n.velocity.clone().normalize();if(r>2){const h=Math.max(r*.82+3.5,6);i.velocity.copy(l).multiplyScalar(h),i.velocity.y=Math.max(r*.32+3.8,4.5),i.angularVelocity.set((Math.random()-.5)*4.5,(Math.random()-.5)*1.5,(Math.random()-.5)*4.5)}else i.velocity.copy(l).multiplyScalar(4),i.velocity.y=4.5,i.angularVelocity.set((Math.random()-.5)*3.5,(Math.random()-.5)*1,(Math.random()-.5)*3.5);i.velocity.y+=.8,i.angularVelocity.x+=(Math.random()-.5)*1,i.angularVelocity.z+=(Math.random()-.5)*1,i.lights.forEach(h=>{h.intensity=0}),i.flares.forEach(h=>{h.visible=!1}),i.poolMeshes&&i.poolMeshes.forEach(h=>{h.visible=!1}),i.group.traverse(h=>{h.name==="lightCone"&&(h.visible=!1)}),i.type==="trafficlight"&&i.group.traverse(h=>{h.isMesh&&h.material&&h!==i.group.children[0]&&h.name!=="lightCone"&&(h.material=this.world.tlHousingMat)}),n.isPlayer&&r>8&&(this.crashShake=Math.min(.5,r*.025),this.physics.velocity.multiplyScalar(.92));const c=i.position.clone();c.y=.8,i.type==="hydrant"?(this.spawnParticles(c,l,11197951,18,!0),this.spawnDebris(c,l,14492194,5)):(this.spawnParticles(c,l,16755200,10,!1,!0),this.spawnDebris(c,l,3355443,5));break}}}),this.world.breakables=this.world.breakables.filter(i=>!i.shouldRemove)}function Jm(s=.016){const t=this.physics.position,e=this.physics.heading,i=new R(Math.sin(e),0,Math.cos(e));let n=!1;const o=[];this.traffic&&this.traffic.vehicles&&o.push(...this.traffic.vehicles),this.race.active&&this.race.aiRacers&&o.push(...this.race.aiRacers),this.pursuit&&this.pursuit.active&&this.pursuit.cops&&o.push(...this.pursuit.cops);for(const a of o){if(a.opacity!==void 0&&a.opacity<.5)continue;const r=a.position.clone().sub(t);r.y=0;const l=r.length();if(l>4.5&&l<40&&(r.normalize(),r.dot(i)>.88&&new R(Math.sin(a.heading),0,Math.cos(a.heading)).dot(i)>.6)){n=!0;break}}if(this.physics.inSlipstream=n,n){this.draftNitroGained===void 0&&(this.draftNitroGained=0),this.draftNitroGained+=.08*s,this.physics.nitroLevel=Math.min(this.physics.maxNitro,this.physics.nitroLevel+.08*s);const a=Math.round(this.draftNitroGained*100);if(this.showNotification("draft_active",`DRAFTING +${a}%`,0),Math.random()<.35){const r=new R((Math.random()-.5)*1.5,.4+Math.random()*.4,1.8).applyMatrix4(this.carVisualContainer.matrixWorld),l=i.clone().negate();this.spawnParticles(r,l,16777215,1)}}else{if(this.draftNitroGained!==void 0&&this.draftNitroGained>.03){const a=Math.round(this.draftNitroGained*100);this.removeNotification("draft_active"),this.showNotification("draft_done",`DRAFT! +${a}%`,1500,!0)}else this.removeNotification("draft_active");this.draftNitroGained=0}}function Qm(s){this.nearMissCooldowns||(this.nearMissCooldowns=new Map);for(const[n,o]of this.nearMissCooldowns.entries())o<=s?this.nearMissCooldowns.delete(n):this.nearMissCooldowns.set(n,o-s);if(this.physics.velocity.length()<15)return;const e=this.physics.position,i=[];this.traffic&&this.traffic.vehicles&&this.traffic.vehicles.forEach(n=>{i.push({id:`traffic_${n.id}`,position:n.position,opacity:n.opacity})}),this.race.active&&this.race.aiRacers&&this.race.aiRacers.forEach(n=>{i.push({id:`ai_${n.id}`,position:n.position,opacity:1})}),this.pursuit&&this.pursuit.active&&this.pursuit.cops&&this.pursuit.cops.forEach(n=>{n.active&&i.push({id:`cop_${n.id}`,position:n.position,opacity:1})});for(const n of i){if(n.opacity!==void 0&&n.opacity<.5)continue;const o=e.distanceTo(n.position);o>2.2&&o<5&&(this.nearMissCooldowns.has(n.id)||(this.physics.nitroLevel=Math.min(this.physics.maxNitro,this.physics.nitroLevel+.15),this.nearMissCooldowns.set(n.id,3),this.showNotification("nearmiss_done","NEAR MISS! +15%",1500,!0)))}}function tg(s){this.prevIsDrifting===void 0&&(this.prevIsDrifting=!1),this.driftNitroGained===void 0&&(this.driftNitroGained=0);const t=this.physics.isDrifting;if(t){const e=this.physics.velocity.dot(new R(Math.cos(this.physics.heading),0,-Math.sin(this.physics.heading))),i=Math.min(2,Math.abs(e)/8),n=.075*s*i;this.driftNitroGained+=n;const o=Math.round(this.driftNitroGained*100);this.showNotification("drift_active",`DRIFTING +${o}%`,0)}else{if(this.prevIsDrifting&&this.driftNitroGained>.03){const e=Math.round(this.driftNitroGained*100);this.removeNotification("drift_active"),this.showNotification("drift_done",`DRIFT! +${e}%`,1500,!0)}else this.removeNotification("drift_active");this.driftNitroGained=0}this.prevIsDrifting=t}const me=new R,oe=new R,Ee=new R,ll=new R,un=new Ie,cl=new Ie,hl=new Yn;class eg{constructor(){this.container=document.getElementById("canvas-container"),this.speedValEl=document.getElementById("speed-val"),this.driftStatusEl=document.getElementById("drift-status"),this.loaderEl=document.getElementById("loader"),this.gearValEl=document.getElementById("gear-val"),this.dialNeedleEl=document.getElementById("dial-needle"),this.dialRpmFillEl=document.getElementById("dial-rpm-fill"),this.nitroBarEl=document.getElementById("dial-nitro-fill"),this.nitroPctEl=document.getElementById("nitro-pct"),this.stuntNotifEl=document.getElementById("stunt-notif"),this.stuntTitleEl=document.getElementById("stunt-title"),this.stuntScoreEl=document.getElementById("stunt-score"),this.nearMissCooldowns=new Map,this.driftNitroGained=0,this.prevIsDrifting=!1,this.gearShiftPunch=0,this.debugShowTrafficOnMinimap=!1,this.keys={},this.inFeedbackMenu=!1,this.debugMenuEnabled=!1,this.physics=new hm,this.race=new um,this.setupFeedbackUI(),this.inMainMenu=!0,this.cinematicManager=new pm(this),this.aiMeshes=[],this.pursuit=new _m(this),this.copFlashEl=document.getElementById("cop-flash"),this.heatHudEl=document.getElementById("heat-hud"),this.heatHudValueEl=document.getElementById("heat-hud-value"),this.heatHudLosEl=document.getElementById("heat-hud-los"),this.heatFillEl=document.getElementById("heat-fill"),this.bustedContainerEl=document.getElementById("busted-container"),this.bustedFillEl=document.getElementById("busted-fill"),this.noiseOverlayEl=document.getElementById("noise-overlay"),this.lensflareTex=O0(),this.nitroFlareTex=k0(),this.nitroSpriteMat=new $e({map:this.nitroFlareTex,color:16777215,blending:xe,transparent:!0,depthWrite:!1}),this.initThree(),this.world=new lm(this.scene),this.isInitialLoad=!0;const t=["x","z"];this.menuCameraAxis=t[Math.floor(Math.random()*t.length)],this.menuCameraDir=Math.random()>.5?1:-1,this.menuCameraBaseOffset=180+Math.random()*80;const e=this.world.getGroundHeight(this.physics.position.x,this.physics.position.z);this.physics.position.y=e+.5,this.createCarMesh(),this.createNavigationArrow(),this.initInput(),this.initMinimap(),this.initParticles(),this.initCheckpointSmoke(),this.initDebris(),this.slowMoTimer=0,this.crashShake=0,this.initSkidmarks(),this.initNotifications(),this.initRaceHUD(),this.initDebugVisuals(),this.perf={world:0,physics:0,traffic:0,trafficUpdate:0,trafficMesh:0,collisions:0,playerVisuals:0,pursuit:0,race:0,particles:0,render:0,eyeAdaptation:0,total:0},this.createPerfHUD(),this.traffic=new mm(this.scene,30),this.traffic.init(this.physics.position,this.world),this.race.selectNewWorldEvent(this.world,this.physics.position),this.lastEventRefreshPos=this.physics.position.clone(),this.eventPromptEl=document.createElement("div"),this.eventPromptEl.className="event-prompt-container",this.eventPromptEl.innerHTML=`
      <div id="event-prompt-stats" class="event-prompt-stats"></div>
      <div id="event-prompt-mode" class="event-prompt-title">CIRCUIT EVENT</div>
      <div class="event-prompt-action">PRESS [F] TO START</div>
    `,document.body.appendChild(this.eventPromptEl),this.eventPromptModeEl=document.getElementById("event-prompt-mode"),this.eventPromptStatsEl=document.getElementById("event-prompt-stats"),this.precompileShaders(),this.inMainMenu=!0,this.menuTransitionTime=0,this.menuTransitionDuration=2,this.mainMenuEl=document.getElementById("main-menu"),this.hudLayerEl=document.querySelector(".hud-layer"),this.hudLayerEl&&(this.hudLayerEl.style.display="none"),this.racePanelEl=document.querySelector(".race-panel"),this.racePanelEl&&(this.racePanelEl.style.display="none");const i=document.getElementById("btn-play");i&&(i.onclick=()=>{this.inMainMenu&&this.menuTransitionTime===0&&(this.menuTransitionTime=.001,this.mainMenuEl&&(this.mainMenuEl.classList.add("fade-out"),setTimeout(()=>{this.mainMenuEl.remove()},600)))}),setTimeout(()=>{this.loaderEl&&(this.loaderEl.style.opacity=0,setTimeout(()=>this.loaderEl.remove(),500))},800),this.clock=new Kl,this.animate()}initThree(){this.scene=new M0,this.scene.background=new te(1251110),this.scene.fog=new ra(1251110,.0072),this.renderer=new $l({antialias:!0}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.25)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=fl,this.renderer.toneMapping=ta,this.renderer.toneMappingExposure=1,this.container.appendChild(this.renderer.domElement),this.camera=new Ue(45,window.innerWidth/window.innerHeight,.1,1e3),this.camHeading=0;const t=new C0(3490136,.95);this.scene.add(t),this.dirLight=new A0(7043993,.9),this.dirLight.position.set(.6,1.2,.4).normalize(),this.dirLight.castShadow=!1,this.scene.add(this.dirLight);const e=new w0(1316907,789260,.35);this.scene.add(e);const i=new N0(this.scene,this.camera),n=new B0;this.composer=new z0(this.renderer),this.composer.addPass(i),this.composer.addPass(n),window.addEventListener("resize",()=>{this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight),this.composer.setSize(window.innerWidth,window.innerHeight)})}createVoxelCarMesh(t,e="sports"){return H0(t,e,this.lensflareTex)}updateVehicleLOD(t,e,i=1){if(!t.meshGroup)return;let n=1;e>95?n=0:e>80&&(n=1-(e-80)/15);const o=n<=0;t._lastLOD!==o&&(t._lastLOD=o,t.wheels&&t.wheels.forEach(l=>l.visible=!o),t.meshGroup.children.forEach(l=>{l.name!=="carBody"&&l.name!=="headlightPool"&&(l.visible=!o)}));const a=i,r=n*i;if(t._lastBodyOpacity!==a||t._lastDetailOpacity!==r){t._lastBodyOpacity=a,t._lastDetailOpacity=r;const l=a>.005;if(t.meshGroup.visible=l,l){const c=t.meshGroup.getObjectByName("carBody");c&&c.material&&(c.material.transparent=a<1,c.material.opacity=a),o||t.meshGroup.children.forEach(h=>{h.name!=="carBody"&&h.name!=="headlightPool"&&h.traverse(d=>{d.isMesh&&d.material&&(d.material.transparent=!0,d.material.opacity=r)})})}}}createCarMesh(){const{carGroup:t,wheels:e}=this.createVoxelCarMesh(1719692,"sports"),i=t.getObjectByName("headlightPool");i&&(i.material.opacity=0),this.carGroup=t,this.wheels=e,this.playerTaillightMat=new fe({color:11145489});const n=this.carGroup.getObjectByName("taillights");n&&(n.material=this.playerTaillightMat),this.tailLight=new Ps(16711680,1.2,12,1.3),this.tailLight.position.set(0,.42,-2.35),this.carGroup.add(this.tailLight),this.nitroLight=new Ps(61695,0,15,1.4),this.nitroLight.position.set(0,.3,-2.15),this.carGroup.add(this.nitroLight),this.reverseLightMat=new fe({color:16777215}),this.reverseLightPoint=new Ps(16777215,0,8,1.5),this.reverseLightPoint.position.set(0,.42,-2.4),this.carGroup.add(this.reverseLightPoint);const o=new H(.25,.1,.1);this.reverseLightL=new tt(o,this.reverseLightMat),this.reverseLightL.position.set(-.55,.42,-2.36),this.reverseLightL.visible=!1,this.carGroup.add(this.reverseLightL),this.reverseLightR=new tt(o,this.reverseLightMat),this.reverseLightR.position.set(.55,.42,-2.36),this.reverseLightR.visible=!1,this.carGroup.add(this.reverseLightR),this.nitroLeftSprite=new ze(this.nitroSpriteMat),this.nitroLeftSprite.position.set(-.6,.2,-2.1),this.nitroLeftSprite.scale.set(.001,.001,.001),this.carGroup.add(this.nitroLeftSprite),this.nitroRightSprite=new ze(this.nitroSpriteMat),this.nitroRightSprite.position.set(.6,.2,-2.1),this.nitroRightSprite.scale.set(.001,.001,.001),this.carGroup.add(this.nitroRightSprite),this.leftSpotTarget=new ce,this.leftSpotTarget.position.set(-.65,.4,15),this.scene.add(this.leftSpotTarget),this.leftSpot=new Vr(16775910,14,50,Math.PI/14,.85,1),this.leftSpot.position.set(-.65,.4,2.35),this.leftSpot.target=this.leftSpotTarget,this.carGroup.add(this.leftSpot),this.rightSpotTarget=new ce,this.rightSpotTarget.position.set(.65,.4,15),this.scene.add(this.rightSpotTarget),this.rightSpot=new Vr(16775910,14,50,Math.PI/14,.85,1),this.rightSpot.position.set(.65,.4,2.35),this.rightSpot.target=this.rightSpotTarget,this.carGroup.add(this.rightSpot),this.carVisualContainer=new Vt,this.carVisualContainer.add(this.carGroup),this.scene.add(this.carVisualContainer)}updateHeadlightFlares(t,e){if(t._flareThrottle||(t._flareThrottle=0),t._flareThrottle=(t._flareThrottle+1)%3,t._flareThrottle!==0)return;const i=t.getObjectByName("leftHeadlightSprite"),n=t.getObjectByName("rightHeadlightSprite");if(!i||!n)return;const o=this.camera.position;this._flScratch||(this._flScratch={lw:new R,rw:new R,fw:new R,tcl:new R,tcr:new R});const a=this._flScratch;a.lw.copy(i.position).applyMatrix4(t.matrixWorld),a.rw.copy(n.position).applyMatrix4(t.matrixWorld);const r=o.distanceTo(a.lw);if(r>340){i.material.opacity=0,n.material.opacity=0;return}const l=o.distanceTo(a.rw);a.fw.set(Math.sin(e),0,Math.cos(e)),a.tcl.copy(o).sub(a.lw).normalize(),a.tcr.copy(o).sub(a.rw).normalize();const c=a.fw.dot(a.tcl),h=a.fw.dot(a.tcr),d=Math.max(0,1-r/340),u=Math.max(0,1-l/340),f=Math.pow(Math.max(0,c),3.5)*d,g=Math.pow(Math.max(0,h),3.5)*u;i.material.opacity=f*.95,i.scale.set(3.4*(.3+f*1.5),.7*(.3+f*1.5),1),n.material.opacity=g*.95,n.scale.set(3.4*(.3+g*1.5),.7*(.3+g*1.5),1)}deformHeadlightPoolToTerrain(t){const e=t.getObjectByName("headlightPool");if(!e||!e.visible||e.material.opacity<=.01)return;e.updateMatrixWorld(!0);const i=new se().copy(e.matrixWorld).invert(),n=e.geometry.attributes.position,o=new R;for(let a=0;a<n.count;a++){const r=n.getX(a),l=n.getZ(a);o.set(r,0,l).applyMatrix4(e.matrixWorld);const c=this.world.getGroundHeight(o.x,o.z);o.set(o.x,c+.05,o.z).applyMatrix4(i),n.setY(a,o.y)}n.needsUpdate=!0}createNavigationArrow(){this.navArrow=new Vt,this.navArrow.renderOrder=9999;const t=new Ft({color:15051067,emissive:15051067,emissiveIntensity:.6,roughness:.6,metalness:.3,depthTest:!1,depthWrite:!1,transparent:!0}),e=new H(.3,.15,1.2),i=new tt(e,t);i.position.z=-.4,i.castShadow=!0,i.receiveShadow=!0,i.renderOrder=9999,this.navArrow.add(i);const n=new Wn(.5,1,4);n.rotateX(Math.PI/2);const o=new tt(n,t);o.position.z=.5,o.castShadow=!0,o.receiveShadow=!0,o.renderOrder=9999,this.navArrow.add(o),this.navArrow.position.set(0,1.7,-.3),this.navArrow.rotation.x=-.32,this.navArrow.visible=!1,this.carVisualContainer.add(this.navArrow)}initInput(){return ym.call(this)}initDebugVisuals(){return vm.call(this)}cycleCameraFocus(){return wm.call(this)}cycleCameraMode(){return Em.call(this)}getTargetGameplayCamera(){return bm.call(this)}initMinimap(){this.minimapCanvas=document.getElementById("minimap-canvas"),this.minimapCtx=this.minimapCanvas.getContext("2d"),this.minimapCanvas.width=140,this.minimapCanvas.height=140}createPerfHUD(){const t=document.createElement("div");t.id="perf-hud",t.style.position="absolute",t.style.top="10px",t.style.left="10px",t.style.backgroundColor="rgba(0, 0, 0, 0.85)",t.style.color="#00ffcc",t.style.fontFamily="monospace",t.style.fontSize="12px",t.style.padding="10px",t.style.borderRadius="5px",t.style.zIndex="99999",t.style.border="1px solid #00ffcc",t.style.pointerEvents="none",t.style.display="none",t.innerHTML=`
      <div style="font-weight:bold;margin-bottom:5px;border-bottom:1px solid #00ffcc;">PERFORMANCE HUD</div>
      <div>FPS: <span id="perf-fps">0</span></div>
      <div>Total Frame: <span id="perf-total">0.0</span>ms</div>
      <div>World/Chunks: <span id="perf-world">0.0</span>ms</div>
      <div>Physics: <span id="perf-physics">0.0</span>ms</div>
      <div>Traffic AI: <span id="perf-traffic-update">0.0</span>ms</div>
      <div>Traffic Mesh: <span id="perf-traffic-mesh">0.0</span>ms</div>
      <div>Collisions: <span id="perf-collisions">0.0</span>ms</div>
      <div>Player Visuals: <span id="perf-player-visuals">0.0</span>ms</div>
      <div>Pursuit: <span id="perf-pursuit">0.0</span>ms</div>
      <div>Race/AI: <span id="perf-race">0.0</span>ms</div>
      <div>Particles/Ticks: <span id="perf-particles">0.0</span>ms</div>
      <div>Render Frame: <span id="perf-render">0.0</span>ms</div>
      <div>Eye Adaptation: <span id="perf-eye">0.0</span>ms</div>
      <div style="margin-top:5px;font-size:10px;color:#aaa;border-top:1px solid #444;padding-top:5px;">THREE.JS INFO</div>
      <div>Draw Calls: <span id="perf-calls">0</span></div>
      <div>Triangles: <span id="perf-triangles">0</span></div>
      <div>Geometries: <span id="perf-geometries">0</span></div>
      <div>Textures: <span id="perf-textures">0</span></div>
      <div>Shaders: <span id="perf-shaders">0</span></div>
      <div style="margin-top:5px;font-size:10px;color:#aaa;">Press 'P' to toggle HUD</div>
    `,document.body.appendChild(t),window.addEventListener("keydown",e=>{e.key.toLowerCase()==="p"&&(t.style.display=t.style.display==="none"?"block":"none")}),this.perfFpsEl=document.getElementById("perf-fps"),this.perfTotalEl=document.getElementById("perf-total"),this.perfWorldEl=document.getElementById("perf-world"),this.perfPhysicsEl=document.getElementById("perf-physics"),this.perfTrafficUpdateEl=document.getElementById("perf-traffic-update"),this.perfTrafficMeshEl=document.getElementById("perf-traffic-mesh"),this.perfCollisionsEl=document.getElementById("perf-collisions"),this.perfPlayerVisualsEl=document.getElementById("perf-player-visuals"),this.perfPursuitEl=document.getElementById("perf-pursuit"),this.perfRaceEl=document.getElementById("perf-race"),this.perfParticlesEl=document.getElementById("perf-particles"),this.perfRenderEl=document.getElementById("perf-render"),this.perfEyeEl=document.getElementById("perf-eye"),this.perfCallsEl=document.getElementById("perf-calls"),this.perfTrianglesEl=document.getElementById("perf-triangles"),this.perfGeometriesEl=document.getElementById("perf-geometries"),this.perfTexturesEl=document.getElementById("perf-textures"),this.perfShadersEl=document.getElementById("perf-shaders")}setupFeedbackUI(){const t=document.getElementById("btn-feedback-toggle"),e=document.getElementById("feedback-modal"),i=document.getElementById("btn-feedback-cancel"),n=document.getElementById("feedback-form"),o=document.getElementById("feedback-status"),a=()=>{this.inFeedbackMenu=!0,e.style.display="flex",n.reset(),o.textContent="",setTimeout(()=>n.querySelector("textarea").focus(),10)},r=()=>{this.inFeedbackMenu=!1,e.style.display="none",document.activeElement.blur()};t&&t.addEventListener("click",a),i&&i.addEventListener("click",r);const l=document.getElementById("btn-like-race"),c=document.getElementById("btn-dislike-race"),h=document.getElementById("quick-feedback-thanks"),d=u=>{fetch("https://formspree.io/f/xykqyobp",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({message:`Quick Feedback: User rated the ${this.race?this.race.mode:"race"} as ${u}`})}).catch(f=>console.error(f)),l&&(l.style.display="none"),c&&(c.style.display="none"),h&&(h.style.display="block")};l&&l.addEventListener("click",()=>d("LIKE")),c&&c.addEventListener("click",()=>d("DISLIKE")),window.addEventListener("keydown",u=>{u.key.toLowerCase()==="b"&&!this.inFeedbackMenu&&document.activeElement.tagName!=="INPUT"&&document.activeElement.tagName!=="TEXTAREA"?a():u.key==="Escape"&&this.inFeedbackMenu&&r()}),n&&n.addEventListener("submit",u=>{u.preventDefault();const f=new FormData(n);o.textContent="Sending...",o.style.color="#fff",fetch(n.action,{method:n.method,body:f,headers:{Accept:"application/json"}}).then(g=>{g.ok?(o.textContent="Thanks for your feedback!",o.style.color="#00ffcc",setTimeout(r,1500)):(o.textContent="Oops! There was a problem submitting your form",o.style.color="#ff1e1e")}).catch(g=>{o.textContent="Oops! There was a problem submitting your form",o.style.color="#ff1e1e"})})}precompileShaders(){const t=new Vt;this.scene.add(t);const e=[];this.world&&(this.world.asphaltMaterials&&e.push(...this.world.asphaltMaterials),this.world.concreteMat&&e.push(this.world.concreteMat),this.world.yellowLineMat&&e.push(this.world.yellowLineMat),this.world.whiteLineMat&&e.push(this.world.whiteLineMat),this.world.materials&&e.push(...this.world.materials),this.world.windowDetailedMat&&e.push(this.world.windowDetailedMat),this.world.doorMat&&e.push(this.world.doorMat),this.world.accessoryMat&&e.push(this.world.accessoryMat),this.world.trunkMat&&e.push(this.world.trunkMat),this.world.leafMat&&e.push(this.world.leafMat),this.world.leafCherryMat&&e.push(this.world.leafCherryMat),this.world.leafAutumnMat&&e.push(this.world.leafAutumnMat),this.world.streetlightPoleMat&&e.push(this.world.streetlightPoleMat),this.world.streetlightBulbMat&&e.push(this.world.streetlightBulbMat),this.world.ledGroundLightPoolMat&&e.push(this.world.ledGroundLightPoolMat),this.world.sodiumGroundLightPoolMat&&e.push(this.world.sodiumGroundLightPoolMat),this.world.storefrontGroundLightPoolMat&&e.push(this.world.storefrontGroundLightPoolMat),this.world.lightConeMatLED&&e.push(this.world.lightConeMatLED),this.world.lightConeMatSodium&&e.push(this.world.lightConeMatSodium),this.world.tlRedOnMat&&e.push(this.world.tlRedOnMat),this.world.tlRedOffMat&&e.push(this.world.tlRedOffMat),this.world.tlYellowOnMat&&e.push(this.world.tlYellowOnMat),this.world.tlYellowOffMat&&e.push(this.world.tlYellowOffMat),this.world.tlGreenOnMat&&e.push(this.world.tlGreenOnMat),this.world.tlGreenOffMat&&e.push(this.world.tlGreenOffMat),this.world.tlHousingMat&&e.push(this.world.tlHousingMat),this.world.benchWoodMat&&e.push(this.world.benchWoodMat),this.world.benchIronMat&&e.push(this.world.benchIronMat),this.world.phoneBoothFrameMat&&e.push(this.world.phoneBoothFrameMat),this.world.phoneBoothGlassMat&&e.push(this.world.phoneBoothGlassMat),this.world.phoneBoothScreenMat&&e.push(this.world.phoneBoothScreenMat),this.world.trashCanMat&&e.push(this.world.trashCanMat),this.world.trashCanLidMat&&e.push(this.world.trashCanLidMat),this.world.dumpsterMat&&e.push(this.world.dumpsterMat),this.world.cardboardMat&&e.push(this.world.cardboardMat),this.world.trashBagMat&&e.push(this.world.trashBagMat),this.world.woodPoleMat&&e.push(this.world.woodPoleMat),this.world.hydrantRedMat&&e.push(this.world.hydrantRedMat),this.world.hydrantCapMat&&e.push(this.world.hydrantCapMat),this.world.newspaperBodyMat&&e.push(this.world.newspaperBodyMat),this.world.newspaperGlassMat&&e.push(this.world.newspaperGlassMat),this.world.newspaperPaperMat&&e.push(this.world.newspaperPaperMat),this.world.billboardColors&&this.world.billboardColors.forEach(o=>{e.push(new Ft({color:1118481,emissive:o,emissiveIntensity:4}))})),this.playerTaillightMat&&e.push(this.playerTaillightMat),this.particlePool&&this.particlePool.length>0&&e.push(this.particlePool[0].mat),this.smokePool&&this.smokePool.length>0&&e.push(this.smokePool[0].mat),this.skidMaterials&&e.push(...this.skidMaterials),this.debrisPool&&this.debrisPool.length>0&&e.push(this.debrisPool[0].material);const i=new H(.1,.1,.1);e.forEach(o=>{const a=new tt(i,o);t.add(a)}),["sports","pickup","van","cop","sedan"].forEach(o=>{const{carGroup:a}=this.createVoxelCarMesh(1719692,o);t.add(a)}),this.renderer.compile(this.scene,this.camera),t.traverse(o=>{o.geometry&&o.geometry.dispose()}),this.scene.remove(t),i.dispose()}getParticleMaterial(t,e){return Pm.call(this,t,e)}getSmokeMaterial(t,e){return Lm.call(this,t,e)}getModeColor(t){switch(t){case"sprint":return{hex:12592895,css:"#c026ff",glow:"rgba(192, 38, 255, 0.9)"};case"circuit":return{hex:16719390,css:"#ff1e1e",glow:"rgba(255, 30, 30, 0.9)"};case"autocross":return{hex:58879,css:"#00e5ff",glow:"rgba(0, 229, 255, 0.9)"};case"unordered":return{hex:16762368,css:"#ffc600",glow:"rgba(255, 198, 0, 0.9)"};default:return{hex:16719390,css:"#ff1e1e",glow:"rgba(255, 30, 30, 0.9)"}}}getEventTextMaterial(t,e){const i=t+"_"+e;if(this._eventTextMaterials||(this._eventTextMaterials={}),this._eventTextMaterials[i])return this._eventTextMaterials[i];const n=document.createElement("canvas");n.width=2048,n.height=256;const o=n.getContext("2d");o.clearRect(0,0,n.width,n.height),o.font='italic 900 130px "Barlow Condensed", "Outfit", sans-serif',o.textAlign="center",o.textBaseline="middle",o.fillStyle="#ffffff";const a=this.getModeColor(e);o.shadowColor=a.glow,o.shadowBlur=20,o.fillText(t.toUpperCase(),n.width/2,n.height/2);const r=new Re(n);r.minFilter=De;const l=new $e({map:r,transparent:!0,depthTest:!0,depthWrite:!1});return this._eventTextMaterials[i]=l,l}initParticles(){return Im.call(this)}initCheckpointSmoke(){return Dm.call(this)}initSkidmarks(){return Um.call(this)}spawnSkidmarkSegment(t,e){return zm.call(this,t,e)}spawnParticles(t,e,i=8947848,n=1,o=!1,a=!1){return Nm.call(this,t,e,i,n,o,a)}spawnCheckpointSmoke(t,e=16755258,i=1,n=1){return Fm.call(this,t,e,i,n)}updateParticles(t){return Bm.call(this,t)}updateCheckpointSmoke(t){return Om.call(this,t)}initDebris(){return Gm.call(this)}spawnDebris(t,e,i,n=5){return km.call(this,t,e,i,n)}updateDebris(t){return Vm.call(this,t)}checkBreakablesCollision(t){return Km.call(this,t)}handleCrashDamage(t,e,i,n){return q0.call(this,t,e,i,n)}checkSlipstream(t=.016){return Jm.call(this,t)}checkNearMisses(t){return Qm.call(this,t)}updateDriftNitro(t){return tg.call(this,t)}initNotifications(){return Xm.call(this)}showNotification(t,e,i=2e3){return qm.call(this,t,e,i)}removeNotification(t){return Ym.call(this,t)}showStuntNotification(t,e){return $m.call(this,t,e)}initRaceHUD(){return Zm.call(this)}buildAIMeshes(){this.clearAIMeshes(),this.race.aiRacers.forEach(t=>{const e=new Vt,{carGroup:i,wheels:n}=this.createVoxelCarMesh(t.colorHex,"sports"),o=new ze(this.nitroSpriteMat);o.position.set(-.6,.2,-2.1),o.scale.set(.001,.001,.001),i.add(o),t.nitroLeftSprite=o;const a=new ze(this.nitroSpriteMat);a.position.set(.6,.2,-2.1),a.scale.set(.001,.001,.001),i.add(a),t.nitroRightSprite=a;const r=new fe({color:t.colorHex,depthTest:!1,depthWrite:!1,transparent:!0,opacity:.6}),l=new Wn(.35,.7,4);l.rotateX(Math.PI);const c=new tt(l,r);c.position.set(0,1.9,0),c.renderOrder=999,i.add(c),t.indicatorMesh=c,e.add(i),this.scene.add(e),t.meshGroup=e,t.wheels=n,t.prevLeftWheel=null,t.prevRightWheel=null,t.smokeTimer=0,this.aiMeshes.push(e)})}clearAIMeshes(){this.race.aiRacers.forEach(t=>{t.leftTrail&&(t.leftTrail.destroy(),t.leftTrail=null),t.rightTrail&&(t.rightTrail.destroy(),t.rightTrail=null)}),this.aiMeshes.forEach(t=>{t.traverse(e=>{e.geometry&&e.geometry.dispose()}),this.scene.remove(t)}),this.aiMeshes=[]}startRace(t,e,i,n){let o,a;if(e!==void 0&&i!==void 0){const h=Array.from(this.world.roadColumns),d=Array.from(this.world.roadRows),u=[];if(h.forEach(f=>{d.forEach(g=>{const M=f*this.world.tileSize,m=g*this.world.tileSize,p=Math.hypot(M-e,m-i);p>=200&&p<=800&&u.push({x:M,z:m,dist:p})})}),u.length>0){const f=u[Math.floor(Math.random()*u.length)];o=f.x,a=f.z}else{const f=Math.random()*Math.PI*2;o=e+Math.cos(f)*320,a=i+Math.sin(f)*320}}else{const c=this.world.tileSize*4;o=(Math.floor(Math.random()*11)-5)*c,a=(Math.floor(Math.random()*11)-5)*c}const r=new R(o,0,a);this._raceStartX=o,this._raceStartZ=a,this.race.startRace(t,this.world,r,0,n),this.pursuit&&this.pursuit.cancelPursuit(),this.physics&&(this.physics.nitroLevel=this.physics.maxNitro),this.hudStatsEl.style.display="none",this.cancelBtnEl.style.display="none",this.statsModeEl.textContent=t.toUpperCase(),this.cinematicManager?this.cinematicManager.start(t):(this.hudStatsEl.style.display="flex",this.cancelBtnEl.style.display="block",this.showBanner("RACE STARTED","Follow the arrow!"),this.rebuildCheckpointBeacons()),setTimeout(()=>{this.traffic&&(!this.cinematicManager||this.cinematicManager.state==="none")&&(this.traffic.clear(),this.traffic.maxVehicles=18,this.traffic.init(this.physics.position,this.world)),this.clock.getDelta()},0)}cancelRace(){this.race.active=!1,this.pursuit&&this.pursuit.cancelPursuit(),this.hudStatsEl.style.display="none",this.cancelBtnEl.style.display="none",this.navArrow.visible=!1,this.clearCheckpointBeacons(),this.clearAIMeshes(),this.showBanner("RACE CANCELLED","Free Roam Mode"),setTimeout(()=>{this.traffic&&(this.traffic.clear(),this.traffic.maxVehicles=30,this.traffic.init(this.physics.position,this.world)),this.clock.getDelta()},0),this.race.selectNewWorldEvent(this.world,this.physics.position)}clearCheckpointBeacons(){for(;this.checkpointVisualsGroup.children.length>0;){const t=this.checkpointVisualsGroup.children[0];t.traverse(e=>{e.geometry&&e.geometry.dispose()}),this.checkpointVisualsGroup.remove(t)}}rebuildCheckpointBeacons(){if(this.clearCheckpointBeacons(),!this.race.active)return;const t=this.race.checkpoints,e=this.race.mode,i=t.length;t.forEach((n,o)=>{let a=!1;if(e==="unordered"?a=!this.race.unorderedCleared.has(o):a=o===this.race.currentIndex,!a)return;const r=this.world&&typeof this.world.getGroundHeight=="function"?this.world.getGroundHeight(n.x,n.z):.5,l=new Vt;l.position.set(n.x,r-.4,n.z),o===i-1||this.getModeColor(e).hex;let h=null;if(e!=="unordered"&&(o<i-1?h=t[o+1]:e==="circuit"&&this.race.lapCurrent<this.race.lapsTotal&&(h=t[0])),h!==null){const d=h.x-n.x,u=h.z-n.z,f=Math.atan2(d,u),g=new Vt;g.position.set(0,3.5,0),g.rotation.y=f;const M=new Vt;M.rotation.x=-.32;const m=new Ft({color:16757530,emissive:16757530,emissiveIntensity:.7,roughness:.5,metalness:.2,depthTest:!0}),p=new tt(new H(.8,.4,3.2),m);p.position.z=.8,p.castShadow=!0,M.add(p);const A=new Wn(1.2,2.2,4);A.rotateX(Math.PI/2);const x=new tt(A,m);x.position.z=2.8,x.castShadow=!0,M.add(x),g.add(M),l.add(g)}this.checkpointVisualsGroup.add(l)})}showBanner(t,e,i=2e3){return Wm.call(this,t,e,i)}updateCamera(t=.016){return Sm.call(this,t)}updateMinimap(){return jm.call(this)}formatTime(t){return Hm.call(this,t)}animate(){const t=performance.now();requestAnimationFrame(()=>this.animate());const e=Math.min(this.clock.getDelta(),.05),i=1/60,n=5;this.physicsAccumulator===void 0&&(this.physicsAccumulator=0),this.prevPhysicsPosition===void 0&&(this.prevPhysicsPosition=this.physics.position.clone()),this.prevPhysicsHeading===void 0&&(this.prevPhysicsHeading=this.physics.heading||0),this.renderPhysicsPosition===void 0&&(this.renderPhysicsPosition=this.physics.position.clone()),this.renderPhysicsHeading===void 0&&(this.renderPhysicsHeading=this.physics.heading||0);const o=performance.now();this.slowMoTimer===void 0&&(this.slowMoTimer=0),this.crashShake===void 0&&(this.crashShake=0),this.slowMoTimer>0&&(this.slowMoTimer-=e),this.crashShake>0&&(this.crashShake*=Math.exp(-6*e),this.crashShake<.01&&(this.crashShake=0));const a=e;if(this.cinematicManager&&this.cinematicManager.update(a),this.inMainMenu)if(this.menuTransitionTime>0){this.menuTransitionTime+=e;const S=Math.min(1,this.menuTransitionTime/this.menuTransitionDuration),N=S*S*(3-2*S);if(!this.menuTransitionStartPos){this.menuTransitionStartPos=this.camera.position.clone();const F=new R(0,0,-1).applyQuaternion(this.camera.quaternion);this.menuTransitionStartLookAt=this.menuTransitionStartPos.clone().addScaledVector(F,20)}const q=this.getTargetGameplayCamera(),j=this.menuTransitionStartPos.clone().lerp(q.pos,N),w=this.menuTransitionStartLookAt.clone().lerp(q.lookAt,N),y=50+(q.fov-50)*N;this.cameraOverride={pos:j,lookAt:w,fov:y},S>=1&&(this.inMainMenu=!1,this.cameraOverride=null,this.menuTransitionStartPos=null,this.menuTransitionStartLookAt=null,this.hudLayerEl&&(this.hudLayerEl.style.display="flex"),this.debugMenuEnabled&&this.racePanelEl&&(this.racePanelEl.style.display="flex"),this.clock.getDelta())}else{const S=Date.now()*1e-4,N=(this.menuCameraBaseOffset-S%40)*this.menuCameraDir,q=80,j=.5;let w=0,y=0,F=0,k=0;this.menuCameraAxis==="z"?(w=0,y=N,F=0,k=y-80*this.menuCameraDir):(y=0,w=N,F=w-80*this.menuCameraDir,k=0),this.cameraOverride={pos:new R(w,q,y),lookAt:new R(F,j,k),fov:48}}if(!this.inMainMenu&&!this.race.active&&this.physics.position&&(this.eventSpawnTimer===void 0&&(this.eventSpawnTimer=0),this.eventSpawnTimer+=e,this.eventSpawnTimer>.16)){this.eventSpawnTimer=0;const S=this.physics.position.x,N=this.physics.position.z,q=90,j=Math.round(S/this.world.tileSize),w=Math.round(N/this.world.tileSize);if(this.race.worldEvents?this.race.worldEvents=this.race.worldEvents.filter(y=>Math.hypot(y.x-S,y.z-N)<=1200):this.race.worldEvents=[],this.race.worldEvents.length<q&&this.world)for(let F=0;F<20&&this.race.worldEvents.length<q;F++){const k=6+Math.floor(Math.random()*20),X=Math.floor(Math.random()*(k*2+1))-k,$=Math.floor(Math.random()*(k*2+1))-k;if(X===0&&$===0)continue;const ut=j+X,K=w+$,lt=ut*this.world.tileSize,Mt=K*this.world.tileSize,St=Math.hypot(lt-S,Mt-N);if((this.world.roadColumns&&this.world.roadColumns.has(ut)||this.world.roadRows&&this.world.roadRows.has(K))&&St>=120&&St<=1800&&!this.race.worldEvents.some(Ct=>Ct.x===lt&&Ct.z===Mt)){const Ct=["sprint","circuit"][Math.floor(Math.random()*2)];this.race.worldEvents.push({x:lt,z:Mt,mode:Ct,laps:Ct==="circuit"?Math.floor(Math.random()*3)+2:1,checkpoints:Math.floor(Math.random()*15)+10,racers:Math.floor(Math.random()*5)+3})}}}let r=!1,l=null,c=1/0;if(!this.inMainMenu&&!this.race.active&&this.race.worldEvents&&this.race.worldEvents.length>0&&(this.race.worldEvents.forEach(S=>{const N=this.physics.position.x-S.x,q=this.physics.position.z-S.z,j=Math.hypot(N,q);j<22&&j<c&&(c=j,l=S,r=!0)}),r&&l)){if(this.eventPromptEl){if(!this.eventPromptActive){this.eventPromptActive=!0;const S=this.world&&typeof this.world.getGroundHeight=="function"?this.world.getGroundHeight(l.x,l.z):.5,N=new R(l.x,S+5,l.z);N.project(this.camera);let q=window.innerWidth/2,j=window.innerHeight/2;N.z<1&&(q=(N.x*.5+.5)*window.innerWidth,j=(-(N.y*.5)+.5)*window.innerHeight),this.eventPromptEl.style.transition="none",this.eventPromptEl.style.left=`${q}px`,this.eventPromptEl.style.top=`${j}px`,this.eventPromptEl.classList.remove("docked","fade-out"),this.eventPromptEl.style.display="flex",setTimeout(()=>{this.eventPromptEl.style.transition="left 0.7s cubic-bezier(0.2, 0.8, 0.2, 1), top 0.7s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.5s ease-out",this.eventPromptEl.style.left="50%",this.eventPromptEl.style.top="72%",this.eventPromptEl.classList.add("docked")},10)}if(this.eventPromptModeEl){this.eventPromptModeEl.textContent=`${l.mode.toUpperCase()} EVENT`;const S=this.getModeColor(l.mode).css;this.eventPromptModeEl.style.color="#ffffff",this.eventPromptEl.style.borderLeftColor=S}if(this.eventPromptStatsEl){const S=l.laps>1?`LAPS: ${l.laps} • `:"";this.eventPromptStatsEl.textContent=`${S}CHECKPOINTS: ${l.checkpoints} • OPPONENTS: ${l.racers}`}}(this.keys.f||this.keys.keyf)&&(this.keys.f=!1,this.keys.keyf=!1,this.eventPromptEl&&(this.eventPromptEl.style.display="none"),this.eventPromptActive=!1,this.startRace(l.mode,l.x,l.z,l))}!r&&this.eventPromptEl&&this.eventPromptEl.style.display!=="none"&&!this.eventPromptEl.classList.contains("fade-out")&&(this.eventPromptEl.classList.add("fade-out"),this.eventPromptActive=!1,setTimeout(()=>{!this.eventPromptActive&&this.eventPromptEl&&(this.eventPromptEl.style.display="none")},500));let h=this.physics;if(this.inMainMenu||this.cinematicManager&&this.cinematicManager.state!=="none"){let S=this.camHeading||0,N=this.camera.position;if(this.cameraOverride){N=this.cameraOverride.pos;const q=this.cameraOverride.lookAt.x-this.cameraOverride.pos.x,j=this.cameraOverride.lookAt.z-this.cameraOverride.pos.z;S=Math.atan2(q,j)}h={position:N,heading:S}}else if(this.debugFocusAI&&this.race&&this.race.aiRacers){const S=this.race.aiRacers.find(N=>N.id===this.debugFocusAI);S&&(h=S)}const d=[];this._eventSprites||(this._eventSprites=[]),!this.race.active&&this.race.worldEvents&&this.race.worldEvents.forEach(S=>{const N=S.x-h.position.x,q=S.z-h.position.z,j=N*N+q*q;let w=this._eventSprites.find(y=>y.evt===S);if(j<260*260){Math.random()<.55&&this.spawnCheckpointSmoke(S,this.getModeColor(S.mode).hex,1.2,1.2);const y=this.world&&typeof this.world.getGroundHeight=="function"?this.world.getGroundHeight(S.x,S.z):.5;if(d.push({x:S.x,y:y+3.6,z:S.z,intensity:12,color:this.getModeColor(S.mode).hex}),w)w.sprite.parent||this.scene.add(w.sprite);else{const lt=S.mode?S.mode+" event":"event",Mt=this.getEventTextMaterial(lt,S.mode).clone(),St=new ze(Mt);this.scene.add(St),w={evt:S,sprite:St},this._eventSprites.push(w)}const F=Math.sqrt(j),k=.4+.6*Math.min(1,Math.pow(F/200,.7));w.sprite.scale.set(64*k,8*k,1),w.sprite.position.set(S.x,y+5,S.z);const X=new R(S.x-this.camera.position.x,y+5-this.camera.position.y,S.z-this.camera.position.z).normalize(),$=new R;this.camera.getWorldDirection($);const ut=X.dot($),K=Math.min(1,Math.max(0,(ut+.2)/.3));w.sprite.material.opacity=K,w.sprite.visible=!(r&&l===S)&&K>0,d.push({x:S.x,y:y+3.6,z:S.z,intensity:15,color:16719390})}else w&&(w.sprite.visible=!1)}),this._eventSprites.length>0&&(this._eventSprites=this._eventSprites.filter(S=>!(this.race.worldEvents&&this.race.worldEvents.includes(S.evt))||this.race.active?(S.sprite.parent&&this.scene.remove(S.sprite),!1):!0)),this.race&&this.race.active&&this.race.checkpoints&&this.race.checkpoints.forEach((S,N)=>{let q=!1;if(this.race.mode==="unordered"?q=!this.race.unorderedCleared.has(N):q=N===this.race.currentIndex,q){const w=this.world&&typeof this.world.getGroundHeight=="function"?this.world.getGroundHeight(S.x,S.z):.5;d.push({x:S.x,y:w+3.6,z:S.z,intensity:12,color:16757530})}}),me.set(Math.sin(this.physics.heading),0,Math.cos(this.physics.heading)),oe.set(Math.cos(this.physics.heading),0,-Math.sin(this.physics.heading));const u=this.physics.position;Ee.copy(u).addScaledVector(me,2.35).addScaledVector(oe,-.65),this.leftSpotTarget.position.copy(Ee).addScaledVector(me,15),Ee.copy(u).addScaledVector(me,2.35).addScaledVector(oe,.65),this.rightSpotTarget.position.copy(Ee).addScaledVector(me,15);const f=this.keys.s||this.keys.arrowdown;if(f?(this.tailLight.intensity=5.5,this.playerTaillightMat.color.setHex(16724787)):(this.tailLight.intensity=1.2,this.playerTaillightMat.color.setHex(11145489)),this.physics.gear==="R"?(this.reverseLightPoint.intensity=3,this.reverseLightL.visible=!0,this.reverseLightR.visible=!0):(this.reverseLightPoint.intensity=0,this.reverseLightL.visible=!1,this.reverseLightR.visible=!1),this.traffic.vehicles.forEach(S=>{if(S.position.distanceTo(h.position)>130)return;me.set(Math.sin(S.heading),0,Math.cos(S.heading)),oe.copy(S.position).addScaledVector(me,3.5),Ee.copy(this.camera.position).sub(oe).normalize();const q=me.dot(Ee),j=Math.pow(Math.max(0,q),2.5);j<=.01||d.push({x:oe.x,y:.4,z:oe.z,intensity:8.5*(S.opacity!==void 0?S.opacity:1)*j,color:16776404})}),this.race&&this.race.active&&this.race.aiRacers&&this.race.aiRacers.forEach(S=>{if(S.meshGroup){if(S.position.distanceTo(h.position)>130)return;me.set(Math.sin(S.heading),0,Math.cos(S.heading)),oe.copy(S.position).addScaledVector(me,3.5),Ee.copy(this.camera.position).sub(oe).normalize();const q=me.dot(Ee),j=Math.pow(Math.max(0,q),2.5);j>.01&&d.push({x:oe.x,y:.4,z:oe.z,intensity:8.5*j,color:16776404}),S.isBoosting&&(oe.set(0,.3,-2.15).applyMatrix4(S.meshGroup.matrixWorld),d.push({x:oe.x,y:oe.y,z:oe.z,intensity:6+Math.random()*2,color:61695}))}}),!this.inMainMenu&&this.pursuit&&(!this.cinematicManager||this.cinematicManager.state==="none")){const S=this.physics.velocity.length(),N=!!(this.keys.w||this.keys.arrowup||this.keys.s||this.keys.arrowdown||this.keys.a||this.keys.arrowleft||this.keys.d||this.keys.arrowright);this.pursuit.update(e,this.physics.position,S,this.world,this.traffic,this.race.navGraph||null,this.race.active?this.race.aiRacers:[],N);let q=!1,j=1/0;if(this.pursuit.active&&this.pursuit.cops.length>0){const w=this.physics.position,y=new R(Math.sin(this.physics.heading),0,Math.cos(this.physics.heading));for(let F=0;F<this.pursuit.cops.length;F++){const X=this.pursuit.cops[F].position.clone().sub(w),$=X.length();$<90&&y.dot(X.normalize())<-.15&&(q=!0,$<j&&(j=$))}}if(q){this.copFlashEl.style.display="block";const w=Math.floor(Date.now()/300)%2===0,y=Math.max(0,Math.min(1,1-(j-10)/80)),F=5+y*17;this.copFlashEl.style.height=`${F}vh`,w?this.copFlashEl.classList.add("flash-blue"):this.copFlashEl.classList.remove("flash-blue");const k=w?.35+y*.65:.05+y*.25;this.copFlashEl.style.opacity=k}else this.copFlashEl.style.opacity=0,this.copFlashEl.style.display="none";if(this.pursuit.active){if(this.heatHudEl.style.display="flex",this.heatHudValueEl&&(this.heatHudValueEl.textContent=this.pursuit.heatLevel),this.heatHudLosEl&&(this.pursuit.canSeePlayer?(this.heatHudLosEl.textContent="SPOTTED",this.heatHudLosEl.className="heat-hud-los spotted"):(this.heatHudLosEl.textContent="HIDDEN",this.heatHudLosEl.className="heat-hud-los hidden")),this.heatFillEl){const w=(this.pursuit.heatProgress||0)*100;this.heatFillEl.style.width=`${w}%`}}else this.heatHudEl.style.display="none";if(this.pursuit.bustProgress>0?(this.bustedContainerEl.style.display="flex",this.bustedFillEl.style.width=`${this.pursuit.bustProgress*100}%`):this.bustedContainerEl.style.display="none",this.noiseOverlayEl){let w=.05;if(this.pursuit){if(this.pursuit.active){w+=(this.pursuit.heatLevel||1)*.012;let y=1/0;if(this.pursuit.cops.forEach(F=>{const k=this.physics.position.distanceTo(F.position);k<y&&(y=k)}),y<60){const F=1-y/60;w+=F*.08}}this.pursuit.bustProgress>0&&(w+=this.pursuit.bustProgress*.22)}w=Math.min(.4,w),this.noiseOverlayEl.style.opacity=w}this.pursuit.cops.forEach(w=>{if(w.meshGroup){const y=w.position.distanceTo(h.position);this.updateVehicleLOD(w,y,w.opacity);const F=w.meshGroup.getObjectByName("headlightPool");if(F&&(F.material.opacity=.35*w.opacity),w._lastLOD||(this.updateHeadlightFlares(w.meshGroup,w.heading),this.deformHeadlightPoolToTerrain(w.meshGroup)),y<=130){me.set(Math.sin(w.heading),0,Math.cos(w.heading)),oe.copy(w.position).addScaledVector(me,2.3),Ee.copy(this.camera.position).sub(oe).normalize();const K=me.dot(Ee),lt=Math.pow(Math.max(0,K),2.5);lt>.01&&d.push({x:oe.x,y:.4,z:oe.z,intensity:8*w.opacity*lt,color:16776404}),d.push({x:w.position.x,y:1.6,z:w.position.z,intensity:15*w.opacity,color:w.sirenState?16711714:8959})}const k=Math.cos(w.heading+Math.PI/2),X=Math.sin(w.heading+Math.PI/2),$=Math.abs(w.velocity.x*k+w.velocity.z*X);if(w.velocity&&($>3.2||w.velocity.lengthSq()>300&&Math.abs(w.angularVelocity)>1)){const K=new R(-.95,.1,-1.3).applyMatrix4(w.meshGroup.matrixWorld),lt=new R(.95,.1,-1.3).applyMatrix4(w.meshGroup.matrixWorld),Mt=w.velocity.clone().negate().normalize();Mt.y=.3,Mt.normalize();const St=this.world.isWetAt(K.x,K.z),it=this.world.isWetAt(lt.x,lt.z);St||this.spawnParticles(K,Mt,11184810,1),it||this.spawnParticles(lt,Mt,11184810,1),w.prevLeftWheel&&this.spawnSkidmarkSegment(w.prevLeftWheel,K),w.prevRightWheel&&this.spawnSkidmarkSegment(w.prevRightWheel,lt),w.prevLeftWheel=K.clone(),w.prevRightWheel=lt.clone()}else w.prevLeftWheel=null,w.prevRightWheel=null}}),this.pursuit.parkedCops.forEach(w=>{if(w.meshGroup){const y=w.position.distanceTo(h.position);this.updateVehicleLOD(w,y,w.opacity);const F=w.meshGroup.getObjectByName("headlightPool");if(F&&(F.material.opacity=.35*w.opacity),w._lastLOD||(this.updateHeadlightFlares(w.meshGroup,w.heading),this.deformHeadlightPoolToTerrain(w.meshGroup)),y<=130){me.set(Math.sin(w.heading),0,Math.cos(w.heading)),oe.copy(w.position).addScaledVector(me,2.3),Ee.copy(this.camera.position).sub(oe).normalize();const k=me.dot(Ee),X=Math.pow(Math.max(0,k),2.5);X>.01&&d.push({x:oe.x,y:.4,z:oe.z,intensity:8*w.opacity*X,color:16776404}),w.alerted&&d.push({x:w.position.x,y:1.6,z:w.position.z,intensity:15*w.opacity,color:w.sirenState?16711714:8959})}}}),this.pursuit.roadblocks&&this.pursuit.roadblocks.forEach(w=>{w.meshGroup&&w.meshGroup.traverse(y=>{if(y.isGroup&&y.getObjectByName("leftHeadlightSprite")){y.getWorldQuaternion(un),hl.setFromQuaternion(un,"YXZ");const F=hl.y;this.updateHeadlightFlares(y,F),y.getWorldPosition(Ee);const k=Ee.distanceTo(h.position);let X=1;if(k>120)X=0;else if(k>80){const $=(k-80)/40;X=1-$*$*(3-2*$)}if(X>0){me.set(Math.sin(F),0,Math.cos(F)),oe.copy(Ee).addScaledVector(me,2.3),ll.copy(this.camera.position).sub(oe).normalize();const $=me.dot(ll),ut=Math.pow(Math.max(0,$),2.5);ut>.01&&d.push({x:oe.x,y:.4,z:oe.z,intensity:8*X*ut,color:16776404});const K=Math.floor(Date.now()/250)%2===0;d.push({x:Ee.x,y:1.6,z:Ee.z,intensity:15*X,color:K?16711714:8959})}}})})}if(this.physics.isScraping){const S=this.physics.position.clone();S.addScaledVector(this.physics.scrapeNormal,-.9),d.push({x:S.x,y:.45+this.world.getBaseHeight(S.x,S.z),z:S.z,intensity:12,color:16755200})}if(this.physics.isDrifting){const S=new R(-.95,.22,-1.3).applyMatrix4(this.carVisualContainer.matrixWorld),N=new R(.95,.22,-1.3).applyMatrix4(this.carVisualContainer.matrixWorld);d.push({x:S.x,y:.25+this.world.getBaseHeight(S.x,S.z),z:S.z,intensity:6.5,color:16729088}),d.push({x:N.x,y:.25+this.world.getBaseHeight(N.x,N.z),z:N.z,intensity:6.5,color:16729088})}this.perf.pursuit=performance.now()-o;const M=performance.now();if(this.world.update(h.position.x,h.position.z,h.heading,d,a),this.perf.world=performance.now()-M,this.isInitialLoad){const N=this.world.loadedTiles.size,q=Math.min(100,Math.floor(N/140*100)),j=document.getElementById("loading-bar");if(j&&(j.style.width=`${q}%`),N>=140||q===100){this.isInitialLoad=!1;const w=document.getElementById("loading-screen");w&&(w.style.opacity="0",setTimeout(()=>{w.style.display="none"},1e3))}}window.gameTime===void 0&&(window.gameTime=0),window.gameTime+=a;const m=performance.now();this.physicsAccumulator+=a;let p=0;const A=this.cinematicManager&&this.cinematicManager.state!=="none";for(;this.physicsAccumulator>=i&&p<n;){if(this.prevPhysicsPosition.copy(this.physics.position),this.prevPhysicsHeading=this.physics.heading||0,this.inMainMenu||A)this.physics.speed=0,this.physics.velocity.set(0,0,0),this.physics.angularVelocity=0;else{const S=this.inFeedbackMenu?{}:this.keys;this.physics.update(i,S,this.world)}this.physicsAccumulator-=i,p++}p===n&&(this.physicsAccumulator=Math.min(this.physicsAccumulator,i));const x=Math.min(1,this.physicsAccumulator/i);this.renderPhysicsPosition.copy(this.prevPhysicsPosition).lerp(this.physics.position,x);let I=(this.physics.heading||0)-this.prevPhysicsHeading;if(I>Math.PI&&(I-=Math.PI*2),I<-Math.PI&&(I+=Math.PI*2),this.renderPhysicsHeading=this.prevPhysicsHeading+I*x,this.physics.justCrashed){const S=this.physics.lastWallImpactSpeed,N=this.physics.lastWallImpactNormal,q=this.physics.position.clone().addScaledVector(N,-1.8);q.y=.4+this.world.getBaseHeight(q.x,q.z);const j=N.clone().multiplyScalar(S);this.handleCrashDamage(this.carVisualContainer,q,S,j),this.spawnDebris(q,N,1719692,Math.min(10,Math.floor(S*.45))),S>10&&(this.slowMoTimer=.28,this.crashShake=Math.min(.85,S*.045)),this.physics.justCrashed=!1}this.physics.gear!==this.physics.prevGear&&(this.physics.justUpshifted&&(this.gearShiftPunch=1),this.physics.prevGear=this.physics.gear),this.perf.physics=performance.now()-m;const T=performance.now(),_=performance.now();if(this.traffic){const S=this.physics.velocity.length(),N=this.race.active?16:30;let q=1;S>25&&(q=Math.max(.7,1-(S-25)/100)),this.traffic.maxVehicles=Math.round(N*q)}this.traffic.update(a,h.position,h.heading,this.race.active?this.race.aiRacers:[],this.camera,this.world,this.pursuit?this.pursuit.roadblocks:[],this.pursuit?this.pursuit.heatLevel:0,this.pursuit?this.pursuit.cops.concat(this.pursuit.parkedCops||[]):[]),this.perf.trafficUpdate=performance.now()-_;const P=performance.now();this.traffic.vehicles.forEach(S=>{if(!S.meshGroup){const{carGroup:k,wheels:X}=this.createVoxelCarMesh(S.colorHex,S.type);if(S.type==="cab"){const $=new tt(new H(.5,.2,.8),new fe({color:16755200}));$.position.set(0,1.1,-.3),k.add($)}this.scene.add(k),S.meshGroup=k,S.wheels=X}S.meshGroup.position.copy(S.position);const N=S.position.distanceTo(h.position);S._frameCounter||(S._frameCounter=0),S._frameCounter++;const j=!(N>90)||S._frameCounter%3===0;if(j){this.world.alignMeshToTerrain(S.meshGroup,S.position,S.heading,S.isAirborne,a),(S.roll||S.pitch)&&(un.setFromAxisAngle(me.set(0,0,1),S.roll||0),cl.setFromAxisAngle(oe.set(1,0,0),S.pitch||0),S.meshGroup.quaternion.multiply(un).multiply(cl));const k=S.opacity!==void 0?S.opacity:1;this.updateVehicleLOD(S,N,k),S._lastLOD||(this.updateHeadlightFlares(S.meshGroup,S.heading),this.deformHeadlightPoolToTerrain(S.meshGroup))}const w=S.meshGroup.getObjectByName("headlightPool");if(w&&(w.material.opacity=.35*(S.opacity!==void 0?S.opacity:1)),j){const k=S.speed/.42*a;S.wheels.forEach(X=>{X.children[0].rotation.x+=k,X.children[1].rotation.x+=k})}const y=S.speed;if(S.splashTimer||(S.splashTimer=0),S.splashTimer-=a,y>3&&(S.opacity===void 0||S.opacity>.8)&&S.splashTimer<=0){const k=new R(-.95,.1,-1.3).applyMatrix4(S.meshGroup.matrixWorld),X=new R(.95,.1,-1.3).applyMatrix4(S.meshGroup.matrixWorld),$=this.world.isWetAt(k.x,k.z),ut=this.world.isWetAt(X.x,X.z);if($||ut){S.splashTimer=.1;const K=new R(-Math.sin(S.heading),.55,-Math.cos(S.heading)).normalize(),lt=Math.min(4,Math.floor(y*.2));$&&lt>0&&this.spawnParticles(k,K,13426158,lt,!0),ut&&lt>0&&this.spawnParticles(X,K,13426158,lt,!0)}}if(S.impactVelocity&&S.impactVelocity.lengthSq()>9){const k=new R(-.95,.1,-1.3).applyMatrix4(S.meshGroup.matrixWorld),X=new R(.95,.1,-1.3).applyMatrix4(S.meshGroup.matrixWorld),$=S.impactVelocity.clone().negate().normalize();$.y=.3,$.normalize();const ut=this.world.isWetAt(k.x,k.z),K=this.world.isWetAt(X.x,X.z);ut||this.spawnParticles(k,$,11184810,1),K||this.spawnParticles(X,$,11184810,1),S.prevLeftWheel&&this.spawnSkidmarkSegment(S.prevLeftWheel,k),S.prevRightWheel&&this.spawnSkidmarkSegment(S.prevRightWheel,X),S.prevLeftWheel=k.clone(),S.prevRightWheel=X.clone()}else S.prevLeftWheel=null,S.prevRightWheel=null}),this.traffic&&this.traffic.parkedVehicles&&this.traffic.parkedVehicles.forEach(S=>{if(!S.meshGroup){const{carGroup:y,wheels:F}=this.createVoxelCarMesh(S.colorHex,S.type);if(S.type==="cab"){const $=new tt(new H(.5,.2,.8),new fe({color:16755200}));$.position.set(0,1.1,-.3),y.add($)}const k=y.getObjectByName("leftHeadlightSprite"),X=y.getObjectByName("rightHeadlightSprite");k&&(k.visible=!1),X&&(X.visible=!1),this.scene.add(y),S.meshGroup=y,S.wheels=F}const N=S.position.distanceTo(h.position),q=S.opacity!==void 0?S.opacity:1;if(this.updateVehicleLOD(S,N,q),S.meshGroup.position.copy(S.position),this.world.alignMeshToTerrain(S.meshGroup,S.position,S.heading,S.isAirborne,a),S.roll||S.pitch){const y=new Ie().setFromAxisAngle(new R(0,0,1),S.roll||0),F=new Ie().setFromAxisAngle(new R(1,0,0),S.pitch||0);S.meshGroup.quaternion.multiply(y).multiply(F)}const j=S.meshGroup.getObjectByName("headlightPool");if(j&&(j.material.opacity=0),S.impactVelocity.lengthSq()>.1){const y=S.impactVelocity.length(),F=y/.42*a;S._lastLOD||S.wheels.forEach($=>{$.children[0].rotation.x+=F,$.children[1].rotation.x+=F});const k=new R(-.95,.1,-1.3).applyMatrix4(S.meshGroup.matrixWorld),X=new R(.95,.1,-1.3).applyMatrix4(S.meshGroup.matrixWorld);if(y>3&&(S.opacity===void 0||S.opacity>.8)&&(!S.splashTimer||S.splashTimer<=0)){S.splashTimer=.1;const $=this.world.isWetAt(k.x,k.z),ut=this.world.isWetAt(X.x,X.z);if($||ut){const K=new R(-Math.sin(S.heading),.55,-Math.cos(S.heading)).normalize(),lt=Math.min(4,Math.floor(y*.2));$&&lt>0&&this.spawnParticles(k,K,13426158,lt,!0),ut&&lt>0&&this.spawnParticles(X,K,13426158,lt,!0)}else{const K=S.impactVelocity.clone().negate().normalize();K.y=.3,K.normalize(),this.spawnParticles(k,K,11184810,1),this.spawnParticles(X,K,11184810,1)}}y>3?(S.prevLeftWheel&&this.spawnSkidmarkSegment(S.prevLeftWheel,k),S.prevRightWheel&&this.spawnSkidmarkSegment(S.prevRightWheel,X),S.prevLeftWheel=k.clone(),S.prevRightWheel=X.clone()):(S.prevLeftWheel=null,S.prevRightWheel=null)}else S.prevLeftWheel=null,S.prevRightWheel=null;S.splashTimer>0&&(S.splashTimer-=a)}),this.perf.trafficMesh=performance.now()-P;const v=performance.now(),E=this.traffic.vehicles.concat(this.traffic.parkedVehicles||[]);E.forEach(S=>{const N=this.physics.position.distanceTo(S.position);if(N<4){this.physics.speed>16&&this.pursuit&&this.pursuit.triggerPursuit(1);const q=this.physics.position.clone().sub(S.position).normalize();q.y=0;const j=4-N;this.physics.position.addScaledVector(q,j*.52),S.position.addScaledVector(q,-j*.48);const w=new R(Math.sin(S.heading),0,Math.cos(S.heading)),y=w.clone().multiplyScalar(S.speed).add(S.impactVelocity),X=this.physics.velocity.clone().sub(y).dot(q);if(X<0){const St=-1.48*X/.0014074074074074073,it=q.clone().multiplyScalar(St);this.physics.velocity.addScaledVector(it,1/1350),S.impactVelocity.addScaledVector(it,-1/1500);const Ct=this.physics.position.clone().add(S.position).multiplyScalar(.5).clone().sub(S.position);Ct.y=0;const Tt=q.clone().negate(),Et=Ct.x*Tt.z-Ct.z*Tt.x,Pt=.2+Math.min(2.5,Math.abs(Et)),Y=Et>=0?1:-1;S.impactSpin=Y*Math.min(4.2,St/300*Pt),St>8e3&&(S.crashedAirborne=!0,S.isAirborne=!0,S.velocityY=Math.min(2,St*1e-4+.5),S.rollVelocity=(Math.random()-.5)*Math.min(2,St*1e-4),S.pitchVelocity=(Math.random()-.5)*Math.min(2,St*1e-4)),S.speed=Math.max(0,S.speed-St*6e-4)}const $=this.physics.position.clone().add(S.position).multiplyScalar(.5);$.y=.55+this.world.getBaseHeight($.x,$.z),this.spawnParticles($,q,16755200,16,!1,!0);const ut=this.physics.velocity.clone().sub(w.clone().multiplyScalar(S.speed).add(S.impactVelocity)),K=ut.length();K>5&&(this.handleCrashDamage(this.carVisualContainer,$,K,ut),S.meshGroup&&this.handleCrashDamage(S.meshGroup,$,K,ut.clone().negate()),this.spawnDebris($,q,1719692,Math.min(8,Math.floor(K*.4))),this.spawnDebris($,q.clone().negate(),S.colorHex,Math.min(8,Math.floor(K*.4)))),K>10&&(this.slowMoTimer=.28,this.crashShake=Math.min(.8,K*.035))}this.race.active&&this.race.aiRacers.forEach(q=>{const j=q.position.distanceTo(S.position);if(j<4){const w=q.position.clone().sub(S.position).normalize();w.y=0;const y=4-j;q.position.addScaledVector(w,y*.5),S.position.addScaledVector(w,-y*.5);const F=new R(Math.sin(S.heading),0,Math.cos(S.heading)),k=F.clone().multiplyScalar(S.speed).add(S.impactVelocity),ut=q.velocity.clone().sub(k).dot(w);if(ut<0){const Lt=-1.45*ut/.0014074074074074073,Ct=w.clone().multiplyScalar(Lt);q.velocity.addScaledVector(Ct,1/1350),S.impactVelocity.addScaledVector(Ct,-1/1500);const Et=q.position.clone().add(S.position).multiplyScalar(.5).clone().sub(S.position);Et.y=0;const Pt=w.clone().negate(),Y=Et.x*Pt.z-Et.z*Pt.x,xt=.2+Math.min(2.5,Math.abs(Y)),Nt=Y>=0?1:-1;S.impactSpin=Nt*Math.min(4.2,Lt/300*xt),S.speed=Math.max(0,S.speed-Lt*5e-4),Lt>8e3&&(S.crashedAirborne=!0,S.isAirborne=!0,S.velocityY=Math.min(2,Lt*1e-4+.5),S.rollVelocity=(Math.random()-.5)*Math.min(2,Lt*1e-4),S.pitchVelocity=(Math.random()-.5)*Math.min(2,Lt*1e-4))}q.recoveryBoostTimer=3;const K=q.position.clone().add(S.position).multiplyScalar(.5);K.y=.55+this.world.getBaseHeight(K.x,K.z),this.spawnParticles(K,w,16755200,8,!1,!0);const lt=q.velocity.clone().sub(F.clone().multiplyScalar(S.speed).add(S.impactVelocity)),Mt=lt.length();Mt>5&&(q.meshGroup&&this.handleCrashDamage(q.meshGroup,K,Mt,lt),S.meshGroup&&this.handleCrashDamage(S.meshGroup,K,Mt,lt.clone().negate()),this.spawnDebris(K,w,q.colorHex,Math.min(6,Math.floor(Mt*.3))),this.spawnDebris(K,w.clone().negate(),S.colorHex,Math.min(6,Math.floor(Mt*.3))))}})});for(let S=0;S<E.length;S++){const N=E[S];if(!(N.opacity<.5))for(let q=S+1;q<E.length;q++){const j=E[q];if(j.opacity<.5)continue;const w=N.position.distanceTo(j.position);if(w<4){const y=N.position.clone().sub(j.position).normalize();y.y=0;const F=4-w;N.position.addScaledVector(y,F*.5),j.position.addScaledVector(y,-F*.5);const k=new R(Math.sin(N.heading),0,Math.cos(N.heading)),X=new R(Math.sin(j.heading),0,Math.cos(j.heading)),$=k.multiplyScalar(N.speed).add(N.impactVelocity),ut=X.multiplyScalar(j.speed).add(j.impactVelocity),K=$.clone().sub(ut),lt=K.dot(y);if(K.lengthSq()>3&&(N.isRecovering=!0,j.isRecovering=!0),lt<0){const Tt=-1.45*lt/.0013333333333333333,Et=y.clone().multiplyScalar(Tt);N.impactVelocity.addScaledVector(Et,1/1500),j.impactVelocity.addScaledVector(Et,-1/1500);const Pt=N.position.clone().add(j.position).multiplyScalar(.5),Y=Pt.clone().sub(N.position);Y.y=0;const xt=y.clone().negate(),Nt=Y.x*xt.z-Y.z*xt.x,Ut=.2+Math.min(2.5,Math.abs(Nt)),yt=Nt>=0?1:-1;N.impactSpin=yt*Math.min(4.2,Tt/300*Ut);const G=Pt.clone().sub(j.position);G.y=0;const At=y.clone(),bt=G.x*At.z-G.z*At.x,It=.2+Math.min(2.5,Math.abs(bt)),Bt=bt>=0?1:-1;j.impactSpin=Bt*Math.min(4.2,Tt/300*It),Tt>8e3&&(Math.random()>.5?(N.crashedAirborne=!0,N.isAirborne=!0,N.velocityY=Math.min(2,Tt*1e-4+.5),N.rollVelocity=(Math.random()-.5)*Math.min(2,Tt*1e-4),N.pitchVelocity=(Math.random()-.5)*Math.min(2,Tt*1e-4)):(j.crashedAirborne=!0,j.isAirborne=!0,j.velocityY=Math.min(2,Tt*1e-4+.5),j.rollVelocity=(Math.random()-.5)*Math.min(2,Tt*1e-4),j.pitchVelocity=(Math.random()-.5)*Math.min(2,Tt*1e-4))),N.speed=Math.max(0,N.speed-Tt*5e-4),j.speed=Math.max(0,j.speed-Tt*5e-4)}const Mt=N.position.clone().add(j.position).multiplyScalar(.5);Mt.y=.55+this.world.getBaseHeight(Mt.x,Mt.z),this.spawnParticles(Mt,y,16755200,8,!1,!0);const St=$.clone().sub(ut),it=St.length();it>5&&(N.meshGroup&&this.handleCrashDamage(N.meshGroup,Mt,it,St),j.meshGroup&&this.handleCrashDamage(j.meshGroup,Mt,it,St.clone().negate()),this.spawnDebris(Mt,y,N.colorHex,Math.min(4,Math.floor(it*.2))),this.spawnDebris(Mt,y.clone().negate(),j.colorHex,Math.min(4,Math.floor(it*.2))))}}}if(this.pursuit&&this.pursuit.active&&this.pursuit.cops.forEach(S=>{if(!S.active)return;const N=this.physics.position.distanceTo(S.position);if(N<4){const q=this.physics.position.clone().sub(S.position).normalize();q.y=0;const j=4-N;this.physics.position.addScaledVector(q,j*.52),S.position.addScaledVector(q,-j*.48);const w=new R(Math.sin(S.heading),0,Math.cos(S.heading)),y=w.clone().multiplyScalar(S.speed),k=this.physics.velocity.clone().sub(y),X=k.dot(q);if(X<0){const St=-1.5*X/.0013657407407407407,it=q.clone().multiplyScalar(St);this.physics.velocity.addScaledVector(it,1/1350),S.speed=Math.max(-10,S.speed-St*6e-4);const Lt=new R(Math.cos(this.physics.heading),0,-Math.sin(this.physics.heading)),Ct=k.dot(Lt);Math.abs(Ct)>9.5?(this.physics.externalSpin=Math.sign(Ct)*(1.8+Math.random()*1.5),this.physics.isDrifting=!0,this.physics.driftTraction=.55):k.length()>22&&(this.physics.externalSpin=(Math.random()>.5?1:-1)*(1.1+Math.random()*.9),this.physics.isDrifting=!0,this.physics.driftTraction=.65),this.pursuit.triggerPursuit(2)}const $=this.physics.position.clone().add(S.position).multiplyScalar(.5);$.y=.55+this.world.getBaseHeight($.x,$.z),this.spawnParticles($,q,16755200,16,!1,!0);const ut=this.physics.velocity.clone().sub(w.clone().multiplyScalar(S.speed)),K=ut.length();K>5&&(this.handleCrashDamage(this.carVisualContainer,$,K,ut),S.meshGroup&&this.handleCrashDamage(S.meshGroup,$,K,ut.clone().negate()),this.spawnDebris($,q,1719692,Math.min(8,Math.floor(K*.4))),this.spawnDebris($,q.clone().negate(),1118481,Math.min(8,Math.floor(K*.4)))),K>10&&(this.slowMoTimer=.28,this.crashShake=Math.min(.8,K*.035))}this.race.active&&this.race.aiRacers.forEach(q=>{const j=q.position.distanceTo(S.position);if(j<4){const w=q.position.clone().sub(S.position).normalize();w.y=0;const y=4-j;q.position.addScaledVector(w,y*.5),S.position.addScaledVector(w,-y*.5);const F=new R(Math.sin(S.heading),0,Math.cos(S.heading)),k=F.clone().multiplyScalar(S.speed),ut=q.velocity.clone().sub(k).dot(w);if(ut<0){const Lt=-1.5*ut/.0013657407407407407,Ct=w.clone().multiplyScalar(Lt);q.velocity.addScaledVector(Ct,1/1350),S.speed=Math.max(-10,S.speed-Lt*6e-4)}const K=q.position.clone().add(S.position).multiplyScalar(.5);K.y=.55+this.world.getBaseHeight(K.x,K.z),this.spawnParticles(K,w,16755200,12,!1,!0);const lt=q.velocity.clone().sub(F.clone().multiplyScalar(S.speed)),Mt=lt.length();Mt>5&&(q.meshGroup&&this.handleCrashDamage(q.meshGroup,K,Mt,lt),S.meshGroup&&this.handleCrashDamage(S.meshGroup,K,Mt,lt.clone().negate()),this.spawnDebris(K,w,q.colorHex,Math.min(6,Math.floor(Mt*.3))),this.spawnDebris(K,w.clone().negate(),1118481,Math.min(6,Math.floor(Mt*.3))))}}),this.traffic&&this.traffic.vehicles.concat(this.traffic.parkedVehicles||[]).forEach(j=>{const w=j.position.distanceTo(S.position);if(w<4){const y=j.position.clone().sub(S.position).normalize();y.y=0;const F=4-w;j.position.addScaledVector(y,F*.5),S.position.addScaledVector(y,-F*.5);const X=new R(Math.sin(S.heading),0,Math.cos(S.heading)).clone().multiplyScalar(S.speed),ut=new R(Math.sin(j.heading),0,Math.cos(j.heading)).clone().multiplyScalar(j.speed).add(j.impactVelocity),lt=ut.clone().sub(X).dot(y);if(lt<0){const it=-1.5*lt/.0012916666666666667,Lt=y.clone().multiplyScalar(it);j.impactVelocity.addScaledVector(Lt,1/1500),j.isRecovering=!0,S.speed=Math.max(-10,S.speed-it*6e-4);const Ct=j.position.clone().add(S.position).multiplyScalar(.5);Ct.y=.55+this.world.getBaseHeight(Ct.x,Ct.z),this.spawnParticles(Ct,y,16755200,10,!1,!0);const Tt=ut.clone().sub(X),Et=Tt.length();Et>5&&(j.meshGroup&&this.handleCrashDamage(j.meshGroup,Ct,Et,Tt),S.meshGroup&&this.handleCrashDamage(S.meshGroup,Ct,Et,Tt.clone().negate()),this.spawnDebris(Ct,y,j.colorHex,Math.min(6,Math.floor(Et*.3))),this.spawnDebris(Ct,y.clone().negate(),1118481,Math.min(6,Math.floor(Et*.3))))}}})}),this.pursuit&&this.pursuit.active){const S=this.pursuit.cops;for(let N=0;N<S.length;N++){const q=S[N];if(q.active)for(let j=N+1;j<S.length;j++){const w=S[j];if(!w.active)continue;const y=q.position.distanceTo(w.position);if(y<4){const F=q.position.clone().sub(w.position).normalize();F.y=0;const k=4-y;q.position.addScaledVector(F,k*.5),w.position.addScaledVector(F,-k*.5);const X=new R(Math.sin(q.heading),0,Math.cos(q.heading)),$=new R(Math.sin(w.heading),0,Math.cos(w.heading)),ut=X.clone().multiplyScalar(q.speed),K=$.clone().multiplyScalar(w.speed),Mt=ut.clone().sub(K).dot(F);if(Mt<0){const Ct=-1.5*Mt/.00125,Tt=F.clone().multiplyScalar(Ct),Et=Tt.clone().multiplyScalar(1/1600),Pt=Tt.clone().multiplyScalar(-1/1600);q.speed+=Et.dot(X),w.speed+=Pt.dot($)}const St=q.position.clone().add(w.position).multiplyScalar(.5);St.y=.55+this.world.getBaseHeight(St.x,St.z),this.spawnParticles(St,F,16755200,8,!1,!0);const it=ut.clone().sub(K),Lt=it.length();Lt>5&&(q.meshGroup&&this.handleCrashDamage(q.meshGroup,St,Lt,it),w.meshGroup&&this.handleCrashDamage(w.meshGroup,St,Lt,it.clone().negate()),this.spawnDebris(St,F,1118481,Math.min(4,Math.floor(Lt*.2))),this.spawnDebris(St,F.clone().negate(),1118481,Math.min(4,Math.floor(Lt*.2))))}}}}this.perf.collisions=performance.now()-v;const L=this.cinematicManager&&this.cinematicManager.state!=="none",z=performance.now();if(L?(this.carVisualContainer.position.copy(this.physics.position),un.setFromAxisAngle(new R(0,1,0),this.physics.heading),this.carVisualContainer.quaternion.copy(un),this.carVisualContainer.updateMatrixWorld(!0)):(this.carVisualContainer.position.copy(this.renderPhysicsPosition),this.world.alignMeshToTerrain(this.carVisualContainer,this.renderPhysicsPosition,this.renderPhysicsHeading,this.physics.isAirborne&&this.physics.airTime>.2||this.physics.rolloverTimer>0,a),this.carVisualContainer.updateMatrixWorld(!0)),this.updateHeadlightFlares(this.carVisualContainer,this.physics.heading),this.carGroup.rotation.z=this.physics.bodyRoll,this.carGroup.rotation.x=this.physics.bodyPitch,this.physics.isScraping){const S=this.physics.position.clone();S.addScaledVector(this.physics.scrapeNormal,-1),S.y=.25+this.world.getBaseHeight(S.x,S.z);const N=this.physics.velocity.clone().negate().normalize();N.addScaledVector(new R(Math.random()-.5,.4,Math.random()-.5),.45).normalize(),this.spawnParticles(S,N,16755200,3,!1,!0)}const Z=Math.sin(this.physics.heading),C=Math.cos(this.physics.heading),D=this.physics.velocity.x*Z+this.physics.velocity.z*C,B=D/.42*a;this.wheels.forEach((S,N)=>{S.rotation.y=N<2?this.physics.steeringAngle:0,S.children[0].rotation.y=0,S.children[1].rotation.y=0,S.children[0].rotation.x+=B,S.children[1].rotation.x+=B});const O=new R(-.95,.1,-1.3).applyMatrix4(this.carVisualContainer.matrixWorld),W=new R(.95,.1,-1.3).applyMatrix4(this.carVisualContainer.matrixWorld),et=this.physics.velocity.length(),nt=this.world.isWetAt(O.x,O.z),rt=this.world.isWetAt(W.x,W.z);if(this.splashTimer||(this.splashTimer=0),this.splashTimer-=a,et>3&&(nt||rt)&&this.splashTimer<=0){this.splashTimer=.08;const S=this.physics.velocity.clone().negate().normalize();S.y=.55,S.normalize();const N=Math.min(8,Math.floor(et*.35));nt&&N>0&&this.spawnParticles(O,S,13426158,N,!0),rt&&N>0&&this.spawnParticles(W,S,13426158,N,!0)}if(this.physics.isDrifting){const S=this.physics.velocity.clone().negate().normalize();nt||this.spawnParticles(O,S,11184810,2),rt||this.spawnParticles(W,S,11184810,2),this.driftStatusEl&&(this.driftStatusEl.innerText="DRIFTING",this.driftStatusEl.classList.add("active"))}else if(this.driftStatusEl&&this.driftStatusEl.classList.remove("active"),Math.random()<.15){const S=new R(.6,.2,-2.1).applyMatrix4(this.carVisualContainer.matrixWorld),N=new R(-Math.sin(this.physics.heading),.2,-Math.cos(this.physics.heading));this.spawnParticles(S,N,7829367,1)}if(this.physics.isBoosting){const S=1.3+Math.random()*.45;this.nitroLeftSprite.scale.set(S,S,S),this.nitroRightSprite.scale.set(S,S,S),this.nitroLight.intensity=6+Math.random()*2}else this.nitroLeftSprite.scale.set(.001,.001,.001),this.nitroRightSprite.scale.set(.001,.001,.001),this.nitroLight.intensity=0;this.physics.isDrifting||f&&et>4?(this.prevLeftWheel&&this.spawnSkidmarkSegment(this.prevLeftWheel,O),this.prevRightWheel&&this.spawnSkidmarkSegment(this.prevRightWheel,W),this.prevLeftWheel=O.clone(),this.prevRightWheel=W.clone()):(this.prevLeftWheel=null,this.prevRightWheel=null),this.perf.playerVisuals=performance.now()-z,this.perf.traffic=performance.now()-T;const J=performance.now();if(this.race.active&&!L){this.race.playerVelocity=this.physics.velocity;const S=this.race.update(this.physics.position,a,this.world,this.traffic,this.pursuit);this.race.aiRacers.forEach(y=>{const F=this.physics.position.distanceTo(y.position);if(F<4){const k=this.physics.position.clone().sub(y.position).normalize();k.y=0;const X=4-F;this.physics.position.addScaledVector(k,X*.5),y.position.addScaledVector(k,-X*.5);const $=this.physics.velocity,ut=y.velocity,lt=$.clone().sub(ut).dot(k);if(lt<0){const Tt=-1.55*lt/.001851851851851852,Et=k.clone().multiplyScalar(Tt);this.physics.velocity.addScaledVector(Et,1/1350),y.velocity.addScaledVector(Et,-1/900),y.recoveryBoostTimer=2}const Mt=this.physics.position.clone().add(y.position).multiplyScalar(.5);Mt.y=.55+this.world.getBaseHeight(Mt.x,Mt.z),this.spawnParticles(Mt,k,16755200,10,!1,!0);const St=this.physics.velocity.clone().sub(y.velocity),it=St.length();it>5&&(this.handleCrashDamage(this.carVisualContainer,Mt,it,St),y.meshGroup&&this.handleCrashDamage(y.meshGroup,Mt,it,St.clone().negate()),this.spawnDebris(Mt,k,1719692,Math.min(8,Math.floor(it*.4))),this.spawnDebris(Mt,k.clone().negate(),y.colorHex,Math.min(8,Math.floor(it*.4)))),it>10&&(this.slowMoTimer=.28,this.crashShake=Math.min(.8,it*.035))}});for(let y=0;y<this.race.aiRacers.length;y++)for(let F=y+1;F<this.race.aiRacers.length;F++){const k=this.race.aiRacers[y],X=this.race.aiRacers[F],$=k.position.distanceTo(X.position);if($<4){const ut=k.position.clone().sub(X.position).normalize();ut.y=0;const K=4-$;k.position.addScaledVector(ut,K*.5),X.position.addScaledVector(ut,-K*.5);const lt=k.velocity,Mt=X.velocity,it=lt.clone().sub(Mt).dot(ut);if(it<0){const Y=-1.5*it/.0014814814814814814,xt=ut.clone().multiplyScalar(Y);k.velocity.addScaledVector(xt,1/1350),X.velocity.addScaledVector(xt,-1/1350)}const Lt=k.position.clone().add(X.position).multiplyScalar(.5);Lt.y=.55+this.world.getBaseHeight(Lt.x,Lt.z),this.spawnParticles(Lt,ut,16755200,6,!1,!0);const Ct=k.velocity.clone().sub(X.velocity),Tt=Ct.length();Tt>5&&(k.meshGroup&&this.handleCrashDamage(k.meshGroup,Lt,Tt,Ct),X.meshGroup&&this.handleCrashDamage(X.meshGroup,Lt,Tt,Ct.clone().negate()),this.spawnDebris(Lt,ut,k.colorHex,Math.min(6,Math.floor(Tt*.3))),this.spawnDebris(Lt,ut.clone().negate(),X.colorHex,Math.min(6,Math.floor(Tt*.3))))}}this.race.aiRacers.forEach(y=>{if(y.meshGroup){y.meshGroup.position.copy(y.position);const F=y.velocity.length();y.indicatorMesh&&!L&&(y.indicatorMesh.rotation.y+=2*a,y.indicatorMesh.position.y=1.9+Math.sin(Date.now()*.005)*.12),y._frameCounter||(y._frameCounter=0),y._frameCounter++;const k=y.position.distanceTo(h.position),$=!(k>90)||y._frameCounter%3===0;if($){if(L){y.meshGroup.position.copy(y.spawnPos);const it=new Ie;it.setFromAxisAngle(new R(0,1,0),y.heading),y.meshGroup.quaternion.copy(it)}else this.world.alignMeshToTerrain(y.meshGroup,y.position,y.heading,!1,a);y.meshGroup.updateMatrixWorld(!0),this.updateVehicleLOD(y,k,1),y._lastLOD||(this.updateHeadlightFlares(y.meshGroup,y.heading),this.deformHeadlightPoolToTerrain(y.meshGroup))}const ut=y.meshGroup.getObjectByName("headlightPool");if(ut&&(ut.material.opacity=.35),$&&!y._lastLOD){const it=Math.sin(y.heading),Lt=Math.cos(y.heading),Tt=(y.velocity.x*it+y.velocity.z*Lt)/.42*a;y.wheels.forEach((Et,Pt)=>{Pt<2&&(Et.children[0].rotation.y=y.steeringAngle,Et.children[1].rotation.y=y.steeringAngle),Et.children[0].rotation.x+=Tt,Et.children[1].rotation.x+=Tt})}const K=new R(-.95,.1,-1.3).applyMatrix4(y.meshGroup.matrixWorld),lt=new R(.95,.1,-1.3).applyMatrix4(y.meshGroup.matrixWorld),Mt=this.world.isWetAt(K.x,K.z),St=this.world.isWetAt(lt.x,lt.z);if(y.splashTimer||(y.splashTimer=0),y.splashTimer-=a,F>3&&(Mt||St)&&y.splashTimer<=0){y.splashTimer=.12;const it=y.velocity.clone().negate().normalize();it.y=.55,it.normalize();const Lt=Math.min(6,Math.floor(F*.25));Mt&&Lt>0&&this.spawnParticles(K,it,13426158,Lt,!0),St&&Lt>0&&this.spawnParticles(lt,it,13426158,Lt,!0)}if(y.isDrifting){const it=y.velocity.clone().negate().normalize();Mt||this.spawnParticles(K,it,11184810,1),St||this.spawnParticles(lt,it,11184810,1)}if(y.isDrifting?(y.prevLeftWheel&&this.spawnSkidmarkSegment(y.prevLeftWheel,K),y.prevRightWheel&&this.spawnSkidmarkSegment(y.prevRightWheel,lt),y.prevLeftWheel=K.clone(),y.prevRightWheel=lt.clone()):(y.prevLeftWheel=null,y.prevRightWheel=null),y.isBoosting){const it=1.3+Math.random()*.45;y.nitroLeftSprite&&y.nitroLeftSprite.scale.set(it,it,it),y.nitroRightSprite&&y.nitroRightSprite.scale.set(it,it,it)}else y.nitroLeftSprite&&y.nitroLeftSprite.scale.set(.001,.001,.001),y.nitroRightSprite&&y.nitroRightSprite.scale.set(.001,.001,.001)}});const N=this.race.calculateRankings(this.physics.position),q=N.findIndex(y=>y.isPlayer)+1,j=document.getElementById("stats-pos");if(j&&(j.textContent=`${q}/${N.length}`),S){if(S.event==="checkpoint")this.showBanner("CHECKPOINT",`Index: ${S.nextIndex+1}/${this.race.checkpoints.length}`,800),this.rebuildCheckpointBeacons();else if(S.event==="lap")this.showBanner("LAP COMPLETED",`LAP ${S.lap} Started!`,1500),this.rebuildCheckpointBeacons();else if(S.event==="finish"){const F=this.race.calculateRankings(this.physics.position).findIndex(K=>K.isPlayer)+1;let k="TH";F===1?k="ST":F===2?k="ND":F===3&&(k="RD");const X=document.getElementById("race-results"),$=document.getElementById("results-pos"),ut=document.getElementById("results-time");if(X){$.textContent=`${F}${k}`,ut.textContent=this.formatTime(S.time);const K=document.getElementById("btn-like-race"),lt=document.getElementById("btn-dislike-race"),Mt=document.getElementById("quick-feedback-thanks");K&&(K.style.display="block"),lt&&(lt.style.display="block"),Mt&&(Mt.style.display="none"),X.classList.add("show"),setTimeout(()=>{X&&X.classList.remove("show")},6e3)}this.hudStatsEl.style.display="none",this.cancelBtnEl.style.display="none",this.navArrow.visible=!1,this.clearCheckpointBeacons(),setTimeout(()=>{this.clearAIMeshes()},8e3),this.traffic&&(this.traffic.clear(),this.traffic.maxVehicles=40,this.traffic.init(this.physics.position,this.world)),this.race.selectNewWorldEvent(this.world,this.physics.position)}}this.statsTimerEl.textContent=this.formatTime(this.race.timeElapsed),this.race.mode==="circuit"?(this.statsProgressLabelEl.textContent="LAP",this.statsProgressEl.textContent=`${this.race.lapCurrent}/${this.race.lapsTotal}`):this.race.mode==="unordered"?(this.statsProgressLabelEl.textContent="CLEARED",this.statsProgressEl.textContent=`${this.race.unorderedCleared.size}/${this.race.checkpoints.length}`):(this.statsProgressLabelEl.textContent="CHECKPOINT",this.statsProgressEl.textContent=`${this.race.currentIndex+1}/${this.race.checkpoints.length}`);const w=this.race.getActiveCheckpoint();if(w){this.navArrow.visible=!0;const y=w.x-this.physics.position.x,F=w.z-this.physics.position.z,k=Math.atan2(y,F);this.navArrow.rotation.y=k-this.physics.heading}else if(this.race.mode==="unordered"){let y=null,F=1/0;if(this.race.checkpoints.forEach((k,X)=>{if(!this.race.unorderedCleared.has(X)){const $=k.x-this.physics.position.x,ut=k.z-this.physics.position.z,K=$*$+ut*ut;K<F&&(F=K,y=k)}}),y){this.navArrow.visible=!0;const k=y.x-this.physics.position.x,X=y.z-this.physics.position.z,$=Math.atan2(k,X);this.navArrow.rotation.y=$-this.physics.heading}else this.navArrow.visible=!1}else this.navArrow.visible=!1;this.cinematicManager&&this.cinematicManager.state!=="none"&&(this.navArrow.visible=!1),this.race.checkpoints.forEach((y,F)=>{const X=F===this.race.checkpoints.length-1?15222085:16755258,$=this.race.mode==="unordered",ut=$?this.race.unorderedCleared.has(F):F<this.race.currentIndex,K=$?!ut:F===this.race.currentIndex,lt=!$&&F===Math.min(this.race.currentIndex+1,this.race.checkpoints.length-1);$?!ut&&Math.random()<.35&&this.spawnCheckpointSmoke(y,X,.85,.9):K?Math.random()<.55&&this.spawnCheckpointSmoke(y,X,1,1):lt&&Math.random()<.2&&this.spawnCheckpointSmoke(y,X,.45,.65)})}this.perf.race=performance.now()-J;const ot=performance.now();this.updateParticles(a),this.updateCheckpointSmoke(a),this.updateDebris(a),this.checkBreakablesCollision(a),this.checkSlipstream(a),this.checkNearMisses(a),this.updateDriftNitro(a);let gt=!1;if(this.debugFocusAI&&this.race&&this.race.aiRacers){const S=this.race.aiRacers.find(N=>N.id===this.debugFocusAI);if(S){if(S._currentPath&&S._currentPath.length>0){gt=!0;const N=[];N.push(S.position.clone());for(let q=S._pathWptIdx;q<S._currentPath.length;q++){const j=S._currentPath[q].clone();j.y=1.2+(this.world?this.world.getGroundHeight(j.x,j.z):.5),N.push(j)}this.debugPathLine.geometry.setFromPoints(N),this.debugPathLine.visible=!0}S.debugLookahead?(this.debugLookaheadMarker.position.copy(S.debugLookahead),this.debugLookaheadMarker.position.y=1.5+(this.world?this.world.getGroundHeight(S.debugLookahead.x,S.debugLookahead.z):.5),this.debugLookaheadMarker.visible=!0):this.debugLookaheadMarker.visible=!1}}gt||(this.debugPathLine.visible=!1,this.debugLookaheadMarker.visible=!1);const Q=this.physics.position.x,at=this.physics.position.z,ct=220*220;this.skidmarkPool.forEach(S=>{if(S.mesh.visible){const N=S.mesh.position.x-Q,q=S.mesh.position.z-at;N*N+q*q>ct&&(S.mesh.visible=!1)}}),this.checkpointVisualsGroup.children.forEach(S=>{const N=S.getObjectByName("nextCPArrow");if(N){N.position.y=3.5+Math.sin(this.clock.getElapsedTime()*4)*.6;const q=1.2+Math.sin(this.clock.getElapsedTime()*8)*.15;N.scale.set(q,q,q)}}),this.updateCamera(e),this._minimapFrame||(this._minimapFrame=0),this._minimapFrame++&1||this.updateMinimap();const wt=Math.round(Math.abs(D)*2.23694);if(this.speedValEl&&(this.speedValEl.textContent=wt.toString().padStart(3,"0")),this.gearValEl&&(this.physics.shiftTimer>0?(this.gearValEl.textContent="—",this.gearValEl.style.color="#ff3b30"):(this.gearValEl.textContent=this.physics.gear,this.gearValEl.style.color=this.physics.gear==="R"?"#ff3b30":"#ffc600")),this.dialNeedleEl&&this.dialRpmFillEl){const S=Math.max(0,Math.min(100,(this.physics.rpm-1e3)/7e3*100)),N=S/100*270-135;this.dialNeedleEl.setAttribute("transform",`rotate(${N} 80 80)`);const q=S/100*330;this.dialRpmFillEl.setAttribute("stroke-dasharray",`${q} 440`),this.physics.rpm>7300?this.dialRpmFillEl.style.stroke="#ff3b30":this.dialRpmFillEl.style.stroke="#ffc600"}if(this.nitroBarEl){const S=this.physics.nitroLevel*287;this.nitroBarEl.setAttribute("stroke-dasharray",`${S} 400`),this.physics.isBoosting?this.nitroBarEl.style.stroke="#ffffff":this.nitroBarEl.style.stroke="#00e5ff"}if(this.physics.trickNotification){const S=this.physics.trickNotification;this.physics.trickNotification="";let N="STUNT LANDED!",q="";if(S.includes("WIPEOUT")){N="WIPEOUT!",q=S.replace("WIPEOUT: ",""),this.showStuntNotification(N,q);const j=this.physics.position.clone();j.y+=.3,this.spawnDebris(j,new R(0,4,0),2236962,16),this.crashShake=Math.max(this.crashShake||0,.95)}else if(S.includes("CLEAN LANDING")){N="CLEAN LANDING!",q=S.replace("CLEAN LANDING: ",""),this.showStuntNotification(N,q);const j=this.physics.position.clone();j.y+=.1,this.spawnParticles(j,new R(0,2,0),61695,15);const w=Math.abs(this.physics.velocityY);w>6&&(this.crashShake=Math.max(this.crashShake||0,Math.min(.7,w*.055)))}else if(S.includes("LANDED")){N="STUNT LANDED!",q=S.replace("LANDED: ",""),this.showStuntNotification(N,q);const j=this.physics.position.clone();j.y+=.1,this.spawnParticles(j,new R(0,1.5,0),15051067,10);const w=Math.abs(this.physics.velocityY);w>6&&(this.crashShake=Math.max(this.crashShake||0,Math.min(.6,w*.05)))}else{N=S,q="",this.showStuntNotification(N,q);const j=this.physics.position.clone();j.y+=.1,this.spawnParticles(j,new R(0,1.5,0),65407,8);const w=Math.abs(this.physics.velocityY);w>6&&(this.crashShake=Math.max(this.crashShake||0,Math.min(.5,w*.055)))}}this.perf.particles=performance.now()-ot;const vt=performance.now(),Rt=performance.now();let V=.04;this.world&&this.world.lightSources&&this.world.lightSources.forEach(S=>{const N=S.x-Q,q=S.z-at,j=N*N+q*q;if(j<1600){const w=(S.intensity||10)/(1+j*.1);V+=w}}),V+=1.5;const _t=Math.max(.85,Math.min(3.2,2.6/Math.sqrt(V)));this.renderer.toneMappingExposure===void 0&&(this.renderer.toneMappingExposure=1),this.renderer.toneMappingExposure+=(_t-this.renderer.toneMappingExposure)*e*2.5,this.perf.eyeAdaptation=performance.now()-Rt,this.renderer.render(this.scene,this.camera),this.perf.render=performance.now()-vt;const ft=performance.now()-t;if(this.perf.total=ft,ft>33.3&&console.warn(`[Stutter Detected] Frame took ${ft.toFixed(1)}ms | world: ${this.perf.world.toFixed(1)}ms | physics: ${this.perf.physics.toFixed(1)}ms | trafficAI: ${this.perf.trafficUpdate.toFixed(1)}ms | trafficMesh: ${this.perf.trafficMesh.toFixed(1)}ms | collisions: ${this.perf.collisions.toFixed(1)}ms | playerVis: ${this.perf.playerVisuals.toFixed(1)}ms | pursuit: ${this.perf.pursuit.toFixed(1)}ms | race: ${this.perf.race.toFixed(1)}ms | particles: ${this.perf.particles.toFixed(1)}ms | render: ${this.perf.render.toFixed(1)}ms (eye: ${this.perf.eyeAdaptation.toFixed(1)}ms) | DrawCalls: ${this.renderer.info.render.calls} | Triangles: ${this.renderer.info.render.triangles} | Geometries: ${this.renderer.info.memory.geometries} | Textures: ${this.renderer.info.memory.textures} | Shaders: ${this.renderer.info.programs?this.renderer.info.programs.length:0}`),this.perfFrameCount===void 0&&(this.perfFrameCount=0),this.perfFrameCount++,this.perfFrameCount%10===0){const S=Math.round(1e3/Math.max(1,ft)),N=document.getElementById("perf-hud");this.perfFpsEl&&N&&N.style.display==="block"&&(this.perfFpsEl.textContent=S,this.perfTotalEl.textContent=ft.toFixed(1),this.perfWorldEl.textContent=this.perf.world.toFixed(1),this.perfPhysicsEl.textContent=this.perf.physics.toFixed(1),this.perfTrafficUpdateEl.textContent=this.perf.trafficUpdate.toFixed(1),this.perfTrafficMeshEl.textContent=this.perf.trafficMesh.toFixed(1),this.perfCollisionsEl.textContent=this.perf.collisions.toFixed(1),this.perfPlayerVisualsEl.textContent=this.perf.playerVisuals.toFixed(1),this.perfPursuitEl.textContent=this.perf.pursuit.toFixed(1),this.perfRaceEl.textContent=this.perf.race.toFixed(1),this.perfParticlesEl.textContent=this.perf.particles.toFixed(1),this.perfRenderEl.textContent=this.perf.render.toFixed(1),this.perfEyeEl.textContent=this.perf.eyeAdaptation.toFixed(1),this.perfCallsEl.textContent=this.renderer.info.render.calls,this.perfTrianglesEl.textContent=this.renderer.info.render.triangles,this.perfGeometriesEl.textContent=this.renderer.info.memory.geometries,this.perfTexturesEl.textContent=this.renderer.info.memory.textures,this.perfShadersEl.textContent=this.renderer.info.programs?this.renderer.info.programs.length:0)}}}const ig=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<=768;if(ig){const s=document.getElementById("mobile-blocker");s&&(s.style.display="flex");const t=document.getElementById("loader");t&&(t.style.display="none");const e=document.getElementById("main-menu");e&&(e.style.display="none"),console.log("Game initialization aborted: Mobile device detected.")}else new eg;
