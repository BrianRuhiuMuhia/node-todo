const db=require("../db/db.js")
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
module.exports={getSingleTask,getAllTasks,addTask,deleteTask,updateTask,limitGetAllTasks}