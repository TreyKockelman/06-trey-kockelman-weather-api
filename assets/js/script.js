const weatherDays = []  
let currDay = null



// sampleData.list.forEach( function(tsObj){

//   // Makes a moment date object for each record
//   const dateObj = moment.unix(tsObj.dt)

//   // Generate the day # for the day in the date object
//   const dateNum = dateObj.format("DDD")

//   // If the current date in tsObj hasn't had a record put into weatherDays, do that now 
//   // Then skip over all other records for this day
//   if( dateNum !== currDay && weatherDays.length < 5 ){
//     weatherDays.push( tsObj )
//     currDay = dateNum
//   }

// })

function getAPI(city) {
  fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=b6d9290b58c34b6ad6a2f5f35449e3ec')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    })
  };

$('#submitBtn').on('click', function(event) {
  event.preventDefault()
  var searchInput = $('#city-input').val();
  console.log(searchInput);
  getAPI(searchInput);
});