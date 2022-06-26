const appointmentModel=require('../models/appointment')
const doctorModel=require('../models/doctors')


exports.createAppointment=async(req,res)=>{

    try {
        const {id}=req.params;
        const {name,symptoms}=req.body;
const doctors=await doctorModel.findById({_id:id}).exec()

//console.log(doctors)
    const Appointment= new appointmentModel({
        Name:name,
        Symptoms:symptoms,
        Doctor:id,
        Patient:req.user._id
    })
    await Appointment.save()

    if(Appointment){
  return      res.render('createAppointment',{Message:'sent request for Appointment',Error:'',Data:doctors})
    }
    else{
        return    res.render('createAppointment',{Message:'',Error:'Something went wrong, Please try after sometime'})

         }
        
    } catch (error) {
        console.log(error)
        return    res.render('createAppointment',{Message:'',Error:'Something went wrong, Please try after sometime'})
        
    }
    

}


exports.finalize=async(req,res)=>{
    var {id}=req.params;
    var{schedule}=req.body;
    const appointment=  await appointmentModel.findByIdAndUpdate(id,{Schedule:schedule}).exec();
    if(appointment ){ 
        console.log('ok updated')
       res.render('finalDateTime',{Appointment:appointment ,Message:'Appointment Schedule Successfully'})
 
    }
    else{
        res.render('finalDateTime',{Appointment:appointment ,Message:'',Error:"Something went wrong ,Please try again later"})
    }
}