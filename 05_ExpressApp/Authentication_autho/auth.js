const jwt = require('jsonwebtoken')

let auth = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (token && token.startsWith('Bearer')) {
            token = token.split(" ")[1]

            let decodedData = jwt.verify(token, '123');
            console.log(decodedData);
            req.user = { email: decodedData.email }
            next()
        } else {
            return res.status(499).json({ error: true, message: "Authentication failed: Token missing or invalid format" })
        }

    } catch (err){
        next(err)
    }

}
module.exports = auth;
