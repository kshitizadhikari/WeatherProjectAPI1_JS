const express = require("express");
const https = require("https");

const app = express();

app.get("/", function (req, res) {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=Kathmandu&units=metric&appid=436fecc4a8aee0790c13604163a6d541";

  https.get(url, function (api_response) {
    console.log(api_response.statusCode);

    api_response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const location = weatherData.name;
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icondID = weatherData.weather[0].icon;
      const imageURL =
        "https://openweathermap.org/img/wn/" + icondID + "@2x.png";
      res.write("<h1>Weather in " + location + "</h1>");
      res.write("<p>Temperature: " + temp + "°C</p>");
      res.write("<p>Description: " + description + "</p>");
      res.write("<h2>ID: " + icondID + "</h2>");
      res.write('<img src="' + imageURL + '" alt="Weather Icon">');
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server started at port 30000");
});
