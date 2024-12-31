const express = require('express');
const bcrypt = require('bcryptjs');

const User = require("../models/userModel");
const { generateTokenCookies } = require('../utils/verificationCode');
const { verificationEmail } = require('../mailtrap/emails');


// SIGNUP FUNCTION.....
const signup = async (req, res) => {
    const {name, email, password } = req.body;
    
    try {
        //CHECK FOR EMPTY FIELDS AND SEND A RESPONSE
        if(!name || !email || !password){
            res.status(400).json({message: 'Please provide all fields'});
        }
        //CHECK FOR EXISTING USER
        const existingUser = await User.findOne({email});
        if(existingUser){
            res.status(400).json({message: 'User already exists'});
        };
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        //GENERATE A VERIFICATION CODE

        // const verificationToken = generateVerificationToken();
        const verificationToken =  Math.floor(100000 + Math.random() * 900000).toString();


        //CREATE A NEW USER
        const user = new User({
            name,
            email,
            password: hashPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 10 * 60 * 1000 //24hrs

        });
        await user.save();

        //JWT TOKEN
        generateTokenCookies(res, user._id);

        //SEND VERIFICATION EMAIL TO USER
        await verificationEmail(user.email, user.verificationToken);

        res.status(201).json({message: 'User created successfully', success: true, 
            user:{...user._doc, password: undefined, }});
        
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({message: 'Server Error'});
        
    }
}

//LOGIN FUNCTION.......
const login = async (req, res) => {
   const { email, password } = req.body;
   try {
    if(!email || !password){
        res.status(400).json({message: 'Please provide all fields'});
    }
    
    const user = await User.findOne({email});
    
    
   } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({message: 'Server Error'});
   }
}

//LOGOUT FUNCTION....
const logout = async (req, res) => {
    res.send('Auth Route');
}

//VERIFY EMAIL FUNCTION....

const verifyEmail = async(req, res)=>{
    //6 digit code
 const {code} = req.body;
 try {
    const user = await User.findOne({
        verificationToken: code,
        verificationTokenExpiresAt: {$gt: Date.now()}
    });
    if(!user){
        return res.status(400).json({success: false, message: 'Invalid or expired verification code'});
    }
    
    user.isVerified = true;
    user.verificationToken = undefined;
    verificationTokenExpiresAt = undefined;
    await user.save();

    await welcomeEmail(user.email, user.name);

 } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({message: 'Server Error'});    
    
 }
}

module.exports = { signup, login, logout, verifyEmail};
