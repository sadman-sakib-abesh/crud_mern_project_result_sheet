const express=require("express");
const cors=require("cors");
const bodyparser=require("body-parser");
const app=express();



app.use(cors());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));


const mongo=require("mongodb").MongoClient;
const url="mongodb+srv://<user_name>:<password>@cluster0.fpqk3.mongodb.net?retryWrites=true&w=majority";


mongo.connect(url,{ useUnifiedTopology: true },(error,db)=>{
  
  if(error){
    console.log(error);
  }
  else{
   const dbo=db.db("crud");
  const col=dbo.collection("first-crud");
//all api methods 
  
  
  //insert to database
  app.post("/api/send",(req,res)=>{
  
  col.insertOne(req.body,(error)=>{
    if(error){
      console.log(error);
    }else{
      console.log("data inserted!");
    }
  });
  
  });
  //insert close
  
  //fetch data 
app.get("/api/fetch",(req,res)=>{
  
col.find({}).toArray((err,result)=>{
  if(err){
    console.log(err);
  }
  else{
    res.send(result);
  }
  
});
  });
  //fetch cloae
  
  
 
 //update data
 
app.put("/api/up",(req,res)=>{
  const pre={roll:req.body.roll};
  const newValue={$set:req.body};
  col.updateOne(pre,newValue,(error)=>{
    if(error){
      console.log(error);
    }else{
      console.log("data updated!");
    }
  });
  
  });
 //update close
 //delete data
 
 app.delete("/api/delete/:roll",(req,res)=>{
   const roll={roll:req.params["roll"]};
   
col.deleteOne(roll,(error)=>{
    if(error){
      console.log(error);
    }else{
      console.log("data deleted!");
    }
  });
   
   
 });
 
 
 
 
 //all api methods close
  
app.listen(7788,(err)=>{
  if(err){
    console.log(err);
  }else{
    console.log("success");
  }
});


  }
});










