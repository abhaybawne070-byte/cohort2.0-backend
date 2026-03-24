const express = require("express")
const authController = require("../controllers/auth.controller")
const identifyUser = require("../middlewares/auth.middleware")

const authRouter = express.Router()

/**
 * post /api/auth/register
 */
authRouter.post("/register",authController.registerController)


/**
 * post /api/auth/login
 */
authRouter.post("/login",authController.loginController)

/**
 * @routes Get/api/auth/get-me
 * @desc get the currently logged in user's information
 * @access private
 */
authRouter.get("/get-me",identifyUser, authController.getMeController)

module.exports = authRouter
