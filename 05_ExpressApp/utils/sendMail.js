const nodemailer = require("nodemailer");


async function sendMail(loginMail,otp,name) {


    const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: false, // true for port 465, false for other ports
        auth: {
            user: "ahmadsafwan034@gmail.com",
            pass: "xqvrwcqhdfsnvpic",
        },
    });


    const info = await transporter.sendMail({
        from: 'ahmadsafwan034@gmail.com', // sender address
        to: `${loginMail}`,
        subject: "OTP Mail", // Subject line
        text: " hello world ?", // plain text body
        html: ` <p>Hey Mr ${name}</p>Your otp is :  <h1>${otp}<h1>  ` // html body
    });

    console.log("Message sent: ", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}



module.exports = sendMail;