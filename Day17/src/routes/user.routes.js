const express = require("express")
const userController = require("../controllers/user.controller")
const identifyUser = require("../middlewares/auth.middleware")

const userRouter = express.Router()

/**
 * @route POST /api/users
 * @description create a new user (status defaults to pending)
 * @access public
 */
userRouter.post("/", userController.createUserController)

/**
 * @route GET /api/users
 * @description get all users
 * @access public
 */
userRouter.get("/", userController.getAllUsersController)

/**
 * @route PATCH /api/users/:id/status
 * @description update user status (accepted or rejected)
 * @access public
 */
userRouter.patch("/:id/status", userController.updateUserStatusController)

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
userRouter.post("/unfollow/:username",identifyUser,userController.unfollowUserController)



module.exports = userRouter