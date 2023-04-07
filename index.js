const express = require('express');
const port = 1428;
//7 Install cookie parser
const cookieParser = require('cookie-parser');

const app = express();
const expressLayouts = require('express-ejs-layouts');
// 6 Connect To The MongoDB
const db = require('./config/mongoose');

// 8 Using Password To Authentication and Express Session For Cookie Max Age
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
// 9 Use Connect-Mongo To Store session Cookie
const MongoStore = require('connect-mongo')(session);
// 10 Sass Middleware
const sassMiddleware = require('node-sass-middleware')


// SassMiddleware Use
app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'expanded',
    prefix:'/css'

}));
// 7 set The Cookie Parser
app.use(express.urlencoded());
app.use(cookieParser());

// 4 Use Static Files
app.use(express.static('./assets'));

// 3 Use Express Ejs Layout
app.use(expressLayouts);
// 5 link css inside head 
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// 2 Set up the View Engine
app.set('view engine','ejs');
app.set('views','./views');
// After View Engine To Set Session  && Use To Store Session Cookie Using Mongo
app.use(session({
    name: "codeial",
    // to do change the secret before deployement in produnction mode
    secret: 'Khageshwar',
    saveUninitialized:'false',
    resave:'false',
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    // Store The Session Cookie
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove:'disabled'
        },
        function(err){
            console.log(err || 'Connect-Mongo-Setup');
        }
    )
    
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticationUser);
// 1 Use Express Router
app.use('/', require('./routes'));



app.listen(port,function(err){
    if(err){
        console.log('Server Is Not Running',err);
    }
    console.log('Server Is Running On Port',port);
});