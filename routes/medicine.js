const multer=require('multer')
const { body, validationResult } = require('express-validator');
const {createMedicine}=require('../controllers/medicine')
const {authAdmin}=require('../middlewares/authentication')
const express=require('express');
const router=express.Router();
const medicineModel=require('../models/medicine')


const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, 'public/medicineUploads')

    },
    filename:(req,file,cb)=>{
        cb(null, file.originalname )
    }
});


const imageUpload=multer({storage});


router.post('/api/create/medicine',
authAdmin,
imageUpload.array('images'),
    body('name').notEmpty()
    .withMessage('Medicine Name is required'),
    body('price').notEmpty()
    .withMessage('Medicine Price is required')
    .trim()
    .isInt()
    .withMessage('price must be a Number'),
    body('quantity').notEmpty()
    .withMessage('Quantity is required')
    .trim()
    .isInt()
    .withMessage('Quantity must be a Number'),
    body('description').notEmpty()
    .withMessage('medicine description is required'),
    body('price').notEmpty()
    .withMessage('Your clinic is required'),
    //name, price, description, category, quantity}
    createMedicine)

    router.get('/api/product/medicine',async(req,res)=>{
        try {
            const medicine= await medicineModel.find({}).exec();
            console.log(medicine)
            if(medicine===[]){
               res.render('medicine',{Message:'', Error:'No medicine Available',message:''})
            }
            else{
           //  console.log(cardioDoctors)
               res.render('medicine',{Message:medicine, Error:'',message:''})
       
            }
               
               
           } catch (error) {
               console.log(error)
            return   res.render('medicine',{Message:'', Error:'Something went wrong',message:''})
           }

      //  return  res.render('medicine',{Message:'', Error:''})
        
        })

    module.exports=router