'use strict';

module.exports=function(){
    return{
        signUpValidation:(req,res,next)=>{
            req.check('email',"Email is required").notEmpty().isEmai();
            req.check('firstName', "Name is required").notEmpty();
            req.check('password',"Password is required").notEmpty();

            req.getValidationResult().then((result)=>{
                const errors=result.array();
                const messages=[];
                errors.forEach((error)=> {
                    messages.push(error.msg);
                });

                req.flash('error',messages);
                res.redirect('/register');
            })
            .catch((err)=>{
                return next();
            })
        }

    }
}

// module.exports=Validator();