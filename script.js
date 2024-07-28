

const apiKey = 'b2f13b9b8cmshc4c764fc359fd3ap10eddejsna062aaa34762';
const apiHost = 'weatherapi-com.p.rapidapi.com';

const cityform = document.getElementById('d-flex');
const weatherDataContainer = document.getElementById('weather-data');

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
          const state = data[0].state;
          const country = data[0].country;
          const cityname = data[0].name;
        
        
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
              /* const tempf = data.main.temp;
               const tempc = (tempf-32)*5/9;
               const weatherDataHTML =`
                  <h2>Weather in ${city}</h2>
                 <p>Temperature: ${tempc.toFixed(2)}°C</p>
                 <p>Humidity: ${data.main.humidity}%</p>
                  <p>Weather Condition: ${data.weather[0].description}</p>
                  <p>Wind:${data.wind.speed}</p>
                  <p>Pressure:${data.main.pressure}</p>
                 
                 `; 
      
                 weatherDataContainer.innerHTML = weatherDataHTML;
             */
                 console.log(data); // data is now a JSON object
            }) 
            .catch(error => {
              console.error(error);
              weatherDataContainer.innerHTML = 'Error';
            });

        }) 

   }
   else {
       weatherDataContainer.innerHTML = 'Please enter a city name.';
   }
});
