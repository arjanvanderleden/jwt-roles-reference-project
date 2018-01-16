const express = require('express');  
const bodyParser = require('body-parser');  
const app = express();
const routes = require('./routes');
const passport = require("./auth/passport")();
const verify = require('./auth/roles');

const port = process.env['APP_PORT'] || 3013;
const host = process.env["APP_HOST"] || 'localhost';

app.use(bodyParser.urlencoded());  
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(verify.middleware());

app.use(passport.authenticate());
app.get('/', routes.index);
app.get('/error', routes.error);
app.get('/login', routes.get_login_form);
app.post('/login', routes.post_login);

//app.post('/login', routes.post_login);

app.get('/check-sales', verify.is('sales'),routes.index);
app.get('/check-owner', verify.is('owner'), routes.index);
app.get('/check-retailer', verify.is('retailer'), routes.index);
app.get('/check-premium-retailer', verify.is('premium-retailer'), routes.index);

app.use(routes.error);

let server;
app.listen(port,host, function(srvr) {  
    server = srvr;
    console.log(`Application running and listening on port ${port}`);
});

