const express = require("express")
const userController = require("../controllers/user.controller")
const identifyUser = require("../middlewares/auth.middleware")

const userRouter = express.Router()

/**
 * @routes post/api/users/follow/:username
 * @description follow a user
 * @access private
 */
userRouter.post("/follow/:username",identifyUser,userController.followUserController)

/**
 * @routes post/api/users/follow/:username
 * @description follow a user
 * @access private
 */
userRouter.post("unfollow/:username",identifyUser,userController.followUserController)


module.exports = userRouter