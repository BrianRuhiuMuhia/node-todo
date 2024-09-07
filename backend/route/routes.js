const express=require("express")
const router=express.Router()
const {authorizeUser,autheticateUser}=require("../middleware/middleware")
const {getAllTasks,getSingleTask,addTask,deleteTask,updateTask, limitGetAllTasks,register,login, getAllUsers, unsupportedRoutes, deleteUser}=require("../controllers/controller.js")
router.get("/tasks",autheticateUser,getAllTasks)
router.get("/task/:id",autheticateUser,getSingleTask)
router.post("/task",autheticateUser,addTask)
router.delete("/task/:id",autheticateUser,deleteTask)
router.patch("/task/:id",autheticateUser,updateTask)
router.get('/taskslimit',autheticateUser,limitGetAllTasks)
router.post("/login",login)
router.post("/register",register)
router.get("/users",authorizeUser("admin"),getAllUsers)
router.delete("/users",[authorizeUser,autheticateUser],deleteUser)
router.post("/users",[authorizeUser,autheticateUser])
router.patch("/users",[authorizeUser,autheticateUser])
router.post("/profile",autheticateUser)
router.post("/forgotpassword",)
router.post("/resetpassword",)
router.all("*",unsupportedRoutes)
module.exports={router}