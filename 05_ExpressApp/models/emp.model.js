const { model, Schema, } = require("mongoose");
let empSchema = new Schema({

    name: {
        type: String,
        require: true,
    },
    // profile:{
    //     type:String,
    //     require:true,

    // },
    age: {
        type: Number,
        require: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ["male","female","others"]
    },
    mobile: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        require: true,
    },
    conformpassword: {
        type: String,
        require: true,
    },

    role: {
        type: String,
        required: true,
        enum: {
            values: ['admin', 'hr', 'manager', 'sales'],
            message: "only admin ,hr,manager and sales are allowed"

        }
    },
    otp: {
        type: String,
        require: true,
        default: "0000"
    },


});

module.exports = model("employee", empSchema)