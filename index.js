const express = require('express');
const port = 1428;

const app = express();


app.listen(port,function(err){
    if(err){
        console.log('Server Is Not Running',err);
    }
    console.log('Server Is Running On Port',port);
});