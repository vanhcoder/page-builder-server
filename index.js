const express = require('express');
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();
let cors = require("cors");


const routerPage = require('./routers/Pages');
const routerSection = require('./routers/Sections');


function run() {     
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.URL_MONGO).then(()=>{
            console.log("Connected to db");
        }).catch(err => console.log(err));
} 

app.use(cors());
app.use(express.json());
app.use("/api/v1/page" , routerPage);
app.use("/api/v1/section" , routerSection);

app.listen(8000,()=>{
    run();
    console.log('Server running at http://localhost:8000');
});