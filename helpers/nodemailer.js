const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
});

const sendVerificationEmail = (toEmail,token) => {
    try {
        const mailOptions = {
            from: process.env.MAIL_USERNAME,
            to: toEmail,
            subject: `Verification email`,
            html: `Please click this link to verify your email address: <a href="http://localhost:${process.env.PORT}/api/verify-email/${token}">Verify</a>`,
        };      
        return transporter.sendMail(mailOptions);
    } catch (error) {
        return error.message;
    }
};

const sendResetPasswordLink = (toEmail, token) => {
    try {
        const mailOptions = {
            from: process.env.MAIL_USERNAME,
            to: toEmail,
            subject: `Request Reset Password`,
            html: `Please click this link to reset your password: <a href="http://localhost:${process.env.PORT}/api/reset-password/${token}">Reset Password</a>`,
        };

        return transporter.sendMail(mailOptions);
    } catch (error) {
        return error.message;
    }
};

module.exports = {
    sendVerificationEmail,
    sendResetPasswordLink,
};
