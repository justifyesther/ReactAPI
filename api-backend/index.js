const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Crypto = require('crypto');
const bearerToken = require('express-bearer-token')

const mysql = require('mysql');

var port = process.env.PORT || 2000;

var app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(bearerToken());

app.get('/', (req,res) => {
    res.send('<h1> SELAMAT DATANG DI API ! </h1>')
})

app.get('/testEncrypt', (req,res) => {
    var hashPassword = Crypto.createHmac("sha256","abc123") //parameter 1 sudah tetap kalau parameter 2 yaitu scret key jadi bebas (lihat dokumentasinya)
                        .update(req.query.password)
                        .digest("hex"); //pakai hmac itu oneway tidak ada functionnya
    console.log(hashPassword);
    res.send(`Password anda  ${req.query.password} di encrypt menjadi ${hashPassword}. 
    Panjangnya = ${hashPassword.length}`);
})

const {
    authRouter,
    adminRouter
}= require('./routers')

app.use('/auth', authRouter);
app.use('/admin', adminRouter);

app.listen(port, () => console.log('API aktif di port' + port));