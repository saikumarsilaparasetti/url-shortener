const express = require('express');
const dotenv = require('dotenv').config();

const mongoose = require('mongoose')
const routes = require('./routes/routes')
const shortUrl = require('./models/shortUrl');

mongoose.connect('mongodb://localhost:27017/urlShortner');
// mongoose.connect(process.env.MONGOOSE_URL ,{ useNewUrlParser: true ,useUnifiedTopology: true});
mongoose.connection.on('connected', ()=>{
    console.log('Connected to database');
})
mongoose.connection.on('error', (err)=>{
    if(err)
        console.log('Error Connecting to database'+err);
})


const app = express();
app.use(express.urlencoded({extended: true}));


app.set('view engine' , 'ejs');

app.use(routes)

app.listen(process.env.PORT , ()=>{
    console.log('App is running on: ', process.env.PORT)
})

