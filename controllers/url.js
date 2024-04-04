const shortid = require('shortid')
const URL = require('../models/url');
const { response } = require('express');

async function handleGenerateNewShortURL(req,res){
    const body = req.body
    if(!body.url){
        return res.status(400).json({msg : "url is required"})
    }
    const shortID = shortid(8);
    await URL.create({
        shortId : shortID,
        redirectURL : body.url,
        visitHistory : [],
        createdBy : req.user._id,
    })
    return res.status(201).render('home',{id : shortID})
    // return res.status(201).json({id : shortID})
}

async function handleGetURLRequest(req,res){
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push:{
                visitHistory : {
                    timeStamp: Date.now()
                }
            }
        }
    )
    res.redirect(entry.redirectURL);
}

async function handleGetAnalyticsById(req,res){
    const shortId = req.params.shortid
    const entry = await URL.findOne({shortId}) 
    return res.json({
        totalClicks : entry.visitHistory.length,
        Analytics:entry.visitHistory 
    })
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetURLRequest,
    handleGetAnalyticsById
}