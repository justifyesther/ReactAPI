const conn = require('../database');
const Crypto = require('crypto');
const transporter = require('../helpers/emailSend');
const { createJWTToken } = require('../helpers/jwt');

module.exports = {

    register: (req,res) => {
        var { username, password, email, phone } = req.body;
        var sql = `SELECT username from userKenyanginAja WHERE username = '${username}'`;
        conn.query(sql,(err, results) => {
        
            //if(err) throw err; //masuk ke catch
            //if(err) res.send({ status:'error', message: 'System Error'}); //gak keluar dari function masih lanjut
            if(err) {

                throw err;
                // res.send({ status:'error', message: 'System Error'});
                // res.end();
            }

            if(results.length > 0) {
                res.send({ status: 'error', message: 'Username has been taken!'})
            }
            else {
                var hashPassword = Crypto.createHmac("sha256","projectKenyanginAja") //catatan : projectKenyanginAja adalah sacret key
                                    .update(password)
                                    .digest("hex"); 
                var dataUSer = { 
                    username,
                    password: hashPassword,
                    email,
                    phone,
                    role: 'User',
                    status: 'Unverified',
                    lastlogin: new Date()
                }
                sql = `INSERT into userKenyanginAja SET ?` //catatan : tidak perlu var lagi karena uda ada di atas 
                conn.query(sql,dataUSer,(err1, results1) => {
                    
                    if(err1) {

                        throw err1;
                        // res.send({ status:'error', message: 'System Error Again'});
                        // res.end();
                    //catatan : kalau err1 jadi err nanti tidak akan di excute karena uda ada di atas "err"nya
                    }

                    var linkVeritifikasi = `http://localhost:3000/verified?username=${username}&password=${hashPassword}`;
                    var mailOptions = {
                        from: 'KenyanginAja.com <esterjustify1905@gmail.com>',
                        to: email,
                        subject: 'Verifikasi Email for Login KenyanginAja.com',
                        html: `Please Click Link Vertifikasi KenyanginAja.com : <a href ="${linkVeritifikasi}">Anda ingin bergabung dengan KenyanginAja.com? Silahkan klik link ini :)</a>`
                    }

                    transporter.sendMail(mailOptions, (err2,res2) => {  
                        if(err2) {

                            throw err2;
                            // res.send({ status: 'Error', message: 'Maaf, kirim ulang ke email'})
                        }
                        else {
                            console.log('Success!')
                            res.send({ username, email, role: 'User', status: 'Unverified', token: ''})
                        }
                    })
                })
            }
        })
    },
    signin: (req,res) => {

    },

    verified: (req,res) => {
        var {username,password} = req.body;
        var sql = `SELECT * from userKenyanginAja 
                   WHERE username='${username} 
                   and password='${password}'`
        conn.query(sql,(err,results) => {
            if(err) throw err;

            if(results.length > 0) {
                sql = `UPDATE user set status='Verified' WHERE id=${results[0].id}`; //terserah pakai properti apa jadi gak selalu id
                //update : lebih baik dikasih id
                conn.query(sql,(err1,results1) => {
                    if(err1) throw err1;

                    const token = createJWTToken({ id: results[0].id })
                    res.send({ 
                        username,
                        email: results[0].email,
                        role: results[0].role, //nembak langsung user boleh karena verified menggunakan user tapi kekurangannya kalau mau edit harus edit manual juga
                        status: 'Verified',
                        token,
                    })
                })
            }
            else {
                throw 'User not exist!';
            }
        })
    },
    
}