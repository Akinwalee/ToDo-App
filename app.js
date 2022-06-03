const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html')
    console.log(bodyParser);
})





app.listen(3000, (req, res) =>{
    console.log(`server is successfully running on port 3000`);
})