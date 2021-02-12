const mongo=require("mongodb").MongoClient;
const url="mongodb+srv://<user_name:<password>@cluster0.fpqk3.mongodb.net?retryWrites=true&w=majority";


mongo.connect(url,{ useUnifiedTopology: true },(error,db)=>{
  
  if(error){
    console.log(error);
  }
  else{
console.log("connected");
var dbo=db.db("crud")

dbo.createCollection("first-crud",(err,not)=>{
  if(err){
    console.log(err);
  }
  else{
    console.log("created");
  }
  
});

  }
});
