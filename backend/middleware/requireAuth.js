const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {

    //verify if user is authenticated
    const { authorization } = req.headers;

    if (!authorization)
        return res.status(401).json({ error: 'Authorization token required!' });

    //bearer kjasdiaosdkj.jasiodiowkao.iosakdoiaksodsk
    const token = authorization.split(' ')[1];

    try {
        const { _id } = jwt.verify(token, process.env.SECRET); //verify and get id from token

        //attach user property to req object so we can acces it in our controller functions
        req.user = await User.findOne({ _id }).select('_id'); //and it will only have '_id' attached to it
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Request is not authorized!' });
    }
}

module.exports = requireAuth;