const User = require('./../models/User');
const jwt = require('jsonwebtoken'); // jwt bisa mengenerate token yang ada datanya.                             

exports.isAuthenticated = async function(req, res, next) {
    const {bigProject_token} = req.cookies;
    if (!bigProject_token) {
        return res.status(403).json({
            success: false,
            message: 'Invalid jsonwebtoken!'
        })
    }
    const decode = jwt.verify(bigProject_token, process.env.JWT_SECRET);
    req.user = await User.findById(decode.id);
    next();
}