const pg=require("pg")
require("dotenv").config();
const db=new pg.Pool({
host:process.env.LOCALHOST,
user:process.env.USER,
port:process.env.DB_PORT,
password:process.env.PASSWORD,
database:process.env.DATABASE
})
db.connect((err) => {
    if (err) {
      console.error('Connection error', err.stack);
    } else {
      console.log('Connected to the database');
    }
  });
module.exports=db