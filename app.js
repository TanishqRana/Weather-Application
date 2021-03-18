//get lattitude and longitude of user location
window.addEventListener("load", () => {
  let long = 0;
  let lat;
  let $temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let $temperatureDegree = document.querySelector(".temperature-degree");
  let $locationArea = document.querySelector(".location-area");

  //This allows browser to access our current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      //This is a proxy to let api work on local host
      const proxy = "https://cors-anywhere.herokuapp.com/";
      //This is the api of darksky which gives us information on whethe
      const api = `${proxy}https://api.darksky.net/forecast/821ed78efec70c7f4b40a77d232a2c78/${lat},${long}`;
      //This requests darksky to send the desiered information
      fetch(api)
        //converting the response to json format
        .then(response => {
          return response.json();
        })
        //using the converted data to get desiered information
        .then(data => {
          console.log(data);
          const { temperature, summary, icon } = data.currently;
          const { timezone } = data;

          //set DOM Elements from the API
          $temperatureDegree.textContent = temperature;
          $temperatureDescription.textContent = summary;
          $locationArea.textContent = timezone;
          //Set Icon
          setIcons(icon, document.querySelector(".icon"));
          //Change temperature to Celsius/Farenheit
        });
      //This requests opencage geocoding to send the location from latitude and longitude
      var apikey = "0ca17ad747bc47cda7d9befe45827756";
      var latitude = lat;
      var longitude = long;

      var api_url = `${proxy}https://api.opencagedata.com/geocode/v1/json`;

      var request_url =
        api_url +
        "?" +
        "key=" +
        apikey +
        "&q=" +
        encodeURIComponent(latitude + "," + longitude) +
        "&pretty=1" +
        "&no_annotations=1";

      // see full list of required and optional parameters:
      // https://opencagedata.com/api#forward

      fetch(request_url)
        .then(response_location => {
          return response_location.json();
        })
        .then(data_location => {
          console.log(data_location);
          const { state, suburb } = data_location.results[0].components;
          $locationArea.textContent = timezone;
        });
    });
  }
  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.add(iconID, Skycons[currentIcon]);
  }
});
