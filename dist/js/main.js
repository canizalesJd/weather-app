(()=>{const e="f9f500425848431297e232002243001",n=document.querySelector(".search-location-input");n.addEventListener("input",(n=>{o.classList.add("show");const t=n.target.value;""===n.target.value&&o.classList.remove("show"),(async n=>{const t=await fetch(`http://api.weatherapi.com/v1/search.json?key=${e}&q=${n}`),a=await t.json();c(a)})(t)}));const t=document.querySelector(".search-options-container"),c=e=>{t.innerHTML="",e.forEach((e=>{const n=document.createElement("div");n.classList.add("location-option"),n.innerHTML=`\n            <h3>${e.name}</h3>\n            <p>${e.country}</p>\n        `,t.appendChild(n),n.addEventListener("click",(()=>{a(`${e.name}, ${e.country}`,e.url)}))}))},a=(e,c)=>{n.value=e,t.innerHTML="",i(c),h(c)},i=async n=>{const t=await fetch(`http://api.weatherapi.com/v1/current.json?key=${e}&q=${n}`),c=await t.json();return y(c),l(c),c},o=document.querySelector(".clear-search-button");o.addEventListener("click",(()=>{n.value="",t.innerHTML="",n.focus()}));const s=document.getElementById("temperature"),r=document.getElementById("weather-status-icon"),d=document.getElementById("weather-description"),m=document.getElementById("feels-like"),u=document.getElementById("pressure"),l=e=>{const{condition:n}=e.current,t=`assets/icons/${n.icon.match(/day|night/g)[0]}/${n.icon.match(/\d+/g)[2]}.svg`;r.src=t},y=async e=>{const{temp_c:n,condition:t,pressure_mb:c}=e.current;s.innerHTML=`${n}°`,d.innerHTML=t.text,m.innerHTML=`Feels like ${e.current.feelslike_c}°`,u.innerHTML=`${c} mb`},h=async(n,t=6,c="no",a="yes")=>{const i=await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${e}&q=${n}&days=${t}&aqi=${c}&alerts=${a}`),o=await i.json();w(o)},p=document.getElementById("min-temp"),$=document.getElementById("max-temp"),L=document.getElementById("chance-of-rain"),g=document.getElementById("wind"),E=document.getElementById("sunrise"),H=document.getElementById("sunset"),M=document.getElementById("uv-index"),T=document.getElementById("humidity"),v=document.getElementById("gusts"),w=e=>{const n=e.forecast.forecastday[0];p.innerHTML=`${n.day.mintemp_c}°`,$.innerHTML=`${n.day.maxtemp_c}°`,L.innerHTML=`${n.day.daily_chance_of_rain}%`,g.innerHTML=`${n.day.maxwind_kph} km/h`,E.innerHTML=`${n.astro.sunrise}`,H.innerHTML=`${n.astro.sunset}`,M.innerHTML=`${n.day.uv}`,T.innerHTML=`${n.day.avghumidity}%`,v.innerHTML=`${n.day.maxwind_kph} km/h`}})();