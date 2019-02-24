const conn = require('../database')

module.exports = {
    getuserList: (req,res) => {
        // res.send(req.user.id);
        console.log(req.user.id);
        return res.status(200).json({ idUser: req.user.id })
    }
}