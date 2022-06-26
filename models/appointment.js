const mongoose=require('mongoose');

 const AppointmentSchema=new mongoose.Schema({

    Name:{
        type:String,
        required:true
    },
    Patient:{
      type:mongoose.Schema.Types.ObjectId,ref:'client'
  },
  Doctor:{
    type:mongoose.Schema.Types.ObjectId,ref:'Doctor'
},

    
    Schedule: {
        type: String,
        trim: true,
        
      },
     
      Symptoms: {
        type: String,
        trim: true,
        required: true,
      }
        

   
    }, { timestamps: true })




 module.exports=mongoose.model('Appointment',AppointmentSchema)