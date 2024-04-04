const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')
const {restrictToLoggedInUsersOnly, checkAuth} = require('./middlewares/auth')

const { connectToMongoDB } = require('./connection')
const URL = require('./models/url')
const PORT = 8001

const urlRoute = require('./routes/url')
const staticRoute = require('./routes/staticRouter')
const userRoute = require('./routes/user')

connectToMongoDB('mongodb://127.0.0.1:27017/short-url').then( () => console.log('MongoDB Connected'));

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set("views",path.resolve("./views"));

app.use('/url', restrictToLoggedInUsersOnly, urlRoute);
app.use('/user', userRoute);
app.use('/', checkAuth, staticRoute);

app.get('/test', async (req, res) => {
    const allUrls = await URL.find({});
    return res.render('home',
    {urls : allUrls});
})


app.listen(PORT,() => {console.log(`Server started at PORT : ${PORT}`)});