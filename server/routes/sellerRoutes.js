import express from "express"
import { sellerLogin, sellerlogout, isSellerAuth } from "../controllers/SellerController"

const sellerRouter = express.Router()

sellerRouter.post("/login",sellerLogin)
sellerRouter.get("/is-auth",authSeller,isSellerAuth)
sellerRouter.get("/logout",sellerlogout)

export default sellerRouter