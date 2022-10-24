const mongoose = require('mongoose')
const router = require('express').Router()
const shortUrl = require('../models/shortUrl');
const alert = require('alert')

router.get('*', async (req, res)=>{
    if(req.params[0] === '/already_exists')
        alert('User already exists')
    const shortUrls = await shortUrl.find();

    res.render('index', {shortUrls: shortUrls})
})


router.post('/shortUrls', async (req, res)=>{
    const url = await shortUrl.findOne({full: req.body.fullUrl});
    if(url != null){
        res.redirect('/already_exists')
    }else{
        const newRecord =  await shortUrl.create({full: req.body.fullUrl});
        res.redirect('/')
    }
})

router.get('/:shortUrl', async (req, res)=>{
    const short = await shortUrl.findOne({short: req.params.shortUrl})
    if(short === null)return res.sendStatus(404);
    short.clicks++;
    short.save()
    res.redirect(short.full)
})



module.exports = router