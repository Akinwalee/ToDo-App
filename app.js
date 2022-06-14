const express = require('express'),
app = express(),
bodyParser = require('body-parser'),
https = require("https");

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));


app.set("view engine", "ejs")


let items = [];




app.get('/', (req, res) =>{
    // res.sendFile(__dirname + '/index.html');



    // Function for getting the heading text

    // navigator.geolocation.getCurrentPosition(function(position) {
    //     let lat = position.coords.latitude;
    //     let long = position.coords.longitude;
    
    //     console.log(lat , " ", long);

        

    let apiKey = "91271fb445cdec49736815ec23511568",
    lat = 6.5306624,
    long = 3.3521664,

    url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&unit=metric&appid=${apiKey}&lang=en&&exclude=hourly,daily`;


    console.log(url)

    https.get(url, (response) => {


        response.on("data", (data) => {
        

        const weatherData = JSON.parse(data)

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


         
    const date = new Date(),

    options = {
        weekday: "long",
        day: "numeric",
        month: "long"
        },

    day = date.toLocaleDateString("en-US", options)

    console.log(day);


    let message = `It's a ${weatherStatus} ${day}`;

    // Render the heading text
    res.render("index", {message: message, newItem: items})

    })

})


// End of heading text function.
    

})










app.post("/", (req, res) => {
    let item = req.body.newTask


    items.push(item)

    res.redirect("/")
})









app.listen(3000, (req, res) =>{
    console.log(`server is successfully running on port 3000`);








})