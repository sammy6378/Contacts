const jwt = require('jsonwebtoken');

const authMiddleware = async (req,res, next) => {
    try {
        const token = req.headers.token;
        if(!token) {
            return res.json({success: false, message: "Authorization failed"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
        
    } catch (error) {
        console.log();
    }
}

module.exports = authMiddleware; 