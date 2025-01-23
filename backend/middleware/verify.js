const jwt = require("jsonwebtoken");

//VERIFY TOKEN
// TO VERIFY AUTHENTICATED USER/USERS
const verify = (req, res, next) => {
    const token = req.cookies.jwt;

    if(!token){
        return res.status(401).json({success: false, message: 'Unauthorized User Access'});
    };

    try {
        //DESTRUCTURE THE TOKEN USING JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
                
        if(!decoded){
            return res.status(401).json({success: false, message: 'Invalide Token'});
        }
        req.userId = decoded.userId;
        next(); 

    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({success:false, message: 'Server Error'});   
    }
};

module.exports = verify;