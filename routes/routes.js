const mongoose = require('mongoose')
const router = require('express').Router()
const shortUrl = require('../models/shortUrl');

router.get('/', async (req, res)=>{
    const shortUrls = await shortUrl.find();

    res.render('index', {shortUrls: shortUrls})
})


router.post('/shortUrls', async (req, res)=>{
    await shortUrl.create({full: req.body.fullUrl});
    res.redirect('/')
})

router.get('/:shortUrl', async (req, res)=>{
    const short = await shortUrl.findOne({short: req.params.shortUrl})
    if(short === null)return res.sendStatus(404);
    short.clicks++;
    short.save()
    res.redirect(short.full)
})



module.exports = router