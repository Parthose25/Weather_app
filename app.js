require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const axios = require("axios");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.set("view engine","ejs" );
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("home");
});

app.post("/",async (req,res)=>{
    const query = req.body.cityName;
    const units = "metric";
    try {
         await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${process.env.APIKEY}&units=${units}`).then(response=>{
            if(response.data){
                const temp=response.data.main.temp;
                const desc=response.data.weather[0].description;
                const icon = response.data.weather[0].icon;
                const img = "https://openweathermap.org/img/wn/" + icon +"@2x.png";
                res.render("weather",{desc,temp,img,query});
            }
        });  
    } catch (error) {
        console.log(error);
    }
    
    
});






const PORT=process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log(`Server is running on the port ${PORT}`);
});