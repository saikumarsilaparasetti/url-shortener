const express = require('express');
const dotenv = require('dotenv').config();

const mongoose = require('mongoose')

const shortUrl = require('./models/shortUrl');

// mongoose.connect('mongodb://localhost:27017/urlShortner');
mongoose.connect(process.env.MONGOOSE_URL ,{ useNewUrlParser: true ,useUnifiedTopology: true});
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

const port = 3000

app.get('/', async (req, res)=>{
    const shortUrls = await shortUrl.find();

    res.render('index', {shortUrls: shortUrls})
})


app.post('/shortUrls', async (req, res)=>{
    await shortUrl.create({full: req.body.fullUrl});
    res.redirect('/')
})

app.get('/:shortUrl', async (req, res)=>{
    const short = await shortUrl.findOne({short: req.params.shortUrl})
    if(short === null)return res.sendStatus(404);
    short.clicks++;
    short.save()
    res.redirect(short.full)
})
app.listen(process.env.PORT , ()=>{
    console.log('App is running on: ', process.env.PORT)
})

