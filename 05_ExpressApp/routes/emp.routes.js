const express = require('express');
const { addEmp, getEmps, getEmp, updateEmp, deleteEmp, loginEmp, verifyOtp } = require('../Controllers/emp.controller');
const auth = require('../Authentication_autho/auth');
const uplodefile = require('../utils/uplodefile');

let router = express.Router();
let upload = uplodefile()



// router.post("/addemp", upload.single('profile'), addEmp)
router.post("/addemp", addEmp)
router.get("/getemps", getEmps)
router.get("/getemp/:eid", getEmp)
router.put("/updateemp/:eid", updateEmp)
router.delete("/deleteemp/:eid", deleteEmp)


router.post("/loginemp", loginEmp)
router.post("/verifyotp", verifyOtp)


module.exports = router
