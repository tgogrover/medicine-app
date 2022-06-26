const { body, validationResult } = require('express-validator');


exports.signupValidationMessages=[
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
    .withMessage('valid mobile number is required')
];
exports.doctorsSignupValidationMessages=[
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
    .withMessage('Your degree is required'),
];
//fullName,email,contacts,password
//fullName,email,contacts,password,specs,clinic,degree

exports.signupValidation=(req,res,next)=>{
    console.log(req.body)
    // console.log( req.body.fullName)
     const err= validationResult(req);
     console.log(err)
     if(!err.isEmpty()){
      return res.render('signup',{ Message:'',Error: err.array()[0].msg })
  }
  next();
  
  }

  exports.signupAdminValidation=(req,res,next)=>{
    console.log(req.body)
    // console.log( req.body.fullName)
     const err= validationResult(req);
     console.log(err)
     if(!err.isEmpty()){
      return res.status(400).json({
       Error: err.array()[0].msg

      })
      
  }
  next();
  
  }
  
 