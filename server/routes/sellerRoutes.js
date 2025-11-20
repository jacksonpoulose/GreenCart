import express from "express"
import { sellerLogin, sellerlogout, sellerIsAuth } from "../controllers/SellerController.js"
import { authSeller } from "../middlewares/AuthSeller.js"

const sellerRouter = express.Router()

sellerRouter.post("/login",sellerLogin)
sellerRouter.get("/is-auth",authSeller,sellerIsAuth)
sellerRouter.get("/logout",sellerlogout)

export default sellerRouter