const bcrypt = require('bcryptjs');

let encrypData = async (data) => {

    let salt = await bcrypt.genSalt(10);
    let hashedData = await bcrypt.hash(data,
        salt);

    return hashedData;

}

module.exports = encrypData