(()=>{"use strict";function e(e){const t=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===t?new e.constructor(+e):"number"==typeof e||"[object Number]"===t||"string"==typeof e||"[object String]"===t?new Date(e):new Date(NaN)}const t={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function n(e){return(t={})=>{const n=t.width?String(t.width):e.defaultWidth;return e.formats[n]||e.formats[e.defaultWidth]}}const a={date:n({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:n({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:n({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},r={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function o(e){return(t,n)=>{let a;if("formatting"===(n?.context?String(n.context):"standalone")&&e.formattingValues){const t=e.defaultFormattingWidth||e.defaultWidth,r=n?.width?String(n.width):t;a=e.formattingValues[r]||e.formattingValues[t]}else{const t=e.defaultWidth,r=n?.width?String(n.width):e.defaultWidth;a=e.values[r]||e.values[t]}return a[e.argumentCallback?e.argumentCallback(t):t]}}function i(e){return(t,n={})=>{const a=n.width,r=a&&e.matchPatterns[a]||e.matchPatterns[e.defaultMatchWidth],o=t.match(r);if(!o)return null;const i=o[0],c=a&&e.parsePatterns[a]||e.parsePatterns[e.defaultParseWidth],s=Array.isArray(c)?function(e,t){for(let t=0;t<e.length;t++)if(e[t].test(i))return t}(c):function(e,t){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t)&&e[t].test(i))return t}(c);let u;return u=e.valueCallback?e.valueCallback(s):s,u=n.valueCallback?n.valueCallback(u):u,{value:u,rest:t.slice(i.length)}}}var c;const s={code:"en-US",formatDistance:(e,n,a)=>{let r;const o=t[e];return r="string"==typeof o?o:1===n?o.one:o.other.replace("{{count}}",n.toString()),a?.addSuffix?a.comparison&&a.comparison>0?"in "+r:r+" ago":r},formatLong:a,formatRelative:(e,t,n,a)=>r[e],localize:{ordinalNumber:(e,t)=>{const n=Number(e),a=n%100;if(a>20||a<10)switch(a%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:o({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:o({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:e=>e-1}),month:o({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:o({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:o({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(c={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:e=>parseInt(e,10)},(e,t={})=>{const n=e.match(c.matchPattern);if(!n)return null;const a=n[0],r=e.match(c.parsePattern);if(!r)return null;let o=c.valueCallback?c.valueCallback(r[0]):r[0];return o=t.valueCallback?t.valueCallback(o):o,{value:o,rest:e.slice(a.length)}}),era:i({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:i({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:e=>e+1}),month:i({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:i({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:i({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};let u={};function d(){return u}Math.pow(10,8);const l=6048e5,m=864e5;function h(t){const n=e(t);return n.setHours(0,0,0,0),n}function g(t){const n=e(t),a=new Date(Date.UTC(n.getFullYear(),n.getMonth(),n.getDate(),n.getHours(),n.getMinutes(),n.getSeconds(),n.getMilliseconds()));return a.setUTCFullYear(n.getFullYear()),+t-+a}function f(e,t){return e instanceof Date?new e.constructor(t):new Date(t)}function p(t){const n=e(t);return function(e,t){const n=h(e),a=h(t),r=+n-g(n),o=+a-g(a);return Math.round((r-o)/m)}(n,function(t){const n=e(t),a=f(t,0);return a.setFullYear(n.getFullYear(),0,1),a.setHours(0,0,0,0),a}(n))+1}function w(t,n){const a=d(),r=n?.weekStartsOn??n?.locale?.options?.weekStartsOn??a.weekStartsOn??a.locale?.options?.weekStartsOn??0,o=e(t),i=o.getDay(),c=(i<r?7:0)+i-r;return o.setDate(o.getDate()-c),o.setHours(0,0,0,0),o}function y(e){return w(e,{weekStartsOn:1})}function b(t){const n=e(t),a=n.getFullYear(),r=f(t,0);r.setFullYear(a+1,0,4),r.setHours(0,0,0,0);const o=y(r),i=f(t,0);i.setFullYear(a,0,4),i.setHours(0,0,0,0);const c=y(i);return n.getTime()>=o.getTime()?a+1:n.getTime()>=c.getTime()?a:a-1}function v(t){const n=e(t),a=+y(n)-+function(e){const t=b(e),n=f(e,0);return n.setFullYear(t,0,4),n.setHours(0,0,0,0),y(n)}(n);return Math.round(a/l)+1}function S(t,n){const a=e(t),r=a.getFullYear(),o=d(),i=n?.firstWeekContainsDate??n?.locale?.options?.firstWeekContainsDate??o.firstWeekContainsDate??o.locale?.options?.firstWeekContainsDate??1,c=f(t,0);c.setFullYear(r+1,0,i),c.setHours(0,0,0,0);const s=w(c,n),u=f(t,0);u.setFullYear(r,0,i),u.setHours(0,0,0,0);const l=w(u,n);return a.getTime()>=s.getTime()?r+1:a.getTime()>=l.getTime()?r:r-1}function M(t,n){const a=e(t),r=+w(a,n)-+function(e,t){const n=d(),a=t?.firstWeekContainsDate??t?.locale?.options?.firstWeekContainsDate??n.firstWeekContainsDate??n.locale?.options?.firstWeekContainsDate??1,r=S(e,t),o=f(e,0);return o.setFullYear(r,0,a),o.setHours(0,0,0,0),w(o,t)}(a,n);return Math.round(r/l)+1}function L(e,t){return(e<0?"-":"")+Math.abs(e).toString().padStart(t,"0")}const k={y(e,t){const n=e.getFullYear(),a=n>0?n:1-n;return L("yy"===t?a%100:a,t.length)},M(e,t){const n=e.getMonth();return"M"===t?String(n+1):L(n+1,2)},d:(e,t)=>L(e.getDate(),t.length),a(e,t){const n=e.getHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":return n.toUpperCase();case"aaa":return n;case"aaaaa":return n[0];default:return"am"===n?"a.m.":"p.m."}},h:(e,t)=>L(e.getHours()%12||12,t.length),H:(e,t)=>L(e.getHours(),t.length),m:(e,t)=>L(e.getMinutes(),t.length),s:(e,t)=>L(e.getSeconds(),t.length),S(e,t){const n=t.length,a=e.getMilliseconds();return L(Math.trunc(a*Math.pow(10,n-3)),t.length)}},T={G:function(e,t,n){const a=e.getFullYear()>0?1:0;switch(t){case"G":case"GG":case"GGG":return n.era(a,{width:"abbreviated"});case"GGGGG":return n.era(a,{width:"narrow"});default:return n.era(a,{width:"wide"})}},y:function(e,t,n){if("yo"===t){const t=e.getFullYear(),a=t>0?t:1-t;return n.ordinalNumber(a,{unit:"year"})}return k.y(e,t)},Y:function(e,t,n,a){const r=S(e,a),o=r>0?r:1-r;return"YY"===t?L(o%100,2):"Yo"===t?n.ordinalNumber(o,{unit:"year"}):L(o,t.length)},R:function(e,t){return L(b(e),t.length)},u:function(e,t){return L(e.getFullYear(),t.length)},Q:function(e,t,n){const a=Math.ceil((e.getMonth()+1)/3);switch(t){case"Q":return String(a);case"QQ":return L(a,2);case"Qo":return n.ordinalNumber(a,{unit:"quarter"});case"QQQ":return n.quarter(a,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(a,{width:"narrow",context:"formatting"});default:return n.quarter(a,{width:"wide",context:"formatting"})}},q:function(e,t,n){const a=Math.ceil((e.getMonth()+1)/3);switch(t){case"q":return String(a);case"qq":return L(a,2);case"qo":return n.ordinalNumber(a,{unit:"quarter"});case"qqq":return n.quarter(a,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(a,{width:"narrow",context:"standalone"});default:return n.quarter(a,{width:"wide",context:"standalone"})}},M:function(e,t,n){const a=e.getMonth();switch(t){case"M":case"MM":return k.M(e,t);case"Mo":return n.ordinalNumber(a+1,{unit:"month"});case"MMM":return n.month(a,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(a,{width:"narrow",context:"formatting"});default:return n.month(a,{width:"wide",context:"formatting"})}},L:function(e,t,n){const a=e.getMonth();switch(t){case"L":return String(a+1);case"LL":return L(a+1,2);case"Lo":return n.ordinalNumber(a+1,{unit:"month"});case"LLL":return n.month(a,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(a,{width:"narrow",context:"standalone"});default:return n.month(a,{width:"wide",context:"standalone"})}},w:function(e,t,n,a){const r=M(e,a);return"wo"===t?n.ordinalNumber(r,{unit:"week"}):L(r,t.length)},I:function(e,t,n){const a=v(e);return"Io"===t?n.ordinalNumber(a,{unit:"week"}):L(a,t.length)},d:function(e,t,n){return"do"===t?n.ordinalNumber(e.getDate(),{unit:"date"}):k.d(e,t)},D:function(e,t,n){const a=p(e);return"Do"===t?n.ordinalNumber(a,{unit:"dayOfYear"}):L(a,t.length)},E:function(e,t,n){const a=e.getDay();switch(t){case"E":case"EE":case"EEE":return n.day(a,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(a,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(a,{width:"short",context:"formatting"});default:return n.day(a,{width:"wide",context:"formatting"})}},e:function(e,t,n,a){const r=e.getDay(),o=(r-a.weekStartsOn+8)%7||7;switch(t){case"e":return String(o);case"ee":return L(o,2);case"eo":return n.ordinalNumber(o,{unit:"day"});case"eee":return n.day(r,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(r,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},c:function(e,t,n,a){const r=e.getDay(),o=(r-a.weekStartsOn+8)%7||7;switch(t){case"c":return String(o);case"cc":return L(o,t.length);case"co":return n.ordinalNumber(o,{unit:"day"});case"ccc":return n.day(r,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(r,{width:"narrow",context:"standalone"});case"cccccc":return n.day(r,{width:"short",context:"standalone"});default:return n.day(r,{width:"wide",context:"standalone"})}},i:function(e,t,n){const a=e.getDay(),r=0===a?7:a;switch(t){case"i":return String(r);case"ii":return L(r,t.length);case"io":return n.ordinalNumber(r,{unit:"day"});case"iii":return n.day(a,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(a,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(a,{width:"short",context:"formatting"});default:return n.day(a,{width:"wide",context:"formatting"})}},a:function(e,t,n){const a=e.getHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(a,{width:"narrow",context:"formatting"});default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},b:function(e,t,n){const a=e.getHours();let r;switch(r=12===a?"noon":0===a?"midnight":a/12>=1?"pm":"am",t){case"b":case"bb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(e,t,n){const a=e.getHours();let r;switch(r=a>=17?"evening":a>=12?"afternoon":a>=4?"morning":"night",t){case"B":case"BB":case"BBB":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(e,t,n){if("ho"===t){let t=e.getHours()%12;return 0===t&&(t=12),n.ordinalNumber(t,{unit:"hour"})}return k.h(e,t)},H:function(e,t,n){return"Ho"===t?n.ordinalNumber(e.getHours(),{unit:"hour"}):k.H(e,t)},K:function(e,t,n){const a=e.getHours()%12;return"Ko"===t?n.ordinalNumber(a,{unit:"hour"}):L(a,t.length)},k:function(e,t,n){let a=e.getHours();return 0===a&&(a=24),"ko"===t?n.ordinalNumber(a,{unit:"hour"}):L(a,t.length)},m:function(e,t,n){return"mo"===t?n.ordinalNumber(e.getMinutes(),{unit:"minute"}):k.m(e,t)},s:function(e,t,n){return"so"===t?n.ordinalNumber(e.getSeconds(),{unit:"second"}):k.s(e,t)},S:function(e,t){return k.S(e,t)},X:function(e,t,n){const a=e.getTimezoneOffset();if(0===a)return"Z";switch(t){case"X":return x(a);case"XXXX":case"XX":return q(a);default:return q(a,":")}},x:function(e,t,n){const a=e.getTimezoneOffset();switch(t){case"x":return x(a);case"xxxx":case"xx":return q(a);default:return q(a,":")}},O:function(e,t,n){const a=e.getTimezoneOffset();switch(t){case"O":case"OO":case"OOO":return"GMT"+E(a,":");default:return"GMT"+q(a,":")}},z:function(e,t,n){const a=e.getTimezoneOffset();switch(t){case"z":case"zz":case"zzz":return"GMT"+E(a,":");default:return"GMT"+q(a,":")}},t:function(e,t,n){return L(Math.trunc(e.getTime()/1e3),t.length)},T:function(e,t,n){return L(e.getTime(),t.length)}};function E(e,t=""){const n=e>0?"-":"+",a=Math.abs(e),r=Math.trunc(a/60),o=a%60;return 0===o?n+String(r):n+String(r)+t+L(o,2)}function x(e,t){return e%60==0?(e>0?"-":"+")+L(Math.abs(e)/60,2):q(e,t)}function q(e,t=""){const n=e>0?"-":"+",a=Math.abs(e);return n+L(Math.trunc(a/60),2)+t+L(a%60,2)}const C=(e,t)=>{switch(e){case"P":return t.date({width:"short"});case"PP":return t.date({width:"medium"});case"PPP":return t.date({width:"long"});default:return t.date({width:"full"})}},H=(e,t)=>{switch(e){case"p":return t.time({width:"short"});case"pp":return t.time({width:"medium"});case"ppp":return t.time({width:"long"});default:return t.time({width:"full"})}},I={p:H,P:(e,t)=>{const n=e.match(/(P+)(p+)?/)||[],a=n[1],r=n[2];if(!r)return C(e,t);let o;switch(a){case"P":o=t.dateTime({width:"short"});break;case"PP":o=t.dateTime({width:"medium"});break;case"PPP":o=t.dateTime({width:"long"});break;default:o=t.dateTime({width:"full"})}return o.replace("{{date}}",C(a,t)).replace("{{time}}",H(r,t))}},P=/^D+$/,D=/^Y+$/,W=["D","DD","YY","YYYY"];function $(t){if(!(n=t,n instanceof Date||"object"==typeof n&&"[object Date]"===Object.prototype.toString.call(n)||"number"==typeof t))return!1;var n;const a=e(t);return!isNaN(Number(a))}const N=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,O=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,Y=/^'([^]*?)'?$/,z=/''/g,j=/[a-zA-Z]/;function B(t,n,a){const r=d(),o=a?.locale??r.locale??s,i=a?.firstWeekContainsDate??a?.locale?.options?.firstWeekContainsDate??r.firstWeekContainsDate??r.locale?.options?.firstWeekContainsDate??1,c=a?.weekStartsOn??a?.locale?.options?.weekStartsOn??r.weekStartsOn??r.locale?.options?.weekStartsOn??0,u=e(t);if(!$(u))throw new RangeError("Invalid time value");let l=n.match(O).map((e=>{const t=e[0];return"p"===t||"P"===t?(0,I[t])(e,o.formatLong):e})).join("").match(N).map((e=>{if("''"===e)return{isToken:!1,value:"'"};const t=e[0];if("'"===t)return{isToken:!1,value:F(e)};if(T[t])return{isToken:!0,value:e};if(t.match(j))throw new RangeError("Format string contains an unescaped latin alphabet character `"+t+"`");return{isToken:!1,value:e}}));o.localize.preprocessor&&(l=o.localize.preprocessor(u,l));const m={firstWeekContainsDate:i,weekStartsOn:c,locale:o};return l.map((e=>{if(!e.isToken)return e.value;const r=e.value;return(!a?.useAdditionalWeekYearTokens&&function(e){return D.test(e)}(r)||!a?.useAdditionalDayOfYearTokens&&function(e){return P.test(e)}(r))&&function(e,t,n){const a=function(e,t,n){const a="Y"===e[0]?"years":"days of the month";return`Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${a} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`}(e,t,n);if(console.warn(a),W.includes(e))throw new RangeError(a)}(r,n,String(t)),(0,T[r[0]])(u,r,o.localize,m)})).join("")}function F(e){const t=e.match(Y);return t?t[1].replace(z,"'"):e}const A="f9f500425848431297e232002243001",_=e=>{const t=document.querySelector("body");e?(t.style.position="fixed",t.style.top=`-${window.scrollY}px`,t.style.width="100%",t.style.height="100%"):(t.style.position="",t.style.top="",t.style.width="",t.style.height="")},J=document.querySelector(".search-location-input");J.addEventListener("input",(e=>{V.classList.add("show");const t=e.target.value;""===e.target.value&&V.classList.remove("show"),(async e=>{const t=await fetch(`https://api.weatherapi.com/v1/search.json?key=${A}&q=${e}`),n=await t.json();Q(n)})(t)}));const U=document.querySelector(".search-options-container"),Q=e=>{U.classList.toggle("show",e.length>0),U.innerHTML="",e.forEach((e=>{const t=document.createElement("div");t.classList.add("location-option"),t.innerHTML=`\n            <h3>${e.name}</h3>\n            <p>${e.region}, ${e.country}</p>\n        `,U.appendChild(t),t.addEventListener("click",(()=>{X(`${e.name}, ${e.name===e.region?e.country:e.region}`,e.url)}))}))},G=document.querySelector(".loader");_(!0);const X=(e,t)=>{document.querySelector(".current-location").value=e,J.value=e,U.innerHTML="",U.classList.remove("show"),V.classList.add("show"),R(t),oe(t),localStorage.setItem("currentLocation",e)},R=async e=>{const t=await fetch(`https://api.weatherapi.com/v1/current.json?key=${A}&q=${e}`),n=await t.json();return re(n),ae(n),G.classList.add("hide"),_(!1),n},V=document.querySelector(".clear-search-button");V.addEventListener("click",(()=>{J.value="",U.innerHTML="",V.classList.remove("show")}));const K=document.getElementById("temperature"),Z=document.getElementById("weather-status-icon"),ee=document.getElementById("weather-description"),te=document.getElementById("feels-like"),ne=document.getElementById("pressure"),ae=e=>{const{condition:t}=e.current,n=ye(t.icon);Z.src=n},re=async e=>{const t=localStorage.getItem("tempUnit"),n=localStorage.getItem("speedUnit"),{temp_c:a,temp_f:r,condition:o,pressure_mb:i,feelslike_c:c,feelslike_f:s,gust_kph:u,gust_mph:d,wind_kph:l,wind_mph:m}=e.current;K.innerHTML=`${"celcius"===t?a:r}°`,ee.innerHTML=o.text,te.innerHTML=`Feels like ${"celcius"===t?c:s}°`,ne.innerHTML=`${i} mb`,ge.innerHTML=`${"km/h"===n?u:d} ${n}`,ue.innerHTML=`${"km/h"===n?l:m} ${n}`},oe=async(e,t=6,n="no",a="yes")=>{const r=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${A}&q=${e}&days=${t}&aqi=${n}&alerts=${a}`),o=await r.json();fe(o),be(o),Se(o)},ie=document.getElementById("min-temp"),ce=document.getElementById("max-temp"),se=document.getElementById("chance-of-rain"),ue=document.getElementById("wind"),de=document.getElementById("sunrise"),le=document.getElementById("sunset"),me=document.getElementById("uv-index"),he=document.getElementById("humidity"),ge=document.getElementById("gusts"),fe=e=>{const t=localStorage.getItem("tempUnit"),n=e.forecast.forecastday[0];ie.innerHTML=`${"celcius"===t?n.day.mintemp_c:n.day.mintemp_f}°`,ce.innerHTML=`${"celcius"===t?n.day.maxtemp_c:n.day.maxtemp_f}°`,se.innerHTML=`${n.day.daily_chance_of_rain}%`,de.innerHTML=`${n.astro.sunrise}`,le.innerHTML=`${n.astro.sunset}`,me.innerHTML=`${n.day.uv}`,he.innerHTML=`${n.day.avghumidity}%`},pe=document.querySelector(".hourly-cards-container"),we=e=>{let t=e<12?e:e-12;return 0===t&&(t=12),`${t} ${e<12?"AM":"PM"}`},ye=e=>`assets/icons/${e.match(/day|night/g)[0]}/${e.match(/\d+/g)[2]}.svg`,be=t=>{pe.innerHTML="";const n=t.location.localtime;let a=e(new Date(n)).getHours();a+8>23&&(a=16);for(let e=0;e<8;e++){if(a>23)return;const{condition:e}=t.forecast.forecastday[0].hour[a],n=ye(e.icon),r=document.createElement("div");r.classList.add("hourly-card");const o=document.createElement("span");o.classList.add("hour-text","small-text","dark-text"),o.innerHTML=we(parseInt(a));const i=document.createElement("img");i.classList.add("weather-icon"),i.src=n;const c=document.createElement("p");c.classList.add("temp-text","dark-text"),r.appendChild(o),r.appendChild(i),r.appendChild(c),pe.appendChild(r),a++}},ve=document.querySelector(".week-cards-container"),Se=e=>{const t=localStorage.getItem("tempUnit");ve.innerHTML="";const{forecastday:n}=e.forecast;n.forEach((e=>{const n=document.createElement("div");n.classList.add("week-card");const a=document.createElement("div");a.classList.add("icon-container");const r=document.createElement("img");r.classList.add("week-brief-card-icon"),r.src=ye(e.day.condition.icon),a.appendChild(r),n.appendChild(a),ve.appendChild(n);const o=document.createElement("div");o.classList.add("week-details-container"),n.appendChild(o);const i=document.createElement("div");i.classList.add("date");const c=document.createElement("p");c.classList.add("day-name"),c.innerHTML=B(new Date(1e3*e.date_epoch),"iii");const s=document.createElement("p");s.classList.add("date"),s.innerHTML=B(new Date(1e3*e.date_epoch),"dd MMM");const u=document.createElement("div");u.classList.add("temp-details");const d=document.createElement("div");d.classList.add("min");const l=document.createElement("p");l.classList.add("temp"),l.innerHTML=`${"celcius"===t?e.day.mintemp_c:e.day.mintemp_f}°`;const m=document.createElement("p");m.classList.add("temp-label"),m.innerHTML="min",d.appendChild(l),d.appendChild(m);const h=document.createElement("div");h.classList.add("max");const g=document.createElement("p");g.classList.add("temp"),g.innerHTML=`${"celcius"===t?e.day.maxtemp_c:e.day.maxtemp_f}°`;const f=document.createElement("p");f.classList.add("temp-label"),f.innerHTML="max",h.appendChild(g),h.appendChild(f),u.appendChild(d),u.appendChild(h),o.appendChild(i),i.appendChild(c),i.appendChild(s),o.appendChild(u)}))},Me=document.querySelector(".setting-box");document.querySelector(".config-button").addEventListener("click",(()=>{Me.classList.toggle("hide")}));const Le=document.querySelector(".temp-unit"),ke=document.querySelector(".speed-unit"),Te=document.querySelector(".theme-name"),Ee=(localStorage.getItem("tempUnit")?localStorage.getItem("tempUnit"):localStorage.setItem("tempUnit","celcius"),localStorage.getItem("speedUnit")?localStorage.getItem("speedUnit"):localStorage.setItem("speedUnit","km/h"),localStorage.getItem("themeName")?localStorage.getItem("themeName"):localStorage.setItem("themeName","light"),localStorage.getItem("defaultLocation")?localStorage.getItem("defaultLocation"):localStorage.setItem("defaultLocation","San Jose, CR")),xe=(localStorage.getItem("currentLocation")?localStorage.getItem("currentLocation"):localStorage.setItem("currentLocation","San Jose, CR"),()=>{Le.innerHTML=localStorage.getItem("tempUnit")||"celcius",ke.innerHTML=localStorage.getItem("speedUnit")||"km/h",Te.innerHTML=localStorage.getItem("themeName")||"light";const e=localStorage.getItem("themeName");document.querySelector(".pinned-location").value=localStorage.getItem("defaultLocation"),document.querySelector(".current-location").value=localStorage.getItem("currentLocation"),Oe(),He(e)});document.querySelector(".temp-unit-selector").addEventListener("click",(()=>{const e=document.querySelector(".temp-unit").innerHTML;qe("celcius"===e?"fahrenheit":"celcius")}));const qe=e=>{localStorage.setItem("tempUnit",e),xe();const t=localStorage.getItem("currentLocation")?localStorage.getItem("currentLocation"):localStorage.setItem("currentLocation","San Jose, CR");X(t,t)};document.querySelector(".speed-unit-selector").addEventListener("click",(()=>{const e=document.querySelector(".speed-unit").innerHTML;Ce("km/h"===e?"mph":"km/h")}));const Ce=e=>{localStorage.setItem("speedUnit",e),xe();const t=localStorage.getItem("currentLocation")?localStorage.getItem("currentLocation"):localStorage.setItem("currentLocation","San Jose, CR");X(t,t)},He=e=>{const t=document.querySelector("body"),n=document.querySelector(".theme-name");localStorage.setItem("themeName",e),"light"===e&&(n.innerHTML="light",t.classList.remove("dark-theme"),De.setAttribute("d",Pe)),"dark"===e&&(t.classList.add("dark-theme"),De.setAttribute("d",Ie),n.innerHTML="dark")},Ie="M21.64 13a1 1 0 0 0-1.05-.14a8.05 8.05 0 0 1-3.37.73a8.15 8.15 0 0 1-8.14-8.1a8.59 8.59 0 0 1 .25-2A1 1 0 0 0 8 2.36a10.14 10.14 0 1 0 14 11.69a1 1 0 0 0-.36-1.05m-9.5 6.69A8.14 8.14 0 0 1 7.08 5.22v.27a10.15 10.15 0 0 0 10.14 10.14a9.79 9.79 0 0 0 2.1-.22a8.11 8.11 0 0 1-7.18 4.32Z",Pe="M12 2c.41 0 .75.34.75.75v1.5a.75.75 0 01-1.5 0v-1.5c0-.41.34-.75.75-.75zm0 15a5 5 0 100-10 5 5 0 000 10zm0-1.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7zm9.25-2.75a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM12 19c.41 0 .75.34.75.75v1.5a.75.75 0 01-1.5 0v-1.5c0-.41.34-.75.75-.75zm-7.75-6.25a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zm-.03-8.53c.3-.3.77-.3 1.06 0l1.5 1.5a.75.75 0 01-1.06 1.06l-1.5-1.5a.75.75 0 010-1.06zm1.06 15.56a.75.75 0 11-1.06-1.06l1.5-1.5a.75.75 0 111.06 1.06l-1.5 1.5zm14.5-15.56a.75.75 0 00-1.06 0l-1.5 1.5a.75.75 0 001.06 1.06l1.5-1.5c.3-.3.3-.77 0-1.06zm-1.06 15.56a.75.75 0 101.06-1.06l-1.5-1.5a.75.75 0 10-1.06 1.06l1.5 1.5z",De=document.querySelector(".theme-icon").querySelector("path");document.querySelector(".theme-selector").addEventListener("click",(()=>{const e=document.querySelector(".theme-name").innerHTML;He("light"===e?"dark":"light")}));const We=document.querySelector(".location-modal-container");document.querySelector(".location-selector").addEventListener("click",(()=>{We.classList.toggle("hide"),_(!0)}));const $e=document.querySelector(".close-location-modal-button"),Ne=()=>{We.classList.add("hide"),_(!1)};$e.addEventListener("click",Ne),window.addEventListener("click",(e=>{e.target===We&&Ne()})),document.querySelector(".save-location-button").addEventListener("click",(()=>{const e=JSON.parse(localStorage.getItem("savedLocations"))||[],t=document.querySelector(".current-location");e.push(t.value),localStorage.setItem("savedLocations",JSON.stringify(e)),Oe()}));const Oe=()=>{const e=JSON.parse(localStorage.getItem("savedLocations"))||[],t=document.querySelector(".saved-locations-container");if(t.innerHTML="",0!==e.length)e.forEach(((e,n)=>{const a=document.createElement("div");a.classList.add("saved-location");const r=document.createElement("p");r.innerHTML=e,a.appendChild(r),a.innerHTML+='<svg color="#445353"\n\tfill="currentColor"\n\tclass="remove-saved-location-button"\n\taria-hidden="true"\n\twidth="20"\n\theight="20"\n\tviewBox="0 0 20 20"\n\txmlns="http://www.w3.org/2000/svg">\n\t<path\n\td="M10 2a8 8 0 110 16 8 8 0 010-16zM7.8 7.11a.5.5 0 00-.63.06l-.06.07a.5.5 0 00.06.64L9.3 10l-2.12 2.12-.06.07a.5.5 0 00.06.64l.07.06c.2.13.47.11.64-.06L10 10.7l2.12 2.12.07.06c.2.13.46.11.64-.06l.06-.07a.5.5 0 00-.06-.64L10.7 10l2.12-2.12.06-.07a.5.5 0 00-.06-.64l-.07-.06a.5.5 0 00-.64.06L10 9.3 7.88 7.17l-.07-.06z"\n\tfill="currentColor"></path>\n</svg>',a.querySelector("svg").addEventListener("click",(()=>{Ye(n)})),t.appendChild(a),a.addEventListener("click",(()=>{X(e,e)}))}));else{const e=document.createElement("div");e.classList.add("saved-location","text-center");const n=document.createElement("p");n.innerHTML="No saved locations...",e.appendChild(n),t.appendChild(e)}},Ye=e=>{const t=JSON.parse(localStorage.getItem("savedLocations"));t.splice(e,1),localStorage.setItem("savedLocations",JSON.stringify(t)),Oe()};document.querySelector(".set-default-location-button").addEventListener("click",(()=>{const e=document.querySelector(".pinned-location"),t=document.querySelector(".current-location");localStorage.setItem("defaultLocation",t.value),e.value=localStorage.getItem("defaultLocation"),localStorage.setItem("defaultLocation",e.value)})),xe(),Ee?X(Ee,Ee):X("San Jose, CR","San Jose, CR")})();