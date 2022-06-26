const { body, validationResult } = require('express-validator');
const {addMedicinetoCarts,getCart,subTotal}=require('../controllers/cart')
const {authorisedLogin}=require('../middlewares/authentication')
const express=require('express');
const router=express.Router();
const cartModel=require('../models/medicine');


router.post("/api/customer/addItemsToCart/:id",authorisedLogin,addMedicinetoCarts)



router.get('/api/customer/cart',authorisedLogin,getCart)


router.get('/api/test/cart',authorisedLogin,subTotal)


module.exports=router;