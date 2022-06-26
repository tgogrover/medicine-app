const express=require('express');
const router=express.Router();
const {customerlogin,doctorlogin,adminlogin}=require('../controllers/login')
const {body}=require('express-validator')



router.get('/api/customers/login',async(req,res)=>{
return  res.render('login',{Message:'', Error:''})

})

router.get('/api/doctors/login',async(req,res)=>{
    return  res.render('doctorLogin',{Message:'', Error:''})
    
    })


router.post('/api/customers/login',[ 
body('email').isEmail()
.withMessage('Valid Email is required'),
body('password').notEmpty()
.withMessage('Password is required')],
customerlogin)

router.post('/api/admin/login',[ 
    body('email').isEmail()
    .withMessage('Valid Email is required'),
    body('password').notEmpty()
    .withMessage('Password is required')],adminlogin)

router.post('/api/doctors/login',[ 
    body('email').isEmail()
    .withMessage('Valid Email is required'),
    body('password').notEmpty()
    .withMessage('Password is required')],doctorlogin)


router.get('/api/dashboard',async(req,res)=>{
    res.render('dashboard',{Message:'', Error:''})

});

router.get('/api/customers/logout',(req,res)=>{
    localStorage.removeItem('loginEmail');
    localStorage.removeItem('loginMobile');
    localStorage.removeItem('loginRole');
    localStorage.removeItem('loginToken')
    res.redirect('/api/customers/login')

})

router.get('/api/doctors/logout',(req,res)=>{
    localStorage.removeItem('loginEmail');
    localStorage.removeItem('loginMobile');
    localStorage.removeItem('loginRole');
    localStorage.removeItem('loginToken')
    localStorage.removeItem('loginSpec')
    res.redirect('/api/doctors/login')

})




module.exports=router