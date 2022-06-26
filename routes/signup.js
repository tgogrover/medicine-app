const express=require('express');
const router=express.Router();
const {signup,doctorSignup,adminSignup}=require('../controllers/signup');
const {signupValidationMessages,signupValidation,signupAdminValidation}=require('../validators/validations');
const multer=require('multer')
const {body,validationResult}=require('express-validator')


const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, 'public/doctorUploads')

    },
    filename:(req,file,cb)=>{
        cb(null, file.originalname )
    }
});
const imageUpload=multer({storage});

 router.get('/api/customer/signup',(req,res)=>{
    res.render('signup',{Message:'', Error:''})
})

router.get('/api/doctors/signup',(req,res)=>{
    res.render('docPharmSignup',{Message:'', Error:''})
})


router.post('/api/customer/signup',signupValidationMessages,signupValidation,signup)
router.post('/api/admin/signup',signupValidationMessages,signupAdminValidation,adminSignup)

router.post('/api/doctors/signup',
imageUpload.array('images'),
    body('fullName').notEmpty()
    .withMessage('Your Name is required'),
    body('email').isEmail()
    .withMessage('Valid Email is required'),
    body('password').notEmpty()
    .withMessage('Password is required')
    .isString()
    .withMessage('password must be a string')
    .isLength({min:5})
    .withMessage('password must contain atleast contain 5 alphabets'),
     body('contacts').notEmpty()
    .withMessage('mobile no. is required')
    .isLength({min:10,max:10})
    .withMessage('valid mobile number is required'),
    body('specs').notEmpty()
    .withMessage('Your specialisation is required'),
    body('clinic').notEmpty()
    .withMessage('Your clinic is required'),
    body('degree').notEmpty()
    .withMessage('Your degree is required'),doctorSignup)

module.exports=router