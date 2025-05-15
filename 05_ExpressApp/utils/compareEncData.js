const bcrypt = require('bcryptjs');

let compareEncryptedData=async(data,hashedData)=>
{
    return await bcrypt.compare(data, 
        hashedData);
}

module.exports=compareEncryptedData