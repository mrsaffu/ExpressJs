const otpGenerator = require('otp-generator')

let createOtp = () => {
    let otp = otpGenerator.generate(4, {
        upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false

    });
    return otp;
}
module.exports = createOtp;