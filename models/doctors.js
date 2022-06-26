const mongoose=require('mongoose');

 const SignupSchema=new mongoose.Schema({

    Full_Name:{
        type:String,
        required:true
    },
    Mobile_Number:{
        required:true,
        type:Number,
        unique:true,
        maxlength:10,
        minlength:10
    },

    Email: {
        required:true,
        unique:true,
        type:String
    }, 
    Role:{
        type:String,
        enum:['Doctors', 'Pharmacist'],
        default:'Doctors'
    },
    Password:{
        type:String,
        required:true,
        minlength:5      
    },
    Specialization:{
        type:String,
        enum:['Bones','Skin','Cardio','Eyes,Nose,Ears','Brain','Lungs'],
        default:'Eyes,Nose,Ears'
    },
    Clinic:{
        type:String
    },
    Degree:{
        type:String
    },
    Profile_Image:[
        {
            Image:{
            type:String,
            required:true,
            }
        }    
        ]
        

   
 }, { timestamps: true })




 module.exports=mongoose.model('Doctor',SignupSchema)