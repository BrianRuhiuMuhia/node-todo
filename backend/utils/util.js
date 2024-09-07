const randomstring = require("randomstring");
const nodemailer = require('nodemailer');
function generateResetToken(length)
{
return randomstring.generate({
    length: length,
    charset: 'alphabetic'
  });
}
function sendEmail(options){
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: true, // or 'STARTTLS'
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        }
      });
      const mailOptions = {
        from: process.env.EMAIL,
        to: options.email,
        subject: 'Reset Token',
        text: options.text,
        
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Email sent: ' + info.response);
      });
}
module.export={generateResetToken,sendEmail}