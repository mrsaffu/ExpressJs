const Employee = require("../models/emp.model");
const compareEncryptedData = require("../utils/compareEncData");
const encrypData = require("../utils/ecryptData");
const jwt = require('jsonwebtoken');
const createOtp = require("../utils/generatorOtp");
const sendMail = require("../utils/sendMail");


// ! -------------------   Add  --------------

let addEmp = async (req, res, next) => {
    try {

        // image upload 
        console.log(req.body);

        // let profile = `http://localhost:5000/${req.file.originalname}`;
        // console.log(profile);


        let { name, age, gender, email, mobile, password, conformpassword, role } = req.body
        let isEmployee = await Employee.findOne({ $or: [{ email }, { mobile }] })
        if (isEmployee) {
            return res.status(409).json({ error: true, message: "Employee alredy exists with given mobile or email",data:null });
        }

        //   ! encrypt password



        if (password === conformpassword) {
            let hashedPassword = await encrypData(password)
            let hashedConformPassword = await encrypData(conformpassword)
            let employee = await Employee.create({ name, age, gender, mobile, email, password: hashedPassword, conformpassword: hashedConformPassword, role })

            res.status(200).json({ error: false, message: "Employee Added sucessFully", data: employee })


        }
        res.status(400).json({ error: true, message: "Employee password and conformpassword is not match", })

    } catch (err) {
        console.log(err);
    }
}


// ! -------------------   fatch all data  --------------

let getEmps = async (req, res, next) => {
    try {
        let employees = await Employee.find();
        res.status(200).json({ error: false, message: "Employee Fetched Successfully", data: employees })

    } catch (err) {
        next(err)
    }

}
// ! -------------------   fatch data by id  --------------

let getEmp = async (req, res, next) => {
    try {
        let { eid } = req.params;
        console.log("Received Employee ID:", eid); // Debugging step

        // Validate if the ID is a valid MongoDB ObjectId

        let employee = await Employee.findById(eid)

        if (employee) {
            return res.status(200).json({ error: false, message: "Employee fetch successfully by id", data: employee });
        }
        res.status(404).json({ error: true, message: "Employee not found to given id", data: null })


    } catch (error) {
        next(error)

    }
}


// ! -------------------   Update  --------------

let updateEmp = async (req, res, next) => {
    try {
        let { eid } = req.params;
        console.log(req.body);
        let employee = await Employee.findById(eid);

        if (employee) {
            let employee = await Employee.findByIdAndUpdate(eid, { $set: req.body }, { new: true, runValidators: true })
            return res.status(200).json({ error: false, message: "Employee update sucessfully", data: employee })

        }
        res.status(404).json({ error: true, message: "Employee not found ", data: null })


    } catch (error) {
        next(error);
    }
};



// ! -------------------   Delete  --------------

let deleteEmp = async (req, res, next) => {
    try {
        let { eid } = req.params;
        let deletedEmployee = await Employee.findById(eid);


        if (deletedEmployee) {
            let deletedEmployee = await Employee.findByIdAndDelete(eid);

            res.status(200).json({ error: false, message: "Employee deleted successfully", data: deletedEmployee });

        }
        return res.status(404).json({ error: true, message: "Employee not found", data: null });

    } catch (error) {
        next(error);
    }
};



// ! -------------------   Login  --------------

let loginEmp = async (req, res, next) => {
    try {
        let { username, email, mobile, password, name, conformpassword, otp } = req.body;
        console.log(req.body);




        let isEmployee = await Employee.findOne({ $or: [{ mobile: username }, { email: String(username) }] });

        console.log("A ----->", isEmployee.email);

        // Validate required fields
        if (!username || !password || !name) {
            return res.status(400).json({
                error: true, message: !username
                    ? "Username is required"
                    : !password
                        ? "Password is required"
                        : "Name is required"
            });
        }



        if (isEmployee) {

            // Validate dosent match fields

            let isPassword = await compareEncryptedData(password, isEmployee.password);
            if (isPassword && name === isEmployee.name) {

                // token 

                // let token = jwt.sign({ email: isEmployee.email }, "123", { expiresIn: "50m" })
                // console.log(token);

                // ^ generate Otp 
                let otp = createOtp();
                console.log(otp);
                // ^ encrypt otp 
                let encOtp = await encrypData(otp)

                await Employee.updateOne({ $or: [{ email: username }, { mobile: username }] }, { $set: { otp: encOtp } });
                // console.log("emailwa----------->", isEmployee.email);
                sendMail(isEmployee.email, otp, isEmployee.name)
                return res.status(200).json({ error: false, message: "Otp Send  SucessFully", otp })
            }
            return res.status(401).json({ error: true, message: !isPassword ? "Password does not match " : "name dosent match" })
        }

        res.status(404).json({ error: true, message: "User Not Found" })

    } catch (error) {
        next(error)
    }
}

// ! -------------------   verify Otp  --------------

let verifyOtp = async (req, res, next) => {
    try {
        let { username, otp } = req.body;
        let isEmployee = await Employee.findOne({ $or: [{ email: username }, { mobile: username }] });
        if (isEmployee) {
            let isOtp = await compareEncryptedData(otp, isEmployee.otp);
            if (isOtp) {

                // ! generate token 
                let token = jwt.sign({ email: isEmployee.email }, '123', { expiresIn: "120m" });
                return res.status(200).json({ error: false, message: "login Sucessfully", token })
            }
            return res.status(401).json({ error: true, message: "invalid otp" })
        }

    } catch (error) {
        next(error)
    }

}


module.exports = { addEmp, getEmps, getEmp, updateEmp, deleteEmp, loginEmp, verifyOtp, };

