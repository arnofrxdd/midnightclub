(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(n){if(n.ep)return;n.ep=!0;const o=e(n);fetch(n.href,o)}})();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Qo="160",sc=0,ma=1,oc=2,dl=1,fl=2,fi=3,Ci=0,ze=1,je=2,mi=0,gn=1,xe=2,ga=3,Ma=4,ac=5,Gi=100,rc=101,lc=102,xa=103,_a=104,cc=200,hc=201,dc=202,fc=203,Wo=204,Xo=205,uc=206,pc=207,mc=208,gc=209,Mc=210,xc=211,_c=212,yc=213,vc=214,Sc=0,wc=1,Ec=2,Ls=3,bc=4,Tc=5,Ac=6,Cc=7,ul=0,Rc=1,Pc=2,Ti=0,pl=1,ml=2,gl=3,ta=4,Lc=5,Ml=6,xl=300,xn=301,_n=302,Is=303,qo=304,ks=306,Ve=1e3,ei=1001,Yo=1002,ge=1003,ya=1004,$s=1005,De=1006,Ic=1007,yn=1008,Ai=1009,Dc=1010,Uc=1011,ea=1012,_l=1013,wi=1014,Ei=1015,vn=1016,yl=1017,vl=1018,ki=1020,Nc=1021,ii=1023,zc=1024,Fc=1025,Vi=1026,Sn=1027,Bc=1028,Sl=1029,Gc=1030,wl=1031,El=1033,js=33776,Zs=33777,Ks=33778,Js=33779,va=35840,Sa=35841,wa=35842,Ea=35843,bl=36196,ba=37492,Ta=37496,Aa=37808,Ca=37809,Ra=37810,Pa=37811,La=37812,Ia=37813,Da=37814,Ua=37815,Na=37816,za=37817,Fa=37818,Ba=37819,Ga=37820,Oa=37821,Qs=36492,ka=36494,Va=36495,Oc=36283,Ha=36284,Wa=36285,Xa=36286,Tl=3e3,Hi=3001,kc=3200,Vc=3201,Al=0,Hc=1,Ze="",we="srgb",Mi="srgb-linear",ia="display-p3",Vs="display-p3-linear",Ds="linear",le="srgb",Us="rec709",Ns="p3",qi=7680,qa=519,Wc=512,Xc=513,qc=514,Cl=515,Yc=516,$c=517,jc=518,Zc=519,$o=35044,Ya="300 es",jo=1035,pi=2e3,zs=2001;class bn{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const n=this._listeners[t];if(n!==void 0){const o=n.indexOf(e);o!==-1&&n.splice(o,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const n=i.slice(0);for(let o=0,a=n.length;o<a;o++)n[o].call(this,t);t.target=null}}}const Ae=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let $a=1234567;const kn=Math.PI/180,wn=180/Math.PI;function gi(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ae[s&255]+Ae[s>>8&255]+Ae[s>>16&255]+Ae[s>>24&255]+"-"+Ae[t&255]+Ae[t>>8&255]+"-"+Ae[t>>16&15|64]+Ae[t>>24&255]+"-"+Ae[e&63|128]+Ae[e>>8&255]+"-"+Ae[e>>16&255]+Ae[e>>24&255]+Ae[i&255]+Ae[i>>8&255]+Ae[i>>16&255]+Ae[i>>24&255]).toLowerCase()}function be(s,t,e){return Math.max(t,Math.min(e,s))}function na(s,t){return(s%t+t)%t}function Kc(s,t,e,i,n){return i+(s-t)*(n-i)/(e-t)}function Jc(s,t,e){return s!==t?(e-s)/(t-s):0}function Vn(s,t,e){return(1-e)*s+e*t}function Qc(s,t,e,i){return Vn(s,t,1-Math.exp(-e*i))}function th(s,t=1){return t-Math.abs(na(s,t*2)-t)}function eh(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function ih(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function nh(s,t){return s+Math.floor(Math.random()*(t-s+1))}function sh(s,t){return s+Math.random()*(t-s)}function oh(s){return s*(.5-Math.random())}function ah(s){s!==void 0&&($a=s);let t=$a+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function rh(s){return s*kn}function lh(s){return s*wn}function Zo(s){return(s&s-1)===0&&s!==0}function ch(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Fs(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function hh(s,t,e,i,n){const o=Math.cos,a=Math.sin,r=o(e/2),l=a(e/2),c=o((t+i)/2),h=a((t+i)/2),d=o((t-i)/2),u=a((t-i)/2),f=o((i-t)/2),g=a((i-t)/2);switch(n){case"XYX":s.set(r*h,l*d,l*u,r*c);break;case"YZY":s.set(l*u,r*h,l*d,r*c);break;case"ZXZ":s.set(l*d,l*u,r*h,r*c);break;case"XZX":s.set(r*h,l*g,l*f,r*c);break;case"YXY":s.set(l*f,r*h,l*g,r*c);break;case"ZYZ":s.set(l*g,l*f,r*h,r*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+n)}}function si(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function ae(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const Bs={DEG2RAD:kn,RAD2DEG:wn,generateUUID:gi,clamp:be,euclideanModulo:na,mapLinear:Kc,inverseLerp:Jc,lerp:Vn,damp:Qc,pingpong:th,smoothstep:eh,smootherstep:ih,randInt:nh,randFloat:sh,randFloatSpread:oh,seededRandom:ah,degToRad:rh,radToDeg:lh,isPowerOfTwo:Zo,ceilPowerOfTwo:ch,floorPowerOfTwo:Fs,setQuaternionFromProperEuler:hh,normalize:ae,denormalize:si};class Xt{constructor(t=0,e=0){Xt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,n=t.elements;return this.x=n[0]*e+n[3]*i+n[6],this.y=n[1]*e+n[4]*i+n[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(be(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),n=Math.sin(e),o=this.x-t.x,a=this.y-t.y;return this.x=o*i-a*n+t.x,this.y=o*n+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Qt{constructor(t,e,i,n,o,a,r,l,c){Qt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,n,o,a,r,l,c)}set(t,e,i,n,o,a,r,l,c){const h=this.elements;return h[0]=t,h[1]=n,h[2]=r,h[3]=e,h[4]=o,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,n=e.elements,o=this.elements,a=i[0],r=i[3],l=i[6],c=i[1],h=i[4],d=i[7],u=i[2],f=i[5],g=i[8],M=n[0],m=n[3],p=n[6],A=n[1],x=n[4],b=n[7],L=n[2],T=n[5],_=n[8];return o[0]=a*M+r*A+l*L,o[3]=a*m+r*x+l*T,o[6]=a*p+r*b+l*_,o[1]=c*M+h*A+d*L,o[4]=c*m+h*x+d*T,o[7]=c*p+h*b+d*_,o[2]=u*M+f*A+g*L,o[5]=u*m+f*x+g*T,o[8]=u*p+f*b+g*_,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],n=t[2],o=t[3],a=t[4],r=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*r*c-i*o*h+i*r*l+n*o*c-n*a*l}invert(){const t=this.elements,e=t[0],i=t[1],n=t[2],o=t[3],a=t[4],r=t[5],l=t[6],c=t[7],h=t[8],d=h*a-r*c,u=r*l-h*o,f=c*o-a*l,g=e*d+i*u+n*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/g;return t[0]=d*M,t[1]=(n*c-h*i)*M,t[2]=(r*i-n*a)*M,t[3]=u*M,t[4]=(h*e-n*l)*M,t[5]=(n*o-r*e)*M,t[6]=f*M,t[7]=(i*l-c*e)*M,t[8]=(a*e-i*o)*M,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,n,o,a,r){const l=Math.cos(o),c=Math.sin(o);return this.set(i*l,i*c,-i*(l*a+c*r)+a+t,-n*c,n*l,-n*(-c*a+l*r)+r+e,0,0,1),this}scale(t,e){return this.premultiply(to.makeScale(t,e)),this}rotate(t){return this.premultiply(to.makeRotation(-t)),this}translate(t,e){return this.premultiply(to.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let n=0;n<9;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const to=new Qt;function Rl(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function Gs(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function dh(){const s=Gs("canvas");return s.style.display="block",s}const ja={};function Hn(s){s in ja||(ja[s]=!0,console.warn(s))}const Za=new Qt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Ka=new Qt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Qn={[Mi]:{transfer:Ds,primaries:Us,toReference:s=>s,fromReference:s=>s},[we]:{transfer:le,primaries:Us,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[Vs]:{transfer:Ds,primaries:Ns,toReference:s=>s.applyMatrix3(Ka),fromReference:s=>s.applyMatrix3(Za)},[ia]:{transfer:le,primaries:Ns,toReference:s=>s.convertSRGBToLinear().applyMatrix3(Ka),fromReference:s=>s.applyMatrix3(Za).convertLinearToSRGB()}},fh=new Set([Mi,Vs]),ne={enabled:!0,_workingColorSpace:Mi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!fh.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,t,e){if(this.enabled===!1||t===e||!t||!e)return s;const i=Qn[t].toReference,n=Qn[e].fromReference;return n(i(s))},fromWorkingColorSpace:function(s,t){return this.convert(s,this._workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this._workingColorSpace)},getPrimaries:function(s){return Qn[s].primaries},getTransfer:function(s){return s===Ze?Ds:Qn[s].transfer}};function Mn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function eo(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Yi;class Pl{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Yi===void 0&&(Yi=Gs("canvas")),Yi.width=t.width,Yi.height=t.height;const i=Yi.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=Yi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Gs("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const n=i.getImageData(0,0,t.width,t.height),o=n.data;for(let a=0;a<o.length;a++)o[a]=Mn(o[a]/255)*255;return i.putImageData(n,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Mn(e[i]/255)*255):e[i]=Mn(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let uh=0;class Ll{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:uh++}),this.uuid=gi(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let o;if(Array.isArray(n)){o=[];for(let a=0,r=n.length;a<r;a++)n[a].isDataTexture?o.push(io(n[a].image)):o.push(io(n[a]))}else o=io(n);i.url=o}return e||(t.images[this.uuid]=i),i}}function io(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Pl.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let ph=0;class Fe extends bn{constructor(t=Fe.DEFAULT_IMAGE,e=Fe.DEFAULT_MAPPING,i=ei,n=ei,o=De,a=yn,r=ii,l=Ai,c=Fe.DEFAULT_ANISOTROPY,h=Ze){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ph++}),this.uuid=gi(),this.name="",this.source=new Ll(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=o,this.minFilter=a,this.anisotropy=c,this.format=r,this.internalFormat=null,this.type=l,this.offset=new Xt(0,0),this.repeat=new Xt(1,1),this.center=new Xt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Hn("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Hi?we:Ze),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==xl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ve:t.x=t.x-Math.floor(t.x);break;case ei:t.x=t.x<0?0:1;break;case Yo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ve:t.y=t.y-Math.floor(t.y);break;case ei:t.y=t.y<0?0:1;break;case Yo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Hn("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===we?Hi:Tl}set encoding(t){Hn("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=t===Hi?we:Ze}}Fe.DEFAULT_IMAGE=null;Fe.DEFAULT_MAPPING=xl;Fe.DEFAULT_ANISOTROPY=1;class he{constructor(t=0,e=0,i=0,n=1){he.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=n}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,n){return this.x=t,this.y=e,this.z=i,this.w=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,n=this.z,o=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*n+a[12]*o,this.y=a[1]*e+a[5]*i+a[9]*n+a[13]*o,this.z=a[2]*e+a[6]*i+a[10]*n+a[14]*o,this.w=a[3]*e+a[7]*i+a[11]*n+a[15]*o,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,n,o;const l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],g=l[9],M=l[2],m=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-M)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+M)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const x=(c+1)/2,b=(f+1)/2,L=(p+1)/2,T=(h+u)/4,_=(d+M)/4,R=(g+m)/4;return x>b&&x>L?x<.01?(i=0,n=.707106781,o=.707106781):(i=Math.sqrt(x),n=T/i,o=_/i):b>L?b<.01?(i=.707106781,n=0,o=.707106781):(n=Math.sqrt(b),i=T/n,o=R/n):L<.01?(i=.707106781,n=.707106781,o=0):(o=Math.sqrt(L),i=_/o,n=R/o),this.set(i,n,o,e),this}let A=Math.sqrt((m-g)*(m-g)+(d-M)*(d-M)+(u-h)*(u-h));return Math.abs(A)<.001&&(A=1),this.x=(m-g)/A,this.y=(d-M)/A,this.z=(u-h)/A,this.w=Math.acos((c+f+p-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class mh extends bn{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new he(0,0,t,e),this.scissorTest=!1,this.viewport=new he(0,0,t,e);const n={width:t,height:e,depth:1};i.encoding!==void 0&&(Hn("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===Hi?we:Ze),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:De,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new Fe(n,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(t,e,i=1){(this.width!==t||this.height!==e||this.depth!==i)&&(this.width=t,this.height=e,this.depth=i,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Ll(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ri extends mh{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Il extends Fe{constructor(t=null,e=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=ge,this.minFilter=ge,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class gh extends Fe{constructor(t=null,e=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=ge,this.minFilter=ge,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ie{constructor(t=0,e=0,i=0,n=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=n}static slerpFlat(t,e,i,n,o,a,r){let l=i[n+0],c=i[n+1],h=i[n+2],d=i[n+3];const u=o[a+0],f=o[a+1],g=o[a+2],M=o[a+3];if(r===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d;return}if(r===1){t[e+0]=u,t[e+1]=f,t[e+2]=g,t[e+3]=M;return}if(d!==M||l!==u||c!==f||h!==g){let m=1-r;const p=l*u+c*f+h*g+d*M,A=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const L=Math.sqrt(x),T=Math.atan2(L,p*A);m=Math.sin(m*T)/L,r=Math.sin(r*T)/L}const b=r*A;if(l=l*m+u*b,c=c*m+f*b,h=h*m+g*b,d=d*m+M*b,m===1-r){const L=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=L,c*=L,h*=L,d*=L}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,i,n,o,a){const r=i[n],l=i[n+1],c=i[n+2],h=i[n+3],d=o[a],u=o[a+1],f=o[a+2],g=o[a+3];return t[e]=r*g+h*d+l*f-c*u,t[e+1]=l*g+h*u+c*d-r*f,t[e+2]=c*g+h*f+r*u-l*d,t[e+3]=h*g-r*d-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,n){return this._x=t,this._y=e,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,n=t._y,o=t._z,a=t._order,r=Math.cos,l=Math.sin,c=r(i/2),h=r(n/2),d=r(o/2),u=l(i/2),f=l(n/2),g=l(o/2);switch(a){case"XYZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"YZX":this._x=u*h*d+c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d-u*f*g;break;case"XZY":this._x=u*h*d-c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d+u*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,n=Math.sin(i);return this._x=t.x*n,this._y=t.y*n,this._z=t.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],n=e[4],o=e[8],a=e[1],r=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=i+r+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(o-c)*f,this._z=(a-n)*f}else if(i>r&&i>d){const f=2*Math.sqrt(1+i-r-d);this._w=(h-l)/f,this._x=.25*f,this._y=(n+a)/f,this._z=(o+c)/f}else if(r>d){const f=2*Math.sqrt(1+r-i-d);this._w=(o-c)/f,this._x=(n+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+d-i-r);this._w=(a-n)/f,this._x=(o+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(be(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const n=Math.min(1,e/i);return this.slerp(t,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,n=t._y,o=t._z,a=t._w,r=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+a*r+n*c-o*l,this._y=n*h+a*l+o*r-i*c,this._z=o*h+a*c+i*l-n*r,this._w=a*h-i*r-n*l-o*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,n=this._y,o=this._z,a=this._w;let r=a*t._w+i*t._x+n*t._y+o*t._z;if(r<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,r=-r):this.copy(t),r>=1)return this._w=a,this._x=i,this._y=n,this._z=o,this;const l=1-r*r;if(l<=Number.EPSILON){const f=1-e;return this._w=f*a+e*this._w,this._x=f*i+e*this._x,this._y=f*n+e*this._y,this._z=f*o+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,r),d=Math.sin((1-e)*h)/c,u=Math.sin(e*h)/c;return this._w=a*d+this._w*u,this._x=i*d+this._x*u,this._y=n*d+this._y*u,this._z=o*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=Math.random(),e=Math.sqrt(1-t),i=Math.sqrt(t),n=2*Math.PI*Math.random(),o=2*Math.PI*Math.random();return this.set(e*Math.cos(n),i*Math.sin(o),i*Math.cos(o),e*Math.sin(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(t=0,e=0,i=0){P.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ja.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ja.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,n=this.z,o=t.elements;return this.x=o[0]*e+o[3]*i+o[6]*n,this.y=o[1]*e+o[4]*i+o[7]*n,this.z=o[2]*e+o[5]*i+o[8]*n,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,n=this.z,o=t.elements,a=1/(o[3]*e+o[7]*i+o[11]*n+o[15]);return this.x=(o[0]*e+o[4]*i+o[8]*n+o[12])*a,this.y=(o[1]*e+o[5]*i+o[9]*n+o[13])*a,this.z=(o[2]*e+o[6]*i+o[10]*n+o[14])*a,this}applyQuaternion(t){const e=this.x,i=this.y,n=this.z,o=t.x,a=t.y,r=t.z,l=t.w,c=2*(a*n-r*i),h=2*(r*e-o*n),d=2*(o*i-a*e);return this.x=e+l*c+a*d-r*h,this.y=i+l*h+r*c-o*d,this.z=n+l*d+o*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,n=this.z,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*n,this.y=o[1]*e+o[5]*i+o[9]*n,this.z=o[2]*e+o[6]*i+o[10]*n,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,n=t.y,o=t.z,a=e.x,r=e.y,l=e.z;return this.x=n*l-o*r,this.y=o*a-i*l,this.z=i*r-n*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return no.copy(this).projectOnVector(t),this.sub(no)}reflect(t){return this.sub(no.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(be(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,n=this.z-t.z;return e*e+i*i+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const n=Math.sin(e)*t;return this.x=n*Math.sin(i),this.y=Math.cos(e)*t,this.z=n*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),n=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=n,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,i=Math.sqrt(1-t**2);return this.x=i*Math.cos(e),this.y=i*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const no=new P,Ja=new Ie;class Xn{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Je.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Je.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=Je.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const o=i.getAttribute("position");if(e===!0&&o!==void 0&&t.isInstancedMesh!==!0)for(let a=0,r=o.count;a<r;a++)t.isMesh===!0?t.getVertexPosition(a,Je):Je.fromBufferAttribute(o,a),Je.applyMatrix4(t.matrixWorld),this.expandByPoint(Je);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ts.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ts.copy(i.boundingBox)),ts.applyMatrix4(t.matrixWorld),this.union(ts)}const n=t.children;for(let o=0,a=n.length;o<a;o++)this.expandByObject(n[o],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,Je),Je.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Pn),es.subVectors(this.max,Pn),$i.subVectors(t.a,Pn),ji.subVectors(t.b,Pn),Zi.subVectors(t.c,Pn),xi.subVectors(ji,$i),_i.subVectors(Zi,ji),Ii.subVectors($i,Zi);let e=[0,-xi.z,xi.y,0,-_i.z,_i.y,0,-Ii.z,Ii.y,xi.z,0,-xi.x,_i.z,0,-_i.x,Ii.z,0,-Ii.x,-xi.y,xi.x,0,-_i.y,_i.x,0,-Ii.y,Ii.x,0];return!so(e,$i,ji,Zi,es)||(e=[1,0,0,0,1,0,0,0,1],!so(e,$i,ji,Zi,es))?!1:(is.crossVectors(xi,_i),e=[is.x,is.y,is.z],so(e,$i,ji,Zi,es))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Je).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Je).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ri[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ri[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ri[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ri[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ri[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ri[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ri[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ri[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ri),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const ri=[new P,new P,new P,new P,new P,new P,new P,new P],Je=new P,ts=new Xn,$i=new P,ji=new P,Zi=new P,xi=new P,_i=new P,Ii=new P,Pn=new P,es=new P,is=new P,Di=new P;function so(s,t,e,i,n){for(let o=0,a=s.length-3;o<=a;o+=3){Di.fromArray(s,o);const r=n.x*Math.abs(Di.x)+n.y*Math.abs(Di.y)+n.z*Math.abs(Di.z),l=t.dot(Di),c=e.dot(Di),h=i.dot(Di);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>r)return!1}return!0}const Mh=new Xn,Ln=new P,oo=new P;class qn{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):Mh.setFromPoints(t).getCenter(i);let n=0;for(let o=0,a=t.length;o<a;o++)n=Math.max(n,i.distanceToSquared(t[o]));return this.radius=Math.sqrt(n),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ln.subVectors(t,this.center);const e=Ln.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),n=(i-this.radius)*.5;this.center.addScaledVector(Ln,n/i),this.radius+=n}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(oo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ln.copy(t.center).add(oo)),this.expandByPoint(Ln.copy(t.center).sub(oo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const li=new P,ao=new P,ns=new P,yi=new P,ro=new P,ss=new P,lo=new P;class Dl{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,li)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=li.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(li.copy(this.origin).addScaledVector(this.direction,e),li.distanceToSquared(t))}distanceSqToSegment(t,e,i,n){ao.copy(t).add(e).multiplyScalar(.5),ns.copy(e).sub(t).normalize(),yi.copy(this.origin).sub(ao);const o=t.distanceTo(e)*.5,a=-this.direction.dot(ns),r=yi.dot(this.direction),l=-yi.dot(ns),c=yi.lengthSq(),h=Math.abs(1-a*a);let d,u,f,g;if(h>0)if(d=a*l-r,u=a*r-l,g=o*h,d>=0)if(u>=-g)if(u<=g){const M=1/h;d*=M,u*=M,f=d*(d+a*u+2*r)+u*(a*d+u+2*l)+c}else u=o,d=Math.max(0,-(a*u+r)),f=-d*d+u*(u+2*l)+c;else u=-o,d=Math.max(0,-(a*u+r)),f=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-a*o+r)),u=d>0?-o:Math.min(Math.max(-o,-l),o),f=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-o,-l),o),f=u*(u+2*l)+c):(d=Math.max(0,-(a*o+r)),u=d>0?o:Math.min(Math.max(-o,-l),o),f=-d*d+u*(u+2*l)+c);else u=a>0?-o:o,d=Math.max(0,-(a*u+r)),f=-d*d+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),n&&n.copy(ao).addScaledVector(ns,u),f}intersectSphere(t,e){li.subVectors(t.center,this.origin);const i=li.dot(this.direction),n=li.dot(li)-i*i,o=t.radius*t.radius;if(n>o)return null;const a=Math.sqrt(o-n),r=i-a,l=i+a;return l<0?null:r<0?this.at(l,e):this.at(r,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,n,o,a,r,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(i=(t.min.x-u.x)*c,n=(t.max.x-u.x)*c):(i=(t.max.x-u.x)*c,n=(t.min.x-u.x)*c),h>=0?(o=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(o=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),i>a||o>n||((o>i||isNaN(i))&&(i=o),(a<n||isNaN(n))&&(n=a),d>=0?(r=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(r=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),i>l||r>n)||((r>i||i!==i)&&(i=r),(l<n||n!==n)&&(n=l),n<0)?null:this.at(i>=0?i:n,e)}intersectsBox(t){return this.intersectBox(t,li)!==null}intersectTriangle(t,e,i,n,o){ro.subVectors(e,t),ss.subVectors(i,t),lo.crossVectors(ro,ss);let a=this.direction.dot(lo),r;if(a>0){if(n)return null;r=1}else if(a<0)r=-1,a=-a;else return null;yi.subVectors(this.origin,t);const l=r*this.direction.dot(ss.crossVectors(yi,ss));if(l<0)return null;const c=r*this.direction.dot(ro.cross(yi));if(c<0||l+c>a)return null;const h=-r*yi.dot(lo);return h<0?null:this.at(h/a,o)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class se{constructor(t,e,i,n,o,a,r,l,c,h,d,u,f,g,M,m){se.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,n,o,a,r,l,c,h,d,u,f,g,M,m)}set(t,e,i,n,o,a,r,l,c,h,d,u,f,g,M,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=n,p[1]=o,p[5]=a,p[9]=r,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=M,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new se().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,n=1/Ki.setFromMatrixColumn(t,0).length(),o=1/Ki.setFromMatrixColumn(t,1).length(),a=1/Ki.setFromMatrixColumn(t,2).length();return e[0]=i[0]*n,e[1]=i[1]*n,e[2]=i[2]*n,e[3]=0,e[4]=i[4]*o,e[5]=i[5]*o,e[6]=i[6]*o,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,n=t.y,o=t.z,a=Math.cos(i),r=Math.sin(i),l=Math.cos(n),c=Math.sin(n),h=Math.cos(o),d=Math.sin(o);if(t.order==="XYZ"){const u=a*h,f=a*d,g=r*h,M=r*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=f+g*c,e[5]=u-M*c,e[9]=-r*l,e[2]=M-u*c,e[6]=g+f*c,e[10]=a*l}else if(t.order==="YXZ"){const u=l*h,f=l*d,g=c*h,M=c*d;e[0]=u+M*r,e[4]=g*r-f,e[8]=a*c,e[1]=a*d,e[5]=a*h,e[9]=-r,e[2]=f*r-g,e[6]=M+u*r,e[10]=a*l}else if(t.order==="ZXY"){const u=l*h,f=l*d,g=c*h,M=c*d;e[0]=u-M*r,e[4]=-a*d,e[8]=g+f*r,e[1]=f+g*r,e[5]=a*h,e[9]=M-u*r,e[2]=-a*c,e[6]=r,e[10]=a*l}else if(t.order==="ZYX"){const u=a*h,f=a*d,g=r*h,M=r*d;e[0]=l*h,e[4]=g*c-f,e[8]=u*c+M,e[1]=l*d,e[5]=M*c+u,e[9]=f*c-g,e[2]=-c,e[6]=r*l,e[10]=a*l}else if(t.order==="YZX"){const u=a*l,f=a*c,g=r*l,M=r*c;e[0]=l*h,e[4]=M-u*d,e[8]=g*d+f,e[1]=d,e[5]=a*h,e[9]=-r*h,e[2]=-c*h,e[6]=f*d+g,e[10]=u-M*d}else if(t.order==="XZY"){const u=a*l,f=a*c,g=r*l,M=r*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+M,e[5]=a*h,e[9]=f*d-g,e[2]=g*d-f,e[6]=r*h,e[10]=M*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(xh,t,_h)}lookAt(t,e,i){const n=this.elements;return Oe.subVectors(t,e),Oe.lengthSq()===0&&(Oe.z=1),Oe.normalize(),vi.crossVectors(i,Oe),vi.lengthSq()===0&&(Math.abs(i.z)===1?Oe.x+=1e-4:Oe.z+=1e-4,Oe.normalize(),vi.crossVectors(i,Oe)),vi.normalize(),os.crossVectors(Oe,vi),n[0]=vi.x,n[4]=os.x,n[8]=Oe.x,n[1]=vi.y,n[5]=os.y,n[9]=Oe.y,n[2]=vi.z,n[6]=os.z,n[10]=Oe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,n=e.elements,o=this.elements,a=i[0],r=i[4],l=i[8],c=i[12],h=i[1],d=i[5],u=i[9],f=i[13],g=i[2],M=i[6],m=i[10],p=i[14],A=i[3],x=i[7],b=i[11],L=i[15],T=n[0],_=n[4],R=n[8],y=n[12],w=n[1],I=n[5],z=n[9],j=n[13],C=n[2],D=n[6],G=n[10],O=n[14],X=n[3],J=n[7],ot=n[11],lt=n[15];return o[0]=a*T+r*w+l*C+c*X,o[4]=a*_+r*I+l*D+c*J,o[8]=a*R+r*z+l*G+c*ot,o[12]=a*y+r*j+l*O+c*lt,o[1]=h*T+d*w+u*C+f*X,o[5]=h*_+d*I+u*D+f*J,o[9]=h*R+d*z+u*G+f*ot,o[13]=h*y+d*j+u*O+f*lt,o[2]=g*T+M*w+m*C+p*X,o[6]=g*_+M*I+m*D+p*J,o[10]=g*R+M*z+m*G+p*ot,o[14]=g*y+M*j+m*O+p*lt,o[3]=A*T+x*w+b*C+L*X,o[7]=A*_+x*I+b*D+L*J,o[11]=A*R+x*z+b*G+L*ot,o[15]=A*y+x*j+b*O+L*lt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],n=t[8],o=t[12],a=t[1],r=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],f=t[14],g=t[3],M=t[7],m=t[11],p=t[15];return g*(+o*l*d-n*c*d-o*r*u+i*c*u+n*r*f-i*l*f)+M*(+e*l*f-e*c*u+o*a*u-n*a*f+n*c*h-o*l*h)+m*(+e*c*d-e*r*f-o*a*d+i*a*f+o*r*h-i*c*h)+p*(-n*r*h-e*l*d+e*r*u+n*a*d-i*a*u+i*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const n=this.elements;return t.isVector3?(n[12]=t.x,n[13]=t.y,n[14]=t.z):(n[12]=t,n[13]=e,n[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],n=t[2],o=t[3],a=t[4],r=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],f=t[11],g=t[12],M=t[13],m=t[14],p=t[15],A=d*m*c-M*u*c+M*l*f-r*m*f-d*l*p+r*u*p,x=g*u*c-h*m*c-g*l*f+a*m*f+h*l*p-a*u*p,b=h*M*c-g*d*c+g*r*f-a*M*f-h*r*p+a*d*p,L=g*d*l-h*M*l-g*r*u+a*M*u+h*r*m-a*d*m,T=e*A+i*x+n*b+o*L;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const _=1/T;return t[0]=A*_,t[1]=(M*u*o-d*m*o-M*n*f+i*m*f+d*n*p-i*u*p)*_,t[2]=(r*m*o-M*l*o+M*n*c-i*m*c-r*n*p+i*l*p)*_,t[3]=(d*l*o-r*u*o-d*n*c+i*u*c+r*n*f-i*l*f)*_,t[4]=x*_,t[5]=(h*m*o-g*u*o+g*n*f-e*m*f-h*n*p+e*u*p)*_,t[6]=(g*l*o-a*m*o-g*n*c+e*m*c+a*n*p-e*l*p)*_,t[7]=(a*u*o-h*l*o+h*n*c-e*u*c-a*n*f+e*l*f)*_,t[8]=b*_,t[9]=(g*d*o-h*M*o-g*i*f+e*M*f+h*i*p-e*d*p)*_,t[10]=(a*M*o-g*r*o+g*i*c-e*M*c-a*i*p+e*r*p)*_,t[11]=(h*r*o-a*d*o-h*i*c+e*d*c+a*i*f-e*r*f)*_,t[12]=L*_,t[13]=(h*M*n-g*d*n+g*i*u-e*M*u-h*i*m+e*d*m)*_,t[14]=(g*r*n-a*M*n-g*i*l+e*M*l+a*i*m-e*r*m)*_,t[15]=(a*d*n-h*r*n+h*i*l-e*d*l-a*i*u+e*r*u)*_,this}scale(t){const e=this.elements,i=t.x,n=t.y,o=t.z;return e[0]*=i,e[4]*=n,e[8]*=o,e[1]*=i,e[5]*=n,e[9]*=o,e[2]*=i,e[6]*=n,e[10]*=o,e[3]*=i,e[7]*=n,e[11]*=o,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],n=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,n))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),n=Math.sin(e),o=1-i,a=t.x,r=t.y,l=t.z,c=o*a,h=o*r;return this.set(c*a+i,c*r-n*l,c*l+n*r,0,c*r+n*l,h*r+i,h*l-n*a,0,c*l-n*r,h*l+n*a,o*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,n,o,a){return this.set(1,i,o,0,t,1,a,0,e,n,1,0,0,0,0,1),this}compose(t,e,i){const n=this.elements,o=e._x,a=e._y,r=e._z,l=e._w,c=o+o,h=a+a,d=r+r,u=o*c,f=o*h,g=o*d,M=a*h,m=a*d,p=r*d,A=l*c,x=l*h,b=l*d,L=i.x,T=i.y,_=i.z;return n[0]=(1-(M+p))*L,n[1]=(f+b)*L,n[2]=(g-x)*L,n[3]=0,n[4]=(f-b)*T,n[5]=(1-(u+p))*T,n[6]=(m+A)*T,n[7]=0,n[8]=(g+x)*_,n[9]=(m-A)*_,n[10]=(1-(u+M))*_,n[11]=0,n[12]=t.x,n[13]=t.y,n[14]=t.z,n[15]=1,this}decompose(t,e,i){const n=this.elements;let o=Ki.set(n[0],n[1],n[2]).length();const a=Ki.set(n[4],n[5],n[6]).length(),r=Ki.set(n[8],n[9],n[10]).length();this.determinant()<0&&(o=-o),t.x=n[12],t.y=n[13],t.z=n[14],Qe.copy(this);const c=1/o,h=1/a,d=1/r;return Qe.elements[0]*=c,Qe.elements[1]*=c,Qe.elements[2]*=c,Qe.elements[4]*=h,Qe.elements[5]*=h,Qe.elements[6]*=h,Qe.elements[8]*=d,Qe.elements[9]*=d,Qe.elements[10]*=d,e.setFromRotationMatrix(Qe),i.x=o,i.y=a,i.z=r,this}makePerspective(t,e,i,n,o,a,r=pi){const l=this.elements,c=2*o/(e-t),h=2*o/(i-n),d=(e+t)/(e-t),u=(i+n)/(i-n);let f,g;if(r===pi)f=-(a+o)/(a-o),g=-2*a*o/(a-o);else if(r===zs)f=-a/(a-o),g=-a*o/(a-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+r);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,n,o,a,r=pi){const l=this.elements,c=1/(e-t),h=1/(i-n),d=1/(a-o),u=(e+t)*c,f=(i+n)*h;let g,M;if(r===pi)g=(a+o)*d,M=-2*d;else if(r===zs)g=o*d,M=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+r);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=M,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let n=0;n<16;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const Ki=new P,Qe=new se,xh=new P(0,0,0),_h=new P(1,1,1),vi=new P,os=new P,Oe=new P,Qa=new se,tr=new Ie;class Yn{constructor(t=0,e=0,i=0,n=Yn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=n}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,n=this._order){return this._x=t,this._y=e,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const n=t.elements,o=n[0],a=n[4],r=n[8],l=n[1],c=n[5],h=n[9],d=n[2],u=n[6],f=n[10];switch(e){case"XYZ":this._y=Math.asin(be(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,o)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-be(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(r,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,o),this._z=0);break;case"ZXY":this._x=Math.asin(be(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,o));break;case"ZYX":this._y=Math.asin(-be(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,o)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(be(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,o)):(this._x=0,this._y=Math.atan2(r,f));break;case"XZY":this._z=Math.asin(-be(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(r,o)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Qa.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Qa,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return tr.setFromEuler(this),this.setFromQuaternion(tr,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Yn.DEFAULT_ORDER="XYZ";class Ul{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let yh=0;const er=new P,Ji=new Ie,ci=new se,as=new P,In=new P,vh=new P,Sh=new Ie,ir=new P(1,0,0),nr=new P(0,1,0),sr=new P(0,0,1),wh={type:"added"},Eh={type:"removed"};class ce extends bn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:yh++}),this.uuid=gi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ce.DEFAULT_UP.clone();const t=new P,e=new Yn,i=new Ie,n=new P(1,1,1);function o(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(o),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new se},normalMatrix:{value:new Qt}}),this.matrix=new se,this.matrixWorld=new se,this.matrixAutoUpdate=ce.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ul,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ji.setFromAxisAngle(t,e),this.quaternion.multiply(Ji),this}rotateOnWorldAxis(t,e){return Ji.setFromAxisAngle(t,e),this.quaternion.premultiply(Ji),this}rotateX(t){return this.rotateOnAxis(ir,t)}rotateY(t){return this.rotateOnAxis(nr,t)}rotateZ(t){return this.rotateOnAxis(sr,t)}translateOnAxis(t,e){return er.copy(t).applyQuaternion(this.quaternion),this.position.add(er.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ir,t)}translateY(t){return this.translateOnAxis(nr,t)}translateZ(t){return this.translateOnAxis(sr,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ci.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?as.copy(t):as.set(t,e,i);const n=this.parent;this.updateWorldMatrix(!0,!1),In.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ci.lookAt(In,as,this.up):ci.lookAt(as,In,this.up),this.quaternion.setFromRotationMatrix(ci),n&&(ci.extractRotation(n.matrixWorld),Ji.setFromRotationMatrix(ci),this.quaternion.premultiply(Ji.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(wh)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Eh)),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ci.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ci.multiply(t.parent.matrixWorld)),t.applyMatrix4(ci),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,n=this.children.length;i<n;i++){const a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const n=this.children;for(let o=0,a=n.length;o<a;o++)n[o].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(In,t,vh),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(In,Sh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,n=e.length;i<n;i++){const o=e[i];(o.matrixWorldAutoUpdate===!0||t===!0)&&o.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const n=this.children;for(let o=0,a=n.length;o<a;o++){const r=n[o];r.matrixWorldAutoUpdate===!0&&r.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const n={};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.castShadow===!0&&(n.castShadow=!0),this.receiveShadow===!0&&(n.receiveShadow=!0),this.visible===!1&&(n.visible=!1),this.frustumCulled===!1&&(n.frustumCulled=!1),this.renderOrder!==0&&(n.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(n.matrixAutoUpdate=!1),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.visibility=this._visibility,n.active=this._active,n.bounds=this._bounds.map(r=>({boxInitialized:r.boxInitialized,boxMin:r.box.min.toArray(),boxMax:r.box.max.toArray(),sphereInitialized:r.sphereInitialized,sphereRadius:r.sphere.radius,sphereCenter:r.sphere.center.toArray()})),n.maxGeometryCount=this._maxGeometryCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.geometryCount=this._geometryCount,n.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(n.boundingSphere={center:n.boundingSphere.center.toArray(),radius:n.boundingSphere.radius}),this.boundingBox!==null&&(n.boundingBox={min:n.boundingBox.min.toArray(),max:n.boundingBox.max.toArray()}));function o(r,l){return r[l.uuid]===void 0&&(r[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=o(t.geometries,this.geometry);const r=this.geometry.parameters;if(r!==void 0&&r.shapes!==void 0){const l=r.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];o(t.shapes,d)}else o(t.shapes,l)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(t.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const r=[];for(let l=0,c=this.material.length;l<c;l++)r.push(o(t.materials,this.material[l]));n.material=r}else n.material=o(t.materials,this.material);if(this.children.length>0){n.children=[];for(let r=0;r<this.children.length;r++)n.children.push(this.children[r].toJSON(t).object)}if(this.animations.length>0){n.animations=[];for(let r=0;r<this.animations.length;r++){const l=this.animations[r];n.animations.push(o(t.animations,l))}}if(e){const r=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),d=a(t.shapes),u=a(t.skeletons),f=a(t.animations),g=a(t.nodes);r.length>0&&(i.geometries=r),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=n,i;function a(r){const l=[];for(const c in r){const h=r[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const n=t.children[i];this.add(n.clone())}return this}}ce.DEFAULT_UP=new P(0,1,0);ce.DEFAULT_MATRIX_AUTO_UPDATE=!0;ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ti=new P,hi=new P,co=new P,di=new P,Qi=new P,tn=new P,or=new P,ho=new P,fo=new P,uo=new P;let rs=!1;class Ye{constructor(t=new P,e=new P,i=new P){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,n){n.subVectors(i,e),ti.subVectors(t,e),n.cross(ti);const o=n.lengthSq();return o>0?n.multiplyScalar(1/Math.sqrt(o)):n.set(0,0,0)}static getBarycoord(t,e,i,n,o){ti.subVectors(n,e),hi.subVectors(i,e),co.subVectors(t,e);const a=ti.dot(ti),r=ti.dot(hi),l=ti.dot(co),c=hi.dot(hi),h=hi.dot(co),d=a*c-r*r;if(d===0)return o.set(0,0,0),null;const u=1/d,f=(c*l-r*h)*u,g=(a*h-r*l)*u;return o.set(1-f-g,g,f)}static containsPoint(t,e,i,n){return this.getBarycoord(t,e,i,n,di)===null?!1:di.x>=0&&di.y>=0&&di.x+di.y<=1}static getUV(t,e,i,n,o,a,r,l){return rs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),rs=!0),this.getInterpolation(t,e,i,n,o,a,r,l)}static getInterpolation(t,e,i,n,o,a,r,l){return this.getBarycoord(t,e,i,n,di)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(o,di.x),l.addScaledVector(a,di.y),l.addScaledVector(r,di.z),l)}static isFrontFacing(t,e,i,n){return ti.subVectors(i,e),hi.subVectors(t,e),ti.cross(hi).dot(n)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,n){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[n]),this}setFromAttributeAndIndices(t,e,i,n){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,n),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ti.subVectors(this.c,this.b),hi.subVectors(this.a,this.b),ti.cross(hi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Ye.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Ye.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,i,n,o){return rs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),rs=!0),Ye.getInterpolation(t,this.a,this.b,this.c,e,i,n,o)}getInterpolation(t,e,i,n,o){return Ye.getInterpolation(t,this.a,this.b,this.c,e,i,n,o)}containsPoint(t){return Ye.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Ye.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,n=this.b,o=this.c;let a,r;Qi.subVectors(n,i),tn.subVectors(o,i),ho.subVectors(t,i);const l=Qi.dot(ho),c=tn.dot(ho);if(l<=0&&c<=0)return e.copy(i);fo.subVectors(t,n);const h=Qi.dot(fo),d=tn.dot(fo);if(h>=0&&d<=h)return e.copy(n);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(i).addScaledVector(Qi,a);uo.subVectors(t,o);const f=Qi.dot(uo),g=tn.dot(uo);if(g>=0&&f<=g)return e.copy(o);const M=f*c-l*g;if(M<=0&&c>=0&&g<=0)return r=c/(c-g),e.copy(i).addScaledVector(tn,r);const m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return or.subVectors(o,n),r=(d-h)/(d-h+(f-g)),e.copy(n).addScaledVector(or,r);const p=1/(m+M+u);return a=M*p,r=u*p,e.copy(i).addScaledVector(Qi,a).addScaledVector(tn,r)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Nl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Si={h:0,s:0,l:0},ls={h:0,s:0,l:0};function po(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class te{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const n=t;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=we){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ne.toWorkingColorSpace(this,e),this}setRGB(t,e,i,n=ne.workingColorSpace){return this.r=t,this.g=e,this.b=i,ne.toWorkingColorSpace(this,n),this}setHSL(t,e,i,n=ne.workingColorSpace){if(t=na(t,1),e=be(e,0,1),i=be(i,0,1),e===0)this.r=this.g=this.b=i;else{const o=i<=.5?i*(1+e):i+e-i*e,a=2*i-o;this.r=po(a,o,t+1/3),this.g=po(a,o,t),this.b=po(a,o,t-1/3)}return ne.toWorkingColorSpace(this,n),this}setStyle(t,e=we){function i(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(t)){let o;const a=n[1],r=n[2];switch(a){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r))return i(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,e);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r))return i(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,e);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r))return i(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(t)){const o=n[1],a=o.length;if(a===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(o,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=we){const i=Nl[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Mn(t.r),this.g=Mn(t.g),this.b=Mn(t.b),this}copyLinearToSRGB(t){return this.r=eo(t.r),this.g=eo(t.g),this.b=eo(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=we){return ne.fromWorkingColorSpace(Ce.copy(this),t),Math.round(be(Ce.r*255,0,255))*65536+Math.round(be(Ce.g*255,0,255))*256+Math.round(be(Ce.b*255,0,255))}getHexString(t=we){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ne.workingColorSpace){ne.fromWorkingColorSpace(Ce.copy(this),e);const i=Ce.r,n=Ce.g,o=Ce.b,a=Math.max(i,n,o),r=Math.min(i,n,o);let l,c;const h=(r+a)/2;if(r===a)l=0,c=0;else{const d=a-r;switch(c=h<=.5?d/(a+r):d/(2-a-r),a){case i:l=(n-o)/d+(n<o?6:0);break;case n:l=(o-i)/d+2;break;case o:l=(i-n)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ne.workingColorSpace){return ne.fromWorkingColorSpace(Ce.copy(this),e),t.r=Ce.r,t.g=Ce.g,t.b=Ce.b,t}getStyle(t=we){ne.fromWorkingColorSpace(Ce.copy(this),t);const e=Ce.r,i=Ce.g,n=Ce.b;return t!==we?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(t,e,i){return this.getHSL(Si),this.setHSL(Si.h+t,Si.s+e,Si.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Si),t.getHSL(ls);const i=Vn(Si.h,ls.h,e),n=Vn(Si.s,ls.s,e),o=Vn(Si.l,ls.l,e);return this.setHSL(i,n,o),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,n=this.b,o=t.elements;return this.r=o[0]*e+o[3]*i+o[6]*n,this.g=o[1]*e+o[4]*i+o[7]*n,this.b=o[2]*e+o[5]*i+o[8]*n,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ce=new te;te.NAMES=Nl;let bh=0;class Xi extends bn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:bh++}),this.uuid=gi(),this.name="",this.type="Material",this.blending=gn,this.side=Ci,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Wo,this.blendDst=Xo,this.blendEquation=Gi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new te(0,0,0),this.blendAlpha=0,this.depthFunc=Ls,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=qa,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=qi,this.stencilZFail=qi,this.stencilZPass=qi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const n=this[e];if(n===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==gn&&(i.blending=this.blending),this.side!==Ci&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Wo&&(i.blendSrc=this.blendSrc),this.blendDst!==Xo&&(i.blendDst=this.blendDst),this.blendEquation!==Gi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ls&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==qa&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==qi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==qi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==qi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(o){const a=[];for(const r in o){const l=o[r];delete l.metadata,a.push(l)}return a}if(e){const o=n(t.textures),a=n(t.images);o.length>0&&(i.textures=o),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const n=e.length;i=new Array(n);for(let o=0;o!==n;++o)i[o]=e[o].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class fe extends Xi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new te(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=ul,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Me=new P,cs=new Xt;class Ke{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=$o,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Ei,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let n=0,o=this.itemSize;n<o;n++)this.array[t+n]=e.array[i+n];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)cs.fromBufferAttribute(this,e),cs.applyMatrix3(t),this.setXY(e,cs.x,cs.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix3(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix4(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Me.fromBufferAttribute(this,e),Me.applyNormalMatrix(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Me.fromBufferAttribute(this,e),Me.transformDirection(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=si(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=ae(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=si(e,this.array)),e}setX(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=si(e,this.array)),e}setY(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=si(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=si(e,this.array)),e}setW(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=ae(e,this.array),i=ae(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,n){return t*=this.itemSize,this.normalized&&(e=ae(e,this.array),i=ae(i,this.array),n=ae(n,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this}setXYZW(t,e,i,n,o){return t*=this.itemSize,this.normalized&&(e=ae(e,this.array),i=ae(i,this.array),n=ae(n,this.array),o=ae(o,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this.array[t+3]=o,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==$o&&(t.usage=this.usage),t}}class zl extends Ke{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Fl extends Ke{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class He extends Ke{constructor(t,e,i){super(new Float32Array(t),e,i)}}let Th=0;const qe=new se,mo=new ce,en=new P,ke=new Xn,Dn=new Xn,Se=new P;class We extends bn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Th++}),this.uuid=gi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Rl(t)?Fl:zl)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const o=new Qt().getNormalMatrix(t);i.applyNormalMatrix(o),i.needsUpdate=!0}const n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(t),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return qe.makeRotationFromQuaternion(t),this.applyMatrix4(qe),this}rotateX(t){return qe.makeRotationX(t),this.applyMatrix4(qe),this}rotateY(t){return qe.makeRotationY(t),this.applyMatrix4(qe),this}rotateZ(t){return qe.makeRotationZ(t),this.applyMatrix4(qe),this}translate(t,e,i){return qe.makeTranslation(t,e,i),this.applyMatrix4(qe),this}scale(t,e,i){return qe.makeScale(t,e,i),this.applyMatrix4(qe),this}lookAt(t){return mo.lookAt(t),mo.updateMatrix(),this.applyMatrix4(mo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(en).negate(),this.translate(en.x,en.y,en.z),this}setFromPoints(t){const e=[];for(let i=0,n=t.length;i<n;i++){const o=t[i];e.push(o.x,o.y,o.z||0)}return this.setAttribute("position",new He(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Xn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,n=e.length;i<n;i++){const o=e[i];ke.setFromBufferAttribute(o),this.morphTargetsRelative?(Se.addVectors(this.boundingBox.min,ke.min),this.boundingBox.expandByPoint(Se),Se.addVectors(this.boundingBox.max,ke.max),this.boundingBox.expandByPoint(Se)):(this.boundingBox.expandByPoint(ke.min),this.boundingBox.expandByPoint(ke.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new qn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new P,1/0);return}if(t){const i=this.boundingSphere.center;if(ke.setFromBufferAttribute(t),e)for(let o=0,a=e.length;o<a;o++){const r=e[o];Dn.setFromBufferAttribute(r),this.morphTargetsRelative?(Se.addVectors(ke.min,Dn.min),ke.expandByPoint(Se),Se.addVectors(ke.max,Dn.max),ke.expandByPoint(Se)):(ke.expandByPoint(Dn.min),ke.expandByPoint(Dn.max))}ke.getCenter(i);let n=0;for(let o=0,a=t.count;o<a;o++)Se.fromBufferAttribute(t,o),n=Math.max(n,i.distanceToSquared(Se));if(e)for(let o=0,a=e.length;o<a;o++){const r=e[o],l=this.morphTargetsRelative;for(let c=0,h=r.count;c<h;c++)Se.fromBufferAttribute(r,c),l&&(en.fromBufferAttribute(t,c),Se.add(en)),n=Math.max(n,i.distanceToSquared(Se))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.array,n=e.position.array,o=e.normal.array,a=e.uv.array,r=n.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ke(new Float32Array(4*r),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let w=0;w<r;w++)c[w]=new P,h[w]=new P;const d=new P,u=new P,f=new P,g=new Xt,M=new Xt,m=new Xt,p=new P,A=new P;function x(w,I,z){d.fromArray(n,w*3),u.fromArray(n,I*3),f.fromArray(n,z*3),g.fromArray(a,w*2),M.fromArray(a,I*2),m.fromArray(a,z*2),u.sub(d),f.sub(d),M.sub(g),m.sub(g);const j=1/(M.x*m.y-m.x*M.y);isFinite(j)&&(p.copy(u).multiplyScalar(m.y).addScaledVector(f,-M.y).multiplyScalar(j),A.copy(f).multiplyScalar(M.x).addScaledVector(u,-m.x).multiplyScalar(j),c[w].add(p),c[I].add(p),c[z].add(p),h[w].add(A),h[I].add(A),h[z].add(A))}let b=this.groups;b.length===0&&(b=[{start:0,count:i.length}]);for(let w=0,I=b.length;w<I;++w){const z=b[w],j=z.start,C=z.count;for(let D=j,G=j+C;D<G;D+=3)x(i[D+0],i[D+1],i[D+2])}const L=new P,T=new P,_=new P,R=new P;function y(w){_.fromArray(o,w*3),R.copy(_);const I=c[w];L.copy(I),L.sub(_.multiplyScalar(_.dot(I))).normalize(),T.crossVectors(R,I);const j=T.dot(h[w])<0?-1:1;l[w*4]=L.x,l[w*4+1]=L.y,l[w*4+2]=L.z,l[w*4+3]=j}for(let w=0,I=b.length;w<I;++w){const z=b[w],j=z.start,C=z.count;for(let D=j,G=j+C;D<G;D+=3)y(i[D+0]),y(i[D+1]),y(i[D+2])}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ke(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let u=0,f=i.count;u<f;u++)i.setXYZ(u,0,0,0);const n=new P,o=new P,a=new P,r=new P,l=new P,c=new P,h=new P,d=new P;if(t)for(let u=0,f=t.count;u<f;u+=3){const g=t.getX(u+0),M=t.getX(u+1),m=t.getX(u+2);n.fromBufferAttribute(e,g),o.fromBufferAttribute(e,M),a.fromBufferAttribute(e,m),h.subVectors(a,o),d.subVectors(n,o),h.cross(d),r.fromBufferAttribute(i,g),l.fromBufferAttribute(i,M),c.fromBufferAttribute(i,m),r.add(h),l.add(h),c.add(h),i.setXYZ(g,r.x,r.y,r.z),i.setXYZ(M,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)n.fromBufferAttribute(e,u+0),o.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,o),d.subVectors(n,o),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Se.fromBufferAttribute(t,e),Se.normalize(),t.setXYZ(e,Se.x,Se.y,Se.z)}toNonIndexed(){function t(r,l){const c=r.array,h=r.itemSize,d=r.normalized,u=new c.constructor(l.length*h);let f=0,g=0;for(let M=0,m=l.length;M<m;M++){r.isInterleavedBufferAttribute?f=l[M]*r.data.stride+r.offset:f=l[M]*h;for(let p=0;p<h;p++)u[g++]=c[f++]}return new Ke(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new We,i=this.index.array,n=this.attributes;for(const r in n){const l=n[r],c=t(l,i);e.setAttribute(r,c)}const o=this.morphAttributes;for(const r in o){const l=[],c=o[r];for(let h=0,d=c.length;h<d;h++){const u=c[h],f=t(u,i);l.push(f)}e.morphAttributes[r]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let r=0,l=a.length;r<l;r++){const c=a[r];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const n={};let o=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const f=c[d];h.push(f.toJSON(t.data))}h.length>0&&(n[l]=h,o=!0)}o&&(t.data.morphAttributes=n,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const r=this.boundingSphere;return r!==null&&(t.data.boundingSphere={center:r.center.toArray(),radius:r.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const n=t.attributes;for(const c in n){const h=n[c];this.setAttribute(c,h.clone(e))}const o=t.morphAttributes;for(const c in o){const h=[],d=o[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const r=t.boundingBox;r!==null&&(this.boundingBox=r.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ar=new se,Ui=new Dl,hs=new qn,rr=new P,nn=new P,sn=new P,on=new P,go=new P,ds=new P,fs=new Xt,us=new Xt,ps=new Xt,lr=new P,cr=new P,hr=new P,ms=new P,gs=new P;class Q extends ce{constructor(t=new We,e=new fe){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,a=n.length;o<a;o++){const r=n[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[r]=o}}}}getVertexPosition(t,e){const i=this.geometry,n=i.attributes.position,o=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(n,t);const r=this.morphTargetInfluences;if(o&&r){ds.set(0,0,0);for(let l=0,c=o.length;l<c;l++){const h=r[l],d=o[l];h!==0&&(go.fromBufferAttribute(d,t),a?ds.addScaledVector(go,h):ds.addScaledVector(go.sub(e),h))}e.add(ds)}return e}raycast(t,e){const i=this.geometry,n=this.material,o=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),hs.copy(i.boundingSphere),hs.applyMatrix4(o),Ui.copy(t.ray).recast(t.near),!(hs.containsPoint(Ui.origin)===!1&&(Ui.intersectSphere(hs,rr)===null||Ui.origin.distanceToSquared(rr)>(t.far-t.near)**2))&&(ar.copy(o).invert(),Ui.copy(t.ray).applyMatrix4(ar),!(i.boundingBox!==null&&Ui.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Ui)))}_computeIntersections(t,e,i){let n;const o=this.geometry,a=this.material,r=o.index,l=o.attributes.position,c=o.attributes.uv,h=o.attributes.uv1,d=o.attributes.normal,u=o.groups,f=o.drawRange;if(r!==null)if(Array.isArray(a))for(let g=0,M=u.length;g<M;g++){const m=u[g],p=a[m.materialIndex],A=Math.max(m.start,f.start),x=Math.min(r.count,Math.min(m.start+m.count,f.start+f.count));for(let b=A,L=x;b<L;b+=3){const T=r.getX(b),_=r.getX(b+1),R=r.getX(b+2);n=Ms(this,p,t,i,c,h,d,T,_,R),n&&(n.faceIndex=Math.floor(b/3),n.face.materialIndex=m.materialIndex,e.push(n))}}else{const g=Math.max(0,f.start),M=Math.min(r.count,f.start+f.count);for(let m=g,p=M;m<p;m+=3){const A=r.getX(m),x=r.getX(m+1),b=r.getX(m+2);n=Ms(this,a,t,i,c,h,d,A,x,b),n&&(n.faceIndex=Math.floor(m/3),e.push(n))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,M=u.length;g<M;g++){const m=u[g],p=a[m.materialIndex],A=Math.max(m.start,f.start),x=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let b=A,L=x;b<L;b+=3){const T=b,_=b+1,R=b+2;n=Ms(this,p,t,i,c,h,d,T,_,R),n&&(n.faceIndex=Math.floor(b/3),n.face.materialIndex=m.materialIndex,e.push(n))}}else{const g=Math.max(0,f.start),M=Math.min(l.count,f.start+f.count);for(let m=g,p=M;m<p;m+=3){const A=m,x=m+1,b=m+2;n=Ms(this,a,t,i,c,h,d,A,x,b),n&&(n.faceIndex=Math.floor(m/3),e.push(n))}}}}function Ah(s,t,e,i,n,o,a,r){let l;if(t.side===ze?l=i.intersectTriangle(a,o,n,!0,r):l=i.intersectTriangle(n,o,a,t.side===Ci,r),l===null)return null;gs.copy(r),gs.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(gs);return c<e.near||c>e.far?null:{distance:c,point:gs.clone(),object:s}}function Ms(s,t,e,i,n,o,a,r,l,c){s.getVertexPosition(r,nn),s.getVertexPosition(l,sn),s.getVertexPosition(c,on);const h=Ah(s,t,e,i,nn,sn,on,ms);if(h){n&&(fs.fromBufferAttribute(n,r),us.fromBufferAttribute(n,l),ps.fromBufferAttribute(n,c),h.uv=Ye.getInterpolation(ms,nn,sn,on,fs,us,ps,new Xt)),o&&(fs.fromBufferAttribute(o,r),us.fromBufferAttribute(o,l),ps.fromBufferAttribute(o,c),h.uv1=Ye.getInterpolation(ms,nn,sn,on,fs,us,ps,new Xt),h.uv2=h.uv1),a&&(lr.fromBufferAttribute(a,r),cr.fromBufferAttribute(a,l),hr.fromBufferAttribute(a,c),h.normal=Ye.getInterpolation(ms,nn,sn,on,lr,cr,hr,new P),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const d={a:r,b:l,c,normal:new P,materialIndex:0};Ye.getNormal(nn,sn,on,d.normal),h.face=d}return h}class H extends We{constructor(t=1,e=1,i=1,n=1,o=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:n,heightSegments:o,depthSegments:a};const r=this;n=Math.floor(n),o=Math.floor(o),a=Math.floor(a);const l=[],c=[],h=[],d=[];let u=0,f=0;g("z","y","x",-1,-1,i,e,t,a,o,0),g("z","y","x",1,-1,i,e,-t,a,o,1),g("x","z","y",1,1,t,i,e,n,a,2),g("x","z","y",1,-1,t,i,-e,n,a,3),g("x","y","z",1,-1,t,e,i,n,o,4),g("x","y","z",-1,-1,t,e,-i,n,o,5),this.setIndex(l),this.setAttribute("position",new He(c,3)),this.setAttribute("normal",new He(h,3)),this.setAttribute("uv",new He(d,2));function g(M,m,p,A,x,b,L,T,_,R,y){const w=b/_,I=L/R,z=b/2,j=L/2,C=T/2,D=_+1,G=R+1;let O=0,X=0;const J=new P;for(let ot=0;ot<G;ot++){const lt=ot*I-j;for(let ct=0;ct<D;ct++){const K=ct*w-z;J[M]=K*A,J[m]=lt*x,J[p]=C,c.push(J.x,J.y,J.z),J[M]=0,J[m]=0,J[p]=T>0?1:-1,h.push(J.x,J.y,J.z),d.push(ct/_),d.push(1-ot/R),O+=1}}for(let ot=0;ot<R;ot++)for(let lt=0;lt<_;lt++){const ct=u+lt+D*ot,K=u+lt+D*(ot+1),it=u+(lt+1)+D*(ot+1),gt=u+(lt+1)+D*ot;l.push(ct,K,gt),l.push(K,it,gt),X+=6}r.addGroup(f,X,y),f+=X,u+=O}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new H(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function En(s){const t={};for(const e in s){t[e]={};for(const i in s[e]){const n=s[e][i];n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)?n.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=n.clone():Array.isArray(n)?t[e][i]=n.slice():t[e][i]=n}}return t}function Le(s){const t={};for(let e=0;e<s.length;e++){const i=En(s[e]);for(const n in i)t[n]=i[n]}return t}function Ch(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Bl(s){return s.getRenderTarget()===null?s.outputColorSpace:ne.workingColorSpace}const sa={clone:En,merge:Le};var Rh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ph=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class oi extends Xi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Rh,this.fragmentShader=Ph,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=En(t.uniforms),this.uniformsGroups=Ch(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const n in this.uniforms){const a=this.uniforms[n].value;a&&a.isTexture?e.uniforms[n]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[n]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[n]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[n]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[n]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[n]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[n]={type:"m4",value:a.toArray()}:e.uniforms[n]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Gl extends ce{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new se,this.projectionMatrix=new se,this.projectionMatrixInverse=new se,this.coordinateSystem=pi}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Ue extends Gl{constructor(t=50,e=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=wn*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(kn*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return wn*2*Math.atan(Math.tan(kn*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,i,n,o,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=o,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(kn*.5*this.fov)/this.zoom,i=2*e,n=this.aspect*i,o=-.5*n;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;o+=a.offsetX*n/l,e-=a.offsetY*i/c,n*=a.width/l,i*=a.height/c}const r=this.filmOffset;r!==0&&(o+=t*r/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+n,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const an=-90,rn=1;class Lh extends ce{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const n=new Ue(an,rn,t,e);n.layers=this.layers,this.add(n);const o=new Ue(an,rn,t,e);o.layers=this.layers,this.add(o);const a=new Ue(an,rn,t,e);a.layers=this.layers,this.add(a);const r=new Ue(an,rn,t,e);r.layers=this.layers,this.add(r);const l=new Ue(an,rn,t,e);l.layers=this.layers,this.add(l);const c=new Ue(an,rn,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,n,o,a,r,l]=e;for(const c of e)this.remove(c);if(t===pi)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),r.up.set(0,1,0),r.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===zs)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),r.up.set(0,-1,0),r.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[o,a,r,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const M=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,n),t.render(e,o),t.setRenderTarget(i,1,n),t.render(e,a),t.setRenderTarget(i,2,n),t.render(e,r),t.setRenderTarget(i,3,n),t.render(e,l),t.setRenderTarget(i,4,n),t.render(e,c),i.texture.generateMipmaps=M,t.setRenderTarget(i,5,n),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Ol extends Fe{constructor(t,e,i,n,o,a,r,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:xn,super(t,e,i,n,o,a,r,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Ih extends Ri{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},n=[i,i,i,i,i,i];e.encoding!==void 0&&(Hn("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),e.colorSpace=e.encoding===Hi?we:Ze),this.texture=new Ol(n,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:De}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},n=new H(5,5,5),o=new oi({name:"CubemapFromEquirect",uniforms:En(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:ze,blending:mi});o.uniforms.tEquirect.value=e;const a=new Q(n,o),r=e.minFilter;return e.minFilter===yn&&(e.minFilter=De),new Lh(1,10,this).update(t,a),e.minFilter=r,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,i,n){const o=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,n);t.setRenderTarget(o)}}const Mo=new P,Dh=new P,Uh=new Qt;class Fi{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,n){return this.normal.set(t,e,i),this.constant=n,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const n=Mo.subVectors(i,e).cross(Dh.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(n,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(Mo),n=this.normal.dot(i);if(n===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/n;return o<0||o>1?null:e.copy(t.start).addScaledVector(i,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Uh.getNormalMatrix(t),n=this.coplanarPoint(Mo).applyMatrix4(t),o=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(o),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ni=new qn,xs=new P;class Tn{constructor(t=new Fi,e=new Fi,i=new Fi,n=new Fi,o=new Fi,a=new Fi){this.planes=[t,e,i,n,o,a]}set(t,e,i,n,o,a){const r=this.planes;return r[0].copy(t),r[1].copy(e),r[2].copy(i),r[3].copy(n),r[4].copy(o),r[5].copy(a),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=pi){const i=this.planes,n=t.elements,o=n[0],a=n[1],r=n[2],l=n[3],c=n[4],h=n[5],d=n[6],u=n[7],f=n[8],g=n[9],M=n[10],m=n[11],p=n[12],A=n[13],x=n[14],b=n[15];if(i[0].setComponents(l-o,u-c,m-f,b-p).normalize(),i[1].setComponents(l+o,u+c,m+f,b+p).normalize(),i[2].setComponents(l+a,u+h,m+g,b+A).normalize(),i[3].setComponents(l-a,u-h,m-g,b-A).normalize(),i[4].setComponents(l-r,u-d,m-M,b-x).normalize(),e===pi)i[5].setComponents(l+r,u+d,m+M,b+x).normalize();else if(e===zs)i[5].setComponents(r,d,M,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ni.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ni.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ni)}intersectsSprite(t){return Ni.center.set(0,0,0),Ni.radius=.7071067811865476,Ni.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ni)}intersectsSphere(t){const e=this.planes,i=t.center,n=-t.radius;for(let o=0;o<6;o++)if(e[o].distanceToPoint(i)<n)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const n=e[i];if(xs.x=n.normal.x>0?t.max.x:t.min.x,xs.y=n.normal.y>0?t.max.y:t.min.y,xs.z=n.normal.z>0?t.max.z:t.min.z,n.distanceToPoint(xs)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function kl(){let s=null,t=!1,e=null,i=null;function n(o,a){e(o,a),i=s.requestAnimationFrame(n)}return{start:function(){t!==!0&&e!==null&&(i=s.requestAnimationFrame(n),t=!0)},stop:function(){s.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(o){e=o},setContext:function(o){s=o}}}function Nh(s,t){const e=t.isWebGL2,i=new WeakMap;function n(c,h){const d=c.array,u=c.usage,f=d.byteLength,g=s.createBuffer();s.bindBuffer(h,g),s.bufferData(h,d,u),c.onUploadCallback();let M;if(d instanceof Float32Array)M=s.FLOAT;else if(d instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(e)M=s.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else M=s.UNSIGNED_SHORT;else if(d instanceof Int16Array)M=s.SHORT;else if(d instanceof Uint32Array)M=s.UNSIGNED_INT;else if(d instanceof Int32Array)M=s.INT;else if(d instanceof Int8Array)M=s.BYTE;else if(d instanceof Uint8Array)M=s.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)M=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:g,type:M,bytesPerElement:d.BYTES_PER_ELEMENT,version:c.version,size:f}}function o(c,h,d){const u=h.array,f=h._updateRange,g=h.updateRanges;if(s.bindBuffer(d,c),f.count===-1&&g.length===0&&s.bufferSubData(d,0,u),g.length!==0){for(let M=0,m=g.length;M<m;M++){const p=g[M];e?s.bufferSubData(d,p.start*u.BYTES_PER_ELEMENT,u,p.start,p.count):s.bufferSubData(d,p.start*u.BYTES_PER_ELEMENT,u.subarray(p.start,p.start+p.count))}h.clearUpdateRanges()}f.count!==-1&&(e?s.bufferSubData(d,f.offset*u.BYTES_PER_ELEMENT,u,f.offset,f.count):s.bufferSubData(d,f.offset*u.BYTES_PER_ELEMENT,u.subarray(f.offset,f.offset+f.count)),f.count=-1),h.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function r(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=i.get(c);h&&(s.deleteBuffer(h.buffer),i.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const u=i.get(c);(!u||u.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const d=i.get(c);if(d===void 0)i.set(c,n(c,h));else if(d.version<c.version){if(d.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");o(d.buffer,c,h),d.version=c.version}}return{get:a,remove:r,update:l}}class bi extends We{constructor(t=1,e=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:n};const o=t/2,a=e/2,r=Math.floor(i),l=Math.floor(n),c=r+1,h=l+1,d=t/r,u=e/l,f=[],g=[],M=[],m=[];for(let p=0;p<h;p++){const A=p*u-a;for(let x=0;x<c;x++){const b=x*d-o;g.push(b,-A,0),M.push(0,0,1),m.push(x/r),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let A=0;A<r;A++){const x=A+c*p,b=A+c*(p+1),L=A+1+c*(p+1),T=A+1+c*p;f.push(x,b,T),f.push(b,L,T)}this.setIndex(f),this.setAttribute("position",new He(g,3)),this.setAttribute("normal",new He(M,3)),this.setAttribute("uv",new He(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new bi(t.width,t.height,t.widthSegments,t.heightSegments)}}var zh=`#ifdef USE_ALPHAHASH
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
#endif`,Gh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Oh=`#ifdef USE_ALPHATEST
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
#endif`,Nd=`struct PhysicalMaterial {
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
}`,zd=`
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
#endif`,Gd=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Od=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
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
#endif`,Nf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const zf=`varying vec2 vUv;
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
}`,Gf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Of=`varying vec3 vWorldDirection;
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
}`,Zt={alphahash_fragment:zh,alphahash_pars_fragment:Fh,alphamap_fragment:Bh,alphamap_pars_fragment:Gh,alphatest_fragment:Oh,alphatest_pars_fragment:kh,aomap_fragment:Vh,aomap_pars_fragment:Hh,batching_pars_vertex:Wh,batching_vertex:Xh,begin_vertex:qh,beginnormal_vertex:Yh,bsdfs:$h,iridescence_fragment:jh,bumpmap_pars_fragment:Zh,clipping_planes_fragment:Kh,clipping_planes_pars_fragment:Jh,clipping_planes_pars_vertex:Qh,clipping_planes_vertex:td,color_fragment:ed,color_pars_fragment:id,color_pars_vertex:nd,color_vertex:sd,common:od,cube_uv_reflection_fragment:ad,defaultnormal_vertex:rd,displacementmap_pars_vertex:ld,displacementmap_vertex:cd,emissivemap_fragment:hd,emissivemap_pars_fragment:dd,colorspace_fragment:fd,colorspace_pars_fragment:ud,envmap_fragment:pd,envmap_common_pars_fragment:md,envmap_pars_fragment:gd,envmap_pars_vertex:Md,envmap_physical_pars_fragment:Rd,envmap_vertex:xd,fog_vertex:_d,fog_pars_vertex:yd,fog_fragment:vd,fog_pars_fragment:Sd,gradientmap_pars_fragment:wd,lightmap_fragment:Ed,lightmap_pars_fragment:bd,lights_lambert_fragment:Td,lights_lambert_pars_fragment:Ad,lights_pars_begin:Cd,lights_toon_fragment:Pd,lights_toon_pars_fragment:Ld,lights_phong_fragment:Id,lights_phong_pars_fragment:Dd,lights_physical_fragment:Ud,lights_physical_pars_fragment:Nd,lights_fragment_begin:zd,lights_fragment_maps:Fd,lights_fragment_end:Bd,logdepthbuf_fragment:Gd,logdepthbuf_pars_fragment:Od,logdepthbuf_pars_vertex:kd,logdepthbuf_vertex:Vd,map_fragment:Hd,map_pars_fragment:Wd,map_particle_fragment:Xd,map_particle_pars_fragment:qd,metalnessmap_fragment:Yd,metalnessmap_pars_fragment:$d,morphcolor_vertex:jd,morphnormal_vertex:Zd,morphtarget_pars_vertex:Kd,morphtarget_vertex:Jd,normal_fragment_begin:Qd,normal_fragment_maps:tf,normal_pars_fragment:ef,normal_pars_vertex:nf,normal_vertex:sf,normalmap_pars_fragment:of,clearcoat_normal_fragment_begin:af,clearcoat_normal_fragment_maps:rf,clearcoat_pars_fragment:lf,iridescence_pars_fragment:cf,opaque_fragment:hf,packing:df,premultiplied_alpha_fragment:ff,project_vertex:uf,dithering_fragment:pf,dithering_pars_fragment:mf,roughnessmap_fragment:gf,roughnessmap_pars_fragment:Mf,shadowmap_pars_fragment:xf,shadowmap_pars_vertex:_f,shadowmap_vertex:yf,shadowmask_pars_fragment:vf,skinbase_vertex:Sf,skinning_pars_vertex:wf,skinning_vertex:Ef,skinnormal_vertex:bf,specularmap_fragment:Tf,specularmap_pars_fragment:Af,tonemapping_fragment:Cf,tonemapping_pars_fragment:Rf,transmission_fragment:Pf,transmission_pars_fragment:Lf,uv_pars_fragment:If,uv_pars_vertex:Df,uv_vertex:Uf,worldpos_vertex:Nf,background_vert:zf,background_frag:Ff,backgroundCube_vert:Bf,backgroundCube_frag:Gf,cube_vert:Of,cube_frag:kf,depth_vert:Vf,depth_frag:Hf,distanceRGBA_vert:Wf,distanceRGBA_frag:Xf,equirect_vert:qf,equirect_frag:Yf,linedashed_vert:$f,linedashed_frag:jf,meshbasic_vert:Zf,meshbasic_frag:Kf,meshlambert_vert:Jf,meshlambert_frag:Qf,meshmatcap_vert:tu,meshmatcap_frag:eu,meshnormal_vert:iu,meshnormal_frag:nu,meshphong_vert:su,meshphong_frag:ou,meshphysical_vert:au,meshphysical_frag:ru,meshtoon_vert:lu,meshtoon_frag:cu,points_vert:hu,points_frag:du,shadow_vert:fu,shadow_frag:uu,sprite_vert:pu,sprite_frag:mu},Dt={common:{diffuse:{value:new te(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qt},normalScale:{value:new Xt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new te(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new te(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0},uvTransform:{value:new Qt}},sprite:{diffuse:{value:new te(16777215)},opacity:{value:1},center:{value:new Xt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}}},ni={basic:{uniforms:Le([Dt.common,Dt.specularmap,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.fog]),vertexShader:Zt.meshbasic_vert,fragmentShader:Zt.meshbasic_frag},lambert:{uniforms:Le([Dt.common,Dt.specularmap,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.fog,Dt.lights,{emissive:{value:new te(0)}}]),vertexShader:Zt.meshlambert_vert,fragmentShader:Zt.meshlambert_frag},phong:{uniforms:Le([Dt.common,Dt.specularmap,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.fog,Dt.lights,{emissive:{value:new te(0)},specular:{value:new te(1118481)},shininess:{value:30}}]),vertexShader:Zt.meshphong_vert,fragmentShader:Zt.meshphong_frag},standard:{uniforms:Le([Dt.common,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.roughnessmap,Dt.metalnessmap,Dt.fog,Dt.lights,{emissive:{value:new te(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag},toon:{uniforms:Le([Dt.common,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.gradientmap,Dt.fog,Dt.lights,{emissive:{value:new te(0)}}]),vertexShader:Zt.meshtoon_vert,fragmentShader:Zt.meshtoon_frag},matcap:{uniforms:Le([Dt.common,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.fog,{matcap:{value:null}}]),vertexShader:Zt.meshmatcap_vert,fragmentShader:Zt.meshmatcap_frag},points:{uniforms:Le([Dt.points,Dt.fog]),vertexShader:Zt.points_vert,fragmentShader:Zt.points_frag},dashed:{uniforms:Le([Dt.common,Dt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Zt.linedashed_vert,fragmentShader:Zt.linedashed_frag},depth:{uniforms:Le([Dt.common,Dt.displacementmap]),vertexShader:Zt.depth_vert,fragmentShader:Zt.depth_frag},normal:{uniforms:Le([Dt.common,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,{opacity:{value:1}}]),vertexShader:Zt.meshnormal_vert,fragmentShader:Zt.meshnormal_frag},sprite:{uniforms:Le([Dt.sprite,Dt.fog]),vertexShader:Zt.sprite_vert,fragmentShader:Zt.sprite_frag},background:{uniforms:{uvTransform:{value:new Qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Zt.background_vert,fragmentShader:Zt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Zt.backgroundCube_vert,fragmentShader:Zt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Zt.cube_vert,fragmentShader:Zt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Zt.equirect_vert,fragmentShader:Zt.equirect_frag},distanceRGBA:{uniforms:Le([Dt.common,Dt.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Zt.distanceRGBA_vert,fragmentShader:Zt.distanceRGBA_frag},shadow:{uniforms:Le([Dt.lights,Dt.fog,{color:{value:new te(0)},opacity:{value:1}}]),vertexShader:Zt.shadow_vert,fragmentShader:Zt.shadow_frag}};ni.physical={uniforms:Le([ni.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qt},clearcoatNormalScale:{value:new Xt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qt},sheen:{value:0},sheenColor:{value:new te(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qt},transmissionSamplerSize:{value:new Xt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qt},attenuationDistance:{value:0},attenuationColor:{value:new te(0)},specularColor:{value:new te(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qt},anisotropyVector:{value:new Xt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qt}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag};const _s={r:0,b:0,g:0};function gu(s,t,e,i,n,o,a){const r=new te(0);let l=o===!0?0:1,c,h,d=null,u=0,f=null;function g(m,p){let A=!1,x=p.isScene===!0?p.background:null;x&&x.isTexture&&(x=(p.backgroundBlurriness>0?e:t).get(x)),x===null?M(r,l):x&&x.isColor&&(M(x,1),A=!0);const b=s.xr.getEnvironmentBlendMode();b==="additive"?i.buffers.color.setClear(0,0,0,1,a):b==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(s.autoClear||A)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),x&&(x.isCubeTexture||x.mapping===ks)?(h===void 0&&(h=new Q(new H(1,1,1),new oi({name:"BackgroundCubeMaterial",uniforms:En(ni.backgroundCube.uniforms),vertexShader:ni.backgroundCube.vertexShader,fragmentShader:ni.backgroundCube.fragmentShader,side:ze,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(L,T,_){this.matrixWorld.copyPosition(_.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(h)),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,h.material.toneMapped=ne.getTransfer(x.colorSpace)!==le,(d!==x||u!==x.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,d=x,u=x.version,f=s.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new Q(new bi(2,2),new oi({name:"BackgroundMaterial",uniforms:En(ni.background.uniforms),vertexShader:ni.background.vertexShader,fragmentShader:ni.background.fragmentShader,side:Ci,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,c.material.toneMapped=ne.getTransfer(x.colorSpace)!==le,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(d!==x||u!==x.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,d=x,u=x.version,f=s.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function M(m,p){m.getRGB(_s,Bl(s)),i.buffers.color.setClear(_s.r,_s.g,_s.b,p,a)}return{getClearColor:function(){return r},setClearColor:function(m,p=1){r.set(m),l=p,M(r,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,M(r,l)},render:g}}function Mu(s,t,e,i){const n=s.getParameter(s.MAX_VERTEX_ATTRIBS),o=i.isWebGL2?null:t.get("OES_vertex_array_object"),a=i.isWebGL2||o!==null,r={},l=m(null);let c=l,h=!1;function d(C,D,G,O,X){let J=!1;if(a){const ot=M(O,G,D);c!==ot&&(c=ot,f(c.object)),J=p(C,O,G,X),J&&A(C,O,G,X)}else{const ot=D.wireframe===!0;(c.geometry!==O.id||c.program!==G.id||c.wireframe!==ot)&&(c.geometry=O.id,c.program=G.id,c.wireframe=ot,J=!0)}X!==null&&e.update(X,s.ELEMENT_ARRAY_BUFFER),(J||h)&&(h=!1,R(C,D,G,O),X!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function u(){return i.isWebGL2?s.createVertexArray():o.createVertexArrayOES()}function f(C){return i.isWebGL2?s.bindVertexArray(C):o.bindVertexArrayOES(C)}function g(C){return i.isWebGL2?s.deleteVertexArray(C):o.deleteVertexArrayOES(C)}function M(C,D,G){const O=G.wireframe===!0;let X=r[C.id];X===void 0&&(X={},r[C.id]=X);let J=X[D.id];J===void 0&&(J={},X[D.id]=J);let ot=J[O];return ot===void 0&&(ot=m(u()),J[O]=ot),ot}function m(C){const D=[],G=[],O=[];for(let X=0;X<n;X++)D[X]=0,G[X]=0,O[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:G,attributeDivisors:O,object:C,attributes:{},index:null}}function p(C,D,G,O){const X=c.attributes,J=D.attributes;let ot=0;const lt=G.getAttributes();for(const ct in lt)if(lt[ct].location>=0){const it=X[ct];let gt=J[ct];if(gt===void 0&&(ct==="instanceMatrix"&&C.instanceMatrix&&(gt=C.instanceMatrix),ct==="instanceColor"&&C.instanceColor&&(gt=C.instanceColor)),it===void 0||it.attribute!==gt||gt&&it.data!==gt.data)return!0;ot++}return c.attributesNum!==ot||c.index!==O}function A(C,D,G,O){const X={},J=D.attributes;let ot=0;const lt=G.getAttributes();for(const ct in lt)if(lt[ct].location>=0){let it=J[ct];it===void 0&&(ct==="instanceMatrix"&&C.instanceMatrix&&(it=C.instanceMatrix),ct==="instanceColor"&&C.instanceColor&&(it=C.instanceColor));const gt={};gt.attribute=it,it&&it.data&&(gt.data=it.data),X[ct]=gt,ot++}c.attributes=X,c.attributesNum=ot,c.index=O}function x(){const C=c.newAttributes;for(let D=0,G=C.length;D<G;D++)C[D]=0}function b(C){L(C,0)}function L(C,D){const G=c.newAttributes,O=c.enabledAttributes,X=c.attributeDivisors;G[C]=1,O[C]===0&&(s.enableVertexAttribArray(C),O[C]=1),X[C]!==D&&((i.isWebGL2?s:t.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](C,D),X[C]=D)}function T(){const C=c.newAttributes,D=c.enabledAttributes;for(let G=0,O=D.length;G<O;G++)D[G]!==C[G]&&(s.disableVertexAttribArray(G),D[G]=0)}function _(C,D,G,O,X,J,ot){ot===!0?s.vertexAttribIPointer(C,D,G,X,J):s.vertexAttribPointer(C,D,G,O,X,J)}function R(C,D,G,O){if(i.isWebGL2===!1&&(C.isInstancedMesh||O.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;x();const X=O.attributes,J=G.getAttributes(),ot=D.defaultAttributeValues;for(const lt in J){const ct=J[lt];if(ct.location>=0){let K=X[lt];if(K===void 0&&(lt==="instanceMatrix"&&C.instanceMatrix&&(K=C.instanceMatrix),lt==="instanceColor"&&C.instanceColor&&(K=C.instanceColor)),K!==void 0){const it=K.normalized,gt=K.itemSize,Z=e.get(K);if(Z===void 0)continue;const at=Z.buffer,dt=Z.type,St=Z.bytesPerElement,yt=i.isWebGL2===!0&&(dt===s.INT||dt===s.UNSIGNED_INT||K.gpuType===_l);if(K.isInterleavedBufferAttribute){const Tt=K.data,B=Tt.stride,wt=K.offset;if(Tt.isInstancedInterleavedBuffer){for(let S=0;S<ct.locationSize;S++)L(ct.location+S,Tt.meshPerAttribute);C.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=Tt.meshPerAttribute*Tt.count)}else for(let S=0;S<ct.locationSize;S++)b(ct.location+S);s.bindBuffer(s.ARRAY_BUFFER,at);for(let S=0;S<ct.locationSize;S++)_(ct.location+S,gt/ct.locationSize,dt,it,B*St,(wt+gt/ct.locationSize*S)*St,yt)}else{if(K.isInstancedBufferAttribute){for(let Tt=0;Tt<ct.locationSize;Tt++)L(ct.location+Tt,K.meshPerAttribute);C.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let Tt=0;Tt<ct.locationSize;Tt++)b(ct.location+Tt);s.bindBuffer(s.ARRAY_BUFFER,at);for(let Tt=0;Tt<ct.locationSize;Tt++)_(ct.location+Tt,gt/ct.locationSize,dt,it,gt*St,gt/ct.locationSize*Tt*St,yt)}}else if(ot!==void 0){const it=ot[lt];if(it!==void 0)switch(it.length){case 2:s.vertexAttrib2fv(ct.location,it);break;case 3:s.vertexAttrib3fv(ct.location,it);break;case 4:s.vertexAttrib4fv(ct.location,it);break;default:s.vertexAttrib1fv(ct.location,it)}}}}T()}function y(){z();for(const C in r){const D=r[C];for(const G in D){const O=D[G];for(const X in O)g(O[X].object),delete O[X];delete D[G]}delete r[C]}}function w(C){if(r[C.id]===void 0)return;const D=r[C.id];for(const G in D){const O=D[G];for(const X in O)g(O[X].object),delete O[X];delete D[G]}delete r[C.id]}function I(C){for(const D in r){const G=r[D];if(G[C.id]===void 0)continue;const O=G[C.id];for(const X in O)g(O[X].object),delete O[X];delete G[C.id]}}function z(){j(),h=!0,c!==l&&(c=l,f(c.object))}function j(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:z,resetDefaultState:j,dispose:y,releaseStatesOfGeometry:w,releaseStatesOfProgram:I,initAttributes:x,enableAttribute:b,disableUnusedAttributes:T}}function xu(s,t,e,i){const n=i.isWebGL2;let o;function a(h){o=h}function r(h,d){s.drawArrays(o,h,d),e.update(d,o,1)}function l(h,d,u){if(u===0)return;let f,g;if(n)f=s,g="drawArraysInstanced";else if(f=t.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[g](o,h,d,u),e.update(d,o,u)}function c(h,d,u){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<u;g++)this.render(h[g],d[g]);else{f.multiDrawArraysWEBGL(o,h,0,d,0,u);let g=0;for(let M=0;M<u;M++)g+=d[M];e.update(g,o,1)}}this.setMode=a,this.render=r,this.renderInstances=l,this.renderMultiDraw=c}function _u(s,t,e){let i;function n(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const _=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(_.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(_){if(_==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";_="mediump"}return _==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&s.constructor.name==="WebGL2RenderingContext";let r=e.precision!==void 0?e.precision:"highp";const l=o(r);l!==r&&(console.warn("THREE.WebGLRenderer:",r,"not supported, using",l,"instead."),r=l);const c=a||t.has("WEBGL_draw_buffers"),h=e.logarithmicDepthBuffer===!0,d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),u=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),M=s.getParameter(s.MAX_VERTEX_ATTRIBS),m=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),p=s.getParameter(s.MAX_VARYING_VECTORS),A=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),x=u>0,b=a||t.has("OES_texture_float"),L=x&&b,T=a?s.getParameter(s.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:n,getMaxPrecision:o,precision:r,logarithmicDepthBuffer:h,maxTextures:d,maxVertexTextures:u,maxTextureSize:f,maxCubemapSize:g,maxAttributes:M,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:A,vertexTextures:x,floatFragmentTextures:b,floatVertexTextures:L,maxSamples:T}}function yu(s){const t=this;let e=null,i=0,n=!1,o=!1;const a=new Fi,r=new Qt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||i!==0||n;return n=u,i=d.length,f},this.beginShadows=function(){o=!0,h(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){const g=d.clippingPlanes,M=d.clipIntersection,m=d.clipShadows,p=s.get(d);if(!n||g===null||g.length===0||o&&!m)o?h(null):c();else{const A=o?0:i,x=A*4;let b=p.clippingState||null;l.value=b,b=h(g,u,x,f);for(let L=0;L!==x;++L)b[L]=e[L];p.clippingState=b,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=A}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(d,u,f,g){const M=d!==null?d.length:0;let m=null;if(M!==0){if(m=l.value,g!==!0||m===null){const p=f+M*4,A=u.matrixWorldInverse;r.getNormalMatrix(A),(m===null||m.length<p)&&(m=new Float32Array(p));for(let x=0,b=f;x!==M;++x,b+=4)a.copy(d[x]).applyMatrix4(A,r),a.normal.toArray(m,b),m[b+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=M,t.numIntersection=0,m}}function vu(s){let t=new WeakMap;function e(a,r){return r===Is?a.mapping=xn:r===qo&&(a.mapping=_n),a}function i(a){if(a&&a.isTexture){const r=a.mapping;if(r===Is||r===qo)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Ih(l.height/2);return c.fromEquirectangularTexture(s,a),t.set(a,c),a.addEventListener("dispose",n),e(c.texture,a.mapping)}else return null}}return a}function n(a){const r=a.target;r.removeEventListener("dispose",n);const l=t.get(r);l!==void 0&&(t.delete(r),l.dispose())}function o(){t=new WeakMap}return{get:i,dispose:o}}class oa extends Gl{constructor(t=-1,e=1,i=1,n=-1,o=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=n,this.near=o,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,n,o,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=o,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2;let o=i-t,a=i+t,r=n+e,l=n-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=c*this.view.offsetX,a=o+c*this.view.width,r-=h*this.view.offsetY,l=r-h*this.view.height}this.projectionMatrix.makeOrthographic(o,a,r,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const pn=4,dr=[.125,.215,.35,.446,.526,.582],Oi=20,xo=new oa,fr=new te;let _o=null,yo=0,vo=0;const Bi=(1+Math.sqrt(5))/2,ln=1/Bi,ur=[new P(1,1,1),new P(-1,1,1),new P(1,1,-1),new P(-1,1,-1),new P(0,Bi,ln),new P(0,Bi,-ln),new P(ln,0,Bi),new P(-ln,0,Bi),new P(Bi,ln,0),new P(-Bi,ln,0)];class pr{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,n=100){_o=this._renderer.getRenderTarget(),yo=this._renderer.getActiveCubeFace(),vo=this._renderer.getActiveMipmapLevel(),this._setSize(256);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(t,i,n,o),e>0&&this._blur(o,0,0,e),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Mr(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=gr(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(_o,yo,vo),t.scissorTest=!1,ys(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===xn||t.mapping===_n?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),_o=this._renderer.getRenderTarget(),yo=this._renderer.getActiveCubeFace(),vo=this._renderer.getActiveMipmapLevel();const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:De,minFilter:De,generateMipmaps:!1,type:vn,format:ii,colorSpace:Mi,depthBuffer:!1},n=mr(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=mr(t,e,i);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Su(o)),this._blurMaterial=wu(o,t,e)}return n}_compileMaterial(t){const e=new Q(this._lodPlanes[0],t);this._renderer.compile(e,xo)}_sceneToCubeUV(t,e,i,n){const r=new Ue(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(fr),h.toneMapping=Ti,h.autoClear=!1;const f=new fe({name:"PMREM.Background",side:ze,depthWrite:!1,depthTest:!1}),g=new Q(new H,f);let M=!1;const m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,M=!0):(f.color.copy(fr),M=!0);for(let p=0;p<6;p++){const A=p%3;A===0?(r.up.set(0,l[p],0),r.lookAt(c[p],0,0)):A===1?(r.up.set(0,0,l[p]),r.lookAt(0,c[p],0)):(r.up.set(0,l[p],0),r.lookAt(0,0,c[p]));const x=this._cubeSize;ys(n,A*x,p>2?x:0,x,x),h.setRenderTarget(n),M&&h.render(g,r),h.render(t,r)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=u,h.autoClear=d,t.background=m}_textureToCubeUV(t,e){const i=this._renderer,n=t.mapping===xn||t.mapping===_n;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=Mr()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=gr());const o=n?this._cubemapMaterial:this._equirectMaterial,a=new Q(this._lodPlanes[0],o),r=o.uniforms;r.envMap.value=t;const l=this._cubeSize;ys(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(a,xo)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;for(let n=1;n<this._lodPlanes.length;n++){const o=Math.sqrt(this._sigmas[n]*this._sigmas[n]-this._sigmas[n-1]*this._sigmas[n-1]),a=ur[(n-1)%ur.length];this._blur(t,n-1,n,o,a)}e.autoClear=i}_blur(t,e,i,n,o){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,i,n,"latitudinal",o),this._halfBlur(a,t,i,i,n,"longitudinal",o)}_halfBlur(t,e,i,n,o,a,r){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new Q(this._lodPlanes[n],c),u=c.uniforms,f=this._sizeLods[i]-1,g=isFinite(o)?Math.PI/(2*f):2*Math.PI/(2*Oi-1),M=o/g,m=isFinite(o)?1+Math.floor(h*M):Oi;m>Oi&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Oi}`);const p=[];let A=0;for(let _=0;_<Oi;++_){const R=_/M,y=Math.exp(-R*R/2);p.push(y),_===0?A+=y:_<m&&(A+=2*y)}for(let _=0;_<p.length;_++)p[_]=p[_]/A;u.envMap.value=t.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=a==="latitudinal",r&&(u.poleAxis.value=r);const{_lodMax:x}=this;u.dTheta.value=g,u.mipInt.value=x-i;const b=this._sizeLods[n],L=3*b*(n>x-pn?n-x+pn:0),T=4*(this._cubeSize-b);ys(e,L,T,3*b,2*b),l.setRenderTarget(e),l.render(d,xo)}}function Su(s){const t=[],e=[],i=[];let n=s;const o=s-pn+1+dr.length;for(let a=0;a<o;a++){const r=Math.pow(2,n);e.push(r);let l=1/r;a>s-pn?l=dr[a-s+pn-1]:a===0&&(l=0),i.push(l);const c=1/(r-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,M=3,m=2,p=1,A=new Float32Array(M*g*f),x=new Float32Array(m*g*f),b=new Float32Array(p*g*f);for(let T=0;T<f;T++){const _=T%3*2/3-1,R=T>2?0:-1,y=[_,R,0,_+2/3,R,0,_+2/3,R+1,0,_,R,0,_+2/3,R+1,0,_,R+1,0];A.set(y,M*g*T),x.set(u,m*g*T);const w=[T,T,T,T,T,T];b.set(w,p*g*T)}const L=new We;L.setAttribute("position",new Ke(A,M)),L.setAttribute("uv",new Ke(x,m)),L.setAttribute("faceIndex",new Ke(b,p)),t.push(L),n>pn&&n--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function mr(s,t,e){const i=new Ri(s,t,e);return i.texture.mapping=ks,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ys(s,t,e,i,n){s.viewport.set(t,e,i,n),s.scissor.set(t,e,i,n)}function wu(s,t,e){const i=new Float32Array(Oi),n=new P(0,1,0);return new oi({name:"SphericalGaussianBlur",defines:{n:Oi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:n}},vertexShader:aa(),fragmentShader:`

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
	`}function Eu(s){let t=new WeakMap,e=null;function i(r){if(r&&r.isTexture){const l=r.mapping,c=l===Is||l===qo,h=l===xn||l===_n;if(c||h)if(r.isRenderTargetTexture&&r.needsPMREMUpdate===!0){r.needsPMREMUpdate=!1;let d=t.get(r);return e===null&&(e=new pr(s)),d=c?e.fromEquirectangular(r,d):e.fromCubemap(r,d),t.set(r,d),d.texture}else{if(t.has(r))return t.get(r).texture;{const d=r.image;if(c&&d&&d.height>0||h&&d&&n(d)){e===null&&(e=new pr(s));const u=c?e.fromEquirectangular(r):e.fromCubemap(r);return t.set(r,u),r.addEventListener("dispose",o),u.texture}else return null}}}return r}function n(r){let l=0;const c=6;for(let h=0;h<c;h++)r[h]!==void 0&&l++;return l===c}function o(r){const l=r.target;l.removeEventListener("dispose",o);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:a}}function bu(s){const t={};function e(i){if(t[i]!==void 0)return t[i];let n;switch(i){case"WEBGL_depth_texture":n=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":n=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":n=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":n=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:n=s.getExtension(i)}return t[i]=n,n}return{has:function(i){return e(i)!==null},init:function(i){i.isWebGL2?(e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance")):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(i){const n=e(i);return n===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),n}}}function Tu(s,t,e,i){const n={},o=new WeakMap;function a(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const g in u.attributes)t.remove(u.attributes[g]);for(const g in u.morphAttributes){const M=u.morphAttributes[g];for(let m=0,p=M.length;m<p;m++)t.remove(M[m])}u.removeEventListener("dispose",a),delete n[u.id];const f=o.get(u);f&&(t.remove(f),o.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function r(d,u){return n[u.id]===!0||(u.addEventListener("dispose",a),n[u.id]=!0,e.memory.geometries++),u}function l(d){const u=d.attributes;for(const g in u)t.update(u[g],s.ARRAY_BUFFER);const f=d.morphAttributes;for(const g in f){const M=f[g];for(let m=0,p=M.length;m<p;m++)t.update(M[m],s.ARRAY_BUFFER)}}function c(d){const u=[],f=d.index,g=d.attributes.position;let M=0;if(f!==null){const A=f.array;M=f.version;for(let x=0,b=A.length;x<b;x+=3){const L=A[x+0],T=A[x+1],_=A[x+2];u.push(L,T,T,_,_,L)}}else if(g!==void 0){const A=g.array;M=g.version;for(let x=0,b=A.length/3-1;x<b;x+=3){const L=x+0,T=x+1,_=x+2;u.push(L,T,T,_,_,L)}}else return;const m=new(Rl(u)?Fl:zl)(u,1);m.version=M;const p=o.get(d);p&&t.remove(p),o.set(d,m)}function h(d){const u=o.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return o.get(d)}return{get:r,update:l,getWireframeAttribute:h}}function Au(s,t,e,i){const n=i.isWebGL2;let o;function a(f){o=f}let r,l;function c(f){r=f.type,l=f.bytesPerElement}function h(f,g){s.drawElements(o,g,r,f*l),e.update(g,o,1)}function d(f,g,M){if(M===0)return;let m,p;if(n)m=s,p="drawElementsInstanced";else if(m=t.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](o,g,r,f*l,M),e.update(g,o,M)}function u(f,g,M){if(M===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<M;p++)this.render(f[p]/l,g[p]);else{m.multiDrawElementsWEBGL(o,g,0,r,f,0,M);let p=0;for(let A=0;A<M;A++)p+=g[A];e.update(p,o,1)}}this.setMode=a,this.setIndex=c,this.render=h,this.renderInstances=d,this.renderMultiDraw=u}function Cu(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(o,a,r){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=r*(o/3);break;case s.LINES:e.lines+=r*(o/2);break;case s.LINE_STRIP:e.lines+=r*(o-1);break;case s.LINE_LOOP:e.lines+=r*o;break;case s.POINTS:e.points+=r*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function n(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:n,update:i}}function Ru(s,t){return s[0]-t[0]}function Pu(s,t){return Math.abs(t[1])-Math.abs(s[1])}function Lu(s,t,e){const i={},n=new Float32Array(8),o=new WeakMap,a=new he,r=[];for(let c=0;c<8;c++)r[c]=[c,0];function l(c,h,d){const u=c.morphTargetInfluences;if(t.isWebGL2===!0){const g=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,M=g!==void 0?g.length:0;let m=o.get(h);if(m===void 0||m.count!==M){let D=function(){j.dispose(),o.delete(h),h.removeEventListener("dispose",D)};var f=D;m!==void 0&&m.texture.dispose();const x=h.morphAttributes.position!==void 0,b=h.morphAttributes.normal!==void 0,L=h.morphAttributes.color!==void 0,T=h.morphAttributes.position||[],_=h.morphAttributes.normal||[],R=h.morphAttributes.color||[];let y=0;x===!0&&(y=1),b===!0&&(y=2),L===!0&&(y=3);let w=h.attributes.position.count*y,I=1;w>t.maxTextureSize&&(I=Math.ceil(w/t.maxTextureSize),w=t.maxTextureSize);const z=new Float32Array(w*I*4*M),j=new Il(z,w,I,M);j.type=Ei,j.needsUpdate=!0;const C=y*4;for(let G=0;G<M;G++){const O=T[G],X=_[G],J=R[G],ot=w*I*4*G;for(let lt=0;lt<O.count;lt++){const ct=lt*C;x===!0&&(a.fromBufferAttribute(O,lt),z[ot+ct+0]=a.x,z[ot+ct+1]=a.y,z[ot+ct+2]=a.z,z[ot+ct+3]=0),b===!0&&(a.fromBufferAttribute(X,lt),z[ot+ct+4]=a.x,z[ot+ct+5]=a.y,z[ot+ct+6]=a.z,z[ot+ct+7]=0),L===!0&&(a.fromBufferAttribute(J,lt),z[ot+ct+8]=a.x,z[ot+ct+9]=a.y,z[ot+ct+10]=a.z,z[ot+ct+11]=J.itemSize===4?a.w:1)}}m={count:M,texture:j,size:new Xt(w,I)},o.set(h,m),h.addEventListener("dispose",D)}let p=0;for(let x=0;x<u.length;x++)p+=u[x];const A=h.morphTargetsRelative?1:1-p;d.getUniforms().setValue(s,"morphTargetBaseInfluence",A),d.getUniforms().setValue(s,"morphTargetInfluences",u),d.getUniforms().setValue(s,"morphTargetsTexture",m.texture,e),d.getUniforms().setValue(s,"morphTargetsTextureSize",m.size)}else{const g=u===void 0?0:u.length;let M=i[h.id];if(M===void 0||M.length!==g){M=[];for(let b=0;b<g;b++)M[b]=[b,0];i[h.id]=M}for(let b=0;b<g;b++){const L=M[b];L[0]=b,L[1]=u[b]}M.sort(Pu);for(let b=0;b<8;b++)b<g&&M[b][1]?(r[b][0]=M[b][0],r[b][1]=M[b][1]):(r[b][0]=Number.MAX_SAFE_INTEGER,r[b][1]=0);r.sort(Ru);const m=h.morphAttributes.position,p=h.morphAttributes.normal;let A=0;for(let b=0;b<8;b++){const L=r[b],T=L[0],_=L[1];T!==Number.MAX_SAFE_INTEGER&&_?(m&&h.getAttribute("morphTarget"+b)!==m[T]&&h.setAttribute("morphTarget"+b,m[T]),p&&h.getAttribute("morphNormal"+b)!==p[T]&&h.setAttribute("morphNormal"+b,p[T]),n[b]=_,A+=_):(m&&h.hasAttribute("morphTarget"+b)===!0&&h.deleteAttribute("morphTarget"+b),p&&h.hasAttribute("morphNormal"+b)===!0&&h.deleteAttribute("morphNormal"+b),n[b]=0)}const x=h.morphTargetsRelative?1:1-A;d.getUniforms().setValue(s,"morphTargetBaseInfluence",x),d.getUniforms().setValue(s,"morphTargetInfluences",n)}}return{update:l}}function Iu(s,t,e,i){let n=new WeakMap;function o(l){const c=i.render.frame,h=l.geometry,d=t.get(l,h);if(n.get(d)!==c&&(t.update(d),n.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",r)===!1&&l.addEventListener("dispose",r),n.get(l)!==c&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),n.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;n.get(u)!==c&&(u.update(),n.set(u,c))}return d}function a(){n=new WeakMap}function r(l){const c=l.target;c.removeEventListener("dispose",r),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:o,dispose:a}}class Vl extends Fe{constructor(t,e,i,n,o,a,r,l,c,h){if(h=h!==void 0?h:Vi,h!==Vi&&h!==Sn)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===Vi&&(i=wi),i===void 0&&h===Sn&&(i=ki),super(null,n,o,a,r,l,h,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=r!==void 0?r:ge,this.minFilter=l!==void 0?l:ge,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Hl=new Fe,Wl=new Vl(1,1);Wl.compareFunction=Cl;const Xl=new Il,ql=new gh,Yl=new Ol,xr=[],_r=[],yr=new Float32Array(16),vr=new Float32Array(9),Sr=new Float32Array(4);function An(s,t,e){const i=s[0];if(i<=0||i>0)return s;const n=t*e;let o=xr[n];if(o===void 0&&(o=new Float32Array(n),xr[n]=o),t!==0){i.toArray(o,0);for(let a=1,r=0;a!==t;++a)r+=e,s[a].toArray(o,r)}return o}function _e(s,t){if(s.length!==t.length)return!1;for(let e=0,i=s.length;e<i;e++)if(s[e]!==t[e])return!1;return!0}function ye(s,t){for(let e=0,i=t.length;e<i;e++)s[e]=t[e]}function Hs(s,t){let e=_r[t];e===void 0&&(e=new Int32Array(t),_r[t]=e);for(let i=0;i!==t;++i)e[i]=s.allocateTextureUnit();return e}function Du(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function Uu(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(_e(e,t))return;s.uniform2fv(this.addr,t),ye(e,t)}}function Nu(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(_e(e,t))return;s.uniform3fv(this.addr,t),ye(e,t)}}function zu(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(_e(e,t))return;s.uniform4fv(this.addr,t),ye(e,t)}}function Fu(s,t){const e=this.cache,i=t.elements;if(i===void 0){if(_e(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),ye(e,t)}else{if(_e(e,i))return;Sr.set(i),s.uniformMatrix2fv(this.addr,!1,Sr),ye(e,i)}}function Bu(s,t){const e=this.cache,i=t.elements;if(i===void 0){if(_e(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),ye(e,t)}else{if(_e(e,i))return;vr.set(i),s.uniformMatrix3fv(this.addr,!1,vr),ye(e,i)}}function Gu(s,t){const e=this.cache,i=t.elements;if(i===void 0){if(_e(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),ye(e,t)}else{if(_e(e,i))return;yr.set(i),s.uniformMatrix4fv(this.addr,!1,yr),ye(e,i)}}function Ou(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function ku(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(_e(e,t))return;s.uniform2iv(this.addr,t),ye(e,t)}}function Vu(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(_e(e,t))return;s.uniform3iv(this.addr,t),ye(e,t)}}function Hu(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(_e(e,t))return;s.uniform4iv(this.addr,t),ye(e,t)}}function Wu(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function Xu(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(_e(e,t))return;s.uniform2uiv(this.addr,t),ye(e,t)}}function qu(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(_e(e,t))return;s.uniform3uiv(this.addr,t),ye(e,t)}}function Yu(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(_e(e,t))return;s.uniform4uiv(this.addr,t),ye(e,t)}}function $u(s,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n);const o=this.type===s.SAMPLER_2D_SHADOW?Wl:Hl;e.setTexture2D(t||o,n)}function ju(s,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTexture3D(t||ql,n)}function Zu(s,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTextureCube(t||Yl,n)}function Ku(s,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTexture2DArray(t||Xl,n)}function Ju(s){switch(s){case 5126:return Du;case 35664:return Uu;case 35665:return Nu;case 35666:return zu;case 35674:return Fu;case 35675:return Bu;case 35676:return Gu;case 5124:case 35670:return Ou;case 35667:case 35671:return ku;case 35668:case 35672:return Vu;case 35669:case 35673:return Hu;case 5125:return Wu;case 36294:return Xu;case 36295:return qu;case 36296:return Yu;case 35678:case 36198:case 36298:case 36306:case 35682:return $u;case 35679:case 36299:case 36307:return ju;case 35680:case 36300:case 36308:case 36293:return Zu;case 36289:case 36303:case 36311:case 36292:return Ku}}function Qu(s,t){s.uniform1fv(this.addr,t)}function tp(s,t){const e=An(t,this.size,2);s.uniform2fv(this.addr,e)}function ep(s,t){const e=An(t,this.size,3);s.uniform3fv(this.addr,e)}function ip(s,t){const e=An(t,this.size,4);s.uniform4fv(this.addr,e)}function np(s,t){const e=An(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function sp(s,t){const e=An(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function op(s,t){const e=An(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function ap(s,t){s.uniform1iv(this.addr,t)}function rp(s,t){s.uniform2iv(this.addr,t)}function lp(s,t){s.uniform3iv(this.addr,t)}function cp(s,t){s.uniform4iv(this.addr,t)}function hp(s,t){s.uniform1uiv(this.addr,t)}function dp(s,t){s.uniform2uiv(this.addr,t)}function fp(s,t){s.uniform3uiv(this.addr,t)}function up(s,t){s.uniform4uiv(this.addr,t)}function pp(s,t,e){const i=this.cache,n=t.length,o=Hs(e,n);_e(i,o)||(s.uniform1iv(this.addr,o),ye(i,o));for(let a=0;a!==n;++a)e.setTexture2D(t[a]||Hl,o[a])}function mp(s,t,e){const i=this.cache,n=t.length,o=Hs(e,n);_e(i,o)||(s.uniform1iv(this.addr,o),ye(i,o));for(let a=0;a!==n;++a)e.setTexture3D(t[a]||ql,o[a])}function gp(s,t,e){const i=this.cache,n=t.length,o=Hs(e,n);_e(i,o)||(s.uniform1iv(this.addr,o),ye(i,o));for(let a=0;a!==n;++a)e.setTextureCube(t[a]||Yl,o[a])}function Mp(s,t,e){const i=this.cache,n=t.length,o=Hs(e,n);_e(i,o)||(s.uniform1iv(this.addr,o),ye(i,o));for(let a=0;a!==n;++a)e.setTexture2DArray(t[a]||Xl,o[a])}function xp(s){switch(s){case 5126:return Qu;case 35664:return tp;case 35665:return ep;case 35666:return ip;case 35674:return np;case 35675:return sp;case 35676:return op;case 5124:case 35670:return ap;case 35667:case 35671:return rp;case 35668:case 35672:return lp;case 35669:case 35673:return cp;case 5125:return hp;case 36294:return dp;case 36295:return fp;case 36296:return up;case 35678:case 36198:case 36298:case 36306:case 35682:return pp;case 35679:case 36299:case 36307:return mp;case 35680:case 36300:case 36308:case 36293:return gp;case 36289:case 36303:case 36311:case 36292:return Mp}}class _p{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=Ju(e.type)}}class yp{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=xp(e.type)}}class vp{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const n=this.seq;for(let o=0,a=n.length;o!==a;++o){const r=n[o];r.setValue(t,e[r.id],i)}}}const So=/(\w+)(\])?(\[|\.)?/g;function wr(s,t){s.seq.push(t),s.map[t.id]=t}function Sp(s,t,e){const i=s.name,n=i.length;for(So.lastIndex=0;;){const o=So.exec(i),a=So.lastIndex;let r=o[1];const l=o[2]==="]",c=o[3];if(l&&(r=r|0),c===void 0||c==="["&&a+2===n){wr(e,c===void 0?new _p(r,s,t):new yp(r,s,t));break}else{let d=e.map[r];d===void 0&&(d=new vp(r),wr(e,d)),e=d}}}class Rs{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let n=0;n<i;++n){const o=t.getActiveUniform(e,n),a=t.getUniformLocation(e,o.name);Sp(o,a,this)}}setValue(t,e,i,n){const o=this.map[e];o!==void 0&&o.setValue(t,i,n)}setOptional(t,e,i){const n=e[i];n!==void 0&&this.setValue(t,i,n)}static upload(t,e,i,n){for(let o=0,a=e.length;o!==a;++o){const r=e[o],l=i[r.id];l.needsUpdate!==!1&&r.setValue(t,l.value,n)}}static seqWithValue(t,e){const i=[];for(let n=0,o=t.length;n!==o;++n){const a=t[n];a.id in e&&i.push(a)}return i}}function Er(s,t,e){const i=s.createShader(t);return s.shaderSource(i,e),s.compileShader(i),i}const wp=37297;let Ep=0;function bp(s,t){const e=s.split(`
`),i=[],n=Math.max(t-6,0),o=Math.min(t+6,e.length);for(let a=n;a<o;a++){const r=a+1;i.push(`${r===t?">":" "} ${r}: ${e[a]}`)}return i.join(`
`)}function Tp(s){const t=ne.getPrimaries(ne.workingColorSpace),e=ne.getPrimaries(s);let i;switch(t===e?i="":t===Ns&&e===Us?i="LinearDisplayP3ToLinearSRGB":t===Us&&e===Ns&&(i="LinearSRGBToLinearDisplayP3"),s){case Mi:case Vs:return[i,"LinearTransferOETF"];case we:case ia:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[i,"LinearTransferOETF"]}}function br(s,t,e){const i=s.getShaderParameter(t,s.COMPILE_STATUS),n=s.getShaderInfoLog(t).trim();if(i&&n==="")return"";const o=/ERROR: 0:(\d+)/.exec(n);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+n+`

`+bp(s.getShaderSource(t),a)}else return n}function Ap(s,t){const e=Tp(t);return`vec4 ${s}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Cp(s,t){let e;switch(t){case pl:e="Linear";break;case ml:e="Reinhard";break;case gl:e="OptimizedCineon";break;case ta:e="ACESFilmic";break;case Ml:e="AgX";break;case Lc:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function Rp(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(mn).join(`
`)}function Pp(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(mn).join(`
`)}function Lp(s){const t=[];for(const e in s){const i=s[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Ip(s,t){const e={},i=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){const o=s.getActiveAttrib(t,n),a=o.name;let r=1;o.type===s.FLOAT_MAT2&&(r=2),o.type===s.FLOAT_MAT3&&(r=3),o.type===s.FLOAT_MAT4&&(r=4),e[a]={type:o.type,location:s.getAttribLocation(t,a),locationSize:r}}return e}function mn(s){return s!==""}function Tr(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ar(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Dp=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ko(s){return s.replace(Dp,Np)}const Up=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Np(s,t){let e=Zt[t];if(e===void 0){const i=Up.get(t);if(i!==void 0)e=Zt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Ko(e)}const zp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Cr(s){return s.replace(zp,Fp)}function Fp(s,t,e,i){let n="";for(let o=parseInt(t);o<parseInt(e);o++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return n}function Rr(s){let t="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Bp(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===dl?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===fl?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===fi&&(t="SHADOWMAP_TYPE_VSM"),t}function Gp(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case xn:case _n:t="ENVMAP_TYPE_CUBE";break;case ks:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Op(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case _n:t="ENVMAP_MODE_REFRACTION";break}return t}function kp(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case ul:t="ENVMAP_BLENDING_MULTIPLY";break;case Rc:t="ENVMAP_BLENDING_MIX";break;case Pc:t="ENVMAP_BLENDING_ADD";break}return t}function Vp(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function Hp(s,t,e,i){const n=s.getContext(),o=e.defines;let a=e.vertexShader,r=e.fragmentShader;const l=Bp(e),c=Gp(e),h=Op(e),d=kp(e),u=Vp(e),f=e.isWebGL2?"":Rp(e),g=Pp(e),M=Lp(o),m=n.createProgram();let p,A,x=e.glslVersion?"#version "+e.glslVersion+`
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
`+A);const b=x+p+a,L=x+A+r,T=Er(n,n.VERTEX_SHADER,b),_=Er(n,n.FRAGMENT_SHADER,L);n.attachShader(m,T),n.attachShader(m,_),e.index0AttributeName!==void 0?n.bindAttribLocation(m,0,e.index0AttributeName):e.morphTargets===!0&&n.bindAttribLocation(m,0,"position"),n.linkProgram(m);function R(z){if(s.debug.checkShaderErrors){const j=n.getProgramInfoLog(m).trim(),C=n.getShaderInfoLog(T).trim(),D=n.getShaderInfoLog(_).trim();let G=!0,O=!0;if(n.getProgramParameter(m,n.LINK_STATUS)===!1)if(G=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(n,m,T,_);else{const X=br(n,T,"vertex"),J=br(n,_,"fragment");console.error("THREE.WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(m,n.VALIDATE_STATUS)+`

Program Info Log: `+j+`
`+X+`
`+J)}else j!==""?console.warn("THREE.WebGLProgram: Program Info Log:",j):(C===""||D==="")&&(O=!1);O&&(z.diagnostics={runnable:G,programLog:j,vertexShader:{log:C,prefix:p},fragmentShader:{log:D,prefix:A}})}n.deleteShader(T),n.deleteShader(_),y=new Rs(n,m),w=Ip(n,m)}let y;this.getUniforms=function(){return y===void 0&&R(this),y};let w;this.getAttributes=function(){return w===void 0&&R(this),w};let I=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=n.getProgramParameter(m,wp)),I},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(m),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Ep++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=T,this.fragmentShader=_,this}let Wp=0;class Xp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,n=this._getShaderStage(e),o=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(n)===!1&&(a.add(n),n.usedTimes++),a.has(o)===!1&&(a.add(o),o.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new qp(t),e.set(t,i)),i}}class qp{constructor(t){this.id=Wp++,this.code=t,this.usedTimes=0}}function Yp(s,t,e,i,n,o,a){const r=new Ul,l=new Xp,c=[],h=n.isWebGL2,d=n.logarithmicDepthBuffer,u=n.vertexTextures;let f=n.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function M(y){return y===0?"uv":`uv${y}`}function m(y,w,I,z,j){const C=z.fog,D=j.geometry,G=y.isMeshStandardMaterial?z.environment:null,O=(y.isMeshStandardMaterial?e:t).get(y.envMap||G),X=O&&O.mapping===ks?O.image.height:null,J=g[y.type];y.precision!==null&&(f=n.getMaxPrecision(y.precision),f!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",f,"instead."));const ot=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,lt=ot!==void 0?ot.length:0;let ct=0;D.morphAttributes.position!==void 0&&(ct=1),D.morphAttributes.normal!==void 0&&(ct=2),D.morphAttributes.color!==void 0&&(ct=3);let K,it,gt,Z;if(J){const ie=ni[J];K=ie.vertexShader,it=ie.fragmentShader}else K=y.vertexShader,it=y.fragmentShader,l.update(y),gt=l.getVertexShaderID(y),Z=l.getFragmentShaderID(y);const at=s.getRenderTarget(),dt=j.isInstancedMesh===!0,St=j.isBatchedMesh===!0,yt=!!y.map,Tt=!!y.matcap,B=!!O,wt=!!y.aoMap,S=!!y.lightMap,W=!!y.bumpMap,F=!!y.normalMap,et=!!y.displacementMap,k=!!y.emissiveMap,v=!!y.metalnessMap,E=!!y.roughnessMap,N=y.anisotropy>0,q=y.clearcoat>0,Y=y.iridescence>0,tt=y.sheen>0,nt=y.transmission>0,ht=N&&!!y.anisotropyMap,ft=q&&!!y.clearcoatMap,vt=q&&!!y.clearcoatNormalMap,Mt=q&&!!y.clearcoatRoughnessMap,rt=Y&&!!y.iridescenceMap,It=Y&&!!y.iridescenceThicknessMap,At=tt&&!!y.sheenColorMap,Rt=tt&&!!y.sheenRoughnessMap,Pt=!!y.specularMap,Ct=!!y.specularColorMap,$=!!y.specularIntensityMap,xt=nt&&!!y.transmissionMap,Ft=nt&&!!y.thicknessMap,Ut=!!y.gradientMap,_t=!!y.alphaMap,V=y.alphaTest>0,Et=!!y.alphaHash,bt=!!y.extensions,Lt=!!D.attributes.uv1,Gt=!!D.attributes.uv2,qt=!!D.attributes.uv3;let Nt=Ti;return y.toneMapped&&(at===null||at.isXRRenderTarget===!0)&&(Nt=s.toneMapping),{isWebGL2:h,shaderID:J,shaderType:y.type,shaderName:y.name,vertexShader:K,fragmentShader:it,defines:y.defines,customVertexShaderID:gt,customFragmentShaderID:Z,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:f,batching:St,instancing:dt,instancingColor:dt&&j.instanceColor!==null,supportsVertexTextures:u,outputColorSpace:at===null?s.outputColorSpace:at.isXRRenderTarget===!0?at.texture.colorSpace:Mi,map:yt,matcap:Tt,envMap:B,envMapMode:B&&O.mapping,envMapCubeUVHeight:X,aoMap:wt,lightMap:S,bumpMap:W,normalMap:F,displacementMap:u&&et,emissiveMap:k,normalMapObjectSpace:F&&y.normalMapType===Hc,normalMapTangentSpace:F&&y.normalMapType===Al,metalnessMap:v,roughnessMap:E,anisotropy:N,anisotropyMap:ht,clearcoat:q,clearcoatMap:ft,clearcoatNormalMap:vt,clearcoatRoughnessMap:Mt,iridescence:Y,iridescenceMap:rt,iridescenceThicknessMap:It,sheen:tt,sheenColorMap:At,sheenRoughnessMap:Rt,specularMap:Pt,specularColorMap:Ct,specularIntensityMap:$,transmission:nt,transmissionMap:xt,thicknessMap:Ft,gradientMap:Ut,opaque:y.transparent===!1&&y.blending===gn,alphaMap:_t,alphaTest:V,alphaHash:Et,combine:y.combine,mapUv:yt&&M(y.map.channel),aoMapUv:wt&&M(y.aoMap.channel),lightMapUv:S&&M(y.lightMap.channel),bumpMapUv:W&&M(y.bumpMap.channel),normalMapUv:F&&M(y.normalMap.channel),displacementMapUv:et&&M(y.displacementMap.channel),emissiveMapUv:k&&M(y.emissiveMap.channel),metalnessMapUv:v&&M(y.metalnessMap.channel),roughnessMapUv:E&&M(y.roughnessMap.channel),anisotropyMapUv:ht&&M(y.anisotropyMap.channel),clearcoatMapUv:ft&&M(y.clearcoatMap.channel),clearcoatNormalMapUv:vt&&M(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Mt&&M(y.clearcoatRoughnessMap.channel),iridescenceMapUv:rt&&M(y.iridescenceMap.channel),iridescenceThicknessMapUv:It&&M(y.iridescenceThicknessMap.channel),sheenColorMapUv:At&&M(y.sheenColorMap.channel),sheenRoughnessMapUv:Rt&&M(y.sheenRoughnessMap.channel),specularMapUv:Pt&&M(y.specularMap.channel),specularColorMapUv:Ct&&M(y.specularColorMap.channel),specularIntensityMapUv:$&&M(y.specularIntensityMap.channel),transmissionMapUv:xt&&M(y.transmissionMap.channel),thicknessMapUv:Ft&&M(y.thicknessMap.channel),alphaMapUv:_t&&M(y.alphaMap.channel),vertexTangents:!!D.attributes.tangent&&(F||N),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,vertexUv1s:Lt,vertexUv2s:Gt,vertexUv3s:qt,pointsUvs:j.isPoints===!0&&!!D.attributes.uv&&(yt||_t),fog:!!C,useFog:y.fog===!0,fogExp2:C&&C.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:j.isSkinnedMesh===!0,morphTargets:D.morphAttributes.position!==void 0,morphNormals:D.morphAttributes.normal!==void 0,morphColors:D.morphAttributes.color!==void 0,morphTargetsCount:lt,morphTextureStride:ct,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:s.shadowMap.enabled&&I.length>0,shadowMapType:s.shadowMap.type,toneMapping:Nt,useLegacyLights:s._useLegacyLights,decodeVideoTexture:yt&&y.map.isVideoTexture===!0&&ne.getTransfer(y.map.colorSpace)===le,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===je,flipSided:y.side===ze,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionDerivatives:bt&&y.extensions.derivatives===!0,extensionFragDepth:bt&&y.extensions.fragDepth===!0,extensionDrawBuffers:bt&&y.extensions.drawBuffers===!0,extensionShaderTextureLOD:bt&&y.extensions.shaderTextureLOD===!0,extensionClipCullDistance:bt&&y.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()}}function p(y){const w=[];if(y.shaderID?w.push(y.shaderID):(w.push(y.customVertexShaderID),w.push(y.customFragmentShaderID)),y.defines!==void 0)for(const I in y.defines)w.push(I),w.push(y.defines[I]);return y.isRawShaderMaterial===!1&&(A(w,y),x(w,y),w.push(s.outputColorSpace)),w.push(y.customProgramCacheKey),w.join()}function A(y,w){y.push(w.precision),y.push(w.outputColorSpace),y.push(w.envMapMode),y.push(w.envMapCubeUVHeight),y.push(w.mapUv),y.push(w.alphaMapUv),y.push(w.lightMapUv),y.push(w.aoMapUv),y.push(w.bumpMapUv),y.push(w.normalMapUv),y.push(w.displacementMapUv),y.push(w.emissiveMapUv),y.push(w.metalnessMapUv),y.push(w.roughnessMapUv),y.push(w.anisotropyMapUv),y.push(w.clearcoatMapUv),y.push(w.clearcoatNormalMapUv),y.push(w.clearcoatRoughnessMapUv),y.push(w.iridescenceMapUv),y.push(w.iridescenceThicknessMapUv),y.push(w.sheenColorMapUv),y.push(w.sheenRoughnessMapUv),y.push(w.specularMapUv),y.push(w.specularColorMapUv),y.push(w.specularIntensityMapUv),y.push(w.transmissionMapUv),y.push(w.thicknessMapUv),y.push(w.combine),y.push(w.fogExp2),y.push(w.sizeAttenuation),y.push(w.morphTargetsCount),y.push(w.morphAttributeCount),y.push(w.numDirLights),y.push(w.numPointLights),y.push(w.numSpotLights),y.push(w.numSpotLightMaps),y.push(w.numHemiLights),y.push(w.numRectAreaLights),y.push(w.numDirLightShadows),y.push(w.numPointLightShadows),y.push(w.numSpotLightShadows),y.push(w.numSpotLightShadowsWithMaps),y.push(w.numLightProbes),y.push(w.shadowMapType),y.push(w.toneMapping),y.push(w.numClippingPlanes),y.push(w.numClipIntersection),y.push(w.depthPacking)}function x(y,w){r.disableAll(),w.isWebGL2&&r.enable(0),w.supportsVertexTextures&&r.enable(1),w.instancing&&r.enable(2),w.instancingColor&&r.enable(3),w.matcap&&r.enable(4),w.envMap&&r.enable(5),w.normalMapObjectSpace&&r.enable(6),w.normalMapTangentSpace&&r.enable(7),w.clearcoat&&r.enable(8),w.iridescence&&r.enable(9),w.alphaTest&&r.enable(10),w.vertexColors&&r.enable(11),w.vertexAlphas&&r.enable(12),w.vertexUv1s&&r.enable(13),w.vertexUv2s&&r.enable(14),w.vertexUv3s&&r.enable(15),w.vertexTangents&&r.enable(16),w.anisotropy&&r.enable(17),w.alphaHash&&r.enable(18),w.batching&&r.enable(19),y.push(r.mask),r.disableAll(),w.fog&&r.enable(0),w.useFog&&r.enable(1),w.flatShading&&r.enable(2),w.logarithmicDepthBuffer&&r.enable(3),w.skinning&&r.enable(4),w.morphTargets&&r.enable(5),w.morphNormals&&r.enable(6),w.morphColors&&r.enable(7),w.premultipliedAlpha&&r.enable(8),w.shadowMapEnabled&&r.enable(9),w.useLegacyLights&&r.enable(10),w.doubleSided&&r.enable(11),w.flipSided&&r.enable(12),w.useDepthPacking&&r.enable(13),w.dithering&&r.enable(14),w.transmission&&r.enable(15),w.sheen&&r.enable(16),w.opaque&&r.enable(17),w.pointsUvs&&r.enable(18),w.decodeVideoTexture&&r.enable(19),y.push(r.mask)}function b(y){const w=g[y.type];let I;if(w){const z=ni[w];I=sa.clone(z.uniforms)}else I=y.uniforms;return I}function L(y,w){let I;for(let z=0,j=c.length;z<j;z++){const C=c[z];if(C.cacheKey===w){I=C,++I.usedTimes;break}}return I===void 0&&(I=new Hp(s,w,y,o),c.push(I)),I}function T(y){if(--y.usedTimes===0){const w=c.indexOf(y);c[w]=c[c.length-1],c.pop(),y.destroy()}}function _(y){l.remove(y)}function R(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:b,acquireProgram:L,releaseProgram:T,releaseShaderCache:_,programs:c,dispose:R}}function $p(){let s=new WeakMap;function t(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function e(o){s.delete(o)}function i(o,a,r){s.get(o)[a]=r}function n(){s=new WeakMap}return{get:t,remove:e,update:i,dispose:n}}function jp(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function Pr(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Lr(){const s=[];let t=0;const e=[],i=[],n=[];function o(){t=0,e.length=0,i.length=0,n.length=0}function a(d,u,f,g,M,m){let p=s[t];return p===void 0?(p={id:d.id,object:d,geometry:u,material:f,groupOrder:g,renderOrder:d.renderOrder,z:M,group:m},s[t]=p):(p.id=d.id,p.object=d,p.geometry=u,p.material=f,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=M,p.group=m),t++,p}function r(d,u,f,g,M,m){const p=a(d,u,f,g,M,m);f.transmission>0?i.push(p):f.transparent===!0?n.push(p):e.push(p)}function l(d,u,f,g,M,m){const p=a(d,u,f,g,M,m);f.transmission>0?i.unshift(p):f.transparent===!0?n.unshift(p):e.unshift(p)}function c(d,u){e.length>1&&e.sort(d||jp),i.length>1&&i.sort(u||Pr),n.length>1&&n.sort(u||Pr)}function h(){for(let d=t,u=s.length;d<u;d++){const f=s[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:i,transparent:n,init:o,push:r,unshift:l,finish:h,sort:c}}function Zp(){let s=new WeakMap;function t(i,n){const o=s.get(i);let a;return o===void 0?(a=new Lr,s.set(i,[a])):n>=o.length?(a=new Lr,o.push(a)):a=o[n],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function Kp(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new P,color:new te};break;case"SpotLight":e={position:new P,direction:new P,color:new te,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new te,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new te,groundColor:new te};break;case"RectAreaLight":e={color:new te,position:new P,halfWidth:new P,halfHeight:new P};break}return s[t.id]=e,e}}}function Jp(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let Qp=0;function t0(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function e0(s,t){const e=new Kp,i=Jp(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)n.probe.push(new P);const o=new P,a=new se,r=new se;function l(h,d){let u=0,f=0,g=0;for(let z=0;z<9;z++)n.probe[z].set(0,0,0);let M=0,m=0,p=0,A=0,x=0,b=0,L=0,T=0,_=0,R=0,y=0;h.sort(t0);const w=d===!0?Math.PI:1;for(let z=0,j=h.length;z<j;z++){const C=h[z],D=C.color,G=C.intensity,O=C.distance,X=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)u+=D.r*G*w,f+=D.g*G*w,g+=D.b*G*w;else if(C.isLightProbe){for(let J=0;J<9;J++)n.probe[J].addScaledVector(C.sh.coefficients[J],G);y++}else if(C.isDirectionalLight){const J=e.get(C);if(J.color.copy(C.color).multiplyScalar(C.intensity*w),C.castShadow){const ot=C.shadow,lt=i.get(C);lt.shadowBias=ot.bias,lt.shadowNormalBias=ot.normalBias,lt.shadowRadius=ot.radius,lt.shadowMapSize=ot.mapSize,n.directionalShadow[M]=lt,n.directionalShadowMap[M]=X,n.directionalShadowMatrix[M]=C.shadow.matrix,b++}n.directional[M]=J,M++}else if(C.isSpotLight){const J=e.get(C);J.position.setFromMatrixPosition(C.matrixWorld),J.color.copy(D).multiplyScalar(G*w),J.distance=O,J.coneCos=Math.cos(C.angle),J.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),J.decay=C.decay,n.spot[p]=J;const ot=C.shadow;if(C.map&&(n.spotLightMap[_]=C.map,_++,ot.updateMatrices(C),C.castShadow&&R++),n.spotLightMatrix[p]=ot.matrix,C.castShadow){const lt=i.get(C);lt.shadowBias=ot.bias,lt.shadowNormalBias=ot.normalBias,lt.shadowRadius=ot.radius,lt.shadowMapSize=ot.mapSize,n.spotShadow[p]=lt,n.spotShadowMap[p]=X,T++}p++}else if(C.isRectAreaLight){const J=e.get(C);J.color.copy(D).multiplyScalar(G),J.halfWidth.set(C.width*.5,0,0),J.halfHeight.set(0,C.height*.5,0),n.rectArea[A]=J,A++}else if(C.isPointLight){const J=e.get(C);if(J.color.copy(C.color).multiplyScalar(C.intensity*w),J.distance=C.distance,J.decay=C.decay,C.castShadow){const ot=C.shadow,lt=i.get(C);lt.shadowBias=ot.bias,lt.shadowNormalBias=ot.normalBias,lt.shadowRadius=ot.radius,lt.shadowMapSize=ot.mapSize,lt.shadowCameraNear=ot.camera.near,lt.shadowCameraFar=ot.camera.far,n.pointShadow[m]=lt,n.pointShadowMap[m]=X,n.pointShadowMatrix[m]=C.shadow.matrix,L++}n.point[m]=J,m++}else if(C.isHemisphereLight){const J=e.get(C);J.skyColor.copy(C.color).multiplyScalar(G*w),J.groundColor.copy(C.groundColor).multiplyScalar(G*w),n.hemi[x]=J,x++}}A>0&&(t.isWebGL2?s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Dt.LTC_FLOAT_1,n.rectAreaLTC2=Dt.LTC_FLOAT_2):(n.rectAreaLTC1=Dt.LTC_HALF_1,n.rectAreaLTC2=Dt.LTC_HALF_2):s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Dt.LTC_FLOAT_1,n.rectAreaLTC2=Dt.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(n.rectAreaLTC1=Dt.LTC_HALF_1,n.rectAreaLTC2=Dt.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=g;const I=n.hash;(I.directionalLength!==M||I.pointLength!==m||I.spotLength!==p||I.rectAreaLength!==A||I.hemiLength!==x||I.numDirectionalShadows!==b||I.numPointShadows!==L||I.numSpotShadows!==T||I.numSpotMaps!==_||I.numLightProbes!==y)&&(n.directional.length=M,n.spot.length=p,n.rectArea.length=A,n.point.length=m,n.hemi.length=x,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=L,n.pointShadowMap.length=L,n.spotShadow.length=T,n.spotShadowMap.length=T,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=L,n.spotLightMatrix.length=T+_-R,n.spotLightMap.length=_,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=y,I.directionalLength=M,I.pointLength=m,I.spotLength=p,I.rectAreaLength=A,I.hemiLength=x,I.numDirectionalShadows=b,I.numPointShadows=L,I.numSpotShadows=T,I.numSpotMaps=_,I.numLightProbes=y,n.version=Qp++)}function c(h,d){let u=0,f=0,g=0,M=0,m=0;const p=d.matrixWorldInverse;for(let A=0,x=h.length;A<x;A++){const b=h[A];if(b.isDirectionalLight){const L=n.directional[u];L.direction.setFromMatrixPosition(b.matrixWorld),o.setFromMatrixPosition(b.target.matrixWorld),L.direction.sub(o),L.direction.transformDirection(p),u++}else if(b.isSpotLight){const L=n.spot[g];L.position.setFromMatrixPosition(b.matrixWorld),L.position.applyMatrix4(p),L.direction.setFromMatrixPosition(b.matrixWorld),o.setFromMatrixPosition(b.target.matrixWorld),L.direction.sub(o),L.direction.transformDirection(p),g++}else if(b.isRectAreaLight){const L=n.rectArea[M];L.position.setFromMatrixPosition(b.matrixWorld),L.position.applyMatrix4(p),r.identity(),a.copy(b.matrixWorld),a.premultiply(p),r.extractRotation(a),L.halfWidth.set(b.width*.5,0,0),L.halfHeight.set(0,b.height*.5,0),L.halfWidth.applyMatrix4(r),L.halfHeight.applyMatrix4(r),M++}else if(b.isPointLight){const L=n.point[f];L.position.setFromMatrixPosition(b.matrixWorld),L.position.applyMatrix4(p),f++}else if(b.isHemisphereLight){const L=n.hemi[m];L.direction.setFromMatrixPosition(b.matrixWorld),L.direction.transformDirection(p),m++}}}return{setup:l,setupView:c,state:n}}function Ir(s,t){const e=new e0(s,t),i=[],n=[];function o(){i.length=0,n.length=0}function a(d){i.push(d)}function r(d){n.push(d)}function l(d){e.setup(i,d)}function c(d){e.setupView(i,d)}return{init:o,state:{lightsArray:i,shadowsArray:n,lights:e},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:r}}function i0(s,t){let e=new WeakMap;function i(o,a=0){const r=e.get(o);let l;return r===void 0?(l=new Ir(s,t),e.set(o,[l])):a>=r.length?(l=new Ir(s,t),r.push(l)):l=r[a],l}function n(){e=new WeakMap}return{get:i,dispose:n}}class n0 extends Xi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=kc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class s0 extends Xi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const o0=`void main() {
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
}`;function r0(s,t,e){let i=new Tn;const n=new Xt,o=new Xt,a=new he,r=new n0({depthPacking:Vc}),l=new s0,c={},h=e.maxTextureSize,d={[Ci]:ze,[ze]:Ci,[je]:je},u=new oi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Xt},radius:{value:4}},vertexShader:o0,fragmentShader:a0}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const g=new We;g.setAttribute("position",new Ke(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new Q(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=dl;let p=this.type;this.render=function(T,_,R){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const y=s.getRenderTarget(),w=s.getActiveCubeFace(),I=s.getActiveMipmapLevel(),z=s.state;z.setBlending(mi),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const j=p!==fi&&this.type===fi,C=p===fi&&this.type!==fi;for(let D=0,G=T.length;D<G;D++){const O=T[D],X=O.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",O,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;n.copy(X.mapSize);const J=X.getFrameExtents();if(n.multiply(J),o.copy(X.mapSize),(n.x>h||n.y>h)&&(n.x>h&&(o.x=Math.floor(h/J.x),n.x=o.x*J.x,X.mapSize.x=o.x),n.y>h&&(o.y=Math.floor(h/J.y),n.y=o.y*J.y,X.mapSize.y=o.y)),X.map===null||j===!0||C===!0){const lt=this.type!==fi?{minFilter:ge,magFilter:ge}:{};X.map!==null&&X.map.dispose(),X.map=new Ri(n.x,n.y,lt),X.map.texture.name=O.name+".shadowMap",X.camera.updateProjectionMatrix()}s.setRenderTarget(X.map),s.clear();const ot=X.getViewportCount();for(let lt=0;lt<ot;lt++){const ct=X.getViewport(lt);a.set(o.x*ct.x,o.y*ct.y,o.x*ct.z,o.y*ct.w),z.viewport(a),X.updateMatrices(O,lt),i=X.getFrustum(),b(_,R,X.camera,O,this.type)}X.isPointLightShadow!==!0&&this.type===fi&&A(X,R),X.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(y,w,I)};function A(T,_){const R=t.update(M);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Ri(n.x,n.y)),u.uniforms.shadow_pass.value=T.map.texture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,s.setRenderTarget(T.mapPass),s.clear(),s.renderBufferDirect(_,null,R,u,M,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,s.setRenderTarget(T.map),s.clear(),s.renderBufferDirect(_,null,R,f,M,null)}function x(T,_,R,y){let w=null;const I=R.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(I!==void 0)w=I;else if(w=R.isPointLight===!0?l:r,s.localClippingEnabled&&_.clipShadows===!0&&Array.isArray(_.clippingPlanes)&&_.clippingPlanes.length!==0||_.displacementMap&&_.displacementScale!==0||_.alphaMap&&_.alphaTest>0||_.map&&_.alphaTest>0){const z=w.uuid,j=_.uuid;let C=c[z];C===void 0&&(C={},c[z]=C);let D=C[j];D===void 0&&(D=w.clone(),C[j]=D,_.addEventListener("dispose",L)),w=D}if(w.visible=_.visible,w.wireframe=_.wireframe,y===fi?w.side=_.shadowSide!==null?_.shadowSide:_.side:w.side=_.shadowSide!==null?_.shadowSide:d[_.side],w.alphaMap=_.alphaMap,w.alphaTest=_.alphaTest,w.map=_.map,w.clipShadows=_.clipShadows,w.clippingPlanes=_.clippingPlanes,w.clipIntersection=_.clipIntersection,w.displacementMap=_.displacementMap,w.displacementScale=_.displacementScale,w.displacementBias=_.displacementBias,w.wireframeLinewidth=_.wireframeLinewidth,w.linewidth=_.linewidth,R.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const z=s.properties.get(w);z.light=R}return w}function b(T,_,R,y,w){if(T.visible===!1)return;if(T.layers.test(_.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&w===fi)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,T.matrixWorld);const j=t.update(T),C=T.material;if(Array.isArray(C)){const D=j.groups;for(let G=0,O=D.length;G<O;G++){const X=D[G],J=C[X.materialIndex];if(J&&J.visible){const ot=x(T,J,y,w);T.onBeforeShadow(s,T,_,R,j,ot,X),s.renderBufferDirect(R,null,j,ot,T,X),T.onAfterShadow(s,T,_,R,j,ot,X)}}}else if(C.visible){const D=x(T,C,y,w);T.onBeforeShadow(s,T,_,R,j,D,null),s.renderBufferDirect(R,null,j,D,T,null),T.onAfterShadow(s,T,_,R,j,D,null)}}const z=T.children;for(let j=0,C=z.length;j<C;j++)b(z[j],_,R,y,w)}function L(T){T.target.removeEventListener("dispose",L);for(const R in c){const y=c[R],w=T.target.uuid;w in y&&(y[w].dispose(),delete y[w])}}}function l0(s,t,e){const i=e.isWebGL2;function n(){let V=!1;const Et=new he;let bt=null;const Lt=new he(0,0,0,0);return{setMask:function(Gt){bt!==Gt&&!V&&(s.colorMask(Gt,Gt,Gt,Gt),bt=Gt)},setLocked:function(Gt){V=Gt},setClear:function(Gt,qt,Nt,$t,ie){ie===!0&&(Gt*=$t,qt*=$t,Nt*=$t),Et.set(Gt,qt,Nt,$t),Lt.equals(Et)===!1&&(s.clearColor(Gt,qt,Nt,$t),Lt.copy(Et))},reset:function(){V=!1,bt=null,Lt.set(-1,0,0,0)}}}function o(){let V=!1,Et=null,bt=null,Lt=null;return{setTest:function(Gt){Gt?St(s.DEPTH_TEST):yt(s.DEPTH_TEST)},setMask:function(Gt){Et!==Gt&&!V&&(s.depthMask(Gt),Et=Gt)},setFunc:function(Gt){if(bt!==Gt){switch(Gt){case Sc:s.depthFunc(s.NEVER);break;case wc:s.depthFunc(s.ALWAYS);break;case Ec:s.depthFunc(s.LESS);break;case Ls:s.depthFunc(s.LEQUAL);break;case bc:s.depthFunc(s.EQUAL);break;case Tc:s.depthFunc(s.GEQUAL);break;case Ac:s.depthFunc(s.GREATER);break;case Cc:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}bt=Gt}},setLocked:function(Gt){V=Gt},setClear:function(Gt){Lt!==Gt&&(s.clearDepth(Gt),Lt=Gt)},reset:function(){V=!1,Et=null,bt=null,Lt=null}}}function a(){let V=!1,Et=null,bt=null,Lt=null,Gt=null,qt=null,Nt=null,$t=null,ie=null;return{setTest:function(kt){V||(kt?St(s.STENCIL_TEST):yt(s.STENCIL_TEST))},setMask:function(kt){Et!==kt&&!V&&(s.stencilMask(kt),Et=kt)},setFunc:function(kt,re,Be){(bt!==kt||Lt!==re||Gt!==Be)&&(s.stencilFunc(kt,re,Be),bt=kt,Lt=re,Gt=Be)},setOp:function(kt,re,Be){(qt!==kt||Nt!==re||$t!==Be)&&(s.stencilOp(kt,re,Be),qt=kt,Nt=re,$t=Be)},setLocked:function(kt){V=kt},setClear:function(kt){ie!==kt&&(s.clearStencil(kt),ie=kt)},reset:function(){V=!1,Et=null,bt=null,Lt=null,Gt=null,qt=null,Nt=null,$t=null,ie=null}}}const r=new n,l=new o,c=new a,h=new WeakMap,d=new WeakMap;let u={},f={},g=new WeakMap,M=[],m=null,p=!1,A=null,x=null,b=null,L=null,T=null,_=null,R=null,y=new te(0,0,0),w=0,I=!1,z=null,j=null,C=null,D=null,G=null;const O=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,J=0;const ot=s.getParameter(s.VERSION);ot.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(ot)[1]),X=J>=1):ot.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(ot)[1]),X=J>=2);let lt=null,ct={};const K=s.getParameter(s.SCISSOR_BOX),it=s.getParameter(s.VIEWPORT),gt=new he().fromArray(K),Z=new he().fromArray(it);function at(V,Et,bt,Lt){const Gt=new Uint8Array(4),qt=s.createTexture();s.bindTexture(V,qt),s.texParameteri(V,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(V,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Nt=0;Nt<bt;Nt++)i&&(V===s.TEXTURE_3D||V===s.TEXTURE_2D_ARRAY)?s.texImage3D(Et,0,s.RGBA,1,1,Lt,0,s.RGBA,s.UNSIGNED_BYTE,Gt):s.texImage2D(Et+Nt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Gt);return qt}const dt={};dt[s.TEXTURE_2D]=at(s.TEXTURE_2D,s.TEXTURE_2D,1),dt[s.TEXTURE_CUBE_MAP]=at(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(dt[s.TEXTURE_2D_ARRAY]=at(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),dt[s.TEXTURE_3D]=at(s.TEXTURE_3D,s.TEXTURE_3D,1,1)),r.setClear(0,0,0,1),l.setClear(1),c.setClear(0),St(s.DEPTH_TEST),l.setFunc(Ls),k(!1),v(ma),St(s.CULL_FACE),F(mi);function St(V){u[V]!==!0&&(s.enable(V),u[V]=!0)}function yt(V){u[V]!==!1&&(s.disable(V),u[V]=!1)}function Tt(V,Et){return f[V]!==Et?(s.bindFramebuffer(V,Et),f[V]=Et,i&&(V===s.DRAW_FRAMEBUFFER&&(f[s.FRAMEBUFFER]=Et),V===s.FRAMEBUFFER&&(f[s.DRAW_FRAMEBUFFER]=Et)),!0):!1}function B(V,Et){let bt=M,Lt=!1;if(V)if(bt=g.get(Et),bt===void 0&&(bt=[],g.set(Et,bt)),V.isWebGLMultipleRenderTargets){const Gt=V.texture;if(bt.length!==Gt.length||bt[0]!==s.COLOR_ATTACHMENT0){for(let qt=0,Nt=Gt.length;qt<Nt;qt++)bt[qt]=s.COLOR_ATTACHMENT0+qt;bt.length=Gt.length,Lt=!0}}else bt[0]!==s.COLOR_ATTACHMENT0&&(bt[0]=s.COLOR_ATTACHMENT0,Lt=!0);else bt[0]!==s.BACK&&(bt[0]=s.BACK,Lt=!0);Lt&&(e.isWebGL2?s.drawBuffers(bt):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(bt))}function wt(V){return m!==V?(s.useProgram(V),m=V,!0):!1}const S={[Gi]:s.FUNC_ADD,[rc]:s.FUNC_SUBTRACT,[lc]:s.FUNC_REVERSE_SUBTRACT};if(i)S[xa]=s.MIN,S[_a]=s.MAX;else{const V=t.get("EXT_blend_minmax");V!==null&&(S[xa]=V.MIN_EXT,S[_a]=V.MAX_EXT)}const W={[cc]:s.ZERO,[hc]:s.ONE,[dc]:s.SRC_COLOR,[Wo]:s.SRC_ALPHA,[Mc]:s.SRC_ALPHA_SATURATE,[mc]:s.DST_COLOR,[uc]:s.DST_ALPHA,[fc]:s.ONE_MINUS_SRC_COLOR,[Xo]:s.ONE_MINUS_SRC_ALPHA,[gc]:s.ONE_MINUS_DST_COLOR,[pc]:s.ONE_MINUS_DST_ALPHA,[xc]:s.CONSTANT_COLOR,[_c]:s.ONE_MINUS_CONSTANT_COLOR,[yc]:s.CONSTANT_ALPHA,[vc]:s.ONE_MINUS_CONSTANT_ALPHA};function F(V,Et,bt,Lt,Gt,qt,Nt,$t,ie,kt){if(V===mi){p===!0&&(yt(s.BLEND),p=!1);return}if(p===!1&&(St(s.BLEND),p=!0),V!==ac){if(V!==A||kt!==I){if((x!==Gi||T!==Gi)&&(s.blendEquation(s.FUNC_ADD),x=Gi,T=Gi),kt)switch(V){case gn:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case xe:s.blendFunc(s.ONE,s.ONE);break;case ga:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Ma:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}else switch(V){case gn:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case xe:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case ga:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Ma:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}b=null,L=null,_=null,R=null,y.set(0,0,0),w=0,A=V,I=kt}return}Gt=Gt||Et,qt=qt||bt,Nt=Nt||Lt,(Et!==x||Gt!==T)&&(s.blendEquationSeparate(S[Et],S[Gt]),x=Et,T=Gt),(bt!==b||Lt!==L||qt!==_||Nt!==R)&&(s.blendFuncSeparate(W[bt],W[Lt],W[qt],W[Nt]),b=bt,L=Lt,_=qt,R=Nt),($t.equals(y)===!1||ie!==w)&&(s.blendColor($t.r,$t.g,$t.b,ie),y.copy($t),w=ie),A=V,I=!1}function et(V,Et){V.side===je?yt(s.CULL_FACE):St(s.CULL_FACE);let bt=V.side===ze;Et&&(bt=!bt),k(bt),V.blending===gn&&V.transparent===!1?F(mi):F(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),l.setFunc(V.depthFunc),l.setTest(V.depthTest),l.setMask(V.depthWrite),r.setMask(V.colorWrite);const Lt=V.stencilWrite;c.setTest(Lt),Lt&&(c.setMask(V.stencilWriteMask),c.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),c.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),N(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?St(s.SAMPLE_ALPHA_TO_COVERAGE):yt(s.SAMPLE_ALPHA_TO_COVERAGE)}function k(V){z!==V&&(V?s.frontFace(s.CW):s.frontFace(s.CCW),z=V)}function v(V){V!==sc?(St(s.CULL_FACE),V!==j&&(V===ma?s.cullFace(s.BACK):V===oc?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):yt(s.CULL_FACE),j=V}function E(V){V!==C&&(X&&s.lineWidth(V),C=V)}function N(V,Et,bt){V?(St(s.POLYGON_OFFSET_FILL),(D!==Et||G!==bt)&&(s.polygonOffset(Et,bt),D=Et,G=bt)):yt(s.POLYGON_OFFSET_FILL)}function q(V){V?St(s.SCISSOR_TEST):yt(s.SCISSOR_TEST)}function Y(V){V===void 0&&(V=s.TEXTURE0+O-1),lt!==V&&(s.activeTexture(V),lt=V)}function tt(V,Et,bt){bt===void 0&&(lt===null?bt=s.TEXTURE0+O-1:bt=lt);let Lt=ct[bt];Lt===void 0&&(Lt={type:void 0,texture:void 0},ct[bt]=Lt),(Lt.type!==V||Lt.texture!==Et)&&(lt!==bt&&(s.activeTexture(bt),lt=bt),s.bindTexture(V,Et||dt[V]),Lt.type=V,Lt.texture=Et)}function nt(){const V=ct[lt];V!==void 0&&V.type!==void 0&&(s.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function ht(){try{s.compressedTexImage2D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function ft(){try{s.compressedTexImage3D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function vt(){try{s.texSubImage2D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Mt(){try{s.texSubImage3D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function rt(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function It(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function At(){try{s.texStorage2D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Rt(){try{s.texStorage3D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Pt(){try{s.texImage2D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Ct(){try{s.texImage3D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function $(V){gt.equals(V)===!1&&(s.scissor(V.x,V.y,V.z,V.w),gt.copy(V))}function xt(V){Z.equals(V)===!1&&(s.viewport(V.x,V.y,V.z,V.w),Z.copy(V))}function Ft(V,Et){let bt=d.get(Et);bt===void 0&&(bt=new WeakMap,d.set(Et,bt));let Lt=bt.get(V);Lt===void 0&&(Lt=s.getUniformBlockIndex(Et,V.name),bt.set(V,Lt))}function Ut(V,Et){const Lt=d.get(Et).get(V);h.get(Et)!==Lt&&(s.uniformBlockBinding(Et,Lt,V.__bindingPointIndex),h.set(Et,Lt))}function _t(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),i===!0&&(s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),u={},lt=null,ct={},f={},g=new WeakMap,M=[],m=null,p=!1,A=null,x=null,b=null,L=null,T=null,_=null,R=null,y=new te(0,0,0),w=0,I=!1,z=null,j=null,C=null,D=null,G=null,gt.set(0,0,s.canvas.width,s.canvas.height),Z.set(0,0,s.canvas.width,s.canvas.height),r.reset(),l.reset(),c.reset()}return{buffers:{color:r,depth:l,stencil:c},enable:St,disable:yt,bindFramebuffer:Tt,drawBuffers:B,useProgram:wt,setBlending:F,setMaterial:et,setFlipSided:k,setCullFace:v,setLineWidth:E,setPolygonOffset:N,setScissorTest:q,activeTexture:Y,bindTexture:tt,unbindTexture:nt,compressedTexImage2D:ht,compressedTexImage3D:ft,texImage2D:Pt,texImage3D:Ct,updateUBOMapping:Ft,uniformBlockBinding:Ut,texStorage2D:At,texStorage3D:Rt,texSubImage2D:vt,texSubImage3D:Mt,compressedTexSubImage2D:rt,compressedTexSubImage3D:It,scissor:$,viewport:xt,reset:_t}}function c0(s,t,e,i,n,o,a){const r=n.isWebGL2,l=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let d;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(v,E){return f?new OffscreenCanvas(v,E):Gs("canvas")}function M(v,E,N,q){let Y=1;if((v.width>q||v.height>q)&&(Y=q/Math.max(v.width,v.height)),Y<1||E===!0)if(typeof HTMLImageElement<"u"&&v instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&v instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&v instanceof ImageBitmap){const tt=E?Fs:Math.floor,nt=tt(Y*v.width),ht=tt(Y*v.height);d===void 0&&(d=g(nt,ht));const ft=N?g(nt,ht):d;return ft.width=nt,ft.height=ht,ft.getContext("2d").drawImage(v,0,0,nt,ht),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+v.width+"x"+v.height+") to ("+nt+"x"+ht+")."),ft}else return"data"in v&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+v.width+"x"+v.height+")."),v;return v}function m(v){return Zo(v.width)&&Zo(v.height)}function p(v){return r?!1:v.wrapS!==ei||v.wrapT!==ei||v.minFilter!==ge&&v.minFilter!==De}function A(v,E){return v.generateMipmaps&&E&&v.minFilter!==ge&&v.minFilter!==De}function x(v){s.generateMipmap(v)}function b(v,E,N,q,Y=!1){if(r===!1)return E;if(v!==null){if(s[v]!==void 0)return s[v];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+v+"'")}let tt=E;if(E===s.RED&&(N===s.FLOAT&&(tt=s.R32F),N===s.HALF_FLOAT&&(tt=s.R16F),N===s.UNSIGNED_BYTE&&(tt=s.R8)),E===s.RED_INTEGER&&(N===s.UNSIGNED_BYTE&&(tt=s.R8UI),N===s.UNSIGNED_SHORT&&(tt=s.R16UI),N===s.UNSIGNED_INT&&(tt=s.R32UI),N===s.BYTE&&(tt=s.R8I),N===s.SHORT&&(tt=s.R16I),N===s.INT&&(tt=s.R32I)),E===s.RG&&(N===s.FLOAT&&(tt=s.RG32F),N===s.HALF_FLOAT&&(tt=s.RG16F),N===s.UNSIGNED_BYTE&&(tt=s.RG8)),E===s.RGBA){const nt=Y?Ds:ne.getTransfer(q);N===s.FLOAT&&(tt=s.RGBA32F),N===s.HALF_FLOAT&&(tt=s.RGBA16F),N===s.UNSIGNED_BYTE&&(tt=nt===le?s.SRGB8_ALPHA8:s.RGBA8),N===s.UNSIGNED_SHORT_4_4_4_4&&(tt=s.RGBA4),N===s.UNSIGNED_SHORT_5_5_5_1&&(tt=s.RGB5_A1)}return(tt===s.R16F||tt===s.R32F||tt===s.RG16F||tt===s.RG32F||tt===s.RGBA16F||tt===s.RGBA32F)&&t.get("EXT_color_buffer_float"),tt}function L(v,E,N){return A(v,N)===!0||v.isFramebufferTexture&&v.minFilter!==ge&&v.minFilter!==De?Math.log2(Math.max(E.width,E.height))+1:v.mipmaps!==void 0&&v.mipmaps.length>0?v.mipmaps.length:v.isCompressedTexture&&Array.isArray(v.image)?E.mipmaps.length:1}function T(v){return v===ge||v===ya||v===$s?s.NEAREST:s.LINEAR}function _(v){const E=v.target;E.removeEventListener("dispose",_),y(E),E.isVideoTexture&&h.delete(E)}function R(v){const E=v.target;E.removeEventListener("dispose",R),I(E)}function y(v){const E=i.get(v);if(E.__webglInit===void 0)return;const N=v.source,q=u.get(N);if(q){const Y=q[E.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&w(v),Object.keys(q).length===0&&u.delete(N)}i.remove(v)}function w(v){const E=i.get(v);s.deleteTexture(E.__webglTexture);const N=v.source,q=u.get(N);delete q[E.__cacheKey],a.memory.textures--}function I(v){const E=v.texture,N=i.get(v),q=i.get(E);if(q.__webglTexture!==void 0&&(s.deleteTexture(q.__webglTexture),a.memory.textures--),v.depthTexture&&v.depthTexture.dispose(),v.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(N.__webglFramebuffer[Y]))for(let tt=0;tt<N.__webglFramebuffer[Y].length;tt++)s.deleteFramebuffer(N.__webglFramebuffer[Y][tt]);else s.deleteFramebuffer(N.__webglFramebuffer[Y]);N.__webglDepthbuffer&&s.deleteRenderbuffer(N.__webglDepthbuffer[Y])}else{if(Array.isArray(N.__webglFramebuffer))for(let Y=0;Y<N.__webglFramebuffer.length;Y++)s.deleteFramebuffer(N.__webglFramebuffer[Y]);else s.deleteFramebuffer(N.__webglFramebuffer);if(N.__webglDepthbuffer&&s.deleteRenderbuffer(N.__webglDepthbuffer),N.__webglMultisampledFramebuffer&&s.deleteFramebuffer(N.__webglMultisampledFramebuffer),N.__webglColorRenderbuffer)for(let Y=0;Y<N.__webglColorRenderbuffer.length;Y++)N.__webglColorRenderbuffer[Y]&&s.deleteRenderbuffer(N.__webglColorRenderbuffer[Y]);N.__webglDepthRenderbuffer&&s.deleteRenderbuffer(N.__webglDepthRenderbuffer)}if(v.isWebGLMultipleRenderTargets)for(let Y=0,tt=E.length;Y<tt;Y++){const nt=i.get(E[Y]);nt.__webglTexture&&(s.deleteTexture(nt.__webglTexture),a.memory.textures--),i.remove(E[Y])}i.remove(E),i.remove(v)}let z=0;function j(){z=0}function C(){const v=z;return v>=n.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+v+" texture units while this GPU supports only "+n.maxTextures),z+=1,v}function D(v){const E=[];return E.push(v.wrapS),E.push(v.wrapT),E.push(v.wrapR||0),E.push(v.magFilter),E.push(v.minFilter),E.push(v.anisotropy),E.push(v.internalFormat),E.push(v.format),E.push(v.type),E.push(v.generateMipmaps),E.push(v.premultiplyAlpha),E.push(v.flipY),E.push(v.unpackAlignment),E.push(v.colorSpace),E.join()}function G(v,E){const N=i.get(v);if(v.isVideoTexture&&et(v),v.isRenderTargetTexture===!1&&v.version>0&&N.__version!==v.version){const q=v.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{gt(N,v,E);return}}e.bindTexture(s.TEXTURE_2D,N.__webglTexture,s.TEXTURE0+E)}function O(v,E){const N=i.get(v);if(v.version>0&&N.__version!==v.version){gt(N,v,E);return}e.bindTexture(s.TEXTURE_2D_ARRAY,N.__webglTexture,s.TEXTURE0+E)}function X(v,E){const N=i.get(v);if(v.version>0&&N.__version!==v.version){gt(N,v,E);return}e.bindTexture(s.TEXTURE_3D,N.__webglTexture,s.TEXTURE0+E)}function J(v,E){const N=i.get(v);if(v.version>0&&N.__version!==v.version){Z(N,v,E);return}e.bindTexture(s.TEXTURE_CUBE_MAP,N.__webglTexture,s.TEXTURE0+E)}const ot={[Ve]:s.REPEAT,[ei]:s.CLAMP_TO_EDGE,[Yo]:s.MIRRORED_REPEAT},lt={[ge]:s.NEAREST,[ya]:s.NEAREST_MIPMAP_NEAREST,[$s]:s.NEAREST_MIPMAP_LINEAR,[De]:s.LINEAR,[Ic]:s.LINEAR_MIPMAP_NEAREST,[yn]:s.LINEAR_MIPMAP_LINEAR},ct={[Wc]:s.NEVER,[Zc]:s.ALWAYS,[Xc]:s.LESS,[Cl]:s.LEQUAL,[qc]:s.EQUAL,[jc]:s.GEQUAL,[Yc]:s.GREATER,[$c]:s.NOTEQUAL};function K(v,E,N){if(N?(s.texParameteri(v,s.TEXTURE_WRAP_S,ot[E.wrapS]),s.texParameteri(v,s.TEXTURE_WRAP_T,ot[E.wrapT]),(v===s.TEXTURE_3D||v===s.TEXTURE_2D_ARRAY)&&s.texParameteri(v,s.TEXTURE_WRAP_R,ot[E.wrapR]),s.texParameteri(v,s.TEXTURE_MAG_FILTER,lt[E.magFilter]),s.texParameteri(v,s.TEXTURE_MIN_FILTER,lt[E.minFilter])):(s.texParameteri(v,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(v,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),(v===s.TEXTURE_3D||v===s.TEXTURE_2D_ARRAY)&&s.texParameteri(v,s.TEXTURE_WRAP_R,s.CLAMP_TO_EDGE),(E.wrapS!==ei||E.wrapT!==ei)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(v,s.TEXTURE_MAG_FILTER,T(E.magFilter)),s.texParameteri(v,s.TEXTURE_MIN_FILTER,T(E.minFilter)),E.minFilter!==ge&&E.minFilter!==De&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),E.compareFunction&&(s.texParameteri(v,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(v,s.TEXTURE_COMPARE_FUNC,ct[E.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){const q=t.get("EXT_texture_filter_anisotropic");if(E.magFilter===ge||E.minFilter!==$s&&E.minFilter!==yn||E.type===Ei&&t.has("OES_texture_float_linear")===!1||r===!1&&E.type===vn&&t.has("OES_texture_half_float_linear")===!1)return;(E.anisotropy>1||i.get(E).__currentAnisotropy)&&(s.texParameterf(v,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,n.getMaxAnisotropy())),i.get(E).__currentAnisotropy=E.anisotropy)}}function it(v,E){let N=!1;v.__webglInit===void 0&&(v.__webglInit=!0,E.addEventListener("dispose",_));const q=E.source;let Y=u.get(q);Y===void 0&&(Y={},u.set(q,Y));const tt=D(E);if(tt!==v.__cacheKey){Y[tt]===void 0&&(Y[tt]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,N=!0),Y[tt].usedTimes++;const nt=Y[v.__cacheKey];nt!==void 0&&(Y[v.__cacheKey].usedTimes--,nt.usedTimes===0&&w(E)),v.__cacheKey=tt,v.__webglTexture=Y[tt].texture}return N}function gt(v,E,N){let q=s.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(q=s.TEXTURE_2D_ARRAY),E.isData3DTexture&&(q=s.TEXTURE_3D);const Y=it(v,E),tt=E.source;e.bindTexture(q,v.__webglTexture,s.TEXTURE0+N);const nt=i.get(tt);if(tt.version!==nt.__version||Y===!0){e.activeTexture(s.TEXTURE0+N);const ht=ne.getPrimaries(ne.workingColorSpace),ft=E.colorSpace===Ze?null:ne.getPrimaries(E.colorSpace),vt=E.colorSpace===Ze||ht===ft?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt);const Mt=p(E)&&m(E.image)===!1;let rt=M(E.image,Mt,!1,n.maxTextureSize);rt=k(E,rt);const It=m(rt)||r,At=o.convert(E.format,E.colorSpace);let Rt=o.convert(E.type),Pt=b(E.internalFormat,At,Rt,E.colorSpace,E.isVideoTexture);K(q,E,It);let Ct;const $=E.mipmaps,xt=r&&E.isVideoTexture!==!0&&Pt!==bl,Ft=nt.__version===void 0||Y===!0,Ut=L(E,rt,It);if(E.isDepthTexture)Pt=s.DEPTH_COMPONENT,r?E.type===Ei?Pt=s.DEPTH_COMPONENT32F:E.type===wi?Pt=s.DEPTH_COMPONENT24:E.type===ki?Pt=s.DEPTH24_STENCIL8:Pt=s.DEPTH_COMPONENT16:E.type===Ei&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),E.format===Vi&&Pt===s.DEPTH_COMPONENT&&E.type!==ea&&E.type!==wi&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),E.type=wi,Rt=o.convert(E.type)),E.format===Sn&&Pt===s.DEPTH_COMPONENT&&(Pt=s.DEPTH_STENCIL,E.type!==ki&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),E.type=ki,Rt=o.convert(E.type))),Ft&&(xt?e.texStorage2D(s.TEXTURE_2D,1,Pt,rt.width,rt.height):e.texImage2D(s.TEXTURE_2D,0,Pt,rt.width,rt.height,0,At,Rt,null));else if(E.isDataTexture)if($.length>0&&It){xt&&Ft&&e.texStorage2D(s.TEXTURE_2D,Ut,Pt,$[0].width,$[0].height);for(let _t=0,V=$.length;_t<V;_t++)Ct=$[_t],xt?e.texSubImage2D(s.TEXTURE_2D,_t,0,0,Ct.width,Ct.height,At,Rt,Ct.data):e.texImage2D(s.TEXTURE_2D,_t,Pt,Ct.width,Ct.height,0,At,Rt,Ct.data);E.generateMipmaps=!1}else xt?(Ft&&e.texStorage2D(s.TEXTURE_2D,Ut,Pt,rt.width,rt.height),e.texSubImage2D(s.TEXTURE_2D,0,0,0,rt.width,rt.height,At,Rt,rt.data)):e.texImage2D(s.TEXTURE_2D,0,Pt,rt.width,rt.height,0,At,Rt,rt.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){xt&&Ft&&e.texStorage3D(s.TEXTURE_2D_ARRAY,Ut,Pt,$[0].width,$[0].height,rt.depth);for(let _t=0,V=$.length;_t<V;_t++)Ct=$[_t],E.format!==ii?At!==null?xt?e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,_t,0,0,0,Ct.width,Ct.height,rt.depth,At,Ct.data,0,0):e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,_t,Pt,Ct.width,Ct.height,rt.depth,0,Ct.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):xt?e.texSubImage3D(s.TEXTURE_2D_ARRAY,_t,0,0,0,Ct.width,Ct.height,rt.depth,At,Rt,Ct.data):e.texImage3D(s.TEXTURE_2D_ARRAY,_t,Pt,Ct.width,Ct.height,rt.depth,0,At,Rt,Ct.data)}else{xt&&Ft&&e.texStorage2D(s.TEXTURE_2D,Ut,Pt,$[0].width,$[0].height);for(let _t=0,V=$.length;_t<V;_t++)Ct=$[_t],E.format!==ii?At!==null?xt?e.compressedTexSubImage2D(s.TEXTURE_2D,_t,0,0,Ct.width,Ct.height,At,Ct.data):e.compressedTexImage2D(s.TEXTURE_2D,_t,Pt,Ct.width,Ct.height,0,Ct.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):xt?e.texSubImage2D(s.TEXTURE_2D,_t,0,0,Ct.width,Ct.height,At,Rt,Ct.data):e.texImage2D(s.TEXTURE_2D,_t,Pt,Ct.width,Ct.height,0,At,Rt,Ct.data)}else if(E.isDataArrayTexture)xt?(Ft&&e.texStorage3D(s.TEXTURE_2D_ARRAY,Ut,Pt,rt.width,rt.height,rt.depth),e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,rt.width,rt.height,rt.depth,At,Rt,rt.data)):e.texImage3D(s.TEXTURE_2D_ARRAY,0,Pt,rt.width,rt.height,rt.depth,0,At,Rt,rt.data);else if(E.isData3DTexture)xt?(Ft&&e.texStorage3D(s.TEXTURE_3D,Ut,Pt,rt.width,rt.height,rt.depth),e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,rt.width,rt.height,rt.depth,At,Rt,rt.data)):e.texImage3D(s.TEXTURE_3D,0,Pt,rt.width,rt.height,rt.depth,0,At,Rt,rt.data);else if(E.isFramebufferTexture){if(Ft)if(xt)e.texStorage2D(s.TEXTURE_2D,Ut,Pt,rt.width,rt.height);else{let _t=rt.width,V=rt.height;for(let Et=0;Et<Ut;Et++)e.texImage2D(s.TEXTURE_2D,Et,Pt,_t,V,0,At,Rt,null),_t>>=1,V>>=1}}else if($.length>0&&It){xt&&Ft&&e.texStorage2D(s.TEXTURE_2D,Ut,Pt,$[0].width,$[0].height);for(let _t=0,V=$.length;_t<V;_t++)Ct=$[_t],xt?e.texSubImage2D(s.TEXTURE_2D,_t,0,0,At,Rt,Ct):e.texImage2D(s.TEXTURE_2D,_t,Pt,At,Rt,Ct);E.generateMipmaps=!1}else xt?(Ft&&e.texStorage2D(s.TEXTURE_2D,Ut,Pt,rt.width,rt.height),e.texSubImage2D(s.TEXTURE_2D,0,0,0,At,Rt,rt)):e.texImage2D(s.TEXTURE_2D,0,Pt,At,Rt,rt);A(E,It)&&x(q),nt.__version=tt.version,E.onUpdate&&E.onUpdate(E)}v.__version=E.version}function Z(v,E,N){if(E.image.length!==6)return;const q=it(v,E),Y=E.source;e.bindTexture(s.TEXTURE_CUBE_MAP,v.__webglTexture,s.TEXTURE0+N);const tt=i.get(Y);if(Y.version!==tt.__version||q===!0){e.activeTexture(s.TEXTURE0+N);const nt=ne.getPrimaries(ne.workingColorSpace),ht=E.colorSpace===Ze?null:ne.getPrimaries(E.colorSpace),ft=E.colorSpace===Ze||nt===ht?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ft);const vt=E.isCompressedTexture||E.image[0].isCompressedTexture,Mt=E.image[0]&&E.image[0].isDataTexture,rt=[];for(let _t=0;_t<6;_t++)!vt&&!Mt?rt[_t]=M(E.image[_t],!1,!0,n.maxCubemapSize):rt[_t]=Mt?E.image[_t].image:E.image[_t],rt[_t]=k(E,rt[_t]);const It=rt[0],At=m(It)||r,Rt=o.convert(E.format,E.colorSpace),Pt=o.convert(E.type),Ct=b(E.internalFormat,Rt,Pt,E.colorSpace),$=r&&E.isVideoTexture!==!0,xt=tt.__version===void 0||q===!0;let Ft=L(E,It,At);K(s.TEXTURE_CUBE_MAP,E,At);let Ut;if(vt){$&&xt&&e.texStorage2D(s.TEXTURE_CUBE_MAP,Ft,Ct,It.width,It.height);for(let _t=0;_t<6;_t++){Ut=rt[_t].mipmaps;for(let V=0;V<Ut.length;V++){const Et=Ut[V];E.format!==ii?Rt!==null?$?e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,V,0,0,Et.width,Et.height,Rt,Et.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,V,Ct,Et.width,Et.height,0,Et.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):$?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,V,0,0,Et.width,Et.height,Rt,Pt,Et.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,V,Ct,Et.width,Et.height,0,Rt,Pt,Et.data)}}}else{Ut=E.mipmaps,$&&xt&&(Ut.length>0&&Ft++,e.texStorage2D(s.TEXTURE_CUBE_MAP,Ft,Ct,rt[0].width,rt[0].height));for(let _t=0;_t<6;_t++)if(Mt){$?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,0,0,rt[_t].width,rt[_t].height,Rt,Pt,rt[_t].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,Ct,rt[_t].width,rt[_t].height,0,Rt,Pt,rt[_t].data);for(let V=0;V<Ut.length;V++){const bt=Ut[V].image[_t].image;$?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,V+1,0,0,bt.width,bt.height,Rt,Pt,bt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,V+1,Ct,bt.width,bt.height,0,Rt,Pt,bt.data)}}else{$?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,0,0,Rt,Pt,rt[_t]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,Ct,Rt,Pt,rt[_t]);for(let V=0;V<Ut.length;V++){const Et=Ut[V];$?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,V+1,0,0,Rt,Pt,Et.image[_t]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,V+1,Ct,Rt,Pt,Et.image[_t])}}}A(E,At)&&x(s.TEXTURE_CUBE_MAP),tt.__version=Y.version,E.onUpdate&&E.onUpdate(E)}v.__version=E.version}function at(v,E,N,q,Y,tt){const nt=o.convert(N.format,N.colorSpace),ht=o.convert(N.type),ft=b(N.internalFormat,nt,ht,N.colorSpace);if(!i.get(E).__hasExternalTextures){const Mt=Math.max(1,E.width>>tt),rt=Math.max(1,E.height>>tt);Y===s.TEXTURE_3D||Y===s.TEXTURE_2D_ARRAY?e.texImage3D(Y,tt,ft,Mt,rt,E.depth,0,nt,ht,null):e.texImage2D(Y,tt,ft,Mt,rt,0,nt,ht,null)}e.bindFramebuffer(s.FRAMEBUFFER,v),F(E)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,q,Y,i.get(N).__webglTexture,0,W(E)):(Y===s.TEXTURE_2D||Y>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,q,Y,i.get(N).__webglTexture,tt),e.bindFramebuffer(s.FRAMEBUFFER,null)}function dt(v,E,N){if(s.bindRenderbuffer(s.RENDERBUFFER,v),E.depthBuffer&&!E.stencilBuffer){let q=r===!0?s.DEPTH_COMPONENT24:s.DEPTH_COMPONENT16;if(N||F(E)){const Y=E.depthTexture;Y&&Y.isDepthTexture&&(Y.type===Ei?q=s.DEPTH_COMPONENT32F:Y.type===wi&&(q=s.DEPTH_COMPONENT24));const tt=W(E);F(E)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,tt,q,E.width,E.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,tt,q,E.width,E.height)}else s.renderbufferStorage(s.RENDERBUFFER,q,E.width,E.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,v)}else if(E.depthBuffer&&E.stencilBuffer){const q=W(E);N&&F(E)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,q,s.DEPTH24_STENCIL8,E.width,E.height):F(E)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,q,s.DEPTH24_STENCIL8,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,E.width,E.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,v)}else{const q=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let Y=0;Y<q.length;Y++){const tt=q[Y],nt=o.convert(tt.format,tt.colorSpace),ht=o.convert(tt.type),ft=b(tt.internalFormat,nt,ht,tt.colorSpace),vt=W(E);N&&F(E)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,vt,ft,E.width,E.height):F(E)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,vt,ft,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,ft,E.width,E.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function St(v,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,v),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(E.depthTexture).__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),G(E.depthTexture,0);const q=i.get(E.depthTexture).__webglTexture,Y=W(E);if(E.depthTexture.format===Vi)F(E)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,q,0,Y):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,q,0);else if(E.depthTexture.format===Sn)F(E)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,q,0,Y):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,q,0);else throw new Error("Unknown depthTexture format")}function yt(v){const E=i.get(v),N=v.isWebGLCubeRenderTarget===!0;if(v.depthTexture&&!E.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");St(E.__webglFramebuffer,v)}else if(N){E.__webglDepthbuffer=[];for(let q=0;q<6;q++)e.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer[q]),E.__webglDepthbuffer[q]=s.createRenderbuffer(),dt(E.__webglDepthbuffer[q],v,!1)}else e.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer=s.createRenderbuffer(),dt(E.__webglDepthbuffer,v,!1);e.bindFramebuffer(s.FRAMEBUFFER,null)}function Tt(v,E,N){const q=i.get(v);E!==void 0&&at(q.__webglFramebuffer,v,v.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),N!==void 0&&yt(v)}function B(v){const E=v.texture,N=i.get(v),q=i.get(E);v.addEventListener("dispose",R),v.isWebGLMultipleRenderTargets!==!0&&(q.__webglTexture===void 0&&(q.__webglTexture=s.createTexture()),q.__version=E.version,a.memory.textures++);const Y=v.isWebGLCubeRenderTarget===!0,tt=v.isWebGLMultipleRenderTargets===!0,nt=m(v)||r;if(Y){N.__webglFramebuffer=[];for(let ht=0;ht<6;ht++)if(r&&E.mipmaps&&E.mipmaps.length>0){N.__webglFramebuffer[ht]=[];for(let ft=0;ft<E.mipmaps.length;ft++)N.__webglFramebuffer[ht][ft]=s.createFramebuffer()}else N.__webglFramebuffer[ht]=s.createFramebuffer()}else{if(r&&E.mipmaps&&E.mipmaps.length>0){N.__webglFramebuffer=[];for(let ht=0;ht<E.mipmaps.length;ht++)N.__webglFramebuffer[ht]=s.createFramebuffer()}else N.__webglFramebuffer=s.createFramebuffer();if(tt)if(n.drawBuffers){const ht=v.texture;for(let ft=0,vt=ht.length;ft<vt;ft++){const Mt=i.get(ht[ft]);Mt.__webglTexture===void 0&&(Mt.__webglTexture=s.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(r&&v.samples>0&&F(v)===!1){const ht=tt?E:[E];N.__webglMultisampledFramebuffer=s.createFramebuffer(),N.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let ft=0;ft<ht.length;ft++){const vt=ht[ft];N.__webglColorRenderbuffer[ft]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,N.__webglColorRenderbuffer[ft]);const Mt=o.convert(vt.format,vt.colorSpace),rt=o.convert(vt.type),It=b(vt.internalFormat,Mt,rt,vt.colorSpace,v.isXRRenderTarget===!0),At=W(v);s.renderbufferStorageMultisample(s.RENDERBUFFER,At,It,v.width,v.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ft,s.RENDERBUFFER,N.__webglColorRenderbuffer[ft])}s.bindRenderbuffer(s.RENDERBUFFER,null),v.depthBuffer&&(N.__webglDepthRenderbuffer=s.createRenderbuffer(),dt(N.__webglDepthRenderbuffer,v,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(Y){e.bindTexture(s.TEXTURE_CUBE_MAP,q.__webglTexture),K(s.TEXTURE_CUBE_MAP,E,nt);for(let ht=0;ht<6;ht++)if(r&&E.mipmaps&&E.mipmaps.length>0)for(let ft=0;ft<E.mipmaps.length;ft++)at(N.__webglFramebuffer[ht][ft],v,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,ft);else at(N.__webglFramebuffer[ht],v,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0);A(E,nt)&&x(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(tt){const ht=v.texture;for(let ft=0,vt=ht.length;ft<vt;ft++){const Mt=ht[ft],rt=i.get(Mt);e.bindTexture(s.TEXTURE_2D,rt.__webglTexture),K(s.TEXTURE_2D,Mt,nt),at(N.__webglFramebuffer,v,Mt,s.COLOR_ATTACHMENT0+ft,s.TEXTURE_2D,0),A(Mt,nt)&&x(s.TEXTURE_2D)}e.unbindTexture()}else{let ht=s.TEXTURE_2D;if((v.isWebGL3DRenderTarget||v.isWebGLArrayRenderTarget)&&(r?ht=v.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(ht,q.__webglTexture),K(ht,E,nt),r&&E.mipmaps&&E.mipmaps.length>0)for(let ft=0;ft<E.mipmaps.length;ft++)at(N.__webglFramebuffer[ft],v,E,s.COLOR_ATTACHMENT0,ht,ft);else at(N.__webglFramebuffer,v,E,s.COLOR_ATTACHMENT0,ht,0);A(E,nt)&&x(ht),e.unbindTexture()}v.depthBuffer&&yt(v)}function wt(v){const E=m(v)||r,N=v.isWebGLMultipleRenderTargets===!0?v.texture:[v.texture];for(let q=0,Y=N.length;q<Y;q++){const tt=N[q];if(A(tt,E)){const nt=v.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,ht=i.get(tt).__webglTexture;e.bindTexture(nt,ht),x(nt),e.unbindTexture()}}}function S(v){if(r&&v.samples>0&&F(v)===!1){const E=v.isWebGLMultipleRenderTargets?v.texture:[v.texture],N=v.width,q=v.height;let Y=s.COLOR_BUFFER_BIT;const tt=[],nt=v.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ht=i.get(v),ft=v.isWebGLMultipleRenderTargets===!0;if(ft)for(let vt=0;vt<E.length;vt++)e.bindFramebuffer(s.FRAMEBUFFER,ht.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+vt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,ht.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+vt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,ht.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,ht.__webglFramebuffer);for(let vt=0;vt<E.length;vt++){tt.push(s.COLOR_ATTACHMENT0+vt),v.depthBuffer&&tt.push(nt);const Mt=ht.__ignoreDepthValues!==void 0?ht.__ignoreDepthValues:!1;if(Mt===!1&&(v.depthBuffer&&(Y|=s.DEPTH_BUFFER_BIT),v.stencilBuffer&&(Y|=s.STENCIL_BUFFER_BIT)),ft&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,ht.__webglColorRenderbuffer[vt]),Mt===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[nt]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[nt])),ft){const rt=i.get(E[vt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,rt,0)}s.blitFramebuffer(0,0,N,q,0,0,N,q,Y,s.NEAREST),c&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,tt)}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ft)for(let vt=0;vt<E.length;vt++){e.bindFramebuffer(s.FRAMEBUFFER,ht.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+vt,s.RENDERBUFFER,ht.__webglColorRenderbuffer[vt]);const Mt=i.get(E[vt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,ht.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+vt,s.TEXTURE_2D,Mt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,ht.__webglMultisampledFramebuffer)}}function W(v){return Math.min(n.maxSamples,v.samples)}function F(v){const E=i.get(v);return r&&v.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function et(v){const E=a.render.frame;h.get(v)!==E&&(h.set(v,E),v.update())}function k(v,E){const N=v.colorSpace,q=v.format,Y=v.type;return v.isCompressedTexture===!0||v.isVideoTexture===!0||v.format===jo||N!==Mi&&N!==Ze&&(ne.getTransfer(N)===le?r===!1?t.has("EXT_sRGB")===!0&&q===ii?(v.format=jo,v.minFilter=De,v.generateMipmaps=!1):E=Pl.sRGBToLinear(E):(q!==ii||Y!==Ai)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),E}this.allocateTextureUnit=C,this.resetTextureUnits=j,this.setTexture2D=G,this.setTexture2DArray=O,this.setTexture3D=X,this.setTextureCube=J,this.rebindTextures=Tt,this.setupRenderTarget=B,this.updateRenderTargetMipmap=wt,this.updateMultisampleRenderTarget=S,this.setupDepthRenderbuffer=yt,this.setupFrameBufferTexture=at,this.useMultisampledRTT=F}function h0(s,t,e){const i=e.isWebGL2;function n(o,a=Ze){let r;const l=ne.getTransfer(a);if(o===Ai)return s.UNSIGNED_BYTE;if(o===yl)return s.UNSIGNED_SHORT_4_4_4_4;if(o===vl)return s.UNSIGNED_SHORT_5_5_5_1;if(o===Dc)return s.BYTE;if(o===Uc)return s.SHORT;if(o===ea)return s.UNSIGNED_SHORT;if(o===_l)return s.INT;if(o===wi)return s.UNSIGNED_INT;if(o===Ei)return s.FLOAT;if(o===vn)return i?s.HALF_FLOAT:(r=t.get("OES_texture_half_float"),r!==null?r.HALF_FLOAT_OES:null);if(o===Nc)return s.ALPHA;if(o===ii)return s.RGBA;if(o===zc)return s.LUMINANCE;if(o===Fc)return s.LUMINANCE_ALPHA;if(o===Vi)return s.DEPTH_COMPONENT;if(o===Sn)return s.DEPTH_STENCIL;if(o===jo)return r=t.get("EXT_sRGB"),r!==null?r.SRGB_ALPHA_EXT:null;if(o===Bc)return s.RED;if(o===Sl)return s.RED_INTEGER;if(o===Gc)return s.RG;if(o===wl)return s.RG_INTEGER;if(o===El)return s.RGBA_INTEGER;if(o===js||o===Zs||o===Ks||o===Js)if(l===le)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(o===js)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(o===Zs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(o===Ks)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(o===Js)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(o===js)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(o===Zs)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(o===Ks)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(o===Js)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(o===va||o===Sa||o===wa||o===Ea)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(o===va)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(o===Sa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(o===wa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(o===Ea)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(o===bl)return r=t.get("WEBGL_compressed_texture_etc1"),r!==null?r.COMPRESSED_RGB_ETC1_WEBGL:null;if(o===ba||o===Ta)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(o===ba)return l===le?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(o===Ta)return l===le?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(o===Aa||o===Ca||o===Ra||o===Pa||o===La||o===Ia||o===Da||o===Ua||o===Na||o===za||o===Fa||o===Ba||o===Ga||o===Oa)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(o===Aa)return l===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(o===Ca)return l===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(o===Ra)return l===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(o===Pa)return l===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(o===La)return l===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(o===Ia)return l===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(o===Da)return l===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(o===Ua)return l===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(o===Na)return l===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(o===za)return l===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(o===Fa)return l===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(o===Ba)return l===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(o===Ga)return l===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(o===Oa)return l===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(o===Qs||o===ka||o===Va)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(o===Qs)return l===le?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(o===ka)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(o===Va)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(o===Oc||o===Ha||o===Wa||o===Xa)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(o===Qs)return r.COMPRESSED_RED_RGTC1_EXT;if(o===Ha)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(o===Wa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(o===Xa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return o===ki?i?s.UNSIGNED_INT_24_8:(r=t.get("WEBGL_depth_texture"),r!==null?r.UNSIGNED_INT_24_8_WEBGL:null):s[o]!==void 0?s[o]:null}return{convert:n}}class d0 extends Ue{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Vt extends ce{constructor(){super(),this.isGroup=!0,this.type="Group"}}const f0={type:"move"};class wo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Vt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Vt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Vt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let n=null,o=null,a=null;const r=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const M of t.hand.values()){const m=e.getJointPose(M,i),p=this._getHandJoint(c,M);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(o=e.getPose(t.gripSpace,i),o!==null&&(l.matrix.fromArray(o.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,o.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(o.linearVelocity)):l.hasLinearVelocity=!1,o.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(o.angularVelocity)):l.hasAngularVelocity=!1));r!==null&&(n=e.getPose(t.targetRaySpace,i),n===null&&o!==null&&(n=o),n!==null&&(r.matrix.fromArray(n.transform.matrix),r.matrix.decompose(r.position,r.rotation,r.scale),r.matrixWorldNeedsUpdate=!0,n.linearVelocity?(r.hasLinearVelocity=!0,r.linearVelocity.copy(n.linearVelocity)):r.hasLinearVelocity=!1,n.angularVelocity?(r.hasAngularVelocity=!0,r.angularVelocity.copy(n.angularVelocity)):r.hasAngularVelocity=!1,this.dispatchEvent(f0)))}return r!==null&&(r.visible=n!==null),l!==null&&(l.visible=o!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Vt;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}class u0 extends bn{constructor(t,e){super();const i=this;let n=null,o=1,a=null,r="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,g=null;const M=e.getContextAttributes();let m=null,p=null;const A=[],x=[],b=new Xt;let L=null;const T=new Ue;T.layers.enable(1),T.viewport=new he;const _=new Ue;_.layers.enable(2),_.viewport=new he;const R=[T,_],y=new d0;y.layers.enable(1),y.layers.enable(2);let w=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let it=A[K];return it===void 0&&(it=new wo,A[K]=it),it.getTargetRaySpace()},this.getControllerGrip=function(K){let it=A[K];return it===void 0&&(it=new wo,A[K]=it),it.getGripSpace()},this.getHand=function(K){let it=A[K];return it===void 0&&(it=new wo,A[K]=it),it.getHandSpace()};function z(K){const it=x.indexOf(K.inputSource);if(it===-1)return;const gt=A[it];gt!==void 0&&(gt.update(K.inputSource,K.frame,c||a),gt.dispatchEvent({type:K.type,data:K.inputSource}))}function j(){n.removeEventListener("select",z),n.removeEventListener("selectstart",z),n.removeEventListener("selectend",z),n.removeEventListener("squeeze",z),n.removeEventListener("squeezestart",z),n.removeEventListener("squeezeend",z),n.removeEventListener("end",j),n.removeEventListener("inputsourceschange",C);for(let K=0;K<A.length;K++){const it=x[K];it!==null&&(x[K]=null,A[K].disconnect(it))}w=null,I=null,t.setRenderTarget(m),f=null,u=null,d=null,n=null,p=null,ct.stop(),i.isPresenting=!1,t.setPixelRatio(L),t.setSize(b.width,b.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){o=K,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){r=K,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return n},this.setSession=async function(K){if(n=K,n!==null){if(m=t.getRenderTarget(),n.addEventListener("select",z),n.addEventListener("selectstart",z),n.addEventListener("selectend",z),n.addEventListener("squeeze",z),n.addEventListener("squeezestart",z),n.addEventListener("squeezeend",z),n.addEventListener("end",j),n.addEventListener("inputsourceschange",C),M.xrCompatible!==!0&&await e.makeXRCompatible(),L=t.getPixelRatio(),t.getSize(b),n.renderState.layers===void 0||t.capabilities.isWebGL2===!1){const it={antialias:n.renderState.layers===void 0?M.antialias:!0,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:o};f=new XRWebGLLayer(n,e,it),n.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),p=new Ri(f.framebufferWidth,f.framebufferHeight,{format:ii,type:Ai,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil})}else{let it=null,gt=null,Z=null;M.depth&&(Z=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,it=M.stencil?Sn:Vi,gt=M.stencil?ki:wi);const at={colorFormat:e.RGBA8,depthFormat:Z,scaleFactor:o};d=new XRWebGLBinding(n,e),u=d.createProjectionLayer(at),n.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),p=new Ri(u.textureWidth,u.textureHeight,{format:ii,type:Ai,depthTexture:new Vl(u.textureWidth,u.textureHeight,gt,void 0,void 0,void 0,void 0,void 0,void 0,it),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0});const dt=t.properties.get(p);dt.__ignoreDepthValues=u.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await n.requestReferenceSpace(r),ct.setContext(n),ct.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode};function C(K){for(let it=0;it<K.removed.length;it++){const gt=K.removed[it],Z=x.indexOf(gt);Z>=0&&(x[Z]=null,A[Z].disconnect(gt))}for(let it=0;it<K.added.length;it++){const gt=K.added[it];let Z=x.indexOf(gt);if(Z===-1){for(let dt=0;dt<A.length;dt++)if(dt>=x.length){x.push(gt),Z=dt;break}else if(x[dt]===null){x[dt]=gt,Z=dt;break}if(Z===-1)break}const at=A[Z];at&&at.connect(gt)}}const D=new P,G=new P;function O(K,it,gt){D.setFromMatrixPosition(it.matrixWorld),G.setFromMatrixPosition(gt.matrixWorld);const Z=D.distanceTo(G),at=it.projectionMatrix.elements,dt=gt.projectionMatrix.elements,St=at[14]/(at[10]-1),yt=at[14]/(at[10]+1),Tt=(at[9]+1)/at[5],B=(at[9]-1)/at[5],wt=(at[8]-1)/at[0],S=(dt[8]+1)/dt[0],W=St*wt,F=St*S,et=Z/(-wt+S),k=et*-wt;it.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(k),K.translateZ(et),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert();const v=St+et,E=yt+et,N=W-k,q=F+(Z-k),Y=Tt*yt/E*v,tt=B*yt/E*v;K.projectionMatrix.makePerspective(N,q,Y,tt,v,E),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}function X(K,it){it===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(it.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(n===null)return;y.near=_.near=T.near=K.near,y.far=_.far=T.far=K.far,(w!==y.near||I!==y.far)&&(n.updateRenderState({depthNear:y.near,depthFar:y.far}),w=y.near,I=y.far);const it=K.parent,gt=y.cameras;X(y,it);for(let Z=0;Z<gt.length;Z++)X(gt[Z],it);gt.length===2?O(y,T,_):y.projectionMatrix.copy(T.projectionMatrix),J(K,y,it)};function J(K,it,gt){gt===null?K.matrix.copy(it.matrixWorld):(K.matrix.copy(gt.matrixWorld),K.matrix.invert(),K.matrix.multiply(it.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(it.projectionMatrix),K.projectionMatrixInverse.copy(it.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=wn*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(K){l=K,u!==null&&(u.fixedFoveation=K),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=K)};let ot=null;function lt(K,it){if(h=it.getViewerPose(c||a),g=it,h!==null){const gt=h.views;f!==null&&(t.setRenderTargetFramebuffer(p,f.framebuffer),t.setRenderTarget(p));let Z=!1;gt.length!==y.cameras.length&&(y.cameras.length=0,Z=!0);for(let at=0;at<gt.length;at++){const dt=gt[at];let St=null;if(f!==null)St=f.getViewport(dt);else{const Tt=d.getViewSubImage(u,dt);St=Tt.viewport,at===0&&(t.setRenderTargetTextures(p,Tt.colorTexture,u.ignoreDepthValues?void 0:Tt.depthStencilTexture),t.setRenderTarget(p))}let yt=R[at];yt===void 0&&(yt=new Ue,yt.layers.enable(at),yt.viewport=new he,R[at]=yt),yt.matrix.fromArray(dt.transform.matrix),yt.matrix.decompose(yt.position,yt.quaternion,yt.scale),yt.projectionMatrix.fromArray(dt.projectionMatrix),yt.projectionMatrixInverse.copy(yt.projectionMatrix).invert(),yt.viewport.set(St.x,St.y,St.width,St.height),at===0&&(y.matrix.copy(yt.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),Z===!0&&y.cameras.push(yt)}}for(let gt=0;gt<A.length;gt++){const Z=x[gt],at=A[gt];Z!==null&&at!==void 0&&at.update(Z,it,c||a)}ot&&ot(K,it),it.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:it}),g=null}const ct=new kl;ct.setAnimationLoop(lt),this.setAnimationLoop=function(K){ot=K},this.dispose=function(){}}}function p0(s,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,Bl(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function n(m,p,A,x,b){p.isMeshBasicMaterial||p.isMeshLambertMaterial?o(m,p):p.isMeshToonMaterial?(o(m,p),d(m,p)):p.isMeshPhongMaterial?(o(m,p),h(m,p)):p.isMeshStandardMaterial?(o(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,b)):p.isMeshMatcapMaterial?(o(m,p),g(m,p)):p.isMeshDepthMaterial?o(m,p):p.isMeshDistanceMaterial?(o(m,p),M(m,p)):p.isMeshNormalMaterial?o(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&r(m,p)):p.isPointsMaterial?l(m,p,A,x):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function o(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===ze&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===ze&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const A=t.get(p).envMap;if(A&&(m.envMap.value=A,m.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;const x=s._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*x,e(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function r(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,A,x){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*A,m.scale.value=x*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),t.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,A){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===ze&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=A.texture,m.transmissionSamplerSize.value.set(A.width,A.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function M(m,p){const A=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(A.matrixWorld),m.nearDistance.value=A.shadow.camera.near,m.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function m0(s,t,e,i){let n={},o={},a=[];const r=e.isWebGL2?s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(A,x){const b=x.program;i.uniformBlockBinding(A,b)}function c(A,x){let b=n[A.id];b===void 0&&(g(A),b=h(A),n[A.id]=b,A.addEventListener("dispose",m));const L=x.program;i.updateUBOMapping(A,L);const T=t.render.frame;o[A.id]!==T&&(u(A),o[A.id]=T)}function h(A){const x=d();A.__bindingPointIndex=x;const b=s.createBuffer(),L=A.__size,T=A.usage;return s.bindBuffer(s.UNIFORM_BUFFER,b),s.bufferData(s.UNIFORM_BUFFER,L,T),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,x,b),b}function d(){for(let A=0;A<r;A++)if(a.indexOf(A)===-1)return a.push(A),A;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(A){const x=n[A.id],b=A.uniforms,L=A.__cache;s.bindBuffer(s.UNIFORM_BUFFER,x);for(let T=0,_=b.length;T<_;T++){const R=Array.isArray(b[T])?b[T]:[b[T]];for(let y=0,w=R.length;y<w;y++){const I=R[y];if(f(I,T,y,L)===!0){const z=I.__offset,j=Array.isArray(I.value)?I.value:[I.value];let C=0;for(let D=0;D<j.length;D++){const G=j[D],O=M(G);typeof G=="number"||typeof G=="boolean"?(I.__data[0]=G,s.bufferSubData(s.UNIFORM_BUFFER,z+C,I.__data)):G.isMatrix3?(I.__data[0]=G.elements[0],I.__data[1]=G.elements[1],I.__data[2]=G.elements[2],I.__data[3]=0,I.__data[4]=G.elements[3],I.__data[5]=G.elements[4],I.__data[6]=G.elements[5],I.__data[7]=0,I.__data[8]=G.elements[6],I.__data[9]=G.elements[7],I.__data[10]=G.elements[8],I.__data[11]=0):(G.toArray(I.__data,C),C+=O.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,z,I.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(A,x,b,L){const T=A.value,_=x+"_"+b;if(L[_]===void 0)return typeof T=="number"||typeof T=="boolean"?L[_]=T:L[_]=T.clone(),!0;{const R=L[_];if(typeof T=="number"||typeof T=="boolean"){if(R!==T)return L[_]=T,!0}else if(R.equals(T)===!1)return R.copy(T),!0}return!1}function g(A){const x=A.uniforms;let b=0;const L=16;for(let _=0,R=x.length;_<R;_++){const y=Array.isArray(x[_])?x[_]:[x[_]];for(let w=0,I=y.length;w<I;w++){const z=y[w],j=Array.isArray(z.value)?z.value:[z.value];for(let C=0,D=j.length;C<D;C++){const G=j[C],O=M(G),X=b%L;X!==0&&L-X<O.boundary&&(b+=L-X),z.__data=new Float32Array(O.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=b,b+=O.storage}}}const T=b%L;return T>0&&(b+=L-T),A.__size=b,A.__cache={},this}function M(A){const x={boundary:0,storage:0};return typeof A=="number"||typeof A=="boolean"?(x.boundary=4,x.storage=4):A.isVector2?(x.boundary=8,x.storage=8):A.isVector3||A.isColor?(x.boundary=16,x.storage=12):A.isVector4?(x.boundary=16,x.storage=16):A.isMatrix3?(x.boundary=48,x.storage=48):A.isMatrix4?(x.boundary=64,x.storage=64):A.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",A),x}function m(A){const x=A.target;x.removeEventListener("dispose",m);const b=a.indexOf(x.__bindingPointIndex);a.splice(b,1),s.deleteBuffer(n[x.id]),delete n[x.id],delete o[x.id]}function p(){for(const A in n)s.deleteBuffer(n[A]);a=[],n={},o={}}return{bind:l,update:c,dispose:p}}class $l{constructor(t={}){const{canvas:e=dh(),context:i=null,depth:n=!0,stencil:o=!0,alpha:a=!1,antialias:r=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1}=t;this.isWebGLRenderer=!0;let u;i!==null?u=i.getContextAttributes().alpha:u=a;const f=new Uint32Array(4),g=new Int32Array(4);let M=null,m=null;const p=[],A=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=we,this._useLegacyLights=!1,this.toneMapping=Ti,this.toneMappingExposure=1;const x=this;let b=!1,L=0,T=0,_=null,R=-1,y=null;const w=new he,I=new he;let z=null;const j=new te(0);let C=0,D=e.width,G=e.height,O=1,X=null,J=null;const ot=new he(0,0,D,G),lt=new he(0,0,D,G);let ct=!1;const K=new Tn;let it=!1,gt=!1,Z=null;const at=new se,dt=new Xt,St=new P,yt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Tt(){return _===null?O:1}let B=i;function wt(U,st){for(let pt=0;pt<U.length;pt++){const mt=U[pt],ut=e.getContext(mt,st);if(ut!==null)return ut}return null}try{const U={alpha:!0,depth:n,stencil:o,antialias:r,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Qo}`),e.addEventListener("webglcontextlost",_t,!1),e.addEventListener("webglcontextrestored",V,!1),e.addEventListener("webglcontextcreationerror",Et,!1),B===null){const st=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&st.shift(),B=wt(st,U),B===null)throw wt(st)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&B instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),B.getShaderPrecisionFormat===void 0&&(B.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(U){throw console.error("THREE.WebGLRenderer: "+U.message),U}let S,W,F,et,k,v,E,N,q,Y,tt,nt,ht,ft,vt,Mt,rt,It,At,Rt,Pt,Ct,$,xt;function Ft(){S=new bu(B),W=new _u(B,S,t),S.init(W),Ct=new h0(B,S,W),F=new l0(B,S,W),et=new Cu(B),k=new $p,v=new c0(B,S,F,k,W,Ct,et),E=new vu(x),N=new Eu(x),q=new Nh(B,W),$=new Mu(B,S,q,W),Y=new Tu(B,q,et,$),tt=new Iu(B,Y,q,et),At=new Lu(B,W,v),Mt=new yu(k),nt=new Yp(x,E,N,S,W,$,Mt),ht=new p0(x,k),ft=new Zp,vt=new i0(S,W),It=new gu(x,E,N,F,tt,u,l),rt=new r0(x,tt,W),xt=new m0(B,et,W,F),Rt=new xu(B,S,et,W),Pt=new Au(B,S,et,W),et.programs=nt.programs,x.capabilities=W,x.extensions=S,x.properties=k,x.renderLists=ft,x.shadowMap=rt,x.state=F,x.info=et}Ft();const Ut=new u0(x,B);this.xr=Ut,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const U=S.get("WEBGL_lose_context");U&&U.loseContext()},this.forceContextRestore=function(){const U=S.get("WEBGL_lose_context");U&&U.restoreContext()},this.getPixelRatio=function(){return O},this.setPixelRatio=function(U){U!==void 0&&(O=U,this.setSize(D,G,!1))},this.getSize=function(U){return U.set(D,G)},this.setSize=function(U,st,pt=!0){if(Ut.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}D=U,G=st,e.width=Math.floor(U*O),e.height=Math.floor(st*O),pt===!0&&(e.style.width=U+"px",e.style.height=st+"px"),this.setViewport(0,0,U,st)},this.getDrawingBufferSize=function(U){return U.set(D*O,G*O).floor()},this.setDrawingBufferSize=function(U,st,pt){D=U,G=st,O=pt,e.width=Math.floor(U*pt),e.height=Math.floor(st*pt),this.setViewport(0,0,U,st)},this.getCurrentViewport=function(U){return U.copy(w)},this.getViewport=function(U){return U.copy(ot)},this.setViewport=function(U,st,pt,mt){U.isVector4?ot.set(U.x,U.y,U.z,U.w):ot.set(U,st,pt,mt),F.viewport(w.copy(ot).multiplyScalar(O).floor())},this.getScissor=function(U){return U.copy(lt)},this.setScissor=function(U,st,pt,mt){U.isVector4?lt.set(U.x,U.y,U.z,U.w):lt.set(U,st,pt,mt),F.scissor(I.copy(lt).multiplyScalar(O).floor())},this.getScissorTest=function(){return ct},this.setScissorTest=function(U){F.setScissorTest(ct=U)},this.setOpaqueSort=function(U){X=U},this.setTransparentSort=function(U){J=U},this.getClearColor=function(U){return U.copy(It.getClearColor())},this.setClearColor=function(){It.setClearColor.apply(It,arguments)},this.getClearAlpha=function(){return It.getClearAlpha()},this.setClearAlpha=function(){It.setClearAlpha.apply(It,arguments)},this.clear=function(U=!0,st=!0,pt=!0){let mt=0;if(U){let ut=!1;if(_!==null){const Bt=_.texture.format;ut=Bt===El||Bt===wl||Bt===Sl}if(ut){const Bt=_.texture.type,Ot=Bt===Ai||Bt===wi||Bt===ea||Bt===ki||Bt===yl||Bt===vl,Ht=It.getClearColor(),Wt=It.getClearAlpha(),Kt=Ht.r,Yt=Ht.g,jt=Ht.b;Ot?(f[0]=Kt,f[1]=Yt,f[2]=jt,f[3]=Wt,B.clearBufferuiv(B.COLOR,0,f)):(g[0]=Kt,g[1]=Yt,g[2]=jt,g[3]=Wt,B.clearBufferiv(B.COLOR,0,g))}else mt|=B.COLOR_BUFFER_BIT}st&&(mt|=B.DEPTH_BUFFER_BIT),pt&&(mt|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear(mt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",_t,!1),e.removeEventListener("webglcontextrestored",V,!1),e.removeEventListener("webglcontextcreationerror",Et,!1),ft.dispose(),vt.dispose(),k.dispose(),E.dispose(),N.dispose(),tt.dispose(),$.dispose(),xt.dispose(),nt.dispose(),Ut.dispose(),Ut.removeEventListener("sessionstart",ie),Ut.removeEventListener("sessionend",kt),Z&&(Z.dispose(),Z=null),re.stop()};function _t(U){U.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function V(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const U=et.autoReset,st=rt.enabled,pt=rt.autoUpdate,mt=rt.needsUpdate,ut=rt.type;Ft(),et.autoReset=U,rt.enabled=st,rt.autoUpdate=pt,rt.needsUpdate=mt,rt.type=ut}function Et(U){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",U.statusMessage)}function bt(U){const st=U.target;st.removeEventListener("dispose",bt),Lt(st)}function Lt(U){Gt(U),k.remove(U)}function Gt(U){const st=k.get(U).programs;st!==void 0&&(st.forEach(function(pt){nt.releaseProgram(pt)}),U.isShaderMaterial&&nt.releaseShaderCache(U))}this.renderBufferDirect=function(U,st,pt,mt,ut,Bt){st===null&&(st=yt);const Ot=ut.isMesh&&ut.matrixWorld.determinant()<0,Ht=tc(U,st,pt,mt,ut);F.setMaterial(mt,Ot);let Wt=pt.index,Kt=1;if(mt.wireframe===!0){if(Wt=Y.getWireframeAttribute(pt),Wt===void 0)return;Kt=2}const Yt=pt.drawRange,jt=pt.attributes.position;let pe=Yt.start*Kt,Ge=(Yt.start+Yt.count)*Kt;Bt!==null&&(pe=Math.max(pe,Bt.start*Kt),Ge=Math.min(Ge,(Bt.start+Bt.count)*Kt)),Wt!==null?(pe=Math.max(pe,0),Ge=Math.min(Ge,Wt.count)):jt!=null&&(pe=Math.max(pe,0),Ge=Math.min(Ge,jt.count));const ve=Ge-pe;if(ve<0||ve===1/0)return;$.setup(ut,mt,Ht,pt,Wt);let ai,de=Rt;if(Wt!==null&&(ai=q.get(Wt),de=Pt,de.setIndex(ai)),ut.isMesh)mt.wireframe===!0?(F.setLineWidth(mt.wireframeLinewidth*Tt()),de.setMode(B.LINES)):de.setMode(B.TRIANGLES);else if(ut.isLine){let Jt=mt.linewidth;Jt===void 0&&(Jt=1),F.setLineWidth(Jt*Tt()),ut.isLineSegments?de.setMode(B.LINES):ut.isLineLoop?de.setMode(B.LINE_LOOP):de.setMode(B.LINE_STRIP)}else ut.isPoints?de.setMode(B.POINTS):ut.isSprite&&de.setMode(B.TRIANGLES);if(ut.isBatchedMesh)de.renderMultiDraw(ut._multiDrawStarts,ut._multiDrawCounts,ut._multiDrawCount);else if(ut.isInstancedMesh)de.renderInstances(pe,ve,ut.count);else if(pt.isInstancedBufferGeometry){const Jt=pt._maxInstanceCount!==void 0?pt._maxInstanceCount:1/0,Ws=Math.min(pt.instanceCount,Jt);de.renderInstances(pe,ve,Ws)}else de.render(pe,ve)};function qt(U,st,pt){U.transparent===!0&&U.side===je&&U.forceSinglePass===!1?(U.side=ze,U.needsUpdate=!0,Jn(U,st,pt),U.side=Ci,U.needsUpdate=!0,Jn(U,st,pt),U.side=je):Jn(U,st,pt)}this.compile=function(U,st,pt=null){pt===null&&(pt=U),m=vt.get(pt),m.init(),A.push(m),pt.traverseVisible(function(ut){ut.isLight&&ut.layers.test(st.layers)&&(m.pushLight(ut),ut.castShadow&&m.pushShadow(ut))}),U!==pt&&U.traverseVisible(function(ut){ut.isLight&&ut.layers.test(st.layers)&&(m.pushLight(ut),ut.castShadow&&m.pushShadow(ut))}),m.setupLights(x._useLegacyLights);const mt=new Set;return U.traverse(function(ut){const Bt=ut.material;if(Bt)if(Array.isArray(Bt))for(let Ot=0;Ot<Bt.length;Ot++){const Ht=Bt[Ot];qt(Ht,pt,ut),mt.add(Ht)}else qt(Bt,pt,ut),mt.add(Bt)}),A.pop(),m=null,mt},this.compileAsync=function(U,st,pt=null){const mt=this.compile(U,st,pt);return new Promise(ut=>{function Bt(){if(mt.forEach(function(Ot){k.get(Ot).currentProgram.isReady()&&mt.delete(Ot)}),mt.size===0){ut(U);return}setTimeout(Bt,10)}S.get("KHR_parallel_shader_compile")!==null?Bt():setTimeout(Bt,10)})};let Nt=null;function $t(U){Nt&&Nt(U)}function ie(){re.stop()}function kt(){re.start()}const re=new kl;re.setAnimationLoop($t),typeof self<"u"&&re.setContext(self),this.setAnimationLoop=function(U){Nt=U,Ut.setAnimationLoop(U),U===null?re.stop():re.start()},Ut.addEventListener("sessionstart",ie),Ut.addEventListener("sessionend",kt),this.render=function(U,st){if(st!==void 0&&st.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),st.parent===null&&st.matrixWorldAutoUpdate===!0&&st.updateMatrixWorld(),Ut.enabled===!0&&Ut.isPresenting===!0&&(Ut.cameraAutoUpdate===!0&&Ut.updateCamera(st),st=Ut.getCamera()),U.isScene===!0&&U.onBeforeRender(x,U,st,_),m=vt.get(U,A.length),m.init(),A.push(m),at.multiplyMatrices(st.projectionMatrix,st.matrixWorldInverse),K.setFromProjectionMatrix(at),gt=this.localClippingEnabled,it=Mt.init(this.clippingPlanes,gt),M=ft.get(U,p.length),M.init(),p.push(M),Be(U,st,0,x.sortObjects),M.finish(),x.sortObjects===!0&&M.sort(X,J),this.info.render.frame++,it===!0&&Mt.beginShadows();const pt=m.state.shadowsArray;if(rt.render(pt,U,st),it===!0&&Mt.endShadows(),this.info.autoReset===!0&&this.info.reset(),It.render(M,U),m.setupLights(x._useLegacyLights),st.isArrayCamera){const mt=st.cameras;for(let ut=0,Bt=mt.length;ut<Bt;ut++){const Ot=mt[ut];Cn(M,U,Ot,Ot.viewport)}}else Cn(M,U,st);_!==null&&(v.updateMultisampleRenderTarget(_),v.updateRenderTargetMipmap(_)),U.isScene===!0&&U.onAfterRender(x,U,st),$.resetDefaultState(),R=-1,y=null,A.pop(),A.length>0?m=A[A.length-1]:m=null,p.pop(),p.length>0?M=p[p.length-1]:M=null};function Be(U,st,pt,mt){if(U.visible===!1)return;if(U.layers.test(st.layers)){if(U.isGroup)pt=U.renderOrder;else if(U.isLOD)U.autoUpdate===!0&&U.update(st);else if(U.isLight)m.pushLight(U),U.castShadow&&m.pushShadow(U);else if(U.isSprite){if(!U.frustumCulled||K.intersectsSprite(U)){mt&&St.setFromMatrixPosition(U.matrixWorld).applyMatrix4(at);const Ot=tt.update(U),Ht=U.material;Ht.visible&&M.push(U,Ot,Ht,pt,St.z,null)}}else if((U.isMesh||U.isLine||U.isPoints)&&(!U.frustumCulled||K.intersectsObject(U))){const Ot=tt.update(U),Ht=U.material;if(mt&&(U.boundingSphere!==void 0?(U.boundingSphere===null&&U.computeBoundingSphere(),St.copy(U.boundingSphere.center)):(Ot.boundingSphere===null&&Ot.computeBoundingSphere(),St.copy(Ot.boundingSphere.center)),St.applyMatrix4(U.matrixWorld).applyMatrix4(at)),Array.isArray(Ht)){const Wt=Ot.groups;for(let Kt=0,Yt=Wt.length;Kt<Yt;Kt++){const jt=Wt[Kt],pe=Ht[jt.materialIndex];pe&&pe.visible&&M.push(U,Ot,pe,pt,St.z,jt)}}else Ht.visible&&M.push(U,Ot,Ht,pt,St.z,null)}}const Bt=U.children;for(let Ot=0,Ht=Bt.length;Ot<Ht;Ot++)Be(Bt[Ot],st,pt,mt)}function Cn(U,st,pt,mt){const ut=U.opaque,Bt=U.transmissive,Ot=U.transparent;m.setupLightsView(pt),it===!0&&Mt.setGlobalState(x.clippingPlanes,pt),Bt.length>0&&Zn(ut,Bt,st,pt),mt&&F.viewport(w.copy(mt)),ut.length>0&&Kn(ut,st,pt),Bt.length>0&&Kn(Bt,st,pt),Ot.length>0&&Kn(Ot,st,pt),F.buffers.depth.setTest(!0),F.buffers.depth.setMask(!0),F.buffers.color.setMask(!0),F.setPolygonOffset(!1)}function Zn(U,st,pt,mt){if((pt.isScene===!0?pt.overrideMaterial:null)!==null)return;const Bt=W.isWebGL2;Z===null&&(Z=new Ri(1,1,{generateMipmaps:!0,type:S.has("EXT_color_buffer_half_float")?vn:Ai,minFilter:yn,samples:Bt?4:0})),x.getDrawingBufferSize(dt),Bt?Z.setSize(dt.x,dt.y):Z.setSize(Fs(dt.x),Fs(dt.y));const Ot=x.getRenderTarget();x.setRenderTarget(Z),x.getClearColor(j),C=x.getClearAlpha(),C<1&&x.setClearColor(16777215,.5),x.clear();const Ht=x.toneMapping;x.toneMapping=Ti,Kn(U,pt,mt),v.updateMultisampleRenderTarget(Z),v.updateRenderTargetMipmap(Z);let Wt=!1;for(let Kt=0,Yt=st.length;Kt<Yt;Kt++){const jt=st[Kt],pe=jt.object,Ge=jt.geometry,ve=jt.material,ai=jt.group;if(ve.side===je&&pe.layers.test(mt.layers)){const de=ve.side;ve.side=ze,ve.needsUpdate=!0,ha(pe,pt,mt,Ge,ve,ai),ve.side=de,ve.needsUpdate=!0,Wt=!0}}Wt===!0&&(v.updateMultisampleRenderTarget(Z),v.updateRenderTargetMipmap(Z)),x.setRenderTarget(Ot),x.setClearColor(j,C),x.toneMapping=Ht}function Kn(U,st,pt){const mt=st.isScene===!0?st.overrideMaterial:null;for(let ut=0,Bt=U.length;ut<Bt;ut++){const Ot=U[ut],Ht=Ot.object,Wt=Ot.geometry,Kt=mt===null?Ot.material:mt,Yt=Ot.group;Ht.layers.test(pt.layers)&&ha(Ht,st,pt,Wt,Kt,Yt)}}function ha(U,st,pt,mt,ut,Bt){U.onBeforeRender(x,st,pt,mt,ut,Bt),U.modelViewMatrix.multiplyMatrices(pt.matrixWorldInverse,U.matrixWorld),U.normalMatrix.getNormalMatrix(U.modelViewMatrix),ut.onBeforeRender(x,st,pt,mt,U,Bt),ut.transparent===!0&&ut.side===je&&ut.forceSinglePass===!1?(ut.side=ze,ut.needsUpdate=!0,x.renderBufferDirect(pt,st,mt,ut,U,Bt),ut.side=Ci,ut.needsUpdate=!0,x.renderBufferDirect(pt,st,mt,ut,U,Bt),ut.side=je):x.renderBufferDirect(pt,st,mt,ut,U,Bt),U.onAfterRender(x,st,pt,mt,ut,Bt)}function Jn(U,st,pt){st.isScene!==!0&&(st=yt);const mt=k.get(U),ut=m.state.lights,Bt=m.state.shadowsArray,Ot=ut.state.version,Ht=nt.getParameters(U,ut.state,Bt,st,pt),Wt=nt.getProgramCacheKey(Ht);let Kt=mt.programs;mt.environment=U.isMeshStandardMaterial?st.environment:null,mt.fog=st.fog,mt.envMap=(U.isMeshStandardMaterial?N:E).get(U.envMap||mt.environment),Kt===void 0&&(U.addEventListener("dispose",bt),Kt=new Map,mt.programs=Kt);let Yt=Kt.get(Wt);if(Yt!==void 0){if(mt.currentProgram===Yt&&mt.lightsStateVersion===Ot)return fa(U,Ht),Yt}else Ht.uniforms=nt.getUniforms(U),U.onBuild(pt,Ht,x),U.onBeforeCompile(Ht,x),Yt=nt.acquireProgram(Ht,Wt),Kt.set(Wt,Yt),mt.uniforms=Ht.uniforms;const jt=mt.uniforms;return(!U.isShaderMaterial&&!U.isRawShaderMaterial||U.clipping===!0)&&(jt.clippingPlanes=Mt.uniform),fa(U,Ht),mt.needsLights=ic(U),mt.lightsStateVersion=Ot,mt.needsLights&&(jt.ambientLightColor.value=ut.state.ambient,jt.lightProbe.value=ut.state.probe,jt.directionalLights.value=ut.state.directional,jt.directionalLightShadows.value=ut.state.directionalShadow,jt.spotLights.value=ut.state.spot,jt.spotLightShadows.value=ut.state.spotShadow,jt.rectAreaLights.value=ut.state.rectArea,jt.ltc_1.value=ut.state.rectAreaLTC1,jt.ltc_2.value=ut.state.rectAreaLTC2,jt.pointLights.value=ut.state.point,jt.pointLightShadows.value=ut.state.pointShadow,jt.hemisphereLights.value=ut.state.hemi,jt.directionalShadowMap.value=ut.state.directionalShadowMap,jt.directionalShadowMatrix.value=ut.state.directionalShadowMatrix,jt.spotShadowMap.value=ut.state.spotShadowMap,jt.spotLightMatrix.value=ut.state.spotLightMatrix,jt.spotLightMap.value=ut.state.spotLightMap,jt.pointShadowMap.value=ut.state.pointShadowMap,jt.pointShadowMatrix.value=ut.state.pointShadowMatrix),mt.currentProgram=Yt,mt.uniformsList=null,Yt}function da(U){if(U.uniformsList===null){const st=U.currentProgram.getUniforms();U.uniformsList=Rs.seqWithValue(st.seq,U.uniforms)}return U.uniformsList}function fa(U,st){const pt=k.get(U);pt.outputColorSpace=st.outputColorSpace,pt.batching=st.batching,pt.instancing=st.instancing,pt.instancingColor=st.instancingColor,pt.skinning=st.skinning,pt.morphTargets=st.morphTargets,pt.morphNormals=st.morphNormals,pt.morphColors=st.morphColors,pt.morphTargetsCount=st.morphTargetsCount,pt.numClippingPlanes=st.numClippingPlanes,pt.numIntersection=st.numClipIntersection,pt.vertexAlphas=st.vertexAlphas,pt.vertexTangents=st.vertexTangents,pt.toneMapping=st.toneMapping}function tc(U,st,pt,mt,ut){st.isScene!==!0&&(st=yt),v.resetTextureUnits();const Bt=st.fog,Ot=mt.isMeshStandardMaterial?st.environment:null,Ht=_===null?x.outputColorSpace:_.isXRRenderTarget===!0?_.texture.colorSpace:Mi,Wt=(mt.isMeshStandardMaterial?N:E).get(mt.envMap||Ot),Kt=mt.vertexColors===!0&&!!pt.attributes.color&&pt.attributes.color.itemSize===4,Yt=!!pt.attributes.tangent&&(!!mt.normalMap||mt.anisotropy>0),jt=!!pt.morphAttributes.position,pe=!!pt.morphAttributes.normal,Ge=!!pt.morphAttributes.color;let ve=Ti;mt.toneMapped&&(_===null||_.isXRRenderTarget===!0)&&(ve=x.toneMapping);const ai=pt.morphAttributes.position||pt.morphAttributes.normal||pt.morphAttributes.color,de=ai!==void 0?ai.length:0,Jt=k.get(mt),Ws=m.state.lights;if(it===!0&&(gt===!0||U!==y)){const Xe=U===y&&mt.id===R;Mt.setState(mt,U,Xe)}let ue=!1;mt.version===Jt.__version?(Jt.needsLights&&Jt.lightsStateVersion!==Ws.state.version||Jt.outputColorSpace!==Ht||ut.isBatchedMesh&&Jt.batching===!1||!ut.isBatchedMesh&&Jt.batching===!0||ut.isInstancedMesh&&Jt.instancing===!1||!ut.isInstancedMesh&&Jt.instancing===!0||ut.isSkinnedMesh&&Jt.skinning===!1||!ut.isSkinnedMesh&&Jt.skinning===!0||ut.isInstancedMesh&&Jt.instancingColor===!0&&ut.instanceColor===null||ut.isInstancedMesh&&Jt.instancingColor===!1&&ut.instanceColor!==null||Jt.envMap!==Wt||mt.fog===!0&&Jt.fog!==Bt||Jt.numClippingPlanes!==void 0&&(Jt.numClippingPlanes!==Mt.numPlanes||Jt.numIntersection!==Mt.numIntersection)||Jt.vertexAlphas!==Kt||Jt.vertexTangents!==Yt||Jt.morphTargets!==jt||Jt.morphNormals!==pe||Jt.morphColors!==Ge||Jt.toneMapping!==ve||W.isWebGL2===!0&&Jt.morphTargetsCount!==de)&&(ue=!0):(ue=!0,Jt.__version=mt.version);let Pi=Jt.currentProgram;ue===!0&&(Pi=Jn(mt,st,ut));let ua=!1,Rn=!1,Xs=!1;const Te=Pi.getUniforms(),Li=Jt.uniforms;if(F.useProgram(Pi.program)&&(ua=!0,Rn=!0,Xs=!0),mt.id!==R&&(R=mt.id,Rn=!0),ua||y!==U){Te.setValue(B,"projectionMatrix",U.projectionMatrix),Te.setValue(B,"viewMatrix",U.matrixWorldInverse);const Xe=Te.map.cameraPosition;Xe!==void 0&&Xe.setValue(B,St.setFromMatrixPosition(U.matrixWorld)),W.logarithmicDepthBuffer&&Te.setValue(B,"logDepthBufFC",2/(Math.log(U.far+1)/Math.LN2)),(mt.isMeshPhongMaterial||mt.isMeshToonMaterial||mt.isMeshLambertMaterial||mt.isMeshBasicMaterial||mt.isMeshStandardMaterial||mt.isShaderMaterial)&&Te.setValue(B,"isOrthographic",U.isOrthographicCamera===!0),y!==U&&(y=U,Rn=!0,Xs=!0)}if(ut.isSkinnedMesh){Te.setOptional(B,ut,"bindMatrix"),Te.setOptional(B,ut,"bindMatrixInverse");const Xe=ut.skeleton;Xe&&(W.floatVertexTextures?(Xe.boneTexture===null&&Xe.computeBoneTexture(),Te.setValue(B,"boneTexture",Xe.boneTexture,v)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}ut.isBatchedMesh&&(Te.setOptional(B,ut,"batchingTexture"),Te.setValue(B,"batchingTexture",ut._matricesTexture,v));const qs=pt.morphAttributes;if((qs.position!==void 0||qs.normal!==void 0||qs.color!==void 0&&W.isWebGL2===!0)&&At.update(ut,pt,Pi),(Rn||Jt.receiveShadow!==ut.receiveShadow)&&(Jt.receiveShadow=ut.receiveShadow,Te.setValue(B,"receiveShadow",ut.receiveShadow)),mt.isMeshGouraudMaterial&&mt.envMap!==null&&(Li.envMap.value=Wt,Li.flipEnvMap.value=Wt.isCubeTexture&&Wt.isRenderTargetTexture===!1?-1:1),Rn&&(Te.setValue(B,"toneMappingExposure",x.toneMappingExposure),Jt.needsLights&&ec(Li,Xs),Bt&&mt.fog===!0&&ht.refreshFogUniforms(Li,Bt),ht.refreshMaterialUniforms(Li,mt,O,G,Z),Rs.upload(B,da(Jt),Li,v)),mt.isShaderMaterial&&mt.uniformsNeedUpdate===!0&&(Rs.upload(B,da(Jt),Li,v),mt.uniformsNeedUpdate=!1),mt.isSpriteMaterial&&Te.setValue(B,"center",ut.center),Te.setValue(B,"modelViewMatrix",ut.modelViewMatrix),Te.setValue(B,"normalMatrix",ut.normalMatrix),Te.setValue(B,"modelMatrix",ut.matrixWorld),mt.isShaderMaterial||mt.isRawShaderMaterial){const Xe=mt.uniformsGroups;for(let Ys=0,nc=Xe.length;Ys<nc;Ys++)if(W.isWebGL2){const pa=Xe[Ys];xt.update(pa,Pi),xt.bind(pa,Pi)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Pi}function ec(U,st){U.ambientLightColor.needsUpdate=st,U.lightProbe.needsUpdate=st,U.directionalLights.needsUpdate=st,U.directionalLightShadows.needsUpdate=st,U.pointLights.needsUpdate=st,U.pointLightShadows.needsUpdate=st,U.spotLights.needsUpdate=st,U.spotLightShadows.needsUpdate=st,U.rectAreaLights.needsUpdate=st,U.hemisphereLights.needsUpdate=st}function ic(U){return U.isMeshLambertMaterial||U.isMeshToonMaterial||U.isMeshPhongMaterial||U.isMeshStandardMaterial||U.isShadowMaterial||U.isShaderMaterial&&U.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return _},this.setRenderTargetTextures=function(U,st,pt){k.get(U.texture).__webglTexture=st,k.get(U.depthTexture).__webglTexture=pt;const mt=k.get(U);mt.__hasExternalTextures=!0,mt.__hasExternalTextures&&(mt.__autoAllocateDepthBuffer=pt===void 0,mt.__autoAllocateDepthBuffer||S.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),mt.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(U,st){const pt=k.get(U);pt.__webglFramebuffer=st,pt.__useDefaultFramebuffer=st===void 0},this.setRenderTarget=function(U,st=0,pt=0){_=U,L=st,T=pt;let mt=!0,ut=null,Bt=!1,Ot=!1;if(U){const Wt=k.get(U);Wt.__useDefaultFramebuffer!==void 0?(F.bindFramebuffer(B.FRAMEBUFFER,null),mt=!1):Wt.__webglFramebuffer===void 0?v.setupRenderTarget(U):Wt.__hasExternalTextures&&v.rebindTextures(U,k.get(U.texture).__webglTexture,k.get(U.depthTexture).__webglTexture);const Kt=U.texture;(Kt.isData3DTexture||Kt.isDataArrayTexture||Kt.isCompressedArrayTexture)&&(Ot=!0);const Yt=k.get(U).__webglFramebuffer;U.isWebGLCubeRenderTarget?(Array.isArray(Yt[st])?ut=Yt[st][pt]:ut=Yt[st],Bt=!0):W.isWebGL2&&U.samples>0&&v.useMultisampledRTT(U)===!1?ut=k.get(U).__webglMultisampledFramebuffer:Array.isArray(Yt)?ut=Yt[pt]:ut=Yt,w.copy(U.viewport),I.copy(U.scissor),z=U.scissorTest}else w.copy(ot).multiplyScalar(O).floor(),I.copy(lt).multiplyScalar(O).floor(),z=ct;if(F.bindFramebuffer(B.FRAMEBUFFER,ut)&&W.drawBuffers&&mt&&F.drawBuffers(U,ut),F.viewport(w),F.scissor(I),F.setScissorTest(z),Bt){const Wt=k.get(U.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+st,Wt.__webglTexture,pt)}else if(Ot){const Wt=k.get(U.texture),Kt=st||0;B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,Wt.__webglTexture,pt||0,Kt)}R=-1},this.readRenderTargetPixels=function(U,st,pt,mt,ut,Bt,Ot){if(!(U&&U.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ht=k.get(U).__webglFramebuffer;if(U.isWebGLCubeRenderTarget&&Ot!==void 0&&(Ht=Ht[Ot]),Ht){F.bindFramebuffer(B.FRAMEBUFFER,Ht);try{const Wt=U.texture,Kt=Wt.format,Yt=Wt.type;if(Kt!==ii&&Ct.convert(Kt)!==B.getParameter(B.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const jt=Yt===vn&&(S.has("EXT_color_buffer_half_float")||W.isWebGL2&&S.has("EXT_color_buffer_float"));if(Yt!==Ai&&Ct.convert(Yt)!==B.getParameter(B.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Yt===Ei&&(W.isWebGL2||S.has("OES_texture_float")||S.has("WEBGL_color_buffer_float")))&&!jt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}st>=0&&st<=U.width-mt&&pt>=0&&pt<=U.height-ut&&B.readPixels(st,pt,mt,ut,Ct.convert(Kt),Ct.convert(Yt),Bt)}finally{const Wt=_!==null?k.get(_).__webglFramebuffer:null;F.bindFramebuffer(B.FRAMEBUFFER,Wt)}}},this.copyFramebufferToTexture=function(U,st,pt=0){const mt=Math.pow(2,-pt),ut=Math.floor(st.image.width*mt),Bt=Math.floor(st.image.height*mt);v.setTexture2D(st,0),B.copyTexSubImage2D(B.TEXTURE_2D,pt,0,0,U.x,U.y,ut,Bt),F.unbindTexture()},this.copyTextureToTexture=function(U,st,pt,mt=0){const ut=st.image.width,Bt=st.image.height,Ot=Ct.convert(pt.format),Ht=Ct.convert(pt.type);v.setTexture2D(pt,0),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,pt.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,pt.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,pt.unpackAlignment),st.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,mt,U.x,U.y,ut,Bt,Ot,Ht,st.image.data):st.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,mt,U.x,U.y,st.mipmaps[0].width,st.mipmaps[0].height,Ot,st.mipmaps[0].data):B.texSubImage2D(B.TEXTURE_2D,mt,U.x,U.y,Ot,Ht,st.image),mt===0&&pt.generateMipmaps&&B.generateMipmap(B.TEXTURE_2D),F.unbindTexture()},this.copyTextureToTexture3D=function(U,st,pt,mt,ut=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Bt=U.max.x-U.min.x+1,Ot=U.max.y-U.min.y+1,Ht=U.max.z-U.min.z+1,Wt=Ct.convert(mt.format),Kt=Ct.convert(mt.type);let Yt;if(mt.isData3DTexture)v.setTexture3D(mt,0),Yt=B.TEXTURE_3D;else if(mt.isDataArrayTexture||mt.isCompressedArrayTexture)v.setTexture2DArray(mt,0),Yt=B.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,mt.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,mt.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,mt.unpackAlignment);const jt=B.getParameter(B.UNPACK_ROW_LENGTH),pe=B.getParameter(B.UNPACK_IMAGE_HEIGHT),Ge=B.getParameter(B.UNPACK_SKIP_PIXELS),ve=B.getParameter(B.UNPACK_SKIP_ROWS),ai=B.getParameter(B.UNPACK_SKIP_IMAGES),de=pt.isCompressedTexture?pt.mipmaps[ut]:pt.image;B.pixelStorei(B.UNPACK_ROW_LENGTH,de.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,de.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,U.min.x),B.pixelStorei(B.UNPACK_SKIP_ROWS,U.min.y),B.pixelStorei(B.UNPACK_SKIP_IMAGES,U.min.z),pt.isDataTexture||pt.isData3DTexture?B.texSubImage3D(Yt,ut,st.x,st.y,st.z,Bt,Ot,Ht,Wt,Kt,de.data):pt.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),B.compressedTexSubImage3D(Yt,ut,st.x,st.y,st.z,Bt,Ot,Ht,Wt,de.data)):B.texSubImage3D(Yt,ut,st.x,st.y,st.z,Bt,Ot,Ht,Wt,Kt,de),B.pixelStorei(B.UNPACK_ROW_LENGTH,jt),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,pe),B.pixelStorei(B.UNPACK_SKIP_PIXELS,Ge),B.pixelStorei(B.UNPACK_SKIP_ROWS,ve),B.pixelStorei(B.UNPACK_SKIP_IMAGES,ai),ut===0&&mt.generateMipmaps&&B.generateMipmap(Yt),F.unbindTexture()},this.initTexture=function(U){U.isCubeTexture?v.setTextureCube(U,0):U.isData3DTexture?v.setTexture3D(U,0):U.isDataArrayTexture||U.isCompressedArrayTexture?v.setTexture2DArray(U,0):v.setTexture2D(U,0),F.unbindTexture()},this.resetState=function(){L=0,T=0,_=null,F.reset(),$.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return pi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===ia?"display-p3":"srgb",e.unpackColorSpace=ne.workingColorSpace===Vs?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===we?Hi:Tl}set outputEncoding(t){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=t===Hi?we:Mi}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}}class g0 extends $l{}g0.prototype.isWebGL1Renderer=!0;class ra{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new te(t),this.density=e}clone(){return new ra(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class M0 extends ce{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e}}class x0{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=$o,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=gi()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let n=0,o=this.stride;n<o;n++)this.array[t+n]=e.array[i+n];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=gi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=gi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Pe=new P;class Os{constructor(t,e,i,n=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=n}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)Pe.fromBufferAttribute(this,e),Pe.applyMatrix4(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Pe.fromBufferAttribute(this,e),Pe.applyNormalMatrix(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Pe.fromBufferAttribute(this,e),Pe.transformDirection(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}setX(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=si(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=si(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=si(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=si(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=ae(e,this.array),i=ae(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ae(e,this.array),i=ae(i,this.array),n=ae(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=n,this}setXYZW(t,e,i,n,o){return t=t*this.data.stride+this.offset,this.normalized&&(e=ae(e,this.array),i=ae(i,this.array),n=ae(n,this.array),o=ae(o,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=n,this.data.array[t+3]=o,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)e.push(this.data.array[n+o])}return new Ke(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Os(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)e.push(this.data.array[n+o])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class $e extends Xi{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new te(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let cn;const Un=new P,hn=new P,dn=new P,fn=new Xt,Nn=new Xt,jl=new se,vs=new P,zn=new P,Ss=new P,Dr=new Xt,Eo=new Xt,Ur=new Xt;class Ne extends ce{constructor(t=new $e){if(super(),this.isSprite=!0,this.type="Sprite",cn===void 0){cn=new We;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new x0(e,5);cn.setIndex([0,1,2,0,2,3]),cn.setAttribute("position",new Os(i,3,0,!1)),cn.setAttribute("uv",new Os(i,2,3,!1))}this.geometry=cn,this.material=t,this.center=new Xt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),hn.setFromMatrixScale(this.matrixWorld),jl.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),dn.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&hn.multiplyScalar(-dn.z);const i=this.material.rotation;let n,o;i!==0&&(o=Math.cos(i),n=Math.sin(i));const a=this.center;ws(vs.set(-.5,-.5,0),dn,a,hn,n,o),ws(zn.set(.5,-.5,0),dn,a,hn,n,o),ws(Ss.set(.5,.5,0),dn,a,hn,n,o),Dr.set(0,0),Eo.set(1,0),Ur.set(1,1);let r=t.ray.intersectTriangle(vs,zn,Ss,!1,Un);if(r===null&&(ws(zn.set(-.5,.5,0),dn,a,hn,n,o),Eo.set(0,1),r=t.ray.intersectTriangle(vs,Ss,zn,!1,Un),r===null))return;const l=t.ray.origin.distanceTo(Un);l<t.near||l>t.far||e.push({distance:l,point:Un.clone(),uv:Ye.getInterpolation(Un,vs,zn,Ss,Dr,Eo,Ur,new Xt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function ws(s,t,e,i,n,o){fn.subVectors(s,e).addScalar(.5).multiply(i),n!==void 0?(Nn.x=o*fn.x-n*fn.y,Nn.y=n*fn.x+o*fn.y):Nn.copy(fn),s.copy(t),s.x+=Nn.x,s.y+=Nn.y,s.applyMatrix4(jl)}const Es=new P,Nr=new P;class zr extends ce{constructor(){super(),this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]},isLOD:{value:!0}}),this.autoUpdate=!0}copy(t){super.copy(t,!1);const e=t.levels;for(let i=0,n=e.length;i<n;i++){const o=e[i];this.addLevel(o.object.clone(),o.distance,o.hysteresis)}return this.autoUpdate=t.autoUpdate,this}addLevel(t,e=0,i=0){e=Math.abs(e);const n=this.levels;let o;for(o=0;o<n.length&&!(e<n[o].distance);o++);return n.splice(o,0,{distance:e,hysteresis:i,object:t}),this.add(t),this}getCurrentLevel(){return this._currentLevel}getObjectForDistance(t){const e=this.levels;if(e.length>0){let i,n;for(i=1,n=e.length;i<n;i++){let o=e[i].distance;if(e[i].object.visible&&(o-=o*e[i].hysteresis),t<o)break}return e[i-1].object}return null}raycast(t,e){if(this.levels.length>0){Es.setFromMatrixPosition(this.matrixWorld);const n=t.ray.origin.distanceTo(Es);this.getObjectForDistance(n).raycast(t,e)}}update(t){const e=this.levels;if(e.length>1){Es.setFromMatrixPosition(t.matrixWorld),Nr.setFromMatrixPosition(this.matrixWorld);const i=Es.distanceTo(Nr)/t.zoom;e[0].object.visible=!0;let n,o;for(n=1,o=e.length;n<o;n++){let a=e[n].distance;if(e[n].object.visible&&(a-=a*e[n].hysteresis),i>=a)e[n-1].object.visible=!1,e[n].object.visible=!0;else break}for(this._currentLevel=n-1;n<o;n++)e[n].object.visible=!1}}toJSON(t){const e=super.toJSON(t);this.autoUpdate===!1&&(e.object.autoUpdate=!1),e.object.levels=[];const i=this.levels;for(let n=0,o=i.length;n<o;n++){const a=i[n];e.object.levels.push({object:a.object.uuid,distance:a.distance,hysteresis:a.hysteresis})}return e}}class Zl extends Xi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new te(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Fr=new P,Br=new P,Gr=new se,bo=new Dl,bs=new qn;class _0 extends ce{constructor(t=new We,e=new Zl){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let n=1,o=e.count;n<o;n++)Fr.fromBufferAttribute(e,n-1),Br.fromBufferAttribute(e,n),i[n]=i[n-1],i[n]+=Fr.distanceTo(Br);t.setAttribute("lineDistance",new He(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,n=this.matrixWorld,o=t.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),bs.copy(i.boundingSphere),bs.applyMatrix4(n),bs.radius+=o,t.ray.intersectsSphere(bs)===!1)return;Gr.copy(n).invert(),bo.copy(t.ray).applyMatrix4(Gr);const r=o/((this.scale.x+this.scale.y+this.scale.z)/3),l=r*r,c=new P,h=new P,d=new P,u=new P,f=this.isLineSegments?2:1,g=i.index,m=i.attributes.position;if(g!==null){const p=Math.max(0,a.start),A=Math.min(g.count,a.start+a.count);for(let x=p,b=A-1;x<b;x+=f){const L=g.getX(x),T=g.getX(x+1);if(c.fromBufferAttribute(m,L),h.fromBufferAttribute(m,T),bo.distanceSqToSegment(c,h,u,d)>l)continue;u.applyMatrix4(this.matrixWorld);const R=t.ray.origin.distanceTo(u);R<t.near||R>t.far||e.push({distance:R,point:d.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}else{const p=Math.max(0,a.start),A=Math.min(m.count,a.start+a.count);for(let x=p,b=A-1;x<b;x+=f){if(c.fromBufferAttribute(m,x),h.fromBufferAttribute(m,x+1),bo.distanceSqToSegment(c,h,u,d)>l)continue;u.applyMatrix4(this.matrixWorld);const T=t.ray.origin.distanceTo(u);T<t.near||T>t.far||e.push({distance:T,point:d.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,a=n.length;o<a;o++){const r=n[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[r]=o}}}}}class Re extends Fe{constructor(t,e,i,n,o,a,r,l,c){super(t,e,i,n,o,a,r,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class y0{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,n=this.getPoint(0),o=0;e.push(0);for(let a=1;a<=t;a++)i=this.getPoint(a/t),o+=i.distanceTo(n),e.push(o),n=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const i=this.getLengths();let n=0;const o=i.length;let a;e?a=e:a=t*i[o-1];let r=0,l=o-1,c;for(;r<=l;)if(n=Math.floor(r+(l-r)/2),c=i[n]-a,c<0)r=n+1;else if(c>0)l=n-1;else{l=n;break}if(n=l,i[n]===a)return n/(o-1);const h=i[n],u=i[n+1]-h,f=(a-h)/u;return(n+f)/(o-1)}getTangent(t,e){let n=t-1e-4,o=t+1e-4;n<0&&(n=0),o>1&&(o=1);const a=this.getPoint(n),r=this.getPoint(o),l=e||(a.isVector2?new Xt:new P);return l.copy(r).sub(a).normalize(),l}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e){const i=new P,n=[],o=[],a=[],r=new P,l=new se;for(let f=0;f<=t;f++){const g=f/t;n[f]=this.getTangentAt(g,new P)}o[0]=new P,a[0]=new P;let c=Number.MAX_VALUE;const h=Math.abs(n[0].x),d=Math.abs(n[0].y),u=Math.abs(n[0].z);h<=c&&(c=h,i.set(1,0,0)),d<=c&&(c=d,i.set(0,1,0)),u<=c&&i.set(0,0,1),r.crossVectors(n[0],i).normalize(),o[0].crossVectors(n[0],r),a[0].crossVectors(n[0],o[0]);for(let f=1;f<=t;f++){if(o[f]=o[f-1].clone(),a[f]=a[f-1].clone(),r.crossVectors(n[f-1],n[f]),r.length()>Number.EPSILON){r.normalize();const g=Math.acos(be(n[f-1].dot(n[f]),-1,1));o[f].applyMatrix4(l.makeRotationAxis(r,g))}a[f].crossVectors(n[f],o[f])}if(e===!0){let f=Math.acos(be(o[0].dot(o[t]),-1,1));f/=t,n[0].dot(r.crossVectors(o[0],o[t]))>0&&(f=-f);for(let g=1;g<=t;g++)o[g].applyMatrix4(l.makeRotationAxis(n[g],f*g)),a[g].crossVectors(n[g],o[g])}return{tangents:n,normals:o,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}function la(){let s=0,t=0,e=0,i=0;function n(o,a,r,l){s=o,t=r,e=-3*o+3*a-2*r-l,i=2*o-2*a+r+l}return{initCatmullRom:function(o,a,r,l,c){n(a,r,c*(r-o),c*(l-a))},initNonuniformCatmullRom:function(o,a,r,l,c,h,d){let u=(a-o)/c-(r-o)/(c+h)+(r-a)/h,f=(r-a)/h-(l-a)/(h+d)+(l-r)/d;u*=h,f*=h,n(a,r,u,f)},calc:function(o){const a=o*o,r=a*o;return s+t*o+e*a+i*r}}}const Ts=new P,To=new la,Ao=new la,Co=new la;class v0 extends y0{constructor(t=[],e=!1,i="centripetal",n=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=n}getPoint(t,e=new P){const i=e,n=this.points,o=n.length,a=(o-(this.closed?0:1))*t;let r=Math.floor(a),l=a-r;this.closed?r+=r>0?0:(Math.floor(Math.abs(r)/o)+1)*o:l===0&&r===o-1&&(r=o-2,l=1);let c,h;this.closed||r>0?c=n[(r-1)%o]:(Ts.subVectors(n[0],n[1]).add(n[0]),c=Ts);const d=n[r%o],u=n[(r+1)%o];if(this.closed||r+2<o?h=n[(r+2)%o]:(Ts.subVectors(n[o-1],n[o-2]).add(n[o-1]),h=Ts),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(d),f),M=Math.pow(d.distanceToSquared(u),f),m=Math.pow(u.distanceToSquared(h),f);M<1e-4&&(M=1),g<1e-4&&(g=M),m<1e-4&&(m=M),To.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,g,M,m),Ao.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,g,M,m),Co.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,g,M,m)}else this.curveType==="catmullrom"&&(To.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),Ao.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),Co.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return i.set(To.calc(l),Ao.calc(l),Co.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const n=t.points[e];this.points.push(n.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const n=this.points[e];t.points.push(n.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const n=t.points[e];this.points.push(new P().fromArray(n))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}class Wi extends We{constructor(t=1,e=1,i=1,n=32,o=1,a=!1,r=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:n,heightSegments:o,openEnded:a,thetaStart:r,thetaLength:l};const c=this;n=Math.floor(n),o=Math.floor(o);const h=[],d=[],u=[],f=[];let g=0;const M=[],m=i/2;let p=0;A(),a===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new He(d,3)),this.setAttribute("normal",new He(u,3)),this.setAttribute("uv",new He(f,2));function A(){const b=new P,L=new P;let T=0;const _=(e-t)/i;for(let R=0;R<=o;R++){const y=[],w=R/o,I=w*(e-t)+t;for(let z=0;z<=n;z++){const j=z/n,C=j*l+r,D=Math.sin(C),G=Math.cos(C);L.x=I*D,L.y=-w*i+m,L.z=I*G,d.push(L.x,L.y,L.z),b.set(D,_,G).normalize(),u.push(b.x,b.y,b.z),f.push(j,1-w),y.push(g++)}M.push(y)}for(let R=0;R<n;R++)for(let y=0;y<o;y++){const w=M[y][R],I=M[y+1][R],z=M[y+1][R+1],j=M[y][R+1];h.push(w,I,j),h.push(I,z,j),T+=6}c.addGroup(p,T,0),p+=T}function x(b){const L=g,T=new Xt,_=new P;let R=0;const y=b===!0?t:e,w=b===!0?1:-1;for(let z=1;z<=n;z++)d.push(0,m*w,0),u.push(0,w,0),f.push(.5,.5),g++;const I=g;for(let z=0;z<=n;z++){const C=z/n*l+r,D=Math.cos(C),G=Math.sin(C);_.x=y*G,_.y=m*w,_.z=y*D,d.push(_.x,_.y,_.z),u.push(0,w,0),T.x=D*.5+.5,T.y=G*.5*w+.5,f.push(T.x,T.y),g++}for(let z=0;z<n;z++){const j=L+z,C=I+z;b===!0?h.push(C,C+1,j):h.push(C+1,C,j),R+=3}c.addGroup(p,R,b===!0?1:2),p+=R}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wi(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Wn extends Wi{constructor(t=1,e=1,i=32,n=1,o=!1,a=0,r=Math.PI*2){super(0,t,e,i,n,o,a,r),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:n,openEnded:o,thetaStart:a,thetaLength:r}}static fromJSON(t){return new Wn(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class S0 extends oi{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class zt extends Xi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new te(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new te(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Al,this.normalScale=new Xt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class $n extends ce{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new te(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}class w0 extends $n{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ce.DEFAULT_UP),this.updateMatrix(),this.groundColor=new te(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Ro=new se,Or=new P,kr=new P;class ca{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Xt(512,512),this.map=null,this.mapPass=null,this.matrix=new se,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Tn,this._frameExtents=new Xt(1,1),this._viewportCount=1,this._viewports=[new he(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;Or.setFromMatrixPosition(t.matrixWorld),e.position.copy(Or),kr.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(kr),e.updateMatrixWorld(),Ro.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ro),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Ro)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class E0 extends ca{constructor(){super(new Ue(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){const e=this.camera,i=wn*2*t.angle*this.focus,n=this.mapSize.width/this.mapSize.height,o=t.distance||e.far;(i!==e.fov||n!==e.aspect||o!==e.far)&&(e.fov=i,e.aspect=n,e.far=o,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class Vr extends $n{constructor(t,e,i=0,n=Math.PI/3,o=0,a=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ce.DEFAULT_UP),this.updateMatrix(),this.target=new ce,this.distance=i,this.angle=n,this.penumbra=o,this.decay=a,this.map=null,this.shadow=new E0}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const Hr=new se,Fn=new P,Po=new P;class b0 extends ca{constructor(){super(new Ue(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Xt(4,2),this._viewportCount=6,this._viewports=[new he(2,1,1,1),new he(0,1,1,1),new he(3,1,1,1),new he(1,1,1,1),new he(3,0,1,1),new he(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(t,e=0){const i=this.camera,n=this.matrix,o=t.distance||i.far;o!==i.far&&(i.far=o,i.updateProjectionMatrix()),Fn.setFromMatrixPosition(t.matrixWorld),i.position.copy(Fn),Po.copy(i.position),Po.add(this._cubeDirections[e]),i.up.copy(this._cubeUps[e]),i.lookAt(Po),i.updateMatrixWorld(),n.makeTranslation(-Fn.x,-Fn.y,-Fn.z),Hr.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Hr)}}class Ps extends $n{constructor(t,e,i=0,n=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=n,this.shadow=new b0}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class T0 extends ca{constructor(){super(new oa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class A0 extends $n{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ce.DEFAULT_UP),this.updateMatrix(),this.target=new ce,this.shadow=new T0}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class C0 extends $n{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class Kl{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Wr(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Wr();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Wr(){return(typeof performance>"u"?Date:performance).now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Qo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Qo);function ee(s,t=!1){const e=s[0].index!==null,i=new Set(Object.keys(s[0].attributes)),n=new Set(Object.keys(s[0].morphAttributes)),o={},a={},r=s[0].morphTargetsRelative,l=new We;let c=0;for(let h=0;h<s.length;++h){const d=s[h];let u=0;if(e!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in d.attributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;o[f]===void 0&&(o[f]=[]),o[f].push(d.attributes[f]),u++}if(u!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(r!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in d.morphAttributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(d.morphAttributes[f])}if(t){let f;if(e)f=d.index.count;else if(d.attributes.position!==void 0)f=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(e){let h=0;const d=[];for(let u=0;u<s.length;++u){const f=s[u].index;for(let g=0;g<f.count;++g)d.push(f.getX(g)+h);h+=s[u].attributes.position.count}l.setIndex(d)}for(const h in o){const d=Xr(o[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,d)}for(const h in a){const d=a[h][0].length;if(d===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let u=0;u<d;++u){const f=[];for(let M=0;M<a[h].length;++M)f.push(a[h][M][u]);const g=Xr(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}return l}function Xr(s){let t,e,i,n=-1,o=0;for(let c=0;c<s.length;++c){const h=s[c];if(h.isInterleavedBufferAttribute)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. InterleavedBufferAttributes are not supported."),null;if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=h.normalized),i!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(n===-1&&(n=h.gpuType),n!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;o+=h.array.length}const a=new t(o);let r=0;for(let c=0;c<s.length;++c)a.set(s[c].array,r),r+=s[c].array.length;const l=new Ke(a,e,i);return n!==void 0&&(l.gpuType=n),l}const R0={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class jn{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const P0=new oa(-1,1,1,-1,0,1);class L0 extends We{constructor(){super(),this.setAttribute("position",new He([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new He([0,2,0,0,2,0],2))}}const I0=new L0;class Jl{constructor(t){this._mesh=new Q(I0,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,P0)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class D0 extends jn{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof oi?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=sa.clone(t.uniforms),this.material=new oi({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new Jl(this.material)}render(t,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class qr extends jn{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,i){const n=t.getContext(),o=t.state;o.buffers.color.setMask(!1),o.buffers.depth.setMask(!1),o.buffers.color.setLocked(!0),o.buffers.depth.setLocked(!0);let a,r;this.inverse?(a=0,r=1):(a=1,r=0),o.buffers.stencil.setTest(!0),o.buffers.stencil.setOp(n.REPLACE,n.REPLACE,n.REPLACE),o.buffers.stencil.setFunc(n.ALWAYS,a,4294967295),o.buffers.stencil.setClear(r),o.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),o.buffers.color.setLocked(!1),o.buffers.depth.setLocked(!1),o.buffers.color.setMask(!0),o.buffers.depth.setMask(!0),o.buffers.stencil.setLocked(!1),o.buffers.stencil.setFunc(n.EQUAL,1,4294967295),o.buffers.stencil.setOp(n.KEEP,n.KEEP,n.KEEP),o.buffers.stencil.setLocked(!0)}}class U0 extends jn{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class N0{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const i=t.getSize(new Xt);this._width=i.width,this._height=i.height,e=new Ri(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:vn}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new D0(R0),this.copyPass.material.blending=mi,this.clock=new Kl}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let i=!1;for(let n=0,o=this.passes.length;n<o;n++){const a=this.passes[n];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(n),a.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),a.needsSwap){if(i){const r=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(r.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(r.EQUAL,1,4294967295)}this.swapBuffers()}qr!==void 0&&(a instanceof qr?i=!0:a instanceof U0&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new Xt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const i=this._width*this._pixelRatio,n=this._height*this._pixelRatio;this.renderTarget1.setSize(i,n),this.renderTarget2.setSize(i,n);for(let o=0;o<this.passes.length;o++)this.passes[o].setSize(i,n)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class z0 extends jn{constructor(t,e,i=null,n=null,o=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=i,this.clearColor=n,this.clearAlpha=o,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new te}render(t,e,i){const n=t.autoClear;t.autoClear=!1;let o,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor)),this.clearAlpha!==null&&(o=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(o),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),t.autoClear=n}}const F0={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class B0 extends jn{constructor(){super();const t=F0;this.uniforms=sa.clone(t.uniforms),this.material=new S0({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new Jl(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},ne.getTransfer(this._outputColorSpace)===le&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===pl?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===ml?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===gl?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===ta?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Ml&&(this.material.defines.AGX_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}function G0(){const s=document.createElement("canvas");s.width=64,s.height=64;const t=s.getContext("2d"),e=t.createRadialGradient(32,32,0,32,32,30);return e.addColorStop(0,"rgba(255, 250, 220, 1)"),e.addColorStop(.15,"rgba(255, 180, 50, 0.8)"),e.addColorStop(.4,"rgba(255, 100, 20, 0.2)"),e.addColorStop(1,"rgba(0, 0, 0, 0)"),t.fillStyle=e,t.fillRect(0,0,64,64),t.strokeStyle="rgba(255, 200, 150, 0.45)",t.lineWidth=2.5,t.beginPath(),t.moveTo(0,32),t.lineTo(64,32),t.stroke(),new Re(s)}function O0(){const s=document.createElement("canvas");s.width=64,s.height=64;const t=s.getContext("2d");t.clearRect(0,0,64,64);const e=t.createLinearGradient(0,0,64,0);e.addColorStop(0,"rgba(10, 10, 12, 0.0)"),e.addColorStop(.18,"rgba(10, 10, 12, 0.85)"),e.addColorStop(.35,"rgba(10, 10, 12, 0.50)"),e.addColorStop(.52,"rgba(10, 10, 12, 0.85)"),e.addColorStop(.82,"rgba(10, 10, 12, 0.0)"),t.fillStyle=e,t.fillRect(0,0,64,64);const i=t.getImageData(0,0,64,64);for(let o=0;o<i.data.length;o+=4)if(i.data[o+3]>0){const a=(Math.random()-.5)*55;i.data[o+3]=Math.max(0,Math.min(255,i.data[o+3]+a))}t.putImageData(i,0,0);const n=new Re(s);return n.wrapS=Ve,n.wrapT=Ve,n.minFilter=yn,n.magFilter=De,n.generateMipmaps=!0,n}function k0(){const s=document.createElement("canvas");s.width=64,s.height=64;const t=s.getContext("2d"),e=t.createRadialGradient(32,32,0,32,32,30);return e.addColorStop(0,"rgba(255, 255, 255, 1)"),e.addColorStop(.12,"rgba(0, 240, 255, 1)"),e.addColorStop(.4,"rgba(0, 80, 255, 0.45)"),e.addColorStop(1,"rgba(0, 0, 0, 0)"),t.fillStyle=e,t.fillRect(0,0,64,64),t.strokeStyle="rgba(150, 230, 255, 0.8)",t.lineWidth=2,t.beginPath(),t.moveTo(12,32),t.lineTo(52,32),t.moveTo(32,12),t.lineTo(32,52),t.stroke(),new Re(s)}const As={},Bn=new P,Yr=new se,Gn=new P,$r=new Ie;function V0(s){if(As[s])return As[s];const t=[];let e,i,n=2.11,o=-2.11,a=1.3,r=-1.3;if(s==="sports"){const C=new H(.14,.2,2.6);C.translate(-.84,.22,0),t.push(C);const D=new H(.14,.2,2.6);D.translate(.84,.22,0),t.push(D);const G=new H(1.6,.2,1.4);G.translate(0,.425,1.3),t.push(G);const O=new H(1.7,.3,.4);O.translate(0,.375,2),t.push(O);const X=new H(.12,.36,1);X.translate(-.84,.455,1.3),t.push(X);const J=new H(.12,.36,1);J.translate(.84,.455,1.3),t.push(J);const ot=new H(.12,.36,1);ot.translate(-.84,.455,-1.3),t.push(ot);const lt=new H(.12,.36,1);lt.translate(.84,.455,-1.3),t.push(lt);const ct=new H(1.58,.4,2.6);ct.translate(0,.325,0),t.push(ct);const K=new H(1.6,.28,1.1);K.translate(0,.465,-1.55),t.push(K);const it=new H(1.72,.28,.3);it.translate(0,.375,-2.15),t.push(it);const gt=new H(1.48,.08,1.9);gt.translate(0,.945,-.2),t.push(gt);const Z=new H(.08,.42,.08);Z.translate(-.7,.735,.7),t.push(Z);const at=new H(.08,.42,.08);at.translate(.7,.735,.7),t.push(at);const dt=new H(.08,.42,.08);dt.translate(-.7,.735,-1.1),t.push(dt);const St=new H(.08,.42,.08);St.translate(.7,.735,-1.1),t.push(St);const yt=new H(.22,.14,.14);yt.translate(-.89,.72,.58),t.push(yt);const Tt=new H(.22,.14,.14);Tt.translate(.89,.72,.58),t.push(Tt)}else if(s==="pickup"){n=2.21,o=-2.21,a=1.4,r=-1.4,e=new H(1.8,.5,4.4),e.translate(0,.4,0),t.push(e),i=new H(1.5,.55,1.6),i.translate(0,.925,.4),t.push(i);const C=new H(.12,.45,2);C.translate(.84,.875,-1.1),t.push(C);const D=new H(.12,.45,2);D.translate(-.84,.875,-1.1),t.push(D);const G=new H(1.56,.45,.12);G.translate(0,.875,-2.14),t.push(G)}else s==="van"?(n=2.21,o=-2.21,a=1.4,r=-1.4,e=new H(1.85,.5,4.4),e.translate(0,.4,0),t.push(e),i=new H(1.6,.9,3.4),i.translate(0,1.1,-.3),t.push(i)):s==="cop"?(n=2.21,o=-2.21,a=1.4,r=-1.4,e=new H(1.85,.48,4.4),e.translate(0,.39,0),t.push(e)):(n=2.21,o=-2.21,a=1.4,r=-1.4,e=new H(1.8,.45,4.2),e.translate(0,.35,0),t.push(e),s==="suv"?(i=new H(1.6,.7,2.6),i.translate(0,.925,-.4)):(i=new H(1.5,.5,2.2),i.translate(0,.8,-.3)),t.push(i));const l=ee(t),c=[];if(s==="sports"){const C=new H(1.4,.4,.05);C.rotateX(Math.PI/5),C.translate(0,.735,.7),c.push(C);const D=new H(1.4,.38,.05);D.rotateX(-Math.PI/6),D.translate(0,.735,-1.1),c.push(D);const G=new H(.02,.32,1.6);G.translate(.76,.735,-.2),c.push(G);const O=new H(.02,.32,1.6);O.translate(-.76,.735,-.2),c.push(O)}else if(s==="pickup"){const C=new H(1.4,.5,.05);C.rotateX(Math.PI/6),C.translate(0,.925,1.15),c.push(C);const D=new H(1.4,.45,.05);D.translate(0,.925,-.38),c.push(D);const G=new H(.02,.45,1.2);G.translate(.76,.925,.4),c.push(G);const O=new H(.02,.45,1.2);O.translate(-.76,.925,.4),c.push(O)}else if(s==="van"){const C=new H(1.5,.7,.05);C.rotateX(Math.PI/5),C.translate(0,1.1,1.35),c.push(C);const D=new H(1.5,.6,.05);D.translate(0,1.25,-1.95),c.push(D);const G=new H(.02,.5,1);G.translate(.81,1.15,.7),c.push(G);const O=new H(.02,.5,1);O.translate(-.81,1.15,.7),c.push(O);const X=new H(.02,.4,1.4);X.translate(.81,1.2,-.9),c.push(X);const J=new H(.02,.4,1.4);J.translate(-.81,1.2,-.9),c.push(J)}else{const C=s==="suv"||s==="cop",D=C?.925:.8,G=C?1.5:1.4,O=C?s==="cop"?2.3:2.2:1.8,X=C?-.4:-.3,J=new H(G,C?.6:.45,.05);J.rotateX(Math.PI/6),J.translate(0,D,X+(C?1.2:1.1)),c.push(J);const ot=new H(G,C?.55:.42,.05);ot.rotateX(-Math.PI/8),ot.translate(0,D,X-(C?1.2:1.1)),c.push(ot);const lt=new H(.02,C?.55:.38,O);lt.translate(C?.81:.76,D,X),c.push(lt);const ct=new H(.02,C?.55:.38,O);ct.translate(C?-.81:-.76,D,X),c.push(ct)}const h=ee(c),d=[];if(s==="sports"){const C=new H(.5,.1,.6);C.translate(0,.96,-.2),d.push(C);const D=new H(.08,.45,.15);D.translate(-.65,.725,-1.8),d.push(D);const G=new H(.08,.45,.15);G.translate(.65,.725,-1.8),d.push(G);const O=new H(1.85,.06,.5);O.translate(0,.95,-1.8),d.push(O)}else if(s==="pickup"){const C=new H(.08,.55,.08);C.translate(-.7,.95,-.3),d.push(C);const D=new H(.08,.55,.08);D.translate(.7,.95,-.3),d.push(D);const G=new H(1.48,.08,.08);G.translate(0,1.2,-.3),d.push(G)}else if(s==="van"){const C=new H(.05,.05,2.8);C.translate(-.6,1.58,-.3),d.push(C);const D=new H(.05,.05,2.8);D.translate(.6,1.58,-.3),d.push(D);for(let G=-1.2;G<=.8;G+=.8){const O=new H(1.25,.03,.05);O.translate(0,1.58,G),d.push(O)}}else if(s==="cop"){const C=new H(.01,.01,.01);C.translate(0,-10,0),d.push(C)}else{const C=new H(1.6,.05,.15);C.translate(0,.6,-1.95),d.push(C)}const u=ee(d),f=[],g=new H(.25,.12,.1);g.translate(-.65,s==="sports"?.35:s==="van"||s==="pickup"?.45:.4,n+.01),f.push(g);const M=new H(.25,.12,.1);M.translate(.65,s==="sports"?.35:s==="van"||s==="pickup"?.45:.4,n+.01),f.push(M);const m=ee(f),p=[],A=new H(.25,.12,.1);A.translate(-.65,s==="sports"?.36:s==="van"||s==="pickup"?.47:.42,o-.01),p.push(A);const x=new H(.25,.12,.1);x.translate(.65,s==="sports"?.36:s==="van"||s==="pickup"?.47:.42,o-.01),p.push(x);const b=ee(p);let L=null,T=null,_=null;if(s==="sports"||s==="cop")if(L=new H(1.2,.16,.05),L.translate(0,.28,n+.05),s==="sports"){const C=new Wi(.08,.08,.4,8);C.rotateX(Math.PI/2),C.translate(-.48,.18,o-.15);const D=new Wi(.08,.08,.4,8);D.rotateX(Math.PI/2),D.translate(.48,.18,o-.15),T=ee([C,D])}else s==="cop"&&(_=new H(1.2,.38,.12),_.translate(0,.34,n+.12));let R=null,y=null,w=null,I=null,z=null,j=null;return s==="cop"&&(R=new H(1.6,.65,2.4),R.translate(0,.925,-.3),y=new H(.02,.5,1.8),y.translate(.93,.55,-.3),w=new H(.02,.5,1.8),w.translate(-.93,.55,-.3),I=new H(1.2,.12,.3),I.translate(0,1.25,-.3),z=new H(.4,.15,.28),z.translate(-.35,1.35,-.3),j=new H(.4,.15,.28),j.translate(.35,1.35,-.3)),As[s]={bodyGeo:l,glassGeo:h,carbonGeo:u,headlampsGeo:m,taillightsGeo:b,grilleGeo:L,exhaustGeo:T,bullBarGeo:_,copCabinGeo:R,copLeftDoorGeo:y,copRightDoorGeo:w,copSirenBarGeo:I,copSirenBlueGeo:z,copSirenRedGeo:j,frontZ:n,backZ:o,wheelZFront:a,wheelZRear:r},As[s]}function H0(s,t="sports",e=null){const i=new Vt,n=new zt({color:s,roughness:.15,metalness:.8}),o=new zt({color:1973790,roughness:.6,metalness:.3}),a=new zt({color:1381653,roughness:.85}),r=new zt({color:13938487,roughness:.2,metalness:.9}),l=new zt({color:1119778,roughness:.1,metalness:.9}),c=new fe({color:16776404}),h=new fe({color:13373713}),d=V0(t),u=new Q(d.bodyGeo.clone(),n);u.name="carBody",u.castShadow=!0,u.receiveShadow=!0,i.add(u);const f=new Q(d.glassGeo.clone(),l);f.name="glass",i.add(f);const g=new Q(d.carbonGeo.clone(),o);g.castShadow=!0,g.name="carbon",i.add(g);const M=new Q(d.headlampsGeo.clone(),c);if(M.name="headlamps",i.add(M),e){const _=new $e({map:e,color:16774102,transparent:!0,opacity:0,blending:xe,depthWrite:!1}),R=new Ne(_);R.position.set(-.65,t==="sports"?.35:t==="van"||t==="pickup"?.45:.4,d.frontZ+.05),R.scale.set(3.4,.7,1),R.name="leftHeadlightSprite",i.add(R);const y=new $e({map:e,color:16774102,transparent:!0,opacity:0,blending:xe,depthWrite:!1}),w=new Ne(y);w.position.set(.65,t==="sports"?.35:t==="van"||t==="pickup"?.45:.4,d.frontZ+.05),w.scale.set(3.4,.7,1),w.name="rightHeadlightSprite",i.add(w)}const m=new Q(d.taillightsGeo.clone(),h);if(m.name="taillights",i.add(m),d.grilleGeo){const _=new Q(d.grilleGeo.clone(),o);_.name="grille",i.add(_)}if(d.exhaustGeo){const _=new Q(d.exhaustGeo.clone(),r);_.castShadow=!0,_.name="exhaust",i.add(_)}if(d.bullBarGeo){const _=new Q(d.bullBarGeo.clone(),o);_.castShadow=!0,_.name="bullBar",i.add(_)}if(t==="cop"){const _=new zt({color:15658734,roughness:.15,metalness:.7}),R=new Q(d.copCabinGeo.clone(),_);R.castShadow=!0,R.receiveShadow=!0,R.name="copCabin",i.add(R);const y=new Q(d.copLeftDoorGeo.clone(),_);y.castShadow=!0,y.name="copLeftDoor",i.add(y);const w=new Q(d.copRightDoorGeo.clone(),_);w.castShadow=!0,w.name="copRightDoor",i.add(w);const I=new Q(d.copSirenBarGeo.clone(),o);I.castShadow=!0,I.name="copSirenBar",i.add(I);const z=new zt({color:8959,emissive:8959,emissiveIntensity:.1,roughness:.1}),j=new Q(d.copSirenBlueGeo.clone(),z);j.name="sirenBlue",i.add(j);const C=new zt({color:16711714,emissive:16711714,emissiveIntensity:.1,roughness:.1}),D=new Q(d.copSirenRedGeo.clone(),C);D.name="sirenRed",i.add(D)}const p=new Wi(.42,.42,.45,12);p.rotateZ(Math.PI/2);const A=new Wi(.26,.26,.48,8);A.rotateZ(Math.PI/2);const x=[];[[-.95,.25,d.wheelZFront],[.95,.25,d.wheelZFront],[-.95,.25,d.wheelZRear],[.95,.25,d.wheelZRear]].forEach(([_,R,y])=>{const w=new Vt;w.position.set(_,R,y);const I=new Q(p,a);I.castShadow=!0,w.add(I);const z=new Q(A,r);w.add(z),i.add(w),x.push(w)});const L=new fe({map:W0(),transparent:!0,opacity:.35,blending:xe,depthWrite:!1}),T=new Q(X0().clone(),L);return T.name="headlightPool",i.add(T),{carGroup:i,wheels:x}}let Lo=null,On=null;function W0(){if(!Lo){const s=document.createElement("canvas");s.width=128,s.height=256;const t=s.getContext("2d"),e=t.createImageData(128,256);for(let i=0;i<256;i++){const n=i/255,o=.15+n*.75;for(let a=0;a<128;a++){const r=a/127,l=Math.abs(r-.5),c=Math.max(0,1-l/o);let h=0;n<.1?h=n/.1:h=Math.max(0,1-(n-.1)/.9);const d=Math.pow(c,1.6)*Math.pow(h,1.3),u=(i*128+a)*4;e.data[u]=255,e.data[u+1]=250,e.data[u+2]=230,e.data[u+3]=Math.round(d*255)}}t.putImageData(e,0,0),Lo=new Re(s)}return Lo}function X0(){return On||(On=new bi(12,24,2,8),On.rotateX(-Math.PI/2),On.translate(0,.02,12)),On}function q0(s,t,e,i){const n=s.getObjectByName("carBody");if(n&&n.geometry){const o=n.geometry,a=o.attributes.position;if(!a)return;Bn.copy(t),Yr.copy(n.matrixWorld).invert(),Bn.applyMatrix4(Yr),Gn.copy(i).normalize(),$r.copy(n.quaternion).invert(),Gn.applyQuaternion($r);const r=Math.min(.48,e*.0125),l=1.5+Math.random()*.6,c=l*l;let h=!1;for(let d=0;d<a.count;d++){const u=a.getX(d),f=a.getY(d),g=a.getZ(d),M=u-Bn.x;if(Math.abs(M)>=l)continue;const m=f-Bn.y;if(Math.abs(m)>=l)continue;const p=g-Bn.z;if(Math.abs(p)>=l)continue;const A=M*M+m*m+p*p;if(A<c){const b=1-Math.sqrt(A)/l,L=b*b*r;a.setXYZ(d,u+Gn.x*L,f+Gn.y*L,g+Gn.z*L),h=!0}}h&&(a.needsUpdate=!0,o.computeVertexNormals())}}function Y0(){const s=document.createElement("canvas");s.width=128,s.height=128;const t=s.getContext("2d"),e=t.createRadialGradient(64,64,0,64,64,60);e.addColorStop(0,"rgba(255, 255, 255, 1.0)"),e.addColorStop(.08,"rgba(255, 255, 255, 0.85)"),e.addColorStop(.22,"rgba(255, 255, 255, 0.35)"),e.addColorStop(.55,"rgba(255, 255, 255, 0.08)"),e.addColorStop(1,"rgba(0, 0, 0, 0)"),t.fillStyle=e,t.fillRect(0,0,128,128);const i=t.createLinearGradient(0,64,128,64);return i.addColorStop(0,"rgba(255, 255, 255, 0)"),i.addColorStop(.5,"rgba(255, 255, 255, 0.35)"),i.addColorStop(1,"rgba(255, 255, 255, 0)"),t.fillStyle=i,t.fillRect(0,62,128,4),new Re(s)}function $0(){const s=document.createElement("canvas");s.width=256,s.height=256;const t=s.getContext("2d"),e=t.createRadialGradient(128,128,0,128,128,120);return e.addColorStop(0,"rgba(255, 255, 255, 0.7)"),e.addColorStop(.15,"rgba(255, 255, 255, 0.45)"),e.addColorStop(.4,"rgba(255, 255, 255, 0.15)"),e.addColorStop(.8,"rgba(255, 255, 255, 0.02)"),e.addColorStop(1,"rgba(0, 0, 0, 0)"),t.fillStyle=e,t.fillRect(0,0,256,256),new Re(s)}function j0(){const s=document.createElement("canvas");s.width=512,s.height=512;const t=s.getContext("2d"),e=document.createElement("canvas");e.width=512,e.height=512;const i=e.getContext("2d");t.fillStyle="#838087",t.fillRect(0,0,512,512),i.fillStyle="#b0b0b0",i.fillRect(0,0,512,512);const n=t.getImageData(0,0,512,512),o=n.data,a=i.getImageData(0,0,512,512),r=a.data;for(let h=0;h<512;h++)for(let d=0;d<512;d++){const u=(h*512+d)*4,f=(Math.random()-.5)*12;o[u]=Math.max(0,Math.min(255,o[u]+f)),o[u+1]=Math.max(0,Math.min(255,o[u+1]+f)),o[u+2]=Math.max(0,Math.min(255,o[u+2]+f));const g=128+(Math.random()-.5)*22;r[u]=Math.max(0,Math.min(255,g))}t.putImageData(n,0,0),i.putImageData(a,0,0);const l=new Re(s);l.wrapS=Ve,l.wrapT=Ve;const c=new Re(e);return c.wrapS=Ve,c.wrapT=Ve,{map:l,roughnessMap:c}}function Z0(s=!0){const t=document.createElement("canvas");t.width=1024,t.height=1024;const e=t.getContext("2d"),i=document.createElement("canvas");i.width=1024,i.height=1024;const n=i.getContext("2d");e.fillStyle="#222226",e.fillRect(0,0,1024,1024),n.fillStyle="#ebebeb",n.fillRect(0,0,1024,1024);const o=document.createElement("canvas");o.width=1024,o.height=1024;const a=o.getContext("2d"),r=[];if(s){const m=1+Math.floor(Math.random()*2);for(let p=0;p<m;p++){const A=200+Math.random()*624,x=200+Math.random()*624,b=6+Math.floor(Math.random()*8);let L=A,T=x,_=60+Math.random()*70;for(let y=0;y<b;y++){r.push({x:L,y:T,r:_});const w=a.createRadialGradient(L,T,0,L,T,_);w.addColorStop(0,"rgba(0, 0, 0, 1)"),w.addColorStop(1,"rgba(0, 0, 0, 0)"),a.fillStyle=w,a.beginPath(),a.arc(L,T,_,0,Math.PI*2),a.fill();const I=Math.random()*Math.PI*2,z=_*(.35+Math.random()*.45);L+=Math.cos(I)*z,T+=Math.sin(I)*z,L=Math.max(100,Math.min(924,L)),T=Math.max(100,Math.min(924,T)),_*=.75+Math.random()*.4,_=Math.max(35,Math.min(150,_))}const R=1+Math.floor(Math.random()*3);for(let y=0;y<R;y++){const w=A+(Math.random()-.5)*350,I=x+(Math.random()-.5)*350,z=15+Math.random()*25;if(w>50&&w<974&&I>50&&I<974){r.push({x:w,y:I,r:z});const j=a.createRadialGradient(w,I,0,w,I,z);j.addColorStop(0,"rgba(0, 0, 0, 1)"),j.addColorStop(1,"rgba(0, 0, 0, 0)"),a.fillStyle=j,a.beginPath(),a.arc(w,I,z,0,Math.PI*2),a.fill()}}}}const c=a.getImageData(0,0,1024,1024).data,h=e.getImageData(0,0,1024,1024),d=h.data,u=n.getImageData(0,0,1024,1024),f=u.data;for(let m=0;m<1024;m++)for(let p=0;p<1024;p++){const A=(m*1024+p)*4,x=p+Math.sin(m*.04)*25+Math.cos(p*.09)*10+Math.sin((p+m)*.015)*12,b=m+Math.cos(p*.04)*25+Math.sin(m*.09)*10+Math.cos((p-m)*.015)*12,L=Math.max(0,Math.min(1023,Math.round(x))),_=(Math.max(0,Math.min(1023,Math.round(b)))*1024+L)*4,R=c[_+3];if(s&&R>120){d[A]=16,d[A+1]=16,d[A+2]=18,f[A+1]=10,f[A+2]=45;const y=Math.sin(p*.3)*15+Math.cos(m*.35)*15+Math.sin((p+m)*.15)*12+Math.cos((p-m)*.5)*6;f[A]=Math.max(0,Math.min(255,Math.round(128+y)))}else{const y=(Math.random()-.5)*10;d[A]=Math.max(0,Math.min(255,d[A]+y)),d[A+1]=Math.max(0,Math.min(255,d[A+1]+y)),d[A+2]=Math.max(0,Math.min(255,d[A+2]+y)),f[A+1]=235,f[A+2]=0;const w=(Math.random()-.5)*60;f[A]=Math.max(0,Math.min(255,128+w))}}e.putImageData(h,0,0),n.putImageData(u,0,0);const g=new Re(t);g.wrapS=Ve,g.wrapT=Ve,g.repeat.set(1,1);const M=new Re(i);return M.wrapS=Ve,M.wrapT=Ve,M.repeat.set(1,1),{map:g,roughnessMap:M,localCircles:s?r:null}}function K0(){const s=document.createElement("canvas");s.width=512,s.height=512;const t=s.getContext("2d"),e=document.createElement("canvas");e.width=512,e.height=512;const i=e.getContext("2d"),n=64;for(let r=0;r<8;r++)for(let l=0;l<8;l++){const c=l*n,h=r*n;t.fillStyle="#181822",t.fillRect(c,h,n,n),i.fillStyle="#000000",i.fillRect(c,h,n,n);const d=6,u=c+d,f=h+d,g=n-d*2,M=n-d*2,m=Math.random();let p="#0b0c10",A="#000000",x=!1;if(m<.35)p="#0a0b0e",A="#000000";else if(m<.8){const L=34+Math.floor(Math.random()*8);p=`hsl(${L}, 85%, 55%)`,A=`hsl(${L}, 85%, 50%)`,x=!0}else{const L=195+Math.floor(Math.random()*10);p=`hsl(${L}, 40%, 65%)`,A=`hsl(${L}, 40%, 60%)`,x=!0}t.fillStyle=p,t.fillRect(u,f,g,M),x&&(i.fillStyle=A,i.fillRect(u,f,g,M));const b=6;t.fillStyle="#181822",i.fillStyle="#000000",t.fillRect(u,f+M/2-b/2,g,b),i.fillRect(u,f+M/2-b/2,g,b),t.fillRect(u+g/2-b/2,f,b,M),i.fillRect(u+g/2-b/2,f,b,M)}const o=new Re(s);o.minFilter=ge,o.magFilter=ge;const a=new Re(e);return a.minFilter=ge,a.magFilter=ge,{map:o,emissiveMap:a}}function J0(){const s=document.createElement("canvas");s.width=1024,s.height=512;const t=s.getContext("2d"),e=t.createLinearGradient(0,0,0,256);e.addColorStop(0,"#0a0a14"),e.addColorStop(.5,"#0f0f22"),e.addColorStop(1,"#1a1a2e"),t.fillStyle=e,t.fillRect(0,0,1024,256),t.fillStyle="#0d0d12",t.fillRect(0,256,1024,256);const i=30,n=1024/i;for(let a=0;a<i;a++){const r=60+Math.random()*140,l=a*n,c=n*(.75+Math.random()*.4),h=256-r;t.fillStyle="#14141e",t.fillRect(l,h,c,r),t.strokeStyle="#222230",t.lineWidth=1.5,t.strokeRect(l,h,c,r),Math.random()>.5&&(t.beginPath(),t.moveTo(l+c/2,h),t.lineTo(l+c/2,h-15-Math.random()*20),t.stroke(),t.fillStyle="#ff3333",t.beginPath(),t.arc(l+c/2,h-15,2.5,0,Math.PI*2),t.fill());const d=2+Math.floor(Math.random()*3),u=5+Math.floor(Math.random()*6),f=c/(d*2.5),g=r/(u*2.5),M=l+(c-(d*2-1)*f)/2,m=h+(r-(u*2-1)*g)/2,p=Math.random(),A=p<.5?"#ffb300":p<.95?"#00e5ff":"#ffffff";for(let x=0;x<u;x++)for(let b=0;b<d;b++)if(Math.random()>.4){t.fillStyle=A;const L=M+b*2*f,T=m+x*2*g;t.fillRect(L,T,f,g)}if(Math.random()>.7){const x=["#ff0077","#39ff14","#00e5ff","#ffb300"][Math.floor(Math.random()*4)],b=c*.65,L=r*.18,T=l+(c-b)/2,_=h+r*.15;t.shadowColor=x,t.shadowBlur=10,t.fillStyle=x,t.fillRect(T,_,b,L),t.shadowBlur=0,t.fillStyle="#ffffff",t.fillRect(T+3,_+3,b-6,L-6),t.fillStyle="#111116",t.fillRect(T+4,_+4,b-8,L-8)}}for(let a=0;a<60;a++){const r=Math.random()*1024,l=Math.random()*220,c=Math.random();t.fillStyle=c>.7?"#ffd4b2":c>.4?"#c8e3ff":"#ffffff",t.beginPath(),t.arc(r,l,.5+Math.random()*.8,0,Math.PI*2),t.fill()}const o=new Re(s);return o.mapping=Is,o.colorSpace=we,o}function Ql(s,t,e){const i=(e+(Math.abs(s)+Math.abs(t))*.05)%12;return i<5?{xLight:"green",zLight:"red"}:i<6?{xLight:"yellow",zLight:"red"}:i<11?{xLight:"red",zLight:"green"}:{xLight:"red",zLight:"yellow"}}function ui(s){const t=s.attributes.uv,e=s.attributes.position;for(let i=0;i<t.count;i++){const n=e.getX(i),o=e.getZ(i);t.setXY(i,n*.25,o*.25)}t.needsUpdate=!0}function zi(s,t,e){const i=new H(s,t,e,Math.max(1,Math.round(s/2)),1,1),n=Math.floor(Math.random()*8),o=Math.floor(Math.random()*8),a=i.attributes.uv;for(let r=0;r<a.count;r++){const l=a.getX(r),c=a.getY(r),h=(n+l)/8,d=(o+c)/8;a.setXY(r,h,d)}return a.needsUpdate=!0,i}function Q0(){const s=new Vt,t=new zt({color:13378082,roughness:.4,metalness:.6}),e=new zt({color:14526976,roughness:.5,metalness:.7}),i=new Q(new H(.35,.7,.35),t);i.position.y=.35,i.castShadow=!0,s.add(i);const n=new Q(new H(.42,.1,.42),e);n.position.y=.75,s.add(n);const o=new Q(new H(.12,.15,.12),e);o.position.set(-.2,.45,0),s.add(o);const a=new Q(new H(.12,.15,.12),e);return a.position.set(.2,.45,0),s.add(a),s}function tm(){const s=new Vt,t=new zt({color:2051705,roughness:.5}),e=new zt({color:15661055,transparent:!0,opacity:.4,metalness:.9,roughness:.1}),i=new zt({color:15658734,roughness:.9}),n=new Q(new H(.8,1.1,.8),t);n.position.y=.55,n.castShadow=!0,n.receiveShadow=!0,s.add(n);const o=new Q(new H(.6,.4,.05),e);o.position.set(0,.75,.41),s.add(o);const a=new Q(new H(.5,.3,.5),i);return a.position.set(0,.35,.1),s.add(a),s}function em(s,t,e,i){const n=Math.sin(s*12.9898+t*78.233)*43758.5453,o=n-Math.floor(n);let a;o<.5?o<.1?a=this.templates.treeAutumn:o<.25?a=this.templates.treeCherry:a=this.templates.treeGreen:o>.9?a=this.templates.treeRoundAutumn:o>.75?a=this.templates.treeRoundCherry:a=this.templates.treeRoundGreen;const r=a.clone(),l=.7+o*.65;r.scale.set(l,l,l);const c=this.getBaseHeight(s,t);r.position.set(s,.35+c,t),e.add(r),i.push({xMin:s-.4*l,xMax:s+.4*l,zMin:t-.4*l,zMax:t+.4*l,height:6*l})}function im(){const s=new Vt,t=new Q(new H(2,.1,.8),this.benchWoodMat);t.position.set(0,-.1,0),t.castShadow=!0,t.receiveShadow=!0,s.add(t);const e=new Q(new H(2,.6,.1),this.benchWoodMat);e.position.set(0,.25,-.35),e.castShadow=!0,s.add(e);const i=new Q(new H(.1,.5,.8),this.benchIronMat);i.position.set(-.9,-.35,0),i.castShadow=!0,s.add(i);const n=new Q(new H(.1,.5,.8),this.benchIronMat);return n.position.set(.9,-.35,0),n.castShadow=!0,s.add(n),s}function nm(){const s=new Vt,t=new Q(new H(1.2,.15,1.2),this.phoneBoothFrameMat);t.position.set(0,-1.325,0),t.castShadow=!0,t.receiveShadow=!0,s.add(t);const e=new Q(new H(1.2,.15,1.2),this.phoneBoothFrameMat);e.position.set(0,1.325,0),e.castShadow=!0,s.add(e);const i=new H(.1,2.5,.1),n=new Q(i,this.phoneBoothFrameMat);n.position.set(-.55,0,-.55),n.castShadow=!0,s.add(n);const o=new Q(i,this.phoneBoothFrameMat);o.position.set(.55,0,-.55),o.castShadow=!0,s.add(o);const a=new Q(i,this.phoneBoothFrameMat);a.position.set(-.55,0,.55),a.castShadow=!0,s.add(a);const r=new Q(i,this.phoneBoothFrameMat);r.position.set(.55,0,.55),r.castShadow=!0,s.add(r);const l=new Q(new H(.04,2.3,1),this.phoneBoothGlassMat);l.position.set(-.54,0,0),s.add(l);const c=new Q(new H(.04,2.3,1),this.phoneBoothGlassMat);c.position.set(.54,0,0),s.add(c);const h=new Q(new H(1,2.3,.04),this.phoneBoothGlassMat);h.position.set(0,0,-.54),s.add(h);const d=new Q(new H(.3,.5,.2),this.benchIronMat);d.position.set(0,.1,-.4),s.add(d);const u=new Q(new H(.12,.12,.02),this.phoneBoothScreenMat);return u.position.set(0,.2,-.29),s.add(u),s}function sm(){const s=new Vt,t=new Q(new H(.6,.9,.6),this.trashCanMat);t.position.set(0,-.05,0),t.castShadow=!0,t.receiveShadow=!0,s.add(t);const e=new Q(new H(.64,.1,.64),this.trashCanLidMat);return e.position.set(0,.45,0),e.castShadow=!0,s.add(e),s}function om(s,t,e,i,n,o,a){const{rwX:r,rwZ:l}=this.getRoadWidthForGrid(s,t),c=this.roadColumns.has(s)&&this.roadRows.has(t),h=this.roadRows.has(t)?l:r,d=(this.tileSize-h)/2,u=Math.abs(s*17+t*23)%this.asphaltMaterials.length,f=this.asphaltMaterials[u],g=C=>{const D=Math.abs((s*.317+t*.713)%1),G=Math.abs((s*.893+t*.149)%1);C.traverse(O=>{if(O.isMesh&&(O.material===this.asphaltMat||this.asphaltMaterials.includes(O.material))){O.material=f,O.geometry=O.geometry.clone();const X=O.geometry.attributes.uv;for(let J=0;J<X.count;J++)X.setXY(J,X.getX(J)+D,X.getY(J)+G);X.needsUpdate=!0}})},M=[],m=[],p=[],A=[],x=[],b=[],L=[],T=[],_=[],R=(C,D)=>{const G=this.getBaseHeight(C,D),O=new H(.8,4,.8);O.translate(C,2.35+G,D),p.push(O);const X=Math.sin(C*12.9898+D*78.233)*43758.5453,J=X-Math.floor(X),ot=J>.85?"cherry":J>.7?"autumn":"normal";let lt=[];const ct=J*10%1;ct>.66?lt=[{size:3.6,y:3.5},{size:2.8,y:4.3},{size:2,y:5.1},{size:1.2,y:5.9}]:ct>.33?lt=[{size:3.5,y:4},{size:3.5,y:4.4},{size:2.8,y:5}]:lt=[{size:3.5,y:3.8},{size:2.8,y:4.8},{size:1.8,y:5.6}],lt.forEach(K=>{const it=new H(K.size,K.size*.85,K.size);it.translate(C,K.y+.35+G,D),ot==="cherry"?x.push(it):ot==="autumn"?b.push(it):A.push(it)}),o.push({xMin:C-.4,xMax:C+.4,zMin:D-.4,zMax:D+.4,height:6})},y=(C,D)=>{const G=this.getBaseHeight(C,D);if(Math.abs(G)>.1)return;const O=this.templates.fireHydrant.clone();O.position.set(C,.35+G,D),n.add(O),this.breakables.push({type:"hydrant",comHeight:.35,radius:.25,position:new P(C,.35+G,D),group:O,flares:[],lights:[],broken:!1,tileX:e,tileZ:i,velocity:new P,angularVelocity:new P})},w=(C,D,G)=>{const O=this.getBaseHeight(C,D),X=new H(.8,1.1,.8);X.translate(0,.55,0),X.rotateY(G),X.translate(C,.35+O,D),L.push(X);const J=new H(.6,.4,.05);J.translate(0,.75,.41),J.rotateY(G),J.translate(C,.35+O,D),T.push(J);const ot=new H(.5,.3,.5);ot.translate(0,.35,.1),ot.rotateY(G),ot.translate(C,.35+O,D),_.push(ot),o.push({xMin:C-.4,xMax:C+.4,zMin:D-.4,zMax:D+.4,height:1.2})},I=(C,D,G)=>{const O=this.getBaseHeight(C,D);if(Math.abs(O)>.1)return;const X=this.templates.bench.clone();X.position.set(C,.6+O,D),X.rotation.y=G,n.add(X),this.breakables.push({type:"bench",comHeight:.6,radius:.4,position:new P(C,.6+O,D),group:X,flares:[],lights:[],broken:!1,tileX:e,tileZ:i,velocity:new P,angularVelocity:new P})},z=(C,D,G)=>{const O=this.getBaseHeight(C,D);if(Math.abs(O)>.1)return;const X=this.templates.phoneBooth.clone();X.position.set(C,1.4+O,D),X.rotation.y=G,n.add(X),this.breakables.push({type:"phonebooth",comHeight:1.4,radius:.6,position:new P(C,1.4+O,D),group:X,flares:[],lights:[],broken:!1,tileX:e,tileZ:i,velocity:new P,angularVelocity:new P})},j=(C,D)=>{const G=this.getBaseHeight(C,D);if(Math.abs(G)>.1)return;const O=this.templates.trashCan.clone();O.position.set(C,.5+G,D),O.rotation.y=Math.random()*Math.PI*2,n.add(O),this.breakables.push({type:"trashcan",comHeight:.5,radius:.3,position:new P(C,.5+G,D),group:O,flares:[],lights:[],broken:!1,tileX:e,tileZ:i,velocity:new P,angularVelocity:new P})};if(c){const C=new Vt,D=new H(this.tileSize,.2,this.tileSize,8,1,8);D.translate(0,.1,0),this.deformGeometryToHills(D,e,i);const G=new Q(D,this.asphaltMat);G.receiveShadow=!0,C.add(G);const O=.5,X=5,J=[];for(let it=-r/2+2;it<=r/2-2;it+=3){const gt=new H(X,.21,O,4,1,1);gt.translate(it,.11,-l/2-1),J.push(gt);const Z=new H(X,.21,O,4,1,1);Z.translate(it,.11,l/2+1),J.push(Z)}for(let it=-l/2+2;it<=l/2-2;it+=3){const gt=new H(O,.21,X,1,1,4);gt.translate(-r/2-1,.11,it),J.push(gt);const Z=new H(O,.21,X,1,1,4);Z.translate(r/2+1,.11,it),J.push(Z)}if(J.length>0){const it=ee(J);this.deformGeometryToHills(it,e,i),C.add(new Q(it,this.whiteLineMat))}const ot=20-r/2,lt=20-l/2,ct=[];if(ot>0&&lt>0){const it=new H(ot,.35,lt,4,1,4);ui(it),it.translate(-20+ot/2,.175,-20+lt/2),ct.push(it);const gt=new H(ot,.35,lt,4,1,4);ui(gt),gt.translate(20-ot/2,.175,-20+lt/2),ct.push(gt);const Z=new H(ot,.35,lt,4,1,4);ui(Z),Z.translate(-20+ot/2,.175,20-lt/2),ct.push(Z);const at=new H(ot,.35,lt,4,1,4);ui(at),at.translate(20-ot/2,.175,20-lt/2),ct.push(at)}if(ct.length>0){const it=ee(ct);this.deformGeometryToHills(it,e,i);const gt=new Q(it,this.concreteMat);gt.receiveShadow=!0,C.add(gt)}g(C),C.position.set(e,0,i),n.add(C),[[-r/2-1,-l/2-1],[r/2+1,-l/2-1],[-r/2-1,l/2+1],[r/2+1,l/2+1]].forEach(([it,gt])=>{const Z=e+it,at=i+gt,dt=new Vt,St=this.getBaseHeight(Z,at);dt.position.set(Z,4.25+St,at),n.add(dt);const yt=it>0?-1:1,Tt=Math.sin(Z*5+at*3)>0,B=Tt?13821439:16766369,wt=Math.sin(Z*1.2+at*2.8)-Math.floor(Math.sin(Z*1.2+at*2.8))>.65,S=[],W=[];let F=null;const et=[],k=new H(.3,8.5,.3);et.push(k);const v=new H(1.3,.15,.15);if(v.translate(yt*.65,4.15,0),et.push(v),wt){const kt=new H(1.3,.15,.15);kt.translate(-yt*.65,4.15,0),et.push(kt)}const E=ee(et),N=new Q(E,this.streetlightPoleMat);N.castShadow=!0,dt.add(N);const q=[],Y=new H(.6,.2,.6);if(Y.translate(yt*1.3,4.15,0),q.push(Y),wt){const kt=new H(.6,.2,.6);kt.translate(-yt*1.3,4.15,0),q.push(kt)}const tt=ee(q),nt=new Q(tt,this.streetlightBulbMat);dt.add(nt);const ht=new Q(this.lightConeGeo,Tt?this.lightConeMatLED:this.lightConeMatSodium);ht.position.set(yt*1.3,.25,0),ht.name="lightCone",dt.add(ht);const ft=new Q(this.lightPoolGeo,(Tt?this.ledGroundLightPoolMat:this.sodiumGroundLightPoolMat).clone());if(ft.position.set(yt*1.3,-3.89,0),dt.add(ft),wt){const kt=new Q(this.lightConeGeo,Tt?this.lightConeMatLED:this.lightConeMatSodium);kt.position.set(-yt*1.3,.25,0),kt.name="lightCone",dt.add(kt),F=new Q(this.lightPoolGeo,(Tt?this.ledGroundLightPoolMat:this.sodiumGroundLightPoolMat).clone()),F.position.set(-yt*1.3,-3.89,0),dt.add(F);const re=new Ne(new $e({map:this.slFlareTex,color:B,transparent:!0,opacity:.7,blending:xe,depthWrite:!1}));re.position.set(-yt*1.3,4.15,0),re.scale.set(3.8,3.8,1),dt.add(re),S.push(re)}const vt=new $e({map:this.slFlareTex,color:B,transparent:!0,opacity:.7,blending:xe,depthWrite:!1}),Mt=new Ne(vt);Mt.position.set(yt*1.3,4.15,0),Mt.scale.set(3.8,3.8,1),dt.add(Mt),S.push(Mt);const rt={x:Z+yt*1.3,y:7.5+St,z:at,intensity:12,color:B,poolMesh:ft,defaultOpacity:Tt?.16:.22};if(a.push(rt),W.push(rt),wt){const kt={x:Z-yt*1.3,y:7.5+St,z:at,intensity:12,color:B,poolMesh:F,defaultOpacity:Tt?.16:.22};a.push(kt),W.push(kt)}const It=-Math.sign(gt)*3.5,At=new Q(new H(.15,.15,3.5),this.streetlightPoleMat);At.position.set(0,2.5,-Math.sign(gt)*1.75),At.castShadow=!0,dt.add(At);const Rt=new Q(new H(.4,1.2,.4),this.tlHousingMat);Rt.position.set(0,2.1,It),Rt.rotation.y=it>0?-Math.PI/2:Math.PI/2,dt.add(Rt);const Pt=new H(.24,.24,.1),Ct=new Vt;Ct.position.set(0,2.1,It),Ct.rotation.y=it>0?-Math.PI/2:Math.PI/2;const $=new Q(Pt,this.tlRedOffMat);$.position.set(0,.35,.21),Ct.add($),dt.add(Ct);const xt=new Vt;xt.position.set(0,2.1,It),xt.rotation.y=it>0?-Math.PI/2:Math.PI/2;const Ft=new Q(Pt,this.tlYellowOffMat);Ft.position.set(0,0,.21),xt.add(Ft),dt.add(xt);const Ut=new Vt;Ut.position.set(0,2.1,It),Ut.rotation.y=it>0?-Math.PI/2:Math.PI/2;const _t=new Q(Pt,this.tlGreenOffMat);_t.position.set(0,-.35,.21),Ut.add(_t),dt.add(Ut);const V=-Math.sign(it)*3.5,Et=new Q(new H(3.5,.15,.15),this.streetlightPoleMat);Et.position.set(-Math.sign(it)*1.75,2.5,0),Et.castShadow=!0,dt.add(Et);const bt=new Q(new H(.4,1.2,.4),this.tlHousingMat);bt.position.set(V,2.1,0),bt.rotation.y=gt>0?Math.PI:0,dt.add(bt);const Lt=new Vt;Lt.position.set(V,2.1,0),Lt.rotation.y=gt>0?Math.PI:0;const Gt=new Q(Pt,this.tlRedOffMat);Gt.position.set(0,.35,.21),Lt.add(Gt),dt.add(Lt);const qt=new Vt;qt.position.set(V,2.1,0),qt.rotation.y=gt>0?Math.PI:0;const Nt=new Q(Pt,this.tlYellowOffMat);Nt.position.set(0,0,.21),qt.add(Nt),dt.add(qt);const $t=new Vt;$t.position.set(V,2.1,0),$t.rotation.y=gt>0?Math.PI:0;const ie=new Q(Pt,this.tlGreenOffMat);ie.position.set(0,-.35,.21),$t.add(ie),dt.add($t),this.trafficLights.push({tileX:e,tileZ:i,intersectionX:e,intersectionZ:i,axis:"x",redMesh:$,yellowMesh:Ft,greenMesh:_t}),this.trafficLights.push({tileX:e,tileZ:i,intersectionX:e,intersectionZ:i,axis:"z",redMesh:Gt,yellowMesh:Nt,greenMesh:ie}),this.breakables.push({type:"trafficlight",position:new P(Z,St,at),group:dt,flares:S,lights:W,poolMeshes:wt?[ft,F]:[ft],broken:!1,tileX:e,tileZ:i,velocity:new P,angularVelocity:new P})})}else if(this.roadRows.has(t)){const D=new Vt,G=new H(this.tileSize,.2,h,8,1,4);G.translate(0,.1,0),this.deformGeometryToHills(G,e,i);const O=new Q(G,this.asphaltMat);O.receiveShadow=!0,D.add(O);const X=new H(this.tileSize,.35,d,8,1,2);ui(X),X.translate(0,.175,h/2+d/2);const J=new H(this.tileSize,.35,d,8,1,2);ui(J),J.translate(0,.175,-h/2-d/2);const ot=ee([X,J]);this.deformGeometryToHills(ot,e,i);const lt=new Q(ot,this.concreteMat);lt.receiveShadow=!0,D.add(lt);const ct=new H(this.tileSize,.22,.15,8,1,1);ct.translate(0,.11,-.2);const K=new H(this.tileSize,.22,.15,8,1,1);K.translate(0,.11,.2);const it=ee([ct,K]);this.deformGeometryToHills(it,e,i),D.add(new Q(it,this.yellowLineMat)),g(D),D.position.set(e,0,i),n.add(D);const gt=Math.sin(s*12.9898)*43758.5453,Z=gt-Math.floor(gt),at=i+h/2+d/2,dt=i-h/2-d/2,St=Z*10-Math.floor(Z*10);St>.85?R(e-13,at):St>.7?I(e-13,at,Math.PI):St>.58?z(e-13,at,Math.PI):St>.46?w(e-13,at,Math.PI):St>.34?j(e-13,at):St>.24&&y(e-13,at);const yt=Z*100-Math.floor(Z*100);yt>.85?R(e+13,at):yt>.7?I(e+13,at,Math.PI):yt>.58?z(e+13,at,Math.PI):yt>.46?w(e+13,at,Math.PI):yt>.34?j(e+13,at):yt>.24&&y(e+13,at);const Tt=Z*1e3-Math.floor(Z*1e3);Tt>.85?R(e-13,dt):Tt>.7?I(e-13,dt,0):Tt>.58?z(e-13,dt,0):Tt>.46?w(e-13,dt,0):Tt>.34?j(e-13,dt):Tt>.24&&y(e-13,dt);const B=Z*1e4-Math.floor(Z*1e4);if(B>.85?R(e+13,dt):B>.7?I(e+13,dt,0):B>.58?z(e+13,dt,0):B>.46?w(e+13,dt,0):B>.34?j(e+13,dt):B>.24&&y(e+13,dt),s%2===0&&!c){const wt=i+h/2+d/2,S=Math.sin(e*5+wt*3)>0,W=S?13821439:16766369,F=new Vt,et=this.getBaseHeight(e,wt);F.position.set(e,4.25+et,wt),n.add(F);const k=new Q(new H(.3,8.5,.3),this.streetlightPoleMat);k.position.y=0,k.castShadow=!0,F.add(k);const v=new Q(new H(.15,.15,1.3),this.streetlightPoleMat);v.position.set(0,4.15,-.65),v.castShadow=!0,F.add(v);const E=new Q(new H(.6,.2,.6),this.streetlightBulbMat);E.position.set(0,4.15,-1.3),F.add(E);const N=new Q(this.lightConeGeo,S?this.lightConeMatLED:this.lightConeMatSodium);N.position.set(0,.25,-1.3),N.name="lightCone",F.add(N);const q=new Q(this.lightPoolGeo,(S?this.ledGroundLightPoolMat:this.sodiumGroundLightPoolMat).clone());q.position.set(0,-3.89,-1.3),F.add(q);const Y=new Ne(new $e({map:this.slFlareTex,color:W,transparent:!0,opacity:.7,blending:xe,depthWrite:!1}));Y.position.set(0,4.15,-1.3),Y.scale.set(3.8,3.8,1),F.add(Y);const tt={x:e,y:7.5+et,z:wt-1.3,intensity:26,color:W,poolMesh:q,defaultOpacity:S?.16:.22};if(a.push(tt),this.breakables.push({type:"streetlight",position:new P(e,et,wt),group:F,flares:[Y],lights:[tt],poolMeshes:[q],broken:!1,tileX:e,tileZ:i,velocity:new P,angularVelocity:new P}),Math.sin(e*1.2+wt*2.8)-Math.floor(Math.sin(e*1.2+wt*2.8))>.7){const ht=i-h/2-d/2,ft=new Vt,vt=this.getBaseHeight(e,ht);ft.position.set(e,4.25+vt,ht),n.add(ft);const Mt=new Q(new H(.3,8.5,.3),this.streetlightPoleMat);Mt.position.y=0,Mt.castShadow=!0,ft.add(Mt);const rt=new Q(new H(.15,.15,1.3),this.streetlightPoleMat);rt.position.set(0,4.15,.65),rt.castShadow=!0,ft.add(rt);const It=new Q(new H(.6,.2,.6),this.streetlightBulbMat);It.position.set(0,4.15,1.3),ft.add(It);const At=new Q(this.lightConeGeo,S?this.lightConeMatLED:this.lightConeMatSodium);At.position.set(0,.25,1.3),At.name="lightCone",ft.add(At);const Rt=new Q(this.lightPoolGeo,(S?this.ledGroundLightPoolMat:this.sodiumGroundLightPoolMat).clone());Rt.position.set(0,-3.89,1.3),ft.add(Rt);const Pt=new Ne(new $e({map:this.slFlareTex,color:W,transparent:!0,opacity:.7,blending:xe,depthWrite:!1}));Pt.position.set(0,4.15,1.3),Pt.scale.set(3.8,3.8,1),ft.add(Pt);const Ct={x:e,y:7.5+vt,z:ht+1.3,intensity:26,color:W,poolMesh:Rt,defaultOpacity:S?.16:.22};a.push(Ct),this.breakables.push({type:"streetlight",position:new P(e,vt,ht),group:ft,flares:[Pt],lights:[Ct],poolMeshes:[Rt],broken:!1,tileX:e,tileZ:i,velocity:new P,angularVelocity:new P})}}}else{const D=new Vt,G=new H(h,.2,this.tileSize,4,1,8);G.translate(0,.1,0),this.deformGeometryToHills(G,e,i);const O=new Q(G,this.asphaltMat);O.receiveShadow=!0,D.add(O);const X=new H(d,.35,this.tileSize,2,1,8);ui(X),X.translate(h/2+d/2,.175,0);const J=new H(d,.35,this.tileSize,2,1,8);ui(J),J.translate(-h/2-d/2,.175,0);const ot=ee([X,J]);this.deformGeometryToHills(ot,e,i);const lt=new Q(ot,this.concreteMat);lt.receiveShadow=!0,D.add(lt);const ct=new H(.15,.22,this.tileSize,1,1,8);ct.translate(-.2,.11,0);const K=new H(.15,.22,this.tileSize,1,1,8);K.translate(.2,.11,0);const it=ee([ct,K]);this.deformGeometryToHills(it,e,i),D.add(new Q(it,this.yellowLineMat)),g(D),D.position.set(e,0,i),n.add(D);const gt=Math.sin(t*53.1198)*43758.5453,Z=gt-Math.floor(gt),at=e+h/2+d/2,dt=e-h/2-d/2,St=Z*10-Math.floor(Z*10);St>.85?R(dt,i-13):St>.7?I(dt,i-13,-Math.PI/2):St>.58?z(dt,i-13,-Math.PI/2):St>.46?w(dt,i-13,-Math.PI/2):St>.34?j(dt,i-13):St>.24&&y(dt,i-13);const yt=Z*100-Math.floor(Z*100);yt>.85?R(dt,i+13):yt>.7?I(dt,i+13,-Math.PI/2):yt>.58?z(dt,i+13,-Math.PI/2):yt>.46?w(dt,i+13,-Math.PI/2):yt>.34?j(dt,i+13):yt>.24&&y(dt,i+13);const Tt=Z*1e3-Math.floor(Z*1e3);Tt>.85?R(at,i-13):Tt>.7?I(at,i-13,Math.PI/2):Tt>.58?z(at,i-13,Math.PI/2):Tt>.46?w(at,i-13,Math.PI/2):Tt>.34?j(at,i-13):Tt>.24&&y(at,i-13);const B=Z*1e4-Math.floor(Z*1e4);if(B>.85)R(at,i+13);else if(B>.7)I(at,i+13,Math.PI/2);else if(B>.58)z(at,i+13,Math.PI/2);else if(B>.46)w(at,i+13,Math.PI/2);else if(B>.34)j(at,i+13);else if(B>.24&&(y(at,i+13),t%2===0&&!c)){const wt=e+h/2+d/2,S=Math.sin(wt*5+i*3)>0,W=S?13821439:16766369,F=new Vt,et=this.getBaseHeight(wt,i);F.position.set(wt,4.25+et,i),n.add(F);const k=[],v=new H(.3,8.5,.3);k.push(v);const E=new H(1.3,.15,.15);E.translate(-.65,4.15,0),k.push(E);const N=ee(k),q=new Q(N,this.streetlightPoleMat);q.castShadow=!0,F.add(q);const Y=new Q(new H(.6,.2,.6),this.streetlightBulbMat);Y.position.set(-1.3,4.15,0),F.add(Y);const tt=new Q(this.lightConeGeo,S?this.lightConeMatLED:this.lightConeMatSodium);tt.position.set(-1.3,.25,0),tt.name="lightCone",F.add(tt);const nt=new Q(this.lightPoolGeo,(S?this.ledGroundLightPoolMat:this.sodiumGroundLightPoolMat).clone());nt.position.set(-1.3,-3.89,0),F.add(nt);const ht=new Ne(new $e({map:this.slFlareTex,color:W,transparent:!0,opacity:.7,blending:xe,depthWrite:!1}));ht.position.set(-1.3,4.15,0),ht.scale.set(3.8,3.8,1),F.add(ht);const ft={x:wt-1.3,y:7.5+et,z:i,intensity:26,color:W,poolMesh:nt,defaultOpacity:S?.16:.22};if(a.push(ft),this.breakables.push({type:"streetlight",position:new P(wt,et,i),group:F,flares:[ht],lights:[ft],poolMeshes:[nt],broken:!1,tileX:e,tileZ:i,velocity:new P,angularVelocity:new P}),Math.sin(wt*1.2+i*2.8)-Math.floor(Math.sin(wt*1.2+i*2.8))>.7){const Mt=e-h/2-d/2,rt=new Vt,It=this.getBaseHeight(Mt,i);rt.position.set(Mt,4.25+It,i),n.add(rt);const At=[],Rt=new H(.3,8.5,.3);At.push(Rt);const Pt=new H(1.3,.15,.15);Pt.translate(.65,4.15,0),At.push(Pt);const Ct=ee(At),$=new Q(Ct,this.streetlightPoleMat);$.castShadow=!0,rt.add($);const xt=new Q(new H(.6,.2,.6),this.streetlightBulbMat);xt.position.set(1.3,4.15,0),rt.add(xt);const Ft=new Q(this.lightConeGeo,S?this.lightConeMatLED:this.lightConeMatSodium);Ft.position.set(1.3,.25,0),Ft.name="lightCone",rt.add(Ft);const Ut=new Q(this.lightPoolGeo,(S?this.ledGroundLightPoolMat:this.sodiumGroundLightPoolMat).clone());Ut.position.set(1.3,-3.89,0),rt.add(Ut);const _t=new Ne(new $e({map:this.slFlareTex,color:W,transparent:!0,opacity:.7,blending:xe,depthWrite:!1}));_t.position.set(1.3,4.15,0),_t.scale.set(3.8,3.8,1),rt.add(_t);const V={x:Mt+1.3,y:7.5+It,z:i,intensity:26,color:W,poolMesh:Ut,defaultOpacity:S?.16:.22};a.push(V),this.breakables.push({type:"streetlight",position:new P(Mt,It,i),group:rt,flares:[_t],lights:[V],poolMeshes:[Ut],broken:!1,tileX:e,tileZ:i,velocity:new P,angularVelocity:new P})}}}if(M.length>0){const C=ee(M),D=new Q(C,this.streetlightPoleMat);D.castShadow=!0,n.add(D)}if(m.length>0){const C=ee(m),D=new Q(C,this.streetlightBulbMat);n.add(D)}if(p.length>0){const C=ee(p),D=new Q(C,this.trunkMat);D.castShadow=!0,n.add(D)}if(A.length>0){const C=ee(A),D=new Q(C,this.leafMat);D.castShadow=!0,n.add(D)}if(x.length>0){const C=ee(x),D=new Q(C,this.leafCherryMat);D.castShadow=!0,n.add(D)}if(b.length>0){const C=ee(b),D=new Q(C,this.leafAutumnMat);D.castShadow=!0,n.add(D)}if(L.length>0){const C=ee(L),D=new Q(C,this.newspaperBodyMat);D.castShadow=!0,D.receiveShadow=!0,n.add(D)}if(T.length>0){const C=ee(T),D=new Q(C,this.newspaperGlassMat);n.add(D)}if(_.length>0){const C=ee(_),D=new Q(C,this.newspaperPaperMat);n.add(D)}}function am(s,t,e,i,n,o,a){const r=Math.abs(s*17+t*23)%this.asphaltMaterials.length,l=this.asphaltMaterials[r],c=new H(this.tileSize,.2,this.tileSize,8,1,8);c.translate(e,.1,i),this.deformGeometryToHills(c,0,0);const h=Math.abs((s*.317+t*.713)%1),d=Math.abs((s*.893+t*.149)%1),u=c.attributes.uv;for(let _=0;_<u.count;_++)u.setXY(_,u.getX(_)+h,u.getY(_)+d);u.needsUpdate=!0;const f=new Q(c,l);f.receiveShadow=!0,n.add(f);const g=this.shortcutColumns.has(s),M=this.shortcutRows.has(t),m=Math.sin(s*12.9898+t*78.233)*43758.5453,p=m-Math.floor(m),A=(_,R,y,w,I)=>{const z=this.getBaseHeight(e+_,i+R),j=new H(y,w,I);j.translate(e+_,.35+z+w/2,i+R);const C=new Q(j,this.doorMat);C.castShadow=!0,C.receiveShadow=!0,n.add(C),o.push({xMin:e+_-y/2,xMax:e+_+y/2,zMin:i+R-I/2,zMax:i+R+I/2,height:w})},x=(_,R)=>{const y=this.getBaseHeight(e+_,i+R),w=new H(1.4,2.2,1.4);w.translate(e+_,.35+y+1.1,i+R);const I=new Q(w,this.accessoryMat);I.castShadow=!0,I.receiveShadow=!0,n.add(I),o.push({xMin:e+_-.7,xMax:e+_+.7,zMin:i+R-.7,zMax:i+R+.7,height:2.2})},b=(_,R)=>{const y=this.getBaseHeight(e+_,i+R);if(Math.abs(y)>.1)return;const w=new H(1.6,1.6,1.6),I=new Q(w,this.cardboardMat);if(I.position.set(e+_,.35+y+.8,i+R),I.rotation.y=p*2,I.castShadow=!0,I.receiveShadow=!0,n.add(I),p>.45){const z=new H(1.2,1.2,1.2),j=new Q(z,this.cardboardMat);j.position.set(e+_+(p-.5)*.4,.35+y+1.6+.6,i+R+(p-.5)*.4),j.rotation.y=(p+1)*3.5,j.castShadow=!0,n.add(j)}o.push({xMin:e+_-.9,xMax:e+_+.9,zMin:i+R-.9,zMax:i+R+.9,height:2.8})},L=(_,R)=>{const y=this.getBaseHeight(e+_,i+R);if(Math.abs(y)>.1)return;const w=2+Math.floor(p*2);for(let I=0;I<w;I++){const z=.8+I*.15,j=new H(z,z,z),C=new Q(j,this.trashBagMat),D=(I===0?0:I===1?.6:-.6)+(p-.5)*.2,G=(I===0?0:I===1?-.4:.5)+(p-.5)*.2;C.position.set(e+_+D,.35+y+z/2,i+R+G),C.rotation.set(p*2,p*3,p*1.5),C.castShadow=!0,n.add(C)}o.push({xMin:e+_-1.2,xMax:e+_+1.2,zMin:i+R-1.2,zMax:i+R+1.2,height:1.2})},T=(_,R)=>{const y=this.getBaseHeight(e+_,i+R);if(Math.abs(y)>.1)return;const w=new Vt,I=new H(.6,9.5,.6),z=new Q(I,this.woodPoleMat);z.position.y=4.75,z.castShadow=!0,z.receiveShadow=!0,w.add(z);const j=new H(2.4,.3,.4),C=new Q(j,this.woodPoleMat);C.position.set(0,8.5,0),C.castShadow=!0,w.add(C);const D=new H(.8,.5,.8),G=new Q(D,this.accessoryMat);G.position.set(0,8.1,0),w.add(G);const O=new H(.4,.3,.4),X=new Q(O,this.streetlightBulbMat);X.position.set(0,7.8,0),w.add(X);const J=new Q(this.lightConeGeo,this.lightConeMatSodium);J.position.set(0,3.9,0),J.name="lightCone",w.add(J);const ot=new Ne(new $e({map:this.slFlareTex,color:16755268,transparent:!0,opacity:.7,blending:xe,depthWrite:!1}));ot.position.set(0,7.8,0),ot.scale.set(3.8,3.8,1),w.add(ot),w.position.set(e+_,.35+y,i+R),n.add(w);const lt=new Q(this.alleyLightPoolGeo,this.sodiumGroundLightPoolMat.clone());lt.position.set(e+_,.36+y,i+R),n.add(lt),a.push({x:e+_,y:8+y,z:i+R,intensity:15,color:16755268,poolMesh:lt,defaultOpacity:.35}),o.push({xMin:e+_-.4,xMax:e+_+.4,zMin:i+R-.4,zMax:i+R+.4,height:9.5})};g&&!M?(p<.5?(T(-13,-8),A(13,5,2.5,2.5,2.5)):(T(13,8),A(-13,-8,2.5,2.5,2.5)),p>.6?x(-13*(p<.5?-1:1),2):L(-13*(p<.5?-1:1),2),p>.3&&p<.7&&b(13*(p<.5?-1:1),-4)):M&&!g?(p<.5?(T(-8,-13),A(5,13,2.5,2.5,2.5)):(T(8,13),A(-8,-13,2.5,2.5,2.5)),p>.6?x(2,-13*(p<.5?-1:1)):L(2,-13*(p<.5?-1:1)),p>.3&&p<.7&&b(-4,13*(p<.5?-1:1))):g&&M&&(p<.5?(T(-13,13),L(13,-13)):(T(13,-13),L(-13,13)))}function rm(s,t,e,i,n,o,a){const r=`${s},${t}`;if(this.buildingGeoCache&&this.buildingGeoCache.has(r)){const $=this.buildingGeoCache.get(r),xt=new zr;xt.position.set(e,.35,i);const Ft=new Vt,Ut=new Q($.groundGeo,this.concreteMat);Ut.receiveShadow=!0,Ft.add(Ut);const _t=new Q($.facadeGeo,$.bMat);if(_t.castShadow=!0,_t.receiveShadow=!0,Ft.add(_t),$.windowGeo&&Ft.add(new Q($.windowGeo,this.windowDetailedMat)),$.doorGeo&&Ft.add(new Q($.doorGeo,this.doorMat)),$.accessoryGeo&&Ft.add(new Q($.accessoryGeo,this.accessoryMat)),$.billboardGeo){const Nt=new zt({color:1118481,emissive:$.billboardColor,emissiveIntensity:4});Ft.add(new Q($.billboardGeo,Nt))}if($.beaconGeo){const Nt=new zt({color:16711680,emissive:16711680,emissiveIntensity:6});Ft.add(new Q($.beaconGeo,Nt))}xt.addLevel(Ft,0);const V=new Vt,Et=new Q($.groundGeo,this.concreteMat);Et.receiveShadow=!0,V.add(Et);const bt=new Q($.facadeGeo,$.bMat);if(bt.castShadow=!0,bt.receiveShadow=!0,V.add(bt),$.windowGeo&&V.add(new Q($.windowGeo,this.windowDetailedMat)),$.billboardGeo){const Nt=new zt({color:1118481,emissive:$.billboardColor,emissiveIntensity:4});V.add(new Q($.billboardGeo,Nt))}if($.beaconGeo){const Nt=new zt({color:16711680,emissive:16711680,emissiveIntensity:6});V.add(new Q($.beaconGeo,Nt))}xt.addLevel(V,280);const Lt=new Vt,Gt=new Q($.groundGeo,this.concreteMat);Gt.receiveShadow=!0,Lt.add(Gt);const qt=new Q($.facadeGeo,$.bMat);Lt.add(qt),$.windowGeo&&Lt.add(new Q($.windowGeo,this.windowDetailedMat)),xt.addLevel(Lt,400),n.add(xt),$.lights&&$.lights.forEach(Nt=>{const $t=Nt.poolMesh.clone();n.add($t),a.push({x:Nt.x,y:Nt.y,z:Nt.z,intensity:Nt.intensity,color:Nt.color,poolMesh:$t,defaultOpacity:Nt.defaultOpacity})}),o.push($.obstacle);return}const l=($,xt)=>!this.roadColumns.has($)&&!this.roadRows.has(xt)&&!this.isAlley($,xt),c=Math.sin(s*12.9898+t*78.233)*43758.5453,h=c-Math.floor(c),d=h>.8?4:h>.45?3:2,u=this.materials[Math.floor(h*this.materials.length)];let f=-14,g=14,M=-14,m=14;if(l(s-1,t))f=-20;else if(this.isAlley(s-1,t)){const $=Math.sin((s-1)*12.9898+t*78.233)*43758.5453,xt=$-Math.floor($);xt<.4?f=-19:xt<.7?f=-16:f=-13}else if(this.roadColumns.has(s-1)||this.roadRows.has(t)){const{rwX:$}=this.getRoadWidthForGrid(s-1,t);$===14&&h<.5&&(f=-19)}if(l(s+1,t))g=20;else if(this.isAlley(s+1,t)){const $=Math.sin((s+1)*12.9898+t*78.233)*43758.5453,xt=$-Math.floor($);xt<.4?g=19:xt<.7?g=16:g=13}else if(this.roadColumns.has(s+1)||this.roadRows.has(t)){const{rwX:$}=this.getRoadWidthForGrid(s+1,t);$===14&&h>.5&&(g=19)}if(l(s,t-1))M=-20;else if(this.isAlley(s,t-1)){const $=Math.sin(s*12.9898+(t-1)*78.233)*43758.5453,xt=$-Math.floor($);xt<.4?M=-19:xt<.7?M=-16:M=-13}else if(this.roadColumns.has(s)||this.roadRows.has(t-1)){const{rwZ:$}=this.getRoadWidthForGrid(s,t-1);$===14&&h<.5&&(M=-19)}if(l(s,t+1))m=20;else if(this.isAlley(s,t+1)){const $=Math.sin(s*12.9898+(t+1)*78.233)*43758.5453,xt=$-Math.floor($);xt<.4?m=19:xt<.7?m=16:m=13}else if(this.roadColumns.has(s)||this.roadRows.has(t+1)){const{rwZ:$}=this.getRoadWidthForGrid(s,t+1);$===14&&h>.5&&(m=19)}const p=g-f,A=m-M,x=(f+g)/2,b=(M+m)/2,L=this.getBaseHeight(e+x,i+b),T=Math.abs(L)<.1;let _=0;const R=[],y=[],w=[],I=[],z=[],j=[],C=.8,D=C/2,G=.8,O=8+h*4,X=new H(p,O+15,A,Math.max(1,Math.round(p/2)),1,Math.max(1,Math.round(A/2)));if(X.translate(x,(O-15)/2,b),R.push(X),f>-20&&M>-20){const $=new H(C,O+15,C);$.translate(f+D,(O-15)/2,M+D),R.push($)}if(g<20&&M>-20){const $=new H(C,O+15,C);$.translate(g-D,(O-15)/2,M+D),R.push($)}if(f>-20&&m<20){const $=new H(C,O+15,C);$.translate(f+D,(O-15)/2,m-D),R.push($)}if(g<20&&m<20){const $=new H(C,O+15,C);$.translate(g-D,(O-15)/2,m-D),R.push($)}const J=new H(p+.5,G,A+.5,Math.max(1,Math.round(p/2)),1,Math.max(1,Math.round(A/2)));if(J.translate(x,O-G/2,b),R.push(J),m<20){if(T){const re=new H(2.2,4.2,.2,2,1,1);re.translate(x,2.1,m+.05),w.push(re)}const $=6,xt=4.5,Ft=zi($,xt,.1);Ft.translate(x-p/4,2.5,m+.05),y.push(Ft);const Ut=zi($,xt,.1);Ut.translate(x+p/4,2.5,m+.05),y.push(Ut);const _t=5.8,V=1,Et=new H(_t,V,.2,Math.max(1,Math.round(_t/2)),1,1);Et.translate(x-p/4,5.4,m+.1),z.push(Et);const bt=new H(_t,V,.2,Math.max(1,Math.round(_t/2)),1,1);bt.translate(x+p/4,5.4,m+.1),z.push(bt);const Lt=new H(p-2,.35,2,Math.max(1,Math.round((p-2)/2)),1,1);if(Lt.translate(x,6,m+1),I.push(Lt),p>=28&&T){const re=new H(1,1.6,1);re.translate(x-p/2+2.5,.8,m+2),I.push(re);const Be=new H(3.5,.2,1,3,1,1);Be.translate(x+p/2-4,.8,m+2),I.push(Be);const Cn=new H(.25,.8,1);Cn.translate(x+p/2-5.5,.4,m+2),I.push(Cn);const Zn=new H(.25,.8,1);Zn.translate(x+p/2-2.5,.4,m+2),I.push(Zn)}const Gt=new Q(this.storefrontLightPoolGeo,this.storefrontGroundLightPoolMat.clone()),qt=this.getBaseHeight(e+x-p/4,i+m+3);Gt.position.set(e+x-p/4,.36+qt,i+m+3),n.add(Gt);const Nt=new Q(this.storefrontLightPoolGeo,this.storefrontGroundLightPoolMat.clone()),$t=this.getBaseHeight(e+x+p/4,i+m+3);Nt.position.set(e+x+p/4,.36+$t,i+m+3),n.add(Nt);const ie={x:e+x-p/4,y:1.8+qt,z:i+m+1.2,intensity:15,color:16772292,poolMesh:Gt,defaultOpacity:.3};a.push(ie);const kt={x:e+x+p/4,y:1.8+$t,z:i+m+1.2,intensity:15,color:16772292,poolMesh:Nt,defaultOpacity:.3};a.push(kt)}if(M>-20&&T){const $=new H(2.2,4.2,.2,2,1,1);$.translate(x,2.1,M-.05),w.push($)}_+=O;const ot=f===-20?-20:f+1,lt=g===20?20:g-1,ct=M===-20?-20:M+1,K=m===20?20:m-1,it=lt-ot,gt=K-ct,Z=(ot+lt)/2,at=(ct+K)/2,dt=15+h*30,St=new H(it,dt,gt,Math.max(1,Math.round(it/2)),1,Math.max(1,Math.round(gt/2)));if(St.translate(Z,_+dt/2,at),R.push(St),ot>-20&&ct>-20){const $=new H(C,dt,C);$.translate(ot+D,_+dt/2,ct+D),R.push($)}if(lt<20&&ct>-20){const $=new H(C,dt,C);$.translate(lt-D,_+dt/2,ct+D),R.push($)}if(ot>-20&&K<20){const $=new H(C,dt,C);$.translate(ot+D,_+dt/2,K-D),R.push($)}if(lt<20&&K<20){const $=new H(C,dt,C);$.translate(lt-D,_+dt/2,K-D),R.push($)}const yt=new H(it+.5,G,gt+.5,Math.max(1,Math.round(it/2)),1,Math.max(1,Math.round(gt/2)));yt.translate(Z,_+dt-G/2,at),R.push(yt);const Tt=1.5,B=2;for(let $=_+3;$<_+dt-3;$+=4.5)for(let xt=ot+3;xt<lt-3;xt+=4){if(K<20){const Ft=zi(Tt,B,.1);Ft.translate(xt,$,K+.05),y.push(Ft);const Ut=new H(Tt+.6,.28,.4);Ut.translate(xt,$-B/2-.14,K+.2),R.push(Ut)}if(ct>-20){const Ft=zi(Tt,B,.1);Ft.translate(xt,$,ct-.05),y.push(Ft);const Ut=new H(Tt+.6,.28,.4);Ut.translate(xt,$-B/2-.14,ct-.2),R.push(Ut)}}if(_+=dt,d>=3){const $=f===-20?-20:f+2.5,xt=g===20?20:g-2.5,Ft=M===-20?-20:M+2.5,Ut=m===20?20:m-2.5,_t=xt-$,V=Ut-Ft,Et=($+xt)/2,bt=(Ft+Ut)/2,Lt=8+h*10,Gt=new H(_t,Lt,V,Math.max(1,Math.round(_t/2)),1,Math.max(1,Math.round(V/2)));if(Gt.translate(Et,_+Lt/2,bt),R.push(Gt),$>-20&&Ft>-20){const Nt=new H(C,Lt,C);Nt.translate($+D,_+Lt/2,Ft+D),R.push(Nt)}if(xt<20&&Ft>-20){const Nt=new H(C,Lt,C);Nt.translate(xt-D,_+Lt/2,Ft+D),R.push(Nt)}if($>-20&&Ut<20){const Nt=new H(C,Lt,C);Nt.translate($+D,_+Lt/2,Ut-D),R.push(Nt)}if(xt<20&&Ut<20){const Nt=new H(C,Lt,C);Nt.translate(xt-D,_+Lt/2,Ut-D),R.push(Nt)}const qt=new H(_t+.5,G,V+.5,Math.max(1,Math.round(_t/2)),1,Math.max(1,Math.round(V/2)));qt.translate(Et,_+Lt-G/2,bt),R.push(qt);for(let Nt=_+2;Nt<_+Lt-2;Nt+=4)for(let $t=$+3;$t<xt-3;$t+=4){if(Ut<20){const ie=zi(Tt,B,.1);ie.translate($t,Nt,Ut+.05),y.push(ie);const kt=new H(Tt+.6,.28,.4);kt.translate($t,Nt-B/2-.14,Ut+.2),R.push(kt)}if(Ft>-20){const ie=zi(Tt,B,.1);ie.translate($t,Nt,Ft-.05),y.push(ie);const kt=new H(Tt+.6,.28,.4);kt.translate($t,Nt-B/2-.14,Ft-.2),R.push(kt)}}_+=Lt}if(d===4){const $=f===-20?-20:f+4,xt=g===20?20:g-4,Ft=M===-20?-20:M+4,Ut=m===20?20:m-4,_t=xt-$,V=Ut-Ft,Et=($+xt)/2,bt=(Ft+Ut)/2,Lt=7+h*8,Gt=new H(_t,Lt,V,Math.max(1,Math.round(_t/2)),1,Math.max(1,Math.round(V/2)));Gt.translate(Et,_+Lt/2,bt),R.push(Gt);const qt=new H(_t+.5,G,V+.5,Math.max(1,Math.round(_t/2)),1,Math.max(1,Math.round(V/2)));qt.translate(Et,_+Lt-G/2,bt),R.push(qt);for(let Nt=_+2;Nt<_+Lt-2;Nt+=3.8)for(let $t=$+3;$t<xt-3;$t+=4)if(Ut<20){const ie=zi(Tt,B,.1);ie.translate($t,Nt,Ut+.05),y.push(ie);const kt=new H(Tt+.6,.28,.4);kt.translate($t,Nt-B/2-.14,Ut+.2),R.push(kt)}_+=Lt}const wt=new H(3,2,3);if(wt.translate(x,_+1,b),I.push(wt),h>.45){const $=new H(3.2,.18,1.8);$.rotateX(Math.PI/8),$.translate(x-3.5,_+.5,b),I.push($)}if(h>.6){const $=new H(.3,3,.3);$.translate(x-1.2,_+1.5,b-1.2),I.push($);const xt=new H(.3,3,.3);xt.translate(x+1.2,_+1.5,b+1.2),I.push(xt);const Ft=new H(2.4,2.4,2.4);Ft.translate(x,_+3.8,b),I.push(Ft)}if(h>.3){const $=new H(.2,8,.2);$.translate(x,_+4,b),I.push($);const xt=new H(.6,.6,.6);xt.translate(x,_+8,b),j.push(xt)}const S=this.billboardColors[Math.floor(h*this.billboardColors.length)];if(h>.3&&_>25&&m<20){const Ft=new H(10,6,.5,Math.max(1,Math.round(5)),1,1);Ft.translate(x,_-10,m+.3),z.push(Ft)}const W=new zr;W.position.set(e,.35,i);const F=new H(this.tileSize,.35,this.tileSize,8,1,8);ui(F),F.translate(0,-.175,0),this.deformGeometryToHills(F,e,i);const et=ee(R);et.translate(0,L,0);const k=new Vt,v=new Q(F,this.concreteMat);v.receiveShadow=!0,k.add(v);const E=new Q(et,u);E.castShadow=!0,E.receiveShadow=!0,k.add(E),F.isCached=!0,et.isCached=!0;let N=null,q=null;if(y.length>0){const $=ee(y);$.translate(0,L,0),N=$,N.isCached=!0,q=new Q($,this.windowDetailedMat),k.add(q)}let Y=null;if(w.length>0){const $=ee(w);$.translate(0,L,0),Y=$,Y.isCached=!0,k.add(new Q($,this.doorMat))}let tt=null;if(I.length>0){const $=ee(I);$.translate(0,L,0),tt=$,tt.isCached=!0,k.add(new Q($,this.accessoryMat))}let nt=null,ht=null;if(z.length>0){const $=ee(z);$.translate(0,L,0),ht=$,ht.isCached=!0;const xt=new zt({color:1118481,emissive:S,emissiveIntensity:4});nt=new Q($,xt),k.add(nt)}let ft=null,vt=null;if(j.length>0){const $=ee(j);$.translate(0,L,0),vt=$,vt.isCached=!0;const xt=new zt({color:16711680,emissive:16711680,emissiveIntensity:6});ft=new Q($,xt),k.add(ft)}W.addLevel(k,0);const Mt=new Vt,rt=new Q(F,this.concreteMat);rt.receiveShadow=!0,Mt.add(rt);const It=new Q(et,u);It.castShadow=!0,It.receiveShadow=!0,Mt.add(It),q&&Mt.add(new Q(q.geometry,q.material)),nt&&Mt.add(new Q(nt.geometry,nt.material)),ft&&Mt.add(new Q(ft.geometry,ft.material)),W.addLevel(Mt,280);const At=new Vt,Rt=new Q(F,this.concreteMat);Rt.receiveShadow=!0,At.add(Rt);const Pt=new Q(et,u);At.add(Pt),q&&At.add(new Q(q.geometry,q.material)),W.addLevel(At,400),n.add(W);const Ct={xMin:e+f,xMax:e+g,zMin:i+M,zMax:i+m,height:_};if(o.push(Ct),this.buildingGeoCache&&(this.buildingGeoCache.set(r,{groundGeo:F,facadeGeo:et,windowGeo:N,doorGeo:Y,accessoryGeo:tt,billboardGeo:ht,billboardColor:S,beaconGeo:vt,bMat:u,obstacle:Ct,lights:[]}),this.buildingGeoCache.size>500)){for(const[$,xt]of this.buildingGeoCache.entries())if(!this.loadedTiles.has($)){this.buildingGeoCache.delete($),xt.groundGeo&&xt.groundGeo.dispose(),xt.facadeGeo&&xt.facadeGeo.dispose(),xt.windowGeo&&xt.windowGeo.dispose(),xt.doorGeo&&xt.doorGeo.dispose(),xt.accessoryGeo&&xt.accessoryGeo.dispose(),xt.billboardGeo&&xt.billboardGeo.dispose(),xt.beaconGeo&&xt.beaconGeo.dispose();break}}}class lm{constructor(t){this.scene=t,this.tileSize=40;const e=Math.random()*1e4;this.mainRoadColumns=new Set,this.mainRoadRows=new Set,this.mainRoadColumns.add(0),this.mainRoadRows.add(0);let i=0;for(;i<1e3;){const g=Math.sin((i+e)*1.5)*43758.5453,M=g-Math.floor(g);i+=3+Math.floor(M*5),this.mainRoadColumns.add(i)}for(i=0;i>-1e3;){const g=Math.sin((i-e)*1.5)*43758.5453,M=g-Math.floor(g);i-=3+Math.floor(M*5),this.mainRoadColumns.add(i)}for(i=0;i<1e3;){const g=Math.sin((i+e)*2.7)*43758.5453,M=g-Math.floor(g);i+=3+Math.floor(M*5),this.mainRoadRows.add(i)}for(i=0;i>-1e3;){const g=Math.sin((i-e)*2.7)*43758.5453,M=g-Math.floor(g);i-=3+Math.floor(M*5),this.mainRoadRows.add(i)}this.shortcutColumns=new Set,this.shortcutRows=new Set;const n=Array.from(this.mainRoadColumns).sort((g,M)=>g-M);for(let g=0;g<n.length-1;g++){const M=n[g],m=n[g+1],p=m-M;if(p>=3){const A=Math.sin(M*12.9898+m*78.233)*43758.5453;if(A-Math.floor(A)<.2){const b=M+Math.floor(p/2);this.shortcutColumns.add(b)}}}const o=Array.from(this.mainRoadRows).sort((g,M)=>g-M);for(let g=0;g<o.length-1;g++){const M=o[g],m=o[g+1],p=m-M;if(p>=3){const A=Math.sin(M*53.1374+m*21.9427)*43758.5453;if(A-Math.floor(A)<.2){const b=M+Math.floor(p/2);this.shortcutRows.add(b)}}}this.roadColumns=new Set([...this.mainRoadColumns,...this.shortcutColumns]),this.roadRows=new Set([...this.mainRoadRows,...this.shortcutRows]),this.sortedColumnsArray=Array.from(this.roadColumns).sort((g,M)=>g-M),this.sortedRowsArray=Array.from(this.roadRows).sort((g,M)=>g-M);const a=J0();this.scene.environment=a,this.loadedTiles=new Map,this.buildingGeoCache=new Map,this.obstacles=[],this.spatialCellSize=40,this.obstacleGrid=new Map,this.renderRadius=6,this.asphaltMaterials=[],this.asphaltLocalCircles=[],this.tilePuddles=new Map;for(let g=0;g<8;g++){const M=g<4,m=Z0(M);this.asphaltMaterials.push(new zt({map:m.map,roughness:1,metalness:1,roughnessMap:m.roughnessMap,metalnessMap:m.roughnessMap,bumpMap:m.roughnessMap,bumpScale:.18,envMapIntensity:.55})),this.asphaltLocalCircles.push(m.localCircles||[])}this.asphaltMat=this.asphaltMaterials[0];const r=j0();this.concreteMat=new zt({map:r.map,roughness:.75,metalness:.05,bumpMap:r.roughnessMap,bumpScale:.08,envMapIntensity:.15}),this.yellowLineMat=new zt({color:15051067,roughness:.6}),this.whiteLineMat=new zt({color:14540253,roughness:.6}),this.streetlightPoleMat=new zt({color:2237740,metalness:.8,roughness:.5}),this.streetlightBulbMat=new zt({color:16774877,emissive:16764040,emissiveIntensity:3.5}),this.lightPoolGeo=new bi(64,64),this.lightPoolGeo.rotateX(-Math.PI/2),this.groundLightPoolTex=$0(),this.ledGroundLightPoolMat=new fe({map:this.groundLightPoolTex,color:11195647,transparent:!0,opacity:.26,blending:xe,depthWrite:!1}),this.sodiumGroundLightPoolMat=new fe({map:this.groundLightPoolTex,color:16758876,transparent:!0,opacity:.35,blending:xe,depthWrite:!1}),this.storefrontLightPoolGeo=new bi(24,24),this.storefrontLightPoolGeo.rotateX(-Math.PI/2),this.storefrontGroundLightPoolMat=new fe({map:this.groundLightPoolTex,color:16772292,transparent:!0,opacity:.3,blending:xe,depthWrite:!1,side:je});const l=document.createElement("canvas");l.width=64,l.height=128;const c=l.getContext("2d"),h=c.createImageData(64,128);for(let g=0;g<128;g++){const M=g/127;for(let m=0;m<64;m++){const p=m/63,A=Math.abs(p-.5),x=.15+M*.75,b=Math.max(0,1-A/x),L=Math.max(0,1-M),T=Math.pow(b,1.5)*Math.pow(L,3.2),_=(g*64+m)*4;h.data[_]=255,h.data[_+1]=255,h.data[_+2]=255,h.data[_+3]=Math.round(T*255)}}c.putImageData(h,0,0),this.lightConeTex=new Re(l);const d=new bi(13.5,7.8,1,1),u=d.clone();u.rotateY(Math.PI/2),this.lightConeGeo=ee([d,u]),this.lightConeMatLED=new fe({map:this.lightConeTex,color:11195647,transparent:!0,opacity:.22,blending:xe,depthWrite:!1,side:je}),this.lightConeMatSodium=new fe({map:this.lightConeTex,color:16758876,transparent:!0,opacity:.26,blending:xe,depthWrite:!1,side:je}),this.alleyLightPoolGeo=new bi(32,32),this.alleyLightPoolGeo.rotateX(-Math.PI/2),this.brickMat=new zt({color:5910312,roughness:.8}),this.buildingConcreteMat=new zt({color:7369594,roughness:.65}),this.slateMat=new zt({color:3224895,roughness:.7}),this.sandstoneMat=new zt({color:11180162,roughness:.85}),this.glassySlateMat=new zt({color:1909289,metalness:.75,roughness:.25}),this.darkConcreteMat=new zt({color:4671823,roughness:.7}),this.brickDarkMat=new zt({color:4008743,roughness:.85}),this.materials=[this.brickMat,this.buildingConcreteMat,this.slateMat,this.sandstoneMat,this.glassySlateMat,this.darkConcreteMat,this.brickDarkMat],this.windowYellowMat=new zt({color:16775910,emissive:16763750,emissiveIntensity:4.2,roughness:.2}),this.windowBlueMat=new zt({color:15136767,emissive:3851263,emissiveIntensity:3.8,roughness:.2}),this.windowDarkMat=new zt({color:1119002,roughness:.1,metalness:.9});const f=K0();this.windowDetailedMat=new zt({map:f.map,roughness:.15,metalness:.2,emissive:16777215,emissiveMap:f.emissiveMap,emissiveIntensity:5.5}),this.doorMat=new zt({color:4007962,roughness:.6}),this.accessoryMat=new zt({color:3355443,metalness:.5}),this.dumpsterMat=new zt({color:2047085,roughness:.8,metalness:.2}),this.cardboardMat=new zt({color:10189402,roughness:.9}),this.trashBagMat=new zt({color:1710618,roughness:.8}),this.woodPoleMat=new zt({color:5059353,roughness:.9}),this.trunkMat=new zt({color:5913896,roughness:.9}),this.leafMat=new zt({color:3038238,roughness:.8}),this.leafCherryMat=new zt({color:14709399,roughness:.8}),this.leafAutumnMat=new zt({color:13923621,roughness:.8}),this.billboardColors=[16711765,65382,61695,16755200],this.benchWoodMat=new zt({color:9132587,roughness:.7}),this.benchIronMat=new zt({color:1118481,metalness:.8,roughness:.4}),this.phoneBoothFrameMat=new zt({color:13378082,metalness:.6,roughness:.3}),this.phoneBoothGlassMat=new zt({color:10083839,transparent:!0,opacity:.4,metalness:.9,roughness:.1}),this.phoneBoothScreenMat=new zt({color:3851263,emissive:3851263,emissiveIntensity:3}),this.trashCanMat=new zt({color:5592405,metalness:.7,roughness:.4}),this.trashCanLidMat=new zt({color:2236962,roughness:.6}),this.hydrantRedMat=new zt({color:13378082,roughness:.4,metalness:.6}),this.hydrantCapMat=new zt({color:14526976,roughness:.5,metalness:.7}),this.newspaperBodyMat=new zt({color:2051705,roughness:.5}),this.newspaperGlassMat=new zt({color:15661055,transparent:!0,opacity:.4,metalness:.9,roughness:.1}),this.newspaperPaperMat=new zt({color:15658734,roughness:.9}),this.tlRedOnMat=new fe({color:16711680}),this.tlRedOffMat=new zt({color:3801088,roughness:.8}),this.tlYellowOnMat=new fe({color:16755200}),this.tlYellowOffMat=new zt({color:3810560,roughness:.8}),this.tlGreenOnMat=new fe({color:65280}),this.tlGreenOffMat=new zt({color:14848,roughness:.8}),this.tlHousingMat=new zt({color:1118481,roughness:.5}),this.trafficLights=[],this.breakables=[],this.lightSources=[],this.activeLights=[],this.maxLights=36,this.initLightPool(),this.slFlareTex=Y0(),this.templates={},this.generateTemplates()}initLightPool(){this.lightPool=[],this.maxLights=36;for(let t=0;t<this.maxLights;t++){const e=new Ps(16766369,0,110,1.15);e.castShadow=!1,this.scene.add(e),this.lightPool.push(e)}}generateTemplates(){const t=new Vt,e=new Q(new H(.8,4,.8),this.trunkMat);e.position.y=2,e.castShadow=!0,t.add(e);const i=[];[{size:3.5,y:3.8},{size:2.8,y:4.8},{size:1.8,y:5.6}].forEach(_=>{const R=new H(_.size,_.size*.8,_.size);R.translate(0,_.y,0),i.push(R)});const o=ee(i),a=new Q(o,this.leafMat);a.castShadow=!0,t.add(a),this.templates.tree=t;const r=new Vt,l=new Q(new H(.8,3.2,.8),this.trunkMat);l.position.y=1.6,l.castShadow=!0,r.add(l);const c=[];[{sx:3.8,sy:3.2,sz:3.8,y:3.6},{sx:2.8,sy:2.4,sz:2.8,y:5}].forEach(_=>{const R=new H(_.sx,_.sy,_.sz);R.translate(0,_.y,0),c.push(R)});const d=ee(c),u=new Q(d,this.leafMat);u.castShadow=!0,u.receiveShadow=!0,r.add(u),this.templates.treeRoundGreen=r;const f=new Vt;f.add(e.clone());const g=new Q(o,this.leafCherryMat);g.castShadow=!0,f.add(g),this.templates.treeCherry=f;const M=new Vt;M.add(e.clone());const m=new Q(o,this.leafAutumnMat);m.castShadow=!0,M.add(m),this.templates.treeAutumn=M;const p=new Vt;p.add(l.clone());const A=new Q(d,this.leafCherryMat);A.castShadow=!0,A.receiveShadow=!0,p.add(A),this.templates.treeRoundCherry=p;const x=new Vt;x.add(l.clone());const b=new Q(d,this.leafAutumnMat);b.castShadow=!0,b.receiveShadow=!0,x.add(b),this.templates.treeRoundAutumn=x,this.templates.fireHydrant=this.createFireHydrantMesh(),this.templates.newspaperBox=this.createNewspaperBoxMesh(),this.templates.bench=this.createBenchMesh(),this.templates.phoneBooth=this.createPhoneBoothMesh(),this.templates.trashCan=this.createTrashCanMesh();const L=new Vt,T=new Q(new H(.3,8.5,.3),this.streetlightPoleMat);T.position.y=4.25,T.castShadow=!0,L.add(T),this.templates.streetlight=L}createFireHydrantMesh(){return Q0.call(this)}createNewspaperBoxMesh(){return tm.call(this)}getFadedMaterial(t,e){if(this.materialOpacityPool||(this.materialOpacityPool=new Map),!this.materialOpacityPool.has(t)){const n=[];for(let o=0;o<=10;o++){const a=t.clone();a.transparent=!0,a.opacity=o/10,n.push(a)}this.materialOpacityPool.set(t,n)}const i=Math.max(0,Math.min(10,Math.round(e*10)));return this.materialOpacityPool.get(t)[i]}update(t,e,i=0,n=[],o=.016){const a=Math.round(t/this.tileSize),r=Math.round(e/this.tileSize);let l=null,c=null,h=1/0;for(let T=a-this.renderRadius;T<=a+this.renderRadius;T++)for(let _=r-this.renderRadius;_<=r+this.renderRadius;_++){const R=`${T},${_}`;if(!this.loadedTiles.has(R)){const y=T-a,w=_-r,I=y*y+w*w;I<h&&(h=I,l=T,c=_)}}l!==null&&c!==null&&this.generateTile(l,c);for(const[T,_]of this.loadedTiles.entries())(Math.abs(_.gridX-a)>this.renderRadius||Math.abs(_.gridZ-r)>this.renderRadius)&&this.unloadTile(T,_);const d=Math.sin(i),u=Math.cos(i);for(const T of this.loadedTiles.values()){const _=T.posX-t,R=T.posZ-e,y=_*_+R*R;if(y<65*65)T.visible||(this.scene.add(T.group),T.visible=!0);else{const w=_*d+R*u,I=w>0||w*w<.1764*y;I&&!T.visible?(this.scene.add(T.group),T.visible=!0):!I&&T.visible&&(this.scene.remove(T.group),T.visible=!1)}}this._lightWorkBuf||(this._lightWorkBuf=[]);const f=560*560;let g=0;for(let T=0;T<this.lightSources.length;T++){const _=this.lightSources[T],R=_.x-t,y=_.z-e,w=R*R+y*y;if(_.poolMesh)if(w>=12100)_.poolMesh.material.opacity=_.defaultOpacity;else if(w<=2025)_.poolMesh.material.opacity=0;else{const z=(Math.sqrt(w)-45)/65,j=z*z*(3-2*z);_.poolMesh.material.opacity=_.defaultOpacity*j}w<f&&(_._distSq=w,this._lightWorkBuf[g++]=_)}for(let T=0;T<n.length;T++){const _=n[T],R=_.x-t,y=_.z-e;_._distSq=R*R+y*y,this._lightWorkBuf[g++]=_}let M=0;for(let T=0;T<g;T++){const _=this._lightWorkBuf[T],R=_.x-t,y=_.z-e,w=_._distSq,I=R*d+y*u;(w<65*65||I>0||I*I<.1764*w)&&(this._lightWorkBuf[M++]=_)}const m=M,p=Math.min(this.maxLights,m);for(let T=0;T<p;T++){let _=T,R=this._lightWorkBuf[T]._distSq;for(let y=T+1;y<m;y++){const w=this._lightWorkBuf[y]._distSq;w<R&&(R=w,_=y)}if(_!==T){const y=this._lightWorkBuf[T];this._lightWorkBuf[T]=this._lightWorkBuf[_],this._lightWorkBuf[_]=y}}const A=560,x=380;for(let T=0;T<this.maxLights;T++){const _=this.lightPool[T];if(T<m){const R=this._lightWorkBuf[T];_.position.set(R.x,R.y,R.z);const y=R.x-t,w=R.z-e,I=Math.sqrt(y*y+w*w);let z=R.intensity||0;if(I>x&&(z*=Math.max(0,1-(I-x)/(A-x))),R.poolMesh){if(!(I<45))if(I>110)z=0;else{const j=(I-45)/65,C=j*j*(3-2*j);z*=1-C}}else if(!(I<80))if(I>120)z=0;else{const j=(I-80)/40,C=j*j*(3-2*j);z*=1-C}_.intensity=z,_.color.setHex(R.color||16755258)}else _.intensity=0}const b=window.gameTime||0;this.trafficLights.forEach(T=>{const _=Ql(T.intersectionX,T.intersectionZ,b),R=T.axis==="x"?_.xLight:_.zLight;T._lastColor!==R&&(T._lastColor=R,T.redMesh.material=R==="red"?this.tlRedOnMat:this.tlRedOffMat,T.yellowMesh.material=R==="yellow"?this.tlYellowOnMat:this.tlYellowOffMat,T.greenMesh.material=R==="green"?this.tlGreenOnMat:this.tlGreenOffMat)});const L=2;for(const T of this.loadedTiles.values())T.isFading&&(T.fadeProgress===void 0&&(T.fadeProgress=0),T.fadeProgress+=o*L,T.fadeProgress>=1?(T.fadeProgress=1,T.isFading=!1,T.group.traverse(_=>{_.isMesh&&_._origMaterial&&(_.material=_._origMaterial,_._origMaterial=void 0)})):T.group.traverse(_=>{if(_.isMesh&&_._origMaterial)if(Array.isArray(_.material))_.material=_.material.map((R,y)=>{const w=_._origMaterial[y].opacity!==void 0?_._origMaterial[y].opacity:1;return this.getFadedMaterial(_._origMaterial[y],w*T.fadeProgress)});else{const R=_._origMaterial.opacity!==void 0?_._origMaterial.opacity:1;_.material=this.getFadedMaterial(_._origMaterial,R*T.fadeProgress)}}))}getRoadWidthForGrid(t,e){let i=26,n=26;const o=Math.sin(e*78.233)*43758.5453;o-Math.floor(o)>.6&&(n=14);const r=Math.sin(t*12.9898)*43758.5453;return r-Math.floor(r)>.6&&(i=14),{rwX:i,rwZ:n}}getBlockInfo(t,e){let i=0,n=0;for(let r=t;r>=-1e3;r--)if(this.roadColumns.has(r)){i=r;break}for(let r=t+1;r<=1e3;r++)if(this.roadColumns.has(r)){n=r;break}let o=0,a=0;for(let r=e;r>=-1e3;r--)if(this.roadRows.has(r)){o=r;break}for(let r=e+1;r<=1e3;r++)if(this.roadRows.has(r)){a=r;break}return{colLeft:i,colRight:n,rowTop:o,rowBottom:a,blockWidth:n-i,blockHeight:a-o,dx:t-i,dz:e-o}}isAlley(t,e){return this.mainRoadColumns.has(t)||this.mainRoadRows.has(e)?!1:this.shortcutColumns.has(t)||this.shortcutRows.has(e)}snapToNearestIntersection(t,e){const i=Math.round(t/this.tileSize),n=Math.round(e/this.tileSize);let o=0,a=1/0;for(let c=i-8;c<=i+8;c++)if(this.roadColumns.has(c)){const h=Math.abs(c-i);h<a&&(a=h,o=c)}let r=0,l=1/0;for(let c=n-8;c<=n+8;c++)if(this.roadRows.has(c)){const h=Math.abs(c-n);h<l&&(l=h,r=c)}return{x:o*this.tileSize,z:r*this.tileSize}}generateTile(t,e){const i=`${t},${e}`,n=new Vt,o=[],a=[],r=t*this.tileSize,l=e*this.tileSize,c=this.isAlley(t,e),h=this.roadColumns.has(t)||this.roadRows.has(e);if(c)this.buildAlleyTile(t,e,r,l,n,o,a);else if(h){this.buildRoadTile(t,e,r,l,n,o,a);const d=[],u=Math.abs(t*17+e*23)%this.asphaltMaterials.length,f=this.asphaltLocalCircles[u];if(f&&f.length>0){const g=Math.abs((t*.317+e*.713)%1),M=Math.abs((t*.893+e*.149)%1);let m=this.tileSize,p=this.tileSize;if(!(this.roadColumns.has(t)&&this.roadRows.has(e))){const{rwX:x,rwZ:b}=this.getRoadWidthForGrid(t,e);this.roadRows.has(e)?p=b:m=x}f.forEach(x=>{const b=x.x/1024,L=x.y/1024,T=(b-g+2)%1,_=(L+M)%1,R=T*m-m/2,y=_*p-p/2;d.push({x:r+R,z:l+y,rx:x.r/1024*m,rz:x.r/1024*p})})}this.tilePuddles.set(i,d)}else this.buildBuildingTile(t,e,r,l,n,o,a);n.traverse(d=>{d.isMesh&&d.material&&(Array.isArray(d.material)?(d._origMaterial=d.material,d.material=d.material.map(u=>this.getFadedMaterial(u,0))):(d._origMaterial=d.material,d.material=this.getFadedMaterial(d.material,0)))}),this.scene.add(n),this.loadedTiles.set(i,{group:n,obstacles:o,lights:a,posX:r,posZ:l,gridX:t,gridZ:e,visible:!0,fadeProgress:0,isFading:!0}),this.obstacles.push(...o);for(const d of o){const u=Math.floor(d.xMin/this.spatialCellSize),f=Math.floor(d.xMax/this.spatialCellSize),g=Math.floor(d.zMin/this.spatialCellSize),M=Math.floor(d.zMax/this.spatialCellSize);for(let m=u;m<=f;m++)for(let p=g;p<=M;p++){const A=`${m},${p}`;this.obstacleGrid.has(A)||this.obstacleGrid.set(A,[]),this.obstacleGrid.get(A).push(d)}}this.lightSources.push(...a)}unloadTile(t,e){e.visible&&this.scene.remove(e.group),e.group.traverse(a=>{a.isMesh&&(a.geometry&&a.geometry!==this.lightPoolGeo&&a.geometry!==this.storefrontLightPoolGeo&&a.geometry!==this.alleyLightPoolGeo&&a.geometry!==this.lightConeGeo&&!a.geometry.isCached&&a.geometry.dispose(),a._origMaterial&&(a.material=a._origMaterial,a._origMaterial=void 0))});const i=new Set(e.obstacles);this.obstacles=this.obstacles.filter(a=>!i.has(a));for(const a of e.obstacles){const r=Math.floor(a.xMin/this.spatialCellSize),l=Math.floor(a.xMax/this.spatialCellSize),c=Math.floor(a.zMin/this.spatialCellSize),h=Math.floor(a.zMax/this.spatialCellSize);for(let d=r;d<=l;d++)for(let u=c;u<=h;u++){const f=`${d},${u}`,g=this.obstacleGrid.get(f);if(g){const M=g.indexOf(a);M!==-1&&g.splice(M,1),g.length===0&&this.obstacleGrid.delete(f)}}}this.lightSources=this.lightSources.filter(a=>!e.lights.includes(a));const n=e.posX,o=e.posZ;this.trafficLights=this.trafficLights.filter(a=>a.tileX!==n||a.tileZ!==o),this.breakables=this.breakables.filter(a=>a.tileX!==n||a.tileZ!==o),this.tilePuddles.delete(t),this.loadedTiles.delete(t)}buildRoadTile(t,e,i,n,o,a,r){return om.call(this,t,e,i,n,o,a,r)}buildAlleyTile(t,e,i,n,o,a,r){return am.call(this,t,e,i,n,o,a,r)}spawnTemplateTree(t,e,i,n){return em.call(this,t,e,i,n)}createBenchMesh(){return im.call(this)}createPhoneBoothMesh(){return nm.call(this)}createTrashCanMesh(){return sm.call(this)}buildBuildingTile(t,e,i,n,o,a,r){return rm.call(this,t,e,i,n,o,a,r)}checkCollision(t,e,i=2.2){const n=this.spatialCellSize,o=Math.floor((t-i)/n),a=Math.floor((t+i)/n),r=Math.floor((e-i)/n),l=Math.floor((e+i)/n);this.checkId=(this.checkId||0)+1;const c=this.checkId,h=i*i;for(let d=o;d<=a;d++)for(let u=r;u<=l;u++){const f=this.obstacleGrid.get(`${d},${u}`);if(f)for(let g=0;g<f.length;g++){const M=f[g];if(M._lastCheckId===c||(M._lastCheckId=c,M.isRamp))continue;const m=Math.max(M.xMin,Math.min(t,M.xMax)),p=Math.max(M.zMin,Math.min(e,M.zMax)),A=t-m,x=e-p,b=A*A+x*x;if(b<h){const L=Math.sqrt(b);return{collision:!0,normalX:L>.001?A/L:1,normalZ:L>.001?x/L:0,overlap:i-L}}}}return{collision:!1}}isWetAt(t,e){const i=(M,m)=>{const p=`${M},${m}`,A=this.tilePuddles.get(p);if(!A||A.length===0)return!1;for(let x=0;x<A.length;x++){const b=A[x],L=t-b.x,T=e-b.z,_=b.rx*1.4,R=b.rz*1.4;if(L/_*(L/_)+T/R*(T/R)<1)return!0}return!1},n=Math.floor(t/this.tileSize+.5),o=Math.floor(e/this.tileSize+.5);if(!(this.roadColumns.has(n)||this.roadRows.has(o)))return!1;const{rwX:r,rwZ:l}=this.getRoadWidthForGrid(n,o),c=t-n*this.tileSize,h=e-o*this.tileSize;if(!(this.roadColumns.has(n)&&this.roadRows.has(o))){if(this.roadRows.has(o)){if(Math.abs(h)>l/2)return!1}else if(Math.abs(c)>r/2)return!1}if(i(n,o))return!0;const u=3;n*this.tileSize,o*this.tileSize;const f=this.tileSize/2-Math.abs(c),g=this.tileSize/2-Math.abs(h);if(f<u){const M=n+(c>0?1:-1);if(i(M,o))return!0}if(g<u){const M=o+(h>0?1:-1);if(i(n,M))return!0}return!1}getBaseHeight(t,e){if(!this.sortedColumnsArray||!this.sortedRowsArray||this.sortedColumnsArray.length<2||this.sortedRowsArray.length<2)return 0;const i=this.tileSize||40,n=t/i,o=e/i,a=(z,j)=>{let C=0,D=z.length-1;for(;C<=D;){const G=C+D>>1;z[G]<j?C=G+1:D=G-1}return C-1},r=a(this.sortedColumnsArray,n),l=a(this.sortedRowsArray,o),c=this.sortedColumnsArray.length,h=this.sortedRowsArray.length,d=Math.max(0,Math.min(c-2,r)),u=d+1,f=this.sortedColumnsArray[d],g=this.sortedColumnsArray[u],M=Math.max(0,Math.min(h-2,l)),m=M+1,p=this.sortedRowsArray[M],A=this.sortedRowsArray[m],x=z=>{let j=0;for(let C=0;C<z.length;C++)j=j*31+z.charCodeAt(C)|0;return Math.abs(j)%1e4/1e4},b=(z,j)=>{if((z+j)%2!==0)return 0;const C=`I,${z},${j}`;if(x(C)<.3){const G=(z+j)%4===0?1:-1,X=x(C+"sharp")<.45?12+x(C+"h")*4:7+x(C+"h")*3;return G*X}return 0},L=b(d,M),T=b(u,M),_=b(d,m),R=b(u,m),y=(n-f)/(g-f),w=(o-p)/(A-p);return(1-y)*(1-w)*L+y*(1-w)*T+(1-y)*w*_+y*w*R}deformGeometryToHills(t,e,i){const n=t.attributes.position;if(n){for(let o=0;o<n.count;o++){const a=n.getX(o),r=n.getY(o),l=n.getZ(o),c=e+a,h=i+l,d=this.getBaseHeight(c,h);n.setY(o,r+d)}n.needsUpdate=!0,t.computeVertexNormals()}}getGroundHeight(t,e){const i=this.getBaseHeight(t,e);let n=.5+i;const o=this.spatialCellSize||40,a=Math.floor(t/o),r=Math.floor(e/o),l=this.obstacleGrid.get(`${a},${r}`);if(l){for(const c of l)if(c.isRamp&&t>=c.xMin-.3&&t<=c.xMax+.3&&e>=c.zMin-.3&&e<=c.zMax+.3){let d=0;c.slopeType==="Z"?c.slopeDir===1?d=(e-c.zMin)/(c.zMax-c.zMin):d=(c.zMax-e)/(c.zMax-c.zMin):c.slopeType==="X"&&(c.slopeDir===1?d=(t-c.xMin)/(c.xMax-c.xMin):d=(c.xMax-t)/(c.xMax-c.xMin));const u=.5+i+Math.max(0,Math.min(1,d))*(c.height-.5);u>n&&(n=u)}}return n}alignMeshToTerrain(t,e,i,n=null,o=.016){const a=this.getGroundHeight(e.x,e.z),r=Math.max(0,e.y-a);let l=1;if(r>.85&&(l=1-Math.min(1,(r-.85)/1.15),l=l*l*(3-2*l)),n===!0&&(l=0),Fo.setFromAxisAngle(cm,i),l<=.001){const I=Math.min(1,18*o);t.quaternion.slerp(Fo,I);return}const c=Math.cos(i),h=Math.sin(i),d=.95,u=1.3,f=e.x-d*c+u*h,g=e.z-d*-h+u*c,M=this.getGroundHeight(f,g),m=e.x+d*c+u*h,p=e.z+d*-h+u*c,A=this.getGroundHeight(m,p),x=e.x-d*c-u*h,b=e.z-d*-h-u*c,L=this.getGroundHeight(x,b),T=e.x+d*c-u*h,_=e.z+d*-h-u*c,R=this.getGroundHeight(T,_);Io.set(f,M,g),Do.set(m,A,p),Uo.set(x,L,b),No.set(T,R,_),jr.addVectors(Io,Do).multiplyScalar(.5),Zr.addVectors(Uo,No).multiplyScalar(.5),Cs.subVectors(jr,Zr).normalize(),Kr.addVectors(Io,Uo).multiplyScalar(.5),Jr.addVectors(Do,No).multiplyScalar(.5),Qr.subVectors(Jr,Kr),zo.crossVectors(Cs,Qr).normalize(),tl.crossVectors(zo,Cs).normalize(),el.makeBasis(tl,zo,Cs),il.setFromRotationMatrix(el);const y=Fo.clone().slerp(il,l),w=Math.min(1,18*o);t.quaternion.slerp(y,w)}}const Io=new P,Do=new P,Uo=new P,No=new P,jr=new P,Zr=new P,Cs=new P,Kr=new P,Jr=new P,Qr=new P,zo=new P,tl=new P,el=new se,Fo=new Ie,il=new Ie,cm=new P(0,1,0);class hm{constructor(){this.position=new P(0,.5,0),this.velocity=new P(0,0,0),this.heading=0,this.angularVelocity=0,this.externalSpin=0,this.mass=1350,this.maxSpeed=110,this.engineForce=75,this.brakingForce=115,this.drag=.052,this.rollingResistance=.025,this.steeringAngle=0,this.maxSteerAngle=.58,this.steeringSpeed=5.2,this.gripNormal=18.5,this.gripDrift=3.6,this.isDrifting=!1,this.driftTraction=1,this.wheelSpin=0,this.length=4.4,this.width=2,this.suspensionRestLength=.82,this.suspensionStiffness=32e3,this.suspensionDamping=1800,this.inertiaPitch=2400,this.inertiaRoll=1e3,this.cgHeight=.45,this.pitchVelocity=0,this.rollVelocity=0,this.bodyRoll=0,this.bodyPitch=0,this.inSlipstream=!1,this.justCrashed=!1,this.lastWallImpactSpeed=0,this.lastWallImpactNormal=new P,this.gear=1,this.prevGear=1,this.rpm=1e3,this.shiftTimer=0,this.gearRatios=[0,3.9,2.5,1.8,1.35,1,.8],this.gearMaxSpeeds=[0,18,33,52,72,94,115],this.justUpshifted=!1,this.isScraping=!1,this.scrapeNormal=new P,this.velocityY=0,this.isAirborne=!1,this.rolloverTimer=0,this.rolloverSpin=0,this.airTime=0,this.stuntPitchRotated=0,this.stuntRollRotated=0,this.stuntYawRotated=0,this.prevAirPitch=0,this.prevAirRoll=0,this.prevAirHeading=0,this.trickNotification="",this.nitroLevel=.5,this.maxNitro=1,this._fwdVec=new P,this._rightVec=new P,this.isBoosting=!1,this.driftDuration=0}update(t,e,i){if(t<=0)return;let n=0;(e.a||e.arrowleft)&&(n=this.maxSteerAngle),(e.d||e.arrowright)&&(n=-this.maxSteerAngle),this.steeringAngle+=(n-this.steeringAngle)*this.steeringSpeed*t;const o=this._fwdVec.set(Math.sin(this.heading),0,Math.cos(this.heading)),a=this._rightVec.set(Math.cos(this.heading),0,-Math.sin(this.heading)),r=this.velocity.dot(o),l=this.velocity.dot(a),c=Math.abs(r),h=e[" "]||e.spacebar,d=e.w||e.arrowup,u=e.s||e.arrowdown;if(d&&c<12&&this.gear===1){const Z=e.shift||this.isBoosting?1:.65;this.wheelSpin+=(Z-this.wheelSpin)*5*t}else this.wheelSpin+=(0-this.wheelSpin)*4*t;if(h&&c>7)this.isDrifting=!0,this.driftTraction=Math.max(.1,this.driftTraction-4.5*t);else if(this.isDrifting){const Z=Math.sign(this.steeringAngle),at=Math.sign(l);Z===at&&Z!==0?this.driftTraction=Math.min(1,this.driftTraction+1.6*t):this.driftTraction=Math.min(1,this.driftTraction+.5*t),(c<4||this.driftTraction>.85&&Math.abs(l)<2)&&(this.isDrifting=!1)}else this.driftTraction=Math.min(1,this.driftTraction+2.5*t);const f=this.isBoosting?this.nitroLevel>0:this.nitroLevel>=.1,g=(e.shift||e.n||e.f)&&f&&r>3&&this.gear!=="R";if(this.isBoosting=g,this.isBoosting&&(this.nitroLevel=Math.max(0,this.nitroLevel-.28*t)),this.isDrifting&&c>9&&Math.abs(l)>2.5){this.driftDuration+=t;const Z=Math.min(2,Math.abs(l)/8),at=.075*t*Z;this.nitroLevel=Math.min(this.maxNitro,this.nitroLevel+at)}else this.driftDuration=0;if(u?r<1.5&&this.gear!=="R"&&(this.prevGear=this.gear,this.gear="R",this.shiftTimer=.15,this.justUpshifted=!1):d&&this.gear==="R"&&(this.prevGear=this.gear,this.gear=1,this.shiftTimer=.15,this.justUpshifted=!0),this.shiftTimer>0&&(this.shiftTimer-=t),this.gear!=="R"&&this.gear!=="N"&&this.shiftTimer<=0){let Z=this.gear;Z<6&&c>this.gearMaxSpeeds[Z]*.92?(this.prevGear=Z,this.gear=Z+1,this.shiftTimer=.18,this.justUpshifted=!0):Z>1&&c<this.gearMaxSpeeds[Z-1]*.78&&(this.prevGear=Z,this.gear=Z-1,this.shiftTimer=.15,this.justUpshifted=!1)}if(this.shiftTimer>0)this.rpm+=(1500-this.rpm)*12*t;else if(this.gear==="R"){const Z=c/15,at=1e3+Math.min(1,Z)*6e3;this.rpm+=(at-this.rpm)*10*t}else{const Z=this.gear,at=Z>1?this.gearMaxSpeeds[Z-1]*.8:0,dt=this.gearMaxSpeeds[Z],St=(c-at)/(dt-at);let yt=1200+Math.max(0,Math.min(1,St))*6300;(c>=dt*.98||this.wheelSpin>.4)&&(this.rpm>=7700?yt=7100:yt=7950),this.rpm+=(yt-this.rpm)*14*t}this.rpm=Math.max(1e3,Math.min(8e3,this.rpm));let M=0;if(this.shiftTimer<=0&&d){let Z=1;this.gear==="R"?Z=1.4:Z=this.gearRatios[this.gear]||1;const at=1-this.wheelSpin*.35,dt=this.inSlipstream?1.16:1;M+=this.engineForce*Z*at*dt,this.isBoosting&&(M*=1.85),this.rpm>7800&&(M*=.05)}u&&(r>1?(M-=this.brakingForce,Math.abs(this.steeringAngle)>.25&&(this.isDrifting=!0,this.driftTraction=Math.max(.3,this.driftTraction-2*t))):this.gear==="R"&&(r>-8&&r<2?M-=this.engineForce*4:M-=this.engineForce*1.5));const p=-(this.inSlipstream?this.drag*.6:this.drag)*r*Math.abs(r),A=-this.rollingResistance*r,x=M+p+A;this.velocity.addScaledVector(o,x/this.mass*100*t);let b=0,L=0;if(i&&typeof i.getGroundHeight=="function"&&!this.isAirborne){const at=i.getGroundHeight(this.position.x+o.x*1,this.position.z+o.z*1),dt=i.getGroundHeight(this.position.x-o.x*1,this.position.z-o.z*1);b=(at-dt)/(1*2);const St=i.getGroundHeight(this.position.x+a.x*1,this.position.z+a.z*1),yt=i.getGroundHeight(this.position.x-a.x*1,this.position.z-a.z*1);L=(St-yt)/(1*2);const Tt=u&&this.gear!=="R"||h,B=this.velocity.dot(o);Tt&&Math.abs(B)<.5?this.velocity.addScaledVector(o,-B):this.velocity.addScaledVector(o,-18*b*t),Tt&&Math.abs(l)<.5?this.velocity.addScaledVector(a,-l):this.velocity.addScaledVector(a,-18*L*t)}const T=Bs.lerp(this.gripDrift,this.gripNormal,this.driftTraction),_=-l*T;this.velocity.addScaledVector(a,_*t);const R=this.isBoosting?this.maxSpeed*1.35:this.maxSpeed;if(this.velocity.length()>R&&this.velocity.setLength(R),this.isAirborne&&(this.velocity.x*=Math.exp(-.15*t),this.velocity.z*=Math.exp(-.15*t),this.velocityY<-38&&(this.velocityY=-38)),c>.5){const Z=this.isDrifting?1.95:1,at=Math.min(1,r/8),dt=this.steeringAngle*at*Z;h&&Math.abs(this.steeringAngle)>.1?this.angularVelocity+=this.steeringAngle*3.5*t:this.angularVelocity=dt}else this.angularVelocity=0;this.heading+=(this.angularVelocity+this.externalSpin)*t,this.externalSpin*=Math.exp(-4.5*t),this.position.addScaledVector(this.velocity,t);const w=[{x:-.95,z:1.3},{x:.95,z:1.3},{x:-.95,z:-1.3},{x:.95,z:-1.3}],I=[.5,.5,.5,.5],z=[0,0,0,0],j=Math.cos(this.heading),C=Math.sin(this.heading);let D=0,G=0;for(let Z=0;Z<4;Z++){const at=w[Z],dt=this.position.x+at.x*j+at.z*C,St=this.position.z-at.x*C+at.z*j,yt=i&&typeof i.getGroundHeight=="function"?i.getGroundHeight(dt,St):.5;I[Z]=yt;const Tt=at.z*b+at.x*L,B=yt-Tt,wt=this.position.y-at.z*this.bodyPitch-at.x*this.bodyRoll,S=Math.max(0,B+this.suspensionRestLength-wt);z[Z]=S;const W=this.velocityY-at.z*this.pitchVelocity-at.x*this.rollVelocity;if(S>0){let F=this.suspensionStiffness*S-this.suspensionDamping*W;F=Math.max(0,F),D+=F*-at.z,G+=F*-at.x}}const O=x/this.mass,X=-this.mass*O*this.cgHeight*3.5,J=-_*this.cgHeight*3.5,ot=this.isAirborne,lt=this.airTime,ct=z[0]+z[1]+z[2]+z[3],K=(I[0]+I[1]+I[2]+I[3])/4,it=this.position.y-K;if(ct<=.001&&it>1.35?(this.isAirborne=!0,this.airTime+=t):(this.isAirborne=!1,this.airTime=0),this.isAirborne&&this.airTime>.2){lt<=.2&&(this.stuntPitchRotated=0,this.stuntRollRotated=0,this.stuntYawRotated=0,this.prevAirPitch=this.bodyPitch,this.prevAirRoll=this.bodyRoll,this.prevAirHeading=this.heading);let Z=this.heading-this.prevAirHeading;for(;Z<-Math.PI;)Z+=Math.PI*2;for(;Z>Math.PI;)Z-=Math.PI*2;this.stuntPitchRotated+=Math.abs(this.bodyPitch-this.prevAirPitch),this.stuntRollRotated+=Math.abs(this.bodyRoll-this.prevAirRoll),this.stuntYawRotated+=Math.abs(Z),this.prevAirPitch=this.bodyPitch,this.prevAirRoll=this.bodyRoll,this.prevAirHeading=this.heading}if(this.rolloverTimer<=0){const at=this.position.y;if(it<1.35){const yt=K+.58,Tt=18+Math.min(12,this.velocity.length()*.1);this.position.y=Bs.lerp(this.position.y,yt,1-Math.exp(-Tt*t)),this.velocityY=(this.position.y-at)/t}else this.velocityY+=-22*t,this.position.y+=this.velocityY*t;let dt=0,St=0;this.isAirborne||(dt=(D+X)/this.inertiaPitch,St=(G+J)/this.inertiaRoll),this.pitchVelocity+=dt*t,this.bodyPitch+=this.pitchVelocity*t,this.pitchVelocity*=Math.exp(-3*t),this.rollVelocity+=St*t,this.bodyRoll+=this.rollVelocity*t,this.rollVelocity*=Math.exp(-3*t)}else this.velocityY+=-22*t,this.position.y+=this.velocityY*t,this.pitchVelocity=0,this.rollVelocity=0;if(this.isAirborne&&this.airTime>.2&&this.rolloverTimer<=0){let Z=0,at=0,dt=0;const St=e[" "]||e.spacebar;(e.w||e.arrowup)&&(Z=3.2),(e.s||e.arrowdown)&&(Z=-3.2),St?((e.a||e.arrowleft)&&(dt=3.6),(e.d||e.arrowright)&&(dt=-3.6)):((e.a||e.arrowleft)&&(at=-3.2),(e.d||e.arrowright)&&(at=3.2)),this.pitchVelocity+=Z*t,this.rollVelocity+=at*t,this.heading+=dt*t,this.pitchVelocity*=Math.exp(-2.2*t),this.rollVelocity*=Math.exp(-2.2*t);const yt=e.w||e.s||e.arrowup||e.arrowdown,Tt=!St&&(e.a||e.d||e.arrowleft||e.arrowright);let B=0,wt=0;if(i&&typeof i.getGroundHeight=="function"){const W=i.getGroundHeight(this.position.x+o.x*1,this.position.z+o.z*1),F=i.getGroundHeight(this.position.x-o.x*1,this.position.z-o.z*1),et=(W-F)/(1*2),k=i.getGroundHeight(this.position.x+a.x*1,this.position.z+a.z*1),v=i.getGroundHeight(this.position.x-a.x*1,this.position.z-a.z*1),E=(k-v)/(1*2);B=Math.max(-.5,Math.min(.5,-et)),wt=Math.max(-.5,Math.min(.5,-E))}yt||(this.pitchVelocity+=(B-this.bodyPitch)*2.5*t),Tt||(this.rollVelocity+=(wt-this.bodyRoll)*2.5*t)}if(this.rolloverTimer<=0&&!this.isAirborne&&(this.bodyPitch=Math.max(-.4,Math.min(.4,this.bodyPitch)),this.bodyRoll=Math.max(-.5,Math.min(.5,this.bodyRoll))),ot&&!this.isAirborne&&lt>.2){for(;this.bodyPitch<-Math.PI;)this.bodyPitch+=Math.PI*2;for(;this.bodyPitch>Math.PI;)this.bodyPitch-=Math.PI*2;for(;this.bodyRoll<-Math.PI;)this.bodyRoll+=Math.PI*2;for(;this.bodyRoll>Math.PI;)this.bodyRoll-=Math.PI*2;let Z="",at=0,dt=0;if(this.stuntPitchRotated>=5.5){const B=Math.round(this.stuntPitchRotated/6.28),S=this.pitchVelocity>0?"BACKFLIP":"FRONTFLIP";B>1?(Z=`DOUBLE ${S}!`,at=1500,dt=1):(Z=`${S}!`,at=500,dt=.5)}this.stuntRollRotated>=5.5&&(Math.round(this.stuntRollRotated/6.28)>1?(Z="DOUBLE BARREL ROLL!",at=2e3,dt=1):(Z="BARREL ROLL!",at=750,dt=.5)),this.stuntYawRotated>=5.5&&(Math.round(this.stuntYawRotated/6.28)>1?(Z="720 MEGA SPIN!",at=2500,dt=1):(Z="360 SPIN!",at=1e3,dt=.6)),this.stuntPitchRotated>=5.5&&this.stuntYawRotated>=5.5&&(Z="RODEO FLIP!",at=3e3,dt=1);const St=Math.abs(this.bodyRoll),yt=Math.abs(this.bodyPitch),Tt=St<.22&&yt<.22;if(Z!=="")if(Tt){this.trickNotification=`CLEAN LANDING: ${Z} (+${at} PTS)`,this.nitroLevel=Math.min(this.maxNitro,this.nitroLevel+dt);const B=this.velocity.length();this.velocity.setLength(Math.max(B,45))}else this.trickNotification=`LANDED: ${Z} (+${at} PTS)`,this.nitroLevel=Math.min(this.maxNitro,this.nitroLevel+dt*.5);else if(Tt&&lt>.8){this.trickNotification="CLEAN LANDING!";const B=this.velocity.length();this.velocity.setLength(Math.max(B,38))}}this.position.y<K&&(this.position.y=K,this.velocityY<-2?this.velocityY=-this.velocityY*.15:this.velocityY=0),this.rolloverTimer>0&&(this.rolloverTimer-=t,this.bodyRoll+=this.rolloverSpin*t,this.bodyPitch+=this.rolloverSpin*.3*t,this.rolloverSpin*=Math.exp(-2.2*t),this.velocity.multiplyScalar(Math.exp(-2*t)));const gt=i.checkCollision(this.position.x,this.position.z,2);if(gt.collision){this.position.x+=gt.normalX*gt.overlap,this.position.z+=gt.normalZ*gt.overlap;const Z=new P(gt.normalX,0,gt.normalZ),at=this.velocity.dot(Z);if(this.velocity.length()>4?(this.isScraping=!0,this.scrapeNormal=Z.clone()):this.isScraping=!1,at<0){this.velocity.addScaledVector(Z,-1.4*at),this.angularVelocity*=-.5,this.isDrifting=!1;const St=-at;St>5&&(this.lastWallImpactSpeed=St,this.justCrashed=!0,this.lastWallImpactNormal.copy(Z))}}else this.isScraping=!1}reset(){this.position.set(0,.5,0),this.velocity.set(0,0,0),this.heading=0,this.angularVelocity=0,this.isDrifting=!1,this.driftTraction=1,this.wheelSpin=0,this.gear=1,this.prevGear=1,this.rpm=1e3,this.shiftTimer=0,this.justUpshifted=!1,this.isScraping=!1,this.scrapeNormal.set(0,0,0),this.externalSpin=0,this.velocityY=0,this.isAirborne=!1,this.rolloverTimer=0,this.rolloverSpin=0,this.airTime=0,this.pitchVelocity=0,this.rollVelocity=0,this.bodyRoll=0,this.bodyPitch=0,this.inSlipstream=!1,this.justCrashed=!1}}class dm{constructor(t,e,i,n,o){this.id=t,this.name=e,this.colorHex=i,this.position=n.clone(),this.spawnPos=n.clone(),this.velocity=new P,this.heading=0,this.angularVelocity=0,this.speed=0,this.navVariance=t*.37+Math.random()*1.8,this.cornerCutBias=.4+Math.random()*.6,this.alleyHunger=.3+Math.random()*.7,this.aggression=.8+Math.random()*.5,this.maxSpeedBase=(55+Math.random()*22)*o,this.maxSpeed=this.maxSpeedBase,this.accel=(28+Math.random()*10)*o,this.braking=55+Math.random()*20,this.drag=.018+Math.random()*.008,this.lineOffset=(Math.random()-.5)*10,this._lineOffsetTimer=Math.random()*6,this.meshGroup=null,this.wheels=null,this.steeringAngle=0,this.maxSteerAngle=.65,this.isDrifting=!1,this.isBoosting=!1,this.recoveryBoostTimer=0,this.currentIndex=0,this.lapCurrent=1,this.unorderedCleared=new Set,this.completed=!1,this.timeFinished=0,this.triggerRadius=32,this._currentPath=null,this._pathWptIdx=0,this._pathForCheckpoint=-1,this._pathForLap=-1,this._alleyCheckTimer=0,this._injectedAlleyPt=null,this._stuckTimer=0,this._longStuck=0,this._escapeTimer=0,this._escapeTargetHdg=0,this._dodgeSide=0,this._dodgeTimer=0,this._dodgeApply=0,this._prevPos=new P(n.x,n.y,n.z),this._recentDist=10,this._stuckAnchorPos=new P(n.x,n.y,n.z),this._stuckCheckTimer=2,this._isTrapped=!1,this.nitroLevel=.5+Math.random()*.5,this.isNitroBoosting=!1}update(t,e,i,n,o){if(this.debugLookahead=null,this.completed||!i.active){this.speed=Math.max(0,this.speed-this.braking*.4*t);const ct=new P(Math.sin(this.heading),0,Math.cos(this.heading));this.velocity.copy(ct).multiplyScalar(this.speed),this.position.addScaledVector(this.velocity,t);const K=e&&typeof e.getGroundHeight=="function"?e.getGroundHeight(this.position.x,this.position.z):.5;this.position.y+=(K-this.position.y)*12*t;return}if(t=Math.min(t,.05),this.recoveryBoostTimer=Math.max(0,this.recoveryBoostTimer-t),this._lineOffsetTimer-=t,this._lineOffsetTimer<=0){this._lineOffsetTimer=4+Math.random()*8;const ct=10*this.cornerCutBias;this.lineOffset=(Math.random()-.5)*ct}const{target:a,targetPos:r}=this._resolveTarget(i);if(!r){this.completed=!0,this.timeFinished=i.timeElapsed;return}if(i.playerPos){const ct=i.checkpoints.length||1,K=i.lapCurrent*ct+i.currentIndex,it=this.lapCurrent*ct+this.currentIndex,gt=K-it,Z=gt>0?1+Math.min(.3,gt*.08):Math.max(.78,1+gt*.06);this.maxSpeed=this.maxSpeedBase*Z}if((!this._currentPath||this._pathForCheckpoint!==this.currentIndex||this._pathForLap!==this.lapCurrent)&&o&&this._computePath(o,r),o&&!this._escapeTimer&&(this._alleyCheckTimer-=t,this._alleyCheckTimer<=0&&(this._alleyCheckTimer=.6+Math.random()*.3,this._tryInjectAlley(e,r))),this._escapeTimer>0){this._escapeTimer-=t,this._tickEscape(t,e),this._applyWallPushback(e),this._checkCheckpoints(a,i,e),this._updateMesh(e,t);return}const c=this._getLookaheadPoint();c||((c==null?void 0:c.copy(r))??r.clone());const h=new P(Math.sin(this.heading),0,Math.cos(this.heading)),d=new P(Math.cos(this.heading),0,-Math.sin(this.heading)),u=c?c.clone().addScaledVector(d,this.lineOffset*.3):null,f=u&&!e.checkCollision(u.x,u.z,1.5).collision?u:c||r.clone();this._dodgeTimer-=t,this._dodgeTimer<=0&&this.speed>4&&(this._dodgeTimer=this.isNitroBoosting?.05:.1,this._dodgeSide=this._evaluateDodge(i,n,h,d,e));const g=this._dodgeSide*5,M=f.clone().addScaledVector(d,g),m=e.checkCollision(M.x,M.z,1.5).collision?f:M;this.debugLookahead=m;const p=m.x-this.position.x,A=m.z-this.position.z;let x=Math.atan2(p,A);const b=e.isAlley?e.isAlley(Math.round(this.position.x/e.tileSize),Math.round(this.position.z/e.tileSize)):!1;if(b){const ct=e.checkCollision(this.position.x-d.x*2,this.position.z-d.z*2,1.2),K=e.checkCollision(this.position.x-d.x*3.5,this.position.z-d.z*3.5,1.2),it=e.checkCollision(this.position.x+d.x*2,this.position.z+d.z*2,1.2),gt=e.checkCollision(this.position.x+d.x*3.5,this.position.z+d.z*3.5,1.2),Z=ct.collision?2:K.collision?3.5:6,at=it.collision?2:gt.collision?3.5:6;x+=(at-Z)*.04}let L=x-this.heading;for(;L>Math.PI;)L-=Math.PI*2;for(;L<-Math.PI;)L+=Math.PI*2;const T=1.9,_=Math.max(-T,Math.min(T,L*3.2));this.angularVelocity+=(_-this.angularVelocity)*16*t,this.heading+=this.angularVelocity*t,this.steeringAngle=Math.max(-this.maxSteerAngle,Math.min(this.maxSteerAngle,_*.38));let R=this.maxSpeed;const y=Math.abs(L);y>.4&&(R*=Math.max(.35,1-(y-.4)*1.1));const w=this.position.clone().addScaledVector(h,b?7:12);e.checkCollision(w.x,w.z,b?1.8:2.4).collision&&(R=Math.min(R,b?10:16));const z=this.position.clone().addScaledVector(h,b?4:6);e.checkCollision(z.x,z.z,b?1.6:2.2).collision&&(R=0);let j=1/0;const C=[];i.playerPos&&C.push(i.playerPos),i.aiRacers.forEach(ct=>{ct.id!==this.id&&C.push(ct.position)}),n&&n.vehicles&&n.vehicles.forEach(ct=>C.push(ct.position));for(const ct of C){const K=ct.clone().sub(this.position),it=K.length();it<20&&K.normalize().dot(h)>.82&&it<j&&(j=it)}if(j<12){const ct=j<5?0:(j-5)*3.5;R=Math.min(R,ct)}this.isNitroBoosting?(this.nitroLevel=Math.max(0,this.nitroLevel-.25*t),(this.nitroLevel<=0||y>.35||this.speed<5||j<18)&&(this.isNitroBoosting=!1)):(this.nitroLevel=Math.min(1,this.nitroLevel+(this.isDrifting?.15:.04)*t),y<.12&&this.speed>15&&this.nitroLevel>.25&&!this._escapeTimer&&Math.random()<.03&&(this.isNitroBoosting=!0));const D=this.recoveryBoostTimer>0&&this.speed<35,O=D||this.isNitroBoosting?D?this.accel*2.8:this.accel*1.85:this.accel;this.isNitroBoosting&&(R*=1.25),this.speed<R?this.speed+=O*t:this.speed-=Math.min(this.braking*.5,this.speed-R)*t,this.speed-=this.drag*this.speed*Math.abs(this.speed)*t,this.speed=Math.max(-8,Math.min(this.maxSpeed,this.speed)),this.velocity.set(Math.sin(this.heading)*this.speed,0,Math.cos(this.heading)*this.speed);const X=this.position.distanceTo(this._prevPos);this._prevPos.copy(this.position);const J=t>0?X/t:0;if(this._recentDist+=(J-this._recentDist)*1.5*t,this._stuckCheckTimer-=t,this._stuckCheckTimer<=0){this._stuckCheckTimer=2;const ct=this.position.distanceTo(this._stuckAnchorPos);this._stuckAnchorPos.copy(this.position),this._isTrapped=ct<4.5}if(this._recentDist<1||this._isTrapped?(this._stuckTimer+=t,this._longStuck+=t):this._stuckTimer=0,this._stuckTimer>1){this._beginEscape(e,d,b,o,r);return}if(this._longStuck>5.5){this._longStuck=0,this._stuckTimer=0,this._respawn(i,e);return}this.position.addScaledVector(this.velocity,t);const lt=e&&typeof e.getGroundHeight=="function"?e.getGroundHeight(this.position.x,this.position.z):.5;this.position.y+=(lt-this.position.y)*12*t,this._applyWallPushback(e),this._checkCheckpoints(a,i,e),this.isBoosting=D||this.isNitroBoosting,this.isDrifting=y>.45&&this.speed>12,this._updateMesh(e,t)}_computePath(t,e){this._currentPath=t.findPath(this.position.x,this.position.z,e.x,e.z,this.navVariance),this._postProcessPath(t.world),this._pathWptIdx=0,this._pathForCheckpoint=this.currentIndex,this._pathForLap=this.lapCurrent}_postProcessPath(t){if(!this._currentPath||this._currentPath.length<3)return;const e=this._currentPath;for(let i=1;i<e.length-1;i++){const n=e[i-1],o=e[i],a=e[i+1];let r=n.x-o.x,l=n.z-o.z,c=a.x-o.x,h=a.z-o.z;const d=Math.sqrt(r*r+l*l),u=Math.sqrt(c*c+h*h);if(d<.001||u<.001)continue;r/=d,l/=d,c/=u,h/=u;let f=r+c,g=l+h;const M=Math.sqrt(f*f+g*g);if(M<.01)continue;if(f/=M,g/=M,r*c+l*h>-.95){const p=4+this.cornerCutBias*8,A=o.x+f*p,x=o.z+g*p;t.checkCollision(A,x,2).collision||(o.x=A,o.z=x)}}}_tryInjectAlley(t,e){if(!this._currentPath||this._pathWptIdx>=this._currentPath.length)return;const i=this._currentPath[this._pathWptIdx],o=new P().subVectors(i,this.position).length();if(o<15||o>120)return;const a=6;for(let r=1;r<=a;r++){const l=r/a,c=this.position.clone().lerp(i,l),h=Math.round(c.x/t.tileSize),d=Math.round(c.z/t.tileSize);if(t.isAlley&&t.isAlley(h,d)){const u=new P(h*t.tileSize,.5,d*t.tileSize);if(!t.checkCollision(u.x,u.z,2.2).collision){this._currentPath.splice(this._pathWptIdx,0,u);break}}}}_getLookaheadPoint(){const t=this._currentPath;if(!t||t.length===0)return null;const e=(h,d)=>{const u=h.x-d.x,f=h.z-d.z;return Math.sqrt(u*u+f*f)};let i=this._pathWptIdx,n=e(this.position,t[i]);const o=Math.min(t.length,this._pathWptIdx+4);for(let h=this._pathWptIdx+1;h<o;h++){const d=e(this.position,t[h]);d<n&&(n=d,i=h)}for(i>this._pathWptIdx&&(this._pathWptIdx=i);this._pathWptIdx<t.length-1&&e(this.position,t[this._pathWptIdx])<10;)this._pathWptIdx++;let r=Math.max(14,Math.min(40,this.speed*.55)),l=this.position.x,c=this.position.z;for(let h=this._pathWptIdx;h<t.length;h++){const d=t[h],u=d.x-l,f=d.z-c,g=Math.sqrt(u*u+f*f);if(!(g<.01)){if(g>=r){const M=r/g;return new P(l+u*M,.5,c+f*M)}r-=g,l=d.x,c=d.z}}return t[t.length-1].clone()}_evaluateDodge(t,e,i,n,o){const a=[];t.playerPos&&a.push(t.playerPos),t.aiRacers.forEach(d=>{d.id!==this.id&&a.push(d.position)}),e&&(e.vehicles&&e.vehicles.forEach(d=>a.push(d.position)),e.parkedVehicles&&e.parkedVehicles.forEach(d=>a.push(d.position)));const r=Math.max(18,this.speed*(this.isNitroBoosting?.95:.8)),l=this.isNitroBoosting?3.8:2.8;let c=0,h=1/0;for(const d of[-1,0,1]){let u=Math.abs(d)*.4;for(let f=1;f<=5;f++){const g=f/5*r,M=this.position.clone().addScaledVector(i,g).addScaledVector(n,d*l*(g/r));if(o.checkCollision(M.x,M.z,2.2).collision){u+=9999;break}for(const m of a)if(M.distanceTo(m)<5.5){u+=300;break}}u<h&&(h=u,c=d)}return c}_beginEscape(t,e,i,n,o){let a=null;for(const r of[2.4,3.5,5,7]){const l=t.checkCollision(this.position.x,this.position.z,r);if(l.collision){a=new P(l.normalX,0,l.normalZ);break}}if(a){const r=a.dot(e);this._escapeTargetHdg=this.heading+(r>=0?-Math.PI/2:Math.PI/2)}else this._escapeTargetHdg=this.heading+Math.PI/2;for(;this._escapeTargetHdg>Math.PI;)this._escapeTargetHdg-=Math.PI*2;for(;this._escapeTargetHdg<-Math.PI;)this._escapeTargetHdg+=Math.PI*2;this.speed=0,this.velocity.set(0,0,0),this.angularVelocity=0,this.steeringAngle=0,this._escapeTimer=i?.85:1.35,this._stuckTimer=0,this.recoveryBoostTimer=1.5,this._isTrapped=!1,this._stuckCheckTimer=2,this._stuckAnchorPos.copy(this.position),n&&o&&this._computePath(n,o),this._tickEscape(0,t),this._applyWallPushback(t),this._updateMesh(t,.016)}_tickEscape(t,e){let i=this._escapeTargetHdg-this.heading;for(;i>Math.PI;)i-=Math.PI*2;for(;i<-Math.PI;)i+=Math.PI*2;const n=2.8;this.heading+=Math.sign(i)*Math.min(Math.abs(i),n*t),this._escapeTimer>.25?this.speed=-16:this.speed=0,this.velocity.set(Math.sin(this.heading)*this.speed,0,Math.cos(this.heading)*this.speed),this.position.addScaledVector(this.velocity,t);const o=e&&typeof e.getGroundHeight=="function"?e.getGroundHeight(this.position.x,this.position.z):.5;this.position.y+=(o-this.position.y)*12*t}_applyWallPushback(t){const e=t.checkCollision(this.position.x,this.position.z,2);if(!e.collision)return;this.position.x+=e.normalX*(e.overlap+.1),this.position.z+=e.normalZ*(e.overlap+.1);const i=new P(e.normalX,0,e.normalZ),n=this.velocity.dot(i);n<0&&this.velocity.addScaledVector(i,-n);const o=new P(Math.sin(this.heading),0,Math.cos(this.heading));this.speed>0&&o.dot(i)<-.4&&(this.speed*=.25),this._stuckTimer+=.18,this._longStuck+=.18}_respawn(t,e){const i=t.checkpoints;let n,o;if(t.mode==="unordered"){const l=[];if(i.forEach((h,d)=>{this.unorderedCleared.has(d)||l.push({cp:h,i:d})}),!l.length)return;const c=l[Math.floor(Math.random()*l.length)];n=c.i,o=c.cp}else n=Math.max(0,this.currentIndex-1),o=i[n];if(!o)return;let a=o.x,r=o.z;if(e.checkCollision(a,r,2.5).collision)t:for(const l of[6,10,16,24])for(let c=0;c<8;c++){const h=c/8*Math.PI*2,d=o.x+Math.cos(h)*l,u=o.z+Math.sin(h)*l;if(!e.checkCollision(d,u,2.5).collision){a=d,r=u;break t}}if(this.position.set(a,.5,r),this.velocity.set(0,0,0),this.speed=0,this.angularVelocity=0,this._stuckTimer=0,this._escapeTimer=0,this._longStuck=0,this.recoveryBoostTimer=1.5,this._isTrapped=!1,this._stuckCheckTimer=2,this._stuckAnchorPos.copy(this.position),this._prevPos.copy(this.position),this._recentDist=10,this._currentPath=null,t.mode!=="unordered"){this.currentIndex=n;const l=(n+1)%i.length,c=i[l];c&&(this.heading=Math.atan2(c.x-a,c.z-r))}}_resolveTarget(t){const e=t.checkpoints;let i=null,n=null;if(t.mode==="unordered"){let o=1/0;e.forEach((a,r)=>{if(!this.unorderedCleared.has(r)){const l=(a.x-this.position.x)**2+(a.z-this.position.z)**2;l<o&&(o=l,i=a)}})}else this.currentIndex<e.length&&(i=e[this.currentIndex]);return i&&(n=new P(i.x,.5,i.z)),{target:i,targetPos:n}}_checkCheckpoints(t,e,i){if(!t)return;const n=this.position.x-t.x,o=this.position.z-t.z,a=Math.sqrt(n*n+o*o),r=Math.round(this.position.x/i.tileSize),l=Math.round(this.position.z/i.tileSize),c=i.isAlley&&i.isAlley(r,l)?65:this.triggerRadius;if(a>=c)return;const h=e.checkpoints;if(this._longStuck=0,e.mode==="unordered"){const d=h.findIndex(u=>u===t);d!==-1&&(this.unorderedCleared.add(d),this._currentPath=null,this.unorderedCleared.size===h.length&&(this.completed=!0,this.timeFinished=e.timeElapsed))}else this._currentPath=null,e.mode==="circuit"?this.currentIndex===h.length-1?this.lapCurrent<e.lapsTotal?(this.lapCurrent++,this.currentIndex=0):(this.completed=!0,this.timeFinished=e.timeElapsed):this.currentIndex++:this.currentIndex===h.length-1?(this.completed=!0,this.timeFinished=e.timeElapsed):this.currentIndex++}_updateMesh(t,e){this.meshGroup&&(this.meshGroup.position.copy(this.position),t&&typeof t.alignMeshToTerrain=="function"?t.alignMeshToTerrain(this.meshGroup,this.position,this.heading,!1,e||.016):this.meshGroup.rotation.y=this.heading)}}class fm{constructor(t){this.world=t,this.ts=t.tileSize,this._cols=Array.from(t.roadColumns).sort((e,i)=>e-i),this._rows=Array.from(t.roadRows).sort((e,i)=>e-i),this._colIdx=new Map(this._cols.map((e,i)=>[e,i])),this._rowIdx=new Map(this._rows.map((e,i)=>[e,i]))}snapToNode(t,e){const i=this._bsNearest(this._cols,t/this.ts),n=this._bsNearest(this._rows,e/this.ts);return{gx:i,gz:n}}findPath(t,e,i,n,o=0){const a=this.snapToNode(t,e),r=this.snapToNode(i,n);if(a.gx===r.gx&&a.gz===r.gz)return[new P(i,.5,n)];const l=(x,b)=>`${x},${b}`,c=r.gx,h=r.gz,d=this.ts,u=(x,b)=>{const L=(x-c)*d,T=(b-h)*d;return Math.sqrt(L*L+T*T)},f=new Map,g=new Set,M=new Map,m=l(a.gx,a.gz);f.set(m,{gx:a.gx,gz:a.gz,g:0,f:u(a.gx,a.gz),parent:null}),M.set(m,0);const p=4e3;let A=0;for(;f.size>0&&A++<p;){let x=null,b=1/0;for(const[_,R]of f)R.f<b&&(b=R.f,x=_);const L=f.get(x);if(f.delete(x),g.add(x),L.gx===r.gx&&L.gz===r.gz)return this._reconstruct(L,i,n);const T=M.get(x)??0;for(const _ of this._neighbors(L.gx,L.gz,o)){const R=l(_.gx,_.gz);if(g.has(R))continue;const y=T+_.cost;y<(M.get(R)??1/0)&&(M.set(R,y),f.set(R,{gx:_.gx,gz:_.gz,g:y,f:y+u(_.gx,_.gz),parent:L}))}}return console.warn("[NavGraph] A* found no path, falling back to direct target"),[new P(i,.5,n)]}_reconstruct(t,e,i){const n=[];let o=t;for(;o;)n.unshift(new P(o.gx*this.ts,.5,o.gz*this.ts)),o=o.parent;return n.push(new P(e,.5,i)),n}_neighbors(t,e,i=0){const n=[],o=this._colIdx.get(t),a=this._rowIdx.get(e);return o===void 0||a===void 0||(o>0&&n.push(this._edge(t,e,this._cols[o-1],e,i)),o<this._cols.length-1&&n.push(this._edge(t,e,this._cols[o+1],e,i)),a>0&&n.push(this._edge(t,e,t,this._rows[a-1],i)),a<this._rows.length-1&&n.push(this._edge(t,e,t,this._rows[a+1],i))),n}_edge(t,e,i,n,o=0){const a=(i-t)*this.ts,r=(n-e)*this.ts,l=Math.sqrt(a*a+r*r),c=Math.round((t+i)/2),h=Math.round((e+n)/2),d=this.world.isAlley&&this.world.isAlley(c,h),u=o>0?1+Math.sin(i*o*5.1+n*o*3.7)*.3:1;return{gx:i,gz:n,cost:l*(d?.55:1)*Math.max(.5,u)}}_bsNearest(t,e){if(t.length===0)return 0;let i=0,n=t.length-1;for(;i<n;){const o=i+n>>1;t[o]<e?i=o+1:n=o}return i>0&&Math.abs(t[i-1]-e)<=Math.abs(t[i]-e)&&i--,t[i]}}class um{constructor(){this.active=!1,this.mode=null,this.checkpoints=[],this.currentIndex=0,this.lapsTotal=3,this.lapCurrent=1,this.unorderedCleared=new Set,this.timeElapsed=0,this.completed=!1,this.radius=32,this.aiRacers=[],this.worldEvents=[],this.maps={sprint:[{x:0,z:160},{x:160,z:160},{x:160,z:0},{x:320,z:0},{x:320,z:-160},{x:160,z:-160},{x:0,z:-160},{x:-160,z:-160},{x:-160,z:0}],circuit:[{x:0,z:160},{x:160,z:160},{x:160,z:0},{x:0,z:0}],unordered:[{x:0,z:160},{x:160,z:-160},{x:-160,z:160},{x:-160,z:-160},{x:160,z:160}],autocross:[{x:0,z:20},{x:-15,z:40},{x:15,z:60},{x:-15,z:80},{x:0,z:100},{x:20,z:120},{x:0,z:140}]}}generateRandomSprint(t,e,i=null){const n=Math.sin(e),o=Math.cos(e),a=Math.round(t.x/160)*160,r=Math.round(t.z/160)*160,l=Math.abs(n)>=Math.abs(o)?Math.sign(n)*160:0,c=Math.abs(o)>Math.abs(n)?Math.sign(o)*160:0,h=a+l,d=r+c,u=[];let f={x:h,z:d};u.push(f);const g=new Set;g.add(`${a},${r}`),g.add(`${h},${d}`);const M=.18;let m={x:l,z:c};const p=i||5+Math.floor(Math.random()*8),A=()=>{const x=Math.random();return x<.5?2:x<.8?3:4};for(let x=0;x<p;x++){const b=[],L=A(),T=160*L,_=[{x:1,z:0,kind:"straight"},{x:-1,z:0,kind:"side"},{x:0,z:1,kind:"straight"},{x:0,z:-1,kind:"side"},{x:1,z:1,kind:"diagonal"},{x:-1,z:1,kind:"diagonal"},{x:1,z:-1,kind:"diagonal"},{x:-1,z:-1,kind:"diagonal"}];for(const O of _){const X={x:f.x+O.x*T,z:f.z+O.z*T};if(g.has(`${X.x},${X.z}`))continue;const J={x:X.x-f.x,z:X.z-f.z};if(J.x===-m.x&&J.z===-m.z)continue;const lt=J.x*m.x+J.z*m.z;if(lt<0)continue;const K=Math.hypot(X.x-a,X.z-r)*M,it=L*18,gt=lt+K+it;b.push({n:X,score:gt,kind:O.kind,stepCount:L})}if(b.length===0)break;const R=b.filter(O=>O.kind==="diagonal"),y=b.filter(O=>O.kind==="straight"),w=b.filter(O=>O.kind==="side"),I=Math.random();let z=w;I<.4?z=R.length>0?R:y:I<.8&&(z=y.length>0?y:R),z.length===0&&(z=b),z.sort((O,X)=>X.score-O.score);const j=z.slice(0,Math.max(1,Math.ceil(z.length/2))),C=Math.random()<.7?j:z,G=C[Math.floor(Math.random()*C.length)].n;u.push(G),g.add(`${G.x},${G.z}`),m={x:G.x-f.x,z:G.z-f.z},f=G}return u}generateRandomCircuit(t=null){const i=[{x:0,z:1},{x:1,z:0},{x:0,z:-1},{x:-1,z:0}],n=t||6+Math.floor(Math.random()*5),o=[],a=new Set(["0,0"]);let r={x:0,z:0},l=0;for(let c=0;c<n;c++){const h=[];for(const g of[0,1,-1]){const M=((l+g)%4+4)%4,m=i[M],p={x:r.x+m.x*160,z:r.z+m.z*160},A=`${p.x},${p.z}`;if(!a.has(A)){const x=g===0?3:1;h.push({n:p,newDirIdx:M,weight:x})}}if(h.length===0)break;const d=h.reduce((g,M)=>g+M.weight,0);let u=Math.random()*d,f=h[0];for(const g of h)if(u-=g.weight,u<=0){f=g;break}r=f.n,l=f.newDirIdx,a.add(`${r.x},${r.z}`),o.push({x:r.x,z:r.z})}return o}generateRandomUnordered(t=null){const e=[],i=new Set;i.add("0,0");const n=t||5;for(;e.length<n;){const o=(Math.floor(Math.random()*5)-2)*160,a=(Math.floor(Math.random()*5)-2)*160,r=`${o},${a}`;i.has(r)||(i.add(r),e.push({x:o,z:a}))}return e}generateRandomAutocross(){const t=[];for(let i=1;i<=7;i++){const n=i*20*1,o=(Math.random()>.5?1:-1)*(8+Math.random()*6);t.push({x:o,z:n})}return t}startRace(t,e,i,n,o){this.active=!0,this.mode=t;const a=o&&o.checkpoints?o.checkpoints:null,r=o&&o.racers?o.racers:3;if(this.lapsTotal=o&&o.laps?o.laps:t==="circuit"?3:1,t==="sprint"){const g=i||new P(0,0,0),M=n!==void 0?n:0;this.checkpoints=this.generateRandomSprint(g,M,a)}else t==="circuit"?this.checkpoints=this.generateRandomCircuit(a):t==="unordered"?this.checkpoints=this.generateRandomUnordered():t==="autocross"?this.checkpoints=this.generateRandomAutocross():this.checkpoints=JSON.parse(JSON.stringify(this.maps[t]||this.maps.circuit));t!=="autocross"&&e&&typeof e.snapToNearestIntersection=="function"&&(this.checkpoints=this.checkpoints.map(g=>{const M=e.snapToNearestIntersection(g.x,g.z);return{x:M.x,z:M.z}})),this.currentIndex=0,this.lapCurrent=1,this.timeElapsed=0,this.completed=!1,this.unorderedCleared.clear();const l=i?i.x:0,c=i?i.z:0;let h=0;if(this.checkpoints&&this.checkpoints.length>0){const g=this.checkpoints[0];h=Math.atan2(g.x-l,g.z-c)}const d=(g,M)=>e&&typeof e.getGroundHeight=="function"?e.getGroundHeight(g,M):.5,u=[];for(let g=0;g<r;g++){const M=Math.floor(g/2),m=g%2===0?-1:1,p=g===2&&r===3?0:m*6;u.push({x:l+p,z:c-8-M*8})}const f=[3800852,16711807,8323327,16753920,65535,16766720,16711680,16777215];this.aiRacers=[];for(let g=0;g<r;g++){const M=1+Math.random()*.25;this.aiRacers.push(new dm(g+1,`Racer ${g+1}`,f[g%f.length],new P(u[g].x,d(u[g].x,u[g].z),u[g].z),M))}this.aiRacers.forEach(g=>{g.heading=h}),this.navGraph=new fm(e),console.log(`Starting ${t} race with ${this.checkpoints.length} checkpoints.`)}update(t,e,i,n){if(!this.active||this.completed)return null;this.timeElapsed+=e,this.playerPos=t;const o=t.x,a=t.z;this.aiRacers.forEach(l=>{l.update(e,i,this,n,this.navGraph)});let r=!1;if(this.mode==="unordered"){if(this.checkpoints.forEach((l,c)=>{if(!this.unorderedCleared.has(c)){const h=l.x-o,d=l.z-a,u=h*h+d*d;let f=!1;if(i&&typeof i.isAlley=="function"){const M=Math.round(o/i.tileSize),m=Math.round(a/i.tileSize);i.isAlley(M,m)&&(f=!0)}const g=f?65:this.radius;u<g*g&&(this.unorderedCleared.add(c),r=!0,console.log(`Cleared unordered checkpoint ${c}`))}}),this.unorderedCleared.size===this.checkpoints.length)return this.completed=!0,this.active=!1,console.log(`Completed Unordered Race in ${this.timeElapsed.toFixed(2)}s`),{event:"finish",time:this.timeElapsed}}else{const l=this.checkpoints[this.currentIndex];if(!l)return console.warn(`Race error: Checkpoint at index ${this.currentIndex} is undefined. Ending race.`),this.completed=!0,this.active=!1,null;const c=l.x-o,h=l.z-a,d=c*c+h*h;let u=!1;if(i&&typeof i.isAlley=="function"){const g=Math.round(o/i.tileSize),M=Math.round(a/i.tileSize);i.isAlley(g,M)&&(u=!0)}const f=u?65:this.radius;if(d<f*f)if(r=!0,this.mode==="circuit"){if(this.currentIndex===this.checkpoints.length-1)return this.lapCurrent<this.lapsTotal?(this.lapCurrent++,this.currentIndex=0,console.log(`Lap ${this.lapCurrent}/${this.lapsTotal} started.`),{event:"lap",lap:this.lapCurrent}):(this.completed=!0,this.active=!1,console.log(`Completed Circuit Race in ${this.timeElapsed.toFixed(2)}s`),{event:"finish",time:this.timeElapsed});this.currentIndex++}else{if(this.currentIndex===this.checkpoints.length-1)return this.completed=!0,this.active=!1,console.log(`Completed Race in ${this.timeElapsed.toFixed(2)}s`),{event:"finish",time:this.timeElapsed};this.currentIndex++}}return r?{event:"checkpoint",nextIndex:this.currentIndex}:null}getActiveCheckpoint(){return!this.active||this.completed||this.mode==="unordered"?null:this.checkpoints[this.currentIndex]}calculateRankings(t){if(!this.active&&!this.completed)return[];const e=[];let i=this.currentIndex,n=this.lapCurrent,o=this.checkpoints[i],a=0;if(o){const l=o.x-t.x,c=o.z-t.z;a=Math.sqrt(l*l+c*c)}let r=0;if(this.mode==="unordered"){r=this.unorderedCleared.size;let l=9999;this.checkpoints.forEach((c,h)=>{if(!this.unorderedCleared.has(h)){const d=c.x-t.x,u=c.z-t.z,f=Math.sqrt(d*d+u*u);f<l&&(l=f)}}),a=l}return e.push({name:"Player",isPlayer:!0,completed:this.completed,score:this.completed?999999:this.mode==="unordered"?r*1e3-a:n*1e4+i*1e3-a,timeFinished:this.completed?this.timeElapsed:1/0}),this.aiRacers.forEach(l=>{let c=l.currentIndex,h=l.lapCurrent,d=this.checkpoints[c],u=0;if(d){const g=d.x-l.position.x,M=d.z-l.position.z;u=Math.sqrt(g*g+M*M)}let f=0;if(this.mode==="unordered"){f=l.unorderedCleared.size;let g=9999;this.checkpoints.forEach((M,m)=>{if(!l.unorderedCleared.has(m)){const p=M.x-l.position.x,A=M.z-l.position.z,x=Math.sqrt(p*p+A*A);x<g&&(g=x)}}),u=g}e.push({name:l.name,isPlayer:!1,completed:l.completed,score:l.completed?999999:this.mode==="unordered"?f*1e3-u:h*1e4+c*1e3-u,timeFinished:l.completed?l.timeFinished:1/0})}),e.sort((l,c)=>l.completed&&c.completed?l.timeFinished-c.timeFinished:l.completed?-1:c.completed?1:c.score-l.score),e}selectNewWorldEvent(t,e){const i=[],n=Array.from(t.roadColumns),o=Array.from(t.roadRows);n.forEach(r=>{o.forEach(l=>{if(t.roadColumns.has(r)&&t.roadRows.has(l)){const c=r*t.tileSize,h=l*t.tileSize,d=e?Math.hypot(c-e.x,h-e.z):250;d>80&&d<1800&&i.push({x:c,z:h})}})}),this.worldEvents=[];const a=["sprint","circuit"];if(i.length>0){const r=i.sort(()=>.5-Math.random()),l=Math.min(36,r.length);for(let c=0;c<l;c++){const h=a[Math.floor(Math.random()*a.length)];this.worldEvents.push({x:r[c].x,z:r[c].z,mode:h,laps:h==="circuit"?Math.floor(Math.random()*3)+2:1,checkpoints:Math.floor(Math.random()*8)+5,racers:Math.floor(Math.random()*5)+3})}}else{const r=Array.from(t.roadColumns),l=Array.from(t.roadRows);if(r.length>0&&l.length>0)for(let c=0;c<5;c++){const h=r[Math.floor(Math.random()*r.length)],d=a[c%a.length];this.worldEvents.push({x:h*t.tileSize,z:cz*t.tileSize,mode:d,laps:d==="circuit"?Math.floor(Math.random()*3)+2:1,checkpoints:Math.floor(Math.random()*8)+5,racers:Math.floor(Math.random()*5)+3})}}}}class pm{constructor(t){this.app=t,this.state="none",this.timer=0,this.duration=0,this._aiSpawnedMidRoute=!1,this.cameraStartPos=new P,this.cameraEndPos=new P,this.cameraStartLookAt=new P,this.cameraEndLookAt=new P,this.currentLookAt=new P,this.hudElement=document.createElement("div"),this.hudElement.id="cinematic-countdown",this.hudElement.style.position="absolute",this.hudElement.style.top="50%",this.hudElement.style.left="50%",this.hudElement.style.transform="translate(-50%, -50%)",this.hudElement.style.color="#ffffff",this.hudElement.style.fontFamily="'Outfit', 'Impact', sans-serif",this.hudElement.style.fontSize="120px",this.hudElement.style.fontWeight="900",this.hudElement.style.textShadow="0 0 20px rgba(255, 0, 0, 0.8), 0 0 40px rgba(0, 0, 0, 0.9)",this.hudElement.style.display="none",this.hudElement.style.pointerEvents="none",this.hudElement.style.zIndex="9999",document.body.appendChild(this.hudElement)}start(t){this.state==="none"&&(this.app.physics.speed=0,this.app.physics.velocity.set(0,0,0),this.app.physics.angularVelocity=0,this._aiSpawnedMidRoute=!1,this.transitionTo("cinematic"))}_snapY(t,e){const i=this.app.world;return i&&typeof i.getGroundHeight=="function"?i.getGroundHeight(t,e):.5}_getRaceStartPos(){return this.app._raceStartX!==void 0&&this.app._raceStartZ!==void 0?new P(this.app._raceStartX,0,this.app._raceStartZ):this.app.physics.position.clone()}_getStartHeading(t,e){const i=this.app.race.checkpoints;return i&&i.length>0?Math.atan2(i[0].x-t,i[0].z-e):0}_placeAndSnapAI(){const t=this._getRaceStartPos(),e=t.x,i=t.z,n=this._getStartHeading(e,i),o=Math.sin(n),a=Math.cos(n),r=Math.cos(n),l=-Math.sin(n),c=[{fwd:-8,right:-6},{fwd:-8,right:6},{fwd:-16,right:0}];this.app.race.aiRacers&&this.app.race.aiRacers.forEach((h,d)=>{const u=c[d]||{fwd:-8,right:0},f=e+o*u.fwd+r*u.right,g=i+a*u.fwd+l*u.right,M=this._snapY(f,g);h.position.set(f,M,g),h.spawnPos.set(f,M,g),h.heading=n,h.meshGroup&&(h.meshGroup.position.set(f,M,g),h.meshGroup.rotation.y=n)})}_getDestinationGameplayCamera(){const t=this._getRaceStartPos(),e=t.x,i=t.z,n=this._getStartHeading(e,i),o=this._snapY(e,i);let a=15,r=5.2,l=1.1;const c=this.app.cameraMode||"medium";c==="really_close"?(a=7,r=2.4,l=.95):c==="close"?(a=10.5,r=3.5,l=1):c==="medium"?(a=15,r=5.2,l=1.1):c==="far"?(a=22,r=7.5,l=1.3):c==="bonnet"&&(a=-2.2,r=1,l=1);const h=new P(-Math.sin(n)*a,r,-Math.cos(n)*a),d=new P(e,o,i).add(h),u=c==="bonnet"?15:4,f=new P(e,o,i).add(new P(Math.sin(n)*u,l,Math.cos(n)*u));return{pos:d,lookAt:f,fov:55}}transitionTo(t){this.state=t,this.timer=0;const e=this.app.physics.position,i=this.app.physics.heading;new P(Math.sin(i),0,Math.cos(i));const n=this._getRaceStartPos(),o=n.x,a=n.z,r=this._getStartHeading(o,a);if(this._snapY(o,a),t==="cinematic"){let l=[];this.app.race.navGraph&&(l=this.app.race.navGraph.findPath(e.x,e.z,n.x,n.z)),(!l||l.length<2)&&(l=[e.clone(),n.clone()]);const c=l.map(M=>new P(M.x,52,M.z)),h=this.app.camera.position.clone(),d=new P(0,0,-1).applyQuaternion(this.app.camera.quaternion);this.cameraStartLookAt=h.clone().addScaledVector(d,15),this.currentLookAt.copy(this.cameraStartLookAt);const u=this._getDestinationGameplayCamera(),f=[];f.push(h),c.forEach(M=>f.push(M)),f.push(u.pos),this.fullPathCurve=new v0(f);const g=Math.min(8,Math.max(3.5,c.length*.45));this.duration=1.3+g+1.6,this.cameraStartFov=this.app.camera.fov,this.cameraEndFov=u.fov,this.cameraStartLookAt=this.cameraStartLookAt.clone(),this.cameraEndLookAt=u.lookAt.clone(),this._aiSpawnedMidRoute=!1}else t==="countdown"?(this.duration=3,this.hudElement.style.display="block",this.updateCountdownText(),this.app.camHeading=r,this.app.cameraOverride=null):t==="none"&&(this.hudElement.style.display="none",this.app.clock.getDelta(),this.app.hudStatsEl&&(this.app.hudStatsEl.style.display="flex"),this.app.cancelBtnEl&&(this.app.cancelBtnEl.style.display="block"),this.app.showBanner("RACE STARTED","Follow the arrow!"),this.app.rebuildCheckpointBeacons(),this.app.physics&&(this.app.physics.nitroLevel=this.app.physics.maxNitro),this.app.race&&this.app.race.aiRacers&&this.app.race.aiRacers.forEach(l=>{l.nitroLevel=1}))}update(t){if(this.state==="none")return;this.timer+=t;const e=Math.min(1,this.timer/this.duration);this.app.physics.speed=0,this.app.physics.velocity.set(0,0,0),this.app.physics.angularVelocity=0;const i=new P(0,1,0),n=new Ie;if(this.app.race.aiRacers&&this.app.race.aiRacers.forEach(o=>{o.speed=0,o.velocity.set(0,0,0),o.position.copy(o.spawnPos),o.meshGroup&&(o.meshGroup.position.copy(o.spawnPos),n.setFromAxisAngle(i,o.heading),o.meshGroup.quaternion.copy(n))}),this.state==="cinematic"){const o=e*e*(3-2*e),a=this.fullPathCurve.getPointAt(o),r=this._getRaceStartPos();if(!this._aiSpawnedMidRoute&&e>=.5){this._aiSpawnedMidRoute=!0;const T=r.x,_=r.z,R=this._getStartHeading(T,_),y=this._snapY(T,_);this.app.physics.position.set(T,y,_),this.app.physics.heading=R,this.app.camHeading=R,this.app.buildAIMeshes(),this._placeAndSnapAI()}const l=Math.min(1,o+.08),h=this.fullPathCurve.getPointAt(l).clone();h.y=this._snapY(h.x,h.z)+1;let d;if(o<.25){const T=o/.25,_=T*T*(3-2*T);d=this.cameraStartLookAt.clone().lerp(h,_)}else if(o>.75){const T=(o-.75)/.25,_=T*T*(3-2*T);d=h.clone().lerp(this.cameraEndLookAt,_)}else d=h;let u=0;const f=Math.max(0,o-.015),g=Math.min(1,o+.015),M=this.fullPathCurve.getTangentAt(f),m=this.fullPathCurve.getTangentAt(g),p=Math.atan2(M.x,M.z);let x=Math.atan2(m.x,m.z)-p;x=Math.atan2(Math.sin(x),Math.cos(x)),u=Bs.clamp(-x*5.5,-.09,.09);const b=this.cameraStartFov+(this.cameraEndFov-this.cameraStartFov)*o,L=Date.now()*.0035;a.x+=Math.sin(L*1.6)*.12,a.y+=Math.cos(L*1.2)*.08,a.z+=Math.cos(L*1.8)*.12,d.x+=Math.sin(L*2.5)*.22,d.y+=Math.cos(L*2)*.16,d.z+=Math.cos(L*2.9)*.22,this.currentLookAt.lerp(d,1-Math.exp(-2.5*t)),this.app.cameraOverride={pos:a,lookAt:this.currentLookAt.clone(),fov:b,roll:u},e>=1&&this.transitionTo("countdown")}else this.state==="countdown"&&(this.updateCountdownText(),e>=1&&this.transitionTo("none"))}updateCountdownText(){const t=this.duration-this.timer;let e="",i="#ff3b30";t>2?(e="3",i="#ff3b30"):t>1?(e="2",i="#ff9500"):t>0?(e="1",i="#ffcc00"):(e="GO!",i="#4cd964"),this.hudElement.innerText=e,this.hudElement.style.color=i;const n=this.timer%1,o=1+Math.sin(n*Math.PI)*.15;this.hudElement.style.transform=`translate(-50%, -50%) scale(${o})`,this.hudElement.style.textShadow=`0 0 20px ${i}, 0 0 45px rgba(0, 0, 0, 0.95)`}}class Bo{constructor(t,e,i,n,o=null){this.id=t,this.type=e,this.colorHex=i,this.world=o,this.position=new P,this.heading=0,this.targetSpeed=14+Math.random()*8,this.speed=0,this.opacity=0,this.roadAxis="x",this.roadCoord=0,this.dirSign=1,this.lastIntersectionKey="",this.meshGroup=null,this.wheels=[],this.impactVelocity=new P,this.impactSpin=0,this.isRecovering=!1,this.isParked=!1,this.recycle(n,0,[],o)}getRoadWidth(){if(this.world&&typeof this.world.getRoadWidthForGrid=="function"){const i=Math.round(this.roadCoord/40),{rwX:n,rwZ:o}=this.world.getRoadWidthForGrid(i,i);return this.roadAxis==="x"?o:n}const t=Math.round(this.roadCoord/40),e=Math.floor(t/4);if(this.roadAxis==="x"){const i=Math.sin(e*78.233)*43758.5453;return i-Math.floor(i)>.6?14:26}else{const i=Math.sin(e*12.9898)*43758.5453;return i-Math.floor(i)>.6?14:26}}findParkingSpot(t,e,i=[],n=null){if(!e)return null;const o=Math.round(t.x/40),a=Math.round(t.z/40);for(let r=0;r<80;r++){const l=o+Math.floor(Math.random()*9)-4,c=a+Math.floor(Math.random()*9)-4,h=l*40,d=c*40,u=new P(h,.5,d),f=u.distanceTo(t);if(f<50||f>220||n&&f<140&&n.containsPoint(u))continue;const g=e.roadColumns&&e.roadColumns.has(l),M=e.roadRows&&e.roadRows.has(c),m=g&&M,p=typeof e.isAlley=="function"&&e.isAlley(l,c);if(m)continue;let A=h,x=d,b=0,L="x",T=0,_=1,R=!1;if(g&&!p){const{rwX:y}=e.getRoadWidthForGrid(l,c),w=y,I=Math.random()>.5?1:-1,z=Math.random()>.5?6:-6;A=h+I*(w/2-1.2),x=d+z,b=I>0?0:Math.PI,L="z",T=h,_=I,R=!0}else if(M&&!p){const{rwZ:y}=e.getRoadWidthForGrid(l,c),w=y,I=Math.random()>.5?1:-1,z=Math.random()>.5?6:-6;A=h+z,x=d+I*(w/2-1.2),b=I>0?Math.PI/2:-Math.PI/2,L="x",T=d,_=I,R=!0}else if(p){const y=e.shortcutColumns&&e.shortcutColumns.has(l),w=e.shortcutRows&&e.shortcutRows.has(c);if(y&&!w){const I=Math.random()>.5?1:-1,z=Math.random()>.5?6:-6;A=h+I*13,x=d+z,b=I>0?0:Math.PI,L="z",T=h,_=I,R=!0}else if(w&&!y){const I=Math.random()>.5?1:-1,z=Math.random()>.5?6:-6;A=h+z,x=d+I*13,b=I>0?Math.PI/2:-Math.PI/2,L="x",T=d,_=I,R=!0}}if(R){let y=!1;if(e.breakables)for(const I of e.breakables){if(I.broken)continue;const z=A-I.position.x,j=x-I.position.z;if(z*z+j*j<25){y=!0;break}}if(y)continue;let w=!1;for(const I of i){if(!I)continue;const z=A-I.x,j=x-I.z;if(z*z+j*j<49){w=!0;break}}if(w||e.checkCollision&&e.checkCollision(A,x,3.2).collision)continue;return{x:A,z:x,heading:b,roadAxis:L,roadCoord:T,dirSign:_}}}for(let r=0;r<80;r++){const l=o+Math.floor(Math.random()*13)-6,c=a+Math.floor(Math.random()*13)-6,h=l*40,d=c*40,u=new P(h,.5,d),f=u.distanceTo(t);if(f<40||f>300||n&&f<140&&n.containsPoint(u))continue;const g=e.roadColumns&&e.roadColumns.has(l),M=e.roadRows&&e.roadRows.has(c),m=g&&M,p=typeof e.isAlley=="function"&&e.isAlley(l,c);if(m)continue;let A=h,x=d,b=0,L="x",T=0,_=1,R=!1;if(g&&!p){const{rwX:y}=e.getRoadWidthForGrid(l,c),w=y,I=Math.random()>.5?1:-1,z=Math.random()>.5?6:-6;A=h+I*(w/2-1.2),x=d+z,b=I>0?0:Math.PI,L="z",T=h,_=I,R=!0}else if(M&&!p){const{rwZ:y}=e.getRoadWidthForGrid(l,c),w=y,I=Math.random()>.5?1:-1,z=Math.random()>.5?6:-6;A=h+z,x=d+I*(w/2-1.2),b=I>0?Math.PI/2:-Math.PI/2,L="x",T=d,_=I,R=!0}else if(p){const y=e.shortcutColumns&&e.shortcutColumns.has(l),w=e.shortcutRows&&e.shortcutRows.has(c);if(y&&!w){const I=Math.random()>.5?1:-1,z=Math.random()>.5?6:-6;A=h+I*13,x=d+z,b=I>0?0:Math.PI,L="z",T=h,_=I,R=!0}else if(w&&!y){const I=Math.random()>.5?1:-1,z=Math.random()>.5?6:-6;A=h+z,x=d+I*13,b=I>0?Math.PI/2:-Math.PI/2,L="x",T=d,_=I,R=!0}}if(R){let y=!1;if(e.breakables)for(const I of e.breakables){if(I.broken)continue;const z=A-I.position.x,j=x-I.position.z;if(z*z+j*j<25){y=!0;break}}if(y)continue;let w=!1;for(const I of i){if(!I)continue;const z=A-I.x,j=x-I.z;if(z*z+j*j<49){w=!0;break}}if(w||e.checkCollision&&e.checkCollision(A,x,3.2).collision)continue;return{x:A,z:x,heading:b,roadAxis:L,roadCoord:T,dirSign:_}}}return null}recycle(t,e=0,i=[],n=null,o=!1,a=[],r=null){n&&(this.world=n),this.impactVelocity&&this.impactVelocity.set(0,0,0),this.impactSpin=0,this.isParked=o;let l=!1,c=0,h=0,d="x",u=1,f=0,g=0;if(o&&n){const m=this.findParkingSpot(t,n,a,r);if(m)c=m.x,h=m.z,d=m.roadAxis,f=m.roadCoord,u=m.dirSign,g=m.heading,l=!0;else return}if(!l){const m=new P(Math.sin(e),0,Math.cos(e));for(let p=0;p<20;p++){const A=(Math.random()-.5)*(Math.PI*2/3),x=e+A,b=120+Math.random()*160,L=t.x+Math.sin(x)*b,T=t.z+Math.cos(x)*b,_=(lt,ct)=>{let K=0,it=1/0;const gt=Math.round(lt/40),Z=Math.round(ct/40);for(let St=gt-8;St<=gt+8;St++)if(n.roadColumns.has(St)){const yt=Math.abs(St-gt);yt<it&&(it=yt,K=St)}let at=0,dt=1/0;for(let St=Z-8;St<=Z+8;St++)if(n.roadRows.has(St)){const yt=Math.abs(St-Z);yt<dt&&(dt=yt,at=St)}return{blockX:K*40,blockZ:at*40}};let R=Math.round(L/160)*160,y=Math.round(T/160)*160;if(n&&n.roadColumns&&n.roadRows){const lt=_(L,T);R=lt.blockX,y=lt.blockZ}d=Math.random()>.5?"x":"z",u=Math.random()>.5?1:-1;let w,I;if(d==="x"){f=y,w=R+(Math.random()-.5)*120;const lt=Math.round(f/40),ct=Math.floor(lt/4),K=Math.sin(ct*78.233)*43758.5453,Z=(K-Math.floor(K)>.6?14:26)===14?2.5:5;I=f+(u>0?-Z:Z)}else{f=R,I=y+(Math.random()-.5)*120;const lt=Math.round(f/40),ct=Math.floor(lt/4),K=Math.sin(ct*12.9898)*43758.5453,Z=(K-Math.floor(K)>.6?14:26)===14?2.5:5;w=f+(u>0?Z:-Z)}const z=Math.round(w/40),j=Math.round(I/40);if(n&&typeof n.isAlley=="function"&&n.isAlley(z,j))continue;const C=new P(w,.5,I),D=C.distanceTo(t);if(D<80||D>320)continue;const G=C.clone().sub(t).normalize(),O=m.dot(G);if(O<.15||O>.85&&D<140)continue;let X=Math.round(t.x/160)*160,J=Math.round(t.z/160)*160;if(n&&n.roadColumns&&n.roadRows){const lt=_(t.x,t.z);X=lt.blockX,J=lt.blockZ}if(R===X&&y===J&&D<100)continue;let ot=!1;for(const lt of i)if(C.distanceTo(lt.position)<60){ot=!0;break}if(!ot){c=w,h=I,l=!0;break}}if(!l){const p=200+Math.random()*80,A=t.x+Math.sin(e)*p,x=t.z+Math.cos(e)*p;if(d=Math.random()>.5?"x":"z",u=Math.random()>.5?1:-1,d==="x"){f=Math.round(x/160)*160,c=A;const b=Math.round(f/40),L=Math.floor(b/4),T=Math.sin(L*78.233)*43758.5453,y=(T-Math.floor(T)>.6?14:26)===14?2.5:5;h=f+(u>0?-y:y)}else{f=Math.round(A/160)*160,h=x;const b=Math.round(f/40),L=Math.floor(b/4),T=Math.sin(L*12.9898)*43758.5453,y=(T-Math.floor(T)>.6?14:26)===14?2.5:5;c=f+(u>0?y:-y)}}}const M=n&&typeof n.getGroundHeight=="function"?n.getGroundHeight(c,h):.5;this.position.set(c,M,h),this.roadAxis=d,this.dirSign=u,this.roadCoord=f,this.lastIntersectionKey="",l&&o?(this.heading=g,this.targetSpeed=0,this.speed=0):(this.heading=this.roadAxis==="z"?this.dirSign>0?0:Math.PI:this.dirSign>0?Math.PI/2:-Math.PI/2,this.targetSpeed=14+Math.random()*8,this.speed=this.targetSpeed*.5),this.opacity=0,this.isRecovering=!1,this.crashedAirborne=!1,this.velocityY=0,this.roll=0,this.pitch=0,this.rollVelocity=0,this.pitchVelocity=0}update(t,e,i=0,n=[],o=!1,a=null,r=[]){const l=this.position.distanceTo(e),c=Math.sin(i),h=Math.cos(i),d=this.position.x-e.x,u=this.position.z-e.z,f=Math.sqrt(d*d+u*u)||1,g=c*(d/f)+h*(u/f);let M=!0;a?(this._sphere||(this._sphere=new qn),this._sphere.set(this.position,6),M=a.intersectsSphere(this._sphere)):M=g>=.15;let m=1/0;r.forEach(B=>{if(B.active&&!B.isParked){const wt=this.position.distanceTo(B.position);wt<m&&(m=wt)}});const p=m<45,A=p?1-m/45:0;let x=1;if(o||r.length>0&&l>100&&!M)x=0;else if(!M&&l>50)x=0;else{const B=g>=0?280:200,wt=g>=0?340:260;l>wt?x=0:l>B&&(x=1-(l-B)/(wt-B))}if(this.opacity+=(x-this.opacity)*5*t,this.opacity=Math.max(0,Math.min(1,this.opacity)),!M&&l>50&&this.opacity<.05)return!0;if(g>=0){if(l>340&&this.opacity<.05)return!0}else if(l>260||l>200&&this.opacity<.05)return!0;if(this.isParked){const B=Math.sin(this.heading),wt=Math.cos(this.heading),S=Math.cos(this.heading+Math.PI/2),W=Math.sin(this.heading+Math.PI/2),F=this.impactVelocity.x,et=this.impactVelocity.z,k=F*B+et*wt,E=(F*S+et*W)*Math.exp(-7*t);this.position.x+=(B*k+S*E)*t,this.position.z+=(wt*k+W*E)*t,this.crashedAirborne===void 0&&(this.crashedAirborne=!1),this.velocityY===void 0&&(this.velocityY=0),this.roll===void 0&&(this.roll=0),this.pitch===void 0&&(this.pitch=0),this.rollVelocity===void 0&&(this.rollVelocity=0),this.pitchVelocity===void 0&&(this.pitchVelocity=0);const N=this.world&&typeof this.world.getGroundHeight=="function"?this.world.getGroundHeight(this.position.x,this.position.z):.5;return this.crashedAirborne?this.position.y-N>.05||this.velocityY>.5?(this.isAirborne=!0,this.velocityY-=22*t,this.position.y+=this.velocityY*t,this.roll+=this.rollVelocity*t,this.pitch+=this.pitchVelocity*t,this.rollVelocity*=Math.exp(-3*t),this.pitchVelocity*=Math.exp(-3*t)):(this.position.y=N,this.velocityY<-2?this.velocityY=-this.velocityY*.18:(this.velocityY=0,this.isAirborne=!1,this.crashedAirborne=!1),this.roll+=(0-this.roll)*8*t,this.pitch+=(0-this.pitch)*8*t,this.rollVelocity=0,this.pitchVelocity=0):(this.position.y=N,this.isAirborne=!1,this.roll+=(0-this.roll)*8*t,this.pitch+=(0-this.pitch)*8*t,this.rollVelocity=0,this.pitchVelocity=0),this.impactVelocity.multiplyScalar(Math.exp(-2.2*t)),this.heading+=this.impactSpin*t,this.impactSpin*=Math.exp(-3.5*t),!1}let b=!1,L=!1,T=!1,_=Math.round(this.position.x/160)*160,R=Math.round(this.position.z/160)*160;if(this.world&&typeof this.world.snapToNearestIntersection=="function"){const B=this.world.snapToNearestIntersection(this.position.x,this.position.z);_=B.x,R=B.z}const y=this.position.x-_,w=this.position.z-R,I=window.gameTime||0,z=Ql(_,R,I);if(this.roadAxis==="x"){const B=-y*this.dirSign;if(B>12&&B<28){const wt=z.xLight;(wt==="red"||wt==="yellow")&&(b=!0)}}else{const B=-w*this.dirSign;if(B>12&&B<28){const wt=z.zLight;(wt==="red"||wt==="yellow")&&(b=!0)}}const j=Math.sin(this.heading),C=Math.cos(this.heading),D=Math.cos(this.heading),G=-Math.sin(this.heading);for(let B=0;B<n.length;B++){const wt=n[B],S=wt.position.x-this.position.x,W=wt.position.z-this.position.z,F=S*j+W*C,et=S*D+W*G;if(F>.5&&F<22&&Math.abs(et)<4){L=!0;break}}if(!(Math.abs(y)<6&&Math.abs(w)<6)){let B=0;if(this.roadAxis==="x"?B=-y*this.dirSign:B=-w*this.dirSign,B>6&&B<18)for(let wt=0;wt<n.length;wt++){const S=n[wt],W=Math.abs(S.position.x-_),F=Math.abs(S.position.z-R);if(W<8.5&&F<8.5){T=!0;break}}}let X=0,J=0,ot=0,ct=this.getRoadWidth()===14?2.5:5;p&&(ct+=A*3.5),this.roadAxis==="x"?(X=this.dirSign>0?Math.PI/2:-Math.PI/2,J=this.roadCoord+(this.dirSign>0?-ct:ct)-this.position.z,ot=Math.max(-.65,Math.min(.65,J*.12))*-this.dirSign):(X=this.dirSign>0?0:Math.PI,J=this.roadCoord+(this.dirSign>0?ct:-ct)-this.position.x,ot=Math.max(-.65,Math.min(.65,J*.12))*this.dirSign);const it=Math.abs(y)<12&&Math.abs(w)<12||this.isRecovering||Math.abs(X-this.heading)>.2;if(!this.isRecovering){let B=b||L||T?0:this.targetSpeed;it&&B>0&&(B=Math.min(B,7.5)),p&&B>0&&(B*=1-A*.65);const wt=B===0?12:4;this.speed+=(B-this.speed)*wt*t,this.speed=Math.max(0,this.speed)}const gt=this.impactVelocity.lengthSq()>3;gt&&(this.isRecovering=!0);const Z=j*this.speed+this.impactVelocity.x,at=C*this.speed+this.impactVelocity.z,dt=Z*j+at*C,yt=(Z*D+at*G)*Math.exp(-7*t);this.position.x+=(j*dt+D*yt)*t,this.position.z+=(C*dt+G*yt)*t,this.crashedAirborne===void 0&&(this.crashedAirborne=!1),this.velocityY===void 0&&(this.velocityY=0),this.roll===void 0&&(this.roll=0),this.pitch===void 0&&(this.pitch=0),this.rollVelocity===void 0&&(this.rollVelocity=0),this.pitchVelocity===void 0&&(this.pitchVelocity=0);const Tt=this.world&&typeof this.world.getGroundHeight=="function"?this.world.getGroundHeight(this.position.x,this.position.z):.5;if(this.crashedAirborne?this.position.y-Tt>.05||this.velocityY>.5?(this.isAirborne=!0,this.velocityY-=22*t,this.position.y+=this.velocityY*t,this.roll+=this.rollVelocity*t,this.pitch+=this.pitchVelocity*t,this.rollVelocity*=Math.exp(-3*t),this.pitchVelocity*=Math.exp(-3*t)):(this.position.y=Tt,this.velocityY<-2?this.velocityY=-this.velocityY*.18:(this.velocityY=0,this.isAirborne=!1,this.crashedAirborne=!1),this.roll+=(0-this.roll)*8*t,this.pitch+=(0-this.pitch)*8*t,this.rollVelocity=0,this.pitchVelocity=0):(this.position.y=Tt,this.isAirborne=!1,this.roll+=(0-this.roll)*8*t,this.pitch+=(0-this.pitch)*8*t,this.rollVelocity=0,this.pitchVelocity=0),this.impactVelocity.multiplyScalar(Math.exp(-2.2*t)),this.heading+=this.impactSpin*t,this.impactSpin*=Math.exp(-3.5*t),this.isRecovering)if(this.impactVelocity.lengthSq()<1.5){let B=X-this.heading;for(;B<-Math.PI;)B+=Math.PI*2;for(;B>Math.PI;)B-=Math.PI*2;let wt=Math.max(-.55,Math.min(.55,B));Math.abs(J)>4&&(wt=Math.max(-.55,Math.min(.55,J*.08))*(this.roadAxis==="x"?-this.dirSign:this.dirSign)),this.speed+=(5.5-this.speed)*2.5*t,this.heading+=this.speed/4.4*wt*t;let S=X-this.heading;for(;S<-Math.PI;)S+=Math.PI*2;for(;S>Math.PI;)S-=Math.PI*2;Math.abs(S)<.18&&Math.abs(J)<3.5&&(this.isRecovering=!1)}else this.speed+=(0-this.speed)*8*t;else if(!gt){let wt=X+ot-this.heading;for(;wt<-Math.PI;)wt+=Math.PI*2;for(;wt>Math.PI;)wt-=Math.PI*2;this.heading+=wt*4.5*t}if(Math.abs(y)<6&&Math.abs(w)<6){const B=`${_},${R}`;if(this.lastIntersectionKey!==B){this.lastIntersectionKey=B;const wt=Math.round(_/40),S=Math.round(R/40),W=this.roadAxis==="x"?"z":"x",F=(tt,nt)=>this.world&&typeof this.world.isAlley=="function"?this.world.isAlley(tt,nt):!1;let et=!1,k=!1;W==="z"?(et=F(wt,S+1),k=F(wt,S-1)):(et=F(wt+1,S),k=F(wt-1,S));let v=!1;this.roadAxis==="x"?v=F(wt+this.dirSign,S):v=F(wt,S+this.dirSign);const E=[{axis:this.roadAxis,coord:this.roadCoord,dir:this.dirSign,weight:v?.05:.65},{axis:W,coord:W==="z"?_:R,dir:1,weight:et?.02:.3},{axis:W,coord:W==="z"?_:R,dir:-1,weight:k?.02:.3}],N=E.reduce((tt,nt)=>tt+nt.weight,0);let q=Math.random()*N,Y=E[0];for(const tt of E)if(q-=tt.weight,q<=0){Y=tt;break}this.roadAxis=Y.axis,this.roadCoord=Y.coord,this.dirSign=Y.dir}}return!1}}class mm{constructor(t,e=18){this.scene=t,this.maxVehicles=e,this.vehicles=[],this.parkedVehicles=[],this.maxParkedVehicles=12}init(t,e=null){const i=["cab","sedan","suv","sports","pickup","van"],n=[16573184,14737632,13378082,3033698,4868682,3800852,65535,15790325,14561635];for(let a=0;a<this.maxVehicles;a++){const r=i[Math.floor(Math.random()*i.length)],l=r==="cab"?16573184:n[Math.floor(Math.random()*n.length)],c=new Bo(a,r,l,t,e);this.vehicles.push(c)}const o=[];for(let a=0;a<this.maxParkedVehicles;a++){const r=i[Math.floor(Math.random()*i.length)],l=n[Math.floor(Math.random()*n.length)],c=new Bo(1e3+a,r,l,t,e);c.recycle(t,0,[],e,!0,o),this.parkedVehicles.push(c),o.push(c.position)}}update(t,e,i=0,n=[],o=null,a=null,r=[],l=0,c=[]){const h=Math.max(2,this.maxVehicles-l*3);if(this.vehicles.length<h){const f=["cab","sedan","suv","sports","pickup","van"],g=[16573184,14737632,13378082,3033698,4868682,3800852,65535,15790325,14561635],M=f[Math.floor(Math.random()*f.length)],m=M==="cab"?16573184:g[Math.floor(Math.random()*g.length)],p=new Bo(this.vehicles.length,M,m,e,a);p.recycle(e,i,n,a),this.vehicles.push(p)}o&&(this._frustum||(this._frustum=new Tn),this._projMatrix||(this._projMatrix=new se),this._projMatrix.multiplyMatrices(o.projectionMatrix,o.matrixWorldInverse),this._frustum.setFromProjectionMatrix(this._projMatrix));const d=o?this._frustum:null,u=[];e&&u.push({id:"player",position:e}),n.forEach(f=>{u.push({id:"ai_"+f.id,position:f.position})}),this.vehicles.forEach(f=>{u.push({id:"traffic_"+f.id,position:f.position})}),this.parkedVehicles.forEach(f=>{u.push({id:"parked_"+f.id,position:f.position})});for(let f=this.parkedVehicles.length-1;f>=0;f--){const g=this.parkedVehicles[f];if(g.update(t,e,i,[],!1,d,[])){const m=[];m.push(e),this.parkedVehicles.forEach(p=>{p!==g&&m.push(p.position)}),this.vehicles.forEach(p=>{m.push(p.position)}),c.forEach(p=>{p.active&&m.push(p.position)}),g.recycle(e,i,n,a,!0,m,d)}}for(let f=this.vehicles.length-1;f>=0;f--){const g=this.vehicles[f],M="traffic_"+g.id,m=u.filter(x=>x.id!==M);let p=!1;r.forEach(x=>{g.position.distanceTo(x.position)<65&&(p=!0)}),g.update(t,e,i,m,p,d,c)&&(this.vehicles.length>h?(g.meshGroup&&(g.meshGroup.traverse(x=>{x.geometry&&x.geometry.dispose()}),this.scene.remove(g.meshGroup)),this.vehicles.splice(f,1)):g.recycle(e,i,n,a))}this.vehicles.forEach((f,g)=>{f.id=g})}clear(){this.vehicles.concat(this.parkedVehicles).forEach(t=>{t.meshGroup&&(t.meshGroup.traverse(e=>{e.geometry&&e.geometry.dispose()}),this.scene.remove(t.meshGroup))}),this.vehicles=[],this.parkedVehicles=[]}}class nl{constructor(t,e,i=!1){this.id=t,this.position=e.clone(),this.velocity=new P,this.heading=0,this.angularVelocity=0,this.speed=0,this.active=!0,this.isParked=i,this.alerted=!i,this.opacity=0,this.maxSpeed=48,this.accel=24,this.braking=50,this.drag=.015,this.meshGroup=null,this.sirenTimer=0,this.sirenState=!1,this.sirenLight=null,this._currentPath=null,this._pathWptIdx=0,this._pathTimer=0,this._stuckTimer=0,this._escapeTimer=0,this._escapeTargetHdg=0}update(t,e,i,n,o,a,r,l=!0){if(!this.active)return;if(t=Math.min(t,.05),this.opacity=Math.min(1,this.opacity+t*1.5),this.baseAccel===void 0&&(this.baseAccel=this.accel),this.sirenTimer+=t*8,this.sirenState=Math.floor(this.sirenTimer)%2===0,this.isParked&&!this.alerted){this.speed=0,this.velocity.set(0,0,0),this.position.distanceTo(i)<45&&n>14&&(this.alerted=!0,this.isParked=!1),this._updateMesh();return}const c=this.position.distanceTo(i);let h=i,d=c,u=!1;const f=n<3||!l;if(f){const I=this.id%4*(Math.PI/2)+this.id%3*.2,z=7.2;this._circleTarget||(this._circleTarget=i.clone()),this._circleTarget.set(i.x+Math.sin(I)*z,i.y,i.z+Math.cos(I)*z),h=this._circleTarget,d=this.position.distanceTo(h),u=!0}if(f&&(d<2.2||c<6.5))if(this.speed>0){this.speed=Math.max(0,this.speed-this.braking*1.5*t),this.angularVelocity*=Math.exp(-6*t),this.velocity.set(Math.sin(this.heading)*this.speed,0,Math.cos(this.heading)*this.speed),this.position.addScaledVector(this.velocity,t),this._applyWallPushback(e),this._updateMesh();return}else{this.speed=0,this.velocity.set(0,0,0),this.angularVelocity=0,this._updateMesh();return}let g=u?h.clone():i.clone();if(this._escapeTimer>0){this._escapeTimer-=t,this._tickEscape(t,e),this._applyWallPushback(e),this._updateMesh();return}if(this.strategyTimer===void 0&&(this.strategyTimer=0),this.strategy===void 0&&(this.strategy="charge"),this.slamTimer===void 0&&(this.slamTimer=0),c<=35&&(this.strategyTimer-=t,this.strategyTimer<=0&&this.slamTimer<=0)){this.strategyTimer=5+Math.random()*4;const I=Math.random();this.strategy=I<.15?"leftPIT":I<.3?"rightPIT":"charge"}let M=!1;if(c>35){if(this._pathTimer-=t,(this._pathTimer<=0||!this._currentPath)&&(this._pathTimer=.8+Math.random()*.4,a&&(this._currentPath=a.findPath(this.position.x,this.position.z,i.x,i.z),this._pathWptIdx=0)),this._currentPath&&this._currentPath.length>0){for(;this._pathWptIdx<this._currentPath.length-1;){const I=this._currentPath[this._pathWptIdx],z=this.position.x-I.x,j=this.position.z-I.z;if(z*z+j*j<144)this._pathWptIdx++;else break}g.copy(this._currentPath[this._pathWptIdx])}}else if(this.slamTimer>0)this.slamTimer-=t,M=!0,g.copy(i);else{const I=Math.sin(o),z=Math.cos(o);if(this.strategy==="leftPIT"||this.strategy==="rightPIT"){const j=this.strategy==="leftPIT"?-1:1,C=Math.cos(o)*j*4.5,D=-Math.sin(o)*j*4.5,G=I*3,O=z*3;g.set(i.x+C+G,i.y,i.z+D+O);const X=this.position.x-i.x,J=this.position.z-i.z,ot=X*I+J*z,lt=Math.abs(X*Math.cos(o)+J*-Math.sin(o));ot>-6&&ot<6&&lt<8&&(this.slamTimer=.8,M=!0,this.strategyTimer=.5,g.copy(i))}else g.copy(i)}const m=g.x-this.position.x,p=g.z-this.position.z;let A=Math.atan2(m,p);if(M){const I=this.position.x<i.x?.35:-.35;A+=I}const x=Math.cos(this.heading),b=-Math.sin(this.heading);for(let I=0;I<r.length;I++){const z=r[I];if(z!==this&&z.position){const j=this.position.distanceTo(z.position);if(j<8){const C=z.position.x-this.position.x,D=z.position.z-this.position.z,G=C*x+D*b;A+=(G>0?-.35:.35)*(1-j/8)}}}let L=A-this.heading;for(;L>Math.PI;)L-=Math.PI*2;for(;L<-Math.PI;)L+=Math.PI*2;const T=2.4,_=Math.max(-T,Math.min(T,L*3.8));this.angularVelocity+=(_-this.angularVelocity)*16*t,this.heading+=this.angularVelocity*t;let R=this.maxSpeed;M?(this.accel=this.baseAccel*1.15,R=Math.max(this.maxSpeed,n+3)):(this.accel=this.baseAccel,n<3?c<25?R=Math.max(1.5,(c-5)*1.8):R=this.maxSpeed*.6:c<20&&(R=Math.max(this.maxSpeed,n+5)));const y=Math.abs(L);if(y>.6&&(R*=Math.max(.4,1-(y-.6)*1.2)),this.speed<R)this.speed+=this.accel*t;else{const I=R<12?1.6:.8;this.speed-=this.braking*I*t}if(this.speed-=this.drag*this.speed*Math.abs(this.speed)*t,this.speed=Math.max(-10,Math.min(R,this.speed)),this.velocity.set(Math.sin(this.heading)*this.speed,0,Math.cos(this.heading)*this.speed),this.speed<1.5?this._stuckTimer+=t:this._stuckTimer=0,this._stuckTimer>1.2){this._beginEscape(e,x,b);return}this.position.addScaledVector(this.velocity,t);const w=e&&typeof e.getGroundHeight=="function"?e.getGroundHeight(this.position.x,this.position.z):.5;this.position.y+=(w-this.position.y)*12*t,this._applyWallPushback(e),this._updateMesh()}_beginEscape(t,e,i){const n=t.checkCollision(this.position.x,this.position.z,3);if(n.collision){const o=n.normalX*e+n.normalZ*i;this._escapeTargetHdg=this.heading+(o>=0?-Math.PI/2:Math.PI/2)}else this._escapeTargetHdg=this.heading+Math.PI;for(;this._escapeTargetHdg>Math.PI;)this._escapeTargetHdg-=Math.PI*2;for(;this._escapeTargetHdg<-Math.PI;)this._escapeTargetHdg+=Math.PI*2;this.speed=0,this.velocity.set(0,0,0),this.angularVelocity=0,this._stuckTimer=0,this._escapeTimer=1}_tickEscape(t,e){let i=this._escapeTargetHdg-this.heading;for(;i>Math.PI;)i-=Math.PI*2;for(;i<-Math.PI;)i+=Math.PI*2;this.heading+=Math.sign(i)*Math.min(Math.abs(i),3*t),this.speed=-12,this.velocity.set(Math.sin(this.heading)*this.speed,0,Math.cos(this.heading)*this.speed),this.position.addScaledVector(this.velocity,t);const n=e&&typeof e.getGroundHeight=="function"?e.getGroundHeight(this.position.x,this.position.z):.5;this.position.y+=(n-this.position.y)*12*t}_applyWallPushback(t){const e=t.checkCollision(this.position.x,this.position.z,2);if(!e.collision)return;this.position.x+=e.normalX*(e.overlap+.1),this.position.z+=e.normalZ*(e.overlap+.1);const i=this.velocity.x*e.normalX+this.velocity.z*e.normalZ;i<0&&(this.velocity.x-=i*e.normalX,this.velocity.z-=i*e.normalZ),this.speed>0&&this.velocity.x*e.normalX+this.velocity.z*e.normalZ<-.4&&(this.speed*=.2)}_updateMesh(){this.meshGroup&&(this.meshGroup.position.copy(this.position),this.app&&this.app.world&&typeof this.app.world.alignMeshToTerrain=="function"?this.app.world.alignMeshToTerrain(this.meshGroup,this.position,this.heading):this.meshGroup.rotation.y=this.heading)}}let Go=null,Oo=null,ko=null,Vo=null;function gm(){if(!Go){const s=document.createElement("canvas");s.width=64,s.height=16;const t=s.getContext("2d");t.fillStyle="#ffffff",t.fillRect(0,0,64,16),t.fillStyle="#ff3333";for(let i=0;i<4;i++)t.beginPath(),t.moveTo(i*16,16),t.lineTo(i*16+8,16),t.lineTo(i*16+16,0),t.lineTo(i*16+8,0),t.closePath(),t.fill();const e=new Re(s);e.minFilter=ge,e.magFilter=ge,Go=new zt({map:e,roughness:.8})}return Go}function sl(){return Oo||(Oo=new zt({color:13421772,roughness:.5})),Oo}function Mm(){return ko||(ko=new H(4.5,.5,.2)),ko}function ol(){return Vo||(Vo=new H(.3,1.2,.8)),Vo}class xm{constructor(t,e,i,n,o,a,r){this.id=t,this.tileX=e,this.tileZ=i,this.position=n.clone(),this.heading=o,this.isVertical=a,this.app=r,this.active=!0,this.meshGroup=new Vt,this.meshGroup.position.copy(this.position),this.meshGroup.rotation.y=this.heading,this.app.scene.add(this.meshGroup),this.fences=[],this.obstacles=[],this.buildRoadblock()}buildRoadblock(){const{carGroup:t}=this.app.createVoxelCarMesh(0,"cop");t.position.set(-5,.15,-4.5),t.rotation.y=.1,this.meshGroup.add(t);const{carGroup:e}=this.app.createVoxelCarMesh(0,"cop");e.position.set(5,.15,4.5),e.rotation.y=Math.PI-.1,this.meshGroup.add(e);const i=new zt({color:5592405,roughness:.8}),n=new H(4,1.4,1.5),o=new Q(n,i);o.position.set(0,.7,0),o.castShadow=!0,o.receiveShadow=!0,this.meshGroup.add(o);const a=16,r=Math.cos(this.heading),l=Math.sin(this.heading),c=this.createFenceMesh(),h=-a,d=0,u=this.position.x+h*r+d*l,f=this.position.z-h*l+d*r,g=0+this.app.world.getBaseHeight(u,f);c.position.set(u,g,f),c.rotation.y=this.heading,this.app.scene.add(c);const M={position:new P(u,g+.6,f),group:c,broken:!1,radius:2.2,velocity:new P,angularVelocity:new P,fadeTimer:10,comHeight:.6,type:"fence",lights:[],flares:[],poolMeshes:[]};this.app.world.breakables.push(M),this.fences.push(M);const m=this.createFenceMesh(),p=a,A=0,x=this.position.x+p*r+A*l,b=this.position.z-p*l+A*r,L=0+this.app.world.getBaseHeight(x,b);m.position.set(x,L,b),m.rotation.y=this.heading,this.app.scene.add(m);const T={position:new P(x,L+.6,b),group:m,broken:!1,radius:2.2,velocity:new P,angularVelocity:new P,fadeTimer:10,comHeight:.6,type:"fence",lights:[],flares:[],poolMeshes:[]};this.app.world.breakables.push(T),this.fences.push(T),this.addWorldObstacle(0,0,24,13,2.5)}createFenceMesh(){const t=new Vt,e=new Q(Mm(),gm());e.position.y=1,e.castShadow=!0,t.add(e);const i=new Q(ol(),sl());i.position.set(-2,.6,0),i.castShadow=!0,t.add(i);const n=new Q(ol(),sl());return n.position.set(2,.6,0),n.castShadow=!0,t.add(n),t}addWorldObstacle(t,e,i,n,o){let a=this.position.x,r=this.position.z,l=i,c=n;this.isVertical?(a+=t,r+=e):(a+=e,r+=t,l=n,c=i);const h={xMin:a-l/2,xMax:a+l/2,zMin:r-c/2,zMax:r+c/2,height:o};this.obstacles.push(h),this.app.world.obstacles.push(h);const d=this.app.world.spatialCellSize,u=Math.floor(h.xMin/d),f=Math.floor(h.xMax/d),g=Math.floor(h.zMin/d),M=Math.floor(h.zMax/d);for(let m=u;m<=f;m++)for(let p=g;p<=M;p++){const A=`${m},${p}`;this.app.world.obstacleGrid.has(A)||this.app.world.obstacleGrid.set(A,[]),this.app.world.obstacleGrid.get(A).push(h)}}update(t,e){const i=Math.floor(Date.now()/250)%2===0;this.meshGroup.traverse(n=>{if(n.isMesh&&(n.name==="sirenBlue"?n.material.emissiveIntensity=i?.05:6:n.name==="sirenRed"&&(n.material.emissiveIntensity=i?6:.05)),n.name==="headlightPool"){const o=new P;n.getWorldPosition(o);const a=o.distanceTo(e);if(a<=80)n.material.opacity=0;else if(a>=120)n.material.opacity=.35;else{const r=(a-80)/40,l=r*r*(3-2*r);n.material.opacity=.35*l}}})}cleanup(){this.meshGroup&&(this.meshGroup.traverse(i=>{i.isMesh&&i.geometry&&i.geometry.dispose()}),this.app.scene.remove(this.meshGroup)),this.fences.forEach(i=>{i.broken||(this.app.scene.remove(i.group),i.shouldRemove=!0)});const t=new Set(this.obstacles);this.app.world.obstacles=this.app.world.obstacles.filter(i=>!t.has(i));const e=this.app.world.spatialCellSize;for(const i of this.obstacles){const n=Math.floor(i.xMin/e),o=Math.floor(i.xMax/e),a=Math.floor(i.zMin/e),r=Math.floor(i.zMax/e);for(let l=n;l<=o;l++)for(let c=a;c<=r;c++){const h=`${l},${c}`,d=this.app.world.obstacleGrid.get(h);if(d){const u=d.indexOf(i);u!==-1&&d.splice(u,1),d.length===0&&this.app.world.obstacleGrid.delete(h)}}}}}class _m{constructor(t){this.app=t,this.active=!1,this.heatLevel=0,this.cops=[],this.parkedCops=[],this.bustProgress=0,this.busted=!1,this.cooldownTimer=0,this.violationAlertTimer=0,this.canSeePlayer=!1,this.heatProgress=0,this.spawnTimer=0,this.maxSpawnCops=0,this.roadblocks=[],this.roadblockTimer=15}triggerPursuit(t=1){this.busted||(this.heatLevel,this.active||(this.active=!0,this.app.showBanner("POLICE PURSUIT","Lose the cops!"),this.heatLevel=t,this.pursuitDuration=0),this.cooldownTimer=0,this.maxSpawnCops=Math.min(5,Math.max(1,this.heatLevel)))}cancelPursuit(){this.active=!1,this.heatLevel=0,this.bustProgress=0,this.clearSpawnedCops(),this.app.showBanner("ESCUPED","Police search cancelled")}clearSpawnedCops(){this.cops.forEach(t=>{t.meshGroup&&(t.meshGroup.traverse(e=>{e.geometry&&e.geometry.dispose()}),this.app.scene.remove(t.meshGroup))}),this.cops=[],this.clearRoadblocks()}clearRoadblocks(){this.roadblocks.forEach(t=>t.cleanup()),this.roadblocks=[]}spawnCop(t,e,i=!1){const n=Array.from(t.roadColumns).sort((_,R)=>_-R),o=Array.from(t.roadRows).sort((_,R)=>_-R),a=Math.round(e.x/t.tileSize),r=Math.round(e.z/t.tileSize);let l=a,c=r;const h=(_,R)=>{let y=0,w=1/0;for(let I=0;I<_.length;I++){const z=Math.abs(_[I]-R);z<w&&(w=z,y=I)}return y};if(i){const _=(Math.random()>.5?1:-1)*(3+Math.floor(Math.random()*2)),R=(Math.random()>.5?1:-1)*(3+Math.floor(Math.random()*2)),y=h(n,a+_),w=h(o,r+R);l=n[y],c=o[w]}else{let _=0,R=0;if(Math.random()<.8){const I=this.app.physics.heading,z=Math.sin(I),j=Math.cos(I);Math.abs(z)>Math.abs(j)?(_=(Math.sign(z)!==0?Math.sign(z):Math.random()>.5?1:-1)*(8+Math.floor(Math.random()*5)),R=(Math.random()>.5?1:-1)*Math.floor(Math.random()*2)):(R=(Math.sign(j)!==0?Math.sign(j):Math.random()>.5?1:-1)*(8+Math.floor(Math.random()*5)),_=(Math.random()>.5?1:-1)*Math.floor(Math.random()*2))}else _=(Math.random()>.5?1:-1)*(6+Math.floor(Math.random()*4)),R=(Math.random()>.5?1:-1)*(6+Math.floor(Math.random()*4));const y=h(n,a+_),w=h(o,r+R);l=n[y],c=o[w]}let d=l*t.tileSize,u=c*t.tileSize;const f=t.roadColumns.has(l),g=t.roadRows.has(c);let M=5;if(f||g){const _=Math.floor(f?l/4:c/4),R=Math.sin(_*12.9898)*43758.5453;M=(R-Math.floor(R)>.6?14:26)===14?2.5:5}if(i){const _=Math.random()>.5?1:-1;f?d+=_*M:g&&(u+=_*M)}else{const _=this.app.physics.heading,R=Math.sin(_),y=Math.cos(_);if(c===r){const w=R>0?1:-1;u+=w*M}else if(l===a){const w=y>0?1:-1;d-=w*M}else{let w="z";g&&!f?w="x":f&&g&&(w=Math.random()>.5?"x":"z");const I=Math.random()>.5?1:-1;w==="x"?u+=I*M:d+=I*M}}let m=!1;for(const _ of this.roadblocks)if(Math.sqrt((d-_.position.x)**2+(u-_.position.z)**2)<60){m=!0;break}if(m||t.checkCollision(d,u,2.5).collision)return null;if(t.breakables)for(const _ of t.breakables){if(_.broken)continue;const R=d-_.position.x,y=u-_.position.z;if(R*R+y*y<25)return null}const p=[];this.app&&(this.app.traffic&&(this.app.traffic.vehicles&&p.push(...this.app.traffic.vehicles),this.app.traffic.parkedVehicles&&p.push(...this.app.traffic.parkedVehicles)),this.app.physics&&this.app.physics.position&&p.push({position:this.app.physics.position})),this.cops&&p.push(...this.cops),this.parkedCops&&p.push(...this.parkedCops);for(const _ of p)if(_.position){const R=d-_.position.x,y=u-_.position.z;if(R*R+y*y<49)return null}const A=new P(d,.5+t.getBaseHeight(d,u),u),x=Date.now()+Math.floor(Math.random()*1e3),b=new nl(x,A,i);b.app=this.app,b.maxSpeed=29+this.heatLevel*3,b.accel=8+this.heatLevel*1.2;const{carGroup:L,wheels:T}=this.app.createVoxelCarMesh(0,"cop");if(this.app.scene.add(L),b.meshGroup=L,b.wheels=T,i)this.parkedCops.push(b),b.heading=g?Math.PI/2:0,b._updateMesh();else{const _=e.x-d,R=e.z-u;Math.abs(_)>Math.abs(R)?b.heading=_>0?Math.PI/2:-Math.PI/2:b.heading=R>0?0:Math.PI,b.speed=b.maxSpeed*.35,b.velocity.set(Math.sin(b.heading)*b.speed,0,Math.cos(b.heading)*b.speed),b._updateMesh(),this.cops.push(b)}return b}spawnCopAtTile(t,e,i){const n=t.roadColumns.has(e),o=t.roadRows.has(i);if((t.isAlley?t.isAlley(e,i):!1)||n&&o||!n&&!o)return null;let l=e*t.tileSize,c=i*t.tileSize,h=0;const d=9.5,u=Math.random()>.5?d:-d,f=(Math.random()-.5)*15;if(n?(l+=u,c+=f,h=Math.random()>.5?0:Math.PI):(c+=u,l+=f,h=Math.random()>.5?Math.PI/2:-Math.PI/2),t.checkCollision(l,c,2.8).collision)return null;const g=new P(l,.5+t.getBaseHeight(l,c),c),M=Date.now()+Math.floor(Math.random()*1e3),m=new nl(M,g,!0);m.app=this.app,m.maxSpeed=29+this.heatLevel*3,m.accel=8+this.heatLevel*1.2,m.heading=h;const{carGroup:p,wheels:A}=this.app.createVoxelCarMesh(0,"cop");return this.app.scene.add(p),m.meshGroup=p,m.wheels=A,m._updateMesh(),this.parkedCops.push(m),m}update(t,e,i,n,o,a,r,l=!0){if(this.busted)return;this._activeChasingBuf||(this._activeChasingBuf=[]),this._activeParkedBuf||(this._activeParkedBuf=[]);let c=0,h=0;for(let x=0;x<this.cops.length;x++)this.cops[x].active&&(this._activeChasingBuf[c++]=this.cops[x]);this._activeChasingBuf.length=c;const d=this._activeChasingBuf;if(this.active&&(this.spawnTimer-=t,this.spawnTimer<=0&&d.length<this.maxSpawnCops)){const x=Math.max(3.5,9/this.heatLevel),b=Math.max(4,10/this.heatLevel);this.spawnTimer=x+Math.random()*b,this.spawnCop(n,e,!1)}for(let x=0;x<this.parkedCops.length;x++)this.parkedCops[x].active&&!this.parkedCops[x].alerted&&(this._activeParkedBuf[h++]=this.parkedCops[x]);if(this._activeParkedBuf.length=h,this._activeParkedBuf.length<4&&Math.random()<.1){const x=[];for(const[b,L]of n.loadedTiles.entries()){const T=L.gridX,_=L.gridZ,R=L.posX-e.x,y=L.posZ-e.z,w=Math.sqrt(R*R+y*y);if(w>=100&&w<=280){const I=n.roadColumns.has(T),z=n.roadRows.has(_);if(!(n.isAlley?n.isAlley(T,_):!1)&&!(I&&z)&&(I||z)){let D=!1;for(const G of this.cops){const O=G.position.x-L.posX,X=G.position.z-L.posZ;if(O*O+X*X<40*40){D=!0;break}}if(!D)for(const G of this.parkedCops){const O=G.position.x-L.posX,X=G.position.z-L.posZ;if(O*O+X*X<40*40){D=!0;break}}D||x.push({tx:T,tz:_})}}}if(x.length>0){const b=x[Math.floor(Math.random()*x.length)];this.spawnCopAtTile(n,b.tx,b.tz)}}this._allVehiclesBuf||(this._allVehiclesBuf=[]);let f=0;this._allVehiclesBuf[f++]={position:e};for(let x=0;x<r.length;x++)this._allVehiclesBuf[f++]=r[x];for(let x=0;x<o.vehicles.length;x++)this._allVehiclesBuf[f++]=o.vehicles[x];for(let x=0;x<d.length;x++)this._allVehiclesBuf[f++]=d[x];this._allVehiclesBuf.length=f;const g=this._allVehiclesBuf;d.forEach(x=>{let b=e,L=i,T=this.app.physics.heading,_=l,R=x.position.distanceTo(e);if(r.forEach(y=>{const w=x.position.distanceTo(y.position);w<R&&(R=w,b=y.position,L=y.speed,T=y.heading,_=!0)}),x.update(t,n,b,L,T,a,g,_),x.wheels&&!x._lastLOD){const y=x.speed/.42*t;x.wheels.forEach(w=>{w.children[0].rotation.x+=y,w.children[1].rotation.x+=y})}if(x.meshGroup&&!x._lastLOD){const y=x.meshGroup.getObjectByName("sirenBlue"),w=x.meshGroup.getObjectByName("sirenRed");y&&w&&(y.material.emissiveIntensity=x.sirenState?.05:6,w.material.emissiveIntensity=x.sirenState?6:.05)}}),this.parkedCops.forEach((x,b)=>{if(!x.isParked&&x.alerted)this.cops.push(x),this.parkedCops.splice(b,1),this.triggerPursuit(1);else{let L=e,T=i,_=this.app.physics.heading,R=l,y=x.position.distanceTo(e);r.forEach(w=>{const I=x.position.distanceTo(w.position);I<y&&(y=I,L=w.position,T=w.speed,_=w.heading,R=!0)}),x.update(t,n,L,T,_,a,g,R)}}),this.active&&(this.canSeePlayer=!1,d.forEach(x=>{if(x.position.distanceTo(e)<120){let T=!1;for(let _=1;_<=6;_++){const R=_/6,y=e.x+(x.position.x-e.x)*R,w=e.z+(x.position.z-e.z)*R;if(n.checkCollision(y,w,1).collision){T=!0;break}}T||(this.canSeePlayer=!0)}}),this.canSeePlayer?(this.cooldownTimer=0,this.heatProgress=Math.min(1,this.heatProgress+t*.045),this.heatProgress>=1&&(this.heatProgress=0,this.heatLevel<5&&(this.heatLevel,this.heatLevel++,this.maxSpawnCops=Math.min(5,Math.max(1,this.heatLevel)),this.app.showBanner("PURSUIT ESCALATED",`Heat Level: ${this.heatLevel}`)))):(this.heatProgress=Math.max(0,this.heatProgress-t*.025),this.cooldownTimer+=t,this.cooldownTimer>=6&&(this.cooldownTimer=0,this.heatLevel--,this.maxSpawnCops=Math.min(5,Math.max(1,this.heatLevel)),this.heatLevel<=0?this.cancelPursuit():this.app.showBanner("LOST COPS",`Heat Level: ${this.heatLevel}`))));let M=!1;d.forEach(x=>{x.position.distanceTo(e)<8.5&&(M=!0)});const m=i<2.8||!l;this.active&&M&&m?(this.bustProgress=Math.min(1,this.bustProgress+t*.35),this.bustProgress>=1&&this.triggerBusted()):this.bustProgress=Math.max(0,this.bustProgress-t*.4);const p=Math.sin(this.app.physics.heading),A=Math.cos(this.app.physics.heading);for(let x=this.cops.length-1;x>=0;x--){const b=this.cops[x],L=b.position.x-e.x,T=b.position.z-e.z,_=Math.sqrt(L*L+T*T),w=L/(_||1)*p+T/(_||1)*A<-.15?160:350;_>w&&(b.meshGroup&&(b.meshGroup.traverse(I=>{I.geometry&&I.geometry.dispose()}),this.app.scene.remove(b.meshGroup)),this.cops.splice(x,1))}for(let x=this.parkedCops.length-1;x>=0;x--){const b=this.parkedCops[x];b.position.distanceTo(e)>350&&(b.meshGroup&&(b.meshGroup.traverse(L=>{L.geometry&&L.geometry.dispose()}),this.app.scene.remove(b.meshGroup)),this.parkedCops.splice(x,1))}this.roadblocks.forEach(x=>{x.update(t,e)});for(let x=this.roadblocks.length-1;x>=0;x--){const b=this.roadblocks[x];b.position.distanceTo(e)>280&&(b.cleanup(),this.roadblocks.splice(x,1))}}spawnRoadblockAttempt(t,e,i){if(this.roadblocks.length>=4)return;const n=Math.sin(i),o=Math.cos(i),a=[];for(const[M,m]of t.loadedTiles.entries()){const p=m.gridX,A=m.gridZ,x=t.roadColumns.has(p),b=t.roadRows.has(A),L=t.isAlley?t.isAlley(p,A):!1;if(!(x&&b)||L)continue;const _=m.posX-e.x,R=m.posZ-e.z,y=Math.sqrt(_*_+R*R);y<100||y>190||_/y*n+R/y*o<.5||a.push({tx:p,tz:A,posX:m.posX,posZ:m.posZ})}if(a.length===0)return;a.sort((M,m)=>{const p=Math.sqrt((M.posX-e.x)**2+(M.posZ-e.z)**2),A=Math.sqrt((m.posX-e.x)**2+(m.posZ-e.z)**2);return p-A});const r=a[0],l=r.tx,c=r.tz,h=r.posX-e.x,d=r.posZ-e.z;let u="S";Math.abs(h)>Math.abs(d)?u=h>0?"W":"E":u=d>0?"S":"N";let f=[];u==="S"?f=[{dir:"N",tx:l,tz:c+1,isVertical:!0,heading:0},{dir:"E",tx:l+1,tz:c,isVertical:!1,heading:Math.PI/2},{dir:"W",tx:l-1,tz:c,isVertical:!1,heading:Math.PI/2}]:u==="N"?f=[{dir:"S",tx:l,tz:c-1,isVertical:!0,heading:0},{dir:"E",tx:l+1,tz:c,isVertical:!1,heading:Math.PI/2},{dir:"W",tx:l-1,tz:c,isVertical:!1,heading:Math.PI/2}]:u==="W"?f=[{dir:"E",tx:l+1,tz:c,isVertical:!1,heading:Math.PI/2},{dir:"N",tx:l,tz:c+1,isVertical:!0,heading:0},{dir:"S",tx:l,tz:c-1,isVertical:!0,heading:0}]:u==="E"&&(f=[{dir:"W",tx:l-1,tz:c,isVertical:!1,heading:Math.PI/2},{dir:"N",tx:l,tz:c+1,isVertical:!0,heading:0},{dir:"S",tx:l,tz:c-1,isVertical:!0,heading:0}]),f.sort(()=>Math.random()-.5),[f[0],f[1]].forEach((M,m)=>{const p=Date.now()+Math.floor(Math.random()*1e3)+m,A=M.tx*t.tileSize,x=M.tz*t.tileSize,b=new P(A,.35+t.getBaseHeight(A,x),x),L=new xm(p,M.tx,M.tz,b,M.heading,M.isVertical,this.app);this.roadblocks.push(L)}),this.app.showBanner("ROADBLOCK AHEAD","Police blockade set up at the next junction!")}triggerBusted(){this.busted=!0,this.active=!1,this.app.showBanner("BUSTED","Fined $500!"),this.app.keys={},this.app.physics.speed=0,this.app.physics.velocity.set(0,0,0),setTimeout(()=>{this.app.physics.position.set(0,.5,0),this.app.physics.heading=0,this.app.physics.velocity.set(0,0,0),this.app.physics.speed=0,this.busted=!1,this.heatLevel=0,this.bustProgress=0,this.clearSpawnedCops(),this.app.hudStatsEl.style.display="none",this.app.cancelBtnEl.style.display="none",this.app.navArrow.visible=!1,this.app.clearCheckpointBeacons(),this.app.clearAIMeshes()},3500)}}function ym(){const s={KeyW:"w",KeyA:"a",KeyS:"s",KeyD:"d",ArrowUp:"arrowup",ArrowDown:"arrowdown",ArrowLeft:"arrowleft",ArrowRight:"arrowright",Space:" ",ShiftLeft:"shift",ShiftRight:"shift",KeyN:"n",KeyF:"f",KeyC:"c",KeyV:"v",KeyM:"m",KeyB:"b",KeyP:"p"};window.addEventListener("keydown",t=>{t.key&&(this.keys[t.key.toLowerCase()]=!0);const e=s[t.code];if(e&&(this.keys[e]=!0),this.inMainMenu)return;const i=t.key?t.key.toLowerCase():"";if(i==="c"&&this.cycleCameraMode(),i==="v"&&this.cycleCameraFocus(),i==="m"&&this.debugMenuEnabled&&this.racePanelEl){const n=this.racePanelEl.style.display==="none";this.racePanelEl.style.display=n?"flex":"none"}}),window.addEventListener("keyup",t=>{t.key&&(this.keys[t.key.toLowerCase()]=!1);const e=s[t.code];e&&(this.keys[e]=!1)}),window.addEventListener("blur",()=>{for(let t in this.keys)this.keys[t]=!1})}function vm(){this.debugFocusAI=null;const s=new Zl({color:61695,linewidth:3,depthWrite:!1,depthTest:!1}),t=new We;this.debugPathLine=new _0(t,s),this.debugPathLine.visible=!1,this.debugPathLine.frustumCulled=!1,this.scene.add(this.debugPathLine);const e=new H(.8,.8,.8),i=new fe({color:16776960,depthWrite:!1});this.debugLookaheadMarker=new Q(e,i),this.debugLookaheadMarker.visible=!1,this.debugLookaheadMarker.frustumCulled=!1,this.scene.add(this.debugLookaheadMarker)}function Sm(s=.016){if(this.cameraOverride){this.camera.position.copy(this.cameraOverride.pos),this.camera.lookAt(this.cameraOverride.lookAt),this.cameraOverride.roll!==void 0&&this.camera.rotateZ(this.cameraOverride.roll),this.cameraOverride.fov!==void 0&&(this.camera.fov=this.cameraOverride.fov,this.camera.updateProjectionMatrix()),this.dirLight.position.set(this.cameraOverride.pos.x+30,60,this.cameraOverride.pos.z+30),this.dirLightTargetOverride||(this.dirLightTargetOverride=new ce,this.scene.add(this.dirLightTargetOverride)),this.dirLightTargetOverride.position.copy(this.cameraOverride.lookAt),this.dirLight.target=this.dirLightTargetOverride;return}let t=this.physics,e=this.carVisualContainer;this.physics.isBoosting,this.physics.isAirborne,this.physics.airTime;let i=this.physics.isDrifting,n=this.physics.velocity.length(),o=this.renderPhysicsPosition||t.position,a=this.renderPhysicsHeading!==void 0?this.renderPhysicsHeading:t.heading;if(this.debugFocusAI&&this.race&&this.race.aiRacers){const O=this.race.aiRacers.find(X=>X.id===this.debugFocusAI);O&&(t=O,e=O.meshGroup||e,O.isBoosting,i=O.isDrifting||!1,n=O.velocity?O.velocity.length():O.speed,o=O.position,a=O.heading)}const r=a;this.gearShiftPunch>0&&(this.gearShiftPunch=Math.max(0,this.gearShiftPunch-4.5*s)),this.camRoll===void 0&&(this.camRoll=0),this.camPitchOffset===void 0&&(this.camPitchOffset=0),this.camBungeeOffset===void 0&&(this.camBungeeOffset=0),this.lastCamSpeed===void 0&&(this.lastCamSpeed=0);const l=s>0?(n-this.lastCamSpeed)/s:0;this.lastCamSpeed=n;const c=Math.max(-20,Math.min(20,l)),h=-c*.035;this.camPitchOffset+=(h-this.camPitchOffset)*(1-Math.exp(-6*s));const d=c*.18;this.camBungeeOffset+=(d-this.camBungeeOffset)*(1-Math.exp(-4*s));const u=Date.now()*.0015,f=Math.sin(u*1.7)*.04+Math.cos(u*3.1)*.02,g=Math.cos(u*2.1)*.04+Math.sin(u*4.3)*.02,M=new P(Math.cos(r),0,-Math.sin(r)),p=-this.physics.velocity.dot(M)*.005;this.camRoll+=(p-this.camRoll)*(1-Math.exp(-5*s));const A=this.physics.isBoosting?16:0,x=this.physics.isAirborne?Math.min(12,this.physics.airTime*15):0,b=55+Math.min(20,n*.35)+this.gearShiftPunch*3.5+A+x;this.camera.fov+=(b-this.camera.fov)*(1-Math.exp(-6*s)),this.camera.updateProjectionMatrix();let L=15,T=5.2,_=!0,R=1.1;const y=this.cameraMode||"medium";if(y==="really_close"?(L=7,T=2.4,R=.95):y==="close"?(L=10.5,T=3.5,R=1):y==="medium"?(L=15,T=5.2,R=1.1):y==="far"?(L=22,T=7.5,R=1.3):y==="bonnet"&&(L=-2.2,T=1,_=!1,R=1),_){let O=r-this.camHeading;O=Math.atan2(Math.sin(O),Math.cos(O));const X=i?2.5:5;this.camHeading+=O*(1-Math.exp(-X*s))}else this.camHeading=r;let w,I;_?(w=L+n*.1+this.camBungeeOffset+this.gearShiftPunch*1.8,I=T+Math.max(0,1.5-n*.01)+this.camPitchOffset):(w=L,I=T);const z=new P(-Math.sin(this.camHeading)*w,I,-Math.cos(this.camHeading)*w),j=o.clone().add(z);_?this.camera.position.lerp(j,1-Math.exp(-9*s)):this.camera.position.copy(j),_&&(this.camera.position.x+=f,this.camera.position.y+=g);let C=0;if(n>25&&(C+=(n-25)*.005),i&&_&&(C+=.08),this.gearShiftPunch>0&&t===this.physics&&_&&(C+=this.gearShiftPunch*.12),this.crashShake>0&&t===this.physics&&(C+=this.crashShake),C>0&&(this.camera.position.x+=(Math.random()-.5)*C,this.camera.position.y+=(Math.random()-.5)*C,this.camera.position.z+=(Math.random()-.5)*C),_){const X=this.world?this.world.getGroundHeight(this.camera.position.x,this.camera.position.z):0;this.camera.position.y<X+2&&(this.camera.position.y=X+2)}const D=y==="bonnet"?15+n*.1:4+n*.08,G=o.clone().add(new P(Math.sin(r)*D,R,Math.cos(r)*D));this.camera.lookAt(G),_&&this.camera.rotateZ(this.camRoll),this.dirLight.position.set(o.x+30,60,o.z+30),this.dirLight.target=e}function wm(){if(!this.race||!this.race.aiRacers||this.race.aiRacers.length===0){this.debugFocusAI=null;return}if(this.debugFocusAI===null)this.debugFocusAI=this.race.aiRacers[0].id;else{const s=this.race.aiRacers.findIndex(t=>t.id===this.debugFocusAI);s===-1||s===this.race.aiRacers.length-1?this.debugFocusAI=null:this.debugFocusAI=this.race.aiRacers[s+1].id}if(this.debugFocusAI===null)this.showBanner("CAMERA: PLAYER","Focused on Player Car",1500);else{const s=this.race.aiRacers.find(t=>t.id===this.debugFocusAI);this.showBanner(`CAMERA: ${s.name}`,"Focusing on AI racer",1500)}}function Em(){const s=["really_close","close","medium","far","bonnet"],e=(s.indexOf(this.cameraMode||"medium")+1)%s.length;this.cameraMode=s[e],this.showBanner(`CAMERA: ${this.cameraMode.toUpperCase().replace("_"," ")}`,"Switched camera view",1200)}function bm(){const s=this.physics,t=this.physics.velocity.length(),e=this.renderPhysicsPosition||s.position,i=this.renderPhysicsHeading!==void 0?this.renderPhysicsHeading:s.heading;let n=15,o=5.2,a=1.1;const r=this.cameraMode||"medium";r==="really_close"?(n=7,o=2.4,a=.95):r==="close"?(n=10.5,o=3.5,a=1):r==="medium"?(n=15,o=5.2,a=1.1):r==="far"?(n=22,o=7.5,a=1.3):r==="bonnet"&&(n=-2.2,o=1,a=1);const l=n+t*.1,c=o+Math.max(0,1.5-t*.01),h=new P(-Math.sin(i)*l,c,-Math.cos(i)*l),d=e.clone().add(h),u=r==="bonnet"?15+t*.1:4+t*.08,f=e.clone().add(new P(Math.sin(i)*u,a,Math.cos(i)*u)),g=55+Math.min(20,t*.35);return{pos:d,lookAt:f,fov:g}}const Tm=new P,Am=new P,Jo=new P,al=new se,rl=new Tn,Ho=new P,Cm=120*120;function Rm(s,t){return!s||!s.camera?!0:(Ho.setFromMatrixPosition(t.matrixWorld),s.camera.position.distanceToSquared(Ho)>Cm?!1:(al.multiplyMatrices(s.camera.projectionMatrix,s.camera.matrixWorldInverse),rl.setFromProjectionMatrix(al),rl.containsPoint(Ho)))}function Pm(s,t){const e=Math.round(t*20)/20,i=`${s}_${e}`;return this.particleMaterialCache||(this.particleMaterialCache={}),this.particleMaterialCache[i]||(this.particleMaterialCache[i]=new zt({color:s,roughness:.9,transparent:!0,opacity:e,depthWrite:!1})),this.particleMaterialCache[i]}function Lm(s,t){const e=Math.round(t*20)/20,i=`${s}_${e}`;return this.smokeMaterialCache||(this.smokeMaterialCache={}),this.smokeMaterialCache[i]||(this.smokeMaterialCache[i]=new fe({color:s,transparent:!0,opacity:e,depthWrite:!1})),this.smokeMaterialCache[i]}function Im(){this.particlePool=[],this.maxParticles=280;const s=new H(.25,.25,.25);for(let t=0;t<this.maxParticles;t++){const e=t>=140&&t<220,i=t>=220;let n;e?n=new zt({color:11197951,transparent:!0,opacity:.4,roughness:.1,metalness:.8,depthWrite:!1}):i?n=new fe({color:16777215,transparent:!0,opacity:1,blending:xe,depthWrite:!1}):n=new fe({color:13421772,transparent:!0,opacity:.5,depthWrite:!1});const o=new Q(s,n);o.visible=!1,this.scene.add(o),this.particlePool.push({mesh:o,mat:n,life:0,maxLife:1,velocity:new P,isWater:e,isSpark:i,color:e?11197951:i?16777215:13421772})}}function Dm(){this.smokePool=[],this.maxSmoke=120;const s=new H(1.5,1.5,1.5);for(let t=0;t<this.maxSmoke;t++){const e=new fe({color:16755258,transparent:!0,opacity:.35,depthWrite:!1}),i=new Q(s,e);i.visible=!1,this.scene.add(i),this.smokePool.push({mesh:i,mat:e,life:0,maxLife:2,velocity:new P,color:16755258})}}function Um(){this.skidmarkPool=[],this.maxSkidmarks=300,this.skidIndex=0;const s=new H(.35,.01,1);this.skidMaterials=[];for(let t=0;t<10;t++){const e=.5+t*.5,i=O0();i.repeat.set(1,e*4);const n=new zt({map:i,transparent:!0,opacity:.85,roughness:.9,metalness:.1,depthWrite:!1});this.skidMaterials.push(n)}for(let t=0;t<this.maxSkidmarks;t++){const e=new Q(s,this.skidMaterials[0]);e.visible=!1,this.scene.add(e),this.skidmarkPool.push({mesh:e})}this.prevLeftWheel=null,this.prevRightWheel=null}function Nm(s,t){const e=this.skidmarkPool[this.skidIndex],i=e.mesh,n=Tm.addVectors(s,t).multiplyScalar(.5),o=40,a=Math.round(s.x/o),r=Math.round(s.z/o),l=this.world.roadColumns.has(a)||this.world.roadRows.has(r),c=this.world.roadColumns.has(a)&&this.world.roadRows.has(r);let h=.22;if(l&&!c){const m=s.x-a*o,p=s.z-r*o,{rwX:A,rwZ:x}=this.world.getRoadWidthForGrid(a,r);this.world.roadRows.has(r)?Math.abs(p)>x/2&&(h=.37):Math.abs(m)>A/2&&(h=.37)}else l||(h=.37);const d=this.world.getBaseHeight(n.x,n.z);n.y=h+d;const f=Am.subVectors(t,s).length();if(f<.05)return;const g=Math.max(0,Math.min(9,Math.round((f-.5)/.5)));i.material=this.skidMaterials[g],i.position.copy(n),i.scale.set(1,1,f),i.visible=!0;const M=Jo.copy(t);M.y=h+this.world.getBaseHeight(M.x,M.z),i.lookAt(M),e.age=0,this.skidIndex=(this.skidIndex+1)%this.maxSkidmarks}function zm(s,t,e=8947848,i=1,n=!1,o=!1){let a=0;for(const r of this.particlePool)if(r.life<=0&&r.isWater===n&&r.isSpark===o&&(r.mesh.position.copy(s),r.mesh.visible=!0,r.color!==e&&(r.color=e,r.mat.color.setHex(e)),r.mat.opacity=n?.45:o?1:.4,r.life=n?.35+Math.random()*.35:o?.15+Math.random()*.15:.5+Math.random()*.5,r.maxLife=r.life,r.isWater=n,r.isSpark=o,n?(r.velocity.set((Math.random()-.5)*5.2+t.x*4.2,Math.random()*4.8+4,(Math.random()-.5)*5.2+t.z*4.2),r.mesh.scale.setScalar(.6+Math.random()*.6)):o?(r.velocity.set((Math.random()-.5)*4.5+t.x*(10+Math.random()*6),Math.random()*5+3+t.y*(6+Math.random()*4),(Math.random()-.5)*4.5+t.z*(10+Math.random()*6)),r.mesh.scale.set(.04,.04,.35),Jo.copy(s).add(r.velocity),r.mesh.lookAt(Jo)):(r.velocity.set((Math.random()-.5)*3+t.x*1.5,Math.random()*2+.5,(Math.random()-.5)*3+t.z*1.5),r.mesh.scale.setScalar(1)),a++,a>=i))break}function Fm(s,t=16755258,e=1,i=1){for(const n of this.smokePool)if(n.life<=0){const o=this.world&&typeof this.world.getGroundHeight=="function"?this.world.getGroundHeight(s.x,s.z):.5;n.mesh.position.set(s.x+(Math.random()-.5)*6,o-.3,s.z+(Math.random()-.5)*6),n.mesh.visible=!0,n.color!==t&&(n.color=t,n.mat.color.setHex(t)),n.mat.opacity=.28*e,n.life=(1.2+Math.random()*.8)*i,n.maxLife=n.life,n.opacityScale=e,n.sizeScale=i,n.velocity.set((Math.random()-.5)*1.2,(10+Math.random()*6)*i,(Math.random()-.5)*1.2);break}}function Bm(s){for(const t of this.particlePool)if(t.life>0){if(t.life-=s,!Rm(this,t.mesh)){t.life<=0&&(t.mesh.visible=!1);continue}if(t.mesh.position.addScaledVector(t.velocity,s),t.isWater){t.velocity.y-=14.5*s;const e=t.life/t.maxLife,i=t.maxLife*(.6+Math.sin(e*Math.PI)*1.1);t.mesh.scale.setScalar(i),t.mat.opacity=Math.sin(e*Math.PI)*.45;const o=.22+this.world.getBaseHeight(t.mesh.position.x,t.mesh.position.z);t.mesh.position.y<o&&(t.mesh.position.y=o,t.velocity.y=0,t.velocity.x*=.85,t.velocity.z*=.85)}else{t.velocity.y+=.2*s;const e=t.life/t.maxLife;t.mesh.scale.setScalar(1+(1-e)*2),t.mat.opacity=e*.4}t.life<=0&&(t.mesh.visible=!1)}}function Gm(s){for(const t of this.smokePool)if(t.life>0){t.life-=s,t.mesh.position.addScaledVector(t.velocity,s),t.velocity.x+=Math.sin(t.mesh.position.y*.2)*.2,t.velocity.z+=Math.cos(t.mesh.position.y*.2)*.2;const e=t.life/t.maxLife,i=t.sizeScale||1,n=t.opacityScale||1;t.mesh.scale.setScalar((1+(1-e)*3.5)*i),t.mat.opacity=e*.28*n,t.life<=0&&(t.mesh.visible=!1)}}function Om(){this.debrisPool=[],this.maxDebris=120;const s=new H(1,1,1);for(let t=0;t<this.maxDebris;t++){const e=new zt({color:13421772,roughness:.5,metalness:.5,transparent:!0,opacity:1,depthWrite:!0}),i=new Q(s,e);i.visible=!1,this.scene.add(i),this.debrisPool.push({mesh:i,material:e,life:0,maxLife:1,scale:.2,velocity:new P,rotVelocity:new P})}}function km(s,t,e,i=5){let n=0;for(const o of this.debrisPool)if(o.life<=0&&(o.mesh.position.copy(s),o.mesh.position.x+=(Math.random()-.5)*.8,o.mesh.position.y+=(Math.random()-.5)*.4,o.mesh.position.z+=(Math.random()-.5)*.8,o.mesh.visible=!0,o.material.color.setHex(e),o.material.opacity=1,o.material.transparent=!1,o.life=1.2+Math.random()*1.2,o.maxLife=o.life,o.scale=.12+Math.random()*.26,o.mesh.scale.set(o.scale,o.scale,o.scale),o.velocity.set(t.x*(6+Math.random()*6)+(Math.random()-.5)*6,Math.random()*8+3.5,t.z*(6+Math.random()*6)+(Math.random()-.5)*6),o.rotVelocity.set((Math.random()-.5)*16,(Math.random()-.5)*16,(Math.random()-.5)*16),n++,n>=i))break}function Vm(s){s<=0||this.debrisPool.forEach(t=>{if(t.life>0){t.life-=s,t.velocity.y-=22*s,t.mesh.position.addScaledVector(t.velocity,s),t.mesh.rotation.x+=t.rotVelocity.x*s,t.mesh.rotation.y+=t.rotVelocity.y*s,t.mesh.rotation.z+=t.rotVelocity.z*s;const e=this.world.getBaseHeight(t.mesh.position.x,t.mesh.position.z),i=40,n=Math.round(t.mesh.position.x/i),o=Math.round(t.mesh.position.z/i),a=this.world.roadColumns.has(n)||this.world.roadRows.has(o),r=this.world.roadColumns.has(n)&&this.world.roadRows.has(o);let l=.22;if(a&&!r){const h=t.mesh.position.x-n*i,d=t.mesh.position.z-o*i,{rwX:u,rwZ:f}=this.world.getRoadWidthForGrid(n,o);this.world.roadRows.has(o)?Math.abs(d)>f/2&&(l=.37):Math.abs(h)>u/2&&(l=.37)}else a||(l=.37);const c=l+e;t.mesh.position.y<c+t.scale/2&&(t.mesh.position.y=c+t.scale/2,t.velocity.y<-1.5?(t.velocity.y=-t.velocity.y*.45,t.velocity.x*=.65,t.velocity.z*=.65,t.rotVelocity.multiplyScalar(.6)):(t.velocity.y=0,t.velocity.x*=.92*Math.exp(-s),t.velocity.z*=.92*Math.exp(-s),t.rotVelocity.multiplyScalar(.9*Math.exp(-s)))),t.life<.5&&(t.material.transparent=!0,t.material.opacity=Math.max(0,t.life/.5)),t.life<=0&&(t.mesh.visible=!1)}})}function Hm(s){const t=Math.floor(s/60),e=Math.floor(s%60),i=Math.floor(s%1*100);return`${t.toString().padStart(2,"0")}:${e.toString().padStart(2,"0")}.${i.toString().padStart(2,"0")}`}function Wm(s,t,e=2e3){const i=document.getElementById("race-banner"),n=document.getElementById("banner-title"),o=document.getElementById("banner-subtitle");n.textContent=s,o.textContent=t,i.classList.add("show"),this.bannerTimeout&&clearTimeout(this.bannerTimeout),this.bannerTimeout=setTimeout(()=>{i.classList.remove("show")},e)}function Xm(){this.notifStackEl=document.getElementById("notification-stack"),this.activeNotifs=new Map}function qm(s,t,e=2e3,i=!1){if(this.notifStackEl)if(this.activeNotifs.has(s)){const n=this.activeNotifs.get(s);i?(n.count=(n.count||1)+1,n.el.textContent=`${t} (${n.count}x)`,n.el.style.animation="none",n.el.offsetHeight,n.el.style.animation="notifSlideIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards"):n.el.textContent=t,n.timeout&&clearTimeout(n.timeout),e>0&&(n.timeout=setTimeout(()=>this.removeNotification(s),e))}else{const n=document.createElement("div");n.className="notification-item",n.textContent=t,t.includes("NEAR MISS")?n.style.color="#ffc600":t.includes("DRIFT")?n.style.color="#00e5ff":t.includes("DRAFT")&&(n.style.color="#39ff14"),this.notifStackEl.appendChild(n);const o={el:n,timeout:null,count:1};for(this.activeNotifs.set(s,o),e>0&&(o.timeout=setTimeout(()=>this.removeNotification(s),e));this.activeNotifs.size>5;){const a=this.activeNotifs.keys().next().value;this.removeNotification(a)}}}function Ym(s){if(!this.activeNotifs.has(s))return;const t=this.activeNotifs.get(s);t.timeout&&clearTimeout(t.timeout),t.el.classList.add("fade-out"),setTimeout(()=>{t.el.parentNode&&t.el.parentNode.removeChild(t.el)},300),this.activeNotifs.delete(s)}function $m(s,t){this.stuntNotifEl&&(this.stuntTitleEl.textContent=s,this.stuntScoreEl.textContent=t,this.stuntNotifEl.style.opacity="1",this.stuntNotifEl.style.transform="translate(-50%, -50%) scale(1.1)",this.stuntNotifTimeout&&clearTimeout(this.stuntNotifTimeout),this.stuntNotifTimeout=setTimeout(()=>{this.stuntNotifEl.style.opacity="0",this.stuntNotifEl.style.transform="translate(-50%, -50%) scale(0.8)"},2e3))}function jm(){const s=this.minimapCtx,t=this.minimapCanvas.width,e=this.minimapCanvas.height;s.clearRect(0,0,t,e),s.fillStyle="#0a0b0e",s.fillRect(0,0,t,e),s.strokeStyle="#1f222b",s.lineWidth=1.5,s.strokeRect(1,1,t-2,e-2),s.strokeStyle="#ffc600",s.lineWidth=2.5;const i=10;s.beginPath(),s.moveTo(1,i),s.lineTo(1,1),s.lineTo(i,1),s.stroke(),s.beginPath(),s.moveTo(t-1,i),s.lineTo(t-1,1),s.lineTo(t-1-i,1),s.stroke(),s.beginPath(),s.moveTo(1,e-1-i),s.lineTo(1,e-1),s.lineTo(i,e-1),s.stroke(),s.beginPath(),s.moveTo(t-1,e-1-i),s.lineTo(t-1,e-1),s.lineTo(t-1-i,e-1),s.stroke();const n=.35;let o=this.physics;if(this.debugFocusAI&&this.race&&this.race.aiRacers){const f=this.race.aiRacers.find(g=>g.id===this.debugFocusAI);f&&(o=f)}const a=o.position.x,r=o.position.z,l=o.heading;s.save(),s.translate(t/2,e/2),s.rotate(l+Math.PI),s.fillStyle="#222530";const c=this.world.tileSize,h=Math.round(a/c),d=Math.round(r/c),u=7;for(let f=h-u;f<=h+u;f++)for(let g=d-u;g<=d+u;g++)if(this.world.roadColumns.has(f)||this.world.roadRows.has(g)){const m=f*c-a,p=g*c-r;s.fillRect(m*n-c*n/2,p*n-c*n/2,c*n,c*n)}if(!this.race.active&&this.race.worldEvents&&this.race.worldEvents.forEach(f=>{const g=f.x-a,M=f.z-r,m=1+Math.sin(Date.now()/200)*.15,p=this.getModeColor?this.getModeColor(f.mode).css:"#ff1e1e";s.save(),s.fillStyle=p,s.beginPath(),s.arc(g*n,M*n,5*m,0,Math.PI*2),s.fill(),s.strokeStyle="#ffffff",s.lineWidth=1.5,s.beginPath(),s.arc(g*n,M*n,8*m,0,Math.PI*2),s.stroke(),s.restore()}),this.race.active&&this.race.checkpoints.forEach((f,g)=>{let M=!1,m=!1;if(this.race.mode==="unordered"?(M=!this.race.unorderedCleared.has(g),m=M):(m=g===this.race.currentIndex,M=m),M){const p=f.x-a,A=f.z-r,x=g===this.race.checkpoints.length-1;if(s.save(),m){const b=1+Math.sin(Date.now()/150)*.15;s.fillStyle="#ffb31a",s.beginPath(),s.arc(p*n,A*n,5.5*b,0,Math.PI*2),s.fill(),s.strokeStyle="#ffffff",s.lineWidth=1.5,s.beginPath(),s.arc(p*n,A*n,9*b,0,Math.PI*2),s.stroke()}else x?(s.fillStyle="#ff3b30",s.beginPath(),s.arc(p*n,A*n,6,0,Math.PI*2),s.fill(),s.strokeStyle="#ffffff",s.lineWidth=1,s.beginPath(),s.arc(p*n,A*n,9,0,Math.PI*2),s.stroke()):(s.fillStyle="#ff9900",s.beginPath(),s.arc(p*n,A*n,4,0,Math.PI*2),s.fill());s.restore()}}),this.race.active&&this.race.aiRacers.forEach(f=>{const g=f.position.x-a,M=f.position.z-r;s.fillStyle="#"+f.colorHex.toString(16).padStart(6,"0"),s.beginPath(),s.arc(g*n,M*n,5,0,Math.PI*2),s.fill(),s.strokeStyle="#ffffff",s.lineWidth=1,s.stroke()}),this.pursuit&&this.pursuit.active&&this.pursuit.cops&&this.pursuit.cops.forEach(f=>{const g=f.position.x-a,M=f.position.z-r,m=Math.floor(Date.now()/150)%2===0;s.fillStyle=m?"#ff3b30":"#0066ff",s.beginPath(),s.arc(g*n,M*n,5,0,Math.PI*2),s.fill(),s.strokeStyle="#ffffff",s.lineWidth=1.5,s.stroke()}),this.debugShowTrafficOnMinimap&&this.traffic&&this.traffic.vehicles&&(this.traffic.vehicles.forEach(f=>{const g=f.position.x-a,M=f.position.z-r;s.fillStyle="#6c7182",s.beginPath(),s.arc(g*n,M*n,3.2,0,Math.PI*2),s.fill()}),this.traffic.parkedVehicles&&this.traffic.parkedVehicles.forEach(f=>{const g=f.position.x-a,M=f.position.z-r;s.fillStyle="#444855",s.beginPath(),s.arc(g*n,M*n,2.4,0,Math.PI*2),s.fill()})),this.debugFocusAI&&this.race&&this.race.aiRacers){const f=this.race.aiRacers.find(g=>g.id===this.debugFocusAI);if(f&&f._currentPath&&f._currentPath.length>0){s.strokeStyle="#00f0ff",s.lineWidth=2.5,s.beginPath();const g=f.position.x-a,M=f.position.z-r;s.moveTo(g*n,M*n);for(let m=f._pathWptIdx;m<f._currentPath.length;m++){const p=f._currentPath[m],A=p.x-a,x=p.z-r;s.lineTo(A*n,x*n)}if(s.stroke(),f.debugLookahead){const m=f.debugLookahead.x-a,p=f.debugLookahead.z-r;s.fillStyle="#ffff00",s.beginPath(),s.arc(m*n,p*n,3.5,0,Math.PI*2),s.fill()}}}s.restore(),s.fillStyle=o===this.physics?"#ffc600":"#"+(o.colorHex?o.colorHex.toString(16).padStart(6,"0"):"00f0ff"),s.beginPath(),s.moveTo(t/2,e/2-9),s.lineTo(t/2-6,e/2+7),s.lineTo(t/2+6,e/2+7),s.closePath(),s.fill()}function Zm(){this.hudStatsEl=document.getElementById("stats-hud"),this.statsModeEl=document.getElementById("stats-mode"),this.statsProgressEl=document.getElementById("stats-progress"),this.statsProgressLabelEl=document.getElementById("stats-progress-label"),this.statsTimerEl=document.getElementById("stats-timer"),this.cancelBtnEl=document.getElementById("btn-cancel"),this.racePanelEl=document.querySelector(".race-panel"),!this.debugMenuEnabled&&this.racePanelEl&&(this.racePanelEl.style.display="none"),document.getElementById("btn-sprint").onclick=()=>this.startRace("sprint"),document.getElementById("btn-circuit").onclick=()=>this.startRace("circuit"),document.getElementById("btn-unordered").onclick=()=>this.startRace("unordered"),document.getElementById("btn-autocross").onclick=()=>this.startRace("autocross"),this.cancelBtnEl.onclick=()=>this.cancelRace(),this.checkpointVisualsGroup=new Vt,this.scene.add(this.checkpointVisualsGroup)}function Km(s){if(!this.world||!this.world.breakables)return;this._breakFrustum||(this._breakFrustum=new Tn,this._breakProjMat=new se),this._breakProjMat.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse),this._breakFrustum.setFromProjectionMatrix(this._breakProjMat);const t=this._breakFrustum,e=[{position:this.physics.position,velocity:this.physics.velocity,radius:2.2,isPlayer:!0}];this.race.active&&this.race.aiRacers.forEach(i=>{e.push({position:i.position,velocity:i.velocity||new P,radius:2,isPlayer:!1})}),this.pursuit&&this.pursuit.active&&this.pursuit.cops.forEach(i=>{if(i.active){const o=new P(Math.sin(i.heading),0,Math.cos(i.heading)).clone().multiplyScalar(i.speed);e.push({position:i.position,velocity:o,radius:2,isPlayer:!1})}}),this.traffic&&this.traffic.vehicles&&(this._trafficFwdScratch||(this._trafficFwdScratch=new P),this.traffic.vehicles.forEach(i=>{this._trafficFwdScratch.set(Math.sin(i.heading),0,Math.cos(i.heading)),e.push({position:i.position,velocity:this._trafficFwdScratch.clone().multiplyScalar(i.speed).add(i.impactVelocity),radius:2,isPlayer:!1})})),this.traffic&&this.traffic.parkedVehicles&&this.traffic.parkedVehicles.forEach(i=>{e.push({position:i.position,velocity:i.impactVelocity.clone(),radius:2,isPlayer:!1})}),this.world.breakables.forEach(i=>{if(i.broken){if(i.velocity.y+=-46*s,i.group.position.addScaledVector(i.velocity,s),i.group.rotation.x+=i.angularVelocity.x*s,i.group.rotation.y+=i.angularVelocity.y*s,i.group.rotation.z+=i.angularVelocity.z*s,i.type==="hydrant"&&(i.sprayTimer===void 0&&(i.sprayTimer=18),i.sprayTimer>0)){i.sprayTimer-=s;let d=!1;if((this.physics.position.x-i.position.x)**2+(this.physics.position.z-i.position.z)**2<5&&(d=!0),!d&&this.race&&this.race.active)for(let f=0;f<this.race.aiRacers.length;f++){const g=this.race.aiRacers[f];if((g.position.x-i.position.x)**2+(g.position.z-i.position.z)**2<5){d=!0;break}}if(!d&&this.pursuit&&this.pursuit.active)for(let f=0;f<this.pursuit.cops.length;f++){const g=this.pursuit.cops[f];if(g.active&&(g.position.x-i.position.x)**2+(g.position.z-i.position.z)**2<5){d=!0;break}}if(!d&&this.traffic&&this.traffic.vehicles)for(let f=0;f<this.traffic.vehicles.length;f++){const g=this.traffic.vehicles[f];if((g.position.x-i.position.x)**2+(g.position.z-i.position.z)**2<5){d=!0;break}}if(!d&&this.traffic&&this.traffic.parkedVehicles)for(let f=0;f<this.traffic.parkedVehicles.length;f++){const g=this.traffic.parkedVehicles[f];if((g.position.x-i.position.x)**2+(g.position.z-i.position.z)**2<5){d=!0;break}}if(!d){const f=i.position.clone();f.y=this.world.getGroundHeight(f.x,f.z)+.25;const g=new P((Math.random()-.5)*.12,1,(Math.random()-.5)*.12).normalize();this.spawnParticles(f,g,11197951,3,!0)}}const n=this.world.getGroundHeight(i.group.position.x,i.group.position.z),o=new P(0,1,0).applyQuaternion(i.group.quaternion),a=Math.abs(o.dot(new P(0,1,0))),r=i.comHeight!==void 0?i.comHeight:4.25,l=i.radius!==void 0?i.radius:.22,c=n+Bs.lerp(l,r,a);if(i.group.position.y<c){i.group.position.y=c;const d=a<.15;if(d)i.velocity.y<-1.5?i.velocity.y=-i.velocity.y*.22:i.velocity.y=0,i.velocity.x*=.48*Math.exp(-s*6.5),i.velocity.z*=.48*Math.exp(-s*6.5),i.angularVelocity.multiplyScalar(.35*Math.exp(-s*5));else{const m=16*Math.sqrt(1-a*a),p=o.z,A=-o.x;i.angularVelocity.x+=p*m*s,i.angularVelocity.z+=A*m*s,i.velocity.x*=.98,i.velocity.z*=.98}let u=Math.round(i.group.rotation.x/(Math.PI/2))*(Math.PI/2),f=Math.round(i.group.rotation.z/(Math.PI/2))*(Math.PI/2);Math.abs(u)<.1&&Math.abs(f)<.1&&(Math.abs(i.velocity.x)>Math.abs(i.velocity.z)?f=i.velocity.x>0?-Math.PI/2:Math.PI/2:u=i.velocity.z>0?Math.PI/2:-Math.PI/2);const g=d?7:2.5;i.group.rotation.x+=(u-i.group.rotation.x)*g*s,i.group.rotation.z+=(f-i.group.rotation.z)*g*s}const h=t.containsPoint(i.group.position);i.fadeTimer-=s,!h&&i.fadeTimer<=0&&(i.group.scale.multiplyScalar(Math.max(0,1-s*2.5)),i.group.scale.x<.05&&(i.group.visible=!1,this.scene.remove(i.group),i.shouldRemove=!0))}else for(let n of e){const o=n.position.distanceTo(i.position),a=n.radius+(i.radius!==void 0?i.radius:.6);if(o<a){const r=n.velocity.length();if(r<4){const h=n.position.clone().sub(i.position);h.y=0,h.normalize();const d=a-o;n.position.addScaledVector(h,d);const u=n.velocity.dot(h);u<0&&n.velocity.addScaledVector(h,-1.2*u);continue}if(i.broken=!0,i.fadeTimer=10,i.group&&i.group.parent){const h=new P,d=new Ie;i.group.getWorldPosition(h),i.group.getWorldQuaternion(d),i.group.parent.remove(i.group),i.group.position.copy(h),i.group.quaternion.copy(d),this.scene.add(i.group)}const l=n.velocity.clone().normalize();if(r>2){const h=Math.max(r*.82+3.5,6);i.velocity.copy(l).multiplyScalar(h),i.velocity.y=Math.max(r*.32+3.8,4.5),i.angularVelocity.set((Math.random()-.5)*4.5,(Math.random()-.5)*1.5,(Math.random()-.5)*4.5)}else i.velocity.copy(l).multiplyScalar(4),i.velocity.y=4.5,i.angularVelocity.set((Math.random()-.5)*3.5,(Math.random()-.5)*1,(Math.random()-.5)*3.5);i.velocity.y+=.8,i.angularVelocity.x+=(Math.random()-.5)*1,i.angularVelocity.z+=(Math.random()-.5)*1,i.lights.forEach(h=>{h.intensity=0}),i.flares.forEach(h=>{h.visible=!1}),i.poolMeshes&&i.poolMeshes.forEach(h=>{h.visible=!1}),i.group.traverse(h=>{h.name==="lightCone"&&(h.visible=!1)}),i.type==="trafficlight"&&i.group.traverse(h=>{h.isMesh&&h.material&&h!==i.group.children[0]&&h.name!=="lightCone"&&(h.material=this.world.tlHousingMat)}),n.isPlayer&&r>8&&(this.crashShake=Math.min(.5,r*.025),this.physics.velocity.multiplyScalar(.92));const c=i.position.clone();c.y=.8,i.type==="hydrant"?(this.spawnParticles(c,l,11197951,18,!0),this.spawnDebris(c,l,14492194,5)):(this.spawnParticles(c,l,16755200,10,!1,!0),this.spawnDebris(c,l,3355443,5));break}}}),this.world.breakables=this.world.breakables.filter(i=>!i.shouldRemove)}function Jm(s=.016){const t=this.physics.position,e=this.physics.heading,i=new P(Math.sin(e),0,Math.cos(e));let n=!1;const o=[];this.traffic&&this.traffic.vehicles&&o.push(...this.traffic.vehicles),this.race.active&&this.race.aiRacers&&o.push(...this.race.aiRacers),this.pursuit&&this.pursuit.active&&this.pursuit.cops&&o.push(...this.pursuit.cops);for(const a of o){if(a.opacity!==void 0&&a.opacity<.5)continue;const r=a.position.clone().sub(t);r.y=0;const l=r.length();if(l>4.5&&l<40&&(r.normalize(),r.dot(i)>.88&&new P(Math.sin(a.heading),0,Math.cos(a.heading)).dot(i)>.6)){n=!0;break}}if(this.physics.inSlipstream=n,n){this.draftNitroGained===void 0&&(this.draftNitroGained=0),this.draftNitroGained+=.08*s,this.physics.nitroLevel=Math.min(this.physics.maxNitro,this.physics.nitroLevel+.08*s);const a=Math.round(this.draftNitroGained*100);if(this.showNotification("draft_active",`DRAFTING +${a}%`,0),Math.random()<.35){const r=new P((Math.random()-.5)*1.5,.4+Math.random()*.4,1.8).applyMatrix4(this.carVisualContainer.matrixWorld),l=i.clone().negate();this.spawnParticles(r,l,16777215,1)}}else{if(this.draftNitroGained!==void 0&&this.draftNitroGained>.03){const a=Math.round(this.draftNitroGained*100);this.removeNotification("draft_active"),this.showNotification("draft_done",`DRAFT! +${a}%`,1500,!0)}else this.removeNotification("draft_active");this.draftNitroGained=0}}function Qm(s){this.nearMissCooldowns||(this.nearMissCooldowns=new Map);for(const[n,o]of this.nearMissCooldowns.entries())o<=s?this.nearMissCooldowns.delete(n):this.nearMissCooldowns.set(n,o-s);if(this.physics.velocity.length()<15)return;const e=this.physics.position,i=[];this.traffic&&this.traffic.vehicles&&this.traffic.vehicles.forEach(n=>{i.push({id:`traffic_${n.id}`,position:n.position,opacity:n.opacity})}),this.race.active&&this.race.aiRacers&&this.race.aiRacers.forEach(n=>{i.push({id:`ai_${n.id}`,position:n.position,opacity:1})}),this.pursuit&&this.pursuit.active&&this.pursuit.cops&&this.pursuit.cops.forEach(n=>{n.active&&i.push({id:`cop_${n.id}`,position:n.position,opacity:1})});for(const n of i){if(n.opacity!==void 0&&n.opacity<.5)continue;const o=e.distanceTo(n.position);o>2.2&&o<5&&(this.nearMissCooldowns.has(n.id)||(this.physics.nitroLevel=Math.min(this.physics.maxNitro,this.physics.nitroLevel+.15),this.nearMissCooldowns.set(n.id,3),this.showNotification("nearmiss_done","NEAR MISS! +15%",1500,!0)))}}function tg(s){this.prevIsDrifting===void 0&&(this.prevIsDrifting=!1),this.driftNitroGained===void 0&&(this.driftNitroGained=0);const t=this.physics.isDrifting;if(t){const e=this.physics.velocity.dot(new P(Math.cos(this.physics.heading),0,-Math.sin(this.physics.heading))),i=Math.min(2,Math.abs(e)/8),n=.075*s*i;this.driftNitroGained+=n;const o=Math.round(this.driftNitroGained*100);this.showNotification("drift_active",`DRIFTING +${o}%`,0)}else{if(this.prevIsDrifting&&this.driftNitroGained>.03){const e=Math.round(this.driftNitroGained*100);this.removeNotification("drift_active"),this.showNotification("drift_done",`DRIFT! +${e}%`,1500,!0)}else this.removeNotification("drift_active");this.driftNitroGained=0}this.prevIsDrifting=t}const me=new P,oe=new P,Ee=new P,ll=new P,un=new Ie,cl=new Ie,hl=new Yn;class eg{constructor(){this.container=document.getElementById("canvas-container"),this.speedValEl=document.getElementById("speed-val"),this.driftStatusEl=document.getElementById("drift-status"),this.loaderEl=document.getElementById("loader"),this.gearValEl=document.getElementById("gear-val"),this.dialNeedleEl=document.getElementById("dial-needle"),this.dialRpmFillEl=document.getElementById("dial-rpm-fill"),this.nitroBarEl=document.getElementById("dial-nitro-fill"),this.nitroPctEl=document.getElementById("nitro-pct"),this.stuntNotifEl=document.getElementById("stunt-notif"),this.stuntTitleEl=document.getElementById("stunt-title"),this.stuntScoreEl=document.getElementById("stunt-score"),this.nearMissCooldowns=new Map,this.driftNitroGained=0,this.prevIsDrifting=!1,this.gearShiftPunch=0,this.debugShowTrafficOnMinimap=!1,this.keys={},this.inFeedbackMenu=!1,this.debugMenuEnabled=!1,this.physics=new hm,this.race=new um,this.setupFeedbackUI(),this.inMainMenu=!0,this.cinematicManager=new pm(this),this.aiMeshes=[],this.pursuit=new _m(this),this.copFlashEl=document.getElementById("cop-flash"),this.heatHudEl=document.getElementById("heat-hud"),this.heatHudValueEl=document.getElementById("heat-hud-value"),this.heatHudLosEl=document.getElementById("heat-hud-los"),this.heatFillEl=document.getElementById("heat-fill"),this.bustedContainerEl=document.getElementById("busted-container"),this.bustedFillEl=document.getElementById("busted-fill"),this.noiseOverlayEl=document.getElementById("noise-overlay"),this.lensflareTex=G0(),this.nitroFlareTex=k0(),this.nitroSpriteMat=new $e({map:this.nitroFlareTex,color:16777215,blending:xe,transparent:!0,depthWrite:!1}),this.initThree(),this.world=new lm(this.scene),this.isInitialLoad=!0;const t=["x","z"];this.menuCameraAxis=t[Math.floor(Math.random()*t.length)],this.menuCameraDir=Math.random()>.5?1:-1,this.menuCameraBaseOffset=180+Math.random()*80;const e=this.world.getGroundHeight(this.physics.position.x,this.physics.position.z);this.physics.position.y=e+.5,this.createCarMesh(),this.createNavigationArrow(),this.initInput(),this.initMinimap(),this.initParticles(),this.initCheckpointSmoke(),this.initDebris(),this.slowMoTimer=0,this.crashShake=0,this.initSkidmarks(),this.initNotifications(),this.initRaceHUD(),this.initDebugVisuals(),this.perf={world:0,physics:0,traffic:0,trafficUpdate:0,trafficMesh:0,collisions:0,playerVisuals:0,pursuit:0,race:0,particles:0,render:0,eyeAdaptation:0,total:0},this.createPerfHUD(),this.traffic=new mm(this.scene,30),this.traffic.init(this.physics.position,this.world),this.race.selectNewWorldEvent(this.world,this.physics.position),this.lastEventRefreshPos=this.physics.position.clone(),this.eventPromptEl=document.createElement("div"),this.eventPromptEl.className="event-prompt-container",this.eventPromptEl.innerHTML=`
      <div id="event-prompt-stats" class="event-prompt-stats"></div>
      <div id="event-prompt-mode" class="event-prompt-title">CIRCUIT EVENT</div>
      <div class="event-prompt-action">PRESS [F] TO START</div>
    `,document.body.appendChild(this.eventPromptEl),this.eventPromptModeEl=document.getElementById("event-prompt-mode"),this.eventPromptStatsEl=document.getElementById("event-prompt-stats"),this.precompileShaders(),this.inMainMenu=!0,this.menuTransitionTime=0,this.menuTransitionDuration=2,this.mainMenuEl=document.getElementById("main-menu"),this.hudLayerEl=document.querySelector(".hud-layer"),this.hudLayerEl&&(this.hudLayerEl.style.display="none"),this.racePanelEl=document.querySelector(".race-panel"),this.racePanelEl&&(this.racePanelEl.style.display="none");const i=document.getElementById("btn-play");i&&(i.onclick=()=>{this.inMainMenu&&this.menuTransitionTime===0&&(this.menuTransitionTime=.001,this.mainMenuEl&&(this.mainMenuEl.classList.add("fade-out"),setTimeout(()=>{this.mainMenuEl.remove()},600)))}),setTimeout(()=>{this.loaderEl&&(this.loaderEl.style.opacity=0,setTimeout(()=>this.loaderEl.remove(),500))},800),this.clock=new Kl,this.animate()}initThree(){this.scene=new M0,this.scene.background=new te(1251110),this.scene.fog=new ra(1251110,.0072),this.renderer=new $l({antialias:!0}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.25)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=fl,this.renderer.toneMapping=ta,this.renderer.toneMappingExposure=1,this.container.appendChild(this.renderer.domElement),this.camera=new Ue(45,window.innerWidth/window.innerHeight,.1,1e3),this.camHeading=0;const t=new C0(3490136,.95);this.scene.add(t),this.dirLight=new A0(7043993,.9),this.dirLight.position.set(.6,1.2,.4).normalize(),this.dirLight.castShadow=!1,this.scene.add(this.dirLight);const e=new w0(1316907,789260,.35);this.scene.add(e);const i=new z0(this.scene,this.camera),n=new B0;this.composer=new N0(this.renderer),this.composer.addPass(i),this.composer.addPass(n),window.addEventListener("resize",()=>{this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight),this.composer.setSize(window.innerWidth,window.innerHeight)})}createVoxelCarMesh(t,e="sports"){return H0(t,e,this.lensflareTex)}updateVehicleLOD(t,e,i=1){if(!t.meshGroup)return;let n=1;e>95?n=0:e>80&&(n=1-(e-80)/15);const o=n<=0;t._lastLOD!==o&&(t._lastLOD=o,t.wheels&&t.wheels.forEach(l=>l.visible=!o),t.meshGroup.children.forEach(l=>{l.name!=="carBody"&&l.name!=="headlightPool"&&(l.visible=!o)}));const a=i,r=n*i;if(t._lastBodyOpacity!==a||t._lastDetailOpacity!==r){t._lastBodyOpacity=a,t._lastDetailOpacity=r;const l=a>.005;if(t.meshGroup.visible=l,l){const c=t.meshGroup.getObjectByName("carBody");c&&c.material&&(c.material.transparent=a<1,c.material.opacity=a),o||t.meshGroup.children.forEach(h=>{h.name!=="carBody"&&h.name!=="headlightPool"&&h.traverse(d=>{d.isMesh&&d.material&&(d.material.transparent=!0,d.material.opacity=r)})})}}}createCarMesh(){const{carGroup:t,wheels:e}=this.createVoxelCarMesh(1719692,"sports"),i=t.getObjectByName("headlightPool");i&&(i.material.opacity=0),this.carGroup=t,this.wheels=e,this.playerTaillightMat=new fe({color:11145489});const n=this.carGroup.getObjectByName("taillights");n&&(n.material=this.playerTaillightMat),this.tailLight=new Ps(16711680,1.2,12,1.3),this.tailLight.position.set(0,.42,-2.35),this.carGroup.add(this.tailLight),this.nitroLight=new Ps(61695,0,15,1.4),this.nitroLight.position.set(0,.3,-2.15),this.carGroup.add(this.nitroLight),this.reverseLightMat=new fe({color:16777215}),this.reverseLightPoint=new Ps(16777215,0,8,1.5),this.reverseLightPoint.position.set(0,.42,-2.4),this.carGroup.add(this.reverseLightPoint);const o=new H(.25,.1,.1);this.reverseLightL=new Q(o,this.reverseLightMat),this.reverseLightL.position.set(-.55,.42,-2.36),this.reverseLightL.visible=!1,this.carGroup.add(this.reverseLightL),this.reverseLightR=new Q(o,this.reverseLightMat),this.reverseLightR.position.set(.55,.42,-2.36),this.reverseLightR.visible=!1,this.carGroup.add(this.reverseLightR),this.nitroLeftSprite=new Ne(this.nitroSpriteMat),this.nitroLeftSprite.position.set(-.6,.2,-2.1),this.nitroLeftSprite.scale.set(.001,.001,.001),this.carGroup.add(this.nitroLeftSprite),this.nitroRightSprite=new Ne(this.nitroSpriteMat),this.nitroRightSprite.position.set(.6,.2,-2.1),this.nitroRightSprite.scale.set(.001,.001,.001),this.carGroup.add(this.nitroRightSprite),this.leftSpotTarget=new ce,this.leftSpotTarget.position.set(-.65,.4,15),this.scene.add(this.leftSpotTarget),this.leftSpot=new Vr(16775910,14,50,Math.PI/14,.85,1),this.leftSpot.position.set(-.65,.4,2.35),this.leftSpot.target=this.leftSpotTarget,this.carGroup.add(this.leftSpot),this.rightSpotTarget=new ce,this.rightSpotTarget.position.set(.65,.4,15),this.scene.add(this.rightSpotTarget),this.rightSpot=new Vr(16775910,14,50,Math.PI/14,.85,1),this.rightSpot.position.set(.65,.4,2.35),this.rightSpot.target=this.rightSpotTarget,this.carGroup.add(this.rightSpot),this.carVisualContainer=new Vt,this.carVisualContainer.add(this.carGroup),this.scene.add(this.carVisualContainer)}updateHeadlightFlares(t,e){if(t._flareThrottle||(t._flareThrottle=0),t._flareThrottle=(t._flareThrottle+1)%3,t._flareThrottle!==0)return;const i=t.getObjectByName("leftHeadlightSprite"),n=t.getObjectByName("rightHeadlightSprite");if(!i||!n)return;const o=this.camera.position;this._flScratch||(this._flScratch={lw:new P,rw:new P,fw:new P,tcl:new P,tcr:new P});const a=this._flScratch;a.lw.copy(i.position).applyMatrix4(t.matrixWorld),a.rw.copy(n.position).applyMatrix4(t.matrixWorld);const r=o.distanceTo(a.lw);if(r>340){i.material.opacity=0,n.material.opacity=0;return}const l=o.distanceTo(a.rw);a.fw.set(Math.sin(e),0,Math.cos(e)),a.tcl.copy(o).sub(a.lw).normalize(),a.tcr.copy(o).sub(a.rw).normalize();const c=a.fw.dot(a.tcl),h=a.fw.dot(a.tcr),d=Math.max(0,1-r/340),u=Math.max(0,1-l/340),f=Math.pow(Math.max(0,c),3.5)*d,g=Math.pow(Math.max(0,h),3.5)*u;i.material.opacity=f*.95,i.scale.set(3.4*(.3+f*1.5),.7*(.3+f*1.5),1),n.material.opacity=g*.95,n.scale.set(3.4*(.3+g*1.5),.7*(.3+g*1.5),1)}deformHeadlightPoolToTerrain(t){const e=t.getObjectByName("headlightPool");if(!e||!e.visible||e.material.opacity<=.01)return;e.updateMatrixWorld(!0);const i=new se().copy(e.matrixWorld).invert(),n=e.geometry.attributes.position,o=new P;for(let a=0;a<n.count;a++){const r=n.getX(a),l=n.getZ(a);o.set(r,0,l).applyMatrix4(e.matrixWorld);const c=this.world.getGroundHeight(o.x,o.z);o.set(o.x,c+.05,o.z).applyMatrix4(i),n.setY(a,o.y)}n.needsUpdate=!0}createNavigationArrow(){this.navArrow=new Vt,this.navArrow.renderOrder=9999;const t=new zt({color:15051067,emissive:15051067,emissiveIntensity:.6,roughness:.6,metalness:.3,depthTest:!1,depthWrite:!1,transparent:!0}),e=new H(.3,.15,1.2),i=new Q(e,t);i.position.z=-.4,i.castShadow=!0,i.receiveShadow=!0,i.renderOrder=9999,this.navArrow.add(i);const n=new Wn(.5,1,4);n.rotateX(Math.PI/2);const o=new Q(n,t);o.position.z=.5,o.castShadow=!0,o.receiveShadow=!0,o.renderOrder=9999,this.navArrow.add(o),this.navArrow.position.set(0,1.7,-.3),this.navArrow.rotation.x=-.32,this.navArrow.visible=!1,this.carVisualContainer.add(this.navArrow)}initInput(){return ym.call(this)}initDebugVisuals(){return vm.call(this)}cycleCameraFocus(){return wm.call(this)}cycleCameraMode(){return Em.call(this)}getTargetGameplayCamera(){return bm.call(this)}initMinimap(){this.minimapCanvas=document.getElementById("minimap-canvas"),this.minimapCtx=this.minimapCanvas.getContext("2d"),this.minimapCanvas.width=140,this.minimapCanvas.height=140}createPerfHUD(){const t=document.createElement("div");t.id="perf-hud",t.style.position="absolute",t.style.top="10px",t.style.left="10px",t.style.backgroundColor="rgba(0, 0, 0, 0.85)",t.style.color="#00ffcc",t.style.fontFamily="monospace",t.style.fontSize="12px",t.style.padding="10px",t.style.borderRadius="5px",t.style.zIndex="99999",t.style.border="1px solid #00ffcc",t.style.pointerEvents="none",t.style.display="none",t.innerHTML=`
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
    `,document.body.appendChild(t),window.addEventListener("keydown",e=>{e.key.toLowerCase()==="p"&&(t.style.display=t.style.display==="none"?"block":"none")}),this.perfFpsEl=document.getElementById("perf-fps"),this.perfTotalEl=document.getElementById("perf-total"),this.perfWorldEl=document.getElementById("perf-world"),this.perfPhysicsEl=document.getElementById("perf-physics"),this.perfTrafficUpdateEl=document.getElementById("perf-traffic-update"),this.perfTrafficMeshEl=document.getElementById("perf-traffic-mesh"),this.perfCollisionsEl=document.getElementById("perf-collisions"),this.perfPlayerVisualsEl=document.getElementById("perf-player-visuals"),this.perfPursuitEl=document.getElementById("perf-pursuit"),this.perfRaceEl=document.getElementById("perf-race"),this.perfParticlesEl=document.getElementById("perf-particles"),this.perfRenderEl=document.getElementById("perf-render"),this.perfEyeEl=document.getElementById("perf-eye"),this.perfCallsEl=document.getElementById("perf-calls"),this.perfTrianglesEl=document.getElementById("perf-triangles"),this.perfGeometriesEl=document.getElementById("perf-geometries"),this.perfTexturesEl=document.getElementById("perf-textures"),this.perfShadersEl=document.getElementById("perf-shaders")}setupFeedbackUI(){const t=document.getElementById("btn-feedback-toggle"),e=document.getElementById("feedback-modal"),i=document.getElementById("btn-feedback-cancel"),n=document.getElementById("feedback-form"),o=document.getElementById("feedback-status"),a=()=>{this.inFeedbackMenu=!0,e.style.display="flex",n.reset(),o.textContent="",setTimeout(()=>n.querySelector("textarea").focus(),10)},r=()=>{this.inFeedbackMenu=!1,e.style.display="none",document.activeElement.blur()};t&&t.addEventListener("click",a),i&&i.addEventListener("click",r);const l=document.getElementById("btn-like-race"),c=document.getElementById("btn-dislike-race"),h=document.getElementById("quick-feedback-thanks"),d=u=>{fetch("https://formspree.io/f/xykqyobp",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({message:`Quick Feedback: User rated the ${this.race?this.race.mode:"race"} as ${u}`})}).catch(f=>console.error(f)),l&&(l.style.display="none"),c&&(c.style.display="none"),h&&(h.style.display="block")};l&&l.addEventListener("click",()=>d("LIKE")),c&&c.addEventListener("click",()=>d("DISLIKE")),window.addEventListener("keydown",u=>{u.key.toLowerCase()==="b"&&!this.inFeedbackMenu&&document.activeElement.tagName!=="INPUT"&&document.activeElement.tagName!=="TEXTAREA"?a():u.key==="Escape"&&this.inFeedbackMenu&&r()}),n&&n.addEventListener("submit",u=>{u.preventDefault();const f=new FormData(n);o.textContent="Sending...",o.style.color="#fff",fetch(n.action,{method:n.method,body:f,headers:{Accept:"application/json"}}).then(g=>{g.ok?(o.textContent="Thanks for your feedback!",o.style.color="#00ffcc",setTimeout(r,1500)):(o.textContent="Oops! There was a problem submitting your form",o.style.color="#ff1e1e")}).catch(g=>{o.textContent="Oops! There was a problem submitting your form",o.style.color="#ff1e1e"})})}precompileShaders(){const t=new Vt;this.scene.add(t);const e=[];this.world&&(this.world.asphaltMaterials&&e.push(...this.world.asphaltMaterials),this.world.concreteMat&&e.push(this.world.concreteMat),this.world.yellowLineMat&&e.push(this.world.yellowLineMat),this.world.whiteLineMat&&e.push(this.world.whiteLineMat),this.world.materials&&e.push(...this.world.materials),this.world.windowDetailedMat&&e.push(this.world.windowDetailedMat),this.world.doorMat&&e.push(this.world.doorMat),this.world.accessoryMat&&e.push(this.world.accessoryMat),this.world.trunkMat&&e.push(this.world.trunkMat),this.world.leafMat&&e.push(this.world.leafMat),this.world.leafCherryMat&&e.push(this.world.leafCherryMat),this.world.leafAutumnMat&&e.push(this.world.leafAutumnMat),this.world.streetlightPoleMat&&e.push(this.world.streetlightPoleMat),this.world.streetlightBulbMat&&e.push(this.world.streetlightBulbMat),this.world.ledGroundLightPoolMat&&e.push(this.world.ledGroundLightPoolMat),this.world.sodiumGroundLightPoolMat&&e.push(this.world.sodiumGroundLightPoolMat),this.world.storefrontGroundLightPoolMat&&e.push(this.world.storefrontGroundLightPoolMat),this.world.lightConeMatLED&&e.push(this.world.lightConeMatLED),this.world.lightConeMatSodium&&e.push(this.world.lightConeMatSodium),this.world.tlRedOnMat&&e.push(this.world.tlRedOnMat),this.world.tlRedOffMat&&e.push(this.world.tlRedOffMat),this.world.tlYellowOnMat&&e.push(this.world.tlYellowOnMat),this.world.tlYellowOffMat&&e.push(this.world.tlYellowOffMat),this.world.tlGreenOnMat&&e.push(this.world.tlGreenOnMat),this.world.tlGreenOffMat&&e.push(this.world.tlGreenOffMat),this.world.tlHousingMat&&e.push(this.world.tlHousingMat),this.world.benchWoodMat&&e.push(this.world.benchWoodMat),this.world.benchIronMat&&e.push(this.world.benchIronMat),this.world.phoneBoothFrameMat&&e.push(this.world.phoneBoothFrameMat),this.world.phoneBoothGlassMat&&e.push(this.world.phoneBoothGlassMat),this.world.phoneBoothScreenMat&&e.push(this.world.phoneBoothScreenMat),this.world.trashCanMat&&e.push(this.world.trashCanMat),this.world.trashCanLidMat&&e.push(this.world.trashCanLidMat),this.world.dumpsterMat&&e.push(this.world.dumpsterMat),this.world.cardboardMat&&e.push(this.world.cardboardMat),this.world.trashBagMat&&e.push(this.world.trashBagMat),this.world.woodPoleMat&&e.push(this.world.woodPoleMat),this.world.hydrantRedMat&&e.push(this.world.hydrantRedMat),this.world.hydrantCapMat&&e.push(this.world.hydrantCapMat),this.world.newspaperBodyMat&&e.push(this.world.newspaperBodyMat),this.world.newspaperGlassMat&&e.push(this.world.newspaperGlassMat),this.world.newspaperPaperMat&&e.push(this.world.newspaperPaperMat),this.world.billboardColors&&this.world.billboardColors.forEach(o=>{e.push(new zt({color:1118481,emissive:o,emissiveIntensity:4}))})),this.playerTaillightMat&&e.push(this.playerTaillightMat),this.particlePool&&this.particlePool.length>0&&e.push(this.particlePool[0].mat),this.smokePool&&this.smokePool.length>0&&e.push(this.smokePool[0].mat),this.skidMaterials&&e.push(...this.skidMaterials),this.debrisPool&&this.debrisPool.length>0&&e.push(this.debrisPool[0].material);const i=new H(.1,.1,.1);e.forEach(o=>{const a=new Q(i,o);t.add(a)}),["sports","pickup","van","cop","sedan"].forEach(o=>{const{carGroup:a}=this.createVoxelCarMesh(1719692,o);t.add(a)}),this.renderer.compile(this.scene,this.camera),t.traverse(o=>{o.geometry&&o.geometry.dispose()}),this.scene.remove(t),i.dispose()}getParticleMaterial(t,e){return Pm.call(this,t,e)}getSmokeMaterial(t,e){return Lm.call(this,t,e)}getModeColor(t){switch(t){case"sprint":return{hex:12592895,css:"#c026ff",glow:"rgba(192, 38, 255, 0.9)"};case"circuit":return{hex:16719390,css:"#ff1e1e",glow:"rgba(255, 30, 30, 0.9)"};case"autocross":return{hex:58879,css:"#00e5ff",glow:"rgba(0, 229, 255, 0.9)"};case"unordered":return{hex:16762368,css:"#ffc600",glow:"rgba(255, 198, 0, 0.9)"};default:return{hex:16719390,css:"#ff1e1e",glow:"rgba(255, 30, 30, 0.9)"}}}getEventTextMaterial(t,e){const i=t+"_"+e;if(this._eventTextMaterials||(this._eventTextMaterials={}),this._eventTextMaterials[i])return this._eventTextMaterials[i];const n=document.createElement("canvas");n.width=2048,n.height=256;const o=n.getContext("2d");o.clearRect(0,0,n.width,n.height),o.font='italic 900 130px "Barlow Condensed", "Outfit", sans-serif',o.textAlign="center",o.textBaseline="middle",o.fillStyle="#ffffff";const a=this.getModeColor(e);o.shadowColor=a.glow,o.shadowBlur=20,o.fillText(t.toUpperCase(),n.width/2,n.height/2);const r=new Re(n);r.minFilter=De;const l=new $e({map:r,transparent:!0,depthTest:!0,depthWrite:!1});return this._eventTextMaterials[i]=l,l}initParticles(){return Im.call(this)}initCheckpointSmoke(){return Dm.call(this)}initSkidmarks(){return Um.call(this)}spawnSkidmarkSegment(t,e){return Nm.call(this,t,e)}spawnParticles(t,e,i=8947848,n=1,o=!1,a=!1){return zm.call(this,t,e,i,n,o,a)}spawnCheckpointSmoke(t,e=16755258,i=1,n=1){return Fm.call(this,t,e,i,n)}updateParticles(t){return Bm.call(this,t)}updateCheckpointSmoke(t){return Gm.call(this,t)}initDebris(){return Om.call(this)}spawnDebris(t,e,i,n=5){return km.call(this,t,e,i,n)}updateDebris(t){return Vm.call(this,t)}checkBreakablesCollision(t){return Km.call(this,t)}handleCrashDamage(t,e,i,n){return q0.call(this,t,e,i,n)}checkSlipstream(t=.016){return Jm.call(this,t)}checkNearMisses(t){return Qm.call(this,t)}updateDriftNitro(t){return tg.call(this,t)}initNotifications(){return Xm.call(this)}showNotification(t,e,i=2e3){return qm.call(this,t,e,i)}removeNotification(t){return Ym.call(this,t)}showStuntNotification(t,e){return $m.call(this,t,e)}initRaceHUD(){return Zm.call(this)}buildAIMeshes(){this.clearAIMeshes(),this.race.aiRacers.forEach(t=>{const e=new Vt,{carGroup:i,wheels:n}=this.createVoxelCarMesh(t.colorHex,"sports"),o=new Ne(this.nitroSpriteMat);o.position.set(-.6,.2,-2.1),o.scale.set(.001,.001,.001),i.add(o),t.nitroLeftSprite=o;const a=new Ne(this.nitroSpriteMat);a.position.set(.6,.2,-2.1),a.scale.set(.001,.001,.001),i.add(a),t.nitroRightSprite=a;const r=new fe({color:t.colorHex,depthTest:!1,depthWrite:!1,transparent:!0,opacity:.6}),l=new Wn(.35,.7,4);l.rotateX(Math.PI);const c=new Q(l,r);c.position.set(0,1.9,0),c.renderOrder=999,i.add(c),t.indicatorMesh=c,e.add(i),this.scene.add(e),t.meshGroup=e,t.wheels=n,t.prevLeftWheel=null,t.prevRightWheel=null,t.smokeTimer=0,this.aiMeshes.push(e)})}clearAIMeshes(){this.race.aiRacers.forEach(t=>{t.leftTrail&&(t.leftTrail.destroy(),t.leftTrail=null),t.rightTrail&&(t.rightTrail.destroy(),t.rightTrail=null)}),this.aiMeshes.forEach(t=>{t.traverse(e=>{e.geometry&&e.geometry.dispose()}),this.scene.remove(t)}),this.aiMeshes=[]}startRace(t,e,i,n){let o,a;if(e!==void 0&&i!==void 0){const h=Array.from(this.world.roadColumns),d=Array.from(this.world.roadRows),u=[];if(h.forEach(f=>{d.forEach(g=>{const M=f*this.world.tileSize,m=g*this.world.tileSize,p=Math.hypot(M-e,m-i);p>=200&&p<=800&&u.push({x:M,z:m,dist:p})})}),u.length>0){const f=u[Math.floor(Math.random()*u.length)];o=f.x,a=f.z}else{const f=Math.random()*Math.PI*2;o=e+Math.cos(f)*320,a=i+Math.sin(f)*320}}else{const c=this.world.tileSize*4;o=(Math.floor(Math.random()*11)-5)*c,a=(Math.floor(Math.random()*11)-5)*c}const r=new P(o,0,a);this._raceStartX=o,this._raceStartZ=a,this.race.startRace(t,this.world,r,0,n),this.pursuit&&this.pursuit.cancelPursuit(),this.physics&&(this.physics.nitroLevel=this.physics.maxNitro),this.hudStatsEl.style.display="none",this.cancelBtnEl.style.display="none",this.statsModeEl.textContent=t.toUpperCase(),this.cinematicManager?this.cinematicManager.start(t):(this.hudStatsEl.style.display="flex",this.cancelBtnEl.style.display="block",this.showBanner("RACE STARTED","Follow the arrow!"),this.rebuildCheckpointBeacons()),setTimeout(()=>{this.traffic&&(!this.cinematicManager||this.cinematicManager.state==="none")&&(this.traffic.clear(),this.traffic.maxVehicles=18,this.traffic.init(this.physics.position,this.world)),this.clock.getDelta()},0)}cancelRace(){this.race.active=!1,this.pursuit&&this.pursuit.cancelPursuit(),this.hudStatsEl.style.display="none",this.cancelBtnEl.style.display="none",this.navArrow.visible=!1,this.clearCheckpointBeacons(),this.clearAIMeshes(),this.showBanner("RACE CANCELLED","Free Roam Mode"),setTimeout(()=>{this.traffic&&(this.traffic.clear(),this.traffic.maxVehicles=30,this.traffic.init(this.physics.position,this.world)),this.clock.getDelta()},0),this.race.selectNewWorldEvent(this.world,this.physics.position)}clearCheckpointBeacons(){for(;this.checkpointVisualsGroup.children.length>0;){const t=this.checkpointVisualsGroup.children[0];t.traverse(e=>{e.geometry&&e.geometry.dispose()}),this.checkpointVisualsGroup.remove(t)}}rebuildCheckpointBeacons(){if(this.clearCheckpointBeacons(),!this.race.active)return;const t=this.race.checkpoints,e=this.race.mode,i=t.length;t.forEach((n,o)=>{let a=!1;if(e==="unordered"?a=!this.race.unorderedCleared.has(o):a=o===this.race.currentIndex,!a)return;const r=this.world&&typeof this.world.getGroundHeight=="function"?this.world.getGroundHeight(n.x,n.z):.5,l=new Vt;l.position.set(n.x,r-.4,n.z),o===i-1||this.getModeColor(e).hex;let h=null;if(e!=="unordered"&&(o<i-1?h=t[o+1]:e==="circuit"&&this.race.lapCurrent<this.race.lapsTotal&&(h=t[0])),h!==null){const d=h.x-n.x,u=h.z-n.z,f=Math.atan2(d,u),g=new Vt;g.position.set(0,3.5,0),g.rotation.y=f;const M=new Vt;M.rotation.x=-.32;const m=new zt({color:16757530,emissive:16757530,emissiveIntensity:.7,roughness:.5,metalness:.2,depthTest:!0}),p=new Q(new H(.8,.4,3.2),m);p.position.z=.8,p.castShadow=!0,M.add(p);const A=new Wn(1.2,2.2,4);A.rotateX(Math.PI/2);const x=new Q(A,m);x.position.z=2.8,x.castShadow=!0,M.add(x),g.add(M),l.add(g)}this.checkpointVisualsGroup.add(l)})}showBanner(t,e,i=2e3){return Wm.call(this,t,e,i)}updateCamera(t=.016){return Sm.call(this,t)}updateMinimap(){return jm.call(this)}formatTime(t){return Hm.call(this,t)}animate(){const t=performance.now();requestAnimationFrame(()=>this.animate());const e=Math.min(this.clock.getDelta(),.05),i=1/60,n=5;this.physicsAccumulator===void 0&&(this.physicsAccumulator=0),this.prevPhysicsPosition===void 0&&(this.prevPhysicsPosition=this.physics.position.clone()),this.prevPhysicsHeading===void 0&&(this.prevPhysicsHeading=this.physics.heading||0),this.renderPhysicsPosition===void 0&&(this.renderPhysicsPosition=this.physics.position.clone()),this.renderPhysicsHeading===void 0&&(this.renderPhysicsHeading=this.physics.heading||0);const o=performance.now();this.slowMoTimer===void 0&&(this.slowMoTimer=0),this.crashShake===void 0&&(this.crashShake=0),this.slowMoTimer>0&&(this.slowMoTimer-=e),this.crashShake>0&&(this.crashShake*=Math.exp(-6*e),this.crashShake<.01&&(this.crashShake=0));const a=e;if(this.cinematicManager&&this.cinematicManager.update(a),this.inMainMenu)if(this.menuTransitionTime>0){this.menuTransitionTime+=e;const S=Math.min(1,this.menuTransitionTime/this.menuTransitionDuration),W=S*S*(3-2*S);if(!this.menuTransitionStartPos){this.menuTransitionStartPos=this.camera.position.clone();const E=new P(0,0,-1).applyQuaternion(this.camera.quaternion);this.menuTransitionStartLookAt=this.menuTransitionStartPos.clone().addScaledVector(E,20)}const F=this.getTargetGameplayCamera(),et=this.menuTransitionStartPos.clone().lerp(F.pos,W),k=this.menuTransitionStartLookAt.clone().lerp(F.lookAt,W),v=50+(F.fov-50)*W;this.cameraOverride={pos:et,lookAt:k,fov:v},S>=1&&(this.inMainMenu=!1,this.cameraOverride=null,this.menuTransitionStartPos=null,this.menuTransitionStartLookAt=null,this.hudLayerEl&&(this.hudLayerEl.style.display="flex"),this.debugMenuEnabled&&this.racePanelEl&&(this.racePanelEl.style.display="flex"),this.clock.getDelta())}else{const S=Date.now()*1e-4,W=(this.menuCameraBaseOffset-S%40)*this.menuCameraDir,F=80,et=.5;let k=0,v=0,E=0,N=0;this.menuCameraAxis==="z"?(k=0,v=W,E=0,N=v-80*this.menuCameraDir):(v=0,k=W,E=k-80*this.menuCameraDir,N=0),this.cameraOverride={pos:new P(k,F,v),lookAt:new P(E,et,N),fov:48}}if(!this.inMainMenu&&!this.race.active&&this.physics.position&&(this.eventSpawnTimer===void 0&&(this.eventSpawnTimer=0),this.eventSpawnTimer+=e,this.eventSpawnTimer>.16)){this.eventSpawnTimer=0;const S=this.physics.position.x,W=this.physics.position.z,F=90,et=Math.round(S/this.world.tileSize),k=Math.round(W/this.world.tileSize);if(this.race.worldEvents?this.race.worldEvents=this.race.worldEvents.filter(v=>Math.hypot(v.x-S,v.z-W)<=1200):this.race.worldEvents=[],this.race.worldEvents.length<F&&this.world)for(let E=0;E<20&&this.race.worldEvents.length<F;E++){const N=6+Math.floor(Math.random()*20),q=Math.floor(Math.random()*(N*2+1))-N,Y=Math.floor(Math.random()*(N*2+1))-N;if(q===0&&Y===0)continue;const tt=et+q,nt=k+Y,ht=tt*this.world.tileSize,ft=nt*this.world.tileSize,vt=Math.hypot(ht-S,ft-W);if((this.world.roadColumns&&this.world.roadColumns.has(tt)||this.world.roadRows&&this.world.roadRows.has(nt))&&vt>=120&&vt<=1800&&!this.race.worldEvents.some(It=>It.x===ht&&It.z===ft)){const It=["sprint","circuit"][Math.floor(Math.random()*2)];this.race.worldEvents.push({x:ht,z:ft,mode:It,laps:It==="circuit"?Math.floor(Math.random()*3)+2:1,checkpoints:Math.floor(Math.random()*15)+10,racers:Math.floor(Math.random()*5)+3})}}}let r=!1,l=null,c=1/0;if(!this.inMainMenu&&!this.race.active&&this.race.worldEvents&&this.race.worldEvents.length>0&&(this.race.worldEvents.forEach(S=>{const W=this.physics.position.x-S.x,F=this.physics.position.z-S.z,et=Math.hypot(W,F);et<22&&et<c&&(c=et,l=S,r=!0)}),r&&l)){if(this.eventPromptEl){if(!this.eventPromptActive){this.eventPromptActive=!0;const S=this.world&&typeof this.world.getGroundHeight=="function"?this.world.getGroundHeight(l.x,l.z):.5,W=new P(l.x,S+5,l.z);W.project(this.camera);let F=window.innerWidth/2,et=window.innerHeight/2;W.z<1&&(F=(W.x*.5+.5)*window.innerWidth,et=(-(W.y*.5)+.5)*window.innerHeight),this.eventPromptEl.style.transition="none",this.eventPromptEl.style.left=`${F}px`,this.eventPromptEl.style.top=`${et}px`,this.eventPromptEl.classList.remove("docked","fade-out"),this.eventPromptEl.style.display="flex",setTimeout(()=>{this.eventPromptEl.style.transition="left 0.7s cubic-bezier(0.2, 0.8, 0.2, 1), top 0.7s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.5s ease-out",this.eventPromptEl.style.left="50%",this.eventPromptEl.style.top="72%",this.eventPromptEl.classList.add("docked")},10)}if(this.eventPromptModeEl){this.eventPromptModeEl.textContent=`${l.mode.toUpperCase()} EVENT`;const S=this.getModeColor(l.mode).css;this.eventPromptModeEl.style.color="#ffffff",this.eventPromptEl.style.borderLeftColor=S}if(this.eventPromptStatsEl){const S=l.laps>1?`LAPS: ${l.laps} • `:"";this.eventPromptStatsEl.textContent=`${S}CHECKPOINTS: ${l.checkpoints} • OPPONENTS: ${l.racers}`}}(this.keys.f||this.keys.keyf)&&(this.keys.f=!1,this.keys.keyf=!1,this.eventPromptEl&&(this.eventPromptEl.style.display="none"),this.eventPromptActive=!1,this.startRace(l.mode,l.x,l.z,l))}!r&&this.eventPromptEl&&this.eventPromptEl.style.display!=="none"&&!this.eventPromptEl.classList.contains("fade-out")&&(this.eventPromptEl.classList.add("fade-out"),this.eventPromptActive=!1,setTimeout(()=>{!this.eventPromptActive&&this.eventPromptEl&&(this.eventPromptEl.style.display="none")},500));let h=this.physics;if(this.inMainMenu||this.cinematicManager&&this.cinematicManager.state!=="none"){let S=this.camHeading||0,W=this.camera.position;if(this.cameraOverride){W=this.cameraOverride.pos;const F=this.cameraOverride.lookAt.x-this.cameraOverride.pos.x,et=this.cameraOverride.lookAt.z-this.cameraOverride.pos.z;S=Math.atan2(F,et)}h={position:W,heading:S}}else if(this.debugFocusAI&&this.race&&this.race.aiRacers){const S=this.race.aiRacers.find(W=>W.id===this.debugFocusAI);S&&(h=S)}const d=[];this._eventSprites||(this._eventSprites=[]),!this.race.active&&this.race.worldEvents&&this.race.worldEvents.forEach(S=>{const W=S.x-h.position.x,F=S.z-h.position.z,et=W*W+F*F;let k=this._eventSprites.find(v=>v.evt===S);if(et<260*260){Math.random()<.55&&this.spawnCheckpointSmoke(S,this.getModeColor(S.mode).hex,1.2,1.2);const v=this.world&&typeof this.world.getGroundHeight=="function"?this.world.getGroundHeight(S.x,S.z):.5;if(d.push({x:S.x,y:v+3.6,z:S.z,intensity:12,color:this.getModeColor(S.mode).hex}),k)k.sprite.parent||this.scene.add(k.sprite);else{const ht=S.mode?S.mode+" event":"event",ft=this.getEventTextMaterial(ht,S.mode).clone(),vt=new Ne(ft);this.scene.add(vt),k={evt:S,sprite:vt},this._eventSprites.push(k)}const E=Math.sqrt(et),N=.4+.6*Math.min(1,Math.pow(E/200,.7));k.sprite.scale.set(64*N,8*N,1),k.sprite.position.set(S.x,v+5,S.z);const q=new P(S.x-this.camera.position.x,v+5-this.camera.position.y,S.z-this.camera.position.z).normalize(),Y=new P;this.camera.getWorldDirection(Y);const tt=q.dot(Y),nt=Math.min(1,Math.max(0,(tt+.2)/.3));k.sprite.material.opacity=nt,k.sprite.visible=!(r&&l===S)&&nt>0,d.push({x:S.x,y:v+3.6,z:S.z,intensity:15,color:16719390})}else k&&(k.sprite.visible=!1)}),this._eventSprites.length>0&&(this._eventSprites=this._eventSprites.filter(S=>!(this.race.worldEvents&&this.race.worldEvents.includes(S.evt))||this.race.active?(S.sprite.parent&&this.scene.remove(S.sprite),!1):!0)),this.race&&this.race.active&&this.race.checkpoints&&this.race.checkpoints.forEach((S,W)=>{let F=!1;if(this.race.mode==="unordered"?F=!this.race.unorderedCleared.has(W):F=W===this.race.currentIndex,F){const k=this.world&&typeof this.world.getGroundHeight=="function"?this.world.getGroundHeight(S.x,S.z):.5;d.push({x:S.x,y:k+3.6,z:S.z,intensity:12,color:16757530})}}),me.set(Math.sin(this.physics.heading),0,Math.cos(this.physics.heading)),oe.set(Math.cos(this.physics.heading),0,-Math.sin(this.physics.heading));const u=this.physics.position;Ee.copy(u).addScaledVector(me,2.35).addScaledVector(oe,-.65),this.leftSpotTarget.position.copy(Ee).addScaledVector(me,15),Ee.copy(u).addScaledVector(me,2.35).addScaledVector(oe,.65),this.rightSpotTarget.position.copy(Ee).addScaledVector(me,15);const f=this.keys.s||this.keys.arrowdown;if(f?(this.tailLight.intensity=5.5,this.playerTaillightMat.color.setHex(16724787)):(this.tailLight.intensity=1.2,this.playerTaillightMat.color.setHex(11145489)),this.physics.gear==="R"?(this.reverseLightPoint.intensity=3,this.reverseLightL.visible=!0,this.reverseLightR.visible=!0):(this.reverseLightPoint.intensity=0,this.reverseLightL.visible=!1,this.reverseLightR.visible=!1),this.traffic.vehicles.forEach(S=>{if(S.position.distanceTo(h.position)>130)return;me.set(Math.sin(S.heading),0,Math.cos(S.heading)),oe.copy(S.position).addScaledVector(me,3.5),Ee.copy(this.camera.position).sub(oe).normalize();const F=me.dot(Ee),et=Math.pow(Math.max(0,F),2.5);et<=.01||d.push({x:oe.x,y:.4,z:oe.z,intensity:8.5*(S.opacity!==void 0?S.opacity:1)*et,color:16776404})}),this.race&&this.race.active&&this.race.aiRacers&&this.race.aiRacers.forEach(S=>{if(S.meshGroup){if(S.position.distanceTo(h.position)>130)return;me.set(Math.sin(S.heading),0,Math.cos(S.heading)),oe.copy(S.position).addScaledVector(me,3.5),Ee.copy(this.camera.position).sub(oe).normalize();const F=me.dot(Ee),et=Math.pow(Math.max(0,F),2.5);et>.01&&d.push({x:oe.x,y:.4,z:oe.z,intensity:8.5*et,color:16776404}),S.isBoosting&&(oe.set(0,.3,-2.15).applyMatrix4(S.meshGroup.matrixWorld),d.push({x:oe.x,y:oe.y,z:oe.z,intensity:6+Math.random()*2,color:61695}))}}),!this.inMainMenu&&this.pursuit&&(!this.cinematicManager||this.cinematicManager.state==="none")){const S=this.physics.velocity.length(),W=!!(this.keys.w||this.keys.arrowup||this.keys.s||this.keys.arrowdown||this.keys.a||this.keys.arrowleft||this.keys.d||this.keys.arrowright);this.pursuit.update(e,this.physics.position,S,this.world,this.traffic,this.race.navGraph||null,this.race.active?this.race.aiRacers:[],W);let F=!1,et=1/0;if(this.pursuit.active&&this.pursuit.cops.length>0){const k=this.physics.position,v=new P(Math.sin(this.physics.heading),0,Math.cos(this.physics.heading));for(let E=0;E<this.pursuit.cops.length;E++){const q=this.pursuit.cops[E].position.clone().sub(k),Y=q.length();Y<90&&v.dot(q.normalize())<-.15&&(F=!0,Y<et&&(et=Y))}}if(F){this.copFlashEl.style.display="block";const k=Math.floor(Date.now()/300)%2===0,v=Math.max(0,Math.min(1,1-(et-10)/80)),E=5+v*17;this.copFlashEl.style.height=`${E}vh`,k?this.copFlashEl.classList.add("flash-blue"):this.copFlashEl.classList.remove("flash-blue");const N=k?.35+v*.65:.05+v*.25;this.copFlashEl.style.opacity=N}else this.copFlashEl.style.opacity=0,this.copFlashEl.style.display="none";if(this.pursuit.active){if(this.heatHudEl.style.display="flex",this.heatHudValueEl&&(this.heatHudValueEl.textContent=this.pursuit.heatLevel),this.heatHudLosEl&&(this.pursuit.canSeePlayer?(this.heatHudLosEl.textContent="SPOTTED",this.heatHudLosEl.className="heat-hud-los spotted"):(this.heatHudLosEl.textContent="HIDDEN",this.heatHudLosEl.className="heat-hud-los hidden")),this.heatFillEl){const k=(this.pursuit.heatProgress||0)*100;this.heatFillEl.style.width=`${k}%`}}else this.heatHudEl.style.display="none";if(this.pursuit.bustProgress>0?(this.bustedContainerEl.style.display="flex",this.bustedFillEl.style.width=`${this.pursuit.bustProgress*100}%`):this.bustedContainerEl.style.display="none",this.noiseOverlayEl){let k=.05;if(this.pursuit){if(this.pursuit.active){k+=(this.pursuit.heatLevel||1)*.012;let v=1/0;if(this.pursuit.cops.forEach(E=>{const N=this.physics.position.distanceTo(E.position);N<v&&(v=N)}),v<60){const E=1-v/60;k+=E*.08}}this.pursuit.bustProgress>0&&(k+=this.pursuit.bustProgress*.22)}k=Math.min(.4,k),this.noiseOverlayEl.style.opacity=k}this.pursuit.cops.forEach(k=>{if(k.meshGroup){const v=k.position.distanceTo(h.position);this.updateVehicleLOD(k,v,k.opacity);const E=k.meshGroup.getObjectByName("headlightPool");if(E&&(E.material.opacity=.35*k.opacity),k._lastLOD||(this.updateHeadlightFlares(k.meshGroup,k.heading),this.deformHeadlightPoolToTerrain(k.meshGroup)),v<=130){me.set(Math.sin(k.heading),0,Math.cos(k.heading)),oe.copy(k.position).addScaledVector(me,2.3),Ee.copy(this.camera.position).sub(oe).normalize();const nt=me.dot(Ee),ht=Math.pow(Math.max(0,nt),2.5);ht>.01&&d.push({x:oe.x,y:.4,z:oe.z,intensity:8*k.opacity*ht,color:16776404}),d.push({x:k.position.x,y:1.6,z:k.position.z,intensity:15*k.opacity,color:k.sirenState?16711714:8959})}const N=Math.cos(k.heading+Math.PI/2),q=Math.sin(k.heading+Math.PI/2),Y=Math.abs(k.velocity.x*N+k.velocity.z*q);if(k.velocity&&(Y>3.2||k.velocity.lengthSq()>300&&Math.abs(k.angularVelocity)>1)){const nt=new P(-.95,.1,-1.3).applyMatrix4(k.meshGroup.matrixWorld),ht=new P(.95,.1,-1.3).applyMatrix4(k.meshGroup.matrixWorld),ft=k.velocity.clone().negate().normalize();ft.y=.3,ft.normalize();const vt=this.world.isWetAt(nt.x,nt.z),Mt=this.world.isWetAt(ht.x,ht.z);vt||this.spawnParticles(nt,ft,11184810,1),Mt||this.spawnParticles(ht,ft,11184810,1),k.prevLeftWheel&&this.spawnSkidmarkSegment(k.prevLeftWheel,nt),k.prevRightWheel&&this.spawnSkidmarkSegment(k.prevRightWheel,ht),k.prevLeftWheel=nt.clone(),k.prevRightWheel=ht.clone()}else k.prevLeftWheel=null,k.prevRightWheel=null}}),this.pursuit.parkedCops.forEach(k=>{if(k.meshGroup){const v=k.position.distanceTo(h.position);this.updateVehicleLOD(k,v,k.opacity);const E=k.meshGroup.getObjectByName("headlightPool");if(E&&(E.material.opacity=.35*k.opacity),k._lastLOD||(this.updateHeadlightFlares(k.meshGroup,k.heading),this.deformHeadlightPoolToTerrain(k.meshGroup)),v<=130){me.set(Math.sin(k.heading),0,Math.cos(k.heading)),oe.copy(k.position).addScaledVector(me,2.3),Ee.copy(this.camera.position).sub(oe).normalize();const N=me.dot(Ee),q=Math.pow(Math.max(0,N),2.5);q>.01&&d.push({x:oe.x,y:.4,z:oe.z,intensity:8*k.opacity*q,color:16776404}),k.alerted&&d.push({x:k.position.x,y:1.6,z:k.position.z,intensity:15*k.opacity,color:k.sirenState?16711714:8959})}}}),this.pursuit.roadblocks&&this.pursuit.roadblocks.forEach(k=>{k.meshGroup&&k.meshGroup.traverse(v=>{if(v.isGroup&&v.getObjectByName("leftHeadlightSprite")){v.getWorldQuaternion(un),hl.setFromQuaternion(un,"YXZ");const E=hl.y;this.updateHeadlightFlares(v,E),v.getWorldPosition(Ee);const N=Ee.distanceTo(h.position);let q=1;if(N>120)q=0;else if(N>80){const Y=(N-80)/40;q=1-Y*Y*(3-2*Y)}if(q>0){me.set(Math.sin(E),0,Math.cos(E)),oe.copy(Ee).addScaledVector(me,2.3),ll.copy(this.camera.position).sub(oe).normalize();const Y=me.dot(ll),tt=Math.pow(Math.max(0,Y),2.5);tt>.01&&d.push({x:oe.x,y:.4,z:oe.z,intensity:8*q*tt,color:16776404});const nt=Math.floor(Date.now()/250)%2===0;d.push({x:Ee.x,y:1.6,z:Ee.z,intensity:15*q,color:nt?16711714:8959})}}})})}if(this.physics.isScraping){const S=this.physics.position.clone();S.addScaledVector(this.physics.scrapeNormal,-.9),d.push({x:S.x,y:.45+this.world.getBaseHeight(S.x,S.z),z:S.z,intensity:12,color:16755200})}if(this.physics.isDrifting){const S=new P(-.95,.22,-1.3).applyMatrix4(this.carVisualContainer.matrixWorld),W=new P(.95,.22,-1.3).applyMatrix4(this.carVisualContainer.matrixWorld);d.push({x:S.x,y:.25+this.world.getBaseHeight(S.x,S.z),z:S.z,intensity:6.5,color:16729088}),d.push({x:W.x,y:.25+this.world.getBaseHeight(W.x,W.z),z:W.z,intensity:6.5,color:16729088})}this.perf.pursuit=performance.now()-o;const M=performance.now();if(this.world.update(h.position.x,h.position.z,h.heading,d,a),this.perf.world=performance.now()-M,this.isInitialLoad){const W=this.world.loadedTiles.size,F=Math.min(100,Math.floor(W/140*100)),et=document.getElementById("loading-bar");if(et&&(et.style.width=`${F}%`),W>=140||F===100){this.isInitialLoad=!1;const k=document.getElementById("loading-screen");k&&(k.style.opacity="0",setTimeout(()=>{k.style.display="none"},1e3))}}window.gameTime===void 0&&(window.gameTime=0),window.gameTime+=a;const m=performance.now();this.physicsAccumulator+=a;let p=0;const A=this.cinematicManager&&this.cinematicManager.state!=="none";for(;this.physicsAccumulator>=i&&p<n;){if(this.prevPhysicsPosition.copy(this.physics.position),this.prevPhysicsHeading=this.physics.heading||0,this.inMainMenu||A)this.physics.speed=0,this.physics.velocity.set(0,0,0),this.physics.angularVelocity=0;else{const S=this.inFeedbackMenu?{}:this.keys;this.physics.update(i,S,this.world)}this.physicsAccumulator-=i,p++}p===n&&(this.physicsAccumulator=Math.min(this.physicsAccumulator,i));const x=Math.min(1,this.physicsAccumulator/i);this.renderPhysicsPosition.copy(this.prevPhysicsPosition).lerp(this.physics.position,x);let L=(this.physics.heading||0)-this.prevPhysicsHeading;if(L>Math.PI&&(L-=Math.PI*2),L<-Math.PI&&(L+=Math.PI*2),this.renderPhysicsHeading=this.prevPhysicsHeading+L*x,this.physics.justCrashed){const S=this.physics.lastWallImpactSpeed,W=this.physics.lastWallImpactNormal,F=this.physics.position.clone().addScaledVector(W,-1.8);F.y=.4+this.world.getBaseHeight(F.x,F.z);const et=W.clone().multiplyScalar(S);this.handleCrashDamage(this.carVisualContainer,F,S,et),this.spawnDebris(F,W,1719692,Math.min(10,Math.floor(S*.45))),S>10&&(this.slowMoTimer=.28,this.crashShake=Math.min(.85,S*.045)),this.physics.justCrashed=!1}this.physics.gear!==this.physics.prevGear&&(this.physics.justUpshifted&&(this.gearShiftPunch=1),this.physics.prevGear=this.physics.gear),this.perf.physics=performance.now()-m;const T=performance.now(),_=performance.now();if(this.traffic){const S=this.physics.velocity.length(),W=this.race.active?16:30;let F=1;S>25&&(F=Math.max(.7,1-(S-25)/100)),this.traffic.maxVehicles=Math.round(W*F)}this.traffic.update(a,h.position,h.heading,this.race.active?this.race.aiRacers:[],this.camera,this.world,this.pursuit?this.pursuit.roadblocks:[],this.pursuit?this.pursuit.heatLevel:0,this.pursuit?this.pursuit.cops.concat(this.pursuit.parkedCops||[]):[]),this.perf.trafficUpdate=performance.now()-_;const R=performance.now();this.traffic.vehicles.forEach(S=>{if(!S.meshGroup){const{carGroup:N,wheels:q}=this.createVoxelCarMesh(S.colorHex,S.type);if(S.type==="cab"){const Y=new Q(new H(.5,.2,.8),new fe({color:16755200}));Y.position.set(0,1.1,-.3),N.add(Y)}this.scene.add(N),S.meshGroup=N,S.wheels=q}S.meshGroup.position.copy(S.position);const W=S.position.distanceTo(h.position);S._frameCounter||(S._frameCounter=0),S._frameCounter++;const et=!(W>90)||S._frameCounter%3===0;if(et){this.world.alignMeshToTerrain(S.meshGroup,S.position,S.heading,S.isAirborne,a),(S.roll||S.pitch)&&(un.setFromAxisAngle(me.set(0,0,1),S.roll||0),cl.setFromAxisAngle(oe.set(1,0,0),S.pitch||0),S.meshGroup.quaternion.multiply(un).multiply(cl));const N=S.opacity!==void 0?S.opacity:1;this.updateVehicleLOD(S,W,N),S._lastLOD||(this.updateHeadlightFlares(S.meshGroup,S.heading),this.deformHeadlightPoolToTerrain(S.meshGroup))}const k=S.meshGroup.getObjectByName("headlightPool");if(k&&(k.material.opacity=.35*(S.opacity!==void 0?S.opacity:1)),et){const N=S.speed/.42*a;S.wheels.forEach(q=>{q.children[0].rotation.x+=N,q.children[1].rotation.x+=N})}const v=S.speed;if(S.splashTimer||(S.splashTimer=0),S.splashTimer-=a,v>3&&(S.opacity===void 0||S.opacity>.8)&&S.splashTimer<=0){const N=new P(-.95,.1,-1.3).applyMatrix4(S.meshGroup.matrixWorld),q=new P(.95,.1,-1.3).applyMatrix4(S.meshGroup.matrixWorld),Y=this.world.isWetAt(N.x,N.z),tt=this.world.isWetAt(q.x,q.z);if(Y||tt){S.splashTimer=.1;const nt=new P(-Math.sin(S.heading),.55,-Math.cos(S.heading)).normalize(),ht=Math.min(4,Math.floor(v*.2));Y&&ht>0&&this.spawnParticles(N,nt,13426158,ht,!0),tt&&ht>0&&this.spawnParticles(q,nt,13426158,ht,!0)}}if(S.impactVelocity&&S.impactVelocity.lengthSq()>9){const N=new P(-.95,.1,-1.3).applyMatrix4(S.meshGroup.matrixWorld),q=new P(.95,.1,-1.3).applyMatrix4(S.meshGroup.matrixWorld),Y=S.impactVelocity.clone().negate().normalize();Y.y=.3,Y.normalize();const tt=this.world.isWetAt(N.x,N.z),nt=this.world.isWetAt(q.x,q.z);tt||this.spawnParticles(N,Y,11184810,1),nt||this.spawnParticles(q,Y,11184810,1),S.prevLeftWheel&&this.spawnSkidmarkSegment(S.prevLeftWheel,N),S.prevRightWheel&&this.spawnSkidmarkSegment(S.prevRightWheel,q),S.prevLeftWheel=N.clone(),S.prevRightWheel=q.clone()}else S.prevLeftWheel=null,S.prevRightWheel=null}),this.traffic&&this.traffic.parkedVehicles&&this.traffic.parkedVehicles.forEach(S=>{if(!S.meshGroup){const{carGroup:v,wheels:E}=this.createVoxelCarMesh(S.colorHex,S.type);if(S.type==="cab"){const Y=new Q(new H(.5,.2,.8),new fe({color:16755200}));Y.position.set(0,1.1,-.3),v.add(Y)}const N=v.getObjectByName("leftHeadlightSprite"),q=v.getObjectByName("rightHeadlightSprite");N&&(N.visible=!1),q&&(q.visible=!1),this.scene.add(v),S.meshGroup=v,S.wheels=E}const W=S.position.distanceTo(h.position),F=S.opacity!==void 0?S.opacity:1;if(this.updateVehicleLOD(S,W,F),S.meshGroup.position.copy(S.position),this.world.alignMeshToTerrain(S.meshGroup,S.position,S.heading,S.isAirborne,a),S.roll||S.pitch){const v=new Ie().setFromAxisAngle(new P(0,0,1),S.roll||0),E=new Ie().setFromAxisAngle(new P(1,0,0),S.pitch||0);S.meshGroup.quaternion.multiply(v).multiply(E)}const et=S.meshGroup.getObjectByName("headlightPool");if(et&&(et.material.opacity=0),S.impactVelocity.lengthSq()>.1){const v=S.impactVelocity.length(),E=v/.42*a;S._lastLOD||S.wheels.forEach(Y=>{Y.children[0].rotation.x+=E,Y.children[1].rotation.x+=E});const N=new P(-.95,.1,-1.3).applyMatrix4(S.meshGroup.matrixWorld),q=new P(.95,.1,-1.3).applyMatrix4(S.meshGroup.matrixWorld);if(v>3&&(S.opacity===void 0||S.opacity>.8)&&(!S.splashTimer||S.splashTimer<=0)){S.splashTimer=.1;const Y=this.world.isWetAt(N.x,N.z),tt=this.world.isWetAt(q.x,q.z);if(Y||tt){const nt=new P(-Math.sin(S.heading),.55,-Math.cos(S.heading)).normalize(),ht=Math.min(4,Math.floor(v*.2));Y&&ht>0&&this.spawnParticles(N,nt,13426158,ht,!0),tt&&ht>0&&this.spawnParticles(q,nt,13426158,ht,!0)}else{const nt=S.impactVelocity.clone().negate().normalize();nt.y=.3,nt.normalize(),this.spawnParticles(N,nt,11184810,1),this.spawnParticles(q,nt,11184810,1)}}v>3?(S.prevLeftWheel&&this.spawnSkidmarkSegment(S.prevLeftWheel,N),S.prevRightWheel&&this.spawnSkidmarkSegment(S.prevRightWheel,q),S.prevLeftWheel=N.clone(),S.prevRightWheel=q.clone()):(S.prevLeftWheel=null,S.prevRightWheel=null)}else S.prevLeftWheel=null,S.prevRightWheel=null;S.splashTimer>0&&(S.splashTimer-=a)}),this.perf.trafficMesh=performance.now()-R;const y=performance.now(),w=this.traffic.vehicles.concat(this.traffic.parkedVehicles||[]);w.forEach(S=>{const W=this.physics.position.distanceTo(S.position);if(W<4){this.physics.speed>16&&this.pursuit&&this.pursuit.triggerPursuit(1);const F=this.physics.position.clone().sub(S.position).normalize();F.y=0;const et=4-W;this.physics.position.addScaledVector(F,et*.52),S.position.addScaledVector(F,-et*.48);const k=new P(Math.sin(S.heading),0,Math.cos(S.heading)),v=k.clone().multiplyScalar(S.speed).add(S.impactVelocity),q=this.physics.velocity.clone().sub(v).dot(F);if(q<0){const vt=-1.48*q/.0014074074074074073,Mt=F.clone().multiplyScalar(vt);this.physics.velocity.addScaledVector(Mt,1/1350),S.impactVelocity.addScaledVector(Mt,-1/1500);const It=this.physics.position.clone().add(S.position).multiplyScalar(.5).clone().sub(S.position);It.y=0;const At=F.clone().negate(),Rt=It.x*At.z-It.z*At.x,Pt=.2+Math.min(2.5,Math.abs(Rt)),Ct=Rt>=0?1:-1;S.impactSpin=Ct*Math.min(4.2,vt/300*Pt),vt>8e3&&(S.crashedAirborne=!0,S.isAirborne=!0,S.velocityY=Math.min(2,vt*1e-4+.5),S.rollVelocity=(Math.random()-.5)*Math.min(2,vt*1e-4),S.pitchVelocity=(Math.random()-.5)*Math.min(2,vt*1e-4)),S.speed=Math.max(0,S.speed-vt*6e-4)}const Y=this.physics.position.clone().add(S.position).multiplyScalar(.5);Y.y=.55+this.world.getBaseHeight(Y.x,Y.z),this.spawnParticles(Y,F,16755200,16,!1,!0);const tt=this.physics.velocity.clone().sub(k.clone().multiplyScalar(S.speed).add(S.impactVelocity)),nt=tt.length();nt>5&&(this.handleCrashDamage(this.carVisualContainer,Y,nt,tt),S.meshGroup&&this.handleCrashDamage(S.meshGroup,Y,nt,tt.clone().negate()),this.spawnDebris(Y,F,1719692,Math.min(8,Math.floor(nt*.4))),this.spawnDebris(Y,F.clone().negate(),S.colorHex,Math.min(8,Math.floor(nt*.4)))),nt>10&&(this.slowMoTimer=.28,this.crashShake=Math.min(.8,nt*.035))}this.race.active&&this.race.aiRacers.forEach(F=>{const et=F.position.distanceTo(S.position);if(et<4){const k=F.position.clone().sub(S.position).normalize();k.y=0;const v=4-et;F.position.addScaledVector(k,v*.5),S.position.addScaledVector(k,-v*.5);const E=new P(Math.sin(S.heading),0,Math.cos(S.heading)),N=E.clone().multiplyScalar(S.speed).add(S.impactVelocity),tt=F.velocity.clone().sub(N).dot(k);if(tt<0){const rt=-1.45*tt/.0014074074074074073,It=k.clone().multiplyScalar(rt);F.velocity.addScaledVector(It,1/1350),S.impactVelocity.addScaledVector(It,-1/1500);const Rt=F.position.clone().add(S.position).multiplyScalar(.5).clone().sub(S.position);Rt.y=0;const Pt=k.clone().negate(),Ct=Rt.x*Pt.z-Rt.z*Pt.x,$=.2+Math.min(2.5,Math.abs(Ct)),xt=Ct>=0?1:-1;S.impactSpin=xt*Math.min(4.2,rt/300*$),S.speed=Math.max(0,S.speed-rt*5e-4),rt>8e3&&(S.crashedAirborne=!0,S.isAirborne=!0,S.velocityY=Math.min(2,rt*1e-4+.5),S.rollVelocity=(Math.random()-.5)*Math.min(2,rt*1e-4),S.pitchVelocity=(Math.random()-.5)*Math.min(2,rt*1e-4))}F.recoveryBoostTimer=3;const nt=F.position.clone().add(S.position).multiplyScalar(.5);nt.y=.55+this.world.getBaseHeight(nt.x,nt.z),this.spawnParticles(nt,k,16755200,8,!1,!0);const ht=F.velocity.clone().sub(E.clone().multiplyScalar(S.speed).add(S.impactVelocity)),ft=ht.length();ft>5&&(F.meshGroup&&this.handleCrashDamage(F.meshGroup,nt,ft,ht),S.meshGroup&&this.handleCrashDamage(S.meshGroup,nt,ft,ht.clone().negate()),this.spawnDebris(nt,k,F.colorHex,Math.min(6,Math.floor(ft*.3))),this.spawnDebris(nt,k.clone().negate(),S.colorHex,Math.min(6,Math.floor(ft*.3))))}})});for(let S=0;S<w.length;S++){const W=w[S];if(!(W.opacity<.5))for(let F=S+1;F<w.length;F++){const et=w[F];if(et.opacity<.5)continue;const k=W.position.distanceTo(et.position);if(k<4){const v=W.position.clone().sub(et.position).normalize();v.y=0;const E=4-k;W.position.addScaledVector(v,E*.5),et.position.addScaledVector(v,-E*.5);const N=new P(Math.sin(W.heading),0,Math.cos(W.heading)),q=new P(Math.sin(et.heading),0,Math.cos(et.heading)),Y=N.multiplyScalar(W.speed).add(W.impactVelocity),tt=q.multiplyScalar(et.speed).add(et.impactVelocity),nt=Y.clone().sub(tt),ht=nt.dot(v);if(nt.lengthSq()>3&&(W.isRecovering=!0,et.isRecovering=!0),ht<0){const At=-1.45*ht/.0013333333333333333,Rt=v.clone().multiplyScalar(At);W.impactVelocity.addScaledVector(Rt,1/1500),et.impactVelocity.addScaledVector(Rt,-1/1500);const Pt=W.position.clone().add(et.position).multiplyScalar(.5),Ct=Pt.clone().sub(W.position);Ct.y=0;const $=v.clone().negate(),xt=Ct.x*$.z-Ct.z*$.x,Ft=.2+Math.min(2.5,Math.abs(xt)),Ut=xt>=0?1:-1;W.impactSpin=Ut*Math.min(4.2,At/300*Ft);const _t=Pt.clone().sub(et.position);_t.y=0;const V=v.clone(),Et=_t.x*V.z-_t.z*V.x,bt=.2+Math.min(2.5,Math.abs(Et)),Lt=Et>=0?1:-1;et.impactSpin=Lt*Math.min(4.2,At/300*bt),At>8e3&&(Math.random()>.5?(W.crashedAirborne=!0,W.isAirborne=!0,W.velocityY=Math.min(2,At*1e-4+.5),W.rollVelocity=(Math.random()-.5)*Math.min(2,At*1e-4),W.pitchVelocity=(Math.random()-.5)*Math.min(2,At*1e-4)):(et.crashedAirborne=!0,et.isAirborne=!0,et.velocityY=Math.min(2,At*1e-4+.5),et.rollVelocity=(Math.random()-.5)*Math.min(2,At*1e-4),et.pitchVelocity=(Math.random()-.5)*Math.min(2,At*1e-4))),W.speed=Math.max(0,W.speed-At*5e-4),et.speed=Math.max(0,et.speed-At*5e-4)}const ft=W.position.clone().add(et.position).multiplyScalar(.5);ft.y=.55+this.world.getBaseHeight(ft.x,ft.z),this.spawnParticles(ft,v,16755200,8,!1,!0);const vt=Y.clone().sub(tt),Mt=vt.length();Mt>5&&(W.meshGroup&&this.handleCrashDamage(W.meshGroup,ft,Mt,vt),et.meshGroup&&this.handleCrashDamage(et.meshGroup,ft,Mt,vt.clone().negate()),this.spawnDebris(ft,v,W.colorHex,Math.min(4,Math.floor(Mt*.2))),this.spawnDebris(ft,v.clone().negate(),et.colorHex,Math.min(4,Math.floor(Mt*.2))))}}}if(this.pursuit&&this.pursuit.active&&this.pursuit.cops.forEach(S=>{if(!S.active)return;const W=this.physics.position.distanceTo(S.position);if(W<4){const F=this.physics.position.clone().sub(S.position).normalize();F.y=0;const et=4-W;this.physics.position.addScaledVector(F,et*.52),S.position.addScaledVector(F,-et*.48);const k=new P(Math.sin(S.heading),0,Math.cos(S.heading)),v=k.clone().multiplyScalar(S.speed),N=this.physics.velocity.clone().sub(v),q=N.dot(F);if(q<0){const vt=-1.5*q/.0013657407407407407,Mt=F.clone().multiplyScalar(vt);this.physics.velocity.addScaledVector(Mt,1/1350),S.speed=Math.max(-10,S.speed-vt*6e-4);const rt=new P(Math.cos(this.physics.heading),0,-Math.sin(this.physics.heading)),It=N.dot(rt);Math.abs(It)>9.5?(this.physics.externalSpin=Math.sign(It)*(1.8+Math.random()*1.5),this.physics.isDrifting=!0,this.physics.driftTraction=.55):N.length()>22&&(this.physics.externalSpin=(Math.random()>.5?1:-1)*(1.1+Math.random()*.9),this.physics.isDrifting=!0,this.physics.driftTraction=.65),this.pursuit.triggerPursuit(2)}const Y=this.physics.position.clone().add(S.position).multiplyScalar(.5);Y.y=.55+this.world.getBaseHeight(Y.x,Y.z),this.spawnParticles(Y,F,16755200,16,!1,!0);const tt=this.physics.velocity.clone().sub(k.clone().multiplyScalar(S.speed)),nt=tt.length();nt>5&&(this.handleCrashDamage(this.carVisualContainer,Y,nt,tt),S.meshGroup&&this.handleCrashDamage(S.meshGroup,Y,nt,tt.clone().negate()),this.spawnDebris(Y,F,1719692,Math.min(8,Math.floor(nt*.4))),this.spawnDebris(Y,F.clone().negate(),1118481,Math.min(8,Math.floor(nt*.4)))),nt>10&&(this.slowMoTimer=.28,this.crashShake=Math.min(.8,nt*.035))}this.race.active&&this.race.aiRacers.forEach(F=>{const et=F.position.distanceTo(S.position);if(et<4){const k=F.position.clone().sub(S.position).normalize();k.y=0;const v=4-et;F.position.addScaledVector(k,v*.5),S.position.addScaledVector(k,-v*.5);const E=new P(Math.sin(S.heading),0,Math.cos(S.heading)),N=E.clone().multiplyScalar(S.speed),tt=F.velocity.clone().sub(N).dot(k);if(tt<0){const rt=-1.5*tt/.0013657407407407407,It=k.clone().multiplyScalar(rt);F.velocity.addScaledVector(It,1/1350),S.speed=Math.max(-10,S.speed-rt*6e-4)}const nt=F.position.clone().add(S.position).multiplyScalar(.5);nt.y=.55+this.world.getBaseHeight(nt.x,nt.z),this.spawnParticles(nt,k,16755200,12,!1,!0);const ht=F.velocity.clone().sub(E.clone().multiplyScalar(S.speed)),ft=ht.length();ft>5&&(F.meshGroup&&this.handleCrashDamage(F.meshGroup,nt,ft,ht),S.meshGroup&&this.handleCrashDamage(S.meshGroup,nt,ft,ht.clone().negate()),this.spawnDebris(nt,k,F.colorHex,Math.min(6,Math.floor(ft*.3))),this.spawnDebris(nt,k.clone().negate(),1118481,Math.min(6,Math.floor(ft*.3))))}}),this.traffic&&this.traffic.vehicles.concat(this.traffic.parkedVehicles||[]).forEach(et=>{const k=et.position.distanceTo(S.position);if(k<4){const v=et.position.clone().sub(S.position).normalize();v.y=0;const E=4-k;et.position.addScaledVector(v,E*.5),S.position.addScaledVector(v,-E*.5);const q=new P(Math.sin(S.heading),0,Math.cos(S.heading)).clone().multiplyScalar(S.speed),tt=new P(Math.sin(et.heading),0,Math.cos(et.heading)).clone().multiplyScalar(et.speed).add(et.impactVelocity),ht=tt.clone().sub(q).dot(v);if(ht<0){const Mt=-1.5*ht/.0012916666666666667,rt=v.clone().multiplyScalar(Mt);et.impactVelocity.addScaledVector(rt,1/1500),et.isRecovering=!0,S.speed=Math.max(-10,S.speed-Mt*6e-4);const It=et.position.clone().add(S.position).multiplyScalar(.5);It.y=.55+this.world.getBaseHeight(It.x,It.z),this.spawnParticles(It,v,16755200,10,!1,!0);const At=tt.clone().sub(q),Rt=At.length();Rt>5&&(et.meshGroup&&this.handleCrashDamage(et.meshGroup,It,Rt,At),S.meshGroup&&this.handleCrashDamage(S.meshGroup,It,Rt,At.clone().negate()),this.spawnDebris(It,v,et.colorHex,Math.min(6,Math.floor(Rt*.3))),this.spawnDebris(It,v.clone().negate(),1118481,Math.min(6,Math.floor(Rt*.3))))}}})}),this.pursuit&&this.pursuit.active){const S=this.pursuit.cops;for(let W=0;W<S.length;W++){const F=S[W];if(F.active)for(let et=W+1;et<S.length;et++){const k=S[et];if(!k.active)continue;const v=F.position.distanceTo(k.position);if(v<4){const E=F.position.clone().sub(k.position).normalize();E.y=0;const N=4-v;F.position.addScaledVector(E,N*.5),k.position.addScaledVector(E,-N*.5);const q=new P(Math.sin(F.heading),0,Math.cos(F.heading)),Y=new P(Math.sin(k.heading),0,Math.cos(k.heading)),tt=q.clone().multiplyScalar(F.speed),nt=Y.clone().multiplyScalar(k.speed),ft=tt.clone().sub(nt).dot(E);if(ft<0){const It=-1.5*ft/.00125,At=E.clone().multiplyScalar(It),Rt=At.clone().multiplyScalar(1/1600),Pt=At.clone().multiplyScalar(-1/1600);F.speed+=Rt.dot(q),k.speed+=Pt.dot(Y)}const vt=F.position.clone().add(k.position).multiplyScalar(.5);vt.y=.55+this.world.getBaseHeight(vt.x,vt.z),this.spawnParticles(vt,E,16755200,8,!1,!0);const Mt=tt.clone().sub(nt),rt=Mt.length();rt>5&&(F.meshGroup&&this.handleCrashDamage(F.meshGroup,vt,rt,Mt),k.meshGroup&&this.handleCrashDamage(k.meshGroup,vt,rt,Mt.clone().negate()),this.spawnDebris(vt,E,1118481,Math.min(4,Math.floor(rt*.2))),this.spawnDebris(vt,E.clone().negate(),1118481,Math.min(4,Math.floor(rt*.2))))}}}}this.perf.collisions=performance.now()-y;const I=this.cinematicManager&&this.cinematicManager.state!=="none",z=performance.now();if(I?(this.carVisualContainer.position.copy(this.physics.position),un.setFromAxisAngle(new P(0,1,0),this.physics.heading),this.carVisualContainer.quaternion.copy(un),this.carVisualContainer.updateMatrixWorld(!0)):(this.carVisualContainer.position.copy(this.renderPhysicsPosition),this.world.alignMeshToTerrain(this.carVisualContainer,this.renderPhysicsPosition,this.renderPhysicsHeading,this.physics.isAirborne&&this.physics.airTime>.2||this.physics.rolloverTimer>0,a),this.carVisualContainer.updateMatrixWorld(!0)),this.updateHeadlightFlares(this.carVisualContainer,this.physics.heading),this.carGroup.rotation.z=this.physics.bodyRoll,this.carGroup.rotation.x=this.physics.bodyPitch,this.physics.isScraping){const S=this.physics.position.clone();S.addScaledVector(this.physics.scrapeNormal,-1),S.y=.25+this.world.getBaseHeight(S.x,S.z);const W=this.physics.velocity.clone().negate().normalize();W.addScaledVector(new P(Math.random()-.5,.4,Math.random()-.5),.45).normalize(),this.spawnParticles(S,W,16755200,3,!1,!0)}const j=Math.sin(this.physics.heading),C=Math.cos(this.physics.heading),D=this.physics.velocity.x*j+this.physics.velocity.z*C,G=D/.42*a;this.wheels.forEach((S,W)=>{S.rotation.y=W<2?this.physics.steeringAngle:0,S.children[0].rotation.y=0,S.children[1].rotation.y=0,S.children[0].rotation.x+=G,S.children[1].rotation.x+=G});const O=new P(-.95,.1,-1.3).applyMatrix4(this.carVisualContainer.matrixWorld),X=new P(.95,.1,-1.3).applyMatrix4(this.carVisualContainer.matrixWorld),J=this.physics.velocity.length(),ot=this.world.isWetAt(O.x,O.z),lt=this.world.isWetAt(X.x,X.z);if(this.splashTimer||(this.splashTimer=0),this.splashTimer-=a,J>3&&(ot||lt)&&this.splashTimer<=0){this.splashTimer=.08;const S=this.physics.velocity.clone().negate().normalize();S.y=.55,S.normalize();const W=Math.min(8,Math.floor(J*.35));ot&&W>0&&this.spawnParticles(O,S,13426158,W,!0),lt&&W>0&&this.spawnParticles(X,S,13426158,W,!0)}if(this.physics.isDrifting){const S=this.physics.velocity.clone().negate().normalize();ot||this.spawnParticles(O,S,11184810,2),lt||this.spawnParticles(X,S,11184810,2),this.driftStatusEl&&(this.driftStatusEl.innerText="DRIFTING",this.driftStatusEl.classList.add("active"))}else if(this.driftStatusEl&&this.driftStatusEl.classList.remove("active"),Math.random()<.15){const S=new P(.6,.2,-2.1).applyMatrix4(this.carVisualContainer.matrixWorld),W=new P(-Math.sin(this.physics.heading),.2,-Math.cos(this.physics.heading));this.spawnParticles(S,W,7829367,1)}if(this.physics.isBoosting){const S=1.3+Math.random()*.45;this.nitroLeftSprite.scale.set(S,S,S),this.nitroRightSprite.scale.set(S,S,S),this.nitroLight.intensity=6+Math.random()*2}else this.nitroLeftSprite.scale.set(.001,.001,.001),this.nitroRightSprite.scale.set(.001,.001,.001),this.nitroLight.intensity=0;this.physics.isDrifting||f&&J>4?(this.prevLeftWheel&&this.spawnSkidmarkSegment(this.prevLeftWheel,O),this.prevRightWheel&&this.spawnSkidmarkSegment(this.prevRightWheel,X),this.prevLeftWheel=O.clone(),this.prevRightWheel=X.clone()):(this.prevLeftWheel=null,this.prevRightWheel=null),this.perf.playerVisuals=performance.now()-z,this.perf.traffic=performance.now()-T;const K=performance.now();if(this.race.active&&!I){this.race.playerVelocity=this.physics.velocity;const S=this.race.update(this.physics.position,a,this.world,this.traffic);this.race.aiRacers.forEach(v=>{const E=this.physics.position.distanceTo(v.position);if(E<4){const N=this.physics.position.clone().sub(v.position).normalize();N.y=0;const q=4-E;this.physics.position.addScaledVector(N,q*.5),v.position.addScaledVector(N,-q*.5);const Y=this.physics.velocity,tt=v.velocity,ht=Y.clone().sub(tt).dot(N);if(ht<0){const At=-1.55*ht/.001851851851851852,Rt=N.clone().multiplyScalar(At);this.physics.velocity.addScaledVector(Rt,1/1350),v.velocity.addScaledVector(Rt,-1/900),v.recoveryBoostTimer=2}const ft=this.physics.position.clone().add(v.position).multiplyScalar(.5);ft.y=.55+this.world.getBaseHeight(ft.x,ft.z),this.spawnParticles(ft,N,16755200,10,!1,!0);const vt=this.physics.velocity.clone().sub(v.velocity),Mt=vt.length();Mt>5&&(this.handleCrashDamage(this.carVisualContainer,ft,Mt,vt),v.meshGroup&&this.handleCrashDamage(v.meshGroup,ft,Mt,vt.clone().negate()),this.spawnDebris(ft,N,1719692,Math.min(8,Math.floor(Mt*.4))),this.spawnDebris(ft,N.clone().negate(),v.colorHex,Math.min(8,Math.floor(Mt*.4)))),Mt>10&&(this.slowMoTimer=.28,this.crashShake=Math.min(.8,Mt*.035))}});for(let v=0;v<this.race.aiRacers.length;v++)for(let E=v+1;E<this.race.aiRacers.length;E++){const N=this.race.aiRacers[v],q=this.race.aiRacers[E],Y=N.position.distanceTo(q.position);if(Y<4){const tt=N.position.clone().sub(q.position).normalize();tt.y=0;const nt=4-Y;N.position.addScaledVector(tt,nt*.5),q.position.addScaledVector(tt,-nt*.5);const ht=N.velocity,ft=q.velocity,Mt=ht.clone().sub(ft).dot(tt);if(Mt<0){const Ct=-1.5*Mt/.0014814814814814814,$=tt.clone().multiplyScalar(Ct);N.velocity.addScaledVector($,1/1350),q.velocity.addScaledVector($,-1/1350)}const rt=N.position.clone().add(q.position).multiplyScalar(.5);rt.y=.55+this.world.getBaseHeight(rt.x,rt.z),this.spawnParticles(rt,tt,16755200,6,!1,!0);const It=N.velocity.clone().sub(q.velocity),At=It.length();At>5&&(N.meshGroup&&this.handleCrashDamage(N.meshGroup,rt,At,It),q.meshGroup&&this.handleCrashDamage(q.meshGroup,rt,At,It.clone().negate()),this.spawnDebris(rt,tt,N.colorHex,Math.min(6,Math.floor(At*.3))),this.spawnDebris(rt,tt.clone().negate(),q.colorHex,Math.min(6,Math.floor(At*.3))))}}this.race.aiRacers.forEach(v=>{if(v.meshGroup){v.meshGroup.position.copy(v.position);const E=v.velocity.length();v.indicatorMesh&&!I&&(v.indicatorMesh.rotation.y+=2*a,v.indicatorMesh.position.y=1.9+Math.sin(Date.now()*.005)*.12),v._frameCounter||(v._frameCounter=0),v._frameCounter++;const N=v.position.distanceTo(h.position),Y=!(N>90)||v._frameCounter%3===0;if(Y){if(I){v.meshGroup.position.copy(v.spawnPos);const Mt=new Ie;Mt.setFromAxisAngle(new P(0,1,0),v.heading),v.meshGroup.quaternion.copy(Mt)}else this.world.alignMeshToTerrain(v.meshGroup,v.position,v.heading,!1,a);v.meshGroup.updateMatrixWorld(!0),this.updateVehicleLOD(v,N,1),v._lastLOD||(this.updateHeadlightFlares(v.meshGroup,v.heading),this.deformHeadlightPoolToTerrain(v.meshGroup))}const tt=v.meshGroup.getObjectByName("headlightPool");if(tt&&(tt.material.opacity=.35),Y&&!v._lastLOD){const Mt=Math.sin(v.heading),rt=Math.cos(v.heading),At=(v.velocity.x*Mt+v.velocity.z*rt)/.42*a;v.wheels.forEach((Rt,Pt)=>{Pt<2&&(Rt.children[0].rotation.y=v.steeringAngle,Rt.children[1].rotation.y=v.steeringAngle),Rt.children[0].rotation.x+=At,Rt.children[1].rotation.x+=At})}const nt=new P(-.95,.1,-1.3).applyMatrix4(v.meshGroup.matrixWorld),ht=new P(.95,.1,-1.3).applyMatrix4(v.meshGroup.matrixWorld),ft=this.world.isWetAt(nt.x,nt.z),vt=this.world.isWetAt(ht.x,ht.z);if(v.splashTimer||(v.splashTimer=0),v.splashTimer-=a,E>3&&(ft||vt)&&v.splashTimer<=0){v.splashTimer=.12;const Mt=v.velocity.clone().negate().normalize();Mt.y=.55,Mt.normalize();const rt=Math.min(6,Math.floor(E*.25));ft&&rt>0&&this.spawnParticles(nt,Mt,13426158,rt,!0),vt&&rt>0&&this.spawnParticles(ht,Mt,13426158,rt,!0)}if(v.isDrifting){const Mt=v.velocity.clone().negate().normalize();ft||this.spawnParticles(nt,Mt,11184810,1),vt||this.spawnParticles(ht,Mt,11184810,1)}if(v.isDrifting?(v.prevLeftWheel&&this.spawnSkidmarkSegment(v.prevLeftWheel,nt),v.prevRightWheel&&this.spawnSkidmarkSegment(v.prevRightWheel,ht),v.prevLeftWheel=nt.clone(),v.prevRightWheel=ht.clone()):(v.prevLeftWheel=null,v.prevRightWheel=null),v.isBoosting){const Mt=1.3+Math.random()*.45;v.nitroLeftSprite&&v.nitroLeftSprite.scale.set(Mt,Mt,Mt),v.nitroRightSprite&&v.nitroRightSprite.scale.set(Mt,Mt,Mt)}else v.nitroLeftSprite&&v.nitroLeftSprite.scale.set(.001,.001,.001),v.nitroRightSprite&&v.nitroRightSprite.scale.set(.001,.001,.001)}});const W=this.race.calculateRankings(this.physics.position),F=W.findIndex(v=>v.isPlayer)+1,et=document.getElementById("stats-pos");if(et&&(et.textContent=`${F}/${W.length}`),S){if(S.event==="checkpoint")this.showBanner("CHECKPOINT",`Index: ${S.nextIndex+1}/${this.race.checkpoints.length}`,800),this.rebuildCheckpointBeacons();else if(S.event==="lap")this.showBanner("LAP COMPLETED",`LAP ${S.lap} Started!`,1500),this.rebuildCheckpointBeacons();else if(S.event==="finish"){const E=this.race.calculateRankings(this.physics.position).findIndex(nt=>nt.isPlayer)+1;let N="TH";E===1?N="ST":E===2?N="ND":E===3&&(N="RD");const q=document.getElementById("race-results"),Y=document.getElementById("results-pos"),tt=document.getElementById("results-time");if(q){Y.textContent=`${E}${N}`,tt.textContent=this.formatTime(S.time);const nt=document.getElementById("btn-like-race"),ht=document.getElementById("btn-dislike-race"),ft=document.getElementById("quick-feedback-thanks");nt&&(nt.style.display="block"),ht&&(ht.style.display="block"),ft&&(ft.style.display="none"),q.classList.add("show"),setTimeout(()=>{q&&q.classList.remove("show")},6e3)}this.hudStatsEl.style.display="none",this.cancelBtnEl.style.display="none",this.navArrow.visible=!1,this.clearCheckpointBeacons(),setTimeout(()=>{this.clearAIMeshes()},8e3),this.traffic&&(this.traffic.clear(),this.traffic.maxVehicles=40,this.traffic.init(this.physics.position,this.world)),this.race.selectNewWorldEvent(this.world,this.physics.position)}}this.statsTimerEl.textContent=this.formatTime(this.race.timeElapsed),this.race.mode==="circuit"?(this.statsProgressLabelEl.textContent="LAP",this.statsProgressEl.textContent=`${this.race.lapCurrent}/${this.race.lapsTotal}`):this.race.mode==="unordered"?(this.statsProgressLabelEl.textContent="CLEARED",this.statsProgressEl.textContent=`${this.race.unorderedCleared.size}/${this.race.checkpoints.length}`):(this.statsProgressLabelEl.textContent="CHECKPOINT",this.statsProgressEl.textContent=`${this.race.currentIndex+1}/${this.race.checkpoints.length}`);const k=this.race.getActiveCheckpoint();if(k){this.navArrow.visible=!0;const v=k.x-this.physics.position.x,E=k.z-this.physics.position.z,N=Math.atan2(v,E);this.navArrow.rotation.y=N-this.physics.heading}else if(this.race.mode==="unordered"){let v=null,E=1/0;if(this.race.checkpoints.forEach((N,q)=>{if(!this.race.unorderedCleared.has(q)){const Y=N.x-this.physics.position.x,tt=N.z-this.physics.position.z,nt=Y*Y+tt*tt;nt<E&&(E=nt,v=N)}}),v){this.navArrow.visible=!0;const N=v.x-this.physics.position.x,q=v.z-this.physics.position.z,Y=Math.atan2(N,q);this.navArrow.rotation.y=Y-this.physics.heading}else this.navArrow.visible=!1}else this.navArrow.visible=!1;this.cinematicManager&&this.cinematicManager.state!=="none"&&(this.navArrow.visible=!1),this.race.checkpoints.forEach((v,E)=>{const q=E===this.race.checkpoints.length-1?15222085:16755258,Y=this.race.mode==="unordered",tt=Y?this.race.unorderedCleared.has(E):E<this.race.currentIndex,nt=Y?!tt:E===this.race.currentIndex,ht=!Y&&E===Math.min(this.race.currentIndex+1,this.race.checkpoints.length-1);Y?!tt&&Math.random()<.35&&this.spawnCheckpointSmoke(v,q,.85,.9):nt?Math.random()<.55&&this.spawnCheckpointSmoke(v,q,1,1):ht&&Math.random()<.2&&this.spawnCheckpointSmoke(v,q,.45,.65)})}this.perf.race=performance.now()-K;const it=performance.now();this.updateParticles(a),this.updateCheckpointSmoke(a),this.updateDebris(a),this.checkBreakablesCollision(a),this.checkSlipstream(a),this.checkNearMisses(a),this.updateDriftNitro(a);const gt=this.physics.position.x,Z=this.physics.position.z,at=220*220;this.skidmarkPool.forEach(S=>{if(S.mesh.visible){const W=S.mesh.position.x-gt,F=S.mesh.position.z-Z;W*W+F*F>at&&(S.mesh.visible=!1)}}),this.checkpointVisualsGroup.children.forEach(S=>{const W=S.getObjectByName("nextCPArrow");if(W){W.position.y=3.5+Math.sin(this.clock.getElapsedTime()*4)*.6;const F=1.2+Math.sin(this.clock.getElapsedTime()*8)*.15;W.scale.set(F,F,F)}}),this.updateCamera(e),this._minimapFrame||(this._minimapFrame=0),this._minimapFrame++&1||this.updateMinimap();const dt=Math.round(Math.abs(D)*2.23694);if(this.speedValEl&&(this.speedValEl.textContent=dt.toString().padStart(3,"0")),this.gearValEl&&(this.physics.shiftTimer>0?(this.gearValEl.textContent="—",this.gearValEl.style.color="#ff3b30"):(this.gearValEl.textContent=this.physics.gear,this.gearValEl.style.color=this.physics.gear==="R"?"#ff3b30":"#ffc600")),this.dialNeedleEl&&this.dialRpmFillEl){const S=Math.max(0,Math.min(100,(this.physics.rpm-1e3)/7e3*100)),W=S/100*270-135;this.dialNeedleEl.setAttribute("transform",`rotate(${W} 80 80)`);const F=S/100*330;this.dialRpmFillEl.setAttribute("stroke-dasharray",`${F} 440`),this.physics.rpm>7300?this.dialRpmFillEl.style.stroke="#ff3b30":this.dialRpmFillEl.style.stroke="#ffc600"}if(this.nitroBarEl){const S=this.physics.nitroLevel*287;this.nitroBarEl.setAttribute("stroke-dasharray",`${S} 400`),this.physics.isBoosting?this.nitroBarEl.style.stroke="#ffffff":this.nitroBarEl.style.stroke="#00e5ff"}if(this.physics.trickNotification){const S=this.physics.trickNotification;this.physics.trickNotification="";let W="STUNT LANDED!",F="";if(S.includes("WIPEOUT")){W="WIPEOUT!",F=S.replace("WIPEOUT: ",""),this.showStuntNotification(W,F);const et=this.physics.position.clone();et.y+=.3,this.spawnDebris(et,new P(0,4,0),2236962,16),this.crashShake=Math.max(this.crashShake||0,.95)}else if(S.includes("CLEAN LANDING")){W="CLEAN LANDING!",F=S.replace("CLEAN LANDING: ",""),this.showStuntNotification(W,F);const et=this.physics.position.clone();et.y+=.1,this.spawnParticles(et,new P(0,2,0),61695,15);const k=Math.abs(this.physics.velocityY);k>6&&(this.crashShake=Math.max(this.crashShake||0,Math.min(.7,k*.055)))}else if(S.includes("LANDED")){W="STUNT LANDED!",F=S.replace("LANDED: ",""),this.showStuntNotification(W,F);const et=this.physics.position.clone();et.y+=.1,this.spawnParticles(et,new P(0,1.5,0),15051067,10);const k=Math.abs(this.physics.velocityY);k>6&&(this.crashShake=Math.max(this.crashShake||0,Math.min(.6,k*.05)))}else{W=S,F="",this.showStuntNotification(W,F);const et=this.physics.position.clone();et.y+=.1,this.spawnParticles(et,new P(0,1.5,0),65407,8);const k=Math.abs(this.physics.velocityY);k>6&&(this.crashShake=Math.max(this.crashShake||0,Math.min(.5,k*.055)))}}this.perf.particles=performance.now()-it;const St=performance.now(),yt=performance.now();let Tt=.04;this.world&&this.world.lightSources&&this.world.lightSources.forEach(S=>{const W=S.x-gt,F=S.z-Z,et=W*W+F*F;if(et<1600){const k=(S.intensity||10)/(1+et*.1);Tt+=k}}),Tt+=1.5;const B=Math.max(.85,Math.min(3.2,2.6/Math.sqrt(Tt)));this.renderer.toneMappingExposure===void 0&&(this.renderer.toneMappingExposure=1),this.renderer.toneMappingExposure+=(B-this.renderer.toneMappingExposure)*e*2.5,this.perf.eyeAdaptation=performance.now()-yt,this.renderer.render(this.scene,this.camera),this.perf.render=performance.now()-St;const wt=performance.now()-t;if(this.perf.total=wt,wt>33.3&&console.warn(`[Stutter Detected] Frame took ${wt.toFixed(1)}ms | world: ${this.perf.world.toFixed(1)}ms | physics: ${this.perf.physics.toFixed(1)}ms | trafficAI: ${this.perf.trafficUpdate.toFixed(1)}ms | trafficMesh: ${this.perf.trafficMesh.toFixed(1)}ms | collisions: ${this.perf.collisions.toFixed(1)}ms | playerVis: ${this.perf.playerVisuals.toFixed(1)}ms | pursuit: ${this.perf.pursuit.toFixed(1)}ms | race: ${this.perf.race.toFixed(1)}ms | particles: ${this.perf.particles.toFixed(1)}ms | render: ${this.perf.render.toFixed(1)}ms (eye: ${this.perf.eyeAdaptation.toFixed(1)}ms) | DrawCalls: ${this.renderer.info.render.calls} | Triangles: ${this.renderer.info.render.triangles} | Geometries: ${this.renderer.info.memory.geometries} | Textures: ${this.renderer.info.memory.textures} | Shaders: ${this.renderer.info.programs?this.renderer.info.programs.length:0}`),this.perfFrameCount===void 0&&(this.perfFrameCount=0),this.perfFrameCount++,this.perfFrameCount%10===0){const S=Math.round(1e3/Math.max(1,wt)),W=document.getElementById("perf-hud");this.perfFpsEl&&W&&W.style.display==="block"&&(this.perfFpsEl.textContent=S,this.perfTotalEl.textContent=wt.toFixed(1),this.perfWorldEl.textContent=this.perf.world.toFixed(1),this.perfPhysicsEl.textContent=this.perf.physics.toFixed(1),this.perfTrafficUpdateEl.textContent=this.perf.trafficUpdate.toFixed(1),this.perfTrafficMeshEl.textContent=this.perf.trafficMesh.toFixed(1),this.perfCollisionsEl.textContent=this.perf.collisions.toFixed(1),this.perfPlayerVisualsEl.textContent=this.perf.playerVisuals.toFixed(1),this.perfPursuitEl.textContent=this.perf.pursuit.toFixed(1),this.perfRaceEl.textContent=this.perf.race.toFixed(1),this.perfParticlesEl.textContent=this.perf.particles.toFixed(1),this.perfRenderEl.textContent=this.perf.render.toFixed(1),this.perfEyeEl.textContent=this.perf.eyeAdaptation.toFixed(1),this.perfCallsEl.textContent=this.renderer.info.render.calls,this.perfTrianglesEl.textContent=this.renderer.info.render.triangles,this.perfGeometriesEl.textContent=this.renderer.info.memory.geometries,this.perfTexturesEl.textContent=this.renderer.info.memory.textures,this.perfShadersEl.textContent=this.renderer.info.programs?this.renderer.info.programs.length:0)}}}const ig=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<=768;if(ig){const s=document.getElementById("mobile-blocker");s&&(s.style.display="flex");const t=document.getElementById("loader");t&&(t.style.display="none");const e=document.getElementById("main-menu");e&&(e.style.display="none"),console.log("Game initialization aborted: Mobile device detected.")}else new eg;
