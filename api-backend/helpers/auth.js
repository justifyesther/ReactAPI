const jwt = require('jsonwebtoken');

module.exports = {
    auth: (req,res,next) => {
        //console.log(req.method)
        if (req.method !== "OPTIONS") {
            //let success == true;
            jwt.verify(req.token, "KenyanginAja", (error, decoded) => {
                if(error) {
                    //success = false;
                    return res.status(401).json({message: "User not Authorized", error: "User not Authorized"})
                }
                console.log(decoded) //hasil nya berubah objek yg propertinya id
                req.user = decoded; //cara akses : req.user.id
                next(); //lanjut ke function selanjutnya
            })
        } else {
            next();
        }
    }
}