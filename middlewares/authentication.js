const jwt=require('jsonwebtoken')
exports.authorisedLogin=(req,res,next)=>{
try {
    const loginToken=localStorage.getItem('loginToken');
  
     var token=jwt.verify(loginToken, process.env.SECRET_KEY);
     req.user=token
   
      
     
     
    
   
} catch (error) {
    console.log(error)
    res.redirect('/api/dashboard')
}
next();

}



exports.authAdmin=(req,res,next)=>{

    const loginEmail=localStorage.getItem('loginEmail');
if(loginEmail){
    const {authorization} = req.headers;
    
 if(authorization){
     
    var header = authorization.split(' ')[1]
try{
 var token=jwt.verify(header, process.env.SECRET_KEY);
 req.user=token
 if(req.user.Role=='Admin'){
    next();
 }
 else{
    res.status(400).json({
        Message:'Customer access denied'

    })

 }

}
 catch (err){
   return res.status(400).json
   ({
       message:err.message
})
 }
}
else{
    res.status(400).json({
        Message:' Authorisation Required'

    })

}
}
else{
    res.status(400).json({
        Message:'You have to login first'

    })

}

}

