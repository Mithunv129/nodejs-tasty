const {check,validationResult}=require('express-validator')

exports.validatoruser=[
    check('name').trim().not().isEmpty().withMessage('Name is required!').isString().withMessage("Enter valid Name").isLength({min:3,max:20}).withMessage("Name must be within 3 to 20"),
    check('Email').not().isEmail().withMessage('Invalid email'),
    check('phone').trim().not().isEmpty().isLength({min:10}).withMessage("Phone Number must be 10 digits"),
    check('password').trim().not().isEmpty().withMessage('Password is required!').isLength({min:8,max:20}).withMessage("Password must be within 8 to 20"),
    check('passwordcon').trim().not().isEmpty().custom((value,{req})=>{
        if(value!==req.body.password)
        {
             throw new Error("Password not same");
        }
        return true;
    })

];

exports.validationresult=(req,res,next)=>{
    const result=validationResult(req).array();
    if(!result.length)
    {
        return next();
    }
    const error=result[0].msg;
    res.render("register",{
        message:error
    })
};

exports.validatelogin=[
    check('email').trim().not().isEmpty().withMessage('Email/Password is required'),
    check('password').trim().not().isEmpty().withMessage('Email/Password is required')
]

exports.validationresultlogin=(req,res,next)=>{
    const result=validationResult(req).array();
    if(!result.length)
    {
        return next();
    }
    const error=result[0].msg;
    res.render("login",{
        message:error
    })
};
