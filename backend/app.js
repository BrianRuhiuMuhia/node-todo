const express=require("express")
const app=express()
const cors=require("cors")
const dotenv=require("dotenv")
const {router}=require("./route/routes")
const session=require("express-session")
dotenv.config()
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 3600000,
    rolling: true
  }
}));
app.use(cors())
app.use(express.json())
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
  });
app.use("/api/",router)
app.listen(process.env.PORT,()=>{
    console.log(`server running on port:${process.env.PORT}`)
})
module.exports=app