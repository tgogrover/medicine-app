const signupModel=require('../models/user');
const bcryptjs=require('bcryptjs')
const doctorModel=require('../models/doctors')
const {  validationResult } = require('express-validator');



exports.signup=async(req,res)=>{
    try {
        const {fullName,email,contacts,password}=req.body;
        console.log(req.body)
        const uniqueEmail_Contacts= await signupModel.findOne(
            {$or:[{Email:email},{Mobile_Number:contacts}]}).exec();

        if(uniqueEmail_Contacts== null){
            const hashPassword=bcryptjs.hashSync(password,10);
            const SuccessfulSignin=new signupModel({
                Full_Name:fullName,
                Mobile_Number:contacts,
                Email:email,
                Password:hashPassword
            })
            await SuccessfulSignin.save()
            if(SuccessfulSignin){
                console.log(SuccessfulSignin)
             res.render('signup',{Message:'User Successfully Created',Error:''})
            }
            else{
           return    res.render('signup',{Message:'',Error:'Something went wrong, Please try after sometime'})

            }
            
           

        }
        else{
       return   res.render('signup',{Message:'',Error:'Please try different Mobile No. or Email'})
 
        }
    
        
    } catch (error) {
        console.log(error)
        return res.render('signup',{Message:'',Error:'Something went wrong, Please try again later'});
        
        
    }
  
};


exports.doctorSignup=async(req,res)=>{
 
        try {
            const {fullName,email,contacts,password,specs,clinic,degree,role}=req.body;
            console.log(req.body)
            const err= validationResult(req);
            if(!err.isEmpty()){
                console.log(err)
                return res.render('docPharmSignup',{ Message:'',Error: err.array()[0].msg })
               }
               else{

                const uniqueEmail_Contacts= await doctorModel.findOne(
                    {$or:[{Email:email},{Mobile_Number:contacts}]}).exec();
                    console.log(uniqueEmail_Contacts)
        
                if(uniqueEmail_Contacts== null){
                   
                   // console.log(req.body)
                    const err= validationResult(req);
                  //  console.log(err)
                 
                    if (req.files.length > 0) {
                        Pictures = req.files.map((file) => {
                          return { Image: file.filename };
                        });
                        console.log(Pictures)
                        const hashPassword=bcryptjs.hashSync(password,10);
                   
                        const SuccessfulSignin=new doctorModel({
                            Full_Name:fullName,
                            Mobile_Number:contacts,
                            Email:email,
                            Password:hashPassword,
                            Specialization:specs,
                            Clinic:clinic,
                            Degree:degree,
                            Profile_Image:Pictures,
                            Role:role
        
                        })
                        
                        await SuccessfulSignin.save()
                        if(SuccessfulSignin){
                            console.log(SuccessfulSignin)
                         res.render('docPharmSignup',{Message:'User Successfully Created',Error:''})
                        }
                        else{
                       return    res.render('docPharmSignup',{Message:'',Error:'Something went wrong, Please try after sometime'})
            
                        }
                      }
                    else{
                        res.render('docPharmSignup',{Message:'',Error:'Image Uploading Required'})
    
                    }
                
                   
                   
      
                }
                else{
               return   res.render('docPharmSignup',{Message:'',Error:'Please try different Mobile No. or Email'})
                 
                }

               }

           
            
        
            
        } catch (error) {
            console.log(error)
            return res.render('docPharmSignup',{Message:'',Error:'Something went wrong, Please try again later'});
            
            
        }
      
   

}


exports.adminSignup=async(req,res)=>{
    try {
        const {fullName,email,contacts,password}=req.body;
        console.log(req.body)
        const uniqueEmail_Contacts= await signupModel.findOne(
            {$or:[{Email:email},{Mobile_Number:contacts}]}).exec();

        if(uniqueEmail_Contacts== null){
            const hashPassword=bcryptjs.hashSync(password,10);
            const SuccessfulSignin=new signupModel({
                Full_Name:fullName,
                Mobile_Number:contacts,
                Email:email,
                Password:hashPassword,
                Role:'Admin'
            })
            await SuccessfulSignin.save()
            if(SuccessfulSignin){
                console.log(SuccessfulSignin)
                const {Full_Name,Mobile_Number,Email}=SuccessfulSignin
          return   res.status(201).json({
                 Message:"admin Created Successfully",
                 Full_Name,
                 Mobile_Number,
                 Email
             })
            }
            else{
           return    res.status(400).json({
            Error:'Something went wrong, Please try after sometime'
        })
           

            }
            
           

        }
        else{
            return  res.status(400).json({
                Error:'Please try different Mobile No. or Email'
            })
            
        }
    
        
    } catch (error) {
        console.log(error)
        return res.render('signup',{Message:'',Error:'Something went wrong, Please try again later'});
        
        
    }
  
};