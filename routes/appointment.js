const express=require('express');
const router=express.Router();
const {createAppointment,finalize}=require('../controllers/appointment')
const doctorModel=require('../models/doctors')
const appointmentModel=require('../models/appointment')
const {authorisedLogin}=require('../middlewares/authentication');
const cart = require('../models/cart');


const timeDate=(dateTime)=>{
   const t = new Date(dateTime);
const date = ('0' + t.getDate()).slice(-2);
const month = ('0' + (t.getMonth() + 1)).slice(-2);
const year = t.getFullYear();
const hours = ('0' + t.getHours()).slice(-2);
const minutes = ('0' + t.getMinutes()).slice(-2);
const seconds = ('0' + t.getSeconds()).slice(-2);
const time = `${date}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
return time
}

router.get('/api/Cardio/appointment',async(req,res)=>{
    try {
     const cardioDoctors= await doctorModel.find({Specialization:"Cardio"}).exec();
     
     if(cardioDoctors.length==0){
        res.render('appointment',{Message:'', Error:'No doctors in Cardio field'})
     }
     else{
      console.log(cardioDoctors)
        res.render('appointment',{Message:cardioDoctors, Error:''})

     }
        
        
    } catch (error) {
        console.log(error)
     return   res.render('appointment',{Message:'', Error:'Something went wrong'})
    }
    

})


router.get('/api/bones/appointment',async(req,res)=>{
   try {
    const cardioDoctors= await doctorModel.find({Specialization:"Bones"}).exec();
    
    if(cardioDoctors.length==0){
       res.render('appointment',{Message:'', Error:'No doctors in Bones field'})
    }
    else{
    // console.log(cardioDoctors)
       res.render('appointment',{Message:cardioDoctors, Error:''})

    }
       
       
   } catch (error) {
      // console.log(error)
    return   res.render('appointment',{Message:'', Error:'Something went wrong'})
   }
   

})



router.get('/api/eyesNoseEars/appointment',async(req,res)=>{
   try {
    const cardioDoctors= await doctorModel.find({Specialization:"Eyes,Nose,Ears"}).exec();
    
    if(cardioDoctors.length==0){
       res.render('appointment',{Message:'', Error:'No doctors in Cardio field'})
    }
    else{
    // console.log(cardioDoctors)
       res.render('appointment',{Message:cardioDoctors, Error:''})

    }
       
       
   } catch (error) {
      // console.log(error)
    return   res.render('appointment',{Message:'', Error:'Something went wrong'})
   }
   

})


router.get('/api/lungs/appointment',async(req,res)=>{
   try {
    const cardioDoctors= await doctorModel.find({Specialization:"Lungs"}).exec();
   // console.log(cardioDoctors)
    if(cardioDoctors.length==0){
      console.log('ok')
      
       res.render('appointment',{Message:'', Error:'No doctors in lungs field'})
    }
    else{
    // console.log(cardioDoctors)
       res.render('appointment',{Message:cardioDoctors, Error:''})

    }
       
       
   } catch (error) {
      // console.log(error)
    return   res.render('appointment',{Message:'', Error:'Something went wrong'})
   }
   

})

router.get('/api/brain/appointment',async(req,res)=>{
   try {
    const cardioDoctors= await doctorModel.find({Specialization:"Brain"}).exec();
   // console.log(cardioDoctors)
    if(cardioDoctors.length==0){
      console.log('ok')
      
       res.render('appointment',{Message:'', Error:'No doctors in brain field'})
    }
    else{
    // console.log(cardioDoctors)
       res.render('appointment',{Message:cardioDoctors, Error:''})

    }
       
       
   } catch (error) {
      // console.log(error)
    return   res.render('appointment',{Message:'', Error:'Something went wrong'})
   }
   

})

router.get('/api/skin/appointment',async(req,res)=>{
   try {
    const cardioDoctors= await doctorModel.find({Specialization:"Skin"}).exec();
   // console.log(cardioDoctors)
    if(cardioDoctors.length==0){
      console.log('ok')
      
       res.render('appointment',{Message:'', Error:'No doctors in skin field'})
    }
    else{
    // console.log(cardioDoctors)
       res.render('appointment',{Message:cardioDoctors, Error:''})

    }
       
       
   } catch (error) {
      // console.log(error)
    return   res.render('appointment',{Message:'', Error:'Something went wrong'})
   }
   

})

router.get('/api/createAppointment/:id',authorisedLogin,async(req,res)=>{
   try {

      const {id}=req.params;
const doctors=await doctorModel.findById({_id:id}).exec()

console.log(doctors)
      res.render('createAppointment',{Message:"", Error:'',Data:doctors})
   } catch (error) {
      console.log(error)
      res.render('createAppointment',{Message:"", Error:'',Data:Doctors})
   }
})

router.post('/api/createAppointment/:id',authorisedLogin,createAppointment)

router.get('/api/doctor/dashboard',authorisedLogin,async(req,res)=>{
 const appointment=  await appointmentModel.find({Doctor:req.user._id}).exec();
   if(appointment.length != 0 ){
      res.render('viewAppointment',{Appointment:appointment ,Message:''})

   }
   else{
      res.render('viewAppointment',{Appointment:'' ,Message:'No appointment request right now'})
   }

});


router.get('/api/accept-appointment/edit/:id',async(req,res)=>{
   var {id}=req.params;
   const appointment=  await appointmentModel.findById({_id:id}).exec();
   if(appointment.length != 0 ){
      res.render('finalDateTime',{Appointment:appointment ,Message:''})

   }
})

router.post('/api/accept-appointment/edit/:id',finalize)


router.get('/api/customer/showAppointment/',authorisedLogin,async(req,res)=>{
   const appointment= await appointmentModel.find({Patient:"6280d551526ec5145e059ff0"})
.populate("Doctor",'Full_Name Mobile_Number Email Role Specialization Clinic Degree Profile_Image')
  .exec()
  if(appointment){
     
     const schedule=appointment.map((element)=>{
      
    
     const dateTime= timeDate(element.Schedule)
  const doctor=  element.Doctor
     return { dateTime,doctor}



     });
   // //   const split = schedule.reduce((current,previous)=>{
   // //    return previous.split('T')

   //   },[])
    // console.log(schedule);
   //   const information=appointment.map((element)=>{
      
   //    return element.Doctor;

   //   })
  //   console.log(information);
  return res.render('customerAppointmentShow',{Appointment:schedule ,Message:''})
  }
 // return res.json({message:'ok'})
     

   
})


module.exports=router