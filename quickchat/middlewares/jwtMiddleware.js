const jwt = require('jsonwebtoken');

const jwtMiddleware =async (req, res, next) => {
    console.log('Inside JWT middleware');
    try {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json('Authorization header missing');
    }
    const tokenString = token.split(' ')[1];
    const jwtResponse = jwt.verify(tokenString, 'secretkeydevchat095');
    console.log('JWT response:', jwtResponse);
    req.payload = jwtResponse.userId;      
        next();
    } catch (err) {
        console.error('JWT verification failed:', err);
        return res.status(401).json('Token verification failed');
    }
};

module.exports = jwtMiddleware;
