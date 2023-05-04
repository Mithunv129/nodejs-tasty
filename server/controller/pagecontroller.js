const User=require("../models/db");
const jwt=require("jsonwebtoken");
const nodemailer=require("nodemailer");
const mailgen=require('mailgen')



exports.index=(req,res)=>{
    res.render("home");
}
exports.home=(req,res)=>{
    res.render("home");
}
exports.biriyani=(req,res)=>{
    res.render("biriyani");
}
exports.gravy=(req,res)=>{
    res.render("gravi");
}
exports.nvs=(req,res)=>{
    res.render("nvs");
}
exports.burger=(req,res)=>{
    res.render("burger");
}
exports.pizza=(req,res)=>{
    res.render("pizza");
}
exports.icecream=(req,res)=>{
    res.render("icecream");
}
exports.softdrinks=(req,res)=>{
    res.render("softdrinks");
}
exports.cokkie=(req,res)=>{
    res.render("cokkie");
}

exports.about=(req,res)=>{
    res.render("about");
}
exports.contact=(req,res)=>{
    res.render("contact");
}
exports.menu=(req,res)=>{
    res.render("menu");
}
exports.register=(req,res)=>{
    res.render("register");
}

function dispatch_emails( user_email,user_name){
    const transporter = nodemailer.createTransport({
        service:'gmail',
        host: 'smtp.gmail.com',
        port:'587',
        auth:{
            user: 'vmithun706@gmail.com',
            pass: 'zclrrudpoqzbwljx'
        },
        secureConnection: 'false',
        tls: {
            ciphers: 'SSLv3',
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from :'vmithun706@gmail.com',
        to: user_email,
        subject: 'Account Registration Successful!',
        html : '<h3>Hi </h3><strong>'+user_name+',</strong></br><p>Thanks for Registering in Tasty Restaurant😍</p>'
    };

    transporter.sendMail(mailOptions,function(error,info){
        if(error)throw error;
        return res.send({error:false, data: info, message: 'OK'});
    })

}

exports.registerpost=async (req,res)=>{
    const isNewuser=await User.isEmailinUse(req.body.email);
    if(!isNewuser)
    {
        return res.render("register",{
            message:"This email is already exits"
        });
    }
    const user=await User({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        password:req.body.password
    });
    await user.save();
    dispatch_emails(user.email,user.name);
    res.redirect("/login");
}

exports.login=(req,res)=>{
    res.render("login");
}

exports.loginpost=async (req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});

    if(!user) res.render('login',{
        message:"Email Not Found"
    })

    const isMatch=await user.comparepassword(password)
    if(!isMatch) res.render('login',{
        message:"Password not Match"
    })
     
    const token=jwt.sign({userId:user._id},'secret:1234',{expiresIn:'1d'})
     res.cookie('jwt',token,{
        expires:new Date(Date.now()+600000),
        httpOnly:true});
    res.redirect('/home');

}

exports.home=(req,res)=>{
    if(req.user)
    {

        res.render("home",{user:req.user});
    }else{
        console.log(req.user);
        res.redirect("/login")
    }
}

exports.indexx=(req,res)=>{
    res.render("index");
}

exports.profile=(req,res)=>{
    if(req.user)
    {
       res.render("profile",{user:req.user});
    }else{
        console.log(req.user);
        res.redirect("/login")
    }
}

exports.cart=(req,res)=>{
    res.render("cart");
}