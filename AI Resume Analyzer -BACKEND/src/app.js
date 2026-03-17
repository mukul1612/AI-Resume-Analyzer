const express = require('express');
const authRoute = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');

const app= express();

app.use(cookieParser());

app.use(express.json());
app.use('/api/auth', authRoute);

    
module.exports= app;