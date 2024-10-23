const express=require("express")
const app=express();

const z=require("zod")


app.use(express.json());   // when u use req.body it requires express.json();

// const kidneysInput=z.literal("1").or(z.literal("2"));

const schema=z.array(z.number());

const schema1=z.object({
    email:z.string().email(),
    password:z.string().min(8),
    country:z.literal("IN").or(z.literal("US")),
})



app.post("/health-checkup",function(req,res){

    const kidneyId=req.body.kidneyId;
    const validation=schema.safeParse(kidneyId);

    if(!validation.success){
        res.json(validation).send({msg:"Incorrect Input"});
    }
    else{
        res.send(validation);
    }

})

app.listen(3000,()=>{
    console.log("Listening on Port 3000");
})