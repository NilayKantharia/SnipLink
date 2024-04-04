const express = require('express')
const router = express.Router()
const { response } = require('express');

const {handleGenerateNewShortURL,handleGetURLRequest,handleGetAnalyticsById} = require('../controllers/url')

router
    .route('/')
    .post(handleGenerateNewShortURL)

router.get('/:shortId',handleGetURLRequest)
router.get('/analytics/:shortid',handleGetAnalyticsById)

module.exports = router
