const db=require("../db/db.js")
const description='todos my todos'
async function getData()
{
const data=await fetch("https://dummyjson.com/todos")
return await data.json()
}
getData().then((data)=>{
data.forEach(async (obj)=>{
await addToDb(obj)
})
})
async function addToDb(data)
{
    await db.query("insert into todos(description,completed,task)values($1,$2,$3)",[description,data.completed,data.title])
}
module.exports={getData}