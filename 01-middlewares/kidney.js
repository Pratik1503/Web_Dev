const express = require("express");

const app = express();

app.use(express.json());

app.post('/health-checkup',function(req,res){

    const kidneys=req.body.kidneys;
    const kidneyLnegth=kidneys.length;
    res.send("Your Kidneys length is " + kidneyLnegth);


})

//global  catches :

app.use(function(err,req,res,next){
    res.send({msg:"Sorry Something is up with Server "});
})


//

function userMiddleware(req, res, next) {

    const username=req.headers.username;
    const password=req.headers.password;

    if (username != "Pratik" || password != "pass") {

        res.status(400).json({ "msg": "Wrong Credentials" });

    }

    else {
        next();
    }

}


function kidneyMiddleware(req,res,next){

    const kidneyId=req.query.kidneyId;
    if (kidneyId != 1 && kidneyId != 2) {
        res.status(400).json({ "msg": "Person with kidney problem " })
    }

    else{
        next();
    }


}


app.get("/health-checkup", userMiddleware,kidneyMiddleware,function (req, res) {

    res.json({"msg":"You are healthy"})
   
})

app.get("/kidney-check",kidneyMiddleware,function (req, res) {

    res.json({"msg":"Your kidney is healthy"})
   
})
app.get("/heart-check",userMiddleware,function (req, res) {

    res.json({"msg":"Your heart is healthy"})
   
})


app.listen(3000, () => {
    console.log("Listening on Port 3000");
});