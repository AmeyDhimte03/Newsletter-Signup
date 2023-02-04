const { response } = require('express');
const express=require('express');
// const request = require("request");
const https=require('https');
app=express();


app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/signup.html");
})

app.post("/failure",(req,res)=>{
    res.redirect("/");
})

app.post('/',(req,res)=>{
    // res.send("Successful Sign-up");
    const FirstName=req.body.FirstName;
    const LastName=req.body.LastName;
    const email=req.body.email;

    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:FirstName,
                    LNAME:LastName,
                }

            }
        ]
    }
    const jsonData=JSON.stringify(data);
    // correct url->
    const url="https://us21.api.mailchimp.com/3.0/lists/c8b56487e7"
    // incorrect url->
    // const url="https://us21.api.mailchimp.com/3.0/lists/c8b56487e7__xxx"


    const options={
        method:"POST",
        auth:"amey03:c4bd3732a578fda1c2a6bc072de96c74-us21",

    }

    const request= https.request(url,options,(response)=>{

        // if(response.statusCode===200){
        //     res.write("Successful sign-up!");
        // }
        // else{
        //     res.write("There was an error signing up... Please try again later!");
        // }
        // res.send();

        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }

        response.on("data",(dta)=>{
            console.log(JSON.parse(dta));
        })
    })

    request.write(jsonData);
    request.end();

})


const port=3000;
app.listen(port,()=>{
    console.log("Server is running on port ${port}");
})


// api key
// c4bd3732a578fda1c2a6bc072de96c74-us21

// audience id or list id
// c8b56487e7