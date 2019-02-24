const jwt = require('jsonwebtoken');

module.exports = {
    // createJWTToken: ((payload) => {
    //     return jwt.sign(payload,"JustifyEster", { expiresIn : '12h'})
    // });

    createJWTToken(payload){
        return jwt.sign(payload,"KenyanginAja", { expiresIn : '12h'})
    }
}