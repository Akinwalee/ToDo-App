const { response } = require('express');

const express = require('express'),
app = express(),
bodyParser = require('body-parser'),
https = require("https");

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));


app.set("view engine", "ejs")


let items = [];




app.get('/', (req, res) =>{


    // Getting Location Latitude and Longitude
    const lonLatUrl = "https://geo.ipify.org/api/v2/country,city?apiKey=at_fhAg2YyOICFlHTipqaZBBAhy54Q1A&ipAddress=8.8.8.8";
   https.get(lonLatUrl, (response)=>{
    response.on("data", (data)=>{
        const ipData = JSON.parse(data);
        let lat = ipData.location.lat,
        long = ipData.location.lng

//    Getting Weather Data
    let apiKey = "91271fb445cdec49736815ec23511568";
    url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&unit=metric&appid=${apiKey}&lang=en&&exclude=hourly,daily`;


    https.get(url, (response) => {
    
        response.on("data", (data) => {

        const weatherData = JSON.parse(data)

        // Customize Wether Status Display
        let weatherStatus;

        switch (weatherData.current.weather[0].main) {
            case "Clouds":
                weatherStatus = "Cloudy"
                break;
            case "Thunderstorm":
                    weatherStatus = "Stormy"
                    break;
            case "Drizzle":
                weatherStatus = "Drizzly"
                break;
            case "Rain":
                weatherStatus = "Rainy"
                break;
            case "Snow":
            weatherStatus = "Snowy"
                break;
            case "Atmosphere":
            weatherStatus = "Beautiful"
                break;
            case "Clear":
            weatherStatus = "Bright"
                break;
            default: "Beautiful"
                break;
        }


        // Get Current Date 
    const date = new Date(),

    options = {
        weekday: "long",
        day: "numeric",
        month: "long"
        },

    day = date.toLocaleDateString("en-US", options);

    let message = `It's a ${weatherStatus} ${day}`;

    // Render the heading text
    res.render("index", {message: message, newItem: items})

    })

})
    

})


})
    

})


// Handle Post Request

app.post("/", (req, res) => {
    let item = req.body.newTask
    items.push(item)
    res.redirect("/")
})

// Start Server

app.listen(3000, (req, res) =>{
    console.log(`server is successfully running on port 3000`);
})