var jwt = require('jwt-simple'); 
const users = require('../users/users');
const config = require('../config');
const moment = require('moment');


const routes = {
    index : index,
    post_login : post_login,
    get_login_form : get_login_form,
    error:error
}

function index(req,res,next){
    const content = `
<html>
    <head>
        <style type="text/css">body {font-family:trebuchet ms;}</style>
    </head>
    <body>
        <h1>URL: ${req.url}</h1>
        <div>User name: ${req.user?req.user.name:'no user'}</div>
        <div>User roles: ${req.user?req.user.roles:'no user'}</div>
        <h2> Go to
        <ul>
            <li><a href="/login">login</a></li>
            <li><a href="/check-sales">check-sales</a></li>
            <li><a href="/check-owner">check-owner</a></li>
            <li><a href="/check-retailer">check-retailer</a></li>
            <li><a href="/check-premium-retailer">check-premium-retailer</a></li>
        </ul>        
    </body>
</html>`;
    res.type('text/html');
    res.send(content);
}

function post_login(req,res,next){
    if (req.body.email && req.body.password) {
        
        var email = req.body.email;
        var password = req.body.password;
        var user = users.find(function(u) {
            return u.email === email && u.password === password;
        });

        if (user) {
            var payload = {
                id: user.id
            };

            var token = jwt.encode(payload, config.jwtSecret);
            var expireDate = moment().add(1,'days').toDate();
            
            // create and set cookie
            res.cookie('jwt', token, {
                httpOnly: true,
                expires: expireDate
            });
            
            // send back a redirect
            res.redirect(302, '/');
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
}

function get_login_form(req,res,next){
    const content = getLoginForm();
    res.type('text/html');
    res.send(content)
}



function error(req , res, next){
    const content = errorBody();
    res.send(content)
  }

module.exports = routes;


function errorBody(error){
    return `
    <html>
        <head>
            <style type="text/css">body {font-family:trebuchet ms;}</style>
        </head>
        <body>
            <p>Oeps</p>
            <a href="/"> Home </a>
        </body>
    </html>`
}

function userOption(user){
    return `<option value="${user.email}">${user.email}</option>`
}

function getLoginForm(){
    return `<html>
    <head>
        <style type="text/css">body {font-family:trebuchet ms;}</style>
    </head>
    <body>
        <form method="POST" action="login" enctype="application/x-www-form-urlencoded>">
            <label>
                Email <br/>
                <select name="email">
                    ${users.map(userOption)}
                </select>
            </label>
            <br/>
            <label>
                Password <br/>
            <input type="text" name="password" placeholder="password" value="--xx--"/>
            </label>
            <br/>
            <input type="submit"/>
        </form>
    </body>
</html>`;
}