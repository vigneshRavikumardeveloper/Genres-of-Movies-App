const Joi=require('joi');

const express=require('express');

const bcrypt=require('bcrypt');

const router=express.Router();

const {User}=require('../models/user');

router.post('/',async(req,res)=>{   // Login page

    const {error}=validate(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const user=await User.findOne({email:req.body.email});

    if(!user) return res.status(400).send(`Invalid email`);

    const validpassword=await bcrypt.compare(req.body.password,user.password);

    if(!validpassword) return res.status(400).send(`Invalid password`);

    const token=user.generateAuthToken();

    res.send(token);

});

function validate(user){

    const schema={

        email:Joi.string().min(5).max(255).required().email(),

        password:Joi.string().min(5).max(255).required()
    };

    return Joi.validate(user,schema);
}

module.exports=router;
