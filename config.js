config = {  
    jwtSecret: process.env['JWT_SECRET'] || 'MJTzEQo45pYTKRUKQ5HJinuJxHq9FiKXKtGkH4keThE6VtgKGB',
    jwtSession: {
        session: false
    }
};

module.exports = config;