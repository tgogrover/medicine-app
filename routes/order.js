const { body, validationResult } = require('express-validator');
const {orderByCard,data_OrderWithStatus,getOrderStatus,updateOrderStatus,data_OrderWithStatus_COD}=require('../controllers/order')
const {authorisedLogin,authAdmin}=require('../middlewares/authentication')
const express=require('express');
const router=express.Router();



//router.get("/api/customer/orderBycart",authorisedLogin,getOrderByCard);

router.get("/api/customer/success",authorisedLogin,(req,res)=>{
    res.render('success')

});

router.post("/api/customer/orderBycart",
// [ 
//     body('userAddress').isEmail()
//     .withMessage('userAddress is required'),
// ],
authorisedLogin,orderByCard)

router.get('/api/customer/DB_order',(req,res)=>{
    
    return res.render('orderDetails',{Message:'Enter Your Address Here',Error:""})


})
router.get('/api/customer/orderStatus',authorisedLogin,getOrderStatus)
router.post('/api/update/orderStatus',authorisedLogin,authAdmin,[ 
    body('_id').notEmpty()
    .withMessage('order id is required'),
    body('status').notEmpty()
    .withMessage('order status is required'),

],updateOrderStatus)


router.get('/api/customer/DB_order/COD',(req,res)=>{
    
    return res.render('orderCOD',{Message:'Enter Your Address Here',Error:""})


})

router.post("/api/customer/DB_order",
[ 
    body('userAddress').notEmpty()
    .withMessage('userAddress is required'),
],
authorisedLogin,data_OrderWithStatus)

router.post("/api/customer/DB_order/COD",
[ 
    body('userAddress').notEmpty()
    .withMessage('userAddress is required'),
],
authorisedLogin,data_OrderWithStatus_COD)







module.exports=router;