const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

mongoose.connect("mongodb://127.0.0.1:27017/tastyRegister")
.then(()=>{
    console.log("connected");
})
.catch(e=>console.log(e.message))

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    }
});

userSchema.statics.isEmailinUse=async function(email){
    if(!email) throw new Error("Invalid email");
    try {
        const user=await this.findOne({email});
        if(user) return false

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

userSchema.pre('save',function(next){
   if(this.isModified('password'))
   {
     bcrypt.hash(this.password,8,(err,hash)=>{
        if(err) return next(err);

        this.password=hash;
        next();
     })
   };

});

userSchema.methods.comparepassword=async function(password){
      if(!password) throw new Error("Password is Missing");
      try {
        const result=await bcrypt.compare(this.password,password);
        return result;
      } catch (error) {
          console.log(err);
      }
}

const collection=new mongoose.model("User",userSchema);

module.exports=collection;
