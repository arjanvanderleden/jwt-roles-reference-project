const passport = require('passport');  
const passportJWT = require('passport-jwt');  
const users = require('../users/users.js');  
const config = require('../config.js');  
const ExtractJwt = passportJWT.ExtractJwt;  
const Strategy = passportJWT.Strategy;  
const cookie = require('cookie');

var params = {  
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromExtractors([
        (req) =>{
            let token = null;
            if (req && req.headers && req.headers.cookie){
                var cookies = cookie.parse(req.headers.cookie);
                token = cookies['jwt'];
            }
            return token;
        }
    ])
};


module.exports = function() {  
    var strategy = new Strategy(params, function(payload, done) {
        var user = users.find(u=>u.id==payload.id) || null;
        if (user) {
            return done(null, {
                id: user.id,
                roles:user.roles,
                name:user.name,
                email:user.email
            });
        } else {
            return done(null,null);
        }
    });
    passport.use(strategy);
    
    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate('jwt', config.jwtSession);
        }
    };

    
};

