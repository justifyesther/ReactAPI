const nodemailer = require('nodemailer');

//cara pasang nodemailer :
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'esterjustify1905@gmail.com',
        pass: 'xbraoibjfekxrqid'   
    },
    tls: {
        rejectUnauthorized: false
    }
})

module.exports = transporter;