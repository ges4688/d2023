var jwt = require('jsonwebtoken');

_this = this

exports.authenticate = async function (token) {
    try {
        const decode = jwt.verify(token, process.env.SECRET);
        return decode;
    } catch (e) {
        console.log("error services",e)
        throw Error('Error while Authenticating');
    }
}