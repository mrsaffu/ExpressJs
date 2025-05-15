const express = require("express")
const empRoutes = require("./routes/emp.routes")
const connectToDB = require('./utils/dbConnect')
require('dotenv').config()
const cors = require('cors')

//! creating express app
let app = express();

// !inbuilt middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./Public/images"))

// ! routes
app.use("/api/emp", empRoutes)

// ! 404

app.use("*", (req, res, next) => {
    res.status(404).json({ error: true, message: "Page not found" })
})

// ! server error 

app.use((error, req, res, next) => {
    res.status(500).json({ error: true, message: error.message })

})

let startServer = async () => {
    try {
        await connectToDB()
        console.log("MangoDb connected successfully");

    } catch (error) {
        console.log(error.message);

    }
}


app.listen(process.env.PORT, (error) => {
    if (error) throw error;
    console.log(`server is running on port: ${process.env.PORT} `);
})
startServer()
