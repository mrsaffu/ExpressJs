// Express Js : it is a node js frame-work  which is used to create the server application.

// how to create a server 
const express = require('express')
let app = express();
// console.log(app);

app.get('/',(req,res,next)=>{
   res.send("Server is ready")
});
app.listen(5000,()=>{
    console.log("server is running on port 5000");
})