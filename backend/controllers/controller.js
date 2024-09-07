const db=require("../db/db.js")
const bcrypt = require('bcrypt');
const uuid=require("uuid")
const jwt=require("jsonwebtoken")
async function getAllTasks(req,res)
{
try{
const result=await db.query("select * from todos")
const data=result.rows
if(data)
{
    return res.json({"mssg":data})
}
}
catch(err)
{
console.log(err)

}
return res.json({"mssg":"err"})
}
async function getSingleTask(req,res)
{
    const {id}=req.params
    let taskId=parseInt(id)
    try{
const result=await db.query("select * from todos where id=$1",[taskId])
const data=result.rows[0]
if(data)
{
    return res.json({"mssg":data})
}
else{
    return res.json({"mssg":`no task with id ${taskId}`})
}
    }
    catch(err)
    {
        console.log(err)
    }
}
async function addTask(req,res)
{
const {description,completed,task}=req.body
try{
await db.query("insert into todos(description,completed,task)values($1,$2,$3)",[description,completed,task])
return res.json({"mssg":{description,completed,task}})
}
catch(err)
{
    console.log(err)
}
return res.json({"mssg":"err"})
}
async function deleteTask(req,res){
const {id}=req.params
let taskId=parseInt(id)
try{
await db.query("delete from todos where id=$1",[taskId])
return res.json({"mssg":`task with id ${taskId} deleted`})
}
catch(err)
{
    console.log(err)
}
return res.json({"mssg":"err"})
}
async function updateTask(req,res)
{
const {id}=req.params
const {completed}=req.body
let taskId=parseInt(id)
try{
await db.query("update todos set completed=$1 where id=$2",[completed,taskId])
return res.json({"mssg":`task with id ${taskId} updated`})
}
catch(err)
{
    console.log(err)
}
return res.json({"mssg":"err"})
}
async function limitGetAllTasks(req,res)
{
let {limit}=req.query
let {skip}=req.query
if(!skip || skip===undefined || skip.trim().length<=0)
{
    skip=0
}
const size=parseInt(limit)
const skipVal=parseInt(skip)
const newData=[]
try{
const result=await db.query("select * from todos")
const data=result.rows
if(size<=0)
{
    return res.json({"mssg":data})
}
for(let i=skipVal;i<size+skipVal;i++)
{
newData.push(data[i])
}
return res.json({"mssg":newData})
}
catch(err)
{
    console.log(err)
}
return res.json({"mssg":"server error"})
}
async function register(req,res)
{
const {f_name,l_name,email,password}=req.body
const id=uuid()
if(!f_name||!l_name||!email||!password)
{
    return res.json({"mssg":"server error"})
}
try{
const result=await db.query("select * from users where email = $1",[email])
if(result.rows[0])
{
    return res.json({"mssg":"user arleady registered"})
}
else{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await db.query("insert into users(id,f_name,l_name,email,password) values($1,$2,$3,$4)",[id,f_name,l_name,email,hashedPassword])
    return res.json({"mssg":"user registered"})
}
}
catch(err)
{
console.log(err)
return res.json({"mssg":"server error"})
}
}
async function login(req,res)
{
    const {email,password}=req.body
    try{
const result =await db.query("select * from users where email = $1",[email])
if(!result.rows[0])
{
    return res.json({"mssg":"user not found"})
}
else{
    const user=result.rows[0]
    const hashedPassword=user.password
    bcrypt.compare(password, hashedPassword).then(function(result) {
        if(result===true)
        {
            const token = jwt.sign(user, process.env.SECRET_KEY);
            req.session.user={...user,token}
            return res.json({"mssg":"logged in"})
        }
        else{
            return res.json({"mssg":"wrong password"})
        }
    });
}
    }
    catch(err)
    {
        console.log(err)
        return res.json({"mssg":"server error"})
    }
}
async function getAllUsers(req,res){
    console.log("Hello World")
    try{
const result=await db.query("select * from users")
if(!result.rows)
{
    return res.json({"mssg":"no users found"})
}
else{
    return res.json(result.rows)
}
    }
    catch(err)
    {
        console.log(err)
        return res.json({"mssg":"server error"})
    }

}
async function getOneUser(req,res)
{
    const {email}=req.body
try{
const result =await db.query("select * from users where email=$1",[email])
if(!result.rows[0])
{
    return res.json({"mssg":`No User With Email ${email}`})
}
else{
    return res.json(result.rows[0])
}
}
catch(err)
{
    console.log(err)
    return res.json({"mssg":"server error"})
}
}
async function deleteUser(){}
async function getSingleUser(){}
async function updateUser(){}
async function getUserProfile(){}
async function forgotpassword(){}
async function resetPassword(){}
async function unsupportedRoutes(req,res)
{
    return res.json({"mssg":"route not supported"})
}
module.exports={getSingleTask,getAllTasks,addTask,deleteTask,updateTask,limitGetAllTasks,register,login,getAllUsers,getOneUser,unsupportedRoutes,deleteUser,getSingleUser}