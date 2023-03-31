const express = require('express');
const port = 1428;
//7 Install cookie parser
const cookieParser = require('cookie-parser');

const app = express();

// 7 set The Cookie Parser
app.use(express.urlencoded());
app.use(cookieParser());

// 4 Use Static Files
app.use(express.static('./assets'));
// 6 Connect To The MongoDB
const db = require('./config/mongoose');
// 3 Use Express Ejs Layout
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
// 5 link css inside head 
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// 1 Use Express Router
app.use('/',require('./routes'));

// 2 Set up the View Engine
app.set('view engine','ejs');
app.set('views','./views');


app.listen(port,function(err){
    if(err){
        console.log('Server Is Not Running',err);
    }
    console.log('Server Is Running On Port',port);
});