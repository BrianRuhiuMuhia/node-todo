const db=require("../db/db.js")
function autheticateUser(req,res,next)
{
    try {
        const token = req.session.user.token;
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decodedToken.userId;
        
        next();
      } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(401).json({ "mssg": 'Unauthorized' });
      }
}
function authorizeUser(role)
{
    return async function(req,res,next)
    {
try{
const result=await db.query("select * from users where id = $1",[req.userId])
if(!result.rows[0])
{
    return res.status(500).json({"mssg":"No Users"})
}
if(result.rows[0].role!=role)
{
    console.error('Error authenticating user:');
    res.status(401).json({ "mssg": 'Unauthorized' });
}
else{
    next()
}
}
catch(err)
{
    console.log("server error")
    console.error('Error authenticating user:');
    res.status(401).json({ "mssg": 'server error' });
}
    }
}
module.exports={autheticateUser,authorizeUser}