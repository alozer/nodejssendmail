var express = require('express');
var router = express.Router();
mailer = require('express-mailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/mail', function(req, res, next) {
  res.render('mail', { title: 'Mail' });
});

/* POST send mail*/
router.post('/sendmail', function(req, res, next){
    'use strict';
    const nodemailer = require('nodemailer');
    var fromemail = req.body.fromemail;
    var fromemailpassword = req.body.fromemailpassword;
    var toemail = req.body.toemail;
    var subject = req.body.subject;
    var body = req.body.body;
    /*console.log('1');
    console.log(fromemail);
    console.log(fromemailpassword);
    console.log(toemail);
    console.log(subject);
    console.log(body);*/
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: fromemail,// 'alozerdev@gmail.com',
            pass: fromemailpassword//'Analyse11'
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: fromemail, // sender address
        to: toemail, // list of receivers
        subject: subject, // Subject line
        text: body, // plain text body
        html: body // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.json({status: 400, description: error})
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
    res.json({status: 200, description: 'mail send'})
});

module.exports = router;
