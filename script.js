

const apiKey = 'b2f13b9b8cmshc4c764fc359fd3ap10eddejsna062aaa34762';
const apiHost = 'weatherapi-com.p.rapidapi.com';

const cityform = document.getElementById('d-flex');
const weatherDataContainer = document.getElementById("weather-data");
const weatherDataContainer2 = document.getElementById("weather2data");
const stripe = document.getElementById("l-stripe");
const tempc = document.getElementById("tempc");
const context = document.getElementById("context");
const icon = document.getElementById("icon");
const feel = document.getElementById("reelfeel");
cityform.addEventListener('submit',async(e)=>{
   e.preventDefault();
   const cityInput = document.getElementById('city');
   const city = cityInput.value.trim();
   if(city){
      const geourl =  `https://geocoding-by-api-ninjas.p.rapidapi.com/v1/geocoding?city=${city}`;
      const options1 = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': 'b2f13b9b8cmshc4c764fc359fd3ap10eddejsna062aaa34762',
          'x-rapidapi-host': 'geocoding-by-api-ninjas.p.rapidapi.com'
        }
      };
       await fetch(geourl, options1)
        .then(response =>{
           return response.json();
        })
        .then(data =>{
          console.log(data);
          const lat = data[0].latitude;
          const long = data[0].longitude;
        
          const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${lat}%2C${long}`;
          const options = {
            method: 'GET',
            headers: {
              'x-rapidapi-key': apiKey,
              'x-rapidapi-host': apiHost
            }
          }; 
          fetch(url, options)
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json(); // parse response as JSON
            })
            .then(data => {
              /* 
               <h1>Weather in ${data.location.name}</h1>
                   <p> <span className="image-holder"></span>Temperature:${data.current.temp_c}°C</p>  
                 <p>Humidity: ${data.current.humidity}%</p>
                  <p>Wind:span<className="image-holder"></span>${data.current.wind_kph}</p>
                  <p>Pressure:${data.current.pressure_mb}</p>
                  <p>visibility:${data.current.vis_km}</p>
                   <p>UV:${data.current.uv}
                   </p>gust:${data.current.gust_kph} <p></p> <p></p> <p></p> <p></p> <p></p> <p></p>

               */
                 // weatherDataContainer.innerHTML = weatherdata;
                  const name = data.location.name;
                  const state = data.location.region;
                  const time = data.location.localtime; 
                  const country = data.location.country;
                  const rfeel = data.current.feelslike_c;
                  const locationdata = `
                     <p>${name}, ${state}, ${country} As of ${time}</p>    
                  `;
                 stripe.innerHTML = locationdata;
                 tempc.innerHTML = `<p>${data.current.temp_c}°C</p>`;
                 context.innerHTML = data.current.condition.text;
                 icon.innerHTML = `<img src="${data.current.condition.icon}" alt="Image">`;
                 feel.innerHTML= `${rfeel}°C`;
                  
            
                 
                const wind =  document.getElementById('wind');
                wind.innerHTML=`<img src="https://cdn-icons-png.flaticon.com/128/2011/2011448.png">&nbsp Wind &nbsp &nbsp &nbsp &nbsp ${data.current.wind_dir} &nbsp ${data.current.wind_kph} km/h`;
              

                document.getElementById("humidity").innerHTML=`Humidity: ${data.current.humidity}%`;

                document.getElementById("dewpoint").innerHTML=`Dew Point: ${data.current.dewpoint_c}`;

                document.getElementById('pressure').innerHTML=`Pressure: ${data.current.pressure_mb}`;

                document.getElementById('uvindex').innerHTML=`UV Index: ${data.current.uv}`;

                document.getElementById('visibility').innerHTML=`Visibility: ${data.current.vis_km}KM`;

                document.getElementById('gust').innerHTML=`Wind Gust: ${data.current.gust_kph}`;
        
                

                





                 console.log(data); // data is now a JSON object
            }) 
            .catch(error => {
              console.error(error);
              weatherDataContainer.innerHTML = 'Error';
            });

        }) 

   }
  /* else {
       weatherDataContainer.innerHTML = 'Please enter a city name.';
   } */
});
