const {connect} = require('mongoose')

let connectToDB=()=>{
return connect(`${process.env.MONGO_URI}`)
}

module.exports=connectToDB;