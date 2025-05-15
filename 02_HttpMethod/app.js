// Http Method(post,get,put,delete)
//  http methos accept n number of argument whire the first argument is path and then the another argument is middleware function . middle wear function except 3 argument where the first argument is req 2nd argument is res and third argument is next function. 
//  example 

let express = require('express')
let app = express();
app.get('/', (req, res, next) => {
    console.log("home");
    res.send("home page")
    next()
},
    (req, res) => {
        console.log("home2");
        next()
        res.send("home2")
    },
    (res,req)=>{
        console.log("home3");
        res("home2")
        next()
    }
)

app.listen(5000,(error)=>{
    if (error) throw error
    console.log('server is runing pot no 5000');
})