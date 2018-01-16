const ConnectRoles = require('connect-roles');

/**
 * Initialize a new ConnectRoles object
 * Add rule sets below
 */
const user = new ConnectRoles({
    failureHandler: function (req, res, action) {
        res.status(403);
        res.redirect('/error');
    }
});


/**
 * creates a array from the user property roles
 * @param {*} user , the user form the request object
 * 
 */
function parseRoles(user){
    if (hasRoles(user)){
        return user.roles.split(';');
    }
    return [];    
}


/**
 * checks if a user has roles
 * @param {*} user , the user form the request object
 * 
 */
function hasRoles(user){
    if (user == null || user.roles == null || typeof(user.roles)!=='string') {
        return false;
    }
    return true;
}

/**
 * 
 * @param {*} roles array of roles
 * @param {*} role 
 */
function includesRole(roles,requiredRole){
    return roles.indexOf(requiredRole) > -1;
}

user.use('sales', function (req) {
    if (!hasRoles(req.user)) return false;
    const roles = parseRoles(req.user);
    if (includesRole(roles,'owner')) return true;
    if (includesRole(roles,'sales')) return true;
    return false;
});

user.use('owner', function (req) {
    if (!hasRoles(req.user)) return false;
    const roles = parseRoles(req.user);
    if (includesRole(roles,'owner')) return true;
    return false;
});

user.use('retailer', function (req) {
    if (!hasRoles(req.user)) return false;
    const roles = parseRoles(req.user);
    if (includesRole(roles,'owner')) return true;
    if (includesRole(roles,'retailer')) return true;
    if (includesRole(roles,'premium-retailer')) return true;
    return false;
});

user.use('premium-retailer', function (req) {
    if (!hasRoles(req.user)) return false;
    const roles = parseRoles(req.user);
    if (includesRole(roles,'owner')) return true;
    if (includesRole(roles,'premium-retailer')) return true;
    return false;
})

user.use('hero', function (req) {
    if (!hasRoles(req.user)) return false;
    const roles = parseRoles(req.user);
    if (includesRole(roles,'developer')) return true;
    return false;
})

module.exports = user;