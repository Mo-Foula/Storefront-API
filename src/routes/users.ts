import { Router as ExpressRouter } from "express"
import { create, index, show, login } from "../controller/users"
import verifyAuthToken from "../middlewares/authorization"

const usersRouter = ExpressRouter()

usersRouter.get("/:id", verifyAuthToken, show)

usersRouter.get("/", verifyAuthToken, index)

usersRouter.post("/", create)

usersRouter.post("/login", login)

export default usersRouter
